---
title: "Newsletter #95"
date: 2026-04-14
tags: ["AI-Assisted", "Newsletter", "Claude Code", "System Design", "Performance", "AI", "Go"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #95.*

## [12 tính năng Claude Code mà mọi kỹ sư nên biết](https://www.youtube.com/watch?v=E4fzxVMOav4)

Video của kênh ByteByteAI điểm qua 12 tính năng mà mọi kỹ sư nên nắm khi dùng Claude Code — công cụ lập trình bằng AI chạy ngay trong dòng lệnh. Nổi bật nhất là Subagents (tác tử phụ), cho phép chia một nhiệm vụ phức tạp thành nhiều phần việc nhỏ do các tác tử riêng xử lý song song, nhờ đó quy trình làm việc nhanh hơn và ngữ cảnh của phiên chính gọn hơn. Tệp CLAUDE.md đóng vai trò bản hướng dẫn cho dự án: nơi ghi lại kiến trúc, quy ước viết mã nguồn và các quy tắc riêng của nhóm để Claude hiểu đúng bối cảnh ngay từ đầu.

Checkpoints (điểm lưu trạng thái) ghi lại tiến trình làm việc, nên khi AI đi sai hướng bạn có thể quay về trạng thái trước thay vì phải sửa tay. Tích hợp MCP (Model Context Protocol) mở rộng khả năng của Claude Code bằng cách kết nối tới các dịch vụ bên ngoài như cơ sở dữ liệu, API hay công cụ phát triển khác. Video phù hợp cho cả người mới bắt đầu lẫn những ai đã dùng Claude Code và muốn khai thác công cụ này hiệu quả hơn.

## [Quantization từ nền tảng](https://ngrok.com/blog/quantization)

Sam Rose (ngrok) giải thích từ gốc kỹ thuật lượng tử hoá (quantization) — cách nén mô hình ngôn ngữ lớn để nhỏ đi khoảng 4 lần, nhanh gấp đôi mà chỉ mất chừng 5-10% độ chính xác. Bài viết bắt đầu từ lý do mô hình lại "nặng" đến vậy: một mô hình 80 tỷ tham số như Qwen3-Coder-Next đã chiếm khoảng 159 GB, vì mỗi tham số thường được lưu bằng số thực dấu phẩy động nhiều bit. May mắn là phần lớn tham số có giá trị rất gần 0, nên có thể biểu diễn chúng bằng ít bit hơn mà không mất quá nhiều thông tin.

Tác giả so sánh hai cách lượng tử hoá: đối xứng (symmetric) đơn giản nhưng lãng phí dải giá trị khi dữ liệu phân bố lệch, còn bất đối xứng (asymmetric) thêm một điểm zero offset và giảm sai số trung bình từ khoảng 18% xuống 8.5%. Trong thực tế, tham số được chia thành từng khối 32-256 giá trị để các giá trị ngoại lai chỉ ảnh hưởng cục bộ thay vì kéo sai toàn mô hình. Chất lượng sau khi nén được đo bằng perplexity, KL divergence và bộ câu hỏi GPQA Diamond: bản 8-bit gần như không suy giảm, 4-bit mất khoảng 5-10%, còn 2-bit giảm chất lượng rõ rệt. Đổi lại, tốc độ suy luận tăng đáng kể, từ 19.45 lên 43.32 token/giây với bản 4-bit trên máy M1 Max.

## [JPEG hoạt động như thế nào](https://www.sophielwang.com/blog/jpeg)

Bài viết của Sophie Wang, kèm nhiều minh hoạ tương tác, giải thích cách thuật toán nén ảnh JPEG khai thác hai điều: đặc điểm thị giác của con người và cấu trúc "mượt" tự nhiên của hình ảnh. Mắt người nhạy với độ sáng (luminance) hơn nhiều so với màu sắc (chrominance), nên bước đầu tiên là chuyển ảnh từ RGB sang YCbCr để tách riêng hai thành phần này. Sau đó, JPEG thực hiện lấy mẫu con sắc độ (chroma subsampling) — dùng chung giá trị màu cho một nhóm điểm ảnh lân cận — mà ảnh tái tạo gần như không khác bản gốc.

Tiếp theo, mỗi khối 8x8 điểm ảnh được biến đổi DCT (Discrete Cosine Transform) thành tổ hợp các sóng cosin. Bản thân bước này chưa giảm số lượng giá trị, nhưng dồn phần lớn tín hiệu vào vài hệ số tần số thấp, còn các hệ số tần số cao thường gần bằng 0. Bước lượng tử hoá chia mỗi hệ số cho một bảng hệ số rồi làm tròn, khiến nhiều hệ số tần số cao — những chi tiết mắt người khó nhận ra — trở thành 0. Cuối cùng, các hệ số được quét theo đường zigzag để gom các số 0 lại và mã hoá entropy thành tệp nhỏ gọn; khi giải nén, quy trình chạy ngược lại để dựng lại ảnh.

## [81.000 người muốn gì từ AI](https://www.anthropic.com/features/81k-interviews)

Anthropic công bố kết quả nghiên cứu định tính đa ngôn ngữ lớn nhất từ trước đến nay: dùng một phiên bản Claude làm người phỏng vấn, họ trò chuyện với 80.508 người dùng Claude ở 159 quốc gia bằng 70 ngôn ngữ về điều họ mong đợi và lo ngại ở AI. Thông điệp chính là con người muốn AI giúp mình sống tốt hơn chứ không chỉ làm việc nhanh hơn. Các mong muốn hàng đầu gồm xuất sắc trong nghề nghiệp (19%), phát triển bản thân (14%), quản lý cuộc sống (14%) và có thêm thời gian tự do (11%). Đằng sau mong muốn năng suất thường là khao khát sâu hơn — tự động hoá email thực chất là để có thêm thời gian cho gia đình.

81% người tham gia cho biết AI đã giúp họ tiến gần hơn tới mục tiêu, chủ yếu qua năng suất (32%), vai trò bạn đồng hành tư duy (17%) và học tập (10%). Mặt khác, trung bình mỗi người nêu 2.3 mối lo: độ tin cậy (27%), mất việc làm (22%), mất quyền tự chủ (22%), suy giảm nhận thức (16%) và thiếu cơ chế quản trị (15%). Lợi ích và rủi ro thường song hành trong cùng một người: ai đánh giá cao sự hỗ trợ cảm xúc từ AI thì khả năng lo ngại bị phụ thuộc cũng cao gấp 3 lần. Người dùng ở khu vực thu nhập thấp lạc quan hơn và xem AI là cơ hội, còn ở khu vực giàu có thì mối quan tâm xoay quanh việc quản lý một cuộc sống phức tạp.

## ~~[Mở rộng monolith lên 1 triệu dòng mã: 113 bài học thực tế từ Tech Lead đến CTO](https://www.semicolonandsons.com/articles/scaling-a-monolith-to-1m-loc-113-pragmatic-lessons-from-tech-lead-to-cto)~~

Bài viết đúc kết 113 bài học thực tế từ hành trình mở rộng một monolith lên 1 triệu dòng mã, qua kinh nghiệm của tác giả khi đi từ vị trí Tech Lead lên CTO. Thông điệp xuyên suốt là quyết định kiến trúc quan trọng hơn nhiều so với các tối ưu nhỏ lẻ: thay vì vội thêm cache, hãy sửa tận gốc như truy vấn cơ sở dữ liệu kém hay thiếu index, bởi chỉ một truy vấn chạy lâu cũng có thể kéo hiệu năng toàn hệ thống giảm một nửa. Giám sát (monitoring) và khả năng quan sát (observability) phải được đối xử như thành phần chính của hệ thống, với cảnh báo cho hiệu năng, truy vấn N+1 hay mức đầy của cache, và mục tiêu "inbox zero" cho việc theo dõi lỗi — cảnh báo nào cũng được xử lý.

Triển khai nhanh (dưới 2 phút) nhờ tách frontend và backend, chạy song song các bước và dùng công cụ phù hợp giúp giảm rủi ro đáng kể, vì lỗi được phát hiện và sửa sớm. Về bảo mật, tác giả khuyên xuất phát từ mô hình mối đe doạ cụ thể như chiếm tài khoản, spam hay DDoS thay vì áp giải pháp chung chung. Cuối cùng, yếu tố con người quan trọng không kém kỹ thuật: tránh văn hoá đổ lỗi, đặt kỳ vọng rõ ràng và tạo môi trường an toàn tâm lý cho cả nhóm.

## [Thiết kế harness cho ứng dụng AI chạy dài](https://www.anthropic.com/engineering/harness-design-long-running-apps)

Bài viết từ đội kỹ thuật Anthropic xử lý hai điểm yếu của AI agent khi làm việc dài: mô hình mất mạch lạc khi cửa sổ ngữ cảnh dần đầy, và có xu hướng tự đánh giá quá cao sản phẩm của chính mình. Giải pháp là một harness đa tác tử lấy cảm hứng từ GAN: Planner mở rộng yêu cầu ngắn thành đặc tả chi tiết, Generator tạo sản phẩm, còn Evaluator chấm điểm độc lập rồi gửi phản hồi ngược lại. Với việc mang tính chủ quan như thiết kế frontend, nhóm đặt ra tiêu chí chấm điểm cụ thể thay cho câu hỏi mơ hồ "có đẹp không", và cho Generator cùng Evaluator lặp 5-15 vòng, có khi chuyển hẳn sang một phong cách thẩm mỹ mới.

Với tác vụ lập trình kéo dài, reset ngữ cảnh (bắt đầu phiên mới kèm tài liệu bàn giao) hiệu quả hơn nén ngữ cảnh, nhất là khi mô hình gặp hiện tượng "context anxiety" — vội kết thúc công việc vì tưởng sắp hết ngữ cảnh. Chi phí chênh lệch rõ rệt: chạy một agent đơn lẻ tốn 9 USD và 20 phút nhưng sản phẩm lỗi, còn dùng harness đầy đủ tốn 200 USD và 6 giờ nhưng cho ra ứng dụng chạy được thật. Bài học quan trọng khác là mỗi khi mô hình được nâng cấp, cần xem lại harness, vì thành phần từng cần thiết có thể trở thành gánh nặng thừa.

## [Vì sao tôi vibe với Go, không phải Rust hay Python](https://lifelog.my/episode/why-i-vibe-in-go-not-rust-or-python)

Tác giả giải thích vì sao chọn Go thay vì Rust hay Python khi lập trình cùng AI (vibe coding). Theo tác giả, giữa mã nguồn do AI sinh ra và môi trường production cần nhiều lớp lọc, và Go cung cấp đủ năm lớp: trình biên dịch, hệ thống kiểu, xử lý lỗi tường minh, sự đơn giản bắt buộc, và cuối cùng là phán đoán của con người. Python thiếu kiểm tra lúc biên dịch — type hint chỉ là tuỳ chọn — nên khi AI viết hàng nghìn dòng mỗi ngày, lỗi cấu trúc chỉ lộ ra lúc chạy, thậm chí ngay trên production.

Rust thì ngược lại: đảm bảo tính đúng đắn rất tốt nhưng borrow checker và lifetime buộc con người tiêu tốn sự chú ý vào những vấn đề do ngôn ngữ đặt ra, thay vì dành cho quyết định kiến trúc hay bài toán nghiệp vụ. Go cân bằng được giữa kiểm tra lúc biên dịch và sự đơn giản; cam kết tương thích giúp mã viết năm 2024 vẫn biên dịch được năm 2026, còn việc triển khai chỉ cần một tệp binary duy nhất thay vì dựng Docker phức tạp như với Python.

## [Chuẩn vàng của tối ưu hoá: Nhìn vào bên trong RollerCoaster Tycoon](https://larstofus.com/2026/03/22/the-gold-standard-of-optimization-a-look-under-the-hood-of-rollercoaster-tycoon/)

RollerCoaster Tycoon được Chris Sawyer viết gần như hoàn toàn bằng Assembly — ngôn ngữ cấp thấp giúp chương trình chạy nhanh hơn hẳn C hay C++ thời bấy giờ — và đến nay vẫn được xem là chuẩn mực về tối ưu hoá trong lập trình game. Bài viết phân tích những kỹ thuật giúp trò chơi mô phỏng cả công viên với hàng nghìn khách trên phần cứng yếu. Thay vì dùng một kiểu dữ liệu chung, mỗi giá trị được cấp kích thước vừa đủ với mức tối đa dự kiến, chẳng hạn các loại tiền khác nhau dùng kiểu dữ liệu khác nhau để tiết kiệm bộ nhớ.

Mã nguồn thay phép nhân và chia cho luỹ thừa của 2 bằng phép dịch bit (bitshift), và điều đáng chú ý là chính các công thức trong game được thiết kế để tận dụng được thủ thuật này — mức phối hợp giữa lập trình viên và nhà thiết kế hiếm thấy ngày nay. Về thuật toán, khách tham quan không tìm đường thông minh mà đi lang thang bán ngẫu nhiên cho tới khi gặp một trò chơi. Game cũng bỏ hẳn việc phát hiện va chạm giữa khách: hàng nghìn người có thể đứng chung một ô, chỉ có chỉ số hài lòng giảm khi quá đông.

## [Xếp hàng request cũng xếp hàng cả vấn đề năng lực](https://pushtoprod.substack.com/p/queueing-requests-queues-your-capacity-problems-too)

Bài viết chỉ ra rằng hàng đợi (queue) thường chỉ che giấu vấn đề năng lực xử lý chứ không giải quyết nó. Ví dụ, một hệ thống xử lý được 1000 request/giây mà gặp lưu lượng gấp đôi sẽ dồn lại 3.6 triệu request chỉ sau một giờ, khiến người dùng phải chờ khoảng 60 phút dù mỗi request trên server vẫn chỉ mất 1 giây. Điểm mấu chốt là độ trễ người dùng cảm nhận (perceived latency) bao gồm thời gian nằm trong hàng đợi, còn độ trễ đo ở server thì không — vì vậy dashboard giám sát vẫn "xanh" trong khi khách hàng chịu trễ nghiêm trọng.

Toán học của hàng đợi rất khắc nghiệt: chỉ cần vượt công suất 10% trong một giờ đã tồn đọng 360.000 request và trễ thêm 6 phút, vì phần thiếu hụt tích luỹ tuyến tính theo thời gian. Đổi chiến lược xếp hàng (ngẫu nhiên, theo trọng số) chỉ chia lại độ trễ giữa các request, là trò chơi tổng bằng không. Cách duy nhất thật sự hiệu quả là tăng năng lực: tăng 50% thì rút cạn hàng đợi khủng hoảng trong khoảng một giờ, còn tăng 10% phải mất tới chín giờ.

## [7 lỗi phổ biến khác trong sơ đồ kiến trúc](https://www.ilograph.com/blog/posts/more-common-diagram-mistakes/)

Ilograph liệt kê bảy lỗi thường gặp khiến sơ đồ kiến trúc hệ thống khó hiểu. Thứ nhất là tài nguyên không có nhãn — mỗi thành phần nên ghi cả loại lẫn tên mô tả, kể cả khi đã có icon. Thứ hai là thành phần đứng cô lập, không nối với tài nguyên nào, làm mất đi ý nghĩa thể hiện quan hệ của sơ đồ. Thứ ba là một sơ đồ tổng thể quá lớn; tốt hơn nên chia thành nhiều góc nhìn tập trung, mỗi sơ đồ kể một câu chuyện mạch lạc.

Lỗi thứ tư là "hội chứng băng chuyền" — vẽ hành vi thành một luồng thẳng đơn giản, không phản ánh các tương tác qua lại thực tế; trường hợp này nên dùng sequence diagram. Thứ năm là hiệu ứng động vô nghĩa chỉ gây phân tâm, và thứ sáu là "bẫy hình quạt" khi một tài nguyên trung gian che khuất kết nối thật giữa các node. Cuối cùng, tác giả cảnh báo về sơ đồ do AI vẽ: hiện vẫn còn mơ hồ, hay bịa thông tin và không biết nên giữ hay lược bỏ chi tiết nào.

## [Cách làm việc kỹ thuật với sự hỗ trợ của AI](https://newsletter.eng-leadership.com/p/how-to-do-ai-assisted-engineering)

Bài viết tổng hợp chia sẻ của 15 kỹ sư và lãnh đạo kỹ thuật giàu kinh nghiệm về cách làm việc hiệu quả với AI trong lập trình. Điểm chung nổi bật là thiết kế kỹ trước khi viết mã: khi AI đảm nhận phần triển khai, nút thắt chuyển sang khâu thiết kế, nên đó mới là nơi cần đầu tư thời gian. Thay vì viết prompt tuỳ hứng mỗi lần, các kỹ sư thành công xây dựng quy trình có cấu trúc với workflow tái sử dụng, template và tệp CLAUDE.md ghi lại tiêu chuẩn cùng kỳ vọng của dự án.

Nguyên tắc tách biệt trách nhiệm cũng được nhấn mạnh: tách việc sinh mã khỏi việc kiểm chứng, dùng nhiều agent chuyên biệt để review từ các góc độ bảo mật, hiệu năng và tính đúng đắn, đồng thời giữ quyền quyết định ở con người với các bước quan trọng như merge hay triển khai. Đầu ra đầu tiên của AI chỉ là bản nháp, chưa phải sản phẩm hoàn chỉnh, nên cần trải qua nhiều vòng review từ nhiều góc nhìn khác nhau.

### Bonus

**Images:**
![Load Balancer vs API Gateway](https://substackcdn.com/image/fetch/$s_!YJG0!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd3e5a12b-4237-4661-b090-d518a6da7f20_2508x3000.png)
![REST vs gRPC](https://substackcdn.com/image/fetch/$s_!LrVm!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F7a20a0cb-3142-4c32-b772-f002f1a288fd_2880x3862.jpeg)
![Session-Based vs JWT-Based Authentication](https://substackcdn.com/image/fetch/$s_!6SID!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F14a25337-0104-4c6c-b91a-3a2cd6afd6e4_2508x3000.png)
![A Cheat Sheet on The Most-Used Linux Commands](https://substackcdn.com/image/fetch/$s_!LuLK!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa8dd9e12-2979-4040-a138-08723094b8cf_2536x3436.jpeg)

---

*Bài viết đã được viết lại bởi Claude Code với Opus 5.5 vào ngày 27/09/2026.*
