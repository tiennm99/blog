---
title: "Kích hoạt Numlock khi khởi động với LightDM"
date: 2020-05-02
tags: [ "Linux", "Display Manager" ]
---

Cài đặt numlockx:

```shell
yay -S numlockx
```

Mở file `/etc/lightdm/lightdm.conf`, thêm dòng như sau:

```shell
[Seat:*]
greeter-setup-script=/usr/bin/numlockx on
```

Vậy là xong!!
