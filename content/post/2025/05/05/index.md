---
title: "Newsletter #18"
date: 2025-05-05
tags: [ "AI-Assisted", "Git", "UI Design", "Java", "Distributed Locking", "Markdown", "AI Coding" ]
categories: [ "Newsletter" ]
---

*Enjoy Newsletter #18.*

## [No Longer My Favorite Git Commit](https://mtlynch.io/no-longer-my-favorite-git-commit/)

Michael Lynch revisits the commit famously praised by David Thompson in "My favourite Git commit": a six-paragraph commit message with five code snippets that painstakingly narrates a debugging journey just to explain replacing a single whitespace character. Lynch acknowledges that the message is valuable for searchability and for showing how the author investigated the bug, but points out three flaws: the most important takeaway is buried at the very end, the root cause is never clearly explained, and references to external source code lack links or commit hashes so readers cannot reproduce the trail. Digging into it himself, Lynch discovered the culprit was a UTF-8 non-breaking space that had accidentally slipped into a `routes.conf.erb` template while Ruby 1.9.3 defaulted to reading files as US-ASCII, causing the test suite to fail.

From there, he rewrites the commit message using journalism's "inverted pyramid" style: opening with a concise summary of the change, followed by the root cause and fix, and only then a "How I discovered this" section containing most of the original narrative, complete with a link to the commit that introduced the stray character. The lesson for junior developers: technical context is worth keeping, but structure your commit messages so anyone scanning the commit log immediately understands what changed and why.

## [Our interfaces have lost their senses](https://wattenberger.com/thoughts/our-interfaces-have-lost-their-senses)

Amelia Wattenberger argues that digital interfaces have grown increasingly flat and sensory-deprived. Early computing was a full-body experience of punch cards, patch cables, and switches; then came command lines, graphical interfaces with skeuomorphic buttons, and finally touchscreens where everything sits behind a sheet of glass. With the wave of AI chatbots, we have lost even texture, color, and shape: whether editing a photo, tweaking settings, or learning a subject, everything is reduced to a single text input box. She notes that removing all friction also strips away meaning: doomscrolling social media is effortless, but kneading dough, playing an instrument, or sketching is what brings real satisfaction. In her words, we have turned painting into typing, when we should have made typing feel more like painting.

Her proposed direction is designing interfaces that fit the human body: computers can respond through text, rich visuals, sound, and haptics, while humans can provide input via keyboards, drag-and-drop, touch gestures, body movement, and voice. The real power lies in combining multiple modalities at once, such as speaking while pointing and clicking. She envisions future interfaces where we collaborate on tangible artifacts rather than just chat histories, use multiple modalities simultaneously, and have tools respond to ambient context—illustrated by an experimental prototype that automatically organizes a user's thoughts into visual cards as they speak or type.

## [Labeled Breaks in Java: Useful Tool or Code Smell?](https://www.baeldung.com/java-labeled-break)

Leo Helfferich's article on Baeldung examines labeled `break` and `continue` statements in Java, a feature present since Java 1.0 and largely unchanged since. Unlike an unlabeled `break`, which only exits the innermost loop, a labeled break jumps straight out of a named outer loop—for instance, `break outer;` in the snippet below terminates both nested loops at once. The advantage is efficiency: when searching through nested collections, you can stop immediately upon finding a match without extra flag variables or auxiliary conditions, while explicitly controlling which loop terminates in deeply nested structures.

```java
outer: // <-- label
for (int i = 0; i < 5; i++) {
    for (int j = 0; j < 5; j++) {
        println(i + ", " + j);
        if (j == 2) {
            break outer; // exit the outer loop
        }
    }
}
```

On the flip side, labels can easily make code read like `GOTO` statements and confuse maintainers, especially with arbitrary label names like `x:`; modifying a labeled loop in a large codebase can also subtly break dependent logic. The author suggests clearer alternatives such as extracting loop logic into a separate method or using the Stream API with `flatMap` and `anyMatch`. The post also compares Java's syntax with Kotlin (`outer@` and `break@outer`) and JavaScript (nearly identical to Java), concluding that labeled breaks should remain a niche tool for rare, complex scenarios where they don't hurt readability.

## [Distributed Locking: A Practical Guide](https://www.architecture-weekly.com/p/distributed-locking-a-practical-guide)

Oskar Dudycz explains distributed locking—the mechanism ensuring only one process operates on a shared resource at a time when an application runs across multiple machines or microservices. It is needed when multiple processes update the same record, when messages may be delivered more than once, or when scheduled jobs run across multiple nodes. The basic flow is simple: a node requests a lock from a lock manager, acquires it if free, performs its critical work, and releases it; if the node crashes, a TTL or ephemeral node automatically clears the lock to prevent "zombie" locks. Dudycz compares four common options: Redis with `SET ... NX EX`, which is simple and fast but risky during network partitions; ZooKeeper/etcd, which offer strong consistency via quorum consensus at the cost of heavier operations; database locks like `SELECT ... FOR UPDATE` or PostgreSQL advisory locks, which are convenient when you already have a single database but harder to scale; and running a single replica on Kubernetes, which avoids locking altogether but sacrifices scalability, high availability, and can still briefly run two pods during rollouts.

The article also covers pitfalls like deadlocks, lock contention, single points of failure, clock skew, and network partitions. Crucially, a TTL only prevents a lock from staying stuck forever: an expired lock does not stop the original process from continuing its work, so you still have to account for long pauses or lost connections. His closing advice: avoid distributed locks if you can, use them sparingly since excessive locking kills parallelism, pick a tool that fits your existing infrastructure, and always plan for failures with time-bounded locks.

## [If it is worth keeping, save it in Markdown](https://p.migdal.pl/blog/2025/02/markdown-saves)

Piotr Migdał opens with an uncomfortable truth: content posted online eventually disappears. Links rot when websites restructure, platforms shut down or lock posts behind logins and paywalls, and even self-hosted sites vanish due to forgotten domain renewals or botched database upgrades. The most durable solution, he argues, is UTF-8 plain text in Markdown format: any computer can read it without proprietary software, and Markdown's deliberate lack of fine-grained styling control is actually a strength under the "rule of least power." He uses Obsidian for personal notes and a static site generator for his blog—both store plain Markdown files, making sharing and platform migrations effortless.

His workflow is pragmatic: whenever he comes across something worth keeping, he copies it into a Markdown file with YAML frontmatter recording the publication date, source, and tags; whenever he catches himself searching for something a second time, he saves it immediately, because anything worth looking up twice is worth keeping forever. His toolkit includes `pandoc` for format conversion, specialized exporters for Medium or Reddit, AI for extracting text from PDFs, and Git for versioning and backups. He also periodically exports data archives from services he uses, even before converting them into Markdown.

## [The Software Engineering Identity Crisis](https://annievella.com/posts/the-software-engineering-identity-crisis/)

Annie Vella examines the identity crisis facing software engineers in the age of AI. Many developers entered the field for the joy of building things with their own hands—tracking down an elusive bug or optimizing a slow algorithm—but AI coding assistants are turning them from creators into orchestrators, from builders into supervisors. The shift is already underway: Google reports that AI generates more than a quarter of its new code, and Y Combinator's CEO noted that roughly a quarter of a recent batch had 95% of their code written by AI. Andrej Karpathy's concept of "vibe coding," which focuses on the "what" rather than the "how," raises an existential question: are we still engineers if we forget the code exists? Vella relates this to her own reluctant transition into engineering management, while citing GitClear research showing sharp rises in copy-pasted and churned code, alongside studies showing that trust in AI often starts high before dropping sharply with experience.

Still, the piece is not pessimistic. Like artisans during the Industrial Revolution, engineers can adapt, and durable skills such as communication, systems thinking, and navigating ambiguity are becoming even more valuable. Vella proposes a pendulum metaphor: swinging intentionally between writing code directly, orchestrating AI, and blending both. In her view, AI isn't taking the job away so much as giving engineers a chance to reclaim parts of the role that were gradually carved off to other specialists—from understanding user needs and business impact to system design and operations.

## [Revenge of the junior developer](https://sourcegraph.com/blog/revenge-of-the-junior-developer)

Sourcegraph's Steve Yegge argues that software development is passing through six overlapping waves: traditional programming (2022), completions-based coding (2023), chat-based coding (2024), coding agents (first half of 2025), agent clusters (second half of 2025), and agent fleets (2026). In his view, "vibe coding" means letting an LLM write code, feeding the results back in, and iterating in a continuous loop—a workflow that will persist across all these waves. Coding agents like Claude Code or Aider can already read tickets, track down bugs, propose fixes, and write tests, though they still need tasks broken down into small pieces and close supervision. He estimates a single agent costs roughly $10–$12 per hour, meaning companies should budget significantly more LLM spend per developer as engineers start running multiple agents in parallel.

The "revenge" comes at the end: contrary to his earlier essay "The Death of the Junior Developer," junior developers are adopting AI far faster than many senior developers, who often resist because they are heavily invested in the status quo and view learning from scratch as a loss of status. His message is blunt: it's not that AI has to prove it's better than you—you have to become better with AI. By the end of the year, he predicts software engineering will involve much less manual coding and much more supervising agents, so adapt as early as possible; and if you don't know where to start, ask a junior developer.

## Bonus: Interesting images from [ByteByteGo](https://bytebytego.com/)

![How does SSO Work?](https://substack-post-media.s3.amazonaws.com/public/images/111cec1b-a195-4ff5-963c-714ceecd01ab_1280x1664.gif)
![How Java Virtual Threads Work?](https://substack-post-media.s3.amazonaws.com/public/images/b415d54d-0dbd-428d-a09c-3de0332c0f71_1280x1502.gif)
![Memcached vs Redis](https://substack-post-media.s3.amazonaws.com/public/images/8ef255cc-ebbb-4710-9faf-f366274a2bef_1280x1373.gif)
![The Shopify Tech Stack](https://substack-post-media.s3.amazonaws.com/public/images/2370fff4-b515-484e-a081-4ce73b2c62c2_1280x1566.gif)

## Bonus 2: Interesting videos from [ByteByteGo](https://bytebytego.com/)

[What Are AI Agents Really About?](https://www.youtube.com/watch?v=eHEHE2fpnWQ)

---

*This post was rewritten by Claude Code with Opus 5.5 on 27/09/2026; reviewed and edited by Codex with GPT 6.1 Sol on 09/11/2026, and re-verified by Claude Code with Sonnet 5.5 on 16/11/2026.*
