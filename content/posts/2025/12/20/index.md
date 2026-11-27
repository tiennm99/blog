---
title: "Newsletter #73"
date: 2025-12-20
tags: ["AI-Assisted", "Newsletter", "Go", "Databases", "Performance", "Caching", "System Design"]
categories: ["Newsletter"]
---

*~~I recently learned that [OpenRouter now supports Claude Code integration](https://openrouter.ai/docs/guides/guides/claude-code-integration), so I'm giving it a try today. This post was generated using [Claude Code](https://claude.com/product/claude-code) + [Open Router](https://openrouter.ai/) + [Z.AI: GLM 4.5 Air (free)](https://openrouter.ai/z-ai/glm-4.5-air:free).~~ Enjoy Newsletter #73.*

## [System Design Deep Dive: Time Series Databases (TSDBs) Explained](https://designgurus.substack.com/p/system-design-deep-dive-time-series)

Time series databases (TSDBs) are purpose-built for data that streams in continuously in chronological order, such as IoT sensor readings, application logs, or server monitoring metrics. Every measurement is stored with a timestamp, making it straightforward to track fluctuations and spot trends. The article highlights three core characteristics: efficient data compression using delta encoding and run-length encoding to exploit repeating patterns; automated data lifecycle management through retention policies (deleting or archiving old data) and downsampling (aggregating older data into coarser intervals like hourly averages); and fast time-range queries because time serves as the primary index, with many systems able to query compressed data directly.

Compared with relational databases, TSDBs excel at high-frequency writes and aggregations over long time windows—such as "the per-minute average over 90 days"—thanks to columnar storage layouts, append-only writes, and time-based partitioning. Conversely, if an application requires frequent table joins or individual record updates, a relational database remains a better fit. This is handy knowledge when preparing for system design interviews.

## [How Memory Maps (mmap) Deliver 25x Faster File Access in Go](https://info.varnish-software.com/blog/how-memory-maps-mmap-deliver-25x-faster-file-access-in-go)

System calls carry kernel context-switch overhead that adds up when small operations are repeated millions of times. Author Per Buer (Varnish Software) introduces memory mapping (`mmap`): mapping a file directly into virtual memory and reading it via pointers instead of seeking and reading with `pread()`. In benchmarks of his Go library, random lookups dropped from 416.4 ns/op to 3.3 ns/op, and sequential iteration fell from 333.3 ns/op to 1.3 ns/op; working directly with pointers also reduces memory pressure and latency.

The weakness of `mmap` lies in writes: when writing to a page not yet in physical memory, the CPU triggers a page fault and the OS must allocate a new page and read the file contents from disk before the application can overwrite them, making performance entirely dependent on whether the page is already cached; `pwrite` is far more predictable. That is why Varnish Cache later added a `malloc` backend and Massive Storage Engines built on `io_uring`. In a real-world application building an HTTP-backed filesystem, replacing CDB file reads with `mmap` yielded 25x faster lookups.

## [Bloom filters](https://eli.thegreenplace.net/2025/bloom-filters)

A Bloom filter is a probabilistic data structure proposed by Burton Bloom in 1970 for quickly testing whether an element belongs to a set using minimal time and memory. It acts like a probabilistic cache: if it says "no," the element is 100% guaranteed not to be in the set; if it says "yes," there is a small probability of a false positive. That makes Bloom filters especially effective when most queries return negative results—for example, checking whether a key exists in an on-disk file before paying the cost of reading the file. Structurally, it consists of an array of *m* bits and *k* hash functions: on insert, the element is hashed by all *k* functions and the corresponding bits are set to 1; on lookup, a single 0 bit is enough to immediately conclude the element is absent.

Eli Bendersky walks through a step-by-step example along with a Go implementation that uses double hashing to generate *k* hash functions from two base hashes, plus the formulas for choosing optimal parameters: m/n ≈ -ln(ε)/ln²(2) and k = (m/n)·ln(2). For 1 billion elements and a 1% false-positive rate, the filter requires about 9.6 billion bits (roughly 1.2 GB) and 7 hash functions. Lookup cost is just *k* bit checks—effectively constant and independent of how many elements have been inserted or the characteristics of the data.

## [What the heck is AEAD again?](https://ochagavia.nl/blog/what-the-heck-is-aead-again/)

AEAD (Authenticated Encryption with Associated Data) is the modern encryption standard: TLS 1.3 models all encryption algorithms as AEAD, QUIC (the foundation of HTTP/3) mandates it, and Google's Tink library exclusively supports AEAD for data encryption. The author breaks down each part of the term. "Authenticated" means proving the ciphertext was not tampered with after encryption; previously, developers had to manually combine encryption with an HMAC step, which was notoriously error-prone (as seen in Apple's iMessage vulnerability). Libraries like libsodium bundled both steps into a single API to make misuse much harder.

"Associated Data" is unencrypted data that still needs protection against tampering. In a chat application, for example, the server needs to read `conversation_id` in plaintext to route messages; if an attacker in the middle swaps that ID for a different conversation between the same two users and the recipient doesn't authenticate it, the message still decrypts cleanly and gets processed in the wrong context. An AEAD API enforces simultaneous authentication of both the ciphertext and the associated data. Standardized AEAD algorithms like AES256-GCM and ChaCha20-Poly1305 are widely supported across libraries and languages; the author recommends following Tink's guidance unless your system has specialized requirements.

## [Ceilometer: Uber's Adaptive Benchmarking Framework](https://www.uber.com/in/en/blog/ceilometer-ubers-adaptive-benchmarking-framework/)

Every new server SKU, OS kernel upgrade, or configuration change at Uber must be thoroughly vetted before reaching production, but their legacy process was manual, fragmented across teams, and scattered results across spreadsheets. Ceilometer was built to solve this: an adaptive benchmarking platform featuring standardized test configurations for fair comparisons, containerized benchmark suites that hardware vendors can run themselves, and context-rich reporting. Its architecture comprises distributed test orchestration on dedicated clusters, a result ingestion and normalization service, blob storage, a centralized data warehouse, and an analytics service. It supports synthetic benchmarks, stateful database benchmarks via Uber's Odin platform, and stateless service benchmarks via Ballast.

Its two primary use cases are shape qualification for new server hardware—from early vendor development through testing inside Uber's environment—and infrastructure change verification alongside service owners to isolate, reproduce, and fix performance regressions. Ceilometer has also recently been used to validate "touchless" upgrades from cloud providers. Future directions include deeper AI/ML integration, broader ecosystem support, advanced anomaly detection, and component-level utilization metrics.

## [Useful patterns for building HTML tools](https://simonwillison.net/2025/Dec/10/html-tools/)

Simon Willison uses the term "HTML tools" for small single-file applications that bundle HTML, JavaScript, and CSS together; over the past two years he has built more than 150 of them, mostly written by LLMs. This post distills design patterns from that experience: keep each tool in a single file, avoid React or build steps, and load dependencies from CDNs; prototype quickly in Artifacts or Canvas before moving to a coding agent as the project grows more complex; and self-host your tools rather than leaving them on LLM platforms that run inside restrictive sandboxes.

On the technical side, he recommends using copy-and-paste as a primary I/O channel, storing state in the URL for easy sharing, using `localStorage` for API keys or larger state, collecting CORS-friendly APIs (including calling LLMs directly from the browser), and supporting local file uploads and generated file downloads. Pyodide and WebAssembly open up running Python or heavy libraries right in the browser. He also encourages building debugging tools to explore browser capabilities, remixing existing tools into new ones, and archiving prompts and conversation transcripts alongside the code. Finally, he encourages readers to start their own collections hosted on platforms like GitHub Pages.

## [Memory Allocation in Go](https://nghiant3223.github.io/2025/06/03/memory_allocation_in_go.html)

This post takes a deep dive into memory allocation in the Go runtime—essential knowledge for optimizing application performance. Go manages the heap across three tiers: `mheap` manages global memory in pages and spans, `mcentral` distributes spans by size class, and `mcache` acts as a per-processor (`P`) local cache enabling fast lock-free allocations. Objects are grouped into three categories: tiny (under 16 bytes with no pointers, packed together into 16-byte blocks by a dedicated allocator), small (16 to 32,760 bytes, managed via spans across 68 size classes), and large (over 32,760 bytes, allocated directly from `mheap`).

A goroutine's stack starts at 2 KB and doubles as needed using contiguous stacks, replacing the segmented stacks that caused performance cliffs in older Go versions. The compiler's escape analysis decides whether a variable lives on the stack or the heap to guarantee memory safety. Three case studies at the end demonstrate how to reduce allocations: reusing a slice's backing array, grouping multiple variables into a single struct, and recycling objects with `sync.Pool`. Understanding these mechanics helps Go developers write efficient code and avoid memory-management bottlenecks.

## [System Design Masterclass: Building a Global CDN and Edge Caching Strategy](https://designgurus.substack.com/p/system-design-masterclass-building)

This guide walks step by step through designing a global Content Delivery Network (CDN) and edge caching strategy around one core principle: move content closer to users. First, identify where your users are and classify content into static (images, CSS/JS files, video) and dynamic (API responses, personalized pages). Next, pick a CDN provider with Points of Presence (PoPs) near your main user base and route intelligently using Anycast or GeoDNS; very large services can adopt a multi-CDN setup for redundancy. Then configure caching rules: set long TTLs (days or weeks) for static assets, handle dynamic content carefully with short TTLs or a few seconds of micro-caching, and design clean cache keys.

To keep users from seeing stale content indefinitely, combine three cache invalidation approaches: letting TTLs expire naturally, purging manually via API, and versioning filenames. Finally, continuously monitor cache hit ratios, measure performance across regions, test failure scenarios, and take advantage of CDN features like DDoS mitigation and SSL offloading. The author likens a CDN to a network of neighborhood library branches around the world, letting readers borrow books from their local branch instead of traveling to the central library.

## [Protect Your API: A Developer's Guide to Rate Limiting and Throttling](https://designgurus.substack.com/p/system-design-blueprint-designing)

Every system has finite resources, and a sudden traffic spike, a credential-stuffing bot, or even a buggy frontend loop can overwhelm a server. Rate limiting puts a cap on how many times a user can perform an action within a given time window, much like speed limit signs on a highway. It helps mitigate DDoS attacks (though it cannot stop every type) by flagging IP addresses sending abnormal request volumes, ensures fair resource allocation so one "noisy neighbor" doesn't slow the app down for everyone else, and prevents brute-force login attacks by locking accounts after a handful of failed attempts.

Rate limiting is typically placed at the application or middleware layer: each request is identified by IP address, user ID, or API key, its recent call count is checked against the allowed threshold, and excess requests are rejected with HTTP `429 Too Many Requests`. The post introduces four common algorithms: Token Bucket, which allows short bursts and is used by Amazon and Stripe; Leaky Bucket, which smooths traffic into a steady outflow rate ideal for database writes; plus Fixed Window and Sliding Window. Later sections discuss implementing distributed rate limiting with Redis, a frequent topic in system design interviews.

## [ACID vs BASE: The System Design Interview](https://designgurus.substack.com/p/acid-vs-base-the-system-design-interview)

Every large-scale system has to balance speed against reliability, and when designing a database layer, you must choose between two philosophies: ACID and BASE. ACID is the "strict perfectionist" and the gold standard of relational databases like MySQL and PostgreSQL: Atomicity ensures a transaction either completes in full or rolls back via logs; Consistency enforces schema constraints; Isolation uses locks so two people cannot buy the last ticket at the same time; and Durability writes changes to a write-ahead log so data survives crashes. ACID's weakness is that it is very hard to scale horizontally across hundreds of servers.

BASE emerged for the big-data era and is common in NoSQL databases like Cassandra, DynamoDB, and MongoDB: the system stays Basically Available, its state may change over time as replicas sync (Soft State), and data reaches Eventual Consistency—much like how an Instagram photo you post might take a few seconds to show up for your friends. ACID fits financial systems, inventory management, and medical records; BASE suits social networks, real-time analytics, and content delivery. Put simply, ACID is pessimistic and locks everything, while BASE is optimistic and runs fast; the deciding question is, "If the data is wrong for two seconds, does anyone lose money?"

## [Hash tables in Go and advantage of self-hosted compilers](https://rushter.com/blog/go-and-hashmaps/)

Go has no built-in set type, so developers commonly use a map to store unique values. A well-known trick is to use `map[int]struct{}` instead of `map[int]bool`, since an empty struct takes 0 bytes and the value slot shouldn't consume any memory. However, when the author applied this in production, memory usage didn't budge—even though both Google searches and LLMs (with web search enabled) insisted the trick still worked in Go 1.24.

Because the Go compiler is self-hosted (written in Go itself), the author could easily read the runtime source code and track down the reason. Starting in Go 1.24, maps switched to a Swiss Tables implementation where keys and values are stored together inside a single slot struct. When the last field of a struct has size 0, the compiler forces it to occupy 1 byte so pointers to it don't point past the allocation, and then adds 7 bytes of padding to align with the 8-byte `int` key; `bool` also takes 1 byte, so both types end up using the exact same amount of memory. Prior to Go 1.24, keys and values lived in separate arrays, allowing the compiler to omit the value array entirely for `struct{}`. The takeaway: the old trick no longer saves memory while making code harder to read—and don't blindly trust everything an LLM tells you.

## [Gist of Go: Concurrency](https://antonz.org/go-concurrency/)

*Gist of Go: Concurrency* is an interactive book by Anton Zhiyanov that teaches concurrent programming in Go from the ground up through hands-on exercises. Unlike resources that merely introduce goroutines, channels, and `select` before leaving readers to fend for themselves—or list concurrency patterns without explanation—the book focuses on truly understanding and properly applying these primitives. Each exercise is short enough to solve in about a page of code while staying grounded in realistic scenarios, runs right in the browser with automated tests for instant feedback, and includes reference solutions with explanations. It targets developers who already know basic Go (up through interfaces and error handling), with no prior knowledge of goroutines or channels required.

Topics progress from goroutines, channels, pipelines, time, and `context` to wait groups, data races, race conditions, semaphores, signaling, atomics, testing, and runtime internals. The book features over 500 interactive examples, 50 self-check exercises with solutions, and a 448-page PDF edition, all 100% original and human-written without AI. It grew out of a Go concurrency course the author launched in 2022 that 250 students have completed with an average 5-star rating; you can read it online or purchase full access to all exercises.

## [The State of AI Coding 2025 | Greptile](https://www.greptile.com/state-of-ai-coding)

Greptile published a cross-industry report on AI software development trends in 2025, drawing on internal data from pull requests reviewed by its tool alongside public package download metrics from PyPI and npm. On engineering velocity, median PR size grew 33% between March and November 2025 (from 57 to 76 lines changed), lines of code per developer rose 76% (from 4,450 to 7,839), and mid-sized teams of 6–15 engineers saw an 89% jump. On tooling adoption, `mem0` captured 59% market share among AI memory packages, the vector database market remains fragmented (led by Weaviate at 25%), `CLAUDE.md` is the most popular AI rules file format at 67%, the Anthropic SDK reached 43 million monthly downloads (an 8x increase), and LiteLLM grew 4x to 41 million.

On model trends, the OpenAI SDK still leads with 130 million downloads, but the OpenAI-to-Anthropic download ratio narrowed from 47:1 in January 2024 to 4.2:1 by November 2025. A performance benchmark compared GPT-5.1, GPT-5-Codex, Claude Sonnet 4.5, Claude Opus 4.5, and Gemini 3 Pro as coding agent backends: Anthropic's two models delivered the fastest time to first token (under 2.5 seconds at p50), OpenAI's two models achieved the highest output throughput, and Gemini 3 Pro trailed on both metrics. The report concludes with a roundup of recent research on foundation models and applications.

## Bonus

### Images

![A Guide to Retry Pattern in Distributed Systems](https://substackcdn.com/image/fetch/$s_!VQTW!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fee73de9e-d2ee-407a-ac6e-93679bdd887d_2250x2624.png)


**Verdict:** *URL processing was painfully slow—it took me way more time than usual to process a single URL. The summaries varied wildly in length and even had random Chinese characters mixed in from time to time (probably due to Z.AI's model).*

---

*This post was rewritten by Claude Code with Opus 5.5 on 27/09/2026; reviewed and edited by Codex with GPT 6.1 Sol on 09/11/2026, and re-verified by Claude Code with Sonnet 5.5 on 16/11/2026.*
