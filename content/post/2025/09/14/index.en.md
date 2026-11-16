---
title: "Newsletter #55"
date: 2025-09-14
tags: ["AI-Assisted", "Performance", "CPU", "Durable-Queues", "Cognitive-Load", "Claude Code", "Hiring"]
categories: ["Newsletter"]
---

*Enjoy Newsletter #55.*

## [%CPU Utilization Is A Lie](https://www.brendanlong.com/cpu-utilization-is-a-lie.html)

Brendan Long shows that the `%CPU` utilization metric reported by operating systems systematically understates how close a CPU actually is to saturation. He ran `stress-ng` on a Ryzen 9 5900X (12 cores, 24 threads, with Precision Boost Overdrive enabled), sweeping load from 1% to 100% and worker counts from 1 to 24 while measuring completed operations. The results show that when the OS reports 50% CPU utilization, a general-purpose CPU workload is already at roughly 62% of its maximum throughput, 64-bit integer math is at 65–85%, matrix multiplication is at 80–100%, and an Nginx benchmark is already serving about 80% of the maximum requests per second the machine can handle.

The two culprits are SMT (Hyper-Threading) and turbo clock scaling. Once active workers exceed the 12 physical cores, logical threads contend for the same core execution units so throughput stops scaling linearly; at the same time, clock speeds drop by roughly 15% when many cores are busy at once, meaning the fraction of time logical cores are busy does not equal the fraction of peak capacity used. Rather than relying on `%CPU` to estimate headroom, the author recommends load-testing each service to find the maximum throughput a host can sustain before errors or unacceptable latency appear, tracking current real-world throughput, and comparing those two numbers directly. A practical lesson for anyone working in SRE, systems operations, or capacity planning.

## [We only hire the trendiest](https://danluu.com/programmer-moneyball/)

Dan Luu examines a pervasive hiring habit in tech: companies chase candidates with "trendy" résumés—elite university degrees or brand-name employers—rather than evaluating actual engineering ability. He tells the story of Mike, an engineer with 11 years of experience laid off from Microsoft who was repeatedly rejected by an anonymized company called TrendCo for three stated reasons: irrelevant tech stack experience (because he wrote .NET), a "scattered" background, and past contract work. According to Luu, those were rationalizations; TrendCo's typical engineer was young, relatively inexperienced, and straight out of a top-tier university, so the company unconsciously filtered for people who looked like its existing staff.
As a result, companies end up bidding against each other for a tiny pool of credentialed candidates at top-of-market compensation while passing over strong engineers. Drawing on Billy Beane's *Moneyball* strategy in baseball, Luu argues that organizations should look for engineers who are undervalued by the market yet deliver strong results—an idea widely discussed in theory but rarely practiced. His prescription includes Moneyball-style hiring, investing seriously in onboarding and mentorship, and building better internal tools and processes so engineers can succeed regardless of pedigree. A worthwhile read for both hiring managers and job seekers.

## [How I solved a distributed queue problem after 15 years](https://www.dbos.dev/blog/durable-queues)

Jeremy Edberg, formerly in charge of infrastructure at Reddit, revisits a problem that haunted him for years: Reddit relied on distributed RabbitMQ task queues to process almost every user action—such as upvotes—before writing to the database. The architecture scaled well but had a painful flaw: if a worker process crashed after dequeuing a message but before finishing execution, that task was lost forever, taking votes, comments, or posts with it. (While RabbitMQ does support manual acknowledgments to redeliver unacknowledged messages, applications still have to handle side effects and idempotency themselves.)

The solution he found at DBOS is a durable queue, which combines a task queue with durable workflow execution to reliably orchestrate parallel tasks. Instead of using an in-memory broker like Redis, it uses a persistent relational database—typically PostgreSQL—as both the message broker and the state store. Every task is recorded alongside its inputs, and child tasks are tracked as children of their parent workflow, so after a crash the system resumes from the last completed step rather than starting over. This design also makes it straightforward to enforce concurrency limits, respect third-party API rate limits, and query the full execution history with standard SQL for monitoring and debugging. The main trade-off is raw throughput: Redis-backed queues handle higher message volume, while durable queues shine for lower-volume, high-value business workflows where losing a task is unacceptable.

## [Cognitive load is what matters](https://minds.md/zakirullin/cognitive)

Artem Zakirullin argues that beneath all the industry buzzwords and "best practices," what truly matters in software design is cognitive load: the amount of mental effort a developer must expend to understand and modify code. Human working memory can hold only about four chunks of information at once—such as variable values, control-flow branches, or call-stack hops; cross that threshold and comprehension drops sharply. Intrinsic cognitive load comes from the inherent difficulty of the domain and cannot be removed, whereas extraneous cognitive load is self-inflicted by how the code is structured and can be drastically reduced.

Examples of extraneous load include deeply nested `if` statements (better replaced with well-named intermediate variables or early returns), deep inheritance hierarchies, proliferating shallow modules whose complex interfaces outweigh their tiny implementations, microservices split so finely they become a "distributed monolith," overzealous DRY abstractions that couple unrelated domains ("a little copying is better than a little dependency"), heavy reliance on framework "magic," and multi-layered architectures that force readers to trace through half a dozen indirections. Even numeric HTTP status codes force readers to do mental lookups, whereas self-describing error codes like `"jwt_has_expired"` convey intent immediately (supplementing rather than replacing the HTTP status). Prefer deep modules: powerful functionality hidden behind a simple interface, like Unix's five basic I/O system calls. The bottom line is that simplicity beats cleverness: good code is code where a newcomer can understand the system and ship a meaningful change within a few hours.

## [Claude Code Framework Wars](https://shmck.substack.com/p/claude-code-framework-wars)

Shawn argues that developers should stop treating Claude as a chat box and start wrapping it in a structured framework: let Claude handle code generation while humans move up the stack to project management, system design, and architecture. Real leverage comes not from clever ad-hoc prompts, but from explicit rules, workflows, and curated context.

The article maps out eight design decisions involved in building a Claude Code workflow: where work items live (markdown backlogs, structured specs, or issue trackers); how to steer the model via command libraries, coding standards, and verification hooks; how to orchestrate multiple specialized agents; how to run parallel sessions safely using Git worktrees or containers; how to connect Claude to databases, test runners, and external services via MCP; which roles to assign Claude (PM, architect, implementer, QA); the granularity of handoffs, from small pull requests to full application scaffolds; and how to preserve long-term project memory in documentation. It also surveys notable open-source frameworks in this space, including Agent OS, Backlog.md, Claude-Flow, Symphony, Roo Commander, and Claudable. The takeaway is that AI performs best inside rigid guardrails; these frameworks are converging on a future where AI is less a magic black box and more a team of junior developers you manage—and the more structure you invest up front, the better the results.

## [The Last Programmers](https://www.xipu.li/posts/the-last-programmers)

Xipu Li suggests that we may be the last generation of programmers who manually translate ideas into source code line by line. He left the Amazon Q Developer team in May to join the startup Icon, frustrated by Amazon's slow pace, lack of product vision, and obsession with internal metrics over user experience. At Icon, one of his coworkers barely touches source code at all: he writes plain-English design docs, spins up Claude Code across multiple terminal windows in parallel, and spends most of his day reviewing the output. Inside the team, two camps have emerged: the experimenters who constantly push to eliminate manual coding with AI tools, and the "gatekeepers" who insist that deep code-level understanding remains non-negotiable. The gatekeepers still catch real AI bugs today, the author notes, but the technology is improving faster than their gatekeeping can keep up.

He compares software to chocolate: once manufacturing becomes standardized and commoditized, anyone can make chocolate, and competition shifts to branding, distribution, and consumer psychology. As technical implementation becomes a commodity, the three things that retain lasting value are understanding real human needs through behavior rather than surveys, having the taste to know what to build and what not to build, and distribution—getting the product into the right hands. Newcomers should still learn how to program, he advises, but shouldn't treat coding as their only skill. What has always mattered most is understanding people, building what they actually want, and getting it to them; everything else is just an implementation detail.

## Bonus: Cool diagrams from [ByteByteGo](https://bytebytego.com/)

![A Guide to Rate Limiting Strategies](https://substack-post-media.s3.amazonaws.com/public/images/c8da4839-d519-43a9-bffb-2c81a2c153f4_2250x2624.png)
![9 Docker Best Practices You Should Know](https://substack-post-media.s3.amazonaws.com/public/images/94510aef-adee-4c78-84cf-05dfe5f9d6c0_3000x3900.png)
![Where Do We Cache Data?](https://substack-post-media.s3.amazonaws.com/public/images/a5e59510-28d9-423e-bdc4-986d24e58f91_2808x4096.jpeg)

## Bonus: Interesting videos

[All New Java Language Features Since Java 21 #RoadTo25](https://www.youtube.com/watch?v=X0-TGhktFnE)

---

*This post was rewritten by Claude Code with Opus 5.5 on 27/09/2026; reviewed and edited by Codex with GPT 6.1 Sol on 09/11/2026, and re-verified by Claude Code with Sonnet 5.5 on 16/11/2026.*
