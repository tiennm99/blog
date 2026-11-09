---
title: "Newsletter #130"
date: 2026-09-08
tags: ["AI-Assisted", "Redis", "Linux Kernel", "Performance", "System Design", "Data Structures", "Distributed Systems"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #130.*

## [How Anthropic runs large-scale code migrations with Claude Code](https://claude.com/blog/ai-code-migration)

Anthropic mô tả cách dùng tác nhân AI chuyển mã nguồn quy mô lớn trong bài tháng 7/2026. Với Bun, hãng báo cáo tạo khoảng một triệu dòng Rust trong chưa đầy hai tuần, vượt qua bộ kiểm thử hiện có trước khi hợp nhất. Tuy nhiên, vẫn có lỗi hồi quy xuất hiện sau đó: kiểm thử đạt không đồng nghĩa mọi hành vi đã tương đương. Đây là kết quả của các dự án cụ thể, không phải cam kết thời gian hay chi phí cho mọi cuộc chuyển đổi.

Quy trình bắt đầu bằng quy tắc dịch và bản đồ phụ thuộc, thử trên nhóm tệp nhỏ rồi mới mở rộng. Sau đó là các vòng biên dịch, sửa lỗi, kiểm thử lúc chạy và đối chiếu với chương trình gốc. Nếu lỗi lặp lại, nhóm sửa quy tắc và quy trình sinh mã thay vì chỉ vá từng tệp. Muốn áp dụng, cần tiêu chí kiểm chứng khách quan, hàng đợi có thể tiếp tục và người chịu trách nhiệm xác nhận kết quả.

## [The VFS](https://internals-for-interns.com/posts/linux-kernel-vfs/)

VFS là lớp giao diện chung giữa lời gọi hệ thống và các hệ thống tệp của Linux. Bài viết giới thiệu bốn đối tượng: superblock biểu diễn một hệ thống tệp, inode giữ thông tin đối tượng, dentry gắn tên với đối tượng, còn `struct file` biểu diễn một lần mở và trạng thái như vị trí đọc. File descriptor là chỉ số để tiến trình tra tới đối tượng mở; các bản sao descriptor có thể cùng trỏ vào một `struct file`, nên không phải mỗi descriptor đều có vị trí riêng.

Các bảng con trỏ hàm cho phép từng hệ thống tệp cung cấp hành vi tương ứng. VFS chia sẻ cơ chế phân giải đường dẫn và bộ nhớ đệm; một số thao tác có hỗ trợ mặc định, nhưng không phải mục chưa cài đặt nào cũng tự có hành vi hợp lệ. Dcache có thể nhớ cả tên không tồn tại, còn page cache giảm truy cập thiết bị với việc đọc tệp thông thường. Những tối ưu này phụ thuộc loại hệ thống tệp và trạng thái bộ đệm, không có nghĩa mọi thao tác đều không khóa hoặc không chạm đĩa.

## [Text Editor Data Structures](https://cdacamar.github.io/data%20structures/algorithms/benchmarking/text%20editors/c++/editor-data-structures/)

Khi tự viết một trình soạn thảo văn bản, câu hỏi đầu tiên là lưu nội dung tệp trong bộ nhớ ra sao. Cameron DaCamara bắt đầu bằng việc liệt kê ràng buộc: chèn và xóa hiệu quả, undo/redo nhanh, hỗ trợ UTF-8 và chỉnh sửa nhiều con trỏ cùng lúc. Từ đó ông lần lượt loại các phương án. Một chuỗi lớn duy nhất thì gọn và dễ hiển thị, nhưng chậm với tệp trên 1MB, việc cấp phát lại có thể biến thao tác O(n) thành O(n²), và undo/redo rất tốn bộ nhớ. Gap buffer mà Emacs dùng thì đơn giản nhưng không hợp với nhiều con trỏ. Rope cho thao tác O(lg n) nhưng cơ chế sao chép khi ghi làm bộ nhớ phình to. Piece table truyền thống, từng dùng trong Microsoft Word, lại gặp nút thắt ở mảng liên tục trong các phiên làm việc dài. Piece tree của VSCode kết hợp ưu điểm của rope và piece table nhờ cây đỏ-đen.

Tác giả chọn hướng đó nhưng làm thành piece tree bất biến, gọi là fredbuf. Cây đỏ-đen thuần hàm không cần con trỏ cha và cho phép chụp lại trạng thái bất cứ lúc nào, nên undo/redo chỉ còn là hai danh sách liên kết lưu các ảnh chụp cây. Việc xử lý CRLF được tách ra ngoài cây, và một lớp TreeWalker giúp duyệt ký tự và kiểm tra tính đúng đắn. Hai bài học rút ra: phân tích ràng buộc từ đầu giúp tránh công sức thừa, và công cụ gỡ lỗi như trực quan hóa cây là thứ giúp dự án về đích, nhất là với phép xóa trên cây đỏ-đen bất biến vốn rất khó. Thư viện dùng giấy phép MIT, chỉ cần C++20.

## [Scaling to 1 million concurrent sandboxes in seconds](https://modal.com/blog/scaling-to-1-million-concurrent-sandboxes-in-seconds)

Modal báo cáo thử nghiệm tạo một triệu môi trường cô lập trong chưa đầy một phút trên nền tảng mới. Đây là kết quả trình diễn của hãng trong điều kiện cụ thể, không phải bảo đảm mọi khách hàng hay mọi loại tải đều đạt tốc độ ấy. Kiến trúc cũ đã lập lịch song song nhưng vẫn cần điều phối trung tâm và ghi Postgres trên đường tạo môi trường, dẫn tới nút thắt khi quy mô tăng.

Thiết kế mới phân tán quyết định lập lịch, để máy thực thi quản lý trạng thái cục bộ, công bố thông tin phục vụ điều phối và gộp các lời gọi theo lô. Nhóm loại Postgres khỏi đường xử lý tạo môi trường thay vì coi mọi quyết định đều cần cùng một nguồn trạng thái trung tâm. Quá trình viết lại còn phải giải quyết giám sát, vòng đời container và tranh chấp khóa trong nhân Linux. Bài học là tăng quy mô đòi hỏi xem lại toàn bộ đường điều khiển, không chỉ thêm máy cho bộ lập lịch.

## [Making 768 servers look like 1](https://planetscale.com/blog/making-768-servers-look-like-1)

PlanetScale giải thích cách chia mảnh phân tán dữ liệu và tải ghi khi một máy chính cùng các bản sao đọc không còn đáp ứng nhu cầu. Trong ví dụ khoảng một petabyte, 256 mảnh, mỗi mảnh gồm một máy chính và hai bản sao, tạo thành 768 máy. Đây là cấu hình minh họa, không phải ngưỡng bắt buộc cho mọi cơ sở dữ liệu.

Một tầng định tuyến đứng giữa ứng dụng và các mảnh: Vitess cho MySQL, Neki cho Postgres. Nó hiểu cách phân bố dữ liệu, chọn nơi thực thi và kết hợp kết quả, thay vì chỉ gộp kết nối như PgBouncer. Nhờ đó ứng dụng có thể dùng một địa chỉ kết nối. Tuy nhiên, một địa chỉ không xóa hết khác biệt của hệ thống phân tán: thiết kế khóa chia mảnh và các thao tác liên mảnh vẫn cần được cân nhắc. WAL là một giới hạn có thể gặp trên máy chính, không phải lời giải thích duy nhất cho mọi nút thắt ghi.

## [Branch‑Avoidant Programming](https://easylang.online/blog/branchless)

CPU hiện đại đoán trước nhánh nào sẽ được chọn để giữ đường ống lệnh luôn đầy; khi đoán sai, nó phải xả đường ống và làm lại, cái giá không hề nhỏ. Bài viết minh họa bằng bài toán lọc những số nhỏ hơn 500 từ một mảng ngẫu nhiên — trường hợp bộ dự đoán nhánh gần như không thể đoán đúng. Mẹo là bỏ câu lệnh `if`: luôn ghi giá trị vào mảng đích, rồi chỉ tăng chỉ số khi điều kiện đúng bằng `smlen += (numbers[i] < 500);`. Có ghi thừa, nhưng rẻ hơn nhiều so với đoán sai nhánh. Với 100.000 số lặp 1.000 lần, trên Apple M1 bản dùng `if` mất 0,345 giây còn bản không nhánh chỉ 0,036 giây, nhanh gần 10 lần; trên Intel Xeon là 0,576 so với 0,110 giây. Mã máy cho thấy lý do: lệnh nhảy `b.gt` (ARM) hay `jg` (x86) được thay bằng lệnh có điều kiện `cinc` hay `setle`, giữ luồng điều khiển thẳng tắp.

Trình biên dịch không tự làm điều này vì không biết đặc điểm dữ liệu của bạn, và cũng không thể giả định rằng một phép ghi vốn nằm trong điều kiện là an toàn khi thực hiện vô điều kiện. Vì vậy lập trình viên phải chủ động áp dụng. Tác giả gợi ý quicksort là ứng viên rất phù hợp, vì bước phân hoạch về bản chất là di chuyển dữ liệu có điều kiện quanh phần tử chốt.

## [Your Redis Leaderboard Is Probably Breaking Ties Wrong](https://dev.to/trungdlp/your-redis-leaderboard-is-probably-breaking-ties-wrong-39k4)

Bảng xếp hạng dùng sorted set của Redis là bài toán quen thuộc, nhưng ít ai để ý trường hợp hai người chơi bằng điểm. Khi đó Redis xếp theo thứ tự từ điển của tên thành viên, tức ID người chơi quyết định ai đứng trên — thứ tự luôn xác định nhưng chẳng có ý nghĩa gì với người chơi. Các cách sửa nhanh đều có vấn đề: dấu thời gian bị trùng trong cùng mili-giây và lệch đồng hồ giữa các máy, còn nhồi hai giá trị vào một số thực kiểu double lại thu hẹp khoảng giá trị an toàn của cả hai.

Podium, một dịch vụ bảng xếp hạng mã nguồn mở, chọn luật rõ ràng: bằng điểm thì ai đạt mức điểm đó trước xếp trên. Mỗi bảng xếp hạng có một bộ đếm khởi tạo bằng giá trị lớn nhất của số nguyên có dấu 64-bit; khi người chơi đạt điểm mới, một script Lua giảm bộ đếm và ghép 19 chữ số đó vào trước ID công khai, nên người đến trước có tiền tố lớn hơn và đứng trên. Script cập nhật nguyên tử cả bốn phần trạng thái: sorted set giảm dần, sorted set tăng dần (các chữ số được đảo để người đến trước vẫn đứng đầu), hash ánh xạ ID sang tên nội bộ và bộ đếm. Nếu điểm gửi lên trùng điểm hiện tại, tên nội bộ được giữ nguyên, nên việc gửi lại có tính lũy đẳng. Cái giá là độ trễ tăng khoảng 11–17% cho thao tác ghi và mỗi thành viên tốn 287 byte thay vì 99 byte theo đo đạc cục bộ — đánh đổi để có một luật xếp hạng ổn định mà người chơi hiểu được.

---

*Bài viết đã được viết lại bởi Claude Code với Opus 5.5 vào ngày 27/09/2026; được review và chỉnh sửa bởi Codex với GPT 6.1 Sol vào ngày 09/11/2026.*
