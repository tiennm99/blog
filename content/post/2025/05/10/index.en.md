---
title: "Newsletter #23"
date: 2025-05-10
tags: [ "AI-Assisted", "Java", "Software Engineering", "AI", "Career Development", "Performance", "Database" ]
categories: [ "Newsletter" ]
---

*Enjoy Newsletter #23.*

## [LLMs: An Operator's View](https://theengineeringmanager.substack.com/p/llms-an-operators-view)

James Stanier looks at LLMs from the perspective of someone running an engineering organization. In his view, the baseline productivity floor for developers is rising: even skeptics acknowledge that tools like Copilot and Cursor speed up prototyping, code completion, and unit test generation. Engineering leaders should therefore proactively budget for paid seats and roll them out deliberately—surveying adoption, identifying internal champions to share workflows, and tracking impact over time. As individual output rises, teams can deliver more with fewer people, so before opening new headcount, leaders should first invest in tooling and training for their existing team, which costs a fraction of hiring another senior engineer.

The flip side is that faster code generation does not automatically mean higher quality. Stanier recommends tightening code review practices—such as requiring multiple reviewers and running regular security refreshers for the team. Hiring is affected too: candidates using LLMs during remote interviews muddy evaluation signals, so companies need an explicit policy—either embracing AI tools and testing critical thinking, or banning them outright—and must communicate those rules upfront to candidates. The bottom line: adopting LLMs is now table-stakes infrastructure investment, paired with the guardrails needed to protect code quality and hiring standards.

## [The Reality of Tech Interviews in 2025](https://newsletter.pragmaticengineer.com/p/the-reality-of-tech-interviews)

Gergely Orosz, joined by Evan King (former Staff Engineer at Meta) and Stefan Mai (former Engineering Manager at Amazon and Meta), paints a picture of a tech hiring market that is simultaneously recovering and much tougher. Open roles at Big Tech are up roughly 40% year over year, and total tech job postings have climbed from their 2023 trough of 163,000 to around 230,000, though still far below the 2020–2022 peak. The recovery is highly uneven: AI infrastructure and ML ops roles command top-tier compensation, while new grads face brutal odds—one candidate applied to 100 companies, landed just 4 interviews, and received zero offers after six months. Mid-level loops have stretched out too, with one candidate going through eleven interview rounds before getting an offer.

The bar for data structures, algorithms, and system design rounds has also risen noticeably: interviewers now expect complete, working solutions with proper error handling and input validation. Two standout trends are "downleveling"—where staff-level engineers accept senior roles after prolonged job searches—and "team matching" turning into an extra filtering stage that can stall offers for months. The authors advise preparing thoroughly for both technical and behavioral rounds at every level, especially for specialized roles, and lining up competing offers so you don't get stuck in team-matching limbo.

## [Senior Developer Skills in the AI Age: Leveraging Experience for Better Results](https://manuel.kiessling.net/2025/03/31/how-seasoned-developers-can-achieve-great-results-with-ai-coding-agents/)

Manuel Kießling argues that AI coding agents like Cursor do not devalue senior engineering experience—they amplify it. While AI models have broad programming knowledge, they have almost no innate understanding of a project's specific architecture, meaning results depend heavily on how a human guides them. Drawing on his team's experience at Joboo, Kießling outlines three practices. First, well-structured requirements: clearly describing data relationships, system architecture, and task boundaries so the AI doesn't wander off track. Second, tool-based guardrails: linters, static analysis, and automated test suites that provide continuous feedback so the agent can self-correct whenever a check fails. Third, file-based "keyframing": creating empty skeleton files with the right namespaces and naming conventions upfront so the AI writes code that fits the existing structure instead of inventing random files.

Using these techniques, his team shipped an entire contract-management feature spanning multiple applications and repositories in minutes rather than hours. Kießling even had the AI build a Python monitoring tool from scratch in a few hours despite having limited Python experience himself, thanks to thorough requirements docs and automated guardrails. The lesson: upfront planning matters more than ever—AI can execute almost anything, and experienced engineers are there to make sure it builds the right thing.

## [JEP 483: Ahead-of-Time Class Loading & Linking](https://www.morling.dev/blog/jep-483-aot-class-loading-linking/)

Gunnar Morling puts JEP 483—a Java 24 feature from Project Leyden—to the test, showing how it cuts Java application startup time without requiring any source code changes. The idea is shifting class loading and linking from runtime to build time, building on top of existing Application Class Data Sharing (AppCDS) machinery. Creating the AOT cache takes a two-step training run: first recording loaded classes into a configuration file, then generating the cache image from that configuration, with the classpath kept identical between training and production runs.

On Apache Kafka 4.0, the resulting AOT cache file weighs around 66 MB and drops startup time from 690 ms to 285 ms—a 59% reduction—with most of the savings coming from skipping class reading and parsing. On Apache Flink, time to first message drops from 1.875 seconds to 0.913 seconds, a 51% improvement. Some limitations remain: custom class loaders are not yet supported, JVM startup flags must be adjusted, and integrating the training run into container image builds can add pipeline complexity. Compared with GraalVM native images—which start in milliseconds and use less memory but require code adjustments and a closed-world assumption—Project Leyden aims for a pragmatic middle ground that is immediately useful for cloud-native Java services.

## [Specifications in Jakarta Data](https://in.relation.to/2025/03/28/repository-specifications/)

Gavin King (Hibernate) shows how to implement the "specifications" pattern—familiar from Spring Data—on top of Jakarta Data. Specifications allow dynamic query filtering via the JPA Criteria API without repetitive boilerplate. While Jakarta Data does not yet include built-in specification support, King demonstrates that all it takes is a shared super-interface `JpaRepository<T>` exposing two methods: `session()` returning Hibernate's `StatelessSession` and `entityClass()` returning the entity class. Built on top of those, `find()` and `count()` accept a specification modeled as a `BiFunction<CriteriaBuilder, Root<T>, Predicate>` and construct the corresponding Criteria query.

Paired with the JPA static metamodel, this approach is fully type-safe, catching misspelled attribute names or type mismatches at compile time. King also includes a `compose()` helper for combining multiple specifications and hints that Jakarta Data 1.1 is working on a "much more interesting" native solution. The two snippets below count books matching a title pattern and find books matching both title and author name:

```java
library.count((builder, book) ->
    builder.like(book.get(Book_.title), "%" + title + "%"));
```

```java
library.find((builder, book) ->
    builder.and(
        builder.like(book.get(Book_.title), "%" + title + "%"),
        builder.lower(book.join(Book_.authors).get(Author_.name))
            .equalTo(authorName.toLowerCase())
    ));
```

## [There is no Vibe Engineering](https://serce.me/posts/2025-03-31-there-is-no-vibe-engineering)

Sergey Tselovalnikov (SerCe) contrasts "vibe coding"—Andrej Karpathy's term for programming primarily via AI prompts rather than working directly with code—with real software engineering. His central thesis builds on the classic definition that "software engineering is programming integrated over time": vibe coding solves for a single point in time, whereas production systems must survive real-world traffic, scale with demand, withstand security threats, migrate live user data, and adapt to changing requirements. AI can spin up prototypes remarkably fast, but these long-term concerns are hard to express in a prompt and impossible to verify just by eyeballing the UI. Good engineering practices push failure modes left, where fixing them is cheap; vibe coding pushes them right, where fixing them is expensive.

Tselovalnikov imagines a future where "vibe engineering" could exist: systems assembled from strictly encapsulated AI-generated components surrounded by rigorous automated testing, profiling, tracing, canary deployments, and protocol compatibility checks. In that world, the engineer's role blends software architect and platform engineer—writing less application code by hand while spending far more energy on boundaries and verification. Yet that is still traditional software engineering, just operating with new tools. In his view, the true inflection point will only arrive when engineers feel comfortable going on call for a production service written entirely by AI—something very few would dare do today.

## [Refining Var-Handles in Valhalla](https://cr.openjdk.org/~jrose/values/atomic-value-access-api.html)

This technical design note by John Rose (OpenJDK) explores how `VarHandle`—Java's API for heap variable access supporting `getfield`, `putfield`, and atomic operations like CAS—needs to evolve to support value types in Project Valhalla. The core challenge is ensuring the interpreter, JIT compiler, and JNI access memory consistently when a variable can be laid out in multiple physical representations on the heap. The `LayoutKind` enum defines six representations: `REFERENCE` for traditional nullable managed pointers, `ATOMIC_FLAT` for values packed into 64 bits, `NON_ATOMIC_FLAT` for multi-field values wider than 64 bits, their nullable counterparts `NULLABLE_ATOMIC_FLAT` and `NULLABLE_NON_ATOMIC_FLAT` (which include a null indicator), and `BUFFERED` for read-only heap-buffered copies.

Rose proposes retiring the current internal `getValue` method as insufficient, replacing it with three metadata queries and one new access primitive: `isFlat()` to distinguish flattened values from ordinary references, `isConsistent()` to indicate whether reads and writes are strictly atomic (non-tearing), `isPortableAtomic()` to indicate support for advanced atomic operations like CAS, and `copyConsistentValue()` to atomically copy heap words according to the layout's protocol. The key design insight is splitting responsibilities into two layers: a new low-level intrinsic handles atomic memory copying, while existing `Unsafe` methods operate on a thread-local buffer (specifically a one-element array) to pack and unpack value fields. This keeps `VarHandle` logic clean and decoupled from complex GC and memory-layout details.

---

*This post was rewritten by Claude Code with Opus 5.5 on 27/09/2026; reviewed and edited by Codex with GPT 6.1 Sol on 09/11/2026, and re-verified by Claude Code with Sonnet 5.5 on 16/11/2026.*
