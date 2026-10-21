import {
  applicationCategory,
  faqPlainText,
  offerFromPrice,
  type FaqBlock,
  type NamedPick,
  type UseCaseEntry,
} from './useCaseFacts';

export interface Crumb {
  name: string;
  url: string;
}

export function buildHomeJsonLd(input: {
  siteUrl: string;
  logoUrl: string;
  description: string;
  dateModified: string;
}): Record<string, unknown> {
  const websiteId = `${input.siteUrl}#website`;
  const orgId = `${input.siteUrl}#organization`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': websiteId,
        name: 'Tried & Tooled',
        url: input.siteUrl,
        description: input.description,
        dateModified: input.dateModified,
        inLanguage: 'en-GB',
        publisher: { '@id': orgId },
      },
      {
        '@type': 'Organization',
        '@id': orgId,
        name: 'Tried & Tooled',
        url: input.siteUrl,
        description: input.description,
        logo: {
          '@type': 'ImageObject',
          url: input.logoUrl,
        },
      },
    ],
  };
}

export function buildUseCaseJsonLd(input: {
  entry: UseCaseEntry;
  pageUrl: string;
  siteUrl: string;
  description: string;
  dateModified: string;
  crumbs: Crumb[];
  faqs: FaqBlock[];
}): Record<string, unknown> {
  const { entry } = input;
  const category = applicationCategory(entry.data.category);
  const tools = [entry.data.topPick, entry.data.budgetPick];
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': input.pageUrl,
        url: input.pageUrl,
        name: entry.data.title,
        description: input.description,
        dateModified: input.dateModified,
        inLanguage: 'en-GB',
        isPartOf: {
          '@type': 'WebSite',
          '@id': `${input.siteUrl}#website`,
          name: 'Tried & Tooled',
          url: input.siteUrl,
        },
        breadcrumb: { '@id': `${input.pageUrl}#breadcrumb` },
        mainEntity: { '@id': `${input.pageUrl}#tools` },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${input.pageUrl}#breadcrumb`,
        itemListElement: input.crumbs.map((crumb, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: crumb.name,
          item: crumb.url,
        })),
      },
      {
        '@type': 'ItemList',
        '@id': `${input.pageUrl}#tools`,
        name: `Recommended tools for ${entry.data.title}`,
        itemListOrder: 'https://schema.org/ItemListOrderAscending',
        numberOfItems: tools.length,
        itemListElement: tools.map((tool, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: index === 0 ? 'Top pick' : 'Budget pick',
          item: softwareApp(tool, category),
        })),
      },
      {
        '@type': 'FAQPage',
        '@id': `${input.pageUrl}#faq`,
        dateModified: input.dateModified,
        mainEntity: input.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faqPlainText(faq),
          },
        })),
      },
    ],
  };
}

function softwareApp(tool: NamedPick, category: string): Record<string, unknown> {
  return {
    '@type': 'SoftwareApplication',
    name: tool.name,
    url: tool.url,
    applicationCategory: category,
    description: tool.why,
    offers: offerFromPrice(tool.pricing),
  };
}

export function buildGuideJsonLd(input: {
  title: string;
  description: string;
  pageUrl: string;
  siteUrl: string;
  dateModified: string;
  crumbs: Crumb[];
  faqs: { question: string; answer: string }[];
}): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': input.pageUrl,
        url: input.pageUrl,
        name: input.title,
        description: input.description,
        dateModified: input.dateModified,
        inLanguage: 'en-GB',
        isPartOf: {
          '@type': 'WebSite',
          name: 'Tried & Tooled',
          url: input.siteUrl,
        },
        breadcrumb: { '@id': `${input.pageUrl}#breadcrumb` },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${input.pageUrl}#breadcrumb`,
        itemListElement: input.crumbs.map((crumb, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: crumb.name,
          item: crumb.url,
        })),
      },
      {
        '@type': 'FAQPage',
        '@id': `${input.pageUrl}#faq`,
        dateModified: input.dateModified,
        mainEntity: input.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ],
  };
}
