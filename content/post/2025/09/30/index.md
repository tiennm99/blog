---
title: "Newsletter #57"
date: 2025-09-30
tags: ["AI-Assisted", "Technology", "Career", "Agentic AI", "Professional Development", "Performance", "Memory Management", "Java", "Programming Languages", "Software Evolution", "Monorepo", "Package Management", "R", "Software Maintenance", "Distributed Systems", "Software Architecture", "System Design", "API Gateway", "Event Sourcing", "Microservices", "Code Quality", "Testing", "Code Maintenance", "Bug Prevention"]
categories: ["Newsletter"]
---

*~~Bài viết này được thực hiện bởi [Claude Code Router](https://github.com/musistudio/claude-code-router) với model `qwen3-coder` chạy trên [iFlow Platform](https://platform.iflow.cn/docs/api-mode).~~ Mời bạn thưởng thức Newsletter #57.*

## [Agentic AI và Sự Thay Đổi Nghề Nghiệp](https://medium.com/@elliotgraebert/agentic-ai-has-changed-my-career-2c6e3dd29708)

Elliot Graebert, một giám đốc kỹ thuật tại Skydio, thú nhận rằng suốt sự nghiệp ông gần như không viết mã nguồn vì lên làm quản lý quá sớm. Khoảng bốn tháng trước, ông bắt đầu "vibe coding" ngay trên monorepo hàng triệu dòng điều khiển đội drone của công ty, và nay đã lọt vào nhóm năm người đóng góp nhiều nhất, có lúc gửi tới mười pull request mỗi giờ. Tác giả phân biệt hai cách làm: vibe coding giống lập trình cặp với AI (như Windsurf, Cursor), vòng lặp tính bằng giây và cần bạn chú ý liên tục; còn agentic AI giống giao việc cho một thực tập sinh nhiệt tình, vòng lặp tính bằng phút và bạn chỉ quay lại khi việc đã xong. Hành trình của ông đi từ tốc độ 0,5 lần (tự sửa lỗi giao diện nhỏ với một trình soạn thảo), lên 1,5 lần khi chạy song song ba môi trường với ba mô hình Gemini, Claude và GPT để "vây đánh" một lỗi khó, rồi 3 lần nhờ các tệp ngữ cảnh (Windsurf Rules) ghi lại quy ước mã nguồn và lệnh chạy kiểm thử, được tinh chỉnh dần sau mỗi lần AI gặp khó.

Bước nhảy lên 10 lần đến từ Coder Tasks, các môi trường tự động đi từ câu lệnh đến pull request, kết hợp với hai MCP: GitHub để đọc issue và tạo pull request (kích hoạt CI và bản xem trước trên Vercel), và Playwright để AI tự mở trình duyệt, tái hiện lỗi, sửa rồi kiểm tra lại. Bài học cốt lõi là agentic AI thành công khi có một vòng phản hồi không cần con người trả lời; khi đó ông có thể chạy hàng chục tác vụ cùng lúc, chẳng hạn hoàn thành cả một đợt chuyển đổi thành phần lọc dữ liệu trong một ngày. Tác giả cũng nhấn mạnh AI không tự giải quyết mọi thứ, bạn phải đầu tư vào công cụ, và điều thú vị nhất là cả nhà thiết kế, quản lý sản phẩm hay đội bay thử cũng có thể trực tiếp đóng góp vào sản phẩm.

## ~~[Sự Phát Triển Của Garbage Collectors: Từ CMS Của Java Đến ZGC](https://codemia.io/blog/path/The-Evolution-of-Garbage-Collectors-From-Javas-CMS-to-ZGC-and-a-JVM-vs-Go-vs-Rust-Latency-Shootout)~~

~~Quản lý bộ nhớ là một chủ đề quan trọng trong lập trình, đặc biệt là trong các ngôn ngữ như Java, Go và Rust. Bài viết này khám phá sự tiến hóa của garbage collectors (GC) từ Concurrent Mark-Sweep (CMS) truyền thống của Java đến Z Garbage Collector (ZGC) hiện đại.~~

~~ZGC là một bước tiến lớn trong việc giảm thiểu thời gian tạm dừng của ứng dụng (pause times), với mục tiêu giữ thời gian tạm dừng dưới 10ms bất kể kích thước heap. Điều này tạo ra sự khác biệt lớn về hiệu suất so với các GC thế hệ trước như CMS.~~

~~Bài viết cũng so sánh hiệu suất về độ trễ giữa các nền tảng:~~
~~- JVM (với ZGC): Giảm đáng kể thời gian tạm dừng nhờ cải tiến trong thiết kế GC~~
~~- Go: GC hiệu quả với độ trễ thấp nhờ thuật toán concurrent và tri-color marking~~
~~- Rust: Tránh hoàn toàn GC nhờ mô hình ownership, mang lại hiệu suất dự đoán được mà không có chi phí GC~~

~~**Điểm chính:**~~
~~- ZGC giúp giảm thời gian tạm dừng của ứng dụng xuống dưới 10ms~~
~~- Go sử dụng thuật toán marking hiệu quả để giữ độ trễ thấp~~
~~- Rust loại bỏ hoàn toàn nhu cầu GC nhờ ownership model~~
~~- Việc lựa chọn ngôn ngữ ảnh hưởng đáng kể đến hiệu suất và trải nghiệm người dùng~~

## [Mới Trong Java 25: Generational Shenandoah GC Không Còn Là Tính Năng Thử Nghiệm](https://theperfparlor.com/2025/09/14/new-in-java25-generational-shenandoah-gc-is-no-longer-experimental/)

Java 25 chính thức đưa Generational Shenandoah ra khỏi trạng thái thử nghiệm, sẵn sàng cho môi trường production. Shenandoah vốn là bộ thu gom rác (garbage collector) có thời gian tạm dừng thấp, xuất hiện từ Java 12 và chạy gần như đồng thời với ứng dụng. Phiên bản phân thế hệ, được giới thiệu dưới dạng thử nghiệm ở Java 24, chia bộ nhớ thành vùng dành cho đối tượng trẻ và đối tượng già. Vì phần lớn đối tượng "chết sớm", cách chia này giúp bộ thu gom không phải quét lại những đối tượng sống lâu một cách không cần thiết, từ đó cải thiện hiệu năng và giảm lượng bộ nhớ sử dụng.

Trong Java 25, tính năng này được ổn định hóa và sửa nhiều lỗi, giảm chi phí thu gom rác, quản lý vùng nhớ hiệu quả hơn, đồng thời có công cụ và nhật ký (log) tốt hơn. Theo bài viết, nhờ các cải tiến đó mà Generational Shenandoah đã đủ trưởng thành cho ứng dụng thực tế, và bạn không còn cần cờ `-XX:+UnlockExperimentalVMOptions` để bật nó. Đây là một bước tiến quan trọng trong hành trình tối ưu hóa việc thu gom rác của Java.

## [Nếu Tất Cả Thế Giới Là Một Monorepo](https://jtibs.substack.com/p/if-all-the-world-were-a-monorepo?utm_source=tldrnewsletter)

Julie Tibshirani kể về trải nghiệm với CRAN, kho gói trung tâm của ngôn ngữ R. Trước khi chấp nhận một bản cập nhật, CRAN không chỉ kiểm tra gói được gửi lên mà còn chạy kiểm tra trên mọi gói phụ thuộc vào nó. Khi tác giả phát hành `grf` 2.0 với thay đổi phá vỡ API, CRAN chặn việc xuất bản cho đến khi gói hạ nguồn `policytree` được cập nhật. Ban đầu cô thấy vô lý: tại sao mình phải lo cho mã nguồn của người khác? Nhưng dần dần cô nhận ra đây không đơn thuần là một điểm khác trên thang đánh đổi giữa tốc độ và ổn định, mà là một sự "đồng cảm cực độ" trong bảo trì phần mềm: mã nguồn của người dùng cũng là trách nhiệm của người viết thư viện, giống như tư duy của một monorepo.

Tác giả so sánh với thời làm Elasticsearch, nơi việc để từng dự án tự nâng cấp khiến hàng nghìn dự án mắc kẹt ở phiên bản cũ nhiều năm sau đó. Khi chứng kiến các đợt chuyển đổi quy mô lớn tại Databricks, cô thấy rằng khi đội kỹ sư tự chịu trách nhiệm từ đầu đến cuối, kể cả việc sửa mã nguồn phụ thuộc, tỷ lệ hoàn thành tăng lên rõ rệt. Dù các gói R chấp nhận API kém nhất quán hơn các hệ sinh thái như npm hay PyPI, người dùng lại được hưởng việc cập nhật phụ thuộc gần như không đau đớn, và đó là bài học đáng để các hệ sinh thái khác suy ngẫm.

## [9 Mẫu Kiến Trúc Phần Mềm Cho Hệ Thống Phân tán](https://dev.to/somadevtoo/9-software-architecture-patterns-for-distributed-systems-2o86?=&aid=recZm2jVus1yqUHWw)

Bài viết giới thiệu chín mẫu kiến trúc thường gặp trong hệ thống phân tán, vừa hữu ích khi thiết kế thực tế vừa hay xuất hiện trong phỏng vấn thiết kế hệ thống. Nhóm giao tiếp gồm: Peer-to-Peer, nơi các nút trao đổi trực tiếp mà không cần bộ điều phối trung tâm, dùng trong chia sẻ tệp và blockchain; API Gateway, điểm vào thống nhất cho các dịch vụ phía sau, đảm nhận bảo mật và cân bằng tải trong kiến trúc microservices; Pub-Sub, tách bên gửi và bên nhận thông điệp qua một broker, phù hợp cho nhắn tin thời gian thực, hệ thống hướng sự kiện và IoT; và Request-Response, mô hình đồng bộ trong đó máy khách chờ phản hồi từ máy chủ, phổ biến ở REST API và ứng dụng web.

Nhóm quản lý và xử lý dữ liệu gồm: Event Sourcing, lưu trạng thái dưới dạng chuỗi sự kiện bất biến để dễ kiểm toán và phát lại, thường thấy trong hệ thống tài chính; ETL (trích xuất, biến đổi, nạp) để gom dữ liệu từ nhiều nguồn vào kho dữ liệu phục vụ phân tích và di chuyển dữ liệu; Batching, gom dữ liệu thành lô rồi xử lý một lần để tăng hiệu năng; Streaming Processing, xử lý luồng dữ liệu liên tục theo thời gian thực cho tài chính, IoT hay an ninh mạng; và Orchestration, dùng một bộ điều phối trung tâm để sắp xếp luồng công việc giữa các dịch vụ. Theo tác giả, hiểu rõ điểm mạnh và sự đánh đổi của từng mẫu sẽ giúp bạn xây dựng hệ thống tin cậy, dễ mở rộng và dễ bảo trì khi yêu cầu thay đổi.

## [Sắp Xếp Các Dòng Trong Mã Nguồn](https://testing.googleblog.com/2025/09/sort-lines-in-source-code.html?=&aid=recV8wgDMqTb7Hwko)

Bài viết của Kyle Freeman trên Google Testing Blog, chuyển thể từ một số "Tech on the Toilet", mở đầu bằng một tình huống quen thuộc: bạn bật chế độ hai người chơi ở dòng cuối tệp cấu hình nhưng khi chạy trò chơi thì tính năng không xuất hiện. Nguyên nhân là cờ `enable_two_players` bị khai báo hai lần với hai giá trị khác nhau, rất khó thấy khi các dòng nằm lộn xộn. Chỉ cần sắp xếp lại, hai dòng trùng lặp nằm cạnh nhau và lỗi lộ ra ngay. Thông điệp chính là danh sách và các dòng mã nguồn được sắp xếp thì dễ đọc, dễ bảo trì hơn và giúp ngăn lỗi.

Để làm việc này tự động, tác giả giới thiệu công cụ keep-sorted ([github.com/google/keep-sorted](http://github.com/google/keep-sorted)): bạn thêm chú thích `keep-sorted start` và `keep-sorted end` quanh các dòng cần sắp xếp, rồi chạy `keep-sorted [file1] [file2] ...`, và có thể gắn nó vào pre-commit để tự chạy mỗi khi commit. Công cụ còn có tùy chọn bỏ qua chữ hoa chữ thường, sắp xếp theo số, theo tiền tố hoặc theo biểu thức chính quy (ví dụ `by_regex` để sắp một mảng Go theo phần chú thích cuối dòng). Lưu ý quan trọng: trước khi sắp xếp, hãy chắc chắn thứ tự ban đầu không mang ý nghĩa, chẳng hạn thứ tự nạp các phụ thuộc.

## [Đánh Giá 26 Năm Thay Đổi Của Java](https://neilmadden.blog/2025/09/12/rating-26-years-of-java-changes/)

Neil Madden nhìn lại 26 năm làm việc với Java, từ Java 1.1.8 năm 1999 đến Java 25, và chấm điểm chủ quan từng thay đổi của ngôn ngữ và thư viện lõi (bỏ qua giao diện, đồ họa, máy ảo và GC). Những tính năng được đánh giá cao gồm java.util.concurrent (10/10), thiết kế tốt đến mức mọi người dùng nó thay cho các lớp collection gốc; try-with-resources (10/10) giúp xử lý ngoại lệ an toàn hơn hẳn; Records (10/10) mà tác giả bảo là "đáng lẽ phải có từ lâu"; UTF-8 mặc định (10/10) sửa hàng nghìn lỗi mã hóa ký tự chỉ trong một lần; cùng Generics (8/10) và suy luận kiểu `var` (9/10). Collections Framework chỉ được 4/10, lambda 4/10 vì stack trace xấu, switch expression 6/10 như một cải thiện nhỏ dễ chịu.

Ở chiều ngược lại, NIO nhận 0/10 vì API rối rắm, Streams chỉ 1/10 và bị gọi là một trong những sai lầm lớn nhất của Java hiện đại do phức tạp, hứa hẹn quá mức về xử lý song song và dễ rò rỉ tài nguyên, còn các API mật mã học 1/10 vì dễ dùng sai. Tệ nhất là Modules với -10/10: gây xáo trộn lớn mà lợi ích thực tế rất ít. Virtual threads được xem là hứa hẹn nhưng chưa đủ kiểm chứng để chấm điểm. Bài viết cũng nhắc tới nhịp phát hành theo thời gian, pattern matching và mật mã hậu lượng tử, rồi kết thúc bằng lời mời bạn đọc cùng tranh luận về các đánh giá này.


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

*Bài viết đã được viết lại bởi Claude Code với Opus 5.5 vào ngày 27/09/2026.*
