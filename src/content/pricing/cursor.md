---
title: "Cursor pricing (2026): plans, Pro vs Pro+ and usage limits explained"
summary: "Free is $0. Plus is $8/month, Premium $30, Super $100 and Ultra $200. Pro and Pro+ are legacy plans. Prices checked 24 Nov 2026. Pending hands-on test."
targetQuery: "cursor pricing"
secondaryQueries:
  - "cursor pro vs pro plus"
  - "cursor usage limits"
parent: "vibe-code-an-mvp"
testStatus: "pending"
lastTested: null
lastVerified: 2026-11-24
tool:
  name: "Cursor"
  url: "https://cursor.com"
  affiliateUrl: null
plans:
  - name: "Free"
    price: "$0"
    includes: "Limited AI usage. The pricing table says limited Agent requests and limited Chat requests. It does not print a number. Third-party models are not available. Cloud agents, Origin and Bugbot are not on Free."
    sourceUrl: "https://cursor.com/pricing"
    checked: 2026-11-24
  - name: "Plus"
    price: "$8/month"
    includes: "The card calls this the introductory plan and a shared AI usage pool. The footnote says only Grok models are available. The compare table marks Cloud agents, Origin, Bugbot and third-party models off. Prices exclude tax."
    sourceUrl: "https://cursor.com/pricing"
    checked: 2026-11-24
  - name: "Premium"
    price: "$30/month"
    includes: "4x the usage of Plus, on the compare table. Adds Cloud agents and automations, code hosting via Origin, AI code reviews via Bugbot, and third-party models at API list price, billed separately."
    sourceUrl: "https://cursor.com/pricing"
    checked: 2026-11-24
  - name: "Super"
    price: "$100/month"
    includes: "15x Plus usage, and priority model access at peak times. Third-party models stay at API list price, billed separately."
    sourceUrl: "https://cursor.com/pricing"
    checked: 2026-11-24
  - name: "Ultra"
    price: "$200/month"
    includes: "50x Plus usage, and earliest access to products and models. Third-party models stay at API list price, billed separately."
    sourceUrl: "https://cursor.com/pricing"
    checked: 2026-11-24
  - name: "Teams"
    price: "from $30/user/month"
    includes: "The card says $30+ per user a month. The compare table's usage cell says 4–50x Plus. Enterprise on the same table is Custom."
    sourceUrl: "https://cursor.com/pricing"
    checked: 2026-11-24
  - name: "Pro (legacy)"
    price: "$20/month"
    includes: "Not sold to new customers. The legacy-plans doc maps Pro to Premium on the current subscription. It includes two monthly pools, Cursor Models and Other Models, plus Bugbot, Cloud Agents, Automations and Origin. The doc says Pro+ includes more of each pool than Pro. It does not print how much more."
    sourceUrl: "https://cursor.com/docs/account/pricing/legacy-cursor-plans"
    checked: 2026-11-24
  - name: "Pro+ (legacy)"
    price: "$60/month"
    includes: "Not sold to new customers. The legacy-plans doc maps Pro+ to Super. Same features as legacy Pro, with more of each monthly pool. The doc does not print a multiple. Existing subscribers can still move from Pro to Pro+ without switching to the current plans."
    sourceUrl: "https://cursor.com/docs/account/pricing/legacy-cursor-plans"
    checked: 2026-11-24
verdicts:
  - situation: "You are a new customer and you want Cursor for the editing step of an MVP."
    guidance: "The current plans are Free, Plus, Premium, Super and Ultra, sold as The X Subscription. Plus is $8 a month and the pricing page says only Grok models are on it. Third-party models start on Premium at $30 a month, billed at API list price on top of that subscription. The parent use case names Cursor for precise edits after a builder, not as the chat-to-app tool."
  - situation: "You already pay for Cursor Pro or Pro+."
    guidance: "Those names are legacy. Pro is $20 a month and Pro+ is $60 a month, for existing subscribers. They keep working until you change or cancel. The closest current tiers are Premium at $30 a month and Super at $100 a month. The legacy doc says each current paid plan includes at least twice as much Cursor-model coding usage as the legacy plan it replaces, and that third-party models stop being included."
  - situation: "You want to know when usage stops."
    guidance: "Current paid plans have one weekly pool for Cursor's own models, shared with Grok. The pricing page and the docs do not print the pool as a token or request count. They print multipliers against Plus: 4x on Premium, 15x on Super, 50x on Ultra. When the pool runs out you wait for the weekly reset, use prepaid credit, or move up a tier. Requests are not downgraded."
  - situation: "You only need a free editor to look at a repo."
    guidance: "Free is $0 with limited Agent and Chat. No request count is published. Cloud agents, Origin and Bugbot are not on Free or Plus. They start on Premium."
faqs:
  - question: "Is Cursor free?"
    answer: "Yes. On 24 Nov 2026 cursor.com/pricing lists Free at $0. It says limited Agent requests and limited Chat requests, and it does not print a number. Third-party models, Cloud agents, Origin and Bugbot are not on Free. This is not a hands-on test."
  - question: "What is Cursor pricing?"
    answer: "On 24 Nov 2026 cursor.com/pricing lists Free at $0, Plus at $8 a month, Premium at $30 a month, Super at $100 a month and Ultra at $200 a month. Teams starts at $30+ per user a month. Enterprise is Custom. The docs add annual prices of $80, $300, $1,000 and $2,000 a year for Plus, Premium, Super and Ultra. Prices exclude tax. Third-party model usage is not included in those monthly prices. This is not a hands-on test."
  - question: "What is the difference between Cursor Pro and Pro+?"
    answer: "Pro and Pro+ are legacy plans. New customers do not get them. The legacy-plans doc lists Pro at $20 a month and Pro+ at $60 a month. Both include two monthly usage pools, unlimited Tab completions, Bugbot, Cloud Agents, Automations, Origin and the Cursor SDK. Pro+ includes more of each pool than Pro. The doc does not say how many tokens or requests that extra pool is. It maps Pro to Premium ($30 a month) and Pro+ to Super ($100 a month) as the closest current tiers, not as identical ones. Switching to the current subscription is optional and permanent."
  - question: "What are Cursor's usage limits?"
    answer: "Current paid plans include one weekly pool for Grok 4.7, Grok 4.6, Grok 4.5 and Composer 2.5, shared across Cursor and Grok. It refreshes weekly and unused included usage does not roll over. Free is described as limited, with no number on the pricing page. Plus is the base pool. Premium is 4x Plus, Super is 15x Plus and Ultra is 50x Plus. The pages do not print the base pool in tokens or requests. Third-party models are not in the pool. On Premium and above they are billed at API list price from prepaid credit. On a legacy Pro or Pro+ plan the pools are monthly, and there are two of them: Cursor Models and Other Models."
  - question: "What happens when I hit Cursor's usage limit?"
    answer: "The usage-and-limits page says you get a notification in the editor. On the current plans you can wait for the weekly reset, keep going from prepaid credit, or upgrade. The models-and-pricing doc says requests are never downgraded in quality or speed. Prepaid credit does not reset with the weekly pool. That page says each top-up stays until it is used or until it expires, currently 365 days after purchase. On legacy Hobby, and on legacy Start, AI features pause until the pool resets. On-demand usage is not available there. Legacy Pro and Pro+ can turn on-demand usage on, billed monthly in arrears, with a spend limit you set."
  - question: "Has Cursor's pricing been hands-on tested?"
    answer: "This page is pending a hands-on test. The directory has no hands-on note for Cursor. The parent use case names Cursor as the editor step after a builder. Its recorded check on 10 Nov 2026 was Spacefast only. The standard task on that page has not been run."
---

Prices checked 24 Nov 2026. Prices are in US dollars, as Cursor prints them, except the India plan, which the legacy doc prints in rupees. Nothing here is converted to pounds. The pricing page does not list Pro or Pro+. Those prices are on the legacy-plans doc. Where the pricing page and the docs use different words for the same plan, both are quoted.

## Current plans

New customers buy The X Subscription. The pricing page describes it as one subscription for Grok, Cursor and X. The individual coding rows on that page, fetched on 24 Nov 2026:

- Free, $0 a month. Limited Agent requests and limited Chat requests. No number is printed.
- Plus, $8 a month. A shared usage pool. The footnote says only Grok models are available.
- Premium, $30 a month. 4x more usage than Plus. Cloud agents and automations, code hosting and AI code reviews, and third-party models at API list price.
- Super, $100 a month. 15x Plus, plus priority model access at peak times.
- Ultra, $200 a month. 50x Plus, plus earliest access to products and models.
- Teams, $30+ per user a month on the card. The compare table's usage cell says 4–50x Plus. The docs list the seat prices as $30, $100 or $200 a month.
- Enterprise, Custom. Pooled usage.

The pricing page says the prices do not include tax, and that third-party model usage is not included in the monthly price and must be bought separately. The same page recommends Premium for new AI users, Super for daily agent users, Ultra for power users, and Plus for social creators with limited AI usage.

The models-and-pricing doc adds the annual amounts: $80 a year for Plus, $300 for Premium, $1,000 for Super and $2,000 for Ultra. It does not call that "two months free". This page does not add that label.

Plus, in the docs: Agent on Grok 4.7, Grok 4.6, Grok 4.5 and Composer 2.5, at fixed settings (Fast off, medium effort, and a 256k context window on Grok 4.7). Also Grok Chat, Voice, Imagine, Build and Grok API access. No Auto, Cloud Agents, Automations, Bugbot, Origin, third-party models, or your own API keys. The pricing FAQ says "Plus includes Grok models only." The docs also name Composer 2.5. Both lines are on official pages. This page does not drop either one.

The pricing page's compare table turns Cloud agents, Origin, Bugbot and third-party models on from Premium upwards, and off on Free and Plus. It does not print a price for one Bugbot review. This page does not add one.

The Grok API is included as access on paid plans. The pricing FAQ says API usage is billed separately at standard model rates and does not draw from the plan's usage pool.

The pricing page also lists X benefits, including a premium checkmark and 𝕏 Money rates. Those rates are on that page. They are not repeated here, because this page is about the editor step on the MVP use case.

## Pro vs Pro+

Pro and Pro+ are the plans Cursor sold before The X Subscription. The legacy-plans doc says they are not available to new customers, and that existing subscribers keep the price and the features until they change or cancel. Switching is optional. If you switch, the doc says the change is permanent: the old subscription is cancelled with a prorated refund, and you pick a current plan.

<div class="table-scroll">
<table>
  <caption>Legacy individual and team prices, from the legacy-plans doc, 24 Nov 2026</caption>
  <thead>
    <tr><th>Legacy plan</th><th>Price</th><th>Closest current plan, as the doc maps it</th></tr>
  </thead>
  <tbody>
    <tr><td>Hobby</td><td>Free</td><td>Free</td></tr>
    <tr><td>Start (India only)</td><td>₹649/month, tax inclusive</td><td>Plus ($8/month). The doc says this mapping is an analogy only.</td></tr>
    <tr><td>Pro</td><td>$20/month</td><td>Premium ($30/month)</td></tr>
    <tr><td>Pro+</td><td>$60/month</td><td>Super ($100/month)</td></tr>
    <tr><td>Ultra</td><td>$200/month</td><td>Ultra ($200/month)</td></tr>
    <tr><td>Teams Standard</td><td>$40/user/month</td><td>Teams, Premium seat ($30/user/month)</td></tr>
    <tr><td>Teams Premium</td><td>$120/user/month</td><td>Teams, Super seat ($100/user/month)</td></tr>
  </tbody>
</table>
</div>

The doc says "comparable" means the closest tier, not an identical one. Each paid plan on the current subscription "includes at least twice as much coding usage with Cursor models as the legacy plan it replaces", adds Grok and X, and drops the included third-party allowance. It does not print the legacy pool sizes, so this page does not invent a token count for Pro or for Pro+.

What the same doc does say about the two pools: both reset monthly with the billing cycle. Cursor Models covers Grok 4.7, Grok 4.6, Grok 4.5 and Composer 2.5, on every legacy plan. Other Models covers third-party models at each model's API price, on Pro, Pro+, Ultra and Teams. Hobby and Start do not include Other Models. Pro, Pro+ and Ultra include Bugbot, Cloud Agents, Automations, Origin, the Cursor SDK, Fast mode and Grok effort levels. Pro+ and Ultra include more of each pool than Pro. Teams Premium "includes 5x the Standard allowance." That 5x line is about legacy team seats, not about Pro+.

On-demand usage on legacy Pro and Pro+ is off until you turn it on, then billed monthly in arrears, with a spend limit. Start and Hobby cannot turn it on. AI features pause until the pool resets.

## Usage limits

The usage-and-limits page, fetched the same day, separates the two generations:

- Current plans: one weekly pool for Cursor models, shared across Cursor, Grok Bot and the Grok apps. Third-party models are not included. On Premium and above they are billed at API list price from prepaid credit.
- Legacy plans: two monthly pools, as above. Pro, Pro+, Ultra and Teams include both. Start covers Cursor Models only.

The pricing FAQ says the allowance refreshes weekly, "so one heavy day never wipes out your whole month." If you reach the included usage you can keep going with what that FAQ calls top-offs, or wait. The docs call the same extra credit top-ups. A monthly additional-usage limit caps paid extra usage even if you hold more credit. When the weekly pool runs out, the models doc says you can wait, use prepaid credit, or upgrade, and that requests are never downgraded.

There is no published number for how many tokens or requests "limited", "base", or "4x Plus" equals. Model choice changes how fast the pool falls. Extra Cursor-model usage, past the pool, is billed at the per-million-token rates in the models doc. This page does not copy that rate table. The pricing page links it as the usage charges.

On Teams and Enterprise, the usage-and-limits page says requests made with your own API key still carry a Cursor Token Rate of $0.25 per million tokens when the model includes it. Individual plans do not pay that rate. Third-party models are exempt, including with your own key, when their cache-read price is strictly below $0.10 per million tokens on every pricing tier.

Current plans do not include Max Mode. On legacy request-based plans, Max Mode is the model's API rate plus 20%.

## What is not on these pages

No token or request count for Free, for the Plus pool, or for the Pro and Pro+ pools. No per-review price for Bugbot on the pricing page. No Enterprise dollar price. No hands-on measurement of how fast a pool runs out.

Pending hands-on test. The parent page is [Vibe-code an MVP](../../use-cases/vibe-code-an-mvp/). [Lovable vs Cursor](../../compare/lovable-vs-cursor/) lines up the free plans and the first paid step. Both tools stay pending a hands-on test, and that page does not change the picks. The shortlist that places Cursor after the builders is [AI app builders for non-coders](../../best/ai-app-builders-for-non-coders/). Builder pricing for the first step is [Lovable pricing](../lovable/).

Sources, fetched 24 Nov 2026: [cursor.com/pricing](https://cursor.com/pricing), [Models and pricing](https://cursor.com/docs/account/pricing), [Pricing and plans](https://cursor.com/help/account-and-billing/pricing), [Legacy Cursor plans](https://cursor.com/docs/account/pricing/legacy-cursor-plans) and [Usage and limits](https://cursor.com/help/models-and-usage/usage-limits).
