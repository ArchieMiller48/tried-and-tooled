/** UK short date, pinned to UTC so a date-only frontmatter value stays on that day. */
export function formatDate(dt: Date): string {
  return dt.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

/** ISO calendar date in UTC, matching {@link formatDate}'s day. */
export function isoDate(dt: Date): string {
  return dt.toLocaleDateString('en-CA', { timeZone: 'UTC' });
}
