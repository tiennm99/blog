---
title: "Newsletter #32"
date: 2025-07-21
tags: ["AI-Assisted", "Technology", "Software Development", "Career Growth", "AI", "Hiring", "Engineering", "DevOps"]
categories: ["Newsletter"]
draft: false
---

*Đã lâu rồi mình không viết bài. Và thú thật thì những newsletter dạo trước hơi kiểu "chạy KPI", ~~mình cứ cố cho rất nhiều link vào và để AI Agent làm nốt phần còn lại~~. Lần này mình sẽ chọn lọc bài kĩ hơn, ~~còn viết thì vẫn để AI thôi, vì mình lười hehe =)))~~. Mong các bạn sẽ thích. Chào mừng bạn đến với Newsletter #31.*

## [Claude Code: Best Practices for Agentic Coding](https://code.claude.com/docs/en/best-practices)

Anthropic vừa ra mắt hướng dẫn thực hành tốt nhất cho Claude Code - một công cụ command-line mạnh mẽ cho lập trình với sự hỗ trợ của AI. Đây là một dự án nghiên cứu linh hoạt và có thể tùy chỉnh cao, giúp các kỹ sư tích hợp AI vào quy trình phát triển phần mềm một cách hiệu quả.

**Điểm chính:**
- Tạo file `CLAUDE.md` để hướng dẫn Claude về commands bash, style code, testing và setup môi trường phát triển
- Sử dụng Model Context Protocol (MCP) servers và custom slash commands để mở rộng khả năng của Claude
- Áp dụng quy trình "Explore, Plan, Code, Commit": đọc hiểu code → lập kế hoạch chi tiết → implement → commit và tạo PR
- Hỗ trợ Test-Driven Development: viết test trước → confirm test fail → implement code → iterate
- Visual Design Iteration: chụp screenshot → cung cấp mockup → implement và iterate design
- Claude Code hỗ trợ nhiều chế độ từ coding cẩn thận từng bước đến "Safe YOLO mode" cho phát triển nhanh
- Tối ưu hóa hiệu suất bằng cách đưa ra hướng dẫn cụ thể, sử dụng hình ảnh tham khảo và điều chỉnh sớm khi cần

---

## [OpenAI, Windsurf và tương lai của AI Workspaces](https://www.subtle.so/openai-windsurf-and-the-future-of-ai-workspaces.html)

Bài viết từ Subtle.so phân tích tin đồn về việc OpenAI cân nhắc mua lại Windsurf với giá 3 tỷ USD, và ý nghĩa của thương vụ này đối với tương lai của các môi trường phát triển AI. Đây không chỉ là một thương vụ mua bán đơn thuần mà còn phản ánh xu hướng chuyển đổi từ các công cụ lập trình chuyên biệt sang nền tảng workspace thông minh toàn diện.

**Điểm chính:**
- OpenAI đang xem xét mua lại Windsurf với mức giá 3 tỷ USD, thể hiện tầm quan trọng chiến lược của các môi trường phát triển AI
- Tương lai của productivity tools sẽ là AI assistants có khả năng "tác động trực tiếp lên files và folders" với tính năng theo dõi phiên bản toàn diện
- Các công cụ như Windsurf đang mở rộng beyond coding: tích hợp AI agents, quản lý workspace đa chức năng, query phức tạp trên nhiều nguồn dữ liệu
- Cạnh tranh gay gắt với Microsoft GitHub Copilot ra mắt chế độ agent mode, OpenAI đầu tư vào các startup cạnh tranh
- Xu hướng tương tự Slack transforming IRC: biến công cụ kỹ thuật chuyên biệt thành nền tảng productivity mainstream
- Giá trị chiến lược nằm ở việc thu thập dữ liệu tương tác người dùng để cải thiện AI models
- AI development environments đang phát triển thành intelligent workspaces có thể cách mạng hóa cách chúng ta tương tác với thông tin số

---

## [Vibe Coding is Not an Excuse for Low-Quality Work](https://addyo.substack.com/p/vibe-coding-is-not-an-excuse-for)

Bài viết từ Substack của tác giả Addyo thảo luận về xu hướng "vibe coding" - việc sử dụng AI để code nhanh và theo cảm tính. Tác giả lập luận rằng mặc dù AI hỗ trợ lập trình mang lại nhiều lợi ích, nhưng điều này không có nghĩa là chúng ta có thể bỏ qua các nguyên tắc kỹ thuật phần mềm cơ bản và chất lượng code.

**Điểm chính:**
- AI coding giúp giảm rào cản cho lập trình viên mới, cho phép prototyping nhanh và giúp non-programmers tạo ra solutions tùy chỉnh
- Rủi ro của việc sử dụng AI code không kiểm soát: error handling kém, performance yếu, lỗ hổng bảo mật, cấu trúc logic dễ vỡ
- Cần đối xử với AI-generated code như công việc của một junior developer - luôn phải review và test kỹ lưỡng
- Duy trì sự giám sát của con người trong thiết kế và implementation, thiết lập coding standards rõ ràng
- Viết comprehensive tests và document AI-generated code cẩn thận
- Nguyên tắc cốt lõi: "Vibe coding không phải là lý do để làm việc chất lượng thấp"
- Sử dụng AI như một công cụ tăng tốc, không phải thay thế cho chuyên môn kỹ thuật
- Giữ thái độ phê phán và tham gia tích cực trong quá trình coding, hiểu rằng AI chỉ là công cụ chứ không phải giải pháp hoàn hảo

---

## [Event-Hidden Architecture: Tương lai của Web Development](https://skiplabs.io/blog/event-hidden-arch)

Bài viết từ Skip Labs giới thiệu khái niệm "Event-Hidden Architecture" - một paradigm mới trong phát triển phần mềm nhằm vượt qua các thách thức của kiến trúc event-driven truyền thống. Thay vì buộc developers phải quản lý events phức tạp, kiến trúc này ẩn đi complexity và cung cấp trải nghiệm phát triển đơn giản hơn.

**Điểm chính:**
- Các vấn đề của event-driven systems truyền thống: multiple queues dễ fail, race conditions, buộc developers suy nghĩ asynchronously, troubleshooting khó khăn
- Ba công nghệ chính tạo nên Event-Hidden Architecture: Frontend frameworks (React, Redux), Durable Execution Systems (Temporal, Restate), Reactive Computation Frameworks (Skip)
- Nguyên tắc thiết kế chung: declarative developer experience, event-driven "under the covers", asynchronous with synchronous-feeling interactions
- Quản lý state như first-class concern, hỗ trợ modular và incremental adoption
- Lợi ích chính: simplified engineering, improved transparency, better state handling, enhanced replayability, reduced infrastructure complexity
- Dự đoán của tác giả: "Event-hidden sẽ trở thành kiến trúc web app mặc định trong 10 năm tới"
- Kiến trúc này đại diện cho một bước tiến quan trọng trong thiết kế distributed systems, đơn giản hóa phát triển mà vẫn duy trì scalability và performance
- Cho phép developers tập trung vào business logic thay vì phải lo về infrastructure complexity

---

## ~~[Lessons from Distributed Systems](https://www.16elt.com/2025/04/19/lessons-from-distributed-systems/)~~

~~Bài viết từ 16elt.com chia sẻ những bài học thực tế từ việc xây dựng và vận hành distributed systems ở quy mô lớn. Tác giả tổng hợp những kinh nghiệm xương máu về các vấn đề thường gặp và cách giải quyết khi làm việc với hệ thống phân tán.~~

~~**Điểm chính:**~~
~~- Tách riêng cache clusters: tránh chia sẻ một cache cluster cho nhiều services vì workload nặng từ Service A có thể evict dữ liệu quan trọng của Service B, gây ra performance issues khó chẩn đoán~~
~~- Sử dụng message queues: queues giúp quản lý traffic spikes và service load, cung cấp buffering và resilience giữa các services như "một người trưởng thành có trách nhiệm" ngăn chặn service overload~~
~~- Đo lường end-to-end latency: không chỉ xem xét service response times mà còn cả "dequeue latency" - thời gian messages chờ trong queue trước khi được xử lý~~
~~- Design for failure: expect và plan cho network và service failures tiềm tàng, implement retry policies, circuit breakers, dead-letter queues cho failed messages~~
~~- Đảm bảo idempotency: assume message duplicates sẽ xảy ra, thiết kế hệ thống handle repeated events một cách graceful vì message queues guarantee 'at least once' delivery~~
~~- Distributed systems đòi hỏi proactive design, robust monitoring và resilient architecture để quản lý complexity và potential failure points~~
~~- Monitoring và observability là chìa khóa để hiểu được hành vi thực của hệ thống trong production environment~~

---

## ~~[Better Error Handling: Từ Try/Catch đến Modern Approaches](https://meowbark.dev/Better-error-handling)~~

~~Bài viết từ meowbark.dev khám phá các phương pháp xử lý lỗi hiện đại trong software development, từ traditional try/catch cho đến các kỹ thuật tiên tiến như Go-style error handling và monadic Result types. Tác giả phân tích ưu nhược điểm của từng approach và đưa ra khuyến nghị về cách chọn lựa phương pháp phù hợp.~~

~~**Điểm chính:**~~
~~- Ba approaches chính cho error handling: traditional try/catch, Go-style return tuples, và monadic Result types~~
~~- Challenges của error handling truyền thống: thiếu type safety, unpredictable error control flow, limited type system integration~~
~~- Go-style approach: return errors như part của tuple, explicitly handle failure scenarios, cung cấp clear error context~~
~~- Monadic Result approach: treat errors as values, sử dụng container types như `Result<T,E>`, enable functional-style error chaining~~
~~- Best practices quan trọng: phân biệt recoverable và unrecoverable errors, wrap external library errors sớm, sử dụng type-safe error handling mechanisms~~
~~- Cân nhắc performance và developer experience khi chọn strategy~~
~~- Recommended techniques: sử dụng libraries như `neverthrow` cho robust error management, implement error mapping và transformation~~
~~- Tạo centralized error handling layers để quản lý lỗi một cách systematic~~
~~- Chọn error handling strategy cân bằng giữa type safety, readability, và team expertise~~
~~- Duy trì clear error communication và recovery mechanisms trong suốt application~~

---

*Bài viết đã được review và cập nhật bởi Claude Code với Opus 4.7 (1M context).*
