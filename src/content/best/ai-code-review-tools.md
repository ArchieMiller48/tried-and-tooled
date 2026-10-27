---
title: "Best AI code review tools (2026)"
summary: "A shortlist of AI code review tools for pull requests: CodeRabbit, Greptile, GitHub Copilot, Cursor Bugbot and other reviewers with a price on the vendor's own page. Every price was checked on 27 October 2026. This is not a hands-on test."
targetQuery: "best ai code review tools"
secondaryQueries:
  - "ai pr review tool"
  - "automated code review ai"
parent: "ai-code-review"
testStatus: "pending"
lastTested: null
lastVerified: 2026-10-27
picks:
  - name: "CodeRabbit"
    url: "https://www.coderabbit.ai"
    fit: "You want a dedicated pull-request reviewer, especially on a public repository, or a per-developer plan a small team can name on an invoice."
    why: "This is the top pick on the parent use case, read from CodeRabbit's own pages, not from a hands-on score. The pricing page includes agentic reviews in the PR, CLI, IDE and agent loops, pre-merge checks, slop detection and one-click fixes from Essentials up. The pricing FAQ says a public repository gets free reviews forever. Essentials is the first paid seat, and you are charged for developers who create pull requests."
    caveat: "The Free organisation plan is a poor place to expect pull-request reviews. The plans doc says it is PR summarisation only, with code reviews in VS Code and the CLI. Paid plans have an hourly allowance, then $0.25 per reviewed file. Advanced is $72 per user per month on the annual pricing page. The month-to-month Advanced price, $90, is on the plans doc and was not in the pricing FAQ."
    pricing:
      summary: "Annual prices on the pricing page: Essentials $24/user/mo, Team $48/user/mo, Advanced $72/user/mo. FAQ month-to-month: Essentials $30, Team $60. Public repositories: free reviews forever."
      sourceUrl: "https://www.coderabbit.ai/pricing"
      checked: 2026-10-27
    sources:
      - label: "Free plan, hourly limits, Advanced at $90 month-to-month"
        url: "https://docs.coderabbit.ai/management/plans"
    affiliateUrl: null
  - name: "Greptile"
    url: "https://www.greptile.com"
    fit: "You are one developer on a £0 budget, or a team that would rather buy review credits than seats."
    why: "This is the budget pick on the parent use case. Starter is free for one active developer, with 50 credits a month and unlimited repositories. A base review costs 1 credit on the pricing FAQ, so the published free grant is 50 base reviews a month. Pro drops the seat: unlimited developers, prepaid credits at $1 each, shared across the organisation."
    caveat: "Plus reviews cost 3 credits and Apex reviews cost 10, so a heavier review is $3 or $10, not $1. The billing doc says reviews pause when the balance hits zero, unless you buy more or turn on automatic recharge. The open-source offer is an application for qualified non-commercial OSI-licensed projects, not an automatic public-repo free tier. The Pro button says a 14-day free trial and does not say how many credits it includes."
    pricing:
      summary: "Starter free (1 active developer, 50 credits/month, unlimited repositories). Pro has no seat fee: $1 per credit, shared across the organisation. Base review 1 credit, Plus 3, Apex 10."
      sourceUrl: "https://www.greptile.com/pricing"
      checked: 2026-10-27
    sources:
      - label: "Reviews pause at a zero balance"
        url: "https://www.greptile.com/docs/code-review-bot/billing-seats"
    affiliateUrl: null
  - name: "GitHub Copilot code review"
    url: "https://github.com/features/copilot"
    fit: "You already pay for Copilot, or you want the review inside GitHub rather than a second product."
    why: "Copilot code review is GitHub's own pull-request reviewer. The plans page prices individual Copilot at Pro $10 a month, Pro+ $39 and Max $100, and lists total GitHub AI Credits of $15, $70 and $200 a month for those plans. It says 1 AI credit equals $0.01. The plans doc prices Copilot Business at $19 per granted seat per month and Copilot Enterprise at $39, and says code review consumes AI credits. Automatic pull-request reviews are on Pro, Pro+, Max, Business and Enterprise."
    caveat: "Do not turn this on for people without a Copilot licence, and without a budget. The code-review doc says that path bills AI credits to the organisation as paid usage, and that the agentic part of a review also uses GitHub Actions minutes. GitHub's own estimate is $0.05 to $1 of AI credits for a Lite review and $0.25 to $5 for Balanced, before Actions minutes. The plans doc limits Copilot Free to 'Review selection' in VS Code. The code-review doc says the Free plan does not include Copilot code review. Those two sentences are both on GitHub's docs. This shortlist does not flatten them."
    pricing:
      summary: "Free $0. Pro $10/month. Pro+ $39/month. Max $100/month. Plans page lists total GitHub AI Credits of $15/month (Pro), $70 (Pro+) and $200 (Max). 1 AI credit = $0.01."
      sourceUrl: "https://github.com/features/copilot/plans"
      checked: 2026-10-27
    sources:
      - label: "Business $19, Enterprise $39, and who gets code review"
        url: "https://docs.github.com/en/copilot/get-started/plans"
      - label: "Code review billing, including unlicensed users"
        url: "https://docs.github.com/en/copilot/concepts/agent-capabilities/agent-powered-workflows-and-operations/code-review"
    affiliateUrl: null
  - name: "Cursor Bugbot"
    url: "https://cursor.com/bugbot"
    fit: "You already pay for Cursor Premium or above, and you want to try the included reviewer before adding another subscription."
    why: "The Cursor pricing table lists 'AI code reviews via Bugbot' from Premium upwards, and not on Free or Plus. Premium is $30 a month, Super $100, Ultra $200. Teams start at $30 per user per month. The pricing page also says third-party models are available from Premium at API list price, billed separately, and that prices exclude tax."
    caveat: "The pricing page does not state a price per review. Cursor's Bugbot billing help page, which is not the pricing card, says the average run costs between $1.00 and $1.50 depending on pull-request size, that individual plans bill included usage first, and that reviews pause until the next cycle if on-demand usage is off. Teams are charged from on-demand usage. That average is the vendor's figure, not a measurement from this site."
    pricing:
      summary: "Bugbot is on the pricing table from Premium at $30/month, not on Free or Plus. Super $100/month. Ultra $200/month. Teams from $30/user/month. Third-party models at API list price, billed separately."
      sourceUrl: "https://cursor.com/pricing"
      checked: 2026-10-27
    sources:
      - label: "Average Bugbot run and usage billing"
        url: "https://cursor.com/help/account-and-billing/bugbot-usage-based-billing"
    affiliateUrl: null
  - name: "Sourcery"
    url: "https://www.sourcery.ai"
    fit: "You want another dedicated reviewer with a published per-developer price, and free reviews on public repositories."
    why: "Sourcery's pricing page has an Open Source plan at free forever, with AI reviews, summaries, one-click fixes, custom rules and security checks on public repositories. The FAQ says it reviews every pull request on public GitHub or GitLab repositories. Pro is the private-repo plan. The card shows $12 and $15 per developer per month, and the FAQ says annual billing is $12 per seat per month instead of $15. Team shows $24 and $30, and the FAQ says annual is $24 instead of $30. A 14-day Team trial needs no card."
    caveat: "The page says Pro and Team have higher review limits and does not give the number. The lower seat price is not a test result against CodeRabbit. Seats are developers you assign, which is a different rule from CodeRabbit's 'developers who create pull requests'."
    pricing:
      summary: "Open source free on public repos. Pro $12/developer/month billed annually ($15 month-to-month, per the FAQ). Team $24 annually ($30 month-to-month). 14-day Team trial, no card."
      sourceUrl: "https://www.sourcery.ai/pricing"
      checked: 2026-10-27
    sources: []
    affiliateUrl: null
  - name: "Graphite"
    url: "https://graphite.com"
    fit: "You want stacked pull requests and AI review in the same GitHub workflow, and you can pay annually."
    why: "Graphite's pricing page, with annual billing selected, lists Hobby as Free for personal-account repos, including a CLI for stacked PRs and limited AI reviews. Starter is $20 per user per month billed annually and includes GitHub organisation repos. Team is $40 per user per month billed annually and lists unlimited AI reviews, review customisation, automations and a merge queue. Enterprise is Custom. The page says annual billing is 20% off."
    caveat: "The page does not say how many reviews 'limited' is, on Hobby or on Starter (Starter includes the Hobby tier). The monthly price was not in the HTML on 27 October 2026, so this card does not invent one from the 20% line. The billing docs describe a 30-day Team trial. That length is not printed on the pricing card, which only says 'Start free trial'."
    pricing:
      summary: "Hobby free, with limited AI reviews and no count given. Starter $20/user/month billed annually. Team $40/user/month billed annually, with unlimited AI reviews. Enterprise custom. Monthly prices were not in the page HTML."
      sourceUrl: "https://graphite.com/pricing"
      checked: 2026-10-27
    sources:
      - label: "30-day Team trial"
        url: "https://graphite.com/docs/billing-plans"
    affiliateUrl: null
  - name: "Macroscope"
    url: "https://macroscope.com"
    fit: "You want no seat fee, a per-diff price, and a cap on what a month of reviews can cost."
    why: "Macroscope's pricing doc says it charges for usage, with no seat fee, drawn from a prepaid balance. New workspaces receive $100 in free usage. GitHub correctness review is billed per KB of diff, with a 10 KB minimum. Budget is $0.025 per KB (minimum $0.25), Balanced, the default, is $0.05 (minimum $0.50), Precise is $0.06 (minimum $0.60) and Ultra is $0.20 (minimum $2.00)."
    caveat: "The $100 is a welcome credit, not a permanent free plan. Auto Refill is on by default. The same doc says work already in progress can finish after the balance runs out and land on the invoice as overage, so set a monthly spend limit if a hard stop matters. Contracted rates may differ. This page does not use any average-cost figure that was not on this pricing doc."
    pricing:
      summary: "No seat fee. $100 free usage for a new workspace. GitHub correctness review from $0.025/KB (Budget, $0.25 minimum) to $0.20/KB (Ultra, $2 minimum). Balanced default is $0.05/KB, $0.50 minimum."
      sourceUrl: "https://docs.macroscope.com/pricing"
      checked: 2026-10-27
    sources: []
    affiliateUrl: null
verdicts:
  - situation: "The repository is public and you want reviews without a subscription."
    guidance: "Start with CodeRabbit. Its pricing FAQ says installing on a public repository gets free reviews forever. Sourcery's pricing FAQ also says public GitHub or GitLab repositories are reviewed for free. Greptile's open-source path is an application, not an install. Copilot Free is the wrong plan to count on for pull-request review: the code-review doc says it does not include Copilot code review."
  - situation: "You are one developer, the work is private, and the budget is £0."
    guidance: "Greptile Starter. One active developer, 50 credits a month, unlimited repositories, and a base review is 1 credit. CodeRabbit's Free organisation plan does not include pull-request reviews. Graphite Hobby is free, but the pricing page only says AI reviews are limited and does not give a number."
  - situation: "You already pay for GitHub Copilot or for Cursor Premium or above."
    guidance: "Use the reviewer you are already paying for before you add a seat. Copilot code review is on Pro ($10 a month), Pro+ ($39) and Max ($100), and on Business ($19 per granted seat) and Enterprise ($39). Cursor lists Bugbot from Premium at $30 a month. Reviews still draw on included usage or AI credits. They are not a second copy of the subscription price."
  - situation: "A small team wants a dedicated reviewer and a per-developer invoice."
    guidance: "CodeRabbit Essentials is $24 per user per month billed annually, or $30 month-to-month, for developers who open pull requests. Sourcery Pro is the lower published seat on this page, at $12 per developer per month billed annually or $15 month-to-month, for seats you assign. Graphite Starter is $20 per user per month billed annually, and its AI reviews stay on the limited Hobby allowance until Team at $40. None of those gaps is a quality ranking."
  - situation: "You do not want a seat, and you do want a number you can put a cap on."
    guidance: "Greptile Pro is $1 per credit with no seat fee, and reviews pause when prepaid credits run out unless automatic recharge is on. Macroscope has no seat fee either: a Balanced review is $0.05 per KB with a $0.50 minimum, and the pricing doc tells you to set a monthly spend limit because in-progress work can still bill as overage. Do not enable Copilot code review for organisation members who have no Copilot licence unless the organisation has a budget. Those reviews are billed as paid AI credits, plus GitHub Actions minutes on private repositories."
faqs:
  - question: "What are the best AI code review tools?"
    answer: "For a dedicated pull-request reviewer, this site's parent use case names CodeRabbit, which is free on public repositories and $24 per user per month billed annually for Essentials. For a £0 private repo, it names Greptile Starter: 50 credits a month and a base review at 1 credit. If you already pay for Copilot or Cursor Premium, those products include a reviewer and the prices are the plan prices above. Sourcery, Graphite and Macroscope are on this page because their own pricing pages could be read on 27 October 2026. This is not a hands-on ranking."
  - question: "What is a good AI PR review tool if the code already lives on GitHub?"
    answer: "Copilot code review runs on the pull request in GitHub, and automatic reviews are available on Pro, Pro+, Max, Business and Enterprise. CodeRabbit's open-source signup is GitHub or GitLab. Graphite's pricing page is written around GitHub repositories, including GitHub Enterprise Server on Enterprise. Macroscope's pricing doc measures GitHub diffs. Greptile's Starter and Pro sections do not name a git host. The Enterprise section names GitHub Enterprise, GitLab, Bitbucket, Gitea and Perforce. None of this has been checked by opening a pull request."
  - question: "What does automated code review with AI cost?"
    answer: "It depends which unit the vendor sells. On 27 October 2026: CodeRabbit Essentials is $24 per user per month billed annually, then $0.25 per reviewed file past the hourly allowance. Greptile Pro is $1 per credit (1, 3 or 10 credits by review tier) with no seat. Sourcery Pro is $12 per developer per month billed annually. Graphite Starter is $20 per user per month billed annually. Copilot Pro is $10 a month, and GitHub estimates a single review at about $0.05 to $1 of AI credits on Lite or $0.25 to $5 on Balanced, plus Actions minutes. Macroscope's default Balanced rate is $0.05 per KB, minimum $0.50. Cursor's pricing page does not price a Bugbot run. Its help page says the average run costs $1.00 to $1.50."
  - question: "Which free plan is the wrong one to rely on?"
    answer: "CodeRabbit Free, if you wanted pull-request reviews on a private repository: the plans doc says that plan is PR summarisation only. Copilot Free, if you wanted Copilot to review pull requests: the code-review doc says Free does not include it, and letting unlicensed teammates request reviews bills the organisation. Graphite Hobby, if you needed a known number of AI reviews: the pricing page says they are limited and does not say how many. Macroscope's $100 is a starting credit, and Auto Refill is on by default."
  - question: "Why are other AI code review tools missing?"
    answer: "A tool is on this page only when a dollar or a free plan could be read on the vendor's own site on 27 October 2026. Qodo's pricing page showed $0.012 per credit and review-pack labels, and did not show a dollar price for those packs, so it is not listed. Cubic's pricing page did not render a stable plan price in the HTML fetched that day. CodeAnt's pricing page did not list a dollar plan for AI code review. This is not a survey of every reviewer."
---

The order above follows the parent use case, then the other reviewers whose prices could be read today. CodeRabbit is first because that page names it as the top pick for this job. Greptile is second because that page names Starter as the budget pick. The rest are here for a situation, not because a shared task ranked them. The standard task on the parent page, the same seeded pull request run through each reviewer, has not been run. Every card is pending a hands-on test.

Prices are in US dollars, as the vendors publish them. Nothing here is converted to pounds. Where a page shows an annual price and a month-to-month price, both are named. Where a page shows only the annual price, the missing monthly figure is left missing.

CodeRabbit's $24, $48 and $72 cards, and the $30 and $60 month-to-month FAQ lines, are from coderabbit.ai/pricing. Advanced at $90 month-to-month is from the plans doc only. Greptile's credit prices are from greptile.com/pricing. Copilot's individual prices and the $15, $70 and $200 credit totals are from the Copilot plans page. Business at $19 and Enterprise at $39 are from GitHub's plans doc. Graphite's $20 and $40 were read from graphite.com/pricing with annual billing selected. The monthly Graphite prices were not in that HTML. Macroscope's per-KB rates are from its pricing doc.

The head-to-head for the two tools the parent use case already picks is [CodeRabbit vs Greptile](../../compare/coderabbit-vs-greptile/).
