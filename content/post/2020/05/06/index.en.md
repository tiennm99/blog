---
title: "Speeding Up makepkg"
date: 2020-05-05
tags: [ "Arch", "Linux", "AUR" ]
---

In this post, I'll show you how to tweak your setup to make building packages from the AUR faster. However, every benefit comes with its own risks—there's a chance you might run into some random error somewhere in a few edge cases :v

To keep things quick and to the point, I'll give you the "instant noodles" version right away!

Install a few required packages:

```shell
yay -S ccache lzop xz pigz pbzip2 zstd
```

Next, open `/etc/makepkg.conf`, look for the UPPERCASE variables, and update them to match the following:

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

Reference: <https://wiki.archlinux.org/index.php/Makepkg>

Good luck!
