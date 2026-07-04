---
title: "Newsletter #115"
date: 2026-07-02
tags: ["AI-Assisted", "Newsletter", "Go", "AI Engineering", "Software Engineering", "Testing", "Performance"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #115.*

## [Go Experiments Explained](https://www.alexedwards.net/blog/go-experiments-explained)

Alex Edwards giải thích cách Go đưa các tính năng thử nghiệm vào bản phát hành trước khi quyết định giữ, chỉnh sửa hoặc loại bỏ chúng. Các thử nghiệm có thể là gói mới trong thư viện chuẩn, thay đổi trình biên dịch/runtime, hoặc thậm chí thay đổi hành vi ngôn ngữ như biến vòng lặp trong Go 1.22. Phần lớn ban đầu tắt mặc định và cần bật qua biến môi trường `GOEXPERIMENT`; nếu phản hồi tốt, chúng có thể trở thành tính năng chính thức sau một hoặc hai bản phát hành. Một số thử nghiệm thì bị giữ lâu, tạm dừng, hoặc tồn tại như tính năng chẩn đoán chuyên biệt chứ không nhắm tới bật mặc định.

Bài viết cũng hướng dẫn cách xem thử nghiệm nào đang có, cách bật/tắt chúng bằng `GOEXPERIMENT`, và nên quan tâm tới những cái nào trong thực tế. Với lập trình viên Go thông thường, các mục đáng chú ý gồm `GreenTeaGC`, `Dwarf5`, `JSONv2`, `GoroutineLeakProfile`, `RuntimeSecret` và `RuntimeFreegc`. Lời nhắc quan trọng là thử nghiệm không thuộc cam kết tương thích của Go: API, hành vi và hiệu năng có thể thay đổi, nên hãy dùng để thử, đo hiệu năng và góp phản hồi hơn là phụ thuộc quá sớm trong môi trường production.

**Điểm chính:**
- Thử nghiệm trong Go là cơ chế để lấy phản hồi thực tế trước khi một thay đổi trở thành mặc định hoặc bị loại bỏ.
- `GOEXPERIMENT` cho phép bật tính năng tắt mặc định, hoặc tắt tạm thời một số thử nghiệm đã bật mặc định bằng tiền tố `no`.
- Không có một trang chính thức duy nhất theo dõi toàn bộ trạng thái thử nghiệm; cần kết hợp `go doc goexperiment.Flags`, mã nguồn Go, ghi chú phát hành và vấn đề trên GitHub.
- Với dự án production, nên thử trong môi trường kiểm soát và đo hiệu năng trước khi phụ thuộc vào chúng.

## [Low-Level Network Optimizations: Socket Options That Matter](https://goperf.dev/02-networking/low-level-optimizations/)

Bài viết trong Go Optimization Guide đi qua các tùy chọn socket có thể ảnh hưởng trực tiếp tới độ trễ, thông lượng và độ ổn định của ứng dụng mạng viết bằng Go. Mặc định của hệ điều hành thường ưu tiên an toàn và tương thích, nhưng dưới tải thật chúng có thể trở thành nút nghẽn trước cả CPU hoặc bộ nhớ. Các ví dụ quan trọng gồm tắt Nagle bằng `TCP_NODELAY` cho hệ thống cần gửi thông điệp nhỏ thật nhanh, dùng `SO_REUSEPORT` để nhiều worker cùng bind một cổng và giảm tranh chấp accept queue, hoặc điều chỉnh `SO_RCVBUF` và `SO_SNDBUF` theo bandwidth-delay product để giữ đường truyền đủ đầy mà không tạo hàng đợi quá lớn.

Phần thực tế nhất là tác giả liên tục nhắc rằng tuning mạng không nên làm bằng cảm tính. TCP keepalive có thể giúp phát hiện kết nối chết sớm hơn, nhưng nếu quá gắt sẽ tăng traffic và dễ báo sai trên đường truyền nghẽn. `SOMAXCONN` lớn hơn giúp chịu burst kết nối tốt hơn, nhưng đây là cấu hình cấp hệ thống. Khi cần syscall trong Go, nên dùng `net.ListenConfig.Control` và `syscall.RawConn` để đặt tùy chọn đúng thời điểm, trước khi socket được bind hoặc giao cho runtime. Mỗi thay đổi cần được đo bằng tải gần thực tế, metrics và profiling.

**Điểm chính:**
- `TCP_NODELAY` giảm độ trễ cho thông điệp nhỏ, nhưng đánh đổi băng thông do gửi packet ít được gom hơn.
- `SO_REUSEPORT` giúp nhiều process hoặc worker nhận kết nối song song trên cùng một cổng, tận dụng CPU tốt hơn.
- Buffer socket quá nhỏ làm tăng syscall và giới hạn thông lượng; quá lớn lại tăng độ trễ và lãng phí bộ nhớ.
- Tuning socket phải đi kèm đo đạc thực tế; sao chép cấu hình từ hệ thống khác rất dễ làm hiệu năng tệ hơn.

## [When Is 100% Vibe Coding OK ?](https://dev.to/realvorl/when-is-100-vibe-coding-ok--38p)

Viorel PETCU dùng một ví dụ rất cụ thể để phân biệt khi nào "vibe coding" hữu ích và khi nào nó chỉ tạo thêm rác bảo trì. Tác giả không phản đối việc dùng AI để viết nhanh script dùng một lần, visualization tạm, parser tạm hoặc tài liệu không ai phải duy trì lâu dài. Nhưng khi yêu cầu mơ hồ và hệ thống cần bảo trì, tốc độ ban đầu dễ biến thành chi phí review, sửa sai và hiểu lại bối cảnh. Vấn đề không phải AI viết mã, mà là con người chưa sở hữu đủ ràng buộc để biết đầu ra đúng hay sai.

Ví dụ tích cực là tác giả dùng Go và ChatGPT để giải một puzzle gỗ: 25 pentacube giống nhau cần lấp đầy khối `5x5x5`. Bài toán có luật rõ, không gian trạng thái hữu hạn và kết quả kiểm chứng được, nên AI có thể tăng tốc việc dựng DSL, sinh phép xoay, đặt mảnh đệ quy và backtrack. Dù model nhiều lần hiểu sai, hallucinate ràng buộc hoặc sinh mã lỗi, tác giả vẫn đi tiếp được vì đã biết bài toán có nghiệm và biết invariant nào phải giữ. Kết luận thực dụng: 100% vibe coding có thể ổn khi con người nắm invariant, ràng buộc thật và cách kiểm chứng; nếu yêu cầu cũng chỉ là "vibe", hệ thống không có mục tiêu chắc để hội tụ.

**Điểm chính:**
- Vibe coding hợp với việc dùng một lần, thử nghiệm nhanh hoặc bài toán có đầu ra dễ kiểm chứng.
- Khi phần mềm cần bảo trì, yêu cầu mơ hồ làm AI tạo thêm chi phí review thay vì tiết kiệm thời gian.
- AI phát huy tốt khi con người đã biết ràng buộc, invariant và tiêu chí đúng/sai của bài toán.
- Điểm chuyển từ thử nghiệm sang kỹ thuật nghiêm túc là bước làm rõ, kiểm chứng và đóng gói lại kết quả.

## [Self-calling executables](https://log.pfad.fr/2026/self-calling-executable/)

Olivier mô tả kỹ thuật "self-calling executable": một chương trình đang chạy khởi động lại chính executable của nó, trực tiếp hoặc gián tiếp, nhưng với vai trò khác. Trong Go test, cách này hữu ích khi muốn kiểm thử `main` như một hộp đen mà không bị vướng global state trong cùng tiến trình. Test có thể gọi `os.Args[0]` để chạy lại test binary, gắn biến môi trường như `TEST_MAIN`, rồi trong `TestMain` phát hiện biến đó để chạy command chính thay vì chạy bộ test thông thường. Nhờ vậy, phần cần kiểm thử được cô lập trong subprocess.

Use case thú vị hơn là TUI cần tương tác với công cụ bên ngoài. Ví dụ `ssh` có cơ chế `SSH_ASKPASS`: khi cần mật khẩu, nó gọi một executable khác để lấy câu trả lời qua stdout. Một TUI như `jjui` có thể trỏ `SSH_ASKPASS` về chính binary của mình; khi ssh gọi askpass, tiến trình con kết nối ngược về TUI chính qua Unix socket, chuyển prompt, nhận mật khẩu từ người dùng rồi in ra stdout. Bài viết cũng nhấn mạnh phần bảo vệ: dùng biến môi trường chứa khóa ngẫu nhiên, kiểm tra PID ancestor chain của tiến trình kết nối, và cẩn thận với bookkeeping. Nếu truyền biến môi trường sai, kỹ thuật này dễ gây đệ quy vô hạn; với Go race detector còn cần chú ý độ trễ thoát mặc định có thể làm test tích hợp chậm bất ngờ.

**Điểm chính:**
- Self-calling executable giúp chạy cùng một binary ở vai trò khác, thường được phân biệt bằng biến môi trường.
- Trong Go, kỹ thuật này có thể kiểm thử `main` qua subprocess thay vì gọi trực tiếp trong cùng tiến trình test.
- Với askpass hoặc TUI, tiến trình con có thể kết nối ngược về tiến trình chính để lấy dữ liệu nhạy cảm từ người dùng.
- Cần cơ chế xác thực, kiểm tra quan hệ tiến trình và dọn biến môi trường để tránh prompt giả, rò rỉ hoặc đệ quy vô hạn.

## [Modern Engineering Values](https://cpojer.net/posts/modern-engineering-values)

Christoph Nakazawa viết về cách giá trị kỹ thuật thay đổi khi coding agent làm phần lớn công việc viết mã. Tác giả cho rằng bottleneck không còn nằm ở việc gõ code, mà nằm ở quyền sở hữu, gu kỹ thuật, review, kiểm chứng và khả năng đặt rào chắn đúng cho hệ thống. Agent có thể giúp một người hiểu sâu sản phẩm ship nhanh hơn rất nhiều, nhưng cũng khuếch đại nhiễu nếu người dùng thiếu ngữ cảnh. Vì vậy các đội hiệu quả có thể nhỏ hơn, ownership rõ hơn, repo tách biệt hơn, và review nên tập trung vào alignment thay vì tranh luận từng dòng mã.

Các giá trị chính mà bài viết nhấn mạnh gồm strong ownership, taste, guardrails, feedback loop nhanh, context nằm trong repo, tự sở hữu stack và giữ option value. Với agent, codebase giống như nơi onboarding liên tục cho "nhân viên mới" không có ngữ cảnh, nên lint, test, tài liệu, design note, quy ước và kiểm tra tự động càng quan trọng. Tác giả cũng lập luận rằng dependency không còn mặc định là lựa chọn rẻ nhất: khi chi phí tạo mã giảm, việc tự sở hữu phần lõi của stack có thể cho nhiều kiểm soát hơn về kiến trúc và trải nghiệm người dùng. Ở tầng quản lý, năng lực kỹ thuật cũng quan trọng hơn vì execution rẻ hơn còn judgment trở thành nút thắt.

**Điểm chính:**
- Agent làm tăng tốc độ viết mã, nhưng cũng làm tăng giá trị của ownership, taste và quyết định kỹ thuật rõ ràng.
- Guardrails mạnh và feedback loop nhanh quyết định agent hoàn thành trong vài phút hay mắc kẹt rất lâu.
- Context nên nằm trong repo để cả người và agent hiểu sản phẩm, kiến trúc, quy ước và tiêu chuẩn chất lượng.
- Khi chi phí xây dựng giảm, đội kỹ thuật nên cân nhắc tự sở hữu nhiều phần lõi hơn thay vì phụ thuộc quá sâu vào thư viện ngoài.

## [Building Software Is Learning](https://registerspill.thorstenball.com/p/building-software-is-learning)

Thorsten Ball chia sẻ một ghi chú nội bộ gửi cho đội Amp về lý do xây phần mềm mới luôn là quá trình học. Khi chưa có đặc tả rõ ràng, rất hiếm khi một người nói "hãy xây tính năng này", người khác làm xong, rồi kết quả đúng ngay ý ban đầu. Thực tế thường là người dùng hoặc đồng đội nhìn bản đầu tiên và nhận ra họ muốn thứ khác; hoặc chính người xây phát hiện có nhiều hướng triển khai hơn tưởng tượng. Điều này không phải lỗi giao tiếp đơn giản, mà là bản chất của việc tạo thứ mới: bạn chưa thể mô tả đầy đủ thứ mình chưa hiểu.

Vì không thể tránh việc học trong lúc xây, mục tiêu quan trọng là rút ngắn thời gian từ "để tôi thử" tới lúc thực tế phản hồi. Thay vì biến mất bốn tuần rồi mới nghe "không phải ý tôi", hãy tạo nguyên mẫu trong một giờ, viết bản đặc tả ngắn, ship từng lát nhỏ mỗi ngày, giảm phạm vi vào phần chưa biết, làm video demo giả, viết trước bài thông báo, hoặc viết ví dụ README để kiểm tra API. Phản hồi có thể đến từ CI, đồng đội, người dùng, production hoặc chính bạn khi dùng thử. Câu hỏi cần hỏi liên tục là: làm sao nhận phản hồi có giá trị sớm nhất để học nhanh hơn.

**Điểm chính:**
- Xây phần mềm mới là quá trình học, vì yêu cầu thật chỉ rõ dần khi người ta thấy và dùng thứ đang được tạo.
- Không thể loại bỏ hoàn toàn hiểu nhầm nếu chưa có đặc tả đầy đủ; mà đặc tả đầy đủ gần như chính là lập trình.
- Tốc độ học phụ thuộc vào vòng phản hồi: nguyên mẫu, lát cắt nhỏ, demo, README, CI và production đều có thể giúp học sớm.
- Ship nhanh không có nghĩa là ship bừa; lát cắt phải đủ tốt để tạo phản hồi đúng vấn đề, không chỉ sinh ra báo lỗi vụn vặt.

## [You Must Fix Your Asserts](https://kristoff.it/blog/fix-your-asserts/)

Loris Cro phản đối thói quen tắt assert trong production, đặc biệt qua lăng kính Zig. Theo tác giả, assert không chỉ là kiểm tra phụ; nó ghi rõ một sự thật mà chương trình tin là đúng, như điều kiện đầu vào, hậu điều kiện hoặc invariant. Nếu type system biểu diễn được ràng buộc đó thì nên dùng type, còn nếu không thì assert là cách làm rõ giả định và phát hiện lỗi lập trình. Trong Zig, `std.debug.assert` dựa trên `unreachable`: ở chế độ an toàn, vi phạm assert làm chương trình panic; ở chế độ tối ưu như ReleaseFast, thông tin "không thể tới đây" có thể được compiler dùng để tối ưu, nhưng nếu giả định sai thì chương trình có thể chạy sai theo cách không dự đoán được.

Luận điểm chính là tắt assert hoàn toàn thường tệ hơn cả hai lựa chọn rõ ràng: hoặc giữ runtime check để crash/log khi invariant bị phá, hoặc chấp nhận dùng assert như dữ kiện tối ưu khi hiệu năng quan trọng hơn rủi ro. Nếu tắt assert, chương trình vẫn chạy tiếp sau khi một điều "không thể xảy ra" đã xảy ra, tức là vẫn lệch khỏi đặc tả nhưng không còn tín hiệu nào để sửa. Tệ hơn, các developer sau đó có thể xây thêm logic dựa trên assert sai, khiến lỗi âm thầm lan rộng. Kết luận thực dụng: hãy sửa assert sai, phân loại assert đắt đỏ vào debug mode khi cần, chọn build mode theo threat model, và đừng tự đánh lừa mình bằng cách xóa tín hiệu lỗi khỏi production.

**Điểm chính:**
- Assert là cách ghi invariant và giả định của chương trình; assert sai là lỗi thiết kế cần sửa, không phải thứ nên che đi.
- Trong Zig, assert là function bình thường chứ không phải macro, nên biểu thức truyền vào vẫn được đánh giá trước khi gọi.
- Tắt assert trong production làm mất tín hiệu khi chương trình lệch khỏi đặc tả, khiến lỗi sai có thể tích tụ qua thời gian.
- Lựa chọn hợp lý hơn là giữ assert, log thay vì crash trong bối cảnh phù hợp, hoặc dùng build mode tối ưu khi đã chấp nhận trade-off hiệu năng.

## [The Software Engineering Books I keep recommending](https://newsletter.techworld-with-milan.com/p/best-software-engineering-books-2026)

Dr Milan Milanovic chia sẻ danh sách sách kỹ thuật phần mềm mà ông vẫn thường giới thiệu, nhưng cách chọn không phải theo kiểu "mọi lập trình viên phải đọc cùng một danh sách". Ông nhóm sách theo vấn đề người đọc đang gặp: tư duy viết mã, nguyên lý kỹ thuật, kiến trúc, hệ thống dữ liệu, AI engineering, kiểm thử, delivery và sự nghiệp. Lý do đọc sách vẫn quan trọng trong thời AI là vì kiến thức nền giúp engineer có bề rộng và chiều sâu để đánh giá, định hướng và kiểm soát đầu ra của công cụ AI tốt hơn.

Danh sách kết hợp các cuốn kinh điển như `The Pragmatic Programmer`, `Clean Code`, `A Philosophy of Software Design`, `Fundamentals of Software Architecture`, `Software Architecture: The Hard Parts`, `Designing Data-Intensive Applications`, `Accelerate` và `Refactoring`, cùng các sách mới hơn về AI như `The Hundred-Page Language Models Book` và `AI Engineering`. Điểm hữu ích là mỗi cuốn được gắn với một nhu cầu cụ thể: hiểu complexity, học trade-off kiến trúc, đi vào distributed systems, viết test tốt hơn, đo sức khỏe đội bằng DORA metrics, hoặc phát triển sự nghiệp từ junior tới staff. Gợi ý thực tế: đừng hỏi "nên đọc gì", hãy hỏi "mình đang mắc ở đâu".

**Điểm chính:**
- Sách kỹ thuật tốt cung cấp mô hình tư duy bền hơn kiến thức framework ngắn hạn.
- Nên chọn sách theo vấn đề hiện tại: code quality, architecture, systems, AI, testing, delivery hoặc career.
- Trong thời AI, nền tảng kỹ thuật càng quan trọng vì engineer phải biết đánh giá và hướng dẫn công cụ.
- Danh sách này cân bằng giữa sách kinh điển và sách mới về AI engineering, data systems và career growth.
