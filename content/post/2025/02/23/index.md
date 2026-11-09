---
title: "Newsletter #3"
date: 2025-02-23
tags: ["AI-Assisted", "Newsletter", "Java", "JVM", "Redis", "Database Sharding", "Career"]
categories: [ "Newsletter" ]
---

<i>
Chào các bạn, lại một cuối tuần nữa trôi qua, mời các bạn chill chill cùng Newsletter #3 của MiTi.
</i>

## [Java's Plans for 2025 - Inside Java Newscast #83](https://www.youtube.com/watch?v=y26XGt8d_kI)

Tập Inside Java Newscast #83 do kênh Java chính thức phát hành điểm qua lộ trình của Java trong năm 2025 thông qua các dự án OpenJDK lớn: Babylon, Loom, Leyden, Lilliput, Panama và Valhalla. Với mỗi dự án, video tóm tắt những gì đã đạt được và những bước tiếp theo đang được lên kế hoạch; riêng dự án Amber được dành cho một tập khác. Đây là cách nhanh để bạn nắm được bức tranh tổng thể về hướng phát triển của ngôn ngữ và nền tảng Java.

## ~~[Why You Should Learn Kotlin in 2025](https://dev.to/empiree/why-you-should-learn-kotlin-in-2025-47g0)~~

~~Bài viết này trên Dev.to khuyến khích các nhà phát triển tìm hiểu Kotlin vào năm 2025, nhấn mạnh các tính năng hiện đại, khả năng tương tác với Java và các ứng dụng đa dạng của nó. Bài đăng này cũng thảo luận về thị trường việc làm và mức lương tiềm năng cho các nhà phát triển Kotlin.~~

## [Mastering Java Logging: Best Practices for Effective Application Monitoring](https://dev.to/nithinbharathwaj/mastering-java-logging-best-practices-for-effective-application-monitoring-20h7)

Bài viết tổng hợp thực hành ghi nhật ký cho ứng dụng Java, từ chọn thư viện đến vận hành. Tác giả đề xuất SLF4J kết hợp Logback, ghi dữ liệu có cấu trúc bằng JSON và gắn ngữ cảnh yêu cầu qua MDC. Cần phân biệt các mức độ của từng thư viện: với SLF4J/Logback, các mức ghi thông điệp là TRACE, DEBUG, INFO, WARN và ERROR; FATAL được nhắc trong bài không thuộc bộ mức này.

Phần vận hành bàn về ghi bất đồng bộ, xoay vòng tệp, giới hạn thời gian lưu và tập trung nhật ký bằng ELK hoặc Graylog. Để giảm chi phí, nên tránh tính toán nặng khi thông điệp không được ghi; với SLF4J 2, có thể truyền `Supplier` qua API chuỗi lời gọi để trì hoãn tính toán. Cú pháp lambda cần theo đúng API, thay vì áp dụng trực tiếp vào mọi lời gọi `debug`. Dữ liệu nhạy cảm cần được loại bỏ hoặc che trước khi ghi.

## [Fixed Window Counter Rate Limiter (Redis & Java)](https://foojay.io/today/fixed-window-counter-rate-limiter-redis-java/)

Bài viết hướng dẫn xây dựng bộ giới hạn tần suất bằng Redis và Java theo thuật toán bộ đếm cửa sổ cố định. Trong cài đặt Jedis, mỗi khách hàng có một khóa; cửa sổ bắt đầu từ yêu cầu đầu tiên và kết thúc khi khóa hết hạn. Chương trình đọc bộ đếm bằng GET rồi dùng MULTI/EXEC để tăng bằng INCR và đặt thời hạn bằng EXPIRE NX. Cờ NX chỉ đặt thời hạn khi khóa chưa có thời hạn, tránh kéo dài cửa sổ sau mỗi yêu cầu.

Bài kiểm thử ngưỡng yêu cầu, thời hạn và tính độc lập giữa khách hàng bằng Redis TestContainers, JUnit 5 và AssertJ. Tuy nhiên, bước đọc và kiểm tra nằm ngoài giao dịch, nên nhiều yêu cầu đồng thời vẫn có thể cùng thấy bộ đếm dưới ngưỡng rồi đều được chấp nhận. MULTI/EXEC trong ví dụ chỉ gom các lệnh ghi; muốn bảo đảm giới hạn khi có cạnh tranh, cần phối hợp cả bước kiểm tra và cập nhật, chẳng hạn bằng Lua hoặc WATCH kèm xử lý thử lại.

## [How JVM handles exceptions](https://foojay.io/today/how-jvm-handles-exceptions/)

Bài viết trên foojay.io giải thích cơ chế xử lý ngoại lệ bên trong máy ảo Java (JVM) ở mức bytecode. Phương thức có thể có bảng ngoại lệ, trong đó mỗi dòng xác định một khoảng lệnh được bảo vệ (from, to), vị trí nhảy tới để xử lý (target) và kiểu ngoại lệ cần bắt, hoặc "any" cho trình xử lý mọi kiểu ngoại lệ. Khi gặp lệnh athrow, JVM lấy đối tượng ngoại lệ khỏi ngăn xếp toán hạng rồi tra bảng này để tìm trình xử lý phù hợp; nếu không tìm thấy, nó lần ngược lên các khung gọi hàm. Nếu ngoại lệ không được bắt ở đâu trong chuỗi gọi, luồng đang chạy sẽ kết thúc sau bước xử lý ngoại lệ chưa được bắt.

Tác giả cũng phân tích cách trình biên dịch chuyển khối try-catch-finally thành bytecode. Trong ví dụ, mã finally xuất hiện trên đường chạy bình thường, còn các dòng "any" đưa luồng điều khiển qua finally khi ngoại lệ phát sinh trong try hoặc catch. Đây là cách giải thích cụ thể về vai trò của bảng ngoại lệ, thay vì coi finally là một lệnh đặc biệt của JVM.

## [Database Sharding Explained](https://architecturenotes.co/p/database-sharding-explained)

Bài viết trên Architecture Notes giải thích sharding, kỹ thuật chia dữ liệu ra nhiều máy khi một máy chủ cơ sở dữ liệu không còn đáp ứng được tải. Trước khi sharding, tác giả khuyên cân nhắc các phương án đơn giản hơn: không làm gì nếu chưa có điểm nghẽn rõ ràng, nâng cấp phần cứng theo chiều dọc, nhân bản dữ liệu để tăng khả năng đọc, hoặc chuyển bớt dữ liệu sang các hệ thống chuyên dụng như Elasticsearch cho tìm kiếm hay S3 cho tệp lớn.

Bài tiếp tục trình bày ba cách sharding: dựa trên hàm băm của khóa (phân bố đều nhưng khó chia lại), dựa trên khoảng giá trị (cần bảng tra cứu và khóa có độ phân tán tốt để tránh điểm nóng), và dựa trên quan hệ (giữ dữ liệu liên quan trên cùng một shard). Tác giả làm rõ vai trò của khóa shard, phân biệt shard logic với shard vật lý, rồi giới thiệu cam kết hai pha như một cách phối hợp giao dịch trên nhiều shard khi cần bảo đảm tính nguyên tử, với chi phí ghi thêm và độ phức tạp đáng kể. Thông điệp chính là sharding giúp mở rộng quy mô nhưng đổi lại gánh nặng vận hành rất lớn.

## [Protecting your time from predators in large tech companies](https://www.seangoedecke.com/predators/)

Trong bài viết này, Sean Goedecke cảnh báo các kỹ sư giỏi ở công ty công nghệ lớn về những người liên tục tìm cách chiếm thời gian của họ, mà ông gọi là "kẻ săn mồi". Có hai nhóm điển hình: quản lý sản phẩm ở bộ phận khác nhắn tin riêng nhờ "sửa nhanh một chút" để né quy trình ưu tiên chính thức, và những kỹ sư yếu thường xuyên nhờ giúp đỡ thay cho việc tự học, lấy công sức của người khác mà không ghi nhận lại.

Để tự bảo vệ, tác giả khuyên nhận diện những yêu cầu bất cân xứng, tức người hỏi bỏ ra rất ít công sức nhưng bạn phải làm rất nhiều, và đáp lại với mức công sức tương xứng. Nên đưa các yêu cầu ra kênh công khai thay vì tin nhắn riêng để công sức được ghi nhận và quản lý nắm được. Ông cũng lưu ý phân biệt các trường hợp chính đáng: hỗ trợ quản lý, cấp dưới hay kỹ sư mới đang học việc vẫn là trách nhiệm của bạn. Điều quan trọng nhất là nhớ rằng hoàn thành dự án mới là công việc chính.

## [How to improve your WFH lighting to reduce eye strain](https://rustle.ca/posts/articles/work-from-home-lighting)

Russell Baylis chia sẻ kinh nghiệm bố trí ánh sáng khi làm việc tại nhà để cảm thấy dễ chịu hơn. Đây là trải nghiệm cá nhân của một nhà thiết kế. Bài tập trung vào hiện tượng nhấp nháy ở một số màn hình, độ tương phản lớn giữa các vùng sáng tối và việc nhìn ở cùng khoảng cách quá lâu. Tác giả cũng nhắc quy tắc 20/20/20: cứ 20 phút nhìn ra vật cách khoảng 6 mét trong ít nhất 20 giây.

Qua ảnh trước và sau khi chỉnh góc làm việc, anh minh họa cách khuếch tán ánh sáng tự nhiên bằng rèm, bổ sung nguồn sáng gián tiếp và chiếu sáng phía sau màn hình để giảm chênh lệch sáng tối. Bài còn đề cập chất lượng bóng đèn, khả năng điều chỉnh độ sáng và việc nghỉ ngơi. Trọng tâm là môi trường có ánh sáng đều, phù hợp với người sử dụng, thay vì tăng độ sáng tối đa.

## [Working fast and slow](https://www.seangoedecke.com/working-fast-and-slow/)

Sean Goedecke chia sẻ rằng năng suất không đều không phải là vấn đề cần khắc phục, và ông chủ động làm việc theo hai trạng thái. Khi đang tập trung cao độ, những việc phức tạp trở nên dễ dàng, nên ông dồn sức cho các nhiệm vụ có tác động lớn, hạn chế mọi xao nhãng và có thể làm việc nhiều giờ liền. Ông ví trạng thái này như việc tiêu hao một nguồn lực cần thời gian phục hồi, dựa trên cảm nhận cá nhân.

Khi thiếu tập trung, ông chuyển sang các việc nhẹ hơn như xử lý những đầu việc dễ, đánh giá pull request hay hỗ trợ các dự án khác. Theo tác giả, cố gắng làm việc khó trong lúc thiếu tập trung chỉ sinh ra lỗi mà việc sửa còn tốn kém hơn cả việc chờ đợi, thậm chí gây đau đầu. Cách làm này cũng khớp với nhịp độ tự nhiên của các công ty công nghệ lớn, nơi xen kẽ những giai đoạn nhẹ nhàng và những dự án quan trọng cần dốc toàn lực.

## Bonus

### Bonus #1: Vài ảnh hay ho đến từ [ByteByteGo](https://bytebytego.com/)

![Top Strategies to Reduce Latency](https://substack-post-media.s3.amazonaws.com/public/images/fe9062b4-fd0e-4530-8e20-eea854b8490e_2250x2814.png)
![The Ultimate API Learning Roadmap](https://substack-post-media.s3.amazonaws.com/public/images/9c309ad3-78a8-4511-a6f2-e69c06d5c500_1280x1566.gif)
![10 Essential Components of a Production Web Application](https://substack-post-media.s3.amazonaws.com/public/images/a44f9f4b-193d-484e-bbf1-169751104380_1280x1568.gif)
![How do we design effective and safe APIs?](https://substack-post-media.s3.amazonaws.com/public/images/d5155be3-163d-479c-a75e-632e0f98dd36_3006x3453.jpeg)
![Code First v.s. API First](https://substack-post-media.s3.amazonaws.com/public/images/aad520f5-00d9-4606-af4b-fdb5d1ac63c4_1600x1483.png)
![Oauth 2.0 Explained With Simple Terms](https://substack-post-media.s3.amazonaws.com/public/images/bb375f63-bf06-4956-b3a3-914fd6aa2d91_1280x1664.jpeg)
![Session, Cookie, JWT, Token, SSO, and OAuth 2.0 Explained in One Diagram](https://substack-post-media.s3.amazonaws.com/public/images/c1155e03-c3dc-4192-8e05-e6b87dc6a574_1280x1664.gif)

### Bonus #2: Một vài link hay ho khác

- [Self-hosted Alternatives to Popular Software](https://openalternative.co/self-hosted)

---

*Bài viết đã được viết lại bởi Claude Code với Opus 5.5 vào ngày 27/09/2026; được review và chỉnh sửa bởi Codex với GPT 6.1 Sol vào ngày 09/11/2026.*
