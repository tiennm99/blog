---
title: "Newsletter #52"
date: 2025-09-07
tags: [ "AI-Assisted", "Java", "Design-Patterns", "Security", "LLM", "Complexity", "Work-Life-Balance" ]
categories: [ "Newsletter" ]
---

*Enjoy Newsletter #52.*

## [Traps to Developers](https://qouteall.fun/qouteall-blog/2025/Traps%20to%20Developers)

This compilation by qouteall is an extensive reference list of programming "traps": unintuitive behaviors that are easy to misunderstand and usually only reveal themselves after causing a bug. Organized by topic, it opens with HTML and CSS gotchas such as `min-width: auto` in flexbox or grid preventing elements from shrinking, margin collapse, stacking contexts scoping `z-index` unexpectedly, and `100vh` on mobile browsers exceeding the actual visible viewport. Next come Unicode and text processing, floating-point pitfalls involving `NaN`, infinity, and rounding errors, and time-handling traps.

Later sections cover specific languages and platforms: Java, Go, C/C++, Python, Rust, SQL databases, concurrency and parallelism, transitive dependency conflicts, Linux and bash, backend engineering, React, Git, networking, locales, regular expressions, and the Microsoft ecosystem. Each entry is just a few lines long with reference links, making the post ideal to skim once and bookmark for future debugging sessions. For newer developers, it is a fast way to learn common "looks right, but isn't" pitfalls without paying for each one in hours of debugging.

## [Active Record vs. Repository Pattern](https://javabulletin.substack.com/p/active-record-vs-repository-pattern)

Suraj Mishra compares two popular data-access design patterns in object-oriented programming. With Active Record, each class maps directly to a database table, each object corresponds to a row, and the model itself holds CRUD methods like `find` or `save`, as popularized by Ruby on Rails. This approach is easy to pick up, minimizes boilerplate through "convention over configuration," and speeds up development for straightforward applications, but tightly couples domain models to the database schema, violates the Single Responsibility Principle, and easily grows unwieldy as business logic becomes complex.

The Repository pattern separates data-access logic from business logic behind a collection-like interface; in Spring Data JPA, this typically takes the form of an interface extending `JpaRepository` injected into a service class. Unit testing becomes much easier because the repository can be mocked, and swapping out the underlying data store—say, from a relational database to NoSQL—has minimal impact on business logic. The trade-off is an extra layer of abstraction, added ceremony, and slower initial setup. The author concludes that Active Record suits smaller apps with simple domain logic, while the Repository pattern shines when maintainability, scalability, and testability are top priorities.

## [Thread.sleep(0) is not for free](https://mlangc.github.io/java/performance/2025/08/14/thread-sleep0-is-not-for-free.html)

This short post debunks a common misconception: calling `Thread.sleep(0)` in Java is not "free." Although the official specification allows an implementation shortcut that merely checks interrupt status when the sleep duration is zero, HotSpot's actual implementation crosses into native code and calls `os::naked_yield()`—which on Linux invokes `sched_yield()`, a system call whose own man page warns against unnecessary use because it triggers costly context switches. In the author's JMH benchmarks, each call costs roughly as much as generating 128 random bytes, and performs worst right when the CPU is under heavy contention: with 20 threads, throughput with `Thread.sleep(0)` drops below that of a single thread.

Therefore, if your code uses `sleep` to back off on errors or overload, don't pass a delay of `0` into `Thread.sleep` like the first snippet below; instead, guard the call so it only sleeps when an actual delay is needed, as in the second snippet. The author also points out that `TimeUnit.sleep` documents an explicit no-op for zero or negative durations, and if you genuinely want to yield the CPU, calling `Thread.yield()` directly states that intent much more clearly.

```java
int delay = allGood ? 0 : waitShorty;
Thread.sleep(delay);
```

```java
if (!allGood) {
    Thread.sleep(waitShortly);
}
```

## [Why do video games use kernel-mode anti-cheats?](https://malwaresourcecode.com/home/my-projects/write-ups/why-do-video-games-use-kernel-mode-anti-cheats)

This article addresses the widespread fear around kernel-mode anti-cheat software. On Windows, the operating system is split into user mode and kernel mode, with the kernel acting as the "manager" sitting between software and hardware via drivers. Today, getting a driver into the kernel requires Microsoft vetting and digital signing (Driver Signature Enforcement), while PatchGuard prevents drivers from modifying core kernel structures, and vulnerable drivers can be added to a blocklist. Anti-cheat systems need kernel access because only in kernel mode can they register callbacks—via `PsSetCreateProcessNotifyRoutine`—to be notified the moment a process is created, the exact same mechanism used by antivirus and EDR solutions. Newly launched processes are then inspected using static analysis (scanning for known cheat byte signatures) and behavioral analysis such as code-integrity checks, ETW, API hooking, or filesystem minifilters.

On privacy concerns, the author argues that most fears stem from misconceptions: malicious Microsoft-signed kernel drivers are exceedingly rare, roughly 99.9% of modern malware runs in user mode because attackers need very few privileges to steal user data, and using a kernel driver just to "spy" on gamers would be massive overkill. Choosing not to trust kernel-mode anti-cheat ultimately comes down to your personal threat model, the author concludes, but that choice shouldn't be based on misinformation.

## [Why LLMs Can't Really Build Software](https://zed.dev/blog/why-llms-cant-build-software)

Conrad Irwin (Zed) draws on his interviewing experience to observe that strong software engineers continuously run a three-part loop: build a mental model of the requirements, write code, build a mental model of what the code actually does, and resolve discrepancies by updating either the code or the requirements. LLMs write code reasonably well and can read files, run tests, and add logging, but they fail to maintain a coherent mental model: they assume the code they just wrote is correct, guess randomly between fixing the code or changing the test when a test fails, and wipe everything to start over when stuck. The root cause is that models are bad at recognizing missing context, heavily bias toward the most recent tokens in the context window, and hallucinate details—whereas humans know how to set outer context aside to debug an isolated subproblem before zooming back out to the big picture.

Even so, the author acknowledges that LLMs are genuinely useful: they generate code quickly, synthesize requirements and documentation well, and can handle simple tasks end to end. For anything non-trivial, however, they cannot yet hold enough accurate context to iterate their way to a working solution. Engineers remain responsible for ensuring requirements are clear and that the code actually does what it claims; at Zed, humans stay in the driver's seat, and LLMs are simply another tool in their hands.

## [The Java Type System is Broken](https://wouter.coekaerts.be/2018/java-type-system-broken)

In this 2018 post, Wouter Coekaerts demonstrates type-system loopholes tested against JDK 10. Some holes in Java's type system are intentional for backward compatibility—such as raw types or unchecked casts, which can cause "heap pollution" where a parameterized type holds an object of the wrong type—but those always trigger compiler warnings. The author instead hunts for constructs that the compiler accepts as completely type-safe without a single warning, yet still throw a `ClassCastException` at runtime on a line with no explicit cast. After introducing wildcards and capture conversion, the post walks through how lambdas, local inner classes, inner classes inside generic classes, type-variable bound checks, and outer type variables used as bounds for inner classes can all subvert type safety, along with two "honorable mentions" involving unboxing in lambdas and `TreeSet`.

The author also uncovered several previously reported bugs along the same lines and filed new bug reports against the JDK. In his view, these edge cases pose no security risk and are unlikely to bite developers by accident, but they serve as a reminder that Java's generics are fragile under the hood and compiler warnings should not be ignored. The post wraps up with the motto "everything is broken, everything is fine," alongside a call to give the type system some much-needed care after years of strain from backward compatibility and new language features.

## [The Pragmatic Engineer 2025 Survey: What's in your tech stack? Part 2](https://newsletter.pragmaticengineer.com/p/the-pragmatic-engineer-2025-survey-part-2)

Part 2 of The Pragmatic Engineer's April–May 2025 reader survey, drawing on roughly 3,000 responses, examines the tools software engineers use for project management, communication, collaboration, data storage, and backend infrastructure. JIRA still leads project management despite being voted the most disliked tool in Part 1, Linear is rising fast as a serious challenger, and Azure DevOps is surprisingly widespread. In communication, Slack dominates team chat, Microsoft Teams leads video calls, Confluence is the most common documentation tool, and Figma dominates design. PostgreSQL is the most frequently mentioned database out of 35 contenders, followed by MySQL, Redis, and MongoDB, while backend infrastructure centers on AWS services, Docker, Kubernetes, and Terraform.

The author highlights several practical takeaways: project tracking is an integral part of an engineer's job, with issue trackers mentioned nearly as often as IDEs; it is hard to go wrong choosing PostgreSQL, making the pragmatic question "what stops us from using Postgres?"; and Kubernetes is worth learning even if you don't use it yet, as a quarter of respondents already run it in production. Finally, Redis and Terraform moving away from open-source licenses appears not to have dented their popularity despite open-source forks, while Amazon-backed OpenSearch has reached roughly 25% of Elasticsearch's adoption.

## [Why do software developers love complexity?](https://kyrylo.org/software/2025/08/21/why-do-software-developers-love-complexity.html)

Kyrylo Silin asks why software developers remain drawn to complexity even though everyone knows the KISS principle (Keep It Simple, Stupid). Part of the answer is marketing: nobody gets excited about a plain replacement for `cat`, whereas a feature-packed "catzilla" promoted everywhere sparks curiosity. Complexity also quietly signals effort, expertise, and exclusivity, turning into a status symbol rather than a response to real needs. Like ancient pyramids, modern software stacks dependencies, frameworks, and layers of abstraction sky-high while sometimes remaining hollow inside; as the author puts it, "Complexity screams: 'Look at me!' Simplicity whispers: 'Did you notice?'" His favorite example is React versus vanilla JavaScript.

Beyond marketing, the article identifies four internal drivers: the intellectual thrill of solving a hard puzzle, legacy systems and technical debt that make bolting on patches easier than simplifying, large teams where everyone adds "just in case" abstractions, and pressure to innovate to stand out. His closing advice: if you must build a pyramid, build it with purpose, on a solid foundation, with real value inside; before writing 500 lines of abstraction for something that takes 50 lines of direct code, ask whether you are solving a real problem for users and maintainers or just indulging yourself.

## [The Important Things in Life](https://hamvocke.com/blog/important-things/)

Ham Vocke explains why his blog has been quiet lately: his spring and summer were filled with the things that make life sweet, leaving no time for writing posts or tinkering on side projects—and he wouldn't change a thing. His job at a growing startup still demands hard work and helps him learn and grow, but the day-to-day challenges, frustrations, and wins at work rarely stick in memory for long. What stays with him are the moments away from the screen: attending weddings and milestone celebrations with friends of over 25 years, going to his first music festival in 20 years, weekend barbecues with friends, visiting a brother after years apart, spending time with his parents as they prepare for retirement, and a weekend getaway with his wife taking in the scenery of southern Germany.

It is a short piece, but a worthwhile reminder for people in tech about work-life balance, closing with simple advice: "Hug your friends, call your family, go outside, and make some memories."

## Bonus: Cool diagrams from [ByteByteGo](https://bytebytego.com/)

![How Does SSO Work?](https://substack-post-media.s3.amazonaws.com/public/images/4bf62d5c-e538-4fba-8d4f-aa00d0bd064a_3000x3900.png)
![Best Practices in API Design](https://substack-post-media.s3.amazonaws.com/public/images/e249b1bd-134e-4242-ac16-1d50daf804d3_3000x3900.png)
![Top Strategies For Reliability and Fault Tolerance](https://substack-post-media.s3.amazonaws.com/public/images/82b8257a-93c3-4861-b211-88d57b12bc93_2250x2624.png)

## Bonus: Interesting videos

[Vibes won't cut it — Chris Kelly, Augment Code](https://www.youtube.com/watch?v=Dc3qOA9WOnE)
[these coding blogs will make you a better programmer](https://www.youtube.com/watch?v=Z3fwe6AAgaM)

## Bonus: Interesting repositories

[Computer science foundation/ Interview preparation/ Junior to Senior Developer](https://github.com/bansalankit92/java-spring-fullstack-interview-question-answers)

## Bonus: Interesting books

[Java interview questions and answers - Boosting your java career](https://enos.itcollege.ee/~jpoial/allalaadimised/reading/Java-Interview-Questions.pdf)

~~[Java Puzzlers - Traps, Pitfalls, and Corner Cases](https://github.com/shannonasmith/Java_books/blob/main/Java%20Puzzlers%20-%20Traps%2C%20Pitfalls%2C%20and%20Corner%20Cases%20(2005).pdf)~~

---

*This post was rewritten by Claude Code with Opus 5.5 on 27/09/2026; reviewed and edited by Codex with GPT 6.1 Sol on 09/11/2026, and re-verified by Claude Code with Sonnet 5.5 on 16/11/2026.*
