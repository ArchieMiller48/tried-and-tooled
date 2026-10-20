---
title: "Best AI app builders for non-coders (2026)"
summary: "A shortlist of AI app builders for people who do not want to start in a code editor: Lovable, Bolt.new and Replit, plus Cursor for the editing step afterwards. Every price was checked on the vendor's own site on 20 October 2026."
targetQuery: "best ai app builder"
secondaryQueries:
  - "best vibe coding tools"
  - "ai app builder no code"
parent: "vibe-code-an-mvp"
testStatus: "pending"
lastTested: null
lastVerified: 2026-10-20
picks:
  - name: "Lovable"
    url: "https://lovable.dev"
    fit: "You want a chat-built web app, hosting included, and a Git repo from the free plan."
    why: "Lovable's own pricing FAQ describes it as chat to build websites and web apps with no technical knowledge needed. The plan table puts Git sync on every plan, including Free. Code editing, zip download, custom domains and removing the Edit with Lovable badge start on Pro."
    caveat: "Free is a poor place to launch something you mean to keep. Build credits stop at 30 a month, and Free cannot edit code, download it, or use a custom domain."
    pricing:
      summary: "Free: 5 build credits/day, capped at 30/month. Pro from $25/month for 100 credits, or $250/year ($21/month)."
      sourceUrl: "https://docs.lovable.dev/introduction/subscription-plans"
      checked: 2026-10-20
    sources:
      - label: "What free and paid include"
        url: "https://lovable.dev/pricing"
      - label: "Git sync and zip download"
        url: "https://docs.lovable.dev/tips-tricks/external-deployment-hosting"
    affiliateUrl: null
  - name: "Bolt.new"
    url: "https://bolt.new"
    fit: "You want the most room to prototype on the published free plan, and you can tolerate Bolt branding until you pay."
    why: "Bolt's intro doc calls it an AI app builder that turns a prompt into a working web or mobile app, with no coding required. The pricing page lists a free plan with 1 million tokens a month, 300,000 tokens a day, public and private projects, and website hosting. Custom domains and removing Bolt branding are on Pro."
    caveat: "The pricing card says unlimited databases on Free. The billing docs say a Supabase database needs Pro or Teams, and that free hosting is a bolt.host address with a monthly request cap."
    pricing:
      summary: "Free: $0, 1M tokens/month, 300K tokens/day, Bolt branding. Pro: $18/month billed annually ($216/year; $300/year struck through on the card), from 10M tokens, custom domain, branding removed."
      sourceUrl: "https://bolt.new/pricing"
      checked: 2026-10-20
    sources:
      - label: "What Bolt is"
        url: "https://support.bolt.new/get-started/intro-bolt"
      - label: "Free plan limits"
        url: "https://support.bolt.new/account/billing"
    affiliateUrl: null
  - name: "Replit"
    url: "https://replit.com"
    fit: "You want a fuller workspace (chat, build and publish in one account) and you expect to pay once the app has to stay online."
    why: "Replit's docs describe building and publishing apps from chat. The free Starter plan is written up as at no cost, with one published app. That published link goes down after 30 days. Full build, third-party connectors and removing the Made with Replit badge require Core or Pro. Core on the pricing page is $18/month billed annually."
    caveat: "Starter's daily Agent allowance is described, but the pages checked today do not give a number for it. This shortlist does not guess one. The pricing page itself lists Core and Pro, not a Starter price."
    pricing:
      summary: "Core: $18/month billed annually, with $20 struck through on the card, and '$20 towards more powerful models'. Pro: $90/month billed annually, with $100 struck through, and '$100 towards most powerful models'."
      sourceUrl: "https://replit.com/pricing"
      checked: 2026-10-20
    sources:
      - label: "Starter plan"
        url: "https://docs.replit.com/billing/plans"
      - label: "Publishing: one free app, 30 days"
        url: "https://docs.replit.com/billing/deployment-pricing"
    affiliateUrl: null
  - name: "Cursor"
    url: "https://cursor.com"
    fit: "You already have a project, or a repo from one of the builders above, and you want an editor for precise changes."
    why: "Cursor is the editor step in the MVP use case, not the tool to open first if you do not want to see code. Its pricing page sells agent and editor usage inside X subscription tiers: Free with limited agent and chat requests, Plus at $8/month (Grok models only), Premium at $30/month, Super at $100/month and Ultra at $200/month. From Premium, third-party models are available at API list price, billed separately."
    caveat: "The pricing page does not describe a chat-to-hosted-app plan with a database the way Lovable and Bolt do. Do not read this card as a no-code builder pick. Code hosting via Origin is listed from Premium upwards."
    pricing:
      summary: "Free (limited agent and chat). Plus $8/month, Grok models only. Premium $30/month. Super $100/month. Ultra $200/month. Third-party models at API list price from Premium, billed separately."
      sourceUrl: "https://cursor.com/pricing"
      checked: 2026-10-20
    sources: []
    affiliateUrl: null
verdicts:
  - situation: "You do not want to start in a code editor, and you want the code in Git while you are still on a free plan."
    guidance: "Open Lovable. Git sync is on every plan in the plan table, including Free. Move to Pro when you need to edit code inside Lovable, download a zip, or use your own domain. Pro starts at $25 a month for 100 credits, or $21 a month billed annually."
  - situation: "You are on a £0 budget and you want the largest free allowance the vendors actually print."
    guidance: "Open Bolt.new. The pricing page lists 1 million tokens a month and a 300,000 token daily cap, with hosting. Branding stays, and a custom domain is paid. Lovable's free cap is 30 build credits a month. Those units are not comparable."
  - situation: "You want the app to stay online on your own domain."
    guidance: "Do not plan to stay on Lovable Free or on Replit Starter. Lovable Free has no custom domain. Replit's free published app goes down after 30 days, and you get one of them. Bolt Free hosts on bolt.host with branding. The first paid step is Lovable Pro, Bolt Pro ($18/month billed annually on the pricing card) or Replit Core ($18/month billed annually)."
  - situation: "The builder has got you a repo, and the next change is a precise edit."
    guidance: "Use an editor such as Cursor, which is what the MVP use case already suggests for that step. Plus at $8/month is Grok models only. Third-party models need Premium ($30/month) and are billed at API list price on top."
faqs:
  - question: "What is the best AI app builder if I can't code?"
    answer: "For a chat-built web app with hosting, Lovable and Bolt.new are the two builders this site already tracks for that job. Lovable is the clearer fit if you want Git sync on the free plan. Bolt.new is the clearer fit if you want the free allowance printed on its pricing page, which is 1 million tokens a month. This is guidance from their docs, not a hands-on ranking."
  - question: "What are the best vibe coding tools for a non-coder?"
    answer: "Start in Lovable or Bolt.new, connect Git, and only then open an editor. Cursor is on this page as that later step. Its pricing page is an editor and agent subscription, bundled with X tiers. It is a poor first stop if you do not want to work in a code editor."
  - question: "Is there an AI app builder with no code and no card?"
    answer: "Lovable, Bolt.new and Replit each publish a free way to start. Lovable Free cannot use a custom domain or download code, and it stops at 30 build credits a month. Bolt Free includes hosting and keeps Bolt branding. Replit Starter can publish one app, which the docs say goes offline after 30 days. None of these free plans has been hands-on tested here."
  - question: "Which free plan is the wrong one to launch on?"
    answer: "Lovable Free, if you need to edit or download code, remove the badge, or use your own domain. Replit Starter, if the app has to stay up: the published link expires after 30 days, and full build, connectors and badge removal need Core or Pro. Bolt Free will keep hosting on a bolt.host address, with branding and the request cap described in Bolt's billing docs."
  - question: "Why are other app builders missing?"
    answer: "This shortlist only includes tools already covered on the site whose pricing could be read on the vendor's own pages on 20 October 2026. It is not a survey of every AI builder. A tool with no checked price is left off, rather than given a guessed one."
---

The order above is a reading guide for non-coders. It is not a ranking from a shared task. The standard task for this job, on the parent use case, is still to come: a to-do app with email login, per-user data and a public URL.

Prices are in US dollars, as the vendors publish them. Nothing here is converted to pounds. Where a page shows an annual price with a monthly price struck through beside it, both figures are reported, and the billing period is named.

Replit's help centre prints some plan facts as template placeholders rather than numbers. Those placeholders are not used. The Core and Pro dollar figures come from replit.com/pricing, which on 20 October 2026 had yearly billing selected: Core at $18 a month billed annually with $20 struck through, and Pro at $90 a month billed annually with $100 struck through.
