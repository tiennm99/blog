---
title: "Newsletter #27"
date: 2025-05-14
tags: [ "AI-Assisted", "Vite", "Cloudflare", "Frontend", "AI Coding", "Data Engineering", "Career Development" ]
categories: [ "Newsletter" ]
---

*Enjoy Newsletter #27.*

## ["Just use Vite"... with the Workers runtime](https://blog.cloudflare.com/introducing-the-cloudflare-vite-plugin/)

Cloudflare announced version 1.0 of the Cloudflare Vite plugin alongside official support for React Router v7. Previously, Vite's development server always executed server-side code inside Node.js—even when the application targeted Cloudflare Workers in production—causing subtle, hard-to-catch discrepancies between local dev and production. Built on the experimental Environment API introduced in Vite 6, the new plugin runs your Worker code directly inside the native Workers runtime (`workerd`) during local development, keeping dev behavior as close to production as possible.

For single-page applications (SPAs) built with React, Vue, or Svelte, you can scaffold a new project with the `create-cloudflare` CLI or migrate an existing app simply by adding `@cloudflare/vite-plugin` to your Vite config and creating a `wrangler.jsonc` file. When you edit server-side Worker code, Vite hot-reloads the Worker environment without losing client-side UI state in the browser. Running `vite build` outputs both client and server bundles, `vite preview` previews the production build inside the Workers runtime, and `wrangler deploy` deploys straight to Cloudflare without an extra bundling step. With React Router v7 (the successor to Remix), a single entry file defines the Worker across both dev and build without needing a separate adapter, and the plugin supports the full Cloudflare Developer Platform including KV, D1, Durable Objects, and Workers AI.

## [The Best Programmers I Know](https://endler.dev/2025/best-programmers/)

Matthias Endler distills the common traits he has observed in the best programmers he has ever worked with—a list he wishes he had when starting out. First and foremost, they read the canonical reference documentation directly instead of guessing, copying from Stack Overflow, or asking an LLM. Second, they know their tools inside and out: why the tool was created, who maintains it, where its limits lie, and what the surrounding ecosystem looks like. Great programmers also actually read error messages carefully, break intimidating problems down into small, solvable steps, and aren't afraid to get their hands dirty in unfamiliar codebases—which is how they become the go-to person on their team.

Beyond raw technical chops, they generously help others, write clearly because clear writing reflects clear thinking, and never stop learning—some of the sharpest programmers Endler knows are in their 60s and still run circles around developers half their age. They don't care about titles or hierarchy, build lasting reputation by shipping widely used work, stay patient with both computers and people, never blame "random" hardware glitches or compiler bugs before checking their own assumptions, aren't afraid to say "I don't know," refuse to guess when requirements are ambiguous, and relentlessly favor simple code. Endler notes that this isn't a checklist or a competition, just a reminder that there are no shortcuts around deliberate practice.

## [RDEL #87: How do AI coding tools actually change developer work?](https://rdel.substack.com/p/rdel-87-how-do-ai-coding-tools-actually)

In this installment of *Research-Driven Engineering Leadership*, Lizzie Matusov summarizes a three-week randomized controlled trial conducted by Microsoft and the Institute for Work Life across 228 engineers at a global software company. Participants were split into three groups—engineers newly granted access to GitHub Copilot, a control group using no AI tools, and a comparison group of existing Copilot users—combining daily diary studies with system telemetry. Before the trial began, 86% of experienced Copilot users believed AI coding tools were useful compared to just 44% of non-users, and the single most common reason engineers hadn't tried AI tools yet was simply being too busy.

After three weeks, enjoyment and perceived usefulness rose significantly among the new users; 84% reported that Copilot positively changed how they worked, cutting down on tedious boilerplate and making coding more enjoyable. Engineers used Copilot not just for code completion, but also as a replacement for web search and as a sounding board for ideation and design. Interestingly, system telemetry showed no statistically significant difference in lines of code, pull request volume, or active coding time, and engineers' baseline level of trust in AI-generated code remained unchanged. Matusov advises engineering leaders to measure productivity holistically across satisfaction and flow using the SPACE framework, carve out dedicated time for teams to experiment, and view AI as a way to offload repetitive drudgery so engineers can focus on design and learning.

## [Overclocking dbt: Discord's Custom Solution in Processing Petabytes of Data](https://discord.com/blog/overclocking-dbt-discords-custom-solution-in-processing-petabytes-of-data)

Discord data engineer Chris Dong shares how his team scaled `dbt` (data build tool) to process petabytes of data across more than 100 developers collaborating on 2,500+ models. Their out-of-the-box setup quickly hit a wall: full project compilation took over 20 minutes, default incremental materialization strategies struggled at petabyte scale, and developers constantly clobbered each other's test tables in shared environments. To isolate environments cleanly, they overrode the `generate_alias_name` macro to automatically prefix table names with the developer's username in local dev, the PR number or commit SHA in CI/CD, and the canonical name in production.

On the performance side, they replaced standard `MAX(timestamp)` incremental filtering with explicit `start_date` and `end_date` variables—noting that the expensive full-table scans came from the `MAX(timestamp)` subquery in the old pattern rather than the `is_incremental()` macro itself. They also patched partial-parsing hash mismatches and leveraged zero-copy BigQuery partition copies; together, these optimizations sped up runs by 5x. Historical backfills were automated via semantic versioning inside each model's `meta` config: bumping the major version triggers a full refresh of the table and all downstream dependents, while bumping the minor version runs a targeted date-chunked backfill. A shared macro library and Buildkite CI/CD pipeline validate query dry-run costs, dependencies, and blast radius before any change lands in production.

---

*This post was rewritten by Claude Code with Opus 5.5 on 27/09/2026; reviewed and edited by Codex with GPT 6.1 Sol on 09/11/2026.*
