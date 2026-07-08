---
title: "Newsletter #91"
date: 2026-03-17
tags: ["AI-Assisted", "Newsletter", "Go", "Performance", "Concurrency", "AI Coding", "Algorithms"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #91.*

## [How Go Slices Work Under the Hood: What Makes Them Stand Out from Other Languages](https://dev.to/ganesh-kumar/how-go-slices-work-under-the-hood-what-makes-them-stand-out-from-other-languages-42o4)

Bài viết giải thích cách slice trong Go hoạt động bên trong — một trong những cấu trúc dữ liệu quan trọng nhất của ngôn ngữ này. Không giống như mảng thông thường, slice trong Go là một cấu trúc gồm ba thành phần: con trỏ trỏ đến mảng nền bên dưới, độ dài hiện tại (`len`), và dung lượng tối đa (`cap`). Nhờ thiết kế này, slice có thể mở rộng linh hoạt mà không cần sao chép toàn bộ dữ liệu mỗi lần.

Khi thực hiện thao tác cắt (`[start:end]`), Go không sao chép dữ liệu mà chỉ tạo một con trỏ mới trỏ đến vùng nhớ gốc — giúp tiết kiệm bộ nhớ đáng kể. Khi dùng `append` và slice đã đầy, Go sẽ cấp phát mảng mới với dung lượng lớn hơn: với slice nhỏ hơn 256 phần tử, dung lượng tăng gấp đôi; với slice lớn hơn, tốc độ tăng trưởng giảm dần từ 2x xuống 1.25x để cân bằng giữa hiệu năng và bộ nhớ. Sử dụng `make` để khởi tạo slice với dung lượng phù hợp ngay từ đầu là cách tối ưu nhằm tránh việc cấp phát lại bộ nhớ nhiều lần.

**Điểm chính:**
- Slice gồm 3 thành phần: con trỏ, độ dài (`len`), dung lượng (`cap`)
- Cắt slice không sao chép dữ liệu, chỉ tạo con trỏ mới đến mảng gốc
- `append` tự động mở rộng dung lượng khi cần, với chiến lược tăng trưởng thông minh
- Dùng `make([]T, len, cap)` để khởi tạo trước dung lượng, tránh cấp phát lại bộ nhớ
- Hiểu cơ chế slice giúp viết mã Go hiệu quả và tránh các lỗi chia sẻ bộ nhớ ngoài ý muốn

## [Why Go Can't Try](https://niketpatel.com/essays/why-go-cant-try)

Bài viết lý giải tại sao Go không thể thêm từ khóa `try` hay cơ chế xử lý lỗi tương tự — không phải vì các nhà thiết kế thích viết nhiều mã lặp lại, mà vì đây là sự bất tương thích kiến trúc sâu xa. Gốc rễ của vấn đề nằm ở định nghĩa kiểu `error` trong Go: chỉ là một interface tối giản với phương thức `Error() string`, cho phép bất kỳ kiểu nào triển khai và không có thông tin gì để trình biên dịch kiểm tra tính đầy đủ.

Để so sánh, Zig sử dụng tập hợp lỗi có kiểu tường minh, được trình biên dịch theo dõi và bắt buộc xử lý đầy đủ — nhưng đổi lại, lỗi không thể mang thêm dữ liệu ngữ cảnh. Go chọn hướng ngược lại: cho phép bọc lỗi phong phú qua `fmt.Errorf("%w", err)` nhưng mất đi sự đảm bảo tại thời điểm biên dịch. Việc thay đổi kiểu `error` bây giờ đồng nghĩa với việc viết lại toàn bộ thư viện chuẩn và phá vỡ hàng triệu chương trình Go hiện có — một khoản nợ kiến trúc không thể hoàn trả dần dần.

**Điểm chính:**
- `if err != nil` tồn tại vì hệ thống lỗi của Go không thể thay thế, không phải vì sở thích
- Kiểu `error` của Go là interface tối giản — trình biên dịch không biết gì về các lỗi có thể xảy ra
- Zig kiểm tra lỗi đầy đủ tại thời điểm biên dịch, nhưng lỗi không thể mang dữ liệu ngữ cảnh
- Go cho phép bọc lỗi phong phú nhưng không có bảo đảm tại thời điểm biên dịch
- Thay đổi kiến trúc lỗi của Go sẽ phá vỡ toàn bộ hệ sinh thái hiện có

## [The Scheduler — Understanding the Go Runtime](https://internals-for-interns.com/posts/go-runtime-scheduler)

Bài viết giải thích cách bộ lập lịch của Go runtime quyết định goroutine nào sẽ chạy tiếp theo — cơ chế cốt lõi cho phép Go chạy hàng triệu goroutine nhẹ trên chỉ một vài luồng hệ điều hành. Trung tâm của thiết kế là mô hình **GMP**: **G** (Goroutine) là đơn vị thực thi nhẹ bắt đầu với stack chỉ 2KB; **M** (Machine) là luồng hệ điều hành thực sự; và **P** (Processor) là ngữ cảnh lập lịch giữ hàng đợi goroutine cục bộ, số lượng bằng `GOMAXPROCS`. Mỗi P có hàng đợi riêng giúp giảm tranh chấp khóa so với một hàng đợi toàn cục.

Thuật toán `findRunnable()` tìm goroutine theo thứ tự ưu tiên: công việc GC, kiểm tra công bằng toàn cục (cứ 61 lần lập lịch lại lấy từ hàng đợi toàn cục một lần), hàng đợi cục bộ của P, rồi đến đánh cắp công việc từ P khác nếu không còn gì. Điểm nổi bật của thiết kế là kiến trúc "tự phục vụ": goroutine tự quản lý trạng thái của mình, tự tạm dừng khi chờ, không có luồng lập lịch trung tâm nào điều phối tất cả. Nhờ đó, chuyển đổi ngữ cảnh giữa các goroutine chỉ tốn 50–100 nanosecond, nhanh hơn 10–40 lần so với chuyển đổi luồng hệ điều hành.

**Điểm chính:**
- Mô hình GMP: Goroutine (G), luồng hệ điều hành (M), ngữ cảnh lập lịch (P)
- Số lượng P bằng `GOMAXPROCS`, mỗi P có hàng đợi cục bộ giảm tranh chấp khóa
- `findRunnable()` tìm goroutine theo thứ tự ưu tiên, có cơ chế đánh cắp công việc giữa các P
- Goroutine tự tạm dừng và tiếp tục — không có luồng lập lịch trung tâm
- Chuyển đổi ngữ cảnh goroutine chỉ 50–100ns, nhanh hơn 10–40x so với luồng hệ điều hành

## [Go String Concatenation Performance Benchmark](https://www.winterjung.dev/en/string-concat-performance-benchmark-in-go/)

Bài viết so sánh hiệu năng của 15 phương pháp nối chuỗi khác nhau trong Go qua hai kịch bản thực tế: nối số lượng chuỗi cố định (như tạo cache key) và nối số lượng chuỗi biến đổi (như ghép điều kiện truy vấn). Kết quả cho thấy sự chênh lệch rất lớn giữa các phương pháp, đặc biệt khi số lượng chuỗi tăng cao.

Với kịch bản số lượng cố định, toán tử `+` đơn giản cho hiệu năng hoàn toàn chấp nhận được. Nhưng với kịch bản biến đổi (256 phần tử), `strings.Join()` và `strings.Builder` với `Grow()` cấp phát trước dung lượng vượt trội rõ rệt — chỉ khoảng 2.6–2.8 microsecond, trong khi toán tử `+=` trong vòng lặp tốn tới 37 microsecond và tiêu tốn bộ nhớ gấp nhiều lần. Nguyên nhân là mỗi lần `+=` tạo ra một chuỗi mới, dẫn đến hàng loạt cấp phát bộ nhớ không cần thiết.

**Điểm chính:**
- `strings.Builder` với `Grow()` và `strings.Join()` là hai lựa chọn nhanh nhất trong mọi kịch bản
- Toán tử `+` đủ tốt khi nối số lượng chuỗi cố định, ít
- Toán tử `+=` trong vòng lặp chậm hơn ~14x và tốn nhiều bộ nhớ hơn so với `strings.Builder`
- Cấp phát trước dung lượng bằng `Grow()` giúp tránh việc cấp phát lại bộ nhớ nhiều lần
- Chọn đúng phương pháp nối chuỗi có thể tạo ra sự khác biệt lớn về hiệu năng ở quy mô lớn

## [Message Passing Is Shared Mutable State](https://causality.blog/essays/message-passing-is-shared-mutable-state/)

Bài luận đưa ra một lập luận gây tranh cãi: mô hình lập trình đồng thời dùng truyền thông điệp (message passing) — như channel trong Go hay actor trong Erlang — không thực sự giải quyết các vấn đề của bộ nhớ chia sẻ có thể thay đổi (shared mutable state), mà chỉ đơn giản là di chuyển chúng sang tên gọi khác. Channel trong Go về bản chất là một hàng đợi chia sẻ — bất kỳ goroutine nào cũng có thể gửi hoặc nhận — tức là vẫn là trạng thái có thể thay đổi được chia sẻ giữa các luồng thực thi.

Tác giả dẫn chứng nghiên cứu năm 2019 phân tích 171 lỗi đồng thời trong các dự án Go thực tế, trong đó khoảng 58% lỗi blocking xuất phát từ message passing, không phải bộ nhớ chia sẻ. Triết lý "share memory by communicating" của Go hóa ra không loại bỏ được deadlock, goroutine leak hay race condition — những loại lỗi này vẫn xảy ra, chỉ qua kênh channel thay vì mutex. Ngay cả Erlang, với cơ chế cô lập actor mạnh hơn nhiều, cũng bị phát hiện có race condition trong thư viện chuẩn liên quan đến bảng ETS — vốn là bộ nhớ chia sẻ được thêm vào để giải quyết các hạn chế thực tiễn.

**Điểm chính:**
- Channel trong Go là hàng đợi chia sẻ — về cấu trúc vẫn là shared mutable state
- 58% lỗi blocking trong Go thực tế đến từ message passing, không phải bộ nhớ chia sẻ
- Deadlock, goroutine leak, race condition vẫn xảy ra — chỉ qua channel thay vì mutex
- Tranh luận "shared memory vs. message passing" là một lưỡng phân giả — cả hai có cùng lỗ hổng cấu trúc
- Ngay cả Erlang cũng phải dùng bộ nhớ chia sẻ (ETS) để xử lý các bài toán thực tiễn

## [Things I've Done with AI](https://sjer.red/blog/2026/built-with-ai/)

Bài viết của một lập trình viên 14 năm kinh nghiệm chia sẻ hành trình từ hoài nghi đến trở thành người dùng AI tích cực. Từ tháng 10/2025, tác giả chuyển hẳn sang mô hình viết prompt và kiểm tra kết quả thay vì tự viết mã — và trong 9 tháng đã hoàn thành hơn 15 dự án cá nhân bằng Cursor và Claude Code, một con số mà trước đây gần như không thể.

Điều thú vị là tác giả không ca ngợi AI một cách mù quáng, mà nhấn mạnh rằng để dùng AI hiệu quả cần thay đổi tư duy: không còn ưu tiên mã nguồn "đẹp" hay kiến trúc hoàn hảo, mà tập trung vào giá trị thực tế cho người dùng. Mã do AI tạo ra không cần đáp ứng tiêu chuẩn bảo trì truyền thống nếu có đủ kiểm thử — vì bản thân AI cũng có thể điều hướng trong mã nguồn không hoàn hảo. Tại nơi làm việc, các yêu cầu nhỏ từ quản lý sản phẩm giờ "gần như miễn phí" để thực hiện; điểm nghẽn còn lại chỉ là kiểm tra và kiểm thử.

**Điểm chính:**
- Dùng AI hiệu quả đòi hỏi thay đổi tư duy: ưu tiên giá trị kinh doanh thay vì mã nguồn hoàn hảo
- Kiểm thử và tài liệu đã trở thành điểm nghẽn chính trong quy trình phát triển hỗ trợ bởi AI
- Mã do AI tạo không cần bảo trì theo kiểu truyền thống nếu có độ phủ kiểm thử tốt
- Tập trung công việc chuyển sang thiết kế và tài liệu — thay vì triển khai chi tiết
- Tốc độ xây dựng sản phẩm tăng đáng kể khi chấp nhận sự đánh đổi về chất lượng mã nguồn

## [Pushing and Pulling: Three Reactivity Algorithms](https://jonathan-frere.com/posts/reactivity-algorithms/)

Bài viết phân tích ba thuật toán xây dựng hệ thống reactive — loại hệ thống tự động cập nhật khi dữ liệu thay đổi, như bảng tính nơi một ô thay đổi kéo theo hàng loạt ô phụ thuộc tính toán lại. Tác giả đánh giá các phương pháp qua bốn tiêu chí: hiệu quả tính toán, cập nhật chi tiết (chỉ tính lại những gì thực sự thay đổi), không có trạng thái trung gian không nhất quán, và hỗ trợ phụ thuộc động.

**Push-based**: khi dữ liệu đầu vào thay đổi, nó ngay lập tức thông báo cho tất cả các node phụ thuộc — cập nhật chi tiết nhưng có thể tính toán lại một node nhiều lần nếu nó có nhiều nguồn phụ thuộc. **Pull-based**: các node chủ động lấy giá trị từ phụ thuộc khi cần — tự nhiên không có trạng thái trung gian nhưng dễ tính toán dư thừa. **Push-pull** kết hợp cả hai: pha push đánh dấu các node bị ảnh hưởng là "dirty", pha pull chỉ tính toán lại những node đó — đạt độ phức tạp O(n) với mỗi node chỉ được xử lý đúng một lần, đáp ứng cả bốn tiêu chí.

**Điểm chính:**
- Ba phương pháp reactive: push-based, pull-based, và push-pull kết hợp
- Push-based cập nhật chi tiết nhưng có thể tính toán lại node nhiều lần
- Pull-based tránh trạng thái trung gian nhưng dễ tính toán dư thừa
- Push-pull đánh dấu "dirty" rồi tính toán theo yêu cầu — O(n), mỗi node xử lý đúng một lần
- Push-pull là lựa chọn tối ưu cho phát triển web, cân bằng giữa hiệu năng và sự đơn giản

### Bonus

**Images:**
![Git Workflow: Essential Commands](https://substackcdn.com/image/fetch/$s_!Fevp!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Feb1ae3fa-80a7-464d-97a2-869170caaa2f_2360x2960.png)
![How can Cache Systems go wrong?](https://substackcdn.com/image/fetch/$s_!huHJ!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F9262eb79-a1cc-4308-8f72-01fdf91e429d_1388x1782.jpeg)
![Top Cyber Attacks Explained](https://substackcdn.com/image/fetch/$s_!7p1w!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd5ebb98a-9f98-4c32-9268-2d14086569d8_2360x2960.png)

---

*Bài viết đã được review và cập nhật bởi Claude Code với Opus 4.7 (1M context).*
