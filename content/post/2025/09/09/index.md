---
title: "Newsletter #53"
date: 2025-09-09
tags: ["AI-Assisted", "Security", "Gaming", "Algorithms", "Kafka", "Distributed Systems", "Vibe Coding"]
categories: ["Newsletter"]
---

*~~Bài này mình thử nghiệm tổng hợp tất cả code agent rules trước đây về thành 1 file AGENTS.md duy nhất, sau đó trỏ CLAUDE.md đọc file này.~~ Mời bạn thưởng thức Newsletter #53.*

## [Anti-cheat, Secure Boot & TPM](https://andrewmoore.ca/blog/post/anticheat-secure-boot-tpm/)

Andrew Moore giải thích việc anti-cheat dùng Secure Boot và TPM 2.0 trong bối cảnh tháng 8/2025. Secure Boot kiểm tra ảnh khởi động theo cơ sở dữ liệu chữ ký được phép và bị cấm; các khóa PK, KEK quản lý quyền cập nhật những cơ sở dữ liệu đó. Kết hợp với chính sách ký driver của Windows, cơ chế này tăng rào cản đưa mã trái phép vào quá trình khởi động và kernel, nhưng không loại trừ driver đã ký có lỗ hổng.

TPM bổ sung khả năng chứng thực: khóa gắn với TPM giúp xác thực thiết bị, còn các thanh ghi PCR tổng hợp phép đo của những thành phần được ghi nhận khi khởi động. `TPM2_Quote` cho phép ký các phép đo để bên xác minh kiểm tra cùng nhật ký và giá trị tham chiếu phù hợp; đó không phải bằng chứng mọi phần mềm trên máy đều sạch. Tác giả cho rằng nhận diện phần cứng và chứng thực làm tăng chi phí né lệnh cấm. Tuy nhiên, không nên suy ra mọi hệ thống đều buộc thay CPU hay không có tác động quyền riêng tư: điều đó phụ thuộc cách triển khai, định danh và dữ liệu nhà cung cấp thu thập. Đây là một lớp phòng thủ, không phải giải pháp chấm dứt gian lận.

## [Left to Right Programming](https://graic.net/p/left-to-right-programming)

Tác giả lập luận rằng chương trình nên luôn hợp lệ ngay trong lúc đang gõ, để trình soạn thảo có thể gợi ý và kiểm tra lỗi ở từng bước. Ví dụ điển hình là list comprehension của Python: khi viết `words_on_lines = [line.split() for line in text.splitlines()]`, biến `line` được dùng trước khi được khai báo, nên trình soạn thảo không biết kiểu dữ liệu để gợi ý phương thức. Ngược lại, với Rust (`let words_on_lines = text.lines().map(|line| line.split_whitespace());`) hay JavaScript, chương trình được xây dựng từ trái sang phải: biến được khai báo trước, và ngay khi gõ dấu chấm, trình soạn thảo đã có thể đề xuất các phương thức phù hợp.

Bài viết liên hệ với nguyên tắc thiết kế "progressive disclosure": độ phức tạp chỉ nên xuất hiện khi người dùng thực sự cần đến nó. Trong C, vì không thể gắn phương thức vào struct, bạn phải biết trước tên các hàm như `fread` hay `fclose` thay vì tình cờ khám phá chúng qua gợi ý khi gõ `file.`. Python cũng gặp vấn đề tương tự với các hàm toàn cục như `len` hay `map`; khi logic phức tạp hơn, một dòng Python lồng nhiều `filter`, `lambda` và comprehension trở nên khó đọc hơn hẳn so với chuỗi phương thức trong JavaScript vốn đọc tuần tự từ trái sang phải. Thông điệp cuối cùng dành cho người thiết kế ngôn ngữ và thư viện rất ngắn gọn: hãy tạo ra những API dễ khám phá.

## [Big O Notation](https://samwho.dev/big-o/)

Bài viết trên samwho.dev giới thiệu Big O notation một cách trực quan với nhiều ví dụ tương tác ngay trong trình duyệt. Thay vì đo thời gian chạy thực tế (wall-clock time), Big O mô tả thời gian thực thi tăng lên như thế nào khi kích thước đầu vào tăng. Tác giả trình bày bốn nhóm độ phức tạp phổ biến: hàm tính tổng từ 1 đến n bằng vòng lặp là O(n) (tuyến tính), còn dùng công thức `(n*(n+1))/2` thì đạt O(1) (hằng số), dù O(1) không có nghĩa là "tức thì" mà chỉ là thời gian không phụ thuộc vào đầu vào. Bubble sort là ví dụ cho O(n²) (bậc hai), còn trò chơi đoán số từ 1 đến 100 bằng tìm kiếm nhị phân, loại bỏ một nửa khả năng sau mỗi lần đoán, minh họa O(log n) (logarit). Big O mô tả cận trên tiệm cận: O(2n) thường viết gọn thành O(n), giữ số hạng tăng nhanh nhất. Có thể phân tích trường hợp tốt, trung bình hoặc xấu; bài tập trung vào trường hợp xấu.

Phần cuối đưa ra các mẹo cải thiện hiệu năng thực tế: dùng `Set` dựa trên bảng băm để tra cứu O(1) trung bình thay vì duyệt mảng (dù việc tạo `Set` tốn O(n)), tránh gọi `.indexOf` bên trong vòng lặp vì sẽ biến cả hàm thành O(n²), và lưu đệm kết quả trung gian như trong hàm tính giai thừa để tránh tính lại, đổi lại tốn thêm bộ nhớ. Lời khuyên quan trọng nhất: luôn đo hiệu năng trước và sau khi thay đổi mã nguồn, đừng mặc định tin vào những gì đọc được trên mạng.

## [Personal AI Evaluations August 2025](https://darkcoding.net/software/personal-ai-evals-aug-2025/)

Graham King tự đánh giá các mô hình ngôn ngữ lớn (LLM) theo nhu cầu cá nhân thay vì dựa vào bảng xếp hạng: anh chọn 12 câu hỏi từ 130 prompt trong lịch sử bash, chia thành bốn nhóm (lập trình, quản trị hệ thống, giải thích kỹ thuật, kiến thức chung và sáng tạo), rồi chạy trên 11 mô hình qua OpenRouter như Claude Sonnet 4, DeepSeek, Gemini 2.5 Flash và Pro, Kimi K2, GPT-OSS-120B, Qwen3 và GLM 4.5. Anh tự viết công cụ bằng Rust để ẩn danh câu trả lời khi chấm điểm, đồng thời ghi lại chi phí, độ trễ và thông lượng của từng mô hình.

Trong mẫu nhỏ do anh tự chấm vào tháng 8/2025, hầu hết mô hình trả lời tốt, nên chi phí và độ trễ chi phối lựa chọn cá nhân. Các mô hình đóng như Gemini 2.5 Pro và Claude Sonnet không hề vượt trội, thậm chí thường kém hơn mô hình mở mà lại đắt hơn rất nhiều. Gemini 2.5 Flash nhanh nhất; Kimi K2, Qwen3 và DeepSeek thuộc nhóm rẻ nhất; còn hai mô hình DeepSeek và hai mô hình Qwen3 có độ chính xác trung bình tốt nhất. Chế độ suy luận (reasoning) hiếm khi giúp ích, ngoại trừ bài làm thơ, và cả quá trình chỉ ghi nhận một lần "ảo giác" khi GPT-OSS-120B bịa ra một bộ phim không tồn tại. Từ đó, tác giả chọn cách hỏi nhiều mô hình cùng lúc bằng tmux: DeepSeek cho câu hỏi hằng ngày, thêm Gemini Flash và Qwen3 khi cần ý kiến thứ hai, và nhóm mô hình suy luận cho những câu hỏi khó.

## [How to Keep Services Running During Failures](https://newsletter.scalablethread.com/p/how-to-keep-services-running-during)

Bài viết từ The Scalable Thread giới thiệu graceful degradation, nguyên tắc thiết kế giúp hệ thống vẫn giữ được chức năng cốt lõi khi một phần gặp sự cố thay vì sập hoàn toàn. Chẳng hạn, nếu dịch vụ gợi ý của một nền tảng video bị lỗi, trang vẫn có thể hiển thị danh sách video phổ biến trong khi chức năng phát video hoạt động bình thường. Nhóm chiến lược đầu tiên tập trung kiểm soát lưu lượng: rate limiting giới hạn số yêu cầu trong các đợt khuyến mãi lớn hay tấn công từ chối dịch vụ; request coalescing gộp hàng nghìn truy vấn giống nhau thành một để giảm tải cho cơ sở dữ liệu; load shedding chủ động bỏ các yêu cầu không quan trọng (như ghi nhận lượt nhấp) để ưu tiên giao dịch mua hàng; và thử lại kèm jitter, tức thêm độ trễ ngẫu nhiên, giúp tránh "thundering herd problem" khi dịch vụ vừa phục hồi.

Nhóm chiến lược thứ hai xử lý lỗi và tăng khả năng quan sát hệ thống. Circuit breaker hoạt động như cầu dao điện: khi dịch vụ thanh toán liên tục lỗi, dịch vụ đặt hàng sẽ ngắt mạch và trả lỗi ngay lập tức trong một khoảng thời gian (ví dụ 60 giây), sau đó mới cho vài yêu cầu đi qua để kiểm tra dịch vụ đã hồi phục chưa. Request timeout ngăn dịch vụ phía trên cạn kiệt luồng xử lý hay kết nối vì phải chờ một dịch vụ chậm. Cuối cùng, giám sát và cảnh báo dựa trên các chỉ số như tỷ lệ lỗi, độ trễ hay độ dài hàng đợi của message broker giúp kỹ sư phát hiện và xử lý sự cố trước khi nó lan rộng.

## [Why Was Apache Kafka Created?](https://bigdata.2minutestreaming.com/p/why-was-apache-kafka-created)

Bài viết từ 2 Minute Streaming giải thích vì sao Kafka ra đời. Khoảng năm 2012, LinkedIn dùng dữ liệu hoạt động của người dùng cho nhiều tính năng cốt lõi, nhưng lại vận hành hai đường ống dữ liệu riêng biệt: một hệ thống xử lý theo lô hằng giờ, gửi thông điệp XML qua máy chủ HTTP để nạp vào kho dữ liệu Oracle và Hadoop, và một hệ thống gần thời gian thực cho số liệu giám sát chạy trên Zenoss. Cả hai đều tốn công vận hành thủ công, tồn đọng lớn, và chỉ là đường ống điểm-tới-điểm không tích hợp được với nhau. Những vấn đề cụ thể gồm phải phân tích hàng trăm schema XML, khó thay đổi schema mà không làm hỏng hệ thống phía sau, độ trễ tính bằng giờ, và dữ liệu sạch chỉ nằm trong kho dữ liệu.

Kafka giải quyết các vấn đề đó nhờ kiến trúc phân tán có nhân bản, mở rộng theo chiều ngang bằng partition, cấu trúc log cho phép nhiều bên đọc cùng lúc, và lưu dữ liệu xuống đĩa để tách bên ghi khỏi bên đọc. LinkedIn còn chuyển từ XML sang Avro (nhỏ hơn khoảng 7 lần), xây dựng dịch vụ quản lý phiên bản schema, tiền thân của Schema Registry, kèm cơ chế kiểm tra tương thích ngược, áp dụng mô hình "schema on write" để làm sạch dữ liệu ngay khi vào Kafka, và chuyển trách nhiệm định nghĩa schema về cho đội tạo ra dữ liệu cùng quy trình duyệt bắt buộc. Điều khiến tác giả bất ngờ là tài liệu gốc đã đề cao schema từ hơn 13 năm trước, trong khi ông coi việc thiếu hỗ trợ schema bẩm sinh là sai lầm lớn nhất của Kafka.

## [How We Vibe Code at a FAANG](https://www.reddit.com/r/vibecoding/comments/1myakhd/how_we_vibe_code_at_a_faang/)

Một người dùng Reddit tự giới thiệu là kỹ sư AI có hơn mười năm kinh nghiệm, khoảng một nửa tại FAANG hoặc công ty tương tự, chia sẻ cách nhóm của anh đưa AI vào quy trình phát triển phần mềm cho môi trường vận hành thật, nhằm phản bác ý kiến rằng lập trình có AI hỗ trợ không thể dùng cho sản phẩm thực tế. Quy trình vẫn bắt đầu từ tài liệu thiết kế kỹ thuật: bản đề xuất cần được các bên liên quan đồng thuận, sau đó là thiết kế hệ thống đầy đủ về kiến trúc và tích hợp với các đội khác, rồi đến buổi đánh giá thiết kế nơi các kỹ sư cấp cao "mổ xẻ" kỹ lưỡng, điều tác giả gọi là dồn cái khó lên phía trước. Tiếp theo là tài liệu hóa từng hệ thống con, lập danh sách công việc và lên kế hoạch sprint cùng PM và TPM.

Chỉ đến giai đoạn viết mã, AI mới trở thành "cấp số nhân" cho năng suất: nhóm áp dụng Test Driven Development, để AI agent viết kiểm thử trước rồi mới xây dựng tính năng. Mã nguồn cần hai lập trình viên phê duyệt trước khi được hợp nhất (AI cũng bắt đầu hỗ trợ khâu duyệt mã), rồi được kiểm thử trên môi trường staging trước khi triển khai chính thức. Theo người đăng, thời gian đưa tính năng ra vận hành giảm khoảng 30%; đây là số liệu tự báo cáo, chưa được kiểm chứng độc lập. Nhiều bình luận cho rằng đây thực chất không phải "vibe coding" mà là lập trình có AI hỗ trợ trong một quy trình doanh nghiệp bài bản, và chính tác giả cũng đồng ý với cách gọi đó.

*Đánh giá hiệu quả của AGENTS.md: Chưa được tốt lắm, còn chứa tiếng Anh nhiều. Mình sẽ cố gắng cải thiện thêm trong các bài viết tới. Hẹn gặp lại*

---

*Bài viết đã được viết lại bởi Claude Code với Opus 5.5 vào ngày 27/09/2026; được review và chỉnh sửa bởi Codex với GPT 6.1 Sol vào ngày 09/11/2026.*
