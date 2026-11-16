---
title: "Newsletter #44"
date: 2025-08-03
tags:
  [
    "AI-Assisted",
    "Công cụ lập trình",
    "Cursor",
    "Quy trình phát triển",
    "Kỹ năng chuyên môn",
    "AI Coding",
    "Git",
  ]
categories: ["Newsletter"]
---

_~~As mentioned, today I'll try writing the Newsletter with Roo Code. The first few entries will use Roo Code + Qwen 3 Coder.~~ Enjoy Newsletter #44._

## [Cursor Unveils Game-Changing Web App for AI Coding Agents](https://opentools.ai/news/cursor-unveils-game-changing-web-app-for-ai-coding-agents)

Anysphere, the company behind the AI code editor Cursor, has launched a web app for managing AI coding agents right from the browser. Instead of opening an IDE, users can assign tasks to agents in natural language, track progress, and merge agent-generated code changes from any internet-connected device. The app complements the existing IDE rather than replacing it, and at launch is available only to Pro tier subscribers and above.

The article also provides context: Cursor has surpassed $500 million in annual recurring revenue and is used by more than half of the Fortune 500, while Anysphere's CEO predicts that by 2026, AI agents will handle roughly 20% of a software engineer's workload. Although community feedback has been broadly positive, questions remain around handling large repositories, pricing, and privacy. For junior developers, this is a clear signal that delegating to and supervising AI agents is steadily becoming part of everyday work.

## [The Heart of Software Engineering Still Beats](https://annievella.com/posts/the-heart-of-software-engineering-still-beats/)

Annie Vella argues that even as AI tools dramatically reshape how we build software, the core of the craft remains intact. In her view, writing code is fundamentally about modeling: forming a structured mental model of a process, system, or idea, and encoding it into something a computer can execute. Design is not a separate phase either, but happens continuously while writing code, testing, debugging, and operating real-world systems; it is this ongoing refinement of abstractions that defines an engineer's craft.

The article acknowledges that generative AI is triggering an identity crisis: the part of the job many engineers took the most pride in—turning thoughts into code—is now automated, leaving quite a few feeling like bystanders in their own work. Even so, the author sees this as an evolution rather than replacement: modeling skills are shifting to a higher level, from writing code to organizing context for AI tools, also known as context engineering. The joy of shaping invisible systems and watching ideas take form is still there; only the medium of expression has changed.

## [Expert Generalist](https://martinfowler.com/articles/expert-generalist.html)

Martin Fowler, together with Unmesh Joshi and Gitanjali Venkatraman, argues that software organizations overvalue narrow specialization, whereas what truly drives modern software development is the "expert generalist": someone with broad knowledge who can still go deep into a few selected areas. The article describes six traits of such people: curiosity to explore new technologies and business domains; willingness to collaborate and humility to learn from specialists when entering unfamiliar territory; customer focus to guide their curiosity; prioritizing foundational knowledge like enduring principles and design patterns over fleeting tools; possessing a blended skill set more complex than a simple T-shaped model; and having "empathy" for adjacent disciplines, much like a race car driver who understands the car without needing to be a mechanical engineer.

For organizations, the authors recommend hiring for learning speed and collaboration rather than experience with a specific tool, encouraging staff to rotate across areas, pairing expert generalists with a few deep specialists for each core technology, and building training programs just as rigorous as specialist tracks—such as hands-on workshops building miniature versions of Kafka, Kubernetes, or Delta Lake to grasp their internal design patterns. Generalist capability should also be recognized in promotion criteria.

_The entries above were written using Roo Code with Qwen 3 Coder; overall it was relatively slow and consumed quite a lot of requests. Next, I'll test Roo Code with Kimi K2._

## [Writing code was never the bottleneck](https://ordep.dev/posts/writing-code-was-never-the-bottleneck)

The author pushes back against the claim that large language models (LLMs) have solved the core problem of software engineering. Writing code was never the real bottleneck; the most time-consuming activities have always been code review, knowledge transfer, testing, debugging, and team coordination—activities that demand critical thinking and shared understanding across the team.

LLMs speed up code generation without speeding up verification to match, so they merely shift the bottleneck rather than removing it: code becomes easier to produce but harder to verify, and the team as a whole does not necessarily move faster. Understanding how the code works, finding bugs, and maintaining quality still take substantial effort, and auto-generated code is sometimes even harder to read and review. When code generation outpaces a team's capacity to communicate, reviewers come under heavy pressure and quality easily suffers. The cost of writing code may drop, but the cost of building shared team understanding of the system does not—and that is the true bottleneck.

## [Building Tiny AI Tools](https://www.seangoedecke.com/building-tiny-ai-tools/)

Sean Goedecke highlights an overlooked area of AI application alongside agentic coding and mass-market AI products: building tiny, personalized tools to automate repetitive workflows. He distinguishes between "executive thought" (making strategic decisions) and "mechanical thought" (reading, analyzing, and summarizing information), noting that the latter can now be handed off to AI.

He gives two examples: `gh-standup`, a GitHub CLI extension that pulls commit history and feeds it through an AI prompt to generate a more useful standup report than manual review, and a GitHub Action that aggregates individual engineers' updates into a weekly team summary, saving significant time even though it only serves his own company. Tools like these are too niche to sell commercially yet carry high internal value; the clearest sign is that when they break, coworkers immediately speak up. The author believes that as models continue to improve, this kind of automation will become more widespread, and software engineers are best positioned to build them for their own teams.

## [Modern Git Commands and Features You Should Be Using](https://martinheinz.dev/blog/109)

Most of us use Git every day yet stick to `add`, `commit`, `push`, and `pull` as if it were still 2005. Martin Heinz introduces more modern commands: `git switch` (Git 2.23) replaces `git checkout` for switching branches, adding safety checks to prevent data loss and conveniences like `git switch -` to jump back to the previous branch; `git restore` consolidates file-restoration tasks previously scattered across `reset` and `checkout` with clearer syntax; `git sparse-checkout` (Git 2.25) populates only the needed directories in the working tree of a large monorepo, and when combined with partial clone also reduces downloaded data; `git worktree` lets you check out multiple branches simultaneously in separate directories without stashing or cloning again; and `git bisect` uses binary search to pinpoint the commit that introduced a bug.

```bash
git switch other-branch
git switch -  # Switch back to the previous branch
git switch remote-branch  # Switch to a remote branch with automatic tracking
```

```bash
# Unstage changes
git restore --staged some-file.py

# Unstage and discard working tree changes
git restore --staged --worktree some-file.py

# Restore a file to a specific commit
git restore --source HEAD~2 some-file.py
```

```bash
git clone --no-checkout https://github.com/example/monorepo
cd monorepo
git sparse-checkout init --cone
git checkout main  # Only checks out files in the root directory
git sparse-checkout set service/common  # Only pulls the needed directory
```

```bash
git worktree add ../hotfix master  # Create a new worktree from master
cd ../hotfix  # Work independently
git worktree list  # List active worktrees
```

```bash
git bisect start
git bisect bad HEAD      # Current commit is broken
git bisect good abc123   # Last known good commit
# Git automatically checks out the midpoint commit
git bisect good/bad      # Test and mark the result
git bisect reset         # Return to the original commit
```

The takeaway is that when you run into a Git problem, consult the latest official documentation rather than relying on old StackOverflow answers—Git has evolved considerably, and there is likely already a simpler, safer way to solve your problem.

_After testing, I noticed Kimi K2 consistently responds faster than Qwen 3 Coder whether using Cline or Roo Code, and Roo Code makes more requests than Cline, though my satisfaction with the output is roughly the same. Since OpenRouter's rate limit is based on request count rather than total tokens, I'll probably stick with Cline + Kimi K2 as a fallback whenever Claude Code hits its quota._

---

*This post was rewritten by Claude Code with Opus 5.5 on 27/09/2026; reviewed and edited by Codex with GPT 6.1 Sol on 09/11/2026, and re-verified by Claude Code with Sonnet 5.5 on 16/11/2026.*
