---
title: "Newsletter #32"
date: 2025-07-21
tags: ["AI-Assisted", "Technology", "Software Development", "Career Growth", "AI", "Hiring", "Engineering", "DevOps"]
categories: ["Newsletter"]
draft: false
---

*Đã lâu rồi mình không viết bài. Và thú thật thì những newsletter dạo trước hơi kiểu "chạy KPI", ~~mình cứ cố cho rất nhiều link vào và để AI Agent làm nốt phần còn lại~~. Lần này mình sẽ chọn lọc bài kĩ hơn, ~~còn viết thì vẫn để AI thôi, vì mình lười hehe =)))~~. Mong các bạn sẽ thích. Chào mừng bạn đến với Newsletter #31.*

## [Claude Code: Best Practices for Agentic Coding](https://code.claude.com/docs/en/best-practices)

Đây là tài liệu hướng dẫn chính thức của Anthropic, tổng hợp những cách làm việc hiệu quả với Claude Code - môi trường lập trình dạng agent có thể tự đọc tệp, chạy lệnh, sửa mã nguồn và xử lý vấn đề trong khi bạn quan sát hoặc điều hướng. Hầu hết lời khuyên đều xuất phát từ một giới hạn: cửa sổ ngữ cảnh (context window) đầy lên rất nhanh và chất lượng câu trả lời giảm dần khi nó đầy. Vì vậy, việc quan trọng nhất là cho Claude một cách tự kiểm chứng kết quả, chẳng hạn bộ kiểm thử, lệnh build hay ảnh chụp màn hình để so sánh, để nó tự lặp lại cho tới khi đạt thay vì bạn phải soát từng lỗi. Với tác vụ phức tạp, nên tách thành bốn bước: khám phá, lập kế hoạch (dùng plan mode), triển khai rồi commit; còn việc nhỏ như sửa lỗi chính tả thì cứ yêu cầu làm luôn.

Tài liệu cũng khuyên viết yêu cầu thật cụ thể (chỉ rõ tệp, tình huống, mẫu có sẵn trong dự án) và cấu hình môi trường hợp lý: tệp `CLAUDE.md` ngắn gọn chứa lệnh, quy ước và lưu ý riêng của dự án; danh sách quyền được phép; công cụ CLI như `gh`; MCP server; hook cho những việc bắt buộc; skill và subagent cho kiến thức chuyên biệt. Trong phiên làm việc, hãy sửa hướng sớm, dùng `/clear` giữa các tác vụ không liên quan, giao việc tìm hiểu cho subagent để giữ ngữ cảnh sạch. Khi đã thành thạo, có thể mở rộng bằng chế độ không tương tác `claude -p`, chạy nhiều phiên song song và thêm bước review độc lập trước khi coi là xong.

---

## [OpenAI, Windsurf và tương lai của AI Workspaces](https://www.subtle.so/openai-windsurf-and-the-future-of-ai-workspaces.html)

Bài viết trên Subtle phân tích tin OpenAI muốn mua Windsurf với giá khoảng 3 tỷ USD, sau khi từng nhắm tới Cursor. Về mặt kỹ thuật, tính năng cốt lõi của Windsurf (một bản fork của VS Code kèm AI agent và gợi ý mã nguồn) không quá khó xây dựng, nên giá trị thật nằm ở chỗ khác: những công cụ này có thể trở thành không gian làm việc AI cho cả những việc ngoài lập trình. Chúng cho AI quyền thao tác trực tiếp trên tệp và thư mục, hỗ trợ viết lách, nghiên cứu, quản lý nội dung, lại có sẵn Git để theo dõi phiên bản - điều mà các công cụ năng suất truyền thống chưa làm được. Ví dụ, The Pragmatic Engineer đã nối Windsurf với cơ sở dữ liệu PostgreSQL để hỏi về số liệu kinh doanh bằng ngôn ngữ tự nhiên. Tác giả so sánh xu hướng này với cách IRC từ một công cụ ngách trở thành Slack trị giá 27 tỷ USD.

Ngoài ra, dữ liệu tương tác từ hàng triệu lượt sử dụng Windsurf là nguồn tín hiệu huấn luyện quý giá, có thể giúp mô hình của OpenAI bắt kịp Anthropic trên các bài đánh giá về lập trình. Bức tranh cạnh tranh cũng khá rối: Microsoft sở hữu cả VS Code lẫn GitHub Copilot và đồng thời đầu tư vào OpenAI, trong khi quỹ đầu tư của OpenAI lại rót vốn vào Cursor. Điều đó cho thấy thị trường công cụ phát triển dùng AI đang hợp nhất rất nhanh và được kỳ vọng sinh lời lớn.

---

## [Vibe Coding is Not an Excuse for Low-Quality Work](https://addyo.substack.com/p/vibe-coding-is-not-an-excuse-for)

Addy Osmani lập luận rằng lập trình với AI theo cảm hứng ("vibe coding") là công cụ tăng tốc hữu ích, nhưng không phải lý do để bỏ qua sự chặt chẽ của kỹ thuật phần mềm. AI có thể sinh ra rất nhiều mã nguồn trong thời gian ngắn, song số lượng không đồng nghĩa với chất lượng: các dự án làm theo kiểu này thường thiếu xử lý lỗi, bỏ sót vấn đề bảo mật, khó bảo trì và dễ sụp như "nhà xếp bằng bài". Như tác giả viết, tốc độ chẳng có nghĩa gì nếu bánh xe rời ra giữa đường, vì nợ kỹ thuật sẽ tích tụ nhanh khi không ai giám sát.

Cách tiếp cận được đề xuất là coi AI như một lập trình viên junior làm việc cực nhanh: con người vẫn phải review mọi kết quả, tái cấu trúc khi cần, bổ sung xử lý trường hợp biên và viết kiểm thử đầy đủ. Tác giả đưa ra các nguyên tắc: luôn review mã nguồn do AI sinh ra, áp dụng chuẩn viết mã, dùng AI để tăng tốc chứ không để nó ra quyết định, ưu tiên kiểm thử, lặp và tinh chỉnh, nhận ra lúc nên tự viết tay, và ghi tài liệu cẩn thận. Vibe coding phát huy tốt khi làm nguyên mẫu nhanh, viết script dùng một lần, học công nghệ mới hay sinh mã khuôn mẫu, nhưng không phù hợp với hệ thống doanh nghiệp, phần mềm quan trọng hay dự án cần bảo trì lâu dài. Đó cũng là lý do kỹ sư có kinh nghiệm thường khai thác AI hiệu quả hơn, vì họ đủ hiểu biết để sửa và cải thiện gợi ý của nó.

---

## [Event-Hidden Architecture: Tương lai của Web Development](https://skiplabs.io/blog/event-hidden-arch)

Charles Zedlewski, cố vấn của SkipLabs, cho rằng kiến trúc hướng sự kiện (event-driven) - vốn được xem là lựa chọn bắt buộc cho ứng dụng phân tán trên cloud - đã lỗi thời, và đề xuất thay bằng kiến trúc "ẩn sự kiện" (event-hidden). Ứng dụng phân tán vẫn sẽ tồn tại, nhưng việc để lập trình viên tự quản lý sự kiện gây ra nhiều khó khăn: phải xử lý luồng bất đồng bộ phức tạp, duy trì hàng đợi và schema, và gỡ lỗi xuyên qua nhiều hệ thống. Theo tác giả, sự phức tạp này từng là cái giá cần thiết vào khoảng năm 2020, nhưng giờ không còn bắt buộc nữa.

Ba nhóm công nghệ giúp điều đó trở nên khả thi: ở frontend là React cùng các thư viện quản lý trạng thái; ở phía ghi dữ liệu của backend là các hệ thống thực thi bền vững (durable execution) như Temporal, Restate, DBOS, đảm bảo tính đúng đắn khi đi qua ranh giới giữa các service; ở phía đọc dữ liệu là các framework phản ứng như Skip để tổng hợp dữ liệu phân tán hiệu quả. Điểm chung của chúng là che đi chi tiết hạ tầng, xử lý phần bất đồng bộ một cách trong suốt và coi trạng thái là mối quan tâm hàng đầu. Nhờ vậy, lập trình viên viết mã nguồn đơn giản, dễ bảo trì hơn, đồng thời có thêm lợi ích như dễ quan sát, quản lý trạng thái tốt hơn và có thể phát lại hoạt động của ứng dụng. Tác giả dự đoán kiến trúc ẩn sự kiện sẽ trở thành kiến trúc mặc định cho ứng dụng web trong 10 năm tới.

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

*Bài viết đã được viết lại bởi Claude Code với Opus 5.5 vào ngày 27/09/2026.*
