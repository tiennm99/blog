---
title: "Newsletter #26"
date: "2025-05-13"
tags: [ "AI-Assisted", "Software Design", "Java", "Development", "Architecture", "Programming Patterns", "Technology Trends" ]
categories: [ "Newsletter" ]
---

*Mời bạn thưởng thức Newsletter #26.*

## [The Philosophy of Software Design – with John Ousterhout](https://newsletter.pragmaticengineer.com/p/the-philosophy-of-software-design)

Trong tập podcast này của The Pragmatic Engineer, giáo sư John Ousterhout (Đại học Stanford, tác giả cuốn *A Philosophy of Software Design*) giải thích vì sao thiết kế phần mềm lại càng quan trọng hơn trong thời đại AI. Ông ví các công cụ sinh mã bằng AI hiện nay như những "cơn lốc chiến thuật" (tactical tornado): tạo ra mã nguồn rất nhanh nhưng dễ để lại nợ kỹ thuật, trong khi tư duy thiết kế ở tầng cao vẫn là việc con người phải đảm nhận. Theo ông, bản chất của thiết kế phần mềm là phân rã: chia một hệ thống phức tạp thành những đơn vị nhỏ có thể xây dựng độc lập với nhau. Ông cũng khuyên nên "thiết kế hai lần", tức là luôn cân nhắc thêm một phương án khác trước khi chốt, vì phương án thứ hai thường tốt hơn hẳn.

Ousterhout có nhiều quan điểm trái ngược với trường phái Clean Code của Robert Martin. Ông cho rằng TDD khiến lập trình viên tập trung vào chi tiết nhỏ thay vì kiến trúc tổng thể (trừ khi sửa lỗi), rằng việc chia nhỏ phương thức quá mức làm giao diện phức tạp hơn nên cần ưu tiên các "module sâu" với giao diện đơn giản, và rằng chú thích là cần thiết để mô tả giao diện cũng như ý nghĩa của các biến thành viên. Tại Stanford, ông dạy thiết kế qua việc đánh giá mã nguồn kỹ lưỡng và so sánh bài làm giữa các sinh viên, giống cách dạy viết văn. Hiện ông đang đóng góp cho nhân Linux bằng việc triển khai giao thức truyền tải Homa. Đây là bài nghe đáng giá cho các bạn junior.

## [20 years of Git. Still weird, still wonderful](https://blog.gitbutler.com/20-years-of-git)

Nhân dịp Git tròn 20 tuổi, Scott Chacon (đồng sáng lập GitHub và GitButler) kể lại hành trình của công cụ này. Năm 2005, Linus Torvalds tạo ra Git như một "công cụ theo dõi nội dung ngớ ngẩn" nhằm cải thiện cách cộng đồng nhân Linux cộng tác bằng các bản vá và tệp tarball. Lần commit đầu tiên chỉ gồm bảy công cụ cấp thấp như `write-tree` và `commit-tree`, hoàn toàn không thân thiện với người dùng. Thời gian đầu, Git chủ yếu là phần "hệ thống ống nước" (plumbing), còn lớp giao diện dễ dùng (porcelain) đến từ các bộ script shell như Cogito. Nhiều lệnh quen thuộc ra đời khá tự nhiên: lệnh `git log` đầu tiên chỉ là một script ba dòng đưa kết quả của `git-rev-list` qua trình phân trang, còn khái niệm "rebase" xuất phát từ những trao đổi giữa Junio và Linus về quy trình làm việc vào năm 2005.

Tác giả cũng chia sẻ trải nghiệm cá nhân: ông từng dùng Git như một hệ thống phân phối nội dung cho các màn hình quảng cáo, đúng với triết lý thiết kế ban đầu, trước khi viết tài liệu hướng dẫn và cùng sáng lập GitHub. Một chi tiết thú vị là tên chiến lược gộp "octopus merge" đã truyền cảm hứng cho linh vật Octocat của GitHub. Sau 20 năm, Git thống trị ngành phát triển phần mềm nhưng vẫn giữ nguyên nét "kỳ quặc mà tuyệt vời": cú pháp lệnh khác thường đi kèm một kiến trúc bên dưới rất mạnh mẽ.

## [A Modest Critique of Optional Handling](https://mccue.dev/pages//4-5-25-optional-critique)

Ethan McCue phân tích cách nhiều lập trình viên Java đang dùng chưa đúng `java.util.Optional` khi tái cấu trúc các phương thức vốn trả về `null`. Theo tác giả, `Optional` phát huy tác dụng tốt nhất trong chuỗi thao tác stream và trong thiết kế API, chứ không phải để thay thế hoàn toàn khái niệm `null`. Lời khuyên phổ biến là tránh `.isPresent()`/`.get()` và thay bằng `.map()` hay `.ifPresent()`, nhưng cách này gặp khó ngay khi phải xử lý checked exception, kết hợp nhiều giá trị `Optional` cùng lúc hoặc thay đổi biến cục bộ bên trong lambda; các lời gọi `.ifPresent()` lồng nhau còn khiến mã nguồn thụt lề sâu và khó đọc.

Giải pháp tác giả đề xuất khá đơn giản: dùng `.orElse(null)` để chuyển `Optional` về một biến cục bộ có thể null, rồi kiểm tra null theo cách truyền thống. Cách làm này giúp các công cụ phân tích tĩnh theo dõi biến cục bộ tốt hơn, checked exception không còn là trở ngại, và khả năng giá trị bị thiếu vẫn được thể hiện rõ ở từng chỗ sử dụng. Bài viết kèm nhiều ví dụ chuyển đổi cụ thể và là lời nhắc hữu ích cho các bạn junior: nên chọn cách viết rõ ràng, dễ bảo trì thay vì tuân thủ máy móc quy tắc "tránh .isPresent/.get".

## [Project Loom: Structured Concurrency in Java](https://rockthejvm.com/articles/structured-concurrency-in-java)

Riccardo Cardin từ Rock the JVM viết một hướng dẫn chi tiết về structured concurrency (lập trình đồng thời có cấu trúc), một phần của Project Loom, chạy trên Java 23 với cờ `--enable-preview`. Bài viết bắt đầu bằng việc chỉ ra điểm yếu của cách làm truyền thống với `ExecutorService`: khi tác vụ cha thất bại, các tác vụ con vẫn có thể tiếp tục chạy, gây rò rỉ luồng và lãng phí tài nguyên. Structured concurrency giải quyết vấn đề này bằng nguyên tắc cấu trúc cú pháp của mã nguồn phản ánh đúng cấu trúc thực thi đồng thời, nghĩa là mọi tác vụ con phải kết thúc trước khi tác vụ cha rời khỏi phạm vi của nó.

Trung tâm của bài là lớp `StructuredTaskScope`, cài đặt `AutoCloseable` để dùng được với try-with-resources, cùng các phương thức `fork()` để tạo tác vụ con, `join()` để chờ hoàn tất và `shutdown()` để hủy các tác vụ còn dang dở. Tác giả minh họa bằng một ứng dụng khách gọi GitHub API, lấy thông tin người dùng và danh sách kho mã nguồn song song, sử dụng các chính sách có sẵn `ShutdownOnFailure` và `ShutdownOnSuccess`. Sau đó, bài viết hướng dẫn tự xây dựng chính sách riêng bằng cách kế thừa `StructuredTaskScope` và ghi đè `handleComplete()`, rồi cài đặt các hàm tiện ích như `par()`, `race()`, `timeout()` và cây tác vụ cha–con lồng nhau dựa trên cơ chế ngắt luồng hợp tác. Đây là tài liệu tốt để làm quen với cách lập trình đồng thời an toàn và dễ hiểu hơn trong Java hiện đại.

## [Go's HTTP Server Patterns in Java 25](https://mccue.dev/pages/4-5-25-go-http-server)

Ethan McCue cho thấy Java hiện đại có thể viết máy chủ HTTP theo phong cách rất giống Go, thông qua việc xây dựng một ứng dụng wiki đơn giản bằng Java 25. Ứng dụng cho phép tạo, xem và chỉnh sửa các trang được lưu thành tệp văn bản. Nền tảng là module `jdk.httpserver` có sẵn trong JDK, kết hợp với thư viện `dev.mccue.jdk.httpserver` cung cấp lớp trừu tượng `Body` để trả phản hồi gọn gàng hơn, JMustache để tách giao diện HTML khỏi mã Java, và `dev.mccue.urlparameters` để phân tích dữ liệu biểu mẫu.

Tác giả dùng một record `Page` với các phương thức `save()` và `load()` để lưu và đọc trang, viết các trình xử lý riêng cho việc xem, chỉnh sửa và lưu trang, đồng thời chuyển hướng (mã 302) khi người dùng mở một trang chưa tồn tại. Bài viết cho thấy chỉ với thư viện chuẩn và vài thư viện nhỏ, ta đã có thể dựng một ứng dụng web đơn giản mà không cần framework nặng nề. Tuy nhiên, `jdk.httpserver` chủ yếu phục vụ công cụ `jwebserver` và được đánh dấu chỉ dành cho phát triển, nên với môi trường vận hành thực tế, tác giả khuyên chuyển sang các máy chủ đã được kiểm chứng như Jetty.

## [Java is dying and it paid off my mortgage](https://alyosha.net/posts/java-is-dying-and-it-paid-off-my-mortgage/)

Alyosha kể lại nỗi lo khi còn là một lập trình viên junior chuyên về Java. Trên Hacker News hay YouTube, Java gần như vắng bóng so với JavaScript và các công nghệ đang "hot", khiến tác giả sợ rằng mình đang đặt cược sự nghiệp vào một ngôn ngữ sắp lỗi thời. Nhưng khi thực sự bước vào thị trường việc làm, tác giả nhận ra điều ngược lại: các vị trí Java dẫn đầu về lương và phúc lợi, phần lớn đến từ những công ty ổn định vẫn âm thầm vận hành hệ thống trên Java.

Theo tác giả, Java đang ở giai đoạn của một công nghệ trưởng thành: ít được bàn tán trên mạng nhưng vẫn tạo ra rất nhiều giá trị, và chính việc bị xem là "không hợp thời" khiến nguồn cung lập trình viên ít đi, từ đó đẩy mức đãi ngộ lên cao. Nhờ kỹ năng Java, tác giả đã mua được nhà và trang trải khoản vay mua nhà. Bài học cho các bạn junior là độ ồn ào trên mạng không phản ánh nhu cầu thực tế của thị trường; làm chủ một nền tảng vững chắc, dù không hào nhoáng, có thể mang lại sự nghiệp ổn định hơn nhiều so với việc chạy theo xu hướng.

## [Cấu hình domain .localhost cho ứng dụng local](https://inclouds.space/localhost-domains)

Charles Chamberlain chia sẻ cách thoát khỏi cảnh phải nhớ hàng loạt cổng như `localhost:4333` hay `localhost:5050` khi chạy nhiều ứng dụng web trên máy cá nhân. Thay vào đó, mỗi ứng dụng được gán một tên miền `.localhost` dễ nhớ, chẳng hạn `inclouds.localhost`. Cách thiết lập trên macOS gồm ba phần: chạy mỗi ứng dụng như một dịch vụ nền bằng launchd, lắng nghe trên một cổng riêng; thêm một dòng vào `/etc/hosts` để trỏ tên miền về `127.0.0.1`; và dùng Caddy làm proxy ngược, chuyển yêu cầu từ từng tên miền đến đúng cổng, đồng thời tự lo phần mã hóa TLS nội bộ và nén dữ liệu bằng gzip, zstd. Ví dụ cấu hình cho một ứng dụng chạy ở cổng 5050:

```bash
# /etc/hosts
127.0.0.1 inclouds.localhost

# Caddyfile
inclouds.localhost {
    reverse_proxy localhost:5050
    tls internal
    encode gzip zstd
}
```

Tác giả thừa nhận việc sửa thủ công nhiều tệp cấu hình vẫn còn rườm rà, và mong muốn rút gọn toàn bộ quy trình thành một lệnh cài đặt hoặc gỡ bỏ duy nhất. Một người đọc cũng đã góp ý cách làm gọn hơn với dnsmasq để quản lý DNS. Đây là mẹo nhỏ nhưng hữu ích, giúp môi trường phát triển cục bộ ngăn nắp hơn, nhất là khi bạn làm việc với nhiều dự án cùng lúc.

## [AI 50: AI Agents Move Beyond Chat](https://sequoiacap.com/article/ai-50-2025/)

![](https://sequoiacap.com/wp-content/uploads/sites/6/2025/04/ai-50-2025.png)

Konstantine Buhler từ Sequoia Capital phân tích danh sách AI 50 năm 2025 và chỉ ra một bước chuyển lớn: AI đang đi từ việc trả lời câu hỏi sang trực tiếp hoàn thành công việc. Nhờ các tác tử (agent) và mô hình suy luận, các công ty trong danh sách không chỉ xử lý từng yêu cầu đơn lẻ mà đảm nhận trọn vẹn cả quy trình nghiệp vụ, biến AI thành một "cỗ máy hành động" trong doanh nghiệp. Tiêu biểu có Harvey xử lý toàn bộ quy trình pháp lý từ rà soát tài liệu, soạn thảo đến phân tích vụ việc; Sierra tự động hóa dịch vụ chăm sóc khách hàng; và Cursor tạo ra cả tính năng phần mềm từ mô tả bằng ngôn ngữ tự nhiên.

Bài viết cũng nhấn mạnh làn sóng robot, nơi các mô hình transformer được kết hợp với phần cứng: Figure AI sản xuất robot hình người với mô hình Helix mới, còn Skild AI phát triển mô hình nền tảng dùng chung cho robot; Nvidia ước tính đây là cơ hội trị giá 50 nghìn tỷ USD. Tác giả xem 2025 là bước ngoặt khi AI bắt đầu đảm nhận những công việc thực sự có giá trị, và dự đoán sang năm 2026, các ứng dụng AI cho người dùng phổ thông sẽ bùng nổ, tự động quản lý lịch, đặt vé du lịch hay sắp xếp tệp tin. Những tiến bộ đang diễn ra trong doanh nghiệp sẽ dần lan tỏa vào đời sống hằng ngày.

## Vài ảnh hay ho đến từ [ByteByteGo](https://bytebytego.com/)

![A Cheatsheet On OOP Design Patterns](https://substack-post-media.s3.amazonaws.com/public/images/65279cf0-3266-445d-852b-a45d6ac9afa4_2250x2862.png)

---

*Bài viết đã được viết lại bởi Claude Code với Opus 5.5 vào ngày 27/09/2026.*
