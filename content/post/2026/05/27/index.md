---
title: "Newsletter #105"
date: 2026-05-27
tags: ["AI-Assisted", "Newsletter", "AI Agents", "AI Coding", "Software Architecture", "Programming Languages", "Systems Programming"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #105.*

## [Virtual Memory: A Deep Dive into Page Tables, TLBs, and Linux Internals](https://blog.codingconfessions.com/p/virtual-memory)

Abhinav Upadhyay (blog Confessions of a Code Addict) viết một bài rất dài, khoảng 25.000 chữ, giải thích bộ nhớ ảo (virtual memory) trên Linux x86-64 từ nguyên lý đến chi tiết triển khai trong nhân (kernel). Bài được dựng thành cuộc đối thoại giữa một tiến trình tên "Alloca" và "Kernel": mỗi câu hỏi của Alloca mở ra một khái niệm mới, nên người đọc đi từ chỗ "vì sao cần bộ nhớ ảo" (cô lập tiến trình, bảo vệ bộ nhớ, cảm giác có bộ nhớ dồi dào) đến các cơ chế bên trong một cách tự nhiên. Mỗi tiến trình có nửa không gian người dùng 128 TiB trong không gian địa chỉ ảo 48-bit, chia thành các vùng text, data, BSS, heap, vùng ánh xạ và stack.

Phần trọng tâm là hành trình dịch địa chỉ: thanh ghi CR3 trỏ tới bảng phân trang (page table) bốn cấp PGD, PUD, PMD, PTE, mỗi cấp dùng 9 bit của địa chỉ, còn 12 bit cuối là vị trí trong trang 4 KB. Vì duyệt bốn cấp cho mỗi lần truy cập là quá đắt, bộ nhớ đệm TLB (Translation Lookaside Buffer) lưu lại kết quả dịch, và tỉ lệ TLB hit ảnh hưởng trực tiếp đến hiệu năng chương trình. Tác giả tiếp tục với demand paging (chỉ cấp khung vật lý khi truy cập lần đầu, phân biệt minor fault không cần I/O với major fault phải đọc đĩa), copy-on-write sau `fork()` (cha và con dùng chung khung chỉ-đọc, chỉ sao chép khi có thao tác ghi), `mmap()` ánh xạ file qua page cache để bỏ bước sao chép thừa của `read()`, và cách MMU thực thi quyền truy cập bằng các bit phân trang, trong đó có bit NX phục vụ nguyên tắc W^X.

## [Orchestrating AI Code Review at scale](https://blog.cloudflare.com/ai-code-review/)

Cloudflare chia sẻ cách họ đưa review mã nguồn bằng AI vào CI cho toàn bộ tổ chức kỹ thuật, dùng OpenCode để điều phối nhiều agent chuyên biệt thay vì để một mô hình lớn duy nhất xem xét mọi thứ. Mỗi merge request có thể được tối đa bảy agent đánh giá theo từng lĩnh vực như bảo mật, hiệu năng, chất lượng mã nguồn, tài liệu, quản lý phát hành và tuân thủ; một agent điều phối gộp kết quả, loại trùng lặp và ra quyết định cuối. Prompt của từng agent được thu hẹp phạm vi và nêu rõ "những gì KHÔNG nên cảnh báo" để giảm nhiễu. Kiến trúc plugin qua interface `ReviewPlugin` tách riêng hệ thống quản lý phiên bản, nhà cung cấp AI và tiêu chuẩn nội bộ, nhờ đó tránh bị phụ thuộc vào một nhà cung cấp.

Để cân bằng chi phí và chất lượng, hệ thống phân tầng mô hình: mô hình hàng đầu (Claude Opus 4.7, GPT-5.4) chỉ lo điều phối, mô hình tiêu chuẩn (Claude Sonnet 4.6, GPT-5.3) gánh phần review chính, còn mô hình nhẹ xử lý các tác vụ nặng về văn bản như tài liệu. Merge request được phân loại rủi ro thành trivial, lite hoặc full, nên thay đổi nhỏ không phải chạy đủ bảy agent, còn file nhạy cảm về bảo mật luôn được review đầy đủ. Circuit breaker, giới hạn thời gian và control plane chạy trên Cloudflare Workers giúp hệ thống chịu lỗi tốt. Sau 30 ngày đầu, hệ thống đã chạy 131.246 lượt review với chi phí trung bình $1,19 mỗi lượt và tỉ lệ cache hit 85,7%.

## [The 8 Levels of Agentic Engineering](https://www.bassimeledath.com/blog/levels-of-agentic-engineering)

Bassim Eledath đề xuất một khung tám cấp độ mô tả cách các đội phát triển dần tận dụng AI hiệu quả hơn trong lập trình, xuất phát từ nhận định rằng "khả năng lập trình của AI đang vượt qua khả năng chúng ta tận dụng nó". Cấp 1 và 2 là autocomplete và các IDE tập trung vào AI như Cursor; cấp 3 là context engineering, tối ưu từng token thông tin đưa vào mô hình; cấp 4 là compounding engineering với vòng lặp lập kế hoạch, ủy thác, đánh giá và ghi lại bài học để mỗi phiên sau tốt hơn phiên trước; cấp 5 dùng MCP và skill để kết nối database, API, CI; cấp 6 là harness engineering, dựng môi trường có vòng phản hồi tự động để agent tự sửa lỗi; cấp 7 là background agent chạy bất đồng bộ; và cấp 8 là các đội agent tự trị phối hợp trực tiếp mà không cần điều phối trung tâm, một hướng còn non trẻ và nhiều thách thức.

Tác giả nhấn mạnh vài bài học xuyên suốt. Hiệu ứng "multiplayer" khiến năng suất của một người phụ thuộc nhiều vào cấp độ của đồng đội: người ở cấp 7 vẫn bị chặn nếu đồng nghiệp review PR thủ công ở cấp 2. Đặt ràng buộc (constraints) cho agent hiệu quả hơn đưa danh sách chỉ dẫn (instructions), vì agent dễ bám cứng vào từng bước và bỏ qua những yêu cầu không được nói ra. Cuối cùng, dùng nhiều mô hình cho các vai trò khác nhau cho kết quả tổng thể tốt hơn, và mô hình triển khai không nên tự review sản phẩm của chính mình để tránh thiên kiến.

## [Hexagonal Architecture is Not a Layered Architecture: Topology, Safety, and When to Walk Away](https://dev.to/bing_yu/hexagonal-architecture-is-not-a-layered-architecture-topology-safety-and-when-to-walk-away-4dln)

Bài viết chỉ ra rằng khác biệt cốt lõi giữa kiến trúc hexagonal và kiến trúc phân tầng (layered) nằm ở hướng phụ thuộc chứ không phải độ phức tạp. Kiến trúc phân tầng cho phụ thuộc chảy theo chiều dọc qua chuỗi controller, service, repository; còn trong hexagonal, phụ thuộc hướng tâm vào trong: adapter phụ thuộc port, port thuộc về domain, và logic nghiệp vụ hoàn toàn không biết ai triển khai cổng ra. Tác giả nhắc lại rằng mô hình gốc của Alistair Cockburn (2005) chỉ có đúng hai port là vào và ra; nhiều cách triển khai hiện đại chịu ảnh hưởng của Clean Architecture nên thêm các vòng trong, và mỗi vòng lại tăng thêm chi phí ánh xạ dữ liệu vốn không có trong thiết kế ban đầu.

Quyền sở hữu port cũng quan trọng: Port In thuộc tầng ứng dụng, Port Out thuộc tầng domain, và việc nắm rõ điều này giúp phân biệt một thay đổi là dịch chuyển yêu cầu nghiệp vụ hay chỉ là hoán đổi cách triển khai. Adapter lo dịch giao thức và kiểm tra định dạng như cú pháp JSON hay kiểu trường, còn domain lo kiểm tra ngữ nghĩa như ràng buộc nghiệp vụ; nếu quy tắc vẫn đúng sau khi thay công nghệ bên dưới thì nó thuộc về domain. Tác giả cũng thẳng thắn rằng hexagonal không tự giải quyết cô lập triển khai, kiểm tra đầu vào hay tăng cường bảo mật, và với hệ thống chỉ có 3 controller, 5 service, 2 bảng thì sự gián tiếp của nó là chi phí cụ thể đổi lấy lợi ích trừu tượng; lợi ích chỉ tăng khi độ phức tạp tăng.

## [Spec-Driven Development: How AI Coding Moves Beyond Vibe Coding](https://www.vitaliihonchar.com/insights/spec-driven-development)

Vitalii Honchar giới thiệu spec-driven development như bước tiếp theo sau "vibe coding": thay vì liên tục điều hướng AI qua từng thay đổi nhỏ, lập trình viên viết đặc tả kỹ thuật chi tiết ngay từ đầu rồi để AI dựa vào đó tự triển khai. Quy trình gồm bốn giai đoạn nối tiếp: cùng AI viết đặc tả yêu cầu bằng Markdown, để AI sinh kế hoạch triển khai từ đặc tả, chia kế hoạch thành các tác vụ nhỏ dễ quản lý, rồi để AI thực thi toàn bộ với rất ít can thiệp. Tác giả dùng GitHub Spec Kit để khởi tạo dự án theo cách làm này.

So với vibe coding, cách tiếp cận này giúp AI bám sát yêu cầu đã định nghĩa, tài liệu có sẵn ngay từ ngày đầu, và lập trình viên có thể làm việc khác trong lúc AI triển khai. Ví dụ thực tế là AgentD, một dịch vụ lập lịch và chạy AI agent cục bộ, được tác giả hoàn thành trong khoảng năm giờ mà không tự viết mã, trong khi làm thủ công sẽ mất hàng tuần. Theo tác giả, kỹ sư phần mềm nên chuyển trọng tâm sang tư duy kiến trúc, định nghĩa yêu cầu và kiểm định chất lượng thay vì cạnh tranh tốc độ viết mã với AI.

## [Go vs Java: The Minimalist vs The Enterprise Veteran](https://dev.to/adamthedeveloper/go-vs-java-the-minimalist-vs-the-enterprise-veteran-1gg3)

Bài viết so sánh hai ngôn ngữ có triết lý đối lập: Go theo chủ nghĩa tối giản triệt để (không class, không kế thừa, mãi đến 2022 mới có generics), còn Java cung cấp bộ công cụ phong phú với generics, kế thừa, interface và annotation. Theo tác giả, sự tối giản của Go giúp thành viên mới đọc hiểu mã nguồn ngay từ ngày đầu. Về hiệu năng, Go biên dịch thành binary gốc, khởi động tính bằng mili giây nên rất hợp với workload chạy trong container; Java chạy trên JVM, khởi động chậm hơn nhưng được tối ưu dần nhờ JIT khi dịch vụ chạy lâu.

Khoảng cách về lập trình đồng thời (concurrency) đã thu hẹp đáng kể: goroutine và channel của Go vốn nhẹ và gọn gàng, nhưng Virtual Threads trong Java 21 nay cũng mang lại lập lịch M:N tương đương mà vẫn dùng API luồng quen thuộc. Về hệ sinh thái, Java có hàng triệu thư viện trưởng thành với Spring giữ vị trí thống trị, còn Go ưu tiên chất lượng hơn số lượng với thư viện chuẩn đủ dùng cho phần lớn tác vụ. Go phù hợp cho hạ tầng, CLI, microservice và ứng dụng cloud-native; Java phù hợp cho hệ thống doanh nghiệp phức tạp. Kết luận của tác giả là không ngôn ngữ nào vượt trội tuyệt đối, lựa chọn phụ thuộc vào yêu cầu dự án và năng lực đội ngũ.

## [The ultimate guide to /goal](https://x.com/Saboo_Shubham_/status/2054988166541770782)

Shubham Saboo cho rằng `/goal` không chỉ là một tính năng mà đang trở thành một "primitive" (khối nền tảng) của coding agent, giống như HTTP hay JSON. Với prompt thông thường, bạn lái từng lượt: đọc phản hồi, đánh giá rồi đẩy agent sang bước tiếp theo. `/goal` đảo ngược điều đó: bạn mô tả trạng thái "hoàn thành" trông như thế nào, gửi một lần, và agent tự làm cho đến khi đạt được, chẳng hạn "xây ứng dụng theo SPEC.md, hoàn thành nghĩa là test pass, build pass, README chính xác, git status sạch". Tức là chuyển từ ra lệnh từng bước sang giao việc có mục tiêu rõ ràng. Điều đáng chú ý là ba nhóm khác nhau, gồm OpenAI Codex CLI, Claude Code và orchestrator Hermes Agent, đều hội tụ về cùng định dạng lệnh, nhờ đó có thể kết hợp chúng với nhau.

Tác giả mô tả ba vai trò không đổi dù công cụ thay đổi: orchestrator điều phối, chọn worker, quản lý bảng Kanban và xác minh cuối cùng (Hermes); builder nhận đặc tả và sinh mã (thế mạnh của Codex); và reviewer tìm lỗi trong những đoạn mã trông có vẻ đúng (thế mạnh của Claude Code). Quy tắc cốt lõi là xác minh độc lập: Hermes không tin báo cáo tự thân của Codex mà tự chạy `npm test`, `npm run build` để kiểm chứng, và chính bước này biến `/goal` từ một lời hứa thành một hợp đồng. Có thể chạy song song nhiều goal, nhưng mỗi file chỉ nên có một agent ghi để tránh xung đột.

## [The AI-Native Developer](https://newsletter.getdx.com/p/the-ai-native-developer)

Brian Houck trình bày nghiên cứu về cách AI định hình lại vai trò lập trình viên, dựa trên khảo sát hơn 1.300 lập trình viên và phỏng vấn 22 người thực hành. Công việc được chia thành ba nhóm: các tác vụ cốt lõi như viết mã, gỡ lỗi, kiểm thử được đánh giá cao ở mọi khía cạnh và là cơ hội lớn nhất cho AI; lập trình viên mong AI hỗ trợ sâu hơn ở gỡ lỗi xuyên nhiều thành phần và cấp phát môi trường, nhưng công cụ hiện tại chưa đáp ứng được; còn công việc mang tính quan hệ như giao tiếp với các bên liên quan thuộc vùng "ưu tiên thấp", nơi lập trình viên muốn giữ tiếng nói và trách nhiệm cuối cùng.

Nghiên cứu xác định bốn giai đoạn thành thạo AI: người hoài nghi (Skeptic) chỉ áp dụng khi áp lực cạnh tranh buộc phải làm; người khám phá (Explorer) tự tin dần qua những thắng lợi nhỏ; người cộng tác (Collaborator) đưa AI vào sớm hơn trong quy trình; và người chiến lược (Strategist) điều phối nhiều agent song song, chuyển từ người sản xuất mã thành "kiến trúc sư của ý định". Bên cạnh đó còn ba căng thẳng chưa có lời giải: nghịch lý học tập (đang giỏi lên về kỹ thuật hay chỉ giỏi viết prompt), nguy cơ mai một kỹ năng ở lập trình viên junior, và khoảng trống trách nhiệm khi chuẩn kiểm chứng không theo kịp tốc độ. Tác giả phác họa ba tương lai khả dĩ: giữ tay nghề ở tốc độ AI, tập trung vào điều phối và phán đoán, hoặc trở thành "Clerical Coder" chỉ đóng dấu phê duyệt mã mà không thực sự hiểu.

---

*Bài viết đã được viết lại bởi Claude Code với Opus 5.5 vào ngày 27/09/2026.*
