---
title: "Newsletter #27"
date: 2025-05-14
tags: [ "AI-Assisted", "Vite", "Cloudflare", "Frontend", "AI Coding", "Data Engineering", "Career Development" ]
categories: [ "Newsletter" ]
---

*Mời bạn thưởng thức Newsletter #27.*

## ["Just use Vite"... with the Workers runtime](https://blog.cloudflare.com/introducing-the-cloudflare-vite-plugin/)

Cloudflare công bố phiên bản 1.0 của Cloudflare Vite plugin cùng hỗ trợ chính thức cho React Router v7. Trước đây, máy chủ phát triển của Vite luôn chạy mã phía máy chủ trong Node.js, kể cả khi ứng dụng được triển khai lên Cloudflare Workers, nên môi trường phát triển và môi trường vận hành thực tế dễ lệch nhau theo những cách khó phát hiện. Nhờ Environment API ra mắt ở dạng thử nghiệm trong Vite 6, plugin mới cho phép mã Worker chạy ngay trong runtime gốc của Workers (workerd), giúp hành vi lúc phát triển sát nhất có thể với lúc chạy thật.

Với ứng dụng trang đơn (SPA) viết bằng React, Vue hay Svelte, bạn có thể tạo dự án mới bằng CLI `create-cloudflare`, hoặc cập nhật dự án có sẵn chỉ bằng cách thêm `@cloudflare/vite-plugin` vào cấu hình Vite và tạo tệp `wrangler.jsonc`. Khi sửa phần Worker phía máy chủ, Vite cập nhật lại môi trường Worker mà không làm mất trạng thái giao diện phía trình duyệt. Lệnh `vite build` xuất cả hai phần, `vite preview` cho xem trước bản dựng trong runtime Workers, còn `wrangler deploy` triển khai thẳng mà không cần đóng gói thêm. Với React Router v7 (kế nhiệm Remix), một tệp duy nhất định nghĩa Worker cho cả lúc phát triển lẫn lúc dựng, không còn cần adapter riêng; plugin cũng hỗ trợ toàn bộ nền tảng như KV, D1, Durable Objects hay Workers AI.

## [The Best Programmers I Know](https://endler.dev/2025/best-programmers/)

Matthias Endler ghi lại những đặc điểm chung mà anh quan sát được ở các lập trình viên xuất sắc nhất từng gặp, như một danh sách anh ước đã có trong tay khi mới vào nghề. Nền tảng đầu tiên là đọc thẳng tài liệu tham khảo gốc thay vì đoán mò, tra Stack Overflow hay hỏi mô hình ngôn ngữ lớn. Tiếp theo là hiểu thật sâu công cụ đang dùng: lịch sử ra đời, ai đang duy trì, giới hạn ở đâu và hệ sinh thái xung quanh ra sao. Người giỏi cũng thật sự đọc kỹ thông báo lỗi, biết chia nhỏ vấn đề khó thành những bài toán đơn giản, và không ngại nhúng tay vào mã nguồn lạ để rồi trở thành người được cả nhóm tìm đến.

Bên cạnh kỹ năng kỹ thuật, họ luôn sẵn lòng giúp đỡ người khác, viết tốt vì cách viết phản ánh cách tư duy, và không ngừng học hỏi — có người đã ngoài 60 tuổi vẫn vượt xa lớp trẻ. Họ không đặt nặng thứ bậc, xây dựng uy tín qua những sản phẩm được nhiều người biết đến, kiên nhẫn với cả máy tính lẫn con người, không bao giờ đổ lỗi cho máy tính trước những lỗi tưởng như ngẫu nhiên, dám nói "tôi không biết", không đoán khi thông tin còn mơ hồ và ưu tiên viết mã đơn giản. Tác giả nhấn mạnh đây không phải danh sách kiểm tra hay một cuộc đua, nhưng cũng không có lối tắt nào để bỏ qua sự rèn luyện.

## [RDEL #87: How do AI coding tools actually change developer work?](https://rdel.substack.com/p/rdel-87-how-do-ai-coding-tools-actually)

Bài viết của Lizzie Matusov trong chuỗi Research-Driven Engineering Leadership tóm tắt một thử nghiệm ngẫu nhiên có đối chứng kéo dài ba tuần do Microsoft và Institute for Work Life thực hiện với 228 kỹ sư tại một công ty phần mềm toàn cầu. Các kỹ sư được chia thành ba nhóm: nhóm mới được cấp GitHub Copilot, nhóm không dùng công cụ AI nào và nhóm vốn đã dùng Copilot, kết hợp nhật ký hằng ngày với dữ liệu đo từ xa (telemetry). Ngay trước thử nghiệm, 86% người đã có kinh nghiệm cho rằng công cụ lập trình AI hữu ích, so với chỉ 44% ở nhóm chưa từng dùng, và lý do phổ biến nhất khiến nhiều người chưa thử là quá bận.

Sau ba tuần, mức độ yêu thích và cảm nhận về tính hữu ích tăng rõ rệt; 84% cho biết Copilot đã thay đổi tích cực cách họ làm việc, với ít thời gian cho việc nhàm chán hơn và nhiều hứng khởi hơn. Copilot không chỉ được dùng để sinh mã khuôn mẫu mà còn thay cho tìm kiếm web và hỗ trợ lên ý tưởng, thiết kế. Tuy vậy, dữ liệu telemetry không cho thấy khác biệt có ý nghĩa thống kê về số dòng mã, số PR hay thời gian viết mã, và mức độ tin tưởng vào mã do AI tạo ra vẫn giữ nguyên. Tác giả khuyên các trưởng nhóm kỹ thuật mở rộng thước đo năng suất sang cả sự hài lòng và trạng thái tập trung theo khung SPACE, dành thời gian cho đội ngũ thử nghiệm, và xem AI như công cụ gánh việc lặp lại để kỹ sư tập trung vào thiết kế và học hỏi.

## [Overclocking dbt: Discord's Custom Solution in Processing Petabytes of Data](https://discord.com/blog/overclocking-dbt-discords-custom-solution-in-processing-petabytes-of-data)

Chris Dong, kỹ sư dữ liệu tại Discord, chia sẻ cách đội ngũ mở rộng dbt (data build tool) để xử lý hàng petabyte dữ liệu trong khi hơn 100 lập trình viên cùng làm việc trên hơn 2.500 mô hình. Cách triển khai ban đầu nhanh chóng quá tải: mỗi lần biên dịch lại cả dự án mất hơn 20 phút, chiến lược cập nhật tăng dần mặc định không hợp với khối lượng dữ liệu, còn các lập trình viên liên tục ghi đè bảng kiểm thử của nhau. Để tách biệt môi trường, họ ghi đè macro `generate_alias_name` nhằm tự động gắn tên người dùng vào tên bảng khi phát triển cục bộ, gắn số pull request hoặc mã commit trong CI/CD, và giữ tên gốc ở môi trường chính thức.

Về hiệu năng, họ thay macro `is_incremental()` (vốn phải quét toàn bảng trên BigQuery) bằng hai biến `start_date` và `end_date`, đồng thời can thiệp vào giá trị băm trong tệp phân tích cú pháp từng phần của dbt để việc đổi biến không kích hoạt biên dịch lại toàn bộ, giúp tốc độ chạy tăng gấp 5 lần. Việc nạp lại dữ liệu lịch sử được tự động hóa bằng cách đánh phiên bản ngữ nghĩa trong trường `meta`: tăng phiên bản chính sẽ nạp lại toàn bộ bảng cùng các bảng phụ thuộc phía sau, còn phiên bản phụ cho phép nạp lại có chọn lọc, chia thành từng đoạn ngày. Cuối cùng, thư viện macro dùng chung và đường ống CI/CD trên Buildkite kiểm tra chi phí truy vấn, phân tích phụ thuộc và cảnh báo phạm vi ảnh hưởng khi sửa macro, giúp bắt lỗi trước khi lên môi trường chính thức.

---

*Bài viết đã được viết lại bởi Claude Code với Opus 5.5 vào ngày 27/09/2026.*
