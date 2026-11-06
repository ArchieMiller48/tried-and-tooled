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
  }

  if (path === `${base}/newsletter/`) {
    if (!html.includes('id="newsletter"')) fail(`${path} is missing the signup form`);
    for (const issue of ['issue-1', 'issue-2', 'issue-3', 'issue-4']) {
      if (!html.includes(`${base}/newsletter/${issue}/`)) fail(`${path} does not link to ${issue}`);
    }
    const issue4At = html.indexOf(`${base}/newsletter/issue-4/`);
    const issue3At = html.indexOf(`${base}/newsletter/issue-3/`);
    const issue2At = html.indexOf(`${base}/newsletter/issue-2/`);
    const issue1At = html.indexOf(`${base}/newsletter/issue-1/`);
    if (!(issue4At < issue3At && issue3At < issue2At && issue2At < issue1At)) fail(`${path} does not list issue 4 first`);
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
  if (!index.includes(`${origin}${base}/sitemap-index.xml`)) fail('llms.txt does not advertise the sitemap');
  if (!expanded.includes(`${origin}${base}/sitemap-index.xml`)) fail('llms-full.txt does not advertise the sitemap');
  for (const needle of ['/compare/', '/best/', '/alternatives/', '/pricing/', '/about/', '/newsletter/']) {
    if (!index.includes(`${base}${needle}`)) fail(`llms.txt is missing ${needle}`);
  }
  for (const issuePath of [`${base}/newsletter/issue-1/`, `${base}/newsletter/issue-2/`, `${base}/newsletter/issue-3/`, `${base}/newsletter/issue-4/`]) {
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
for (const page of [`${base}/newsletter/`, `${base}/newsletter/issue-1/`, `${base}/newsletter/issue-2/`, `${base}/newsletter/issue-3/`, `${base}/newsletter/issue-4/`]) {
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
const sitemapUrls = [...sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((match) => match[1]);
if (sitemapUrls.length < 32) fail(`sitemap lists ${sitemapUrls.length} URLs`);
for (const block of sitemapUrls) {
  const loc = block.match(/<loc>([^<]+)<\/loc>/)?.[1] ?? '';
  const lastmod = block.match(/<lastmod>([^<]+)<\/lastmod>/)?.[1] ?? '';
  if (!lastmod) fail(`sitemap URL has no lastmod: ${loc}`);
  else if (!/^\d{4}-\d{2}-\d{2}/.test(lastmod)) fail(`sitemap lastmod for ${loc} is not a date: ${lastmod}`);
}
const research = readFileSync(pathToFile(`${base}/use-cases/research-and-summarise-sources/`), 'utf8');
for (const phrase of ['26 Oct 2026', '10 Pro searches a month', 'Consensus Meter', '25 seconds', '60 seconds', 'free Consensus account']) {
  if (!research.includes(phrase)) fail(`research page is missing the hands-on note phrase: ${phrase}`);
}
if (!research.includes('Standard task still pending') || !research.includes('standard task')) {
  fail('research page does not keep the standard task pending');
}
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
if (!translate.includes('datetime="2026-11-03"')) fail('translate page does not show 3 Nov 2026 as dateModified');
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
]) {
  if (!proofread.includes(phrase)) fail(`proofread page is missing the hands-on note phrase: ${phrase}`);
}
if (!proofread.includes('datetime="2026-11-04"')) fail('proofread page does not show 4 Nov 2026 as dateModified');
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
if (proofAvoid.includes('Hands-on test 4 Nov')) fail('Grammarly Free was marked as hands-on tested');

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

if (errors.length > 0) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(`SEO check passed for ${htmlFiles.length} pages.`);
