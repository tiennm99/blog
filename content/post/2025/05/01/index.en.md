---
title: "MiTi Ranks AI Coding Agents"
date: 2025-05-01
tags: [ "Development", "AI", "Coding Tools", "Agent" ]
categories: [ "Review" ]
---

*This is purely my personal opinion. I mostly use AI Agents for small personal side projects, so my experience might not be universally accurate. This post is just to share my perspective.*

![Tierlist](img/tierlist.png)

## Explanation

### Augment

Augment has a pretty solid codebase auto-indexing mechanism, and right now Augment is offering **unlimited** usage on its Developer plan, which is a great bargain at $30 (I'm a big fan of "unlimited" plans, even knowing full well that nothing is ever truly unlimited :D).

Update 7/5/2025: Augment updated its pricing to a hefty $50/month with a cap of 600 messages/month (around 20 messages/day). Suddenly Augment doesn't look quite as amazing to me anymore :D

### Cursor & Windsurf

Both of these tools are quite solid. Cursor initially felt significantly ahead, but in recent releases Windsurf has made notable improvements. Plus, OpenAI has acquired Windsurf, so Windsurf might get even better in the future.

In terms of pricing, Cursor allows unlimited "slow premium requests", which is pretty appealing. Windsurf holds its own with a more attractive starting price of $15 compared to Cursor ($20), though Windsurf caps you at 500 prompt credits/month.

### Junie

In its early days after launch, Junie still has plenty of room for improvement. Personally, I found Junie's indexing rather slow, and when asked a question it sometimes has to re-read entire files, which wastes a lot of time.

### Trae & GitHub Copilot

In my experience, neither of these tools can reliably find the right files on their own—both require us to manually include files in context. However, Trae is free while Copilot is paid, so Trae gets rank C and Copilot gets rank D.

GitHub Copilot is pretty slow, and it lacks (or at least I couldn't find) an option to let Copilot run commands automatically (like an auto or brave mode), requiring manual execution instead. Obviously that's safer from a security standpoint, but it slows down the workflow. Imagine instead of firing off a prompt, walking away to make a cup of coffee, and coming back to review the finished work, you have to sit there babysitting the agent to see if it asks to run a command so you can click approve. On top of that, every now and then Copilot gets stuck running a command forever and hangs completely, forcing me to start over from scratch—super annoying.

## Bonus

I also came across an article with a tier list covering many more tools if you want to check it out:

[Best AI for coding in 2025: 25 developer tools to use (or avoid)](https://www.pragmaticcoders.com/resources/ai-developer-tools)
[Awesome AI Agents](https://github.com/e2b-dev/awesome-ai-agents)

## Update 24/5

Recently, on May 15, Windsurf launched its own in-house SWE model and made the lite model free for unlimited use. For a limited time, they're even letting users use the standard version without limits. I find it pretty compelling and well worth a try.

Claude 4 was also just released on May 22. Right now Cursor, Trae, and Copilot already support it, while Windsurf and Junie don't yet. That said, although Trae lets you use it, the queue is super long—even for Claude 3.7. On Trae, Claude 3.5 is the only one that responds quickly with minimal waiting.

Also, as you know, I use AI Agents to help put together my Newsletter series. Testing Copilot with Claude 4 today produced pretty poor results—it left way too many English terms untranslated. You can check the initial commit of Newsletter #28 on GitHub to see what I mean.

My current priority ranking is: Windsurf > Cursor > Trae > Junie > Copilot. Trae ranks that high simply because it's free. I've stopped using Augment since my trial ended and the new pricing is too steep—as much as I liked it before, when it hits the wallet I have to let it go. Soon I'll also stop using Junie, and then Copilot after that, once my trials expire, since neither feels worth paying for. If I do open my wallet, I'll invest in Windsurf or Cursor.
