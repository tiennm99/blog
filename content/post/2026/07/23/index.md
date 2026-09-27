---
title: "Newsletter #126"
date: 2026-07-23
tags: ["AI-Assisted", "Go", "Performance", "Backend", "System Design", "Security", "Databases"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #126.*

## [2. Portable Executables](https://anteiku.fun/papers/an-introduction-to-modern-malware-development-for-red-teams/02_portable_executables/)

Bài viết là chương thứ hai trong loạt tài liệu nhập môn về phát triển mã độc hiện đại dành cho đội red team, tập trung vào định dạng Portable Executable (PE), cấu trúc chung của tệp thực thi, thư viện liên kết động và trình điều khiển trên Windows. Tác giả lần lượt đi qua DOS Header, DOS Stub, PE Header, Optional Header, bảng phân đoạn cùng các phân đoạn quen thuộc như `.text`, `.data`, `.rdata`, `.rsrc` và `.reloc`. Điểm cốt lõi là PE mô tả đồng thời cách tệp nằm trên đĩa và cách Windows Loader ánh xạ nó vào bộ nhớ: các trường trong Header cho biết kiến trúc, điểm bắt đầu thực thi, mức căn chỉnh, kích thước ảnh và vị trí những bảng dữ liệu quan trọng, còn thuộc tính của từng phân đoạn quyết định nội dung cùng quyền đọc, ghi hoặc thực thi khi chương trình chạy.

Phần sau chuyển sang góc nhìn của các sản phẩm bảo mật khi phân tích tĩnh, tức là đánh giá tệp trước khi nó được thực thi. Những dấu hiệu thường được xem xét gồm hàm băm, chữ ký số, độ hỗn loạn của dữ liệu, điểm bắt đầu nằm ở vị trí bất thường, phân đoạn mang quyền `RWX`, chênh lệch lớn giữa kích thước trên đĩa và trong bộ nhớ, tên phân đoạn lạ, bảng nhập khẩu thưa thớt và các tổ hợp API đáng ngờ. Với lập trình viên mới, bài viết cho thấy vì sao hiểu rõ cấu trúc PE là nền tảng chung cho cả phân tích phần mềm độc hại lẫn xây dựng cơ chế phát hiện những tệp bị đóng gói hoặc làm rối.

## [How 4 bytes of padding make array clearing 49% faster](https://blog.andr2i.com/posts/2026-06-22-optimization-catalog-how-4-bytes-of-padding-make-array-clearing-49-faster)

Bài viết thuộc loạt "Optimization catalog", phân tích một hiện tượng căn chỉnh bộ nhớ trong Go: khi mảng `uint32` nằm ở độ lệch 4 byte so với ranh giới 8 byte, thao tác xóa mảng chậm đi rõ rệt. Trên bộ xử lý Intel được đo, chỉ cần thêm 4 byte đệm để mảng được căn chỉnh 8 byte là thông lượng tăng khoảng 49%; trên AMD mức cải thiện chỉ khoảng 9%, còn máy ARM gần như không bị ảnh hưởng. Mã hợp ngữ cho thấy toàn bộ việc xóa do một lệnh `REP STOSQ` đảm nhận. Dựa trên bộ đếm hiệu năng, tác giả phỏng đoán đường xử lý nhanh của Intel ghi trọn từng dòng bộ nhớ đệm mà không cần đọc trước; khi mảng lệch 4 byte, cứ mỗi ranh giới 64 byte lại có một lần ghi 8 byte cắt ngang, nên không dòng nào được phủ trọn và đường xử lý nhanh không thể kích hoạt.

Các phép đo tiếp theo cho thấy SIMD, dù dùng hàm nội tại thử nghiệm của Go hay hợp ngữ viết tay, không vượt trội so với `STOSQ`. Biến thể ghi thẳng ra bộ nhớ có lúc nhanh hơn nhưng kết quả dao động mạnh, vì phụ thuộc việc nhân hệ điều hành cấp phát các trang liền mạch hay rời rạc. Bài viết cũng gợi ý gắn số thế hệ cho từng phần tử để hiếm khi phải xóa thật, nhưng thẻ thế hệ làm mảng lớn hơn và có thể khiến dữ liệu không còn vừa bộ nhớ đệm. Bài học rút ra là hiệu quả tối ưu phụ thuộc bộ xử lý, lệnh máy và kích thước dữ liệu, nên luôn cần đo trên phần cứng thực tế.

## [Engineering High-Performance Parsers with Data-Oriented Design](https://www.arshad.fyi/writings/engineering-high-performance-parsers)

Bài viết chia sẻ nguyên tắc thiết kế phía sau Yuku, một trình phân tích cú pháp JavaScript và TypeScript viết bằng Zig, với luận điểm chính: khi ngữ pháp đã đúng, hiệu năng gần như được quyết định bởi cách biểu diễn cây cú pháp trong bộ nhớ chứ không phải thuật toán phân tích. Thay vì các nút cấp phát rời rạc và liên kết bằng con trỏ, vốn gây hàng chục nghìn lần cấp phát và những lần truy cập bộ nhớ khó đoán, Yuku lưu nút trong một mảng phẳng và dùng chỉ số `u32` làm tham chiếu. Chỉ số chỉ bằng nửa con trỏ và cả cây được giải phóng trong một thao tác, còn thuật toán đệ quy vẫn quen thuộc.

Tác giả áp dụng cùng tư duy cho nhiều phần khác: tách tải trọng và vị trí nguồn thành các cột riêng để mỗi lượt duyệt chỉ chạm vào dữ liệu cần thiết; lưu danh sách con có độ dài thay đổi bằng cặp vị trí và độ dài; tái sử dụng vùng đệm tạm qua các lời gọi đệ quy; biểu diễn chuỗi như phạm vi byte trong mã nguồn; mã hóa thông tin toán tử ngay trong bit của thẻ và nén bảng Unicode bằng cách loại bỏ mẫu trùng lặp. Các ràng buộc về kích thước và bố cục được kiểm tra ngay lúc biên dịch để ngăn suy giảm ngoài ý muốn. Vì cây chỉ chứa chỉ số và độ lệch, chính biểu diễn trong bộ nhớ có thể dùng làm định dạng truyền dữ liệu, cho phép chuyển cây sang JavaScript bằng một vùng đệm liên tục thay vì tuần tự hóa qua JSON.

## [How To Learn Go Fast: A Practical Roadmap For Senior Backend Developers](https://dev.to/nazar-boyko/how-to-learn-go-fast-a-practical-roadmap-for-senior-backend-developers-18l5)

Bài viết đưa ra lộ trình học Go cho lập trình viên phía máy chủ đã có kinh nghiệm, đặc biệt là người chuyển từ PHP, Laravel hoặc Symfony. Tác giả cho rằng không cần học lại kiến thức nền về API, cơ sở dữ liệu hay hàng đợi, mà nên tận dụng chúng và tập trung vào cách Go tổ chức chương trình: mã nguồn minh bạch, lỗi là giá trị, giao diện nhỏ được đáp ứng ngầm, phụ thuộc được nối rõ ràng và thư viện chuẩn thường được ưu tiên hơn một bộ khung toàn diện.

Lộ trình bắt đầu với cú pháp, kiểu dữ liệu, gói và xử lý lỗi, rồi nhanh chóng chuyển sang xây dựng công cụ dòng lệnh, dịch vụ HTTP và hệ thống xử lý công việc đồng thời, vì làm dự án nhỏ từ sớm giúp hiểu ngôn ngữ nhanh hơn việc chỉ đọc hướng dẫn cú pháp. Kế hoạch 12 tuần đi từ nền tảng đến PostgreSQL, kiểm thử tích hợp, phát hiện tranh chấp dữ liệu, ngữ cảnh hủy, đo hiệu năng, quan sát hệ thống và hoàn thiện một dự án đưa vào hồ sơ năng lực; kiểm thử, xử lý lỗi và vận hành được học song song chứ không bị xem là phần phụ. Bài viết cũng có phiên bản rút gọn vài ngày cho người cần sớm làm việc với mã nguồn Go, nhưng vẫn nhấn mạnh thói quen sản xuất như đặt thời hạn cho lời gọi mạng, tắt dịch vụ an toàn, đọc mã nguồn thực tế và đo trước khi tối ưu. Theo tác giả, năng lực Go ở cấp cao thể hiện qua khả năng xây dựng, triển khai, chẩn đoán và duy trì hệ thống thực tế.

## [How To Prepare For A Golang Interview: A Practical Guide For Mid & Senior Engineers](https://dev.to/nazar-boyko/how-to-prepare-for-a-golang-interview-a-practical-guide-for-mid-senior-engineers-200p)

Bài viết là bản đồ ôn tập toàn diện cho phỏng vấn Go ở cấp trung và cao cấp, nhấn mạnh rằng nhà tuyển dụng đánh giá khả năng suy luận và thiết kế chứ không chỉ khả năng nhớ cú pháp. Nội dung đi từ giá trị mặc định, gói, lát cắt, ánh xạ, con trỏ và giao diện đến xử lý lỗi, `defer`, `panic` và các bẫy bộ nhớ thường gặp. Những chủ đề hay dùng để phân loại ứng viên được giải thích kỹ, chẳng hạn mảng nền dùng chung giữa các lát cắt, giao diện chứa con trỏ rỗng nhưng bản thân không rỗng, quy tắc đóng kênh và cách chọn giữa khóa tương hỗ với kênh, vì đây cũng là nguồn lỗi phổ biến trong thực tế.

Phần dành cho ứng viên cao cấp mở rộng sang bộ lập lịch G-M-P, mô hình bộ nhớ, phân tích thoát, bộ thu gom rác, rò rỉ goroutine, hủy công việc bằng ngữ cảnh, phát hiện tranh chấp dữ liệu và đo đạc bằng `pprof`. Bài viết còn bao phủ kiểm thử, cơ sở dữ liệu, HTTP, tắt dịch vụ an toàn, thiết kế hệ thống và kiến thức vận hành ngoài phạm vi ngôn ngữ. Theo tác giả, một câu trả lời tốt cần nêu được lựa chọn, đánh đổi và cách xác minh bằng kiểm thử hoặc đo đạc. Cuối bài là danh sách lỗi phổ biến, các bài tập có giới hạn thời gian như nhóm xử lý công việc, giới hạn tốc độ, cơ chế thử lại, cùng bảng kiểm giúp ứng viên tự đánh giá khả năng viết mã đúng và xử lý tình huống sản xuất.

## [Shard your locks: benchmarking 6 Go cache designs](https://strebkov.dev/posts/shard-your-locks/)

Bài viết so sánh sáu cách xây dựng bộ nhớ đệm `string → string` đồng thời chỉ bằng thư viện chuẩn Go: ánh xạ không khóa (làm mốc), một `Mutex`, một `RWMutex`, `sync.Map`, ánh xạ chia 256 mảnh và sao chép khi ghi. Các phép đo chạy với nhiều tỷ lệ đọc/ghi và từ một đến tám lõi. Kết quả cho thấy một khóa duy nhất không mở rộng được: ở tám lõi, tải chỉ đọc với `Mutex` còn chậm hơn khi chạy một lõi. `RWMutex`, lựa chọn theo phản xạ khi thao tác đọc bị tranh chấp, chỉ tăng khoảng gấp đôi rồi chững lại vì bộ đếm người đọc trở thành điểm tranh chấp mới, và còn chậm hơn `Mutex` khi có nhiều thao tác ghi.

Thiết kế chia mảnh, mỗi mảnh có ánh xạ và khóa riêng, là phương án duy nhất luôn đứng gần đầu ở mọi loại tải và nhanh hơn một khóa duy nhất tới tám lần, vì các thao tác trên những khóa khác nhau có thể chạy song song. Sao chép khi ghi dẫn đầu ở tải chỉ đọc nhưng gần như tụt về không ngay khi có thao tác ghi, vì mỗi lần ghi phải sao chép toàn bộ ánh xạ, nên chỉ hợp với dữ liệu hiếm khi cập nhật. Bài viết cũng chỉ ra rằng phân bố khóa lệch có thể giúp thao tác đọc nhanh hơn nhờ tính cục bộ của bộ nhớ đệm, nhưng lại dồn tranh chấp vào vài mảnh khi ghi. Số mảnh 256 là điểm cân bằng trong phép đo này, không phải hằng số chung; trước khi chọn cấu trúc đồng thời, cần đo với phân bố khóa, phần cứng và tải thực tế.

## [The .join() That Should Be a Bug](https://kronotop.com/blog/the-join-that-should-be-a-bug/)

Bài viết giải thích cách Kronotop phục vụ hàng nghìn kết nối trong khi gần như mọi lệnh đều phải chờ lời gọi mạng tới FoundationDB hoặc thao tác đọc ghi trên hệ thống tệp. Tác giả so sánh hai mô hình quen thuộc: Redis dùng một luồng cho mọi kết nối, giữ được rất nhiều kết nối nhưng không cho phép bất kỳ lệnh nào chặn; PostgreSQL dùng một tiến trình cho mỗi kết nối, cho phép viết mã tuần tự có chặn nhưng tốn tài nguyên khi số kết nối tăng. Kronotop chọn hướng thứ ba, tách việc giữ kết nối khỏi phần công việc phải chờ để kết hợp ưu điểm của cả hai.

Một nhóm nhỏ luồng vòng lặp sự kiện Netty nhận dữ liệu, phân tích lệnh và gửi phản hồi mà không bao giờ chặn. Công việc đọc đĩa hoặc gọi mạng được chuyển sang luồng ảo của Java, nơi lời gọi `.join()`, vốn thường bị xem là lỗi trong mã bất đồng bộ, có thể chờ theo phong cách tuần tự mà không chiếm giữ luồng hệ điều hành bên dưới. Khi có kết quả, việc ghi phản hồi luôn được đưa về đúng vòng lặp Netty sở hữu kết nối, giúp quy tắc đồng thời luôn rõ ràng. Mỗi kết nối đồng thời là một phiên làm việc, lưu trạng thái xác thực, không gian tên và giao dịch đang mở; khi kết nối bị đóng hoặc đặt lại, giao dịch và tài nguyên liên quan được hủy và dọn dẹp an toàn.

---

*Bài viết đã được viết lại bởi Claude Code với Opus 5.5 vào ngày 27/09/2026.*
