---
title: "Newsletter #75"
date: 2025-12-28
tags: ["AI-Assisted", "Newsletter", "System Design", "Microservices", "Linux", "Load Balancing", "High Availability"]
categories: ["Newsletter"]
---

*Enjoy Newsletter #75.*

## [Front-End vs. Back-End vs. System Design – What's the Difference in Interviews?](https://designgurus.substack.com/p/front-end-vs-back-end-vs-system-design)

Front-end, back-end, and system design interviews evaluate very different skill sets, so each requires its own preparation strategy. Front-end interviews revolve around the client side: HTML, CSS, JavaScript, and usually a framework like React. They place less emphasis on complex algorithms and lean more toward domain knowledge like responsive design, CSS specificity, browser rendering pipelines, asynchronous JavaScript, and load-time optimization. Back-end interviews are more traditional: LeetCode-style data structures and algorithms with complexity analysis, paired with practical knowledge of APIs, databases (SQL and NoSQL, indexing, schema design), caching, and message queues. System design interviews zoom out to the big picture, testing your ability to architect a real-world system from scratch that is scalable, reliable, and maintainable.

The author uses a house-building analogy: front-end is like interior design (how the rooms look and feel), back-end is like the structure and foundation (whether the house stands firm and utilities work properly), and system design is like the urban architect planning the entire neighborhood, deciding where houses, roads, and utilities go. To prepare for front-end interviews, build a few small projects and brush up on browser fundamentals and HTTP. For back-end, practicing algorithms and mastering database fundamentals remain the core focus.

## [Why Starting with Microservices Can Be Your Biggest Architectural Mistake](https://designgurus.substack.com/p/why-starting-with-microservices-can)

Microservices are often treated as the industry default, but starting a brand-new project with microservices is a common and costly mistake: what works for a 5,000-engineer organization is usually poison for a five-person team. The core advice is "Monolith First." A monolith's superpower is simplicity: all code lives in one place, deploys as a single unit, and function calls happen instantaneously in the same memory space. Microservices introduce three nightmares. First, networks are unreliable, turning simple function calls into distributed systems problems with retries and timeouts. Second, each service owns its own database, so you can no longer `JOIN` tables and must stitch data together in application code. Third, 10 services mean 10 build pipelines, 10 servers to monitor, and 10 places to dig through logs.

At the start of a project, you also don't yet know where the domain boundaries should be. Refactoring a monolith is just moving files between folders, whereas refactoring microservices requires changing API contracts, migrating databases, and coordinating multi-service deployments. A pragmatic middle ground is the Modular Monolith: a single codebase cleanly organized into modules like `/src/users` and `/src/orders` that still run inside a single runtime. This gives you the organizational clarity of microservices without the operational tax. Only move to microservices when the team outgrows the monolith (around 100 engineers), when individual features have vastly different scaling needs, or when you genuinely need polyglot technology stacks. Don't optimize prematurely; wait until the pain is real.

## [The Linux kernel is just a program](https://serversfor.dev/linux-inside-out/the-linux-kernel-is-just-a-program/)

This article demystifies the Linux kernel—often treated as an impenetrable "black box"—through hands-on experiments. At its core, the kernel provides an abstraction layer for using hardware conveniently and safely: a unified API for interacting with hardware, managing how programs share CPU, memory, and resources, and enforcing access control. The closest analogy is that the kernel is simply a "runtime" for your computer. On most distributions, the kernel is just a compressed file of a few megabytes named `vmlinuz-…` sitting in `/boot`.

The author copies that file out and boots it directly with QEMU; the kernel starts up in about two seconds and then panics because it cannot find a root filesystem to hand off execution to an `init` program—which is the exact expected behavior. Next, the author writes a tiny `init` program in Go, packs it into a minimal `initramfs`, and boots again. This time, the kernel runs the Go binary as PID 1. From this experiment, several core concepts click into place: a Linux distribution is just the kernel plus userland programs and configuration files; a process is a running program; a PID is a process identifier; `init` is the very first process, responsible for starting other programs; and `init` is the first program running in user space, where the kernel hands over control after initialization. This practical approach builds a clear mental model of how Linux actually works.

## [Why Your Load Balancer is the Bottleneck (and How to Fix It)](https://designgurus.substack.com/p/dont-let-your-load-balancer-crash)

Distributed systems have an ironic paradox: you add a load balancer to distribute traffic evenly across application servers, but when your product takes off, the load balancer itself becomes the bottleneck. Your application servers are healthy and your database is barely breaking a sweat, yet users complain that the site is slow or unreachable. According to the author, this is what separates junior developers from senior architects: plenty of people know how to put a load balancer in front of a service, but far fewer know what to do when the load balancer itself is the problem. The post explains why this happens and introduces five scaling strategies used by major tech companies.

Strategies covered include DNS Round Robin to split traffic right at the DNS layer, choosing between Layer 4 and Layer 7 routing to reduce processing overhead, and Direct Server Return (DSR), which lets backend servers send responses straight back to the client without passing back through the load balancer. Each approach comes with trade-offs: DNS Round Robin is simple but slow to propagate changes, Layer 4 is faster than Layer 7 but offers fewer routing features, and DSR saves massive egress bandwidth at the cost of complex network configuration. Mastering these techniques lets your load-balancing tier scale horizontally alongside your application servers instead of becoming a single point of congestion.

## [The High Availability Blueprint: Designing Systems That Never Sleep](https://designgurus.substack.com/p/the-high-availability-blueprint-designing)

High Availability (HA) is the art of building systems that "never sleep" on top of hardware that is guaranteed to fail. HA isn't just about preventing failures—it's about masking them so users never notice. Availability is measured in "nines": 99% equates to about 3.65 days of downtime per year, 99.9% is about 8.76 hours, and 99.999% ("five nines") is just over 5 minutes; every additional nine is exponentially harder and more expensive to achieve. The core philosophy is "assume everything will fail and plan for it." The biggest enemy is a Single Point of Failure (SPOF)—any component whose failure brings down the entire system—and the antidote is redundancy: duplicating critical components.

Key techniques include load balancers paired with health checks to automatically remove unhealthy servers from rotation; Leader-Follower database replication where a Follower is promoted to Leader upon failure; and failover strategies in two flavors. Active-Passive is simple but wasteful since standby servers sit idle most of the time. Active-Active utilizes all hardware continuously but is more complex, and in a two-node setup each node must be provisioned to handle 100% of the traffic if its peer goes down. Additionally, rate limiting (returning HTTP 429 when thresholds are exceeded) prevents cascading failures during traffic spikes. Achieving five nines requires geographic distribution across multiple regions to survive regional disasters. The guiding mantra: "Two is one, and one is none"—always have a backup plan.

## Bonus

### Images

![Common Network Protocols Every Engineer Should Know](https://substackcdn.com/image/fetch/$s_!ETm5!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F2112a03d-cc48-4db5-9740-94adc1a7efbf_2360x2920.png)
![8 Popular Network Protocols](https://substackcdn.com/image/fetch/$s_!5bFA!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F722913d5-a10f-44c2-98ed-edc27a92a137_1444x1882.jpeg)
![9 best practices for developing microservices](https://substackcdn.com/image/fetch/$s_!pen8!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F22fdf2d2-5ce5-4c2b-90f9-3bcfcecb5fc1_1370x1536.jpeg)

---

*This post was rewritten by Claude Code with Opus 5.5 on 27/09/2026; reviewed and edited by Codex with GPT 6.1 Sol on 09/11/2026, and re-verified by Claude Code with Sonnet 5.5 on 16/11/2026.*
