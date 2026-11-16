---
title: "Newsletter #5"
date: 2025-03-04
tags: ["AI-Assisted", "Newsletter", "Java", "Reliability", "Soft Skills", "Engineering Career", "AI Coding"]
categories: [ "Newsletter" ]
---

<i>
Hello everyone, MiTi was a bit lazy last weekend and didn't put out a post. Enjoy Newsletter #5!
</i>

## [5 Advanced Java Reflection Techniques for Dynamic Programming](https://dev.to/nithinbharathwaj/5-advanced-java-reflection-techniques-for-dynamic-programming-4ph1)

This article introduces five advanced techniques centered around Java's Reflection API, the toolkit for inspecting and modifying the structure and behavior of classes, interfaces, and objects at runtime. The first technique is accessing private members: retrieving a `Field` or `Method` via `getDeclaredField()`/`getDeclaredMethod()` and calling `setAccessible(true)` to bypass access checks—handy for testing or working with legacy code, though it breaks encapsulation (and is subject to Java 9+ module system restrictions). The second is dynamic object instantiation from a class name known only at runtime using `Class.forName()` and a matching constructor, which forms the backbone of plugin architectures in the spirit of the Open-Closed Principle. The third combines custom annotations with reflection to attach metadata to code and process it at runtime—for instance, logging every method invocation—which is how frameworks implement validation, dependency injection, and ORMs. The fourth uses `java.lang.reflect.Proxy` to create dynamic proxies for interfaces, weaving in cross-cutting concerns like logging, transaction management, or access control without modifying the target class. The fifth covers runtime bytecode manipulation with libraries like ByteBuddy (outside the standard Reflection API), generating subclasses that intercept method calls on concrete classes as well as interfaces.

While the examples illustrate how to build extensible plugins, process metadata, and layer on behaviors like logging, there are important caveats: `setAccessible(true)` is still constrained by the Java module system, so it cannot guarantee access to every private member; annotations do not intercept calls on their own unless reflective code explicitly inspects them and invokes the target method; JDK `Proxy` only works with interfaces; and the ByteBuddy example works by subclassing and intercepting overridable methods. These mechanisms are powerful when dynamic flexibility is needed, but their impact on encapsulation, maintainability, and runtime performance must be weighed carefully.

## [Mistakes You Apparently Just Have to Make Yourself](https://medium.com/@mcfunley/mistakes-you-apparently-just-have-to-make-yourself-cc2dd2bfc25c)

Dan McKinley compiles a list of mistakes he calls "non-transferable knowledge": no matter how many times seasoned engineers warn you against them, people apparently still have to touch the hot stove themselves to believe it burns. The list hits on classic industry tropes: the legacy codebase is such a mess that we have to rewrite it from scratch; our software is hard to manage, so adding operational complexity will somehow make it easier; our problem is completely novel, so we must adopt bleeding-edge technology; adding network hops will magically make the system faster; running a production system is just like maintaining an open-source project; writing a thin wrapper around a CLI tool adds real value; coding is the bulk of the work; functional tests are all the testing you need; deploying directly from version control is fine; logical separation requires physical separation; bureaucracy solves everything—or solves nothing; and if two teams use the same noun, they should share the same code.

The final item is self-deprecating: everyone thinks they are the first person to make all 13 mistakes and that the author is writing specifically about them. The post wraps up with a tongue-in-cheek plug for the author's startup, Skyliner, pitching it as a "straitjacket" to keep you from hurting yourself. For newer engineers, it's a list worth revisiting whenever you're about to make a major architectural bet.

## [Service Reliability Mathematics](https://addyosmani.com/blog/service-reliability/)

Addy Osmani argues that service reliability is too often reduced to a single uptime percentage, when reality is far more nuanced. Even with the exact same total annual downtime, a single 8-hour outage has a very different business impact than 480 one-minute blips, and five minutes of downtime during peak traffic can hurt more than an hour in the middle of the night. Each additional "nine" of availability demands exponentially more engineering effort and operational complexity: at 99.9% (about 8 hours 46 minutes of downtime per year), a single-region deployment with basic failover may suffice; reaching 99.99% typically requires multi-region active-active or automated failover; and 99.999% and beyond demands redundancy at every layer with real-time monitoring. These percentages also quietly assume that failures are uniformly distributed, independent, and immediately detected, while ignoring partial degradation and cascading failures. A service responding in 500ms instead of 5ms may still count as "up," yet be practically unusable.

Pursuing higher reliability always involves trade-offs between feature velocity and stability, infrastructure cost and redundancy, and on-call burnout for the team. Instead of blindly chasing extra nines, engineers should ask which failure modes actually hurt the business; modern practice favors error budgets, SLOs (Service Level Objectives), and user-centric telemetry to deliver dependable value while keeping engineering pace sustainable.

## ~~[How to write a good design document](https://grantslatton.com/how-to-design-document)~~

~~The article "How to Design Document" offers practical advice on writing effective design documents. According to the author, a design document is a technical report that outlines the implementation strategy for a system within the context of trade-offs and constraints. Its primary goal is to convince the reader (and most importantly, the author themselves) that the proposed design is optimal given the current situation.~~

~~The author compares writing a design document to writing a mathematical proof. To achieve maximum effectiveness, it requires strong organization, much like organizing code. Writers should avoid creating "spaghetti design docs" by ensuring every sentence connects logically and is easy to follow. The goal is to never surprise the reader, making the solution feel obvious even when it required complex thinking to reach.~~

~~The post also emphasizes the importance of understanding the reader's mindset and anticipating potential objections. Furthermore, writers should edit ruthlessly to remove unnecessary words, because the reader's attention is a scarce resource. The author encourages practicing by critiquing other documents and distilling complex ideas into concise tweets.~~

~~Finally, the article suggests structuring documents into bullet points that can each be summarized in a single sentence and using footnotes for complex tangents so they don't disrupt the main flow of the document.~~

## [Picking your battles when you are hyper-rational](https://newsletter.weskao.com/p/picking-your-battles-hyper-rational)

Wes Kao highlights a common habit among hyper-rational people: getting so caught up in proving they are "technically correct" that they sacrifice practical effectiveness—winning a minor skirmish while losing the war. She illustrates this with two emails she almost sent. In the first example, a recruiter asked to chat "this morning" when it was already nearly 1:00 PM in Wes's time zone; instead of lecturing on all the ways "this morning" could be interpreted across time zones, she simply confirmed the time zone and offered a few open slots to lock in the meeting quickly. In the second, a client's finance team told her she didn't need to fill out a vendor onboarding form even though their own billing system had just emailed her demanding it; she nearly wrote a multi-paragraph explanation defending why she had asked, but caught herself and sent a one-line "thanks for clarifying."

The lesson is to resist the urge to prove you noticed every nuance or to nitpick someone else's phrasing, which wastes time and makes you look difficult to work with. Before sending a corrective explanation, ask yourself: does this move us closer to the goal, does it actually help the recipient or just prove I'm right about an irrelevant detail, and am I serving the conversation or my own ego? There are times when clarifying a misunderstanding matters, of course, but on the small stuff, it's almost always better to let it go and stay focused on the main objective.

## [Measuring Programmer Influence, Kinda Sorta](https://tidyfirst.substack.com/p/measuring-programmer-influence-kinda)

Kent Beck asks whether data can tell us who contributes the most on a large engineering team. His blunt answer is no—not if you want certainty—though data can hint at where influence lives. He opens with a clear warning: the first time you tie bonuses, promotions, or layoffs to these metrics is the last time they will ever be trustworthy. Analyzing the Git history of the React repository, he observes that both the number of files created per author and the number of times each file is modified follow a Pareto distribution: most contributors create only a single file, while a small handful create hundreds or thousands. Plotting those two dimensions together—files an author created versus how often other people later modified those files—reveals a clear trend line; the engineers in the upper-right corner, who create foundations that others keep building upon, are strong candidates for high-influence contributors.

Used well, this kind of analysis helps engineers calibrate themselves against peers, find mentors to learn from, and spot people whose real-world impact exceeds their formal title. Used poorly, it gets weaponized for compensation, quotas, promotions, or stack ranking. The data has obvious blind spots too: many vital contributions never show up in commit graphs, and long-tenured team members naturally accumulate higher numbers. The takeaway: never lose sight of the real goal—making a meaningful impact—and always sanity-check your results, because programming with data is still programming.

## [Building personal software with Claude](https://blog.nelhage.com/post/personal-software-with-claude/)

Nelson Elhage recounts using Claude to port a bottleneck in Emacs's `obsidian.el` package to Rust, speeding it up by more than 1,000x (in one specific benchmark, dropping from 90 seconds to roughly 15ms) while barely writing a line of code himself. The culprit was `obsidian-update`, which rescanned his entire note vault in Emacs Lisp and had grown painfully slow. With a single prompt, Claude read roughly 1,000 lines of Elisp, identified the ~200 relevant lines, and wrote a Rust program to extract the note metadata as JSON; the generated Rust code compiled and worked on the first try. Next, Claude wrote the Elisp glue using Emacs's `advice` mechanism to patch `obsidian.el`, hitting only one minor bug that was fixed in minutes. The entire project took a single afternoon. Even though Elhage works at Anthropic, he had previously thought of Claude mostly as a better Stack Overflow.

Reflecting on the experience, he draws several conclusions. First, the tooling and UX around LLMs are still lagging behind the raw capabilities of the models themselves. Second, he noticed that he naturally decomposed the problem along clean, easily testable interface boundaries: the human handles system decomposition, while Claude fills in the "meat" in between. Most importantly, while code is now cheaper than ever to produce, deep understanding, architecture, and good design are only becoming more valuable; writing "easy-to-delete" code may matter even more when an LLM can regenerate an implementation from scratch on demand. Above all, he rediscovered the joy of building small personal tools now that Claude can shoulder the tedious parts.

## Bonus: Interesting images from [ByteByteGo](https://bytebytego.com/)

![Git vs GitHub](https://substack-post-media.s3.amazonaws.com/public/images/1112c07d-db40-484e-917b-0071ed7cf354_1280x1532.gif)
![A Cheatsheet on Database Performance](https://substack-post-media.s3.amazonaws.com/public/images/5fd8bdda-52dd-454f-be79-ad548f17810b_1280x1557.gif)
![18 Common Ports Worth Knowing](https://substack-post-media.s3.amazonaws.com/public/images/35ae3f82-afa0-47b9-a2a0-58b6c6d8cfb1_1280x1476.gif)

---

*This post was rewritten by Claude Code with Opus 5.5 on 27/09/2026; reviewed and edited by Codex with GPT 6.1 Sol on 09/11/2026, and re-verified by Claude Code with Sonnet 5.5 on 16/11/2026.*
