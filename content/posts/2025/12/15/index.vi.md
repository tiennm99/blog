---
title: "Newsletter #72"
date: 2025-12-15
tags: ["AI-Assisted", "Newsletter", "Compilers", "System Design", "Replication", "DDD", "Software Architecture"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #72.*

## [The Easiest Way to Build a Type Checker](https://jimmyhmiller.com/easiest-way-to-build-type-checker)

Jimmy Miller chia sẻ rằng các tài liệu về Hindley-Milner hay Algorithm W chưa từng giúp anh hiểu cách một bộ kiểm tra kiểu thực sự được cài đặt, cho đến khi anh biết đến phương pháp kiểm tra kiểu hai chiều (bidirectional type checking). Ý tưởng cốt lõi là chia công việc thành hai hướng: `infer` tự suy ra kiểu của một biểu thức, còn `check` xác nhận biểu thức có khớp với kiểu mong đợi hay không. Đổi lại sự đơn giản này, ngôn ngữ cần một ít chú thích kiểu, thường chỉ ở phần định nghĩa hàm, còn các biến cục bộ vẫn được suy luận tự động. Tác giả trình bày một bản cài đặt TypeScript khoảng 100 dòng cho một ngôn ngữ nhỏ gồm số, chuỗi, hàm, lời gọi hàm, `let` và khối lệnh.

Bài viết giải thích từng thành phần: cây cú pháp trừu tượng (AST) giúp duyệt chương trình dễ hơn chuỗi ký tự, còn ngữ cảnh chỉ là một `Map` từ tên biến sang kiểu, được sao chép mỗi khi vào hàm hoặc khối lệnh mới. Khi thêm phép cộng làm ví dụ, tác giả cho thấy `infer` và `check` gọi đệ quy đan xen nhau như thế nào cho đến khi chạm tới những trường hợp đơn giản nhất. Bộ kiểm tra này còn xa mới hoàn chỉnh, nhưng là điểm khởi đầu tốt để bạn mở rộng và hiểu rõ hệ thống kiểu mà không phải đọc các bài báo học thuật nặng nề.

## [Deprecation](https://abseil.io/resources/swe-book/html/ch15.html)

Đây là chương 15 của cuốn "Software Engineering at Google", bàn về việc loại bỏ có kế hoạch (deprecation) những hệ thống đã lỗi thời. Tiền đề của chương là "mã nguồn là gánh nặng, không phải tài sản": mọi hệ thống đều tốn chi phí vận hành và bảo trì, nên khi đã có hệ thống thay thế tương đương, việc duy trì song song cả hai sẽ làm tăng độ phức tạp và kìm hãm sự phát triển của hệ thống mới. Tuy vậy, tuổi đời không phải lý do để loại bỏ, và mỗi tổ chức chỉ nên theo đuổi một số dự án loại bỏ vừa sức rồi cam kết làm đến cùng.

Nhóm tác giả chỉ ra vì sao việc này khó: định luật Hyrum khiến người dùng phụ thuộc vào những hành vi không được cam kết, hệ thống mới hiếm khi tương đương hoàn toàn hệ thống cũ, kỹ sư gắn bó cảm xúc với mã nguồn mình viết, và việc xin nguồn lực cho công việc dọn dẹp thường khó thuyết phục. Google phân biệt loại bỏ mang tính khuyến nghị với loại bỏ bắt buộc có hạn chót, đồng thời nhấn mạnh vai trò của người chịu trách nhiệm rõ ràng, các mốc thời gian, việc hỗ trợ di chuyển và công cụ như phân tích tĩnh hay thay đổi quy mô lớn để chặn cách dùng mới. Bài học quan trọng cho lập trình viên là nên thiết kế hệ thống sao cho có thể thay thế từng phần ngay từ đầu, và ưu tiên cải tiến tại chỗ thay vì viết lại toàn bộ.

## [16 Replication Concepts Every Software Engineer Should Know (Simple Guide for 2026)](https://designgurus.substack.com/p/16-replication-concepts-every-software)

Arslan Ahmad giải thích mười sáu khái niệm nhân bản dữ liệu (replication) giúp các hệ thống lớn duy trì độ tin cậy, tốc độ và khả năng chịu lỗi, mỗi khái niệm đi kèm một ví dụ thực tế. Bài viết bắt đầu với ba mô hình chính: nhân bản có một nút leader nhận mọi thao tác ghi, nhân bản nhiều leader phù hợp với ứng dụng đa vùng nhưng phải xử lý xung đột, và nhân bản không có leader như Dynamo, nơi nút nào cũng nhận được thao tác ghi. Tiếp theo là các chế độ đồng bộ, bất đồng bộ và bán đồng bộ, cho thấy sự đánh đổi giữa độ bền dữ liệu và độ trễ, chẳng hạn ngân hàng chờ các bản sao xác nhận giao dịch còn mạng xã hội chấp nhận ảnh hiển thị chậm vài giây ở vùng khác.

Phần sau đi vào cơ chế quorum cho thao tác đọc và ghi (ví dụ ba trên năm bản sao phải xác nhận), độ trễ của bản sao và nguy cơ đọc phải dữ liệu cũ, chuyển đổi dự phòng khi nút chính gặp sự cố, nhân bản theo vùng địa lý, cùng các kỹ thuật tự khắc phục như sửa khi đọc (read repair) và chuyển giao có gợi ý (hinted handoff). Đây là tài liệu nhập môn gọn gàng để lập trình viên hiểu những gì đang diễn ra bên dưới các cơ sở dữ liệu phân tán mà họ sử dụng hằng ngày.

## [50 System Design Concepts for Beginners in 90 Minutes [2026 Edition]](https://designgurus.substack.com/p/50-system-design-concepts-for-beginners)

Arslan Ahmad tổng hợp 50 khái niệm thiết kế hệ thống quan trọng trong một bài viết duy nhất, nhắm tới người mới bắt đầu và người đang ôn luyện phỏng vấn, mỗi khái niệm được giải thích ngắn gọn kèm ví dụ dễ hình dung. Phần nền tảng gồm mở rộng theo chiều dọc và chiều ngang, định lý CAP và PACELC, ACID so với BASE, thông lượng so với độ trễ, định luật Amdahl, nhất quán mạnh so với nhất quán cuối cùng, kiến trúc có trạng thái và phi trạng thái, cũng như lựa chọn giữa monolith, microservices và serverless.

Các phần tiếp theo lần lượt đi qua mạng và giao tiếp (cân bằng tải, CDN, gRPC so với REST), lưu trữ dữ liệu (phân mảnh, nhân bản, đánh chỉ mục), các mẫu đảm bảo độ tin cậy như circuit breaker, thử lại và tính lũy đẳng (idempotency), chiến lược bộ nhớ đệm, hàng đợi thông điệp, khả năng quan sát với tracing và SLI/SLO, cho đến bảo mật với OAuth, TLS và Zero Trust. Thông điệp xuyên suốt là không có lựa chọn nào hoàn hảo: người thiết kế cần hiểu rõ sự đánh đổi của từng phương án để chọn giải pháp phù hợp với bài toán thực tế, chẳng hạn nhiều hệ thống tốt bắt đầu từ monolith và chỉ tách thành microservices khi thực sự cần.

## [DDD: A Toolbox, Not a Religion](https://threedots.tech/episode/ddd-toolbox-not-religion)

Trong tập podcast No Silver Bullet này, Miłosz và Robert của Three Dots Labs bàn về lý do các dự án phần mềm thường khởi đầu đầy hứa hẹn rồi dần biến thành mã nguồn cũ mà không ai muốn động vào: tính năng mới khác xa thiết kế ban đầu, nhưng thay vì mô hình hóa lại, đội ngũ chỉ vá tạm hết lần này đến lần khác. Theo họ, phần lớn dự án thất bại không vì thử thách kỹ thuật mà vì xử lý kém độ phức tạp của nghiệp vụ, bởi các ứng dụng SaaS thường dùng công nghệ na ná nhau, còn điều làm nên khác biệt giữa các công ty chính là lĩnh vực mà họ phục vụ.

Hai tác giả xem Domain-Driven Design (DDD) là một hộp công cụ chứ không phải tôn giáo: không cần áp dụng mọi mẫu, chỉ chọn những gì giải quyết đúng vấn đề đang gặp. Họ cảnh báo về việc giải quyết các vấn đề tưởng tượng, như dành hàng tháng xây framework hay nền tảng trước khi có tính năng thật, kèm câu chuyện một framework nhắn tin dùng generics khiến họ không bao giờ hoàn thành cuộc thi game jam. Lời khuyên là bắt đầu từ việc hiểu mô hình nghiệp vụ trước khi thiết kế lược đồ dữ liệu, và luôn áp dụng các mẫu chiến lược như xác định miền cốt lõi và ranh giới module, kể cả khi không dùng các mẫu chiến thuật. Như Miłosz tóm lại, "DDD là về việc hiểu lĩnh vực bạn đang làm việc và sau đó mô hình hóa nó tốt trong mã nguồn."

### Bonus

**Images:**
![Saga Pattern Demystified: Orchestration vs Choreography](https://substackcdn.com/image/fetch/$s_!lwoL!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fb1ec5785-ad8a-4350-b07d-005f7b04b1f1_2250x2624.png)
![Virtualization vs. Containerization](https://substackcdn.com/image/fetch/$s_!SfCa!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F55ac4874-04fc-4ea7-a083-bde8f6f99cf5_2360x2960.png)
![5 REST API Authentication Methods](https://substackcdn.com/image/fetch/$s_!zlUS!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F156acc80-7588-4fc1-8f43-7fa1458d646c_2360x2770.png)
![What is a Firewall?](https://substackcdn.com/image/fetch/$s_!CYiE!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5eb76d35-fba8-48de-84d1-228060740d89_2360x2960.png)
![Modem vs. Router](https://substackcdn.com/image/fetch/$s_!fKIx!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F7278af0a-b8cb-4b72-bd48-341e92286b1b_2360x2960.png)
![A Guide to Service Mesh Architectural Pattern](https://substackcdn.com/image/fetch/$s_!zdVq!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F60a16dc3-e973-4d2d-a0c2-7d426d5fe6c9_2250x2624.png)
![What is a REST API?](https://substackcdn.com/image/fetch/$s_!Q7Mr!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F73400113-5bd5-4c40-a7e3-7346fb229256_3000x3900.jpeg)
![How Java HashMaps Work?](https://substackcdn.com/image/fetch/$s_!Phtx!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa7dce573-ac95-46cc-a80d-62f80e6f0602_800x989.jpeg)
![Virtualization Explained: From Bare Metal to Hosted Hypervisors](https://substackcdn.com/image/fetch/$s_!1-F-!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F473c684e-3c14-44c1-9889-97fef9caef15_2360x2960.png)
![Must-Know System Performance Strategies](https://substackcdn.com/image/fetch/$s_!yDvA!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa3c9b76d-b1b9-4284-a64e-16faa832544e_2250x2624.png)
![Apache Kafka vs. RabbitMQ](https://substackcdn.com/image/fetch/$s_!_5Is!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F6ebf5287-65fa-4db7-8490-54792fd1886c_2360x2920.png)
![The HTTP Mindmap](https://substackcdn.com/image/fetch/$s_!1Hk2!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fced11d9e-ce25-439e-9a56-4ccf37c1854f_2360x2770.png)
![How DNS Works](https://substackcdn.com/image/fetch/$s_!hn6T!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa0f70b08-6fa9-4413-9bd4-0571f99dba60_2360x2664.png)
![Can a web server provide real-time updates?](https://substackcdn.com/image/fetch/$s_!Sny4!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F7911abd9-06ce-48f4-98c5-c3305b752fb7_800x1142.jpeg)

**Videos:**
[How Does a URL Shortener Work?](https://www.youtube.com/watch?v=HHUi8F_qAXM)

---

*Bài viết đã được viết lại bởi Claude Code với Opus 5.5 vào ngày 27/09/2026.*
