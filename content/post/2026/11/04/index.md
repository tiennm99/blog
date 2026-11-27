---
title: "My Late-2026 Workspace Setup: DeskMini at Home, code-server in the Cloud"
date: 2026-11-04
tags: ["AI-Assisted", "Self-hosted", "Coolify", "Cloudflare", "Linux", "Ubuntu", "Developer Productivity", "Homelab", "code-server"]
categories: ["Sharing"]
---

I wanted to be able to open my workspace from any device, let coding agents shoulder more and more of the heavy lifting, and make the most of long-term free tiers. After plenty of rounds of installing, testing, and tearing things down, my late-2026 setup has settled into three parts:

- **In the cloud:** `code-server` running inside a container on OCI Always Free ARM, deployed via Coolify from [tiennm99/composes](https://github.com/tiennm99/composes).
- **At home:** an ASRock DeskMini X600 running Ubuntu, handling heavy builds, containers, and coding agents for remote access.
- **On the go:** a lightweight ThinkPad acting as a thin client to connect to the other two over SSH, Tailscale, or `code-server`.

Getting here took plenty of trial and error: switching `code-server` images, hunting for a good browser-based terminal, and spending two weeks wrestling with remote Linux desktop solutions. Some things stuck; others now live only in my archive folder.

This post was drafted with AI assistance from my Git history, plans, and notes, and I then filled in the reasoning behind each decision. I didn't check the DeskMini live while writing; anything unverified or where I no longer remember the exact reason is called out explicitly in the relevant section.

## Starting Point: `code-server` in a Container

I've been self-hosting Coolify since at least May 2025. On August 14, 2026, while reorganizing my `composes` repo, I added `code-server` using the LinuxServer.io image (lsio for short). Go, Node, and Python were installed via `DOCKER_MODS`, and extra packages via `INSTALL_PACKAGES`. The `abc` user's home directory lived at `/config`.

Running that image under Coolify had a few annoyances. Every redeploy recreated the container, re-downloaded the mods, and forced `apt` to resolve the entire `INSTALL_PACKAGES` list from scratch — enough that I had to trim the package list down. Worse, if a mod failed to install, the error was simply logged and ignored: the editor still opened, just missing tools. Freshly created workspace volumes were also owned by `root`, which I had to work around in a Dockerfile.

Those were the friction points with lsio. The reason I switched to Coder's official image was to stay closer to upstream. I added `codercom/code-server` with a custom Dockerfile on October 6, then removed the lsio setup and moved it to the archive on October 12.

The new Dockerfile bakes in the tools I need right at build time: build-essential, `bubblewrap`, networking CLIs, search and linting tools, database clients, plus `gh`, Docker CLI, Compose, Buildx, `glab`, and `gt`. That way, helper commands and shell completions are ready out of the box. I use `FROM codercom/code-server:latest` because the official image doesn't publish major-version tags.

So that `agent-browser` can run headlessly on ARM64, the image includes Debian's Chromium package along with the required fonts, and I tuned shared memory so Chromium wouldn't crash. GTK and WebKitGTK are included for headless Tauri builds and tests.

**Language toolchains, on the other hand, stay in my home directory outside the image:** `fnm`, `uv`, `rustup`, Go from the official tarball, and SDKMAN. Baking another copy into the image would only bloat the build while getting shadowed by the versions in `$HOME` anyway. Keeping them separate also prevents a container redeploy from silently upgrading the compiler or runtime version I'm in the middle of using.

One remaining annoyance is typing Vietnamese inside the browser terminal when using Claude Code. As of my last notes on October 18, I still haven't found an officially supported fix. Backspace events and diacritic composition have to travel through the entire chain of browser → `xterm.js` → WebSocket → PTY. For now, I just type longer Vietnamese text outside and paste it in.

## Things I Evaluated, Tried, and Removed on the Server

Alongside switching the `code-server` image, I looked for ways to use a terminal and coding agents directly in the browser. Between September and early November, several tools came and went on the server:

- **OpenHands:** tried from September 18 to 19 — about a day.
- **opencode web:** tried from September 18 to October 5 for a browser-based shell.
- **Paseo:** used from September 16 to November 3 (last tweaked on October 6). This daemon initially seemed like a good fit, but each agent CLI needed around 200 MB installed at startup. I eventually dropped it because Orca and T3 Code offered better features and a smoother experience.

For OpenHands and opencode web, I didn't write down why I removed them.

The Zellij web client was the one I really wanted to make work. I ran it in a container from October 21 to November 3, but immediately ran into keyboard shortcut conflicts: the browser reserves `Ctrl+T`, `Ctrl+W`, `Ctrl+N`, and `Ctrl+Tab` — the exact combinations I needed for Zellij's modes. With the Unlock-First layout, `Ctrl+G` opened Firefox's find bar instead, so I had to rebind it to `Alt+G`. On top of that, opening the root URL always spawned a brand-new session that I couldn't clean up from the UI. Ultimately, the shortcut conflicts were what made me drop it.

While setting it up, I also used `socat` as a relay and ran into a quirk where Zellij exited silently if its config file was missing.

Typing occasionally felt laggy too, though I never proved Zellij was the culprit. The container itself was barely under any load; an incorrect `TERM` variable, Vietnamese IME input through the browser, or network latency could all have played a part. I did fix one specific bug where `TERM=unknown` caused Backspace to move the cursor to the right.

An alternative I evaluated on October 24 was `tmux` over `ttyd`. Because `tmux` uses `Ctrl+B` as its prefix, its default bindings clash much less with browser shortcuts than Zellij's modal bindings — though it still has to live within whatever keys the browser allows through.

I added a `ttyd` template to the repo but never actually deployed it. Soon after, Orca and T3 Code covered my needs, so I archived the template too. A bare terminal alone still felt too limiting anyway: having to ask Claude just to inspect a single file felt unnecessarily roundabout.

On November 3, I moved Paseo, Zellij, and the `ttyd` template into the archive in a single commit. The Zellij container was removed; the only browser terminals I still use are Cloudflare's browser SSH to the DeskMini and the integrated terminal inside `code-server`.

## The DeskMini at Home

The machine sitting at home is an ASRock DeskMini X600: X600M-STX motherboard, Ryzen 7 8700G (8 cores, 16 threads, integrated Radeon 780M graphics), and 32 GB of RAM. It has two 500 GB NVMe drives — one for the OS and one for my workspace. As of my October 21 check, it runs Ubuntu 26.04 Desktop with GNOME on Wayland.

I picked the DeskMini because it's compact yet powerful and has a capable iGPU, making it a great **always-on home Linux box for heavy workloads and remote access**. My Windows desktop is even more powerful, but I didn't want to run a Windows rig 24/7 for that role. When I'm at home, I still sit at my Windows desktop; when I'm at the office and need a beefy homelab, I open Orca on the DeskMini over Tailscale.

That keeps my ThinkPad light and cool: compiling, running containers, language toolchains, and long-running tasks all happen on the DeskMini or the cloud server. The DeskMini doesn't run Coolify — services there use plain Docker Compose and `systemd`, with browser access routed through Cloudflare Tunnel and Access.

I gradually set up its toolchains starting in late October: Node via `fnm`, Python via `uv`, Go from the official tarball with `GOTOOLCHAIN=auto`, Rust via `rustup`, and Java 21 via SDKMAN, alongside `gcc`, `git`, `gh`, Docker, `glab`, and later `gt`. One easy-to-forget gotcha when writing automation scripts: `fnm` and SDKMAN are loaded in interactive `zsh` startup files, so `cron` jobs and `systemd` services won't see them automatically.

Since October 22, the DeskMini has had its own dedicated notes in my workspace repo. At that time, its role was also tied to something I really wanted to get working smoothly: opening a full Linux desktop right inside the browser via Apache Guacamole.

## Two Weeks Chasing a Browser-Based Linux Desktop

My goal at the time was very specific: open my Linux desktop from anywhere in a browser without installing any client software on the machine in front of me. That meant routing through Cloudflare Tunnel and Access rather than requiring Tailscale on the client machine.

Among the options I surveyed on October 19, Guacamole stood out as free, self-hosted, clientless, and capable of speaking RDP to both Linux and Windows. Cloudflare's browser RDP ranked lower in my comparison notes, yet I tried it first anyway. On October 21, GNOME Remote Desktop rejected the connection with:

> Client did not advertise support for the Graphics Pipeline, closing connection

GNOME requires the RDP Graphics Pipeline extension, and Cloudflare's IronRDP client didn't advertise support for it at the time, causing GNOME to close the connection immediately. Cloudflare's documentation also listed only Windows targets as supported. So that path was a dead end with GNOME in my test.

VNC was also in my survey notes, though I never installed it. With GNOME on Ubuntu 26.04 in this configuration, everything runs on Wayland with GNOME Remote Desktop speaking RDP. The VNC options I looked into required either X11 or `wlroots`, and older guides referencing a VNC toggle in GNOME Settings no longer matched this release.

So I moved on to Guacamole, deploying `guacamole`, `guacd`, and PostgreSQL via Docker on the DeskMini over October 21–22. I pinned version `1.6.0` because it was the first release supporting the RDP Graphics Pipeline (and the `latest` tag at the time pointed to an `amd64`-only development build).

The desktop connected, but sessions kept dropping mid-use. The drops happened over both QUIC and HTTP/2 tunnels, and `cloudflared` logged no errors corresponding to the disconnects — so switching the tunnel transport didn't help. In the logs I captured, `guacd` reported `User is not responding.` after 15 seconds of silence and closed the RDP connection. Those 15-second timeouts are hardcoded at compile time and cannot be changed via configuration.

**I still haven't pinned down the root cause.** At first I suspected the browser was throttling timers in background tabs, but sessions dropped even while the tab was focused right in front of me. The most plausible theory at the time was a set of regressions in Guacamole 1.6.0 — specifically `GUACAMOLE-2118`, its duplicate reports, and `GUACAMOLE-2081`. Those bugs had already been fixed on the `1.6.1` branch, which hadn't been released yet when I investigated.

Even so, I never ran a pure LAN test to rule out the Cloudflare Tunnel completely. There was also one occasion where both SSH and RDP froze simultaneously despite running in separate `guacd` processes, which that bug theory doesn't neatly explain either.

For SSH through Guacamole, disconnects were even more painful: because the shell was tied directly to the browser connection, a single drop could kill a running command and lose unsaved state. That's what pushed me to move terminal workflows out of Guacamole altogether. I had already drafted the Zellij template on October 21 prior to this debugging session, and the Guacamole SSH drops only reinforced how much I needed terminal sessions that outlive a browser tab.

Initially, I planned to stay on `1.6.0` and wait for `1.6.1`, falling back to `1.5.5` only if the drops became unbearable (downgrading required backing up PostgreSQL and preparing a `1.5.5` schema since Guacamole doesn't support reverse migrations).

By November 3, I stopped using Guacamole and archived its setup because the connection just wasn't reliable enough. Cloudflare's browser-rendered SSH was sufficient for quick terminal access, and whenever I need a full desktop, I use Tailscale with the official Windows RDP app. My original goal was making everything 100% browser-based, but in the end I compromised on using a native RDP client for desktop sessions.

## What's Running on the DeskMini Today

As of the state recorded when writing this post, browser SSH, `code-server`, T3 Code, and Orca are all accessible through **Cloudflare Tunnel and Access**, while Tailscale connects my personal devices directly.

**`code-server`** is installed from the official `.deb` package, runs via `systemd`, and has been in my machine notes since October 22. Since it can't use official VS Code Settings Sync, I plan to keep its configuration and extension list — Claude Code plus a theme — in my dotfiles and apply them via a manual script. I haven't applied those dotfiles to the DeskMini yet.

**Orca and T3 Code** were recently migrated from desktop GUI launches to `systemd` user services. I installed Orca (`stablyai/orca`) from its `.deb` package on October 27 (I didn't record the exact date I installed T3 Code). According to my notes, the goal of moving them to user services in early November was having them come up automatically on boot without needing to log into the desktop session first. One quirk with Orca: when run with `--supervise`, the service waits if another Orca instance is already serving the same profile, so launching the desktop app first can make the background service wait.

In my November 2 comparison notes, Orca is described as a desktop workspace built around Git worktrees that runs agent CLIs directly inside terminals, whereas T3 Code organizes work around conversation threads, drives agents through adapters, and offers a lightweight web UI. That comparison was based purely on documentation rather than side-by-side testing, and its conclusion was to keep Orca as my primary tool while trying T3 Code for steering agents from a phone or browser. Today, both run as services, and Orca is the app I use the most.

**Tailscale and `cloudflared`** split responsibilities cleanly: Cloudflare Tunnel + Access handle remote sign-in and web UIs, while Tailscale handles direct traffic between my own devices. I went with this split because I found it simpler than setting up WARP-to-WARP. For GNOME Remote Desktop, my research notes distinguish between remote login at the GDM login screen and desktop sharing after logging in, though I don't have recorded test results for that part yet.

**Gitea and `gitea-mirror`** run from my `composes` repo as my local GitHub backup on the DeskMini. I already told the story of AI crawlers discovering my Gitea instance in [the October 29, 2026 post]({{< ref "/post/2026/10/29" >}}).

Setting up the mirror had its own hiccups: Gitea's default timeouts cut off multi-gigabyte clones mid-transfer, and Bun's `fetch` aborted connections after five minutes without data, leaving half-imported repos behind. Bumping the timeouts fixed that. Health checks polling the GitHub API without a token also hit anonymous rate limits until I lowered their frequency. And in the CLI tooling, I replaced `tea` with `gt` after `tea` was archived upstream and `gt` hit `1.0.0`. As for why I moved the backup instance from the cloud server to my home DeskMini, I didn't write the reason down, so I won't attribute it to a specific incident.

## Remote Power-On: From RTC Wake to a Smart Plug

Originally, waking the machine remotely wasn't even in scope. My research notes mentioned using an ESP32 listening to a Telegram bot to send Wake-on-LAN / power signals, though I never built it.

Starting October 28, I used RTC wake (`rtcwake`) via a `systemd` unit to schedule the DeskMini to boot itself up. The catch with RTC wake is that a power outage or hard shutdown can cause the machine to miss setting the next wake alarm.

On November 3, I removed the OS-level RTC wake schedule and switched toward using a smart plug paired with the BIOS "restore on AC power loss" setting. I didn't record the exact trigger for dropping RTC wake, but the planned workflow is:

1. Shut the OS down cleanly first — never cut power while the PC is running.
2. Turn the smart plug off for about 30 seconds, then turn it back on to trigger boot.

**This part isn't finished yet.** I still need to disable the RTC alarm in the BIOS, set *Restore on AC Power Loss* to *Power On*, and test the full smart-plug power cycle as well as simulated power outages. So I can't claim remote power-on via smart plug is working in production just yet.

## Coolify and Two Always Free Cloud Servers

On the cloud side, Coolify manages two OCI Always Free ARM servers running Ubuntu 24.04 Minimal, fronted by Traefik v3 and Let's Encrypt. I chose OCI for its generous, non-expiring free tier. Choosing Coolify over Dokploy came down to personal impression — it felt more stable to me in day-to-day use, though I haven't run formal benchmarks comparing the two. In my compose files, I still keep Dokploy-compatible sections ready just in case.

My shared deployment configs live in the public `composes` repo under the Apache 2.0 license. Each service gets its own folder with a `compose.yml`, a `README.md`, and an `.env.example`, wired up to its own Coolify application with path-filtered webhooks so changes to one service don't trigger redeploys of another. Inline comments explain *what* the config does, while the `README.md` records *why* I chose it. Tools I wrote myself keep their `compose.yml` inside their own repositories.

The `archive/` directory makes it easy to look back at what I tried and when I retired it. What's occasionally missing is the *why* — I didn't always write down the reason I dropped a tool at the moment I removed it.

## Keeping Everything Consistent Across Machines

What keeps both me and my coding agents from getting lost across all these machines is a shared workspace repository checked out everywhere. The repo started on July 25 just to hold a few GitHub audit skills and grew organically from there. By late October, I reorganized per-machine notes so agents only load the context relevant to the host they're running on. Claude Code and Codex share the same rule definitions (though I primarily use Claude Code), and my AgentKit CLI installs the kit into each agent's home directory.

I split context by how it gets consumed: **rules** are loaded into every session, **skills** are read on demand per task, and **memory** has an always-loaded index pointing to topic files. Hooks block costly mistakes; notes and plans track upcoming work; Git history and docs preserve what already happened. Memory is tracked in Git too. One important lesson I have to keep in mind: only rules are guaranteed to be loaded — if you put a behavioral instruction inside memory, the agent might never read it.

Dotfiles synchronization, meanwhile, **hasn't been rolled out to any machine yet**. In my October 29 comparison, I picked `chezmoi`: it was the only tool in the group that ships as a single native binary on Windows, supports per-machine templates, prompts once for machine variables, integrates with `sops` when applying files, and offers a dry-run diff preview. `dotter` came in second, while Ansible required WSL on Windows and felt too heavy compared to managing config files directly.

My toolchain plan evolved too: on October 30, I dropped `mise` from the plan in favor of ecosystem-native managers — `rustup`, `uv`, `fnm`, SDKMAN (or Temurin via `winget` on Windows), and the official Go binary with `GOTOOLCHAIN=auto`. I didn't log any specific bug with `mise` when making that switch.

For the shell, I plan to switch from `oh-my-zsh` + `powerlevel10k` to `zsh` + `zimfw` + Starship. Among the frameworks I compared, `zimfw` was the most popular actively maintained option and the fastest in recorded benchmarks, with built-in completions covering nearly everything I need — whereas `powerlevel10k`'s README explicitly notes that project maintenance is now very limited. That switch is still on the to-do list; the servers are still running `oh-my-zsh` for now.

## Unfinished Tasks and Lessons Learned

As of November 4, 2026, two items are still unfinished:

- Updating the DeskMini BIOS settings and testing smart-plug power-on, including recovery after a power cut.
- Rolling out the dotfiles repo across my machines.

Looking back over all these iterations, a few lessons stand out:

- **Record the *why*, not just the *what*.** Git history reconstructs *what* changed and *when*, but it can't tell you your motivation if you didn't write it down. Jotting down the reason at decision time saves you from having to reconstruct it later like I did for this post.
- **Browser-based remote desktops have to be tested against your exact display stack.** On my GNOME Wayland setup, the RDP Graphics Pipeline requirement ruled out one browser RDP option right away, and older VNC guides no longer applied.
- **Terminal sessions should survive closing a browser tab.** Tying a shell's lifecycle directly to a browser connection means a single hiccup can take down whatever command was running.
- **Separating language toolchains from the container image keeps version upgrades under your control.** Redeploying a container shouldn't silently swap out the compiler or runtime version you're actively working with.
- **Splitting access paths by use case makes daily life much simpler.** Cloudflare Tunnel + Access handle browser logins and web UIs; Tailscale handles direct device-to-device connections.

This setup will surely keep evolving. Right now, I spend most of my time in Orca, keep `code-server` around for opening workspaces in a browser, and let the DeskMini and cloud servers do the heavy lifting. Every tool I tried and retired along the way made it much clearer what I actually need next time.
