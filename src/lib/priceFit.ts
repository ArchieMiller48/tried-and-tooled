/**
 * Reads a stored pricing summary and decides whether it fits a budget bucket.
 * The original sentence is what we display. These figures are only the gate.
 * Rates for euro and pound amounts are approximate and are never shown.
 */

const USD_PER_UNIT: Record<string, number> = {
  $: 1,
  '€': 1.08,
  '£': 1.27,
};

const MONTHLY =
  /([$€£])\s*(\d+(?:\.\d+)?)(?:\s*\/\s*(?:user|seat))?\s*(?:\/|\s+per\s+|\s+a\s+)(?:mo|month)\b/gi;

const YEARLY =
  /([$€£])\s*(\d+(?:\.\d+)?)(?:\s*\/\s*(?:user|seat))?\s*(?:\/|\s+per\s+|\s+a\s+)(?:year|yr)\b/gi;

export interface PriceAssessment {
  hasFree: boolean;
  /** Lowest monthly figure found, in approximate USD. Null when none was written. */
  minMonthlyUsd: number | null;
  /** True when a free tier or at least one monthly or yearly figure was found. */
  parsed: boolean;
}

function round2(value: number): number {
  return Math.round(value * 100) / 100;
}

function amounts(summary: string, pattern: RegExp, perYear: boolean): number[] {
  const found: number[] = [];
  for (const match of summary.matchAll(pattern)) {
    const symbol = match[1];
    const rate = USD_PER_UNIT[symbol] ?? 1;
    const amount = Number(match[2]);
    if (!Number.isFinite(amount)) continue;
    const monthly = perYear ? amount / 12 : amount;
    found.push(round2(monthly * rate));
  }
  return found;
}

/** A free plan, a $0 price, or an unpriced self-hosted community edition. */
export function hasFreeTier(summary: string): boolean {
  const withoutNegatives = summary
    .replace(/\bnot on free\b/gi, ' ')
    .replace(/\bno free\b/gi, ' ')
    .replace(/\bwithout a free\b/gi, ' ')
    .replace(/\bisn't free\b/gi, ' ')
    .replace(/\bis not free\b/gi, ' ')
    .replace(/\bnot free\b/gi, ' ');
  if (/\bfree\b/i.test(withoutNegatives)) return true;
  if (/(?:[$€£]\s*)0(?:\.\d+)?\b/.test(summary)) return true;
  if (/\bcommunity edition\b/i.test(summary)) return true;
  return false;
}

export function assessPrice(summary: string): PriceAssessment {
  const monthly = [...amounts(summary, MONTHLY, false), ...amounts(summary, YEARLY, true)];
  const hasFree = hasFreeTier(summary);
  const minMonthlyUsd = monthly.length > 0 ? Math.min(...monthly) : null;
  return {
    hasFree,
    minMonthlyUsd,
    parsed: hasFree || minMonthlyUsd != null,
  };
}

export type BudgetBucket = 'in' | 'out' | 'unknown';

/**
 * `price` null means the tool has no stored price (a workflow step). Keep it.
 * Unparsed prose stays in the results with a caveat instead of being dropped.
 */
export function classifyPrice(
  price: Pick<PriceAssessment, 'hasFree' | 'minMonthlyUsd' | 'parsed'> | null,
  budgetId: string,
  maxMonthlyUsd?: number,
): BudgetBucket {
  if (budgetId === 'any') return 'in';
  if (!price) return 'in';
  if (!price.parsed) return 'unknown';
  if (budgetId === 'free') return price.hasFree ? 'in' : 'out';
  if (budgetId === 'under-25') {
    const cap = maxMonthlyUsd ?? 25;
    const under = price.hasFree || (price.minMonthlyUsd != null && price.minMonthlyUsd <= cap);
    return under ? 'in' : 'out';
  }
  return 'in';
}
