import assert from 'node:assert/strict';
import { test } from 'node:test';
import { contentLastmods, dateInfo, normalisePath } from './contentDates.mjs';

test('content dates cover published guides and fall back only where a page has no date of its own', () => {
  const dates = contentLastmods();
  assert.equal(normalisePath('https://archiemiller48.github.io/tried-and-tooled/compare/lovable-vs-bolt/'), '/tried-and-tooled/compare/lovable-vs-bolt/');
  assert.equal(dates.get('/tried-and-tooled/use-cases/research-and-summarise-sources/'), '2026-10-26');
  assert.equal(dates.get('/tried-and-tooled/compare/coderabbit-vs-greptile/'), '2026-10-27');
  assert.equal(dates.get('/tried-and-tooled/best/ai-app-builders-for-non-coders/'), '2026-10-26');
  assert.equal(dates.get('/tried-and-tooled/newsletter/issue-1/'), '2026-10-19');
  assert.ok(dates.get('/tried-and-tooled/'));
  assert.equal(dates.get('/tried-and-tooled/compare/'), '2026-10-27');
  const about = dateInfo('/about/');
  assert.equal(about.aggregated, true);
  assert.ok(about.date);
  const compare = dateInfo('/compare/lovable-vs-bolt/');
  assert.equal(compare.aggregated, false);
  assert.equal(compare.date, '2026-10-26');
});
