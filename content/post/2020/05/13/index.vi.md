---
title: "Không vào được trang đăng nhập của router (VD: Inet Center)"
date: 2020-05-13
tags: [ "Issue" ]
---

Hiện tại mình đang ở KTX khu A của ĐHQG TpHCM, mình sử dụng mạng của Inet Center, sau khi xuống KTX thì mình mua thẻ nhưng không vào được trang đăng nhập nữa, nên không dùng internet được. Nó bị lỗi `ERR_CONNECTION_REFUSED`. Mình sẽ chỉ bạn cách giải quyết trong trường hợp của mình.

Mình bị là do Docker chiếm IP của trang router . Để khắc phục chạy các lệnh sau:

```shell
sudo ip link set dev docker0 down
sudo systemctl disable docker
```

Sau đó khởi động lại là được.

Nói chung thì bạn đừng để service docker tự chạy, hãy chạy khi nào cần chạy docker thôi. Đó cũng là các để giảm thiểu các service không cần thiết chạy chiếm tài nguyên máy (như Windows :v)
