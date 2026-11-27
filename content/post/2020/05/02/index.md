---
title: "Enabling Numlock on Boot with LightDM"
date: 2020-05-02
tags: [ "Linux", "Display Manager" ]
---

Install `numlockx`:

```shell
yay -S numlockx
```

Open `/etc/lightdm/lightdm.conf` and add the following under `[Seat:*]`:

```shell
[Seat:*]
greeter-setup-script=/usr/bin/numlockx on
```

And you're done!!
