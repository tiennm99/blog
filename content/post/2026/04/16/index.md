---
title: "Newsletter #96"
date: 2026-04-16
tags: ["AI-Assisted", "Go", "Garbage Collection", "AI Agent", "Software Engineering", "Clean Architecture", "Algorithms"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #96.*

## [Clean Architecture → Separation of Concerns trong Go](https://vjerci.com/writings/clean/separation-of-concerns/)

Bài viết hướng dẫn về nguyên tắc phân tách mối quan tâm (Separation of Concerns) trong Go, một nguyên tắc cốt lõi giúp mã nguồn dễ bảo trì và mở rộng. Tác giả minh họa vấn đề thông qua ví dụ xấu — một hàm `CreateUserHandler` gộp chung xử lý HTTP, thao tác cơ sở dữ liệu và xác thực dữ liệu vào cùng một nơi, khiến ứng dụng nhanh chóng trở nên khó quản lý khi phức tạp tăng lên.

Giải pháp được đề xuất là kiến trúc phân lớp với bốn tầng rõ ràng: HTTP (xử lý yêu cầu/phản hồi), Service (logic nghiệp vụ), Repository (truy cập cơ sở dữ liệu) và Model (định nghĩa cấu trúc dữ liệu). Bài viết cũng nêu bật các đặc trưng của Go như structural typing — struct tự động thỏa mãn interface mà không cần khai báo tường minh, cùng với kỹ thuật dependency injection thông qua hàm khởi tạo để kết nối các thành phần tại một điểm trung tâm.

**Điểm chính:**
- Nguyên tắc phân tách mối quan tâm đảm bảo thay đổi ở một phần không ảnh hưởng tiêu cực đến phần khác
- Kiến trúc phân lớp gồm bốn tầng: HTTP, Service, Repository và Model
- Go sử dụng structural typing — interface được triển khai ngầm định, không cần khai báo tường minh
- Sử dụng dependency injection qua hàm khởi tạo để kết nối các thành phần
- Mỗi package nên có một trách nhiệm duy nhất, rõ ràng và dễ hiểu

## [Bộ thu gom rác trong Go](https://internals-for-interns.com/posts/go-garbage-collector)

Bài viết chuyên sâu phân tích cơ chế hoạt động của Garbage Collector (GC) trong Go 1.26, phiên bản giới thiệu GreenTea GC. GC của Go là bộ thu gom không di chuyển đối tượng (non-moving), chạy đồng thời (concurrent), sử dụng thuật toán đánh dấu ba màu (tri-color mark-and-sweep). Toàn bộ chu trình GC gồm bốn giai đoạn: kết thúc quét (sweep termination), đánh dấu (mark), kết thúc đánh dấu (mark termination), và quét (sweep) — trong đó chỉ có hai lần dừng toàn bộ chương trình rất ngắn.

Điểm cải tiến lớn nhất của GreenTea GC là cơ chế quét theo span thay vì từng đối tượng riêng lẻ. Khi GC phát hiện con trỏ đến đối tượng, nó đánh dấu trong bitmap nội tuyến (inline mark bits) và xếp cả span vào hàng đợi FIFO, cho phép tích lũy nhiều đối tượng trước khi quét. Với span dày đặc (trên 12.5% đối tượng được đánh dấu), GC sử dụng lệnh AVX-512 để quét song song, nhanh gấp 4-8 lần. Cơ chế write barrier kiểu Yuasa-Dijkstra đảm bảo không bỏ sót đối tượng khi chương trình thay đổi con trỏ trong lúc GC đang chạy. Ngoài ra, mark assist tạo áp lực ngược lên goroutine cấp phát bộ nhớ quá nhanh, buộc chúng tham gia công việc đánh dấu.

**Điểm chính:**
- GC của Go chạy đồng thời với chương trình, chỉ dừng toàn bộ hai lần rất ngắn trong mỗi chu trình
- GreenTea GC (Go 1.26) quét theo span với hàng đợi FIFO, tận dụng tính cục bộ bộ nhớ đệm CPU
- Span dày đặc được quét bằng lệnh SIMD (AVX-512), nhanh gấp 4-8 lần so với quét từng đối tượng
- Write barrier kiểu Yuasa-Dijkstra đánh dấu cả con trỏ cũ và mới để không bỏ sót đối tượng
- GC Pacer điều chỉnh thời điểm kích hoạt chu trình dựa trên `GOGC` và `GOMEMLIMIT`

## [Kỹ năng sử dụng AI Agent hiệu quả](https://www.lesswrong.com/posts/9xAwybDhtgzGYPnbs/the-skill-of-using-ai-agents-well)

Bài viết chia sẻ kinh nghiệm thực tế về cách sử dụng AI agent một cách hiệu quả, với nguyên tắc cốt lõi: con người là nút thắt cổ chai, không phải AI. Tác giả đề xuất 13 chiến lược cụ thể, bao gồm: luôn dùng mô hình tốt nhất với mức thinking cao nhất; sử dụng git worktree để chạy nhiều phiên AI song song trên cùng một repository mà không xung đột tệp; bật ghi log chi tiết để AI tự điều tra lỗi chỉ từ mô tả triệu chứng ngắn gọn.

Về quản lý quyền, tác giả khuyên dùng AI thứ hai để đánh giá yêu cầu quyền (Auto Mode trong Claude Code) hoặc chạy agent trong container cách ly. Ngoài ra, việc mở phiên mới để review công việc thường phát hiện cải tiến mà phiên gốc bỏ lỡ, vì phiên gốc phân tán chú ý vào chi tiết triển khai. Tác giả cũng nhấn mạnh tầm quan trọng của hệ thống thông báo và bảng điều khiển trung tâm khi quản lý hơn 10 phiên song song.

**Điểm chính:**
- Con người là nút thắt cổ chai — ủy thác tối đa công việc cho AI, kể cả tác vụ dài
- Dùng git worktree để chạy nhiều phiên AI song song không xung đột
- Mở phiên AI mới để review giúp phát hiện cải tiến mà phiên gốc bỏ lỡ
- Dùng AI thứ hai đánh giá yêu cầu quyền thay vì duyệt thủ công
- Nhận biết sớm khi AI hoạt động kém để chuyển sang mô hình thay thế

## [Những quy tắc bất thành văn trong kỹ thuật phần mềm](https://newsletter.manager.dev/p/the-unwritten-laws-of-software-engineering)

Bài viết tổng hợp bảy quy tắc mà kỹ sư phần mềm thường chỉ học được qua những sai lầm đau đớn. Đầu tiên, khi hệ thống sản xuất gặp sự cố sau triển khai — hãy rollback ngay rồi mới điều tra, đừng cố chứng minh thay đổi không liên quan. Thứ hai, bản sao lưu chỉ thực sự tồn tại khi bạn đã thử khôi phục thành công từ nó. Thứ ba, log luôn là bài toán khó — quá ít thì thiếu thông tin khi sự cố, quá nhiều thì không thể tìm kiếm.

Ngoài ra, mọi thay đổi dữ liệu phải có kế hoạch rollback đã được kiểm thử; mọi dependency bên ngoài đều sẽ lỗi nên cần chuẩn bị fallback; thao tác rủi ro cần ít nhất hai người kiểm tra (quy tắc "4 mắt"); và giải pháp tạm thời sẽ tồn tại mãi mãi — nên viết giải pháp đơn giản nhưng sạch sẽ thay vì hack vội.

**Điểm chính:**
- Rollback ngay khi hệ thống lỗi sau triển khai, điều tra sau
- Bản sao lưu chỉ có giá trị khi đã kiểm thử khôi phục thành công
- Mọi dependency bên ngoài đều sẽ lỗi — cần fallback, cache và kế hoạch liên lạc
- Thao tác rủi ro cần quy tắc "4 mắt" — giải thích cho người khác thường giúp phát hiện lỗi
- Giải pháp tạm thời sẽ thành vĩnh viễn — viết đơn giản và sạch thay vì hack

## [Kỹ sư Big Tech cần sự tự tin lớn](https://www.seangoedecke.com/big-tech-needs-big-egos/)

Bài viết thách thức quan điểm phổ biến rằng ego không có chỗ trong ngành công nghệ, lập luận rằng sự tự tin mạnh mẽ là cần thiết để kỹ sư phần mềm thành công tại các công ty lớn. Khi làm việc với codebase khổng lồ, kỹ sư liên tục đối mặt với điều chưa biết và sai lầm — cần niềm tin vào bản thân đủ lớn để vượt qua sự bất định. Trong môi trường Big Tech, ego giúp kỹ sư đưa ra quan điểm rõ ràng về vấn đề kỹ thuật mơ hồ, chấp nhận xung đột khi thực hiện thay đổi lớn ảnh hưởng hàng trăm người, và dám phản bác giả định sai ngay cả khi đối mặt với lãnh đạo cấp cao.

Tuy nhiên, nghịch lý là kỹ sư hiệu quả nhất cũng cần biết kìm nén ego có chiến lược — thực thi kế hoạch của sếp dù không đồng ý, chấp nhận dự án bị hủy sau nhiều nỗ lực, và không bị ảnh hưởng bởi chính trị nội bộ. Tác giả mô tả kỹ sư cấp cao thành công như "tắc kè hoa" — biết điều chỉnh mức độ tự tin tùy theo đối tượng giao tiếp.

**Điểm chính:**
- Sự tự tin mạnh mẽ giúp kỹ sư vượt qua bất định khi làm việc với codebase lớn
- Ego cần thiết để đưa quan điểm rõ ràng, chấp nhận xung đột và phản bác giả định sai
- Kỹ sư hiệu quả cũng cần kìm nén ego có chiến lược với cấp trên
- Kiệt sức (burnout) đến từ "nỗ lực không được ghi nhận" chứ không phải làm việc quá nhiều giờ

## [Trực quan hóa thuật toán sắp xếp với Claude](https://simonwillison.net/2026/Mar/11/sorting-algorithms/)

Simon Willison chia sẻ quá trình sử dụng Claude để tạo bản demo tương tác minh họa các thuật toán sắp xếp: bubble sort, selection sort, insertion sort, merge sort, quick sort, heap sort và Timsort. Đặc biệt, khi triển khai Timsort, Claude đã tự truy cập repository CPython trên GitHub để đọc mã nguồn thực tế từ `Objects/listobject.c` và tài liệu `Objects/listsort.txt`. Tuy nhiên, khi GPT-5.4 Thinking đánh giá kết quả, nó nhận xét đây là "adaptive mergesort lấy cảm hứng từ Timsort" chứ chưa phải bản tái tạo hoàn chỉnh.

Sản phẩm cuối cùng hiển thị bảy thuật toán chạy đua đồng thời trên giao diện lưới, với thống kê thời gian thực về số lần so sánh và hoán đổi, cùng mã màu cho từng thao tác: hồng cho so sánh, cam cho hoán đổi, đỏ cho pivot và tím cho phần đã sắp xếp.

**Điểm chính:**
- Claude tự truy cập mã nguồn CPython để triển khai Timsort từ code thực tế
- Bảy thuật toán sắp xếp chạy đồng thời với trực quan hóa thời gian thực
- GPT-5.4 Thinking phát hiện bản triển khai Timsort chưa hoàn chỉnh — minh họa giá trị của cross-review giữa các mô hình AI

### Bonus

**Images:**
![12 Claude Code Features Every Engineer Should Know](https://substackcdn.com/image/fetch/w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F438c4c2f-0fa8-4748-9953-b63fd69674f4_2508x3000.png)
![How does REST API work?](https://substackcdn.com/image/fetch/w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F75e97a13-b186-4f16-ab59-f9a96867f744_1899x1536.jpeg)
![7 Key Load Balancer Use Cases](https://substackcdn.com/image/fetch/w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F0169578f-af50-4b3a-b8ed-542ee7ebf80f_2250x2814.png)

---

*Bài viết đã được review và cập nhật bởi Claude Code với Opus 4.7 (1M context).*
