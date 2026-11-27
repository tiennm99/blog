---
title: "Chạy các app cần GUI trong Docker"
date: 2020-05-09
tags: [ "Linux", "Docker" ]
---

Trường hợp của mình là mình lập trình app Python có sử dụng thư viện `matplotlib`. Để mình có thể sử dụng được giao diện thì mình cài đặt xhost trong host Arch trước:

```shell
yay -S xorg-xhost
```

`xhost local:root` hoặc `xhost +` (cái này mình không rõ, nó cho phép hết tất cả truy cập vào màn hình luôn, còn phân chia cho từng app cụ thế thì mình không biết)

Sau đó chạy Docker với tham số bổ sung là `–env="DISPLAY"`. VD:

```shell
docker run -it –rm –net=host –env="DISPLAY" –workdir=/workspace –volume="$HOME/Dropbox/PP:/workspace:rw" ubuntu bash
```

Sau đó trong Docker, mình cài thêm gói `python3-pip` nữa.

Chúc các bạn thành công!!
