---
title: "Newsletter #16"
date: 2025-05-03
tags: [ "AI-Assisted", "Programming Languages", "Code Quality", "Readability", "Latency", "Tech Industry", "Career" ]
categories: [ "Newsletter" ]
---

*Mời bạn thưởng thức Newsletter \#16.*

## [Choosing Languages](https://steveklabnik.com/writing/choosing-languages)

Steve Klabnik viết bài này sau khi Microsoft thông báo chuyển trình biên dịch TypeScript sang Go, và cộng đồng lập tức tranh cãi "sao không phải C#?", "sao không phải Rust?". Quan điểm của ông rất đơn giản: hãy viết chương trình bằng ngôn ngữ bạn muốn. Những ràng buộc kỹ thuật thường phụ thuộc vào bối cảnh hơn là tuyệt đối, và người ngoài hiếm khi biết bối cảnh thật của một dự án. Lý do chính của Microsoft là họ đang chuyển (port) mã nguồn hiện có chứ không viết lại từ đầu, và mã nguồn cũ có cấu trúc khá giống Go nên việc chuyển đổi dễ hơn. Klabnik cũng không thích lời khuyên "chọn đúng công cụ cho đúng việc", vì hiếm ai cố tình chọn sai; thứ trông như lựa chọn sai thường chỉ là do ta không thấy hết các yêu cầu phía sau.

Phần sâu sắc nhất là câu chuyện cá nhân. Năm 2013, khi còn trong nhóm Rails, ông từng chế giễu một người viết công cụ `grep` bằng Node và khiến tác giả tổn thương. Sự việc giúp ông nhận ra lời nói của mình có sức ảnh hưởng, và rằng "văn hóa khinh miệt" trong cộng đồng Ruby lúc đó đã tác động đến mình. Khi đến với Rust, ông chủ động góp phần xây dựng văn hóa bàn về Rust dựa trên ưu điểm của chính nó thay vì chê bai ngôn ngữ khác, và vì thế càng khó chịu với trào lưu "viết lại bằng Rust" lần này. Thông điệp cuối: mỗi người chọn ngôn ngữ vì những lý do riêng, nên khi không đồng tình, không có lý do gì để cư xử khó chịu.

## [How Long Should Functions Be?](https://tidyfirst.substack.com/p/how-long-should-functions-be)

Kent Beck cho rằng câu hỏi "hàm nên dài bao nhiêu dòng?" đã sai ngay từ đầu, vì phần mềm được nuôi lớn dần chứ không được tạo ra một lần. Dù ban đầu ngắn thế nào, các hàm vẫn sẽ dài ra theo thời gian, và hàm càng dài thì càng có xu hướng dài thêm. Để kiểm chứng, ông đo độ dài của 12.513 hàm trong JUnit 5: phần lớn chỉ 1–4 dòng (riêng hàm 2 dòng đã có 5.491), còn dài nhất là một hàm 74 dòng. Dữ liệu khớp rất tốt với phân phối lũy thừa (power law), với số mũ α ≈ 2,46, hệ số R² là 0,96 và độ dài trung bình khoảng 3,49 dòng.

Thông điệp thực hành của Beck là nhìn cả phân phối: nhiều hàm ngắn và một số hàm dài, thay vì áp một giới hạn dòng duy nhất. Ông dẫn nghiên cứu của Keith Braithwaite về tương quan giữa phát triển hướng kiểm thử (TDD) và phân phối dốc hơn. Tuy nhiên, kết quả trên một dự án không chứng minh mọi mã nguồn đều tuân theo quy luật bất biến. Nhận định trong bài rằng trung bình tất yếu tăng theo quy mô cũng không thể suy ra chỉ từ việc dữ liệu có đuôi dài; cần phân biệt quan sát thực nghiệm với kết luận thống kê tổng quát.

## [What Makes Code Hard To Read: Visual Patterns of Complexity](https://seeinglogic.com/posts/visual-readability-patterns/)

Trong lúc rà soát một dự án để tìm lỗi, tác giả nhận thấy mình mệt mỏi rất nhanh dù mã nguồn có chất lượng tốt, và nguyên nhân không nằm ở độ phức tạp chu trình (cyclomatic complexity) như ông dự đoán mà ở khả năng đọc hiểu. Hiện chưa có thước đo phổ biến nào cho khả năng đọc hiểu, nên ông dựa vào hai chỉ số gần nhất. Bộ chỉ số Halstead từ thập niên 70 đếm số toán tử và toán hạng: càng nhiều thì người đọc càng phải suy luận nhiều về cách chúng tương tác. Chỉ số Cognitive Complexity của SonarSource thì cộng điểm mỗi khi luồng xử lý bị ngắt khỏi thứ tự tuyến tính và mỗi khi có cấu trúc điều khiển lồng nhau. Ngoài ra, ông phân tích thêm hình dạng hàm, cách đặt tên và vòng đời của biến.

Từ đó tác giả rút ra 8 mẫu hình dễ nhận biết bằng mắt, áp dụng cho mọi ngôn ngữ: viết hàm nhỏ với ít biến và toán tử; tránh cú pháp lạ, ưu tiên các mẫu quen thuộc trong dự án; tách chuỗi `map`/`filter` hay biểu thức dài thành các nhóm logic bằng hàm phụ hoặc biến trung gian; giữ điều kiện ngắn gọn và không trộn lẫn nhiều toán tử logic; không dùng `goto` trừ một số trường hợp rất đặc biệt; hạn chế lồng nhau, nếu bắt buộc thì tách ra hàm riêng; đặt tên biến rõ nghĩa, dễ phân biệt và tránh che khuất biến (shadowing); và giữ vòng đời của biến càng ngắn càng tốt. Đây là bộ tiêu chí hữu ích để thảo luận khi xem xét mã nguồn.

## [IO Devices and Latency](https://planetscale.com/blog/io-devices-and-latency)

Benjamin Dicken (PlanetScale) dùng nhiều hình minh họa tương tác để kể lại lịch sử thiết bị lưu trữ và độ trễ của chúng. Băng từ lưu dữ liệu tuần tự nên truy cập ngẫu nhiên rất chậm. Ổ cứng HDD dùng đĩa từ quay nhanh với đầu đọc di chuyển, cải thiện đáng kể thời gian truy cập ngẫu nhiên. SSD không có bộ phận cơ học nên nhanh hơn nhiều và đọc ghi song song tốt, nhưng hiệu năng có thể giảm khi ổ phải chạy thu gom rác (garbage collection) để dọn các trang dữ liệu không còn dùng trước khi ghi mới.

Khi chuyển lên đám mây, lưu trữ thường được tách khỏi máy tính toán, chẳng hạn qua EBS. Bài viết minh họa độ trễ khoảng 250 micro giây cho lưu trữ qua mạng, 50 micro giây cho NVMe gắn trực tiếp và 100 nano giây cho RAM; đây là các con số minh họa, không phải cam kết cho mọi thiết bị hay thao tác. Tác giả cũng giới thiệu PlanetScale Metal tại thời điểm tháng 3/2025: dùng NVMe cục bộ, một máy chính và hai bản sao mặc định, hỗ trợ chuyển sang ổ lớn hơn và không áp trần IOPS nhân tạo. Khả năng đọc ghi vẫn bị giới hạn bởi phần cứng; cách giới thiệu này không có nghĩa thông lượng vô hạn.

## [The good times in tech are over](https://www.seangoedecke.com/good-times-are-over/)

Trong bài tháng 3/2025, Sean Goedecke nhìn lại thời kỳ kỹ sư phần mềm được hưởng nhiều phúc lợi và nhận xét môi trường đã khó khăn hơn sau làn sóng cắt giảm nhân sự. Ông lý giải sự thay đổi chủ yếu bằng lãi suất: nguồn vốn rẻ trong thập niên 2010 khuyến khích tuyển dụng và thử nghiệm, còn lãi suất cao hơn khiến doanh nghiệp chú trọng lợi nhuận. COVID được ông xem là yếu tố khuếch đại ngắn hạn. Nhận định AI chưa phải nguyên nhân của sự chuyển hướng này là đánh giá của tác giả vào thời điểm viết, không phải kết luận về mọi đợt sa thải sau đó.

Hệ quả là các công ty buộc phải tập trung vào vài mục tiêu mà ban lãnh đạo thực sự quan tâm, và nhiều hoạt động như đóng góp mã nguồn mở hay trải nghiệm lập trình viên bị cắt ngân sách. Ông khuyên kỹ sư nên chấp nhận rằng lợi ích của mình giờ có thể mâu thuẫn với lợi ích của công ty; bạn vẫn được quyền theo đuổi điều mình cho là đúng, nhưng sẽ phải trả giá, nhất là với các bạn junior. Mặt tích cực là ngành công nghệ đã gần với thực tế hơn và luật chơi cũng rõ ràng hơn: tạo ra giá trị cho công ty thì được thưởng, không tạo ra giá trị thì bị phạt, và "giá trị" nghĩa là thúc đẩy các kế hoạch cụ thể của ban lãnh đạo.

## ~~[Once You're Laid Off, You'll Never Be the Same Again](https://mertbulan.com/2025/01/26/once-you-are-laid-off-you-will-never-be-the-same-again/)~~

Mert Bulan kể lại ngày bị sa thải cùng phần lớn đồng đội. Nhìn lại, anh chỉ ra năm dấu hiệu báo trước: các buổi sự kiện nhóm bị hủy đột ngột; nhân viên nhận thông báo có gói hàng sắp giao (hộp để gửi trả thiết bị); ban lãnh đạo thiếu định hướng rõ ràng và liên tục tái cấu trúc; xuất hiện những cuộc họp bắt buộc không có nội dung cụ thể; và thời điểm công bố kết quả kinh doanh quý ở công ty đại chúng. Điều khiến anh day dứt nhất là mọi nỗ lực vượt mức, từ tự học React Native, nhận dự án đặc biệt từ CEO đến giới thiệu người tài cho công ty, đều không có ý nghĩa gì. Trong đợt sa thải, bạn chỉ là một dòng trong bảng Excel, do những người không hề biết bạn quyết định.

Theo tác giả, niềm tin giữa công ty và nhân viên đã bị phá vỡ khi các đợt sa thải diễn ra ngay cả lúc công ty báo lãi kỷ lục. Anh cũng lưu ý rằng luật lao động ở Đức không ngăn được sa thải hàng loạt. Nhiều người từng trải qua như anh giờ chỉ làm đúng phần việc được giao. Lời khuyên cho những người chưa bị sa thải: làm đúng số giờ trong hợp đồng; không cố gắng vượt mức để mong thăng tiến nội bộ mà hãy chuyển công ty để tiến lên; luôn duy trì phỏng vấn ở nơi khác; tận dụng lời mời làm việc bên ngoài để tăng thu nhập; và đừng lo lắng quá về việc hồ sơ có nhiều công việc ngắn hạn.

## Bonus: Vài ảnh hay ho đến từ [ByteByteGo](https://bytebytego.com/)

![What is MCP?](https://substack-post-media.s3.amazonaws.com/public/images/840e868d-2c83-4b1b-a881-df1da6c6e332_1309x1536.gif)
![How to Design a System like Instagram](https://substack-post-media.s3.amazonaws.com/public/images/6ff106a0-de83-48b0-9eb4-3f8bf0d43a57_1280x1566.gif)
![How to load your websites at lightning speed](https://substack-post-media.s3.amazonaws.com/public/images/214c0c6c-2426-49d0-9fa8-cdb9ce089dcc_1280x1585.gif)

---

*Bài viết đã được viết lại bởi Claude Code với Opus 5.5 vào ngày 27/09/2026; được review và chỉnh sửa bởi Codex với GPT 6.1 Sol vào ngày 09/11/2026.*
