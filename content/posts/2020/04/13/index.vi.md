---
title: "Cài đặt package trong AUR cho Archlinux"
date: 2020-04-13
tags: [ "Arch", "Linux", "yay", "AUR" ]
---

Arch User Repository (AUR) là nơi để người dùng nào cũng có thể tạo các package cho riêng mình và chia sẻ với những
người khác cùng sử dụng; một lí do khiến cho Arch trở nên rất tiện lợi với người dùng, một trong những lí do để họ chọn
Arch là distro để dùng.

Có thể nói hầu hết các gói bạn có thể tìm ở các distro khác đều có thể có ở Official Repositories hoặc trong AUR. Và
những package "được biết đến" cũng sẽ có bản trong AUR. VD như `ibus-bamboo` - bộ gõ yêu thích của mình cũng có trong
đây.

Hơn nữa, với những phần mềm open source hay cung cấp source code cho người dùng tự build (như trên GitHub chẳng hạn),
thì việc cài đặt từ AUR dễ dàng hơn nhiều, và cũng dễ quản lý hơn nữa.

Ở thời điểm mình viết bài này, mặc dù trong Official repositories có 11278 (một con số cũng rất ấn tượng rồi), nhưng
trong AUR có đến tận 59729 packages, một con số rất 'khủng' phải không :D

Và điểm mạnh trên cũng chính là điểm yếu của nó, vì ai cũng có thể thêm package vào đó, nên vẫn hay bị "mang tiếng" là
dễ bị tác giả "tặng kèm" vài con virus hay malware,... vào máy :v. Vì vậy các bạn nên cẩn thận, lựa chọn package có
nguồn đáng tin cậy để cài đặt thôi nhé, chẳng hạn như package được đề cập trong Arch Wiki, từ trang chủ của gói đó, vd
như ibus-bamboo có ghi rõ gói AUR dành cho Arch và các distro base-on Arch; hoặc các package có votes cao, popularity
nhiều,...

## Hướng dẫn cài đặt package từ AUR (yay)

Ở đây mình sẽ hướng dẫn cài yay (một AUR helper khá nổi), vì hướng dẫn cơ bản nên các bước config build,... mình sẽ bỏ
qua, chỉ hướng dẫn 3 bước chính

Trước tiên thì bạn nên cài đặt gói base-devel trước, đây là gói chứa nhiều công cụ dùng để build package:

```shell
sudo pacman -S base-devel
```

Sau đó clone package từ link của AUR về, ở đây mình ví dụ là yay (<https://aur.archlinux.org/packages/yay/):>

```shell
git clone https://aur.archlinux.org/yay.git`
cd yay
makepkg -si
```

Vậy là xong rồi đó :D, quá đơn giản phải không nào, package này sẽ có thể dễ dàng quản lý được bằng pacman như một
package thông thường, tuy nhiên pacman sẽ không thể cập nhật những package trong AUR được, nếu muốn bạn phải theo dõi và
cập nhật bằng tay bằng cách làm lại các bước trên. Để khắc phục sự bất tiện này, chúng ta cần sự trợ giúp từ các AUR
helpers, và ở đây mình sẽ dùng yay.

## yay (Yet another Yogurt)

Như đã nói ở trên, việc cài đặt package từ AUR có thể nói là rất đơn giản, qua 3 bước chính; tuy nhiên lại không tự cập
nhật,... được. Vì vậy mình giới thiệu đến các bạn yay, với yay, việc cài đặt package từ AUR chỉ cần 1 lệnh y chang
pacman thôi :v (vì yay là một trong những Pacman wrappers mà :D), và quá trình cài chỉ khác một chút là có thêm bước
build package nên lâu hơn thông thường mà thôi. Hơn nữa yay là 'tinh hoa tổng hợp' từ yaourt, apacman và pacaur (những
cái tên khá là 'cộm cán' nếu bạn biết đến chúng :v, dù yaourt đã bị 'chết', bởi vậy yay mới là sự thay thế cho nó).

Không dài dòng nữa, bên trên đã là cách cài đặt yay rồi nên mình không giới thiệu nữa :v

Và cách sử dụng... Hmm, vì yay có cú pháp giống pacman nên cũng khỏi giới thiệu luôn :v, muốn cài package X
cứ `yay -S X` thôi :v, và các tùy chọn sau thì bạn cứ xem thử nó báo gì rồi chọn, nếu lười thì cứ Enter mãi thôi, 9/10
là bạn sẽ cài được package :v

À, tip nhỏ, đó là để cập nhật hệ thống bạn chỉ cần dùng lệnh `yay` thôi (nó sẽ thay cho `yay -Syyu`, giống
với `sudo pacman -Syyu` luôn đó :v), vì vậy không cần phức tạp, cứ `yay` thôi :D
