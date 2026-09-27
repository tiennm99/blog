---
title: "Newsletter #66"
date: 2025-12-09
tags: ["AI-Assisted", "Technology", "Software Architecture", "Books", "Engineering", "Development"]
categories: ["Newsletter"]
---

*~~Dùng api free của iFlow cũng nhiều rồi, nên nay mình dùng thử cli của iFlow - [iFlow CLI](https://github.com/iflow-ai/iflow-cli) xem sao, model được dùng là GLM-4.6.~~ Mời bạn thưởng thức Newsletter #66.*

## [The Ultimate List of Best Software Architecture Books (2026)](https://www.workingsoftware.dev/the-ultimate-list-of-software-architecture-books/?&aid=recmw058VtqAJCyyK)

Kiến trúc phần mềm là nền tảng quyết định chất lượng của một sản phẩm: thiết kế tốt giúp giảm rủi ro lỗi và dễ dàng bổ sung tính năng về sau. Bài viết tổng hợp những cuốn sách về kiến trúc phần mềm đáng đọc nhất năm 2026, từ các cuốn kinh điển như "Fundamentals of Software Architecture" của Richards và Ford, "Software Architecture in Practice" (tái bản lần thứ tư), "Designing Data-Intensive Applications" hay "Enterprise Integration Patterns", cho tới các cuốn bám sát thực tiễn hiện đại như "Software Architecture: The Hard Parts" bàn về những đánh đổi trong hệ thống phân tán và "Building Multi-Tenant SaaS Architectures" dành cho nền tảng đám mây.

Danh sách cũng chú trọng khía cạnh con người và tổ chức: "Architecture for Flow" của Susanne Kaiser kết hợp Wardley Mapping, Domain-Driven Design và Team Topologies để gắn chiến lược kinh doanh với kiến trúc; "The Software Architect Elevator" của Gregor Hohpe giúp kiến trúc sư làm cầu nối giữa kỹ thuật và kinh doanh; "Collaborative Software Design" hướng dẫn cách đưa mọi bên liên quan vào quá trình thiết kế; "Facilitating Software Architecture" và "Reviewing Software Systems" (với phương pháp đánh giá kiến trúc gọn nhẹ LASR) giúp kiến trúc sư và lập trình viên phối hợp hiệu quả hơn. Năm 2026 còn có hai cuốn mới đáng chờ đợi: "Domain-Driven Transformation" của Lilienthal và Schwentner với lộ trình hiện đại hóa hệ thống cũ, và "The C4 Model" của Simon Brown về cách truyền đạt kiến trúc bằng sơ đồ có cấu trúc.

## [How I use AI (Oct 2025)](https://ben.stolovitz.com/posts/how_use_ai_oct_2025/?utm_source=tldrnewsletter)

Ben Stolovitz chia sẻ cách anh dùng AI, chủ yếu là các mô hình ngôn ngữ lớn (LLM), trong công việc hằng ngày tính đến tháng 10/2025. Lập trình là nơi AI tạo ra thay đổi lớn nhất: tính năng tự động gợi ý của GitHub Copilot được tác giả gọi là "kỳ diệu" khi hoàn thành những đoạn mã quen thuộc và giúp khám phá cách viết chuẩn mực của ngôn ngữ, dù không giỏi với thuật toán phức tạp. Chế độ agent ngày càng hữu ích cho những thay đổi lớn, nhưng vẫn cần kiểm thử chặt chẽ, tài liệu hướng dẫn rõ ràng và con người giám sát. Với việc tra cứu, AI rất giỏi tìm lại những bài viết khó nhớ hay giải thích các kiến thức phổ thông, nhưng lại kém khi tìm sản phẩm hoặc tài liệu nghiên cứu, và dễ bịa trích dẫn hay xác nhận bất kỳ giả định nào người dùng đưa ra.

Tóm tắt và chép lời là điểm mạnh ấn tượng: AI có thể cô đọng hàng trăm trang tài liệu hay cả một buổi họp chỉ trong vài phút. Ngược lại, tác giả không để AI viết thay mình vì coi blog là cách thể hiện bản thân; anh chỉ dùng AI như một biên tập viên khó tính để gợi ý từ ngữ tốt hơn, rồi tự viết lại theo ý mình. Với tranh ảnh và âm nhạc do AI tạo ra, anh dè dặt nhất, cho rằng chúng thiếu chiều sâu sáng tạo và sự kết nối giữa con người với nhau.

## [Stop Vibe Coding Your Unit Tests](https://www.andy-gallagher.com/blog/stop-vibe-coding-your-unit-tests/?utm_source=tldrnewsletter)

Andy Gallagher cảnh báo về thói quen giao hẳn việc viết kiểm thử đơn vị (unit test) cho LLM mà không kiểm soát. Theo tác giả, LLM có xu hướng sinh ra quá nhiều kiểm thử và chỉ xác nhận những gì mã nguồn đang làm, thay vì kiểm tra những gì mã nguồn nên làm. Ví dụ với một component nút bấm React đơn giản, Claude Sonnet 4 tạo ra khoảng 30 kiểm thử dài chừng 200 dòng, phần lớn kiểm tra những điều hiển nhiên như hiển thị mặc định, giá trị props hay thuộc tính HTML, vốn đã được framework và thư viện đảm bảo. Các kiểm thử này "khóa chặt" mã nguồn vào cách cài đặt hiện tại khiến mỗi lần tái cấu trúc đều kéo theo hàng loạt chỉnh sửa, đồng thời chiếm chỗ trong cửa sổ ngữ cảnh của agent, làm nhiễu kết quả tìm kiếm ngữ nghĩa và biến các pull request thành gánh nặng cho đồng nghiệp khi xem xét.

Giải pháp tác giả đề xuất là viết từng kiểm thử một cách có chủ đích: nói rõ cần kiểm thử hành vi nào, đọc lại kết quả AI sinh ra và giữ các tệp kiểm thử ngắn gọn, tập trung. LLM vẫn làm tốt với mã nguồn mang tính thuật toán, trừu tượng, nhưng với mã sản phẩm thông thường, điều cần kiểm chứng là nhóm có đang xây dựng đúng thứ cần xây hay không. Nguyên tắc cốt lõi: ít mà chất.

## [Game design is simple, actually](https://www.raphkoster.com/2025/11/03/game-design-is-simple-actually/?utm_source=tldrnewsletter)

Raph Koster trình bày một khung 12 bước để hiểu thiết kế game một cách có hệ thống. Theo ông, game về bản chất là việc làm chủ các vấn đề: niềm vui đến từ sự tiến bộ trong khả năng dự đoán, chứ không phải từ những hiệu ứng bề ngoài. Một món đồ chơi là hệ thống có ràng buộc; khi thêm mục tiêu, nó trở thành game, với cơ chế cốt lõi là một "đối tượng có vấn đề" cần giải quyết. Người chơi tương tác qua các vòng lặp: vòng vận hành (thao tác, nhận phản hồi, học hỏi) và vòng tiến triển, nơi tình huống liên tục leo thang và thay đổi để cách giải cũ không còn hiệu quả. Phản hồi tốt phải cho người chơi biết họ có thể làm gì, đã làm gì, kết quả ra sao và có tiến gần mục tiêu hay không, còn độ khó cần vừa sức học của họ.

Ở tầng hệ thống, game được ghép từ nhiều game nhỏ hơn: các vòng lặp nối với nhau thành nền kinh tế và chuỗi giá trị. Cách trình bày vấn đề qua cốt truyện, hình ảnh, âm thanh và ẩn dụ ảnh hưởng mạnh tới trải nghiệm, nên thiết kế game là một loại hình nghệ thuật tổng hợp, đòi hỏi cả thiết kế hệ thống lẫn thiết kế trải nghiệm. Động lực của người chơi cũng rất khác nhau, vì vậy không có game nào dành cho tất cả mọi người. Các nguyên tắc nghe thì đơn giản, nhưng làm tốt đồng thời cả 12 điều mới là thử thách thực sự.

## [Architectural debt is not just technical debt](https://frederickvanbrabant.com/blog/2025-10-31-architectural-debt-is-not-just-technical-debt/?&aid=recufcl24hU9MXCJC)

Frederick Van Brabant phân biệt nợ kiến trúc (architectural debt) với nợ kỹ thuật (technical debt). Nợ kỹ thuật thường là những cách làm tạm bợ trong mã nguồn, còn nợ kiến trúc là các quyết định mang tính cấu trúc gây hậu quả lâu dài, vượt ra ngoài phạm vi mã nguồn. Tác giả phân tích nợ kiến trúc ở ba tầng. Ở tầng ứng dụng và hạ tầng, kiến trúc sư doanh nghiệp nên tập trung vào mô hình tích hợp, sự chồng chéo giữa các hệ thống và sự phụ thuộc vào nhà cung cấp, vì nợ ở đây làm chi phí tăng và thời gian bàn giao kéo dài. Tầng nghiệp vụ liên quan đến quyền sở hữu, trách nhiệm quản lý và các quy trình lỗi thời; tài liệu sai lệch có thể gây rắc rối nghiêm trọng khi làm việc với kiểm toán. Tầng chiến lược nguy hiểm nhất: năng lực được định nghĩa sai hay các khung làm việc áp dụng nửa vời sẽ dẫn tới những giả định sai lầm lan khắp tổ chức trong ba đến năm năm tới.

Kiến trúc sư doanh nghiệp có đủ thời gian và tầm nhìn để phát hiện loại nợ này, nhưng chỉ cảnh báo thôi là chưa đủ: họ cần xây dựng lập luận thuyết phục gồm hiện trạng, trạng thái mong muốn và lợi ích kinh doanh, kèm số liệu để lãnh đạo đồng thuận. Tác giả cũng khuyên nên chọn trận chiến cẩn thận: có thể chấp nhận nợ ở các hệ thống thử nghiệm đổi mới hơn là ở hệ thống lưu trữ dữ liệu gốc, miễn là dọn dẹp khi giai đoạn thử nghiệm kết thúc, và phải bảo đảm có đủ nguồn lực để thực sự xử lý nợ.

## [The Search Problem: Why Your Computer Finds Things Faster Than You Do](https://deyaa1251.github.io/deyaa1251/posts/b_tree/?utm_source=bonobopress&utm_medium=newsletter&utm_campaign=2155)

Bài viết giải thích vì sao B-tree lại quan trọng trong các hệ thống hiện đại. Tác giả kể lại trải nghiệm tự cài đặt cây tìm kiếm nhị phân (BST) và nhận ra nó sụp đổ khi mô phỏng thêm thao tác đọc ghi đĩa. Trên RAM, BST có độ phức tạp O(log n), nhưng trên đĩa mỗi tầng của cây là một lần đọc: tìm trong 100.000 tệp cần khoảng 17 lần đọc với BST, trong khi B-tree chỉ cần 3. Lý do là B-tree lưu nhiều khóa trong mỗi nút ("nút béo") với kích thước vừa khít một khối đĩa (4KB), nên cây rất thấp. Kết quả đo đạc càng rõ rệt: khi chèn tuần tự 100.000 phần tử, BST suy biến thành danh sách liên kết cao tới 40.000 tầng và mất khoảng 23,5 phút, còn B-tree chỉ cao 3 tầng và hoàn thành trong 3 giây.

Nhờ bảo đảm hiệu năng ổn định trong trường hợp xấu nhất bất kể thứ tự dữ liệu, B-tree có mặt ở khắp nơi: hệ thống tệp ext4, NTFS, APFS, chỉ mục cơ sở dữ liệu như MySQL, PostgreSQL, MongoDB và cả Git. Bài học rút ra vượt ra ngoài cấu trúc dữ liệu: ngữ cảnh quyết định thiết kế tối ưu. B-tree đánh đổi hiệu năng ở trường hợp tốt nhất để lấy sự bảo đảm cho trường hợp xấu nhất, điều sống còn với các hệ thống chạy thực tế.

## [Kafka is fast -- I'll use Postgres](https://topicpartition.io/blog/postgres-pubsub-queue-benchmarks?utm_source=bonobopress&utm_medium=newsletter&utm_campaign=2155)

Bài viết đo đạc hiệu năng của Postgres khi dùng làm hệ thống pub/sub và hàng đợi, thay cho các hệ thống chuyên dụng như Kafka. Với tin nhắn 1 KiB ở mô hình pub/sub, một máy 4 vCPU đạt khoảng 5.000 tin mỗi giây khi ghi (4,8 MiB/s) và 24,6 MiB/s khi đọc với hệ số phân phối gấp 5, độ trễ p99 là 60ms. Cụm ba máy có sao chép dữ liệu vẫn giữ nguyên thông lượng, chỉ tăng độ trễ p99 lên 186ms. Một máy 96 vCPU đạt tới 238 MiB/s khi ghi và 1,16 GiB/s khi đọc mà chỉ dùng khoảng 10% CPU. Ở mô hình hàng đợi, máy 4 vCPU xử lý khoảng 2,81 MiB/s với độ trễ p99 17,7ms, còn máy 96 vCPU đạt 19,7 MiB/s.

Kết luận của tác giả là cứ dùng Postgres cho tới khi nó không đáp ứng nổi. Với phần lớn tổ chức hoạt động dưới quy mô vài megabyte mỗi giây, Postgres đủ tốt cho khoảng 80% trường hợp với 20% công sức, trong khi chi phí vận hành và gánh nặng tổ chức khi áp dụng một hệ thống mới thường lớn hơn lợi ích ở quy mô nhỏ. Đó cũng là lý do trào lưu "Just Use Postgres" ngày càng phổ biến nhờ sự đơn giản và tin cậy.

## [You Need To Become A Full Stack Person](https://den.dev/blog/full-stack-person/?utm_source=tldrnewsletter)

Den Delimarsky lập luận rằng trong kỷ nguyên AI, mỗi người cần trở thành một "người toàn diện" (full-stack person). Nhiều kỹ năng kỹ thuật đang bị LLM phổ thông hóa, nhưng sự kết hợp giữa óc sáng tạo, tư duy phản biện và tốc độ thực thi sẽ tạo thành lợi thế nghề nghiệp bền vững. Ranh giới giữa các vai trò đang dần mờ đi, thể hiện qua sự trỗi dậy của kỹ sư sản phẩm (product engineer), người đảm nhận cả giao diện, phía máy chủ lẫn việc thấu hiểu người dùng. Theo tác giả, mô hình chữ T (một thế mạnh chuyên sâu cùng nền tảng rộng) đã lỗi thời; thay vào đó là mô hình chữ Pi với hai thế mạnh chuyên sâu là cảm quan sản phẩm và tay nghề kỹ thuật, đặt trên một nền kiến thức liên ngành rộng.

Bài viết liệt kê mười kỹ năng cần rèn luyện: sáng tạo và gu thẩm mỹ, tư duy phản biện, giao tiếp, kiến thức liên ngành, tận dụng AI, cảm quan sản phẩm, tốc độ thực thi, khả năng học nhanh, tư duy hệ thống và tính chủ động. AI không thay thế được gu và khả năng phán đoán; nó chỉ là phương tiện hiện thực hóa ý tưởng, giúp giảm chi phí viết mã nhưng không giảm chi phí chọn đúng việc cần làm. Viết mã không còn là nút thắt, và thái độ chủ động kiểu "cứ bắt tay vào làm, rồi sẽ tìm ra cách" chính là yếu tố tạo nên khác biệt.

**Đánh giá**: *Phần đầu iFlow CLI làm khá tốt, nhưng mà càng về sau thì càng lạm dụng tiếng Anh nhiều. Điểm cộng là iFlow CLI có thể access nhiều url, bằng cách bypass sử dụng proxy (Tuy nhiên proxy của Trung Quốc nên nhìn cũng hơi ghê). Trong quá trình sử dụng thì cũng thấy nhiều dòng để toàn tiếng Trung Quốc làm khó hiểu và hơi rén :v Mình sẽ cố gắng cải thiện AGENTS.md và thử lại sau.*

---

*Bài viết đã được viết lại bởi Claude Code với Opus 5.5 vào ngày 27/09/2026.*
