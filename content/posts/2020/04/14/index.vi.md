---
title: "Tinh chỉnh Cinnamon trong Archlinux"
date: 2020-04-14
tags: [ "Arch", "Linux", "Cinnamon" ]
---

Nhìn sơ thì cũng thấy Cinnamon khi bạn cài đặt Linux Mint thì đẹp hơn nhiều so với cái mà bạn vừa cài đặt, ôi thôi, nó '
chuối ơi là chuối' luôn. Vì vậy chúng ta sẽ làm cho nó được như trong Mint nha !😀

## Slick-greeter

Đây là greeter của LightDM trong Mint (mặc định khi cài Arch là GTK+ Greeter). Để cài đặt bạn chạy lệnh sau:

```shell
yay -S lightdm-slick-greeter
```

Và cài thêm cái này để tinh chỉnh bằng giao diện (GUI), không thì mình vẫn có thể 'chơi' với mấy file .conf thôi :v

```shell
yay -S lightdm-settings
```

Sửa file /etc/lightdm/lightdm.conf như sau:
Ở dưới mục `[Seat:*]` tìm dòng `greeter-session=example-gtk-gnome`, uncomment và sửa
thành `greeter-session=lightdm-slick-greeter`

## Themes và icons

Ban đầu thì Cinnamon dùng Adwaita của Gnome, nhìn khá là thô sơ, giờ chúng ta cài thêm Theme và Icon của Mint vào:

```shell
yay -S mint-themes mint-x-icons mint-y-icons
```

Sau đó vào Settings để đổi theme với icon trong mục Appearance -> Themes nhé!

## Âm thanh

Ban đầu thì chưa có hiệu ứng âm thanh ánh sáng gì hết trơn ấy, mình thêm vào bằng các package như sau:

```shell
yay -S cinnamon-sound-effects mint-sounds
```

Chỉnh lại trong Settings mục Hardware -> Sound tab Sounds để dùng nhé!
(Nếu không có tác dụng thì bạn thử restart lại cinnamon nha)

## Phần mềm cần thiết

Khi mới cài hầu như Cinnamon không có gì dùng hết :/, nên mình mới khuyên cài group gnome trước đã rồi hãy cài Cinnamon,
mấy cái cần thiết thì như là Screenshot, Terminal, Software:

```shell
yay -S gnome-screenshot gnome-terminal gnome-software
```

, cơ mà cái gnome thì ‘tặng kèm’ kha khá phần mềm khác nữa :v, mà tiêu chí của Arch là ‘Keep It Simple’ nên nếu không
cài gnome thì cũng chẳng sao cả, cứ cài cái gì cần thiết thôi.

Đó là điều hơi buồn của cinnamon trên Arch, bởi vì các DE khác thì thường có gói extra đi kèm: `deepin`
có `deepin-extra`, `gnome` có `gnome-extra`, `mate` có `mate-extra`,... đến cả thằng em được mệnh danh là 'gọn
nhẹ' `xfce4` mà cũng có `xfce4-goodies` nữa.;còn `cinnamon` thì chưa. Nhưng mà nếu cần combo của Cinnamon ư? Thì mình
nghĩ cài nhiêu đây là cơ bản rồi:

```shell
yay -S xed xviewer xreader xplayer pix blueberry
```

## Nemo-fileroller

Đây là package giúp cho bạn có tùy chọn “extract here” trong nemo. Để cài đặt:

```shell
yay -S nemo-fileroller
```

Sau đó restart nemo: `nemo -q`

Đây chỉ là cài cho giống Mint thôi, còn để làm Arch Cinnamon độc đáo hơn nữa, màu mè hơn nữa thì mình dành cho bài khác
nha. Tạm biệt các bạn, hẹn gặp lại.
