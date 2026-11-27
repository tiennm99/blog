---
title: "Newsletter #61"
date: 2025-11-25
tags: ["AI-Assisted", "Open Table Formats", "Spec-Driven Development", "Agentic Engineering", "JIT", "Compilers", "PostgreSQL"]
categories: ["Newsletter"]
---

*Been 'offline' for quite a while, finally resurfacing today. Enjoy Newsletter #61.*

## [Beyond Indexes: How Open Table Formats Optimize Query Performance](https://jack-vanlightly.com/blog/2025/10/8/beyond-indexes-how-open-table-formats-optimize-query-performance/)

Jack Vanlightly, who previously worked on SQL Server performance tuning and now specializes in data systems, pushes back against the idea that open table formats (OTFs) like Apache Iceberg or Delta Lake should add secondary indexes like relational databases. In an OLTP RDBMS, B-tree clustered indexes and secondary indexes quickly locate one or a few rows in exchange for higher write overhead. Analytical queries are fundamentally different: they scan millions of rows of immutable, columnar data stored on object storage like S3, so chasing secondary-index pointers offers almost no benefit.

Instead, OTFs speed up queries through data skipping: pruning entire irrelevant files before reading them. Data skipping relies on physical layout (partitioning, sorting, compaction), min/max statistics in manifests and data files, and file- or row-group-level Bloom filters where supported, alongside complementary tools like materialized views. The author sums it up as "layout is king": performance comes from organizing data so partitions match filter predicates and similar values sit close together. Materialized views are the closest equivalent to a secondary index, and the path forward is letting query engines build their own optimizations on top of standard table specs rather than cramming complex index structures into the OTF specification itself.

## [What's The Deal With GitHub Spec Kit](https://den.dev/blog/github-spec-kit/)

Den Delimarsky observes that while LLMs are useful for coding, their output varies wildly: for the same requirement, different prompts produce very different code. His proposed solution is Spec-Driven Development (SDD), where a specification clearly defines the "what" and "why" of a feature while deliberately leaving out technical implementation details. GitHub Spec Kit is an experimental open-source toolkit that puts this workflow into practice through a sequence of slash commands: `/constitution` sets core principles, `/specify` writes the spec, `/clarify` resolves ambiguities, `/plan` creates the technical plan, `/tasks` breaks down the work, and `/analyze` checks consistency before implementation.

In the author's view, an LLM is like an over-eager junior engineer who needs clear requirements and guidance. With SDD, the specification becomes an executable document while the source code becomes disposable—something that can be regenerated and verified on demand; decoupling the spec from a specific tech stack also makes it easy to compare multiple implementations. He illustrates this by building a tool that aggregates webcam images from Mauna Kea in under two hours, while stressing that specs are no silver bullet: humans still have to supervise and iterate continually. As models grow more capable, the bottleneck shifts to accurately communicating developer intent, and a solid spec is how you solve it.


## [Just Talk To It - the no-bs Way of Agentic Engineering](https://steipete.me/posts/just-talk-to-it)

Peter Steinberger shares his agentic engineering workflow for projects where nearly all the code is written by AI. His central message is "just talk to it": instead of chasing elaborate frameworks, work directly with a capable model, use it enough to build intuition, and keep your workflow dead simple. He prefers `GPT-5-Codex` over Claude Code because it uses context more efficiently, runs faster, supports message queueing, and reads more files before acting. His prompts are often just one or two sentences paired with a screenshot pointing out what needs fixing. A key concept is "blast radius": estimating how many files a change will touch so you can slice work sensibly, run multiple agents in parallel across terminal panes, and commit in small increments.

He favors CLIs over MCPs to avoid wasting context, writes tests right after each feature in the same session, and spends roughly 20% of his time having the agent refactor code. Conversely, RAG, subagents, "plan mode," and convoluted agent instructions aren't worth much in his experience. His toolkit consists of Codex CLI, Wispr Flow for voice input, `tmux` for background tasks, and `ast-grep` for code checks, backed by an ~800-line `Agents.md` file. His takeaway: building great software is still hard, the required skillset resembles managing senior engineers, and the bar for architecture and user experience is higher than ever.

## [JIT: so you want to be faster than an interpreter on modern CPUs](https://www.pinaraf.info/2025/10/jit-so-you-want-to-be-faster-than-an-interpreter-on-modern-cpus/)

Pinaraf, who is developing a JIT compiler for PostgreSQL, explains why a JIT isn't automatically faster than an interpreter on modern CPUs. Today's CPUs are superscalar, out-of-order machines with sophisticated branch predictors capable of executing multiple instructions in parallel and hiding latency remarkably well. Traditional interpreters use a `switch` statement to dispatch opcodes, creating hard-to-predict branches; PostgreSQL replaces this with computed gotos that jump directly to each opcode handler, allowing the CPU to predict branches much more accurately. As a result, a well-written interpreter is surprisingly competitive with compiled code.

The author analyzes the query `SELECT a FROM table WHERE a = 42` over a 10-million-row table, which compiles into an opcode sequence of `SCAN_FETCHSOME`, `SCAN_VAR`, `FUNCEXPR_STRICT_2` (null checks followed by `int4eq`), `QUAL`, and `DONE_RETURN`. Removing redundant null checks on constants yields a 7.9% speedup, dropping all null checks gives 9.5%, inlining `int4eq` reaches 10.3%, and his experimental JIT achieves 23%—cutting instructions by 11%, cycles by 20%, and branches by 13%. Notably, those first optimizations apply just as well to the interpreter as to the JIT, narrowing the JIT's traditional edge; truly beating the interpreter requires deeper optimizations that the author promises to cover in follow-up posts.

*For this post I used CCR with the `x-ai/grok-4.1-fast:free` model. It doesn't seem great yet—a lot of rough untranslated English remained. I'll try to improve it further.*

---

*This post was rewritten by Claude Code with Opus 5.5 on 27/09/2026; reviewed and edited by Codex with GPT 6.1 Sol on 09/11/2026, and re-verified by Claude Code with Sonnet 5.5 on 16/11/2026.*
