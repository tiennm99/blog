---
title: "Newsletter #24"
date: "2025-05-11"
tags: [ "AI-Assisted", "Developer Productivity", "Management", "Code Quality", "System Design", "Performance", "AI" ]
categories: [ "Newsletter" ]
---

*Enjoy Newsletter #24.*

## [Google's principles for measuring developer productivity](https://newsletter.getdx.com/p/googles-principles-for-measuring-developer-productivity)

Abi Noda summarizes the paper "Measuring Productivity: All Models Are Wrong, But Some Are Useful" by Google researchers Ciera Jaspan and Collin Green. The core idea is that measuring developer productivity is fundamentally an exercise in modeling: every model omits details, so the goal is building a model that remains useful without creating perverse incentives. Drawing on years of internal research at Google, the authors distill five principles. First, avoid single-metric models, because no single metric captures the inherent trade-offs of engineering work. Second, measure all outcomes you care about and use multiple metrics per outcome; when two metrics measuring velocity move in opposite directions, that divergence is an important signal to investigate. Third, think carefully about the incentives your measurements create—when a measure becomes a target, it ceases to be a good measure. Fourth, cover all three dimensions of speed, ease, and quality rather than fixating on just one. Fifth, combine objective system logs with subjective self-reported survey data from engineers.

The article closes with practical advice. If your team is small enough to fit into a single conference room, you don't need productivity metrics—just sit down and talk to them. Larger organizations should start with developer surveys, which capture the holistic engineering experience far better than raw telemetry alone. Above all, define why you are measuring before choosing any metric.

## [In defense of ruthless managers](https://www.seangoedecke.com/ruthless-managers/)

Sean Goedecke divides engineering managers into two archetypes: empathetic managers, who invest emotionally in their reports and regularly go to bat for them against upper management, and "ruthless" managers, who view their job simply as transmitting the company's needs to engineers and vice versa. While Goedecke agrees that having an empathetic manager is generally great, he argues that ruthless managers are underrated for five reasons. First, they still want their engineers to be happy, because happy engineers perform better, are easier to manage, and don't quit. Second, they accumulate far more political capital with leadership, whereas empathetic managers who constantly push back on executives often burn through their capital right when you need them to advocate for your promotion. Third, they aren't emotionally weighed down by hard decisions, so they stay focused and unbothered. Fourth, they communicate bluntly without sugarcoating bad news or parroting corporate talking points—though they may occasionally lie or withhold information out of self-interest. Finally, they are predictable because they always align with upper management's priorities.

Goedecke stresses that this defense only applies to competent managers inside reasonably healthy companies. An incompetent, ruthless manager is a recipe for disaster, and given a free choice, most engineers should still pick an empathetic boss. Since we rarely get to choose our managers, though, understanding the strengths of both styles makes it easier to work effectively with whichever one you have.

## [AI ambivalence](https://nolanlawson.com/2025/04/02/ai-ambivalence/)

Nolan Lawson holds a master's degree in computational linguistics—having studied alongside the researchers who later coined the term "stochastic parrots"—but left the field because he grew tired of purely statistical approaches and preferred building software directly. For years he avoided generative AI: he was skeptical of AGI claims and disliked how autocomplete assistants turned programming into endlessly reading code rather than writing it. By 2025, with seemingly the entire industry adopting AI, he tried Claude and Claude Code and admitted they were far more capable than he expected: querying a large codebase, generating unit tests, or refactoring dozens of call sites to a new API pattern worked shockingly fast. The problem is that it drains the joy out of programming. He feels like a babysitter reviewing piles of machine-generated code for subtle bugs, where the strongest temptation is to stop reading altogether and surrender to "vibe coding."

Lawson doesn't offer a neat conclusion, instead capturing a mood of deep ambivalence. He still uses AI for low-stakes tasks like throwaway prototypes and unit tests, but resents how generative AI has taken over software engineering and the underlying message—as Ezra Klein put it—that human creativity is merely derivative. Caught between adapting to the new normal and keeping his manual coding skills sharp for the day "vibe-coded" systems inevitably catch fire in production, he admits nobody truly knows how this plays out.

## [Use Abstraction to Improve Function Readability](https://testing.googleblog.com/2023/09/use-abstraction-to-improve-function.html)

This installment of the Google Testing Blog's Code Health series, written by Palak Bansal and Mark Manley, compares two versions of a `createPizza` function in Go. The first version crams everything into a single function: preparing the dough and toppings, looping until the oven reaches temperature, baking the pizza, and boxing and slicing it. The second version consists of just three calls—`prepare`, `bake`, and `box`—each of which delegates to lower-level helpers like `addToppings` or `heatOven` until reaching leaf functions that handle concrete implementation details without calling further helpers. The second version is far easier to read because the first mixes multiple levels of abstraction: low-level mechanics like polling the oven thermometer sit right alongside intermediate steps like baking and high-level intent.

The takeaway is the Single Level of Abstraction principle: avoid mixing abstraction levels inside the same function, and instead compose functions at matching levels so the code reads top-to-bottom like a story with self-descriptive function names. This structure makes code easier to follow, debug, and reuse; the authors point readers to Robert C. Martin's *Clean Code* for a deeper dive.

## [How Apple Pay Handles 41 Million Transactions a Day Securely](https://newsletter.systemdesign.one/p/how-does-apple-pay-work)

Neo Kim breaks down Apple Pay's architecture through the story of a traveler tapping an iPhone at a London Underground turnstile, noting that the post is based on public research and may differ from Apple's internal implementation. When a user adds a card to Apple Wallet, the card details and device metadata are encrypted and routed through Apple to the payment network (such as Visa or Mastercard); the actual card number is never stored in full on the iPhone or on Apple's servers. Once the payment network verifies the card with the issuing bank, it generates a Device Account Number (DAN)—an irreversible token bound to that specific card and iPhone pair—which is stored inside the iPhone's Secure Element, a dedicated tamper-resistant hardware chip. At checkout, the point-of-sale terminal sends transaction details to the iPhone over NFC; the user authenticates via Touch ID or Face ID, and biometric data stays strictly inside the isolated Secure Enclave processor, never leaving the device.

Next, the Secure Element combines the DAN with transaction details to compute a dynamic cryptogram—similar to a time-based one-time password—and sends the authorization request through the merchant's acquirer without the merchant ever seeing the real card number. The payment network recomputes the cryptogram against its copy of the DAN to verify the transaction, then returns an approval code and a response cryptogram for the device to verify in turn. Built on the EMV contactless specification, Apple Pay works even when the iPhone has no cellular or Wi-Fi connection and is significantly safer than a physical card because the underlying card number is never exposed.

## [Four Kinds of Optimisation](https://tratt.net/laurie/blog/2023/four_kinds_of_optimisation.html)

Laurence Tratt opens with two observations: programmers are chronically over-optimistic about knowing where their programs spend time, and equally over-optimistic about knowing how to speed up the slow parts. The cure for the first is disciplined profiling; for the second, Tratt outlines four categories of optimization, each with its own trade-offs. First, using a better algorithm requires understanding your data distribution: selection sort is three times faster than bubble sort on random data, but much slower on already-sorted data, and hand-rolled "fast" algorithms are notorious for subtle bugs. Second, using better data structures—such as a sorted array with binary search for read-heavy static data, or shrinking struct field sizes when allocating millions of instances. Third, moving to a lower-level system: rewriting Python in Rust might yield a 60x speedup, whereas running the exact same code on PyPy instead of CPython can deliver a 4x speedup with almost zero effort. Fourth, accepting a less accurate answer—including heuristic local search that may miss the global optimum, or probabilistic/lossy approaches like Bloom filters, JPEG compression, and machine learning.

Tratt generally avoids jumping straight to a low-level rewrite because the return on engineering time is often poor, preferring simple wins first. He closes with three guiding rules: always pick the simplest optimization that meets your performance target because it introduces the fewest bugs; remember that human engineering time is expensive; and breadth of optimization knowledge matters more than narrow depth.

## [The Fifth Kind of Optimisation](https://tratt.net/laurie/blog/2025/the_fifth_kind_of_optimisation.html)

In this follow-up post, Laurence Tratt admits he left out a fifth optimization technique that he relies on constantly: parallelization. When he parallelized his Rust-based static site builder across multiple threads, build times in "quick" mode dropped from roughly 0.6 seconds to under 0.3 seconds, while full "deploy" builds ran more than 3x faster. Similarly, his `lang_tester` test harness runs test suites in parallel, cutting a test run on a 72-core machine from 37 seconds down to 2.5 seconds—a speedup that directly improves day-to-day developer flow.

He reflects on why he overlooked parallelization the first time around. First is hardware history: consumer multicore CPUs only became mainstream around 2005, and it took years before x86 and Arm memory models were well-specified enough to program against reliably. Second is language support: Java only got a sound memory model with JSR 133 in 2004, C and C++ waited until 2011, and shared-memory multithreading remained fraught with data races such as lost updates or compilers optimizing away unsynchronized writes. Languages built around immutable data or actor models avoided most of these pitfalls but often paid a performance penalty. For Tratt, Rust changed the equation via the `Send` and `Sync` traits and ownership rules: he has yet to hit a single data race in Rust, even if occasional `clone()` calls or subtle mutex deadlocks still crop up. Today, he designs for parallelism right from the start.

## Bonus: Interesting images from [ByteByteGo](https://bytebytego.com/)

![REST API Design Best Practices](https://substack-post-media.s3.amazonaws.com/public/images/4036e9a7-f2b6-476c-ad5d-48916db3b610_1309x1536.gif)
![How to Learn Backend Development?](https://substack-post-media.s3.amazonaws.com/public/images/2a933717-1d59-46a6-ba51-76e24ae048fc_1280x1502.gif)
![The Simplified Git Workflow](https://substack-post-media.s3.amazonaws.com/public/images/b9397d70-0232-4a8b-8b3e-edd4c15eb9bb_800x939.gif)
![Virtualization vs Containerization](https://substack-post-media.s3.amazonaws.com/public/images/1bc9340f-de4f-4767-b2f8-f4c6529e9eea_1309x1536.gif)
![How Netflix Built a Distributed Counter?](https://substack-post-media.s3.amazonaws.com/public/images/1e7afaab-de4b-4604-a557-22974fb2e3ea_1280x1532.gif)

## Bonus 2: Interesting videos from [ByteByteGo](https://bytebytego.com/)

[Why Everyone's Talking About MCP?](https://www.youtube.com/watch?v=_d0duu3dED4)

---

*This post was rewritten by Claude Code with Opus 5.5 on 27/09/2026; reviewed and edited by Codex with GPT 6.1 Sol on 09/11/2026, and re-verified by Claude Code with Sonnet 5.5 on 16/11/2026.*
