---
title: "Newsletter #90"
date: 2026-03-16
tags: ["AI-Assisted", "Newsletter", "Compiler", "AI Agents", "Performance", "System Design", "Nghề nghiệp"]
categories: ["Newsletter"]
---

*Enjoy Newsletter #90.*

## [Against Query Based Compilers](https://matklad.github.io/2026/02/25/against-query-based-compilers.html)

Query-based compilers are all the rage, and matklad uses this essay to point out their hidden shoals. The core idea is straightforward: model a compiler run as a call graph of queries; when an input changes, recompute only the nodes along the path from that input to the root query, with an "early cutoff" optimization whenever an intermediate result doesn't change. However, the cost of an incremental update can never be smaller than the size of the output change: for computations with an "avalanche" property like cryptographic hashes or optimized code generation, changing a single character alters nearly the entire output, making incrementality useless. The author concludes that the effectiveness of a query-based architecture is bounded by the dependency structure of the source language itself.

Comparing Zig and Rust makes this concrete. In Zig, each file is parsed and name-resolved independently in parallel because all identifiers must be explicitly declared. In Rust, macros generate new items and name resolution spans the entire crate, so typing a single line in `a.rs` can alter how `b.rs` resolves; the trait system even creates negative dependencies on the *absence* of conflicting `impl` blocks elsewhere in the crate. The author's advice is to design languages so compilation can be split into coarse, independent map-reduce chunks, and rely on fine-grained query pipelines only as a fallback as late in the compilation pipeline as possible.

## [The Great Developer Divide: How AI Is Reshaping the Software Job Market Into Three Tiers](https://itrevolution.com/articles/the-great-developer-divide-how-ai-is-reshaping-the-software-job-market-into-three-tiers/)

This IT Revolution article argues that AI isn't killing software engineering, but bifurcating the developer job market into three tiers while hollowing out the comfortable $150k "solid mid-level Java developer" middle. The **apex tier** ($250k–$500k+) rewards strategic systems thinking, AI orchestration, and architectural judgment. The **hybrid middle tier** ($150k–$300k) blends engineering with product, design, or operations, giving rise to new roles like fleet supervisors managing teams of AI agents or domain-specific agent experts. The **commoditized tier** ($80k–$130k and shrinking) covers routine coding work, squeezed simultaneously by AI automation and global labor competition.

In the author's view, AI doesn't directly replace jobs so much as accelerate economic forces that make routine implementation uneconomical at legacy salaries—mirroring job polarization in manufacturing, only much faster. Overall demand for engineers is still growing, just shifting in nature. Key skills to cultivate include prompt engineering, AI/ML fundamentals, system design, reading code quickly, knowing when to delegate to AI, and maintaining disciplined skepticism toward AI output. The advice for developers is to consciously choose which tier to target and invest in deep domain expertise as a durable moat.

## [Engineering Speed at Scale — Architectural Lessons from Sub-100-ms APIs](https://www.infoq.com/articles/engineering-speed-scale/)

This InfoQ article argues that low latency doesn't come from micro-optimizing a few lines of code—it is the result of deliberate architectural design, and should be treated as a first-class product feature alongside security and reliability. At scale, a few dozen milliseconds of delay compound across service hops and drag down conversion rates. The central tool is a **latency budget**: slicing a 100ms target across edge, gateway, service logic, data access, and network hops so that every new feature must answer "which layer gives up milliseconds to pay for this?" Most latency, the author notes, comes from network hop count, JSON serialization overhead, cold caches, unindexed queries, and slow downstream dependencies rather than "slow code."

Core technical patterns include bounded asynchronous fan-out with `CompletableFuture` and carefully sized thread pools, two-tier caching (local in-process Caffeine backed by Redis ahead of the database) with explicit invalidation strategies and sensitivity classification, plus circuit breakers and timeouts aligned with the latency budget to fail fast instead of queuing requests. Observability is non-negotiable: tracking p50/p95/p99 percentiles, distributed tracing, and burn-rate SLO alerts to catch regressions early. Ultimately, culture is what keeps a system fast over time—when the whole team owns latency and bakes performance questions into design reviews and release gates.

## [Can AI Agents Build Real Stripe Integrations?](https://stripe.com/blog/can-ai-agents-build-real-stripe-integrations)

Stripe wanted to know whether AI agents can build a complete, working payment integration end to end—because in payments, an "almost working" integration is still a broken one. They built a benchmark of 11 realistic project environments complete with source code, databases, setup scripts, and test API keys, graded by automated API and browser-based end-to-end tests. Tasks fall into three categories: backend-only (migrations, API version upgrades), full-stack (requiring browser interaction to complete checkout flows), and focused "gym" exercises targeting a single product like Checkout or subscriptions. Every model ran inside the same `goose`-based harness with MCP servers providing terminal access, browser automation, and Stripe documentation search.

The results beat expectations: Claude Opus 4.5 averaged 92% across four full-stack tasks, while GPT-5.2 led the gym suite at 73% across two tasks. Agents successfully migrated legacy Card Element integrations to Stripe Checkout, used Stripe Link autonomously to complete test payments, and reverse-engineered over 80% of required API parameters from an existing Checkout UI. Still, models struggled with ambiguity—for instance, treating a `400 Bad Request` caused by dummy payload data as proof that an endpoint worked—and occasionally gave up when browser automation got stuck even though a simple page reload would have fixed it. Stripe has open-sourced the benchmark inside its AI toolkit to help the community improve agent tooling; building it already helped Stripe spot and fix gaps in its own documentation.

### Bonus

**Images:**
![CPU vs GPU vs TPU](https://substackcdn.com/image/fetch/$s_!SFnp!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fdf0d363e-62b7-4b3f-940d-d19f7a55c610_3000x3900.png)
![How OAuth 2 Works](https://substackcdn.com/image/fetch/$s_!ipY-!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F2931d40e-cce8-4ecd-a520-b5f80679c315_2528x3626.png)
![How Distributed Tracing Works at the High Level?](https://substackcdn.com/image/fetch/$s_!Ehq9!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F4f417b56-c66c-45fd-8308-dab9af381ced_2252x2752.png)
![Top 4 API Gateway Use Cases](https://substackcdn.com/image/fetch/$s_!4UUW!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F0357d808-5db9-4e18-8262-8dee58fd697d_2508x3000.jpeg)

---

*This post was rewritten by Claude Code with Opus 5.5 on 27/09/2026; reviewed and edited by Codex with GPT 6.1 Sol on 09/11/2026, and re-verified by Claude Code with Sonnet 5.5 on 16/11/2026.*
