---
title: "Automate small-business admin with AI workflows"
job: "Hand repetitive admin (new leads, follow-up emails, invoices, social posts) to AI-powered workflows and agents that run without you"
summary: "Most small businesses lose hours a week copying data between apps and writing the same emails. Connect the apps, add an AI step and keep a human check where money or customers are involved."
audience: ["small-business", "founders", "everyday"]
category: "Business & admin"
topPick:
  name: "Zapier"
  url: "https://zapier.com"
  why: "The no-code option with the widest app coverage (9,000+ apps). Copilot drafts Zaps from a chat, paid plans add AI by Zapier steps without needing your own API key, and Agents and Chatbots have free tiers to start with."
  pricing:
    summary: "Free: $0, 100 tasks/mo, two-step Zaps only. Professional from $19.99/mo. A yearly toggle is labelled Save 33%. A separate $29.99 monthly figure was not in the page HTML on 9 Nov 2026. Agents Free: 400 activities/mo."
    sourceUrl: "https://zapier.com/pricing"
    checked: 2026-11-23
  affiliateUrl: null
budgetPick:
  name: "n8n"
  url: "https://n8n.io"
  why: "Bills per full workflow run (an 'execution'), not per step, so long multi-step AI workflows cost much less to run at volume. You can self-host the Community Edition from GitHub and pay only for your own server, or use n8n Cloud. AI Agent, MCP and AI nodes are on every Cloud plan."
  pricing:
    summary: "Cloud Starter €20/mo billed annually (1,600 Assistant credits/mo). Pro €50/mo billed annually. Self-hosted Community Edition available on GitHub."
    sourceUrl: "https://n8n.io/pricing/"
    checked: 2026-11-23
  affiliateUrl: null
  handsOn: 2026-11-18
  handsOnSummary: "n8n 2.48.5, self-hosted Community Edition, installed with npm on Linux x86_64 (Node v24.22.1, npm 11.21.1) on 18 Nov 2026. Fresh local SQLite database. No n8n account, no n8n Cloud, no licence key, no card and no sign-up. Run with the n8n CLI. The editor UI was not used. npm install took 74.9 seconds and node_modules was 2.9 GB. A 9-node Hollow Oak Bakery order workflow, written by us as JSON, imported in 5.8 seconds after 344 database migrations. The first execute finished in 3.83 seconds wall clock, and a second run in 3.51 seconds. The workflow itself ran in 0.80 seconds. 6 of 6 orders routed correctly, 6 of 6 totals were right, and 4 of 4 confirmation emails included the collection line. Both CSVs were written. n8n executed the workflow. The rules and email wording were written by us. No AI was involved. The editor UI, n8n Cloud, AI nodes with a real key, and integrations (Gmail, Google Sheets, webhooks, schedules) were not tested."
avoid:
  name: "Zapier Free, for a workflow with more than two steps"
  reason: "The Free card lists two-step Zaps only, at 100 tasks a month. Professional is the plan that lists multi-step Zaps, from $19.99/mo. A lead, an AI draft and a send is already three steps. The pricing page names pay-per-task billing, but the HTML read on 2 Nov 2026 did not include the overage rate."
  sourceUrl: "https://zapier.com/pricing"
stack:
  - step: "Map the process"
    tool: "Zapier Canvas, or pen and paper"
    role: "Write down the trigger, each step, and where a human has to sign off."
  - step: "Trigger"
    tool: "Your form, inbox, CRM or store"
    role: "Start the workflow when a new lead, order or email arrives."
  - step: "AI step"
    tool: "AI by Zapier, or n8n's AI Agent node"
    role: "Classify the request, draft the reply or pull the fields you need."
  - step: "Human check"
    tool: "An approval step, a Slack message or a draft"
    role: "Review anything that sends money, publishes, or emails a customer."
  - step: "Monitor"
    tool: "Error alerts and usage limits"
    role: "Get alerted when a run fails, and cap usage so a loop can't run up a bill."
alsoConsidered: []
testStatus: "pending"
lastTested: null
lastVerified: 2026-11-23
testNotes: "Hands-on note, 18 Nov 2026: n8n 2.48.5 only, self-hosted Community Edition, installed with npm on Linux x86_64 (Node v24.22.1, npm 11.21.1). Fresh local SQLite database in its own user folder. No n8n account, no n8n Cloud trial, no licence key, no card and no sign-up. Run with the n8n CLI. The editor UI was not used. It is not the standard task. npm install took 74.9 seconds. node_modules was 2.9 GB (1,096 top-level packages). npm 11 skipped install scripts for 14 packages. n8n still ran. Import printed \"Successfully imported 1 workflow.\" after 5.8 seconds, most of that 344 database migrations. The workflow id was HollowOakOrder01. The first execute took 3.83 seconds wall clock, status success. A second run took 3.51 seconds. The workflow itself ran in 0.80 seconds. 6 orders went in, 2 were flagged and 4 were confirmed. Routing was 6 of 6 correct. Totals were 6 of 6 correct (£18.00, £36.00, £8.80 and £18.00 on the confirmations, £80.80 together, and £13.50 and £16.80 on the problem rows). 4 of 4 confirmation bodies included the line \"Saturday 9–11am collection, Bath, no delivery\". The CSVs were 313 bytes and 1,442 bytes. The rules and email wording were written by us. n8n executed them. No AI was involved. An OpenAI message node with no credential failed with \"Node does not have any credentials set\". Pending hands-on test. Planned standard task: build 'new website enquiry → AI-drafted reply saved as a draft + CRM row + Slack alert' in each tool. We'll record build time, the tasks or executions used per run, the cost per 100 enquiries, and what happens when a step fails. The editor UI, n8n Cloud, AI nodes with a real key, and integrations (Gmail, Google Sheets, Stripe, webhooks, schedules) were not part of this check."
---

## Who this is for

Solo founders, freelancers and small teams who want the busywork to run on its own, without hiring a developer.

## How to choose

- **You want no-code and the most app connections:** Zapier.
- **You run lots of multi-step or AI-heavy workflows, or you're happy to self-host:** n8n.
- **You can run it from the command line:** on 18 Nov 2026, n8n 2.48.5 self-hosted routed 6 of 6 bakery orders correctly. The workflow ran in 0.80 seconds. The editor, n8n Cloud, AI nodes with a real key, and Gmail, Sheets, webhooks and schedules were not part of that check.
- **Anything that emails customers or moves money:** keep a human approval step, whichever tool you use.

The note below is a local check of n8n 2.48.5, self-hosted Community Edition, dated 18 Nov 2026. It was run with the CLI. No n8n account, no n8n Cloud, no licence key and no card. The editor UI was not used. Zapier was not part of it. The standard task on this page has not been run. Prices were read on 16 Nov 2026.

## Hands-on test (18 Nov 2026)

This note is for n8n self-hosted Community Edition, the budget pick. The version was n8n 2.48.5, the npm latest and stable tag on 18 Nov 2026. It was installed locally with npm on Linux x86_64. Node was v24.22.1 and npm was 11.21.1. The database was a fresh local SQLite file in its own user folder (N8N_USER_FOLDER=userdir). No n8n account, no n8n Cloud trial, no licence key, no card and no sign-up. It was run with the n8n CLI. The editor UI was not used. On first open the editor asks you to create a local owner account, with an email and a password, and this unattended run could not do that. Zapier, the top pick, was not part of it.

n8n 2.48.5 needs Node >=24.0.0, from npm's engines field. The box already had Node v24.22.1, so no Node change was needed. `npm install n8n@2.48.5` took 74.9 seconds (11:15:34–11:16:49 GMT) and exited 0. node_modules was 2.9 GB, with 1,096 top-level packages. That is a large install for a budget tool. npm 11 skipped install scripts for 14 packages, because they were not yet covered by allowScripts. Those packages included sqlite3, isolated-vm, @parcel/watcher, oracledb, ssh2 and kafka. n8n still ran. SQLite, the Code node and file writes all worked. Kafka, Oracle and SSH nodes were not checked.

`npx n8n --version` printed 2.48.5 in 0.3 seconds. The first command auto-generated an encryption key in userdir/.n8n/config. `n8n import:workflow` took 5.8 seconds on first use (11:17:51–11:17:57 GMT). Most of that was 344 database migrations on the new SQLite file. The output was "Successfully imported 1 workflow." `n8n list:workflow` then showed HollowOakOrder01. The environment was N8N_USER_FOLDER, N8N_DIAGNOSTICS_ENABLED=false, and N8N_RESTRICT_FILE_ACCESS_TO=output/, so the file-write node was limited to allowed folders.

The task was a small bakery checking a batch of web orders. Hollow Oak Bakery is in Bath. A bread box is £18. Saturday collection is 9–11am. There is no delivery. The job was to flag the orders a human needs to look at, and to write confirmation emails for the rest, saved as CSV.

The workflow was hollow-oak-orders.workflow.json, written by us as JSON, with 9 nodes. Manual Trigger, then a Code node named "Sample web orders" with 6 orders, then an IF node named "Problem order?" (the email is empty, or deliveryRequested is true). The true branch was a Code node, "Problem list for human check", then Convert to File (CSV), then Read/Write Files from Disk, to output/problems.csv. The false branch was Edit Fields (Set), "Write confirmation email", with to, total, subject and body, then Convert to File (CSV), then Read/Write Files, to output/confirmations.csv.

The sample orders were HOB-1001 Priya, 1 bread box at £18; HOB-1002 Tom, 2 bread boxes; HOB-1003 Grace, 3 sourdough at £4.50, with a blank email; HOB-1004 Dan, 6 cinnamon buns at £2.80, asking for delivery to BA2 4AA; HOB-1005 Ella, 4 croissants at £2.20; HOB-1006 Sam, 1 bread box.

`n8n execute --id=HollowOakOrder01 --rawOutput` took 3.83 seconds wall clock (11:18:05–11:18:09 GMT), exit 0, status success, finished true. A second run took 3.51 seconds and also succeeded. The workflow itself ran in 0.80 seconds (startedAt 11:18:08.042, stoppedAt 11:18:08.843 GMT). The rest of the wall time was CLI start-up. Per node, the sample Code node took 703 ms, including starting the JS task runner. The IF took 31 ms. The Set took 35 ms. The problem Code node took 6 ms. The CSV and file nodes took 2–8 ms each.

Item counts were 6 out of the Code node, then 2 true and 4 false on the IF, then 2 problem rows and 4 confirmations, then 1 CSV file each. The files were 313 bytes and 1,442 bytes. The `n8n execute --file` flag still exists, and it is marked `DEPRECATED: Please use --id instead`. Every node type and CLI command used here existed in 2.48.5, so nothing had to be adapted.

The outputs were checked by hand, from output/problems.csv, output/confirmations.csv and execution-result.json. Routing was 6 of 6 correct. Flagged: HOB-1003 Grace, "Missing email - cannot send confirmation", and HOB-1004 Dan, "Delivery requested - we do not deliver (collection only)", with his note kept. Confirmed: 1001, 1002, 1005 and 1006. There were no false flags and none missed.

Totals were 6 of 6 correct. The confirmations were £18.00, £36.00, £8.80 and £18.00, which is £80.80 together. The problem rows were £13.50 and £16.80. Six times £2.80 printed as 16.80 with toFixed(2), so no float glitch showed.

Email text was 4 of 4. Each body had the first name, the quantity and the item, the unit price, "Total: £…", and the exact line "Saturday 9–11am collection, Bath, no delivery", plus the customer's slot. 4 of 4 subjects included the order ID. Multi-line bodies were quoted correctly in the CSV.

n8n is the engine here. The rules and the email wording were written by us. n8n executed them. Nothing was AI-generated.

846 node types are bundled. They include the AI Agent node and OpenAI, Anthropic and Ollama chat-model nodes. Those three list their credential as required. The Gmail node needs Google credentials (googleApi or gmailOAuth2). A 2-node workflow with an OpenAI message node and no credential imported fine. Executing it failed, exit 1, with "Node does not have any credentials set". AI steps need our own model API key, or a local Ollama, and were not exercised.

The rough edges were the 2.9 GB install and the Node 24 requirement. `--rawOutput` still prints log lines before the JSON, including "Task Broker ready", "Failed to start Python task runner … virtual environment is missing", licence SDK lines and "Registered runner", so the output is not pure JSON without trimming. The Python runner warning shows on every run. The Python Code node was not tested. The first command quietly creates an encryption key and runs 344 database migrations. npm 11 skipped 14 packages' install scripts. It worked here, and it is a worry for some nodes. Building workflows as JSON by hand needs each node's typeVersion and parameter shapes, the IF v2.2 condition format especially. Most people would use the editor, which needs a local owner account.

Not tested: the editor UI and owner-account setup, n8n Cloud (paid or trial), AI nodes with a real key, any credentials or integrations (Gmail, Google Sheets, Stripe, webhooks, schedules), production `n8n start` or Docker, the Python Code node, queue/worker mode, and backups or updates.

Free self-hosted n8n 2.48.5 installed with one npm command in 74.9 seconds and ran a 9-node bakery order workflow headlessly, with no account. 6 of 6 orders were routed correctly, 6 of 6 totals were right, 4 of 4 confirmation emails had the required collection facts, and both CSVs were written, in 0.80 seconds of workflow time (3.51 and 3.83 seconds per CLI run). The caveats are 2.9 GB, Node >=24.0.0, and a technical setup, either the CLI and JSON or a local owner account for the editor. AI and real email sending need your own API keys and OAuth credentials, which this run did not test.

The standard task on this page has not been run. That task is a new website enquiry turned into an AI-drafted reply saved as a draft, plus a CRM row and a Slack alert, in each tool, with build time, the tasks or executions used per run, the cost per 100 enquiries, and what happens when a step fails.

## Where this goes next

- The 18 Nov 2026 note is also listed on [Tested by us](../../tested/).
- The other small-business jobs, with prices re-read on 4 Nov 2026, are on [AI tools for a small business](../../best/ai-tools-for-small-business/).
- Customer chat is on [Answer customer questions](../../use-cases/answer-customer-questions/).
- A sheet you already have is on [Check a spreadsheet](../../use-cases/analyse-a-spreadsheet/).
- A social calendar is on [Run a marketing campaign](../../use-cases/run-marketing-campaigns/).
- The words for those posts are on [Write posts, emails and landing copy](../../use-cases/write-posts-and-emails/).
