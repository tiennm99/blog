---
title: "Newsletter #90"
date: 2026-03-16
tags: ["AI-Assisted", "Newsletter", "Compiler", "AI Agents", "Performance", "System Design", "Nghề nghiệp"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #90.*

## [Against Query Based Compilers](https://matklad.github.io/2026/02/25/against-query-based-compilers.html)

Bài viết của matklad phân tích những hạn chế cơ bản của kiến trúc trình biên dịch dựa trên truy vấn (query-based compiler), dù kiến trúc này đang ngày càng phổ biến. Ý tưởng cốt lõi là áp dụng tính toán tăng dần (incremental computation) vào quá trình biên dịch: các phép tính được biểu diễn dưới dạng đồ thị phụ thuộc, và khi đầu vào thay đổi, chỉ những phần bị ảnh hưởng mới cần tính toán lại.

Tuy nhiên, tác giả chỉ ra rằng hiệu quả của kiến trúc này bị giới hạn bởi cấu trúc phụ thuộc của chính ngôn ngữ lập trình. Một số phép tính có tính "avalanche" — thay đổi nhỏ ở đầu vào dẫn đến thay đổi lớn ở đầu ra — khiến cách tiếp cận tăng dần trở nên kém hiệu quả. Bài viết so sánh Zig và Rust: Zig yêu cầu khai báo tường minh và phân tích cú pháp cô lập theo tệp, cho phép biên dịch đơn giản hơn mà không cần query. Ngược lại, hệ thống macro và trait resolution của Rust tạo ra phụ thuộc toàn crate, buộc phải theo dõi chi tiết từng phần.

Thay vì áp dụng query ở mọi nơi, tác giả đề xuất thiết kế ngôn ngữ để cho phép độc lập theo từng khối lớn, dùng mô hình map-reduce có cấu trúc, và chỉ dùng query-based làm phương án dự phòng thay vì mặc định.

**Điểm chính:**
- Kiến trúc query-based compiler hữu ích nhưng không phải giải pháp toàn năng
- Hiệu quả phụ thuộc vào cấu trúc phụ thuộc của ngôn ngữ, không chỉ vào cách triển khai
- Thiết kế ngôn ngữ (như Zig) có thể tránh được nhu cầu dùng query ngay từ đầu
- Nên ưu tiên kiến trúc đơn giản hơn khi thiết kế ngôn ngữ cho phép

## [The Great Developer Divide: How AI Is Reshaping the Software Job Market Into Three Tiers](https://itrevolution.com/articles/the-great-developer-divide-how-ai-is-reshaping-the-software-job-market-into-three-tiers/)

Bài viết phân tích cách AI đang tái cấu trúc thị trường việc làm phần mềm thành ba tầng riêng biệt, thay vì xóa sổ các vị trí lập trình viên như nhiều người lo ngại. Vai trò lập trình viên trung cấp truyền thống đang dần biến mất, nhường chỗ cho các vị trí chuyên biệt hơn.

Ba tầng được xác định gồm: **Tầng đỉnh** ($250K–$500K+) dành cho các kiến trúc sư chiến lược thiết kế hệ thống tích hợp AI phức tạp; **Tầng trung lai** ($150K–$300K) dành cho các chuyên gia kết hợp kỹ thuật với sản phẩm, thiết kế hoặc vận hành — bao gồm cả vai trò "fleet supervisor" quản lý các đội ngũ AI agent; và **Tầng tự động hóa** ($80K–$130K) tập trung vào các công việc lập trình thông thường đang chịu áp lực kép từ AI và cạnh tranh nhân lực toàn cầu.

Điểm mấu chốt của bài viết: AI không trực tiếp thay thế lập trình viên, mà là đẩy nhanh các lực lượng kinh tế khiến công việc thường quy không còn giữ được mức thu nhập như trước. Tác giả khuyến nghị các lập trình viên cần chủ động chọn tầng phù hợp trong vòng 12–18 tháng tới, đặc biệt chú trọng xây dựng chuyên môn lĩnh vực đặc thù như một lợi thế cạnh tranh.

**Điểm chính:**
- Thị trường việc làm phần mềm đang phân hóa thành ba tầng rõ rệt thay vì biến mất
- Vai trò trung cấp truyền thống bị thu hẹp, xuất hiện các vị trí lai như fleet supervisor, agent expert
- AI thúc đẩy phân hóa thu nhập thông qua lực lượng kinh tế, không chỉ tự động hóa trực tiếp
- Cần định hướng nghề nghiệp sớm và đầu tư vào chuyên môn lĩnh vực đặc thù

## [Engineering Speed at Scale — Architectural Lessons from Sub-100-ms APIs](https://www.infoq.com/articles/engineering-speed-scale/)

Bài viết của Saranya Vedagiri (eBay) phân tích cách xây dựng và duy trì các API phản hồi dưới 100ms. Tác giả nhấn mạnh rằng độ trễ thấp không phải kết quả của việc "tối ưu hóa code", mà là một kết quả kiến trúc có chủ đích, đòi hỏi thiết kế xuyên suốt nhiều tầng hệ thống.

Một trong những khái niệm cốt lõi là **ngân sách độ trễ** (latency budget): thay vì đặt ra một con số hiệu năng chung chung, các hệ thống hiệu quả phân bổ mili giây cụ thể cho từng tầng — định tuyến edge, API gateway, logic ứng dụng, và truy cập dữ liệu. Điều này biến mục tiêu trừu tượng thành ràng buộc cụ thể. Các mẫu kỹ thuật quan trọng bao gồm: xử lý bất đồng bộ song song (async fan-out) với `CompletableFuture`, bộ nhớ đệm đa tầng (local → Redis → database), và circuit breaker để cô lập các phụ thuộc chậm. Bài viết cũng nhấn mạnh tầm quan trọng của khả năng quan sát (observability): theo dõi độ trễ theo phân vị (p50, p95, p99), distributed tracing, và cảnh báo SLO dựa trên burn-rate.

Điểm đáng chú ý là tác giả không chỉ nói về kỹ thuật — văn hóa tổ chức mới là yếu tố duy trì hiệu năng lâu dài. Khi toàn bộ nhóm coi độ trễ là trách nhiệm chung và đưa tư duy hiệu năng vào code review cũng như quy trình phát hành, tốc độ mới được bảo toàn theo thời gian.

**Điểm chính:**
- Hiệu năng là đặc tính sản phẩm, cần được thiết kế từ đầu chứ không phải tối ưu sau
- Phân bổ ngân sách độ trễ theo từng tầng giúp biến mục tiêu trừu tượng thành ràng buộc đo được
- Xử lý bất đồng bộ song song và bộ nhớ đệm đa tầng là hai mẫu kỹ thuật nền tảng
- Theo dõi phân vị độ trễ (p95, p99) và distributed tracing là thiết yếu để phát hiện hồi quy
- Văn hóa tổ chức coi hiệu năng là trách nhiệm chung mới là yếu tố bền vững dài hạn

## [Can AI Agents Build Real Stripe Integrations?](https://stripe.com/blog/can-ai-agents-build-real-stripe-integrations)

Stripe đã tự đặt câu hỏi: liệu các AI agent có thể tự động xây dựng các tích hợp thanh toán hoàn chỉnh và sẵn sàng cho môi trường sản xuất? Để trả lời, họ xây dựng một bộ đánh giá (benchmark) gồm 11 môi trường đa dạng, chia thành ba nhóm: tác vụ backend đơn thuần (nâng cấp API, chuyển đổi phiên bản), tác vụ toàn stack (yêu cầu kiểm thử trên trình duyệt), và bộ bài tập tập trung vào từng tính năng cụ thể của Stripe.

Kết quả đáng chú ý: Claude Opus 4.5 đạt 92% trung bình ở nhóm tác vụ toàn stack, trong khi GPT-5.2 nổi trội hơn ở nhóm bài tập chuyên sâu với 73%. Các agent thành công trong việc nâng cấp tích hợp cũ, sử dụng Stripe Link để kiểm thử, và tự khám phá tài liệu để tìm ra cấu hình API phức tạp. Tuy nhiên, thách thức vẫn còn: xử lý các tình huống mơ hồ, điều hướng trình duyệt khi gặp lỗi, và tự phục hồi khi tương tác giao diện thất bại vẫn là những điểm yếu rõ rệt.

Stripe nhấn mạnh rằng thanh toán yêu cầu độ chính xác 100% — đây là lĩnh vực không có chỗ cho sai sót. Việc công bố bộ benchmark này nhằm thúc đẩy cộng đồng phát triển công cụ cho AI agent tốt hơn.

**Điểm chính:**
- Stripe xây dựng benchmark thực tế để đo khả năng của AI agent trong việc tích hợp thanh toán
- Claude Opus 4.5 đạt hiệu quả cao nhất ở tác vụ toàn stack, GPT-5.2 tốt hơn ở bài tập chuyên sâu
- Các agent có thể tự khám phá tài liệu và giao diện để giải quyết vấn đề phức tạp
- Xử lý tình huống mơ hồ và phục hồi sau lỗi vẫn là thách thức chính
- Thanh toán đòi hỏi độ chính xác tuyệt đối — đặt ra tiêu chuẩn cao hơn nhiều so với tác vụ thông thường

### Bonus

**Hình ảnh:**
![CPU vs GPU vs TPU](https://substackcdn.com/image/fetch/$s_!SFnp!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fdf0d363e-62b7-4b3f-940d-d19f7a55c610_3000x3900.png)
![How OAuth 2 Works](https://substackcdn.com/image/fetch/$s_!ipY-!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F2931d40e-cce8-4ecd-a520-b5f80679c315_2528x3626.png)
![How Distributed Tracing Works at the High Level?](https://substackcdn.com/image/fetch/$s_!Ehq9!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F4f417b56-c66c-45fd-8308-dab9af381ced_2252x2752.png)
![Top 4 API Gateway Use Cases](https://substackcdn.com/image/fetch/$s_!4UUW!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F0357d808-5db9-4e18-8262-8dee58fd697d_2508x3000.jpeg)

---

*Bài viết đã được review và cập nhật bởi Claude Code với Opus 4.7 (1M context).*
