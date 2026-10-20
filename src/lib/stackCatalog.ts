import { getCollection, type CollectionEntry } from 'astro:content';
import { formatDate } from './formatDate';
import { hasGuideEntries } from './guides';
import { outboundHref, outboundRel } from './outbound';
import { assessPrice } from './priceFit';
import { compareCatalogTools, kindRank, type CatalogGuideLink, type CatalogNeed, type CatalogTool, type FinderCatalog } from './stackMatch';
import { newsMatchesTool, textHasName, toolId } from './toolNames';
import { withBase } from './withBase';
import personasJson from '../data/personas.json';

interface PersonaOption {
  id: string;
  label: string;
  detail?: string;
}

interface PersonaBudget extends PersonaOption {
  maxMonthlyUsd?: number;
}

interface PersonaTag {
  roles: string[];
  skills: string[];
  goals: string[];
}

interface PersonaFile {
  notes?: string;
  roles: PersonaOption[];
  skills: PersonaOption[];
  goals: PersonaOption[];
  budgets: PersonaBudget[];
  useCases: Record<string, PersonaTag>;
}

interface PriceInput {
  summary: string;
  sourceUrl: string;
  checked: Date;
}

interface MentionInput {
  kind: string;
  detail: string | null;
  href?: string | null;
  title?: string | null;
}

interface ToolDraft {
  id: string;
  name: string;
  nameRank: number;
  url: string | null;
  affiliateUrl: string | null;
  mentions: MentionInput[];
  mentionKeys: Set<string>;
  pricing: PriceInput | null;
  feed: CatalogTool['feed'];
}

function validatePersonas(personas: PersonaFile): void {
  const groups = [
    ['roles', personas.roles],
    ['skills', personas.skills],
    ['goals', personas.goals],
    ['budgets', personas.budgets],
  ] as const;
  for (const [name, options] of groups) {
    if (!Array.isArray(options) || options.length === 0) {
      throw new Error(`src/data/personas.json needs at least one ${name} entry.`);
    }
    const ids = new Set<string>();
    for (const option of options) {
      if (!option.id || !option.label) {
        throw new Error(`src/data/personas.json has a ${name} entry missing id or label.`);
      }
      if (ids.has(option.id)) throw new Error(`Duplicate ${name} id "${option.id}" in src/data/personas.json.`);
      ids.add(option.id);
    }
  }
  const roleIds = new Set(personas.roles.map((option) => option.id));
  const skillIds = new Set(personas.skills.map((option) => option.id));
  const goalIds = new Set(personas.goals.map((option) => option.id));
  const under25 = personas.budgets.find((budget) => budget.id === 'under-25');
  if (!under25 || typeof under25.maxMonthlyUsd !== 'number') {
    throw new Error('src/data/personas.json budget "under-25" needs a numeric maxMonthlyUsd.');
  }
  for (const [slug, tag] of Object.entries(personas.useCases)) {
    for (const key of ['roles', 'skills', 'goals'] as const) {
      if (!Array.isArray(tag[key]) || tag[key].length === 0) {
        throw new Error(`Use case "${slug}" in src/data/personas.json needs at least one ${key} id.`);
      }
    }
    for (const id of tag.roles) {
      if (!roleIds.has(id)) throw new Error(`Use case "${slug}" has unknown role "${id}".`);
    }
    for (const id of tag.skills) {
      if (!skillIds.has(id)) throw new Error(`Use case "${slug}" has unknown skill "${id}".`);
    }
    for (const id of tag.goals) {
      if (!goalIds.has(id)) throw new Error(`Use case "${slug}" has unknown goal "${id}".`);
    }
  }
}

function addTool(
  map: Map<string, ToolDraft>,
  name: string,
  url: string | null,
  affiliateUrl: string | null,
  pricing: PriceInput | null,
  mention: MentionInput,
): ToolDraft {
  const id = toolId(name);
  let tool = map.get(id);
  if (!tool) {
    tool = {
      id,
      name,
      nameRank: 99,
      url,
      affiliateUrl,
      mentions: [],
      mentionKeys: new Set(),
      pricing: null,
      feed: [],
    };
    map.set(id, tool);
  }
  const mentionRank = kindRank(mention.kind);
  if (mentionRank < tool.nameRank) {
    tool.name = name;
    tool.nameRank = mentionRank;
  }
  if (!tool.url && url) tool.url = url;
  if (affiliateUrl) tool.affiliateUrl = affiliateUrl;
  if (pricing && (!tool.pricing || pricing.checked > tool.pricing.checked)) {
    tool.pricing = pricing;
  }
  const key = `${mention.kind}|${mention.href ?? ''}|${mention.detail ?? ''}`;
  if (!tool.mentionKeys.has(key)) {
    tool.mentionKeys.add(key);
    tool.mentions.push(mention);
  }
  return tool;
}

function toCatalogTool(tool: ToolDraft): CatalogTool {
  const mentions = tool.mentions.slice().sort((a, b) => kindRank(a.kind) - kindRank(b.kind) || a.kind.localeCompare(b.kind));
  const kinds: string[] = [];
  for (const mention of mentions) {
    if (!kinds.includes(mention.kind)) kinds.push(mention.kind);
  }
  const blurb =
    mentions.find((mention) => mention.detail && mention.kind !== 'In the stack')?.detail ??
    mentions.find((mention) => mention.detail)?.detail ??
    null;
  const stackNotes = [
    ...new Set(
      mentions
        .filter((mention) => mention.kind === 'In the stack' && mention.detail && mention.detail !== blurb)
        .map((mention) => mention.detail as string),
    ),
  ];
  const guides: CatalogGuideLink[] = [];
  const seenGuides = new Set<string>();
  const guideMentions = mentions.filter((mention) => mention.href);
  for (const mention of guideMentions) {
    if (!mention.href || seenGuides.has(mention.href)) continue;
    seenGuides.add(mention.href);
    const sameKind = guideMentions.filter((item) => item.kind === mention.kind).length;
    guides.push({
      href: mention.href,
      label: sameKind > 1 && mention.title ? mention.title : mention.kind,
    });
  }
  const price = tool.pricing
    ? {
        summary: tool.pricing.summary,
        sourceUrl: tool.pricing.sourceUrl,
        checkedLabel: formatDate(tool.pricing.checked),
        ...assessPrice(tool.pricing.summary),
      }
    : null;
  if (price && !price.parsed && /[$€£]|\bfree\b/i.test(price.summary)) {
    console.warn(`[find-your-stack] Could not read a free tier or monthly price from "${tool.name}": ${price.summary}`);
  }
  const href = tool.url ? outboundHref(tool.url, tool.affiliateUrl) : null;
  return {
    id: tool.id,
    name: tool.name,
    blurb,
    kinds,
    stackNotes,
    guides,
    price,
    href,
    rel: href ? outboundRel(tool.affiliateUrl) : null,
    sponsored: Boolean(tool.affiliateUrl),
    feed: tool.feed,
  };
}

function sortTools(tools: CatalogTool[]): CatalogTool[] {
  return tools.slice().sort(compareCatalogTools);
}

async function loadBest(): Promise<CollectionEntry<'best'>[]> {
  if (!hasGuideEntries('best')) return [];
  return getCollection('best', ({ data }) => !data.draft);
}

async function loadCompare(): Promise<CollectionEntry<'compare'>[]> {
  if (!hasGuideEntries('compare')) return [];
  return getCollection('compare', ({ data }) => !data.draft);
}

async function loadAlternatives(): Promise<CollectionEntry<'alternatives'>[]> {
  if (!hasGuideEntries('alternatives')) return [];
  return getCollection('alternatives', ({ data }) => !data.draft);
}

async function loadPricing(): Promise<CollectionEntry<'pricing'>[]> {
  if (!hasGuideEntries('pricing')) return [];
  return getCollection('pricing', ({ data }) => !data.draft);
}

/** Build the finder catalogue from content collections. Safe to call at build time only. */
export async function buildStackCatalog(): Promise<FinderCatalog> {
  const personas = personasJson as PersonaFile;
  validatePersonas(personas);

  const allUseCases = await getCollection('use-cases');
  const known = new Set(allUseCases.map((entry) => entry.id));
  for (const slug of Object.keys(personas.useCases)) {
    if (!known.has(slug)) {
      throw new Error(`src/data/personas.json tags "${slug}", which is not a use case file.`);
    }
  }
  const useCases = allUseCases.filter((entry) => !entry.data.draft);
  for (const entry of useCases) {
    if (!personas.useCases[entry.id]) {
      throw new Error(
        `Use case "${entry.id}" is not tagged in src/data/personas.json. Add roles, skills and goals so Find your stack stays complete.`,
      );
    }
  }

  const [best, compare, alternatives, pricingPages, news] = await Promise.all([
    loadBest(),
    loadCompare(),
    loadAlternatives(),
    loadPricing(),
    getCollection('news'),
  ]);

  const needs: CatalogNeed[] = useCases.map((entry) => {
    const data = entry.data;
    const tag = personas.useCases[entry.id];
    const tools = new Map<string, ToolDraft>();
    const href = withBase(`/use-cases/${entry.id}/`);

    addTool(tools, data.topPick.name, data.topPick.url, data.topPick.affiliateUrl, data.topPick.pricing, {
      kind: 'Top pick',
      detail: data.topPick.why,
    });
    addTool(tools, data.budgetPick.name, data.budgetPick.url, data.budgetPick.affiliateUrl, data.budgetPick.pricing, {
      kind: 'Budget pick',
      detail: data.budgetPick.why,
    });
    for (const considered of data.alsoConsidered) {
      addTool(tools, considered.name, considered.url, null, considered.pricing, {
        kind: 'Also considered',
        detail: considered.note,
      });
    }

    for (const guide of best.filter((item) => item.data.parent === entry.id)) {
      const guideHref = withBase(`/best/${guide.id}/`);
      for (const pick of guide.data.picks) {
        addTool(tools, pick.name, pick.url, pick.affiliateUrl, pick.pricing, {
          kind: 'Shortlist',
          detail: pick.why,
          href: guideHref,
          title: guide.data.title,
        });
      }
    }
    for (const guide of compare.filter((item) => item.data.parent === entry.id)) {
      const guideHref = withBase(`/compare/${guide.id}/`);
      for (const tool of guide.data.tools) {
        addTool(tools, tool.name, tool.url, tool.affiliateUrl, tool.pricing, {
          kind: 'Compared',
          detail: tool.blurb,
          href: guideHref,
          title: guide.data.title,
        });
      }
    }
    for (const guide of alternatives.filter((item) => item.data.parent === entry.id)) {
      const guideHref = withBase(`/alternatives/${guide.id}/`);
      const subject = guide.data.subject;
      addTool(tools, subject.name, subject.url, subject.affiliateUrl, subject.pricing, {
        kind: 'Alternative',
        detail: subject.blurb,
        href: guideHref,
        title: guide.data.title,
      });
      for (const tool of guide.data.alternatives) {
        addTool(tools, tool.name, tool.url, tool.affiliateUrl, tool.pricing, {
          kind: 'Alternative',
          detail: tool.why,
          href: guideHref,
          title: guide.data.title,
        });
      }
    }
    for (const guide of pricingPages.filter((item) => item.data.parent === entry.id)) {
      const guideHref = withBase(`/pricing/${guide.id}/`);
      const plans = guide.data.plans;
      const latest = plans.reduce((bestPlan, plan) => (plan.checked > bestPlan.checked ? plan : bestPlan), plans[0]);
      addTool(tools, guide.data.tool.name, guide.data.tool.url, guide.data.tool.affiliateUrl, {
        summary: plans.map((plan) => `${plan.name}: ${plan.price}`).join(' '),
        sourceUrl: latest.sourceUrl,
        checked: latest.checked,
      }, {
        kind: 'Pricing',
        detail: null,
        href: guideHref,
        title: guide.data.title,
      });
    }

    for (const step of data.stack) {
      const text = `${step.tool} ${step.role}`;
      for (const tool of tools.values()) {
        if (!textHasName(text, tool.name)) continue;
        addTool(tools, tool.name, tool.url, tool.affiliateUrl, null, {
          kind: 'In the stack',
          detail: `${step.step}: ${step.role}`,
        });
      }
    }

    for (const tool of tools.values()) {
      const related = news
        .filter((item) => newsMatchesTool(item.data.tool, tool.name))
        .sort((a, b) => b.data.spotted.getTime() - a.data.spotted.getTime());
      tool.feed = related.map((item) => ({
        title: item.data.title,
        href: withBase(`/new/#${item.id}`),
        spottedLabel: formatDate(item.data.spotted),
      }));
    }

    return {
      slug: entry.id,
      title: data.title,
      job: data.job,
      summary: data.summary,
      category: data.category,
      href,
      testStatus: data.testStatus,
      lastTestedLabel: data.lastTested ? formatDate(data.lastTested) : null,
      roles: tag.roles,
      skills: tag.skills,
      goals: tag.goals,
      tools: sortTools([...tools.values()].map(toCatalogTool)),
      avoid: {
        name: data.avoid.name,
        reason: data.avoid.reason,
        sourceUrl: data.avoid.sourceUrl ?? null,
      },
      steps: data.stack.map((step) => ({ step: step.step, tool: step.tool, role: step.role })),
    };
  });

  needs.sort((a, b) => a.title.localeCompare(b.title));

  return {
    roles: personas.roles,
    skills: personas.skills,
    goals: personas.goals,
    budgets: personas.budgets,
    needs,
    links: {
      useCases: withBase('/use-cases/'),
      feed: withBase('/new/'),
      aboutMoney: withBase('/about/#money'),
    },
  };
}
