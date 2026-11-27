---
title: "Running GUI Apps Inside Docker"
date: 2020-05-09
tags: [ "Linux", "Docker" ]
---

In my case, I was writing a Python app that uses the `matplotlib` library. To get the GUI working, I first installed `xhost` on my Arch host:

```shell
yay -S xorg-xhost
```

Run `xhost local:root` or `xhost +` (I'm not entirely sure about the details here—it grants everything access to the display, and I don't know how to restrict it to specific apps).

Then run Docker with the extra `–env="DISPLAY"` flag. For example:

```shell
docker run -it –rm –net=host –env="DISPLAY" –workdir=/workspace –volume="$HOME/Dropbox/PP:/workspace:rw" ubuntu bash
```

After that, inside the Docker container, I also installed the `python3-pip` package.

Good luck!!
