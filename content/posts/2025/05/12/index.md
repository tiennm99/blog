---
title: "Newsletter #25"
date: "2025-05-12"
tags: [ "AI-Assisted", "Software Engineering", "Career Development", "LLM Research", "Open Source", "AI Coding", "Productivity" ]
categories: [ "Newsletter" ]
---

*Enjoy Newsletter #25.*

## [The 13 software engineering laws](https://newsletter.manager.dev/p/the-13-software-engineering-laws)

Anton Zaides rounds up 13 classic "laws" every software engineer and engineering manager should know. On time and staffing: Parkinson's Law (work expands to fill the time allotted) is counterbalanced by Hofstadter's Law (it always takes longer than you expect), meaning estimation only improves through practice, communication, and flexible scope. Brooks's Law reminds us that adding people to a late software project makes it later. Conway's Law states that system architecture mirrors an organization's communication structure; Flo applied the "Inverse Conway Maneuver" by embedding iOS, Android, and backend engineers into cross-functional teams to ship 20–30 releases per day. Cunningham's Law offers a clever way to get unstuck: open a pull request—even if you aren't sure it's right—and the owning team will quickly jump in to show you the right way.

On products and teams: Sturgeon's Law (90% of everything is crud) and Zawinski's Law (every program attempts to expand until it can read mail) warn against feature bloat, while Hyrum's Law guarantees that with enough users, every observable behavior of your system will be depended on by someone, making removals painful. Price's Law (half the work is done by the square root of the total number of contributors) and the Ringelmann Effect (individual effort drops as group size grows) explain why small teams with clear ownership outperform large ones. Goodhart's Law (when a measure becomes a target, it ceases to be a good measure) is balanced by Gilb's Law (imperfect measurement beats no measurement at all). Rounding out the list is Murphy's Law. Zaides concludes that while these aren't physical laws of nature, they are invaluable mental models.

---

## [The Curve is Bending: Predictions on near-term AI inference spending](https://grantslatton.com/the-curve-is-bending)

Grant Slatton, creator of the high-performance spreadsheet engine Row Zero, argues that AI has just crossed an inflection point where the economic value it generates for real-world software engineering exceeds its cost. His personal AI spend jumped from $100/year in 2023 to roughly $5,000/year in 2025. For him, `o1-pro` was the first model that felt reliably useful, performing on par with a junior engineer on self-contained single-file tasks—such as pinpointing a bug given a large Rust file, a git diff, and failing test output. He uses Zed Editor's prompt library to generate repetitive spreadsheet functions (cutting 20 minutes of work down to 2), writes small LLM-powered CLI utilities for himself, and used Claude Code—sometimes running three sessions in parallel—to rewrite the entire backend of his personal website, finishing what he estimated as a 100-hour job in under 10 hours for a few hundred dollars.

Looking ahead from April 2025, Slatton estimates AI tools currently boost his overall productivity by ~1.1x and expects that to reach 2–3x by late 2026. Frontier models like `o3-pro` will initially be expensive, but for engineers earning over $100/hour, an annual AI inference budget of $10,000–$50,000 is easy to justify—and by Jevons paradox, falling per-token prices will only increase total spending. He notes that models still lack the architectural "taste" of a senior engineer, predicts coding agents will match new CS grads by the end of 2026, and advises junior developers to focus on cultivating senior-level judgment as quickly as possible.

---

## [Open-Source is Just That: Understanding Boundaries in Open Source](https://vale.rocks/posts/open-source-entitlement)

Declan Chidlow speaks out against the growing sense of user entitlement directed at volunteer open-source maintainers. As Chidlow points out, open-source software grants specific rights defined by its license—and merely making source code public does not even make a project open source; it does not automatically mean a project accepts external contributions, offers user support, owes anyone new features, or owes anyone the maintainer's personal time, and users remain bound by the license terms. Having permission to use code under a license does not entitle anyone to demand unpaid labor from its author. He criticizes users who spam issue trackers or aggressively demand support, commenters who defend that behavior, and especially profitable companies that build on open source without giving back instead of funding the maintainers they depend on.

For projects that do welcome engagement, asking for help respectfully means searching existing issues and documentation first, providing complete reproduction details upfront, staying patient and polite, using official channels, and contributing small fixes or docs improvements where you can—and even when you sponsor or pay a maintainer, "money does not replace manners." He encourages the community to respectfully stand up for maintainers, urges maintainers to set firm boundaries, and warns against flooding projects with thoughtless AI-generated issues and pull requests. The bottom line: access to source code is not access to someone else's time and labor.

---

## [The Insanity of Being a Software Engineer](https://0x1.pt/2025/04/06/the-insanity-of-being-a-software-engineer/)

Vitor Sousa Pereira takes a satirical look at the ever-expanding mountain of knowledge a single software engineer is expected to master. At first, you just needed a couple of languages and tools, plus your company's web framework of choice—Rails, Django, or Laravel—alongside CSS, which you can study your whole life and still not understand why a layout broke. Then React arrived, companies decided they didn't want to hire separate specialists, and the "full-stack developer" was born—bringing TypeScript, Redux, webpack/esbuild/rollup configs, Prettier, and ESLint along for the ride. Next, DevOps replaced dedicated sysadmins, so developers had to learn Docker, AWS, and Terraform or Pulumi too. Getting promoted into management means learning an entirely new profession—estimating timelines, delegating, writing specs, running annual performance reviews—and unless the company is growing fast, you still have to do all your old IC work on top of it.

Pereira mentions a recruiter recently reaching out for a role demanding senior-level expertise across Rails, Hotwire, *and* native mobile development simultaneously. While acknowledging that software complexity exists for real reasons, he asks what happened to specialization: when building a house, you hire an architect, a structural engineer, an electrician, a plumber, and dozens of other trades—nobody expects one person to do it all. He closes half-jokingly that maybe a future where we build entire applications with a few AI prompts wouldn't be so bad after all.

---

## [The day I taught AI to understand code like a Senior Developer](https://nmn.gl/blog/ai-understand-senior-developer)

Namanyay argues that today's code-generating LLMs don't truly understand a codebase—they act like glorified autocomplete tools that forget where files live, duplicate existing helpers, and ignore established design patterns because they only see a narrow context window. Junior developers focus on the "what" and "how," whereas senior developers focus on the "why" and "what if," holding a mental model of the entire system and anticipating ripple effects; current LLMs behave much more like juniors. His solution is modeling the codebase as a hierarchical knowledge graph using an algorithm he calls Ranked Recursive Summarization (RRS): starting at leaf files, ranking their importance, and recursively summarizing upward into parent directories. Because plain RRS still lost domain-specific nuance, he evolved it into Prismatic RRS (PRRS), which summarizes the codebase through multiple "prisms" such as architecture, data flow, and security.

With this multi-perspective context, the AI knows where new files belong, which patterns to follow, and how to extend existing abstractions instead of reinventing them—while also surfacing technical debt, security gaps, and speeding up onboarding for human engineers. He packaged this approach into a product called Giga AI, but also shares how developers can apply the idea manually: write concise summaries for key directories and files, have AI refine them, maintain perspective-specific docs, and feed the relevant summaries into context. His core belief: AI should amplify human creativity rather than replace it.

---

## [Why Companies Don't Fix Bugs](https://idiallo.com/blog/companies-dont-fix-bugs)

Ibrahim Diallo opens with the famous GTA Online story: a player named `t0st` diagnosed why the game's online mode took 20 minutes to load, fixed it with 13 lines of code that cut load times by 70%, and was awarded $10,000 by Rockstar—after the bug had sat in production for eight years. Rather than blaming "lazy developers," Diallo traces the typical lifecycle of a bug inside a large company: in year one, an engineer proposes fixing the slow JSON parser, the product manager asks "is it in the spec?", and it gets filed under tech debt; by year three, all engineering capacity is locked into expansion packs and paid cosmetics; by year six, the ticket is auto-archived because the codebase has been rewritten twice; in year eight, a newly hired developer discovers the exact same bug all over again.

He identifies four structural reasons bugs go unfixed: roadmap-driven development pushes any fix not tied to a feature request to the bottom of the backlog; constant employee turnover erodes institutional knowledge; touching poorly tested, undocumented legacy code carries high career risk for little reward; and quality-of-life improvements don't show up on quarterly revenue charts the way selling virtual Shark Cards does. `t0st`'s fix was a great PR win, but it didn't change the underlying incentives. The takeaway: don't blame individual engineers when the system itself treats user experience as an afterthought.

---

## [3 Buckets of Work Time](https://corymiller.com/3-buckets-of-work-time/)

Cory Miller, a Chief Evangelist working remotely from Oklahoma with a largely European team, audited his calendar and realized his workweek falls into three buckets. The first is *talking*—communication and collaboration across meetings and Slack/Teams—which has been taking a larger share than usual since he recently joined a new team. The second is *doing*—execution and shipping—which for him mostly means producing internal and customer-facing videos. The third is *thinking about work*—strategy and vision, the "daydreaming" bucket tied to his Wonder and Invention strengths in the Working Genius model, best done alone in quiet reflection before bringing rough ideas back to teammates for feedback.

Now in his late 40s, having lived through burnout before and raising two young kids with his wife, Miller has no interest in working 60-hour weeks; he wants to work smarter and healthier. He admits that fear and uncertainty often drive him to overcommit, so he is practicing letting go of what he can't control. Wanting enough structure to feel grounded without feeling boxed in, he is experimenting with waking up at 6 a.m. to handle European overlap and communication early, dedicating Mondays and Wednesdays to collaboration, and reserving Tuesdays and Thursdays for deep work and strategic thinking—leaving himself more quiet space to embrace "not knowing yet."

---

## [Dangerous Advice for Software Engineers](https://www.seangoedecke.com/dangerous-advice/)

Sean Goedecke compares certain kinds of career advice to "sharp tools" like `ssh`, `kubectl`, or write access to a production database: wielded with skill and judgment, they are indispensable; used carelessly, they cause serious damage. Goedecke admits he frequently writes this kind of "dangerous" advice: deciding for yourself what to work on, occasionally breaking written company rules on purpose, holding strong opinions before you have all the facts, embracing a bit of organizational cunning, and avoiding work that doesn't directly serve shipping. He worries about readers misapplying it, but argues someone still needs to write it down.

First, most mainstream career advice is sanitized—written to avoid liability or sound virtuous—while strong engineers crave honest talk about how organizations actually work; realizing that reality doesn't match the employee handbook while nobody admits it out loud is deeply isolating. Second, your own manager can almost never give you this advice directly: if you misjudge a situation and say "my manager told me to break the process," the fallout hits them even harder than it hits you, even though many managers quietly wish their reports operated with more pragmatic initiative than their job description states. This advice is high-risk, high-reward—helpful for strong engineers and dangerous for weaker ones—so if any piece of it makes you uncomfortable, don't follow it.

---

## [On the Biology of a Large Language Model](https://transformer-circuits.pub/2025/attribution-graphs/biology.html)

This landmark Anthropic paper uses "circuit tracing" to study the internal mechanisms of Claude 3.5 Haiku, likening the approach to a biologist studying living tissue under a microscope. The researchers train a replacement model built on a cross-layer transcoder architecture containing roughly 30 million interpretable "features" (replacement neurons that typically correspond to human-understandable concepts), then construct attribution graphs for individual prompts to trace how features activate one another step by step. Because attribution graphs are hypotheses, they validate them with intervention experiments—such as inhibiting specific feature clusters inside the original model and observing how behavior changes across multi-step reasoning, poetry, multilingual understanding, addition, medical diagnosis, hallucinations, refusals, jailbreaks, and chain-of-thought faithfulness.

Their experiments reveal that the model performs genuine multi-step intermediate reasoning "in its head"—for example, activating "Texas" before arriving at "Austin" when asked for the capital of the state containing Dallas—alongside memorized shortcuts. It shows clear signs of forward planning, choosing a rhyming target word before composing a line of poetry; possesses rudimentary "metacognitive" circuits that track what it knows versus doesn't know; and operates on shared abstract representations across languages. While the authors acknowledge their current tools yield satisfying explanations for only about a quarter of prompts, the work represents a major step forward for AI interpretability and safety.

---

*This post was rewritten by Claude Code with Opus 5.5 on 27/09/2026; reviewed and edited by Codex with GPT 6.1 Sol on 09/11/2026, and re-verified by Claude Code with Sonnet 5.5 on 16/11/2026.*
