import { dateInfo } from './contentDates.mjs';
import { buildCollectionPageJsonLd, buildWebPageJsonLd, type Crumb } from './schema';
import { withBase } from './withBase';

export interface HubItem {
  name: string;
  path: string;
}

export function hubPage(site: URL, pathname: string, title: string, description: string, items: HubItem[] = []) {
  const siteUrl = new URL(import.meta.env.BASE_URL, site).href;
  const pageUrl = new URL(pathname, site).href;
  const info = dateInfo(pathname);
  if (!info.date) throw new Error(`No content date for ${pathname}`);
  const crumbs: Crumb[] = [
    { name: 'Home', url: siteUrl },
    { name: title, url: pageUrl },
  ];
  const listed = items.map((item) => ({
    name: item.name,
    url: new URL(withBase(item.path), site).href,
  }));
  const shared = {
    title,
    description,
    pageUrl,
    siteUrl,
    dateModified: info.date,
    crumbs,
  };
  return {
    dateModified: info.date,
    dateLabel: info.aggregated ? 'Directory checked' : 'Last checked',
    jsonLd: listed.length
      ? buildCollectionPageJsonLd({ ...shared, items: listed })
      : buildWebPageJsonLd(shared),
  };
}
