---
title: "Newsletter #84"
date: 2026-02-26
tags: ["AI-Assisted", "Newsletter", "AI Coding", "Performance", "Go", "Clean Architecture", "Software Engineering"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #84.*

## [Automatic programming](https://antirez.com/news/159)

Antirez, tác giả của Redis, dùng thuật ngữ "lập trình tự động" (automatic programming) để gọi quá trình viết phần mềm với sự hỗ trợ của AI, và ông tin rằng chẳng bao lâu nữa đó sẽ chỉ đơn giản là "viết phần mềm". Ông tách bạch nó với "vibe coding": vibe coding là để mô hình ngôn ngữ tự sinh ra phần mềm từ một mô tả chung chung, người dùng gần như đứng ngoài quá trình và chỉ báo lại khi có gì đó không chạy. Lập trình tự động thì khác: người lập trình hiểu rõ chuyện gì đang diễn ra, liên tục định hướng mô hình theo tầm nhìn của mình ở nhiều cấp độ, từ kiến trúc tổng thể cho đến việc chỉ AI cách viết một hàm cụ thể, và quyết định cả việc *làm gì*. Vì thế cùng một mô hình nhưng kết quả sẽ rất khác nhau tùy vào người cầm lái.

Antirez khẳng định mã nguồn tạo ra theo cách đó là của bạn và bạn có quyền tự hào về nó. Dữ liệu huấn luyện ban đầu của mô hình vốn do con người tạo ra, nên đó giống một món quà tập thể hơn là thứ chiếm đoạt của người khác. Ông lấy Redis làm ví dụ: về mặt kỹ thuật, Redis không có nhiều điểm mới, chỉ là tập hợp các cấu trúc dữ liệu cơ bản và mã nguồn mạng mà lập trình viên hệ thống nào có năng lực cũng viết được; nó trở nên hữu ích nhờ ý tưởng và tầm nhìn bên trong. Kết luận của ông: lập trình giờ đã có thể tự động, còn tầm nhìn thì (hiện tại) vẫn chưa.

## [Software Performance Engineering: The Ideas I Keep Coming Back To](https://ricomariani.medium.com/software-performance-engineering-the-ideas-i-keep-coming-back-to-6f421b6a9505)

Rico Mariani tổng kết 8 ý tưởng về kỹ thuật hiệu năng cứ lặp lại bất kể ngôn ngữ hay thời kỳ, với thông điệp chung: hiệu năng không nằm ở thủ thuật hay mã nguồn khéo léo mà ở cách tư duy. Trước hết, hiệu năng là vấn đề của cả hệ thống: các sự cố khó thường bắt nguồn từ kiến trúc như cấp phát bộ nhớ quá nhiều, tính cục bộ dữ liệu kém, đồng bộ hóa ngầm hay tăng trưởng không kiểm soát, chứ hiếm khi do một hàm chậm đơn lẻ. Các lớp trừu tượng (abstraction) không miễn phí mà chỉ che giấu chi phí, nên bạn cần biết chúng thực sự triển khai thành gì và chạy bao nhiêu lần. Mô hình chi phí quan trọng hơn API: hai API trông tương đương có thể chênh nhau 10 lần vì một bên cấp phát ở mỗi lần gọi hoặc chạm vào vùng nhớ nguội. Profiler chỉ cho biết thời gian tiêu tốn ở *đâu* chứ không phải *vì sao*.

Bộ nhớ mới là nút thắt thực sự, vì khoảng cách tốc độ giữa CPU và bộ nhớ ngày càng lớn. Câu "tối ưu sớm là nguồn gốc của mọi tội lỗi" thường bị hiểu sai: vấn đề thật là thiết kế hệ thống mà không hề hiểu chi phí, dẫn đến "bi quan hóa sớm" (premature pessimization). Ngôn ngữ lập trình cũng định hình cách con người suy nghĩ về chi phí; ngôn ngữ thể hiện rõ quyền sở hữu và vòng đời dữ liệu giúp dễ suy luận hơn. Cuối cùng, hiệu năng suy giảm dần qua hàng nghìn thay đổi nhỏ gần như vô hình, nên cần định kỳ đối chiếu ý định thiết kế với thực tế.

## [Go's synctest is amazing](https://oblique.security/blog/go-synctest/)

Eric Chiang từ Oblique chia sẻ kinh nghiệm dùng gói `testing/synctest` của Go 1.25 để kiểm thử một phần mã nguồn đầy vòng lặp chạy nền, như xóa bản ghi hết hạn trong cơ sở dữ liệu hay bầu chọn leader giữa các instance. Điểm được nhắc đến nhiều nhất là synctest chạy kiểm thử trong một "bong bóng" với đồng hồ ảo, nên `time.Sleep` gần như hoàn tất tức thì. Nhưng theo tác giả, giá trị lớn hơn là khả năng suy luận một cách xác định về *thứ tự* các sự kiện. Synctest chỉ đẩy thời gian tới khi mọi goroutine trong bong bóng đều bị chặn, chủ yếu ở thao tác channel, wait group hoặc các hàm thời gian, rồi tiến đồng hồ vừa đủ để mở khóa lần gọi sleep ngắn nhất. Nhờ vậy có thể dùng thời gian làm công cụ đồng bộ hóa, điều vốn không nên làm trong chương trình thông thường; chẳng hạn một vòng lặp chờ mỗi phút sẽ luôn chạy đúng ba lần sau ba phút ảo.

Áp dụng vào thực tế, chỉ cần sleep lâu hơn chu kỳ của `RunDeleteExpiredSessions`, test sẽ biết chắc lần xóa phiên hết hạn đã hoàn tất trước khi kiểm tra kết quả, và toàn bộ test chạy chưa tới một giây. Nhóm của tác giả còn áp dụng synctest cho logic bầu chọn leader gồm hàng chục vòng lặp mà không phải sửa mã nguồn, dừng ở bất kỳ thời điểm nào để kiểm tra trạng thái cơ sở dữ liệu. Tác giả lưu ý vẫn cần hiểu thao tác nào được tính là bị chặn và đảm bảo mọi goroutine được dọn dẹp đúng cách.

## [Why Clean Architecture Confuses Everyone (And How I Learned to Stop Worrying)](https://dev.to/rpereira15/why-clean-architecture-confuses-everyone-and-how-i-learned-to-stop-worrying-1i5k)

Rômulo Pereira, với hơn 10 năm làm phần mềm, giải thích vì sao Clean Architecture khiến nhiều người bối rối: các nhóm tranh luận hàng giờ về cấu trúc thư mục mà bỏ lỡ điểm cốt lõi. Framework như Spring Boot khiến việc vi phạm nguyên tắc trở nên quá dễ, chỉ cần thêm một annotation là logic nghiệp vụ đã phụ thuộc vào JPA, Jackson và nhiều thứ khác. Cách tổ chức theo tầng kỹ thuật (controller, service, repository, model) cũng kéo bạn vào tư duy công nghệ; tổ chức theo tính năng (order, product, customer) giúp bạn nghĩ về việc hệ thống *làm gì*. Từ kinh nghiệm xây dựng hệ thống tính cước lưu lượng lớn và nền tảng dữ liệu thời gian thực, tác giả cho rằng logic nghiệp vụ nên "nhàm chán": không quan tâm dữ liệu lưu ở đâu, yêu cầu đến qua REST hay hàng đợi thông điệp, hay dùng framework nào. Đừng tạo interface chỉ vì "clean architecture cần ports và adapters"; interface chỉ có đúng một cài đặt mãi mãi thì chỉ là nghi thức.

Phép thử thực sự là khả năng thay đổi: bạn có thể đổi cơ sở dữ liệu, chuyển REST sang GraphQL hay thay framework mà không đụng vào logic nghiệp vụ không? Cách tác giả làm là viết các use case thuần túy không annotation, rồi đặt phần Spring ở ranh giới hệ thống. Thay vì tranh cãi về tên package, hãy tự hỏi logic nghiệp vụ có dễ kiểm thử không, mỗi lần nâng cấp framework phải sửa bao nhiêu file, và người mới có hiểu được hệ thống làm gì không. Hãy bắt đầu đơn giản, giữ quy tắc nghiệp vụ sạch sẽ và kiểm thử chúng mà không cần giả lập cả thế giới.

## [The third golden age of software engineering – thanks to AI](https://newsletter.pragmaticengineer.com/p/the-third-golden-age-of-software)

Trong tập podcast này của The Pragmatic Engineer, Gergely Orosz trò chuyện với Grady Booch, người đồng sáng tạo UML và là Chief Scientist về kỹ thuật phần mềm tại IBM. Booch chia lịch sử ngành thành ba "thời kỳ hoàng kim": thời kỳ thứ nhất xoay quanh thuật toán (thập niên 1940 đến 1970), thời kỳ thứ hai là các lớp trừu tượng hướng đối tượng (1970 đến 2000), và thời kỳ thứ ba hiện nay là về hệ thống. Thời kỳ này bắt đầu khi mức trừu tượng nâng lên thành cả thư viện và nền tảng, chứ không phải từ làn sóng AI. Ông nhắc rằng khủng hoảng hiện sinh chẳng có gì mới: khi trình biên dịch và ngôn ngữ bậc cao ra đời, lập trình viên cũng từng sợ bị thay thế, và nghề vẫn tiến hóa. Các công cụ AI lập trình chỉ là thêm một bước nâng mức trừu tượng; theo ông, "công cụ thay đổi, nhưng vấn đề thì không".

Booch nhận xét các công cụ AI hiện tại chủ yếu được huấn luyện trên những bài toán đã gặp đi gặp lại, nên rất giỏi tự động hóa các mẫu quen thuộc như hệ thống CRUD trên web, trong khi biên giới của ngành điện toán rộng lớn hơn nhiều. Khi lĩnh vực thay đổi với tốc độ chóng mặt, nền tảng kiến thức vững chắc càng trở nên quan trọng. Ông cũng thừa nhận quy trình phân phối phần mềm là mục tiêu dễ tự động hóa nhất, nên người làm các vai trò này cần học lại kỹ năng. Lời kết của ông: đây là lúc để bay lên, không phải để sợ hãi vực thẳm.

## [AI coding workflow](https://newsletter.systemdesign.one/p/ai-coding-workflow)

Trong bài viết khách mời trên The System Design Newsletter, Louis-François Bouchard chia sẻ quy trình giúp ông dùng AI lập trình hiệu quả, sau khi nhận ra AI không phải "máy bán hàng tự động" cứ dán vấn đề vào là nhận lời giải chạy được. Mô hình tư duy cốt lõi: AI giống một đồng đội thông minh vừa gia nhập dự án năm phút trước, viết rất nhanh nhưng không biết kiến trúc, quy ước hay ràng buộc của bạn nếu bạn không nói. AI hoạt động tốt nhất trong một vòng lặp gồm sáu bước: Context (cung cấp README, tệp quy tắc như `AGENTS.md` hay `CLAUDE.md`, mã nguồn liên quan kèm stack trace hoặc log), Plan (yêu cầu chiến lược trước khi viết mã, vì sửa kế hoạch rẻ hơn gỡ mã), Code (thay đổi từng bước nhỏ để dễ xem xét), Review, Test và Iterate.

Tác giả còn áp dụng một dạng đa tác tử gọn nhẹ với bốn vai trò: Planner chia nhỏ nhiệm vụ và chỉ ra trường hợp biên, Implementer viết mã đúng theo kế hoạch đã duyệt, Tester viết kiểm thử, và Explainer tóm tắt những gì đã thay đổi cùng lý do. Ông dùng mô hình suy luận mạnh cho vai trò lập kế hoạch và mô hình nhanh hơn để hiện thực. Bài viết cũng liệt kê các lỗi thường gặp như ngữ cảnh bị trôi trong cuộc trò chuyện dài, API sai phiên bản, vòng lặp gỡ lỗi đi chệch hướng, chất lượng mã nguồn giảm dần và phụ thuộc quá mức vào AI. Nguyên tắc chung: coi kết quả của AI là bản nháp, và luôn dùng review cùng kiểm thử làm lưới an toàn.

### Bonus

**Images:**
![Git pull vs. git fetch](https://substack-post-media.s3.amazonaws.com/public/images/625a6789-c32d-4a27-a5f5-c174fb920637_2360x2960.png)
![Top Authentication Techniques](https://substackcdn.com/image/fetch/$s_!-Lov!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fcf928dd3-de16-4605-a702-762df269c9f2_2250x2862.png)

---

*Bài viết đã được viết lại bởi Claude Code với Opus 5.5 vào ngày 27/09/2026.*
