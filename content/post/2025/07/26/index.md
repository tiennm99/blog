---
title: "Newsletter #37"
date: 2025-07-26
tags: [ "AI-Assisted", "Nix", "DevOps", "Developer Experience", "AI Coding", "Git", "WebSockets" ]
categories: [ "Newsletter" ]
---

*Enjoy Newsletter #37.*

## [I Think It's Time to Give Nix a Chance](https://maych.in/blog/its-time-to-give-nix-a-chance/)

Chinmay D. Pai makes the case that Nix deserves a closer look from everyday developers. Unlike traditional package managers that install everything into shared global directories, Nix stores each package inside an immutable `/nix/store` path prefixed with a cryptographic hash of all its build inputs. That allows multiple versions of the same software to coexist without conflict, each carrying its own complete dependency tree. Nix flakes pin dependencies so environments can be reproduced reliably across machines, even if they don't guarantee bit-for-bit identical builds in every case. You can also try out tools without installing them permanently via `nix shell` or `nix run`, while the immutable store and non-standard filesystem layout neutralize several common Linux attack vectors.

Pai is equally candid about the downsides: learning a bespoke functional language, deciphering cryptic error messages, understanding Nix's evaluation model to debug issues, wrestling with software that hardcodes standard Linux paths, high disk usage, and fragmented documentation. To get started without drowning, he recommends installing via the Determinate Systems Installer, experimenting with `nix shell`, and then setting up a simple project dev shell. Nix pays off most for teams plagued by "works on my machine" drift, painful onboarding, cross-platform builds, or strict compliance requirements—while small projects with stable dependencies probably don't need it yet.

## [You Can Choose Tools That Make You Happy](https://borretti.me/article/you-can-choose-tools-that-make-you-happy)

Fernando Borretti argues that programmers' technology choices are driven largely by emotion rather than the pure engineering rationality we claim. People pick tools that match an aesthetic and a desired self-image: using Emacs because it feels intellectually elite, or running NetBSD because it fits a cyberpunk persona. Afterward, we construct technical rationalizations to disguise the real motive—downplaying glaring flaws in niche tools ("sure, I had to write my own HTTP server"), inventing dubious advantages, or lobbing vague criticisms at mainstream options like "Docker is too complex" or "C++ builds character, whereas Rust makes you soft."

Borretti has no problem with emotional tool choices as long as you don't lie to yourself or others. If you pick something for its aesthetic or identity, lean into it honestly and intentionally; just don't claim SNOBOL has a bright commercial future, or tell your manager the decision came from a sober cost-benefit analysis. The core message: you are allowed to choose tools that make you happy—just be honest about why. He also cautions that passion still needs a reality check, because extreme choices divorced from reason can sink years into dead-end paths.

## ~~[The Copilot Delusion](https://deplet.ing/the-copilot-delusion/)~~

~~This post delivers a sharp critique of AI coding assistants like GitHub Copilot and their negative impact on software development. The author argues that these tools generate code without any real understanding of system architecture or deep technical trade-offs.~~

~~The core concern is that relying on AI erodes developers' critical thinking and ability to learn. When we "outsource our thinking to AI," we also "outsource our learning" to it. These tools lack intuition for hardware performance, memory management, and low-level optimization—key ingredients of high-quality software engineering.~~

~~The author worries about the cultural shift across the industry, warning it could produce a generation of developers who prioritize fast output over quality, threatening the "hacker spirit" and deep technical curiosity. The risk is a wave of developers who think they are skilled simply because their bot got CI to pass, while lacking foundational understanding.~~

~~**Main concerns:**~~
~~- AI generates code without understanding system architecture~~
~~- Erosion of developers' critical thinking skills~~
~~- Lack of intuition around performance and optimization~~
~~- Risk of creating a generation of developers who are only "good on paper"~~

## [Why Cline Doesn't Index Your Codebase (And Why That's a Good Thing)](https://cline.bot/blog/why-cline-doesnt-index-your-codebase-and-why-thats-a-good-thing)

In this May 2025 post, the Cline team explains why they deliberately avoid vector-indexing your codebase and why direct exploration fits their agent better. First, code doesn't work in isolated fragments: chopping it into small chunks breaks interconnected logic, like trying to understand a symphony from random ten-second clips, especially since source code lacks the clean paragraph boundaries of prose. Second, indexes go stale fast as code is refactored and updated; an outdated snapshot can lead an AI to suggest functions that no longer exist or miss recent architectural shifts. Third, generating vector embeddings creates a secondary copy of your intellectual property, bringing extra storage and security risk.

Instead, Cline navigates a repository the way an experienced engineer does: systematically following imports and call chains. When modifying a payment handler, for instance, Cline traces imports to locate custom error utilities, inspects sibling functions to pick up local conventions, and checks call sites—building contextual understanding rather than doing fuzzy pattern matching. That workflow is now practical thanks to the huge context windows of modern frontier models, shifting the bottleneck from raw retrieval volume to context quality: prioritizing comprehension over retrieval.

## [The Perfect Commit](https://simonwillison.net/2022/Oct/29/the-perfect-commit/)

Simon Willison shares how he organizes his work around the idea of the "perfect commit," treating each commit as a carefully packaged unit of work rather than a rough save point. A perfect commit bundles four things: an implementation focused on a single change, tests proving it works, updated documentation, and a link to an issue thread with the surrounding context. In his view, tests boost long-term velocity by letting you change code confidently without regressions, so every project should start with at least one passing test. Documentation—whether for a Python module, a web service, or a CLI tool—belongs right inside the repository so it stays in sync with the code, is versioned alongside it, and gets reviewed in the same diff.

Rather than writing long commit messages, Willison puts rich context into GitHub issues, which are easier to search, support pasted screenshots, and can be updated later. He acknowledges this goes against traditional Git orthodoxy, but finds it much more effective in practice. Not every commit needs all four elements: tiny bug fixes or doc typo corrections can skip the ceremony. For messy exploratory work, use a separate branch with rough commits and squash-merge a single clean commit into `main`. To make the habit effortless, he uses cookiecutter templates that pre-configure test harnesses and GitHub Actions from day one, as seen across open-source projects like Datasette and `sqlite-utils`.

## [The Software Engineering Kanagawa Moment](https://pashabitz.substack.com/p/the-software-engineering-kawagara)

Pasha uses Hokusai's woodblock print "The Great Wave off Kanagawa" as a metaphor for the wave of AI automation reshaping software engineering. In his view, programming is uniquely exposed to automation because abundant training data exists, outputs can be verified objectively, and the field faces none of the regulatory barriers that protect professions like medicine or law. Coding agents have already moved well past autocomplete, turning ticket descriptions into complete pull requests, while junior developer hiring has noticeably cooled. Well-bounded, self-contained tasks like refactoring and test writing are being automated first.

What remains for humans is understanding business needs, shaping product design, setting up technical scaffolding, and defining coding conventions—though the author admits even that boundary is fragile as language models keep improving. His advice for engineers at every level is to adopt coding agents actively, audit workflows for automation opportunities, and sharpen product and business judgment; junior developers in particular should practice shipping end-to-end products, learn deployment infrastructure, and study how real production systems are built rather than just following tutorials. His conclusion is blunt: the wave cannot be stopped, and much like agricultural mechanization shifted labor out of farming, it could displace millions of coding jobs.

## [WebSockets guarantee order - so why are my messages scrambled?](https://www.sitongpeng.com/writing/websockets-guarantee-order-so-why-are-my-messages-scrambled)

Sitong Peng recounts an interesting debugging mystery: WebSocket messages were showing up out of order in her logs, even though WebSockets run over TCP, which guarantees in-order delivery. The culprit wasn't the network protocol, but the application layer. The message event handler called `await blob.arrayBuffer()`, suspending execution while each message payload was processed; because processing took anywhere from 1 to 5 seconds per message, a smaller message that arrived later could finish before an earlier, slower one. TCP delivered the frames in exact order—the async handler scrambled them afterward.

Peng walks through two fixes. The first buffers incoming messages in a queue and processes them in batches of five with `Promise.all`, preserving order across results while still allowing parallelism within each batch. The second uses an async generator to process messages strictly one at a time—slower since there is no concurrency, but guaranteeing total ordering when application logic requires it. The broader lesson is how tricky it is to debug across multiple abstraction layers: even when the transport layer guarantees reliability and ordering, careless concurrency in application code can undo it, so you have to separate what each layer actually promises.

## [Why agents are bad pair programmers](https://justin.searls.co/posts/why-agents-are-bad-pair-programmers/)

Justin Searls argues that AI coding agents make terrible pair programmers because they "write code faster than humans can think." That speed breaks the collaborative loop: the human partner can't keep up, tunes out, and loses track of how the system works. It feels like pairing with someone who grabs the keyboard and types in silence at superhuman speed. When the agent inevitably hits a wall, the human lacks the mental context from earlier decisions needed to bail it out; worse, the agent may have solved the wrong problem entirely, leaving behind a pile of accidental complexity to clean up.

Searls suggests two paths forward. First, move agents into an asynchronous workflow: hand them self-contained tasks and review the output via pull requests, like GitHub's Coding Agent. Second, slow things down when working synchronously by using "Edit" or "Ask" modes instead of fully autonomous "Agent" mode; ping-pong pairing in Edit mode, where you review and approve each step, strikes the best balance. He also urges toolmakers to add adjustable generation speed, pause-and-ask checkpoints, UIs that reflect workflow state like GitHub integration and to-do lists, less overconfident agent personas that check in more often, and voice chat. Those changes would turn agents into genuine collaborators rather than lone sprinters.

---

*This post was rewritten by Claude Code with Opus 5.5 on 27/09/2026; reviewed and edited by Codex with GPT 6.1 Sol on 09/11/2026, and re-verified by Claude Code with Sonnet 5.5 on 16/11/2026.*
