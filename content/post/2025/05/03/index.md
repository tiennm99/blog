---
title: "Newsletter #16"
date: 2025-05-03
tags: [ "AI-Assisted", "Programming Languages", "Code Quality", "Readability", "Latency", "Tech Industry", "Career" ]
categories: [ "Newsletter" ]
---

*Enjoy Newsletter \#16.*

## [Choosing Languages](https://steveklabnik.com/writing/choosing-languages)

Steve Klabnik wrote this piece after Microsoft announced it was porting the TypeScript compiler to Go, sparking immediate community arguments of "why not C#?" and "why not Rust?". His view is simple: write your programs in whatever language you want. Technical constraints are usually contextual rather than absolute, and outsiders rarely know the real context of a project. Microsoft's primary reason is that they are porting an existing codebase rather than rewriting it from scratch, and the existing code is structurally quite close to Go, making the port much easier. Klabnik also dislikes the cliché "choose the right tool for the job," because almost nobody intentionally picks the wrong tool; what looks like a bad choice from the outside usually just reflects requirements we can't see.

The most personal part of the essay comes from 2013, when he was on the Rails team and publicly mocked someone who wrote a `grep` tool in Node, hurting the author. That experience made him realize his words carried weight and that the "culture of contempt" in the Ruby community at the time had rubbed off on him. When he joined the Rust community, he deliberately worked to build a culture that discussed Rust on its own merits rather than putting down other languages—which is why today's "rewrite it in Rust" crowd frustrates him so much. His closing message: people choose languages for their own reasons, and even when you disagree, there is no excuse to be a jerk about it.

## [How Long Should Functions Be?](https://tidyfirst.substack.com/p/how-long-should-functions-be)

Kent Beck argues that asking "how many lines long should a function be?" is the wrong question from the start, because software is grown rather than built all at once. No matter how short functions start out, they tend to grow over time, and the longer a function already is, the more likely it is to grow even longer. To test this, he measured the lengths of 12,513 functions in JUnit 5: most are just 1–4 lines long (5,491 of them are 2-line functions alone), while the longest is 74 lines. The data fits a power-law distribution remarkably well, with an exponent α ≈ 2.46, an R² of 0.96, and a mean length of about 3.49 lines.

Because it follows a power law, the central limit theorem does not apply: the larger the project, the higher the average function length, and the longest function will keep growing as the system expands. The right answer is therefore a distribution, not a single number: many short functions and a few long ones. We cannot change the fact that function lengths follow a power law, but we can steepen the slope of the distribution—meaning more short functions and a shorter maximum length. The only empirical result Beck knows of is research by Keith Braithwaite showing that test-driven development (TDD) correlates with a steeper slope.

## [What Makes Code Hard To Read: Visual Patterns of Complexity](https://seeinglogic.com/posts/visual-readability-patterns/)

While auditing a codebase for bugs, the author noticed himself getting mentally fatigued very quickly despite the code being high quality, and realized the culprit wasn't cyclomatic complexity as he had expected, but readability. Since there is no universally accepted metric for readability, he draws on the two closest proxies. Halstead metrics from the 1970s count operators and operands: the more there are, the more a reader has to reason about how they interact. SonarSource's Cognitive Complexity adds points whenever control flow breaks linear order and whenever control structures are nested. Beyond those, he examines function shape, naming, and variable lifespans.

From this analysis, he distills 8 visual patterns that apply across languages: write small functions with few variables and operators; avoid esoteric syntax in favor of idiomatic project patterns; break long `map`/`filter` chains or complex expressions into logical groups using helper functions or intermediate variables; keep conditionals short and avoid mixing multiple boolean operators; never use `goto` outside rare special cases; minimize nesting, extracting helper functions when needed; choose clear, distinct variable names and avoid variable shadowing; and keep variable lifespans as short as possible. Together, they form a practical vocabulary for code review discussions.

## [IO Devices and Latency](https://planetscale.com/blog/io-devices-and-latency)

Benjamin Dicken (PlanetScale) uses interactive visualizations to trace the history of storage devices and their latency profiles. Magnetic tape stores data sequentially, making random access painfully slow. Hard disk drives (HDDs) use rapidly spinning magnetic platters and a moving read/write head, dramatically improving random access times. SSDs have no moving parts, making them far faster and capable of parallel reads and writes, though performance can dip when the drive must run garbage collection to erase stale pages before writing new data.

In the cloud, providers typically decouple storage from compute using network-attached block storage like EBS. This improves durability and makes scaling capacity easy, but each read or write takes around 250 microseconds compared to roughly 50 microseconds on a locally attached NVMe drive—while a CPU accessing RAM takes only about 100 nanoseconds. On top of that, IOPS are capped: EBS GP3 defaults to 3,000 IOPS, and going higher costs extra. The article serves as an introduction to PlanetScale Metal, where each database (Vitess or Postgres) runs on locally attached NVMe drives with one primary and two replicas for durability, allowing zero-downtime storage scaling and uncapped IOPS.

## [The good times in tech are over](https://www.seangoedecke.com/good-times-are-over/)

Sean Goedecke observes that for nearly a decade, being a software engineer was extraordinarily comfortable: generous perks, rare layoffs, and being treated like resident geniuses. Over the past two years, everything has changed—layoffs began in 2023, and companies like Meta now publicly cut employees labeled as low performers. According to Goedecke, the root cause is interest rates. Throughout the 2010s, near-zero interest rates meant investors flooded tech companies with cheap capital, fueling massive hiring sprees and speculative projects regardless of profitability. When interest rates rose to around 5% in 2023, profitability suddenly mattered. COVID only created a temporary boom, and AI is not yet the driver behind layoffs.

As a result, companies are forced to focus on the handful of priorities leadership actually cares about, while budgets for open-source contributions and developer experience get slashed. Goedecke advises engineers to accept that their personal interests may now conflict with their employer's; you can still pursue what you believe is right, but it comes at a career cost, especially for junior engineers. The silver lining is that the tech industry is now closer to reality and the rules of the game are clearer: generating value for the company is rewarded, failing to do so is penalized, and "value" means advancing leadership's specific plans.

## ~~[Once You're Laid Off, You'll Never Be the Same Again](https://mertbulan.com/2025/01/26/once-you-are-laid-off-you-will-never-be-the-same-again/)~~

Mert Bulan recounts the day he was laid off alongside most of his teammates. Looking back, he points out five warning signs: team events abruptly canceled; employees receiving notifications about incoming packages (boxes for returning company equipment); leadership lacking clear direction and constantly reorganizing; mandatory meetings appearing on calendars with no concrete agenda; and quarterly earnings season at public companies. What stung most was realizing that all his extra effort—teaching himself React Native, taking on special projects from the CEO, referring talented engineers—meant nothing in the end. During a layoff, you are just a row in an Excel spreadsheet decided by people who don't even know who you are.

According to the author, trust between companies and employees has been broken as layoffs happen even while companies post record profits. He also notes that German labor laws do not prevent mass layoffs. Many people who have been through a layoff now simply do the exact job they were hired to do. His advice for those who haven't been laid off yet: work your contracted hours; don't overextend yourself hoping for an internal promotion—switch companies to move up instead; keep interviewing elsewhere; use external offers to grow your compensation; and stop worrying so much about having short stints on your resume.

## Bonus: Interesting images from [ByteByteGo](https://bytebytego.com/)

![What is MCP?](https://substack-post-media.s3.amazonaws.com/public/images/840e868d-2c83-4b1b-a881-df1da6c6e332_1309x1536.gif)
![How to Design a System like Instagram](https://substack-post-media.s3.amazonaws.com/public/images/6ff106a0-de83-48b0-9eb4-3f8bf0d43a57_1280x1566.gif)
![How to load your websites at lightning speed](https://substack-post-media.s3.amazonaws.com/public/images/214c0c6c-2426-49d0-9fa8-cdb9ce089dcc_1280x1585.gif)

---

*This post was rewritten by Claude Code with Opus 5.5 on 27/09/2026.*
