---
title: "Newsletter #120"
date: 2026-07-08
tags: ["AI-Assisted", "Newsletter", "AI Agents", "Go", "Java", "Performance", "Security"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #120.*

## [Lessons from building Claude Code: How we use skills](https://claude.com/blog/lessons-from-building-claude-code-how-we-use-skills)

Thariq Shihipar, thành viên đội Claude Code tại Anthropic, tổng kết những bài học rút ra sau khi đội ngũ xây dựng và sử dụng hàng trăm skill nội bộ. Điểm cốt lõi là skill không chỉ là một file Markdown chứa hướng dẫn mà là cả một thư mục có thể gồm script, tài nguyên, dữ liệu tham chiếu, hook và cấu hình. Cách tổ chức này cho phép tiết lộ dần thông tin (progressive disclosure): agent đọc `SKILL.md` trước, rồi chỉ mở tài liệu hoặc script phụ khi nhiệm vụ thực sự cần, nhờ đó context luôn gọn. Tác giả chia skill thành chín nhóm, từ tài liệu thư viện/API, xác minh sản phẩm, phân tích dữ liệu, tự động hóa quy trình, dựng khung mã nguồn, review mã, CI/CD, runbook đến vận hành hạ tầng.

Về cách viết, bài khuyên đừng lặp lại những điều Claude vốn đã biết mà tập trung vào phần đẩy nó ra khỏi lối suy nghĩ mặc định, đặc biệt là mục gotchas ghi lại các lỗi, quy ước và ngoại lệ agent hay bỏ sót, được bồi đắp dần qua từng lần gặp lỗi thực tế. Nên nêu mục tiêu thay vì ép từng bước cứng nhắc, cung cấp cơ chế ghi nhớ (log hoặc file JSON) để giữ trạng thái giữa các phiên, và đính kèm script trợ giúp để agent ghép lại thay vì tự dựng lại mọi thao tác bằng suy luận. Với đội lớn, skill có thể được đưa thẳng vào repository hoặc phân phối qua marketplace plugin nội bộ, để mỗi người tự chọn cài skill cần dùng và tránh làm phình context; hook có thể dùng để theo dõi mức độ sử dụng, từ đó loại bỏ những skill quá rộng hoặc ít được gọi.

## [Bulkhead Pattern - Go](https://dev.to/kamal_namdeo/bulkhead-pattern-go-362c)

Kamal Namdeo trình bày Bulkhead Pattern trong Go: cô lập tài nguyên theo từng dependency để một dịch vụ chậm hay lỗi không kéo cạn goroutine, kết nối và thời gian chờ của cả hệ thống. Thay vì để mọi lời gọi HTTP dùng chung `http.DefaultTransport`, mỗi dịch vụ phía sau có bulkhead riêng gồm ba lớp: semaphore giới hạn số request đang xử lý (dùng `TryAcquire` để từ chối ngay khi đầy), connection pool riêng qua `MaxConnsPerHost` để một host không chiếm hết kết nối TCP, và các timeout chặt để nhanh chóng giải phóng tài nguyên khi phía bên kia gặp sự cố. Nhờ vậy, khi dịch vụ xác thực bị nghẽn, thanh toán hay S3 vẫn chạy bình thường.

Phần giá trị nhất là cách xác định kích thước bằng tính toán thay vì cảm tính. Theo Little's Law, số request đồng thời cần có bằng RPS mục tiêu nhân với độ trễ p99, cộng thêm khoảng 30% dự phòng cho lúc tải tăng đột biến; dependency càng chậm thì càng cần nhiều slot để giữ cùng thông lượng. Phạm vi ảnh hưởng khi lỗi được khống chế bằng các timeout như `ResponseHeaderTimeout` (khoảng p99 nhân 1,2), `Client.Timeout` cho toàn bộ vòng đời request, thời gian bắt tay TCP một đến hai giây và `QueueTimeout` tính từ SLA trừ đi độ trễ phía sau. Tác giả cũng nhắc các lỗi Go dễ gặp: `runtime.NumCPU()` không phù hợp để chọn mức đồng thời cho tác vụ IO vì goroutine chờ mạng không tốn CPU, cần đọc hết response body trước khi đóng để tái sử dụng kết nối, và đặt `MaxIdleConns` bằng tổng giới hạn kết nối rảnh của từng host để các dependency không đẩy kết nối của nhau ra ngoài.

## [Max Consecutive Ones](https://dev.to/jaspreet_singh_86ae1740ac/max-consecutive-ones-13mj)

Jaspreet Singh giải thích bài LeetCode cơ bản: cho một mảng nhị phân, tìm độ dài dãy số `1` liên tiếp dài nhất, với lời giải viết bằng Java. Cách vét cạn là tại mỗi vị trí có giá trị `1`, quét tiếp về phía sau để đếm dãy hiện tại và cập nhật giá trị lớn nhất. Cách này dễ trình bày khi phỏng vấn nhưng duyệt lại cùng một phần tử nhiều lần, nên độ phức tạp thời gian là `O(N²)`, dù bộ nhớ chỉ tốn `O(1)`.

Lời giải tối ưu dựa trên một nhận xét đơn giản: dãy liên tiếp chỉ kéo dài khi ta còn gặp số `1` và bị ngắt ngay khi xuất hiện số `0`, nên chỉ cần biết dãy hiện tại dài bao nhiêu. Ta giữ hai biến là độ dài dãy hiện tại và độ dài lớn nhất từng thấy; gặp `1` thì tăng biến đếm và cập nhật giá trị lớn nhất, gặp `0` thì đặt lại biến đếm về 0. Thuật toán chỉ duyệt mảng một lần, đạt thời gian `O(N)` và bộ nhớ `O(1)`, không cần vòng lặp lồng nhau. Theo tác giả, nhận ra mẫu "duy trì chuỗi hiện tại, cập nhật cực đại, đặt lại khi điều kiện bị phá vỡ" giúp giải nhanh nhiều bài phỏng vấn khác về đoạn liên tiếp dài nhất.

## [double, BigDecimal, or Fixed-Point?](https://blog.frankel.ch/bigdecimal-vs-double/)

Stefano Fago phản biện các khẩu hiệu kiểu "tiền thì luôn dùng `BigDecimal`" hay "`double` bị hỏng". Theo IEEE 754, `double` là số nhị phân gần đúng nên các giá trị thập phân như `0.1` không được biểu diễn chính xác, nhưng đó là đánh đổi có chủ đích. Với dữ liệu vốn gần đúng như phân tích, học máy hay mô phỏng, `double` thường là lựa chọn đúng vì nhanh và chạy trực tiếp trên phần cứng; điều cần làm là so sánh bằng ngưỡng sai số thay vì `==`, xử lý `NaN`, `-0.0`, và dùng các kỹ thuật như Kahan, Neumaier, cộng theo cặp hoặc `Math.fma()` khi muốn giảm sai số tích lũy.

Ngược lại, `BigDecimal` phù hợp khi cần độ chính xác thập phân, quy tắc làm tròn rõ ràng và khả năng kiểm toán, như thuế, hóa đơn hay kế toán, nhưng phải trả giá bằng việc cấp phát đối tượng và phép tính độ chính xác tùy ý. Nó cũng có nhiều bẫy: `new BigDecimal(0.1)` mang theo sai số của `double` (nên dùng `new BigDecimal("0.1")` hoặc `BigDecimal.valueOf(0.1)`), quên gán lại kết quả vì đối tượng bất biến, hay dùng `equals()` vốn so cả scale thay vì `compareTo()`. Với hệ thống tài chính hiệu năng cao, số điểm cố định bằng `long` là phương án thực dụng: lưu `19.99` thành `1999` xu, dùng `Math.addExact` hoặc `multiplyExact` để phát hiện tràn số, rồi chuyển về `BigDecimal` ở biên hệ thống. Tác giả cũng cảnh báo việc mất scale khi tuần tự hóa JSON và kết quả không tái lập được với `DoubleStream` song song. Kết luận: hãy chọn kiểu số theo yêu cầu độ chính xác, quy tắc làm tròn và ràng buộc hiệu năng của từng miền nghiệp vụ, không theo khẩu hiệu.

## [Can Java Microservices Be As Fast As Go? A 2026 Benchmark Update](https://medium.com/helidon/can-java-microservices-be-as-fast-as-go-a-2026-benchmark-update-e16a2e262fc4)

Sáu năm sau, Mark Nelson quay lại câu hỏi: một microservice Java nhỏ có nhanh ngang Go không? Tác giả so sánh Go 1.26.3 dùng `net/http` với Helidon SE 4.4.1 (xử lý request bằng virtual thread) trên Oracle JDK 26.0.1, kèm một biến thể dùng Leyden AOT cache. Dịch vụ cố ý nhỏ và mang tính tổng hợp: endpoint sinh dữ liệu đầu vào 7, 128, 2048 hoặc 8192 byte, thực hiện chuyển chữ hoa, chữ thường, đảo chuỗi và tính CRC32 với `WORK_FACTOR=10`, rồi trả JSON. Hai bên chạy lần lượt, có làm nóng riêng và tắt ghi log. Trước khi đo, tác giả phát hiện Helidon có độ trễ tối thiểu khoảng 44–48 ms với phản hồi lớn trên kết nối HTTP/1.1 dùng lại; chỉ cần bật `tcpNoDelay(true)` là vấn đề biến mất.

Kết quả đáng chú ý nằm ở hình dạng đường cong chứ không phải câu "Java thắng Go". Với dữ liệu nhỏ và mức đồng thời thấp, cả ba cấu hình ở cùng khoảng hiệu năng. Khi số kết nối đồng thời và kích thước dữ liệu tăng, Java mở rộng tốt hơn rõ rệt: ở 2 KB, Go đạt đỉnh khoảng 17 nghìn request mỗi giây, trong khi JVM thường đạt khoảng 39,5 nghìn và Leyden AOT khoảng 41,6 nghìn. Leyden AOT có thông lượng đỉnh cao nhất ở mọi kích thước dữ liệu, còn Go không thắng ô đo nào dù bám sát ở các trường hợp nhỏ nhất. Tác giả nhấn mạnh không nên dùng các con số này để áp chính sách ngôn ngữ cho cả công ty mà hãy tự đo trên khối lượng công việc thực tế; runtime, framework, phần cứng, làm nóng, ghi log và thiết lập socket thường quan trọng không kém ngôn ngữ.

## [Stop Using Conventional Commits](https://sumnerevans.com/posts/software-engineering/stop-using-conventional-commits/)

Sumner Evans phản đối Conventional Commits vì cho rằng định dạng này đặt trọng tâm sai chỗ. Theo tác giả, thông tin quan trọng nhất của một commit message là scope, tức khu vực mã nguồn, hệ thống con, package hay dịch vụ bị thay đổi. Người đọc lịch sử commit thường đang rebase, gỡ lỗi hoặc điều tra sự cố, nên họ cần biết ngay phần nào của hệ thống vừa đổi. Thế nhưng Conventional Commits lại đưa loại thay đổi như `fix`, `feat`, `chore` lên đầu và để scope là tùy chọn. Trong khi đó, loại thay đổi thường đã hiển nhiên từ phần mô tả, và đôi khi còn gây tranh cãi vì một commit có thể vừa sửa lỗi, vừa tái cấu trúc, vừa thêm tính năng.

Bài viết lần lượt bác bỏ các lợi ích mà Conventional Commits hứa hẹn. Tự động sinh changelog từ lịch sử commit cho kết quả kém vì changelog phục vụ người dùng còn commit log phục vụ lập trình viên, hai đối tượng cần mức chi tiết khác nhau. Tự động tăng phiên bản theo semantic versioning dễ sai khi có revert, thay đổi phá vỡ tương thích bị phát hiện muộn hoặc được sửa lại sau đó. Dựa vào loại commit để kích hoạt pipeline còn tiềm ẩn rủi ro bảo mật, vì tự động hóa nên căn cứ vào các file thực sự thay đổi chứ không phải dòng tiêu đề do người gõ. Thay vào đó, tác giả khuyến nghị kiểu commit bắt đầu bằng scope như Linux, FreeBSD, Git, Go hay Node.js đang dùng, dạng `scope: mô tả`, ví dụ `net/http/cookiejar: add godoc links`, với scope phản ánh cách chia tự nhiên của từng dự án.

## [Stop using JWTs!](https://gist.github.com/samsch/0d1f3d3b4745d778f78b230cf6061452)

Sam Schlinkert lập luận rằng không nên dùng JWT để duy trì phiên đăng nhập của người dùng. Đặc tả JWT vốn được thiết kế cho token sống rất ngắn, khoảng năm phút trở xuống, trong khi phiên đăng nhập cần vòng đời dài hơn và khả năng thu hồi. Ý tưởng "xác thực không trạng thái" thực chất không an toàn: để làm đúng, ta vẫn phải lưu trạng thái ở đâu đó thông qua danh sách chặn, xoay vòng hay refresh token. Khi đã phải có kho dữ liệu, cookie session truyền thống đơn giản và linh hoạt hơn. Tác giả cũng cho biết giới chuyên gia bảo mật không tin tưởng bản thân đặc tả JWT, vì phiên bản ban đầu từng cho phép tạo token giả.

Gist còn đính chính một hiểu nhầm phổ biến: Google không dùng JWT cho phiên trình duyệt mà dùng cookie session thông thường với các bản ghi được ký và mã hóa, còn JWT chỉ xuất hiện trong kịch bản đăng nhập một lần (SSO). Tác giả cảnh báo không lưu thông tin xác thực, kể cả JWT, trong `localStorage` vì dễ bị lộ qua tấn công XSS. Nếu thật sự cần token ngắn hạn có chữ ký, nên cân nhắc PASETO, một đặc tả được thiết kế an toàn hơn. Với lập trình viên mới, bài học thực dụng là bắt đầu từ cơ chế session có sẵn của framework, dùng cookie `Secure` và `HttpOnly` cùng kho lưu phiên phù hợp như Redis hay cơ sở dữ liệu, và chỉ thêm token đặc biệt khi có nhu cầu thực sự.

### Bonus

**Images:**
![The AI Agent Stack, Explained](https://substackcdn.com/image/fetch/$s_!N2N1!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5edb76e4-d060-48d2-bd73-afe04f1cff5a_1284x1536.jpeg)
![Understanding Git Reset Modes](https://substackcdn.com/image/fetch/$s_!wI2g!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F148840a3-d7df-4308-adad-c227f4d280e8_2360x2960.png)
![How NAT Works](https://substackcdn.com/image/fetch/$s_!CKOS!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8d2521b0-1dd8-4b28-afbd-34f2bb44ee50_2360x2960.png)
![SLMs vs. LLMs, Clearly Explained](https://substackcdn.com/image/fetch/$s_!HMwY!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F6af9e24b-9be2-4a45-9f81-14ec6f4330ca_2484x3002.png)
![Single Agent vs. Multi-Agent Architecture](https://substackcdn.com/image/fetch/$s_!Z5zI!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5233378c-3c59-40b1-9de2-6515b9d3e928_2484x3002.png)
![7 Permission Modes Every Claude Code User Should Know](https://substackcdn.com/image/fetch/$s_!U8C6!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F1b849efb-0467-4a5d-b735-f2296b125e9f_2484x3002.png)

**Videos:**
[Chạy LLM cục bộ để học và bảo vệ quyền riêng tư](https://www.youtube.com/watch?v=U8lGbSaCCYI)
> Video của ByteByteGo giải thích vì sao chạy LLM ngay trên máy cá nhân có lợi cho việc học, thử nghiệm và quyền riêng tư: dữ liệu không phải gửi ra dịch vụ bên ngoài, có thể dùng khi không có mạng và kiểm soát chi phí tốt hơn. Video cũng điểm qua các công cụ như Ollama, LM Studio, MLX-LM, vLLM hay SGLang, tùy mục tiêu từ thử nghiệm cá nhân đến phục vụ suy luận hiệu năng cao.

---

*Bài viết đã được viết lại bởi Claude Code với Opus 5.5 vào ngày 27/09/2026.*
