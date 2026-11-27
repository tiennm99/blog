---
title: "Tweaking Cinnamon on Arch Linux"
date: 2020-04-14
tags: [ "Arch", "Linux", "Cinnamon" ]
---

At first glance, Cinnamon on Linux Mint looks way better than the bare-bones Cinnamon you get right after installing it on Arch—honestly, the default look is super plain and clunky. So let's make it look just like it does on Mint! 😀

## Slick-greeter

This is the LightDM greeter used in Linux Mint (Arch defaults to the GTK+ Greeter). To install it, run:

```shell
yay -S lightdm-slick-greeter
```

And install this package as well so you can configure it via a GUI—otherwise you can always just mess around with the `.conf` files by hand :v

```shell
yay -S lightdm-settings
```

Edit `/etc/lightdm/lightdm.conf` as follows:
Under the `[Seat:*]` section, find the line `greeter-session=example-gtk-gnome`, uncomment it, and change it to `greeter-session=lightdm-slick-greeter`.

## Themes and Icons

Out of the box, Cinnamon uses GNOME's Adwaita theme, which looks pretty rough. Let's install Linux Mint's themes and icons:

```shell
yay -S mint-themes mint-x-icons mint-y-icons
```

Then open Settings and switch your theme and icons under Appearance -> Themes!

## Sound Effects

By default, there aren't any system sound effects at all. We can add them by installing these packages:

```shell
yay -S cinnamon-sound-effects mint-sounds
```

Then enable and configure them in Settings under Hardware -> Sound -> Sounds tab!
(If they don't take effect right away, try restarting Cinnamon.)

## Essential Applications

A fresh Cinnamon installation comes with almost no bundled apps :/, which is why I previously suggested installing the `gnome` group before Cinnamon for essentials like Screenshot, Terminal, and Software:

```shell
yay -S gnome-screenshot gnome-terminal gnome-software
```

That said, the `gnome` group pulls in quite a lot of extra stuff :v, and since Arch's philosophy is "Keep It Simple", skipping `gnome` is totally fine—just install whatever you actually need.

It's a bit of a shame for Cinnamon on Arch, because most other DEs have a companion `-extra` package group: `deepin` has `deepin-extra`, `gnome` has `gnome-extra`, `mate` has `mate-extra`, and even lightweight `xfce4` has `xfce4-goodies`—whereas `cinnamon` doesn't have one yet. Want the standard Cinnamon app suite anyway? Installing this set covers the basics:

```shell
yay -S xed xviewer xreader xplayer pix blueberry
```

## Nemo-fileroller

This package adds the handy "Extract Here" context-menu option to Nemo. To install it:

```shell
yay -S nemo-fileroller
```

Then restart Nemo: `nemo -q`

This just gets your setup looking and feeling like Linux Mint—I'll save making Arch Cinnamon even more unique and flashy for a future post. Bye for now, and see you next time!
