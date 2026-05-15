---
title: "Newsletter #79"
date: 2026-02-02
tags: ["AI-Assisted"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #79.*

## [ASCII characters are not pixels: a deep dive into ASCII rendering](https://alexharri.com/blog/ascii-rendering)

Bài viết này trình bày cách tiếp cận mới mẻ để chuyển đổi hình ảnh sang ASCII art có độ nét cao. Thay vì xử lý ký tự ASCII như các điểm ảnh đơn lẻ, tác giả sử dụng khái niệm "shape vectors" (vector hình dạng) để tận dụng hình dạng thực tế của từng ký tự.

Cốt lõi của phương pháp là định lượng hóa hình dạng của mỗi ký tự ASCII bằng cách sử dụng các "sampling circles" đặt tại các vị trí khác nhau trong ô lưới. Mỗi ký tự được biểu diễn bằng một vector 6 chiều, ghi nhận mức độ chiếm đóng tại từng vùng. Khi chuyển đổi hình ảnh, hệ thống tính toán sampling vector cho mỗi ô và tìm ký tự có hình dạng tương đồng nhất thông qua nearest neighbor search.

Để tạo độ nét cao hơn nữa, tác giả áp dụng hai kỹ thuật tăng độ tương phản: global contrast enhancement và directional contrast enhancement. Kỹ thuật đầu tiên làm rõ ranh giới giữa các vùng có độ sáng khác nhau, trong khi kỹ thuật thứ hai xem xét thông tin từ các ô lân cận để loại bỏ hiệu ứng "staircasing" và tạo đường viền mượt mà.

Bài viết cũng đề cập đến các tối ưu hóa hiệu năng quan trọng như sử dụng k-d trees để tăng tốc độ tra cứu ký tự, caching với quantization để giảm tải tính toán, và chuyển xử lý sang GPU để đạt 60 FPS trên mobile. Đây là một bài viết kỹ thuật thú vị với nhiều ý tưởng có thể áp dụng cho các vấn đề khác về xử lý hình dạng đa chiều.

## [From Bare Metal to Containers: A Developer's Guide to Execution Environments](https://buildsoftwaresystems.com/post/guide-to-execution-environments)

Bài viết này cung cấp cái nhìn toàn diện về các loại môi trường thực thi (execution environments) mà nhà phát triển phần mềm thường gặp, từ physical machine cho đến containers và virtual environments. Mỗi loại môi trường được trình bày rõ ràng với cơ chế cách ly, ưu nhược điểm và trường hợp sử dụng phù hợp.

Năm loại môi trường chính được phân tích chi tiết: Physical Machine (bare metal) với hiệu năng tối đa nhưng chi phí cao, Virtual Machine sử dụng hypervisor để chia sẻ phần cứng, Container nhẹ-weight nhờ chia sẻ kernel, Process Sandbox tập trung vào bảo mật bằng cách giới hạn quyền của process, và Virtual Environment để cô lập dependencies ở cấp độ ngôn ngữ lập trình.

Điểm nhấn quan trọng là hiểu rõ ranh giới cách ly của từng loại môi trường. Virtual environments chỉ giải quyết xung đột dependencies nhưng không xử lý được vấn đề về kernel hay system libraries. Containers mạnh hơn nhưng vẫn chia sẻ kernel, trong khi VMs cung cấp cách ly hoàn toàn ở mức OS. Bài viết cũng đề cập đến xu hướng tương lai với Serverless, WebAssembly và các công cụ tích hợp như uv, Conda, Rustup/Cargo.

## [Run Your Project in a Dev Container, in Zed](https://zed.dev/blog/dev-containers)

Bài viết này giới thiệu tính năng Dev Containers mới trong trình soạn thảo Zed, bắt đầu từ phiên bản v0.218. Dev Containers là một tiêu chuẩn mở để thiết lập môi trường phát triển Dockerized, giúp mang lại trải nghiệm nhất quán cho mọi thành viên trong team ngay từ đầu.

Vấn đề phổ biến khi tham gia một dự án mới là mất nhiều thời gian để thiết lập môi trường: cài đặt đúng phiên bản build tool, thiết lập database, cấu hình environment variables, và nhiều thứ khác. Trước đây, kiến thức này thường được truyền đạt qua documentation hoặc phải pair với senior engineer. Dev Containers giải quyết vấn đề này bằng cách định nghĩa môi trường trong file `.devcontainer/devcontainer.json` với approach infrastructure-as-code.

Zed tích hợp với Dev Containers bằng cách sử dụng CLI `devcontainer` từ Microsoft. Khi phát hiện file `devcontainer.json`, Zed sẽ hiển thị toast notification để hỏi người dùng có muốn mở project trong Dev Container không. Kiến trúc của Zed hỗ trợ remote development thông qua hai instance: Zed Remote Server trên container và Zed local trên máy người dùng, giao tiếp qua standard IO. Tương tự như cách Zed làm việc với SSH, transport layer này hoạt động tốt với `docker exec`.

Bài viết cũng đề cập đến các kế hoạch tương lai như khả năng định nghĩa Dev Container spec trực tiếp trong Zed, hỗ trợ extensions trong `devcontainer.json`, và implement `forwardPorts` property để cải thiện remote-to-host communication.

## [I was a top 0.01% Cursor user. Here's why I switched to Claude Code 2.0](https://blog.silennai.com/claude-code)

Bài viết này là hướng dẫn toàn diện về Claude Code từ tác giả là top 0.01% người dùng Cursor, người đã sử dụng coding AI từ năm 2021. Tác giả chia sẻ lý do chuyển đổi từ Cursor sang Claude Code và các phương pháp tối ưu hóa để làm việc hiệu quả với AI coding.

Năm trụ cột của agentic coding được trình bày chi tiết: Context Management với tips về việc spawn subagents cho work song song, sử dụng `/compact` và `/transfer-context` để quản lý context limit; Planning với ba cách tiếp cận - plan mode dialogue, sprint-style todo list, và generate revert plan; Closing the Loop bằng cách tạo commands cho repeated prompts và cập nhật CLAUDE.md; Verifiability thông qua interface tests; và Debugging với quy trình systematic và "rule of three".

Bài viết cũng đề cập đến các kỹ thuật nâng cao như sử dụng 12 parallel terminals cùng lúc, Ralph cho larger projects, Hooks/Subagents/Skills/MCP, và Headless Mode. Tác giả chia sẻ hai custom commands quan trọng: `/setup-claude-code` (chạy một lần mỗi máy) và `/setup-repo` (chạy một lần mỗi project) để interview và thiết lập mọi thứ tự động. Các domain playbooks cho Frontend, Backend, AI research và Learning cũng được trình bày chi tiết với tips cụ thể cho từng trường hợp.

## [LLM predictions for 2026, shared with Oxide and Friends](https://simonwillison.net/2026/Jan/8/llm-predictions-for-2026/)

Bài viết này là tập hợp các dự đoán của Simon Willison về tương lai công nghệ trong 1, 3 và 6 năm, được chia sẻ trong podcast Oxide and Friends. Bryan Cantrill mở đầu episode bằng cách tuyên bố rằng ông chưa bao giờ cảm thấy bất ngờ như vậy về những gì sắp tới trong năm nay, và Simon chia sẻ cảm giác không chắc chắn đó.

Các dự đoán 1 năm bao gồm: LLMs viết code tốt sẽ trở nên không thể phủ nhận - quan điểm này đã đúng vào năm 2023 và phần lớn 2024, nhưng sẽ thay đổi hoàn toàn vào năm 2026; việc giải quyết sandboxing sẽ trở nên khả thi với containers và WebAssembly; một "Challenger disaster" cho bảo mật coding agents sẽ xảy ra khi nhiều người chạy agents với quyền root; và những chú chim Kākāpō ở New Zealand sẽ có mùa sinh sản tuyệt vời.

Dự đoán 3 năm: Nghịch lý Jevons cho coding agents sẽ được giải quyết theo hướng này hay hướng khác - hoặc kỹ năng software engineering bị mất giá, hoặc nhu cầu về software tăng gấp 10 lần khiến kỹ năng trở nên quý giá hơn; ai đó sẽ xây dựng một trình duyệt web mới chủ yếu dùng AI-assisted coding và điều đó thậm chí không gây ngạc nhiên. Dự đoán 6 năm: việc gõ code bằng tay sẽ đi theo hướng của punch cards, nhưng software engineering vẫn là một nghề nghiệp lớn - chỉ là engineers sẽ không còn dành nhiều giờ để gõ syntax nữa.

## [How we made Notion available offline](https://www.notion.com/blog/how-we-made-notion-available-offline)

Bài viết này trình bày cách Notion xây dựng tính năng Offline Mode - tính năng được người dùng yêu cầu nhất trong nhiều năm. Thách thức lớn đến từ kiến trúc block độc đáo của Notion, đòi hỏi giải quyết các vấn đề phức tạp về reference tracking, background syncing, và conflict resolution cho rich text.

Notion đã sử dụng SQLite để cache records local từ trước, nhưng cache này là best-effort không có bảo đảm. Offline Mode yêu cầu bảo đảm mạnh mẽ hơn: một page phải có thể sử dụng hoàn toàn khi không có kết nối mạng. Giải pháp là phát triển SQLite cache thành persistent storage layer theo dõi pages có sẵn offline, lưu trữ tất cả dữ liệu cần thiết để render page, và ghi nhận lý do tại sao mỗi page available offline.

Vấn đề phức tạp nảy sinh khi Notion giới thiệu automatic downloads và "offline inheritance" - pages trở thành available offline vì parent page của chúng. Một page có thể có nhiều lý do độc lập để được offline (toggled, auto-downloaded, inheritance), và chỉ nên bị loại bỏ khi lý do cuối cùng biến mất. Notion giải quyết bằng cách maintain một forest của offline page trees với hai bảng: `offline_page` (một row cho mỗi page/database offline) và `offline_action` (một row cho mỗi lý do một page được giữ offline).

Để giữ offline pages được cập nhật, Notion sử dụng push-based updates thay vì polling. Mỗi khi có batch updates được apply vào page, server phát message trên channel của page đó. Clients subscribe channels cho offline pages và fetch changes khi nhận message. Khi reconnect sau khi offline, client so sánh `lastDownloadedTimestamp` với `lastUpdatedTime` của server để chỉ fetch pages có version mới hơn. Forest offline cũng được prune theo thời gian để keep up với structural changes như pages moved, databases gain/lose rows.

## [How Browsers Work](https://howbrowserswork.com/)

Đây là hướng dẫn tương tác về cách trình duyệt hoạt động, được thiết kế cho engineers và những người tò mò sử dụng web mỗi ngày nhưng chưa từng xây dựng mental model về browser. Tác giả nhận thấy hầu hết guides hiện tại quá kỹ thuật, quá chi tiết hoặc quá nông, nên đã tiếp cận theo hướng khác với nhiều interactive examples nhỏ để giúp người đọc xây dựng intuition về cách browsers hoạt động.

Quy trình từ URL đến trang web được trình bày theo từng bước: Browsers làm việc với URLs - khi bạn gõ bất cứ text nào vào address bar, browser sẽ chuyển đổi nó thành URL hợp lệ (ví dụ "pizza" thành search URL, "example.com" thành "https://example.com"). Sau đó browser chuyển URL thành HTTP request bằng cách thêm headers như "Host: example.com" và "Accept: text/html". 

Tiếp theo là DNS resolution - browser không thể gửi request đến tên miền như example.com, máy tính chỉ giao tiếp với IP addresses nên browser phải hỏi DNS system để resolve domain name thành IP address. Sau đó browser thiết lập TCP connection qua three-step handshake (SYN, SYN-ACK, ACK) để đảm bảo cả hai sides đều sẵn sàng gửi và nhận data. Khi TCP connection được thiết lập, browser gửi HTTP request và nhận HTTP response. 

Response sau đó được parse để xây dựng DOM tree - parser chuyển tags như `<h1>` thành tokens và builds a DOM tree. DOM là in-memory model của document, là shared contract giữa HTML parser, CSS selector engine, và JavaScript runtime. Cuối cùng là rendering pipeline: Layout (reflow) để calculate sizes và positions, Paint để fill pixels, rồi Composite để stitch layers together trên GPU. Mỗi loại change triggers các stages khác nhau - changing colors thường chỉ repaint, trong khi changing sizes forces layout và paint để recompute.

**Đánh giá**: *Không biết vì sao nhưng mình cảm thấy bài viết này khá tốt^^ Chắc do hôm qua update lại file Agents.md, để cố gắng phát huy :)))*

---

*Bài viết đã được review và cập nhật bởi Claude Code với Opus 4.7 (1M context).*
