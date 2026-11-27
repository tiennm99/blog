---
title: "'Hậu cài đặt' Archlinux"
date: 2020-04-08
tags: [ "Arch", "Linux" ]
---

Tiếp theo bài cài đặt Arch Linux thì đây là những điều theo mình là nên làm trước khi reboot để dùng.

## Cài đặt giao diện cho Arch Linux

Sau khi hoàn tất các bước ở bài cài đặt, thì bạn đã có thể sử dụng Arch Linux rồi, tuy nhiên đó chỉ là giao diện console
thôi, để cài đặt môi trường Desktop thì bạn làm như sau: (lúc này vẫn còn ở trong chế độ của `arch-chroot` nha các bạn)

```shell
pacman -S xorg-server
pacman -S cinnamon
```

Ở đây mình dùng desktop environment (DE) là cinnamon; sau này các bài hướng dẫn mình cũng hướng dẫn cho cinnamon thôi.
Arch hỗ trợ rất nhiều DE khác nhau được liệt kê ở <https://wiki.archlinux.org/index.php/Desktop_environment,> các bạn có
thể chọn một DE khác thích hợp như Gnome, KDE,... Đặc biệt Arch có hỗ trợ i3, một DE có thể nói là 'dành cho lập trình
viên' rất 'cool', nhưng mình không pro như thế nên chưa dùng được :v Vì cinnamon cũng dựa trên gtk nên các bạn có thể
cài đặt gnome để có những phần mềm bổ sung thêm khác

```shell
pacman -S lightdm lightdm-gtk-greeter
```

Mình dùng LightDM làm display manager, nếu bạn dùng gnome thì mặc định đã có gdm được cài rồi

```shell
systemctl enable lightdm
```

Để service của LightDM khởi động cùng hệ thống, nếu dùng DM khác thì bạn thay tên vào đó

```shell
systemctl enable NetworkManger
```

(đây là service quản lý mạng (chủ yếu là để kết nối wifi dễ dàng hơn))

## Thêm người dùng vào hệ thống

Mặc định bạn mới có user root trong hệ thống thôi, để dùng thì mình nên tạo một user khác để đăng nhập vào:

```shell
useradd -m -G wheel -s /bin/bash tien
```

(-m để hệ thống tạo một thư mục home cho bạn, vd ở đây là /home/tien; -G wheel để thêm bạn vào group wheel, group này
dùng để cấp quyền sudo cho bạn sau này; -s /bin/bash, shell của bạn, ở đây mình dùng bash, sau này mình viết bài giới
thiệu cho các bạn về zsh, một shell dễ tùy chỉnh hơn; tien là tên người dùng bạn muốn tạo, mình tên Tiến thì tạo tên
tien thôi :v)

### Cấp quyền sudo

```shell
pacman -S sudo
```

(tất nhiên phải có sudo mới cấp quyền chứ :v)

```shell
pacman -S neovim
```

(editor mình sẽ dùng để edit, bạn có thể cài vim, vi hay nano,... tùy bạn, mình thích dùng neovim nên cài thôi :))
`EDITOR=nvim visudo` (mặc định visudo dùng vi nên để dùng neovim mình phải cấu hình lại EDITOR)

Bỏ comment ở dòng `wheel ALL=(ALL) ALL`, vậy là được, lưu lại và thoát thôi :D

## Cài đặt một terminal

Nếu bạn chỉ cài cinnamon thì ban đầu bạn sẽ chưa có terminal nào, nếu muốn dùng lệnh thì sẽ phải vào TTY khác (Ctrl +
Alt + Fx(x từ 2 đến 6 ấy). Ở đây mình cài Terminator nhé:

```shell
pacman -S terminator
```

Vậy là bạn đã có một hệ thống 'có thể dùng được' rồi đấy, sau này mình sẽ có các bài làm đẹp Arch, tinh chỉnh Arch,..
nữa. Hẹn gặp lại!!
