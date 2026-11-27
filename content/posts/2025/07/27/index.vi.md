---
title: "Setup Claude Code & Serena MCP trên Windows"
date: 2025-07-27
tags: ["Claude", "Claude Code", "Serena", "MCP"]
---

_Dạo này mình spam Newsletter viết bằng AI cũng khá nhiều, hơi nhàm. Sẵn gần đây mình có nghịch ngợm thử combo Claude Code & Serena khá ổn, nên nay tự viết một bài chia sẻ để đổi gió vậy._

## Mở đầu

Gần đây mình bỏ tiền mua gói Claude Pro, có bao gồm Claude Code, nghịch ngợm cũng hay, mình sẽ đánh giá cao hơn các agent khác ở chỗ dùng qua cli, không bắt buộc cài đặt ide mới (Mình thì quen dùng ide của Jetbrains hơn VS Code. Và Cursor hay Windsurf khó chịu ở chỗ là không có đồng bộ settings giữa các máy khác nhau. Claude Code thì có thể share project config). Vả lại mấy model Claude chính chủ của Anthropic nên dùng trong Claude Code chắc sẽ optimize tốt hơn nhiều :v

Trong post này thì mình sẽ hướng dẫn setup Claude Code & Serena cho Windows. Mặc dù [Claude Code đã hỗ trợ Windows](https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md#:~:text=Added%20support%20for%20native%20Windows), tuy nhiên gần đây mình thử thì vẫn hay gặp lỗi khi tạo file mới. Mình đoán có lẽ là do `/` và `\` trong path, nên hiện tại mình vẫn dùng Claude Code thông qua WSL. Ngoài ra thì trong post này mình cũng giới thiệu cách setup Serena cho project java luôn.

Nào, vào việc thôi!!

## Cài đặt WSL

Cái này thì dễ, làm theo hướng dẫn ở đây là được: https://learn.microsoft.com/en-us/windows/wsl/install

TLDR: Dùng command sau:

```
wsl --install
```

Chờ lệnh chạy xong, restart, restart xong sẽ cài Ubuntu, làm theo hướng dẫn setup username & password cho distro.

## Cài đặt Claude Code

### Cài đặt NodeJS

Mặc dù hiện tại [Claude Code chỉ yêu cầu NodeJS version 18+](https://docs.anthropic.com/en/docs/claude-code/setup#:~:text=Software%3A%20Node.js%2018%2B) và hiện tại nếu cài WSL thì cũng đã xài Ubuntu 24.04, bản này thì package nodejs mặc định cũng đã là version 18.x, nhưng quan điểm của mình là nên dùng Node JS bản LTS mới nhất (hiện tại là 22.x), biết đâu sau này Claude Code đổi yêu cầu thì mình vẫn còn xài được :v Vì vậy chúng ta sẽ làm theo hướng dẫn ở đây: https://nodesource.com/products/distributions

TLDR:

```
sudo apt-get install -y curl
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs
node -v
```

Sau đó cần setup npm global prefix để config cài đặt package vào thư mục con trong home, tránh lỗi permission khi chạy không có quyền root, theo hướng dẫn ở đây: https://docs.anthropic.com/en/docs/claude-code/troubleshooting#alternative-solution%3A-create-a-user-writable-npm-prefix-for-global-installs

TLDR:

```
mkdir -p ~/.npm-global
npm config set prefix ~/.npm-global
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
```

### Cài đặt Claude Code

Làm theo hướng dẫn ở đây: https://docs.anthropic.com/en/docs/claude-code/setup

TLDR:

```
npm install -g @anthropic-ai/claude-code
```

Sau đó chạy lệnh `claude`, đăng nhập với account Claude Pro hoặc Anthropic API_KEY

## Cài đặt Serena

### Cài đặt uv

Theo hướng dẫn ở đây: https://docs.astral.sh/uv/getting-started/installation/

TLDR:

```
curl -LsSf https://astral.sh/uv/install.sh | sh
```

### Setup Serena trong project

Dùng `cd` đến thư mục project và chạy lệnh sau:

```
claude mcp add -s project serena -- uvx --from git+https://github.com/oraios/serena serena-mcp-server --context ide-assistant --project $(pwd)
```

Vậy là xong, mỗi lần chạy `claude` trong project thì Serena MCP sẽ được chạy theo (Nhớ check prompt của Claude khi gọi `claude`, vì có thể Claude Code muốn hỏi sẽ chạy những MCPs nào)

## Cài đặt Serena cho java project

Bởi vì hiện tại [Serena đang gặp vấn đề với java project khi chạy trong Linux và MacOS](https://github.com/oraios/serena?tab=readme-ov-file#claude-code:~:text=There%20may%20be%20issues%20with%20java%20on%20macos%20and%20linux), mình đã thử với 1 project dùng gradle, thì rất hay gặp lỗi permission không chạy được lệnh java, mặc dù lệnh đấy call bình thường trong terminal, không bị lỗi path, chmod hay gì cả. Nên hiện tại sẽ có trick lỏ là chạy serena trong Windows, sau đó chạy Serena MCP client và connect bằng SSE. Sau đây là chi tiết:

### Trong Windows

#### Cài Python

Phần này thì khá đơn giản rồi. Mọi người vào trang chủ tải về và cài đặt nhé: https://www.python.org/downloads/

#### Cài uv

TLDR:

```
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
```

Hoặc:

```
pip install uv
```

#### Chạy Serena Server

Vào thư mục project, mở cmd/powershell lên và chạy lệnh sau:

```
uvx --from git+https://github.com/oraios/serena serena-mcp-server --context ide-assistant --project . --transport sse --port 9121
```

### Trong WSL

#### Tìm IP host

Tìm IP host để access từ WSL theo hướng dẫn sau: https://learn.microsoft.com/en-us/windows/wsl/networking

TLDR:

```
ip route show | grep -i default | awk '{ print $3}'
```

Ghi nhớ IP trong output. VD của mình đang là `172.21.0.1`.

**Note**: Với WSL1 thì IP là 127.0.0.1 luôn.

#### Setup Serena MCP Client

Dùng `cd` đến thư mục project, chạy lệnh sau:

```
claude mcp add -s project --transport sse serena http://172.21.0.1:9121/sse
```

Các bạn thay `172.21.0.1` bằng IP trong output ở bước trên nhé.

Sau đó chạy `claude` thì sẽ connect được đến MCP Server đang chạy trên host.

**Lưu ý**: Với java project thì Serena setup hơi lâu (có thể lên đến vài phút), nên theo dõi trên dashboard (mặc định là http://127.0.0.1:24282/dashboard/index.html) để xem tiến độ.

## Tổng kết

Trên đây là hướng dẫn của mình về cách setup Claude Code & Serena MCP trên Windows. Cảm ơn các bạn đã đọc đến đây. Nếu có vấn đề gì hãy comment bên dưới, mình sẽ phản hồi sau nhé. Hẹn gặp các bạn trong các bài tới.

P/S: Hiện tại mình đang nghịch ngợm Claude Code với một task refactor, nếu làm xong, thấy hiệu quả và siêng năng một chút thì mình sẽ viết bài chia sẻ nhau nhé hehe :v

## Update 29/07/2025:

Với những project lớn, nên chạy `index-project` trước khi chạy `serena-mcp-server` theo hướng dẫn ở đây: uvx --from git+https://github.com/oraios/serena index-project

TLDR:

```
uvx --from git+https://github.com/oraios/serena serena project index
```
