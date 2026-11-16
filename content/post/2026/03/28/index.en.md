---
title: "Newsletter #93"
date: 2026-03-28
tags: ["AI-Assisted", "Newsletter", "AI", "PostgreSQL", "Rust", "System Design", "Performance"]
categories: ["Newsletter"]
---

*Enjoy Newsletter #93.*

## [Lessons from Building Claude Code: How We Use Skills](https://x.com/trq212/status/2033949937936085378)

Thariq Shihipar, an engineer at Anthropic, distills lessons from running hundreds of internal skills in Claude Code. The first misconception he corrects is that skills are "just markdown files": each skill is actually a directory that can bundle scripts, reference assets, and data for the agent to discover and execute, along with configuration options like dynamic hook registration. Surveying their internal catalog, the team found that effective skills fall into nine recurring categories: library and API references, product verification, data fetching and analysis, team workflow automation, code scaffolding, code quality enforcement, CI/CD and deployment, incident runbooks, and infrastructure operations. Great skills fit cleanly into one category; confusing ones straddle several.

When authoring skills, he advises skipping obvious instructions and focusing on where you need to nudge Claude away from its default habits—a "Gotchas" section built up from real failure modes is consistently the highest-leverage part. The frontmatter `description` isn't a human summary; it tells the model *when* to trigger the skill. Skills can persist per-user settings in `config.json` (prompting via `AskUserQuestion` when missing), keep lightweight "memory" in append-only logs or JSON files inside a stable data directory, and ship helper scripts so Claude spends turns composing tools rather than regenerating boilerplate. Finally, skills can reference one another by name, and the team tracks skill invocations via a `PreToolUse` hook to spot popular skills and prune dead ones.

## [The Future Of Software Engineering with Anthropic](https://www.akashbajwa.co/p/the-future-of-software-engineering)

Akash Bajwa summarizes a roundtable with Anthropic's Ash Prabaker and engineering leaders from Stripe, NVIDIA, Microsoft, Google DeepMind, xAI, Apple, Scale AI, and OpenAI on how AI is reshaping software development. Claude Code started in late 2024 as a humble CLI built not for the models of the day, but for where model capabilities would be six to twelve months later—and spread organically through bottom-up utility rather than top-down mandates. A recurring theme is the recursive improvement loop: better coding tools help build better models, which in turn improve the tools; several companies already run pipelines that autonomously triage production bugs, cross-check against eval suites, and open fix PRs with minimal human intervention.

Across engineering workflows, test-first development has become the default, human code review increasingly feels more like a bottleneck than a safety net, and inline code comments are making a comeback because future agent sessions rely on them. Human-written architectural context remains invaluable, whereas stale or auto-generated documentation actively misleads agents. In hiring, several leaders now prize engineers who experiment relentlessly at the frontier of tool capabilities over raw hand-coding speed. Open challenges include multi-hour autonomous agent runs that still preserve meaningful human oversight, large-scale context management, and the paradox that when AI makes building almost anything feasible, ruthless prioritization becomes harder than ever.

## [Rob Pike's 5 Rules of Programming](https://www.cs.unc.edu/~stotts/COMP590-059-f24/robsrules.html)

Rob Pike, co-creator of Go and veteran of Bell Labs, distilled five pithy rules of programming included here in the course readings for COMP590 at UNC. Rules 1 and 2 address optimization: you cannot tell in advance where a program will spend its time because bottlenecks show up in surprising places, so don't put in speed hacks until you've measured and proven that one part of the code overwhelms the rest. Together, they restate Tony Hoare's famous maxim that "premature optimization is the root of all evil."

Rules 3 and 4 warn that fancy algorithms have big constant factors that make them slow when `n` is small—and `n` is usually small—and they are much buggier and harder to implement, so stick to simple algorithms and simple data structures; as Ken Thompson put it, "when in doubt, use brute force." Rule 5 is the heart of the list: data dominates. Once you've chosen the right data structures and organized things well, the algorithms will almost always be self-evident; data structures, not algorithms, are central to programming.

## [Introduction to PostgreSQL Indexes](https://dlt.github.io/blog/posts/introduction-to-postgresql-indexes/)

Dalto Curvelano explains the internals of PostgreSQL indexes for developers who have an intuitive grasp of indexes but want to understand how they work under the hood. The article starts with how rows live inside 8KB heap pages and why indexes cut down page reads: in a benchmark on a million-row table, a sequential scan takes ~265ms while an index lookup takes just 0.077ms. As a rule of thumb, an index only pays off when a query returns less than roughly 15–20% of the table; beyond that, the query planner usually prefers a sequential scan. Nor are indexes free: they consume disk space, slow down `INSERT`/`UPDATE`/`DELETE` operations, occupy buffer cache memory, and give the query planner more paths to evaluate, so they shouldn't be sprinkled everywhere.

Most of the guide surveys PostgreSQL's index types. B-Tree is the versatile default; starting in PostgreSQL 18, B-Tree skip scan allows composite indexes to be used even when a query omits the leading column. Hash indexes only support equality checks, but are more compact than B-Trees on wide values like UUIDs or URLs; BRIN indexes are tiny and shine on append-only, naturally ordered time-series tables; GIN handles full-text search, arrays, and `JSONB`; and GiST/SP-GiST cover geometric and range data. The post also walks through partial indexes (indexing only a filtered subset of rows), covering indexes with `INCLUDE` (enabling index-only scans when the visibility map allows skipping heap fetches), and expression indexes over computed values.

## [Using Rust and Postgres for everything: patterns learned over the years](https://kerkour.com/rust-postgres-everything)

Sylvain Kerkour shares the architectural patterns he has refined from running Rust and PostgreSQL as the backbone for nearly every backend project—guided by a philosophy of picking boring, dependable tools to minimize operational cost and complexity. He opens with a real-world rewrite of a data-processing service from Go to Rust paired with a high-performance memory allocator: batch processing time dropped from roughly 30 minutes to under 5 minutes, RAM usage fell from 4GB to 512MB, and nil-pointer panics disappeared entirely.

On the application side, he favors `sqlx` over heavy ORMs for its simplicity, performance, and compile-time SQL verification macros, and batches writes in chunks of up to 10,000 rows using `UNNEST` to avoid overwhelming the database. Even better, PostgreSQL replaces a sprawl of auxiliary infrastructure: `pg_try_advisory_lock()` handles leader election (for instance, coordinating distributed CRON schedulers) without ZooKeeper or Redis; `UNLOGGED` tables replace Redis for ephemeral caches by skipping the WAL for much faster writes at the cost of crash durability; and PostgreSQL serves as a rock-solid job queue when combining UUIDv7 primary keys (to avoid B-tree index fragmentation) with `FOR UPDATE SKIP LOCKED` for worker polling.

## [air traffic control: the IBM 9020](https://computer.rip/2026-01-17-air-traffic-control-9020.html)

J. B. Crawford tells the story of the IBM 9020—the custom multiprocessor mainframe built for the US Federal Aviation Administration (FAA) to automate en-route air traffic control, with the first full system installed in 1967. Earlier, the military's SAGE air-defense computer had been considered for civilian traffic control, but it couldn't verify whether assigned altitudes were unique or detect loss of safe separation between aircraft at a time when mid-air collisions were an urgent political crisis.

Under the hood, an IBM 9020 tied together six or seven modified System/360 compute elements sharing memory through dedicated Storage Elements, orchestrated by a real-time control program managing hundreds of radar and display peripherals. Its standout engineering achievement was fault tolerance: when a hardware fault occurred, the Operational Error Analysis Program (OEAP) automatically diagnosed the failure, ignored transient glitches, or rewrote configuration registers on the fly to isolate a failed compute or storage element so air traffic control could continue uninterrupted. The 9020 stayed in service into the mid-1980s—with display subsystems lasting into the 1990s—proving that commercial-grade computer architectures could handle life-critical workloads when paired with disciplined redundancy and fault-recovery software.

## [SFQ: Simple, Stateless, Stochastic Fairness](https://brooker.co.za/blog/2026/02/25/sfq.html)

Marc Brooker highlights Stochastic Fairness Queuing (SFQ), an algorithm from a 1990 paper by Paul McKenney and one of his favorite compact building blocks for distributed systems. Classic fair queuing maintains a separate queue per tenant, requiring O(tenants) queues and matching scheduling overhead—impractical at cloud scale. SFQ instead allocates a fixed O(1) array of queues and hashes each tenant ID to a queue. Because two tenants that hash to the same bucket would stay stuck together if one is a "noisy neighbor," SFQ periodically rotates the hash seed so tenants that collide in one epoch are overwhelmingly unlikely to collide in the next.

Brooker then describes a modern variant combining SFQ with shuffle sharding and the power of two choices: each tenant is hashed to a small subset of queues (often just two), each incoming request is placed into whichever of those queues is shorter, and the hash seed rotates periodically. The result keeps queue count, enqueue cost, and dequeue cost at O(1) while strongly isolating noisy neighbors from well-behaved tenants—as long as noisy tenants are a small fraction of the population. The pattern works both inside a single multi-tenant server and across a fleet of backend workers.

## [How many branches can your CPU predict?](https://lemire.me/blog/2026/03/18/how-many-branches-can-your-cpu-predict/)

Daniel Lemire measures how many conditional branches a modern CPU's branch predictor can "memorize." His benchmark loops over an array of random integers and conditionally writes to a buffer only when a value is odd—so on fresh random data, the CPU mispredicts roughly 50% of the time. However, if you repeatedly loop over the *exact same* random sequence, the branch predictor learns the pattern; increasing the sequence length reveals the capacity threshold where the predictor overflows and performance drops back to random guessing. The results: AMD Zen 5 perfectly predicts sequences of roughly 30,000 branches, Apple's M4 handles around 10,000, and Intel's Emerald Rapids manages only about 5,000—six times fewer than Zen 5.

The practical lesson is a warning for microbenchmarking: if your test input is small enough to fit inside the CPU's branch history tables, the processor will memorize the exact branch pattern and report numbers far faster than what you will ever see on real production traffic. Reliable benchmarks require input datasets large and varied enough to defeat branch memorization.

### Bonus

**Images:**
![Different Types of Tests](https://substackcdn.com/image/fetch/$s_!tS1T!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F958d36d9-6b19-4949-b6a6-6aa614ede834_2508x2960.jpeg)
![How Single Sign-On (SSO) Works](https://substackcdn.com/image/fetch/$s_!c4WE!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd86cd367-494f-4031-9793-f27e6142e54b_2508x3000.png)
![How LLMs Use AI Agents with Deep Research](https://substackcdn.com/image/fetch/$s_!em-f!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F7e7e23e9-2a5a-4b06-a3fa-ccb6c5493f1d_2508x3000.png)
![How hackers steal passwords](https://substackcdn.com/image/fetch/$s_!kRPi!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F3d3b2bb9-fc09-48d9-89b7-52bc37098af9_2360x2960.png)

---

*This post was rewritten by Claude Code with Opus 5.5 on 27/09/2026; reviewed and edited by Codex with GPT 6.1 Sol on 09/11/2026, and re-verified by Claude Code with Sonnet 5.5 on 16/11/2026.*
