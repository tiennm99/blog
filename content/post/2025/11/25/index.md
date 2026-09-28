---
title: "Newsletter #61"
date: 2025-11-25
tags: ["AI-Assisted", "Open Table Formats", "Spec-Driven Development", "Agentic Engineering", "JIT", "Compilers", "PostgreSQL"]
categories: ["Newsletter"]
---

*'Lặn' đã đâu, nay mới ngoi lên lại. Mời bạn thưởng thức Newsletter #61.*

## [Beyond Indexes: How Open Table Formats Optimize Query Performance](https://jack-vanlightly.com/blog/2025/10/8/beyond-indexes-how-open-table-formats-optimize-query-performance/)

Jack Vanlightly, người từng làm tối ưu hiệu năng SQL Server và nay chuyên về các hệ thống dữ liệu, phản bác ý kiến cho rằng các định dạng bảng mở (open table format – OTF) như Apache Iceberg hay Delta Lake nên bổ sung chỉ mục phụ (secondary index) giống cơ sở dữ liệu quan hệ. Trong RDBMS phục vụ OLTP, chỉ mục cụm dạng B-tree cùng các chỉ mục phụ giúp tìm nhanh một hoặc vài dòng, đổi lại chi phí ghi cao hơn. Truy vấn phân tích thì khác hẳn: chúng quét hàng triệu dòng dữ liệu dạng cột, bất biến, nằm trên kho lưu trữ đối tượng như S3, nên việc lần theo con trỏ của chỉ mục phụ gần như không mang lại lợi ích.

Thay vào đó, OTF tăng tốc bằng kỹ thuật bỏ qua dữ liệu (data skipping): loại bỏ hẳn những tệp không liên quan trước khi đọc. Kỹ thuật này dựa trên bố cục vật lý (phân vùng, sắp xếp, gộp tệp), siêu dữ liệu như thống kê min/max theo cột và Bloom filter lưu trong manifest, cùng các công cụ bổ trợ như materialized view. Tác giả tóm gọn bằng câu "bố cục là vua": hiệu năng đến từ cách tổ chức dữ liệu sao cho phân vùng khớp với điều kiện lọc và giá trị tương tự nằm gần nhau. Materialized view là thứ gần nhất với chỉ mục phụ, còn hướng đi tương lai là để các query engine tự xây dựng tối ưu riêng trên nền đặc tả bảng chuẩn thay vì nhồi chỉ mục phức tạp vào chính đặc tả OTF.

## [What's The Deal With GitHub Spec Kit](https://den.dev/blog/github-spec-kit/)

Den Delimarsky cho rằng LLM rất hữu ích khi lập trình nhưng kết quả lại dao động mạnh: cùng một yêu cầu, mỗi câu lệnh (prompt) khác nhau cho ra mã nguồn khác nhau. Giải pháp ông đề xuất là Phát triển Dựa trên Đặc tả (Spec-Driven Development – SDD), trong đó đặc tả mô tả rõ "cái gì" và "tại sao" của tính năng, cố ý không đi vào chi tiết kỹ thuật. GitHub Spec Kit là bộ công cụ thử nghiệm mã nguồn mở hiện thực hóa cách làm này qua chuỗi lệnh slash: /constitution đặt nguyên tắc cốt lõi, /specify viết đặc tả, /clarify làm rõ điểm mơ hồ, /plan lập kế hoạch kỹ thuật, /tasks chia nhỏ công việc, /analyze kiểm tra tính nhất quán trước khi triển khai.

Theo tác giả, LLM giống một kỹ sư junior quá hăng hái, cần yêu cầu rõ ràng và sự dẫn dắt. Khi đó đặc tả trở thành tài liệu có thể thực thi, còn mã nguồn là thứ dễ thay thế, có thể sinh lại bất cứ lúc nào mà vẫn đúng yêu cầu; tách đặc tả khỏi công nghệ cụ thể cũng giúp dễ so sánh nhiều cách triển khai. Ông minh họa bằng việc xây dựng công cụ tổng hợp ảnh chụp từ camera trên núi Mauna Kea trong chưa đầy hai giờ, đồng thời nhấn mạnh đặc tả không phải thuốc tiên: con người vẫn phải giám sát và tinh chỉnh liên tục. Khi năng lực mô hình tăng lên, nút thắt chuyển sang việc truyền đạt đúng ý định của lập trình viên, và đặc tả tốt chính là cách giải quyết.


## [Just Talk To It - the no-bs Way of Agentic Engineering](https://steipete.me/posts/just-talk-to-it)

Peter Steinberger chia sẻ quy trình agentic engineering của mình khi gần như toàn bộ mã nguồn trong dự án đều do AI viết. Thông điệp chính là "cứ nói chuyện với nó": thay vì chạy theo framework cầu kỳ, hãy làm việc trực tiếp với một mô hình đủ mạnh, dùng nhiều để hình thành trực giác, và giữ quy trình thật đơn giản. Ông ưu tiên GPT-5-Codex hơn Claude Code vì dùng ngữ cảnh hiệu quả hơn, nhanh hơn, hỗ trợ xếp hàng tin nhắn và đọc nhiều tệp trước khi hành động. Câu lệnh thường chỉ một hai câu kèm ảnh chụp màn hình chỉ đúng chỗ cần sửa. Một khái niệm quan trọng là "bán kính ảnh hưởng" (blast radius): ước lượng một thay đổi chạm tới bao nhiêu tệp để chia việc hợp lý, rồi chạy song song nhiều agent trong các ô terminal và commit từng phần nhỏ.

Ông ưu tiên CLI hơn MCP để tránh tốn ngữ cảnh, viết kiểm thử ngay sau mỗi tính năng trong cùng phiên, và dành khoảng 20% thời gian để agent tái cấu trúc mã nguồn. Ngược lại, RAG, subagent, "plan mode" hay các chỉ dẫn agent rườm rà theo ông không đáng bao nhiêu. Bộ công cụ gồm Codex CLI, Wispr Flow để nhập bằng giọng nói, tmux cho tác vụ nền và ast-grep để kiểm tra mã nguồn, kèm một tệp Agents.md dài khoảng 800 dòng. Kết luận: viết phần mềm tốt vẫn khó, kỹ năng cần có giống như quản lý kỹ sư giàu kinh nghiệm, và kỳ vọng về kiến trúc lẫn trải nghiệm người dùng giờ còn cao hơn.

## [JIT: so you want to be faster than an interpreter on modern CPUs](https://www.pinaraf.info/2025/10/jit-so-you-want-to-be-faster-than-an-interpreter-on-modern-cpus/)

Pinaraf, người đang phát triển một trình biên dịch JIT cho PostgreSQL, giải thích vì sao JIT không mặc nhiên nhanh hơn trình thông dịch (interpreter) trên CPU hiện đại. Các CPU ngày nay có kiến trúc superscalar, thực thi không theo thứ tự (out-of-order) và dự đoán rẽ nhánh, nên có thể chạy song song nhiều lệnh và che giấu độ trễ rất tốt. Trình thông dịch truyền thống dùng câu lệnh switch để điều phối opcode, tạo ra các nhánh khó đoán; PostgreSQL thay bằng computed goto, nhảy thẳng tới đoạn xử lý của từng opcode, giúp CPU dự đoán chính xác hơn nhiều. Vì vậy, một trình thông dịch viết tốt cạnh tranh đáng ngạc nhiên với mã nguồn biên dịch.

Tác giả phân tích truy vấn `SELECT a FROM table WHERE a = 42` trên bảng 10 triệu dòng, được dịch thành chuỗi opcode như SCAN_FETCHSOME, SCAN_VAR, FUNCEXPR_STRICT_2 (kiểm tra null rồi gọi int4eq), QUAL và DONE_RETURN. Loại bỏ phép kiểm tra null thừa trên hằng số giúp nhanh hơn 7,9%, bỏ toàn bộ kiểm tra null được 9,5%, nội tuyến (inline) hàm int4eq được 10,3%, còn JIT thử nghiệm của ông đạt 23%, với số lệnh giảm 11%, số chu kỳ giảm 20% và số nhánh giảm 13%. Điểm đáng chú ý là các tối ưu này áp dụng được cho cả trình thông dịch lẫn JIT, nên lợi thế truyền thống của JIT bị thu hẹp; muốn vượt trội thật sự cần những tối ưu sâu hơn, mà tác giả hứa sẽ trình bày ở các bài sau.

*Bài viết này mình dùng CCR với model `x-ai/grok-4.1-fast:free`. Có vẻ chưa tốt lắm, nhiều phần còn tiếng Anh thô. Mình sẽ cố gắng cải thiện hơn*

---

*Bài viết đã được viết lại bởi Claude Code với Opus 5.5 vào ngày 27/09/2026.*
