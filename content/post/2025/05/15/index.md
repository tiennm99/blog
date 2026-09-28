---
title: "Newsletter #28"
date: 2025-05-15
tags: [ "AI-Assisted", "Java", "JDK 24", "Garbage Collection", "Project Reactor", "Machine Learning", "Build Automation" ]
categories: [ "Newsletter" ]
---

*Mời bạn thưởng thức Newsletter #28.*

## [How Airbnb Measures Listing Lifetime Value](https://medium.com/airbnb-engineering/how-airbnb-measures-listing-lifetime-value-a603bf05142c)

Nhóm Khoa học dữ liệu của Airbnb giới thiệu khung đo lường giá trị vòng đời của một chỗ ở (Listing Lifetime Value - LTV) trên một nền tảng hai phía, nơi có nhiều người bán và nhiều người mua cùng lúc. Khung này gồm ba đại lượng. LTV cơ sở là tổng số lượt đặt phòng mà một chỗ ở dự kiến nhận được trong 365 ngày tới, được ước lượng bằng học máy từ các đặc trưng như lịch trống, giá, vị trí, thâm niên của chủ nhà, rồi quy về hiện giá. LTV gia tăng lấy LTV cơ sở trừ đi phần "ăn thịt" từ chỗ ở khác, tức những lượt đặt vẫn xảy ra kể cả khi chỗ ở đó không tồn tại. Cuối cùng, LTV gia tăng nhờ tiếp thị đo phần giá trị mà các chiến dịch nội bộ thực sự tạo thêm.

Có ba thách thức khi triển khai. Thứ nhất, nhãn huấn luyện chỉ có sau 365 ngày nên mô hình dễ sai lệch khi thị trường biến động như thời COVID-19; nhóm đã rút ngắn cửa sổ huấn luyện, bổ sung dữ liệu địa lý chi tiết và chuyển sang LightGBM. Thứ hai, không bao giờ quan sát được "sự thật" về tính gia tăng, nên họ ước lượng một hàm sản xuất mô tả cách tổng cung và tổng cầu của từng phân khúc tạo ra lượt đặt: phân khúc cầu cao, cung thấp thì một chỗ ở mới mang lại nhiều giá trị gia tăng hơn. Thứ ba, để xử lý bất định, dự đoán được điều chỉnh hằng ngày dựa trên số lượt đặt đã thực nhận.

## [Six JDK 24 Features You Should Know About](https://foojay.io/today/six-jdk-24-features-you-should-know-about/)

Simon Ritter (Azul) điểm qua sáu tính năng đáng chú ý nhất của JDK 24, phiên bản phát hành ngày 18/3/2025 với 24 JEP, nhiều nhất kể từ khi Java chuyển sang lịch phát hành sáu tháng một lần. JEP 483 thuộc Project Leyden cho phép các lớp của ứng dụng ở sẵn trạng thái đã nạp và liên kết ngay khi JVM khởi động, dựa trên nền tảng Application Class Data Sharing, nhờ đó giảm thời gian khởi động. JEP 485 (Stream Gatherers) bổ sung giao diện Gatherer để lập trình viên tự định nghĩa thao tác trung gian cho Stream, tương tự cách Collector phục vụ thao tác kết thúc. JEP 491 gỡ bỏ một hạn chế lớn của virtual thread: trước đây khi bị chặn bên trong khối synchronized, virtual thread vẫn "ghim" luồng nền vì monitor gắn với luồng nền; nay monitor được gắn với chính virtual thread.

Ba JEP còn lại mang tính dọn dẹp. JEP 486 vô hiệu hóa vĩnh viễn Security Manager, vốn đã bị đánh dấu lỗi thời từ JDK 17 và hầu như không còn được dùng để bảo vệ mã phía máy chủ; ứng dụng nào còn phụ thuộc vào nó có thể phải thay đổi kiến trúc khi nâng cấp. JEP 498 khiến JVM phát cảnh báo ở lần đầu gọi các phương thức truy cập bộ nhớ trong sun.misc.Unsafe, khuyến khích chuyển sang VarHandle và Foreign Function & Memory API. JEP 501 đánh dấu cổng x86 32-bit (chỉ còn trên Linux, bản Windows đã bị gỡ ở JDK 21) để loại bỏ trong tương lai. Đây là bản tóm tắt gọn giúp bạn chuẩn bị trước khi lên JDK 25, phiên bản hỗ trợ dài hạn tiếp theo.

## [JavaOne 2025: Function and Memory Access in Pure Java](https://www.infoq.com/news/2025/04/foreign-function-minborg/)

Bài viết trên InfoQ tường thuật phần trình bày của Per-Åke Minborg (Oracle) tại JavaOne 2025 về Foreign Function & Memory API (FFM, JEP 454), được chính thức đưa vào JDK 22 trong khuôn khổ Project Panama nhằm thay thế JNI. Theo Minborg, JNI buộc lập trình viên kết hợp Java và C một cách mong manh, tốn kém khi bảo trì và triển khai, truyền dữ liệu cồng kềnh, chỉ hỗ trợ kiểu nguyên thủy và đối tượng Java, không giải phóng bộ nhớ một cách chủ động và chỉ định địa chỉ được khoảng 2 GB. Các thư viện như JNA, JNR hay JavaCPP từng thử khắc phục nhưng không được đón nhận rộng rãi.

Ở phần bộ nhớ, `MemorySegment` đại diện cho một vùng nhớ liên tục với địa chỉ 64-bit, được bảo vệ khỏi truy cập ngoài giới hạn, truy cập sau khi giải phóng và truy cập từ luồng không được phép. Vòng đời vùng nhớ do `Arena` quản lý với bốn loại Global, Auto, Confined và Shared. `ValueLayout` và `MemoryLayout` mô tả dữ liệu theo cấu trúc để lấy ra `VarHandle` thay vì tự tính độ lệch bằng tay, và khai báo các `VarHandle` là `final` rất quan trọng để đạt hiệu năng tốt nhất. Ở phần hàm, công cụ `jextract` tự sinh liên kết Java từ tệp header của thư viện native, chẳng hạn gọi thẳng hàm `qsort` của C từ Java. Tóm lại, FFM mang đến cách truy cập bộ nhớ native an toàn, hiệu quả và gọi hàm native bằng mã Java thuần, không phải viết và duy trì mã C.

## [Ultimate Guide to Project Reactor, Thread-Locals and Context Propagation](https://4comprehension.com/ultimate-guide-to-project-reactor-thread-locals-and-context-propagation/)

Grzegorz Piwowarek giải thích vì sao việc truyền ngữ cảnh (context propagation) luôn là chủ đề khó trong Project Reactor. `ThreadLocal<X>` về bản chất giống `Map<Thread, X>`, trong khi một chuỗi phản ứng có thể nhảy sang luồng khác qua các toán tử như `publishOn()`, khiến giá trị ThreadLocal biến mất giữa chừng. Giải pháp cơ bản là Context của Reactor: ghi giá trị bằng `contextWrite()` và đọc lại bằng cách đổi `map()` thành `flatMap()` kết hợp `Mono.deferContextual()`. Tác giả cũng lưu ý rằng nếu có thể lấy giá trị trước khi vào chuỗi phản ứng thì cứ dùng biến thông thường cho đơn giản.

Phần khó hơn là tích hợp với các công cụ dựa vào ThreadLocal như ghi nhật ký bằng MDC: phải khôi phục giá trị vào MDC trước mỗi lambda, và mẫu execute-around giúp gói phần lặp lại vào một phương thức tiện ích `withMDC`. Với `doOnNext()` vốn không truy cập được Context, có thể dùng `doOnEach()`, kiểm tra tín hiệu `onNext` rồi lấy ngữ cảnh từ đối tượng `Signal`. Cuối cùng là truyền ngữ cảnh tự động: thêm thư viện `io.micrometer:context-propagation`, gọi `Hooks.enableAutomaticContextPropagation()` và đăng ký một `ThreadLocalAccessor`, Reactor sẽ tự khôi phục giá trị ở mỗi bước. Cách này tiện lợi nhưng có thể tốn kém hơn cách thủ công, và vì đây là thiết lập toàn cục cho cả JVM nên nó ảnh hưởng tới mọi chuỗi Reactor trong tiến trình; hãy cân nhắc theo từng trường hợp cụ thể.

## [JDK 24 G1/Parallel/Serial GC Changes](https://tschatzl.github.io/2025/04/01/jdk24-g1-serial-parallel-gc-changes.html)

Thomas Schatzl (Oracle) tổng hợp thay đổi của các bộ thu gom rác dừng toàn bộ (stop-the-world) trong JDK 24. Với Parallel GC, một số thao tác đồng bộ không cần thiết trong vòng lặp di tản đã được loại bỏ (JDK-8269870); Serial GC tiếp tục được dọn dẹp và tái cấu trúc. Thay đổi đáng kể nhất nằm ở G1: để đạt mục tiêu thời gian tạm dừng, G1 dự đoán các chi phí như sao chép bộ nhớ hay cập nhật tham chiếu, nhưng giá trị khởi tạo được đo từ lâu trên một máy SPARC cũ nên rất bảo thủ, khiến G1 cần khoảng 30 lần thu gom mới thích nghi. Với JDK-8343189, giá trị đo thực tế đầu tiên ghi đè thẳng lên giá trị mặc định, giúp G1 thích nghi nhanh hơn nhiều, đổi lại có thể vượt mục tiêu tạm dừng ở vài lần đầu. Ngoài ra, G1 giờ quản lý remembered set của cả thế hệ trẻ như một đơn vị duy nhất (JDK-8336086), giảm trùng lặp và tiết kiệm bộ nhớ native.

Tác giả cũng hé lộ lộ trình JDK 25: việc gộp remembered set cho các vùng thế hệ cũ (JDK-8343782) đã được tích hợp, còn rào chắn ghi (write barrier) của G1 được làm lại hoàn toàn, hứa hẹn tăng thông lượng tới 10%, tạm dừng ngắn hơn và sinh mã tốt hơn, đổi lại cần thêm một khối bộ nhớ tĩnh khoảng 0,2% kích thước heap. Ngoài ra còn có thảo luận về việc đưa Automatic Heap Sizing giống ZGC sang các bộ thu gom này với đóng góp từ Microsoft và Google, cũng như biến G1 thành bộ thu gom mặc định thực sự thay cho Serial GC ở môi trường ít tài nguyên.

## [Making Makefiles for fun and profit](https://dev.to/aws/making-makefiles-for-fun-and-profit-kl6)

Darko Mesaroš (AWS) nhìn lại `make`, công cụ tự động hóa xây dựng đã 48 tuổi do Stuart Feldman tạo ra để lập trình viên không còn quên biên dịch lại những tệp vừa sửa. So với một kịch bản `build.sh` biên dịch lại mọi thứ, `make` chỉ xây dựng lại phần đã thay đổi. Tác giả mổ xẻ một Makefile cho dự án C: các biến (make gọi là macro), đích `all` chạy mặc định, quy tắc liên kết dùng các macro có sẵn `$@` và `$^`, quy tắc mẫu `%.o: %.c` để biên dịch từng tệp, đích `clean` để dọn dẹp, và `.PHONY` để tránh xung đột khi thư mục có tệp trùng tên với đích.

Phần sau cho thấy `make` hữu ích vượt xa ngôn ngữ C: tự động hóa Terraform với việc nhận diện hệ điều hành và cảnh báo kỹ trước khi chạy `terraform destroy`, dựng môi trường phát triển cục bộ bằng Docker với Postgres và Redis cho một dự án Rust, quản lý dự án AWS CDK viết bằng TypeScript và Rust với các lệnh cài đặt, xây dựng, triển khai từng phần hoặc toàn bộ và kiểm thử cục bộ cùng DynamoDB Local, cũng như triển khai trang web tĩnh lên S3 kèm AWS Amplify. Để vượt qua cú pháp khó đọc, tác giả dùng Amazon Q Developer CLI sinh Makefile tự động, kể cả việc truy vấn động mã ứng dụng Amplify. Bài viết là lời nhắc rằng công cụ cũ vẫn rất đáng dùng, nhất là khi có trợ lý AI giúp hạ thấp rào cản ban đầu.

## [Improving Pinterest Search Relevance Using Large Language Models](https://medium.com/pinterest-engineering/improving-pinterest-search-relevance-using-large-language-models-4cd938d4e892)

Nhóm kỹ sư Pinterest chia sẻ cách họ dùng mô hình ngôn ngữ lớn (LLM) để cải thiện độ liên quan của kết quả tìm kiếm, tức mức độ một Pin thực sự đáp ứng nhu cầu của truy vấn thay vì chỉ dựa vào lượt tương tác trong quá khứ. Mô hình "thầy" là một cross-encoder nhận truy vấn cùng văn bản mô tả Pin, được tinh chỉnh trên dữ liệu gán nhãn thủ công như một bài toán phân loại nhiều lớp. Văn bản của Pin được làm giàu từ nhiều nguồn: tiêu đề và mô tả, chú thích ảnh do mô hình BLIP sinh ra, các truy vấn có tương tác cao nhất, tên bảng mà người dùng lưu Pin vào và tiêu đề trang liên kết. Trong các thử nghiệm, Llama-3-8B (tinh chỉnh bằng qLoRA) vượt BERT đa ngôn ngữ 12,5% và mô hình cơ sở 19,7% về độ chính xác,.

Vì LLM quá chậm và tốn kém để phục vụ trực tiếp, Pinterest dùng kỹ thuật chưng cất tri thức: mô hình thầy gán nhãn hằng ngày cho tập dữ liệu hàng tỷ dòng, rồi huấn luyện một mô hình "trò" gọn nhẹ dựa trên các embedding như SearchSAGE, PinSAGE, embedding hình ảnh cùng các đặc trưng khớp văn bản như BM25. Nhờ mô hình thầy đa ngôn ngữ, hệ thống khái quát tốt sang những ngôn ngữ và quốc gia không có dữ liệu gán nhãn. Thử nghiệm A/B cho thấy độ liên quan tăng 2,18% theo nDCG@20 và tỷ lệ hoàn thành tìm kiếm tăng hơn 1,5%. Hướng tiếp theo là phục vụ LLM trực tiếp, dùng mô hình thị giác – ngôn ngữ và học chủ động.

---

*Bài viết đã được viết lại bởi Claude Code với Opus 5.5 vào ngày 27/09/2026.*
