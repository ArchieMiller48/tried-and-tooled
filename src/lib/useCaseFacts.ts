import { formatDate, isoDate } from './formatDate';
import { clipMeta } from './metaText';

export interface PriceFact {
  summary: string;
  sourceUrl: string;
  checked: Date;
}

export interface NamedPick {
  name: string;
  url: string;
  why: string;
  pricing: PriceFact;
}

export interface ConsideredTool {
  name: string;
  url: string;
  note: string;
  pricing: PriceFact;
}

export interface UseCaseData {
  title: string;
  job: string;
  summary: string;
  category: string;
  audience: readonly string[];
  topPick: NamedPick;
  budgetPick: NamedPick;
  avoid: { name: string; reason: string; sourceUrl?: string };
  alsoConsidered: readonly ConsideredTool[];
  stack: readonly { step: string; tool: string; role: string }[];
  testStatus: 'pending' | 'tested';
  lastTested: Date | null;
  lastVerified: Date;
  testNotes: string;
}

export interface UseCaseEntry {
  id: string;
  data: UseCaseData;
}

export interface FaqLink {
  href: string;
  label: string;
}

export interface FaqPart {
  text: string;
  link?: FaqLink;
}

export interface FaqBlock {
  question: string;
  parts: FaqPart[];
}

export interface ShortAnswerPrice {
  name: string;
  summary: string;
  sourceUrl: string;
  checked: Date;
}

export interface ShortAnswer {
  lead: string;
  pricesChecked: string;
  statusNote: string;
  prices: ShortAnswerPrice[];
  avoidName: string;
  avoidReason: string;
  avoidSourceUrl?: string;
}

const BRAND_SUFFIX = ' · Tried & Tooled';
const TITLE_LIMIT = 65;

const MONEY = /(?:(USD|EUR|GBP|\$|€|£)\s?(\d+(?:\.\d+)?)|(\d+(?:\.\d+)?)\s?(USD|EUR|GBP))/g;

/** Search titles for the current use cases. The year comes from lastVerified, not a fixed claim. */
const SEARCH_TITLES: Record<string, (year: number) => string> = {
  'vibe-code-an-mvp': (year) => `Best AI tools to vibe-code an MVP (${year})`,
  'ai-voiceover': (year) => `Best AI voiceover tools for videos (${year})`,
  'ai-code-review': (year) => `Best AI code review tools for PRs (${year})`,
  'ai-music-for-videos': (year) => `Best AI music tools for videos (${year})`,
  'ai-thumbnails-and-images': (year) => `Best AI thumbnail tools for YouTube (${year})`,
  'ai-video-generation': (year) => `Best AI video tools for B-roll (${year})`,
  'automate-small-business-admin': (year) => `Best AI workflow tools for admin (${year})`,
  'clip-long-videos-into-shorts': (year) => `Best AI tools for Shorts and Reels (${year})`,
};

/** Fact sentences for the meta description. The checked date and test status are appended from frontmatter. */
export function hasHandwrittenSearchCopy(id: string): boolean {
  return Object.prototype.hasOwnProperty.call(SEARCH_TITLES, id) && Object.prototype.hasOwnProperty.call(SEARCH_BLURBS, id);
}

const SEARCH_BLURBS: Record<string, string> = {
  'vibe-code-an-mvp': 'Lovable to vibe-code an MVP; Bolt.new on a budget. Avoid launching on Lovable Free.',
  'ai-voiceover': 'ElevenLabs for video voiceovers; Descript if you already edit there. Avoid Free for monetised work.',
  'ai-code-review': 'CodeRabbit for PR review, free on public repos; Greptile Starter for a solo private repo.',
  'ai-music-for-videos': 'Suno Pro to publish tracks; ElevenLabs if you already pay for voice. Suno Free has no commercial rights.',
  'ai-thumbnails-and-images': 'Ideogram for thumbnail text; Midjourney Basic for the art. Avoid Ideogram Free for unreleased work.',
  'ai-video-generation': 'Runway for several video models on one plan; Google Flow to try clips on free daily credits.',
  'automate-small-business-admin': 'Zapier for no-code app coverage; n8n bills per workflow run rather than per step.',
  'clip-long-videos-into-shorts': 'OpusClip for vertical clips; Descript if you also edit the long video. OpusClip Free is watermarked.',
};

export function textMentionsFree(text: string): boolean {
  const stripped = text.replace(/\b(?:not|no|isn't|is not|aren't|are not)\s+(?:on\s+)?free\b/gi, '');
  return /\bfree\b|\$0\b|€0\b|£0\b|at no cost/i.test(stripped);
}

export interface MoneyAmount {
  amount: string;
  currency: 'USD' | 'EUR' | 'GBP';
}

function currencyOf(symbol: string): MoneyAmount['currency'] | null {
  switch (symbol) {
    case '$':
    case 'USD':
      return 'USD';
    case '€':
    case 'EUR':
      return 'EUR';
    case '£':
    case 'GBP':
      return 'GBP';
    default:
      return null;
  }
}

/** Currency amounts written in a pricing summary. Ignores token counts such as "1M". */
export function moneyAmounts(summary: string): MoneyAmount[] {
  const out: MoneyAmount[] = [];
  for (const match of summary.matchAll(MONEY)) {
    const symbol = match[1] || match[4];
    const amount = match[2] || match[3];
    const currency = symbol ? currencyOf(symbol) : null;
    if (currency && amount) out.push({ amount, currency });
  }
  return out;
}

/**
 * Offer for a tool whose price we already quote.
 * A numeric price is set only when the summary has one currency amount and does not also describe a free tier.
 * Mixed tiers stay in the description, which is the sourced sentence, so we don't pick one number and drop the rest.
 */
export function offerFromPrice(pricing: PriceFact): Record<string, unknown> {
  const offer: Record<string, unknown> = {
    '@type': 'Offer',
    url: pricing.sourceUrl,
    description: `${pricing.summary} Pricing checked ${formatDate(pricing.checked)}.`,
  };
  const amounts = moneyAmounts(pricing.summary);
  if (amounts.length === 1 && !textMentionsFree(pricing.summary)) {
    offer.price = amounts[0].amount;
    offer.priceCurrency = amounts[0].currency;
  }
  return offer;
}

function fitsTitle(title: string): boolean {
  return (title + BRAND_SUFFIX).length <= TITLE_LIMIT;
}

function fallbackTitle(entry: UseCaseEntry): string {
  const year = entry.data.lastVerified.getUTCFullYear();
  const status = entry.data.testStatus === 'tested' ? `tested, ${year}` : String(year);
  const preferred = `Best AI tools for ${entry.data.title} (${status})`;
  if (fitsTitle(preferred)) return preferred;
  const shorter = `${entry.data.title} (${status})`;
  if (fitsTitle(shorter)) return shorter;
  const room = TITLE_LIMIT - BRAND_SUFFIX.length - 1;
  return `${shorter.slice(0, room).trimEnd()}…`;
}

function statusClause(entry: UseCaseEntry): string {
  if (entry.data.testStatus === 'tested' && entry.data.lastTested) {
    return `hands-on test ${formatDate(entry.data.lastTested)}`;
  }
  if (entry.data.testStatus === 'tested') return 'hands-on test recorded';
  return 'hands-on test pending';
}

/** Document title (without the brand suffix) and meta description for a use-case page. */
export function useCaseMeta(entry: UseCaseEntry): { title: string; description: string } {
  const year = entry.data.lastVerified.getUTCFullYear();
  const title = SEARCH_TITLES[entry.id]?.(year) ?? fallbackTitle(entry);
  const blurb = SEARCH_BLURBS[entry.id] ?? entry.data.summary;
  const description = clipMeta(
    `${blurb} Facts checked ${formatDate(entry.data.lastVerified)}; ${statusClause(entry)}.`,
  );
  return { title, description };
}

export function shortAnswer(entry: UseCaseEntry): ShortAnswer {
  const { data } = entry;
  const topDay = isoDate(data.topPick.pricing.checked);
  const budgetDay = isoDate(data.budgetPick.pricing.checked);
  const pricesChecked = topDay === budgetDay
    ? `Prices checked ${formatDate(data.topPick.pricing.checked)}.`
    : `Prices checked ${formatDate(data.topPick.pricing.checked)} (${data.topPick.name}) and ${formatDate(data.budgetPick.pricing.checked)} (${data.budgetPick.name}).`;
  let statusNote = 'Hands-on test still pending. This is not a test score.';
  if (data.testStatus === 'tested' && data.lastTested) {
    statusNote = `Hands-on test dated ${formatDate(data.lastTested)}.`;
  } else if (data.testStatus === 'tested') {
    statusNote = 'Hands-on test recorded on this page.';
  }
  return {
    lead: `Top pick ${data.topPick.name}, budget pick ${data.budgetPick.name}, avoid ${data.avoid.name}.`,
    pricesChecked,
    statusNote,
    prices: [data.topPick, data.budgetPick].map((pick) => ({
      name: pick.name,
      summary: pick.pricing.summary,
      sourceUrl: pick.pricing.sourceUrl,
      checked: pick.pricing.checked,
    })),
    avoidName: data.avoid.name,
    avoidReason: data.avoid.reason,
    avoidSourceUrl: data.avoid.sourceUrl,
  };
}

interface PricedMention {
  name: string;
  quote: string;
  sourceUrl: string;
  checked: Date;
}

function pricedFreeMentions(data: UseCaseData): PricedMention[] {
  const tools: { name: string; summary: string; extra: string; pricing: PriceFact }[] = [
    { name: data.topPick.name, summary: data.topPick.pricing.summary, extra: data.topPick.why, pricing: data.topPick.pricing },
    { name: data.budgetPick.name, summary: data.budgetPick.pricing.summary, extra: data.budgetPick.why, pricing: data.budgetPick.pricing },
    ...data.alsoConsidered.map((tool) => ({
      name: tool.name,
      summary: tool.pricing.summary,
      extra: tool.note,
      pricing: tool.pricing,
    })),
  ];
  const mentions: PricedMention[] = [];
  for (const tool of tools) {
    const quote = textMentionsFree(tool.summary) ? tool.summary : textMentionsFree(tool.extra) ? tool.extra : null;
    if (!quote) continue;
    mentions.push({ name: tool.name, quote, sourceUrl: tool.pricing.sourceUrl, checked: tool.pricing.checked });
  }
  return mentions;
}

function avoidMentionsFree(data: UseCaseData): boolean {
  return textMentionsFree(data.avoid.name) || textMentionsFree(data.avoid.reason);
}

export function buildFaqs(entry: UseCaseEntry): FaqBlock[] {
  const { data } = entry;
  const faqs: FaqBlock[] = [
    {
      question: 'What is the top pick?',
      parts: [{
        text: `${data.topPick.name} is the top pick for this job. ${data.topPick.why} Verified price: ${data.topPick.pricing.summary} Pricing checked ${formatDate(data.topPick.pricing.checked)}.`,
        link: { href: data.topPick.pricing.sourceUrl, label: 'source' },
      }],
    },
    {
      question: 'What is the budget pick?',
      parts: [{
        text: `${data.budgetPick.name} is the budget pick. ${data.budgetPick.why} Verified price: ${data.budgetPick.pricing.summary} Pricing checked ${formatDate(data.budgetPick.pricing.checked)}.`,
        link: { href: data.budgetPick.pricing.sourceUrl, label: 'source' },
      }],
    },
  ];

  const priced = pricedFreeMentions(data);
  const avoidFree = avoidMentionsFree(data);
  if (priced.length > 0 || avoidFree) {
    const parts: FaqPart[] = [];
    if (priced.length > 0) {
      parts.push({ text: "The page's sourced pricing mentions a free tier. " });
      priced.forEach((mention, index) => {
        parts.push({
          text: `${index > 0 ? ' ' : ''}${mention.name}: ${mention.quote} Pricing checked ${formatDate(mention.checked)}.`,
          link: { href: mention.sourceUrl, label: 'source' },
        });
      });
      if (avoidFree) {
        parts.push({ text: ` The page also says to avoid ${data.avoid.name}.` });
      }
    } else {
      parts.push({
        text: `This page does not list a separate free-tier price. It says to avoid ${data.avoid.name}. ${data.avoid.reason}`,
        link: data.avoid.sourceUrl ? { href: data.avoid.sourceUrl, label: 'source' } : undefined,
      });
    }
    faqs.push({ question: 'Is there a free option?', parts });
  }

  faqs.push({
    question: 'What should you avoid, and why?',
    parts: [{
      text: `${data.avoid.name}. ${data.avoid.reason}`,
      link: data.avoid.sourceUrl ? { href: data.avoid.sourceUrl, label: 'source' } : undefined,
    }],
  });
  return faqs;
}

export function faqPlainText(faq: FaqBlock): string {
  return faq.parts.map((part) => part.text + (part.link ? ` (source: ${part.link.href})` : '')).join('');
}

export function siblingUseCases<T extends UseCaseEntry>(current: T, all: readonly T[], limit = 3): T[] {
  return all
    .filter((entry) => entry.id !== current.id)
    .map((entry) => {
      const shared = entry.data.audience.filter((tag) => current.data.audience.includes(tag)).length;
      const sameCategory = entry.data.category === current.data.category ? 2 : 0;
      return { entry, score: shared + sameCategory };
    })
    .sort((a, b) => b.score - a.score || a.entry.data.title.localeCompare(b.entry.data.title))
    .slice(0, limit)
    .map((item) => item.entry);
}

export const APPLICATION_CATEGORY: Record<string, string> = {
  Build: 'BusinessApplication',
  'Code quality': 'DeveloperApplication',
  Video: 'MultimediaApplication',
  Images: 'DesignApplication',
  Audio: 'MultimediaApplication',
};

export function applicationCategory(category: string): string {
  const mapped = APPLICATION_CATEGORY[category];
  if (!mapped) throw new Error(`No schema.org applicationCategory for "${category}".`);
  return mapped;
}
