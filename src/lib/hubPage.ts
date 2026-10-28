import { dateInfo } from './contentDates.mjs';
import { buildWebPageJsonLd, type Crumb } from './schema';

export function hubPage(site: URL, pathname: string, title: string, description: string) {
  const siteUrl = new URL(import.meta.env.BASE_URL, site).href;
  const pageUrl = new URL(pathname, site).href;
  const info = dateInfo(pathname);
  if (!info.date) throw new Error(`No content date for ${pathname}`);
  const crumbs: Crumb[] = [
    { name: 'Home', url: siteUrl },
    { name: title, url: pageUrl },
  ];
  return {
    dateModified: info.date,
    dateLabel: info.aggregated ? 'Directory checked' : 'Last checked',
    jsonLd: buildWebPageJsonLd({
      title,
      description,
      pageUrl,
      siteUrl,
      dateModified: info.date,
      crumbs,
    }),
  };
}
