import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { test } from 'node:test';
import { assessPrice, classifyPrice } from './priceFit';
import { matchStack, stackHeadline, type FinderCatalog } from './stackMatch';
import { newsMatchesTool, textHasName } from './toolNames';

const root = process.cwd();

function pricingSummaries(markdown: string): string[] {
  const out: string[] = [];
  for (const part of markdown.split(/\n[ \t]*pricing:\s*\n/).slice(1)) {
    const line = part.split('\n').find((entry) => entry.trimStart().startsWith('summary:'));
    const match = line?.match(/summary:\s*"(.*)"\s*$/);
    if (match) out.push(match[1]);
  }
  return out;
}

function contentSummaries(): string[] {
  const folders = ['use-cases', 'best', 'compare', 'alternatives', 'pricing', 'new'];
  const summaries: string[] = [];
  for (const folder of folders) {
    const dir = join(root, 'src/content', folder);
    let files: string[] = [];
    try {
      files = readdirSync(dir).filter((name) => name.endsWith('.md'));
    } catch {
      continue;
    }
    for (const file of files) {
      summaries.push(...pricingSummaries(readFileSync(join(dir, file), 'utf8')));
    }
  }
  return summaries;
}

test('every stored pricing summary exposes a free tier or a monthly figure', () => {
  const summaries = contentSummaries();
  assert.ok(summaries.length >= 8);
  for (const summary of summaries) {
    const assessed = assessPrice(summary);
    assert.equal(assessed.parsed, true, summary);
  }
});

test('budget gate follows the stored price line', () => {
  const summaries = contentSummaries();
  const find = (needle: string) => {
    const summary = summaries.find((entry) => entry.includes(needle));
    assert.ok(summary, needle);
    return assessPrice(summary);
  };

  const bugbot = find('not on Free');
  assert.equal(bugbot.hasFree, false);
  assert.ok(bugbot.minMonthlyUsd != null && bugbot.minMonthlyUsd >= 30);
  assert.equal(classifyPrice(bugbot, 'free'), 'out');
  assert.equal(classifyPrice(bugbot, 'under-25', 25), 'out');
  assert.equal(classifyPrice(bugbot, 'any'), 'in');

  const ideogram = find('Pay-as-you-go');
  assert.equal(ideogram.hasFree, false);
  assert.ok(ideogram.minMonthlyUsd != null && ideogram.minMonthlyUsd <= 25);
  assert.equal(classifyPrice(ideogram, 'free'), 'out');
  assert.equal(classifyPrice(ideogram, 'under-25', 25), 'in');

  const n8n = find('Community Edition');
  assert.equal(n8n.hasFree, true);
  assert.ok(n8n.minMonthlyUsd != null && n8n.minMonthlyUsd <= 25);
  assert.equal(classifyPrice(n8n, 'free'), 'in');

  const midjourney = find('fast GPU');
  assert.equal(midjourney.hasFree, false);
  assert.equal(classifyPrice(midjourney, 'free'), 'out');

  const lovable = find('5 build credits/day');
  assert.equal(lovable.hasFree, true);
  assert.equal(classifyPrice(lovable, 'free'), 'in');
  assert.equal(classifyPrice(lovable, 'under-25', 25), 'in');

  const starter = summaries.filter((entry) => entry.includes('Starter free') && entry.includes('published app'));
  assert.ok(starter.length >= 2);
  for (const summary of starter) {
    const assessed = assessPrice(summary);
    assert.equal(assessed.hasFree, true, summary);
    assert.equal(classifyPrice(assessed, 'free'), 'in', summary);
  }
});

test('tool names match the feed and stack lines without merging different products', () => {
  assert.equal(newsMatchesTool('Kling AI', 'Kling AI (direct)'), true);
  assert.equal(newsMatchesTool('Cursor', 'Cursor Bugbot'), true);
  assert.equal(newsMatchesTool('Cursor', 'Cursor'), true);
  assert.equal(newsMatchesTool('Bolt.new', 'Bolt.new'), true);
  assert.equal(textHasName('An AI code editor such as Cursor', 'Cursor'), true);
  assert.equal(textHasName('An AI code editor such as Cursor', 'Cursor Bugbot'), false);
  assert.equal(textHasName('Runway (or Google Flow on a budget)', 'Google Flow (Veo 3.1)'), true);
  assert.equal(textHasName('Runway (or Google Flow on a budget)', 'Google Flow Music (Lyria 3.5)'), false);
  assert.equal(textHasName('CodeRabbit (or Greptile)', 'Greptile (Starter)'), true);
});

test('persona map tags published use cases and does not hard-code tools or prices', () => {
  const raw = readFileSync(join(root, 'src/data/personas.json'), 'utf8');
  const personas = JSON.parse(raw) as { useCases: Record<string, { roles: string[]; skills: string[]; goals: string[] }> };
  const tagged = JSON.stringify(personas.useCases).toLowerCase();
  assert.equal(tagged.includes('lovable'), false);
  assert.equal(tagged.includes('$'), false);
  assert.equal(tagged.includes('cursor'), false);
  const files = readdirSync(join(root, 'src/content/use-cases')).filter((name) => name.endsWith('.md'));
  for (const file of files) {
    const markdown = readFileSync(join(root, 'src/content/use-cases', file), 'utf8');
    const frontmatter = markdown.split('---')[1] ?? '';
    if (/^draft:\s*true\s*$/m.test(frontmatter)) continue;
    const slug = file.replace(/\.md$/, '');
    assert.ok(personas.useCases[slug], `${slug} is tagged`);
    assert.ok(personas.useCases[slug].goals.length > 0);
  }
});

test('matching keeps editorial order and does not promote a sponsored tool', () => {
  const tool = (name: string, kinds: string[], sponsored: boolean) => ({
    id: name,
    name,
    blurb: null,
    kinds,
    stackNotes: [],
    guides: [],
    price: { summary: 'Pro $30/mo', sourceUrl: 'https://example.com', checkedLabel: '1 Jan 2026', hasFree: false, minMonthlyUsd: 30, parsed: true },
    href: 'https://example.com',
    rel: sponsored ? 'sponsored nofollow noopener' : 'nofollow noopener',
    sponsored,
    feed: [],
  });
  const catalog: FinderCatalog = {
    roles: [{ id: 'creator', label: 'Content creator / YouTuber' }, { id: 'other', label: 'Other' }],
    skills: [{ id: 'none', label: "I don't write code" }],
    goals: [
      { id: 'video', label: 'Video' },
      { id: 'writing', label: 'Writing' },
    ],
    budgets: [
      { id: 'free', label: 'Free only' },
      { id: 'any', label: 'Any budget' },
    ],
    links: { useCases: '/tried-and-tooled/use-cases/', feed: '/tried-and-tooled/new/', aboutMoney: '/tried-and-tooled/about/#money' },
    needs: [
      {
        slug: 'video',
        title: 'Video',
        job: 'Make video',
        summary: 'Video',
        category: 'Video',
        href: '/tried-and-tooled/use-cases/video/',
        testStatus: 'pending',
        lastTestedLabel: null,
        roles: ['creator'],
        skills: ['none'],
        goals: ['video'],
        avoid: { name: 'Avoid this', reason: 'Because', sourceUrl: null },
        steps: [],
        tools: [
          tool('Top', ['Top pick'], false),
          tool('Sponsored extra', ['Also considered'], true),
          tool('Budget', ['Budget pick'], false),
        ],
      },
    ],
  };
  const result = matchStack(catalog, { role: 'developer', skill: 'none', goals: ['video', 'writing'], budget: 'any' });
  assert.deepEqual(result.needs[0].inBudget.map((entry) => entry.name), ['Top', 'Budget', 'Sponsored extra']);
  assert.equal(result.needs[0].roleFit, false);
  assert.equal(result.unmatchedGoals[0].id, 'writing');
  const free = matchStack(catalog, { role: 'creator', skill: 'none', goals: ['video'], budget: 'free' });
  assert.equal(free.needs[0].inBudget.length, 0);
  assert.equal(free.needs[0].overBudget.length, 3);
  assert.equal(free.needs[0].roleFit, true);
});

test('results headline names the role and the budget', () => {
  const headline = stackHeadline(
    {
      roles: [{ id: 'creator', label: 'Content creator / YouTuber', resultAs: 'a creator' }],
      budgets: [{ id: 'free', label: 'Free only', resultPhrase: 'free budget' }],
    },
    { role: 'creator', budget: 'free' },
  );
  assert.equal(headline, 'Your tools as a creator, free budget');
});
