---
title: "Newsletter #127"
date: 2026-07-29
tags: ["AI-Assisted", "AI Agents", "Security", "Web Security", "Go", "Performance", "Systems Programming"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #127.*

## [A return to two-pizza culture](https://www.allthingsdistributed.com/2026/06/return-to-two-pizza-culture.html)

Werner Vogels nhìn lại mô hình nhóm “hai chiếc pizza” từng giúp Amazon tăng tốc: nhóm đủ nhỏ để mọi người hiểu công việc của nhau, sở hữu sản phẩm từ đầu đến cuối và tự quyết những việc có thể đảo ngược mà không phải chờ phê duyệt. Khi công ty mở rộng lên hàng trăm dịch vụ, phụ thuộc chéo, tầng quản lý và vòng xét duyệt dễ bào mòn chính sự linh hoạt đó. Theo tác giả, các tác nhân lập trình như Kiro đang thay đổi bài toán, vì một sản phẩm mẫu giờ có thể ra đời trong vài giờ thay vì vài tháng.

Qua câu chuyện nhóm Amazon Quick bản máy tính, nơi sản phẩm mẫu đầu tiên được dựng chỉ trong một buổi tối rồi nhanh chóng thu hút thêm người đóng góp, Vogels đề xuất điều chỉnh quy trình Working Backwards. Khi đã tin vào vấn đề của khách hàng nhưng chưa chắc về giải pháp, hãy xây dựng sản phẩm mẫu trước, tự sử dụng hằng ngày, sửa lỗi ngay khi gặp và chỉ viết tài liệu sau khi đã học được từ trải nghiệm thực tế. Việc viết vẫn quan trọng để làm rõ tư duy, nhưng không còn là cách duy nhất để biến ý tưởng thành thứ cụ thể. Ngay cả khi nhóm lớn lên hàng trăm người, việc giữ cấu trúc gồm nhiều nhóm nhỏ có trách nhiệm trọn vẹn giúp tốc độ đổi mới không bị trì trệ. Công cụ AI không thay thế phán đoán của con người, mà rút ngắn vòng phản hồi giữa ý tưởng và thực tế.

## [A peek into Reddit's anti-spam internals](https://lyra.horse/blog/2026/06/reddit-spam-internals/)

Năm 2021, một lỗi hiển thị ngắn ngủi khiến lý do gỡ nội dung nội bộ của Reddit xuất hiện trước người kiểm duyệt. Từ những ảnh chụp màn hình đó, cùng mã nguồn Reddit cũ và các tài liệu công khai, tác giả phác họa cách nền tảng này chống thư rác. Không có bộ lọc duy nhất nào cả: Spamurai, hệ thống luật chính từ năm 2020, kết hợp tuổi và điểm uy tín tài khoản, báo cáo của người dùng, nhà cung cấp mạng, dấu vân tay trình duyệt qua TLS và user-agent, tên miền email cùng thói quen đăng bài. Bên cạnh đó là danh sách tên miền bị cấm từ năm 2012, các thế hệ REV1 và REV2, bộ lọc từ khóa, việc tải trang được liên kết để tìm mã định danh chung giữa các tên miền, và dịch vụ phân loại ảnh bên ngoài.

Bài viết cũng cho thấy từng tín hiệu riêng lẻ có thể mong manh đến mức nào. Với Perspective API của Google, chỉ cần chèn vài cặp chữ cái ngẫu nhiên, điểm thư rác của một đoạn văn đã giảm từ 86% xuống 1%. Vì vậy hệ thống thực tế phải tổng hợp nhiều nguồn dữ liệu và học thêm từ hành động của người kiểm duyệt. Tác giả cho rằng giờ đây công bố các chi tiết này đã an toàn, vì Perspective API đóng cửa trong năm 2026 và thư rác do mô hình ngôn ngữ lớn tạo ra buộc Reddit phải thay đổi đáng kể. Đây là lời nhắc rằng cơ chế chống lạm dụng luôn phải thích nghi theo kỹ thuật của kẻ tấn công.

## [Understanding the Go Runtime: Profiling](https://internals-for-interns.com/posts/go-runtime-profiling/)

Bài viết giải thích cơ chế bên trong của năm loại hồ sơ hiệu năng trong Go: CPU, vùng nhớ động, chờ, tranh chấp khóa và goroutine. Dù trông khác nhau, tất cả đều ghi lại ngăn xếp lời gọi và xuất ra cùng một định dạng `pprof` nén: mỗi mẫu chỉ giữ danh sách mã vị trí cùng các giá trị đo, còn vị trí, hàm và chuỗi được lưu trong các bảng dùng chung để hàng nghìn ngăn xếp giống nhau không bị lặp dữ liệu. Điểm khác biệt thực sự nằm ở cách mỗi loại hồ sơ ghi nhận ngăn xếp.

Hồ sơ CPU thu thập theo dòng: hệ điều hành gửi tín hiệu ngắt luồng khoảng 100 lần mỗi giây, ngăn xếp được ghi vào bộ đệm vòng không khóa rồi một goroutine nền liên tục đưa vào bảng tổng hợp, chấp nhận bỏ một số mẫu để không làm dừng luồng đang chạy. Hồ sơ vùng nhớ động tổng hợp tại chỗ: bộ cấp phát lấy mẫu khoảng một lần cho mỗi 512 KiB, gộp ngay vào bảng nhóm theo ngăn xếp để ước lượng cả lượng cấp phát lẫn lượng còn sử dụng. Hồ sơ chờ và tranh chấp khóa dùng lại hạ tầng đó nhưng đo thời gian chờ, một bên ghi goroutine kết thúc chờ, bên kia ghi khóa gây tranh chấp khi được nhả, rồi nhân kết quả lên để ước lượng tổng thực. Riêng hồ sơ goroutine là ảnh chụp theo yêu cầu, lấy ngăn xếp của mọi goroutine đang sống qua cơ chế hai pha để giảm thời gian tạm dừng chương trình. Bài học chung là runtime âm thầm xử lý rất nhiều phức tạp để việc đo hiệu năng trông thật đơn giản.

## [Incident Report: CVE-2026-LGTM](https://nesbitt.io/2026/06/26/incident-report-cve-2026-lgtm.html)

Đây là một báo cáo sự cố châm biếm về cuộc tấn công chuỗi cung ứng phần mềm giả tưởng, trong đó gói độc hại `foxhole-lz4` vượt qua bảy cổng bảo mật dùng AI, mỗi cổng thất bại một kiểu. Cổng phát hành tin vào dòng chữ trắng bị giấu khẳng định gói đã được kiểm tra thủ công. Một trình quét bị phân tâm bởi hình minh họa nhúng trong gói, ba trình quét thương mại hết cửa sổ ngữ cảnh vì nội dung độn trước khi đọc tới mã độc. Hệ thống duy nhất phát hiện đúng hành vi đánh cắp thông tin lại bị trợ lý AI của kho mã gạt đi như mã đo đạc thông thường, còn người dùng báo cáo thật sự thì bị bot phân loại giới hạn truy cập vì “hoạt động đáng ngờ”.

Rồi hai tác nhân đánh giá tốn hơn 41.000 USD để tranh cãi với nhau, rồi tác nhân khắc phục sự cố ký cả một “hiệp ước” với tác nhân của kẻ tấn công. Cuối cùng, chính một tệp bẫy do con người đặt sẵn mới chặn được cuộc tấn công. Nguyên nhân gốc được tóm gọn: bảy mô hình xếp nối tiếp, sáu cái giả định cái khác đã đọc mã, cái thứ bảy đọc xong thì xin lỗi. Bài viết phê phán việc trao quyền rộng cho tác nhân tự động mà thiếu kiểm chứng: nhiều lớp dùng cùng mô hình nền chỉ tạo ảo giác đa dạng; dữ liệu không đáng tin cần tách khỏi chỉ dẫn; lỗi của mô hình không được hiểu thành “không có phát hiện”; và con người trong vòng kiểm soát phải là cơ chế vận hành thật chứ không chỉ là điều khoản trong hợp đồng.

## [CORS: What is it protecting?](https://sanyamserver.online/posts/cors/)

Bài viết làm rõ một hiểu lầm phổ biến: CORS là cơ chế bảo mật do trình duyệt thực thi, không phải hàng rào bảo vệ máy chủ. Với yêu cầu khác nguồn, trình duyệt gắn tiêu đề `Origin`, đối chiếu phản hồi với `Access-Control-Allow-Origin` và chỉ cho mã JavaScript đọc nội dung khi nguồn được phép. Máy chủ vẫn đã nhận và xử lý yêu cầu, trình duyệt chỉ vứt bỏ phản hồi; thử bằng `curl` hay Postman sẽ thấy máy chủ trả lời bình thường. Các yêu cầu phức tạp hơn, như dùng phương thức khác GET/POST/HEAD, tiêu đề tùy chỉnh hay nội dung JSON, sẽ có bước kiểm tra trước bằng `OPTIONS` để hỏi máy chủ chấp nhận nguồn, phương thức và tiêu đề nào.

Điều CORS thực sự bảo vệ là việc đọc dữ liệu: một trang độc hại không thể lấy thông tin tài khoản ngân hàng của bạn dù trình duyệt đang giữ cookie đăng nhập. Tuy nhiên, CORS không ngăn được CSRF. Một yêu cầu POST dạng biểu mẫu không cần kiểm tra trước, nên máy chủ đã thực thi xong và gây thay đổi dữ liệu trước khi trình duyệt chặn việc đọc phản hồi. Để phòng CSRF, cần bảo vệ ở phía yêu cầu bằng thuộc tính cookie `SameSite`, mã chống CSRF hoặc kiểm tra `Origin` và `Referer` trên máy chủ. Nói cách khác, CORS và chống CSRF giải quyết hai bài toán khác nhau và không nên bị nhầm lẫn.

## [Data Access Patterns That Makes Your CPU Really Angry](https://blog.weineng.me/posts/slowest_add/)

Bài viết thực hiện một thí nghiệm ngược đời: tìm thứ tự truy cập chậm nhất để cộng các phần tử của một mảng 2^26 phần tử. Quét tuần tự nhanh nhất, khoảng 132 triệu chu kỳ, nhờ bộ nhớ đệm và cơ chế nạp trước của CPU, còn truy cập ngẫu nhiên, vốn được xem là trường hợp tệ nhất, mất khoảng 1,57 tỷ chu kỳ. Tác giả lần lượt thử các mẫu truy cập cách nhau một dòng bộ nhớ đệm, cách nhau một trang nhớ, và kết hợp cả hai. Nhảy theo trang đặc biệt hiệu quả vì bộ nạp trước phần cứng không vượt qua ranh giới trang 4KB, đồng thời khiến nhiều địa chỉ tranh nhau cùng một tập trong bộ nhớ đệm L1.

Mẫu tệ nhất là bước nhảy tám trang, tức khoảng 32KB giữa hai lần đọc, mất khoảng 2,06 tỷ chu kỳ, chậm hơn truy cập ngẫu nhiên khoảng 33%. Nó cùng lúc làm bão hòa bộ nhớ đệm, vô hiệu hóa việc nạp trước, xóa bỏ khả năng tái sử dụng dòng bộ nhớ đệm và phá tính cục bộ của các mục nhập bảng trang, làm tăng chi phí dịch địa chỉ. Tác giả còn thử gom truy cập theo hàng và ngân hàng DRAM để giảm khả năng xử lý song song, dù ánh xạ địa chỉ vật lý không được công bố nên phần này chỉ mang tính xấp xỉ. Hiểu vì sao một mẫu truy cập làm CPU chậm như vậy giúp lập trình viên nhận ra các giới hạn của bộ nhớ đệm, bộ nạp trước và cơ chế dịch địa chỉ trong mã nguồn hằng ngày.

---

*Bài viết đã được viết lại bởi Claude Code với Opus 5.5 vào ngày 27/09/2026.*
