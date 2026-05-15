---
title: "Newsletter #39"
date: 2025-07-29
tags: ["AI-Assisted", "Java", "Interview", "Senior Developer", "Programming"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #39.*

## [100+ Senior Java Developer Interview Questions and Answers – 2025 Edition](https://dev.to/haraf/100-senior-java-developer-interview-questions-and-answers-2025-edition-4f6n)

Một tài liệu tham khảo toàn diện dành cho các lập trình viên Java senior đang chuẩn bị cho phỏng vấn, với hơn 100 câu hỏi được tổ chức thành 5 chủ đề chính kèm theo câu trả lời chi tiết.

Bộ sưu tập này được chia thành các phần rõ ràng: Core Java với 25 câu hỏi về đa luồng, collections và nguyên lý OOP; Spring Boot & Microservices với 25 câu hỏi về cấu trúc nội bộ Spring Boot, tích hợp microservices và bảo mật; Design Patterns với 20 câu hỏi về việc triển khai các mẫu thiết kế quan trọng; Algorithms & Data Structures với 15 câu hỏi về khái niệm thuật toán cơ bản; và cuối cùng là SQL & Database với 15 câu hỏi về thiết kế cơ sở dữ liệu và tối ưu hóa.

Điểm nổi bật của tài liệu này là tập trung vào kiến thức thực tế vượt ra ngoài việc viết mã cơ bản. Các câu hỏi được thiết kế để đánh giá hiểu biết sâu sắc về hệ sinh thái Java và phát triển ứng dụng doanh nghiệp. Ví dụ, thay vì chỉ hỏi về cú pháp Java, các câu hỏi sẽ đi sâu vào quản lý bộ nhớ, xử lý đồng thời, và các tình huống thực tế mà senior developer phải đối mặt hàng ngày.

Tác giả cung cấp không chỉ câu trả lời mà còn giải thích ngữ cảnh thực tế cho từng chủ đề, giúp ứng viên hiểu được tại sao những kiến thức này lại quan trọng trong công việc. Đây là tài nguyên quý giá cho bất kỳ Java developer nào muốn nâng cao kỹ năng phỏng vấn và củng cố kiến thức chuyên môn của mình.

## [The Prompt Engineering Playbook for Programmers](https://addyo.substack.com/p/the-prompt-engineering-playbook-for)

Addy Osmani từ Google chia sẻ hướng dẫn thực tế về kỹ thuật prompt engineering dành riêng cho lập trình viên, giúp tối ưu hóa việc tương tác với AI để có được kết quả chính xác và hữu ích nhất trong công việc phát triển phần mềm.

Nguyên tắc đầu tiên là cung cấp ngữ cảnh phong phú - thay vì hỏi mơ hồ "sửa đoạn mã này", hãy nêu rõ ngôn ngữ lập trình, framework đang sử dụng, và mục tiêu cụ thể. Osmani nhấn mạnh: "Tính cụ thể và ngữ cảnh tạo ra sự khác biệt giữa những gợi ý mơ hồ và các giải pháp chính xác, có thể thực hiện được."

Bài viết cũng khuyến khích việc chia nhỏ các tác vụ phức tạp thành những prompt có thể quản lý được, thay vì yêu cầu mọi thứ trong một lần. Kỹ thuật "few-shot prompting" được đề xuất - cung cấp các ví dụ input/output mong muốn để AI hiểu rõ pattern cần thiết. Việc sử dụng vai trò cụ thể như "Hãy đóng vai một senior React developer và review mã của tôi" cũng giúp AI định hướng phản hồi phù hợp hơn.

Điểm quan trọng nhất là coi prompt engineering như một quá trình tương tác - bắt đầu với hướng dẫn cấp cao, sau đó dần dần điều chỉnh và chi tiết hóa dựa trên phản hồi của AI. Thay vì mong đợi kết quả hoàn hảo từ lần đầu, hãy coi việc này như một cuộc hội thoại để từng bước đạt được mục tiêu mong muốn.

## [Why Your AI Coding Assistant Keeps Doing It Wrong, and How To Fix It](https://blog.thepete.net/blog/2025/05/22/why-your-ai-coding-assistant-keeps-doing-it-wrong-and-how-to-fix-it/)

Pete Hodgson, một chuyên gia tư vấn phần mềm, phân tích sâu sắc về lý do tại sao các trợ lý AI lập trình thường cho ra kết quả không như mong đợi và đưa ra những giải pháp thực tế để cải thiện hiệu quả sử dụng chúng.

Vấn đề cốt lõi nằm ở việc AI thiếu khả năng ra quyết định thiết kế tốt và không hiểu được ngữ cảnh cụ thể của dự án. AI thường tập trung vào giải quyết vấn đề trước mắt mà không xem xét các tác động rộng hơn, đồng thời không nắm được các quy ước của team hoặc kiến trúc hiện tại của codebase. Hodgson chỉ ra rằng AI có xu hướng "quá háo hức làm hài lòng" - đưa ra giải pháp ngay lập tức thay vì đặt câu hỏi về tính tối ưu của phương pháp.

Tác giả đề xuất khung phân tích "Constraint-Context Matrix" để đánh giá các tác vụ lập trình theo hai chiều: không gian giải pháp (mở vs hạn chế) và yêu cầu ngữ cảnh (ngầm định vs rõ ràng). Thay vì hỏi mơ hồ "triển khai tính năng X", hãy chỉ định cụ thể "triển khai tính năng X bằng pattern Y với ràng buộc Z".

Giải pháp quan trọng nhất là cung cấp nhiều ngữ cảnh hơn - bao gồm thông tin nền, pattern hiện có, và các ràng buộc kỹ thuật trong prompt. Hodgson nhấn mạnh: "Đừng nghĩ LLM là hộp phép thuật có thể giải quyết mọi vấn đề lập trình, mà hãy suy nghĩ cách đóng khung vấn đề để phát huy thế mạnh của AI." Điều này có nghĩa là sử dụng AI như một công cụ bổ trợ cho khả năng phán đoán của con người, không phải thay thế.

## [Why AI Agents Need a New Protocol](https://glama.ai/blog/2025-06-06-mcp-vs-api)

Bài viết từ Glama.ai giải thích tại sao Model Context Protocol (MCP) lại cần thiết và khác biệt gì so với API truyền thống, đặc biệt trong bối cảnh phát triển các AI agent hiện đại.

Sự khác biệt cốt lõi nằm ở mục đích thiết kế: API được tạo ra để phục vụ lập trình viên con người viết mã, trong khi MCP được thiết kế đặc biệt cho AI agent ra quyết định. Với API truyền thống, dữ liệu có thể được phân tán trong path, headers, query params và body, khiến AI khó xử lý chính xác. Ngược lại, MCP sử dụng cấu trúc "đầu vào/đầu ra JSON đơn lẻ cho mỗi công cụ", giúp AI agent hoạt động đáng tin cậy hơn.

Điểm nổi bật khác là khả năng khám phá (discovery): API cần tài liệu tĩnh và phải tái tạo SDK khi có thay đổi, còn MCP hỗ trợ "runtime introspection" cho phép truy vấn khả năng một cách động. Về mặt thực thi, thay vì LLM phải tạo ra các HTTP request dễ lỗi, MCP cho phép "LLM chọn công cụ, mã nguồn xác định chạy".

Một ưu điểm quan trọng khác là MCP hỗ trợ tương tác hai chiều như một tính năng cơ bản, thay vì chỉ giao tiếp do client khởi tạo như API truyền thống. Tác giả nhấn mạnh: "HTTP API tiến hóa để phục vụ lập trình viên con người và ứng dụng dựa trên trình duyệt, không phải AI agent." MCP không thay thế API mà tạo ra một lớp tối ưu hóa cho AI, có thể "bao bọc các API hiện có" để chúng thân thiện hơn với AI agent.

## [Understanding logical replication in Postgres](https://www.springtail.io/blog/postgres-logical-replication)

Garth Goodson, CTO của Springtail, cung cấp hướng dẫn chi tiết về logical replication trong PostgreSQL - một kỹ thuật sao chép cơ sở dữ liệu mạnh mẽ cho việc đồng bộ dữ liệu và tích hợp hệ thống.

Logical replication khác với physical replication ở chỗ nó sao chép "biểu diễn logic của các thay đổi" thay vì sao chép các khối dữ liệu vật lý. Cơ chế hoạt động dựa trên Write-Ahead Logging (WAL) để theo dõi và truyền các thay đổi cơ sở dữ liệu thông qua các bản ghi có Log Sequence Numbers (LSN) duy nhất. Hệ thống sử dụng "publications" trên cơ sở dữ liệu nguồn và "subscriptions" trên cơ sở dữ liệu đích, cùng với replication slots để theo dõi việc truyền và xác nhận các thay đổi.

Ưu điểm chính bao gồm khả năng tương thích giữa các phiên bản cơ sở dữ liệu khác nhau, tính linh hoạt trong việc sao chép các bảng/cơ sở dữ liệu cụ thể, và khả năng tích hợp với các hệ thống bên ngoài. Điều này làm cho logical replication trở thành giải pháp lý tưởng cho high availability, tối ưu hiệu suất, disaster recovery, và phân tích dữ liệu mà không ảnh hưởng đến cơ sở dữ liệu chính.

Tuy nhiên, cần lưu ý một số hạn chế quan trọng: logical replication không tự động sao chép các thao tác DDL (thay đổi cấu trúc), cần quản lý cẩn thận không gian WAL và độ trễ sao chép, và yêu cầu các bảng phải có primary key hoặc được cấu hình là REPLICA IDENTITY FULL. Mặc dù có những ràng buộc này, logical replication vẫn mang lại sự linh hoạt đáng kể cho việc đồng bộ và tích hợp cơ sở dữ liệu.

## [One Man Armies](https://quarter--mile.com/One-Man-Armies)

Một bài viết truyền cảm hứng từ Quarter Mile về sức mạnh của các lập trình viên làm việc một mình, chứng minh rằng những dự án tưởng chừng không thể thực hiện được mà không có team và ngân sách triệu đô có thể được xây dựng bởi một người có đam mê và nỗ lực đủ lớn.

Bài viết đưa ra nhiều ví dụ thuyết phục về các "đội quân một người" thành công trong lĩnh vực phần mềm: Eric Barone đã phát triển Stardew Valley trong 4,5 năm với 70 giờ/tuần, Markus Persson tạo ra Minecraft trong 2 năm làm việc độc lập, John Resig phát triển jQuery, và Chris Hunt dành 12 năm cho game RPG Kenshi. Không chỉ dừng lại ở phần mềm, tác giả còn nhắc đến những thành tựu vĩ đại khác như Theory of General Relativity của Einstein hay chương trình máy tính đầu tiên của Ada Lovelace.

Điểm nổi bật của bài viết là thông điệp động viên: nếu những công trình như thuyết tương đối rộng, các nhà thờ lớn, opera dài 29 giờ và các game tỷ đô có thể được tạo ra bởi một người, thì những ý tưởng lớn lao và tưởng chừng phi thực tế của chúng ta có thể không quá tham vọng. Bài viết nhấn mạnh rằng sự khác biệt về năng suất cá nhân có thể rất lớn, và điều quan trọng là phải thực sự quan tâm đến dự án của mình và sẵn sàng đầu tư thời gian, công sức đáng kể.

Mặc dù làm việc một mình mang lại quyền tự chủ hoàn toàn và cơ hội phát triển kỹ năng toàn diện, nhưng cũng đồng nghĩa với việc phải đối mặt với nhiều thách thức như thiếu hỗ trợ từ đồng nghiệp, phải đảm nhận nhiều vai trò khác nhau, và chịu trách nhiệm hoàn toàn cho thành công hay thất bại của dự án.

## [What's the relationship between developer seniority and code refactoring?](https://rdel.substack.com/p/rdel-96-whats-the-relationship-between)

Lizzie Matusov từ RDEL (Research, Development, Engineering Leadership) phân tích mối quan hệ thú vị giữa mức độ kinh nghiệm của lập trình viên và tần suất thực hiện tái cấu trúc mã, tiết lộ những insight quan trọng về cách các team nên tiếp cận việc bảo trì chất lượng mã nguồn.

Nghiên cứu cho thấy sự chênh lệch đáng kể trong hoạt động tái cấu trúc giữa các nhóm lập trình viên khác nhau. Top 5% những contributor có kinh nghiệm nhất thực hiện trung bình 11.14 lần tái cấu trúc, so với chỉ 3.57 lần của các lập trình viên khác. Điều thú vị là hầu hết các hoạt động tái cấu trúc được thúc đẩy bởi việc triển khai tính năng mới và sửa lỗi, không chỉ đơn thuần là cải thiện chất lượng mã.

Những lập trình viên có kinh nghiệm không chỉ thực hiện nhiều tái cấu trúc hơn mà còn áp dụng đa dạng kỹ thuật tái cấu trúc khác nhau, tuy nhiên lại ít ghi chép lại các tác vụ này hơn so với junior developer. Đây là một paradox thú vị cho thấy "công việc vô hình" thường được thực hiện bởi những người có kinh nghiệm nhất nhưng lại ít được ghi nhận.

Matusov đưa ra lời khuyên thực tế cho các engineering leader: biến tái cấu trúc thành thực hành của toàn team thay vì chỉ dựa vào senior developer, công nhận "công việc vô hình" như tái cấu trúc trong đánh giá hiệu suất, khuyến khích documentation ở tất cả cấp độ kinh nghiệm, và sử dụng pair programming cùng review checklist để hỗ trợ việc tái cấu trúc. Kết luận quan trọng là tái cấu trúc chủ yếu được thực hiện bởi senior developer, nhưng team cần tạo ra cấu trúc khuyến khích tất cả mọi người tham gia bảo trì chất lượng mã.

---

*Bài viết đã được review và cập nhật bởi Claude Code với Opus 4.7 (1M context).*
