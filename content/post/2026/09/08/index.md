---
title: "Newsletter #130"
date: 2026-09-08
tags: ["AI-Assisted", "Redis", "Linux Kernel", "Performance", "System Design", "Data Structures", "Distributed Systems"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #130.*

## [How Anthropic runs large-scale code migrations with Claude Code](https://claude.com/blog/ai-code-migration)

Chuyển đổi một dự án lớn sang ngôn ngữ khác trước đây là công việc kéo dài nhiều năm và tốn hàng triệu đô, nên chỉ được thực hiện khi doanh nghiệp gần như không còn lựa chọn nào khác. Bài viết của Anthropic cho thấy bài toán này đã đổi khác: Bun được chuyển một triệu dòng mã nguồn từ Zig sang Rust trong chưa đầy hai tuần, còn một dự án 165.000 dòng được chuyển từ Python sang TypeScript chỉ trong một cuối tuần. Riêng dự án Bun tiêu tốn khoảng 165.000 đô chi phí API, nhưng đổi lại tệp nhị phân nhỏ hơn 19%, hiệu năng tăng 2–5% và không còn rò rỉ bộ nhớ nào phát hiện được.

Quy trình được chia thành sáu bước: xây dựng bộ quy tắc dịch cùng bản đồ phụ thuộc, thử nghiệm trên một nhóm tệp mẫu để tinh chỉnh quy tắc, dịch toàn bộ mã nguồn bằng các agent chạy song song, chạy vòng lặp biên dịch với các agent chuyên sửa lỗi, kiểm thử nhanh để bắt lỗi lúc chạy, và cuối cùng đối chiếu hành vi với bộ kiểm thử đầy đủ. Tư tưởng cốt lõi rất đáng nhớ: bạn không sửa mã nguồn, bạn sửa vòng lặp đã sinh ra mã nguồn đó.

Điều quyết định thành công không phải là mô hình mạnh nhất, mà là khả năng kiểm chứng khách quan bằng trình biên dịch, bộ kiểm thử và việc so sánh kết quả đầu ra. Công sức của con người nên dồn vào giai đoạn viết quy tắc và thử nghiệm ban đầu, thay vì vá tay từng tệp về sau.

**Điểm chính:**
- Chi phí và thời gian chuyển đổi ngôn ngữ đã giảm tới mức một điểm nghẽn kéo dài cũng đủ để cân nhắc làm.
- Sáu bước: bộ quy tắc, thử nghiệm mẫu, dịch song song, vòng lặp biên dịch, kiểm thử nhanh, đối chiếu hành vi.
- Sửa quy tắc rồi sinh lại cả nhóm tệp, thay vì vá tay từng lỗi riêng lẻ.
- Luôn cần cách kiểm chứng khách quan và hàng đợi công việc có thể tiếp tục lại được.
- Chọn mô hình theo vai trò: mô hình mạnh để điều phối và quyết định khó, mô hình nhẹ để dịch số lượng lớn.

## [The VFS](https://internals-for-interns.com/posts/linux-kernel-vfs/)

Điều kỳ lạ mà ít ai để ý khi làm việc với Linux: bạn đọc một tệp trên ext4, một tệp trong `/proc` vốn chỉ tồn tại trong bộ nhớ nhân, hay một tệp nằm trên máy khác qua NFS — vẫn cùng những lời gọi hệ thống đó, cùng ngữ nghĩa file descriptor đó. Lớp chịu trách nhiệm dịch "đọc từ thứ này" thành thao tác cụ thể chính là VFS (Virtual File System), nằm giữa tầng syscall và mọi hệ thống tệp thật. Bài viết dùng mã nguồn Linux 7.1 để giải thích cách lớp trung gian này hoạt động.

VFS dựa trên một mẹo rất cũ trong lập trình hướng đối tượng: lập trình theo giao diện chứ không theo hiện thực, mà trong C thì "giao diện" chỉ là một struct chứa các con trỏ hàm. Mô hình gồm bốn đối tượng: superblock là một hệ thống tệp đã được gắn kết, inode là một đối tượng bên trong nó, dentry là một cái tên đã được lưu đệm, và file là một phiên mở cụ thể của tiến trình. Mỗi đối tượng mang theo bảng thao tác riêng, và nhiệm vụ của một hệ thống tệp về cơ bản chỉ là điền vào các bảng đó.

Phần lớn công việc thật ra do mã dùng chung của VFS đảm nhiệm. Khi phân giải đường dẫn, nhân đi từng thành phần một và chỉ gọi xuống hệ thống tệp khi câu trả lời chưa có trong dcache — bộ đệm này nhớ cả những cái tên không tồn tại (negative dentry) và được duyệt mà không cần khóa nhờ kỹ thuật RCU. Khi đọc tệp cũng vậy: dữ liệu được phục vụ từ page cache, hệ thống tệp chỉ được nhờ đúng một việc là nạp trang còn thiếu qua `read_folio`.

**Điểm chính:**
- VFS là một giao diện viết tay bằng C, gồm bốn loại đối tượng kèm bảng con trỏ hàm.
- Hệ thống tệp chỉ cần đăng ký `file_system_type`, phần còn lại được nối tự động từ lúc gắn kết.
- Mọi mục trong bảng thao tác đều tùy chọn; VFS tự lấp chỗ trống bằng hiện thực mặc định.
- dcache giúp phân giải đường dẫn hầu như không chạm đĩa, và được duyệt không khóa bằng RCU.
- File descriptor thực chất chỉ là chỉ số trong mảng `struct file *` của mỗi tiến trình.

## [Text Editor Data Structures](https://cdacamar.github.io/data%20structures/algorithms/benchmarking/text%20editors/c++/editor-data-structures/)

Khi tự viết một trình soạn thảo văn bản, câu hỏi đầu tiên phải trả lời là lưu nội dung tệp trong bộ nhớ như thế nào. Cameron DaCamara bắt đầu với cách đơn giản nhất — một chuỗi lớn duy nhất — và nhanh chóng thấy giới hạn: tệp vượt quá 1MB đã trở nên khó chịu, việc cấp phát lại bộ nhớ mỗi lần chỉnh sửa có thể biến thao tác O(n) thành O(n²), và muốn có undo/redo thì phải lưu riêng các đoạn ký tự đã xóa, rất tốn bộ nhớ.

Tác giả lần lượt cân nhắc các cấu trúc dữ liệu quen thuộc. Gap buffer là thứ Emacs dùng rất tốt, nhưng lại vướng khi hỗ trợ chỉnh sửa nhiều con trỏ cùng lúc, vốn là tính năng ông đặt lên hàng đầu. Rope cho thao tác O(lg n) nhưng ngốn bộ nhớ vì cơ chế sao chép khi ghi cần thiết để giữ tính bất biến. Piece table truyền thống thì đuối dần trong các phiên làm việc dài do chi phí cấp phát lại mảng. Piece tree của VSCode kết hợp được ưu điểm của cả hai nhờ cây đỏ-đen, nhưng chưa hỗ trợ bất biến.

Cuối cùng tác giả tự hiện thực một piece tree thuần hàm tên là fredbuf. Điểm khác biệt gồm việc xử lý CRLF bên ngoài cây thay vì nhúng vào trong, một lớp TreeWalker để kiểm tra và gỡ lỗi, và thuật toán xóa trên cây đỏ-đen bất biến. Nhờ tính bất biến, undo/redo trở nên đơn giản đến bất ngờ: chỉ cần hai danh sách liên kết lưu ảnh chụp của cây, khôi phục trạng thái chỉ là gán lại con trỏ. Mã nguồn được phát hành theo giấy phép MIT, chỉ cần C++20 và không phụ thuộc thư viện ngoài.

**Điểm chính:**
- Xác định ràng buộc từ đầu (như hỗ trợ nhiều con trỏ) giúp loại sớm các phương án không phù hợp.
- Mỗi cấu trúc có đánh đổi riêng: gap buffer, rope, piece table, piece tree đều có điểm yếu rõ rệt.
- Cấu trúc dữ liệu bất biến biến undo/redo thành việc gán lại con trỏ.
- Công cụ gỡ lỗi riêng là thứ không thể thiếu khi làm cấu trúc dữ liệu phức tạp.
- Xóa trên cây đỏ-đen bất biến là bài toán thuật toán thực sự khó, đáng nghiên cứu kỹ.

## [Scaling to 1 million concurrent sandboxes in seconds](https://modal.com/blog/scaling-to-1-million-concurrent-sandboxes-in-seconds)

Modal vừa viết lại toàn bộ nền tảng sandbox của họ và chứng minh kết quả bằng một con số đáng chú ý: một triệu sandbox chạy đồng thời, được tạo ra trong chưa đầy 60 giây. Vấn đề mà họ phải giải quyết là điểm nghẽn trung tâm — thứ khiến các nền tảng chạy container truyền thống như Kubernetes chững lại khi quy mô tăng lên, vì mọi quyết định đều phải đi qua một bộ điều phối duy nhất.

Cách làm mới của Modal là phân tán hóa. Nhiều máy chủ lập lịch cùng xử lý yêu cầu tạo sandbox song song, dựa trên dữ liệu đã được lưu đệm sẵn trong bộ nhớ, nên có thể mở rộng theo chiều ngang giống như cân bằng tải. Thay đổi quan trọng nhất là bỏ kho dữ liệu tập trung: mỗi worker trở thành nguồn sự thật của chính nó, định kỳ công bố trạng thái lên Redis streams, còn các máy chủ lập lịch đọc trạng thái đó và ra quyết định bất đồng bộ mà không cần đồng bộ hóa với nhau. Nhờ vậy đường đi khi tạo một sandbox chỉ còn hai chặng mạng và một thao tác CPU.

Kết quả là thời gian tạo sandbox ở mức trung vị dưới 500 mili-giây, hàng chục nghìn sandbox được tạo mỗi giây, và trên thực tế không còn giới hạn về số lượng chạy đồng thời. Đội ngũ đã mất nhiều tháng để viết lại các hệ thống backend cốt lõi, khởi đầu bằng một đợt làm bản mẫu tập trung với bốn kỹ sư trước khi hiện thực lại toàn bộ tính năng cho môi trường sản xuất.

**Điểm chính:**
- Bộ điều phối tập trung là điểm nghẽn chính khi mở rộng nền tảng chạy container.
- Nhiều máy chủ lập lịch xử lý song song dựa trên dữ liệu lưu đệm, mở rộng theo chiều ngang.
- Mỗi worker tự là nguồn sự thật, công bố trạng thái định kỳ qua Redis streams.
- Đường tạo sandbox rút gọn còn hai chặng mạng và một thao tác CPU.
- Trung vị dưới 500ms mỗi sandbox, hàng chục nghìn sandbox được tạo mỗi giây.

## [Making 768 servers look like 1](https://planetscale.com/blog/making-768-servers-look-like-1)

Khi một ứng dụng phải xử lý hàng triệu truy vấn mỗi giây trên khối dữ liệu cỡ petabyte, một máy chủ cơ sở dữ liệu duy nhất không còn đủ sức. Bài viết của PlanetScale chỉ ra giới hạn căn bản của cách làm truyền thống: thao tác ghi luôn bị dồn về một máy chủ duy nhất, vì nhật ký ghi trước (WAL) trở thành nút thắt bất kể bạn có bao nhiêu bản sao; thêm bản sao chỉ tăng khả năng đọc chứ không tăng dung lượng lưu trữ; và việc sao lưu một cơ sở dữ liệu khổng lồ nguyên khối tốn quá nhiều thời gian.

Lời giải là chia mảnh (sharding): phân tán dữ liệu và truy vấn ra nhiều máy chủ chính. Bài viết đưa ra một ví dụ cụ thể để hình dung quy mô — lưu một petabyte dữ liệu cần 256 mảnh, mỗi mảnh gồm một máy chính và hai bản sao, tổng cộng 768 máy chủ.

Vấn đề là làm sao để lập trình viên không phải gánh sự phức tạp đó. Câu trả lời nằm ở một tầng proxy đóng vai trò bộ định tuyến, đứng giữa ứng dụng và hạ tầng đã chia mảnh. Bộ định tuyến này phải phân tích câu lệnh SQL, hiểu cấu trúc phân bố dữ liệu, gửi từng truy vấn tới đúng mảnh và gộp kết quả từ nhiều mảnh lại. Chiến lược chia mảnh được khai báo trong tệp JSON, ví dụ bảng người dùng chia theo giá trị băm của cột ID. Kết hợp với DNS và cân bằng tải, ứng dụng chỉ cần kết nối tới một địa chỉ duy nhất như `mydb.pscale.com` và hoàn toàn không biết phía sau có 768 máy chủ đang làm việc.

**Điểm chính:**
- WAL khiến thao tác ghi luôn bị giới hạn ở một máy chủ, thêm bản sao không giải quyết được.
- Bản sao chỉ tăng thông lượng đọc, không tăng dung lượng lưu trữ.
- Chia mảnh phân tán cả dữ liệu lẫn truy vấn ra nhiều máy chủ chính.
- Bộ định tuyến phân tích SQL, gửi truy vấn đúng mảnh và gộp kết quả trả về.
- Nhờ DNS và cân bằng tải, ứng dụng chỉ thấy một địa chỉ cơ sở dữ liệu duy nhất.

## [Branch‑Avoidant Programming](https://easylang.online/blog/branchless)

Bộ xử lý hiện đại đoán trước nhánh nào sẽ được chọn để giữ đường ống lệnh luôn đầy. Khi đoán sai, nó phải xả sạch đường ống và bắt đầu lại, và cái giá phải trả không hề nhỏ. Bài viết minh họa bằng một bài toán rất quen thuộc: duyệt một mảng số và chép những số nhỏ hơn 500 sang mảng mới. Nếu dữ liệu phân bố ngẫu nhiên, bộ dự đoán nhánh gần như không thể đoán đúng, và hiệu năng sụt thảm hại.

Mẹo ở đây là bỏ hẳn câu lệnh điều kiện: cứ ghi giá trị vào mảng đích một cách vô điều kiện, rồi chỉ tăng chỉ số khi điều kiện đúng, kiểu `smlen += (numbers[i] < 500);`. Đúng là ta ghi thừa dữ liệu, nhưng chi phí đó thường rẻ hơn nhiều so với việc đoán sai nhánh. Kết quả đo trên Apple M1 rất ấn tượng: bản dùng điều kiện mất 0,345 giây, còn bản không nhánh chỉ mất 0,036 giây; trên Intel Xeon là 0,576 so với 0,110 giây. Nhìn xuống mã máy sẽ thấy rõ lý do: trên ARM, lệnh nhảy `b.gt` được thay bằng `cinc` (tăng có điều kiện), còn trên x86_64 thì `jg` được thay bằng `setle`, giữ luồng điều khiển thẳng tắp.

Vì sao trình biên dịch không tự làm việc này? Vì nó không biết đặc điểm dữ liệu của bạn, và một phép ghi vô điều kiện có thể vượt ra ngoài vùng nhớ đã cấp phát. Đây là biến đổi mà lập trình viên phải chủ động chỉ định. Cũng cần lưu ý khoảng cách hiệu năng thu hẹp lại với tập dữ liệu nhỏ, vì lúc đó bảng lịch sử của bộ dự đoán nhánh đã kịp học được quy luật.

**Điểm chính:**
- Đoán sai nhánh buộc CPU xả đường ống lệnh, chi phí lớn hơn nhiều so với vài phép ghi thừa.
- Thay câu lệnh điều kiện bằng ghi vô điều kiện cộng tăng chỉ số có điều kiện.
- Chênh lệch đo được lên tới gần 10 lần trên cả Apple M1 lẫn Intel Xeon.
- Trình biên dịch không tự tối ưu vì không thể đảm bảo an toàn bộ nhớ khi ghi thừa.
- Lợi ích giảm dần với tập dữ liệu nhỏ; quicksort là ứng viên rất hợp với kỹ thuật này.

## [Your Redis Leaderboard Is Probably Breaking Ties Wrong](https://dev.to/trungdlp/your-redis-leaderboard-is-probably-breaking-ties-wrong-39k4)

Bảng xếp hạng dựng bằng sorted set của Redis là bài toán ai cũng từng làm, nhưng ít người để ý đến trường hợp hai người chơi cùng điểm. Khi đó Redis sắp xếp theo thứ tự từ điển của tên thành viên, nghĩa là ID người chơi mới là thứ quyết định ai đứng trên — một luật hoàn toàn ngẫu nhiên và không công bằng.

Podium, một dịch vụ bảng xếp hạng mã nguồn mở, giải quyết bằng cách gắn thêm số thứ tự vào tên thành viên nội bộ. Mỗi bảng xếp hạng có một bộ đếm riêng, khởi tạo bằng giá trị lớn nhất của số nguyên có dấu 64-bit, và một script Lua nguyên tử sẽ giảm bộ đếm rồi ghép giá trị đó với ID người chơi. Nhờ vậy luật phân định trở nên rõ ràng: khi điểm bằng nhau, ai đạt tới mức điểm đó trước sẽ xếp trên. Cách này tránh được vấn đề lệch đồng hồ của các giải pháp dựa trên dấu thời gian, và an toàn khi nhiều yêu cầu chạy đồng thời.

Thiết kế còn có vài điểm đáng học. Toàn bộ thay đổi trạng thái — hai sorted set (một giảm dần, một tăng dần để phục vụ cả hai kiểu bảng xếp hạng), một hash ánh xạ và bộ đếm — đều diễn ra trong một lần chạy script duy nhất. Việc gửi lại cùng một điểm số cũng không làm thay đổi thứ hạng, tức là thao tác có tính lũy đẳng. Cái giá phải trả là độ trễ tăng khoảng 11–17% và mỗi thành viên tốn khoảng 287 byte thay vì 99 byte — chi phí cho sự đúng đắn.

**Điểm chính:**
- Sorted set mặc định phân định điểm bằng nhau theo thứ tự từ điển của ID, không có ý nghĩa gì về công bằng.
- Gắn số thứ tự giảm dần vào tên thành viên để ai đạt điểm trước thì xếp trên.
- Script Lua đảm bảo mọi thay đổi trạng thái diễn ra nguyên tử trong một lần chạy.
- Dùng số thứ tự thay cho dấu thời gian để tránh lệch đồng hồ giữa các máy.
- Đánh đổi: độ trễ tăng 11–17% và bộ nhớ mỗi thành viên tăng gần ba lần.
