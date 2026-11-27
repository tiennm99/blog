---
title: "Tăng tốc độ makepkg"
date: 2020-05-05
tags: [ "Arch", "Linux", "AUR" ]
---

Bài viết mình sẽ giới thiệu cách tinh chỉnh để quá trình build file từ AUR được nhanh hơn. Tuy nhiên cái lợi cũng có cái nguy cơ đi kèm, có khả năng là bạn sẽ gặp phải một lỗi gì đó, ở đâu đấy trong vài trường hợp :v

Để nhanh gọn, tránh dài dòng, mình sẽ hướng dẫn các bạn kiểu 'mì ăn liền' luôn nha!

Cài đặt một số package cần thiết:

```shell
yay -S ccache lzop xz pigz pbzip2 zstd
```

Sau đó mở file `/etc/makepkg.conf`, tìm kiếm các chữ IN HOA, và sửa lại giống với dưới đây:

```shell
CFLAGS="-march=native -O2 -pipe -fstack-protector-strong -fno-plt"
CXXFLAGS="${CFLAGS}"
BUILDDIR=/tmp/makepkg
PKGEXT='.pkg.tar.lzo'
COMPRESSXZ=(xz -c -z - --threads=0)
COMPRESSGZ=(pigz -c -f -n)
COMPRESSBZ2=(pbzip2 -c -f)
COMPRESSZST=(zstd -c -z -q - --threads=0)
BUILDENV=(!distcc color ccache check !sign)
MAKEFLAGS="-j$(nproc)"
```

Tham khảo tại : <https://wiki.archlinux.org/index.php/Makepkg>

Chúc các bạn thành công!
