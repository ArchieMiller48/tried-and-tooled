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
