---
title: "Newsletter #72"
date: 2025-12-15
tags: ["AI-Assisted", "Newsletter", "Compilers", "System Design", "Replication", "DDD", "Software Architecture"]
categories: ["Newsletter"]
---

*Enjoy Newsletter #72.*

## [The Easiest Way to Build a Type Checker](https://jimmyhmiller.com/easiest-way-to-build-type-checker)

Jimmy Miller shares that papers and tutorials on Hindley-Milner or Algorithm W never helped him understand how a type checker is actually implemented—until he discovered bidirectional type checking. The core idea is to split the work into two directions: `infer` deduces the type of an expression, while `check` verifies whether an expression matches an expected type. In exchange for this simplicity, the language requires a few type annotations, usually just on function definitions, while local variables are still inferred automatically. He presents a roughly 100-line TypeScript implementation for a small language with numbers, strings, functions, function calls, `let` bindings, and blocks.

The post walks through each component: an abstract syntax tree (AST) makes traversing a program much easier than working with raw strings, and the type context is just a `Map` from variable names to types that gets cloned whenever entering a new function or block scope. By adding addition as an example, he shows how `infer` and `check` mutually recurse until they bottom out at base cases. While this type checker is far from complete, it serves as an approachable starting point to extend and understand type systems without wading through dense academic papers.

## [Deprecation](https://abseil.io/resources/swe-book/html/ch15.html)

This is Chapter 15 of *Software Engineering at Google*, which focuses on the planned deprecation and removal of obsolete systems. The chapter's premise is that "code is a liability, not an asset": every system carries ongoing operational and maintenance costs, so once an equivalent replacement exists, running both in parallel increases complexity and holds back the new system. Even so, age alone is not a reason to deprecate, and an organization should only take on as many deprecation efforts as it can realistically finish, committing to see them through to the end.

The authors explain why deprecation is so hard: Hyrum's Law means users come to depend on unpromised behaviors, a new system rarely achieves 100% parity with the old one, engineers form emotional attachments to code they wrote, and securing resources for cleanup work is a tough sell. Google distinguishes between advisory deprecation and compulsory deprecation with enforced deadlines, emphasizing clear ownership, milestones, migration support, and tooling like static analysis and large-scale changes to block new usages. Key takeaways for engineers include designing systems with replaceable parts from the start and favoring incremental in-place evolution over full rewrites.

## [16 Replication Concepts Every Software Engineer Should Know (Simple Guide for 2026)](https://designgurus.substack.com/p/16-replication-concepts-every-software)

Arslan Ahmad explains sixteen data replication concepts that keep large-scale systems reliable, fast, and fault-tolerant, pairing each concept with a practical example. The post begins with the three main topologies: single-leader replication where one node accepts all writes, multi-leader replication suited for multi-region applications at the cost of conflict resolution, and leaderless replication (like Dynamo) where any node can accept writes. Next come synchronous, asynchronous, and semi-synchronous replication modes, illustrating the trade-off between durability and latency—for instance, a bank waiting for replicas to confirm a transaction versus a social network accepting a few seconds of delay before a photo appears in another region.

Later sections cover read and write quorums (such as requiring three out of five replicas to acknowledge), replication lag and the risk of stale reads, failover when a primary node goes down, geo-replication, and self-healing mechanisms like read repair and hinted handoff. It serves as a concise primer for engineers looking to understand what happens under the hood of the distributed databases they use every day.

## [50 System Design Concepts for Beginners in 90 Minutes [2026 Edition]](https://designgurus.substack.com/p/50-system-design-concepts-for-beginners)

Arslan Ahmad rounds up 50 essential system design concepts in a single guide aimed at beginners and interview candidates, explaining each concisely with an intuitive example. The fundamentals section covers vertical vs. horizontal scaling, the CAP and PACELC theorems, ACID vs. BASE, throughput vs. latency, Amdahl's Law, strong vs. eventual consistency, stateful vs. stateless architectures, and choosing between monoliths, microservices, and serverless.

Subsequent sections walk through networking and communication (load balancing, CDNs, gRPC vs. REST), data storage (sharding, replication, indexing), reliability patterns like circuit breakers, retries, and idempotency, caching strategies, message queues, observability with tracing and SLIs/SLOs, and security with OAuth, TLS, and Zero Trust. The recurring theme is that no option is universally best: a system designer must understand the trade-offs of each approach to pick the right fit for the problem at hand—for example, starting with a monolith and only splitting into microservices when truly necessary.

## [DDD: A Toolbox, Not a Religion](https://threedots.tech/episode/ddd-toolbox-not-religion)

In this episode of the *No Silver Bullet* podcast, Miłosz and Robert from Three Dots Labs discuss why software projects often start out promising and gradually turn into legacy code nobody wants to touch: new features diverge from the original design, and instead of remodeling, teams just pile on quick patches time after time. In their view, most projects fail not because of technical challenges, but because of poorly handled business complexity—most SaaS apps use very similar tech stacks, and what actually differentiates companies is the domain they serve.

The hosts treat Domain-Driven Design (DDD) as a toolbox rather than a religion: you don't need to apply every pattern, just pick what solves your actual problem. They warn against solving imaginary problems, like spending months building a custom framework or platform before shipping real features, sharing an anecdote about a generic messaging framework that kept them from ever finishing a game jam entry. Their advice is to understand the business model before designing database schemas, and to always apply strategic patterns—like identifying the core domain and module boundaries—even when skipping tactical patterns. As Miłosz sums it up: "DDD is about understanding the domain you work in and then modeling it well in code."

### Bonus

**Images:**
![Saga Pattern Demystified: Orchestration vs Choreography](https://substackcdn.com/image/fetch/$s_!lwoL!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fb1ec5785-ad8a-4350-b07d-005f7b04b1f1_2250x2624.png)
![Virtualization vs. Containerization](https://substackcdn.com/image/fetch/$s_!SfCa!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F55ac4874-04fc-4ea7-a083-bde8f6f99cf5_2360x2960.png)
![5 REST API Authentication Methods](https://substackcdn.com/image/fetch/$s_!zlUS!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F156acc80-7588-4fc1-8f43-7fa1458d646c_2360x2770.png)
![What is a Firewall?](https://substackcdn.com/image/fetch/$s_!CYiE!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5eb76d35-fba8-48de-84d1-228060740d89_2360x2960.png)
![Modem vs. Router](https://substackcdn.com/image/fetch/$s_!fKIx!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F7278af0a-b8cb-4b72-bd48-341e92286b1b_2360x2960.png)
![A Guide to Service Mesh Architectural Pattern](https://substackcdn.com/image/fetch/$s_!zdVq!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F60a16dc3-e973-4d2d-a0c2-7d426d5fe6c9_2250x2624.png)
![What is a REST API?](https://substackcdn.com/image/fetch/$s_!Q7Mr!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F73400113-5bd5-4c40-a7e3-7346fb229256_3000x3900.jpeg)
![How Java HashMaps Work?](https://substackcdn.com/image/fetch/$s_!Phtx!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa7dce573-ac95-46cc-a80d-62f80e6f0602_800x989.jpeg)
![Virtualization Explained: From Bare Metal to Hosted Hypervisors](https://substackcdn.com/image/fetch/$s_!1-F-!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F473c684e-3c14-44c1-9889-97fef9caef15_2360x2960.png)
![Must-Know System Performance Strategies](https://substackcdn.com/image/fetch/$s_!yDvA!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa3c9b76d-b1b9-4284-a64e-16faa832544e_2250x2624.png)
![Apache Kafka vs. RabbitMQ](https://substackcdn.com/image/fetch/$s_!_5Is!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F6ebf5287-65fa-4db7-8490-54792fd1886c_2360x2920.png)
![The HTTP Mindmap](https://substackcdn.com/image/fetch/$s_!1Hk2!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fced11d9e-ce25-439e-9a56-4ccf37c1854f_2360x2770.png)
![How DNS Works](https://substackcdn.com/image/fetch/$s_!hn6T!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa0f70b08-6fa9-4413-9bd4-0571f99dba60_2360x2664.png)
![Can a web server provide real-time updates?](https://substackcdn.com/image/fetch/$s_!Sny4!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F7911abd9-06ce-48f4-98c5-c3305b752fb7_800x1142.jpeg)

**Videos:**
[How Does a URL Shortener Work?](https://www.youtube.com/watch?v=HHUi8F_qAXM)

---

*This post was rewritten by Claude Code with Opus 5.5 on 27/09/2026.*
