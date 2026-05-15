---
title: "Newsletter #43"
date: 2025-08-02
tags: [ "AI-Assisted", "Lập trình", "Tái cấu trúc mã" ]
categories: [ "Newsletter" ]
---

*~~Bài này mình thay đổi tool sử dụng thành Qwen Code và model sử dụng là Qwen 3 Coder, dùng qua api của OpenRouter. Thử nghiệm một tí xem thế nào.~~ Mời bạn thưởng thức Newsletter #43.*

## [Augmented Coding: Beyond the Vibes](https://tidyfirst.substack.com/p/augmented-coding-beyond-the-vibes)

Kent Beck chia sẻ trải nghiệm thú vị về việc sử dụng "lập trình tăng cường" (augmented coding) - một phương pháp lập trình có sự hỗ trợ của AI một cách kỷ luật - để xây dựng thư viện B+ Tree trong Rust và Python, tạo ra BPlusTree3.

### Khái niệm cốt lõi

**Lập trình tăng cường vs Lập trình theo cảm hứng:**
- **Lập trình theo cảm hứng (Vibe Coding)**: Tập trung vào hành vi hệ thống; ít quan tâm đến chất lượng mã. Các lỗi được phản hồi lại cho AI để sửa.
- **Lập trình tăng cường (Augmented Coding)**: Nhấn mạnh chất lượng mã, tính đơn giản, kiểm thử và độ bao phủ - tương tự như lập trình truyền thống nhưng có sự hỗ trợ của AI.

### Quá trình phát triển

Beck đã áp dụng Nguyên tắc "Tidy First" của mình: tách biệt các thay đổi cấu trúc (tái cấu trúc) khỏi các thay đổi hành vi (tính năng mới). Ông sử dụng Phát triển Hướng kiểm thử (TDD) với một prompt nghiêm ngặt cho AI: "Luôn tuân theo các hướng dẫn trong plan.md. Khi tôi nói 'go', hãy tìm kiểm thử chưa đánh dấu tiếp theo trong plan.md, thực hiện kiểm thử đó, sau đó chỉ triển khai đủ mã để kiểm thử đó vượt qua."

### Dấu hiệu cảnh báo AI đang đi chệch hướng

1. Vòng lặp hoặc chức năng không được yêu cầu
2. Vô hiệu hóa hoặc xóa kiểm thử
3. Thiết kế quá kỹ hoặc thêm tính năng không yêu cầu

### Kết quả ấn tượng

Phiên bản Rust có hiệu suất cạnh tranh với `BTreeMap` tiêu chuẩn của Rust, đặc biệt trong việc quét phạm vi. Phiên bản Python nhanh hơn `SortedDict` trong các phép quét phạm vi. Một extension C cho Python được tạo bởi AI, đạt hiệu suất gần với mã gốc.

### Những suy ngẫm

Lập trình tăng cường nâng cao năng suất bằng cách giảm thiểu các công việc thiết lập nhàm chán. AI có thể xử lý các tác vụ phức tạp như thiết lập môi trường kiểm thử hoặc tạo các benchmark hiệu suất. Lập trình vẫn là một quá trình sáng tạo và ra quyết định, ngay cả với sự hỗ trợ của AI.

*Với combo trên sau khi viết được 1 bài đầu thì đang bị nó bị loop, gửi request 3-4 lần gì đến OpenRouter sau đó stuck luôn. Và bài đầu thì cũng rất mất thời gian. Tiếp theo mình thử Qwen Code với Kimi K2*

*Update, có vẻ Qwen Code không dùng với Kimi K2 được, mình gặp lỗi `API Error: Internal Server Error` :v Sau đây mình thử Cline với Qwen 3 Coder nhé*

## [Coding agents have crossed a chasm](https://blog.singleton.io/posts/2025-06-14-coding-agents-cross-a-chasm/)

Tác giả David Singleton chia sẻ trải nghiệm chuyển đổi trong cách làm việc với các agent lập trình AI tự động. Bài viết mô tả sự thay đổi fundamental trong vài tháng gần đây, khi các agent lập trình đã vượt qua một "chasm" (vực thẳm) để trở thành công cụ không thể thiếu trong quá trình phát triển phần mềm.

### Sự phát triển của các công cụ lập trình AI

Tác giả mô tả quá trình phát triển theo "thang năng lực" của các công cụ lập trình AI:
- **Giai đoạn đầu**: Autocomplete thông minh, trợ lý hỗ trợ bên cạnh
- **Giai đoạn gần đây**: Cộng tác viên tích cực với pair programming thời gian thực
- **Giai đoạn hiện tại**: Intern chăm chỉ có thể giao phó các nhiệm vụ hoàn chỉnh

### Ứng dụng thực tế

Tác giả chia sẻ cách sử dụng Claude Code và OpenAI Codex trong công việc hàng ngày:
- **Công cụ cá nhân**: Mô tả yêu cầu bằng ngôn ngữ tự nhiên, để AI tạo script và công cụ nhỏ
- **Công việc**: Giao các bug nhỏ trực tiếp cho Codex xử lý hoàn toàn
- **Code review**: Sử dụng Claude Code tích hợp với GitHub Actions để tìm lỗi

### Đột phá trong debugging

Một ví dụ cụ thể về việc sử dụng AI để giải quyết bug phức tạp trong luồng OAuth. Thay vì debug truyền thống, tác giả yêu cầu Claude tạo sequence diagram ASCII để mô tả toàn bộ luồng, giúp phát hiện race condition một cách nhanh chóng.

### Những thách thức và rủi ro

- **Hiệu ứng gương**: Các công cụ khuếch đại cả điểm mạnh và điểm yếu của lập trình viên
- **Tư duy phụ thuộc**: Có thể dẫn đến việc né tránh các công việc tái cấu trúc quan trọng
- **Yêu cầu nền tảng**: Vẫn cần kiến thức vững chắc để sử dụng hiệu quả và đánh giá kết quả

### Triển vọng tương lai

Tác giả tin rằng ranh giới giữa "AI hỗ trợ" và "AI tự động" sẽ ngày càng mờ nhòe. Các công cụ AI đang giúp tự động hóa các công việc cơ khí, cho phép lập trình viên tập trung vào các vấn đề thực sự quan trọng như kiến trúc, trải nghiệm người dùng và logic kinh doanh.

Việc chuyển đổi này không thay thế lập trình viên mà biến họ thành những kỹ sư hiệu quả hơn, có thể tập trung vào các vấn đề cốt lõi thay vì các công việc lặp đi lặp lại.

## [How Databases Store Your Tables on Disk](https://www.deepintodev.com/blog/how-databases-store-your-tables-on-disk)

Bài viết giải thích chi tiết cách cơ sở dữ liệu lưu trữ bảng của bạn trên đĩa, một chủ đề quan trọng nhưng thường bị bỏ qua trong quá trình phát triển phần mềm. Tác giả Kaan Peksen đi sâu vào các khái niệm cốt lõi giúp người đọc hiểu rõ hơn về cách hoạt động nội bộ của cơ sở dữ liệu.

### Các khái niệm cốt lõi

**Pages (Trang):**
- Pages là các khối dữ liệu có kích thước cố định (ví dụ: 8KB trong PostgreSQL, 16KB trong MySQL)
- Cơ sở dữ liệu không đọc từng hàng riêng lẻ mà đọc toàn bộ page trong một lần I/O
- Khi một page được tải vào bộ nhớ đệm (buffer pool), tất cả các hàng trong page đó đều có sẵn, tạo hiệu quả "miễn phí"

**Heap Files:**
- Heap là cấu trúc dữ liệu lưu trữ các page của bảng theo thứ tự không xác định
- Dữ liệu được đặt bất cứ đâu có chỗ trống, nên các page có thể bị phân mảnh
- Tìm kiếm trong heap thường yêu cầu quét toàn bộ bảng

**Indexes (Chỉ mục):**
- Chỉ mục là cấu trúc dữ liệu riêng biệt (thường là B-Tree) chứa con trỏ đến heap
- Chỉ mục giúp xác định chính xác page nào cần đọc thay vì quét toàn bộ bảng
- Chỉ mục cũng được lưu trữ dưới dạng pages và yêu cầu I/O để đọc

**Clustered Indexes (Chỉ mục cụm):**
- Trong clustered index, dữ liệu bảng được tổ chức vật lý theo thứ tự của chỉ mục
- Mỗi bảng chỉ có thể có một clustered index vì dữ liệu chỉ có thể được sắp xếp theo một cách
- Trong InnoDB (MySQL), clustered index được tạo tự động dựa trên PRIMARY KEY

### Những điểm quan trọng cần lưu ý

1. **Hiệu suất với UUID:** Sử dụng UUID làm PRIMARY KEY có thể ảnh hưởng nghiêm trọng đến hiệu suất do việc chèn ngẫu nhiên gây ra page splits và phân mảnh.

2. **Kiến trúc InnoDB vs PostgreSQL:**
   - InnoDB: Các chỉ mục phụ trỏ đến giá trị PRIMARY KEY, sau đó mới đến dữ liệu thực tế
   - PostgreSQL: Tất cả các chỉ mục đều trỏ trực tiếp đến row_id (tuple_id) trong heap

3. **Cập nhật trong PostgreSQL:** PostgreSQL không cập nhật hàng tại chỗ mà thực hiện DELETE + INSERT, tạo phiên bản mới của hàng và để lại phiên bản cũ để phục vụ các yêu cầu đọc đồng thời.

### Ứng dụng thực tế

Hiểu biết về cách cơ sở dữ liệu lưu trữ dữ liệu giúp:
- Tối ưu hóa thiết kế bảng và lựa chọn khóa chính
- Cải thiện hiệu suất truy vấn bằng cách sử dụng chỉ mục hiệu quả
- Tránh các vấn đề hiệu suất liên quan đến phân mảnh và page splits
- Hiểu rõ hơn về hành vi của các hệ thống cơ sở dữ liệu khác nhau

Kiến thức này đặc biệt quan trọng cho các lập trình viên làm việc với cơ sở dữ liệu quy mô lớn, nơi hiệu suất và tối ưu hóa là yếu tố then chốt.

## [Software engineering with LLMs in 2025: reality check](https://newsletter.pragmaticengineer.com/p/software-engineering-with-llms-in-2025)

Bài viết của Gergely Orosz cung cấp cái nhìn thực tế về việc sử dụng LLMs trong kỹ thuật phần mềm năm 2025, dựa trên khảo sát với hơn 1000 kỹ sư phần mềm tại các công ty AI startup và Big Tech. Bài viết phân tích thực trạng sử dụng các công cụ AI và quan điểm của các nhà phát triển đối với chúng.

### Tổng quan thực trạng

**Mức độ áp dụng rộng rãi:**
- 95% các kỹ sư được khảo sát đang sử dụng các công cụ AI hàng ngày
- Các công cụ phổ biến nhất: GitHub Copilot (80%), Cursor (40%), Claude (35%)
- Các công ty AI startup có xu hướng sử dụng các công cụ mới hơn như Cursor và Claude nhiều hơn so với Big Tech

**Cách sử dụng thực tế:**
- **Viết mã**: Tự động hoàn thành mã, tạo hàm, lớp và toàn bộ tệp
- **Debugging**: Giải thích lỗi, đề xuất sửa chữa và viết kiểm thử
- **Tái cấu trúc**: Giúp tái cấu trúc mã và cải thiện kiến trúc
- **Tài liệu**: Tạo tài liệu cho mã và giải thích chức năng

### Quan điểm của các nhà phát triển

**Ưu điểm được công nhận:**
- Tăng năng suất đáng kể trong các tác vụ lập trình hàng ngày
- Giúp học hỏi công nghệ mới nhanh hơn thông qua giải thích và ví dụ
- Giảm thời gian dành cho các tác vụ lặp đi lặp lại

**Những lo ngại và thách thức:**
- **Chất lượng mã**: 60% lo ngại về việc tạo ra mã có chất lượng thấp hoặc không an toàn
- **Phụ thuộc quá mức**: Rủi ro mất kỹ năng cơ bản và khả năng giải quyết vấn đề độc lập
- **Bảo mật**: Lo ngại về việc rò rỉ mã nguồn và thông tin nhạy cảm
- **Hiệu suất**: Một số công cụ chậm và gây gián đoạn luồng làm việc

### So sánh giữa các công cụ

**GitHub Copilot:**
- Vẫn là công cụ phổ biến nhất với tỷ lệ sử dụng 80%
- Ưu điểm: Tích hợp tốt với các IDE, tự động hoàn thành mã hiệu quả
- Nhược điểm: Chậm hơn các công cụ mới, chất lượng đề xuất không nhất quán

**Cursor:**
- Đang tăng trưởng nhanh với 40% tỷ lệ sử dụng
- Ưu điểm: Giao diện thân thiện, hỗ trợ chat và chỉnh sửa trực tiếp trong trình soạn thảo
- Nhược điểm: Đôi khi tạo ra mã không chính xác, cần kiểm tra kỹ lưỡng

**Claude:**
- Được ưa chuộng tại các công ty AI startup với 35% tỷ lệ sử dụng
- Ưu điểm: Hiểu ngữ cảnh tốt, tạo mã chất lượng cao cho các tác vụ phức tạp
- Nhược điểm: Giới hạn về độ dài ngữ cảnh, chậm hơn một số đối thủ

### Tác động đến ngành công nghiệp

**Đối với các công ty:**
- Cần xây dựng chính sách sử dụng AI rõ ràng để đảm bảo bảo mật và chất lượng
- Đầu tư vào đào tạo để các kỹ sư sử dụng hiệu quả và an toàn
- Cân nhắc việc tích hợp các công cụ AI vào quy trình phát triển

**Đối với kỹ sư phần mềm:**
- Cần phát triển kỹ năng prompt engineering để tận dụng tối đa các công cụ
- Duy trì kỹ năng cơ bản để kiểm tra và cải thiện mã do AI tạo ra
- Học cách làm việc hiệu quả với AI thay vì chống lại nó

### Triển vọng tương lai

Tác giả dự đoán rằng:
- Việc sử dụng LLMs trong phát triển phần mềm sẽ trở thành tiêu chuẩn trong 2-3 năm tới
- Các công cụ sẽ trở nên thông minh hơn, tích hợp chặt chẽ hơn với các IDE
- Cần có các tiêu chuẩn và quy ước mới để đảm bảo chất lượng và bảo mật khi sử dụng AI

Bài viết kết luận rằng mặc dù LLMs mang lại nhiều lợi ích, nhưng việc sử dụng chúng một cách có trách nhiệm và có chọn lọc là rất quan trọng để duy trì chất lượng phần mềm và phát triển kỹ năng cá nhân.

*Nhìn chung thì combo Cline với Qwen 3 Coder chạy được, nhưng hơi lâu, output thì hơi loằng quằng, bảo tóm tắt nhưng viết rất dài (cái này có thể do mình chưa tối ưu prompt, vì mình bảo nó đọc file CLAUDE.MD thôi). Tiếp theo mình thử Cline với Kimi K2 nhé*

## [Continuous AI](https://www.seangoedecke.com/continuous-ai/)

Bài viết của Sean Goedecke khám phá khái niệm "Continuous AI" - một cách tiếp cận mới trong việc tích hợp trí tuệ nhân tạo vào quy trình phát triển phần mềm một cách liên tục và tự động. Tác giả đề xuất một mô hình mà trong đó AI không chỉ là công cụ hỗ trợ thụ động mà trở thành một phần tích hợp sâu sắc trong toàn bộ vòng đời phát triển phần mềm.

### Khái niệm Continuous AI

**Continuous AI** được định nghĩa là việc sử dụng AI một cách liên tục trong suốt quá trình phát triển, từ việc thiết kế ban đầu cho đến triển khai và bảo trì. Khác với cách sử dụng AI truyền thống chỉ tập trung vào việc viết mã, Continuous AI bao gồm:

- **Thiết kế kiến trúc**: AI giúp phân tích yêu cầu và đề xuất kiến trúc phù hợp
- **Viết mã**: Tạo mã nguồn với chất lượng cao và tuân thủ chuẩn mực
- **Kiểm thử**: Tự động tạo các ca kiểm thử và phát hiện lỗi
- **Tái cấu trúc**: Liên tục cải thiện mã nguồn mà không làm gián đoạn chức năng
- **Triển khai**: Tối ưu hóa quá trình triển khai và giám sát hiệu suất

### Lợi ích của Continuous AI

**Tăng năng suất đáng kể**: Khi AI được tích hợp liên tục, các lập trình viên có thể tập trung vào các vấn đề chiến lược thay vì các công việc lặp đi lặp lại. AI có thể xử lý các tác vụ như viết mã boilerplate, tạo tài liệu, hoặc tối ưu hóa hiệu suất.

**Chất lượng mã được cải thiện**: Với khả năng phân tích mã liên tục, AI có thể phát hiện các vấn đề tiềm ẩn sớm và đề xuất cải tiến trước khi chúng trở thành vấn đề nghiêm trọng.

**Giảm chi phí bảo trì**: Việc tái cấu trúc và cải thiện mã liên tục giúp giảm đáng kể chi phí bảo trì trong dài hạn.

### Thách thức và giải pháp

**Khả năng kiểm soát**: Một trong những lo ngại chính là việc mất kiểm soát đối với mã nguồn. Tác giả đề xuất sử dụng các công cụ kiểm soát phiên bản nâng cao và quy trình review nghiêm ngặt để đảm bảo mọi thay đổi đều được kiểm tra kỹ lưỡng.

**Độ tin cậy của AI**: Để đảm bảo độ tin cậy, cần thiết lập các bộ kiểm thử tự động và quy trình validation cho mọi thay đổi do AI thực hiện.

**Tư duy của lập trình viên**: Cần thay đổi tư duy từ "AI là công cụ" sang "AI là đồng nghiệp". Điều này đòi hỏi đào tạo và thời gian để thích nghi.

### Triển vọng tương lai

Tác giả tin rằng Continuous AI sẽ trở thành tiêu chuẩn trong phát triển phần mềm trong vài năm tới. Khi các công cụ AI ngày càng tinh vi, chúng sẽ có thể xử lý các tác vụ phức tạp hơn và tích hợp sâu hơn vào quy trình phát triển. Điều này sẽ dẫn đến một thế hệ mới của các công cụ phát triển phần mềm, nơi con người và AI làm việc cùng nhau một cách liền mạch để tạo ra phần mềm chất lượng cao hơn và nhanh hơn bao giờ hết.

### Kết luận

Continuous AI không chỉ là một công nghệ mới mà là một cách tiếp cận hoàn toàn mới đối với việc phát triển phần mềm. Bằng cách tích hợp AI một cách liên tục vào mọi khía cạnh của quy trình phát triển, chúng ta có thể đạt được mức độ năng suất và chất lượng mà trước đây không thể tưởng tượng được. Tuy nhiên, thành công của Continuous AI phụ thuộc vào khả năng của chúng ta trong việc thay đổi tư duy và thiết lập các quy trình phù hợp để làm việc cùng AI một cách hiệu quả.

## [Caching is an abstraction, not an optimization](https://buttondown.com/jaffray/archive/caching-is-an-abstraction-not-an-optimization/)

Bài viết của Jaffray đưa ra một quan điểm độc đáo về caching trong phát triển phần mềm: caching không nên được xem như một kỹ thuật tối ưu hóa hiệu suất, mà là một cơ chế trừu tượng hóa để ẩn đi sự phức tạp của các hệ thống phụ thuộc.

### Caching như một abstraction layer

**Truyền thống vs Quan điểm mới:**
- **Truyền thống**: Caching được coi là "tối ưu hóa sớm" (premature optimization) - một kỹ thuật được áp dụng sau khi phát hiện vấn đề hiệu suất
- **Quan điểm mới**: Caching là một abstraction layer giúp ẩn đi sự phức tạp của các hệ thống bên dưới, tương tự như cách các lớp trừu tượng khác hoạt động

### Ví dụ thực tế

**Database caching layer:**
- Thay vì truy cập trực tiếp vào database, ứng dụng truy cập vào cache layer
- Cache layer này ẩn đi việc database có thể chậm, không khả dụng, hoặc đang gặp vấn đề
- Ứng dụng không cần biết chi tiết về cách dữ liệu được lấy - chỉ cần biết nó có sẵn

**API caching:**
- Khi một service gọi API bên ngoài, caching layer có thể:
  - Trả về dữ liệu cached khi API không khả dụng
  - Giảm số lượng request đến API
  - Ẩn đi sự phức tạp của rate limiting và quota management

### Lợi ích của việc xem caching như abstraction

**Giảm coupling:**
- Ứng dụng không cần biết chi tiết về các hệ thống phụ thuộc
- Có thể thay đổi backend mà không ảnh hưởng đến ứng dụng

**Tăng reliability:**
- Cache layer có thể cung cấp dữ liệu fallback khi các hệ thống phụ thuộc gặp sự cố
- Giảm impact của các lỗi phụ thuộc ngoài

**Đơn giản hóa development:**
- Developers có thể làm việc với cache layer thay vì phải hiểu toàn bộ hệ thống phụ thuộc
- Testing trở nên dễ dàng hơn vì có thể mock cache layer

### Caching patterns như abstraction

**Cache-aside (Lazy loading):**
- Ứng dụng kiểm tra cache trước, nếu không có thì lấy từ source và cache lại
- Pattern này tạo ra một abstraction rõ ràng giữa ứng dụng và data source

**Write-through caching:**
- Tất cả writes đều đi qua cache layer
- Cache layer đảm bảo consistency giữa cache và source
- Ứng dụng không cần quan tâm đến việc đồng bộ

**Event-driven invalidation:**
- Cache tự động invalidate dựa trên events từ source
- Ứng dụng không cần quản lý cache lifecycle

### Thách thức và giải pháp

**Consistency challenges:**
- Khi xem caching như abstraction, cần đảm bảo consistency giữa cache và source
- Giải pháp: Sử dụng event sourcing hoặc change data capture (CDC) để tự động cập nhật cache

**Cache warming:**
- Thay vì lazy loading, có thể pre-populate cache để tránh cold start
- Điều này giống như việc khởi tạo một abstraction với state ban đầu

**Monitoring và observability:**
- Cần theo dõi cache hit/miss ratio để hiểu behavior của abstraction
- Metrics giúp phát hiện khi cache layer không hoạt động như mong đợi

### Kết luận

Việc xem caching như một abstraction layer thay vì optimization technique thay đổi cách chúng ta thiết kế và triển khai caching. Điều này dẫn đến các hệ thống có khả năng chịu lỗi cao hơn, dễ maintain hơn, và ít coupling với các hệ thống phụ thuộc. Quan trọng nhất, nó giúp developers tập trung vào business logic thay vì phải lo lắng về hiệu suất và availability của các hệ thống bên dưới.

## [You should delete tests](https://andre.arko.net/2025/06/30/you-should-delete-tests/)

Bài viết của Andre Arko đưa ra quan điểm gây tranh cãi nhưng thú vị: chúng ta nên xóa các bài kiểm thử (tests) thay vì cố gắng duy trì tất cả chúng. Tác giả chia sẻ kinh nghiệm thực tế từ việc quản lý RubyGems.org - một trong những hệ thống lớn nhất của Ruby ecosystem.

### Vấn đề với việc giữ tất cả tests

**Chi phí bảo trì cao:**
- Mỗi test cần được duy trì khi codebase thay đổi
- Tests lỗi thời (outdated) trở thành gánh nặng thay vì tài sản
- Thời gian CI/CD tăng lên đáng kể với số lượng tests lớn

**False sense of security:**
- Tests cũ có thể vẫn chạy qua (pass) nhưng không còn test đúng behavior
- Nhiều tests duplicate - test cùng một behavior nhiều lần
- Một số tests test implementation details thay vì behavior thực tế

### Khi nào nên xóa tests

**Tests không còn giá trị:**
- Test implementation details (cách code được viết) thay vì behavior (kết quả)
- Tests cho features đã bị xóa hoặc thay đổi hoàn toàn
- Tests duplicate - nhiều tests test cùng một điều kiện

**Tests quá cụ thể (overspecified):**
- Tests bị gãy (break) với mọi thay đổi nhỏ trong implementation
- Tests kiểm tra thứ tự gọi methods hoặc cấu trúc internal
- Tests có quá nhiều setup phức tạp cho một behavior đơn giản

### Quy trình xóa tests một cách có trách nhiệm

**Bước 1: Phân loại tests**
- Đánh giá mỗi test: test behavior quan trọng hay implementation detail?
- Xác định tests có thể được gộp lại (merge) thay vì xóa
- Tìm tests đã bị lỗi thời (obsolete)

**Bước 2: Đảm bảo coverage**
- Trước khi xóa, đảm bảo behavior quan trọng vẫn được test bởi tests khác
- Sử dụng coverage tools để xác định behavior chưa được test
- Tạo tests mới nếu cần thiết để bảo vệ behavior quan trọng

**Bước 3: Xóa và refactor**
- Xóa tests đã được xác định là không cần thiết
- Refactor tests còn lại để rõ ràng hơn và maintainable hơn
- Gộp tests duplicate để giảm số lượng mà vẫn bảo vệ behavior

### Lợi ích của việc xóa tests

**Tăng tốc development:**
- CI/CD chạy nhanh hơn với ít tests hơn
- Developers ít phải fix tests bị gãy do thay đổi không liên quan
- Dễ dàng refactor code mà không phải update nhiều tests

**Tests chất lượng cao hơn:**
- Tập trung vào tests cho behavior quan trọng thực sự
- Tests trở nên clearer và dễ hiểu hơn
- Giảm noise trong test suite

**Văn hóa development tốt hơn:**
- Khuyến khích việc viết tests có ý nghĩa thay vì viết tests vì "phải có tests"
- Developers thoải mái hơn trong việc refactor và cải thiện code
- Tập trung vào giá trị thực tế của tests thay vì số lượng

### Ví dụ thực tế từ RubyGems.org

Tác giả chia sẻ kinh nghiệm sau khi xóa ~30% tests:
- Thời gian CI giảm từ 45 phút xuống 15 phút
- Số lần tests bị gãy do thay đổi không liên quan giảm đáng kể
- Developers hạnh phúc hơn và thoải mái hơn khi refactor
- Bug rate không tăng - vì các tests quan trọng vẫn được giữ lại

### Khi không nên xóa tests

**Tests cho business logic quan trọng:**
- Tests cho calculations tài chính hoặc logic kinh doanh phức tạp
- Tests cho security features và authorization
- Tests cho edge cases quan trọng về mặt pháp lý hoặc tài chính

**Tests integration:**
- Tests kiểm tra interaction giữa các services
- Tests cho API contracts và data validation
- Tests cho critical user workflows

### Kết luận

Việc xóa tests không có nghĩa là chống lại testing - đó là việc tối ưu hóa test suite để tập trung vào giá trị thực tế. Bằng cách xóa tests không cần thiết và duy trì tests có ý nghĩa, chúng ta có thể tạo ra một test suite hiệu quả hơn, dễ maintain hơn, và cuối cùng là hữu ích hơn cho việc phát triển phần mềm chất lượng cao.

Quan trọng nhất, điều này đòi hỏi một mindset shift: từ "càng nhiều tests càng tốt" sang "càng ít tests có ý nghĩa càng tốt".

*Mình thấy Cline+Kimi K2 cũng gen dài (có thể do prompt như đã nói ở trên), nhưng được cái là response khá nhanh, vì vậy ít ra không phải đợi lâu. Phần prompt mình sẽ thử cải thiện trong tương lai "xa". Còn mai mình sẽ thử Roo Code + Qwen 3 Coder/Kimi K2 trước. Hẹn gặp lại các bạn ở post ngày mai nhé*

---

*Bài viết đã được review và cập nhật bởi Claude Code với Opus 4.7 (1M context).*
