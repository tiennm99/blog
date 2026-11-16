---
title: "Setting Up Claude Code & Serena MCP on Windows"
date: 2025-07-27
tags: ["Claude", "Claude Code", "Serena", "MCP"]
---

_Lately I've been spamming quite a few AI-generated newsletters, which gets a bit repetitive. Since I recently tinkered with the Claude Code & Serena combo and found it pretty solid, I decided to write a post myself for a change of pace._

## Introduction

Recently I paid for a Claude Pro subscription, which includes Claude Code. Playing around with it has been fun, and I rate it higher than other agents because it works via the CLI without forcing me to install a new IDE (I'm much more used to JetBrains IDEs than VS Code. Plus, Cursor and Windsurf are annoying because they don't sync settings across different machines, whereas Claude Code lets you share project configs). Besides, since Claude models are first-party from Anthropic, using them inside Claude Code is probably much better optimized :v

In this post, I'll walk through setting up Claude Code & Serena on Windows. Although [Claude Code already supports Windows natively](https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md#:~:text=Added%20support%20for%20native%20Windows), when I tried it recently I still frequently ran into errors when creating new files. My guess is that it's probably due to `/` and `\` in file paths, so for now I still use Claude Code through WSL. In addition, I'll also show how to set up Serena for a Java project in this post.

Alright, let's get right to it!!

## Installing WSL

This part is easy — just follow the official guide here: https://learn.microsoft.com/en-us/windows/wsl/install

TLDR: Run the following command:

```
wsl --install
```

Wait for the command to finish, restart your machine, and after rebooting it will install Ubuntu. Follow the prompts to set up a username and password for the distro.

## Installing Claude Code

### Installing Node.js

Even though [Claude Code currently only requires Node.js 18+](https://docs.anthropic.com/en/docs/claude-code/setup#:~:text=Software%3A%20Node.js%2018%2B) and a fresh WSL install gives you Ubuntu 24.04 (whose default `nodejs` package is already version 18.x), my view is that you should always use the latest Node.js LTS release (currently 22.x) — who knows if Claude Code will bump its requirements later, and this way we'll still be good to go :v So let's follow the instructions here: https://nodesource.com/products/distributions

TLDR:

```
sudo apt-get install -y curl
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs
node -v
```

Next, we need to set up a global npm prefix so packages are installed into a subdirectory in your home folder, avoiding permission errors when running without root privileges, following this guide: https://docs.anthropic.com/en/docs/claude-code/troubleshooting#alternative-solution%3A-create-a-user-writable-npm-prefix-for-global-installs

TLDR:

```
mkdir -p ~/.npm-global
npm config set prefix ~/.npm-global
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
```

### Installing Claude Code

Follow the official setup guide here: https://docs.anthropic.com/en/docs/claude-code/setup

TLDR:

```
npm install -g @anthropic-ai/claude-code
```

Then run `claude` and log in with your Claude Pro account or Anthropic `API_KEY`.

## Installing Serena

### Installing uv

Follow the installation guide here: https://docs.astral.sh/uv/getting-started/installation/

TLDR:

```
curl -LsSf https://astral.sh/uv/install.sh | sh
```

### Setting Up Serena in Your Project

Use `cd` to navigate to your project directory and run the following command:

```
claude mcp add -s project serena -- uvx --from git+https://github.com/oraios/serena serena-mcp-server --context ide-assistant --project $(pwd)
```

And that's it! Every time you run `claude` inside the project, the Serena MCP server will start automatically (remember to check Claude's prompt when you run `claude`, since Claude Code may ask you to confirm which MCP servers to launch).

## Setting Up Serena for a Java Project

Because [Serena currently has issues with Java projects when running on Linux and macOS](https://github.com/oraios/serena?tab=readme-ov-file#claude-code:~:text=There%20may%20be%20issues%20with%20java%20on%20macos%20and%20linux) — I tested it on a Gradle project and kept running into permission errors where it couldn't execute the `java` command, even though calling it directly in the terminal worked fine with no path or `chmod` issues — there's a slightly janky workaround for now: run Serena on Windows, then connect the Serena MCP client from WSL over SSE. Here are the details:

### On Windows

#### Install Python

This part is pretty straightforward. Head over to the official site to download and install it: https://www.python.org/downloads/

#### Install uv

TLDR:

```
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
```

Or:

```
pip install uv
```

#### Run the Serena Server

Navigate to your project folder, open CMD or PowerShell, and run the following command:

```
uvx --from git+https://github.com/oraios/serena serena-mcp-server --context ide-assistant --project . --transport sse --port 9121
```

### In WSL

#### Find the Host IP

Find the Windows host IP to access it from WSL following this guide: https://learn.microsoft.com/en-us/windows/wsl/networking

TLDR:

```
ip route show | grep -i default | awk '{ print $3}'
```

Note down the IP in the output. For example, mine is `172.21.0.1`.

**Note**: On WSL1, the IP is simply `127.0.0.1`.

#### Set Up the Serena MCP Client

Use `cd` to go to your project folder and run:

```
claude mcp add -s project --transport sse serena http://172.21.0.1:9121/sse
```

Replace `172.21.0.1` with the IP from the output in the previous step.

After that, running `claude` will connect to the MCP server running on the Windows host.

**Note**: For Java projects, Serena takes a while to initialize (sometimes up to a few minutes), so keep an eye on the dashboard (by default at http://127.0.0.1:24282/dashboard/index.html) to monitor its progress.

## Conclusion

That wraps up my guide on setting up Claude Code & Serena MCP on Windows. Thanks for reading all the way to the end! If you run into any issues, feel free to leave a comment below and I'll get back to you. See you in future posts!

P.S.: Right now I'm experimenting with Claude Code on a refactoring task — if it goes well, proves effective, and I'm not too lazy, I'll write a follow-up post to share how it went hehe :v

## Update 29/07/2025:

For large projects, you should run `index-project` before starting `serena-mcp-server`, as documented here: uvx --from git+https://github.com/oraios/serena index-project

TLDR:

```
uvx --from git+https://github.com/oraios/serena serena project index
```
