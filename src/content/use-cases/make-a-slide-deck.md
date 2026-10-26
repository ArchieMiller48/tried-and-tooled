---
title: "Make a slide deck with AI"
job: "Turn notes, a doc or a rough outline into a presentation you can edit and export, without rebuilding every slide by hand"
summary: "A deck is a layout problem as much as a writing problem. Use a tool that exports to the format you actually present from, and don't start in ChatGPT Slides unless your plan includes it."
audience: ["everyday", "students", "founders", "marketers"]
category: "Productivity"
topPick:
  name: "Gamma"
  url: "https://gamma.app"
  why: "Gamma's pricing page is built around presentations: Free includes export to PDF, PPTX, PNG and Google Slides, with up to 10 slides per prompt. Plus removes Gamma branding, raises that cap to 100 slides per prompt and includes 1,000 credits a month."
  pricing:
    summary: "Free: 400 starter credits at signup (they do not refill), up to 10 slides per prompt. Plus $9/seat/month billed annually ($108/seat/year), 1,000 credits/month, branding removed."
    sourceUrl: "https://gamma.app/pricing"
    checked: 2026-10-26
  affiliateUrl: null
budgetPick:
  name: "Claude (Free)"
  url: "https://claude.com"
  why: "Claude's pricing table lists Claude Slides on every plan, including Free. You can ask for a deck from notes you already have, edit the slides, present inside Claude, and export. Pro is the step up if Free's usage runs out."
  pricing:
    summary: "Free $0, and Claude Slides is listed on Free. Pro $20/mo, or $17/mo billed annually ($200 up front)."
    sourceUrl: "https://claude.com/pricing"
    checked: 2026-10-26
  affiliateUrl: null
avoid:
  name: "ChatGPT Free, Go or Plus, for ChatGPT Slides"
  reason: "OpenAI's 20 October 2026 release notes say ChatGPT Slides is rolling out to eligible Pro, Business and Enterprise users with Space access. The pricing page lists ChatGPT Space on Pro, and not on Free, Go or Plus. A separate PowerPoint add-in is listed more widely; this page has not checked that add-in."
  sourceUrl: "https://help.openai.com/en/articles/6825453-chatgpt-release-notes"
stack:
  - step: "Outline"
    tool: "Your notes, or a draft from the writing page"
    role: "One idea per slide, and the decision you want from the room. Don't ask for a deck before the outline is right."
  - step: "Build"
    tool: "Gamma (or Claude Slides on a budget)"
    role: "Generate the deck from the outline. Attach a past deck if you want the same shape."
  - step: "Edit"
    tool: "The same tool"
    role: "Fix titles, numbers and anything the model invented. Charts need the source numbers, not a guess."
  - step: "Export"
    tool: "PPTX, PDF or Google Slides"
    role: "Leave with a file you can present if the vendor's site is down."
alsoConsidered: []
testStatus: "pending"
lastTested: null
lastVerified: 2026-10-26
testNotes: "Pending hands-on test. Planned standard task: turn the same 8-point outline into a 10-slide deck in each tool, then score whether every point landed on its own slide, whether numbers were invented, how long the export took, and whether the file opened in PowerPoint or Google Slides."
---

## Who this is for

Founders and creators who have the story already, in notes or a doc, and need a deck for a launch, a lesson or a client call.

## How to choose

- **You need a file you can brand and send:** Gamma Plus.
- **You already use Claude and the deck is occasional:** Claude Slides on Free, then Pro if you hit the usage limit.
- **The outline does not exist yet:** draft it on the [posts and emails](../../use-cases/write-posts-and-emails/) page first. A deck tool will not fix a muddy story.

## Sources

- What Claude Slides can export: the help centre says PowerPoint or PDF ([What are artifacts?](https://support.claude.com/en/articles/17153992-what-are-artifacts-and-how-do-i-use-them)). Claude's academy tutorial also describes export to Google Slides ([Making slides with Claude](https://academy.claude.com/tutorials/using-claude-design-for-presentations-and-slide-decks)). Both checked 26 Oct 2026.
- ChatGPT Space is listed on Pro and not on Free, Go or Plus: [ChatGPT pricing](https://openai.com/chatgpt/pricing/), checked 26 Oct 2026. That page did not print dollar prices in the HTML we read.
