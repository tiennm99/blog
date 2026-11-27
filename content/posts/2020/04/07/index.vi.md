---
title: "Cài đặt Archlinux trong chế độ boot UEFI"
date: 2020-04-07
tags: [ "Arch", "Linux" ]
---

## Giới thiệu

Trước khi bắt đầu, thì mình cũng xin nói trước là mình biết nếu bạn là "dân chơi" dám thử cài Arch Linux thì hẳn bạn
không phải "tay mơ" rồi, và bạn có thể tự cài mà không cần hướng dẫn của mình. Bài viết của mình chủ yếu mang mục đích
là chia sẻ kinh nghiệm cài Arch của mình thôi, chứ không mang tính hướng dẫn hay giúp đỡ gỡ rối gì. Nếu bạn gặp khó
khăn, hãy comment bên dưới bài viết, mình sẽ xem và hỗ trợ bạn nếu có thể. Còn nếu bạn là người mới hoặc có ý định bước
vào thế giới Linux, mình khuyên bạn nên thử dùng các phiên bản dành cho người mới trước
như [Ubuntu](https://ubuntu.com/) hay nếu bạn nguốn trải nghiệm sơ bộ Arch thì [Manjaro](https://manjaro.org/) cũng là
một lựa chọn không tồi (base on Arch và đứng top bảng xếp hạng nhiều lần mà) trước khi bắt đầu thử Arch. Sau đây là các
bước tiến hành:

## Tạo bộ cài

Ở đây mình hướng dẫn tạo bộ cài qua USB, nếu bạn dùng đĩa thì có thể tự tìm hiểu và làm.

Đầu tiên các bạn tải file cài đặt mới nhất tại trang chủ của Arch Linux: <https://www.archlinux.org/download/>

Nếu bạn dùng Windows thì sử dụng Rufus để tạo bộ cài (các bạn chọn chế độ boot BIOS mặc định là được, bộ cài sẽ nhận cả
2 chuẩn BIOS lẫn UEFI luôn, còn nếu chọn UEFI thôi thì có khi lại không được :v). Nếu bạn dùng Linux thì có thể dùng
lệnh: `dd if=<đường dẫn đến file .iso> of=/dev/sdX bs=1MB` (với sdX là ổ USB) hoặc dùng GUI tools như
Disks (`gnome-disks`) -> Restore Disk Image...

## Thiết lập mạng

Sau khi boot vào Live boot, bạn khởi động các service sau: `systemctl start dhcpcd`. Nếu bạn dùng mạng dây thì như vậy
là được, nhưng nếu bạn dùng wifi như laptop chẳng hạn, thì chạy thêm các lệnh sau:

```shell
systemctl start iwd
iwctl
device list
```

Lúc này sẽ hiện ra tên các thiết bị wifi của bạn, giả sử là `wlan0`, nếu không phải thì thay `wlan0` ở các lệnh sau bằng
tên thích hợp của máy bạn:

```shell
station wlan0 scan
station wlan0 get-networks
```

Lúc này sẽ hiện ra tên các điểm truy cập wifi, giả sử như là `SSID`, kết nối bằng lệnh sau:

```shell
station wlan0 connect SSID
```

Lúc này sẽ yêu cầu bạn nhập mật khẩu wifi (nếu có). Sau đó bạn có thể tiếp tục các bước tiếp theo:
Thử kết nối với internet bằng lệnh: `ping google.com -c2`

## Cập nhật ngày giờ hệ thống

`timedatectl set-ntp true`

## Phân vùng ổ đĩa

Ở đây mình dùng lệnh `fdisk`, bạn có thể dùng lệnh khác.  
**Lưu ý:** Arch Linux khuyến khích phân vùng EFI từ 260-512MiB; phân vùng SWAP từ 512MiB. SWAP là cần thiết, tuy nhiên
sau khi cài mình sẽ dùng swap file nên không tạo phân vùng này.

```shell
fdisk -l
fdisk /dev/sda</code
```

(Bạn gõ `m` sau đó xem trong hướng dẫn thêm nhé!)

### Định dạng các phân vùng

```shell
mkfs.fat -F32 /dev/sda1
mkfs.ext4 /dev/sda2
```

### Mount các phân vùng

**Lưu ý:** Arch Linux khuyến khích mount phân vùng EFI vào mount point `/efi` thay vì `/boot/efi` như nhiều hệ điều hành
khác hiện tại (chẳng hạn Ubuntu).

```shell
mount /dev/sda2 /mnt
mkdir /mnt/efi
mount /dev/sda1 /mnt/efi
```

## Tiến hành cài đặt

Hihi, sau nhiều bước "khởi động" thì cuối cùng cũng đến bước tiến hành cài đặt.

Đầu tiên chúng ta nên thiết lập mirror servers để có tốc độ mạng hiệu quả. Vì chúng ta ở Việt Nam nên dùng mirror của
archlinuxvn là hiệu quả. Thực hiện các lệnh sau: `nano /etc/pacman.d/mirrorlist`. Thêm dòng sau vào trước dòng đầu
tiên: `Server = http://f.archlinuxvn.org/archlinux/$repo/os/$arch`

Sau đó lưu (_Ctrl+O_, _Enter_) và thoát (_Ctrl+X_)

Cài các gói cần thiết bằng lệnh sau: `pacstrap /mnt base linux linux-firmware`

## Thiết lập hệ thống

Sau đây là các tinh chỉnh để hệ thống hoạt động.

### Tạo file fstab

Để mount các phân vùng khi khởi động: `genfstab -U /mnt >> /mnt/etc/fstab` (có thể thay `-U` bằng `-L`, nghĩa là thay vì
định nghĩa bằng UUID thì định nghĩa bằng label của phân vùng)

#### Change root vào hệ thống mới

`arch-chroot /mnt`

#### Thiết lập time zone

Chúng ta ở Việt Nam sẽ chọn thành phố Hồ Chí Minh: `ln -sf /usr/share/zoneinfo/Asia/Ho_Chi_Minh /etc/localtime`. Đồng bộ
giờ: `hwclock --systohc`

#### Định dạng vùng

Đầu tiên nên cài đặt vim để có thể chỉnh sửa file văn bản: `pacman -S vim`. Sau đó sửa file sau: `vim /etc/locale.gen`
Uncomment dòng _en_us.UTF-8 UTF-8_ (và dòng _vi_VN UTF-8_ nếu thích :v) (bạn nhấn phím _i_ để vào chế độ insert mới sửa
được), lưu lại và thoát (_Esc_, sau đó gõ `:wq` sau đó chạy lệnh: `locale-gen`. Tiếp tục sửa một file
khác: `vim /etc/locale.conf`. Thêm vào đây dòng sau _LANG=en_US.UTF-8_

#### Thiết lập tên máy tính trong mạng

Sửa file `/etc/hostname`, _myhostname_ vào đó (với _myhostname_ là tên bạn muốn đặt cho máy tính của bạn). Tương tự, sửa
file `/etc/hosts` với các thông số như sau:

```shell
127.0.0.1   localhost
::1         localhost
127.0.1.1   myhostname.localdomain  myhostname
```

#### Khởi tạo Initramfs

(thông thường bước này không cần thiết)

`mkinitcpio -P`

#### Đặt mật khẩu cho root

Gõ: `passwd`. Sau đó điền mật khẩu 2 lần.

#### Cài đặt microcode (tùy chọn)

Tùy vào bạn sử dụng CPU Intel hay AMD mà cài gói cho phù hợp. `pacman -S amd-ucode` (nếu bạn dùng AMD)
hoặc `pacman -S intel-ucode` (nếu bạn dùng Intel)

#### Cài đặt boot loader

Ở đây mình dùng `grub` (khá phổ biến, nhiều tùy chọn, tùy chỉnh), và gói `efibootmgr` (mình đang cài trong chế độ UEFI
mà :D):

```shell
pacman -S grub efibootmgr
grub-install --target=x86_64-efi --efi-directory=/efi --bootloader-id=Archlinux
```

Nếu bạn mount phân vùng EFI giống mình thì làm như trên, không thì đổi `/efi` thành mount point EFI của bạn. "Archlinux"
trong lệnh trên có thể đổi thành cái khác nếu bạn thích, nó sẽ hiển thị trong Boot Options trong BIOS của bạn (nếu bạn
không lock Boot Order, máy ThinkPad của mình có chức năng này).

Cập nhật GRUB: `grub-mkconfig -o /boot/grub/grub.cfg`

Vậy là bạn đã hoàn thành cài Arch Linux lên máy rồi đấy, giờ thì có thể reboot ngay để trải nghiệm thôi:

```shell
umount -R /mnt
reboot
```

Tuy nhiên mình khuyên bạn nên làm theo các bước "hậu cài đặt" trước khi reboot để có trải nghiệm tốt nhất, vì bạn chỉ
mới có các gói cơ bản trên máy thôi, nên chưa thể dùng như Desktop được đâu. Mình sẽ viết bài cho điều này sớm nhất. Hẹn
gặp lại các bạn.

Tham khảo tại nguồn: <https://wiki.archlinux.org/index.php/Installation_guide>

Chúc các bạn thành công! Nếu có gặp khó khăn gì, bạn có thể comment bên dưới, mình sẽ cố gắng giúp đỡ.
