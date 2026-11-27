---
title: "Newsletter #26"
date: "2025-05-13"
tags: [ "AI-Assisted", "Software Design", "Java", "Structured Concurrency", "Git", "Local Development", "AI Agents" ]
categories: [ "Newsletter" ]
---

*Enjoy Newsletter #26.*

## [The Philosophy of Software Design – with John Ousterhout](https://newsletter.pragmaticengineer.com/p/the-philosophy-of-software-design)

In this episode of *The Pragmatic Engineer* podcast, Stanford professor John Ousterhout (author of *A Philosophy of Software Design*) explains why software design matters even more in the age of AI. He compares today's AI code-generation tools to a "tactical tornado": they crank out working code at breakneck speed while easily leaving behind a trail of technical debt, meaning high-level architectural thinking remains firmly a human responsibility. At its core, Ousterhout says, software design is the art of decomposition—breaking a complex system into relatively independent modules. He also advocates the principle of "design it twice": always force yourself to consider at least two genuinely different approaches before committing, because your second design is almost always better than your first.

Ousterhout famously disagrees with several tenets of Robert C. Martin's *Clean Code* school. He argues that strict TDD encourages developers to fixate on narrow tactical details rather than overall system architecture (though he likes writing tests first when fixing bugs), that splitting code into tiny methods proliferates shallow interfaces instead of the "deep modules" (simple interfaces hiding rich functionality) we should aim for, and that code comments are essential for capturing abstractions and field invariants that code alone cannot express. At Stanford, he teaches software design through intensive code reviews and comparing student solutions side by side, much like a creative writing workshop. He is currently contributing an implementation of the Homa transport protocol to the Linux kernel. It's a must-listen episode for junior developers.

## [20 years of Git. Still weird, still wonderful](https://blog.gitbutler.com/20-years-of-git)

Marking Git's 20th anniversary, Scott Chacon (co-founder of GitHub and GitButler) looks back on the history of the tool. In April 2005, Linus Torvalds created Git as "the stupid content tracker" to replace BitKeeper and improve how the Linux kernel community collaborated via patches and tarballs. The very first commit contained just seven low-level C programs like `write-tree` and `commit-tree`, with zero concern for user-friendliness. Early on, Git was almost entirely low-level "plumbing," while usable "porcelain" interfaces came from community shell-script wrappers like Cogito. Many familiar commands emerged organically: the original `git log` was literally a three-line shell script piping `git-rev-list` into `LESS`, and `git rebase` grew out of mailing-list discussions between Junio Hamano and Linus about patch workflows in 2005.

Chacon also shares his personal journey: he originally used Git as a content distribution system for digital signage displays—matching Linus's original "content tracker" philosophy—before writing the *Pro Git* book and co-founding GitHub. In a fun bit of trivia, Git's "octopus merge" strategy directly inspired GitHub's Octocat mascot. Twenty years later, Git dominates software development while remaining as "weird and wonderful" as ever: an eccentric command-line UI sitting on top of a remarkably elegant data model.

## [A Modest Critique of Optional Handling](https://mccue.dev/pages//4-5-25-optional-critique)

Ethan McCue critiques how many Java developers misuse `java.util.Optional` when refactoring methods that previously returned `null`. In his view, `Optional` shines in Stream pipelines and API return types, not as a wholesale replacement for `null` inside method bodies. The conventional wisdom to avoid `.isPresent()`/`.get()` in favor of `.map()` or `.ifPresent()` quickly falls apart when you need to throw checked exceptions, combine multiple `Optional` values, or mutate local variables inside a lambda; nesting `.ifPresent()` calls also pushes code into deeply indented arrow anti-patterns.

McCue's proposed alternative is refreshingly simple: unwrap the `Optional` immediately into a nullable local variable using `.orElse(null)` and handle it with standard `if (x != null)` control flow. Static analysis tools and IDEs already excel at tracking nullability on local variables, checked exceptions work naturally inside regular `if` blocks, and the method signature still explicitly forces callers to confront the possibility of a missing value. Backed by concrete before-and-after refactorings, the post is a great reminder for junior developers to favor clear, maintainable code over dogmatically following "never call `.get()`" lint rules.

## [Project Loom: Structured Concurrency in Java](https://rockthejvm.com/articles/structured-concurrency-in-java)

Riccardo Cardin at Rock the JVM provides a deep-dive tutorial on structured concurrency—part of Project Loom—running on Java 23 with `--enable-preview`. He starts by showing the flaw in traditional unstructured concurrency with `ExecutorService`: when a parent task fails or times out, child tasks can keep running in the background, leaking threads and wasting resources. Structured concurrency fixes this by enforcing the principle that the syntactic block structure of your code mirrors the runtime lifetime of its concurrent subtasks—meaning every child thread is guaranteed to finish before execution exits the enclosing lexical scope.

At the center of the API is `StructuredTaskScope`, which implements `AutoCloseable` for `try-with-resources` blocks and provides `fork()` to spawn subtasks on virtual threads, `join()` to await completion according to the scope's policy, and `shutdown()` to request cancellation of remaining subtasks. Cancellation is cooperative, and closing the scope still waits for all forked threads to terminate cleanly. Cardin illustrates this with a GitHub API client that fetches user profiles and repositories in parallel using the built-in `ShutdownOnFailure` and `ShutdownOnSuccess` policies. From there, he shows how to build custom policies by subclassing `StructuredTaskScope` and overriding `handleComplete()`, implementing functional helpers like `par()`, `race()`, `timeout()`, and nested parent-child task trees. It is an excellent hands-on guide to writing safer, easier-to-reason-about concurrent code in modern Java.

## [Go's HTTP Server Patterns in Java 25](https://mccue.dev/pages/4-5-25-go-http-server)

Ethan McCue demonstrates that modern Java can build HTTP servers in a lightweight, Go-like style by walking through a simple file-backed wiki web app written in Java 25. The application supports creating, viewing, and editing wiki pages stored as plain text files on disk. Its foundation is the JDK's built-in `jdk.httpserver` module, paired with McCue's small `dev.mccue.jdk.httpserver` helper library (which adds a clean `Body` abstraction for writing responses), JMustache for HTML templating, and `dev.mccue.urlparameters` for parsing form submissions.

He models wiki entries with a `Page` record exposing `save()` and `load()` methods, wires up dedicated request handlers for viewing, editing, and saving pages, and returns HTTP 302 redirects when users visit a nonexistent page. The walkthrough proves that with just the standard library and a few tiny, composable dependencies, you can build a clean web application in Java without reaching for a heavyweight framework. For high-traffic production workloads, he still suggests considering battle-tested servers like Jetty—while noting an important distinction in the JDK docs: the "testing, development, and debugging only" caveat applies specifically to `SimpleFileServer` and the `jwebserver` CLI tool, not to the underlying `jdk.httpserver` HTTP/HTTPS API itself.

## [Java is dying and it paid off my mortgage](https://alyosha.net/posts/java-is-dying-and-it-paid-off-my-mortgage/)

Alyosha looks back on the career anxiety they felt as a junior developer specializing in Java. On Hacker News and YouTube, Java was practically invisible compared to JavaScript and the latest hyped frameworks, making the author worry they were betting their career on a dying language. Once they actually entered the job market, however, they found the exact opposite: Java roles consistently led in pay, benefits, and stability, driven by profitable enterprises quietly running their core systems on the JVM.

In the author's view, Java is in the sweet spot of a mature technology: nobody talks about it on social media, yet it powers massive economic value—and precisely because it is viewed as "uncool," fewer new developers flock to it, keeping compensation high for those who know it well. Java skills bought the author's house and paid off the mortgage. The lesson for junior developers: online hype does not reflect real-world hiring demand, and mastering a boring, rock-solid foundation often builds a far more lucrative and stable career than chasing the trend of the week.

## [.localhost domains](https://inclouds.space/localhost-domains)

Charles Chamberlain shares how he escaped having to memorize arbitrary port numbers like `localhost:4333` or `localhost:5050` when running multiple web apps locally. Instead, he gives each local project a memorable `.localhost` domain such as `inclouds.localhost`. His macOS setup has three moving parts: running each web app as a background service via `launchd` listening on its own port; adding an entry in `/etc/hosts` pointing the `.localhost` domain to `127.0.0.1`; and running Caddy as a local reverse proxy that routes each domain to its port while automatically handling internal TLS certificates and `gzip`/`zstd` compression. Here is the minimal config for an app running on port 5050:

```bash
# /etc/hosts
127.0.0.1 inclouds.localhost

# Caddyfile
inclouds.localhost {
    reverse_proxy localhost:5050
    tls internal
    encode gzip zstd
}
```

Chamberlain admits that manually editing multiple system files is still a bit clunky and hopes to wrap the whole workflow into a single install/uninstall CLI command; a reader also pointed out that `dnsmasq` can eliminate the manual `/etc/hosts` edits. It's a neat quality-of-life trick for keeping your local development environment organized when juggling several projects at once.

## [AI 50: AI Agents Move Beyond Chat](https://sequoiacap.com/article/ai-50-2025/)

![](https://sequoiacap.com/wp-content/uploads/sites/6/2025/04/ai-50-2025.png)

Konstantine Buhler at Sequoia Capital analyzes the firm's 2025 AI 50 list and highlights a major shift: AI is moving from answering questions in a chat box to autonomously completing end-to-end work. Powered by agentic workflows and reasoning models, the companies on this year's list don't just handle isolated prompts—they own entire business workflows, turning AI into an "engine of action" inside the enterprise. Standout examples include Harvey handling end-to-end legal workflows from document review and drafting to case analysis, Sierra automating customer service resolution, and Cursor generating complete software features from natural-language specs.

The piece also spotlights the rise of physical robotics, where transformer models meet hardware: Figure AI is building humanoid robots powered by its new Helix model, while Skild AI is developing a shared foundation model for general-purpose robotics—a market Nvidia estimates at $50 trillion. Buhler views 2025 as the inflection point where AI agents began taking on high-value enterprise work, and predicts that by 2026 consumer AI agents will take off in earnest, automatically managing calendars, booking travel, and organizing files as enterprise breakthroughs trickle into everyday life.

## Interesting images from [ByteByteGo](https://bytebytego.com/)

![A Cheatsheet On OOP Design Patterns](https://substack-post-media.s3.amazonaws.com/public/images/65279cf0-3266-445d-852b-a45d6ac9afa4_2250x2862.png)

---

*This post was rewritten by Claude Code with Opus 5.5 on 27/09/2026; reviewed and edited by Codex with GPT 6.1 Sol on 09/11/2026, and re-verified by Claude Code with Sonnet 5.5 on 16/11/2026.*
