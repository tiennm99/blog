---
title: "Newsletter #9"
date: 2025-04-01
tags: [ "AI-Assisted" ]
categories: [ "Newsletter" ]
---

*Mời bạn thưởng thức Newsletter \#9.*

## [To avoid being replaced by LLMs, do what they can't](https://www.seangoedecke.com/what-llms-cant-do/)

Bài viết của Sean Goedecke phân tích về những gì LLMs không thể làm và cách các kỹ sư phần mềm có thể chuẩn bị cho tương lai khi AI ngày càng phát triển. Đây là một góc nhìn thú vị về tương lai của nghề kỹ sư phần mềm.

Một số điểm chính:

1. **Ngắn hạn: Học AI và thăng tiến**
   - Tận dụng các công cụ AI
   - Hiểu về nguyên lý cơ bản của language models
   - Thăng tiến vì các vị trí junior sẽ bị thay thế trước

2. **Trung hạn: Tập trung vào legacy code**
   - LLMs giỏi ở các bài toán:
     * Được định nghĩa rõ ràng
     * Có phạm vi hẹp
     * Dễ kiểm tra kết quả
     * Ít code
   - Legacy code ngược lại:
     * Vấn đề không rõ ràng
     * Khó kiểm tra kết quả
     * Khối lượng code lớn
   - LLMs sẽ gặp khó khăn với legacy code vì:
     * Cần giải quyết vấn đề large context
     * Khó viết eval tốt
     * Dữ liệu phân tán ở nhiều nơi

3. **Dài hạn: Chịu trách nhiệm**
   - Kỹ sư không chỉ viết code mà còn phải được tin tưởng
   - LLMs không thể chịu trách nhiệm vì:
     * Không có "skin in the game"
     * Không thể xây dựng lòng tin với management
   - Các công ty sẽ luôn cần ít nhất một kỹ sư để:
     * Giám sát LLMs
     * Chuyển đổi cam kết của LLMs thành cam kết con người

## [How Instagram Scaled Its Infrastructure To Support a Billion Users](https://blog.bytebytego.com/p/how-instagram-scaled-its-infrastructure)

Bài viết phân tích chi tiết cách Instagram đã scale infrastructure của họ để hỗ trợ hơn 1 tỷ người dùng. Đây là một case study thú vị về việc scale một ứng dụng từ startup nhỏ thành một nền tảng toàn cầu.

Một số điểm chính:

1. **Thách thức ban đầu:**
   - Instagram khởi đầu với 13 nhân viên và infrastructure đơn giản trên AWS
   - Gặp nhiều vấn đề về performance và scaling khi user base tăng nhanh
   - Phải scale thủ công trước các sự kiện lớn

2. **Chiến lược scale 3 chiều:**
   - Scale out: Thêm servers và data centers
   - Scale up: Tối ưu hiệu suất của mỗi server
   - Scale engineering: Tự động hóa và cải thiện quy trình phát triển

3. **Kiến trúc hệ thống:**
   - Sử dụng Django làm web framework
   - PostgreSQL cho structured data
   - Cassandra cho distributed data
   - Memcached cho caching
   - RabbitMQ và Celery cho async processing

4. **Các giải pháp kỹ thuật quan trọng:**
   - Memcache Lease mechanism để tránh thundering herd problem
   - Continuous deployment với canary testing
   - Monitoring và profiling CPU usage
   - Distributed storage với Haystack

5. **Bài học rút ra:**
   - Scale không chỉ là thêm hardware mà còn cần tối ưu resources
   - Tự động hóa là chìa khóa để scale engineering team
   - Cần balance giữa consistency và performance
   - Monitoring và observability là cực kỳ quan trọng

## [The State of Scala & Clojure Surveys](https://www.jvm-weekly.com/p/the-state-of-scala-and-clojure-surveys)

Bài viết phân tích kết quả của hai cuộc khảo sát về tình trạng của Scala và Clojure trong năm 2024. Đây là một góc nhìn thú vị về tương lai của functional programming trên JVM.

Một số điểm chính:

1. **Tình trạng Scala:**
   - 232 người tham gia khảo sát, 75% là Software Engineers
   - 93.1% thích hoặc yêu thích Scala
   - Tuổi trung bình của dự án là 7 năm
   - Các ecosystem phổ biến: Typelevel (41.8%), Akka (35.3%), ZIO (23.3%)
   - 53% dự án kết hợp nhiều ecosystem khác nhau

2. **Thách thức của Scala:**
   - Thời gian biên dịch chậm (1/3 người dùng gặp vấn đề)
   - Ecosystem bị phân mảnh và khó migrate lên Scala 3
   - Thiếu nguồn lực để maintain các dự án cũ
   - 23.2% công ty đang cân nhắc chuyển sang Kotlin, Rust hoặc Go

3. **Vấn đề tuyển dụng:**
   - 56.5% không biết tìm Scala developers ở đâu
   - 40.5% cho rằng Scala làm chậm quá trình onboarding
   - 68.6% cho phép làm việc từ xa để dễ tuyển dụng

4. **Tình trạng Clojure:**
   - 73% người dùng sử dụng Clojure trong công việc
   - Phổ biến trong web development và enterprise applications
   - 58% đã migrate lên Clojure 1.12
   - 54% sử dụng Java 21 LTS

5. **Các Clojure dialects mới:**
   - Babashka (93% người dùng dialects)
   - ClojureDart cho web và mobile
   - Squint, Jank, và Cherry
   - Thách thức cho người mới: hiểu macros và "homoiconicity"

## [LinkedIn Integrates Protocol Buffers With Rest.li for Improved Microservices Performance](https://www.linkedin.com/blog/engineering/infrastructure/linkedin-integrates-protocol-buffers-with-rest-li-for-improved-m)

Bài viết chia sẻ về việc LinkedIn đã tích hợp Protocol Buffers (Protobuf) vào framework Rest.li của họ để cải thiện hiệu suất của microservices. Đây là một case study thú vị về việc tối ưu performance ở quy mô lớn.

Một số điểm chính:

1. **Vấn đề với JSON:**
   - JSON là format text nên tốn nhiều bandwidth
   - Serialization/deserialization chậm
   - Tốn tài nguyên khi sử dụng với garbage collected languages

2. **Giải pháp với Protocol Buffers:**
   - Compact payload size giúp giảm bandwidth
   - Hiệu suất serialization/deserialization cao
   - Hỗ trợ nhiều ngôn ngữ lập trình
   - Dễ dàng tích hợp với Rest.li

3. **Cách triển khai:**
   - Sử dụng symbol tables để map giữa PDL fields và Protobuf field numbers
   - Tự động generate symbol tables khi service khởi động
   - Cache symbol tables ở client side
   - Rollout từng bước với client configurations

4. **Kết quả:**
   - Tăng throughput 6.25% cho response payloads
   - Tăng throughput 1.77% cho request payloads
   - Giảm latency tới 60% cho các service có payload lớn
   - Không có degradation đáng kể so với JSON

5. **Kế hoạch tương lai:**
   - Chuyển dần từ Rest.li sang gRPC
   - Tận dụng các tính năng mới như streaming
   - Tận dụng cộng đồng open source lớn của gRPC

## [Story: Redis and its creator antirez](https://blog.brachiosoft.com/en/posts/redis/)

Bài viết kể về câu chuyện thú vị của Redis và người sáng tạo Salvatore Sanfilippo (antirez). Đây là một câu chuyện về sự đổi mới và tầm nhìn trong thế giới công nghệ.

Một số điểm chính:

1. **Con đường đến với lập trình:**
   - Bắt đầu với máy tính TI99/4A từ khi 6 tuổi
   - Học BASIC từ cha, một kỹ sư điện
   - Tạm dừng lập trình ở tuổi 14 để theo đuổi sở thích khác
   - Quay lại với lập trình ở tuổi 18-19

2. **Thời gian ở SECLAB:**
   - Phát hiện lỗ hổng trong chương trình ping
   - Được mời làm việc tại công ty bảo mật
   - Sáng tạo ra công cụ hping
   - Rời đi sau 6 tháng để trở về Sicily

3. **Sự ra đời của Redis:**
   - Bắt đầu từ dự án LLOOGG - công cụ phân tích web realtime
   - Gặp vấn đề performance với MySQL
   - Viết prototype bằng Tcl (LMDB)
   - Chuyển sang C và phát hành Redis năm 2009

4. **Những người dùng đầu tiên:**
   - GitHub sử dụng để xây dựng Resque
   - Instagram xây dựng toàn bộ hệ thống trên Redis
   - Twitter mời antirez đến HQ để tối ưu timeline

5. **Sự phát triển của Redis:**
   - Được VMware tài trợ
   - Chuyển sang Redis Labs
   - Phát triển thêm nhiều tính năng mới
   - antirez rời dự án năm 2020 sau 10 năm

## [Tracing: structured logging, but better in every way](https://andydote.co.uk/2023/09/19/tracing-is-better/)

Bài viết của Andy Dote phân tích về lý do tại sao tracing tốt hơn logging và cách chuyển đổi từ logging sang tracing. Đây là một góc nhìn thú vị về observability trong phát triển phần mềm.

Một số điểm chính:

1. **Vấn đề với Logging:**
   - Log levels không có ý nghĩa rõ ràng
   - Messages khó query và phân tích
   - Mixed outputs gây khó khăn cho việc xử lý
   - Không có mối quan hệ nhân quả giữa các log lines
   - Timing data không chính xác và nhất quán

2. **Ưu điểm của Tracing:**
   - Tự động có timing data chính xác
   - Có mối quan hệ parent-child giữa các spans
   - Dễ dàng query và phân tích
   - Hỗ trợ distributed tracing
   - Có thể visualize timing graphs

3. **Cách chuyển đổi từ Logging sang Tracing:**
   - Thêm tracer và span cho mỗi method
   - Wrap errors để capture thông tin lỗi
   - Chuyển log messages thành attributes
   - Thêm các attributes quan trọng để filter

4. **Best Practices:**
   - Sử dụng Observability Driven Development
   - Chuyển log messages thành statements
   - Xử lý loops cẩn thận để tránh overwrite attributes
   - Tách logic phức tạp thành các methods riêng

5. **Công cụ và Recommendations:**
   - Honeycomb là lựa chọn tốt nhất để xem traces
   - Lightstep là lựa chọn thứ hai
   - Sử dụng OpenTelemetry để chuẩn hóa tracing

## [Software engineering job openings hit five-year low?](https://newsletter.pragmaticengineer.com/p/software-engineering-job-openings)

Bài viết của Gergely Orosz phân tích về tình trạng việc làm trong ngành công nghệ phần mềm, dựa trên dữ liệu từ Indeed. Đây là một góc nhìn thú vị về tác động của AI và các yếu tố khác đến thị trường việc làm.

Một số điểm chính:

1. **Tình trạng thị trường:**
   - Số lượng việc làm giảm 35% so với 5 năm trước
   - Giảm 3.5 lần so với đỉnh điểm giữa năm 2022
   - Giảm 8% so với năm ngoái
   - Xu hướng tương tự ở nhiều quốc gia (US, UK, France, Germany)

2. **So sánh với các ngành khác:**
   - Tổng số việc làm tăng 10% so với 2020
   - Ngân hàng và tài chính giảm 7%
   - Bán hàng giảm 8%
   - Marketing giảm 19%
   - Công nghệ phần mềm giảm 34%

3. **Nguyên nhân có thể:**
   - Thay đổi lãi suất ảnh hưởng đến startup và VC funding
   - Các công ty Big Tech giảm tuyển dụng
   - Tác động của GenAI và AI tools
   - Các công ty đang "wait and see" về năng suất AI
   - Dư thừa nhân sự từ đợt tuyển dụng 2021-2022

4. **Xu hướng mới:**
   - Các team nhỏ hiệu quả hơn (ví dụ: Linear với 25 kỹ sư)
   - Tuyển dụng chậm và cẩn thận hơn
   - AI tools giúp tăng năng suất
   - Nhiều startup mới được thành lập

5. **Tương lai:**
   - Có thể có sự bùng nổ của các startup "English-to-working-app"
   - Nhiều cơ hội cho developers làm việc với code được tạo bởi AI
   - Thị trường có thể phục hồi khi các công ty thấy rõ lợi ích của AI tools
   - Vẫn còn nhiều cơ hội trong các lĩnh vực mới

## [We switched from Java to Go and don't regret it](https://glasskube.dev/blog/from-java-to-go/)

Bài viết của Philip Miglinci từ Glasskube chia sẻ về kinh nghiệm chuyển đổi từ Java sang Go và những bài học rút ra. Đây là một góc nhìn thú vị về việc lựa chọn công nghệ cho dự án cloud-native.

Một số điểm chính:

1. **Lý do chuyển đổi:**
   - Java/Kotlin tốn nhiều tài nguyên (2GB RAM khi idle)
   - Các công cụ Kubernetes khác hầu hết được viết bằng Go
   - Thời gian khởi động chậm (8.2s vs 100ms)
   - Muốn tối ưu cho môi trường cloud-native

2. **So sánh Compilation & Startup:**
   - Java: JIT compiler, hot code reloading, nhưng tốn nhiều bộ nhớ
   - Go: AOT compiler, single binary, rebuild toàn bộ khi thay đổi
   - Thời gian khởi động Go nhanh hơn nhiều (100ms vs 8.2s)
   - Tiết kiệm thời gian phát triển đáng kể

3. **Frameworks và Libraries:**
   - Java: Frameworks lớn, all-in-one (Spring, Quarkus)
   - Go: Libraries nhỏ, modular, có thể mix & match
   - Go ít "black magic" hơn, dễ hiểu hơn
   - Dependency injection đơn giản hơn với Context

4. **Developer Experience:**
   - Debugging và IDE support tương đương
   - Stack traces trong Java tốt hơn
   - Go có ít công cụ CI/CD hơn nhưng chất lượng cao
   - GoReleaser là công cụ release tốt

5. **Kết luận:**
   - Learning curve không quá dốc
   - Lợi ích rõ ràng: nhanh, nhẹ, đơn giản
   - Phù hợp cho cloud-native và Kubernetes tooling
   - Vẫn có thể quay lại Java cho các dự án khác

## [Secure Java applications: A deep look into 3 different issues](https://developers.redhat.com/articles/2024/11/18/secure-java-applications-deep-look-3-different-issues)

Bài viết của Martin Balao Alonso từ Red Hat phân tích sâu về 3 vấn đề bảo mật phổ biến trong ứng dụng Java. Đây là một góc nhìn thú vị về các lỗ hổng bảo mật và cách phòng tránh.

Một số điểm chính:

1. **Vấn đề về Integral Overflow và Underflow:**
   - Java sử dụng signed two's-complement cho các kiểu số nguyên
   - Compiler ngăn chặn việc gán giá trị ngoài phạm vi
   - Nhưng cho phép overflow trong các phép toán số học
   - Overflow được cho phép vì lý do hiệu suất
   - Developer cần tự kiểm tra và xử lý overflow

2. **Vấn đề về Timing Attack:**
   - Attacker có thể đo thời gian thực thi để đoán giá trị bí mật
   - Các phép so sánh byte-by-byte có thể bị khai thác
   - Cần sử dụng các phương thức so sánh time-constant
   - Ví dụ: `Arrays.equals()` thay vì so sánh từng byte
   - Cần cẩn thận với các phép toán phụ thuộc vào dữ liệu bí mật

3. **Vấn đề về JIT Compilation:**
   - JIT compiler có thể tối ưu code dựa trên dữ liệu runtime
   - Các điều kiện phụ thuộc vào dữ liệu bí mật có thể bị khai thác
   - Cần sử dụng các phương thức time-constant
   - Tránh các phép toán phụ thuộc vào dữ liệu bí mật
   - Có thể sử dụng `-XX:CompileCommand=print` để phân tích code được compile

4. **Best Practices:**
   - Luôn kiểm tra overflow trong các phép toán số học
   - Sử dụng các phương thức so sánh time-constant
   - Tránh các phép toán phụ thuộc vào dữ liệu bí mật
   - Phân tích code được JIT compile
   - Cẩn thận với các tối ưu hóa có thể ảnh hưởng đến bảo mật

5. **Công cụ và Recommendations:**
   - Sử dụng `javac` để kiểm tra type safety
   - Sử dụng `-XX:CompileCommand=print` để phân tích JIT
   - Sử dụng các thư viện bảo mật đã được kiểm chứng
   - Thường xuyên cập nhật JDK và các dependencies
   - Code review kỹ các phần xử lý dữ liệu nhạy cảm

## [Java Devs Rejoice! This Open-Source Secret Weapon Will Cut Your Coding Time in Half](https://www.indiehackers.com/post/java-devs-rejoice-this-open-source-secret-weapon-will-cut-your-coding-time-in-half-a7869a56de)

Bài viết của Brett Hoffman giới thiệu về esProc SPL - một công cụ xử lý dữ liệu mã nguồn mở cho Java. Đây là một giải pháp thú vị để tăng tốc độ phát triển và xử lý dữ liệu trong ứng dụng Java.

Một số điểm chính:

1. **Vấn đề với Java và SQL:**
   - Java code xử lý dữ liệu phức tạp và dài dòng
   - SQL đơn giản nhưng bị giới hạn bởi database
   - Khó xử lý dữ liệu khi không có database
   - Khó thực hiện cross-database computations

2. **Giải pháp với esProc SPL:**
   - Cú pháp đơn giản như SQL
   - Hỗ trợ xử lý dữ liệu độc lập với database
   - Tích hợp dễ dàng vào ứng dụng Java
   - Hỗ trợ hot-swapping

3. **Tính năng nổi bật:**
   - Cú pháp ngắn gọn cho các phép toán phức tạp
   - Hỗ trợ xử lý dữ liệu lớn (in-memory và external memory)
   - Dễ dàng thực hiện parallel processing
   - IDE với debugging và WYSIWYG result viewing

4. **Tích hợp với Java:**
   - Có thể nhúng vào ứng dụng Java qua JDBC
   - Hỗ trợ các framework Java phổ biến
   - Phù hợp với kiến trúc microservice
   - Có thể chạy trên Android

5. **Ưu điểm so với các giải pháp khác:**
   - Đơn giản hơn Stream API của Java
   - Nhẹ hơn Kotlin và Scala
   - Hỗ trợ hot-swapping (khác với Java)
   - Có thể xử lý nhiều nguồn dữ liệu khác nhau

## Bonus: Vài video hay ho đến từ [Inside Java](https://inside.java/)

[Garbage Collection in Java - The progress since JDK 8](https://inside.java/2025/02/15/devoxxbelgium-gc-progress/)

---

*Bài viết đã được review và cập nhật bởi Claude Code với Opus 4.7 (1M context).*
