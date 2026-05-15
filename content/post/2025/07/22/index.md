---
title: "Newsletter #33"
date: 2025-07-22
tags: ["AI-Assisted", "Java", "Performance", "Memory Management", "JavaScript"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #33.*

## [How ZGC allocates memory for the Java heap](https://joelsiks.com/posts/zgc-heap-memory-allocation/)

ZGC (Z Garbage Collector) là một trong những bộ thu gom rác hiện đại nhất của Java, được thiết kế để đạt được độ trễ thấp ngay cả với kích thước heap lớn. Bài viết này đi sâu vào cách ZGC quản lý và phân bổ bộ nhớ heap, một khía cạnh quan trọng giúp ZGC đạt được hiệu suất ấn tượng.

Điểm đặc biệt của ZGC là cách nó tách biệt việc quản lý bộ nhớ vật lý và bộ nhớ ảo. ZGC chia heap thành các trang với ba kích thước khác nhau: Nhỏ (2 MB), Vừa (32 MB) và Lớn (kích thước linh hoạt). Điều này giúp tối ưu hóa việc sử dụng bộ nhớ và giảm thiểu phân mảnh.

Chiến lược phân bổ bộ nhớ của ZGC dựa trên phương thức phân bổ theo dung lượng, có thể xử lý bốn tình huống khác nhau: sử dụng bộ nhớ từ vùng đệm, tăng dung lượng bằng cách cấp phát bộ nhớ mới, thu hồi bộ nhớ từ vùng đệm, hoặc kết hợp giữa thu hồi và tăng dung lượng. ZGC cũng hỗ trợ phân bổ đa phân vùng đặc biệt hữu ích cho các hệ thống NUMA.

Những điểm nổi bật của ZGC:
- Dự trữ bộ nhớ ảo nhiều hơn cần thiết (mặc định là 16 lần kích thước heap tối đa) để chống phân mảnh
- Tích cực xếp lại heap khi các trang được giải phóng
- Hỗ trợ thay đổi kích thước heap linh hoạt
- Sử dụng đơn vị bộ nhớ tối thiểu là 2 MB
- Thiết kế thích ứng cho các kiến trúc hệ thống khác nhau

## [Optimizing the Garbage Collector when Migrating Cloud Workloads](https://foojay.io/today/optimizing-the-garbage-collector-when-migrating-cloud-workloads/)

Khi di chuyển các ứng dụng Java lên đám mây, đặc biệt là sang kiến trúc Arm, việc tối ưu hóa bộ thu gom rác trở thành yếu tố quan trọng để đảm bảo hiệu suất. Bài viết này cung cấp hướng dẫn chi tiết về cách tinh chỉnh GC để phù hợp với môi trường đám mây hiện đại.

Tác giả khuyến nghị G1 GC là điểm khởi đầu an toàn cho hầu hết các ứng dụng máy chủ, trong khi ZGC hoặc Shenandoah nên được cân nhắc cho các ứng dụng yêu cầu độ trễ thấp với kích thước heap lớn. Điều quan trọng là sử dụng OpenJDK phiên bản hiện đại (Java 11 trở lên) để tận dụng các tối ưu hóa dành riêng cho Arm.

Chiến lược di chuyển hiệu quả bao gồm việc điều chỉnh kích thước heap cẩn thận để cân bằng giữa tần suất thu gom và thời gian tạm dừng. Sử dụng `-XX:MaxGCPauseMillis` để cho phép JVM tự động tối ưu hóa thời gian tạm dừng và bật tính năng thay đổi kích thước heap tự động với `-XX:+UseAdaptiveSizePolicy`.

Những lợi ích của việc di chuyển lên đám mây:
- Triển khai đa kiến trúc cho phép chọn tỷ lệ giá-hiệu suất tối ưu
- Kiến trúc Arm Neoverse cung cấp số lượng nhân xử lý có thể mở rộng với hiệu suất GC mạnh mẽ
- Nguyên tắc "viết một lần, chạy mọi nơi" của Java giúp quá trình di chuyển diễn ra mượt mà
- Sử dụng nhật ký GC và Java Flight Recorder để theo dõi và điều chỉnh

## [How JavaScript Works Behind the Scenes](https://www.deepintodev.com/blog/how-javascript-works-behind-the-scenes)

JavaScript là ngôn ngữ đơn luồng nhưng lại có khả năng xử lý các tác vụ bất đồng bộ một cách hiệu quả. Bài viết này giải thích chi tiết cơ chế hoạt động bên trong của động cơ JavaScript và cách nó quản lý việc thực thi mã.

Cốt lõi của động cơ JavaScript bao gồm hai thành phần chính: Heap - vùng nhớ lưu trữ các đối tượng và biến, và Ngăn xếp gọi hàm - quản lý việc thực thi chương trình theo cơ chế vào sau ra trước. Mỗi khi một hàm được gọi, một "ngữ cảnh thực thi" mới được tạo ra chứa các biến cục bộ, tham số hàm, giá trị `this` và tham chiếu đến phạm vi bên ngoài.

Điều thú vị là cách JavaScript xử lý các tác vụ bất đồng bộ mặc dù chỉ có một luồng. Các API của trình duyệt (như fetch, setTimeout, geolocation) cho phép chuyển các tác vụ dài sang trình duyệt xử lý, trong khi Hàng đợi tác vụ và Vòng lặp sự kiện đảm bảo các hàm gọi lại được thực thi đúng thời điểm. Vòng lặp sự kiện liên tục kiểm tra Ngăn xếp gọi hàm và di chuyển các tác vụ từ hàng đợi vào ngăn xếp khi ngăn xếp rỗng.

Cơ chế ưu tiên thực thi:
- Hàng đợi tác vụ nhỏ (Promises, async/await) có độ ưu tiên cao hơn Hàng đợi tác vụ thường
- Vòng lặp sự kiện luôn xử lý hết các tác vụ nhỏ trước khi chuyển sang các tác vụ thường
- Điều này giải thích tại sao các hàm gọi lại của Promise thường được thực thi trước các hàm gọi lại của setTimeout
- Cơ chế này giúp JavaScript duy trì tính "không chặn" mà không cần đa luồng

## [Why embedding models should match + Advice for starting a blog](https://foojay.io/today/breaktime-tech-talks-ep39-why-embedding-models-should-match-advice-for-starting-a-blog/)

Các mô hình nhúng trong cơ sở dữ liệu vector cần phải khớp chính xác để đảm bảo kết quả tìm kiếm tin cậy. Jennifer Reif chia sẻ kinh nghiệm khi sử dụng các mô hình nhúng khác nhau của OpenAI (text-ada-002 và text-3-small), dù trong cùng họ nhưng vẫn gây ra sự khác biệt trong kết quả tìm kiếm tương đồng.

Vấn đề cốt lõi là mỗi cơ sở dữ liệu vector có thể thực hiện tìm kiếm tương đồng theo cách riêng, và việc sử dụng mô hình nhúng khác nhau sẽ tạo ra biểu diễn vector khác nhau cho cùng một nội dung. Điều này dẫn đến kết quả không nhất quán và có thể gây khó khăn trong việc duy trì hệ thống RAG (Truy xuất-Tăng cường Tạo sinh).

Ngoài ra, bài viết còn đưa ra những lời khuyên thiết thực cho việc bắt đầu viết blog:
- Viết cho bản thân trước tiên - ghi lại hành trình học tập và tạo tài liệu tham khảo cá nhân
- Sử dụng giọng văn gần gũi, tự nhiên như trò chuyện
- Lập kế hoạch và chỉnh sửa nhưng không quá cầu kỳ
- Tận dụng tính linh hoạt của nội dung số - cho phép người đọc chọn lọc nội dung
- Viết về giải pháp cho những vấn đề mà bạn từng gặp khó khăn để tìm câu trả lời

## [HULA: Human-in-the-loop LLM-based agents for software development](https://www.atlassian.com/blog/atlassian-engineering/hula-blog-autodev-paper-human-in-the-loop-software-development-agents)

Atlassian giới thiệu HULA (Tác nhân AI có con người tham gia), một khung làm việc cho tác nhân AI hỗ trợ phát triển phần mềm với sự tham gia kiểm soát của kỹ sư. Đây là nghiên cứu được chấp nhận bởi Hội nghị Quốc tế về Kỹ thuật Phần mềm (SEIP) 2025, thể hiện tiềm năng to lớn trong việc ứng dụng AI vào phát triển phần mềm.

HULA hoạt động theo quy trình 4 bước: thiết lập ngữ cảnh từ nhiệm vụ Jira, tạo kế hoạch viết mã để kỹ sư xem xét, tạo mã với xác thực, và cuối cùng tạo yêu cầu kéo code. Khung làm việc này không thay thế lập trình viên mà hỗ trợ tự động hóa các tác vụ lặp lại trong khi vẫn giữ kỹ sư ở vị trí kiểm soát.

Kết quả thử nghiệm trong 2 tháng rất ấn tượng:
- Tạo được kế hoạch viết mã cho 79% nhiệm vụ
- Sinh mã cho 87% kế hoạch được phê duyệt
- 59% yêu cầu kéo code được hợp nhất vào kho mã
- Vượt qua kiểm thử đơn vị cho 31% vấn đề SWE-bench
- 45% mã được tạo ra được đánh giá rất tương đồng với mã của con người

Khảo sát với 109 kỹ sư cho thấy 62% đồng ý HULA xác định đúng các file cần sửa, và 61% thấy mã được tạo ra dễ hiểu. Điều đặc biệt là HULA tập trung vào việc tăng cường khả năng con người thay vì thay thế, tạo ra mô hình hợp tác hiệu quả giữa AI và lập trình viên.

## [Refactoring Gone Wild: Avoiding Code Smells and Cleaning Up the Mess](https://techhub.iodigital.com/articles/refactoring-gone-wild-avoiding-code-smells-and-cleaning-up-the-mess)

Tái cấu trúc mã là một nghệ thuật quan trọng trong phát triển phần mềm, nhưng việc nhận diện và xử lý mùi mã hiệu quả đòi hỏi kinh nghiệm và kỹ thuật phù hợp. Bài viết này phân tích 10 mùi mã phổ biến và cách khắc phục chúng một cách có hệ thống.

Các mùi mã được nhấn mạnh bao gồm Kim tự tháp Diệt vong (điều kiện lồng sâu), Hàm Quái vật Khổng lồ, Tham số Bí ẩn, và Rừng Kiểm tra Null. Mỗi mùi đều có tác động tiêu cực đến khả năng bảo trì và dễ đọc của mã, đồng thời làm tăng độ phức tạp không cần thiết.

Kỹ thuật tái cấu trúc được khuyến nghị:
- Sử dụng mệnh đề bảo vệ để đơn giản hóa logic điều kiện
- Tạo lớp dữ liệu để nhóm các tham số liên quan
- Tách logic phức tạp thành các hàm nhỏ, tập trung
- Tận dụng tính năng an toàn null của ngôn ngữ
- Tập trung hóa xác thực và xử lý lỗi
- Áp dụng tính bất biến khi có thể
- Áp dụng kỹ thuật lập trình hàm như `filter`, `groupBy`

Triết lý quan trọng nhất là "Tiến bộ nhỏ từng bước vẫn tạo ra sự khác biệt lớn". Tái cấu trúc không cần phải là đại tu toàn diện, mà có thể thực hiện từng bước nhỏ để dần cải thiện chất lượng mã và khả năng bảo trì.

## [How to write error messages that actually help users rather than frustrate them](https://piccalil.li/blog/how-to-write-error-messages-that-actually-help-users-rather-than-frustrate-them/)

Thông báo lỗi thường là điểm tiếp xúc quan trọng nhất giữa sản phẩm và người dùng trong lúc họ gặp khó khăn, nhưng phần lớn thông báo lỗi lại được viết theo cách máy móc và gây khó chịu. Bài viết này cung cấp khung làm việc để viết thông báo lỗi thực sự hữu ích và đồng cảm.

Nguyên tắc cốt lõi là "viết như một con người" - thay vì những thông báo chung chung như "Đã xảy ra lỗi", hãy sử dụng ngôn ngữ gần gũi và rõ ràng. Ví dụ thay vì "Không phát hiện kết nối WiFi", nên viết "Có vẻ như bạn đang offline. Vui lòng kết nối mạng WiFi và thử lại."

Nguyên tắc chính cho thông báo lỗi hữu ích:
- Xác định các điểm lỗi tiềm tăng và kiểm tra toàn bộ trải nghiệm người dùng
- Sử dụng thể chủ động để giải thích rõ ràng điều gì đã xảy ra và tại sao
- Tránh lối viết khôi hài - không dùng ngôn ngữ dễ thương hoặc giọng điệu chả thải
- Cung cấp các bước tiếp theo rõ ràng cho mọi tình huống lỗi
- Duy trì tính nhất quán trong các mẫu tài liệu

Câu hỏi quan trọng khi viết thông báo lỗi: "Liệu thông điệp này có hiệu quả với ai đó đang có ngày tồi tệ?". Thông báo lỗi cần giúp người dùng phục hồi nhanh chóng, thể hiện sự tôn trọng thời gian của họ, và duy trì lòng tin trong trải nghiệm sản phẩm. Đối với lỗi có thể sửa, giải thích chính xác người dùng nên làm gì; đối với lỗi không thể sửa, đưa ra các hành động thay thế hoặc phương thức liên hệ.

## [The difficulty in big tech](https://www.seangoedecke.com/difficulty-in-big-tech/)

Nhiều người thường có ấn tượng rằng các công ty công nghệ lớn làm việc chậm chạp và kém hiệu quả, nhưng Sean Goedecke giải thích rằng điều này có nguyên nhân sâu xa hơn nhiều so với những gì bề mặt có thể quan sát được.

Thách thức chính trong các công ty công nghệ lớn không phải là kỹ sư kém cỏi hay lực lượng làm việc lười biếng, mà là sự gia tăng theo cấp số nhân của độ phức tạp tính năng. Khi số lượng tính năng tăng lên, các tương tác tiềm tăng giữa chúng tăng theo cấp số nhân. Mỗi tính năng mới phải được cân nhắc kỹ lưỡng so với các tính năng hiện tại, và "các tính năng có thể cản trở lẫn nhau theo nhiều cách khác nhau".

Tải trọng nhận thức mà các kỹ sư phải đối mặt là rất lớn - họ phải liên tục xem xét các tương tác phức tạp giữa các tính năng, dẫn đến tình huống "việc hoàn thành bất kỳ thứ gì đều thực sự rất, rất khó". Đây không phải là dấu hiệu của sự không hiệu quả mà là kết quả của việc quản lý cẩn thận các hệ sinh thái công nghệ ngày càng phức tạp.

Lý do kinh tế cũng đóng vai trò quan trọng: các tính năng biên có thể tạo ra doanh thu đáng kể. "1% doanh thu của Google Ads hoặc AWS S3 là một số tiền lớn", vì vậy các công ty được khời gợi để thêm độ phức tạp nhằm tối đa hóa lợi nhuận tài chính. Điều này tạo ra một chu kỳ mà độ phức tạp tiếp tục gia tăng, và sự chậm chạp cảm nhận được thực chất là việc điều hướng chiến lược trong bối cảnh công nghệ phức tạp với mức độ rủi ro kinh tế đáng kể.

---

*Bài viết đã được review và cập nhật bởi Claude Code với Opus 4.7 (1M context).*
