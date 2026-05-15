---
title: "Newsletter #46"
date: 2025-08-05
tags: [ "AI-Assisted", "Survey", "Tech Stack", "AI Tools", "Developer Tools" ]
categories: [ "Newsletter" ]
---

*~~Bài viết này sẽ quay lại dùng Claude Code nha :D (chân ái là đây, chỉ khi nào ngại tốn token mới phải nhảy sang agent khác).~~ Mời bạn thưởng thức Newsletter #46.*

## [The Pragmatic Engineer 2025 Survey: What's in your tech stack?](https://newsletter.pragmaticengineer.com/p/the-pragmatic-engineer-2025-survey)

The Pragmatic Engineer vừa công bố kết quả khảo sát năm 2025 với hơn 3.000 phản hồi từ các chuyên gia công nghệ, mang đến cái nhìn toàn diện về xu hướng công cụ và công nghệ hiện tại trong ngành.

Điểm nổi bật nhất của khảo sát là sự bùng nổ của các công cụ AI: 85% người tham gia đã sử dụng ít nhất một công cụ AI trong công việc. GitHub Copilot dẫn đầu danh sách, tiếp theo là Cursor (một sự bất ngờ với mức độ phổ biến cao), Claude và ChatGPT. Điều này cho thấy các lập trình viên không ngần ngại thử nghiệm các công cụ mới, đặc biệt trong lĩnh vực AI đang phát triển nhanh chóng.

Về ngôn ngữ lập trình, TypeScript, Python và Swift là những ngôn ngữ được sử dụng nhiều nhất, trong khi Ruby on Rails và Elixir nằm trong top "được yêu thích nhất". Đáng chú ý, JIRA tiếp tục là công cụ bị "ghét" nhất do tính phức tạp và chậm chạp, với Linear được đề cập như một lựa chọn thay thế tốt hơn.

Trong lĩnh vực cloud, AWS vẫn giữ vị trí dẫn đầu, theo sau là Azure và Google Cloud, với Vercel nổi lên như một nền tảng đầy tiềm năng. Git thống trị hoàn toàn trong quản lý phiên bản, với GitHub, GitLab và BitBucket đều có lượng người dùng đáng kể.

## [Algorithms for making interesting organic simulations](https://bleuje.com/physarum-explanation/)

Bài viết này giới thiệu một kỹ thuật tính toán thú vị để mô phỏng hành vi giống sinh vật thông qua thuật toán Physarum. Đây là phương pháp sử dụng các tác nhân (agents) di chuyển trong không gian 2D, để lại và theo dõi các vết tích, tạo ra những hình ảnh trực quan có vẻ ngoài hữu cơ và tự nhiên.

Cốt lõi của thuật toán khá đơn giản nhưng hiệu quả: mỗi tác nhân có vị trí và hướng di chuyển, sau đó thực hiện chu trình cảm nhận - xoay - di chuyển - để lại vết tích. Tác nhân "nhìn" về ba hướng (thẳng, trái và phải một chút), sau đó di chuyển theo hướng có cường độ vết tích cao nhất. Điều thú vị là tác giả đã thử nghiệm việc thay đổi các tham số động dựa trên giá trị bản đồ vết tích, tạo ra những hiệu ứng nghệ thuật độc đáo.

Ứng dụng này được tăng tốc bằng GPU, cho phép xử lý hàng triệu hạt cùng lúc và tạo ra những mô phỏng phức tạp từ những quy tắc đơn giản. Đây là một ví dụ tuyệt vời về cách các thuật toán đơn giản có thể tạo ra hành vi phức tạp và thẩm mỹ cao.

## [AI coding tools are shifting to a surprising place: The terminal](https://techcrunch.com/2025/07/15/ai-coding-tools-are-shifting-to-a-surprising-place-the-terminal/)

Một xu hướng thú vị đang diễn ra trong thế giới công cụ AI hỗ trợ lập trình: chúng đang dịch chuyển từ các trình soạn thảo mã sang giao diện dòng lệnh. Các "ông lớn" như Anthropic (Claude Code), DeepMind (Gemini CLI) và OpenAI (CLI Codex) đều đã tung ra các sản phẩm tập trung vào terminal thay vì chỉ hỗ trợ trong IDE truyền thống.

Lý do cho sự chuyển đổi này khá rõ ràng: giao diện terminal cung cấp sự linh hoạt hơn nhiều so với việc chỉ hỗ trợ viết mã. Các công cụ này có thể xử lý toàn bộ quy trình phát triển, từ thiết lập dự án, quản lý phụ thuộc, đến các tác vụ DevOps phức tạp. Thay vì chỉ gợi ý mã, chúng có thể giải quyết vấn đề theo từng bước một cách tự động.

Mike Merrill, đồng tác giả của Terminal-Bench (một benchmark dành cho công cụ AI terminal), đã đưa ra dự đoán táo bạo: "Chúng tôi tin rằng tương lai sẽ có 95% tương tác giữa LLM và máy tính thông qua giao diện giống terminal." Điều này có thể mở ra kỷ nguyên mới trong phát triển phần mềm, nơi AI không chỉ viết mã mà còn quản lý toàn bộ môi trường phát triển.

## [Distributed Systems Reliability Glossary](https://antithesis.com/resources/reliability_glossary/)

Antithesis vừa công bố một tài liệu tham khảo cực kỳ hữu ích cho các lập trình viên: Từ điển thuật ngữ về độ tin cậy hệ thống phân tán. Đây không chỉ là một bản danh sách khô khan các thuật ngữ, mà là một nguồn tài liệu toàn diện giúp các lập trình viên hiểu rõ hơn về việc kiểm thử và đảm bảo độ tin cậy của hệ thống phân tán.

Từ điển được tổ chức thành seis phần chính: khái niệm cơ bản, mô hình nhất quán, mô hình khả dụng, các hiện tượng bất thường, lỗi hệ thống và kỹ thuật kiểm thử. Điều đặc biệt là tài liệu này không chỉ đưa ra định nghĩa khô khan mà còn giải thích rõ ràng tại sao những khái niệm này lại quan trọng trong thực tế.

Một trong những điểm mạnh của từ điển là cách tiếp cận thực tế: tác giả thừa nhận rằng không cần phải nắm vững tất cả các khái niệm mới có thể bắt đầu kiểm thử hệ thống phân tán hiệu quả. Thay vào đó, tài liệu tập trung vào việc cung cấp hiểu biết trực quan về những thách thức cốt lõi: hệ thống phân tán vốn dĩ đồng thời và dễ gặp lỗi một phần, đòi hỏi các kỹ thuật kiểm thử tinh vi như fault injection và property-based testing.

## [Test-Driven Development (TDD) with dbt](https://xebia.com/blog/test-driven-development-tdd-with-dbt/)

Xebia mang đến góc nhìn thú vị về việc áp dụng phương pháp Test-Driven Development (TDD) vào dbt - một công cụ phổ biến trong lĩnh vực kỹ thuật dữ liệu (analytics engineering). Thay vì hy vọng các mô hình dbt hoạt động đúng, TDD khuyến khích viết test trước, sau đó mới xây dựng các phép biến đổi SQL để vượt qua những bài kiểm tra đó.

Từ dbt Core v1.8, việc triển khai TDD trở nên dễ dàng hơn nhiều với tính năng unit testing tích hợp sẵn. Quy trình làm việc tuân theo chu kỳ đỏ-xanh-tái cấu trúc quen thuộc: viết test với dữ liệu đầu vào và đầu ra cố định, xem test thất bại, viết đủ mã SQL để test pass, sau đó tái cấu trúc để cải thiện chất lượng mã.

Điểm mạnh của phương pháp này nằm ở việc đưa tính kỷ luật của phát triển phần mềm vào quy trình xử lý dữ liệu. Thay vì kiểm tra dữ liệu theo từng dòng như các schema test truyền thống (not_null, unique), TDD tập trung vào kiểm tra logic nghiệp vụ phức tạp như tính toán số liệu quan trọng hay xử lý chuỗi. Kết quả là các data pipeline đáng tin cậy hơn, dễ bảo trì và cho phép tái cấu trúc một cách tự tin - điều đặc biệt quan trọng trong những dự án có tính nghiệp vụ cao.

## [Rethinking OOP](https://max.xz.ax/blog/rethinking-oop/)

Bài viết này đặt ra câu hỏi thú vị về cách chúng ta dạy và học lập trình hướng đối tượng (OOP). Tác giả cho rằng phương pháp giảng dạy OOP hiện tại đang gây hại nhiều hơn là có ích, đặc biệt là việc ép học sinh tiếp thu các khái niệm trừu tượng ngay từ đầu mà không hiểu rõ lý do tại sao cần chúng.

Thay vì bắt đầu với các khái niệm phức tạp như class, inheritance hay design patterns, tác giả đề xuất một cách tiếp cận tự nhiên hơn: bắt đầu từ lập trình thủ tục đơn giản, sau đó từng bước giới thiệu các tính năng mới khi học sinh thực sự gặp phải những hạn chế và cần giải quyết chúng. Ví dụ, chỉ khi nào học sinh cảm thấy việc quản lý nhiều biến rời rạc trở nên khó khăn, họ mới thực sự hiểu giá trị của việc nhóm dữ liệu lại thành struct hay class.

Quan điểm này rất đáng suy ngẫm: "Các best practices trong lập trình không cần phải được học thuộc lòng từ sách giáo khoa; chúng có thể trở nên trực quan và rõ ràng thông qua việc tăng dần độ phức tạp của chương trình một cách hợp lý." Đây là một lời nhắc nhở rằng giáo dục lập trình nên tập trung vào việc xây dựng tư duy logic và khả năng giải quyết vấn đề, thay vì ép học sinh ghi nhớ các quy tắc mà họ chưa hiểu được bản chất.

## [How I Write Code That I Don't Hate Reading a Week Later](https://dev.to/resource_bunk_1077cab07da/how-i-write-code-that-i-dont-hate-reading-a-week-later-303b)

Một bài viết thực tế và hữu ích về cách viết mã dễ đọc - một kỹ năng quan trọng mà nhiều lập trình viên thường bỏ qua. Tác giả chia sẻ triết lý cốt lõi: "Viết mã như thể bạn sẽ phải debug nó lúc 2 giờ sáng, trong trạng thái buồn ngủ, với deadline cận kề."

Các nguyên tắc chính bao gồm: đặt tên biến và hàm mô tả rõ ràng (ví dụ `parsed_user_profile_data` thay vì chỉ `d`), viết comment giải thích "tại sao" thay vì "cái gì", ưu tiên tính dễ đọc hơn là "sự thông minh" của mã. Thay vì viết những dòng mã phức tạp để khoe kỹ thuật, hãy tách chúng thành nhiều dòng dễ hiểu hơn.

Điểm hay nhất là nguyên tắc viết hàm nhỏ và tập trung: mỗi hàm chỉ làm một việc cụ thể với tên mô tả rõ ràng như `handleLoginFormSubmission()`. Khi mã trở nên rối rắm, hãy dừng lại và tái cấu trúc thay vì cứ thêm độ phức tạp. Tác giả cũng giới thiệu các công cụ hỗ trợ như Prettier, Black cho Python, và thậm chí ChatGPT để giúp tái cấu trúc mã. Đây là những lời khuyên đơn giản nhưng cực kỳ thực tế cho bất kỳ lập trình viên nào muốn code của mình dễ bảo trì hơn.

## [7 Habits That Quietly Made Me A 10x Developer (No, Not ChatGPT)](https://dev.to/abubakersiddique771/7-habits-that-quietly-made-me-a-10x-developer-no-not-chatgpt-13c4)

Một bài viết thẳng thắn về những thói quen thực tế giúp nâng cao năng suất lập trình, không phải dựa vào AI mà là những cải tiến nhỏ tích lũy theo thời gian. Tác giả chia sẻ 7 thói quen đã giúp anh trở thành lập trình viên hiệu quả hơn.

Điểm nổi bật nhất là việc "viết mã để viết mã" - tạo ra các script, generator và công cụ scaffolding để tự động hóa những tác vụ lặp đi lặp lại. Thay vì giải quyết cùng một vấn đề nhiều lần, hãy đầu tư thời gian tạo công cụ để nhân rộng hiệu suất. Thói quen "thiết kế cho bản thân tương lai" cũng rất hay: viết documentation rõ ràng, commit message mô tả, và README.md trước khi bắt đầu dự án.

Các thói quen khác bao gồm: ghi chép có cấu trúc trước khi debug (ép bản thân suy nghĩ rõ ràng), xây dựng công cụ nhỏ cá nhân (CLI scripts, automation tools), timeboxing cho công việc phức tạp (khối 90 phút không bị gián đoạn), học workflow từ người khác chứ không chỉ copy code, và retrospective hàng tuần với 3 câu hỏi: gì đã tốt, gì đã làm chậm tiến độ, gì sẽ cải thiện tuần sau. Đây là những thói quen đơn giản nhưng có tác động lâu dài đến năng suất làm việc.

*Claude Code thật sự là chân ái :D Xử lý nhanh, tóm tắt gọn, càng ngày càng tốt. Thật tuyệt vời!*

---

*Bài viết đã được review và cập nhật bởi Claude Code với Opus 4.7 (1M context).*
