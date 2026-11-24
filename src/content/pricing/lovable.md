---
title: "Lovable pricing (2026): plans, credits and free limits explained"
summary: "Free is $0: 5 build credits a day, up to 30 a month. Pro starts at $25/month for 100 credits. Prices checked 24 Nov 2026. Pending hands-on test."
targetQuery: "lovable pricing"
secondaryQueries:
  - "lovable credits explained"
  - "lovable free plan limits"
parent: "vibe-code-an-mvp"
testStatus: "pending"
lastTested: null
lastVerified: 2026-11-24
tool:
  name: "Lovable"
  url: "https://lovable.dev"
  affiliateUrl: null
plans:
  - name: "Free"
    price: "$0"
    includes: "The pricing FAQ says a daily grant of 5 build credits, up to 30 a month, plus monthly grants of 20 Cloud credits and 4 credits for AI features in apps. The card lists 5 lovable.app domains and invite-only publishing for up to 10 people per project. No credit card."
    sourceUrl: "https://lovable.dev/pricing"
    checked: 2026-11-24
  - name: "Pro"
    price: "$25/month for 100 credits, or $250/year ($21/month)"
    includes: "100 credits for $25 a month, or $250 a year ($21 a month), with further tiers up to 10,000 credits. Daily grant of 5 build credits, and the docs say Pro has no monthly cap on that grant. Rollovers, on-demand top-ups, code editing, code download, custom domains and badge removal are on Pro."
    sourceUrl: "https://docs.lovable.dev/introduction/subscription-plans"
    checked: 2026-11-24
  - name: "Business"
    price: "$50/month for 100 credits, or $500/year ($42/month)"
    includes: "100 credits for $50 a month, or $500 a year ($42 a month), with further tiers up to 10,000 credits. The same credit count costs more than on Pro. Adds role-based access, workspace publish, SSO, a security center, design templates and priority support."
    sourceUrl: "https://docs.lovable.dev/introduction/subscription-plans"
    checked: 2026-11-24
  - name: "Enterprise"
    price: "Custom"
    includes: "The pricing page lists a platform fee and says Book a demo, with volume-based pricing. It does not print a dollar amount."
    sourceUrl: "https://lovable.dev/pricing"
    checked: 2026-11-24
verdicts:
  - situation: "You are trying an idea and you do not need your own domain."
    guidance: "The free plan is $0. The pricing FAQ caps build credits at 5 a day and 30 a month. The plan table still includes Git sync. It does not include code editing, a zip download, a custom domain, or badge removal. The parent use case says not to launch on Free."
  - situation: "You want the first paid plan that can edit code, download it, and use a custom domain."
    guidance: "Pro starts at 100 credits for $25 a month, or $250 a year, which the docs print as $21 a month. Higher credit tiers cost more. Annual billing is described as two months free compared with paying monthly."
  - situation: "A class or a team will share one workspace."
    guidance: "The pricing FAQ says plans are priced by credits, not by seats, and that members are unlimited on every plan. Owners can set a monthly credit limit per member. Business is the plan that adds SSO, role-based access and workspace publish. Its 100-credit tier is $50 a month, against $25 on Pro."
  - situation: "You are a student or a teacher."
    guidance: "The pricing page says up to 50% off Lovable Pro. The docs say 50% off for up to 12 months, only on Pro with 100 credits a month, billed monthly, and only from a Free workspace after Lovable verifies an academic email. Higher tiers and annual billing are not included in that discount."
faqs:
  - question: "What is Lovable pricing?"
    answer: "On 24 Nov 2026 the pricing page lists Free at $0, Pro at $25 a month for 100 credits, and Business at $50 a month for 100 credits. A Yearly control says 2 months free. The subscription-plans doc prints the rest of the credit tiers, in US dollars, and the annual charge for the 100-credit Pro tier as $250 a year ($21 a month). Enterprise is a platform fee with no dollar amount on the pricing page. This is not a hands-on test."
  - question: "How do Lovable credits work?"
    answer: "The pricing FAQ says a credit is the unit Lovable uses for building, Cloud hosting and AI features, and that a credit is not necessarily worth the same amount on every plan. Plan Mode is 1 credit per message. Default Mode varies by task. The same FAQ gives examples: 0.50 credits to make a button gray, 0.90 to remove a footer, 1.20 to add sign-up and login, and 1.70 to build a landing page with images. Monthly credits on a monthly plan expire two months after they are issued. Annual-plan credits expire one month after the annual period ends. Top-up credits last 12 months. Daily build credits expire at the end of the day and do not roll over. The page does not state a single dollar price for one credit."
  - question: "What are the Lovable free plan limits?"
    answer: "The pricing FAQ says Free includes 5 build credits a day, up to 30 a month, plus 20 Cloud credits a month and 4 credits for AI features in apps. The docs add that after the monthly cap, the daily grant stops until the 1st of the next month at 00:00 UTC, and that unused daily credits do not count toward the cap. The plan table includes Git sync and up to 10 invited viewers per project. It does not include editing code, downloading code, a custom domain, or removing the Edit with Lovable badge. The pricing card also lists 5 lovable.app domains on Free."
  - question: "Does Lovable Pro include more than 100 credits?"
    answer: "Yes. The docs say Pro and Business come in monthly tiers from 100 to 10,000 credits. Pro's 100-credit tier is $25 a month or $250 a year. The 10,000-credit Pro tier is $2,250 a month or $22,500 a year, printed as $1,875 a month. Business starts at $50 a month for 100 credits. The same credit count costs more on Business than on Pro. The pricing FAQ says that is because Business adds team features, and that run and AI usage of a credit is not a higher dollar rate on Business."
  - question: "Has Lovable's pricing been hands-on tested?"
    answer: "This page is pending a hands-on test. The directory has no hands-on note for Lovable. The parent use case's 10 Nov 2026 note is a Spacefast publish only, and that note says Lovable was not part of it. The planned task is a to-do app with email login, per-user data and a public URL. It has not been run."
---

Prices checked 24 Nov 2026. Prices are in US dollars, as Lovable prints them. Nothing here is converted to pounds. The pricing page and the subscription-plans doc were both fetched that day. Where they disagree, both sentences are quoted.

## What a credit pays for

The pricing FAQ says paid plans have a credit balance that can cover building (messages to Lovable), hosting with Cloud, and AI features inside the app. Pro and Business also include grants on top of that balance. The docs table lists those grants as 5 build credits a day, 20 Cloud credits a month and 4 AI credits a month, on Free, Pro and Business. Enterprise is a dash in those rows.

The pricing card says credits roll over for 1 month on monthly plans, or until one month after the end of an annual plan. The FAQ states the same rule as an expiry: monthly credits expire two months after they are issued, and annual credits expire one month after the annual period ends. Top-ups last 12 months from purchase. Daily grants do not roll over.

The docs say Pro and Business do not have a monthly cap on the daily 5 build credits. The pricing FAQ says some regional plans cap that paid daily grant at 30 a month. It does not name the regions. This page does not pick a region or a cap the pages do not name.

Cancelling keeps the remaining credits until the end of the billing period, then the workspace goes back to Free. The FAQ says credits are not refundable.

## Credit tiers

The pricing page shows the first tier of each paid plan: Pro $25 a month and Business $50 a month, both for 100 monthly credits, with a Yearly label of 2 months free. It does not print the higher tiers in the HTML fetched on 24 Nov 2026. Those tiers are in the subscription-plans doc, which says "Prices in USD. The annual column shows the yearly charge and the equivalent monthly rate." Annual billing "gives you two months free compared with paying monthly." Monthly credits on an annual plan are still issued monthly.

<div class="table-scroll">
<table>
  <caption>Pro tiers, from the subscription-plans doc, 24 Nov 2026</caption>
  <thead>
    <tr><th>Monthly credits</th><th>Monthly billing</th><th>Annual billing</th></tr>
  </thead>
  <tbody>
    <tr><td>100</td><td>$25</td><td>$250 ($21/month)</td></tr>
    <tr><td>200</td><td>$50</td><td>$500 ($42/month)</td></tr>
    <tr><td>400</td><td>$100</td><td>$1,000 ($84/month)</td></tr>
    <tr><td>800</td><td>$200</td><td>$2,000 ($167/month)</td></tr>
    <tr><td>1,200</td><td>$294</td><td>$2,940 ($245/month)</td></tr>
    <tr><td>2,000</td><td>$480</td><td>$4,800 ($400/month)</td></tr>
    <tr><td>3,000</td><td>$705</td><td>$7,050 ($588/month)</td></tr>
    <tr><td>4,000</td><td>$920</td><td>$9,200 ($767/month)</td></tr>
    <tr><td>5,000</td><td>$1,125</td><td>$11,250 ($938/month)</td></tr>
    <tr><td>7,500</td><td>$1,688</td><td>$16,880 ($1,407/month)</td></tr>
    <tr><td>10,000</td><td>$2,250</td><td>$22,500 ($1,875/month)</td></tr>
  </tbody>
</table>
</div>

<div class="table-scroll">
<table>
  <caption>Business tiers, from the same doc, 24 Nov 2026</caption>
  <thead>
    <tr><th>Monthly credits</th><th>Monthly billing</th><th>Annual billing</th></tr>
  </thead>
  <tbody>
    <tr><td>100</td><td>$50</td><td>$500 ($42/month)</td></tr>
    <tr><td>200</td><td>$100</td><td>$1,000 ($84/month)</td></tr>
    <tr><td>400</td><td>$200</td><td>$2,000 ($167/month)</td></tr>
    <tr><td>800</td><td>$400</td><td>$4,000 ($334/month)</td></tr>
    <tr><td>1,200</td><td>$588</td><td>$5,880 ($490/month)</td></tr>
    <tr><td>2,000</td><td>$960</td><td>$9,600 ($800/month)</td></tr>
    <tr><td>3,000</td><td>$1,410</td><td>$14,100 ($1,175/month)</td></tr>
    <tr><td>4,000</td><td>$1,840</td><td>$18,400 ($1,534/month)</td></tr>
    <tr><td>5,000</td><td>$2,250</td><td>$22,500 ($1,875/month)</td></tr>
    <tr><td>7,500</td><td>$3,300</td><td>$33,000 ($2,750/month)</td></tr>
    <tr><td>10,000</td><td>$4,300</td><td>$43,000 ($3,584/month)</td></tr>
  </tbody>
</table>
</div>

Students and teachers: the docs say 50% off for up to 12 months on the Pro plan with 100 credits a month, billed monthly. Verification is an academic email, only while the workspace is on Free, and each person can use it once. Credit top-ups stay at standard prices. The pricing page's own line is "up to 50% off Lovable Pro", which is wider than the doc. Both are quoted.

## Free plan, and what is paid

The plan table on the docs page, read on 24 Nov 2026:

- Unlimited workspace members, private projects, and Git sync to GitHub, GitLab and Bitbucket are on every plan, including Free.
- Publish to invited people only: up to 10 people per project on Free and Pro. Business and Enterprise are marked Yes.
- Edit code, download code, custom domains, removing the Edit with Lovable badge, and design systems start on Pro.
- The pricing card adds 5 lovable.app domains on Free, and unlimited lovable.app domains on Pro.

The pricing FAQ says you own the projects and code you build, subject to third-party rights in the underlying models. That is Lovable's statement, not a legal review, and it has not been checked by exporting a project.

Hosting: the FAQ says that for most smaller or new apps the included grant covers publishing and running the app, and that heavier traffic can draw on the credit balance. No traffic number is printed on the pages read today.

## What is not on these pages

No dollar price for a single credit. No named list of the regional plans whose daily grant is capped at 30 a month. No Enterprise platform fee in dollars. No count for the "daily chat allowance", which the docs describe as included, and larger than Free on Pro and Business, without a number.

Pending hands-on test. Nothing on this page was measured inside a Lovable account. The parent page is [Vibe-code an MVP](../../use-cases/vibe-code-an-mvp/). The same job's comparison is [Lovable vs Bolt.new](../../compare/lovable-vs-bolt/), and the shortlist is [AI app builders for non-coders](../../best/ai-app-builders-for-non-coders/). Editor pricing for the refine step is [Cursor pricing](../cursor/).

Sources, fetched 24 Nov 2026: [lovable.dev/pricing](https://lovable.dev/pricing) and [Lovable subscription plans](https://docs.lovable.dev/introduction/subscription-plans).
