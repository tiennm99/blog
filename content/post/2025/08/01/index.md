---
title: "Newsletter #42"
date: 2025-08-01
tags: [ "AI-Assisted", "Thuật toán", "Thiết kế hệ thống", "Go" ]
categories: [ "Newsletter" ]
---

*Mời bạn thưởng thức Newsletter #42.*

## [Challenging algorithms and data structures every programmer should try](https://austinhenley.com/blog/challengingalgorithms.html)

Austin Z. Henley cho rằng có những thuật toán và cấu trúc dữ liệu thật sự thú vị, từng xuất hiện trong phỏng vấn và làm thay đổi cách ông nhìn nhận vấn đề, và đề xuất sáu cái tên nên tự tay cài đặt. Sắp xếp topo dùng mỗi khi cần sắp xếp các phần tử phụ thuộc lẫn nhau, như thứ tự tác vụ trong hệ thống build hay thứ tự tính các ô trong bảng tính. Phân tích cú pháp đệ quy xuống cho phép ánh xạ từng luật ngữ pháp thành một hàm, đủ để dựng một trình biên dịch đơn giản trong vài giờ. Thuật toán so sánh chuỗi Myers là thuật toán mặc định mà Git dùng để hiển thị khác biệt giữa hai phiên bản.

Bộ lọc Bloom là cửa ngõ vào thế giới cấu trúc dữ liệu xác suất: với rất ít bộ nhớ, nó khẳng định chắc chắn một phần tử không có mặt, còn trường hợp ngược lại chỉ là "có thể có"; tác giả thừa nhận chưa từng cần nó ngoài phỏng vấn. Bảng mảnh lưu các thao tác chỉnh sửa thay vì chỉ giữ văn bản cuối cùng, nhờ đó tính năng hoàn tác và lưu tăng dần trở nên đơn giản, và được dùng trong bộ đệm văn bản của VS Code. Cuối cùng, cây Splay là cây nhị phân tự tối ưu, đưa phần tử vừa truy cập lên gốc mà không cần lưu thêm siêu dữ liệu, giống một cây có sẵn bộ nhớ đệm và dễ cài đặt hơn nhiều so với cây đỏ-đen. Cuối bài là vài gợi ý bổ sung như trie, cây phân đoạn hay union-find.

## [Everything I know about good system design](https://www.seangoedecke.com/good-system-design/)

Sean Goedecke định nghĩa thiết kế hệ thống là cách lắp ghép các dịch vụ như máy chủ ứng dụng, cơ sở dữ liệu, bộ nhớ đệm, hàng đợi hay event bus, và cho rằng thiết kế tốt thường trông nhàm chán: hệ thống chạy ổn trong thời gian dài mà không ai phải bận tâm. Phần khó nhất là trạng thái, vì thành phần có trạng thái có thể rơi vào tình trạng hỏng, nên hãy giảm số thành phần như vậy và để một dịch vụ duy nhất chịu trách nhiệm ghi vào một bảng. Với cơ sở dữ liệu, chỉ mục nên khớp với các truy vấn phổ biến, hãy dùng JOIN thay vì ghép dữ liệu trong bộ nhớ và đẩy truy vấn đọc sang bản sao chỉ đọc.

Thao tác chậm nên được chia thành phần tối thiểu phục vụ người dùng ngay, phần còn lại giao cho tác vụ nền qua hàng đợi. Bộ nhớ đệm cũng là một nguồn trạng thái, nên chỉ dùng sau khi đã cố gắng tăng tốc thao tác gốc; event hub như Kafka hữu ích nhưng không nên lạm dụng, vì gọi API trực tiếp thường dễ theo dõi hơn. Tác giả khuyên tập trung vào các luồng xử lý chịu tải chính, ghi log kỹ ở các nhánh lỗi, theo dõi cả phân vị p95 và p99, dùng cơ chế ngắt mạch và khóa idempotency khi thử lại, và quyết định trước hành vi khi gặp sự cố: giới hạn tần suất thì cho yêu cầu đi qua, còn xác thực thì luôn chặn. Kết luận của ông: thiết kế tốt không nằm ở mẹo thông minh mà ở việc dùng đúng chỗ những thành phần nhàm chán đã được kiểm chứng.

## [AI Coding Agents are Already Commoditized](https://www.seangoedecke.com/ai-agents-are-commoditized/)

Sean Goedecke nhận định AI agent lập trình không có "bí kíp" nào. Năm 2023, ông từng tự xây một agent trên GPT-3.5 rồi GPT-4 và phải chăm chút rất kỹ để mô hình không bị kẹt; khi đó nhiều người tin rằng cần những thủ thuật phức tạp như bầy agent kiểm tra chéo lẫn nhau hay hiểu sâu cấu trúc mã nguồn. Thực tế chỉ cần một mô hình nền thông minh hơn một chút. Claude Sonnet 3.7 dẫn đầu nhờ khả năng bám nhiệm vụ và ra quyết định tốt theo thời gian, còn phần mã của agent chỉ đơn giản là đặt mô hình vào một vòng lặp với công cụ đọc và ghi tệp.

Vì vậy thị trường rất khó cạnh tranh: các giải pháp mã nguồn mở như Codex của OpenAI nâng mặt bằng chất lượng chung, trong khi chi phí suy luận có thể thay thế lẫn nhau, đổi nhà cung cấp rất dễ dàng. Tác giả còn dựng một agent chạy trên GitHub Actions với GitHub Models, cả hai đều miễn phí, chỉ bằng khoảng 50 dòng cấu hình. Theo ông, cách để thắng là tận dụng kênh phân phối, như lợi thế tích hợp sẵn của GitHub, hoặc huấn luyện một mô hình tốt hơn và chỉ cung cấp nó qua agent của riêng mình.

## [Java, What's Old? Part I: Collections](https://foojay.io/today/java-whats-old-part-i-collections/)

Anthony Goubard giới thiệu những viên ngọc ẩn trong Collections của JDK, tất cả đều có từ Java 8 trở về trước nên dùng được ngay. Thay vì `Optional<Integer>`, Java có sẵn `OptionalInt`, `OptionalLong` và `OptionalDouble` làm việc trực tiếp với kiểu nguyên thủy. `IntSummaryStatistics` và `DoubleSummaryStatistics` ghi nhận giá trị nhỏ nhất, lớn nhất, tổng, số lượng và trung bình, hỗ trợ gộp nhiều bộ thống kê; tác giả phát hiện ra chúng khi tham gia One Billion Row Challenge. `LinkedHashMap` có một hàm khởi tạo cho phép sắp xếp theo thứ tự truy cập thay vì thứ tự chèn, kết hợp với việc ghi đè `removeEldestEntry` là có ngay một bộ nhớ đệm LRU gọn nhẹ, chỉ cần bọc bằng `Collections.synchronizedMap` khi dùng từ nhiều luồng.

`WeakHashMap` giữ tham chiếu yếu tới khóa nên bộ thu gom rác có thể xóa mục khi không còn tham chiếu mạnh nào; giá trị thì không, và mục có thể biến mất bất cứ lúc nào nên không hợp để duyệt hay kiểm tra rồi mới lấy. Tác giả dùng nó để lưu tạm chuỗi thời gian đã định dạng trong trình quản lý tệp Ant Commander Pro, giảm tải CPU khi cuộn bảng. Cuối cùng, `BitSet` lưu mỗi giá trị boolean bằng khoảng 1 bit, co giãn kích thước linh hoạt và có nhiều phương thức thao tác bit, tiết kiệm hơn hẳn `boolean[]` hay `List<Boolean>`.

## [Challenging projects every programmer should try](https://austinhenley.com/blog/challengingprojects.html)

Austin Z. Henley gợi ý những dự án đã dạy ông rất nhiều và có thể làm lại nhiều lần để học thêm, đặc biệt khi muốn học một ngôn ngữ hay framework mới. Trình soạn thảo văn bản buộc bạn chọn cấu trúc dữ liệu lưu văn bản như rope, gap buffer hay bảng mảnh, hiểu cách con trỏ "nhớ" cột, rồi cài đặt hoàn tác bằng mẫu Command và ngắt dòng. Trò chơi 2D kiểu Space Invaders dạy cách vẽ lên màn hình, vòng lặp game, xử lý đầu vào và quản lý đối tượng bằng mẫu Factory. Trình biên dịch cho một ngôn ngữ nhỏ như Tiny BASIC, xuất ra bất kỳ ngôn ngữ nào bạn thạo, đưa bạn qua phân tích từ vựng, phân tích cú pháp đệ quy xuống, cây cú pháp trừu tượng, kiểm tra ngữ nghĩa và sinh mã. Hệ điều hành mini giúp hiểu nạp khởi động, quản lý bộ nhớ, phân trang, lập lịch và hệ thống tệp.

Với ai muốn thử thách hơn, tác giả đề xuất bảng tính, kết hợp khó khăn của trình soạn thảo và trình biên dịch với đồ thị có hướng không chu trình và lập trình phản ứng, cùng trình giả lập máy chơi game, nên bắt đầu với CHIP-8 trước khi chuyển sang NES hay Gameboy. Mỗi dự án đều kèm danh sách kiến thức cần học và tài liệu đọc thêm, và cuối bài là các gợi ý từ cộng đồng như tự viết cơ sở dữ liệu, ray tracer hay tiện ích dòng lệnh kiểu grep.

## [Autonomous coding agents: A Codex example](https://martinfowler.com/articles/exploring-gen-ai/autonomous-agents-codex-example.html)

Birgitta Böckeler phân biệt hai nhóm AI agent lập trình: agent có giám sát, do lập trình viên điều khiển trong IDE như GitHub Copilot, Cursor hay Claude Code, và agent chạy nền tự động như OpenAI Codex, Google Jules hay Devin, làm cả nhiệm vụ trong môi trường riêng rồi tạo pull request. Bà giao cho Codex một việc nhỏ trong ứng dụng Haiven: hiển thị nhãn bộ lọc "client-research" thành "Client Research" và công bố toàn bộ nhật ký. Agent đọc AGENTS.md, README, rồi liên tục dùng `grep` với nhiều từ khóa, ba lần lạc vào node_modules mà không rút kinh nghiệm, cuối cùng tìm được hàm `toReadableText` sẵn có để mở rộng. Tuy vậy, nó không chạy được kiểm thử và pull request tạo ra làm hai bài kiểm thử hồi quy thất bại dù cách sửa rất đơn giản.

Từ đó tác giả rút ra vài nhận xét. Các agent ngày càng dựa vào tìm kiếm văn bản thô thay vì các cơ chế tìm mã phức tạp hơn. Môi trường phát triển từ xa là yếu tố then chốt, nhưng việc dựng đủ công cụ như Node, Python, Semgrep hay Gitleaks cho agent vẫn còn non nớt. Qua sáu lần chạy trên Codex, Jules và Claude Code, lời giải lần nào cũng hoạt động nhưng chỉ hai lần agent tái sử dụng mã có sẵn, bốn lần còn lại tạo mã trùng lặp. Bà cũng đặt câu hỏi khi nào nhóm nên bỏ hẳn một pull request làm dở thay vì sa vào hiệu ứng chi phí chìm.

## [Implementing an Undo/Redo System in a Complex Visual Application](https://mlacast.com/projects/undo-redo)

mlacast, trưởng nhóm phát triển của Alkemion Studio, một công cụ động não và viết trực quan dành cho game nhập vai trên bàn, chia sẻ cách xây hệ thống hoàn tác/làm lại nhận biết ngữ cảnh. Người dùng thao tác ở nhiều nơi như Board, Editor hay bảng Node, nên nguyên tắc cốt lõi là không cho hoàn tác thứ mình không nhìn thấy. Mỗi thao tác là một lớp Action có hai phương thức undo và redo; ActionGroup gom nhiều thao tác để hoàn tác một lần, như xóa Node kéo theo xóa Token. Một singleton ActionStore lưu các Action trong hai Action Volume cho việc đã làm và đã hoàn tác, còn một tệp cấu hình quyết định thao tác nào hợp lệ trong ngữ cảnh hiện tại để dựng ngăn xếp hoàn tác và làm lại, sắp theo chỉ số toàn cục.

Lớp trừu tượng container, lấy cảm hứng từ Docker, tạo môi trường cô lập khi người dùng mở một hộp thoại: thao tác bên trong có thể bị hủy hoặc được gộp vào môi trường chính, giống như giao dịch. Khó khăn lớn nhất là giữ đúng thứ tự thời gian khi thao tác di chuyển giữa các ngữ cảnh, nên chỉ số phải được tăng hoặc giảm lúc tạo, hoàn tác và làm lại để thao tác vừa làm lại luôn nằm trên cùng ngăn xếp. Điểm yếu còn lại là quan hệ phụ thuộc giữa các thao tác, và tác giả dự định dùng một đồ thị phụ thuộc cấu hình sẵn để giải quyết.

## [The software engineering 'squeeze'](https://newsletter.manager.dev/p/the-software-engineering-squeeze)

Anton Zaides cho rằng suốt 10-15 năm qua, kỹ sư phần mềm là nghề mang lại thu nhập cao nhất cho ai chịu học chăm chỉ một năm, và các công ty tuyển bất kỳ ai vượt qua vòng phỏng vấn. Theo ông, công việc này thật ra không quá khó, nên kết quả là một lớp kỹ sư trung bình rất dày, giờ đang bị "ép" giữa thị trường khó khăn và AI. Ông thẳng thắn nhận xét nhiều kỹ sư đã quen với công việc nhàn hạ và hay than phiền, trong khi ở các nghề khác người mới phải chấp nhận vất vả, lương thấp để đi lên.

Dù vậy, tác giả rất lạc quan: nhiều công ty do những người "vibe-coding" lập ra sẽ thành công và cần kỹ sư giỏi để mở rộng. Kỹ sư cần thêm kỹ năng của người quản lý sản phẩm và chút gu thiết kế, thay vì chỉ nhận ticket chi tiết rồi làm theo, vì theo ông thị trường có quá nhiều kỹ sư trung bình nhưng lại thiếu kỹ sư giỏi. Ông khuyên người đang thất nghiệp thử các công cụ AI mới và giải quyết những vấn đề thực tế quanh mình, đồng thời nhấn mạnh rằng chuyển nghề không có gì đáng xấu hổ: nghề này giờ dành cho người thật sự muốn theo đuổi nó.

## [Go is 80/20 language](https://blog.kowalczyk.info/article/d-2025-06-26/go-is-8020-language.html)

Krzysztof Kowalczyk gọi Go là ngôn ngữ 80/20: mang lại 80% tiện ích với 20% độ phức tạp, và sự ghét bỏ đến từ những người muốn 85% hay 97%. Dẫn lời Rob Pike, ông viết: "Không ai phủ nhận 87% mang lại nhiều tiện ích hơn 80%. Vấn đề là 7% tiện ích thêm đó đòi hỏi nhiều hơn 36% công sức." Các ví dụ gồm struct tag đơn giản hơn annotation hay macro, thư viện kiểm thử chuẩn chỉ vài trăm dòng mà vẫn đủ các tính năng cơ bản so với hàng chục nghìn dòng của jUnit, goroutine cho xử lý đồng thời với một phần nhỏ độ phức tạp của async trong C# hay Rust, và các kiểu dựng sẵn như slice, map, channel vốn đã là generic từ trước khi Go có generic do người dùng định nghĩa.

Theo tác giả, C#, Swift và Rust cứ mãi thêm tính năng, và ngay cả JavaScript cũng đi theo hướng đó. Nhưng cũng có một giới hạn dưới: thiếu enum vẫn ổn, còn thiếu struct thì ngôn ngữ không đủ hữu dụng. Mỗi tính năng tốn công cho người dùng, vì phải học không chỉ cách dùng mà cả lúc nên dùng và đọc được mã của đồng nghiệp, đó là lý do Google cần bộ quy tắc viết C++. Nó cũng tốn công cho người hiện thực: sau hơn 10 năm, trình biên dịch Swift vẫn chậm và thiếu ổn định, trong khi Go nhanh, đa nền tảng và vững chắc ngay từ phiên bản 1.0.

---

*Bài viết đã được viết lại bởi Claude Code với Opus 5.5 vào ngày 27/09/2026.*
