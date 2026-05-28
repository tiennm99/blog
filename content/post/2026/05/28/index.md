---
title: "Newsletter #106"
date: 2026-05-28
tags: ["AI-Assisted", "Newsletter", "AI", "LLM", "Software Engineering", "Programming Languages", "Productivity"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #106.*

## [How The Heck Does GPS Work? (An Interactive Exploration)](https://perthirtysix.com/how-the-heck-does-gps-work)

GPS về bản chất là một công cụ chuyển đổi thời gian thành khoảng cách. Các vệ tinh phát sóng radio ở tốc độ ánh sáng, và thiết bị nhận sẽ đo độ trễ tín hiệu để tính ra khoảng cách — mỗi nano giây tương ứng khoảng 0.3 mét. Bằng cách kết hợp tín hiệu từ nhiều vệ tinh, thiết bị có thể xác định vị trí thông qua phương pháp trilateration: một vệ tinh tạo ra một vòng tròn các vị trí khả dĩ, hai vệ tinh tạo ra hai điểm giao, và ba vệ tinh xác định được một điểm duy nhất.

Vấn đề lớn nằm ở đồng hồ: điện thoại chỉ có đồng hồ thạch anh kém chính xác, sai lệch vài micro giây cũng đủ gây lỗi vị trí đáng kể. Vệ tinh thứ tư được dùng để vừa tính vị trí vừa hiệu chỉnh đồng hồ. Ngoài ra, GPS còn phải áp dụng thuyết tương đối của Einstein: vệ tinh chuyển động nhanh nên bị giãn thời gian (~45 ns/ngày), nhưng ở quỹ đạo có trọng lực yếu hơn nên lại nhanh hơn (~50 ns/ngày) — nếu không hiệu chỉnh, GPS sẽ lệch khoảng 10 km mỗi ngày.

**Điểm chính:**
- GPS dựa trên nguyên lý chuyển đổi thời gian truyền tín hiệu thành khoảng cách
- Cần tối thiểu 4 vệ tinh: 3 để tính vị trí, 1 để hiệu chỉnh đồng hồ
- Thuyết tương đối của Einstein là yếu tố bắt buộc trong thiết kế hệ thống
- Thiết bị hiện đại thường bắt 8-12 vệ tinh cùng lúc từ nhiều hệ thống: GPS (Mỹ), GLONASS (Nga), Galileo (châu Âu), BeiDou (Trung Quốc)
- Kết hợp nhiều hệ thống giúp tăng độ chính xác và giảm sai số ở khu vực đô thị

## [If AI Writes Your Code, Why Use Python?](https://medium.com/@NMitchem/if-ai-writes-your-code-why-use-python-bf8c4ba1a055)

Suốt một thập kỷ qua, Python và TypeScript thống trị vì lý do đơn giản: hệ sinh thái khổng lồ, dễ tuyển dụng, và bạn có thể demo sản phẩm chỉ trong vài ngày. Rust, Go, C++ cho hiệu năng cao hơn 10-100 lần, nhưng đổi lại là nhiều tháng học hỏi và một thị trường nhân lực hẹp hơn. Tác giả lập luận rằng "thỏa thuận" này đã kết thúc, vì AI đã trở nên rất giỏi ở những ngôn ngữ khó. Đến tháng 4/2026, các mô hình như Claude Opus 4.7, GPT-5.5, Gemini 3.1, DeepSeek V4 đều vượt 80% trên SWE-bench Verified, và các phòng lab đang tối ưu rõ ràng cho các bài toán hệ thống.

Bằng chứng thực tế đã xuất hiện: Microsoft viết lại TypeScript compiler bằng Go (nhanh hơn 10 lần); Anthropic dùng 16 agent Claude song song để viết một C compiler bằng Rust trong gần 2000 phiên Claude Code, tốn gần 20.000 USD; Andreas Kling chuyển JavaScript engine của Ladybird từ C++ sang Rust trong 2 tuần với 25.000 dòng code và zero regression. Hệ sinh thái Python ngày càng là một hệ sinh thái Rust khoác áo Python: pydantic, polars, tokenizers, orjson đều là Rust. OpenAI đã mua Astral (uv, ruff), Anthropic đã mua Bun. Vai trò lập trình viên đang dịch chuyển từ "viết code" sang "thiết kế hệ thống và review output", và trong workflow đó, lợi thế ergonomics của Python ngày càng ít quan trọng, còn lợi thế runtime của ngôn ngữ khó hơn lại tăng giá trị mỗi ngày.

**Điểm chính:**
- AI hiện đại viết Rust, Go tốt hơn C++ vì compiler feedback loop chặt, mỗi error message là tín hiệu training miễn phí
- Ngôn ngữ càng có hệ thống kiểu mạnh và compile nhanh thì agent càng tự sửa lỗi tốt
- "Đơn vị đóng góp" đang chuyển từ patch sang port: Armin Ronacher port MiniJinja từ Rust sang Go trong 10 giờ chỉ với 45 phút thời gian thực
- Không phải mọi ngôn ngữ đều hưởng lợi: Zig, Haskell, Gleam vẫn ở "phía sai" của đường cong vì thiếu dữ liệu training
- Ngoại lệ vẫn tồn tại: Prisma bỏ Rust query engine để quay về TypeScript/WASM cho serverless; PyTorch vẫn giữ ~85% mảng nghiên cứu deep learning

## [On Rendering the Sky, Sunsets, and Planets](https://blog.maximeheckel.com/posts/on-rendering-the-sky-sunsets-and-planets/)

Bài viết của Maxime Heckel hướng dẫn chi tiết cách tái hiện hiện tượng tán xạ khí quyển bằng WebGL shader, từ những nguyên lý cơ bản đến kết quả gần như chụp ảnh thực tế. Tác giả bắt đầu từ kỹ thuật raymarching mô phỏng tương tác giữa ánh sáng và các hạt trong khí quyển, kết hợp ba cơ chế chính: tán xạ Rayleigh (bước sóng ngắn tán xạ mạnh, giải thích vì sao bầu trời xanh), tán xạ Mie (hạt lớn như bụi và aerosol, tạo hiệu ứng hào quang quanh mặt trời) và hấp thụ ozone (loại bỏ một số bước sóng, ảnh hưởng đến màu hoàng hôn).

Sau khi dựng được shader bầu trời phẳng, tác giả tích hợp khí quyển vào hành tinh tròn bằng cách dựng lại tọa độ world-space từ depth buffer, dùng phép kiểm tra giao nhau giữa tia và mặt cầu để xác định biên khí quyển, và xử lý độ sâu cảnh để khí quyển hòa hợp với các vật thể đã render. Cuối cùng, để đạt hiệu năng thời gian thực, bài viết áp dụng kỹ thuật Look-Up Table (LUT) của Sebastian Hillaire — thay vòng lặp raymarching lồng nhau bằng việc lấy mẫu texture đã tính sẵn. Bài viết kèm nhiều widget tương tác cho phép điều chỉnh góc mặt trời, độ cao, hiệu ứng Mie/ozone, cũng như phần bonus về render nhật thực và khí quyển sao Hỏa.

**Điểm chính:**
- Mô phỏng bầu trời thực tế cần ba thành phần: Rayleigh, Mie, và hấp thụ ozone
- Raymarching kết hợp Beer's Law cho transmittance và phase function cho hướng ánh sáng
- Để render khí quyển trên hành tinh, dùng depth buffer + ray-sphere intersection để gắn hiệu ứng vào geometry có sẵn
- LUT giúp giảm tải bằng cách tiền tính các giá trị phức tạp và sample từ texture thay vì tính lại mỗi frame
- Cùng một framework có thể mô phỏng nhật thực và khí quyển sao Hỏa chỉ bằng cách đổi tham số

## [Starting Systems Programming, Pt 1: Programmers Write Programs](https://eblog.fly.dev/startingsystems1.html)

Bài viết của Efron Amber Licht là phần đầu của loạt bài hướng dẫn systems programming, với luận điểm trung tâm: "cách để giỏi một thứ gì đó là làm nó". Tác giả cho rằng nhiều lập trình viên thiếu kỹ năng nền tảng vì chưa từng tự tay viết chương trình từ đầu, và bài viết hướng đến việc demystify hộp đen "phần mềm" bằng cách bắt tay phân tích trực tiếp các tệp nhị phân. Khác với tên gọi gợi liên tưởng đến boot process hay init system, nội dung tập trung vào việc hiểu cách một chương trình đã biên dịch thực sự vận hành ở mức byte.

Tác giả dẫn người đọc qua các kỹ thuật cốt lõi: dùng hex dump để khảo sát cấu trúc tệp thực thi, viết các công cụ nhỏ (findoffset, echo, cat) để định vị và sửa nội dung tệp, patch nhị phân mà không cần biên dịch lại, và nắm những điểm cơ bản về định dạng ELF như magic number, entry point, kiến trúc đích. Bài viết nhấn mạnh học qua thực hành: viết hàng chục chương trình nhỏ thay vì chỉ đọc lý thuyết.

**Điểm chính:**
- Systems programming là tương tác trực tiếp với OS và phần cứng, thao tác byte và register ở mức thấp
- Tệp thực thi chỉ là chuỗi byte có tổ chức; hiểu cấu trúc của nó sẽ phá vỡ ảo giác "hộp đen"
- Các công cụ Unix quen thuộc như cat, echo, grep có thể được xây lại từ những primitive đơn giản
- x86-64 dùng little-endian; entry point trong ELF header xác định nơi CPU bắt đầu thực thi
- Dữ liệu chuỗi như "hello, world!" tồn tại ở offset cố định trong binary và có thể tìm được qua pattern matching

## [Learning Software Architecture](https://matklad.github.io/2026/05/12/software-architecture.html)

Matklad cho rằng để giỏi thiết kế phần mềm, kinh nghiệm thực tế quan trọng hơn nhiều so với học thuật. Bản thân tác giả học được nhiều nhất qua việc dẫn dắt dự án IntelliJ Rust thay vì qua các khóa học chính quy. Quan điểm trung tâm: kiến trúc phần mềm bị chi phối bởi cấu trúc tổ chức và động cơ của con người nhiều hơn là kiến thức kỹ thuật thuần túy — đúng như định luật Conway. Tác giả còn nhấn mạnh một nhận định sắc bén: "phần mềm cuối cùng ít quan trọng hơn kiến trúc, và kiến trúc cuối cùng ít quan trọng hơn các vấn đề xã hội".

Tác giả lập luận rằng chất lượng code khoa học không kém vì lập trình viên thiếu hiểu biết, mà vì hệ thống động cơ ưu tiên thời hạn xuất bản hơn là kiến trúc bền vững. Khi không thể đổi được động cơ, ta phải tối ưu trong giới hạn — ví dụ rust-analyzer cố tình tách rời các tính năng với runtime isolation, vừa cho phép cộng tác viên không chuyên đóng góp, vừa bảo vệ phần lõi. Triết lý: chấp nhận ràng buộc thực tế và xây dựng có chiến lược thay vì chạy theo sự hoàn hảo không thể đạt được.

**Điểm chính:**
- Kỹ năng thiết kế phần mềm đến từ làm việc thực tế chứ không phải khóa học
- Định luật Conway: cấu trúc tổ chức quyết định kiến trúc phần mềm
- Vấn đề chất lượng code thường là vấn đề động cơ, không phải vấn đề kỹ thuật
- Khi không đổi được context, hãy thiết kế kiến trúc thích nghi với context đó (ví dụ rust-analyzer)
- Tham khảo: "Boundaries" của Gary Bernhardt, các bài viết của Pieter Hintjens và Ted Kaminski

## [I'm an introvert. This is how I get myself to speak up.](https://newsletter.weskao.com/p/im-an-introvert-this-is-how-i-get-myself-to-speak-up)

Wes Kao chia sẻ kinh nghiệm cá nhân của một người hướng nội trong môi trường làm việc nơi các cuộc họp luôn ưu ái những người nói trước và nghĩ to. Tác giả thẳng thắn thừa nhận cấu trúc họp hành thường "tưởng thưởng" cho người nói nhanh, đặt người hướng nội — vốn cần thời gian xử lý trước khi phản hồi — vào thế bất lợi có hệ thống. Thay vì chờ đến lúc đủ tự tin (thường không bao giờ đến), cô đề xuất chuẩn bị trước và áp dụng các chiến thuật cụ thể.

Một số kỹ thuật đáng chú ý: quyết định trước cuộc họp rằng mình sẽ tham gia phát biểu, lên tiếng sớm để tránh cửa sổ cơ hội đóng lại, dùng văn bản (tài liệu, ghi chú) như một kênh đóng góp song song có giá trị lâu dài, chuẩn bị sẵn các câu mở đầu kiểu "That's a great point. My POV on this is…" để giảm lo âu, tận dụng lợi thế của họp online (ánh sáng, khung hình, ô video nhỏ giúp giảm áp lực), và nhờ đồng nghiệp "nudge" mình một cách nhẹ nhàng để có động lực phát biểu.

**Điểm chính:**
- Quyết định trước cuộc họp rằng sẽ phát biểu, không tranh luận với chính mình trong lúc họp
- Phát biểu sớm để tránh tự nghi ngờ kéo dài
- Dùng văn bản như kênh đóng góp song song, tạo ra "artifact" lâu dài
- Chuẩn bị sẵn vài câu mở đầu mẫu để giảm áp lực ngay lúc đó
- Họp online có nhiều lợi thế cho người hướng nội — biết tận dụng

## [How I use LLMs as a staff engineer in 2026](https://www.seangoedecke.com/how-i-use-llms-in-2026/)

Sean Goedecke chia sẻ cách anh sử dụng LLM trong vai trò staff engineer ở năm 2026, với thay đổi lớn nhất so với năm 2025: agent đã đủ tin cậy để dùng thường xuyên thay vì chỉ thử nghiệm dè dặt. Hiện nay, mỗi thay đổi code anh đều bắt đầu bằng việc nhờ agent giải quyết vấn đề, đánh giá kết quả trong khoảng 30 giây ban đầu và thường chỉ cần một lượt chỉnh sửa trước khi push. Với debug, agent chẩn đoán đúng khoảng 80% bug một cách tự lực, dù anh vẫn tham gia cung cấp context và thu hẹp không gian tìm kiếm — đặc biệt với bug phức tạp cần nhiều phiên agent.

Quan điểm thú vị là anh xem code test là "rẻ" nên review thoáng hơn code production, đồng thời cho agent đảm nhận viết test, integration test, và xử lý sự cố môi trường local. Tuy nhiên, anh cố ý không dùng AI cho PR description, ADR, tin nhắn Slack, và bài blog — vì tin rằng những loại văn bản này cần phán đoán con người về điều gì thực sự đáng truyền đạt. Bài học cốt lõi: kỹ năng quan trọng nhất là "chuyển càng nhiều việc cho agent càng tốt, nhưng không đi quá xa" — vừa tránh underutilization, vừa tránh phụ thuộc mù quáng.

**Điểm chính:**
- Năm 2026, agent đủ tin cậy để dùng thường xuyên với giám sát nhẹ
- Mỗi thay đổi code bắt đầu bằng prompt cho agent, review nhanh trong 30 giây
- Agent chẩn đoán đúng ~80% bug; con người vẫn cần cung cấp context và thu hẹp scope
- Test code được xem là "rẻ" và review thoáng hơn so với code production
- Vẫn giữ tay viết PR description, ADR, Slack, blog — nơi cần phán đoán con người

## [Interrogatory LLM](https://martinfowler.com/bliki/InterrogatoryLLM.html)

Martin Fowler giới thiệu kỹ thuật "Interrogatory LLM": thay vì để con người tự viết ra mọi context cần thiết cho một tác vụ phức tạp, ta để LLM đóng vai người phỏng vấn — đặt câu hỏi để thu thập thông tin, sau đó tổng hợp lại thành tài liệu context cho một phiên LLM khác thực thi tác vụ thực sự. Cách làm này giải quyết một bài toán quen thuộc: viết spec đầy đủ thường rất tốn công, và nhiều chuyên gia có kiến thức nhưng không quen viết.

Tác giả mô tả ba ứng dụng chính: (1) chuẩn bị context — LLM phỏng vấn người dùng để tạo report làm input cho LLM thực thi; (2) kiểm tra tài liệu — LLM phỏng vấn domain expert để xác minh xem spec hiện có còn chính xác không, một cách thay thế cho review truyền thống; (3) trích xuất tri thức — biến kiến thức truyền miệng thành tài liệu viết, đặc biệt hữu ích với người ngại viết. Một khuyến nghị quan trọng: LLM phải được "nhắc đi nhắc lại" để chỉ hỏi một câu mỗi lần, vì model có xu hướng dồn nhiều câu hỏi cùng lúc khiến cuộc phỏng vấn mất hiệu quả.

**Điểm chính:**
- Đảo vai trò: thay vì cấp context cho LLM, để LLM phỏng vấn để tự thu thập context
- Ba ứng dụng: chuẩn bị context, kiểm tra tài liệu, trích xuất tri thức từ chuyên gia
- Yêu cầu "chỉ hỏi một câu mỗi lần" cần được nhắc liên tục trong prompt
- Kỹ thuật hữu ích vượt ngoài LLM: giúp khai thác tri thức từ người không quen viết tài liệu

## [I don't think AI will make your processes go faster](https://frederickvanbrabant.com/blog/2026-05-15-i-dont-think-ai-will-make-your-processes-go-faster/)

Frederick Van Brabant lập luận ngược lại với kỳ vọng phổ biến: AI sẽ không làm cho quy trình của tổ chức nhanh hơn, vì các tổ chức thường xác định sai vị trí của nút thắt. Họ tập trung vào những bottleneck nhìn thấy được (tốc độ viết code, thời gian xử lý ticket) trong khi nút thắt thật sự nằm ở thượng nguồn: yêu cầu mơ hồ, tài liệu nghèo nàn, scope chưa rõ. Trong phát triển phần mềm, phần lớn thời gian thực sự bị tiêu tốn không phải để gõ code, mà để hiểu xem khách hàng hoặc domain expert thực sự muốn gì.

Tác giả nhấn mạnh rằng AI sinh code không loại bỏ được công việc thượng nguồn đó. Để cho ra kết quả đúng, AI vẫn cần spec chi tiết và bị "cầm tay" liên tục. Một bottleneck chỉ phát huy năng suất khi nhận input chất lượng cao và dự đoán được — nếu input là yêu cầu mơ hồ thì việc thực thi nhanh chỉ tạo ra nhiều output sai nhanh hơn. Giải pháp gốc là đảm bảo người (hoặc AI) thực thi nhận được thông tin đầy đủ trước khi bắt đầu, thay vì đầu tư thêm công cụ hay tài nguyên ở khâu cuối.

**Điểm chính:**
- Tổ chức thường xác định nhầm vị trí của bottleneck — nó nằm ở thượng nguồn, không phải khâu thực thi
- Trong dev, thời gian thực sự tốn nằm ở việc làm rõ yêu cầu, không phải gõ code
- AI sinh code chỉ hữu ích khi có spec rõ; với yêu cầu mơ hồ, AI làm sai nhanh hơn
- Bottleneck cần "input chất lượng cao, dự đoán được" để phát huy giá trị
- Cải thiện thật sự đến từ tài liệu và spec rõ ràng, không phải từ việc tăng tốc khâu cuối

## [Using an Engineering Notebook](https://ntietz.com/blog/using-an-engineering-notebook/)

Nicole Tietz chia sẻ thói quen ghi chép cá nhân mà cô gọi là "engineering notebook" — một cuốn sổ kỹ thuật mượn ý tưởng từ truyền thống ghi chép phòng thí nghiệm. Cô ghi rất chi tiết những gì đang làm và lý do làm, mỗi mục đều có ngày tháng, ghi theo thời gian thực, và quan trọng là sổ chỉ append, không xóa hay sửa. Bắt đầu thói quen này từ năm 2016 khi quản lý nhiều khách hàng consulting cùng lúc, hiện cô dùng thiết bị e-ink thay vì sổ giấy vì thuận tay trái.

Điểm đặc biệt: cô viết trước khi viết code — mô tả thay đổi định làm vào sổ để làm rõ tư duy trước khi triển khai. Hai lợi ích lớn nhất là (1) hỗ trợ trí nhớ qua việc xem lại các entry cũ và qua chính hành động viết tay, và (2) làm công cụ tư duy: viết ép phải suy nghĩ rõ ràng và phơi bày những lỗ hổng kiến thức trước khi gõ phím. Cô nhấn mạnh "writing is the work" — sổ không phải tài liệu cho người khác, mà là quá trình xử lý suy nghĩ cho chính mình. Cô khuyến nghị mỗi người tự thử nghiệm format và mức chi tiết riêng, vì không phải ai cũng hợp với cách làm này.

**Điểm chính:**
- Engineering notebook = ghi chi tiết quá trình làm việc theo thời gian thực, có ngày, không sửa
- Viết trước khi code: mô tả thay đổi định làm để làm rõ tư duy
- Hai lợi ích chính: hỗ trợ trí nhớ và làm công cụ tư duy phát hiện lỗ hổng kiến thức
- "Writing is the work" — sổ phục vụ chính mình, không phải tài liệu cho người khác
- Tự thử nghiệm format phù hợp; cách này không phải hợp với tất cả mọi người

### Bonus

**Documents:**
[AI eats the world](https://static1.squarespace.com/static/50363cf324ac8e905e7df861/t/6a0af5d0484fbf5fe9a7743e/1779103184855/2026-Spring-AI.pdf)
