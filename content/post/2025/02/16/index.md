---
title: "Newsletter #2"
date: 2025-02-16
tags: ["AI-Assisted", "Newsletter", "Databases", "Redis", "Rate Limiting", "Cloudflare", "LLMs"]
categories: [ "Newsletter" ]
---

<i>
Chào các bạn, đến hẹn lại lên, đây là Newsletter #2 của mình. Cuối tuần này mình đi chơi ở Xuyên Mộc, vừa về hôm nay thôi nên giờ mới lên bài.

Thôi không vòng vo nữa, vào ngay Newsletter #2 của MiTi nào.
</i>

## [Some things to expect in 2025](https://lwn.net/Articles/1003780/)

Như thông lệ đầu năm, Jonathan Corbet của LWN.net đưa ra loạt dự đoán cho cộng đồng Linux và phần mềm tự do năm 2025. Sched-ext — cơ chế nạp bộ lập lịch CPU từ không gian người dùng dưới dạng chương trình BPF — sẽ có mặt trong nhiều bản phân phối hơn, mở ra làn sóng ý tưởng lập lịch mới được thử nghiệm nhanh trên hệ thống thật. Mã nguồn Rust sẽ vào nhân Linux ngày càng nhiều, lần này là những phần người dùng thực sự chạy dù không nhận ra. Tác giả tin sẽ lộ ra thêm một vụ cài cửa hậu kiểu XZ, và các dự án chỉ có một người bảo trì sẽ bị xem là rủi ro, cả vì bảo mật lẫn nguy cơ kiệt sức.

Một dự án lớn có thể phát hiện mình đã hợp nhất nhiều mã nguồn do AI sinh ra mà người đóng góp không hiểu, buộc phải hoàn tác; song song là các nỗ lực xây dựng AI tạo sinh thực sự tự do. Các quỹ phần mềm tự do tiếp tục khó khăn, dù có thể ra đời quỹ chuyên hỗ trợ người bảo trì. Nhiều thiết bị phụ thuộc đám mây sẽ thành "cục gạch" khi nhà sản xuất phá sản, tạo cơ hội cho giải pháp tự do như Home Assistant; phần cứng mở như OpenWrt One sẽ phổ biến hơn, và các bản phân phối thay thế cho điện thoại được quan tâm trở lại. Cuối cùng, tác giả lo ngại căng thẳng toàn cầu sẽ ảnh hưởng đến cộng đồng và kêu gọi giữ vững tinh thần xây dựng hệ thống cho mọi người, đón nhận đóng góp từ bất kỳ ai.

## [Why you should use compact table columns](https://vladmihalcea.com/compact-table-columns/)

Vlad Mihalcea giải thích vì sao nên chọn kiểu cột nhỏ gọn khi thiết kế lược đồ cơ sở dữ liệu. Các hệ quản trị cơ sở dữ liệu quan hệ giữ những trang dữ liệu đã đọc từ đĩa trong bộ nhớ đệm (như shared buffers của PostgreSQL); vì RAM nhanh hơn SSD rất nhiều lần, cột càng gọn thì mỗi trang chứa càng nhiều bản ghi và mục chỉ mục, và truy vấn càng dễ được phục vụ từ bộ nhớ. Theo số liệu lịch sử tác giả dẫn, StackOverflow phục vụ khoảng 11 nghìn truy vấn mỗi giây chỉ với một nút SQL Server hoạt động, dùng 1,5 TB RAM cho cơ sở dữ liệu 2,8 TB cùng lược đồ tiết kiệm: khóa chính và khóa ngoại không dùng UUID 16 byte, nhiều khóa dùng int (4 byte) hoặc tinyint (1 byte), enum chiếm 1 byte và VARCHAR có giới hạn độ dài.

Tác giả minh họa bằng số liệu đo thực tế. Trên MySQL, với bảng customer năm triệu bản ghi, dùng tinyint thay vì smallint cho một khóa ngoại có chỉ mục tiết kiệm khoảng 71,59 MB; mười cột như vậy trên bảng một trăm triệu bản ghi sẽ chênh lệch tới khoảng 14,3 GB. PostgreSQL không có tinyint và còn căn chỉnh dữ liệu (data alignment), nên cần sắp xếp thứ tự cột theo cách "Column Tetris" để tránh phần đệm lãng phí; khi đó, dùng smallint thay vì int giúp bảng customer nhỏ hơn 38 MB. Bài học: chọn kiểu dữ liệu vừa đủ là chiến lược tối ưu hiệu năng đã được StackOverflow kiểm chứng suốt hơn 15 năm.

## [Rate limiting with Redis: An essential guide](https://foojay.io/today/rate-limiting-with-redis-an-essential-guide/)

Raphael De Lio mở đầu bằng những trải nghiệm quen thuộc với giới hạn tốc độ truy cập (rate limiting), như lỗi "429 Too Many Requests" hay hạn mức yêu cầu theo gói trả phí. Cơ chế này giúp ngăn lạm dụng, đảm bảo truy cập công bằng, điều tiết tải, giảm chi phí và tránh gián đoạn dịch vụ: Figma từng nhờ bộ giới hạn xây dựng trên Redis mà chặn được đợt tấn công gửi thư mời hàng loạt, còn Stripe cần nó để ngăn kịch bản cấu hình sai hoặc kẻ xấu chiếm dụng tài nguyên. Redis được ưa chuộng nhờ tốc độ, độ tin cậy, thao tác nguyên tử, lưu trữ bền vững và Lua scripting; GitHub cũng đã chuyển sang giải pháp dựa trên Redis với phân mảnh phía máy khách.

Bài viết so sánh năm thuật toán phổ biến. Leaky Bucket xử lý yêu cầu với tốc độ đều đặn, hợp với luồng truy cập ổn định nhưng không chịu được đột biến; Token Bucket cho phép bùng nổ ngắn khi còn token; Fixed Window Counter đơn giản nhưng dễ bị lách bằng cách dồn yêu cầu ở ranh giới hai cửa sổ thời gian; Sliding Window Log chính xác nhất nhưng tốn bộ nhớ và CPU khi quy mô lớn; Sliding Window Counter cân bằng giữa độ chính xác và hiệu quả. Để chọn đúng, cần xét đặc điểm lưu lượng, mức chính xác cần thiết, giới hạn tài nguyên và trải nghiệm người dùng. Theo tác giả, giới hạn tốc độ không chỉ là đặt ngưỡng mà là thiết kế hệ thống hiệu quả, công bằng và thân thiện; các bài cài đặt từng thuật toán bằng Java và Redis sẽ ra mắt hằng tuần.

## [Why does Cloudflare Pages have such a generous Free tier?](https://mattsayar.com/why-does-cloudflare-pages-have-such-a-generous-free-tier/)

Matt Sayar tìm hiểu vì sao Cloudflare Pages cung cấp gói miễn phí rộng rãi cho trang tĩnh. Trong bảng so sánh ở thời điểm viết bài, tác giả ghi nhận Cloudflare Pages không giới hạn băng thông, còn các dịch vụ khác đặt hạn mức hoặc giới hạn theo số yêu cầu. Đây là thông tin theo bối cảnh bài viết, cần kiểm tra lại chính sách khi chọn dịch vụ.

Anh đưa ra ba cách lý giải: trang tĩnh tương đối nhẹ, dễ phục vụ qua mạng lưới và bộ nhớ đệm; một Internet nhanh, an toàn giúp mở rộng thị trường cho sản phẩm bảo mật; người dùng miễn phí có thể giới thiệu hoặc mua dịch vụ trả phí sau này. Ví dụ 2,2 MB trong bài là dung lượng trang đang đọc, không phải toàn bộ website. Đây chủ yếu là lập luận của tác giả, cùng các phát biểu của Cloudflare được bổ sung qua thảo luận cộng đồng. Anh vẫn lưu trữ một phần website trên GitHub để có phương án thay thế nếu chính sách đổi.

## [How I program with LLMs](https://crawshaw.io/blog/programming-with-llms)

David Crawshaw tổng kết một năm chủ động dùng mô hình ngôn ngữ lớn (LLM) khi lập trình và kết luận chúng giúp tăng năng suất rõ rệt. Anh dùng LLM theo ba cách: tự động hoàn thành mã nguồn, thay công cụ tìm kiếm, và lập trình qua giao diện trò chuyện — cách khó nhất nhưng giá trị nhất. Trò chuyện hữu ích khi bạn biết cần viết gì nhưng không còn sức tạo tệp mới và tra thư viện: LLM đưa bản nháp đầu tiên có ý tưởng hay, đủ thư viện phụ thuộc và vài lỗi, mà sửa lỗi dễ hơn bắt đầu từ đầu. Hãy giao việc như đề thi: mục tiêu cụ thể, đủ ngữ cảnh, dễ kiểm chứng; luôn biên dịch và chạy kiểm thử trước khi đọc kỹ.

Ví dụ minh họa là viết bộ lấy mẫu reservoir ước lượng tứ phân vị bằng Go. LLM tạo package có cấu trúc và interface tốt, nhưng mã nguồn ban đầu không biên dịch được vì một biến không dùng, còn giá trị mong đợi trong kiểm thử là tự bịa. Khi được yêu cầu, nó viết thêm cài đặt tham chiếu để so sánh và một fuzz test dùng sai kiểu tham số, nhưng chỉ cần dán thông báo lỗi vào là tự sửa được; theo tác giả, hơn 80% lỗi từ công cụ được LLM tự xử lý. Anh cho rằng LLM làm thay đổi các đánh đổi quen thuộc: chia package nhỏ hơn, kiểm thử đầy đủ hơn, bớt cứng nhắc với nguyên tắc DRY — như tự viết lớp bọc 200 dòng cho đúng phần API cần dùng thay vì thư viện chính thức cồng kềnh. Anh đang tự động hóa những quan sát này trong sketch.dev.

## Bonus

Tuần này có kha khá bonus đến từ nhiều nguồn khác nhau

### Bonus #1: Một vài ebook mình tìm được

- [Designing Distributed Systems](https://info.microsoft.com/rs/157-GQE-382/images/EN-CNTNT-eBook-DesigningDistributedSystems.pdf)
- [Quastor Summaries](https://drive.google.com/file/d/1U7EchvgzCjTtF5JzGVVCFgjXC-qw7lIG/view)

### Bonus #2: Vài ảnh hay ho đến từ [ByteByteGo](https://bytebytego.com/)

![Cookies Vs Sessions Vs JWT Vs PASETO](https://substack-post-media.s3.amazonaws.com/public/images/11b53f30-8dba-4520-9b1a-425b54b9b84a_1280x1585.gif)
![Algorithms you should know before taking System Design Interviews](https://substack-post-media.s3.amazonaws.com/public/images/fdbcc119-8f5d-4d27-9a4b-2c8bde82b537_4026x8030.jpeg)
![Top 6 Load Balancing Algorithms](https://substack-post-media.s3.amazonaws.com/public/images/12dffcce-f231-48cc-915f-d53c0f8bce0c_3735x3573.jpeg)

---

*Bài viết đã được viết lại bởi Claude Code với Opus 5.5 vào ngày 27/09/2026; được review và chỉnh sửa bởi Codex với GPT 6.1 Sol vào ngày 09/11/2026.*
