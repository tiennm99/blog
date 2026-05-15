---
title: "Newsletter #95"
date: 2026-04-14
tags: ["AI-Assisted", "Newsletter", "Claude Code", "System Design", "Performance", "AI", "Go"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #95.*

## [12 tính năng Claude Code mà mọi kỹ sư nên biết](https://www.youtube.com/watch?v=E4fzxVMOav4)

Video này giới thiệu 12 tính năng quan trọng của Claude Code — công cụ dòng lệnh AI hỗ trợ lập trình viên viết mã nguồn hiệu quả hơn. Các tính năng được đề cập bao gồm Subagents (tác tử phụ), tệp cấu hình CLAUDE.md, Checkpoints (điểm lưu trạng thái), tích hợp MCP (Model Context Protocol), và nhiều tính năng khác.

Claude Code cho phép lập trình viên tận dụng sức mạnh của AI ngay trong môi trường dòng lệnh quen thuộc. Với Subagents, người dùng có thể phân chia công việc phức tạp thành nhiều tác vụ nhỏ chạy song song. Tệp CLAUDE.md đóng vai trò như bản hướng dẫn giúp Claude hiểu rõ ngữ cảnh dự án và tuân thủ quy tắc riêng của từng nhóm phát triển. Tính năng Checkpoints giúp lưu lại trạng thái làm việc, cho phép quay lại phiên bản trước nếu cần. Còn MCP mở rộng khả năng kết nối với các dịch vụ bên ngoài như cơ sở dữ liệu, API, và công cụ phát triển khác.

**Điểm chính:**
- **Subagents**: Phân chia tác vụ phức tạp thành nhiều tác tử phụ chạy đồng thời, tăng tốc quy trình làm việc
- **CLAUDE.md**: Tệp cấu hình dự án giúp Claude hiểu ngữ cảnh, quy tắc mã nguồn và kiến trúc hệ thống
- **Checkpoints**: Lưu trạng thái làm việc để dễ dàng khôi phục khi cần thiết
- **MCP (Model Context Protocol)**: Kết nối Claude Code với các dịch vụ và công cụ bên ngoài
- Video phù hợp cho cả lập trình viên mới bắt đầu và những người đã sử dụng Claude Code muốn khai thác tối đa công cụ này

## [Quantization từ nền tảng](https://ngrok.com/blog/quantization)

Bài viết giải thích chi tiết về kỹ thuật lượng tử hoá (quantization) — phương pháp nén mô hình AI giúp giảm kích thước lên đến 4 lần mà chỉ mất khoảng 5-10% độ chính xác. Đây là kỹ thuật then chốt giúp chạy các mô hình ngôn ngữ lớn trên phần cứng tiêu dùng thông thường, thay vì cần hàng trăm GB RAM.

Bài viết trình bày hai phương pháp chính: lượng tử hoá đối xứng (symmetric) và bất đối xứng (asymmetric). Phương pháp đối xứng đơn giản hơn nhưng lãng phí không gian khi phân bố giá trị không đều. Phương pháp bất đối xứng sử dụng điểm zero offset, giảm sai số trung bình từ khoảng 18% xuống còn 8.5%. Thay vì lượng tử hoá toàn bộ mô hình cùng lúc, thực tế người ta chia thành các khối 32-256 tham số để hạn chế ảnh hưởng của các giá trị ngoại lai.

**Điểm chính:**
- Lượng tử hoá 8-bit gần như không mất chất lượng, 4-bit mất khoảng 5-10%, còn 2-bit thì suy giảm nghiêm trọng
- Lượng tử hoá 4-bit tăng tốc suy luận từ 19.45 lên 43.32 token/giây trên phần cứng M1 Max
- Kỹ thuật chia khối (block quantization) giúp kiểm soát ảnh hưởng của giá trị ngoại lai lên toàn mô hình

## [JPEG hoạt động như thế nào](https://www.sophielwang.com/blog/jpeg)

Bài viết trực quan và tương tác giải thích cách thuật toán nén ảnh JPEG hoạt động từ gốc. JPEG khai thác đặc điểm nhận thức thị giác của con người và cấu trúc tự nhiên của hình ảnh để nén dữ liệu mà không làm giảm đáng kể chất lượng hình ảnh mà mắt người cảm nhận được.

Quy trình nén JPEG gồm nhiều bước: đầu tiên chuyển đổi không gian màu từ RGB sang YCbCr để tách riêng độ sáng (luminance) và sắc độ (chrominance). Tiếp theo là lấy mẫu con sắc độ (chroma subsampling) — vì mắt người nhạy cảm với độ sáng hơn màu sắc, nên có thể giảm độ phân giải kênh màu mà không ảnh hưởng nhiều. Sau đó áp dụng biến đổi DCT (Discrete Cosine Transform) trên từng khối 8x8 pixel để chuyển từ miền không gian sang miền tần số. Bước lượng tử hoá loại bỏ các tần số cao mà mắt người ít nhận biết. Cuối cùng là mã hoá entropy để nén dữ liệu còn lại.

**Điểm chính:**
- Mắt người nhạy cảm với thay đổi độ sáng hơn thay đổi màu sắc — JPEG tận dụng điều này qua chroma subsampling
- Biến đổi DCT chuyển dữ liệu pixel sang miền tần số, tập trung tín hiệu quan trọng vào ít hệ số hơn
- Bài viết có các công cụ tương tác trực quan giúp hiểu từng bước trong quy trình nén JPEG

## [81.000 người muốn gì từ AI](https://www.anthropic.com/features/81k-interviews)

Anthropic vừa thực hiện nghiên cứu định tính đa ngôn ngữ lớn nhất từ trước đến nay, phỏng vấn 80.508 người dùng Claude tại 159 quốc gia bằng 70 ngôn ngữ. Kết quả cho thấy con người muốn AI giúp sống tốt hơn, không chỉ làm việc nhanh hơn. Các mong muốn hàng đầu bao gồm: xuất sắc trong nghề nghiệp (19%), chuyển đổi cá nhân (14%), quản lý cuộc sống (14%) và tự do thời gian (11%).

81% người được hỏi cho biết AI đã giúp họ tiến gần hơn đến tầm nhìn của mình, chủ yếu qua năng suất (32%), đối tác tư duy (17%) và học tập (10%). Tuy nhiên, mỗi người trung bình có 2.3 mối lo ngại: độ tin cậy (27%), mất việc làm (22%), mất quyền tự chủ (22%), suy giảm nhận thức (16%) và thiếu quản trị (15%). Điều thú vị là lợi ích và rủi ro thường đan xen trong cùng một người — những ai đánh giá cao hỗ trợ cảm xúc từ AI có khả năng lo ngại phụ thuộc cao gấp 3 lần.

**Điểm chính:**
- Các khu vực thu nhập thấp lạc quan hơn, xem AI là cơ hội; khu vực giàu tập trung vào quản lý phức tạp cuộc sống
- Mong muốn năng suất thường ẩn chứa khao khát sâu hơn — tự động hoá email thực chất là muốn dành thời gian cho gia đình
- Đây là nghiên cứu định tính đa ngôn ngữ lớn nhất từ trước đến nay về kỳ vọng của con người với AI

## [Mở rộng monolith lên 1 triệu dòng mã: 113 bài học thực tế từ Tech Lead đến CTO](https://www.semicolonandsons.com/articles/scaling-a-monolith-to-1m-loc-113-pragmatic-lessons-from-tech-lead-to-cto)

Bài viết tổng hợp 113 bài học thực tế từ hành trình mở rộng một monolith lên 1 triệu dòng mã, đúc kết từ kinh nghiệm đi từ vị trí Tech Lead đến CTO. Tác giả nhấn mạnh rằng các quyết định kiến trúc có ảnh hưởng lớn hơn nhiều so với tối ưu hoá nhỏ lẻ — thay vì vội vàng thêm cache, hãy sửa gốc vấn đề như truy vấn cơ sở dữ liệu kém, thiếu index, hoặc quản lý bộ nhớ không hợp lý.

Giám sát (monitoring) và khả năng quan sát (observability) cần được coi là hệ thống hạng nhất, với cảnh báo cho hiệu năng, truy vấn N+1, mức độ đầy của cache. Mục tiêu là đạt "inbox zero" trong theo dõi lỗi — mỗi cảnh báo đều được xử lý. Ngoài yếu tố kỹ thuật, tác giả cho rằng yếu tố con người và động lực nhóm cũng quan trọng không kém: tránh văn hoá đổ lỗi, đặt kỳ vọng rõ ràng, tạo môi trường an toàn tâm lý. Triển khai nhanh (dưới 2 phút) cũng giảm rủi ro đáng kể nhờ cho phép lặp lại và sửa lỗi nhanh.

**Điểm chính:**
- Sửa nguyên nhân gốc thay vì thêm cache — truy vấn chạy lâu có thể làm giảm một nửa hiệu năng toàn hệ thống
- Triển khai nhanh (dưới 2 phút) nhờ tách frontend/backend, song song hoá, và công cụ hiệu quả
- An ninh nên dựa trên mô hình mối đe doạ cụ thể (chiếm tài khoản, spam, DDoS) thay vì giải pháp chung chung

## [Thiết kế harness cho ứng dụng AI chạy dài](https://www.anthropic.com/engineering/harness-design-long-running-apps)

Bài viết từ Anthropic giải quyết hai thách thức cốt lõi của AI agent: mô hình mất tính nhất quán khi cửa sổ ngữ cảnh bị lấp đầy trong các tác vụ dài, và xu hướng đánh giá quá cao chất lượng công việc của chính mình. Giải pháp là kiến trúc đa tác tử lấy cảm hứng từ GAN: **Generator** tạo đầu ra, **Evaluator** đánh giá độc lập, và **Planner** mở rộng yêu cầu ngắn thành đặc tả chi tiết.

Với công việc mang tính chủ quan như thiết kế frontend, nhóm phát triển xây dựng các tiêu chí chấm điểm cụ thể thay vì câu hỏi mơ hồ "đẹp hay không". Generator và evaluator lặp lại 5-15 chu kỳ, đôi khi chuyển hướng sang phong cách thẩm mỹ hoàn toàn mới. Với công việc lập trình dài, reset ngữ cảnh tỏ ra hiệu quả hơn nén ngữ cảnh khi mô hình gặp "context anxiety". Đặc biệt, khi mô hình nâng cấp, cần liên tục xem xét lại harness — thành phần từng cần thiết có thể trở thành gánh nặng dư thừa.

**Điểm chính:**
- Kiến trúc đa tác tử (Generator/Evaluator/Planner) khắc phục vấn đề mô hình mất tính nhất quán trên tác vụ dài
- Reset ngữ cảnh tốt hơn nén ngữ cảnh khi mô hình gặp vấn đề với cửa sổ ngữ cảnh dài
- Một ví dụ minh hoạ: chạy đơn lẻ tốn 9 USD và 20 phút nhưng sản phẩm lỗi; dùng harness đầy đủ tốn 200 USD và 6 giờ nhưng cho ứng dụng hoạt động thực sự

## [Vì sao tôi vibe với Go, không phải Rust hay Python](https://lifelog.my/episode/why-i-vibe-in-go-not-rust-or-python)

Tác giả chia sẻ lý do chọn Go thay vì Rust hay Python khi lập trình cùng AI (vibe coding). Theo tác giả, Go đóng vai trò như một bộ lọc hiệu quả giữa mã do AI sinh ra và độ tin cậy khi đưa vào sản xuất. Python thiếu kiểm tra tại thời điểm biên dịch — dù có type hint tuỳ chọn, lỗi vẫn ẩn đến khi chạy. Khi AI viết bốn nghìn dòng Python mỗi ngày, các lỗi cấu trúc sẽ xuất hiện ở môi trường production thay vì được phát hiện lúc phát triển.

Rust tuy đảm bảo tính đúng đắn nhưng tạo ra phức tạp không cần thiết — borrow checker và lifetime annotation tiêu tốn sự chú ý của con người vào các vấn đề do ngôn ngữ áp đặt, thay vì các quyết định kiến trúc. Go cung cấp năm lớp bảo vệ: cơ bản của trình biên dịch, hệ thống kiểu, xử lý lỗi rõ ràng, sự đơn giản bắt buộc, và phán đoán của con người. Ngoài ra, cam kết tương thích của Go đảm bảo mã năm 2024 vẫn biên dịch được vào 2026, và triển khai chỉ cần một file binary thay vì Docker phức tạp như Python.

**Điểm chính:**
- Python thiếu kiểm tra biên dịch khiến lỗi chỉ xuất hiện khi chạy — nguy hiểm khi AI sinh mã với khối lượng lớn
- Rust tốn công sức vào vấn đề do ngôn ngữ tạo ra (borrow checker, lifetime) thay vì giải quyết vấn đề kinh doanh
- Go cân bằng giữa kiểm tra biên dịch, đơn giản, và triển khai dễ — một binary thay vì Docker hay build lâu

## [Chuẩn vàng của tối ưu hoá: Nhìn vào bên trong RollerCoaster Tycoon](https://larstofus.com/2026/03/22/the-gold-standard-of-optimization-a-look-under-the-hood-of-rollercoaster-tycoon/)

RollerCoaster Tycoon do Chris Sawyer phát triển gần như hoàn toàn bằng Assembly — ngôn ngữ cấp thấp cho phép tạo mã nguồn cực kỳ hiệu năng so với C hay C++ thời đó. Bài viết phân tích các kỹ thuật tối ưu hoá tinh vi khiến trò chơi này trở thành chuẩn mực cho lập trình game.

Thay vì dùng kiểu dữ liệu đồng nhất, RCT chọn kích thước khác nhau dựa trên giá trị tối đa dự kiến — ví dụ các giá trị tiền khác nhau dùng các kiểu dữ liệu khác nhau. Mã nguồn thay phép nhân và chia bằng số là luỹ thừa của 2 bằng phép dịch bit (bitshift), cho thấy công thức trong game được thiết kế đồng bộ với khả năng xử lý của CPU — mức độ hợp tác giữa lập trình viên và nhà thiết kế hiếm thấy trong phát triển hiện đại. Về thuật toán, thay vì để khách điều hướng thông minh, họ đi lang thang bán ngẫu nhiên cho đến khi gặp một trò chơi; hàng nghìn khách có thể đứng trên cùng một ô mà không cần phát hiện va chạm — chỉ giảm chỉ số hạnh phúc khi quá đông.

**Điểm chính:**
- Viết bằng Assembly để đạt hiệu năng tối đa; chọn kích thước kiểu dữ liệu tinh tế để tiết kiệm bộ nhớ
- Dùng bitshift thay phép nhân/chia — công thức game được thiết kế theo khả năng xử lý CPU
- Bỏ phát hiện va chạm cho khách tham quan, thay vào đó dùng cơ chế giảm hạnh phúc khi quá đông

## [Xếp hàng request cũng xếp hàng cả vấn đề năng lực](https://pushtoprod.substack.com/p/queueing-requests-queues-your-capacity-problems-too)

Bài viết chỉ ra cách hàng đợi (queue) thường che giấu vấn đề về năng lực thay vì giải quyết chúng. Với một hệ thống có khả năng xử lý 1000 request/giây gặp lưu lượng tăng gấp đôi, hàng đợi sẽ tích tụ 3.6 triệu request chỉ trong một giờ, tạo độ trễ cảm nhận lên đến khoảng 60 phút — trong khi thời gian xử lý thực tế của server vẫn chỉ là 1 giây.

Sự khác biệt quan trọng ở đây là độ trễ cảm nhận (perceived latency) bao gồm thời gian chờ trong hàng đợi, còn độ trễ server thì không. Điều này nghĩa là dashboard giám sát có thể hiển thị chỉ số tốt trong khi khách hàng đang chịu độ trễ nghiêm trọng. Toán học của hàng đợi rất khắc nghiệt: chỉ vượt công suất 10% trong một giờ đã tạo ra 360.000 request tồn đọng và 6 phút chậm trễ. Các chiến lược xếp hàng khác (ngẫu nhiên, trọng số) chỉ phân phối lại độ trễ chứ không giải quyết vấn đề — đây là trò chơi tổng bằng không. Giải pháp duy nhất thực sự hiệu quả là tăng năng lực xử lý.

**Điểm chính:**
- Hàng đợi che giấu vấn đề thay vì giải quyết — dashboard sạch nhưng khách hàng vẫn chờ lâu
- Thiếu hụt năng lực dù nhỏ cũng tích luỹ thành độ trễ lớn theo quan hệ tuyến tính
- Tăng năng lực 50% rút cạn hàng đợi khủng hoảng trong một giờ, tăng 10% mất đến chín giờ

## [7 lỗi phổ biến khác trong sơ đồ kiến trúc](https://www.ilograph.com/blog/posts/more-common-diagram-mistakes/)

Bài viết từ Ilograph liệt kê bảy lỗi phổ biến làm giảm hiệu quả của sơ đồ kiến trúc hệ thống. Đầu tiên là tài nguyên không nhãn — cần ghi cả loại và tên mô tả, đặc biệt khi đã có icon. Thứ hai là thành phần bị cô lập không kết nối với bất kỳ tài nguyên nào khác, làm mất đi mục đích quan hệ của sơ đồ. Thứ ba là sơ đồ tổng thể quá lớn — nên chia thành nhiều góc nhìn tập trung, mỗi sơ đồ kể một câu chuyện mạch lạc.

Lỗi thứ tư là "hội chứng băng chuyền" — biểu diễn hành vi thành luồng tuyến tính đơn giản không phản ánh đúng độ phức tạp thực tế, nên dùng sequence diagram để thể hiện tương tác qua lại. Thứ năm là hoạt ảnh vô nghĩa chỉ gây phân tâm. Thứ sáu là "bẫy fan" — khi tài nguyên trung gian che khuất kết nối giữa các node. Cuối cùng và đáng chú ý, tác giả cảnh báo về sơ đồ do AI sinh ra — hiện còn mơ hồ, hay bịa thông tin và không quyết định được nên bao gồm hay loại bỏ thông tin nào.

**Điểm chính:**
- Mỗi tài nguyên cần có nhãn rõ ràng (loại + tên) và phải kết nối với thành phần khác
- Chia sơ đồ lớn thành nhiều góc nhìn tập trung thay vì cố nhét tất cả vào một sơ đồ
- AI hiện tại chưa đủ tốt để vẽ sơ đồ kiến trúc — thường mơ hồ và bịa thông tin

## [Cách làm việc kỹ thuật với sự hỗ trợ của AI](https://newsletter.eng-leadership.com/p/how-to-do-ai-assisted-engineering)

Bài viết tổng hợp chia sẻ từ 15 kỹ sư và lãnh đạo kỹ thuật giàu kinh nghiệm về cách làm việc hiệu quả với AI trong lập trình. Điểm chung nổi bật: **thiết kế chi tiết trước khi viết mã** cho kết quả tốt hơn — khi AI đảm nhận phần triển khai, nút thắt cổ chai chuyển sang giai đoạn thiết kế, nên cần đầu tư nhiều thời gian hơn ở đó.

Các kỹ sư thành công dựng quy trình có cấu trúc thay vì prompt tuỳ hứng: xây dựng các workflow tái sử dụng, template, và file CLAUDE.md để ghi lại tiêu chuẩn và kỳ vọng của dự án. Nguyên tắc tách biệt trách nhiệm cũng quan trọng — tách việc sinh mã khỏi việc xác minh, dùng nhiều agent chuyên biệt cho từng khía cạnh (bảo mật, hiệu năng, tính đúng đắn), và giữ quyền quyết định ở con người cho các lựa chọn quan trọng như merge và triển khai. Đầu ra đầu tiên của AI là bản nháp, không phải sản phẩm — cần nhiều vòng review từ nhiều góc nhìn khác nhau.

**Điểm chính:**
- Thiết kế chi tiết trước khi code — triển khai không còn là nút thắt, thiết kế là chỗ cần đầu tư
- Xây workflow, template, CLAUDE.md thay vì prompt ngẫu nhiên mỗi lần
- Dùng nhiều agent chuyên biệt (bảo mật, hiệu năng, đúng đắn) để review từ nhiều góc nhìn; giữ quyền quyết định cuối cùng ở con người

### Bonus

**Images:**
![Load Balancer vs API Gateway](https://substackcdn.com/image/fetch/$s_!YJG0!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd3e5a12b-4237-4661-b090-d518a6da7f20_2508x3000.png)
![REST vs gRPC](https://substackcdn.com/image/fetch/$s_!LrVm!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F7a20a0cb-3142-4c32-b772-f002f1a288fd_2880x3862.jpeg)
![Session-Based vs JWT-Based Authentication](https://substackcdn.com/image/fetch/$s_!6SID!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F14a25337-0104-4c6c-b91a-3a2cd6afd6e4_2508x3000.png)
![A Cheat Sheet on The Most-Used Linux Commands](https://substackcdn.com/image/fetch/$s_!LuLK!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa8dd9e12-2979-4040-a138-08723094b8cf_2536x3436.jpeg)

---

*Bài viết đã được review và cập nhật bởi Claude Code với Opus 4.7 (1M context).*
