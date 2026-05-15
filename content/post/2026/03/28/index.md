---
title: "Newsletter #93"
date: 2026-03-28
tags: ["AI-Assisted", "Newsletter", "AI", "PostgreSQL", "Rust", "System Design", "Performance"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #93.*

## [Bài học từ việc xây dựng Claude Code: Cách chúng tôi sử dụng Skills](https://x.com/trq212/status/2033949937936085378)

Thariq Shihipar, kỹ sư tại Anthropic, chia sẻ những bài học thực tiễn sau khi nhóm nội bộ đã xây dựng và vận hành hàng trăm skills trong Claude Code. Một quan niệm sai lầm phổ biến là skills chỉ là "các tệp markdown" — nhưng sức mạnh thực sự nằm ở cấu trúc thư mục: skills có thể chứa các tập lệnh (scripts), tài nguyên, và dữ liệu mà agent có thể khám phá và thao tác.

Bài viết phân loại 9 loại skills phổ biến: tài liệu tham khảo thư viện/API, kiểm thử sản phẩm, lấy và phân tích dữ liệu, tự động hóa quy trình kinh doanh, tạo mã khung (scaffolding), đảm bảo chất lượng mã nguồn, CI/CD và triển khai, runbooks xử lý sự cố, và vận hành hạ tầng. Ngoài ra, tác giả đưa ra các mẹo thiết thực: không nên mô tả những điều hiển nhiên mà hãy tập trung vào những gì thách thức hành vi mặc định của Claude; phần "Gotchas" (những lỗi bẫy thực tế) là nội dung có giá trị cao nhất trong bất kỳ skill nào; tận dụng hệ thống tệp để lưu trữ scripts và mẫu mã (templates); và trường `description` trong skill là để mô tả *khi nào* nên kích hoạt skill đó, không phải là mô tả cho người dùng.

**Điểm chính:**
- Cấu trúc thư mục của skills mới là nguồn sức mạnh thực sự, không phải nội dung markdown đơn thuần
- Phần "Gotchas" tích lũy từ thất bại thực tế là phần có giá trị nhất trong một skill
- Lưu cấu hình người dùng vào `config.json` và dùng `AskUserQuestion` khi chưa được cấu hình
- Skills có thể kết hợp với nhau (compose) — một skill có thể tham chiếu skill khác, tạo thành chuỗi phụ thuộc
- Đo lường mức độ sử dụng skills qua hook `PreToolUse` để theo dõi độ phổ biến

## [Tương lai của Kỹ thuật Phần mềm cùng Anthropic](https://www.akashbajwa.co/p/the-future-of-software-engineering)

Akash Bajwa tổng hợp buổi thảo luận bàn tròn với Ash Prabaker từ Anthropic và các kỹ sư cấp cao từ Stripe, NVIDIA, Microsoft, Google DeepMind, xAI, Apple, Scale AI và OpenAI — cùng nhau nhìn nhận cách AI đang thay đổi ngành phát triển phần mềm. Claude Code ra đời cuối năm 2024 từ một giao diện dòng lệnh đơn giản, được thiết kế hướng tới các khả năng tương lai thay vì giới hạn hiện tại, và đạt được mức độ áp dụng rộng rãi thông qua giá trị thực chứng minh.

Vòng lặp cải tiến đệ quy là điểm nổi bật: công cụ lập trình tốt hơn tạo ra mô hình tốt hơn, mô hình tốt hơn lại tạo ra công cụ tốt hơn. Trong thực tế, nhiều công ty đã triển khai hệ thống tự động phân loại lỗi và tạo pull request. Tuy nhiên, các thách thức chưa được giải quyết gồm: quản lý tác vụ dài hạn (multi-hour agent runs) trong khi vẫn duy trì sự giám sát của con người, và rủi ro hội tụ khi toàn ngành dùng cùng một mô hình dẫn đến các giải pháp đồng nhất.

**Điểm chính:**
- Quy trình "kiểm thử trước" (test-first) đang trở thành tiêu chuẩn khi làm việc với AI
- Review code của con người đang trở thành nút thắt cổ chai thay vì biện pháp bảo vệ
- Các tổ chức ưu tiên tuyển kỹ sư sẵn sàng thử nghiệm ở ranh giới kỹ thuật hơn là kỹ năng viết mã thuần túy
- Tài liệu do con người viết vẫn rất quan trọng; tài liệu lỗi thời hoặc do AI tạo ra làm giảm hiệu quả của AI
- AI chưa thâm nhập được vào các ngành có quy định chặt chẽ như luật pháp — vẫn cần con người trong vòng lặp

## [5 Quy tắc Lập trình của Rob Pike](https://www.cs.unc.edu/~stotts/COMP590-059-f24/robsrules.html)

Rob Pike, đồng tác giả ngôn ngữ Go và huyền thoại tại Bell Labs, để lại 5 quy tắc lập trình ngắn gọn nhưng cực kỳ súc tích, được giảng dạy trong khóa học COMP590 tại Đại học UNC. Cốt lõi của cả 5 quy tắc xoay quanh hai chủ đề lớn: đừng tối ưu hóa sớm và hãy giữ mọi thứ đơn giản. Quy tắc 1 và 2 nhắc nhở rằng bạn không thể đoán trước điểm nghẽn cổ chai — hãy đo lường trước khi tối ưu. Quy tắc 3 và 4 cảnh báo rằng các thuật toán phức tạp thường chậm hơn và dễ có lỗi hơn với dữ liệu nhỏ, vốn là trường hợp phổ biến trong thực tế. Quy tắc 5 là tinh hoa: cấu trúc dữ liệu mới là trung tâm của lập trình — chọn đúng cấu trúc dữ liệu, thuật toán sẽ tự hiện ra.

**5 quy tắc:**
- **Quy tắc 1:** Bạn không thể đoán được chương trình sẽ tốn thời gian ở đâu — đừng tối ưu hóa khi chưa chứng minh đó là điểm nghẽn
- **Quy tắc 2:** Hãy đo lường trước khi điều chỉnh tốc độ, và chỉ làm vậy khi một phần mã áp đảo phần còn lại
- **Quy tắc 3:** Thuật toán phức tạp chậm khi n nhỏ, mà n thường là nhỏ — đừng phức tạp hóa cho đến khi bạn biết chắc n thường xuyên lớn
- **Quy tắc 4:** Thuật toán phức tạp dễ có lỗi hơn và khó triển khai hơn — hãy dùng thuật toán đơn giản và cấu trúc dữ liệu đơn giản
- **Quy tắc 5:** Dữ liệu quyết định tất cả — cấu trúc dữ liệu, không phải thuật toán, mới là trung tâm của lập trình

## [Giới thiệu về Index trong PostgreSQL](https://dlt.github.io/blog/posts/introduction-to-postgresql-indexes/)

Bài viết toàn diện của Dalto Curvelano giải thích cơ chế nội tại của index trong PostgreSQL — từ cách dữ liệu được lưu trữ trong các trang 8KB (heap), cho đến các loại index khác nhau và khi nào nên dùng loại nào. Nguyên tắc thực tiễn đầu tiên cần nhớ: index chỉ có ích khi truy vấn trả về ít hơn 15-20% số hàng trong bảng; vượt qua ngưỡng này, PostgreSQL thường ưu tiên quét tuần tự hơn. Minh chứng rõ ràng: một bảng 1 triệu hàng mất 265ms khi quét tuần tự, nhưng chỉ 0,077ms sau khi thêm index.

Bài viết trình bày 5 loại index chính: B-Tree (mặc định, đa năng nhất, O(log n)), Hash (chỉ cho phép so sánh bằng, nhỏ hơn B-Tree với dữ liệu dài như UUID), BRIN (cực kỳ nhỏ gọn, phù hợp dữ liệu chuỗi thời gian), GIN (toàn văn, mảng, JSONB), và GiST/SP-GiST (kiểu hình học, khoảng giá trị). Đặc biệt chú ý đến partial index (chỉ đánh index một tập con hàng), covering index với `INCLUDE` (tránh quay lại heap), và expression index (đánh index kết quả của hàm).

**Điểm chính:**
- Chỉ thêm index khi truy vấn trả về dưới 15-20% số hàng; không nên đánh index bừa bãi
- Mỗi index đều có chi phí: tốn dung lượng đĩa, làm chậm INSERT/UPDATE/DELETE, tốn bộ nhớ
- B-Tree là lựa chọn mặc định; các loại khác chỉ dùng cho trường hợp đặc thù
- Partial index và covering index (`INCLUDE`) là công cụ mạnh để giảm kích thước và tăng hiệu năng
- PostgreSQL 18 giới thiệu Skip Scan, giúp dùng index nhiều cột mà không cần lọc theo cột đầu tiên

## [Dùng Rust và PostgreSQL cho Mọi thứ: Các mẫu học được qua nhiều năm](https://kerkour.com/rust-postgres-everything)

Sylvain Kerkour chia sẻ kinh nghiệm thực tiễn khi dùng Rust và PostgreSQL làm nền tảng chính cho toàn bộ hệ thống backend — thay thế nhiều công cụ hạ tầng phức tạp. Minh chứng nổi bật: một dịch vụ backend được viết lại từ Go sang Rust giảm thời gian xử lý từ ~30 phút xuống dưới 5 phút, giảm RAM từ 4GB xuống 512MB, và loại bỏ hoàn toàn lỗi nil pointer nhờ mô hình bộ nhớ của Rust.

Các mẫu thiết kế chính bao gồm: dùng `sqlx` thay vì ORM để cân bằng giữa đơn giản, hiệu năng và kiểm tra SQL lúc biên dịch; gom ghi dữ liệu thành batch tối đa 10.000 hàng với `UNNEST`; dùng `pg_try_advisory_lock()` để bầu chọn leader trong hệ thống phân tán mà không cần ZooKeeper hay Redis; thay Redis bằng unlogged tables của PostgreSQL cho dữ liệu tạm thời; và dùng PostgreSQL làm hàng đợi công việc với `FOR UPDATE SKIP LOCKED` kết hợp UUID v7.

**Điểm chính:**
- `sqlx` là lựa chọn tốt hơn ORM: đơn giản, hiệu năng cao, kiểm tra SQL lúc biên dịch
- PostgreSQL advisory locks thay thế ZooKeeper/Redis cho bầu chọn leader phân tán
- Unlogged tables nhanh hơn cho dữ liệu tạm — loại bỏ Redis như một dependency riêng biệt
- `FOR UPDATE SKIP LOCKED` + UUID v7 biến PostgreSQL thành hàng đợi công việc đáng tin cậy
- Triết lý cốt lõi: đơn giản hóa hạ tầng = tiết kiệm chi phí và linh hoạt vận hành

## [Kiểm soát Không lưu: Câu chuyện về IBM 9020](https://computer.rip/2026-01-17-air-traffic-control-9020.html)

J. B. Crawford kể lại lịch sử của IBM 9020 — hệ thống máy tính đa bộ xử lý tiên phong được FAA (Cục Hàng không Liên bang Mỹ) đưa vào kiểm soát không lưu quốc gia từ năm 1967. Trước đó, hệ thống SAGE vốn được thiết kế cho phòng thủ quân sự đã được tái sử dụng cho kiểm soát không lưu dân sự, nhưng có nhiều điểm yếu nghiêm trọng: không kiểm tra tính duy nhất của phân vùng độ cao, không phát hiện va chạm giữa các máy bay.

IBM 9020 giải quyết vấn đề này bằng kiến trúc gồm 6-7 máy tính S/360 liên kết qua bộ nhớ dùng chung, với chương trình điều khiển thời gian thực quản lý hàng trăm thiết bị ngoại vi. Điểm nổi bật là khả năng chịu lỗi: chương trình OEAP tự động chẩn đoán và cấu hình lại hệ thống khi có lỗi phần cứng mà không gián đoạn hoạt động kiểm soát không lưu. Hệ thống hoạt động đến giữa thập niên 1980, chứng minh rằng phần cứng thương mại có thể được thiết kế cho ứng dụng an toàn tính mạng nếu có kỹ thuật phần mềm và dự phòng đủ tốt.

**Điểm chính:**
- IBM 9020 ra đời để khắc phục các lỗ hổng an toàn của hệ thống SAGE khi dùng cho kiểm soát không lưu dân sự
- Kiến trúc đa máy tính liên kết qua bộ nhớ dùng chung, xử lý thời gian thực với hàng trăm thiết bị ngoại vi
- Khả năng tự động chẩn đoán và cấu hình lại khi lỗi phần cứng — không gián đoạn hoạt động
- Hoạt động từ 1967 đến giữa thập niên 1980, một số hệ thống hiển thị còn dùng đến thập niên 1990

## [SFQ: Thuật toán Hàng đợi Công bằng Đơn giản và Phi trạng thái](https://brooker.co.za/blog/2026/02/25/sfq.html)

Marc Brooker giới thiệu Stochastic Fairness Queuing (SFQ) — một trong những thuật toán ông yêu thích nhất cho hệ thống phân tán. Ý tưởng cốt lõi: thay vì duy trì một hàng đợi riêng cho từng khách hàng (tốn O(n) hàng đợi, không thực tế ở quy mô lớn), SFQ dùng một tập hàng đợi cố định O(1) và ánh xạ khách hàng vào hàng đợi thông qua hàm băm. Thách thức là hai khách hàng có thể băm vào cùng một hàng đợi (va chạm) và liên tục "cạnh tranh" với nhau. Giải pháp: định kỳ thay đổi hàm băm để các va chạm bị phân tán theo thời gian, đạt được sự công bằng thống kê.

Bài viết còn trình bày biến thể nâng cao kết hợp SFQ với shuffle sharding và best-of-two choices: mỗi khách hàng được ánh xạ vào một tập con hàng đợi, mỗi yêu cầu được định tuyến đến hàng đợi ngắn nhất trong tập đó. Kết quả: thao tác enqueue và dequeue đều O(1), đồng thời cách ly hiệu quả các "noisy neighbor" trong môi trường đa người dùng.

**Điểm chính:**
- SFQ đạt được sự công bằng mà không cần lưu trạng thái theo từng khách hàng — rất phù hợp cho hệ thống phân tán quy mô lớn
- Định kỳ thay đổi hàm băm là bước bắt buộc để tránh va chạm dai dẳng
- Kết hợp SFQ + shuffle sharding + best-of-two cho hiệu quả cách ly "noisy neighbor" mạnh mẽ
- Cả enqueue lẫn dequeue đều chạy trong O(1) — hiệu quả tính toán cao

## [CPU của bạn có thể dự đoán bao nhiêu nhánh lệnh?](https://lemire.me/blog/2026/03/18/how-many-branches-can-your-cpu-predict/)

Daniel Lemire thực hiện một thí nghiệm thú vị để đo giới hạn của bộ dự đoán nhánh (branch predictor) trên các CPU hiện đại. Ý tưởng: dùng một vòng lặp với chuỗi ngẫu nhiên cố định (seed cố định), nếu CPU đủ thông minh để "ghi nhớ" toàn bộ chuỗi thì nó sẽ dự đoán đúng gần 100% các nhánh. Bằng cách tăng dần độ dài chuỗi, ta tìm được điểm mà bộ dự đoán bắt đầu "hết bộ nhớ". Kết quả khá bất ngờ: AMD Zen 5 dự đoán được ~30.000 nhánh, Apple M4 ~10.000, còn Intel Emerald Rapids chỉ ~5.000 — tức là Zen 5 mạnh gấp 6 lần Intel trong chỉ số này.

Điều này có ý nghĩa thực tiễn quan trọng với việc benchmark: nếu tập dữ liệu kiểm thử đủ nhỏ để nằm trong giới hạn của bộ dự đoán, CPU sẽ "học thuộc" kết quả và cho ra con số hiệu năng lạc quan hơn thực tế nhiều. Kết quả benchmark đẹp không có nghĩa là mã của bạn thực sự nhanh trong môi trường sản xuất với dữ liệu đa dạng.

**Điểm chính:**
- AMD Zen 5 dẫn đầu với ~30.000 nhánh, gấp 6 lần Intel Emerald Rapids (~5.000)
- Vượt quá giới hạn này, độ chính xác dự đoán giảm về ~50% (tương đương đoán ngẫu nhiên)
- Benchmark với tập dữ liệu nhỏ, lặp lại có thể khiến kết quả bị thổi phồng do CPU "học thuộc" pattern
- Cần dùng tập dữ liệu đủ lớn và đa dạng để có kết quả đo lường phản ánh thực tế

### Bonus

**Images:**
![Different Types of Tests](https://substackcdn.com/image/fetch/$s_!tS1T!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F958d36d9-6b19-4949-b6a6-6aa614ede834_2508x2960.jpeg)
![How Single Sign-On (SSO) Works](https://substackcdn.com/image/fetch/$s_!c4WE!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd86cd367-494f-4031-9793-f27e6142e54b_2508x3000.png)
![How LLMs Use AI Agents with Deep Research](https://substackcdn.com/image/fetch/$s_!em-f!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F7e7e23e9-2a5a-4b06-a3fa-ccb6c5493f1d_2508x3000.png)
![How hackers steal passwords](https://substackcdn.com/image/fetch/$s_!kRPi!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F3d3b2bb9-fc09-48d9-89b7-52bc37098af9_2360x2960.png)

---

*Bài viết đã được review và cập nhật bởi Claude Code với Opus 4.7 (1M context).*
