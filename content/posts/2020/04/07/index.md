---
title: "Installing Arch Linux in UEFI Boot Mode"
date: 2020-04-07
tags: [ "Arch", "Linux" ]
---

## Introduction

Before we begin, I know that if you're brave enough to try installing Arch Linux, you're probably not a complete beginner, and you could easily install it on your own without my guide. This post is mainly meant to share my own experience installing Arch, rather than serving as a strict tutorial or troubleshooting guide. If you run into any issues, feel free to leave a comment below and I'll take a look and help if I can. On the other hand, if you're new to Linux or just thinking about stepping into the Linux world, I recommend starting with beginner-friendly distributions like [Ubuntu](https://ubuntu.com/), or if you want a taste of Arch first, [Manjaro](https://manjaro.org/) is a great choice (it's based on Arch and has topped the rankings many times) before diving into vanilla Arch. Here are the steps:

## Creating the Installation Media

Here I'll show you how to create a bootable USB drive; if you're using a CD/DVD, you can look that up on your own.

First, download the latest installation image from the official Arch Linux website: <https://www.archlinux.org/download/>

If you're on Windows, use Rufus to create the bootable USB (just keep the default BIOS boot mode—the installer supports both BIOS and UEFI out of the box, whereas picking UEFI-only might actually fail :v). If you're on Linux, you can run: `dd if=<path to .iso file> of=/dev/sdX bs=1MB` (where `sdX` is your USB drive), or use a GUI tool like Disks (`gnome-disks`) -> Restore Disk Image...

## Setting Up the Network

After booting into the live environment, start the following service: `systemctl start dhcpcd`. If you're using a wired connection, that's all you need. If you're on Wi-Fi (for example, on a laptop), run these additional commands:

```shell
systemctl start iwd
iwctl
device list
```

This will list your Wi-Fi devices. Suppose yours is `wlan0` (if not, replace `wlan0` in the commands below with your actual device name):

```shell
station wlan0 scan
station wlan0 get-networks
```

This will display the available Wi-Fi networks. Assuming your network name is `SSID`, connect to it with:

```shell
station wlan0 connect SSID
```

You'll be prompted for the Wi-Fi password (if any). Once connected, you can move on to the next steps.
Test your internet connection with: `ping google.com -c2`

## Updating the System Clock

`timedatectl set-ntp true`

## Partitioning the Disk

Here I use `fdisk`, though you can use any partitioning tool you prefer.  
**Note:** Arch Linux recommends an EFI partition of 260–512 MiB and a SWAP partition of at least 512 MiB. SWAP is important, but I plan to use a swap file after installation, so I won't create a swap partition here.

```shell
fdisk -l
fdisk /dev/sda</code
```

(Type `m` inside `fdisk` if you need help with the commands!)

### Formatting the Partitions

```shell
mkfs.fat -F32 /dev/sda1
mkfs.ext4 /dev/sda2
```

### Mounting the Partitions

**Note:** Arch Linux recommends mounting the EFI partition at `/efi` rather than `/boot/efi` as many other distributions (such as Ubuntu) currently do.

```shell
mount /dev/sda2 /mnt
mkdir /mnt/efi
mount /dev/sda1 /mnt/efi
```

## Installing the System

Hehe, after all those "warm-up" steps, we finally get to the actual installation.

First, we should configure the mirror servers for better download speeds. Since we're in Vietnam, using the `archlinuxvn` mirror works great. Run `nano /etc/pacman.d/mirrorlist` and add the following line right at the top: `Server = http://f.archlinuxvn.org/archlinux/$repo/os/$arch`

Then save (_Ctrl+O_, _Enter_) and exit (_Ctrl+X_).

Install the essential packages with: `pacstrap /mnt base linux linux-firmware`

## Configuring the System

Next are the tweaks needed to get the system up and running.

### Generating the fstab File

To mount partitions automatically on boot: `genfstab -U /mnt >> /mnt/etc/fstab` (you can replace `-U` with `-L` if you prefer defining partitions by label instead of UUID).

#### Chrooting into the New System

`arch-chroot /mnt`

#### Setting the Time Zone

Since we're in Vietnam, we'll select Ho Chi Minh City: `ln -sf /usr/share/zoneinfo/Asia/Ho_Chi_Minh /etc/localtime`. Then synchronize the hardware clock: `hwclock --systohc`

#### Localization

First, install `vim` so we can edit text files: `pacman -S vim`. Then edit `/etc/locale.gen`: `vim /etc/locale.gen`
Uncomment the line _en_us.UTF-8 UTF-8_ (and _vi_VN UTF-8_ if you like :v) (press _i_ to enter insert mode so you can edit), save and exit (_Esc_, then type `:wq`), and run: `locale-gen`. Next, edit `/etc/locale.conf`: `vim /etc/locale.conf` and add the line _LANG=en_US.UTF-8_

#### Setting the Hostname

Edit `/etc/hostname` and put _myhostname_ in it (where _myhostname_ is whatever name you want to give your computer). Similarly, edit `/etc/hosts` with the following entries:

```shell
127.0.0.1   localhost
::1         localhost
127.0.1.1   myhostname.localdomain  myhostname
```

#### Initializing Initramfs

(usually this step isn't necessary)

`mkinitcpio -P`

#### Setting the Root Password

Type `passwd`, then enter your new password twice.

#### Installing Microcode (Optional)

Depending on whether you use an Intel or AMD CPU, install the matching package: `pacman -S amd-ucode` (for AMD) or `pacman -S intel-ucode` (for Intel).

#### Installing the Boot Loader

Here I use `grub` (popular, flexible, and highly customizable) along with `efibootmgr` (since I'm installing in UEFI mode :D):

```shell
pacman -S grub efibootmgr
grub-install --target=x86_64-efi --efi-directory=/efi --bootloader-id=Archlinux
```

If you mounted your EFI partition the same way I did, run the command as shown; otherwise, replace `/efi` with your EFI mount point. You can also change "Archlinux" in that command to whatever name you like—it will show up in your BIOS Boot Options (assuming you haven't locked the Boot Order; my ThinkPad has that feature).

Update GRUB: `grub-mkconfig -o /boot/grub/grub.cfg`

And that's it—you've finished installing Arch Linux on your machine! You can reboot right away to try it out:

```shell
umount -R /mnt
reboot
```

However, I recommend going through a few "post-installation" steps before rebooting for the best experience, because right now you only have the bare-bones base packages installed and can't use it like a proper desktop yet. I'll write a follow-up post on that very soon. See you next time!

Reference: <https://wiki.archlinux.org/index.php/Installation_guide>

Good luck! If you run into any trouble, feel free to drop a comment below and I'll do my best to help.
