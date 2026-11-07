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
  {
    id: 'looka-brand-kit-2026-11-05',
    date: '2026-11-05',
    tool: 'Looka Brand Kit',
    useCaseSlug: 'design-logos-and-graphics',
    anchor: 'Hollow Oak Bakery',
    tested: 'Looka Brand Kit, on the free path only: signed out, with no account, no card and no payment, on the logo maker. The brief was Hollow Oak Bakery, industry Bakery, slogan Baked in Bath since 2026. No email or account was asked for before the logos appeared. The first logo appeared about 15 to 20 seconds after the brief was submitted. The clock readings are about five seconds either way. About 23 logos were on the page, with a Load more logos button. The name was spelled correctly on 6 of the first 6 logos, with no garbled or misspelt text. The colour step offered 9 swatches and no brown or cream. The early symbols were abstract, not bakery symbols. The editor and the mockup previews opened signed out. Every download is paid. The checkout page, in US dollars only, listed Basic Logo Package at $20 one-time for one low-res file and no transparent file, Premium Logo Package at $65 one-time, Brand Kit Subscription at $96 a year billed annually, and Brand Kit Web Subscription at $129 a year billed annually.',
    limits: 'The paid Brand Kit was not bought. No templates were generated from a paid kit, and no file was downloaded. A 1080×1080 social graphic was not made. An edit was not saved, and fonts were not tried. Canva Pro was not part of this check. The standard task on the logo page has not been run.',
  },
  {
    id: 'phrasly-ai-image-detector-2026-11-06',
    date: '2026-11-06',
    tool: 'Phrasly AI Image Detector',
    useCaseSlug: 'check-if-an-image-is-ai',
    anchor: 'SynthID watermark and OpenAI\'s signature',
    tested: 'Phrasly AI Image Detector, signed out, with no account, no password, no card and no Google sign-in. The cookie banner was declined. Two Unsplash camera photos, a mountain landscape JPEG at 800×533 and a dog JPEG at 800×1067, both read Likely real, with the note "Our model found no sign of AI generation." Confidence was 96% and 97%. AI signature was None found, file metadata was No AI tags, and pixel detection was No AI found. No SynthID row was in the final panel. Two AI-generated JPEGs made for the test, a Hollow Oak Bakery wooden sign and a golden retriever with sunglasses on a beach, both 1024×1024, both read AI-generated at 97%, with the note "The file carries a signature saying it was made with AI." AI signature was flagged as AI-made, file metadata was No AI tags, and pixel detection was Not needed and was skipped. No SynthID row. The site ChatGPT example tile, a ramen preview, read AI-generated at 100%, with the note "Made with OpenAI. It carries a SynthID watermark and OpenAI\'s signature." AI signature was OpenAI, file metadata was No AI tags, pixel detection was Not needed, and SynthID was Found · OpenAI. The mountain photo was about 8 to 10 seconds. The other three uploads were under about 12 seconds. The result was already showing when first checked, around 10 to 12 seconds, so the uploads were roughly 8 to 12 seconds. The example was about 2 seconds after the click. The times are approximate. Every result had an Original / Heatmap toggle and a slider. Heatmap was the default view and showed a red tint on the AI images. The result flow said images are never stored, and that the check is free with no sign-up. No paywall appeared.',
    limits: 'The two AI JPEGs were caught by the embedded signature. Pixel detection was skipped, so this is not a signature-free or pixel-only check. A separate signature-free Midjourney-style file was not tested. The Gemini example tile was not run. The Image details expander was not opened. No feedback thumbs were submitted. During the real-photo checks, the page text also contained "Pixel analysis is unavailable right now. Try again" while the visible panel already showed pixel detection "No AI found". That line looked hidden or stale, and no retry was needed. Phrasly\'s page says its model is over 99% accurate in its own testing. That figure is the vendor\'s claim and was not measured here. No other detector was part of this check. The standard task on the image page has not been run.',
  },
  {
    id: 'datastripes-guest-2026-11-07',
    date: '2026-11-07',
    tool: 'Datastripes',
    useCaseSlug: 'analyse-a-spreadsheet',
    anchor: '20 rows · not saved',
    tested: 'Datastripes, signed out, with no account, no email, no password, no card and no Google sign-in, on datastripes.com and the guest app at app.datastripes.com/#/guest. A 20-row Hollow Oak Bakery CSV (order_id, order_date, channel, product, units, unit_price_gbp, city) was uploaded. Story view, "20 records / 3 Product", appeared about 3.3 seconds after upload. The time was script-measured. The header read "20 rows · not saved", "1/2 free projects", and "Sign up free to keep it". The auto dashboard showed three KPIs: Total units 102, Avg unit price 3.55, and Product (distinct) 3, with about 8 charts and filters for Product and City. An independent check of the CSV matched total units 102, Croissant 45, Sourdough loaf 33, Cinnamon bun 24, and Bath 60 units (58.8%). The unweighted mean of unit_price_gbp was 3.55, matching the KPI. The units-weighted average, about 3.13, was not shown as a KPI. The data table showed a euro sign on unit_price_gbp values. order_date, order_id and channel were unused in the KPIs and charts, and there was no time-trend chart. Column names were de-snake-cased. There was no signup wall and no card before the results. PDF and PPTX export were disabled ("Export disabled" and "Sign up to export"), with a "Made with Datastripes" watermark. The page priced Instant at €0, up to 8 charts, Custom at €5 per file, deploy at €5, and Pro at €19 a month. A privacy line said rows stay in the browser. That claim was not checked by network inspection.',
    limits: 'Google Sheets, Claude and ChatGPT were not part of this check. The €5 custom and deploy options were not used. Signed-in saving and export were not tested. More than 2 files, Excel, JSON and large files were not tested. The privacy claim was not network-verified. The standard task on the spreadsheet page has not been run.',
  },
];

const COVERED = ['research-and-summarise-sources', 'translate-a-document', 'proofread-and-edit', 'design-logos-and-graphics', 'check-if-an-image-is-ai', 'analyse-a-spreadsheet'];

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
