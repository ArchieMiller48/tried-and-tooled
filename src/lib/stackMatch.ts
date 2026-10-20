import { classifyPrice, type BudgetBucket } from './priceFit';

export interface FinderOption {
  id: string;
  label: string;
  detail?: string;
  /** Phrase after "Your tools as", for example "a creator". */
  resultAs?: string;
}

export interface FinderBudget extends FinderOption {
  maxMonthlyUsd?: number;
  /** Phrase after the role, for example "free budget". */
  resultPhrase?: string;
}

export interface CatalogPrice {
  summary: string;
  sourceUrl: string;
  checkedLabel: string;
  hasFree: boolean;
  minMonthlyUsd: number | null;
  parsed: boolean;
}

export interface CatalogFeedItem {
  title: string;
  href: string;
  spottedLabel: string;
}

export interface CatalogGuideLink {
  label: string;
  href: string;
}

export interface CatalogTool {
  id: string;
  name: string;
  blurb: string | null;
  /** Editorial roles in display order: Top pick, Budget pick, and so on. Not a paid order. */
  kinds: string[];
  stackNotes: string[];
  guides: CatalogGuideLink[];
  price: CatalogPrice | null;
  href: string | null;
  rel: string | null;
  sponsored: boolean;
  feed: CatalogFeedItem[];
}

export interface CatalogStep {
  step: string;
  tool: string;
  role: string;
}

export interface CatalogAvoid {
  name: string;
  reason: string;
  sourceUrl: string | null;
}

export interface CatalogNeed {
  slug: string;
  title: string;
  job: string;
  summary: string;
  category: string;
  href: string;
  testStatus: 'pending' | 'tested';
  lastTestedLabel: string | null;
  roles: string[];
  skills: string[];
  goals: string[];
  tools: CatalogTool[];
  avoid: CatalogAvoid;
  steps: CatalogStep[];
}

export interface FinderCatalog {
  roles: FinderOption[];
  skills: FinderOption[];
  goals: FinderOption[];
  budgets: FinderBudget[];
  needs: CatalogNeed[];
  links: {
    useCases: string;
    feed: string;
    aboutMoney: string;
  };
}

export interface FinderAnswers {
  role: string;
  skill: string;
  goals: string[];
  budget: string;
}

export interface MatchedNeed extends CatalogNeed {
  goalLabels: string[];
  roleFit: boolean;
  skillFit: boolean;
  inBudget: CatalogTool[];
  unknownBudget: CatalogTool[];
  overBudget: CatalogTool[];
}

export interface MatchResult {
  needs: MatchedNeed[];
  unmatchedGoals: FinderOption[];
  roleLabel: string;
  skillLabel: string;
  budgetLabel: string;
  goalLabels: string[];
}

const KIND_RANK: Record<string, number> = {
  'Top pick': 0,
  'Budget pick': 1,
  'Also considered': 2,
  Shortlist: 3,
  Compared: 4,
  Alternative: 5,
  Pricing: 6,
  'In the stack': 7,
};

export function kindRank(kind: string): number {
  return KIND_RANK[kind] ?? 50;
}

/** Editorial role, then name. Sponsored is not a sort key. */
export function compareCatalogTools(a: CatalogTool, b: CatalogTool): number {
  const rankA = Math.min(...a.kinds.map(kindRank));
  const rankB = Math.min(...b.kinds.map(kindRank));
  if (rankA !== rankB) return rankA - rankB;
  return a.name.localeCompare(b.name);
}

function labelFor(options: FinderOption[], id: string): string {
  return options.find((option) => option.id === id)?.label ?? id;
}

function bucketTools(
  tools: CatalogTool[],
  budgetId: string,
  maxMonthlyUsd: number | undefined,
): Record<BudgetBucket, CatalogTool[]> {
    const grouped: Record<BudgetBucket, CatalogTool[]> = { in: [], out: [], unknown: [] };
  for (const tool of tools) {
    const bucket = classifyPrice(tool.price, budgetId, maxMonthlyUsd);
    grouped[bucket].push(tool);
  }
  grouped.in.sort(compareCatalogTools);
  grouped.out.sort(compareCatalogTools);
  grouped.unknown.sort(compareCatalogTools);
  return grouped;
}

/**
 * Goals decide which jobs appear. Role and skill annotate fit; they do not
 * drop a job the person explicitly asked for. Budget splits tools inside the
 * job and does not delete them. Input order is kept, so a sponsored flag
 * cannot move a tool up.
 */
export function matchStack(catalog: FinderCatalog, answers: FinderAnswers): MatchResult {
  const selected = new Set(answers.goals);
  const budget = catalog.budgets.find((option) => option.id === answers.budget);
  const covered = new Set(catalog.needs.flatMap((need) => need.goals));

  const needs = catalog.needs
    .filter((need) => need.goals.some((goal) => selected.has(goal)))
    .map((need) => {
      const buckets = bucketTools(need.tools, answers.budget, budget?.maxMonthlyUsd);
      const goalLabels = catalog.goals
        .filter((goal) => selected.has(goal.id) && need.goals.includes(goal.id))
        .map((goal) => goal.label);
      const matched: MatchedNeed = {
        ...need,
        goalLabels,
        roleFit: answers.role === 'other' || need.roles.includes(answers.role),
        skillFit: need.skills.includes(answers.skill),
        inBudget: buckets.in,
        unknownBudget: buckets.unknown,
        overBudget: buckets.out,
      };
      return matched;
    })
    .sort((a, b) => {
      const aGoal = answers.goals.findIndex((goal) => a.goals.includes(goal));
      const bGoal = answers.goals.findIndex((goal) => b.goals.includes(goal));
      if (aGoal !== bGoal) return aGoal - bGoal;
      if (a.roleFit !== b.roleFit) return a.roleFit ? -1 : 1;
      if (a.skillFit !== b.skillFit) return a.skillFit ? -1 : 1;
      return a.title.localeCompare(b.title);
    });

  return {
    needs,
    unmatchedGoals: catalog.goals.filter((goal) => selected.has(goal.id) && !covered.has(goal.id)),
    roleLabel: labelFor(catalog.roles, answers.role),
    skillLabel: labelFor(catalog.skills, answers.skill),
    budgetLabel: labelFor(catalog.budgets, answers.budget),
    goalLabels: catalog.goals.filter((goal) => selected.has(goal.id)).map((goal) => goal.label),
  };
}

/** Short results title. Role and budget phrases come from the persona map. */
export function stackHeadline(
  catalog: Pick<FinderCatalog, 'roles' | 'budgets'>,
  answers: Pick<FinderAnswers, 'role' | 'budget'>,
): string {
  const role = catalog.roles.find((option) => option.id === answers.role);
  const budget = catalog.budgets.find((option) => option.id === answers.budget);
  const asPhrase = role?.resultAs ?? 'your role';
  return budget?.resultPhrase ? `Your tools as ${asPhrase}, ${budget.resultPhrase}` : `Your tools as ${asPhrase}`;
}
