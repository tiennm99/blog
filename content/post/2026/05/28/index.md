---
title: "Newsletter #106"
date: 2026-05-28
tags: ["AI-Assisted", "Newsletter", "AI", "LLM", "Software Engineering", "Programming Languages", "Productivity"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #106.*

## [How The Heck Does GPS Work? (An Interactive Exploration)](https://perthirtysix.com/how-the-heck-does-gps-work)

Bài viết tương tác của Shri Khalpada giải thích rằng GPS là công cụ chuyển thời gian thành khoảng cách. Vệ tinh phát tín hiệu vô tuyến với tốc độ ánh sáng, điện thoại đo thời gian tín hiệu đi mất bao lâu, và cứ mỗi nano giây tương ứng khoảng 0,3 mét. Một vệ tinh chỉ cho biết bạn nằm đâu đó trên một vòng tròn, vệ tinh thứ hai thu hẹp còn hai điểm giao, vệ tinh thứ ba chốt lại một điểm duy nhất — phương pháp này gọi là trilateration. Khó khăn nằm ở đồng hồ: vệ tinh mang đồng hồ nguyên tử, còn điện thoại chỉ có bộ dao động thạch anh rẻ tiền, lệch vài micro giây là vị trí sai hàng trăm mét. Vì vậy cần vệ tinh thứ tư, vì chỉ có đúng một giá trị hiệu chỉnh đồng hồ khiến cả bốn mặt cầu gặp nhau tại một điểm, nên máy thu tìm ra cùng lúc cả vị trí lẫn thời gian chính xác.

Tiếp theo là "thuế tương đối tính": do chuyển động nhanh, đồng hồ vệ tinh chậm đi khoảng 7 micro giây mỗi ngày (thuyết tương đối hẹp), nhưng ở độ cao với trọng lực yếu hơn nó lại nhanh thêm khoảng 45 micro giây (thuyết tương đối rộng). Nếu không bù trừ, vị trí sẽ trôi khoảng 10 km mỗi ngày, nên đồng hồ vệ tinh được chế tạo để chạy hơi chậm khi còn ở mặt đất. Trên thực tế, máy thu hiện đại bắt cùng lúc 8–12 vệ tinh từ GPS (Mỹ), GLONASS (Nga), Galileo (châu Âu) và BeiDou (Trung Quốc) để giảm sai số; ở đô thị, tín hiệu phản xạ qua tòa nhà (lỗi đa đường) vẫn là bài toán khó nhất.

## [If AI Writes Your Code, Why Use Python?](https://medium.com/@NMitchem/if-ai-writes-your-code-why-use-python-bf8c4ba1a055)

Noah Mitchem cho rằng "thỏa thuận" suốt một thập kỷ qua — chọn Python hay TypeScript vì hệ sinh thái lớn, dễ tuyển người, làm bản demo nhanh, chấp nhận hiệu năng kém hơn Rust, Go, C++ từ 10 đến 100 lần — đã hết hiệu lực, vì AI đã giỏi lên ở chính những ngôn ngữ khó. Đến tháng 4/2026, Claude Opus 4.7, GPT-5.5, Gemini 3.1 và DeepSeek V4 đều vượt 80% trên SWE-bench Verified. Hệ thống kiểu mạnh và vòng phản hồi biên dịch chặt của Rust, Go giúp agent tự sửa lỗi liên tục. Bằng chứng đã có: Microsoft chuyển trình biên dịch TypeScript sang Go (nhanh hơn khoảng 10 lần); Nicholas Carlini ở Anthropic điều phối 16 agent Claude viết một trình biên dịch C bằng Rust dài 100.000 dòng, qua gần 2.000 phiên Claude Code với chi phí dưới 20.000 USD; Andreas Kling chuyển JavaScript engine của Ladybird từ C++ sang Rust trong hai tuần, khoảng 25.000 dòng, không có lỗi hồi quy nào.

Ngay cả hệ sinh thái Python cũng đang là "hệ sinh thái Rust đội mũ Python": pydantic, polars, tokenizers, orjson đều viết bằng Rust; OpenAI mua Astral (uv, ruff), Anthropic mua Bun. Đơn vị đóng góp cũng dịch chuyển từ bản vá sang bản chuyển ngữ: Armin Ronacher dùng agent chuyển MiniJinja từ Rust sang Go trong 10 giờ, chỉ tốn 45 phút công sức thật. Ngoại lệ vẫn có: Prisma quay về lõi TypeScript/WASM cho serverless, PyTorch vẫn chiếm khoảng 85% nghiên cứu học sâu, còn Zig, Haskell, Gleam thiếu dữ liệu huấn luyện. Khi vai trò lập trình viên chuyển sang thiết kế và duyệt kết quả, lợi thế dễ viết của Python giảm dần, còn lợi thế hiệu năng của ngôn ngữ khó thì tích lũy mỗi ngày.

## [On Rendering the Sky, Sunsets, and Planets](https://blog.maximeheckel.com/posts/on-rendering-the-sky-sunsets-and-planets/)

Maxime Heckel hướng dẫn chi tiết cách tái hiện hiện tượng tán xạ khí quyển bằng shader WebGL, đi từ nguyên lý cơ bản đến hình ảnh gần như ảnh chụp. Nền tảng là kỹ thuật raymarching: lấy mẫu mật độ khí quyển dọc theo tia nhìn, tính độ truyền sáng theo định luật Beer và dùng hàm pha để mô tả hướng tán xạ. Ba cơ chế được kết hợp: tán xạ Rayleigh (bước sóng ngắn tán xạ mạnh hơn, lý do bầu trời có màu xanh), tán xạ Mie (hạt lớn như bụi, sol khí, tạo quầng sáng quanh mặt trời) và sự hấp thụ của tầng ozone (lọc bớt một số bước sóng, ảnh hưởng đến màu hoàng hôn).

Sau khi có bầu trời phẳng, tác giả gắn khí quyển vào một hành tinh hình cầu: dựng lại tọa độ không gian thế giới từ bộ đệm độ sâu, dùng phép giao tia với mặt cầu để xác định biên khí quyển và xử lý độ sâu để khí quyển hòa vào các vật thể đã kết xuất. Cùng khung mô phỏng đó, chỉ cần đổi tham số là có thể dựng nhật thực hay bầu khí quyển sao Hỏa. Cuối cùng, để chạy thời gian thực, bài viết áp dụng phương pháp bảng tra cứu (LUT) của Sébastien Hillaire: tính sẵn độ truyền sáng, bầu trời và phối cảnh không khí vào các texture rồi lấy mẫu lại, thay cho các vòng lặp raymarching lồng nhau mỗi khung hình. Bài viết có rất nhiều widget tương tác để chỉnh góc mặt trời, độ cao hay cường độ Mie và ozone, rất đáng để đọc trực tiếp.

## [Starting Systems Programming, Pt 1: Programmers Write Programs](https://eblog.fly.dev/startingsystems1.html)

Đây là phần mở đầu loạt bài về lập trình hệ thống của Efron Amber Licht, xoay quanh một luận điểm: muốn giỏi thì phải tự làm, và lập trình viên thì phải viết chương trình. Theo tác giả, một bài toán mang tính "hệ thống" khi nó tương tác với hệ điều hành hoặc phần cứng, có ràng buộc hiệu năng chặt, hay thao tác ở mức byte và thanh ghi. Người lập trình hệ thống nhìn máy tính như một cỗ máy vật lý có thể hiểu trọn vẹn, chứ không phải một khái niệm trừu tượng, và không ngại tháo tung mọi thứ ra xem.

Bài viết mở "hộp đen" chương trình bằng cách biên dịch một chương trình hello world viết bằng Go rồi khảo sát trực tiếp tệp nhị phân. Người đọc tự viết từng công cụ nhỏ: findoffset để tìm vị trí một chuỗi trong tệp, echo và cat để ghi và in tệp, binpatch để sửa thẳng nội dung tệp nhị phân mà không cần biên dịch lại, cùng các công cụ hexdump để đọc phần mã lệnh. Qua đó, người đọc thấy rằng một tệp thực thi chỉ là chuỗi byte có tổ chức: chuỗi "hello, world!" nằm ở một vị trí cố định, còn header ELF chứa magic number, kiến trúc đích và điểm vào nơi CPU bắt đầu thực thi, với các giá trị lưu theo kiểu little-endian trên x86-64. Tinh thần tác giả muốn truyền lại: tự xây công cụ, tự nhìn dữ liệu bằng mắt mình, hiểu hệ thống thay vì dựa vào lớp trừu tượng, vì suy cho cùng tất cả chỉ là byte.

## [Learning Software Architecture](https://matklad.github.io/2026/05/12/software-architecture.html)

Trong thư trả lời một nhà vật lý hỏi cách học thiết kế phần mềm, Matklad cho rằng kỹ năng này học tốt nhất qua thực hành. Các khóa học thiết kế ở đại học với anh chỉ như "trẻ mẫu giáo chơi làm lính cứu hỏa"; điều thực sự dạy anh là việc bất ngờ phải dẫn dắt dự án IntelliJ Rust. Nhận xét thứ hai là định luật Conway: phần mềm lặp lại cấu trúc xã hội của tổ chức làm ra nó. Tác giả trích một câu của neugierig: mã nguồn rốt cuộc ít quan trọng hơn kiến trúc, còn kiến trúc lại ít quan trọng hơn các vấn đề xã hội. Vì thế, chất lượng kém của "mã nguồn khoa học" chủ yếu đến từ hệ thống động cơ, như áp lực phải công bố bài báo trong ba tháng, chứ không phải do thiếu kiến thức.

Có hai lối ra: hiếm hoi lắm mới có dịp thiết kế lại hệ thống động cơ của một dự án, còn thường thì phải chấp nhận ràng buộc và thích nghi. rust-analyzer là ví dụ: phần lõi sâu như một trình biên dịch được giữ dễ xây dựng và bộ kiểm thử chạy trong vài giây để thu hút người đóng góp giỏi; các tính năng rộng thì được tách độc lập, mỗi tính năng được bọc bởi catch_unwind, nên người đóng góp cuối tuần có thể gửi mã chưa hoàn hảo mà lỗi không lan sang phần khác hay làm hỏng dữ liệu. Tác giả không có cuốn sách "chân lý" nào để giới thiệu, nhưng gợi ý bài nói "Boundaries" của Gary Bernhardt, các bài viết của Pieter Hintjens, blog của Ted Kaminski và bài "Reflections on a decade of coding" của Jamii.

## [I'm an introvert. This is how I get myself to speak up.](https://newsletter.weskao.com/p/im-an-introvert-this-is-how-i-get-myself-to-speak-up)

Wes Kao chia sẻ kinh nghiệm của một người hướng nội ở nơi làm việc, nơi các cuộc họp thường ưu ái người nói trước và vừa nói vừa nghĩ. Người hướng nội cần thời gian xử lý trước khi phản hồi nên dễ rơi vào thế bất lợi một cách có hệ thống. Thay vì chờ đến lúc đủ tự tin — điều thường không bao giờ đến — tác giả đề xuất chuẩn bị trước và áp dụng những chiến thuật cụ thể mà chính cô đang dùng.

Trước cuộc họp, hãy quyết định sẵn là mình sẽ phát biểu để khỏi giằng co với bản thân ngay lúc đó, và lên tiếng sớm trước khi sự tự nghi ngờ kéo dài khiến cơ hội trôi qua. Chuẩn bị vài câu mở đầu quen thuộc kiểu "That's a great point. My POV on this is…" giúp chen vào cuộc thảo luận dễ hơn. Văn bản như tài liệu, ghi chú là một kênh đóng góp song song, tạo ra sản phẩm có giá trị lâu dài. Họp trực tuyến cũng có lợi thế riêng cho người hướng nội (ánh sáng, khung hình, ô video nhỏ giúp bớt áp lực), và có thể nhờ một đồng nghiệp nhắc nhẹ để giữ trách nhiệm phát biểu.

## [How I use LLMs as a staff engineer in 2026](https://www.seangoedecke.com/how-i-use-llms-in-2026/)

Sean Goedecke nhìn lại cách anh dùng LLM trong vai trò staff engineer sau hơn một năm, và thay đổi lớn nhất là agent giờ đã thật sự tốt. Năm 2025 anh chỉ nhờ AI gợi ý mã, sửa nhỏ ở vùng lạ hay hỏi đáp; nay mọi thay đổi mã nguồn đều bắt đầu bằng việc giao cho agent (chủ yếu qua ứng dụng GitHub Copilot, hàng chục phiên mỗi ngày). Anh lướt qua kết quả khoảng 30 giây, loại bỏ phần lớn vì "không phải điều mình nghĩ", còn lại mới duyệt kỹ và chỉnh một lượt cuối. Với lỗi phần mềm, anh giao mọi báo cáo lỗi cho agent vì nó tự chẩn đoán đúng khoảng 80%. Tuy vậy, chuyên môn con người vẫn quan trọng: có lỗi phải tới phiên agent thứ 14 mới tìm ra, sau khi anh đã bổ sung ngữ cảnh từ log, Slack, tự tái hiện lỗi và thu hẹp phạm vi tìm kiếm.

Anh đẩy nhiều việc kiểm thử và thiết lập môi trường cho agent: nhờ agent tự kiểm thử thay đổi rồi đọc lại nhật ký, viết thêm kiểm thử tích hợp, gỡ rối cấu hình máy cục bộ. Mã kiểm thử được xem là "rẻ", nhưng giao diện người dùng thì anh không giao vì agent chưa đủ nhạy với cảm nhận thị giác. Ngược lại, anh vẫn tự viết mô tả PR, ADR, tin nhắn Slack và bài blog, vì LLM hay nói quá nhiều, khó nêu được ý cốt lõi, và việc tự viết cho người khác thấy có một con người đang suy nghĩ. Theo anh, kỹ năng AI quan trọng nhất hiện nay là giao càng nhiều việc cho agent càng tốt nhưng không đi quá xa.

## [Interrogatory LLM](https://martinfowler.com/bliki/InterrogatoryLLM.html)

Martin Fowler giới thiệu kỹ thuật "Interrogatory LLM": thay vì con người tự viết ra hàng trang ngữ cảnh cho một tác vụ phức tạp, ta yêu cầu LLM phỏng vấn mình, đặt mọi câu hỏi cần thiết, rồi tổng hợp thành một báo cáo ngữ cảnh để một phiên khác (có thể dùng mô hình khác) thực hiện bước tiếp theo. Ông lần đầu thấy cách làm này trong blog của Harper Reed, với điểm đáng chú ý là buộc LLM chỉ hỏi một câu mỗi lần; khi tự thử, Fowler nhận ra phải nhắc lại yêu cầu này thường xuyên.

Kỹ thuật này còn dùng được theo chiều ngược lại: đưa cho LLM một tài liệu như đặc tả phần mềm và để nó phỏng vấn chuyên gia miền nhằm kiểm tra tài liệu còn chính xác không, thay cho việc bắt chuyên gia đọc duyệt vốn nhiều người thấy khó. Có thể kết hợp cả hai: một LLM xây dựng tài liệu, các LLM khác đem đi rà soát với những chuyên gia khác. Rộng hơn, dù Fowler là người coi viết là một phần của tư duy, nhiều người thấy viết rất khó; một cuộc trò chuyện với LLM có thể giúp họ biến hiểu biết của mình thành tài liệu viết.

## [I don't think AI will make your processes go faster](https://frederickvanbrabant.com/blog/2026-05-15-i-dont-think-ai-will-make-your-processes-go-faster/)

Frederick Van Brabant, sau khi đọc lại hai cuốn kinh điển "The Toyota Way" và "The Goal", cho rằng AI sẽ không làm quy trình của tổ chức nhanh hơn như nhiều người kỳ vọng, vì ta thường tìm sai chỗ của điểm nghẽn. Nhìn biểu đồ tiến độ dự án, phát triển phần mềm là khâu tốn thời gian nhất, nên cách xử lý quen thuộc là thêm người hoặc tin rằng AI sẽ làm nó nhanh hơn. Nhưng thời gian dài không có nghĩa vấn đề bắt nguồn từ đó: không ai làm dự án nhanh hơn bằng cách gõ phím nhanh hơn. Phần lớn thời gian thực chất dành để hiểu một yêu cầu mơ hồ, chỉ có tiêu đề, như "gửi email cho người dùng khi hoàn tất đơn hàng" — email chứa gì, lỗi thì sao, thế nào là hoàn tất.

AI sinh mã nhanh, nhưng không có nghĩa là sinh đúng mã. Các so sánh giữa người và AI thường bỏ qua công "cầm tay chỉ việc": để AI làm đúng, chuyên gia miền và sản phẩm phải mô tả từng tính năng, từng lỗi đến chi tiết nhỏ nhất, và khâu viết tài liệu phình ra đáng kể. Đó chính là điều lập trình viên luôn mong muốn; nếu được nhận tài liệu chi tiết như vậy, năng suất của họ cũng sẽ tăng vọt. Muốn quy trình nhanh hơn, hãy bảo đảm người làm việc có đủ điều kiện để làm việc, đúng như bài học của "The Goal": điểm nghẽn cần nhận đầu vào chất lượng cao và dự đoán được.

## [Using an Engineering Notebook](https://ntietz.com/blog/using-an-engineering-notebook/)

Nicole Tietz chia sẻ thói quen mà cô xem là có lẽ quan trọng nhất để làm việc hiệu quả: viết tay vào sổ kỹ thuật (engineering notebook), một thực hành mượn từ sổ ghi chép phòng thí nghiệm. Sổ ghi rất chi tiết việc đang làm và lý do, đủ để người khác lặp lại được; mỗi mục có ngày tháng, được viết ngay trong lúc làm, chỉ ghi thêm chứ không xóa hay sửa, và là nơi ghi nhận đầu tiên chứ không phải chép lại từ chỗ khác. Mức chi tiết đặc biệt quan trọng vì bản thân bạn trong tương lai cũng là "người khác" và sẽ quên nhiều thứ. Cô bắt đầu từ năm 2016 khi làm tư vấn cho nhiều khách hàng cùng lúc, và hiện dùng thiết bị e-ink thay cho sổ giấy vì thuận tay trái và không muốn mang theo nhiều cuốn sổ.

Cuốn sổ mang lại hai lợi ích chính. Thứ nhất là hỗ trợ trí nhớ: vừa có thể đọc lại xem mình đang làm gì sau khi bị gián đoạn, vừa nhờ việc viết tay giúp ghi nhớ tốt hơn. Thứ hai là công cụ tư duy: cô thường mô tả thay đổi định làm vào sổ trước khi viết mã, buộc bản thân nghĩ kỹ và phát hiện chỗ chưa hiểu trước khi gõ phím. Cô hầu như không đọc lại sổ và cũng không cho ai xem, vì "việc viết chính là công việc". Lời khuyên của cô: nếu chưa thử thì nên thử, rồi tự điều chỉnh định dạng, phương tiện và mức độ chi tiết cho phù hợp với bản thân.

### Bonus

**Documents:**
[AI eats the world](https://static1.squarespace.com/static/50363cf324ac8e905e7df861/t/6a0af5d0484fbf5fe9a7743e/1779103184855/2026-Spring-AI.pdf)

---

*Bài viết đã được viết lại bởi Claude Code với Opus 5.5 vào ngày 27/09/2026.*
