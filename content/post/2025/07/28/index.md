---
title: "Newsletter #38"
date: 2025-07-28
tags: ["AI-Assisted", "Cursor", "Prompt Engineering", "AI Coding", "System Prompt"]
categories: ["Newsletter"]
---

*Do vẫn chưa xong phần task với ~~Claude Code + Serena MCP~~ trong bài hôm qua, nên nay lại quay lại chuỗi Newsletter nhàm chán với AI nhé!! Mời bạn thưởng thức Newsletter #38 hehe :>*

## [9 Lessons From Cursor's System Prompt](https://byteatatime.dev/posts/cursor-prompt-analysis/)

Bài viết này phân tích sâu về hệ thống prompt của Cursor AI, một trợ lý lập trình nổi tiếng, để tiết lộ những kỹ thuật tinh vi giúp AI tương tác hiệu quả và tự nhiên hơn với lập trình viên.

Tác giả đã khám phá 9 bài học quan trọng từ system prompt của Cursor. Đầu tiên là việc định nghĩa vai trò AI một cách chính xác - thay vì chỉ nói "bạn là trợ lý AI", Cursor định nghĩa cụ thể "bạn là trợ lý lập trình AI, được cung cấp bởi GPT-4.1" để tạo ra ngữ cảnh rõ ràng. Thứ hai là thiết kế prompt có cấu trúc bằng các thẻ XML, giúp tổ chức hướng dẫn phức tạp thành các phần dễ hiểu, giúp AI duy trì ngữ cảnh tốt hơn.

Một điểm thú vị khác là cách Cursor trao quyền tự chủ cho AI - cho phép AI chủ động giải quyết vấn đề với hướng dẫn "tiếp tục làm việc cho đến khi truy vấn của người dùng được giải quyết hoàn toàn". Ngoài ra, việc tích hợp thông tin ngữ cảnh trực tiếp vào prompt (bao gồm kết quả tìm kiếm web, nội dung file, trạng thái IDE) giúp tối đa hóa hiểu biết của AI về tác vụ cần thực hiện.

Bài viết cũng nhấn mạnh tầm quan trọng của việc quản lý công cụ thông minh - định nghĩa các công cụ với giới hạn và tham số cụ thể, quản lý việc truy xuất dữ liệu theo từng phần có thể quản lý được. Như tác giả đã nói: "Ngữ cảnh là vua, nữ hoàng và cả triều đình hoàng gia. Càng cung cấp nhiều thông tin liên quan và cập nhật trực tiếp trong prompt, AI sẽ hoạt động càng tốt."

## [My AI Skeptic Friends Are All Nuts](https://fly.io/blog/youre-all-nuts/)

Thomas Ptacek từ Fly.io đã viết một bài bảo vệ mạnh mẽ việc sử dụng AI trong phát triển phần mềm, lập luận rằng những người hoài nghi AI đang bỏ lỡ cuộc cách mạng công nghệ quan trọng nhất trong sự nghiệp của họ.

Tác giả nhấn mạnh rằng các mô hình ngôn ngữ lớn (LLM) hiện đại đã thay đổi cơ bản cách phát triển phần mềm. Thay vì chỉ copy-paste mã nguồn, các AI agent hiện tại có thể điều hướng codebase, chạy công cụ và kiểm thử, tương tác với Git, và thực hiện các tác vụ phức tạp. Tác giả tuyên bố: "Ngay cả khi mọi tiến bộ về LLM dừng lại từ hôm nay, LLM vẫn sẽ là điều quan trọng thứ hai xảy ra trong suốt sự nghiệp của tôi."

Bài viết giải quyết những lo ngại phổ biến như vấn đề "ảo giác" (hallucination) của AI, cho rằng điều này phần lớn đã được giải quyết với các agent hiện đại có khả năng biên dịch, kiểm tra lỗi và chạy test. Ptacek cũng lập luận rằng việc tạo ra mã "tầm thường" vẫn có giá trị lớn về mặt năng suất, vì "các lập trình viên chuyên nghiệp làm việc để giải quyết các vấn đề thực tế bằng mã nguồn, chúng ta không phải nghệ nhân trong công việc hàng ngày."

Điều quan trọng nhất là tác giả nhấn mạnh rằng lập trình viên vẫn phải chịu trách nhiệm đọc hiểu và đánh giá mã được tạo ra, nhưng AI đang trở thành công cụ hỗ trợ năng suất không thể thiếu.

## [Claude 4 Best Practices](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices)

Tài liệu chính thức từ Anthropic về các phương pháp tốt nhất khi làm việc với Claude 4, cung cấp hướng dẫn chi tiết về kỹ thuật prompt engineering để tối ưu hóa hiệu suất và chất lượng đầu ra.

Các nguyên tắc chung bao gồm việc đưa ra hướng dẫn rõ ràng và cụ thể thay vì mơ hồ - ví dụ thay vì nói "Tạo một dashboard phân tích", hãy nói "Tạo một dashboard phân tích. Bao gồm càng nhiều tính năng và tương tác liên quan càng tốt." Việc thêm ngữ cảnh để giải thích động lực đằng sau yêu cầu cũng giúp Claude hiểu rõ hơn mục tiêu và đưa ra phản hồi phù hợp hơn.

Tài liệu cũng nhấn mạnh tầm quan trọng của việc kiểm soát định dạng phản hồi bằng cách nói cho Claude biết nên làm gì thay vì tránh làm gì, sử dụng các thẻ XML để chỉ định định dạng mong muốn. Đối với việc tạo mã và frontend, nên sử dụng ngôn ngữ khuyến khích như "Đừng giữ lại. Hãy phát huy hết khả năng" và yêu cầu các chi tiết cụ thể như trạng thái hover, tương tác và nguyên tắc thiết kế.

Một điểm đáng chú ý khác là việc tận dụng khả năng tư duy của Claude thông qua các prompt khuyến khích suy ngẫm và lý luận nhiều bước, cũng như tối ưu hóa việc sử dụng công cụ bằng cách khuyến khích gọi công cụ song song. Tài liệu cũng khuyên không nên quá tập trung vào việc vượt qua test case mà hãy nhấn mạnh việc tạo ra các giải pháp mạnh mẽ và có thể tổng quát hóa.

## [Stop Over-thinking AI Subscriptions](https://steipete.me/posts/2025/stop-overthinking-ai-subscriptions)

Một bài viết thực tế về việc đánh giá chi phí và lợi ích của các gói đăng ký AI, giúp các lập trình viên và chuyên gia công nghệ đưa ra quyết định sáng suốt về việc đầu tư vào các công cụ AI.

Tác giả phân tích chi phí-hiệu quả của các gói phổ biến: Claude Max ($200/tháng) cung cấp giá trị tốt nhất với khoảng 900 tin nhắn mỗi 5 giờ, Cursor Pro ($20/tháng) cho 500 yêu cầu AI nhanh với phí bổ sung $0.04/yêu cầu, trong khi OpenAI o3 đắt hơn với $10-40 cho 1 triệu token. Điểm quan trọng là việc tính toán năng suất: một buổi chiều tiết kiệm được tương đương khoảng $200 thời gian tính phí, nghĩa là Claude Max hoàn vốn trong 5 giờ tiết kiệm, còn Cursor chỉ cần 45 phút.

Xu hướng giá cả cũng rất tích cực khi giá token đã giảm 1000 lần trong hai năm qua do cạnh tranh gay gắt, cho thấy xu hướng tiếp tục giảm giá. Tác giả khuyên nên cân nhắc các chương trình đối tác phát triển để được giảm giá, sử dụng công cụ thay thế như Repo Prompt để tiết kiệm chi phí, và theo dõi chi tiêu AI (tác giả đã tự xây dựng "Vibe Meter" cho mục đích này).

Lời khuyên quan trọng nhất là đừng suy nghĩ quá nhiều về chi phí mà hãy tập trung vào thời gian tiết kiệm được. Như tác giả nói: "Thời gian là tài nguyên duy nhất không thể nạp lại. Claude Max với $200 hiện là cách rẻ nhất tôi biết để tạo ra thêm giờ làm việc."

## [Tests Should Not Contain Logic](https://blog.snork.dev/posts/tests-should-not-contain-logic.html)

Một bài viết quan trọng về nguyên tắc viết test, nhấn mạnh rằng các test case không nên chứa logic phức tạp để tránh biến chính test thành nguồn gây lỗi tiềm ẩn.

Nguyên tắc cốt lõi là test nên giảm thiểu logic nội bộ, tránh các câu lệnh điều kiện và vòng lặp trong test vì điều này có thể che giấu lỗi trong implementation. Tác giả minh họa bằng ví dụ về test FizzBuzz có vấn đề, nơi logic trong test lặp lại đúng cái lỗi trong code thực tế, khiến test vượt qua dù code sai.

Thay vào đó, bài viết khuyên dùng parametrized test với các test case rõ ràng và cụ thể. Ví dụ, thay vì viết vòng lặp phức tạp, hãy sử dụng `@pytest.mark.parametrize` với các cặp input-output rõ ràng như `(1, "1"), (3, "fizz"), (5, "buzz"), (15, "fizzbuzz")`. Cách tiếp cận này giúp test trở nên dễ hiểu, dễ bảo trì và loại bỏ khả năng logic test sai dẫn đến kết quả không chính xác.

Điểm mấu chốt là test nên đơn giản, trực tiếp và kiểm tra từng tình huống cụ thể một cách độc lập, thay vì cố gắng tái tạo logic của code trong test. Điều này giúp đảm bảo test thực sự phát hiện được lỗi thay vì vô tình che giấu chúng.

## [Do You Really Know Java?](https://blog.jetbrains.com/idea/2025/05/do-you-really-know-java/)

Một bài viết thú vị từ JetBrains khám phá những khía cạnh ít được biết đến về Java, từ lịch sử phát triển đến các tính năng hiện đại và khả năng tương lai của ngôn ngữ lập trình này.

Bài viết nhắc lại những tính năng đột phá của Java từ thời kỳ đầu: WORA (Write Once, Run Anywhere) thông qua JVM, tự động thu gom rác giúp đơn giản hóa quản lý bộ nhớ, hỗ trợ đa luồng tích hợp, và mô hình bảo mật tiên tiến coi code như có thể không đáng tin cậy. Java bắt đầu như dự án "Green" năm 1991, ban đầu tên "Oak", sau đó đổi thành Java có thể lấy cảm hứng từ cà phê đảo Java.

Về khả năng hiện đại, Java không ngừng phát triển với Vector API cho tính toán hiệu suất cao, các framework AI như LangChain4j và Spring AI, cùng với sự hỗ trợ từ IntelliJ IDEA để tăng năng suất phát triển. Các dự án như Panama, Amber và Valhalla đang mang đến hiệu suất tốt hơn và khả năng biểu đạt ngôn ngữ phong phú hơn.

Như bài viết nhận xét: "Java không đuổi theo xu hướng - nó đang âm thầm trở nên mạnh mẽ hơn ở những điểm quan trọng." Một chi tiết thú vị là linh vật "Duke" của Java được thiết kế bởi một animator sau này làm việc cho bộ phim Shrek. Java đã tiến hóa từ thiết bị nhúng đến hỗ trợ các hệ thống doanh nghiệp toàn cầu, thể hiện sự thích ứng liên tục và sức sống bền bỉ trong bối cảnh công nghệ không ngừng thay đổi.

## [Machine Code Isn't Scary](https://jimmyhmiller.com/machine-code-isnt-scary)

Một bài viết khuyến khích từ Jimmy Miller về việc làm quen với machine code, phá vỡ rào cản tâm lý khiến nhiều lập trình viên ngại tiếp cận lập trình cấp thấp.

Tác giả thừa nhận ban đầu anh cũng thấy lập trình cấp thấp và machine code khá đáng sợ, nhưng sau khi tìm hiểu thì nhận ra machine code về cơ bản chỉ xoay quanh ba khái niệm cốt lõi: Instructions (lệnh), Registers (thanh ghi), và Memory (bộ nhớ). Các kiến trúc processor khác nhau như ARM và x86-64 có cách mã hóa machine code riêng biệt, nhưng nguyên lý cơ bản vẫn giống nhau.

Quan điểm chính của Miller là machine code dễ tiếp cận hơn nhiều so với suy nghĩ của các lập trình viên. Anh so sánh rất thú vị: "Machine code không đáng sợ. Nếu bạn có thể đảm bảo JSON tuân thủ JSON schema, thì bạn có thể viết machine code." Điểm mấu chốt là machine code chỉ là các biểu diễn số của các hành động tính toán, mỗi instruction set có phương pháp mã hóa riêng.

Thông điệp cốt lõi là lập trình cấp thấp không vốn dĩ phức tạp, mà thường bị giải thích kém. Bằng cách chia nhỏ machine code thành các thành phần dễ hiểu, Miller chứng minh rằng các lập trình viên có thể vượt qua nỗi sợ "bare metal programming" và việc tương tác trực tiếp với chi tiết cấp thấp có thể "mở khóa" sự hiểu biết, loại bỏ rào cản tinh thần trong việc nắm bắt các quy trình tính toán cơ bản.

## [The Art of SQL Query Optimization](https://jnidzwetzki.github.io/2025/06/03/art-of-query-optimization.html)

Một hướng dẫn chuyên sâu về nghệ thuật tối ưu hóa truy vấn SQL, giải thích cách hệ quản trị cơ sở dữ liệu tìm ra kế hoạch thực thi hiệu quả nhất cho các truy vấn phức tạp.

Bài viết bắt đầu bằng việc nhắc nhở rằng SQL là ngôn ngữ khai báo - lập trình viên chỉ cần mô tả muốn gì, còn DBMS sẽ quyết định cách thực hiện. Có nhiều đường dẫn để tính toán kết quả truy vấn, và query optimizer sẽ tìm ra kế hoạch thực thi hiệu quả nhất bằng cách tạo ra các kế hoạch khả thi, đánh giá dựa trên chi phí, và chọn kế hoạch rẻ nhất.

Một điểm quan trọng mà tác giả nhấn mạnh là các mô hình chi phí không phải lúc nào cũng dự đoán chính xác về số lượng tuple, thời gian thực thi, và hiệu suất truy vấn. Ví dụ, full table scan có thể hiệu quả hơn index scan khi cần truy xuất một phần lớn dữ liệu, và PostgreSQL có thể điều chỉnh động loại join dựa trên điều kiện lọc.

Các chiến lược tối ưu hóa thực tế bao gồm sử dụng index một cách chiến lược, phân tích hiệu suất thực tế so với ước tính, tận dụng extended statistics để cải thiện kế hoạch truy vấn, và sử dụng các công cụ như Plan Explorer để trực quan hóa việc thực thi truy vấn. Tác giả kết luận rằng "extended statistics có thể giúp có được dự đoán tốt hơn" về hiệu suất truy vấn và tối ưu hóa mô hình chi phí, nhấn mạnh việc tối ưu hóa truy vấn vừa là kỹ năng kỹ thuật vừa là "nghệ thuật" đòi hỏi hiểu biết tinh tế về hành vi hệ thống cơ sở dữ liệu.

---

*Bài viết đã được review và cập nhật bởi Claude Code với Opus 4.7 (1M context).*
