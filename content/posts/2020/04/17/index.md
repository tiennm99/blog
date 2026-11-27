---
title: "Some Issues I Ran Into"
date: 2020-04-17
tags: [ "Arch", "Linux", "Trouble" ]
---

This post is a collection of issues I've run into along with how I fixed them. These solutions are at the "it just works for me" level, so I can't guarantee they'll work in every single case if you run into the same problem. I'll keep updating this post as I continue using the system!

#### Arch Cinnamon Doesn't Turn Off the Screen After the Configured Timeout

Try installing the `light-locker` package:

```shell
yay -S light-locker
```

#### Cannot Play `.mp4` Files in Totem and Other Totem-Based Players

This error is usually caused by a missing codec for `.mp4` files. To install it:

```shell
yay -S gst-libav
```

See you in future posts!
