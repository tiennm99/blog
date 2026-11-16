---
title: "Things to Do After Installing Ubuntu 20.04"
date: 2020-06-27
tags: [ "Ubuntu", "Linux" ]
---

**This post is a roundup of the basic steps I took after reinstalling Ubuntu 20.04**

1. Update the system

```shell
sudo apt update
sudo apt upgrade
```

2. Install some essential software

```shell
sudo apt install gdebi
```

The apps I installed using `gdebi` are:
  - [Google Chrome](https://www.google.com/chrome/)
  - [Visual Studio Code](https://code.visualstudio.com/)
  - [Dropbox](https://www.dropbox.com/install)

Some other cool software:

  - Spotify:
  ```shell
  curl -sS https://download.spotify.com/debian/pubkey.gpg | sudo apt-key add -
  echo "deb http://repository.spotify.com stable non-free" | sudo tee /etc/apt/sources.list.d/spotify.list
  sudo apt-get update && sudo apt-get install spotify-client
  ```

3. Install `zsh`

```shell
sudo apt install zsh
chsh -s /usr/bin/zsh
```

Install the zsh plugin manager `zgen`. Even though `zgen` is old, compared to the other tools available in Ubuntu's repository like `zplug` and `zsh-antigen`, I find `zgen` much simpler and lighter.

```shell
sudo apt install zgen
```

Edit your `.zshrc` file to suit your setup; for example, here is mine:

```shell
if [[ -r "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh" ]]; then
  source "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh"
fi

export GTK_IM_MODULE=ibus
export QT_IM_MODULE=ibus
export XMODIFIERS=@im=ibus
export QT4_IM_MODULE=ibus
export CLUTTER_IM_MODULE=ibus

eval $(thefuck --alias)

source "/usr/share/zgen/zgen.zsh"

if ! zgen saved; then

  zgen oh-my-zsh

  zgen oh-my-zsh plugins/alias-finder
  zgen oh-my-zsh plugins/colored-man-pages
  zgen oh-my-zsh plugins/colorize
  zgen oh-my-zsh plugins/command-not-found
  zgen oh-my-zsh plugins/common-aliases
  zgen oh-my-zsh plugins/extract
  zgen oh-my-zsh plugins/git
  zgen oh-my-zsh plugins/git-auto-fetch
  zgen oh-my-zsh plugins/gitignore
  zgen oh-my-zsh plugins/golang
  zgen oh-my-zsh plugins/gpg-agent
  zgen oh-my-zsh plugins/history
  zgen oh-my-zsh plugins/node
  zgen oh-my-zsh plugins/npm
  zgen oh-my-zsh plugins/python
  zgen oh-my-zsh plugins/sudo
  zgen oh-my-zsh plugins/systemd
  zgen oh-my-zsh plugins/thefuck
  zgen oh-my-zsh plugins/ubuntu
  zgen oh-my-zsh plugins/vscode
  zgen oh-my-zsh plugins/wd
  zgen oh-my-zsh plugins/z

  zgen loadall <<EOPLUGINS
    desyncr/auto-ls
    djui/alias-tips
    srijanshetty/node.plugin.zsh
    voronkovich/mysql.plugin.zsh
    zlsun/solarized-man
    zpm-zsh/ls
    zpm-zsh/ssh
    zsh-users/zsh-autosuggestions
    zsh-users/zsh-syntax-highlighting
    zsh-users/zsh-history-substring-search
EOPLUGINS

  zgen load zsh-users/zsh-completions src

  zgen load romkatv/powerlevel10k powerlevel10k

  zgen save

fi

ZSH_AUTOSUGGEST_HIGHLIGHT_STYLE="fg=#120299,bg=cyan"

[[ ! -f ~/.p10k.zsh ]] || source ~/.p10k.zsh
```

4. Install `tlp`

```shell
sudo apt install tlp
sudo tlp start
```
