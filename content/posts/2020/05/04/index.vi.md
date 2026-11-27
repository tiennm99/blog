---
title: "Chơi game với Steam trên Archlinux"
date: 2020-05-04
tags: [ "Arch", "Linux", "Game", "Steam" ]
---

Có thể nói Steam là một nền tảng hiếm hoi ưu ái cho Linux, trong khi hầu hết các nền tảng khác không hỗ trợ Linux thì Steam có hẳn một OS riêng dựa trên Linux cho gamer, đó là SteamOS; ngoài ra còn hỗ trợ chính thức cho Ubuntu. Hơn nữa, nhiều tựa game đã làm nên tên tuổi Steam như Dota 2, CS:GO,... Mới đây thì có tựa game khá hay mình cũng có thử (và nghiện) đó là Dota Underlords (nhưng mà quyết tâm cai rồi nha^^). Hiện tại thì mình chỉ chơi game nông trại vui vui là Farm Together cùng với gấu yêu thôi :v. Nói tóm lại là nếu không nói đến các game native (mà đa phần khá là 'chuối', thiếu cuốn hút) thì Steam là nền tảng chơi game tốt nhất hiện nay cho Linux.

## Kích hoạt multi-lib

Để cài đặt Steam thì trước hết ta cần kích hoạt repo `multi-lib` cho Arch, repo này chứa các thư viện 32bit, nhằm để phục vụ cho các nền tảng như Steam hay Wine. Để kích hoạt repo này, ta mở file `/etc/pacman.conf`, và uncomment 2 dòng sau:

```shell
[multilib]
Include = /etc/pacman.d/mirrorlist
```

Sau đó cập nhật lại hệ thống:

```shell
yay (hoặc sudo pacman -Syyu)
```

## Cài Steam

Và thế là có thể cài steam được rồi:

```shell
yay -S steam
```

## Chọn card màn hình rời để chơi game

Thông thường thì dùng Linux cho laptop thì chắc chẳng ai quan tâm card màn hình rời nữa (cơ mà cài Linux mà chơi game là thấy cũng 'lạ' rồi :v). Tuy nhiên bạn vẫn có thể setting để chơi game sử dụng card màn hình rời trên Steam bằng cách đặt Lauch Option cho game như sau:

```shell
DRI_PRIME=1 %command%
```

## Tip nhỏ để cải thiện hiệu năng khi chơi game

Bạn có thể cài thêm gamemode để tool tinh chỉnh cấu hình hệ thống của bạn khi chơi game:

```shell
yay -S gamemode
```

Sau đó khởi chạy service gamemoded:

```shell
systemctl start gamemoded --user
```

Để sử dụng, thì bạn đặt Lauch Option cho game như sau:

```shell
gamemoderun %command%
```

Vậy là cuối cùng ta có thể mở game và chiến thôi!!!
