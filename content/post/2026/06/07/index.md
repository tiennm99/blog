---
title: "Newsletter #110"
date: 2026-06-07
tags: ["AI-Assisted", "Newsletter", "LLMs", "Go", "System Design", "Infrastructure", "Engineering Culture"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #110.*

## [go podcast() | 086: Just use postgres, man](https://share.transistor.fm/s/5159e8a9)

Trong tập podcast này, hai tác giả thảo luận về những thách thức kỹ thuật mà họ đang gặp phải với sản phẩm của mình. Morten bày tỏ mong muốn sử dụng ClickHouse, trong khi Dominic tinh tế khuyên rằng sử dụng PostgreSQL có lẽ là đủ tốt cho thời điểm hiện tại. Ngoài ra, Dominic cũng chia sẻ về việc phát hành phiên bản StaticBackend v1.7.0 và cập nhật tình hình hiện tại của dự án này.

**Điểm chính:**
- Thảo luận về các thách thức kỹ thuật khi xây dựng sản phẩm.
- Cân nhắc lựa chọn giữa ClickHouse và PostgreSQL cho hệ quản trị cơ sở dữ liệu.
- Cập nhật về dự án StaticBackend v1.7.0.

## [That one time I used Go panics for flow control](https://noncrab.net/posts/panic-as-flow-control/)

Bài viết kể về một sự cố quá tải xảy ra với một dịch vụ lưu trữ dữ liệu trong bộ nhớ (in-memory datastore) được viết bằng Go. Do các hàm `sort` mặc định của Go không hỗ trợ việc hủy tác vụ thông qua `context`, hệ thống đã lãng phí rất nhiều tài nguyên CPU để sắp xếp kết quả cho những truy vấn mà client đã bỏ qua vì timeout. Để giải quyết vấn đề và ngắt sớm quá trình sắp xếp, tác giả đã quyết định sử dụng `panic` trong Go như một cơ chế điều khiển luồng (flow control) độc đáo.

**Điểm chính:**
- Dịch vụ in-memory datastore bị quá tải nghiêm trọng do lượng truy vấn lớn và các truy vấn retry.
- Hàm `sort` trong Go không hỗ trợ dừng sớm qua `context`, gây lãng phí CPU.
- Sử dụng `panic` như một giải pháp sáng tạo (nhưng bất thường) để ngắt sớm quá trình sắp xếp và giải quyết vấn đề.

## [The last six months in LLMs in five minutes](https://simonwillison.net/2026/May/19/5-minute-llms/)

Bài viết tổng hợp nội dung bài thuyết trình ngắn (lightning talk) của Simon Willison tại PyCon US 2026, điểm lại những bước tiến đáng chú ý của các mô hình ngôn ngữ lớn (LLM) trong 6 tháng qua. Tác giả nhấn mạnh hai xu hướng chính: các công cụ AI hỗ trợ lập trình (coding agents) đã trở nên thực sự hữu ích, và các mô hình cục bộ (local models) đang vượt xa kỳ vọng dù có thể chạy trực tiếp trên máy tính cá nhân. Bài viết cũng đề cập đến sự cạnh tranh khốc liệt giữa các hãng công nghệ lớn khi vị trí "mô hình tốt nhất" liên tục đổi chủ.

**Điểm chính:**
- Tổng hợp sự phát triển của LLM trong 6 tháng qua qua góc nhìn của Simon Willison.
- Các AI coding agent đã vượt qua ngưỡng chất lượng để trở thành công cụ làm việc hiệu quả.
- Các mô hình cục bộ cỡ nhỏ đang cho thấy hiệu năng vượt trội so với kỳ vọng ban đầu.

## [Prompts are technical debt too](https://www.seangoedecke.com/prompts-are-technical-debt-too/)

Bài viết lập luận rằng giống như mã nguồn (code), các câu lệnh gợi ý (prompt) như `AGENTS.md` hay `CLAUDE.md` cũng là một dạng nợ kỹ thuật (technical debt). Thậm chí, chúng còn nguy hiểm hơn vì trong khi code thường báo lỗi rõ ràng khi hỏng, prompt lại suy thoái một cách âm thầm mỗi khi mô hình AI được nâng cấp. Một prompt hoạt động hoàn hảo trên mô hình cũ có thể trở nên vô dụng hoặc phản tác dụng trên mô hình mới. Do đó, tác giả khuyên các lập trình viên không nên tốn quá nhiều thời gian tinh chỉnh các prompt phức tạp. Thay vào đó, hãy ưu tiên cấu hình tối giản và chỉ cung cấp những thông tin thực tế, cốt lõi nhất về dự án.

**Điểm chính:**
- Prompt là một dạng nợ kỹ thuật và thường bị suy thoái âm thầm khi các mô hình AI thay đổi.
- Việc tinh chỉnh tỉ mỉ prompt cho một mô hình cụ thể thường trở nên vô nghĩa ở thế hệ mô hình tiếp theo.
- Khuyến nghị hạn chế sử dụng các kỹ thuật điều hướng hành vi phức tạp; nên ưu tiên sự tối giản.

## [We see something that works, and then we understand it](https://lemire.me/blog/2025/12/04/we-see-something-that-works-and-then-we-understand-it/)

Bài viết thảo luận về khái niệm "thinkism" (niềm tin rằng chỉ cần suy nghĩ sâu sắc là có thể giải quyết mọi vấn đề) và mô hình đổi mới tuyến tính (cho rằng sự hiểu biết phải đi trước tiến bộ). Tác giả Daniel Lemire phản bác quan điểm này, lập luận rằng trong thực tế, đặc biệt là trong nghiên cứu phát triển (R&D) và kỹ thuật phần mềm, tiến bộ thường diễn ra theo chiều ngược lại: chúng ta quan sát hoặc thử nghiệm những thứ hiệu quả trước, rồi mới hiểu và hệ thống hóa chúng sau. Tác giả cũng liên hệ điều này với AI, cảnh báo rằng không nên kỳ vọng AI có thể giải quyết mọi bài toán chỉ bằng cách "suy nghĩ", vì kiến thức lý thuyết luôn là không đủ để bao quát sự phức tạp của thế giới thực.

**Điểm chính:**
- Tiến bộ thường xuất phát từ việc quan sát những gì đang hoạt động hiệu quả, thay vì chờ đợi sự hiểu biết hoàn chỉnh.
- Phê phán "thinkism" và mô hình thác nước (waterfall) truyền thống, đồng thời đề cao tầm quan trọng của thực hành và thử nghiệm.
- AI không thể giải quyết mọi vấn đề chỉ nhờ "suy nghĩ", do giới hạn của kiến thức trước sự phức tạp của thế giới.

## [How Vercel Cut Build Wait Times From 90 Seconds To 5](https://blog.bytebytego.com/p/how-vercel-cut-build-wait-times-from)

Bài viết giải thích cách Vercel đã giảm thời gian khởi tạo quá trình build từ 90 giây xuống chỉ còn 5 giây thông qua một nền tảng nội bộ mới có tên mã là "Hive" (được đưa vào sử dụng từ cuối năm 2023). Tốc độ cải thiện gấp 18 lần này không chỉ đơn thuần là kết quả của việc tối ưu hóa hiệu suất, mà còn nhờ vào việc xây dựng một nền tảng phức tạp với những ràng buộc bảo mật khắt khe. Do Vercel phải chạy mã nguồn của hàng ngàn người dùng trên cùng một hệ thống máy chủ dùng chung, họ buộc phải coi mọi đoạn mã tải lên là mã độc tiềm ẩn (hostile multi-tenancy). Bài viết đi sâu vào cách Vercel giải quyết bài toán niềm tin này bằng cách thiết lập một cơ sở hạ tầng build vừa bảo mật tuyệt đối vừa có tốc độ cực nhanh, khác biệt hoàn toàn so với các thiết lập máy chủ thông thường.

**Điểm chính:**
- Vercel ra mắt nền tảng nội bộ "Hive" giúp giảm thời gian chờ build từ 90 giây xuống 5 giây.
- Giải quyết bài toán "hostile multi-tenancy" khi phải chạy mã nguồn từ nhiều người dùng trên cùng hệ thống máy chủ một cách an toàn.
- Sự cải thiện tốc độ gấp 18 lần là kết quả của việc chấp nhận các ràng buộc khó khăn hơn và áp dụng những lớp tối ưu hóa tinh vi trên nền tảng bảo mật vững chắc.


## [The Anatomy of an AI-Native Org](https://ajeygore.in/content/the-anatomy-of-an-ai-native-org)

Bài viết thảo luận về sự thay đổi cấu trúc tổ chức trong kỷ nguyên AI. Trước đây, quy trình phát triển phần mềm thường đi từ "Tại sao" (kinh doanh), "Cái gì" (sản phẩm), đến "Như thế nào" (kỹ thuật), trong đó các kỹ sư chủ yếu đóng vai trò "phiên dịch" yêu cầu thành mã nguồn. Hiện nay, AI đang đảm nhận xuất sắc khâu "phiên dịch" này. Do đó, hình hài của một tổ chức "AI-Native" sẽ thay đổi đáng kể: nhóm quyết định "Tại sao" vẫn nhỏ gọn; nhóm xác định "Cái gì" sẽ phình to (đòi hỏi những người có tư duy thẩm mỹ và đánh giá tốt để hướng dẫn AI); nhóm làm "Như thế nào" sẽ thu hẹp lại nhưng tập trung giải quyết những bài toán hóc búa nhất (kiến trúc, bảo mật, thiết kế hệ thống kiểm thử cho AI). Các quản lý cấp trung chỉ làm nhiệm vụ điều phối đơn thuần sẽ dần biến mất, nhường chỗ cho những người trực tiếp "nhúng tay" vào công việc.

**Điểm chính:**
- AI đang thay thế lớp "phiên dịch" trung gian (chuyển đổi yêu cầu thành code), làm thay đổi cấu trúc nhân sự truyền thống.
- Nhóm thiết kế trải nghiệm và xác định "Cái gì" sẽ phát triển mạnh, trong khi nhóm thực thi "Như thế nào" sẽ thu hẹp nhưng yêu cầu trình độ chuyên môn rất sâu.
- Kỹ sư không nên cạnh tranh với AI trong việc viết code thông thường; hãy hướng tới tư duy đánh giá, thiết kế hệ thống và làm chủ kết quả đầu ra.

## [How to Stay Resilient in a Difficult Job](https://andiroberts.com/executive-coaching/how-to-stay-resilient-in-a-difficult-job)

Bài viết cung cấp 7 chiến lược thực tế dựa trên khoa học để duy trì sự kiên cường và sức khỏe tinh thần trong một môi trường làm việc đầy khó khăn (quản lý kém, làm theo ca bất thường, căng thẳng triền miên). Tác giả nhấn mạnh rằng sự kiên cường ở đây không phải là gượng ép bản thân phải tích cực, mà là việc bảo toàn năng lượng, duy trì góc nhìn khách quan và giữ lấy cảm giác kiểm soát. Mục tiêu cuối cùng không phải là đánh lừa bản thân rằng công việc đó thú vị, mà là giữ vững tâm lý để có thể hoạt động tốt, bảo vệ sức khỏe bản thân và luôn duy trì sự chủ động cho những lựa chọn tương lai.

**Điểm chính:**
- Thiết lập tâm lý vững vàng ngay từ đầu ngày và ổn định thể trạng bằng ánh sáng, nước và vận động trước giờ làm.
- Tập trung vào những yếu tố bạn có thể kiểm soát và giữ vững tiêu chuẩn làm việc cá nhân bất chấp sự lỏng lẻo của hệ thống.
- Bảo vệ ranh giới cảm xúc để không mang áp lực về nhà, tìm kiếm ít nhất một đồng nghiệp đáng tin cậy để chia sẻ, và luôn hướng tới những bước tiến nhỏ cho một công việc tốt hơn.

## [What's Easy Now? What's Hard Now?](https://brooker.co.za/blog/2026/05/18/whats-easy-whats-hard.html)

Bài viết khám phá năng lực của các công cụ lập trình AI (coding agents) trong tương lai thông qua "giả thuyết vòng lặp phản hồi" (feedback loop hypothesis). Tác giả lập luận rằng AI sẽ thấy những tác vụ có vòng lặp phản hồi rõ ràng, đo lường được là "dễ", và ngược lại là "khó". Điều này dẫn đến một kết luận khá ngược đời: xây dựng các giao diện web (SaaS/UI) có thể sẽ "khó" hơn đối với AI trong dài hạn, vì chúng đòi hỏi sự đánh giá mang tính cảm quan và chậm chạp từ con người. Trong khi đó, việc lập trình phần mềm hệ thống (như cơ sở dữ liệu) lại "dễ" hơn vì chúng có thể được tự động kiểm chứng tính đúng đắn bằng các công cụ (như trình biên dịch Rust, công cụ kiểm thử, phân tích đặc tả). Do đó, tương lai của phát triển phần mềm chính là xây dựng các bộ đặc tả rõ ràng và các công cụ phản hồi tự động.

**Điểm chính:**
- Năng lực dài hạn của các công cụ AI phụ thuộc vào chất lượng của vòng lặp phản hồi (feedback loop) mà chúng nhận được.
- Việc phát triển phần mềm hệ thống có thể sẽ dễ dàng hơn đối với AI so với phát triển ứng dụng SaaS, nhờ vào khả năng kiểm chứng tự động không cần con người.
- Vai trò của lập trình viên sẽ chuyển dịch mạnh mẽ sang việc thiết kế các đặc tả hệ thống (specification) và xây dựng các công cụ đánh giá/phản hồi cho AI.

## [Making User-Sequence Data More Cost-Efficient, Faster, and Easier to Use](https://medium.com/pinterest-engineering/making-user-sequence-data-more-cost-efficient-faster-and-easier-to-use-2a56a928cae1)

Bài viết chia sẻ cách Pinterest tái thiết kế nền tảng dữ liệu chuỗi hành vi người dùng (user sequence) phục vụ cho các mô hình Machine Learning (xếp hạng, đề xuất). Trước đây, việc xử lý chuỗi hành vi đòi hỏi dữ liệu vừa phải cập nhật liên tục cho hệ thống online, vừa phải đầy đủ, chính xác cho việc huấn luyện offline, dễ dẫn đến sự thiếu đồng bộ giữa hai môi trường. Để giải quyết, Pinterest áp dụng nguyên tắc "Một định nghĩa, Nhiều môi trường chạy" (One Definition, Many Runtimes) kết hợp kiến trúc Lambda. Họ sử dụng một công cụ thực thi dùng chung (shared execution engine) cho cả luồng thời gian thực (streaming) và định kỳ (batch), giúp loại bỏ sự sai lệch dữ liệu. Ngoài ra, việc chuyển sang định dạng lưu trữ dạng cột (columnar) và phân mảnh theo thời gian giúp giảm đáng kể chi phí lưu trữ, băng thông mạng, đồng thời tăng tốc độ thêm mới tính năng.

**Điểm chính:**
- Tái thiết kế hệ thống xử lý chuỗi dữ liệu người dùng nhằm tối ưu chi phí hạ tầng và tăng tốc độ phát triển mô hình ML tại Pinterest.
- Áp dụng nguyên tắc "Một định nghĩa, Nhiều môi trường chạy" và kiến trúc Lambda để duy trì sự nhất quán giữa dữ liệu huấn luyện offline và suy luận online.
- Chuyển đổi sang lưu trữ dạng cột (columnar storage) giúp giảm thiểu tình trạng quá tải I/O và cho phép truy vấn chọn lọc linh hoạt hơn.
