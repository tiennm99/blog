---
title: "Newsletter #30"
date: 2025-05-17
tags: ["AI-Assisted", "Education", "LLMs", "Caching", "JavaScript", "Developer Experience", "PostgreSQL"]
categories: ["Newsletter"]
draft: false
---

*Welcome to Newsletter #30 - Today's tech news roundup.*

## [What I'd do as a College Freshman in 2025](https://muratbuffalo.blogspot.com/2025/04/what-id-do-as-college-freshman.html)

Computer science professor Murat Demirbas asks what he would do if he were starting college over as a freshman in 2025, and his first answer is still to study Computer Science. Against the claim that "nobody needs to learn programming anymore," he argues that AI tools cannot replace real mastery: debugging skills, abstract thinking, and fast adaptability have to be forged firsthand. He advises building a strong foundation in both computer science and AI, then pairing AI with a deep domain such as systems, databases, or programming languages—aiming to become "π-shaped," with depth in two areas and broad literacy across many others.

Beyond technical depth, soft skills are indispensable: clear communication powers remote work, learning in public, and even working with LLMs, while management starts with managing yourself. Demirbas still views the US as the best launchpad for a tech career and university as the best place to meet talented peers and build projects together. Borrowing a friend's metaphor, he says you should either be an all-terrain Jeep with an entrepreneurial mindset, or a specialized, high-speed Ferrari when a paved track exists—just don't be an easily replaceable Corolla, because in the AI era that is what gets automated away. Finally, play the long game, compounding skills and relationships rather than chasing trends.

---

## [LLMs Are Weird Computers](https://www.phillipcarter.dev/posts/llms-computers)

Phillip Carter proposes a useful mental model for large language models (LLMs): treat them as a "weird" or "inverted" kind of computer alongside the "normal" computers we already know. Traditional computers execute with exact precision but struggle with ambiguity, whereas LLMs do the opposite: they excel at handling ambiguity but struggle when absolute precision is required.

Viewing LLMs as a new class of computer with its own distinct properties helps developers better understand their strengths and limits, making it clearer which tasks to hand to an LLM and when traditional computation is still the right tool.

---

## [Every Caching Strategy Explained in 5 Minutes](https://www.swequiz.com/blog/every-caching-strategy-explained-in-5-minutes)

This SWE Quiz post gives a quick tour of common caching strategies, a foundational topic for optimizing application performance. With Cache-Aside (also called lazy loading), the application manages the cache directly: it checks the cache first and queries the database only on a miss, which fits read-heavy systems that can tolerate briefly stale data. Read-Through instead has the application talk only to the cache while the cache itself loads missing data from the database, keeping application code cleaner.

On the write side, Write-Through writes synchronously to both the cache and the database, guaranteeing consistency at the cost of slower writes. Write-Behind (Write-Back) writes only to the cache and flushes to the database asynchronously later, speeding up writes but risking data loss if the cache fails before syncing. Write-Around bypasses the cache on writes and uses it only for reads, which suits data that is rarely re-read immediately after being written. Choosing the right strategy depends on an application's specific trade-offs across performance, consistency, and fault tolerance.

## [Some features that every JavaScript developer should know in 2025](https://waspdev.com/articles/2025-04-06/features-that-every-js-developer-must-know-in-2025)

This WaspDev article rounds up modern JavaScript features every developer should know to write cleaner, more efficient code. Standouts include iterator helper methods like `drop()`, `take()`, and `filter()`, which process large datasets lazily one element at a time without allocating memory-hungry intermediate arrays. The `at()` method supports negative indexing on arrays, such as `arr.at(-1)` to grab the last element, while `Promise.withResolvers()` cleanly exposes `resolve` and `reject` alongside a newly created Promise.

The post also highlights underused techniques: passing a callback function to `replace()` and `replaceAll()` for complex string substitutions, swapping two variables via `[a, b] = [b, a]` instead of a temporary variable, and deep-cloning objects with `structuredClone()` rather than `JSON.parse(JSON.stringify())`. Rounding out the list are tagged templates for flexible template-literal processing, `WeakMap`/`WeakSet` for attaching metadata to objects without preventing garbage collection, and new `Set` operations like `union()`, `intersection()`, and `difference()`.

## [What Makes a Great Developer Experience?](https://www.codesimplicity.com/post/what-makes-a-great-developer-experience/)

Max Kanat-Alexander, who has spent over 20 years working on developer experience (DX) and helped design key parts of DX at Google and LinkedIn, distills the field's core principles. In his view, a great DX optimizes three things: cycle time, the elapsed time from when a developer forms an intent to when that intent is fulfilled; focus, the ability to work in uninterrupted flow; and cognitive load, the amount of knowledge required and the number of decisions a developer must make to get something done.

Most of the post focuses on the practical challenges of improving DX: understanding the real problem through data and developer feedback, managing change through gradual rollouts and driving adoption, building high-leverage tools that save human time rather than just machine resources, saying "no" or "not yet" kindly to requests that don't fit, and placing the burden on the party actually causing the problem. The overarching lesson is that the hardest part of DX is usually human rather than technical.

## [When Life Gives You Java](https://oblac.rs/when-life-gives-you-java/)

Igor Spasić shares how he writes Java when he has to use the language but still wants clean code, borrowing ideas from more expressive functional languages. He makes classes package-private by default and exposes them publicly only when strictly necessary, treating each package as a module. Roughly 95% of references are marked `final` to embrace immutability, which makes `null` nearly disappear outside very narrow boundaries. He no longer uses inheritance in his own code, favoring object composition instead, while still accepting inheritance where external libraries require it.

Spasić thinks in terms of "input, process, output" functions: because Java lacks true first-class functions, each class typically wraps a single function or a small group of closely related ones. Algebraic data types (ADTs) are modeled as `record`s implementing a `sealed interface`, and domain errors are returned as part of the result via dedicated ADTs, reserving exceptions for genuine runtime failures like out-of-memory errors, I/O failures, or lost database connections. That produces more small classes, which he considers a worthwhile trade-off for more modular code with fewer surprises.

## [Just Throw It Into Postgres](https://simonsafar.com/2025/throw_it_into_postgres/)

Simon Safar argues that between the two extremes of forcing all data into a strictly normalized relational schema and dumping raw data into countless files in a directory tree, there is a practical middle ground: just throw the data straight into PostgreSQL without overthinking upfront organization. Thanks to `JSONB`, PostgreSQL can query fields inside JSON documents directly, while indexes and dedicated columns can be added later once the data is already there.

He illustrates this with three examples. First, he built a custom Java code-navigation tool for Emacs: it parsed compiled class files to record relationships like "function A calls function B," then loaded hundreds of thousands of records into PostgreSQL via `COPY` in a few dozen seconds—fast enough to invoke `psql` multiple times per second for autocomplete. Second, he loaded tens of thousands of Chinese character SVGs from the Make Me a Hanzi project into a table with a `JSONB` column and joined it against a dictionary table for fast lookups. Third, he stored temperature sensor readings arriving over MQTT so Grafana could chart them. The takeaway: get the data stored first and organize it later, rather than trying to design the perfect schema on day one.

---

*This post was rewritten by Claude Code with Opus 5.5 on 27/09/2026; reviewed and edited by Codex with GPT 6.1 Sol on 09/11/2026, and re-verified by Claude Code with Sonnet 5.5 on 16/11/2026.*
