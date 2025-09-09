---
title: "Newsletter #53"
date: 2025-09-09
tags: ["AI-Assisted", "Technology", "Security", "Gaming", "Programming", "Algorithms", "AI", "DevOps", "Big-Data", "FAANG"]
categories: ["Newsletter"]
---

*Bài này mình thử nghiệm tổng hợp tất cả code agent rules trước đây về thành 1 file AGENTS.md duy nhất, sau đó trỏ CLAUDE.md đọc file này. Mời bạn thưởng thức Newsletter #53.*

## [Anti-cheat, Secure Boot & TPM](https://andrewmoore.ca/blog/post/anticheat-secure-boot-tpm/)

Bài viết này khám phá mối quan hệ phức tạp giữa các hệ thống chống gian lận (anti-cheat), Secure Boot và Trusted Platform Module (TPM) trong ngành công nghiệp game hiện đại. Tác giả Andrew Moore phân tích cách các nhà phát triển game sử dụng những công nghệ bảo mật này để đảm bảo tính toàn vẹn của trò chơi.

**Secure Boot và TPM trong gaming**: Secure Boot đảm bảo rằng chỉ những phần mềm được ký số hợp lệ mới có thể chạy trong quá trình khởi động hệ thống, trong khi TPM cung cấp một môi trường tin cậy để lưu trữ các khóa mã hóa và thông tin nhạy cảm. Khi kết hợp với nhau, chúng tạo ra một "chain of trust" từ firmware đến ứng dụng.

**Ứng dụng trong anti-cheat**: Các hệ thống anti-cheat hiện đại như Vanguard (Riot Games) và BattlEye tận dụng những tính năng này để xác minh tính toàn vẹn của hệ thống người chơi. Chúng có thể phát hiện việc sửa đổi kernel, rootkit và các phần mềm gian lận hoạt động ở cấp độ thấp.

**Điểm chính:**
- Secure Boot ngăn chặn việc tải các driver hoặc bootloader bị nhiễm độc
- TPM cung cấp khả năng xác thực phần cứng và lưu trữ an toàn
- Sự kết hợp của cả hai tạo ra hàng rào bảo vệ mạnh mẽ chống lại gian lận
- Công nghệ này đặt ra những thách thức mới cho cả người phát triển cheat và anti-cheat

## [Left to Right Programming](https://graic.net/p/left-to-right-programming)

Bài viết này giới thiệu khái niệm "Left to Right Programming" - một triết lý thiết kế ngôn ngữ lập trình nhấn mạnh việc viết code theo cách tự nhiên từ trái sang phải, giúp code luôn hợp lệ và dễ hiểu trong quá trình phát triển.

**Nguyên tắc cốt lõi**: Tác giả lập luận rằng các ngôn ngữ lập trình và môi trường phát triển nên hỗ trợ việc viết code sao cho chương trình luôn hợp lệ và có thể hiểu được ở mỗi giai đoạn trong quá trình gõ. Điều này trái ngược với những cấu trúc phức tạp như list comprehension trong Python, nơi logic được "nhồi" vào một dòng duy nhất.

**So sánh thực tế**: Bài viết đưa ra ví dụ minh họa sự khác biệt. Trong Python: `words_on_lines = [line.split() for line in text.splitlines()]` so với Rust: `let words_on_lines = text.lines().map(|line| line.split_whitespace());`. Cách tiếp cận của Rust cho phép developer xây dựng logic từng bước một cách tự nhiên.

**Tác động đến developer experience**: Phương pháp này cải thiện khả năng khám phá các method và function thông qua IDE, giảm độ phức tạp nhận thức khi đọc code, và tạo ra workflow phát triển mượt mà hơn.

**Điểm chính:**
- Code nên được viết theo cách tự nhiên từ trái sang phải
- Tránh những cấu trúc phức tạp làm giảm tính khám phá của code
- IDE và editor nên hỗ trợ tốt việc gợi ý method và function
- Ngôn ngữ như Rust và JavaScript thể hiện tốt nguyên tắc này hơn Python

## [Big O Notation](https://samwho.dev/big-o/)

Bài viết từ Sam Who cung cấp một hướng dẫn trực quan và dễ hiểu về Big O notation - một khái niệm cơ bản trong khoa học máy tính để mô tả hiệu suất của thuật toán khi kích thước đầu vào tăng lên.

**Khái niệm cốt lõi**: Big O notation mô tả mối quan hệ giữa đầu vào của hàm và thời gian thực thi, tập trung vào tốc độ tăng trưởng chứ không phải thời gian tuyệt đối. Điều này giúp so sánh hiệu suất thuật toán một cách khách quan, bất kể phần cứng hay ngôn ngữ lập trình.

**Các độ phức tạp chính**: Từ chậm nhất đến nhanh nhất gồm O(n²) - quadratic (như bubble sort), O(n) - linear (hiệu suất tỷ lệ với kích thước đầu vào), O(log n) - logarithmic (tăng rất chậm như binary search), và O(1) - constant (hiệu suất không đổi).

**Ví dụ thực tế**: Tác giả sử dụng các ví dụ sinh động như tính tổng số, thuật toán sắp xếp bubble sort và trò chơi đoán số để minh họa cách Big O hoạt động trong thực tế. Mỗi ví dụ được trình bày với visualization giúp người đọc dễ dàng hình dung.

**Chiến lược cải thiện hiệu suất**: Sử dụng cấu trúc dữ liệu phù hợp (như Set cho tìm kiếm nhanh), tránh vòng lặp lồng nhau tạo ra độ phức tạp quadratic, và cache kết quả trung gian để giảm tính toán dư thừa.

**Điểm chính:**
- Big O mô tả cách hiệu suất thay đổi khi kích thước đầu vào tăng
- Tập trung vào tốc độ tăng trưởng, không phải thời gian tuyệt đối
- O(1) nhanh nhất, O(n²) chậm nhất trong các trường hợp phổ biến
- Lựa chọn thuật toán và cấu trúc dữ liệu ảnh hưởng lớn đến hiệu suất

## [Personal AI Evaluations August 2025](https://darkcoding.net/software/personal-ai-evals-aug-2025/)

Bài viết từ Dark Coding chia sẻ một nghiên cứu cá nhân thú vị về việc đánh giá các mô hình AI lớn (LLM) dựa trên 130 prompt thực tế từ lịch sử bash command của tác giả, mang đến cái nhìn thực tế về hiệu suất AI trong tháng 8/2025.

**Phương pháp đánh giá**: Tác giả thu thập 130 prompt thực tế từ bash history cá nhân, sử dụng Open Router để test nhiều mô hình AI khác nhau, và viết script Rust để chạy đánh giá "mù" nhằm tránh bias. Các lĩnh vực được đánh giá bao gồm lập trình, quản trị hệ thống, giải thích kỹ thuật và kiến thức tổng quát.

**Các mô hình được test**: Anthropic Claude Sonnet, DeepSeek models, Google Gemini 2.5 (Flash và Pro), Qwen3 models, và GLM 4.5. Kết quả cho thấy hầu hết các mô hình đều có hiệu suất tương tự nhau, với sự khác biệt chính nằm ở chi phí và độ trễ.

**Phát hiện đáng chú ý**: Tác giả nhận ra rằng "tất cả các mô hình đều tốt", các mô hình đóng (như Gemini Pro, Claude) không nhất thiết tốt hơn mô hình mở, và reasoning mode hiếm khi cải thiện kết quả (ngoại trừ việc viết thơ).

**Kết quả nổi bật**: Google Gemini 2.5 Flash nhanh nhất, Kimi K2, Qwen3 và DeepSeek rẻ nhất, trong khi DeepSeek và Qwen3 có tính nhất quán cao nhất.

**Điểm chính:**
- Hầu hết các mô hình AI hiện tại đều có hiệu suất tương đối tốt và tương tự nhau
- Chi phí và tốc độ phản hồi quan trọng hơn độ chính xác tuyệt đối
- Sử dụng đồng thời nhiều mô hình cho các loại query khác nhau là chiến lược tối ưu
- Mô hình mở có thể cạnh tranh tốt với mô hình thương mại đắt tiền

## [How to Keep Services Running During Failures](https://newsletter.scalablethread.com/p/how-to-keep-services-running-during)

Bài viết từ Scalable Thread cung cấp hướng dẫn chi tiết về các chiến lược graceful degradation - kỹ thuật giúp duy trì hoạt động của dịch vụ ngay cả khi một phần hệ thống gặp sự cố, đảm bảo trải nghiệm người dùng không bị gián đoạn hoàn toàn.

**Các chiến lược chính**: Rate limiting kiểm soát lưu lượng trong tình huống tải cao, request coalescing gộp nhiều yêu cầu giống nhau thành một truy vấn duy nhất để giảm tải database, load shedding ưu tiên các yêu cầu quan trọng khi hệ thống bị stress, và jitter/retry ngăn chặn "thundering herd problem" khi dịch vụ phục hồi.

**Circuit breakers và timeout**: Circuit breaker tạm thời chặn yêu cầu đến các dịch vụ đang lỗi, cung cấp phản hồi lỗi ngay lập tức thay vì để client chờ đợi. Request timeout ngăn chặn việc cạn kiệt tài nguyên từ các dịch vụ phản hồi chậm, giải phóng tài nguyên hệ thống khi cần thiết.

**Monitoring và cảnh báo**: Theo dõi các metrics quan trọng như error rate và latency giúp phát hiện vấn đề một cách chủ động, kích hoạt thông báo khi vượt ngưỡng nguy hiểm, cho phép can thiệp kịp thời trước khi vấn đề lan rộng.

**Ví dụ thực tế**: Trong e-commerce, khi payment service không phản hồi, order service có thể sử dụng circuit breaker để ngăn chặn yêu cầu thanh toán, đồng thời vẫn cho phép người dùng browse sản phẩm và thêm vào giỏ hàng.

**Điểm chính:**
- Graceful degradation duy trì chức năng cốt lõi khi một phần hệ thống gặp sự cố
- Rate limiting và load shedding giúp ưu tiên traffic quan trọng nhất
- Circuit breaker ngăn chặn cascade failure trong microservices
- Monitoring chủ động giúp phát hiện và xử lý vấn đề sớm

## [Why Was Apache Kafka Created?](https://bigdata.2minutestreaming.com/p/why-was-apache-kafka-created)

Bài viết từ 2 Minute Streaming khám phá bối cảnh lịch sử và những thách thức kỹ thuật cụ thể mà LinkedIn gặp phải vào năm 2012, dẫn đến việc tạo ra Apache Kafka - một trong những hệ thống streaming data phổ biến nhất hiện nay.

**Bối cảnh và vấn đề tại LinkedIn**: Vào năm 2012, LinkedIn đang vật lộn với hai pipeline dữ liệu riêng biệt - batch pipeline xử lý hàng giờ với XML messages qua HTTP server phục vụ cho Oracle và Hadoop, và real-time pipeline xử lý metrics, logs cho hệ thống monitoring Zenoss. Cả hai đều yêu cầu bảo trì thủ công nhiều, tạo ra backlog lớn và không có khả năng tích hợp dữ liệu giữa các hệ thống.

**Các thách thức kỹ thuật cốt lõi**: Hệ thống cũ của LinkedIn gặp vấn đề về schema parsing phức tạp, khó khăn trong việc evolution schema, độ trễ xử lý dữ liệu cao, và infrastructure dễ vỡ. Việc thiếu khả năng cross-system integration khiến dữ liệu bị phân mảnh và khó sử dụng hiệu quả.

**Giải pháp từ Kafka**: LinkedIn phát triển Kafka như một "robust pipeline infrastructure" với kiến trúc phân tán mạnh mẽ, khả năng scale cao, xử lý dữ liệu real-time, tách biệt writer/reader, hỗ trợ Avro schema để đại diện dữ liệu tốt hơn, và khả năng phục vụ nhiều destination khác nhau.

**Tác động lịch sử**: Kafka không chỉ giải quyết vấn đề của LinkedIn mà còn trở thành standard industry cho streaming data, được sử dụng rộng rãi trong microservices architecture và real-time analytics.

**Điểm chính:**
- Kafka sinh ra từ nhu cầu thực tế của LinkedIn về tích hợp dữ liệu phức tạp
- Giải quyết vấn đề schema evolution và cross-system data integration
- Cung cấp kiến trúc phân tán có thể scale cho real-time processing
- Trở thành foundation cho nhiều hệ thống streaming hiện đại

## [How We Vibe Code at a FAANG](https://www.reddit.com/r/vibecoding/comments/1myakhd/how_we_vibe_code_at_a_faang/)

Thảo luận trên Reddit về cách các công ty FAANG áp dụng "vibe coding" - phương pháp phát triển phần mềm tận dụng AI để tăng tốc quá trình coding, được chia sẻ bởi các kỹ sư đang làm việc tại các công ty công nghệ hàng đầu.

**Bối cảnh vibe coding tại FAANG**: Khái niệm này đang được thử nghiệm và áp dụng rộng rãi tại các công ty lớn như Google, Meta, Amazon, với focus vào việc sử dụng AI coding assistants để accelerate development workflow mà vẫn đảm bảo chất lượng code và architectural consistency.

**Workflow và tools**: Các kỹ sư FAANG thường kết hợp các AI coding tools như GitHub Copilot, internal AI assistants, và specialized prompting techniques. Điều quan trọng là họ vẫn duy trì code review process nghiêm ngặt và testing standards cao, sử dụng AI như một productivity multiplier chứ không phải replacement cho expertise.

**Challenges và best practices**: Một số thách thức được đề cập bao gồm context management trong large codebases, maintaining coding standards consistency, và ensuring security compliance khi sử dụng AI-generated code. Best practices thường xoay quanh việc training AI models trên internal codebases và establishing clear guidelines cho AI usage.

**Điểm chính:**
- FAANG companies đang tích cực thử nghiệm vibe coding workflows
- AI được sử dụng để tăng productivity chứ không thay thế human judgment
- Code quality và security vẫn được duy trì thông qua rigorous review processes
- Context management và prompt engineering là kỹ năng quan trọng mới

*Đánh giá hiệu quả của AGENTS.md: Chưa được tốt lắm, còn chứa tiếng Anh nhiều. Mình sẽ cố gắng cải thiện thêm trong các bài viết tới. Hẹn gặp lại*
