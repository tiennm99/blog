---
title: "Newsletter #35"
date: 2025-07-24
tags: [ "AI-Assisted", "Redis", "Valkey", "Open Source", "Testing", "SOLID", "WebAssembly" ]
categories: [ "Newsletter" ]
---

*Enjoy Newsletter #35.*

## [The magic of software; or, what makes a good engineer also makes a good engineering organization](https://moxie.org/2024/09/23/a-good-engineer.html)

Moxie Marlinspike argues that software development sits at the intersection of science and engineering, where product vision and technical understanding shape each other rather than flowing one way from idea to implementation. His classic example is "color cycling" animation in 1980s games: it didn't come from a top-down spec, but emerged because programmers understood indexed-color palettes deeply enough to use them in a way nobody had anticipated. In his view, a great engineer stays curious, refuses to treat abstraction layers as black boxes, and lets that deep understanding unlock new product possibilities.

The same principle applies to an entire engineering organization. When teams operate in silos and treat each other as black boxes, the organization loses the end-to-end visibility needed to pull off major shifts—Marlinspike points to Skype's struggles transitioning to mobile as an example. He also warns against cargo-culting the org charts of big tech companies, since many succeeded despite their current structure rather than because of it. The takeaway: both individual engineers and organizations need to cultivate curiosity and encourage understanding across team boundaries instead of walling knowledge off into compartments.

## [Redis Is Open Source Again. But Is It Too Late?](https://blog.abhimanyu-saharan.com/posts/redis-is-open-source-again-but-is-it-too-late)

In March 2024, Redis dropped its BSD license in favor of dual RSALv2/SSPLv1 licensing to stop cloud providers from selling managed Redis without contributing back. The move sparked immediate backlash: Amazon and Google backed Valkey, a Linux Foundation-hosted fork of Redis 7.2.4, and distributions like Arch Linux switched over to Valkey completely. With Redis 8, the company reversed course and added AGPLv3—a genuine copyleft open-source license—helped in part by the return of creator Salvatore Sanfilippo. Redis 8 folds in JSON, time series, and probabilistic data structures that previously lived in separate modules, and adds a beta `vector set` type for similarity search.

Even so, the author argues that broken trust is hard to repair: "Trust is built over years and lost in a moment." Many teams have already migrated their infrastructure to Valkey, which continues to gain momentum with strong enterprise backing, and Redis Ltd.'s decision to keep RSALv2 and SSPLv1 alongside AGPLv3 in a tri-license model leaves parts of the community skeptical of its long-term commitment. The practical verdict: teams already on Valkey have little reason to switch back, while for brand-new projects Redis 8 is once again a contender worth weighing.

## [Write the most clever code you possibly can](https://buttondown.com/hillelwayne/archive/write-the-most-clever-code-you-possibly-can)

Hillel Wayne offers a counterintuitive piece of advice: write the cleverest code you possibly can—as deliberate practice, not for production. By "clever," he means reaching for unfamiliar language features or domain concepts. Practicing this way pays off in four ways: combining powerful features teaches you how they interact; mastering unfamiliar concepts deepens your grasp of the language; you build fluency for the rare moments when performance or tooling constraints genuinely demand a tricky solution; and sharing non-production "cursed" snippets is a fun way to bond with teammates.

The key is separating practice from production code, where clarity and maintainability still come first. Wayne suggests three responsible outlets: solve a problem both ways and commit only the simple version, go wild in personal scripts and tools, or if a clever solution really is markedly better in production, document it thoroughly. His examples span Python pattern matching, JavaScript function composition, and pandas data transformations, and he points out that many idioms once dismissed as "too clever"—like list comprehensions—are simply standard language features used well.

## [Semantic Unit Testing](https://www.alexmolas.com/2025/04/09/semantic-unit-testing.html)

Semantic unit testing is the idea of using a large language model (LLM) to check whether a function's implementation matches the behavior described in its docstring, rather than writing traditional input/output assertions. The author's hypothesis is that a capable enough model, given sufficient context, can spot bugs without executing the code. His Python library `suite` uses the `inspect` module to extract a function's source code and docstring, recursively collects internal helper functions up to a configurable depth, bundles everything into a structured prompt for an LLM, and returns a pass/fail verdict with reasoning. In the example below, `multiply` actually performs addition—and the model flags the mismatch between docstring and implementation.

This approach adds a semantic review layer, integrates with pytest, supports async execution, and can run against local models to avoid sending proprietary code to external APIs. Still, the author is upfront about its limits: LLMs hallucinate and cannot be trusted blindly, token costs can get steep (a single pandas method consumed roughly 112k tokens), and traditional tests remain far more reliable. Semantic unit testing should therefore be treated strictly as a complement to, never a replacement for, standard unit tests.

```python
def multiply(x: int, y: int) -> int:
    """Multiply x and y"""
    return x + y  # Intentionally buggy implementation

tester = suite(model_name="openai/o3-mini")
result = tester(multiply)
# LLM detects that the implementation does not match the docstring
```

## [SOLID Principles in Java (With Real life Examples)](https://dev.to/chhavirana/understanding-solid-principles-in-java-with-real-life-examples-1ked)

SOLID is a set of five object-oriented design principles for keeping code understandable, flexible, and maintainable; this post walks through each one using a Java food-ordering system. For Single Responsibility, instead of a single `OrderService` that handles order placement, invoicing, and notifications all at once, the responsibilities are split across `OrderService`, `InvoiceService`, and `NotificationService`. For Open/Closed, instead of a `PaymentService` packed with `if/else` branches for every payment type, a `PaymentMethod` interface is implemented by `CardPayment`, `UpiPayment`, and others so new payment methods can be added without modifying existing code. For Liskov Substitution, an abstract `DeliveryMode` class has `BikeDelivery` and `ScooterDelivery` subclasses that honor the parent contract and can be swapped cleanly without surprises.

For Interface Segregation, rather than forcing every restaurant to implement a giant `RestaurantPartner` interface covering orders, nutrition info, and customer feedback, the design splits it into `OrderAcceptance`, `FeedbackHandler`, and `NutritionInfoProvider` so a small stall only implements what applies to it. Finally, Dependency Inversion is shown with `OrderNotifier` depending on an abstract `Notifier` interface instead of a concrete `EmailService`, making it trivial to swap in `SmsService` or another channel. The takeaway: SOLID isn't just textbook theory—it's a practical toolkit for writing clean code that adapts easily to new requirements.

## [A year on, Valkey charts path to v9 after break from Redis](https://www.theregister.com/software/2025/05/15/a-year-on-valkey-charts-path-to-v9-after-break-from-redis/852499)

One year after forking from Redis over its controversial license change, Valkey is showing strong momentum. Madelyn Olson, principal engineer at AWS and Valkey co-maintainer who helped lead the exodus from Redis, notes that the project just shipped version 8.1. Earlier, version 8.0 added per-slot metrics to improve cluster observability—a feature former Redis leadership had previously passed over. Rather than releasing an 8.2, the team is heading straight to version 9 to take on more invasive architectural changes. On support lifecycles, every release receives at least three years of support, while the final minor release of each major version gets five years, matching enterprise expectations for long-term stability.

Olson emphasizes keeping Valkey "not a single-vendor project" by expanding its maintainer ranks and Technical Steering Committee, with contributors like Percona's Ricardo Dias now working on it full time. She admits burning out during the first six months and believes spreading responsibility across organizations will keep the project sustainable. Valkey also collects no telemetry, relying instead on direct feedback from users and managed-service providers. Valkey's trajectory shows how an open-source fork can thrive when backed by open governance and genuine multi-company community investment.

## [Stack Overflow is almost dead](https://blog.pragmaticengineer.com/stack-overflow-is-almost-dead)

Stack Overflow, once an everyday destination for millions of developers, is in steep decline: according to data from the site's own Data Explorer, monthly question volume in May 2025 fell back to levels last seen at its 2009 launch. The slide happened in stages. Starting around 2014, better moderation tooling led to faster question closures and mass deletions of "low-quality" posts, leaving many users—especially newcomers—feeling unwelcome. The 2020 pandemic briefly boosted traffic as newly remote developers searched online instead of asking coworkers at the next desk, but the downward trend resumed soon after—two full years before ChatGPT launched, pointing to deeper structural issues. In 2021, Prosus acquired Stack Overflow.

The decisive blow arrived with ChatGPT in November 2022: question volume plunged as large language models offered faster, friendlier, and—in the author's view—comparably accurate answers, ironically trained on Stack Overflow's own archive. Orosz suggests the question is no longer whether the decline will continue, but when the site will wind down or be sold at a steep discount. Even so, developers' need to help each other won't disappear—it will simply move to Discord servers, group chats, and new community platforms.

## [Why I use WebAssembly](https://nasso.dev/blog/why-i-use-wasm)

The author shares why he reaches for WebAssembly (WASM), starting with the most compelling reason: it dramatically simplifies application state management. When computation runs directly on the user's machine, the app doesn't need to constantly talk to a backend server to track progress, eliminating complex polling or streaming setups. WASM also lets teams reuse battle-tested native code: Figma compiled its C++ vector graphics renderer to WASM and cut load times by 3x, while running FFmpeg in the browser enables completely offline media conversion without uploading files anywhere.

More importantly, the author views WASM as a "universal binary format" for sharing core logic across platforms—making the web just one more target alongside desktop. His own project, Nema Studio, a Digital Audio Workstation, shares the same core engine between its native and web builds. That powers a two-tier product strategy: casual users can try the web version with 80–90% of features right in their browser, while serious users download the full native app. Because "nobody starts out as a power user," the web build removes installation friction and acts as a funnel into the native application. He also gives a nod to Tauri as a lighter alternative to Electron thanks to using the OS webview instead of bundling Chromium.

---

*This post was rewritten by Claude Code with Opus 5.5 on 27/09/2026; reviewed and edited by Codex with GPT 6.1 Sol on 09/11/2026, and re-verified by Claude Code with Sonnet 5.5 on 16/11/2026.*
