---
title: "Newsletter #67"
date: 2025-12-10
tags: ["AI-Assisted", "Build Systems", "Configuration Languages", "Agentic Coding", "AI Development", "Refactoring", "Software Engineering"]
categories: ["Newsletter"]
---

*~~Bài viết này mình đã thử cải thiện AGENTS.md lại. Kết quả mình tự đánh giá ở cuối bài nhé.~~ Mời bạn thưởng thức Newsletter #67.*

## [Build better software to build software better](https://slack.engineering/build-better-software-to-build-software-better/)

Slack Engineering chia sẻ cách họ đã cải thiện thời gian build từ 60 phút xuống chỉ còn 10-30 phút bằng cách áp dụng các nguyên tắc kỹ thuật phần mềm vào hệ thống build. Bài viết phân tích cách sử dụng Bazel để tối ưu hóa quá trình build thông qua caching và parallelization, cùng với việc tách biệt các thành phần để tăng hiệu quả.

**Điểm chính:**
- Build performance tương tự như code performance - cần áp dụng caching (làm ít việc hơn) và parallelization (chia tải)
- Bazel tự động cache kết quả build khi inputs không thay đổi và phân phối build actions across nhiều CPU cores
- Vấn đề chính của Quip/Canvas build là sự couplings giữa backend và frontend, khiến mỗi thay đổi Python đều trigger frontend rebuild
- Tách biệt concerns đã giảm thời gian build từ 60 phút xuống 25 phút trong trường hợp frontend đã được cache
- Thiết kế layering đúng cách - builder chỉ nên focus vào business logic, không nên tự implement parallelization
- Kết quả cuối cùng: build nhanh hơn 6 lần, với best case chỉ 10 phút khi cached và parallelized

## [Things I Don't Like in Configuration Languages](https://medv.io/blog/things-i-dont-like-in-configuration-languages/)

Anton Medvedev phân tích các vấn đề của nhiều ngôn ngữ configuration khác nhau và giải thích tại sao ông quyết định tạo ra ngôn ngữ MAML (Minimal And Markup Language) của riêng mình. Bài viết cung cấp cái nhìn sâu sắc về ưu và nhược điểm của từng ngôn ngữ configuration từ YAML, JSON đến các ngôn ngữ mới hơn.

**Điểm chính:**
- YAML có specification quá phức tạp và nhiều features không cần thiết
- JSON đã chiến thắng như một universal data-interchange format, nhưng có vài điểm nhỏ cần cải thiện
- TOML thiếu null value và cú pháp array of tables khó hiểu
- Nhiều ngôn ngữ như Pkl, CUE, Dhall thực chất là full programming languages, không chỉ là markup languages
- Tác giả tạo MAML dựa trên JSON với strict specification và tên gọi độc đáo
- MAML giữ tính readable của JSON nhưng thêm comments và multiline strings

## [Here's What's Next in Agentic Coding](https://seconds0.substack.com/p/heres-whats-next-in-agentic-coding/)

Bài viết phân tích tương lai của agentic coding và các hướng phát triển sắp tới. Tác giả nhấn mạnh rằng context management là yếu tố quan trọng nhất và sẽ là trọng tâm của các cải tiến trong tương lai. Bài viết cung cấp cái nhìn toàn diện về các tính năng sắp có trong các công cụ coding AI.

**Điểm chính:**
- Plan Mode sẽ trở nên tinh vi hơn, với tỷ lệ plan:execute thay đổi từ 20:80 thành 80:20
- Search sẽ kết hợp cả grep và embeddings để tăng hiệu quả tìm kiếm trong codebase
- Docs by Default sẽ trở thành tiêu chuẩn - tự động truy xuất documentation khi cần
- Rules và Skills sẽ được điều kiện hóa để tránh làm ô nhiễm context
- Multiagent orchestration với Best of N sampling và Mix of Models sẽ trở nên phổ biến
- Subagents sẽ được sử dụng nhiều hơn cho parallelization, context isolation và prompt customization
- Critic & Self Review sẽ trở thành tính năng mặc định để cải thiện chất lượng
- Memory sẽ được tích hợp để lưu trữ thông tin về user, codebase và lịch sử tương tác

## [Why agents DO NOT write most of our code - a reality check](https://octomind.dev/blog/why-agents-do-not-write-most-of-our-code-a-reality-check/)

Octomind chia sẻ thực tế về việc sử dụng AI agents trong development. Dù xây dựng AI agents, họ vẫn viết phần lớn code bằng tay. Bài viết mô tả thử nghiệm xây dựng feature hoàn toàn bằng AI và các vấn đề gặp phải, cung cấp cái nhìn thực tế về khả năng hiện tại của coding agents.

**Điểm chính:**
- Thử nghiệm với Cursor, Claude Code và Windsurf không tăng productivity đáng kể (20%+)
- AI tạo ra 2,000-line PR với nhiều lỗi cơ bản mà developer không mắc phải
- Vấn đề lớn nhất: mất mental model của codebase khi AI generate code
- AI không có khả năng self-reflection - không nhận biết giới hạn của bản thân
- AI vẫn hữu ích cho các tasks nhỏ: tab completions, unit tests, refactoring
- AI tốt khi recreating well-known patterns nhưng kém với features phức tạp
- Specialized agents trong well-defined boundaries có thể deliver value

## [Clarifying the Rule of Three in Refactoring](https://blog.thecodewhisperer.com/permalink/clarifying-the-rule-of-three-in-refactoring)

Bài viết giải thích rõ về Rule of Three trong refactoring - một heuristic gây nhiều tranh cãi. Tác giả phân tích mục đích thực sự của quy tắc này và đưa ra góc nhìn linh hoạt hơn về việc khi nào nên remove duplication. Bài viết giúp developer hiểu rõ hơn về trade-offs giữa việc extract abstractions sớm hay muộn.

**Điểm chính:**
- Rule of Three thực chất là để ngăn Advanced Beginners remove duplication một cách mù quáng
- Khi đang học về design qua refactoring, việc remove duplication aggressively giúp phát triển design judgment
- Khi đã thành thạo, có thể delay removing duplication để tránh rework sau này
- Tác giả không ngại inlining khi后悔 về quyết định extract - đây là phần của quá trình học
- Removing duplication giúp tìm ra các abstractions hữu ích có thể ẩn trong design
- Nếu thoải mái với inlining, không cần quá lo lắng về việc có后悔 khi extract

### Bonus

**Images:**
![Top Strategies to Share Data Between Services](https://substackcdn.com/image/fetch/$s_!9vpY!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff5f41f86-4bf2-4b21-85aa-69659c039111_2250x2624.png)
![Scalability Patterns for Modern Distributed Systems](https://substackcdn.com/image/fetch/$s_!aRQC!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa760cf81-6245-4051-be41-f867616e0faf_2250x2862.png)

**Videos:**
[Design a Web Crawler: FAANG Interview Question](https://www.youtube.com/watch?v=6u25GckPhLU)

**Đánh giá:** *Process url tạm ổn, đã bớt dùng tiếng Anh nhưng lại có một chút... tiếng Trung :| Process phần bonus thì hơi lủng. Chủ yếu là do khi gửi url AI thì AI khó mà tìm ra được tiêu đề phù hợp, thậm chí còn ghi trật lất không liên quan nữa.*

---

*Bài viết đã được review và cập nhật bởi Claude Code với Opus 4.7 (1M context).*
