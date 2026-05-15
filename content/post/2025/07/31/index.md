---
title: "Newsletter #41"
date: 2025-07-31
tags: ["AI-Assisted", "Performance", "Algorithms", "Programming", "SQL"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #41.*

## [The Fastest Way to Detect a Vowel in a String](https://austinhenley.com/blog/vowels.html)

Austin Henley đã thực hiện một nghiên cứu thú vị về hiệu suất các phương pháp phát hiện nguyên âm trong chuỗi, so sánh 11 cách tiếp cận khác nhau và đưa ra những kết quả bất ngờ về tối ưu hóa hiệu suất thuật toán cơ bản.

Nghiên cứu này bao gồm các phương pháp từ đơn giản như vòng lặp for, tìm kiếm regex, giao nhau tập hợp, biểu thức generator, đến những cách tiếp cận sáng tạo như sử dụng số nguyên tố. Kết quả đo lường cho thấy regex bất ngờ vượt trội về hiệu suất nhờ việc triển khai được tối ưu hóa trong C, sử dụng bitmap lookup để khớp ký tự. Điều thú vị là với chuỗi ngắn (độ dài 10), phương pháp `loop_in` đơn giản nhất lại nhanh nhất, nhưng với chuỗi dài hơn thì các phương pháp regex lại thống trị.

Bài viết cũng tiết lộ một số insight quan trọng: việc thay đổi thứ tự vòng lặp có thể cải thiện hiệu suất đáng kể, và tác giả đã tìm ra phương pháp `loop_in_perm` đơn giản nhưng nhanh hơn cả regex. Kết luận thực tế là đối với hầu hết trường hợp sử dụng, nên chọn phương pháp dễ đọc nhất, vì sự khác biệt về hiệu suất chỉ quan trọng khi xử lý khối lượng chuỗi khổng lồ. Nghiên cứu này minh họa rõ ràng rằng ngay cả những tác vụ tưởng chừng đơn giản cũng có thể có đặc tính hiệu suất phức tạp và bất ngờ.

## [Writing Toy Software Is A Joy](https://blog.jsbarretto.com/post/software-is-joy)

Joshua Barretto khuyến khích các lập trình viên tạo ra "chương trình đồ chơi" để tái khám phá niềm vui trong phát triển phần mềm và hiểu sâu sắc các khái niệm kỹ thuật thông qua việc tự tay xây dựng mọi thứ từ đầu.

Triết lý cốt lõi được truyền cảm hứng từ câu nói của Richard Feynman: "Những gì tôi không thể tạo ra, tôi không hiểu được". Tác giả cho rằng việc xây dựng phiên bản riêng của các công cụ và hệ thống giúp hiểu chúng một cách chân thực nhất. Các dự án đồ chơi tuân theo quy tắc 80:20 - nỗ lực tối thiểu để có được chức năng tối đa, tránh thiết kế quá phức tạp và mang lại những insight bất ngờ có thể áp dụng vào công việc chuyên nghiệp.

Barretto đề xuất hơn 20 ý tưởng dự án từ đơn giản đến phức tạp: CHIP-8 Emulator, Physics Engine, Text Editor, Voxel Engine, cho đến x86 OS Kernel và Compiler cho ngôn ngữ giống C. Điều quan trọng là tác giả khuyến khích không sử dụng các mô hình ngôn ngữ lớn (LLM) cho những dự án này, mà thay vào đó hãy học qua khám phá trực tiếp và vật lộn với vấn đề.

Bài viết lập luận rằng phát triển phần mềm hiện đại đang trở nên hàng hóa hóa, và các dự án đồ chơi là cách để kết nối lại với bản chất sáng tạo của lập trình. Đây là lời kêu gọi quay trở lại với niềm đam mê thuần túy của việc xây dựng thứ gì đó từ con số không, nơi mà quá trình khám phá có giá trị hơn cả việc tìm ra giải pháp nhanh chóng.

## [Field Notes From Shipping Real Code With Claude](https://diwank.space/field-notes-from-shipping-real-code-with-claude)

Diwank chia sẻ kinh nghiệm thực tế về việc sử dụng Claude trong phát triển phần mềm sản xuất, đưa ra những nguyên tắc và thực hành cụ thể để tận dụng AI một cách hiệu quả và an toàn trong môi trường doanh nghiệp.

Tác giả định nghĩa ba chế độ làm việc với AI: Playground Mode cho thử nghiệm ít rủi ro, Pair Programming Mode để cộng tác có cấu trúc, và Production/Monorepo Scale cho tích hợp được kiểm soát cẩn thận. Các thực hành quan trọng bao gồm tạo file `CLAUDE.md` như hướng dẫn toàn diện cho AI, sử dụng "anchor comments" để cung cấp ngữ cảnh và ngăn chặn lỗi AI, đồng thời quy định rằng con người phải luôn viết test.

Nguyên tắc cốt lõi là "Con người đưa ra hướng, AI cung cấp đòn bẩy" - AI là công cụ để tăng cường khả năng con người chứ không phải thay thế chuyên môn. Tác giả nhấn mạnh việc cung cấp prompt phong phú có ngữ cảnh, sử dụng phiên Claude mới cho từng tác vụ riêng biệt, và gắn tag commit được hỗ trợ bởi AI để minh bạch.

Điều tuyệt đối cấm là AI không được chạm vào: file test, di chuyển cơ sở dữ liệu, mã quan trọng về bảo mật, hợp đồng API, và cấu hình cùng secrets. Về mặt văn hóa, Diwank khuyến nghị chuẩn hóa việc tiết lộ sự hỗ trợ của AI, tạo quy trình onboarding dạy sử dụng AI có trách nhiệm, đo lường và theo dõi cải thiện năng suất, đồng thời tập trung duy trì tiêu chuẩn kỹ thuật cao. Mục tiêu cuối cùng là khuếch đại khả năng con người thông qua sự cộng tác AI cẩn thận và có chủ đích.

## [Why Generative AI Coding Tools and Agents Do Not Work For Me](https://blog.miguelgrinberg.com/post/why-generative-ai-coding-tools-and-agents-do-not-work-for-me)

Miguel Grinberg, tác giả của Flask-SocketIO và nhiều thư viện Python nổi tiếng, chia sẻ quan điểm phản biện về các công cụ AI tạo mã, lập luận rằng chúng không thực sự cải thiện năng suất và có thể gây ra rủi ro trong phát triển phần mềm.

Tác giả bác bỏ tuyên bố rằng AI làm cho việc lập trình nhanh hơn, cho rằng việc xem xét mã do AI tạo ra mất nhiều thời gian (thậm chí nhiều hơn) so với việc viết mã từ đầu. Ông nhấn mạnh rằng "đánh giá mã thực sự khó hơn hầu hết mọi người nghĩ" và khẳng định trách nhiệm cá nhân đối với mã, bất kể nguồn gốc của nó. Grinberg từ chối sử dụng mã mà không hiểu kỹ và có thể chỉnh sửa được, coi việc chấp nhận mù quáng mã AI là "cực kỳ vô trách nhiệm".

Về mặt học tập, tác giả tận hưởng việc học công nghệ và ngôn ngữ lập trình mới một cách cá nhân, bác bỏ quan niệm rằng AI có thể thay thế hiệu quả quá trình học tập. Ông chỉ trích việc so sánh AI với "thực tập sinh", lưu ý rằng thực tập sinh thực sự học hỏi và cải thiện, trong khi các công cụ AI "reset về điểm xuất phát" cho mỗi tác vụ mới, thiếu khả năng tích lũy kiến thức thực sự.

Từ góc độ cộng tác, Grinberg đánh giá cao sự hợp tác con người trong các dự án mã nguồn mở, trân trọng những tương tác tạo ra ý tưởng mới chứ không chỉ đơn thuần là tạo mã. Luận điểm cốt lõi của ông là các công cụ AI tạo mã hiện tại không cung cấp cải thiện năng suất có ý nghĩa và có thể gây rủi ro bằng cách tạo ra mã cần được xem xét thủ công kỹ lưỡng.

## [AI coding assistants aren't really making devs feel more productive](https://leaddev.com/velocity/ai-coding-assistants-arent-really-making-devs-feel-more-productive)

Chantal Kapani từ LeadDev đưa ra nghiên cứu thực tế thách thức những tuyên bố phổ biến về tác động tích cực của AI lên năng suất lập trình viên, tiết lộ rằng chỉ có 6% lãnh đạo kỹ thuật quan sát thấy sự cải thiện năng suất đáng kể từ các trợ lý AI lập trình.

Mặc dù các tiêu đề báo chí liên tục khẳng định AI cải thiện năng suất lập trình viên, nghiên cứu này cho thấy tác động thực tế của các trợ lý AI lập trình lên quy trình làm việc của nhà phát triển ít đáng kể hơn nhiều so với những tuyên bố thông thường. Điều này đặt ra câu hỏi quan trọng về khoảng cách giữa kỳ vọng và thực tế trong việc áp dụng công nghệ AI vào phát triển phần mềm.

Bài viết thách thức tuyên truyền phổ biến về tác động biến đổi của AI đối với quy trình phát triển phần mềm, gợi ý rằng có thể cần phải đánh giá lại cách chúng ta đo lường và hiểu về lợi ích thực sự của các công cụ AI trong môi trường làm việc thực tế. Đây là góc nhìn quan trọng để cân bằng giữa sự hứng thú về công nghệ mới và đánh giá thực tế về hiệu quả của nó trong thực tiễn.

## [How to Vibe Code as a Senior Engineer](https://blog.alexmaccaw.com/how-to-vibe-code-as-a-senior-engineer)

Alex MacCaw giới thiệu khái niệm "Vibe Coding" - một phương pháp phát triển phần mềm mới sử dụng các mô hình AI để thực hiện phần lớn công việc lập trình, với kỹ sư senior đóng vai trò hướng dẫn thông qua prompt rõ ràng và giám sát kiến trúc.

Phương pháp này có thể giảm đáng kể thời gian phát triển, từ việc hoàn thành một tính năng trong một giờ đến xây dựng toàn bộ ứng dụng SaaS trong 10 ngày. Các yêu cầu thiết yếu bao gồm sử dụng scaffold dự án mạnh mẽ với quy ước rõ ràng, thiết lập quy tắc lập trình nghiêm ngặt, cung cấp ngữ cảnh toàn diện cho các mô hình AI, sử dụng các mô hình AI hàng đầu như Claude Opus 4 hoặc Gemini 2.5 Pro, và tận dụng trình soạn thảo mã thông minh như Cursor.

MacCaw nhấn mạnh các chiến lược prompting hiệu quả: luôn bắt đầu với kế hoạch chi tiết, cực kỳ cụ thể về đầu ra mong muốn, cung cấp ngữ cảnh và ví dụ, sử dụng ràng buộc rõ ràng, duy trì phạm vi dự án chặt chẽ, và sử dụng prompt dài và mô tả hơn. Tác giả cũng thừa nhận những hạn chế của AI: quản lý ngữ cảnh tự động kém, xử lý yếu các kiểu TypeScript, thiếu khiếu thẩm mỹ thiết kế kiến trúc, và cần sự hướng dẫn của con người cho việc lập kế hoạch và thực hiện.

Những điểm mấu chốt bao gồm thiết lập scaffolding mạnh mẽ và ngữ cảnh type-safe, mã hóa các quy ước dự án, sử dụng các mô hình AI hàng đầu, liên tục lint, typecheck và test. MacCaw coi đây có thể là "lần cuối cùng" của việc lập trình dưới sự dẫn dắt của con người trước khi AI trở nên hoàn toàn tự chủ.

## [SQL Noir - Interactive SQL Game](https://www.sqlnoir.com/blog/games-to-learn-sql)

Hristo Bogoev tạo ra SQL Noir, một trò chơi giáo dục web sáng tạo giúp người dùng học SQL thông qua trải nghiệm thám tử hấp dẫn, biến việc học cơ sở dữ liệu từ định dạng tutorial truyền thống thành trải nghiệm giải quyết vấn đề tương tác và thú vị.

Trò chơi này có gameplay tương tác nơi người dùng giải quyết tội phạm và bí ẩn bằng cách sử dụng các truy vấn SQL, chạy hoàn toàn trên trình duyệt web và được phân loại là trò chơi giáo dục. SQL Noir tập trung vào việc làm cho việc học SQL trở nên hấp dẫn và thú vị hơn thông qua phương pháp tiếp cận dựa trên câu chuyện.

Mục tiêu của trò chơi là biến đổi việc học SQL từ định dạng tutorial truyền thống thành trải nghiệm nhập vai, giải quyết vấn đề giúp làm cho các kỹ năng cơ sở dữ liệu dễ tiếp cận và thú vị hơn. Đây là một ví dụ xuất sắc của gamification trong giáo dục công nghệ, cho thấy cách các khái niệm kỹ thuật phức tạp có thể được truyền đạt thông qua trải nghiệm học tập tương tác và giải trí.

---

*Bài viết đã được review và cập nhật bởi Claude Code với Opus 4.7 (1M context).*
