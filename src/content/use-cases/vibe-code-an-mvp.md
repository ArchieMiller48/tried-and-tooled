---
title: "Vibe-code an MVP web app"
job: "Go from an idea to a deployed web app with auth and a database, mostly by prompting"
summary: "The fastest way for a non-specialist or a solo builder to ship a working MVP with login, data and a live URL, without getting stuck in a tool you can't leave."
audience: ["vibe-coders", "builders"]
category: "Build"
topPick:
  name: "Lovable"
  url: "https://lovable.dev"
  why: "Chat-to-app builder with hosting and a backend included. Paid plans unlock code editing, code download and custom domains, and Git sync is on every plan, so you aren't locked in. Since 14 October 2026 it can also turn a goal like 'my first 100 signups' into a growth plan, with SEO fixes and Google or Meta ad campaigns you approve before any spend."
  pricing:
    summary: "Free: 5 build credits/day (max 30/month). Pro from $25/mo (100 credits) or $21/mo billed annually."
    sourceUrl: "https://docs.lovable.dev/introduction/subscription-plans"
    checked: 2026-10-26
  affiliateUrl: null
budgetPick:
  name: "Bolt.new"
  url: "https://bolt.new"
  why: "Generous free tier for prototyping in the browser (1M tokens/month) with hosting and databases included. Upgrade only once you need a custom domain or want the branding removed."
  pricing:
    summary: "Free: 300K tokens/day, 1M/month, Bolt branding. Pro $18/month billed annually ($216/year; $300/year struck through on the card), from 10M tokens, custom domain."
    sourceUrl: "https://bolt.new/pricing"
    checked: 2026-10-26
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
    note: "A strong all-in-one agent and IDE; better if you want a full dev environment rather than a chat-first builder."
    pricing:
      summary: "Starter free, at no cost, with one published app that goes down after 30 days. Core $18/mo billed annually ($20 struck through). Pro $90/mo billed annually ($100 struck through)."
      sourceUrl: "https://docs.replit.com/billing/plans"
      checked: 2026-10-26
  - name: "Cursor"
    url: "https://cursor.com"
    note: "An editor, not an app builder: best for the refine step once you have code. Plans are now sold through X subscription tiers."
    pricing:
      summary: "Free (limited); Plus $8/mo (Grok models only); Premium $30/mo; Super $100/mo; Ultra $200/mo. Third-party models billed at API list price."
      sourceUrl: "https://cursor.com/pricing"
      checked: 2026-10-26
testStatus: "pending"
lastTested: null
lastVerified: 2026-10-26
testNotes: "Pending hands-on test. Planned standard task: 'Build a to-do app with email login, per-user data and a public URL', run on Lovable, Bolt.new and Replit. We'll record time to first working deploy, credits or tokens used, the number of fix-up prompts, and whether the exported code runs locally."
---

## Who this is for

Solo founders, indie hackers and creators who want a real, working product (login, database, live URL) and are happy to prompt their way there.

## How to choose

- **You want to ship this week:** start in Lovable or Bolt.new, and connect GitHub straight away.
- **You already write some code:** prototype in a builder, then move to an AI editor for the details.
- **You're on £0:** Bolt.new's free tier gives the most room to prototype. Upgrade only when you need a custom domain.
- **You want the head-to-head:** [Lovable vs Bolt.new](../../compare/lovable-vs-bolt/) lines up free limits, the first paid plan and getting the code out.
- **You want the wider shortlist:** [AI app builders for non-coders](../../best/ai-app-builders-for-non-coders/) covers Lovable, Bolt.new, Replit and where Cursor fits.
