---
title: "Newsletter #39"
date: 2025-07-29
tags: ["AI-Assisted", "Java", "Interview", "Senior Developer", "Programming"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #39.*

## [100+ Senior Java Developer Interview Questions and Answers – 2025 Edition](https://dev.to/haraf/100-senior-java-developer-interview-questions-and-answers-2025-edition-4f6n)

Bài viết trên DEV Community tổng hợp hơn 100 câu hỏi phỏng vấn kèm lời giải đáp dành cho vị trí lập trình viên Java cấp cao năm 2025, chia thành năm nhóm chủ đề. Phần Core Java gồm 25 câu, chia đều cho đa luồng và xử lý đồng thời (deadlock, từ khóa `volatile`), collections và cách chúng được cài đặt bên trong, nguyên lý hướng đối tượng, quản lý bộ nhớ (thu gom rác, cấu trúc heap) và các tính năng từ Java 8 trở đi như functional interface, stream hay `Optional`. Phần Spring Boot và microservices cũng có 25 câu, xoay quanh cơ chế tự động cấu hình, vòng đời bean, các cách giao tiếp giữa các dịch vụ (REST, gRPC, hàng đợi thông điệp), bảo mật với JWT, OAuth2, phân quyền theo vai trò, công cụ giám sát như Sleuth, Zipkin, Prometheus cùng các chiến lược triển khai và phục hồi khi lỗi.

Ba phần còn lại gồm 20 câu về mẫu thiết kế (Singleton, Factory, Strategy, Builder, Observer, Proxy, Adapter), 15 câu về thuật toán và cấu trúc dữ liệu (độ phức tạp, sắp xếp, tìm kiếm, duyệt đồ thị, Trie, bộ nhớ đệm LRU) và 15 câu về SQL và cơ sở dữ liệu (phép JOIN, chuẩn hóa, chỉ mục, tính chất ACID, tính nhất quán trong hệ phân tán). Điểm đáng giá là các câu hỏi bám vào tình huống thực tế thay vì cú pháp đơn thuần. Với lập trình viên trẻ, đây là một bản đồ tốt để biết mình còn thiếu mảng kiến thức nào trước khi hướng tới vị trí cấp cao.

## [The Prompt Engineering Playbook for Programmers](https://addyo.substack.com/p/the-prompt-engineering-playbook-for)

Addy Osmani (Google) tổng hợp cách viết prompt hiệu quả khi làm việc với trợ lý AI lập trình, xoay quanh bảy nguyên tắc: cung cấp đủ ngữ cảnh (ngôn ngữ, framework, thông báo lỗi, hành vi mong đợi), nêu mục tiêu cụ thể, chia nhỏ nhiệm vụ lớn, đưa ví dụ đầu vào/đầu ra (few-shot prompting), giao cho AI một vai trò như người review mã nguồn hay chuyên gia bảo mật, tinh chỉnh qua nhiều lượt hội thoại và giữ mã nguồn của bạn gọn gàng, đặt tên rõ ràng. Theo tác giả, hãy luôn giả định AI không biết gì về dự án ngoài những gì bạn cung cấp. Khi gỡ lỗi, một công thức hữu ích là mô tả "mã nguồn đáng lẽ làm X nhưng lại làm Y khi nhận đầu vào Z"; trong ví dụ của bài, prompt kèm thông báo lỗi, dữ liệu mẫu và kết quả mong đợi giúp AI tìm ra ngay lỗi lệch một ở vòng lặp.

Với tái cấu trúc, cần nói rõ mục tiêu (dễ đọc hơn, chạy nhanh hơn, bỏ trùng lặp, giữ nguyên thông báo lỗi) thay vì chỉ yêu cầu "refactor đoạn này". Với tính năng mới, nên đi từ dàn ý tổng quát rồi xây dựng từng bước, chẳng hạn dựng khung component, sau đó thêm state, cuối cùng mới tích hợp API. Các lỗi thường gặp gồm prompt quá chung chung, dồn nhiều yêu cầu vào một lần hay không nêu tiêu chí thành công. Osmani khuyên hãy coi AI như một lập trình viên trẻ rất chăm chú: hướng dẫn rõ ràng, kiên nhẫn lặp lại và tận dụng khả năng giải thích của nó để vừa giải quyết vấn đề vừa học thêm.

## [Why Your AI Coding Assistant Keeps Doing It Wrong, and How To Fix It](https://blog.thepete.net/blog/2025/05/22/why-your-ai-coding-assistant-keeps-doing-it-wrong-and-how-to-fix-it/)

Pete Hodgson cho rằng thay vì tranh cãi "AI có viết mã nguồn tốt không", ta nên hỏi AI giỏi ở loại nhiệm vụ nào và nên tránh giao cho nó loại nào. Trợ lý AI có một năng lực khá lạ: viết phần hiện thực ở mức kỹ sư cấp cao nhưng ra quyết định thiết kế như người mới vào nghề, và lúc nào cũng giống một thành viên "trong giờ làm việc đầu tiên", không biết gì về codebase, quy ước của nhóm hay bối cảnh nghiệp vụ. Để đánh giá, tác giả đề xuất ma trận hai trục: không gian lời giải (hẹp, chỉ có một cách làm hiển nhiên như gỡ một feature flag, cho tới rộng, có nhiều cách hợp lý như hỗ trợ tải lên nhiều ảnh) và mức độ ngữ cảnh cần có (dựa vào hiểu biết ngầm của nhóm hay có thể cung cấp tường minh). AI làm tốt nhất khi không gian lời giải hẹp và ngữ cảnh đầy đủ, vì khi có quá nhiều cách giải, AI khó chọn đúng cách "chuẩn".

Từ đó có hai hướng khắc phục. Để thu hẹp không gian lời giải, hãy ra chỉ dẫn cụ thể về cách làm thay vì để AI tự lên kế hoạch, và chia bài toán thành các bước nhỏ hơn. Để bổ sung ngữ cảnh, hãy đưa thông tin tường minh vào prompt, dùng tính năng ghi nhớ hoặc bộ quy tắc của công cụ, cho AI tìm kiếm trong codebase, đọc tài liệu và kết nối qua MCP server tới schema cơ sở dữ liệu hay hệ thống quản lý ticket. Tóm lại, hãy định hình công việc theo thế mạnh của AI thay vì mong AI tự thích nghi.

## [Why AI Agents Need a New Protocol](https://glama.ai/blog/2025-06-06-mcp-vs-api)

Bài viết của Glama.ai lý giải vì sao AI agent cần Model Context Protocol (MCP) thay vì chỉ dùng HTTP API truyền thống. Luận điểm gốc là HTTP API phát triển để phục vụ lập trình viên con người và ứng dụng trên trình duyệt, không phải AI agent. MCP áp đặt sự nhất quán ngay ở tầng giao thức, trong khi OpenAPI chỉ mô tả lại các API vốn đã muôn hình vạn trạng; theo tác giả, không thể sửa sự thiếu nhất quán bằng cách viết tài liệu tốt hơn. Từ đó bài viết nêu năm khác biệt: MCP cho phép truy vấn khả năng của máy chủ ngay lúc chạy thay vì dựa vào tài liệu tĩnh; khi dùng API, mô hình phải tự viết HTTP request và dễ bịa ra đường dẫn hay tham số sai, còn với MCP mô hình chỉ chọn công cụ, phần mã nguồn bên dưới chạy một cách xác định; MCP coi giao tiếp hai chiều là tính năng cốt lõi; mỗi công cụ ứng với trọn một nhiệm vụ của người dùng thay vì rải công việc ra nhiều endpoint; và MCP có thể chạy như tiến trình cục bộ qua stdio, không cần tầng mạng.

Tác giả cũng chỉ ra lợi thế lâu dài của việc chuẩn hóa: mô hình chỉ cần học một khuôn mẫu thống nhất thay vì hàng nghìn biến thể API khác nhau. Kết luận không phải là MCP thay thế API, mà là dùng song song: giữ API cho lập trình viên và bổ sung MCP làm lớp tích hợp dành riêng cho AI agent.

## [Understanding logical replication in Postgres](https://www.springtail.io/blog/postgres-logical-replication)

Garth Goodson, CTO của Springtail, giải thích cơ chế logical replication trong PostgreSQL, cách sao chép dữ liệu ở mức thay đổi logic thay vì sao chép từng khối dữ liệu vật lý. Nền tảng là Write-Ahead Log (WAL): mọi thay đổi được ghi vào nhật ký trước khi ghi xuống tệp dữ liệu, và mỗi bản ghi mang một Log Sequence Number (LSN) duy nhất. Phía nguồn khai báo publication để chọn bảng hoặc schema cần sao chép, phía đích tạo subscription để nhận các publication đó. Replication slot theo dõi bản ghi WAL nào đã được gửi và xác nhận; chỉ khi một LSN được bản sao xác nhận thì bản ghi đó mới được giải phóng khỏi WAL, giúp tránh mất dữ liệu nhưng cũng đòi hỏi theo dõi dung lượng đĩa. Cuối cùng, logical decoding cùng các output plugin chuyển thay đổi trong WAL sang định dạng dễ tiêu thụ; plugin mặc định pgoutput phát ra hai loại thông điệp là XLogData chứa thay đổi thực tế và KeepAlive để duy trì kết nối.

Kỹ thuật này hữu ích cho tính sẵn sàng cao, phân tải truy vấn đọc, khôi phục sau sự cố và chạy truy vấn phân tích mà không ảnh hưởng đến máy chủ chính. Tuy vậy, nó có những hạn chế cần biết: không tự sao chép thao tác DDL như thay đổi schema, chỉ mục hay sequence; chậm hơn physical replication khi khối lượng lớn; cần cấu hình và vận hành nhiều hơn; và các bảng phải có khóa chính hoặc được đặt REPLICA IDENTITY FULL.

## [One Man Armies](https://quarter--mile.com/One-Man-Armies)

Bài luận ngắn trên Quarter Mile mở đầu bằng một nhận xét: năng suất giữa người với người chênh lệch đến khó tin, và điều nhiều người cho là bất khả thi nếu không có cả đội ngũ cùng 5 triệu USD đôi khi lại được một người rất tâm huyết và chăm chỉ làm ra. Để minh họa, tác giả liệt kê các dự án (gần như) do một người thực hiện: Eric Barone làm Stardew Valley với 70 giờ mỗi tuần trong 4,5 năm, Markus Persson viết Minecraft trong 2 năm, John Resig tạo ra jQuery, Chris Sawyer làm Rollercoaster Tycoon, Chris Hunt dành 12 năm cho game nhập vai Kenshi, Linus Torvalds khởi xướng Linux, Donald Knuth viết bộ sách The Art of Computer Programming vẫn chưa hoàn thành. Danh sách còn vượt ra ngoài phần mềm với chương trình máy tính đầu tiên của Ada Lovelace, thuyết tương đối rộng của Einstein, nhà thờ Sagrada Familia mà Antoni Gaudí dành hơn 40 năm, bản đồ khoa học đầu tiên về đáy Đại Tây Dương của Marie Tharp hay chuỗi bảy vở opera Light dài gần 30 giờ của Karlheinz Stockhausen.

Tác giả để người đọc tự rút ra bài học, nhưng gợi ý một điều: nếu thuyết tương đối rộng, cả một nhà thờ, những vở opera dài 29 giờ hay các trò chơi tỷ đô có thể do một người làm nên, thì những ý tưởng lớn và có vẻ viển vông của bạn có lẽ cũng không quá tham vọng. Và nếu bạn đủ quan tâm đến chúng, chúng đáng để thử.

## [What's the relationship between developer seniority and code refactoring?](https://rdel.substack.com/p/rdel-96-whats-the-relationship-between)

Lizzie Matusov trên bản tin RDEL (Research-Driven Engineering Leadership) tóm tắt một nghiên cứu về mối liên hệ giữa thâm niên của lập trình viên và hoạt động tái cấu trúc mã nguồn. Nhóm nghiên cứu phân tích 800 dự án Java mã nguồn mở trên GitHub, khai thác hơn 700.000 thao tác tái cấu trúc trong 111.884 commit, đo thâm niên bằng tỷ lệ commit của từng lập trình viên (Developer Commit Ratio) và dùng mô hình học máy để phân loại động cơ tái cấu trúc. Kết quả cho thấy 5% người đóng góp nhiều nhất thực hiện trung bình 11,14 lần tái cấu trúc, so với 3,57 lần ở những người còn lại, đồng thời áp dụng nhiều loại kỹ thuật tái cấu trúc hơn. Phần lớn việc tái cấu trúc xuất phát từ việc hiện thực tính năng và sửa lỗi chứ không chỉ để cải thiện chất lượng mã nguồn, và động cơ này không khác biệt theo thâm niên. Điểm đáng chú ý là những người có thâm niên cao nhất lại ghi chép về việc tái cấu trúc ít hơn những người ít kinh nghiệm.

Từ đó, bài viết đưa ra ba gợi ý cho người dẫn dắt đội ngũ kỹ thuật. Thứ nhất, khuyến khích mọi cấp độ cùng tham gia tái cấu trúc thông qua lập trình theo cặp và các nguyên tắc thiết kế chung. Thứ hai, làm cho công việc này được nhìn thấy bằng cách ghi nhận nó trong các buổi retrospective và tiêu chí thăng tiến. Thứ ba, chuẩn hóa việc ghi chép bằng gợi ý nhẹ nhàng trong commit message và hướng dẫn review áp dụng cho mọi người, bất kể thâm niên.

---

*Bài viết đã được viết lại bởi Claude Code với Opus 5.5 vào ngày 27/09/2026.*
