---
title: "Newsletter #19"
date: 2025-05-06
tags: [ "AI-Assisted", "Development", "Java", "DevOps", "Kafka", "AI", "Writing" ]
categories: [ "Newsletter" ]
---

*Mời bạn thưởng thức Newsletter #19.*

## [A love letter to the CSV format](https://github.com/medialab/xan/blob/master/docs/LOVE_LETTER.md)

Tác giả của xan (công cụ dòng lệnh xử lý CSV do medialab phát triển) viết "bức thư tình" này để phản bác những bài viết liên tục tuyên bố CSV đã lỗi thời trước Parquet, JSON theo dòng hay MessagePack. Theo tác giả, CSV không phải viên đạn bạc, nhưng có nhiều điểm mạnh thường bị bỏ qua: đặc tả đơn giản đến mức giải thích được trong vài giây (dấu phẩy ngăn cách giá trị, xuống dòng ngăn cách hàng, giá trị đặc biệt thì đặt trong ngoặc kép), không thuộc sở hữu của ai, và là văn bản thuần nên con người có thể đọc, sửa trực tiếp. CSV còn đọc được theo luồng từng hàng với rất ít bộ nhớ và cho phép ghi nối thêm hàng vào cuối tệp một cách hiệu quả — những việc mà các định dạng lưu trữ theo cột như Parquet làm kém hơn nhiều, dù chúng vượt trội khi chỉ cần đọc vài cột.

Ngoài ra, CSV có kiểu dữ liệu động, để mỗi ngôn ngữ tự quyết định cách phân tích giá trị (vừa linh hoạt vừa dễ gây lỗi nếu bất cẩn), và rất súc tích vì tên cột chỉ xuất hiện một lần thay vì lặp lại khóa như JSON hay XML. Đặc biệt, do cơ chế thoát dấu ngoặc kép bằng cách nhân đôi mang tính đối xứng, một tệp CSV bị đảo ngược từng byte vẫn là CSV hợp lệ; nhờ đó có thể đọc nhanh vài hàng cuối của một tệp lớn, rất hữu ích khi cần tiếp tục một tiến trình bị gián đoạn. Tác giả kết lại hài hước rằng Excel ghét CSV, và có lẽ đó là dấu hiệu CSV đang làm đúng. Với lập trình viên mới, bài viết là lời nhắc nên chọn định dạng dữ liệu theo đúng bài toán thay vì chạy theo xu hướng.

## [The role of developer skills in agentic coding](https://martinfowler.com/articles/exploring-gen-ai/13-role-of-developer-skills.html)

Birgitta Böckeler (Thoughtworks) tổng kết nhiều tháng sử dụng chế độ agent của Cursor, Windsurf và Cline để chỉnh sửa các dự án có sẵn. Bà đánh giá cao việc các công cụ này tự chạy kiểm thử, sửa lỗi biên dịch và tra cứu web, nhưng ngay cả trong những phiên làm việc thành công nhất, bà vẫn liên tục phải can thiệp và định hướng. Bà chia các sai lầm của AI thành ba "bán kính ảnh hưởng": làm chậm thời gian hoàn thành một commit (mã không chạy, chẩn đoán sai vấn đề, chẳng hạn đổ lỗi cho cấu hình kiến trúc của Docker trong khi nguyên nhân thật là `node_modules` được xây dựng cho sai kiến trúc); gây trở ngại cho cả nhóm trong vòng lặp phát triển (làm quá nhiều thứ cùng lúc thay vì từng lát cắt nhỏ, xử lý triệu chứng bằng cách tăng bộ nhớ thay vì tìm nguyên nhân gốc, làm quy trình phát triển rối hơn); và nguy hiểm nhất là làm giảm khả năng bảo trì lâu dài (kiểm thử dư thừa, thiếu tái sử dụng, mã dài dòng không cần thiết). Bán kính càng lớn thì vòng phản hồi để phát hiện vấn đề càng dài.

Theo tác giả, chúng ta còn rất xa việc AI tự viết 90% mã nguồn trong vòng một năm; hiện tại AI hỗ trợ bà trong khoảng 80% trường hợp với một dự án nhỏ cỡ 15 nghìn dòng. Để hạn chế rủi ro, mỗi lập trình viên nên luôn xem xét kỹ mã do AI sinh ra, dừng phiên làm việc khi thấy quá tải, cảnh giác với giải pháp "đủ tốt" xuất hiện quá nhanh và thực hành lập trình cặp. Ở cấp nhóm, nên duy trì công cụ giám sát chất lượng mã như SonarQube hay CodeScene, kiểm tra ngay từ pre-commit hook, xây dựng bộ quy tắc tùy chỉnh cho trợ lý AI và nuôi dưỡng văn hóa tin cậy, cởi mở để không ai phải "đi tắt" vì áp lực bàn giao nhanh hơn. Với lập trình viên trẻ, bài viết chỉ rõ những kỹ năng vẫn cần rèn luyện trong thời đại AI.

## [CI/CD DevOps Pipeline Project: Deployment of Java Application on Kubernetes](https://dev.to/prodevopsguytech/cicd-devops-pipeline-project-deployment-of-java-application-on-kubernetes-4fi2)

Bài hướng dẫn trên cộng đồng DEV này xây dựng từ đầu một pipeline CI/CD hoàn chỉnh để triển khai ứng dụng Java lên Kubernetes, với mục tiêu tự động hóa toàn bộ vòng đời phân phối phần mềm và giảm tối đa thao tác thủ công. Hạ tầng gồm các máy ảo AWS EC2 dành cho Kubernetes master, các worker node, Jenkins, SonarQube, Nexus và máy chủ giám sát. Tác giả hướng dẫn chi tiết cách dựng cluster bằng Kubeadm (tắt swap, cài runtime CRI-O, cài các gói Kubernetes, khởi tạo master rồi gắn các worker), cài đặt Jenkins, Docker, Nexus, sau đó tạo một Git repository riêng tư dùng personal access token để lưu mã nguồn.

Trọng tâm của bài là Jenkinsfile: pipeline lấy mã nguồn, biên dịch và chạy kiểm thử bằng Maven, quét lỗ hổng với Trivy, phân tích chất lượng mã bằng SonarQube, đóng gói và đẩy artifact lên Nexus, xây dựng và đẩy Docker image, triển khai lên Kubernetes rồi gửi thông báo về trạng thái chạy. Phần cuối thiết lập giám sát với Prometheus, Blackbox Exporter và Grafana để theo dõi hệ thống theo thời gian thực. Đây là một dự án thực hành tốt cho lập trình viên muốn hiểu cách các công cụ DevOps phổ biến kết nối với nhau thành một quy trình liền mạch.

## [Road to JDK 25: Over-Engineering Tic-Tac-Toe (Java 24)](https://briancorbinxyz.medium.com/road-to-jdk-25-over-engineering-tic-tac-toe-java-24-565c7f9b06d0)

Trong loạt bài "Road to JDK 25", Brian Corbin khám phá các tính năng mới của Java bằng cách cố tình "thiết kế quá mức" một trò chơi tic-tac-toe đơn giản. Bài này dành cho JDK 24, phiên bản có 24 JEP, và tác giả tập trung vào những tính năng đã chính thức, không còn ở dạng preview. Nổi bật nhất là Stream Gatherers: với `Stream::gather(Gatherer)`, lập trình viên có thể tự định nghĩa các thao tác trung gian trên Stream API theo kiểu một-một, một-nhiều, nhiều-một hay nhiều-nhiều, có thể lưu trạng thái, cùng các gatherer dựng sẵn như `fold`, `scan`, `windowFixed` và `windowSliding`. Bộ thu gom rác ZGC giờ chỉ còn chế độ phân thế hệ, giúp thu gom thường xuyên và hiệu quả hơn các đối tượng có vòng đời ngắn.

Bên cạnh đó là Class-File API chuẩn để đọc, tạo và biến đổi tệp class (nền tảng cho các công cụ phân tích bytecode), tính năng nạp và liên kết lớp trước khi chạy (Ahead-of-Time Class Loading & Linking) để rút ngắn thời gian khởi động, cùng hai thuật toán mật mã dựa trên lattice có khả năng chống máy tính lượng tử, dùng cho trao đổi khóa và chữ ký số. Mỗi tính năng đều có ví dụ minh họa ngay trong mã nguồn trò chơi. Tác giả cũng nhắc rằng JDK 25, phiên bản LTS tiếp theo, sẽ ra mắt vào tháng 9/2025.

## [Oracle reveals five new features coming to Java](https://www.infoworld.com/article/3848288/oracle-reveals-five-new-features-coming-to-java.html)

Ngay khi JDK 24 vừa phát hành chính thức, Oracle đã giới thiệu trước năm tính năng đang được chuẩn bị cho các bản Java sắp tới; tất cả đều đã có JEP và đang ở giai đoạn preview. Enhanced primitive boxing giúp đối xử với kiểu nguyên thủy giống kiểu tham chiếu hơn, ví dụ gọi phương thức trực tiếp trên giá trị nguyên thủy hoặc dùng kiểu nguyên thủy làm tham số kiểu. Value classes and objects mang đến các đối tượng chỉ có trường `final` và không có định danh (identity), được phân biệt hoàn toàn bằng giá trị các trường, cho phép JVM tối ưu bộ nhớ, tính cục bộ và hiệu quả thu gom rác. Đi kèm là null-restricted value class types, cho phép khai báo biến kiểu giá trị không nhận `null` để lưu trữ gọn hơn.

Derived record creation giúp tạo một record mới từ record có sẵn một cách ngắn gọn, không cần tự viết các phương thức "wither" (phiên bản bất biến của setter). Cuối cùng, Stable Values — tính năng đã được xác nhận đưa vào JDK 25 phát hành tháng 9/2025 — là các đối tượng chứa dữ liệu bất biến mà JVM coi như hằng số, mang lại tối ưu hiệu năng tương tự trường `final` nhưng linh hoạt hơn về thời điểm khởi tạo, qua đó cải thiện thời gian khởi động ứng dụng. Nhìn chung, các đề xuất này cho thấy Java đang tiếp tục hiện đại hóa mô hình đối tượng và hiệu năng của mình.

## [Java bytecode hacking for fun and profit](https://cory.li/bytecode-hacking/)

Tác giả chia sẻ các kỹ thuật tối ưu bytecode Java học được từ Battlecode, cuộc thi lập trình AI điều khiển robot ảo, nơi mỗi lượt chỉ được thực thi một số lượng bytecode giới hạn (khoảng 6–10 nghìn) thay vì đo bằng thời gian CPU. Kỹ năng này vốn hiếm gặp từ khi JVM có trình biên dịch JIT, nhưng lại có thể quyết định thắng thua trong cuộc thi. Bài viết giải thích JVM là máy ảo dựa trên ngăn xếp (stack), mỗi bytecode là một lệnh nguyên tử tương tự lệnh assembly, và Battlecode chỉ đếm số lệnh chứ không quan tâm kích thước, nên `iload_0` và `iload #5` đều được tính là một.

Từ đó, tác giả phân tích mã sau khi dịch ngược để đưa ra nhiều mẹo cụ thể: viết lại vòng lặp for-each theo cách thủ công để bớt vài bytecode mỗi lần lặp, sao chép biến thành viên ra biến cục bộ vì mỗi lần truy cập trường tốn thêm lệnh, ưu tiên so sánh với 0 vì JVM có lệnh riêng cho việc này, và tận dụng `break`/`continue` cùng nhãn (label) để buộc trình biên dịch sinh lệnh `goto`, bỏ qua phần thân vòng lặp không cần thiết. Tác giả nhấn mạnh chỉ nên tối ưu ở mức này sau khi đã hoàn thiện khung AI và thuật toán chính, vì mã đúng và hiệu quả về mặt thuật toán luôn quan trọng hơn. Dù ít áp dụng trực tiếp trong công việc hằng ngày, bài viết là cách thú vị để hiểu Java thực sự chạy thế nào bên dưới.

## [How to Write Blog Posts that Developers Read](https://refactoringenglish.com/chapters/write-blog-posts-developers-read/)

Michael Lynch, người viết blog phần mềm suốt 9 năm với 300–500 nghìn độc giả mỗi năm, chia sẻ những nguyên tắc giúp bài blog kỹ thuật thực sự được lập trình viên đọc; bài viết là một chương trong cuốn sách về kỹ năng viết cho lập trình viên mà ông đang soạn. Nguyên tắc đầu tiên là đi thẳng vào vấn đề: tiêu đề và vài câu mở đầu phải cho người đọc biết ngay bài viết dành cho ai và họ được lợi gì. Tiếp theo là "nghĩ rộng hơn một bậc": chỉ cần thêm vài câu giải thích khái niệm hoặc thay thuật ngữ chuyên sâu bằng từ dễ hiểu, bài viết có thể tiếp cận nhóm độc giả lớn hơn nhiều. Ông cũng nhấn mạnh phải có con đường thực tế để bài viết đến được người đọc, chẳng hạn qua Hacker News, Reddit hay tìm kiếm Google, thay vì chỉ viết hay rồi chờ đợi.

Hai nguyên tắc còn lại liên quan đến trình bày. Thêm hình ảnh là thay đổi hiệu quả nhất: ảnh chụp màn hình, biểu đồ, sơ đồ — thậm chí một bức vẽ MS Paint vụng về vẫn hấp dẫn hơn ảnh do AI tạo. Cuối cùng, hãy phục vụ người đọc lướt, vì nhiều người chỉ nhìn các tiêu đề và hình ảnh trước khi quyết định có đọc kỹ hay không; tác giả còn cung cấp một bookmarklet giúp xem bài viết của mình dưới góc nhìn đó. Mỗi nguyên tắc đều đi kèm ví dụ từ chính các bài viết của ông, và chúng cũng áp dụng tốt cho tài liệu kỹ thuật hay email trong công việc.

## [The New Look and Feel of Apache Kafka 4.0](https://thenewstack.io/the-new-look-and-feel-of-apache-kafka-4-0/)

Apache Kafka 4.0 mang đến nâng cấp cho gần như mọi thành phần của nền tảng truyền sự kiện phân tán này, nhưng thay đổi lớn nhất là lần đầu tiên chạy KRaft (hiện thực giao thức Raft ngay bên trong Kafka) làm mặc định và loại bỏ hoàn toàn ZooKeeper. Theo Sandon Jacobs (Confluent), quá trình chuyển đổi đã được chuẩn bị qua nhiều phiên bản; giờ đây đội vận hành không còn phải dựng và quản lý thêm một cụm ZooKeeper, cấu hình TLS giữa hai hệ thống hay cấp tài nguyên tính toán riêng cho nó — bớt một thành phần là bớt một điểm lỗi. Bản phát hành cũng có bản truy cập sớm của Queues for Kafka (KIP-932), cho phép số consumer vượt quá số partition của một topic, hoạt động giống các hàng đợi truyền thống như Amazon SQS; đổi lại, thứ tự xử lý không được đảm bảo, nên khi thứ tự quan trọng vẫn nên dùng consumer group truyền thống.

Bên cạnh đó, KIP-848 giúp cân bằng lại consumer group mà không phải dừng toàn bộ consumer, rất hữu ích khi tự động mở rộng trên Kubernetes. KIP-1112 cho phép khai báo một lớp bao (processor wrapper) áp dụng cho mọi processor trong topology của Kafka Streams, thay vì sao chép thủ công cùng một logic, ví dụ ghi nhật ký kiểm toán, vào từng nơi. Cuối cùng, KIP-1076 và KIP-1091 bổ sung số liệu cho client và broker, cho phép đẩy chúng qua OpenTelemetry sang các công cụ sẵn có như Datadog. Với lập trình viên làm việc với dữ liệu luồng, đây là phiên bản giúp việc vận hành Kafka đơn giản hơn đáng kể.

## [Five Things AI Will Not Change](https://metastable.org/five/)

Lấy cảm hứng từ cách Jeff Bezos xây dựng Amazon dựa trên những điều khách hàng sẽ luôn muốn (giá rẻ, giao nhanh, nhiều lựa chọn) thay vì cố dự đoán tương lai của internet, tác giả nêu năm điều sẽ không thay đổi kể cả khi có AI mạnh. Thứ nhất, sẽ có rất nhiều AI chứ không phải một siêu AI duy nhất, vì cạnh tranh khốc liệt khiến không ai giữ được vị trí dẫn đầu lâu. Thứ hai, sẽ luôn tồn tại AI độc hại hoặc không được kiểm soát, do con người cố ý hay vô tình tạo ra, giống như các chiến dịch thao túng mạng xã hội trong cuộc bầu cử Mỹ năm 2016. Thứ ba, sự dồi dào sẽ không được chia đều: AI không tạo thêm đất đai hay tài nguyên khan hiếm, nên tiền vẫn cần thiết để phân bổ chúng. Thứ tư, chính trị vẫn chia rẽ sâu sắc, vì nhiều bất đồng xuất phát từ khác biệt về giá trị chứ không phải do thiếu thông tin. Thứ năm, con người sẽ không trở thành "loài kiến" trong mắt AI, vì AI được huấn luyện từ văn hóa nhân loại và sẽ trò chuyện trực tiếp với chúng ta về mọi chủ đề.

Ở phần cuối, tác giả giải thích vì sao lời kêu gọi tạm dừng các thí nghiệm AI lớn năm 2023 sẽ không thành hiện thực: nhân loại vẫn đang phải đối mặt với ung thư, Alzheimer, dịch bệnh, đói nghèo, và AI có tiềm năng giúp giải quyết những vấn đề đó. Theo tác giả, cả phe quá bi quan lẫn phe quá lạc quan về AI đều sai; tương lai sẽ lộn xộn, đôi lúc u tối, nhưng cũng đẹp đẽ và đầy cảm hứng.

## Bonus: Vài ảnh hay ho đến từ [ByteByteGo](https://bytebytego.com/)

![Object Oriented Programming Fundamentals](https://substack-post-media.s3.amazonaws.com/public/images/5321bec2-0079-47e2-92e9-1cd9950227c8_2250x2624.png)

---

*Bài viết đã được viết lại bởi Claude Code với Opus 5.5 vào ngày 27/09/2026.*
