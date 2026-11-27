---
title: "Newsletter #3"
date: 2025-02-23
tags: ["AI-Assisted", "Newsletter", "Java", "JVM", "Redis", "Database Sharding", "Career"]
categories: [ "Newsletter" ]
---

<i>
Hello everyone, another weekend has rolled around—sit back, relax, and enjoy MiTi's Newsletter #3.
</i>

## [Java's Plans for 2025 - Inside Java Newscast #83](https://www.youtube.com/watch?v=y26XGt8d_kI)

Episode #83 of the Inside Java Newscast from the official Java channel surveys Java's roadmap for 2025 across the major OpenJDK projects: Babylon, Loom, Leyden, Lilliput, Panama, and Valhalla. For each project, the video recaps what has been accomplished so far and what is planned next, saving Project Amber for a dedicated follow-up episode. It is a quick way to get the big picture of where the Java language and platform are headed.

## ~~[Why You Should Learn Kotlin in 2025](https://dev.to/empiree/why-you-should-learn-kotlin-in-2025-47g0)~~

~~This article on Dev.to encourages developers to learn Kotlin in 2025, highlighting its modern features, Java interoperability, and versatile applications. The post also discusses the job market and salary potential for Kotlin developers.~~

## [Mastering Java Logging: Best Practices for Effective Application Monitoring](https://dev.to/nithinbharathwaj/mastering-java-logging-best-practices-for-effective-application-monitoring-20h7)

This Dev.to article rounds up best practices for logging in Java applications. The author recommends pairing SLF4J as the logging facade with Logback as the underlying implementation so you can swap logging frameworks without touching application code, and explains how to choose appropriate log levels from TRACE to FATAL to avoid both missing critical errors and flooding alerting systems (the post mentions FATAL, though SLF4J and Logback only define TRACE, DEBUG, INFO, WARN, and ERROR). It also walks through structured JSON logging with `logstash-logback-encoder` and using MDC (Mapped Diagnostic Context) to automatically attach contextual metadata like request IDs or user IDs to every log line.

The second half focuses on performance and operations: using asynchronous appenders, avoiding expensive computations inside logging calls, and deferring message construction (in SLF4J 2, you can pass a `Supplier` via the fluent logging API). On the security front, the author stresses masking sensitive data such as credit card numbers and passwords. Finally, the post covers centralized log aggregation with the ELK stack or Graylog, along with log rotation and retention policies to keep disks from filling up.

## [Fixed Window Counter Rate Limiter (Redis & Java)](https://foojay.io/today/fixed-window-counter-rate-limiter-redis-java/)

This foojay.io tutorial walks through building a Fixed Window Counter rate limiter using Redis and Java. The algorithm divides time into fixed intervals, counts requests within each interval, and rejects requests once the threshold is exceeded; its main advantage is simplicity, though bursts of traffic near the boundary between two windows can let twice the allowed rate through. The implementation uses Jedis with a dedicated key per client: it reads the current counter with `GET`, and then inside a `MULTI`/`EXEC` transaction increments the counter with `INCR` and sets the TTL using `EXPIRE` with the `NX` flag so the expiration is only set when the key is first created rather than extending the window on every request.

The post also demonstrates how to test the rate limiter using Redis TestContainers, JUnit 5, and AssertJ, covering key scenarios: requests within the limit are allowed, requests exceeding the limit are rejected, the counter resets once the window expires, separate clients maintain independent counters, and rejected requests do not increment the counter. Note that because the initial `GET` and threshold check happen outside the `MULTI`/`EXEC` transaction, concurrent requests can still race past the limit; stricter enforcement requires a Lua script or `WATCH` with retries.

## [How JVM handles exceptions](https://foojay.io/today/how-jvm-handles-exceptions/)

This foojay.io article explains how the Java Virtual Machine (JVM) handles exceptions at the bytecode level. Each method can carry an exception table where every entry specifies a protected bytecode range (`from`, `to`), a handler jump target (`target`), and the exception type to catch—or `any` for handlers that catch all throwables. When an `athrow` instruction executes, the JVM pops the exception object from the operand stack and searches the current method's exception table for a matching handler; if none is found, it unwinds the call stack frame by frame. If the exception remains uncaught all the way up the call chain, the active thread terminates after running its uncaught exception handler.

The author also dissects how the compiler translates `try-catch-finally` blocks into bytecode. In the example, the `finally` block's bytecode is duplicated along the normal execution path, while `any` entries in the exception table route control flow through the `finally` block whenever an exception is thrown inside `try` or `catch`. It is a great read if you want to see what actually happens under the hood when an exception is thrown.

## [Database Sharding Explained](https://architecturenotes.co/p/database-sharding-explained)

This Architecture Notes piece explains database sharding—the technique of partitioning data across multiple machines when a single database server can no longer handle the load. Before reaching for sharding, the author advises exhausting simpler alternatives: doing nothing if there isn't a clear bottleneck yet, scaling vertically with bigger hardware, adding read replicas to offload read traffic, or moving specific workloads to specialized stores like Elasticsearch for search or S3 for large blobs.

The article then covers three primary sharding strategies: hash-based sharding (distributes data evenly but makes resharding painful), range-based sharding (requires a lookup table and a well-distributed shard key to avoid hot spots), and relationship-based sharding (keeps related entities together on the same shard). The author clarifies the role of the shard key, distinguishes logical shards from physical shards, and introduces two-phase commit (2PC) as a way to coordinate atomic transactions across multiple shards—at the cost of extra write latency and significant complexity. The overarching message: sharding unlocks horizontal scale, but comes with a heavy operational burden.

## [Protecting your time from predators in large tech companies](https://www.seangoedecke.com/predators/)

In this post, Sean Goedecke warns high-performing engineers at large tech companies about people who constantly try to hijack their time—whom he calls "predators." Two archetypes stand out: product managers from other teams who slide into DMs asking for a "quick fix" to bypass official prioritization channels, and underperforming engineers who lean on others as a substitute for learning on their own, claiming credit for the resulting work without acknowledging the help.

To protect yourself, the author advises spotting asymmetric requests—where the requester puts in minimal effort while expecting hours of work from you—and matching their level of effort in your response. Move private requests into public channels so your contributions are visible and your manager stays in the loop. He also makes sure to distinguish legitimate demands on your time: helping your own manager, your reports, or junior teammates who are genuinely ramping up is part of the job. Above all, remember that shipping your own assigned projects is your primary responsibility.

## [How to improve your WFH lighting to reduce eye strain](https://rustle.ca/posts/articles/work-from-home-lighting)

This post on rustle.ca shares practical ways to set up your work-from-home lighting to reduce eye strain. The author identifies three main culprits: imperceptible monitor flicker (PWM), especially when screen brightness is turned down and the monitor is the sole light source in the room; high-contrast environments such as harsh window glare or unevenly lit rooms; and focusing at a fixed distance for hours on end. For the last issue, the author recommends the 20/20/20 rule: every 20 minutes, look at something at least 20 feet (about 6 meters) away for at least 20 seconds.

Concrete recommendations include making the most of natural daylight, using sheer curtains to diffuse direct sunlight rather than blocking it completely, placing multiple indirect light sources around the room to eliminate dark corners, choosing dimmable, flicker-free bulbs with a high Color Rendering Index (CRI) and a warm color temperature around 2700K, and adding a desk lamp or monitor bias lighting matched roughly to your screen's brightness.

## [Working fast and slow](https://www.seangoedecke.com/working-fast-and-slow/)

Sean Goedecke argues that uneven productivity isn't a flaw to be fixed; instead, he deliberately alternates between two working modes. During high-focus states, complex problems feel effortless, so he channels that energy into high-impact tasks, blocks out distractions, and works for hours at a stretch. However, this state burns through a finite internal reservoir of energy that takes time to recharge.

When focus is low, he switches to lighter work such as knocking out easy tickets, reviewing pull requests, or unblocking other projects. Trying to force hard engineering work while unfocused, he notes, only introduces bugs that take longer to fix than simply waiting for focus to return—and usually gives you a headache to boot. This two-speed rhythm also aligns naturally with the cadence of large tech companies, where quiet maintenance periods alternate with high-stakes crunches that demand everything you've got.

## Bonus

### Bonus #1: Interesting images from [ByteByteGo](https://bytebytego.com/)

![Top Strategies to Reduce Latency](https://substack-post-media.s3.amazonaws.com/public/images/fe9062b4-fd0e-4530-8e20-eea854b8490e_2250x2814.png)
![The Ultimate API Learning Roadmap](https://substack-post-media.s3.amazonaws.com/public/images/9c309ad3-78a8-4511-a6f2-e69c06d5c500_1280x1566.gif)
![10 Essential Components of a Production Web Application](https://substack-post-media.s3.amazonaws.com/public/images/a44f9f4b-193d-484e-bbf1-169751104380_1280x1568.gif)
![How do we design effective and safe APIs?](https://substack-post-media.s3.amazonaws.com/public/images/d5155be3-163d-479c-a75e-632e0f98dd36_3006x3453.jpeg)
![Code First v.s. API First](https://substack-post-media.s3.amazonaws.com/public/images/aad520f5-00d9-4606-af4b-fdb5d1ac63c4_1600x1483.png)
![Oauth 2.0 Explained With Simple Terms](https://substack-post-media.s3.amazonaws.com/public/images/bb375f63-bf06-4956-b3a3-914fd6aa2d91_1280x1664.jpeg)
![Session, Cookie, JWT, Token, SSO, and OAuth 2.0 Explained in One Diagram](https://substack-post-media.s3.amazonaws.com/public/images/c1155e03-c3dc-4192-8e05-e6b87dc6a574_1280x1664.gif)

### Bonus #2: Other interesting links

- [Self-hosted Alternatives to Popular Software](https://openalternative.co/self-hosted)

---

*This post was rewritten by Claude Code with Opus 5.5 on 27/09/2026; reviewed and edited by Codex with GPT 6.1 Sol on 09/11/2026, and re-verified by Claude Code with Sonnet 5.5 on 16/11/2026.*
