---
title: "Theming GRUB"
date: 2020-05-01
tags: [ "Arch", "Linux", "GRUB" ]
---

Want a nicer-looking GRUB menu? Today I'll share a quick way to spruce up your GRUB interface. Here I'll use the litarvan theme available in the Arch repositories as an example:

```shell
yay -S grub-theme-vimix
```

Next, add the following line to `/etc/default/grub`:

```shell
GRUB_THEME=”/usr/share/grub/themes/Vimix/theme.txt”
```

Update GRUB and reboot to enjoy the new look! 😀

```shell
grub-mkconfig -o /boot/grub/grub.cfg
```

If this theme isn't your style, you can download another theme or even create your own. Just make sure to place it in a directory that the system can access at boot without needing user-level permissions—such as under `/usr/share` as shown above.

Enjoy your newly styled GRUB! See you next time.
