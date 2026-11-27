---
title: "Newsletter #2"
date: 2025-02-16
tags: ["AI-Assisted", "Newsletter", "Databases", "Redis", "Rate Limiting", "Cloudflare", "LLMs"]
categories: [ "Newsletter" ]
---

<i>
Hello everyone, right on schedule, here is my Newsletter #2. I went on a weekend trip to Xuyên Mộc and just got back today, which is why this issue is going up a bit late.

Without further ado, let's jump straight into MiTi's Newsletter #2.
</i>

## [Some things to expect in 2025](https://lwn.net/Articles/1003780/)

In keeping with his New Year tradition, LWN.net's Jonathan Corbet shares a set of predictions for the Linux and free software communities in 2025. Sched-ext—the mechanism for loading CPU schedulers from user space as BPF programs—will ship in more distributions, sparking a wave of new scheduling ideas tested rapidly on real production systems. More Rust code will land in the Linux kernel, this time in components that everyday users will actually run without realizing it. The author also expects another XZ-style backdoor attempt to come to light, and predicts that single-maintainer projects will increasingly be viewed as a risk, both for security and maintainer burnout.

A major project may discover it has merged a substantial amount of AI-generated code that the contributor didn't actually understand, forcing a revert; alongside that, efforts to build truly free generative AI systems will continue. Free software foundations will keep facing funding struggles, though a dedicated fund to support maintainers may emerge. More cloud-dependent consumer devices will turn into "bricks" when their manufacturers go under, creating opportunities for open solutions like Home Assistant; open hardware like the OpenWrt One will gain traction, and alternative mobile Linux distributions will see renewed interest. Finally, the author worries that global geopolitical tensions will spill over into the community and urges everyone to hold fast to the spirit of building systems for all and welcoming contributions from anyone.

## [Why you should use compact table columns](https://vladmihalcea.com/compact-table-columns/)

Vlad Mihalcea explains why choosing compact column types matters when designing database schemas. Relational database management systems cache disk pages in a Buffer Pool (such as PostgreSQL's shared buffers); because RAM is orders of magnitude faster than SSDs, narrower columns pack more rows and index entries into each page, allowing more queries to be served directly from memory. StackOverflow is a prime example: they serve roughly 11,000 queries per second from a single active SQL Server node thanks to 1.5 TB of RAM fronting a 2.8 TB database and a Frugal Schema—avoiding 16-byte UUIDs for primary and foreign keys, using 4-byte `int` or 1-byte `tinyint` instead of `bigint` for most primary keys, keeping enums to 1 byte, and bounding `VARCHAR` column lengths.

The author backs this up with concrete measurements. On MySQL, in a five-million-row `customer` table, using `tinyint` instead of `smallint` for a single indexed foreign key saves about 71.59 MB; across ten such columns on a 100-million-row table, that adds up to roughly 14.3 GB. PostgreSQL lacks a 1-byte integer type and enforces column data alignment, so columns should be ordered using "Column Tetris" to avoid wasted padding bytes; even so, using `smallint` instead of `int` shrinks the `customer` table by 38 MB. The takeaway: right-sizing column types is a proven performance optimization strategy that has served StackOverflow well for over 15 years.

## [Rate limiting with Redis: An essential guide](https://foojay.io/today/rate-limiting-with-redis-an-essential-guide/)

Raphael De Lio opens with familiar encounters with rate limiting, such as "429 Too Many Requests" errors or tiered API quotas. Rate limiting prevents abuse, ensures fair access, smooths traffic spikes, controls costs, and protects service availability: Figma famously stopped a mass-invite spam attack using a Redis-backed rate limiter, while Stripe relies on rate limiting to keep misconfigured scripts or bad actors from monopolizing resources. Redis is a popular choice thanks to its speed, reliability, atomic operations, persistence options, and Lua scripting; GitHub also migrated to a Redis-based rate-limiting setup with client-side sharding.

The article compares five common algorithms. Leaky Bucket processes requests at a steady rate, ideal for smooth traffic flows but unforgiving of bursts; Token Bucket allows short bursts as long as tokens remain; Fixed Window Counter is simple to implement but vulnerable to boundary spikes across adjacent time windows; Sliding Window Log is the most accurate but consumes significant memory and CPU at scale; and Sliding Window Counter balances accuracy with resource efficiency. Choosing the right algorithm depends on traffic patterns, required precision, resource constraints, and user experience. As the author notes, rate limiting isn't just about setting caps—it's about designing efficient, fair, and user-friendly systems; follow-up posts implementing each algorithm in Java and Redis will roll out weekly.

## [Why does Cloudflare Pages have such a generous Free tier?](https://mattsayar.com/why-does-cloudflare-pages-have-such-a-generous-free-tier/)

Matt Sayar, who hosts his personal site on Cloudflare Pages, wonders why there are so many high-quality free hosting tiers available today. The biggest concern with free hosting is bandwidth, since a surprise viral post can stick you with a massive bill or knock your site offline. Comparing providers, GitHub Pages has a soft limit of 100 GB per month, Netlify and AWS S3 offer around 100 GB, GitLab Pages throttles by requests per minute, whereas Cloudflare Pages offers completely unlimited bandwidth.

The author outlines three practical reasons behind this generosity. First, static sites are tiny—his own site is only about 2.2 MB—so with Cloudflare's massive edge network, aggressive caching, and optimization techniques, the marginal cost of serving them is negligible. Second, Cloudflare benefits from a fast, secure internet: the more people and businesses come online, the more enterprises need commercial security products—which is exactly what Cloudflare sells, in the same spirit as its free 1.1.1.1 DNS resolver and unmetered DDoS protection. Third is the classic freemium flywheel: developers try the free tier, have a great experience, and later champion Cloudflare's paid plans at work. Although the author initially couldn't find an official statement explaining the bandwidth policy, the Hacker News community pointed him to a Cloudflare post affirming their commitment to the free tier; even so, he keeps a mirror on GitHub just in case policies change.

## [How I program with LLMs](https://crawshaw.io/blog/programming-with-llms)

David Crawshaw reflects on a year of actively programming with large language models (LLMs) and concludes that they deliver a clear productivity boost. He uses LLMs in three ways: code autocomplete, search engine replacement, and chat-driven programming—the hardest mode to master, but also the most valuable. Chat is especially helpful when you know what needs to be written but lack the energy to set up a new file and look up library APIs: the LLM produces a first draft with good structure, the right imports, and a few bugs, and fixing bugs is much easier than staring at a blank page. His advice is to frame prompts like exam questions: specific goals, self-contained context, and verifiable outputs—and always compile and run tests before reading the generated code closely.

As a concrete example, he walks through writing a reservoir sampler in Go to estimate quartiles. The LLM generated a well-structured package with clean interfaces, though the initial code failed to compile due to an unused variable and included fabricated expected values in the unit test. When prompted, it wrote a naive reference implementation for comparison and a fuzz test that initially passed the wrong argument types, which it fixed as soon as the compiler error was pasted back; in the author's experience, over 80% of tool-reported errors can be resolved by the LLM on its own. He argues that LLMs shift traditional software engineering trade-offs: favoring smaller packages, more thorough tests, and a looser adherence to DRY—such as generating a 200-line custom wrapper for the exact subset of an API you need rather than pulling in a bloated official SDK. He is currently automating these workflows at sketch.dev.

## Bonus

This week comes with quite a few bonuses from various sources.

### Bonus #1: A couple of ebooks I found

- [Designing Distributed Systems](https://info.microsoft.com/rs/157-GQE-382/images/EN-CNTNT-eBook-DesigningDistributedSystems.pdf)
- [Quastor Summaries](https://drive.google.com/file/d/1U7EchvgzCjTtF5JzGVVCFgjXC-qw7lIG/view)

### Bonus #2: Interesting images from [ByteByteGo](https://bytebytego.com/)

![Cookies Vs Sessions Vs JWT Vs PASETO](https://substack-post-media.s3.amazonaws.com/public/images/11b53f30-8dba-4520-9b1a-425b54b9b84a_1280x1585.gif)
![Algorithms you should know before taking System Design Interviews](https://substack-post-media.s3.amazonaws.com/public/images/fdbcc119-8f5d-4d27-9a4b-2c8bde82b537_4026x8030.jpeg)
![Top 6 Load Balancing Algorithms](https://substack-post-media.s3.amazonaws.com/public/images/12dffcce-f231-48cc-915f-d53c0f8bce0c_3735x3573.jpeg)

---

*This post was rewritten by Claude Code with Opus 5.5 on 27/09/2026.*
