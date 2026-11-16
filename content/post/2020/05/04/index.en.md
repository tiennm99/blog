---
title: "Gaming with Steam on Arch Linux"
date: 2020-05-04
tags: [ "Arch", "Linux", "Game", "Steam" ]
---

Steam is one of the rare platforms that truly favors Linux. While most other platforms don't support Linux at all, Steam even has its own Linux-based OS for gamers called SteamOS, plus official support for Ubuntu. On top of that, many of the titles that made Steam famous—like Dota 2, CS:GO, etc.—run on it. Recently, there's also a pretty fun game I tried (and got addicted to) called Dota Underlords (though I'm determined to quit now^^). Right now, I only play a chill farming game called Farm Together with my girlfriend :v. In short, setting aside native Linux games (most of which are pretty cheesy and unappealing), Steam is currently the best gaming platform for Linux.

## Enable multi-lib

To install Steam, we first need to enable the `multi-lib` repo on Arch. This repository contains 32-bit libraries required by platforms like Steam or Wine. To enable it, open `/etc/pacman.conf` and uncomment the following 2 lines:

```shell
[multilib]
Include = /etc/pacman.d/mirrorlist
```

Then update the system:

```shell
yay (or sudo pacman -Syyu)
```

## Install Steam

Now we can go ahead and install Steam:

```shell
yay -S steam
```

## Use a dedicated graphics card for gaming

Normally, when using Linux on a laptop, hardly anyone cares about the dedicated graphics card anymore (though installing Linux to play games already sounds a bit 'weird' :v). Still, you can configure your games on Steam to use your dedicated GPU by setting the game's Launch Options as follows:

```shell
DRI_PRIME=1 %command%
```

## A quick tip to improve gaming performance

You can also install `gamemode` so the tool automatically tweaks your system settings while gaming:

```shell
yay -S gamemode
```

Then start the `gamemoded` service:

```shell
systemctl start gamemoded --user
```

To use it, set the game's Launch Options as follows:

```shell
gamemoderun %command%
```

And that's it—now we can fire up the game and play!!!
