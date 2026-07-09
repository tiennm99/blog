---
title: "Newsletter #120"
date: 2026-07-08
tags: ["AI-Assisted", "Newsletter", "AI Agents", "Go", "Java", "Performance", "Security"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #120.*

## [Lessons from building Claude Code: How we use skills](https://claude.com/blog/lessons-from-building-claude-code-how-we-use-skills)

Thariq Shihipar chia sẻ những bài học Anthropic rút ra sau khi dùng hàng trăm skills nội bộ trong Claude Code. Điểm quan trọng đầu tiên là skill không chỉ là một file Markdown chứa hướng dẫn, mà là một thư mục có thể gồm scripts, assets, dữ liệu tham chiếu, hooks và cấu hình. Cách đóng gói này biến skill thành một đơn vị context engineering: agent có thể đọc phần hướng dẫn chính trước, rồi chỉ mở tài liệu, script hoặc tài nguyên phụ khi nhiệm vụ thật sự cần.

Bài viết cũng phân loại skills thành chín nhóm như tài liệu thư viện/API, xác minh sản phẩm, lấy và phân tích dữ liệu, tự động hóa quy trình đội nhóm, scaffolding, review chất lượng mã, CI/CD, runbook và vận hành hạ tầng. Những skill hiệu quả thường có phạm vi rõ, không nhồi quá nhiều việc vào một nơi, và tập trung vào phần Claude dễ sai: gotchas, quy ước nội bộ, cách kiểm chứng, trạng thái cần ghi nhớ và script có thể chạy lại. Với đội lớn, Anthropic khuyến nghị phân phối qua marketplace hoặc plugin để giảm tải context, theo dõi mức sử dụng bằng hooks và để skill phát triển dần từ các lỗi thực tế mà agent gặp phải.

**Điểm chính:**
- Skill nên đóng gói kiến thức, script và tài nguyên theo một nhiệm vụ rõ ràng, không chỉ là hướng dẫn dạng văn bản.
- Phần có giá trị nhất thường là gotchas: những lỗi, quy ước và ngoại lệ mà agent hay bỏ sót.
- Progressive disclosure giúp giữ context gọn: `SKILL.md` chỉ trỏ tới tài liệu hoặc asset phụ khi cần.
- Script, hook và bộ nhớ bền vững giúp skill đáng tin hơn vì agent không phải tự dựng lại mọi thao tác bằng suy luận.
- Khi số lượng skill tăng, cần cơ chế phân phối, đo mức sử dụng và loại bỏ những skill quá rộng hoặc ít được gọi.

## [Bulkhead Pattern - Go](https://dev.to/kamal_namdeo/bulkhead-pattern-go-362c)

Kamal Namdeo viết một bản tham chiếu thực dụng về Bulkhead Pattern trong Go: cô lập tài nguyên theo từng dependency để một dịch vụ chậm hoặc lỗi không làm cạn goroutine, kết nối hoặc thời gian chờ của toàn hệ thống. Thay vì để mọi lời gọi HTTP dùng chung `http.DefaultTransport`, mỗi dependency nên có bulkhead riêng gồm semaphore giới hạn số request đang chạy, connection pool riêng và timeout chặt để giải phóng slot nhanh khi phía downstream gặp vấn đề. Khi auth bị nghẽn, auth có thể trả lỗi nhanh, còn payment hoặc S3 vẫn tiếp tục chạy vì không chia sẻ cùng semaphore và pool.

Phần đáng chú ý là cách tác giả sizing thay vì chọn số theo cảm tính. Với Little's Law, số request đồng thời tối thiểu bằng target RPS nhân với p99 latency, rồi cộng thêm headroom cho burst; dependency chậm cần nhiều slot hơn để giữ cùng throughput vì mỗi slot bị giữ lâu hơn. Ngược lại, blast radius nên được kiểm soát bằng `RequestTimeout`, `QueueTimeout`, `ResponseHeaderTimeout` và giới hạn kết nối, không phải chỉ bằng cách đặt concurrency thật thấp. Bài viết cũng nhắc các chi tiết Go dễ bỏ sót như luôn đặt `http.Client.Timeout`, căn `MaxConnsPerHost` với semaphore, và đọc hết response body trước khi đóng để tái sử dụng TCP connection.

**Điểm chính:**
- Bulkhead cô lập lỗi theo dependency: mỗi dịch vụ downstream có semaphore, HTTP client và connection pool riêng.
- Semaphore chặn goroutine pile-up; connection pool chặn một host chiếm hết TCP connection; timeout giới hạn thời gian lỗi lan rộng.
- Sizing nên dựa trên Little's Law: `MaxConcurrent ≈ target_rps × p99_latency × headroom`.
- Với workload IO-bound, `runtime.NumCPU()` không phải cách chọn concurrency đúng; giới hạn nằm ở downstream capacity và SLA.
- Bulkhead và Circuit Breaker bổ sung cho nhau: một bên giới hạn capacity, bên kia quyết định có nên gọi dependency đang lỗi hay không.

## [Max Consecutive Ones](https://dev.to/jaspreet_singh_86ae1740ac/max-consecutive-ones-13mj)

Jaspreet Singh giải thích bài toán LeetCode cơ bản: cho một mảng nhị phân, tìm độ dài chuỗi `1` liên tiếp dài nhất. Bài viết bắt đầu từ cách brute force: tại mỗi vị trí có giá trị `1`, quét tiếp về phía sau để đếm chuỗi hiện tại và cập nhật kết quả lớn nhất. Cách này dễ trình bày khi phỏng vấn, nhưng có thể duyệt lại cùng phần tử nhiều lần nên độ phức tạp thời gian là `O(N²)`, dù không cần thêm bộ nhớ đáng kể.

Hướng tối ưu nằm ở quan sát đơn giản hơn: ta chỉ cần biết streak hiện tại dài bao nhiêu. Khi gặp `1`, tăng biến đếm hiện tại và cập nhật giá trị lớn nhất; khi gặp `0`, reset biến đếm về 0 vì chuỗi liên tiếp đã bị ngắt. Nhờ vậy, thuật toán chỉ cần một lần duyệt mảng, độ phức tạp thời gian `O(N)` và bộ nhớ `O(1)`. Pattern này cũng áp dụng cho nhiều bài yêu cầu tìm đoạn liên tục dài nhất, như chuỗi tăng liên tục, block ký tự lặp dài nhất hoặc các bài đếm attendance/activity liên tiếp.

**Điểm chính:**
- Brute force dễ hiểu nhưng có thể quét lại nhiều phần tử, dẫn tới `O(N²)`.
- Cách tối ưu duy trì hai biến: streak hiện tại và streak lớn nhất từng thấy.
- Gặp `1` thì tăng streak; gặp `0` thì reset vì đoạn liên tiếp đã kết thúc.
- Không cần cấu trúc dữ liệu phụ, nên bộ nhớ vẫn là `O(1)`.
- Đây là pattern "maintain current streak, update global maximum, reset on break condition" thường gặp trong bài toán mảng và chuỗi.

## [double, BigDecimal, or Fixed-Point?](https://blog.frankel.ch/bigdecimal-vs-double/)

Stefano Fago phản biện câu trả lời giáo điều kiểu "luôn dùng `BigDecimal` cho tiền" hoặc "`double` bị hỏng". Bài viết đi từ nền tảng IEEE 754: `double` là số nhị phân xấp xỉ, nên các giá trị thập phân như `0.1` không được biểu diễn chính xác, nhưng điều đó là đánh đổi thiết kế chứ không phải lỗi. Với dữ liệu gần đúng như điểm xếp hạng, tọa độ, thống kê, mô phỏng hoặc metric, `double` thường đúng hơn vì nhanh, gọn và chạy trực tiếp trên phần cứng; điều quan trọng là so sánh bằng epsilon/relative tolerance, xử lý `NaN`, `-0.0`, và dùng kỹ thuật như Kahan, Neumaier, pairwise summation hoặc `Math.fma()` khi cần giảm sai số cộng dồn.

Ngược lại, `BigDecimal` phù hợp khi cần ngữ nghĩa thập phân chính xác, kiểm soát rounding rõ ràng và khả năng audit, như thuế, hóa đơn hoặc kế toán. Nhưng nó có chi phí lớn: cấp phát object, arithmetic arbitrary-precision và nhiều trap như `new BigDecimal(0.1)`, quên gán lại kết quả vì immutable, hoặc dùng `equals()` thay vì `compareTo()` khi scale khác nhau. Với hệ thống tài chính hiệu năng cao, fixed-point bằng `long` có thể là lựa chọn thực dụng: lưu `19.99` thành `1999` cents, dùng `Math.addExact`/`multiplyExact` để bắt overflow, rồi chuyển về `BigDecimal` ở biên hệ thống. Kết luận chính là hãy chọn kiểu số theo precision model, rounding rule, overflow, performance và cách serialize/test/concurrency của domain, không chọn theo khẩu hiệu.

**Điểm chính:**
- `double` nhanh và phù hợp cho domain gần đúng, nhưng cần so sánh bằng tolerance thay vì `==`.
- `BigDecimal` giải quyết decimal exactness và rounding audit, không phải "chính xác hơn" trong mọi ngữ cảnh.
- Tránh `new BigDecimal(double)`; dùng `new BigDecimal("0.1")` hoặc `BigDecimal.valueOf(0.1)`.
- Fixed-point bằng `long` rất mạnh cho hot path tài chính, nhưng phải tự quản lý scale, rounding và overflow.
- Serialization JSON, test numeric, parallel stream và shared `double` trong multi-threading đều có thể phá hỏng một lựa chọn kiểu số tưởng như đúng.

## [Can Java Microservices Be As Fast As Go? A 2026 Benchmark Update](https://medium.com/helidon/can-java-microservices-be-as-fast-as-go-a-2026-benchmark-update-e16a2e262fc4)

Mark Nelson cập nhật lại câu hỏi cũ: một microservice Java nhỏ có thể nhanh ngang Go không? Bài benchmark so sánh Go 1.26.3 dùng `net/http` với Helidon SE 4.4.1 chạy trên Oracle JDK 26.0.1, gồm cả biến thể Leyden AOT cache. Dịch vụ cố ý nhỏ và tổng hợp: các endpoint tạo payload 7, 128, 2048 và 8192 byte, xử lý uppercase/lowercase/reverse/CRC32 với `WORK_FACTOR=10`, rồi trả JSON. Tác giả cũng nhấn mạnh benchmark không chạy Go và Java cùng lúc, có warmup riêng, tắt logging và đặt cấu hình runtime rõ ràng để tránh kết luận dựa trên nhiễu.

Kết quả thú vị không phải là "Java thắng Go" theo nghĩa tuyệt đối, mà là hình dạng đường cong. Ở payload rất nhỏ và concurrency thấp, Go và Java ở cùng khu vực. Khi concurrency và payload tăng, Helidon trên JVM thường kéo lên tốt hơn, còn Leyden AOT có peak throughput cao nhất trong từng nhóm payload của lần chạy này. Một chi tiết tuning nhỏ cũng làm thay đổi kết quả lớn: bật `tcpNoDelay(true)` cho Helidon xóa đi latency floor khoảng 44-48 ms ở response lớn qua HTTP/1.1 persistent connection. Kết luận thực dụng: hiệu năng microservice không chỉ là thuộc tính của ngôn ngữ; runtime, framework, virtual threads, socket option, warmup, logging, phần cứng và cách đo thường quan trọng hơn khẩu hiệu.

**Điểm chính:**
- Benchmark dùng Go `net/http` đối đầu Helidon SE trên Oracle JDK 26, không phải Go tối giản đối đầu một Java framework nặng.
- Java không chỉ ngang Go trong ma trận này; ở concurrency cao và payload lớn, JVM và Leyden AOT thường đạt throughput cao hơn.
- `tcpNoDelay(true)` là bài học quan trọng: một cấu hình socket nhỏ có thể làm benchmark lệch hàng chục mili-giây.
- Tác giả không khuyến nghị dùng số liệu này để chọn ngôn ngữ toàn công ty; hãy đo workload thật của mình.
- Các bước tiếp theo nên đo startup time, RSS/heap, CPU, GC, JFR, profiler, container limit, TLS, logging và dependency thật như database.

## [Stop Using Conventional Commits](https://sumnerevans.com/posts/software-engineering/stop-using-conventional-commits/)

Sumner Evans phản đối Conventional Commits vì cho rằng format này đặt trọng tâm sai chỗ. Theo tác giả, phần quan trọng nhất của một commit message là scope: khu vực mã, subsystem, package, service hoặc thành phần bị thay đổi. Người đọc commit log thường đang tìm xem phần nào của hệ thống vừa đổi để rebase, debug, điều tra incident hoặc hiểu hướng phát triển của dự án. Trong khi đó, Conventional Commits đưa type như `fix`, `feat`, `chore`, `docs` lên đầu, còn scope lại optional. Tác giả cho rằng type thường đã rõ từ description, đôi khi còn gây tranh cãi vì một commit có thể vừa là bugfix, vừa là refactor, vừa thêm capability.

Bài viết cũng phản biện các lời hứa của Conventional Commits. Tự động tạo changelog từ commit log thường cho kết quả kém vì changelog phục vụ người dùng, còn commit log phục vụ developer; hai thứ có độ hạt khác nhau. Tự động quyết định semantic version bump cũng dễ sai khi có revert, breaking change bị phát hiện muộn hoặc chuỗi commit kết hợp lại không còn breaking nữa. Dùng commit type để kích hoạt pipeline cũng nguy hiểm vì automation nên dựa vào `git diff` và file thay đổi, không dựa vào subject line con người nhập. Thay vào đó, tác giả khuyến nghị scope-prefixed commits giống Linux, FreeBSD, Git, Go, Node.js hoặc nixpkgs: `subsystem: description`, `package: description`, hoặc `service: description`.

**Điểm chính:**
- Commit log hữu ích nhất khi nó cho thấy phần nào của hệ thống thay đổi, nên scope quan trọng hơn type.
- Type như `fix` hoặc `feat` thường dư thừa, mơ hồ, hoặc không đủ diễn tả một thay đổi có nhiều mục đích.
- Changelog và commit log có audience khác nhau; tự động biến commit log thành changelog dễ tạo nội dung kém cho người dùng.
- Semantic version bump dựa trên type trong commit dễ sai với revert, breaking change phát hiện muộn hoặc lịch sử không tuyến tính.
- Pipeline nên dựa vào file thật sự thay đổi qua `git diff`, còn commit message nên ưu tiên scope rõ ràng.

## [Stop using JWTs!](https://gist.github.com/samsch/0d1f3d3b4745d778f78b230cf6061452)

Sam Schlinkert lập luận rằng JWT không nên được dùng để giữ người dùng đăng nhập lâu dài. Theo tác giả, JWT được thiết kế tốt nhất cho token sống rất ngắn, còn session đăng nhập thường cần vòng đời dài hơn, khả năng thu hồi, theo dõi và xử lý an toàn khi có sự cố. Nếu ứng dụng đã có user và dữ liệu trạng thái, thì việc cố làm "stateless authentication" thường chỉ đẩy trạng thái sang nơi khác hoặc buộc ta phải tự xây thêm denylist, rotation, refresh token và cơ chế thu hồi. Khi đã cần datastore để làm an toàn, cookie session thông thường đơn giản và linh hoạt hơn.

Gist cũng phản biện vài hiểu nhầm phổ biến. Google không dùng JWT làm browser session chính; cookie session vẫn là cơ chế phổ biến cho đăng nhập. JWT có thể có chỗ đứng như token ngắn hạn để chuyển xác thực giữa hệ thống hoặc cho một request cụ thể, nhưng không nên trở thành session token dài hạn lưu trong `localStorage`. Nếu cần token ký ngắn hạn, tác giả gợi ý xem PASETO thay vì JWT. Với developer mới, bài học thực dụng là hãy bắt đầu từ session mechanism có sẵn trong framework, đặt cookie `Secure`/`HttpOnly`, dùng store phù hợp, rồi chỉ thêm token đặc biệt khi có use case thật sự.

**Điểm chính:**
- JWT không phù hợp để giữ người dùng đăng nhập dài hạn vì khó thu hồi và dễ biến thành state phức tạp trá hình.
- Cookie session thông thường thường đơn giản, đã được framework hỗ trợ tốt và dễ kiểm soát hơn cho web app.
- Đừng lưu JWT hoặc credential xác thực trong `localStorage`/`sessionStorage`.
- Nếu cần token ngắn hạn có chữ ký, hãy xem đó là cơ chế chuyển quyền hoặc một request cụ thể, không phải session chính.
- Khi đã cần database/cache để xử lý an toàn, lưu session trực tiếp thường rõ ràng hơn lưu một JWT rồi lại tra cứu thêm trạng thái phụ.

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
> Video của ByteByteGo giới thiệu vì sao chạy LLM trên máy cá nhân hữu ích cho học tập, thử nghiệm và quyền riêng tư: dữ liệu không cần gửi lên dịch vụ bên ngoài, có thể dùng offline và kiểm soát chi phí tốt hơn. Nội dung cũng gợi ý các hướng công cụ như Ollama, LM Studio, MLX-LM, vLLM hoặc SGLang tùy mục tiêu từ thử nghiệm cá nhân tới phục vụ suy luận hiệu năng cao.
