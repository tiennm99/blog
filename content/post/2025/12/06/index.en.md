---
title: "Newsletter #64"
date: 2025-12-06
tags: ["AI-Assisted", "Caching", "Consistent Hashing", "Linux", "Java", "Performance", "Career"]
categories: ["Newsletter"]
---

*Enjoy Newsletter #64. ~~This post was created using [Claude Code](https://github.com/anthropics/claude-code), [Claude Code Router](https://github.com/musistudio/claude-code-router), [iFlow Open Platform](https://platform.iflow.cn) & Qwen3-Coder-Plus[^qwen3-coder-plus]~~*

[^qwen3-coder-plus]: ~~Qwen3-Coder-480B-A35B-Instruct~~

## [Caching](https://planetscale.com/blog/caching)

This article explains caching from first principles: pairing a small amount of fast, expensive storage with a large amount of slow, cheap storage so that frequently accessed data lives in the fast tier. The key metric is the hit rate (the percentage of requests served from the cache rather than the backing store); the higher the hit rate, the less often you pay the latency penalty of slow storage. Familiar examples include CPU L1, L2, and L3 caches, RAM acting as a cache for disk, or a social network keeping recent posts in fast memory while pushing older posts to colder storage.

The author breaks down two forms of locality: temporal locality (data accessed recently is likely to be accessed again soon, such as caching posts from the last 48 hours) and spatial locality (accessing one item makes nearby items likely to be needed next, such as a photo app prefetching adjacent images). CDNs tackle geographic distance by placing cached copies close to end users. When a cache fills up, it needs an eviction policy: FIFO is simple but naive, LRU evicts the least recently used item to better match real-world access patterns, and time-aware LRU expires stale entries automatically. Finally, databases layer caches of their own—PostgreSQL combines `shared_buffers` with the OS page cache, while MySQL uses its buffer pool—delivering multi-tier caching while preserving ACID guarantees.

## [Consistent Hashing](https://eli.thegreenplace.net/2025/consistent-hashing/)

Distributing keys across N nodes with a simple `hash % N` formula works fine until the node count changes: adding or removing even a single node remaps nearly every key to a different server, triggering a thundering herd of cache misses right when the system is already under load. Consistent hashing solves this by using the same hash function to map both nodes and keys onto a ring, assigning each key to the next node clockwise on the ring. When a node joins or leaves, only about M/N keys (where M is the total number of keys and N is the number of nodes, assuming an even distribution) need to move instead of nearly all of them.

For the implementation, the author stores node positions in a sorted array representing a discrete ring, turning key lookup into a fast, cache-friendly binary search. The remaining catch is that random placement leaves uneven gaps between nodes on the ring: with 20 nodes, one node can end up owning roughly 40x as many keys as another. The fix is virtual nodes—mapping each physical node to multiple points around the ring; testing with 10 virtual nodes per physical node smooths out the distribution dramatically. Originally invented at MIT for distributed web caching, consistent hashing became the foundation of Akamai and influenced AWS's Dynamo storage system.

## [How to stop Linux threads cleanly](https://mazzo.li/posts/stopping-linux-threads.html)

This post tackles a problem far trickier than spawning threads: stopping a Linux thread cleanly while still giving it a chance to run cleanup code. The simplest approach is a quasi-busy loop where the thread checks an atomic flag after each unit of work, assuming each iteration finishes quickly enough. It's easy to reason about, but forces you to structure your code around short work slices. `pthread_cancel()` looks tempting at first glance but has serious pitfalls: on `glibc`/`libstdc++`, cancellation is implemented via forced stack unwinding; if unwinding crosses a `noexcept` boundary—such as cancelling inside a destructor—the program terminates immediately, and cancelling mid-operation can corrupt shared application state.

A signal-based approach using `SIGUSR1` and careful signal-mask manipulation can interrupt blocking system calls, but still suffers from a race condition because checking the stop flag and entering the syscall isn't atomic. For syscalls that have signal-mask-aware variants—such as `ppoll`, `pselect`, and `epoll_pwait`—this race is solved cleanly. For all other blocking syscalls, the author demonstrates a clever trick using `rseq` (restartable sequences, available since Linux 4.18) to wrap the flag check and the syscall instruction in a single atomic critical section that the kernel aborts and restarts if interrupted mid-way. The takeaway is that no single solution is perfect: polling a flag works for most applications, signals suit I/O-heavy threads, and `rseq` requires inline assembly and is best reserved for specialized low-level code.

## [Advice for New Principal Tech ICs (i.e., Notes to Myself)](https://eugeneyan.com/writing/principal/)

Eugene Yan compiles 31 pieces of advice for newly minted Principal Engineers and Applied Scientists, distilled from observing experienced peers. The starting premise is that what got you promoted to senior levels becomes secondary at Principal: writing code yourself isn't always the highest-leverage use of your time, even though you must stay close enough to the tech to maintain credibility and context. Principals come in different archetypes—some go deep technically, others drive broad cross-org alignment—and the role frequently blends parts of product management, design, and culture-building. Being right isn't enough; you have to persuade others to care and act—one mentor shared that out of every 10 proposal docs they write, only about 3 actually get built.

Yan advises picking work that wouldn't happen without you, sitting at the intersection of your unique strengths and the organization's gaps, and splitting your portfolio across three modes: leading (roughly 50%), sponsoring (20%), and advising (30%). Scaling your impact means helping others make decisions the way you would and setting aside dedicated weekly time for mentoring, including interns. In meetings, ask questions to create space for others, and explicitly label whether you are stating a known fact or just wondering aloud so a casual remark isn't mistaken for a mandate. Greater autonomy comes with greater accountability: protect time for deep thinking and ultimately aim to make the organization succeed without depending on you.

## [How fast is java? Teaching an old dog new tricks](https://dgerrells.com/blog/how-fast-is-java-teaching-an-old-dog-new-tricks)

The author tests whether modern Java can keep up with Rust by building a particle simulation using Java's new Vector API for SIMD math. The Vector API abstracts CPU-specific vector instructions behind the concept of a "species," letting you write SIMD code once that runs across hardware architectures. To squeeze out maximum performance, the author decouples the physics simulation from the UI event thread, manages worker threads manually instead of using parallel streams, and gives each worker thread its own pixel buffer before merging them at the end to avoid cache contention from concurrent writes.

On an M1 MacBook Air, Rust still runs roughly 2x faster across most particle counts—for instance, simulating 100 million particles takes ~69 ms per frame in Rust versus ~119 ms in Java. Java also carries higher baseline overhead from heap allocations, whereas Rust's memory allocation is much leaner. While the author acknowledges Java has come a long way with lambdas and the Vector API, the surrounding ecosystem remains a pain point: just pulling in a couple of small libraries required frustrating build-system ceremony. His verdict: the old dog can indeed learn new tricks, but it's still weighed down by legacy tooling.

## [50 things I know](https://usefulfictions.substack.com/p/50-things-i-know)

Cate Hall shares 50 lessons she has learned about relationships, decision-making, and personal growth. On people, she notes that you can care deeply for someone who doesn't reciprocate, and that loving without needing anything back is the essence of selflessness; she separates admiration, obsession, and infatuation from real love, and observes that revenge is rarely worth it because difficult people are already their own punishment. Many social dynamics are paradoxical: actions that feel weak from the inside, when done without apology, are perceived by others as strength.

On decision-making, she pushes back against the idea that effort times time equals results, highlights the importance of spotting asymmetric payoffs where being wrong in one direction is far costlier than the other, and advises doubling both time and budget estimates because you can never fully correct for the planning fallacy. If you want better opinions, start by having fewer of them. Knowing when to quit is an underrated skill, and she avoids totalizing ideologies because no moral framework survives every edge case intact. She closes with reminders that being of service to others is the only reliable way to feel better yourself, and that ten years from now you'll look back and marvel at how great you had it today—so why not see it that way right now?

## [Programming Languages That Blew My Mind](https://yoric.github.io/post/programming-languages-that-blew-my-mind/)

David Teller looks back at the programming languages that reshaped how he thinks about software. BASIC introduced arrays and `GOTO`/`GOSUB` control flow; Turbo Pascal brought IDEs, debuggers, structured programming, and modules; x86 assembly taught him memory addressing, registers, and talking directly to hardware. HyperCard introduced visual programming, natural-language-like scripting, and garbage collection. OCaml—with parametric polymorphism, type inference, pattern matching, and higher-order functions—humbled him, while Prolog taught declarative programming, where instead of writing an algorithm you teach the computer how to reason.

In industry, Java stood out for its batteries-included standard library, thorough documentation, and the JVM; Erlang impressed him with its "let it fail" philosophy and actor model for distributed systems; Coq turned specifications into types and programs into formally verified proofs. Opalang experimented with multi-tier compilation that automatically split code across client, server, and database, while Rust combined functional-language safety guarantees with systems-programming performance. Teller notes that many ideas from academic languages eventually filter into mainstream software, and says he is still waiting for the next truly mind-expanding programming paradigm.

## Bonus: Some cool visuals from [ByteByteGo](https://bytebytego.com/)

![Docker vs Kubernetes](https://substack-post-media.s3.amazonaws.com/public/images/9cfa2d94-1602-47c2-8942-b585c1d8d285_2252x2752.jpeg)
![Batch vs Stream Processing](https://substackcdn.com/image/fetch/$s_!P-gB!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8c9090b5-77c7-4f04-88bc-481df27de32d.tif)
![What are Modular Monoliths?](https://substackcdn.com/image/fetch/$s_!f0s-!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fb6d1ef48-faea-4d57-b2ea-f8411efc8334_2360x2770.png)
![What is the difference between Process and Thread?](https://substackcdn.com/image/fetch/$s_!MDHC!,w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F7cf3f3a0-726f-47a3-94e4-755fa9aa8036_2196x2319.jpeg)
![How to Debug a Slow API?](https://substackcdn.com/image/fetch/$s_!-jEP!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa7885eb0-3b6d-4be3-bbb7-332b3f9fc0e0_2360x2920.jpeg)
![Top Service-to-Service Communication Patterns](https://substackcdn.com/image/fetch/$s_!uW-M!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd7494e44-82ec-43fc-bd7f-eabea7776dd1_2250x2624.png)

*Verdict: Overall this is still a fairly solid post. However, the summaries are a bit on the long side and will need further refinement.*

---

*This post was rewritten by Claude Code with Opus 5.5 on 27/09/2026; reviewed and edited by Codex with GPT 6.1 Sol on 09/11/2026, and re-verified by Claude Code with Sonnet 5.5 on 16/11/2026.*
