---
title: "Newsletter #52"
date: 2025-09-07
tags: [ "AI-Assisted", "Programming", "Best-Practices", "Software-Development", "Work-Life-Balance" ]
categories: [ "Newsletter" ]
---

*Mời bạn thưởng thức Newsletter #52.*

## [Traps to Developers](https://qouteall.fun/qouteall-blog/2025/Traps%20to%20Developers)

Bài viết này đưa ra một cái nhìn tổng quan về những "cạm bẫy" mà các lập trình viên có thể gặp phải trong quá trình phát triển phần mềm. Tác giả đã tổng hợp rất nhiều tình huống phức tạp và không trực quan có thể dẫn đến lỗi trong code.

Bài viết được chia thành nhiều chủ đề chính:

**HTML/CSS và giao diện web**: Các hành vi phức tạp trong việc hiển thị, xử lý layout, stacking context và việc định vị các phần tử có thể gây ra những kết quả bất ngờ.

**Unicode và xử lý văn bản**: Những thách thức trong việc mã hóa ký tự, sự khác biệt trong cách xử lý chuỗi giữa các ngôn ngữ lập trình, và vấn đề chuẩn hóa ký tự.

**Số thực dấu phẩy động**: Hạn chế về độ chính xác, các trường hợp đặc biệt như NaN và infinity, cũng như sự khác biệt trong tính toán phụ thuộc vào phần cứng.

**Lập trình đồng thời và đồng bộ hóa**: Race conditions, vấn đề thread safety và sự phức tạp của các thao tác atomic.

**Cạm bẫy theo từng ngôn ngữ**: Java với việc so sánh đối tượng, Golang với quản lý bộ nhớ slice, C/C++ với các hành vi không xác định, Python với các vấn đề về tham số và thụt lề.

Đây là một tài liệu tham khảo rất hữu ích giúp các lập trình viên nhận biết và tránh những lỗi phổ biến trong quá trình phát triển phần mềm.

## [Active Record vs. Repository Pattern](https://javabulletin.substack.com/p/active-record-vs-repository-pattern)

Bài viết này so sánh hai mẫu thiết kế truy cập dữ liệu phổ biến trong các ứng dụng Java: Active Record Pattern và Repository Pattern.

**Active Record Pattern** cho phép các đối tượng chịu trách nhiệm cho cả dữ liệu và các thao tác cơ sở dữ liệu của chính chúng. Ưu điểm của mô hình này là dễ sử dụng cho các thao tác CRUD cơ bản, phát triển nhanh hơn cho các ứng dụng đơn giản và tuân theo nguyên tắc "Quy ước thay vì cấu hình". Tuy nhiên, nó cũng có nhược điểm là tạo ra sự liên kết chặt chẽ giữa mô hình và lược đồ cơ sở dữ liệu, vi phạm nguyên tắc Single Responsibility và ít linh hoạt cho các ứng dụng phức tạp.

**Repository Pattern** tách biệt logic truy cập dữ liệu khỏi logic nghiệp vụ thông qua việc sử dụng interface để truy cập các đối tượng domain. Mô hình này có ưu điểm là phân tách mối quan tâm tốt hơn, cải thiện khả năng kiểm thử và linh hoạt hơn trong việc thay đổi nguồn dữ liệu. Nhược điểm là tăng độ phức tạp, phát triển ban đầu chậm hơn và thêm một lớp trừu tượng.

Khuyến nghị từ tác giả là sử dụng Active Record cho các ứng dụng đơn giản với logic đơn giản, trong khi Repository Pattern phù hợp hơn cho các ứng dụng phức tạp yêu cầu khả năng bảo trì và mở rộng.

## [Thread.sleep(0) is not for free](https://mlangc.github.io/java/performance/2025/08/14/thread-sleep0-is-not-for-free.html)

Bài viết này phân tích một khía cạnh hiệu suất thú vị trong Java mà nhiều lập trình viên có thể bỏ qua: việc gọi `Thread.sleep(0)` không hề "miễn phí" như ta có thể nghĩ.

Tác giả chỉ ra rằng mặc dù có vẻ như `Thread.sleep(0)` không làm gì cả, nhưng thực tế nó vẫn gọi đến một phương thức native thực hiện thao tác yield thread. Trên hệ điều hành Linux, thao tác này sử dụng `sched_yield()` có thể gây ra những lần chuyển đổi ngữ cảnh không cần thiết.

Các thử nghiệm hiệu suất cho thấy:
- Việc gọi `Thread.sleep(0)` có chi phí tính toán đáng kể
- Hiệu suất giảm mạnh khi CPU tải cao, đặc biệt với nhiều luồng chạy đồng thời
- Benchmark của tác giả cho thấy việc thêm `Thread.sleep(0)` có thể giảm đáng kể throughput của hệ thống

Tác giả khuyên rằng thay vì sử dụng pattern như:
```java
int delay = allGood ? 0 : waitShorty;
Thread.sleep(delay);
```

Nên sử dụng:
```java
if (!allGood) {
    Thread.sleep(waitShortly);
}
```

Đây là một lời nhắc nhở quan trọng về việc hiểu rõ chi phí của các thao tác tưởng chừng như đơn giản trong lập trình Java.

## [Why do video games use kernel-mode anti-cheats?](https://vx-api.gitbook.io/vx-api/my-projects/why-do-video-games-use-kernel-mode-anti-cheats)

Bài viết này giải thích lý do tại sao các trò chơi video sử dụng phần mềm chống gian lận ở chế độ kernel và cách thức hoạt động của chúng.

**Mục đích chính**: Phần mềm chống gian lận chế độ kernel được thiết kế để phát hiện và ngăn chặn việc gian lận trong các trò chơi video một cách hiệu quả hơn so với các giải pháp chạy ở chế độ người dùng thông thường.

**Cách thức hoạt động**: Các phần mềm này hoạt động trong không gian kernel - nơi quản lý tương tác giữa phần mềm và phần cứng. Chúng sử dụng các kỹ thuật như "phân tích tĩnh" và "phân tích hành vi" để nhận diện hoạt động gian lận. Thông qua các system call, chúng có thể nhận thông báo về việc tạo tiến trình và kiểm tra các phần mềm gian lận tiềm ẩn.

**Vấn đề bảo mật**: Microsoft có quy định nghiêm ngặt về Driver Signature Enforcement, nghĩa là tất cả phần mềm chế độ kernel phải được Microsoft chứng nhận và phê duyệt. Điều này khiến việc lạm dụng các phần mềm này trở nên khó khăn hơn nhiều so với phần mềm chế độ người dùng.

**Tranh cãi**: Một số người dùng lo ngại về tính xâm phạm của phần mềm chế độ kernel. Tuy nhiên, tác giả cho rằng những lo ngại này phần lớn dựa trên hiểu biết sai lầm về khả năng kỹ thuật thực tế của chúng. Bài viết nhấn mạnh rằng mục tiêu chính là đảm bảo tính toàn vẹn của trò chơi chứ không phải thu thập dữ liệu.

## [Why LLMs Can't Really Build Software](https://zed.dev/blog/why-llms-cant-build-software)

Bài viết từ Conrad Irwin (Zed) đưa ra quan điểm thú vị về những hạn chế cơ bản của các mô hình ngôn ngữ lớn (LLM) trong việc xây dựng phần mềm.

**Vòng lặp phát triển phần mềm**: Các kỹ sư phần mềm hiệu quả thường thực hiện liên tục các bước: xây dựng mô hình tư duy về yêu cầu, viết mã, kiểm chứng code thực sự làm gì, và nhận diện cũng như cập nhật những khác biệt.

**Hạn chế của LLM**: Tác giả cho rằng LLM không thể duy trì các mô hình tư duy rõ ràng, thường xuyên "bối rối vô tận", giả định rằng mã hoạt động mà không kiểm chứng đúng cách, gặp khó khăn khi test thất bại, và có xu hướng xóa và bắt đầu lại thay vì debug.

**Điểm yếu cụ thể**: LLM gặp vấn đề với việc bỏ qua ngữ cảnh, có bias mạnh về thông tin gần đây, và xu hướng tưởng tượng ra các chi tiết không có thật.

**Kết luận của tác giả**: LLM là công cụ hữu ích để tạo mã và tổng hợp yêu cầu, nhưng không thể độc lập xây dựng phần mềm phức tạp. Con người vẫn đóng vai trò thiết yếu trong việc đảm bảo yêu cầu rõ ràng và mã hoạt động chính xác.

Đây là một góc nhìn cân bằng về vai trò của AI trong phát triển phần mềm - hữu ích nhưng không thể thay thế hoàn toàn con người.

## [The Java Type System is Broken](https://wouter.coekaerts.be/2018/java-type-system-broken)

Bài viết từ Wouter Coekaerts đi sâu vào những lỗ hổng kỹ thuật trong hệ thống kiểu của Java, chỉ ra cách một số cấu trúc ngôn ngữ có thể dẫn đến lỗi liên quan đến kiểu dữ liệu và "heap pollution" - tình huống mà nội dung của kiểu tham số không khớp với kiểu được khai báo.

**Vấn đề với Lambda Expressions**: Lambda có thể phá vỡ tính an toàn kiểu bằng cách cho phép thực thi nhiều lần các kiểu capture. Tác giả đưa ra ví dụ về cách một thao tác stream có thể di chuyển sai các phần tử giữa những danh sách có kiểu khác nhau.

**Vấn đề Local Inner Classes**: Các phương thức generic với local inner classes có thể tạo ra vấn đề về phạm vi kiểu. Điều này cho thấy các tình huống mà thông tin kiểu có thể bị thao tác, dẫn đến ClassCastException.

**Điểm yếu trong kiểm tra Type Variable Bound**: Việc áp dụng không nhất quán capture conversion trong type variable bounds cho phép định nghĩa các hệ thống phân cấp kiểu không phù hợp, tạo điều kiện cho các thao tác không an toàn về kiểu.

**Các vấn đề khác**: Unboxing trong lambda có thể gây ra type casting bất ngờ, và TreeSet implementation có những lỗ hổng bẩm sinh về tính an toàn kiểu.

Tác giả lập luận rằng trong khi một số lỗ hổng trong hệ thống kiểu là cố ý (để tương thích ngược), thì những lỗ hổng khác là tình cờ. Những lỗ hổng này có thể dẫn đến lỗi runtime mà vượt qua được kiểm tra kiểu tại compile-time - một vấn đề đáng quan tâm cho các lập trình viên Java.

## [The Pragmatic Engineer 2025 Survey: What's in your tech stack? Part 2](https://newsletter.pragmaticengineer.com/p/the-pragmatic-engineer-2025-survey-part-2)

Phần 2 của khảo sát tập trung vào các công cụ và cơ sở hạ tầng mà kỹ sư phần mềm sử dụng hàng ngày, tiết lộ những xu hướng thú vị trong lựa chọn công nghệ.

**Quản lý dự án**: JIRA vẫn dẫn đầu thị trường mặc dù bị "ghét" nhiều, Linear đang trở thành đối thủ cạnh tranh mạnh mẽ đặc biệt tại các công ty nhỏ, trong khi Azure DevOps bất ngờ phổ biến tại các tập đoàn lớn.

**Công cụ giao tiếp và cộng tác**: Slack thống trị nền tảng chat, Microsoft Teams dẫn đầu về video call, Confluence là công cụ tài liệu được sử dụng nhiều nhất, và Figma được ưa chuộng áp đảo cho thiết kế cộng tác.

**Cơ sở dữ liệu**: PostgreSQL là cơ sở dữ liệu được sử dụng rộng rãi nhất với danh sách "đuôi dài" các giải pháp khác. Vector database vẫn chưa thu hút được nhiều sự quan tâm như kỳ vọng.

**Cơ sở hạ tầng backend**: Docker, Kubernetes và Terraform được sử dụng rộng rãi. Các dịch vụ quản lý của AWS rất phổ biến, trong khi việc áp dụng các fork của các dự án mã nguồn mở (như OpenSearch) có tỷ lệ hỗn hợp.

**Quan sát đáng chú ý**: Các công cụ Microsoft thống trị nhiều danh mục, công cụ quản lý dự án được đề cập thường xuyên như IDE, và PostgreSQL vẫn là lựa chọn cơ sở dữ liệu thực dụng mặc định.

Khảo sát này cung cấp cái nhìn sâu sắc về sở thích công nghệ hiện tại và xu hướng từ khoảng 3,000 kỹ sư phần mềm.

## [Why do software developers love complexity?](https://kyrylo.org/software/2025/08/21/why-do-software-developers-love-complexity.html)

Bài viết từ Kyrylo khám phá lý do tại sao các lập trình viên thường bị hấp dẫn bởi những giải pháp phức tạp mặc dù nguyên tắc "Keep It Simple, Stupid" (KISS) được khuyến khích rộng rãi.

**Các yếu tố tâm lý và marketing**: Độ phức tạp thường được coi là dấu hiệu của chuyên môn và tính độc quyền. Marketing tạo ra giá trị nhân tạo thông qua các giải pháp phức tạp, biến độ phức tạp thành "biểu tượng địa vị hơn là một nhu cầu thực sự".

**Lý do sâu xa khiến lập trình viên ưa chuộng độ phức tạp**: Cám dỗ giải quyết vấn đề một cách sáng tạo, kế thừa từ các hệ thống cũ và nợ kỹ thuật, động lực cộng tác trong nhóm, và áp lực phải đổi mới cũng như tạo sự khác biệt.

Tác giả sử dụng ví dụ ẩn dụ về việc xây dựng kim tự tháp để minh họa cách các lập trình viên thường tạo ra những "lớp" độ phức tạp không cần thiết.

**Những hiểu biết quan trọng**: Sự đơn giản thường hiệu quả hơn về lâu dài, độ phức tạp có thể che giấu "sự thiếu bản chất", và các lập trình viên nên tập trung vào việc giải quyết các vấn đề thực sự của người dùng.

Câu nói đáng chú ý: "Độ phức tạp hét lên 'Nhìn tôi đây!', trong khi sự đơn giản thì thầm 'Bạn có chú ý không?'"

Bài viết kết thúc bằng lời kêu gọi xây dựng "kim tự tháp có mục đích" - tạo ra những giải pháp có chủ ý, nền tảng và thực sự có giá trị, thay vì phức tạp chỉ vì muốn phức tạp.

## [The Important Things in Life](https://hamvocke.com/blog/important-things/)

Bài viết từ Ham Vocke là một tấm gương phản chiếu về những điều thực sự quan trọng trong cuộc sống, vượt ra ngoài những thách thức nghề nghiệp hàng ngày.

**Nguyên tắc cốt lõi**: Ưu tiên các mối quan hệ và trải nghiệm cá nhân hơn những thách thức nghề nghiệp, trân trọng những khoảnh khắc bên bạn bè và gia đình, tạo ra những kỷ niệm có ý nghĩa ngoài công việc.

**Những trải nghiệm được nhấn mạnh**: Tác giả chia sẻ về việc tham dự đám cưới và lễ kỷ niệm của bạn bè, tham gia các lễ hội âm nhạc, tổ chức tiệc nướng, thăm gia đình, hỗ trợ cha mẹ khi họ chuẩn bị nghỉ hưu, và du lịch cùng vợ/chồng.

**Lời khuyên thực tiễn**: Bài viết kết thúc bằng một khuyến nghị mạnh mẽ và súc tích: "Ôm bạn bè, gọi điện cho gia đình, ra ngoài, tạo kỷ niệm."

**Thông điệp trung tâm**: Mặc dù công việc có thể đầy thách thức và áp lực, những khía cạnh quan trọng nhất của cuộc sống chính là những kết nối cá nhân, trải nghiệm được chia sẻ, và những khoảnh khắc vui vẻ bên những người thân yêu.

Đây là một lời nhắc nhở quan trọng cho những ai làm trong ngành công nghệ về việc cân bằng giữa công việc và cuộc sống, đặt con người và mối quan hệ lên hàng đầu.

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

[Java Puzzlers - Traps, Pitfalls, and Corner Cases](https://github.com/shannonasmith/Java_books/blob/main/Java%20Puzzlers%20-%20Traps%2C%20Pitfalls%2C%20and%20Corner%20Cases%20(2005).pdf)

---

*Bài viết đã được review và cập nhật bởi Claude Code với Opus 4.7 (1M context).*
