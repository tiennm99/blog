---
title: "Newsletter #10"
date: 2025-04-05
tags: ["AI-Assisted", "Newsletter", "Engineering Culture", "Git", "Java", "Code Review", "Algorithms"]
categories: [ "Newsletter" ]
---

*Mời bạn thưởng thức Newsletter \#10.*

## [Gaining Years of Experience in a Few Months](https://marcgg.com/blog/2025/02/11/high-growth/)

Marc G. Gauthier, cựu Phó chủ tịch phụ trách kỹ thuật của Drivy, viết bài này như phần tiếp nối cho câu hỏi về tốc độ học hỏi trong sự nghiệp: có những giai đoạn ngắn mà ta học được nhiều hơn hẳn bình thường, cảm giác như tích lũy nhiều năm kinh nghiệm chỉ trong vài tháng. Với tác giả, đó là lúc Drivy được Getaround mua lại năm 2019, khi ông phải cùng lúc xử lý các bài toán về kỹ thuật, kiến trúc, giao tiếp, quản lý, kinh doanh và sản phẩm dưới áp lực lớn cùng hạn chót gấp. Ông phân biệt trải nghiệm này với việc đơn thuần "bước ra khỏi vùng an toàn", vì nó vượt quá năng lực hiện tại, rủi ro thất bại cao hơn và không thể duy trì lâu dài.

Để minh họa, tác giả chia công việc thành bốn vùng: vùng thoải mái (an toàn nhưng dễ tụt hậu về lâu dài), vùng học tập (thử thách vừa sức, nơi nên ở trong phần lớn sự nghiệp), vùng tăng trưởng nhanh (một năm bằng nhiều năm, nhưng không bền vững và không phải ai cũng có cơ hội), và vùng kiệt sức nếu ở lại vùng tăng trưởng quá lâu. Ông gợi ý vài cách luân chuyển hợp lý giữa các vùng, chẳng hạn xen kẽ học tập với tăng trưởng, hoặc dùng vùng thoải mái để hồi sức sau một giai đoạn căng thẳng rồi quay lại học tập, miễn là đừng ở vùng thoải mái quá lâu. Lời khuyên chốt lại: khi gặp cơ hội đưa bạn vào vùng tăng trưởng nhanh, hãy tập trung tận dụng, nhưng luôn để ý sức khỏe, vì mọi lợi ích đều vô nghĩa nếu bạn kiệt sức.

## [Writing Better Commit Messages](https://refactoringenglish.com/chapters/commit-messages/)

Michael Lynch, trong một chương của cuốn sách Refactoring English, cho rằng commit message thường bị xem nhẹ, dẫn đến những dòng vô nghĩa kiểu "Fix bug" hay "Update UI". Theo tác giả, người đọc quan trọng nhất của commit message là người đánh giá mã nguồn, sau đó mới đến đồng đội, khách hàng sử dụng thư viện, những người điều tra lỗi trong tương lai và các công cụ tự động như trình tạo ghi chú phát hành. Vì vậy, hãy đặt thông tin quan trọng nhất lên đầu theo cấu trúc "kim tự tháp ngược" của nghề báo, và dùng tiêu đề mục để chia nhỏ những commit message dài.

Dòng đầu tiên là phần quan trọng nhất vì nó hiện ra trong `git log --oneline` và lịch sử thay đổi trên GitHub; nó nên mô tả tác động của thay đổi (ví dụ "ngăn hỏng cơ sở dữ liệu khi nhiều người đăng ký cùng lúc") thay vì cách triển khai. Phần thân nên giải thích thay đổi ảnh hưởng thế nào tới người dùng, và quan trọng hơn cả là động cơ: vì sao cần thay đổi và những ràng buộc nào dẫn đến giải pháp này. Tùy trường hợp, có thể bổ sung thông tin về thay đổi phá vỡ tương thích, liên kết tham khảo không hiển nhiên, lý do thêm thư viện phụ thuộc mới, tham chiếu tới issue, hướng dẫn và giới hạn của việc kiểm thử, các phương án đã cân nhắc. Ngược lại, nên bỏ những gì đã rõ ràng trong mã nguồn, các thảo luận ngắn hạn và đường dẫn bản xem trước; còn những chi tiết thiết yếu để bảo trì thì phải nằm ngay trong mã nguồn.

## [The Rotation Program That Keeps This Startup's Engineers Learning — and Not Leaving](https://review.firstround.com/the-rotation-program-that-keeps-this-startups-engineers-learning-and-not-leaving/)

Bài phỏng vấn của First Round Review với Krista Moroder, Phó chủ tịch phụ trách kỹ thuật tại Checkr, kể về chương trình luân chuyển đã giúp giữ tỷ lệ nghỉ việc trong tổ chức của bà gần như bằng 0. Từng là giáo viên, Moroder mang theo một bài học từ phòng giáo viên: dán nhãn cạnh tên những học sinh có thầy cô đồng hành để phát hiện em nào đang bị bỏ sót. Bà tái hiện ý tưởng này bằng một bảng tính theo dõi từng kỹ sư, vì theo bà, kỹ sư rời đi sau hai, ba năm thường không chỉ vì cổ phần mà vì chán khi ngừng học hỏi, và nỗi sợ tụt hậu trước làn sóng AI càng làm điều đó rõ hơn.

Chương trình gồm ba bước: lập bảng "nhãn dán" với ba cột (tham gia luân chuyển hoặc nhóm đặc nhiệm liên phòng ban, từng làm ở nhiều nhóm, được đào tạo cho vai trò mới) với mục tiêu mỗi kỹ sư có ít nhất một ô được đánh dấu trước năm thứ ba; đối chiếu bảng với các ưu tiên hằng quý để điều người sang nơi cần; và trao đổi kỹ trước khi chuyển hẳn. Khoảng một nửa số lượt luân chuyển kết thúc bằng việc ở lại nhóm mới, và một nhóm đặc nhiệm về AI đã trở thành nhóm chính thức. Để thuyết phục các quản lý chịu nhường người giỏi nhất, bà lập luận rằng không thể thiếu ai đó là dấu hiệu của vấn đề kế nhiệm, và cả tổ chức cần cùng đạt điểm A. Kết quả: khoảng 60% kỹ sư từ cấp staff trở lên đã gắn bó từ sáu năm trở lên.

## [Judge Your Coworkers](https://blog.staysaasy.com/p/judge-your-coworkers)

Bài viết của Stay SaaSy cảnh báo về trạng thái mà tác giả gọi là "tầm thường được bảo đảm lẫn nhau" (Mutually Assured Mediocrity): mọi người đều ở mức trung bình nên ngầm thỏa thuận không phê bình nhau vì sợ bị lộ điểm yếu của chính họ. Tác giả mô tả quá trình này diễn ra dần dần khi công ty lớn lên: các bộ phận mới xuất hiện, câu "bạn không hiểu công việc của chúng tôi, hãy lo phần của bạn" trở thành lá chắn, lãnh đạo né phán xét người khác để khỏi bị phán xét, và cuối cùng chính người dám nói thật lại bị trừng phạt.

Để tránh điều đó, tác giả đề xuất khuyến khích nhân viên đánh giá đồng nghiệp một cách lành mạnh, với ba nguyên tắc: không phán xét đồng nghiệp công khai mà chỉ chia sẻ riêng với quản lý trực tiếp hoặc trong phần đánh giá chéo; việc xử lý hiệu suất luôn diễn ra kín đáo; và không ai được hứa có đồng nghiệp hoàn hảo. Người quản lý nên nói rõ từ đầu kỳ vọng nhân viên có quan điểm về hiệu suất của đồng nghiệp, rồi định kỳ 6–12 tháng hỏi lại. Khi họ khen ai đó, đây là dịp dạy thế nào là làm tốt và sự khác biệt giữa các cấp bậc; khi họ chê, đây là dịp phát hiện sớm vấn đề hiệu suất hoặc hiểu lầm về vai trò, chẳng hạn quản lý sản phẩm không phải là quản lý dự án. Thông điệp cuối: không quy trách nhiệm là một trong những điều tệ nhất công ty có thể làm với nhân viên, và ngành phần mềm đã đẩy văn hóa "không đổ lỗi" đi quá xa.

## [My LLM Codegen Workflow ATM](https://harper.blog/2025/02/16/my-llm-codegen-workflow-atm/)

Harper Reed chia sẻ quy trình hiện tại khi dùng LLM để sinh mã nguồn, tóm gọn trong ba bước: mài giũa ý tưởng thành đặc tả, lập kế hoạch, rồi thực thi theo từng vòng nhỏ. Với dự án mới, ông để một mô hình hội thoại hỏi lần lượt từng câu nhằm biến ý tưởng thành tệp `spec.md`; sau đó đưa đặc tả cho một mô hình suy luận để chia thành các bước nhỏ, mỗi bước là một câu lệnh gợi ý (prompt) cho công cụ sinh mã, lưu thành `prompt_plan.md` kèm danh sách việc `todo.md` để giữ trạng thái giữa các phiên. Toàn bộ khâu lập kế hoạch chỉ mất khoảng 15 phút. Khi thực thi, ông ưa dùng trực tiếp Claude hoặc Aider: dán từng prompt, chạy kiểm thử, được thì sang bước tiếp, lỗi thì dùng repomix đóng gói mã nguồn gửi cho mô hình để gỡ lỗi.

Với dự án có sẵn, ông dùng repomix cùng các tác vụ mise để đóng gói ngữ cảnh, rồi dùng prompt để đánh giá mã nguồn, tạo issue trên GitHub hoặc tìm những kiểm thử còn thiếu. Tác giả thừa nhận rất dễ bị cuốn đi như trượt tuyết quá đà, mất kiểm soát vì mọi thứ diễn ra quá nhanh, nên bước lập kế hoạch và kiểm thử là cần thiết. Ông cũng phàn nàn rằng các quy trình này chủ yếu dành cho một người, khó áp dụng theo nhóm, và chia sẻ cách tận dụng thời gian chờ mô hình chạy, chẳng hạn bắt đầu lên ý tưởng cho một dự án khác.

## [Structured Logging in Spring Boot](https://www.javacodegeeks.com/structured-logging-in-spring-boot.html)

Bài viết của Yatin Batra trên Java Code Geeks hướng dẫn triển khai ghi log có cấu trúc (structured logging) trong Spring Boot. Khác với log dạng văn bản thuần mà Logback xuất ra theo mặc định, log có cấu trúc dùng định dạng như JSON, giúp các công cụ tổng hợp log như ELK hay Loki dễ phân tích, tìm kiếm và lọc hơn. Tác giả hướng dẫn thêm thư viện Logstash Logback Encoder vào `pom.xml`, tạo tệp `logback-spring.xml` trong `src/main/resources`, rồi minh họa log JSON sinh ra từ một ứng dụng mẫu.

Ở phần nâng cao, bài viết trình bày cách thêm trường tùy chỉnh bằng MDC (Mapped Diagnostic Context), ví dụ gắn `userId` vào từng dòng log, cách gửi log tới Logstash và cấu hình Promtail để đưa log vào Loki. Cuối cùng, tác giả giới thiệu hai định dạng chuẩn: Elastic Common Schema (ECS) để thống nhất cấu trúc log trong hệ sinh thái Elastic, và Graylog Extended Log Format (GELF) để gửi log tới máy chủ Graylog, kèm các trường chính và phần so sánh ưu điểm của từng định dạng. Cách tiếp cận này đặc biệt hữu ích cho ứng dụng chạy trên đám mây, nơi việc tập trung log gần như là bắt buộc.

## [Secret Java Stream Hacks That Will Instantly Improve Your Coding Efficiency](https://gainjavaknowledge.medium.com/secret-java-stream-hacks-that-will-instantly-improve-your-coding-efficiency-8253d57d692b)

Bài viết của Gain Java Knowledge trên Medium giới thiệu một số thủ thuật ít được chú ý với Java Stream API để viết mã nguồn gọn và hiệu quả hơn. Nổi bật là `Collectors.teeing()`, cho phép xử lý cùng một luồng dữ liệu bằng hai bộ thu thập (collector) khác nhau rồi gộp kết quả, chẳng hạn tính cả tổng lẫn trung bình trong một lần duyệt thay vì phải duyệt nhiều lần. Bài viết cũng nhắc tới `takeWhile()` để lấy phần tử cho tới khi điều kiện không còn đúng và `dropWhile()` để bỏ qua phần tử khi điều kiện còn đúng, giúp đơn giản hóa việc lọc có điều kiện.

Ngoài ra, tác giả đề cập các chủ đề nâng cao như dùng luồng song song hợp lý, tối ưu bộ nhớ, xử lý ngoại lệ bên trong stream và kết hợp nhiều thao tác. Các lời khuyên thực hành gồm chọn đúng collector cho từng trường hợp, tránh tác dụng phụ trong các thao tác stream, ưu tiên tham chiếu phương thức (method reference) khi có thể và giữ chuỗi thao tác ở mức dễ đọc. Người đọc cũng nên hiểu cơ chế đánh giá lười (lazy evaluation) và cân nhắc hiệu năng khi làm việc với tập dữ liệu lớn.

## [Death of a Thousand Nits: Code Review Best Practices](https://bitfieldconsulting.com/posts/code-review)

John Arundel, trong một phần trích từ cuốn sách Code For Your Life, bàn về cách để việc đánh giá mã nguồn (code review) bớt căng thẳng và thực sự hữu ích. Lời khuyên đầu tiên là đánh giá theo cặp: thay vì trao đổi qua những ô bình luận trên pull request, hãy nói chuyện trực tiếp hoặc chia sẻ màn hình, vì giọng nói và nét mặt truyền tải nhiều thông tin hơn hẳn, một câu hỏi mất mười lăm giây có thể thay cho nhiều ngày bình luận qua lại, và người ta thường nhẹ nhàng với nhau hơn khi gặp mặt.

Khi buộc phải đánh giá bằng văn bản, mỗi bình luận nên làm tăng giá trị cho mã nguồn. Khác biệt về phong cách thì không cần góp ý; không hiểu cú pháp thì tự tra cứu; không hiểu vì sao mã được viết như vậy thì đặt câu hỏi; muốn đề xuất cách tốt hơn hay nghi ngờ có lỗi thì cũng diễn đạt thành câu hỏi thay vì phê bình. Tác giả khuyên mở đầu bằng những điểm tích cực, kết thúc bằng lời động viên và tránh giọng kẻ cả. Ở phía người nhận, khi bị góp ý thô bạo, đừng phản kích mà hãy tìm phần sự thật trong đó; còn với những lời bắt bẻ thuần túy về phong cách, có thể lờ đi hoặc hỏi riêng xem đâu mới là vấn đề thực sự. Cuối cùng, cách tốt nhất để lan tỏa văn hóa đánh giá mã nguồn tử tế là tự làm gương.

## [Hash Functions Deep Dive](https://www.kirupa.com/data_structures_algorithms/hash_functions_deep_dive.htm)

Kirupa giải thích hàm băm (hash function) từ nền tảng: đó là hàm nhận đầu vào bất kỳ như văn bản, tệp hay dữ liệu nhị phân và trả về đầu ra có độ dài cố định, được dùng trong lưu trữ và truy xuất dữ liệu, xác thực mật khẩu, kiểm tra tính toàn vẹn tệp, chữ ký số hay loại bỏ dữ liệu trùng lặp. Một hàm băm tốt cần đáp ứng tám tiêu chí: tất định (cùng đầu vào luôn cho cùng đầu ra), phân bố đều, tính toán nhanh (thường là O(1)), hiệu ứng tuyết lở (thay đổi nhỏ ở đầu vào làm đầu ra thay đổi lớn), kích thước đầu ra cố định, ít va chạm, khó đảo ngược và không có tương quan giữa các đầu vào giống nhau.

Để minh họa, tác giả tự xây dựng một hàm băm bằng JavaScript: cộng mã ký tự của chuỗi rồi giới hạn kết quả theo kích thước bảng là một số nguyên tố như 37. Hàm này nhanh chóng lộ điểm yếu khi "hello" và "olleh" cho cùng một kết quả; thêm trọng số theo vị trí ký tự giúp khắc phục trường hợp đó, nhưng nó vẫn trượt gần hết các tiêu chí. Bài học rút ra là hãy luôn dùng một hàm băm có sẵn; tác giả lấy MD5 để đối chiếu với từng tiêu chí, với đầu ra 128 bit, tương đương 32 ký tự thập lục phân. Hàm băm hiện diện ở khắp nơi, từ bảng băm tốc độ cao đến việc bảo vệ mật khẩu và xác minh tệp tải về.

## [XOR: A Deep Dive into the Exclusive OR Operation](https://www.chiark.greenend.org.uk/~sgtatham/quasiblog/xor/)

Simon Tatham phân tích sâu về phép toán XOR (hoặc loại trừ) và các ứng dụng của nó trong khoa học máy tính. Về cơ bản, XOR cho kết quả 1 khi hai bit đầu vào khác nhau và 0 khi chúng giống nhau, đồng thời có tính giao hoán và kết hợp. Tác giả đưa ra nhiều cách hiểu tương đương về phép toán này: phép so sánh "không bằng" giữa hai bit, phép đảo bit có điều kiện, phép cộng theo modulo 2, và phép tính chẵn lẻ của số bit 1.

Từ những tính chất đó, bài viết đi qua các ứng dụng thực tế. Trong mật mã học, XOR được dùng để kết hợp bản rõ với dòng khóa, tạo ra cách mã hóa đơn giản mà hiệu quả và là thành phần của nhiều hệ thống mã hóa phức tạp hơn. Trong đồ họa, XOR giúp vẽ và xóa điểm ảnh dễ dàng. Ngoài ra còn có những mẹo quen thuộc như hoán đổi giá trị hai biến mà không cần biến tạm, tính trung bình hai số nguyên hay thực hiện phép cộng không nhớ.

## Bonus: Vài ảnh hay ho đến từ [ByteByteGo](https://bytebytego.com/)

![SOAP vs REST vs GraphQL vs RPC](https://substack-post-media.s3.amazonaws.com/public/images/6b437484-1fd8-4b59-ba05-46bb3352b053_2904x2559.jpeg)
![SQS vs SNS vs EventBridge vs Kinesis](https://substack-post-media.s3.amazonaws.com/public/images/3ecf2600-10d8-4180-8328-8d790fbba0cc_1280x1557.gif)
![Top 5 common ways to improve API performance](https://substack-post-media.s3.amazonaws.com/public/images/217bf342-bfd4-4088-bba3-b2734f065a20_1280x1280.gif)

## Bonus 2: Vài video hay ho đến từ [Inside Java](https://inside.java/)

[Project Loom and Virtual Threads: Next Phases](https://inside.java/2025/02/22/devoxxbelgium-loom-next/)

---

*Bài viết đã được viết lại bởi Claude Code với Opus 5.5 vào ngày 27/09/2026.*
