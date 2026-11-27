---
title: "Zsh and Antibody"
date: 2020-04-16
tags: [ "Arch", "Linux", "Zsh", "Antibody" ]
---

In this post, I'll introduce `zsh`, an alternative shell to `bash` that offers high customizability and tons of helpful features, especially if you spend a lot of time in the terminal.

## Installing zsh and Setting It as Your Default Shell

Install `zsh`:

```shell
yay -S zsh
```

Set `zsh` as your default shell:

```shell
chsh -s /bin/bash/zsh
```

## Customizing zsh

Out of the box, `zsh` is just a regular shell like `bash`, but once customized, it turns into a "super shell" :v

If you're a power user, you can hand-craft your own configuration and scripts to customize `zsh` however you like. Since I'm not at that level, I'll introduce the popular `oh-my-zsh` framework along with the `antibody` plugin manager. Back in the day people used `antigen`, but `antigen` is no longer actively developed, and `antibody` is touted as a much faster replacement (even though I find integrating `oh-my-zsh` with `antibody` a bit clunkier than with `antigen`). You can check out their official repositories for more details:

- <https://github.com/robbyrussell/oh-my-zsh>
- <https://github.com/getantibody/antibody>
- <https://github.com/zsh-users/antigen>

To install `antibody` on Arch:

```shell
yay -S antibody
```

(this is listed right on their official homepage^^, so the source is trustworthy)

Configuring `antibody`: Here I'll cover the basics. Just as `bash` uses `~/.bashrc`, `zsh` uses `~/.zshrc` as its configuration file. However, `antibody` recommends listing your plugins in a separate file—such as `~./.zsh_plugins.txt`—and then loading them using either static or dynamic loading.
Here's an example of my `~./.zsh_plugins.txt` file:

```shell
robbyrussell/oh-my-zsh

robbyrussell/oh-my-zsh path:plugins/archlinux
robbyrussell/oh-my-zsh path:plugins/colored-man-pages
robbyrussell/oh-my-zsh path:plugins/colorize
robbyrussell/oh-my-zsh path:plugins/command-not-found
robbyrussell/oh-my-zsh path:plugins/common-aliases
robbyrussell/oh-my-zsh path:plugins/extract
robbyrussell/oh-my-zsh path:plugins/git
robbyrussell/oh-my-zsh path:plugins/git-extras
robbyrussell/oh-my-zsh path:plugins/github
robbyrussell/oh-my-zsh path:plugins/golang
robbyrussell/oh-my-zsh path:plugins/heroku
robbyrussell/oh-my-zsh path:plugins/history
robbyrussell/oh-my-zsh path:plugins/node
robbyrussell/oh-my-zsh path:plugins/npm
robbyrussell/oh-my-zsh path:plugins/pip
robbyrussell/oh-my-zsh path:plugins/python
robbyrussell/oh-my-zsh path:plugins/screen
robbyrussell/oh-my-zsh path:plugins/sudo
robbyrussell/oh-my-zsh path:plugins/systemd
robbyrussell/oh-my-zsh path:plugins/thefuck
robbyrussell/oh-my-zsh path:plugins/vscode
robbyrussell/oh-my-zsh path:plugins/web-search
robbyrussell/oh-my-zsh path:plugins/yarn
robbyrussell/oh-my-zsh path:plugins/z

desyncr/auto-ls
djui/alias-tips
mafredri/zsh-async
srijanshetty/node.plugin.zsh
srijanshetty/zsh-pip-completion
voronkovich/mysql.plugin.zsh
wuotr/zsh-plugin-vscode
zlsun/solarized-man
zpm-zsh/ls
zpm-zsh/ssh
zsh-users/zsh-completions
zsh-users/zsh-autosuggestions
zsh-users/zsh-syntax-highlighting
zsh-users/zsh-history-substring-search

robbyrussell/oh-my-zsh path:themes/candy.zsh-theme
```

This is just an example—keep in mind that some plugins require extra CLI tools to be installed before they'll work. Now onto loading them. In short, static loading means running `antibody` to generate a single static script file (like `config.sh`).

For example: `antibody bundle < ~/.zsh_plugins.txt > ~/.zsh_plugins.sh`

Then in `~/.zshrc`, you just add the line: `source ~/.zsh_plugins.sh`.

Static loading is faster than dynamic loading, but it doesn't automatically update plugins when updates are available. That's why I prefer dynamic loading—it's barely any slower in practice (and still faster than `antigen`), while keeping things updated automatically (it checks each time it runs). Just add the following to your `~/.zshrc`:

```shell
export ZSH="$(antibody home)/https-COLON--SLASH--SLASH-github.com-SLASH-robbyrussell-SLASH-oh-my-zsh"

source <(antibody init)
antibody bundle < ~/.zsh_plugins.txt
```

Because I use Oh-My-Zsh and `antibody` doesn't natively set `$ZSH` for it, that first `export ZSH=...` line is required (whereas `antigen` only needed `antigen use oh-my-zsh`). Loading Oh-My-Zsh plugins in `antibody` is also a bit more verbose :/ since you have to write out each line in full (I don't know if there's a shorter way because I was too lazy to check, and with VS Code's multi-cursor editing it took no time at all anyway—no need to waste brainpower :v).

If you don't want to bother with manual customization, you can install Arch's `grml-zsh-config` package instead:

```shell
yay -S grml-zsh-config
```

This package configures your `zsh` to work just like the shell inside the official Arch installation ISO.
However, if you want to customize `zsh` yourself later, you should remove `grml-zsh-config` because it conflicts with custom themes—you can work around it, but it's a hassle, so it's easier to just uninstall it :v

Bye for now, and see you in the next post!^^
