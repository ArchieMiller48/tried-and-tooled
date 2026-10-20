import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/** A verified price point. Every price must carry a source URL and the date it was checked. */
const pricing = z.object({
  summary: z.string(),
  sourceUrl: z.string().url(),
  checked: z.coerce.date(),
});

const pick = z.object({
  name: z.string(),
  url: z.string().url(),
  why: z.string(),
  pricing,
  /** Affiliate link placeholder. Leave null until an affiliate program is approved; never changes ranking. */
  affiliateUrl: z.string().url().nullable().default(null),
});

const useCases = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/use-cases' }),
  schema: z.object({
    title: z.string(),
    job: z.string(), // the use case, phrased as a job to be done
    summary: z.string(),
    audience: z.array(z.enum(['vibe-coders', 'creators', 'builders'])).min(1),
    category: z.enum(['Build', 'Code quality', 'Video', 'Images', 'Audio']),
    topPick: pick,
    budgetPick: pick,
    avoid: z.object({
      name: z.string(),
      reason: z.string(),
      sourceUrl: z.string().url().optional(),
    }),
    stack: z
      .array(z.object({ step: z.string(), tool: z.string(), role: z.string() }))
      .min(2),
    alsoConsidered: z
      .array(z.object({ name: z.string(), url: z.string().url(), note: z.string(), pricing }))
      .default([]),
    /** 'pending' until a human or agent has run the standard test task and saved artefacts. */
    testStatus: z.enum(['pending', 'tested']),
    lastTested: z.coerce.date().nullable(), // null while pending — never fake a test date
    lastVerified: z.coerce.date(), // date facts (pricing/features) were last checked against sources
    testNotes: z.string(),
    draft: z.boolean().default(false),
  }),
});

const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/new' }),
  schema: z.object({
    title: z.string(),
    tool: z.string(),
    spotted: z.coerce.date(),
    summary: z.string(),
    whoFor: z.string(),
    sourceUrl: z.string().url(),
    tags: z.array(z.string()).default([]),
  }),
});

/** Shared fields for compare, best, alternatives and pricing pages. */
const intent = {
  title: z.string(),
  summary: z.string(),
  /** Primary query this page is written to answer, in natural language. */
  targetQuery: z.string(),
  secondaryQueries: z.array(z.string()).default([]),
  /** Use-case slug this page hangs off, e.g. vibe-code-an-mvp. */
  parent: z.string(),
  testStatus: z.enum(['pending', 'tested']),
  lastTested: z.coerce.date().nullable(),
  lastVerified: z.coerce.date(),
  verdicts: z
    .array(z.object({ situation: z.string(), guidance: z.string() }))
    .min(2),
  faqs: z
    .array(z.object({ question: z.string(), answer: z.string() }))
    .min(3),
  draft: z.boolean().default(false),
};

const sourceLink = z.object({
  label: z.string(),
  url: z.string().url(),
});

const namedTool = z.object({
  name: z.string(),
  url: z.string().url(),
  pricing,
  /** Feature claims beyond the price line. Each one should be a vendor page. */
  sources: z.array(sourceLink).default([]),
  affiliateUrl: z.string().url().nullable().default(null),
});

const compare = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/compare' }),
  schema: z.object({
    ...intent,
    tools: z
      .array(namedTool.extend({ blurb: z.string() }))
      .length(2),
    rows: z
      .array(
        z.object({
          label: z.string(),
          /** One cell per tool, in the same order as `tools`. */
          cells: z.array(z.string()).length(2),
          sources: z.array(sourceLink).min(1),
        }),
      )
      .min(3),
  }),
});

const best = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/best' }),
  schema: z.object({
    ...intent,
    picks: z
      .array(
        namedTool.extend({
          fit: z.string(),
          why: z.string(),
          caveat: z.string().optional(),
        }),
      )
      .min(2),
  }),
});

const alternatives = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/alternatives' }),
  schema: z.object({
    ...intent,
    subject: namedTool.extend({ blurb: z.string() }),
    alternatives: z
      .array(namedTool.extend({ why: z.string(), tradeoff: z.string() }))
      .min(1),
  }),
});

const pricingPages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pricing' }),
  schema: z.object({
    ...intent,
    tool: z.object({
      name: z.string(),
      url: z.string().url(),
      affiliateUrl: z.string().url().nullable().default(null),
    }),
    plans: z
      .array(
        z.object({
          name: z.string(),
          price: z.string(),
          includes: z.string(),
          sourceUrl: z.string().url(),
          checked: z.coerce.date(),
        }),
      )
      .min(1),
  }),
});

export const collections = {
  'use-cases': useCases,
  news,
  compare,
  best,
  alternatives,
  pricing: pricingPages,
};
