---
title: "Newsletter #21"
date: 2025-05-08
tags: [ "AI-Assisted", "Java", "JVM", "Memory Management", "Spring Boot", "Garbage Collection", "Coding Standards", "AI", "Software Development", "Career Development", "Payment Systems", "Asynchronous Processing", "Concurrency", "Multithreading", "Interfaces", "Microservices" ]
categories: [ "Newsletter" ]
---

*Mời bạn thưởng thức Newsletter #21.*

## [How to Monitor JVM's Non-Heap Memory Usage](https://www.baeldung.com/java-jvm-monitor-non-heap-memory-usage)

Bài viết của Baeldung điểm qua các công cụ giúp theo dõi mức sử dụng bộ nhớ non-heap của JVM — phần bộ nhớ nằm ngoài heap như Metaspace, vùng dành cho trình biên dịch JIT, GC hay bộ đệm trực tiếp (direct buffer). Cách đơn giản nhất là dùng `jcmd`: sau khi bật Native Memory Tracking, lệnh `jcmd <pid> VM.native_memory` in ra lượng bộ nhớ đã đặt trước (reserved) và đã cấp phát thực tế (committed) cho từng vùng. Nếu thích giao diện đồ họa, jconsole có sẵn biểu đồ non-heap trong thẻ Memory, còn VisualVM hiển thị Metaspace và có thể cài thêm plugin MBeans, Buffer Pools để xem chi tiết từng vùng cũng như bộ đệm trực tiếp.

Khi cần phân tích sâu hơn, Java Mission Control cho phép xem tổng bộ nhớ non-heap qua MBean Browser (lưu ý con số này không tính bộ đệm trực tiếp), và từ Java 20 có thể ghi liên tục dữ liệu Native Memory Tracking bằng JFR để xem mức tiêu thụ theo từng loại bộ nhớ. Cuối cùng, JMX Exporter xuất số liệu của MemoryMXBean ra đường dẫn `/metrics` tương thích Prometheus, giúp đưa việc giám sát non-heap vào hệ thống giám sát sẵn có. Lời khuyên của tác giả: dùng `jcmd` hoặc jconsole cho trường hợp đơn giản, JFR kết hợp JMC khi cần chi tiết, và luôn tính đến chi phí tài nguyên mà chính các công cụ giám sát gây ra.


## [Unlocking the Power of Interfaces: Creative Approaches in Java](https://gainjavaknowledge.medium.com/unlocking-the-power-of-interfaces-creative-approaches-in-java-635f390a1e0d)

Bài viết trên Medium của Real World Java (Gain Java Knowledge) cho thấy interface trong Java không chỉ là một "hợp đồng" mà các lớp phải tuân theo, mà còn là công cụ giúp tách rời các thành phần, làm mã nguồn dễ mở rộng, dễ tái sử dụng và dễ bảo trì. Tác giả đi qua tám cách dùng interface sáng tạo, mở đầu bằng mẫu Strategy: định nghĩa một interface như `PaymentStrategy` cho một họ thuật toán, rồi hoán đổi các lớp cài đặt cụ thể (thanh toán bằng thẻ tín dụng, PayPal…) ngay lúc chạy. Tiếp theo là interface callback để bên được gọi có thể gọi ngược lại mã nguồn của bên sử dụng, functional interface kết hợp biểu thức lambda từ Java 8, và mixin interface — cách một lớp kết hợp hành vi từ nhiều interface để đạt được đa kế thừa về hành vi.

Các phần còn lại nói về tiêm phụ thuộc (dependency injection) thông qua interface để giảm sự ràng buộc giữa các lớp, mẫu Observer, tính đa hình khi lưu nhiều loại đối tượng khác nhau trong cùng một collection theo kiểu interface chung, và phương thức mặc định (default method) giúp bổ sung hành vi mới cho interface mà không làm hỏng các lớp cài đặt cũ. Với lập trình viên mới, bài viết là bộ sưu tập ví dụ ngắn gọn để thấy interface chính là nền tảng của nhiều mẫu thiết kế quen thuộc.

## [How Java Manages Thread Synchronization with Locks and Monitors](https://medium.com/@AlexanderObregon/how-java-manages-thread-synchronization-with-locks-and-monitors-541ce7c7a0b2)

Alexander Obregon giải thích cách Java đồng bộ hóa luồng ở tầng JVM. Mỗi đối tượng đều gắn với một khóa nội tại (intrinsic lock) và một monitor; khi một luồng vào phương thức hoặc khối `synchronized`, nó phải giành quyền sở hữu monitor, còn các luồng khác bị chuyển sang trạng thái chờ thay vì quay vòng tốn CPU. Monitor theo dõi luồng nào đang giữ khóa, luồng nào đang chờ vào và luồng nào đang chờ tín hiệu qua `wait()`, `notify()`, `notifyAll()` — các phương thức chỉ được gọi khi đang giữ khóa, nếu không sẽ gặp `IllegalMonitorStateException`. Khóa nội tại có tính tái nhập (reentrant): luồng đang giữ khóa có thể vào lại nhờ một bộ đếm bên trong monitor. Để giảm chi phí, JVM còn dùng biased locking, lightweight locking và chỉ "phình" (inflate) thành monitor đầy đủ khi tranh chấp kéo dài.

Phần sau giới thiệu `ReentrantLock` trong gói `java.util.concurrent.locks`, linh hoạt hơn `synchronized` với `tryLock()` để thử giành khóa mà không bị chặn, `lockInterruptibly()` để luồng đang chờ có thể bị ngắt, và nhiều đối tượng `Condition` để tách riêng hàng đợi cho từng điều kiện, như trong bộ đệm giới hạn của mô hình producer-consumer. Bên dưới là AbstractQueuedSynchronizer (AQS), quản lý hàng đợi luồng bằng danh sách liên kết đôi và `LockSupport.park()`. Bài viết cũng nhắc đến khóa công bằng (fair lock): trao khóa cho luồng chờ lâu nhất nhưng tốn thêm chi phí, nên hầu hết hệ thống giữ chế độ mặc định.

## [Building a Custom Spring Boot Starter for Shared Logic](https://medium.com/@AlexanderObregon/building-a-custom-spring-boot-starter-for-shared-logic-9be5699aff18)

Alexander Obregon hướng dẫn đóng gói phần logic dùng chung (cấu hình ghi log, xử lý ngoại lệ, cấu hình cơ sở dữ liệu…) thành một Spring Boot starter riêng thay vì sao chép sang từng dự án. Cốt lõi của starter là cơ chế tự động cấu hình: một lớp đánh dấu `@AutoConfiguration` khai báo các bean, kết hợp các điều kiện như `@ConditionalOnMissingBean` (bỏ qua nếu ứng dụng đã tự định nghĩa bean đó) hay `@ConditionalOnClass` (chỉ kích hoạt khi lớp cần thiết có trên classpath). Từ Spring Boot 3, lớp này được đăng ký trong tệp `META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports` thay cho `spring.factories` ở các phiên bản cũ, còn `@ConfigurationProperties` cùng `@EnableConfigurationProperties` cho phép người dùng tùy chỉnh starter qua `application.properties`.

Phần sau bàn về đóng gói và phát hành: đặt tên theo dạng `spring-boot-starter-[tên]`, khai báo `spring-boot-autoconfigure` và bộ xử lý cấu hình để IDE gợi ý thuộc tính, chạy `mvn clean install` để kiểm thử cục bộ, rồi phát hành lên kho Maven nội bộ hoặc công khai. Tác giả cũng khuyên giữ starter gọn gàng, đánh dấu các phụ thuộc không bắt buộc là `optional` để tránh xung đột phiên bản ở ứng dụng sử dụng. Khi cấu trúc đúng và các điều kiện được thỏa mãn, Spring sẽ tự lo phần còn lại trong quá trình khởi động.

## [Real-World Garbage Collection Solutions](https://dzone.com/articles/real-world-garbage-collection-solutions)

Bài viết trên DZone trình bày các tình huống thực tế cho thấy tinh chỉnh GC có thể mang lại cải thiện hiệu năng lớn với chi phí thấp. Trước hết, tác giả nêu các chỉ số cần theo dõi: thông lượng (tỉ lệ thời gian ứng dụng thực sự làm việc, nên đạt khoảng 99% với hệ thống quan trọng), độ trễ do các lần dừng GC, thời gian CPU dành cho GC và thời gian phản hồi. Để có dữ liệu, hãy bật ghi log GC bằng `-Xlog:gc*:file=<đường dẫn>` (Java 9 trở lên) hoặc `-XX:+PrintGCDetails -Xloggc:<đường dẫn>` (Java 8 trở xuống), rồi phân tích bằng công cụ như GCeasy.

Ba nghiên cứu điển hình minh họa điều này. Một công ty bảo hiểm gặp tình trạng full GC chạy liên tiếp vào giờ cao điểm; tăng bộ nhớ và chỉnh lại kích thước heap giúp thông lượng tăng 23% và thời gian CPU cho GC giảm một nửa. Một ứng dụng điều khiển robot trong kho hàng dùng CMS với heap 126 GB, thỉnh thoảng dừng tới 5 phút; chuyển sang G1 đưa lần dừng dài nhất xuống khoảng 2 giây, trung bình 198 ms. Một nhà cung cấp dịch vụ đám mây có heap 40 GB chia đều cho hai thế hệ với Parallel GC; thu nhỏ thế hệ trẻ (young generation) xuống 1 GB giúp thông lượng lên 99% và độ trễ trung bình giảm từ 12 giây còn 139 ms. Kết luận: khi ứng dụng Java chạy chậm, phân tích GC nên là bước đầu tiên.

## [Java Naming Conventions](https://www.baeldung.com/java-naming-conventions)

Baeldung tổng hợp các quy ước đặt tên cơ bản trong Java giúp mã nguồn rõ ràng, nhất quán và dễ cộng tác. Lớp dùng UpperCamelCase với danh từ hoặc cụm danh từ mô tả đúng vai trò, như `CustomerAccount`, tránh viết tắt hay tên mơ hồ; interface cũng dùng UpperCamelCase và thể hiện hành vi mà lớp cài đặt cam kết, như `Printable`. Biến dùng lowerCamelCase, còn hằng số `static final` dùng UPPER_SNAKE_CASE như `MAX_BALANCE`; phương thức dùng lowerCamelCase và bắt đầu bằng động từ mô tả hành động, như `deposit()` hay `print()`. Biến hoặc phương thức chứa, trả về nhiều phần tử nên dùng dạng số nhiều.

Package viết toàn chữ thường theo ký hiệu tên miền đảo ngược, ví dụ `com.baeldung.namingconventions`, giúp tổ chức mã nguồn hợp lý và tránh trùng tên với package khác. Enum đặt tên theo UpperCamelCase, còn các hằng bên trong viết UPPER_SNAKE_CASE (như `DayOfWeek.MONDAY`); annotation cũng dùng UpperCamelCase giống lớp, ví dụ `@Auditable`. Tuy đơn giản, đây là những thói quen nền tảng mà lập trình viên mới nên rèn luyện sớm.

## [Vibe Coding vs Reality](https://cendyne.dev/posts/2025-03-19-vibe-coding-vs-reality.html)

Cendyne phản biện trào lưu "vibe coding" — ý tưởng lan truyền từ câu nói của Andrej Karpathy về việc "buông theo cảm giác" và quên luôn mã nguồn, để mô hình ngôn ngữ lớn (LLM) tự viết. Tác giả thừa nhận các tác tử AI như Cursor hay GitHub Copilot ở chế độ agent rất ấn tượng khi dựng dự án từ một thư mục trống, nhưng sự hào hứng nhanh chóng tan biến khi dự án lớn dần. Làm việc với Claude 3.7 Sonnet, tác giả liệt kê hàng loạt lỗi lặp đi lặp lại: sao chép interface TypeScript thay vì import, tạo lại thành phần đã có, đặt logic cần tin cậy ở phía client, sửa mã nguồn cho khớp kiểm thử thay vì sửa kiểm thử, chỉ tái cấu trúc một chỗ trong nhiều chỗ trùng lặp, và suy giảm thành đầu ra vô nghĩa khi vượt quá cửa sổ ngữ cảnh.

Theo tác giả, vấn đề cốt lõi là các mô hình không thể học thông tin mới, không theo dõi được nhiều nguồn thời gian thực cùng lúc (như log máy chủ và kết quả kiểm thử đầu cuối), và thiếu cơ chế trí nhớ ngắn hạn, dài hạn gắn với tổ chức. Ví dụ Claude Plays Pokémon cho thấy dù có ghi chú chuyển giao giữa các lần làm mới ngữ cảnh, mô hình vẫn lặp lại sai lầm cũ. Kết luận: vibe coding có thể đưa bạn đi được 80% chặng đường tới một bản mẫu, nhưng để có phần mềm tin cậy, an toàn và đáng trả tiền thì vẫn cần những người có kinh nghiệm.

## [Sell Yourself, Sell Your Work](https://www.solipsys.co.uk/new/SellYourselfSellYourWork.html)

Bài viết ngắn trên blog solipsys.co.uk nhắc rằng làm ra sản phẩm kỹ thuật xuất sắc thôi là chưa đủ: nếu bạn giam mình trong phòng, làm việc tuyệt vời mà không kể cho ai, thì không ai biết, không ai hưởng lợi và công sức coi như mất. Tác giả từng gặp nhiều người rất giỏi nhưng ngại viết báo cáo vì cho rằng việc đó nhàm chán, khó và không liên quan. Thực tế, bạn cần viết và trình bày rõ ràng, súc tích — lỗi chính tả hay văn phong lộn xộn đủ làm mất một phần người đọc — để công việc của bạn giúp người khác tiết kiệm thời gian và mang lại uy tín cho chính bạn.

Tác giả dẫn lời Richard Hamming trong bài nói "You and Your Research" (1986): làm xong việc là chưa đủ, bạn phải "bán" nó, vì ai cũng bận với việc riêng; hãy trình bày tốt đến mức người khác sẵn sàng gác việc lại để đọc, và rèn luyện cả kỹ năng viết, thuyết trình trang trọng lẫn trao đổi thân mật. Ngay cả khi tự khởi nghiệp, bạn vẫn phải bán sản phẩm, dịch vụ của công ty. Thông điệp cuối cùng: hãy để thế giới được hưởng lợi từ công việc của bạn.

## [Building Resilient Payment Systems at SSENSE: Our Journey Towards Asynchronous Processing](https://medium.com/ssense-tech/building-resilient-payment-systems-at-ssense-our-journey-towards-asynchronous-processing-56d46dc2b348)

Đội kỹ thuật của SSENSE, nền tảng thương mại điện tử thời trang, chia sẻ hành trình chuyển hệ thống thanh toán từ xử lý đồng bộ sang bất đồng bộ. Mô hình cũ gắn chặt thanh toán với vòng đời đơn hàng: một số nhà cung cấp dịch vụ thanh toán (PSP) xử lý theo lô khiến trạng thái giao dịch có thể chưa rõ trong nhiều giờ, thậm chí nhiều ngày; lưu lượng tăng vọt trong các đợt giảm giá gây áp lực lớn; và việc hoàn tiền trở nên thủ công, phức tạp. Giải pháp là tách bước xác nhận thanh toán khỏi bước đặt hàng: đơn hàng chuyển sang trạng thái chờ để quy trình tiếp tục, đồng thời đa dạng hóa PSP để giảm phụ thuộc vào một nhà cung cấp.

Về triển khai, dịch vụ thanh toán và các cron job (viết bằng TypeScript, chạy trên Kubernetes) dùng chung một cơ sở dữ liệu, nhận thông báo từ PSP qua webhook và phát sự kiện miền lên event bus để dịch vụ đơn hàng hay tầng tích hợp tài chính cập nhật theo. Mỗi giao dịch có trạng thái rõ ràng: Queued, Pending, Complete, Declined hoặc Failed. Khi gửi yêu cầu bị lỗi, hệ thống thử lại ngay vài lần, sau đó chuyển giao dịch sang Queued để cron job gửi lại; khóa idempotency đảm bảo không tạo giao dịch trùng lặp. Giao dịch thất bại tự động tạo phiếu hỗ trợ khách hàng, và một cron job khác phát hiện giao dịch bị "treo" ở Pending. Kết quả là trải nghiệm thanh toán mượt hơn, vận hành linh hoạt hơn trong mùa cao điểm và dữ liệu nhất quán giữa các hệ thống.

---

*Bài viết đã được viết lại bởi Claude Code với Opus 5.5 vào ngày 27/09/2026.*
