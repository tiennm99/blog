---
title: "Newsletter #82"
date: 2026-02-19
tags: ["AI-Assisted", "Newsletter", "Web Development", "Engineering Career", "Graphics", "DNS", "Software Engineering"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #82.*

## [How the Lobsters front page works](https://blog.nilenso.com/blog/2026/01/20/lobsters-front-page/)

Mã nguồn của Lobsters, cộng đồng chia sẻ liên kết về máy tính, được công khai nên tác giả đã đọc kỹ thuật toán xếp hạng trang chủ. Công thức cốt lõi là `hotness = -1 × (base + order × sign + age)`: giá trị càng âm thì bài càng đứng cao. `base` là tổng hệ số điều chỉnh của các thẻ (mỗi thẻ từ -10 đến +10, ví dụ `culture` hay `rant` bị trừ điểm), cộng thêm 0,25 nếu người gửi là tác giả bài viết. `order` là logarit cơ số 10 của điểm bài cộng điểm bình luận, nên tăng từ 0 lên 100 phiếu có tác động lớn hơn nhiều so với từ 1000 lên 1100 phiếu. Điểm bình luận tính bằng một nửa phiếu bài viết, bị chặn không vượt quá điểm của bài và bị bỏ hẳn khi `base` âm, nhờ vậy những bài chất lượng thấp gây tranh cãi không được đẩy lên nhờ bình luận. Thành phần `sign` hóa ra không có tác dụng thực tế, còn `age` là mốc thời gian đăng chia cho cửa sổ 22 giờ, tăng tuyến tính và dần lấn át số phiếu vốn chỉ tăng theo logarit.

Tác giả đánh giá thuật toán khá vững: bài mới có cơ hội hiển thị và không bài nào trụ quá lâu. Tuy vậy, bản sắc của Lobsters đến chủ yếu từ việc kiểm duyệt có chủ kiến, phạm vi hẹp về máy tính và hệ thống thành viên theo lời mời, chứ không phải từ thuật toán. Dù không hợp với nhóm người dùng tích cực nhất, tác giả nhận ra rút lui chỉ khiến mọi thứ tệ hơn, vì vài phiếu bầu sớm của một người cũng đủ đưa bài lên trang chủ.

## [Software engineers can no longer neglect their soft skills](https://www.qu8n.com/posts/most-important-software-engineering-skill-2026)

Tác giả cho rằng từ năm 2026, giao tiếp đã trở thành kỹ năng quan trọng nhất của kỹ sư phần mềm, vượt lên cả việc viết mã, thiết kế hệ thống hay hiểu sâu một ngôn ngữ như Rust. Lý do là các AI agent lập trình đã tiến bộ vượt bậc: tác giả dùng Claude Code cho gần như mọi tác vụ không đơn giản và chi hơn 500 USD chỉ trong tháng 12. Với Opus 4.5, dùng Claude Code nguyên bản đã giải quyết được khoảng 80% công việc, nên các mẹo viết prompt hay chọn MCP không còn là điểm khác biệt. Điểm nghẽn giờ đây chuyển từ khâu hiện thực sang khâu đặc tả: đặc tả càng rõ, agent càng làm đúng yêu cầu kỹ thuật lẫn nghiệp vụ, nhưng có được một đặc tả tốt lại rất khó.

Trên thực tế, ticket hiếm khi ghi đủ yêu cầu. Kỹ sư phải biết đặt câu hỏi để lộ ra những giả định mà chính người khác không nhận ra, điều phối các cuộc thảo luận về đánh đổi, từ chối mở rộng phạm vi mà không làm sứt mẻ quan hệ, và tự quyết những điều chưa ai nghĩ tới việc quy định. Trước đây, một kỹ sư giao tiếp ở mức trung bình nhưng viết mã xuất sắc vẫn có thể phát triển tốt; nay những phần việc ngoài lập trình trở thành yêu cầu bắt buộc. Kỹ sư quen tin rằng vấn đề nào cũng có lời giải và "best practice", còn làm việc với con người thì phức tạp hơn nhiều. Không thể nhờ AI để giao tiếp tốt hơn, vì giao tiếp tốt đòi hỏi sự thấu cảm, thứ mà ai cũng cần thêm trong bối cảnh hiện nay.

## [Dithering - Part 2](https://visualrambling.space/dithering-part-2/)

Phần hai của loạt bài minh họa trực quan về dithering (kỹ thuật tạo cảm giác có nhiều màu hơn thực tế) tập trung vào ordered dithering, phương pháp dùng một bản đồ ngưỡng (threshold map) để quyết định màu cuối cùng của từng điểm ảnh, trong phạm vi chuyển ảnh xám sang hai màu đen trắng. Tác giả bắt đầu từ lượng tử hóa: dùng một ngưỡng duy nhất thì mọi sắc xám chỉ thành đen hoặc trắng, còn dùng nhiều ngưỡng khác nhau cùng lúc thì một vùng màu sẽ thành hỗn hợp điểm đen và trắng phản ánh độ sáng ban đầu. Khi lát bản đồ này lên toàn bộ ảnh, việc xếp ngưỡng theo thứ tự tuần tự lại sinh ra các vạch dọc vì kết quả phản chiếu đúng bố cục của bản đồ. Ma trận Bayer 2x2 khắc phục điều đó bằng cách sắp lại các ngưỡng thành họa tiết đan chéo, giúp điểm đen trắng phân tán đều; nhưng chỉ với 4 mức ngưỡng thì chuyển tiếp giữa các sắc độ vẫn gắt, nên ma trận Bayer 4x4 với 16 mức cho chuyển tiếp mượt hơn hẳn.

Cách sắp xếp bản đồ ngưỡng quyết định họa tiết đặc trưng của ảnh. Bayer 8x8 với 64 mức cho dải chuyển màu dày và chi tiết hơn dù khác biệt khá nhỏ; ma trận Cluster Dot tạo các cụm chấm tròn mang cảm giác báo in cổ điển; còn Void and Cluster, phương pháp tác giả yêu thích, dựa trên blue noise nên cho họa tiết ít cứng nhắc và hòa vào sắc xám tự nhiên hơn. Phần tiếp theo sẽ bàn về error diffusion, một phương pháp dithering không dùng bản đồ ngưỡng.

## [What came first: the CNAME or the A record?](https://blog.cloudflare.com/cname-a-record-order-dns-standards/)

Ngày 8/1/2026, một bản cập nhật cho 1.1.1.1 nhằm giảm mức dùng bộ nhớ đã vô tình gây lỗi phân giải DNS cho nhiều người dùng. Nguyên nhân nằm ở đoạn mã gộp chuỗi CNAME khi chuỗi chỉ hết hạn một phần: trước đây mã tạo danh sách mới, đưa các bản ghi CNAME vào trước rồi mới nối bản ghi A/AAAA; để bớt cấp phát và sao chép, mã mới nối thẳng CNAME vào cuối danh sách câu trả lời sẵn có. Nhiều trình phân giải phía máy khách xử lý tuần tự, lưu "tên đang tìm" và chỉ cập nhật khi gặp CNAME, nên nếu CNAME nằm cuối thì bản ghi A bị bỏ qua và phản hồi bị coi là rỗng. Hàm `getaddrinfo` của glibc trên Linux gặp đúng lỗi này, còn một số switch Cisco thậm chí khởi động lại liên tục; systemd-resolved thì không sao vì tìm trên toàn bộ tập bản ghi.
Gốc rễ sâu hơn là sự mơ hồ trong RFC 1034 từ năm 1987: văn bản chỉ nói câu trả lời "possibly preface" bởi các CNAME, không dùng từ khóa bắt buộc như MUST hay SHOULD vì RFC 2119 chuẩn hóa chúng mãi tới năm 1997. RFC quy định rõ thứ tự bản ghi trong cùng một RRset là không quan trọng, nhưng không nói gì về thứ tự giữa các RRset khác nhau trong một phần của thông điệp, kể cả thứ tự các mắt xích trong chuỗi CNAME. Cloudflare vốn đặt CNAME lên trước nhưng không có kiểm thử nào giữ hành vi đó. Họ đã hoàn tác thay đổi, cam kết không đổi thứ tự nữa và gửi một Internet-Draft lên IETF đề xuất bắt buộc CNAME xuất hiện đúng thứ tự trước mọi bản ghi khác.

---

*Bài viết đã được viết lại bởi Claude Code với Opus 5.5 vào ngày 27/09/2026.*
