---
title: "Newsletter #82"
date: 2026-02-19
tags: ["AI-Assisted"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #82.*

## [How the Lobsters front page works](https://blog.nilenso.com/blog/2026/01/20/lobsters-front-page/)

Bài viết phân tích thuật toán xếp hạng trang chủ của Lobsters - một cộng đồng tập trung vào lĩnh vực máy tính với tính năng agregate liên kết và thảo luận. Vì mã nguồn mở, tác giả đã nghiên cứu cách thức hoạt động của thuật toán sắp xếp bài viết trên trang chủ.

Công thức cốt lõi của thuật toán khá đơn giản: `hotness = -1 × (base + order × sign + age)`, trong đó giá trị hotness càng âm thì bài viết xếp hạng càng cao. Thành phần `base` được tính từ tổng các điều chỉnh hotness của thẻ tag (nằm trong khoảng -10 đến +10) cộng với một khoản nhỏ khuyến khích cho bài tự viết. Một thẻ như `culture` hay `rant` có modifier âm, làm giảm thứ hạng ban đầu.

Thành phần `order` phản ánh mức độ tương tác thông qua logarithm của điểm số, đồng thời tính thêm điểm bình luận (mỗi upvote bình luận bằng nửa upvote bài viết). Điều này có nghĩa là tăng từ 0 lên 100 phiếu ảnh hưởng thứ hạng nhiều hơn nhiều so với tăng từ 1000 lên 1100 phiếu. Thành phần `age` tăng tuyến tính theo thời gian, đẩy các bài cũ xuống xếp hạng thấp dần.

Tác giả nhận xét thuật toán này hoạt động tốt - cho phép bài viết mới có thời gian hiển thị, trừng phạt nội dung chất lượng thấp tạo ra nhiều tranh căng, và đảm bảo không bài nào tồn tại quá lâu trên trang chủ. Tuy nhiên, tính cách của cộng đồng Lobsters không đến từ thuật toán mà từ sự điều_triệt có quan điểm, phạm vi hẹp về máy tính, và hệ thống mời dần dần xây dựng văn hóa. Tác giả cũng chia sẻ trải nghiệm cá nhân về sự ngắt kết nối giá trị với nhóm người dùng tích cực nhất trên site, và nhắc nhở rằng sự tham gia của từng người dùng là quan trọng - các upvote sớm có thể đưa bài viết lên trang chủ.

## [Software engineers can no longer neglect their soft skills](https://www.qu8n.com/posts/most-important-software-engineering-skill-2026)

Bài viết lập luận rằng bắt đầu từ năm 2026, kỹ năng giao tiếp đã trở thành kỹ năng quan trọng nhất cho kỹ sư phần mềm - không phải là viết mã, thiết kế hệ thống hay kiến thức chuyên sâu về ngôn ngữ lập trình. AI coding agent đã trở nên rất xuất sắc, tác giả chia sẻ đã chi hơn 500 USD cho Claude Code chỉ trong tháng 12 năm ngoái và sử dụng nó cho hầu hết các tác vụ lập trình không đơn giản.

Vấn đề cốt lõi là nút thắt đã chuyển từ việc cài triển khai sang việc xác định thông số kỹ thuật. Trong thực tế, các ticket hiếm khi chứa đầy đủ yêu cầu. Để làm được điều đó, kỹ sư cần: đặt câu hỏi để làm rõ các giả định mà mọi người không nhận ra themselves, điều phối các thảo luận đánh đổi, từ chối mở rộng phạm vi mà không làm hỏng mối quan hệ, và đưa ra quyết định cho những việc không ai nghĩ đến cần quy định.

Trước đây, những kỹ năng này chỉ là tùy chọn cho individual contributor. Một số nhóm cho phép kỹ sư phát triển với kỹ năng giao tiếp trung bình nhưng kỹ năng viết mã xuất sắc. Nay, các phần không liên quan đến viết mã đang trở thành không thể thương lượng. Kỹ sư phần mềm là người giải quyết vấn đề, chúng ta tin rằng mọi vấn đề đều có giải pháp và "best practice". Nhưng làm việc với con người phức tạp hơn nhiều. May mắn là chúng ta không thể dùng AI để cải thiện kỹ năng giao tiếp. Giao tiếp tốt đòi hỏi sự thấu cảm - điều mà chúng ta đều cần thêm trong bối cảnh hiện nay.

## [Dithering - Part 2](https://visualrambling.space/dithering-part-2/)

Bài viết là phần thứ hai trong series về dithering - kỹ thuật dùng để mô phỏng nhiều màu sắc hơn so với những gì thực tế có sẵn. Tác giả tập trung vào ordered dithering, một phương pháp sử dụng threshold map để quyết định màu cuối cùng của mỗi pixel. Series này chỉ bao gồm dithering grayscale xuống hai màu đen và trắng.

Tác giả giải thích cách hoạt động của threshold map: thay vì dùng một ngưỡng đơn để chuyển đổi xám thành đen hoặc trắng, ta sử dụng nhiều ngưỡng khác nhau cùng lúc. Kết quả là một hỗn hợp các pixel đen và trắng phản ánh độ sáng ban đầu - vùng sáng hơn có nhiều pixel trắng hơn, vùng tối hơn có nhiều pixel đen hơn.

Vấn đề đầu tiên là các ngưỡng được sắp xếp tuần tự tạo ra các vạch dọc không mong muốn. Giải pháp là Bayer matrix - sắp xếp lại các ngưỡng theo mẫu 2x2 tạo ra pattern cross-hatch đặc trưng, giúp phân tán đều các pixel đen và trắng. Tuy nhiên, chỉ có 4 mức ngưỡng thì chuyển giữa các sắc thái vẫn khá gắt. Tác giả giới thiệu Bayer matrix 4x4 với 16 mức ngưỡng, cho phép 16 sắc thái xám khác nhau và chuyển mượt mà hơn.

Bài viết cũng giới thiệu một số phương pháp sắp xếp threshold map khác nhau: Bayer matrix 8x8 với 64 mức cho gradient chi tiết hơn, Cluster Dot matrix tạo ra cảm giác như báo in truyền thống với các chấm tròn, và Void and Cluster - phương pháp yêu thích của tác giả với blue noise tạo ra texture tự nhiên hơn. Phần tiếp theo sẽ bàn về error diffusion, một phương pháp dithering khác không dùng map.

## [What came first: the CNAME or the A record?](https://blog.cloudflare.com/cname-a-record-order-dns-standards/)

Bài viết phân tích một sự cố DNS xảy ra vào ngày 8 tháng 1 năm 2026 khi Cloudflare cập nhật 1.1.1.1 để giảm mức sử dụng bộ nhớ. Thay đổi vô tình đã làm đảo ngược thứ tự của bản ghi CNAME trong phản hồi DNS, gây ra lỗi phân giải cho một số ứng dụng khách trên toàn Internet.

Vấn đề gốc rễ nằm ở logic gộp chuỗi CNAME. Khi một số bản ghi trong chuỗi CNAME hết hạn, chỉ có phần hết hạn được giải quyết lại. Code cũ sẽ tạo danh sách mới, thêm chuỗi CNAME hiện có rồi thêm các bản ghi mới vào sau. Để tiết kiệm cấp phát bộ nhớ, code mới thay đổi bằng cách thêm CNAME vào cuối danh sách answer hiện có - khiến CNAME xuất hiện sau bản ghi A/AAAA.

Một số triển khai DNS như getaddrinfo trong glibc và quy trình DNSC trong switch Cisco sử dụng phân tích tuần tự - theo dõi tên mong đợi khi duyệt qua các bản ghi. Khi gặp CNAME, tên mong đợi được cập nhật. Nếu CNAME xuất hiện cuối cùng, các bản ghi A/AAAA bị bỏ qua vì không khớp tên, dẫn đến phản hồi rỗng. systemd-resolved không gặp vấn đề này vì nó phân tích bản ghi vào một tập hợp có thứ tự và có thể tìm kiếm toàn bộ.

RFC 1034 từ năm 1987 sử dụng cụm "possibly preface" để nói về CNAME nhưng không dùng từ khóa normative như MUST/SHOULD - RFC 2119 mới ra năm 1997. RFC cũng rõ ràng về thứ tự trong RRset nhưng mơ hồ về thứ tự tương đối giữa các RRset khác nhau trong phần thông điệp. Cloudflare đã hoàn tác thay đổi và viết đề xuất Internet-Draft để làm rõ hành vi tại IETF, giúp cộng đồng DNS điều hướng giao thức này tốt hơn.
