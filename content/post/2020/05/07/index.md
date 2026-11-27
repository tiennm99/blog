---
title: "Helping Your Battery 'Live' Longer"
date: 2020-05-07
tags: [ "Linux", "Battery" ]
---

#### Install TLP

```shell
yay -S tlp tlp-rdw
```

Since I use a ThinkPad laptop—and a newer model at that—I also install the following 2 packages:

```shell
yay -S acpi_call-dkms tpacpi-bat
```

Start TLP on boot:

```shell
systemctl enable tlp-sleep.service
```

Some other recommended settings:

```shell
systemctl enable NetworkManager-dispatcher.service
systemctl mask systemd-rfkill.service
systemctl mask systemd-rfkill.socket
```

There are also a few other equally useful tools you should look into, such as `cpupower` and `thermald`.

And that's it. See you next time!
