---
title: "Newsletter #81"
date: 2026-02-18
tags: ["AI-Assisted"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #81.*

## [Những thách thức của soft delete](https://atlas9.dev/blog/soft-delete.html)

Bài viết này phân tích các vấn đề thường gặp khi triển khai soft delete (xóa mềm) trong cơ sở dữ liệu, đặc biệt là khi sử dụng cột `archived_at`. Tác giả chia sẻ kinh nghiệm thực tế về việc cách tiếp cận này có vẻ đơn giản ban đầu nhưng lại tạo ra nhiều phức tạp theo thời gian.

Vấn đề chính là các bảng cơ sở dữ liệu sẽ chứa lượng lớn dữ liệu "chết" - những bản ghi đã bị xóa nhưng vẫn lưu lại. 99% các bản ghi lưu trữ sẽ không bao giờ được đọc lại, nhưng lại chiếm dụng không gian lưu trữ và làm chậm các truy vấn. Điều này đặc biệt nghiêm trọng khi có hàng triệu bản ghi chết tích tụ theo thời gian.

Ngoài ra, việc có dữ liệu sống và dữ liệu lưu trữ nằm cạnh nhau trong cùng một bảng còn làm phức tạp hóa truy vấn, chỉ mục, và cả mã nguồn ứng dụng. Các nhà phát triển phải luôn nhớ lọc bỏ dữ liệu lưu trữ, và có nguy cơ dữ liệu cũ bị rò rỉ vào kết quả khi không mong muốn.

Bài viết đề xuất một số giải pháp thay thế:

- **Sử dụng trigger trong PostgreSQL**: Trigger tự động sao chép bản ghi sang bảng lưu trữ riêng trước khi xóa. Cách này giúp giữ bảng chính sạch sẽ, dữ liệu lưu trữ được tách biệt, dễ dàng dọn dẹp sau khoảng thời gian retention.

- **Application-level archiving**: Gửi sự kiện khi xóa bản ghi để một service khác lưu trữ dữ liệu vào S3 hoặc nơi khác. Ưu điểm là ứng dụng chính đơn giản hơn, nhưng nhược điểm là phức tạp hơn về infrastructure và có thể mất dữ liệu nếu có bug.

- **WAL-based Change Data Capture**: Sử dụng Write-Ahead Log của PostgreSQL để phát ra các thay đổi và lưu trữ bản ghi bị xóa. Phương pháp này không cần thay đổi mã nguồn hay thêm trigger, nhưng đòi hỏi operational complexity cao hơn.

Tác giả kết luận rằng nếu bắt đầu dự án mới và cần soft delete, anh sẽ ưu tiên sử dụng trigger-based approach vì sự cân bằng giữa độ đơn giản và hiệu quả.

## [Câu hỏi phỏng vấn Java - Tại sao không nên sử dụng static initializer?](https://javabulletin.substack.com/p/java-interview-question-why-you-should)

Bài viết giải thích lý do tại sao developer nên tránh sử dụng static initializer (`static { ... }`) trong Java, mặc dù nó có vẻ tiện lợi cho việc khởi tạo dữ liệu tĩnh phức tạp.

Vấn đề đầu tiên là static block chạy khi class được tải vào JVM. Nếu nó throw exception, class sẽ không thể tải được và dẫn đến `ExceptionInInitializerError`. Điều này còn gây ra hiệu ứng dây chuyền - bất kỳ class nào phụ thuộc vào class đó cũng sẽ fail, có thể làm sập cả ứng dụng.

Một vấn đề khác là static block tự động chạy ngay cả khi chúng ta không sử dụng class đó. Điều này lãng phí tài nguyên và có thể gây ra các side effect không mong muốn.

Khi nhiều class có static initializer phụ thuộc lẫn nhau, thứ tự tải class trở nên quan trọng và khó kiểm soát. Static block thực thi theo thứ tự class được tải, không phải theo thứ tự chúng ta khởi tạo object, dẫn đến các bug khó phát hiện.

Bài viết khuyến nghị sử dụng lazy initialization hoặc constructor-based initialization thay vì static initializer. Các phương pháp này có ưu điểm:

- Khởi tạo chỉ diễn ra khi thực sự cần
- Dễ kiểm thử và xử lý exception một cách graceful
- Không gây crash ứng dụng khi class được tải nhưng không sử dụng
- Code rõ ràng và dễ bảo trì hơn

## [Cách viết code hiệu suất cao](https://blog.bytebytego.com/p/how-to-write-high-performance-code)

Bài viết này chia sẻ các nguyên tắc nền tảng để viết code có hiệu suất tốt mà không cần kiến thức khoa học máy tính nâng cao hay nhiều năm kinh nghiệm. Điểm mấu chốt là phát triển trực giác về nơi hiệu suất thực sự quan trọng.

Một kỹ năng quý giá là khả năng ước lượng chi phí hiệu suất trước khi viết code. Các thao tác máy tính tồn tại ở các tầng tốc độ khác nhau: truy cập CPU cache nhanh nhất (nano giây), truy cập RAM chậm hơn khoảng 100 lần, đọc từ SSD chậm hơn 40.000 lần, và network có thể chậm hàng triệu lần so với cache. Việc hiểu rõ sự khác biệt này giúp đưa ra quyết định kiến trúc đúng đắn.

Quy tắc quan trọng nhất là đo lường trước, tối ưu hóa sau. Trực giác của chúng ta về các nút thắt hiệu suất thường sai lệch. Nên sử dụng công cụ phân tích hiệu suất với khối lượng công việc thực tế để tìm ra nơi chương trình thực sự tốn thời gian, thay vì dự đoán.

Cải tiến thuật toán và cấu trúc dữ liệu mang lại hiệu quả lớn nhất. Ví dụ, thay vì dùng vòng lặp lồng nhau để tìm phần tử chung giữa hai danh sách (O(N²)), ta có thể chuyển danh sách thứ hai thành bảng băm và tìm kiếm với O(1) mỗi lần, giảm tổng độ phức tạp xuống O(N). Điều này có thể mang lại cải thiện 10 lần hay 100 lần.

Bố cục bộ nhớ cũng quan trọng không kém thuật toán. CPU cực kỳ nhanh nhưng chỉ làm việc được với dữ liệu trong bộ nhớ đệm nhỏ. Nguyên tắc tính cục bộ: dữ liệu được truy cập cùng nhau nên được lưu cùng nhau. Mảng và vector thường vượt trội hơn danh sách liên kết vì truy cập tuần tự giúp tận dụng bộ nhớ đệm hiệu quả hơn.

Giảm thiểu cấp phát bộ nhớ là một kỹ thuật khác. Mỗi lần cấp phát có chi phí, và các đối tượng nhỏ thường nằm rải rác khắp bộ nhớ, làm giảm hiệu quả bộ nhớ đệm. Nên dành trước không gian cho container, tái sử dụng đối tượng, và dùng ngữ nghĩa di chuyển thay vì sao chép khi có thể.

Cuối cùng, mã nguồn nhanh nhất là mã nguồn không bao giờ chạy. Các chiến thuật bao gồm tạo đường dẫn nhanh cho trường hợp phổ biến, tính toán trước và lưu vào bộ nhớ đệm, đánh giá lười, và thoát sớm khi có thể. Không phải mọi mã nguồn đều cần tối ưu hóa - chỉ tập trung vào 20% mã nguồn quan trọng nhất chiếm 80% thời gian chạy.

## [Giới thiệu Moltworker: AI agent tự host không cần Mac mini](https://blog.cloudflare.com/moltworker-self-hosted-ai-agent/)

Cloudflare giới thiệu Moltworker - một giải pháp cho phép chạy Moltbot (tác nhân AI cá nhân mã nguồn mở) trên nền tảng Cloudflare thay vì phải mua Mac mini chuyên dụng. Đây là một minh chứng khái niệm minh họa sức mạnh của Nền tảng Nhà phát triển Cloudflare cho các ứng dụng AI.

Moltworker kết hợp nhiều sản phẩm của Cloudflare:

- **Bộ công cụ Sandbox**: Chạy mã nguồn trong môi trường cô lập an toàn, thay thế container Docker cục bộ. Bộ công cụ Sandbox cung cấp API thân thiện để thực thi lệnh, quản lý tệp, chạy quy trình nền mà không phải lo vòng đời phức tạp của container.

- **Kết xuất trình duyệt**: Điều khiển trình duyệt không đầu theo chương trình để tác nhân AI có thể điều hướng web, điền biểu mẫu, chụp ảnh nhanh. Hỗ trợ Puppeteer, Playwright và cả MCP cho AI.

- **Lưu trữ R2**: Lưu trữ bền vững cho bộ nhớ phiên hội thoại, hội thoại và các tài sản khác. Vì container vốn dĩ tạm thời, bộ chứa R2 được gắn kết như một phân vùng hệ thống tệp để đảm bảo dữ liệu không bị mất.

- **Cổng AI**: Đóng vai trò trung gian giữa tác nhân AI và các nhà cung cấp AI. Hỗ trợ BYOK (Mang khóa của bạn) hoặc Thanh toán thống nhất - Cloudflare quản lý bí mật và tính tiền tập trung. Cung cấp khả năng hiển thị về chi phí, nhật ký và phân tích.

- **Điều khiển truy cập Zero Trust**: Bảo vệ API và giao diện quản trị với chính sách xác thực, cho phép định nghĩa ai được truy cập và giám sát hoạt động của người dùng.

Cloudflare Workers hiện đã tương thích rất tốt với Node.js - trong 1000 gói NPM phổ biến nhất, chỉ 1,5% không chạy được. Điều này cho phép chạy phần lớn logic của tác nhân AI ngay trên Workers, gần người dùng hơn.

Đội ngũ Cloudflare đã mã nguồn mở bản triển khai tại GitHub và chạy thử nghiệm với Slack để demo các khả năng như tìm đường trên Google Maps, đặt món ăn, và thậm chí tạo video từ khung trình duyệt. Moltworker là demo cho thấy Cloudflare có đủ bộ công cụ để xây dựng và chạy ứng dụng AI phức tạp trên mạng biên toàn cầu.

## [Xây dựng Rotating Bloom Filter hiệu suất cao trong Java](https://medium.com/@udaysagar.2177/building-a-high-performance-rotating-bloom-filter-in-java-a9e75de993bf)

Bài viết này giải thích cách xây dựng bộ lọc Bloom xoay - một cấu trúc dữ liệu giải quyết vấn đề theo dõi tư cách thành viên trong các luồng dữ liệu không giới hạn với bộ nhớ hạn định. Khác với bộ lọc Bloom truyền thống có dung lượng cố định, bộ lọc xoay tự động hết hạn các mục theo cửa sổ thời gian, cho phép xử lý vô hạn dữ liệu với bộ nhớ không đổi.

Bộ lọc Bloom xoay giải quyết 4 bài toán khó:

**1. Ghi đồng thời không khóa**: Thay vì dùng khóa, bản triển khai sử dụng So sánh và Hoán đổi (CAS) với `AtomicLongArray`. Các luồng thử đặt bit nguyên tử - nếu thất bại thì thử lại. Vì bộ lọc Bloom phân tán bit hàng triệu vị trí, xác suất va chạm cực thấp, nên đa số luồng chạy song song mà không chờ đợi. Kết quả: thông lượng tốt hơn 3-4 lần so với bản triển khai dựa trên khóa.

**2. Đóng băng bộ lọc hoạt động**: Khi cửa sổ thời gian hết hạn, bộ lọc "hoạt động" được chuyển sang ảnh chụp chỉ đọc. `AtomicLongArray` đắt đỏ vì mỗi lần đọc đều trả chi phí truy cập bộ nhớ nguyên tử. Giải pháp: sao chép sang `long[]` đơn giản - bất biến và nhanh hơn nhiều vì truy cập bộ nhớ trực tiếp, không có chi phí nguyên tử. Chuỗi bộ lọc trở thành: `[ReadOnly-1, ReadOnly-2, ReadOnly-3, Active]` - ghi chỉ vào Active, đọc kiểm tra tất cả từ mới đến cũ.

**3. Điều phối xoay vòng qua các luồng**: Vấn đề là ghi có thể bị mất trong quá trình xoay - luồng A đọc chuỗi, xoay xảy ra, luồng A viết vào bộ lọc không còn hoạt động. Giải pháp dùng Khóa Đọc-Ghi: ghi giữ khóa đọc để đảm bảo chuỗi không đổi trong khi ghi; xoay giữ khóa ghi. Truy vấn thì hoàn toàn không khóa - nếu truy vấn đọc tham chiếu chuỗi cũ, chỉ là vấn đề thời điểm, không ảnh hưởng tính đúng đắn. Xoay chỉ giữ khóa khoảng 5 mili giây mỗi 5 phút (0,0017% thời gian).

**4. Tỷ lệ dương tính giả tăng trưởng**: Khi chuỗi nhiều bộ lọc, dương tính giả cộng dồn theo công thức `Tỷ lệ FPR kết hợp ≈ 1 - (1 - p)^N`. Với 5 cửa sổ mỗi cái 1% FPR, FPR kết hợp khoảng 5% chứ không phải 1%. Giải pháp: cấu hình FPR mỗi cửa sổ thấp hơn để đạt được mục tiêu FPR kết hợp. sự đánh đổi: càng nhiều cửa sổ thì lưu giữ càng lâu nhưng FPR càng cao.

Ngoài ra, thư viện còn có nhiều tối ưu hóa hiệu suất: giao diện Bits tính toán trước các vị trí bit và tái sử dụng, băm đôi chỉ cần tính toán 2 băm cho k vị trí bất kỳ, băm xxHash dưới nano giây nhanh hơn 10-20 lần so với MD5/SHA, và trừu tượng BitsProvider cho dữ liệu được serialized sao chép bằng không. Tất cả giúp đạt hàng triệu hoạt động mỗi giây.

## [Mọi Java developer nên biết gì về Thread Pools](https://dev.to/realnamehidden1_61/what-every-java-developer-should-know-about-thread-pools-4jam)

Bài viết giải thích kiến thức cơ bản về pool luồng trong Java - một công cụ quan trọng để quản lý tính đồng thời hiệu quả. Tác giả so sánh việc tạo luồng mới cho mỗi tác vụ giống như thuê nhân viên cho một đơn đặt hàng pizza rồi sa thải họ ngay sau đó - tốn kém và kém hiệu quả.

Pool luồng thông qua `ExecutorService` duy trì một tập hợp các luồng worker có sẵn để xử lý các tác vụ. Khi tác vụ hoàn thành, luồng không bị hủy mà quay lại pool chờ tác vụ tiếp theo. Điều này giúp:

- **Quản lý tài nguyên**: Giới hạn số lượng luồng tối đa, tránh hết bộ nhớ
- **Cải thiện độ trễ**: Các luồng đã có sẵn nên không có độ trễ khi khởi động tác vụ
- **Kiểm soát API**: Dễ dàng lên lịch các tác vụ chạy sau hoặc lặp lại định kỳ

Các loại pool phổ biến:

1. **Pool luồng cố định**: Số lượng worker cố định - tốt cho khối lượng công việc có thể dự đoán
2. **Pool luồng được lưu trong bộ nhớ đệm**: Tạo luồng mới khi cần nhưng tái sử dụng luồng cũ - tốt cho nhiều tác vụ ngắn
3. **Pool luồng được lên lịch**: Cho các tác vụ cần chạy định kỳ hoặc sau độ trễ
4. **Luồng ảo (Java 21+)**: Cách mạng hóa để xử lý hàng triệu tác vụ với chi phí overhead gần như bằng không

Bài viết đưa ra các phương pháp tốt nhất quan trọng:

- **Luôn dùng try-with-resources**: Đảm bảo pool luồng tắt đúng cách. Quên tắt `ExecutorService` là nguyên nhân hàng đầu gây rò rỉ bộ nhớ.
- **Đặt kích thước pool đúng cách**: Với các tác vụ tốn CPU nhiều, đặt kích thước pool bằng số bộ vi xử lý. Với các tác vụ tốn I/O nhiều (cơ sở dữ liệu, gọi API), dùng Luồng ảo.
- **Đặt tên cho luồng**: Dùng `ThreadFactory` để đặt tên các luồng có nghĩa như "Bộ xử lý đơn hàng-Pool-1" thay vì "Luồng-1" vô nghĩa khi gỡ lỗi.
- **Không bao giờ dùng `newCachedThreadPool()` cho API công khai**: Có thể tạo vô hạn luồng nếu lưu lượng truy cập tăng vọt, làm sập máy chủ.

Với Java 21, bài viết khuyến nghị dùng Luồng ảo cho các tác vụ tốn I/O nhiều vì nhẹ và có thể xử lý hàng triệu tác vụ đồng thời với chi phí overhead gần như bằng không.

## [Tạm biệt Java, xin chào Go](https://wso2.com/library/blogs/goodbye-java-hello-go)

WSO2 - công ty middleware enterprise với 20 năm lịch sử - công bố chuyển đổi chiến lược từ Java sang Go cho các sản phẩm thế hệ tiếp theo. Hiện tại 95% mã nguồn server-side của họ viết bằng Java, nhưng bối cảnh infrastructure software đã thay đổi đáng kể.

Những thay đổi chính trong 15 năm qua:

- **Kỷ nguyên container**: Middleware không còn là "server" độc lập mà giờ là library được gắn vào logic, trở thành một process duy nhất. Container được tạo để xử lý task rồi bị hủy - chúng ngắn hạn hơn nhiều so với trước đây.

- **Startup time quan trọng**: Java với tối ưu hóa JIT sau khi khởi động không hoạt động tốt khi server không chạy lâu. Java ecosystem khổng lồ khiến memory bloat và startup time dài - trong khi container cần sẵn sàng trong mili giây, không phải giây.

- **Chi phí infrastructure**: Memory footprint và CPU consumption của container trở thành quan trọng để quản lý cost. Java yêu cầu bộ nhớ và CPU cao hơn đáng kể so với các ngôn ngữ native khác.

Java đã cố gắng thích nghi với GraalVM native images và Project Loom, nhưng những giải pháp này cảm giác như vá cho một ngôn ngữ và runtime được thiết kế cho kỷ nguyên khác.

WSO2 quyết định chuyển sang Go cho backend và middle tier trong khi frontend vẫn giữ nguyên. Go được chọn thay vì Rust vì:

- Rust tuyệt vời cho OS, browser, hoặc code chạy rất lâu không restart - nhưng WSO2 build middleware infrastructure ở mức cao hơn bare metal.
- Go cân bằng tốt: quản lý bộ nhớ hiệu quả, concurrency primitives đủ thấp, cross-compile thành native code.
- Go đã được chứng minh: Kubernetes, Docker và nhiều enterprise infrastructure khác đều viết bằng Go.

WSO2 đã dùng Go gần một thập kỷ với các dự án như OpenChoreo (CNCF project), rewrite Ballerina compiler, và Thunder (identity platform). Đây không phải là nhảy vốt mù quáng mà là sự chuyển dịch có kế hoạch.

Tuy nhiên, WSO2 khẳng định sẽ không bỏ rơi các sản phẩm Java hiện tại - tiếp tục phát triển và hỗ trợ không có ngày kết thúc. Các sản phẩm thế hệ tiếp theo như Thunder và OpenChoreo đại diện cho hướng đi mới với hiệu suất tốt hơn, chi phí infrastructure thấp hơn.

Bài viết kết luận bằng lời tri ân Java: "Cảm ơn, Java. Chúng tôi sẽ không ở đây nếu không có bạn."

## [10 bẫy ưu tiên](https://cutlefish.substack.com/p/tbm-399-10-prioritization-traps)

Bài viết này chia sẻ 10 anti-pattern và bẫy trong việc định ưu tiên mà các team sản phẩm thường gặp phải. Tác giả làm việc tại startup nơi mỗi giây đều là quyết định ưu tiên, và mục tiêu không phải là quyết định hoàn hảo mà là quyết định "đủ tốt" giúp tiến về phía trước.

10 bẫy được đặt tên theo các bài hát nổi tiếng:

**1. Burning Down the House (Cháy nhà)** - Luôn ở chế độ phản ứng với việc khẩn cấp nhưng giá trị trung bình thấp. Team không bao giờ thoát khỏi vùng khẩn cấp, luôn bị kéo theo những việc gây đau đớn cho khách hàng nhưng không thực sự thay đổi cuộc chơi. Giải pháp: Dành ra 10-20% capacity được bảo vệ khỏi công việc phản ứng.

**2. Too Much Time on My Hands (Quá nhiều thời gian rảnh)** - Việc trung bình, khẩn cấp trung bình, giá trị trung bình, nhưng team không tìm được 20/80 - 20% nỗ lực tạo 80% kết quả. Team tốn quá nhiều thời gian hoàn thiện, tránh giảm rủi ro và học tập sớm. Giải pháp: Buộc cắt sớm, định nghĩa phiên bản nhỏ nhất để học trong 2-4 tuần.

**3. Everybody Wants to Rule the World (Ai cũng muốn thống trị)** - Việc giá trị cao, khẩn cấp cao mà "ai cũng đồng ý là ưu tiên hàng đầu" nhưng không ai thực sự drop được việc đang làm. Các phó chủ tịch khác nhau đang cân bằng ưu tiên cục bộ của họ. Giải pháp: Chọn một việc cụ thể được phép drop để phục vụ ưu tiên.

**4. Just Enough Is Never Enough (Không bao giờ đủ)** - Luôn làm "tối thiểu" và bỏ lỡ cơ hội nắm bắt giá trị thực. Team ship nhanh nhưng chỉ nắm bắt được 20% giá trị, hoặc ship chậm và bị ép buộc chuyển sang việc khác. Giải pháp: Trước khi ship, liệt kê 1-2 khoản đầu tư tiếp theo sẽ mở khóa giá trị không tỷ lệ, cho phép trước một trong số đó.

**5. Running on Empty (Chạy rỗng)** - Death marches không ai giải thích được tại sao mất nhiều thời gian. Cửa sổ cơ hội trôi đi khi thời gian trôi qua. Không có cách để nói "này, chúng ta đang đi off đường". Giải pháp: Introduce tín hiệu "off-track" rõ ràng - ngày cột mốc học tập, hoặc điểm kiểm tra quyết định.

**6. Dreamer (Người mơ)** - Nỗ lực đổi mới khẩn cấp thấp nhưng giá trị cao, được lãnh đạo bảo vệ nhưng không có áp lực ship và học, hoặc không có ràng buộc cho phép. Team xây cầu đến không có nơi nào. Giải pháp: Thêm một ràng buộc cho phép - deadline để ship gì đó thực sự, tích hợp với team hiện tại.

**7. Slow Ride (Ch Ride chậm)** - Những ma sát ảnh hưởng mọi người, chậm tất cả, nhưng bị coi là "khởi nghiệp kỹ thuật" với khẩn cấp thấp. Nếu Slack hay GitHub down vài giờ mỗi ngày sẽ là thảm họa, nhưng ma sát nội bộ thì được chấp nhận. Giải pháp: Đo lường sức cản - đo thời gian thêm mỗi tuần, reframe là chi phí trì hoãn không phải "dọn dẹp kỹ thuật".

**8. Someday Never Comes (Ngày nào đó sẽ không bao giờ đến)** - "Nên nhưng không thể" - cơ hội giá trị cao nhưng không ai có giải pháp đủ tự tin, nên bị trì hoãn mãi mãi. Thay vì tư duy xác suất, tổ chức treat này như cơ hội khao khát xa xôi. Giải pháp: Chạy một experiment chi phí thấp chỉ để giảm uncertainty, làm học tập là mục tiêu không phải thành công.

**9. The Logical Song (Bài hát logic)** - Bỏ qua chi phí tăng sự tự tin. Sự tự tin không miễn phí, cần tính toán dễ học đến đâu, tăng sự tự tin, giảm rủi ro sớm. Giải pháp: Thêm cột vào định ưu tiên: " Chúng ta có thể tăng sự tự tin với chi phí bao rẻ?"

**10. Takin' Care of Business (Chăm sóc business)** - Tetris định ưu tiên - pack thời gian và mục tiêu hàng quý dựa trên premise nếu stars align sẽ hoàn thành tất cả. Không có small-batch items ready, teams invent work khi blocked. Giải pháp: Xây dựng và duy trì small-batch "pull queue" của work được chấp nhận universally, low-risk.

Điểm chính là không phải về quyết định hoàn hảo, mà là detect và filter out bẫy để đưa ra quyết định tốt hơn.

## [Đánh giá chất lượng nội bộ khi lập trình với AI](https://martinfowler.com/articles/exploring-gen-ai/ccmenu-quality.html)

Bài viết của Martin Fowler chia sẻ kinh nghiệm thực tế khi sử dụng AI coding assistant (Windsurf/Sonnet 3.5 và Claude Code/Sonnet 4.5) để thêm tính năng hỗ trợ GitLab vào CCMenu - ứng dụng Mac hiển thị status CI/CD builds. Tác giả tập trung vào một khía cạnh ít được bàn đến: chất lượng nội bộ của code do AI tạo ra.

Tác giả thêm feature hỗ trợ GitLab vào CCMenu (viết bằng Swift) với sự hỗ trợ của AI agent, và phát hiện nhiều vấn đề về code quality:

**Vấn đề 1: Sai lệch về semantics** - AI khai báo parameter token là non-optional `String` trong tất cả wrapper functions, trong khi underlying `makeRequest` function đúng là optional `String?`. Khi code cần sử dụng optional token, AI fix bằng cách thêm empty string làm default (`apiToken ?? ""`) thay vì sửa function declaration để optional. Điều này:
- Không idiomatic với Swift
- Không self-documenting  
- Không được type system support
- Phải thay đổi ở mọi nơi gọi function

**Vấn đề 2: Cache không cần thiết** - AI muốn introduce cache hoàn toàn không cần thiết và không thể giải thích tại sao.

**Vấn đề 3: Logic phức tạp cho vấn đề không tồn tại** - AI không nhận ra rằng user/org overlap trong GitHub không tồn tại trong GitLab, và implement complicated logic để handle problem không có real. Tác giả phải guide AI về documentation đúng.

**Vấn đề 4: Không reuse existing functions** - AI "quên" sử dụng existing functions để construct URLs, replicate logic ở nhiều places, thậm chí bỏ qua functionality như option override base URL cho testing.

**Vấn đề 5: Hiểu sai API** - Cả Windsurf và Claude Code đều stumble khi retrieve avatar URL - GitLab giữ avatar URL riêng trong `/user` endpoint khác với GitHub, nhưng AI tin tưởng URL có trong response và phải tranh luận dài.

Tác giả kết luận: AI agents có xu hướng mạnh introduce technical debt, làm cho future development khó hơn cho cả humans và agents. Với Windsurf/Sonnet 3.5, code quality kém và dễ stuck, khiến việc sử dụng agent không đáng. Nhưng với Claude Code/Sonnet 4.5, code quality tốt hơn, cần ít prompting hơn, và running conversation trong terminal window alongside Xcode feel more natural. Điều này đủ để tác giả dùng Claude Code regularly.

Bài viết nhấn mạnh importance của internal quality - investing vào chất lượng codebase là worthwhile investment. Without careful oversight, AI agents có thể degrade codebase quality theo thời gian.

## [Môi trường Linux "Pure Go" được Claude port](https://www.jtolio.com/2026/01/tinyemu-go/)

Bài viết kể về kinh nghiệm sử dụng Claude để port TinyEMU - emulator hệ thống RISC-V của Fabrice Bellard từ C sang Go. Kết quả là có thể chạy `go run` và có một môi trường Linux hoàn chỉnh với quyền truy cập root, không cần quyền đặc biệt, không dùng containers, và chạy bất kỳ đâu Go chạy.

Tuy nhiên, bài viết tập trung vào bài học về việc lập trình với tác nhân LLM:

**80% đầu là tên lửa hứa, 20% cuối là cực hình** - Tác giả mô tả cảm xúc: thú vị -> trời ơi nó hoạt động -> ôi không ôi không -> trời ơi đống gì đây -> hmm có lẽ nó sẽ hoạt động. 20% cuối cực kỳ khó vì tác giả không code nên không có ngữ cảnh, phải nhìn vào codebase người lạ cố gắng giúp robot bị kẹt chạy vòng tròn.

**Vấn đề với Claude**:
- Claude thường lờ chỉ dẫn, thêm xử lý lỗi "tốt hơn" hoặc để comments "trong production chúng ta sẽ..."
- Claude tự quyết định implement networking stack sau khi Linux boot hoàn toàn, sau đó tác giả phải bắt đầu lại từ đầu.
- Cả thư viện networking C SLIRP non-blocking port sang Go là thảm họa - tác giả hối hận khi đã thử.

**Công cụ Beads** - Tác giả cảnh báo không dùng Beads vì cực kỳ chậm, 294k dòng Go, repo 128MB chỉ để update tệp markdown. Bạn nên dùng Ticket thay vì Beads.

**Điểm sáng**:
- Claude đôi khi sáng tạo một cách đáng ngạc nhiên - xử lý oom-killer tốt hơn bản gốc.
- Claude đôi khi tuyệt vời ở gỡ lỗi - phát hiện vấn đề bộ nhớ BIOS từ hex dump.
- Nhưng cũng tệ hại ở gỡ lỗi khi bị kẹt trong code chính nó thiết kế.

**Bài học**:
- Xóa session và bắt đầu với ngữ cảnh mới thường xuyên
- Nói rõ ràng với tác nhân lặp đi lặp lại để tạo tickets nếu có công việc mới được phát hiện
- Thỉnh thoảng lùi lại hai bước và nói với tác nhân nhiều sessions đã thất bại, cần cách tiếp cận mới
- Đừng mong đợi Claude tạo APIs gắn kết across sessions

**Kết luận**: Project đồng thời làm tác giả both enthu hơn và ít enthu hơn về coding với LLMs. LLMs cung cấp capabilities mới nhưng nếu muốn code không tệ, phải think carefully về cách hưởng lợi. Khi tác giả tự làm thì less frustrating và chất lượng output cao hơn, nhưng throughput thấp hơn LLM.

### Bonus

**Hình ảnh:**

![How to Scale An API](https://substackcdn.com/image/fetch/w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F36412c2b-8782-476e-9db4-aaf794629b74_2250x2624.png)
![HTTP/2 over TCP vs HTTP/3 over QUIC](https://substackcdn.com/image/fetch/$s_!4V7B!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fc9589feb-6f59-4971-9da4-26712d1a2ca1_2360x2960.png)
![How Git Really Stores Your Data](https://substackcdn.com/image/fetch/$s_!ihnd!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ffe954900-e8d8-40d0-a4b1-2f8e14068882_2360x2960.png)
![How NAT Works](https://substackcdn.com/image/fetch/$s_!5SHy!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fcbddfb5f-a652-4749-b0b9-210102774f4f_2360x2960.png)
