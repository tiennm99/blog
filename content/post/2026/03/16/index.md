---
title: "Newsletter #90"
date: 2026-03-16
tags: ["AI-Assisted", "Newsletter", "Compiler", "AI Agents", "Performance", "System Design", "Nghề nghiệp"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #90.*

## [Against Query Based Compilers](https://matklad.github.io/2026/02/25/against-query-based-compilers.html)

Trình biên dịch dựa trên truy vấn (query-based compiler) đang rất thịnh hành, và matklad dùng bài viết này để chỉ ra những "bãi đá ngầm" của nó. Ý tưởng khá đơn giản: xem một lần chạy trình biên dịch như đồ thị các lời gọi hàm; khi một đầu vào thay đổi, chỉ cần tính lại các nút nằm trên đường từ đầu vào đó tới truy vấn gốc, kèm tối ưu "cắt sớm" (early cutoff) khi kết quả trung gian không đổi. Tuy nhiên, khối lượng cập nhật không thể nhỏ hơn mức thay đổi của đầu ra: với các phép tính có tính "tuyết lở" (avalanche) như hàm băm hay mã hóa, sửa một ký tự làm thay đổi gần như toàn bộ kết quả, nên tính tăng dần trở nên vô ích. Tác giả kết luận hiệu quả của mô hình này bị giới hạn bởi cấu trúc phụ thuộc của chính ngôn ngữ nguồn.

So sánh Zig và Rust làm rõ điều đó. Trong Zig, mỗi tệp được phân tích cú pháp và phân giải tên độc lập, song song, vì mọi tên đều phải khai báo tường minh. Còn trong Rust, macro sinh ra mã mới và việc phân giải tên diễn ra trên toàn crate, nên gõ một dòng trong `a.rs` có thể thay đổi kết quả phân tích `b.rs`; hệ thống trait còn tạo phụ thuộc vào cả việc *không tồn tại* các khối `impl` xung đột ở tệp khác. Lời khuyên của tác giả là thiết kế ngôn ngữ sao cho có thể chia việc biên dịch thành các khối lớn độc lập theo kiểu map-reduce, và chỉ dùng truy vấn như phương án dự phòng, càng muộn trong quy trình biên dịch càng tốt.

## [The Great Developer Divide: How AI Is Reshaping the Software Job Market Into Three Tiers](https://itrevolution.com/articles/the-great-developer-divide-how-ai-is-reshaping-the-software-job-market-into-three-tiers/)

Bài viết của IT Revolution cho rằng AI không khai tử nghề lập trình mà đang phân hóa thị trường việc làm phần mềm thành ba tầng, trong khi những vị trí "lập trình viên Java khá" lương 150 nghìn đô ổn định đang dần biến mất. **Tầng đỉnh** (250–500 nghìn đô trở lên) dành cho những người có tư duy hệ thống chiến lược, điều phối AI và phán đoán kiến trúc. **Tầng giữa lai** (150–300 nghìn đô) kết hợp kỹ thuật với sản phẩm, thiết kế hoặc vận hành, với các vai trò mới như fleet supervisor giám sát cả đội AI agent, hay agent expert. **Tầng dễ bị tự động hóa** (80–130 nghìn đô và đang thu hẹp) gồm các công việc lập trình lặp lại, chịu áp lực kép từ AI và nguồn nhân lực toàn cầu.

Theo tác giả, AI không trực tiếp cướp việc mà đẩy nhanh các lực kinh tế khiến công việc thường quy không còn đáng giá ở mức lương cũ, tương tự hiện tượng phân cực việc làm trong ngành sản xuất nhưng với tốc độ nhanh hơn nhiều. Nhu cầu tuyển kỹ sư vẫn tăng, chỉ là chuyển dịch về chất. Các kỹ năng được nhấn mạnh gồm viết prompt, nền tảng AI/ML, thiết kế hệ thống, đọc mã nguồn thật nhanh, biết lúc nào nên giao việc cho AI và giữ thái độ hoài nghi có chủ đích với kết quả AI tạo ra. Lời khuyên cho lập trình viên là chủ động chọn tầng của mình và đầu tư vào chuyên môn lĩnh vực đặc thù như một lợi thế cạnh tranh.

## [Engineering Speed at Scale — Architectural Lessons from Sub-100-ms APIs](https://www.infoq.com/articles/engineering-speed-scale/)

Bài viết trên InfoQ lập luận rằng độ trễ thấp không đến từ việc tinh chỉnh vài dòng mã nguồn mà là kết quả của thiết kế có chủ đích, và nên được coi là một tính năng sản phẩm ngang hàng với bảo mật hay độ tin cậy. Ở quy mô lớn, vài chục mili giây chậm trễ cộng dồn qua từng dịch vụ và kéo tụt tỷ lệ chuyển đổi. Công cụ trung tâm là **ngân sách độ trễ** (latency budget): chia mục tiêu 100ms cho từng chặng như edge, gateway, logic dịch vụ, truy cập dữ liệu và mạng, để mọi tính năng mới đều phải trả lời câu hỏi "tầng nào nhường lại mili giây?". Tác giả cũng chỉ ra độ trễ thường đến từ số chặng mạng, chi phí tuần tự hóa JSON, bộ nhớ đệm nguội, truy vấn thiếu chỉ mục và dịch vụ phụ thuộc chậm, hơn là từ "mã nguồn chậm".

Các mẫu kỹ thuật chính gồm gọi song song bất đồng bộ (async fan-out) với `CompletableFuture` và thread pool được định cỡ cẩn thận, bộ nhớ đệm hai tầng (Caffeine cục bộ rồi Redis, trước khi xuống cơ sở dữ liệu) kèm chiến lược vô hiệu hóa và phân loại dữ liệu nhạy cảm, cùng circuit breaker và timeout khớp với ngân sách để thất bại nhanh thay vì chờ đợi. Khả năng quan sát là điều kiện bắt buộc: theo dõi phân vị p50/p95/p99, distributed tracing và cảnh báo SLO theo burn-rate để phát hiện suy giảm sớm. Cuối cùng, tác giả nhấn mạnh văn hóa mới là thứ giữ hệ thống nhanh lâu dài, khi cả nhóm cùng chịu trách nhiệm về độ trễ và đưa câu hỏi hiệu năng vào review thiết kế lẫn quy trình phát hành.

## [Can AI Agents Build Real Stripe Integrations?](https://stripe.com/blog/can-ai-agents-build-real-stripe-integrations)

Stripe muốn biết liệu AI agent có thể tự xây dựng trọn vẹn một tích hợp thanh toán hay không, bởi với thanh toán, một tích hợp "gần đúng" vẫn là thất bại. Họ xây dựng bộ benchmark gồm 11 môi trường mô phỏng dự án thực tế, có mã nguồn, cơ sở dữ liệu, script và khóa API thử nghiệm, chấm điểm bằng các bài kiểm thử tự động qua API và giao diện. Các tác vụ chia thành ba nhóm: chỉ backend (di chuyển dữ liệu, nâng cấp phiên bản API), toàn stack (phải dùng trình duyệt để nộp bài), và các bài tập "gym" đi sâu vào một tính năng như Checkout hay subscription. Mọi mô hình đều chạy trên cùng một harness dựa trên goose, với MCP server cung cấp terminal, trình duyệt và công cụ tìm kiếm tài liệu.

Kết quả vượt kỳ vọng: Claude Opus 4.5 đạt trung bình 92% ở nhóm toàn stack, còn GPT-5.2 dẫn đầu nhóm gym với 73%. Agent đã nâng cấp tích hợp Card Element cũ lên Checkout, tự dùng Stripe Link để hoàn tất giao dịch thử, và suy ngược đúng hơn 80% tham số API từ giao diện Checkout có sẵn. Dù vậy, chúng vẫn xử lý kém các tình huống mơ hồ, chẳng hạn coi lỗi 400 do dữ liệu giả là dấu hiệu endpoint hoạt động tốt, và đôi khi bỏ cuộc khi thao tác trình duyệt bị kẹt dù chỉ cần tải lại trang. Stripe công bố bộ benchmark trong AI toolkit của mình để cộng đồng cùng cải thiện công cụ cho agent; ngay trong quá trình làm, nó đã giúp họ phát hiện và sửa một số lỗi tài liệu.

### Bonus

**Hình ảnh:**
![CPU vs GPU vs TPU](https://substackcdn.com/image/fetch/$s_!SFnp!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fdf0d363e-62b7-4b3f-940d-d19f7a55c610_3000x3900.png)
![How OAuth 2 Works](https://substackcdn.com/image/fetch/$s_!ipY-!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F2931d40e-cce8-4ecd-a520-b5f80679c315_2528x3626.png)
![How Distributed Tracing Works at the High Level?](https://substackcdn.com/image/fetch/$s_!Ehq9!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F4f417b56-c66c-45fd-8308-dab9af381ced_2252x2752.png)
![Top 4 API Gateway Use Cases](https://substackcdn.com/image/fetch/$s_!4UUW!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F0357d808-5db9-4e18-8262-8dee58fd697d_2508x3000.jpeg)

---

*Bài viết đã được viết lại bởi Claude Code với Opus 5.5 vào ngày 27/09/2026.*
