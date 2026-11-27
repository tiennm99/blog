---
title: "systemd-swap"
date: 2020-05-08
tags: [ "Arch", "Linux", "Systemd" ]
---

Đây là một service nhằm tạo ra swap động theo thời gian. Khởi tạo ban đầu chỉ có 512MiB thôi, nhưng sẽ tăng lên một cách **tự động** khi bạn sử dụng. Cài đặt như sau:

```shell
yay -S systemd-swap
```

Trong file `/etc/systemd/swap.conf` cài đặt như sau:

```shell
swapfc_enabled=1
```

Sau đó enable service systemd-swap:

```shell
sudo systemctl enable systemd-swap
```

Vậy là xong!!!
