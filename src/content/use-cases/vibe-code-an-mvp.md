---
title: "Vibe-code an MVP web app"
job: "Go from an idea to a deployed web app with auth and a database, mostly by prompting"
summary: "The fastest way for a non-specialist or a solo builder to ship a working MVP with login, data and a live URL, without getting stuck in a tool you can't leave."
audience: ["coders", "founders", "students", "small-business"]
category: "Build & code"
topPick:
  name: "Lovable"
  url: "https://lovable.dev"
  why: "Chat-to-app builder with hosting and a backend included. Paid plans unlock code editing, code download and custom domains, and Git sync is on every plan, so you aren't locked in. Since 14 October 2026 it can also turn a goal like 'my first 100 signups' into a growth plan, with SEO fixes and Google or Meta ad campaigns you approve before any spend."
  pricing:
    summary: "Free: 5 build credits/day (max 30/month). Pro from $25/mo (100 credits) or $21/mo billed annually."
    sourceUrl: "https://docs.lovable.dev/introduction/subscription-plans"
    checked: 2026-11-09
  affiliateUrl: null
budgetPick:
  name: "Bolt.new"
  url: "https://bolt.new"
  why: "Generous free tier for prototyping in the browser (1M tokens/month) with hosting and databases included. Upgrade only once you need a custom domain or want the branding removed."
  pricing:
    summary: "Free: 300K tokens/day, 1M/month, Bolt branding. Pro $25/month billed monthly, from 10M tokens, custom domain, branding removed. A Yearly control says save up to 28%. No yearly dollar amount and no tax asterisk were in the HTML."
    sourceUrl: "https://bolt.new/pricing"
    checked: 2026-11-09
  affiliateUrl: null
avoid:
  name: "Lovable Free plan, for anything you plan to ship"
  reason: "On Free you can't edit or download code, use a custom domain, or remove the 'Edit with Lovable' badge, and build credits stop at 30 a month. It's fine for testing an idea, but don't launch on it."
  sourceUrl: "https://docs.lovable.dev/introduction/subscription-plans"
stack:
  - step: "Prototype"
    tool: "Lovable (or Bolt.new on a budget)"
    role: "Prompt the first version: pages, auth, data model."
  - step: "Own the code"
    tool: "GitHub (Git sync)"
    role: "Sync the project to a repo from day one so you can leave the builder whenever you want."
  - step: "Refine"
    tool: "An AI code editor such as Cursor"
    role: "Make precise edits and refactors the chat builder struggles with."
  - step: "Review before shipping"
    tool: "CodeRabbit or Greptile"
    role: "An automated PR review catches security and logic slips in AI-written code. See our AI code review page."
alsoConsidered:
  - name: "Replit"
    url: "https://replit.com"
    note: "A strong all-in-one agent and IDE; better if you want a full dev environment rather than a chat-first builder. Dollar prices were read on replit.com/pricing. The starter docs, re-read the same day, still say the one published app goes down after 30 days: https://docs.replit.com/billing/plans/starter-plan"
    pricing:
      summary: "Starter free, at no cost, with one published app that goes down after 30 days. Core $18/mo billed annually ($20 struck through). Pro $90/mo billed annually ($100 struck through)."
      sourceUrl: "https://replit.com/pricing"
      checked: 2026-11-09
  - name: "Cursor"
    url: "https://cursor.com"
    note: "An editor, not an app builder: best for the refine step once you have code. Plans are now sold through X subscription tiers."
    pricing:
      summary: "Free (limited); Plus $8/mo (Grok models only); Premium $30/mo; Super $100/mo; Ultra $200/mo. Third-party models billed at API list price."
      sourceUrl: "https://cursor.com/pricing"
      checked: 2026-11-09
  - name: "Spacefast"
    url: "https://spacefast.com/"
    note: "Hosting only. It publishes files you already have, and it does not build the app. On 10 Nov 2026, with no account, npm install -g spacefast and then sf publish . published a two-file HTML page in about 4 seconds. A one-line redeploy took about 3.2 seconds, and the changed text was live on the first check. The bakery text matched exactly. Spacefast also added social meta, a favicon and a script tag. HTTPS worked. The plain URL returned HTTP 403, \"This space is private\". The page was viewable only through a private link, and the anonymous space was set to expire in about 33 hours. Making it public needs a claim with a WordPress.com account, which was not tested. A plain http:// request returned HTTP 500 instead of redirecting. This is not the standard task. The full note is on the Tested by us page."
    pricing:
      summary: "Personal $0, $1 of usage included every month, 20 Spaces. Go $5/month. Pro $15/month."
      sourceUrl: "https://spacefast.com/pricing/"
      checked: 2026-11-10
testStatus: "pending"
lastTested: null
lastVerified: 2026-11-09
testNotes: "Hands-on note, 10 Nov 2026: Spacefast only, an anonymous publish of an existing HTML page. It does not build the app, and it is not the standard task. Pending hands-on test. Planned standard task: 'Build a to-do app with email login, per-user data and a public URL', run on Lovable, Bolt.new and Replit. We'll record time to first working deploy, credits or tokens used, the number of fix-up prompts, and whether the exported code runs locally. On 8 Nov 2026 Bolt.new, the budget pick, was opened signed out at https://bolt.new/. The prompt box was available and this prompt was submitted at 11:09:09.983 UTC: \"Build a simple to-do web app. Requirements: email login, each user only sees their own to-dos, add/complete/delete tasks, and a public URL I can open. Use a clean, minimal UI. Do not add extra features.\" Bolt immediately opened a Create account dialog (Sign up with Google, GitHub, email and password, or SSO). The email form required Email, Username and Password and showed a Cloudflare \"Verify you are human\" checkbox. No preview, Deploy button or public URL appeared. Signup was not completed."
---

## Who this is for

Solo founders, indie hackers and creators who want a real, working product (login, database, live URL) and are happy to prompt their way there.

## How to choose

- **You want to ship this week:** start in Lovable or Bolt.new, and connect GitHub straight away.
- **You already write some code:** prototype in a builder, then move to an AI editor for the details.
- **You're on £0:** Bolt.new's free tier gives the most room to prototype. Upgrade only when you need a custom domain.
- **You want the head-to-head:** [Lovable vs Bolt.new](../../compare/lovable-vs-bolt/) lines up free limits, the first paid plan and getting the code out.
- **You want the wider shortlist:** [AI app builders for non-coders](../../best/ai-app-builders-for-non-coders/) covers Lovable, Bolt.new, Replit and where Cursor fits.
- **You already have the files and only need a short private preview:** Spacefast, checked on 10 Nov 2026. Anonymous publish of an existing page took about 4 seconds. The plain URL was private, and the space was set to expire in about 33 hours. It does not build the app.

The note below is a check of Spacefast only, dated 10 Nov 2026. Lovable, Bolt.new and Replit were not part of it. The standard task on this page has not been run.

## Hands-on test (10 Nov 2026)

This note is for Spacefast, Automattic's hosting, at [spacefast.com](https://spacefast.com/). It publishes files that already exist. It does not build the app. No account, no card and no login were used. The space was not claimed. Lovable, Bolt.new and Replit were not part of it.

`npm install -g spacefast` took about 12 seconds. The installed package was spacefast 0.8.0. From the site folder, `sf publish .` then published a two-file HTML and CSS page. The first publish started at 11:13:03 GMT and took about 4 seconds (the shell measured 3,971 ms; the CLI reported 2.8 seconds). A redeploy at 11:14:02 GMT changed one line of the intro and took about 3.2 seconds (3.23 seconds wall clock; the CLI reported 2.5 seconds). One file was uploaded. The changed text was live on the first check, 3.85 seconds after that publish started.

The page text matched the files: the heading "Hollow Oak Bakery (demo)", Sourdough £4.50, Cinnamon bun £2.20, Seeded rye £3.40, "Saturday order pick-up 9-11am", and the footer "Demo page for a Tried & Tooled hands-on test, not a real business." The stylesheet was byte-identical. The HTML was otherwise unchanged except that Spacefast injected a Twitter card and Open Graph title, a data-URI favicon, and a script tag for `/__spacefast/sdk.js`.

HTTPS worked: TLS 1.3, and a Let's Encrypt certificate for space.fast. The plain live URL, with no session, returned HTTP 403 and the text "This space is private". The same 403 was on the version URL. An anonymous publish is a private preview. The page was viewable only through the private link, which redirected once and then returned HTTP 200. The CLI said the anonymous space expires on 11 Nov 2026 at 8:33 PM UTC, about 33 hours after the publish (the docs say 33 hours and 20 minutes). That expiry was unchanged after the redeploy. Making the space public needs a claim with a WordPress.com account. That was not tested. A plain http:// request to the same host returned HTTP 500, with an empty body, twice, instead of redirecting to HTTPS.

The pricing page, read on 10 Nov 2026, lists Personal at $0 with $1 of usage included every month and 20 Spaces, Go at $5 a month, and Pro at $15 a month. Those figures are the vendor's. This check did not open a Personal, Go or Pro account, and it did not measure the $1 allowance.

Lovable, Bolt.new and Replit were not part of this check. The standard task on this page has not been run. That task is a to-do app with email login, per-user data and a public URL, run on Lovable, Bolt.new and Replit.

## Where this goes next

- The 10 Nov 2026 note is also listed on [Tested by us](../../tested/).
