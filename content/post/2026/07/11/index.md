---
title: "Newsletter #123"
date: 2026-07-11
tags: ["AI-Assisted", "Newsletter", "AI", "System Design", "Reliability", "Career Development", "Networking"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #123.*

## [Our Collective Bike Shed Moment](https://muratbuffalo.blogspot.com/2026/06/our-collective-bike-shed-moment.html)

Bài viết mượn “Định luật về sự tầm thường” của Parkinson: một ủy ban giả tưởng chỉ dành mười phút cho thiết kế lò phản ứng hạt nhân vì không ai hiểu đủ để tranh luận, nhưng lại mất bốn mươi lăm phút bàn về màu sơn nhà để xe đạp. Tác giả cho rằng cả xã hội đang lặp lại cuộc họp ấy trước AI. LLM đã lần lượt vượt qua các rào cản từng bị xem là giới hạn, từ chuyện không biết lập trình đến ảo giác, và ngày càng giỏi về phương pháp hình thức lẫn suy luận, vậy mà nhiều người vẫn liên tục dời tiêu chuẩn đánh giá, còn số đông thì thờ ơ như thể chưa có gì thay đổi.

Tác giả giải thích sự thờ ơ đó bằng thiên kiến bình thường hóa, khiến con người mặc định tương lai sẽ gần giống hiện tại, và hiệu ứng “vấn đề của người khác” của Douglas Adams, khiến những thay đổi lớn bị chủ động bỏ qua. Học công cụ mới để trụ vững trong vài năm tới là chiến lược cá nhân hợp lý, nhưng không trả lời được câu hỏi về những thập kỷ sắp tới. Điều đáng lo là ngay cả những người lẽ ra phải dẫn dắt cuộc thảo luận, gồm nhà công nghệ, nhà nghiên cứu, nhà kinh tế, nhà hoạch định chính sách, đạo đức, quân sự và giáo dục, vẫn chưa bàn về tác động dài hạn của AI ở độ sâu cần thiết, trong khi sự chú ý tiếp tục dồn vào các tranh cãi bề mặt.

## [p99 0 ms* autocomplete for 240 million domain names](https://ruurtjan.com/articles/p99-0ms-autocomplete-for-240-million-domain-names)

Bài viết trình bày cách Wirewiki tạo cảm giác tự động hoàn thành tức thì trên tập 240 triệu tên miền. Khi người dùng nhấn một phím, trình duyệt tải trước gợi ý cho chuỗi hiện tại cùng mọi ký tự có thể gõ tiếp; lúc thả phím kế tiếp, kết quả thường đã sẵn sàng để hiển thị. Vì bảng chữ cái của tên miền có giới hạn, mỗi phản hồi chỉ chứa tối đa 312 tên miền, khoảng 2,5 kB sau nén. Theo phép đo của tác giả, 99% thao tác gõ có ngân sách ít nhất 121 ms, nên “p99 0 ms” nghĩa là kết quả có trước lúc thả phím, chứ không phải yêu cầu mạng thật sự mất 0 ms.

Phía máy chủ chia dữ liệu thành hai tầng. Một cây tiền tố trong bộ nhớ lưu sẵn tám gợi ý phổ biến nhất cho mọi tiền tố, lấy từ danh sách Tranco gồm một triệu tên miền. Phần còn lại gồm 240 triệu tên miền từ CZDS được sắp xếp, nén theo sai khác và chia thành các khối cố định trên SSD; một thư mục 27 MB trong bộ nhớ giúp tìm đúng khối, còn hệ điều hành giữ các trang hay dùng trong bộ nhớ đệm. API thường phản hồi trong 2 ms; ở 1.600 yêu cầu mỗi giây, Nginx cùng API vẫn đạt p99 khoảng 15 ms. Khi máy chủ đã đủ nhanh, hành trình mạng qua Cloudflare trở thành yếu tố chi phối độ trễ cảm nhận, như dấu sao trong tiêu đề ngụ ý: một máy chủ duy nhất ở châu Âu chưa thể đạt mục tiêu với người dùng ở xa. Bài học là đo độ trễ theo trải nghiệm người dùng để tối ưu đúng chỗ.

## [Building Reliable Agentic AI Systems](https://martinfowler.com/articles/reliable-llm-bayer.html)

Bài viết kể lại hành trình Bayer xây dựng PRINCE, hệ thống AI giúp nhà nghiên cứu truy vấn hàng chục năm dữ liệu tiền lâm sàng nằm trong các báo cáo PDF. Nền tảng phát triển qua ba giai đoạn: tìm kiếm dữ liệu có cấu trúc, hỏi đáp bằng RAG, rồi xử lý tác vụ phức tạp bằng nhiều tác tử. LangGraph điều phối chuỗi bước làm rõ ý định, lập kế hoạch, nghiên cứu, kiểm tra độ đầy đủ của bằng chứng và soạn câu trả lời. Tác tử nghiên cứu kết hợp RAG trên OpenSearch cho báo cáo phi cấu trúc với Text-to-SQL trên Athena cho các phép lọc, tổng hợp và so sánh trên dữ liệu có cấu trúc, còn các bước phản tư riêng biệt kiểm tra tiến trình, độ đủ của dữ liệu và chất lượng bản nháp.

Độ tin cậy đến từ khung kỹ thuật bao quanh mô hình, không chỉ từ câu lệnh hay mô hình mạnh hơn. Mỗi bước chỉ nhận phần ngữ cảnh cần thiết; trạng thái được lưu sau từng nút để tiếp tục từ chỗ lỗi thay vì chạy lại toàn bộ; yêu cầu được thử lại có giới hạn ở cấp lời gọi mô hình lẫn cấp bước, rồi chuyển sang mô hình hoặc nhà cung cấp dự phòng khi cần. Trong môi trường được quản lý chặt, niềm tin còn đến từ việc hiển thị các bước trung gian, gắn trích dẫn tới đúng trang và đoạn nguồn, đánh giá liên tục trên cả tập dữ liệu chuẩn lẫn lưu lượng thật, và giữ chuyên gia trong vòng phê duyệt. Cách tổ chức này giúp hệ thống dễ quan sát, kiểm thử, phục hồi và cải tiến hơn hẳn một tác tử đơn khối.

## [Growing as an engineer in a world of AI](https://nlopes.dev/writing/growing-as-an-engineer-in-a-world-of-ai)

Bài viết cho rằng rủi ro lớn nhất với kỹ sư mới vào nghề không phải AI lấy mất việc làm, mà là họ ngừng học khi AI xóa đi chính những trở ngại từng tạo ra việc học. Tự đọc tài liệu, thử, thất bại, gỡ lỗi và tự hình thành câu trả lời giúp kiến thức bền hơn nhờ “khó khăn có lợi” và hiệu ứng tự tạo. Có lời giải nhanh không đồng nghĩa với hiểu vấn đề: nếu chỉ nhận đáp án rồi chuyển sang việc tiếp theo, kỹ sư có thể viết ra mã chạy được nhưng không giải thích nổi lựa chọn, đánh đổi hay nguyên nhân lỗi. Khoản “nợ nhận thức” này thường chỉ lộ ra khi hệ thống gặp sự cố.

Tác giả không khuyên tránh AI mà xem nó như công cụ khuếch đại việc học: hỏi vì sao, yêu cầu phương án thay thế và tình huống thất bại; tự đọc và phác thảo mô hình ban đầu trước khi nhờ giải thích; viết lại từng phần thay vì sao chép; biến việc đánh giá mã nguồn và viết tài liệu thành bài tập tư duy chủ động. Nền tảng vẫn cần được bồi đắp từ sách, Unix, tài liệu gốc, thảo luận kiến trúc và phân tích sự cố, còn thời gian AI tiết kiệm được nên dành cho những suy nghĩ khó hơn. Sự trưởng thành của kỹ sư trẻ cũng là trách nhiệm của tổ chức: nhà quản lý cần tạo không gian học tập, đánh giá óc phán đoán và hiểu biết hệ thống thay vì chỉ đo sản lượng, đồng thời tiếp tục tuyển và phát triển kỹ sư trẻ.

## [Note To My Younger Self](https://yewjin.substack.com/p/note-to-my-younger-self)

Sau hai thập kỷ làm việc tại các công ty công nghệ lớn, tác giả đúc kết tám nguyên tắc nghề nghiệp đơn giản nhưng khó duy trì. Hãy yêu công việc thực tế thay vì chạy theo chức danh, xem công việc đầu tiên như phòng thí nghiệm để học cách giải quyết vấn đề; liên tục hỏi “tại sao” để tìm nguyên nhân gốc; xây dựng quan hệ chân thành bằng sự giúp đỡ thật lòng nhưng vẫn giữ ranh giới rõ ràng; tạo niềm vui trong môi trường làm việc; lắng nghe, giải thích phù hợp với người nghe và biết khi nào nên im lặng; ghi lại tác động của mình hằng tuần và chủ động xin phản hồi cụ thể rồi hành động ngay, để có bằng chứng cho sự tiến bộ và điều chỉnh sớm; và khi có thể, chọn người quản lý giúp mình trưởng thành thay vì chọn chức danh hấp dẫn, vì họ ảnh hưởng mạnh đến cách suy nghĩ và quỹ đạo nghề nghiệp dài hạn.

Tác giả thừa nhận đây không phải quy tắc tuyệt đối và góc nhìn của mình mang thiên kiến của người thành công. Khi công việc tốt, người quản lý tốt, sự tử tế, khả năng được ghi nhận và sức khỏe tinh thần xung đột với nhau, lựa chọn phải dựa vào giai đoạn nghề nghiệp, kỹ năng còn thiếu, hoàn cảnh cá nhân và thời gian đánh đổi. Một câu hỏi hữu ích khi phân vân là điều gì vẫn còn giá trị sau năm năm: dự án thường bị lãng quên, còn kỹ năng, cách suy nghĩ và các mối quan hệ tốt tiếp tục sinh lợi lâu dài.

## [Google hits 50% IPv6](https://blog.apnic.net/2026/04/28/google-hits-50-ipv6/)

Google lần đầu ghi nhận khoảng một nửa người dùng truy cập dịch vụ của họ qua IPv6, cho thấy giao thức này đã trở thành thành phần trưởng thành của Internet toàn cầu. Cùng thời điểm, APNIC Labs đo được khoảng 42%, nhưng chênh lệch này không nhất thiết là mâu thuẫn. Mẫu của APNIC đến từ quảng cáo phân phối không đồng đều giữa các nền kinh tế, sau đó được gán trọng số theo ước tính số người dùng Internet của từng nơi, nên con số toàn cầu phụ thuộc mạnh vào tập người dùng được đo và phương pháp tính. Ở cấp từng nền kinh tế, số liệu của APNIC nhìn chung gần với Google và các bên đo lường khác, vì vậy hai tập dữ liệu có thể xem như một khoảng ước lượng hợp lý cho mức triển khai toàn cầu.

Mức áp dụng IPv6 rất khác nhau giữa các quốc gia, nhà mạng cố định và mạng di động. Chuyển đổi chậm không có nghĩa là thất bại: nhiều nhà cung cấp còn phải khai thác hạ tầng IPv4 đã đầu tư lớn, trong khi mạng mới có thể giảm tổng chi phí khi chọn IPv6 ngay từ đầu, nên đây là bài toán về kỹ thuật, vốn và thị trường chứ không chỉ là chọn giao thức. Internet hiện vận hành song song IPv4 trực tiếp, IPv4 qua NAT hoặc CGNAT và IPv6, vì vậy giữ IPv4 cũng không giúp tránh được độ phức tạp. Khả năng liên thông ngày càng được xử lý ở tầng vận chuyển, các dịch vụ trung gian và nhà cung cấp nội dung hỗ trợ cả hai giao thức, thay vì đòi mọi hệ thống phía sau chuyển đổi cùng lúc.

## [The unwritten laws of software engineering](https://www.manager.dev/newsletter/the-unwritten-laws-of-software-engineering)

Bài viết tổng hợp bảy quy tắc vận hành mà kỹ sư thường chỉ thấm sau khi gặp sự cố. Nếu hệ thống hỏng ngay sau một lần triển khai, hãy quay lui để khôi phục ổn định trước rồi mới điều tra, thay vì mất thời gian chứng minh thay đổi của mình vô can. Bản sao lưu chỉ đáng tin khi đã được thử khôi phục định kỳ, và đội ngũ biết rõ lượng dữ liệu có thể mất, ai có quyền thực hiện cùng thời gian phục hồi. Nhật ký cần đủ thông tin, có mã liên kết xuyên dịch vụ và dễ tìm kiếm, nhưng không dài đến mức che khuất tín hiệu quan trọng.

Mọi thay đổi dữ liệu phải có đường quay lui nhanh, cụ thể và đã được kiểm thử. Phụ thuộc bên ngoài chắc chắn sẽ có lúc chậm, giới hạn yêu cầu hoặc ngừng hoạt động, nên cần hiểu giới hạn tốc độ, tác động khi gián đoạn, cam kết dịch vụ và chuẩn bị phương án như bộ nhớ đệm, hàng đợi hoặc dùng dữ liệu cũ. Với thao tác rủi ro, nguyên tắc bốn mắt giúp phát hiện sai lầm trước khi thực hiện; nếu bạn ngại gọi ai đó vào đêm khuya để cùng kiểm tra, đó chính là dấu hiệu càng không nên làm một mình. Cuối cùng, giải pháp tạm thời thường sống lâu hơn dự kiến, vì vậy phiên bản tối thiểu vẫn phải đơn giản và đủ chất lượng để tồn tại lâu dài, chứ không phải một bản vá mong manh chờ sửa sau.

### Bonus

**Images:**
![Top Anti-Patterns in Service Architecture](https://substackcdn.com/image/fetch/$s_!mGbr!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8558b1b2-984f-4c42-bb23-e63a2252533c_2650x3068.png)

---

*Bài viết đã được viết lại bởi Claude Code với Opus 5.5 vào ngày 27/09/2026.*
