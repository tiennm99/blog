---
title: "Newsletter #13"
date: 2025-04-22
tags: ["AI-Assisted", "Newsletter", "Distributed Systems", "Java", "Spring Boot", "gRPC", "Performance"]
categories: [ "Newsletter" ]
---

*Mời bạn thưởng thức Newsletter \#13.*

## [Designing a Distributed ID Generator](https://siddharthsabron.in/blog/id-generator/)

Bài viết giải thích cách tác giả xây dựng một bộ sinh ID 64 bit theo kiểu Snowflake cho hệ thống phân tán, không cần một dịch vụ điều phối trung tâm như cơ chế tự tăng (auto-increment) của cơ sở dữ liệu. Trước hết, tác giả lý giải vì sao không nên dùng chuỗi ngẫu nhiên làm khóa chính: so sánh chuỗi chậm hơn so sánh số, chỉ mục phình to hơn, và việc chèn giá trị ngẫu nhiên vào B-tree gây phân mảnh cũng như làm giảm tính cục bộ khi truy cập dữ liệu. Ngược lại, ID dạng số tăng dần theo thời gian giúp chỉ mục gọn nhẹ và bản ghi mới luôn được thêm vào cuối cây.

Phần chính mô tả cấu trúc ID: 41 bit cho mốc thời gian tính bằng mili giây kể từ một mốc epoch tự chọn (đủ dùng khoảng 69 năm), 10 bit cho mã shard (tối đa 1024 shard) và 12 bit cho số thứ tự (4096 ID mỗi mili giây trên mỗi shard), sau đó ghép lại bằng phép dịch bit và phép OR. Tác giả cũng thẳng thắn chỉ ra những điểm cần bổ sung trước khi đưa vào môi trường production, như xử lý tràn số thứ tự, lệch đồng hồ và cơ chế cấp phát mã shard. Đây là bài đọc hữu ích để hiểu vì sao lựa chọn kiểu dữ liệu cho khóa chính ảnh hưởng trực tiếp đến hiệu năng.

## [3,200% CPU Utilization](https://josephmate.github.io/2025-02-26-3200p-cpu-util/)

Joseph Mate kể lại sự cố khi máy chủ Java của anh quá tải đến mức gần như không thể SSH vào: CPU sử dụng tới 3.200%, tức cả 32 core đều chạy hết công suất. Nhờ thread dump của Java 17 có kèm thời gian CPU, anh lần ra hàng loạt thread đang kẹt trong `TreeMap.put()`. Nguyên nhân là một `TreeMap` được nhiều thread cùng ghi mà không có cơ chế đồng bộ. Khi race condition xảy ra, cây đỏ-đen bên trong bị hỏng cấu trúc và hình thành chu trình, khiến thao tác tìm kiếm hoặc thêm phần tử lặp vô hạn. Điểm đáng chú ý là lỗi chỉ lộ ra khi NullPointerException bị nuốt mất, chẳng hạn trong thread pool không có trình xử lý ngoại lệ hoặc trong một dịch vụ gRPC, nên hệ thống vẫn chạy mà không để lại dấu vết nào trong log.

Tác giả dựng thí nghiệm tái hiện lỗi, thử trên nhiều ngôn ngữ khác nhau và đề xuất cách khắc phục, đơn giản nhất là bọc bằng `Collections.synchronizedMap` hoặc chuyển sang cấu trúc an toàn luồng. Anh cũng nhấn mạnh cách tiếp cận nhiều lớp phòng thủ: cảnh báo khi có NPE, giám sát mức sử dụng CPU bất thường, đăng ký trình xử lý ngoại lệ cho executor, review mã nguồn kỹ lưỡng, dùng công cụ phân tích tĩnh và viết kiểm thử đa luồng. Bài viết cho thấy race condition không chỉ làm hỏng dữ liệu mà còn có thể gây sự cố hiệu năng nghiêm trọng.

## [A map metaphor for architectural diagrams](https://www.giorgiosironi.com/2025/02/maps-metaphor-for-architectural-diagrams.html)

Giorgio Sironi đề xuất nhìn sơ đồ kiến trúc như những tấm bản đồ: bản đồ không phải là lãnh thổ, mọi mô hình đều "sai" vì lược bỏ chi tiết, nhưng vẫn hữu ích khi tập trung vào đúng khía cạnh cần cho một công việc cụ thể. Giống như bản đồ địa hình hay bản đồ hành chính, mỗi sơ đồ chỉ nên thể hiện một chiều thông tin chính. Nếu một sơ đồ liên tục lỗi thời so với mã nguồn, có lẽ nó chưa đủ trừu tượng.

Tác giả chia sẻ kinh nghiệm dùng một bộ "bản đồ" gọn nhẹ trên bảng trắng số như Miro, chỉ gồm hộp và mũi tên, giấy ghi chú cho các quyết định và màu sắc để đánh dấu trạng thái. Chúng thay thế cho việc duy trì Architectural Decision Records (ADR) vốn khó mở rộng khi số lượng quyết định lớn, và khác ADR ở chỗ luôn được chỉnh sửa liên tục. Các bản đồ ví dụ gồm bối cảnh hệ thống (lấy ý tưởng từ mô hình C4), các bounded context cùng ngôn ngữ của chúng, kiến trúc tĩnh giữa các module, chiến lược kiểm thử, khả năng quan sát và bộ công nghệ sử dụng. Điều quan trọng là cả nhóm cùng sở hữu các bản đồ này chứ không riêng trưởng nhóm kỹ thuật, và nên tham khảo chúng mỗi khi bắt đầu một đầu việc mới.

## [About "Developer philosophy"](https://tryingthings.wordpress.com/2025/02/28/about-developer-philosophy/)

Sorin Costea ghi lại những suy ngẫm khi đọc bài "Developer philosophy" của qntm. Ông đặt câu hỏi liệu còn chỗ cho lập trình viên junior trong thời đại AI hay không, chia sẻ nỗi lo của người trẻ về cơ hội nghề nghiệp và so sánh với làn sóng thuê ngoài ra nước ngoài trước đây. Về chuyện viết lại hệ thống, tác giả đồng ý rằng những điều kiện dẫn đến việc viết lại không hình thành trong một sớm một chiều, nhưng cho rằng các khoảng trống tích lũy thường vẫn có thể xử lý dần từng phần. Theo ông, viết lại là một dự án lớn, dễ trễ tiến độ, và khi đó những phần "kém quan trọng" bị bỏ qua, rốt cuộc lại sinh ra nợ kỹ thuật mới.

Ở phần cuối, tác giả bình luận ngắn về các lời khuyên còn lại: chỉ nên tự động hóa các thực hành tốt khi đã có sự đồng thuận của những người có tiếng nói; các trường hợp biên thường chỉ lộ ra muộn theo quy luật 80-20; đừng kỳ vọng bản viết lại sẽ đơn giản ngay từ đầu; và mã nguồn trông có vẻ dễ kiểm thử, đúng đắn vẫn có thể gây bất ngờ. Đây là một góc nhìn thực tế, có phần hoài nghi, bổ sung cho bài gốc.

## [Team learning session: surviving legacy code by J.B. Rainsberger](https://www.giorgiosironi.com/2025/02/team-learning-session-surviving-legacy.html)

Giorgio Sironi mô tả cách tổ chức một buổi học nhóm dựa trên bài tập "Surviving Legacy Code" của J.B. Rainsberger. Bối cảnh giả định là một nhóm vốn làm TypeScript phải tiếp nhận hệ thống PHP cốt lõi của công ty, nơi kiểm thử thiếu hoặc khó hiểu và rất ít người nắm được các "bẫy" trong mã nguồn. Mục tiêu học tập gồm ba mảng: mô tả và hiểu mã nguồn cũ, viết kiểm thử ở nhiều cấp độ, và tái cấu trúc an toàn nhờ có lớp kiểm thử bảo vệ. Ngoài ra, nhóm còn học một ngôn ngữ mới cùng bộ công cụ đi kèm như Composer, PHPUnit, PHPStan hay PHP-CS-Fixer.

Cả nhóm cùng làm việc trên một máy (ensemble) qua nhiều buổi, mỗi tuần khoảng một giờ, với một dự án hư cấu được cố tình viết xấu. Lộ trình gợi ý là chạy ứng dụng để hiểu bài toán, áp dụng kỹ thuật golden master để ghi lại hành vi hiện tại (cần xử lý seed ngẫu nhiên để kết quả tái lập được), rồi mới viết kiểm thử ở cấp thấp hơn và tách các đơn vị cần kiểm thử. Vì mã nguồn là hư cấu và không có áp lực thời hạn, các thành viên thoải mái thừa nhận những chỗ chưa hiểu. Cuối mỗi buổi có phần nhìn lại để ghi nhận điều đã học và hướng khám phá tiếp theo.

## [Trimodal Nature of Tech Compensation in the US, UK and India](https://newsletter.pragmaticengineer.com/p/trimodal)

Gergely Orosz, tác giả bản tin The Pragmatic Engineer, dùng hơn 20.000 điểm dữ liệu từ Levels.fyi để kiểm chứng mô hình "ba đỉnh" (trimodal) của thu nhập ngành công nghệ tại Mỹ, Anh và Ấn Độ. Theo mô hình này, các công ty được chia thành ba nhóm: Tier 1 là phần lớn các công ty còn lại, Tier 2 là Big Tech, và Tier 3 là các scaleup hàng đầu cùng các quỹ đầu cơ và công ty giao dịch định lượng. Tại Mỹ, Tier 2 và Tier 3 thường trả khoảng gấp đôi Tier 1 ở cả trung vị lẫn phân vị 75, đối với cả kỹ sư mới vào nghề và kỹ sư senior, trong khi mức thu nhập giữa Tier 2 và Tier 3 chồng lấn khá nhiều.

Bài viết liệt kê các công ty trả cao nhất theo từng nhóm và nêu nhiều điểm đáng chú ý: quỹ đầu cơ không trao cổ phần nhưng có thưởng tiền mặt cuối năm rất lớn, nên là nhóm duy nhất trả thu nhập tiền mặt cao hơn Big Tech; tại Anh, các quỹ đầu cơ và công ty tài chính dẫn đầu; tại Ấn Độ, một số công ty trả từ 1 crore rupee trở lên cho kỹ sư senior. Tác giả cũng lưu ý cổ phần ở công ty chưa niêm yết có thể giúp tổng thu nhập cao hơn nhưng đi kèm rủi ro. Đây là tài liệu tham khảo tốt để hiểu thị trường lương và định hướng nghề nghiệp.

## [9 Software Architecture Patterns for Distributed Systems](https://dev.to/somadevtoo/9-software-architecture-patterns-for-distributed-systems-2o86)

Bài viết của Soma tổng quan chín mẫu kiến trúc phổ biến để quản lý luồng dữ liệu và giao tiếp trong hệ thống phân tán, cũng là chủ đề hay gặp trong phỏng vấn thiết kế hệ thống. Nhóm đầu tiên gồm: Peer-to-Peer, nơi các nút giao tiếp trực tiếp mà không cần bộ điều phối trung tâm; API Gateway, điểm vào thống nhất đảm nhận xác thực, giới hạn tần suất và định tuyến tới các dịch vụ phía sau; Pub-Sub, giao tiếp bất đồng bộ thông qua các chủ đề; Request-Response, mô hình đồng bộ quen thuộc giữa client và server; và Event Sourcing, lưu mọi thay đổi trạng thái dưới dạng chuỗi sự kiện.

Bốn mẫu còn lại tập trung vào xử lý dữ liệu và điều phối: ETL để trích xuất, biến đổi và nạp dữ liệu; Batching để xử lý dữ liệu theo lô; Stream Processing để xử lý dữ liệu liên tục theo thời gian thực; và Orchestration, trong đó một thành phần trung tâm điều phối luồng công việc giữa các dịch vụ. Mỗi mẫu được giải thích ngắn gọn kèm sơ đồ minh họa và ví dụ ứng dụng. Bài viết phù hợp để làm quen nhanh với các khái niệm nền tảng trước khi tìm hiểu sâu từng mẫu.

## [Extending Java APIs - Add Missing Features Without the Hassle](https://foojay.io/today/extending-java-apis-add-missing-features-without-the-hassle/)

Shai Almog giới thiệu tính năng extension của Manifold, giúp bổ sung phương thức còn thiếu vào các lớp có sẵn của Java mà không phải chờ phiên bản Java mới. Lập trình viên chỉ cần viết một lớp đánh dấu `@Extension` trong package có tên trùng với lớp cần mở rộng, dùng phương thức static với tham số đầu tiên gắn `@This`. Ví dụ, có thể thêm `map()` trực tiếp vào `Collection` để bỏ bước gọi `stream()`. Manifold không thực sự sửa lớp mà thay lời gọi bằng lời gọi tới extension ngay lúc biên dịch, nên không phát sinh chi phí khi chạy. Nếu sau này Java bổ sung phương thức cùng chữ ký, phương thức thật sẽ được ưu tiên, giúp việc nâng cấp diễn ra suôn sẻ.

Manifold còn có sẵn nhiều thư viện extension cho collection, `String`, I/O và JSON, chẳng hạn `removePrefix()` hay `padStart()`, và mảng cũng được bổ sung các phương thức như `isEmpty()`. Bài viết còn trình bày structural interface với `@Structural`, cho phép dùng `String` và `Collection` qua cùng một interface tự định nghĩa mà không cần khai báo implements, khiến Java có dáng dấp của một ngôn ngữ kiểu cấu trúc. Đây là công cụ thú vị cho những ai muốn viết Java gọn gàng hơn.

## [How Spring Boot Reloads Configuration Without Restart](https://medium.com/@AlexanderObregon/how-spring-boot-reloads-configuration-without-restart-4d9dc9e8b926)

Alexander Obregon giải thích cơ chế giúp Spring Boot cập nhật cấu hình mà không phải khởi động lại ứng dụng. Mặc định, cấu hình chỉ được nạp lúc khởi động. Để thay đổi có hiệu lực khi ứng dụng đang chạy, ta thường lấy cấu hình từ Spring Cloud Config Server, đánh dấu các bean cần làm mới bằng `@RefreshScope`, rồi kích hoạt làm mới qua endpoint `/actuator/refresh` của Actuator.

Bài viết đi sâu vào những gì xảy ra bên trong: khi endpoint được gọi, Spring phát ra một `RefreshEvent`; `ConfigurableEnvironment` được cập nhật giá trị mới từ nguồn cấu hình bên ngoài; các bean thuộc `@RefreshScope`, vốn được bọc trong proxy tạo bằng CGLIB, sẽ bị hủy và tạo lại với cấu hình mới. Tác giả lưu ý thuộc tính không nằm trong bean có thể làm mới chỉ có hiệu lực sau lần khởi động lại, và một singleton phụ thuộc vào bean refresh-scope vẫn giữ tham chiếu cũ. Với hệ thống nhiều instance, Spring Cloud Bus dùng message broker như RabbitMQ hoặc Kafka để phát sự kiện làm mới tới mọi dịch vụ cùng lúc qua `/actuator/bus-refresh`. Bài viết giúp hiểu rõ cơ chế thay vì chỉ dùng annotation theo thói quen.

## [Building High-Performance RPC Services with gRPC and Spring Boot](https://www.javacodegeeks.com/2025/03/building-high-performance-rpc-services-with-grpc-and-spring-boot.html)

Eleftheria Drosopoulou hướng dẫn tích hợp gRPC vào Spring Boot để xây dựng dịch vụ RPC hiệu năng cao. gRPC là framework RPC mã nguồn mở của Google, dùng HTTP/2 để truyền tải và Protocol Buffers để định nghĩa giao diện. Nhờ định dạng nhị phân gọn hơn JSON, khả năng ghép kênh của HTTP/2, hỗ trợ streaming hai chiều và tự sinh mã client, server từ file `.proto`, gRPC rất phù hợp cho giao tiếp giữa các microservice. Tác giả cũng lập bảng so sánh gRPC với REST và WebSockets về giao thức, định dạng dữ liệu, hiệu năng, streaming và độ dễ sử dụng.

Phần thực hành đi qua các bước: thêm thư viện `grpc-spring-boot-starter`, định nghĩa service trong file `.proto`, sinh lớp Java bằng plugin Maven, cài đặt service, cấu hình gRPC server và chạy ứng dụng. Cuối bài là gợi ý khi nào chọn công nghệ nào: gRPC cho microservice cần hiệu năng cao và streaming hai chiều, REST cho API CRUD đơn giản và cần tương thích với trình duyệt, WebSockets cho giao tiếp thời gian thực cần duy trì kết nối liên tục. Đây là điểm khởi đầu tốt cho lập trình viên Java muốn thử gRPC.

## Bonus: Vài ảnh hay ho đến từ [ByteByteGo](https://bytebytego.com/)

![Latency and Partition Tolerance in Distributed Systems](https://substack-post-media.s3.amazonaws.com/public/images/39f5b04d-ad39-4bbe-a32f-f47792d4ef62_2250x2682.png)

## Bonus 2: Vài video hay ho đến từ [ByteByteGo](https://bytebytego.com/)

[8 Most Important Tips for Designing Fault-Tolerant System](https://www.youtube.com/watch?v=3Lis4w4_bBc)

---

*Bài viết đã được viết lại bởi Claude Code với Opus 5.5 vào ngày 27/09/2026.*
