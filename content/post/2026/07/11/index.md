---
title: "Newsletter #123"
date: 2026-07-11
tags: ["AI-Assisted", "Newsletter", "AI", "System Design", "Reliability", "Career Development", "Networking"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #123.*

## [Our Collective Bike Shed Moment](https://muratbuffalo.blogspot.com/2026/06/our-collective-bike-shed-moment.html)

Bài viết dùng “Định luật về sự tầm thường” của Parkinson để mô tả cách con người thường tranh luận lâu về chuyện nhỏ, dễ hiểu như màu sơn nhà để xe đạp, nhưng lại dành rất ít thời gian cho vấn đề lớn và phức tạp như thiết kế lò phản ứng hạt nhân. Tác giả cho rằng xã hội đang phản ứng tương tự trước AI: dù LLM đã tiến bộ nhanh về lập trình, phương pháp hình thức và suy luận, nhiều cuộc thảo luận vẫn tập trung vào các hạn chế cũ hoặc liên tục dời tiêu chuẩn đánh giá.

Theo tác giả, thiên kiến bình thường hóa khiến con người mặc định tương lai sẽ gần giống hiện tại, còn tâm lý xem vấn đề là trách nhiệm của người khác khiến các thay đổi lớn dễ bị bỏ qua. Việc mỗi cá nhân học công cụ mới để thích nghi là hợp lý, nhưng chưa đủ cho những tác động kéo dài nhiều thập kỷ. Các nhà công nghệ, nghiên cứu, kinh tế, hoạch định chính sách, đạo đức, quân sự và giáo dục cần thảo luận sâu hơn về ảnh hưởng dài hạn của AI thay vì chỉ chú ý đến những tranh cãi bề mặt.

**Điểm chính:**
- Con người thường dành nhiều sự chú ý cho vấn đề dễ hiểu hơn là vấn đề quan trọng nhưng phức tạp.
- Sự tiến bộ nhanh của AI đòi hỏi cập nhật cách nhìn về tương lai, không chỉ điều chỉnh các tiêu chuẩn đánh giá cũ.
- Học cách sử dụng công cụ mới giúp cá nhân thích nghi trong ngắn hạn nhưng không thay thế được thảo luận xã hội dài hạn.
- Những nhóm có trách nhiệm định hướng công nghệ và chính sách cần xem tác động của AI là vấn đề chung, không phải việc của người khác.

## [p99 0 ms* autocomplete for 240 million domain names](https://ruurtjan.com/articles/p99-0ms-autocomplete-for-240-million-domain-names)

Bài viết trình bày cách Wirewiki tạo cảm giác tự động hoàn thành tức thì trên tập 240 triệu tên miền. Khi người dùng bắt đầu nhấn một phím, trình duyệt tải trước gợi ý cho chuỗi hiện tại cùng mọi ký tự có thể nhập tiếp; khi người dùng thả phím kế tiếp, kết quả thường đã sẵn sàng để hiển thị. Mỗi phản hồi chứa tối đa 312 tên miền, khoảng 2,5 kB sau nén. Theo phép đo của tác giả, 99% thao tác gõ có ngân sách ít nhất 121 ms, nên “p99 0 ms” được hiểu là kết quả sẵn sàng trước lúc thả phím chứ không phải toàn bộ yêu cầu mạng thật sự mất 0 ms.

Phía máy chủ chia dữ liệu thành hai tầng. Một cây tiền tố trong bộ nhớ lưu sẵn tám gợi ý phổ biến nhất cho mọi tiền tố từ danh sách Tranco gồm một triệu tên miền. Phần còn lại dùng 240 triệu tên miền từ CZDS, được sắp xếp, nén theo sai khác và chia thành các khối cố định trên SSD; một thư mục 27 MB trong bộ nhớ giúp tìm đúng khối, còn hệ điều hành giữ các trang thường dùng trong bộ nhớ đệm. API thường phản hồi trong 2 ms; ngay cả ở 1.600 yêu cầu mỗi giây, Nginx cùng API đạt p99 khoảng 15 ms. Dấu sao trong tiêu đề nhắc rằng độ trễ mạng vẫn chi phối: máy chủ duy nhất tại châu Âu chưa thể đạt mục tiêu với người dùng ở xa.

**Điểm chính:**
- Tải trước theo thời điểm nhấn phím biến thời gian gõ của người dùng thành ngân sách che giấu độ trễ.
- Trả trước gợi ý cho mọi ký tự kế tiếp chỉ tốn khoảng 2,5 kB sau nén vì bảng chữ cái tên miền có giới hạn.
- Cây tiền tố trong bộ nhớ phục vụ nhóm phổ biến, còn chỉ mục khối ánh xạ trên SSD xử lý phần dữ liệu dài.
- Sau khi API đủ nhanh, hành trình mạng qua Cloudflare trở thành thành phần chi phối độ trễ cảm nhận.
- Định nghĩa chỉ số theo trải nghiệm người dùng giúp ưu tiên tối ưu đúng chỗ hơn là tiếp tục giảm vài mili giây ở máy chủ.

## [Building Reliable Agentic AI Systems](https://martinfowler.com/articles/reliable-llm-bayer.html)

Bài viết trình bày hành trình Bayer xây dựng PRINCE, hệ thống AI hỗ trợ nhà nghiên cứu truy vấn hàng chục năm dữ liệu tiền lâm sàng nằm trong báo cáo PDF. Nền tảng phát triển qua ba giai đoạn: tìm kiếm dữ liệu có cấu trúc, hỏi đáp bằng RAG và thực hiện tác vụ phức tạp bằng nhiều tác tử. LangGraph điều phối các bước làm rõ ý định, lập kế hoạch, nghiên cứu, kiểm tra độ đầy đủ của bằng chứng và soạn câu trả lời. Tác tử nghiên cứu kết hợp RAG trên OpenSearch cho tài liệu phi cấu trúc với Text-to-SQL trên Athena cho dữ liệu có cấu trúc.

Độ tin cậy đến từ khung kỹ thuật bao quanh mô hình, không chỉ từ câu lệnh hay mô hình mạnh hơn. Mỗi bước chỉ nhận phần ngữ cảnh cần thiết; trạng thái được lưu sau từng nút để có thể tiếp tục từ chỗ lỗi; yêu cầu được thử lại ở cấp lời gọi mô hình lẫn cấp bước xử lý, rồi chuyển sang mô hình hoặc nhà cung cấp dự phòng khi cần. PRINCE hiển thị các bước trung gian, gắn trích dẫn tới đúng trang và đoạn nguồn, đánh giá cả tập dữ liệu chuẩn lẫn lưu lượng thật, đồng thời giữ chuyên gia trong vòng xem xét. Cách tổ chức này làm hệ thống dễ quan sát, kiểm thử, phục hồi và cải tiến hơn một tác tử đơn khối.

**Điểm chính:**
- Làm rõ ý định sớm giúp giới hạn miền dữ liệu và tránh gọi sai công cụ tốn kém.
- Tách phản tư về tiến trình, độ đủ của dữ liệu và chất lượng bản nháp giúp phát hiện ba nhóm lỗi khác nhau.
- RAG phù hợp với báo cáo PDF, còn Text-to-SQL xử lý tốt phép lọc, tổng hợp và so sánh dữ liệu có cấu trúc.
- Lưu trạng thái, thử lại có giới hạn và mô hình dự phòng cho phép phục hồi mà không chạy lại toàn bộ quy trình.
- Trong môi trường được quản lý chặt, trích dẫn chi tiết, đánh giá liên tục và con người phê duyệt là nền tảng tạo niềm tin.

## [Growing as an engineer in a world of AI](https://nlopes.dev/writing/growing-as-an-engineer-in-a-world-of-ai)

Bài viết cho rằng rủi ro lớn với kỹ sư mới vào nghề không phải AI lấy hết việc làm, mà là họ ngừng học khi AI loại bỏ những trở ngại từng tạo ra việc học. Quá trình tự đọc tài liệu, thử, thất bại, gỡ lỗi và hình thành câu trả lời giúp kiến thức bền hơn nhờ “khó khăn có lợi” và hiệu ứng tự tạo. Nếu chỉ nhận lời giải rồi chuyển sang bài toán tiếp theo, kỹ sư có thể tạo ra mã chạy được nhưng không giải thích được lựa chọn, đánh đổi hay nguyên nhân lỗi; khoản “nợ nhận thức” này thường lộ ra khi hệ thống gặp sự cố.

Tác giả không khuyên tránh AI mà xem nó như công cụ khuếch đại việc học. Hãy hỏi vì sao, yêu cầu phương án thay thế và tình huống thất bại; tự đọc và hình thành mô hình ban đầu trước khi nhờ giải thích; viết lại từng phần thay vì sao chép; tiếp tục học từ sách nền tảng, Unix, tài liệu, đánh giá mã nguồn, thảo luận kiến trúc và phân tích sự cố. Thời gian tiết kiệm được nên dành cho suy nghĩ khó hơn. Nhà quản lý cũng phải tạo không gian học tập, đánh giá óc phán đoán và hiểu biết hệ thống thay vì chỉ đo sản lượng, đồng thời tiếp tục tuyển và phát triển kỹ sư trẻ để duy trì nguồn nhân lực lâu dài.

**Điểm chính:**
- Có lời giải nhanh không đồng nghĩa với hiểu vấn đề hoặc xây dựng được trực giác kỹ thuật.
- Gỡ lỗi, thiết kế hệ thống và mô hình dữ liệu cần trải nghiệm với sai lầm và đánh đổi thực tế.
- Sử dụng AI để đặt câu hỏi sâu hơn, không chỉ để tạo kết quả cuối cùng.
- Đánh giá mã nguồn và viết tài liệu có thể trở thành bài tập tư duy chủ động trong quy trình dùng AI.
- Sự phát triển của kỹ sư trẻ là trách nhiệm chung của cá nhân, người hướng dẫn và tổ chức.

## [Note To My Younger Self](https://yewjin.substack.com/p/note-to-my-younger-self)

Sau hai thập kỷ làm việc tại các công ty công nghệ lớn, tác giả đúc kết tám nguyên tắc nghề nghiệp đơn giản nhưng khó duy trì. Hãy yêu công việc thực tế thay vì chỉ chạy theo chức danh; liên tục hỏi “tại sao” để tìm nguyên nhân gốc; xây dựng quan hệ chân thành bằng sự hữu ích đi kèm ranh giới rõ ràng; tạo niềm vui trong môi trường làm việc; lắng nghe và truyền đạt chính xác; ghi lại tác động của mình hằng tuần; chủ động xin phản hồi cụ thể rồi hành động ngay; và khi có thể, chọn người quản lý có thể giúp mình trưởng thành thay vì chỉ chọn chức danh hấp dẫn.

Các nguyên tắc này không phải quy tắc tuyệt đối, và tác giả thừa nhận góc nhìn của mình chịu thiên kiến của người thành công. Khi công việc tốt, người quản lý tốt, sự tử tế, khả năng được ghi nhận và sức khỏe tinh thần xung đột, quyết định phải dựa vào giai đoạn nghề nghiệp, kỹ năng còn thiếu, hoàn cảnh cá nhân và thời gian đánh đổi. Một câu hỏi hữu ích là điều gì vẫn còn giá trị sau năm năm: dự án thường bị quên, còn kỹ năng, cách suy nghĩ và mối quan hệ tốt tiếp tục sinh lợi lâu dài.

**Điểm chính:**
- Xem công việc đầu tiên như phòng thí nghiệm để học và giải quyết vấn đề, không chỉ như một nấc thang thăng tiến.
- Quan hệ bền vững đến từ việc giúp đỡ thật lòng, nhưng vẫn cần ranh giới và khả năng trình bày thành quả.
- Giao tiếp tốt kết hợp lắng nghe, giải thích theo đối tượng và biết khi nào nên im lặng.
- Nhật ký thành quả cùng phản hồi cụ thể tạo bằng chứng cho tiến bộ và giúp điều chỉnh sớm.
- Người quản lý ảnh hưởng mạnh đến cách suy nghĩ, kỹ năng vô hình và quỹ đạo nghề nghiệp dài hạn.

## [Google hits 50% IPv6](https://blog.apnic.net/2026/04/28/google-hits-50-ipv6/)

Google ghi nhận lần đầu khoảng một nửa người dùng truy cập dịch vụ của họ qua IPv6, đánh dấu giao thức này đã trở thành thành phần trưởng thành của Internet toàn cầu. APNIC Labs cùng thời điểm đo được khoảng 42%, nhưng chênh lệch không nhất thiết là mâu thuẫn. Mẫu của APNIC đến từ quảng cáo phân phối không đồng đều giữa các nền kinh tế, sau đó được điều chỉnh theo ước tính số người dùng Internet của từng nơi. Ở cấp từng nền kinh tế, số liệu của APNIC nhìn chung gần với Google và các nhà đo lường khác; hai tập dữ liệu có thể được xem như khoảng ước lượng hợp lý cho mức triển khai toàn cầu.

Quá trình áp dụng IPv6 phân bố rất khác nhau giữa quốc gia, nhà mạng cố định và mạng di động. Tốc độ chuyển đổi chậm không đồng nghĩa thất bại: nhiều nhà cung cấp còn phải khai thác hạ tầng IPv4 đã đầu tư lớn, trong khi mạng mới có thể giảm tổng chi phí khi chọn IPv6 từ đầu. Internet hiện vận hành với cả IPv4 trực tiếp, IPv4 qua NAT hoặc CGNAT và IPv6; vì vậy giữ IPv4 cũng không loại bỏ độ phức tạp. Khả năng liên thông ngày càng được xử lý ở tầng vận chuyển, dịch vụ trung gian và các nhà cung cấp nội dung hỗ trợ hai giao thức, thay vì yêu cầu mọi hệ thống phía sau chuyển đổi cùng lúc.

**Điểm chính:**
- Mốc 50% của Google cho thấy IPv6 không còn là công nghệ thử nghiệm hay bên lề.
- Số liệu toàn cầu phụ thuộc mạnh vào tập người dùng được đo và phương pháp gán trọng số.
- Đường cong áp dụng của từng nền kinh tế có thể khác đáng kể so với xu hướng tổng hợp.
- IPv4 hiện đại đã dựa vào NAT và CGNAT, nên duy trì nó không phải lựa chọn hoàn toàn đơn giản.
- Chuyển đổi thực tế là bài toán kỹ thuật, vốn đầu tư và thị trường, không chỉ là quyết định chọn giao thức.

## [The unwritten laws of software engineering](https://www.manager.dev/newsletter/the-unwritten-laws-of-software-engineering)

Bài viết tổng hợp bảy quy tắc vận hành mà kỹ sư thường chỉ ghi nhớ sau khi gặp sự cố. Nếu hệ thống hỏng ngay sau một lần triển khai, hãy quay lui để ổn định trước rồi mới điều tra, thay vì mất thời gian chứng minh thay đổi của mình vô can. Bản sao lưu chỉ đáng tin khi đã thử khôi phục và biết rõ lượng dữ liệu có thể mất, quyền thực hiện cùng thời gian phục hồi. Nhật ký cần đủ thông tin, có mã liên kết xuyên dịch vụ và dễ tìm kiếm, nhưng không nên dài đến mức che khuất tín hiệu quan trọng.

Mọi thay đổi dữ liệu phải có phương án quay lui đã được kiểm thử. Phụ thuộc bên ngoài chắc chắn sẽ lỗi, nên cần hiểu giới hạn tốc độ, tác động khi ngừng hoạt động, cam kết dịch vụ và các phương án như bộ nhớ đệm, hàng đợi hoặc dữ liệu cũ. Với thao tác có rủi ro, nguyên tắc bốn mắt giúp phát hiện sai lầm trước khi thực hiện; việc không muốn gọi ai vào đêm muộn lại là dấu hiệu càng không nên làm một mình. Cuối cùng, giải pháp tạm thời thường tồn tại lâu hơn dự kiến, vì vậy phiên bản tối thiểu vẫn phải đơn giản và chấp nhận được, không phải một bản vá mong manh chờ sửa sau.

**Điểm chính:**
- Khi sự cố xảy ra sau triển khai, ưu tiên khôi phục ổn định rồi mới tìm nguyên nhân.
- Thử khôi phục định kỳ mới chứng minh bản sao lưu và quy trình phục hồi thật sự hoạt động.
- Mọi thay đổi dữ liệu cần đường quay lui nhanh, cụ thể và đã được kiểm thử.
- Thiết kế phụ thuộc bên ngoài theo giả định nó sẽ chậm, giới hạn yêu cầu hoặc ngừng hoạt động.
- Phương án tối thiểu nên có chất lượng đủ để sống lâu, vì bản sửa tạm rất dễ trở thành vĩnh viễn.

### Bonus

**Images:**
![Top Anti-Patterns in Service Architecture](https://substackcdn.com/image/fetch/$s_!mGbr!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8558b1b2-984f-4c42-bb23-e63a2252533c_2650x3068.png)
