---
title: "Newsletter #8"
date: 2025-03-24
tags: ["AI-Assisted", "Newsletter", "Distributed Systems", "Databases", "Microservices", "Infrastructure", "System Design"]
categories: [ "Newsletter" ]
---

*Mời bạn thưởng thức Newsletter \#8.*

## [Let's deadlock all the things](https://info.michael-simons.eu/2025/02/05/lets-deadlock-all-the-things/)

Michael J. Simons kể lại một lỗi "sơ đẳng" mà ông mắc phải khi chuyển mã nguồn từ `HttpURLConnection` cũ sang `HttpClient` của Java. Vì `HttpClient` không cung cấp sẵn một output stream để ghi thẳng vào thân request (chẳng hạn khi dùng Jackson ghi một JSON lớn), ông ghép cặp `PipedInputStream` và `PipedOutputStream` rồi để việc ghi và đọc diễn ra trên cùng một luồng, dù JavaDoc đã cảnh báo rõ cách làm này có thể gây deadlock. Các bài kiểm thử ban đầu vẫn chạy ổn vì dữ liệu nhỏ, nhưng khi dữ liệu gửi đi vượt quá bộ đệm mặc định 1024 byte, luồng bị treo; lặp lại đủ nhiều lần, hệ thống sẽ bị vắt kiệt toàn bộ luồng.

Theo tác giả, điều có thể ngăn lỗi này là bớt tự tin thái quá, có thêm một người xem lại mã nguồn và kiểm thử kỹ các trường hợp biên. AI có lẽ giúp sinh dữ liệu kiểm thử nhưng khó phát hiện việc dùng sai API, và ngay cả IntelliJ cũng không cảnh báo. Giải pháp cuối cùng là tạo hai stream độc lập, kết nối chúng bên ngoài cả luồng đọc lẫn luồng ghi, thực hiện việc ghi trên một virtual thread riêng và đóng output stream ngay trong luồng đó. Đây là bài học hữu ích cho lập trình viên mới về việc đọc kỹ tài liệu và hiểu mô hình luồng của API mình sử dụng.


## [Engineers who won't commit](https://www.seangoedecke.com/taking-a-position/)

Sean Goedecke cho rằng thái độ lưng chừng, không chọn phe trong các cuộc thảo luận kỹ thuật chỉ chấp nhận được khi bạn còn là kỹ sư mới vào nghề. Khi đã là người nắm nhiều bối cảnh, kỹ năng hoặc tầm ảnh hưởng nhất trong phòng họp, bạn cần đưa ra quan điểm, kể cả khi chỉ tự tin khoảng 55–60%. Nếu im lặng, bạn buộc những người ít hiểu biết hơn phải đoán mò, tạo cơ hội cho người yếu nhất nhưng nói to nhất kéo cả nhóm theo một ý tưởng tồi, và cuối cùng đẩy các quyết định kỹ thuật khó sang cho quản lý. Tác giả thẳng thắn gọi thái độ này là hèn nhát, bắt nguồn từ nỗi sợ bị sai mà chính ông cũng từng phải vượt qua.

Theo ông, quản lý thường khá rộng lượng khi bạn đưa ra một nhận định hợp lý nhưng sai, miễn là bạn không sai quá thường xuyên. Việc né tránh ước lượng thời gian cũng tương tự: quản lý cần một con số sơ bộ để lập kế hoạch, và câu trả lời "còn tùy" chỉ khiến họ phải tự đoán. Ngoại lệ là những môi trường độc hại, nơi kỹ sư bị trừng phạt vì ước lượng không chính xác; ở đó việc giữ im lặng là dễ hiểu. Ông cũng lưu ý rằng khi trao đổi với đồng nghiệp có cùng bối cảnh, bạn hoàn toàn có thể giữ thái độ cởi mở.


## [Patterns for building realtime features](https://zknill.io/posts/patterns-for-building-realtime/)

Zak Knill tổng hợp bốn mẫu thiết kế phổ biến để xây dựng tính năng thời gian thực, vốn đòi hỏi máy chủ chủ động gửi thay đổi của một người dùng tới những người dùng khác. Mẫu poke/pull dễ tích hợp nhất: máy chủ chỉ "chọc" các client để chúng tự gọi lại API lấy trạng thái mới, nhưng dễ khiến nhiều client cùng dồn yêu cầu về máy chủ, có thể giảm nhẹ bằng bộ nhớ đệm hoặc giãn thời điểm gửi. Push state gửi thẳng toàn bộ trạng thái mới nên client khó bị lệch, nhưng không mở rộng tốt khi trạng thái lớn và client khó biết chính xác điều gì đã thay đổi. Push ops chỉ gửi thao tác thay đổi (như cập nhật trường `completed` của một việc cần làm) nên gọn nhẹ hơn, nhưng cần cơ chế lấy trạng thái ban đầu và đòi hỏi máy chủ nắm đúng trạng thái của client. Event sourcing gửi chính sự kiện đã xảy ra, buộc mỗi client tự cài đặt logic nghiệp vụ để diễn giải sự kiện đó.

Về tầng vận chuyển, WebSocket, SSE hay polling đều hoạt động theo từng cặp một client với một máy chủ qua HTTP. Khi hệ thống mở rộng theo chiều ngang với nhiều bản sao máy chủ, máy chủ nhận thay đổi thường không phải máy chủ đang giữ kết nối của các client cần nhận cập nhật. Thay vì để mỗi bản sao liên tục thăm dò cơ sở dữ liệu, tác giả gợi ý dùng các dịch vụ Pub/Sub để đảm nhận phần hạ tầng kết nối và phân phối dữ liệu.


## [Optimizing the databases at Quora](https://quoraengineering.quora.com/Optimizing-the-databases-at-Quora)

Đội ngũ kỹ sư Quora chia sẻ quá trình tối ưu hóa cơ sở dữ liệu khi hệ thống ngày càng lớn, phải xử lý lượng dữ liệu khổng lồ mà vẫn bảo đảm hiệu năng cho người dùng. Chiến lược đầu tiên là phân mảnh dữ liệu (sharding) theo `user_id` để chia tải lên nhiều máy chủ cơ sở dữ liệu. Song song đó, nhóm phân tích các truy vấn phổ biến, bổ sung chỉ mục phù hợp và loại bỏ những truy vấn thừa. Quora cũng xây dựng nhiều lớp bộ nhớ đệm, từ tầng ứng dụng cho dữ liệu hay được truy cập, tầng cơ sở dữ liệu cho kết quả truy vấn phổ biến, đến Memcached làm bộ nhớ đệm phân tán, đồng thời tách riêng luồng đọc và luồng ghi để mở rộng từng phía một cách độc lập.

Bên cạnh các kỹ thuật trên, Quora đầu tư vào hệ thống giám sát và cảnh báo toàn diện để theo dõi hiệu năng cơ sở dữ liệu và phát hiện sớm sự cố. Bài học rút ra là tối ưu hóa hiệu năng cần được làm thường xuyên, nên xây dựng công cụ tự động hóa cho việc quản trị cơ sở dữ liệu, và luôn giữ cân bằng giữa hiệu năng với sự đơn giản của hệ thống.


## [Failure Mitigation for Microservices: An Intro to Aperture](https://careersatdoordash.com/blog/failure-mitigation-for-microservices-an-intro-to-aperture/)
Cong Ma và Matt Ranney từ DoorDash phân tích các kiểu sự cố thường gặp trong hệ thống microservices: lỗi dây chuyền lan từ dịch vụ này sang dịch vụ khác, "bão thử lại" (retry storm) khi các lần thử lại dồn thêm áp lực lên một dịch vụ đang suy giảm, "vòng xoáy tử thần" (death spiral) khi vài node gặp sự cố khiến lưu lượng dồn sang các node còn lại, và lỗi siêu ổn định (metastable failure) không thể tự phục hồi do vòng phản hồi dương. Các biện pháp quen thuộc như load shedding, circuit breaker hay tự động mở rộng đều chỉ nhìn thấy trạng thái cục bộ của từng dịch vụ, khó chọn ngưỡng cấu hình và không phối hợp được với nhau; nhóm tác giả còn khuyên nên mở rộng theo dự đoán thay vì phản ứng khi tải đã tăng.

Từ đó, bài viết đánh giá Aperture, dự án mã nguồn mở của FluxNinja giúp quản lý độ tin cậy theo góc nhìn toàn cục. Aperture thu thập số liệu từ từng node vào Prometheus, dùng một bộ điều khiển chạy độc lập để theo dõi độ lệch so với SLO theo các chính sách viết bằng YAML, rồi kích hoạt hành động như load shedding hoặc giới hạn tốc độ phân tán tại từng node. Khi tích hợp thử vào một dịch vụ chính trong môi trường kiểm thử, DoorDash thấy Aperture hoạt động như một bộ load shedder hiệu quả, dễ cấu hình hơn các giải pháp hiện có; những tính năng nâng cao như phối hợp giảm thiểu sự cố giữa nhiều dịch vụ thì vẫn chưa được thử nghiệm.


## [Zero Configuration Service Mesh with On-Demand Cluster Discovery](https://netflixtechblog.com/zero-configuration-service-mesh-with-on-demand-cluster-discovery-ac6483b52a51)
Đội ngũ Netflix kể lại hành trình chuyển sang service mesh. Netflix bắt đầu chuyển lên đám mây từ năm 2008 và chạy hoàn toàn trên AWS từ năm 2010, khi hầu hết công cụ cloud-native còn chưa tồn tại, nên họ tự xây dựng Eureka để khám phá dịch vụ và Ribbon cho giao tiếp giữa các tiến trình (IPC). Kiến trúc này phục vụ tốt suốt một thập kỷ, nhưng khi lưu lượng nội bộ pha trộn REST, GraphQL, gRPC trên nhiều ngôn ngữ, cùng nhu cầu về các tính năng như giới hạn đồng thời thích ứng hay circuit breaking, việc duy trì thư viện riêng cho từng ngôn ngữ trở nên tốn kém. Service mesh với Envoy làm proxy cho phép tập trung các tính năng IPC vào một nơi.

Trở ngại lớn là Envoy yêu cầu khai báo trước mọi cluster mà dịch vụ cần gọi, trong khi mỗi dịch vụ có thể giao tiếp với hàng chục cluster và chủ dịch vụ thường không nắm rõ danh sách này; còn đẩy toàn bộ cluster tới mọi proxy thì không khả thi vì có tới hàng triệu endpoint. Netflix hợp tác với Kinvolk và cộng đồng Envoy xây dựng tính năng On-Demand Cluster Discovery: khi request tới một cluster chưa biết, Envoy tạm dừng request, hỏi control plane qua CDS, lấy endpoint qua EDS dựa trên dữ liệu Eureka rồi tiếp tục xử lý. Nhờ vậy việc chuyển đổi không cần cấu hình gì thêm, đổi lại request đầu tiên tới mỗi cluster chậm thêm vài mili giây, nên các dịch vụ cực kỳ nhạy độ trễ phải khai báo trước cluster hoặc làm nóng kết nối.


## [The Quest to Understand Metric Movements](https://medium.com/pinterest-engineering/the-quest-to-understand-metric-movements-8ab12ae97cda)
Đội ngũ Pinterest giới thiệu ba cách tiếp cận làm nền tảng cho hệ thống phân tích nguyên nhân gốc rễ (RCA) khi một chỉ số quan trọng tăng hoặc giảm bất thường, vốn có thể bắt nguồn từ bất cứ đâu, từ bản nâng cấp hệ điều hành đến lỗi đường ống dữ liệu. Cách thứ nhất, Slice and Dice, chia chỉ số theo các chiều như quốc gia, loại thiết bị, loại Pin thành một cây phân đoạn (lấy cảm hứng từ ThirdEye của LinkedIn) rồi chấm điểm mức độ bất thường của từng phân đoạn; cách này đặc biệt hiệu quả với các chỉ số video. Cách thứ hai, General Similarity, tìm những chỉ số khác biến động tương tự trong cùng khoảng thời gian dựa trên tương quan Pearson, tương quan hạng Spearman, độ tương đồng Euclid và dynamic time warping, trong đó hai phép tương quan đầu tỏ ra hữu ích nhất vì tính được p-value và thể hiện tốt quan hệ ngược chiều. Tuy vậy, tương quan không đồng nghĩa với nhân quả.

Cách thứ ba, Experiment Effects, làm ngược quy trình A/B testing: với một chỉ số cho trước, hệ thống xếp hạng các thử nghiệm tác động mạnh nhất tới nó bằng Welch's t-test kèm các bộ lọc nhiễu, và đã được tích hợp với nền tảng thử nghiệm để bao phủ gần 2000 chỉ số. Ba cách này có thể kết hợp lặp lại để thu hẹp dần phạm vi tìm kiếm. Sắp tới, Pinterest muốn bổ sung cơ chế phản hồi từ người dùng, khai thác causal discovery để tìm quan hệ nhân quả giữa các chỉ số, và đưa RCA vào các công cụ khám phá, trực quan hóa dữ liệu.


## [Meta's Hyperscale Infrastructure: Overview and Insights](https://cacm.acm.org/research/metas-hyperscale-infrastructure-overview-and-insights/)
Chunqiang Tang tổng quan cơ sở hạ tầng hyperscale của Meta cùng những bài học rút ra, với lập luận rằng dù ít kỹ sư trực tiếp xây dựng hạ tầng ở quy mô này, nhiều công nghệ phổ biến ngày nay đều khởi nguồn từ đó. Văn hóa kỹ thuật của Meta xoay quanh bốn điểm: phát triển nhanh với triển khai liên tục, cởi mở công nghệ với monorepo và các dự án mã nguồn mở như PyTorch, Llama, Presto, nghiên cứu ngay trên hệ thống thật thay vì có phòng nghiên cứu riêng, và chuẩn hóa hạ tầng dùng chung (chẳng hạn các sản phẩm đều hội tụ về ZippyDB làm kho key-value). Để tăng năng suất, Meta đẩy triển khai liên tục lên quy mô cực lớn với hơn 100.000 thay đổi cấu hình mỗi ngày và 97% dịch vụ triển khai hoàn toàn tự động, trong khi số kỹ sư viết serverless function nhiều hơn khoảng 50% so với số người viết dịch vụ truyền thống.

Để giảm chi phí phần cứng, Meta coi toàn bộ trung tâm dữ liệu trên thế giới như một cỗ máy duy nhất, tự động phân bổ và di chuyển tải giữa các khu vực, kết hợp thiết kế phần cứng với phần mềm để bù đắp giới hạn của phần cứng giá rẻ, và phân tầng lưu trữ theo dữ liệu nóng, ấm, lạnh. Về AI, Meta đồng thiết kế toàn bộ ngăn xếp từ PyTorch, bộ tăng tốc AI, hạ tầng mạng đến các mô hình như Llama, và dự đoán trước cuối thập kỷ này hơn một nửa điện năng của trung tâm dữ liệu sẽ dành cho AI.


## [Incremental Platforms: Monolithic Modular Architecture](https://newsletter.optimistengineer.com/p/incremental-platforms-monolithic)
Mở đầu loạt bài về kiến trúc tăng tiến (incremental architecture) cho sản phẩm SaaS, Marcos F. Lobo giới thiệu kiến trúc monolith dạng module: toàn bộ mã nguồn được đóng gói và triển khai như một ứng dụng duy nhất, nhưng bên trong được chia thành các module có trách nhiệm rõ ràng, giao tiếp với nhau qua interface và hợp đồng được định nghĩa tường minh. Cách tiếp cận này giữ được sự đơn giản của monolith mà vẫn tận dụng lợi ích của thiết kế tách biệt. Để đạt được điều đó, tác giả khuyên xác định ranh giới rõ ràng và dùng các mẫu như facade để che giấu phần cài đặt bên trong, bảo đảm mỗi module gắn kết cao và ít phụ thuộc lẫn nhau, tổ chức package phản ánh cách chia module để sau này có thể tách ra khi cần, kiểm thử các tình huống sử dụng kết hợp CI/CD, và quản lý phụ thuộc bằng dependency injection hoặc giao tiếp qua thông điệp, sự kiện.

Lợi ích của kiến trúc này gồm triển khai và vận hành đơn giản với một gói triển khai duy nhất, dễ phát triển và tái cấu trúc, lời gọi giữa các module diễn ra trong bộ nhớ nên nhanh hơn gọi qua mạng, việc giữ tính nhất quán giao dịch dễ dàng hơn, và hỗ trợ tốt Domain-Driven Design khi chia module theo bounded context. Theo tác giả, đây là lựa chọn phù hợp cho dự án giai đoạn đầu, nhóm nhỏ và hệ thống coi trọng tính nhất quán, đồng thời là nền móng vững chắc để chuyển dần sang microservices khi yêu cầu kinh doanh thay đổi.


## Bonus: Vài video hay ho đến từ [ByteByteGo](https://bytebytego.com/)

[How the Garbage Collector Works in Java, Python, and Go!](https://www.youtube.com/watch?v=3Kqal7QaCCM)


## Bonus 2: Vài hình ảnh hay ho đến từ [ByteByteGo](https://bytebytego.com/)

![How to Build Idempotent APIs](https://substack-post-media.s3.amazonaws.com/public/images/c3beec9e-cd04-4748-ae7e-3299b42883f6_2360x2824.png)
![12 Algorithms for System Design Interviews](https://substack-post-media.s3.amazonaws.com/public/images/2f632296-4214-4ec8-a1d2-280e9b7f2696_1280x1532.gif)
![How Kubernetes Works?](https://substack-post-media.s3.amazonaws.com/public/images/65a92a81-f2c5-4aed-9faa-35a66124cffe_1283x1536.gif)
![PostgreSQL 101: The Everything Database](https://substack-post-media.s3.amazonaws.com/public/images/a6903386-4b5f-450e-b64d-839c6fdf8238_1280x1601.gif)
![Top 12 Tips for API Security](https://substack-post-media.s3.amazonaws.com/public/images/06c5ad46-faaf-479b-bde3-b5de8033b4e9_1280x1664.gif)


## Bonus 3: Vài hình ảnh hay ho đến từ [DesignGurus](https://designgurus.io/)

![System Design Master Template](https://www.designgurus.io/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Fdownload%2Fstorage%2Fv1%2Fb%2Fdesigngurus-prod.appspot.com%2Fo%2Fee5726e8e29469477b999c100%3Fgeneration%3D1726724098184989%26alt%3Dmedia&w=3840&q=75&dpl=dpl_3Rx6M949Pc1cQKT3QTdj87FcKNdg)

---

*Bài viết đã được viết lại bởi Claude Code với Opus 5.5 vào ngày 27/09/2026.*
