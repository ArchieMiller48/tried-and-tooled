---
title: "AI code review for your pull requests"
job: "Get every PR reviewed automatically for bugs, security issues and AI-generated slop before merging"
summary: "A second pair of (AI) eyes on every pull request. This matters most when most of your code is written by an agent."
audience: ["vibe-coders", "builders"]
category: "Code quality"
topPick:
  name: "CodeRabbit"
  url: "https://www.coderabbit.ai"
  why: "Dedicated PR reviewer covering GitHub/GitLab PRs, the CLI and the IDE, with one-click fixes, pre-merge checks and slop detection. Free forever on public repositories."
  pricing:
    summary: "Essentials $24/user/mo billed annually ($30 monthly); Team $48/user/mo annually ($60 monthly). Free for public repos."
    sourceUrl: "https://www.coderabbit.ai/pricing"
    checked: 2026-10-26
  affiliateUrl: null
budgetPick:
  name: "Greptile (Starter)"
  url: "https://www.greptile.com"
  why: "A free tier for a single developer, with unlimited repos and 50 review credits a month (a base review costs 1 credit). Enough for a solo builder's private projects."
  pricing:
    summary: "Starter free (1 active developer, 50 credits/mo, unlimited repos). Pro has no seat fee: $1 per credit, shared across the org. A base review costs 1 credit."
    sourceUrl: "https://www.greptile.com/pricing"
    checked: 2026-10-26
  affiliateUrl: null
avoid:
  name: "Turning on org-wide Copilot code review for unlicensed users without a budget"
  reason: "Owners can let people without a Copilot licence request reviews. Those reviews are billed to the organisation as AI credits, and the agentic part of a review also uses GitHub Actions minutes. Set a budget before you turn that on."
  sourceUrl: "https://docs.github.com/en/copilot/concepts/agents/code-review"
stack:
  - step: "Write"
    tool: "Your AI coding agent or builder"
    role: "Generate the change in a branch, never directly on main."
  - step: "Review"
    tool: "CodeRabbit (or Greptile)"
    role: "Automatic review on every PR: bugs, security and style."
  - step: "Gate"
    tool: "Pre-merge checks + CI tests"
    role: "Block merges until review findings and tests pass."
alsoConsidered:
  - name: "GitHub Copilot code review"
    url: "https://github.com/features/copilot/plans"
    note: "Convenient if you already pay for Copilot; PR review is part of the plans and consumes AI credits."
    pricing:
      summary: "Free (limited); Pro $10/mo; Pro+ $39/mo; Max $100/mo. GitHub lists total monthly AI credits of $15 (Pro), $70 (Pro+) and $200 (Max), including a variable flex allotment."
      sourceUrl: "https://github.com/features/copilot/plans"
      checked: 2026-10-26
  - name: "Cursor Bugbot"
    url: "https://cursor.com/pricing"
    note: "If you already pay for Cursor Premium or above, AI code reviews via Bugbot are included in the plan, so try it before adding another tool."
    pricing:
      summary: "Included from Premium $30/mo (not on Free or Plus). Third-party models billed separately at API list price."
      sourceUrl: "https://cursor.com/pricing"
      checked: 2026-10-26
testStatus: "pending"
lastTested: null
lastVerified: 2026-10-26
testNotes: "Pending hands-on test. Planned standard task: open the same PR, containing 5 seeded bugs (an injection, a missing auth check, an off-by-one, a leaked secret, a race condition), against each reviewer and count true positives, false positives and the time to the first comment."
---

## Why this matters for vibe coders

AI agents write plausible code quickly, and that includes plausible bugs. An automated reviewer on every PR is the cheapest insurance you can buy.

## How to choose

- **Public or open-source repo:** CodeRabbit is free.
- **Solo, private repos, £0 budget:** Greptile Starter.
- **Small team that ships daily:** CodeRabbit Essentials or Team.
