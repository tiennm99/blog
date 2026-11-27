---
title: "Using Audio Output as Input"
date: 2020-04-19
tags: [ "Arch", "Linux", "Tips" ]
---

When you're on a voice call with your significant other and want to play a romantic love song in the background (for the mood :v)... here's a super handy tip! 😀

Install `pavucontrol`:

```shell
yay -S pavucontrol
```

Then call your sweetheart :v, open `pavucontrol` (from the application menu or by running the command above), switch to the **Recording** tab, find the input stream for your calling app, and change its source to `'Monitor of Built-in Audio Analog Stereo'`. And that's it :D—see you in future posts!
