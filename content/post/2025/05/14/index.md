---
title: "Newsletter #27"
date: 2025-05-14
tags: [ "AI-Assisted", "Development", "Frontend", "Vite", "Cloudflare", "Git", "Data Engineering", "Best Practices" ]
categories: [ "Newsletter" ]
---

*Mời bạn thưởng thức Newsletter #27.*

## ["Just use Vite"... with the Workers runtime](https://blog.cloudflare.com/introducing-the-cloudflare-vite-plugin/)

Cloudflare vừa công bố phiên bản 1.0 của Cloudflare Vite plugin, cùng với việc hỗ trợ chính thức cho React Router v7. Plugin này tích hợp Workers runtime trực tiếp vào Vite, một trong những build tools phổ biến nhất cho phát triển web hiện nay.

Trước đây, Vite dev server luôn chạy server code trong Node.js, ngay cả khi bạn triển khai ứng dụng lên Cloudflare Workers. Với Environment API mới được giới thiệu trong Vite 6, code Worker của bạn giờ đây có thể chạy trong Cloudflare Workers runtime (workerd) nguyên bản. Điều này đảm bảo môi trường phát triển khớp tối đa với môi trường production.

Vite 6 mang đến những thay đổi quan trọng nhất về kiến trúc kể từ khi ra đời, mở ra nhiều khả năng mới cho hệ sinh thái. Environment API là nền tảng cho phép Vite dev server tương tác với nhiều môi trường runtime tùy chỉnh khác nhau.

Một số điểm chính:
- Tích hợp trực tiếp Workers runtime vào Vite dev server
- Hỗ trợ chính thức cho React Router v7
- Environment API mới trong Vite 6 cho phép chạy server code trong các runtime khác nhau
- Quy trình phát triển khớp với môi trường production
- Dễ dàng tạo mới hoặc cập nhật dự án React SPA với Cloudflare Workers

## [The Best Programmers I Know](https://endler.dev/2025/best-programmers/)

Matthias Endler chia sẻ những quan sát của mình về các đặc điểm chung của những lập trình viên xuất sắc nhất mà anh từng gặp. Bài viết này đặc biệt hữu ích cho những người mới bắt đầu sự nghiệp lập trình, giúp họ định hướng phát triển bản thân một cách hiệu quả.

Theo quan sát của tác giả, những lập trình viên giỏi nhất thường có những đặc điểm sau: họ luôn đọc kỹ tài liệu tham khảo gốc thay vì dựa vào Stack Overflow hay AI, hiểu sâu về các công cụ họ sử dụng từ lịch sử, hiện tại đến giới hạn của chúng. Họ có khả năng đọc hiểu và phân tích thông báo lỗi một cách chi tiết, biết cách chia nhỏ vấn đề phức tạp thành những phần đơn giản hơn để giải quyết.

Đặc biệt, những lập trình viên xuất sắc không ngại "làm bẩn tay" với code, luôn sẵn sàng giúp đỡ người khác, có khả năng viết lách tốt và không ngừng học hỏi. Họ thường duy trình việc học tập suốt đời, ngay cả khi đã có nhiều năm kinh nghiệm trong ngành.

Một số điểm chính:
- Đọc kỹ tài liệu tham khảo gốc thay vì phụ thuộc vào Stack Overflow hay AI
- Hiểu sâu về công cụ: lịch sử, hiện tại, giới hạn và hệ sinh thái
- Khả năng đọc hiểu và phân tích thông báo lỗi chi tiết
- Biết cách chia nhỏ vấn đề phức tạp
- Sẵn sàng "làm bẩn tay" với code và giúp đỡ người khác
- Có kỹ năng viết lách tốt
- Luôn duy trình việc học tập, ngay cả ở tuổi 60+

## [RDEL #87: How do AI coding tools actually change developer work?](https://rdel.substack.com/p/rdel-87-how-do-ai-coding-tools-actually)

Một nghiên cứu thú vị từ Microsoft và Institute for Work Life về tác động của GitHub Copilot đối với công việc của các lập trình viên trong môi trường thực tế. Nghiên cứu được thực hiện trong 3 tuần với 228 kỹ sư tại một công ty phần mềm toàn cầu lớn, chia thành ba nhóm: nhóm mới được cấp quyền truy cập Copilot, nhóm không sử dụng công cụ AI, và nhóm đã đang sử dụng Copilot.

Kết quả nghiên cứu cho thấy mặc dùng không có sự khác biệt đáng kể về các chỉ số như số dòng code hay số lượng PR giữa các nhóm, nhưng có những thay đổi tích cực về trải nghiệm làm việc. 84% người dùng cho biết Copilot đã thay đổi tích cực cách họ làm việc, với nhiều người báo cáo dành ít thời gian hơn cho các công việc nhàm chán và có nhiều năng lượng hơn trong công việc.

Điều thú vị là các lập trình viên không chỉ sử dụng Copilot cho code mẫu, mà còn dùng nó thay thế cho việc tìm kiếm web và như một công cụ hỗ trợ tư duy tuy, thiết kế. Tuy nhiên, mức độ tin tưởng vào code được tạo ra vẫn không thay đổi, cho thấy các lập trình viên vẫn duy trình thái độ thận trọng với output của AI.

Một số điểm chính:
- 86% người dùng có kinh nghiệm đồng ý rằng công cụ lập trình AI hữu ích
- 84% báo cáo thay đổi tích cực trong cách làm việc
- Không có sự khác biệt đáng kể về các chỉ số telemetry
- Copilot được sử dụng cho cả việc tìm kiếm và thiết kế
- Mức độ tin tưởng vào code AI không tăng dù trải nghiệm tích cực

## [Overclocking dbt: Discord's Custom Solution in Processing Petabytes of Data](https://discord.com/blog/overclocking-dbt-discords-custom-solution-in-processing-petabytes-of-data)

Discord vừa chia sẻ về giải pháp tùy chỉnh của họ để mở rộng quy mô dbt (data build tool) nhằm xử lý hàng petabyte dữ liệu trong khi hỗ trợ hơn 100 lập trình viên làm việc đồng thời trên 2,500+ mô hình. Đây là một bài học quý giá về việc điều chỉnh và tối ưu hóa công cụ mã nguồn mở cho quy mô doanh nghiệp.

Thách thức chính của Discord là thời gian biên dịch lại toàn bộ dự án dbt kéo dài hơn 20 phút, chiến lược materialization tăng dần mặc định không được tối ưu hóa cho khối lượng dữ liệu của họ, và các lập trình viên thường xuyên ghi đè lên các bảng kiểm thử của nhau. Để giải quyết vấn đề này, Discord đã phát triển một hệ thống dbt tùy chỉnh với các tính năng như tách biệt môi trường data warehouse và tự động hóa các quy trình phức tạp.

Một trong những giải pháp quan trọng là việc tùy chỉnh macro generate_alias_name để tự động thêm định danh riêng cho từng lập trình viên dựa trên môi trường thực thi, cho phép nhiều người làm việc trên cùng một mô hình mà không ảnh hưởng lẫn nhau.

Một số điểm chính:
- Mở rộng quy mô dbt để xử lý petabyte dữ liệu
- Hỗ trợ hơn 100 lập trình viên làm việc đồng thời
- Tùy chỉnh macro để tách biệt môi trường phát triển
- Tối ưu hóa thời gian biên dịch và chiến lược materialization
- Giải pháp có thể áp dụng cho nhiều nền tảng cloud khác nhau

---

*Bài viết đã được review và cập nhật bởi Claude Code với Opus 4.7 (1M context).*
