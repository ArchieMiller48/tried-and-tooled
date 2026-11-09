---
title: "See where your money went"
job: "Look at a month of spending, in categories you can check, without giving an assistant the power to move the money"
summary: "A spending answer is only useful if you can see the transactions behind it. Use a read-only connection on a paid plan if you are in the rollout, or chart a file you exported yourself, and do not treat the total as the bank."
audience: ["everyday", "students", "small-business"]
category: "Productivity"
topPick:
  name: "Claude Personal Finance"
  url: "https://claude.com"
  why: "Anthropic's 5 November 2026 article says Personal Finance lets you connect bank and card accounts through Plaid and ask about balances, spending and bills. Access is read-only. It cannot move, manage or invest money, and it is not designed to give investment advice. The rollout is a beta on Pro, Max and Ultra in the US. Claude's pricing page lists Pro at $20/mo, or $17/mo billed annually."
  pricing:
    summary: "Pro $20/mo, or $17/mo billed annually ($200 up front). Max $100/mo. Ultra $200/mo. Personal Finance is a beta on those plans in the US, not a separate price."
    sourceUrl: "https://claude.com/pricing"
    checked: 2026-11-09
  affiliateUrl: null
budgetPick:
  name: "Datastripes Public"
  url: "https://datastripes.com"
  why: "If you will not connect a bank, export a CSV yourself and chart it. On 9 November 2026 the Datastripes homepage listed a Public plan at €0, with a Made with Datastripes credit on every embed, and Pro at €19/month for private projects without that credit. You bring the file. Nothing here connects to a bank."
  pricing:
    summary: "Public €0, with a Made with Datastripes credit. Pro €19/month for private projects without that credit."
    sourceUrl: "https://datastripes.com"
    checked: 2026-11-09
  affiliateUrl: null
avoid:
  name: "A Claude spending total you do not open"
  reason: "Anthropic's article says Claude can make mistakes, and tells you to ask which transactions sit behind a number and to check important figures with your bank. The same article says the tool is not designed to give investment advice, and that access is read-only. A category total is not a bank statement."
  sourceUrl: "https://claude.com/resources/articles/introducing-personal-finance-in-claude"
stack:
  - step: "The month"
    tool: "A question you write"
    role: "Name the month and what you want: categories, a bill that changed, or what is left before payday."
  - step: "The numbers"
    tool: "Claude Personal Finance, or a CSV you export"
    role: "Connect an account only inside the US beta on a paid Claude plan, or download a CSV from the bank and chart that file."
  - step: "The check"
    tool: "The transactions, then the bank"
    role: "Open the rows behind any total you might act on. If they do not match the bank, keep the bank's figure."
  - step: "A sheet, if you already live in one"
    tool: "The spreadsheet page"
    role: "Filling cells from the web is a different job. See that page if the question is a source link inside a sheet, not a bank connection."
alsoConsidered: []
testStatus: "pending"
lastTested: null
lastVerified: 2026-11-09
testNotes: "Pending hands-on test. Planned standard task: from the same exported month of transactions, ask for category totals in Claude Personal Finance and from a CSV chart, then score whether each total matches a hand-added sum and whether the tool shows the rows behind it. No bank was connected for this page."
---

## Who this is for

Anyone who wants a plain-language look at a month of spending, including students and people running a small set of accounts, and who will still check the bank.

## How to choose

- **You are in the US, already on Claude Pro, Max or Ultra, and you want the accounts connected:** Personal Finance, read-only, then open the transactions. The product note is [Anthropic's 5 November article](https://claude.com/resources/articles/introducing-personal-finance-in-claude).
- **You will not connect a bank:** export a CSV and use Datastripes Public, or the sheet you already have.
- **The question is a web source inside a cell, not a bank balance:** [Check a spreadsheet](../../use-cases/analyse-a-spreadsheet/).

This page has not connected a bank account. The standard task has not been run.
