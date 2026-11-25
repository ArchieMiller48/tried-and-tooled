---
title: "Lovable vs Cursor for an MVP (2026)"
summary: "Lovable is the chat builder for a first MVP. Cursor is the editor once you have code. Both are pending a hands-on test. Prices checked 24 Nov 2026."
targetQuery: "lovable vs cursor"
secondaryQueries:
  - "cursor vs lovable"
  - "lovable or cursor for an mvp"
parent: "vibe-code-an-mvp"
testStatus: "pending"
lastTested: null
lastVerified: 2026-11-24
tools:
  - name: "Lovable"
    url: "https://lovable.dev"
    blurb: "A chat-to-app builder. The parent use case uses it to prompt the first version. On 24 Nov 2026 the plan table puts Git sync on every plan, including Free, and puts code editing, code download, custom domains and badge removal on Pro."
    pricing:
      summary: "Free $0: 5 build credits a day, up to 30 a month. Pro from $25/month for 100 credits, or $250/year ($21/month)."
      sourceUrl: "https://docs.lovable.dev/introduction/subscription-plans"
      checked: 2026-11-24
    sources:
      - label: "Free grant and plan names"
        url: "https://lovable.dev/pricing"
      - label: "Pro tiers and what Free excludes"
        url: "https://docs.lovable.dev/introduction/subscription-plans"
    affiliateUrl: null
  - name: "Cursor"
    url: "https://cursor.com"
    blurb: "An editor, not an app builder. The parent use case names it for precise edits after a builder. On 24 Nov 2026 new customers buy The X Subscription. Free is limited. Plus is Grok models only."
    pricing:
      summary: "Free $0, limited Agent and Chat. Plus $8/month. Premium $30/month. Super $100/month. Ultra $200/month."
      sourceUrl: "https://cursor.com/pricing"
      checked: 2026-11-24
    sources:
      - label: "Current plans"
        url: "https://cursor.com/pricing"
      - label: "Legacy Pro and Pro+"
        url: "https://cursor.com/docs/account/pricing/legacy-cursor-plans"
    affiliateUrl: null
rows:
  - label: "Role on an MVP"
    cells:
      - "Chat-to-app builder. The pricing FAQ says a credit pays for building, Cloud hosting and AI features. The parent page uses Lovable for the first version, with hosting and a backend."
      - "Editor and agent subscription. The pricing page calls the current offer The X Subscription, for Grok, Cursor and X. The parent page uses Cursor for precise edits after a builder, not as the chat-to-app tool."
    sources:
      - label: "Lovable pricing FAQ"
        url: "https://lovable.dev/pricing"
      - label: "Cursor pricing"
        url: "https://cursor.com/pricing"
      - label: "Parent use case"
        url: "https://archiemiller48.github.io/tried-and-tooled/use-cases/vibe-code-an-mvp/"
  - label: "Free plan"
    cells:
      - "$0. 5 build credits a day, up to 30 a month, plus 20 Cloud credits and 4 AI credits a month. No credit card. Git sync is included. Code editing, a zip download, a custom domain and badge removal are not."
      - "$0. Limited Agent requests and limited Chat requests. No request count is printed. Third-party models, Cloud agents, Origin and Bugbot are not on Free."
    sources:
      - label: "Lovable pricing"
        url: "https://lovable.dev/pricing"
      - label: "Lovable plans"
        url: "https://docs.lovable.dev/introduction/subscription-plans"
      - label: "Cursor pricing"
        url: "https://cursor.com/pricing"
  - label: "First paid step"
    cells:
      - "Pro starts at 100 credits for $25 a month, or $250 a year ($21 a month). Code editing, download, custom domains and badge removal start on Pro. Business is $50 a month for the same 100 credits."
      - "Plus is $8 a month. The pricing page says only Grok models are on it. Third-party models start on Premium at $30 a month and are billed at API list price, on top of the subscription."
    sources:
      - label: "Lovable plans"
        url: "https://docs.lovable.dev/introduction/subscription-plans"
      - label: "Cursor pricing"
        url: "https://cursor.com/pricing"
  - label: "Code you can edit"
    cells:
      - "Git sync to GitHub, GitLab or Bitbucket is on every plan, including Free. Editing the code inside Lovable, and downloading a zip, start on Pro. The parent page says not to launch on Free."
      - "Cursor is the editor. The parent page puts it after the builder, once a repo exists. Cloud agents and code hosting via Origin start on Premium, not on Free or Plus."
    sources:
      - label: "Lovable plans"
        url: "https://docs.lovable.dev/introduction/subscription-plans"
      - label: "Cursor pricing"
        url: "https://cursor.com/pricing"
      - label: "Parent use case"
        url: "https://archiemiller48.github.io/tried-and-tooled/use-cases/vibe-code-an-mvp/"
  - label: "Hands-on test"
    cells:
      - "Pending. This directory has no hands-on note for Lovable. The 10 Nov 2026 note on the parent page is a Spacefast publish only, and that note says Lovable was not part of it."
      - "Pending. This directory has no hands-on note for Cursor. The parent page's recorded check on 10 Nov 2026 was Spacefast only. The standard task on that page has not been run."
    sources:
      - label: "Tested by us"
        url: "https://archiemiller48.github.io/tried-and-tooled/tested/"
      - label: "Parent use case"
        url: "https://archiemiller48.github.io/tried-and-tooled/use-cases/vibe-code-an-mvp/"
verdicts:
  - situation: "You are prompting a first web app and you do not want to start in an editor."
    guidance: "Use Lovable, which is the top pick on the parent page. Cursor is the refine step after you have code, not the tool that builds the first app. This page does not change that. Both are pending a hands-on test."
  - situation: "You already have a repo and you want precise edits."
    guidance: "Use Cursor, which is the editor the parent page names for that step. Plus is $8 a month and the pricing page says only Grok models are on it. Third-party models start on Premium at $30 a month, at API list price. Pending a hands-on test."
  - situation: "You are spending $0 and you are not launching yet."
    guidance: "Lovable Free is $0, for trying an idea. The parent page says not to launch on it: Free cannot edit or download code, use a custom domain, or remove the badge, and build credits stop at 30 a month. Cursor Free is $0 with limited Agent and Chat and no published request count. Neither free plan has a hands-on note."
  - situation: "You already pay for Cursor Pro or Pro+."
    guidance: "Those names are legacy Cursor plans, not Lovable plans. Cursor Pro is $20 a month and Pro+ is $60 a month, for existing subscribers, and they are not sold to new customers. Lovable Pro is a different product: $25 a month for 100 credits, or $250 a year. The names match. The prices do not."
faqs:
  - question: "Is Lovable or Cursor better for an MVP?"
    answer: "For the first version, the parent page picks Lovable, a chat builder with hosting. Cursor is the editor for precise changes after the code is in a repo. This page is not a test result, and it does not change those picks. Both tools are pending a hands-on test."
  - question: "Is Lovable free?"
    answer: "Yes. On 24 Nov 2026 Lovable's pricing page lists Free at $0, with no credit card. The FAQ caps build credits at 5 a day and 30 a month, and adds 20 Cloud credits and 4 AI credits a month. Git sync is included. Code editing, a zip download, a custom domain and badge removal are not. The parent page says not to launch on that plan."
  - question: "Is Cursor free?"
    answer: "Yes. On 24 Nov 2026 cursor.com/pricing lists Free at $0, with limited Agent and Chat requests and no printed count. Third-party models, Cloud agents, Origin and Bugbot are not on Free. Plus, at $8 a month, is the first paid plan, and the pricing page says only Grok models are on it."
  - question: "Is Lovable Pro the same as Cursor Pro?"
    answer: "No. Lovable Pro, read on 24 Nov 2026, starts at $25 a month for 100 credits, or $250 a year ($21 a month). Cursor Pro is a legacy plan at $20 a month for existing subscribers. Cursor's legacy doc maps that plan to Premium at $30 a month, and it says new customers do not get Pro. The shared name is not a shared price."
  - question: "Has Lovable vs Cursor been hands-on tested?"
    answer: "No. Both tools stay pending a hands-on test. The only hands-on note on the parent page is Spacefast, on 10 Nov 2026, which publishes files that already exist and does not build the app. That note says Lovable was not part of it. Cursor has no hands-on note. The planned task, a to-do app with email login, per-user data and a public URL, has not been run."
---

Prices checked 24 Nov 2026, from the [Lovable pricing page](../../pricing/lovable/) and the [Cursor pricing page](../../pricing/cursor/). Those pages quote the vendor. This comparison does not add a price, a discount, or a test result. The job split, builder then editor, is the one on [Vibe-code an MVP](../../use-cases/vibe-code-an-mvp/), which was last verified on 23 Nov 2026.

Lovable's dollar figures are in US dollars, as its subscription-plans doc prints them. Cursor's dollar figures are in US dollars, as cursor.com/pricing prints them. Nothing here is converted to pounds. Where a plan has two prices, both are quoted.

## What this page is not

It is not a ranking from a shared task. Lovable remains the top pick on the parent page. Bolt.new remains the budget pick there. Cursor remains the editor in the stack, and an also-considered tool, not a replacement for either builder.

The 10 Nov 2026 hands-on note is Spacefast only. Lovable was not part of it. Cursor was not part of it. The standard task has not been run.

Lovable's other builder comparison is [Lovable vs Bolt.new](../lovable-vs-bolt/). The wider shortlist is [AI app builders for non-coders](../../best/ai-app-builders-for-non-coders/).

Sources, fetched 24 Nov 2026: [lovable.dev/pricing](https://lovable.dev/pricing), [Lovable subscription plans](https://docs.lovable.dev/introduction/subscription-plans), [cursor.com/pricing](https://cursor.com/pricing) and [Legacy Cursor plans](https://cursor.com/docs/account/pricing/legacy-cursor-plans).
