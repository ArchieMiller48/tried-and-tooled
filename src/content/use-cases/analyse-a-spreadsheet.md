---
title: "Check a spreadsheet with AI"
job: "Fill or sort a sheet you already have, and see where a web-sourced cell came from before you act on it"
summary: "A filled cell is only useful if you can open the page it came from. Use a sheet that shows that source, and do not pay for a Google AI plan whose card never mentions Sheets."
audience: ["everyday", "students", "small-business"]
category: "Productivity"
topPick:
  name: "Google Sheets on Google AI Pro"
  url: "https://www.google.com/sheets/about/"
  why: "Google's 28 October Workspace update says Fill with Gemini shows the web source inside each generated cell, in Sheets on the web, and that one request can cover up to 3,000 cells. The Google AI plans page lists Gemini in Sheets on Pro. The Plus card lists Gemini in Gmail for proofreading and does not list Sheets."
  pricing:
    summary: "Google AI Pro $19.99/mo (US). The plan card lists Gemini in Docs and Sheets."
    sourceUrl: "https://one.google.com/about/google-ai-plans/"
    checked: 2026-11-02
  affiliateUrl: null
budgetPick:
  name: "Claude (Free)"
  url: "https://claude.com"
  why: "Claude's pricing table lists code execution on Free, the same feature paid plans use to create and edit files. That is enough for a short pass over numbers you paste in, without a second subscription. Free usage is limited, and Pro is the step up when the sheet is a weekly job."
  pricing:
    summary: "Free $0. Code execution is listed on Free. Pro $20/mo, or $17/mo billed annually ($200 up front)."
    sourceUrl: "https://claude.com/pricing"
    checked: 2026-11-02
  affiliateUrl: null
avoid:
  name: "Google AI Plus, for work inside Sheets"
  reason: "Plus is $4.99/mo in the US. Its card lists Gemini in Gmail for proofreading. It does not list Sheets. Pro, at $19.99/mo, is the consumer plan whose card lists Gemini in Docs and Sheets. The Workspace post also omits Plus from the Fill with Gemini citation rollout."
  sourceUrl: "https://one.google.com/about/google-ai-plans/"
alsoConsidered:
  - name: "ChatGPT (Free)"
    url: "https://chatgpt.com"
    note: "The pricing page lists data analysis as limited on Free, and lists Excel, Word, PowerPoint and Google Sheets extensions as limited on Free and Go. Plus and Pro list data analysis as included. The fetched page did not print a dollar price for Plus or Pro."
    pricing:
      summary: "Free: limited data analysis, and limited Excel and Google Sheets extensions. Plus and Pro list data analysis as included."
      sourceUrl: "https://openai.com/chatgpt/pricing/"
      checked: 2026-11-02
  - name: "Datastripes"
    url: "https://datastripes.com"
    note: "Signed out on 7 Nov 2026, with no account and no card, a 20-row CSV reached Story view in about 3.3 seconds. Total units 102 and an unweighted average unit price of 3.55 matched an independent check of the file. This page's job is a sheet that shows the web source on a filled cell. This check did not fill cells from the web. Export and saving need a sign-up. The data table showed a euro sign on unit_price_gbp values, and order_date, order_id and channel were unused in the KPIs and charts."
    pricing:
      summary: "Instant €0, always free, up to 8 charts. Custom dashboard €5/file. Deploy €5. Pro €19/month. Export and saving need a sign-up."
      sourceUrl: "https://datastripes.com"
      checked: 2026-11-07
stack:
  - step: "The question"
    tool: "A sentence you write"
    role: "Name the column you want filled or checked, and what would count as a wrong answer."
  - step: "Web-sourced cells"
    tool: "Google Sheets on Google AI Pro"
    role: "Use Fill with Gemini. Open the source on any cell you might act on. The Workspace post says sources show in Sheets on the web."
  - step: "Your own numbers"
    tool: "Claude Free"
    role: "Paste the rows, or have Claude build a small table with code execution. Read the result against the sheet."
  - step: "Write it up"
    tool: "Your own doc"
    role: "Keep the source link next to any figure that came from the web. If the same notes become a post, use the writing page."
testStatus: "pending"
lastTested: null
lastVerified: 2026-11-07
testNotes: "Hands-on note, 7 Nov 2026: Datastripes only, signed out, with no account, no email, no password, no card and no Google sign-in, on datastripes.com and the guest app at app.datastripes.com/#/guest. A 20-row Hollow Oak Bakery CSV, sample-bakery-orders.csv, with columns order_id, order_date, channel, product, units, unit_price_gbp and city, was uploaded through the file picker. The €5 custom and deploy options were not used. Story view first showed \"20 records / 3 Product\" about 3.3 seconds after upload. The time was script-measured. The header read \"20 rows · not saved\", \"1/2 free projects\", and \"Sign up free to keep it\". The auto dashboard showed three KPIs: Total units 102, Avg unit price 3.55, and Product (distinct) 3, with about 8 charts and filters for Product and City. An independent check of the CSV found total units 102, Croissant 45, Sourdough loaf 33, Cinnamon bun 24, and Bath 60 units (58.8%). The unweighted mean of unit_price_gbp across the 20 rows was 3.55, matching the KPI. The units-weighted average unit price was about 3.13, and that figure was not shown as a KPI. The data table showed a euro sign on unit_price_gbp values, for example €2.20, and column names were de-snake-cased, including \"Unit price gbp\". order_date, order_id and channel were not used in the KPIs or charts, and no time-trend chart was seen. There was no signup wall, no captcha and no card before the results. A cookie banner was the only gate, and it was declined or ignored. PDF and PPTX export were disabled while signed out. The trial line read \"Export disabled\", and the footer read \"Sign up to export\", with a \"Made with Datastripes\" watermark. The page priced Instant at €0, always free, up to 8 charts, Custom dashboard at €5 per file, a deploy link at €5, and Pro at €19 a month. A Black Friday -15% banner was on the page. No discounted price was recorded. The page said rows stay in the browser. That privacy claim was not checked by network inspection. Google Sheets, Claude and ChatGPT were not part of this check. The standard task is still pending: from the same 20-row sheet, fill one column from the web and check one total in each tool, then score how many web-sourced cells link to a page that contains the figure, how many do not, and what the published plan costs for that one sheet."
---

## Who this is for

Students, analysts and small businesses who already have the rows and need a first pass they can check, not a new workbook product.

## How to choose

- **The cells come from the web:** Google AI Pro, then open the source on the cell. The rollout note is [Google's 28 October Workspace post](https://workspaceupdates.googleblog.com/2026/10/fill-with-gemini-now-provides-cell-level-citations-for-web-sources-and-supports-larger-requests.html). It names Business Standard and Plus, Enterprise Standard and Plus, Google AI Pro and Ultra, and listed education add-ons. It does not name Plus or Business Starter.
- **The numbers are already in the sheet and you are not paying yet:** Claude Free, which lists code execution on every individual plan including Free.
- **You only need a chat answer and the file is small:** ChatGPT Free lists data analysis as limited. Move up if the pricing page's "limited" is the thing that stops you.
- **You already have a small CSV and you want a dashboard before you sign up:** Datastripes, on the free signed-out path checked on 7 Nov 2026. It does not fill a cell from the web or show a source on that cell. Export and saving need a sign-up.

Google says, in that Workspace post, that a 95-person internal study found Fill with Gemini up to 55 times faster than manual entry on a 500-cell English task. That figure is the company's own.

The note below is a signed-out check of Datastripes only, dated 7 Nov 2026. Google Sheets, Claude and ChatGPT were not part of it. The standard task on this page has not been run.

## Hands-on test (7 Nov 2026)

This note is for Datastripes, on [datastripes.com](https://datastripes.com). The uploader is the guest app at app.datastripes.com/#/guest. It was signed out. No account, no email, no password, no card and no Google sign-in. Google Sheets, Claude and ChatGPT were not part of it.

The file was a 20-row Hollow Oak Bakery CSV, sample-bakery-orders.csv, with seven columns: order_id, order_date, channel, product, units, unit_price_gbp and city. It went in through the file picker. The €5 custom-dashboard and deploy options were not used.

Story view, reading "20 records / 3 Product", appeared about 3.3 seconds after the upload. The time was script-measured, waiting for that text. The header read "20 rows · not saved", "1/2 free projects", and showed a "Sign up free to keep it" button. The hero on the way in said "No account needed. Your file is read only in this browser and never uploaded. Try it on up to 2 files."

The Story view was an auto-written data-edition page dated 7 Nov 2026, titled "INSIDE UNITS". It showed 20 records and 3 product, and three charts: units against unit price, a units distribution, and units by product. The page claimed a units and unit-price correlation of r = -0.59, one outlier in units, and that Croissant leads with 45. The Croissant total matches the independent count below. This check did not recompute r or the outlier.

The auto dashboard, described as generated from 20 rows by 7 columns, showed three KPIs: Total units 102, Avg unit price 3.55, and Product (distinct) 3. It rendered immediately on switching to that tab. Eight chart or SVG elements were counted. The charts named on the page were units by product, units share by product, average unit price by product, units share by city, price against units, and a units distribution. Filters were Product and City. "What if: Units" sliders were on the page, one per product, and were not used as a separate check. Insights text, key findings and a data table were also on the page.

An independent check of the same CSV found total units 102. By product: Croissant 45, Sourdough loaf 33, Cinnamon bun 24. Bath was 60 units, 58.8% of the total. The unweighted mean of unit_price_gbp across the 20 rows was 3.55, the same figure as the Avg unit price KPI. The units-weighted average unit price was about 3.13. That weighted figure was not shown as a KPI.

The data table showed a euro sign on unit_price_gbp values, for example €2.20. The column is named in GBP. Column names were de-snake-cased, including "Unit price gbp". order_date, order_id and channel were not used in the KPIs or charts. Channel appeared in the table. No time-trend chart was seen.

There was no signup wall before the results, no captcha and no card. A cookie banner was the only gate, and it was declined or ignored. A trial line read "Datastripes Trial — showing 20 of 20 rows. Export disabled." The footer read "Made with Datastripes · Sign up to export". PDF and PPTX export were not available while signed out. A "Made with Datastripes" watermark sat over the dashboard. Keeping the project needs the "Sign up free to keep it" step.

Prices on the page: Instant €0, always free, up to 8 charts; Custom dashboard €5 per file; a deploy link at €5; Pro €19 a month. A Black Friday -15% banner was also on the page. This note repeats the prices as shown. It does not record a discounted figure. The €5 options were not bought.

The page said rows stay in the browser, and that the AI receives only a compressed schema. That privacy claim was not checked by network inspection.

More than two files, Excel, JSON, large files and signed-in features were not tested. The standard task on this page has not been run. That task is the same 20-row sheet, with one column filled from the web and one total checked in each tool, scored on how many web-sourced cells link to a page that contains the figure, how many do not, and what the published plan costs for that one sheet.

## Where this goes next

- The 7 Nov 2026 note is also listed on [Tested by us](../../tested/).
- This job sits with the other small-business jobs on [AI tools for a small business](../../best/ai-tools-for-small-business/).
- If the sources are papers rather than a sheet, start with [Research and summarise sources](../../use-cases/research-and-summarise-sources/).
- Turn a checked table into a post on [Write posts, emails and landing copy](../../use-cases/write-posts-and-emails/).
- If the same numbers have to be presented, see [Make a slide deck](../../use-cases/make-a-slide-deck/).
