---
title: "Newsletter #117"
date: 2026-07-05
tags: ["AI-Assisted", "Newsletter", "Performance", "Go", "PostgreSQL", "Security", "Linux"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #117.*

## [Should you normalize RGB values by 255 or 256?](https://30fps.net/pages/255-vs-256-division/)

Pekka Väänänen phân tích câu hỏi tưởng nhỏ nhưng dễ gây tranh luận trong xử lý ảnh: khi chuyển màu RGB 8-bit sang số thực, nên chia cho 255 hay dùng công thức lệch nửa bước rồi chia cho 256. Cách phổ biến `img / 255.0` ánh xạ 0 thành 0.0 và 255 thành 1.0, tiện cho mã xử lý ảnh vì đen và trắng tuyệt đối vẫn giữ đúng ý nghĩa. Cách thay thế `(img + 0.5) / 256.0` đặt mỗi giá trị vào giữa một khoảng lượng tử, nhìn đẹp hơn về mặt mô hình lượng tử và có lỗi tái dựng lý thuyết thấp hơn một chút nếu ta kiểm soát cả bước ghi lẫn đọc dữ liệu.

Kết luận thực dụng của bài viết là với ảnh đến từ bên ngoài, hãy dùng chia cho 255. Các vấn đề thường được nêu ra chống lại 255, như khoảng lượng tử ở hai đầu nhỏ hơn, giá trị số thực không biểu diễn chính xác tuyệt đối, hoặc cảm giác lãng phí một chút độ chính xác, đều rất nhỏ trong bối cảnh xử lý ảnh thông thường. Ngược lại, chia cho 256 khi ảnh vốn được lượng tử hóa theo quy ước 255 có thể đưa thêm sai lệch và buộc mã xử lý phụ thuộc vào dải 8-bit. Chỉ nên cân nhắc 256 khi bạn kiểm soát cả quy trình lưu và đọc ảnh, không cần 0 ánh xạ đúng về 0.0, và mọi bên dùng cùng một quy ước.

**Điểm chính:**
- Chia cho 255 là quy ước an toàn cho ảnh RGB 8-bit thông thường vì giữ 0.0 là đen và 1.0 là trắng.
- Chia cho 256 với lệch 0.5 có lập luận lượng tử hóa hợp lý hơn trong một số hệ thống khép kín, nhưng kém tiện cho mã xử lý tổng quát.
- Sai số số thực của `x / 255.0` quá nhỏ để trở thành vấn đề kỹ thuật trong hầu hết tác vụ xử lý ảnh.
- Không nên trộn bước mã hóa và giải mã của hai quy ước, vì đó mới là lỗi dễ làm hỏng kết quả thật sự.

## [Jira is Turing-Complete](https://seriot.ch/computation/jira.html)

Nicolas Seriot biến một câu đùa quen thuộc về Jira thành một chứng minh cụ thể: Jira Automation có thể mô phỏng máy thanh ghi Minsky, một mô hình tính toán đã được chứng minh là Turing-complete. Bài viết ánh xạ hai thanh ghi thành số lượng issue liên kết theo từng loại, ví dụ Bug và Task; program counter thành trạng thái của một Epic; bảng lệnh thành các automation rule; còn nhịp chạy là chuỗi chuyển trạng thái do automation kích hoạt. Với các thao tác tạo, xóa và kiểm tra issue liên kết, Jira có thể biểu diễn `INC`, `DEC` và rẽ nhánh có điều kiện.

Ví dụ tối giản trong bài là phép cộng: chuyển toàn bộ số Bug trong thanh ghi A sang số Task trong thanh ghi B, dùng các trạng thái như `TODO`, `DEV` và `PROD`. Khi A còn Bug, rule xóa một Bug rồi chuyển sang trạng thái tăng B; nếu A bằng 0 thì chuyển sang trạng thái dừng. Tác giả còn chỉ ra cách dùng thao tác đổi loại issue để rút gọn chương trình Fibonacci thành vài trạng thái. Kết luận không phải là nên lập trình bằng Jira, mà là các automation phức tạp trong Jira thật sự có hình dạng của chương trình: có trạng thái, bộ nhớ, nhánh điều kiện và vòng lặp, chỉ bị giới hạn bởi quota và cách vận hành của nền tảng.

**Điểm chính:**
- Jira Automation có thể mô phỏng máy Minsky bằng Epic, trạng thái workflow, issue liên kết và automation rule.
- Số lượng issue theo từng loại đóng vai trò thanh ghi; trạng thái Epic đóng vai trò lệnh hiện tại.
- Tạo, xóa và đổi loại issue đủ để biểu diễn tăng, giảm và di chuyển giá trị giữa các thanh ghi.
- Giới hạn quota của Jira Cloud không phủ nhận lập luận lý thuyết, vì mọi máy tính vật lý cũng hữu hạn trong thực tế.

## [USB for Software Developers: An introduction to writing userspace USB drivers](https://werwolv.net/posts/usb_for_sw_devs/)

WerWolv viết một bài nhập môn USB dành cho lập trình viên phần mềm muốn nói chuyện với thiết bị mà không cần đi sâu vào tín hiệu điện hay viết mã trong nhân hệ điều hành. Ví dụ xuyên suốt là một điện thoại Android ở chế độ bootloader, vì giao thức Fastboot đơn giản, tài liệu rõ và thường không bị hệ điều hành tự chiếm bởi driver có sẵn. Bài viết bắt đầu từ việc dùng `lsusb` để đọc `VID`, `PID`, lớp thiết bị và driver đang gắn, rồi chuyển sang `libusb` để phát hiện thiết bị trong không gian người dùng.

Phần giá trị nhất là cách bài viết nối các khái niệm USB với mã thật. Control endpoint `0x00` được dùng để gửi các request chuẩn như `GET_STATUS` và `GET_DESCRIPTOR`, giúp host đọc descriptor để biết thiết bị có cấu hình, interface và endpoint nào. Sau đó tác giả giải thích các loại transfer như Control, Bulk, Interrupt, Isochronous, cùng hướng `IN` và `OUT` luôn được hiểu từ góc nhìn của host. Cuối cùng, chương trình dùng Bulk endpoint để gửi lệnh Fastboot `getvar:version` và nhận phản hồi `OKAY0.4`. Thông điệp chính: với thiết bị USB có giao thức rõ ràng, driver userspace bằng `libusb` có thể gần với lập trình socket hơn là một nhiệm vụ kernel phức tạp.

**Điểm chính:**
- Không phải mọi driver USB đều cần viết trong nhân hệ điều hành; nhiều thiết bị có thể được điều khiển từ userspace bằng `libusb`.
- Enumeration giúp host đọc `VID`, `PID`, class, descriptor, interface và endpoint trước khi chọn cách giao tiếp.
- Endpoint giống cổng giao tiếp của thiết bị, nhưng USB vẫn do host chủ động hỏi; thiết bị không tự gửi dữ liệu nếu chưa được host yêu cầu.
- Fastboot là ví dụ gọn: gửi chuỗi lệnh qua Bulk OUT endpoint, nhận trạng thái và dữ liệu qua Bulk IN endpoint.

## [Everything you need to know about Sourcemaps](https://neciudan.dev/everything-you-need-to-know-about-sourcemaps)

Neciu Dan giải thích sourcemap từ góc nhìn vừa phục vụ gỡ lỗi vừa có rủi ro bảo mật. Khi ứng dụng frontend được build, trình duyệt thường chạy mã đã bundle, minify và đổi tên biến, nên lỗi kiểu `bundle.min.js:1:48211` gần như vô nghĩa với lập trình viên. Sourcemap là file JSON ánh xạ vị trí trong mã đã nén về file, dòng, cột và tên gốc. Các trường như `sources`, `names`, `mappings` và đặc biệt `sourcesContent` có thể tiết lộ cấu trúc thư mục, tên module, tên biến, comment và toàn bộ mã nguồn gốc nếu file `.map` được public.

Điểm chính của bài viết là minify không phải cơ chế bảo vệ mã. Nếu production bundle trỏ tới sourcemap bằng `sourceMappingURL` hoặc HTTP header `SourceMap`, DevTools và bất kỳ ai dùng `curl` đều có thể tải file đó nếu máy chủ cho phép. Tác giả lấy các sự cố public sourcemap làm ví dụ để nhấn mạnh rằng đây thường là lỗi cấu hình build hoặc đóng gói, không phải kỹ thuật tấn công phức tạp. Cách phòng tránh là tắt sourcemap production khi không cần, dùng hidden sourcemap và upload riêng cho công cụ theo dõi lỗi như Sentry khi cần, chặn truy cập `.map` ở máy chủ, loại `.map` khỏi artifact/npm package, và thêm kiểm tra CI/CD để fail build nếu artifact chứa sourcemap nguy hiểm.

**Điểm chính:**
- Sourcemap giúp biến stack trace và mã đã minify thành file, dòng, cột và tên biến gốc để gỡ lỗi dễ hơn.
- Trường `sourcesContent` có thể chứa toàn bộ mã nguồn ban đầu, nên public `.map` đồng nghĩa với public nhiều chi tiết nội bộ.
- Production sourcemap nên bị tắt hoặc chỉ dùng ở dạng hidden và upload riêng cho hệ thống theo dõi lỗi.
- Cần kiểm tra tự động trong build, deploy hoặc `npm pack` để không vô tình phát hành file `.map` chứa mã nguồn.

## [Extended Statistics in Postgres](https://www.valerieparhamthompson.com/posts/extended-statistics-postgres/)

Valerie Parham-Thompson giải thích cách extended statistics giúp Postgres query planner ước lượng tốt hơn khi các cột trong dữ liệu có quan hệ mà thống kê mặc định không thấy được. Planner vốn dựa vào các bảng thống kê nội bộ như `pg_class` và `pg_stats` để ước lượng số dòng, giá trị phân biệt, histogram và tần suất. Vấn đề là các thống kê đơn cột thường giả định điều kiện độc lập với nhau. Nếu `zip='91605'` và `state='CA'` thực tế phụ thuộc chặt chẽ, nhưng planner nhân xác suất của từng điều kiện như hai biến độc lập, nó có thể đánh giá số dòng thấp hơn nhiều và chọn kế hoạch truy vấn kém.

Bài viết đi qua ba loại extended statistics chính. `dependencies` mô tả quan hệ phụ thuộc giữa các cột, ví dụ ZIP code gần như xác định state, giúp ước lượng số dòng gần thực tế hơn sau khi chạy `CREATE STATISTICS ... (dependencies)` và `ANALYZE`. `mcv` lưu các tổ hợp giá trị phổ biến trên nhiều cột, hữu ích cho các điều kiện `WHERE` kết hợp như category và subcategory. `ndistinct` giúp planner ước lượng số nhóm khi `GROUP BY` nhiều cột, thay vì chỉ nhân số lượng giá trị phân biệt từng cột. Bài học thực tế: nếu bạn biết các cột có tương quan, hãy dạy planner bằng extended statistics thay vì chỉ thêm index.

**Điểm chính:**
- Thống kê mặc định của Postgres chủ yếu nhìn từng cột, nên dễ sai khi nhiều điều kiện `WHERE` phụ thuộc nhau.
- `dependencies` giúp planner hiểu quan hệ phụ thuộc giữa các cột như ZIP code và state.
- `mcv` cải thiện ước lượng cho các tổ hợp giá trị phổ biến trong điều kiện lọc nhiều cột.
- `ndistinct` hữu ích cho truy vấn `GROUP BY` nhiều cột vì ước lượng số nhóm sát thực tế hơn.

## [Finding a needle in a 4 GB haystack: from 0.75 GB/s to 49 GB/s in Go](https://segflow.github.io/post/fast-file-search-go/)

Assel Meher dùng một bài toán cố ý đơn giản để mổ xẻ hiệu năng đọc và quét file trong Go: tìm một giá trị `int64` khác 0 nằm ở cuối file 4 GiB gần như toàn số 0. Vì không có parsing hay thuật toán phức tạp, benchmark phơi ra chi phí thật của từng lớp: Go runtime, thư viện chuẩn, syscall, page cache, bộ nhớ, `mmap`, `pread`, đa luồng và SIMD. Điểm xuất phát là `os.ReadFile` rồi `range` qua từng byte, chỉ đạt khoảng 0.75 GB/s vì vừa cấp phát/copy 4 GiB vừa quét từng byte. `bufio.ReadByte` cũng không khá hơn vì trả giá một function call cho mỗi byte.

Các bước tối ưu thú vị hơn đến từ việc giảm overhead theo byte và hiểu đúng bottleneck. Đọc theo chunk 1 MiB và quét theo `uint64` đã nhảy lên hơn 13 GB/s. `mmap` không tự thắng vì tránh copy nhưng thêm hơn một triệu minor page fault khi chạm từng trang. Song song hóa giúp cải thiện, nhưng `pread` song song lại vượt `mmap` vì copy tuần tự theo chunk rẻ hơn page fault hàng loạt. SIMD bằng AVX2 hoặc `simd/archsimd` của Go 1.26 làm vòng quét rất rẻ, nhưng khi đã đụng trần băng thông bộ nhớ thì lợi ích chính nằm ở chiến lược đọc và song song hóa. Kết quả tốt nhất đạt khoảng 49 GB/s với `pread` song song và SIMD thuần Go.

**Điểm chính:**
- Tối ưu lớn nhất đến từ tránh chi phí theo byte: đừng gọi hàm hoặc branch cho từng byte nếu có thể xử lý theo chunk và word lớn hơn.
- `mmap` không phải luôn nhanh hơn `pread`; với file lớn trong page cache, minor page fault có thể đắt hơn copy tuần tự.
- Song song hóa thường thắng SIMD đơn luồng trong workload bị giới hạn bởi bộ nhớ.
- Khi đã chạm trần băng thông DRAM, cách tối ưu thật sự là đọc ít dữ liệu hơn hoặc thay đổi phần cứng.

## [HTTP caching, a refresher](https://danburzo.ro/http-caching-refresher/)

Dan Cătălin Burzo đọc lại RFC 9111 để hệ thống hóa các khái niệm quan trọng của HTTP caching hiện đại. Bài viết nhắc rằng cache không chỉ là cache riêng trong trình duyệt, mà còn gồm các shared cache như proxy, CDN hoặc Varnish ở giữa client và origin. Trọng tâm là `Cache-Control`: các directive như `max-age`, `s-maxage`, `no-cache`, `no-store`, `private`, `public`, `must-revalidate`, `stale-while-revalidate` và `stale-if-error` không chỉ quyết định có lưu response hay không, mà còn quyết định khi nào response còn fresh, khi nào phải revalidate, và shared cache có được phép lưu response cho request có `Authorization` hay không.

Bài viết cũng giải thích các chi tiết dễ nhầm: response hết hạn không nhất thiết bị bỏ đi, vì cache có thể dùng conditional request với `ETag` hoặc `Last-Modified` để nhận `304 Not Modified`; `Vary` mở rộng cache key theo header như `Accept-Language` nhưng có thể làm cache kém hiệu quả nếu header quá đa dạng; `No-Vary-Search` giải quyết chiều ngược lại bằng cách bỏ qua query parameter không ảnh hưởng nội dung. Phần cuối so sánh soft reload và hard reload trong trình duyệt, vai trò của `immutable`, và cảnh báo rằng `public`, `s-maxage`, `must-revalidate` có thể làm shared cache lưu response của request đã xác thực nếu dùng sai. Đây là bài ôn tập tốt cho cả server, CDN và client tùy biến.

**Điểm chính:**
- Freshness dựa trên tuổi của response so với `max-age`, `s-maxage`, `Expires` hoặc heuristic từ `Last-Modified`.
- Revalidation bằng `If-None-Match`/`ETag` hoặc `If-Modified-Since`/`Last-Modified` giúp tránh tải lại body khi nội dung chưa đổi.
- `Vary` cần dùng cẩn thận vì nó làm tăng số biến thể cache theo các request header được liệt kê.
- Với response cho request có `Authorization`, hãy hiểu rõ tác động của `public`, `s-maxage`, `must-revalidate` và dùng `private` khi cần chặn shared cache.

## [How to Use ss as a Replacement for netstat to View IPv4 Sockets](https://oneuptime.com/blog/post/2026-03-20-ss-replacement-netstat-ipv4-sockets/view)

Nawaz Dhandala giới thiệu `ss` như lựa chọn hiện đại và nhanh hơn `netstat` để kiểm tra socket trên Linux, đặc biệt khi hệ thống có nhiều kết nối. Bài viết tập trung vào IPv4 với cờ `-4`, rồi đưa ra các mẫu lệnh thường dùng: xem toàn bộ TCP/UDP/raw socket, xem TCP connection, xem cổng đang listen, kèm thông tin tiến trình/PID khi có quyền, lọc theo trạng thái `established`, lọc theo port hoặc IP, và lấy thống kê tổng quan bằng `ss -s`.

Điểm hữu ích nhất là bảng ánh xạ tư duy từ `netstat` sang `ss`: những lệnh quen như `netstat -an`, `netstat -tnp`, `netstat -tlnp` có thể chuyển gần như trực tiếp thành `ss -an`, `ss -tnp`, `ss -tlnp`. Với chẩn đoán hằng ngày, `ss -4tulnp` là lệnh gọn để xem các TCP/UDP socket IPv4 đang listen kèm tiến trình, còn `ss -4tn state established` phù hợp khi cần xem các kết nối TCP IPv4 đang hoạt động. Đây là một bài dạng cheat sheet ngắn, thực dụng cho vận hành Linux.

**Điểm chính:**
- `ss` thay thế `netstat` tốt hơn trên hệ thống bận vì đọc thông tin socket trực tiếp từ kernel và nhanh hơn.
- Cờ `-4` giới hạn kết quả về IPv4; `-t`, `-u`, `-l`, `-n`, `-p` lần lượt lọc TCP, UDP, listening, numeric output và process.
- Có thể lọc theo trạng thái, port hoặc IP bằng cú pháp như `state established`, `dport = :443`, `src 192.168.1.100`.
- Lệnh thực dụng nhất để kiểm tra service đang listen là `ss -4tulnp`.
