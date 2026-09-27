---
title: "Newsletter #130"
date: 2026-09-08
tags: ["AI-Assisted", "Redis", "Linux Kernel", "Performance", "System Design", "Data Structures", "Distributed Systems"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #130.*

## [How Anthropic runs large-scale code migrations with Claude Code](https://claude.com/blog/ai-code-migration)

Chuyển một dự án lớn sang ngôn ngữ khác từng là việc kéo dài nhiều năm, nên thường chỉ được làm khi không còn lựa chọn nào khác. Anthropic cho thấy bài toán này đã đổi khác: Bun chuyển một triệu dòng mã nguồn từ Zig sang Rust trong chưa đầy hai tuần, tiêu tốn khoảng 5,9 tỷ token đầu vào và 690 triệu token đầu ra (tương đương 165.000 đô theo giá API). Đổi lại, toàn bộ bộ kiểm thử hiện có đều vượt qua trước khi hợp nhất, tệp nhị phân nhỏ hơn 19%, hiệu năng tăng 2–5%, và một phép đo bộ nhớ giảm từ 6.745MB xuống 609MB. Một ví dụ khác là 165.000 dòng Python được chuyển sang TypeScript chỉ trong một cuối tuần.

Quy trình gồm sáu bước: viết bộ quy tắc dịch kèm bản đồ phụ thuộc, thử quy tắc trên nhóm tệp mẫu, dịch toàn bộ bằng các agent chạy song song, chạy vòng lặp biên dịch với agent sửa lỗi và agent phản biện, kiểm thử nhanh để bắt lỗi lúc chạy, rồi đối chiếu hành vi với mã gốc. Bài học cốt lõi là không sửa mã nguồn mà sửa vòng lặp sinh ra nó: lỗi lặp lại thì cập nhật bộ quy tắc rồi sinh lại, thay vì vá tay từng tệp. Muốn vậy cần có trước một "trọng tài" khách quan như trình biên dịch hay bộ kiểm thử, và hàng đợi công việc có thể tiếp tục lại được. Chi phí cũng nên phân bổ có chủ đích: mô hình nhỏ như Sonnet dịch số lượng lớn, mô hình lớn như Fable hay Opus viết quy tắc và rà soát.

## [The VFS](https://internals-for-interns.com/posts/linux-kernel-vfs/)

Bạn đọc một tệp trên ext4, một tệp trong `/proc` chỉ tồn tại trong bộ nhớ nhân, hay một tệp nằm trên máy khác qua NFS — tất cả đều dùng chung những lời gọi hệ thống và cùng ngữ nghĩa file descriptor. Lớp làm nên điều đó là VFS (Virtual File System), nằm giữa tầng syscall và các hệ thống tệp thật. Bài viết giải thích VFS như một ứng dụng của nguyên tắc "lập trình theo giao diện, không theo hiện thực", mà trong C thì giao diện chỉ là struct chứa con trỏ hàm. Có bốn đối tượng chính: superblock đại diện cho một hệ thống tệp đã gắn kết, inode là một đối tượng bên trong nó (tệp, thư mục, liên kết), dentry gắn một cái tên với inode — vì bản thân inode không biết tên của mình — và file là một lần mở cụ thể của tiến trình, giữ vị trí đọc riêng. Các bảng `super_operations`, `inode_operations` và `file_operations` chứa hành vi riêng của từng hệ thống tệp; mục nào không cài đặt thì VFS dùng hiện thực mặc định.

Phần lớn công việc thực ra do mã dùng chung của VFS đảm nhiệm. Khi phân giải một đường dẫn như `/etc/hostname`, nhân đi qua từng thành phần và chỉ gọi `lookup` của hệ thống tệp khi dcache chưa có câu trả lời. Bộ đệm này nhớ cả những tên không tồn tại (negative dentry) và được đọc mà không cần khóa nhờ RCU. Việc đọc dữ liệu cũng tương tự: hầu hết chỉ là sao chép byte từ page cache, không chạm tới đĩa. Còn file descriptor chỉ là chỉ số trong mảng `struct file *` của mỗi tiến trình.

## [Text Editor Data Structures](https://cdacamar.github.io/data%20structures/algorithms/benchmarking/text%20editors/c++/editor-data-structures/)

Khi tự viết một trình soạn thảo văn bản, câu hỏi đầu tiên là lưu nội dung tệp trong bộ nhớ ra sao. Cameron DaCamara bắt đầu bằng việc liệt kê ràng buộc: chèn và xóa hiệu quả, undo/redo nhanh, hỗ trợ UTF-8 và chỉnh sửa nhiều con trỏ cùng lúc. Từ đó ông lần lượt loại các phương án. Một chuỗi lớn duy nhất thì gọn và dễ hiển thị, nhưng chậm với tệp trên 1MB, việc cấp phát lại có thể biến thao tác O(n) thành O(n²), và undo/redo rất tốn bộ nhớ. Gap buffer mà Emacs dùng thì đơn giản nhưng không hợp với nhiều con trỏ. Rope cho thao tác O(lg n) nhưng cơ chế sao chép khi ghi làm bộ nhớ phình to. Piece table truyền thống, từng dùng trong Microsoft Word, lại gặp nút thắt ở mảng liên tục trong các phiên làm việc dài. Piece tree của VSCode kết hợp ưu điểm của rope và piece table nhờ cây đỏ-đen.

Tác giả chọn hướng đó nhưng làm thành piece tree bất biến, gọi là fredbuf. Cây đỏ-đen thuần hàm không cần con trỏ cha và cho phép chụp lại trạng thái bất cứ lúc nào, nên undo/redo chỉ còn là hai danh sách liên kết lưu các ảnh chụp cây. Việc xử lý CRLF được tách ra ngoài cây, và một lớp TreeWalker giúp duyệt ký tự và kiểm tra tính đúng đắn. Hai bài học rút ra: phân tích ràng buộc từ đầu giúp tránh công sức thừa, và công cụ gỡ lỗi như trực quan hóa cây là thứ giúp dự án về đích, nhất là với phép xóa trên cây đỏ-đen bất biến vốn rất khó. Thư viện dùng giấy phép MIT, chỉ cần C++20.

## [Scaling to 1 million concurrent sandboxes in seconds](https://modal.com/blog/scaling-to-1-million-concurrent-sandboxes-in-seconds)

Modal viết lại toàn bộ nền tảng sandbox và chứng minh kết quả bằng một con số ấn tượng: một triệu sandbox được tạo trong chưa đầy 60 giây. Hệ thống cũ, giống Kubernetes, dựa vào tính nhất quán mạnh trên toàn backend: mọi quyết định cần điều phối toàn cục, và số lần ghi cơ sở dữ liệu tăng theo số sandbox, nên không thể mở rộng theo chiều ngang khi nhu cầu lên tới hàng triệu sandbox chạy đồng thời và hàng chục nghìn sandbox được tạo mỗi giây.

Cách làm mới là phân tán hóa. Thay vì một bộ lập lịch tuần tự ở trung tâm, nhiều máy chủ lập lịch chạy song song với thuật toán cân bằng tải trên dữ liệu trong bộ nhớ. Mỗi worker trở thành nguồn sự thật của chính nó, định kỳ công bố trạng thái lên Redis thay vì ghi vào kho dữ liệu tập trung, và Postgres bị loại hẳn khỏi đường tạo sandbox. Các lời gọi RPC từng tăng theo số sandbox được gộp thành lời gọi theo lô. Nhờ vậy, mỗi lần tạo sandbox chỉ cần hai chặng mạng và một thao tác CPU, không cần điều phối trung tâm, với thời gian khởi động trung vị dưới 500 mili-giây và độ trễ lập lịch chỉ vài chục mili-giây. Công việc kéo dài nhiều tháng, bắt đầu bằng đợt làm bản mẫu dồn dập của bốn kỹ sư, sau đó hiện thực lại mọi tính năng, hệ thống giám sát và môi trường chạy container — trong quá trình đó còn phát hiện và xử lý cả tranh chấp khóa `rtnl` trong nhân Linux khi khởi tạo hàng loạt container.

## [Making 768 servers look like 1](https://planetscale.com/blog/making-768-servers-look-like-1)

Khi ứng dụng phải xử lý hàng triệu truy vấn mỗi giây trên dữ liệu cỡ petabyte, một máy chủ cơ sở dữ liệu không còn đủ. PlanetScale chỉ ra ba giới hạn của cách làm truyền thống: thao tác ghi luôn dồn về một máy vì nhật ký ghi trước (WAL) là nút thắt dù có bao nhiêu bản sao; bản sao chỉ nhân đôi dữ liệu chứ không chia nhỏ nó; và sao lưu một cơ sở dữ liệu khổng lồ có thể mất hàng giờ tới hàng ngày. Lời giải là chia mảnh (sharding) để phân tán cả dữ liệu lẫn truy vấn ra nhiều máy chủ chính. Ví dụ trong bài: một petabyte chia thành 256 mảnh, mỗi mảnh khoảng 4TB gồm một máy chính và hai bản sao, tổng cộng 768 máy chủ.

Để lập trình viên không phải gánh sự phức tạp đó, một tầng proxy làm bộ định tuyến đứng giữa ứng dụng và các mảnh — Vitess cho MySQL và Neki cho Postgres. Khác với các công cụ gộp kết nối như PgBouncer, bộ định tuyến này phải phân tích câu lệnh SQL, hiểu cách dữ liệu phân bố, lập kế hoạch gửi truy vấn tới đúng mảnh và gộp kết quả lại. Cấu trúc phân bố được khai báo bằng JSON (VSchema), chẳng hạn bảng `user` chia mảnh theo giá trị băm của cột `id`. Cuối cùng, ứng dụng chỉ kết nối tới một địa chỉ như `mydb.pscale.com`: DNS trỏ tới bộ cân bằng tải mạng, bộ này phân phối kết nối qua nhiều bộ định tuyến, và ứng dụng không hề biết phía sau có 768 máy chủ.

## [Branch‑Avoidant Programming](https://easylang.online/blog/branchless)

CPU hiện đại đoán trước nhánh nào sẽ được chọn để giữ đường ống lệnh luôn đầy; khi đoán sai, nó phải xả đường ống và làm lại, cái giá không hề nhỏ. Bài viết minh họa bằng bài toán lọc những số nhỏ hơn 500 từ một mảng ngẫu nhiên — trường hợp bộ dự đoán nhánh gần như không thể đoán đúng. Mẹo là bỏ câu lệnh `if`: luôn ghi giá trị vào mảng đích, rồi chỉ tăng chỉ số khi điều kiện đúng bằng `smlen += (numbers[i] < 500);`. Có ghi thừa, nhưng rẻ hơn nhiều so với đoán sai nhánh. Với 100.000 số lặp 1.000 lần, trên Apple M1 bản dùng `if` mất 0,345 giây còn bản không nhánh chỉ 0,036 giây, nhanh gần 10 lần; trên Intel Xeon là 0,576 so với 0,110 giây. Mã máy cho thấy lý do: lệnh nhảy `b.gt` (ARM) hay `jg` (x86) được thay bằng lệnh có điều kiện `cinc` hay `setle`, giữ luồng điều khiển thẳng tắp.

Trình biên dịch không tự làm điều này vì không biết đặc điểm dữ liệu của bạn, và cũng không thể giả định rằng một phép ghi vốn nằm trong điều kiện là an toàn khi thực hiện vô điều kiện. Vì vậy lập trình viên phải chủ động áp dụng. Tác giả gợi ý quicksort là ứng viên rất phù hợp, vì bước phân hoạch về bản chất là di chuyển dữ liệu có điều kiện quanh phần tử chốt.

## [Your Redis Leaderboard Is Probably Breaking Ties Wrong](https://dev.to/trungdlp/your-redis-leaderboard-is-probably-breaking-ties-wrong-39k4)

Bảng xếp hạng dùng sorted set của Redis là bài toán quen thuộc, nhưng ít ai để ý trường hợp hai người chơi bằng điểm. Khi đó Redis xếp theo thứ tự từ điển của tên thành viên, tức ID người chơi quyết định ai đứng trên — thứ tự luôn xác định nhưng chẳng có ý nghĩa gì với người chơi. Các cách sửa nhanh đều có vấn đề: dấu thời gian bị trùng trong cùng mili-giây và lệch đồng hồ giữa các máy, còn nhồi hai giá trị vào một số thực kiểu double lại thu hẹp khoảng giá trị an toàn của cả hai.

Podium, một dịch vụ bảng xếp hạng mã nguồn mở, chọn luật rõ ràng: bằng điểm thì ai đạt mức điểm đó trước xếp trên. Mỗi bảng xếp hạng có một bộ đếm khởi tạo bằng giá trị lớn nhất của số nguyên có dấu 64-bit; khi người chơi đạt điểm mới, một script Lua giảm bộ đếm và ghép 19 chữ số đó vào trước ID công khai, nên người đến trước có tiền tố lớn hơn và đứng trên. Script cập nhật nguyên tử cả bốn phần trạng thái: sorted set giảm dần, sorted set tăng dần (các chữ số được đảo để người đến trước vẫn đứng đầu), hash ánh xạ ID sang tên nội bộ và bộ đếm. Nếu điểm gửi lên trùng điểm hiện tại, tên nội bộ được giữ nguyên, nên việc gửi lại có tính lũy đẳng. Cái giá là độ trễ tăng khoảng 11–17% cho thao tác ghi và mỗi thành viên tốn 287 byte thay vì 99 byte theo đo đạc cục bộ — đánh đổi để có một luật xếp hạng ổn định mà người chơi hiểu được.

---

*Bài viết đã được viết lại bởi Claude Code với Opus 5.5 vào ngày 27/09/2026.*
