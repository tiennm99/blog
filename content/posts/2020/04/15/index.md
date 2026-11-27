---
title: "Practical Software for Arch Linux"
date: 2020-04-15
tags: [ "Arch", "Linux" ]
---

In this post, I'll introduce some useful software you might need (at least from my perspective as an IT student daily-driving Arch Linux).

## Web Browser

A web browser is obviously essential—whether for scrolling through Facebook or reading this blog :v. Even though Edge has overtaken Firefox to claim the #2 spot among the most popular browsers, Edge doesn't have a Linux build yet, so Chrome and Firefox remain the two go-to browsers in our world. To install them:  
Chrome: `yay -S google-chrome`  
Firefox: `yay -S firefox`  
There are also plenty of other browsers available, such as Brave (`brave-bin`), Chromium (`chromium`), Opera (`opera`), Vivaldi (`vivaldi`),...  
Check out the full list here: <https://wiki.archlinux.org/index.php/List_of_applications/Internet#Web_browsers>!

## Vietnamese Input Method

For a long time, typing Vietnamese on Linux was a real pain :v, but recently I found a great input method called [ibus-bamboo](https://github.com/BambooEngine/ibus-bamboo). Its default input mode works pretty much like `ibus-unikey`, but by switching input modes (shortcut: _Shift+~_), you can pick a specific input mode per application out of 7 available modes. For example, I use mode 4 (ForwardKeyEvent II) to write this blog. To install it:

```shell
yay -S ibus-bamboo
```

Open IBus Preferences to add `ibus-bamboo` as an input method, then add this command to your Startup Applications:

```shell
ibus-daemon -drx
```

so that IBus starts automatically with your system!

## Screenshot Tool

Aside from `gnome-screenshot`, I used to use Shutter, but unfortunately it's no longer actively developed. I found a great replacement called `flameshot`—it's super convenient, letting you select a capture region, adjust the selection frame afterward, annotate, and more. To install it:

```shell
yay -S flameshot
```

## Office Suite

You'll definitely need an office suite to get work done with documents, spreadsheets, and presentations. I usually use LibreOffice, which is easy to install. Arch offers two versions, `fresh` and `still`; I usually go with `fresh`:

```shell
yay -S libreoffice-fresh
```

Besides LibreOffice, Arch has plenty of other office suites to choose from: Calligra (`calligra`), OnlyOffice (`onlyoffice-bin`), OpenOffice (`openoffice`), SoftMaker Office (`freeoffice`), and WPS Office (`wps-office`), as well as standalone apps that can replace individual programs in an office suite. With LibreOffice, IBus works smoothly out of the box, but for some of the other suites I found that you need to add the following lines to `/etc/profile`:

```shell
export GTK_IM_MODULE=ibus
export XMODIFIERS=@im=ibus
export QT_IM_MODULE=ibus
```

## Terminal

You can stick with `gnome-terminal` by default, but I usually use two terminals: Terminator and Guake. Since I already covered installing Terminator in my post-installation guide, here's how to install Guake:

```shell
yay -S guake
```

Guake lets you quickly drop down a terminal with the F12 shortcut, auto-hide it, start it automatically on login, and more—super handy.

## All-in-One Messaging

Managing all your chats in one place is super easy with Rambox. It lets you use Messenger, Skype, Telegram, and even manage email accounts like Gmail and Outlook all in one app. To install it:

```shell
yay -S rambox-bin
```

## Clipboard Manager

Ever need to copy a bunch of code snippets :v and paste them all at once without constantly switching tabs back and forth? That's when you need a clipboard manager. Here I use CopyQ:

```shell
yay -S copyq
```

## Cloud Sync

The sad news is that the two biggest cloud storage services for students—Google Drive and OneDrive (student emails get unlimited Google Drive storage and 5 TB on OneDrive)—don't have official Linux clients. There are third-party workarounds, but since it's hard to vouch for their reliability, I skip them and use Dropbox instead:

```shell
yay -S dropbox
```

There are also plenty of other cloud providers with native Linux support, such as MEGA (`megasync`), Nextcloud (`nextclout-client` if you use a hosted instance),...
You can check out more options listed here:
<https://wiki.archlinux.org/index.php/List_of_applications/Internet#Cloud_synchronization_clients>

## Programming Tools

I'm currently trying to get used to Neovim:

```shell
yay -S neovim
```

Until I'm completely comfortable with it, though, VS Code is still my daily driver.
VS Code—my favorite editor right now:

```shell
yay -S visual-studio-code-bin
```

## TeamViewer

TeamViewer—remote desktop access for everyone :v

```shell
yay -S teamviewer
```

Remember to enable the `teamviewerd` service so it can connect:

```shell
sudo systemctl enable teamviewerd
```

and restart before using it.

## File Comparison Tool

```shell
yay -S meld
```

## Virtualization Software for Running Virtual Machines

If you installed the `gnome` group, you already have `gnome-boxes`, but I still think VirtualBox is the best choice on Linux :v Note that you'll also need to install `linux-headers` (assuming you're on Arch's default kernel) for DKMS to work!

```shell
yay -S linux-headers
yay -S virtualbox
```

## System Cleaner

BleachBit has long been the Linux counterpart to CCleaner on Windows :). To install it:

```shell
yay -S bleachbit
```

## Download Manager

uGet can't quite match the legendary Internet Download Manager (IDM) on Windows, but it's a solid alternative—make sure to install the `aria2` plugin alongside it:

```shell
yay -S uget aria2
```

If I come across more great software, I'll update this post directly! See you next time.
