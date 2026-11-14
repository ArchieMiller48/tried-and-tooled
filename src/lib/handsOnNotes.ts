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
  {
    id: 'nixm-2026-11-08',
    date: '2026-11-08',
    tool: 'nixm',
    useCaseSlug: 'write-posts-and-emails',
    anchor: 'introducing our weekend pastry box',
    tested: 'nixm, signed out, with no account, no email, no password, no card and no Google sign-in, on https://nixm.ai/. The Google Analytics cookie was declined. A Hollow Oak Bakery customer-email brief (independent bakery in Bath, founded 2026; sourdough loaves, croissants and cinnamon buns; weekend pastry box £18, collect in store Saturday 9am–11am, no delivery; about 120 words; do not invent awards, a street address, extra prices, a website, other opening hours, delivery or extra products; avoid revolutionary, game-changing, unlock, synergy and world-class) was sent at about 11:11:36 UTC. The first complete reply was at about 11:12:04 UTC, about 28 seconds later. The times are from clock readings and are approximate to a few seconds. The address bar stayed at https://nixm.ai/. No shareable signal URL or NIXM id appeared. No chat credit counter or charge was shown. The draft, 112 words from the subject line through the signoff, excluding the wrapper and the follow-up offer, kept the bakery name, Bath, the three named products, £18, and in-store Saturday 9am–11am collection. No awards, street address, extra prices, website, delivery or extra products. None of the forbidden words. It implied recurring weekly availability with "every saturday" (the brief only gave a Saturday collection window) and added "we bake everything ourselves" (not stated in those words). Extra colour: "beautiful box" and "the hollow oak bakery team". The reply opened with "here\'s the email:" and closed with "clean, honest, no fluff. want a subject line variant or a shorter social caption version?" The email as displayed was: "subject: introducing our weekend pastry box 🥐 hi there, we have something we\'re really excited to share with you. starting this weekend, hollow oak bakery is offering a weekend pastry box — a handpicked selection of our sourdough loaves, croissants and cinnamon buns, brought together in one beautiful box for £18. collection is in store every saturday between 9am and 11am. that\'s it — no fuss, just fresh pastries waiting for you. we bake everything ourselves, with care, right here in bath. this box is our way of making it a little easier to bring something special to your weekend table. we\'d love to see you on saturday. with warmth, the hollow oak bakery team". In the same session a still of a wooden bakery shop sign reading "Hollow Oak Bakery" was sent at about 11:12:33 UTC. About 34 seconds later the page said "signing an account is needed to generate images — sign up and it fires the moment you\'re in." A banner read "[ SIGNUP FREE & LOGIN TO MAKE IMAGES — 20 CREDITS ON US ]" with a SIGN UP TO RENDER button. No image was generated. No video was started. Signup was not completed. Other signup copy seen: "20 free credits to start", "your first video, free with a code", and "image & video generation features." No plan prices or payment details appeared. Vendor pages claim logged-out signals are public by link and dissolve after seven days, and some copy says a still can be made without an account. In this check, signed-out chat worked and the still was gated. A shareable NIXM link was not seen.',
    limits: 'Magic-link signup, the stated 20-credit grant, video, web research and signed-in stills were not tested. Privacy, transcripts and dissolution were not verified. Claude and ChatGPT were not part of this check. The write-posts page\'s standard task (Claude vs ChatGPT, a 500-word post plus a 120-word email in each) has not been run.',
  },
  {
    id: 'dessn-free-2026-11-09',
    date: '2026-11-09',
    tool: 'Dessn',
    useCaseSlug: 'design-an-app-screen',
    anchor: 'Baked this morning on Mill Lane',
    tested: 'Dessn Free, at https://create.dessn.ai/, signed in with a one-time email link. The page showed a "Sign in as…" button and no password. No card was asked for. The code-entry screen was not showing when the browser started, so this check used the link. No starter was offered. Dessn said a blank page was available and that code could be connected later. This check started from a blank page and did not connect a repository. The prompt asked for a mobile order screen for Hollow Oak Bakery, a small UK bakery, with Sourdough loaf £4.50, Cinnamon bun £2.80 and Seeded rye £4.20, quantity steppers, a Saturday 9–11am collection time picker, an order total and a Place order button, in warm brown and cream. It was submitted at 11:13:50.109 UTC on 9 Nov 2026. The first designed frame was visible by 11:15:56 UTC, about 2 minutes 6 seconds later. The time is approximate. The preview was named "Hollow Oak Bakery order screen", and Dessn reported the route as /order. All three names and prices were exact. The steppers were present and working, starting at 1 sourdough loaf, 2 cinnamon buns and 0 seeded rye. The total was £10.10, which matches those quantities. Saturday slots were 9:00, 9:30, 10:00 and 10:30, with 9:30 selected. The colours were warm brown, cream and terracotta. No spelling error was seen. The screen also added copy that was not in the brief, including "Baked this morning on Mill Lane", made-up product descriptions, and "Collect from the counter within 30 minutes of your slot." During generation one step showed "1 action failed" and "This step could not finish". Dessn continued on its own, and the screen then rendered. Afterwards the account showed 20 credits remaining. Dessn said "This first one is on us." The balance before the prompt was not recorded, so the credits used were not confirmed. The pricing page, re-read on 9 Nov 2026, lists Free at $0 per month with 20 monthly credits, Pro at $30 per editor per month with 100 monthly credits, and Enterprise as custom. A Share panel showed Copy link, Invite, access "Anyone in mail", "Editors can edit · viewers only view", and Get preview link, which was disabled until a frame was selected. No export or download control was seen. The share controls do not show that a public preview or a download works on Free.',
    limits: 'Figma and v0 were not part of this check. The code-entry sign-in was not used. A repository was not connected. The starting credit balance was not recorded, so the credit cost was not confirmed. Public preview sharing and download were not shown. The app-screen page\'s standard task (one mobile screen in Figma and in v0) has not been run.',
  },
  {
    id: 'spacefast-2026-11-10',
    date: '2026-11-10',
    tool: 'Spacefast',
    useCaseSlug: 'vibe-code-an-mvp',
    anchor: 'This space is private',
    tested: 'Spacefast, Automattic hosting at https://spacefast.com/, with no account, no card and no login. The space was not claimed. It publishes files that already exist and does not build the app. npm install -g spacefast took about 12 seconds. The installed package was spacefast 0.8.0. sf publish . then published a two-file HTML and CSS page. The first publish started at 11:13:03 GMT and took about 4 seconds (the shell measured 3,971 ms; the CLI reported 2.8 seconds). A redeploy at 11:14:02 GMT changed one line and took about 3.2 seconds (3.23 seconds wall clock; the CLI reported 2.5 seconds). The changed text was live on the first check, 3.85 seconds after that publish started. The page text matched the files: "Hollow Oak Bakery (demo)", Sourdough £4.50, Cinnamon bun £2.20, Seeded rye £3.40, "Saturday order pick-up 9-11am", and the demo footer. The stylesheet was byte-identical. Spacefast also injected a Twitter card and Open Graph title, a data-URI favicon, and a script tag for /__spacefast/sdk.js. HTTPS worked (TLS 1.3, a Let\'s Encrypt certificate for space.fast). The plain live URL, with no session, returned HTTP 403 and the text "This space is private". The same 403 was on the version URL. The page was viewable only through a private link, which redirected once and then returned HTTP 200. The CLI said the anonymous space expires on 11 Nov 2026 at 8:33 PM UTC, about 33 hours after the publish. That expiry was unchanged after the redeploy. Making it public needs a claim with a WordPress.com account. That was not tested. A plain http:// request returned HTTP 500, with an empty body, twice, instead of redirecting to HTTPS. The pricing page, read on 10 Nov 2026, lists Personal at $0 with $1 of usage included every month and 20 Spaces, Go at $5 a month, and Pro at $15 a month.',
    limits: 'Lovable, Bolt.new and Replit were not part of this check. The space was not claimed. Making it public with a WordPress.com account was not tested. A Personal, Go or Pro account was not opened, and the $1 usage allowance was not measured. The vibe-code page\'s standard task (a to-do app with email login, per-user data and a public URL) has not been run.',
  },
  {
    id: 'quillo-2026-11-11',
    date: '2026-11-11',
    tool: 'Quillo',
    useCaseSlug: 'ai-voiceover',
    anchor: 'pronunciation of the time, date, phone number and price is unverified',
    tested: 'Quillo, signed out, with no account, no password, no Google sign-in, no card and no payment, on https://quillo.tr/text-to-speech. It is a free read-aloud for listening to text, not a voiceover export. The text was "Hollow Oak Bakery opens at 7:30 on 14/03. Call 020 7946 0018; sourdough is £4.50." Signed-out read-aloud worked, with no blocking wall. The first Listen opened the reader in 1.105 seconds and did not start playback. The reader\'s Listen was pressed at 10:59:59.412 UTC, and Pause appeared within 0.566 seconds. Sentence 1 was highlighted yellow, and the counter moved from 1/2 to 2/2 by 11:00:09. Audio could not be heard in the test environment, so playback is confirmed from the player UI only. Pronunciation of the time, date, phone number and price is unverified. Signed out, the voices were device voices only: Automatic, Google UK English Female, Google UK English Male and Google US English, with no lock icons. Speeds were 0.8, 0.9, 1, 1.1, 1.25, 1.5, 1.75 and 2x, and 1.25x was selected. The reader said to read with the device voice and to create a free account for natural Quillo voices. The page says device-voice reading has no length limit, and MP3 download is not available on this page. The PDF tools list includes merge, split, edit, rotate, delete pages, page numbers, compress, PDF to and from Word, PDF to and from JPG, PNG, photo, EPUB and TXT to PDF, sign, protect, unlock, watermark, listen and text-to-speech. Merge opened its file picker with no account. No file was uploaded. Listen to PDF opened with no account and advertises 1 minute of natural voice, then device voice, with an account adding 10 minutes. It was not playback-tested. Prices seen on 11 Nov 2026: Free $0 for device voices. A one-time sign-in trial is 10 cloud minutes and 10 AI pages, with no card. Starter is $4.99/mo (30 cloud minutes and 15 AI pages a month) or $34.99/yr (20 minutes and 10 pages a month). Pro is $9.99/mo (90 minutes and 40 pages a month) or $69.99/yr (60 minutes and 25 pages a month). US prices. Purchases are via mobile app stores. Natural voices were not tested.',
    limits: 'Audio could not be heard in the test environment, so pronunciation of the time, date, phone number and price is unverified. An account was not created. Natural Quillo voices and MP3 download were not tested. Listen to PDF was not playback-tested. ElevenLabs and Descript were not part of this check. The voiceover page\'s standard task has not been run.',
  },
  {
    id: 'pixelcut-photoroom-signed-out-2026-11-14',
    date: '2026-11-14',
    tool: 'Pixelcut and Photoroom, signed out',
    useCaseSlug: 'cut-out-a-product-photo',
    anchor: 'Preview resolution 904×1080 Free',
    tested: 'The free web background removers, signed out, in the box browser, on Saturday 14 Nov 2026 at about 10:55 GMT. No account, no email, no password, no card and no social sign-in. Optional cookies were rejected. The same Highgrove Royal Garden honey jar (CC BY 4.0, Wikimedia Commons, resized to 1200×1433; gold lid, translucent amber glass, white label reading HIGHGROVE / Honey / ROYAL GARDEN / 250g e 8.8oz, off-white backdrop, yellow shelf at the bottom) was cut out, put on plain white, and downloaded. Pixelcut, at pixelcut.ai/background-remover, opened the editor at /ai-image-editor?tool=removeBackground. Editor controls appeared 0.85 seconds after upload, and the cut-out was visible within about 1 to 2 seconds. The gold lid was kept whole, the amber glass and honey were kept, the edges were mostly clean with slight softness, and no yellow shelf was left. The label text was intact and readable. A white background worked signed out. The download was a PNG at 904×1080, with no sign-up and no watermark seen. The options shown were "Preview resolution 904×1080 Free" and "Full resolution 1200×1433 Free with sign in". The full-resolution sign-in path was not tested. An upsell, "Get Pro", was on the page. Photoroom\'s free web tool, at photoroom.com/tools/background-remover, returned a result in a few seconds. A capture 1.5 seconds after upload still showed a loader. The exact time was not measured. The gold lid, glass and honey were kept, with slight softness and unevenness at the outer edges, and no yellow shelf was left. The label text was intact and readable. The white swatch worked signed out. The download was a PNG at 1200×1433, the full input resolution, with no sign-up and no watermark seen. The optional "Add background" editor asked to "Log in or sign up in seconds to continue using Photoroom" (Google, Facebook, Apple or email). That was not pursued. The upsells were "Want to land 50% more sales?" and, after download, "Want to increase your conversion rate by 50%?". Both kept the lid, glass, honey and label text, and removed the shelf. Edge quality looked similar to the eye at this size. There was no formal edge-error count. Pixelcut showed a result faster. Photoroom\'s signed-out download was full resolution, and Pixelcut\'s was reduced preview resolution. Neither added a watermark.',
    limits: 'Photoroom Pro, the top pick, was not part of this check. A Pixelcut Free account was not used. The full-resolution sign-in path on Pixelcut was not tested. Photoroom\'s Add background editor asked for a login and was not pursued. There was no formal edge-error count. The product-photo page\'s standard task has not been run. It remains pending for Photoroom Pro.',
  },
];

const COVERED = ['research-and-summarise-sources', 'translate-a-document', 'proofread-and-edit', 'design-logos-and-graphics', 'check-if-an-image-is-ai', 'analyse-a-spreadsheet', 'write-posts-and-emails', 'design-an-app-screen', 'vibe-code-an-mvp', 'ai-voiceover', 'cut-out-a-product-photo'];

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
