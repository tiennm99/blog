---
title: "Giúp pin 'sống' lâu hơn"
date: 2020-05-07
tags: [ "Linux", "Battery" ]
---

#### Cài đặt TLP

```shell
yay -S tlp tlp-rdw
```

Vì mình sử dụng laptop ThinkPad, hơn nữa là dòng mới, nên mình cài thêm 2 package sau:

```shell
yay -S acpi_call-dkms tpacpi-bat
```

Khởi chạy tlp khi khởi động:

```shell
systemctl enable tlp-sleep.service
```

Vài cài đặt được khuyên dùng khác:

```shell
systemctl enable NetworkManager-dispatcher.service
systemctl mask systemd-rfkill.service
systemctl mask systemd-rfkill.socket
```

Vài tool khác cũng thiết thực không kém, bạn nên tìm hiểu thêm như `cpupower` và `thermald`.

Vậy là xong. Hẹn gặp lại!
