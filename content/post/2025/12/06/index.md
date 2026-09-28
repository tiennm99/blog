---
title: "Newsletter #64"
date: 2025-12-06
tags: ["AI-Assisted", "Caching", "Consistent Hashing", "Linux", "Java", "Performance", "Career"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #64. ~~Bài viết này được thực hiện bởi [Claude Code](https://github.com/anthropics/claude-code), [Claude Code Router](https://github.com/musistudio/claude-code-router), [iFlow Open Platform](https://platform.iflow.cn) & Qwen3-Coder-Plus[^qwen3-coder-plus]~~*

[^qwen3-coder-plus]: ~~Qwen3-Coder-480B-A35B-Instruct~~

## [Caching](https://planetscale.com/blog/caching)

Bài viết giải thích caching (bộ nhớ đệm) từ nguyên lý cốt lõi: ghép một lượng nhỏ bộ nhớ nhanh nhưng đắt với một lượng lớn bộ nhớ chậm nhưng rẻ, sao cho dữ liệu hay được truy cập nằm ở tầng nhanh. Thước đo quan trọng nhất là hit rate (tỷ lệ số lần tìm thấy dữ liệu trong cache trên tổng số yêu cầu); hit rate càng cao thì càng ít phải chạm tới tầng lưu trữ chậm. Ví dụ quen thuộc là CPU với các tầng cache L1, L2, L3, RAM đóng vai trò cache cho ổ đĩa, hay một mạng xã hội giữ các bài đăng mới trong bộ nhớ nhanh và đẩy bài cũ xuống kho lưu trữ chậm hơn.

Tác giả phân tích hai loại tính cục bộ: tính cục bộ theo thời gian (dữ liệu vừa được truy cập sẽ sớm được truy cập lại, nên cache các bài đăng trong 48 giờ gần nhất) và tính cục bộ theo không gian (truy cập một phần tử thì các phần tử lân cận cũng sắp được cần, như ứng dụng ảnh tải trước các ảnh kế bên). CDN giải quyết bài toán khoảng cách địa lý bằng cách đặt bản sao dữ liệu gần người dùng. Khi cache đầy, cần chính sách loại bỏ: FIFO đơn giản nhưng kém hiệu quả, LRU loại phần tử lâu nhất chưa được dùng nên sát với thực tế hơn, còn LRU có thời hạn tự xóa dữ liệu cũ. Cuối cùng, PostgreSQL dùng shared_buffers kết hợp page cache của hệ điều hành, còn MySQL dùng buffer pool, tạo thành nhiều tầng cache mà vẫn bảo đảm ACID.

## [Consistent Hashing](https://eli.thegreenplace.net/2025/consistent-hashing/)

Cách phân phối dữ liệu đơn giản `hash % N` lên N nút hoạt động tốt cho tới khi số nút thay đổi: chỉ cần thêm hoặc bớt một nút, gần như mọi phần tử đều bị gán sang vị trí mới, gây ra hàng loạt cache miss đúng vào lúc hệ thống đang chịu tải cao. Consistent hashing khắc phục điều này bằng cách dùng cùng một hàm băm để ánh xạ cả nút lẫn phần tử lên một vòng tròn, rồi gán mỗi phần tử cho nút gần nhất theo chiều kim đồng hồ. Nhờ vậy khi nút thay đổi, chỉ khoảng M/N phần tử (M là tổng số phần tử) phải chuyển chỗ thay vì toàn bộ.

Về cài đặt, tác giả lưu vị trí các nút trong mảng đã sắp xếp trên một vòng rời rạc, và việc tìm nút phụ trách một phần tử chỉ là một lần tìm kiếm nhị phân, vừa nhanh vừa thân thiện với cache. Vấn đề còn lại là vị trí ngẫu nhiên khiến khoảng cách giữa các nút rất chênh lệch: với 20 nút, có nút nhận nhiều phần tử gấp khoảng 40 lần nút khác. Giải pháp là nút ảo, tức ánh xạ mỗi nút thật tới nhiều điểm trên vòng tròn; thử nghiệm với 10 nút ảo mỗi nút giúp phân bố đều hơn hẳn. Kỹ thuật này ra đời tại MIT cho bài toán web cache, trở thành nền tảng của Akamai và ảnh hưởng tới hệ thống lưu trữ Dynamo của AWS.

## [How to stop Linux threads cleanly](https://mazzo.li/posts/stopping-linux-threads.html)

Bài viết bàn về một bài toán khó hơn nhiều so với việc tạo luồng: dừng một luồng trong Linux nhưng vẫn cho nó cơ hội chạy các thao tác dọn dẹp. Cách đơn giản nhất là vòng lặp gần như bận (quasi-busy loop): luồng kiểm tra một cờ atomic sau mỗi lượt công việc, với điều kiện mỗi lượt kết thúc đủ nhanh. Cách này dễ hiểu nhưng buộc phải cấu trúc lại mã nguồn. `pthread_cancel()` thoạt nhìn hấp dẫn nhưng có lỗi nghiêm trọng: destructor trong C++ hiện đại mặc định là `noexcept` nên chương trình có thể sập khi việc hủy kích hoạt unwinding, và việc hủy giữa chừng một giao dịch sẽ phá vỡ tính nhất quán của dữ liệu.

Hướng tiếp cận dựa trên tín hiệu như SIGUSR1 kết hợp kiểm soát signal mask cho phép ngắt các lời gọi hệ thống đang bị chặn, nhưng vẫn còn race condition vì không dễ kiểm tra cờ và gọi syscall một cách nguyên tử. Với các syscall có biến thể nhận signal mask như `ppoll`, `pselect`, `epoll_pwait`, vấn đề này được xử lý gọn. Với các syscall còn lại, tác giả trình bày một mẹo dùng rseq (restartable sequences, có từ Linux 4.18) để gộp việc kiểm tra cờ và gọi syscall thành một khối nguyên tử, nhân hệ điều hành sẽ hủy khối nếu luồng bị ngắt giữa chừng. Kết luận là không có giải pháp hoàn hảo: vòng lặp kiểm tra cờ đủ cho phần lớn ứng dụng, cách dùng tín hiệu phù hợp với mã nặng I/O, còn rseq đòi hỏi inline assembly nên chỉ dành cho trường hợp đặc biệt.

## [Advice for New Principal Tech ICs (i.e., Notes to Myself)](https://eugeneyan.com/writing/principal/)

Eugene Yan tổng hợp 31 lời khuyên cho kỹ sư và nhà khoa học mới lên cấp principal, rút ra từ quan sát những người đi trước. Điểm xuất phát là công việc từng giúp bạn thành công ở cấp dưới nay trở thành thứ yếu: tự viết mã nguồn chưa chắc là cách dùng thời gian tốt nhất, dù vẫn cần bám sát kỹ thuật để giữ uy tín và hiểu bối cảnh. Principal có nhiều kiểu, người đào sâu kỹ thuật, người mạnh về ảnh hưởng ngang trong tổ chức, và vai trò này thường kiêm cả một phần việc của PM, nhà thiết kế và người xây dựng văn hóa. Đúng thôi là chưa đủ, bạn phải thuyết phục người khác quan tâm và hành động; một người cố vấn kể rằng cứ 10 tài liệu đề xuất thì chỉ khoảng 3 được thực hiện.

Tác giả khuyên chọn những việc sẽ không xảy ra nếu thiếu mình, nằm ở giao điểm giữa thế mạnh bản thân và khoảng trống của tổ chức, đồng thời chia thời gian theo ba vai: chủ trì (khoảng 50%), bảo trợ (20%) và tư vấn (30%). Muốn nhân rộng ảnh hưởng thì phải giúp người khác đưa ra quyết định như mình sẽ đưa ra, dành thời gian cố định mỗi tuần để kèm cặp, kể cả thực tập sinh. Trong cuộc họp, hãy đặt câu hỏi để nhường chỗ cho người khác, và nói rõ đâu là điều mình biết, đâu là điều chỉ đang thắc mắc để câu nói không vô tình thành mệnh lệnh. Tự do lớn hơn đi kèm trách nhiệm giải trình, cần giữ thời gian suy nghĩ và hướng tới việc tổ chức không phụ thuộc vào mình.

## [How fast is java? Teaching an old dog new tricks](https://dgerrells.com/blog/how-fast-is-java-teaching-an-old-dog-new-tricks)

Tác giả kiểm tra xem Java đã đủ hiện đại để cạnh tranh với Rust hay chưa bằng một mô phỏng hạt (particle simulation) dùng Vector API mới cho các phép tính SIMD. API này trừu tượng hóa lệnh vector của từng CPU qua khái niệm "species", giúp viết một lần mà chạy được trên nhiều kiến trúc. Để tối ưu, tác giả tách phần tính toán vật lý khỏi luồng xử lý sự kiện của giao diện, tự quản lý các luồng worker thay cho parallel stream, và cho mỗi worker một bộ đệm điểm ảnh riêng rồi mới gộp lại, tránh tranh chấp cache khi nhiều luồng cùng ghi.

Trên máy M1 Air, Rust vẫn nhanh hơn khoảng 2 lần ở hầu hết quy mô, ví dụ 100 triệu hạt mất khoảng 69 ms mỗi khung hình với Rust so với 119 ms với Java. Java còn có chi phí nền cao hơn do cấp phát trên heap, trong khi Rust cấp phát bộ nhớ nhanh hơn nhiều. Tác giả thừa nhận Java đã tiến bộ rất xa với lambda và Vector API, nhưng hệ sinh thái vẫn là điểm yếu: chỉ để kéo vài thư viện nhỏ mà thiết lập hệ thống build đã rất phiền phức. Kết luận là con chó già vẫn học được trò mới, nhưng vẫn bị trói buộc bởi hạ tầng cũ kỹ.

## [50 things I know](https://usefulfictions.substack.com/p/50-things-i-know)

Cate Hall chia sẻ 50 điều cô rút ra về các mối quan hệ, cách ra quyết định và sự trưởng thành cá nhân. Về con người, cô cho rằng bạn hoàn toàn có thể quan tâm tới người không đáp lại, và khả năng yêu thương mà không cần được đền đáp chính là sự vị tha; cô cũng phân biệt ngưỡng mộ, ám ảnh hay say nắng với tình yêu thật sự, và nhận xét rằng trả thù hiếm khi có ích vì mỗi người tự là hình phạt của chính mình. Nhiều động lực xã hội mang tính nghịch lý: những hành động trông yếu đuối khi nhìn từ bên trong, nếu làm mà không xin lỗi, lại được người khác nhìn nhận là mạnh mẽ.

Về ra quyết định, cô phản bác quan niệm công sức nhân thời gian là ra kết quả, nhấn mạnh việc nhận ra hậu quả bất đối xứng khi sai theo hướng này tốn kém hơn hướng kia, và khuyên luôn nhân đôi thời gian lẫn ngân sách dự tính vì không thể bù trừ hết cho ngụy biện lập kế hoạch. Nếu muốn có quan điểm tốt hơn, hãy thử có ít quan điểm hơn trước. Biết khi nào nên bỏ cuộc là một kỹ năng quý giá, và cô tránh các hệ tư tưởng toàn diện vì không học thuyết đạo đức nào đứng vững trước mọi trường hợp ngoại lệ. Bài viết khép lại bằng những nhắc nhở như phục vụ người khác là điều duy nhất khiến ta thấy tốt hơn một cách bền vững, và mười năm nữa nhìn lại bạn sẽ thấy mình lúc này tuyệt vời thế nào, vậy sao không nghĩ thế ngay từ bây giờ.

## [Programming Languages That Blew My Mind](https://yoric.github.io/post/programming-languages-that-blew-my-mind/)

David Teller điểm lại những ngôn ngữ lập trình đã thay đổi cách ông nghĩ về lập trình. Basic mở đầu với mảng và luồng điều khiển GOTO/GOSUB; Turbo Pascal mang lại IDE, trình gỡ lỗi, lập trình cấu trúc và module; hợp ngữ x86 giúp hiểu địa chỉ bộ nhớ, thanh ghi và cách làm việc trực tiếp với phần cứng. HyperCard giới thiệu lập trình trực quan, ngôn ngữ kịch bản gần ngôn ngữ tự nhiên và cơ chế thu gom rác. OCaml với đa hình tham số, suy luận kiểu, pattern matching và hàm bậc cao khiến ông thấy mình còn non nớt, còn Prolog dạy lối lập trình khai báo, nơi bạn không viết thuật toán mà dạy chương trình cách suy nghĩ.

Ở mảng công nghiệp, Java gây ấn tượng với thư viện chuẩn đầy đủ, tài liệu tốt và JVM; Erlang với triết lý "cứ để nó lỗi" (let it fail) và mô hình actor cho hệ thống phân tán; Coq biến đặc tả thành kiểu và chương trình thành chứng minh được kiểm chứng hình thức. Opalang thử biên dịch đa tầng, tự tách mã nguồn cho client, server và cơ sở dữ liệu, còn Rust kết hợp các bảo đảm của ngôn ngữ hàm với hiệu năng của lập trình hệ thống. Tác giả nhấn mạnh nhiều ý tưởng từ ngôn ngữ nghiên cứu dần đi vào phần mềm phổ thông, và ông vẫn đang chờ một mô hình lập trình thực sự đột phá tiếp theo.

## Bonus: Vài ảnh hay ho đến từ [ByteByteGo](https://bytebytego.com/)

![Docker vs Kubernetes](https://substack-post-media.s3.amazonaws.com/public/images/9cfa2d94-1602-47c2-8942-b585c1d8d285_2252x2752.jpeg)
![Batch vs Stream Processing](https://substackcdn.com/image/fetch/$s_!P-gB!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8c9090b5-77c7-4f04-88bc-481df27de32d.tif)
![What are Modular Monoliths?](https://substackcdn.com/image/fetch/$s_!f0s-!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fb6d1ef48-faea-4d57-b2ea-f8411efc8334_2360x2770.png)
![What is the difference between Process and Thread?](https://substackcdn.com/image/fetch/$s_!MDHC!,w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F7cf3f3a0-726f-47a3-94e4-755fa9aa8036_2196x2319.jpeg)
![How to Debug a Slow API?](https://substackcdn.com/image/fetch/$s_!-jEP!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa7885eb0-3b6d-4be3-bbb7-332b3f9fc0e0_2360x2920.jpeg)
![Top Service-to-Service Communication Patterns](https://substackcdn.com/image/fetch/$s_!uW-M!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd7494e44-82ec-43fc-bd7f-eabea7776dd1_2250x2624.png)

*Đánh giá: Nhìn chung đây vẫn là một bài viết tương đối chất lượng. Tuy nhiên phần tóm tắt còn hơi dài, sẽ cần cải thiện thêm*

---

*Bài viết đã được viết lại bởi Claude Code với Opus 5.5 vào ngày 27/09/2026.*
