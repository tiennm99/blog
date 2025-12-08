---
title: "Newsletter #64"
date: 2025-12-06
tags: ["AI-Assisted", "Technology", "caching", "database", "performance"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #64. Bài viết này được thực hiện bởi [Claude Code](https://github.com/anthropics/claude-code), [Claude Code Router](https://github.com/musistudio/claude-code-router), [iFlow Open Platform](https://platform.iflow.cn) & Qwen3-Coder-Plus[^qwen3-coder-plus]*

[^qwen3-coder-plus]: Qwen3-Coder-480B-A35B-Instruct

## [Caching](https://planetscale.com/blog/caching)

Bài viết này khám phá các nguyên tắc cơ bản về caching (bộ nhớ đệm), từ những nguyên lý cơ bản đến các triển khai nâng cao. Caching là một kỹ thuật quan trọng trong lập trình máy tính giúp cải thiện hiệu suất bằng cách lưu trữ dữ liệu tạm thời trong bộ nhớ nhanh hơn để truy cập nhanh chóng trong các lần sau.

Nguyên lý cốt lõi của caching là kết hợp giữa lưu trữ nhanh, đắt tiền với lưu trữ chậm, rẻ hơn. Khi ta truy cập dữ liệu từ cache, nếu dữ liệu tồn tại trong cache được gọi là "cache hit", còn nếu dữ liệu không tồn tại trong cache được gọi là "cache miss". Tỷ lệ "hit rate" (tỷ lệ phần trăm thời gian ta nhận được cache hits) nên được tối đa hóa để cải thiện hiệu suất.

Có hai loại locality quan trọng trong caching:

**Temporal Locality (Tính địa phương về thời gian)**: Tập trung vào việc lưu dữ liệu mới được truy cập vì dữ liệu đó có xu hướng được truy cập nhiều hơn trong tương lai gần.

**Spatial Locality (Tính địa phương về không gian)**: Tự động nạp dữ liệu liên quan dựa trên các mẫu truy cập có thể đoán trước được.

Một trong những chiến lược phổ biến nhất để thay thế dữ liệu trong cache là LRU (Least Recently Used) - chiến lược này sẽ xóa dữ liệu ít được sử dụng nhất khi cache đầy.

Về mặt thực tế, các hệ quản trị cơ sở dữ liệu như Postgres sử dụng chiến lược caching hai lớp với shared_buffers và hệ thống page cache của hệ điều hành. CDN (Content Delivery Network) giải quyết vấn đề khoảng cách vật lý khi truy cập dữ liệu trên toàn cầu bằng cách lưu trữ nội dung gần người dùng hơn.

Caching đóng vai trò cực kỳ quan trọng trong việc xây dựng các hệ thống hiệu suất cao, đặc biệt là các ứng dụng web và hệ thống phân tán hiện đại.

**Điểm chính:**
- Caching giúp cải thiện hiệu suất bằng cách lưu trữ dữ liệu trong bộ nhớ nhanh hơn
- Hit rate cần được tối đa hóa để tăng hiệu quả
- Hai nguyên lý quan trọng là Temporal và Spatial Locality
- LRU là chiến lược thay thế phổ biến trong ngành

## [Big O Notation](https://samwho.dev/big-o/)

Big O notation là cách để mô tả hiệu suất thuật toán bằng cách phân tích cách thời gian thực thi thay đổi khi kích thước đầu vào tăng lên. Đây là một khái niệm rất quan trọng trong lập trình và khoa học máy tính, giúp các lập trình viên đánh giá và so sánh hiệu quả của các thuật toán khác nhau.

Big O notation mô tả mối quan hệ giữa đầu vào của một hàm và thời gian thực tế (wall-clock time) của nó. Khi phân tích độ phức tạp thời gian, Big O notation (trừ khi có ghi chú khác) sẽ mô tả tình huống xấu nhất có thể xảy ra.

Các loại độ phức tạp thời gian phổ biến bao gồm:

**O(1) - Constant time (Thời gian hằng số)**: Thời gian thực thi không tăng khi kích thước đầu vào tăng. Đây là trường hợp lý tưởng khi thuật toán luôn thực hiện số lượng phép toán không đổi bất kể đầu vào có lớn đến mức nào.

**O(log n) - Logarithmic time (Thời gian logarit)**: Ở mỗi bước, thuật toán sẽ loại bỏ một phần khả năng có thể xảy ra. Đây là đặc điểm của các thuật toán chia để trị như tìm kiếm nhị phân (binary search).

**O(n) - Linear time (Thời gian tuyến tính)**: Thời gian thực thi tăng tỷ lệ thuận với kích thước đầu vào. Nếu đầu vào tăng gấp đôi thì thời gian thực thi cũng tăng gấp đôi.

**O(n²) - Quadratic time (Thời gian bậc hai)**: Thời gian thực thi tăng theo bình phương của kích thước đầu vào. Đây thường là kết quả của các vòng lặp lồng nhau, cần tránh khi làm việc với tập dữ liệu lớn.

Những lỗi phổ biến mà lập trình viên thường gặp là tạo ra các vòng lặp lồng nhau gây ra độ phức tạp bậc hai hoặc sử dụng các phép toán có độ phức tạp O(n) bên trong vòng lặp. Luôn kiểm thử mã nguồn trước và sau khi thay đổi để đảm bảo rằng bạn thực sự đang cải thiện hiệu suất.

**Điểm chính:**
- Big O notation giúp đánh giá hiệu suất thuật toán theo kích thước đầu vào
- Các loại phổ biến: O(1), O(log n), O(n), O(n²)
- Big O thường mô tả trường hợp xấu nhất
- Tránh lồng vòng lặp để giảm độ phức tạp

## [Consistent Hashing](https://eli.thegreenplace.net/2025/consistent-hashing/)

Consistent hashing là một thuật toán hash tiên tiến được sử dụng trong các hệ thống phân tán, nơi mà chỉ một phần nhỏ các khóa cần được tính toán lại khi kích thước của bảng hash thay đổi. Đây là một cải tiến đáng kể so với phương pháp hash truyền thống.

Vấn đề với phương pháp hash đơn giản là khi các nút được thêm vào hoặc loại bỏ khỏi hệ thống, tất cả các mục đều nhận được các vị trí hash hoàn toàn khác nhau, dẫn đến tình trạng cache misses và hiệu suất giảm sút nghiêm trọng.

Giải pháp của consistent hashing là ánh xạ cả các nút và các mục vào một vòng tròn (circle). Sau đó, mỗi mục sẽ thuộc về nút gần nhất theo chiều kim đồng hồ. Khi có sự thay đổi trong hệ thống, chỉ một phần nhỏ các mục (khoảng M/N, với M là số mục và N là số nút) là bị ảnh hưởng, thay vì toàn bộ hệ thống như trong phương pháp truyền thống.

Một cải tiến quan trọng khác là sử dụng các nút ảo (virtual nodes), nơi mỗi nút thực được ánh xạ tới nhiều vị trí khác nhau trên vòng tròn để phân bố các mục một cách đồng đều hơn.

Về mặt triển khai, thuật toán sử dụng tìm kiếm nhị phân trên mảng đã được sắp xếp các vị trí nút, mang lại hiệu suất tìm kiếm O(log n).

Tư tưởng cốt lõi của consistent hashing là "ánh xạ cả các nút và các mục vào một khoảng giá trị, sau đó một mục sẽ thuộc về nút gần nó nhất." Kỹ thuật này đặc biệt hữu ích trong các hệ thống phân tán lớn như hệ thống lưu trữ phân tán, hệ thống cân bằng tải và các hệ thống cache phân tán.

**Điểm chính:**
- Consistent hashing giúp giảm thiểu việc phải tính toán lại các khóa khi thay đổi kích thước hệ thống
- Chỉ một phần nhỏ các mục bị ảnh hưởng khi có sự thay đổi nút
- Sử dụng kỹ thuật ánh xạ lên vòng tròn để cải thiện hiệu suất
- Có thể áp dụng trong các hệ thống cache phân tán, cân bằng tải và lưu trữ dữ liệu phân tán

## [How to stop Linux threads cleanly](https://mazzo.li/posts/stopping-linux-threads.html)

Bài viết này khám phá các phương pháp để dừng các luồng (threads) trong Linux trong khi cho phép các hoạt động dọn dẹp được thực thi, bao gồm nhiều cách tiếp cận từ việc chạy vòng lặp liên tục đến việc hủy bỏ luồng bằng tín hiệu.

Một trong những phương pháp cơ bản là sử dụng "quasi-busy looping" - sử dụng các cờ nguyên tử (atomic flags) để báo hiệu cho các luồng dừng lại giữa các chu kỳ làm việc. Ví dụ như sử dụng cấu trúc while (true) { nếu (dừng) { break; } thực hiện một số công việc hoàn thành trong thời gian hợp lý }.

Các cách tiếp cận dựa trên tín hiệu (signal-based) như sử dụng SIGUSR1 có thể được dùng để ngắt các lời gọi hệ thống đang bị chặn (blocking system calls). Tuy nhiên, cần lưu ý rằng pthread_cancel() có một số vấn đề với việc quản lý tài nguyên và trong ngữ cảnh C++ hiện đại, "hủy bỏ luồng về cơ bản là vô ích trong C++".

Một cách tiếp cận khác là sử dụng các thao tác atomic sigmask với các hàm như ppoll, pselect, và epoll_pwait để xử lý tín hiệu mà không gặp race condition.

Linux 4.18+ hỗ trợ cơ chế RSEQ (restartable sequences) - cho phép kiểm tra cờ và thực thi syscall một cách nguyên tử, giúp đảm bảo tính toàn vẹn khi xử lý các đoạn mã quan trọng.

Bài viết nhấn mạnh rằng việc chấm dứt luồng một cách sạch sẽ là một vấn đề phức tạp mà không có giải pháp hoàn hảo, đòi hỏi phải cân nhắc cẩn thận các race conditions và quản lý tài nguyên. Việc đảm bảo rằng các tài nguyên được giải phóng đúng cách và luồng được dừng một cách kiểm soát là rất quan trọng khi xây dựng các ứng dụng đa luồng.

**Điểm chính:**
- Có nhiều cách để dừng luồng trong Linux: từ vòng lặp kiểm tra cờ đến tín hiệu
- pthread_cancel() có nhiều vấn đề trong C++ hiện đại
- Cần tránh race conditions khi xử lý tín hiệu và luồng
- Linux 4.18+ có cơ chế RSEQ để xử lý các đoạn mã quan trọng nguyên tử

## [Advice for New Principal Tech ICs (i.e., Notes to Myself)](https://eugeneyan.com/writing/principal/)

Bài viết cung cấp 31 lời khuyên cho các kỹ sư cá nhân ở cấp độ principal trong lĩnh vực công nghệ, bao gồm các khía cạnh về lãnh đạo, ảnh hưởng, hướng dẫn và mở rộng tác động thông qua người khác.

Một trong những điểm quan trọng được nêu ra là các vị trí principal sẽ có những đặc điểm khác nhau - một số tập trung vào chiều sâu kỹ thuật trong khi những người khác lại giỏi hơn trong việc tác động theo chiều ngang trong tổ chức.

Khi thăng tiến lên các vị trí cao hơn, công việc cốt lõi trước đây đã giúp bạn thành công ở vai trò trước đó nay trở thành công việc phụ. Việc đúng đắn không chỉ là vấn đề cốt lõi - bạn phải thuyết phục người khác quan tâm và hành động.

Bạn nên tập trung vào giao điểm giữa những gì bạn thực sự quan tâm và những gì bạn đặc biệt xuất sắc. Mấu chốt của việc mở rộng quy mô thông qua người khác là giúp người khác đưa ra những quyết định giống như những gì bạn sẽ làm.

Bài viết nhấn mạnh tầm quan trọng của việc dành thời gian tương tác với các thực tập sinh, vì họ có thể nhận được lợi ích đáng kể từ sự hướng dẫn. Với sự tự do lớn hơn cũng đi kèm trách nhiệm lớn hơn - bạn có thể kỳ vọng vào sự tự chủ nhưng cũng phải chịu trách nhiệm giải trình.

Tư tưởng cốt lõi của các vị trí principal là chuyển từ đóng góp cá nhân sang tận dụng tổ chức thông qua việc dạy dỗ, kết nối và trao quyền cho người khác. Điều này đòi hỏi sự thay đổi từ việc thực hiện công việc trực tiếp sang việc nhân rộng ảnh hưởng thông qua việc giúp đỡ người khác phát triển và đưa ra quyết định đúng đắn.

**Điểm chính:**
- Các vị trí principal có nhiều kiểu khác nhau: kỹ thuật sâu hoặc ảnh hưởng ngang
- Công việc cốt lõi trước đây nay trở thành công việc phụ
- Phải thuyết phục người khác hành động, không chỉ đúng
- Mở rộng ảnh hưởng qua việc dạy và trao quyền cho người khác

## [How fast is java? Teaching an old dog new tricks](https://dgerrells.com/blog/how-fast-is-java-teaching-an-old-dog-new-tricks)

Tác giả bài viết khám phá những cải tiến về hiệu suất của Java bằng cách triển khai một mô phỏng hạt (particle simulation) sử dụng API Vector mới cho các thao tác SIMD, đồng thời so sánh kết quả với Rust.

Java hiện đã có một API SIMD mà "trừu tượng hóa độ phức tạp của SIMD phía sau một API thú vị". Tác giả đã sử dụng "mọi thủ thuật mới nhất trong 'cuốn sách của Java'" để tối ưu hóa hiệu suất mô phỏng hạt.

Kết quả so sánh hiệu suất cho thấy "Rust nhanh hơn khoảng 2 lần ở hầu hết các quy mô" so với Java. API Vector của Java "chỉ nhanh bằng khoảng một nửa so với Rust mà không cần kiểm tra vay mượn (borrow checking)!"

Tác giả nhận xét rằng "Java đã tiến bộ rất nhiều kể từ lần cuối tôi sử dụng nó", nhưng "toàn bộ hệ sinh thái vẫn còn nhiều điều đáng mong muốn". Một phàn nàn lớn là "việc thiết lập một hệ thống xây dựng (build system) phù hợp để kéo một tập hợp nhỏ thư viện là một điều rất khó chịu".

Về hiệu suất cấp phát bộ nhớ: "Rust cấp phát bộ nhớ nhanh hơn nhiều" do Java sử dụng cấp phát heap. Dù có những cải tiến về ngôn ngữ, Java vẫn bị giới hạn bởi hệ sinh thái của nó.

Tác giả kết luận rằng Java "có thể dạy một con chó già những trò mới" nhưng vẫn bị giới hạn bởi hệ sinh thái của nó mặc dù có những cải tiến về ngôn ngữ. Điều này cho thấy rằng trong khi Java đã bổ sung những tính năng mới như API Vector để tận dụng SIMD, giúp cải thiện hiệu suất, vẫn còn một khoảng cách đáng kể so với các ngôn ngữ hiện đại như Rust, đặc biệt là về hiệu quả cấp phát bộ nhớ và trải nghiệm phát triển tổng thể.

**Điểm chính:**
- Java có API SIMD mới giúp tận dụng tính toán song song
- Rust vẫn nhanh hơn khoảng 2 lần so với Java đã tối ưu
- Java vẫn bị giới hạn bởi hệ sinh thái và hệ thống build
- Java có thể cải thiện hiệu suất nhưng vẫn chậm hơn Rust

## [50 things I know](https://usefulfictions.substack.com/p/50-things-i-know)

Bài viết là một danh sách gồm 50 nhận thức và quan sát được tổng hợp bởi Cate Hall, trải dài từ sự phát triển cá nhân đến các mối quan hệ xã hội, ra quyết định và các mối quan hệ cá nhân.

Một trong những điểm nổi bật là việc bạn hoàn toàn có quyền quan tâm đến những người không quan tâm đến bạn - "việc khám phá khả năng yêu thương những người sẽ không bao giờ đáp lại trọn vẹn chính là định nghĩa của sự vị tha."

Nếu bạn không chắc chắn làm thế nào để có những quan điểm tốt hơn, hãy thử "chỉ đơn giản là có ít quan điểm hơn trước đã."

Có một thực tế là không có cách nào để điều chỉnh đầy đủ cho xu hướng lập kế hoạch sai lệch - đối với bất kỳ nhiệm vụ nào, hãy nhân đôi số thời gian và tiền bạc mà bạn nghĩ sẽ cần.

Nhiều động lực xã hội là nghịch lý - những hành động xã hội mà nhìn từ bên trong có vẻ yếu đuối, khi được thực hiện mà không có sự xin lỗi, thực tế lại được đọc như là rất mạnh mẽ.

Việc biết khi nào nên bỏ cuộc là một trong những kỹ năng có giá trị nhất trên thế giới. Không có lý thuyết thống nhất nào cho đạo đức, không có gì không bị vỡ trong bất kỳ trường hợp ngoại lệ nào - vậy nên hãy tránh các ý thức hệ toàn diện.

Tác giả chia sẻ nhiều bài học sâu sắc về cuộc sống, con người và cách xử lý các tình huống khác nhau trong cuộc sống. Những nhận thức này phản ánh sự tích lũy kinh nghiệm và sự trưởng thành trong cách nhìn nhận thế giới xung quanh.

**Điểm chính:**
- Có quyền quan tâm đến người không quan tâm lại (sự vị tha)
- Có ít quan điểm hơn có thể tốt hơn
- Lập kế hoạch thường sai lạc, nhân đôi thời gian/dự toán
- Biết khi nào nên bỏ cuộc là kỹ năng quý giá

## [Programming Languages That Blew My Mind](https://yoric.github.io/post/programming-languages-that-blew-my-mind/)

Tác giả chia sẻ những ngôn ngữ lập trình đã thay đổi hoàn toàn quan điểm của họ về lập trình và tư duy trong suốt sự nghiệp của mình.

**Basic** mang lại trải nghiệm lập trình trò chơi đơn giản, làm việc với mảng và các câu lệnh GOTO/GOSUB.

**Pascal** giới thiệu lập trình theo cấu trúc, trải nghiệm IDE, phát hiện lỗi và hướng đối tượng.

**Assembly** giúp hiểu về địa chỉ bộ nhớ, thanh ghi và tương tác trực tiếp với phần cứng.

**HyperCard** mang đến khả năng scripting, lập trình bằng ngôn ngữ tự nhiên và cơ chế thu gom rác (garbage collection).

**OCaml** giới thiệu tính đa hình (polymorphism), suy luận kiểu (type inference), pattern-matching và lập trình bậc cao (higher-order programming).

**Java** nổi bật với thư viện chuẩn toàn diện, chất lượng tài liệu và JVM (Java Virtual Machine).

**Prolog** thể hiện lập trình mô tả (declarative programming) - "dạy chương trình cách suy nghĩ" thay vì chỉ định từng bước thực hiện.

**Coq** cho thấy kiểu dữ liệu như đặc tả, chương trình như bằng chứng, và xác minh hình thức.

**Erlang** thể hiện hệ thống phân tán, thiết kế "hãy để nó thất bại" (let it fail) và mô hình actor.

**Rust** kết hợp an toàn bộ nhớ với hiệu suất, hệ thống kiểu để đảm bảo tính đồng thời.

**Opalang** giới thiệu biên dịch đa tầng (multi-tier), tự động phân chia giữa client và server.

Tác giả lưu ý rằng nhiều khái niệm đã xuất hiện trong nhiều ngôn ngữ khác nhau qua thời gian, và một số ý tưởng sáng tạo từ các ngôn ngữ nghiên cứu đã ảnh hưởng đến phát triển phần mềm phổ biến. Mỗi ngôn ngữ lập trình mang đến những góc nhìn khác nhau và các nguyên lý thiết kế độc đáo, đóng góp vào sự phát triển của ngành lập trình nói chung.

**Điểm chính:**
- Mỗi ngôn ngữ lập trình mang lại những bài học và trải nghiệm khác nhau
- Có sự tiến hóa trong tư duy lập trình qua từng thế hệ ngôn ngữ
- Một số ý tưởng từ ngôn ngữ nghiên cứu đã ảnh hưởng đến các ngôn ngữ chính thống
- Lập trình có nhiều mô hình: cấu trúc, hướng đối tượng, khai báo, v.v.

## Bonus: Vài ảnh hay ho đến từ [ByteByteGo](https://bytebytego.com/)

![Docker vs Kubernetes](https://substack-post-media.s3.amazonaws.com/public/images/9cfa2d94-1602-47c2-8942-b585c1d8d285_2252x2752.jpeg)
![Batch vs Stream Processing](https://substackcdn.com/image/fetch/$s_!P-gB!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8c9090b5-77c7-4f04-88bc-481df27de32d.tif)
![What are Modular Monoliths?](https://substackcdn.com/image/fetch/$s_!f0s-!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fb6d1ef48-faea-4d57-b2ea-f8411efc8334_2360x2770.png)
![What is the difference between Process and Thread?](https://substackcdn.com/image/fetch/$s_!MDHC!,w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F7cf3f3a0-726f-47a3-94e4-755fa9aa8036_2196x2319.jpeg)
![How to Debug a Slow API?](https://substackcdn.com/image/fetch/$s_!-jEP!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa7885eb0-3b6d-4be3-bbb7-332b3f9fc0e0_2360x2920.jpeg)
![Top Service-to-Service Communication Patterns](https://substackcdn.com/image/fetch/$s_!uW-M!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd7494e44-82ec-43fc-bd7f-eabea7776dd1_2250x2624.png)

*Đánh giá: Nhìn chung đây vẫn là một bài viết tương đối chất lượng. Tuy nhiên phần tóm tắt còn hơi dài, sẽ cần cải thiện thêm*
