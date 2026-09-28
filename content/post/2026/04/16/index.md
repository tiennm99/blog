---
title: "Newsletter #96"
date: 2026-04-16
tags: ["AI-Assisted", "Go", "Garbage Collection", "AI Agent", "Software Engineering", "Clean Architecture", "Algorithms"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #96.*

## [Clean Architecture → Separation of Concerns trong Go](https://vjerci.com/writings/clean/separation-of-concerns/)

Bài viết giải thích nguyên tắc phân tách mối quan tâm (Separation of Concerns): phần việc đã được xử lý ở một nơi trong hệ thống thì không nên bị các nơi khác bận tâm hay lặp lại. Tác giả mở đầu bằng một ví dụ xấu, trong đó một hàm duy nhất vừa xử lý yêu cầu HTTP, vừa xác thực dữ liệu, vừa thao tác với cơ sở dữ liệu. Khi mọi thứ đan xen như vậy, muốn sửa bất kỳ chỗ nào bạn cũng phải hiểu toàn bộ, và ứng dụng nhanh chóng trở nên khó bảo trì khi độ phức tạp tăng lên.

Giải pháp là chia hệ thống thành bốn tầng: HTTP chỉ lo nhận yêu cầu và trả phản hồi, Service chứa logic nghiệp vụ tách khỏi hạ tầng, Repository đảm nhận mọi thao tác với cơ sở dữ liệu, còn Model định nghĩa cấu trúc dữ liệu mà không phụ thuộc tầng nào khác. Go hỗ trợ cách tổ chức này nhờ structural typing: struct tự động thỏa mãn interface mà không cần khai báo kế thừa. Tác giả khuyên mỗi package chỉ nên giữ một trách nhiệm rõ ràng, dễ nắm bắt ngay khi nhìn vào, và kết nối các thành phần bằng dependency injection qua hàm khởi tạo để quan hệ giữa chúng hiện rõ trong mã khởi tạo. Bài viết còn gợi ý dùng tính năng "find all implementations" của IDE để tìm struct hiện thực một interface, cùng câu lệnh `var _ MyInterface = (*MyStruct)(nil)` để trình biên dịch kiểm tra việc hiện thực đó.

## [The Garbage Collector](https://internals-for-interns.com/posts/go-garbage-collector)

Bài viết đi sâu vào bộ thu gom rác (Garbage Collector - GC) của Go 1.26, phiên bản giới thiệu GreenTea GC. GC của Go thuộc loại không di chuyển đối tượng (non-moving), chạy đồng thời (concurrent) và dùng thuật toán đánh dấu ba màu (tri-color mark-and-sweep). Vì đối tượng giữ nguyên địa chỉ suốt vòng đời, con trỏ luôn hợp lệ và việc phối hợp với mã unsafe hay C trở nên đơn giản hơn. Mỗi chu trình gồm bốn giai đoạn: kết thúc quét (sweep termination), đánh dấu (mark) chạy song song với chương trình và chiếm khoảng 25% CPU, kết thúc đánh dấu (mark termination), rồi quét (sweep) theo kiểu lười gắn với nhu cầu cấp phát; toàn bộ chu trình chỉ dừng chương trình hai lần rất ngắn.

Điểm mới của GreenTea là đưa cả span (vùng nhớ chứa các đối tượng cùng kích thước) vào hàng đợi thay vì từng đối tượng riêng lẻ, nhờ đó gom được nhiều đối tượng đã đánh dấu trước khi quét và tận dụng tốt bộ nhớ đệm CPU. Với span có trên 12.5% đối tượng được đánh dấu, GC dùng lệnh SIMD AVX-512 trên x86-64 để quét nhanh hơn 4-8 lần. Write barrier lai Yuasa-Dijkstra đánh dấu cả con trỏ cũ lẫn mới khi chương trình ghi đè con trỏ, bảo đảm không bỏ sót đối tượng còn sống. Khi goroutine cấp phát nhanh hơn tốc độ đánh dấu, cơ chế mark assist buộc chúng tham gia đánh dấu, tạo áp lực ngược. Cuối cùng, GC Pacer quyết định thời điểm chạy dựa trên `GOGC` (mặc định 100, tức kích hoạt khi heap tăng gấp đôi) và `GOMEMLIMIT` (giới hạn bộ nhớ tuyệt đối).

## [The Skill of Using AI Agents Well](https://www.lesswrong.com/posts/9xAwybDhtgzGYPnbs/the-skill-of-using-ai-agents-well)

Bài viết chia sẻ kinh nghiệm thực tế khi làm việc với AI agent, xoay quanh một nhận định cốt lõi: nút thắt cổ chai là sự chú ý của con người chứ không phải năng lực của AI. Vì vậy, tác giả tập trung vào quy trình giúp giảm ma sát cho chính mình: luôn dùng mô hình tốt nhất với mức suy luận cao nhất, bật ghi log chi tiết để AI tự điều tra lỗi, và cho mỗi phiên AI một nhánh riêng bằng git worktree để nhiều phiên chạy song song mà không đụng tệp của nhau. Những việc có thể song song hóa, như kiểm thử năm kịch bản cùng lúc, nên giao cho nhiều subagent.

Về quyền truy cập, tác giả khuyên đưa các lệnh hiển nhiên an toàn vào danh sách cho phép, dùng một AI thứ hai để tự động đánh giá yêu cầu cấp quyền, và bật âm thanh thông báo khi agent cần người trả lời. Mở một phiên mới để review thường phát hiện được vấn đề mà phiên gốc bỏ sót, còn một bảng điều khiển theo dõi mọi phiên giúp nhanh chóng tìm ra phiên đang chờ phản hồi. Tác giả cũng giao trọn cho AI các việc chuẩn bị như dựng cơ sở dữ liệu hay kiểm thử giao diện, chuyển sang nhà cung cấp khác khi mô hình có dấu hiệu kém đi, và đang thử nghiệm các hệ thống bộ nhớ xuyên phiên, dù chưa tìm được giải pháp thật sự ưng ý.

## [The unwritten laws of software engineering](https://newsletter.manager.dev/p/the-unwritten-laws-of-software-engineering)

Bài viết tổng hợp bảy quy tắc mà kỹ sư phần mềm thường chỉ học được sau những sai lầm đắt giá. Khi hệ thống production gặp sự cố ngay sau một lần triển khai, hãy rollback trước rồi mới điều tra, thay vì mất hàng giờ chứng minh thay đổi của mình vô can. Bản sao lưu chỉ thực sự tồn tại khi bạn đã khôi phục thành công từ nó, và bạn cần biết rõ khoảng dữ liệu có thể mất, ai được quyền khôi phục cũng như thời gian khôi phục thực tế khi dữ liệu ngày càng lớn. Log thì luôn khó cân bằng: thiếu thông tin khi có sự cố, hoặc quá dài dòng và thiếu request ID chung để truy vết giữa các dịch vụ.

Mọi thay đổi chạm đến dữ liệu phải có kế hoạch rollback đã được kiểm thử, vì kế hoạch chưa từng chạy thử thì chỉ có một nửa cơ hội hoạt động. Mọi dependency bên ngoài rồi sẽ lỗi, nên cần tìm hiểu giới hạn tốc độ, kiểm thử hành vi khi dịch vụ ngừng hoạt động và chuẩn bị cache, hàng đợi hay kế hoạch thông báo cho người dùng; ghép hai hệ thống 99.9% chỉ còn khoảng 99.8% độ tin cậy. Thao tác có rủi ro cần quy tắc "4 mắt": nhờ người khác xem cùng, và việc giải thích thành lời thường tự giúp bạn phát hiện lỗi. Cuối cùng, không gì bền bằng giải pháp tạm thời, nên hãy viết giải pháp đơn giản, giới hạn nhưng sạch sẽ thay vì chắp vá.

## [Big tech engineers need big egos](https://www.seangoedecke.com/big-tech-needs-big-egos/)

Sean Goedecke phản bác quan điểm phổ biến rằng cái tôi không có chỗ trong ngành công nghệ, và lập luận rằng kỹ sư ở các công ty lớn cần một cái tôi đủ mạnh để thành công. Công việc hằng ngày của họ là liên tục đối mặt với sai lầm của chính mình và những codebase phức tạp đến mức khó hiểu nổi, nên cần niềm tin rằng mình giải quyết được cả những vấn đề tưởng như bất khả thi. Trong tổ chức, sự tự tin giúp kỹ sư giữ quan điểm kỹ thuật rõ ràng dù còn nhiều bất định, đưa ra những quyết định không được lòng số đông nhưng ảnh hưởng đến hàng trăm đồng nghiệp, và dám chỉ ra hiểu lầm của lãnh đạo cấp cao.

Nghịch lý là kỹ sư hiệu quả cũng phải biết đặt cái tôi xuống trước cấu trúc tổ chức: chấp nhận dự án bị hủy, thua trong các cuộc tranh luận chính trị nội bộ hay những quyết định thiếu rõ ràng mà không oán giận. Tác giả gọi đó là kiểu "tắc kè hoa", quyết đoán với đồng nghiệp nhưng tôn trọng thứ bậc. Ông cũng cho rằng kiệt sức (burnout) không đến từ làm quá nhiều mà từ nỗ lực không được ghi nhận, nhất là khi một quyết định kỹ thuật đúng lại bị trừng phạt vì mâu thuẫn với chính trị. Sự cân bằng khó khăn này lý giải vì sao kỹ sư cấp cao giỏi luôn hiếm.

## [Sorting algorithms](https://simonwillison.net/2026/Mar/11/sorting-algorithms/)

Simon Willison chia sẻ cách anh dùng Claude Artifacts để tạo một bản demo hoạt họa minh họa các thuật toán sắp xếp, ban đầu gồm bubble sort, selection sort, insertion sort, merge sort, quick sort và heap sort. Khi được yêu cầu bổ sung Timsort, Claude đã tự clone repository CPython trên GitHub và đọc mã nguồn trong `Objects/listobject.c` cùng tài liệu `Objects/listsort.txt` để triển khai. Tuy vậy, khi nhờ GPT-5.4 Thinking đánh giá lại, mô hình này nhận xét đây chỉ là một bản adaptive mergesort đơn giản hóa lấy cảm hứng từ Timsort chứ chưa phải bản triển khai đầy đủ, một ví dụ cho thấy giá trị của việc để các mô hình AI kiểm tra chéo lẫn nhau.

Sau vài lượt tinh chỉnh giao diện, sản phẩm có thêm nút "Run all" cho cả bảy thuật toán chạy đua đồng thời trên dạng lưới, hiển thị số lần so sánh và hoán đổi theo thời gian thực cùng mã màu cho từng thao tác: hồng cho so sánh, cam cho hoán đổi, đỏ cho pivot và tím cho phần đã sắp xếp. Trong các lần chạy thử, Timsort về đích nhanh nhất, theo sau là quick sort và merge sort, còn bubble sort chậm nhất. Bài viết cho thấy công cụ AI hiện nay có thể nhanh chóng tạo ra nội dung học tập tương tác chỉ qua trao đổi và tinh chỉnh.

### Bonus

**Images:**
![12 Claude Code Features Every Engineer Should Know](https://substackcdn.com/image/fetch/w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F438c4c2f-0fa8-4748-9953-b63fd69674f4_2508x3000.png)
![How does REST API work?](https://substackcdn.com/image/fetch/w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F75e97a13-b186-4f16-ab59-f9a96867f744_1899x1536.jpeg)
![7 Key Load Balancer Use Cases](https://substackcdn.com/image/fetch/w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F0169578f-af50-4b3a-b8ed-542ee7ebf80f_2250x2814.png)

---

*Bài viết đã được viết lại bởi Claude Code với Opus 5.5 vào ngày 27/09/2026.*
