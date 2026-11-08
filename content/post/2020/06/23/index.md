---
title: "Viết blog với hugo"
date: 2020-06-23
tags: [ "Hugo", "Blog" ]
---

Như các bạn cũng biết, blog này của mình sử dụng hugo để tạo ra. Bài viết này mình sẽ hướng dẫn các bạn dùng hugo để tạo ra một static website tương tự.

1. Đầu tiên cần cài đặt hugo:

```shell
yay -S hugo
```

2. Vào thư mục làm việc (working directory) của bạn, sử dụng hugo tạo thư mục chứa website mới. Ví dụ ở đây mình tạo thư mục `miti99`:

```shell
hugo new site miti99
```

Nếu bạn đã tạo một git và clone về và muốn tạo website trong thư mục đó, thì thêm đuôi `--force` vào nhé. Ví dụ:

```shell
hugo new site miti99 --force
```

3. Vào thư mục vừa tạo, tải theme cho trang web của bạn, các theme này bạn tìm tại website theme của hugo (<https://themes.gohugo.io/>). Ví dụ ở đây mình chọn theme [`Beautiful Hugo`](https://themes.gohugo.io/beautifulhugo/):

```shell
cd miti99
git init # Nếu bạn dùng git clone website thì bỏ qua bước này
git submodule add https://github.com/halogenica/beautifulhugo.git themes/beautifulhugo
```

Copy exampleSite để xem thử:

```shell
\cp -rf themes/beautifulhugo/exampleSite/* .
```

4. Chạy lệnh sau để xem thử website của bạn:

```shell
hugo server
```

5. Chỉnh sửa các file như `config.toml` và các file trong `content` (cùng các file các nếu bạn muốn tùy chỉnh) để có được website cho riêng mình. Nhớ tham khảo các file mẫu có sẵn để tận dụng tối đa các tính năng của theme bạn đã chọn nhé!

Mình sẽ giới thiệu cách build và deploy website lên Gitlab Pages, Github Pages hoặc Firebase Hosting... trong một bài viết khác. Hẹn gặp các bạn sau!
