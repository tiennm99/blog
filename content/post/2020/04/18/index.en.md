---
title: "Small Tweaks for Firefox"
date: 2020-04-18
tags: [ "Arch", "Linux", "Firefox" ]
---

## Cache on RAM

By default, Firefox stores its cache on both RAM and disk. Moving the cache entirely to RAM speeds up cache access and reduces disk writes (which is especially great for SSDs). Here's how to do it:
Type `about:config` into Firefox's address bar  
Set `browser.cache.disk.enable` to `false`  
Make sure `browser.cache.memory.enable` is set to `true`  
You can also adjust how much RAM Firefox uses for caching via `browser.cache.memory.capacity`—leaving it at the default `-1` lets Firefox automatically pick the capacity based on your total RAM.

## Disabling Pocket

Pocket comes bundled with Firefox by default, but I barely ever use it, so I just disable it :D. In `about:config` as above, search for `extensions.pocket.enabled` and set it to `false`! 😀

## Caching the Entire Profile in RAM via tmpfs

**Make sure you have enough free RAM to mount your profile, or you'll run into out-of-memory errors!**

Since `tmpfs` (via the `tmp.mount` service) is already enabled by default on Arch, we can take further advantage of having `/tmp` mounted in RAM by caching the entire Firefox profile in RAM via `tmpfs`. First, install `profile-sync-daemon`:

```shell
yay -S profile-sync-daemon
```

Then edit `~/.config/psd/psd.conf` and add `firefox` to the `BROWSERS` list, for example:

```shell
BROWSERS=”firefox”
```

`profile-sync-daemon` also supports `google-chrome` and several other browsers (you can see the full list right inside that config file), so feel free to add whichever browsers you use to the list.
Enable `profile-sync-daemon` to start automatically with your session:

```shell
systemctl --user enable psd.service
```

And that's it! You can check out plenty of other tweaks at: <https://wiki.archlinux.org/index.php/Firefox/Tweaks>

See you in future posts!
