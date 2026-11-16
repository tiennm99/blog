---
title: "Newsletter #12"
date: 2025-04-20
tags: ["AI-Assisted", "Newsletter", "Software Architecture", "Distributed Systems", "Java", "Networking", "System Design"]
categories: [ "Newsletter" ]
---

*Enjoy Newsletter \#12.*

## [Fundamental Techniques for Software Architects](https://www.workingsoftware.dev/fundamental-techniques-for-software-architects/)

Patrick Roos curates roughly 30 foundational techniques every software architect should have in their toolkit, organized by project lifecycle phase. In the **Strategic** phase, techniques like Impact Mapping and Wardley Mapping connect technical initiatives to business outcomes. Under **Ideation & Alignment**, he covers Domain Storytelling, Event Storming, Ubiquitous Language, Context Mapping, the Bounded Context Canvas, and quality-attribute workshops like arc42 Q42 and Quality Storming. **Decision-Making** features Architectural Principles and Architecture Decision Records (ADRs); **Technology Management** introduces the Tech Stack Canvas and Technology Radar; and **Risk Management** covers Risk Storming, Technical Debt Records, and Threat Modeling.

The final groups focus on **Visualization & Documentation** (the C4 Model, arc42, Documentation as Code) and **Measurement & Improvement** (DORA Metrics, aim42, Residuality Theory). Each entry includes a concise summary along with reference talks or examples, making the article an excellent reference map: you don't need to apply all 30 on a single project, just reach for the right tool for the problem in front of you—whether that's untangling domain boundaries or aligning stakeholders.

## [The End of Programming as We Know It](https://www.oreilly.com/radar/the-end-of-programming-as-we-know-it/)

Tim O'Reilly pushes back against the doom-and-gloom narrative that AI will put software developers out of work. Looking back through computing history—from physical plugboards, assembly, and compiled languages to operating systems, the web, and cloud computing—every time a higher-level abstraction "ended" an older way of programming, the total number of programmers actually grew, because cheaper software unlocked massive pent-up demand. Drawing on economist James Bessen's research on the Industrial Revolution, O'Reilly argues that the biggest gains arrive only as workers "learn by doing" to master new workflows, and that junior developers who embrace AI tools can easily outpace senior engineers who refuse to adapt.

Quoting practitioners like Sam Schillace, Bret Taylor, and Addy Osmani, the essay argues that we are inventing a brand-new programming paradigm around AI: humans are still essential for supplying domain context, understanding end-to-end business workflows, and hardening prototypes for production, while multi-agent coordination remains in its infancy. His conclusion: when AI multiplies developer productivity, the scope of what is worth automating—and what users expect from software—expands right along with it, marking not the death of programming, but its latest rebirth.

## [In defense of simple architectures](https://danluu.com/simple-architectures/)

Dan Luu shares lessons from his time at Wave, a $1.7 billion fintech company with roughly 70 engineers running on a remarkably simple architecture: a monolithic Python application backed by PostgreSQL. He also points to Stack Overflow as a classic example of scaling a monolithic architecture into one of the top 100 most-visited sites on the web. Wave chose synchronous Python over bug-prone async frameworks, offloaded slow operations to background queues, and candidly acknowledges a few regrets along the way—such as loose database transaction boundaries and friction with RabbitMQ, Celery, and SQLAlchemy. On the flip side, they were very happy with GraphQL and Kubernetes for concrete business reasons, such as spinning up isolated data centers inside individual African countries to meet local regulatory and latency requirements.

The central takeaway: modern hardware is fast enough that the vast majority of applications—even at very high traffic—can run comfortably on a simple monolithic architecture that is far cheaper to operate and easier to maintain. Keeping application architecture as boring as possible preserves the team's finite "complexity budget" for the problems that actually differentiate the business, like integrating directly with local telecom providers. Luu also critiques how tech conferences disproportionately spotlight complex microservice architectures from hyperscalers, luring small companies into copying complexity they don't need.

## [The trouble with "good enough"](https://newsletter.weskao.com/p/the-trouble-with-good-enough)

Wes Kao opens with artist Josef Albers's observation that if you say the word "red" to 50 people, there will be 50 different shades of red in their minds. In the same way, everyone has a different internal definition of "good enough." We all know the textbook advice to stop polishing once we hit diminishing returns—but in practice, many people declare victory long before they actually reach that point, often without realizing how low their bar is set.

Kao illustrates the gap with concrete examples: a product feature is only "good enough" when it actually solves the customer's problem, not merely when a manager signs off on shipping it; an email is only "good enough" when it persuades the reader to act, not the moment you hit send. Raising your bar doesn't mean spending 30 hours perfecting every minor task—it means pushing 10–20% further along the quality curve on your highest-leverage work. The post closes with reflection questions to help you spot where you might be calling work "good enough" prematurely and where raising your standards will pay off most.

## [Should managers still code?](https://theengineeringmanager.substack.com/p/should-managers-still-code)

James Stanier tackles a classic reader question: should engineering managers still write code day-to-day? He starts by drawing a sharp distinction between **being in the code** and **writing code on the critical path**. Every engineering manager should stay close to the code: understanding how the system is architected, reviewing pull requests and design docs, helping triage production incidents, pairing with teammates, and owning the team's overall engineering quality. Taking on critical-path feature implementation yourself, however, is much trickier because a manager's fragmented calendar quickly turns them into a bottleneck for the team. Stanier also situates the question in the post-ZIRP era of "flattening" org charts, where many managers feel renewed pressure to prove their hands-on technical chops.

For managers who want (or need) to keep coding without blocking their team, he offers practical strategies: blocking out dedicated focus hours on your calendar, pair programming, doing deep code reviews by checking out branches and running them locally, leaning in during early prototyping or incident response, and building small exploratory proofs-of-concept with new technologies to share learnings back with the team.

## [What is Saga Pattern in Distributed Systems?](https://newsletter.scalablethread.com/p/what-is-saga-pattern-in-distributed)

In a microservices architecture, a single user action like placing an order often spans multiple services (inventory, payment, shipping), each owning its own isolated database—meaning traditional single-database ACID transactions no longer work. The **Saga Pattern** solves this by breaking a distributed business transaction into a sequence of local transactions; if any step fails along the way, the saga executes a chain of **compensating transactions** to semantically undo the steps that already succeeded.

The post contrasts the two main ways to coordinate a saga. **Orchestration** uses a central coordinator service that directs each participant step by step, making control flow, monitoring, and error recovery easy to follow at the risk of central coupling. **Choreography** lets services react to one another asynchronously via domain events without a central orchestrator, keeping services loosely coupled but making end-to-end flow and failure recovery harder to trace as workflows grow. The author wraps up with a summary of the Saga pattern's strengths (eventual data consistency, horizontal scalability, flexibility) and trade-offs (implementation complexity, tricky compensation logic, and added latency).

## [What would happen if we didn't use TCP or UDP?](https://github.com/Hawzen/hdp)

The author asks a fun networking question: what actually happens if you send packets over a custom transport-layer protocol instead of TCP, UDP, or ICMP? To find out, he designed a toy protocol called **HDP**, wrote a client and server in Rust using raw sockets, and tested sending packets over the macOS loopback interface across every possible 8-bit IP `Protocol` header number. Most protocol numbers went through fine locally, except `1` (ICMP), `2` (IGMP), and `6` (TCP), which the macOS kernel intercepted before they reached the user-space server, `50` and `51` (IPSec ESP/AH), which the OS refused to send, and `256`, which overflows the 8-bit field. Re-running the exact same test on Linux yielded completely different behavior, showing how differently OS kernels handle raw sockets.

Testing across the public Internet got even weirder: sending HDP packets to a DigitalOcean droplet let *exactly one* packet through before every subsequent packet was silently dropped—likely due to provider firewall rules and NAT gateways that rely on TCP/UDP port numbers to track connection state. Sending from a Mac at home to an AWS EC2 instance also dropped after the first packet, whereas two AWS instances in the same region communicated over HDP without issue at latencies indistinguishable from UDP; a March 1, 2025 update showed that sending over **IPv6** (bypassing NAT entirely) worked reliably end-to-end too. The verdict: custom IP transport protocols can work in controlled environments or over IPv6, but middleboxes on the public IPv4 Internet are why modern protocols like QUIC are built on top of UDP.

## [Scoped Values in Java 24 - Inside Java Newscast #86](https://www.youtube.com/watch?v=7tfUJLUbZiM)

Inside Java Newscast #86 introduces **Scoped Values**, entering its fourth preview in Java 24 (JEP 487), which provides a safe, clean, and efficient way to share immutable data across methods within a thread and its child threads by binding values to a bounded lexical execution scope. The video contrasts Scoped Values with legacy `ThreadLocal` variables and shows how child virtual threads forked inside a `StructuredTaskScope` automatically inherit parent bindings—eliminating mutable global state and making concurrent code easier to reason about.

## [Java 24 - Better Language, Better APIs, Better Runtime](https://www.youtube.com/watch?v=2NTyzL-9Bfo)

This video rounds up the standout improvements landing across Java 22, 23, and 24 along three tracks: language features, standard library APIs, and JVM runtime performance. Highlights include unnamed patterns and variables, single-statement module imports, the finalized Foreign Function & Memory (FFM) API, Stream Gatherers, and under-the-hood runtime optimizations that make modern Java more expressive, ergonomic, and performant.

## Bonus: Interesting images from [ByteByteGo](https://bytebytego.com/)

![30 Free APIs for Developers](https://substack-post-media.s3.amazonaws.com/public/images/f112df94-df52-4140-98ec-873e5b74d988_1280x1601.gif)
![The Generative AI Learning Roadmap](https://substack-post-media.s3.amazonaws.com/public/images/c3bf4776-744b-4e87-85f8-6dddd6d85597_1280x1566.gif)
![HTTP/1 -> HTTP/2 -> HTTP/3](https://substack-post-media.s3.amazonaws.com/public/images/c1dbb32e-8d1b-4c13-ae48-fe485ad92191_1280x1601.gif)
![Structure of URL](https://substack-post-media.s3.amazonaws.com/public/images/d864f35c-537c-4571-8644-ce20d1a0caa5_1280x1427.gif)

## Bonus 2: Interesting videos from [ByteByteGo](https://bytebytego.com/)

[8 Most Important Tips for Designing Fault-Tolerant System](https://www.youtube.com/watch?v=3Lis4w4_bBc)

## Bonus 3: Interesting resources from [Redis.io](https://redis.io/)

[Cache and Message Broker for Microservices](https://redis.io/resources/cache-and-message-broker-for-microservices-solution-brief.pdf)

[Caching at Scale With Redis](https://redis.io/wp-content/uploads/2021/12/caching-at-scale-with-redis-updated-2021-12-04.pdf)

---

*This post was rewritten by Claude Code with Opus 5.5 on 27/09/2026; reviewed and edited by Codex with GPT 6.1 Sol on 09/11/2026, and re-verified by Claude Code with Sonnet 5.5 on 16/11/2026.*
