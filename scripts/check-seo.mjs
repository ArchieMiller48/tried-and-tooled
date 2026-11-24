import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const dist = 'dist';
const base = '/tried-and-tooled';
const origin = 'https://archiemiller48.github.io';
const errors = [];

function fail(message) {
  errors.push(message);
}

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path, out);
    else out.push(path);
  }
  return out;
}

function decode(value) {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

function attr(html, pattern) {
  const match = html.match(pattern);
  return match ? decode(match[1]) : '';
}

function publicPath(file) {
  let rel = file.replace(/\\/g, '/').replace(/^dist\//, '');
  if (rel === 'index.html') return `${base}/`;
  if (rel.endsWith('/index.html')) return `${base}/${rel.slice(0, -'index.html'.length)}`;
  return `${base}/${rel}`;
}

function pathToFile(pathname) {
  if (!pathname.startsWith(base)) return null;
  let rel = pathname.slice(base.length);
  if (rel === '' || rel === '/') return join(dist, 'index.html');
  if (rel.endsWith('/')) return join(dist, rel.slice(1), 'index.html');
  return join(dist, rel.slice(1));
}

function walkNodes(node, visit) {
  if (Array.isArray(node)) {
    for (const item of node) walkNodes(item, visit);
    return;
  }
  if (node && typeof node === 'object') {
    visit(node);
    for (const value of Object.values(node)) walkNodes(value, visit);
  }
}

function headingLevels(html) {
  return [...html.matchAll(/<h([1-6])\b/g)].map((match) => Number(match[1]));
}

const htmlFiles = walk(dist).filter((file) => file.endsWith('.html'));
const descriptions = new Map();
const titles = new Map();
const canonicals = new Map();
const indexable = [];
const auditedForLength = new Set([
  `${base}/use-cases/turn-notes-into-flashcards/`,
  `${base}/use-cases/write-product-descriptions/`,
  `${base}/use-cases/keep-a-citation-library/`,
  `${base}/use-cases/build-a-resume/`,
  `${base}/use-cases/add-captions-to-a-video/`,
  `${base}/use-cases/check-if-writing-is-ai/`,
  `${base}/use-cases/clean-up-a-noisy-recording/`,
  `${base}/use-cases/upscale-a-low-resolution-image/`,
  `${base}/use-cases/ai-thumbnails-and-images/`,
  `${base}/use-cases/write-posts-and-emails/`,
  `${base}/use-cases/design-logos-and-graphics/`,
  `${base}/use-cases/translate-a-document/`,
  `${base}/use-cases/check-if-an-image-is-ai/`,
  `${base}/use-cases/proofread-and-edit/`,
  `${base}/compare/ideogram-vs-midjourney/`,
  `${base}/compare/grammarly-vs-languagetool/`,
  `${base}/best/ai-thumbnail-makers/`,
  `${base}/tested/`,
]);

for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8');
  const path = publicPath(file);
  const description = attr(html, /<meta name="description" content="([^"]*)"/);
  const ogTitle = attr(html, /<meta property="og:title" content="([^"]*)"/);
  const canonical = attr(html, /<link rel="canonical" href="([^"]*)"/);
  const robots = attr(html, /<meta name="robots" content="([^"]*)"/);
  const title = attr(html, /<title>([^<]*)<\/title>/);
  const noindex = robots.includes('noindex');

  if (!description) fail(`${path} is missing a meta description`);
  else if (description.length > 155) fail(`${path} description is ${description.length} characters`);
  else if (descriptions.has(description)) fail(`${path} repeats the description of ${descriptions.get(description)}`);
  else descriptions.set(description, path);

  if (!ogTitle) fail(`${path} is missing og:title`);
  else if (titles.has(ogTitle)) fail(`${path} repeats the og:title of ${titles.get(ogTitle)}`);
  else titles.set(ogTitle, path);

  if (!canonical) fail(`${path} is missing a canonical`);
  else if (!noindex) {
    if (canonicals.has(canonical)) fail(`${path} repeats the canonical of ${canonicals.get(canonical)}`);
    else canonicals.set(canonical, path);
  }

  if (!title) fail(`${path} is missing a title`);
  if (auditedForLength.has(path)) {
    if (title.length > 60) fail(`${path} title is ${title.length} characters`);
    if (description && (description.length < 120 || description.length > 160)) {
      fail(`${path} description is ${description.length} characters`);
    }
  }
  if (!noindex) indexable.push({ path, canonical });

  if (!robots.includes('max-image-preview:large')) fail(`${path} is missing max-image-preview:large`);
  if (title && ogTitle && title !== ogTitle) fail(`${path} title and og:title differ`);

  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  for (const block of blocks) {
    let data;
    try {
      data = JSON.parse(block[1]);
    } catch (error) {
      fail(`${path} has JSON-LD that does not parse: ${error.message}`);
      continue;
    }
    const raw = JSON.stringify(data);
    if (raw.includes('aggregateRating') || raw.includes('reviewCount') || raw.includes('"review"')) {
      fail(`${path} JSON-LD includes a rating or review`);
    }
    const shownDates = new Set();
    walkNodes(data, (node) => {
      for (const key of ['dateModified', 'datePublished']) {
        if (typeof node[key] === 'string') shownDates.add(node[key]);
      }
      if (node['@type'] === 'SoftwareApplication') {
        for (const key of ['name', 'url', 'applicationCategory']) {
          if (typeof node[key] !== 'string' || node[key].length === 0) fail(`${path} SoftwareApplication is missing ${key}`);
        }
        const offer = node.offers;
        if (offer?.price !== undefined) {
          const price = String(offer.price);
          if (!String(offer.description ?? '').includes(price)) {
            fail(`${path} offer price ${price} for ${node.name} is not in the sourced description`);
          }
          if (!offer.priceCurrency) fail(`${path} offer price for ${node.name} has no currency`);
        }
      }
    });
    for (const day of shownDates) {
      if (!html.includes(`datetime="${day}"`)) fail(`${path} does not show structured date ${day}`);
    }
  }

  const levels = headingLevels(html);
  for (let i = 1; i < levels.length; i += 1) {
    if (levels[i] > levels[i - 1] + 1) fail(`${path} skips from h${levels[i - 1]} to h${levels[i]}`);
  }
  if (!html.includes('rel="sitemap"')) fail(`${path} is missing the sitemap link`);
  if (html.includes('Every Tuesday') || html.includes('The Tuesday note')) {
    fail(`${path} still says the newsletter goes out on Tuesday`);
  }
  for (const image of html.matchAll(/<img\b([^>]*)>/g)) {
    if (!/\balt=/.test(image[1])) fail(`${path} has an image without alt text`);
  }

  const intent = path.match(/\/(compare|best|alternatives)\/([^/]+)\/$/);
  if (intent) {
    if (levels[0] !== 1 || levels.filter((level) => level === 1).length !== 1) fail(`${path} heading outline does not start with a single h1`);
    if (!html.includes('id="short-answer"')) fail(`${path} is missing the short answer`);
    if (!html.includes('Last checked')) fail(`${path} is missing Last checked`);
    if (!html.includes('id="faq"')) fail(`${path} is missing the FAQ`);
    if (!html.includes(`${base}/use-cases/`) || !html.includes(`${base}/compare/`) || !html.includes(`${base}/best/`)) {
      fail(`${path} does not link to use cases, comparisons and shortlists`);
    }
    if (!html.includes('id="newsletter"')) fail(`${path} is missing the signup form`);
    const og = attr(html, /<meta property="og:image" content="([^"]*)"/);
    if (!og.includes(`/og/${intent[1]}/${intent[2]}.png`)) fail(`${path} is missing its own Open Graph image`);
    else if (!existsSync(pathToFile(new URL(og).pathname))) fail(`${path} Open Graph image was not built`);
    const faqHtml = html.split('id="faq"')[1]?.split('</section>')[0] ?? '';
    const visibleQuestions = [...faqHtml.matchAll(/<h3>([^<]*)<\/h3>/g)].map((match) => decode(match[1]));
    if (visibleQuestions.length < 3) fail(`${path} FAQ has ${visibleQuestions.length} questions`);
    const graph = blocks.flatMap((block) => {
      try {
        const data = JSON.parse(block[1]);
        return data['@graph'] ?? [data];
      } catch {
        return [];
      }
    });
    const types = new Set(graph.map((node) => node['@type']));
    for (const type of ['WebPage', 'BreadcrumbList', 'ItemList', 'FAQPage']) {
      if (!types.has(type)) fail(`${path} JSON-LD is missing ${type}`);
    }
    const pageNode = graph.find((node) => node['@type'] === 'WebPage');
    if (!pageNode?.dateModified) fail(`${path} JSON-LD is missing dateModified`);
    else if (!html.includes(`datetime="${pageNode.dateModified}"`)) fail(`${path} dateModified ${pageNode.dateModified} is not visible`);
    const faqNode = graph.find((node) => node['@type'] === 'FAQPage');
    const schemaQuestions = (faqNode?.mainEntity ?? []).map((question) => question.name);
    if (schemaQuestions.join('|') !== visibleQuestions.join('|')) {
      fail(`${path} FAQ JSON-LD questions do not match the visible questions`);
    }
    const list = graph.find((node) => node['@type'] === 'ItemList');
    const apps = [];
    walkNodes(list, (node) => {
      if (node['@type'] === 'SoftwareApplication') apps.push(node);
    });
    if (apps.length < 2) fail(`${path} ItemList has ${apps.length} tools`);
  }

  if (/\/use-cases\/[^/]+\/$/.test(path)) {
    const og = attr(html, /<meta property="og:image" content="([^"]*)"/);
    const slug = path.split('/').filter(Boolean).at(-1);
    if (!og.includes(`/og/use-cases/${slug}.png`)) fail(`${path} is missing its own Open Graph image`);
    else if (!existsSync(pathToFile(new URL(og).pathname))) fail(`${path} Open Graph image was not built`);
    if (!html.includes('id="newsletter"')) fail(`${path} is missing the signup form`);
  }

  if (path.includes('/use-cases/') && path !== `${base}/use-cases/`) {
    if (levels[0] !== 1 || levels.filter((level) => level === 1).length !== 1) fail(`${path} heading outline does not start with a single h1`);
    for (let i = 1; i < levels.length; i += 1) {
      if (levels[i] > levels[i - 1] + 1) fail(`${path} skips from h${levels[i - 1]} to h${levels[i]}`);
    }
    if (!html.includes('id="short-answer"')) fail(`${path} is missing the short answer`);
    if (!html.includes('Last updated')) fail(`${path} is missing Last updated`);
    if (!html.includes('id="faq"')) fail(`${path} is missing the FAQ`);
    if (!html.includes(`${base}/compare/`) || !html.includes(`${base}/best/`)) fail(`${path} does not link to comparisons and shortlists`);
    const related = html.split('id="related-use-cases"')[1]?.split('</section>')[0] ?? '';
    const siblingLinks = [...related.matchAll(/href="([^"]*\/use-cases\/[^"]+)"/g)];
    if (siblingLinks.length < 2) fail(`${path} links to ${siblingLinks.length} sibling use cases`);

    const faqHtml = html.split('id="faq"')[1]?.split('</section>')[0] ?? '';
    const visibleQuestions = [...faqHtml.matchAll(/<h3>([^<]*)<\/h3>/g)].map((match) => decode(match[1]));
    if (visibleQuestions.length < 3) fail(`${path} FAQ has ${visibleQuestions.length} questions`);
    const graph = blocks.flatMap((block) => {
      try {
        const data = JSON.parse(block[1]);
        return data['@graph'] ?? [data];
      } catch {
        return [];
      }
    });
    const types = new Set(graph.map((node) => node['@type']));
    for (const type of ['WebPage', 'BreadcrumbList', 'ItemList', 'FAQPage']) {
      if (!types.has(type)) fail(`${path} JSON-LD is missing ${type}`);
    }
    const pageNode = graph.find((node) => node['@type'] === 'WebPage');
    if (!pageNode?.dateModified) fail(`${path} JSON-LD is missing dateModified`);
    else if (!html.includes(`datetime="${pageNode.dateModified}"`)) fail(`${path} dateModified ${pageNode.dateModified} is not visible`);
    const faqNode = graph.find((node) => node['@type'] === 'FAQPage');
    const schemaQuestions = (faqNode?.mainEntity ?? []).map((question) => question.name);
    if (schemaQuestions.join('|') !== visibleQuestions.join('|')) {
      fail(`${path} FAQ JSON-LD questions do not match the visible questions`);
    }
    const list = graph.find((node) => node['@type'] === 'ItemList');
    const apps = [];
    walkNodes(list, (node) => {
      if (node['@type'] === 'SoftwareApplication') apps.push(node);
    });
    if (apps.length < 2) fail(`${path} ItemList has ${apps.length} tools`);
  }

  if (/\/newsletter\/[^/]+\/$/.test(path)) {
    const raw = blocks.map((block) => block[1]).join('\n');
    if (!raw.includes('BlogPosting')) fail(`${path} JSON-LD is missing BlogPosting`);
    if (!html.includes('Read this issue on Beehiiv')) fail(`${path} is missing the Beehiiv link`);
    if (levels[0] !== 1 || levels.filter((level) => level === 1).length !== 1) {
      fail(`${path} heading outline does not start with a single h1`);
    }
    for (let i = 1; i < levels.length; i += 1) {
      if (levels[i] > levels[i - 1] + 1) fail(`${path} skips from h${levels[i - 1]} to h${levels[i]}`);
    }
    let article;
    try {
      const graph = blocks.flatMap((block) => {
        const data = JSON.parse(block[1]);
        return data['@graph'] ?? [data];
      });
      article = graph.find((node) => node['@type'] === 'BlogPosting');
    } catch {
      article = undefined;
    }
    if (!article?.datePublished) fail(`${path} BlogPosting is missing datePublished`);
    else if (!html.includes(`datetime="${article.datePublished}"`)) {
      fail(`${path} datePublished ${article.datePublished} is not visible`);
    }
    if (!html.includes('id="newsletter"')) fail(`${path} is missing the signup form`);
    if (html.includes('{{') || html.includes('first_name')) fail(`${path} still has a Beehiiv merge tag`);
    if (title.length > 60) fail(`${path} title is ${title.length} characters`);
    if (description.length < 140 || description.length > 155) {
      fail(`${path} description is ${description.length} characters`);
    }
  }

  if (path === `${base}/search/` && (description.length < 140 || description.length > 155)) {
    fail(`${path} description is ${description.length} characters`);
  }

  const collectionHubs = new Set([
    `${base}/use-cases/`,
    `${base}/best/`,
    `${base}/compare/`,
    `${base}/alternatives/`,
    `${base}/tested/`,
    `${base}/new/`,
  ]);
  if (collectionHubs.has(path)) {
    const graph = blocks.flatMap((block) => {
      try {
        const data = JSON.parse(block[1]);
        return data['@graph'] ?? [data];
      } catch {
        return [];
      }
    });
    const types = new Set(graph.map((node) => node['@type']));
    for (const type of ['WebPage', 'CollectionPage', 'BreadcrumbList', 'ItemList']) {
      if (!types.has(type)) fail(`${path} JSON-LD is missing ${type}`);
    }
    const list = graph.find((node) => node['@type'] === 'ItemList');
    const elements = list?.itemListElement ?? [];
    if (!Array.isArray(elements) || elements.length < 2) fail(`${path} ItemList has ${elements.length} pages`);
    else if (list.numberOfItems !== elements.length) fail(`${path} ItemList count does not match its pages`);
    for (const element of elements) {
      if (typeof element.name !== 'string' || element.name.length === 0) fail(`${path} ItemList entry is missing a name`);
      if (typeof element.url !== 'string') {
        fail(`${path} ItemList entry is missing a url`);
        continue;
      }
      let url;
      try {
        url = new URL(element.url);
      } catch {
        fail(`${path} ItemList url does not parse: ${element.url}`);
        continue;
      }
      if (url.origin !== origin) fail(`${path} ItemList url is off-site: ${element.url}`);
      const target = pathToFile(url.pathname);
      if (!target || !existsSync(target)) fail(`${path} ItemList points at missing ${url.pathname}`);
    }
  }

  const signupPages = new Set([
    `${base}/use-cases/`,
    `${base}/best/`,
    `${base}/compare/`,
    `${base}/alternatives/`,
    `${base}/about/`,
    `${base}/submit/`,
    `${base}/pricing/`,
  ]);
  if (signupPages.has(path) && !html.includes('id="newsletter"')) fail(`${path} is missing the signup form`);

  if (path === `${base}/newsletter/`) {
    if (!html.includes('id="newsletter"')) fail(`${path} is missing the signup form`);
    for (const issue of ['issue-1', 'issue-2', 'issue-3', 'issue-4', 'issue-5', 'issue-6']) {
      if (!html.includes(`${base}/newsletter/${issue}/`)) fail(`${path} does not link to ${issue}`);
    }
    const issue6At = html.indexOf(`${base}/newsletter/issue-6/`);
    const issue5At = html.indexOf(`${base}/newsletter/issue-5/`);
    const issue4At = html.indexOf(`${base}/newsletter/issue-4/`);
    const issue3At = html.indexOf(`${base}/newsletter/issue-3/`);
    const issue2At = html.indexOf(`${base}/newsletter/issue-2/`);
    const issue1At = html.indexOf(`${base}/newsletter/issue-1/`);
    if (!(issue6At < issue5At && issue5At < issue4At && issue4At < issue3At && issue3At < issue2At && issue2At < issue1At)) {
      fail(`${path} does not list issue 6 first`);
    }
  }

  if (path === `${base}/` || path === `${base}`) {
    const raw = blocks.map((block) => block[1]).join('\n');
    if (!raw.includes('"@type":"WebSite"') && !raw.includes('"@type": "WebSite"')) fail('Home JSON-LD is missing WebSite');
    if (!raw.includes('Organization')) fail('Home JSON-LD is missing Organization');
  }

  const hrefs = [...html.matchAll(/\s(?:href|src)="([^"]+)"/g)].map((match) => decode(match[1]));
  for (const href of hrefs) {
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) continue;
    let url;
    try {
      url = new URL(href, `${origin}${path}`);
    } catch {
      fail(`${path} has an unparseable link ${href}`);
      continue;
    }
    if (url.origin !== origin) continue;
    const target = pathToFile(url.pathname);
    if (!target) {
      fail(`${path} links outside the site base: ${href}`);
      continue;
    }
    if (!existsSync(target)) fail(`${path} links to missing ${url.pathname}`);
  }
}

const llms = join(dist, 'llms.txt');
const full = join(dist, 'llms-full.txt');
if (!existsSync(llms)) fail('dist/llms.txt was not generated');
if (!existsSync(full)) fail('dist/llms-full.txt was not generated');
if (existsSync(llms) && existsSync(full)) {
  const index = readFileSync(llms, 'utf8');
  const expanded = readFileSync(full, 'utf8');
  const useCasePages = htmlFiles
    .map(publicPath)
    .filter((path) => /\/use-cases\/[^/]+\/$/.test(path));
  for (const path of useCasePages) {
    if (!index.includes(path)) fail(`llms.txt is missing ${path}`);
    if (!expanded.includes(path)) fail(`llms-full.txt is missing ${path}`);
    const listed = index.slice(index.indexOf(path), index.indexOf(path) + 500);
    if (!listed.includes(': Answer: Top pick')) fail(`llms.txt answer for ${path} does not lead with the picks`);
  }
  const guidePages = htmlFiles
    .map(publicPath)
    .filter((path) => /\/(?:compare|best|alternatives)\/[^/]+\/$/.test(path));
  for (const path of guidePages) {
    if (!index.includes(path)) fail(`llms.txt is missing ${path}`);
    if (!expanded.includes(path)) fail(`llms-full.txt is missing ${path}`);
    const listed = index.slice(index.indexOf(path), index.indexOf(path) + 500);
    if (!listed.includes(': Answer:')) fail(`llms.txt answer for ${path} is not answer-first`);
  }
  const handsOnHeading = index.indexOf('## Hands-on notes');
  const compareHeading = index.indexOf('## Comparisons');
  const useCaseHeading = index.indexOf('## Use cases');
  if (!(handsOnHeading >= 0 && handsOnHeading < compareHeading && compareHeading < useCaseHeading)) {
    fail('llms.txt does not lead with hands-on notes and comparisons');
  }
  if (!index.includes('Tested 17 Nov 2026: Zotero 10.0.8 resolved 3/3 identifiers')) {
    fail('llms.txt is missing the Zotero quotable line');
  }
  if (!index.includes('Tested 18 Nov 2026: n8n self-hosted 2.48.5 routed 6 of 6 orders correctly')) {
    fail('llms.txt is missing the n8n quotable line');
  }
  if (!index.includes('Tested 19 Nov 2026: Grammarly Free, signed out, showed only the first fix')) {
    fail('llms.txt is missing the Grammarly Free quotable line');
  }
  if (!index.includes('Tested 24 Nov 2026: GPTZero Free, signed out, scored a 2018 Wikipedia passage 100% human')) {
    fail('llms.txt is missing the GPTZero Free quotable line');
  }
  if (!index.includes(`${origin}${base}/sitemap-index.xml`)) fail('llms.txt does not advertise the sitemap');
  if (!expanded.includes(`${origin}${base}/sitemap-index.xml`)) fail('llms-full.txt does not advertise the sitemap');
  for (const needle of ['/compare/', '/best/', '/alternatives/', '/pricing/', '/about/', '/newsletter/']) {
    if (!index.includes(`${base}${needle}`)) fail(`llms.txt is missing ${needle}`);
  }
  for (const issuePath of [`${base}/newsletter/issue-1/`, `${base}/newsletter/issue-2/`, `${base}/newsletter/issue-3/`, `${base}/newsletter/issue-4/`, `${base}/newsletter/issue-5/`, `${base}/newsletter/issue-6/`]) {
    if (!index.includes(issuePath)) fail(`llms.txt is missing ${issuePath}`);
    if (!expanded.includes(issuePath)) fail(`llms-full.txt is missing ${issuePath}`);
  }
  if (!expanded.includes('Source:') || !expanded.includes('Checked:')) fail('llms-full.txt is missing sourced prices');
  if (!/Pending hands-on test/.test(expanded)) fail('llms-full.txt dropped the pending-test label');
  if (!expanded.includes('Hands-on note, 4 Nov 2026') || !expanded.includes('LanguageTool Basic only')) {
    fail('llms-full.txt is missing the LanguageTool Basic hands-on note');
  }
  if (!expanded.includes('Grammarly Pro and Grammarly Free were not part of this check')) {
    fail('llms-full.txt drops the untested Grammarly picks from the LanguageTool note');
  }
}

const keyFiles = readdirSync(dist).filter((name) => /^[a-f0-9]{32}\.txt$/.test(name));
if (keyFiles.length !== 1) fail(`expected one IndexNow key file in dist, found ${keyFiles.length}`);
else {
  const key = keyFiles[0].replace(/\.txt$/, '');
  const keyBody = readFileSync(join(dist, keyFiles[0]), 'utf8');
  if (keyBody !== key) fail('IndexNow key file does not contain the key');
}
const robots = readFileSync(join(dist, 'robots.txt'), 'utf8');
if (!robots.includes(`${origin}${base}/llms.txt`)) fail('robots.txt does not mention llms.txt');
if (!robots.includes(`${origin}${base}/llms-full.txt`)) fail('robots.txt does not mention llms-full.txt');
const home = readFileSync(join(dist, 'index.html'), 'utf8');
if (!home.includes(`${base}/llms.txt`)) fail('The footer does not link to llms.txt');
if (!home.includes(`${base}/newsletter/`)) fail('The site does not link to the newsletter archive');

const sitemap = walk(dist)
  .filter((file) => file.endsWith('.xml') && file.includes('sitemap'))
  .map((file) => readFileSync(file, 'utf8'))
  .join('\n');
for (const page of [`${base}/newsletter/`, `${base}/newsletter/issue-1/`, `${base}/newsletter/issue-2/`, `${base}/newsletter/issue-3/`, `${base}/newsletter/issue-4/`, `${base}/newsletter/issue-5/`, `${base}/newsletter/issue-6/`]) {
  if (!existsSync(pathToFile(page))) fail(`built page is missing ${page}`);
  if (!sitemap.includes(`${origin}${page}`)) fail(`sitemap is missing ${page}`);
}
const issue4Path = pathToFile(`${base}/newsletter/issue-4/`);
const issue4 = issue4Path && existsSync(issue4Path) ? readFileSync(issue4Path, 'utf8') : '';
if (!issue4) fail('built page is missing issue 4');
else for (const phrase of [
  'what we actually tested this week',
  'datetime="2026-11-05"',
  'tried-tooled-4-what-we-actually-tested-this-week',
  '8 planted errors',
  'Me and the team has',
  '1 arguable false positive',
  'Characters 246/2000',
  'No Premium locks',
  'The page stays pending',
  '2,000 characters',
  `${base}/tested/`,
  `${base}/find-your-tool/`,
  `${base}/use-cases/translate-a-document/`,
  `${base}/use-cases/proofread-and-edit/`,
  `${base}/use-cases/analyse-a-spreadsheet/`,
  `${base}/use-cases/answer-customer-questions/`,
  `${base}/best/ai-translation-tools/`,
  `${base}/alternatives/grammarly/`,
  `${base}/best/ai-tools-for-small-business/`,
  `${base}/alternatives/opusclip/`,
  `${base}/best/ai-tools-to-turn-videos-into-shorts/`,
  `${base}/newsletter/`,
  `${base}/submit/`,
  `${base}/new/`,
  'No pay-to-rank and no sponsors in this issue',
  'None in this issue are',
]) {
  if (!issue4.includes(phrase)) fail(`issue 4 is missing ${phrase}`);
}
if (issue4.includes('rel="sponsored"') || issue4.includes('{{') || issue4.includes('first_name')) {
  fail('issue 4 has a sponsored link or a Beehiiv merge tag');
}
const issue5Path = pathToFile(`${base}/newsletter/issue-5/`);
const issue5 = issue5Path && existsSync(issue5Path) ? readFileSync(issue5Path, 'utf8') : '';
if (!issue5) fail('built page is missing issue 5');
else {
  const issue5Title = attr(issue5, /<title>([^<]*)<\/title>/);
  if (issue5Title !== 'Tried & Tooled #5: hands-on notes and a spreadsheet stack') {
    fail(`issue 5 title is ${JSON.stringify(issue5Title)}`);
  }
  for (const phrase of [
    'eleven hands-on notes and a spreadsheet stack',
    'datetime="2026-11-12"',
    'href="https://archies-newsletter-77bb75.beehiiv.com/"',
    'from four notes to eleven',
    'nobody pays to rank',
    'OpusClip 4.0 edits the raw talking video',
    'ChatGPT Images 2.6',
    'Gemini Omni 1.2 Flash',
    'Personal Finance in Claude',
    'GPT-6-Cyber',
    'No top or budget pick was replaced',
    '$14.50/mo',
    `${base}/use-cases/design-an-app-screen/`,
    `${base}/use-cases/cut-out-a-product-photo/`,
    `${base}/use-cases/see-where-the-money-went/`,
    `${base}/use-cases/check-if-an-image-is-ai/`,
    `${base}/alternatives/elevenlabs/`,
    `${base}/best/ai-voiceover-for-youtube/`,
    `${base}/compare/elevenlabs-vs-descript/`,
    `${base}/best/ai-product-background-removers/`,
    'Looka (5 Nov)',
    'likely real',
    'Datastripes (7 Nov)',
    'nixm (8 Nov)',
    'Dessn (9 Nov)',
    '£10.10',
    'Spacefast (10 Nov)',
    'about 33 hours',
    'Quillo (11 Nov)',
    `${base}/tested/`,
    'class="callout"',
    'Write the question first',
    'Google Sheets on Google AI Pro',
    'Google AI Plus',
    'Avg unit price 3.55',
    'about 3.13',
    'pending hands-on test',
    'See the spreadsheet stack',
    `${base}/use-cases/analyse-a-spreadsheet/`,
    'When an AI dashboard says',
    'Just hit reply',
    `${base}/submit/`,
    `${base}/newsletter/`,
    'No pay-to-rank and no sponsors in this issue',
    'None of the links in this issue are affiliate links',
    'Seven daily checks, three new use-case pages, and the AI average',
  ]) {
    if (!issue5.includes(phrase)) fail(`issue 5 is missing ${phrase}`);
  }
  if (issue5.includes('beehiiv.com/p/')) fail('issue 5 links to a guessed Beehiiv post URL');
  if (issue5.includes('rel="sponsored"') || issue5.includes('{{') || issue5.includes('first_name')) {
    fail('issue 5 has a sponsored link or a Beehiiv merge tag');
  }
}
const issue6Path = pathToFile(`${base}/newsletter/issue-6/`);
const issue6 = issue6Path && existsSync(issue6Path) ? readFileSync(issue6Path, 'utf8') : '';
if (!issue6) fail('built page is missing issue 6');
else {
  const issue6Title = attr(issue6, /<title>([^<]*)<\/title>/);
  if (issue6Title !== 'Tried & Tooled #6: sixteen hands-on notes and an admin stack') {
    fail(`issue 6 title is ${JSON.stringify(issue6Title)}`);
  }
  if (issue6Title.length > 60) fail(`issue 6 title is ${issue6Title.length} characters`);
  for (const phrase of [
    'sixteen hands-on notes and an admin stack',
    'datetime="2026-11-19"',
    'href="https://archies-newsletter-77bb75.beehiiv.com/"',
    'now has sixteen notes',
    'nobody pays to rank',
    'Gemini 4 Hydrogen',
    '$1.50 per million input tokens',
    'ElevenLabs Scribe v3',
    'Nod by n8n Labs',
    'Claude Meetings',
    'Claude Fable 5.2',
    '$8 / $40 per million tokens',
    '11 December',
    'No top or budget pick was replaced',
    '$0.00 Pro trial',
    '$30 for one month or $144 for a year',
    `${base}/use-cases/turn-notes-into-flashcards/`,
    `${base}/use-cases/write-product-descriptions/`,
    `${base}/use-cases/keep-a-citation-library/`,
    `${base}/use-cases/build-a-resume/`,
    '300 MB of file storage free',
    '2 GB at $20/year',
    'Kickresume yearly at $8/mo',
    `${base}/compare/ideogram-vs-midjourney/`,
    `${base}/best/ai-thumbnail-makers/`,
    `${base}/compare/grammarly-vs-languagetool/`,
    'Ideogram Plus $20/mo',
    'Pixelcut and Photoroom (14 Nov)',
    '904×1080',
    '1200×1433',
    'ChatGPT signed out (15 Nov)',
    '116-word',
    'sourdough loaves',
    'Anki desktop (16 Nov)',
    '10 cards imported',
    'Zotero 10 desktop (17 Nov)',
    'The MIT press',
    'n8n self-hosted (18 Nov)',
    '9-step bakery order workflow',
    `${base}/tested/`,
    'class="callout"',
    'Map it on paper first',
    'from $19.99/mo',
    '€20/mo billed annually',
    'two-step Zaps only',
    'Community Edition 2.48.5',
    'about 75 seconds',
    '2.9 GB',
    '0.80 seconds',
    '6 of 6 orders routed correctly',
    '4 of 4 confirmation emails',
    'pending hands-on test',
    'See the admin automation stack',
    `${base}/use-cases/automate-small-business-admin/`,
    'fake data that hits every branch',
    'collection only',
    'Just hit reply',
    `${base}/submit/`,
    `${base}/newsletter/`,
    'No pay-to-rank and no sponsors in this issue',
    'None of the links in this issue are affiliate links',
    'Five daily checks, four new use-case pages, and an n8n workflow',
    'two comparisons and a new shortlist',
  ]) {
    if (!issue6.includes(phrase)) fail(`issue 6 is missing ${phrase}`);
  }
  if (issue6.includes('beehiiv.com/p/')) fail('issue 6 links to a guessed Beehiiv post URL');
  if (issue6.includes('rel="sponsored"') || issue6.includes('{{') || issue6.includes('first_name')) {
    fail('issue 6 has a sponsored link or a Beehiiv merge tag');
  }
}
const sitemapUrls = [...sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((match) => match[1]);
if (sitemapUrls.length < 32) fail(`sitemap lists ${sitemapUrls.length} URLs`);
for (const block of sitemapUrls) {
  const loc = block.match(/<loc>([^<]+)<\/loc>/)?.[1] ?? '';
  const lastmod = block.match(/<lastmod>([^<]+)<\/lastmod>/)?.[1] ?? '';
  if (!lastmod) fail(`sitemap URL has no lastmod: ${loc}`);
  else if (!/^\d{4}-\d{2}-\d{2}/.test(lastmod)) fail(`sitemap lastmod for ${loc} is not a date: ${lastmod}`);
}
const sitemapLocs = new Set(sitemapUrls.map((block) => block.match(/<loc>([^<]+)<\/loc>/)?.[1] ?? ''));
for (const page of indexable) {
  const absolute = `${origin}${page.path}`;
  if (!sitemapLocs.has(absolute)) fail(`${page.path} is absent from the sitemap`);
  if (page.canonical !== absolute) fail(`${page.path} canonical is ${page.canonical || '(missing)'}`);
}
const research = readFileSync(pathToFile(`${base}/use-cases/research-and-summarise-sources/`), 'utf8');
for (const phrase of [
  '26 Oct 2026',
  '10 Pro searches a month',
  'Consensus Meter',
  '25 seconds',
  '60 seconds',
  'free Consensus account',
  'Pending hands-on test',
  'Standard task still pending',
  'Hands-on test (21 Nov 2026)',
  'Fack\'d',
  'email code',
  'no password',
  'in real time',
  'from the captions',
  '0:38',
  '3 claims',
  'TalkTV',
  '6:04',
  '2 of 2',
  'Jeremy Kyle',
  'Stop checking',
  '6 of 10',
  '10 free checks',
  'Go Premium',
  'Chrome extension',
  'live streams',
  'DOM-ready in 0.5 seconds',
  '0.35 seconds',
  'weakly, or partly',
  'Kuenssberg',
  'Daily Show',
  '$12/mo',
  '$49/mo',
  'https://fackd.com/pricing',
  'On 21 Nov 2026 Elicit Basic could not be tested',
  'requires a password',
  'GitHub, Google and single sign-on',
  'no email code or magic link',
  'Nothing was submitted',
  'Elicit Basic stays pending',
  'The page stays pending',
  'Consensus Pro and Elicit Basic were not part of it',
  'has not been run',
  `${base}/tested/`,
  'datetime="2026-11-09"',
  'https://elicit.com/users/auth?show=signup',
]) {
  if (!research.includes(phrase)) fail(`research page is missing: ${phrase}`);
}
if (!research.includes('Standard task still pending') || !research.includes('standard task')) {
  fail('research page does not keep the standard task pending');
}
const researchTop = research.split('class="card pick"')[1]?.split('class="card pick budget"')[0] ?? '';
const researchBudget = research.split('class="card pick budget"')[1]?.split('class="card pick avoid"')[0] ?? '';
if (!researchTop.includes('Consensus Pro') || researchTop.includes('Hands-on test')) {
  fail('Consensus Pro was marked as hands-on tested');
}
if (!researchBudget.includes('Elicit Basic') || researchBudget.includes('Hands-on test')) {
  fail('Elicit Basic was marked as hands-on tested');
}
if (research.includes('Hands-on test 21 Nov')) fail('A research pick was marked as hands-on tested on 21 Nov');
const researchConsidered = research.split('<h2>Also considered</h2>')[1]?.split('<h2>Test notes</h2>')[0] ?? '';
if (!researchConsidered.includes('Fack&#39;d') || !researchConsidered.includes('https://fackd.com')) {
  fail('Fack\'d is missing from Also considered');
}
if (researchConsidered.includes('Pending hands-on test')) fail('Fack\'d is labelled as a pending pick');
const translate = readFileSync(pathToFile(`${base}/use-cases/translate-a-document/`), 'utf8');
for (const phrase of [
  'Hands-on test (3 Nov 2026)',
  '319-character',
  'File translation was not tested',
  'vous',
  'Formality',
  'Style profiles',
  'Style rules',
  '1 entire PDF',
  'not timed',
]) {
  if (!translate.includes(phrase)) fail(`translate page is missing the hands-on note phrase: ${phrase}`);
}
if (!translate.includes('datetime="2026-11-23"')) fail('translate page does not show 23 Nov 2026 as dateModified');
const topCard = translate.split('class="card pick"')[1]?.split('class="card pick budget"')[0] ?? '';
const budgetCard = translate.split('class="card pick budget"')[1]?.split('class="card pick avoid"')[0] ?? '';
if (!topCard.includes('DeepL Pro Individual') || !topCard.includes('Pending hands-on test')) {
  fail('DeepL Pro Individual lost its pending hands-on label');
}
if (topCard.includes('Hands-on test 3 Nov')) fail('DeepL Pro Individual was marked as hands-on tested');
if (!budgetCard.includes('DeepL Free') || !budgetCard.includes('Hands-on test 3 Nov 2026')) {
  fail('DeepL Free card is missing its hands-on label');
}
if (budgetCard.includes('Pending hands-on test')) fail('DeepL Free card still has a pending hands-on label');
if (!budgetCard.includes('File translation was not tested')) fail('DeepL Free card does not say file translation was not tested');

const proofread = readFileSync(pathToFile(`${base}/use-cases/proofread-and-edit/`), 'utf8');
for (const phrase of [
  'Hands-on test (4 Nov 2026)',
  'no account',
  '8 planted errors',
  'friday',
  'Me and the team has',
  'The team and I have',
  'One arguable false positive',
  'exact time was not measured',
  'Characters 246/2000',
  'Paraphrasing 0/3',
  'No Premium locks',
  'Picky Mode was not opened',
  'Hands-on test (19 Nov 2026)',
  'about 11:22 GMT',
  '247 characters',
  '9 underlines',
  'about 5 seconds',
  'Fix spelling',
  'Get Grammarly for free to get more',
  '618 words',
  '3,355 characters',
  '709 characters',
  'about 133 words',
  'about 21%',
  'Only 4 suggestions',
  'no warning',
  'paraphrasing tool',
  'no free rewrite',
]) {
  if (!proofread.includes(phrase)) fail(`proofread page is missing the hands-on note phrase: ${phrase}`);
}
if (!proofread.includes('datetime="2026-11-23"')) fail('proofread page does not show 23 Nov 2026 as dateModified');
if (!proofread.includes('Standard task still pending') || !proofread.includes('standard task')) {
  fail('proofread page does not keep the standard task pending');
}
if (!proofread.includes(`${base}/tested/`)) fail('proofread page does not link to the tested page');
const proofTop = proofread.split('class="card pick"')[1]?.split('class="card pick budget"')[0] ?? '';
const proofBudget = proofread.split('class="card pick budget"')[1]?.split('class="card pick avoid"')[0] ?? '';
const proofAvoid = proofread.split('class="card pick avoid"')[1]?.split('</section>')[0] ?? '';
if (!proofTop.includes('Grammarly Pro') || !proofTop.includes('Pending hands-on test')) {
  fail('Grammarly Pro lost its pending hands-on label');
}
if (proofTop.includes('Hands-on test 4 Nov')) fail('Grammarly Pro was marked as hands-on tested');
if (!proofBudget.includes('LanguageTool Basic') || !proofBudget.includes('Hands-on test 4 Nov 2026')) {
  fail('LanguageTool Basic card is missing its hands-on label');
}
if (proofBudget.includes('Pending hands-on test')) fail('LanguageTool Basic card still has a pending hands-on label');
if (!proofBudget.includes('No Premium locks in this check')) fail('LanguageTool Basic card omits the Premium-lock result');
if (!proofAvoid.includes('Grammarly Free') || !proofAvoid.includes('Hands-on test 19 Nov 2026')) {
  fail('Grammarly Free card is missing its hands-on label');
}
if (!proofAvoid.includes('Tested 19 Nov 2026: Grammarly Free, signed out, showed only the first fix')) {
  fail('Grammarly Free card is missing the quotable line');
}
if (!proofAvoid.includes('709 characters') || !proofAvoid.includes('were not tested')) {
  fail('Grammarly Free card does not keep the character cap or the untested list');
}
if (proofAvoid.includes('Hands-on test 4 Nov')) fail('Grammarly Free was marked with the LanguageTool date');
if (proofAvoid.includes('Pending hands-on test')) fail('Grammarly Free card has a pending hands-on label');
if (proofTop.includes('Hands-on test 19 Nov')) fail('Grammarly Pro was marked as hands-on tested on 19 Nov');
if (proofBudget.includes('Hands-on test 19 Nov')) fail('LanguageTool Basic was marked as hands-on tested on 19 Nov');
if (proofread.includes('>Tested 19 Nov 2026<')) fail('proofread page was marked as a completed test');

const writingCheck = readFileSync(pathToFile(`${base}/use-cases/check-if-writing-is-ai/`), 'utf8');
for (const phrase of [
  'Hands-on test (24 Nov 2026)',
  'Sally Lunn bun',
  'Model 5.0b',
  'We are highly confident this text is entirely human',
  'highly confident this text was AI generated',
  'a mix of AI and human',
  '3 of 8 sentences',
  'about 2.8 seconds',
  'about 8.8 seconds',
  'about 1.0 seconds',
  'image captcha',
  '10,000 characters',
  '250-character minimum',
  '10,000 credits left this month',
  'Sign up to Continue',
  '1/1 free scans left',
  '£9.09',
  'was £12.99',
  'Grammarly Pro and Grammarly Free were not part of it',
  'false positives on more human writing were not tested',
  'paraphrased AI text',
  'Prices were read on 23 Nov 2026',
]) {
  if (!writingCheck.includes(phrase)) fail(`AI-writing check page is missing the hands-on note phrase: ${phrase}`);
}
if (!writingCheck.includes('datetime="2026-11-23"')) fail('AI-writing check page does not show 23 Nov 2026 as dateModified');
if (!writingCheck.includes('Standard task still pending') || !writingCheck.includes('standard task')) {
  fail('AI-writing check page does not keep the standard task pending');
}
if (!writingCheck.includes(`${base}/tested/`)) fail('AI-writing check page does not link to the tested page');
const writingCheckTop = writingCheck.split('class="card pick"')[1]?.split('class="card pick budget"')[0] ?? '';
const writingCheckBudget = writingCheck.split('class="card pick budget"')[1]?.split('class="card pick avoid"')[0] ?? '';
const writingCheckAvoid = writingCheck.split('class="card pick avoid"')[1]?.split('</section>')[0] ?? '';
if (!writingCheckTop.includes('Grammarly Pro') || !writingCheckTop.includes('Pending hands-on test')) {
  fail('Grammarly Pro lost its pending hands-on label on the AI-writing check page');
}
if (writingCheckTop.includes('Hands-on test 24 Nov')) fail('Grammarly Pro was marked as hands-on tested');
if (!writingCheckBudget.includes('GPTZero Free') || !writingCheckBudget.includes('Hands-on test 24 Nov 2026')) {
  fail('GPTZero Free card is missing its hands-on label');
}
if (writingCheckBudget.includes('Pending hands-on test')) fail('GPTZero Free card still has a pending hands-on label');
if (!writingCheckBudget.includes('Tested 24 Nov 2026: GPTZero Free, signed out, scored a 2018 Wikipedia passage 100% human')) {
  fail('GPTZero Free card is missing the quotable line');
}
if (!writingCheckAvoid.includes('Grammarly Free')) fail('AI-writing avoid card lost Grammarly Free');
if (writingCheckAvoid.includes('Hands-on test')) fail('Grammarly Free on the AI-writing check page was marked as hands-on tested');
if (writingCheck.includes('>Tested 24 Nov 2026<')) fail('AI-writing check page was marked as a completed test');

const logos = readFileSync(pathToFile(`${base}/use-cases/design-logos-and-graphics/`), 'utf8');
for (const phrase of [
  'Hands-on test (5 Nov 2026)',
  'Hollow Oak Bakery',
  '15 to 20 seconds',
  '6 of the first 6',
  'no garbled',
  '9 swatches',
  'Symbols 0',
  'Every download is paid',
  '$20',
  '$65',
  '$96',
  '$129',
  'US dollars',
  'no pound price',
  'no file was downloaded',
  '1080×1080',
  'Canva Pro was not part of it',
  'paid Brand Kit was not bought',
]) {
  if (!logos.includes(phrase)) fail(`logo page is missing the hands-on note phrase: ${phrase}`);
}
if (!logos.includes('datetime="2026-11-05"')) fail('logo page does not show 5 Nov 2026 as dateModified');
if (!logos.includes('Standard task still pending') || !logos.includes('has not been run')) {
  fail('logo page does not keep the standard task pending');
}
if (!logos.includes(`${base}/tested/`)) fail('logo page does not link to the tested page');
const logoTop = logos.split('class="card pick"')[1]?.split('class="card pick budget"')[0] ?? '';
const logoBudget = logos.split('class="card pick budget"')[1]?.split('class="card pick avoid"')[0] ?? '';
const logoAvoid = logos.split('class="card pick avoid"')[1]?.split('</section>')[0] ?? '';
if (!logoTop.includes('Canva Pro') || !logoTop.includes('Pending hands-on test')) {
  fail('Canva Pro lost its pending hands-on label');
}
if (logoTop.includes('Hands-on test 5 Nov')) fail('Canva Pro was marked as hands-on tested');
if (!logoBudget.includes('Looka Brand Kit') || !logoBudget.includes('Hands-on test 5 Nov 2026')) {
  fail('Looka Brand Kit card is missing its hands-on label');
}
if (logoBudget.includes('Pending hands-on test')) fail('Looka Brand Kit card still has a pending hands-on label');
if (!logoBudget.includes('no file was downloaded')) fail('Looka Brand Kit card does not say no file was downloaded');
if (!logoBudget.includes('1080×1080 social graphic was not made')) {
  fail('Looka Brand Kit card does not keep the social graphic untested');
}
if (logoAvoid.includes('Hands-on test 5 Nov')) fail('Canva Business was marked as hands-on tested');

const images = decode(readFileSync(pathToFile(`${base}/use-cases/check-if-an-image-is-ai/`), 'utf8'));
for (const phrase of [
  'Hands-on test (6 Nov 2026)',
  'Likely real',
  '96%',
  '97%',
  'AI-generated',
  'SynthID watermark and OpenAI\'s signature',
  'None found',
  'No AI tags',
  'No AI found',
  'Not needed',
  'no sign-up',
  'No paywall',
  '8 to 12 seconds',
  'about 2 seconds',
  'Heatmap',
  'over 99%',
  'vendor',
  'not a signature-free',
  'Pixel analysis is unavailable right now',
  'Gemini example tile was not run',
  'has not been run',
]) {
  if (!images.includes(phrase)) fail(`image-check page is missing the hands-on note phrase: ${phrase}`);
}
if (!images.includes('datetime="2026-11-06"')) fail('image-check page does not show 6 Nov 2026 as dateModified');
if (!images.includes('Standard task still pending') || !images.includes('standard task')) {
  fail('image-check page does not keep the standard task pending');
}
if (!images.includes(`${base}/tested/`)) fail('image-check page does not link to the tested page');
const imageTop = images.split('class="card pick"')[1]?.split('class="card pick budget"')[0] ?? '';
const imageBudget = images.split('class="card pick budget"')[1]?.split('class="card pick avoid"')[0] ?? '';
const imageAvoid = images.split('class="card pick avoid"')[1]?.split('</section>')[0] ?? '';
if (!imageTop.includes('Phrasly AI Image Detector') || !imageTop.includes('Hands-on test 6 Nov 2026')) {
  fail('Phrasly top card is missing its hands-on label');
}
if (imageTop.includes('Pending hands-on test')) fail('Phrasly top card still has a pending hands-on label');
if (!imageTop.includes('over 99%') || !imageTop.includes("vendor's claims")) {
  fail('Phrasly top card does not label the over 99% figure as the vendor\'s claim');
}
if (!imageBudget.includes('no account') || !imageBudget.includes('Hands-on test 6 Nov 2026')) {
  fail('Phrasly budget card is missing its hands-on label');
}
if (imageBudget.includes('Pending hands-on test')) fail('Phrasly budget card still has a pending hands-on label');
if (!imageBudget.includes('was not measured')) fail('Phrasly budget card does not keep the accuracy figure unmeasured');
if (imageAvoid.includes('Hands-on test 6 Nov')) fail('The eye-only avoid was marked as hands-on tested');

const sheet = readFileSync(pathToFile(`${base}/use-cases/analyse-a-spreadsheet/`), 'utf8');
for (const phrase of [
  'Hands-on test (7 Nov 2026)',
  '20 rows · not saved',
  '20 records / 3 Product',
  'about 3.3 seconds',
  'Total units 102',
  'Avg unit price 3.55',
  'Product (distinct) 3',
  'Croissant 45',
  'Sourdough loaf 33',
  'Cinnamon bun 24',
  'Bath 60',
  '58.8%',
  'about 3.13',
  '€2.20',
  'Unit price gbp',
  'Export disabled',
  'Sign up to export',
  'Made with Datastripes',
  '€19',
  'not checked by network inspection',
  'Google Sheets, Claude and ChatGPT were not part of it',
  'has not been run',
]) {
  if (!sheet.includes(phrase)) fail(`spreadsheet page is missing the hands-on note phrase: ${phrase}`);
}
if (!sheet.includes('datetime="2026-11-23"')) fail('spreadsheet page does not show 23 Nov 2026 as dateModified');
if (!sheet.includes('Standard task still pending') || !sheet.includes('standard task')) {
  fail('spreadsheet page does not keep the standard task pending');
}
if (!sheet.includes(`${base}/tested/`)) fail('spreadsheet page does not link to the tested page');
if (!sheet.includes('Pending hands-on test')) fail('spreadsheet page lost its pending hands-on label');
const sheetTop = sheet.split('class="card pick"')[1]?.split('class="card pick budget"')[0] ?? '';
const sheetBudget = sheet.split('class="card pick budget"')[1]?.split('class="card pick avoid"')[0] ?? '';
if (!sheetTop.includes('Google Sheets') || sheetTop.includes('Hands-on test')) {
  fail('Google Sheets was marked as hands-on tested');
}
if (!sheetBudget.includes('Claude') || sheetBudget.includes('Hands-on test')) {
  fail('Claude was marked as hands-on tested');
}
if (sheet.includes('Hands-on test 7 Nov')) fail('A spreadsheet pick was marked as hands-on tested on 7 Nov');

for (const page of [
  `${base}/best/ai-translation-tools/`,
  `${base}/best/ai-tools-for-small-business/`,
  `${base}/alternatives/grammarly/`,
  `${base}/tested/`,
]) {
  if (!existsSync(pathToFile(page))) fail(`built page is missing ${page}`);
  if (!sitemap.includes(`${origin}${page}`)) fail(`sitemap is missing ${page}`);
}
const tested = readFileSync(pathToFile(`${base}/tested/`), 'utf8');
for (const phrase of [
  'Consensus Free',
  'Perplexity Free',
  'DeepL Free',
  'LanguageTool Basic',
  'Looka Brand Kit',
  'Phrasly AI Image Detector',
  'Datastripes',
  '7 Nov 2026',
  'nixm',
  '8 Nov 2026',
  'introducing our weekend pastry box',
  'every saturday',
  'signing an account is needed to generate images',
  '20 CREDITS ON US',
  'Those claims were not verified',
  'Twenty-one notes exist',
  '24 Nov 2026',
  'GPTZero Free',
  'Sally Lunn bun',
  'Model 5.0b',
  'We are highly confident this text is entirely human',
  'highly confident this text was AI generated',
  'a mix of AI and human',
  '3 of 8 sentences',
  'about 2.8 seconds',
  'about 8.8 seconds',
  'about 1.0 seconds',
  'image captcha',
  '10,000 credits left this month',
  'Sign up to Continue',
  '1/1 free scans left',
  '£9.09',
  'was £12.99',
  'AI-writing check page',
  'false positives on more human writing were not tested',
  '23 Nov 2026',
  'Scam Link Check',
  'Hands-on test 23 Nov 2026',
  'royalmaiI-redelivery-uk.com',
  'We don\'t keep what you paste',
  'For guidance only; no tool can catch every scam.',
  '1.0–1.2 seconds',
  'phishing / scam site',
  'Not encrypted (http instead of https)',
  'No known risk found',
  'No short-link expansion was shown',
  'uses words scammers often use: redeliver, unpaid',
  'weak reassurance',
  'only on this page',
  '21 Nov 2026',
  'Fack\'d',
  '6 of 10',
  'Stop checking',
  'Jeremy Kyle',
  '2 of 2',
  'TalkTV',
  '20 Nov 2026',
  'AmIPicked',
  '3/9',
  '8/10',
  'AI recommends you only sometimes',
  'Here is what we will ask AI',
  'No checks-left counter',
  'Cotswolds and Bristol',
  'ERR_CONNECTION_CLOSED',
  '19 Nov 2026',
  'Grammarly Free',
  '247-character',
  '9 underlines',
  'about 5 seconds',
  'Fix spelling',
  'Get Grammarly for free to get more',
  '618-word',
  '3,355',
  '709 characters',
  'about 133 words',
  'only 4 suggestions',
  'paraphrasing tool',
  '15 Nov 2026',
  '16 Nov 2026',
  '17 Nov 2026',
  '18 Nov 2026',
  'n8n self-hosted',
  '2.48.5',
  'Community Edition',
  'v24.22.1',
  '74.9 seconds',
  '2.9 GB',
  '1,096 top-level packages',
  'Successfully imported 1 workflow',
  '344 database migrations',
  'HollowOakOrder01',
  '0.80 seconds',
  '6 of 6 correct',
  'Saturday 9–11am collection, Bath, no delivery',
  'Node does not have any credentials set',
  'n8n Cloud',
  'webhooks',
  'Anki desktop',
  'Zotero desktop',
  '10.0.8',
  '118.3 MB',
  'about 63 seconds',
  '10.1038/nature14539',
  '9780262035613',
  '10.1145/3442188.3445922',
  'APA Style 7th edition',
  'The MIT press',
  'lower-case press',
  'Food Standards Agency',
  'issue number 7553',
  'Bakery dissertation',
  'Add to Collection',
  'PDF attachment',
  'Log In / Create Account',
  '26.09.4',
  'Linux x86_64',
  'official GitHub release',
  '194.7 MB',
  'about 665 MB',
  'about 5 seconds',
  'food-hygiene',
  '10 notes found in file',
  '6.27 seconds',
  '6 of 6 checked answers matched',
  'under 1 minute',
  'under 6 minutes',
  'under 10 minutes',
  '3 to 5 days',
  '1.96 minutes',
  '11.78 seconds',
  'no built-in AI card generation',
  'Audio was not tested',
  'AnkiWeb',
  'AnkiMobile',
  '11:20:23.6',
  '11:20:30.7',
  '116 words',
  'not a logged-in Free account',
  'Sourdough loaves were not mentioned',
  'freshly baked treats',
  'Image creation is only available when you',
  'Ask ChatGPT',
  'a logged-in ChatGPT Free account',
  '14 Nov 2026',
  'Preview resolution 904×1080 Free',
  '1200×1433',
  'HIGHGROVE',
  '0.85 seconds',
  'box browser',
  'no formal edge-error count',
  'Pixelcut Free account',
  'Quillo',
  '11 Nov 2026',
  '0.566',
  'pronunciation of the time, date, phone number and price is unverified',
  '$4.99/mo',
  '$9.99/mo',
  '10 cloud minutes',
  'MP3 download is not available',
  'Dessn',
  'Spacefast',
  '10 Nov 2026',
  'This space is private',
  'about 4 seconds',
  'about 3.2 seconds',
  'HTTP 500',
  'about 33 hours',
  'WordPress.com',
  '9 Nov 2026',
  'Baked this morning on Mill Lane',
  '£10.10',
  '1 action failed',
  'This first one is on us',
  '20 credits remaining',
  '20 rows · not saved',
  'Total units 102',
  'not network-verified',
  '6 Nov 2026',
  'Likely real',
  '26 Oct 2026',
  '2 Nov 2026',
  '3 Nov 2026',
  '4 Nov 2026',
  '5 Nov 2026',
  'no file was downloaded',
  '1080×1080',
  'Canva Pro',
  'File translation was not tested',
  'signed out',
  '8 planted errors',
  'has agreement error',
  'One arguable false positive',
  'id="newsletter"',
]) {
  if (!tested.includes(phrase)) fail(`tested page is missing ${phrase}`);
}
if (!tested.includes('Tested 17 Nov 2026: Zotero 10.0.8 resolved 3/3 identifiers')) {
  fail('tested page is missing the Zotero quotable line');
}
if (!tested.includes('Tested 18 Nov 2026: n8n self-hosted 2.48.5 routed 6 of 6 orders correctly')) {
  fail('tested page is missing the n8n quotable line');
}
if (!tested.includes('Tested 19 Nov 2026: Grammarly Free, signed out, showed only the first fix')) {
  fail('tested page is missing the Grammarly Free quotable line');
}
if (!tested.includes('returned 3/9 for Hobbs House Bakery and 8/10 for Greggs')) {
  fail('tested page is missing the AmIPicked quotable line');
}
if (!tested.includes('found 3 claims on a 6-minute TalkTV debate, 2 of 2 opened sources supported the ratings')) {
  fail('tested page is missing the Fack\'d quotable line');
}
if (!tested.includes('returned 4 verdicts in about 1.0–1.2 seconds, marked Google') || !tested.includes('test phishing URL Dangerous, and missed a look-alike Royal Mail text')) {
  fail('tested page is missing the Scam Link Check quotable line');
}
if (!tested.includes('Tested 24 Nov 2026: GPTZero Free, signed out, scored a 2018 Wikipedia passage 100% human')) {
  fail('tested page is missing the GPTZero Free quotable line');
}
if (!tested.includes('Tested 16 Nov 2026: Anki desktop 26.09.4 imported 10 of 10 cards')) {
  fail('tested page is missing the Anki quotable line');
}
if (!/standard task/i.test(tested) || !tested.includes('has not been run')) {
  fail('tested page does not keep the standard tasks pending');
}
const translation = readFileSync(pathToFile(`${base}/best/ai-translation-tools/`), 'utf8');
if (!translation.includes(`${base}/use-cases/translate-a-document/`)) fail('translation shortlist does not link to the use case');
if (!translation.includes(`${base}/tested/`)) fail('translation shortlist does not link to the tested page');
if (!translation.includes('checked 4 Nov 2026') && !translation.includes('4 Nov 2026')) fail('translation shortlist is missing the checked date');
const grammarly = readFileSync(pathToFile(`${base}/alternatives/grammarly/`), 'utf8');
if (!grammarly.includes(`${base}/use-cases/proofread-and-edit/`)) fail('Grammarly alternatives does not link to the use case');
if (!grammarly.includes(`${base}/tested/`)) fail('Grammarly alternatives does not link to the tested page');
if (grammarly.includes('No hands-on test has been run')) fail('Grammarly alternatives still says no hands-on test has been run');
const smallBusiness = readFileSync(pathToFile(`${base}/best/ai-tools-for-small-business/`), 'utf8');
for (const slug of [
  'automate-small-business-admin',
  'answer-customer-questions',
  'analyse-a-spreadsheet',
  'run-marketing-campaigns',
  'write-posts-and-emails',
]) {
  if (!smallBusiness.includes(`use-cases/${slug}/`)) fail(`small-business hub does not link to ${slug}`);
}
if (!smallBusiness.includes('LanguageTool Basic')) fail('small-business hub omits the LanguageTool Basic hands-on note');
if (!smallBusiness.includes('Looka Brand Kit')) fail('small-business hub omits the Looka Brand Kit hands-on note');
if (!smallBusiness.includes('Datastripes')) fail('small-business hub omits the Datastripes hands-on note');
if (smallBusiness.includes('None of the five use-case pages has a hands-on note')) {
  fail('small-business hub still says the spreadsheet page has no hands-on note');
}
if (existsSync(full) && !readFileSync(full, 'utf8').includes('Tested 17 Nov 2026: Zotero 10.0.8 resolved 3/3 identifiers')) {
  fail('llms-full.txt is missing the Zotero quotable line');
}
if (existsSync(full) && !readFileSync(full, 'utf8').includes('Tested 18 Nov 2026: n8n self-hosted 2.48.5 routed 6 of 6 orders correctly')) {
  fail('llms-full.txt is missing the n8n quotable line');
}
if (existsSync(full) && !readFileSync(full, 'utf8').includes('Tested 19 Nov 2026: Grammarly Free, signed out, showed only the first fix')) {
  fail('llms-full.txt is missing the Grammarly Free quotable line');
}
if (existsSync(full) && !readFileSync(full, 'utf8').includes('returned 3/9 for Hobbs House Bakery and 8/10 for Greggs')) {
  fail('llms-full.txt is missing the AmIPicked quotable line');
}
if (existsSync(full) && !readFileSync(full, 'utf8').includes('found 3 claims on a 6-minute TalkTV debate, 2 of 2 opened sources supported the ratings')) {
  fail('llms-full.txt is missing the Fack\'d quotable line');
}
if (existsSync(full) && !readFileSync(full, 'utf8').includes('Tested 24 Nov 2026: GPTZero Free, signed out, scored a 2018 Wikipedia passage 100% human')) {
  fail('llms-full.txt is missing the GPTZero Free quotable line');
}
if (existsSync(llms) && !readFileSync(llms, 'utf8').includes(`${base}/tested/`)) fail('llms.txt is missing /tested/');
if (existsSync(llms) && !readFileSync(llms, 'utf8').includes('LanguageTool Basic (4 Nov 2026)')) {
  fail('llms.txt omits the LanguageTool Basic hands-on note');
}
if (existsSync(llms) && !readFileSync(llms, 'utf8').includes('Looka Brand Kit (5 Nov 2026)')) {
  fail('llms.txt omits the Looka Brand Kit hands-on note');
}
if (existsSync(llms) && !readFileSync(llms, 'utf8').includes('Phrasly AI Image Detector (6 Nov 2026)')) {
  fail('llms.txt omits the Phrasly AI Image Detector hands-on note');
}
if (existsSync(llms) && !readFileSync(llms, 'utf8').includes('Datastripes (7 Nov 2026)')) {
  fail('llms.txt omits the Datastripes hands-on note');
}
if (existsSync(llms) && !readFileSync(llms, 'utf8').includes('nixm (8 Nov 2026)')) {
  fail('llms.txt omits the nixm hands-on note');
}
if (existsSync(llms) && !readFileSync(llms, 'utf8').includes('Dessn (9 Nov 2026)')) {
  fail('llms.txt omits the Dessn hands-on note');
}
if (existsSync(llms) && !readFileSync(llms, 'utf8').includes('Spacefast (10 Nov 2026)')) {
  fail('llms.txt omits the Spacefast hands-on note');
}
if (existsSync(llms) && !readFileSync(llms, 'utf8').includes('Quillo (11 Nov 2026)')) {
  fail('llms.txt omits the Quillo hands-on note');
}
if (existsSync(llms) && !readFileSync(llms, 'utf8').includes('signed-out Pixelcut and Photoroom web tools (14 Nov 2026)')) {
  fail('llms.txt omits the 14 Nov background-remover note');
}
if (existsSync(llms) && !readFileSync(llms, 'utf8').includes('ChatGPT signed out (15 Nov 2026)')) {
  fail('llms.txt omits the signed-out ChatGPT note');
}
if (existsSync(llms) && !readFileSync(llms, 'utf8').includes('Anki desktop (16 Nov 2026)')) {
  fail('llms.txt omits the Anki desktop note');
}
if (existsSync(llms) && !readFileSync(llms, 'utf8').includes('Zotero desktop (17 Nov 2026)')) {
  fail('llms.txt omits the Zotero desktop note');
}
if (existsSync(llms) && !readFileSync(llms, 'utf8').includes('n8n self-hosted (18 Nov 2026)')) {
  fail('llms.txt omits the n8n self-hosted note');
}
if (existsSync(llms) && !readFileSync(llms, 'utf8').includes('Grammarly Free (19 Nov 2026)')) {
  fail('llms.txt omits the Grammarly Free note');
}
if (existsSync(llms) && !readFileSync(llms, 'utf8').includes('AmIPicked (20 Nov 2026)')) {
  fail('llms.txt omits the AmIPicked note');
}
if (existsSync(llms) && !readFileSync(llms, 'utf8').includes('Fack\'d (21 Nov 2026)')) {
  fail('llms.txt omits the Fack\'d note');
}
if (existsSync(llms) && !readFileSync(llms, 'utf8').includes('Scam Link Check (23 Nov 2026)')) {
  fail('llms.txt omits the Scam Link Check note');
}
if (existsSync(llms) && !readFileSync(llms, 'utf8').includes('GPTZero Free (24 Nov 2026)')) {
  fail('llms.txt omits the GPTZero Free note');
}
if (existsSync(full) && !readFileSync(full, 'utf8').includes(`${base}/tested/`)) fail('llms-full.txt is missing /tested/');
if (existsSync(full) && !readFileSync(full, 'utf8').includes('has agreement error')) {
  fail('llms-full.txt omits the LanguageTool agreement-error result');
}
if (existsSync(full) && (!readFileSync(full, 'utf8').includes('Hollow Oak Bakery') || !readFileSync(full, 'utf8').includes('Canva Pro was not part of this check'))) {
  fail('llms-full.txt omits the Looka hands-on note or marks Canva Pro as part of it');
}
if (existsSync(full) && (!readFileSync(full, 'utf8').includes('Likely real') || !readFileSync(full, 'utf8').includes('not a signature-free'))) {
  fail('llms-full.txt omits the Phrasly hands-on note or its signature-free limit');
}
if (existsSync(full) && (!readFileSync(full, 'utf8').includes('20 rows · not saved') || !readFileSync(full, 'utf8').includes('Google Sheets, Claude and ChatGPT were not part of this check'))) {
  fail('llms-full.txt omits the Datastripes hands-on note or marks the other picks as part of it');
}
if (existsSync(full) && (!readFileSync(full, 'utf8').includes('introducing our weekend pastry box') || !readFileSync(full, 'utf8').includes('The write-posts page\'s standard task'))) {
  fail('llms-full.txt omits the nixm hands-on note or its unrun standard task');
}
if (existsSync(full) && (!readFileSync(full, 'utf8').includes('Baked this morning on Mill Lane') || !readFileSync(full, 'utf8').includes('The app-screen page\'s standard task'))) {
  fail('llms-full.txt omits the Dessn hands-on note or its unrun standard task');
}
if (existsSync(full) && (!readFileSync(full, 'utf8').includes('This space is private') || !readFileSync(full, 'utf8').includes('The vibe-code page\'s standard task'))) {
  fail('llms-full.txt omits the Spacefast hands-on note or its unrun standard task');
}
if (existsSync(full) && (!readFileSync(full, 'utf8').includes('pronunciation of the time, date, phone number and price is unverified') || !readFileSync(full, 'utf8').includes('The voiceover page\'s standard task'))) {
  fail('llms-full.txt omits the Quillo hands-on note or its unrun standard task');
}
if (existsSync(full) && (!readFileSync(full, 'utf8').includes('Preview resolution 904×1080 Free') || !readFileSync(full, 'utf8').includes('The product-photo page\'s standard task'))) {
  fail('llms-full.txt omits the signed-out background-remover note or its unrun standard task');
}
if (existsSync(full) && (!readFileSync(full, 'utf8').includes('11:20:23.6') || !readFileSync(full, 'utf8').includes('not a logged-in Free account'))) {
  fail('llms-full.txt omits the signed-out ChatGPT note or its logged-in caveat');
}
if (existsSync(full) && (!readFileSync(full, 'utf8').includes('10 notes found in file') || !readFileSync(full, 'utf8').includes('The flashcards page\'s standard task'))) {
  fail('llms-full.txt omits the Anki desktop note or its unrun standard task');
}
if (existsSync(full) && (!readFileSync(full, 'utf8').includes('APA Style 7th edition') || !readFileSync(full, 'utf8').includes('The citation page\'s standard task'))) {
  fail('llms-full.txt omits the Zotero desktop note or its unrun standard task');
}
if (existsSync(full) && (!readFileSync(full, 'utf8').includes('Successfully imported 1 workflow') || !readFileSync(full, 'utf8').includes('The admin page\'s standard task'))) {
  fail('llms-full.txt omits the n8n self-hosted note or its unrun standard task');
}
if (existsSync(full) && (!readFileSync(full, 'utf8').includes('Get Grammarly for free to get more') || !readFileSync(full, 'utf8').includes('The proofread page\'s standard task'))) {
  fail('llms-full.txt omits the Grammarly Free note or its unrun standard task');
}
if (existsSync(full) && (!readFileSync(full, 'utf8').includes('Here is what we will ask AI') || !readFileSync(full, 'utf8').includes('The marketing page\'s standard task'))) {
  fail('llms-full.txt omits the AmIPicked note or its unrun standard task');
}
if (existsSync(full) && (!readFileSync(full, 'utf8').includes('Stop checking') || !readFileSync(full, 'utf8').includes('The research page\'s standard task'))) {
  fail('llms-full.txt omits the Fack\'d note or its unrun standard task');
}
if (existsSync(full) && (!readFileSync(full, 'utf8').includes('royalmaiI-redelivery-uk.com') || !readFileSync(full, 'utf8').includes('only on the tested page'))) {
  fail('llms-full.txt omits the Scam Link Check note or files it under a use case');
}
if (existsSync(full) && (!readFileSync(full, 'utf8').includes('Sally Lunn bun') || !readFileSync(full, 'utf8').includes('The AI-writing check page\'s standard task'))) {
  fail('llms-full.txt omits the GPTZero Free note or its unrun standard task');
}
if (!smallBusiness.includes('nixm')) fail('small-business hub omits the nixm hands-on note');
if (!smallBusiness.includes('Dessn')) fail('small-business hub omits the Dessn hands-on note');
if (!smallBusiness.includes('Spacefast')) fail('small-business hub omits the Spacefast hands-on note');
if (!smallBusiness.includes('Quillo')) fail('small-business hub omits the Quillo hands-on note');
if (!smallBusiness.includes('signed-out Pixelcut and Photoroom web tools from 14 Nov 2026')) {
  fail('small-business hub omits the 14 Nov background-remover note');
}
if (!smallBusiness.includes('signed-out ChatGPT email check from 15 Nov 2026')) {
  fail('small-business hub omits the 15 Nov ChatGPT note');
}
if (!smallBusiness.includes('not a logged-in Free account')) {
  fail('small-business hub does not keep the ChatGPT note signed out');
}
if (!smallBusiness.includes('Anki desktop from 16 Nov 2026')) {
  fail('small-business hub omits the 16 Nov Anki note');
}
if (!smallBusiness.includes('The flashcards page stays pending. AnkiWeb and AnkiMobile were not part of that check.')) {
  fail('small-business hub marks AnkiWeb or AnkiMobile as part of the Anki check');
}
if (!smallBusiness.includes('Zotero desktop from 17 Nov 2026')) {
  fail('small-business hub omits the 17 Nov Zotero note');
}
if (!smallBusiness.includes('The citation page stays pending. Zotero storage was not part of that check.')) {
  fail('small-business hub marks Zotero storage as part of the Zotero check');
}
if (!smallBusiness.includes('n8n self-hosted note from 18 Nov 2026')) {
  fail('small-business hub omits the 18 Nov n8n note');
}
if (!smallBusiness.includes('The admin page stays pending. Zapier, the editor UI, n8n Cloud, AI nodes with a real key, and integrations (Gmail, Sheets, webhooks, schedules) were not part of that check.')) {
  fail('small-business hub marks Zapier, n8n Cloud or an integration as part of the n8n check');
}
if (!smallBusiness.includes('Grammarly Free from 19 Nov 2026')) {
  fail('small-business hub omits the 19 Nov Grammarly Free note');
}
if (!smallBusiness.includes('The proofread page stays pending. Grammarly Pro, a signed-in free account, the browser extension, the desktop app and the paraphrasing tool were not part of the 19 Nov Grammarly Free check.')) {
  fail('small-business hub marks Grammarly Pro or a signed-in account as part of the Grammarly Free check');
}
if (!smallBusiness.includes('AmIPicked note from 20 Nov 2026')) {
  fail('small-business hub omits the 20 Nov AmIPicked note');
}
if (!smallBusiness.includes('The marketing page stays pending. Buffer Essentials and Metricool Free were not part of that check.')) {
  fail('small-business hub marks Buffer or Metricool as part of the AmIPicked check');
}

const writing = readFileSync(pathToFile(`${base}/use-cases/write-posts-and-emails/`), 'utf8');
for (const phrase of [
  'Pending hands-on test',
  'Standard task still pending',
  'Hands-on test (8 Nov 2026)',
  'Hands-on test (15 Nov 2026)',
  'introducing our weekend pastry box',
  'every saturday',
  'signing an account is needed to generate images',
  'No shareable NIXM URL appeared',
  'Unfortunately, Claude is not available to new users right now',
  'archie.miller@mail.grokbot.com',
  'no draft was generated in Claude',
  'not a quality score',
  'has not been run',
  '11:20:23.6',
  '11:20:30.7',
  '116 words',
  'not a logged-in Free account',
  'Sourdough loaves were not mentioned',
  'freshly baked treats',
  'buttery croissants',
  'comforting cinnamon buns',
  'Filled with some of our favourite... treats',
  'Log in to get answers based on saved chats, plus create images and upload files.',
  'Image creation is only available when you',
  'Ask ChatGPT',
  'Optional cookies were rejected',
  'No model name or message limit was shown',
  `${base}/tested/`,
  'datetime="2026-11-23"',
]) {
  if (!writing.includes(phrase)) fail(`writing page is missing the hands-on note phrase: ${phrase}`);
}
const writingTop = writing.split('class="card pick"')[1]?.split('class="card pick budget"')[0] ?? '';
const writingBudget = writing.split('class="card pick budget"')[1]?.split('class="card pick avoid"')[0] ?? '';
const writingAvoid = writing.split('class="card pick avoid"')[1]?.split('</section>')[0] ?? '';
if (!writingTop.includes('Claude') || !writingTop.includes('Pending hands-on test')) {
  fail('Claude lost its pending hands-on label on the writing page');
}
if (writingTop.includes('Hands-on test 15 Nov') || writingTop.includes('Hands-on test 8 Nov')) {
  fail('Claude was marked as hands-on tested on the writing page');
}
if (!writingBudget.includes('ChatGPT') || !writingBudget.includes('Hands-on test 15 Nov 2026')) {
  fail('ChatGPT card is missing its signed-out hands-on label');
}
if (writingBudget.includes('Pending hands-on test')) fail('ChatGPT card still has a pending hands-on label');
if (!writingBudget.includes('not a logged-in Free account')) {
  fail('ChatGPT card does not say this was signed out, not a logged-in Free account');
}
if (!writingBudget.includes('Sourdough loaves were not mentioned')) {
  fail('ChatGPT card omits the missed sourdough loaves');
}
if (writingAvoid.includes('Hands-on test 15 Nov')) fail('Claude Free was marked as hands-on tested on 15 Nov');

const flashcards = readFileSync(pathToFile(`${base}/use-cases/turn-notes-into-flashcards/`), 'utf8');
for (const phrase of [
  'Pending hands-on test',
  'Standard task still pending',
  'Hands-on test (16 Nov 2026)',
  '26.09.4',
  'Linux x86_64',
  'official GitHub release',
  '194.7 MB',
  'about 665 MB',
  'about 5 seconds',
  'no account prompt and no sync prompt',
  'food-hygiene',
  '10 Basic cards',
  'Anki header lines',
  '10 notes found in file',
  'Of those: 10 new notes imported.',
  '6.27 seconds',
  '6 of 6 checked answers matched',
  'under 1 minute',
  'under 6 minutes',
  'under 10 minutes',
  '3 to 5 days',
  'varied per card',
  'came back later in the same session',
  '1.96 minutes',
  '11.78 seconds',
  'no built-in AI card generation',
  'The download is large',
  'Audio was not tested',
  'AnkiWeb',
  'AnkiMobile',
  'sync were not tested',
  '20 lecture facts',
  'has not been run',
  'Computer version: free',
  'No purchase price is printed',
  'Described as free',
  '$25',
  `${base}/tested/`,
  'datetime="2026-11-23"',
]) {
  if (!flashcards.includes(phrase)) fail(`flashcards page is missing the hands-on note phrase: ${phrase}`);
}
const flashTop = flashcards.split('class="card pick"')[1]?.split('class="card pick budget"')[0] ?? '';
const flashBudget = flashcards.split('class="card pick budget"')[1]?.split('class="card pick avoid"')[0] ?? '';
const flashAvoid = flashcards.split('class="card pick avoid"')[1]?.split('</section>')[0] ?? '';
if (!flashTop.includes('Anki') || !flashTop.includes('Hands-on test 16 Nov 2026')) {
  fail('Anki desktop card is missing its hands-on label');
}
if (!flashTop.includes('Tested 16 Nov 2026: Anki desktop 26.09.4 imported 10 of 10 cards')) {
  fail('Anki desktop card is missing the quotable line');
}
if (flashTop.includes('Pending hands-on test')) fail('Anki desktop card still has a pending hands-on label');
if (!flashBudget.includes('AnkiWeb') || !flashBudget.includes('Pending hands-on test')) {
  fail('AnkiWeb lost its pending hands-on label');
}
if (flashBudget.includes('Hands-on test 16 Nov')) fail('AnkiWeb was marked as hands-on tested on 16 Nov');
if (flashAvoid.includes('Hands-on test 16 Nov')) fail('AnkiMobile was marked as hands-on tested on 16 Nov');
if (flashcards.includes('>Tested 16 Nov 2026<')) fail('flashcards page was marked as a completed test');

const citations = readFileSync(pathToFile(`${base}/use-cases/keep-a-citation-library/`), 'utf8');
for (const phrase of [
  'Pending hands-on test',
  'Standard task still pending',
  'Hands-on test (17 Nov 2026)',
  '10.0.8',
  'Linux x86_64',
  'zotero.org',
  '118.3 MB',
  'about 63 seconds',
  'install-confirmation page',
  'LibreOffice citation-plugin installer',
  'The installer was cancelled',
  'Quick Start Guide',
  'No account or payment prompt blocked use',
  '10.1038/nature14539',
  'about 18 seconds',
  '436–444',
  '9780262035613',
  'focus moved away',
  'The MIT press',
  'lower-case press',
  '10.1145/3442188.3445922',
  'Stochastic Parrots',
  '610–623',
  'Food Standards Agency',
  'APA Style 7th edition',
  'issue number 7553',
  '(n.d.)',
  'Bakery dissertation',
  'Add to Collection',
  'did not add them',
  'Log In / Create Account',
  'PDF attachment',
  'were not tested',
  'five public web pages',
  'has not been run',
  '300 MB free',
  '$20/year',
  '$60/year',
  '$120/year',
  `${base}/tested/`,
  'datetime="2026-11-23"',
]) {
  if (!citations.includes(phrase)) fail(`citation page is missing the hands-on note phrase: ${phrase}`);
}
const citeTop = citations.split('class="card pick"')[1]?.split('class="card pick budget"')[0] ?? '';
const citeBudget = citations.split('class="card pick budget"')[1]?.split('class="card pick avoid"')[0] ?? '';
const citeAvoid = citations.split('class="card pick avoid"')[1]?.split('</section>')[0] ?? '';
if (!citeTop.includes('Zotero') || !citeTop.includes('Hands-on test 17 Nov 2026')) {
  fail('Zotero desktop card is missing its hands-on label');
}
if (!citeTop.includes('Tested 17 Nov 2026: Zotero 10.0.8 resolved 3/3 identifiers')) {
  fail('Zotero desktop card is missing the quotable line');
}
if (citeTop.includes('Pending hands-on test')) fail('Zotero desktop card still has a pending hands-on label');
if (!citeBudget.includes('Zotero storage') || !citeBudget.includes('Pending hands-on test')) {
  fail('Zotero storage lost its pending hands-on label');
}
if (citeBudget.includes('Hands-on test 17 Nov')) fail('Zotero storage was marked as hands-on tested on 17 Nov');
if (citeAvoid.includes('Hands-on test 17 Nov')) fail('Zotero unlimited storage was marked as hands-on tested on 17 Nov');
if (citations.includes('>Tested 17 Nov 2026<')) fail('citation page was marked as a completed test');

const admin = readFileSync(pathToFile(`${base}/use-cases/automate-small-business-admin/`), 'utf8');
for (const phrase of [
  'Pending hands-on test',
  'Standard task still pending',
  'Hands-on test (18 Nov 2026)',
  '2.48.5',
  'Community Edition',
  'Linux x86_64',
  'v24.22.1',
  'npm 11.21.1',
  '24.0.0',
  '74.9 seconds',
  '2.9 GB',
  '1,096 top-level packages',
  '14 packages',
  '0.3 seconds',
  'Successfully imported 1 workflow',
  '344 database migrations',
  '5.8 seconds',
  'HollowOakOrder01',
  'N8N_RESTRICT_FILE_ACCESS_TO',
  '3.83 seconds',
  '3.51 seconds',
  '0.80 seconds',
  '703 ms',
  '6 of 6 correct',
  '4 of 4',
  'Saturday 9–11am collection, Bath, no delivery',
  '£80.80',
  '16.80',
  'Missing email - cannot send confirmation',
  'Delivery requested - we do not deliver (collection only)',
  'written by us',
  'Nothing was AI-generated',
  '846 node types',
  'Node does not have any credentials set',
  'editor UI',
  'n8n Cloud',
  'Gmail',
  'Google Sheets',
  'webhooks',
  'schedules',
  'local owner account',
  'DEPRECATED: Please use --id instead',
  'Python task runner',
  'were not tested',
  'new website enquiry',
  'has not been run',
  '100 tasks/mo',
  `${base}/tested/`,
  'datetime="2026-11-23"',
]) {
  if (!admin.includes(phrase)) fail(`admin page is missing the hands-on note phrase: ${phrase}`);
}
const adminTop = admin.split('class="card pick"')[1]?.split('class="card pick budget"')[0] ?? '';
const adminBudget = admin.split('class="card pick budget"')[1]?.split('class="card pick avoid"')[0] ?? '';
const adminAvoid = admin.split('class="card pick avoid"')[1]?.split('</section>')[0] ?? '';
if (!adminBudget.includes('n8n') || !adminBudget.includes('Hands-on test 18 Nov 2026')) {
  fail('n8n card is missing its hands-on label');
}
if (!adminBudget.includes('Tested 18 Nov 2026: n8n self-hosted 2.48.5 routed 6 of 6 orders correctly')) {
  fail('n8n card is missing the quotable line');
}
if (adminBudget.includes('Pending hands-on test')) fail('n8n card still has a pending hands-on label');
if (!adminBudget.includes('were not tested')) fail('n8n card does not say what was not tested');
if (!adminBudget.includes('written by us')) fail('n8n card does not say the workflow wording was written by us');
if (!adminTop.includes('Zapier') || !adminTop.includes('Pending hands-on test')) {
  fail('Zapier lost its pending hands-on label');
}
if (adminTop.includes('Hands-on test 18 Nov')) fail('Zapier was marked as hands-on tested on 18 Nov');
if (adminAvoid.includes('Hands-on test 18 Nov')) fail('Zapier Free was marked as hands-on tested on 18 Nov');
if (admin.includes('>Tested 18 Nov 2026<')) fail('admin page was marked as a completed test');

const slides = readFileSync(pathToFile(`${base}/use-cases/make-a-slide-deck/`), 'utf8');
for (const phrase of [
  'Pending hands-on test',
  'password step',
  'No deck was generated',
  'Unfortunately, Claude is not available to new users right now',
  'no deck was generated in Claude',
  'not a quality score',
]) {
  if (!slides.includes(phrase)) fail(`slide-deck page is missing: ${phrase}`);
}
const slidesBudget = slides.split('class="card pick budget"')[1]?.split('class="card pick avoid"')[0] ?? '';
if (!slidesBudget.includes('Claude') || slidesBudget.includes('Hands-on test')) {
  fail('Claude Free was marked as hands-on tested on the slide-deck page');
}

const vibe = readFileSync(pathToFile(`${base}/use-cases/vibe-code-an-mvp/`), 'utf8');
for (const phrase of [
  'Pending hands-on test',
  '11:09:09.983',
  'Verify you are human',
  'No preview, Deploy button or public URL appeared',
  'Signup was not completed',
  'Hands-on test (10 Nov 2026)',
  'sf publish',
  'about 4 seconds',
  'about 3.2 seconds',
  'This space is private',
  'about 33 hours',
  'WordPress.com',
  'HTTP 500',
  'does not build the app',
  'Standard task still pending',
  'has not been run',
  `${base}/tested/`,
  'datetime="2026-11-23"',
]) {
  if (!vibe.includes(phrase)) fail(`vibe-code page is missing: ${phrase}`);
}
const vibeTop = vibe.split('class="card pick"')[1]?.split('class="card pick budget"')[0] ?? '';
const vibeBudget = vibe.split('class="card pick budget"')[1]?.split('class="card pick avoid"')[0] ?? '';
if (!vibeTop.includes('Lovable') || vibeTop.includes('Hands-on test')) {
  fail('Lovable was marked as hands-on tested');
}
if (!vibeBudget.includes('Bolt.new') || vibeBudget.includes('Hands-on test')) {
  fail('Bolt.new was marked as hands-on tested');
}
if (vibe.includes('Hands-on test 10 Nov')) fail('A vibe-code pick was marked as hands-on tested on 10 Nov');
const vibeConsidered = vibe.split('<h2>Also considered</h2>')[1]?.split('<h2>Test notes</h2>')[0] ?? '';
if (!vibeConsidered.includes('Spacefast')) fail('Spacefast is missing from Also considered');
if (vibeConsidered.includes('Pending hands-on test')) fail('Spacefast is still labelled pending');

const screen = readFileSync(pathToFile(`${base}/use-cases/design-an-app-screen/`), 'utf8');
for (const phrase of [
  'Pending hands-on test',
  'Hands-on test (9 Nov 2026)',
  'Baked this morning on Mill Lane',
  '£10.10',
  '1 action failed',
  'This first one is on us',
  'about 2 minutes 6 seconds',
  '11:13:50.109',
  'Figma and v0 were not part of this check',
  'No export or download control was seen',
  'has not been run',
  `${base}/tested/`,
  'datetime="2026-11-23"',
]) {
  if (!screen.includes(phrase)) fail(`app-screen page is missing the hands-on note phrase: ${phrase}`);
}
const screenTop = screen.split('class="card pick"')[1]?.split('class="card pick budget"')[0] ?? '';
const screenBudget = screen.split('class="card pick budget"')[1]?.split('class="card pick avoid"')[0] ?? '';
if (!screenTop.includes('Figma Professional') || screenTop.includes('Hands-on test')) {
  fail('Figma Professional was marked as hands-on tested');
}
if (!screenBudget.includes('Figma Starter') || screenBudget.includes('Hands-on test')) {
  fail('Figma Starter was marked as hands-on tested');
}
if (screen.includes('Hands-on test 9 Nov')) fail('A design-page pick was marked as hands-on tested on 9 Nov');
const considered = screen.split('<h2>Also considered</h2>')[1]?.split('<h2>Test notes</h2>')[0] ?? '';
if (!considered.includes('Dessn')) fail('Dessn is missing from Also considered');
if (considered.includes('Pending hands-on test')) fail('Dessn is still labelled pending');

const background = readFileSync(pathToFile(`${base}/best/ai-product-background-removers/`), 'utf8');
for (const phrase of [
  'Photoroom Pro',
  'Pixelcut Free',
  'Pixelcut Pro',
  '$7.50',
  '9 Nov 2026',
  'Not a hands-on test',
  'Pending hands-on test',
  `${base}/use-cases/cut-out-a-product-photo/`,
  'id="newsletter"',
  'id="short-answer"',
  'id="faq"',
]) {
  if (!background.includes(phrase)) fail(`background-remover shortlist is missing ${phrase}`);
}
if (background.includes('Hands-on test 9 Nov')) fail('background-remover shortlist claims a hands-on test');
const voiceCompare = readFileSync(pathToFile(`${base}/compare/elevenlabs-vs-descript/`), 'utf8');
for (const phrase of [
  'ElevenLabs',
  'Descript',
  '$6/mo',
  '$16',
  '10 Nov 2026',
  'Not a hands-on test',
  'Pending hands-on test',
  'commercial licence',
  `${base}/use-cases/ai-voiceover/`,
  `${base}/best/ai-voiceover-for-youtube/`,
  `${base}/alternatives/elevenlabs/`,
]) {
  if (!voiceCompare.includes(phrase)) fail(`voiceover comparison is missing ${phrase}`);
}
if (voiceCompare.includes('Hands-on test 10 Nov') || voiceCompare.includes('Hands-on test 9 Nov')) {
  fail('voiceover comparison claims a hands-on test');
}
const grammarlyComparePath = pathToFile(`${base}/compare/grammarly-vs-languagetool/`);
const grammarlyCompare = grammarlyComparePath && existsSync(grammarlyComparePath) ? readFileSync(grammarlyComparePath, 'utf8') : '';
if (!grammarlyCompare) fail('built page is missing Grammarly vs LanguageTool');
else {
  for (const phrase of [
    'Grammarly vs LanguageTool',
    '$30 USD',
    '$144 USD',
    '2,000 characters',
    '3 AI sentence rephrases a day',
    'Pending hands-on test',
    'Not a hands-on test',
    '4 Nov 2026',
    '8 planted errors',
    `${base}/use-cases/proofread-and-edit/`,
    `${base}/alternatives/grammarly/`,
    `${base}/tested/`,
    'id="newsletter"',
    'id="short-answer"',
    'id="faq"',
  ]) {
    if (!grammarlyCompare.includes(phrase)) fail(`Grammarly vs LanguageTool is missing ${phrase}`);
  }
  if (grammarlyCompare.includes('Hands-on test 4 Nov')) fail('Grammarly vs LanguageTool claims a hands-on test');
  if (!sitemap.includes(`${origin}${base}/compare/grammarly-vs-languagetool/`)) {
    fail('sitemap is missing Grammarly vs LanguageTool');
  }
}
const productPhoto = readFileSync(pathToFile(`${base}/use-cases/cut-out-a-product-photo/`), 'utf8');
if (!productPhoto.includes(`${base}/best/ai-product-background-removers/`)) {
  fail('product photo use case does not link the shortlist');
}
for (const phrase of [
  'Pending hands-on test',
  'Standard task still pending',
  'Hands-on test (14 Nov 2026)',
  'Preview resolution 904×1080 Free',
  'Full resolution 1200×1433 Free with sign in',
  '1200×1433',
  'HIGHGROVE',
  '0.85 seconds',
  '1.5 seconds',
  'box browser',
  'Optional cookies were rejected',
  'no watermark seen',
  'Get Pro',
  'Want to land 50% more sales?',
  'Log in or sign up in seconds to continue using Photoroom',
  'no formal edge-error count',
  'remains pending for Photoroom Pro',
  'has not been run',
  `${base}/tested/`,
  'datetime="2026-11-23"',
]) {
  if (!productPhoto.includes(phrase)) fail(`product photo page is missing: ${phrase}`);
}
const photoTop = productPhoto.split('class="card pick"')[1]?.split('class="card pick budget"')[0] ?? '';
const photoBudget = productPhoto.split('class="card pick budget"')[1]?.split('class="card pick avoid"')[0] ?? '';
if (!photoTop.includes('Photoroom Pro') || photoTop.includes('Hands-on test')) {
  fail('Photoroom Pro was marked as hands-on tested');
}
if (!photoBudget.includes('Pixelcut Free') || photoBudget.includes('Hands-on test')) {
  fail('Pixelcut Free was marked as hands-on tested');
}
if (productPhoto.includes('Hands-on test 14 Nov')) fail('A product-photo pick was marked as hands-on tested on 14 Nov');
const voiceover = readFileSync(pathToFile(`${base}/use-cases/ai-voiceover/`), 'utf8');
if (!voiceover.includes(`${base}/compare/elevenlabs-vs-descript/`)) {
  fail('voiceover use case does not link the comparison');
}
for (const phrase of [
  'Pending hands-on test',
  'Hands-on test (11 Nov 2026)',
  'Standard task still pending',
  'pronunciation of the time, date, phone number and price is unverified',
  'Pause appeared within 0.566',
  'MP3 download',
  '$4.99/mo',
  '$9.99/mo',
  '10 cloud minutes',
  'no card',
  'ElevenLabs and Descript were not part of this check',
  'has not been run',
  `${base}/tested/`,
  'datetime="2026-11-16"',
]) {
  if (!voiceover.includes(phrase)) fail(`voiceover page is missing: ${phrase}`);
}
const voiceTop = voiceover.split('class="card pick"')[1]?.split('class="card pick budget"')[0] ?? '';
const voiceBudget = voiceover.split('class="card pick budget"')[1]?.split('class="card pick avoid"')[0] ?? '';
if (!voiceTop.includes('ElevenLabs') || voiceTop.includes('Hands-on test')) {
  fail('ElevenLabs was marked as hands-on tested');
}
if (!voiceBudget.includes('Descript') || voiceBudget.includes('Hands-on test')) {
  fail('Descript was marked as hands-on tested');
}
if (voiceover.includes('Hands-on test 11 Nov')) fail('A voiceover pick was marked as hands-on tested on 11 Nov');
const voiceConsidered = voiceover.split('<h2>Also considered</h2>')[1]?.split('<h2>Test notes</h2>')[0] ?? '';
if (!voiceConsidered.includes('Quillo')) fail('Quillo is missing from Also considered');
if (voiceConsidered.includes('Pending hands-on test')) fail('Quillo is still labelled pending');
const marketing = readFileSync(pathToFile(`${base}/use-cases/run-marketing-campaigns/`), 'utf8');
for (const phrase of [
  'Pending hands-on test',
  'Standard task still pending',
  'Hands-on test (20 Nov 2026)',
  'Here is what we will ask AI',
  'Ask ChatGPT and Gemini',
  '3/9',
  '8/10',
  'AI recommends you only sometimes',
  'ERR_CONNECTION_CLOSED',
  'Cotswolds and Bristol',
  'not Bath',
  'about 96 seconds',
  'about 75 seconds',
  'about 50 seconds',
  'about 41 seconds',
  'This model did not answer',
  'No llms.txt file',
  'No structured data',
  'not checked independently',
  'Remind me in 30 days',
  'Five questions are a sample',
  '$29/month',
  '$59/month',
  '$39',
  '2 months free',
  'Buffer Essentials and Metricool Free were not part of it',
  'has not been run',
  `${base}/tested/`,
  'datetime="2026-11-23"',
  'https://amipicked.com/pricing/',
]) {
  if (!marketing.includes(phrase)) fail(`marketing page is missing: ${phrase}`);
}
const marketingTop = marketing.split('class="card pick"')[1]?.split('class="card pick budget"')[0] ?? '';
const marketingBudget = marketing.split('class="card pick budget"')[1]?.split('class="card pick avoid"')[0] ?? '';
if (!marketingTop.includes('Buffer Essentials') || marketingTop.includes('Hands-on test')) {
  fail('Buffer Essentials was marked as hands-on tested');
}
if (!marketingBudget.includes('Metricool Free') || marketingBudget.includes('Hands-on test')) {
  fail('Metricool Free was marked as hands-on tested');
}
if (marketing.includes('Hands-on test 20 Nov')) fail('A marketing pick was marked as hands-on tested on 20 Nov');
const marketingConsidered = marketing.split('<h2>Also considered</h2>')[1]?.split('<h2>Test notes</h2>')[0] ?? '';
if (!marketingConsidered.includes('AmIPicked')) fail('AmIPicked is missing from Also considered');
if (marketingConsidered.includes('Pending hands-on test')) fail('AmIPicked is labelled as a pending pick');

const resume = readFileSync(pathToFile(`${base}/use-cases/build-a-resume/`), 'utf8');
for (const phrase of [
  'Pending hands-on test',
  'On 20 Nov 2026 Kickresume Free could not be tested unattended',
  'no account-free path',
  'Create My Resume',
  '/dashboard/create-resume/',
  '/register/',
  'requires a password',
  'LinkedIn, Google and Facebook',
  'no one-time code or magic link',
  'Nothing was built',
  'the AI writer and the free download remain untested',
  'The page stays pending',
  'datetime="2026-11-23"',
]) {
  if (!resume.includes(phrase)) fail(`resume page is missing: ${phrase}`);
}
if (resume.includes('Hands-on note') || resume.includes('Hands-on test (')) {
  fail('the blocked Kickresume attempt was written up as a hands-on note');
}
const resumeTop = resume.split('class="card pick"')[1]?.split('class="card pick budget"')[0] ?? '';
const resumeBudget = resume.split('class="card pick budget"')[1]?.split('class="card pick avoid"')[0] ?? '';
if (!resumeTop.includes('Kickresume Premium') || resumeTop.includes('Hands-on test')) {
  fail('Kickresume Premium was marked as hands-on tested');
}
if (!resumeBudget.includes('Kickresume Free') || resumeBudget.includes('Hands-on test')) {
  fail('Kickresume Free was marked as hands-on tested');
}

for (const page of [
  `${base}/best/ai-product-background-removers/`,
  `${base}/compare/elevenlabs-vs-descript/`,
]) {
  if (!existsSync(pathToFile(page))) fail(`built page is missing ${page}`);
  if (!sitemap.includes(`${origin}${page}`)) fail(`sitemap is missing ${page}`);
}

if (errors.length > 0) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(`SEO check passed for ${htmlFiles.length} pages.`);
