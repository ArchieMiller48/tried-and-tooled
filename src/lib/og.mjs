import { mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { Resvg } from '@resvg/resvg-js';

// Inter is shipped under the SIL Open Font License. See assets/fonts/OFL.txt.
const WIDTH = 1200;
const HEIGHT = 630;
const FONT_DIR = join(process.cwd(), 'assets/fonts');
const OUT = join(process.cwd(), 'public/og');

const KINDS = [
  { folder: 'use-cases', kicker: 'USE CASE', footer: 'Top pick  ·  budget pick  ·  one to avoid' },
  { folder: 'compare', kicker: 'COMPARE', footer: 'Head-to-head  ·  sourced prices' },
  { folder: 'best', kicker: 'BEST OF', footer: 'Shortlist  ·  sourced prices' },
];

function esc(value) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function textWidth(text, size) {
  let width = 0;
  for (const char of text) {
    if (char === ' ') width += size * 0.32;
    else if ('iljt.,:;\'|'.includes(char)) width += size * 0.28;
    else if ('mwMW@'.includes(char)) width += size * 0.86;
    else if (char === char.toUpperCase() && /[A-Z]/.test(char)) width += size * 0.68;
    else width += size * 0.56;
  }
  return width;
}

function wrap(text, size, maxWidth) {
  const words = text.split(/\s+/);
  const lines = [];
  let line = '';
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (line && textWidth(next, size) > maxWidth) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function titleLayout(title) {
  const maxWidth = 1040;
  for (const size of [64, 56, 48, 42, 36]) {
    const lines = wrap(title, size, maxWidth);
    if (lines.length <= 4 && lines.every((line) => textWidth(line, size) <= maxWidth)) {
      return { size, lines, lineHeight: Math.round(size * 1.18) };
    }
  }
  const size = 32;
  return { size, lines: wrap(title, size, maxWidth).slice(0, 5), lineHeight: Math.round(size * 1.18) };
}

function readTitle(file) {
  const text = readFileSync(file, 'utf8');
  const match = text.match(/^title:\s*(.+)\s*$/m);
  if (!match) return '';
  return match[1].trim().replace(/^["']|["']$/g, '');
}

function card({ kicker, title, footer }) {
  const { size, lines, lineHeight } = titleLayout(title);
  const titleTop = 300;
  const titleSpans = lines
    .map((line, index) => {
      const y = titleTop + index * lineHeight;
      return `<text x="72" y="${y}" fill="#f8fafc" font-family="Inter" font-weight="600" font-size="${size}">${esc(line)}</text>`;
    })
    .join('\n  ');
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${WIDTH}" height="${HEIGHT}" fill="#0f172a"/>
  <rect width="16" height="${HEIGHT}" fill="#a3e635"/>
  <path d="M78 118 l22 22 46-48" fill="none" stroke="#a3e635" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/>
  <text x="176" y="124" fill="#f8fafc" font-family="Inter" font-weight="600" font-size="36">Tried &amp; Tooled</text>
  <text x="72" y="210" fill="#a3e635" font-family="Inter" font-weight="600" font-size="22">${esc(kicker)}</text>
  ${titleSpans}
  <text x="72" y="578" fill="#cbd5e1" font-family="Inter" font-size="24">${esc(footer)}</text>
</svg>`;
}

export function ogJobs() {
  const jobs = [];
  for (const kind of KINDS) {
    const dir = join(process.cwd(), 'src/content', kind.folder);
    let names = [];
    try {
      names = readdirSync(dir).filter((name) => name.endsWith('.md'));
    } catch {
      names = [];
    }
    for (const name of names) {
      const id = name.replace(/\.md$/, '');
      const title = readTitle(join(dir, name));
      if (!title) throw new Error(`No title for ${kind.folder}/${name}`);
      jobs.push({ folder: kind.folder, id, svg: card({ kicker: kind.kicker, title, footer: kind.footer }) });
    }
  }
  return jobs;
}

export function generateOgImages() {
  const jobs = ogJobs();
  const expected = new Set(jobs.map((job) => `${job.folder}/${job.id}.png`));
  mkdirSync(OUT, { recursive: true });
  for (const kind of KINDS) mkdirSync(join(OUT, kind.folder), { recursive: true });

  for (const kind of KINDS) {
    const dir = join(OUT, kind.folder);
    for (const name of readdirSync(dir)) {
      if (!expected.has(`${kind.folder}/${name}`)) rmSync(join(dir, name));
    }
  }

  const font = {
    fontFiles: [join(FONT_DIR, 'Inter-Regular.ttf'), join(FONT_DIR, 'Inter-SemiBold.ttf')],
    loadSystemFonts: false,
    defaultFontFamily: 'Inter',
    sansSerifFamily: 'Inter',
  };
  for (const job of jobs) {
    const png = new Resvg(job.svg, {
      font,
      fitTo: { mode: 'width', value: WIDTH },
      background: '#0f172a',
    }).render().asPng();
    writeFileSync(join(OUT, job.folder, `${job.id}.png`), png);
  }
  return jobs.length;
}
