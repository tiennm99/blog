---
title: "Newsletter #60"
date: 2025-10-12
tags: ["AI-Assisted", "Diff Algorithm", "Go", "Write-Ahead Log", "Cloud Platforms", "Engineering Management", "Career Development"]
categories: ["Newsletter"]
---

*Enjoy Newsletter #60.*

## [Diff Algorithms](https://flo.znkr.io/diff/)

Florian Zenker introduces `znkr.io/diff`, a diff library in Go that he built from scratch because existing libraries didn't meet his needs. It works on arbitrary slices as well as text, returning either structured results or the familiar unified diff format. At its core is Myers' algorithm with O(ND) complexity, chosen because it works even on types that aren't comparable with standard operators and doesn't require hashing. The API offers `Edits()`/`Hunks()` for comparable types, `EditsFunc()`/`HunksFunc()` for arbitrary types with a custom comparison function, and the `textdiff` package for unified diffs.

The most interesting part is how he optimizes it. Preprocessing trims common prefixes and suffixes and strips elements that appear on only one side, cutting worst-case runtime by up to 99%. An anchoring technique inspired by patience diff finds elements that appear exactly once to split the input into smaller subproblems, reducing runtime by up to another 95%. Postprocessing applies Michael Haggerty's indentation heuristic to make diffs easier for humans to read. The library offers three modes: default (balanced), fast (sacrificing minimality), and minimal (shortest diff regardless of cost). His takeaway is that "different implementations of the same algorithm can produce wildly different results": diff quality depends heavily on implementation details and postprocessing, not just on which core algorithm you pick.

## [Building a Resilient Data Platform with Write-Ahead Log at Netflix](https://netflixtechblog.com/building-a-resilient-data-platform-with-write-ahead-log-at-netflix-127b6712359a)

Netflix's data platform team explains why they built a shared Write-Ahead Log (WAL) abstraction. At Netflix's scale, problems like data loss or corruption, inconsistency across data stores (such as dual writes to Cassandra and Elasticsearch), multi-partition updates, cross-region replication, and retrying failed messages in real-time pipelines had either caused outages or forced teams to roll their own bespoke solutions. WAL was created to give every critical application that level of protection out of the box: it records data mutations, guarantees durability, and reliably propagates changes to downstream systems.

The API is kept deliberately simple with a single `WriteToLog` endpoint. Each namespace configures where data is stored (Kafka, SQS, or a combination) along with settings like retry counts, allowing WAL to serve different roles depending on configuration: an SQS-backed delay queue to retry failed messages without hurting throughput, Kafka-backed cross-region EVCache replication, and two-phase-commit coordination for multi-partition writes in the Key-Value abstraction. Internally, producers and consumers are decoupled so backends can be swapped flexibly, every namespace gets a built-in dead-letter queue (DLQ) for failure handling, and WAL guarantees at-least-once delivery semantics. Teams using the Key-Value layer simply flip a flag to get all of these capabilities.

## [Vercel vs Cloudflare: Two Philosophies of Building for Developers](https://bharath.sh/writing/vercel-vs-cloudflare)

This post compares Vercel and Cloudflare as two distinct philosophies for serving developers, rooted in each company's origins and business model. Vercel grew out of frontend developer culture and puts developer experience and velocity first: infrastructure is nearly invisible, deployments feel "magical," and the dashboard is kept minimal to stay out of your way. Cloudflare grew out of network infrastructure and prizes control and transparency, with dashboards exposing granular technical metrics. As the author sums it up: Vercel optimizes for user confidence, whereas Cloudflare sells guarantees.

This contrast mirrors how the two companies make money. Vercel monetizes development velocity, encouraging developers to ship quickly and gradually upgrade to paid tiers. Cloudflare monetizes scale itself—sustained usage, bandwidth, and compute. Each side views the other critically: Cloudflare sees Vercel as hiding true costs, while Vercel sees Cloudflare as needlessly complex, yet both approaches make sense within their respective domains. As edge computing and AI workloads grow, the two platforms are converging, each striving to pair great developer experience with powerful underlying infrastructure.

## [Distracting Software Engineers Is Way More Harmful Than Most Managers Think](https://workweave.dev/blog/distracting-software-engineers-is-more-harmful-than-managers-think-even-in-the-ai-times)

This article argues that interrupting software engineers is far more damaging than most managers realize, and that the problem has worsened with the rise of remote work since COVID. The author cites several stats: meetings per employee have risen 13.5% since 2020, virtual meetings are up 60%, 92% of people multitask during meetings, and a study at Meta found engineers get only about two one-hour focus blocks per week. Reaching a state of deep flow takes roughly 45 minutes, and every interruption resets that timer to zero. Tasks like code review and debugging require deep concentration yet often get squeezed hastily between meetings. Even with AI coding tools, deep focus leads to fewer bugs and faster skill growth.

Proposed solutions include batching meetings into fixed time blocks, requiring a clear agenda, and inviting only people who are truly needed; eliminating recurring meetings, like Pylon's engineering team keeping calendars empty and coordinating only as needed; rethinking mandatory peer reviews by trusting strong engineers to ship changes directly; and having managers lead by example in protecting focus time. The author concludes that engineers need 4–5 uninterrupted hours a day to produce quality work.

## [Common Problems Managing Senior Engineers](https://emdiary.substack.com/p/common-problems-managing-senior-engineers)

This post describes four senior engineer archetypes that frequently challenge managers and how to coach each one. The Over-Engineer loves needlessly complex solutions; managers should anchor them to practical value by asking "what's the simplest thing that could possibly work?", requiring decision records that lay out options and trade-offs, and setting clear time or budget constraints. The Builder-First jumps straight into coding without designing first; show them that an imperfect design doc is fine, that design helps assess feasibility, estimate effort, and align the team, and that they can reuse familiar templates from past projects. The Ambiguity-Freezer freezes up when requirements are vague; coach them to ask clarifying questions about stakeholders, metrics, and success criteria, and apply inversion thinking—figuring out what would make the project fail and doing the opposite. The Soloist avoids delegating because doing it themselves feels faster; teach them to plan work in parallel streams, show how delegating frees them up for higher-impact problems, and use pair programming to build trust with teammates.

The overarching message is that these engineers' struggles stem from habits and blind spots rather than a lack of ability. As the author puts it, "They don't need micromanagement, they need coaching."

## [Career Advice, or Something Like It](https://brooker.co.za/blog/2025/06/20/career.html)

Marc Brooker advises staying away from "negative echo chambers" where complaining becomes the group's shared identity. Such communities create a sense of belonging in the short term but harm both your career and mental health over time; Brooker sets a personal threshold and leaves when roughly 20% of a group's content turns negative. He argues that people should consciously choose one of two paths: either focus on growing your career by looking for positives and things you can improve, or stay comfortable where you are and pour your energy into other parts of life, rather than getting stuck in cynicism.

Instead of spaces dominated by griping, spend time in "yes, and" environments alongside people doing admirable work and living lives you aspire to. Communities degrade when negativity takes over, so protecting them requires leading by example, sharing constructive perspectives, and occasionally moderating discussions; he admits that "doing this is socially hard. At the very least, it requires visibly modeling the good." In his view, sadness and anger rarely produce real change—only concrete action does.

## ~~[My Productivity Rules](https://www.16elt.com/2025/10/08/studying-while-busy/)~~

~~This post shares practical tips for improving study productivity, emphasizing planning, energy management, honesty about effort, daily reviews, and minimizing distractions. It outlines rules such as planning the next day the night before, resting when energy is low, being honest about how much real effort you put in, reflecting on daily progress, and removing distractions like phones or tempting apps.~~

~~**Key takeaways:**~~
~~- Plan the next day the night before to avoid morning procrastination~~
~~- Match study intensity to your energy levels throughout the day~~
~~- Be honest about how much real effort you are putting in~~
~~- Reflect on daily progress to improve future plans~~
~~- Eliminate distractions by keeping tempting apps out of sight~~

## Bonus: An interesting visual from [ByteByteGo](https://bytebytego.com/)
*Today I ran into a pretty annoying issue from storing too many collected images directly in the repo. Specifically, it took over 17 minutes to build this site on another machine :v*
```
...
                   | VI
-------------------+------
  Pages            | 587
  Paginator pages  | 130
  Non-page files   | 195
  Static files     |   2
  Processed images | 361
  Aliases          | 236
  Cleaned          |   0

Built in 1043990 ms
...
```
*So I decided to switch to using the original image URLs instead of committing images into the repo. The downside is that images might get taken down, and they won't be processed to reduce file size, which increases page load time. I'll try to update the images in older posts too (on some nice sunny day when I'm feeling diligent :3)*

![TCP vs UDP](https://substackcdn.com/image/fetch/$s_!KwvJ!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8ac50da4-feb8-4781-8bb2-e74244aa889f_2250x2814.png)

---

*This post was rewritten by Claude Code with Opus 5.5 on 27/09/2026.*
