---
title: "Newsletter #49"
date: 2025-08-08
tags: ["AI-Assisted", "PostgreSQL", "LLM", "AI Coding", "Virtual-Threads", "Developer-Survey", "Technology-Selection"]
categories: ["Newsletter"]
---

*Enjoy Newsletter #49.*

## [PostgreSQL at Scale: Database Schema Changes Without Downtime](https://medium.com/paypal-tech/postgresql-at-scale-database-schema-changes-without-downtime-20d3749ed680)

James Coleman's article on the PayPal Engineering blog (originating from the Braintree Payments team) distills lessons from running PostgreSQL schema migrations on a payment system where scheduled downtime is not an option. The foundational rule is that application code and database schemas must be both forward- and backward-compatible so deployments can roll out gradually and roll back safely; any exclusive lock on a table or index may be held for at most about 2 seconds. The team never wraps multiple DDL statements in a single transaction to avoid deadlocks, nor do they define schema rollback operations: dropping a newly added column can lose data, and re-adding a constraint can fail, so when something goes wrong they write a new migration and "roll forward" instead of rolling back.

Most of the article walks through specific operations. Rather than letting PostgreSQL acquire locks blindly, they explicitly acquire locks with a `lock_timeout`, check `pg_locks` beforehand to avoid queuing behind long-running queries, and sleep between retries so blocked queries can drain. Indexes are created and dropped with `CREATE INDEX CONCURRENTLY` and `DROP INDEX CONCURRENTLY`; foreign keys and `CHECK` constraints are added as `NOT VALID` and validated separately with `VALIDATE CONSTRAINT` to avoid scanning the entire table under a heavy lock; to enforce non-null values, they use `CHECK (column IS NOT NULL)` instead of directly adding `NOT NULL`; and adding a column with a default value required multiple steps prior to PostgreSQL 11. At the end, the team introduces their open-source Ruby on Rails gem `pg_ha_migrations`, which codifies these rules.

## [The Big LLM Architecture Comparison: From DeepSeek-V3 to Kimi K2](https://magazine.sebastianraschka.com/p/the-big-llm-architecture-comparison)

Researcher Sebastian Raschka places prominent open-weight large language models side by side to answer a key question: years after the original GPT, how much has the underlying architecture actually changed? The answer is that the Transformer backbone remains largely the same; the differences lie in targeted refinements. DeepSeek V3/R1 uses Multi-Head Latent Attention (MLA) to compress the KV cache and Mixture-of-Experts (MoE) with 256 routed experts plus one shared expert, activating 8 selected experts alongside the shared expert per token—so out of 671 billion total parameters, only about 37 billion are active during inference. OLMo 2 places RMSNorm in a Post-Norm arrangement and adds QK-Norm for training stability; Gemma 3 uses sliding window attention to shrink KV cache memory; Mistral Small 3.1 optimizes for inference speed; Llama 4 interleaves MoE blocks with dense blocks; Qwen3 offers both dense and MoE variants; SmolLM3 drops positional encoding on every fourth layer (NoPE); and Kimi K2, at roughly 1 trillion parameters, builds on the DeepSeek V3 architecture while scaling up the number of experts and reducing the number of attention heads in MLA.

The broader trend is clear: MoE is increasingly standard for scaling capacity while keeping inference costs low, more efficient attention variants like Grouped-Query Attention, MLA, and sliding window attention are replacing classic Multi-Head Attention, and teams prioritize performance optimization over inventing radically new architectures. The article explains why equal parameter counts do not translate to equal operating costs.

## [From Async/Await to Virtual Threads](https://lucumr.pocoo.org/2025/7/26/virtual-threads/)

Armin Ronacher, creator of Flask and Jinja, argues that Python's `async`/`await` model pushes too much internal complexity onto users. The most visible symptom is "colored functions": async functions and synchronous functions cannot call each other directly, splitting the library ecosystem in two. Task cancellation is also hard to get right—for instance, `aiofiles` does not support proper cancellation and can hang under structured concurrency. As Python introduces free-threading, developers now have to worry about the pitfalls of both async and traditional multithreading at the same time.

His proposal is virtual threads: lightweight threads managed by the runtime rather than the operating system, making blocking operations non-blocking transparently and eliminating the need for `async`/`await` keywords. Threads are organized into thread groups in the spirit of structured concurrency: child threads cannot outlive their parent, context variables are inherited automatically from parent to child, if one child thread fails the remaining siblings are cancelled, and the group finishes only when all child threads complete. The author stresses that this is a thought experiment to spark discussion, with many open questions around syntax and variable scoping in Python still unresolved; the snippet below illustrates downloading multiple URLs with at most 8 concurrent threads.

```python
def download_all(urls):
    results = {}
    with ThreadGroup(max_concurrency=8) as g:
        for url in urls:
            g.spawn(partial(download_and_store, results, url))
    return results
```

## ~~[Six Principles for Production AI Agents](https://www.app.build/blog/six-principles-production-ai-agents)~~

~~With the rapid rise of AI agents in real-world applications, taking them to production demands solid design principles. This article presents 6 core principles for building reliable AI agents in production environments:~~

~~**1. Invest in the System Prompt**: Focus on clear, direct instructions. Modern models need detailed, non-contradictory context rather than clever prompt hacks.~~

~~**2. Separate Context**: Provide minimal initial knowledge and let tools fetch additional context on demand. Use "context compression" to manage complexity.~~

~~**3. Design Tools Carefully**: Build focused, thoroughly tested tools. Limit the number of tools, keep parameters explicit, and ensure idempotency.~~

~~**4. Design Feedback Loops**: Use an actor-critic approach that allows creative generation backed by strict verification, including domain-specific checks.~~

~~**5. Analyze Failures with LLMs**: Use multiple agents to analyze logs and execution trajectories, leveraging LLMs to pinpoint areas for improvement.~~

~~**6. Treat Frustrating Behavior as System Bugs**: Understand that agents may "hack" instructions. Debug the system design before blaming the model.~~

~~Key takeaway: "Building effective AI agents isn't about finding a silver bullet... it's about sound system design and software engineering."~~

## [Working Effectively with AI Coding Tools like Claude Code](https://sajalsharma.com/posts/effective-ai-coding/)

Sajal Sharma distills best practices for working effectively with AI coding tools like Claude Code, starting from a clear premise: AI excels at implementation, while humans must own architecture, judgment, and strategy. The center of gravity therefore shifts from writing code to writing specifications: settle architectural questions first, check detailed specs into version control, and only then let AI implement them. Treat AI like a talented pair programmer who lacks business context—read every line of code it generates and watch out for shortcuts like overusing TypeScript's `any` or patching symptoms instead of root causes, because AI generates code faster than humans can review it.

On workflow, the author recommends writing highly specific prompts, always asking the AI why it chose a given approach, and using a second model to cross-check complex decisions. Have the AI draft a plan first, review it carefully, save it as a markdown file to track progress, and start a fresh chat for each feature since long conversations degrade consistency. With Claude Code, `CLAUDE.md` serves as a map pointing to architecture docs, API specs, and active plans; shared slash commands in `.claude/commands/` standardize workflows across the team; and specialized subagents for planning, implementation, review, and research keep each agent's context lean. The productivity gains are real, but only when quality is guarded through constant vigilance.

## [When Software Engineers Think They Need More Focus Time](https://jola.dev/posts/enough-focus-time)

Jola's article challenges the common belief that software engineers always need more uninterrupted focus time to write code. In the author's view, an engineer's job is to create impact, solve problems, and deliver real value—and the highest-value work often happens outside the code editor: catching a flawed assumption in a product meeting before the whole project veers off course, asking a clarifying question that saves the team weeks of effort, pairing with a stuck junior teammate, or reviewing a design doc before implementation begins. Engineers who block off their calendars to code in isolation easily miss these exact opportunities for leverage.

The author doesn't dismiss focus time, but advises using it intentionally: measure productivity by value delivered rather than hours spent coding, communicate your schedule clearly (for instance, deep work in the morning, available to help in the afternoon), continually ask whether you are solving the right problem, and remember that an engineer's impact extends beyond source code. The core spirit of the piece can be summed up in one sentence: the goal is not to write code; the goal is to solve problems.

## [Making Postgres 42,000x slower because I am unemployed](https://byteofdev.com/posts/making-postgres-slow/)

A hilarious yet educational experiment: the author sets a rule that only `postgresql.conf` may be modified and the database must still complete at least one transaction within a reasonable time, then tries to make PostgreSQL as slow as humanly possible. The benchmark is TPC-C with 128 warehouses run via BenchBase across 100 connections on a Ryzen 7950X with 32GB of RAM. Starting from a baseline of roughly 7,082 transactions per second, shrinking `shared_buffers` down to a few megabytes forces constant reads through the OS and drops throughput to a few hundred TPS; configuring autovacuum to run continuously with ultra-low thresholds pushes it down to about 293; forcing constant WAL checkpoints with full sync brings it down to around 98.

The final two steps hit hardest: tweaking planner cost parameters like `random_page_cost` so the query planner virtually refuses to use indexes drops throughput below 1 TPS; then setting `io_method` and `io_workers = 1` in a new development build of PostgreSQL funnels all I/O through a single worker, bringing reported throughput down to 0.016 TPS. Compared to 7,082, that is a slowdown of roughly 440,000x. Read in reverse, the post is a hands-on lesson in what each setting actually does: buffer pools, autovacuum, WAL, planner cost constants, and parallel I/O all have massive performance impacts and should be tuned to real workloads rather than tweaked blindly.

## [Stack Overflow Developer Survey 2025](https://survey.stackoverflow.co/2025/)

Stack Overflow's 15th annual Developer Survey gathered over 49,000 responses from 177 countries, covering 62 questions across 314 technologies. The standout finding is the gap between AI adoption and trust: 84% of respondents use or plan to use AI tools, and 47% use them daily, yet only about a third trust their accuracy while 46% actively distrust them. The biggest frustration (66%) is solutions that are "almost right, but not quite," followed by the difficulty of debugging AI-generated code; most developers are also not using AI agents yet.

On the technology front, Python jumped 7 percentage points to 57.9%, a rise the report links to AI and data science; JavaScript remains on top, and Visual Studio Code continues as the most popular IDE; OpenAI's GPT models are the most used while Claude Sonnet is the most admired, and Rust's Cargo is the most admired infrastructure tool. On the career side, only about 24% of developers report being happy at work (up from the previous year), roughly a third work fully remote, and "architect" entered the top four most common roles for the first time. For junior developers, this offers a useful compass: AI has become an everyday tool, but the ability to verify its output is what sets engineers apart.

## [Choose Boring Technology, Revisited](https://www.brethorsting.com/blog/2025/07/choose-boring-technology,-revisited/)

Aaron Brethorst revisits Dan McKinley's 2015 classic "Choose Boring Technology" and argues that the principle matters even more in the age of AI. The original idea is that every organization has a limited budget of "innovation tokens" to spend intentionally: use familiar tools when solving novel business problems, and accept only one new unknown at a time when learning. "Boring" technology has the advantage of well-understood failure modes, known capabilities, and proven operational reliability.

The new twist is that AI assistants can generate professional-looking code for any tech stack imaginable, creating a false sense of confidence. When you combine multiple unfamiliar technologies with AI-written code, you lose the ability to verify the output: you don't know whether the framework choice makes sense, nor what failure modes to watch out for. Therefore, before introducing a new technology into a project, ask yourself whether you are qualified to review AI-generated code in that stack; invest the time to understand a new tool deeply enough to audit AI's suggestions; and don't use AI as an excuse to adopt several unfamiliar technologies at once. As the author puts it, AI should be a force multiplier for technologies you already understand, not a crutch for ones you don't.

## [Agentic Coding Things That Didn't Work](https://lucumr.pocoo.org/2025/7/30/things-that-didnt-work/)

In contrast to typical success stories, Armin Ronacher shares the AI agent automations he tried and ultimately abandoned. None of his custom slash commands survived: `/fix-bug` was no better than pasting a GitHub issue link with his own thoughts, `/commit` never matched his commit message style, `/add-tests` and `/fix-nits` were worse or redundant compared to plain prompts, and `/next-todo` went practically unused. Hooks proved awkward to control and ran formatters after every edit rather than at the end of a session, so he switched to intercepting commands via `PATH` for simplicity; print mode (90% deterministic code, 10% inference) looks promising but remains slow and hard to debug; subagents help parallelize work but create messes when reading and writing simultaneously, so he usually opens separate sessions or shares context via markdown files instead.

What actually worked turned out to be remarkably simple: talking to the machine via speech-to-text to convey richer context, manually copying and pasting curated context, and letting the agent read `git status` to figure out which files need attention. The most important warning in the article is that automating through LLMs easily tempts users to stop thinking like engineers—at which point quality drops, time is wasted, and you neither understand the system nor learn anything. His rules of thumb: only automate tasks you do constantly, delete unused automations immediately, and evaluate outputs critically before trusting them.

## [Vibe Code is Legacy Code](https://blog.val.town/vibe-code)

Steve Krouse of Val Town reminds readers that Andrej Karpathy coined "vibe coding" to describe a style of coding with AI where you "forget that the code even exists." And code that nobody understands already has a name: legacy code. Programming is fundamentally theory-building rather than line-of-code production, so when you vibe code, you accumulate technical debt at the exact speed the LLM generates tokens. That makes vibe coding a great fit for prototypes and throwaway projects—like small apps the author built to calculate growth rates or propose to his partner—because code only becomes a burden when you have to maintain it. Vibe coding is also a spectrum: the better you understand the code, the less you are "vibing."

The worst-case scenario is a non-programmer vibe-coding a large project meant to be maintained long-term, which is like handing a credit card to a child without explaining debt: exciting at first, until the bill arrives a month later, and asking AI to fix the bugs at that point is like paying off one credit card with another. For serious projects, the author agrees with Karpathy: keep AI on a tight leash like an overeager intern, move deliberately, and use every opportunity to learn. Val Town uses its assistant Townie both ways—sometimes to vibe code, sometimes to make surgical edits in production projects—and the author believes theory-building will remain at the heart of complex software development.

---

*This post was rewritten by Claude Code with Opus 5.5 on 27/09/2026; reviewed and edited by Codex with GPT 6.1 Sol on 09/11/2026, and re-verified by Claude Code with Sonnet 5.5 on 16/11/2026.*
