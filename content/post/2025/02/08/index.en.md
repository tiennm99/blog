---
title: "Newsletter #1"
date: 2025-02-08
tags: ["AI-Assisted", "Newsletter", "Databases", "Java", "JVM", "Performance", "Concurrency"]
categories: [ "Newsletter" ]
---

<i>
Hello everyone, here I am returning to blogging after another long lazy streak :D

One problem I've noticed about myself—but have been too lazy to fix—is that I read a lot of blog posts and tinker with plenty of tools, yet rarely dive seriously enough into any single topic to turn it into a high-quality standalone post. And even when I do find something I really like, I'm too lazy to write a full post about it.

So I'm trying a different format: rounding up the interesting blog posts I've stumbled upon and read over the past week into a weekly newsletter. I hope you'll support it.

Without further ado, here is my Newsletter #1.
</i>

## [Seconds Since the Epoch](https://aphyr.com/posts/378-seconds-since-the-epoch)

Many people still believe that POSIX time (or Unix time) is the number of seconds elapsed since 00:00:00 on January 1, 1970. The author points out that this is not strictly true: the IEEE 1003.1 standard defines POSIX time in terms of UTC and assumes every day is exactly 86,400 seconds long. In reality, the length of a day varies over time, so astronomers periodically insert leap seconds into UTC to keep it from drifting too far from the solar day. As a result, at the time of writing (late 2024), the POSIX timestamp is 27 seconds behind the actual number of elapsed seconds, and every few years the POSIX clock jumps backward by a second—a quirk that has caused major outages across the Internet.

The article quotes the standard's rationale appendix, showing that the committee was well aware of this discrepancy yet deliberately ignored leap seconds to keep arithmetic simple. As for solutions, the author recommends using `CLOCK_MONOTONIC` or `CLOCK_BOOTTIME` when measuring intervals on a single machine; using TAI or GPS time if you don't need to exchange timestamps with external systems; and smearing leap seconds over a longer window if you must stay compatible with POSIX-time systems. The post concludes by noting ongoing efforts to abolish leap seconds altogether, slated to take effect by 2035.

## [B-Trees: More Than I Thought I'd Want to Know](https://benjamincongdon.me/blog/2021/08/17/B-Trees-More-Than-I-Thought-Id-Want-to-Know/)

Drawing on Alex Petrov's *Database Internals*, the author revisits B-Trees from a practical engineering perspective rather than dry textbook formulas. The motivating question is straightforward: when a key-value dataset no longer fits in memory, how do you design a disk-friendly data structure? Because disk reads and writes are orders of magnitude slower than RAM and always operate on whole pages, an on-disk binary search tree (BST) costs roughly one disk seek per key comparison. B-Trees solve this by packing hundreds of keys into a single node (high fanout), allowing each disk read to cover many more key comparisons.

The author then walks through concrete implementation details: slotted pages consisting of a header, data cells, and an offset pointer array so keys can be reordered without moving cell payloads; separator key truncation in internal nodes to pack more keys per page; overflow pages that keep prefixes of oversized keys in the main page so most queries avoid extra reads; and sibling pointers that allow range scans without traversing back up to parent nodes. The post wraps up with variants like Lazy B-Trees, FD-Trees, and Bw-Trees, concluding that while these implementation optimizations don't change Big-O complexity, they make a massive difference to real-world database performance.

## [SQL NULLs are Weird!](http://raymondtukpe.com/sql-nulls-are-weird.html)

The author shares a surprising behavior encountered while working on Convoy and LiteQueue: in SQL, `NULL = NULL` evaluates to NULL rather than true, because NULL represents an unknown value. Consequently, under a UNIQUE constraint, every NULL is treated as distinct, meaning a column (or a composite constraint like `UNIQUE(email, deleted_at)`) can still hold multiple "duplicate" rows whenever NULL is involved. This behavior is verified across SQLite, PostgreSQL, and MySQL, and SQLite's own documentation acknowledges the inconsistency: NULL values are considered distinct in UNIQUE columns yet identical in `SELECT DISTINCT` and `UNION`.

To enforce uniqueness properly, the post presents two approaches. The first adds a generated column using `COALESCE` to replace NULL with a fixed sentinel value; however, this widens the table and still causes collisions if two rows share the same email and deletion timestamp. The second—recommended by the author—is a partial unique index on `email` with `WHERE deleted_at IS NULL`, which uses less space and is less error-prone because it constrains only active (non-deleted) rows. Additionally, modern relational databases support `IS [NOT] DISTINCT FROM` for explicit NULL-safe comparisons.

## [Understanding JVM Garbage Collector Performance](https://mill-build.org/blog/6-garbage-collector-perf.html)

Li Haoyi's post on the Mill blog explains JVM garbage collection (GC) from theoretical foundations to empirical benchmarks. The author starts with a simple copying GC: trace references from the roots to find live objects (the live-set), copy them to the empty half of the heap, and wipe the old half clean; this is contrasted with reference counting, which cannot compact the heap or reclaim cyclic references. Several key insights follow from this model: allocation is dirt cheap, pause times scale with the size of the live-set rather than the amount of garbage, and GC overhead shrinks as the total heap grows relative to the live-set.

Benchmarks on Java 23 using G1 (the default GC) and ZGC confirm these takeaways. Adding more memory does not reduce individual pause times—it increases throughput by making collections less frequent; short-lived objects are collected much faster thanks to generational optimizations; and ZGC can bring pause times down to a few milliseconds if you are willing to provision roughly double the memory (with a heap at least four times the live-set, pauses drop to just a few milliseconds). The closing section offers practical advice: shrink the live-set by moving large datasets out of process (into SQLite, Redis, or Memcached), be careful with in-process LRU caches, and keep in mind that consolidating many small processes into one giant process can worsen GC pause times.

## [A Deep Dive into JVM Start-Up](https://www.youtube.com/watch?v=ED1oc7gn5uY)

Before the familiar `System.out.println("Hello World")` line ever runs, the JVM has already done a tremendous amount of work behind the scenes. This presentation on the official Java YouTube channel walks through the entire JVM startup sequence: parsing command-line arguments, probing system resources, initializing the runtime environment, and then loading, linking, and initializing classes—everything the JVM must do to "create the universe" for your application.

The final part of the video previews upcoming changes under Project Leyden, which promises substantial improvements to JVM startup time and warmup performance. It is a great reference for Java developers who want a deeper understanding of the core platform they rely on every day.

## [Parallel processing with Virtual Threads - A comparative analysis](https://www.dhaval-shah.com/parallel-processing-virtual-threads-reactor-vs-jdk/)

Following up on an earlier post comparing parallel processing between Spring Core Reactor and JDK 21, the author evaluates both approaches when running on virtual threads. The article recaps the limitations of OS platform threads: heavy resource footprint, a bounded number of concurrent threads, reduced scalability under blocking operations, and expensive context switches. Virtual threads from Project Loom are managed by the JVM, making them cheap to create and block, capable of scaling to millions of threads, and ideal for I/O-heavy workloads. The author shares code for both implementations: one using JDK `CompletableFuture` backed by a virtual-thread executor, and one using Reactor's `Flux` and `Mono` scheduled on that same executor.

Benchmarks over lists of 100,000, 250,000, and 500,000 objects show that the pure JDK version is dramatically faster than Reactor, with the gap widening as the dataset grows. In exchange, the JDK version consumes significantly more Old Gen memory and incurs higher GC pause times and GC CPU usage, though the author notes these do not meaningfully hurt application latency. The takeaway: with virtual threads, the standard JDK approach is the clear winner, whereas on traditional platform threads, Spring Core Reactor remains slightly faster.

## Bonus: Interesting images from [ByteByteGo](https://bytebytego.com/)

![A Cheatsheet On Message Queues](https://substack-post-media.s3.amazonaws.com/public/images/2ae8b491-b794-446b-8ca5-25ac552161be_1417x1600.png)
![From Monolith to Microservices: Key Transition Patterns](https://substack-post-media.s3.amazonaws.com/public/images/015e9750-7334-424b-b0c4-9c39bc5dd2d2_1600x1596.png)

---

*This post was rewritten by Claude Code with Opus 5.5 on 27/09/2026; reviewed and edited by Codex with GPT 6.1 Sol on 09/11/2026, and re-verified by Claude Code with Sonnet 5.5 on 16/11/2026.*
