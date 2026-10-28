import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { test } from 'node:test';
import { guideDocumentTitle } from './guideMeta.ts';

function titleOf(folder: string, name: string): string {
  const text = readFileSync(join('src/content', folder, name), 'utf8');
  const match = text.match(/^title:\s*(.+)\s*$/m);
  assert.ok(match, name);
  return match[1].trim().replace(/^["']|["']$/g, '');
}

test('comparison and shortlist titles stay keyworded, dated and inside the snippet limit', () => {
  const seen = new Set<string>();
  for (const folder of ['compare', 'best']) {
    const names = readdirSync(join('src/content', folder)).filter((name) => name.endsWith('.md'));
    assert.ok(names.length >= 1, folder);
    for (const name of names) {
      const raw = titleOf(folder, name);
      const title = guideDocumentTitle(raw, 2026);
      const full = `${title} · Tried & Tooled`;
      assert.ok(full.length <= 65, `${name} is ${full.length}: ${full}`);
      assert.match(title, /2026/);
      assert.ok(!seen.has(full), full);
      seen.add(full);
    }
  }
});
