import assert from 'node:assert/strict';
import { readdirSync } from 'node:fs';
import { test } from 'node:test';
import { buildUseCaseJsonLd } from './schema';
import {
  buildFaqs,
  faqPlainText,
  hasHandwrittenSearchCopy,
  moneyAmounts,
  offerFromPrice,
  siblingUseCases,
  textMentionsFree,
  useCaseMeta,
  type UseCaseEntry,
} from './useCaseFacts';

function entry(partial: Partial<UseCaseEntry> & { id: string }): UseCaseEntry {
  const checked = new Date('2026-10-20T00:00:00.000Z');
  const price = (summary: string) => ({ summary, sourceUrl: 'https://example.com/pricing', checked });
  return {
    id: partial.id,
    data: {
      title: partial.data?.title ?? 'Sample job',
      job: partial.data?.job ?? 'Do the sample job',
      summary: partial.data?.summary ?? 'A short summary of the job.',
      category: partial.data?.category ?? 'Build',
      audience: partial.data?.audience ?? ['builders'],
      topPick: partial.data?.topPick ?? {
        name: 'Top',
        url: 'https://example.com/top',
        why: 'Because the vendor page says it fits this job.',
        pricing: price('Pro $25/mo.'),
      },
      budgetPick: partial.data?.budgetPick ?? {
        name: 'Budget',
        url: 'https://example.com/budget',
        why: 'Because the published plan is the lower spend.',
        pricing: price('Pro $10/mo.'),
      },
      avoid: partial.data?.avoid ?? { name: 'The launch plan', reason: 'It cannot use a custom domain.', sourceUrl: 'https://example.com/avoid' },
      alsoConsidered: partial.data?.alsoConsidered ?? [],
      stack: partial.data?.stack ?? [],
      testStatus: partial.data?.testStatus ?? 'pending',
      lastTested: partial.data?.lastTested ?? null,
      lastVerified: partial.data?.lastVerified ?? checked,
      testNotes: partial.data?.testNotes ?? 'Pending hands-on test.',
    },
  };
}

test('currency amounts ignore token counts and keep every stated price', () => {
  assert.deepEqual(moneyAmounts('Free: 1M tokens/month. Pro $18/month ($216/year).'), [
    { amount: '18', currency: 'USD' },
    { amount: '216', currency: 'USD' },
  ]);
  assert.deepEqual(moneyAmounts('Cloud Starter €20/mo. Pro €50/mo.'), [
    { amount: '20', currency: 'EUR' },
    { amount: '50', currency: 'EUR' },
  ]);
});

test('numeric offer price is set only for a single unambiguous paid price', () => {
  const single = offerFromPrice({
    summary: 'Pro $30/seat/mo.',
    sourceUrl: 'https://example.com/pricing',
    checked: new Date('2026-10-19T00:00:00.000Z'),
  });
  assert.equal(single.price, '30');
  assert.equal(single.priceCurrency, 'USD');

  const mixed = offerFromPrice({
    summary: 'Free: 5 credits/day. Pro from $25/mo or $21/mo billed annually.',
    sourceUrl: 'https://example.com/pricing',
    checked: new Date('2026-10-20T00:00:00.000Z'),
  });
  assert.equal(mixed.price, undefined);
  assert.equal(mixed.priceCurrency, undefined);
  assert.match(String(mixed.description), /Free: 5 credits\/day/);
});

test('negated free wording is not treated as a free tier', () => {
  assert.equal(textMentionsFree('Included from Premium $30/mo (not on Free or Plus).'), false);
  assert.equal(textMentionsFree('Free for public repos.'), true);
  assert.equal(textMentionsFree('Starter free, at no cost.'), true);
});

test('faqs quote the picks and add a free question only when the copy mentions one', () => {
  const pending = entry({ id: 'sample' });
  const faqs = buildFaqs(pending);
  assert.deepEqual(faqs.map((faq) => faq.question), [
    'What is the top pick?',
    'What is the budget pick?',
    'What should you avoid, and why?',
  ]);
  assert.match(faqPlainText(faqs[0]), /Top is the top pick/);
  assert.match(faqPlainText(faqs[2]), /cannot use a custom domain/);
  assert.match(faqPlainText(faqs[2]), /https:\/\/example.com\/avoid/);
  for (const faq of faqs) assert.doesNotMatch(faqPlainText(faq), /we tested|in our testing|our tests showed/i);

  const withFree = entry({
    id: 'sample-free',
    data: {
      ...entry({ id: 'sample-free' }).data,
      topPick: {
        name: 'Voice',
        url: 'https://example.com/voice',
        why: 'A voice library.',
        pricing: {
          summary: 'Free 10k credits/mo. Starter $6/mo.',
          sourceUrl: 'https://example.com/voice-pricing',
          checked: new Date('2026-10-19T00:00:00.000Z'),
        },
      },
    },
  });
  const freeFaqs = buildFaqs(withFree);
  assert.equal(freeFaqs.length, 4);
  assert.equal(freeFaqs[2].question, 'Is there a free option?');
  assert.match(faqPlainText(freeFaqs[2]), /Free 10k credits\/mo/);
  assert.match(faqPlainText(freeFaqs[2]), /https:\/\/example.com\/voice-pricing/);
});

test('published use cases have handwritten search titles within snippet limits', () => {
  const ids = readdirSync(new URL('../content/use-cases/', import.meta.url)).filter((name) => name.endsWith('.md')).map((name) => name.replace(/\.md$/, ''));
  assert.ok(ids.length >= 8);
  for (const id of ids) {
    assert.equal(hasHandwrittenSearchCopy(id), true, id);
    const meta = useCaseMeta(entry({ id, data: { ...entry({ id }).data, testStatus: 'pending', lastVerified: new Date('2026-10-20T00:00:00.000Z') } }));
    const fullTitle = `${meta.title} · Tried & Tooled`;
    assert.ok(fullTitle.length <= 65, `${id} title is ${fullTitle.length}: ${fullTitle}`);
    assert.ok(meta.description.length <= 155, `${id} description is ${meta.description.length}: ${meta.description}`);
    assert.match(meta.description, /hands-on test pending/);
    assert.doesNotMatch(meta.description, /…$/);
    assert.doesNotMatch(meta.title, /tested/i);
  }
});

test('use-case schema lists the recommended tools and does not invent a rating', () => {
  const sample = entry({ id: 'vibe-code-an-mvp' });
  const json = JSON.stringify(buildUseCaseJsonLd({
    entry: sample,
    pageUrl: 'https://archiemiller48.github.io/tried-and-tooled/use-cases/vibe-code-an-mvp/',
    siteUrl: 'https://archiemiller48.github.io/tried-and-tooled/',
    description: useCaseMeta(sample).description,
    dateModified: '2026-10-20',
    crumbs: [
      { name: 'Home', url: 'https://archiemiller48.github.io/tried-and-tooled/' },
      { name: 'Use cases', url: 'https://archiemiller48.github.io/tried-and-tooled/use-cases/' },
      { name: sample.data.title, url: 'https://archiemiller48.github.io/tried-and-tooled/use-cases/vibe-code-an-mvp/' },
    ],
    faqs: buildFaqs(sample),
  }));
  const parsed = JSON.parse(json) as { '@graph': { '@type': string }[] };
  const types = parsed['@graph'].map((node) => node['@type']);
  assert.deepEqual(types, ['WebPage', 'BreadcrumbList', 'ItemList', 'FAQPage']);
  assert.equal(json.includes('aggregateRating'), false);
  assert.equal(json.includes('reviewCount'), false);
  assert.match(json, /SoftwareApplication/);
  assert.match(json, /"dateModified":"2026-10-20"/);
});

test('sibling use cases stay on other jobs and prefer the same category', () => {
  const current = entry({ id: 'one', data: { ...entry({ id: 'one' }).data, title: 'One', category: 'Build', audience: ['builders'] } });
  const same = entry({ id: 'two', data: { ...entry({ id: 'two' }).data, title: 'Two', category: 'Build', audience: ['builders'] } });
  const other = entry({ id: 'three', data: { ...entry({ id: 'three' }).data, title: 'Three', category: 'Audio', audience: ['creators'] } });
  const shared = entry({ id: 'four', data: { ...entry({ id: 'four' }).data, title: 'Four', category: 'Video', audience: ['builders'] } });
  const siblings = siblingUseCases(current, [current, other, shared, same]);
  assert.deepEqual(siblings.map((item) => item.id), ['two', 'four', 'three']);
});
