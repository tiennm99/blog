---
title: "Newsletter #36"
date: 2025-07-25
tags: [ "AI-Assisted", "Kỹ Thuật Phần Mềm", "Phát Triển Bản Thân", "AI", "Thiết Kế Hệ Thống", "Algorithms", "Code Review" ]
categories: [ "Newsletter" ]
---

*Mời bạn thưởng thức Newsletter #36.*

## [What Makes Strong Engineers Strong](https://www.seangoedecke.com/what-makes-strong-engineers-strong/)

Sean Goedecke cho rằng điều tách biệt kỹ sư giỏi với phần còn lại là khả năng xử lý những vấn đề xa lạ nhanh hơn người khác, và ông xếp bốn phẩm chất tạo nên điều đó theo thứ tự quan trọng giảm dần. Đứng đầu là sự tự tin: kỹ sư giỏi dám nhận những việc chưa từng làm dù chưa chắc chắn, lao thẳng vào vấn đề khó thay vì trì hoãn, và mỗi lần thành công lại giúp họ tự tin hơn để nhận việc khó hơn, tạo thành một vòng lặp tích cực. Thứ hai là tính thực dụng: họ ưu tiên giải pháp chạy được hơn thiết kế đẹp, sẵn sàng thỏa hiệp để kịp giao sản phẩm, và thường bất đồng với những người thông minh nhưng yếu thực chiến về các đợt tái cấu trúc không cần thiết; khi tranh luận, việc ai thực sự giao được sản phẩm là thước đo cuối cùng.

Phẩm chất thứ ba là tốc độ. Mọi kỹ sư giỏi đều làm nhanh, nhờ không trì hoãn và tích lũy kinh nghiệm dồn dập, và tốc độ cho phép họ thử nghiệm nhiều hơn cũng như theo đuổi những ý tưởng có giá trị cao. Tốc độ ấy không đến từ làm thêm giờ mà từ những đợt tập trung cao độ. Xếp cuối là năng lực kỹ thuật: cần một mức nền tảng nhất định nhưng không đòi hỏi trí tuệ thiên tài; điều quan trọng là thế mạnh của bạn có khớp với công việc hay không, và trí thông minh thuần túy thậm chí có thể cản trở nếu nó làm giảm tính thực dụng và tốc độ.
## [How do AI Code Reviews Impact Engineering Teams?](https://rdel.substack.com/p/rdel-92-how-do-ai-code-reviews-impact)

Bài viết tóm tắt một nghiên cứu tại Beko, nơi 238 lập trình viên sử dụng công cụ đánh giá mã nguồn tự động dựa trên GPT-4 (Qodo PR-Agent) trong mười tháng, với 4.335 pull request được phân tích qua khảo sát và số liệu hành vi. Kết quả cho thấy 73,8% nhận xét của AI được lập trình viên áp dụng, và 68,8% người tham gia cảm nhận chất lượng mã nguồn có cải thiện. Tuy vậy, thời gian đóng một pull request lại tăng từ 5 giờ 52 phút lên 8 giờ 20 phút, số nhận xét của người đánh giá gần như không đổi (từ 0,31 xuống 0,28 mỗi pull request), và 26,2% nhận xét của AI bị bỏ qua vì không liên quan, tức là các cảnh báo sai tạo thêm gánh nặng xử lý.

Kết luận chính là công cụ này bổ sung chứ chưa thay thế được con người: nó giúp chất lượng được cảm nhận tốt hơn nhưng không giảm tổng công sức đánh giá, cũng không giúp giao hàng nhanh hơn. Nghiên cứu khuyến nghị các nhóm coi nhận xét của AI là tín hiệu sớm chứ không phải quyết định cuối cùng, theo dõi số liệu để đo tác động thực tế lên chất lượng và tốc độ, đồng thời đầu tư ngay từ bây giờ vào việc tinh chỉnh câu lệnh và lọc bớt nhận xét nhiễu khi công nghệ tiếp tục tiến bộ.

## [Writing that changed how I think about PL](https://bernsteinbear.com/blog/pl-writing/)

Max Bernstein tổng hợp 16 tài liệu gồm bài báo, bài blog, video và kho mã nguồn đã thay đổi căn bản cách anh hiểu về ngôn ngữ lập trình và trình biên dịch. Một số cái tên nổi bật: bài của Andy Wingo khiến bộ thu gom rác kiểu sao chép trở nên cụ thể và dễ tiếp cận; loạt bài về bộ tối ưu của CF Bolz-Tereick giới thiệu kỹ thuật union-find và việc dùng Z3 như một công cụ chứng minh; công trình của Chris Fallin về tính đúng đắn của bộ cấp phát thanh ghi cho thấy có thể chứng minh hệ thống đúng trên chính đoạn mã đang xử lý; bài của Russ Cox về bộ máy biểu thức chính quy giải thích cách tính không tất định được hiện thực thành các "luồng" chạy trong không gian người dùng; và micrograd của Andrej Karpathy giúp học mạng nơ-ron mà không cần thư viện ngoài.

Điểm chung của các tài liệu này là chúng biến những khái niệm trừu tượng thành cách hiện thực gọn gàng, có thể nắm được trong một buổi chiều thay vì mất hàng tháng nghiên cứu. Với lập trình viên trẻ muốn tìm hiểu sâu về trình biên dịch hay trình thông dịch, đây là một danh sách đọc chất lượng và là minh chứng cho sức mạnh của lối viết kỹ thuật rõ ràng, súc tích.

## ~~[LLMs are Making Me Dumber](https://vvvincent.me/llms-are-making-me-dumber/)~~

~~Vincent Cheng đã đặt ra một câu hỏi thú vị và gây tranh cãi: liệu các mô hình ngôn ngữ lớn (LLMs) có đang khiến chúng ta trở nên "ngu đần" hơn không? Tác giả chia sẻ những quan sát cá nhân về cách AI đang ảnh hưởng đến quá trình học tập và phát triển kỹ năng của mình.~~

~~Tác giả chỉ ra những "đường tắt" trong học tập mà AI mang lại: sử dụng LLMs để hoàn thành các dự án lập trình mà không hiểu sâu về mã nguồn, giải bài tập toán bằng cách để AI tạo ra đáp án, hoặc soạn thảo email mà không luyện tập kỹ năng viết. Những hành vi này có thể dẫn đến việc "thoái hóa" khả năng giải quyết vấn đề và hy sinh độ sâu của việc học để đổi lấy tốc độ đầu ra.~~

~~Tuy nhiên, Vincent cũng thừa nhận những lợi ích ngắn hạn về năng suất và đưa ra những phép so sánh lịch sử với máy tính bỏ túi, GPS hay cuộc cách mạng công nghiệp. Ông nhận ra sự không chắc chắn về tác động dài hạn và đề xuất một chiến lược cân bằng.~~

~~Giải pháp mà tác giả đưa ra là có ý thức bảo tồn các kỹ năng cốt lõi như tư duy độc lập, ra quyết định và tập trung dài hạn, đồng thời sử dụng LLMs một cách chiến lược mà vẫn duy trì được tính chủ động cá nhân. Như ông viết: "Việc chuyển giao hoàn toàn sẽ làm tê liệt việc học thực sự nhưng tối đa hóa tốc độ và đầu ra ngắn hạn, và việc tìm ra sự cân bằng phù hợp là rất quan trọng."~~

## [How Cursor Indexes Codebases Fast](https://read.engineerscodex.com/p/how-cursor-indexes-codebases-fast)

Bài viết giải thích cách Cursor, một trình soạn thảo mã nguồn tích hợp AI, lập chỉ mục cả kho mã nguồn một cách nhanh chóng. Quy trình gồm năm bước: đầu tiên các tệp được chia nhỏ ngay trên máy người dùng thành những đoạn có ý nghĩa; tiếp theo Cursor tính một cây Merkle, tức cây băm của toàn bộ tệp hợp lệ, và đồng bộ nó với máy chủ; sau đó các đoạn mã được chuyển thành vector bằng mô hình embedding; các vector cùng metadata như số dòng và đường dẫn tệp đã được làm mờ được lưu trong Turbopuffer, một cơ sở dữ liệu vector từ xa; cuối cùng, cứ mười phút một lần, cây Merkle được so sánh để tìm tệp thay đổi và chỉ đồng bộ phần đó. Thay vì cắt theo số ký tự hay số token cố định, cách chia thông minh hơn là dựa vào cây cú pháp trừu tượng (AST), dùng các công cụ như tree-sitter để giữ nguyên ranh giới ngữ nghĩa mà vẫn nằm trong giới hạn token.

Về quyền riêng tư, mã nguồn không được lưu lại trên máy chủ của Cursor sau khi yêu cầu kết thúc, còn đường dẫn tệp được mã hóa bằng khóa bí mật phía máy khách. Khi bạn đặt câu hỏi, truy vấn được chuyển thành vector rồi đối chiếu với các vector đã lưu để tìm đoạn mã liên quan; các đoạn này được đọc từ máy cục bộ và gửi làm ngữ cảnh cho mô hình ngôn ngữ lớn. Cây Merkle là chìa khóa giúp phát hiện thay đổi hiệu quả và đồng bộ an toàn, đặc biệt có giá trị với những kho mã lớn nơi việc lập chỉ mục lại từ đầu là quá tốn kém.

## [A Leap Year Check in Three Instructions](https://hueffner.de/falk/blog/a-leap-year-check-in-three-instructions.html)

Falk Hüffner trình bày một hàm kiểm tra năm nhuận chỉ tốn khoảng ba lệnh CPU. Cách thông thường cần nhiều điều kiện: chia hết cho 4, không chia hết cho 100 trừ khi chia hết cho 400. Tác giả gói toàn bộ logic đó vào một phép nhân, một phép AND bit và một phép so sánh với các hằng số "ma thuật": `return ((y * 1073750999u) & 3221352463u) <= 126976u;`. Để tìm các hằng số này, ông dùng Z3, một bộ giải ràng buộc trên bitvector, để tìm kiếm trong không gian 96 bit; bắt đầu từ khoảng năm nhỏ rồi mở rộng dần, sau khoảng nửa giờ ông thu được bộ hằng số cho kết quả đúng với các năm từ 0 đến 102.499. Với phiên bản 64 bit, phạm vi đúng được mở rộng tới năm 5.965.232.499 và được chứng minh là tối ưu bằng chính cách tiếp cận đó.

Về hiệu năng, khi đo trên i7-8700K với đầu vào dễ đoán (luôn là năm 2025), mức cải thiện gần như không đáng kể (0,65 ns so với 0,69 ns). Nhưng với các năm ngẫu nhiên, công thức nhanh hơn cách hiện thực chuẩn 3,8 lần nhờ không có rẽ nhánh nên tránh được chi phí dự đoán nhánh sai. Tác giả cũng thừa nhận hầu hết ứng dụng thực tế chỉ kiểm tra những năm dễ đoán như năm hiện tại, nên cần các bài đo sát thực tế hơn trước khi đưa kỹ thuật này vào những hệ thống như mô-đun datetime của CPython. Đây là một bài tập thú vị về thao tác bit và cách dùng bộ giải ràng buộc để tối ưu thuật toán.

## [Reservoir Sampling](https://samwho.dev/reservoir-sampling/)

Reservoir sampling là thuật toán chọn mẫu ngẫu nhiên công bằng từ một luồng dữ liệu mà ta không biết trước kích thước. Thuật toán duy trì một mảng "hồ chứa" gồm `k` phần tử. Khi phần tử thứ `n` xuất hiện, nó được chọn với xác suất `k/n`; nếu được chọn, nó thay thế một phần tử ngẫu nhiên đang giữ, ngược lại nó bị bỏ qua. Phần tử đầu tiên luôn được giữ, và toán học đảm bảo rằng xác suất một phần tử cũ còn nằm trong hồ chứa đúng bằng xác suất phần tử mới được chọn, nên mọi phần tử đều có cơ hội ngang nhau, giống như mọi lá bài trong bộ đều phải có khả năng được rút như nhau.

Sam Rose minh họa ứng dụng qua một dịch vụ thu thập log. Khi lưu lượng tăng đột biến, thay vì chỉ giữ `k` log đầu tiên một cách tùy tiện, dịch vụ lấy mẫu công bằng để có một tập đại diện mà không bị quá tải; bộ nhớ sử dụng luôn dự đoán được vì tối đa chỉ có `k` phần tử, lúc yên ắng hầu như mọi log đều được ghi nhận, còn lúc cao điểm thì lượng log được giới hạn. Tác giả cũng nhắc tới các biến thể có trọng số để ưu tiên một số loại log, chẳng hạn log lỗi, cho những chiến lược lấy mẫu tinh tế hơn. Reservoir sampling giải quyết gọn gàng một bài toán thoạt nghe có vẻ bất khả: chọn mẫu công bằng khi không biết tổng số phần tử.

## [Beware the Complexity Merchants](https://chrlschn.dev/blog/2025/05/beware-the-complexity-merchants/)

Charles Chen cảnh báo về "những kẻ buôn bán độ phức tạp": những kỹ sư đưa sự phức tạp không cần thiết vào hệ thống, có thể vì cái tôi, có thể vì cố ý tự bảo vệ vị trí của mình. Bằng cách xây dựng những hệ thống rắc rối mà chỉ họ hiểu, họ tạo ra "lãnh địa" riêng luôn đòi hỏi sự chú ý, ngân sách và nhân lực, rồi dùng chính những khó khăn đó để biện minh cho việc được giữ lại và có thêm ảnh hưởng, kèm câu hỏi quen thuộc "Nếu không thì ai sẽ giải quyết đống phức tạp này?". Tác giả dẫn lời Ray Ozzie: "Độ phức tạp giết chết mọi thứ. Nó hút cạn sức sống của lập trình viên; nó khiến sản phẩm khó lập kế hoạch, xây dựng và kiểm thử."

Để chống lại xu hướng này, bài viết đề xuất yêu cầu kỹ sư ổn định hoặc đơn giản hóa phần phức tạp cũ trước khi thêm tầng mới, ưu tiên những giải pháp "nhàm chán" đã được kiểm chứng hơn công nghệ thời thượng, đòi hỏi tài liệu đầy đủ để hệ thống có thể chuyển giao cho người khác, không tin vào những lời hứa về "viên đạn bạc", và coi việc giữ độc quyền kiến thức hay cố tình làm rối là dấu hiệu cảnh báo. Thông điệp cốt lõi là những hệ thống đơn giản, có tài liệu tốt giúp cả nhóm cùng làm chủ và xóa bỏ môi trường mà những kẻ buôn bán độ phức tạp dựa vào để gây dựng ảnh hưởng.

## [Asserting Implications](https://tigerbeetle.com/blog/2025-05-26-asserting-implications/)

Bài viết ngắn từ TigerBeetle bàn về cách viết assertion cho phép kéo theo logic (implication) sao cho dễ đọc. Hầu hết ngôn ngữ lập trình không có cú pháp riêng cho phép kéo theo, dù nó rất hay xuất hiện trong assertion. Cách viết mặc định dựa trên tương đương `A⇒B ⇔ ¬A∨B`, tức là `assert(!a or b);`, nhưng dạng này khó đọc vì người đọc phải tự suy ngược ra ý định. Tác giả khuyên dùng câu lệnh điều kiện thay thế: `if (a) assert(b);`.

Ví dụ thực tế trong mã nguồn TigerBeetle: thay vì `assert(header_b != null or replica.commit_min == replica.op_checkpoint);`, ta viết `if (header_b == null) assert(replica.commit_min == replica.op_checkpoint);`. Phiên bản sau rõ ràng hơn vì nó chỉ ra trực tiếp điều kiện nào kích hoạt assertion, giúp ý định của mã nguồn minh bạch hơn. Đây là một thay đổi nhỏ nhưng là bài học hữu ích về việc ưu tiên khả năng đọc trong những đoạn mã kiểm tra tính đúng đắn.

---

*Bài viết đã được viết lại bởi Claude Code với Opus 5.5 vào ngày 27/09/2026.*
