/**
 * Prefix a site-root path with Astro's configured base.
 * `import.meta.env.BASE_URL` always has a trailing slash (`/` or `/tried-and-tooled/`).
 * Hash-only and already-absolute URLs are returned unchanged.
 */
export function withBase(path: string): string {
  if (!path || /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(path)) return path;
  const base = import.meta.env.BASE_URL;
  if (path.startsWith('#')) return `${base}${path}`;
  const relative = path.startsWith('/') ? path.slice(1) : path;
  return `${base}${relative}`;
}
