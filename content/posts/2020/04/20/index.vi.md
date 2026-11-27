---
title: "Auto TRIM SSD"
date: 2020-04-20
tags: [ "Arch", "Linux", "SSD" ]
---

Package `util-linux` cung cấp `fstrim.service` và `fstrim.timer` trong `systemd` rồi, nên để sử dụng bạn chỉ cần chạy `fstrim.timer` là đủ. Thực hiện như sau:

```shell
sudo systemctl enable fstrim.timer
```

Thời gian mặc định là 1 tuần

Hẹn gặp lại!
