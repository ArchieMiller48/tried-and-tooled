import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const BASE = '/tried-and-tooled';

/** @type {{ dates: Map<string, string>, aggregated: Set<string> } | undefined} */
let cache;

function frontmatter(file) {
  const text = readFileSync(file, 'utf8');
  if (!text.startsWith('---')) return {};
  const end = text.indexOf('\n---', 3);
  const block = text.slice(3, end === -1 ? undefined : end);
  /** @type {Record<string, string>} */
  const data = {};
  for (const line of block.split('\n')) {
    const match = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (!match) continue;
    data[match[1]] = match[2].trim().replace(/^['"]|['"]$/g, '');
  }
  return data;
}

function markdownFiles(folder) {
  const dir = join(process.cwd(), 'src/content', folder);
  try {
    return readdirSync(dir)
      .filter((name) => name.endsWith('.md'))
      .map((name) => join(dir, name));
  } catch {
    return [];
  }
}

function isoDay(value) {
  const day = String(value ?? '').slice(0, 10);
  return /^\d{4}-\d{2}-\d{2}$/.test(day) ? day : '';
}

/**
 * @param {string} pathname
 */
export function normalisePath(pathname) {
  let path = pathname;
  if (pathname.startsWith('http')) path = new URL(pathname).pathname;
  if (!path.startsWith('/')) path = `/${path}`;
  if (path !== `${BASE}/` && !path.startsWith(`${BASE}/`)) path = `${BASE}${path}`;
  if (!path.endsWith('/')) path += '/';
  return path.replace(/\/{2,}/g, '/');
}

function consider(dates, path, day) {
  if (!day) return;
  const prev = dates.get(path);
  if (!prev || day > prev) dates.set(path, day);
}

/** Pathname (including the project base) to the newest YYYY-MM-DD we can defend. */
export function contentLastmods() {
  if (cache) return cache.dates;
  /** @type {Map<string, string>} */
  const dates = new Map();
  /** @type {Set<string>} */
  const aggregated = new Set();
  /** @type {string[]} */
  const all = [];

  const groups = [
    ['use-cases', '/use-cases/', 'lastVerified'],
    ['compare', '/compare/', 'lastVerified'],
    ['best', '/best/', 'lastVerified'],
    ['alternatives', '/alternatives/', 'lastVerified'],
    ['pricing', '/pricing/', 'lastVerified'],
    ['newsletter', '/newsletter/', 'date'],
  ];

  for (const [folder, prefix, key] of groups) {
    /** @type {string[]} */
    const childDays = [];
    for (const file of markdownFiles(folder)) {
      const data = frontmatter(file);
      if (data.draft === 'true') continue;
      const day = isoDay(data[key]);
      if (!day) continue;
      const id = file.split('/').pop().replace(/\.md$/, '');
      consider(dates, `${BASE}${prefix}${id}/`, day);
      childDays.push(day);
      all.push(day);
    }
    if (childDays.length) consider(dates, `${BASE}${prefix}`, childDays.sort().at(-1));
  }

  /** @type {string[]} */
  const spotted = [];
  for (const file of markdownFiles('new')) {
    const day = isoDay(frontmatter(file).spotted);
    if (!day) continue;
    spotted.push(day);
    all.push(day);
  }
  if (spotted.length) consider(dates, `${BASE}/new/`, spotted.sort().at(-1));

  const latest = all.sort().at(-1);
  if (latest) {
    consider(dates, `${BASE}/`, latest);
    for (const path of ['/about/', '/search/', '/submit/', '/find-your-tool/', '/alternatives/', '/pricing/']) {
      const full = `${BASE}${path}`;
      if (!dates.has(full)) {
        dates.set(full, latest);
        aggregated.add(full);
      }
    }
  }

  cache = { dates, aggregated };
  return dates;
}

/** @param {string} pathname */
export function lastmodFor(pathname) {
  return contentLastmods().get(normalisePath(pathname));
}

/** @param {string} pathname */
export function dateInfo(pathname) {
  const dates = contentLastmods();
  const key = normalisePath(pathname);
  return { date: dates.get(key), aggregated: cache.aggregated.has(key) };
}

export function latestFactCheck() {
  const latest = [...contentLastmods().values()].sort().at(-1);
  if (!latest) throw new Error('No content dates found.');
  return latest;
}
