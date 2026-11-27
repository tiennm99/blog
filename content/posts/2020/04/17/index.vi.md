---
title: "Một số vấn đề gặp phải"
date: 2020-04-17
tags: [ "Arch", "Linux", "Trouble" ]
---

Đây là bài viết tổng hợp một số vấn đề mình gặp phải và cách giải quyết, đây là những cách mà mình làm thì nó hoạt động nên ở mức độ "just work", mình không đảm bảo là nếu bạn gặp tình huống như mình thì sẽ được. Bài viết sẽ được cập nhật lại trong quá trình sử dụng của mình nhé!

#### Arch Cinnamon không tắt màn hình sau thời gian đã định

Bạn thử cài đặt gói `light-locker` xem:

```shell
yay -S light-locker
```

#### Không play được file .mp4 trong Totem và các player khác base-on Totem

Thường thì lỗi này do các bạn thiếu codec cho file này, để cài đặt:

```shell
yay -S gst-libav
```

Hẹn gặp lại các bạn trong các bài viết khác nha!
