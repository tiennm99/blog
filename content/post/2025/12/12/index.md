---
title: "Newsletter #69"
date: 2025-12-12
tags: ["AI-Assisted"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #69. Bài viết này được thực hiện bởi [Claude Code](https://github.com/anthropics/claude-code), [Claude Code Router](https://github.com/musistudio/claude-code-router), [iFlow Open Platform](https://platform.iflow.cn) & GLM-4.6*

## [Netflix Xây Dựng Đồ Thị Phân Phân Phối Thời Gian Thực (Phần 1)](https://netflixtechblog.com/how-and-why-netflix-built-a-real-time-distributed-graph-part-1-ingesting-and-processing-data-80113e124acc)

Netflix phát triển hệ thống Đồ Thị Phân Phối Thời gian Thực (RDG) để giải quyết vấn đề dữ liệu phân mảnh từ kiến trúc microservices. Hệ thống xử lý khoảng 1 triệu tin nhắn mỗi giây từ Kafka, chuyển đổi thành các nút và cạnh đồ thị bằng Apache Flink. RDG giúp kết nối các hoạt động người dùng trên nhiều thiết bị và dịch vụ (video, game, quảng cáo) trong thời gian thực, cho phép phân tích mối quan hệ phức tạp mà không cần truy vấn JOIN tốn kém.

**Điểm chính:**
- Xử lý 1 triệu messages/giây từ Kafka stream
- Sử dụng Apache Flink để transform dữ liệu thành graph
- Kết nối activities trên multiple devices và services
- Tránh expensive JOIN queries trong distributed systems
- Hỗ trợ real-time analysis cho user behavior patterns

## [Bắt Nhỏ Vươn Lớn: Giá Trị Thực Sự Của Kiến Trúc Tăng Dần](https://newsletter.optimistengineer.com/p/incremental-architecture-what-you)

Kiến trúc tăng dần (incremental architecture) là một phương pháp tiếp cận giúp hệ thống phát triển và tiến hóa một cách linh hoạt. Trọng tâm của phương pháp này là tổ chức đội ngũ cross-functional với quyền sở hữu domain rõ ràng, thay vì chỉ tập trung vào công nghệ. Vai trò của architect không phải là áp đặt diagram, mà là đào tạo và duy trì sự nhất quán trong toàn bộ hệ thống. Thay vì hỏi "mất bao lâu để hoàn thành", chúng ta nên chuyển sang câu hỏi "có thể làm cho nó nhỏ hơn được không?". Vòng lặp build-ship-feedback-adjust-repeat giúp liên tục cải tiến, với các pattern như layered, hexagonal, và distributed architecture được áp dụng khi giải quyết vấn đề thực tế. Component architecture với ranh giới rõ ràng cho phép trích xuất microservice dễ dàng, trong khi event-driven architecture giảm coupling thông qua event emitters. Domain-driven design với ubiquitous language giúp tăng tốc độ thay đổi.

**Điểm chính:**
- Ưu tiên tổ chức team hơn là công nghệ
- Cross-functional teams với domain ownership
- Architect vai trò là teaching và maintaining coherence
- Build-ship-feedback-adjust-repeat loop cho continuous improvement
- Component architecture với hard boundaries
- Event-driven architecture giảm coupling
- Domain-driven design với ubiquitous language

## [Java Interview Question - Why Collection doesn't extend Cloneable and Serializable interfaces?](https://javabulletin.substack.com/p/java-interview-question-why-collection)

Java có thiết kế cẩn thận khi không để Collection interface kế thừa từ Cloneable và Serializable. Lý do chính là vì không phải tất cả collections đều có thể clone hoặc serialize một cách có ý nghĩa. Ví dụ, Collections.unmodifiableList() không thể được clone vì nó chỉ là một wrapper. Một số collections chứa dữ liệu không serializable hoặc các items không hỗ trợ serialization. Cả hai interface này đều được coi là design flaws ngày nay vì chúng là marker interfaces mà không định nghĩa behavior rõ ràng. Thay vào đó, các lớp collection cụ thể sẽ tự quyết định implement các interface này chỉ khi thực sự phù hợp, giúp maintain tính linh hoạt và clean design cho framework.

**Điểm chính:**
- Không phải tất cả collections đều có thể clone/serialize có ý nghĩa
- Unmodifiable collections không thể clone được
- Collections có thể chứa non-serializable items
- Cloneable và Serializable là marker interfaces bị coi là design flaws
- Individual collection classes tự quyết định implement khi phù hợp

## [We stopped roadmap work for a week and fixed 189 bugs](https://lalitm.com/fixits-are-good-for-the-soul/)

Fixit Weeks là các đợt bug fixing định kỳ hàng quý, nơi toàn bộ đội ngũ tạm dừng công việc theo roadmap để tập trung sửa lỗi. Trong một tuần, 40 kỹ sư đã sửa thành công 189 bugs với giới hạn tối đa 2 ngày cho mỗi bug để tránh scope creep. Chương trình áp dụng gamification với điểm số, bảng xếp hạng và áo thun để tạo động lực. Việc này không chỉ cải thiện sản phẩm mà còn mang lại cảm giác thành tựu cho developer - thấy bug, sửa nó, và ship ngay lập tức. Sự chuẩn bị kỹ lưỡng với việc tag và phân loại bugs quanh năm là yếu tố quan trọng. Công cụ AI đã giúp giảm thiểu vấn đề context switching, cho phép developer chuyển đổi giữa tasks mượt mà hơn. Một feature request tồn tại 4 năm đã được giải quyết chỉ trong một ngày, cho thấy sức mạnh của sự tập trung tập thể.

## [The Math of Why You Can't Focus at Work](https://justoffbyone.com/posts/math-of-why-you-cant-focus-at-work/)

Năng suất làm việc được quyết định bởi ba tham số toán học: λ (số lần gián đoạn mỗi giờ), Δ (thời gian phục hồi sau gián đoạn tính bằng phút), và θ (kích thước tối thiểu của một khối tập trung cần thiết cho công việc có ý nghĩa). Nghiên cứu cho thấy nhân viên đối mặt với gián đoạn mỗi 2-3 phút và cần 10-16 phút để phục hồi lại sự tập trung. Deep work yêu cầu các khối thời gian không bị gián đoạn; thời gian bị phân mảnh không thể tích lũy hiệu quả. Sự thay đổi nhỏ trong các tham số có thể tác động mạnh mẽ đến năng suất: việc giảm λ từ 3 xuống 2 (chỉ một lần gián đoạn ít hơn mỗi giờ) có thể thay đổi cả tuần làm việc của bạn.

**Điểm chính:**
- Productivity được quyết định bởi 3 tham số: λ (gián đoạn/giờ), Δ (thời gian phục hồi), θ (kích thước khối focus tối thiểu)
- Worker bị gián đoạn mỗi 2-3 phút, cần 10-16 phút để recover
- Deep work cần uninterrupted blocks, fragmented time không hiệu quả
- Giảm chỉ 1 interruption/giờ có thể transform năng suất cả tuần
- Giải pháp: giảm λ (protect calendar), match θ với environment (break tasks), giảm Δ (context breadcrumbs)

## [Tech predictions for 2026 and beyond](https://www.allthingsdistributed.com/2025/11/tech-predictions-for-2026-and-beyond.html)

Bài viết này đưa ra năm dự báo công nghệ quan trọng cho 2026 và tương lai. Đầu tiên là cuộc cách mạng đồng hành (companionship revolution) khi AI vật lý sẽ chống lại đại dịch cô đơn toàn cầu, với nghiên cứu cho thấy 95% tương tác có lợi cho bệnh nhân dementia. Thứ hai, thế hệ "renaissance developer" sẽ kết hợp sáng tạo, tư duy hệ thống và chuyên môn domain khi AI xử lý các tác vụ lập trình thường ngày. Thứ ba, bảo mật an toàn lượng tử (quantum-safe security) trở nên cấp bách khi mã hóa RSA 2048-bit có thể bị phá vỡ trong 5 năm. Thứ tư, công nghệ quốc phòng sẽ được ứng dụng dân dụng trong 2 năm thay vì hàng thập kỷ. Cuối cùng, học tập cá nhân hóa với AI将成为 phổ biến với chi phí chỉ 4$/tháng, giúp giáo viên tập trung vào việc giảng dạy.

**Điểm chính:**
- AI vật lý chống lại cô đơn, 95% tương tác có lợi cho bệnh nhân dementia
- Renaissance developer kết hợp creativity, systems thinking và domain expertise
- RSA 2048-bit có thể bị phá vỡ trong 5 năm bởi quantum computing
- Công nghệ quốc phòng ứng dụng dân dụng trong 2 năm thay vì hàng thập kỷ
- AI tutoring cá nhân hóa với chi phí 4$/tháng

## [Why I (still) love Linux](https://it-notes.dragas.net/2025/11/24/why-i-still-love-linux/)

Tác giả chia sẻ hành trình 30 năm với Linux, bắt đầu từ năm 1996 khi Linux mang lại cảm giác tự do tuyệt đối với command line và sức mạnh của Unix. Dù hiện tác giả ưa thích BSD và illumos hơn vì triết lý thiết kế, ông vẫn yêu Linux vì nó là dự án Open Source đầu tiên thành công toàn cầu và đã trở thành nền tảng cho vô số thiết bị từ smartphone đến xe hơi. Linux đã dạy ông tư duy out-of-the-box và mang lại cơ hội nghề nghiệp. Dù có những vấn đề hiện đại như systemd đi chệch khỏi triết lý Unix "do one thing and do it well", hay áp lực từ các công ty định hướng phát triển, Linux vẫn là người bạn đồng hành đáng tin cậy, với hardware support tốt hơn và các distribution như Alpine, openSUSE vẫn giữ được tính minimalism.

**Điểm chính:**
- Linux mang lại cảm giác tự do với command line và Unix philosophy từ năm 1996
- Dù không phải lựa chọn đầu tiên, Linux vẫn quan trọng vì thành công toàn cầu và ubiquity
- Vấn đề hiện đại: systemd, "move fast and break things", mất đi Unix philosophy
- Hardware support cải thiện vượt trội, hiếm khi gặp incompatible hardware
- Các distribution như Alpine, openSUSE vẫn giữ được triết lý minimalism và stability
- Linux đã là người bạn đồng hành 30 năm và sẽ tiếp tục trong tương lai

## [Why (Senior) Engineers Struggle to Build AI Agents](https://www.philschmid.de/why-engineers-struggle-building-agents)

Bài viết phân tích tại sao các kỹ sư senior lại gặp khó khăn khi xây dựng AI agents so với junior engineers. Vấn đề cốt lõi là software engineering truyền thống mang tính xác định (deterministic), trong khi AI agents hoạt động theo xác suất (probabilistic). Junior engineers thường ship agents nhanh hơn vì họ tin tưởng vào model hơn, trong khi senior engineers cố gắng "code away" bản chất xác suất của model. Bài viết giới thiệu 5 thách thức chính: (1) Text là trạng thái mới - cần bảo toàn context ngôn ngữ tự nhiên thay vì ép vào cấu trúc binary, (2) Giao quyền kiểm soát - tin tưởng agents điều hướng conversation flows thay vì hard-code paths, (3) Lỗi chỉ là inputs - feed errors lại cho agents để recovery thay vì crash, (4) Từ unit tests đến evals - đánh giá reliability và quality thay vì correctness binary, và (5) Agents tiến hóa, APIs không - thiết kế semantic typing "idiot-proof" cho các agents literalist.

**Điểm chính:**
- Software engineering deterministic vs AI agents probabilistic
- Junior engineers ship nhanh hơn vì trust model hơn
- Senior engineers cố gắng "code away" probabilistic nature
- 5 thách thức: Text as state, Hand over control, Errors as inputs, Unit tests to evals, Agents evolve
- Engineers cần trade certainty cho semantic flexibility

## [How Java Achieves Zero-Copy File Transfer](https://javabulletin.substack.com/p/how-java-achieves-zero-copy-file)

Zero-copy là kỹ thuật truyền file từ đĩa đến network socket mà giảm thiểu việc sao chép trong user-space và giảm tải CPU. Thay vì phương pháp truyền thống phải copy dữ liệu qua nhiều lớp (Disk → Kernel → User Buffer → Java Heap), zero-copy cho phép OS di chuyển dữ liệu trực tiếp giữa các kernel buffer. Điều này giảm đáng kể số lần context switch và áp lực lên băng thông bộ nhớ. Java cung cấp ba cách triển khai chính: FileChannel.transferTo/transferFrom() sử dụng syscall sendFile, memory-mapped files với MappedByteBuffer, và Netty's DefaultFileRegion cho high-performance servers. Kỹ thuật này đặc biệt hữu ích cho việc truyền file lớn, các server I/O-heavy, và giúp giảm áp lực garbage collection. Tuy nhiên, zero-copy không hoạt động với TLS/HTTPS vì encryption cần truy cập user-space, và không hiệu quả với các file nhỏ do overhead của syscall.

**Điểm chính:**
- Zero-copy giảm user-space copies và CPU overhead
- Data flow trực tiếp: file → kernel page cache → socket buffer → NIC
- Java implementations: FileChannel.transferTo, MappedByteBuffer, Netty DefaultFileRegion
- Lợi ích: lower CPU usage, higher throughput, giảm GC pressure
- Limitations: không hoạt động với TLS/HTTPS, không hiệu quả với small files

### Bonus

**Images:**
![Top Strategies to Build High Availability Systems](https://substack-post-media.s3.amazonaws.com/public/images/20ed383c-5900-4f31-9041-afb5581b1ad4_2250x2624.png)
![Cloudflare vs. AWS vs. Azure](https://substackcdn.com/image/fetch/$s_!Eyti!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F862d0649-d77b-410f-95a5-6505c9eeb15a_2250x2814.png)
![Popular Backend Tech Stack](https://substackcdn.com/image/fetch/$s_!52bX!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F65613a28-2320-4bb6-a610-5ab96b13240d_800x903.jpeg)
![HTTP vs. HTTPS](https://substackcdn.com/image/fetch/$s_!JV_9!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa95473e0-5a68-43c6-841e-540a6b198d6d_2360x2960.png)
![Forward Proxy versus Reverse Proxy](https://substackcdn.com/image/fetch/$s_!5rGo!,w_550,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fac99f98d-49a7-4933-b06f-8da0901d210e_800x939.gif)
![Things Every Developer Should Know: Concurrency is NOT parallelism](https://substackcdn.com/image/fetch/$s_!qtkE!,w_550,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F4646c2e2-a6fb-44e7-a091-73fcbd8fa498_800x1040.gif)
