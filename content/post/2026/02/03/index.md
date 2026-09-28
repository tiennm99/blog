---
title: "Newsletter #80"
date: 2026-02-03
tags: ["AI-Assisted", "Newsletter", "AI Agents", "Go", "Databases", "Developer Tools", "IntelliJ IDEA"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #80.*

## [The Agent Skills Directory](https://www.skills.sh/)

Skills.sh là thư mục mở tập hợp các kỹ năng (skill) dành cho tác nhân AI. Mỗi kỹ năng đóng gói một năng lực chuyên biệt, chẳng hạn quy trình thiết kế giao diện, hướng dẫn thực hành tốt cho React và Next.js, cách rà soát mã nguồn hay gỡ lỗi, và có thể cài vào tác nhân chỉ bằng một lệnh duy nhất. Nhờ vậy, tác nhân được tiếp cận những kiến thức quy trình đã được chuẩn hóa thay vì phải tự mò mẫm từ đầu mỗi lần làm việc.

Trang web có bảng xếp hạng kỹ năng theo tổng số lượt cài đặt, kèm các mục xu hướng trong 24 giờ và kỹ năng đang nổi, giúp người dùng dễ dàng tìm kiếm và chọn kỹ năng phù hợp với nhu cầu. Đây là hệ sinh thái mang tính cộng đồng: bất kỳ ai cũng có thể đóng góp và chia sẻ kỹ năng, bên cạnh các bộ kỹ năng đến từ những tên tuổi như Vercel, Anthropic, Expo hay Supabase. Với lập trình viên mới, đây là nơi thuận tiện để trang bị thêm cho tác nhân AI những năng lực trải dài từ viết mã, kiểm thử đến triển khai và vận hành.

## [Results from the 2025 Go Developer Survey](https://go.dev/blog/survey2025)

Nhóm phát triển Go đã công bố kết quả khảo sát năm 2025 với 5.379 người tham gia. Ba phát hiện lớn nhất là: lập trình viên Go cần thêm hỗ trợ để xác định và áp dụng các thực hành tốt, tận dụng tối đa thư viện chuẩn, đồng thời mong muốn ngôn ngữ và bộ công cụ đi kèm có thêm tính năng hiện đại; phần lớn đã dùng công cụ lập trình hỗ trợ bởi AI để tra cứu thông tin hoặc viết mã lặp lại, nhưng mức độ hài lòng chỉ ở mức trung bình; và một tỷ lệ bất ngờ người tham gia thường xuyên phải xem lại tài liệu của các lệnh cơ bản như `go build`, `go run` hay `go mod`, cho thấy hệ thống trợ giúp của lệnh `go` còn nhiều chỗ cần cải thiện.

Về cảm nhận chung, 91% người tham gia hài lòng khi làm việc với Go, gần 2/3 "rất hài lòng", và con số này ổn định kể từ năm 2019. Ba khó khăn lớn nhất là viết mã theo đúng thành ngữ (idiom) của Go, thiếu những tính năng quen thuộc từ ngôn ngữ khác, và khó tìm được mô-đun đáng tin cậy. Với công cụ AI, 53% dùng hằng ngày nhưng chỉ 13% "rất hài lòng", chủ yếu vì mã sinh ra thường không chạy được hoặc kém chất lượng. Các ứng dụng chính vẫn là công cụ dòng lệnh và dịch vụ API, với 55% xây dựng cả hai; hơn 1/3 làm công cụ hạ tầng đám mây và 11% làm việc với mô hình học máy, công cụ hoặc tác nhân. Về môi trường, 60% phát triển trên macOS, 58% trên Linux, và 96% triển khai lên hệ thống dựa trên Linux.

## [An Honest Review of Go](https://benraz.dev/blog/golang_review.html)

Tác giả, một người đến từ Rust, chia sẻ cảm nhận ban đầu sau vài tháng viết Go với những dự án nhỏ. Điểm mạnh nổi bật nhất là xử lý đồng thời: goroutine và channel được tích hợp sẵn vào ngôn ngữ, dễ dùng và tránh được vấn đề "hàm có màu" (colored functions) mà nhiều mô hình đồng thời khác gặp phải. Hệ thống kiểu cố ý giữ đơn giản, không có cây kế thừa phức tạp; struct embedding thực chất chỉ là cú pháp rút gọn. Một kiểu dữ liệu không cần khai báo tường minh việc hiện thực một interface, nhờ đó các hàm như `Printf` hay thư viện template trở nên dễ viết mà không cần macro. Tác giả cũng thích cú pháp gọn và quy tắc dùng chữ hoa, chữ thường để quyết định phạm vi truy cập.

Ngược lại, Go có những điểm yếu đáng kể. Ngôn ngữ không có kiểu liệt kê (enum) thực sự: cách thay thế bằng hằng số và `iota` không đảm bảo giá trị nằm trong một tập đóng, còn câu lệnh `switch` cũng không kiểm tra đã xét đủ mọi trường hợp. Go thiếu tính bất biến đúng nghĩa, vì `const` chỉ nhận giá trị xác định lúc biên dịch, còn biến khai báo bằng `var` và được xuất ra khỏi package thì ai cũng có thể sửa. Cuối cùng, kiểu `error` chỉ là một interface với phương thức `Error()`, nên thông tin chi tiết về lỗi thường bị che giấu, buộc người dùng đôi khi phải phân tích chuỗi thông báo để biết loại lỗi. So với Rust có enum và kiểu tổng (sum type), lỗi trong Go vẫn là giá trị nhưng không thật sự hữu ích.

## [The challenges of soft delete](https://atlas9.dev/blog/soft-delete.html)

Xóa mềm, tức thêm cột `archived_at` hoặc `deleted` vào bảng, trông đơn giản lúc đầu nhưng theo tác giả lại kéo theo nhiều phức tạp về sau. Dữ liệu chết tích lũy dần trong cơ sở dữ liệu vì 99% bản ghi đã lưu trữ không bao giờ được đọc lại; mọi truy vấn và chỉ mục đều phải nhớ loại bỏ các bản ghi này; việc di chuyển dữ liệu (migration) phải tính đến cả những bản ghi cũ; còn khôi phục một bản ghi không chỉ đơn giản là đặt `archived_at = null` vì có thể phải gọi tới các hệ thống bên ngoài.

Tác giả đề xuất ba cách thay thế trên PostgreSQL, đều tách dữ liệu lưu trữ khỏi dữ liệu đang dùng. Thứ nhất là lưu trữ ở tầng ứng dụng: phát sự kiện khi xóa để một dịch vụ khác lưu lại, giúp cơ sở dữ liệu gọn hơn nhưng dễ mất dữ liệu khi có lỗi và cần thêm hạ tầng. Thứ hai là dùng trigger sao chép hàng sang một bảng lưu trữ dạng JSON trước khi xóa, giữ bảng chính sạch sẽ và dọn dẹp dễ dàng. Thứ ba là thu thập dữ liệu thay đổi (CDC) từ nhật ký ghi trước (WAL) bằng Debezium hoặc công cụ tương tự, không cần sửa mã ứng dụng nhưng vận hành phức tạp và có thể làm đầy ổ đĩa máy chủ chính nếu bên tiêu thụ bị chậm. Tác giả cũng nêu ý tưởng chưa kiểm chứng về một bản sao không xử lý lệnh DELETE. Nếu bắt đầu dự án mới, tác giả sẽ chọn cách dùng trigger vì dễ thiết lập, không cần thêm hạ tầng và bảng lưu trữ vẫn truy vấn được khi cần.

## [I got paid minimum wage to solve an impossible problem.](https://tiespetersen.substack.com/p/i-got-paid-minimum-wage-to-solve)

Tác giả là một sinh viên khoa học máy tính làm thêm với công việc quét sàn siêu thị Albert Heijn. Thay vì chỉ cầm chổi, anh biến sơ đồ cửa hàng thành một đồ thị dạng lưới, xây trình soạn thảo trực quan bằng Processing và viết bộ tối ưu lộ trình bằng C++ dùng thuật toán mô phỏng luyện kim (simulated annealing) với phép biến đổi 2-opt, về bản chất là một biến thể của bài toán người du lịch. Lộ trình "tối ưu" đầu tiên gần như ngắn nhất về khoảng cách nhưng hoàn toàn vô dụng vì đầy những khúc rẽ gắt không ai đi nổi. Thuật toán đã làm đúng điều được yêu cầu, chỉ là câu hỏi đặt ra đã sai. Sau khi thêm "hình phạt rẽ" vào hàm chi phí, lộ trình trở nên mượt mà và đi được, dù dài hơn một chút; điều chỉnh mức phạt chính là cân bằng giữa hiệu quả thuần túy và tính thực tế.

Từ đó, tác giả mở rộng bài học ra nhiều lĩnh vực: thuật toán mạng xã hội tối ưu cho mức độ tương tác chứ không phải hạnh phúc, hệ thống gợi ý tối ưu cho thời gian xem đến mức người dùng xem thuyết âm mưu suốt 6 tiếng, các mô hình ngôn ngữ lớn tối ưu cho việc nghe có vẻ tự tin chứ không phải cho sự đúng đắn, còn doanh nghiệp tối ưu lợi nhuận mà bỏ qua môi trường và đạo đức. Thông điệp cốt lõi: sự chính xác về kỹ thuật là vô nghĩa nếu bạn đang giải sai bài toán, và điều quan trọng nhất là xác định mình nên tối ưu cho điều gì ngay từ đầu.

## [Command completion (..) in IntelliJ IDEA](https://foojay.io/today/command-completion-intellij-idea/)

Hoàn thành lệnh (command completion) là tính năng mới của IntelliJ IDEA, mở rộng cơ chế hoàn thành mã quen thuộc để bạn khám phá và thực thi các hành động của IDE ngay trong trình soạn thảo mà không cần nhớ phím tắt. Gõ một dấu `.` sẽ hiện các lệnh phù hợp ngữ cảnh bên cạnh gợi ý API và hoàn thành hậu tố, còn gõ `..` sẽ chỉ hiện danh sách lệnh và cho phép tìm kiếm trong đó. Tính năng này giúp sửa lỗi và cảnh báo với nhiều lựa chọn hơn `Alt+Enter`, thực hiện hành động ở cấp tệp như định dạng lại mã hay tối ưu import ngay trên một dòng trống, tạo lớp, phương thức, trường, sinh `toString()`, hoặc chuyển một lớp thành record để dùng tính năng Java hiện đại.

Bạn cũng có thể dùng nó để điều hướng, đổi tên bằng `..rename`, trích xuất phương thức, tạo biến cục bộ hay thêm JavaDoc; muốn dùng trong tệp chỉ đọc thì chỉ cần bật tùy chọn tương ứng trong cài đặt. Một số lệnh có bí danh, ví dụ `..change name` thay cho `..rename`, nên không cần nhớ chính xác tên lệnh. Hoàn thành lệnh không thay thế mà bổ sung cho phím tắt, hoàn thành hậu tố và live template, giúp bạn giữ mạch làm việc, tập trung vào việc mình muốn làm gì thay vì làm thế nào, và có thể khám phá ra những tính năng mạnh mẽ trước giờ chưa biết.

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

*Bài viết đã được viết lại bởi Claude Code với Opus 5.5 vào ngày 27/09/2026.*
