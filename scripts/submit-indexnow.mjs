/**
 * POST sitemap URLs to IndexNow after a GitHub Pages deploy.
 * The key file is public (IndexNow fetches it). This script always exits 0.
 */
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const HOST = 'archiemiller48.github.io';
const BASE = '/tried-and-tooled';
const ENDPOINT = 'https://api.indexnow.org/indexnow';

function finish(message) {
  console.log(message);
  process.exit(0);
}

try {
  const urlsPath = process.argv[2] || 'indexnow/urls.json';
  if (!existsSync(urlsPath)) finish(`IndexNow skipped: missing ${urlsPath}`);
  const urlList = JSON.parse(readFileSync(urlsPath, 'utf8'));
  if (!Array.isArray(urlList) || urlList.length === 0) finish('IndexNow skipped: no URLs');
  for (const url of urlList) {
    if (typeof url !== 'string' || !url.startsWith(`https://${HOST}${BASE}`)) {
      finish(`IndexNow skipped: unexpected URL ${url}`);
    }
  }

  const keyName = readdirSync('public').find((name) => /^[a-f0-9]{8,128}\.txt$/.test(name));
  if (!keyName) finish('IndexNow skipped: no key file in public/');
  const key = keyName.replace(/\.txt$/, '');
  const keyBody = readFileSync(join('public', keyName), 'utf8');
  if (keyBody !== key) finish('IndexNow skipped: key file contents do not match its name');

  const body = {
    host: HOST,
    key,
    keyLocation: `https://${HOST}${BASE}/${keyName}`,
    urlList,
  };

  if (process.env.INDEXNOW_DRY_RUN === '1') {
    finish(`IndexNow dry run: ${urlList.length} URLs, keyLocation ${body.keyLocation}`);
  }

  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(body),
  });
  const text = await response.text();
  finish(`IndexNow responded ${response.status} for ${urlList.length} URLs. ${text.slice(0, 300)}`);
} catch (error) {
  finish(`IndexNow skipped: ${error instanceof Error ? error.message : String(error)}`);
}
