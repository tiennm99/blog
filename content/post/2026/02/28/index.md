---
title: "Newsletter #85"
date: 2026-02-28
tags: ["AI-Assisted"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #85.*

## [How I Use Claude Code](https://boristane.com/blog/how-i-use-claude-code/)

Tác giả chia sẻ quy trình làm việc hiệu quả khi sử dụng Claude Code trong 9 tháng qua, với một nguyên tắc cốt lõi: không bao giờ để Claude viết mã cho đến khi bạn đã xem xét và phê duyệt một kế hoạch viết tay. Phương pháp này tách biệt hai giai đoạn tư duy và thực thi, giúp ngăn chặn sự lãng phí công sức, giữ người lập trình kiểm soát các quyết định kiến trúc, và tạo ra kết quả tốt hơn nhiều.

Quy trình được chia thành ba giai đoạn chính. Giai đoạn Nghiên cứu bắt đầu bằng việc yêu cầu Claude đọc sâu phần cơ sở mã liên quan và viết báo cáo chi tiết vào tệp `research.md`. Giai đoạn Lập kế hoạch tạo ra tệp `plan.md` với hướng dẫn triển khai cụ thể. Điều thú vị nhất là Vòng lặp ghi chú (Annotation Cycle) - tác giả mở tệp kế hoạch trong trình soạn thảo và thêm ghi chú trực tiếp vào tài liệu để sửa các giả định sai, từ chối phương án không phù hợp, hoặc bổ sung kiến thức lĩnh vực. Quá trình này lặp lại 1-6 lần cho đến khi kế hoạch hoàn chỉnh.

Giai đoạn Triển khai diễn ra sau khi mọi quyết định đã được xác nhận, với câu lệnh chuẩn yêu cầu Claude thực thi toàn bộ kế hoạch, đánh dấu hoàn thành từng tác vụ, chạy kiểm tra kiểu liên tục, và không dừng cho đến khi tất cả hoàn thành. Tác giả nhấn mạnh việc thực thi nên trở nên "nhàm chán" - công việc sáng tạo đã diễn ra trong các vòng lặp ghi chú, và khi kế hoạch đúng, thực thi phải thẳng tiến. Cách tiếp cận này loại triệt để các giả định sai được xây đắp chồng chất trong 15 phút, giúp người lập trình luôn ngồi ghế lái và đưa ra các quyết định quan trọng.

**Điểm chính:**
- Tách biệt tư duy và thực thi: luôn viết kế hoạch trước khi viết mã
- Vòng lặp ghi chú: thêm ghi chú trực tiếp vào kế hoạch để tinh chỉnh và sửa lỗi sai
- Tệp markdown làm trạng thái chia sẻ: giúp duy trì ngữ cảnh và quyết định
- Chạy trong một phiên dài: tận dụng tích lũy ngữ cảnh thay vì chia nhỏ phiên
- Giữ quyền kiểm soát: người lập trình đưa ra quyết định, Claude thực thi cơ khí

## [Next-Generation DB Ingestion at Pinterest](https://medium.com/pinterest-engineering/next-generation-db-ingestion-at-pinterest-66844b7153b7)

Pinterest chia sẻ hành trình xây dựng khung làm việc nhập liệu cơ sở dữ liệu thế hệ mới dựa trên Change Data Capture (CDC), thay thế hệ thống batch cũ kỹ gặp nhiều hạn chế. Hệ thống cũ có độ trễ dữ liệu cao (trên 24 giờ), xử lý kém hiệu quả do chạy full-table batch hàng ngày dù thay đổi thực tế dưới 5%, thiếu hỗ trợ xóa theo hàng cho tuân thủ, và phức tạp trong vận hành với nhiều quy trình độc lập.

Giải pháp mới là khung làm việc thống nhất sử dụng Debezium/TiCDC, Kafka, Flink, Spark và Iceberg, cung cấp dữ liệu trong vài phút thay vì ngày, chỉ xử lý các bản ghi thay đổi để tiết kiệm chi phí, hỗ trợ xóa theo hàng và xử lý tăng dần. Kiến trúc gồm ba lớp chính: lớp CDC bắt thay đổi cơ sở dữ liệu với độ trễ dưới 1 giây và ghi vào Kafka; lớp Streaming (Flink) xử lý sự kiện gần thời gian thực vào bảng CDC Iceberg trên S3; lớp Batch (Spark) định kỳ lấy thay đổi từ bảng CDC và dùng `Merge Into` để upsert vào bảng Iceberg cơ sở.

Bài viết chi tiết nhiều tối ưu hóa quan trọng. Phân vùng bảng cơ sở bằng băm của khóa chính sử dụng hàm `bucket()` giúp phân tán đều bản ghi và cải thiện hiệu suất upsert. Với vấn đề tệp nhỏ, thiết lập `WRITE DISTRIBUTED BY PARTITION` giảm số lượng tệp nhỏ và cải thiện hiệu suất. Bucket Join cho các bảng lớn, sử dụng bảng tạm trung gian để bỏ qua toàn bộ thao tác trộn của bảng cơ sở, giúp giảm 40%+ chi phí tính toán và độ trễ đáng kể. Pinterest chọn Merge-on-Read (MOR) thay vì Copy-on-Write (COW) vì chi phí lưu trữ của COW cao hơn nhiều.

**Điểm chính:**
- Từ batch sang CDC: giảm độ trễ từ 24 giờ xuống 15-60 phút
- Kiến trúc hai bảng: bảng CDC (append-only, <5 phút) và bảng cơ sở (snapshot, 15-60 phút)
- Tối ưu hóa phân vùng bucket: phân tán đều bản ghi, upsert song song hiệu quả
- Bucket Join với bảng tạm: giảm 40%+ chi phí tính toán
- Merge-on-Read: ưu tiên vì chi phí lưu trữ thấp hơn Copy-on-Write

## [Thank you, AI](https://www.kraxel.org/blog/2026/01/thank-you-ai/)

Một câu chuyện ngắn về hậu quả không mong muốn của AI scrapers. Tác giả đã chạy máy chủ git tự lưu trữ công khai từ năm 2011 (và CVS trước đó), nhưng buộc phải đóng cửa sau khi các bot AI tấn công giao diện cgit với hàng loạt yêu cầu vô bổ đến mức "gây chết" máy chủ. Thay vì chiến đấu với scrapers, tác giả quyết định chuyển tất cả kho lưu trữ sang GitLab và GitHub - hầu hết đã có bản sao sẵn ở đó.

Điều đáng chú ý là ngay cả khi dịch vụ git đã bị tắt, AI scrapers vẫn tiếp tục tấn công. Hàng triệu phản hồi 404 không đủ để thuyết phục bot rằng dịch vụ cgit không còn tồn tại, và các tệp nhật ký đã lấp đầy đĩa nhanh đến mức logrotate không kịp xử lý, gây ra một lần sự cố khác. Tác giả đã di chuyển blog từ WordPress sang Jekyll từ 2018 nên là các trang tĩnh, ít bị ảnh hưởng hơn, nhưng vẫn phải điều chỉnh cấu hình logrotate để ngăn vấn đề tương tự. Câu chuyện này là lời nhắc nhở về tác động của AI scrapers đối với các dịch vụ tự lưu trữ quy mô nhỏ.

**Điểm chính:**
- AI scrapers tấn công máy chủ git tự lưu trữ đến mức không thể phục hồi
- Chuyển sang GitLab/GitHub thay vì xây dựng lại máy chủ
- Scrapers vẫn tiếp tục gửi yêu cầu sau khi dịch vụ tắt, lấp đầy đĩa bằng nhật ký
- Trang tĩnh (Jekyll) an toàn hơn trang động (WordPress)

## [Java UI in 2026: The Complete Guide](https://robintegg.com/2026/02/08/java-ui-in-2026-the-complete-guide)

Hướng dẫn toàn diện về các framework UI Java năm 2026, bao phủ web, desktop, mobile và terminal interfaces. Tác giả khẳng định đây không phải là các dự án lỗi thời (legacy) mà là công nghệ production-ready, được bảo trì actively và đang chạy tại các doanh nghiệp lớn, phục vụ hàng triệu người dùng trên toàn thế giới.

Bài viết phân loại frameworks theo 4 nhóm chính. Web UI có Vaadin (server-driven, viết toàn bộ bằng Java), Apache Wicket (component-oriented từ 2004), TeaVM (biên dịch Java bytecode sang JavaScript/WebAssembly), HTMX + Spring Boot (hypermedia-driven), j2html (type-safe HTML builder) và PrimeFaces (thư viện 100+ component cho Jakarta EE). Desktop UI có JavaFX (tiêu chuẩn hiện đại với CSS styling), JCEF (wrapper Chromium), Swing với FlatLaf (được làm mới), và Eclipse RCP/NetBeans Platform cho ứng dụng mô-đun phức tạp. Mobile có Codename One (write-once-run-anywhere, cloud builds, không cần Mac cho iOS) và Gluon Mobile (mở rộng JavaFX với GraalVM). Terminal có JLine (console input) và Lanterna (GUI toolkit cho terminal).

Insights quan trọng: Java UI ecosystem mạnh mẽ và production-ready, không còn là legacy technology. Frameworks hiện đại tập trung vào developer experience, type safety và native performance. Java vẫn là lựa chọn hàng đầu cho enterprise applications nhờ tính ổn định và hiệu năng, với sự phân biệt rõ ràng giữa server-driven (Vaadin), client-side (TeaVM) và hybrid approaches.

**Điểm chính:**
- Java UI production-ready: không phải legacy, đang chạy tại doanh nghiệp lớn
- Web UI đa dạng: từ server-driven (Vaadin) đến client-side (TeaVM)
- Desktop hiện đại: JavaFX là tiêu chuẩn, Swing được hồi sinh với FlatLaf
- Mobile thực tế: Codename One và Gluon Mobile giúp viết Java cho iOS/Android
- Terminal UI: JLine và Lanterna cho console applications

## [Java Full Stack Development in 2026](https://www.ophion.org/2026/02/java-full-stack-development-in-2026/)

Tác giả chia sẻ kinh nghiệm chuyển đổi ứng dụng www.scanii.com từ stack webpack+TypeScript+Spring Boot truyền thống sang kiến trúc đơn giản hơn với server-side rendering, đạt được nhiều cải thiện đáng kể: codebase được hợp nhất với đơn giản "Run" target trong IntelliJ, thời gian build frontend giảm xuống 0 với tự động reload, partial page rendering như SPA nhưng vẫn có thể dùng React nếu muốn, 100 điểm Lighthouse performance score, và dễ debug hơn không cần source maps hay transpilation.

Ba bước chính để di chuyển: Chọn template engine (tác giả dùng JTE vì có toàn bộ JDK trong template và view model map tốt với Page objects), loại bỏ bundler và sử dụng importmaps (chuẩn HTML) thay vì webpack/TypeScript, kết hợp với webjars để serve dependencies trực tiếp từ Spring Boot mà không cần CDN bên thứ ba. Cung cấp tính tương tác với Turbo và Stimulus từ Hotwire.dev (theo hướng dẫn của Rails) để đạt automatic partial page updates và familiar MVC framework cho JavaScript vẫn cần thiết.

Pain points và giải pháp: Thiếu HOT Reloading được giải quyết bằng logic tối giản client-side (poll server changes) và server-side (monitor filesystem changes), nhanh hơn solution frontend trước đó. CSRF protection trở nên phức tạp với server-side rendering vì Spring Security relied on random tokens trong mỗi form, gây vấn đề với Turbo page caching. Tác giả build custom CSRF filter dựa trên header Sec-Fetch-Site, không cần tokens trong templates hay issues với partial page reloads.

**Điểm chính:**
- Server-side rendering: codebase hợp nhất, build time 0, debug dễ dàng hơn
- Importmaps thay vì bundler: theo chuẩn HTML, kết hợp webjars serve dependencies từ Spring Boot
- Turbo + Stimulus: partial page updates như SPA mà không cần React
- CSRF custom filter: dùng Sec-Fetch-Site header thay vì tokens
- Small teams: phù hợp cho team generalist thay vì specialized teams

## [Sharding Databases with Spring Boot: Patterns, Pitfalls, and Failure Modes](https://dev.to/adamthedeveloper/sharding-databases-with-spring-boot-patterns-pitfalls-and-failure-modes-4p37)

Hướng dẫn chi tiết về triển khai sharding database sử dụng Spring Boot - kỹ thuật phân tán dữ liệu quan trọng để giải quyết vấn đề hiệu quả và khả năng mở rộng của các ứng dụng lớn. Bài viết đề cập các pattern chính: Sharding theo chiều ngang (phân tán dữ liệu dựa trên trường cụ thể như user ID đến nhiều database/table khác nhau), Sharding theo chiều dọc (phân tán theo logic kinh doanh, mỗi shard xử lý nhóm chức năng riêng), và Sharding logic sử dụng thuật toán hash modulo để định tuyến dữ liệu đến shard phù hợp.

Các vấn đề và lỗi phổ biến khi sharding: SQL không tương thích vì các truy vấn hoạt động tốt trên database đơn có thể lỗi trên hệ thống sharding, distributed transaction dựa trên XA không đảm bảo hiệu quả trong môi trường cao đồng thời, độ phức tạp quản lý tăng lên khi phải xác định database/table để truy xuất dữ liệu, và thách thức truy vấn chéo khi cần kết hợp giữa các shard yêu cầu tổng hợp dữ liệu. Giới hạn số lượng shard quan trọng vì quá nhiều shard dẫn đến hiệu suất kém do tổng hợp dữ liệu.

Khuyến nghị và thực hành tốt nhất: Ưu tiên transaction đơn database, có thể sử dụng transaction cục bộ trong cùng database để tránh distributed transaction. Cẩn thận với phụ thuộc phiên bản vì lỗi tương thích giữa Spring Boot và ShardingSphere thường gặp. Cấu hình minh bạch sử dụng Spring Boot Starter để quản lý cấu hình sharding hiệu quả. Theo dõi hiệu suất để đảm bảo việc sharding thực sự cải thiện hiệu suất không gây thêm độ trễ.

**Điểm chính:**
- Ba pattern sharding: ngang (theo trường), dọc (theo logic), logic (hash modulo)
- Pitfalls phổ biến: SQL không tương thích, XA transaction kém hiệu quả, độ phức tạp tăng
- Cross-shard queries: thách thức tổng hợp dữ liệu từ nhiều shard
- Giới hạn shard: quá nhiều shard làm giảm hiệu suất do tổng hợp
- Transaction cục bộ: ưu tiên single-DB transaction thay vì distributed

## [Go Made Me Fast, Rust Made Me Care, AWS Made Me Pay](https://dev.to/tirixa-hub/go-made-me-fast-rust-made-me-care-aws-made-me-pay-2f82)

Bài viết thảo luận về lựa chọn ngôn ngữ lập trình cho kiến trúc cloud, tập trung vào sự đánh đổi giữa Go và Rust khi hệ thống phát triển từ "hợp lý" thành "đắt tiền". Tác giả chia sẻ kinh nghiệm thực tế về sự khác biệt giữa hai ngôn ngữ trong bối cảnh AWS, nơi chi phí được tính theo chu kỳ CPU, lượng bộ nhớ và lưu lượng mạng.

Go giúp phát triển nhanh với mô hình đồng trình đơn giản, thư viện chuẩn mạnh mẽ và dự đoán được. Tuy nhiên bộ thu gom rác (GC) của Go trở thành điểm yếu khi hệ thống mở rộng - nó yêu cầu bộ nhớ phụ, tiêu tốn CPU và gây độ trễ không đáng tin cậy. Rust không phải là phép màu tốc độ, mà buộc nhà phát triển phải đối mặt với các vấn đề cấp thấp như phân bổ bộ nhớ, sở hữu dữ liệu và hành vi cache. Điều này dẫn đến thiết kế hệ thống hiệu quả hơn với bộ nhớ ổn định, độ trễ nhất quán và mật độ container cao hơn.

AWS đóng vai trò như thực tế khắc nghiệt - nó không quan tâm đến trải nghiệm nhà phát triển, chỉ tính phí theo tài nguyên sử dụng. Sự khác biệt chi phí không nằm ở ngôn ngữ mà ở hiệu quả sử dụng tài nguyên. Bài học quan trọng: Go vẫn hoàn hảo cho API và logic nghiệp vụ, trong khi Rust phù hợp cho đường dẫn dữ liệu cao throughput. Điểm ngọt ngào là sử dụng cả hai ngôn ngữ một cách có chủ đích, với Rust trong các phần nhạy cảm hiệu năng để tối ưu hóa hóa đơn AWS.

**Điểm chính:**
- Go nhanh phát triển: GC đơn giản, thư viện mạnh, nhưng GC overhead khi scale
- Rust ép tư duy: đối mặt vấn đề cấp thấp, thiết kế hiệu quả hơn, bộ nhớ ổn định
- AWS tính phí thực tế: không quan tâm DX, chỉ tính CPU/memory/network
- Hybrid approach: Go cho API/business logic, Rust cho high-throughput data paths
- Sweet spot: Rust tối ưu phần nhạy cảm hiệu năng để giảm hóa đơn AWS

## [The Cloud Is Not Your Computer: Why Go and Rust Developers Secretly Miss the Monolith](https://dev.to/tirixa-hub/the-cloud-is-not-your-computer-why-go-and-rust-developers-secretly-miss-the-monolith-594c)

Bài viết phân tích sự thật rằng đám mây không phải là máy tính của bạn mà là một cuộc đàm phán phức tạp. Tác giả trải nghiệm qua nhiều nền tảng từ bare metal đến AWS và nhận ra rằng dù viết code Go hay Rust cảm thấy kiểm soát được thì khi triển khai lên cloud, mọi thứ trở nên bất định. Sự khác biệt chính giữa cloud và máy tính cục bộ là: máy tính cục bộ cho cảm giác kiểm soát trực tiếp, còn cloud khiến bạn đang thuê xác suất chứ không phải chạy phần mềm.

Go - ngôn ngữ của những người lạc quan - thừa nhận thất bại như một giá trị, trong khi Rust - ngôn ngữ của những người kiểm soát cực đoan - đòi hỏi sự chính xác biên dịch. Các nhà phát triển trầm trồ kiến trúc monolith vì chúng có thể dự đoán, triển khai và hiểu được. Khi có lỗi, họ chỉ cần SSH vào một máy, kiểm tra log và sửa. Ngày nay họ phải mở nhiều công cụ giám sát khác nhau mà vẫn không hiểu tại sao 503 xảy ra.

Bài học rút ra là Go và Rust đang phát triển mạnh trong cloud vì chúng là ngôn ngữ trung thực trong môi trường không trung thực. Go đón nhận thất bại như một giá trị, Rust thực thi sự chính xác tại thời điểm biên dịch. Đám mây là hỗn loạn, còn Go và Rust là kỷ luật. Sự căng thẳng đó chính là lý do chúng thuộc về nhau. Cloud là về quản lý sự bất định, không phải kiểm soát - và Go, Rust là công cụ tốt nhất để điều hướng sự bất định đó.

**Điểm chính:**
- Cloud vs máy tính: cloud là thuê xác suất, không phải chạy phần mềm
- Monolith đáng nhớ: dự đoán được, SSH vào máy để debug, dễ hiểu
- Microservices chaos: nhiều công cụ giám sát, vẫn không hiểu tại sao 503
- Go lạc quan: thừa nhận thất bại như giá trị, handle gracefully
- Rust kiểm soát: thực thi chính xác tại compile, catch errors sớm

### Bonus

**Hình ảnh:**
![Must-Know Software Architecture Patterns](https://substackcdn.com/image/fetch/$s_!V-F7!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F57c857fb-0db2-4701-93f7-343fac614657_2250x2862.png)

---

*Bài viết đã được review và cập nhật bởi Claude Code với Opus 4.7 (1M context).*
