import { mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

const dist = process.argv[2] || 'dist';
const out = process.argv[3] || 'indexnow/urls.json';

function walk(dir, files = []) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path, files);
    else files.push(path);
  }
  return files;
}

const xml = walk(dist)
  .filter((file) => file.endsWith('.xml') && file.includes('sitemap'))
  .map((file) => readFileSync(file, 'utf8'))
  .join('\n');
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
  .map((match) => match[1])
  .filter((url) => !url.endsWith('.xml'));

mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, `${JSON.stringify(urls, null, 2)}\n`);
console.log(`Wrote ${urls.length} IndexNow URLs to ${out}`);
