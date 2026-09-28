---
title: "Newsletter #55"
date: 2025-09-14
tags: ["AI-Assisted", "Performance", "CPU", "Durable-Queues", "Cognitive-Load", "Claude-Code", "Hiring"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #55.*

## [%CPU Utilization Is A Lie](https://www.brendanlong.com/cpu-utilization-is-a-lie.html)

Brendan Long chỉ ra rằng chỉ số %CPU utilization mà hệ điều hành báo cáo thường đánh giá thấp lượng công việc CPU thực sự đang gánh. Ông chạy stress-ng trên máy Ryzen 9 5900X (12 nhân, 24 luồng, bật Precision Boost Overdrive), lần lượt thay đổi mức tải từ 1% đến 100% và số worker từ 1 đến 24, rồi đo số thao tác hoàn thành. Kết quả cho thấy khi hệ thống báo 50%, tác vụ CPU tổng quát thực chất đã đạt khoảng 62% công suất tối đa, phép tính số nguyên 64-bit đạt 65–85%, phép tính ma trận đạt 80–100%, còn bài thử với Nginx đã phục vụ khoảng 80% số yêu cầu mỗi giây mà máy có thể xử lý.

Hai nguyên nhân chính là SMT (Hyperthreading) và cơ chế tăng xung. Khi số worker vượt quá 12 nhân vật lý, các luồng phải chia sẻ tài nguyên của cùng một nhân nên hiệu năng không tăng tuyến tính; đồng thời xung nhịp giảm khoảng 15% khi nhiều nhân cùng bận, khiến công thức "chu kỳ bận / tổng chu kỳ" không còn phản ánh đúng khả năng còn lại. Vì vậy, thay vì dựa vào phần trăm CPU để dự đoán khả năng mở rộng, tác giả khuyên nên đo trước lượng công việc tối đa mà máy chủ chịu được trước khi phát sinh lỗi hoặc độ trễ không chấp nhận được, theo dõi lượng công việc thực tế đang xử lý, rồi so sánh trực tiếp hai con số này. Đây là bài học hữu ích cho bất kỳ ai làm vận hành hệ thống hay lập kế hoạch dung lượng máy chủ.

## [We only hire the trendiest](https://danluu.com/programmer-moneyball/)

Dan Luu phân tích thói quen tuyển dụng phổ biến trong ngành công nghệ: nhiều công ty chỉ săn những ứng viên có lý lịch "hợp mốt" như tốt nghiệp trường danh tiếng hay từng làm ở công ty nổi tiếng, thay vì đánh giá năng lực thật. Ông kể về Mike, một kỹ sư 11 năm kinh nghiệm bị cho nghỉ việc ở Microsoft, liên tục bị một công ty ẩn danh là TrendCo từ chối với ba lý do: kinh nghiệm công nghệ không liên quan (thực chất là vì anh làm .NET), kinh nghiệm quá tạp nham và việc anh từng làm hợp đồng. Theo tác giả, đó chỉ là cái cớ; nhân viên điển hình của TrendCo là người trẻ, ít kinh nghiệm, xuất thân từ trường top, nên công ty vô thức tìm người giống mình.
Hệ quả là các công ty này phải chen nhau giành một nhóm ứng viên nhỏ với mức lương rất cao, hoặc chấp nhận mất người giỏi. Lấy cảm hứng từ câu chuyện Moneyball của Billy Beane trong bóng chày, Dan Luu cho rằng nên tìm những người bị thị trường đánh giá thấp nhưng làm việc thực sự tốt, dù ý tưởng này đã được bàn công khai từ lâu mà hiếm ai áp dụng. Giải pháp được đề xuất gồm tuyển dụng theo kiểu Moneyball, đầu tư nghiêm túc vào đào tạo và kèm cặp, và cải thiện công cụ cùng quy trình để mọi người đều có thể làm tốt bất kể lý lịch ban đầu. Bài viết đáng đọc cho cả người tuyển dụng lẫn người đi xin việc.

## [How I solved a distributed queue problem after 15 years](https://www.dbos.dev/blog/durable-queues)

Jeremy Edberg, người từng phụ trách hạ tầng của Reddit, kể lại một vấn đề đeo bám ông suốt nhiều năm: Reddit dựa vào hàng đợi tác vụ phân tán dùng RabbitMQ để xử lý hầu hết thao tác trước khi ghi vào cơ sở dữ liệu, chẳng hạn như lượt upvote. Hệ thống chạy tốt nhưng có một lỗ hổng nghiêm trọng: nếu tiến trình xử lý bị sập sau khi đã lấy tác vụ ra khỏi hàng đợi nhưng chưa kịp thực hiện, dữ liệu sẽ mất hẳn, kéo theo lượt bình chọn, bình luận hay bài đăng.

Lời giải mà ông tìm thấy ở DBOS là hàng đợi bền vững (durable queue), kết hợp hàng đợi tác vụ với workflow bền vững để điều phối đáng tin cậy nhiều tác vụ song song. Thay vì dùng bộ đệm trong bộ nhớ như Redis, nó dùng một cơ sở dữ liệu lưu trữ lâu dài, thường là PostgreSQL, làm cả nơi trung chuyển thông điệp lẫn nơi lưu kết quả. Mỗi tác vụ được ghi lại cùng dữ liệu đầu vào, các tác vụ con được lưu như "con" của tác vụ cha, nên khi có lỗi hệ thống tiếp tục từ bước cuối cùng đã hoàn thành thay vì chạy lại từ đầu. Cách làm này còn cho phép giới hạn số tác vụ chạy đồng thời, tuân thủ giới hạn tần suất gọi API bên ngoài, và truy vấn toàn bộ lịch sử bằng SQL để giám sát, gỡ lỗi. Đánh đổi chính là hiệu năng: hàng đợi dựa trên Redis cho thông lượng cao hơn, còn hàng đợi bền vững phù hợp với số lượng ít hơn nhưng là các tác vụ lớn, quan trọng với nghiệp vụ.

## [Cognitive load is what matters](https://minds.md/zakirullin/cognitive)

Artem Zakirullin cho rằng giữa vô vàn thuật ngữ thời thượng và "best practice", điều thực sự đáng quan tâm là tải nhận thức (cognitive load): lượng suy nghĩ mà lập trình viên cần bỏ ra để hiểu và làm việc với mã nguồn. Bộ nhớ làm việc của một người trung bình chỉ giữ được khoảng bốn mẩu thông tin cùng lúc, như giá trị biến, luồng điều khiển hay chuỗi lời gọi hàm; vượt ngưỡng đó thì việc đọc hiểu rất khó. Tải nội tại đến từ độ khó vốn có của bài toán và không thể giảm, còn tải ngoại lai sinh ra từ cách trình bày, thiết kế và có thể giảm đáng kể.

Các ví dụ về tải ngoại lai gồm if lồng nhau (nên dùng biến trung gian rõ nghĩa hoặc trả về sớm), cây kế thừa nhiều tầng, quá nhiều module nông với giao diện phức tạp so với chức năng ít ỏi, microservice chia quá nhỏ đến mức thành "distributed monolith", lạm dụng nguyên tắc DRY tạo ra ràng buộc giữa những phần không liên quan ("sao chép một chút còn hơn phụ thuộc một chút"), phụ thuộc nặng vào "phép màu" của framework, và kiến trúc nhiều lớp trừu tượng khiến việc lần theo lời gọi hàm trở nên mệt mỏi. Ngay cả mã trạng thái HTTP cũng buộc người đọc tự ánh xạ, trong khi chuỗi tự mô tả như "jwt_has_expired" rõ hơn 401. Hãy ưu tiên module sâu: chức năng mạnh sau giao diện đơn giản như năm hàm I/O của Unix. Thông điệp cuối cùng là sự đơn giản thắng sự tinh xảo: mã nguồn tốt là mã mà người mới có thể hiểu và đóng góp giá trị chỉ sau vài giờ.

## [Claude Code Framework Wars](https://shmck.substack.com/p/claude-code-framework-wars)

Shawn cho rằng lập trình viên nên thôi coi Claude như một công cụ trò chuyện, mà hãy xây dựng quanh nó một framework có cấu trúc: Claude đảm nhận việc viết mã, còn con người chuyển sang những vai trò giá trị hơn như quản lý dự án, thiết kế và kiến trúc phần mềm. Hiệu quả không đến từ những câu lệnh mơ hồ, mà từ quy tắc, quy trình và ngữ cảnh rõ ràng.

Tác giả tổng hợp tám quyết định cần cân nhắc khi xây dựng quy trình làm việc với Claude Code: nơi lưu yêu cầu công việc (backlog dạng markdown, đặc tả có cấu trúc hay hệ thống ticket); cách định hướng mô hình qua thư viện lệnh, tiêu chuẩn viết mã và hook kiểm tra; cách điều phối nhiều agent với vai trò riêng; cách chạy nhiều phiên song song không đụng độ bằng worktree hoặc container; cách kết nối Claude với cơ sở dữ liệu, trình chạy kiểm thử và hệ thống bên ngoài qua MCP; vai trò giao cho Claude như PM, kiến trúc sư, người triển khai hay QA; quy mô mã bàn giao, từ pull request nhỏ đến cả bộ khung ứng dụng; và cách lưu giữ ngữ cảnh lâu dài qua tài liệu. Bài viết cũng điểm qua các dự án mã nguồn mở tiêu biểu như Agent OS, Backlog.md, Claude-Flow, Symphony, Roo Commander và Claudable. Kết luận là AI làm việc tốt nhất khi được cho cấu trúc rõ ràng; các framework đang hội tụ về một tương lai nơi AI không phải hộp phép màu mà là một nhóm đồng đội bạn cần quản lý, và càng đầu tư cấu trúc thì kết quả nhận lại càng nhiều.

## [The Last Programmers](https://www.xipu.li/posts/the-last-programmers)

Xipu Li cho rằng chúng ta đang là thế hệ cuối cùng tự tay chuyển ý tưởng thành mã nguồn. Anh rời nhóm Amazon Q Developer vào tháng 5 để gia nhập startup Icon, vì thấy Amazon chậm chạp, thiếu tầm nhìn sản phẩm và ưu tiên chỉ số nội bộ hơn trải nghiệm người dùng. Tại Icon, một đồng nghiệp của anh gần như không đụng vào mã nguồn: anh ấy viết tài liệu thiết kế bằng ngôn ngữ thường, để Claude Code triển khai trên nhiều cửa sổ terminal song song và dành phần lớn thời gian để xem xét kết quả. Trong đội hình thành hai nhóm: nhóm thử nghiệm liên tục tìm cách giảm việc viết mã thủ công bằng công cụ AI, và nhóm "người gác cổng" tin rằng hiểu sâu mã nguồn là bắt buộc. Nhóm sau vẫn bắt được lỗi do AI tạo ra, nhưng thế giới đang thay đổi nhanh hơn khả năng gác cổng của họ.

Tác giả so sánh phần mềm với sô-cô-la: khi quy trình sản xuất đã chuẩn hóa thì ai cũng làm ra được, và cạnh tranh chuyển sang thương hiệu, phân phối, tâm lý khách hàng. Khi việc triển khai kỹ thuật trở thành hàng hóa, ba thứ còn giữ giá trị là hiểu nhu cầu thật của con người qua hành vi chứ không qua khảo sát, biết nên xây gì và không nên xây gì, và đưa sản phẩm đến đúng người. Người mới vẫn nên học lập trình nhưng đừng coi đó là kỹ năng duy nhất. Những thứ thực sự quan trọng vẫn luôn là hiểu con người, xây thứ họ muốn và đưa nó đến tay họ; mọi thứ khác chỉ là chi tiết triển khai.

## Bonus: Vài ảnh hay ho đến từ [ByteByteGo](https://bytebytego.com/)

![A Guide to Rate Limiting Strategies](https://substack-post-media.s3.amazonaws.com/public/images/c8da4839-d519-43a9-bffb-2c81a2c153f4_2250x2624.png)
![9 Docker Best Practices You Should Know](https://substack-post-media.s3.amazonaws.com/public/images/94510aef-adee-4c78-84cf-05dfe5f9d6c0_3000x3900.png)
![Where Do We Cache Data?](https://substack-post-media.s3.amazonaws.com/public/images/a5e59510-28d9-423e-bdc4-986d24e58f91_2808x4096.jpeg)

## Bonus: Một vài video hay ho

[All New Java Language Features Since Java 21 #RoadTo25](https://www.youtube.com/watch?v=X0-TGhktFnE)

---

*Bài viết đã được viết lại bởi Claude Code với Opus 5.5 vào ngày 27/09/2026.*
