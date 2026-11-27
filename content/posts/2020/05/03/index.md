---
title: "Splash Screen for Arch Linux"
date: 2020-05-03
tags: [ "Arch", "Linux", "Plymouth" ]
---

In this post, I'll show you how to install Plymouth as a boot splash screen on Arch Linux—similar to the spinning dots on Windows, the 5 white-and-orange dots on Ubuntu (which changed in 20.04), or the spinning circle on Fedora.

**Note**: I'm only writing this as a guide; I don't actually use it anymore because I felt it slowed down my boot time.

## First, Install Plymouth

```shell
yay -S plymouth
```

Edit `/etc/mkinitcpio.conf`: Add `plymouth` right after `base` and `udev` in the `HOOKS` array, like so:

```shell
HOOKS=(base udev plymouth ...)
```

In `/etc/default/grub`, update the kernel parameters as follows:

```shell
GRUB_CMDLINE_LINUX_DEFAULT="quiet splash loglevel=3 rd.udev.log_priority=3 vt.global_cursor_default=0"
```

Then remember to update GRUB!

The above is just an example; you can read more about Silent Boot here: <https://wiki.archlinux.org/index.php/Silent_boot>

Regenerate the initramfs:

```shell
sudo mkinitcpio -P
```

## Next, Install a Theme

There are plenty of themes available in the AUR, or you can grab themes from external sources like GitHub and copy them into `/usr/share/plymouth/themes`.

List the installed themes on your machine:

```shell
plymouth-set-default-theme -l
```

By default, Plymouth comes with the following themes:

```shell
details glow solar spinner tribar fade-in script spinfinity text
```

To switch themes—for example, to `script`:

```shell
plymouth-set-default-theme -R script
```

To make Plymouth appear earlier during boot, edit `/etc/plymouth/plymouthd.conf` and change `ShowDelay=5` from `5` to `0`!

For a smoother transition to your login screen, switch your display manager service to its Plymouth variant—for example, instead of `lightdm`, use `lightdm-plymouth`!

There are a few extra tweaks for encrypted setups, but since I don't think many readers here use full-disk encryption, I'll skip them. If you need help with that, feel free to message my fanpage! See you next time.
