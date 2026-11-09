---
title: "Newsletter #12"
date: 2025-04-20
tags: ["AI-Assisted", "Newsletter", "Software Architecture", "Distributed Systems", "Java", "Networking", "System Design"]
categories: [ "Newsletter" ]
---

*Mời bạn thưởng thức Newsletter \#12.*

## [Fundamental Techniques for Software Architects](https://www.workingsoftware.dev/fundamental-techniques-for-software-architects/)

Patrick Roos tổng hợp khoảng 30 kỹ thuật nền tảng mà một kiến trúc sư phần mềm nên nắm, sắp xếp theo từng giai đoạn của một dự án. Ở khâu chiến lược có Impact Mapping và Wardley Mapping để gắn công việc với mục tiêu kinh doanh. Ở khâu hình thành ý tưởng và thống nhất đội ngũ có Domain Storytelling, Event Storming, Ubiquitous Language, Context Mapping, Bounded Context Canvas cùng các mô hình chất lượng như arc42 Q42 và Quality Storming. Phần ra quyết định giới thiệu nguyên tắc kiến trúc và Architecture Decision Records (ADR), phần quản lý công nghệ có Tech Stack Canvas và Technology Radar, còn phần quản lý rủi ro gồm Risk Storming, Technical Debt Records và Threat Modeling.

Nhóm kỹ thuật cuối cùng tập trung vào trực quan hóa, tài liệu hóa (C4 Model, arc42, Documentation as Code) và đo lường, cải tiến (DORA Metrics, aim42, Residuality Theory). Mỗi mục đều có mô tả ngắn kèm ví dụ hoặc bài nói tham khảo, nên bài viết phù hợp để dùng như một bản đồ tra cứu: bạn không cần áp dụng tất cả, mà chọn đúng công cụ cho vấn đề đang gặp, từ việc hiểu nghiệp vụ đến giao tiếp với các bên liên quan.

## [The End of Programming as We Know It](https://www.oreilly.com/radar/the-end-of-programming-as-we-know-it/)

Tim O'Reilly phản bác nhận định rằng AI sẽ khiến lập trình viên mất việc. Ông nhìn lại lịch sử: từ nối mạch vật lý, hợp ngữ, ngôn ngữ biên dịch đến hệ điều hành, web và điện toán đám mây, mỗi lần công cụ mới "kết thúc" một kiểu lập trình thì số lượng lập trình viên lại tăng lên, vì phần mềm rẻ hơn kéo theo nhu cầu lớn hơn. Dựa trên nghiên cứu của James Bessen về Cách mạng Công nghiệp, ông cho rằng lợi ích lớn nhất chỉ đến khi người lao động "học qua thực hành" để có kỹ năng mới, và lập trình viên trẻ biết làm chủ công cụ AI hoàn toàn có thể vượt qua người nhiều kinh nghiệm nhưng không chịu thay đổi.

Bài viết dẫn ý kiến của Sam Schillace, Bret Taylor, Addy Osmani và nhiều chuyên gia khác để chỉ ra rằng chúng ta đang phát minh một mô hình lập trình mới quanh AI: con người vẫn phải cung cấp ngữ cảnh, hiểu sâu quy trình nghiệp vụ và đưa nguyên mẫu lên môi trường thực tế, trong khi bài toán phối hợp giữa các tác tử AI còn rất sơ khai. Kết luận của tác giả: khi AI giúp năng suất tăng gấp nhiều lần, phạm vi những gì có thể lập trình và kỳ vọng của người dùng cũng tăng theo, nên đây không phải dấu chấm hết mà là lần tái sinh mới của nghề lập trình.

## [In defense of simple architectures](https://danluu.com/simple-architectures/)

Dan Luu chia sẻ kinh nghiệm tại Wave, công ty được định giá 1,7 tỷ USD với khoảng 70 kỹ sư, vận hành trên một kiến trúc rất đơn giản: một ứng dụng Python nguyên khối (monolith) chạy trên PostgreSQL. Tác giả cũng lấy Stack Overflow làm ví dụ về việc mở rộng một hệ thống nguyên khối lên quy mô thuộc nhóm 100 trang web có lưu lượng lớn nhất. Wave chọn Python đồng bộ thay vì các framework bất đồng bộ nhiều lỗi, đẩy tác vụ chạy lâu vào hàng đợi, và thẳng thắn thừa nhận vài quyết định chưa tối ưu như ranh giới giao dịch cơ sở dữ liệu lỏng lẻo hay việc dùng RabbitMQ, Celery, SQLAlchemy. Ngược lại, họ hài lòng với GraphQL và Kubernetes vì những lý do cụ thể, chẳng hạn yêu cầu đặt trung tâm dữ liệu ngay tại từng quốc gia.

Thông điệp chính: máy tính ngày nay đủ nhanh để phần lớn ứng dụng, kể cả khi lưu lượng rất lớn, chạy tốt trên kiến trúc đơn giản, vốn rẻ hơn và dễ bảo trì hơn. Giữ kiến trúc ứng dụng đơn giản nhất có thể giúp đội ngũ dành "ngân sách độ phức tạp" cho những chỗ thực sự mang lại giá trị kinh doanh, như tích hợp với nhà mạng viễn thông. Tác giả cũng phê phán việc các hội nghị gần như chỉ nói về kiến trúc microservices phức tạp, khiến nhiều doanh nghiệp quy mô nhỏ sao chép những kỹ thuật họ không hề cần.

## [The trouble with "good enough"](https://newsletter.weskao.com/p/the-trouble-with-good-enough)

Wes Kao mở đầu bằng câu nói của họa sĩ Josef Albers: khi 50 người cùng nghe chữ "đỏ", sẽ có 50 sắc đỏ khác nhau trong đầu họ. Tương tự, mỗi người hiểu "đủ tốt" (good enough) theo một cách riêng. Ai cũng biết nên dừng lại khi công sức bỏ thêm chỉ mang lại lợi ích giảm dần, nhưng vấn đề là rất nhiều người tưởng đã chạm đến điểm đó trong khi thực tế còn cách khá xa, thậm chí không nhận ra tiêu chuẩn của bản thân đang thấp.

Tác giả đưa ra ví dụ: một tính năng chỉ "đủ tốt" khi thực sự mang lại giá trị cho khách hàng, chứ không phải khi quản lý gật đầu cho phát hành; một email chỉ đạt khi nội dung đủ thuyết phục, chứ không phải khi đã bấm gửi. Nâng chất lượng không có nghĩa là bỏ ra 30 giờ cho mọi việc, mà là dịch chuyển thêm một chút trên thang chất lượng ở những việc có đòn bẩy cao nhất. Bài viết kết thúc bằng vài câu hỏi tự vấn giúp bạn nhận ra mình đang tuyên bố "đủ tốt" quá sớm ở đâu và nên nâng chuẩn ở chỗ nào.

## [Should managers still code?](https://theengineeringmanager.substack.com/p/should-managers-still-code)

James Stanier trả lời câu hỏi của một độc giả: quản lý kỹ thuật (engineering manager) có nên viết mã nguồn trong công việc hằng ngày không? Theo ông, cần phân biệt giữa "ở trong mã nguồn" và "viết mã nguồn". Mọi quản lý đều nên hiểu cách hệ thống được xây dựng, rà soát mã nguồn và tài liệu thiết kế, gỡ lỗi sự cố trên môi trường thực tế, lập trình cặp với thành viên trong đội và chịu trách nhiệm về chất lượng mã nguồn của cả đội. Còn việc trực tiếp đảm nhận phần triển khai chính thì tùy trường hợp, vì quản lý thường bị gián đoạn bởi họp hành và dễ trở thành điểm nghẽn. Bài viết cũng đặt câu hỏi này vào bối cảnh "làm phẳng tổ chức" sau thời kỳ lãi suất thấp, khi nhiều quản lý chịu áp lực phải chứng minh năng lực kỹ thuật.

Với những quản lý vẫn muốn viết mã, tác giả gợi ý vài cách: dành riêng khung giờ không bị làm phiền, lập trình cặp, rà soát mã nguồn thật kỹ bằng cách chạy thử nhánh trên máy, tham gia nhiều hơn ở giai đoạn làm nguyên mẫu hoặc khi xử lý sự cố, và dành thời gian thử nghiệm công nghệ mới để chia sẻ lại kiến thức với đội.

## [What is Saga Pattern in Distributed Systems?](https://newsletter.scalablethread.com/p/what-is-saga-pattern-in-distributed)

Trong hệ thống microservices, quy trình đặt hàng có thể đi qua kho hàng, thanh toán và vận chuyển, mỗi dịch vụ có dữ liệu riêng. Một giao dịch cục bộ không tự bảo đảm tính nguyên tử cho cả quy trình. Saga phối hợp một chuỗi giao dịch cục bộ; khi có lỗi, hệ thống thực hiện hành động bù trừ cho những bước phù hợp. Bù trừ là xử lý nghiệp vụ sau khi thay đổi đã được ghi nhận, không phải hoàn tác tự động như một giao dịch cơ sở dữ liệu duy nhất.

Bài so sánh điều phối tập trung (orchestration) với phối hợp qua sự kiện (choreography). Cách đầu dễ theo dõi luồng hơn; cách sau không cần một bộ điều phối trung tâm nhưng làm logic phân tán hơn. Không có bộ điều phối riêng không đồng nghĩa toàn hệ thống hết điểm lỗi đơn lẻ. Khi triển khai, cần xử lý việc thử lại, tính lặp an toàn và khả năng bù trừ thất bại; các bước trung gian có thể tạm thời chưa nhất quán. Đây là những đánh đổi quan trọng khi chọn Saga thay cho giao dịch phân tán.

## [What would happen if we didn't use TCP or UDP?](https://github.com/Hawzen/hdp)

Tác giả tự hỏi: điều gì xảy ra nếu gửi gói tin bằng một giao thức tầng vận chuyển tự chế, không phải TCP, UDP hay ICMP? Anh thiết kế giao thức HDP, viết máy khách và máy chủ bằng Rust sử dụng raw socket, rồi thử gửi qua giao diện loopback trên macOS với lần lượt các giá trị của trường Protocol trong gói IP. Phần lớn đều thành công, nhưng các số 1, 2, 6 bị hệ điều hành chặn trước khi tới máy chủ, 50 và 51 (thuộc IPSec) bị từ chối gửi đi, còn 256 vượt quá giới hạn 8 bit. Khi chạy lại trên Linux, kết quả khác hẳn, cho thấy mỗi hệ điều hành xử lý raw socket theo một kiểu riêng.

Thử nghiệm qua Internet cho kết quả khác nhau: đường truyền từ máy của tác giả tới DigitalOcean chỉ chuyển được gói đầu tiên; gửi tới AWS cũng gặp hiện tượng tương tự, còn giữa hai máy AWS gần nhau thì HDP hoạt động. Các quan sát cho thấy ảnh hưởng của đường truyền, NAT và thiết bị trung gian, nhưng chưa chứng minh một nguyên nhân duy nhất hay chính sách chung của nhà cung cấp. Trong bản cập nhật ngày 01/03/2025, thử nghiệm qua IPv6 thành công. Tác giả kết luận rằng giao thức IP tự chế có thể chạy trong một số môi trường, nhưng TCP hoặc UDP thực dụng hơn về khả năng tương thích.

## [Scoped Values in Java 24 - Inside Java Newscast #86](https://www.youtube.com/watch?v=7tfUJLUbZiM)

Video Inside Java Newscast #86 giới thiệu Scoped Values, API ở lần xem trước thứ tư trong Java 24, cho phép gắn một giá trị với phạm vi thực thi xác định để các phương thức bên trong sử dụng. Video so sánh cách này với ThreadLocal và giải thích việc kế thừa ràng buộc ở các luồng con được tạo qua StructuredTaskScope; cần phân biệt cơ chế đó với chia sẻ tự động cho mọi luồng con.

## [Java 24 - Better Language, Better APIs, Better Runtime](https://www.youtube.com/watch?v=2NTyzL-9Bfo)

Video tổng hợp các cải tiến nổi bật của Java từ phiên bản 22 đến 24 trên ba mặt: ngôn ngữ, API và môi trường thực thi (runtime). Một số điểm đáng chú ý gồm unnamed patterns, module imports và Foreign Function & Memory API, cùng nhiều tối ưu khác giúp Java ngày càng mạnh mẽ, dễ dùng và hiệu quả hơn với lập trình viên hiện nay.

## Bonus: Vài ảnh hay ho đến từ [ByteByteGo](https://bytebytego.com/)

![30 Free APIs for Developers](https://substack-post-media.s3.amazonaws.com/public/images/f112df94-df52-4140-98ec-873e5b74d988_1280x1601.gif)
![The Generative AI Learning Roadmap](https://substack-post-media.s3.amazonaws.com/public/images/c3bf4776-744b-4e87-85f8-6dddd6d85597_1280x1566.gif)
![HTTP/1 -> HTTP/2 -> HTTP/3](https://substack-post-media.s3.amazonaws.com/public/images/c1dbb32e-8d1b-4c13-ae48-fe485ad92191_1280x1601.gif)
![Structure of URL](https://substack-post-media.s3.amazonaws.com/public/images/d864f35c-537c-4571-8644-ce20d1a0caa5_1280x1427.gif)

## Bonus 2: Vài video hay ho đến từ [ByteByteGo](https://bytebytego.com/)

[8 Most Important Tips for Designing Fault-Tolerant System](https://www.youtube.com/watch?v=3Lis4w4_bBc)

## Bonus 3: Vài tài liệu hay ho đến từ [Redis.io](https://redis.io/)

[Cache and Message Broker for Microservices](https://redis.io/resources/cache-and-message-broker-for-microservices-solution-brief.pdf)

[Caching at Scale With Redis](https://redis.io/wp-content/uploads/2021/12/caching-at-scale-with-redis-updated-2021-12-04.pdf)

---

*Bài viết đã được viết lại bởi Claude Code với Opus 5.5 vào ngày 27/09/2026; được review và chỉnh sửa bởi Codex với GPT 6.1 Sol vào ngày 09/11/2026.*
