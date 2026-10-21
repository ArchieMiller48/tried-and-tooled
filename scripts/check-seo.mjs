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
    walkNodes(data, (node) => {
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
  }

  const levels = headingLevels(html);
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
  }
  for (const needle of ['/compare/', '/best/', '/alternatives/', '/pricing/', '/about/']) {
    if (!index.includes(`${base}${needle}`)) fail(`llms.txt is missing ${needle}`);
  }
  if (!expanded.includes('Source:') || !expanded.includes('Checked:')) fail('llms-full.txt is missing sourced prices');
  if (!/Pending hands-on test/.test(expanded)) fail('llms-full.txt dropped the pending-test label');
}

const robots = readFileSync(join(dist, 'robots.txt'), 'utf8');
if (!robots.includes(`${origin}${base}/llms.txt`)) fail('robots.txt does not mention llms.txt');
if (!robots.includes(`${origin}${base}/llms-full.txt`)) fail('robots.txt does not mention llms-full.txt');
const home = readFileSync(join(dist, 'index.html'), 'utf8');
if (!home.includes(`${base}/llms.txt`)) fail('The footer does not link to llms.txt');

if (errors.length > 0) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(`SEO check passed for ${htmlFiles.length} pages.`);
