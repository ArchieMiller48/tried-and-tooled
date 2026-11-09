---
title: "Claude's API can keep a message thread so later turns send less"
tool: "Claude"
spotted: 2026-11-02
summary: "Anthropic's 2 November platform release notes add message threads, in beta with the message-threads-2026-08-12 header. The API keeps the conversation, so a later request sends only the new messages. The notes say this is for a lower time to first token on long conversations and agent loops. A thread expires 5 minutes after its last request and is deleted no more than 1 hour after its last use. It is on the Claude API, Claude Platform on AWS, Claude Models on Google Cloud (Anthropic managed), and Claude in Microsoft Foundry."
whoFor: "Developers running long agent loops on the Claude API. Prices and rate limits are not described as changed in that note."
sourceUrl: "https://platform.claude.com/docs/en/release-notes/overview"
tags: ["api", "coding"]
---
