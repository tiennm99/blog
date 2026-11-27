---
title: "Newsletter #13"
date: 2025-04-22
tags: ["AI-Assisted", "Newsletter", "Distributed Systems", "Java", "Spring Boot", "gRPC", "Performance"]
categories: [ "Newsletter" ]
---

*Enjoy Newsletter \#13.*

## [Designing a Distributed ID Generator](https://siddharthsabron.in/blog/id-generator/)

This article walks through building a 64-bit Snowflake-style distributed ID generator that produces unique IDs across nodes without relying on a centralized coordinator like a database `AUTO_INCREMENT` sequence. First, the author explains why random strings (like UUIDv4) make poor primary keys in relational databases: string comparisons are slower than integer comparisons, indexes take up much more memory, and inserting random keys into a B-Tree causes frequent page splits, fragmentation, and poor cache locality. By contrast, time-ordered 64-bit integers keep indexes compact and append new rows cleanly near the right edge of the B-Tree.

The core design packs three fields into a 64-bit integer: 41 bits for a millisecond timestamp relative to a custom epoch (good for ~69 years), 10 bits for the shard/machine ID (supporting up to 1,024 shards), and 12 bits for a per-millisecond sequence counter (allowing 4,096 IDs per millisecond per shard), combined using bitwise shifts and `OR` operations. The author also candidly notes what needs to be hardened before taking the toy code to production, including handling sequence rollovers within the same millisecond, NTP clock drift, and automated shard ID assignment. It is a clear, practical read on why primary-key layout directly impacts database performance.

## [3,200% CPU Utilization](https://josephmate.github.io/2025-02-26-3200p-cpu-util/)

Joseph Mate recounts a production war story where a Java server spiked so hard that he could barely SSH into the box: CPU utilization hit 3,200%, pegging all 32 cores at 100%. Pulling a Java 17 thread dump—which includes per-thread CPU time—revealed dozens of threads stuck endlessly inside `TreeMap.put()`. The culprit was an unsynchronized `TreeMap` being mutated concurrently by multiple threads. Under a race condition during tree rebalancing, the internal red-black tree's pointers became corrupted and formed a cycle, causing subsequent lookups and inserts to spin in an infinite loop. Crucially, the bug stayed hidden until `NullPointerException`s thrown during concurrent corruption were silently swallowed by an executor thread pool without an uncaught exception handler (or inside a gRPC request handler), leaving the corrupted map live in memory with zero stack traces in the logs.

The author reproduces the bug in a standalone test, compares how other languages handle concurrent map mutation, and outlines fixes—the simplest being wrapping the map in `Collections.synchronizedMap` or switching to `ConcurrentSkipListMap`. Beyond the immediate fix, he advocates defense-in-depth: alerting on unexpected NPEs, monitoring sustained CPU anomalies, always registering an `UncaughtExceptionHandler` on thread pools, thorough code review, static analysis, and multithreaded stress tests. It's a vivid reminder that data races don't just corrupt state—they can take down an entire server.

## [A map metaphor for architectural diagrams](https://www.giorgiosironi.com/2025/02/maps-metaphor-for-architectural-diagrams.html)

Giorgio Sironi suggests thinking of software architecture diagrams as maps: the map is not the territory, and every model is "wrong" because it leaves out detail, yet it becomes useful precisely by highlighting the specific dimension needed for a given task. Just like a topographic map versus a subway map, each architectural diagram should focus on a single slice of concern. If a diagram constantly falls out of sync with the code, it is probably drawn at too low a level of abstraction.

Sironi shares his experience maintaining a lightweight set of living "maps" on a digital whiteboard like Miro, using nothing more than boxes, arrows, sticky notes for open decisions, and color-coding for status. These living boards replace sprawling lists of Architectural Decision Records (ADRs)—which become hard to navigate once you have dozens of them—and differ from ADRs by being edited in place as the system evolves. His core set of maps covers system context (inspired by the C4 model), bounded contexts and their ubiquitous language, static module dependencies, testing strategy, observability pipelines, and technology radar choices. Crucially, the whole team owns and updates these maps together rather than treating them as the tech lead's private artifact, consulting them whenever kicking off a new initiative.

## [About "Developer philosophy"](https://tryingthings.wordpress.com/2025/02/28/about-developer-philosophy/)

Sorin Costea shares his reflections on reading qntm's "Developer philosophy" essay. He starts by asking whether there is still room for junior developers in the age of AI, empathizing with new grads struggling to land their first role and drawing parallels to the offshoring wave of the 2000s. On the topic of big-bang rewrites, while he agrees with qntm that the rot leading to a rewrite builds up over years, he argues that accumulated gaps can usually still be paid down incrementally. Full rewrites, he warns, are massive projects that inevitably slip their schedules—at which point "non-essential" requirements get cut to hit the deadline, birthing a brand-new pile of technical debt in the replacement system.

In the second half, Costea offers pragmatic caveats on qntm's other rules: automating best practices via linters only works once you have buy-in from the influential voices on the team; edge cases often only reveal themselves late in the game following the 80/20 rule; don't expect a V2 rewrite to stay clean and simple for long; and even code that looks modular, testable, and "obviously correct" can still surprise you in production. It's a grounded, slightly battle-weary counterpoint to the original essay.

## [Team learning session: surviving legacy code by J.B. Rainsberger](https://www.giorgiosironi.com/2025/02/team-learning-session-surviving-legacy.html)

Giorgio Sironi describes how he runs a recurring team learning session built around J.B. Rainsberger's "Surviving Legacy Code" kata. The fictional premise puts a TypeScript team in charge of maintaining a newly acquired, business-critical PHP codebase with no tests, cryptic logic, and nobody left who knows where the landmines are buried. The exercise targets three learning goals: characterizing and understanding unfamiliar legacy code, writing tests at multiple levels of granularity, and refactoring safely behind a safety net of tests—while also getting comfortable picking up an unfamiliar language and its ecosystem tooling (`Composer`, `PHPUnit`, `PHPStan`, `PHP-CS-Fixer`).

The team works together in an ensemble (mob programming) format for an hour a week on a single shared screen against a deliberately awful toy repository. Their progression starts with running the code to see what it does, locking down existing behavior with a **Golden Master** characterization test (controlling the random number generator seed so outputs are deterministic), and only then extracting smaller seams and writing fine-grained unit tests. Because the codebase is fictional and there is no delivery deadline, teammates feel safe saying "I don't know" and experimenting aloud. Each session wraps up with a quick retrospective to capture takeaways and pick the next thread to pull.

## [Trimodal Nature of Tech Compensation in the US, UK and India](https://newsletter.pragmaticengineer.com/p/trimodal)

Gergely Orosz, author of *The Pragmatic Engineer*, analyzes more than 20,000 compensation data points from Levels.fyi to test his **trimodal compensation model** across the US, the UK, and India. Under this model, tech employers cluster into three distinct pay bands: **Tier 1** (local market rate—the vast majority of companies), **Tier 2** (Big Tech and regional leaders), and **Tier 3** (top scaleups, elite quant trading firms, and hedge funds). In the US, Tier 2 and Tier 3 typically pay roughly double Tier 1 at both the median and 75th percentile for both entry-level and senior engineers, with significant overlap between Tier 2 and Tier 3 packages.

The post breaks down top-paying companies in each tier by country and surfaces several striking patterns: hedge funds and quant firms don't grant equity, but pay massive year-end cash bonuses that make them the only group paying higher pure cash compensation than Big Tech; in the UK, hedge funds and financial institutions dominate the very top of the market; and in India, top Tier 3 employers pay over ₹1 crore ($120K+) for senior engineers. Orosz also reminds readers that private "paper money" equity at pre-IPO scaleups can inflate headline numbers while carrying real liquidity risk. It is an essential read for calibrating your market value and career strategy.

## [9 Software Architecture Patterns for Distributed Systems](https://dev.to/somadevtoo/9-software-architecture-patterns-for-distributed-systems-2o86)

Soma provides a visual overview of nine fundamental architectural patterns for managing data flow and communication in distributed systems—topics that also come up constantly in system design interviews. The first five cover communication and state: **Peer-to-Peer**, where nodes communicate directly without a central coordinator; **API Gateway**, a single entry point handling authentication, rate limiting, and routing to backend services; **Pub-Sub**, decoupling producers and consumers asynchronously through topics; **Request-Response**, the classic synchronous client-server model; and **Event Sourcing**, persisting every state transition as an immutable append-only log of events.

The remaining four focus on data processing and workflow coordination: **ETL** (Extract, Transform, Load) for moving data into analytical stores; **Batching** for high-throughput periodic processing; **Stream Processing** for continuous real-time event pipelines; and **Orchestration**, where a central controller coordinates multi-step workflows across services. Each pattern is paired with a clear diagram and real-world use cases, making the post a handy quick-reference refresher before diving deeper into individual patterns.

## [Extending Java APIs - Add Missing Features Without the Hassle](https://foojay.io/today/extending-java-apis-add-missing-features-without-the-hassle/)

Shai Almog introduces the **extension methods** feature of the Manifold compiler plugin, which lets you add missing methods to existing Java classes (like `String` or `Collection`) without waiting years for the JDK to add them. You simply create a class annotated with `@Extension` inside a package whose name ends with the fully qualified name of the target class, and write `static` methods whose first parameter is annotated with `@This`. For example, you can add a `.map()` method directly onto `Collection` to skip the ceremony of calling `.stream().map(...).toList()`. Under the hood, Manifold does not modify the bytecode of the target JDK class—instead, it rewrites call sites into static method calls at compile time with zero runtime wrapper overhead. And if a future JDK release adds a native method with the exact same signature, the real JDK method automatically takes precedence, keeping upgrades smooth.

Manifold also ships with ready-made extension libraries for collections, `String`, I/O, and JSON—bringing Kotlin-style helpers like `removePrefix()`, `padStart()`, and `isEmpty()` on arrays straight to Java. Finally, the post showcases `@Structural` interfaces, which bring TypeScript/Go-style structural typing to Java so unrelated classes like `String` and `Collection` can be treated polymorphically through a shared interface without modifying their class declarations.

## [How Spring Boot Reloads Configuration Without Restart](https://medium.com/@AlexanderObregon/how-spring-boot-reloads-configuration-without-restart-4d9dc9e8b926)

Alexander Obregon explains how Spring Boot reloads configuration properties dynamically at runtime without restarting the JVM. By default, `@Value` and `@ConfigurationProperties` bindings are evaluated once at startup. To make them dynamic, applications typically pull configuration from Spring Cloud Config Server, annotate dynamic beans with `@RefreshScope`, and trigger a reload by sending a POST request to Spring Boot Actuator's `/actuator/refresh` endpoint.

The article looks under the hood at what happens when `/actuator/refresh` is called: Spring publishes a `RefreshEvent`; the `ConfigurableEnvironment` re-fetches property sources from the external config server and diffs the changes; and any bean marked with `@RefreshScope`—which Spring wraps in a CGLIB proxy at startup—has its cached target instance invalidated in the scope cache, forcing Spring to lazily re-instantiate the bean with the fresh property values on the very next method call. Properties injected into regular singleton beans outside `@RefreshScope`, the author notes, will not update until a full restart. For multi-instance deployments, pairing Config Server with **Spring Cloud Bus** over RabbitMQ or Kafka broadcasts the refresh event across every running instance simultaneously via `/actuator/bus-refresh`.

## [Building High-Performance RPC Services with gRPC and Spring Boot](https://www.javacodegeeks.com/2025/03/building-high-performance-rpc-services-with-grpc-and-spring-boot.html)

Eleftheria Drosopoulou walks through integrating gRPC into a Spring Boot application to build high-performance RPC services. Created by Google, gRPC uses HTTP/2 for transport and Protocol Buffers (Protobuf) as its interface definition language and binary serialization format. Thanks to compact binary payloads, HTTP/2 connection multiplexing, native bidirectional streaming, and strongly typed client/server code generation from `.proto` schemas, gRPC is a strong fit for internal microservice-to-microservice communication. The article opens with a comparison table pitting gRPC against REST and WebSockets across transport protocol, payload format, performance, streaming support, and browser compatibility.

The hands-on tutorial steps through adding `grpc-spring-boot-starter`, defining a service contract in a `.proto` file, configuring the Maven Protobuf plugin to generate Java stubs, implementing the server-side service class, and wiring up the gRPC server port. It wraps up with clear guidance on when to pick each protocol: gRPC for low-latency polyglot microservices and streaming RPCs, REST for public-facing CRUD APIs and direct browser clients, and WebSockets for stateful real-time browser push.

## Bonus: Interesting images from [ByteByteGo](https://bytebytego.com/)

![Latency and Partition Tolerance in Distributed Systems](https://substack-post-media.s3.amazonaws.com/public/images/39f5b04d-ad39-4bbe-a32f-f47792d4ef62_2250x2682.png)

## Bonus 2: Interesting videos from [ByteByteGo](https://bytebytego.com/)

[8 Most Important Tips for Designing Fault-Tolerant System](https://www.youtube.com/watch?v=3Lis4w4_bBc)

---

*This post was rewritten by Claude Code with Opus 5.5 on 27/09/2026; reviewed and edited by Codex with GPT 6.1 Sol on 09/11/2026, and re-verified by Claude Code with Sonnet 5.5 on 16/11/2026.*
