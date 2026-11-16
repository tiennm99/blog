---
title: "Auto TRIM SSD"
date: 2020-04-20
tags: [ "Arch", "Linux", "SSD" ]
---

The `util-linux` package already provides `fstrim.service` and `fstrim.timer` for `systemd`, so all you need to do is enable `fstrim.timer`. Run the following command:

```shell
sudo systemctl enable fstrim.timer
```

By default, it runs once a week.

See you next time!
