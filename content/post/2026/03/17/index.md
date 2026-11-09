---
title: "Newsletter #91"
date: 2026-03-17
tags: ["AI-Assisted", "Newsletter", "Go", "Performance", "Concurrency", "AI Coding", "Algorithms"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #91.*

## [How Go Slices Work Under the Hood: What Makes Them Stand Out from Other Languages](https://dev.to/ganesh-kumar/how-go-slices-work-under-the-hood-what-makes-them-stand-out-from-other-languages-42o4)

Slice là một trong những cấu trúc dữ liệu được dùng nhiều nhất trong Go. Bề ngoài nó trông giống một mảng động đơn giản, nhưng bên trong mỗi slice chỉ gồm ba thành phần: con trỏ trỏ tới mảng nền, độ dài (`len`) và dung lượng (`cap`). Khi cắt slice bằng cú pháp `[start:end]`, Go không sao chép dữ liệu mà chỉ tạo một slice mới trỏ vào cùng mảng nền, nên thao tác này rất rẻ. Tác giả minh họa bằng ví dụ in ra `len` và `cap` sau mỗi lần cắt, đồng thời giải thích vì sao một slice khai báo bằng `var s []int` có giá trị `nil` với `len` và `cap` đều bằng 0.

Phần đáng chú ý nhất là thuật toán mở rộng của hàm `append`, được phân tích trực tiếp từ mã nguồn `runtime/slice.go`. Trong triển khai runtime được phân tích, khi cần thêm dung lượng Go cấp phát mảng mới: nếu dung lượng hiện tại dưới 256 phần tử thì tăng gấp đôi, còn từ 256 trở lên thì hệ số tăng giảm dần từ 2 xuống khoảng 1,25 lần (trước Go 1.18, ngưỡng này là 1024). Với thao tác thêm nhiều phần tử cùng lúc vượt quá gấp đôi dung lượng cũ, Go nhảy thẳng tới dung lượng cần thiết rồi làm tròn lên theo lớp kích thước bộ nhớ. Vì cấp phát lại rất tốn kém, lời khuyên thực tế cho lập trình viên là dùng `make([]T, len, cap)` để khởi tạo sẵn dung lượng khi đã biết trước kích thước cần dùng.

## [Why Go Can't Try](https://niketpatel.com/essays/why-go-cant-try)

Niket Patel so sánh cách Go truyền lỗi qua interface `error` với tập lỗi của Zig. Go không theo dõi một tập lỗi đóng cho từng hàm, còn Zig có thể biểu diễn tập lỗi trong kiểu trả về và yêu cầu xử lý hoặc truyền tiếp. Tuy nhiên, Zig cũng có `anyerror`; không phải mọi hàm đều công bố một tập lỗi hẹp.

Bài cho rằng thêm cú pháp ngắn không tự đem lại khả năng kiểm tra đầy đủ như tập lỗi có kiểu. Điều đó khác với kết luận Go không thể có `try`: đề xuất Go năm 2019 từng mô tả cơ chế trả về sớm với `error` hiện có. Việc không chấp nhận đề xuất là quyết định thiết kế, không phải chứng minh bất khả thi. Nên đọc bài như lập luận về đánh đổi giữa cú pháp, kiểu lỗi và ngữ cảnh, thay vì dự báo chắc chắn về tương lai ngôn ngữ.

## [The Scheduler — Understanding the Go Runtime](https://internals-for-interns.com/posts/go-runtime-scheduler)

Bài viết giải thích bộ lập lịch của Go runtime — thành phần trả lời câu hỏi "goroutine nào chạy tiếp theo?" và cho phép hàng triệu goroutine chạy trên vài luồng hệ điều hành. Nền tảng là mô hình GMP: G là goroutine, khởi đầu với stack chỉ 2KB (so với 1–8MB của một luồng hệ điều hành); M là luồng hệ điều hành thực sự thực thi mã; P là ngữ cảnh lập lịch, mang hàng đợi cục bộ tối đa 256 goroutine, số lượng bằng `GOMAXPROCS`. Việc tách P khỏi M giúp khi một luồng bị chặn trong lời gọi hệ thống, P có thể được chuyển sang luồng khác để các goroutine còn lại tiếp tục chạy. Một điểm thú vị là không có luồng lập lịch trung tâm nào: goroutine tự tạm dừng, tự vào hàng đợi chờ của channel và tự dọn dẹp khi kết thúc để được tái sử dụng.

Hàm `findRunnable()` tìm việc theo thứ tự: công việc của GC, cứ lần lập lịch thứ 61 thì lấy một goroutine từ hàng đợi toàn cục để tránh bỏ đói, rồi hàng đợi cục bộ, hàng đợi toàn cục, bộ thăm dò mạng, và cuối cùng là lấy một nửa công việc từ P khác (work stealing). Luồng hết việc sẽ "quay vòng" tìm việc một lúc trước khi ngủ, với số luồng quay vòng bị giới hạn. Bài cũng đề cập cơ chế tạm dừng cưỡng bức (hợp tác qua đoạn kiểm tra đầu hàm và bất đồng bộ qua tín hiệu `SIGURG`). Bài nêu ước lượng chuyển goroutine 50–100 nano giây; chi phí thực tế tùy nền tảng và tải, không phải bảo đảm runtime.

## [Go String Concatenation Performance Benchmark](https://www.winterjung.dev/en/string-concat-performance-benchmark-in-go/)

Tác giả so sánh hiệu năng và mức dùng bộ nhớ của các cách nối chuỗi trong Go, gồm toán tử `+`, `+=`, `fmt.Sprintf()`, `fmt.Sprint()`, `strings.Join()`, `bytes.Buffer` và `strings.Builder` (có và không gọi `Grow()` để cấp phát trước). Bài đo được chia thành hai kịch bản thường gặp: số lượng chuỗi cố định, như khi tạo khóa bộ nhớ đệm từ vài trường dữ liệu, và số lượng chuỗi thay đổi, như khi ghép các điều kiện truy vấn. Toàn bộ mã nguồn và mã đo đạc được công bố để người đọc tự tái hiện kết quả.

Kết luận khá rõ ràng: `strings.Builder` có gọi `Grow()` và `strings.Join()` dẫn đầu nhiều phép đo của bài; kết quả không áp dụng mặc định cho mọi chương trình. Với số lượng chuỗi cố định và ít, toán tử `+` đơn giản là hoàn toàn đủ tốt, còn `fmt.Sprintf()` chậm hơn đáng kể. Ở kịch bản 256 chuỗi, hai phương pháp dẫn đầu chỉ mất khoảng 2,6–2,8 micro giây với một lần cấp phát, trong khi dùng `+=` trong vòng lặp mất hơn 37 micro giây, tốn khoảng 185KB bộ nhớ và 255 lần cấp phát, vì mỗi lần nối lại tạo ra một chuỗi mới. Bài học cho lập trình viên trẻ: nối chuỗi trong vòng lặp nên dùng `strings.Builder` hoặc `strings.Join()`.

## [Message Passing Is Shared Mutable State](https://causality.blog/essays/message-passing-is-shared-mutable-state/)

Bài luận cho rằng truyền thông điệp (message passing) không loại bỏ trạng thái chia sẻ có thể thay đổi, mà chỉ chuyển nó sang chỗ khác. Ngay từ năm 2006, Edward Lee đã dự đoán cuộc tranh luận "bộ nhớ chia sẻ hay truyền thông điệp" là một lựa chọn giả, vì đổi cơ chế điều phối từ khóa sang thông điệp chỉ đổi hình thức của lỗi. Go, với triết lý "chia sẻ bộ nhớ bằng cách giao tiếp", trở thành thí nghiệm thực tế lớn nhất: nghiên cứu năm 2019 trên 171 lỗi đồng thời trong Docker, Kubernetes, etcd, gRPC và CockroachDB cho thấy khoảng 58% lỗi chặn (goroutine bị treo) đến từ truyền thông điệp. Bộ phát hiện deadlock tích hợp của Go chỉ bắt được 2 trên 21 lỗi chặn được thử nghiệm.

Theo tác giả, channel trong Go thực chất là một hàng đợi đồng thời dùng chung, không có hai đầu gửi và nhận tách biệt, nên mọi lỗi kinh điển của trạng thái chia sẻ đều có phiên bản tương ứng: deadlock, rò rỉ goroutine, tranh chấp khi nhiều goroutine cùng đọc, và vi phạm giao thức như gửi vào channel đã đóng. Ví dụ tiêu biểu là một lỗi trong Kubernetes: goroutine con bị treo mãi vì không ai đọc channel sau khi hết thời gian chờ, và cách sửa chỉ là thêm bộ đệm một phần tử. Ngay cả Erlang, với các tiến trình cô lập hoàn toàn, cũng bị phát hiện có tranh chấp quanh bảng ETS — vốn là bộ nhớ chia sẻ được thêm vào vì lý do hiệu năng.

## [Things I've Done with AI](https://sjer.red/blog/2026/built-with-ai/)

Tác giả, với khoảng bảy năm kinh nghiệm chuyên nghiệp cộng thêm bảy năm tự học, kể lại hành trình từ hoài nghi đến chấp nhận AI trong lập trình. Từng né tránh GitHub Copilot và coi Cursor là thổi phồng, anh vốn rất coi trọng kiến trúc, hệ thống kiểu và khả năng bảo trì. Bước ngoặt đến khi anh tự hỏi vì sao lại cần những thứ đó: trong công việc, điều quan trọng là mang lại giá trị cho doanh nghiệp, còn mã nguồn không cần "đẹp" theo nghĩa truyền thống nếu có đủ kiểm thử để AI tự xử lý. Từ tháng 10/2025, anh không còn tự viết mã mà chỉ viết prompt và xem xét kết quả.

Trong giai đoạn dùng Cursor và Claude Code, anh đã hoàn thành hơn chục dự án cá nhân: gom mọi dự án vào một monorepo, chuyển hệ thống CI sang Buildkite và Bazel, viết Clauderon — công cụ điều phối nhiều tác tử lập trình, cùng các bot Discord và ứng dụng di động. Ở nơi làm việc, AI giúp viết tài liệu thiết kế, công cụ điều tra và tự động hóa vận hành; các yêu cầu nhỏ từ quản lý sản phẩm giờ gần như miễn phí, phần việc còn lại chỉ là xem xét mã và kiểm thử thủ công. Tuy vậy, anh thừa nhận việc này khá mệt mỏi, và kiểm thử cùng tài liệu đã trở thành điểm nghẽn mới, nên ngành cần đầu tư nhiều hơn vào công cụ kiểm thử.

## [Pushing and Pulling: Three Reactivity Algorithms](https://jonathan-frere.com/posts/reactivity-algorithms/)

Bài viết so sánh ba thuật toán xây dựng hệ thống reactive — loại hệ thống tự cập nhật khi dữ liệu thay đổi, dễ hình dung nhất qua bảng tính: sửa một ô thì mọi ô phụ thuộc phải tính lại. Tác giả đặt ra bốn tiêu chí: hiệu quả (mỗi ô tính lại tối đa một lần), chi tiết (chỉ cập nhật ô thực sự bị ảnh hưởng), không có trạng thái trung gian lệch nhau (glitchless) và hỗ trợ phụ thuộc động. Cách đẩy (push) cho phép mỗi nút thông báo cho các nút phụ thuộc, nên rất chi tiết, nhưng một nút có thể bị tính lại nhiều lần và dễ lộ trạng thái trung gian trừ khi sắp xếp tô-pô toàn bộ đồ thị. Cách kéo (pull) giống một chuỗi lời gọi hàm lồng nhau: dễ đạt glitchless và có phụ thuộc động miễn phí, nhưng không biết nút nào thay đổi nên phải tính lại nhiều hoặc dựa vào bộ nhớ đệm khó vô hiệu hóa.

Cách kết hợp đẩy–kéo giải quyết cả hai: pha đẩy chỉ đánh dấu các nút bị ảnh hưởng là "dirty" và ghi lại danh sách nút đầu ra cần cập nhật, không phụ thuộc thứ tự duyệt; pha kéo sau đó chỉ tính lại những nút dirty rồi đánh dấu sạch. Mỗi nút được thăm tối đa một lần ở mỗi pha, bài mô tả chi phí tuyến tính theo nút cập nhật; thực tế còn cần tính cạnh phụ thuộc và công việc của mỗi nút, và đáp ứng cả bốn tiêu chí. Hạn chế là toàn bộ pha kéo phải hoàn tất giữa hai lần thay đổi đầu vào, nên các tác vụ chạy lâu cần được xử lý riêng.

### Bonus

**Images:**
![Git Workflow: Essential Commands](https://substackcdn.com/image/fetch/$s_!Fevp!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Feb1ae3fa-80a7-464d-97a2-869170caaa2f_2360x2960.png)
![How can Cache Systems go wrong?](https://substackcdn.com/image/fetch/$s_!huHJ!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F9262eb79-a1cc-4308-8f72-01fdf91e429d_1388x1782.jpeg)
![Top Cyber Attacks Explained](https://substackcdn.com/image/fetch/$s_!7p1w!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd5ebb98a-9f98-4c32-9268-2d14086569d8_2360x2960.png)

---

*Bài viết đã được viết lại bởi Claude Code với Opus 5.5 vào ngày 27/09/2026; được review và chỉnh sửa bởi Codex với GPT 6.1 Sol vào ngày 09/11/2026.*
