---
title: "Newsletter #77"
date: 2026-01-24
tags: ["AI-Assisted", "Newsletter", "Java", "Go", "Kotlin", "Rust", "Error Handling"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #77.*

## [Đừng Chuyển Tiếp Lỗi, Hãy Thiết Kế Chúng](https://fast.github.io/blog/stop-forwarding-errors-start-designing-them/)

Bài viết cho rằng phần lớn lập trình viên Rust đang "chuyển tiếp" lỗi chứ không thực sự xử lý chúng: bắt lỗi, bọc sơ sài rồi đẩy ngược lên càng nhanh càng tốt. Thông điệp gốc còn nguyên nhưng ngữ cảnh thì mất gần hết. Tác giả chỉ ra giới hạn của các công cụ quen thuộc: `std::error::Error` giả định chuỗi nguyên nhân tuyến tính qua `source()` dù sự cố thực tế thường có nhiều nguyên nhân; stack trace tốn kém, dễ gây hiểu nhầm trong mã bất đồng bộ và chỉ cho biết lỗi phát sinh ở đâu chứ không cho biết luồng xử lý đã đi qua đâu. `thiserror` phân loại lỗi theo nguồn gốc thay vì theo việc người gọi có thể làm gì, `anyhow` biến việc thêm ngữ cảnh thành tùy chọn nên thường bị bỏ qua, còn API Provide/Request dựa vào kiểu động nên khó đoán.

Giải pháp được đề xuất là thiết kế lỗi cho hai đối tượng. Với máy móc, hãy dùng cấu trúc lỗi phẳng, phân loại theo loại lỗi (tương tự thiết kế của Apache OpenDAL) kèm trạng thái rõ ràng như vĩnh viễn, tạm thời hay kéo dài, để chương trình quyết định thử lại hay dừng mà không phải lần theo chuỗi lỗi lồng nhau. Với con người, hãy dùng cơ chế theo dõi ngữ cảnh dạng cây, tự động ghi lại vị trí nhờ `#[track_caller]` với chi phí gần như bằng không, và buộc phải bổ sung ngữ cảnh tại ranh giới module thông qua hệ thống kiểu (như thư viện `exn`). Câu hỏi nên đặt ra khi thiết kế lỗi là: "Nếu hệ thống hỏng lúc 3 giờ sáng, bạn muốn nhật ký ghi gì?"

## [Đồng Bộ Hóa Thời Gian Là Cơn Ác Mộng](https://arpitbhayani.me/blogs/clock-sync-nightmare/)

Bài viết giải thích vì sao đồng bộ thời gian trong hệ thống phân tán khó hơn nhiều so với trực giác: đơn giản là không tồn tại một "đồng hồ toàn cục". Mỗi máy tính đếm giờ bằng tinh thể thạch anh dao động ở tần số 32768 Hz, nhưng sai số chế tạo và biến động nhiệt độ khiến đồng hồ bị trôi (drift); hai máy khởi động cùng lúc có thể lệch nhau hàng trăm mili-giây chỉ sau một ngày. Độ lệch tức thời giữa hai đồng hồ (skew) gây ra lỗi khó phát hiện: với make chạy phân tán, tệp đã biên dịch có thể trông mới hơn tệp nguồn vừa sửa nên không được biên dịch lại; trong ngân hàng, giao dịch rút tiền mang dấu thời gian sớm hơn giao dịch nộp tiền có thể khiến tài khoản trông như bị âm.

Nhóm đồng bộ theo thời gian vật lý gồm thuật toán Cristian (ước lượng độ trễ mạng bằng một nửa thời gian khứ hồi), thuật toán Berkeley (các máy lấy trung bình rồi gửi mức điều chỉnh tương đối), NTP phân tầng từ đồng hồ nguyên tử/GPS, đạt độ chính xác cỡ mili-giây qua internet, và PTP dùng đánh dấu thời gian bằng phần cứng ở card mạng để đạt độ chính xác dưới micro-giây. TrueTime của Google Spanner trả về một khoảng thời gian bất định thay vì một mốc duy nhất. Nhóm đồng hồ logic gồm Lamport Timestamps, Vector Clocks nắm bắt quan hệ nhân quả thay cho thời gian thực, và đồng hồ logic lai (dùng trong CockroachDB) kết hợp cả hai. Kết luận: không có đồng bộ hoàn hảo, chỉ có sự đánh đổi giữa độ chính xác, độ trễ và độ phức tạp tùy yêu cầu từng hệ thống.

## [Roadmap Học Java](https://nemorize.com/roadmaps/java)

Đây là lộ trình học Java có cấu trúc trên nền tảng Nemorize, dẫn người học đi từ nền tảng đến phát triển ứng dụng doanh nghiệp. Lộ trình bắt đầu với phần chuẩn bị như Linux cơ bản, quản lý phiên bản bằng Git và chọn IDE, sau đó chuyển sang lập trình hướng đối tượng (lớp, đối tượng, kế thừa, đa hình, đóng gói, trừu tượng), rồi đến phần lõi của ngôn ngữ gồm Collections Framework, xử lý ngoại lệ và Streams. Các chủ đề nâng cao bao gồm lập trình đồng thời và đa luồng, cơ chế bên trong JVM, mẫu thiết kế và Dependency Injection.

Phần cuối tập trung vào kỹ năng làm việc chuyên nghiệp: kiểm thử (đơn vị, tích hợp, hợp đồng), công cụ xây dựng như Maven và Gradle, làm việc với cơ sở dữ liệu, Spring Boot cho ứng dụng doanh nghiệp, cùng các nguyên tắc Clean Code, SOLID, thiết kế API và giám sát hệ thống. Mỗi chủ đề được học theo ba bước: đọc bài, luyện tập bằng câu hỏi và theo dõi tiến độ (cần đăng nhập). Tại thời điểm viết, khoảng 14 trên 44 chủ đề đã có bài học, số còn lại đang được bổ sung dần, nên đây là một khung tham khảo hữu ích cho người mới muốn biết nên học Java theo thứ tự nào.

## [Hướng Dẫn Toàn Diện Triển Khai Kotlin Trong Môi Trường Java](https://blog.jetbrains.com/kotlin/2025/12/the-ultimate-guide-to-successfully-adopting-kotlin-in-a-java-dominated-environment/)

Hướng dẫn của JetBrains nhìn nhận việc đưa Kotlin vào một công ty chủ yếu dùng Java không phải chuyện bật công tắc hay viết lại toàn bộ hệ thống, mà là bài toán về con người, thời điểm, rủi ro và niềm tin. Lộ trình gồm năm giai đoạn. Đầu tiên, làm quen với Kotlin qua bộ kiểm thử (dùng Kotest, MockK) để không ảnh hưởng môi trường production, đồng thời trả lời câu hỏi "làm việc với ngôn ngữ này có dễ chịu hơn không?". Tiếp theo, đánh giá Kotlin trong dự án thật bằng cách viết một dịch vụ mới hoặc thêm module Kotlin vào hệ thống sẵn có, và tránh cái bẫy "viết Java bằng cú pháp Kotlin": hãy dùng hàm mở rộng thay cho lớp tiện ích tĩnh, kiểu nullable thay cho Optional, data class thay cho mã rườm rà.

Giai đoạn thứ ba là xây dựng sự ủng hộ nội bộ qua các buổi trình diễn ngắn, kho mã khởi đầu mẫu và lập trình cặp. Giai đoạn thứ tư là thuyết phục cấp quản lý bằng ngôn ngữ kinh doanh: ít mã hơn để bảo trì, ít lỗi hơn nhờ an toàn null, tương thích hoàn toàn với Java nên không phải viết lại, và chi phí đào tạo dễ dự đoán. Cuối cùng, khi mở rộng ra toàn tổ chức, hãy xử lý từng hệ thống theo vòng đời: để yên ứng dụng sắp ngừng dùng, mặc định dùng Kotlin cho dự án mới và chuyển đổi dần các hệ thống đang hoạt động, với sự hỗ trợ của công cụ chuyển đổi trong IDE, chú thích an toàn null JSpecify và tái cấu trúc có AI hỗ trợ.

## [So Sánh Rust và Go Năm 2026](https://bitfieldconsulting.com/posts/rust-vs-go)

Bài viết so sánh Rust và Go trên nhiều khía cạnh như hiệu năng, sự đơn giản, độ an toàn, tính năng, khả năng mở rộng và lập trình đồng thời, và tóm gọn bằng câu: "Rust cho những việc hệ trọng, Go cho chi phí thấp". Cả hai đều là ngôn ngữ biên dịch, tạo ra tệp thực thi nhỏ gọn, nhanh và có bộ công cụ tốt (gofmt, rustfmt). Khác biệt nằm ở triết lý: Go là ngôn ngữ nhỏ, dễ học, biên dịch nhanh, dùng bộ thu gom rác và ưu tiên tốc độ phát triển cùng tính ổn định; goroutine và channel giúp lập trình đồng thời trở nên rất dễ dàng. Rust ưu tiên tính đúng đắn, hiệu năng và quyền kiểm soát cấp thấp, dùng borrow checker để chặn lỗi bộ nhớ ngay khi biên dịch và không cần bộ thu gom rác, đổi lại người học phải bỏ nhiều công sức hơn.

Về xử lý lỗi, Go dùng kiểm tra tường minh `if err != nil`, còn Rust dùng các kiểu `Option`/`Result` kết hợp toán tử `?`. Go phù hợp khi cần làm quen nhanh, dựng nguyên mẫu nhanh và tiết kiệm chi phí, như dịch vụ web, microservice, công cụ hạ tầng hay tự động hóa nghiệp vụ. Rust tỏa sáng khi độ tin cậy, hiệu năng và sử dụng tài nguyên hiệu quả là yếu tố sống còn, như ô tô, hàng không, thiết bị y tế hay tự động hóa công nghiệp. Tác giả xem hai ngôn ngữ là công cụ bổ trợ nhau chứ không đối đầu, và với câu hỏi "nên học Rust hay Go?" thì câu trả lời là học cả hai.

## [Dependency Phổ Biến Nhất Trong Go Là Gì?](https://blog.thibaut-rousseau.com/blog/the-most-popular-go-dependency-is/)

Tác giả tìm câu trả lời cho câu hỏi thư viện nào được phụ thuộc nhiều nhất trong hệ sinh thái Go bằng cách tận dụng hạ tầng proxy tập trung của Go. Thay vì sao chép từng kho mã, tác giả tải toàn bộ chỉ mục từ index.golang.org (danh sách mọi phiên bản module được công bố từ khi có Go proxy năm 2019), lấy tệp go.mod của từng module qua proxy.golang.org để trích xuất phụ thuộc, rồi nạp tất cả vào cơ sở dữ liệu đồ thị Neo4j. Kết quả là một đồ thị khoảng 40 triệu nút và 400 triệu quan hệ, cho thấy trung bình mỗi module Go có 10 phụ thuộc trực tiếp.

Đứng đầu bảng xếp hạng là testify với 259.237 module phụ thuộc, bỏ xa các vị trí tiếp theo: google/uuid (104.877), golang.org/x/crypto (100.633), grpc (97.228), cobra (93.062), pkg/errors (92.491), golang.org/x/net, protobuf, logrus và viper. Nhóm thư viện kiểm thử và tiện ích chiếm ưu thế, các gói mở rộng của thư viện chuẩn (golang.org/x/) cũng giữ vị trí vững chắc. Đáng chú ý, pkg/errors dù đã ngừng phát triển từ lâu nhưng riêng phiên bản v0.9.1 vẫn có 16.001 module phụ thuộc bắc cầu trong năm 2025. Bài viết cũng minh họa cách truy vấn Neo4j bằng Cypher để tìm phụ thuộc trực tiếp và bắc cầu, chứng minh cơ sở dữ liệu đồ thị rất hợp cho kiểu phân tích này. Tác giả chia sẻ bản dump dữ liệu qua BitTorrent để cộng đồng tự truy vấn và dự định bổ sung thêm thông tin như số sao GitHub.

## [go.sum Không Phải Lockfile](https://words.filippo.io/gosum/)

Filippo Valsorda làm rõ một hiểu lầm phổ biến: nhiều người coi go.sum là lockfile giống package-lock.json của Node hay Cargo.lock của Rust, nhưng thực chất go.sum chỉ là bộ nhớ đệm cục bộ của Go Checksum Database, tức một bảng ánh xạ từ phiên bản module sang mã băm mật mã của nó. Các phiên bản ghi trong go.sum có thể được dùng hoặc không, và tệp này hoàn toàn không tham gia vào việc chọn phiên bản; trong thiết kế module ban đầu nó thậm chí không được bật mặc định vì không ảnh hưởng gì đến kết quả xây dựng. Vai trò duy nhất của go.sum là bảo mật: Checksum Database đảm bảo cả hệ sinh thái nhận cùng một nội dung cho mỗi phiên bản module, và go.sum giúp đảm bảo đó hoạt động cục bộ, tự chứa.

Tệp cần nhìn vào là go.mod, vốn vừa là manifest vừa là lockfile. Từ Go 1.17 (tháng 8/2021), go.mod liệt kê mọi phụ thuộc bắc cầu cần thiết để xây dựng module chính và chạy kiểm thử, kèm phiên bản chính xác, trong một tệp duy nhất con người đọc được. Nhờ vậy Go tránh được xung đột phụ thuộc hình kim cương, không vô tình dùng tính năng mà phụ thuộc của bạn chưa có, và không tự động kéo phiên bản mới nhất (có thể đã bị xâm phạm) khi thêm phụ thuộc mới; việc phân giải gói diễn ra gần như tức thời đến mức không ai để ý. Để phân tích đồ thị phụ thuộc, hãy đọc go.mod bằng gói golang.org/x/mod/modfile hoặc lệnh `go mod edit -json`, và đừng bao giờ phân tích go.sum.

## [Phát Triển Thông Báo Actions Cho Forgejo](https://chris-besch.com/articles/forgejo_actions_notification/)

Christopher Besch chia sẻ kinh nghiệm đóng góp cho Forgejo, một nền tảng quản lý mã nguồn tự triển khai tương tự GitHub/GitLab. Tác giả cần tính năng gửi email và webhook khi quy trình CI thất bại nhưng Forgejo chưa có, nên tự tay xây dựng. Bài viết giải thích cách dự án Go tổ chức mã bằng module (qua go.mod) và package, không có kho gói trung tâm như NPM, rồi đi vào kiến trúc phân lớp của Forgejo gồm `/routers` (API và giao diện web), `/services` (nghiệp vụ), `/models` (truy cập cơ sở dữ liệu) và `/modules` (thành phần tự chứa); mã ở lớp dưới không được nhập mã ở lớp trên. Để tránh phụ thuộc vòng tròn, Forgejo dùng mô hình publish-subscribe trong `forgejo.org/services/notify`: các package phát thông điệp vào một chủ đề, còn package khác đăng ký lắng nghe chủ đề đó.

Tính năng được chia thành bốn pull request để dễ xem xét: PR #7510 chuyển mã từ `/models/actions` sang `/services/actions` cho đúng kiến trúc, PR #7491 thêm chủ đề `ActionRunNowDone` vào hệ thống pub-sub, PR #7509 cho dịch vụ gửi thư đăng ký chủ đề này để báo khi quy trình thất bại hoặc phục hồi, và PR #7508 gửi webhook. Tác giả cũng kể việc phải đổi tên struct do xung đột với một thay đổi song song. Phần cuối hướng dẫn dựng môi trường phát triển: biên dịch Forgejo kèm thông tin gỡ lỗi, chạy Forgejo Runner, máy chủ thư MailDev trong Docker, một script Node.js để nhận webhook, cùng cách chạy kiểm thử đơn vị, kiểm thử tích hợp và gỡ lỗi bằng Delve. Theo tác giả, viết kiểm thử đầy đủ là chìa khóa để người duy trì dự án tin tưởng mã đóng góp.

### Bonus

**Hình ảnh:**

![Message Brokers 101](https://substackcdn.com/image/fetch/w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F3ec94ed4-46b2-40bd-8d28-a25fdde639c8_2250x2624.png)
![Cloud Load Balancer Cheat Sheet](https://substackcdn.com/image/fetch/$s_!hXRV!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fe99863c7-7ab7-4f61-9961-af7e4c6ee64f.png)
![How CQRS Works?](https://substackcdn.com/image/fetch/$s_!XvtW!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F1ded3402-4eb5-4818-861f-7661f1cefe82.tif)
![How does Docker Work?](https://substackcdn.com/image/fetch/$s_!SUjA!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd91a5538-a69e-468c-bf83-058bb78753ca_2360x2770.png)
![Containerization Explained: From Build to Runtime](https://substackcdn.com/image/fetch/$s_!4qBZ!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff0945414-9cea-4e64-8dd4-3abcc404f73e_2360x2960.png)
![Must-Know Message Broker Patterns](https://substackcdn.com/image/fetch/$s_!n8BK!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa51a75cc-09a9-4fed-af8a-c32a64f8ab60_2250x2624.png)

---

*Bài viết đã được viết lại bởi Claude Code với Opus 5.5 vào ngày 27/09/2026.*
