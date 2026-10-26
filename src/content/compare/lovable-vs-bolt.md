---
title: "Lovable vs Bolt.new (2026): which to use for an MVP"
summary: "Lovable and Bolt.new compared for an MVP: free limits, the first paid plan, custom domains, and how you get the code out. Prices were read from each vendor on 26 October 2026. This is not a hands-on test."
targetQuery: "lovable vs bolt"
secondaryQueries:
  - "bolt.new vs lovable"
  - "lovable or bolt for mvp"
parent: "vibe-code-an-mvp"
testStatus: "pending"
lastTested: null
lastVerified: 2026-10-26
tools:
  - name: "Lovable"
    url: "https://lovable.dev"
    blurb: "A chat-to-app builder. The plan table puts Git sync on every plan, including Free, and puts code editing, code download, custom domains and badge removal on Pro and above."
    pricing:
      summary: "Free: 5 build credits/day, capped at 30/month. Pro from $25/month for 100 credits, or $250/year ($21/month)."
      sourceUrl: "https://docs.lovable.dev/introduction/subscription-plans"
      checked: 2026-10-26
    sources:
      - label: "Git sync on all plans"
        url: "https://docs.lovable.dev/tips-tricks/external-deployment-hosting"
      - label: "You own the code (pricing FAQ)"
        url: "https://lovable.dev/pricing"
    affiliateUrl: null
  - name: "Bolt.new"
    url: "https://bolt.new"
    blurb: "A prompt-to-app builder with hosting on the free plan. The pricing page opens on yearly billing. Pro is listed there at $18/month billed annually, with a custom domain and branding removal."
    pricing:
      summary: "Free: $0, 1M tokens/month, 300K tokens/day, Bolt branding. Pro: $18/month billed annually ($216/year; $300/year struck through on the card), from 10M tokens, custom domain, branding removed."
      sourceUrl: "https://bolt.new/pricing"
      checked: 2026-10-26
    sources:
      - label: "Free plan limits, including hosting"
        url: "https://support.bolt.new/account/billing"
      - label: "Download a project"
        url: "https://support.bolt.new/managing-projects/projects-files"
      - label: "GitHub sync"
        url: "https://support.bolt.new/integrations/git"
    affiliateUrl: null
rows:
  - label: "Free allowance"
    cells:
      - "5 build credits a day, then a stop at 30 build credits for the calendar month. Daily credits do not roll over."
      - "1 million tokens a month and a 300,000 token daily cap. Unused tokens do not roll over on Free."
    sources:
      - label: "Lovable plans"
        url: "https://docs.lovable.dev/introduction/subscription-plans"
      - label: "Bolt pricing"
        url: "https://bolt.new/pricing"
  - label: "First paid plan"
    cells:
      - "Pro starts at 100 credits for $25/month, or $250/year ($21/month). Higher credit tiers cost more. Annual billing is described as two months free against monthly."
      - "The yearly tab lists Pro at $18/month, billed annually, $216 for the year, with $300/year struck through. It starts at 10 million tokens, with rollover. A monthly Pro price is not in that HTML."
    sources:
      - label: "Lovable plans"
        url: "https://docs.lovable.dev/introduction/subscription-plans"
      - label: "Bolt pricing"
        url: "https://bolt.new/pricing"
  - label: "Custom domain and badge"
    cells:
      - "Custom domains and removing the Edit with Lovable badge are on Pro, Business and Enterprise. Not on Free."
      - "Custom domains and removing Bolt branding are on Pro and above. Free sites keep Bolt branding."
    sources:
      - label: "Lovable plans"
        url: "https://docs.lovable.dev/introduction/subscription-plans"
      - label: "Bolt pricing"
        url: "https://bolt.new/pricing"
  - label: "Getting the code out"
    cells:
      - "Git sync to GitHub, GitLab or Bitbucket is on every plan, including Free. Downloading the codebase as a zip needs a paid plan."
      - "Docs describe Export, then Download, for a zip, and a two-way GitHub connection. Those pages do not state a plan requirement."
    sources:
      - label: "Lovable export"
        url: "https://docs.lovable.dev/tips-tricks/external-deployment-hosting"
      - label: "Bolt download"
        url: "https://support.bolt.new/managing-projects/projects-files"
      - label: "Bolt GitHub"
        url: "https://support.bolt.new/integrations/git"
  - label: "Hosting"
    cells:
      - "Free, Pro and Business include a monthly Cloud grant (20 credits on the plan table) and a monthly AI grant (4 credits). The pricing FAQ says smaller apps are usually covered by that grant, and heavier traffic can draw on the credit balance."
      - "Website hosting is on every plan in the pricing table. Billing docs say Free publishes to a bolt.host address, with up to 10 GB of bandwidth and 333,333 web requests a month, and the site goes offline for the rest of the month if you pass that."
    sources:
      - label: "Lovable plans"
        url: "https://docs.lovable.dev/introduction/subscription-plans"
      - label: "Lovable pricing FAQ"
        url: "https://lovable.dev/pricing"
      - label: "Bolt billing"
        url: "https://support.bolt.new/account/billing"
  - label: "Database"
    cells:
      - "The built-in backend is Lovable Cloud, paid for from the Cloud grant and then from credits. This page does not compare database products beyond that."
      - "The pricing card says unlimited databases on Free. Billing docs say there is no limit to how many databases you can have on Free, and that a Supabase database needs Pro or Teams."
    sources:
      - label: "Lovable plans"
        url: "https://docs.lovable.dev/introduction/subscription-plans"
      - label: "Bolt billing"
        url: "https://support.bolt.new/account/billing"
verdicts:
  - situation: "You are prototyping on a £0 budget and want the larger published free allowance."
    guidance: "Start with Bolt.new. Its pricing page lists 1 million tokens a month and a 300,000 token daily cap, with hosting included and Bolt branding left on. Lovable Free is 5 build credits a day and then stops at 30 build credits for the month. A credit and a token are not the same unit, and neither vendor publishes a conversion, so this is not a like-for-like budget."
  - situation: "You want the code in a Git repo before you pay anything."
    guidance: "Lovable is the one that puts Git sync on the free plan in its plan table. Zip download is paid. Bolt's docs describe a zip download and GitHub sync without naming a plan gate. That is a reading of the docs, not a check inside either product."
  - situation: "You need your own domain, and you do not want the vendor's badge on the site."
    guidance: "Budget for a paid plan on either. Lovable Pro starts at $25 a month for 100 credits, or $21 a month billed annually. Bolt's pricing page lists Pro at $18 a month when billed annually ($216 a year). Bolt's billing docs use a '$25 Pro 10M monthly plan' as a worked example; that monthly figure was not on the pricing cards."
  - situation: "You are choosing for an MVP you hope to keep, not a weekend demo."
    guidance: "Do not launch on Lovable Free. The plan table says Free cannot edit code, download it, or use a custom domain, and build credits stop at 30 a month. Bolt Free will host on bolt.host, with branding and the request cap in the billing docs. When a chat builder is the wrong place for a precise change, move the repo to an editor. The parent use case names Cursor for that step."
faqs:
  - question: "Is Lovable or Bolt.new better for an MVP?"
    answer: "This page is not a test result. For a free prototype, Bolt.new publishes the larger free usage allowance. For a Git copy of the code on the free plan, Lovable publishes Git sync on every plan, including Free. For a custom domain, both require a paid plan. Use the situation that matches you above, then read the vibe-code an MVP use case for the rest of the stack."
  - question: "Bolt.new vs Lovable: can I build the MVP on the free plan?"
    answer: "You can start on both free plans. Lovable Free is capped at 30 build credits a month and does not include code editing, code download or a custom domain. Bolt Free includes 1 million tokens a month and hosting, with Bolt branding and no custom domain. Bolt's billing docs also say a Supabase database needs Pro or Teams."
  - question: "Lovable or Bolt for an MVP: which is cheaper once I pay?"
    answer: "On 26 October 2026, Lovable's first Pro tier is $25 a month for 100 credits, or $250 a year ($21 a month). Bolt Pro is listed at $18 a month billed annually, $216 for the year, starting at 10 million tokens. Bolt's billing docs describe a $25 Pro 10M monthly plan, which was not printed on the pricing cards. The units differ, so the smaller invoice is not the same thing as the cheaper build."
  - question: "Can I export my code from Lovable or Bolt.new?"
    answer: "Lovable: Git sync to GitHub, GitLab or Bitbucket is on every plan, and downloading the codebase is on paid plans. Bolt: the docs describe Export then Download for a zip, and a GitHub integration that syncs commits both ways. Those Bolt pages do not say the feature is paid-only. None of this has been checked hands-on."
  - question: "Do I need to know how to code?"
    answer: "Both products describe building the first version from a prompt. You still want the code somewhere you control, because an MVP that only lives inside the builder is hard to leave. Lovable documents that path on the free plan via Git sync. Precise edits are a separate step, in an editor, after you have a repo."
---

A Lovable credit and a Bolt token are different units. Neither company publishes a conversion, so the free allowances above are not a shared budget you can subtract one from the other.

The dollar figures for Lovable are the Pro tier table in Lovable's subscription-plans doc, which labels them as prices in USD. The marketing page at lovable.dev/pricing confirms the free grant (5 build credits a day, up to 30 a month, plus 20 Cloud credits and 4 AI credits) but did not include that dollar table in the HTML fetched on 26 October 2026.

Bolt's pricing page loads with yearly billing selected. The Pro card reads $18 a month, billed annually, total $216, with $300 a year struck through, and a note that prices are plus applicable taxes. The monthly tab's prices were not in that HTML. Separately, Bolt's billing doc uses a "$25 Pro 10M monthly plan" and a Pro 10M annual plan at $216 a year as worked examples. Those examples match the struck-through $300 (12 × $25) and the $216 annual total, but they are examples in a help article, not the price printed on the card.

Lovable's pricing FAQ says you own the projects and code you build there, subject to third-party rights in the underlying models. Bolt's intro doc says the code you create is yours to use for any legal purpose, including commercial projects ([Intro to Bolt](https://support.bolt.new/get-started/intro-bolt)). Both are the vendor's own statement, not a legal review.
