import {
  applicationCategory,
  faqPlainText,
  offerFromPrice,
  type FaqBlock,
  type PriceFact,
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
        '@type': 'WebPage',
        '@id': `${input.siteUrl}#webpage`,
        url: input.siteUrl,
        name: 'Tried & Tooled',
        description: input.description,
        dateModified: input.dateModified,
        inLanguage: 'en-GB',
        isPartOf: { '@id': websiteId },
        breadcrumb: { '@id': `${input.siteUrl}#breadcrumb` },
        publisher: { '@id': orgId },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${input.siteUrl}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: input.siteUrl },
        ],
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

function softwareApp(
  tool: { name: string; url: string; why?: string; description?: string; pricing: PriceFact },
  category: string,
): Record<string, unknown> {
  return {
    '@type': 'SoftwareApplication',
    name: tool.name,
    url: tool.url,
    applicationCategory: category,
    description: tool.why ?? tool.description ?? tool.name,
    offers: offerFromPrice(tool.pricing),
  };
}

export function buildWebPageJsonLd(input: {
  title: string;
  description: string;
  pageUrl: string;
  siteUrl: string;
  dateModified: string;
  crumbs: Crumb[];
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
      breadcrumbList(input.pageUrl, input.crumbs),
    ],
  };
}

function breadcrumbList(pageUrl: string, crumbs: Crumb[]): Record<string, unknown> {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${pageUrl}#breadcrumb`,
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
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
  tools?: { name: string; url: string; description: string; pricing: PriceFact }[];
  applicationCategory?: string;
}): Record<string, unknown> {
  const page: Record<string, unknown> = {
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
  };
  const graph: Record<string, unknown>[] = [
    page,
    breadcrumbList(input.pageUrl, input.crumbs),
  ];
  if (input.tools?.length) {
    if (!input.applicationCategory) throw new Error(`Guide "${input.title}" needs an applicationCategory for its tool list.`);
    page.mainEntity = { '@id': `${input.pageUrl}#tools` };
    graph.push({
      '@type': 'ItemList',
      '@id': `${input.pageUrl}#tools`,
      name: input.title,
      itemListOrder: 'https://schema.org/ItemListOrderAscending',
      numberOfItems: input.tools.length,
      itemListElement: input.tools.map((tool, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: tool.name,
        item: softwareApp({ ...tool, why: tool.description }, input.applicationCategory as string),
      })),
    });
  }
  graph.push({
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
  });
  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}

export function buildNewsletterIndexJsonLd(input: {
  pageUrl: string;
  siteUrl: string;
  description: string;
  dateModified: string;
  posts: { title: string; url: string; datePublished: string }[];
}): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': input.pageUrl,
        url: input.pageUrl,
        name: 'Newsletter',
        description: input.description,
        dateModified: input.dateModified,
        inLanguage: 'en-GB',
        isPartOf: {
          '@type': 'WebSite',
          name: 'Tried & Tooled',
          url: input.siteUrl,
        },
        mainEntity: { '@id': `${input.pageUrl}#blog` },
        breadcrumb: { '@id': `${input.pageUrl}#breadcrumb` },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${input.pageUrl}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: input.siteUrl },
          { '@type': 'ListItem', position: 2, name: 'Newsletter', item: input.pageUrl },
        ],
      },
      {
        '@type': 'Blog',
        '@id': `${input.pageUrl}#blog`,
        url: input.pageUrl,
        name: 'Tried & Tooled newsletter',
        description: input.description,
        dateModified: input.dateModified,
        inLanguage: 'en-GB',
        publisher: {
          '@type': 'Organization',
          name: 'Tried & Tooled',
          url: input.siteUrl,
        },
        blogPost: input.posts.map((post) => ({
          '@type': 'BlogPosting',
          headline: post.title,
          url: post.url,
          datePublished: post.datePublished,
          mainEntityOfPage: post.url,
        })),
      },
    ],
  };
}

export function buildNewsletterIssueJsonLd(input: {
  title: string;
  description: string;
  pageUrl: string;
  siteUrl: string;
  archiveUrl: string;
  datePublished: string;
  crumbs: Crumb[];
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
        dateModified: input.datePublished,
        inLanguage: 'en-GB',
        isPartOf: {
          '@type': 'WebSite',
          name: 'Tried & Tooled',
          url: input.siteUrl,
        },
        breadcrumb: { '@id': `${input.pageUrl}#breadcrumb` },
        mainEntity: { '@id': `${input.pageUrl}#article` },
      },
      {
        '@type': 'BlogPosting',
        '@id': `${input.pageUrl}#article`,
        headline: input.title,
        description: input.description,
        datePublished: input.datePublished,
        dateModified: input.datePublished,
        inLanguage: 'en-GB',
        mainEntityOfPage: { '@id': input.pageUrl },
        url: input.pageUrl,
        isPartOf: {
          '@type': 'Blog',
          name: 'Tried & Tooled newsletter',
          url: input.archiveUrl,
        },
        publisher: {
          '@type': 'Organization',
          name: 'Tried & Tooled',
          url: input.siteUrl,
        },
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
    ],
  };
}
