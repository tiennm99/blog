---
title: "Newsletter #121"
date: 2026-07-09
tags: ["AI-Assisted", "Newsletter", "Go", "Performance", "System Design", "Programming", "Networking", "AI", "Infrastructure", "Leadership", "Engineering Culture", "Software Architecture", "Distributed Systems", "Databases", "SQLite", "Security", "Code Quality", "Compilers", "Programming Languages", "Linux"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #121.*

## [How 2004 RuneScape fit a multiplayer RPG into 56k dial-up](https://jkm.dev/posts/how-2004-runescape-fit-a-multiplayer-rpg-into-56k-dialup/)

Bài viết mổ xẻ cách RuneScape năm 2004 vận hành một thế giới nhiều người chơi qua modem 56k, nơi băng thông thực tế chỉ khoảng vài KB mỗi giây và client Java applet chỉ có một kết nối TCP. Thay vì gửi dữ liệu tự mô tả, giao thức được thiết kế như một hệ thống chung giữa client và server: hai bên cùng biết bản đồ va chạm, cùng hiểu bảng opcode, cùng chia sẻ quy ước về trạng thái mặc định và cùng xử lý theo chu kỳ server khoảng 600 ms. Một thao tác đi bộ đơn giản chỉ cần vài byte vì client gửi điểm đầu và delta, còn server tự kiểm chứng đường đi.

Phần giá trị nhất là cách bài viết cho thấy "tiết kiệm byte" không chỉ là nén dữ liệu. Trạng thái phổ biến nhất, như người chơi không di chuyển, được biểu diễn bằng một bit; vị trí người chơi mới trong vùng nhìn dùng tọa độ tương đối thay vì tọa độ toàn cục; các cập nhật chi tiết chỉ xuất hiện khi thật sự cần. Khi dữ liệu lớn hơn và có thể được cache, giao thức chuyển về byte-aligned để server ghép buffer rẻ hơn. Bài học thiết kế là wire format nhỏ nhất thường đến từ việc đồng thiết kế hai đầu hệ thống, nhưng đổi lại ta mất bớt tính tự mô tả, độc lập triển khai và dễ debug mà HTTP/JSON hiện đại thường ưu tiên.

**Điểm chính:**
- Giao thức tiết kiệm vì client và server chia sẻ nhiều hiểu biết ngầm, thay vì gửi lại mọi ngữ cảnh qua mạng.
- Trạng thái "không đổi" được làm cực rẻ: một bit cho mỗi người chơi đã đủ xác nhận không có cập nhật trong một chu kỳ.
- Tọa độ tương đối, delta waypoint và bit packing giúp giảm mạnh số byte so với gửi tọa độ hoặc schema đầy đủ.
- Bit packing chỉ đáng dùng ở phần có nhiều giá trị nhỏ lặp lại; phần chi tiết lớn hơn được giữ byte-aligned để dễ cache và ghép buffer.
- Thiết kế verbose như HTTP/JSON không phải lãng phí tuyệt đối, mà là đánh đổi để đổi lấy khả năng triển khai độc lập, đọc hiểu và tiến hóa API.

## [How does struct{} take zero bytes in Go](https://www.bud1m.com/blog/go-empty-struct/)

Bài viết giải thích vì sao `struct{}` trong Go có kích thước bằng 0 và thường được dùng cho set hoặc channel tín hiệu. Với `unsafe.Sizeof`, ta có thể thấy giá trị rỗng này không chiếm byte nào; khi dùng làm value trong `map[string]struct{}`, ý nghĩa là chỉ quan tâm key có tồn tại hay không. Tuy vậy, tác giả cũng cập nhật một chi tiết thực tế: từ Go 1.24, map dùng Swiss Tables nên `map[string]struct{}` và `map[string]bool` có thể không còn khác biệt bộ nhớ đáng kể trong thực tế; chọn `struct{}` lúc này chủ yếu là cách diễn đạt ý định.

Ở tầng runtime, khi một giá trị zero-size phải được cấp phát, `mallocgc` kiểm tra kích thước bằng 0 và trả về địa chỉ của biến toàn cục `zerobase` thay vì cấp phát riêng. Vì vậy nhiều biến `struct{}` có thể có cùng địa chỉ, đặc biệt khi escape analysis đẩy chúng ra khỏi stack. Đây cũng là nguồn của hai bẫy quan trọng: không được dựa vào so sánh con trỏ để phân biệt các giá trị zero-size, và nếu đặt `struct{}` làm field cuối cùng trong một struct khác, runtime có thể thêm padding để tránh con trỏ tới field cuối trỏ ra ngoài vùng cấp phát. Khi đó field rỗng không còn "miễn phí" như ta tưởng.

**Điểm chính:**
- `struct{}` có kích thước 0, phù hợp để biểu diễn tín hiệu hoặc sự tồn tại thay vì dữ liệu.
- Khi zero-size value cần cấp phát, Go runtime thường dùng địa chỉ toàn cục `zerobase` thay vì tạo allocation riêng.
- Nhiều giá trị `struct{}` có thể chia sẻ cùng địa chỉ, nên không nên dùng pointer identity để phân biệt chúng.
- `fmt.Println` có thể làm giá trị escape, còn `println` trong ví dụ có thể giữ giá trị trên stack; escape analysis quyết định đường đi này.
- Đặt `struct{}` ở field cuối của struct có thể tạo padding, nên nếu cần tối ưu layout hãy đặt field zero-size ở vị trí khác.

## [Is Cloudflare silently killing the web hosting industry?](https://webhosting.today/2026/06/17/is-cloudflare-silently-killing-the-web-hosting-industry/)

Konrad Keck lập luận rằng Cloudflare không giết ngành hosting bằng cách trở thành một nhà cung cấp hosting truyền thống, mà bằng cách kéo điểm bắt đầu của website sang một workflow khác. Trước đây khách hàng mua domain, mua shared hosting, vào cPanel, cài WordPress, cấu hình SSL/email rồi có thể thêm Cloudflare ở lớp CDN và bảo mật. Nhưng khi dự án mới bắt đầu từ Claude Code, Cursor, Lovable, Bolt, Replit hoặc các công cụ tạo mã khác, câu hỏi thương mại không còn là "mua gói hosting nào", mà là "deploy ở đâu". Cloudflare, Vercel, Netlify và các nền tảng tương tự được thiết kế để chớp lấy khoảnh khắc deploy đó.

Bài viết nhấn mạnh hai đòn bẩy của Cloudflare: triển khai gần như miễn phí qua Pages, Workers, static assets, R2/D1 theo usage-based pricing; và domain giá thấp như một cửa vào hệ sinh thái DNS, bảo mật, compute, storage và workflow AI. Registrar API còn làm vòng lặp khép kín hơn: agent có thể tạo dự án, gợi ý domain, kiểm tra giá, đăng ký, cấu hình DNS và publish mà người dùng không ghé qua hosting panel. Tuy vậy, hosting truyền thống chưa biến mất: WordPress/WooCommerce cũ, email doanh nghiệp, migration, xử lý sự cố, thị trường địa phương và yêu cầu tuân thủ vẫn cần dịch vụ thủ công. Câu hỏi chiến lược là hoster phải trở thành nhà cung cấp managed service chuyên sâu, không chỉ bán điểm khởi đầu mặc định của website.

**Điểm chính:**
- AI-assisted development làm nhiều website và ứng dụng nhỏ bắt đầu từ mã nguồn và nút deploy, không bắt đầu từ shared hosting.
- Cloudflare cạnh tranh ở workflow, không chỉ ở hạ tầng: domain, DNS, CDN, bảo mật, Pages, Workers, storage và database cùng nằm trong một đường đi.
- Giá $0 hoặc usage-based pricing làm hosting truyền thống mất lợi thế ở các landing page, docs site, frontend và API nhỏ.
- Domain giá thấp và Registrar API biến đăng ký domain thành một bước trong quy trình tạo dự án tự động, thay vì một cửa hàng riêng để upsell hosting.
- Lợi thế còn lại của hoster nằm ở phần Cloudflare khó tối ưu hóa: email thật, WordPress/PHP cũ, hỗ trợ khẩn cấp, migration, địa phương hóa và compliance.

## [Don't Stack Weaknesses](https://staysaasy.com/startups/2026/06/16/stacked-weaknesses.html)

Stay SaaSy viết về một lỗi tổ chức rất dễ bị che khuất ở cấp lãnh đạo: xếp chồng cùng một điểm yếu qua nhiều tầng quản lý. Không có lãnh đạo nào giỏi mọi thứ cùng lúc. Một người có thể mạnh về chiến lược nhưng yếu vận hành, mạnh kỹ thuật nhưng yếu truyền đạt, hoặc giỏi quản lý con người nhưng thiếu hiểu biết lĩnh vực. Vấn đề chưa chắc nằm ở điểm yếu riêng lẻ, mà nằm ở việc lãnh đạo đó lại tuyển hoặc phát triển các báo cáo trực tiếp có cùng lỗ hổng.

Khi hai tầng liên tiếp cùng yếu ở một năng lực, thực tế của tổ chức bị bóp méo. Nếu cả VP lẫn director đều yếu vận hành, gần như không thể kỳ vọng đội bên dưới có quy trình mạnh, vì họ không biết tự làm, không biết tuyển người giỏi phần đó và cũng khó đánh giá chất lượng công việc. Cách tránh lỗi này bắt đầu bằng việc thừa nhận điểm yếu thật, rồi tuyển người bù vào khoảng trống thay vì nhân bản thế mạnh của mình dưới nhãn "phù hợp văn hóa". Một danh sách kiểm tra thực dụng là tự chấm các nhóm kỹ năng như kiến thức lĩnh vực/kỹ thuật, quản lý, vận hành, chiến lược, trình bày và năng lực học nhanh, rồi cố ý lấp phần yếu bằng người mạnh hơn mình.

**Điểm chính:**
- Điểm yếu của một lãnh đạo không nhất thiết phá tổ chức; nguy hiểm hơn là điểm yếu đó lặp lại ở cấp dưới trực tiếp.
- Người tuyển dụng thường dễ nhận ra và đánh giá cao kỹ năng giống mình, nên vô thức tạo đội hình thiếu bổ trợ.
- "Phù hợp văn hóa" có thể trở thành lý do đẹp để nhân bản cùng kiểu năng lực và cùng kiểu điểm mù.
- Muốn tránh stacked weakness, lãnh đạo phải gọi tên rõ phần mình yếu và tuyển người thật sự mạnh ở phần đó.
- Đừng tự trấn an bằng câu "tôi có thể làm nếu muốn"; đó thường là cách né việc đánh giá năng lực một cách trung thực.

## [System Design Cheatsheet](https://gist.github.com/SuyashDive2005/be5865a9755ca1dd50523f7aeeae4417)

Gist này là một danh sách kiểm tra ngắn cho phỏng vấn và thiết kế hệ thống, bắt đầu từ nguyên tắc quan trọng nhất: chọn kiến trúc là chọn đúng trận cần đánh và quản lý đánh đổi. Quy trình được chia thành các bước quen thuộc: làm rõ phạm vi, người dùng, luồng sử dụng và ràng buộc; phác thảo kiến trúc mức cao; đi vào thiết kế thành phần, API và lược đồ dữ liệu; rồi tìm nút thắt trước khi mở rộng. Với lập trình viên mới, giá trị của danh sách này nằm ở việc buộc mình hỏi câu hỏi định lượng sớm: bao nhiêu yêu cầu mỗi giây, đọc/ghi ra sao, dữ liệu lớn đến mức nào, độ trễ hay thông lượng quan trọng hơn, và hệ thống cần ưu tiên tính nhất quán hay tính khả dụng.

Phần mở rộng hệ thống nhắc lại các mảnh ghép nền tảng: mở rộng dọc, mở rộng ngang, bộ nhớ đệm, cân bằng tải, sao chép dữ liệu, phân vùng dữ liệu, MapReduce và lớp nền tảng. Gist cũng liệt kê các chủ đề nên nắm khi thiết kế hệ thống như xử lý đồng thời, mạng, trừu tượng hóa, hiệu năng thực tế, ước lượng nhanh, tính sẵn sàng và độ tin cậy. Dù nội dung mang tính bảng tóm tắt và có vài ví dụ cũ, nó vẫn hữu ích như một khung tư duy: đừng nhảy thẳng vào công nghệ, hãy mô tả tải, dữ liệu, chế độ lỗi và đường mở rộng trước.

**Điểm chính:**
- Thiết kế hệ thống nên bắt đầu bằng phạm vi, trường hợp sử dụng, ràng buộc tải và dữ liệu, không bắt đầu bằng chọn công nghệ.
- Kiến trúc mức cao cần làm rõ các lớp chính: dịch vụ, lưu trữ, bộ nhớ đệm, cân bằng tải và những kết nối quan trọng.
- Mở rộng hệ thống không chỉ là thêm máy; cần hiểu bộ nhớ đệm, sao chép dữ liệu, phân vùng dữ liệu, nút thắt và chi phí vận hành đi kèm.
- Ước lượng nhanh giúp loại bớt phương án không khả thi trước khi viết nguyên mẫu hoặc đo kiểm hiệu năng nhỏ.
- Các chủ đề lõi cần học gồm xử lý đồng thời, mạng, trừu tượng hóa, hiệu năng phần cứng, tính sẵn sàng và độ tin cậy.

## [SQLite improving performance with pre-sort](https://andersmurphy.com/2026/06/07/sqlite-improving-performance-with-pre-sort.html)

Anders Murphy tiếp nối thử nghiệm về UUID4/UUID7 trong SQLite bằng một trường hợp khó hơn: khóa chính là giá trị ngẫu nhiên 160-bit, ví dụ mã thông báo phiên hoặc dữ liệu không thể chuyển sang UUID7 vì cần độ ngẫu nhiên cao và không muốn rò rỉ thông tin thời gian. Khi chèn trực tiếp một triệu dòng mỗi lô vào bảng `WITHOUT ROWID` có `BLOB PRIMARY KEY`, kết quả chỉ khoảng một trăm nghìn bản ghi mỗi giây. Nguyên nhân chính không nằm ở SQLite "chậm", mà ở bản chất của B+ Tree: cây được sắp xếp, nên ghi tuần tự rẻ hơn, còn khóa ngẫu nhiên làm đụng nhiều trang, tách trang và cân bằng lại cây liên tục.

Ý tưởng tối ưu rất đơn giản: vì dữ liệu đã được gom theo lô, hãy sắp xếp từng lô theo khóa trước khi chèn. Tác giả dùng 8 byte đầu của mảng 20 byte để so sánh unsigned, đủ gần với thứ tự `memcmp()` mà SQLite dùng cho BLOB trong thử nghiệm này. Dù phải trả thêm chi phí tạo và sắp xếp một triệu khóa, thời gian chèn giảm từ khoảng 2,5-11 giây xuống còn khoảng 2-4 giây khi bảng lớn dần, tức nhanh hơn khoảng 2-3 lần. Bài học thực dụng: gom theo lô không chỉ giảm số giao dịch, mà còn mở ra các tối ưu theo thứ tự dữ liệu trước khi ghi xuống bộ máy lưu trữ.

**Điểm chính:**
- Khóa chính ngẫu nhiên làm B+ Tree ghi kém hiệu quả vì phá tính tuần tự, gây page split và tái cân bằng thường xuyên.
- Nếu đã xử lý theo lô, sắp xếp lô theo khóa trước khi chèn có thể cải thiện hiệu năng đáng kể.
- Với BLOB trong SQLite, thứ tự so sánh dựa trên `memcmp()`, nên hàm so sánh phía ứng dụng cần gần với thứ tự đó.
- Chi phí sắp xếp vẫn có thể rẻ hơn chi phí ghi ngẫu nhiên vào cây khi lô dữ liệu đủ lớn.
- Gom dữ liệu theo lô là nền tảng cho các tối ưu sâu hơn: không chỉ gom giao dịch, mà còn chuẩn bị dữ liệu theo thứ tự thân thiện với lưu trữ.

## [Why is Meta destroying its engineering organization?](https://newsletter.pragmaticengineer.com/p/why-is-meta-destroying-its-engineering)

Gergely Orosz ghi lại một bức tranh rất căng về Meta trong giai đoạn công ty dồn lực cho AI. Theo bài viết, Meta từng có văn hóa kỹ thuật mạnh: ít quy trình cứng, đề cao tác động cá nhân, hạ tầng triển khai từng phần trưởng thành và kỹ sư được xem là trung tâm tạo lợi nhuận. Nhưng sau các khoản đầu tư lớn vào AI, đặc biệt quanh Scale AI và tổ chức ADO, nhiều kỹ sư cốt lõi bị đẩy sang công việc tạo dữ liệu huấn luyện, đánh giá đầu ra mô hình và RLHF. Một số đội hạ tầng, bảo mật bị mất 30-50% nhân sự, trong khi công ty vẫn tạo áp lực sa thải, đo lượng token AI và theo dõi thao tác bàn phím/chuột ở những nơi luật cho phép.

Điểm đáng chú ý không phải chỉ là "Meta dùng AI quá nhiều", mà là hệ thống động lực bị lệch. Khi lượng token AI trở thành tín hiệu đánh giá hiệu năng, kỹ sư sẽ tối ưu chỉ số đó thay vì tối ưu chất lượng thật. Khi mã do AI sinh ra và được AI rà soát được đẩy nhanh vào môi trường vận hành trong lúc đội bảo mật bị xáo trộn, rủi ro tích lũy rất nhanh. Bài viết liên hệ điều này với sự cố chiếm đoạt tài khoản Instagram gần đây và gọi đây là bài học về việc nhầm MTTR với chất lượng hệ thống: phục hồi nhanh không thay thế được hiểu biết con người, rào chắn kiểm soát và trách nhiệm kỹ thuật.

**Điểm chính:**
- Văn hóa kỹ thuật mạnh có thể bị phá rất nhanh nếu lãnh đạo đổi kỹ sư từ trung tâm tạo lợi nhuận thành trung tâm chi phí.
- Ép kỹ sư dùng AI và đo lượng token dễ tạo hành vi biểu diễn, không tạo phần mềm tốt hơn.
- Chuyển nhân sự hạ tầng/bảo mật sang gán nhãn dữ liệu hoặc RLHF có thể làm yếu đúng những đội cần giữ hệ thống an toàn.
- Mã do AI sinh ra và rà soát chỉ bằng AI không nên thay thế kiểm chứng của người chịu trách nhiệm với môi trường vận hành.
- Bài học rộng hơn: tốc độ phục hồi sự cố quan trọng, nhưng không thể bù cho kiến trúc, bảo mật và hiểu biết hệ thống đang suy giảm.

## [CS 6120: Advanced Compilers: The Self-Guided Online Course](https://www.cs.cornell.edu/courses/cs6120/2025fa/self-guided/)

Trang này là phiên bản tự học của CS 6120, một khóa cấp tiến sĩ của Cornell do Adrian Sampson giảng về triển khai ngôn ngữ lập trình và trình biên dịch. Nội dung đi từ các nền tảng phổ biến như biểu diễn trung gian, phân tích luồng dữ liệu, tối ưu hóa cục bộ/toàn cục, SSA và LLVM, rồi mở sang các chủ đề nghiên cứu hơn như quản lý bộ nhớ, trình biên dịch động, song song hóa và trình biên dịch nhanh. Mỗi bài học có video, ghi chú, bài đọc học thuật và một số bài thực hành mở để biến khái niệm trừu tượng thành mã nguồn thật.

Điểm hay của phiên bản tự học là nó giữ cấu trúc tuyến tính của khóa thật nhưng bỏ hạn nộp và phần thảo luận nội bộ. Người học có thể đi theo thứ tự được đề xuất: xem bài giảng, đọc bài báo, rồi làm nhiệm vụ triển khai với LLVM hoặc Bril, một ngôn ngữ trung gian giáo dục dùng cho lớp này. Đây là tài nguyên tốt cho lập trình viên muốn hiểu vì sao trình biên dịch không chỉ là bộ phân tích cú pháp và bộ sinh mã, mà là một chuỗi quyết định về biểu diễn chương trình, phân tích, tối ưu, môi trường chạy, đo hiệu năng và đánh đổi giữa độ đúng, tốc độ biên dịch và chất lượng mã sinh ra.

**Điểm chính:**
- Khóa học bao phủ lõi của trình biên dịch hiện đại: biểu diễn trung gian, phân tích luồng dữ liệu, tối ưu hóa, SSA, LLVM và quản lý bộ nhớ.
- Bài học kết hợp video, ghi chú, bài báo kinh điển và bài thực hành mở, nên phù hợp để tự học có chiều sâu.
- Bril giúp thử nghiệm ý tưởng trình biên dịch trong một biểu diễn trung gian nhỏ, dễ sửa hơn nhiều so với bắt đầu trực tiếp bằng trình biên dịch sản xuất.
- Các chủ đề như JIT, thu gom rác, song song hóa và trình biên dịch nhanh nối kiến thức nền với hướng nghiên cứu thực tế.
- Cách học tốt nhất là vừa đọc bài báo vừa viết lượt biến đổi hoặc công cụ nhỏ, vì khái niệm trình biên dịch rất dễ hiểu sai nếu chỉ đọc lý thuyết.

## [epoll vs io_uring in Linux](https://sibexi.co/posts/epoll-vs-io_uring/)

Bài viết so sánh `epoll` và `io_uring` từ trải nghiệm xây một máy chủ ủy quyền ngược tên TinyGate. Phiên bản đầu dùng kiến trúc worker đơn giản nên dễ hiểu nhưng có giới hạn hiệu năng rõ rệt; phiên bản sau chuyển sang `epoll` và nhanh hơn nhiều, nhưng vẫn phải trả giá vì mô hình sẵn sàng: `epoll` báo khi mô tả tệp có thể đọc/ghi, còn ứng dụng vẫn phải tự gọi `read()` hoặc `write()`. Với lượng kết nối lớn, mỗi sự kiện I/O thường kéo theo nhiều lời gọi hệ thống và chuyển ngữ cảnh giữa không gian người dùng với nhân hệ điều hành.

`io_uring` đổi sang mô hình hoàn tất: ứng dụng đưa yêu cầu I/O vào hàng đợi gửi nằm trong vùng nhớ chia sẻ, nhân hệ điều hành xử lý, rồi trả kết quả qua hàng đợi hoàn tất. Nhờ vậy một lời gọi `io_uring_enter()` có thể nộp và nhận cả lô thao tác thay vì trả phí theo từng `read()`/`write()`. Nếu bật `IORING_SETUP_SQPOLL`, có thể giảm gần như hết lời gọi hệ thống ở trạng thái ổn định, nhưng đổi lại có một luồng trong nhân liên tục thăm dò và tiêu thụ CPU. Bài viết cũng nhắc các chi tiết không nên bỏ qua: zero-copy cần đăng ký vùng đệm đúng cách, lỗi được trả bất đồng bộ trong hàng đợi hoàn tất, và ví dụ tối giản thường thiếu nhiều kiểm tra cần có trong mã vận hành thật.

**Điểm chính:**
- `epoll` là mô hình sẵn sàng: nó báo lúc I/O có thể thực hiện, nhưng ứng dụng vẫn phải tự gọi `read()`/`write()`.
- `io_uring` là mô hình hoàn tất: ứng dụng nộp thao tác, rồi nhận kết quả khi nhân hệ điều hành hoàn tất.
- Vòng đệm dùng chung giúp gom nhiều thao tác vào một lần vào nhân, giảm số lời gọi hệ thống khi tải I/O lớn.
- SQPOLL giảm thêm chi phí lời gọi hệ thống, nhưng không miễn phí vì cần một luồng nhân thăm dò và tiêu thụ CPU.
- Với dự án Linux hiện đại viết mới, `io_uring` đáng cân nhắc, nhưng độ phức tạp xử lý lỗi bất đồng bộ và yêu cầu nhân hệ điều hành mới phải được tính trước.
