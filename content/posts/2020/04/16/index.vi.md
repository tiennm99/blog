---
title: "Zsh và Antibody"
date: 2020-04-16
tags: [ "Arch", "Linux", "Zsh", "Antibody" ]
---

Bài viết này mình giới thiệu về zsh, một shell khác với bash, với khả năng tùy biến rất cao, hỗ trợ rất nhiều, nhất là với những bạn hay dùng lệnh.

## Cài đặt zsh và đặt làm shell mặc định

Cài đặt zsh:

```shell
yay -S zsh
```

Đặt zsh là shell mặc định:

```shell
chsh -s /bin/bash/zsh
```

## Tùy biến zsh

Mặc định thì zsh cũng chỉ là shell bình thường như bash thôi, nhưng tùy biến rồi thì nó thành 'siêu shell' :v

Là dân pro thì bạn có thể tự tùy chỉnh bằng tay, bằng code để tùy biến zsh theo ý thích. Nhưng mình thì không được như vậy, nên mình sẽ giới thiệu đến các bạn framework oh-my-zsh khá nổi tiếng và plugin manager antibody. Ngày trước thì có antigen, nhưng mình thấy antigen đã không còn được phát triển nữa, thay vào đó là antibody, được so sánh với hiệu năng tốt hơn (mặc dù mình thấy việc tích hợp ohmyzsh vào antibody có phần khập khiễng hơn so với antigen). Các bạn có thể xem thông tin thêm tại trang chủ của mấy cái trên nha:

- <https://github.com/robbyrussell/oh-my-zsh>
- <https://github.com/getantibody/antibody>
- <https://github.com/zsh-users/antigen>

Để cài antibody cho Arch:

```shell
yay -S antibody
```

(cái này có ghi trong trang chủ luôn rồi^^, đảm bảo nguồn)

Tùy biến antibody: Ở đây mình hướng dẫn cơ bản thôi, zsh thì có file `~/.zshrc` là file source cũng như `~/.bashrc` của bash vậy đó. Nhưng antibody thì khuyến khích viết các plugin ở một file khác, vd như `~./.zsh_plugins.txt`, sau đó thì load antibody bằng 2 cách: tĩnh hoặc động.
Sau đây là ví dụ về file `~./.zsh_plugins.txt` của mình:

```shell
robbyrussell/oh-my-zsh

robbyrussell/oh-my-zsh path:plugins/archlinux
robbyrussell/oh-my-zsh path:plugins/colored-man-pages
robbyrussell/oh-my-zsh path:plugins/colorize
robbyrussell/oh-my-zsh path:plugins/command-not-found
robbyrussell/oh-my-zsh path:plugins/common-aliases
robbyrussell/oh-my-zsh path:plugins/extract
robbyrussell/oh-my-zsh path:plugins/git
robbyrussell/oh-my-zsh path:plugins/git-extras
robbyrussell/oh-my-zsh path:plugins/github
robbyrussell/oh-my-zsh path:plugins/golang
robbyrussell/oh-my-zsh path:plugins/heroku
robbyrussell/oh-my-zsh path:plugins/history
robbyrussell/oh-my-zsh path:plugins/node
robbyrussell/oh-my-zsh path:plugins/npm
robbyrussell/oh-my-zsh path:plugins/pip
robbyrussell/oh-my-zsh path:plugins/python
robbyrussell/oh-my-zsh path:plugins/screen
robbyrussell/oh-my-zsh path:plugins/sudo
robbyrussell/oh-my-zsh path:plugins/systemd
robbyrussell/oh-my-zsh path:plugins/thefuck
robbyrussell/oh-my-zsh path:plugins/vscode
robbyrussell/oh-my-zsh path:plugins/web-search
robbyrussell/oh-my-zsh path:plugins/yarn
robbyrussell/oh-my-zsh path:plugins/z

desyncr/auto-ls
djui/alias-tips
mafredri/zsh-async
srijanshetty/node.plugin.zsh
srijanshetty/zsh-pip-completion
voronkovich/mysql.plugin.zsh
wuotr/zsh-plugin-vscode
zlsun/solarized-man
zpm-zsh/ls
zpm-zsh/ssh
zsh-users/zsh-completions
zsh-users/zsh-autosuggestions
zsh-users/zsh-syntax-highlighting
zsh-users/zsh-history-substring-search

robbyrussell/oh-my-zsh path:themes/candy.zsh-theme
```

Này chỉ là ví dụ thôi, một vài plugin bạn phải cài thêm tool mới dùng được nha. Rồi, tới phần load. Nôm na thì load tĩnh là bạn chạy antibody thành một file `config.sh`.

VD: `antibody bundle < ~/.zsh_plugins.txt > ~/.zsh_plugins.sh`

Sau đó trong file `~/.zshrc` bạn chỉ cần thêm dòng: `source ~/.zsh_plugins.sh` là được.

Cách này nhanh hơn load động, tuy nhiên load tĩnh không tự cập nhật plugin khi có bản cập nhật. Vì vậy mình dùng load động, mình thấy chậm hơn chẳng bao nhiêu (mà vẫn nhanh hơn antigen), nhưng được cập nhật thường xuyên (mỗi lần chạy là mỗi lần check cập nhật đó). Chỉ cần load trong file `~/.zshrc` như sau là được:

```shell
export ZSH="$(antibody home)/https-COLON--SLASH--SLASH-github.com-SLASH-robbyrussell-SLASH-oh-my-zsh"

source <(antibody init)
antibody bundle < ~/.zsh_plugins.txt
```

Do mình dùng Oh-My-Zsh mà antibody không hiểu được nên mới cần dòng đâu tiên, antigen thì chỉ cần dùng `antigen use oh-my-zsh` thôi, với lại load plugin của oh-my-zsh trong antibody cũng phiền phức hơn nhiều :/ vì ghi quá trời dòng (này mình không biết cách khác, tại lười thử, với dùng multi edit của vscode sửa cũng nhanh, nên khỏi tốn chất xám mắc công :v)

Nếu bạn không rành, và cũng chẳng muốn tùy biến thì có thể dùng package grml-zsh-config của Arch:

```shell
yay -S grml-zsh-config
```

Package này sẽ tùy biến zsh của bạn như y chang trong bộ cài bạn dùng để cài Arch vậy.
Tuy nhiên nếu bạn muốn tùy biến thì nên gỡ nó ra, vì nó conflict với vụ dùng theme đấy, có thể chỉnh được mà phiền, nên gỡ quách nó ra cho xong :v

Tạm biệt các bạn, hẹn gặp lại ở bài viết sau nhé!^^
