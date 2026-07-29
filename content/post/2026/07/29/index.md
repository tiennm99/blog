---
title: "Newsletter #127"
date: 2026-07-29
tags: ["AI-Assisted", "AI Agents", "Security", "Web Security", "Go", "Performance", "Systems Programming"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #127.*

## [A return to two-pizza culture](https://www.allthingsdistributed.com/2026/06/return-to-two-pizza-culture.html)

Werner Vogels nhìn lại mô hình nhóm “hai chiếc pizza” tại Amazon: giữ nhóm đủ nhỏ để mọi thành viên hiểu công việc của nhau, sở hữu sản phẩm từ đầu đến cuối và tự chủ với những quyết định có thể đảo ngược. Khi tổ chức phát triển, số lượng phụ thuộc, tầng quản lý và vòng phê duyệt dễ làm chậm chính văn hóa từng giúp công ty thành công.

Sự xuất hiện của các tác nhân lập trình đang rút ngắn mạnh khoảng cách từ ý tưởng đến sản phẩm mẫu. Qua câu chuyện nhóm Amazon Quick, tác giả đề xuất điều chỉnh quy trình Working Backwards: khi đã tin vào vấn đề của khách hàng nhưng chưa chắc giải pháp có hiệu quả, hãy xây dựng sản phẩm mẫu trước, tự sử dụng, học từ phản hồi thực tế rồi mới viết tài liệu. Việc viết vẫn cần thiết để làm rõ tư duy, nhưng tài liệu sau thử nghiệm sẽ dựa trên hiểu biết thực tế thay vì giả định.

**Điểm chính:**
- Nhóm nhỏ hoạt động hiệu quả khi có quyền sở hữu rõ ràng và quyền tự chủ đối với các quyết định có thể đảo ngược.
- Tốc độ đến từ vòng phản hồi ngắn: xây dựng, sử dụng, học hỏi và cải tiến liên tục.
- Tác nhân lập trình giúp kiểm chứng ý tưởng trong vài ngày, thay vì dành nhiều tuần chỉ để mô tả điều có thể xảy ra.
- Sản phẩm mẫu nên đi trước tài liệu khi cách giải quyết còn nhiều bất định; tài liệu được viết sau đó sẽ chính xác và thuyết phục hơn.
- Khi sản phẩm phát triển, doanh nghiệp cần duy trì cấu trúc gồm nhiều nhóm nhỏ có trách nhiệm trọn vẹn để hạn chế sự trì trệ.

## [A peek into Reddit's anti-spam internals](https://lyra.horse/blog/2026/06/reddit-spam-internals/)

Từ một lỗi hiển thị ngắn ngủi năm 2021 khiến lý do gỡ nội dung nội bộ xuất hiện trong ứng dụng Reddit, tác giả lần theo ảnh chụp màn hình, mã nguồn Reddit cũ và các tài liệu kỹ thuật công khai để phác họa cách nền tảng chống thư rác. Hệ thống không dựa vào một bộ lọc duy nhất mà kết hợp danh sách miền bị cấm, tuổi và uy tín tài khoản, báo cáo của người dùng, đặc điểm kết nối, dấu vân tay trình duyệt, phân tích nội dung và các luật dành cho từng kiểu hành vi.

Bài viết cũng cho thấy kiến trúc này đã phát triển qua nhiều thế hệ, từ các bộ phân loại và luật Python cũ đến Spamurai, REV1, Snooron và REV2. Một số tín hiệu có thể tạo kết quả sai hoặc bị đánh lừa khi đứng riêng lẻ, vì vậy hệ thống thực tế phải tổng hợp nhiều nguồn dữ liệu và học từ hành động của người kiểm duyệt. Đây đồng thời là lời nhắc rằng cơ chế chống lạm dụng cần liên tục thích nghi khi kỹ thuật tạo thư rác thay đổi.

**Điểm chính:**
- Reddit sử dụng nhiều tầng phát hiện dựa trên luật, mô hình phân loại và thông tin ngữ cảnh thay vì một điểm số duy nhất.
- Dữ liệu đánh giá có thể gồm lịch sử tài khoản, tên miền, báo cáo, nội dung, thông tin mạng và dấu vân tay của phần mềm khách.
- Việc phê duyệt hoặc gỡ nội dung của người kiểm duyệt có thể trở thành tín hiệu giúp cải thiện hệ thống.
- Các bộ lọc đơn lẻ dễ tạo kết quả sai, nên quyết định cần dựa trên nhiều tín hiệu bổ trợ.
- Hệ thống chống thư rác phải được nâng cấp liên tục trước sự thay đổi của nền tảng, công cụ tự động hóa và AI.

## [Understanding the Go Runtime: Profiling](https://internals-for-interns.com/posts/go-runtime-profiling/)

Bài viết giải thích cơ chế bên trong của năm loại hồ sơ hiệu năng trong Go: CPU, vùng nhớ động, chờ, tranh chấp khóa và goroutine. Dù thu thập dữ liệu theo những cách khác nhau, tất cả đều tạo ra cùng một định dạng `pprof`: mỗi mẫu gồm một ngăn xếp lời gọi cùng các giá trị đo lường, còn vị trí, hàm và chuỗi được lưu trong các bảng dùng chung để tránh lặp dữ liệu.

Các hồ sơ này được chia thành ba mô hình thu thập. Hồ sơ CPU dùng tín hiệu định kỳ để ghi mẫu vào bộ đệm vòng không khóa rồi xử lý ở một goroutine nền. Hồ sơ vùng nhớ động, chờ và tranh chấp khóa tổng hợp sự kiện trực tiếp vào các nhóm được định danh bằng ngăn xếp. Hồ sơ goroutine chỉ chụp trạng thái của mọi goroutine đang sống khi được yêu cầu, đồng thời phối hợp với bộ lập lịch để giảm thời gian tạm dừng toàn bộ chương trình.

**Điểm chính:**
- Năm loại hồ sơ Go cùng sử dụng ngăn xếp lời gọi và định dạng tệp `pprof`.
- Hồ sơ CPU lấy mẫu bất đồng bộ, chấp nhận bỏ một số mẫu để không làm dừng luồng đang chạy.
- Hồ sơ vùng nhớ động lấy mẫu phân bổ và ước lượng cả tổng lượng cấp phát lẫn lượng bộ nhớ còn sử dụng.
- Hồ sơ chờ cho biết goroutine mất thời gian ở đâu, còn hồ sơ tranh chấp khóa chỉ ra khóa nào gây ra sự chờ đợi.
- Hồ sơ goroutine là ảnh chụp theo yêu cầu, không phải dữ liệu được tích lũy liên tục trong lúc chương trình chạy.

## [Incident Report: CVE-2026-LGTM](https://nesbitt.io/2026/06/26/incident-report-cve-2026-lgtm.html)

Đây là một báo cáo sự cố châm biếm về cuộc tấn công chuỗi cung ứng phần mềm giả tưởng, trong đó một gói độc hại vượt qua bảy cổng bảo mật dùng AI. Mỗi hệ thống thất bại theo một cách khác nhau: tin vào chỉ dẫn được giấu trong nội dung, hết cửa sổ ngữ cảnh trước khi đọc tới mã độc, tự động đóng cảnh báo chính xác hoặc giả định rằng một tác nhân khác đã kiểm tra mã nguồn.

Qua chuỗi tình huống ngày càng phi lý, bài viết phê phán việc trao quyền cho các tác nhân tự động mà thiếu kiểm chứng, giới hạn quyền truy cập và sự tham gia thực chất của con người. Lớp phòng thủ chỉ có ý nghĩa khi các thành phần đánh giá độc lập, lỗi được hiển thị rõ ràng, cảnh báo có đường chuyển cấp đáng tin cậy và con người thật sự xuất hiện trong quy trình ra quyết định.

**Điểm chính:**
- Nhiều cổng AI nối tiếp không tạo ra phòng thủ chiều sâu nếu chúng cùng chia sẻ giả định và kiểu thất bại.
- Nội dung không đáng tin cậy có thể thao túng tác nhân nếu dữ liệu và chỉ dẫn không được tách biệt.
- Tự động hóa xử lý cảnh báo có thể che khuất phát hiện đúng và gây thêm thiệt hại khi được cấp quyền quá rộng.
- Lỗi của mô hình hoặc dịch vụ phải được báo rõ, không được mặc định diễn giải thành “không có phát hiện”.
- Con người trong vòng kiểm soát phải là một cơ chế vận hành thật, không chỉ là câu chữ trong hợp đồng.

## [CORS: What is it protecting?](https://sanyamserver.online/posts/cors/)

Bài viết làm rõ rằng CORS là cơ chế bảo mật do trình duyệt thực thi, không phải hàng rào bảo vệ máy chủ. Với yêu cầu khác nguồn, trình duyệt gửi tiêu đề `Origin`, đối chiếu phản hồi với `Access-Control-Allow-Origin` và chỉ cho mã JavaScript đọc nội dung khi nguồn được phép. Máy chủ vẫn có thể đã nhận, xử lý và trả lời yêu cầu; công cụ như `curl` hoặc Postman không bị ràng buộc bởi quy tắc này.

Các yêu cầu không đơn giản thường có bước kiểm tra trước bằng phương thức `OPTIONS`, nhưng CORS vẫn không thay thế xác thực, phân quyền hay bảo vệ CSRF. Một yêu cầu độc hại có thể gây thay đổi dữ liệu dù trình duyệt chặn mã phía tấn công đọc phản hồi. Để ngăn CSRF, máy chủ cần kiểm soát yêu cầu trước khi hành động bằng thuộc tính cookie `SameSite`, mã chống CSRF hoặc kiểm tra `Origin` và `Referer`.

**Điểm chính:**
- CORS quyết định mã JavaScript từ nguồn khác có được đọc phản hồi hay không.
- Việc trình duyệt báo lỗi CORS không có nghĩa là yêu cầu chưa tới hoặc chưa được máy chủ xử lý.
- Bước kiểm tra trước xác minh phương thức và tiêu đề được phép trước khi gửi một số yêu cầu khác nguồn.
- `Access-Control-Allow-Credentials: true` cần một nguồn cụ thể và không thể kết hợp với ký tự đại diện `*`.
- CORS bảo vệ việc đọc phản hồi; CSRF liên quan đến việc máy chủ có nên chấp nhận yêu cầu đã xác thực hay không.

## [Data Access Patterns That Makes Your CPU Really Angry](https://blog.weineng.me/posts/slowest_add/)

Bài viết thực hiện một thí nghiệm ngược đời: tìm thứ tự truy cập chậm nhất để cộng các số trong một mảng. Quét tuần tự là nhanh nhất nhờ bộ nhớ đệm và cơ chế nạp trước của CPU, còn truy cập ngẫu nhiên chậm hơn hơn mười lần. Tuy nhiên, bằng cách chủ động tạo mẫu truy cập bất lợi cho phần cứng, tác giả còn làm phép cộng chậm hơn truy cập ngẫu nhiên khoảng 33%.

Mẫu cuối cùng giãn các lần đọc theo dòng bộ nhớ đệm, trang nhớ và nhóm mục nhập bảng trang để phá tính cục bộ, gây xung đột trong bộ nhớ đệm và tăng chi phí dịch địa chỉ. Tác giả còn thử gom truy cập theo hàng và ngân hàng DRAM nhằm giảm khả năng xử lý song song, dù ánh xạ địa chỉ vật lý của nền tảng không được công bố khiến phần tối ưu này chỉ mang tính xấp xỉ.

**Điểm chính:**
- Truy cập tuần tự nhanh vì tận dụng tốt tính cục bộ, dòng bộ nhớ đệm và cơ chế nạp trước.
- Bước nhảy theo trang có thể khiến nhiều địa chỉ cạnh tranh cùng một tập trong bộ nhớ đệm.
- Bước nhảy tám trang làm giảm khả năng tái sử dụng mục nhập bảng trang và tăng chi phí dịch địa chỉ.
- Khoảng cách tái sử dụng lớn khiến dữ liệu bị loại khỏi bộ nhớ đệm trước lần đọc tiếp theo.
- Hiểu nguyên nhân của hiệu năng kém giúp xây dựng mẫu truy cập còn tệ hơn cả thứ tự ngẫu nhiên.
