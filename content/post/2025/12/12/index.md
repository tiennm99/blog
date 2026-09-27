---
title: "Newsletter #69"
date: 2025-12-12
tags: ["AI-Assisted", "Newsletter", "Software Architecture", "Java", "Linux", "AI Agents", "Productivity"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #69. ~~Bài viết này được thực hiện bởi [Claude Code](https://github.com/anthropics/claude-code), [Claude Code Router](https://github.com/musistudio/claude-code-router), [iFlow Open Platform](https://platform.iflow.cn) & GLM-4.6~~*

## [Netflix Xây Dựng Đồ Thị Phân Phân Phối Thời Gian Thực (Phần 1)](https://netflixtechblog.com/how-and-why-netflix-built-a-real-time-distributed-graph-part-1-ingesting-and-processing-data-80113e124acc)

Khi Netflix mở rộng từ xem video theo yêu cầu sang gói có quảng cáo, sự kiện trực tiếp và trò chơi di động, việc hiểu hành trình của một thành viên trên nhiều thiết bị và nhiều mảng kinh doanh trở nên rất khó. Kiến trúc microservices với hàng trăm dịch vụ, mỗi dịch vụ tự quản lý dữ liệu riêng, khiến dữ liệu bị phân mảnh và các nhóm phân tích phải ghép nối thủ công. Vì vậy, đội kỹ sư dữ liệu xây dựng Real-Time Distributed Graph (RDG): biểu diễn dữ liệu dưới dạng đồ thị để truy vấn theo quan hệ bằng các bước "nhảy" giữa nút và cạnh thay vì những phép JOIN tốn kém, dễ mở rộng khi xuất hiện thực thể mới và thuận lợi cho việc phát hiện mẫu hay bất thường.

Phần 1 tập trung vào tầng tiếp nhận và xử lý. Hành động của người dùng đi qua API Gateway vào các topic Kafka (mỗi topic lên tới khoảng 1 triệu tin nhắn mỗi giây, mã hóa Avro, đồng thời lưu vào bảng Iceberg để nạp lại dữ liệu cũ). Các job Apache Flink lọc nhiễu, bổ sung siêu dữ liệu, chuyển sự kiện thành nút và cạnh, rồi gom và loại bỏ các cập nhật trùng lặp trong một cửa sổ thời gian ngắn trước khi ghi hơn 5 triệu bản ghi mỗi giây sang Data Mesh. Bài học đáng chú ý: một job Flink duy nhất cho mọi topic rất khó tinh chỉnh, nên nhóm chuyển sang mô hình mỗi topic Kafka một job riêng, chấp nhận thêm chi phí vận hành để đổi lấy sự ổn định và khả năng điều chỉnh độc lập.

## [Bắt Nhỏ Vươn Lớn: Giá Trị Thực Sự Của Kiến Trúc Tăng Dần](https://newsletter.optimistengineer.com/p/incremental-architecture-what-you)

Kiến trúc tăng dần là cách thiết kế để hệ thống dễ tiến hóa, dựa trên nhận định rằng bắt đầu bằng một hệ thống phức tạp thì sẽ kết thúc với một hệ thống phức tạp không chạy được. Theo tác giả, tổ chức đội ngũ quan trọng hơn công nghệ: các nhóm đa chức năng sở hữu trọn vẹn một miền nghiệp vụ hiệu quả hơn cấu trúc chia theo tầng, và muốn có microservices thì trước hết phải có các nhóm độc lập. Kiến trúc sư đóng vai trò người thầy, trực tiếp viết mã và giữ sự nhất quán cho hệ thống thay vì chỉ ra chỉ thị; kiến thức nên được lan tỏa qua lập trình cặp và lập trình nhóm. Thay vì hỏi "mất bao lâu?", hãy hỏi "có thể làm nhỏ hơn không?".

Về kỹ thuật, bài viết khuyên chỉ áp dụng mẫu kiến trúc khi thực sự gặp vấn đề cần giải quyết, dùng mẫu Strangler để tách dần các mô-đun sạch hơn ra khỏi hệ thống cũ, và xây dựng các thành phần nhỏ, một trách nhiệm, ranh giới cứng, có thể thay thế — chính là ứng viên cho microservice sau này. Kiến trúc hướng sự kiện giúp giảm phụ thuộc khi các thành phần phát ra sự kiện thay vì điều phối tập trung, còn Domain-Driven Design với ngôn ngữ chung giúp làm rõ sự kiện, hệ quả và tác nhân trước khi bắt tay vào viết mã.

## [Java Interview Question - Why Collection doesn't extend Cloneable and Serializable interfaces?](https://javabulletin.substack.com/p/java-interview-question-why-collection)

Câu hỏi phỏng vấn này xoay quanh một quyết định thiết kế của Java: interface `Collection` không kế thừa `Cloneable` và `Serializable`, vì không phải tập hợp nào cũng có thể hoặc nên được sao chép hay tuần tự hóa. Ép buộc hai interface này ở tầng gốc sẽ đặt ra ràng buộc phi thực tế cho nhiều cài đặt. Bài viết đưa ví dụ: `Collections.unmodifiableList()` chỉ là một khung nhìn nên sao chép sâu sẽ phá vỡ ngữ nghĩa của nó, `WeakHashMap` dùng tham chiếu yếu không tương thích với tuần tự hóa, `TreeMap` có thể chứa comparator không tuần tự hóa được, còn `ConcurrentSkipListMap` có cơ chế đồng bộ phức tạp.

Ngoài ra, cả hai đều là marker interface có nhiều khiếm khuyết: `Cloneable` không khai báo phương thức nào và dễ dẫn đến lỗi sao chép nông, còn `Serializable` gây khó khăn khi thay đổi phiên bản và tiềm ẩn rủi ro bảo mật. Khi giới thiệu Collections Framework ở Java 1.2, các nhà thiết kế để từng lớp cụ thể tự chọn cài đặt khi phù hợp, giữ API gọn gàng. Ngày nay, nên sao chép bằng hàm khởi tạo như `new ArrayList<>(list)` hoặc `List.copyOf()`, và dùng các định dạng như JSON thay cho tuần tự hóa mặc định.

## [We stopped roadmap work for a week and fixed 189 bugs](https://lalitm.com/fixits-are-good-for-the-soul/)

Tác giả kể về "Fixit Week" — tuần sửa lỗi định kỳ mỗi quý, khi cả nhóm khoảng 45 kỹ sư tạm dừng công việc theo lộ trình. Trong một tuần, 40 kỹ sư ở hai múi giờ đã sửa 189 lỗi, trung bình mỗi người 4 lỗi, nhiều nhất 12 lỗi. Quy tắc rất rõ ràng: không lỗi nào được mất quá 2 ngày, chỉ tập trung vào các vấn đề nhỏ của người dùng cuối hoặc cải thiện năng suất cho lập trình viên, và không họp, không thiết kế, không làm việc theo lộ trình. Hoạt động được "trò chơi hóa" với điểm số theo độ lớn công việc, bảng xếp hạng, cập nhật hằng ngày và áo thun cho các thành tích như "lỗi đầu tiên" hay "lỗi khó chịu nhất".

Kết quả nổi bật gồm một yêu cầu tính năng tồn tại 4 năm được giải quyết trong một ngày, và một GitHub Action chỉ 25 dòng giúp lập trình viên giao diện bớt nhiều thao tác mỗi ngày. Yếu tố thành công là chuẩn bị trước bằng cách gắn nhãn và ước lượng lỗi, có đủ số người tham gia để tạo không khí, không gắn điểm số với đánh giá hiệu suất, và dùng công cụ AI để giảm gánh nặng chuyển đổi ngữ cảnh. Theo tác giả, Fixit mang lại cảm giác tự hào về tay nghề, niềm vui khi thấy thay đổi được phát hành ngay và tinh thần đồng đội.

## [The Math of Why You Can't Focus at Work](https://justoffbyone.com/posts/math-of-why-you-cant-focus-at-work/)

Bài viết mô hình hóa năng suất bằng ba tham số: λ là số lần bị gián đoạn mỗi giờ (mô phỏng như một quá trình Poisson), Δ là số phút cần để lấy lại tập trung sau mỗi lần gián đoạn, và θ là khối thời gian liền mạch tối thiểu để làm được việc có ý nghĩa (thường 30–60 phút với công việc phức tạp). Năng lực làm việc được tính bằng số khối θ lọt vừa trong các khoảng tập trung, nên cùng một tổng thời gian nhưng bị chia vụn thì cho kết quả kém hơn rất nhiều so với thời gian liền mạch. Các nghiên cứu được dẫn cho thấy người đi làm bị gián đoạn khoảng mỗi 2–3 phút và cần 10–16 phút để phục hồi.

Với điều kiện phổ biến ở nơi làm việc hiện nay, về mặt toán học gần như không còn chỗ cho làm việc sâu, và chỉ một thay đổi nhỏ ở tham số cũng tạo khác biệt lớn. Tác giả đề xuất ba đòn bẩy: giảm λ bằng cách đặt ranh giới giao tiếp và bảo vệ lịch làm việc, điều chỉnh θ cho phù hợp với môi trường bằng cách chia nhỏ nhiệm vụ, và giảm Δ bằng cách quản lý ngữ cảnh tốt hơn, chẳng hạn ghi lại dấu vết công việc để quay lại nhanh.

## [Tech predictions for 2026 and beyond](https://www.allthingsdistributed.com/2025/11/tech-predictions-for-2026-and-beyond.html)

Werner Vogels đưa ra năm dự báo công nghệ cho năm 2026 và xa hơn. Thứ nhất, AI vật lý sẽ định nghĩa lại sự đồng hành cho những người cần nhất: cô đơn ảnh hưởng tới 1/6 dân số thế giới và làm tăng 32% nguy cơ tử vong, trong khi nghiên cứu với robot Paro cho thấy 95% người mắc chứng mất trí nhớ có tương tác tích cực. Thứ hai là thời kỳ của "renaissance developer": AI tạo sinh nâng tầm chứ không thay thế lập trình viên, giống như trình biên dịch hay điện toán đám mây từng làm, vì con người vẫn hiểu ràng buộc kinh doanh, nhu cầu khách hàng và tư duy hệ thống. Thứ ba, bảo mật an toàn lượng tử trở thành bắt buộc khi ước tính số qubit cần để phá RSA 2048-bit đã giảm xuống dưới một triệu, và trong khoảng năm năm máy tính lượng tử có thể phá vỡ RSA lẫn mã hóa đường cong elliptic.

Thứ tư, công nghệ quốc phòng được thiết kế lưỡng dụng ngay từ đầu nên chuyển sang ứng dụng dân sự nhanh hơn nhiều so với 10–20 năm trước đây, với những công ty như Anduril đạt doanh thu 1 tỷ đô la năm 2024. Cuối cùng, học tập cá nhân hóa bằng AI sẽ phổ biến: gia sư AI chỉ tốn khoảng 4 đô la mỗi tháng, Khanmigo tiếp cận 1,4 triệu học sinh ngay năm đầu, và giáo viên dùng công cụ AI tiết kiệm khoảng 5,9 giờ mỗi tuần để dành cho việc dạy học.

## [Why I (still) love Linux](https://it-notes.dragas.net/2025/11/24/why-i-still-love-linux/)

Stefano Marinelli kể về gần 30 năm gắn bó với Linux, bắt đầu từ năm 1996 sau thời DOS và Commodore 64, khi Linux là lần đầu ông thực sự chạm tới Unix và cảm nhận sự tự do mà các hệ điều hành trước chưa mang lại. Đến năm 1998 ông đã tích cực tham gia cộng đồng với vai trò diễn giả và người dịch. Dù "năm của Linux trên máy tính để bàn" chưa bao giờ đến, Linux đã thành công trên điện thoại thông qua Android, trên máy chủ và thiết bị nhúng; Ubuntu góp phần đưa Linux đến máy tính cá nhân và thu hút doanh nghiệp tham gia mã nguồn mở.

Tác giả cũng thẳng thắn phê bình: nhiều bản phân phối xa rời triết lý Unix "làm một việc và làm tốt việc đó", tiêu biểu là systemd; đổi mới thiếu mục đích khiến sự ổn định bị hy sinh; một số công ty hướng sự phát triển theo lợi ích riêng; và chất lượng phần mềm giảm sút do "vibe coding" cùng các phụ thuộc thiếu ổn định. Dù ưa chuộng BSD và illumos cho nhiều khối lượng công việc, ông vẫn quý các bản phân phối như Alpine và openSUSE, ghi nhận khả năng hỗ trợ phần cứng đã tốt hơn nhiều, biết ơn Linux vì đã mở ra sự nghiệp và việc học của mình, và tin rằng sẽ còn đồng hành cùng Linux thêm 30 năm nữa.

## [Why (Senior) Engineers Struggle to Build AI Agents](https://www.philschmid.de/why-engineers-struggle-building-agents)

Bài viết lý giải vì sao kỹ sư giàu kinh nghiệm lại thường xây dựng AI agent chậm hơn kỹ sư mới vào nghề: kỹ thuật phần mềm truyền thống mang tính tất định, còn agent dựa trên mô hình ngôn ngữ vốn mang tính xác suất. Kỹ sư mới tin tưởng mô hình hơn nên phát hành nhanh, trong khi kỹ sư lâu năm cố "viết mã để loại bỏ" tính xác suất ấy. Tác giả nêu năm thách thức. Một, văn bản là trạng thái mới: một nhận xét như "kế hoạch ổn nhưng tập trung vào thị trường Mỹ" cần được giữ nguyên dạng ngôn ngữ tự nhiên thay vì ép vào lược đồ cứng. Hai, trao quyền kiểm soát: để mô hình điều hướng các luồng hội thoại khó lường, ví dụ người dùng muốn hủy gói rồi đổi ý khi nghe ưu đãi, thay vì mã hóa cứng mọi nhánh.

Ba, lỗi chỉ là đầu vào: bắt lỗi và đưa ngược lại cho agent làm ngữ cảnh để tự khắc phục thay vì dừng chương trình giữa chừng. Bốn, từ kiểm thử đơn vị sang đánh giá (eval): không thể kiểm thử agent bằng khẳng định đúng/sai, mà cần đo độ tin cậy, chất lượng đầu ra do mô hình chấm và theo dõi các bước suy luận trung gian. Năm, agent thay đổi còn API thì không: agent hiểu theo nghĩa đen nên API cần mô tả rõ ràng và đặt tên tường minh, chẳng hạn `user_email_address` thay vì `email`, để tránh ảo giác. Tóm lại, kỹ sư cần đánh đổi một phần sự chắc chắn để lấy sự linh hoạt về ngữ nghĩa.

## [How Java Achieves Zero-Copy File Transfer](https://javabulletin.substack.com/p/how-java-achieves-zero-copy-file)

Zero-copy là kỹ thuật truyền tệp từ đĩa ra socket mạng mà không phải sao chép dữ liệu qua bộ nhớ của JVM. Cách truyền thống đọc dữ liệu từ đĩa vào bộ đệm nhân, chép lên bộ đệm ở không gian người dùng rồi lại chép xuống để gửi đi; zero-copy để hệ điều hành chuyển dữ liệu trực tiếp giữa các bộ đệm trong nhân (từ page cache sang bộ đệm socket rồi tới card mạng), nhờ đó giảm tải CPU, giảm số lần chuyển ngữ cảnh, tăng thông lượng và giảm áp lực thu gom rác do bớt cấp phát mảng byte tạm.

Java cung cấp ba cách chính. `FileChannel.transferTo()`/`transferFrom()` gọi xuống lời gọi hệ thống `sendfile` trên các nền tảng hỗ trợ và là cách đơn giản nhất. `MappedByteBuffer` ánh xạ các trang của tệp vào không gian địa chỉ của JVM, hỗ trợ chế độ chỉ đọc, đọc-ghi và sao-chép-khi-ghi. Với máy chủ hiệu năng cao, `DefaultFileRegion` của Netty tận dụng khả năng zero-copy của tầng truyền tải gốc. Tuy nhiên, kỹ thuật này có giới hạn: TLS/HTTPS phá vỡ zero-copy vì việc mã hóa cần truy cập dữ liệu ở không gian người dùng, tệp nhỏ có thể không đáng vì chi phí lời gọi hệ thống, và các thao tác biến đổi dữ liệu như nén cũng không áp dụng được.

### Bonus

**Images:**
![Top Strategies to Build High Availability Systems](https://substack-post-media.s3.amazonaws.com/public/images/20ed383c-5900-4f31-9041-afb5581b1ad4_2250x2624.png)
![Cloudflare vs. AWS vs. Azure](https://substackcdn.com/image/fetch/$s_!Eyti!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F862d0649-d77b-410f-95a5-6505c9eeb15a_2250x2814.png)
![Popular Backend Tech Stack](https://substackcdn.com/image/fetch/$s_!52bX!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F65613a28-2320-4bb6-a610-5ab96b13240d_800x903.jpeg)
![HTTP vs. HTTPS](https://substackcdn.com/image/fetch/$s_!JV_9!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa95473e0-5a68-43c6-841e-540a6b198d6d_2360x2960.png)
![Forward Proxy versus Reverse Proxy](https://substackcdn.com/image/fetch/$s_!5rGo!,w_550,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fac99f98d-49a7-4933-b06f-8da0901d210e_800x939.gif)
![Things Every Developer Should Know: Concurrency is NOT parallelism](https://substackcdn.com/image/fetch/$s_!qtkE!,w_550,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F4646c2e2-a6fb-44e7-a091-73fcbd8fa498_800x1040.gif)

---

*Bài viết đã được viết lại bởi Claude Code với Opus 5.5 vào ngày 27/09/2026.*
