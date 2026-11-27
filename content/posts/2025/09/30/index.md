---
title: "Newsletter #57"
date: 2025-09-30
tags: ["AI-Assisted", "Agentic AI", "Career", "Monorepo", "Distributed Systems", "Code Quality", "Java"]
categories: ["Newsletter"]
---

*~~This post was created using [Claude Code Router](https://github.com/musistudio/claude-code-router) with the `qwen3-coder` model running on [iFlow Platform](https://platform.iflow.cn/docs/api-mode).~~ Enjoy Newsletter #57.*

## [Agentic AI has changed my career](https://medium.com/@elliotgraebert/agentic-ai-has-changed-my-career-2c6e3dd29708)

Elliot Graebert, a director of engineering at Skydio, confesses that for most of his career he barely wrote code because he moved into management too early. About four months ago, he started "vibe coding" directly in the multi-million-line monorepo that powers the company's drone fleet, and he is now among its top five contributors, sometimes submitting up to ten pull requests per hour. He distinguishes between two approaches: vibe coding is like pair programming with AI (using tools like Windsurf or Cursor), where the loop is measured in seconds and requires constant attention; agentic AI is like delegating to an eager intern, where the loop is measured in minutes and you only check back once the task is done. His journey went from 0.5x speed (fixing small UI bugs in a single editor), to 1.5x by running three environments in parallel with Gemini, Claude, and GPT to "swarm" a tough bug, and then to 3x thanks to context files (Windsurf Rules) documenting code conventions and test commands, refined iteratively whenever the AI got stuck.

The jump to 10x came from Coder Tasks—automated environments that go from prompt to pull request—combined with two MCPs: GitHub to read issues and open pull requests (triggering CI and Vercel previews), and Playwright so the AI can launch a browser, reproduce a bug, fix it, and verify the fix itself. The core lesson is that agentic AI succeeds when it has a feedback loop that does not require a human in the middle; at that point, he can run dozens of tasks at once, such as completing an entire data-filter component migration in a single day. He also stresses that AI does not magically solve everything—you have to invest in tooling—and the most exciting result is that designers, product managers, and even the flight test team can now contribute directly to the product.

## ~~[The Evolution Of Garbage Collectors From Javas CMS To ZGC And A JVM Vs Go Vs Rust Latency Shootout](https://codemia.io/blog/path/The-Evolution-of-Garbage-Collectors-From-Javas-CMS-to-ZGC-and-a-JVM-vs-Go-vs-Rust-Latency-Shootout)~~

~~Memory management is a critical topic in programming, especially in languages like Java, Go, and Rust. This article explores the evolution of garbage collectors (GCs) from Java's traditional Concurrent Mark-Sweep (CMS) to the modern Z Garbage Collector (ZGC).~~

~~ZGC is a major leap forward in minimizing application pause times, aiming to keep pauses under 10ms regardless of heap size. This makes a dramatic performance difference compared to earlier-generation GCs like CMS.~~

~~The article also compares latency performance across platforms:~~
~~- JVM (with ZGC): Significantly reduced pause times thanks to improvements in GC design~~
~~- Go: Efficient low-latency GC powered by a concurrent algorithm and tri-color marking~~
~~- Rust: Avoids GC entirely through its ownership model, delivering predictable performance without GC overhead~~

~~**Key takeaways:**~~
~~- ZGC keeps application pause times under 10ms~~
~~- Go uses an efficient marking algorithm to keep latency low~~
~~- Rust eliminates the need for GC altogether through its ownership model~~
~~- Language choice significantly impacts performance and user experience~~

## ~~[New in Java25: Generational Shenandoah GC is no longer experimental](https://theperfparlor.com/2025/09/14/new-in-java25-generational-shenandoah-gc-is-no-longer-experimental/)~~

Java 25 officially graduates Generational Shenandoah from experimental status, making it ready for production use. Shenandoah is a low-pause-time garbage collector introduced in Java 12 that runs mostly concurrently with the application. Its generational mode, introduced experimentally in Java 24, separates heap memory into young and old generations. Because most objects die young, this separation spares the collector from repeatedly scanning long-lived objects unnecessarily, improving performance and reducing memory footprint.

In Java 25, the feature has been stabilized with numerous bug fixes, lower garbage collection overhead, more efficient memory region management, and improved tooling and logging. According to the article, these improvements make Generational Shenandoah mature enough for real-world applications, and you no longer need the `-XX:+UnlockExperimentalVMOptions` flag to enable it. It marks an important milestone in Java's ongoing garbage collection optimization journey.

## [If all the world were a monorepo](https://jtibs.substack.com/p/if-all-the-world-were-a-monorepo?utm_source=tldrnewsletter)

Julie Tibshirani shares her experience with CRAN, the central package repository for R. Before accepting an update, CRAN not only checks the submitted package itself, but also runs checks across every package that depends on it. When she released `grf` 2.0 with a breaking API change, CRAN blocked publication until the downstream package `policytree` was updated. At first she found this unreasonable: why should she be responsible for someone else's code? Over time, however, she realized this isn't merely a different point on the speed-versus-stability trade-off spectrum, but a form of "radical empathy" in software maintenance: users' code is the library author's responsibility too, much like the mindset inside a monorepo.

She contrasts this with her time working on Elasticsearch, where leaving individual projects to upgrade on their own left thousands of projects stuck on old versions years later. Watching large-scale migrations at Databricks, she saw that when engineering teams took end-to-end ownership—including fixing downstream dependent code—completion rates rose dramatically. Although R packages tolerate less consistent APIs than ecosystems like npm or PyPI, users enjoy nearly painless dependency upgrades, offering a lesson worth pondering for other ecosystems.

## [9 Software Architecture Patterns for Distributed Systems](https://dev.to/somadevtoo/9-software-architecture-patterns-for-distributed-systems-2o86?=&aid=recZm2jVus1yqUHWw)

This article introduces nine common architectural patterns in distributed systems that are useful both in real-world design and in system design interviews. The communication patterns include: Peer-to-Peer, where nodes exchange data directly without a central coordinator, used in file sharing and blockchains; API Gateway, a unified entry point for backend services that handles security and load balancing in microservices architectures; Pub-Sub, which decouples message senders and receivers through a broker, well suited for real-time messaging, event-driven systems, and IoT; and Request-Response, where a client sends a request and receives a corresponding response from a server, ubiquitous in REST APIs and web applications (though the pattern does not strictly require synchronous execution).

The data management and processing patterns include: Event Sourcing, which stores state as an immutable sequence of events for easy auditing and replay, commonly seen in financial systems; ETL (extract, transform, load) to consolidate data from multiple sources into a data warehouse for analytics and data migration; Batching, which groups data into batches to process all at once for higher efficiency; Streaming Processing, which processes continuous data streams in real time for finance, IoT, or cybersecurity; and Orchestration, which uses a central coordinator to manage workflows across services. Understanding the strengths and trade-offs of each pattern helps you build reliable, scalable, and maintainable systems as requirements evolve.

## [Sort Lines in Source Code](https://testing.googleblog.com/2025/09/sort-lines-in-source-code.html?=&aid=recV8wgDMqTb7Hwko)

Kyle Freeman's post on the Google Testing Blog, adapted from a "Tech on the Toilet" episode, opens with a familiar scenario: you enable two-player mode on the last line of a config file, but when you run the game, the feature doesn't show up. The culprit is that the `enable_two_players` flag was declared twice with different values—easy to miss when lines are in random order. Simply sorting the lines places the duplicates right next to each other, exposing the bug immediately. The main takeaway is that sorted lists and source lines are easier to read, easier to maintain, and help prevent bugs.

To automate this, the author introduces `keep-sorted` ([github.com/google/keep-sorted](http://github.com/google/keep-sorted)): you wrap the lines to sort with `keep-sorted start` and `keep-sorted end` comments, run `keep-sorted [file1] [file2] ...`, and optionally hook it into pre-commit so it runs automatically on every commit. The tool also supports case-insensitive sorting, numeric sorting, prefix order, and regular expressions (for example, using `by_regex` to sort a Go slice by its end-of-line comments). One important caveat: before sorting, make sure the original order doesn't carry semantic meaning, such as dependency load order.

## [Rating 26 years of Java changes](https://neilmadden.blog/2025/09/12/rating-26-years-of-java-changes/)

Neil Madden looks back on 26 years of working with Java, from Java 1.1.8 in 1999 to Java 25, and gives subjective ratings to language and core library changes (skipping UI, graphics, the JVM, and GC). Top marks go to `java.util.concurrent` (10/10), so well designed that people use it in place of the original collection classes; try-with-resources (10/10), which made exception handling far safer; Records (10/10), which he says Java "should have had all along"; UTF-8 by default (10/10), fixing thousands of character-encoding bugs at a stroke; along with Generics (8/10) and `var` type inference (9/10). The Collections Framework gets just 4/10, lambdas 4/10 because of ugly stack traces, and switch expressions 6/10 as a pleasant minor improvement.

On the flip side, NIO gets 0/10 for its convoluted API, Streams get 1/10 and are called one of modern Java's biggest mistakes due to complexity, overpromised parallelism, and easy resource leaks, while the cryptography APIs get 1/10 for being easy to misuse. Worst of all is Modules at -10/10: massive disruption for very little practical benefit. Virtual threads are deemed promising but not yet battle-tested enough to score. The post also touches on time-based release cadences, pattern matching, and post-quantum cryptography, closing with an invitation for readers to debate his ratings.


## Bonus: Some cool visuals from [ByteByteGo](https://bytebytego.com/)

![Python vs Java](https://substack-post-media.s3.amazonaws.com/public/images/aa5ea98b-c832-429d-8e48-63f25b7feb5a_3000x3900.jpeg)
![Design Patterns Cheat Sheet](https://substack-post-media.s3.amazonaws.com/public/images/4863d93c-ca2a-4b5a-b0b4-fe3621a6c184_2250x2920.png)
![Design Patterns Cheat Sheet](https://substack-post-media.s3.amazonaws.com/public/images/d6d04f12-2adc-4d8e-a9ca-2de16399066f_2250x3376.png)
![CI/CD Simplified Visual Guide](https://substack-post-media.s3.amazonaws.com/public/images/a370bb6a-82d3-45ad-b6f4-a2a9a4317402_800x1099.jpeg)
![How Apache Kafka Works?](https://substack-post-media.s3.amazonaws.com/public/images/5d9faeeb-3428-44c8-94fd-4b52fc287da3_3000x3900.png)
![Load Balancers vs API Gateways vs Reverse Proxy](https://substack-post-media.s3.amazonaws.com/public/images/45136e24-79ee-4c6d-a53a-89df6afebef6_3000x3900.png)
![Understanding Load Balancers: Traffic Management at Scale](https://substackcdn.com/image/fetch/$s_!4Uyj!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F1a1213e2-86cb-4fa8-bf72-e37ffe0da44d_2250x2624.heic)

*Overall, the output is concise and I'm fairly satisfied—probably around 80% compared to Claude Code with Claude models, and since it's free I'm very happy with it :)))*

---

*This post was rewritten by Claude Code with Opus 5.5 on 27/09/2026; reviewed and edited by Codex with GPT 6.1 Sol on 09/11/2026, and re-verified by Claude Code with Sonnet 5.5 on 16/11/2026.*
