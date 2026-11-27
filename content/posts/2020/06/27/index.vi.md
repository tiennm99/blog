---
title: "Những việc cần làm sau khi cài đặt Ubuntu 20.04"
date: 2020-06-27
tags: [ "Ubuntu", "Linux" ]
---

**Đây là bài viết tổng hợp những điều cơ bản mình đã làm sau khi cài lại Ubuntu 20.04**

1. Cập nhật hệ thống

```shell
sudo apt update
sudo apt upgrade
```

2. Cài đặt một số phần mềm cần thiết

```shell
sudo apt install gdebi
```

Các phần mềm mình đã cài với `gdebi` là:
  - [Google Chrome](https://www.google.com/chrome/)
  - [Visual Studio Code](https://code.visualstudio.com/)
  - [Dropbox](https://www.dropbox.com/install)

Một số phần mềm hay ho khác:

  - Spotify:
  ```shell
  curl -sS https://download.spotify.com/debian/pubkey.gpg | sudo apt-key add -
  echo "deb http://repository.spotify.com stable non-free" | sudo tee /etc/apt/sources.list.d/spotify.list
  sudo apt-get update && sudo apt-get install spotify-client
  ```

3. Cài đặt `zsh`

```shell
sudo apt install zsh
chsh -s /usr/bin/zsh
```

Cài đặt công cụ quản lý zsh plugins: `zgen`. Mặc dù `zgen` đã cũ nhưng mà mình thấy trong những công cụ khác trong repository của Ubuntu là `zplug` và `zsh-antigen` thì `zgen` đơn giản và nhẹ hơn nhiều.

```shell
sudo apt install zgen
```

Chỉnh sửa file `.zshrc` của bạn lại cho phù hợp, ví dụ của mình như sau:

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

4. Cài đặt `tlp`

```shell
sudo apt install tlp
sudo tlp start
```
