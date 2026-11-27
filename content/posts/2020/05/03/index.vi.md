---
title: "Splash screen cho Archlinux"
date: 2020-05-03
tags: [ "Arch", "Linux", "Plymouth" ]
---

Bài này mình sẽ hướng dẫn các bạn cài Plymouth làm Splash screen trên Arch Linux. Giống kiểu mấy chấm xoay xoay trên Windows, 5 chấm trắng trắng cam cam trên Ubuntu (mà nay bản 20.04 đổi rồi) hay vòng tròn quay quay trên Fedora vậy.

**Note**: Mình chỉ hướng dẫn thôi chứ mình không còn dùng nữa. Vì mình cảm giác nó làm quá trình khởi động của mình chậm đi.

## Đầu tiên cần cài đặt Plymouth

```shell
yay -S plymouth
```

Chỉnh sửa file `/etc/mkinitcpio.conf`: Thêm plymouth vào sau base và udev trong dòng HOOKS. VD như sau:

```shell
HOOKS=(base udev plymouth ...)
```

Trong file /etc/default/grub, sửa lại kernel parameters lại như sau:

```shell
GRUB_CMDLINE_LINUX_DEFAULT="quiet splash loglevel=3 rd.udev.log_priority=3 vt.global_cursor_default=0"
```

Sau đó cập nhật lại grub nhé!

Trên đó chỉ là ví dụ thôi, bạn có thể xem thêm về Silent Boot tại đây: <https://wiki.archlinux.org/index.php/Silent_boot>

Khởi tạo lại initramfs:

```shell
sudo mkinitcpio -P
```

## Sau đó cài đặt theme

Trong AUR cũng có nhiều theme lắm rồi, bạn cũng có thể tự tìm thêm nguồn ngoài như trên GitHub... Sau đó copy vào folder `/usr/share/plymouth/themes`.

Liệt kê theme có trong máy:

```shell
plymouth-set-default-theme -l
```

Mặc định khi cài plymouth sẽ có các theme sau:

```shell
details glow solar spinner tribar fade-in script spinfinity text
```

Đổi theme, ví dụ là script:

```shell
plymouth-set-default-theme -R script
```

Để làm cho Plymouth xuất hiện sớm hơn, sửa file `/etc/plymouth/plymouthd.conf`, đổi `ShowDelay=5` thừ 5 thành 0 nhé!

Để transition mượt hơn, đổi display manager của bạn lại, Vd thay vì dùng `lightdm` thì dùng `lightdm-plymouth` nhé!

Có một vài tinh chỉnh dành cho các bạn dùng encrypt, nhưng mình nghĩ ở đây cũng không mấy bạn dùng nên không giới thiệu nhé. Nếu bạn cần, có thể inbox fanpage của mình nha! Hẹn gặp lại.
