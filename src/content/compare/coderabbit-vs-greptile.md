---
title: "CodeRabbit vs Greptile (2026): which AI code reviewer to use"
summary: "CodeRabbit and Greptile compared for pull-request review: free limits, the first paid plan, and what one review costs. Prices were read from each vendor on 27 October 2026. This is not a hands-on test."
targetQuery: "coderabbit vs greptile"
secondaryQueries:
  - "greptile vs coderabbit"
parent: "ai-code-review"
testStatus: "pending"
lastTested: null
lastVerified: 2026-10-27
tools:
  - name: "CodeRabbit"
    url: "https://www.coderabbit.ai"
    blurb: "A dedicated pull-request reviewer. The pricing page lists agentic reviews in the PR, the CLI, the IDE and agent loops on Essentials, plus pre-merge checks, slop detection and one-click fixes. Public repositories get free reviews. The separate Free organisation plan is not the same thing."
    pricing:
      summary: "Annual prices on the pricing page: Essentials $24/user/mo, Team $48/user/mo, Advanced $72/user/mo. FAQ month-to-month: Essentials $30, Team $60. Public repositories: free reviews forever."
      sourceUrl: "https://www.coderabbit.ai/pricing"
      checked: 2026-10-27
    sources:
      - label: "Plans, Free vs open source, and the $90 Advanced month-to-month price"
        url: "https://docs.coderabbit.ai/management/plans"
    affiliateUrl: null
  - name: "Greptile"
    url: "https://www.greptile.com"
    blurb: "A credit-metered reviewer. Starter is free for one developer. Pro has no seat fee: the organisation buys prepaid credits at $1 each and shares them. The pricing FAQ prices a base review at 1 credit, Plus at 3 and Apex at 10."
    pricing:
      summary: "Starter free (1 active developer, 50 credits/month, unlimited repositories). Pro has no seat fee: $1 per credit, shared across the organisation. Base review 1 credit, Plus 3, Apex 10."
      sourceUrl: "https://www.greptile.com/pricing"
      checked: 2026-10-27
    sources:
      - label: "Credits pause reviews when the balance hits zero; TREX is 3 extra credits"
        url: "https://www.greptile.com/docs/code-review-bot/billing-seats"
    affiliateUrl: null
rows:
  - label: "Free allowance"
    cells:
      - "Two different frees. The pricing FAQ says installing on a public repository gets free reviews forever, with no extra setup. The plans doc describes a separate Free organisation plan: unlimited public and private repositories, no card, but PR summarisation only. Code reviews on that plan are through the VS Code extension and the CLI. New organisations start on a 14-day Advanced trial."
      - "Starter is free for one active developer, with 50 credits a month and unlimited repositories. The pricing page does not say those credits are public-only. It does not say what happens to unused credits."
    sources:
      - label: "CodeRabbit pricing FAQ"
        url: "https://www.coderabbit.ai/pricing"
      - label: "CodeRabbit plans"
        url: "https://docs.coderabbit.ai/management/plans"
      - label: "Greptile pricing"
        url: "https://www.greptile.com/pricing"
  - label: "First paid plan"
    cells:
      - "The pricing page opens on annual prices: Essentials $24 per user per month, Team $48, Advanced $72, and says annual plans save 20%. The FAQ states month-to-month prices for Essentials ($30 per developer per month) and Team ($60). It does not state an Advanced month-to-month price. The plans doc does: Advanced is $72 billed annually or $90 month-to-month. Enterprise is contact sales on both pages."
      - "Pro is $1 per credit, with no seat fee, unlimited developers and agents, and credits prepaid and shared across the organisation. The Pro action on the pricing page says 'Start 14 day free trial'. The page does not say how many credits that trial includes. Enterprise is custom."
    sources:
      - label: "CodeRabbit pricing"
        url: "https://www.coderabbit.ai/pricing"
      - label: "CodeRabbit plans doc"
        url: "https://docs.coderabbit.ai/management/plans"
      - label: "Greptile pricing"
        url: "https://www.greptile.com/pricing"
  - label: "What one review costs"
    cells:
      - "Included reviews come with the seat, up to an hourly allowance. The plans doc lists PR reviews per developer per hour as 5 on Essentials, 8 on Team and 10 on Advanced. The pricing FAQ says there is no total cap on pull requests or repositories, and that reviews past the included allowance cost $0.25 per reviewed file. The same FAQ prices the CodeRabbit Agent at $0.40 per agent minute, separate from the seat."
      - "The pricing FAQ: a base review is 1 credit, Plus is 3, Apex is 10, and a credit is $1 on Pro. Starter's 50 credits are the same unit. The billing doc adds that a TREX run costs 3 credits on top of the review, and that only completed reviews spend credits. With Auto, you pay for the tier that ran."
    sources:
      - label: "CodeRabbit overage"
        url: "https://www.coderabbit.ai/pricing"
      - label: "CodeRabbit hourly limits"
        url: "https://docs.coderabbit.ai/management/plans"
      - label: "Greptile credit prices"
        url: "https://www.greptile.com/pricing"
      - label: "Greptile billing"
        url: "https://www.greptile.com/docs/code-review-bot/billing-seats"
  - label: "Who you pay for"
    cells:
      - "The pricing FAQ says you are charged only for developers who create pull requests. Seats can be reassigned. You can also assign purchased seats to specific developers."
      - "Pro has no seat fee. The pricing page says unlimited developers and agents, and that credits are shared across the whole organisation. Starter is capped at one active developer."
    sources:
      - label: "CodeRabbit seats"
        url: "https://www.coderabbit.ai/pricing"
      - label: "Greptile seats"
        url: "https://www.greptile.com/pricing"
  - label: "Open source"
    cells:
      - "Sign up with GitHub or GitLab, install on a public repository, and the pricing FAQ says you receive free reviews forever. The plans doc says open-source projects receive Team features, on a separate rate-limit tier. Public repositories with fewer than 10 stars require a manual review trigger."
      - "The pricing page says Greptile is free for qualified non-commercial projects with an OSI-approved licence, and the action is 'Apply for OSS'. That is an application, not an install-and-go free tier."
    sources:
      - label: "CodeRabbit open source"
        url: "https://www.coderabbit.ai/pricing"
      - label: "CodeRabbit OSS limits"
        url: "https://docs.coderabbit.ai/management/plans"
      - label: "Greptile open source"
        url: "https://www.greptile.com/pricing"
  - label: "When the allowance runs out"
    cells:
      - "Usage-based reviews can continue after the hourly allowance. Admins choose Automatic, On demand or Off, and can set a monthly spending cap. Continued reviews are $0.25 per reviewed file on the invoice. The plans doc says a valid payment method is required before paid activation."
      - "The billing doc says new reviews pause when credits run out, until you buy more. You can turn on automatic recharge. The pricing page does not print a per-review dollar price other than $1 per credit."
    sources:
      - label: "CodeRabbit usage-based reviews"
        url: "https://www.coderabbit.ai/pricing"
      - label: "Greptile billing"
        url: "https://www.greptile.com/docs/code-review-bot/billing-seats"
verdicts:
  - situation: "The repository is public, and you want reviews without a card."
    guidance: "CodeRabbit. The pricing FAQ says a public repository gets free reviews forever after you install it. Greptile's open-source offer is an application for qualified non-commercial projects with an OSI-approved licence, not an automatic install."
  - situation: "You are one developer, the repo is private, and the budget is £0."
    guidance: "Greptile Starter. It is one active developer, 50 credits a month and unlimited repositories. A base review is 1 credit, so the published free allowance is 50 base reviews a month. CodeRabbit's Free organisation plan, in the plans doc, is PR summarisation only. Reviews there are in VS Code and the CLI, not the pull-request reviewer you get on a public repo or on Essentials."
  - situation: "A small team ships most days and wants one invoice per developer."
    guidance: "CodeRabbit Essentials is the first paid seat: $24 per user per month billed annually, or $30 month-to-month, and you pay for developers who open pull requests. Team is $48 annually or $60 month-to-month and adds triage, unit-test generation, finishing touches and post-merge actions. Greptile Pro has no seat, so the bill is $1 times credits. A base review is $1, a Plus review is $3 and an Apex review is $10. Those units are not the same as a CodeRabbit seat."
  - situation: "You expect a burst of pull requests and do not want reviews to stop."
    guidance: "Read the stop condition before you pick. CodeRabbit's FAQ says reviews can continue past the hourly allowance at $0.25 per reviewed file, with a spending cap. Greptile's billing doc says reviews pause when the prepaid balance hits zero, unless automatic recharge is on. Neither behaviour has been checked hands-on."
faqs:
  - question: "CodeRabbit vs Greptile: which should I use?"
    answer: "This page is not a test result. For a public repository, CodeRabbit's pricing FAQ says reviews are free forever once you install it. For one developer on a £0 budget, Greptile Starter publishes 50 credits a month and unlimited repositories, and a base review costs 1 credit. For a team that wants a per-developer invoice, CodeRabbit Essentials is $24 per user per month billed annually, or $30 month-to-month. For a team that wants no seat fee, Greptile Pro is $1 per credit. The parent use case is AI code review for pull requests."
  - question: "Greptile vs CodeRabbit: which is cheaper?"
    answer: "On 27 October 2026 they do not sell the same unit. CodeRabbit Essentials is $24 per user per month billed annually ($30 month-to-month) for developers who open pull requests, with an hourly review allowance and then $0.25 per reviewed file. Greptile Pro is $1 per credit with no seat fee: 1 credit for a base review, 3 for Plus and 10 for Apex. A light team can spend less on Greptile. A team that runs Apex reviews, or a lot of base reviews, can spend more than a CodeRabbit seat. This page does not convert one into the other."
  - question: "Can I review private repositories on the free plan?"
    answer: "Greptile Starter is free for one active developer, with 50 credits a month and unlimited repositories. The pricing page does not mark those repositories public-only. CodeRabbit's free reviews forever, in the pricing FAQ, are for public repositories. The plans doc's Free organisation plan allows private repositories but limits them to PR summarisation, with code reviews in the VS Code extension and the CLI."
  - question: "Is CodeRabbit or Greptile free for open source?"
    answer: "CodeRabbit: install on a public GitHub or GitLab repository and the pricing FAQ says you get free reviews forever. The plans doc says that path includes Team features, with its own rate limit, and that a public repository with fewer than 10 stars needs a manual review trigger. Greptile: free for qualified non-commercial projects with an OSI-approved licence, via an application. Neither offer has been checked hands-on."
  - question: "Do these prices include a hands-on comparison of review quality?"
    answer: "No. Facts on this page were read from CodeRabbit's pricing page and plans doc, and from Greptile's pricing page and billing doc, on 27 October 2026. There is no shared bug-finding score here. The parent use case describes the standard task that would produce one. It has not been run."
---

A CodeRabbit seat and a Greptile credit are different units. CodeRabbit's hourly allowance is not a pile of credits you can subtract from Greptile's 50. Neither vendor publishes a conversion.

The dollar figures for Essentials, Team and the $72 Advanced card are from coderabbit.ai/pricing, fetched on 27 October 2026 with annual plans selected. That page says annual plans save 20%. The FAQ on the same page gives the month-to-month prices for Essentials ($30 per developer per month) and Team ($60). It does not give a month-to-month price for Advanced. The plans doc does: $72 per developer per month billed annually, or $90 month-to-month. That $90 figure was not on the pricing FAQ.

Greptile's $1 per credit, the 50-credit Starter grant, and the 1 / 3 / 10 credit costs for Base, Plus and Apex are all on greptile.com/pricing. The billing doc, checked the same day, says a TREX run is 3 credits on top of the review and that reviews pause at a zero balance. The pricing page does not print a TREX price.

Prices are in US dollars, as the vendors publish them. Nothing here is converted to pounds.

The wider shortlist, including GitHub Copilot code review and Cursor Bugbot, is on [Best AI code review tools](../../best/ai-code-review-tools/). This comparison does not rank those tools. It has not been hands-on tested.
