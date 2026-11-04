import type { CollectionEntry } from 'astro:content';

export interface HandsOnNote {
  id: string;
  date: string;
  tool: string;
  useCaseSlug: string;
  /** A phrase that must already appear in that use-case page. */
  anchor: string;
  tested: string;
  limits: string;
}

/**
 * The only hands-on notes in the repo, copied from the use-case pages.
 * Adding a note here without the source page, or the other way round, fails the build.
 */
export const handsOnNotes: HandsOnNote[] = [
  {
    id: 'consensus-free-2026-10-26',
    date: '2026-10-26',
    tool: 'Consensus Free',
    useCaseSlug: 'research-and-summarise-sources',
    anchor: 'Consensus Meter',
    tested: 'A free Consensus account gave 10 Pro searches a month. A test query returned a cited answer and a Consensus Meter in about 25 seconds, and a full report in about 60 seconds.',
    limits: 'Elicit was not part of this check. The standard task on the research page has not been run.',
  },
  {
    id: 'perplexity-free-2026-11-02',
    date: '2026-11-02',
    tool: 'Perplexity Free',
    useCaseSlug: 'research-and-summarise-sources',
    anchor: 'creatine improves cognition in healthy adults',
    tested: 'Perplexity Free, signed in with an email code and no card, was asked whether creatine improves cognition in healthy adults. The Search answer finished within about 9 seconds, with 10 journal, PMC or regulator sources (no news or blogs) and an inline citation on each claim. Xu et al. 2024 (Frontiers in Nutrition) and an EFSA health-claim page supported the claims that were opened. Prokopidis 2023 was not checked. A follow-up on which studies were randomised controlled trials finished in about 10 seconds (the page said Finished 3s), named two primary RCTs, added a small-sample caveat, and was not checked against the sources. Every model in the picker was locked. Deep Research and Pro Search were not shown.',
    limits: 'Elicit and Gemini Notebook were not part of this check. The standard task on the research page has not been run.',
  },
  {
    id: 'deepl-free-2026-11-03',
    date: '2026-11-03',
    tool: 'DeepL Free',
    useCaseSlug: 'translate-a-document',
    anchor: '319-character',
    tested: 'DeepL Free, signed out and with no account, translated a 319-character English customer email into French. The source was detected as English. The French appeared on its own within a few seconds and was not timed. The facts in the email were kept: two working days, 14 days, a photo, a replacement or a full refund, and Monday to Friday 9h–17h. File translation was not tested.',
    limits: 'DeepL Pro Individual was not part of this check. Longer text was not tested. The standard task on the translate page has not been run.',
  },
  {
    id: 'languagetool-basic-2026-11-04',
    date: '2026-11-04',
    tool: 'LanguageTool Basic',
    useCaseSlug: 'proofread-and-edit',
    anchor: '8 planted errors',
    tested: 'LanguageTool Basic, signed out with no account, no card and no Google sign-in, checked a short business email on the homepage editor, default English. The text was typed, not pasted: 8 planted errors, plus a lowercase friday. All 8 planted errors were caught at least partly. In "Me and the team has", Me was flagged with a suggestion of I and a note to put yourself second. The has agreement error in "Me and the team has" was missed. The editor did not suggest "The team and I have". friday was flagged as a spelling mistake, with Friday as the first suggestion. One arguable false positive: a suggested comma before and, joining two independent clauses. The full list, 10 flags, appeared within a few seconds. The exact time was not measured. The counter read Characters 246/2000. The page showed Paraphrasing 0/3. No Premium locks were seen in this check.',
    limits: 'Grammarly Pro and Grammarly Free were not part of this check. The paraphrase tab was not used. Picky Mode was not opened. A longer document was not tested. The standard task on the proofread page has not been run.',
  },
];

const COVERED = ['research-and-summarise-sources', 'translate-a-document', 'proofread-and-edit'];

function pageText(entry: CollectionEntry<'use-cases'>): string {
  return `${entry.data.testNotes}\n${entry.body ?? ''}`;
}

/** Fail the build if this list and the use-case pages disagree. */
export function assertHandsOnCoverage(entries: CollectionEntry<'use-cases'>[]): void {
  const withNotes = entries
    .filter((entry) => {
      const text = pageText(entry);
      return /Hands-on note|Hands-on test \(/.test(text) || Boolean(entry.data.topPick.handsOn) || Boolean(entry.data.budgetPick.handsOn);
    })
    .map((entry) => entry.id)
    .sort();
  const expected = [...COVERED].sort();
  if (withNotes.join('|') !== expected.join('|')) {
    throw new Error(`Hands-on coverage changed. Found: ${withNotes.join(', ') || '(none)'}. Expected: ${expected.join(', ')}.`);
  }
  for (const note of handsOnNotes) {
    const entry = entries.find((item) => item.id === note.useCaseSlug);
    if (!entry) throw new Error(`Hands-on note ${note.id} points at a missing use case.`);
    if (!pageText(entry).includes(note.anchor)) {
      throw new Error(`Hands-on note ${note.id} is not in ${note.useCaseSlug}.`);
    }
  }
}
