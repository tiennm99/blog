---
title: "Newsletter #9"
date: 2025-04-01
tags: ["AI-Assisted", "Newsletter", "Infrastructure", "Java", "Go", "Redis", "Observability"]
categories: [ "Newsletter" ]
---

*Mời bạn thưởng thức Newsletter \#9.*

## [To avoid being replaced by LLMs, do what they can't](https://www.seangoedecke.com/what-llms-cant-do/)

Sean Goedecke đưa ra lời khuyên cho kỹ sư phần mềm trước viễn cảnh các mô hình ngôn ngữ lớn (LLM) ngày càng giỏi viết mã nguồn, chia theo ba mốc thời gian. Trước mắt, hãy tận dụng tối đa công cụ AI, hiểu nguyên lý hoạt động của mô hình ngôn ngữ để có thể tham gia các dự án AI, đồng thời cố gắng thăng tiến, vì nhiều khả năng các vị trí junior sẽ bị thay thế trước. Tác giả cho rằng giai đoạn này có thể kéo dài ít nhất năm năm, bởi các doanh nghiệp lớn không thay đổi nhanh đến vậy.

Ở trung hạn, tác giả khuyên nên dấn thân vào mã nguồn cũ (legacy code) trong các hệ thống lớn. LLM hiện mạnh nhất ở lập trình thi đấu, nơi bài toán rõ ràng, phạm vi hẹp, dễ kiểm chứng và lượng mã ít; còn phát triển tính năng trong hệ thống lâu đời thì ngược lại: yêu cầu mơ hồ, khó kiểm chứng và khối lượng mã lên tới hàng triệu dòng. Để làm tốt việc này, LLM cần giải quyết bài toán ngữ cảnh lớn, cần bộ đánh giá (eval) tốt hơn, trong khi dữ liệu liên quan lại nằm rải rác trong kho riêng của từng công ty. Về dài hạn, điều LLM khó thay thế nhất là trách nhiệm: kỹ sư được tin tưởng vì họ phải gánh hậu quả nếu làm sai, còn LLM không có gì để đánh đổi. Vì vậy, các công ty vẫn sẽ cần ít nhất một kỹ sư để giám sát LLM và biến kế hoạch của chúng thành những cam kết mà con người có thể tin cậy.

## [How Instagram Scaled Its Infrastructure To Support a Billion Users](https://blog.bytebytego.com/p/how-instagram-scaled-its-infrastructure)

Bài viết của ByteByteGo tổng hợp hành trình Instagram mở rộng hạ tầng, từ một ứng dụng chia sẻ ảnh với 13 nhân viên chạy trên AWS thành nền tảng hơn một tỷ người dùng. Thời kỳ đầu, đội ngũ phải thêm máy chủ thủ công trước mỗi dịp cuối tuần, cơ sở dữ liệu thường xuyên quá tải, còn việc giám sát và cân bằng tải đều chưa được tự động hóa. Sau khi về với Facebook, Instagram chuyển sang trung tâm dữ liệu của Facebook và mở rộng theo ba hướng: mở rộng theo chiều ngang (thêm máy chủ và trung tâm dữ liệu), tối ưu hiệu năng từng máy chủ (gộp truy vấn, dùng bộ nhớ đệm, viết lại các hàm Python tốn CPU bằng C++), và mở rộng đội ngũ kỹ sư nhờ triển khai liên tục hơn 40 lần mỗi ngày.

Về kiến trúc, Django xử lý yêu cầu, RabbitMQ và Celery đảm nhận các tác vụ bất đồng bộ như gửi thông báo, PostgreSQL lưu dữ liệu có cấu trúc cần tính nhất quán cao, Cassandra lưu dữ liệu phân tán như bảng tin và nhật ký hoạt động, Memcached làm bộ nhớ đệm, còn Haystack lưu ảnh và video. Một kỹ thuật đáng chú ý là cơ chế Memcache Lease để chống hiện tượng thundering herd: khi dữ liệu trong bộ nhớ đệm hết hạn, chỉ máy chủ đầu tiên nhận được "lease" mới được truy vấn cơ sở dữ liệu, các máy chủ khác phải chờ hoặc dùng tạm giá trị cũ. Quy trình triển khai gồm đánh giá mã nguồn, kiểm thử tự động, triển khai thử (canary) trên một nhóm nhỏ máy chủ và theo dõi mức sử dụng CPU tới từng hàm.

## [The State of Scala & Clojure Surveys](https://www.jvm-weekly.com/p/the-state-of-scala-and-clojure-surveys)

Artur Skowronski (JVM Weekly) điểm qua hai khảo sát gần đây về Scala và Clojure. Khảo sát Scala do VirtusLab thực hiện cuối năm 2024 với 232 người tham gia cho thấy 93,1% thích hoặc yêu Scala, nhưng tuổi trung bình của dự án đã là 7 năm, nghĩa là phần lớn là hệ thống cũ. Các hệ sinh thái phổ biến là Typelevel (41,8%), Akka (35,3%) và ZIO (23,3%), và 53% dự án kết hợp nhiều hệ sinh thái; mới có 22,4% dự án thương mại chuyển sang Scala 3. Ba vấn đề lớn nhất là thời gian biên dịch chậm, hệ sinh thái phân mảnh khiến việc nâng cấp lên Scala 3 khó khăn, và thiếu nguồn lực bảo trì dự án cũ. Tuyển dụng cũng là nỗi đau: 56,5% không biết tìm lập trình viên Scala ở đâu và 23,2% công ty đang cân nhắc chuyển sang Kotlin, Rust hoặc Go, dù 88,4% vẫn sẽ chọn Scala cho dự án mới.

Với Clojure, khảo sát State of Clojure 2024 cho thấy 73% người tham gia dùng ngôn ngữ này trong công việc, chủ yếu cho phát triển web và ứng dụng doanh nghiệp; 58% đã lên Clojure 1.12 và 54% chạy trên Java 21 LTS. Điểm mới là phần về các phương ngữ (dialect) của Clojure: Babashka rất được ưa chuộng nhờ chạy tập lệnh nhanh mà không phải chờ JVM khởi động, ClojureDart đưa Clojure sang hệ sinh thái Dart cho web và di động, bên cạnh các dự án thử nghiệm như Squint, Jank và Cherry. Với người mới, thử thách lớn nhất vẫn là hiểu macro và tính đồng tượng (homoiconicity).

## [LinkedIn Integrates Protocol Buffers With Rest.li for Improved Microservices Performance](https://www.linkedin.com/blog/engineering/infrastructure/linkedin-integrates-protocol-buffers-with-rest-li-for-improved-m)

Karthik Ramgopal và Aman Gupta chia sẻ cách LinkedIn thay JSON bằng Protocol Buffers (Protobuf) làm định dạng tuần tự hóa mặc định cho Rest.li, framework REST mã nguồn mở của họ với hơn 50.000 điểm cuối API đang chạy thực tế. JSON dễ đọc và được nhiều ngôn ngữ hỗ trợ, nhưng là định dạng văn bản nên dung lượng lớn, tốn băng thông, và việc tuần tự hóa lẫn giải tuần tự hóa chậm, trở thành điểm nghẽn hiệu năng. Sau khi đánh giá nhiều lựa chọn như Flatbuffers, Cap'n'Proto, MessagePack, CBOR hay Kryo, nhóm chọn Protobuf vì nó đáp ứng tốt nhất các tiêu chí: gói tin nhỏ gọn, tuần tự hóa nhanh và hỗ trợ đủ các ngôn ngữ LinkedIn đang dùng.

Khó khăn là mô hình dữ liệu PDL của Rest.li không có số thứ tự trường như Protobuf yêu cầu. Nhóm giải quyết bằng bảng ký hiệu (symbol table) ánh xạ hai chiều giữa tên trường và số nguyên: dịch vụ tự sinh bảng này khi khởi động, phía máy khách lấy về rồi lưu vào bộ nhớ đệm; riêng với ứng dụng web và di động, bảng được sinh lúc biên dịch theo kiểu chỉ thêm, không xóa. Việc chuyển đổi được bật dần qua cấu hình phía máy khách. Kết quả là thông lượng trung bình tăng 6,25% với phản hồi và 1,77% với yêu cầu, độ trễ giảm tới 60% với các dịch vụ có gói tin lớn, và không dịch vụ nào chậm đi đáng kể. Bước tiếp theo của LinkedIn là chuyển dần từ Rest.li sang gRPC.

## [Story: Redis and its creator antirez](https://blog.brachiosoft.com/en/posts/redis/)

Bài viết của Brachiosoft kể lại hành trình của Salvatore Sanfilippo (antirez), cha đẻ của Redis. Lớn lên ở Sicily, antirez làm quen với máy tính TI99/4A từ năm sáu tuổi và học BASIC theo cha. Sau vài năm gác lại lập trình ở tuổi thiếu niên, anh quay lại khi 18–19 tuổi, tự học C và phát hiện một lỗ hổng trong chương trình ping. Bài công bố trên Bugtraq giúp anh được công ty bảo mật SECLAB ở Milan mời về làm việc; tại đây anh nghĩ ra kỹ thuật Idle Scan và viết công cụ hping, rồi rời đi sau sáu tháng để trở về Sicily.

Redis ra đời từ LLOOGG, công cụ phân tích lượt truy cập web theo thời gian thực mà antirez ra mắt năm 2007. MySQL không theo kịp vì mọi thao tác đều phải đọc ghi ổ cứng, nên anh viết một nguyên mẫu cơ sở dữ liệu trong bộ nhớ bằng Tcl tên LMDB, rồi viết lại bằng C và công bố Redis năm 2009. Phản hồi ban đầu trên Hacker News khá lạnh nhạt, nhưng Redis sớm có những người dùng quan trọng: GitHub dùng nó để xây dựng hàng đợi tác vụ Resque, Instagram xây dựng hệ thống hoàn toàn dựa trên Redis, còn Twitter nhiều lần mời antirez tới trụ sở để làm giải pháp dòng thời gian (timeline). Sau đó VMware tài trợ để anh toàn tâm phát triển Redis, rồi anh chuyển sang Pivotal và Redis Labs. Năm 2020, sau hơn mười năm gắn bó, antirez rời vai trò bảo trì vì mệt mỏi khi phải giằng co giữa việc giữ mã nguồn đẹp như một tác phẩm nghệ thuật và nhu cầu thực tế của cộng đồng người dùng khổng lồ.

## [Tracing: structured logging, but better in every way](https://andydote.co.uk/2023/09/19/tracing-is-better/)

Andy Dote giải thích vì sao ông cho rằng tracing tốt hơn logging ở mọi mặt, và cách chuyển dần từ log sang trace. Theo tác giả, mức log (debug, info, warning…) thường vô nghĩa; thông điệp dạng văn bản buộc phải tìm kiếm toàn văn vốn rất chậm; đầu ra log bị trộn lẫn với nội dung in ra màn hình; các dòng log không có quan hệ nhân quả với nhau; còn dữ liệu thời gian phải tự đo thủ công nên thiếu nhất quán. Trace thì ngược lại: mỗi span tự có thời điểm bắt đầu, kết thúc và thời lượng, có quan hệ cha–con, có thể truyền qua nhiều dịch vụ để truy vết phân tán, và giúp dễ dàng vẽ biểu đồ thời gian hay trả lời các câu hỏi dạng phủ định như "những yêu cầu nào không tìm thấy người dùng trong bộ nhớ đệm".

Phần thực hành dùng một ví dụ Go với OpenTelemetry qua ba bước: thêm tracer và mở span cho mỗi hàm, bọc lỗi để ghi nhận trạng thái và sự kiện lỗi trên span, rồi thay các thông điệp log bằng thuộc tính có thể lọc được, ví dụ "found user in cache" trở thành `user_in_cache: true`. Mã nguồn sau khi chuyển dài hơn vài dòng nhưng chứa nhiều thông tin hơn hẳn. Tác giả cũng khuyên với vòng lặp nên tách thân vòng lặp thành hàm riêng hoặc ghi thông tin tổng hợp sau vòng lặp để tránh ghi đè thuộc tính, áp dụng phát triển hướng quan sát (Observability Driven Development), và dùng Honeycomb (hoặc Lightstep) để xem trace.

## [Software engineering job openings hit five-year low?](https://newsletter.pragmaticengineer.com/p/software-engineering-job-openings)

Gergely Orosz phân tích dữ liệu từ Indeed cho thấy số tin tuyển lập trình viên hiện chỉ bằng 65% so với tháng 1/2020, thấp hơn 3,5 lần so với đỉnh giữa năm 2022 và giảm 8% so với một năm trước. Xu hướng tương tự xuất hiện ở Canada, Anh, Pháp và Đức; chỉ riêng Úc là chưa thấp hơn mức năm 2020. Trong khi tổng số tin tuyển dụng trên Indeed tăng 10% so với năm 2020, mảng phát triển phần mềm giảm 34%, mạnh hơn nhiều so với tiếp thị (-19%), bán hàng (-8%) hay ngân hàng và tài chính (-7%).

Tác giả đưa ra nhiều nguyên nhân có thể: lãi suất tăng, chấm dứt thời kỳ lãi suất 0%, là yếu tố chính, kéo theo vốn đầu tư mạo hiểm sụt giảm; các công ty vẫn còn dư nhân sự sau đợt tuyển ồ ạt 2021–2022; nhiều doanh nghiệp chọn "chờ xem" hiệu quả của công cụ GenAI trước khi tuyển thêm, như Salesforce giữ nguyên số kỹ sư vì năng suất tăng 30% nhờ AI; và các nhóm nhỏ tỏ ra hiệu quả, như Linear với 25 kỹ sư hay Bluesky với 13 kỹ sư. Ông cũng lưu ý dữ liệu Indeed có thể chưa phản ánh đầy đủ việc tuyển dụng ở startup và Big Tech. Về tương lai, có vài kịch bản: các nhóm nhỏ làm việc năng suất hơn và nhiều startup ra đời; sự bùng nổ của các dịch vụ biến mô tả bằng tiếng Anh thành ứng dụng chạy được; hoặc phần mềm do người không chuyên tạo ra bằng AI sẽ mở thêm cơ hội cho lập trình viên khi các dự án đó cần phát triển và bảo trì.

## [We switched from Java to Go and don't regret it](https://glasskube.dev/blog/from-java-to-go/)

Philip Miglinci từ Glasskube kể lại việc đội ngũ chuyển từ Java/Kotlin sang Go. Dù nhiều năm gắn bó với Java và Spring, khi làm công cụ cho Kubernetes nhóm nhận ra các operator khác (phần lớn viết bằng Go) gần như không tốn tài nguyên, trong khi operator viết bằng Kotlin của họ cùng các công cụ đi kèm chiếm hơn 2 GB RAM ngay cả khi rảnh. Vì vậy, họ viết lại trình quản lý gói bằng Go, rồi chọn Go cho Distr, nền tảng phân phối phần mềm mã nguồn mở và cũng là ứng dụng web Go đầu tiên của nhóm.

Bài viết so sánh hai hệ sinh thái trên nhiều khía cạnh. Java dùng trình biên dịch JIT, hỗ trợ biên dịch tăng dần và nạp lại mã khi đang chạy nhưng Gradle hay Maven khá ngốn bộ nhớ, còn Go biên dịch AOT ra một tệp thực thi duy nhất; một ứng dụng Spring Boot nhẹ mất khoảng 8,2 giây để khởi động, trong khi máy chủ Go sẵn sàng trong chưa đầy 100 mili giây. Java thiên về các framework toàn diện như Spring hay Quarkus, còn Go chuộng các thư viện nhỏ, kết hợp linh hoạt, ít "ma thuật đen" hơn, không có cơ chế tiêm phụ thuộc kiểu Spring mà truyền dữ liệu qua Context. Khả năng gỡ lỗi và hỗ trợ IDE gần như tương đương, dù stack trace bên Java dễ theo dõi hơn; về công cụ phát hành, GoReleaser được đánh giá cao. Tác giả kết luận Go phù hợp cho ứng dụng cloud-native và công cụ Kubernetes, dù Java vẫn là lựa chọn tốt cho một số dự án khác.

## [Secure Java applications: A deep look into 3 different issues](https://developers.redhat.com/articles/2024/11/18/secure-java-applications-deep-look-3-different-issues)

Martin Balao Alonso (Red Hat) phân tích ba vấn đề có thể làm tổn hại tính bí mật, toàn vẹn hoặc sẵn sàng của dữ liệu trong ứng dụng Java. Thứ nhất là tràn số nguyên: các kiểu số nguyên của Java là số có dấu dạng bù hai, trình biên dịch `javac` chặn việc gán giá trị vượt phạm vi nhưng không báo lỗi khi phép tính số học bị tràn, vì cho phép tràn giúp chương trình chạy hiệu quả hơn. Khi chấp nhận được chi phí, nên dùng họ phương thức `Math::xxxExact` hoặc `BigInteger` để phát hiện hay ngăn tràn số.

Thứ hai là cấp phát tài nguyên theo dữ liệu đầu vào không đáng tin cậy: nếu máy chủ cấp phát bộ đệm ngay theo kích thước khai báo trong phần đầu thông điệp, kẻ tấn công có thể làm cạn bộ nhớ với chi phí rất nhỏ; vì vậy nên cấp phát dần theo từng phần và giới hạn số kết nối từ một máy khách. Thứ ba là tấn công thời gian (timing attack) liên quan tới trình thông dịch và trình biên dịch JIT: thời gian thực thi không được phụ thuộc vào bí mật, nhưng ngay cả một phép so sánh đơn giản cũng tạo ra các đường thực thi dài ngắn khác nhau, và kẻ tấn công còn có thể tác động tới dữ liệu thống kê của trình biên dịch C2 để gây ra khử tối ưu (deoptimization), từ đó làm lộ bí mật. Giải pháp tác giả đề xuất là dùng các phép toán bit như XOR để phép so sánh chạy trong thời gian không đổi, đồng thời phân tích kỹ mã máy mà JIT sinh ra.

## [Java Devs Rejoice! This Open-Source Secret Weapon Will Cut Your Coding Time in Half](https://www.indiehackers.com/post/java-devs-rejoice-this-open-source-secret-weapon-will-cut-your-coding-time-in-half-a7869a56de)

Brett Hoffman giới thiệu esProc SPL, ngôn ngữ xử lý dữ liệu mã nguồn mở viết hoàn toàn bằng Java. Bài viết mở đầu bằng một thế khó quen thuộc: viết logic xử lý dữ liệu bằng Java thì dài dòng (một phép gom nhóm và tổng hợp theo hai trường đã cần cả đoạn mã), còn SQL thì ngắn gọn nhưng gắn chặt với cơ sở dữ liệu, khó mở rộng và di chuyển. Stream của Java 8, Kotlin hay Scala đều cố thu hẹp khoảng cách nhưng vẫn kém xa SQL về độ gọn; thêm vào đó, Java là ngôn ngữ biên dịch nên mỗi lần thay đổi đều phải biên dịch và triển khai lại.

Theo tác giả, SPL giải quyết được cả hai vấn đề: cú pháp ngắn gọn ngang SQL, thậm chí gọn hơn với các phép tính phức tạp như tìm số ngày tăng giá liên tiếp dài nhất của một cổ phiếu chỉ trong một dòng; khả năng tính toán độc lập với cơ sở dữ liệu; IDE hỗ trợ gỡ lỗi từng bước và xem kết quả trực quan; xử lý được dữ liệu lớn cả trong bộ nhớ lẫn bộ nhớ ngoài, và song song hóa chỉ bằng tùy chọn `@m`. SPL được nhúng vào ứng dụng Java qua JDBC, đủ nhẹ để chạy trên Android và làm bộ máy tính toán trong kiến trúc microservice. Ngoài ra, SPL kết nối được nhiều nguồn dữ liệu khác nhau như cơ sở dữ liệu, RESTful, tệp hay JSON để tính toán kết hợp, và vì là ngôn ngữ thông dịch nên hỗ trợ thay mã khi đang chạy (hot-swapping) mà không cần khởi động lại dịch vụ.

## Bonus: Vài video hay ho đến từ [Inside Java](https://inside.java/)

[Garbage Collection in Java - The progress since JDK 8](https://inside.java/2025/02/15/devoxxbelgium-gc-progress/)

---

*Bài viết đã được viết lại bởi Claude Code với Opus 5.5 vào ngày 27/09/2026.*
