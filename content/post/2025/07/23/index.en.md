---
title: "Newsletter #34"
date: 2025-07-23
tags: [ "AI-Assisted", "TDD", "Java", "System Design", "Performance", "Career", "AI Coding" ]
categories: [ "Newsletter" ]
---

*Enjoy Newsletter #34.*

## [Why TDD Doesn't Lead to Dumb Code](https://tidyfirst.substack.com/p/why-tdd-doesnt-lead-to-dumb-code)

Kent Beck pushes back against a common critique: that test-driven development (TDD) leads to "dumb" code because programmers write only the bare minimum to pass each test and never generalize. In his view, the design quality of TDD code is only as good as the design decisions its author makes—no different from code written without TDD. He illustrates this with a factorial function: start with `assert factorial(1) == 1` and return `1`, then add `assert factorial(2) == 2` and temporarily return `2`. Rather than piling on `if` statements forever, the programmer notices the underlying structure: `2` is really `2 * 1`, where `2` is the parameter `n` and `1` is the result of a recursive call, arriving at the general `n * factorial(n - 1)` in tiny steps.

The real difficulties lie elsewhere: sometimes you don't yet have enough tests to constrain the code to only the right behavior, and sometimes you don't yet see how to generalize and leave a few special cases in place for years—which is still fine as long as the code handles the cases that matter. What never happens is endless copy-pasting. Finally, Beck points out that a naive implementation is tightly coupled to the test suite, requiring code edits every time an assertion is added, whereas generalizing decouples them so you can add tests without changing code and vice versa.

## [How Discord Indexes Trillions of Messages](https://discord.com/blog/how-discord-indexes-trillions-of-messages)

Discord recounts how it re-architected its message search system—originally built on Elasticsearch in 2017—to keep up with trillions of messages. The old setup was showing serious cracks: Redis-backed indexing queues dropped messages when backlogged, bulk indexing wasn't fault-tolerant when an Elasticsearch index or node had trouble, large clusters were expensive to operate and painful to upgrade or rolling-restart, and indexes for massive servers (guilds) grew unwieldy. Their new architecture runs Elasticsearch on Kubernetes via the Elastic Operator, splits storage into many smaller clusters grouped into "cells," replaces Redis queues with Google PubSub for durability and replayability, and introduces a Rust router built on Tokio to batch messages by target cluster and index before bulk indexing.

The cell architecture also unlocked new product capabilities: direct messages (DMs) are sharded by `user_id` inside a dedicated cell, enabling cross-DM search for a user. For "Big Freaking Guilds" that hit Lucene's ~2-billion-document limit, Discord reindexes their messages into indexes with more primary shards inside a dedicated cell. The results: indexing throughput doubled, median query latency dropped from 500 ms to under 100 ms (p99 from 1 second to under 500 ms), the team now runs 40 clusters hosting thousands of indexes, and cluster upgrades happen automatically without user-visible impact.

## [Data Oriented Programming (DOP) in Java](https://nejckorasa.github.io/posts/data-oriented-programming-in-java/)

Data-Oriented Programming (DOP) flips traditional object-oriented habits on their head: instead of bundling state and behavior together inside a class, you model data with simple passive structures and put logic in standalone functions that operate on that data. The post outlines four principles: model data immutably and transparently, model only the exact data needed, make illegal states unrepresentable, and separate operations from data. Modern Java supports this style cleanly through three features: `record`s provide compact data carriers with `final` fields (though they don't automatically make referenced objects deeply immutable), `sealed` classes restrict subtypes so the compiler knows every case, and pattern-matching `switch` expressions enforce exhaustiveness, shifting bugs from runtime to compile time.

In a `Shape` example with `Circle`, `Rectangle`, and `Triangle`, a `getCenter` function written as a single `switch` expression replaces adding methods across every subclass, removing the need for the Visitor pattern in this case. When a new subtype like `Pentagon` is added, the compiler flags every `switch` missing that branch—which is why the author advises avoiding `default` branches that silence exhaustiveness checks. DOP also fits explicit result handling, such as a `Result` type with `Ok` and `Error` variants that forces callers to handle both outcomes. Overall benefits include code that is easier to read, maintain, test, and refactor safely with lower coupling.

## [Why performance optimization is hard work](https://purplesyringa.moe/blog/why-performance-optimization-is-hard-work/)

The author argues that performance optimization is hard not because engineers lack skill or knowledge, but because it is inherently exhaustive work that requires testing a huge number of possibilities. First is combinatorics: some optimizations only pay off when combined, others slow each other down, and ruling out "obviously bad" ideas upfront is mostly guesswork because a simple algorithm can win via vectorization while clever code loses to branch mispredictions. Second is continuity: algorithms with crossover thresholds, like hybrid sorts or FFTs, require tuning parameters empirically and re-measuring after every change, making an automated benchmark harness invaluable. Third is incompatibility: hardware constraints like two lookup tables that cannot fit in cache together or register pressure force hard trade-offs.

The post also pushes back on the myth that "the compiler is smarter than you": compilers don't reason at the level of your domain abstractions and often allocate registers poorly, so you still have to inspect assembly and profile with tools like `perf`. Documentation is another hurdle: x86 has detailed optimization manuals, whereas Apple Silicon has almost none, turning optimization into reverse engineering. In short, optimization means exploring dozens of variants, working around imperfect tooling, and reconciling conflicting wins—yet small improvements compound and are still worth the effort because they save real users' time.

## [Good vs Great Animations](https://emilkowal.ski/ui/good-vs-great-animations)

Emil Kowalski shares practical tips for taking UI animations from good to great. First, give animations a clear origin: a dropdown menu should expand from the button that triggered it by setting `transform-origin`, and libraries like Radix expose CSS variables you can plug right in. Easing is the single most impactful lever; for an element already on screen that moves to a new position, `ease-in-out` mimics natural acceleration and deceleration like a car, while `ease-out` should be the default almost everywhere else. Built-in CSS easing curves are often too mild, so Kowalski nearly always reaches for custom curves and recommends easing.dev and easings.co.

For cursor-driven interactions, tying values directly to mouse coordinates feels robotic; Motion's `useSpring` hook interpolates changes with spring physics so movement feels natural, though he advises saving it for decorative motion rather than functional charts like those in a banking app. Knowing your tools matters too: `clip-path` makes tab-bar label colors transition cleanly in sync with the active indicator, while 3D transforms open up expressive effects. In Kowalski's view, when baseline software quality is high everywhere, thoughtful motion is one of the clearest ways for a product to stand out.

## [Senior engineers should make side bets](https://www.seangoedecke.com/side-bets/)

Sean Goedecke argues that junior engineers should stick closely to assigned work, because their tasks need experienced oversight and the fastest path to promotion is executing their core assignments well. Senior engineers, by contrast, shouldn't just work down a ticket queue—they should spend 10–20% of their time on "side bets": projects they believe are valuable to the company that nobody has asked for yet, such as a new feature, a performance optimization, or a developer-velocity improvement, provided the payoff is concrete. Side bets carry real risk: at worst you waste time and look to management like you're working on the wrong things, and most bets will fail—in which case you quietly drop them and move on.

The reason to make them anyway is that one winning bet pays for all the rest: anyone could have completed your routine ticket work, whereas the value of a successful side bet happened entirely because of you. When a bet pays off, share it proactively via an internal write-up or a chat with your manager; if you feel awkward showing it off, the benefit probably wasn't concrete enough. Goedecke shares examples from GitHub: an "open in prompt editor" button saw zero adoption, whereas wiring AI inference permissions into GitHub Actions saw real usage. He lands two or three winning bets a year—and notes that if your bets never pan out, it's a sign to stop making them.

## [Avoiding Skill Atrophy in the Age of AI](https://addyo.substack.com/p/avoiding-skill-atrophy-in-the-age)

Addy Osmani warns of the paradox of AI coding assistants: productivity goes up, but core skills can atrophy if you aren't careful. A 2025 study by Microsoft and Carnegie Mellon found a correlation between higher trust in AI and lower self-reported critical thinking, though the findings don't prove long-term skill loss. The warning signs creep in gradually: stopping reading documentation, pasting error messages straight into AI instead of debugging, copying code without understanding why it works, shying away from architectural design, and forgetting basic syntax. Osmani worries this erodes both individual learning and team mentorship. While letting go of obsolete skills is normal, the key is distinguishing which tasks can be safely offloaded to machines and which fundamentals must stay sharp.

His prescription is to treat AI as a collaborator rather than a crutch: always verify and understand its output, actively hunt for bugs and edge cases, and ask AI to explain code line by line; schedule "no-AI days" to code from scratch and read docs directly; spend 15–30 minutes tackling a problem yourself before prompting; review AI-generated code as rigorously as a teammate's PR; log topics you repeatedly ask AI about so you can fill those knowledge gaps; and use AI in a pair-programming style where you stay in the driver's seat. The core message: use AI to amplify your capability rather than replace it, preserving both the craft and the joy of problem-solving.

## [Cursor best practices](https://x.com/paraschopra/status/1917466537637859544)

![Cursor best practices](https://pbs.twimg.com/media/Gpw1p1waYAAeAyY?format=jpg)

---

*This post was rewritten by Claude Code with Opus 5.5 on 27/09/2026; reviewed and edited by Codex with GPT 6.1 Sol on 09/11/2026.*
