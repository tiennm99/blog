---
title: "Newsletter #40"
date: 2025-07-30
tags: ["AI-Assisted", "Java", "Concurrency", "Testing", "AI Agents", "Performance", "Database"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #40.*

## [A new way to test multi-threaded and concurrent Java](https://vmlens.com/blog/new-way-to-test-multi-threaded-concurrent-java/)

Kiểm thử mã nguồn Java đa luồng khó ở chỗ mỗi lần chạy kiểm thử chỉ đi qua đúng một cách sắp xếp (interleaving) giữa các luồng. Chạy lặp lại nhiều lần với hy vọng gặp đủ mọi trường hợp chỉ hiệu quả với những đơn vị mã rất nhỏ, vì mỗi lần truy cập trường dữ liệu đều có thể sinh ra một cách sắp xếp mới. VMLens giải quyết bài toán bằng cách chia nó làm hai phần: thực thi mọi cách sắp xếp có thể dựa trên các hành động đồng bộ hóa (trường `volatile`, khối `synchronized`, khóa), rồi phát hiện data race bên trong những cách sắp xếp đó. Cơ sở của cách làm này là: chương trình không có data race sẽ có ngữ nghĩa xen kẽ đơn giản, nên chỉ cần tập trung vào các điểm đồng bộ hóa.

Về kỹ thuật, VMLens chạy như một Java agent, biến đổi bytecode để ghi lại các lần truy cập trường và sự kiện đồng bộ hóa, sau đó phân tích bất đồng bộ thay vì dò lỗi ngay khi chạy. Với mỗi cặp hành động đồng bộ hóa không giao hoán, công cụ thử cả hai thứ tự rồi tổ hợp lại để bao phủ các kịch bản. Bài viết minh họa bằng ví dụ dùng trường `volatile` và `ReentrantLock`, đồng thời nhấn mạnh VMLens coi các thư viện đồng thời của Java là đã đúng và chỉ kiểm tra xem mã nguồn ứng dụng có dùng chúng đúng cách hay không. Khi số nhân CPU ngày càng tăng (đã chạm mốc 288 nhân năm 2025), đây là mảnh ghép còn thiếu để lập trình viên tự tin rằng họ đang dùng các công cụ đồng thời đúng cách.

## [Feature Freeze for JDK 25: What Will the New Edition Bring?](https://www.jvm-weekly.com/p/feature-freeze-for-jdk-25-what-will)

JVM Weekly điểm qua những gì JDK 25 mang lại sau khi bước vào giai đoạn đóng băng tính năng ngày 5/6/2025. Đây là phiên bản LTS, phát hành chính thức ngày 16/9/2025 và được Oracle hỗ trợ Premier ít nhất 5 năm. Nhiều tính năng được hoàn thiện: Scoped Values (JEP 506) giúp truyền ngữ cảnh bất biến, an toàn giữa các luồng; Module Import Declarations (JEP 511) cho phép viết `import module M;` để nhập toàn bộ API của một module; Compact Source Files (JEP 512) cho phép viết `void main()` gọn gàng, giảm mã khuôn mẫu cho người mới; Flexible Constructor Bodies (JEP 513) cho phép đặt câu lệnh trước lời gọi `super()` hoặc `this()`; cùng API hàm dẫn xuất khóa (JEP 510) cho mật mã học.

Về hiệu năng và máy ảo, Compact Object Headers (JEP 519) giảm chi phí bộ nhớ cho mỗi đối tượng, Generational Shenandoah (JEP 521) chính thức sẵn sàng cho môi trường production, bản port x86 32-bit bị loại bỏ, và các cải tiến bộ nhớ đệm AOT kèm thu thập profile phương thức (JEP 514/515) giúp khởi động nhanh hơn. JFR được bổ sung khả năng đo thời gian CPU thử nghiệm trên Linux (JEP 509) cùng sự kiện theo dõi và đo thời gian phương thức (JEP 520). Nhóm tính năng preview và incubator gồm Stable Values, mã hóa PEM, Structured Concurrency (preview lần 5 với API thiết kế lại), mẫu kiểu nguyên thủy trong `instanceof`/`switch` và Vector API (ủ lần thứ 10). Với vai trò LTS, JDK 25 là mốc đáng cân nhắc để các dự án doanh nghiệp nâng cấp.

## [If Virtual Threads are the solution, what is the problem?](https://webtide.com/if-virtual-threads-are-the-solution-what-is-the-problem/)

Webtide, đội ngũ đứng sau Jetty, đặt câu hỏi ngược: nếu virtual thread là lời giải thì bài toán thực sự là gì? Theo tác giả, virtual thread phát huy tác dụng khi ứng dụng bị chặn trên "tài nguyên có khả năng mở rộng", tức những tài nguyên gần như không giới hạn về dung lượng nhưng có độ trễ, như cơ sở dữ liệu và microservice từ xa, mạng chậm của client hay hệ thống tệp cục bộ. Vì virtual thread rất rẻ để tạo, chúng giúp xử lý nhiều thao tác đồng thời khi luồng thường chỉ ngồi chờ.

Tuy nhiên, virtual thread không tự động cải thiện khả năng mở rộng. Khi ứng dụng bị nghẽn ở tài nguyên hữu hạn như CPU, connection pool hay khóa, thêm luồng cũng giống như thêm xe để giải quyết kẹt đường. Luồng đang chờ cũng không miễn phí: một request bị chặn sâu trong mã nguồn vẫn giữ bộ đệm vào/ra, đối tượng phiên, ngăn xếp sâu và nhiều đối tượng trên heap, nên chi phí chờ vẫn đáng kể dù luồng là virtual. Nếu không giới hạn, việc thiếu cơ chế back pressure có thể dẫn đến cạn kiệt tài nguyên dây chuyền và sụp đổ khi tải cao điểm. Tác giả khuyến nghị dùng server bất đồng bộ như Jetty để đọc request bất đồng bộ và chuẩn bị nội dung trước khi cấp một luồng cho logic ứng dụng, vừa giữ được phong cách viết mã chặn dễ hiểu, vừa tránh dồn tích tài nguyên. Bài học cho lập trình viên là phải phân tích đúng nút thắt của ứng dụng trước khi xem virtual thread là chiến lược mở rộng.

## [Agentic Coding Recommendations](https://lucumr.pocoo.org/2025/6/12/agentic-coding/)

Armin Ronacher, tác giả của Flask, chia sẻ cách anh làm việc với AI agent. Anh dùng Claude Code với mô hình Sonnet, tắt các bước hỏi quyền và kiểm soát rủi ro bằng cách cô lập trong Docker; MCP chỉ được dùng hạn chế, còn lại ưu tiên các script shell đơn giản. Với dự án backend, anh khuyên chọn Go: hệ thống context giúp luồng dữ liệu tường minh, kiểm thử chạy tăng dần dễ dàng, interface theo cấu trúc không gây bất ngờ cho mô hình ngôn ngữ, và hệ sinh thái ổn định nên agent ít sinh mã lỗi thời. Ngược lại, Python gây khó cho agent vì các cơ chế "ma thuật" như fixture, sự phức tạp của async và trình thông dịch khởi động chậm.

Với công cụ, nguyên tắc quan trọng nhất là phải nhanh, thông báo lỗi rõ ràng, chống được việc dùng sai và có khả năng quan sát tốt; anh đặt các lệnh then chốt trong Makefile kèm cơ chế bảo vệ, chẳng hạn chặn việc khởi động trùng dịch vụ và ghi log đầy đủ. Về phong cách mã nguồn, hãy viết "thứ đơn giản nhất có thể chạy được": dùng hàm với tên dài, mô tả rõ thay vì class, tránh kế thừa và mẫu thiết kế phức tạp, viết SQL thuần để agent đối chiếu được với log, và giữ các kiểm tra quyền ở gần mã nguồn thay vì giấu trong tệp cấu hình. Agent còn có thể chạy song song nhiều phiên, với hệ thống tệp làm trạng thái chung và các giải pháp cô lập bằng container. Kết luận của anh: thành công với agentic coding đến từ sự đơn giản, ổn định, khả năng quan sát và tái cấu trúc đúng lúc.

## [AI Changes Everything](https://lucumr.pocoo.org/2025/6/4/changes/)

Trong bài viết mang tính suy ngẫm này, Armin Ronacher cho rằng AI là một bước chuyển không thể đảo ngược, sánh ngang với máy in hay động cơ hơi nước, và kêu gọi đón nhận nó bằng sự tò mò, tinh thần trách nhiệm cùng niềm tin vào tương lai. Bản thân anh giờ đây dùng Claude Code cho phần lớn công việc thay vì tự lập trình trong Cursor. Tốc độ viết mã không nhanh hơn, nhưng anh có thêm khoảng 30% thời gian mỗi ngày vì AI đảm nhận phần thực thi, còn anh chuyển sang quản lý, review và giao việc.

Ronacher nhận định tốc độ phổ cập AI vượt xa các làn sóng công nghệ trước, kể cả điện thoại thông minh: người pha chế, thợ cắt tóc hay các bậc phụ huynh đều đã dùng những công cụ này hằng ngày. Khác với thời kỳ các quốc gia chủ yếu tiêu thụ hạ tầng của Mỹ, AI mang tính tất yếu và cạnh tranh giống động cơ hơi nước, nên quốc gia nào cũng sẽ muốn có mô hình và quyền kiểm soát riêng. Anh xếp AI vào nhóm công nghệ định hình lại văn minh, chứ không phải một nền tảng như công cụ tìm kiếm hay mạng xã hội. Thông điệp cuối cùng là nên nhìn AI như bước tiến giúp con người làm được nhiều hơn thay vì một mối đe dọa, và thập kỷ này có thể sẽ giống những giai đoạn lịch sử khi công nghệ mới thay đổi tận gốc cách xã hội vận hành.

## [How I program with Agents](https://crawshaw.io/blog/programming-with-agents)

David Crawshaw định nghĩa agent một cách rất ngắn gọn: "về cơ bản là một vòng lặp for chứa lời gọi LLM". Mô hình ngôn ngữ chạy lệnh, quan sát kết quả và tiếp tục mà không cần con người can thiệp giữa các vòng, nhờ đó mạnh hơn nhiều so với việc chỉ sinh mã tĩnh như một "tấm bảng trắng ảo". Agent dùng những công cụ quen thuộc của lập trình viên như lệnh bash, công cụ vá tệp, duyệt web và review mã để điều hướng codebase, biên dịch, chạy kiểm thử và lặp lại cho đến khi ra lời giải. Phản hồi từ môi trường giúp agent dùng API chính xác hơn nhờ tra tài liệu, ít lỗi cú pháp hơn nhờ trình biên dịch, mã tốt hơn nhờ kiểm thử, và xử lý được codebase lớn nhờ chỉ đọc tệp liên quan.

Theo tác giả, lợi ích lớn nhất là giữ được đà làm việc ở những tác vụ tích hợp tẻ nhạt, để dành sức cho các bài toán thiết kế khó. Dù vậy, agent vẫn tốn nhiều thời gian và tài nguyên: một yêu cầu có thể sinh ra hàng chục nghìn token trung gian và mất vài phút mỗi vòng, chi phí hiện còn cao dù được kỳ vọng sẽ giảm, và agent vẫn gặp khó với các quyết định kiến trúc tinh tế hay quản lý phụ thuộc phức tạp. Về tương lai, Crawshaw dự đoán agent sẽ chạy trong container để an toàn và song song hóa được, IDE sẽ thay đổi căn bản với diff chỉnh sửa được, truy cập SSH và phản hồi theo kiểu review mã, còn quy trình review và cộng tác nhóm sẽ phải được thiết kế lại.

## [Performance Best Practise No. 1: Optimize Database Operations](https://foojay.io/today/performance-best-practise-no-1-optimize-database-operations/)

Bài viết trên Foojay mở đầu loạt thực hành tốt về hiệu năng bằng chủ đề quan trọng nhất: tối ưu thao tác cơ sở dữ liệu trong ứng dụng Java. Vì thiết lập kết nối là thao tác tốn kém nhất, connection pool là kỹ thuật nền tảng. Ví dụ dùng GlassFish, có thể cấu hình qua giao diện quản trị, dòng lệnh, định nghĩa datasource bằng XML hoặc annotation, với các tham số chính: kích thước pool tối đa phù hợp với giới hạn của cơ sở dữ liệu, thời gian chờ khi rảnh ngắn hơn timeout phía cơ sở dữ liệu để tránh kết nối hỏng, và kích thước bộ nhớ đệm câu lệnh.

Statement caching lưu lại các câu lệnh SQL hay dùng (`Statement`, `PreparedStatement`, `CallableStatement`) để tái sử dụng, tránh phân tích cú pháp lặp lại; GlassFish cung cấp cơ chế này ngay cả khi driver JDBC không hỗ trợ. JDBC batching gom nhiều câu lệnh bằng `addBatch()` rồi gửi một lần qua `executeBatch()`, giảm số lượt đi về qua mạng. Với JPA, EclipseLink hỗ trợ batching qua thuộc tính `eclipselink.jdbc.batch-writing` (giá trị `jdbc` hoặc `buffered`) cùng kích thước batch, và có thể tắt batching cho từng truy vấn cụ thể bằng hint khi cần. Cuối cùng, tác giả khuyên theo dõi sát việc sử dụng kết nối và thời gian thực thi truy vấn, đồng thời kiểm thử cấu hình dưới tải thực tế trước khi triển khai.

## [Agent Rules - A collection of rules and knowledge for AI coding assistants](https://github.com/steipete/agent-rules)

Peter Steinberger, nhà sáng lập PSPDFKit, tổng hợp một kho quy tắc và kiến thức dành cho các trợ lý lập trình AI, với mục tiêu tạo ra định dạng thống nhất, tái sử dụng được trên nhiều công cụ. Các quy tắc được viết bằng tệp `.mdc` (Markdown kèm phần cấu hình), dùng được cho cả Cursor lẫn Claude Code mà không cần sửa đổi. Kho được chia thành ba nhóm: quy tắc dự án với hướng dẫn cụ thể về quy trình phát triển, kiểm tra chất lượng mã nguồn, giải quyết vấn đề, viết tài liệu và tự động hóa; tài liệu tham khảo, chẳng hạn hướng dẫn chuyển đổi sang Swift 6 và thực hành tốt khi xây dựng MCP server; và quy tắc toàn cục gồm các script cấu hình dùng chung cho nhiều dự án.

Cách dùng khá đơn giản: với Cursor, chép tệp `.mdc` vào thư mục `.cursor/rules/`; với Claude Code, nhập các quy tắc vào `CLAUDE.md`. Các quy tắc được viết rõ ràng, có thể thực hiện ngay và mang sang dự án khác dễ dàng. Theo tác giả, định dạng thống nhất nghĩa là cùng một tệp quy tắc có thể dùng cho cả hai công cụ, qua đó giúp cộng đồng chia sẻ và cải thiện dần các thực hành tốt khi làm việc với trợ lý lập trình AI một cách có hệ thống.

---

*Bài viết đã được viết lại bởi Claude Code với Opus 5.5 vào ngày 27/09/2026.*
