---
title: "Newsletter #33"
date: 2025-07-22
tags: ["AI-Assisted", "Java", "Garbage Collection", "JavaScript", "AI Agents", "Refactoring", "UX"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #33.*

## [How ZGC allocates memory for the Java heap](https://joelsiks.com/posts/zgc-heap-memory-allocation/)

ZGC là bộ thu gom rác độ trễ thấp của Java, và bài viết này đi sâu vào cách nó cấp phát bộ nhớ cho heap. ZGC chia heap thành các "trang" logic theo ba loại: trang nhỏ 2 MB cho phần lớn đối tượng, trang vừa có kích thước tính động từ 4 đến 32 MB, và trang lớn chỉ chứa đúng một đối tượng. Điểm đặc biệt là ZGC tách rời bộ nhớ vật lý khỏi bộ nhớ ảo, và chủ động dự trữ không gian địa chỉ ảo gấp tới 16 lần kích thước heap tối đa (32 lần trên hệ thống NUMA) để dễ tìm được vùng địa chỉ liên tục, qua đó hạn chế phân mảnh.

Bộ nhớ đang rảnh được giữ trong một bộ đệm ánh xạ tổ chức bằng cây đỏ-đen. Khi cần cấp phát, ZGC thử lần lượt: lấy vùng liên tục có sẵn trong bộ đệm (nhanh nhất), cấp thêm bộ nhớ vật lý, "thu hoạch" bằng cách ánh xạ lại nhiều vùng rời rạc thành một vùng liên tục, hoặc kết hợp hai cách sau; chỉ khi tất cả thất bại mới kích hoạt thu gom rác hoặc ném OutOfMemoryError. Trên hệ thống NUMA, heap được chia đều thành các phân vùng gắn với từng nút để ưu tiên cấp phát bộ nhớ cục bộ. Bài viết cũng nêu một đánh đổi thực tế: đặt kích thước heap tối thiểu bằng tối đa sẽ cấp toàn bộ bộ nhớ ngay khi khởi động, còn cấp phát động trong lúc chạy lại làm tăng độ trễ.

## [Optimizing the Garbage Collector when Migrating Cloud Workloads](https://foojay.io/today/optimizing-the-garbage-collector-when-migrating-cloud-workloads/)

Nguyên tắc "viết một lần, chạy mọi nơi" giúp ứng dụng Java chuyển từ máy x86 sang các máy chủ đám mây dùng chip Arm như AWS Graviton hay Azure Cobalt khá suôn sẻ, nhưng để đạt hiệu năng tốt nhất trên kiến trúc Arm Neoverse thì vẫn cần tinh chỉnh bộ thu gom rác (GC). Bài viết khuyên dùng OpenJDK từ Java 11 trở lên để tận dụng các tối ưu riêng cho nền tảng Arm mới, chọn G1 làm điểm khởi đầu an toàn cho phần lớn ứng dụng máy chủ vì cân bằng tốt giữa thông lượng và độ trễ, và cân nhắc ZGC hoặc Shenandoah (Java 17 trở lên) cho những ứng dụng nhạy cảm với độ trễ và có heap lớn.

Về cấu hình, tác giả gợi ý dùng `-XX:MaxGCPauseMillis` để đặt mục tiêu thời gian tạm dừng và để JVM tự điều chỉnh, bật `-XX:+UseAdaptiveSizePolicy` để JVM thay đổi kích thước heap và các thế hệ theo tải thực tế, đồng thời chọn kích thước heap cẩn thận nhằm cân bằng giữa tần suất thu gom và thời gian tạm dừng. Cuối cùng, hãy bật nhật ký GC bằng `-Xlog:gc` và dùng Java Flight Recorder để theo dõi hoạt động của GC, vì chỉ có thử nghiệm với khối lượng công việc thật mới cho biết cấu hình nào đạt được mục tiêu hiệu năng của bạn.

## [How JavaScript Works Behind the Scenes](https://www.deepintodev.com/blog/how-javascript-works-behind-the-scenes)

JavaScript là ngôn ngữ đơn luồng, vậy làm sao nó xử lý được các tác vụ bất đồng bộ mà không bị "đơ"? Bài viết giải thích từ bên trong động cơ JavaScript (như V8 của Chrome và Node.js), vốn gồm hai phần chính: heap là vùng nhớ lưu đối tượng và biến, còn ngăn xếp lời gọi (call stack) quản lý việc thực thi chương trình và cũng chính là lý do JavaScript chỉ có một luồng. Mỗi lần gọi hàm, một ngữ cảnh thực thi mới được đẩy lên ngăn xếp, chứa biến cục bộ, tham số, giá trị `this` và tham chiếu tới phạm vi bên ngoài; vì các ngữ cảnh chạy tuần tự, một vòng lặp nặng sẽ chặn mọi đoạn mã phía sau nó.

Để tránh bị chặn, các tác vụ tốn thời gian được giao cho Web API của trình duyệt như `fetch`, `setTimeout` hay geolocation. Khi hoàn tất, hàm gọi lại của chúng được đưa vào hàng đợi tác vụ (task queue), còn các thao tác dựa trên Promise (`.then`, `.catch`, `async/await`) đi vào hàng đợi vi tác vụ (microtask queue). Vòng lặp sự kiện liên tục kiểm tra ngăn xếp, và khi ngăn xếp rỗng thì luôn xử lý hết hàng đợi vi tác vụ trước rồi mới lấy tác vụ thường. Đó là lý do hàm gọi lại của Promise thường chạy trước hàm gọi lại của `setTimeout`, và cũng là cách JavaScript giữ được tính không chặn mà không cần đa luồng.

## [Why embedding models should match + Advice for starting a blog](https://foojay.io/today/breaktime-tech-talks-ep39-why-embedding-models-should-match-advice-for-starting-a-blog/)

Trong tập này của Breaktime Tech Talks, Jennifer Reif kể lại một bài học thực tế về việc vì sao các mô hình nhúng (embedding model) phải khớp nhau. Cô đã dùng hai mô hình khác nhau của OpenAI (text-ada-002 và text-3-small) để tạo vector trong Pinecone và Neo4j, rồi truy vấn từ ứng dụng bằng một mô hình không trùng khớp. Dù cùng một họ, biểu diễn vector của hai mô hình khác nhau đến mức tìm kiếm tương đồng trả về kết quả vô nghĩa hoặc không trả về gì. Cách khắc phục là dùng đúng một mô hình cho cả dữ liệu lưu trong cơ sở dữ liệu lẫn câu truy vấn từ ứng dụng; ngay cả khi đã khớp mô hình, mỗi cơ sở dữ liệu vector vẫn có thể cho kết quả hơi khác nhau do cách cài đặt tìm kiếm tương đồng riêng, điều cần lưu ý khi xây dựng hệ thống RAG.

Phần thứ hai là lời khuyên cho người muốn bắt đầu viết blog kỹ thuật: hãy viết cho bản thân trước, ghi lại hành trình học và cách giải quyết vấn đề để sau này tra cứu; dùng giọng văn tự nhiên như đang trò chuyện; để các dự án đã hoàn thành làm sẵn dàn ý và chỉnh sửa vừa đủ, không quá cầu kỳ; tận dụng việc người đọc có thể chỉ chọn đọc phần họ cần; và ưu tiên viết về những vấn đề mà bạn từng vất vả tìm lời giải trên mạng, vì đó cũng là thứ người khác đang tìm kiếm.

## [HULA: Human-in-the-loop LLM-based agents for software development](https://www.atlassian.com/blog/atlassian-engineering/hula-blog-autodev-paper-human-in-the-loop-software-development-agents)

Atlassian giới thiệu HULA, một khung tác nhân dựa trên LLM có con người tham gia vào vòng lặp (human-in-the-loop), giúp tự động hóa các tác vụ phát triển thường ngày trong khi kỹ sư vẫn giữ quyền quyết định. Nghiên cứu này được chấp nhận tại hội nghị ICSE 2025, ở nhánh Kỹ thuật phần mềm trong thực tiễn (SEIP). Quy trình gồm bốn bước: kỹ sư chọn một đầu việc trên Jira và bổ sung ngữ cảnh; HULA lập kế hoạch nêu rõ các file và thay đổi cần làm để kỹ sư duyệt hoặc yêu cầu sửa; HULA sinh mã, dựa vào phản hồi của trình biên dịch và linter để sửa cho đến khi hợp lệ rồi chờ kỹ sư duyệt; cuối cùng mã được tạo thành pull request theo quy trình thông thường của nhóm. Đến nay đã có khoảng 900 pull request từ HULA được hợp nhất tại Atlassian.

Trên bộ SWE-bench, HULA vượt qua kiểm thử đơn vị ở 31% vấn đề, và 45% mã sinh ra được đánh giá rất giống mã do con người viết. Qua 663 đầu việc trong hai tháng, HULA lập được kế hoạch cho 79% trường hợp (82% trong số đó được kỹ sư duyệt), sinh mã cho 87% kế hoạch đã duyệt, 25% đi đến bước tạo pull request và 59% số pull request được hợp nhất. Khảo sát 109 kỹ sư cho thấy 62% đồng ý HULA xác định đúng file cần sửa và 61% thấy mã dễ hiểu, nhưng chỉ 33% cho rằng mã thực sự giải quyết được đầu việc. Kỹ sư đánh giá cao việc tiết kiệm thời gian và tài liệu tốt hơn, song vẫn phải chỉnh tay chức năng và mong trải nghiệm người dùng được cải thiện.

## [Refactoring Gone Wild: Avoiding Code Smells and Cleaning Up the Mess](https://techhub.iodigital.com/articles/refactoring-gone-wild-avoiding-code-smells-and-cleaning-up-the-mess)

Tái cấu trúc mã là kỹ năng quan trọng, nhưng để làm tốt thì trước hết phải nhận ra được các "mùi mã" (code smell). Bài viết dùng ví dụ bằng Kotlin để phân tích hơn mười mùi mã phổ biến như Kim tự tháp diệt vong (điều kiện lồng nhau quá sâu), đặt tên thiếu nhất quán, tham số bí ẩn, hàm khổng lồ, rừng kiểm tra null, biểu thức boolean rối rắm, xử lý lỗi hỗn loạn, lạm dụng collection có thể thay đổi, lặp lại logic xác thực và dùng coroutine sai cách. Mỗi mùi đều làm mã khó đọc, khó bảo trì và phức tạp hơn mức cần thiết.

Với từng mùi, tác giả đưa ra cách khắc phục cụ thể: dùng mệnh đề bảo vệ (guard clause) để giảm lồng nhau, thống nhất quy ước đặt tên, gom các tham số liên quan vào data class, tách hàm lớn thành các hàm nhỏ dễ kiểm thử, dùng toán tử safe call và Elvis để xử lý null, đặt tên cho biểu thức boolean bằng hàm trợ giúp, tập trung hóa xử lý lỗi và xác thực, ưu tiên tính bất biến, áp dụng structured concurrency và tận dụng các hàm thư viện chuẩn như `groupBy`, `takeIf`, `runCatching`. Thông điệp cuối là "tiến bộ nhỏ từng bước vẫn tạo ra khác biệt lớn": không cần đại tu toàn bộ, chỉ cần cải thiện dần từng chút để mã dễ đọc và dễ bảo trì hơn.

## [How to write error messages that actually help users rather than frustrate them](https://piccalil.li/blog/how-to-write-error-messages-that-actually-help-users-rather-than-frustrate-them/)

Thông báo lỗi xuất hiện đúng lúc người dùng đang gặp khó khăn, nhưng lại thường được viết rất máy móc. Bài viết đưa ra cách tiếp cận để viết thông báo lỗi thực sự giúp ích: trước hết hãy rà soát mọi điểm có thể xảy ra lỗi như lỗi biểu mẫu, lỗi kiểm tra dữ liệu, trang 404 hay 500, tìm kiếm không có kết quả và mất kết nối. Sau đó hãy viết như đang trực tiếp hướng dẫn một người ngồi cạnh: thay vì "Dữ liệu nhập không hợp lệ", hãy viết "Vui lòng nhập mã 6 chữ số chúng tôi đã gửi qua email"; thay vì "Không phát hiện kết nối WiFi", hãy viết "Có vẻ như bạn đang offline, hãy kết nối WiFi và thử lại".

Tác giả khuyên tránh giọng điệu đùa cợt, dễ thương, vì với người đang bực bội nó chỉ khiến vấn đề có vẻ bị xem nhẹ; bài viết kể trường hợp một người dùng bỏ luôn giỏ hàng chỉ vì bị gọi là "silly sausage" khi gõ sai. Hãy dùng thể chủ động để nói rõ chuyện gì đã xảy ra và vì sao, ví dụ "Chúng tôi không thể xử lý hồ sơ vì định dạng file không được hỗ trợ, vui lòng đính kèm lại dưới dạng jpeg". Với lỗi người dùng tự sửa được, hãy nói chính xác họ cần làm gì; với lỗi không sửa được, hãy đưa ra lựa chọn thay thế như thử lại, thông tin liên hệ hoặc cam kết dữ liệu không bị mất. Cuối cùng, hãy ghi lại các mẫu thông báo cho những tình huống thường gặp để giữ sự nhất quán trong toàn sản phẩm.

## [The difficulty in big tech](https://www.seangoedecke.com/difficulty-in-big-tech/)

Nhiều người cho rằng các công ty công nghệ lớn chậm chạp vì quy trình tệ hay kỹ sư lười biếng, nhưng Sean Goedecke lập luận rằng nguyên nhân thật sự là độ phức tạp tích lũy từ các tính năng. Mỗi tính năng mới có thể tương tác với tất cả những tính năng có trước, nên số tương tác cần cân nhắc tăng vọt khi sản phẩm lớn dần. Tệ hơn là những tính năng "hiểm hóc" ảnh hưởng tới toàn hệ thống: chẳng hạn thêm một loại người dùng mới buộc kỹ sư phải xem lại quyền truy cập ở mọi tính năng hiện có, và phải nhớ điều đó mãi về sau. Gánh nặng nhận thức này lớn đến mức "việc hoàn thành bất kỳ thứ gì cũng thực sự rất, rất khó", khiến kỹ sư dễ bỏ sót cả những vấn đề hiển nhiên.

Vậy tại sao các công ty vẫn tiếp tục thêm tính năng? Vì chúng mang lại tiền: như Dan Luu nhận xét, những tính năng tưởng như nhỏ nhặt có thể đóng góp vài điểm phần trăm doanh thu, và 1% doanh thu của những sản phẩm như Google Ads hay AWS S3 đã là một con số khổng lồ. Theo tác giả, sự chậm chạp của các công ty lớn không phải là dấu hiệu tổ chức rối loạn mà là một đánh đổi có chủ đích: chấp nhận tốc độ phát triển chậm hơn để đổi lấy doanh thu từ một sản phẩm dày đặc tính năng.

---

*Bài viết đã được viết lại bởi Claude Code với Opus 5.5 vào ngày 27/09/2026.*
