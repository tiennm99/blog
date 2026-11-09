---
title: "Newsletter #19"
date: 2025-05-06
tags: [ "AI-Assisted", "Java", "Kubernetes", "CI/CD", "Kafka", "AI Coding", "Writing" ]
categories: [ "Newsletter" ]
---

*Mời bạn thưởng thức Newsletter #19.*

## [A love letter to the CSV format](https://github.com/medialab/xan/blob/master/docs/LOVE_LETTER.md)

Tác giả công cụ xan viết “bức thư tình” cho CSV để phản bác quan điểm định dạng này đã lỗi thời. Ưu điểm được nhấn mạnh gồm văn bản thuần dễ trao đổi, đọc theo từng hàng với ít bộ nhớ, ghi nối thêm dữ liệu thuận tiện và ít lặp lại tên trường. CSV không áp đặt kiểu dữ liệu cho từng cột, nên bên đọc có thể tự diễn giải nhưng cũng dễ gặp lỗi nếu thiếu quy ước. Ngược lại, khi chỉ cần một vài cột, định dạng theo cột như Parquet thường phù hợp hơn.

Một mẹo thú vị là đọc từ cuối tệp bằng bộ phân tích xử lý byte theo chiều ngược, rồi đảo lại hàng và byte trong từng ô. Kỹ thuật này tận dụng cách thoát dấu ngoặc kép bằng cách nhân đôi; không có nghĩa đảo byte xong là đọc ngay thành văn bản đúng bảng mã. Thông điệp chung là chọn định dạng theo nhu cầu thay vì tuyên bố một lựa chọn luôn vượt trội.

## [The role of developer skills in agentic coding](https://martinfowler.com/articles/exploring-gen-ai/13-role-of-developer-skills.html)

Trong bài tháng 3/2025, Birgitta Böckeler (Thoughtworks) nhìn lại việc dùng chế độ agent của Cursor, Windsurf và Cline để sửa dự án có sẵn. Công cụ tự chạy kiểm thử, sửa lỗi biên dịch và tìm tài liệu, nhưng bà vẫn thường xuyên phải can thiệp. Bà chia sai lầm thành ba mức ảnh hưởng: làm chậm một thay đổi, gây trở ngại cho quy trình của cả nhóm và làm giảm khả năng bảo trì lâu dài. Tác động càng rộng thì vấn đề thường càng lâu mới lộ ra.

Ví dụ gồm chẩn đoán sai lỗi phụ thuộc, làm quá nhiều việc cùng lúc, xử lý triệu chứng thay vì nguyên nhân và tạo mã hoặc kiểm thử dư thừa. Từ kinh nghiệm đó, bà khuyên rà soát thay đổi, làm từng bước nhỏ, dừng khi quá tải và duy trì phản hồi từ đồng đội cùng công cụ kiểm tra chất lượng. Nhận định về giới hạn tự chủ của AI và con số AI hỗ trợ khoảng 80% công việc là đánh giá trong bối cảnh dự án của bà lúc viết, không phải tỷ lệ mã AI tự viết hay thước đo chung cho mọi nhóm.

## [CI/CD DevOps Pipeline Project: Deployment of Java Application on Kubernetes](https://dev.to/prodevopsguytech/cicd-devops-pipeline-project-deployment-of-java-application-on-kubernetes-4fi2)

Bài hướng dẫn trên cộng đồng DEV này xây dựng từ đầu một pipeline CI/CD hoàn chỉnh để triển khai ứng dụng Java lên Kubernetes, với mục tiêu tự động hóa toàn bộ vòng đời phân phối phần mềm và giảm tối đa thao tác thủ công. Hạ tầng gồm các máy ảo AWS EC2 dành cho Kubernetes master, các worker node, Jenkins, SonarQube, Nexus và máy chủ giám sát. Tác giả hướng dẫn chi tiết cách dựng cluster bằng Kubeadm (tắt swap, cài runtime CRI-O, cài các gói Kubernetes, khởi tạo master rồi gắn các worker), cài đặt Jenkins, Docker, Nexus, sau đó tạo một Git repository riêng tư dùng personal access token để lưu mã nguồn.

Trọng tâm của bài là Jenkinsfile: pipeline lấy mã nguồn, biên dịch và chạy kiểm thử bằng Maven, quét lỗ hổng với Trivy, phân tích chất lượng mã bằng SonarQube, đóng gói và đẩy artifact lên Nexus, xây dựng và đẩy Docker image, triển khai lên Kubernetes rồi gửi thông báo về trạng thái chạy. Phần cuối thiết lập giám sát với Prometheus, Blackbox Exporter và Grafana để theo dõi hệ thống theo thời gian thực. Đây là một dự án thực hành tốt cho lập trình viên muốn hiểu cách các công cụ DevOps phổ biến kết nối với nhau thành một quy trình liền mạch.

## [Road to JDK 25: Over-Engineering Tic-Tac-Toe (Java 24)](https://briancorbinxyz.medium.com/road-to-jdk-25-over-engineering-tic-tac-toe-java-24-565c7f9b06d0)

Trong loạt bài "Road to JDK 25", Brian Corbin khám phá các tính năng mới của Java bằng cách cố tình "thiết kế quá mức" một trò chơi tic-tac-toe đơn giản. Bài này dành cho JDK 24, phiên bản có 24 JEP, và tác giả tập trung vào những tính năng đã chính thức, không còn ở dạng preview. Nổi bật nhất là Stream Gatherers: với `Stream::gather(Gatherer)`, lập trình viên có thể tự định nghĩa các thao tác trung gian trên Stream API theo kiểu một-một, một-nhiều, nhiều-một hay nhiều-nhiều, có thể lưu trạng thái, cùng các gatherer dựng sẵn như `fold`, `scan`, `windowFixed` và `windowSliding`. Bộ thu gom rác ZGC giờ chỉ còn chế độ phân thế hệ, giúp thu gom thường xuyên và hiệu quả hơn các đối tượng có vòng đời ngắn.

Bên cạnh đó là Class-File API chuẩn để đọc, tạo và biến đổi tệp class (nền tảng cho các công cụ phân tích bytecode), tính năng nạp và liên kết lớp trước khi chạy (Ahead-of-Time Class Loading & Linking) để rút ngắn thời gian khởi động, cùng hai thuật toán mật mã dựa trên lattice có khả năng chống máy tính lượng tử, dùng cho trao đổi khóa và chữ ký số. Mỗi tính năng đều có ví dụ minh họa ngay trong mã nguồn trò chơi. Tác giả cũng nhắc rằng JDK 25, phiên bản LTS tiếp theo, sẽ ra mắt vào tháng 9/2025.

## [Oracle reveals five new features coming to Java](https://www.infoworld.com/article/3848288/oracle-reveals-five-new-features-coming-to-java.html)

Bài tháng 3/2025 giới thiệu năm hướng phát triển Java được Oracle đề cập khi JDK 24 ra mắt. Có JEP mang tên “Preview” không đồng nghĩa tính năng đã được phát hành để dùng thử: chẳng hạn JEP 402 còn ở trạng thái Draft, còn JEP 468 là Candidate, chưa được gắn với một bản phát hành. Enhanced primitive boxing giúp đối xử với kiểu nguyên thủy giống kiểu tham chiếu hơn, ví dụ gọi phương thức trực tiếp trên giá trị nguyên thủy hoặc dùng kiểu nguyên thủy làm tham số kiểu. Value classes and objects mang đến các đối tượng chỉ có trường `final` và không có định danh (identity), được phân biệt hoàn toàn bằng giá trị các trường, cho phép JVM tối ưu bộ nhớ, tính cục bộ và hiệu quả thu gom rác. Đi kèm là null-restricted value class types, cho phép khai báo biến kiểu giá trị không nhận `null` để lưu trữ gọn hơn.

Derived record creation giúp tạo một record mới từ record có sẵn một cách ngắn gọn, không cần tự viết các phương thức "wither" (phiên bản bất biến của setter). Cuối cùng, Stable Values — API được bài viết nhắc tới như một preview nhắm đến JDK 25, khi đó dự kiến ra mắt tháng 9/2025 — là các đối tượng chứa dữ liệu bất biến mà JVM coi như hằng số, mang lại tối ưu hiệu năng tương tự trường `final` nhưng linh hoạt hơn về thời điểm khởi tạo, qua đó cải thiện thời gian khởi động ứng dụng. Nhìn chung, các đề xuất này cho thấy Java đang tiếp tục hiện đại hóa mô hình đối tượng và hiệu năng của mình.

## [Java bytecode hacking for fun and profit](https://cory.li/bytecode-hacking/)

Tác giả chia sẻ các kỹ thuật tối ưu bytecode Java học được từ Battlecode, cuộc thi lập trình AI điều khiển robot ảo, nơi mỗi lượt chỉ được thực thi một số lượng bytecode giới hạn (khoảng 6–10 nghìn) thay vì đo bằng thời gian CPU. Kỹ năng này vốn hiếm gặp từ khi JVM có trình biên dịch JIT, nhưng lại có thể quyết định thắng thua trong cuộc thi. Bài viết giải thích JVM là máy ảo dựa trên ngăn xếp (stack), mỗi bytecode là một lệnh nguyên tử tương tự lệnh assembly, và Battlecode chỉ đếm số lệnh chứ không quan tâm kích thước, nên `iload_0` và `iload #5` đều được tính là một.

Từ đó, tác giả phân tích mã sau khi dịch ngược để đưa ra nhiều mẹo cụ thể: viết lại vòng lặp for-each theo cách thủ công để bớt vài bytecode mỗi lần lặp, sao chép biến thành viên ra biến cục bộ vì mỗi lần truy cập trường tốn thêm lệnh, ưu tiên so sánh với 0 vì JVM có lệnh riêng cho việc này, và tận dụng `break`/`continue` cùng nhãn (label) để buộc trình biên dịch sinh lệnh `goto`, bỏ qua phần thân vòng lặp không cần thiết. Tác giả nhấn mạnh chỉ nên tối ưu ở mức này sau khi đã hoàn thiện khung AI và thuật toán chính, vì mã đúng và hiệu quả về mặt thuật toán luôn quan trọng hơn. Dù ít áp dụng trực tiếp trong công việc hằng ngày, bài viết là cách thú vị để hiểu Java thực sự chạy thế nào bên dưới.

## [How to Write Blog Posts that Developers Read](https://refactoringenglish.com/chapters/write-blog-posts-developers-read/)

Michael Lynch, người viết blog phần mềm suốt 9 năm với 300–500 nghìn độc giả mỗi năm, chia sẻ những nguyên tắc giúp bài blog kỹ thuật thực sự được lập trình viên đọc; bài viết là một chương trong cuốn sách về kỹ năng viết cho lập trình viên mà ông đang soạn. Nguyên tắc đầu tiên là đi thẳng vào vấn đề: tiêu đề và vài câu mở đầu phải cho người đọc biết ngay bài viết dành cho ai và họ được lợi gì. Tiếp theo là "nghĩ rộng hơn một bậc": chỉ cần thêm vài câu giải thích khái niệm hoặc thay thuật ngữ chuyên sâu bằng từ dễ hiểu, bài viết có thể tiếp cận nhóm độc giả lớn hơn nhiều. Ông cũng nhấn mạnh phải có con đường thực tế để bài viết đến được người đọc, chẳng hạn qua Hacker News, Reddit hay tìm kiếm Google, thay vì chỉ viết hay rồi chờ đợi.

Hai nguyên tắc còn lại liên quan đến trình bày. Thêm hình ảnh là thay đổi hiệu quả nhất: ảnh chụp màn hình, biểu đồ, sơ đồ — thậm chí một bức vẽ MS Paint vụng về vẫn hấp dẫn hơn ảnh do AI tạo. Cuối cùng, hãy phục vụ người đọc lướt, vì nhiều người chỉ nhìn các tiêu đề và hình ảnh trước khi quyết định có đọc kỹ hay không; tác giả còn cung cấp một bookmarklet giúp xem bài viết của mình dưới góc nhìn đó. Mỗi nguyên tắc đều đi kèm ví dụ từ chính các bài viết của ông, và chúng cũng áp dụng tốt cho tài liệu kỹ thuật hay email trong công việc.

## [The New Look and Feel of Apache Kafka 4.0](https://thenewstack.io/the-new-look-and-feel-of-apache-kafka-4-0/)

Apache Kafka 4.0 mang đến nâng cấp cho gần như mọi thành phần của nền tảng truyền sự kiện phân tán này, nhưng thay đổi lớn nhất là chỉ hỗ trợ chế độ KRaft (dựa trên Raft) và loại bỏ hoàn toàn chế độ ZooKeeper. Theo Sandon Jacobs (Confluent), quá trình chuyển đổi đã được chuẩn bị qua nhiều phiên bản; giờ đây đội vận hành không còn phải dựng và quản lý thêm một cụm ZooKeeper, cấu hình TLS giữa hai hệ thống hay cấp tài nguyên tính toán riêng cho nó — bớt một thành phần là bớt một điểm lỗi. Bản phát hành cũng có bản truy cập sớm của Queues for Kafka (KIP-932), cho phép số consumer vượt quá số partition của một topic, hoạt động giống các hàng đợi truyền thống như Amazon SQS; đổi lại, thứ tự xử lý không được đảm bảo, nên khi thứ tự quan trọng vẫn nên dùng consumer group truyền thống.

Bên cạnh đó, KIP-848 cung cấp giao thức consumer group mới để tránh việc cân bằng lại phải dừng cả nhóm; ở Kafka 4.0, phía consumer cần chọn dùng bằng `group.protocol=consumer`. KIP-1112 cho phép khai báo một lớp bao (processor wrapper) áp dụng cho mọi processor trong topology của Kafka Streams, thay vì sao chép thủ công cùng một logic, ví dụ ghi nhật ký kiểm toán, vào từng nơi. Cuối cùng, KIP-1076 và KIP-1091 bổ sung số liệu cho client và broker, cho phép đẩy chúng qua OpenTelemetry sang các công cụ sẵn có như Datadog. Với lập trình viên làm việc với dữ liệu luồng, đây là phiên bản giúp việc vận hành Kafka đơn giản hơn đáng kể.

## [Five Things AI Will Not Change](https://metastable.org/five/)

Lấy cảm hứng từ chiến lược Amazon của Jeff Bezos — chú trọng giá rẻ, giao nhanh và nhiều lựa chọn — tác giả nêu năm điều ông tin sẽ không đổi kể cả khi có AI mạnh. Thứ nhất, sẽ có rất nhiều AI chứ không phải một siêu AI duy nhất, vì cạnh tranh khốc liệt khiến không ai giữ được vị trí dẫn đầu lâu. Thứ hai, sẽ luôn tồn tại AI độc hại hoặc không được kiểm soát, do con người cố ý hay vô tình tạo ra, giống như các chiến dịch thao túng mạng xã hội trong cuộc bầu cử Mỹ năm 2016. Thứ ba, sự dồi dào sẽ không được chia đều: AI không tạo thêm đất đai hay tài nguyên khan hiếm, nên tiền vẫn cần thiết để phân bổ chúng. Thứ tư, chính trị vẫn chia rẽ sâu sắc, vì nhiều bất đồng xuất phát từ khác biệt về giá trị chứ không phải do thiếu thông tin. Thứ năm, con người sẽ không trở thành "loài kiến" trong mắt AI, vì AI được huấn luyện từ văn hóa nhân loại và sẽ trò chuyện trực tiếp với chúng ta về mọi chủ đề.

Ở phần cuối, tác giả giải thích vì sao lời kêu gọi tạm dừng các thí nghiệm AI lớn năm 2023 sẽ không thành hiện thực: nhân loại vẫn đang phải đối mặt với ung thư, Alzheimer, dịch bệnh, đói nghèo, và AI có tiềm năng giúp giải quyết những vấn đề đó. Theo tác giả, cả phe quá bi quan lẫn phe quá lạc quan về AI đều sai; tương lai sẽ lộn xộn, đôi lúc u tối, nhưng cũng đẹp đẽ và đầy cảm hứng.

## Bonus: Vài ảnh hay ho đến từ [ByteByteGo](https://bytebytego.com/)

![Object Oriented Programming Fundamentals](https://substack-post-media.s3.amazonaws.com/public/images/5321bec2-0079-47e2-92e9-1cd9950227c8_2250x2624.png)

---

*Bài viết đã được viết lại bởi Claude Code với Opus 5.5 vào ngày 27/09/2026; được review và chỉnh sửa bởi Codex với GPT 6.1 Sol vào ngày 09/11/2026.*
