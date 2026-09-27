---
title: "Newsletter #71"
date: 2025-12-14
tags: ["AI-Assisted", "Newsletter", "SQL", "Algorithms", "Go", "API Design", "Code Review"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #71.*

## [A modern guide to SQL JOINs](https://kb.databasedesignbook.com/posts/sql-joins/)

Alexey Makhotkin viết một hướng dẫn dài về SQL JOIN theo cách tiếp cận khác hẳn các bài hướng dẫn thông thường: dạy LEFT JOIN trước rồi mới đến INNER JOIN, và chỉ dùng phép so sánh bằng giữa hai ID trong điều kiện ON, mọi điều kiện lọc khác đều đưa xuống WHERE. Tác giả chia phép nối thành ba trường hợp. Trường hợp N:1, khi khóa chính nằm ở vế phải của điều kiện ON, là hữu ích và nhanh nhất vì số dòng kết quả không bao giờ vượt quá số dòng của bảng bên trái. Trường hợp 1:N khá kỳ quặc và nên tránh, còn M:N là nguồn gốc của nhiều lỗi khó thấy. Toàn bộ ví dụ dùng một cơ sở dữ liệu nhỏ gồm bảng nhân viên và bảng thanh toán, kèm các câu truy vấn chạy sẵn trên dbfiddle.uk.

Phần sau giải thích INNER JOIN như một tích Descartes đã được lọc, cách tự nối bảng để xử lý dữ liệu phân cấp như quan hệ quản lý, và lý do sơ đồ Venn là cách minh họa gây hiểu lầm: nó không thể hiện được việc số dòng bị nhân lên. Tác giả cũng cho rằng RIGHT JOIN là thừa, và phân tích kỹ lỗi đếm trùng khi xâu chuỗi nhiều LEFT JOIN rồi GROUP BY, cùng cách thiết kế lại truy vấn để vừa đúng vừa nhanh. Thông điệp xuyên suốt: SQL quá dễ dãi, không bảo vệ bạn khỏi những sai lầm đơn giản, nên hãy tự đặt kỷ luật khi viết truy vấn.

## [Punycode: My New Favorite Algorithm](https://www.iankduncan.com/engineering/2025-12-01-punycode)

Ian Duncan kể lại trải nghiệm tự cài đặt Punycode bằng Haskell, thuật toán giúp tên miền quốc tế hóa như `bücher-café.de` hay `北京-旅游.cn` hoạt động được trên DNS vốn chỉ chấp nhận chữ cái ASCII, chữ số và dấu gạch ngang. Ý tưởng cơ bản khá gọn: giữ nguyên các ký tự ASCII, thêm dấu gạch ngang làm phân cách, rồi mã hóa các ký tự còn lại theo thứ tự mã Unicode tăng dần. Mỗi ký tự được biểu diễn bằng khoảng cách (delta) so với ký tự trước đó và vị trí chèn, viết dưới dạng số cơ số 36 có độ dài thay đổi. Vì các chữ cùng một hệ chữ viết nằm gần nhau trong bảng Unicode nên delta thường nhỏ, còn việc sắp xếp theo mã khiến các ký tự trùng lặp có delta bằng 0 và chỉ tốn một chữ số.

Tác giả dành phần lớn bài để giải thích lý do đằng sau từng lựa chọn thiết kế mà RFC 3492 chỉ quy định mà không lý giải: cơ số 36 là cơ số lớn nhất không phân biệt hoa thường mà DNS cho phép; tham số bias tự điều chỉnh sau mỗi ký tự để ngưỡng mã hóa phù hợp với cả tiếng Đức lẫn tiếng Trung; cơ chế damping và hằng số skew giúp bias không dao động quá mạnh. Bài viết còn so sánh với các cách mã hóa cố định để thấy chúng kém hiệu quả ra sao, và kết thúc bằng một công cụ trực quan cho phép xem từng bước mã hóa với nhiều hệ chữ viết khác nhau.

## [Evolution and Scale of Uber's Delivery Search Platform](https://www.uber.com/in/en/blog/evolution-and-scale-of-ubers-delivery-search-platform/)

Đội ngũ Uber Eats chia sẻ cách xây dựng hệ thống tìm kiếm ngữ nghĩa để người dùng tìm được cửa hàng, món ăn và mặt hàng tạp hóa ngay cả khi truy vấn có từ đồng nghĩa, lỗi chính tả hay trộn nhiều ngôn ngữ. Mô hình dùng kiến trúc hai tháp với nền tảng là LLM Qwen: vector truy vấn được tính theo thời gian thực, còn vector tài liệu được tính theo lô cho hàng tỷ ứng viên rồi lập chỉ mục trên Apache Lucene Plus. Để cân bằng chất lượng và chi phí, nhóm thử nghiệm ba yếu tố: số láng giềng k lấy trên mỗi shard, lượng tử hóa int7 so với float32, và độ dài vector nhờ kỹ thuật MRL (Matryoshka Representation Learning). Giảm k từ 1.200 xuống khoảng 200 giúp giảm 34% độ trễ và 17% CPU, còn lượng tử hóa int7 giảm độ trễ hơn một nửa mà vẫn giữ recall trên 0,95. Các bộ lọc theo khu vực và loại tài liệu chạy trước để thu hẹp tập ứng viên.

Về độ tin cậy, hệ thống tự động huấn luyện lại mô hình và dựng lại chỉ mục hai tuần một lần. Mỗi chỉ mục có hai cột vector blue và green, cấu hình chỉ định cột nào đang phục vụ, nhờ đó có thể cập nhật và quay lui an toàn. Mỗi lần làm mới phải qua ba bước kiểm tra: đủ số lượng tài liệu, cột đang phục vụ không bị thay đổi dù chỉ một byte, và recall trên môi trường thử nghiệm không kém bản đang chạy. Khi phục vụ, dịch vụ còn đối chiếu mã mô hình sinh vector truy vấn với mã mô hình ghi trong chỉ mục để phát hiện cấu hình sai.

## [16 API Gateway Concepts Every Software Engineer Should Know](https://designgurus.substack.com/p/16-api-gateway-concepts-every-software)

Arslan Ahmad giải thích 16 khái niệm quan trọng về API Gateway, thành phần đóng vai trò cửa ngõ duy nhất dẫn vào hệ thống microservices. Thay vì phải biết địa chỉ của từng dịch vụ, ứng dụng khách chỉ gọi tới gateway, nơi định tuyến yêu cầu theo đường dẫn, phương thức hay header. Gateway cũng là chỗ phù hợp để xử lý các mối quan tâm chung: xác thực (kiểm tra JWT, trả lỗi 401 nếu không hợp lệ), phân quyền (trả lỗi 403 khi thiếu vai trò), giới hạn tốc độ (trả lỗi 429 khi vượt ngưỡng) và điều tiết lưu lượng linh hoạt theo gói dịch vụ hoặc tải hệ thống. Mỗi khái niệm đều đi kèm một ví dụ cụ thể, rất tiện cho người mới học hoặc đang chuẩn bị phỏng vấn thiết kế hệ thống.

Các khái niệm còn lại gồm chia lưu lượng để phát hành dần phiên bản mới (canary), biến đổi yêu cầu và phản hồi để giữ tương thích với ứng dụng cũ, bộ nhớ đệm, cân bằng tải, circuit breaker ngăn lỗi lan rộng, thời gian chờ, thử lại, ghi log và giám sát. Tác giả kết luận rằng API Gateway có lẽ là thành phần mang tính chiến lược nhất trong một hệ thống phân tán, nơi bảo mật, khả năng phục hồi, hiệu năng và khả năng quan sát vận hành hội tụ.

## [How Reddit Migrated Comments Functionality from Python to Go](https://blog.bytebytego.com/p/how-reddit-migrated-comments-functionality)

Bài viết của ByteByteGo tổng hợp lại cách Reddit chuyển chức năng bình luận từ một dịch vụ Python nguyên khối sang microservices viết bằng Go vào năm 2024. Bình luận được chọn đầu tiên vì đây là tập dữ liệu lớn nhất, có lưu lượng ghi cao nhất. Với thao tác đọc, nhóm dùng kỹ thuật "tap compare": một phần nhỏ lưu lượng đi vào dịch vụ Go, dịch vụ này gọi thêm endpoint Python cũ, so sánh hai kết quả và ghi lại khác biệt, nhưng người dùng vẫn nhận kết quả từ Python. Thao tác ghi khó hơn nhiều vì mỗi lần ghi phải cập nhật đồng thời Postgres, Memcached và Redis (nơi lưu các sự kiện CDC phải được giao đủ 100%), trong khi mã bình luận là duy nhất nên không thể ghi trùng vào cơ sở dữ liệu thật. Giải pháp là "sister datastores": ba kho dữ liệu tách biệt chỉ dành cho dịch vụ Go, rồi đem so với dữ liệu thật do Python ghi.

Quá trình này gặp nhiều trở ngại: dữ liệu được tuần tự hóa khác nhau giữa hai ngôn ngữ, ORM của Python có những tối ưu ngầm khiến truy vấn viết tay bằng Go gây áp lực bất ngờ lên Postgres, và race condition khi hai người cùng sửa một bình luận tạo ra những sai lệch giả trong log so sánh. Kết quả cuối cùng khả quan: ba endpoint ghi đều giảm một nửa độ trễ p99, từ những đợt tăng đột biến lên tới 15 giây xuống mức ổn định dưới 100 mili giây. Reddit chọn Go thay vì tách thành microservices Python vì khả năng xử lý đồng thời tốt hơn và vì Go đã phổ biến trong hạ tầng của họ.

## [On Idempotency Keys](https://www.morling.dev/blog/on-idempotency-keys/)

Gunnar Morling bàn về idempotency key, cơ chế giúp đạt được xử lý đúng một lần (exactly-once processing) trong hệ thống phân tán, dù việc giao tin nhắn đúng một lần là không thể đảm bảo. Bên nhận so sánh khóa của tin nhắn đến với các khóa đã xử lý để bỏ qua bản trùng, và việc xử lý tin nhắn cùng lưu khóa phải diễn ra nguyên tử, thường trong cùng một giao dịch cơ sở dữ liệu. Tác giả xem xét ba cách tạo khóa. UUIDv4 đơn giản nhưng buộc bên nhận lưu mọi khóa đã gặp; UUIDv7 hay ULID có thêm phần dấu thời gian nên có thể loại bỏ các khóa cũ. Dãy số tăng đơn điệu giúp bên nhận chỉ cần nhớ giá trị lớn nhất, nhưng lại gây khó cho bên gửi khi có nhiều yêu cầu đồng thời, vì việc cấp số phải được tuần tự hóa và dễ trở thành nút thắt.

Cách thứ ba là suy ra khóa từ nhật ký giao dịch của cơ sở dữ liệu bên gửi, một biến thể của outbox pattern dùng công cụ CDC như Debezium. Chẳng hạn, trong Postgres, số thứ tự LSN của các sự kiện commit trong WAL luôn tăng đơn điệu nên có thể dùng làm khóa. Tác giả kết luận không có giải pháp nào hoàn hảo: UUIDs kèm thời hạn lưu thường là đủ cho nhiều trường hợp, còn khi khối lượng tin nhắn càng lớn thì cách dùng dãy tăng đơn điệu từ nhật ký giao dịch càng hấp dẫn, đổi lại là thêm độ phức tạp vận hành.

## [No code reviews by default](https://www.raycast.com/blog/no-code-reviews-by-default)

Thomas Paul Mann, đồng sáng lập Raycast, chia sẻ văn hóa kỹ thuật của công ty: không bắt buộc review mã nguồn. Kỹ sư đẩy thay đổi thẳng lên nhánh main và chỉ yêu cầu review khi thấy cần. Theo tác giả, pull request làm giảm sự tin tưởng trong một đội vốn nên làm việc dựa trên niềm tin, không thực sự ngăn được lỗi vì nhiều vấn đề chỉ lộ ra sau thời gian dài sử dụng, và làm chậm tiến độ vì review hiếm khi là việc được ưu tiên. Thay vào đó, mỗi kỹ sư chịu trách nhiệm trọn vẹn cho tính năng của mình từ lúc lên ý tưởng đến khi bảo trì.

Trên thực tế, hệ thống tích hợp liên tục xây dựng và kiểm thử mọi commit, và nhóm phát hành bản nội bộ hằng ngày để mọi người dùng thử và góp ý sớm. Tính năng chưa đạt chất lượng được ẩn sau feature flag. Họ vẫn mở pull request khi đụng vào phần mã nguồn mới, chẳng hạn lần đầu thêm migration cơ sở dữ liệu, hoặc chỉ cần nhắn đồng đội xem lại sau khi đã commit. Lời khuyên cuối bài: đừng áp dụng "best practice" một cách giáo điều, hãy tự đặt quy tắc phù hợp với hoàn cảnh của đội mình.

## [Estimates – a necessary evil?](https://thorsell.io/2025/12/07/estimates.html)

Erik Thorsell, người từng đóng cả vai lập trình viên lẫn product owner (PO), phân tích vì sao việc ước lượng thời gian luôn gây căng thẳng giữa hai bên. PO cần ước lượng để ưu tiên backlog, cân nhắc giữa một tính năng lớn được mong đợi và vài tính năng nhỏ hơn khi ngày phát hành đã được công bố trước, và tình hình càng rối khi nhiều PO phải phối hợp cho cùng một sản phẩm. Ngược lại, lập trình viên ghét ước lượng vì họ bị yêu cầu dự đoán cả những vấn đề không thể lường trước. Tác giả cho rằng nợ kỹ thuật là nguồn xung đột chính: một việc dự kiến hai ngày có thể kéo dài nhiều tuần khi đụng vào mã nguồn cũ, trong khi PO ít am hiểu kỹ thuật khó thấy được cái giá của việc bỏ qua nó.

Vấn đề trở nên tệ hơn khi ước lượng bị dùng như hạn chót. Nhóm của tác giả khi đó dè dặt hơn hẳn và luôn cộng thêm thời gian dự phòng, biến ước lượng thành "lan can an toàn" để khỏi bị quy trách nhiệm trước những kỳ vọng phi lý. Dù vậy, nhiều hạn chót có lý do kinh doanh chính đáng, nên ai cũng phải chấp nhận cuộc chơi ước lượng. Các khái niệm về dòng chảy (flow) trong DevOps không giải quyết trực tiếp chuyện này nhưng giúp giảm rủi ro khi giao phần mềm. Kết luận: PO cũng chịu áp lực, và cách tốt nhất để giúp họ là liên tục cập nhật tiến độ cùng những trở ngại gặp phải.

---

*Bài viết đã được viết lại bởi Claude Code với Opus 5.5 vào ngày 27/09/2026.*
