---
title: "Newsletter #52"
date: 2025-09-07
tags: [ "AI-Assisted", "Java", "Design-Patterns", "Security", "LLM", "Complexity", "Work-Life-Balance" ]
categories: [ "Newsletter" ]
---

*Mời bạn thưởng thức Newsletter #52.*

## [Traps to Developers](https://qouteall.fun/qouteall-blog/2025/Traps%20to%20Developers)

Bài viết của qouteall là một danh sách tham khảo dài về những "cạm bẫy" trong lập trình: các hành vi không trực quan, dễ hiểu sai và thường chỉ lộ ra khi đã gây lỗi. Tác giả chia theo chủ đề, mở đầu bằng HTML và CSS với những chi tiết như `min-width: auto` trong flexbox hay grid khiến phần tử không co lại được, hiện tượng gộp lề (margin collapse), stacking context làm `z-index` chỉ có tác dụng trong phạm vi một ngữ cảnh, hay `100vh` trên trình duyệt di động lớn hơn vùng hiển thị thực tế. Tiếp theo là Unicode và xử lý văn bản, số thực dấu phẩy động với NaN, vô cực và sai số làm tròn, cùng các vấn đề liên quan đến thời gian.

Phần sau đi vào từng ngôn ngữ và nền tảng: Java, Go, C/C++, Python, Rust, cơ sở dữ liệu SQL, lập trình đồng thời và song song, xung đột phụ thuộc bắc cầu, Linux và bash, backend, React, Git, mạng, thiết lập vùng miền (locale), biểu thức chính quy và hệ sinh thái Microsoft. Mỗi mục thường chỉ dài vài dòng kèm liên kết tham khảo, nên bài phù hợp để đọc lướt một lần rồi quay lại tra cứu khi gặp lỗi lạ. Với lập trình viên mới, đây là cách nhanh để biết trước những chỗ "tưởng đúng mà sai" thay vì phải trả giá bằng nhiều giờ gỡ lỗi.

## [Active Record vs. Repository Pattern](https://javabulletin.substack.com/p/active-record-vs-repository-pattern)

Suraj Mishra so sánh hai mẫu thiết kế truy cập dữ liệu phổ biến trong lập trình hướng đối tượng. Với Active Record, mỗi lớp ánh xạ trực tiếp tới một bảng, mỗi đối tượng tương ứng một dòng và tự chứa các phương thức CRUD như `find` hay `save`, theo phong cách quen thuộc của Rails. Cách này dễ dùng, giảm cấu hình nhờ nguyên tắc "quy ước thay vì cấu hình" và giúp phát triển nhanh các ứng dụng đơn giản, nhưng khiến mô hình gắn chặt với lược đồ cơ sở dữ liệu, vi phạm nguyên tắc đơn trách nhiệm (Single Responsibility) và dễ trở nên cồng kềnh khi nghiệp vụ phức tạp.

Repository tách logic truy cập dữ liệu khỏi logic nghiệp vụ thông qua một giao diện giống như tập hợp; trong Spring Data JPA, đó là interface kế thừa `JpaRepository` được tiêm vào lớp dịch vụ. Nhờ vậy việc kiểm thử đơn vị dễ hơn vì có thể giả lập repository, và việc đổi nguồn dữ liệu, chẳng hạn từ cơ sở dữ liệu quan hệ sang NoSQL, ít ảnh hưởng tới nghiệp vụ. Đổi lại là thêm một lớp trừu tượng, tăng độ phức tạp và làm chậm giai đoạn phát triển ban đầu. Tác giả kết luận Active Record hợp với ứng dụng nhỏ có nghiệp vụ đơn giản, còn Repository phù hợp khi khả năng bảo trì, mở rộng và kiểm thử là ưu tiên hàng đầu.

## [Thread.sleep(0) is not for free](https://mlangc.github.io/java/performance/2025/08/14/thread-sleep0-is-not-for-free.html)

Bài viết ngắn này gỡ bỏ một hiểu lầm phổ biến: gọi `Thread.sleep(0)` trong Java không hề "miễn phí". Tài liệu chính thức cho phép một lối tắt chỉ kiểm tra trạng thái ngắt khi thời gian chờ bằng 0, nhưng bản cài đặt thực tế lại gọi xuống mã native và thực hiện `os::naked_yield()`, trên Linux chính là `sched_yield()`, hàm mà tài liệu của nó khuyên tránh lạm dụng vì gây chuyển ngữ cảnh không cần thiết. Theo đo đạc bằng JMH của tác giả, mỗi lần gọi tốn ngang việc sinh 128 byte ngẫu nhiên, và tệ nhất đúng vào lúc CPU đang quá tải: với 20 luồng, thông lượng của phiên bản có `Thread.sleep(0)` còn thấp hơn cả khi chạy một luồng.

Vì vậy, nếu mã nguồn của bạn dùng `sleep` để lùi lại khi gặp lỗi hoặc quá tải, đừng truyền độ trễ 0 vào `Thread.sleep` như đoạn đầu tiên bên dưới, mà hãy chỉ gọi khi thật sự cần chờ như đoạn thứ hai. Tác giả cũng gợi ý dùng `TimeUnit.sleep`, vốn có lối tắt được ghi rõ trong tài liệu, còn nếu thực sự muốn nhường CPU thì nên gọi thẳng `Thread.yield()` cho rõ ý đồ.

```java
int delay = allGood ? 0 : waitShorty;
Thread.sleep(delay);
```

```java
if (!allGood) {
    Thread.sleep(waitShortly);
}
```

## [Why do video games use kernel-mode anti-cheats?](https://malwaresourcecode.com/home/my-projects/write-ups/why-do-video-games-use-kernel-mode-anti-cheats)

Bài viết nhằm phản bác nỗi sợ phần mềm chống gian lận chạy ở chế độ kernel. Trên Windows, hệ điều hành chia thành chế độ người dùng và chế độ kernel, trong đó kernel đóng vai trò "người quản lý" đứng giữa phần mềm và phần cứng thông qua driver. Ngày nay, muốn vào kernel, driver phải được Microsoft xét duyệt và ký chứng chỉ (Driver Signature Enforcement), bị Patchguard ngăn sửa đổi các thành phần kernel khác và có thể bị đưa vào danh sách chặn nếu không còn an toàn. Anti-cheat cần kernel vì chỉ ở đó mới nhận được thông báo mỗi khi một tiến trình được tạo, qua `PsSetCreateProcessNotifyRoutine`, đúng kỹ thuật mà phần mềm diệt mã độc và EDR vẫn dùng. Chương trình vừa khởi chạy sau đó được kiểm tra bằng phân tích tĩnh (tìm chuỗi byte đặc trưng của công cụ gian lận) và phân tích hành vi như kiểm tra toàn vẹn mã, ETW, hooking API hay minifilter.

Về lo ngại xâm phạm quyền riêng tư, tác giả cho rằng phần lớn xuất phát từ hiểu biết chưa đầy đủ: thành phần kernel được ký mà độc hại là cực hiếm, khoảng 99,9% mã độc hiện nay chạy ở chế độ người dùng vì kẻ tấn công chỉ cần rất ít quyền để đánh cắp dữ liệu, và dùng kernel để "theo dõi" game thủ là quá mức cần thiết. Việc vẫn không tin tưởng anti-cheat kernel, theo tác giả, suy cho cùng là quan điểm về mô hình bảo mật, nhưng không nên dựa trên thông tin sai lệch.

## [Why LLMs Can't Really Build Software](https://zed.dev/blog/why-llms-cant-build-software)

Conrad Irwin (Zed) rút ra từ kinh nghiệm phỏng vấn rằng kỹ sư phần mềm giỏi luôn lặp một vòng: xây dựng mô hình tư duy về yêu cầu, viết mã, xây dựng mô hình tư duy về những gì mã thực sự làm, rồi tìm khác biệt để sửa mã hoặc sửa yêu cầu. LLM viết mã khá tốt và cũng biết đọc mã, chạy kiểm thử, thêm log, nhưng không duy trì được mô hình tư duy rõ ràng: chúng mặc định mã mình viết là đúng, khi kiểm thử thất bại thì đoán mò nên sửa mã hay sửa bài kiểm thử, và khi bế tắc thì xóa hết làm lại. Nguyên nhân là mô hình kém trong việc nhận ra ngữ cảnh bị thiếu, thiên lệch mạnh về thông tin gần nhất trong cửa sổ ngữ cảnh và hay bịa ra chi tiết, trong khi con người biết tạm gác ngữ cảnh để tập trung gỡ một vấn đề rồi quay lại bức tranh lớn.

Dù vậy, tác giả thừa nhận LLM rất hữu ích: sinh mã nhanh, tổng hợp yêu cầu và tài liệu tốt, đủ để làm trọn những việc đơn giản. Nhưng với bất kỳ việc gì không tầm thường, chúng chưa giữ đủ ngữ cảnh chính xác để lặp tới một lời giải chạy được. Kỹ sư vẫn phải chịu trách nhiệm đảm bảo yêu cầu rõ ràng và mã làm đúng điều nó tuyên bố; với Zed, con người cầm lái, còn LLM chỉ là thêm một công cụ trong tay.

## [The Java Type System is Broken](https://wouter.coekaerts.be/2018/java-type-system-broken)

Wouter Coekaerts chỉ ra rằng hệ thống kiểu của Java có lỗ hổng. Một số lỗ hổng là cố ý để tương thích ngược, như raw type hay ép kiểu không kiểm tra, có thể gây "heap pollution", tức nội dung của một kiểu tham số hóa không khớp với kiểu đã khai báo; nhưng những trường hợp này đều đi kèm cảnh báo của trình biên dịch. Tác giả đi tìm những cấu trúc mà trình biên dịch coi là an toàn, không hề cảnh báo, nhưng vẫn dẫn tới `ClassCastException` ở chỗ không có phép ép kiểu tường minh nào. Sau phần giới thiệu về wildcard và capture conversion, bài lần lượt cho thấy lambda, lớp nội cục bộ, lớp nội trong lớp generic, việc kiểm tra cận của biến kiểu và biến kiểu của lớp ngoài dùng làm cận cho lớp nội đều có thể phá vỡ đảm bảo về kiểu, kèm hai trường hợp "đáng nhắc tới" là unboxing trong lambda và `TreeSet`.

Tác giả cũng phát hiện một vài lỗi tương tự đã được báo cáo từ trước và mở thêm các lỗi mới cho JDK. Theo ông, những lỗ hổng này không ảnh hưởng tới bảo mật và khó gặp phải một cách vô tình, nhưng chúng nhắc rằng generics của Java vốn mong manh và không nên lờ đi các cảnh báo của trình biên dịch. Bài khép lại bằng câu "mọi thứ đều hỏng, mọi thứ vẫn ổn", kèm lời kêu gọi chăm chút lại hệ thống kiểu sau nhiều năm bị kéo căng bởi yêu cầu tương thích ngược và các tính năng mới.

## [The Pragmatic Engineer 2025 Survey: What's in your tech stack? Part 2](https://newsletter.pragmaticengineer.com/p/the-pragmatic-engineer-2025-survey-part-2)

Phần 2 kết quả khảo sát của The Pragmatic Engineer, dựa trên hơn 3.000 phản hồi, xem xét các công cụ kỹ sư phần mềm dùng để quản lý dự án, giao tiếp, cộng tác, lưu trữ dữ liệu và vận hành hạ tầng backend. JIRA vẫn dẫn đầu mảng quản lý dự án dù từng bị bình chọn là công cụ bị ghét nhất, Linear đang nổi lên thành đối thủ đáng gờm, còn Azure DevOps phổ biến một cách bất ngờ. Ở mảng giao tiếp, Slack thống trị chat, Microsoft Teams dẫn đầu gọi video, Confluence là công cụ tài liệu phổ biến nhất và Figma áp đảo trong thiết kế. PostgreSQL là cơ sở dữ liệu được nhắc tới nhiều nhất trong 35 cái tên, theo sau là MySQL, Redis và MongoDB, còn hạ tầng backend xoay quanh các dịch vụ AWS, Docker, Kubernetes và Terraform.

Tác giả rút ra vài nhận định đáng chú ý: quản lý dự án là một phần công việc của lập trình viên, khi các công cụ này được nhắc tới nhiều ngang IDE; khó có thể sai khi chọn PostgreSQL, nên câu hỏi thực dụng là "điều gì ngăn ta dùng Postgres?"; và nên tìm hiểu Kubernetes kể cả khi chưa dùng, vì một phần tư số người trả lời đã có nó trong hệ thống. Cuối cùng, việc Redis và Terraform rời bỏ giấy phép mã nguồn mở dường như không làm giảm độ phổ biến dù đã có bản fork, trong khi OpenSearch, nhờ sự hậu thuẫn của Amazon, đã đạt mức sử dụng khoảng 25% so với Elasticsearch.

## [Why do software developers love complexity?](https://kyrylo.org/software/2025/08/21/why-do-software-developers-love-complexity.html)

Kyrylo Silin đặt câu hỏi: vì sao lập trình viên vẫn bị cuốn vào sự phức tạp dù ai cũng biết nguyên tắc KISS (Keep It Simple, Stupid)? Một phần câu trả lời nằm ở tiếp thị: chẳng ai hào hứng với một đối thủ của lệnh `cat`, nhưng một "catzilla" đầy tính năng, được quảng bá khắp nơi thì lại khiến người ta tò mò. Độ phức tạp còn ngầm báo hiệu công sức, chuyên môn và sự độc quyền, dần trở thành biểu tượng địa vị thay vì nhu cầu thật. Giống như kim tự tháp, phần mềm hiện đại chồng chất phụ thuộc, framework và lớp trừu tượng, trong khi bên trong có khi trống rỗng; tác giả tóm lại: "Độ phức tạp hét lên 'Nhìn tôi này!', còn sự đơn giản thì thầm 'Bạn có để ý không?'". Ví dụ ông ưa thích là React so với JavaScript thuần.

Ngoài tiếp thị, bài chỉ ra bốn động lực bên trong: sức hấp dẫn của việc giải một "câu đố" hóc búa, hệ thống cũ và nợ kỹ thuật khiến việc chắp vá dễ hơn đơn giản hóa, nhóm đông người mà ai cũng thêm một lớp trừu tượng "phòng xa", và áp lực phải đổi mới để tạo khác biệt. Lời khuyên cuối cùng: nếu phải xây kim tự tháp thì hãy xây có mục đích, với nền móng vững chắc và bên trong thật sự có giá trị; trước khi viết 500 dòng trừu tượng cho việc có thể làm trong 50 dòng, hãy tự hỏi bạn đang giải quyết vấn đề thật cho người dùng và người bảo trì hay chỉ đang thỏa mãn bản thân.

## [The Important Things in Life](https://hamvocke.com/blog/important-things/)

Ham Vocke giải thích vì sao blog của anh im ắng thời gian qua: mùa xuân và mùa hè bận rộn với những điều làm cuộc sống ngọt ngào, đến mức anh chẳng còn thời gian viết lách hay làm dự án phụ, và anh không muốn điều đó khác đi. Công việc ở một startup đang tăng trưởng vẫn đòi hỏi nhiều công sức và giúp anh học hỏi, trưởng thành, nhưng những thử thách, bực bội hay thành quả ở chỗ làm hiếm khi đáng nhớ lâu. Điều đọng lại là những khoảnh khắc ngoài màn hình: dự đám cưới và lễ kỷ niệm của những người bạn quen hơn 25 năm, lần đầu đi lễ hội âm nhạc sau 20 năm, tiệc nướng cuối tuần cùng bạn bè, thăm người anh em sau nhiều năm xa cách, ở bên cha mẹ khi họ chuẩn bị nghỉ hưu và chuyến đi cuối tuần cùng vợ ngắm cảnh miền nam nước Đức.

Bài viết ngắn nhưng là lời nhắc đáng giá cho người làm công nghệ về sự cân bằng giữa công việc và cuộc sống, khép lại bằng một lời khuyên giản dị: "Hãy ôm bạn bè, gọi cho gia đình, ra ngoài và tạo nên những kỷ niệm."

## Bonus: Vài ảnh hay ho đến từ [ByteByteGo](https://bytebytego.com/)

![How Does SSO Work?](https://substack-post-media.s3.amazonaws.com/public/images/4bf62d5c-e538-4fba-8d4f-aa00d0bd064a_3000x3900.png)
![Best Practices in API Design](https://substack-post-media.s3.amazonaws.com/public/images/e249b1bd-134e-4242-ac16-1d50daf804d3_3000x3900.png)
![Top Strategies For Reliability and Fault Tolerance](https://substack-post-media.s3.amazonaws.com/public/images/82b8257a-93c3-4861-b211-88d57b12bc93_2250x2624.png)

## Bonus: Một vài video thú vị

[Vibes won't cut it — Chris Kelly, Augment Code](https://www.youtube.com/watch?v=Dc3qOA9WOnE)
[these coding blogs will make you a better programmer](https://www.youtube.com/watch?v=Z3fwe6AAgaM)

## Bonus: Một vài repository thú vị

[Computer science foundation/ Interview preparation/ Junior to Senior Developer](https://github.com/bansalankit92/java-spring-fullstack-interview-question-answers)

## Bonus: Một vài sách thú vị

[Java interview questions and answers - Boosting your java career](https://enos.itcollege.ee/~jpoial/allalaadimised/reading/Java-Interview-Questions.pdf)

~~[Java Puzzlers - Traps, Pitfalls, and Corner Cases](https://github.com/shannonasmith/Java_books/blob/main/Java%20Puzzlers%20-%20Traps%2C%20Pitfalls%2C%20and%20Corner%20Cases%20(2005).pdf)~~

---

*Bài viết đã được viết lại bởi Claude Code với Opus 5.5 vào ngày 27/09/2026.*
