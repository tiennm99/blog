---
title: "Newsletter #15"
date: 2025-05-02
tags: [ "AI-Assisted", "Development", "Java", "Performance", "LLM" ]
categories: [ "Newsletter" ]
---

*Mặc định thì mình follow theo format mỗi ngày chỉ viết 1 post, nhưng mà dạo gần đây lười viết bài nên tích được nhiều bài hay ho quá, nên tạm thời trong thời gian tới sẽ trick lỏ viết lùi thời gian và cố gắng viết nhiều hơn để "kịp hết bài". VD như nay là 10/5 nhưng mình viết cho 2/5 vậy, check git history là ra à, hehe. Mời bạn thưởng thức Newsletter \#15.*

## [Here’s how I use LLMs to help me write code](https://simonwillison.net/2025/Mar/11/using-llms-for-code/)

Simon Willison tổng kết hơn hai năm sử dụng mô hình ngôn ngữ lớn (LLM) để hỗ trợ viết mã nguồn và khẳng định rằng dùng LLM hiệu quả là một kỹ năng cần rèn luyện, không phải thứ tự nhiên mà có. Theo tác giả, nên xem LLM như một công cụ tự động hoàn thành nâng cao: nó giúp lấp khoảng trống kiến thức nhưng vẫn có thể mắc những lỗi khó lường, nên con người luôn phải là người kiểm soát. Tác giả cũng lưu ý giới hạn thời điểm của dữ liệu huấn luyện: với thư viện có thay đổi lớn sau thời điểm đó, cần đưa ví dụ mới vào câu lệnh (prompt). Ngữ cảnh của cuộc hội thoại là yếu tố quyết định, vì vậy hãy chủ động cung cấp mã nguồn hiện có, ví dụ mẫu, hoặc dùng các công cụ cho phép nạp cả dự án.

Về cách làm cụ thể, tác giả dùng LLM để khảo sát các lựa chọn thư viện và cách triển khai ở giai đoạn đầu; khi viết mã nguồn thật thì đưa chỉ dẫn chi tiết như chữ ký hàm và yêu cầu rõ ràng, sau đó tiếp tục yêu cầu chỉnh sửa, tái cấu trúc qua nhiều lượt thay vì bỏ đi kết quả đầu tiên. Điều không thể thiếu là tự chạy và kiểm thử mã nguồn. Bài viết có ví dụ xây dựng một trang tổng hợp lịch sử commit bằng Claude Code chỉ trong khoảng 17 phút với chi phí 0,61 đô la, dù tác giả vẫn phải tự tay cấu hình GitHub Actions. Lợi ích lớn nhất là tốc độ: LLM giúp thực hiện những dự án trước đây không đáng bỏ công, đồng thời khuếch đại chuyên môn sẵn có của lập trình viên.

## [I use Cursor daily - here's how I avoid the garbage parts](https://www.nickcraux.com/blog/cursor-tips)

Bài viết chia sẻ kinh nghiệm dùng Cursor hằng ngày, một trình soạn thảo mã nguồn xây dựng trên nền VS Code và tích hợp sâu các mô hình ngôn ngữ lớn như GPT-4. Tác giả đưa ra nhiều mẹo thực tế: các phím tắt quan trọng, cách viết câu lệnh để AI trả lời chính xác hơn, cách tận dụng tính năng trò chuyện với toàn bộ mã nguồn dự án, cùng các chiến lược tối ưu quy trình làm việc và cấu hình Cursor cho phù hợp với từng người và từng dự án.

Điểm đáng chú ý là tác giả nhấn mạnh việc phối hợp hài hòa giữa con người và AI thay vì phó mặc cho công cụ, để tạo ra mã nguồn chất lượng hơn trong thời gian ngắn hơn. Đây là tài liệu tham khảo hữu ích cho cả người mới làm quen lẫn những ai đã dùng Cursor và muốn khai thác công cụ này hiệu quả hơn.

## [Why Java endures: The foundation of modern enterprise development](https://github.blog/developer-skills/why-java-endures-the-foundation-of-modern-enterprise-development/)

Bài viết trên GitHub Blog giải thích vì sao Java, ra đời năm 1995 tại Sun Microsystems, vẫn là nền tảng của phát triển phần mềm doanh nghiệp sau gần 30 năm. Gốc rễ sức mạnh của Java là nguyên tắc "viết một lần, chạy mọi nơi": mã nguồn chỉ cần viết một lần là chạy được trên nhiều hệ điều hành mà không phải biên dịch lại. Ngôn ngữ này vẫn liên tục hiện đại hóa, chẳng hạn Java 23 (tháng 9/2024) đơn giản hóa cú pháp cho người mới, còn pattern matching và record class giúp viết mã nguồn gọn gàng, dễ bảo trì hơn.

Bên cạnh đó, hệ sinh thái Java rất đồ sộ, từ thư viện chuẩn đến các framework như Spring Boot và Hibernate, giúp lập trình viên không phải tự xây dựng lại những giải pháp phổ biến; Minecraft, Netflix hay LinkedIn đều là những ví dụ tiêu biểu. Trong lĩnh vực AI, dù Python chiếm ưu thế ở khâu nghiên cứu, Java lại mạnh ở khâu triển khai quy mô lớn, như nền tảng Michelangelo của Uber, và các thư viện Deeplearning4j, LangChain4j cho phép bổ sung khả năng AI vào hệ thống Java sẵn có. Bài viết kết luận Java vẫn là kỹ năng được thị trường săn đón và sẽ còn giữ vị thế nhờ cam kết với mã nguồn bền vững, dễ mở rộng và dễ bảo trì.

## [Part 5: Implementing a Web UI using Vaadin and GitHub Copilot Agent Mode](https://itnext.io/part-5-implementing-a-web-ui-using-vaadin-and-github-copilot-agent-mode-563e74f131aa)

Đây là phần thứ 5 trong loạt bài của Saeed Zarinfam về việc dùng các IDE tích hợp AI để phát triển ứng dụng Java. Lần này, tác giả dùng VS Code với chế độ Agent Mode của GitHub Copilot và mô hình Claude 3.5 Sonnet để xây dựng giao diện web bằng Vaadin Flow, một framework ít phổ biến cho phép viết giao diện web hoàn toàn bằng Java, cho dự án mẫu Employee Assistance Chatbot dùng Spring AI. Tác giả ghi lại đầy đủ các bước và câu lệnh đã sử dụng để quan sát Copilot Agent Mode hoạt động thực tế, đồng thời so sánh với agent Cascade của Windsurf, công cụ mà trước đó tác giả đã dùng khá suôn sẻ để xây dựng một dịch vụ REST có lớp bộ nhớ đệm bằng Spring Boot.

Điểm khác biệt là lần này tác giả không am hiểu nhiều về Vaadin Flow, nên bài viết cũng là phép thử xem LLM có thực sự giúp được khi làm việc với một framework ít người dùng hay không. Như tiêu đề phụ của bài đã gợi ý, câu trả lời khá dè dặt: LLM chưa thực sự phù hợp với những ngôn ngữ lập trình và framework ít phổ biến, nên lập trình viên không thể trông chờ hoàn toàn vào AI khi bước vào một công nghệ mới lạ.

## [Microservices vs. Monoliths: How to Choose the Right Architecture for Your Project](https://dev.to/jhonifaber/microservices-vs-monoliths-how-to-choose-the-right-architecture-for-your-project-2bep)

Bài viết so sánh hai kiến trúc phổ biến là monolith và microservices để giúp đội ngũ phát triển chọn hướng phù hợp. Với monolith, toàn bộ giao diện, logic nghiệp vụ và thao tác cơ sở dữ liệu nằm chung trong một khối triển khai duy nhất, nên dễ xây dựng, kiểm thử, gỡ lỗi và vận hành. Đổi lại, muốn mở rộng thì phải nhân bản cả hệ thống thay vì chỉ phần cần thiết, đội ngũ lớn dễ vướng xung đột khi gộp mã nguồn, công nghệ bị khóa cứng cho toàn bộ ứng dụng, và mỗi thay đổi nhỏ đều buộc phải triển khai lại mọi thứ, làm tăng rủi ro.

Microservices chia ứng dụng thành các dịch vụ độc lập, mỗi dịch vụ đảm nhận một chức năng nghiệp vụ và giao tiếp qua API. Cách này cho phép mở rộng có chọn lọc, các nhóm làm việc tự chủ, mỗi dịch vụ tự chọn công nghệ phù hợp và lỗi ở một dịch vụ không kéo sập cả hệ thống. Tuy vậy, cái giá phải trả là độ phức tạp cao: cần công cụ điều phối, giám sát, cơ chế khám phá dịch vụ, đồng thời phải xử lý độ trễ mạng và bài toán nhất quán dữ liệu. Bài viết giới thiệu mẫu SAGA để quản lý giao dịch phân tán bằng chuỗi giao dịch cục bộ kèm hành động bù trừ, với hai cách triển khai là choreography (dựa trên sự kiện, phi tập trung) và orchestration (dựa trên lệnh, tập trung). Kết luận của tác giả: lựa chọn phụ thuộc vào nhu cầu ứng dụng, quy mô đội ngũ và mục tiêu dài hạn.

## [Designing a Scalable Architecture - with Some Spring Boot Examples](https://dev.to/jhonifaber/designing-a-scalable-architecture-with-some-spring-boot-examples-340o)

Bài viết trình bày các nguyên tắc cốt lõi để thiết kế một hệ thống có khả năng mở rộng, kèm ví dụ minh họa bằng Spring Boot. Tác giả phân biệt mở rộng theo chiều dọc (tăng sức mạnh cho một máy) và theo chiều ngang (thêm nhiều thực thể), rồi đi qua từng thành phần quan trọng: tách ứng dụng thành microservices để mở rộng độc lập, quản lý cấu hình bằng Spring Cloud Config và đóng gói bằng Docker; thiết kế dịch vụ phi trạng thái, chẳng hạn xác thực bằng JWT để máy chủ không cần lưu và tra cứu phiên đăng nhập.

Ở tầng dữ liệu, bài viết đề cập sharding, bản sao chỉ đọc (read replica) để giảm tải cho cơ sở dữ liệu chính, và các lựa chọn NoSQL như MongoDB với đánh đổi giữa tính nhất quán và tính sẵn sàng. Với xử lý bất đồng bộ, tác giả giới thiệu các message broker như Kafka, RabbitMQ và annotation `@Async` của Spring Boot để chạy phương thức trên luồng riêng. Ngoài ra còn có bộ nhớ đệm với `@Cacheable`, `@CacheEvict`, cùng API Gateway đảm nhận định tuyến, xác thực, giới hạn tần suất truy cập và circuit breaker. Tác giả nhắc rằng ghi log, bảo mật, giám sát và xử lý lỗi cũng là những yếu tố không thể thiếu để hệ thống bền vững khi phát triển.

## [Java is Very Fast, If You Don’t Create Many Objects](https://blog.vanillajava.blog/2022/09/java-is-very-fast-if-you-dont-create.html)

Peter Lawrey, chuyên gia về Java hiệu năng cao, cho thấy việc cấp phát đối tượng ảnh hưởng lớn đến hiệu năng Java trong các hệ thống thông lượng cao, dù bản thân việc thu gom rác (GC) khá rẻ. Trong benchmark với Chronicle Wire trên CPU Ryzen 5950X, khi không cấp phát đối tượng nào, hệ thống xử lý khoảng 60–68 triệu sự kiện mỗi giây với độ trễ 467–528 nano giây; chỉ cần tạo thêm một đối tượng 44 byte cho mỗi sự kiện, thông lượng giảm còn khoảng 37–50 triệu sự kiện mỗi giây, tức giảm chừng 25%, và độ trễ tăng thêm khoảng 166 nano giây.

Điều thú vị là GC chỉ chiếm khoảng 170 mili giây mỗi phút (0,3% thời gian chạy), nên nguyên nhân chính không nằm ở việc dọn dẹp mà ở áp lực lên bộ nhớ đệm L1/L2/L3 của CPU khi nhiều nhân cùng cấp phát. Khi thử với nhiều luồng, tốc độ cấp phát chững lại quanh 220 triệu đối tượng mỗi giây và độ trễ tăng vọt khi vượt quá tám luồng. Giải pháp của Chronicle Wire là mặc định tái sử dụng cùng một đối tượng cho mỗi loại sự kiện khi giải tuần tự hóa, loại bỏ việc cấp phát mà vẫn giữ mã nguồn đơn giản. Bài học rút ra: với các hệ thống nhạy cảm về độ trễ như tài chính, giảm cấp phát đối tượng mang lại hiệu quả rõ rệt hơn là tinh chỉnh GC.

## ~~[Microbenchmarks: Java Locks vs Atomic](https://blog.tombert.com/posts/2025-03-04-lock-benchmark/)~~

~~Bài viết này trình bày một phân tích chi tiết về hiệu suất của các cơ chế đồng bộ hóa (synchronization) khác nhau trong lập trình đa luồng. Tác giả đã thực hiện benchmark so sánh hiệu năng của nhiều loại lock khác nhau như mutex, spin lock, read-write lock và các giải pháp lock-free, đánh giá chúng trong các tình huống tải khác nhau.~~

~~Kết quả benchmark cho thấy sự khác biệt đáng kể giữa các loại lock, với những phát hiện thú vị như:~~
~~1. Spin lock thường hiệu quả hơn mutex trong các tác vụ ngắn với mức độ cạnh tranh thấp~~
~~2. Read-write lock mang lại lợi ích lớn trong các trường hợp đọc nhiều, ghi ít~~
~~3. Các giải pháp lock-free có thể mang lại hiệu suất vượt trội trong một số trường hợp, nhưng lại phức tạp hơn đáng kể trong việc triển khai và bảo trì~~

~~Bài viết cũng thảo luận về các yếu tố ảnh hưởng đến hiệu suất của lock như độ trễ, throughput, khả năng mở rộng theo số lượng luồng, và tác động của cache coherence. Tác giả cung cấp các hướng dẫn thực tế về việc lựa chọn cơ chế đồng bộ hóa phù hợp dựa trên đặc điểm của ứng dụng và mô hình truy cập dữ liệu.~~

~~Đây là một tài liệu tham khảo giá trị cho các lập trình viên làm việc với hệ thống đa luồng hiệu năng cao, giúp họ đưa ra quyết định sáng suốt khi lựa chọn cơ chế đồng bộ hóa phù hợp với yêu cầu cụ thể của dự án.~~

## Bonus: Vài ảnh hay ho đến từ [ByteByteGo](https://bytebytego.com/)

![API Protocols 101](https://substack-post-media.s3.amazonaws.com/public/images/ad16adef-3082-42bd-ac99-9a569ad2e33b_2250x2624.png)

---

*Bài viết đã được viết lại bởi Claude Code với Opus 5.5 vào ngày 27/09/2026.*
