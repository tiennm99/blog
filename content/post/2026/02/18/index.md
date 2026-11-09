---
title: "Newsletter #81"
date: 2026-02-18
tags: ["AI-Assisted", "Newsletter", "Java", "Go", "Performance", "AI Agents", "Code Quality"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #81.*

## [Java Interview Question - Why you should not use static initializers?](https://javabulletin.substack.com/p/java-interview-question-why-you-should)

Bài viết cảnh báo tác dụng phụ và lỗi khó xử lý trong khối khởi tạo tĩnh. Cần phân biệt nạp lớp với khởi tạo lớp: theo đặc tả Java, chỉ nạp một lớp không có nghĩa khối `static` sẽ chạy. Khởi tạo thường xảy ra khi tạo đối tượng, gọi phương thức tĩnh hoặc dùng trường tĩnh không phải hằng số. Lỗi tại đây có thể khiến những lần sử dụng tiếp theo thất bại; không đồng nghĩa JVM luôn sập.

Với công việc phức tạp hoặc có thể thất bại, tác giả đề xuất khởi tạo lười hay khởi tạo qua đối tượng để kiểm soát thời điểm và xử lý lỗi rõ hơn. Đây là lựa chọn thiết kế theo hoàn cảnh, không phải lý do cấm mọi khối tĩnh. Khởi tạo lười cũng cần xem xét an toàn luồng và cách thử lại sau lỗi.

## [How to Write High-Performance Code](https://blog.bytebytego.com/p/how-to-write-high-performance-code)

Bài viết của ByteByteGo trình bày các nguyên tắc nền tảng để viết mã nguồn hiệu năng cao mà không cần kiến thức chuyên sâu, với điểm mấu chốt là rèn trực giác về chỗ nào hiệu năng thực sự quan trọng, thay vì coi con số 3% trong lời Knuth là thống kê cho mọi chương trình. Kỹ năng đầu tiên là ước lượng chi phí trước khi viết: truy cập bộ nhớ đệm CPU tính bằng nano giây, RAM, SSD và mạng thường đắt hơn đáng kể; tỷ lệ tùy thiết bị và cách truy cập. Chẳng hạn, xử lý một triệu bản ghi với mỗi lần gọi cơ sở dữ liệu mất 50 mili giây sẽ tốn khoảng 14 giờ, nhưng gom 1.000 bản ghi mỗi lần gọi thì chỉ còn chừng 50 giây. Hãy đo bằng công cụ phân tích hiệu năng với tải thực tế trước khi tối ưu.

Cải tiến thuật toán có thể tạo mức tăng tốc lớn: tìm phần tử chung giữa hai danh sách 1.000 phần tử bằng vòng lặp lồng nhau cần một triệu phép so sánh (O(N²)), trong khi chuyển một danh sách thành bảng băm cần xây bảng rồi tra cứu, với chi phí kỳ vọng O(N) khi kích thước hai danh sách tương đương. Bố cục bộ nhớ cũng quan trọng không kém: dữ liệu dùng cùng nhau nên nằm cạnh nhau, vì thế mảng thường nhanh hơn danh sách liên kết nhờ tận dụng tốt từng dòng bộ nhớ đệm. Cuối cùng, bài viết gợi ý giảm số lần cấp phát bộ nhớ, cấp trước dung lượng cho container, tái sử dụng đối tượng, tạo đường xử lý nhanh cho trường hợp phổ biến và tránh hẳn những tính toán không cần thiết.

## [Introducing Moltworker: a self-hosted personal AI agent, minus the minis](https://blog.cloudflare.com/moltworker-self-hosted-ai-agent/)

Cloudflare giới thiệu Moltworker, cách chạy Moltbot (trợ lý AI cá nhân mã nguồn mở, từ tháng 1/2026 đổi tên thành OpenClaw) trên hạ tầng Cloudflare thay vì phải mua riêng một chiếc Mac mini. Hệ thống gồm một Worker trung gian đóng vai trò định tuyến và proxy cho API cùng các script đã được điều chỉnh, tất cả được bảo vệ bằng Cloudflare Access. Bên dưới, Sandbox SDK cung cấp container cô lập để chạy runtime gốc của Moltbot với API đơn giản cho việc thực thi lệnh và quản lý vòng đời; Browser Rendering cung cấp trình duyệt Chromium không giao diện, truy cập qua một proxy Chrome DevTools Protocol mỏng để tác nhân duyệt web, điền biểu mẫu và chụp màn hình; R2 lưu bộ nhớ phiên và lịch sử hội thoại, được gắn như một phân vùng hệ thống tệp để dữ liệu không mất khi container tạm thời bị hủy.

AI Gateway làm trung gian giữa tác nhân và các nhà cung cấp mô hình, hỗ trợ tự mang khóa (BYOK) hoặc thanh toán hợp nhất, đồng thời cho phép theo dõi chi phí và nhật ký tập trung. Zero Trust Access bảo vệ API và giao diện quản trị bằng chính sách xác thực tùy chỉnh, tự động cấp JWT để kiểm tra từng yêu cầu. Nhờ Workers giờ đã tương thích tốt với Node.js (Cloudflare thử 1.000 gói npm và báo 15 gói không chạy sau khi loại công cụ xây dựng, dòng lệnh và gói chỉ dành cho trình duyệt), phần lớn logic có thể chạy ngay trên Workers. Mã nguồn được công khai trên GitHub. Cloudflare nhấn mạnh đây chỉ là bản chứng minh khái niệm, cho thấy nền tảng của họ đủ sức chạy ứng dụng AI phức tạp.

## [Building a High-Performance Rotating Bloom Filter in Java](https://medium.com/@udaysagar.2177/building-a-high-performance-rotating-bloom-filter-in-java-a9e75de993bf)

Bài viết giới thiệu cách xây dựng bộ lọc Bloom xoay vòng (rotating Bloom filter) trong một thư viện Java mã nguồn mở của tác giả, nhằm trả lời câu hỏi "phần tử này đã xuất hiện gần đây chưa" trên luồng dữ liệu không giới hạn mà vẫn giữ bộ nhớ cố định. Thay vì một bộ lọc dung lượng cố định có tỷ lệ dương tính giả tăng dần khi đầy, bộ lọc xoay vòng chia dữ liệu theo cửa sổ thời gian và tự hết hạn (tính từ lần chèn đầu tiên, không phải LRU), phù hợp cho khử trùng lặp. Để ghi đồng thời không khóa, mỗi luồng đặt bit bằng Compare-And-Swap trên `AtomicLongArray` và thử lại nếu va chạm; vì bit rải trên hàng triệu vị trí nên va chạm rất hiếm, theo tác giả cho thông lượng gấp 3–4 lần cách dùng khóa trong phép đo của thư viện. Khi cửa sổ hết hạn, bộ lọc đang hoạt động được sao chép sang mảng `long[]` bất biến để đọc nhanh hơn, tạo thành chuỗi `[ReadOnly-1, ReadOnly-2, ReadOnly-3, Active]`: ghi chỉ vào Active, đọc thì kiểm tra từ mới đến cũ.

Để tránh mất dữ liệu khi một luồng ghi vào bộ lọc vừa bị đóng băng, đường ghi giữ khóa đọc của Read-Write Lock còn thao tác xoay giữ khóa ghi, trong khi truy vấn hoàn toàn không khóa. Nếu coi các cửa sổ độc lập với cùng xác suất p, tỷ lệ dương tính giả xấp xỉ `1 - (1 - p)^N`, nên 5 cửa sổ mỗi cái 1% cho kết quả gần 5%; vì vậy cần cấu hình tỷ lệ của từng cửa sổ thấp hơn, chấp nhận đánh đổi giữa thời gian lưu giữ và độ chính xác.

## [What Every Java Developer Should Know About Thread Pools](https://dev.to/realnamehidden1_61/what-every-java-developer-should-know-about-thread-pools-4jam)

Pool luồng tái sử dụng các luồng nền để xử lý nhiều tác vụ, giúp quản lý tài nguyên. Bài giới thiệu pool cố định, cached và scheduled. Không phải mọi `ExecutorService` đều giới hạn số luồng hoặc hỗ trợ lịch chạy; pool cached có thể tăng mạnh khi quá tải, còn lập lịch thuộc `ScheduledExecutorService`.

Luồng ảo chính thức từ Java 21 phù hợp nhiều tác vụ chờ I/O, nhưng thường được tạo riêng cho từng tác vụ thay vì gom vào pool. Chúng không làm phép tính nặng CPU chạy nhanh hơn hay loại bỏ giới hạn cơ sở dữ liệu. Cần đóng executor đúng vòng đời: Java 19 trở lên hỗ trợ try-with-resources, phiên bản cũ dùng `shutdown()` và quản lý chờ kết thúc. Kích thước pool nên được đo theo tải, số CPU khả dụng và giới hạn dịch vụ phụ thuộc.

## [Goodbye Java, Hello Go!](https://wso2.com/library/blogs/goodbye-java-hello-go)

WSO2, công ty phần mềm trung gian (middleware) doanh nghiệp với 20 năm lịch sử và khoảng 95% mã nguồn phía máy chủ viết bằng Java, công bố chuyển sang Go cho thế hệ sản phẩm tiếp theo. Theo lập luận của WSO2, bối cảnh hạ tầng họ nhắm tới đã thay đổi: trong kỷ nguyên container, máy chủ không còn chạy liên tục hàng tháng mà khởi động, xử lý việc rồi bị hủy, còn middleware trở thành thư viện gắn vào logic trong một tiến trình duy nhất. Cơ chế tối ưu JIT sau khởi động của Java kém hiệu quả trong mô hình này, thời gian khởi động tính bằng giây thay vì mili giây, còn hệ sinh thái đồ sộ khiến bộ nhớ và CPU phình to, đẩy chi phí hạ tầng lên cao. Theo WSO2, GraalVM native image hay Project Loom chỉ là cách chắp vá cho một ngôn ngữ và runtime được thiết kế cho thời đại khác.

WSO2 cũng cân nhắc Rust nhưng thấy không cần thiết: Rust hợp với hệ điều hành, trình duyệt hay phần mềm sát phần cứng, còn họ xây cổng API và cổng định danh ở tầng cao hơn nhiều. Go cân bằng tốt giữa quản lý bộ nhớ hiệu quả, các cơ chế đồng thời đủ dùng và khả năng biên dịch chéo ra mã máy, lại đã được kiểm chứng qua Kubernetes, Docker cùng hệ sinh thái thư viện và nguồn kỹ sư dồi dào. Công ty đã dùng Go gần một thập kỷ qua các dự án như OpenChoreo, bản viết lại trình biên dịch Ballerina và nền tảng định danh Thunder. WSO2 khẳng định tiếp tục hỗ trợ các sản phẩm Java hiện tại.

## [TBM 399: 10 Prioritization Traps](https://cutlefish.substack.com/p/tbm-399-10-prioritization-traps)

John Cutler chia sẻ 10 bẫy khi các đội sản phẩm định ưu tiên, mỗi bẫy đặt theo tên bài hát, nhằm giúp quyết định tốt hơn. "Burning Down the House" là luôn chạy theo việc khẩn cấp nhưng ít giá trị; hãy giữ riêng 10–20% năng lực cho việc phòng ngừa. "Too Much Time on My Hands" là mài giũa quá lâu việc giá trị trung bình mà không tìm ra tỷ lệ 20/80; hãy xác định phiên bản nhỏ nhất có thể giao trong 2–4 tuần. "Everybody Wants to Rule the World" là việc ai cũng gọi là ưu tiên số một nhưng không ai bỏ việc khác; cần nêu rõ một việc được phép gác lại. "Just Enough Is Never Enough" là giao nhanh nhưng chỉ nắm được 20% giá trị; hãy duyệt trước một khoản đầu tư tiếp nối. "Running on Empty" là dự án kéo dài mà không có tín hiệu lệch hướng; hãy đặt các điểm kiểm tra buộc cam kết lại.

"Dreamer" là nỗ lực đổi mới thiếu ràng buộc; hãy thêm một yếu tố thúc ép như hạn chót hay yêu cầu tích hợp. "Slow Ride" là ma sát nội bộ bị xem nhẹ; hãy đo thời gian lãng phí như chi phí trì hoãn. "Someday Never Comes" là cơ hội tiềm năng bị hoãn mãi vì thiếu tự tin; hãy chạy thử nghiệm chi phí thấp, chấp nhận thất bại. "The Logical Song" là bỏ qua chi phí tăng độ tự tin; hãy hỏi thêm "tăng độ tự tin rẻ nhất bằng cách nào?". Cuối cùng, "Takin' Care of Business" là khi đội tự bịa việc lúc bị chặn; hãy duy trì một hàng đợi việc nhỏ, rõ ràng.

## [Assessing internal quality while coding with an agent](https://martinfowler.com/articles/exploring-gen-ai/ccmenu-quality.html)

Bài viết của Erik Doernenburg trên trang của Martin Fowler kể lại quá trình dùng tác nhân AI để thêm hỗ trợ GitLab cho CCMenu, ứng dụng macOS viết bằng Swift hiển thị trạng thái build CI/CD trên thanh menu. Tác giả thử Windsurf với Sonnet 3.5, sau đó là Claude Code với Sonnet 4.5, và tập trung vào khía cạnh ít được bàn tới: chất lượng nội bộ của mã nguồn do AI sinh ra. Vấn đề rõ nhất là tác nhân khai báo token trong các hàm bao API là `String` bắt buộc, trong khi hàm `makeRequest` bên dưới đúng ra nhận `String?`; khi mã gọi cần token tùy chọn, AI lại vá bằng `apiToken ?? ""` thay vì sửa khai báo, vừa không đúng phong cách Swift, vừa xóa mất ý nghĩa "token có thể không có" mà hệ thống kiểu lẽ ra phải thể hiện. Ngoài ra, AI đề xuất bộ nhớ đệm không cần thiết, không nhận ra khác biệt thiết kế API giữa GitHub và GitLab nên viết logic phức tạp cho một vấn đề không tồn tại, lặp lại logic tạo URL thay vì dùng hàm sẵn có, và loay hoay rất lâu với việc lấy URL ảnh đại diện vốn nằm ở một endpoint riêng.

Tác giả kết luận rằng tác nhân AI có xu hướng tạo nợ kỹ thuật, khiến việc phát triển sau này khó hơn cho cả con người lẫn tác nhân. Với Windsurf và Sonnet 3.5, cần giám sát quá nhiều nên không đáng dùng; còn Claude Code với Sonnet 4.5 tốt hơn rõ rệt, cần ít chỉ dẫn hơn và đủ để tác giả dùng thường xuyên. Dù vậy, chất lượng nội bộ vẫn là chìa khóa để phát triển bền vững.

## [A "Pure Go" Linux environment, ported by Claude, inspired by Fabrice Bellard](https://www.jtolio.com/2026/01/tinyemu-go/)

Tác giả kể lại việc dùng Claude để chuyển TinyEMU, trình giả lập RISC-V của Fabrice Bellard, từ C sang Go. Kết quả là một môi trường Linux thuần Go có thiết bị VirtIO, gắn hệ thống tệp và mạng: chỉ cần `go run` là có Linux với quyền root, không cần đặc quyền hay container, bài minh họa chạy trên macOS, Windows và Linux. Quyền root nằm trong máy giả lập, không phải quyền root trên máy chủ. Giai đoạn đầu rất hào hứng khi Claude hoàn thành phần hạ tầng nhanh chóng, nhưng 20% cuối là cực hình: Linux khởi động được mà không gắn được initrd, dự án đình trệ nhiều tuần, còn tác giả thiếu ngữ cảnh vì không tự viết mã. Claude thường làm lệch yêu cầu, tự thêm xử lý lỗi "tốt hơn" hoặc bỏ qua chỉ dẫn phải giữ đúng hành vi của bản C, nên tác giả chuyển sang rà soát theo từng lô hàm với yêu cầu đối chiếu rõ ràng. Tác giả chê Beads cồng kềnh và thích Ticket hơn.

Bài học rút ra gồm: chia việc thành các ticket nhỏ và cụ thể nhất có thể, đặt tiêu chuẩn commit và độ phủ kiểm thử rõ ràng, thường xuyên xóa phiên để bắt đầu với ngữ cảnh mới, buộc tác nhân tạo ticket cho mọi công việc hay sai lệch phát sinh, và đừng mong API gắn kết tự hình thành qua nhiều phiên. Dự án khiến tác giả vừa hào hứng vừa dè dặt hơn với việc lập trình cùng LLM: tự làm thì đỡ bực bội và chất lượng cao hơn, nhưng thông lượng thấp hơn; muốn thành công cần xem Claude như một lập trình viên junior cần được giám sát chặt.

### Bonus

**Hình ảnh:**

![How to Scale An API](https://substackcdn.com/image/fetch/w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F36412c2b-8782-476e-9db4-aaf794629b74_2250x2624.png)
![HTTP/2 over TCP vs HTTP/3 over QUIC](https://substackcdn.com/image/fetch/$s_!4V7B!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fc9589feb-6f59-4971-9da4-26712d1a2ca1_2360x2960.png)
![How Git Really Stores Your Data](https://substackcdn.com/image/fetch/$s_!ihnd!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ffe954900-e8d8-40d0-a4b1-2f8e14068882_2360x2960.png)
![How NAT Works](https://substackcdn.com/image/fetch/$s_!5SHy!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fcbddfb5f-a652-4749-b0b9-210102774f4f_2360x2960.png)

---

*Bài viết đã được viết lại bởi Claude Code với Opus 5.5 vào ngày 27/09/2026; được review và chỉnh sửa bởi Codex với GPT 6.1 Sol vào ngày 09/11/2026.*
