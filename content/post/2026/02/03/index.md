---
title: "Newsletter #80"
date: 2026-02-03
tags: ["AI-Assisted", "Newsletter", "AI Agents", "Go", "Databases", "Developer Tools", "IntelliJ IDEA"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #80.*

## [Thư Mục Kỹ Năng Của Tác Nhân](https://www.skills.sh/)

Skills.sh là một hệ sinh thái mở dành cho các kỹ năng của tác nhân trí tuệ nhân tạo, nơi tập hợp hàng ngàn kỹ năng có thể tái sử dụng để nâng cao khả năng của các tác nhân trí tuệ nhân tạo. Mỗi kỹ năng là một khả năng chuyên biệt có thể được cài đặt chỉ với một lệnh duy nhất, giúp các tác nhân trí tuệ nhân tạo tiếp cận các kiến thức quy trình chuẩn hóa.

Trang web cung cấp bảng xếp hạng các kỹ năng phổ biến nhất với số lần cài đặt thực tế, cho phép người dùng dễ dàng tìm kiếm và khám phá các kỹ năng phù hợp với nhu cầu của mình. Các kỹ năng hàng đầu bao gồm các công cụ tìm kiếm kỹ năng, hướng dẫn tốt nhất cho React và Next.js, các quy trình thiết kế web, và nhiều kỹ năng khác liên quan đến phát triển giao diện, máy chủ, kiểm thử, và vận hành.

Điểm đặc biệt của hệ sinh thái này là tính cộng đồng và khả năng mở rộng - bất kỳ ai cũng có thể đóng góp và chia sẻ các kỹ năng của mình, tạo nên một kho tàng kiến thức tập thể liên tục phát triển. Các tác nhân có thể tận dụng các kỹ năng này để thực hiện các tác vụ phức tạp một cách chuyên nghiệp và hiệu quả hơn, từ viết mã, kiểm thử, đến triển khai và vận hành.

**Điểm chính:**
- Kho kỹ năng mở với hàng ngàn kỹ năng có thể cài đặt bằng một lệnh
- Bảng xếp hạng theo số lần cài đặt và xu hướng 24 giờ
- Hỗ trợ nhiều loại tác nhân và khung làm việc phổ biến
- Cộng đồng sôi nổi với các kỹ năng từ Vercel, Anthropic, Expo, Supabase

## [Kết quả Khảo sát Nhà phát triển Go 2025](https://go.dev/blog/survey2025)

Go Team đã công bố kết quả khảo sát nhà phát triển Go năm 2025 với dữ liệu từ 5.379 người tham gia. Khảo sát lần này tập trung vào cảm nhận của nhà phát triển về ngôn ngữ Go, các trường hợp sử dụng, thách thức và môi trường phát triển.

Ba phát hiện quan trọng nhất từ khảo sát: các nhà phát triển Go cần hỗ trợ về việc xác định và áp dụng các phương pháp tốt nhất, tận dụng tối đa thư viện chuẩn, và mở rộng ngôn ngữ với các tính năng hiện đại hơn. Hầu hết các nhà phát triển Go hiện đang sử dụng công cụ phát triển hỗ trợ bởi trí tuệ nhân tạo khi tìm kiếm thông tin hoặc viết mã lặp lại, nhưng mức độ hài lòng chỉ ở mức trung bình do lo ngại về chất lượng mã nguồn. Một tỷ lệ đáng ngạc nhiên là số người tham gia cho biết họ thường xuyên cần xem lại tài liệu cho các lệnh go cơ bản như `go build`, `go run`, và `go mod`, cho thấy có chỗ cải thiện lớn cho hệ thống trợ giúp của lệnh `go`.

Về mức độ hài lòng, 91% người tham gia cho biết họ hài lòng khi làm việc với Go, trong đó gần 2/3 là "rất hài lòng". Con số này đã ổn định kể từ năm 2019. Các trường hợp sử dụng chính vẫn là dòng lệnh và dịch vụ ứng dụng lập trình, với 55% người tham gia xây dựng cả hai. Hơn 1/3 xây dựng công cụ cơ sở hạ tầng đám mây, và 11% làm việc với các mô hình máy học, công cụ, hoặc tác nhân.

**Điểm chính:**
- 91% nhà phát triển Go hài lòng với ngôn ngữ, mức ổn định kể từ năm 2019
- 53% người tham gia sử dụng công cụ trí tuệ nhân tạo hàng ngày nhưng chỉ 13% "rất hài lòng"
- Thách thức lớn nhất: tuân thủ điển lệ Go, thiếu tính năng từ ngôn ngữ khác, tìm mô-đun tin cậy
- 60% phát triển trên macOS, 58% trên Linux, 96% triển khai lên hệ thống dựa trên Linux

## [Một Đánh Giá Trung Thực Về Go](https://benraz.dev/blog/golang_review.html)

Bài viết này chia sẻ trải nghiệm cá nhân của tác giả sau vài tháng làm việc với Go, với cái nhìn từ một người có nền tảng Rust. Tác giả phân tích những điểm mạnh và điểm yếu của ngôn ngữ này từ góc nhìn thực tế.

Về điểm mạnh, Go làm rất tốt việc xử lý đồng thời với goroutines và channels được tích hợp sâu vào ngôn ngữ, tránh được vấn đề "colored functions" mà nhiều ngôn ngữ khác gặp phải. Hệ thống kiểu đơn giản, không cho phép kế thừa phức tạp, với struct embedding là một tính năng thú vị. Các giao diện trong Go không cần được triển khai một cách rõ ràng, giúp giảm mã soạn sẵn. Cú pháp của Go cũng được đánh giá là gọn gàng, với quy tắc khả kiến dựa trên chữ hoa chữ thường rất trực quan.

Tuy nhiên, tác giả cũng chỉ ra những điểm yếu đáng kể. Thiếu kiểu liệt kê thực sự là một vấn đề lớn - giải pháp thay thế với hằng số và iota không đảm bảo an toàn kiểu và không có kiểm tra đầy đủ. Go cũng thiếu bất biến đúng đắn: hằng số chỉ hoạt động với giá trị thời gian biên dịch, còn biến bình thường thì có thể bị biến đổi bất cứ lúc nào. Hệ thống xử lý lỗi tuy đơn giản nhưng không thực sự hữu dụng - kiểu lỗi chỉ là một giao diện với phương thức Error(), khiến việc xử lý lỗi theo loại trở nên khó khăn, đôi khi phải phân tích chuỗi để xác định loại lỗi.

**Điểm chính:**
- Goroutines và channels là một trong những mô hình đồng thời tốt nhất hiện có
- Hệ thống kiểu đơn giản, giao diện không cần triển khai rõ ràng
- Thiếu kiểu liệt kê thực sự với kiểm tra đầy đủ
- Hằng số chỉ là thời gian biên dịch, không có bất biến thực sự cho giá trị thời gian chạy
- Xử lý lỗi thiếu thông tin kiểu, thường phải phân tích chuỗi lỗi

## [Những Thách Thức Của Soft Delete](https://atlas9.dev/blog/soft-delete.html)

Bài viết này phân tích các vấn đề của mẫu xóa mềm phổ biến (thêm cột `archived_at` hoặc `deleted` vào bảng) và đề xuất các giải pháp thay thế. Tác giả chỉ ra rằng xóa mềm tuy đơn giản ban đầu nhưng tạo ra nhiều phức tạp: dữ liệu chết tích lũy trong cơ sở dữ liệu, truy vấn phải luôn lọc bỏ các bản ghi đã lưu trữ, việc di chuyển dữ liệu trở nên phức tạp, và việc khôi phục không đơn giản như chỉ đặt `archived_at = null`.

Tác giả đề xuất ba giải pháp thay thế cho PostgreSQL. Cách đầu tiên là lưu trữ ở cấp ứng dụng - phát ra sự kiện khi xóa và lưu trữ ở dịch vụ khác. Cách thứ hai là sử dụng trình kích hoạt để sao chép các hàng vào bảng lưu trữ trước khi xóa. Cách thứ ba là Thu thập dữ liệu thay đổi dựa trên nhật ghi trước với Debezium hoặc các công cụ tương tự. Mỗi cách đều có sự đánh đổi riêng về độ phức tạp vận hành, độ tin cậy, và chi phí hạ tầng.

Nếu bắt đầu dự án mới hôm nay, tác giả sẽ chọn cách tiếp cận dựa trên trình kích hoạt vì đơn giản thiết lập, giữ bảng chính sạch sẽ, và không cần thêm hạ tầng phức tạp. Bảng lưu trữ dễ truy vấn khi cần và dễ bỏ qua khi không dùng.

**Điểm chính:**
- Xóa mềm với `archived_at` tạo ra nhiều phức tạp: truy vấn phức tạp, dữ liệu chết tích lũy, di chuyển dữ liệu khó khăn
- Lưu trữ ở cấp ứng dụng: đơn giản cho cơ sở dữ liệu nhưng dễ mất dữ liệu nếu có lỗi, hạ tầng phức tạp
- Cách tiếp cận dựa trên trình kích hoạt: đơn giản, giữ bảng sạch, lưu trữ dễ truy vấn và dọn dẹp
- Thu thập dữ liệu thay đổi (Debezium): không thay đổi mã ứng dụng nhưng hạ tầng phức tạp
- Bản sao không xử lý DELETE: ý tưởng mới, chưa kiểm tra, có thể hoạt động cho lưu trữ

## [Được Trả Lương Tối Thiểu Để Giải Một Bài Toán Bất Khả Thi](https://tiespetersen.substack.com/p/i-got-paid-minimum-wage-to-solve)

Bài viết này kể về câu chuyện có thật của tác giả - một sinh viên khoa học máy tính được trả lương tối thiểu để lau cửa hàng Albert Heijn. Thay vì làm công việc một cách bình thường, tác giả đã biến nó thành một bài toán tối ưu hóa: chuyển bản đồ cửa hàng thành đồ thị, xây dựng trình soạn thảo trực quan bằng Processing, và viết bộ tối ưu hóa lộ trình bằng C++ sử dụng thuật toán luyện giả kim.

Tuy nhiên, giải pháp đầu tiên của thuật toán là một thảm họa - một con đường ngắn nhất về mặt kỹ thuật nhưng hoàn toàn vô dụng trong thực tế với hàng десят rẽ sắc góc. Tác giả nhận ra mình đang tối ưu hóa sai thứ: khoảng cách không phải là tất cả, số lần rẽ quay quan trọng hơn, đà chuyển động quan trọng hơn. Sau khi thêm "hình phạt rẽ" vào hàm chi phí, thuật toán tạo ra những con đường mượt mà hơn dù dài hơn một chút.

Bài viết mở rộng bài học này sang nhiều khía cạnh khác của cuộc sống. Các thuật toán mạng xã hội tối ưu hóa cho mức độ tương tác chứ không phải hạnh phúc. Các thuật toán gợi ý tối ưu hóa cho thời gian xem khiến người dùng xem các lý thuyết âm mưu 6 tiếng liên tục. Các mô hình ngôn ngữ lớn tối ưu hóa cho việc nghe có tự tin chứ không phải đúng sự thật. Các doanh nghiệp tối ưu hóa cho lợi nhuận mà bỏ qua môi trường và đạo đức. Sự chính xác về mặt kỹ thuật là vô giá trị nếu bạn đang giải sai vấn đề.

**Điểm chính:**
- Thuật toán luyện giả kim có thể giải bài toán người bán du lịch cho việc lau nhà siêu thị
- Tối ưu hóa sai chỉ số (khoảng cách) tạo ra giải pháp kỹ thuật hoàn hảo nhưng thực tế vô dụng
- Lộ trình A ngắn nhất nhưng không thể đi được; lộ trình B dài hơn nhưng thực tế
- Mạng xã hội, hệ thống gợi ý, LLM đều tối ưu hóa cho sai mục tiêu
- Sự chính xác kỹ thuật vô nghĩa nếu đang giải sai vấn đề từ đầu

## [Hoàn Thành Lệnh Trong IntelliJ IDEA Ít Phím Tắt Hơn](https://foojay.io/today/command-completion-intellij-idea/)

Bài viết giới thiệu tính năng hoàn thành lệnh mới trong IntelliJ IDEA - một phần mở rộng của tính năng hoàn thành mã thông thường cho phép người dùng khám phá và thực thi các hành động của môi trường phát triển tích hợp ngay từ trình soạn thảo mà không cần nhớ các phím tắt. Thay vì phải nhớ hàng tá phím tắt, bạn chỉ cần gõ `.` để xem các lệnh trong danh sách hoàn thành thông thường hoặc `..` để chỉ xem các lệnh.

Tính năng này giúp sửa lỗi và cảnh báo trong mã, thực hiện các hành động ở cấp tệp hoặc cấp lớp như định dạng lại mã hoặc tối ưu hóa nhập khẩu, hỗ trợ tái cấu trúc và biến đổi mã như tạo lớp, phương thức, trường, hoặc chuyển đổi lớp thành bản ghi. Bạn cũng có thể dùng nó để điều hướng, đổi tên lớp, và thậm chí thêm JavaDoc. Một số lệnh còn có bí danh giúp bạn không cần nhớ tên chính xác.

Hoàn thành lệnh bổ sung cho các tính năng hiện có như hoàn thành hậu tố và mẫu trực tiếp, giữ cho bạn trong trạng thái lập trình mượt mà. Bạn có thể tập trung vào những gì mình muốn làm thay vì làm thế nào để làm. Tính năng này giúp khám phá các tính năng mạnh mẽ mà bạn có thể chưa từng biết đến.

**Điểm chính:**
- Gõ `..` để xem tất cả các lệnh có sẵn trong ngữ cảnh hiện tại
- Sửa lỗi, cảnh báo, thực hiện hành động cấp tệp mà không cần nhớ phím tắt
- Hỗ trợ tái cấu trúc, tạo mã, biến đổi mã sang Java hiện đại
- Có thể dùng trong tệp chỉ đọc sau khi bật trong cài đặt
- Bí danh cho các lệnh giúp không cần nhớ tên chính xác

### Bonus

**Images:**
![The Must-Know Fundamentals of Distributed Systems](https://substack-post-media.s3.amazonaws.com/public/images/8d53556e-5fbc-4ceb-ac64-cc5f3b211c5d_2250x2624.png)
![What Happens When You Enter Google.com](https://substackcdn.com/image/fetch/$s_!yb_V!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F16cec58a-02f8-4daf-8669-d1208ac5fc18_2360x2960.jpeg)
![Understanding the Linux Directory Structure](https://substackcdn.com/image/fetch/$s_!LIIv!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F631f49cf-2eff-4941-ba22-b2c482eb24ec_2360x2960.png)
![Symmetric vs. Asymmetric Encryption](https://substackcdn.com/image/fetch/$s_!gxq4!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F11498f7e-5457-425f-9d50-90f5ebc31187_2360x2960.jpeg)
![Network Troubleshooting Test Flow](https://substackcdn.com/image/fetch/$s_!XFaF!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5140ecd2-ac9e-46d1-bde6-00f727309778_800x1003.jpeg)


**Videos:**
[Tác Nhân Trí Tuệ Nhân Tạo Là Gì & Chúng Hoạt Động Như Thế Nào?](https://www.youtube.com/watch?v=oP6DS_x5K0Y)

---

*Bài viết đã được review và cập nhật bởi Claude Code với Opus 4.7 (1M context).*
