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

Bài viết trên Dev.to tổng hợp các thực hành tốt khi ghi log cho ứng dụng Java. Tác giả khuyên dùng SLF4J làm lớp trừu tượng kết hợp với Logback, để có thể đổi thư viện ghi log bên dưới mà không phải sửa mã nguồn, đồng thời giải thích cách chọn đúng cấp log từ TRACE đến FATAL nhằm tránh vừa bỏ sót lỗi quan trọng vừa làm nhiễu hệ thống cảnh báo. Bài cũng hướng dẫn ghi log có cấu trúc dưới dạng JSON với logstash-logback-encoder và dùng MDC để tự động gắn thông tin ngữ cảnh như mã yêu cầu hay mã người dùng vào mọi dòng log.

Phần sau tập trung vào hiệu năng và vận hành: dùng appender bất đồng bộ, tránh tính toán tốn kém trong câu lệnh log và trì hoãn việc tạo thông điệp bằng biểu thức lambda. Về bảo mật, tác giả nhấn mạnh việc che dữ liệu nhạy cảm như số thẻ tín dụng hay mật khẩu. Cuối cùng, bài giới thiệu cách gom log tập trung bằng ELK hoặc Graylog và thiết lập xoay vòng, lưu giữ log theo thời gian để không làm đầy ổ đĩa.

## [Fixed Window Counter Rate Limiter (Redis & Java)](https://foojay.io/today/fixed-window-counter-rate-limiter-redis-java/)

Bài viết trên foojay.io hướng dẫn xây dựng bộ giới hạn tần suất yêu cầu theo thuật toán bộ đếm cửa sổ cố định bằng Redis và Java. Thuật toán chia thời gian thành các khoảng cố định, đếm số yêu cầu trong mỗi khoảng và từ chối khi vượt ngưỡng; ưu điểm là đơn giản, nhưng có thể bị dồn yêu cầu tại ranh giới giữa hai cửa sổ. Phần cài đặt dùng Jedis với mỗi khách hàng một khóa riêng: đọc bộ đếm bằng GET, sau đó trong một giao dịch MULTI/EXEC tăng bộ đếm bằng INCR và đặt thời hạn bằng EXPIRE với cờ NX, để thời hạn chỉ được gán khi khóa vừa được tạo và cửa sổ không bị kéo dài sau mỗi yêu cầu.

Bài cũng trình bày cách kiểm thử với Redis TestContainers, JUnit 5 và AssertJ, bao quát các trường hợp: yêu cầu trong giới hạn được chấp nhận, yêu cầu vượt giới hạn bị từ chối, bộ đếm được đặt lại khi cửa sổ hết hạn, các khách hàng có bộ đếm độc lập và yêu cầu bị từ chối không bị tính thêm vào bộ đếm.

## [How JVM handles exceptions](https://foojay.io/today/how-jvm-handles-exceptions/)

Bài viết trên foojay.io giải thích cơ chế xử lý ngoại lệ bên trong máy ảo Java (JVM) ở mức bytecode. Mỗi phương thức có một bảng ngoại lệ, trong đó mỗi dòng xác định một khoảng lệnh được bảo vệ (from, to), vị trí nhảy tới để xử lý (target) và kiểu ngoại lệ cần bắt, hoặc "any" đối với khối finally. Khi gặp lệnh athrow, JVM lấy đối tượng ngoại lệ khỏi ngăn xếp toán hạng rồi tra bảng này để tìm trình xử lý phù hợp; nếu không tìm thấy, nó lần ngược lên các khung gọi hàm cho đến khi gặp trình xử lý hoặc chương trình kết thúc.

Tác giả cũng phân tích cách trình biên dịch chuyển khối try-catch-finally thành bytecode: khối catch và khối finally có các dòng riêng trong bảng ngoại lệ, và các dòng kiểu "any" bảo đảm finally luôn được thực thi, kể cả khi ngoại lệ phát sinh ngay trong khối catch. Đây là bài đọc hữu ích nếu bạn muốn hiểu điều gì thực sự diễn ra khi một ngoại lệ được ném ra.

## [Database Sharding Explained](https://architecturenotes.co/p/database-sharding-explained)

Bài viết trên Architecture Notes giải thích sharding, kỹ thuật chia dữ liệu ra nhiều máy khi một máy chủ cơ sở dữ liệu không còn đáp ứng được tải. Trước khi sharding, tác giả khuyên cân nhắc các phương án đơn giản hơn: không làm gì nếu chưa có điểm nghẽn rõ ràng, nâng cấp phần cứng theo chiều dọc, nhân bản dữ liệu để tăng khả năng đọc, hoặc chuyển bớt dữ liệu sang các hệ thống chuyên dụng như Elasticsearch cho tìm kiếm hay S3 cho tệp lớn.

Bài tiếp tục trình bày ba cách sharding: dựa trên hàm băm của khóa (phân bố đều nhưng khó chia lại), dựa trên khoảng giá trị (cần bảng tra cứu và khóa có độ phân tán tốt để tránh điểm nóng), và dựa trên quan hệ (giữ dữ liệu liên quan trên cùng một shard). Tác giả làm rõ vai trò của khóa shard, phân biệt shard logic với shard vật lý, và giải thích vì sao giao dịch trải trên nhiều shard cần giao thức cam kết hai pha, kéo theo chi phí ghi thêm và độ phức tạp đáng kể. Thông điệp chính là sharding giúp mở rộng quy mô nhưng đổi lại gánh nặng vận hành rất lớn.

## [Protecting your time from predators in large tech companies](https://www.seangoedecke.com/predators/)

Trong bài viết này, Sean Goedecke cảnh báo các kỹ sư giỏi ở công ty công nghệ lớn về những người liên tục tìm cách chiếm thời gian của họ, mà ông gọi là "kẻ săn mồi". Có hai nhóm điển hình: quản lý sản phẩm ở bộ phận khác nhắn tin riêng nhờ "sửa nhanh một chút" để né quy trình ưu tiên chính thức, và những kỹ sư yếu thường xuyên nhờ giúp đỡ thay cho việc tự học, lấy công sức của người khác mà không ghi nhận lại.

Để tự bảo vệ, tác giả khuyên nhận diện những yêu cầu bất cân xứng, tức người hỏi bỏ ra rất ít công sức nhưng bạn phải làm rất nhiều, và đáp lại với mức công sức tương xứng. Nên đưa các yêu cầu ra kênh công khai thay vì tin nhắn riêng để công sức được ghi nhận và quản lý nắm được. Ông cũng lưu ý phân biệt các trường hợp chính đáng: hỗ trợ quản lý, cấp dưới hay kỹ sư mới đang học việc vẫn là trách nhiệm của bạn. Điều quan trọng nhất là nhớ rằng hoàn thành dự án mới là công việc chính.

## [How to improve your WFH lighting to reduce eye strain](https://rustle.ca/posts/articles/work-from-home-lighting)

Bài viết trên rustle.ca chia sẻ cách bố trí ánh sáng khi làm việc tại nhà để giảm mỏi mắt. Tác giả chỉ ra ba nguyên nhân chính: màn hình nhấp nháy mà mắt không nhận ra, nhất là khi giảm độ sáng và màn hình là nguồn sáng duy nhất; môi trường có độ tương phản cao như ánh nắng chói từ cửa sổ hay phòng sáng tối không đều; và việc nhìn ở một khoảng cách cố định quá lâu. Với nguyên nhân cuối, tác giả gợi ý quy tắc 20/20/20: cứ 20 phút lại nhìn vào vật cách khoảng 20 feet (khoảng 6 mét) trong ít nhất 20 giây.

Các lời khuyên cụ thể gồm tận dụng tối đa ánh sáng tự nhiên, dùng rèm mỏng để khuếch tán nắng thay vì chắn hoàn toàn, bố trí nhiều nguồn sáng gián tiếp khắp phòng để tránh vùng tối, chọn bóng đèn có thể điều chỉnh độ sáng, không nhấp nháy, chỉ số hoàn màu (CRI) cao và nhiệt độ màu ấm khoảng 2700K, đồng thời dùng đèn bàn hoặc đèn hắt sau màn hình có độ sáng tương đương màn hình.

## [Working fast and slow](https://www.seangoedecke.com/working-fast-and-slow/)

Sean Goedecke chia sẻ rằng năng suất không đều không phải là vấn đề cần khắc phục, và ông chủ động làm việc theo hai trạng thái. Khi đang tập trung cao độ, những việc phức tạp trở nên dễ dàng, nên ông dồn sức cho các nhiệm vụ có tác động lớn, hạn chế mọi xao nhãng và có thể làm việc nhiều giờ liền. Tuy nhiên, trạng thái này tiêu hao một nguồn năng lượng nội tại có hạn và cần thời gian để phục hồi.

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

*Bài viết đã được viết lại bởi Claude Code với Opus 5.5 vào ngày 27/09/2026.*
