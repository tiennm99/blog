---
title: "Newsletter #111"
date: 2026-06-11
tags: ["AI-Assisted", "Newsletter", "Rust", "PostgreSQL", "LLMs", "AI Agents", "Infrastructure"]
categories: ["Newsletter"]
---

*Enjoy Newsletter #111.*

## [Learnings from 100K Lines of Rust with AI](https://zfhuang99.github.io/rust/claude%20code/codex/contracts/spec-driven%20development/2025/12/01/rust-with-ai.html)

Cheng Huang recounts using AI agents like Claude Code, Codex CLI, and Copilot to modernize Azure's Replicated State Library (RSL) — a multi-Paxos consensus engine — in Rust. The resulting codebase reached roughly 130k lines of code and over 1,300 tests. To get AI to correctly implement such a complex distributed system, the author relied heavily on "code contracts": having the AI write preconditions, postconditions, and invariants for critical functions, enforcing them as runtime `assert`s during testing, and using them to drive both targeted unit tests and property-based tests. That approach caught a subtle Paxos safety violation before the code ever reached production.

The second technique was lightweight spec-driven development: instead of maintaining rigid, heavyweight requirements and design docs, the author used `spec-kit`'s `/specify` command to generate user stories with acceptance criteria, followed by `/clarify` so the AI could critique and refine them; each user story then became a right-sized unit of work for an agent. The third technique was AI-driven performance optimization: over roughly three weeks, the AI added latency instrumentation, ran benchmarks, analyzed bottlenecks, and proposed improvements like reducing allocations, zero-copy parsing, and cutting lock contention — pushing throughput from ~23k to 300k operations per second while Rust preserved memory safety. The author closes with the hope that agents will soon execute entire user stories end to end, automate the contract workflow, and optimize performance across even larger codebases, while humans retain architectural oversight.

## [Always Be Blaming](https://matklad.github.io/2026/05/18/always-be-blaming.html)

matklad proposes reading code across multiple "dimensions." 2D reading means forming your own mental sketch of how a solution should look first, then comparing it against the actual code to spot surprises; 3D reading means tracing how the code evolved over time, because most production code is Markovian — its shape today depends on its shape yesterday, not just on the problem it solves. The fourth dimension, and the highest goal, is reconstructing the original author's reasoning and train of thought — applying "theory of mind" to reading code.

To do that, matklad treats `git` history as a first-class investigative tool. On GitHub, press `y` to pin the URL to a specific commit SHA, open the blame view, and repeatedly click "blame prior to change," opening relevant commits in new tabs and browsing surrounding files at that exact point in time. Locally, he uses custom keybindings: `,b l` to check out the commit that last touched the current line, `,b p` to step back to the parent commit, `,b u` to jump back to the previous inspection point, and `,b w` to copy the GitHub link. This "in-place blame" workflow keeps the LSP, test runner, and search tools like `rg` working normally as you travel through time. He also laments that code review comments — an invaluable source of context — remain locked inside third-party hosting databases rather than living inside the Git repository itself.

## [Scaling PostgreSQL to power 800 million ChatGPT users](https://openai.com/index/scaling-postgresql/)

Bohan Zhang shares how OpenAI scaled PostgreSQL to serve ChatGPT and its API across roughly 800 million users. In just one year, PostgreSQL load grew more than 10x, yet the system still relies on a single Azure primary for all writes paired with nearly 50 read replicas spread across multiple regions. The biggest pressure point is write amplification: PostgreSQL's MVCC copies an entire row on every update, amplifying both writes and reads while bloating tables and indexes. To protect the primary, OpenAI offloaded write-heavy, easily partitionable workloads to Azure Cosmos DB, banned adding new tables to the existing PostgreSQL cluster, and held off on sharding because it would require rewriting hundreds of application endpoints.

Most overload incidents followed the exact same cascade: an upstream trigger — a wave of cache misses, an expensive join, or a write spike from a feature launch — pushed latency up, requests timed out, and client retries amplified the load into a death spiral. To break that chain, OpenAI optimized expensive queries, deployed PgBouncer for connection pooling, added cache locking to prevent cache-miss stampedes, isolated workloads by priority tier, enforced multi-layer rate limiting, capped schema migrations at a 5-second timeout, and throttled backfills. They are also testing cascading replication with Azure to add more read replicas without making the primary ship WAL to all of them directly. As a result, PostgreSQL handles millions of queries per second while keeping client-side p99 latency in the tens of milliseconds and maintaining five-nines availability.

## [Scaling Managed Agents: Decoupling the brain from the hands](https://www.anthropic.com/engineering/managed-agents)

Anthropic explains the architecture behind Claude Managed Agents, their hosted service for running long-lived AI agents. The starting observation is that agent harnesses often bake in workarounds for whatever current models struggle with, and those assumptions quickly go stale as models improve. Rather than bundling the model, harness, sandbox, and session state inside a single container, Anthropic decoupled them into three components behind stable interfaces — much like an operating system virtualizes hardware: the session is an append-only event log, the harness is the control loop coordinating Claude and tool calls, and the sandbox is the code execution environment. The pieces communicate through clean primitives like `execute()`, `emitEvent()`, `getSession()`, and `getEvents()`.

This decoupling turns containers from "pets" that must be kept alive into disposable "cattle": a crashed sandbox is just a failed tool call that can be spun up fresh, while the stateless harness can restart at any time and resume from the session event log. A single harness can also coordinate multiple sandboxes, including reaching into a customer's VPC without requiring network peering. On security, credentials never live inside the sandbox where untrusted code runs; tokens are either bound to resources at provisioning time or held in a vault behind an authenticating proxy, making them much harder for prompt injections to steal. Latency improved dramatically too, because inference starts immediately without waiting for a container to boot — cutting time-to-first-token by roughly 60% at p50 and over 90% at p95.

### Bonus

**Images:**
![How does Claude Code keep long sessions from running out of context?](https://substackcdn.com/image/fetch/$s_!fap_!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fc111a2c6-71bd-45a7-8938-e8bb4f772cbc_1378x1390.png)
![How does a request actually travel through Claude Code?](https://substackcdn.com/image/fetch/$s_!VfjL!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F38f19060-e838-440a-971d-bdc1f2d3a167_1280x1546.jpeg)
![Forward Proxy, Reverse Proxy, and API Gateway Explained](https://substackcdn.com/image/fetch/$s_!cqW0!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F2e0de719-d0ac-497e-8f9c-b9c841422db8_2484x3002.png)
![RAGs vs Agents](https://substackcdn.com/image/fetch/$s_!eLEi!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F52ccd4c2-dc53-4b9a-95b9-d87d6c353f88_2484x3002.png)

---

*This post was rewritten by Claude Code with Opus 5.5 on 27/09/2026.*
