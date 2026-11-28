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
    checked: 2026-11-23
  affiliateUrl: null
budgetPick:
  name: "Datastripes Public"
  url: "https://datastripes.com"
  why: "If you will not connect a bank, export a CSV yourself and chart it. On 9 November 2026 the Datastripes homepage listed a Public plan at €0, with a Made with Datastripes credit on every embed, and Pro at €19/month for private projects without that credit. You bring the file. Nothing here connects to a bank."
  pricing:
    summary: "Public €0, with a Made with Datastripes credit. Pro €19/month for private projects without that credit."
    sourceUrl: "https://datastripes.com"
    checked: 2026-11-23
  affiliateUrl: null
  handsOn: 2026-11-28
  handsOnSummary: "Datastripes Public on the datastripes.com hero uploader, 28 Nov 2026, signed out. No account, no email and no card. No bank was connected. The file was a synthetic 34-row October bank-style CSV made for the test, with columns date, description, category and amount_gbp. Negatives are spending. It includes salary 1,850, rent, groceries, bills, transport, eating out, subscriptions, a 29.99 Amazon purchase plus its refund, and a 100 transfer from savings. It is not a real bank export. The uploader says \"No account needed. Your file is read only in this browser and never uploaded. Try it on up to 2 files\". That claim was not independently verified. There was no sign-up wall, captcha or card before the results. The result appeared almost instantly: 0.19 seconds from file pick to \"34 rows\", timed inside the page, on a repeat load. Selecting each category alone in the Category filter, all 10 category totals matched a hand/Python sum: Rent -725, Groceries -225.82, Bills -207.50, Eating out -93.85, Transport -61.20, Entertainment -47.99, Subscriptions -42.97, Shopping -14.50 (net of the refund), Transfer 100, Income 1,850. Filtering to Groceries showed exactly the 8 grocery rows behind the -225.82 total. Shopping showed its 3 rows, including the refund. The rows behind a total are one click away. The headline \"TOTAL AMOUNT GBP\" was 531.17, the net of all rows including salary, the transfer and the refund. There is no spend-only total. True spending in the file was -1,448.82. The auto story headline was \"WHY INCOME LEADS AMOUNT GBP\" and it said \"Category is well spread, with no value taking the lead\", although rent was about half of spending. The data table shows a € sign on every amount (for example \"€-725.00\") though the column is GBP. One auto insight was wrong: \"TOP 12 DESCRIPTION BY AMOUNT GBP\" said the lowest was \"VODAFONE DD (-18)\" though rent was -725. The table was sorted by amount, with no date column shown. The header read \"2/2 free projects\", the file was \"not saved\", and the page said \"Sign up free to keep it\". A \"Made with Datastripes · Sign up to export\" badge and faint watermarks were on the page. Export needs sign-up. The arithmetic was right and checkable. Read the per-category totals, not the headline total or the auto story. Datastripes is generic data, not a budgeting app: it does not separate spending from income or transfers. Claude Personal Finance was not part of this check."
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
lastVerified: 2026-11-23
testNotes: "Hands-on note, 28 Nov 2026: Datastripes Public only, on the datastripes.com hero uploader, signed out. No account, no email and no card. No bank was connected. The Datastripes half of the standard task was run with a synthetic 34-row October bank-style CSV made for the test (date, description, category, amount_gbp; negatives are spending). It includes salary 1,850, rent, groceries, bills, transport, eating out, subscriptions, a 29.99 Amazon purchase plus its refund, and a 100 transfer from savings. It is not a real bank export. The uploader says \"No account needed. Your file is read only in this browser and never uploaded. Try it on up to 2 files\". That claim was not independently verified. There was no sign-up wall, captcha or card before the results. The result appeared almost instantly: 0.19 seconds from file pick to \"34 rows\", timed inside the page, on a repeat load. Selecting each category alone in the Category filter, all 10 category totals matched a hand/Python sum: Rent -725, Groceries -225.82, Bills -207.50, Eating out -93.85, Transport -61.20, Entertainment -47.99, Subscriptions -42.97, Shopping -14.50 (net of the refund), Transfer 100, Income 1,850. Filtering to Groceries showed exactly the 8 grocery rows behind the -225.82 total. Shopping showed its 3 rows, including the refund. The rows behind a total are one click away. The headline \"TOTAL AMOUNT GBP\" was 531.17, the net of all rows including salary, the transfer and the refund. There is no spend-only total. True spending in the file was -1,448.82. The auto story headline was \"WHY INCOME LEADS AMOUNT GBP\" and it said \"Category is well spread, with no value taking the lead\", although rent was about half of spending. The data table shows a € sign on every amount (for example \"€-725.00\") though the column is GBP. One auto insight was wrong: \"TOP 12 DESCRIPTION BY AMOUNT GBP\" said the lowest was \"VODAFONE DD (-18)\" though rent was -725. The table was sorted by amount, with no date column shown. The header read \"2/2 free projects\", the file was \"not saved\", and the page said \"Sign up free to keep it\". A \"Made with Datastripes · Sign up to export\" badge and faint watermarks were on the page. Export needs sign-up. The arithmetic was right and checkable. Read the per-category totals, not the headline total or the auto story. Datastripes is generic data, not a budgeting app: it does not separate spending from income or transfers. Claude Personal Finance was not part of this check and stays pending. Prices were read on 23 Nov 2026. The standard task is still pending: from the same exported month of transactions, ask for category totals in Claude Personal Finance and from a CSV chart, then score whether each total matches a hand-added sum and whether the tool shows the rows behind it."
---

## Who this is for

Anyone who wants a plain-language look at a month of spending, including students and people running a small set of accounts, and who will still check the bank.

## How to choose

- **You are in the US, already on Claude Pro, Max or Ultra, and you want the accounts connected:** Personal Finance, read-only, then open the transactions. The product note is [Anthropic's 5 November article](https://claude.com/resources/articles/introducing-personal-finance-in-claude).
- **You will not connect a bank:** export a CSV and use Datastripes Public, or the sheet you already have. On 28 Nov 2026, Datastripes Public, signed out, charted a synthetic 34-row CSV. No bank was connected. Claude Personal Finance was not part of that check.
- **The question is a web source inside a cell, not a bank balance:** [Check a spreadsheet](../../use-cases/analyse-a-spreadsheet/).

No bank account was connected. On 28 Nov 2026 the Datastripes half of the standard task was run with a synthetic CSV. Claude Personal Finance is still pending, so the standard task on this page has not been run.

The note below is a check of Datastripes Public only, dated 28 Nov 2026. Signed out, with no account, no email and no card. The file was a synthetic CSV made for the test, not a real bank export. Claude Personal Finance was not part of it. Prices were read on 23 Nov 2026.

## Hands-on test (28 Nov 2026)

This note is for Datastripes Public, the budget pick. The check ran on 28 Nov 2026 on the hero uploader at [datastripes.com](https://datastripes.com). Signed out. No account, no email and no card. No bank was connected. Claude Personal Finance, the top pick, was not part of it.

The file was a synthetic 34-row October bank-style CSV made for the test. The columns were date, description, category and amount_gbp. Negatives are spending. It includes salary 1,850, rent, groceries, bills, transport, eating out, subscriptions, a 29.99 Amazon purchase plus its refund, and a 100 transfer from savings. It is not a real bank export.

The uploader says "No account needed. Your file is read only in this browser and never uploaded. Try it on up to 2 files". That claim was not independently verified. There was no sign-up wall, no captcha and no card before the results.

The result appeared almost instantly. It was 0.19 seconds from file pick to "34 rows", timed inside the page, on a repeat load.

Selecting each category alone in the Category filter, all 10 category totals matched a hand/Python sum:

- Rent -725
- Groceries -225.82
- Bills -207.50
- Eating out -93.85
- Transport -61.20
- Entertainment -47.99
- Subscriptions -42.97
- Shopping -14.50 (net of the refund)
- Transfer 100
- Income 1,850

Filtering to Groceries showed exactly the 8 grocery rows behind the -225.82 total. Shopping showed its 3 rows, including the refund. The rows behind a total are one click away.

The headline "TOTAL AMOUNT GBP" was 531.17. That is the net of all rows, including salary, the transfer and the refund. There is no spend-only total. True spending in the file was -1,448.82. The auto story headline was "WHY INCOME LEADS AMOUNT GBP". It said "Category is well spread, with no value taking the lead", although rent was about half of spending. The data table shows a € sign on every amount, for example "€-725.00", though the column is GBP. One auto insight was wrong. "TOP 12 DESCRIPTION BY AMOUNT GBP" said the lowest was "VODAFONE DD (-18)", though rent was -725. The table was sorted by amount, with no date column shown.

The header read "2/2 free projects". The file was "not saved". The page said "Sign up free to keep it". A "Made with Datastripes · Sign up to export" badge and faint watermarks were on the page. Export needs sign-up.

The arithmetic was right and checkable. Read the per-category totals, not the headline total or the auto story. Datastripes is generic data, not a budgeting app. It does not separate spending from income or transfers.

Claude Personal Finance was not part of this check and stays pending. No bank was connected.

The standard task on this page has not been run. That task is the same exported month of transactions, with category totals in Claude Personal Finance and from a CSV chart, then a score of whether each total matches a hand-added sum and whether the tool shows the rows behind it.

## Where this goes next

- The 28 Nov 2026 note is also listed on [Tested by us](../../tested/).
