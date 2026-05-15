---
title: "Newsletter #40"
date: 2025-07-30
tags: ["AI-Assisted", "Java", "Testing", "Performance", "Database"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #40.*

## [A new way to test multi-threaded and concurrent Java](https://vmlens.com/blog/new-way-to-test-multi-threaded-concurrent-java/)

VMLens giới thiệu một phương pháp kiểm thử mới cho ứng dụng Java đa luồng và xử lý đồng thời, giải quyết những thách thức lâu nay trong việc phát hiện lỗi race condition và các vấn đề tương tác giữa các luồng.

Vấn đề cốt lõi của việc kiểm thử đa luồng là chỉ có thể kiểm tra một cách sắp xếp luồng tại một thời điểm, và việc lặp lại test nhiều lần cũng không hiệu quả do có quá nhiều khả năng sắp xếp các luồng khác nhau. VMLens chia việc kiểm thử thành hai phần: thực thi tất cả các cách sắp xếp luồng dựa trên các hành động đồng bộ hóa, và phát hiện data race trong những cách sắp xếp đó.

Công cụ này sử dụng Java agent để chuyển đổi bytecode và theo dõi việc truy cập các trường dữ liệu, ghi lại và phân tích bất đồng bộ các sự kiện truy cập và đồng bộ hóa. Khái niệm data race được định nghĩa là "hai luồng truy cập cùng một trường đồng thời mà không có đồng bộ hóa phù hợp" - khi không có đồng bộ hóa, không có đảm bảo các luồng sẽ thấy giá trị được ghi gần đây nhất.

Điểm mạnh của phương pháp này là sử dụng trừu tượng cấp cao, coi các nguyên thủy đồng thời của Java là được triển khai đúng và tập trung vào việc kiểm tra cách mã sử dụng các cơ chế đồng thời, không phải cơ chế nội bộ của chúng. Đây là một bước tiến quan trọng giúp các nhà phát triển Java kiểm tra hiệu quả các ứng dụng đồng thời bằng cách khám phá có hệ thống các tương tác giữa luồng và các race condition tiềm ẩn.

## [Feature Freeze for JDK 25: What Will the New Edition Bring?](https://www.jvm-weekly.com/p/feature-freeze-for-jdk-25-what-will)

JVM Weekly phân tích các tính năng chính trong JDK 25 sau khi Oracle công bố đóng băng tính năng, hứa hẹn mang đến một phiên bản LTS quan trọng với nhiều cải tiến về hiệu suất và các API ổn định mới.

JDK 25 đánh dấu sự ổn định của nhiều tính năng quan trọng: Scoped Values giúp truyền ngữ cảnh qua các method call một cách nhẹ và bất biến, Module Import Declarations đơn giản hóa việc import package từ module, Compact Source Files cho phép mã nguồn đơn giản hóa với instance main method, và Flexible Constructor Bodies cho phép các câu lệnh trước khi gọi constructor.

Về hiệu suất, phiên bản này đem lại Compact Object Headers giảm overhead bộ nhớ bằng cách sử dụng một word cho object header, Generational Shenandoah GC cải thiện chế độ thu gom rác, và các cải tiến AOT đơn giản hóa việc tạo cache AOT cùng method profiling. Tính năng quan sát được tăng cường với JFR CPU-Time Profiling thực nghiệm cho phép lấy mẫu thời gian CPU chính xác và JFR Method Timing & Tracing theo dõi chi tiết các lời gọi method.

JDK 25 cũng tiếp tục phát triển các tính năng preview và incubating như Primitive Types in Patterns, Vector API (lần ủ thứ 10), Structured Concurrency API, và Stable Values. Quan trọng nhất, đây là phiên bản LTS sẽ được phát hành chính thức vào ngày 16 tháng 9 năm 2025 và nhận được ít nhất 5 năm hỗ trợ Premier từ Oracle, tạo nền tảng ổn định cho các dự án doanh nghiệp lâu dài.

## [If Virtual Threads are the solution, what is the problem?](https://webtide.com/if-virtual-threads-are-the-solution-what-is-the-problem/)

Webtide đặt câu hỏi quan trọng về mối quan hệ giữa virtual threads và các vấn đề cụ thể mà chúng được thiết kế để giải quyết, cảnh báo rằng virtual threads không phải là giải pháp vạn năng cho mọi bài toán về khả năng mở rộng.

Bài viết nhấn mạnh rằng virtual threads hoạt động tốt nhất trong các tình huống cụ thể liên quan đến các tài nguyên có khả năng mở rộng như microservices, mạng từ xa, cơ sở dữ liệu có dung lượng cao, và hệ thống file cục bộ. Tác giả cảnh báo về những rủi ro tiềm ẩn khi sử dụng virtual threads không giới hạn: cạn kiệt tài nguyên, thiếu áp lực ngược (back pressure), và nguy cơ thất bại thảm khốc dưới tải cao điểm.

Virtual threads thực sự có ích khi ứng dụng bị chặn trên "tài nguyên có khả năng mở rộng", khi có các công việc song song nhỏ cần thực thi với độ trễ thấp, hoặc khi thread pool truyền thống trở thành nút thắt cổ chai. Tác giả khuyến nghị sử dụng các server bất đồng bộ như Jetty có thể đọc request bất đồng bộ, chuẩn bị nội dung hiệu quả, phân bổ thread (virtual hoặc platform) một cách chiến lược, và flush response bất đồng bộ.

Insight cốt lõi là virtual threads giải quyết các thách thức đồng thời trong những tình huống cụ thể, nhưng không phải là giải pháp một-kích-cỡ-phù-hợp-tất-cả cho khả năng mở rộng. Quản lý tài nguyên cẩn thận vẫn là điều quan trọng, và các nhà phát triển cần hiểu rõ các nút thắt cổ chai cụ thể của ứng dụng trước khi áp dụng virtual threads như một chiến lược mở rộng.

## [Agentic Coding Recommendations](https://lucumr.pocoo.org/2025/6/12/agentic-coding/)

Armin Ronacher, tác giả của Flask và Ruff, chia sẻ kinh nghiệm thực tế về việc sử dụng AI agent trong lập trình, đưa ra những khuyến nghị cụ thể về cách tận dụng hiệu quả công nghệ này để viết mã tốt hơn và bảo trì được.

Ronacher hiện tại sử dụng Claude Code với quyền truy cập đầy đủ, ít can thiệp từ IDE, và ưu tiên sự đơn giản cũng như ổn định trong mã và công cụ. Ông khuyến nghị mạnh mẽ việc sử dụng Go cho các dự án backend vì hệ thống context rõ ràng, test caching đơn giản, structural interface, và hệ sinh thái ít thay đổi. Các nguyên tắc lựa chọn công cụ bao gồm: công cụ phải nhanh, cung cấp thông báo lỗi rõ ràng, bảo vệ chống lại việc sử dụng sai, và có khả năng quan sát tốt.

Về phương pháp phát triển mã, tác giả ủng hộ việc "viết thứ đơn giản nhất có thể hoạt động được", ưu tiên function hơn class phức tạp, sử dụng plain SQL, và giữ các kiểm tra quan trọng ở local và có thể nhìn thấy. Ronacher thừa nhận sự tiến hóa nhanh chóng của agentic coding: "điều đúng một tháng trước giờ hầu như không còn đúng nữa", nhấn mạnh tính thích ứng và duy trì các nguyên tắc cốt lõi như sự đơn giản, ổn định, và song song hóa thông minh.

Mục tiêu cuối cùng không chỉ là tận dụng agent để viết mã nhanh hơn, mà là để viết mã tốt hơn, dễ bảo trì hơn, và kiên cố hơn. Đây là góc nhìn thực tế từ một trong những lập trình viên kỳ cựu về cách cân bằng giữa việc sử dụng AI và duy trì chất lượng mã trong thời đại mới.

## [AI Changes Everything](https://lucumr.pocoo.org/2025/6/4/changes/)

Trong một bài viết triết lý sâu sắc, Armin Ronacher phản ánh về tác động của AI đối với ngành phát triển phần mềm, so sánh nó với những bước ngoặt công nghệ lớn trong lịch sử như điện và máy in, đồng thời kêu gọi cộng đồng lập trình viên tiếp cận thay đổi này với tư duy tích cực.

Ronacher hiện sử dụng Claude Code cho hầu hết công việc phát triển và nhận thấy vai trò của mình đã chuyển từ "lập trình viên" thành "trưởng nhóm kỹ thuật" quản lý một "thực tập sinh lập trình viên ảo". Ông ước tính năng suất tăng khoảng 30% thời gian trong ngày, nhưng quan trọng hơn là sự thay đổi cơ bản trong cách tiếp cận công việc - từ việc trực tiếp viết mã chuyển sang việc hướng dẫn và cộng tác với AI.

Tác giả nhấn mạnh rằng AI đại diện cho một sự chuyển đổi công nghệ cơ bản, có thể so sánh với điện hoặc máy in, không chỉ đơn thuần là một công cụ mới. Kỹ năng lập trình vẫn có liên quan, nhưng công cụ để thực hiện những kỹ năng đó đã thay đổi một cách đáng kể. AI cho phép công việc có tính ủy quyền và cộng tác hơn giữa con người và máy móc.

Ronacher kêu gọi cộng đồng tiếp cận với sự tò mò và lạc quan về thay đổi công nghệ. Ông tin rằng AI sẽ không thay thế lập trình viên mà sẽ "tăng cường đáng kể khả năng con người khi được sử dụng đúng cách". Mặc dù công nghệ vẫn "lộn xộn và thô", nhưng nó đại diện cho một sự chuyển đổi không thể đảo ngược. Thông điệp cốt lõi là: "Chúng ta không còn chỉ sử dụng máy móc, giờ đây chúng ta đang làm việc cùng với chúng."

## [How I program with Agents](https://crawshaw.io/blog/programming-with-agents)

David Crawshaw chia sẻ kinh nghiệm thực tế về việc sử dụng AI agent trong lập trình, đưa ra định nghĩa đơn giản nhưng sâu sắc và phân tích chi tiết về khả năng cũng như giới hạn của công nghệ này trong môi trường phát triển thực tế.

Crawshaw định nghĩa agent một cách ngắn gọn: "về cơ bản là một vòng lặp for chứa lời gọi LLM", cho phép AI thực thi lệnh và xem kết quả mà không cần can thiệp của con người. Khả năng cốt lõi bao gồm điều hướng codebase bằng bash tools, đọc tài liệu, tìm kiếm API, chạy compiler và test để nhận phản hồi từ môi trường, giúp giảm lỗi cú pháp và cải thiện việc sử dụng API.

Lợi ích thực tế rõ ràng nhất là tăng tốc phát triển các tác vụ lập trình "nhàm chán", cho phép làm việc song song trên nhiều tác vụ phát triển, và giảm công việc thủ công trong tích hợp API cũng như bảo trì mã. Tác giả chia sẻ rằng agent có thể giúp hoàn thành trong một ngày những tác vụ tẻ nhạt mà truyền thống sẽ mất cả tuần để hoàn thành.

Tuy nhiên, Crawshaw cũng thẳng thắn về những hạn chế hiện tại: agent có thể chậm (mất vài phút cho mỗi tác vụ), yêu cầu giám sát cẩn thận để tránh các hành động ngoài ý muốn, và chưa thể thay thế hoàn toàn lập trình viên con người. Về tiềm năng tương lai, ông lạc quan rằng các mô hình ngày càng được tối ưu hóa cho tương tác agent, môi trường phát triển được container hóa có thể cải thiện triển khai agent, và có khả năng biến đổi quy trình review mã và phát triển.

## [Performance Best Practise No. 1: Optimize Database Operations](https://foojay.io/today/performance-best-practise-no-1-optimize-database-operations/)

Foojay đưa ra hướng dẫn chi tiết về tối ưu hóa thao tác cơ sở dữ liệu - yếu tố quan trọng nhất ảnh hưởng đến hiệu suất ứng dụng Java, với những kỹ thuật thực tế và ví dụ mã cụ thể giúp cải thiện đáng kể tốc độ xử lý.

Bài viết nhấn mạnh rằng việc thiết lập kết nối là thao tác cơ sở dữ liệu tốn kém nhất, do đó connection pooling trở thành kỹ thuật tối ưu hóa cơ bản mà các lập trình viên Java đã sử dụng từ lâu. Cấu hình connection pool bao gồm điều chỉnh kích thước pool phù hợp với tải công việc, đảm bảo thread pool max size lớn hơn connection pool max size, và cấu hình connection idle timeout hợp lý.

Về tối ưu hóa câu lệnh, tác giả khuyến nghị sử dụng Prepared Statement, triển khai statement caching, và tái sử dụng query để tránh phân tích SQL lặp lại. JDBC batching được giới thiệu như một kỹ thuật mạnh mẽ để nhóm nhiều câu lệnh SQL thành một request duy nhất, giảm overhead của từng kết nối cơ sở dữ liệu riêng lẻ. Đối với JPA, việc kích hoạt batching thông qua các extension của JPA provider như EclipseLink, cấu hình batch writing size và method phù hợp có thể áp dụng có chọn lọc cho các query cụ thể.

Những khuyến nghị quan trọng bao gồm giám sát việc sử dụng kết nối cơ sở dữ liệu, theo dõi thời gian thực thi query, liên tục kiểm tra và tối ưu hóa cấu hình, đồng thời xem xét các hạn chế cụ thể của từng cơ sở dữ liệu. Bài viết cung cấp nền tảng vững chắc cho các nhà phát triển Java muốn cải thiện hiệu suất tương tác cơ sở dữ liệu.

## [Agent Rules - A collection of rules and knowledge for AI coding assistants](https://github.com/steipete/agent-rules)

Peter Steinberger (CEO của PSPDFKit) đã tạo ra một kho tài nguyên toàn diện về quy tắc và kiến thức cho các trợ lý AI lập trình, cung cấp một định dạng chuẩn hóa và có thể tái sử dụng cho việc cấu hình AI agent trên nhiều công cụ khác nhau.

Repository sử dụng định dạng `.mdc` (Markdown with Configuration) độc đáo hoạt động tương thích với cả Claude Code và Cursor, tạo ra một phương pháp thống nhất để quản lý hướng dẫn AI. Cấu trúc chính bao gồm Project Rules với các hướng dẫn hành động về quy trình phát triển, kiểm tra chất lượng mã, kỹ thuật giải quyết vấn đề, tạo tài liệu và chiến lược tự động hóa; Documentation với tài liệu tham khảo đặc biệt cho Swift development và MCP server best practices; và Global Rules với các script cấu hình cross-project để nâng cao khả năng của AI assistant.

Đặc điểm nổi bật là các quy tắc được thiết kế để có thể tái sử dụng giữa các dự án, rõ ràng và có thể thực hiện được, đồng thời tương thích với cả Cursor và Claude Code. Hướng dẫn sử dụng đơn giản: với Cursor, copy file `.mdc` vào `.cursor/rules/`, với Claude Code thì import quy tắc vào `CLAUDE.md`.

Triết lý cốt lõi được thể hiện qua việc "định dạng thống nhất có nghĩa là bạn có thể sử dụng cùng file quy tắc trong cả hai công cụ mà không cần sửa đổi". Repository hướng tới việc tạo ra một phương pháp chuẩn hóa và cộng tác trong việc làm việc với AI coding assistant, giúp cộng đồng chia sẻ và cải thiện các best practice một cách có hệ thống.

---

*Bài viết đã được review và cập nhật bởi Claude Code với Opus 4.7 (1M context).*
