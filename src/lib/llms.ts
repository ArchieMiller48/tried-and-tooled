import { getCollection, type CollectionEntry } from 'astro:content';
import { formatDate } from './formatDate';
import { hasGuideEntries } from './guides';
import { buildFaqs, faqPlainText, type UseCaseEntry } from './useCaseFacts';

function pageUrl(site: URL, path: string): string {
  const base = import.meta.env.BASE_URL;
  const relative = path.startsWith('/') ? path.slice(1) : path;
  return new URL(`${base}${relative}`, site).href;
}

function oneLine(text: string): string {
  return text.replace(/\s+/g, ' ').trim();
}

function link(title: string, url: string, description: string): string {
  return `- [${title}](${url}): ${oneLine(description)}`;
}

function statusLine(testStatus: 'pending' | 'tested', lastTested: Date | null, lastVerified: Date): string {
  const verified = `Facts last verified ${formatDate(lastVerified)}.`;
  if (testStatus === 'tested' && lastTested) return `Hands-on test dated ${formatDate(lastTested)}. ${verified}`;
  if (testStatus === 'tested') return `Hands-on test recorded. ${verified}`;
  return `Pending hands-on test. Do not treat this page as a completed test. ${verified}`;
}

function priceBlock(summary: string, sourceUrl: string, checked: Date): string[] {
  return [
    `Price: ${oneLine(summary)}`,
    `Source: ${sourceUrl}`,
    `Checked: ${formatDate(checked)}`,
  ];
}

function absolutizeLinks(markdown: string, page: string): string {
  return markdown.replace(/\]\(([^)\s]+)\)/g, (full, href: string) => {
    if (/^(?:[a-z][a-z0-9+.-]*:|#|\/\/)/i.test(href)) return full;
    try {
      return `](${new URL(href, page).href})`;
    } catch {
      return full;
    }
  });
}

function entryBody(entry: { body?: string | null }): string {
  const raw = (entry.body ?? '').trim();
  if (!raw.startsWith('---')) return raw;
  const end = raw.indexOf('\n---', 3);
  return end === -1 ? raw : raw.slice(end + 4).trim();
}

const INTRO = [
  '# Tried & Tooled',
  '',
  '> Use-case-first AI tool directory for vibe coders, content creators and builders. Each job has a top pick, a budget pick, one option to avoid, and a stack. Every price has a source link and a checked date.',
  '',
  'Rankings are not for sale. Affiliate or sponsored links, when present, are labelled and do not change the order. A page marked pending has not had a hands-on test; do not describe it as tested.',
].join('\n');

export async function buildLlmsTxt(site: URL): Promise<string> {
  const [useCases, guides, issues] = await Promise.all([publishedUseCases(), publishedGuides(), publishedNewsletter()]);
  const lines = [
    INTRO,
    '',
    '## Use cases',
    '',
    link('All use cases', pageUrl(site, '/use-cases/'), 'Every job the directory covers, grouped for vibe coders, creators and builders.'),
    ...useCases.map((entry) => link(
      entry.data.title,
      pageUrl(site, `/use-cases/${entry.id}/`),
      `${entry.data.summary} Top pick: ${entry.data.topPick.name}. Budget pick: ${entry.data.budgetPick.name}.`,
    )),
    '',
    '## Comparisons',
    '',
    link('All comparisons', pageUrl(site, '/compare/'), 'Head-to-head pages with sourced pricing. Not a hands-on score while a test is pending.'),
    ...guides.compare.map((entry) => link(entry.data.title, pageUrl(site, `/compare/${entry.id}/`), entry.data.summary)),
    '',
    '## Best-of shortlists',
    '',
    link('All shortlists', pageUrl(site, '/best/'), 'Shortlists for one job, ordered by who the tool is for, with sourced pricing.'),
    ...guides.best.map((entry) => link(entry.data.title, pageUrl(site, `/best/${entry.id}/`), entry.data.summary)),
    '',
    '## Alternatives',
    '',
    link('All alternatives', pageUrl(site, '/alternatives/'), 'Pages that name one tool and the realistic swaps, each tied to a use case.'),
    ...guides.alternatives.map((entry) => link(entry.data.title, pageUrl(site, `/alternatives/${entry.id}/`), entry.data.summary)),
    '',
    '## Pricing',
    '',
    link('All pricing pages', pageUrl(site, '/pricing/'), 'Vendor prices repeated with the source link and the date they were checked.'),
    ...guides.pricing.map((entry) => link(entry.data.title, pageUrl(site, `/pricing/${entry.id}/`), entry.data.summary)),
    '',
    '## Newsletter',
    '',
    link('Newsletter', pageUrl(site, '/newsletter/'), 'Past weekly issues. One stack, the week\'s changes, and prices taken from the vendor\'s own page. Picks are pending a hands-on test.'),
    ...issues.map((entry) => link(
      entry.data.title,
      pageUrl(site, `/newsletter/${entry.id}/`),
      `${entry.data.summary.replace(/[.!?]$/, '')}. Sent ${formatDate(entry.data.date)}.`,
    )),
    '',
    '## About',
    '',
    link('How we test', pageUrl(site, '/about/'), 'How Tried & Tooled tests AI tools, how the site makes money, and why rankings are never for sale.'),
    '',
    '## Optional',
    '',
    link('Find your tool', pageUrl(site, '/find-your-tool/'), 'Four questions that line up tools the site already tracks for the jobs you pick.'),
    link('New this week', pageUrl(site, '/new/'), 'Releases and pricing changes, each with a source link. Not a tested recommendation.'),
    link('Search', pageUrl(site, '/search/'), 'Search use cases, tools and new releases.'),
    link('Submit a tool', pageUrl(site, '/submit/'), 'Suggest a tool. A submission does not buy a ranking.'),
    '',
  ];
  return `${lines.join('\n')}\n`;
}

export async function buildLlmsFull(site: URL): Promise<string> {
  const [useCases, guides, issues] = await Promise.all([publishedUseCases(), publishedGuides(), publishedNewsletter()]);
  const titles = new Map(useCases.map((entry) => [entry.id, entry.data.title]));
  const sections = [
    INTRO,
    '',
    'This file repeats the structured facts from each page. Prices are copied from those pages, with the vendor source and the date that source was checked. It does not add test results.',
    '',
    ...useCases.flatMap((entry) => renderUseCase(site, entry)),
    ...guides.compare.flatMap((entry) => renderCompare(site, entry, titles)),
    ...guides.best.flatMap((entry) => renderBest(site, entry, titles)),
    ...guides.alternatives.flatMap((entry) => renderAlternatives(site, entry, titles)),
    ...guides.pricing.flatMap((entry) => renderPricing(site, entry, titles)),
    ...issues.flatMap((entry) => renderNewsletter(site, entry)),
    '',
    '## How we test',
    '',
    `URL: ${pageUrl(site, '/about/')}`,
    'Tried & Tooled publishes a top pick, a budget pick and one option to avoid for a specific job. Untested pages stay labelled pending. Every price links to the vendor page it was read from and shows the date it was checked. Money cannot buy a ranking.',
    '',
  ];
  return `${sections.join('\n').replace(/\n{3,}/g, '\n\n')}\n`;
}

async function publishedNewsletter() {
  const entries = await getCollection('newsletter', ({ data }) => !data.draft);
  return entries.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf() || b.data.issue - a.data.issue);
}

function renderNewsletter(site: URL, entry: CollectionEntry<'newsletter'>): string[] {
  const data = entry.data;
  const url = pageUrl(site, `/newsletter/${entry.id}/`);
  const body = htmlToText(entryBody(entry));
  return [
    `## Newsletter: ${data.title}`,
    '',
    `URL: ${url}`,
    `Issue: ${data.issue}`,
    `Sent: ${formatDate(data.date)}`,
    `Summary: ${oneLine(data.summary)}`,
    ...(data.subtitle ? [`Subtitle: ${oneLine(data.subtitle)}`] : []),
    `Beehiiv: ${data.beehiivUrl}`,
    'Pending hands-on test. This issue does not add test results.',
    '',
    ...(body ? [body, ''] : []),
  ];
}

/** Keep the issue wording and every URL, without Beehiiv editor tags. */
function htmlToText(html: string): string {
  const withLinks = html.replace(/<a\b[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi, (_, href: string, text: string) => {
    const label = text.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    return label ? `${label} (${href})` : href;
  });
  const blocked = withLinks
    .replace(/<hr\b[^>]*>/gi, '\n\n---\n\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<h2[^>]*>/gi, '\n\n## ')
    .replace(/<\/h2>/gi, '\n\n')
    .replace(/<li[^>]*>/gi, '\n- ')
    .replace(/<\/(p|div|ul|ol|li)>/gi, '\n')
    .replace(/<[^>]+>/g, '');
  return blocked
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

async function publishedUseCases() {
  const entries = await getCollection('use-cases', ({ data }) => !data.draft);
  return entries.sort((a, b) => a.data.title.localeCompare(b.data.title));
}

async function publishedGuides() {
  const load = async <C extends 'compare' | 'best' | 'alternatives' | 'pricing'>(collection: C): Promise<CollectionEntry<C>[]> => {
    if (!hasGuideEntries(collection)) return [];
    const entries = await getCollection(collection, ({ data }) => !data.draft);
    return entries.sort((a, b) => a.data.title.localeCompare(b.data.title));
  };
  const [compare, best, alternatives, pricing] = await Promise.all([
    load('compare'),
    load('best'),
    load('alternatives'),
    load('pricing'),
  ]);
  return { compare, best, alternatives, pricing };
}

function renderUseCase(site: URL, entry: CollectionEntry<'use-cases'>): string[] {
  const data = entry.data;
  const url = pageUrl(site, `/use-cases/${entry.id}/`);
  const facts = entry as UseCaseEntry;
  const lines = [
    `## Use case: ${data.title}`,
    '',
    `URL: ${url}`,
    `Job: ${oneLine(data.job)}`,
    `Summary: ${oneLine(data.summary)}`,
    statusLine(data.testStatus, data.lastTested, data.lastVerified),
    `Last updated: ${formatDate(data.lastVerified)}`,
    '',
    `### Top pick: ${data.topPick.name}`,
    `Vendor: ${data.topPick.url}`,
    oneLine(data.topPick.why),
    ...priceBlock(data.topPick.pricing.summary, data.topPick.pricing.sourceUrl, data.topPick.pricing.checked),
    '',
    `### Budget pick: ${data.budgetPick.name}`,
    `Vendor: ${data.budgetPick.url}`,
    oneLine(data.budgetPick.why),
    ...priceBlock(data.budgetPick.pricing.summary, data.budgetPick.pricing.sourceUrl, data.budgetPick.pricing.checked),
    '',
    `### Avoid: ${data.avoid.name}`,
    oneLine(data.avoid.reason),
    ...(data.avoid.sourceUrl ? [`Source: ${data.avoid.sourceUrl}`] : []),
    '',
    '### Stack',
    ...data.stack.map((step) => `- ${step.step}: ${step.tool} — ${oneLine(step.role)}`),
    '',
  ];
  if (data.alsoConsidered.length > 0) {
    lines.push('### Also considered', '');
    for (const tool of data.alsoConsidered) {
      lines.push(
        `- ${tool.name} (${tool.url}): ${oneLine(tool.note)}`,
        ...priceBlock(tool.pricing.summary, tool.pricing.sourceUrl, tool.pricing.checked).map((line) => `  ${line}`),
      );
    }
    lines.push('');
  }
  lines.push('### Test notes', '', oneLine(data.testNotes), '', '### FAQ', '');
  for (const faq of buildFaqs(facts)) {
    lines.push(`Q: ${faq.question}`, `A: ${faqPlainText(faq)}`, '');
  }
  const body = absolutizeLinks(entryBody(entry), url);
  if (body) lines.push('### Notes from the page', '', body, '');
  return lines;
}

function parentLine(site: URL, parent: string, titles: Map<string, string>): string {
  const title = titles.get(parent) ?? parent;
  return `Parent use case: ${title} (${pageUrl(site, `/use-cases/${parent}/`)})`;
}

function renderCompare(site: URL, entry: CollectionEntry<'compare'>, titles: Map<string, string>): string[] {
  const data = entry.data;
  const url = pageUrl(site, `/compare/${entry.id}/`);
  const lines = [
    `## Comparison: ${data.title}`,
    '',
    `URL: ${url}`,
    parentLine(site, data.parent, titles),
    `Summary: ${oneLine(data.summary)}`,
    statusLine(data.testStatus, data.lastTested, data.lastVerified),
    '',
  ];
  for (const tool of data.tools) {
    lines.push(
      `### ${tool.name}`,
      `Vendor: ${tool.url}`,
      oneLine(tool.blurb),
      ...priceBlock(tool.pricing.summary, tool.pricing.sourceUrl, tool.pricing.checked),
    );
    for (const source of tool.sources) lines.push(`Feature source: ${source.label} — ${source.url}`);
    lines.push('');
  }
  lines.push('### Side by side', '');
  for (const row of data.rows) {
    lines.push(`#### ${row.label}`);
    row.cells.forEach((cell, index) => lines.push(`- ${data.tools[index].name}: ${oneLine(cell)}`));
    for (const source of row.sources) lines.push(`Source: ${source.label} — ${source.url}`);
    lines.push('');
  }
  lines.push(...verdictsAndFaqs(data.verdicts, data.faqs), ...notes(entry, url));
  return lines;
}

function renderBest(site: URL, entry: CollectionEntry<'best'>, titles: Map<string, string>): string[] {
  const data = entry.data;
  const url = pageUrl(site, `/best/${entry.id}/`);
  const lines = [
    `## Shortlist: ${data.title}`,
    '',
    `URL: ${url}`,
    parentLine(site, data.parent, titles),
    `Summary: ${oneLine(data.summary)}`,
    statusLine(data.testStatus, data.lastTested, data.lastVerified),
    'Order is a reading guide by who the tool is for, not a tested ranking.',
    '',
  ];
  data.picks.forEach((pick, index) => {
    lines.push(
      `### ${index + 1}. ${pick.name}`,
      `Vendor: ${pick.url}`,
      `Fit: ${oneLine(pick.fit)}`,
      oneLine(pick.why),
      ...(pick.caveat ? [`Caveat: ${oneLine(pick.caveat)}`] : []),
      ...priceBlock(pick.pricing.summary, pick.pricing.sourceUrl, pick.pricing.checked),
    );
    for (const source of pick.sources) lines.push(`Feature source: ${source.label} — ${source.url}`);
    lines.push('');
  });
  lines.push(...verdictsAndFaqs(data.verdicts, data.faqs), ...notes(entry, url));
  return lines;
}

function renderAlternatives(site: URL, entry: CollectionEntry<'alternatives'>, titles: Map<string, string>): string[] {
  const data = entry.data;
  const url = pageUrl(site, `/alternatives/${entry.id}/`);
  const subject = data.subject;
  const lines = [
    `## Alternatives: ${data.title}`,
    '',
    `URL: ${url}`,
    parentLine(site, data.parent, titles),
    `Summary: ${oneLine(data.summary)}`,
    statusLine(data.testStatus, data.lastTested, data.lastVerified),
    '',
    `### ${subject.name}`,
    `Vendor: ${subject.url}`,
    oneLine(subject.blurb),
    ...priceBlock(subject.pricing.summary, subject.pricing.sourceUrl, subject.pricing.checked),
    '',
  ];
  for (const tool of data.alternatives) {
    lines.push(
      `### ${tool.name}`,
      `Vendor: ${tool.url}`,
      oneLine(tool.why),
      `Tradeoff: ${oneLine(tool.tradeoff)}`,
      ...priceBlock(tool.pricing.summary, tool.pricing.sourceUrl, tool.pricing.checked),
      '',
    );
  }
  lines.push(...verdictsAndFaqs(data.verdicts, data.faqs), ...notes(entry, url));
  return lines;
}

function renderPricing(site: URL, entry: CollectionEntry<'pricing'>, titles: Map<string, string>): string[] {
  const data = entry.data;
  const url = pageUrl(site, `/pricing/${entry.id}/`);
  const lines = [
    `## Pricing: ${data.title}`,
    '',
    `URL: ${url}`,
    parentLine(site, data.parent, titles),
    `Summary: ${oneLine(data.summary)}`,
    `Vendor: ${data.tool.url}`,
    statusLine(data.testStatus, data.lastTested, data.lastVerified),
    '',
    '### Plans',
    '',
  ];
  for (const plan of data.plans) {
    lines.push(
      `- ${plan.name}: ${plan.price}. ${oneLine(plan.includes)}`,
      `  Source: ${plan.sourceUrl}`,
      `  Checked: ${formatDate(plan.checked)}`,
    );
  }
  lines.push('', ...verdictsAndFaqs(data.verdicts, data.faqs), ...notes(entry, url));
  return lines;
}

function verdictsAndFaqs(
  verdicts: { situation: string; guidance: string }[],
  faqs: { question: string; answer: string }[],
): string[] {
  const lines = ['### Which should you pick', ''];
  for (const verdict of verdicts) lines.push(`- ${verdict.situation}: ${oneLine(verdict.guidance)}`);
  lines.push('', '### FAQ', '');
  for (const faq of faqs) lines.push(`Q: ${faq.question}`, `A: ${oneLine(faq.answer)}`, '');
  return lines;
}

function notes(entry: { body?: string | null }, url: string): string[] {
  const body = absolutizeLinks(entryBody(entry), url);
  return body ? ['### Notes from the page', '', body, ''] : [];
}
