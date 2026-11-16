---
title: "Newsletter #102"
date: 2026-05-05
tags: ["AI-Assisted", "AI Agents", "GitHub Actions", "Software Engineering", "Database", "System Design", "Productivity"]
categories: ["Newsletter"]
---

*Enjoy Newsletter #102.*

## [A GitHub agentic workflow](https://blog.frankel.ch/agentic-github-workflows/)

Nicolas Fränkel shares his hands-on experience with GitHub agentic workflows — workflows whose defining feature is running an AI agent inside them. He works on a long-lived product with many versions, accompanied by an analysis tool that warns customers ahead of time about upgrade issues. The tool's configuration file used to be compiled manually by a colleague from release notes. Some deprecation info exists in source code via annotations like `@Deprecated`, but plugin deprecations only appear in release notes — unstructured prose that traditional deterministic automation cannot parse. That is exactly where an agent shines.

The workflow has four steps: initialize with `gh aw init` or via the GitHub UI; write the workflow in Markdown (the author used Copilot CLI to help); "compile" it to YAML with `gh aw compile`; and run it like a normal workflow using a fine-grained `GITHUB_COPILOT_TOKEN` with "Copilot requests" permission. Along the way, the author hit several snags: forgetting to compile and pushing only the Markdown file; trying to create an auto-compile workflow before hitting permission walls and realizing it was a security risk anyway; and finally settling on a verification workflow that recompiles and fails if the output differs from the committed YAML, paired with `.gitattributes` to handle line-ending differences between Windows and Ubuntu. Agentic workflows also disallowed actions from the GitHub Marketplace in his setup. In his view, they don't replace deterministic workflows, but they unlock new use cases like parsing release notes that regexes can't easily handle.

## [The 20 Software Engineering Laws](https://newsletter.techworld-with-milan.com/p/the-20-software-engineering-laws)

Dr Milan Milanović rounds up the 20 software engineering laws he references most often to explain why projects fail, systems degrade, and teams slow down. Many of these decades-old principles remain useful because they are about humans building products together under time pressure rather than any specific technology. They aren't rigid rules: they describe what tends to happen, while the decisions still belong to the engineer.

The laws are grouped into several themes: how systems are built (Gall's Law, KISS, Conway's Law, Hyrum's Law, CAP Theorem, Zawinski's Law), team dynamics (Brooks's Law, Ringelmann Effect, Price's Law), planning and estimation (Dunning-Kruger Effect, Hofstadter's Law, Parkinson's Law), measurement (Goodhart's Law, Gilb's Law), performance and reliability (Knuth's Optimization Principle, Amdahl's Law, Murphy's Law), and design philosophy (Postel's Law, Sturgeon's Law, Cunningham's Law). Illustrative examples include Instagram succeeding after stripping Burbn down to just photo sharing while feature-packed Google Wave vanished after 15 months, and the 2024 CrowdStrike outage that crashed 8.5 million Windows machines (Murphy's Law). Understanding these laws before trouble strikes helps avoid costly mistakes; because they sometimes contradict one another, engineers need judgment to pick the right lens and build their own catalog of observed patterns.

## [Databases Were Not Designed For This](https://arpitbhayani.me/blogs/defensive-databases/)

Arpit Bhayani points out that every database design rests on an "implicit contract": the caller is a human-written application running deterministic code, queries are reviewed before deployment, writes are intentional, and connections are short-lived. That contract held for forty years, but AI agents break it at every layer. Agents hallucinate novel queries on the fly, write data autonomously, duplicate writes on retries, hold connections open while waiting on LLM inference, and fan out into parallel sub-agents. A classic failure mode: an API returns HTTP 200 with an empty result because the backend connection pool is exhausted, and the agent interprets "no data" as "no problem," proceeding to approve 500 transactions without triggering a single alert.

The fix is defensive database design: set role-level statement timeouts (e.g., 5 seconds); use soft deletes with a `deleted_by` column to audit which agent deleted what; use append-only event log tables for sensitive data; enforce idempotency keys derived from task ID, operation type, and target entity so retries don't create duplicate records; and isolate agent traffic into a dedicated connection pool with short wait timeouts so it fails fast. The article also covers PgBouncer transaction pooling, attaching SQL comments with agent and task IDs for observability, and giving each agent type its own least-privilege database role. The core message: none of these are new tools — they are established best practices that become mandatory infrastructure once agents talk to your database.

## [Finishing Things](https://ratfactor.com/finishing-things)

This is a personal essay by the author of the ratfactor blog about finishing personal projects amid life's upheavals. He used to set grand annual themes like "The Year of the Microcontroller" (2023) or "The Year of Try It" (2024), but personal hardships and external events kept derailing them, so he decided to stop making big plans. What actually works is a "project stack": every idea gets written on a small Post-It note and placed into a display frame, usually near the top, and he only works on the topmost item. This stack turns a sprawling maze of side quests into a single linear track that's easy to follow instead of a tangled to-do list.

He compares maintaining habits and projects to plate spinning: when a crisis hits, multiple plates come crashing down at once. His advice is to keep at least one plate spinning, because maintaining momentum is much easier than starting over from scratch; skills also need regular practice so they don't rust. The essay introduces the "sphere of control," a boundary that expands and contracts with life's circumstances: as long as you do well within that sphere, there's no need to beat yourself up, and some obstacles are really just minor discomforts, like dreading a phone call to book an appointment. He also touches on the creeping nihilism of watching AI companies scrape up human creativity, and chooses to ignore it and keep creating anyway. Conclusion: slow, steady progress is what actually gets things done, so instead of specific goals, he declares a "year of slow, steady progress."

### Bonus

**Images:**
![Data Warehouse vs Data Lake vs Data Mesh](https://substackcdn.com/image/fetch/$s_!9kS2!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F71595c9b-f94f-4ae8-851e-ea4f07342c29_2484x3002.png)
![API Concepts Every Software Engineer Should Know](https://substackcdn.com/image/fetch/$s_!U4gw!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8e8297aa-f856-4b2b-af5d-986023db89e7_2508x3000.png)
![Polling vs Long Polling vs Webhooks vs SSE](https://substackcdn.com/image/fetch/$s_!SAsk!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F7616a6b1-8eb6-4dc3-9456-b0e57bc9b0ee_2484x3002.png)
![SLA vs SLO vs SLI](https://substackcdn.com/image/fetch/$s_!SJN6!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F47ce48f1-06e7-4663-b822-96cc7d1307d0_2484x3002.png)

---

*This post was rewritten by Claude Code with Opus 5.5 on 27/09/2026; reviewed and edited by Codex with GPT 6.1 Sol on 09/11/2026, and re-verified by Claude Code with Sonnet 5.5 on 16/11/2026.*
