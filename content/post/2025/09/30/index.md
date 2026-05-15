---
title: "Newsletter #57"
date: 2025-09-30
tags: ["AI-Assisted", "Technology", "Career", "Agentic AI", "Professional Development", "Performance", "Memory Management", "Java", "Programming Languages", "Software Evolution", "Monorepo", "Package Management", "R", "Software Maintenance", "Distributed Systems", "Software Architecture", "System Design", "API Gateway", "Event Sourcing", "Microservices", "Code Quality", "Testing", "Code Maintenance", "Bug Prevention"]
categories: ["Newsletter"]
---

*~~Bài viết này được thực hiện bởi [Claude Code Router](https://github.com/musistudio/claude-code-router) với model `qwen3-coder` chạy trên [iFlow Platform](https://platform.iflow.cn/docs/api-mode).~~ Mời bạn thưởng thức Newsletter #57.*

## [Agentic AI và Sự Thay Đổi Nghề Nghiệp](https://medium.com/@elliotgraebert/agentic-ai-has-changed-my-career-2c6e3dd29708)

Trong thời đại AI phát triển mạnh mẽ, khái niệm "Agentic AI" đang dần trở nên phổ biến và có ảnh hưởng lớn đến sự phát triển nghề nghiệp của nhiều người. Agentic AI đề cập đến các hệ thống AI có khả năng tự chủ thực hiện các nhiệm vụ phức tạp thông qua việc lập kế hoạch, ra quyết định và thực thi hành động một cách độc lập.

Sự xuất hiện của Agentic AI đang tạo ra những thay đổi đáng kể trong thị trường lao động. Một số ngành nghề truyền thống có thể bị ảnh hưởng, trong khi các vị trí mới liên quan đến quản lý và tương tác với AI đang dần hình thành. Những người làm việc trong lĩnh vực công nghệ đang phải thích nghi với vai trò mới, chuyển từ việc thực hiện các nhiệm vụ cụ thể sang việc giám sát, hướng dẫn và cộng tác với các agent AI.

**Điểm chính:**
- Agentic AI đang thay đổi bản chất công việc trong nhiều ngành, đặc biệt là công nghệ
- Các chuyên gia cần phát triển kỹ năng mới để làm việc hiệu quả với AI agent
- Cơ hội mới đang mở ra cho những người có thể kết hợp AI agent vào quy trình làm việc
- Việc thích nghi sớm với xu hướng này có thể tạo ra lợi thế cạnh tranh trong sự nghiệp

## [Sự Phát Triển Của Garbage Collectors: Từ CMS Của Java Đến ZGC](https://codemia.io/blog/path/The-Evolution-of-Garbage-Collectors-From-Javas-CMS-to-ZGC-and-a-JVM-vs-Go-vs-Rust-Latency-Shootout)

Quản lý bộ nhớ là một chủ đề quan trọng trong lập trình, đặc biệt là trong các ngôn ngữ như Java, Go và Rust. Bài viết này khám phá sự tiến hóa của garbage collectors (GC) từ Concurrent Mark-Sweep (CMS) truyền thống của Java đến Z Garbage Collector (ZGC) hiện đại.

ZGC là một bước tiến lớn trong việc giảm thiểu thời gian tạm dừng của ứng dụng (pause times), với mục tiêu giữ thời gian tạm dừng dưới 10ms bất kể kích thước heap. Điều này tạo ra sự khác biệt lớn về hiệu suất so với các GC thế hệ trước như CMS.

Bài viết cũng so sánh hiệu suất về độ trễ giữa các nền tảng:
- JVM (với ZGC): Giảm đáng kể thời gian tạm dừng nhờ cải tiến trong thiết kế GC
- Go: GC hiệu quả với độ trễ thấp nhờ thuật toán concurrent và tri-color marking
- Rust: Tránh hoàn toàn GC nhờ mô hình ownership, mang lại hiệu suất dự đoán được mà không có chi phí GC

**Điểm chính:**
- ZGC giúp giảm thời gian tạm dừng của ứng dụng xuống dưới 10ms
- Go sử dụng thuật toán marking hiệu quả để giữ độ trễ thấp
- Rust loại bỏ hoàn toàn nhu cầu GC nhờ ownership model
- Việc lựa chọn ngôn ngữ ảnh hưởng đáng kể đến hiệu suất và trải nghiệm người dùng

## [Mới Trong Java 25: Generational Shenandoah GC Không Còn Là Tính Năng Thử Nghiệm](https://theperfparlor.com/2025/09/14/new-in-java25-generational-shenandoah-gc-is-no-longer-experimental/)

Java 25 đánh dấu sự ổn định hóa của garbage collector Generational Shenandoah, hiện đã sẵn sàng cho môi trường production. Shenandoah GC, ban đầu được giới thiệu trong Java 12, là một bộ thu gom rác có thời gian tạm dừng thấp, chạy gần như đồng thời với ứng dụng.

Phiên bản generational, lần đầu tiên có sẵn như một tính năng thử nghiệm trong Java 24, cải thiện hiệu suất và dung lượng bộ nhớ bằng cách tách biệt các đối tượng trẻ và cũ. Cách tiếp cận này giảm việc quét không cần thiết, vì hầu hết các đối tượng đều "chết sớm".

Các cải tiến chính trong Java 25 bao gồm:
- Ổn định hóa và sửa lỗi
- Hiệu suất tốt hơn và giảm chi phí GC
- Quản lý vùng nhớ hiệu quả hơn
- Công cụ và ghi log được cải thiện

Theo như bài viết, "Nhờ tất cả các cải tiến này, Generational Shenandoah đã đạt đến mức độ trưởng thành phù hợp cho các ứng dụng production." Người dùng không còn cần cờ `-XX:+UnlockExperimentalVMOptions` để kích hoạt tính năng này.

**Điểm chính:**
- Generational Shenandoah GC trong Java 25 đã sẵn sàng cho production
- Tính năng generational giúp cải thiện hiệu suất và dung lượng bộ nhớ
- Không cần cờ experimental để kích hoạt tính năng này nữa
- Đây là bước tiến quan trọng trong việc tối ưu hóa garbage collection của Java

## [Nếu Tất Cả Thế Giới Là Một Monorepo](https://jtibs.substack.com/p/if-all-the-world-were-a-monorepo?utm_source=tldrnewsletter)

Bài viết khám phá cách hệ sinh thái lập trình R, thông qua kho lưu trữ gói trung tâm CRAN, thực thi tư duy "monorepo" bằng cách yêu cầu các tác giả gói đảm bảo rằng các cập nhật của họ không phá vỡ các gói phụ thuộc. Điều này tương phản với các hệ sinh thái khác như npm hoặc PyPI, nơi các thay đổi phá vỡ phổ biến hơn và được để cho người dùng giải quyết.

Tác giả suy ngẫm về cách tiếp cận này thúc đẩy sự đồng cảm cực độ trong bảo trì phần mềm, ưu tiên trải nghiệm người dùng hơn sự tiện lợi cho nhà phát triển. Một trải nghiệm cá nhân với các thay đổi phá vỡ trong gói `grf` làm nổi bật những thách thức và lợi ích của hệ thống này.

Bài viết kết luận bằng cách đề xuất rằng các hệ sinh thái phần mềm quy mô lớn khác có thể hưởng lợi từ việc áp dụng triết lý tương tự để cải thiện khả năng bảo trì lâu dài và sự tin tưởng của người dùng.

**Điểm chính:**
- CRAN yêu cầu các tác giả gói đảm bảo cập nhật không phá vỡ phụ thuộc
- Hệ sinh thái R ưu tiên trải nghiệm người dùng hơn sự tiện lợi cho nhà phát triển
- Triết lý "monorepo" có thể cải thiện độ tin cậy và khả năng bảo trì
- Các hệ sinh thái khác có thể học hỏi từ cách tiếp cận của R

## [9 Mẫu Kiến Trúc Phần Mềm Cho Hệ Thống Phân tán](https://dev.to/somadevtoo/9-software-architecture-patterns-for-distributed-systems-2o86?=&aid=recZm2jVus1yqUHWw)

Bài viết trình bày các mẫu kiến trúc phần mềm thiết yếu được sử dụng trong các hệ thống phân tán để quản lý dữ liệu và giao tiếp một cách hiệu quả. Những mẫu này cũng rất quan trọng cho các cuộc phỏng vấn thiết kế hệ thống. Các mẫu chính bao gồm:

1. **Peer-to-Peer (P2P):** Cho phép giao tiếp trực tiếp giữa các nút mà không cần điều phối viên trung tâm, được sử dụng trong các hệ thống chia sẻ tệp và blockchain.
2. **API Gateway:** Đóng vai trò là điểm vào thống nhất cho các dịch vụ backend, đơn giản hóa tương tác của khách hàng và thực thi bảo mật.
3. **Pub-Sub (Publish-Subscribe):** Tách rời người sản xuất tin nhắn khỏi người tiêu dùng bằng cách sử dụng một broker tin nhắn, hỗ trợ các hệ thống thời gian thực.
4. **Request-Response:** Một mô hình đồng bộ trong đó khách hàng chờ phản hồi từ máy chủ, phổ biến trong REST API và ứng dụng web.
5. **Event Sourcing:** Lưu trữ các thay đổi trạng thái dưới dạng các sự kiện bất biến, hỗ trợ khả năng kiểm tra và phát lại trong các hệ thống tài chính.
6. **ETL (Extract, Transform, Load):** Tích hợp dữ liệu từ nhiều nguồn vào một kho dữ liệu, rất quan trọng cho phân tích và di chuyển dữ liệu.
7. **Batching:** Nhóm dữ liệu để xử lý nhằm cải thiện hiệu suất, được sử dụng trong ETL và các đường ống dữ liệu.
8. **Streaming Processing:** Xử lý các luồng dữ liệu liên tục trong thời gian thực, lý tưởng cho các ứng dụng IoT và an ninh mạng.
9. **Orchestration:** Phối hợp quy trình làm việc giữa các dịch vụ bằng cách sử dụng một bộ điều khiển trung tâm, đảm bảo thực hiện có trật tự trong các hệ thống phức tạp.

Những mẫu này giúp các kiến trúc sư xây dựng các hệ thống có thể mở rộng và phục hồi bằng cách cung cấp các cách tiếp cận có cấu trúc cho các thách thức thiết kế phổ biến.

**Điểm chính:**
- 9 mẫu kiến trúc thiết yếu cho hệ thống phân tán và phỏng vấn thiết kế
- Mỗi mẫu giải quyết các vấn đề cụ thể trong giao tiếp và quản lý dữ liệu
- Các mẫu giúp xây dựng hệ thống có thể mở rộng và phục hồi
- Hiểu biết về các mẫu này rất quan trọng cho kỹ sư phần mềm

## [Sắp Xếp Các Dòng Trong Mã Nguồn](https://testing.googleblog.com/2025/09/sort-lines-in-source-code.html?=&aid=recV8wgDMqTb7Hwko)

Bài viết từ Google Testing Blog thảo luận về cách sắp xếp các dòng trong mã nguồn có thể giúp ngăn chặn lỗi và cải thiện khả năng bảo trì. Bài viết sử dụng một ví dụ về cấu hình trò chơi, nơi một cài đặt cờ trùng lặp đã gây ra lỗi và dễ dàng được phát hiện khi các dòng được sắp xếp.

Bài viết giới thiệu công cụ **keep-sorted** (có sẵn tại [github.com/google/keep-sorted](http://github.com/google/keep-sorted)), một công cụ để tự động sắp xếp các dòng trong các khối được chỉ định trong tệp. Người dùng thêm các chú thích `# keep-sorted start` và `# keep-sorted end` xung quanh các dòng mục tiêu và chạy công cụ.

Việc sắp xếp giúp xác định các vấn đề như các mục nhập trùng lặp. Bài viết lưu ý: "Các danh sách đã sắp xếp và các dòng mã dễ đọc và bảo trì hơn, và có thể giúp ngăn chặn lỗi." Bài viết cũng đề cập đến các tính năng nâng cao như sắp xếp bằng biểu thức chính quy và nhắc nhở người dùng "đảm bảo thứ tự ban đầu không có chủ ý" trước khi sắp xếp.

**Điểm chính:**
- Sắp xếp các dòng mã giúp phát hiện lỗi trùng lặp và cải thiện khả năng bảo trì
- Công cụ keep-sorted tự động sắp xếp các khối mã được chỉ định
- Các danh sách đã sắp xếp dễ đọc và dễ bảo trì hơn
- Cần kiểm tra thứ tự ban đầu có chủ ý trước khi sắp xếp

## [Đánh Giá 26 Năm Thay Đổi Của Java](https://neilmadden.blog/2025/09/12/rating-26-years-of-java-changes/)

[Bài viết nhìn lại chặng đường 26 năm phát triển của ngôn ngữ lập trình Java, đánh giá các thay đổi quan trọng trong ngôn ngữ và thư viện cốt lõi. Tác giả bắt đầu từ Java 1.1.8 năm 1999 và điểm qua những cải tiến lớn như Bộ sưu tập (Collections Framework) ("4/10"), Generics ("8/10"), và java.util.concurrent ("10/10").

Một số tính năng bị chỉ trích như NIO ("0/10") và Streams ("1/10"), trong khi Records ("10/10") và UTF-8 mặc định ("10/10") được khen ngợi. Bài viết bao quát các phiên bản đến Java 25, nhấn mạnh xu hướng phát hành theo thời gian và các tính năng như pattern matching, virtual threads, và mã hóa hậu lượng tử. Mô-đun (Modules) nhận đánh giá rất tệ "-10/10". Bài viết kết thúc bằng lời mời gọi thảo luận về các đánh giá chủ quan này.

**Điểm chính:**
- Java đã trải qua nhiều thay đổi lớn trong 26 năm phát triển
- Các cải tiến như Generics, java.util.concurrent và Records được đánh giá cao
- Một số tính năng như NIO và Streams nhận đánh giá thấp từ cộng đồng
- Java 25 tiếp tục cải tiến với các tính năng như pattern matching và virtual threads


## Bonus: Một vài ảnh hay ho đến từ [ByteByteGo](https://bytebytego.com/)

![Python vs Java](https://substack-post-media.s3.amazonaws.com/public/images/aa5ea98b-c832-429d-8e48-63f25b7feb5a_3000x3900.jpeg)
![Design Patterns Cheat Sheet](https://substack-post-media.s3.amazonaws.com/public/images/4863d93c-ca2a-4b5a-b0b4-fe3621a6c184_2250x2920.png)
![Design Patterns Cheat Sheet](https://substack-post-media.s3.amazonaws.com/public/images/d6d04f12-2adc-4d8e-a9ca-2de16399066f_2250x3376.png)
![CI/CD Simplified Visual Guide](https://substack-post-media.s3.amazonaws.com/public/images/a370bb6a-82d3-45ad-b6f4-a2a9a4317402_800x1099.jpeg)
![How Apache Kafka Works?](https://substack-post-media.s3.amazonaws.com/public/images/5d9faeeb-3428-44c8-94fd-4b52fc287da3_3000x3900.png)
![Load Balancers vs API Gateways vs Reverse Proxy](https://substack-post-media.s3.amazonaws.com/public/images/45136e24-79ee-4c6d-a53a-89df6afebef6_3000x3900.png)
![Understanding Load Balancers: Traffic Management at Scale](https://substackcdn.com/image/fetch/$s_!4Uyj!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F1a1213e2-86cb-4fa8-bf72-e37ffe0da44d_2250x2624.heic)

*Nhìn chung thì nội dung ngắn gọn, mình tương đối hài lòng, chắc khoảng 80% so với Claude Code với Claude models, nhưng vì miễn phí nên là mình rất ưng ý :)))*

---

*Bài viết đã được review và cập nhật bởi Claude Code với Opus 4.7 (1M context).*
