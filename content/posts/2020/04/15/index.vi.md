---
title: "Vài phần mềm thiết thực cho Archlinux"
date: 2020-04-15
tags: [ "Arch", "Linux" ]
---

Bài viết này mình giới thiệu một số phần mềm có thể cần thiết (đối với mình – với vai trò là một sinh viên CNTT sử dụng
Arch Linux)

## Web Browser

Web browser là một thành phần quan trọng phải không nào, để lướt Facebook hay để xem blog này cũng vậy :v. Mặc dù Edge
đã xoắn ngôi Firefox để giành vị trí top 2 browser phổ biến, nhưng Edge chưa có bản cho linux, vì vậy có thể nói Chrome
và Firefox vẫn là 2 browser phổ biến trong thế giới của chúng ta, để cài đặt:  
Chrome: `yay -S google-chrome`  
Firefox: `yay -S firefox`  
Ngoài ra còn có các browser khác như: Brave (`brave-bin`), Chromium (`chromium`), Opera (`opera`),
Vivaldi (`vivaldi`),...  
Bạn xem thêm tại: <https://wiki.archlinux.org/index.php/List_of_applications/Internet#Web_browsers> nhé!

## Bộ gõ tiếng Việt

Từ lâu, bộ gõ tiếng Việt trên Linux đã là một nỗi đau :v, tuy nhiên gần đây mình tìm được một bộ gõ khá là Ok, đó
là [ibus-bamboo](https://github.com/BambooEngine/ibus-bamboo). Chế độ gõ mặc định thì cũng hao hao giống `ibus-unikey`
thôi, nhưng bằng việc chuyển chế độ gõ (shortcut là _Shift+~_) thì bạn có thể chuyển sang chế độ gõ khác cho từng phần
mềm, có tận 7 chế độ, bạn có thể chuyển cho phù hợp. VD mình chọn chế độ 4. ForwardKeyEvent II để viết blog này đấy. Để
cài đặt:

```shell
yay -S ibus-bamboo
```

Bạn vào Ibus Preference để thêm ibus-bamboo là một bộ gõ nhé, sau đó thêm command này vào Startup Application:

```shell
ibus-daemon -drx
```

để Ibus khởi chạy cùng hệ thống nha!

## Phần mềm chụp màn hình

Ngoài `gnome-screenshot` ra thì lúc trước mình có dùng shutter, chẳng may cái này ngừng phát triển rồi, mình cũng tìm
được một cái khác thay thế là `flameshot`, cũng khá là tiện, bạn có thể chọn khung để chụp, điều chỉnh lại khung sau khi
đã chọn,... Để cài đặt:

```shell
yay -S flameshot
```

## Office

Hẳn phải cần đến một bộ Office để còn 'làm ăn' với văn bản, bảng tính hay trình chiếu các kiểu chứ. Mình thì thường dùng
Libre Office, cài đặt cũng dễ thôi, Arch có 2 bản fresh và still, mình thì hay dùng fresh:

```shell
yay -S libreoffice-fresh
```

Ngoài Libre ra thì Arch còn có kha khá các bản Office khác cho bạn lựa chọn: Calligra (`calligra`), Only
Office (`onlyoffice-bin`), Open Office (`openoffice`), Softmaker Office (`freeoffice`) và WPS Office (`wps-office`) cùng
với những phần mềm 'rời', thay thế cho từng phần mềm trong các bộ office. Với LibreOffice thì ibus đã hoạt động khá mượt
rồi, tuy nhiên với các bộ khác thì mình thấy phải thêm vào `/etc/profile` các dòng sau:

```shell
export GTK_IM_MODULE=ibus
export XMODIFIERS=@im=ibus
export QT_IM_MODULE=ibus
```

## Terminal

Mặc định bạn có thể dùng gnome-terminal cũng được, nhưng mình hay dùng 2 terminal là terminator và guake, mình có hướng
dẫn cài terminator ở bài hậu cài đặt rồi, nên giờ cài thêm Guake thôi:

```shell
yay -S guake
```

Guake giúp bạn có thể mở nhanh terminal bằng shortcut F12, tinh chỉnh để terminal tự ẩn, tự chạy cùng hệ thống,… rất
tiện

## Nhắn tin tiện lợi hơn

Việc nhắn tin 'all-in-one' rất dễ với Rambox, Rambox giúp chúng ta có thể nhắn tin Messenger, Skype, Telegram... thậm
chí cả quản lý email như Gmail, Outlook,... Để cài đặt:

```shell
yay -S rambox-bin
```

## Quản lý clipboard

Khi bạn... copy code :v rất nhiều và paste một lượt? Bạn không muốn chuyển tab copy xong paste từng đợt? Đó là lúc bạn
cần đến một phần mềm để quản lý clipboard, ở đây mình dùng CopyQ:

```shell
yay -S copyq
```

## Cloud sync

Tin buồn là 2 cloud lớn với sinh viên là Google Drive và Onedrive (dùng mail sinh viên thì có Google Drive unlimit, còn
Onedrive thì cho 5TB) thì không hỗ trợ linux một cách chính thức, có nhiều cách thay thế nhưng thay thế thì ai đảm bảo
đâu, nên mình không dùng. Mình dùng Dropbox:

```shell
yay -S dropbox
```

Ngoài ra thì cũng có nhiều host hỗ trợ linux lắm, như MEGA (`megasync`), Nextcloud (`nextclout-client` nếu bạn dùng host
của người ta),...
Bạn có thể tham khảo một số host khác được đề cập tại đây:
<https://wiki.archlinux.org/index.php/List_of_applications/Internet#Cloud_synchronization_clients>

## Tools lập trình

Mình đang thử làm quen với NeoVim:

```shell
yay -S neovim
```

Nhưng trước khi quen được thì VScode vẫn là editor mình đang dùng.
VScode: editor mình ưng ý nhất hiện tại:

```shell
yay -S visual-studio-code-bin
```

## Teamviewer

Teamviewer – kết nối từ xa cho mọi nhà :v

```shell
yay -S teamviewer
```

Các bạn nhớ enable teamviewerd service để kết nối được nha:

```shell
sudo systemctl enable teamviewerd
```

rồi restart mới dùng được

## Phần mềm compare file

```shell
yay -S meld
```

## Phần mềm ảo hóa để chạy máy ảo

Khi cài nhóm gnome thì bạn đã có sẵn gnome-boxes rồi, tuy nhiên thì mình vẫn thấy VirtualBox là nhất trên Linux :v Lưu ý
là bạn cần cài thêm linux-headers (nếu bạn dùng kernel mặc định của Arch) để mà cài dkms nhé!

```shell
yay -S linux-headers
yay -S virtualbox
```

## Phần mềm dọn dẹp rác

Từ lâu BleachBit đã nổi danh sánh vai với Ccleaner trên Windows :). Để cài đặt:

```shell
yay -S bleachbit
```

## Phần mềm quản lý download

Uget không bằng được Internet Download Manager (IDM) thần thánh trên Windows, nên dùng đỡ nhé, sẵn cài thêm
plugin `aria2` luôn:

```shell
yay -S uget aria2
```

Nếu có phần mềm gì hay mình sẽ cập nhật thêm cũng tại bài viết này luôn nhé! Hẹn gặp lại.
