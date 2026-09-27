---
title: "Newsletter #23"
date: 2025-05-10
tags: [ "AI-Assisted", "Java", "Software Engineering", "AI", "Career Development", "Performance", "Database" ]
categories: [ "Newsletter" ]
---

*Mời bạn thưởng thức Newsletter #23.*

## [LLMs: An Operator's View](https://theengineeringmanager.substack.com/p/llms-an-operators-view)

James Stanier nhìn LLM từ góc độ của người điều hành một tổ chức kỹ thuật. Theo ông, "mặt bằng" năng suất của lập trình viên đang được nâng lên: ngay cả những người hoài nghi cũng thừa nhận các công cụ như Copilot hay Cursor giúp dựng nguyên mẫu nhanh hơn, gợi ý mã nguồn và tự sinh kiểm thử. Vì vậy, người quản lý nên chủ động đầu tư gói trả phí cho đội ngũ và triển khai có kế hoạch: khảo sát mức độ sử dụng, chọn ra những người đi đầu để lan tỏa kinh nghiệm và theo dõi hiệu quả theo thời gian. Khi năng suất tăng, tổ chức có thể làm được nhiều việc hơn với ít người hơn, nên trước khi tuyển thêm, hãy tối ưu đội ngũ hiện có bằng công cụ và đào tạo, vì cách này rẻ hơn nhiều so với tuyển một kỹ sư senior.

Mặt trái là tốc độ sinh mã nguồn nhanh không đồng nghĩa với chất lượng. Stanier khuyên siết chặt quy trình review, chẳng hạn yêu cầu nhiều người duyệt và thường xuyên nhắc lại kiến thức bảo mật cho đội ngũ. Phỏng vấn cũng bị ảnh hưởng: ứng viên dùng LLM trong buổi phỏng vấn từ xa làm nhiễu tín hiệu đánh giá, nên công ty cần một chính sách rõ ràng, hoặc cho phép dùng và tập trung kiểm tra tư duy phản biện, hoặc cấm hẳn, và phải thông báo trước cho ứng viên. Thông điệp chung là việc áp dụng LLM giờ là khoản đầu tư hạ tầng bắt buộc, đi kèm cơ chế quản lý để giữ vững chất lượng mã nguồn và chất lượng tuyển dụng.

## [The Reality of Tech Interviews in 2025](https://newsletter.pragmaticengineer.com/p/the-reality-of-tech-interviews)

Gergely Orosz cùng Evan King (cựu Staff Engineer tại Meta) và Stefan Mai (cựu Engineering Manager tại Amazon và Meta) mô tả một thị trường tuyển dụng vừa phục hồi vừa khắt khe hơn. Số vị trí tuyển dụng ở Big Tech tăng khoảng 40% so với năm trước, tổng số tin tuyển dụng công nghệ tăng từ mức đáy 163.000 năm 2023 lên khoảng 230.000, nhưng vẫn thấp hơn nhiều so với đỉnh giai đoạn 2020–2022. Sự phục hồi này rất chọn lọc: các vị trí về hạ tầng AI và vận hành ML được trả lương rất cao, trong khi kỹ sư mới ra trường gặp khó khăn lớn, có người liên hệ 100 công ty mà chỉ nhận được 4 buổi phỏng vấn và không có lời mời nào sau sáu tháng. Ở cấp trung, quy trình kéo dài hơn, có ứng viên phải trải qua mười một vòng phỏng vấn mới nhận được offer.

Độ khó của các bài phỏng vấn cấu trúc dữ liệu, giải thuật và thiết kế hệ thống cũng tăng rõ rệt: nhà tuyển dụng mong đợi lời giải hoàn chỉnh, có xử lý lỗi và kiểm tra đầu vào. Hai xu hướng đáng chú ý là "downleveling", khi ứng viên cấp staff chấp nhận vị trí senior sau thời gian tìm việc dài, và bước ghép đội (team matching) trở thành một vòng sàng lọc bổ sung, đôi khi làm chậm quá trình nhiều tháng. Lời khuyên của các tác giả là chuẩn bị kỹ lưỡng cho cả vòng kỹ thuật lẫn vòng hành vi ở mọi cấp độ, đặc biệt với các mảng chuyên sâu, và tận dụng các offer cạnh tranh để không bị kẹt trong giai đoạn ghép đội.

## [Senior Developer Skills in the AI Age: Leveraging Experience for Better Results](https://manuel.kiessling.net/2025/03/31/how-seasoned-developers-can-achieve-great-results-with-ai-coding-agents/)

Manuel Kießling cho rằng các AI coding agent như Cursor không làm kinh nghiệm của kỹ sư lâu năm mất giá trị, mà ngược lại còn khuếch đại nó. Mô hình AI có kiến thức lập trình rộng nhưng gần như không hiểu kiến trúc cụ thể của dự án, nên kết quả phụ thuộc vào cách con người dẫn dắt. Dựa trên trải nghiệm cùng đội ngũ tại Joboo, tác giả đưa ra ba biện pháp. Thứ nhất là yêu cầu có cấu trúc tốt: mô tả rõ quan hệ dữ liệu, kiến trúc hệ thống và phạm vi cần làm để AI không đi lạc hướng. Thứ hai là hàng rào dựa trên công cụ: linter, phân tích tĩnh và bộ kiểm thử cung cấp phản hồi liên tục, để AI tự sửa khi một bước kiểm tra thất bại. Thứ ba là "keyframing" bằng tệp: lập trình viên tạo sẵn các tệp khung rỗng với namespace và quy ước đặt tên đúng, giúp AI viết mã nguồn nhất quán với tổ chức thay vì tự ý tạo tệp.

Áp dụng các biện pháp này, đội của tác giả hoàn thành cả một tính năng quản lý hợp đồng trải trên nhiều ứng dụng và repository chỉ trong vài phút thay vì vài giờ. Tác giả thậm chí để AI xây dựng từ đầu một ứng dụng giám sát bằng Python trong vài giờ, dù bản thân ít kinh nghiệm với ngôn ngữ này, nhờ tài liệu yêu cầu đầy đủ và hàng rào phù hợp. Bài học rút ra là khâu lập kế hoạch càng quan trọng hơn bao giờ hết: AI có thể thực hiện gần như mọi thứ, còn kỹ sư giàu kinh nghiệm phải đảm bảo nó làm đúng thứ cần làm.

## [JEP 483: Ahead-of-Time Class Loading & Linking](https://www.morling.dev/blog/jep-483-aot-class-loading-linking/)

Gunnar Morling thử nghiệm JEP 483, tính năng ra mắt trong Java 24 thuộc Project Leyden, cho phép giảm thời gian khởi động ứng dụng Java mà không cần sửa mã nguồn. Ý tưởng là chuyển việc nạp và liên kết class từ lúc chạy sang lúc build, dựa trên nền tảng Application Class Data Sharing (AppCDS) sẵn có. Để tạo AOT cache, cần một lần chạy huấn luyện gồm hai bước: ghi lại danh sách class đã nạp vào một tệp cấu hình, rồi sinh cache từ tệp đó; classpath phải giống nhau giữa lần huấn luyện và lần chạy thật.

Với Apache Kafka 4.0, tệp cache nặng khoảng 66MB và thời gian khởi động giảm từ 690ms xuống 285ms, tức giảm 59%, trong đó phần lớn lợi ích đến từ việc bỏ qua bước đọc và phân tích class. Với Apache Flink, thời gian đến thông điệp đầu tiên giảm từ 1,875 giây xuống 0,913 giây, tức giảm 51%. Tính năng vẫn còn hạn chế: chưa hỗ trợ class loader tùy chỉnh, phải thay đổi tham số khởi động JVM, và việc đưa bước huấn luyện vào quy trình build container image có thể phức tạp. So với biên dịch native của GraalVM, vốn khởi động chỉ trong vài mili giây và tốn ít bộ nhớ hơn nhưng đòi hỏi chỉnh sửa ứng dụng và giả định "thế giới đóng" không cho nạp class động, Project Leyden hướng tới một điểm cân bằng ở giữa, rất hữu ích cho các dịch vụ cloud-native cần khởi động nhanh.

## [Specifications in Jakarta Data](https://in.relation.to/2025/03/28/repository-specifications/)

Gavin King (Hibernate) hướng dẫn cách tự triển khai mẫu "specifications", vốn phổ biến trong Spring Data, cho Jakarta Data. Specification cho phép thêm điều kiện lọc vào truy vấn một cách linh hoạt bằng JPA Criteria API mà không phải viết nhiều mã nguồn rườm rà. Jakarta Data chưa hỗ trợ sẵn tính năng này, nhưng tác giả cho thấy chỉ cần một interface cha dùng chung là `JpaRepository<T>` với hai phương thức: `session()` trả về `StatelessSession` của Hibernate và `entityClass()` trả về lớp entity. Trên nền đó, hai phương thức `find()` và `count()` nhận một specification dưới dạng `BiFunction<CriteriaBuilder, Root<T>, Predicate>` rồi dựng truy vấn Criteria tương ứng.

Nhờ JPA static metamodel, toàn bộ cách làm này an toàn kiểu (type-safe), lỗi được phát hiện ngay lúc biên dịch. Tác giả cũng cung cấp hàm tiện ích `compose()` để kết hợp nhiều specification, và hé lộ rằng Jakarta Data 1.1 đang chuẩn bị một giải pháp "thú vị hơn nhiều". Hai ví dụ dưới đây lần lượt đếm số sách theo tiêu đề và tìm sách theo cả tiêu đề lẫn tên tác giả:

```java
library.count((builder, book) ->
    builder.like(book.get(Book_.title), "%" + title + "%"));
```

```java
library.find((builder, book) ->
    builder.and(
        builder.like(book.get(Book_.title), "%" + title + "%"),
        builder.lower(book.join(Book_.authors).get(Author_.name))
            .equalTo(authorName.toLowerCase())
    ));
```

## [There is no Vibe Engineering](https://serce.me/posts/2025-03-31-there-is-no-vibe-engineering)

Sergey Tselovalnikov (SerCe) phân biệt "vibe coding", thuật ngữ do Andrej Karpathy đặt ra để chỉ cách lập trình chủ yếu qua prompt cho AI thay vì làm việc trực tiếp với mã nguồn, với công việc kỹ thuật phần mềm thực thụ. Luận điểm trung tâm là "kỹ thuật phần mềm là lập trình được tích lũy theo thời gian": vibe coding chỉ giải quyết một thời điểm riêng lẻ, trong khi một hệ thống thật phải chịu được điều kiện thực tế, mở rộng theo nhu cầu, chống lại các mối đe dọa bảo mật, di chuyển dữ liệu người dùng và thích ứng với yêu cầu mới. AI tạo nguyên mẫu rất nhanh, nhưng những mối quan tâm này khó diễn đạt qua prompt và khó kiểm chứng chỉ bằng cách nhìn kết quả cuối cùng. Các thực hành kỹ thuật vốn luôn đẩy vấn đề về sớm hơn, khi sửa còn rẻ; vibe coding lại đẩy chúng về sau, khi chi phí đã cao.

Tác giả hình dung một tương lai "vibe engineering" có thể tồn tại: hệ thống được ghép từ các thành phần do AI sinh ra, đóng gói chặt chẽ, bao quanh bởi kiểm thử nghiêm ngặt, profiling, tracing, triển khai canary và kiểm tra tương thích giao thức. Khi đó vai trò của kỹ sư nghiêng về sự kết hợp giữa kiến trúc sư và kỹ sư nền tảng, viết ít mã nguồn hơn nhưng dành nhiều thời gian hơn cho thiết kế. Nhưng đó vẫn là kỹ thuật phần mềm truyền thống, chỉ với công cụ mới. Theo tác giả, bước ngoặt thật sự chỉ đến khi kỹ sư tự tin nhận trực on-call cho một dịch vụ hoàn toàn do AI viết, điều hiện nay rất ít người dám làm.

## [Refining Var-Handles in Valhalla](https://cr.openjdk.org/~jrose/values/atomic-value-access-api.html)

Tài liệu kỹ thuật này của John Rose (OpenJDK) bàn về cách var-handle, cơ chế truy cập biến trên heap của Java với các thao tác tương tự getfield, putfield và các thao tác nguyên tử như CAS, cần thay đổi để hỗ trợ value type trong Project Valhalla. Thách thức cốt lõi là đảm bảo interpreter, trình biên dịch JIT và JNI truy cập bộ nhớ nhất quán khi một biến có thể được lưu theo nhiều bố cục khác nhau. Enum `LayoutKind` liệt kê sáu loại: `REFERENCE` là con trỏ được quản lý truyền thống và có thể null, `ATOMIC_FLAT` cho giá trị gói gọn trong 64 bit, `NON_ATOMIC_FLAT` cho giá trị nhiều trường lớn hơn 64 bit, hai biến thể có cờ null tương ứng là `NULLABLE_ATOMIC_FLAT` và `NULLABLE_NON_ATOMIC_FLAT`, cùng `BUFFERED` cho bản sao chỉ đọc.

Rose đề xuất bỏ phương thức `getValue` hiện tại vì không đáp ứng đủ, thay bằng ba truy vấn siêu dữ liệu và một thao tác mới: `isFlat()` phân biệt giá trị được làm phẳng với tham chiếu thông thường, `isConsistent()` cho biết giá trị có được truy cập nguyên tử chặt chẽ hay không, `isPortableAtomic()` cho biết có hỗ trợ thao tác nguyên tử nâng cao như CAS, và `copyConsistentValue()` sao chép nguyên tử một word trên heap theo đúng giao thức của bố cục. Ý tưởng thiết kế là tách thành hai tầng: intrinsic mới lo phần sao chép nguyên tử ở mức thấp, còn các phương thức Unsafe sẵn có thao tác trên bộ đệm riêng của từng luồng, cụ thể là mảng một phần tử, để tách và ghép các trường của giá trị. Nhờ vậy, logic của var-handle không phải gánh những chi tiết phức tạp về GC và bố cục bộ nhớ.

---

*Bài viết đã được viết lại bởi Claude Code với Opus 5.5 vào ngày 27/09/2026.*
