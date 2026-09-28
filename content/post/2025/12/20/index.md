---
title: "Newsletter #73"
date: 2025-12-20
tags: ["AI-Assisted", "Newsletter", "Go", "Databases", "Performance", "Caching", "System Design"]
categories: ["Newsletter"]
---

*~~Gầy đây mình mới biết [OpenRouter đã hỗ trợ tích hợp Claude Code](https://openrouter.ai/docs/guides/guides/claude-code-integration), nên nay dùng thử. Bài viết này được thực hiện bởi [Claude Code](https://claude.com/product/claude-code) + [Open Router](https://openrouter.ai/) + [Z.AI: GLM 4.5 Air (free)](https://openrouter.ai/z-ai/glm-4.5-air:free).~~ Mời bạn thưởng thức Newsletter #73.*

## [System Design Deep Dive: Time Series Databases (TSDBs) Explained](https://designgurus.substack.com/p/system-design-deep-dive-time-series)

Cơ sở dữ liệu chuỗi thời gian (TSDB) được thiết kế riêng cho loại dữ liệu đổ về liên tục theo thứ tự thời gian, như chỉ số cảm biến IoT, nhật ký ứng dụng hay số liệu giám sát máy chủ. Mỗi phép đo được lưu kèm dấu thời gian, nhờ đó việc theo dõi biến động và phát hiện xu hướng trở nên dễ dàng. Bài viết nêu ba đặc điểm cốt lõi: nén dữ liệu hiệu quả bằng mã hóa delta và mã hóa độ dài loạt (run-length encoding) để tận dụng các mẫu lặp lại; tự động quản lý vòng đời dữ liệu bằng chính sách lưu giữ (xóa hoặc lưu trữ dữ liệu cũ) và giảm mẫu (gộp dữ liệu cũ thành các khoảng thời gian thô hơn như trung bình theo giờ); và truy vấn theo khoảng thời gian rất nhanh vì thời gian chính là chỉ mục chính, nhiều hệ thống còn truy vấn được ngay trên dữ liệu nén.

So với cơ sở dữ liệu quan hệ, TSDB vượt trội ở ghi dữ liệu tần suất cao và các phép tổng hợp trên khoảng thời gian dài, chẳng hạn "giá trị trung bình mỗi phút trong 90 ngày", nhờ bố cục lưu trữ dạng cột, chỉ ghi nối thêm và phân vùng theo thời gian. Ngược lại, nếu ứng dụng cần nhiều phép nối bảng hoặc cập nhật từng bản ghi thường xuyên thì cơ sở dữ liệu quan hệ vẫn phù hợp hơn. Đây là kiến thức hữu ích khi chuẩn bị phỏng vấn thiết kế hệ thống.

## [How Memory Maps (mmap) Deliver 25x Faster File Access in Go](https://info.varnish-software.com/blog/how-memory-maps-mmap-deliver-25x-faster-file-access-in-go)

Lời gọi hệ thống (system call) là một trong những thao tác chậm nhất của ứng dụng vì phải chuyển vào nhân hệ điều hành. Tác giả Per Buer (Varnish Software) giới thiệu ánh xạ bộ nhớ (mmap): biến một tệp thành một phần của bộ nhớ ảo, rồi đọc thẳng qua con trỏ thay vì dò tìm và đọc bằng pread(). Thư viện Go thử nghiệm cho thấy tra cứu ngẫu nhiên giảm từ 416,4 ns/op xuống 3,3 ns/op, còn duyệt tuần tự giảm từ 333,3 ns/op xuống 1,3 ns/op; làm việc trực tiếp với con trỏ cũng giảm áp lực bộ nhớ và độ trễ.

Điểm yếu của mmap nằm ở thao tác ghi: khi ghi vào trang chưa có trong bộ nhớ vật lý, CPU phát sinh lỗi trang, hệ điều hành phải cấp trang mới và đọc nội dung tệp vào trước khi ứng dụng ghi đè lên, nên hiệu năng phụ thuộc hoàn toàn vào việc trang đã nằm trong bộ đệm hay chưa; pwrite dễ dự đoán hơn nhiều. Chính vì vậy Varnish Cache sau này có thêm backend malloc và các Massive Storage Engine dùng io_uring. Trong ứng dụng thực tế, khi xây dựng một hệ thống tệp chạy trên HTTP, tác giả thay phần đọc CDB bằng mmap và đạt tốc độ tra cứu nhanh gấp 25 lần mà không có nhược điểm nào đi kèm.

## [Bloom filters](https://eli.thegreenplace.net/2025/bloom-filters)

Bloom filter là cấu trúc dữ liệu xác suất do Burton Bloom đề xuất năm 1970, dùng để kiểm tra nhanh một phần tử có thuộc tập hợp hay không với rất ít thời gian và bộ nhớ. Nó hoạt động như một bộ đệm có tính xác suất: nếu trả lời "không có" thì chắc chắn 100% phần tử không nằm trong tập hợp, còn nếu trả lời "có" thì vẫn tồn tại một xác suất nhỏ là dương tính giả. Vì vậy Bloom filter đặc biệt hiệu quả khi phần lớn truy vấn có kết quả phủ định, chẳng hạn kiểm tra một khóa có nằm trong tệp trên đĩa hay không trước khi tốn công đọc tệp. Về cấu tạo, đây là một mảng m bit cùng k hàm băm: khi chèn, phần tử được băm bằng k hàm và các bit tương ứng được bật lên 1; khi kiểm tra, chỉ cần một bit bằng 0 là kết luận ngay phần tử không có.

Eli Bendersky minh họa bằng ví dụ từng bước, kèm bản cài đặt Go dùng kỹ thuật băm kép để sinh k hàm băm từ hai giá trị băm, cùng công thức chọn tham số tối ưu: m/n ≈ -ln(ε)/ln²(2) và k = (m/n)·ln(2). Với 1 tỷ phần tử và tỷ lệ dương tính giả 1%, bộ lọc cần khoảng 9,6 tỷ bit (xấp xỉ 1,2GB) và 7 hàm băm. Chi phí tra cứu là hằng số, không phụ thuộc số phần tử đã chèn hay đặc điểm dữ liệu.

## [What the heck is AEAD again?](https://ochagavia.nl/blog/what-the-heck-is-aead-again/)

AEAD (Authenticated Encryption with Associated Data, mã hóa có xác thực kèm dữ liệu liên kết) là tiêu chuẩn mã hóa hiện nay: TLS 1.3 mô hình hóa mọi thuật toán mã hóa dưới dạng AEAD, QUIC (nền tảng của HTTP/3) bắt buộc dùng nó, và thư viện Tink của Google chỉ hỗ trợ AEAD khi mã hóa dữ liệu. Tác giả giải thích từng phần của thuật ngữ. "Xác thực" nghĩa là chứng minh bản mã không bị sửa đổi sau khi mã hóa; trước đây lập trình viên phải tự ghép bước mã hóa và bước tạo mã HMAC nên rất dễ sai, như lỗ hổng iMessage của Apple. Các thư viện như libsodium đã gói hai bước đó vào một API duy nhất để người dùng khó dùng sai hơn.

"Dữ liệu liên kết" là phần dữ liệu không mã hóa nhưng vẫn cần bảo vệ khỏi bị thay đổi. Ví dụ trong ứng dụng chat, máy chủ cần đọc `conversation_id` để định tuyến tin nhắn; nếu kẻ tấn công ở giữa đổi mã này sang một cuộc trò chuyện khác của cùng hai người mà phía nhận không xác thực nó, tin nhắn vẫn giải mã thành công và bị xử lý sai ngữ cảnh. API AEAD buộc xác thực đồng thời cả bản mã lẫn dữ liệu liên kết. Các thuật toán AEAD đã được chuẩn hóa như AES256-GCM hay ChaCha20-Poly1305 dùng được trên nhiều thư viện và ngôn ngữ; tác giả khuyên nên theo khuyến nghị của Tink, trừ khi hệ thống có yêu cầu đặc biệt.

## [Ceilometer: Uber's Adaptive Benchmarking Framework](https://www.uber.com/in/en/blog/ceilometer-ubers-adaptive-benchmarking-framework/)

Mọi loại máy chủ mới, bản nâng cấp nhân hệ điều hành hay thay đổi cấu hình tại Uber đều phải được kiểm định kỹ trước khi đưa vào môi trường thật, nhưng quy trình cũ thủ công, rời rạc giữa các nhóm và kết quả nằm rải rác trong bảng tính. Ceilometer ra đời để giải quyết vấn đề đó: một nền tảng đo hiệu năng thích ứng với cấu hình kiểm thử chuẩn hóa để so sánh công bằng, bộ kiểm thử đóng gói trong container để nhà cung cấp phần cứng tự chạy, và báo cáo có đầy đủ ngữ cảnh. Kiến trúc gồm điều phối kiểm thử phân tán trên cụm máy chuyên dụng, dịch vụ tiếp nhận và chuẩn hóa kết quả, kho lưu trữ blob, kho dữ liệu tập trung và dịch vụ phân tích. Hệ thống hỗ trợ kiểm thử tổng hợp (synthetic), kiểm thử cho cơ sở dữ liệu có trạng thái thông qua nền tảng Odin, và cho dịch vụ không trạng thái thông qua Ballast.

Hai ứng dụng chính là kiểm định loại máy chủ mới (shape qualification), từ lúc nhà cung cấp còn đang phát triển cho đến khi chạy trong môi trường của Uber, và xác minh thay đổi hạ tầng cùng chủ sở hữu dịch vụ, giúp cô lập, tái hiện và khắc phục các suy giảm hiệu năng. Ceilometer gần đây còn được dùng để kiểm chứng các bản nâng cấp "touchless" từ nhà cung cấp đám mây. Hướng phát triển tiếp theo gồm tích hợp AI/ML sâu hơn, mở rộng hệ sinh thái hỗ trợ, phát hiện bất thường nâng cao và bổ sung chỉ số mức sử dụng theo từng thành phần.

## [Useful patterns for building HTML tools](https://simonwillison.net/2025/Dec/10/html-tools/)

Simon Willison gọi "công cụ HTML" là những ứng dụng nhỏ gói gọn HTML, JavaScript và CSS trong một tệp duy nhất; hai năm qua ông đã xây dựng hơn 150 công cụ như vậy, hầu hết do LLM viết. Bài viết tổng hợp các mẫu thiết kế rút ra từ kinh nghiệm đó: giữ mỗi công cụ là một tệp, không dùng React hay bước build, tải thư viện phụ thuộc từ CDN; tạo nguyên mẫu nhanh bằng Artifacts hoặc Canvas rồi chuyển sang coding agent khi dự án phức tạp hơn; và tự lưu trữ công cụ ở nơi khác thay vì để trên nền tảng LLM, vốn chạy trong sandbox nhiều hạn chế.

Về kỹ thuật, tác giả khuyên tận dụng sao chép và dán làm kênh nhập xuất dữ liệu, lưu trạng thái trên URL để dễ chia sẻ, dùng localStorage cho khóa bí mật hoặc trạng thái lớn hơn, sưu tầm các API hỗ trợ CORS (kể cả gọi thẳng LLM từ trình duyệt), cho phép mở tệp cục bộ và tạo tệp tải về. Pyodide và WebAssembly mở thêm khả năng chạy Python hay các thư viện nặng ngay trong trình duyệt. Ông cũng khuyến khích xây dựng công cụ gỡ lỗi để khám phá khả năng của trình duyệt, phối lại các công cụ cũ làm nền cho công cụ mới, và lưu lại prompt cùng bản ghi hội thoại. Cuối cùng, tác giả kêu gọi người đọc tự xây dựng bộ sưu tập riêng, chẳng hạn lưu trữ trên GitHub Pages.

## [Memory Allocation in Go](https://nghiant3223.github.io/2025/06/03/memory_allocation_in_go.html)

Bài viết phân tích sâu cơ chế cấp phát bộ nhớ trong Go runtime, kiến thức quan trọng để tối ưu hiệu năng ứng dụng. Go quản lý heap theo ba tầng: mheap quản lý bộ nhớ toàn cục theo trang và span, mcentral phân phối span theo từng lớp kích thước, còn mcache là bộ đệm riêng của mỗi processor P giúp cấp phát nhanh mà không cần khóa. Đối tượng được chia làm ba nhóm: tiny (dưới 16 byte, gom chung vào các khối 16 byte bằng bộ cấp phát chuyên dụng), small (từ 16 đến 32760 byte, được quản lý qua span với 68 lớp kích thước) và large (lớn hơn 32760 byte, cấp phát thẳng từ mheap).

Stack của goroutine khởi đầu với 2 KB và được nhân đôi khi cần nhờ cơ chế stack liên tục (contiguous stack), thay cho stack phân đoạn vốn gây vấn đề hiệu năng ở các phiên bản cũ. Phân tích thoát (escape analysis) của trình biên dịch quyết định một biến nằm trên stack hay heap để đảm bảo an toàn bộ nhớ. Ba nghiên cứu tình huống cuối bài chỉ ra cách giảm số lần cấp phát: tái sử dụng mảng nền của slice, gom nhiều biến vào một struct và tái sử dụng đối tượng bằng sync.Pool. Hiểu rõ những cơ chế này giúp lập trình viên Go viết mã nguồn hiệu quả và tránh các vấn đề hiệu năng liên quan đến quản lý bộ nhớ.

## [System Design Masterclass: Building a Global CDN and Edge Caching Strategy](https://designgurus.substack.com/p/system-design-masterclass-building)

Bài viết hướng dẫn từng bước thiết kế mạng phân phối nội dung (CDN) toàn cầu cùng chiến lược lưu đệm tại biên (edge caching), với nguyên tắc cốt lõi: đưa nội dung đến gần người dùng. Đầu tiên cần xác định người dùng ở đâu và phân loại nội dung thành tĩnh (hình ảnh, tệp CSS/JS, video) và động (phản hồi API, trang cá nhân hóa). Tiếp theo, chọn nhà cung cấp CDN có điểm hiện diện (PoP) gần nhóm người dùng chính, định tuyến thông minh bằng anycast hoặc DNS tối ưu; các dịch vụ rất lớn có thể dùng nhiều CDN để tăng dự phòng. Sau đó cấu hình quy tắc lưu đệm: đặt TTL dài (nhiều ngày hoặc tuần) cho tài nguyên tĩnh, xử lý thận trọng nội dung động bằng TTL ngắn hoặc lưu đệm vi mô (micro-caching) vài giây, và thiết kế khóa đệm hợp lý.

Để người dùng không thấy nội dung cũ mãi, cần kết hợp ba cách vô hiệu hóa bộ đệm: để TTL tự hết hạn, xóa thủ công qua API và gắn phiên bản vào tên tệp. Cuối cùng, hãy liên tục theo dõi tỷ lệ trúng bộ đệm (cache hit ratio), đo hiệu năng từ nhiều khu vực, kiểm tra các kịch bản sự cố và tận dụng tính năng chống DDoS cũng như SSL offloading của CDN. Tác giả ví CDN như hệ thống thư viện chi nhánh khắp thế giới, giúp người đọc mượn sách ở chi nhánh gần nhất thay vì phải tới thư viện trung tâm.

## [Protect Your API: A Developer's Guide to Rate Limiting and Throttling](https://designgurus.substack.com/p/system-design-blueprint-designing)

Tài nguyên của mọi hệ thống đều hữu hạn, và một đợt tăng lưu lượng đột ngột, một bot dò mật khẩu hay thậm chí lỗi ở mã nguồn giao diện cũng có thể làm máy chủ quá tải. Giới hạn tốc độ (rate limiting) là cơ chế đặt trần cho số lần một người dùng được thực hiện một hành động trong khoảng thời gian nhất định, giống như biển giới hạn tốc độ trên đường cao tốc. Nó giúp chặn tấn công DDoS bằng cách phát hiện địa chỉ IP gửi lượng yêu cầu bất thường, đảm bảo phân bổ tài nguyên công bằng để một "người hàng xóm ồn ào" không làm chậm ứng dụng của mọi người, và ngăn tấn công dò mật khẩu (brute force) bằng cách khóa sau vài lần đăng nhập sai.

Cơ chế này thường đặt ở tầng ứng dụng hoặc middleware: mỗi yêu cầu được nhận diện qua địa chỉ IP, mã người dùng hay API key, rồi so số lần gọi gần đây với ngưỡng cho phép; yêu cầu vượt ngưỡng bị từ chối với mã HTTP 429 Too Many Requests. Bài viết giới thiệu bốn thuật toán phổ biến: Token Bucket cho phép lưu lượng tăng vọt ngắn hạn và được Amazon, Stripe sử dụng; Leaky Bucket làm đều luồng yêu cầu theo nhịp cố định, phù hợp khi ghi vào cơ sở dữ liệu; cùng Fixed Window và Sliding Window. Phần sau bàn thêm cách triển khai giới hạn tốc độ phân tán bằng Redis, một chủ đề thường gặp trong phỏng vấn thiết kế hệ thống.

## [ACID vs BASE: The System Design Interview](https://designgurus.substack.com/p/acid-vs-base-the-system-design-interview)

Mọi hệ thống lớn đều phải cân bằng giữa tốc độ và độ tin cậy, và khi thiết kế cơ sở dữ liệu, bạn phải chọn giữa hai triết lý ACID và BASE. ACID là "người cầu toàn khắt khe", tiêu chuẩn vàng của cơ sở dữ liệu quan hệ như MySQL hay PostgreSQL: tính nguyên tử (Atomicity) đảm bảo giao dịch hoặc hoàn tất trọn vẹn hoặc được hoàn tác nhờ nhật ký; tính nhất quán (Consistency) buộc dữ liệu tuân thủ các ràng buộc của lược đồ; tính cô lập (Isolation) dùng khóa để hai người không thể cùng mua chiếc vé cuối cùng; còn tính bền vững (Durability) ghi dữ liệu vào write-ahead log để không mất sau sự cố. Điểm yếu của ACID là rất khó mở rộng theo chiều ngang khi dữ liệu trải trên hàng trăm máy chủ.

BASE ra đời cho kỷ nguyên dữ liệu lớn và thường gặp ở các cơ sở dữ liệu NoSQL như Cassandra, DynamoDB hay MongoDB: hệ thống luôn phản hồi (Basically Available), trạng thái có thể tự thay đổi trong lúc các bản sao đồng bộ (Soft State), và dữ liệu cuối cùng sẽ nhất quán (Eventual Consistency), giống như ảnh bạn vừa đăng lên Instagram có thể vài giây sau bạn bè mới thấy. ACID phù hợp với hệ thống tài chính, quản lý kho và hồ sơ y tế; BASE hợp với mạng xã hội, phân tích thời gian thực và phân phối nội dung. Nói gọn, ACID bi quan nên khóa mọi thứ, còn BASE lạc quan nên cứ chạy nhanh; câu hỏi quyết định là "nếu dữ liệu sai trong 2 giây, có ai mất tiền không?".

## [Hash tables in Go and advantage of self-hosted compilers](https://rushter.com/blog/go-and-hashmaps/)

Go không có kiểu set dựng sẵn nên lập trình viên thường dùng map để lưu các giá trị duy nhất. Mẹo quen thuộc là dùng `map[int]struct{}` thay cho `map[int]bool`, vì struct rỗng có kích thước 0 byte nên phần giá trị lẽ ra không tốn bộ nhớ. Tuy nhiên khi áp dụng trong môi trường thật, tác giả không thấy mức tiêu thụ bộ nhớ thay đổi, dù cả Google lẫn LLM (kể cả khi bật tìm kiếm web) đều khẳng định mẹo này vẫn hiệu quả với Go 1.24.

Nhờ trình biên dịch Go được viết bằng chính Go (self-hosted compiler), tác giả dễ dàng đọc mã nguồn runtime và tìm ra nguyên nhân. Từ Go 1.24, map chuyển sang cài đặt Swiss Tables, trong đó khóa và giá trị được lưu chung trong một struct slot. Khi trường cuối của struct có kích thước 0, trình biên dịch buộc nó chiếm 1 byte để con trỏ không trỏ ra ngoài vùng nhớ, rồi thêm 7 byte đệm để căn chỉnh theo bội số 8 của khóa kiểu int; bool cũng chiếm 1 byte nên hai cách cho ra mức sử dụng bộ nhớ như nhau. Trước Go 1.24, khóa và giá trị nằm ở hai mảng riêng nên trình biên dịch có thể bỏ hẳn mảng giá trị khi dùng `struct{}`. Bài học rút ra: mẹo cũ không còn tác dụng mà còn làm mã khó đọc hơn, và đừng tin mọi điều LLM nói.

## [Gist of Go: Concurrency](https://antonz.org/go-concurrency/)

Gist of Go: Concurrency là cuốn sách tương tác của Anton Zhiyanov, dạy lập trình đồng thời trong Go từ nền tảng thông qua bài tập thực hành. Khác với nhiều tài liệu chỉ giới thiệu goroutine, channel, select rồi để người đọc tự xoay xở, hoặc liệt kê các mẫu đồng thời mà không giải thích, cuốn sách tập trung vào việc hiểu và biết áp dụng đúng các công cụ này. Mỗi bài tập đủ ngắn để giải trong khoảng một trang mã nguồn nhưng vẫn sát với tình huống thực tế, chạy ngay trên trình duyệt, có bộ kiểm thử tự động phản hồi tức thì cùng lời giải tham khảo kèm giải thích. Đối tượng là lập trình viên đã nắm Go cơ bản (đến interface và xử lý lỗi), không cần biết trước về goroutine hay channel.

Nội dung trải từ goroutine, channel, pipeline, thời gian và context đến wait group, data race, race condition, semaphore, cơ chế báo hiệu, atomic, rồi kiểm thử và cơ chế bên trong. Sách có hơn 500 ví dụ tương tác, 50 bài tập tự kiểm tra có lời giải, bản PDF 448 trang, và nội dung hoàn toàn nguyên bản, không do AI tạo ra. Cuốn sách được phát triển từ khóa học Go concurrency mà tác giả mở năm 2022, đến nay có 250 học viên hoàn thành với điểm đánh giá trung bình 5 sao; có thể đọc trực tuyến hoặc mua để mở khóa toàn bộ bài tập.

## [The State of AI Coding 2025 | Greptile](https://www.greptile.com/state-of-ai-coding)

Greptile công bố báo cáo liên ngành về xu hướng phát triển phần mềm với AI năm 2025, dựa trên dữ liệu nội bộ từ các pull request được công cụ này review và số liệu tải gói công khai trên PyPI, npm. Về tốc độ đội kỹ sư, kích thước PR trung vị tăng 33% từ tháng 3 đến tháng 11/2025 (từ 57 lên 76 dòng thay đổi), số dòng mã mỗi lập trình viên tăng 76% (từ 4.450 lên 7.839), riêng các nhóm cỡ vừa 6–15 người tăng 89%. Về mức độ áp dụng công cụ, mem0 chiếm 59% thị phần gói bộ nhớ cho AI, thị trường cơ sở dữ liệu vector chưa có người thắng rõ ràng (Weaviate dẫn đầu với 25%), CLAUDE.md là định dạng tệp quy tắc AI phổ biến nhất với 67%, Anthropic SDK đạt 43 triệu lượt tải mỗi tháng (tăng 8 lần) và LiteLLM tăng 4 lần lên 41 triệu.

Về xu hướng mô hình, OpenAI SDK vẫn dẫn đầu với 130 triệu lượt tải nhưng tỷ lệ OpenAI so với Anthropic đã giảm từ 47:1 (tháng 1/2024) xuống 4,2:1 (tháng 11/2025). Phần so sánh hiệu năng đo GPT-5.1, GPT-5-Codex, Claude Sonnet 4.5, Claude Opus 4.5 và Gemini 3 Pro khi làm backend cho coding agent: hai mô hình của Anthropic trả token đầu tiên nhanh nhất (dưới 2,5 giây ở p50), hai mô hình của OpenAI có thông lượng cao nhất, còn Gemini 3 Pro chậm nhất ở cả hai tiêu chí. Báo cáo khép lại bằng tổng hợp các nghiên cứu mới về mô hình nền tảng và ứng dụng.

## Bonus

### Images

![A Guide to Retry Pattern in Distributed Systems](https://substackcdn.com/image/fetch/$s_!VQTW!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fee73de9e-d2ee-407a-ac6e-93679bdd887d_2250x2624.png)


**Đánh giá:** *Tốc độ xử lý urls rất chậm, mình mất cực nhiều thời gian so với trước kia để xử lý 1 url. Tóm tắt khi ngắn khi dài, lại còn đôi khi lẫn lộn kí tự tiếng Trung vào nữa (có vẻ là do model của Z.AI)*

---

*Bài viết đã được viết lại bởi Claude Code với Opus 5.5 vào ngày 27/09/2026.*
