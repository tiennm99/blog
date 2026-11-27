---
title: "Kết nối với wifi HCMUT01 của trường ĐH Bách Khoa trên Linux"
date: 2020-05-14
tags: [ "Linux", "Wifi" ]
---

Trong Windows thì khi kết nối bạn đã có chỗ để đăng nhập username và password sẵn, giờ mình sẽ hướng dẫn trên linux.

Bạn chọn các mục như sau:

```shell
Security: WPA & WPA Enterprise
Authentication: Tunneled TLS
Anonymous identity: (tên người dùng của bạn, tên này là tên bạn đăng nhập vào myBK ấy)
Domain: hcmut.edu.vn
CA cerificate: (None)
CA certificate password: (Để trống)
Show passwords: (không chọn)
No CA certificate is required: (chọn)
Inner authentication: PAP
Username: (tên người dùng của bạn, giống với identity ở trên)
Password: mật khẩu
```

Vậy là xong, sau đó thì bạn connect thôi. Chúc các bạn thành công.
