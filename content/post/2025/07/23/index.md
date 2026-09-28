---
title: "Newsletter #34"
date: 2025-07-23
tags: [ "AI-Assisted", "TDD", "Java", "System Design", "Performance", "Career", "AI Coding" ]
categories: [ "Newsletter" ]
---

*Mời bạn thưởng thức Newsletter #34.*

## [Why TDD Doesn't Lead to Dumb Code](https://tidyfirst.substack.com/p/why-tdd-doesnt-lead-to-dumb-code)

Kent Beck phản bác một lập luận quen thuộc: phát triển hướng kiểm thử (TDD) sẽ khiến mã nguồn trở nên "ngớ ngẩn" vì lập trình viên chỉ viết đúng đủ để vượt qua từng ca kiểm thử mà không bao giờ tổng quát hóa. Theo ông, chất lượng thiết kế của mã viết theo TDD cũng chỉ tốt đúng bằng những quyết định thiết kế mà người viết đưa ra, không khác gì mã không dùng TDD. Ông minh họa bằng hàm tính giai thừa: bắt đầu với `assert factorial(1) == 1` và cài đặt trả về 1, thêm `assert factorial(2) == 2` thì tạm trả về 2. Thay vì cứ thêm từng dòng điều kiện, lập trình viên nhận ra cấu trúc ẩn: số 2 thực chất là `2 * 1`, số 2 ấy chính là tham số `n`, còn số 1 là kết quả của lời gọi đệ quy, và từ đó thu được hàm `n * factorial(n - 1)` tổng quát qua những bước rất nhỏ.

Khó khăn thực tế nằm ở chỗ khác: đôi khi chưa có đủ ca kiểm thử để ràng buộc mã nguồn chỉ ở trạng thái đúng, và đôi khi ta chưa biết cách tổng quát hóa, có thể giữ vài trường hợp đặc biệt trong nhiều năm, điều đó vẫn chấp nhận được miễn là mã chạy đúng với các trường hợp cần thiết. Điều không bao giờ xảy ra là sao chép mã vô tận. Cuối cùng, ông chỉ ra rằng cài đặt ngây thơ bị ràng buộc chặt với bộ kiểm thử, mỗi lần thêm khẳng định lại phải sửa hàm, còn tổng quát hóa giúp gỡ bỏ sự ràng buộc đó, cho phép thêm kiểm thử mà không đổi mã và ngược lại.

## [How Discord Indexes Trillions of Messages](https://discord.com/blog/how-discord-indexes-trillions-of-messages)

Discord kể lại cách họ làm lại hệ thống tìm kiếm tin nhắn, vốn được xây trên Elasticsearch từ năm 2017, để theo kịp quy mô hàng nghìn tỷ tin nhắn. Hệ thống cũ bộc lộ nhiều vết nứt: hàng đợi đánh chỉ mục dựa trên Redis làm rơi tin nhắn khi bị dồn ứ, việc đánh chỉ mục hàng loạt không chịu được lỗi khi một chỉ mục hay nút Elasticsearch gặp sự cố, các cụm lớn tốn nhiều chi phí vận hành và khó nâng cấp hay khởi động lại cuốn chiếu, còn chỉ mục của những máy chủ (guild) rất lớn phình to quá mức. Giải pháp là triển khai Elasticsearch trên Kubernetes bằng Elastic Operator, chia thành nhiều cụm nhỏ gom nhóm theo kiến trúc "cell", chuyển hàng đợi sang Google PubSub để bảo đảm không mất tin nhắn, và viết bộ định tuyến bằng Rust với Tokio để gom tin nhắn theo cụm và chỉ mục đích trước khi đánh chỉ mục hàng loạt.

Kiến trúc cell còn mở ra tính năng mới: tin nhắn riêng (DM) được phân mảnh theo `user_id` trong một cell riêng, cho phép tìm kiếm xuyên qua mọi DM của người dùng. Với các "Big Freaking Guilds" chạm giới hạn khoảng 2 tỷ tài liệu của Lucene, Discord đánh chỉ mục lại tin nhắn sang chỉ mục có nhiều phân mảnh chính hơn trong một cell dành riêng. Kết quả: thông lượng đánh chỉ mục tăng gấp đôi, độ trễ truy vấn trung vị giảm từ 500ms xuống dưới 100ms (p99 từ 1 giây xuống dưới 500ms), vận hành 40 cụm với hàng nghìn chỉ mục, và nâng cấp cụm tự động mà không ảnh hưởng dịch vụ.

## [Data Oriented Programming (DOP) in Java](https://nejckorasa.github.io/posts/data-oriented-programming-in-java/)

Lập trình hướng dữ liệu (DOP) đảo ngược thói quen của lập trình hướng đối tượng: thay vì gói trạng thái và hành vi chung trong một lớp, dữ liệu được mô hình bằng các cấu trúc đơn giản, thụ động, còn logic nằm trong các hàm độc lập thao tác trên dữ liệu đó. Bài viết nêu bốn nguyên tắc: mô hình hóa dữ liệu bất biến và minh bạch, chỉ mô hình đúng và đủ dữ liệu, khiến trạng thái không hợp lệ không thể biểu diễn được, và tách thao tác khỏi dữ liệu. Java hiện đại hỗ trợ tốt cách làm này qua ba tính năng: records làm lớp mang dữ liệu bất biến gọn nhẹ, sealed classes giới hạn tập kiểu con để trình biên dịch biết hết các trường hợp, và `switch` kết hợp so khớp mẫu có kiểm tra tính đầy đủ, chuyển lỗi từ lúc chạy sang lúc biên dịch.

Với ví dụ `Shape` gồm `Circle`, `Rectangle`, `Triangle`, hàm `getCenter` viết bằng một biểu thức `switch` thay cho việc thêm phương thức vào mọi lớp con, khiến mẫu thiết kế Visitor trở nên thừa. Khi thêm kiểu dữ liệu mới như `Pentagon`, trình biên dịch sẽ báo mọi `switch` còn thiếu nhánh, vì vậy tác giả khuyên tránh nhánh `default` để không làm mất kiểm tra này. DOP cũng phù hợp để xử lý kết quả tường minh, chẳng hạn kiểu `Result` với hai biến thể `Ok` và `Error` buộc bên gọi xử lý đủ mọi khả năng. Lợi ích tổng kết gồm mã dễ đọc, dễ bảo trì, ít ràng buộc, dễ kiểm thử và tái cấu trúc an toàn, rẻ hơn.

## [Why performance optimization is hard work](https://purplesyringa.moe/blog/why-performance-optimization-is-hard-work/)

Tác giả cho rằng tối ưu hiệu năng khó không phải vì thiếu kỹ năng hay kiến thức, mà vì về bản chất đó là công việc vét cạn, phải thử rất nhiều phương án. Về tính kết hợp, có những kỹ thuật chỉ phát huy khi đi cùng nhau, có những kỹ thuật lại làm chậm đi khi kết hợp, và việc loại bỏ các cách "hiển nhiên là kém" chỉ là phỏng đoán, vì thuật toán đơn giản có thể thắng nhờ vector hóa còn mã thông minh có thể thua vì dự đoán nhánh sai. Về tính liên tục, các thuật toán có ngưỡng chuyển đổi, như sắp xếp lai hay FFT, đòi hỏi chọn tham số bằng thử nghiệm và phải đo lại mỗi khi thay đổi, nên một bộ đo tự động là rất đáng giá. Về tính không tương thích, các ràng buộc phần cứng như hai bảng tra cứu không cùng vừa bộ nhớ đệm hay áp lực thanh ghi buộc ta phải chấp nhận đánh đổi.

Tác giả cũng phản bác quan niệm "trình biên dịch thông minh hơn con người": trình biên dịch không suy luận theo trừu tượng của bạn, thậm chí phân bổ thanh ghi kém, nên cần luôn kiểm tra mã hợp ngữ và dùng công cụ phân tích như `perf`. Tài liệu cũng là một rào cản: x86 có nhiều nguồn chi tiết, còn Apple Silicon gần như không có, khiến việc tối ưu chủ yếu là dịch ngược. Tóm lại, tối ưu đòi hỏi khám phá hàng chục trường hợp, làm việc với công cụ chưa đủ tốt và dung hòa các tối ưu xung khắc, nhưng những cải thiện nhỏ cộng dồn lại vẫn đáng giá vì chúng tiết kiệm thời gian của người dùng.

## [Good vs Great Animations](https://emilkowal.ski/ui/good-vs-great-animations)

Emil Kowalski tổng hợp các mẹo thực tế để đưa hiệu ứng chuyển động trên giao diện từ mức tốt lên mức xuất sắc. Trước hết, chuyển động cần có điểm xuất phát rõ ràng: một menu thả xuống nên mở ra từ vị trí nút bấm bằng cách đổi `transform-origin`, và với Radix có thể dùng sẵn biến CSS tương ứng. Hàm gia tốc (easing) là yếu tố quan trọng nhất; với phần tử đã có trên màn hình và đang di chuyển, `ease-in-out` mô phỏng tăng tốc rồi giảm tốc tự nhiên như một chiếc xe, còn trong đa số trường hợp nên mặc định dùng `ease-out`. Các đường cong có sẵn của CSS thường chưa đủ mạnh, nên tác giả gần như luôn dùng đường cong tùy chỉnh, gợi ý easing.dev và easings.co.

Với tương tác theo vị trí chuột, gắn trực tiếp giá trị vào con trỏ sẽ trông giả tạo; hook `useSpring` của Motion nội suy thay đổi theo kiểu lò xo giúp cảm giác tự nhiên hơn, nhưng chỉ nên dùng cho chuyển động mang tính trang trí, còn biểu đồ chức năng như trong ứng dụng ngân hàng thì không cần hiệu ứng. Hiểu rõ công cụ cũng quan trọng: dùng `clip-path` giúp chuyển màu chữ ở thanh tab ăn khớp với thanh đánh dấu, còn biến đổi 3D mở ra những hiệu ứng mới. Theo tác giả, khi phần mềm nào cũng đủ tốt, chuyển động được chăm chút là một cách để sản phẩm nổi bật.

## [Senior engineers should make side bets](https://www.seangoedecke.com/side-bets/)

Sean Goedecke cho rằng kỹ sư junior nên làm đúng việc được giao, vì công việc cần được người có kinh nghiệm giám sát và cách tốt nhất để thăng tiến là hoàn thành xuất sắc nhiệm vụ trước mắt. Ngược lại, kỹ sư senior không nên chỉ làm theo danh sách đầu việc mà nên dành 10–20% thời gian cho các "canh bạc phụ" (side bets): những dự án họ tin là có giá trị cho công ty nhưng chưa ai để ý tới, như một tính năng mới, một tối ưu hiệu năng hay một thay đổi giúp tăng tốc phát triển, với điều kiện phải mang lại lợi ích cụ thể. Canh bạc phụ đầy rủi ro: tệ nhất là mất thời gian và bị cấp quản lý đánh giá là làm việc không quan trọng, và phần lớn sẽ thất bại, khi đó cứ lặng lẽ bỏ qua và chuyển sang việc khác.

Lý do đáng làm là một canh bạc thành công bù đắp cho tất cả: với công việc thường ngày, người khác cũng có thể làm thay, còn giá trị từ canh bạc phụ hoàn toàn nhờ bạn. Khi thành công, hãy chủ động chia sẻ qua bài viết nội bộ hoặc trao đổi với quản lý; nếu thấy ngại khoe, có lẽ lợi ích chưa đủ cụ thể. Tác giả kể ví dụ tại GitHub: nút mở prompt trong trình soạn prompt không ai dùng, còn việc tích hợp quyền suy luận AI vào GitHub Actions thì được dùng thực tế. Ông thắng hai đến ba canh bạc mỗi năm, và nếu liên tục thất bại thì có lẽ nên dừng lại.

## [Avoiding Skill Atrophy in the Age of AI](https://addyo.substack.com/p/avoiding-skill-atrophy-in-the-age)

Addy Osmani cảnh báo nghịch lý của trợ lý lập trình AI: năng suất tăng nhưng kỹ năng có thể mai một nếu không cẩn thận. Một nghiên cứu năm 2025 của Microsoft và Carnegie Mellon cho thấy càng dựa vào AI, người ta càng ít tư duy phản biện. Dấu hiệu thường đến từ từ: ngừng đọc tài liệu, không còn tự gỡ lỗi mà dán thẳng thông báo lỗi cho AI, chép mã mà không hiểu vì sao nó chạy, ngại tự thiết kế kiến trúc và quên cả cú pháp cơ bản. Về lâu dài, lập trình viên có thể bế tắc trước vấn đề mới mà AI không giải được, lập trình viên junior dễ chững lại, và việc kèm cặp trong đội bị ảnh hưởng. Tác giả thừa nhận việc bỏ đi một số kỹ năng lỗi thời là bình thường, điều quan trọng là phân biệt kỹ năng nào có thể giao cho máy và kỹ năng nào phải giữ sắc bén.

Giải pháp là coi AI như một cộng sự, không phải cái nạng: luôn kiểm chứng và hiểu kết quả, chủ động tìm lỗi và trường hợp biên, nhờ AI giải thích từng dòng; dành những "ngày không AI" để tự viết mã và đọc tài liệu; tự thử giải quyết vấn đề 15–30 phút trước khi hỏi; rà soát mã do AI sinh ra như mã của đồng nghiệp; ghi lại những chủ đề thường phải nhờ AI để bổ sung kiến thức còn thiếu; và làm việc theo kiểu lập trình cặp để giữ vai trò cầm lái. Thông điệp cốt lõi: dùng AI để khuếch đại năng lực chứ không thay thế nó, giữ lại niềm vui và tay nghề giải quyết vấn đề.

## [Cursor best practices](https://x.com/paraschopra/status/1917466537637859544)

![Cursor best practices](https://pbs.twimg.com/media/Gpw1p1waYAAeAyY?format=jpg)

---

*Bài viết đã được viết lại bởi Claude Code với Opus 5.5 vào ngày 27/09/2026.*
