---
title: "Newsletter #38"
date: 2025-07-28
tags: ["AI-Assisted", "Cursor", "Prompt Engineering", "AI Coding", "Java", "Machine Code", "SQL"]
categories: ["Newsletter"]
---

*Do vẫn chưa xong phần task với ~~Claude Code + Serena MCP~~ trong bài hôm qua, nên nay lại quay lại chuỗi Newsletter nhàm chán với AI nhé!! Mời bạn thưởng thức Newsletter #38 hehe :>*

## [9 Lessons From Cursor's System Prompt](https://byteatatime.dev/posts/cursor-prompt-analysis/)

ByteAtATime ghi lại yêu cầu từ Cursor tới một endpoint tùy chỉnh để phân tích prompt của chế độ Agent dùng GPT-4.1 trong bài tháng 6/2025. Prompt định nghĩa vai trò trợ lý lập trình, chia hướng dẫn thành các khối XML và khuyến khích tự tìm thông tin, lập kế hoạch rồi hành động. Nó cũng quy định cách giao tiếp và giới hạn thực tế, như không lặp sửa linter quá ba lần trên một tệp. Đây là ảnh chụp cách công cụ được cấu hình lúc quan sát, không phải bằng chứng rằng cấu trúc prompt bảo đảm mô hình luôn nhớ hay tuân thủ mọi chỉ dẫn.

Điểm thú vị nhất là Cursor gửi hai tin nhắn với vai trò người dùng: tin đầu chứa các quy tắc tùy chỉnh của người dùng, tin sau chứa câu hỏi thật kèm rất nhiều ngữ cảnh như kết quả tìm kiếm web, nội dung tệp và trạng thái IDE. Tác giả tóm lại rằng ngữ cảnh là "vua, hoàng hậu và cả triều đình": càng đưa nhiều thông tin liên quan trực tiếp vào prompt, AI càng làm việc tốt. Hai bài học cuối nằm ở thiết kế công cụ: công cụ đọc tệp chỉ trả về khoảng 200 đến 250 dòng mỗi lần để kiểm soát cửa sổ ngữ cảnh, còn kết quả chạy lệnh terminal kèm thêm thông tin trạng thái như thư mục làm việc hiện tại, giúp các lần gọi sau chính xác hơn.

## [My AI Skeptic Friends Are All Nuts](https://fly.io/blog/youre-all-nuts/)

Thomas Ptacek (Fly.io) phản bác bạn bè hoài nghi AI, coi LLM là một trong những thay đổi quan trọng nhất trong sự nghiệp mình. Theo ông, nhiều lời phê phán dựa trên trải nghiệm cũ, tức là hỏi ChatGPT rồi dán mã vào trình soạn thảo, trong khi người dùng nghiêm túc bây giờ làm việc với agent: tự đọc mã nguồn trong dự án, chạy công cụ Unix, tương tác với Git, chạy linter, biên dịch, kiểm thử và lặp lại theo kết quả. Theo Ptacek, vòng phản hồi này giảm tác hại của lỗi như gọi hàm không tồn tại. Tuy nhiên, biên dịch và kiểm thử không tự phát hiện mọi sai sót, nên không thể coi “ảo giác” đã hết là vấn đề. LLM có thể viết phần lớn mã nhàm chán, giúp lập trình viên dồn sức cho những phần thật sự quan trọng.

Ông còn lập luận: Bạn vẫn luôn chịu trách nhiệm với những gì mình hợp nhất vào nhánh `main`, nên hãy đọc mã do AI viết như đọc mã của đồng nghiệp. Mã "tầm thường" không đáng lo, vì không phải đoạn mã nào cũng cần tinh xảo, và LLM nâng "mặt sàn" chất lượng lên. Chuyện LLM viết Rust kém phần nhiều do công cụ, còn Go lại rất hợp với LLM. Với lập luận về tay nghề, ông nhắc rằng lập trình viên chuyên nghiệp giải quyết vấn đề thực tế cho mọi người bằng mã nguồn, chứ trong công việc hằng ngày chúng ta không phải nghệ nhân. Ông cũng thừa nhận LLM có thể khiến nhiều lập trình viên mất việc, và rằng những người hoài nghi kia rất giỏi: khi họ bắt tay vào dùng, các agent lập trình sẽ còn hiệu quả hơn nhiều.

## [Claude 4 Best Practices](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices)

Đây là tài liệu chính thức của Anthropic về prompt engineering cho các mô hình Claude, ban đầu viết cho Claude 4 và nay được cập nhật cho các thế hệ mới hơn. Nguyên tắc nền tảng là hướng dẫn rõ ràng, trực tiếp và cung cấp quy trình liên quan. Muốn kết quả vượt mong đợi thì phải yêu cầu thẳng, ví dụ thay vì chỉ nói "Tạo một bảng điều khiển phân tích", hãy thêm "Đưa vào càng nhiều tính năng và tương tác liên quan càng tốt". Giải thích lý do đằng sau yêu cầu giúp Claude hiểu mục tiêu và tổng quát hóa tốt hơn; ví dụ mẫu nên bọc trong thẻ `<example>`, còn hướng dẫn, ngữ cảnh và dữ liệu đầu vào nên tách bằng các thẻ XML. Với tài liệu dài, hãy đặt dữ liệu lên đầu prompt, câu hỏi ở cuối, và yêu cầu Claude trích dẫn đoạn liên quan trước khi trả lời.

Để điều khiển định dạng, hãy nói Claude nên làm gì thay vì cấm đoán, chẳng hạn "viết thành các đoạn văn liền mạch" thay vì "đừng dùng markdown", và giữ phong cách của prompt giống đầu ra mong muốn. Tài liệu cũng hướng dẫn tận dụng khả năng suy nghĩ để cân nhắc kết quả sau mỗi lần gọi công cụ, khuyến khích gọi nhiều công cụ song song khi các thao tác độc lập với nhau, và quản lý trạng thái cho những tác vụ kéo dài. Với lập trình, cần dặn Claude viết giải pháp tổng quát, đúng với mọi đầu vào hợp lệ thay vì chỉ cố vượt qua các ca kiểm thử hay gán cứng giá trị, vì kiểm thử dùng để xác minh tính đúng đắn chứ không định nghĩa lời giải.

## [Stop Over-thinking AI Subscriptions](https://steipete.me/posts/2025/stop-overthinking-ai-subscriptions)

Trong bài ngày 2/6/2025, Peter Steinberger lập luận rằng nên đánh giá chi phí AI theo thời gian công việc tiết kiệm được. Ông so sánh các gói Claude và Cursor cùng chi phí API o3 dựa trên giá, hạn mức và trải nghiệm khi đó, đồng thời giới thiệu Vibe Meter để theo dõi chi tiêu. Những con số như khoảng 900 tin nhắn trong năm giờ hay 500 yêu cầu nhanh là mô tả tại thời điểm viết, không phải hạn mức hiện hành hoặc cam kết sử dụng không giới hạn.

Điểm hữu ích của bài là cách nghĩ về chi phí cơ hội: với người làm hợp đồng, một công cụ giúp hoàn thành công việc nhanh hơn có thể đáng tiền hơn chênh lệch nhỏ giữa các gói. Tuy vậy, các phép tính hoàn vốn phụ thuộc mức thu nhập, số giờ thực sự tiết kiệm và chất lượng đầu ra cần rà soát. Nhận định giá token sẽ tiếp tục giảm và gói nào “đáng tiền nhất” là dự đoán, đánh giá cá nhân của tác giả; cần phân biệt với kết quả đo năng suất hay bảng giá cập nhật.

## ~~[Tests Should Not Contain Logic](https://blog.snork.dev/posts/tests-should-not-contain-logic.html)~~

Bài viết ngắn này đưa ra một nguyên tắc: bài kiểm thử nên chứa càng ít logic càng tốt, tránh câu lệnh điều kiện và vòng lặp, để khi kiểm thử thất bại ta loại trừ ngay khả năng lỗi nằm ở chính nó. Tác giả minh họa bằng một hàm FizzBuzz có lỗi: vì kiểm tra `n % 3` trước `n % 15`, lời gọi `fizzbuzz(15)` trả về "fizz" thay vì "fizzbuzz". Nếu ngại viết từng câu lệnh khẳng định và dùng vòng lặp tính kết quả mong đợi bằng đúng chuỗi điều kiện ấy, bài kiểm thử sẽ lặp lại chính lỗi của mã nguồn và vẫn vượt qua. Ngược lại, những bài kiểm thử "hiển nhiên" ghi rõ từng giá trị, như `assert fizzbuzz(15) == "fizzbuzz"`, sẽ phát hiện lỗi ngay lập tức.

Để bớt lặp lại mà không thêm logic, tác giả gợi ý dùng kiểm thử tham số hóa (còn gọi là kiểm thử dạng bảng): khai báo danh sách các cặp đầu vào và kết quả mong đợi, ví dụ với `@pytest.mark.parametrize` trong pytest là `(1, "1")`, `(3, "fizz")`, `(5, "buzz")`, `(15, "fizzbuzz")`. Cách này giữ bài kiểm thử ngắn gọn, dễ đọc, và mỗi trường hợp được kiểm tra độc lập bằng một giá trị cụ thể.

## [Do You Really Know Java?](https://blog.jetbrains.com/idea/2025/05/do-you-really-know-java/)

Nhân dịp Java tròn 30 tuổi, bài viết của JetBrains nhìn lại hành trình của ngôn ngữ này. Năm 1991, nhóm của James Gosling tại Sun Microsystems bắt đầu Green Project để viết phần mềm cho các thiết bị điện tử tiêu dùng, và cần một ngôn ngữ nhẹ, an toàn, chạy được trên mọi phần cứng. Ngôn ngữ ban đầu tên là Oak, theo cây sồi ngoài cửa sổ văn phòng Gosling, nhưng tên này đã bị đăng ký nhãn hiệu nên nhóm đổi thành Java, có thể vì loại cà phê từ đảo Java. Java được giới thiệu công khai năm 1995, đúng lúc web bùng nổ. Những tính năng gây ấn tượng thời đó gồm "viết một lần, chạy mọi nơi" nhờ JVM, thu gom rác tự động, đa luồng tích hợp ngay trong ngôn ngữ (nay có thêm luồng ảo từ Project Loom) và mô hình bảo mật sandbox coi mọi đoạn mã là mối đe dọa tiềm tàng.

Bài viết cũng kể về IntelliJ IDEA, ra đời năm 2001, với gợi ý mã theo ngữ cảnh, tái cấu trúc đáng tin cậy và phân tích mã theo thời gian thực. Trong thời đại AI, Java 24 bổ sung hơn 20 tính năng, trong đó có Vector API tận dụng các lệnh CPU chuyên dụng cho tính toán nặng, cùng các dự án Panama, Amber, Valhalla và những framework như LangChain4j, Spring AI. Như bài viết nhận xét, Java không chạy theo xu hướng mà lặng lẽ mạnh lên ở những chỗ quan trọng. Chi tiết vui cuối bài: linh vật Duke do Joe Palrang thiết kế, người sau này làm hoạt hình cho Shrek và Madagascar.

## [Machine Code Isn't Scary](https://jimmyhmiller.com/machine-code-isnt-scary)

Jimmy Miller, từng lập trình ActionScript trên Flash, kể cách vượt nỗi ngại làm việc gần phần cứng. Khi thực sự tìm hiểu, anh nhận ra rằng nếu bạn đảm bảo được một tệp JSON tuân theo JSON schema, bạn cũng viết được mã máy. Mã máy không có một chuẩn duy nhất mà phụ thuộc tập lệnh của bộ xử lý (x86-64 trên đa số PC, ARM trên Mac đời mới, Raspberry Pi và điện thoại), nhưng chỉ xoay quanh ba khái niệm: lệnh, thanh ghi và bộ nhớ. Trên AArch64, mỗi lệnh là một số 32 bit; lệnh cộng hằng số chẳng hạn chỉ là một cấu trúc dữ liệu gồm cờ 64 bit, giá trị 12 bit, thanh ghi nguồn và thanh ghi đích được đặt vào đúng vị trí bit. Hợp ngữ như `add x1, x0, #0x2a` chỉ là cách viết dễ đọc cho con số đó, còn lệnh `str` ghi một giá trị vào bộ nhớ, giống như gán vào một phần tử của một mảng rất lớn.

x86-64 rắc rối hơn vì độ dài lệnh không cố định và mang nhiều "hành lý lịch sử", nhưng vẫn gồm những phần tương tự: tiền tố REX cho thao tác 64 bit, byte ModR/M cho biết đang dùng thanh ghi hay bộ nhớ, và mã lệnh. Tác giả ghép các phần đó lại để mã hóa lệnh đưa số 42 vào thanh ghi RBX. Anh thừa nhận vẫn còn nhiều thứ phải học như cờ trạng thái, quy ước gọi hàm hay ngăn xếp, nhưng việc tự tay làm ở cấp thấp đã gỡ bỏ những rào cản tâm lý và lấp đầy khoảng trống kiến thức mà trước đây anh chỉ bù đắp bằng thư viện của người khác.

## [The Art of SQL Query Optimization](https://jnidzwetzki.github.io/2025/06/03/art-of-query-optimization.html)

SQL là ngôn ngữ khai báo: ta chỉ mô tả kết quả, còn hệ quản trị cơ sở dữ liệu phải tự quyết định cách tính. Bộ tối ưu truy vấn sinh ra các kế hoạch khả thi, ước lượng chi phí rồi chọn kế hoạch rẻ nhất; chẳng hạn khi cần trả về phần lớn bảng, quét tuần tự toàn bảng có thể nhanh hơn đi theo chỉ mục. Để thấy khi nào PostgreSQL đổi kế hoạch, Jan Nidzwetzki xây dựng Plan Explorer, một công cụ mã nguồn mở lấy ý tưởng từ Picasso: nó chạy một truy vấn với mọi tổ hợp tham số trong không gian hai chiều rồi vẽ ra kế hoạch được chọn, chi phí dự kiến, thời gian thực thi, số dòng dự kiến và số dòng thực tế. Công cụ có thể chạy ngay trong trình duyệt nhờ PGlite (PostgreSQL biên dịch sang WebAssembly), hoặc ở chế độ máy chủ để gửi truy vấn tới một PostgreSQL thật và chạy `EXPLAIN (ANALYZE)`.

Với ví dụ tự kết nối một bảng 100.000 dòng có chỉ mục, công cụ cho thấy PostgreSQL dùng năm kế hoạch khác nhau tùy điều kiện lọc. Một chi tiết thú vị: truy vấn viết `LEFT JOIN` nhưng PostgreSQL thực thi `INNER JOIN`, vì bộ lọc trên bảng bên phải sẽ loại hết các dòng chứa NULL mà phép kết nối trái tạo ra. Công cụ cũng làm lộ một lần dự đoán sai: PostgreSQL giả định hai điều kiện lọc có tương quan với nhau trong khi thực tế chúng độc lập, khiến số dòng ước lượng lệch xa so với thực tế; theo tác giả, thống kê mở rộng (extended statistics) có thể giúp ước lượng tốt hơn.

---

*Bài viết đã được viết lại bởi Claude Code với Opus 5.5 vào ngày 27/09/2026; được review và chỉnh sửa bởi Codex với GPT 6.1 Sol vào ngày 09/11/2026.*
