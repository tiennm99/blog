---
title: "Installing AUR Packages on Arch Linux"
date: 2020-04-13
tags: [ "Arch", "Linux", "yay", "AUR" ]
---

The Arch User Repository (AUR) is a community-driven repository where anyone can create their own packages and share them with other users. It's one of the main reasons Arch is so convenient and why so many people choose Arch as their daily distro.

Pretty much any package you can find on other distros is available either in the Official Repositories or in the AUR. Well-known software almost always has an AUR package—for instance, `ibus-bamboo`, my favorite Vietnamese input method, is right there in the AUR.

Moreover, for open-source projects that only provide source code for users to build themselves (such as projects on GitHub), installing from the AUR is much easier and makes package management a breeze.

At the time of writing, while the Official Repositories already have an impressive 11,278 packages, the AUR has a whopping 59,729 packages—pretty massive, right? :D

Of course, that strength is also its weakness: since anyone can upload packages to the AUR, it has a reputation for potentially coming with a few "free" viruses or malware courtesy of the package author :v. So be careful and stick to packages from trusted sources—such as packages mentioned on the Arch Wiki, linked directly from the project's official homepage (for example, `ibus-bamboo` explicitly lists its AUR package for Arch and Arch-based distros), or packages with high vote counts and popularity scores.

## How to Install Packages from the AUR (yay)

Here I'll walk you through installing `yay` (a very popular AUR helper). Since this is a basic guide, I'll skip advanced build configurations and just cover the 3 main steps.

First, install the `base-devel` package group, which contains the essential tools needed to build packages:

```shell
sudo pacman -S base-devel
```

Next, clone the package repository from its AUR link—here I'm using `yay` (<https://aur.archlinux.org/packages/yay/):>

```shell
git clone https://aur.archlinux.org/yay.git`
cd yay
makepkg -si
```

And that's it :D Super simple, right? Once installed, the package can be managed by `pacman` just like any regular package. However, `pacman` cannot automatically update AUR packages—if you want to update them manually, you'd have to track updates yourself and repeat the steps above. To get around that inconvenience, we use AUR helpers, and here I use `yay`.

## yay (Yet another Yogurt)

As mentioned above, installing a package from the AUR only takes 3 simple steps, but it doesn't handle automatic updates. That's why I'm introducing `yay`: with `yay`, installing an AUR package takes just a single command, identical to `pacman` :v (since `yay` is a Pacman wrapper, after all :D). The only difference during installation is an extra build step, so it takes a bit longer than usual. On top of that, `yay` combines the best ideas from `yaourt`, `apacman`, and `pacaur` (pretty big names if you've been around Arch for a while :v—though `yaourt` is now discontinued, which is why `yay` stepped in to replace it).

Without further ado, I already showed how to install `yay` above, so I won't repeat myself :v

As for how to use it... well, since `yay` uses the exact same syntax as `pacman`, there's barely anything to explain :v. If you want to install package `X`, just run `yay -S X` :v, read the prompts to pick whichever options you want, or if you're feeling lazy, just keep hitting Enter—9 times out of 10 it'll install just fine :v

Oh, one quick tip: to update your entire system, all you need to run is `yay` (it acts as a shorthand for `yay -Syyu`, just like `sudo pacman -Syyu` :v). No need to overcomplicate things—just type `yay` :D
