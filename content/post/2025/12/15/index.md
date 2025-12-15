---
title: "Newsletter #72"
date: 2025-12-15
tags: ["AI-Assisted"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #72.*

## [The Easiest Way to Build a Type Checker](https://jimmyhmiller.com/easiest-way-to-build-type-checker)

Bài viết giới thiệu phương pháp kiểm tra kiểu song phương - kết hợp giữa suy luận kiểu và kiểm tra kiểu - như một cách đơn giản và thực tiễn để xây dựng các bộ kiểm tra kiểu. Tác giả cung cấp một triển khai TypeScript tối thiểu cho một ngôn ngữ nhỏ, giải thích các khái niệm cốt lõi như abstract syntax trees, xử lý ngữ cảnh, và xác thực kiểu đệ quy. Phương pháp này giúp làm rõ việc triển khai hệ thống kiểu so với các cách tiếp cận phức tạp hơn như Hindley-Milner.

**Điểm chính:**
- Sử dụng phương pháp kiểm tra kiểu song phương kết hợp giữa suy luận và kiểm tra kiểu
- Triển khai ví dụ bằng TypeScript cho một ngôn ngữ nhỏ
- Làm rõ các khái niệm cơ bản: AST, ngữ cảnh, xác thực kiểu đệ quy
- Đơn giản hóa việc hiểu hệ thống kiểu so với các phương pháp phức tạp hơn

## [Deprecation](https://abseil.io/resources/swe-book/html/ch15.html)

Bài viết nói về việc loại bỏ phần mềm lỗi thời một cách có kế hoạch để giảm chi phí và độ phức tạp trong dài hạn. Google nhấn mạnh rằng "mã nguồn là nghĩa vụ, không phải tài sản", và việc loại bỏ phần mềm thành công đòi hỏi sự sở hữu, công cụ hỗ trợ và các mốc rõ ràng. Bài viết phân biệt giữa loại bỏ theo hướng dẫn (khuyến nghị) và loại bỏ bắt buộc (được thực thi), nhấn mạnh rằng việc hỗ trợ di chuyển và ngăn chặn việc sử dụng mới là rất quan trọng. Thiết kế hệ thống với tư tưởng loại bỏ trong tương lai - như cho phép thay thế theo từng phần - sẽ làm cho việc loại bỏ dễ dàng hơn. Mặc dù có những thách thức như định luật Hyrum và sự gắn bó cảm xúc, nhưng các quy trình và công cụ có cấu trúc (ví dụ: phân tích tĩnh, thay đổi quy mô lớn) giúp quản lý các trở ngại kỹ thuật và xã hội.

**Điểm chính:**
- Loại bỏ phần mềm lỗi thời là cần thiết để giảm chi phí và độ phức tạp dài hạn
- Phân biệt giữa loại bỏ khuyến nghị và loại bỏ bắt buộc
- Cần hỗ trợ di chuyển và ngăn chặn việc sử dụng mới
- Thiết kế hệ thống với tư tưởng loại bỏ trong tương lai sẽ giúp việc thay thế dễ dàng hơn

## [16 Replication Concepts Every Software Engineer Should Know (Simple Guide for 2026)](https://designgurus.substack.com/p/16-replication-concepts-every-software)

Bài viết giải thích mười sáu khái niệm nhân bản thiết yếu - bao gồm nhân bản dựa trên người dẫn đầu, nhiều người dẫn đầu và không có người dẫn đầu; các phương pháp đồng bộ và không đồng bộ; hệ thống bỏ phiếu; độ trễ của bản sao; chuyển đổi khi gặp sự cố; nhân bản địa lý; và các kỹ thuật như sửa chữa khi đọc và chuyển tiếp gợi ý - là nền tảng cho các hệ thống phân tán đáng tin cậy và có khả năng mở rộng. Mỗi khái niệm bao gồm một ví dụ thực tế để làm rõ cách áp dụng trong thế giới thực.

**Điểm chính:**
- Các khái niệm nhân bản thiết yếu như nhân bản dựa trên người dẫn đầu, nhiều người dẫn đầu và không có người dẫn đầu
- Phân biệt giữa các phương pháp đồng bộ và không đồng bộ
- Hệ thống bỏ phiếu và kỹ thuật quản lý độ trễ của bản sao
- Các phương pháp chuyển đổi khi gặp sự cố và nhân bản địa lý

## [50 System Design Concepts for Beginners in 90 Minutes [2026 Edition]](https://designgurus.substack.com/p/50-system-design-concepts-for-beginners)

Bài viết cung cấp cái nhìn tổng quan nhanh chóng và thực tế về 50 khái niệm thiết kế hệ thống thiết yếu cho người mới bắt đầu và ôn tập phỏng vấn. Nội dung bao gồm các nguyên tắc cốt lõi như mở rộng quy mô, định lý CAP/PACELC, ACID so với BASE, và sự đánh đổi giữa độ trễ và thông lượng. Các chủ đề quan trọng bao gồm kiến trúc hệ thống phân tán (microservices, serverless), mạng máy tính (cân bằng tải, CDN, gRPC so với REST), lưu trữ dữ liệu (phân mảnh, nhân bản, đánh chỉ mục), mẫu độ tin cậy (circuit breakers, retry, idempotency), chiến lược lưu trữ đệm, hàng đợi tin nhắn, khả năng quan sát (tracing, SLIs/SLOs), và bảo mật (OAuth, TLS, Zero Trust). Bài viết nhấn mạnh việc hiểu các sự đánh đổi và tính ứng dụng thực tế.

**Điểm chính:**
- 50 khái niệm thiết kế hệ thống thiết yếu cho người mới bắt đầu
- Các nguyên tắc cốt lõi như mở rộng quy mô, định lý CAP/PACELC, ACID vs BASE
- Các thành phần kiến trúc hệ thống phân tán như microservices, load balancers, CDN
- Các mẫu độ tin cậy và chiến lược lưu trữ đệm

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
