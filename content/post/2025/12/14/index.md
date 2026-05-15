---
title: "Newsletter #71"
date: 2025-12-14
tags: ["AI-Assisted"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #71.*

## [A modern guide to SQL JOINs](https://kb.databasedesignbook.com/posts/sql-joins/)

Bài viết cung cấp hướng dẫn toàn diện về SQL JOINs, tập trung vào làm rõ các mô hình tư duy và tránh những giải thích gây hiểu lầm. Tác giả bắt đầu với LEFT JOIN, nhấn mạnh tầm quan trọng của việc sử dụng cú pháp chuẩn chỉ với các so sánh bằng ID trong điều kiện ON. Hướng dẫn phân biệt ba trường hợp: N:1 (hiệu quả nhất), 1:N (vấn đề), và M:N.

Nội dung chính bao gồm các điều kiện tiên quyết và thực hành viết SQL có kỷ luật; phân tích LEFT JOIN chi tiết với ví dụ về nhân viên/thanh toán; giải thích INNER JOIN như sản phẩm Cartesian đã được lọc; các kỹ thuật self-join cho dữ liệu phân cấp; các cân nhắc về hiệu suất và sai lầm phổ biến; và các biến thể cú pháp lịch sử cùng cạm bẫy của chúng.

Tác giả ủng hộ "trường hợp N:1 của LEFT JOIN (khóa chính ở bên phải)" là phương pháp ưu tiên, lưu ý rằng "SQL quá cho phép và không bảo vệ bạn khỏi những sai lầm đơn giản." Hướng dẫn bao gồm các ví dụ thực tế sử dụng cơ sở dữ liệu nhân viên và thanh toán, với tất cả các truy vấn có sẵn trên dbfiddle.uk.

**Điểm chính:**
- Ưu tiên trường hợp N:1 của LEFT JOIN với khóa chính ở bên phải
- Phân biệt rõ ràng giữa các trường hợp N:1, 1:N, và M:N
- SQL quá cho phép, cần kỷ luật khi viết để tránh sai lầm
- Bài viết là công việc đang tiến hành, sẽ cập nhật thêm các phần nâng cao

## [Punycode: My New Favorite Algorithm](https://www.iankduncan.com/engineering/2025-12-01-punycode)

Bài viết cung cấp phân tích sâu về Punycode, thuật toán cho phép các tên miền quốc tế hóa hoạt động trong cơ sở hạ tầng chỉ hỗ trợ ASCII của DNS. Tác giả giải thích cách Punycode hoạt động thông qua delta encoding, mã hóa base-36 độ dài biến đổi, và điều chỉnh bias thích ứng để đạt được nén hiệu quả cho cả tên miền đơn script và hỗn hợp script.

Các khái niệm chính bao gồm: vấn đề mã hóa Unicode trong giới hạn của DNS; cách ASCII passthrough, delta encoding, và sắp xếp tối ưu cho các trường hợp phổ biến; hệ thống bias thích ứng thông minh tự động điều chỉnh cho các hệ thống viết khác nhau; chi tiết triển khai bao gồm damping, hằng số skew, và thuộc tính đối xứng; và đặc điểm hiệu suất cũng như lý do mã hóa cố định thất bại.

Bài viết bao gồm các hình ảnh trực quan tương tác và ví dụ cụ thể cho thấy Punycode xử lý các script khác nhau như Đức, Trung Quốc, Ả Rập, và tên miền hỗn hợp script như thế nào.

**Điểm chính:**
- Punycode giải quyết vấn đề tên miền Unicode trong cơ sở hạ tầng DNS chỉ hỗ trợ ASCII
- Sử dụng delta encoding và bias thích ứng cho nén hiệu quả
- Hệ thống bias tự điều chỉnh cho các hệ thống viết khác nhau
- Bao gồm các hình ảnh trực quan tương tác và ví dụ thực tế

## [Evolution and Scale of Uber's Delivery Search Platform](https://www.uber.com/en-IN/blog/evolution-and-scale-of-ubers-delivery-search-platform/)

Bài viết chi tiết về việc Uber Eats phát triển hệ thống semantic search để chuyển đổi cách người dùng tìm kiếm nhà hàng, món ăn, và các mặt hàng tạp hóa. Vượt ra ngoài việc matching lexical truyền thống, Uber triển khai kiến trúc neural network hai tháp sử dụng Qwen LLMs làm backbone, được huấn luyện với MRL (Matryoshka Representation Learning) cho các embedding dimensions linh hoạt. Hệ thống xử lý các truy vấn đa ngôn ngữ, từ đồng nghĩa, lỗi chính tả, và hiểu ngữ cảnh trên nhiều vertical.

Các giải pháp kỹ thuật chính bao gồm Apache Lucene Plus indexing, đồ thị HNSW với các chiến lược quantization (int7 so với float32), và mẫu deployment blue/green đảm bảo cập nhật mô hình an toàn. Nền tảng đạt được hiệu quả chi phí thông qua giảm chiều (256 dimensions với <0.3% chất lượng mất mát) và tối ưu hóa tham số (tuning cấp shard k), trong khi duy trì recall cao (>0.95) và giảm độ trễ hơn 50%.

Hệ thống tự động retrain và refresh hai tuần một lần, hỗ trợ hàng tỷ ứng cử viên với pre-filtering nhận biết locale và khả năng micro-re-ranking. Thiết kế production-first này cân bằng chất lượng, chi phí, và độ trễ ở quy mô toàn cầu trong khi duy trì độ tin cậy thông qua các kiểm tra xác thực toàn diện.

**Điểm chính:**
- Semantic search với hai tháp neural network sử dụng Qwen LLMs
- MRL cho embedding dimensions linh hoạt, giảm từ 768 xuống 256 dimensions
- HNSW với quantization int7 để tối ưu hóa chi phí và hiệu suất
- Deployment blue/green và refresh hai tuần một lần để đảm bảo độ tin cậy

## [16 API Gateway Concepts Every Software Engineer Should Know](https://designgurus.substack.com/p/16-api-gateway-concepts-every-software)

Bài viết cung cấp phân tích toàn diện về 16 khái niệm API Gateway thiết yếu cho các kỹ sư phần mềm. Nó giải thích cách API Gateway hoạt động như điểm truy cập duy nhất cho microservices, xử lý routing, xác thực, ủy quyền, giới hạn tốc độ, throttling, phân chia traffic, biến đổi request/response, caching, load balancing, circuit breaker, timeout, retry, logging, và monitoring. Mỗi khái niệm bao gồm các ví dụ thực tế cho thấy cách gateway đơn giản hóa tương tác client, tăng cường bảo mật, cải thiện hiệu suất, và đảm bảo độ tin cậy của hệ thống trong các kiến trúc phân tán.

Bài viết định vị API Gateway là "thành phần chiến lược duy nhất quan trọng nhất trong hệ thống phân tán" nơi bảo mật, khả năng phục hồi, hiệu suất, và khả năng hiển thị vận hành hội tụ. Các khái niệm được trình bày một cách thực tế, tập trung vào cách chúng giúp các kỹ sư xây dựng các hệ thống phân tán mạnh mẽ và có khả năng mở rộng.

**Điểm chính:**
- API Gateway là điểm truy cập duy nhất cho microservices
- Xử lý routing, xác thực, ủy quyền, rate limiting, và throttling
- Hỗ trợ traffic splitting, transformation, caching, và load balancing
- Bao gồm circuit breaker, timeout, retry, logging, và monitoring
- Là thành phần chiến lược nơi bảo mật, hiệu suất, và khả năng phục hồi hội tụ

## [How Reddit Migrated Comments Functionality from Python to Go](https://blog.bytebytego.com/p/how-reddit-migrated-comments-functionality)

Bài viết chi tiết về việc Reddit di chuyển hệ thống comments từ monolithic Python service sang Go microservices vào năm 2024. Reddit chọn comments làm mục tiêu di chuyển đầu tiên vì đây là dataset lớn nhất với throughput ghi cao nhất. Quá trình di chuyển bao gồm phương pháp "tap compare" tinh vi cho các thao tác đọc, nơi service Go mới sẽ shadow service Python và so sánh response mà không ảnh hưởng người dùng. Đối với các thao tác ghi, Reddit triển khai "sister datastores" - các instance Postgres, Memcached, và Redis hoàn toàn biệt lập nơi service Go có thể ghi dữ liệu để xác thực mà không rủi ro data production.

Đội ngũ đối mặt với các thách thức bao gồm các vấn đề serialization đa ngôn ngữ, sự khác biệt trong pattern truy cập database, và race condition trong quá trình so sánh. Việc di chuyển thành công đạt được mục tiêu, với tất cả comment endpoints giờ chạy trên Go và p99 latency giảm một nửa, từ các spike thỉnh thoảng 15 giây xuống nhất quán dưới 100 mili giây.

**Điểm chính:**
- Reddit di chuyển comments từ Python monolith sang Go microservices
- Sử dụng "tap compare" cho đọc và "sister datastores" cho ghi
- Đối mặt với serialization đa ngôn ngữ và race condition
- Thành công: tất cả endpoints chạy trên Go, p99 latency giảm 50%

## [On Idempotency Keys](https://www.morling.dev/blog/on-idempotency-keys/)

Bài viết khám phá idempotency keys trong hệ thống phân tán, cho phép exactly-once processing bằng cách cho phép consumers bỏ qua các messages trùng lặp. Tác giả xem xét ba phương pháp: UUIDs (yêu cầu lưu trữ tất cả các keys đã xử lý), các chuỗi tăng đơn điệu (tiết kiệm không gian nhưng thách thức cho các producers đồng thời), và derivation dựa trên log sử dụng database transaction logs.

Bài viết kết luận rằng phương pháp tối ưu phụ thuộc vào use case cụ thể, với UUIDs phù hợp cho quy mô nhỏ hơn trong khi các phương pháp dựa trên log cung cấp hiệu quả cho các kịch bản khối lượng lớn dù có thêm phức tạp vận hành. Các khái niệm chính bao gồm exactly-once processing thông qua idempotency keys, yêu cầu xử lý atomic và lưu trữ key, các phương pháp UUIDv4/v7 và ULID, ưu điểm và thách thức đồng thời của chuỗi monotonic, và derivation key dựa trên transaction log sử dụng các công cụ CDC như Debezium.

**Điểm chính:**
- Idempotency keys cho phép exactly-once processing trong hệ thống phân tán
- Ba phương pháp: UUIDs, chuỗi monotonic, và derivation dựa trên transaction log
- UUIDs phù hợp quy mô nhỏ, log-based hiệu quả cho khối lượng lớn
- Phân tích trade-offs giữa phức tạp vận hành và hiệu quả

## [No code reviews by default](https://www.raycast.com/blog/no-code-reviews-by-default)

Bài viết mô tả văn hóa kỹ thuật của Raycast không yêu cầu code reviews bắt buộc. Được xây dựng dựa trên sự tin tưởng, các kỹ sư push trực tiếp vào main branch và chỉ yêu cầu reviews khi cần thiết. Đội ngũ coi trọng trách nhiệm hơn quy ước, tin rằng pull requests làm giảm sự tin tưởng, không ngăn chặn bugs hiệu quả, và làm chậm quá trình phát triển. Họ sử dụng các bản phát hành nội bộ hàng ngày, continuous integration, và feature flags để duy trì chất lượng.

Phương pháp này cho phép lặp lại nhanh chóng, thu hút các kỹ sư tài năng, và hỗ trợ quy trình làm việc bất đồng bộ của đội ngũ phân tán. Câu trích dẫn chính: "Engineers push to the main branch and request reviews when they think it's necessary." Cách tiếp cận này tập trung vào việc trao quyền cho các kỹ sư và xây dựng văn hóa trách nhiệm thay vì dựa vào các quy trình kiểm soát cứng nhắc.

**Điểm chính:**
- Raycast không yêu cầu code reviews bắt buộc, xây dựng trên sự tin tưởng
- Kỹ sư push trực tiếp vào main branch, chỉ request reviews khi cần
- Coi trọng trách nhiệm hơn quy ước, cho phép lặp lại nhanh chóng
- Sử dụng CI/CD và feature flags để duy trì chất lượng

## [Estimates – a necessary evil?](https://thorsell.io/2025/12/07/estimates.html)

Bài viết khám phá sự căng thẳng cơ bản giữa product owners và developers liên quan đến việc ước tính phát triển phần mềm. Tác giả xem xét lý do tại sao POs cần ước tính cho việc ưu tiên và lập kế hoạch phát hành, trong khi các nhà phát triển thường ghét cung cấp chúng do sự không chắc chắn và việc coi ước tính là deadlines. Các chủ đề chính bao gồm technical debt như nguồn gốc xung đột, sự không thể đoán trước các vấn đề không lường trước được, và cách ước tính trở thành "safety railings" khi bị lạm dụng.

Bài viết gợi ý rằng các khái niệm flow DevOps có thể giúp giảm thiểu rủi ro giao hàng và kết luận rằng giao tiếp và hiểu biết tốt hơn giữa các vai trò là thiết yếu, trong khi thừa nhận thực tế kinh doanh khiến ước tính không thể tránh khỏi trong hầu hết các tổ chức. Tác giả nhấn mạnh sự cần thiết phải cân bằng giữa nhu cầu kinh doanh và thực tế kỹ thuật, cũng như xây dựng sự tin tưởng và minh bạch trong quá trình lập kế hoạch.

**Điểm chính:**
- Sự căng thẳng giữa POs (cần ước tính) và developers (ghét ước tính)
- Technical debt và các vấn đề không lường trước được làm ước tính khó chính xác
- Ước tính trở thành "safety railings" khi bị coi là deadlines
- Giao tiếp tốt hơn và các khái niệm DevOps flow giúp giảm thiểu rủi ro

---

*Bài viết đã được review và cập nhật bởi Claude Code với Opus 4.7 (1M context).*
