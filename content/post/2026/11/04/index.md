---
title: "Góc làm việc cuối 2026: DeskMini ở nhà, code-server trên cloud"
date: 2026-11-04
tags: ["AI-Assisted", "Self-hosted", "Coolify", "Cloudflare", "Linux", "Ubuntu", "Developer Productivity", "Homelab", "code-server"]
categories: ["Sharing"]
---

Mình muốn mở chỗ làm việc của mình từ bất kỳ thiết bị nào, để coding agent gánh ngày càng nhiều việc, và tận dụng những free tier miễn phí lâu dài. Sau nhiều lần cài thử rồi gỡ, góc làm việc cuối năm 2026 của mình còn lại ba phần:

- **Trên cloud:** code-server chạy trong container trên OCI Always Free ARM, được Coolify triển khai từ [tiennm99/composes](https://github.com/tiennm99/composes).
- **Ở nhà:** DeskMini X600 chạy Ubuntu, gánh việc biên dịch, chạy container và coding agent để mình truy cập từ xa.
- **Mang theo:** ThinkPad giữ nhẹ như một thin client, dùng để nối vào hai nơi kia qua SSH, Tailscale hoặc code-server.

Để đi tới đây, mình đã thử đủ thứ: đổi image code-server, tìm terminal chạy trong trình duyệt, rồi mất hai tuần loay hoay với desktop từ xa. Có thứ hợp, có thứ chỉ nằm lại trong thư mục archive.

Bài này được AI hỗ trợ tổng hợp từ lịch sử Git, kế hoạch và ghi chú, sau đó mình bổ sung lý do cho các lựa chọn. Mình không kiểm tra trực tiếp DeskMini lúc viết; những gì chưa xác minh hoặc chưa nhớ rõ lý do sẽ được nói rõ ở phần tương ứng.

## Điểm xuất phát: code-server trong một container

Mình đã tự host Coolify từ ít nhất tháng 05/2025. Đến 14/08/2026, khi tổ chức lại repo composes, mình thêm code-server bằng image LinuxServer, gọi tắt là lsio. Go, Node và Python được cài qua `DOCKER_MODS`, các gói bổ sung qua `INSTALL_PACKAGES`. Thư mục home của người dùng `abc` nằm ở `/config`.

Chạy image này dưới Coolify có vài điểm bất tiện. Mỗi lần triển khai lại, container được tạo mới, các mod tải lại và apt phải giải quyết lại toàn bộ danh sách `INSTALL_PACKAGES`. Mình đã phải rút gọn danh sách gói. Nếu một mod cài lỗi, lỗi chỉ được ghi vào log rồi bỏ qua: trình soạn thảo vẫn mở được nhưng thiếu công cụ. Volume workspace lúc mới tạo còn thuộc root, nên mình phải xử lý quyền bằng Dockerfile.

Đó là những vướng mắc mình gặp với lsio. Lý do mình chọn chuyển sang image chính thức của Coder là muốn dùng bản sát upstream hơn. Mình thêm `codercom/code-server` cùng Dockerfile riêng ngày 06/10, rồi gỡ và lưu bản lsio vào archive ngày 12/10.

Dockerfile mới gom sẵn các công cụ cần dùng sau khi triển khai: bộ công cụ biên dịch, bubblewrap, các CLI mạng, tìm kiếm, kiểm tra mã và cơ sở dữ liệu, cùng gh, Docker CLI, Compose, Buildx, glab và gt. Nhờ vậy, các lệnh hỗ trợ và tính năng tự hoàn thành cũng có sẵn. Mình dùng `FROM codercom/code-server:latest` vì image không có tag theo phiên bản lớn.

Để agent-browser chạy không cần giao diện trên ARM64, image có Chromium từ Debian và các phông chữ cần thiết; mình cũng chỉnh bộ nhớ chia sẻ để Chromium tránh bị văng. GTK/WebKitGTK phục vụ việc biên dịch và kiểm thử Tauri không có màn hình.

**Riêng toolchain ngôn ngữ, mình giữ trong home, ngoài image:** fnm, uv, rustup, Go từ tarball và SDKMAN. Cài thêm một bản vào image chỉ làm quá trình build nặng hơn, trong khi bản đó có thể bị bản trong home che khuất. Tách riêng như vậy cũng tránh việc triển khai lại container âm thầm nâng phiên bản công cụ mình đang dùng.

Một vướng mắc còn lại là gõ tiếng Việt trong terminal trình duyệt khi dùng Claude Code. Tới lần ghi nhận ngày 18/10, mình chưa có cách sửa được hỗ trợ chính thức. Phím Backspace và quá trình ghép dấu phải đi qua cả chuỗi trình duyệt, xterm.js, WebSocket rồi PTY. Mình tạm soạn bên ngoài rồi dán vào.

## Những thứ khảo sát, thử rồi gỡ trên máy chủ

Song song với việc đổi image, mình tìm cách dùng terminal và coding agent ngay trong trình duyệt. Từ tháng 9 đến đầu tháng 11, vài cái tên lần lượt xuất hiện rồi rời khỏi máy chủ:

- **OpenHands:** thử từ 18 đến 19/09, khoảng một ngày.
- **opencode web:** thử từ 18/09 đến 05/10 để có shell trong trình duyệt.
- **Paseo:** dùng từ 16/09 đến 03/11, lần chỉnh cuối là 06/10. Daemon này từng có vẻ hợp, nhưng mỗi agent CLI cần cài khoảng 200 MB lúc khởi động. Mình bỏ vì Orca và T3 Code có tính năng và trải nghiệm tốt hơn.

Với OpenHands và opencode web, mình không ghi lại lý do gỡ.

Zellij web client là thứ mình thực sự muốn dùng. Mình chạy nó trong container từ 21/10 đến 03/11, nhưng vướng ngay ở phím tắt: trình duyệt giữ Ctrl+T, Ctrl+W, Ctrl+N và Ctrl+Tab, đúng những tổ hợp mình cần cho các chế độ của Zellij. Với cấu hình Unlock-First, Ctrl+G lại mở thanh tìm kiếm của Firefox; đổi sang Alt+G mới dùng được. Mỗi lần mở đường dẫn gốc, Zellij còn tạo một phiên mới mà mình không tự xóa được. Cuối cùng, chuyện phím tắt là lý do khiến mình bỏ nó.

Trong lúc dựng, mình từng dùng socat làm relay và gặp cả trường hợp Zellij thoát không báo gì khi thiếu tệp cấu hình.

Gõ cũng có lúc bị trễ, nhưng mình chưa chứng minh được đó là lỗi của Zellij. Container gần như không tải; biến `TERM` sai, bộ gõ tiếng Việt qua trình duyệt hay độ trễ mạng đều có thể góp phần. Riêng lỗi `TERM=unknown` làm Backspace chạy sang phải thì mình đã sửa.

Hướng thay thế mình khảo sát ngày 24/10 là tmux qua ttyd. tmux dùng tiền tố Ctrl+B, nên cấu hình mặc định ít đụng phím trình duyệt hơn cách chia chế độ của Zellij. Nó vẫn phải làm việc trong giới hạn phím mà trình duyệt cho phép.

Mình thêm template ttyd nhưng chưa thực sự dùng thử. Sau đó, Orca và T3 Code đã đáp ứng nhu cầu nên mình bỏ luôn template. Một terminal đơn thuần vẫn thiếu với mình: chỉ muốn xem một tệp thôi mà cũng phải nhờ Claude thì hơi vòng vèo.

Ngày 03/11, mình đưa Paseo, Zellij và template ttyd vào archive cùng một commit. Bản Zellij container đã được gỡ; phần terminal mình còn dùng là SSH qua trình duyệt trên DeskMini và terminal trong code-server.

## Chiếc DeskMini ở nhà

Con máy ở nhà là ASRock DeskMini X600: bo X600M-STX, Ryzen 7 8700G với 8 nhân, 16 luồng, đồ họa tích hợp Radeon 780M và 32 GB RAM. Máy có hai ổ NVMe 500 GB, một cho hệ điều hành, một cho workspace. Ở lần kiểm tra ngày 21/10, nó chạy Ubuntu 26.04 desktop với GNOME trên Wayland.

Mình chọn DeskMini vì nó mạnh và có GPU, hợp làm **máy Linux ở nhà để gánh việc nặng và truy cập từ xa**. Desktop Windows của mình còn mạnh hơn, nhưng mình không chọn nó cho vai trò chạy 24/7 vì nó dùng Windows. Khi ở nhà, mình vẫn ngồi desktop Windows; ở chỗ làm, lúc cần homelab mạnh, mình mở Orca trên DeskMini qua Tailscale.

ThinkPad vì thế có thể giữ nhẹ: việc biên dịch, chạy container, toolchain và tác vụ dài đều chuyển sang DeskMini hoặc máy chủ. DeskMini không chạy Coolify; các dịch vụ ở đây dùng Docker Compose thông thường và systemd. Truy cập qua trình duyệt đi qua Cloudflare Tunnel và Access.

Toolchain được bổ sung dần từ cuối tháng 10: Node qua fnm, Python qua uv, Go từ tarball chính thức với `GOTOOLCHAIN=auto`, Rust qua rustup và Java 21 qua SDKMAN. Máy cũng có gcc, git, gh, Docker, glab và sau đó là gt. Một điểm dễ quên khi viết tác vụ tự động: fnm và SDKMAN được nạp từ cấu hình zsh tương tác, nên cron và systemd không tự thấy chúng.

Từ 22/10, DeskMini đã có ghi chú riêng trong workspace repo. Lúc đó, vai trò của nó còn gắn với một thứ mình rất muốn làm cho ổn: desktop Linux mở ngay trong trình duyệt bằng Guacamole.

## Hai tuần đi tìm desktop trong trình duyệt

Mục tiêu lúc đó rất cụ thể: mở desktop Linux từ bất kỳ đâu bằng trình duyệt, không cần cài gì trên máy đang ngồi. Vì thế, mình tìm đường qua Cloudflare Tunnel và Access, thay vì yêu cầu máy truy cập phải có Tailscale.

Trong các lựa chọn mình khảo sát ngày 19/10, Guacamole là phương án miễn phí, tự host, không cần cài ứng dụng phía truy cập và hỗ trợ RDP cho cả Linux lẫn Windows. Cloudflare browser RDP đứng sau trong bản so sánh, nhưng mình lại thử nó trước. Ngày 21/10, GNOME Remote Desktop trả về lỗi:

> Client did not advertise support for the Graphics Pipeline, closing connection

GNOME yêu cầu RDP Graphics Pipeline, còn IronRDP phía Cloudflare lúc đó không quảng bá khả năng hỗ trợ nên GNOME đóng kết nối. Tài liệu Cloudflare mình đọc cũng chỉ liệt kê máy Windows là được hỗ trợ. Đường truy cập này vì thế không dùng được với GNOME trong lần thử của mình.

VNC cũng nằm trong phần khảo sát, nhưng mình chưa cài thử. Với GNOME trên Ubuntu 26.04 trong cấu hình này, mình chỉ còn Wayland và GNOME Remote Desktop phục vụ RDP. Các phương án VNC mình xem cần X11 hoặc wlroots; những hướng dẫn có nút bật VNC trong GNOME không còn khớp với bản đang dùng.

Mình chuyển sang Guacamole, dựng bằng Docker trên DeskMini trong hai ngày 21–22/10, gồm guacamole, guacd và PostgreSQL. Mình ghim bản 1.6.0 vì đây là bản phát hành đầu hỗ trợ Graphics Pipeline; tag `latest` lúc đó lại là bản phát triển chỉ có amd64.

Kết nối lên được, nhưng phiên làm việc lại rớt giữa chừng. Lỗi lặp lại dưới cả QUIC lẫn HTTP/2, còn cloudflared không ghi gì tương ứng với những lần rớt. Vì vậy, đổi giao thức tunnel không giải quyết được vấn đề. Trong chuỗi log ghi nhận được, guacd báo `User is not responding.` sau 15 giây im lặng rồi đóng RDP. Các ngưỡng chờ 15 giây này được biên dịch sẵn, không chỉnh qua cấu hình được.

**Mình vẫn chưa xác định được nguyên nhân.** Ban đầu mình nghi trình duyệt hạn chế bộ đếm giờ của tab nền, nhưng tab đang mở trước mặt cũng rớt. Giả thuyết phù hợp nhất lúc đó là các lỗi phát sinh ở Guacamole 1.6.0, gồm GUACAMOLE-2118, các báo cáo trùng và GUACAMOLE-2081. Các lỗi này đã được sửa trên nhánh 1.6.1 nhưng bản đó chưa phát hành tại thời điểm khảo sát.

Dù vậy, mình chưa có kết quả kiểm thử qua LAN để bỏ tunnel ra khỏi đường kết nối. Có lần SSH và RDP cùng đông cứng dù chạy ở hai tiến trình guacd riêng, cũng chưa giải thích gọn được bằng giả thuyết trên.

Với SSH qua Guacamole, hậu quả còn khó chịu hơn: shell gắn vào kết nối trình duyệt, nên một lần rớt có thể làm mất lệnh đang chạy và trạng thái chưa lưu. Mình muốn chuyển phần terminal ra khỏi Guacamole vì thế. Template Zellij đã có từ 21/10, trước lần chẩn đoán này; trải nghiệm rớt SSH càng cho thấy mình cần phiên terminal tồn tại độc lập với tab trình duyệt.

Ban đầu, mình chọn giữ 1.6.0 để chờ 1.6.1, chỉ hạ về 1.5.5 nếu rớt quá thường xuyên. Phương án hạ bản cần sao lưu PostgreSQL và chuẩn bị lược đồ 1.5.5 vì Guacamole không có migration ngược.

Đến 03/11, mình ngừng dùng Guacamole và đưa vào archive vì kết nối thiếu ổn định. SSH qua trình duyệt của Cloudflare đã đủ cho nhu cầu terminal; khi cần desktop, mình dùng Tailscale cùng ứng dụng Windows RDP chính thức. Mục tiêu ban đầu là mọi thứ đều mở bằng trình duyệt, nhưng cuối cùng mình chấp nhận dùng ứng dụng RDP riêng cho phần này.

## Những gì đang chạy trên DeskMini bây giờ

Theo trạng thái được ghi lại lúc viết bài, SSH qua trình duyệt, code-server, T3 Code và Orca đều có đường truy cập qua **Cloudflare Tunnel và Access**. Tailscale nối các thiết bị của mình với nhau.

**code-server** được cài bằng gói `.deb`, chạy qua systemd và đã có trong ghi chú từ 22/10. Vì không dùng được VS Code Settings Sync, mình dự định giữ cấu hình và danh sách tiện ích mở rộng — Claude Code cùng một theme — trong dotfiles, rồi áp dụng bằng một script chạy tay. Phần dotfiles này chưa được áp dụng lên DeskMini.

**Orca và T3 Code** vừa được chuyển từ cách mở ứng dụng desktop sang chạy bằng systemd user service. Mình cài Orca (`stablyai/orca`) từ gói `.deb` ngày 27/10; ngày cài T3 Code thì không còn dấu vết. Theo ghi chú, mục tiêu của lần chuyển đầu tháng 11 là để chúng lên khi khởi động máy mà không cần mở ứng dụng desktop. Riêng Orca, với `--supervise`, dịch vụ sẽ chờ nếu một Orca khác đang phục vụ cùng profile, nên mở ứng dụng desktop trước có thể khiến dịch vụ phải chờ.

Trong bản so sánh ngày 02/11, Orca được mô tả là workspace desktop xoay quanh Git worktree, chạy agent CLI trực tiếp trong terminal. T3 Code tổ chức công việc theo luồng hội thoại, điều khiển agent qua adapter và có giao diện truy cập mỏng. Bản so sánh chỉ dựa trên tài liệu, chưa phải kiểm thử hai bên, và đề nghị giữ Orca, thử T3 khi cần điều khiển agent trên máy chủ từ điện thoại hoặc trình duyệt. Hiện cả hai đều chạy dạng dịch vụ, còn Orca là ứng dụng mình dùng nhiều nhất.

**Tailscale và cloudflared** chia việc với nhau: Tunnel cùng Access phục vụ đăng nhập từ xa và giao diện web, còn Tailscale lo các kết nối khác giữa thiết bị của mình. Mình chọn cách này vì thấy đơn giản hơn WARP-to-WARP. Với GNOME Remote Desktop, phần khảo sát phân biệt đăng nhập từ xa ở màn hình đăng nhập với chia sẻ desktop sau khi đã đăng nhập; mình chưa có kết quả kiểm thử được ghi lại cho phần này.

**Gitea cùng gitea-mirror** chạy từ repo composes, làm nơi sao lưu GitHub trên DeskMini. Chuyện crawler ghé vào Gitea mình đã kể trong [bài ngày 29/10/2026]({{< ref "/post/2026/10/29" >}}).

Phần sao lưu cũng từng vướng: ngưỡng chờ mặc định của Gitea cắt ngang các lần clone nhiều GB, còn Bun fetch ngắt kết nối không có dữ liệu trong năm phút, để lại repo làm dở. Mình tăng ngưỡng chờ để xử lý. Health check gọi GitHub API không có token quá thường xuyên cũng chạm giới hạn yêu cầu ẩn danh, nên mình giảm tần suất. CLI tea được thay bằng gt khi tea bị archive ở upstream và gt lên 1.0.0. Còn lý do chuyển chỗ sao lưu về nhà thì mình không ghi lại, nên không thể quy nó cho một sự cố cụ thể.

## Bật máy từ xa: từ RTC đến ổ cắm thông minh

Ban đầu, bật máy từ xa nằm ngoài phạm vi mình định làm. Phần khảo sát có gợi ý ESP32 nhận lệnh Telegram để đánh thức PC, nhưng mình chưa triển khai.

Từ 28/10, mình dùng RTC wake với `rtcwake` qua systemd để hẹn DeskMini tự bật. Điểm yếu là nếu mất điện hoặc bị tắt cứng, máy có thể bỏ qua bước đặt lịch đánh thức.

Đến 03/11, mình gỡ lịch RTC phía hệ điều hành và chuyển sang hướng dùng ổ cắm thông minh, dựa vào BIOS tự bật máy khi có điện trở lại. Mình không ghi lại lý do bỏ RTC. Quy trình dự kiến là:

1. Tắt máy từ hệ điều hành trước, không cắt điện khi PC đang chạy.
2. Tắt ổ cắm khoảng 30 giây rồi bật lại.

**Phần này vẫn chưa hoàn thành.** Mình còn phải tắt RTC alarm trong BIOS, đặt restore on AC loss thành power on, rồi thử trọn vòng tắt/bật ổ cắm và tình huống mất điện. Vì vậy, chưa thể nói mình đã bật máy từ xa thành công bằng cách này.

## Coolify và hai máy chủ Always Free

Phía cloud, Coolify quản lý hai máy chủ OCI Always Free chạy ARM và Ubuntu 24.04 Minimal, cùng Traefik v3 và Let's Encrypt. Mình chọn OCI vì muốn dùng free tier miễn phí lâu dài. Còn Coolify thay vì Dokploy là vì mình thấy nó ổn định hơn — đây là cảm nhận cá nhân, chưa có số liệu hay phép thử so sánh. Trong các tệp compose, mình vẫn để sẵn phần cho Dokploy.

Các cấu hình triển khai chung nằm trong repo composes công khai, dùng giấy phép Apache 2.0. Mỗi dịch vụ có thư mục riêng với `compose.yml`, `README.md` và tệp biến môi trường mẫu, cùng một ứng dụng Coolify có webhook theo dõi riêng để tránh triển khai lại chéo. Chú thích trong cấu hình giải thích nó làm gì, còn README giữ lý do lựa chọn. Các công cụ mình tự viết thì giữ compose ngay trong repo của chúng.

Thư mục archive giúp nhìn lại mình đã thử gì và gỡ lúc nào. Điểm còn thiếu là lý do: không phải lần nào mình cũng ghi lại vì sao bỏ một thứ.

## Giữ mọi thứ nhất quán giữa các máy

Thứ giúp mình và agent không lạc giữa chừng ấy máy là một workspace repo được checkout ở nhiều nơi. Repo bắt đầu ngày 25/07, chỉ để chứa vài skill audit GitHub rồi lớn dần. Đến cuối tháng 10, ghi chú theo từng máy được tổ chức lại để agent đọc đúng ngữ cảnh. Claude Code và Codex dùng chung bộ quy tắc; mình dùng Claude Code là chính. AgentKit CLI cài bộ kit vào thư mục home của từng agent.

Mình chia ngữ cảnh theo cách nó được dùng: quy tắc được nạp mỗi phiên, skill được đọc theo tác vụ, còn memory có một mục lục luôn được nạp để trỏ tới các tệp liên quan. Hook chặn những lỗi tốn kém; ghi chú và kế hoạch giữ việc cần làm; lịch sử Git và tài liệu giữ chuyện đã xảy ra. Memory cũng được theo dõi bằng Git. Điều mình phải nhớ là chỉ quy tắc mới được bảo đảm nạp: để một chỉ dẫn hành vi trong memory thì agent có thể bỏ qua nó.

Phần đồng bộ cấu hình bằng dotfiles thì **chưa áp dụng lên máy nào**. Mình chọn chezmoi trong đợt so sánh ngày 29/10: đây là lựa chọn duy nhất trong nhóm khảo sát có một tệp thực thi chạy trực tiếp trên Windows. Nó hỗ trợ mẫu cấu hình theo máy, hỏi thông tin một lần, tích hợp sops khi áp dụng và cho xem trước thay đổi. dotter đứng sau trong bản so sánh; Ansible cần WSL để điều khiển từ Windows và có phần cấu hình nặng hơn cách quản lý tệp trực tiếp cho nhu cầu của mình.

Kế hoạch toolchain cũng đổi: mình bỏ mise khỏi kế hoạch ngày 30/10, chuyển sang công cụ riêng cho từng hệ — rustup, uv, fnm, SDKMAN hoặc Temurin qua winget, và Go chính thức với `GOTOOLCHAIN=auto`. Mình không ghi nhận lỗi cụ thể nào của mise.

Với shell, mình dự định dùng zsh, zimfw và Starship thay cho oh-my-zsh cùng powerlevel10k. Trong nhóm được so sánh, zimfw phổ biến nhất trong các lựa chọn ổn định và nhanh nhất ở phép thử được ghi lại; khả năng tự hoàn thành có sẵn cũng phủ gần hết nhu cầu. README của powerlevel10k thì nói mức hỗ trợ rất hạn chế. Đây vẫn là kế hoạch, còn oh-my-zsh vẫn chạy trên máy chủ.

## Việc còn dở và bài học

Tính tới 04/11/2026, hai việc còn dở là:

- Chỉnh BIOS DeskMini và kiểm thử bật máy qua ổ cắm, kể cả sau khi mất điện.
- Áp dụng dotfiles lên từng máy.

Nhìn lại các lần thay đổi, mình rút ra mấy điều:

- **Ghi cả vì sao, đừng chỉ ghi đã làm gì.** Lịch sử Git dựng lại được các lần thay đổi, nhưng không tự giải thích được động cơ. Ghi lý do ngay lúc quyết định sẽ đỡ phải nhớ lại như khi viết bài này.
- **Desktop qua trình duyệt cần thử với đúng hệ đang dùng.** Với GNOME Wayland của mình, yêu cầu Graphics Pipeline đã chặn một đường RDP, còn các hướng dẫn VNC cũ không còn phù hợp.
- **Phiên làm việc nên tồn tại qua một lần đóng tab.** Buộc nó vào kết nối trình duyệt khiến một lần rớt có thể kéo theo công việc đang chạy.
- **Tách toolchain khỏi image giúp kiểm soát việc nâng phiên bản.** Triển khai lại container không nên âm thầm đổi công cụ mình đang dùng.
- **Chia đường truy cập theo nhu cầu giúp mình dễ dùng hơn.** Tunnel cùng Access cho đăng nhập và giao diện web; Tailscale cho các kết nối khác giữa thiết bị của mình.

Góc làm việc này chắc còn đổi. Hiện tại, mình dùng Orca nhiều nhất, giữ code-server để mở workspace qua trình duyệt, và để DeskMini cùng máy chủ gánh việc nặng. Những thứ đã bỏ giúp mình rõ hơn mình cần gì ở lần cài tiếp theo.
