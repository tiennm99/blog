---
title: "Newsletter #93"
date: 2026-03-28
tags: ["AI-Assisted", "Newsletter", "AI", "PostgreSQL", "Rust", "System Design", "Performance"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #93.*

## [Bài học từ việc xây dựng Claude Code: Cách chúng tôi sử dụng Skills](https://x.com/trq212/status/2033949937936085378)

Thariq Shihipar, kỹ sư tại Anthropic, tổng kết những bài học rút ra khi nội bộ công ty vận hành hàng trăm skills trong Claude Code. Điểm đầu tiên ông muốn sửa là quan niệm skills "chỉ là tệp markdown": thực chất mỗi skill là một thư mục có thể chứa tập lệnh, tài nguyên và dữ liệu để agent tự khám phá và thao tác, kèm nhiều tùy chọn cấu hình như đăng ký hook động. Sau khi phân loại, nhóm nhận thấy skills thường rơi vào vài nhóm quen thuộc: tài liệu tham khảo thư viện và API, kiểm chứng sản phẩm, truy xuất và phân tích dữ liệu, tự động hóa quy trình nhóm, tạo mã khung, đảm bảo chất lượng mã nguồn, CI/CD và triển khai, runbook xử lý sự cố, cùng vận hành hạ tầng. Skill tốt thường nằm gọn trong một nhóm, còn skill khó hiểu thì trải qua nhiều nhóm.

Về cách viết, tác giả khuyên bỏ qua những điều hiển nhiên và tập trung vào chỗ cần đẩy Claude ra khỏi hành vi mặc định; phần "Gotchas" tích lũy từ những lần thất bại thực tế là nội dung giá trị nhất. Trường `description` không phải bản tóm tắt cho người đọc mà là mô tả *khi nào* nên kích hoạt skill. Skill có thể lưu cấu hình người dùng vào `config.json` và dùng `AskUserQuestion` khi chưa có, lưu "bộ nhớ" dưới dạng tệp nhật ký hay JSON trong thư mục dữ liệu ổn định, và cung cấp sẵn tập lệnh để Claude dành lượt cho việc kết hợp thay vì viết lại mã lặp. Cuối cùng, skill có thể tham chiếu lẫn nhau theo tên, và nhóm đo mức độ sử dụng qua hook `PreToolUse` để phát hiện skill phổ biến hoặc ít được kích hoạt.

## [Tương lai của Kỹ thuật Phần mềm cùng Anthropic](https://www.akashbajwa.co/p/the-future-of-software-engineering)

Akash Bajwa tổng hợp buổi thảo luận bàn tròn cùng Ash Prabaker của Anthropic và các lãnh đạo kỹ thuật từ Stripe, NVIDIA, Microsoft, Google DeepMind, xAI, Apple, Scale AI và OpenAI về cách AI đang định hình lại nghề phát triển phần mềm. Claude Code khởi đầu cuối năm 2024 như một giao diện dòng lệnh đơn giản, được thiết kế cho năng lực mô hình sáu đến mười hai tháng sau thay vì hiện tại, và lan rộng nhờ giá trị thực tế chứ không do áp đặt. Ý tưởng xuyên suốt là vòng lặp cải tiến đệ quy: công cụ lập trình tốt hơn giúp mô hình tốt hơn, rồi mô hình lại cải thiện công cụ; một số công ty đã có hệ thống tự phân loại lỗi, đối chiếu với bộ đánh giá và mở pull request sửa lỗi với rất ít can thiệp của con người.

Về quy trình, kiểm thử trước đã trở thành mặc định, việc review mã nguồn của con người dần giống nút thắt cổ chai hơn là lớp bảo vệ, và chú thích trong mã nguồn được giữ lại vì phiên agent sau cần đến. Tài liệu ngữ cảnh do con người viết vẫn hữu ích, trong khi tài liệu lỗi thời hoặc do agent tự sinh có thể gây hại. Khi tuyển dụng, một số nơi ưu tiên người sẵn sàng thử nghiệm liên tục ở ranh giới công nghệ hơn là kỹ năng viết mã thuần túy. Những bài toán còn bỏ ngỏ gồm tác vụ kéo dài nhiều giờ cho agent mà vẫn giữ được sự giám sát của con người, quản lý ngữ cảnh ở quy mô lớn, và việc AI khiến mọi thứ đều khả thi nên chọn ưu tiên lại càng khó.

## [5 Quy tắc Lập trình của Rob Pike](https://www.cs.unc.edu/~stotts/COMP590-059-f24/robsrules.html)

Rob Pike, đồng tác giả ngôn ngữ Go và từng làm việc tại Bell Labs, đúc kết năm quy tắc lập trình ngắn gọn được dùng làm tài liệu cho khóa COMP590 tại Đại học UNC. Hai quy tắc đầu nói về tối ưu: bạn không thể đoán trước chương trình tốn thời gian ở đâu vì điểm nghẽn thường xuất hiện ở chỗ bất ngờ, nên đừng vội thêm mẹo tăng tốc khi chưa chứng minh được, và hãy đo lường trước, chỉ điều chỉnh khi một phần mã nguồn thực sự áp đảo phần còn lại. Hai quy tắc này chính là cách nói khác của câu nổi tiếng từ Tony Hoare: "tối ưu hóa sớm là gốc rễ của mọi điều tệ hại".

Quy tắc 3 và 4 cảnh báo rằng thuật toán cầu kỳ có hằng số lớn nên chậm khi n nhỏ, mà n thường nhỏ; chúng cũng dễ sinh lỗi và khó cài đặt hơn, vì vậy hãy dùng thuật toán và cấu trúc dữ liệu đơn giản — Ken Thompson tóm lại là "khi nghi ngờ, cứ dùng vét cạn". Quy tắc 5 là cốt lõi: dữ liệu quyết định tất cả. Khi đã chọn đúng cấu trúc dữ liệu và tổ chức hợp lý, thuật toán gần như tự hiện ra; cấu trúc dữ liệu, chứ không phải thuật toán, mới là trung tâm của lập trình.

## [Giới thiệu về Index trong PostgreSQL](https://dlt.github.io/blog/posts/introduction-to-postgresql-indexes/)

Dalto Curvelano giải thích cơ chế bên trong của index trong PostgreSQL cho những lập trình viên đã hiểu index ở mức trực giác nhưng chưa rõ cách chúng hoạt động. Bài viết bắt đầu từ cách dữ liệu được lưu trong các trang 8KB của heap và lý do index giúp đọc ít dữ liệu hơn: trong ví dụ, truy vấn trên bảng một triệu hàng mất khoảng 265ms khi quét tuần tự nhưng chỉ còn 0,077ms sau khi có index. Theo quy tắc kinh nghiệm, index chỉ có ích khi truy vấn trả về dưới khoảng 15-20% số hàng; vượt ngưỡng này, bộ lập kế hoạch truy vấn thường chọn quét tuần tự. Index cũng không miễn phí: nó tốn dung lượng đĩa, làm chậm INSERT/UPDATE/DELETE, chiếm bộ nhớ và tăng việc cho bộ lập kế hoạch, nên không nên thêm tràn lan.

Phần lớn bài viết dành cho các loại index. B-Tree là lựa chọn mặc định và linh hoạt nhất; từ PostgreSQL 18, tính năng skip scan cho phép dùng index nhiều cột ngay cả khi truy vấn không lọc theo cột đầu tiên. Hash chỉ hỗ trợ so sánh bằng nhưng nhỏ gọn hơn B-Tree với dữ liệu dài như UUID hay URL; BRIN rất gọn, hợp với bảng chỉ ghi thêm và dữ liệu chuỗi thời gian; GIN phục vụ tìm kiếm toàn văn, mảng và JSONB; còn GiST/SP-GiST dành cho dữ liệu hình học và khoảng giá trị. Tác giả cũng giới thiệu partial index (chỉ đánh index một tập con hàng), covering index với `INCLUDE` để tránh quay lại heap, và expression index cho kết quả của hàm.

## [Dùng Rust và PostgreSQL cho Mọi thứ: Các mẫu học được qua nhiều năm](https://kerkour.com/rust-postgres-everything)

Sylvain Kerkour chia sẻ các mẫu thiết kế ông đúc kết khi dùng Rust và PostgreSQL làm nền tảng cho gần như toàn bộ backend, với triết lý chọn công cụ đơn giản, ổn định để giảm chi phí và tăng sự linh hoạt khi vận hành. Ví dụ mở đầu là một dịch vụ xử lý dữ liệu viết lại từ Go sang Rust kèm bộ cấp phát bộ nhớ hiệu năng cao: thời gian xử lý mỗi lô giảm từ khoảng 30 phút xuống dưới 5 phút, yêu cầu RAM giảm từ 4GB xuống 512MB, và lỗi nil pointer không còn xuất hiện.

Về phía mã nguồn, tác giả chọn `sqlx` thay cho ORM vì đơn giản, hiệu năng tốt và có macro kiểm tra câu SQL ngay lúc biên dịch; ghi dữ liệu được gom thành từng lô tối đa 10.000 hàng bằng `UNNEST` để tránh quá tải cơ sở dữ liệu. Nhiều thành phần hạ tầng quen thuộc được thay bằng chính PostgreSQL: `pg_try_advisory_lock()` dùng để bầu chọn leader, chẳng hạn cho bộ lập lịch CRON, mà không cần ZooKeeper hay Redis; bảng `UNLOGGED` thay Redis cho dữ liệu tạm vì không ghi vào WAL nên nhanh hơn, đổi lại không bền vững khi hệ thống sập; và PostgreSQL trở thành hàng đợi công việc đáng tin cậy khi dùng UUID v7 làm khóa để tránh phân mảnh index cùng `FOR UPDATE SKIP LOCKED` khi lấy việc.

## [Kiểm soát Không lưu: Câu chuyện về IBM 9020](https://computer.rip/2026-01-17-air-traffic-control-9020.html)

J. B. Crawford kể lại lịch sử IBM 9020 — hệ thống đa máy tính được FAA (Cục Hàng không Liên bang Mỹ) dùng để tự động hóa kiểm soát không lưu, với hệ thống đầy đủ đầu tiên lắp đặt năm 1967. Trước đó, SAGE vốn được xây dựng cho phòng không quân sự đã được cân nhắc cho mục đích dân sự, nhưng nó không kiểm tra tính duy nhất của các độ cao được cấp phát, không phát hiện mất khoảng cách an toàn giữa các máy bay, trong khi va chạm trên không đang là vấn đề chính trị nóng bỏng thời đó.

IBM 9020 về bản chất là sáu đến bảy máy S/360 ghép với nhau qua bộ nhớ dùng chung do các Storage Element quản lý, cùng một chương trình điều khiển thời gian thực phân phối công việc và điều phối hàng trăm thiết bị ngoại vi. Điểm đáng chú ý nhất là khả năng chịu lỗi: khi có sự cố, chương trình OEAP tự chẩn đoán, bỏ qua lỗi thoáng qua, hoặc ghi lại thanh ghi cấu hình để loại phần cứng hỏng ra khỏi hệ thống mà hoạt động kiểm soát không lưu vẫn tiếp tục. Hệ thống phục vụ đến giữa thập niên 1980, một số hệ thống hiển thị còn dùng đến thập niên 1990, cho thấy phần cứng thương mại vẫn có thể gánh ứng dụng liên quan đến tính mạng nếu phần mềm và cơ chế dự phòng được thiết kế cẩn thận.

## [SFQ: Thuật toán Hàng đợi Công bằng Đơn giản và Phi trạng thái](https://brooker.co.za/blog/2026/02/25/sfq.html)

Marc Brooker giới thiệu Stochastic Fairness Queuing (SFQ), thuật toán từ bài báo năm 1990 của Paul McKenney và là một trong những thuật toán nhỏ ông yêu thích nhất cho hệ thống phân tán. Cách làm công bằng truyền thống duy trì một hàng đợi riêng cho mỗi khách hàng, nghĩa là cần O(số khách hàng) hàng đợi và công sức xoay vòng tương ứng — không khả thi ở quy mô lớn. SFQ chỉ dùng một tập hàng đợi cố định, O(1), và gán khách hàng vào hàng đợi bằng hàm băm. Vấn đề là hai khách hàng băm trùng hàng đợi sẽ mãi chịu thiệt nếu một bên là "noisy neighbor", nên SFQ định kỳ thay đổi hàm băm để những cặp va chạm trong giai đoạn này hầu như không còn va chạm ở giai đoạn sau.

Brooker còn đề xuất biến thể kết hợp SFQ với shuffle sharding và best-of-two: mỗi khách hàng được gán một tập con hàng đợi (có thể chỉ hai hàng), mỗi yêu cầu vào hàng ngắn nhất trong tập đó, và các tập con được xáo lại định kỳ. Kết quả là số hàng đợi, chi phí enqueue lẫn dequeue đều O(1), đồng thời cách ly tốt các "noisy neighbor" khỏi những khách hàng khác, miễn là số khách hàng gây ồn chỉ chiếm tỉ lệ nhỏ. Kỹ thuật này dùng được cả trên một máy chủ phục vụ nhiều khách hàng lẫn khi cân bằng tải giữa nhiều máy.

## [CPU của bạn có thể dự đoán bao nhiêu nhánh lệnh?](https://lemire.me/blog/2026/03/18/how-many-branches-can-your-cpu-predict/)

Daniel Lemire đo xem bộ dự đoán nhánh (branch predictor) của CPU hiện đại có thể "ghi nhớ" được bao nhiêu nhánh. Bài kiểm thử dùng một vòng lặp sinh giá trị ngẫu nhiên và chỉ ghi vào bộ đệm khi giá trị là số lẻ, nên về lý thuyết CPU sẽ đoán sai một nửa số lần. Nhưng nếu chạy lặp lại với cùng chuỗi giá trị ngẫu nhiên, CPU dần học thuộc các nhánh; tăng độ dài chuỗi sẽ tìm ra giới hạn mà sau đó độ chính xác tụt về mức đoán ngẫu nhiên. Kết quả: AMD Zen 5 dự đoán hoàn hảo khoảng 30.000 nhánh, Apple M4 khoảng 10.000, còn Intel Emerald Rapids chỉ khoảng 5.000 — kém Zen 5 tới sáu lần.

Bài học thực tế nằm ở việc đo hiệu năng: nếu tập dữ liệu kiểm thử đủ nhỏ để nằm gọn trong khả năng ghi nhớ của bộ dự đoán, CPU sẽ học thuộc mẫu và cho ra con số đẹp hơn nhiều so với khi chạy trên dữ liệu thật. Vì vậy, muốn kết quả đo phản ánh đúng môi trường vận hành thực tế, bạn cần dùng tập dữ liệu đủ lớn và đa dạng thay vì lặp lại một tập nhỏ.

### Bonus

**Images:**
![Different Types of Tests](https://substackcdn.com/image/fetch/$s_!tS1T!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F958d36d9-6b19-4949-b6a6-6aa614ede834_2508x2960.jpeg)
![How Single Sign-On (SSO) Works](https://substackcdn.com/image/fetch/$s_!c4WE!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd86cd367-494f-4031-9793-f27e6142e54b_2508x3000.png)
![How LLMs Use AI Agents with Deep Research](https://substackcdn.com/image/fetch/$s_!em-f!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F7e7e23e9-2a5a-4b06-a3fa-ccb6c5493f1d_2508x3000.png)
![How hackers steal passwords](https://substackcdn.com/image/fetch/$s_!kRPi!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F3d3b2bb9-fc09-48d9-89b7-52bc37098af9_2360x2960.png)

---

*Bài viết đã được viết lại bởi Claude Code với Opus 5.5 vào ngày 27/09/2026.*
