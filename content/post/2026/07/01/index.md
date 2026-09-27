---
title: "Newsletter #114"
date: 2026-07-01
tags: ["AI-Assisted", "Newsletter", "Go", "AI Engineering", "Software Architecture", "Algorithms", "Interview"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #114.*

## [Go errors are a story, most teams lose the plot](https://robinsiep.com/blog/posts/go-errors/)

Robin Siep phân tích một khác biệt cơ bản trong cách Go xử lý lỗi: khác với Java hay nhiều ngôn ngữ khác, lỗi trong Go không tự mang stack trace. Thay vào đó, lập trình viên bọc lỗi bằng ngữ cảnh ở mỗi tầng mà lỗi đi qua, chẳng hạn `fmt.Errorf("unable to get user: %w", err)`, để cuối cùng thu được một chuỗi như `unable to get user: failed to query users table: connection refused`. Tác giả gọi đây là "dấu vết logic": nếu được duy trì tốt, nó dễ đọc hơn một stack trace dài hàng chục dòng và vẫn đầy đủ ngay cả khi lỗi đi qua channel, goroutine hay các điểm bàn giao khác mà stack trace có thể đánh mất.

Vấn đề là dấu vết logic đòi hỏi kỷ luật liên tục từ cả đội. Chỉ cần một chỗ quên bọc lỗi, log có thể chỉ còn lại dòng `connection refused` trơ trọi; và giống như comment, một thông điệp bọc lỗi viết từ hai năm trước có thể đã lỗi thời hoặc gây hiểu nhầm. Theo quan sát của tác giả, phần lớn các đội không theo kịp gánh nặng bảo trì này, nên lỗi phát sinh trên môi trường thật thiếu thông tin để tìm ra nguyên nhân. Giải pháp trung dung được đề xuất là gắn stack trace ngay khi ứng dụng tạo lỗi hoặc lần đầu nhận lỗi từ thư viện bên thứ ba, rồi chỉ thêm ngữ cảnh thủ công khi nó thật sự làm rõ vấn đề. Khi đó stack trace trở thành lớp dự phòng rẻ và luôn có sẵn. Việc tự cài đặt khá đơn giản, hoặc có thể dùng `pkg/errors` của Dave Cheney, hay `cockroachdb/errors` nếu cần một thư viện còn được bảo trì tích cực.

## [The Last Technical Interview](https://steve-yegge.medium.com/the-last-technical-interview-bc13ddcf4564)

Steve Yegge, người đã phỏng vấn kỹ thuật gần 35 năm, từng là Bar Raiser ở Amazon và thành viên Hiring Committee ở Google, cho rằng quy trình phỏng vấn truyền thống đang đi đến hồi kết. Mô hình vài buổi phỏng vấn một giờ dồn trong một ngày gần như không đổi suốt năm mươi năm, dù kết quả rất tệ: người phỏng vấn thường bất đồng với nhau, điểm phỏng vấn gần như không dự đoán được hiệu quả làm việc thật, còn hồ sơ ứng viên ngày càng vô dụng vì AI hỗ trợ viết. Câu chuyện đáng nhớ nhất là lần bộ phận tuyển dụng ở Google đưa cho hội đồng một loạt hồ sơ phỏng vấn đã ẩn danh dưới danh nghĩa "bài tập hiệu chỉnh"; hội đồng bỏ phiếu loại khoảng hai phần ba, rồi mới biết đó chính là hồ sơ của các thành viên năm xưa.

Theo tác giả, tín hiệu tốt nhất luôn đến từ làm việc thật, như thực tập, chương trình co-op sáu tháng ở Geoworks hay hợp đồng thử việc, nên đã đến lúc ngừng "mô phỏng công việc". Mô hình "campfire" đang nổi lên ở San Francisco: mời ứng viên làm vài ngày có trả phí trên mã nguồn thật, yêu cầu thật, cùng đội thật. Để công bằng, mỗi phần việc phải "được tính hai lần": công ty nhận được tín hiệu đánh giá và kết quả thực tế, còn ứng viên mang về một bản ghi lâu dài, có xác nhận của công ty, về những gì họ đã làm và chất lượng ra sao, dù có nhận được lời mời hay không. Hệ thống này chỉ có giá trị khi các "dấu xác nhận" được cấp trung thực.

## [Guidelines for Respectful Use of AI](https://www.elidedbranches.com/2026/05/guidelines-for-respectful-use-of-ai.html)

Camille Fournier cho rằng nhiều lãnh đạo chỉ nhìn chính sách AI qua lăng kính bảo mật, tuân thủ hay chi phí, mà quên mất cách cả nhóm làm việc cùng nhau khi có AI. AI giúp một cá nhân tạo ra nhiều đầu ra hơn, nhưng nếu người đó không tự kiểm tra, phần việc kiểm soát chất lượng sẽ bị đẩy sang đồng đội và năng suất chung lại giảm. Nguyên tắc đầu tiên vì thế là: đừng bắt người khác đọc hay đánh giá thứ mà chính bạn chưa đọc. Điều này đúng với mã nguồn và càng đúng với tài liệu, vì ngữ cảnh trong đầu bạn lúc trò chuyện với AI có thể hoàn toàn không xuất hiện trong văn bản cuối cùng; nếu không thể giải thích và thảo luận về tài liệu đó, bạn không nên gửi nó đi.

Nguyên tắc thứ hai là "ngắn hơn thì tốt hơn": mã nguồn do AI viết thường dài dòng như mã hướng dẫn, pull request lên tới hàng nghìn dòng, tài liệu đáng lẽ 3 trang thành 10 đến 20 trang, còn tin nhắn và email biến thành bức tường chữ. Tác giả gợi ý một phép thử: nếu thay đổi này hỏng lúc 3 giờ sáng và không công cụ AI nào hoạt động, bạn có tự gỡ lỗi được không? Với tài liệu dài, hãy tóm tắt điểm quan trọng ngay phần đầu; nếu phải viết email thật dài để giải thích, có lẽ nên gọi điện. Cuối cùng, AI không phải cái cớ để tắt cả bộ não lẫn sự đồng cảm: hãy dùng năng suất tăng thêm để tạo ra sản phẩm đơn giản hơn, được kiểm thử kỹ hơn.

## [Software After AI](https://tomtunguz.com/harnessing-ai/)

Tomasz Tunguz lập luận rằng kỷ nguyên phần mềm quen thuộc, nơi các sản phẩm SaaS quản lý cơ sở dữ liệu bằng quy trình cố định, đang nhường chỗ cho kỷ nguyên "harness": lớp bao quanh LLM để biến nó thành agent đáng tin cậy. Ông ví AI như một con ngựa hoang cần được thuần hóa. Khi mọi công ty đều dùng chung những mô hình như nhau, lợi thế cạnh tranh không còn nằm ở bản thân mô hình mà thuộc về người "cầm cương" giỏi nhất.

Bài viết mô tả bảy thành phần của harness. Ngữ cảnh và bộ nhớ cần hệ thống truy xuất riêng cho từng lĩnh vực, cùng một "cơ sở dữ liệu ngữ cảnh" ghi lại quy trình vận hành thực tế của doanh nghiệp. Công cụ và hành động được cung cấp qua registry, có kiểm tra tham số và chặn thao tác nhạy cảm bằng bước phê duyệt, với MCP đóng vai trò mô liên kết. Điều phối là vòng lặp nghĩ, làm, quan sát, lặp lại, kèm lập kế hoạch, agent con và điều kiện dừng. Trạng thái và lưu trữ giúp một tác vụ hỏng ở bước 7 tiếp tục từ bước 8 thay vì làm lại từ đầu. Sandbox cô lập môi trường chạy. Khả năng quan sát và quản trị, gồm truy vết, log, eval và con người phê duyệt quyết định quan trọng, biến bản demo thành hệ thống chạy thật. Cuối cùng là tối ưu chi phí và quy trình: bước nào nên xử lý bằng logic xác định, bước nào dùng mô hình lớn hay nhỏ. Các phòng lab lớn sẽ thắng ở thị trường họ ưu tiên, nhưng vẫn còn hàng nghìn thị trường khác cho startup.

## [Design Patterns Are Dead. Long Live Design Patterns.](https://medium.com/google-cloud/design-patterns-are-dead-long-live-design-patterns-b2c2602fbdc4)

Christina Lin, một lập trình viên kỳ cựu, tự hỏi liệu design pattern có còn giá trị khi AI viết phần lớn mã nguồn. Singleton, Factory hay Observer vốn sinh ra cho con người chứ không cho trình biên dịch, nên ban đầu tác giả nghĩ chúng đã thành thừa. Nhưng khi codebase đủ lớn, AI bắt đầu viết lan man, vì nó cũng có giới hạn: nghiên cứu của Chroma trên 18 mô hình cho thấy độ tin cậy đều giảm khi đầu vào dài ra, hiện tượng "context rot" xuất hiện từ khoảng 300.000 token. Vì vậy pattern không chết mà được "thăng chức": từ bản thiết kế triển khai thành cách nén ý định vào prompt và rào chắn kiến trúc cho một mô hình xác suất.

Tác giả phân loại lại pattern bằng một câu hỏi: dùng pattern này để giúp con người đọc mã hay để kiềm chế AI? Những pattern chỉ bù cho tính năng ngôn ngữ còn thiếu như Iterator hay Prototype đã chết; các lớp trừu tượng dựng sẵn "phòng khi cần" cũng nên bớt, vì giờ đây mã nguồn thì rẻ, còn ý định mới đắt. Ngược lại, ba pattern trở nên quan trọng hơn bao giờ hết: Adapter ép đầu ra AI về định dạng chặt chẽ trước khi chạm vào cơ sở dữ liệu và trả lỗi lại để AI tự sửa; Decorator bọc cơ chế thử lại, giới hạn thời gian và theo dõi chi phí token quanh logic chính; Facade giấu quy trình agent phức tạp sau một giao diện gọn gàng dễ xem xét. Nguyên lý chung là coi đầu ra AI như dữ liệu không tin cậy: cách ly, kiểm tra ở biên và chỉ tin khi đã chứng minh được là hợp lệ.

## [Merge Intervals](https://dev.to/jaspreet_singh_86ae1740ac/merge-intervals-89l)

Jaspreet Singh phân tích bài Merge Intervals, một câu hỏi phỏng vấn rất phổ biến: cho mảng các khoảng `[start, end]`, hãy gộp mọi khoảng chồng lấn và trả về các khoảng rời nhau. Thoạt nhìn bài toán giống mô phỏng, và cách brute force là với mỗi khoảng, tiếp tục kiểm tra các khoảng phía sau để mở rộng điểm kết thúc, tốn `O(N²)`. Mấu chốt nằm ở một quan sát: sau khi sắp xếp theo điểm bắt đầu, mọi khoảng chồng lấn sẽ nằm liền kề nhau, nên chỉ cần so sánh khoảng hiện tại với khoảng vừa gộp gần nhất.

Thuật toán tối ưu vì thế rất gọn: sắp xếp theo `start` rồi duyệt từ trái sang phải; nếu điểm kết thúc của khoảng cuối trong danh sách kết quả nhỏ hơn điểm bắt đầu của khoảng hiện tại thì thêm khoảng mới, ngược lại cập nhật điểm kết thúc bằng giá trị lớn hơn trong hai điểm kết thúc. Với đầu vào `[[1,3],[2,6],[8,10],[15,18]]`, kết quả là `[[1,6],[8,10],[15,18]]`. Độ phức tạp tổng là `O(N log N)` do bước sắp xếp, còn phần duyệt chỉ `O(N)`. Tác giả cũng gợi ý cách trình bày khi phỏng vấn: giải thích rõ vì sao sắp xếp khiến các khoảng chồng lấn trở nên liền kề, và ghi nhớ quy tắc "sắp xếp trước, rồi xử lý từ trái sang phải" cho cả nhóm bài như Insert Interval, Meeting Rooms hay Non-overlapping Intervals.

## [Best Time to Buy and Sell Stock](https://dev.to/jaspreet_singh_86ae1740ac/best-time-to-buy-and-sell-stock-3792)

Jaspreet Singh tiếp tục với bài LeetCode kinh điển Best Time to Buy and Sell Stock: cho mảng giá cổ phiếu theo ngày, chỉ được mua một lần và bán một lần vào một ngày sau đó, hãy tìm lợi nhuận lớn nhất. Ví dụ với `[7,1,5,3,6,4]`, mua ở giá 1 và bán ở giá 6 cho lợi nhuận 5. Cách brute force là coi mỗi ngày là ngày mua, thử mọi ngày bán phía sau rồi giữ lợi nhuận lớn nhất; cách này đúng nhưng tốn `O(N²)` vì kiểm tra quá nhiều cặp mua-bán không cần thiết.

Quan sát then chốt là khi đứng ở một ngày, ta không cần nhớ toàn bộ giá trước đó mà chỉ cần giá thấp nhất từng thấy, vì lợi nhuận tốt nhất nếu bán hôm nay bằng giá hiện tại trừ giá thấp nhất đó. Tác giả kể rằng ban đầu đã nghĩ tới mảng quy hoạch động `dp[i]`, nhưng rồi nhận ra thông tin quan trọng duy nhất là giá nhỏ nhất, nên mảng có thể nén lại thành hai biến `minPrice` và `maxProfit`. Chỉ cần duyệt mảng một lần, tính lợi nhuận, cập nhật đáp án rồi cập nhật giá thấp nhất, thuật toán đạt `O(N)` thời gian và `O(1)` bộ nhớ. Đây là mẫu "prefix minimum": mỗi khi gặp bài về lợi nhuận lớn nhất, hiệu lớn nhất hay kết quả tương lai dựa trên giá trị quá khứ, hãy nghĩ tới việc duy trì giá trị nhỏ nhất hoặc lớn nhất trong lúc duyệt.

---

*Bài viết đã được viết lại bởi Claude Code với Opus 5.5 vào ngày 27/09/2026.*
