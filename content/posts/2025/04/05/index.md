---
title: "Newsletter #10"
date: 2025-04-05
tags: ["AI-Assisted", "Newsletter", "Engineering Culture", "Git", "Java", "Code Review", "Algorithms"]
categories: [ "Newsletter" ]
---

*Enjoy Newsletter \#10.*

## [Gaining Years of Experience in a Few Months](https://marcgg.com/blog/2025/02/11/high-growth/)

Marc G. Gauthier, former VP of Engineering at Drivy, reflects on uneven learning curves in a career: those rare, intense stretches where you absorb so much so quickly that a few months feel like years of experience. For him, that moment came when Drivy was acquired by Getaround in 2019, forcing him to juggle technical, architectural, communication, management, business, and product challenges simultaneously under high stakes and tight deadlines. He distinguishes this from merely "stepping outside your comfort zone": it pushes well past your current capabilities, carries a real risk of failure, and is impossible to sustain indefinitely.

To frame this, he divides work into four zones: the **Comfort Zone** (safe, but staying too long leads to stagnation), the **Learning Zone** (healthy stretch challenges where you should spend most of your career), the **High Growth Zone** (compressing years of growth into months, unsustainable and not always available on demand), and the **Burnout Zone** if you stay in high growth too long. He sketches healthy career trajectories that alternate between the Learning and High Growth zones, or use the Comfort Zone briefly to recover after an intense sprint before returning to the Learning Zone. His closing advice: when a rare High Growth opportunity comes along, lean in and make the most of it—but watch your health closely, because none of the career gains matter if you burn out.

## [Writing Better Commit Messages](https://refactoringenglish.com/chapters/commit-messages/)

In this chapter from *Refactoring English*, Michael Lynch argues that commit messages are routinely treated as an afterthought, resulting in useless one-liners like `"Fix bug"` or `"Update UI"`. The most important reader of a commit message, he notes, is your code reviewer—followed by teammates, library consumers, future bug investigators, and automated release-note generators. Because of that, you should structure commit messages like a journalist's "inverted pyramid," putting the most essential context right at the top and using section headings to break up longer messages.

The subject line is the most critical piece because it's what shows up in `git log --oneline` and GitHub's commit history view; it should describe the *impact* of the change (e.g., `"Prevent database corruption when users register concurrently"`) rather than the mechanics of the code edit. The body should explain how the change affects end users and, above all, the *motivation*: why the change was needed and what constraints shaped the chosen solution. Depending on the situation, you can include breaking-change notices, non-obvious reference links, reasons for adding a new dependency, issue tracker links, testing instructions and limitations, and alternatives considered. Conversely, leave out anything already obvious from the diff, ephemeral review chatter, and temporary preview URLs—and remember that anything essential for ongoing code maintenance belongs in code comments, not buried in commit history.

## [The Rotation Program That Keeps This Startup's Engineers Learning — and Not Leaving](https://review.firstround.com/the-rotation-program-that-keeps-this-startups-engineers-learning-and-not-leaving/)

This First Round Review interview with Krista Moroder, VP of Engineering at Checkr, tells the story of an internal rotation program that drove voluntary attrition in her org down to nearly zero. A former high school teacher, Moroder borrowed an exercise from the faculty lounge: putting stickers next to the names of students who had a strong adult connection at school to spot which kids were falling through the cracks. She adapted that idea into a spreadsheet tracking every engineer, observing that when engineers leave after two or three years, it's usually not just about equity vesting—it's because they stopped learning and got bored, a restlessness only amplified by anxiety over falling behind in the AI wave.

The program runs in three steps: maintaining a "sticker chart" spreadsheet with three columns (joined a rotation or cross-functional tiger team, worked on multiple teams, or received training for a new role) with the goal that every engineer has at least one box checked before their third anniversary; matching that list against quarterly company priorities to rotate engineers where they're needed; and holding deliberate check-ins before making any transfer permanent. Roughly half of all rotations end with the engineer staying on the new team permanently, and one temporary AI tiger team evolved into a permanent core team. To persuade managers to let their top performers rotate out, she argues that having an "indispensable" single point of failure is actually a succession-planning bug, and that the whole engineering org needs to get an A together. The result: roughly 60% of Checkr's Staff+ engineers have been with the company for six years or more.

## [Judge Your Coworkers](https://blog.staysaasy.com/p/judge-your-coworkers)

This Stay SaaSy post warns against a cultural failure mode the author calls **Mutually Assured Mediocrity**: when everyone is performing at a mediocre level, they form an unspoken pact never to criticize one another out of fear that their own weaknesses will be exposed in return. The post traces how this creeps in as a company grows: new departments form, "you don't understand our job, stay in your lane" becomes a defensive shield, leaders avoid holding peers accountable to avoid being judged themselves, and eventually the few people who dare to point out real problems get punished as troublemakers.

To counter this, the author advocates encouraging employees to form healthy judgments about their coworkers' work, governed by three ground rules: never criticize peers publicly—share feedback only privately with your direct manager or in formal peer reviews; keep performance management strictly confidential; and remind everyone that nobody is promised flawless coworkers. Managers should explicitly tell reports early on that they are expected to have opinions on their collaborators' effectiveness, and check in on those opinions every 6–12 months. When a report praises someone, it's a coaching moment to calibrate what great work looks like across seniority levels; when they complain, it surfaces hidden performance issues or role misunderstandings early (for example, mistaking a product manager for a project manager). The closing message: failing to hold people accountable is one of the worst disservices a company can do to its employees, and tech has pushed "blameless" culture way too far.

## [My LLM Codegen Workflow ATM](https://harper.blog/2025/02/16/my-llm-codegen-workflow-atm/)

Harper Reed shares his current workflow for building software with LLMs, distilled into three stages: hone an idea into a spec, generate an execution plan, and execute in tight loops. For greenfield projects, he has a conversational model interview him one question at a time to turn a rough idea into a detailed `spec.md`; next, he feeds that spec to a reasoning model to break it down into incremental steps—each written as a self-contained prompt for a coding agent—saved as `prompt_plan.md` alongside a `todo.md` checklist to preserve state across sessions. The entire planning phase takes about 15 minutes. For execution, he prefers Claude directly or Aider: paste a prompt, run the test suite, commit if green, or pack the codebase with `repomix` and hand it back to the model to debug if red.

For existing codebases, he pairs `repomix` with `mise` tasks to bundle repository context, then uses targeted prompts to review code, file GitHub issues, or identify missing test coverage. He admits it's easy to get "out over your skis" when code is flying by that fast, which is why upfront planning and automated tests are non-negotiable guardrails. He also notes that these workflows are still largely single-player rather than team-friendly, and shares how he uses the idle minutes while waiting on model inference—often by kicking off the spec for the *next* project.

## [Structured Logging in Spring Boot](https://www.javacodegeeks.com/structured-logging-in-spring-boot.html)

Yatin Batra's tutorial on Java Code Geeks walks through setting up structured logging in Spring Boot. Unlike the plain-text log lines Logback emits by default, structured logging formats entries as machine-parseable JSON, making it far easier for log aggregation platforms like the ELK stack or Grafana Loki to parse, search, and filter events. The author shows how to add the `logstash-logback-encoder` dependency to `pom.xml`, configure `logback-spring.xml` under `src/main/resources`, and inspect the resulting JSON output from a sample application.

Moving to advanced topics, the post covers injecting custom contextual fields via MDC (Mapped Diagnostic Context)—such as attaching a `userId` to every log event—shipping logs to Logstash, and configuring Promtail to scrape and forward logs into Loki. Finally, the author introduces two standardized schemas: Elastic Common Schema (ECS) for unifying field names across the Elastic ecosystem, and Graylog Extended Log Format (GELF) for shipping structured logs to Graylog, comparing their core fields and trade-offs. This setup is essential for cloud-native deployments where centralized observability is a must.

## [Secret Java Stream Hacks That Will Instantly Improve Your Coding Efficiency](https://gainjavaknowledge.medium.com/secret-java-stream-hacks-that-will-instantly-improve-your-coding-efficiency-8253d57d692b)

This Medium post by Gain Java Knowledge highlights several lesser-known Java Stream API tricks for writing cleaner, more expressive pipelines. A standout is `Collectors.teeing()`, which lets you pipe a single stream through two separate collectors simultaneously and merge their results—for example, computing both the sum and the average in a single pass instead of iterating twice. The post also covers `takeWhile()` (taking elements until a predicate turns false) and `dropWhile()` (skipping elements while a predicate remains true) for concise short-circuiting stream slicing.

Beyond those operators, the author touches on parallel streams, memory efficiency, handling checked exceptions cleanly inside lambdas, and composing multi-stage collectors. Practical tips include picking the most specific collector for the job, avoiding side effects inside stream operations, preferring method references over verbose lambdas where readable, and keeping pipelines short enough to scan easily. Understanding lazy evaluation is also key when weighing stream performance on large datasets.

## [Death of a Thousand Nits: Code Review Best Practices](https://bitfieldconsulting.com/posts/code-review)

In an excerpt from his book *Code For Your Life*, John Arundel explores how to make code reviews less adversarial and genuinely useful. His number-one recommendation is **pair reviewing**: instead of trading walls of text in pull request comments, hop on a quick call or screen-share. Voice tone and facial expressions convey far more nuance than text, a 15-second question can replace days of back-and-forth comment threads, and people are naturally kinder face-to-face.

When asynchronous written review is unavoidable, every comment should genuinely add value to the code. Leave purely stylistic preferences to automated formatters; if you don't recognize a language construct, look it up yourself first; if you don't understand why the author took a particular approach, ask a genuine question; and even when suggesting an improvement or pointing out a likely bug, frame it as a question rather than a command. Start reviews by calling out what you liked, close with an encouraging note, and drop any trace of condescension. On the receiving end, when hit with a blunt or abrasive review comment, resist getting defensive and look for the kernel of truth inside it—and for pure style nitpicks, either ignore them politely or ask privately what the deeper concern is. Ultimately, the best way to build a kinder code review culture is to model it yourself.

## [Hash Functions Deep Dive](https://www.kirupa.com/data_structures_algorithms/hash_functions_deep_dive.htm)

Kirupa explains hash functions from first principles: a function that takes an arbitrary input—text, a file, or raw binary data—and maps it to a fixed-size output, powering everything from hash tables and password verification to file integrity checks, digital signatures, and deduplication. A good hash function needs eight properties: determinism (the same input always yields the same output), uniform distribution, fast computation (ideally O(1) for table lookups), the avalanche effect (a tiny change in input flips roughly half the output bits), fixed output length, low collision rate, pre-image resistance (one-way), and no correlation between similar inputs.

To make these properties concrete, the author builds a toy hash function in JavaScript from scratch: summing the character codes of a string modulo a prime table size like 37. That naive version immediately fails on anagrams like `"hello"` and `"olleh"`, which produce identical sums; multiplying each character code by its positional weight fixes the anagram collision, yet the toy function still flunks nearly every other criterion on the list. The lesson is never to roll your own hash function in production; the author walks through how MD5 satisfies the structural criteria with its 128-bit (32-hex-character) output (noting that MD5 is no longer safe against deliberate collisions and that password storage requires dedicated slow hashes like bcrypt or Argon2). Hash functions sit quietly underneath almost everything we build, from fast in-memory lookups to verifying downloaded ISOs.

## [XOR: A Deep Dive into the Exclusive OR Operation](https://www.chiark.greenend.org.uk/~sgtatham/quasiblog/xor/)

Simon Tatham takes a deep dive into the XOR (exclusive OR) operation and its surprisingly rich applications across computer science. At the bit level, XOR outputs `1` when its two input bits differ and `0` when they match, and is both commutative and associative. Tatham shows that you can view the exact same operation through four equivalent mental models: a "not equal" bit comparison, a conditional bit-flipper controlled by a mask bit, addition modulo 2 (carryless bit addition), and parity calculation (counting whether the number of `1` bits is odd or even).

Each mental model unlocks classic applications. In cryptography, XORing plaintext with a keystream encrypts and decrypts symmetrically—where the entire security challenge lies in generating an unpredictable keystream, and raw XOR alone provides no message integrity protection against bit-flipping attacks. In retro computer graphics, XORing a sprite onto a framebuffer twice cleanly erases it and restores the original background pixels. Tatham also walks through the classic XOR swap trick, overflow-safe integer averaging, and carryless polynomial arithmetic (used in CRCs and Galois fields), showing how one humble bitwise operator looks completely different depending on the lens you bring to it.

## Bonus: Interesting images from [ByteByteGo](https://bytebytego.com/)

![SOAP vs REST vs GraphQL vs RPC](https://substack-post-media.s3.amazonaws.com/public/images/6b437484-1fd8-4b59-ba05-46bb3352b053_2904x2559.jpeg)
![SQS vs SNS vs EventBridge vs Kinesis](https://substack-post-media.s3.amazonaws.com/public/images/3ecf2600-10d8-4180-8328-8d790fbba0cc_1280x1557.gif)
![Top 5 common ways to improve API performance](https://substack-post-media.s3.amazonaws.com/public/images/217bf342-bfd4-4088-bba3-b2734f065a20_1280x1280.gif)

## Bonus 2: Interesting videos from [Inside Java](https://inside.java/)

[Project Loom and Virtual Threads: Next Phases](https://inside.java/2025/02/22/devoxxbelgium-loom-next/)

---

*This post was rewritten by Claude Code with Opus 5.5 on 27/09/2026; reviewed and edited by Codex with GPT 6.1 Sol on 09/11/2026, and re-verified by Claude Code with Sonnet 5.5 on 16/11/2026.*
