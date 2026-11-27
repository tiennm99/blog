---
title: "Newsletter #6"
date: 2025-03-08
tags: ["AI-Assisted", "Newsletter", "LLMs", "Java", "Redis", "Rate Limiting", "Problem Solving"]
categories: [ "Newsletter" ]
---

<i>
Happy International Women's Day (March 8)! Wishing all the ladies a wonderful day, and may you always stay joyful and happy!
Girls are meant to be loved :>
Welcome to Newsletter #6.
</i>

## [How I use LLMs as a staff engineer](https://www.seangoedecke.com/how-i-use-llms/)

Sean Goedecke, a staff engineer at GitHub, shares how he actually uses large language models (LLMs) in his day-to-day work. For production code, he uses Copilot primarily as a supercharged autocomplete for repetitive boilerplate like function arguments or type definitions; in his core stack (Ruby on Rails), he is still faster and better writing the logic himself. When making small changes in unfamiliar territory—such as a Go service or a C library—he leans on LLMs much more, asking questions like "is this idiomatic for this language?", while always having a domain expert review the result. For throwaway code, like one-off research scripts running on his laptop, he lets the LLM write nearly everything and estimates it makes him 2–4x faster.

In his view, the biggest value comes from using LLMs as an on-demand tutor when learning a new domain: asking follow-up questions, summarizing what he just learned in his own words, and asking the model to point out any misconceptions. He also uses LLMs as a last-resort rubber duck for debugging (asking once and moving on if it doesn't help) and for proofreading long design documents for typos and logical gaps. Conversely, he never lets an LLM write an entire pull request in a codebase he knows well, never lets it draft ADRs or high-stakes technical strategy docs, and hasn't found it useful yet for navigating massive codebases.

## [Software development topics I've changed my mind on after 10 years in the industry](https://chriskiehl.com/article/thoughts-after-10-years)

Chris Kiehl, a software engineer at Amazon, looks back on ten years in the industry through three short lists, following up on a similar post he wrote four years earlier. Things he has changed his mind on include: simplicity doesn't happen by accident—it requires constant cultivation; there is no badge of honor in being able to juggle complexity; static typing is essential on teams with mixed skill levels; Java is great precisely because it is boring; most of the real work of programming should happen before writing the first line of code; "elegance" is a mirage; a great manager is worth their weight in gold; and DynamoDB is genuinely great when your access patterns match what it is built for.

He also adds several new convictions: software engineering is mostly communication; thinking a problem is easy usually means you don't understand it yet; junior engineers need room to try things and fail; you should avoid ORMs and write SQL directly; you will eventually regret building a system on Serverless Functions; distributed locking remains bafflingly hard; and test code can never have too many comments. Views he still holds: code coverage says nothing about test quality, monoliths are fine, microservices must be justified rather than chosen by default, and almost nobody needs "scale" the way they think they do.

## [Looking Under the Lamppost (On Problem-Solving)](https://edbatista.com/2025/01/looking-under-the-lamppost-on-problem-solving.html)

Ed Batista opens with the classic joke about a man searching for his lost keys under a streetlamp even though he dropped them in the dark yard, simply because "the light is better here." That, Batista argues, is how we routinely approach problem-solving: instead of tackling the problem we *need* to solve, we pick the problem we *want* to solve. The reasons are all too human: the real problem lies outside our expertise; it takes too long when we crave the quick dopamine hit of crossing small tasks off a list; or it might not have an answer at all, exposing us to failure and embarrassment.

The author doesn't suggest beating yourself up over this tendency, but warns that if we only ever pick small, tractable problems we're guaranteed to solve, we never grow—our comfort zone only expands when we step outside it. He draws a distinction between confidence (a calculation of your odds of success) and courage (recognizing that the cost of not trying outweighs the cost of failing). When we reframe failure as learning—or "eliminating possibilities," as Peter Attia puts it—we realize that staying under the streetlamp is the real risk, because the answers to the problems that actually matter are out there in the dark.

## [Sliding Window Log Rate Limiter (Redis & Java)](https://foojay.io/today/sliding-window-log-rate-limiter-redis-java/)

Raphael De Lio walks through building a Sliding Window Log rate limiter using Redis and Java. Unlike the Fixed Window Counter, which slices time into rigid intervals, this algorithm logs the timestamp of every request and counts only those falling within a rolling window (such as the last second or minute), enforcing a smooth limit without sudden resets at window boundaries. Starting in Redis 7.4, the `HEXPIRE` command allows setting a TTL on individual fields within a hash, which makes the implementation remarkably clean: each client gets its own hash, every allowed request is stored as a field that expires automatically after the window duration, and `HLEN` returns the current count of active requests; if the count has reached the threshold, the new request is rejected.

The Java implementation uses Jedis, wrapping `HSET` and `HEXPIRE` inside a transaction so they execute together and save network round-trips—though because the `HLEN` read and threshold check happen outside the transaction, concurrent requests can still race past the check; each field key uses a random UUID so multiple requests arriving in the same millisecond don't overwrite one another. Finally, the author writes a test suite using Redis TestContainers, JUnit 5, and AssertJ covering requests within the limit, exceeding the limit, window expiration roll-off, and concurrent access from multiple clients.

## [Project Loom: Structured Concurrency – Java](https://foojay.io/today/project-loom-structured-concurrency-java/)

Mahendra Rao B introduces Structured Concurrency, a Project Loom feature that debuted as an incubator API in Java 19 (JEP 428) and advanced to preview in Java 21 (JEP 453) and Java 23 (JEP 480). The core idea is that when a task splits into concurrent subtasks, they all return to the same lexical scope—the parent task waits until its child subtasks complete, preserving a clear parent-child hierarchy and eliminating common bugs around cancellation, thread leaks, and shutdown. Before diving into the API, the post reviews foundational concepts including processes, threads, synchronization, deadlocks, and semaphores.

At the center of the API is `StructuredTaskScope` in `java.util.concurrent`: you open a scope in a `try-with-resources` block, spawn subtasks with `fork`, wait for completion with `join`, and handle the results. Two built-in policies are provided as subclasses: `ShutdownOnSuccess` (cancels remaining subtasks as soon as one succeeds, ideal when you only need the first result) and `ShutdownOnFailure` (cancels all subtasks if any one fails); you can also subclass `StructuredTaskScope` to define custom completion policies. For debugging, running `jcmd <PID> Thread.dump_to_file -format=json <file>` exports a structured JSON thread dump showing the task hierarchy. The main benefits are simpler lifecycle management, consistent error handling, automatic resource cleanup, and no orphaned background threads.

## [Taking Out the Trash in Java](https://medium.com/@benweidig/taking-out-the-trash-in-java-19bcc0c7bd0c)

Ben Weidig provides an overview of garbage collection (GC) on the JVM: rather than requiring manual memory allocation and deallocation like C or C++, the JVM automatically tracks down unreachable objects and reclaims their memory—though that convenience isn't free and directly impacts application performance. The article explains how the heap stores objects and is organized around the weak generational hypothesis into the Young Generation (Eden plus two Survivor spaces) and the Old Generation, alongside Metaspace (which replaced PermGen in Java 8), while each thread has its own stack for method call frames. Minor GCs are fast and barely noticeable, whereas major GCs can trigger significant "stop-the-world" pauses.

Next, the author compares the available JVM collectors: Serial for single-threaded or resource-constrained environments, Parallel for maximum throughput, G1 (the default in modern JDKs) which divides the heap into regions, ZGC and Shenandoah for ultra-low pause times at the cost of higher CPU usage, and Epsilon—a no-op collector used primarily for benchmarking and allocation testing. The closing section offers practical guidance: cut down on unnecessary object allocations, pick appropriate data structures, use `try-with-resources`, enable GC logging, and profile with tools like VisualVM or JDK Mission Control before tweaking heap sizes and JVM flags.

## [How Precision Time Protocol handles leap seconds](https://engineering.fb.com/2025/02/03/production-engineering/how-precision-time-protocol-ptp-handles-leap-seconds/)

Meta explains how they handle leap seconds as Precision Time Protocol (PTP) increasingly replaces NTP for time synchronization across their data centers. With NTP, which synchronizes clocks at the millisecond level, Meta historically used "leap smearing"—gradually slowing down or speeding up the clock over a window using a linear or quadratic curve to absorb the extra second. However, PTP synchronizes clocks down to the nanosecond level, where even linear smearing introduces unacceptable drift between servers.

Meta's solution is to perform leap smearing inside their client-side `fbclock` library: whenever called during a smearing window, the library shifts the returned timestamp using a stateless, reproducible algorithm, keeping the underlying time service on monotonic TAI internally while still exposing smeared UTC to client applications. Even so, this approach introduces noticeable divergence—drifting by more than 100 microseconds relative to quadratic-smeared NTP sources and shifting a 60-second periodic timer by nearly 1 millisecond during the smear window. Because of these trade-offs, Meta recommends using TAI instead of UTC wherever possible (even though conversion to UTC is still unavoidable at system boundaries) and backs the international proposal to retire leap seconds after 2035 so the industry can rely on continuous UTC and simplify timekeeping infrastructure.

## [Developer philosophy](https://qntm.org/devphilo)

qntm, a science fiction author and software engineer, writes down the software development philosophy he shared in a talk for junior developers. His number-one rule is to never let a project deteriorate to the point where a rewrite from scratch looks tempting—because by the time you reach that point, the real mistakes happened long ago; watch out for early warning signs like mounting technical debt, simple changes taking longer and longer, painful onboarding for new teammates, and mysterious bugs nobody understands. He also advises aiming to finish 90% of the work in 50% of the allotted time, since getting the happy path working is only half the battle—the rest goes to polish, edge cases, testing, and performance tuning.

Other core principles include: automating good habits through tests, linters, and auto-formatters instead of relying on manual nagging; always thinking about "pathological data" like requests that hang forever, billion-row tables, or empty strings, because handling edge cases is the essence of the job; using leftover time to make code simpler; writing testable code with clean interfaces and minimal side effects; and finding the right balance between microservices and a monolith, splitting services only when there is a clear payoff. Finally, code shouldn't just be theoretically correct—it should be *obviously* correct, so that modifying surrounding code months later doesn't turn into a minefield.

## Bonus

### Bonus 1: Interesting videos from [ByteByteGo](https://bytebytego.com/)

[System Design: Why Is Docker Important?](https://www.youtube.com/watch?v=QEzbZKtLi-g)

### Bonus 2: Interesting images from [ByteByteGo](https://bytebytego.com/)

![JWT 101: Key to Stateless Authentication](https://substack-post-media.s3.amazonaws.com/public/images/fc4c9cac-3046-4b45-9dd8-7dccc79b4e2c_1280x1608.gif)

---

*This post was rewritten by Claude Code with Opus 5.5 on 27/09/2026; reviewed and edited by Codex with GPT 6.1 Sol on 09/11/2026, and re-verified by Claude Code with Sonnet 5.5 on 16/11/2026.*
