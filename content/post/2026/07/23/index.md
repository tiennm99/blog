---
title: "Newsletter #126"
date: 2026-07-23
tags: ["AI-Assisted", "Go", "Performance", "Backend", "System Design", "Security", "Databases"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #126.*

## [2. Portable Executables](https://anteiku.fun/papers/an-introduction-to-modern-malware-development-for-red-teams/02_portable_executables/)

Bài viết giới thiệu định dạng Portable Executable (PE), nền tảng của các tệp thực thi, thư viện liên kết động và trình điều khiển trên Windows. Nội dung lần lượt giải thích DOS Header, DOS Stub, PE Header, Optional Header, bảng phân đoạn và các phân đoạn quen thuộc như `.text`, `.data`, `.rdata`, `.rsrc` và `.reloc`. Qua đó, người đọc có thể hình dung cách Windows Loader xác định kiến trúc, ánh xạ tệp vào bộ nhớ, đặt quyền truy cập và chuyển điều khiển đến điểm bắt đầu thực thi.

Phần sau trình bày góc nhìn phân tích tĩnh của các sản phẩm bảo mật. Những dấu hiệu thường được xem xét gồm hàm băm, chữ ký số, độ hỗn loạn của dữ liệu, điểm bắt đầu bất thường, quyền bộ nhớ `RWX`, chênh lệch giữa kích thước trên đĩa và trong bộ nhớ, tên phân đoạn lạ, bảng nhập khẩu thưa thớt và các tổ hợp API đáng ngờ. Kiến thức này giúp người học hiểu vì sao cấu trúc PE là nền tảng quan trọng cho cả phân tích phần mềm độc hại lẫn phát hiện các tệp có dấu hiệu bị đóng gói hoặc làm rối.

**Điểm chính:**
- PE mô tả cả cấu trúc tệp trên đĩa lẫn cách Windows ánh xạ tệp vào bộ nhớ.
- Các trường trong Header quyết định kiến trúc, điểm bắt đầu, căn chỉnh, kích thước ảnh và vị trí những bảng dữ liệu quan trọng.
- Thuộc tính của từng phân đoạn xác định nội dung và quyền đọc, ghi hoặc thực thi khi chương trình chạy.
- Công cụ bảo mật có thể phát hiện bất thường cấu trúc trước khi tệp được thực thi.

## [How 4 bytes of padding make array clearing 49% faster](https://blog.andr2i.com/posts/2026-06-22-optimization-catalog-how-4-bytes-of-padding-make-array-clearing-49-faster)

Bài viết phân tích một hiện tượng căn chỉnh bộ nhớ trong Go: mảng `uint32` nằm ở địa chỉ lệch 4 byte so với ranh giới 8 byte có tốc độ xóa thấp hơn đáng kể. Trên bộ xử lý Intel được đo, chỉ cần thêm 4 byte đệm để mảng được căn chỉnh 8 byte đã tăng thông lượng khoảng 49%; trên AMD mức cải thiện khoảng 9%, còn ARM gần như không bị ảnh hưởng. Mã hợp ngữ cho thấy Go sử dụng lệnh `REP STOSQ`, và tác giả cho rằng việc một lần ghi 8 byte cắt qua ranh giới dòng bộ nhớ đệm khiến đường xử lý nhanh không thể hoạt động hiệu quả.

Các phép đo tiếp theo cho thấy SIMD thông thường không vượt trội rõ rệt so với `STOSQ`; biến thể ghi thẳng ra bộ nhớ có thể nhanh hơn nhưng kết quả thiếu ổn định vì phụ thuộc cách nhân hệ điều hành cấp phát các trang bộ nhớ. Bài viết cũng đề xuất tránh xóa toàn bộ mảng bằng cách gắn số thế hệ cho từng phần tử, đặc biệt khi dữ liệu được ghi vào các vị trí bất kỳ. Tuy nhiên, thẻ thế hệ làm tăng kích thước dữ liệu và có thể khiến mảng không còn nằm gọn trong bộ nhớ đệm, nên mọi tối ưu đều cần được đo trên phần cứng và khối lượng công việc thực tế.

**Điểm chính:**
- Căn chỉnh 8 byte có thể cải thiện mạnh tốc độ xóa mảng lớn trên kiến trúc x86-64.
- Hiệu quả phụ thuộc bộ xử lý, lệnh máy, cách cấp phát bộ nhớ và kích thước dữ liệu.
- SIMD không mặc nhiên nhanh hơn phương án do trình biên dịch và thư viện thời gian chạy cung cấp.
- Thẻ thế hệ có thể giảm số lần xóa mảng, nhưng phải cân nhắc chi phí bộ nhớ đệm.

## [Engineering High-Performance Parsers with Data-Oriented Design](https://www.arshad.fyi/writings/engineering-high-performance-parsers)

Bài viết chia sẻ những quyết định thiết kế phía sau Yuku, một trình phân tích cú pháp JavaScript và TypeScript viết bằng Zig. Thay vì biểu diễn cây cú pháp trừu tượng bằng các đối tượng rời rạc liên kết qua con trỏ, Yuku lưu nút trong những mảng phẳng và dùng chỉ số `u32` để tham chiếu. Cách bố trí này giảm số lần cấp phát, hạn chế truy cập bộ nhớ phân tán, cải thiện tính cục bộ của bộ nhớ đệm và cho phép giải phóng toàn bộ cây chỉ bằng một lần thu hồi vùng nhớ.

Tác giả mở rộng cùng nguyên tắc sang nhiều phần khác của hệ thống: danh sách con có độ dài thay đổi được lưu bằng cặp vị trí và độ dài; vùng đệm tạm được tái sử dụng qua các lời gọi đệ quy; chuỗi thường chỉ là phạm vi byte trong mã nguồn; thông tin về toán tử được mã hóa ngay trong các bit của thẻ; bảng Unicode được nén bằng cách loại bỏ các mẫu trùng lặp. Vì cây chỉ chứa chỉ số và độ lệch thay vì địa chỉ tuyệt đối, chính biểu diễn trong bộ nhớ cũng có thể trở thành định dạng truyền dữ liệu, giúp chuyển cây sang JavaScript bằng một vùng đệm liên tục thay vì tuần tự hóa qua JSON.

**Điểm chính:**
- Chọn biểu diễn dữ liệu dựa trên kiểu truy cập có thể quan trọng hơn việc thay đổi thuật toán phân tích cú pháp.
- Chỉ số nhỏ và mảng phẳng giúp giảm cấp phát, kích thước dữ liệu và số lần truy cập bộ nhớ chậm.
- Trường hợp phổ biến nên đi theo đường xử lý ngắn; công việc hiếm gặp chỉ thực hiện khi thật sự cần.
- Các ràng buộc về kích thước và bố cục nên được kiểm tra ngay khi biên dịch để ngăn suy giảm ngoài ý muốn.

## [How To Learn Go Fast: A Practical Roadmap For Senior Backend Developers](https://dev.to/nazar-boyko/how-to-learn-go-fast-a-practical-roadmap-for-senior-backend-developers-18l5)

Bài viết đưa ra lộ trình học Go dành cho lập trình viên phía máy chủ đã có kinh nghiệm, đặc biệt là người chuyển từ PHP, Laravel hoặc Symfony. Trọng tâm không nằm ở việc học lại những kiến thức nền tảng về API, cơ sở dữ liệu hay hàng đợi, mà ở việc chuyển sang tư duy của Go: chương trình minh bạch, lỗi là giá trị, giao diện nhỏ được đáp ứng ngầm, phụ thuộc được nối rõ ràng và thư viện chuẩn thường được ưu tiên hơn một bộ khung toàn diện.

Tác giả đề xuất bắt đầu bằng cú pháp, kiểu dữ liệu, gói và xử lý lỗi, sau đó nhanh chóng xây dựng công cụ dòng lệnh, dịch vụ HTTP và hệ thống xử lý công việc đồng thời. Lộ trình 12 tuần đi từ nền tảng đến PostgreSQL, kiểm thử tích hợp, phát hiện tranh chấp dữ liệu, ngữ cảnh hủy, đo hiệu năng, quan sát hệ thống và hoàn thiện dự án có thể đưa vào hồ sơ năng lực. Một lộ trình rút gọn trong vài ngày cũng được cung cấp cho người cần sớm làm việc với mã nguồn Go, nhưng vẫn nhấn mạnh các thói quen sản xuất như đặt thời hạn cho lời gọi mạng, tắt dịch vụ an toàn, đọc mã nguồn thực tế và đo đạc trước khi tối ưu.

**Điểm chính:**
- Tận dụng kinh nghiệm phía máy chủ sẵn có và tập trung học cách Go tổ chức chương trình.
- Xây dựng dự án nhỏ sớm giúp hiểu ngôn ngữ nhanh hơn việc chỉ xem hướng dẫn cú pháp.
- Học đồng thời kiểm thử, xử lý lỗi, ngữ cảnh và vận hành thay vì xem chúng là phần bổ sung.
- Năng lực Go cấp cao được thể hiện qua khả năng xây dựng, triển khai, chẩn đoán và duy trì hệ thống thực tế.

## [How To Prepare For A Golang Interview: A Practical Guide For Mid & Senior Engineers](https://dev.to/nazar-boyko/how-to-prepare-for-a-golang-interview-a-practical-guide-for-mid-senior-engineers-200p)

Bài viết là bản đồ ôn tập toàn diện cho phỏng vấn Go ở cấp trung và cao cấp. Thay vì chỉ liệt kê câu hỏi cú pháp, nội dung đi từ giá trị mặc định, gói, lát cắt, ánh xạ, con trỏ và giao diện đến xử lý lỗi, `defer`, `panic` và các bẫy bộ nhớ thường gặp. Những chủ đề dễ phân biệt mức độ hiểu biết của ứng viên được giải thích kỹ, chẳng hạn mảng nền dùng chung của lát cắt, giao diện chứa con trỏ rỗng nhưng bản thân không rỗng, quy tắc đóng kênh và lựa chọn giữa khóa tương hỗ với kênh.

Phần dành cho ứng viên cao cấp mở rộng sang bộ lập lịch G-M-P, mô hình bộ nhớ, phân tích thoát, bộ thu gom rác, rò rỉ goroutine, hủy công việc bằng ngữ cảnh, phát hiện tranh chấp dữ liệu và đo đạc bằng `pprof`. Bài viết còn bao phủ kiểm thử, cơ sở dữ liệu, HTTP, tắt dịch vụ an toàn, thiết kế hệ thống và các kiến thức vận hành ngoài phạm vi ngôn ngữ. Cuối bài là danh sách lỗi phổ biến, bài tập thực hành có giới hạn thời gian và bảng kiểm giúp ứng viên tự đánh giá khả năng viết mã đúng, giải thích đánh đổi và xử lý tình huống sản xuất.

**Điểm chính:**
- Phỏng vấn Go cấp cao đánh giá khả năng suy luận và thiết kế hệ thống, không chỉ khả năng nhớ cú pháp.
- Cần hiểu rõ lát cắt, giao diện, lỗi, ngữ cảnh và đồng thời vì đây là những nguồn lỗi thực tế phổ biến.
- Câu trả lời tốt nên nêu được lựa chọn, đánh đổi và cách xác minh bằng kiểm thử hoặc đo đạc.
- Luyện các bài tập như nhóm xử lý công việc, giới hạn tốc độ, thử lại và tắt dịch vụ an toàn giúp chuẩn bị sát thực tế.

## [Shard your locks: benchmarking 6 Go cache designs](https://strebkov.dev/posts/shard-your-locks/)

Bài viết so sánh sáu cách xây dựng bộ nhớ đệm `string → string` đồng thời bằng thư viện chuẩn Go: ánh xạ không khóa, một `Mutex`, một `RWMutex`, `sync.Map`, ánh xạ chia mảnh và sao chép khi ghi. Các phép đo được thực hiện với nhiều tỷ lệ đọc/ghi và từ một đến tám lõi. Kết quả cho thấy một khóa duy nhất không mở rộng theo số lõi, còn `RWMutex` sớm chạm trần vì bộ đếm người đọc trở thành điểm tranh chấp và thậm chí chậm hơn `Mutex` khi có nhiều thao tác ghi.

Thiết kế chia 256 mảnh, mỗi mảnh có ánh xạ và khóa riêng, đạt kết quả tốt hoặc gần tốt nhất trong mọi tải và nhanh hơn khóa duy nhất tới tám lần. Sao chép khi ghi dẫn đầu ở tải chỉ đọc nhưng trở nên cực kỳ đắt khi xuất hiện thao tác ghi vì phải sao chép toàn bộ ánh xạ. Bài viết cũng chỉ ra rằng phân bố khóa lệch có thể cải thiện tính cục bộ của bộ nhớ đệm khi đọc, nhưng lại dồn tranh chấp vào một vài mảnh khi ghi. Số mảnh phù hợp phụ thuộc phần cứng và tải thực tế; 256 là điểm cân bằng trong phép đo này chứ không phải hằng số áp dụng cho mọi hệ thống.

**Điểm chính:**
- Chia nhỏ khóa giúp các thao tác trên khóa khác nhau tiến hành đồng thời và giảm tranh chấp.
- `RWMutex` không mặc nhiên tốt hơn `Mutex`; lợi ích phụ thuộc tỷ lệ đọc/ghi và số lõi.
- Sao chép khi ghi chỉ phù hợp với dữ liệu gần như chỉ đọc và được cập nhật rất hiếm.
- Cần đo trên phân bố khóa, phần cứng và tải thật trước khi chọn cấu trúc đồng thời.

## [The .join() That Should Be a Bug](https://kronotop.com/blog/the-join-that-should-be-a-bug/)

Bài viết giải thích cách Kronotop phục vụ hàng nghìn kết nối dù hầu hết thao tác đều phải chờ FoundationDB hoặc hệ thống tệp. Mô hình một luồng như Redis quản lý nhiều kết nối hiệu quả nhưng không thể để một lệnh chặn toàn bộ vòng lặp sự kiện. Mô hình một tiến trình cho mỗi kết nối như PostgreSQL cho phép viết mã tuần tự có chặn, nhưng tốn nhiều tài nguyên khi số kết nối tăng. Kronotop tách việc giữ kết nối khỏi phần công việc có thể chờ để kết hợp ưu điểm của cả hai.

Một số luồng vòng lặp sự kiện Netty nhận dữ liệu, phân tích lệnh và gửi phản hồi mà không bao giờ chặn. Công việc đọc đĩa hoặc gọi mạng được chuyển sang luồng ảo Java, nơi lời gọi `.join()` có thể chờ theo cách tuần tự mà không chiếm giữ luồng hệ điều hành bên dưới. Khi có kết quả, quá trình được chuyển lại đúng vòng lặp Netty sở hữu kết nối để ghi phản hồi. Kết nối đồng thời đóng vai trò phiên làm việc, lưu trạng thái xác thực, không gian tên và giao dịch đang mở; nếu kết nối mất hoặc được đặt lại, giao dịch và tài nguyên liên quan sẽ được dọn dẹp.

**Điểm chính:**
- Tách quản lý kết nối khỏi công việc chặn giúp hệ thống vừa giữ nhiều kết nối vừa xử lý I/O chậm.
- Luồng ảo cho phép giữ phong cách mã tuần tự mà không phải trả chi phí một luồng hệ điều hành cho mỗi yêu cầu.
- Mọi thao tác ghi phản hồi được đưa về vòng lặp sự kiện sở hữu kết nối để giữ quy tắc đồng thời rõ ràng.
- Trạng thái giao dịch gắn với phiên kết nối cần được hủy hoặc đặt lại an toàn khi kết nối kết thúc.
