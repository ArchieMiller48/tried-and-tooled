const BRAND_SUFFIX = ' · Tried & Tooled';
const TITLE_LIMIT = 65;

function fits(title: string): boolean {
  return (title + BRAND_SUFFIX).length <= TITLE_LIMIT;
}

/**
 * Search title for a comparison or shortlist.
 * Keeps the year and the query, and stays inside the snippet limit used for use-case titles.
 */
export function guideDocumentTitle(title: string, year: number): string {
  const withYear = /\b20\d{2}\b/.test(title) ? title : `${title} (${year})`;
  if (fits(withYear)) return withYear;
  const head = withYear.split(':')[0].trim();
  if (head && fits(head)) return head;
  const room = TITLE_LIMIT - BRAND_SUFFIX.length - 1;
  return `${(head || withYear).slice(0, room).trimEnd()}…`;
}
