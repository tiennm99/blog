---
title: "Newsletter #67"
date: 2025-12-10
tags: ["AI-Assisted", "Build Systems", "Configuration Languages", "Agentic Coding", "AI Development", "Refactoring", "Software Engineering"]
categories: ["Newsletter"]
---

*~~Bài viết này mình đã thử cải thiện AGENTS.md lại. Kết quả mình tự đánh giá ở cuối bài nhé.~~ Mời bạn thưởng thức Newsletter #67.*

## [Build better software to build software better](https://slack.engineering/build-better-software-to-build-software-better/)

Đội kỹ thuật của Slack kể lại cách họ rút ngắn thời gian xây dựng (build) của Quip và Canvas từ 60 phút xuống còn khoảng 10–30 phút, với luận điểm chính: các nguyên tắc kỹ thuật phần mềm không chỉ áp dụng cho mã nguồn ứng dụng mà cho cả hệ thống build. Giống như tối ưu hiệu năng mã nguồn, tăng tốc build dựa trên hai kỹ thuật là bộ nhớ đệm (làm ít việc hơn) và song song hóa (chia tải). Bazel hỗ trợ sẵn cả hai: tự động tái sử dụng kết quả khi đầu vào không đổi và phân phối các bước build ra nhiều lõi CPU. Tuy vậy, công cụ tốt thôi là chưa đủ nếu đồ thị phụ thuộc bị rối.

Vấn đề cốt lõi là phần frontend phụ thuộc vào toàn bộ backend đã biên dịch, nên mỗi thay đổi mã Python đều làm mất bộ nhớ đệm và buộc frontend phải build lại, trung bình tốn khoảng 35 phút mỗi lần. Nhóm đã kiên nhẫn gỡ rối yêu cầu thực sự của từng bước, tách biệt backend với frontend, hạ tầng Python với TypeScript, tách hệ thống build khỏi mã nguồn ứng dụng, đồng thời chia nhỏ để mỗi gói (bundle) và tệp CSS được lưu đệm độc lập. Họ cũng sửa lỗi phân lớp: công cụ build frontend chỉ nên tập trung vào logic nghiệp vụ, còn việc điều phối và song song hóa hãy để Bazel đảm nhận. Kết quả là build nhanh hơn tới 6 lần: trường hợp tốt nhất 10 phút, trung bình khoảng 12 phút và xấu nhất 30 phút.

## ~~[Things I Don't Like in Configuration Languages](https://medv.io/blog/things-i-dont-like-in-configuration-languages/)~~

~~Anton Medvedev phân tích các vấn đề của nhiều ngôn ngữ configuration khác nhau và giải thích tại sao ông quyết định tạo ra ngôn ngữ MAML (Minimal And Markup Language) của riêng mình. Bài viết cung cấp cái nhìn sâu sắc về ưu và nhược điểm của từng ngôn ngữ configuration từ YAML, JSON đến các ngôn ngữ mới hơn.~~

~~**Điểm chính:**~~
~~- YAML có specification quá phức tạp và nhiều features không cần thiết~~
~~- JSON đã chiến thắng như một universal data-interchange format, nhưng có vài điểm nhỏ cần cải thiện~~
~~- TOML thiếu null value và cú pháp array of tables khó hiểu~~
~~- Nhiều ngôn ngữ như Pkl, CUE, Dhall thực chất là full programming languages, không chỉ là markup languages~~
~~- Tác giả tạo MAML dựa trên JSON với strict specification và tên gọi độc đáo~~
~~- MAML giữ tính readable của JSON nhưng thêm comments và multiline strings~~

## [Here's What's Next in Agentic Coding](https://seconds0.substack.com/p/heres-whats-next-in-agentic-coding/)

Bài viết dự đoán những hướng phát triển tiếp theo của lập trình với tác tử AI (agentic coding), xoay quanh một luận điểm: quản lý ngữ cảnh là yếu tố quyết định. Bộ khung điều khiển (harness) tốt phải đưa đúng thông tin cần thiết vào ngữ cảnh và loại bỏ phần gây nhiễu. Theo tác giả, chế độ lập kế hoạch (Plan Mode) sẽ tinh vi hơn nhiều, tỷ lệ công sức lập kế hoạch so với thực thi sẽ chuyển từ 20:80 thành 80:20 để AI có thể hoàn thành trọn một tính năng trong một lần chạy. Việc tìm kiếm trong kho mã sẽ kết hợp grep với embedding ngữ nghĩa, tài liệu tham khảo (như Context7 MCP) sẽ được truy xuất đúng lúc cần, còn quy tắc (rules) và kỹ năng (skills) chỉ được nạp theo điều kiện để không làm ô nhiễm ngữ cảnh.

Ở tầng điều phối nhiều tác tử, tác giả kỳ vọng các kỹ thuật như lấy mẫu Best of N, kết hợp mô hình đắt tiền để lập kế hoạch với mô hình rẻ hơn để thực thi, và dùng tác tử con (subagent) để chạy song song, cô lập ngữ cảnh, với một tác tử chính đứng ra điều phối giúp giảm tải cho người dùng. Chất lượng đầu ra sẽ được nâng lên nhờ cơ chế tự phê bình và tự đánh giá, bộ khung tự đề xuất cải thiện cấu hình, cùng hệ thống bộ nhớ lưu giữ thông tin về người dùng và kho mã vượt ra ngoài cửa sổ ngữ cảnh. Tác giả nhận định tốc độ thay đổi hiện nay là chưa từng có.

## [Why agents DO NOT write most of our code - a reality check](https://octomind.dev/blog/why-agents-do-not-write-most-of-our-code-a-reality-check/)

Dù chính họ xây dựng tác tử AI, đội ngũ Octomind cho biết phần lớn mã nguồn của công ty vẫn do con người viết. Sau nhiều tháng dùng Cursor, Claude Code và Windsurf, không ai thấy năng suất tăng đáng kể (từ 20% trở lên). Để kiểm chứng, hai kỹ sư dành một tuần xây dựng hoàn toàn bằng AI một tính năng: tạo bản sao kịch bản kiểm thử riêng cho từng nhánh. Ở lần thử đầu, dù đã viết yêu cầu chi tiết và cập nhật tệp quy tắc, tác tử vẫn vấp ở những việc cơ bản như quên sinh lại Prisma client sau khi đổi lược đồ cơ sở dữ liệu, tạo thành phần giao diện mà không gắn vào đâu, viết truy vấn kém hiệu quả, rồi vẫn tự tin báo đã xong. Kết quả là một PR 2.000 dòng cần xem xét và sửa gần như mọi chỗ. Lần thứ hai chia nhỏ công việc vẫn cho ra 1.200 dòng chỉ cho một phần, kèm lỗi xử lý giao dịch (transaction).

Theo tác giả, vấn đề nghiêm trọng nhất là lập trình viên mất dần mô hình tư duy về kho mã khi AI liên tục đẩy vào hàng nghìn dòng thay đổi, khiến mỗi lần phải tự xử lý một lỗi khó lại giống như vừa chuyển sang công ty mới. Vấn đề thứ hai là AI không biết giới hạn của mình và luôn tự tin làm được, trong khi một thực tập sinh còn biết nói "tôi chưa từng làm việc này". Dù vậy, AI vẫn hữu ích để động não, gỡ lỗi, gợi ý hoàn thành mã, viết kiểm thử đơn vị và tái cấu trúc đoạn mã nhỏ; các tác tử chuyên biệt trong phạm vi hẹp vẫn mang lại giá trị thực.

## [Clarifying the Rule of Three in Refactoring](https://blog.jbrains.ca/permalink/clarifying-the-rule-of-three-in-refactoring/)

J.B. Rainsberger làm rõ Quy tắc Ba lần (Rule of Three) trong tái cấu trúc mã nguồn — lời khuyên chỉ nên gộp phần trùng lặp thành một lớp trừu tượng dùng chung khi nó xuất hiện đến lần thứ ba — vốn là một nguyên tắc kinh nghiệm gây nhiều tranh cãi. Theo tác giả, quy tắc này chủ yếu dành cho những người mới ở mức khá (Advanced Beginner), giúp họ không loại bỏ trùng lặp một cách máy móc. Ông phân biệt hai bối cảnh: khi đang học thiết kế qua tái cấu trúc, việc mạnh tay loại bỏ trùng lặp rồi trải qua cảm giác hối tiếc chính là cách rèn luyện khả năng phán đoán; còn khi tập trung vào hiệu suất công việc, có thể trì hoãn để tránh phải làm lại nếu sau này thiết kế buộc phải đưa trùng lặp trở lại. Vì vậy, Quy tắc Ba lần là công cụ giảng dạy nhằm cân bằng giữa học và làm, không phải một định luật tuyệt đối.

Bản thân tác giả thích loại bỏ trùng lặp sớm vì ông sẵn sàng gộp ngược (inline) mã trở lại khi nhận ra quyết định trích xuất là sai, và coi đó là một phần tự nhiên của quá trình học. Loại bỏ trùng lặp còn giúp làm lộ ra những lớp trừu tượng hữu ích đang ẩn trong thiết kế. Lời khuyên dành cho lập trình viên là hãy tập thoải mái với việc hoàn tác một lần tái cấu trúc, và nếu áp dụng Quy tắc Ba lần thì nên dựa trên lý lẽ rõ ràng thay vì nỗi sợ mơ hồ.

### Bonus

**Images:**
![Top Strategies to Share Data Between Services](https://substackcdn.com/image/fetch/$s_!9vpY!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff5f41f86-4bf2-4b21-85aa-69659c039111_2250x2624.png)
![Scalability Patterns for Modern Distributed Systems](https://substackcdn.com/image/fetch/$s_!aRQC!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa760cf81-6245-4051-be41-f867616e0faf_2250x2862.png)

**Videos:**
[Design a Web Crawler: FAANG Interview Question](https://www.youtube.com/watch?v=6u25GckPhLU)

**Đánh giá:** *Process url tạm ổn, đã bớt dùng tiếng Anh nhưng lại có một chút... tiếng Trung :| Process phần bonus thì hơi lủng. Chủ yếu là do khi gửi url AI thì AI khó mà tìm ra được tiêu đề phù hợp, thậm chí còn ghi trật lất không liên quan nữa.*

---

*Bài viết đã được viết lại bởi Claude Code với Opus 5.5 vào ngày 27/09/2026.*
