---
title: "Newsletter #41"
date: 2025-07-31
tags: ["AI-Assisted", "Performance", "Algorithms", "AI Coding", "Claude Code", "Vibe Coding", "SQL"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #41.*

## [The Fastest Way to Detect a Vowel in a String](https://austinhenley.com/blog/vowels.html)

Austin Henley thử so sánh 11 cách kiểm tra một chuỗi có chứa nguyên âm hay không trong Python, từ vòng lặp `for` đơn giản, vòng lặp kiểu C với chuỗi điều kiện `or`, vòng lặp lồng nhau, phép giao tập hợp, biểu thức generator với `any()`, đệ quy, `filter`/`map` với lambda, cho đến regex và cả một cách "cho vui" là mã hóa ký tự bằng số nguyên tố. Kết quả đo đạc khá bất ngờ: với chuỗi ngắn (độ dài 10), vòng lặp đơn giản nhanh nhất, nhưng từ độ dài 100 trở lên thì regex vượt lên dẫn đầu, còn vòng lặp kiểu C chậm hẳn đi. Lý do là bộ máy regex được viết bằng C và dùng bảng tra bitmap để khớp ký tự, thay vì phải thông dịch từng lệnh bytecode của Python.

Phần cập nhật sau bài viết còn thú vị hơn: độc giả chỉ ra rằng phương thức `find()` có sẵn của chuỗi nhanh hơn regex nhờ thuật toán tìm kiếm được tối ưu trong CPython, và chỉ cần đảo thứ tự vòng lặp (duyệt qua từng nguyên âm rồi kiểm tra nó có nằm trong chuỗi đầu vào không) là đã nhanh hơn cả regex lẫn `find()`, gấp khoảng 16 lần regex với chuỗi dài. Bài học rút ra là chênh lệch hiệu năng ở đây chủ yếu đến từ trình thông dịch CPython: đoạn mã nào đẩy được nhiều việc xuống tầng C thì thắng. Trong thực tế, bạn nên ưu tiên cách viết dễ đọc, trừ khi phải xử lý hàng triệu chuỗi.

## [Writing Toy Software Is A Joy](https://blog.jsbarretto.com/post/software-is-joy)

Joshua Barretto khuyến khích lập trình viên viết "phần mềm đồ chơi" — những dự án nhỏ, tự làm từ đầu — để hiểu sâu cách mọi thứ vận hành và tìm lại niềm vui lập trình. Xuất phát từ câu nói của Richard Feynman "Những gì tôi không thể tạo ra, tôi không hiểu được", tác giả cho rằng tự tay xây dựng một phiên bản đơn giản của công cụ quen thuộc giúp bạn nắm được những ràng buộc cốt lõi của nó tốt hơn nhiều so với chỉ đọc lý thuyết. Nguyên tắc chủ đạo là quy tắc 80:20: bỏ ra 20% công sức để có 80% chức năng, chỉ cài đặt những gì thật sự cần và cứ để chương trình lỗi cho đến khi buộc phải xử lý trường hợp biên. Cách làm này giúp những phần mềm tưởng chừng phức tạp trở nên vừa sức.

Bài viết đưa ra 23 ý tưởng kèm mức độ khó (từ 3 đến 8 trên thang 10), thời gian ước tính và tài liệu tham khảo: dễ thì có bộ máy regex, trình giả lập CHIP-8, bảng băm, trình thông dịch; trung bình có physics engine, trình soạn thảo văn bản, voxel engine, mô phỏng quỹ đạo; khó nhất là nhân hệ điều hành x86 và trình biên dịch cho ngôn ngữ giống C. Tác giả đặc biệt khuyên không dùng các mô hình ngôn ngữ lớn (LLM) cho những dự án này, vì kiến thức không nên được "dọn sẵn lên đĩa": chính quá trình tự mày mò và vật lộn với vấn đề mới tạo ra giá trị học tập, trong bối cảnh phát triển phần mềm ngày càng bị hàng hóa hóa và phụ thuộc vào AI.

## [Field Notes From Shipping Real Code With Claude](https://diwank.space/field-notes-from-shipping-real-code-with-claude)

Diwank chia sẻ kinh nghiệm dùng Claude để viết mã nguồn chạy thật trong môi trường sản phẩm. Tác giả chia cách làm việc với AI thành ba chế độ: chế độ "sân chơi" cho dự án cuối tuần hay bản thử nghiệm, nơi Claude viết 80–90% mã nguồn với rất ít rào chắn; chế độ lập trình cặp cho dự án dưới khoảng 5.000 dòng; và quy mô sản phẩm/monorepo với người dùng thật, nơi mọi thứ phải được điều phối cẩn thận. Nền tảng của cả quy trình là file `CLAUDE.md`, đóng vai trò như "hiến pháp" của codebase: ghi lý do các quyết định kiến trúc, quy tắc viết mã, cách chạy kiểm thử, quy ước repo và những điều bị cấm. Bên cạnh đó là các "anchor comment" như `AIDEV-NOTE:` — ngắn gọn, dễ grep, vừa dẫn đường cho AI vừa làm tài liệu cho con người.

Quy tắc bất di bất dịch là con người viết kiểm thử, vì kiểm thử mã hóa yêu cầu nghiệp vụ và các trường hợp biên mà AI không nắm được; tác giả minh họa bằng một bộ kiểm thử do AI sinh ra vẫn chạy qua nhưng bỏ sót lỗi rò rỉ bộ nhớ. AI tuyệt đối không được sửa file kiểm thử, thay đổi hợp đồng API, đụng vào migration cơ sở dữ liệu, commit secrets hay tự suy đoán logic nghiệp vụ. Tác giả còn gợi ý dùng git worktree cho các thử nghiệm với AI, gắn nhãn `[AI]` cho commit có AI hỗ trợ, và ở cấp độ đội nhóm thì công khai minh bạch việc dùng AI, thống nhất quy tắc từ đầu, vì thực hành phát triển tốt chính là ranh giới giữa AI khuếch đại năng lực và AI gây hỗn loạn.

## [Why Generative AI Coding Tools and Agents Do Not Work For Me](https://blog.miguelgrinberg.com/post/why-generative-ai-coding-tools-and-agents-do-not-work-for-me)

Miguel Grinberg, tác giả Flask-SocketIO và nhiều thư viện Python quen thuộc, giải thích vì sao các công cụ và agent AI sinh mã nguồn không phù hợp với ông. Lập luận chính là chúng không giúp ông làm nhanh hơn: vì luôn là người chịu trách nhiệm cho mã nguồn mình đưa lên môi trường sản phẩm, dù có AI hay không, ông phải đọc và hiểu kỹ từng dòng trước khi commit. Việc review mã nguồn do AI viết mất ngang bằng, thậm chí lâu hơn tự viết, nên phần thời gian "tiết kiệm" được bị triệt tiêu ngay ở khâu kiểm tra bắt buộc này.

Grinberg cũng phản bác phép so sánh AI với thực tập sinh: thực tập sinh học hỏi và dần tự chủ theo thời gian, còn công cụ AI không có trí nhớ giữa các phiên, mỗi tác vụ mới lại quay về vạch xuất phát như một thực tập sinh mắc chứng mất trí nhớ. Ông coi việc tự học ngôn ngữ và framework mới là niềm vui và là khoản đầu tư cho nghề, không phải trở ngại cần giao cho AI. Với các đóng góp từ cộng đồng mã nguồn mở, dù cũng phải review kỹ, ông nhận lại được thứ AI không mang lại: tương tác thật giữa con người, phản hồi và những ý tưởng mới giúp dự án tốt hơn.

## [AI coding assistants aren't really making devs feel more productive](https://leaddev.com/velocity/ai-coding-assistants-arent-really-making-devs-feel-more-productive)

Chantal Kapani, phóng viên của LeadDev, phân tích số liệu từ báo cáo Engineering Leadership Report 2025 (khảo sát 617 lãnh đạo kỹ thuật vào tháng 3) và cho thấy trợ lý lập trình AI chưa thực sự giúp lập trình viên cảm thấy năng suất hơn. Chỉ 6% người được hỏi ghi nhận năng suất tăng đáng kể, 39% thấy cải thiện nhỏ trong khoảng 1–10%. AI chủ yếu được dùng để sinh mã nguồn (47%), tái cấu trúc mã (45%), viết tài liệu (44%), giao tiếp nội bộ (28%) và sửa lỗi (22%). Con số này trái ngược hẳn với những tuyên bố lạc quan như số liệu 88% người dùng thấy năng suất hơn của GitHub hay JPMorgan Chase báo hiệu suất tăng 10–20%.

Các chuyên gia được trích dẫn đưa ra một số lý do cho khoảng cách này: công cụ AI tập trung hẹp vào việc sinh mã nguồn mà bỏ qua những điểm nghẽn sâu hơn trong quy trình; nhiều công cụ được áp dụng theo sự hào hứng từ cấp trên thay vì được kiểm chứng từ dưới lên; độ trễ thật sự nằm ở thời gian chạy kiểm thử và chu kỳ triển khai chứ không phải thời gian gõ phím; và lập trình viên thường không được hỏi ý kiến khi triển khai. Kết luận chung là cần xác định đúng vấn đề thực tế của đội trước khi đưa AI vào giải quyết.

## [How to Vibe Code as a Senior Engineer](https://blog.alexmaccaw.com/how-to-vibe-code-as-a-senior-engineer)

Alex MacCaw chia sẻ cách "vibe coding" hiệu quả dưới góc nhìn kỹ sư senior: để các mô hình AI đảm nhận phần lớn việc viết mã nguồn, còn kỹ sư định hướng bằng prompt rõ ràng và giám sát kiến trúc. Theo tác giả, điều kiện tiên quyết là một bộ khung dự án (scaffold) vững chắc như ai-monorepo-scaffold với sẵn ví dụ về migration, route, schema để AI học theo; các quy tắc trong `.cursor/rules` buộc AI lập kế hoạch, giữ an toàn kiểu dữ liệu và kiểm thử, để nó cư xử như "một kỹ sư junior sạch sẽ, có trách nhiệm"; thêm mọi file liên quan (kể cả định nghĩa kiểu) vào ngữ cảnh; dùng Cursor vì phản hồi lint và kiểm tra kiểu gần như tức thì; và chọn mô hình hàng đầu như Claude Opus 4 hay Gemini 2.5 Pro ở chế độ "thinking", ưu tiên chất lượng hơn chi phí token.

Về cách viết prompt, MacCaw khuyên luôn yêu cầu AI đưa kế hoạch để duyệt trước khi viết mã, nói thật cụ thể về kết quả và vị trí file mong muốn, đưa ví dụ mẫu, đặt ràng buộc rõ ràng (chẳng hạn "tránh dùng `any`"), giữ phạm vi hẹp và chuyển sang prompt dài, mang tính trò chuyện khi bị kẹt. Tác giả cũng chỉ ra các điểm yếu của AI: không tự biết cần ngữ cảnh gì, hay dùng `any` thay cho kiểu TypeScript đúng, lao vào viết mã mà không xác nhận hướng đi, và thiếu con mắt thiết kế kiến trúc theo phong cách riêng của dự án. MacCaw gọi đây có thể là "hồi kết cuối cùng của lập trình do con người dẫn dắt" trước khi AI lấp nốt những khoảng trống còn lại.

## [SQL Noir - Interactive SQL Game](https://www.sqlnoir.com/blog/games-to-learn-sql)

Hristo Bogoev, người tạo ra SQL Noir, tổng hợp năm trò chơi giúp học SQL thông qua trải nghiệm tương tác thay vì giáo trình khô khan. Đứng đầu là chính SQL Noir, trò chơi thám tử nơi bạn phá án bằng các truy vấn SQL, gồm sáu vụ án khó dần, lược đồ cơ sở dữ liệu thực tế, phản hồi ngay lập tức, có phần miễn phí và gói trả phí. Tiếp theo là SQL Island, trò chơi sinh tồn trên hoang đảo phù hợp cho người mới bắt đầu dù giao diện hơi cũ; SQL Murder Mystery của Đại học Northwestern, một vụ án duy nhất nhưng rất tốt để luyện phép JOIN; SQL Police Department (SQLPD), nền tảng trả phí với nhiều vụ án, gợi ý có hướng dẫn và cốt truyện chất lượng.

Cuối cùng là SQLZoo, bộ bài tập tương tác đã hơn 20 năm tuổi, miễn phí và đi theo hệ thống từ cơ bản đến nâng cao như window function, dù không có yếu tố cốt truyện. Bài viết là một danh sách tham khảo hữu ích cho lập trình viên junior muốn luyện SQL theo cách thú vị: người mới có thể bắt đầu với SQL Island hoặc SQL Noir, rồi củng cố kiến thức nền với SQLZoo.

---

*Bài viết đã được viết lại bởi Claude Code với Opus 5.5 vào ngày 27/09/2026.*
