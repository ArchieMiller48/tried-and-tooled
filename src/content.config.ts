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

export const collections = { 'use-cases': useCases, news };
