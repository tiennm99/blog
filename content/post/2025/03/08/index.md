---
title: "Newsletter #6"
date: 2025-03-08
tags: ["AI-Assisted", "Newsletter", "LLMs", "Java", "Redis", "Rate Limiting", "Problem Solving"]
categories: [ "Newsletter" ]
---

<i>
Mừng ngày Quốc tế Phụ nữ 8/3, chúc tất cả các bạn nữ một ngày tốt lành, luôn vui tươi và hạnh phúc!
Con gái sinh ra là để yêu thương :>
Chào mừng các bạn đến với Newsletter #6.
</i>

## [How I use LLMs as a staff engineer](https://www.seangoedecke.com/how-i-use-llms/)

Sean Goedecke, kỹ sư cấp staff tại GitHub, liệt kê những cách anh thực sự dùng mô hình ngôn ngữ lớn (LLM) trong công việc hằng ngày. Với mã nguồn chạy trên môi trường thực tế, anh dùng Copilot chủ yếu như một công cụ gợi ý hoàn thành mã rất tốt, phần lớn cho các đoạn lặp lại như tham số hàm hay kiểu dữ liệu; ở những mảng sở trường như Ruby on Rails, anh vẫn tự viết tốt hơn. Khi phải sửa nhỏ ở vùng ít quen như một dịch vụ Go hay thư viện C, anh dựa vào LLM nhiều hơn, hỏi thẳng "đoạn này đã đúng phong cách của ngôn ngữ chưa", nhưng luôn nhờ chuyên gia của mảng đó duyệt lại. Với mã viết một lần rồi bỏ, chẳng hạn mã nghiên cứu chỉ chạy trên máy cá nhân, anh để LLM viết gần như toàn bộ và ước tính nhanh hơn 2–4 lần.

Theo anh, giá trị lớn nhất là dùng LLM như một gia sư theo yêu cầu khi học lĩnh vực mới: đặt câu hỏi nối tiếp, tự ghi lại những gì vừa học rồi nhờ mô hình chỉ ra chỗ hiểu sai. Anh cũng nhờ LLM gỡ lỗi như phương án cuối cùng (chỉ hỏi một lần, không dây dưa) và soát lỗi chính tả, lỗi logic trong các tài liệu dài. Ngược lại, anh không để LLM viết trọn một pull request ở mảng mình thành thạo, không để nó viết ADR hay các văn bản kỹ thuật quan trọng, và chưa dùng nó để tìm hiểu các kho mã nguồn lớn.

## [Software development topics I've changed my mind on after 10 years in the industry](https://chriskiehl.com/article/thoughts-after-10-years)

Chris Kiehl, kỹ sư phần mềm tại Amazon, nhìn lại mười năm làm nghề qua ba danh sách ngắn, tiếp nối bài viết cùng chủ đề anh đăng bốn năm trước. Những điều anh đã đổi ý gồm: sự đơn giản không tự nhiên mà có mà phải liên tục vun đắp; chẳng có gì đáng tự hào khi quản lý được sự phức tạp; ngôn ngữ có kiểu tĩnh là thiết yếu với đội có trình độ không đồng đều; Java hay chính vì nó nhàm chán; phần lớn việc lập trình nên diễn ra trước khi viết dòng mã đầu tiên; sự "thanh lịch" không phải thước đo thật; quản lý giỏi là vô giá; và DynamoDB tốt nếu khối lượng công việc khớp đúng với thứ nó cung cấp.

Anh cũng bổ sung những quan điểm mới: kỹ thuật phần mềm chủ yếu là giao tiếp; thấy việc gì dễ thường là dấu hiệu chưa hiểu nó; cần cho lập trình viên trẻ không gian để thử và sai; nên tránh ORM mà viết SQL trực tiếp; về lâu dài sẽ hối hận khi xây hệ thống trên Serverless Functions; khóa phân tán vẫn khó một cách khó hiểu; và mã kiểm thử thì không bao giờ thừa chú thích. Những điều anh vẫn giữ nguyên: độ phủ kiểm thử không phản ánh chất lượng mã, kiến trúc nguyên khối (monolith) vẫn ổn, microservice cần được biện minh chứ không nên mặc định, và hầu hết dự án không cần "mở rộng quy mô" như người ta tưởng.

## [Looking Under the Lamppost (On Problem-Solving)](https://edbatista.com/2025/01/looking-under-the-lamppost-on-problem-solving.html)

Ed Batista mở đầu bằng một câu chuyện cười cũ: một người tìm chìa khóa dưới cột đèn đường dù đánh rơi ở ngoài sân, chỉ vì "chỗ này sáng hơn". Theo ông, đó chính là cách chúng ta hay giải quyết vấn đề: thay vì xử lý vấn đề cần phải giải quyết, ta chọn vấn đề mình muốn giải quyết. Lý do thường rất dễ hiểu: vấn đề thật nằm ngoài chuyên môn; nó cần quá nhiều thời gian trong khi ta muốn cảm thấy "năng suất" bằng cách gạch bớt những việc nhỏ; hoặc nó có thể không có lời giải khiến ta sợ thất bại và mất mặt.

Tác giả không khuyên tự trách bản thân, nhưng nhấn mạnh rằng nếu chỉ chọn những bài toán nhỏ, dễ và chắc chắn giải được, ta sẽ không bao giờ phát triển được năng lực nào khác; vùng an toàn chỉ nới rộng khi ta bước ra ngoài nó. Ông phân biệt: tự tin là phép tính về khả năng thành công, còn dũng cảm là nhận ra cái giá của việc không thử lớn hơn cái giá của thất bại. Khi xem thất bại là cơ hội học hỏi, là "loại trừ các khả năng" theo cách nói của Peter Attia, ta sẽ thấy cứ quanh quẩn dưới cột đèn mới là rủi ro thật sự, vì lời giải cho những vấn đề có ý nghĩa chỉ nằm ngoài kia, trong bóng tối.

## [Sliding Window Log Rate Limiter (Redis & Java)](https://foojay.io/today/sliding-window-log-rate-limiter-redis-java/)

Raphael De Lio hướng dẫn xây dựng bộ giới hạn tốc độ theo thuật toán Sliding Window Log bằng Redis và Java. Khác với Fixed Window Counter chia thời gian thành các khoảng cố định, thuật toán này ghi lại mốc thời gian của từng request và chỉ đếm những request nằm trong cửa sổ trượt (ví dụ một giây hay một phút gần nhất), nhờ vậy giới hạn được áp dụng mượt mà, không bị đặt lại đột ngột ở cuối mỗi khoảng. Từ Redis 8, lệnh `HEXPIRE` cho phép đặt thời gian hết hạn cho từng trường trong một hash, nên cách làm rất gọn: mỗi client có một hash riêng, mỗi request hợp lệ là một trường tự hết hạn sau độ dài cửa sổ, và `HLEN` cho biết số request hiện có; nếu đã chạm giới hạn thì request mới bị từ chối.

Phần cài đặt dùng thư viện Jedis, trong đó `HSET` và `HEXPIRE` được gói trong một giao dịch (transaction) để thực thi cùng nhau, tránh tranh chấp dữ liệu và giảm số lượt đi về qua mạng; mỗi trường dùng một UUID ngẫu nhiên để không bị trùng khi nhiều request đến trong cùng một mili giây. Cuối bài, tác giả viết bộ kiểm thử với Redis TestContainers, JUnit 5 và AssertJ, bao quát các tình huống như trong giới hạn, vượt giới hạn, sau khi cửa sổ trượt qua và nhiều client truy cập đồng thời.

## [Project Loom: Structured Concurrency – Java](https://foojay.io/today/project-loom-structured-concurrency-java/)

Mahendra Rao B giới thiệu Structured Concurrency, một tính năng thuộc Project Loom, xuất hiện lần đầu dưới dạng incubator trong Java 19 (JEP 428), rồi trở thành bản preview ở Java 21 (JEP 453) và Java 23 (JEP 480). Ý tưởng cốt lõi là khi một tác vụ chính tách thành nhiều tác vụ con chạy đồng thời, tác vụ chính chỉ tiếp tục khi các tác vụ con đã xong; nhờ đó quan hệ cha con giữa các tác vụ được giữ nguyên và các lỗi liên quan đến hủy bỏ hay tắt tác vụ giảm đi. Trước khi vào API, bài viết ôn lại các khái niệm nền như tiến trình, luồng, đồng bộ hóa, deadlock và semaphore.

Trung tâm của API là lớp `StructuredTaskScope` trong gói `java.util.concurrent`: tạo scope bằng try-with-resources, khởi chạy từng tác vụ con bằng `fork`, chờ bằng `join` rồi xử lý kết quả. Hai lớp con có sẵn là `ShutdownOnSuccess` (hủy các tác vụ còn lại khi một tác vụ thành công, phù hợp khi chỉ cần kết quả đầu tiên) và `ShutdownOnFailure` (hủy tất cả khi một tác vụ thất bại); bạn cũng có thể kế thừa lớp này để tự định nghĩa chính sách riêng. Để gỡ lỗi, lệnh `jcmd <PID> Thread.print -format=json` xuất thông tin các luồng dưới dạng JSON. Lợi ích chính là quản lý tác vụ đơn giản, xử lý lỗi nhất quán, tài nguyên được dọn dẹp tự động và không còn tác vụ nào bị bỏ quên chạy ngầm.

## [Taking Out the Trash in Java](https://medium.com/@benweidig/taking-out-the-trash-in-java-19bcc0c7bd0c)

Ben Weidig trình bày tổng quan về cơ chế thu gom rác (garbage collection, GC) của JVM: thay vì cấp phát và giải phóng bộ nhớ thủ công như C/C++, JVM tự tìm các đối tượng không còn được tham chiếu để thu hồi, nhưng việc này không miễn phí và có thể ảnh hưởng đến hiệu năng. Bài viết giải thích heap là nơi chứa đối tượng, được chia theo giả thuyết thế hệ thành Young Generation (Eden và hai vùng Survivor) và Old Generation, bên cạnh Metaspace thay cho PermGen từ Java 8; còn stack là vùng riêng của mỗi luồng, lưu các khung lời gọi phương thức. Minor GC diễn ra nhanh và khó nhận thấy, trong khi major GC có thể gây khoảng dừng "stop-the-world" đáng kể.

Tiếp theo, tác giả so sánh các bộ GC: Serial dành cho ứng dụng đơn luồng hoặc môi trường tài nguyên hạn chế, Parallel ưu tiên thông lượng, G1 chia heap thành nhiều vùng và là mặc định ở nhiều bản JDK, ZGC và Shenandoah hướng tới độ trễ cực thấp đổi lại tốn CPU hơn, còn Epsilon không thu gom gì và chủ yếu dùng để đo đạc. Phần cuối đưa ra lời khuyên thực tế: giảm tạo đối tượng thừa, chọn cấu trúc dữ liệu hợp lý, dùng try-with-resources, bật nhật ký GC và dùng các công cụ như VisualVM hay JDK Mission Control để phân tích trước khi tinh chỉnh kích thước heap và các tham số JVM.

## [How Precision Time Protocol handles leap seconds](https://engineering.fb.com/2025/02/03/production-engineering/how-precision-time-protocol-ptp-handles-leap-seconds/)

Meta giải thích cách họ xử lý giây nhuận (leap second) khi Precision Time Protocol (PTP) ngày càng đóng vai trò lớn trong việc đồng bộ thời gian ở trung tâm dữ liệu. Với NTP, vốn đồng bộ ở mức mili giây, Meta từng dùng kỹ thuật "smearing", tức điều chỉnh dần tốc độ đồng hồ để hấp thụ giây nhuận, theo công thức tuyến tính hoặc bậc hai. Nhưng PTP đạt độ chính xác tới mức nano giây, nên ngay cả smearing tuyến tính cũng tạo độ lệch quá lớn giữa các máy chủ.

Giải pháp của Meta là tự smearing ngay trong thư viện fbclock: mỗi lần được gọi trong giai đoạn smearing, thư viện dịch khoảng thời gian trả về theo một thuật toán không lưu trạng thái và có thể tái lập; dịch vụ vẫn dùng mốc TAI bên trong nhưng có thể trả về giờ UTC cho client. Dù vậy, cách này vẫn gây độ lệch đáng kể giữa các máy, có thể chênh hơn 100 micro giây so với nguồn NTP dùng smearing bậc hai, và khiến các tác vụ chạy định kỳ bị lệch lịch gần 1 mili giây. Vì thế Meta khuyên dùng TAI thay cho UTC khi có thể, dù việc chuyển sang UTC thường vẫn phải làm ở đâu đó, đồng thời ủng hộ đề xuất ngừng thêm giây nhuận sau năm 2035 để cả ngành có thể dựa vào UTC và đơn giản hóa hạ tầng.

## [Developer philosophy](https://qntm.org/devphilo)

qntm, nhà văn khoa học viễn tưởng kiêm lập trình viên, ghi lại triết lý phát triển phần mềm mà anh chia sẻ trong một buổi nói chuyện với các lập trình viên mới vào nghề. Điều quan trọng nhất là đừng bao giờ để dự án rơi vào tình thế mà việc viết lại từ đầu trông hấp dẫn, vì khi đó sai lầm đã xảy ra từ lâu; hãy để ý các dấu hiệu như nợ kỹ thuật chồng chất, thay đổi đơn giản ngày càng khó, khó hướng dẫn người mới và những lỗi không ai hiểu. Anh cũng khuyên đặt mục tiêu xong 90% công việc trong 50% thời gian, vì viết mã chạy được mới chỉ là một nửa chặng đường; phần còn lại là trau chuốt, xử lý trường hợp biên, kiểm thử và tối ưu hiệu năng.

Các nguyên tắc tiếp theo gồm: tự động hóa thói quen tốt bằng kiểm thử hoặc công cụ tự sửa thay vì nhắc nhở thủ công; luôn nghĩ đến dữ liệu "bệnh lý" như request treo mãi, bảng một tỷ dòng hay chuỗi rỗng, vì xử lý trường hợp biên chính là công việc của lập trình viên; khi còn thời gian, hãy tìm cách viết đơn giản hơn; viết mã dễ kiểm thử với giao diện rõ ràng và ít tác dụng phụ; và chọn điểm cân bằng giữa microservice với kiến trúc nguyên khối, chỉ tách dịch vụ khi thật sự có lợi. Cuối cùng, mã không chỉ cần đúng về mặt lý thuyết mà phải đúng một cách hiển nhiên, dễ thấy, để việc thay đổi phần mã xung quanh sau này không trở nên nguy hiểm.

## Bonus

### Bonus 1: Vài video hay ho đến từ [ByteByteGo](https://bytebytego.com/)

[System Design: Why Is Docker Important?](https://www.youtube.com/watch?v=QEzbZKtLi-g)

### Bonus 2: Vài ảnh hay ho đến từ [ByteByteGo](https://bytebytego.com/)

![JWT 101: Key to Stateless Authentication](https://substack-post-media.s3.amazonaws.com/public/images/fc4c9cac-3046-4b45-9dd8-7dccc79b4e2c_1280x1608.gif)

---

*Bài viết đã được viết lại bởi Claude Code với Opus 5.5 vào ngày 27/09/2026.*
