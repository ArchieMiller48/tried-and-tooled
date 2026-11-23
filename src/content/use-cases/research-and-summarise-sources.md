---
title: "Research and summarise sources with AI"
job: "Find papers on a question, or read sources you already have, and get a summary you can check against the original"
summary: "A summary is only useful if you can open the source. Use a tool that searches papers and shows where each claim came from, and keep a free plan for reading what you already collected."
audience: ["students", "researchers", "everyday"]
category: "Study & research"
topPick:
  name: "Consensus Pro"
  url: "https://consensus.app"
  why: "Consensus's help centre lists Pro at $20/month or $144/year, with unlimited Pro messages and 15 Deep reviews a month. Free is $0 and includes unlimited paper search, but only 10 Pro messages and 3 Deep reviews a month. Pro is the plan that covers a real literature pass rather than a short trial of the paid features."
  pricing:
    summary: "Pro $20/mo, or $144/year ($12/mo billed annually). Includes unlimited Pro messages and 15 Deep reviews a month."
    sourceUrl: "https://help.consensus.app/en/articles/10087865-subscription-plans"
    checked: 2026-11-02
  affiliateUrl: null
budgetPick:
  name: "Elicit Basic"
  url: "https://elicit.com"
  why: "Elicit's pricing page lists Basic as free, with unlimited search across more than 138 million papers, unlimited summaries, and unlimited chat with papers that have full text. Research Agent and Research Reports usage is limited. Enough to summarise sources without a subscription."
  pricing:
    summary: "Basic: Free. Limited Research Agent and Research Reports. Unlimited search across more than 138 million papers, unlimited summaries, and unlimited chat with full-text papers."
    sourceUrl: "https://elicit.com/pricing"
    checked: 2026-11-23
  affiliateUrl: null
avoid:
  name: "Consensus Free, for a long literature review"
  reason: "Consensus's help centre says Free includes 10 Pro messages and 3 Deep reviews a month. That is a short look at the paid features, not a review you will finish. Paper search on Free is unlimited, so use it to find papers, then move the reading to a plan that can summarise them."
  sourceUrl: "https://help.consensus.app/en/articles/10087865-subscription-plans"
alsoConsidered:
  - name: "Gemini Notebook"
    url: "https://notebook.google.com/"
    note: "For sources you already have, not for searching the literature. Google's help page says you can sign up free of charge with a Gmail account. The standard plan lists 100 notebooks per user and 50 sources per notebook."
    pricing:
      summary: "Free with a Gmail account. 100 notebooks per user and 50 sources per notebook."
      sourceUrl: "https://support.google.com/gemininotebook/answer/16213268?hl=en"
      checked: 2026-11-23
  - name: "Perplexity (Free)"
    url: "https://www.perplexity.ai"
    note: "A cited answer from the web, not a search of the scholarly index. On 2 Nov 2026 a free account (email code, no card) answered one evidence question in Search mode. Every model in the picker was locked, and the prompt box had no Deep Research or Pro Search control."
    pricing:
      summary: "Free $0/month. Pro $17/month when billed annually. Max $167/month when billed annually."
      sourceUrl: "https://www.perplexity.ai/hub/pricing"
      checked: 2026-11-02
  - name: "Fack'd"
    url: "https://fackd.com"
    note: "A fact-check of claims in a YouTube interview or debate, while the video plays. It does not search papers. On 21 Nov 2026 a free account, signed in with an email code and no password, checked a 6-minute TalkTV debate. The first claim appeared about a minute in. The check found 3 claims. Two sources were opened, and both supported the ratings. Speaker labels were wrong. The 10 free checks fell by about one per minute of video. Autoplay kept checking the next video, so the 6-minute check cost 6 of 10. Videos longer than about 10 minutes, the Chrome extension and Premium were not tested. This is not the standard task. Consensus Pro and Elicit Basic were not part of it."
    pricing:
      summary: "Free $0 (watch checked videos with no account; 10 free checks after sign-up). Premium $12/mo. Pro $49/mo."
      sourceUrl: "https://fackd.com/pricing"
      checked: 2026-11-23
stack:
  - step: "Question"
    tool: "A sentence you write"
    role: "Name the question, the kind of source you will accept, and what the summary has to answer."
  - step: "Find papers"
    tool: "Consensus"
    role: "Search the question. Open the papers behind any claim before you keep it."
  - step: "Summarise what you have"
    tool: "Elicit Basic, or Gemini Notebook"
    role: "Elicit for papers in its index. Gemini Notebook when the sources are files you already downloaded."
  - step: "Write it up"
    tool: "Your own doc"
    role: "Keep quotes and links next to the summary. If the same notes have to become a post or a deck, use the pages linked below."
testStatus: "pending"
lastTested: null
lastVerified: 2026-11-09
testNotes: "Hands-on note, 26 Oct 2026: a free Consensus account gave 10 Pro searches a month. A test query returned a cited answer and a Consensus Meter in about 25 seconds, and a full report in about 60 seconds. Elicit was not part of this check. Hands-on note, 2 Nov 2026: Perplexity Free, signed in with an email code and no card, was asked whether creatine improves cognition in healthy adults. The Search answer finished within about 9 seconds, with 10 journal, PMC or regulator sources (no news or blogs) and an inline citation on each claim. Xu et al. 2024 (Frontiers in Nutrition) and an EFSA health-claim page supported the claims that were opened. Prokopidis 2023 was not checked (publisher wall). A follow-up on which studies were randomised controlled trials finished in about 10 seconds (the page said Finished 3s), named two primary RCTs, added a small-sample caveat, and was not checked against the sources. Every model in the picker was locked. Deep Research and Pro Search were not shown. A banner read: Pro · Free preview of advanced search enabled. Computer sat next to Search. No usage limit appeared on these two queries. Elicit and Gemini Notebook were not part of this check. Hands-on note, 21 Nov 2026: Fack'd only, a fact-check of a YouTube interview or debate at https://fackd.com, signed in with an email code and no password. It is not this page's standard task. Consensus Pro and Elicit Basic were not part of this check. Signed out, the homepage was DOM-ready in 0.5 seconds and load was 0.7 seconds. It showed a search box, Search YouTube or paste a link, Add to Chrome, and First 10 checks free. An already-checked video, Elon Musk Says He's 'Not MAGA' (NYT), was DOM-ready in 0.35 seconds and showed 3 claims: Supported at 0:53 (SpaceX IPO biggest listing), Missing context at 7:14, and Misleading at 17:17 (Russia disabled all communications). It was unclear whether the signed-out list is capped. The Supported claim's source, a Houston Public Media/NPR article, SpaceX IPO makes history as largest ever, says the IPO raised some $75 billion and shattered records, so it supports the rating. The Misleading claim's source, the Wikipedia page Starlink in the Russo-Ukrainian war, was checked at the opening section only, and only weakly or partly supports the rating. Sign-up says: No password. We'll send a 6-digit code that works for 10 minutes. The options are an email code or Google. A code was requested at about 11:16 and arrived at 11:16:43. There was no captcha, no SMS and no card. Signed in, the counter read 10 free checks left, and About 6 min · 10 free checks left. The free check used a video that was not in the library: They Should All Just SHUT UP! | Lisa Nandy Hits Back Over Remembrance Sunday Row (TalkTV, 6:04). Searches for a Nov 2026 Kuenssberg or budget interview found nothing. The check started at about 11:18:20. The first claim appeared at about 11:19:25, at 0:38. Checks run in real time as the video plays, from the captions. The check finished at about 11:24, when the video ended. The result was 3 claims: 2 Supported, at 2:02 and 4:17, and 1 Missing context, at 0:38. None were Misleading or False. The 0:38 source, an RTE article on removing conditional immunity from prosecution and Attorney General consent, supports the rating. The 4:17 source, a LabourList article, Labour ends co-operation with Greens in 11 local councils, supports the claim that Labour councils are pulling out of agreements with Greens. That is 2 of 2. Speaker labels were wrong. Claims were attributed to the host, Jeremy Kyle, even when a panellist said them. The counter fell about one per minute of video, from 10 to 9, then 8, then 7, then 5. The 10 free checks behaved like about 10 minutes of checking, not 10 videos. Autoplay moved on to an unrelated Daily Show clip, and Fack'd kept checking until Stop checking was clicked. The counter then read 4 left, so the 6-minute video plus the overrun cost 6 of 10. Nothing was visibly locked. The only upsell was a Go Premium button. There were no errors. Videos longer than about 10 minutes, length limits, the Chrome extension, live streams and Premium were not tested. Prices read on 20 Nov 2026: Free $0 (watch checked videos with no account; 10 free checks after sign-up), Premium $12/mo, Pro $49/mo. On 21 Nov 2026 Elicit Basic, the budget pick, could not be hands-on tested. Try now on elicit.com goes straight to sign-up. Email sign-up requires a password. The other options are GitHub, Google and single sign-on. There is no email code or magic link. No captcha or SMS was seen. Nothing was submitted, and no account was created. Signed-out search was not tried. There was no visible signed-out path from Try now. Hidden text on the homepage, aimed at AI agents, was ignored. Elicit Basic stays pending. The standard task is still pending: from the same research question and the same five PDFs, produce a 300-word summary in each tool, then score how many claims link to a real passage in those sources, how many claims are not in the sources, and what the published plan costs for that one task."
---

## Who this is for

Students, researchers and anyone else who has to read a pile of sources and say what they found, without inventing citations.

## How to choose

- **You need papers you do not already have:** Consensus Pro, then open the cited paper.
- **You already have the papers and you are not paying yet:** Elicit Basic.
- **The sources are your own files, not a literature search:** Gemini Notebook's free plan, within the notebook and source caps on [Google's help page](https://support.google.com/notebooklm/answer/16206866?hl=en).
- **You want a cited answer from the open web, not a paper index:** Perplexity Free. On 2 Nov 2026 the model list was locked.
- **You want claims in a YouTube interview or debate checked while it plays:** Fack'd. On 21 Nov 2026 a free check used an email code and no password. It does not search papers. Consensus Pro and Elicit Basic were not part of that check.

Consensus's guide says the product searches scholarly articles and writes an answer where each sentence links to a paper. Test notes record one dated Consensus check from 26 Oct 2026, a Perplexity Free check from 2 Nov 2026, and a Fack'd check from 21 Nov 2026. On 21 Nov 2026 Elicit Basic could not be tested, because email sign-up requires a password. The standard task on this page has not been run. Read the guide at [docs.consensus.app](https://docs.consensus.app/get-started/what-is-consensus), then check the paper yourself.

The note below is a free check of Fack'd only, dated 21 Nov 2026. Sign-in was an email code, with no password. Consensus Pro and Elicit Basic were not part of it. The standard task on this page has not been run.

## Hands-on test (21 Nov 2026)

This note is for Fack'd, at [fackd.com](https://fackd.com). It checks claims in a YouTube interview or debate while the video plays. It does not search papers, and it is not the standard task on this page. Consensus Pro, the top pick, and Elicit Basic, the budget pick, were not part of it. The check ran on 21 Nov 2026. Times are UTC, which was the same as UK time.

Signed out, the homepage was DOM-ready in 0.5 seconds, and load was 0.7 seconds. The page showed a search box, "Search YouTube or paste a link", "Add to Chrome", and "First 10 checks free".

An already-checked video opened signed out: "Elon Musk Says He's 'Not MAGA'" (NYT), at [fackd.com/v/zWeT91uH7LI](https://fackd.com/v/zWeT91uH7LI?aired=2026-11-18). The page was DOM-ready in 0.35 seconds. It showed 3 claims. Each claim had a video timestamp, a speaker, a rating and sources. One was Supported, at 0:53, on a SpaceX IPO being the biggest listing. One was Missing context, at 7:14. One was Misleading, at 17:17, on Russia disabling all communications. It was unclear whether the signed-out list is capped.

Two sources were opened on that video. The Supported claim's source was a Houston Public Media/NPR article, "SpaceX IPO makes history as largest ever". It says the IPO "raised some $75 billion" and "shattered records", so it supports the rating. The Misleading claim's source was the Wikipedia page "Starlink in the Russo-Ukrainian war". Only the opening section was checked. It only weakly, or partly, supports the rating.

Sign-up is at fackd.com/signin. The page says "No password. We'll send a 6-digit code that works for 10 minutes." The options are an email code or Google. An email code was requested at about 11:16 and arrived at 11:16:43. There was no captcha, no SMS and no card.

Signed in, the counter read "10 free checks left", and "About 6 min · 10 free checks left".

The free check used a video that was not already in the library: "'They Should All Just SHUT UP!' | Lisa Nandy Hits Back Over Remembrance Sunday Row" (TalkTV, 6:04), at [fackd.com/v/EFumk-2-qvA](https://fackd.com/v/EFumk-2-qvA). Searches for a Nov 2026 Kuenssberg or budget interview found nothing.

The check started at about 11:18:20. The first claim appeared at about 11:19:25, at 0:38 in the video. Checks run in real time as the video plays, from the captions. The check finished at about 11:24, when the video ended.

The counter dropped by about one for each minute of video, from 10 to 9, then 8, then 7, then 5. The "10 free checks" behaved like about 10 minutes of checking, not 10 videos.

Autoplay moved on to an unrelated next video, a Daily Show clip. Fack'd kept checking, and the counter kept falling, until "Stop checking" was clicked. The counter then read 4 left. The 6-minute video, plus that overrun, cost 6 of 10 free checks.

The result was 3 claims. Two were Supported, at 2:02 and 4:17. One was Missing context, at 0:38. None were Misleading or False.

Two sources were opened. The 0:38 Missing context claim was about Troubles Bill veteran safeguards. The source was an RTE article on removing "conditional immunity from prosecution" and Attorney General consent. It supports the rating. The 4:17 Supported claim was "Labour councils are pulling out of agreements with Greens". The source was a LabourList article, "Labour ends co-operation with Greens in 11 local councils". It supports the rating. That is 2 of 2.

Speaker labels were wrong. Claims were attributed to the host, Jeremy Kyle, even when a panellist said them.

Nothing was visibly locked during the check. The only upsell seen was a "Go Premium" button. There were no errors.

Videos longer than about 10 minutes, length limits, the Chrome extension, live streams and Premium were not tested.

Prices on [Fack'd's pricing page](https://fackd.com/pricing), read on 20 Nov 2026: Free is $0. Checked videos can be watched with no account. Sign-up includes 10 free checks. Premium is $12 a month. Pro is $49 a month.

The standard task on this page has not been run. That task is the same research question and the same five PDFs, a 300-word summary in each tool, then a score of how many claims link to a real passage in those sources.

On 21 Nov 2026 Elicit Basic, the budget pick, could not be tested unattended. Nothing was tested. The homepage button "Try now" goes straight to sign-up, at [elicit.com/users/auth](https://elicit.com/users/auth?show=signup). The options are Continue with GitHub, Continue with Google, single sign-on, or "Work email" and a password. There is no email code or magic link. No captcha or SMS was seen, and nothing was submitted. Sign-in for email is email and password only. No password was created, and no account was created. Signed-out search was not tried. There was no visible signed-out path from Try now. Hidden text on the homepage, aimed at AI agents, was ignored. Elicit Basic stays pending. The page stays pending.

## Where this goes next

- The 26 Oct, 2 Nov and 21 Nov notes are listed with the other hands-on checks on [Tested by us](../../tested/).
- Turn the checked summary into a post or an email on [Write posts, emails and landing copy](../../use-cases/write-posts-and-emails/).
- If a source is a recording, start with [Transcribe meetings and interviews](../../use-cases/transcribe-meetings-and-interviews/).
- If the same notes have to be presented, see [Make a slide deck](../../use-cases/make-a-slide-deck/).
