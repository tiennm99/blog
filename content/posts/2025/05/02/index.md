---
title: "Newsletter #15"
date: 2025-05-02
tags: [ "AI-Assisted", "Java", "LLMs", "GitHub Copilot", "Microservices", "Spring Boot", "Performance" ]
categories: [ "Newsletter" ]
---

*Normally I follow a one-post-per-day format, but lately I've been too lazy to write and have accumulated way too many interesting articles. So for the near future I'll pull a little trick by backdating posts and writing more to catch up on my backlog. For example, today is May 10th, but I'm writing this for May 2nd—just check the git history and you'll see, hehe. Enjoy Newsletter \#15.*

## [Here’s how I use LLMs to help me write code](https://simonwillison.net/2025/Mar/11/using-llms-for-code/)

Simon Willison reflects on more than two years of using large language models (LLMs) to assist with coding and argues that using LLMs effectively is a skill that takes practice, not something that comes naturally. According to him, you should treat an LLM as an advanced autocomplete tool: it fills in knowledge gaps but can still make unpredictable mistakes, so the human must always stay in control. He also notes the training data cutoff limitation: for libraries that have changed significantly since the cutoff date, you need to include fresh examples directly in your prompt. Conversation context is everything, so proactively provide existing source code, sample examples, or use tools that can load your entire project.

In practice, he uses LLMs to explore library options and implementation approaches early on; when writing actual code, he gives detailed instructions such as function signatures and clear requirements, then iteratively asks for edits and refactoring across multiple turns rather than throwing away the first result. Running and testing the code yourself is non-negotiable. The article shares an example of building a commit history aggregation page with Claude Code in about 17 minutes at a cost of $0.61, though he still had to configure GitHub Actions by hand. The biggest benefit is speed: LLMs make projects feasible that previously weren't worth the effort, while amplifying a developer's existing expertise.

## ~~[I use Cursor daily - here's how I avoid the garbage parts](https://www.nickcraux.com/blog/cursor-tips)~~

This post shares practical tips from daily use of Cursor, a code editor built on VS Code with deep integration of large language models like GPT-4. The author covers essential keyboard shortcuts, how to write prompts for more accurate AI responses, how to leverage codebase-wide chat, and strategies for optimizing workflows and configuring Cursor to fit individual developers and projects.

Notably, the author emphasizes harmonious collaboration between humans and AI rather than blindly leaving everything to the tool, resulting in higher-quality code in less time. It is a useful reference for both newcomers and experienced Cursor users looking to get more out of the editor.

## [Why Java endures: The foundation of modern enterprise development](https://github.blog/developer-skills/why-java-endures-the-foundation-of-modern-enterprise-development/)

This GitHub Blog article explains why Java, created in 1995 at Sun Microsystems, remains the foundation of enterprise software development nearly 30 years later. At the root of Java's strength is the "write once, run anywhere" principle: code written once can run across multiple operating systems without recompilation. The language continues to modernize—for instance, Java 23 (September 2024) simplifies syntax for beginners, while pattern matching and record classes help keep code concise and maintainable.

Furthermore, Java's ecosystem is massive, spanning the standard library and frameworks like Spring Boot and Hibernate so developers don't have to reinvent common solutions; Minecraft, Netflix, and LinkedIn are prime examples. In AI, while Python dominates research, Java excels at large-scale deployment—such as Uber's Michelangelo platform—and libraries like Deeplearning4j and LangChain4j make it straightforward to add AI capabilities to existing Java systems. The article concludes that Java remains a highly sought-after skill on the job market and will retain its position thanks to its commitment to durable, scalable, and maintainable code.

## [Part 5: Implementing a Web UI using Vaadin and GitHub Copilot Agent Mode](https://itnext.io/part-5-implementing-a-web-ui-using-vaadin-and-github-copilot-agent-mode-563e74f131aa)

This is the fifth installment in Saeed Zarinfam's series on using AI-powered IDEs for Java development. Here, the author uses VS Code with GitHub Copilot Agent Mode and Claude 3.5 Sonnet to build a web UI with Vaadin Flow—a niche framework for writing web interfaces entirely in Java—for a sample Employee Assistance Chatbot project built with Spring AI. He documents the exact steps and prompts used to see Copilot Agent Mode in action, while comparing it against Windsurf's Cascade agent, which he had previously used smoothly to build a cached REST service with Spring Boot.

The key difference this time is that the author is not very familiar with Vaadin Flow, making the post a test of whether LLMs truly help when working with a less popular framework. As the article's subtitle hints, the answer is fairly cautious: LLMs are not yet well suited to niche programming languages and frameworks, so developers cannot rely entirely on AI when stepping into unfamiliar technology.

## [Microservices vs. Monoliths: How to Choose the Right Architecture for Your Project](https://dev.to/jhonifaber/microservices-vs-monoliths-how-to-choose-the-right-architecture-for-your-project-2bep)

This article compares two common architectures—monoliths and microservices—to help engineering teams choose the right approach. In a monolith, the UI, business logic, and database operations live together in a single deployment unit, making it easy to build, test, debug, and operate. In exchange, scaling requires replicating the entire system rather than just the bottlenecked parts, large teams frequently run into merge conflicts, the tech stack is locked in across the whole application, and every small change forces a full redeployment, increasing risk.

Microservices split an application into independent services, each owning a specific business capability and communicating over APIs. This allows selective scaling, autonomous teams, and per-service technology choices. Service isolation can help contain failures, though it does not guarantee that a failure in one service won't cascade to dependent ones. The trade-off is high complexity: you need orchestration, monitoring, and service discovery tools while dealing with network latency and data consistency. The article introduces the SAGA pattern—a sequence of local transactions with compensating actions—and its two implementation styles: choreography (event-driven, decentralized) and orchestration (centrally coordinated). Choosing the right architecture depends on your application's needs, team size, and long-term goals.

## [Designing a Scalable Architecture - with Some Spring Boot Examples](https://dev.to/jhonifaber/designing-a-scalable-architecture-with-some-spring-boot-examples-340o)

This post outlines core principles for designing scalable systems, complete with Spring Boot examples. The author distinguishes vertical scaling (adding power to a single machine) from horizontal scaling (adding more instances), then walks through key building blocks: breaking applications into microservices for independent scaling, managing configuration with Spring Cloud Config and packaging with Docker, and designing stateless services—such as using JWT authentication so servers don't need to store and look up session state.

At the data layer, the article covers sharding, read replicas to offload the primary database, and NoSQL options like MongoDB with their trade-offs between consistency and availability. For asynchronous processing, it introduces message brokers like Kafka and RabbitMQ alongside Spring Boot's `@Async` annotation to run methods on separate threads. It also discusses caching with `@Cacheable` and `@CacheEvict`, plus an API Gateway handling routing, authentication, rate limiting, and circuit breaking. Finally, the author reminds readers that logging, security, monitoring, and error handling are essential to keeping a system resilient as it grows.

## [Java is Very Fast, If You Don’t Create Many Objects](https://blog.vanillajava.blog/2022/09/java-is-very-fast-if-you-dont-create.html)

High-performance Java specialist Peter Lawrey demonstrates that object allocation heavily impacts Java performance in high-throughput systems, even when garbage collection (GC) itself is cheap. In a Chronicle Wire benchmark on a Ryzen 5950X CPU, with zero object allocations, the system processed around 60–68 million events per second at a latency of 467–528 nanoseconds; allocating just a single 44-byte object per event dropped throughput to roughly 37–50 million events per second—about a 25% reduction—and added roughly 166 nanoseconds of latency.

Interestingly, GC took only about 170 milliseconds per minute (0.3% of runtime), showing that the bottleneck lies not in cleanup, but in pressure on the CPU's L1/L2/L3 caches when multiple cores allocate memory simultaneously. In multi-threaded tests, the allocation rate plateaued around 220 million objects per second, and latency spiked sharply beyond eight threads. Chronicle Wire solves this by reusing the same object per event type by default during deserialization, eliminating allocations while keeping the code simple. The takeaway: for latency-sensitive systems like finance, reducing object allocation yields far bigger gains than tuning GC.

## ~~[Microbenchmarks: Java Locks vs Atomic](https://blog.tombert.com/posts/2025-03-04-lock-benchmark/)~~

~~This article presents a detailed analysis of the performance of various synchronization mechanisms in multithreaded programming. The author benchmarked different lock types—including mutexes, spin locks, read-write locks, and lock-free solutions—evaluating them under varying load scenarios.~~

~~The benchmark results show significant differences across lock types, with several interesting findings:~~
~~1. Spin locks are generally more efficient than mutexes for short tasks with low contention~~
~~2. Read-write locks offer major benefits in read-heavy, write-light workloads~~
~~3. Lock-free solutions can deliver superior performance in certain cases, but are significantly more complex to implement and maintain~~

~~The article also discusses factors affecting lock performance such as latency, throughput, thread scalability, and the impact of cache coherence. The author provides practical guidelines for choosing the right synchronization mechanism based on application characteristics and data access patterns.~~

~~This is a valuable reference for developers working on high-performance multithreaded systems, helping them make informed decisions when selecting synchronization mechanisms for their specific project requirements.~~

## Bonus: Interesting images from [ByteByteGo](https://bytebytego.com/)

![API Protocols 101](https://substack-post-media.s3.amazonaws.com/public/images/ad16adef-3082-42bd-ac99-9a569ad2e33b_2250x2624.png)

---

*This post was rewritten by Claude Code with Opus 5.5 on 27/09/2026; reviewed and edited by Codex with GPT 6.1 Sol on 09/11/2026, and re-verified by Claude Code with Sonnet 5.5 on 16/11/2026.*
