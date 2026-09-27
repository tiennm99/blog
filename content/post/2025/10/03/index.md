---
title: "Newsletter #59"
date: 2025-10-03
tags: ["AI-Assisted", "Technology", "Compression", "Algorithms", "AI", "Programming", "Performance", "Optimization", "CodeAssistant", "AutonomousCoding", "Experience", "WernerVogels", "KentBeck", "SoftwareCost", "FutureOfProgramming", "EngineeringTaste", "TechnicalTaste", "SeanGoedecke", "SoftwareDesign"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #59.*

## [Taking a Look at Compression Algorithms](https://cefboud.com/posts/compression/)

Bài viết của Moncef Abboud đi sâu vào bốn thuật toán nén không mất dữ liệu (lossless) phổ biến là GZIP (DEFLATE), Snappy, LZ4 và ZSTD, xoay quanh ba thước đo mà thuật toán nén nào cũng phải cân bằng: tỷ lệ nén, tốc độ nén và tốc độ giải nén. DEFLATE kết hợp kỹ thuật cửa sổ trượt LZ77, vốn thay các chuỗi lặp lại bằng tham chiếu ngược, với mã hóa Huffman, vốn gán mã ngắn hơn cho ký hiệu xuất hiện nhiều. Qua mã nguồn thư viện chuẩn của Go, tác giả cho thấy bảng băm dạng chuỗi liên kết giúp tìm các đoạn trùng khớp, và mức nén thực chất quyết định việc duyệt chuỗi đó sâu đến đâu: càng tìm lâu thì càng tốn CPU nhưng tỷ lệ nén càng cao.

Snappy và LZ4 cùng thuộc họ LZ nhưng ưu tiên tốc độ: Snappy nén từ khoảng 250 MB/s trở lên, còn LZ4 đạt khoảng 780 MB/s khi nén và gần 5 GB/s khi giải nén với tỷ lệ tương đương (khoảng 2,1 lần), nhờ định dạng khối đơn giản gồm token 4 bit mô tả độ dài phần dữ liệu thô và đoạn sao chép, cùng các phép so sánh bằng XOR rất hợp với phần cứng. ZSTD thì đạt được cả hai: tỷ lệ khoảng 2,9 lần, ngang hoặc hơn DEFLATE, trong khi tốc độ nén khoảng 510 MB/s gần bằng LZ4, nhờ kết hợp so khớp kiểu LZ với mã hóa entropy hiện đại FSE (dựa trên ANS) và hỗ trợ từ điển huấn luyện trước. Không có thuật toán tốt nhất cho mọi trường hợp: DEFLATE hợp với lưu trữ tổng quát, Snappy và LZ4 dành cho hệ thống cần tốc độ, còn ZSTD là lựa chọn cân bằng.

## [90%](https://lucumr.pocoo.org/2025/9/29/90-percent/)

Armin Ronacher cho biết với thành phần hạ tầng ông khởi xướng tại công ty mới, hơn 90% mã nguồn do AI viết. Đó là một dịch vụ Go gửi và nhận email, có REST API tương thích OpenAPI cùng SDK cho Python và TypeScript, tổng cộng khoảng 40.000 dòng. Dù vậy, ông vẫn coi từng dòng là trách nhiệm của mình: tự thiết kế hệ thống, lược đồ cơ sở dữ liệu và kiến trúc, chỉ dùng AI như một "con vịt cao su" để phản biện. AI giúp ông theo đuổi những lựa chọn trước đây quá tốn công khi làm tay, như viết SQL thô thay cho ORM để dễ gỡ lỗi, hay đặt đặc tả OpenAPI làm nguồn chuẩn rồi sinh mã cho cả phía máy khách lẫn máy chủ. Ông dùng Claude Code để gỡ lỗi và Codex để rà soát mã.

Ronacher cũng thẳng thắn về điểm yếu: nếu không cẩn thận, tác tử AI viết ra mã rất tệ, tái tạo lại thứ đã có, dựng lớp trừu tượng không hợp quy mô, không thật sự hiểu xử lý đồng thời với goroutine, thích thêm thư viện phụ thuộc lỗi thời và nuốt lỗi khiến hệ thống khó quan sát. Chẳng hạn, bộ giới hạn tốc độ (rate limiter) do AI viết "chạy được" nhưng thiếu jitter và lưu trữ kém, dễ sửa nếu bạn hiểu vấn đề nhưng nguy hiểm nếu không. Ngược lại, AI tỏa sáng khi vừa nghiên cứu vừa thử nghiệm, tái cấu trúc liên tục, dựng hạ tầng AWS hay chuyển bộ kiểm thử sang testcontainers trong một giờ. Kết luận của ông: 90% mã do AI viết đã thành hiện thực, nhưng điều đó không xóa bỏ nhu cầu trở thành một kỹ sư giỏi.

## [The Weird Concept of Branchless Programming](https://sanixdk.xyz/blogs/the-weird-concept-of-branchless-programming)

Lập trình không nhánh (branchless programming) là kỹ thuật viết lại các câu lệnh điều kiện thành phép toán số học và thao tác bit, hoặc dùng lệnh như `cmov`, để CPU không phải đoán hướng rẽ. Bộ dự đoán nhánh của CPU hiện đại làm việc rất tốt khi điều kiện có quy luật, nhưng khi dữ liệu ngẫu nhiên như đầu vào người dùng hay mảng bị xáo trộn, mỗi lần đoán sai buộc CPU xả pipeline và mất khoảng 15–20 chu kỳ. Mã không nhánh vì vậy chạy đều hơn và có thời gian thực thi ổn định, điều đặc biệt quan trọng trong mật mã học để chống tấn công kênh kề.

Tác giả minh họa bằng ba ví dụ viết bằng C với độ phức tạp tăng dần: tính giá trị tuyệt đối bằng mặt nạ tạo từ phép dịch phải số học 31 bit, hàm `clamp` giới hạn giá trị trong khoảng từ min đến max mà không cần `if`, và hàm `partition` của thuật toán sắp xếp nhanh tăng chỉ số trực tiếp bằng kết quả phép so sánh. Kết quả đo cho thấy `abs` và `clamp` gần như không nhanh hơn vì bộ dự đoán nhánh đã xử lý tốt, chỉ `partition` với điều kiện khó đoán là nhanh hơn khoảng 1,2 lần. Thông điệp chính: lập trình không nhánh là "dao mổ, không phải búa tạ", nên dùng cho vòng lặp nóng có điều kiện khó đoán, mã nhạy cảm về thời gian hay vector hóa SIMD; còn khi sự dễ đọc quan trọng hơn vài nano giây, cứ viết `if` như bình thường.

## [AI Coding Assistants: Building Apps for 30 Hours Straight](https://threadreaderapp.com/thread/1972793278744461627.html)

Trong một chuỗi bài trên X, Carlos E. Perez (@IntuitMachine) phân tích system prompt bị rò rỉ của Claude Sonnet 4.5 để lý giải vì sao mô hình này có thể tự làm việc liên tục khoảng 30 giờ để xây dựng một ứng dụng kiểu Slack với hơn 10.000 dòng mã. Theo ông, bí quyết nằm ở việc prompt buộc mọi đoạn mã dài hơn khoảng 20 dòng phải được xuất thành artifact bền vững, mỗi phản hồi chỉ một artifact, kèm quy tắc rõ ràng khi nào chỉ cập nhật vài chỗ nhỏ và khi nào viết lại toàn bộ. Nhờ vậy mô hình có thể phát triển một cơ sở mã lớn qua nhiều vòng mà không mất trạng thái. Prompt còn đặt ràng buộc môi trường chạy như cấm localStorage và giới hạn cách nhập thư viện, giúp giao diện ổn định trong sandbox.

Bên cạnh đó là các khuôn mẫu giúp duy trì khả năng tự chủ dài hạn: chế độ nghiên cứu theo quy trình lập kế hoạch, tra cứu rồi tổng hợp câu trả lời; dùng công cụ để kiểm chứng thay vì phỏng đoán; tách biệt giai đoạn suy nghĩ và hành động để tránh viết mã vội vàng; các vòng lặp lập kế hoạch và phản hồi lấy cảm hứng từ Voyager hay Generative Agents; gửi đầy đủ trạng thái hội thoại trong mỗi lần gọi; cùng "nghi thức xử lý lỗi" dọn ngữ cảnh cũ và thử lại với bài học đã rút ra. Ưu tiên công nghệ quen thuộc như React, Flask và giữ đầu ra dạng JSON để kiểm thử tự động cũng giúp những phiên làm việc dài không sụp đổ vì độ phức tạp.

## [Development Gets Better with Age](https://www.allthingsdistributed.com/2025/10/better-with-age.html)

Sau gần 25 năm ở Amazon, Werner Vogels viết về lợi thế của lập trình viên lớn tuổi. Họ đã gặp phần lớn những vấn đề mà thế hệ trẻ đang đối mặt, mang theo "vết sẹo chiến trường" từ những ngày trong phòng xử lý sự cố, biết điều gì thực tế và hiệu quả, và được rèn luyện để nhận ra dấu hiệu cảnh báo từ sớm. Phần trí óc còn lại dành cho sự sáng tạo, xây dựng mô hình tư duy và tìm ra giải pháp mới, điều ông cho là phần tuyệt vời nhất của nghề. Họ cũng đã thấy các khuôn mẫu lặp đi lặp lại liên tục, kể cả những công ty hứa hẹn rất nhiều nhưng giao ra sản phẩm đầy lỗ hổng.

Với AI tạo sinh, Vogels thừa nhận đây là công nghệ thú vị và mạnh mẽ trong tay người xây dựng dày dạn kinh nghiệm có sự hoài nghi lành mạnh, nhưng làn sóng cường điệu đã bùng nổ vì nó ra đời mà không ai kịp hướng dẫn người dùng. AWS phản ứng bằng cách quay về gốc rễ: phổ cập công nghệ, cho khách hàng quyền lựa chọn mô hình, đặt quyền riêng tư và bảo mật lên hàng đầu. Khi khách hàng hỏi nên làm gì với AI tạo sinh, phần lớn là do nỗi sợ bị bỏ lỡ (FOMO) chứ không phải vì một bài toán cụ thể. Lúc đó, lập trình viên lớn tuổi biết cần nhấn nút tạm dừng, trò chuyện sâu với khách hàng để hiểu thách thức thực sự, và chỉ đôi khi giải pháp mới là AI tạo sinh. Như ông viết: công nghệ mới, nhưng vẫn là những khuôn mẫu cũ.

## [Programming Deflation](https://tidyfirst.substack.com/p/programming-deflation)

Kent Beck xuất phát từ giả định rằng lập trình có AI hỗ trợ đang liên tục làm giảm chi phí, rào cản kỹ năng và thời gian phát triển phần mềm, rồi đặt câu hỏi: điều này dẫn tới ít hay nhiều lập trình viên hơn? Kinh tế học đưa ra hai câu trả lời trái ngược: hiệu ứng thay thế cho rằng máy móc sẽ thay con người, còn nghịch lý Jevons dự đoán nhu cầu tăng khi một thứ trở nên rẻ hơn. Nếu viết phần mềm ngày mai còn rẻ hơn hôm nay, người ta có thể trì hoãn đầu tư, giống vòng xoáy giảm phát. Nhưng khác với giảm phát kinh tế vốn phản ánh sự suy yếu, "giảm phát lập trình" đến từ năng suất thực: khi chi phí thử nghiệm gần bằng không, người ta muốn thử ngay; mã chất lượng thấp tràn ngập trong khi khoảng cách với phần mềm được chăm chút kỹ ngày càng xa; và giá trị dịch chuyển từ việc viết mã sang hiểu nên xây dựng gì và các hệ thống kết hợp với nhau ra sao.

Lời khuyên của Beck là dùng công cụ rẻ cho phần hiển nhiên và dồn sức cho bài toán khó, tập trung vào tích hợp vì nút thắt không còn là viết mã, rèn luyện "gu" để biết điều gì đáng xây dựng, và tư duy theo hệ thống. Trong thế giới dư thừa mã nguồn, thứ khan hiếm là sự thấu hiểu, óc phán đoán và sự khôn ngoan để biết điều gì không nên làm. Chúng có giá trị dù tương lai có ít hay nhiều lập trình viên, nên thay vì đoán trước, hãy xây dựng năng lực phát triển tốt trong cả hai kịch bản.

## [Thế nào là 'thẩm mỹ tốt' trong kỹ thuật phần mềm?](https://www.seangoedecke.com/taste/)

Sean Goedecke phân biệt "gu kỹ thuật" (technical taste) với kỹ năng kỹ thuật: bạn có thể giỏi kỹ thuật mà gu tệ, hoặc ngược lại. Theo ông, gu là khả năng chọn đúng bộ giá trị kỹ thuật phù hợp với dự án hiện tại. Ví dụ, ông thích `map` và `filter` hơn vòng lặp `for` vì hàm thuần dễ suy luận và tránh lỗi lệch chỉ số, nhưng người thích `for` cũng có lý do chính đáng như dễ đánh giá hiệu năng hay dễ mở rộng cách duyệt. Khác biệt không nằm ở trình độ mà ở giá trị mỗi người coi trọng. Hầu hết quyết định kỹ thuật là sự đánh đổi giữa các giá trị như khả năng phục hồi, tốc độ, tính dễ đọc, tính đúng đắn, tính linh hoạt, tính di động, khả năng mở rộng và tốc độ phát triển, và không kỹ sư nào coi trọng tất cả như nhau.

Gu tệ nghĩa là những giá trị bạn ưu tiên không hợp với dự án, và thường xuất phát từ sự cứng nhắc: mang một giải pháp từng thành công ở nơi khác vào mà không xét bối cảnh, hay biện minh bằng câu "đây là thực hành tốt nhất". Kỹ sư như vậy giống chiếc la bàn hỏng, chỉ đúng khi tình cờ đứng đúng chỗ. Gu tốt khó nhận ra hơn vì chỉ bộc lộ qua bài toán thực tế; dấu hiệu là các dự án bạn tham gia, hoặc đồng tình về thiết kế, thường thành công. Để phát triển gu, tác giả khuyên làm nhiều loại dự án khác nhau, để ý phần nào dễ, phần nào khó, và giữ sự linh hoạt, tránh hình thành những quan điểm cứng nhắc về cách viết phần mềm "đúng".

## Bonus: Một vài ảnh thú vị đến từ [ByteByteGo](https://bytebytego.com/)

![Service Discovery 101: The Phonebook for Distributed Systems](https://substackcdn.com/image/fetch/$s_!CEQb!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F30caf720-4b66-4f5f-84d2-72c578969944_2250x2624.heic)

*Bài viết trong kho của mình đã hết rồi. Có lẽ phải chờ một thời gian để mình tích luỹ lại sau đó mới tiếp tục được nhé. Hẹn gặp lại các bạn sau.*

---

*Bài viết đã được viết lại bởi Claude Code với Opus 5.5 vào ngày 27/09/2026.*
