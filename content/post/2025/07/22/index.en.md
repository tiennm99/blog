---
title: "Newsletter #33"
date: 2025-07-22
tags: ["AI-Assisted", "Java", "Garbage Collection", "JavaScript", "AI Agents", "Refactoring", "UX"]
categories: ["Newsletter"]
---

*Enjoy Newsletter #33.*

## [How ZGC allocates memory for the Java heap](https://joelsiks.com/posts/zgc-heap-memory-allocation/)

ZGC is Java's low-latency garbage collector, and this post dives into how it allocates memory for the heap. ZGC divides the heap into logical "pages" of three sizes: small 2 MB pages for most objects, medium pages dynamically sized between 4 and 32 MB, and large pages that hold a single object each. Crucially, ZGC decouples physical memory from virtual memory and reserves virtual address space up to 16 times the maximum heap size (32 times on NUMA machines) so it can easily find contiguous virtual ranges and minimize fragmentation.

Free memory is tracked in a mapped cache organized as a red-black tree. When an allocation is needed, ZGC tries in order: grabbing an existing contiguous range from the cache (the fastest path), committing more physical memory, "harvesting" by remapping multiple discontiguous regions into a single contiguous virtual range, or combining the latter two; only if all of those fail does it trigger garbage collection or throw an `OutOfMemoryError`. On NUMA systems, the heap is partitioned evenly across nodes to favor local memory allocation. The post also highlights a practical trade-off: setting minimum heap size equal to maximum heap size pre-allocates all memory at startup, whereas dynamic allocation at runtime adds latency.

## [Optimizing the Garbage Collector when Migrating Cloud Workloads](https://foojay.io/today/optimizing-the-garbage-collector-when-migrating-cloud-workloads/)

Java's "write once, run anywhere" promise makes moving applications from x86 machines to Arm-based cloud instances like AWS Graviton or Azure Cobalt fairly smooth, but getting peak performance on Arm Neoverse still requires tuning the garbage collector (GC). The post recommends using OpenJDK 11 or newer to pick up optimizations for modern Arm platforms, starting with G1 as a safe default for most server workloads thanks to its balance of throughput and latency, and considering ZGC or Shenandoah (Java 17+) for latency-sensitive applications with large heaps.

On configuration, the author suggests setting `-XX:MaxGCPauseMillis` to define a pause-time target and let the JVM self-tune, enabling `-XX:+UseAdaptiveSizePolicy` so the JVM adjusts heap and generation sizes to real traffic, and sizing the heap carefully to balance collection frequency against pause duration. Finally, turn on GC logging with `-Xlog:gc` and use Java Flight Recorder to inspect GC behavior, because only testing under realistic production workloads will tell you which settings meet your performance goals.

## [How JavaScript Works Behind the Scenes](https://www.deepintodev.com/blog/how-javascript-works-behind-the-scenes)

JavaScript is single-threaded, so how does it handle asynchronous work without freezing up? This post explains the internals of a JavaScript engine (such as V8 in Chrome and Node.js), which centers on two components: the heap, where objects and variables live in memory, and the call stack, which tracks program execution and reflects JavaScript's single thread of control. Every function call pushes a new execution context onto the stack containing local variables, arguments, the `this` binding, and a reference to the outer scope; because contexts run sequentially, a heavy loop on the stack blocks everything behind it.

To avoid blocking, slow operations are handed off to browser Web APIs like `fetch`, `setTimeout`, or geolocation. When they finish, their callbacks land in the task queue, whereas Promise-based continuations (`.then`, `.catch`, `async/await`) go into the microtask queue. The event loop continuously watches the call stack, and whenever the stack is empty it drains the entire microtask queue before pulling the next regular task. That is why Promise callbacks typically run before `setTimeout` callbacks, and how JavaScript stays non-blocking without extra execution threads—even though a CPU-heavy loop can still freeze the UI.

## [Why embedding models should match + Advice for starting a blog](https://foojay.io/today/breaktime-tech-talks-ep39-why-embedding-models-should-match-advice-for-starting-a-blog/)

In this episode of Breaktime Tech Talks, Jennifer Reif shares a practical lesson on why embedding models have to match. She generated vectors in Pinecone and Neo4j using two different OpenAI models (`text-embedding-ada-002` and `text-embedding-3-small`), then queried them from her application using a mismatched model. Even within the same provider family, the vector representations differed enough that similarity search returned nonsensical matches or nothing at all. The fix is to use the exact same embedding model for both stored documents and application queries; even then, different vector databases can return slightly different results due to their own similarity-search implementations—something to keep in mind when building RAG systems.

The second half offers advice for starting a technical blog: write for yourself first, documenting your learning journey and how you solved problems so you can look them up later; keep a natural, conversational tone; let completed projects serve as a ready-made outline and edit just enough without over-polishing; remember that readers will skim for the section they need; and prioritize writing about problems you struggled to find answers for online, since others are likely searching for the exact same thing.

## [HULA: Human-in-the-loop LLM-based agents for software development](https://www.atlassian.com/blog/atlassian-engineering/hula-blog-autodev-paper-human-in-the-loop-software-development-agents)

Atlassian introduces HULA, a human-in-the-loop LLM agent framework designed to automate routine development tasks while keeping engineers in control. Accepted to the ICSE 2025 SEIP track, the workflow runs in four stages: an engineer selects a Jira issue and adds context; HULA drafts a plan listing the files and changes required for the engineer to approve or revise; HULA generates code, using compiler and linter feedback to iterate until it passes checks before waiting for engineer review; and finally the approved changes are opened as a pull request following the team's normal process. At the time of writing, Atlassian reported that roughly 900 HULA-generated pull requests had been merged.

In a September 2024 evaluation on SWE-bench Verified, HULA passed unit tests on 31% of issues, and a GPT-based metric judged its patches highly similar to human solutions in 45% of cases. Across 663 real Jira issues over two months, HULA produced a plan for 79% of items (82% of which engineers approved), generated code for 87% of approved plans, reached a pull request on 25%, and saw 59% of those PRs merged. Surveying 109 engineers showed 62% agreed HULA identified the right files to change and 61% found its code easy to understand, though only 33% felt the generated code fully solved the task. Engineers valued the time savings and better documentation, but still had to manually finish functionality and wanted a smoother UX.

## [Refactoring Gone Wild: Avoiding Code Smells and Cleaning Up the Mess](https://techhub.iodigital.com/articles/refactoring-gone-wild-avoiding-code-smells-and-cleaning-up-the-mess)

Refactoring is a core engineering skill, but doing it well starts with spotting code smells. Using Kotlin examples, this article walks through more than ten common smells: the Pyramid of Doom (deeply nested conditionals), inconsistent naming, mysterious parameters, god functions, forests of null checks, tangled boolean expressions, chaotic error handling, overuse of mutable collections, duplicated validation logic, and misused coroutines. Each smell makes code harder to read, harder to maintain, and more complex than it needs to be.

For every smell, the author pairs a concrete remedy: flatten nesting with guard clauses, standardize naming conventions, group related parameters into a `data class`, split large functions into small testable ones, use safe-call and Elvis operators for nulls, extract named helper functions for complex boolean conditions, centralize error handling and validation, default to immutability, adopt structured concurrency, and lean on standard-library helpers like `groupBy`, `takeIf`, and `runCatching`. The closing message is that "small, incremental improvements add up to a big difference": you don't need a massive rewrite—just steady cleanup to keep code readable and maintainable.

## [How to write error messages that actually help users rather than frustrate them](https://piccalil.li/blog/how-to-write-error-messages-that-actually-help-users-rather-than-frustrate-them/)

Error messages show up at the exact moment a user is already stuck, yet they are often written in robotic jargon. This post lays out a practical approach to writing error messages that genuinely help: start by auditing every place an error can occur—form fields, validation checks, 404 and 500 pages, empty search results, and dropped connections. Then write as if you were sitting next to the person and walking them through it: instead of "Invalid input," write "Please enter the 6-digit code we emailed you"; instead of "No WiFi connection detected," write "It looks like you're offline—connect to WiFi and try again."

The author advises skipping cute or joking copy, which makes frustrated users feel their problem isn't being taken seriously; the post cites a shopper who abandoned their cart after a typo triggered a message calling them a "silly sausage." Use active voice to state clearly what went wrong and why—for example, "We couldn't process your application because that file format isn't supported; please re-attach it as a JPEG." When users can fix the issue themselves, tell them the exact step to take; when they can't, offer a clear fallback such as a retry button, support contact details, or reassurance that their work was saved. Finally, document message patterns for common scenarios to keep tone and clarity consistent across the product.

## [The difficulty in big tech](https://www.seangoedecke.com/difficulty-in-big-tech/)

Many people assume big tech companies move slowly because of bad processes or lazy engineers, but Sean Goedecke argues the real culprit is accumulated feature complexity. Every new feature can interact with every existing feature, causing the number of interactions engineers must reason about to explode as a product matures. Worse are "evil" cross-cutting features that touch the entire system: adding a new user type, for instance, forces engineers to audit permissions across every existing feature and remember that constraint forever after. The resulting cognitive load is so heavy that "getting anything done at all is really, really hard," making it easy for engineers to miss even seemingly obvious edge cases.

So why do big companies keep shipping features anyway? Because they make money: as Dan Luu has noted, seemingly minor features can each add a few percentage points of revenue, and 1% of revenue on products like Google Ads or AWS S3 is an enormous sum. In Goedecke's view, big-tech slowness isn't a sign of organizational dysfunction—it is a deliberate trade-off that accepts slower development velocity in exchange for the revenue of a densely featured product.

---

*This post was rewritten by Claude Code with Opus 5.5 on 27/09/2026; reviewed and edited by Codex with GPT 6.1 Sol on 09/11/2026, and re-verified by Claude Code with Sonnet 5.5 on 16/11/2026.*
