---
title: "Newsletter #110"
date: 2026-06-07
tags: ["AI-Assisted", "Newsletter", "LLMs", "Go", "System Design", "Infrastructure", "Engineering Culture"]
categories: ["Newsletter"]
---

*Enjoy Newsletter #110.*

## [go podcast() | 086: Just use postgres, man](https://share.transistor.fm/s/5159e8a9)

In this podcast episode, Dominic St-Pierre and Morten Vistisen revolve around a familiar question: should you store telemetry data in ClickHouse or just stick with PostgreSQL? Morten wants to try ClickHouse, while Dominic takes the pragmatic stance: below roughly 10 million rows, PostgreSQL performs nearly as well, and scaling rarely happens overnight, leaving plenty of time to migrate when you actually need to. Morten also recounts having to rewrite a component in his DeployQuad project because the LLM-generated code from the initial prototype didn't behave as expected, underscoring the importance of truly understanding the code you ship.

Dominic introduces StaticBackend v1.7.0, adding multi-account user support and expanded server-side functions powered by Goja (a JavaScript runtime written in Go), while lamenting how tedious releases are when updating multiple NPM packages compared to Go's simple tag-and-push workflow. Toward the end, both hosts express skepticism about over-relying on AI code generation: it disrupts deep flow states while programming, causes skills to atrophy, and may not even deliver a net productivity gain. They remain convinced that core programming skills are as valuable as ever.

## [That one time I used Go panics for flow control](https://noncrab.net/posts/panic-as-flow-control/)

The author recounts an overload incident on an in-memory Go data service: when query volume exceeded capacity, requests that normally took 1–2 seconds stretched to a full minute, and upstream retries only piled on more load. The root problem was that Go's standard library sorting functions neither accept a `context` nor return an error, so the service kept burning CPU cycles sorting results for queries whose callers had already timed out and walked away. That library design is normally reasonable, since sorting usually happens in batch jobs or over slices small enough that execution time is negligible.

Rather than rewriting the entire sorting layer, the team used a `panic`/`recover` pair as an escape hatch: the comparison function checks whether the `context` has been canceled and, if so, calls `panic` with a dedicated sentinel value. A `defer` wrapper around the sort catches that specific sentinel `panic` and converts it into a normal error while re-panicking on anything else so real bugs aren't swallowed. That let the system abort useless sorts immediately. The author readily admits this is "an ugly solution to an ugly problem," strictly for narrow, tightly controlled situations.

## [The last six months in LLMs in five minutes](https://simonwillison.net/2026/May/19/5-minute-llms/)

This post is the annotated version of Simon Willison's lightning talk at PyCon US 2026, recapping developments in large language models from November 2025 through May 2026. The standout trend is that coding agents crossed a decisive quality threshold: thanks to OpenAI and Anthropic applying reinforcement learning with verifiable rewards throughout 2025, agents went from "often works" to "almost always works" and became everyday workhorses. In November alone, the title of "best model" changed hands five times between Anthropic, OpenAI, and Google, while Willison continued using his signature benchmark of asking models to generate an SVG of a pelican riding a bicycle.

The second major trend is local open-weight models blowing past expectations, including Google's Gemma 4 family, China's GLM-5.1, and Qwen3.6-35B-A3B, which weighs in at roughly 21GB and runs comfortably on a standard laptop. The talk also highlights OpenClaw, a personal AI assistant project that went so viral that "Claws" became the generic term for the entire category of personal agents and Mac Minis sold out as people bought them to run Claws at home.

## [Prompts are technical debt too](https://www.seangoedecke.com/prompts-are-technical-debt-too/)

Sean Goedecke argues that prompts — including instruction files like `AGENTS.md` and `CLAUDE.md` — are a form of technical debt, and in some ways worse than code debt. When code doesn't change, its behavior stays largely the same, and when it breaks it usually fails loudly; prompts, by contrast, silently degrade every time the underlying model is upgraded. A prompt painstakingly tuned to work around an older model's quirks can become useless or actively counterproductive on a newer model without anyone noticing. According to Goedecke, an agent harness with elaborate prompts wrapped around an older model will almost always lose to a minimal harness running a newer model.

From there, he offers concrete advice: stick to mainstream AI coding tools like Claude Code, Cursor, or Copilot with their default configurations, since their engineering teams continuously re-tune the system prompts for you; avoid installing extra MCP servers or skills unless strictly necessary; if you must write an `AGENTS.md`, stick to core factual details about the project rather than trying to micromanage model behavior, and never check in model-generated instructions without reviewing them carefully. Finally, regularly prune custom prompts to keep maintenance overhead low.

## [We see something that works, and then we understand it](https://lemire.me/blog/2025/12/04/we-see-something-that-works-and-then-we-understand-it/)

Daniel Lemire pushes back against the "linear model of innovation" — the belief that theoretical understanding must come first and practical progress follows afterward. Borrowing Kevin Kelly's term "thinkism," he critiques the illusion that thinking hard enough in the abstract can solve any problem. That mindset dominates schools and bureaucracies, where rules are fixed in advance: students learn a concept first and then solve textbook problems designed to require only that exact concept. History usually works the other way around: pendulum clocks were keeping time in 1656, well before Newton and Hooke formulated the laws of force and motion that explained why they worked.

In Lemire's view, real R&D always happens with incomplete understanding; people entering industry often learn more in a single year on the job than across their entire university degree because real-world engineering demands continuous experimentation and observation. He draws two lessons: breakthroughs require prioritizing hands-on experimentation over abstract theorizing, and we shouldn't expect AI to solve every complex problem purely from existing knowledge, because the physical world is always richer and messier than what we already know.

## [How Vercel Cut Build Wait Times From 90 Seconds To 5](https://blog.bytebytego.com/p/how-vercel-cut-build-wait-times-from)

This article examines how Vercel cut build environment provisioning wait times from 90 seconds down to 5 seconds — an 18x speedup — using an internal platform called Hive. The core challenge is that Vercel runs untrusted build code from thousands of customers on shared hardware, meaning every build must be treated as potentially hostile. Standard containers aren't isolated enough because they share the host Linux kernel, where a single kernel vulnerability could expose another customer's workload. Instead of Kubernetes, Vercel built Hive on AWS Firecracker microVMs: each build runs inside a "cell" — a tiny virtual machine with its own dedicated kernel that boots in roughly 125 milliseconds. The architecture spans regional clusters where physical "boxes" host multiple cells, coordinated by a control plane.

The speedup comes from three compounding optimizations: container image caching and disk snapshots cut cold starts from ~50 seconds down to 5 seconds; a warm pool of pre-booted cells waiting for work means most builds experience near-zero queue wait; and Firecracker's millisecond boot times make maintaining and replenishing that warm pool economical. The trade-off is that keeping warm cells idle consumes resources and every cell must be destroyed after a single build for security, but owning the underlying infrastructure has unlocked new product capabilities for Vercel.


## [The Anatomy of an AI-Native Org](https://ajeygore.in/content/the-anatomy-of-an-ai-native-org)

Ajey Gore argues that AI is reshaping organizational structure by eliminating the "translation layer." For thirty years, software companies have operated across three tiers: leadership decides the "Why," product defines the "What," and engineering translates those decisions into code — the "How." Much of the day-to-day work in that model consists of translating between well-defined inputs and outputs. According to Gore, AI doesn't target a specific job title so much as that entire category of translation work — turning requirements into code or specs into UI components — making it orders of magnitude cheaper, while the strategic work at both ends remains just as hard as ever.

The shape of an "AI-Native" organization shifts accordingly: the "Why" layer stays small; the "What" layer expands because judgment and taste become critical when directing AI; the human "How" layer shrinks sharply in headcount but rises in difficulty, focusing on architecture, security, and verification mechanisms that make AI output trustworthy; and AI agents handle routine translation under human supervision. Managers can no longer just coordinate — they must contribute directly — while engineers should move toward problem definition rather than competing with AI on raw code translation.

## [How to Stay Resilient in a Difficult Job](https://andiroberts.com/executive-coaching/how-to-stay-resilient-in-a-difficult-job)

This article outlines 7 practical, science-backed strategies for maintaining mental resilience when stuck in a difficult job — whether dealing with a poor manager, irregular shifts, or chronic stress. The author stresses that resilience here doesn't mean forcing toxic positivity or pretending the job is fun; it means conserving energy, keeping an objective perspective, and maintaining a sense of agency so you can do good work, protect your health, and stay positioned for future moves.

The strategies include: grounding yourself mentally at the start of the day and stabilizing your physiology with sunlight, hydration, and movement before work; focusing strictly on what lies within your control and upholding your own professional standards even when surrounding systems are messy; setting emotional boundaries so you don't carry work stress home; finding at least one trusted colleague to confide in; and consistently taking small steps toward landing a better role.

## [What's Easy Now? What's Hard Now?](https://brooker.co.za/blog/2026/05/18/whats-easy-whats-hard.html)

Marc Brooker proposes the "feedback loop hypothesis": over the long run, AI coding agents will find tasks with clear, measurable feedback loops "easy," while tasks lacking effective automated feedback will remain "hard" — and this divide will be the primary determinant of agent capability. Opening with an analogy from electrical engineering, he notes that strong negative feedback can turn simple, nonlinear, even flawed components into remarkably accurate amplifiers.

From that premise, he flips the conventional wisdom that web development is easy and systems programming is hard. A database storage engine like RocksDB has a relatively compact specification — an API plus safety and liveness properties — that can be verified automatically. Web development, by contrast, lacks an equivalent automated oracle and relies on slow, inconsistent human judgment. Current practice already reflects this: agents excel at performance optimization when given a solid benchmark suite, struggle with subjective architectural trade-offs, and get guided toward correct code in languages like Rust thanks to strict compiler errors. Consequently, formal specification languages, compile-time checks, and rigorous testing frameworks will only grow in importance.

## [Making User-Sequence Data More Cost-Efficient, Faster, and Easier to Use](https://medium.com/pinterest-engineering/making-user-sequence-data-more-cost-efficient-faster-and-easier-to-use-2a56a928cae1)

Pinterest's engineering team shares how they redesigned their user-sequence data platform — the ordered history of a user's recent actions enriched with signals like embeddings, device context, and country. This data powers ML ranking, retrieval, and recommendation models across the Home feed, Related Pins, and search results, serving training pipelines, offline analytics, and real-time inference alike. Because it must be simultaneously fresh, complete, consistent between training and serving, and schema-stable, it is often one of the most expensive and brittle parts of a data stack.

The core principle of the redesign is "One definition, multiple runtimes": each signal is defined once and shared across real-time indexing, batch backfills for historical data, and online serving via a unified execution engine supporting both streaming and batch modes. That eliminates training-serving skew by construction. Combined with a Lambda architecture to balance freshness and completeness, plus columnar storage and time-based partitioning, Pinterest significantly cut storage costs and network bandwidth while turning the addition of new event types or signals into a mostly configuration-driven change.

---

*This post was rewritten by Claude Code with Opus 5.5 on 27/09/2026.*
