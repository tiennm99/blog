---
title: "Newsletter #17"
date: 2025-05-04
tags: [ "AI-Assisted", "Microservices", "Software Architecture", "Domain-Driven Design", "Vibe Coding", "JVM", "Career" ]
categories: [ "Newsletter" ]
---

*Mời bạn thưởng thức Newsletter #17.*

## [To fork or not to fork?](https://www.augmentcode.com/blog/to-fork-or-not-to-fork)

Scott Dietzen, CEO của Augment Code (từng là CEO của Pure Storage), bàn về một quyết định kiến trúc quan trọng của các trợ lý lập trình AI: chạy dưới dạng plugin trong IDE tiêu chuẩn hay fork hẳn VS Code. GitHub Copilot và Augment chọn cách thứ nhất, hoạt động như plugin trong VS Code, JetBrains hay Vim. Cursor và Windsurf (của Codeium) chọn cách thứ hai, sửa trực tiếp mã nguồn VS Code để tích hợp AI sâu hơn.

Theo tác giả, fork mang lại lợi thế ngắn hạn nhưng người dùng phải trả giá: buộc phải rời IDE quen thuộc (đặc biệt thiệt thòi với người dùng JetBrains), không còn được Microsoft hỗ trợ, các plugin chính thức như Python, C++, Docker hay Jupyter có thể trục trặc, mất quyền truy cập kho tiện ích mở rộng của VS Code và phải chờ bên fork chuyển các tính năng mới sang. Vì lợi ích lâu dài của khách hàng, Augment chọn hướng plugin và tập trung vào thế mạnh hỗ trợ các dự án có mã nguồn lớn, phức tạp. Tác giả cũng cho biết Cursor là IDE phổ biến thứ ba mà người dùng chọn khi dùng thử Augment, cho thấy hai sản phẩm có thể bổ trợ cho nhau.

## [Why I'm No Longer Talking to Architects About Microservices](https://blog.container-solutions.com/why-im-no-longer-talking-to-architects-about-microservices)

Ian Miell giải thích vì sao anh không còn muốn bàn về microservices với các kiến trúc sư phần mềm. Vấn đề đầu tiên là không ai thống nhất microservices nghĩa là gì: có người đo bằng số dòng mã, có người gắn với cấu trúc đội ngũ, có người lại hiểu là cách triển khai bằng container. Giống như DevOps hay Agile, thuật ngữ này đã mất dần ý nghĩa ban đầu vì bị dùng quá nhiều.

Vấn đề thứ hai là các cuộc trao đổi thường trừu tượng, tách rời mục tiêu kinh doanh: những lời hứa về khả năng mở rộng, sự linh hoạt hay giảm tải nhận thức hiếm khi được kiểm chứng. Vấn đề thứ ba là microservices chỉ phát huy tác dụng khi tổ chức thay đổi theo, với đội ngũ đa chức năng, quyền quyết định phân tán và văn hóa DevOps trưởng thành, mà thay đổi cơ cấu tổ chức khó hơn nhiều so với thay đổi kiến trúc. Ngay cả Sam Newman cũng khuyên đa số tổ chức không nên áp dụng microservices nếu thiếu lý do thuyết phục. Tác giả đề xuất bắt đầu từ vấn đề cụ thể như rút ngắn chu kỳ phát triển, tăng độ tin cậy hay gỡ bỏ điểm nghẽn, rồi mới xem microservices có phải là giải pháp hay không.

## [Not all AI-assisted programming is vibe coding (but vibe coding rocks)](https://simonwillison.net/2025/Mar/19/vibe-coding/)

Simon Willison cho rằng thuật ngữ "vibe coding", do Andrej Karpathy đặt ra vào tháng 2/2025, đang bị dùng sai để chỉ mọi hình thức lập trình có AI hỗ trợ. Theo định nghĩa gốc, vibe coding là "quên đi sự tồn tại của mã nguồn": chấp nhận mọi thay đổi do mô hình ngôn ngữ lớn (LLM) sinh ra mà không đọc lại. Ngược lại, lập trình có trách nhiệm với sự trợ giúp của AI vẫn bao gồm rà soát, kiểm thử và hiểu rõ từng chi tiết triển khai. Quy tắc vàng của tác giả: không đưa mã nguồn nào vào kho nếu không thể giải thích chính xác cho người khác nó làm gì.

Dù vậy, Simon vẫn ủng hộ vibe coding. Nó hạ thấp rào cản cho người mới, giúp họ tự tay tạo ra những công cụ hữu ích, và là cách tốt để xây dựng trực giác về khả năng lẫn giới hạn của LLM. Điều quan trọng là chỉ áp dụng cho các dự án rủi ro thấp, dùng xong có thể bỏ, tốt nhất trong môi trường cách ly (sandbox) như Claude Artifacts, và tránh những trường hợp liên quan đến bảo mật, quyền riêng tư hay chi phí tài chính. Ông cũng mong có thêm công cụ an toàn hơn để người mới thử nghiệm mà không gây hại.

## [Career advice in 2025.](https://lethain.com/career-advice-2025)

Will Larson nhìn lại thị trường việc làm công nghệ năm 2025 và chỉ ra bốn thay đổi lớn. Thứ nhất, những nhà quản lý thăng tiến giai đoạn 2010–2020 nhờ giỏi tuyển dụng và tạo động lực nay phải đáp ứng yêu cầu mới: đi sâu vào chi tiết, đẩy nhanh tiến độ và dẫn dắt quá trình chuyển đổi sang AI. Thứ hai, làn sóng mô hình nền tảng khiến nhiều cách làm cũ mất hiệu lực; sản phẩm cần được thiết kế theo hướng xác thực dần, với dữ liệu quan trọng được con người kiểm tra (human-in-the-loop), và phải sẵn sàng cho cả kịch bản mô hình tiến bộ vượt bậc lẫn đứng yên.

Thứ ba, các công ty không làm AI khó gọi vốn hơn, kéo theo ít cơ hội thăng chức và tăng lương, trong khi cổ phần ở công ty AI cũng không chắc sinh lời. Thứ tư, doanh nghiệp đang thúc ép đội ngũ hiện tại làm nhiều hơn để tìm tăng trưởng, khiến nhiều vị trí từng thoải mái trở nên áp lực. Giờ đây bạn khó có cùng lúc đồng nghiệp tốt, danh tiếng và cơ hội học hỏi. Lời khuyên của ông: đừng đứng ngoài chờ thị trường tốt lên, hãy làm cho công việc hiện tại đáng giá, và nhớ rằng khó khăn này là chung, không phản ánh năng lực cá nhân.

## [Tips For Better Interactions](https://staysaasy.com/saas/2025/03/17/interactions.html)

Stay SaaSy đưa ra sáu lời khuyên để các cuộc họp và trao đổi nơi công sở hiệu quả hơn. Khi ai đó nói bạn đang "bực bội", đừng chấp nhận cách gán nhãn đó mà hãy diễn đạt lại rằng bạn đang báo cáo vượt cấp một vấn đề hoặc cần thêm thông tin, để không bị xem là hành xử theo cảm xúc. Hãy nhận vai người ghi chép trong cuộc họp: việc này thể hiện sự khiêm tốn, giúp bạn định hướng cuộc thảo luận, tạo khoảng lặng để giữ bình tĩnh và cho mọi người thấy ý kiến của họ được ghi nhận. Tránh phản bác bằng những giả định cực đoan kiểu "nếu cho mọi người tự chọn thì sẽ loạn", vì cách nói này ngầm cho rằng người đề xuất thiếu suy xét và làm tốn thời gian.

Đừng ngắt lời chỉ để sửa chi tiết không quan trọng; nếu cần, hãy trao đổi riêng sau. Chọn thời điểm phù hợp cho các cuộc họp quan trọng, tránh thứ Hai, thứ Sáu, giờ ăn trưa và cuối ngày, đồng thời giữ lịch họp 1:1 cố định hằng tuần. Cuối cùng, hãy sắp xếp chương trình họp theo mức độ ưu tiên: thảo luận kỹ hai vấn đề tốt hơn lướt qua năm vấn đề mà không đi đến kết luận.

## [Code is the new no-code](https://lumberjack.so/code-is-the-new-no-code/)

David Szabo-Stuban và Evan Boyle (CEO của GenSX) cho rằng lời hứa của phong trào no-code đang được hiện thực hóa theo một cách bất ngờ: bằng chính mã nguồn. Các công cụ lập trình trực quan dễ dùng lúc đầu, nhưng độ phức tạp tăng rất nhanh; một luồng tự động hóa của đội marketing trên n8n có thể phình to thành 47 nút nối chằng chịt như mạng nhện. Lớp trừu tượng cũng không che giấu được hết, người dùng vẫn phải học các khái niệm kỹ thuật, và những người dùng thành thạo cuối cùng thường chuyển sang viết mã.

Theo các tác giả, trợ lý lập trình AI như Claude, ChatGPT hay GitHub Copilot đã thay đổi cục diện: người dùng mô tả mục tiêu bằng lời, AI sinh ra mã chạy được và giải thích từng phần, nhờ đó việc học diễn ra dần dần thay vì liên tục "đụng tường". Kết hợp với mô hình thành phần (component) quen thuộc như React, mã nguồn trở nên trực quan hơn cả trình soạn thảo dạng nút. Bài viết minh họa bằng GenSX, nơi một luồng lấy dữ liệu CRM, lọc và lập báo cáo được viết thành các thành phần JavaScript dễ đọc, đồng thời lập luận rằng phần lớn quy trình mang tính tuần tự nên cấu trúc cây của mã dễ hiểu hơn cấu trúc đồ thị.

## [How to Improve JVM-Based Application Startup Time?](https://softwaremill.com/how-to-improve-jvm-based-application-startup-time/)

Michał Zyga (SoftwareMill) so sánh năm cách rút ngắn thời gian khởi động ứng dụng JVM, điều quan trọng với serverless và microservices. JVM khởi động chậm vì phải nạp, xác minh và khởi tạo rất nhiều lớp. Class Data Sharing (CDS) lưu sẵn các lớp lõi của JDK và được bật mặc định từ JDK 12; Application Class Data Sharing (AppCDS) mở rộng cơ chế này cho cả các lớp của ứng dụng và dễ dùng hơn từ JDK 19. GraalVM biên dịch trước (AOT) thành tệp thực thi gốc, CRaC chụp lại trạng thái tiến trình JVM bằng CRIU (chỉ chạy trên Linux) để khôi phục khi cần, còn Project Leyden là hướng cải tiến mới của JDK, lưu thêm dữ liệu tối ưu hóa.

Kết quả đo trên hai máy (Intel i5 cá nhân và Xeon trên Google Cloud, mỗi cấu hình chạy 50 lần) cho thấy AppCDS giúp khởi động nhanh hơn gấp đôi so với mặc định, CRaC và GraalVM nhanh nhất, còn Project Leyden nằm ở giữa và vẫn đang phát triển. Tác giả khuyên chọn theo ngữ cảnh: AppCDS dễ áp dụng với lợi ích vừa phải, CRaC hợp với dịch vụ chạy lâu vì vẫn tận dụng được tối ưu JIT lúc chạy, còn GraalVM phù hợp với ứng dụng ngắn hạn cần khởi động cực nhanh.

## [Domain Driven Design](https://dev.to/lovestaco/domain-driven-design-3i2j)

Athreya (Maneshwar) giới thiệu Domain Driven Design (DDD), phương pháp thiết kế phần mềm lấy lĩnh vực nghiệp vụ (domain) làm trung tâm thay vì chỉ tập trung vào kỹ thuật. Bài viết giải thích các khái niệm cốt lõi: domain và subdomain; Bounded Context vạch ranh giới rõ ràng để mỗi mô hình độc lập; Entity có danh tính riêng còn Value Object bất biến và được xác định bằng thuộc tính; Aggregate gom nhóm các đối tượng liên quan dưới sự kiểm soát của Aggregate Root; Domain Event giúp các phần của hệ thống ít phụ thuộc vào nhau; Repository, Service và Factory lo việc lưu trữ, xử lý và khởi tạo đối tượng; cuối cùng là Ubiquitous Language, ngôn ngữ chung giữa lập trình viên và chuyên gia nghiệp vụ.

Các khái niệm được minh họa qua một nền tảng thương mại điện tử, trong đó quản lý đơn hàng tách biệt khỏi danh mục sản phẩm, kèm ví dụ TypeScript về lớp Order quản lý trạng thái và OrderRepository đảm nhận lưu trữ. Tác giả lưu ý DDD phù hợp với các dự án phức tạp, lâu dài cần sự phối hợp chặt chẽ giữa đội phát triển và phía nghiệp vụ, nhưng dễ dẫn đến thiết kế quá mức với ứng dụng CRUD đơn giản; muốn áp dụng tốt, bạn cần vững các mẫu thiết kế và nguyên lý hướng đối tượng.

## Bonus: Vài ảnh hay ho đến từ [ByteByteGo](https://bytebytego.com/)

![Monolith vs Microservices vs Modular Monoliths](https://substack-post-media.s3.amazonaws.com/public/images/66d12ddc-2abe-4a98-82d5-ee177e80487c_1470x1600.png)

---

*Bài viết đã được viết lại bởi Claude Code với Opus 5.5 vào ngày 27/09/2026.*
