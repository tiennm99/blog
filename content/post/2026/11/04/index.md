---
title: "Góc làm việc của mình cuối 2026: một chiếc DeskMini ở nhà, một container code-server trên cloud, và những thứ đã thử rồi bỏ"
date: 2026-11-04
tags: ["AI-Assisted", "Self-hosted", "Coolify", "Cloudflare", "Linux", "Ubuntu", "Developer Productivity", "Homelab", "code-server"]
categories: ["Sharing"]
---

Mình muốn có một chỗ làm việc mở được từ bất kỳ thiết bị nào, trên những free tier thật sự miễn phí lâu dài, và ngày càng do coding agent làm phần lớn việc. Setup đó không có ngay từ đầu: mình tự host Coolify từ ít nhất tháng 05/2025 và đưa code-server vào repo compose ngày 14/08/2026. Từ 22/10/2026, DeskMini ở nhà có ghi chú riêng trong workspace repo, và ghi chú hiện tại đặt việc nặng ở đó hoặc trên máy chủ. Nhìn từ trên xuống, setup hiện giờ của mình gồm ba phần:

- **Cloud:** code-server container trên OCI Always Free ARM, Coolify deploy từ [tiennm99/composes](https://github.com/tiennm99/composes).
- **Ở nhà:** DeskMini X600 chạy Ubuntu, gánh build, container và agent từ xa.
- **Mang theo:** ThinkPad giữ nhẹ như thin client, nối hai nơi kia qua SSH, Tailscale hoặc code-server.

Bài này được AI tổng hợp từ git history, plans và ghi chú của mình, rồi mình bổ sung lý do cho những lựa chọn bên dưới. Con DeskMini không được kiểm tra trực tiếp lúc viết. Một vài quyết định vẫn chưa có lý do được ghi lại.

## Điểm xuất phát: code-server trong một container

Mình bắt đầu phần code-server trong layout mới của repo composes bằng image LinuxServer, gọi tắt là lsio. Ngày 14/08/2026, commit dựng lại cấu trúc repo thêm code-server vào layout mới. Go, Node và Python vào qua `DOCKER_MODS`, còn các gói bổ sung vào qua `INSTALL_PACKAGES`. Theo cách của LinuxServer, home của user `abc` nằm ở `/config`.

Khi chạy image này dưới Coolify, mình để ý vài điểm và ghi ra đây như quan sát chứ không phải lý do gỡ. Mỗi lần redeploy, Coolify tạo lại container, nên mods tải lại và apt resolve lại toàn bộ `INSTALL_PACKAGES` từ đầu. Vì vậy, mình đã phải rút gọn danh sách gói. Mod nào cài lỗi thì chỉ được log rồi bỏ qua, còn editor vẫn lên nhưng thiếu tool. Volume workspace lúc mới tạo thuộc root, nên mình phải sửa bằng Dockerfile.

Sau đó, mình chuyển sang image chính thức của coder vì nó sát upstream hơn và là image chính thức. Ngày 06/10/2026, mình thêm `codercom/code-server` với Dockerfile riêng và đổi tên bản lsio. Sáu ngày sau, 12/10/2026, mình gỡ bản cũ và cất vào thư mục archived.

Image chính thức này gom những công cụ mình cần sau deploy. Nó dùng `FROM codercom/code-server:latest` vì image không có major tag. Image có build tools, bubblewrap và các CLI mạng/search/lint/database. Các công cụ gh, Docker CLI, Compose, Buildx, glab và gt cũng nằm trong image để helpers và completion có sẵn sau deploy. Debian Chromium cùng fonts để agent-browser chạy headless trên ARM64. Mình chỉnh shared memory để Chromium tránh crash. GTK/WebKitGTK phục vụ việc compile và test Tauri không có display.

**Language toolchain nằm trong home, ngoài image:** mình giữ fnm, uv, rustup, Go tarball và SDKMAN ở đó. Bản copy thêm vào image chỉ che khuất bản trong home và làm build nặng hơn. Cách giữ riêng này cũng tránh việc redeploy âm thầm nâng tool mình đang dùng.

Chuyện gõ tiếng Việt trong Claude Code browser terminal vẫn còn vướng. Tới 18/10/2026, mình chưa có fix được hỗ trợ cho nó. Backspace và chữ ghép phải đi qua browser, xterm.js, websocket rồi pty. Cách mình xử lý tạm là soạn bên ngoài rồi paste vào.

## Những thứ khảo sát, thử rồi gỡ trên máy chủ

Song song với chuyện image, từ tháng 09/2026 đến tháng 11/2026 mình khảo sát và thử vài cách để có terminal hoặc coding agent ngay trong browser, chạy trên máy chủ. Riêng OpenHands và opencode web, mình không ghi lại lý do gỡ.

- **OpenHands, 18/09/2026–19/09/2026:** mình thử trong khoảng một ngày.
- **opencode web, 18/09/2026–05/10/2026:** một cách mình đã thử để có shell trong browser.
- **Paseo, 16/09/2026–03/11/2026:** agent daemon từng có vẻ hợp; mình chỉnh cuối vào 06/10/2026. Mỗi agent CLI khoảng 200 MB cài lúc start. Mình bỏ Paseo vì Orca và T3 Code có tính năng tốt hơn, trải nghiệm cũng tốt hơn.

Zellij web client thì mình chạy trong container lâu hơn, từ 21/10/2026 đến 03/11/2026, và đây là thứ mình thực sự muốn dùng. Vấn đề lớn nhất là phím: browser giữ lại Ctrl+T, Ctrl+W, Ctrl+N và Ctrl+Tab, đúng những tổ hợp Zellij dùng cho mode. Với preset Unlock-First, Ctrl+G lại mở thanh tìm kiếm của Firefox. Mình đổi sang Alt+G thì dùng được. Mỗi lần mình mở đường dẫn gốc, Zellij tạo một session mới mà session đó không tự xóa được. Mình bỏ Zellij vì những vướng mắc về phím tắt.

Lúc dựng Zellij, mình từng dùng socat relay. Mình cũng vướng chuyện Zellij thoát mà không báo gì nếu không có file config.

Mình có thấy gõ bị trễ, nhưng chưa chứng minh được là lỗi của Zellij. Container gần như idle, còn biến `TERM` bị sai, bộ gõ tiếng Việt đi vòng qua browser hoặc đơn giản là latency đều là ứng viên. Lúc đó, `TERM=unknown` làm backspace chạy sang phải, và mình đã sửa lỗi này.

Sau đó, mình tìm cách thay phần terminal này. Ngày 24/10/2026, mình hỏi lại xem nên chạy gì thay, với tiền đề là mấy phím kia sẽ không đòi lại được. Kết quả đề nghị tmux sau ttyd: tmux chỉ dùng một prefix Ctrl+B thay vì mode trên từng Ctrl+chữ, nên ít mặc định đụng browser hơn. Việc đổi multiplexer không làm browser trả lại phím nào. Mình chỉ thêm template ttyd ngay hôm đó, chưa thực sự dùng thử. Mình bỏ template vì Orca và T3 Code đã đáp ứng nhu cầu này. ttyd chỉ là terminal, chưa đủ cho mình: khi cần xem file thì sao lại phải dùng Claude?

Tới ngày 03/11/2026, mình đưa Paseo, Zellij và template ttyd vào archive cùng một commit. **Bản Zellij container đã gỡ.** Hiện mình có browser SSH trên DeskMini và terminal code-server.

## Chiếc DeskMini ở nhà

Con máy ở nhà của mình là ASRock DeskMini X600. Nó dùng bo X600M-STX và Ryzen 7 8700G với 8 cores, 16 threads. Máy có Radeon 780M iGPU và 32 GB RAM. Một NVMe 500 GB dành cho OS, còn NVMe 500 GB thứ hai làm workspace. Theo kiểm tra ngày 21/10/2026, nó chạy Ubuntu 26.04 desktop với GNOME trên Wayland.

Mình chọn DeskMini vì nó mạnh và có GPU, dùng nó như **Linux box ở nhà để làm việc nặng và truy cập từ xa**. Desktop Windows ở nhà của mình còn mạnh hơn, nhưng chạy Windows nên không phù hợp để chạy 24/7. Ở nhà mình vẫn dùng desktop Windows; ở chỗ làm, khi cần homelab mạnh, mình dùng Orca trên DeskMini qua Tailscale. Quy tắc của laptop là giữ nhẹ: build, container, toolchain và job dài chạy ở DeskMini hoặc máy chủ. DeskMini không phải Coolify server; các service ở đây dùng docker compose thường và systemd. Đường truy cập từ browser đi qua Cloudflare Tunnel và Access.

Mình thêm toolchain cho con máy này từng đợt. Ngày 22/10/2026, máy có Node qua fnm và Python qua uv. Các công cụ gcc, git, gh và docker cũng có từ đợt đó. Ngày 27/10/2026, mình thêm Go từ tarball chính thức với `GOTOOLCHAIN=auto` và Rust qua rustup. Java 21 qua SDKMAN và glab cũng được thêm trong đợt này. Tới 03/11/2026, máy có thêm gt. Một điều mình phải lưu ý khi viết job là fnm và SDKMAN load từ cấu hình zsh tương tác, nên cron và systemd không thấy chúng.

Workspace repo cũng phải đổi cách nhìn về các máy. Ngày 22/10/2026, repo chuyển sang ghi chú riêng theo máy. DeskMini xuất hiện trong đó với vai trò homelab Ubuntu desktop có Guacamole.

## Hai tuần đi tìm desktop trong trình duyệt

Mục tiêu của mình ngày 19/10/2026 rất cụ thể: mở desktop Linux từ bất kỳ đâu bằng browser, không cài gì trên máy đang ngồi xem. Vì thế, mình chọn Tunnel + Access thay cho yêu cầu cài Tailscale client ở máy xem.

Mình bắt đầu từ research cùng ngày. Research xem Guacamole là lựa chọn miễn phí, self-host và thực sự clientless duy nhất phủ cả Linux lẫn Windows qua RDP, còn Cloudflare browser RDP đứng sau. Nhưng mình thử Cloudflare trước vào 21/10/2026, rồi gặp ngay giới hạn của GNOME Remote Desktop:

> Client did not advertise support for the Graphics Pipeline, closing connection

Vấn đề nằm ở cách client nói chuyện với GNOME. GNOME yêu cầu RDP Graphics Pipeline, còn IronRDP phía Cloudflare không quảng bá hỗ trợ này nên GNOME đóng kết nối. Cloudflare cũng chỉ liệt kê Windows host là được hỗ trợ. Thất bại này thuộc đường vào GNOME.

Mình không có một lần cài thử VNC khác trong câu chuyện này. Research ngày 26/10/2026 loại nó ra: GNOME của Ubuntu 26.04 chỉ còn Wayland, còn GNOME Remote Desktop chỉ phục vụ RDP. Các VNC server thông thường cần X11 hoặc wlroots. Những hướng dẫn còn nút bật VNC đã cũ với bản này.

Sau đó, mình thử Guacamole trên PC. Trong hai ngày 21/10/2026 và 22/10/2026, mình dựng Guacamole 1.6.0 bằng Docker, gồm guacamole, guacd và PostgreSQL, để nối vào GNOME Remote Desktop. Mình pin 1.6.0 vì đây là release đầu hỗ trợ Graphics Pipeline. Tag latest upstream là development build chỉ có amd64.

Rồi session rớt giữa lúc mình đang dùng. Ngày 22/10/2026, mình ghi nhận nó rớt lặp lại dưới cả QUIC lẫn HTTP/2. cloudflared không log gì đúng các lần rớt, nên phần chẩn đoán loại protocol tunnel khỏi nguyên nhân. Trong chuỗi ghi nhận được, guacd báo `User is not responding.` sau 15 giây im lặng, rồi RDP đóng. Các timeout 15 giây được compile sẵn, nên mình không chỉnh chúng bằng config được.

Mình chưa chứng minh được nguyên nhân của những lần rớt này. Ban đầu, mình nghi timer của tab nền bị browser throttle, nhưng tab đang focus cũng rớt nên giả thuyết ấy không đứng nữa. Giải thích khớp nhất là nhóm regression của Guacamole 1.6.0, gồm GUACAMOLE-2118 cùng các duplicate và GUACAMOLE-2081. Nhóm lỗi này đã được sửa trên nhánh 1.6.1 chưa release. **Giải thích khớp nhất vẫn chưa phải chứng minh:** bài test bỏ qua tunnel bằng LAN không có kết quả được ghi lại. Một lần SSH và RDP cùng đông cứng dù ở hai guacd process riêng cũng không khớp gọn với giả thuyết này.

SSH qua Guacamole khiến mình thấy rõ hơn hậu quả của một lần rớt. Shell bị buộc vào browser connection, nên một lần rớt làm mình mất command đang chạy và trạng thái chưa lưu. Điều đó đẩy kế hoạch terminal ra khỏi SSH của Guacamole. Nó không phải nguyên nhân tạo template Zellij, vì template đã có từ 21/10/2026, trước chẩn đoán này.

Lúc đó, mình vẫn chọn chờ bản sửa. Quyết định ngày 22/10/2026 là ở lại 1.6.0 và chờ 1.6.1, chỉ downgrade 1.5.5 nếu session rớt thường xuyên. Việc downgrade cần backup Postgres và schema 1.5.5 vì Guacamole không có down-migration. Tới đây, lịch sử vẫn ghi một phương án chờ sửa.

Nhưng tới ngày 03/11/2026, mình nghỉ dùng Guacamole và đưa nó vào archive vì thấy nó không ổn định và hay gặp vấn đề kết nối. Browser SSH của Cloudflare đã đủ cho mình. Khi cần RDP, Tailscale kết hợp với client Windows RDP chính thức đáp ứng đúng nhu cầu của mình.

Mình chuyển sang browser SSH qua Cloudflare Tunnel và Access.

## Những gì đang chạy trên DeskMini bây giờ

Theo ghi chú của mình, browser SSH, code-server, T3 Code và Orca đi qua **Cloudflare Tunnel và Access**. Tailscale nằm bên cạnh để nối các thiết bị của mình với nhau. Mình lấy trạng thái này từ tài liệu và git history, chứ không kiểm tra live trong lúc viết.

**code-server** trên DeskMini được ghi lại từ 22/10/2026. Nó được cài bằng .deb và chạy systemd. Vì code-server không dùng được VS Code Settings Sync, plan chung cho code-server là giữ settings và danh sách extension — Claude Code và một theme — trong dotfiles, có một script apply chạy tay. Mình chưa apply cấu hình dotfiles đó lên DeskMini.

**Orca và T3 Code** là những app agent mình chạy trên con này, và vừa đổi cách khởi động. Orca (`stablyai/orca`) mình cài từ bản release .deb ngày 27/10/2026. Ngày cài T3 Code thì mình không còn dấu vết. Trước 03/11/2026, mình dùng chúng qua desktop app. Theo mình hiểu lại từ ghi chú, mục tiêu là cho chúng lên khi boot mà không cần mở desktop app. Sau đó, mình chuyển sang systemd user service. Với `--supervise`, service Orca sẽ chờ nếu một Orca khác đang phục vụ profile, nên desktop app chạy trước có thể chặn service.

Mình có một bản so sánh hai app này ngày 02/11/2026. Bản đó chỉ đọc tài liệu, không chạy thử hai bên. Theo bản so sánh, Orca là desktop workspace xoay quanh git worktree, chạy agent CLI thật trong terminal. T3 Code là server xoay quanh conversation thread, điều khiển agent qua adapter với thin client. Khuyến nghị trong đó là giữ Orca và thử T3 khi cần agent phía server được điều khiển từ điện thoại hoặc browser. Cuối cùng, cả hai thành service, và Orca là app mình dùng nhiều nhất.

**Tailscale và cloudflared** được ghi thành bộ truy cập liên thiết bị của mình ngày 28/10/2026. Tunnel + Access phục vụ remote login và web UI, còn Tailscale lo phần còn lại giữa thiết bị của mình. Mình chọn cách này vì nó đơn giản hơn WARP-to-WARP. Theo research ngày 28/10/2026, remote login của GNOME Remote Desktop dùng được ở màn hình đăng nhập, còn desktop sharing chỉ có sau login. Ghi chú chưa có kết quả kiểm tra.

**Gitea cùng gitea-mirror** trên DeskMini là chỗ mình dùng để backup GitHub. Chúng chạy từ repo composes. Chuyện crawler mình đã kể trong [bài ngày 29/10/2026]({{< ref "/post/2026/10/29" >}}).

Phần mirror cũng có những vướng mắc riêng mà mình đã sửa. Timeout mặc định của Gitea từng cắt giữa lúc clone nhiều GB, còn Bun fetch ngắt connection idle năm phút, để lại repo làm dở. Mình sửa bằng cách tăng timeout. Health check gọi GitHub API không token quá thường xuyên chạm anonymous rate limit, nên mình giảm tần suất. Mình không ghi lại lý do chuyển backup về nhà, nên không gán nó cho sự cố. Mình thay CLI tea bằng gt vì tea đã archive upstream và gt lên 1.0.0.

## Bật máy từ xa: từ RTC đến ổ cắm thông minh

Ban đầu, mình không tính chuyện bật máy từ xa. Ngày 19/10/2026, mình gạt remote power-on khỏi phạm vi. ESP32 nhận lệnh Telegram để đánh thức PC là một gợi ý trong research, nhưng mình chưa làm.

Sau đó, mình dùng lịch tự bật cho DeskMini. Từ 28/10/2026, mình dùng RTC wake với rtcwake qua systemd. Ghi chú nói rõ giới hạn của cách này: mất điện hoặc tắt cứng sẽ bỏ qua bước arm.

Tới ngày 03/11/2026, mình chuyển hướng sang smart plug dựa vào BIOS bật máy sau khi có điện trở lại. RTC wake phía OS được gỡ. Mình không ghi lại lý do bỏ RTC. Hướng dẫn ghi thao tác như sau:

1. Shutdown từ OS trước, không cắt điện khi PC đang chạy.
2. Giữ plug tắt khoảng 30 giây rồi mới bật lại.

**Đây vẫn là việc dở, chưa được xác minh đầu cuối.** Cách này chỉ chạy khi BIOS được đặt bật máy sau khi có điện trở lại, mà phần đổi BIOS (tắt RTC alarm, đặt restore on AC loss thành power on) cùng bài test trọn vòng plug và mất điện đều còn mở. Mình vẫn chưa kiểm chứng bật máy từ xa thành công.

## Coolify và hai máy chủ Always Free

Phía cloud, mình dùng Coolify quản lý hai máy chủ OCI Always Free chạy ARM và Ubuntu 24.04 Minimal. Stack còn có Traefik v3 và Let's Encrypt. Mình chọn free tier miễn phí lâu dài. Mình chọn Coolify thay vì Dokploy “vì nó ổn định hơn”. Mình nói thật thì đó chỉ là cảm nhận, không có incident hay bài test nào đứng sau. Trong các file compose, mình vẫn để sẵn phần cho Dokploy.

Mình giữ phần triển khai chung trong repo composes public, với license Apache 2.0. Mỗi service có một thư mục chứa compose.yml, README.md và file env mẫu. Mỗi service cũng có một Coolify app với webhook watch riêng, nên chúng không redeploy chéo. Comment nói cấu hình làm gì, còn README giữ phần vì sao. Tool mình viết giữ compose ở repo riêng. Archive ghi cái gì và lúc nào, nhưng không ghi vì sao.

## Giữ mọi thứ nhất quán giữa các máy

Thứ giữ cho mình và cho agent khỏi lạc giữa chừng ấy máy là một workspace repo, checkout trên nhiều máy. Repo bắt đầu từ 25/07/2026, ban đầu chỉ để chứa mấy skill audit GitHub rồi lớn dần. Mình tách ghi chú theo máy từ 28/10/2026 để agent đọc đúng ngữ cảnh. Claude Code và Codex dùng chung bộ rules. Mình dùng Claude Code là chính, Codex cũng được. AgentKit CLI cài kit của mình vào thư mục home của từng agent.

Mình cũng có quy tắc cho từng loại ngữ cảnh, ghi từ 07/10/2026. Rules load mỗi session, còn skills load theo task. Memory là index luôn load, rồi agent đọc file khi liên quan. Hooks chặn lỗi tốn kém, còn ghi chú và kế hoạch giữ việc cần làm. Git history và docs giữ chuyện đã xảy ra. Chỉ rules được bảo đảm load, nên agent có thể bỏ qua chỉ dẫn hành vi trong memory. Memory được git-track.

Dotfiles của mình **chưa apply lên máy nào**. Ngày 29/10/2026, mình chọn chezmoi, lựa chọn duy nhất trong nhóm so sánh có binary đơn hỗ trợ native Windows. Nó có template theo máy và hỏi một lần. Nó cũng có sops lúc apply và dry run. dotter đứng sau trong so sánh này. Ansible cần WSL để điều khiển từ Windows, và config của nó nhiều hơn plain files khi dùng trên nhiều máy.

Plan toolchain và shell của mình cũng tiếp tục đổi. Ngày 30/10/2026, mình thay mise trong plan bằng manager từng hệ: rustup, uv, fnm, SDKMAN hoặc winget Temurin, và Go chính thức với `GOTOOLCHAIN=auto`. Mình không ghi lỗi mise. Shell dự kiến là zsh, zimfw và Starship thay cho oh-my-zsh và powerlevel10k. zimfw phổ biến nhất trong nhóm ổn định và nhanh nhất trong test. Completion có sẵn phủ gần hết nhu cầu của mình, còn README powerlevel10k nói mức hỗ trợ rất hạn chế. Đây vẫn là plan, và oh-my-zsh còn chạy trên server.

## Việc còn dở và bài học

Tính tới 04/11/2026, mình còn:

- Đổi BIOS DeskMini và test plug-cycle, mất điện.
- Apply dotfiles lên từng máy.

Nhìn lại các lần thay đổi, mình rút ra mấy điều:

- **Ghi cả vì sao, đừng chỉ ghi đã làm gì.** Git history và ghi chú giúp AI dựng lại các lần thay đổi, nhưng mình vẫn phải bổ sung lý do để câu chuyện đầy đủ hơn. Ghi lý do ngay lúc quyết định sẽ giúp lần đọc lại sau đỡ phải nhớ lại; một vài quyết định trong bài vẫn còn thiếu phần đó.
- **Desktop chỉ qua browser trên GNOME Wayland khó hơn vẻ ngoài.** RDP là đường còn lại, cần Graphics Pipeline, còn hướng VNC cũ không dùng được.
- **Session nên sống được qua một lần đóng tab.** Khi tool buộc session vào browser connection, một lần rớt có thể mất công việc đang chạy.
- **Giữ toolchain trong home, ngoài image.** Redeploy không nên âm thầm nâng tool mình đang dùng.
- **Cloudflare Tunnel và Access kết hợp với Tailscale cho truy cập từ xa.** Tailscale lo phần kết nối giữa thiết bị của mình.

Setup của mình sẽ còn đổi. Archive trong composes là nơi những thứ đã khảo sát hoặc dùng thử rồi gỡ tiếp theo sẽ nằm.
