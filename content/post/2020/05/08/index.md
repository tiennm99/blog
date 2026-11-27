---
title: "systemd-swap"
date: 2020-05-08
tags: [ "Arch", "Linux", "Systemd" ]
---

This is a service that creates dynamic swap space over time. It starts out at just 512MiB, but grows **automatically** as you use your system. Install it as follows:

```shell
yay -S systemd-swap
```

In `/etc/systemd/swap.conf`, configure it as follows:

```shell
swapfc_enabled=1
```

Then enable the `systemd-swap` service:

```shell
sudo systemctl enable systemd-swap
```

And that's it!!!
