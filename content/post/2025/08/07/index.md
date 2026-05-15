---
title: "Newsletter #48"
date: 2025-08-07
tags: [ "AI-Assisted", "Software Development", "Programming", "Code Quality", "Documentation" ]
categories: [ "Newsletter" ]
---

*Mời bạn thưởng thức Newsletter #48.*

## [TODOs aren't for doing](https://sophiebits.com/2025/07/21/todos-arent-for-doing)

Sophie Alpert đưa ra một góc nhìn thú vị về comment TODO trong mã nguồn: chúng không chỉ đơn thuần là danh sách việc cần làm mà còn đóng vai trò như "một mảnh nhỏ trong tâm trí của tác giả" - giúp lưu giữ ngữ cảnh và suy nghĩ ban đầu khi viết mã.

Điểm mấu chốt của bài viết là phân biệt giữa TODO tốt và xấu. TODO xấu thường mang tính chất cấp bách và mơ hồ như "Viết phần còn lại của file này để launch tuần tới không bị sập", trong khi TODO tốt lại ghi chú những edge case hoặc ý tưởng cải tiến như "Nếu người dùng click ba lần vào nút này, click handler sẽ báo lỗi".

Giá trị thực sự của TODO comments nằm ở khả năng truyền tải hiểu biết và suy nghĩ của lập trình viên cho người đọc mã trong tương lai. Chúng có thể trả lời những câu hỏi kiểu như "Có phải tôi đang hiểu nhầm gì không, hay đoạn mã này thật sự nên được tái cấu trúc theo cách khác?" Thay vì xem TODO như gánh nặng phải hoàn thành, hãy coi chúng như công cụ documentation giúp bảo tồn kiến thức và ngữ cảnh trong dự án.

## [Automating Away Claude's Bad Habits with Hooks](https://writeaheadblogg.ing/posts/claude-hooks-auto-fix-trailing-whitespace/)

Một bài viết thực tế về cách sử dụng Claude Code hooks để tự động sửa lỗi trailing whitespace trong các file Ruby. Đây là một ví dụ tuyệt vời về cách tận dụng tính năng hooks để cải thiện chất lượng mã do AI tạo ra mà không cần can thiệp thủ công.

Cách triển khai khá đơn giản: cấu hình hook trong file `~/.claude/settings.json` để tự động chạy RuboCop với rule `Layout/TrailingWhitespace` sau mỗi lần Claude chỉnh sửa file Ruby. Hook sẽ chặn workflow của Claude và tự động dọn dẹp những khoảng trắng thừa mà AI thường để lại.

Điểm thông minh của giải pháp này là chỉ áp dụng cho các file Ruby cụ thể (`.rb`, `.rake`, `.gemspec`) để tránh làm hỏng các file khác. Tác giả cũng lưu ý rằng hooks có toàn quyền truy cập với quyền của user, nên cần xem xét kỹ về bảo mật khi sử dụng.

Đây là một approach rất hay để xử lý những "thói quen xấu" của AI trong quá trình tạo mã, và có thể mở rộng cho nhiều tác vụ khác như chạy linter, test, hay thậm chí chặn một số hành động nhất định. Một cách tiếp cận thông minh để tích hợp AI vào workflow phát triển mà vẫn duy trì được tiêu chuẩn chất lượng mã.

## [Docs for AI Agents](https://technicalwriting.dev/ai/agents/)

Bài viết này khám phá một khía cạnh mới trong technical writing: cách viết tài liệu dành riêng cho AI agents. Với sự phát triển mạnh mẽ của các công cụ AI hỗ trợ lập trình, việc tạo ra documentation giúp AI hiểu và tương tác hiệu quả với codebase đang trở thành nhu cầu thực tế.

Tác giả phân biệt rõ hai loại tài liệu: "internal eng docs" dành cho team phát triển và "agent docs" dành cho AI tools. Agent docs có thể được đặt ở nhiều mức độ khác nhau: project-level, subdirectory-level, và user-level, với mục tiêu cải thiện tính nhất quán trong output của AI và đảm bảo các phản hồi tuân theo quy ước riêng của dự án.

Các phương pháp triển khai đa dạng, từ việc tạo file `AGENTS.md` trong thư mục gốc dự án, đến việc nhúng hướng dẫn AI-specific dưới dạng comment, hoặc đồng bộ hóa giữa documentation nội bộ và agent docs. Bài viết cũng đề cập đến nhiều công cụ AI phổ biến như Claude Code, Gemini CLI, Cursor, và Windsurf.

Điều thú vị là tác giả khuyến khích thử nghiệm với các chiến lược documentation khác nhau, vì đây là lĩnh vực đang phát triển nhanh chóng. Đây là một góc nhìn tiên phong về cách technical writing cần thích ứng với thời đại AI, không chỉ viết cho con người mà còn phải tối ưu cho máy móc.

## [Developers Are Using These AI Agents to Build Software 10x Faster](https://dev.to/therealmrmumba/developers-are-using-these-ai-agents-to-build-software-10x-faster-efn)

Một bài tổng hợp chi tiết về 10 công cụ AI coding agents hàng đầu đang giúp các lập trình viên tăng tốc đáng kể quá trình phát triển phần mềm trong năm 2025. Bài viết không chỉ liệt kê danh sách mà còn phân tích cách từng công cụ góp phần vào việc tự động hóa workflow.

Danh sách các công cụ nổi bật bao gồm Cursor (trình soạn thảo AI-first), Claude Code CLI (công cụ dòng lệnh cho code reasoning), DeepDocs (tự động đồng bộ GitHub documentation), Continue.dev (khung làm việc AI IDE mã nguồn mở có thể tùy chỉnh), và Trae (trợ lý phát triển ứng dụng web full-stack). Ngoài ra còn có Gemini CLI của Google, Cody CLI từ Sourcegraph, OpenHands (self-hostable), Replit AI và CodeRabbit cho review pull request.

Điểm mạnh của bài viết là nhấn mạnh giá trị cốt lõi: AI agents xử lý những tác vụ lặp đi lặp lại như tạo boilerplate, viết test, fix bug và quản lý documentation, giúp lập trình viên tập trung vào creative problem-solving và công việc chiến lược hơn.

Tác giả kết luận rằng việc áp dụng AI coding agents đang trở thành yếu tố thiết yếu để duy trì tính cạnh tranh và năng suất trong ngành phát triển phần mềm. Đây là một resource hữu ích cho những ai muốn tìm hiểu và lựa chọn công cụ AI phù hợp cho workflow của mình.

## [What kind of work I want (in 2025)](https://www.seangoedecke.com/my-engineering-values-2025/)

Sean Goedecke chia sẻ một cái nhìn thẳng thắn về những giá trị và ưu tiên nghề nghiệp của anh trong năm 2025. Đây không chỉ là bài viết cá nhân mà còn là nguồn tham khảo hữu ích cho các lập trình viên đang định hình career path của mình.

Về môi trường làm việc, Sean ưu tiên remote hoàn toàn với những buổi offsites thỉnh thoảng, không muốn commute hàng ngày và trở thành "senior engineer với laptop". Anh thích làm việc trên những project "core" của công ty, thoải mái với môi trường áp lực trung bình/cao, và sẵn sàng làm việc với legacy systems để tạo ra những giải pháp "80%" một cách nhanh chóng.

Đặc biệt thú vị là những ranh giới đạo đức mà Sean đặt ra: tuyệt đối không làm việc với proof-of-work blockchain, cờ bạc trực tuyến, hoặc vũ khí tự động. Anh cũng ưu tiên các công ty công nghệ Mỹ với hệ thống lớn, nổi tiếng, và hiện tại rất quan tâm đến lĩnh vực AI.

So với năm 2021, Sean đã chuyển từ việc tập trung vào maintenance sang những dự án được lãnh đạo công ty quan tâm. Bài viết này là một ví dụ hay về việc thiết lập giá trị nghề nghiệp rõ ràng và duy trì những tiêu chuẩn đạo đức trong môi trường công nghệ thay đổi liên tục.

## [Welcoming The Next Generation of Programmers](https://lucumr.pocoo.org/2025/7/20/the-next-generation/)

Armin Ronacher, tác giả của Flask framework, đưa ra một góc nhìn tích cực và đầy tính nhân văn về thế hệ lập trình viên mới đang hình thành nhờ AI. Thay vì lo ngại AI sẽ thay thế lập trình viên, ông tin rằng AI đang mở rộng định nghĩa về "programmer" và mang nhiều người hơn vào lĩnh vực này.

Ông đưa ra định nghĩa đơn giản nhưng bao hàm: "Nếu bạn tạo ra một chương trình, dù bằng tay hay với sự hỗ trợ của agent, bạn là một lập trình viên." Điều này có nghĩa là những "vibe coders" - những người học lập trình thông qua AI - cũng đáng được chào đón vào cộng đồng.

Thách thức lớn nhất mà Ronacher nhận ra là nguy cơ các lập trình viên mới bị cô lập, chỉ tương tác với AI mà thiếu kết nối với cộng đồng lập trình viên thực sự. Họ có thể trở thành "con tin của các công ty xây dựng công cụ vibe-coding" nếu không có sự hướng dẫn và hỗ trợ từ cộng đồng.

Lời kêu gọi của ông rất rõ ràng: cộng đồng Python (và các cộng đồng lập trình khác) cần chủ động tiếp cận những lập trình viên mới này, tạo ra các "đường dẫn" cho những người học qua AI, và biến "tương tác đơn lẻ với AI thành hành trình chia sẻ với cộng đồng". Đây là một quan điểm rất đáng suy ngẫm về cách chúng ta có thể ôm ấp và nuôi dưỡng thế hệ lập trình viên tương lai.

## [Pattern-matching across different languages](https://blog.frankel.ch/pattern-matching-different-languages/)

Một bài so sánh kỹ lưỡng về cách triển khai pattern matching trong 5 ngôn ngữ lập trình phổ biến: Java, Scala, Kotlin, Python và Rust. Tác giả Nicolas Fränkel khám phá sự phát triển của pattern matching từ những khối `switch case` truyền thống đến khả năng khớp kiểu và điều kiện phức tạp hiện đại.

Điểm thú vị là Scala đã tiên phong trong việc cung cấp khả năng pattern matching tiên tiến, trong khi các ngôn ngữ khác mới bắt đầu áp dụng gần đây. Java đã giới thiệu type-based matching với cú pháp arrow trong các phiên bản gần đây, Kotlin có cách tiếp cận tương tự nhưng với một số biến thể cú pháp, Python bổ sung pattern matching từ phiên bản 3.10, còn Rust phức tạp hơn do các ràng buộc về quản lý bộ nhớ.

Bài viết sử dụng ví dụ cụ thể về việc khớp các kiểu hình học khác nhau để minh họa cách mỗi ngôn ngữ xử lý pattern matching. Đặc biệt, tác giả chỉ ra rằng Scala vượt trội với khả năng khớp thuộc tính (attribute matching) trong khi các ngôn ngữ khác chủ yếu tập trung vào khớp kiểu.

Kết luận quan trọng là pattern matching đang trở thành một tính năng thiết yếu trong phát triển phần mềm hiện đại, giúp viết mã dễ đọc và dễ bảo trì hơn. Mỗi ngôn ngữ đều mang đến cách tiếp cận và điểm mạnh riêng, phản ánh triết lý thiết kế và mục tiêu sử dụng của từng ngôn ngữ.

## [A real-world AI coding case sample](https://blog.korny.info/2025/07/18/a-real-world-ai-coding-case-sample)

Một case study thực tế chi tiết về việc sử dụng Claude để phát triển tính năng mới trong ứng dụng ASP.Net Core. Tác giả chia sẻ trải nghiệm cụ thể khi triển khai hệ thống gửi Kafka events mỗi khi có thay đổi trong mối quan hệ business-contact, mang đến góc nhìn thực tế về khả năng và hạn chế của AI coding.

Quy trình làm việc rất thú vị: tác giả cung cấp context về cấu trúc dự án cho Claude, sau đó hướng dẫn AI như một "junior developer", sửa chữa những lần thử đầu tiên, tinh chỉnh code implementation và thêm integration testing với Test Containers. Kỹ thuật sử dụng bao gồm Monadic Result/Option pattern và kiến trúc event-driven với Kafka.

Bài học quan trọng nhất là AI rất hữu ích nhưng cần sự hướng dẫn của con người. Tác giả mô tả Claude như một "junior developer nhanh nhẹn, nhiệt tình nhưng ngây thơ" - hiệu quả nhất khi được giao những tác vụ cụ thể, được định nghĩa rõ ràng, và luôn cần sự giám sát cũng như correction liên tục.

Điểm cân bằng của bài viết là tác giả không chỉ khen ngợi khả năng của AI mà còn nhấn mạnh những lo ngại về đạo đức và môi trường, bao gồm khả năng gây bất ổn công nghệ và kinh tế. Đây là một góc nhìn thực tế và cân bằng về việc áp dụng AI coding trong thực tế.

## [Clowns to the Left of Me...](https://blog.korny.info/2025/07/19/clowns-to-the-left-of-me)

Một bài viết sâu sắc về cuộc tranh luận phân cực xung quanh công cụ AI coding, trong đó tác giả đặt mình ở vị trí trung dung giữa hai thái cực: hype quá mức và hoài nghi cực đoan. Tiêu đề lấy cảm hứng từ bài hát "Stuck in the Middle With You" phản ánh đúng tâm trạng của những người cố gắng duy trì góc nhìn cân bằng.

Một bên là những người ủng hộ cuồng nhiệt với marketing thái quá và kỳ vọng không thực tế, tạo ra những dự án hoàn chỉnh mà không hiểu rõ kỹ thuật bên dưới. Bên kia là những người hoài nghi chỉ trích mọi nghiên cứu và tuyên bố về AI, thất vọng với những hạn chế của công cụ AI.

Tác giả khuyến khích một cách tiếp cận nuanced: AI coding tools rất mạnh mẽ nhưng cần được sử dụng một cách thận trọng và có hiểu biết. Không nên chấp nhận mù quáng cũng không nên từ chối hoàn toàn. Quan trọng nhất là kiểm tra cẩn thận mã AI tạo ra, hiểu rõ giới hạn của công cụ, và duy trì việc học hỏi liên tục.

Bài viết cũng đề cập đến những lo ngại rộng hơn về tác động môi trường của công nghệ AI, tính bền vững của phát triển AI hiện tại, và động cơ thực sự của các công ty công nghệ. Đây là lời nhắc nhở quan trọng rằng trong thời đại thông tin quá tải, việc duy trì tư duy phản biện và cân bằng là vô cùng quý giá.

## [Improving the prompt to the AI to get better code](https://blog.vanillajava.blog/2025/07/improving-prompt-to-ai-to-get-better.html)

Một bài hướng dẫn thực tế về cách tinh chỉnh prompts để có được mã nguồn tối ưu hơn từ AI. Tác giả từ Vanilla Java Blog chia sẻ kinh nghiệm cụ thể về việc cải thiện chất lượng code thông qua prompt engineering có hệ thống.

Kỹ thuật chính bao gồm việc cung cấp ràng buộc và yêu cầu cụ thể: tối thiểu hóa việc tạo đối tượng, sử dụng kỹ thuật low-latency, giảm trùng lặp mã, tận dụng ThreadLocal cho dữ liệu tạm thời, và ưu tiên các phép toán đơn giản thay vì thư viện phức tạp. Đặc biệt, tác giả khuyến khích đưa ra hướng dẫn rõ ràng về những gì nên làm và tránh.

Ví dụ prompt được tinh chỉnh của tác giả bao gồm: sử dụng ThreadLocal cho dữ liệu tạm thời, ưu tiên toán học đơn giản thay vì thư viện, chỉ định yêu cầu định dạng offset cụ thể, và khuyến nghị dùng `intern()` cho Strings. Khi test trên nhiều nền tảng AI (Gemini, Claude, Grok, GitHub Copilot), kết quả cho thấy prompt chi tiết luôn mang lại mã nguồn chất lượng cao hơn.

Điểm thú vị là không AI nào ban đầu gợi ý sử dụng byte[] cho lưu trữ, cho thấy tầm quan trọng của việc hướng dẫn cụ thể. Bài viết nhấn mạnh rằng prompt engineering chu đáo là chìa khóa để thu được giải pháp mã nguồn tối ưu từ AI, không chỉ đơn thuần yêu cầu "viết code tốt hơn".

---

*Bài viết đã được review và cập nhật bởi Claude Code với Opus 4.7 (1M context).*
