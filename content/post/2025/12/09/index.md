---
title: "Newsletter #66"
date: 2025-12-09
tags: ["AI-Assisted", "Technology", "Software Architecture", "Books", "Engineering", "Development"]
categories: ["Newsletter"]
---

*~~Dùng api free của iFlow cũng nhiều rồi, nên nay mình dùng thử cli của iFlow - [iFlow CLI](https://github.com/iflow-ai/iflow-cli) xem sao, model được dùng là GLM-4.6.~~ Mời bạn thưởng thức Newsletter #66.*

## [The Ultimate List of Best Software Architecture Books (2026)](https://www.workingsoftware.dev/the-ultimate-list-of-software-architecture-books/?&aid=recmw058VtqAJCyyK)

Software architecture là nền tảng cho sự phát triển thành công của các sản phẩm phần mềm. Một kiến trúc phần mềm được thiết kế tốt có thể tạo ra sự khác biệt lớn về chất lượng của hệ thống, giúp giảm thiểu rủi ro lỗi và dễ dàng thêm tính năng mới trong tương lai. Bài viết này giới thiệu danh sách các sách về kiến trúc phần mềm tốt nhất nên đọc trong năm 2026, cùng với những cuốn sách sắp được xuất bản.

**Điểm chính:**
- "Architecture for Flow" của Susanne Kaiser kết hợp Wardley Mapping, Domain-Driven Design và Team Topologies để tạo ra hệ thống thích ứng
- "Collaborative Software Design" hướng dẫn cách tham gia tất cả stakeholders vào quá trình thiết kế phần mềm
- "Facilitating Software Architecture" cung cấp phương pháp luận cho kiến trúc sư và developer hợp tác hiệu quả
- "Reviewing Software Systems" giới thiệu LASR - phương pháp đánh giá kiến trúc nhẹ nhàng
- Các cuốn kinh điển như "Fundamentals of Software Architecture" và "Designing Data-Intensive Applications" vẫn còn giá trị
- Nhiều cuốn sách mới sẽ ra mắt năm 2026 tập trung vào hiện đại hóa hệ thống legacy và mô hình C4

## [How I use AI (Oct 2025)](https://ben.stolovitz.com/posts/how_use_ai_oct_2025/?utm_source=tldrnewsletter)

Ben Stolovitz chia sẻ cách ông sử dụng AI trong công việc hàng ngày, đặc biệt là các LLMs. Ông chia sẻ kinh nghiệm thực tế về việc sử dụng AI trong coding, research, summarization, writing và art. Bài viết cung cấp một cái nhìn chân thực về điểm mạnh, điểm yếu của các công cụ AI hiện tại.

**Điểm chính:**
- AI autocomplete (Copilot) thay đổi hoàn toàn cách coding - hoàn thành code đã biết và giúp khám phá patterns, nhưng không tốt với thuật toán phức tạp
- Agent mode ngày càng hữu ích cho các thay đổi phức tạp nhưng vẫn cần giám sát con người
- AI rất giỏi trong việc tìm kiếm "pub facts" và giải thích các khái niệm phổ biến, nhưng không đáng tin cậy cho tìm kiếm sản phẩm hay literature search
- Summarization và transcription là điểm mạnh ấn tượng của AI - có thể tóm tắt hàng trăm trang trong vài phút
- Tác giả không dùng AI để viết từ đầu, nhưng sử dụng như một editor "đáng sợ" giúp cải thiện văn bản
- AI-generated art và music vẫn còn gây tranh cãi - dù có thể tạo ra nội dung thú vị nhưng thường thiếu sự kết nối con người

## [Stop Vibe Coding Your Unit Tests](https://www.andy-gallagher.com/blog/stop-vibe-coding-your-unit-tests/?utm_source=tldrnewsletter)

Andy Gallagher cảnh báo về việc sử dụng LLMs để viết unit tests một cách tự động. Ông chỉ ra rằng LLMs có xu hướng viết quá nhiều tests và chỉ xác nhận những gì code làm, chứ không xác thực những gì code nên làm. Bài viết cung cấp ví dụ thực tế về một React component button và cách LLMs tạo ra hàng chục tests không cần thiết.

**Điểm chính:**
- LLMs tạo ra quá nhiều unit tests không cần thiết - ví dụ Claude Sonnet 4 tạo ra ~30 tests (200 LOC) cho một button component đơn giản
- Tests do LLM tạo thường chỉ verify implementation details thay vì validate behavior thực sự
- Tests này làm code bị "khóa" vào implementation hiện tại, gây khó khăn khi refactor
- LLMs không hỏi clarifying questions về "cần test gì" mà chỉ test tất cả mọi thứ
- Các tests này tốn context window, làm loãng semantic search, và khiến coworkers ghét khi review PR lớn
- Giải pháp: viết tests từng cái một, tập trung vào behavior quan trọng, keep it focused và brief

## [Game design is simple, actually](https://www.raphkoster.com/2025/11/03/game-design-is-simple-actually/?utm_source=tldrnewsletter)

Raph Koster trình bày một framework 12 bước toàn diện để hiểu về thiết kế game. Ông phân tích các khái niệm phức tạp thành những nguyên tắc dễ hiểu, từ bản chất của niềm vui đến sự phức tạp của các hệ thống game. Bài viết nhấn mạnh rằng game về cơ bản là về giải quyết vấn đề và làm chủ kỹ năng, với sự không chắc chắn và học hỏi là cốt lõi.

**Điểm chính:**
- Fun thực chất là về việc làm tiến bộ dự đoán (mastery of problems) - không phải tất cả mọi thứ thú vị đều liên quan đến thiết kế game
- Games được xây dựng từ toys (hệ thống có ràng buộc) bằng cách thêm goals - core mechanic là một "problematic object"
- Games là machines xung quanh uncertainty - tốt nhất có nhiều depth, nhiều paths đến solution
- Có 2 types của loops: operational loop (tương tác với problem) và progression loop/spiral (đối mặt với nhiều situations)
- Feedback cần show: có thể làm gì, đã làm gì, kết quả là gì, và có giúp đạt goal không
- Games được làm từ games - nhiều loops được nối lại thành economies và value chains
- Game design là compound art form - cần cả system design và experience design (art, story, audio)
- Designer cần hiểu motivations của players - không có game nào dành cho tất cả mọi người

## [Architectural debt is not just technical debt](https://frederickvanbrabant.com/blog/2025-10-31-architectural-debt-is-not-just-technical-debt/?&aid=recufcl24hU9MXCJC)

Frederick Van Brabant giải thích sự khác biệt giữa architectural debt và technical debt. Ông chỉ ra rằng architectural debt không chỉ giới hạn ở code level mà còn ảnh hưởng đến nhiều layer của tổ chức. Bài viết phân tích architectural debt ở ba layer chính: application/infrastructure, business, và strategy.

**Điểm chính:**
- Technical debt thường là temporary hacks, architectural debt là structural decisions gây vấn đề về sau
- Enterprise architects nên tập trung vào integration patterns, system overlap, và vendor lock-in thay vì code details
- Business layer debt liên quan đến ownership, stewardship, và outdated processes - documentation sai có thể gây vấn đề nghiêm trọng với auditors
- Strategy layer debt nguy hiểm nhất - mis-defined capabilities hoặc half frameworks có thể dẫn đến wrong assumptions cho 3-5 năm tới
- Enterprise architects có time và visibility để flag architectural debt - cần build case với AS-IS, TO-BE, và business case
- Cần pick battles carefully - có thể tolerate debt ở innovation systems hơn là record systems

## [The Search Problem: Why Your Computer Finds Things Faster Than You Do](https://deyaa1251.github.io/deyaa1251/posts/b_tree/?utm_source=bonobopress&utm_medium=newsletter&utm_campaign=2155)

Bài viết này giải thích tại sao B-trees lại quan trọng trong các hệ thống hiện đại. Tác giả chia sẻ kinh nghiệm thực tế khi implement binary search tree và nhận ra nó sụp đổ khi thêm simulated disk I/O. B-tree được thiết kế đặc biệt cho disk-based operations với node size khớp với disk block.

**Điểm chính:**
- Binary search trees là O(log n) trong RAM nhưng rất tệ trên disk - mỗi level là một disk read
- B-tree lưu trữ nhiều keys per node (fat nodes) - một node fits trong một disk block (4KB)
- Benchmark cho thấy: 100,000 files, BST cần 1,410 seconds (23.5 phút) trong khi B-tree chỉ cần 3 seconds
- B-trees guarantee predictable performance - không degenerate thành linked list như BST
- Real-world usage: ext4, NTFS, APFS, databases (MySQL, PostgreSQL), Git, MongoDB đều dùng B-trees
- Key insight: B-trees trade best-case performance cho worst-case guarantees - crucial cho production systems

## [Kafka is fast -- I'll use Postgres](https://topicpartition.io/blog/postgres-pubsub-queue-benchmarks?utm_source=bonobopress&utm_medium=newsletter&utm_campaign=2155)

Bài viết này so sánh hiệu năng của Postgres khi dùng làm pub/sub messaging system và queue so với các hệ thống chuyên dụng như Kafka. Tác giả thực hiện benchmarks chi tiết trên nhiều setup khác nhau và chỉ ra rằng Postgres có thể xử lý workloads khá lớn mà không cần đến distributed systems phức tạp.

**Điểm chính:**
- Postgres pub/sub benchmark: 1 node 4 vCPU đạt 4.8 MiB/s write, 24.6 MiB/s read (5x fanout)
- 3-node replicated setup vẫn maintain throughput tốt với latency tăng từ 60ms thành 186ms p99
- 96 vCPU single node đạt 238 MiB/s write và 1.16 GiB/s read - rất ấn tượng
- Queue benchmark đạt 2.81 MiB/s throughput trên 4 vCPU node
- Key insight: Postgres thường "good enough" cho 80% use cases với 20% effort
- Organizational overhead của adopting new systems thường lớn hơn benefit ở small scale
- "Just Use Postgres" movement đang ngày càng phổ biến vì simplicity và reliability

## [You Need To Become A Full Stack Person](https://den.dev/blog/full-stack-person/?utm_source=tldrnewsletter)

Den Delimarsky lập luận về sự cần thiết của việc trở thành "full-stack person" trong kỷ nguyên AI. Ông chỉ ra rằng nhiều kỹ năng đang bị commoditized bởi LLMs, nhưng combo của creativity, critical thinking, và execution speed sẽ tạo ra career moat bền vững. Bài viết giới thiệu 9 kỹ năng cốt lõi cần phát triển.

**Điểm chính:**
- Role flattening đang xảy ra - ranh giới giữa các roles trở nên mờ đi với sự trỗi dậy của product engineer
- T-shaped model (1 deep spike + broad base) đang chết, Pi-shaped model (2 deep spikes + broad base) là tương lai
- 9 skills cần thiết: Creativity & Taste, Critical Thinking, Communications, Cross-Domain Knowledge, AI Augmentation, Product Sense, Execution Speed, Learning Agility, Systems Thinking, và Agency
- AI không thay thế được taste và judgment - nó chỉ là "idea implementation vehicles"
- Key insight: "AI lowers the cost of type it and it runs, but not the cost of choosing the right thing"
- High agency - attitude "We'll figure this out - let's get to work" - là yếu tố khác biệt quan trọng

**Đánh giá**: *Phần đầu iFlow CLI làm khá tốt, nhưng mà càng về sau thì càng lạm dụng tiếng Anh nhiều. Điểm cộng là iFlow CLI có thể access nhiều url, bằng cách bypass sử dụng proxy (Tuy nhiên proxy của Trung Quốc nên nhìn cũng hơi ghê). Trong quá trình sử dụng thì cũng thấy nhiều dòng để toàn tiếng Trung Quốc làm khó hiểu và hơi rén :v Mình sẽ cố gắng cải thiện AGENTS.md và thử lại sau.*

---

*Bài viết đã được review và cập nhật bởi Claude Code với Opus 4.7 (1M context).*
