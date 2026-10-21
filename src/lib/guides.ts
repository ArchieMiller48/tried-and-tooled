import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { getCollection } from 'astro:content';

/** Empty collections warn on every page that queries them. Skip the query when there is no markdown yet. */
export function hasGuideEntries(folder: string): boolean {
  try {
    return readdirSync(join(process.cwd(), 'src/content', folder)).some((name) => name.endsWith('.md'));
  } catch {
    return false;
  }
}

export interface GuideLink {
  href: string;
  kind: string;
  title: string;
  summary: string;
  testStatus: 'pending' | 'tested';
  parent: string;
}

const kinds = [
  { collection: 'compare', kind: 'Compare', prefix: '/compare/' },
  { collection: 'best', kind: 'Best', prefix: '/best/' },
  { collection: 'alternatives', kind: 'Alternatives', prefix: '/alternatives/' },
  { collection: 'pricing', kind: 'Pricing', prefix: '/pricing/' },
] as const;

const kindLabel = {
  compare: 'Compare',
  best: 'Best',
  alternatives: 'Alternatives',
  pricing: 'Pricing',
} as const;

export interface GuideIndexEntry extends GuideLink {
  parentHref: string;
  parentTitle: string;
}

/** One collection's published pages, with the parent use-case link for the index. */
export async function guideIndexEntries(collection: keyof typeof kindLabel): Promise<GuideIndexEntry[]> {
  if (!hasGuideEntries(collection)) return [];
  const [entries, useCases] = await Promise.all([
    getCollection(collection, ({ data }) => !data.draft),
    getCollection('use-cases'),
  ]);
  const titles = new Map(useCases.map((entry) => [entry.id, entry.data.title]));
  return entries
    .sort((a, b) => a.data.title.localeCompare(b.data.title))
    .map((entry) => {
      const parentTitle = titles.get(entry.data.parent);
      if (!parentTitle) throw new Error(`Guide "${entry.data.title}" points at an unknown use case "${entry.data.parent}".`);
      return {
        href: `/${collection}/${entry.id}/`,
        kind: kindLabel[collection],
        title: entry.data.title,
        summary: entry.data.summary,
        testStatus: entry.data.testStatus,
        parent: entry.data.parent,
        parentHref: `/use-cases/${entry.data.parent}/`,
        parentTitle,
      };
    });
}

/** Published guide pages across the four intent collections, for hubs and use-case pages. */
export async function listGuides(): Promise<GuideLink[]> {
  const groups = await Promise.all(
    kinds.map(async ({ collection, kind, prefix }) => {
      if (!hasGuideEntries(collection)) return [];
      const entries = await getCollection(collection, ({ data }) => !data.draft);
      return entries.map((entry) => ({
        href: `${prefix}${entry.id}/`,
        kind,
        title: entry.data.title,
        summary: entry.data.summary,
        testStatus: entry.data.testStatus,
        parent: entry.data.parent,
      }));
    }),
  );
  return groups.flat().sort((a, b) => a.title.localeCompare(b.title));
}
