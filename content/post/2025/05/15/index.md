---
title: "Newsletter #28"
date: 2025-05-15
tags: [ "AI-Assisted", "Java", "Machine Learning", "Build Automation", "Development" ]
categories: [ "Newsletter" ]
---

*Mời bạn thưởng thức Newsletter #28.*

## [How Airbnb Measures Listing Lifetime Value](https://medium.com/airbnb-engineering/how-airbnb-measures-listing-lifetime-value-a603bf05142c)

Bài viết từ Airbnb Engineering chia sẻ cách họ đo lường và tính toán Giá Trị Vòng Đời Danh Sách (Listing Lifetime Value - LTV) - một chỉ số quan trọng để hiểu giá trị kinh tế dài hạn của mỗi danh sách trên nền tảng. Đây là một bài viết kỹ thuật chi tiết về cách xây dựng hệ thống đo lường các chỉ số phức tạp trong môi trường sản xuất quy mô lớn.

Airbnb đã phát triển một khung làm việc toàn diện để đo lường LTV của các danh sách, bao gồm việc xử lý các thách thức như:

**Các thách thức chính:**

- **Tính toán giá trị dự đoán**: Làm thế nào để dự đoán giá trị vòng đời của một danh sách khi chưa biết được nó sẽ hoạt động trong bao lâu
- **Xử lý dữ liệu thời gian thực**: Cập nhật chỉ số này khi có đặt chỗ mới, hủy bỏ, hay thay đổi giá
- **Tính toán trên quy mô lớn**: Xử lý hàng triệu danh sách với hàng tỷ điểm dữ liệu

**Kiến trúc kỹ thuật:**

- Sử dụng đường ống dữ liệu để xử lý dữ liệu luồng
- Áp dụng mô hình học máy để dự đoán mẫu hành vi
- Triển khai chiến lược caching để đảm bảo hiệu suất
- Thiết kế hệ thống giám sát và cảnh báo cho chất lượng dữ liệu

Bài viết cũng đề cập đến việc cân bằng giữa độ chính xác và chi phí tính toán, cách xử lý các trường hợp ngoại lệ, và làm thế nào để xác thực kết quả của mô hình trong môi trường thực tế.

## [Six JDK 24 Features You Should Know About](https://foojay.io/today/six-jdk-24-features-you-should-know-about/)

Bài viết từ foojay.io giới thiệu 6 tính năng quan trọng nhất trong JDK 24, phiên bản Java được phát hành vào tháng 3/2025 với tổng cộng 24 JEP (JDK Enhancement Proposals) - số lượng tính năng mới lớn nhất kể từ khi áp dụng lịch phát hành 6 tháng một lần.

**Các tính năng nổi bật:**

### 1. JEP 483: Ahead-of-time Class Loading & Linking

- Thuộc về Project Leyden nhằm giảm thời gian khởi động của các ứng dụng Java
- Cho phép các lớp được tải và liên kết sẵn khi JVM khởi động, tránh chi phí phụ của việc tải/xác minh/liên kết lặp đi lặp lại
- Cải thiện đáng kể thời gian khởi động ứng dụng

### 2. JEP 485: Stream Gatherers

- Mở rộng Streams API với khả năng tạo các thao tác trung gian tùy chỉnh
- Tương tự như Collector interface cho các thao tác đầu cuối, Gatherer interface cho phép các nhà phát triển tạo các thao tác trung gian tùy chỉnh
- Tăng tính linh hoạt và khả năng tái sử dụng trong lập trình hàm

### 3. JEP 491: Synchronize Virtual Threads Without Pinning

- Giải quyết giới hạn quan trọng của virtual threads khi sử dụng synchronized blocks/methods
- Trước đây, virtual threads sẽ "ghim" platform thread khi trong synchronized block, giờ monitor được liên kết với virtual thread thay vì platform thread
- Cải thiện đáng kể khả năng mở rộng của các ứng dụng sử dụng virtual threads

### 4. JEP 486: Permanently Disable Security Manager

- Loại bỏ hoàn toàn Security Manager - tính năng đã bị loại bỏ dần từ JDK 17
- Mặc dù có vẻ giảm bảo mật, thực tế Security Manager đã lỗi thời và ít được sử dụng
- Các ứng dụng sử dụng tính năng này sẽ cần thay đổi kiến trúc để nâng cấp lên JDK 24

### 5. JEP 498: Warning for sun.misc.Unsafe Memory-Access Methods

- JVM sẽ cảnh báo khi sử dụng các phương thức truy cập bộ nhớ trong sun.misc.Unsafe
- Khuyến khích chuyển sang sử dụng VarHandle API và Foreign Function & Memory API
- Tiếp tục quá trình đóng gói của các API nội bộ của JDK

### 6. JEP 501: Deprecate 32-bit x86 Port for Removal

- Loại bỏ dần 32-bit x86 port trên Linux (Windows 32-bit đã bị gỡ bỏ từ JDK 21)
- Phản ánh thực tế là rất ít hệ thống vẫn chạy hệ điều hành 32-bit trong môi trường sản xuất hiện đại

## [JavaOne 2025: Function and Memory Access in Pure Java](https://www.infoq.com/news/2025/04/foreign-function-minborg/)

Bài viết từ InfoQ tóm tắt bài thuyết trình của Per-Åke Minborg tại JavaOne 2025 về Foreign Function & Memory API (FFM), một trong những tính năng quan trọng nhất được giới thiệu trong JDK 22. FFM API được phát triển dưới dự án Panama nhằm thay thế JNI (Java Native Interface) với cách tiếp cận hiện đại và an toàn hơn.

**Vấn đề với JNI truyền thống:**

- Mô hình lập trình ưu tiên native dễ bị lỗi với sự kết hợp giữa Java và C
- Chi phí bảo trì và triển khai cao
- Truyền dữ liệu đến/từ JNI phức tạp và kém hiệu quả
- Chỉ hỗ trợ các kiểu dữ liệu nguyên thủy và đối tượng Java
- Không có cách nào để giải phóng bộ nhớ một cách xác định
- Không gian địa chỉ bị giới hạn (~2GB)

**Foreign Memory API - Giải pháp cho truy cập bộ nhớ:**

### Memory Segments và Arena

- Giao diện `MemorySegment` cung cấp quyền truy cập đến vùng bộ nhớ liên tục với địa chỉ 64-bit
- Kiểm soát thông qua Kích thước (bảo vệ khỏi truy cập ngoài giới hạn), Vòng đời (bảo vệ khỏi sử dụng sau khi giải phóng), và Giới hạn luồng
- Giao diện `Arena` quản lý vòng đời của các phân đoạn bộ nhớ native với các loại:
  - **Global**: vòng đời không giới hạn
  - **Auto**: vòng đời được thu gom rác tự động
  - **Confined**: vòng đời bị giới hạn rõ ràng
  - **Shared**: vòng đời bị giới hạn rõ ràng với truy cập đa luồng

### Value Layouts và VarHandle

- Giao diện `ValueLayout` mô hình hóa các giá trị của các kiểu dữ liệu cơ bản với 3 thuộc tính: Carrier Type, Endianness, Alignment
- Sử dụng để lấy các thể hiện `VarHandle` từ `MemorySegment`
- Giao diện `MemoryLayout` mô tả nội dung phân đoạn bộ nhớ một cách có cấu trúc, giúp tránh tính toán offset thủ công

**Foreign Function API - Tương tác với thư viện native:**

### Công cụ jextract

- Công cụ tự động tạo các liên kết Java từ các header của thư viện native
- Xây dựng trên nền tảng FFM API, giúp tạo mã tự động thay vì viết mã thủ công
- Ví dụ: gọi hàm sắp xếp nhanh native trực tiếp từ mã Java

**Lợi ích của FFM API:**

- **Truy cập an toàn và hiệu quả** đến bộ nhớ native với khả năng giải phóng xác định
- **Truy cập trực tiếp và hiệu quả** đến các hàm native - 100% Java, không cần bảo trì mã native
- **Nền tảng cho Project Panama** khả năng tương tác với các công cụ như jextract để tạo layouts và handles

Đây là bước tiến quan trọng trong việc hiện đại hóa khả năng tương tác native của Java, mang lại hiệu năng tốt hơn và trải nghiệm nhà phát triển được cải thiện đáng kể so với JNI truyền thống.

## [Ultimate Guide to Project Reactor, Thread-Locals and Context Propagation](https://4comprehension.com/ultimate-guide-to-project-reactor-thread-locals-and-context-propagation/)

Bài viết toàn diện từ 4comprehension.com giải thích chi tiết về một trong những thách thức phức tạp nhất khi làm việc với Project Reactor: truyền ngữ cảnh (context propagation) và biến cục bộ luồng (thread-local variables). Đây là vấn đề thường gặp trong lập trình phản ứng khi các tác vụ có thể "nhảy" giữa các luồng khác nhau, dẫn đến mất ngữ cảnh quan trọng.

**Vấn đề cốt lõi:**
Trong mô hình luồng truyền thống, các biến `ThreadLocal` hoạt động như một `Map<Thread, Value>` - mỗi luồng có kho lưu trữ riêng biệt. Tuy nhiên trong luồng phản ứng, việc thực thi có thể chuyển đổi giữa nhiều luồng thông qua các toán tử như `publishOn()`, khiến các giá trị ThreadLocal bị mất.

**Các giải pháp được trình bày:**

### 1. Reactor's Context API

- Sử dụng `contextWrite()` để lưu trữ các giá trị ngữ cảnh
- Truy cập ngữ cảnh thông qua `Mono.deferContextual()` trong `flatMap()`
- Ngữ cảnh được truyền tự động qua chuỗi phản ứng

### 2. Tích hợp với các công cụ dựa trên ThreadLocal

- Giải quyết vấn đề với ghi nhật ký Mapped Diagnostic Context (MDC)
- Sử dụng mẫu execute-around để khôi phục các giá trị ThreadLocal
- Tạo các phương thức tiện ích để giảm mã soạn sẵn

### 3. Truy cập ngữ cảnh từ `doOnNext()`

- Sử dụng `doOnEach()` thay vì `doOnNext()` để truy cập ngữ cảnh
- Kiểm tra loại tín hiệu và trích xuất ngữ cảnh từ đối tượng `Signal`
- Tạo các phương thức bao bọc cho mã sạch

### 4. Truyền ngữ cảnh tự động

- Kích hoạt với `Hooks.enableAutomaticContextPropagation()`
- Đăng ký `ThreadLocalAccessor` tùy chỉnh cho việc khôi phục tự động
- Đánh đổi giữa sự tiện lợi và chi phí hiệu năng

**Những điểm chính:**

- Truyền ngữ cảnh là thách thức quan trọng trong lập trình phản ứng
- Nhiều cách tiếp cận tùy thuộc vào trường hợp sử dụng cụ thể
- Quản lý ngữ cảnh thủ công cho kiểm soát tốt hơn, cách tiếp cận tự động cho sự tiện lợi
- Cần phân tích cẩn thận để chọn cách tiếp cận phù hợp với yêu cầu hiệu năng

## [JDK 24 G1/Parallel/Serial GC Changes](https://tschatzl.github.io/2025/04/01/jdk24-g1-serial-parallel-gc-changes.html)

Bài viết từ Thomas Schatzl (Oracle) tổng hợp những thay đổi quan trọng trong các bộ thu gom rác của JDK 24. Mặc dù JDK 24 không có nhiều thay đổi đột phá trong lĩnh vực GC, nhưng có những cải tiến đáng chú ý và lộ trình hứa hẹn cho JDK 25.

**Parallel GC:**

- Loại bỏ một số đồng bộ hóa không cần thiết trong vòng lặp di tản (JDK-8269870)
- Có thể giảm thời gian tạm dừng trong một số tình huống cụ thể
- Tập trung vào tối ưu hóa cho đường dẫn nóng trong quá trình thu gom rác

**Serial GC:**

- Tiếp tục công việc dọn dẹp và tái cấu trúc nền tảng mã
- Cải thiện khả năng bảo trì và chất lượng mã
- Chuẩn bị cho những thay đổi lớn hơn trong tương lai

**G1 GC - Những cải tiến quan trọng:**

### 1. Tối ưu hóa giá trị dự đoán (JDK-8343189)

G1 sử dụng các dự đoán để đạt được mục tiêu thời gian tạm dừng, bao gồm chi phí của sao chép bộ nhớ và cập nhật tham chiếu. Trước đây, G1 sử dụng các giá trị được chuẩn bị sẵn được xác định từ lâu trên máy SPARC "lớn" và không được cập nhật. Những giá trị này rất bảo thủ, khiến G1 mất khoảng 30 lần thu gom rác để thích nghi với môi trường hiện tại.

Thay đổi mới cho phép các giá trị thực tế ghi đè trực tiếp lên các giá trị dự đoán được chuẩn bị sẵn thay vì cộng dồn, giúp G1 thích nghi nhanh hơn với ứng dụng và môi trường. Sự đánh đổi là có thể có nhiều lần vượt quá thời gian tạm dừng trong những lần thu gom rác đầu tiên.

### 2. Tối ưu hóa bộ nhớ tập hợp thế hệ trẻ (JDK-8336086)

- G1 giờ quản lý các tập hợp được ghi nhớ cho toàn bộ thế hệ trẻ như một đơn vị duy nhất
- Loại bỏ các bản sao và tiết kiệm bộ nhớ đáng kể
- Giảm số lượng mục trong tập hợp được ghi nhớ, từ đó giảm nhẹ thời gian tạm dừng thu gom rác
- Kế thừa ý tưởng từ JDK 23 với những cải tiến bổ sung

**Lộ trình JDK 25 - Những thay đổi lớn sắp tới:**

### Cải tổ rào chắn ghi

- Một trong những thay đổi lớn nhất từ trước đến nay trong tương tác giữa ứng dụng và G1
- Rào chắn ghi được thực thi cho mọi thao tác ghi tham chiếu có tác động lớn đến thông lượng ứng dụng
- Dự kiến cải thiện thông lượng lên đến 10%, thời gian tạm dừng ngắn hơn, tạo mã tốt hơn
- Đang được chuẩn bị thành JEP để tích hợp trong những tháng tới

### Hợp nhất tập hợp được ghi nhớ của thế hệ cũ (JDK-8343782)

- Mở rộng ý tưởng hợp nhất các tập hợp được ghi nhớ cho các vùng thế hệ cũ
- Tiết kiệm bộ nhớ native còn lớn hơn nữa
- Đã được tích hợp trong JDK 25

**Các thảo luận và dự án đang diễn ra:**

- **Automatic Heap Sizing**: Dự án mang tính năng tương tự ZGC đến các bộ thu gom dừng-thế-giới (đóng góp từ Microsoft và Google)
- **G1 as True Default Collector**: Thảo luận về việc làm G1 thành bộ thu gom mặc định thay vì Serial GC trong môi trường nhỏ, vì G1 đang cho thấy hiệu năng tương đương hoặc tốt hơn Serial GC trong hầu hết các chỉ số

JDK 24 tập trung vào cải tiến nền tảng và tối ưu hóa, đặt nền móng cho những đột phá lớn hơn trong JDK 25, đặc biệt là cải tổ rào chắn ghi hứa hẹn mang lại những cải thiện hiệu năng đáng kể.

## [Making Makefiles for fun and profit](https://dev.to/aws/making-makefiles-for-fun-and-profit-kl6)

Bài viết từ Chuyên gia Ủng hộ Nhà phát triển AWS Darko Mesaroš khám phá lại Makefiles - công cụ tự động hóa xây dựng 48 tuổi nhưng vẫn cực kỳ hữu ích trong quy trình làm việc phát triển hiện đại. Mặc dù Make được tạo ra từ năm 1976 để giải quyết vấn đề quên biên dịch các tệp trong quá trình phát triển, ngày nay nó có thể làm được nhiều hơn thế rất nhiều.

**Tại sao Makefiles vẫn phù hợp:**

- **Tự động hóa các tác vụ lặp đi lặp lại**: Thay vì nhớ các lệnh phức tạp, chỉ cần `make deploy` hoặc `make clean`
- **Quản lý phụ thuộc thông minh**: Chỉ xây dựng lại những phần thực sự cần thiết
- **Tiêu chuẩn hóa**: Tạo quy trình làm việc nhất quán cho nhóm phát triển
- **Tương thích đa nền tảng**: Hoạt động trên Unix, Linux, macOS và Windows

**Các trường hợp sử dụng thực tế được trình bày:**

### 1. Tự động hóa Terraform

- Tự động chuyển đổi môi trường và quản lý không gian làm việc
- Kiểm tra an toàn trước khi chạy `terraform destroy` với cảnh báo đầy đủ
- Quản lý biến môi trường cho các đích triển khai khác nhau

### 2. Thiết lập môi trường phát triển cục bộ

- Tự động khởi chạy container Docker cho các cơ sở dữ liệu (Postgres, Redis)
- Tạo mật khẩu động và tạo tệp môi trường
- Phát triển Cargo lambda với tiêm biến môi trường thích hợp
- Thiết lập bằng một lệnh cho các ngăn xếp phát triển phức tạp

### 3. Dự án AWS CDK

- Tự động hóa xây dựng đa ngôn ngữ (TypeScript + Rust)
- Các lệnh triển khai riêng biệt cho các ngăn xếp riêng lẻ so với triển khai hoàn chỉnh
- Môi trường kiểm thử cục bộ với tích hợp DynamoDB Local
- Các lệnh dọn dẹp toàn diện

### 4. Triển khai trang web tĩnh

- Tự động tải lên S3 với các tiêu đề content-type thích hợp
- Kích hoạt triển khai AWS Amplify
- Phân giải ID tài nguyên AWS động

**Cách tiếp cận hiện đại với sự hỗ trợ của AI:**

Bài viết trình diễn cách sử dụng Amazon Q Developer CLI để tạo ra các Makefiles phức tạp mà không cần phải thành thạo cú pháp phức tạp của Make. Công cụ AI có thể:

- Tự động phát hiện cấu trúc dự án và tạo các mục tiêu thích hợp
- Phân giải ID tài nguyên động (như ID ứng dụng Amplify)
- Quản lý cấu hình đặc thù cho từng môi trường
- Triển khai các phương pháp tốt nhất cho các loại dự án khác nhau

**Những điểm chính cho nhà phát triển:**

- Makefiles không chỉ dành cho lập trình C - chúng mạnh mẽ cho bất kỳ quy trình tự động hóa nào
- Các công cụ AI hiện đại giúp vượt qua đường cong học tập của cú pháp Make
- Đầu tư vào thiết lập Makefile mang lại lợi ích dài hạn trong năng suất của nhóm
- Luôn nhớ các mục tiêu `.PHONY` để tránh xung đột với các tệp thực tế

Đây là reminder tuyệt vời rằng sometimes old tools are still the best tools, đặc biệt khi được enhance bởi modern AI assistance để lower barrier to entry.

## [Improving Pinterest Search Relevance Using Large Language Models](https://medium.com/pinterest-engineering/improving-pinterest-search-relevance-using-large-language-models-4cd938d4e892)

Bài viết từ Pinterest Engineering team chia sẻ về journey cải thiện search relevance trên platform bằng cách integrate Large Language Models vào search infrastructure. Đây là case study thực tế về việc apply LLMs trong production search systems quy mô lớn với hàng tỷ Pins và hàng triệu user queries mỗi ngày.

**Challenges trong Pinterest Search:**

Pinterest search có những đặc thù riêng biệt so với traditional text search engines. Users thường search bằng visual concepts, aesthetic preferences, và contextual intentions mà khó express bằng keywords đơn giản. Ví dụ, query "cozy living room" có thể có hàng trăm interpretations khác nhau về color schemes, furniture styles, và ambiance.

**LLM Integration Strategy:**

### 1. Query Understanding Enhancement

- **Semantic Query Expansion**: LLMs giúp hiểu deeper intent đằng sau user queries, expanding "minimalist bedroom" thành related concepts như "clean lines", "neutral colors", "simple furniture"
- **Contextual Interpretation**: Xử lý ambiguous queries bằng cách leverage user's previous interactions và browsing history
- **Multi-modal Understanding**: Combine text queries với visual context để improve relevance

### 2. Content Representation Improvement

- **Rich Pin Embeddings**: Generate comprehensive embeddings cho Pins bằng cách combine visual features với textual descriptions được enhance bởi LLMs
- **Dynamic Content Tagging**: Automatically generate relevant tags và categories cho user-generated content
- **Quality Assessment**: Use LLMs để evaluate content quality và filter out low-relevance results

### 3. Ranking Model Enhancement

- **Feature Engineering**: LLMs generate additional features cho ranking models, including semantic similarity scores và content quality indicators
- **Real-time Personalization**: Adapt search results based on user preferences được inferred từ LLM analysis
- **Diversity Optimization**: Ensure search results maintain diversity while improving relevance

**Technical Implementation:**

### Architecture Design

- **Hybrid Approach**: Combine traditional search algorithms với LLM-powered enhancements
- **Scalability Considerations**: Efficient LLM inference để handle millions of queries per day
- **Latency Optimization**: Balance between LLM processing time và user experience requirements

### Model Training và Fine-tuning

- **Domain-specific Training**: Fine-tune LLMs trên Pinterest-specific data including user behavior patterns và content characteristics
- **Continuous Learning**: Implement feedback loops để continuously improve model performance
- **A/B Testing Framework**: Rigorous testing methodology để measure impact của LLM improvements

**Results và Impact:**

- **Search Relevance Metrics**: Significant improvements trong click-through rates, user engagement, và search satisfaction scores
- **User Experience**: Reduced search abandonment rates và increased time spent exploring search results
- **Business Impact**: Improved user retention và increased platform engagement

**Key Learnings:**

- **Model Complexity vs. Performance**: Finding right balance giữa model sophistication và practical implementation constraints
- **Data Quality Importance**: High-quality training data crucial cho LLM effectiveness trong search applications
- **Human-in-the-loop**: Importance của human evaluation và feedback trong LLM-powered search systems
- **Iterative Improvement**: Search relevance improvement là continuous process requiring ongoing optimization

Đây là example tuyệt vời về cách major tech platforms leverage LLMs để solve real-world problems, demonstrating practical applications của AI trong improving user experience at scale.

---

*Bài viết đã được review và cập nhật bởi Claude Code với Opus 4.7 (1M context).*
