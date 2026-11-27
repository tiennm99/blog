---
title: "Tweaks nho nhỏ cho Firefox"
date: 2020-04-18
tags: [ "Arch", "Linux", "Firefox" ]
---

## Cache on RAM

Mặc định thì Firefox sẽ lưu cache trong cả RAM và đĩa, khi lưu trên RAM sẽ giúp cho truy xuất cache nhanh hơn, đồng thời giảm số lần ghi đĩa (đặc biệt tốt cho SSD nhé) thì làm như sau:
Gõ vào đường dẫn url của firefox: `about:config`  
Đặt `browser.cache.disk.enable` thành `false`  
Đảm bảo `browser.cache.memory.enable` là `true`  
Bạn cũng có thể chỉnh lượng RAM mà Firefox sẽ dùng để lưu cache trong mục `browser.cache.memory.capacity`, để mặc định là -1 Firefox sẽ tự động lựa chọn dung lượng.

## Tắt Pocket

Pocket mặc định đi kèm Firefox nhưng mình chả mấy sử dụng, nên tắt thôi :D, cũng trong `about:config` ở trên, tìm `extensions.pocket.enabled` và đặt thành false thôi !😀

## Cache toàn bộ profile vào RAM qua tmpfs

**Bạn cần đảm bảo có đủ cache để mount profile nhé, không thì sẽ gặp lỗi hết bộ nhớ đó!**

Mặc định thì tmpfs (service `tmp.mount`) khởi chạy mặc định rồi, để tận dụng hơn việc mount /tmp qua ram, thì ta có thể cache toàn bộ profile của Firefox vào RAM qua tmpfs luôn. Đầu tiên, cài đặt Profile-sync-daemon:

```shell
yay -S profile-sync-daemon
```

Sau đó sửa file `~/.config/psd/psd.conf` lại, thêm firefox vào list BROWSERS, VD:

```shell
BROWSERS=”firefox”
```

Profile-sync-daemon còn hỗ trợ google-chrome, bạn có thể xem thêm ngay trong file ấy, vì vậy có thể thêm browsers bạn dùng vào list trên
Khởi chạy Profile-sync-daemon cùng hệ thống:

```shell
systemctl --user enable psd.service
```

Vậy là xong rồi, các bạn có thể tham khảo thêm nhiều tweaks khác tại: <https://wiki.archlinux.org/index.php/Firefox/Tweaks>

Hẹn gặp lại trong các bài viết khác nhé!
