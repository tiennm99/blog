---
title: "Arch Linux 'Post-Installation'"
date: 2020-04-08
tags: [ "Arch", "Linux" ]
---

Following up on my Arch Linux installation post, here are the things I think you should do before rebooting into your new system.

## Installing a Desktop Environment for Arch Linux

After finishing the steps in the installation guide, Arch Linux is ready to run, but only in console mode. To install a desktop environment, run the following commands (while still inside `arch-chroot`):

```shell
pacman -S xorg-server
pacman -S cinnamon
```

Here I'm using the Cinnamon desktop environment (DE), and my future guides will also focus on Cinnamon. Arch supports plenty of other DEs listed at <https://wiki.archlinux.org/index.php/Desktop_environment,> so feel free to pick whichever one suits you best, such as GNOME, KDE, etc. Arch also supports i3, a super cool "programmer's" window manager, though I'm not pro enough to daily-drive it yet :v Since Cinnamon is based on GTK, you can also install the `gnome` group if you want extra bundled applications.

```shell
pacman -S lightdm lightdm-gtk-greeter
```

I use LightDM as my display manager; if you use GNOME, GDM is already included by default.

```shell
systemctl enable lightdm
```

This enables the LightDM service at boot; if you use a different display manager, substitute its service name here.

```shell
systemctl enable NetworkManger
```

(this is the network management service, mainly to make connecting to Wi-Fi much easier)

## Adding a User to the System

By default, only the `root` user exists on the system. For everyday use, you should create a regular user account to log in with:

```shell
useradd -m -G wheel -s /bin/bash tien
```

(`-m` creates a home directory for the user, e.g. `/home/tien`; `-G wheel` adds the user to the `wheel` group, which we'll use to grant `sudo` privileges next; `-s /bin/bash` sets your default shell to bash—later I'll write a post introducing `zsh`, a much more customizable shell; and `tien` is the username you want to create—my name is Tiến so I just used `tien` :v)

### Granting sudo Privileges

```shell
pacman -S sudo
```

(obviously we need `sudo` installed before we can grant `sudo` privileges :v)

```shell
pacman -S neovim
```

(this is the editor I'll use; you can install `vim`, `vi`, `nano`, or whatever you prefer—I like Neovim so that's what I install :))
`EDITOR=nvim visudo` (`visudo` uses `vi` by default, so we set `EDITOR` to use Neovim instead)

Uncomment the line `wheel ALL=(ALL) ALL`, save, and exit—that's it :D

## Installing a Terminal Emulator

If you only installed Cinnamon, you won't have a terminal emulator installed by default, meaning you'd have to switch to another TTY (`Ctrl + Alt + Fx`, where `x` is 2 to 6) just to run commands. Here I'll install Terminator:

```shell
pacman -S terminator
```

And now you have a truly usable system! Later on I'll write more posts on beautifying and tweaking Arch. See you next time!!
