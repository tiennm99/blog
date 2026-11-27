---
title: "YouTube Downloaders for Arch Linux"
date: 2020-04-29
tags: [ "Arch", "Linux", "Youtube" ]
---

As the title says, I'll introduce two tools I regularly use to download videos from YouTube.

## Youtube-dl

Very popular across many distros, packed with command-line options, and super "professional"—though I find its download speed a bit slow, probably because of some overhead in how it processes things. So I mostly use it for downloading entire playlists (where I can just paste the link once, go write some code or watch a movie, and let it finish on its own :v). To install it:

```shell
yay -S youtube-dl
```

## Clipgrab

This one is a bit less well-known, so I wanted to give it a mention as well. It comes with a GUI, and in my experience its download speeds are faster than `youtube-dl` (at least for me). To install it:

```shell
yay -S clipgrab
```

See you in the next post!
