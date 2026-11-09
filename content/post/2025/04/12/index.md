---
title: "Newsletter #11"
date: 2025-04-12
tags: ["AI-Assisted", "Newsletter", "Data Engineering", "Software Architecture", "Leadership", "Code Quality", "Java"]
categories: [ "Newsletter" ]
---

*Mời bạn thưởng thức Newsletter \#11.*

## [Enabling near real-time data analytics on the data lake](https://engineering.grab.com/enabling-near-realtime-data-analytics)

Grab chia sẻ cách giảm độ trễ đưa dữ liệu lên hồ dữ liệu xuống vài phút bằng Apache Hudi. Với giải pháp Hive/Parquet cũ, cập nhật cần viết lại các tệp dữ liệu; ví dụ phải đọc và ghi lại toàn bộ tập dữ liệu trong bài nói đến bảng không phân vùng. Grab chọn cấu hình theo từng nguồn: với lưu lượng cao như sự kiện Kafka, bảng Merge On Read cho phép Flink ghi nhanh nhật ký Avro, rồi Spark định kỳ hợp nhất các cập nhật vào tệp Parquet. Đây là quá trình hợp nhất dữ liệu, không chỉ nén tệp. Với nguồn lưu lượng thấp, họ chọn Copy On Write đơn giản hơn và chấp nhận độ trễ khoảng 10–15 phút.

Bài viết cũng đi vào nhiều chi tiết thực tế: phân vùng dữ liệu Kafka theo thời gian sự kiện đến từng giờ để tăng tốc ghi và lập kế hoạch nén, dùng Flink CDC để đọc binlog từ cơ sở dữ liệu quan hệ, và chọn Bucket Index vì tính đơn giản dù khó tăng số bucket khi lưu lượng lớn dần. Kết quả là nhà phân tích có chỉ số kinh doanh mới hơn cho các bảng điều khiển vận hành, còn đội chống gian lận có thể truy vấn giao dịch gần như tức thời mà không ảnh hưởng tới các hệ thống đang vận hành.

## [The Ultimate Guide To Software Architecture Documentation](https://www.workingsoftware.dev/software-architecture-documentation-the-ultimate-guide/)

Bài viết là hướng dẫn đầy đủ về cách viết, tổ chức, trực quan hóa và quản lý tài liệu kiến trúc phần mềm. Tác giả phản bác quan điểm "mã nguồn đã tự mô tả hệ thống": mã nguồn không trả lời được hệ thống nhằm mục tiêu gì, yêu cầu phi chức năng ra sao, hay vì sao một quyết định kiến trúc được đưa ra. Tài liệu tốt giúp các bên liên quan có chung một cách hiểu, hỗ trợ thành viên mới làm quen, định hướng đội phát triển khi làm tính năng mới và giúp trao đổi với các bên bên ngoài hiệu quả hơn.

Về cấu trúc, tác giả giới thiệu mẫu arc42 — một khung tài liệu mã nguồn mở, không phụ thuộc quy trình — kèm lời khuyên không nên viết mọi thứ ngay từ đầu mà bổ sung dần trong quá trình làm. Để trực quan hóa, mô hình C4 mô tả hệ thống qua bốn cấp độ: ngữ cảnh, container, thành phần và mã nguồn. Bài viết cũng khuyến khích cách tiếp cận "tài liệu như mã nguồn" và "sơ đồ như mã nguồn" với các công cụ như AsciiDoc, PlantUML hay Structurizr, để tài liệu được quản lý phiên bản và cập nhật song song với mã nguồn.

## [Beyond the Basics: Designing for a Million Users](https://javarevisited.substack.com/p/beyond-the-basics-designing-for-a)

Bài viết tóm tắt chương đầu cuốn System Design Interview của Alex Xu, đi qua các khái niệm cốt lõi để mở rộng một ứng dụng từ vài người dùng lên hàng triệu người dùng. Xuất phát điểm là một ứng dụng chạy trên một máy chủ duy nhất: khi lượng truy cập tăng, độ trễ tăng vọt, một sự cố có thể làm sập toàn bộ hệ thống, chi phí hạ tầng khó kiểm soát và người dùng ở xa về mặt địa lý gặp tình trạng chậm.

Giải pháp đầu tiên là mở rộng theo chiều ngang thay vì chiều dọc, kết hợp thiết kế phi trạng thái (lưu phiên người dùng ở kho dữ liệu dùng chung) và bộ cân bằng tải để phân phối yêu cầu giữa nhiều máy chủ. Tiếp theo là chọn cơ sở dữ liệu phù hợp (SQL hay NoSQL), áp dụng nhân bản và phân mảnh dữ liệu, dùng bộ nhớ đệm cho dữ liệu hay được truy cập, CDN cho nội dung tĩnh, hàng đợi tin nhắn cho xử lý bất đồng bộ, định tuyến theo vị trí địa lý cho người dùng toàn cầu, và cuối cùng là ghi nhật ký, giám sát đầy đủ. Đây là tài liệu nhập môn tốt cho ai đang ôn luyện phỏng vấn thiết kế hệ thống.

## [Decision-Making Pitfalls for Technical Leaders](https://chelseatroy.com/2024/10/16/decision-making-pitfalls-for-technical-leaders/)

Tác giả chỉ ra rằng ngành phần mềm thường thăng chức lập trình viên lên vai trò lãnh đạo kỹ thuật mà không có sự chuẩn bị, và có ba cạm bẫy ra quyết định vốn ít gây hại ở cấp lập trình viên nhưng trở nên nguy hiểm khi người đó có nhiều quyền hơn. Thứ nhất là giả định ngữ cảnh: áp dụng "thực hành tốt nhất" mà không hiểu nó phù hợp với trường hợp nào, dẫn tới giải pháp lệch vấn đề và không giải thích được cho đội hay cấp trên. Thứ hai là coi mọi tiêu chí đều cần tối ưu, khiến quyết định kéo dài mãi hoặc liên tục bị mở lại, gây khó cho các đội phụ thuộc. Thứ ba là tạo ra tình huống khẩn cấp giả, đẩy đội vào áp lực thời gian liên tục vì những vấn đề lẽ ra đã lường trước được.

Cách khắc phục mà tác giả đề xuất là nắm rõ sự đánh đổi của từng lựa chọn trong đúng bối cảnh dự án, phân biệt tiêu chí cần tối ưu với tiêu chí chỉ cần đạt ngưỡng đủ tốt, và chủ động giảm bớt áp lực thay vì tạo thêm, bởi con người hiếm khi làm việc tốt hơn khi bị ép. Theo tác giả, phần lớn các tình huống "khẩn cấp" trong ngành phần mềm thực chất là thất bại của khâu lãnh đạo.

## [How I know I'm working with a strong engineer](https://www.seangoedecke.com/thoughts-about-engineers/)

Tác giả chia sẻ một phép thử đơn giản để nhận ra bạn đang làm việc với một kỹ sư giỏi: đếm số lần nảy ra hai suy nghĩ khi cộng tác cùng họ. Suy nghĩ đầu tiên là "Ồ, phát hiện hay đấy, tôi chưa nghĩ tới!" — xuất hiện khi người đó giúp tránh một lỗi, cải thiện trải nghiệm người dùng hay đơn giản hóa thiết kế, chứ không phải khi họ bắt bẻ những chi tiết vụn vặt. Nếu suy nghĩ này đến liên tục, có lẽ nên nhường họ đưa ra các quyết định quan trọng.

Suy nghĩ thứ hai là "Tốt, cách đó sẽ ổn", khi kỹ sư đưa ra giải pháp giống như những gì bạn có thể tự nghĩ ra. Điều này cho thấy họ đáng tin cậy và luôn hoàn thành được công việc — theo tác giả, đó là một lời khen rất cao. Kỹ sư có thể giỏi theo nhiều cách khác nhau, nhưng đây là một cách kiểm tra bằng trực giác đáng tin cậy đến bất ngờ.

## [Ugly Code and Dumb Things](https://lucumr.pocoo.org/2025/2/20/ugly-code/)

Armin Ronacher, tác giả của Jinja và Werkzeug, bàn về hai niềm đam mê thường mâu thuẫn trong nghề: viết mã nguồn đẹp, dễ tái sử dụng cho thư viện, và xây dựng giải pháp nhanh, thực dụng cho người dùng thật. Ông lấy ví dụ Flamework — bộ khung tái hiện triết lý kỹ thuật của Flickr, "làm điều đơn giản nhất có thể chạy được". Mã nguồn của nó trông lộn xộn, tự ghép câu lệnh SQL, dùng biến toàn cục, nhưng lại tập trung đúng vào những vấn đề quan trọng như phân mảnh dữ liệu, nhân bản cơ sở dữ liệu và khả năng quan sát hệ thống.

Theo tác giả, mã nguồn hoàn hảo không đảm bảo thành công nếu nó không giải quyết vấn đề thật cho người thật, còn mã nguồn "xấu" nhưng chạy được thường đi kèm những thỏa hiệp vừa đủ để lặp nhanh. Cả hai tư duy đều hợp lệ nhưng hiếm khi cùng tồn tại hài hòa trong một dự án. Thách thức thật sự là biết khi nào nên chuyển từ các giải pháp tạm thời sang một nền móng vững chắc, vì dự án thành công rồi sẽ lớn lên và cần được xây dựng lại.

## [Development Philosophy](https://develop.sentry.dev/getting-started/philosophy/)

Đây là tài liệu mô tả triết lý phát triển phần mềm của Sentry, đúc kết từ hơn mười năm kinh nghiệm. Sentry nhấn mạnh rằng mã nguồn không phải tác phẩm nghệ thuật mà là công cụ giải quyết vấn đề cho khách hàng, nên cần cân nhắc giữa trừu tượng hóa và giải pháp tạm ("băng keo"), và nên hỏi ý kiến người có kinh nghiệm khi phân vân. Sự "đúng đắn" tuyệt đối cũng có thể là cái bẫy: chẳng hạn cố áp đặt kiểu dữ liệu chặt chẽ trong Python có thể làm giảm năng suất mà không mang lại nhiều giá trị. Giải pháp tạm rất tốt để thử nghiệm, nhưng không thể xây cả doanh nghiệp trên đó — Sentry sẵn sàng đầu tư vào dự án kéo dài nhiều năm, như việc chuyển từ gọi llvm-symbolizer sang tự xây dựng dịch vụ symbolicator.

Tài liệu còn nêu nhiều nguyên tắc khác: tránh mã nguồn quá "thông minh" vì người đọc sau này (kể cả chính bạn vài tháng sau) sẽ khó hiểu; mọi người đều được phép gửi pull request vào bất kỳ kho mã nào; giới hạn ngôn ngữ chính ở Python, Rust và TypeScript; tránh phụ thuộc vào cơ sở dữ liệu độc quyền; cân nhắc kỹ chi phí của mỗi thư viện phụ thuộc; và luôn giữ nhánh chính ở trạng thái ổn định.

## [AI is Stifling Tech Adoption](https://vale.rocks/posts/ai-is-stifling-tech-adoption)

Trong bài viết tháng 2/2025, tác giả cho rằng công cụ AI có thể làm chậm việc áp dụng công nghệ mới. Lập luận dựa trên hai yếu tố: dữ liệu huấn luyện chưa bao phủ công nghệ vừa xuất hiện và những thiên lệch trong hướng dẫn của sản phẩm. Nếu mô hình thường gợi ý công nghệ phổ biến, người dùng có thể chọn theo, khiến công nghệ mới khó thu hút người dùng và tài liệu hơn.

Tác giả minh họa bằng trải nghiệm cá nhân và thử yêu cầu Claude, ChatGPT, Gemini, DeepSeek tạo ứng dụng web. Các lựa chọn công nghệ trong những lần thử khiến tác giả đặt câu hỏi về ảnh hưởng của công cụ tới quyết định của lập trình viên. Đây là quan sát trong bối cảnh sản phẩm lúc đó, không phải phép đo đại diện cho mọi mô hình hay mọi cách sử dụng. Bài kêu gọi người dùng nhận biết thiên lệch và nhà cung cấp minh bạch hơn về cách định hướng đầu ra.

## [February - The Rest of the Story - JVM Weekly vol. 119](https://www.jvm-weekly.com/p/february-the-rest-of-the-story-jvm)

Số JVM Weekly ngày 27/02/2025 gom các tin trong tháng Hai chưa được đưa vào những số trước. Ở thời điểm đó, phiên bản LTS tiếp theo của Scala 3 được dự kiến ra mắt quý 4/2025 và ngừng hỗ trợ JDK 8; đội Scala còn cân nhắc giữa JDK 11 và 17 làm yêu cầu tối thiểu. Lý do chính là kế hoạch loại bỏ các phương thức truy cập bộ nhớ trong sun.misc.Unsafe, đòi hỏi thay đổi cách cài đặt lazy val. Bài còn giới thiệu câu hỏi phỏng vấn Java Lead tại J.P. Morgan, nguyên tắc SOLID trong Kotlin, bản nháp JEP tạo bộ đệm AOT trong một bước và một nguyên mẫu tự động song song hóa vòng lặp. Mức tăng tốc tới 9 lần là kết quả được nêu cho nguyên mẫu, không phải bảo đảm cho mã Java nói chung.

Ngoài ra còn có phần thứ hai của loạt bài về tác tử AI với Quarkus, nơi luồng điều khiển được giao hẳn cho LLM, cùng các bản phát hành mới như KotlinPoet 2.0, Dokka 2.0, Ktor CLI, Pulumi Java 1.0 và CheerpJ 3.1 — máy ảo Java chạy trên WebAssembly.

## [Manager Antipatterns](https://blogs.newardassociates.com/blog/2024/management-antipatterns.html)

Ted Neward tổng hợp các phản mẫu (antipattern) trong quản lý — những sai lầm mà nhiều công ty lặp đi lặp lại khi chọn và bố trí người quản lý. Danh sách gồm người quản lý vắng mặt, người muốn đập bỏ mọi thứ để làm lại từ đầu, người được giao đội vì là bạn của lãnh đạo cấp cao, người chỉ truyền đạt lại lời cấp trên, người chỉ biết một cách giải quyết cho mọi vấn đề, người hoảng loạn không biết phải làm gì, người buông lỏng hoàn toàn, người được điều chuyển từ một mảng hoàn toàn khác sang, người cầu toàn, kỹ sư giỏi nhất bị đẩy lên làm quản lý, người giao tiếp như đố mẹo, và người vừa làm quản lý vừa làm lập trình viên.

Với mỗi mẫu, tác giả mô tả ngắn gọn và đưa ra lời khuyên khắc phục theo ba góc nhìn: khi bạn làm việc dưới quyền người quản lý đó, khi người đó báo cáo cho bạn, và khi chính bạn là người quản lý đó. Đây là tài liệu hữu ích để sớm nhận diện vấn đề, dù bạn đang ở vị trí nào.

## [Pause – Decision-Making Superpower](https://read.perspectiveship.com/p/pause)

Tác giả cho rằng dù nắm vững mọi mô hình tư duy và khung ra quyết định, bạn vẫn khó tiến bộ nếu hành động quá vội. Từ trải nghiệm từng ước tính một tính năng ngay trong cuộc gọi với khách hàng rồi phải thức nhiều đêm để kịp hạn, tác giả rút ra quy tắc không bao giờ trả lời ngay mà hẹn phản hồi sau buổi họp. Tạm dừng giúp tách khỏi cảm xúc đang che mờ phán đoán, kiểm tra những điểm mù và có thêm góc nhìn mới; người khác hiếm khi phản đối khi bạn nói đó là một quy tắc cá nhân. Daniel Kahneman cũng từng áp dụng quy tắc tương tự để tránh nhận lời những việc mà sau này ông hối tiếc.

Nguyên tắc này đặc biệt hữu ích khi nhận được một tin nhắn gây bực bội — hãy chờ vài giờ hoặc một ngày rồi mới trả lời — hay khi phải đối mặt với những câu hỏi khó trong lúc căng thẳng, như ngay sau một đợt cắt giảm nhân sự. Nếu chưa có câu trả lời, hãy nói rõ điều gì nằm trong và ngoài tầm kiểm soát, đồng thời liệt kê những hành động đang thực hiện để mọi người thấy bạn thực sự quan tâm.

## [APOSD vs Clean Code](https://github.com/johnousterhout/aposd-vs-clean-code/blob/main/README.md)

Đây là bản ghi cuộc thảo luận giữa John Ousterhout, tác giả "A Philosophy of Software Design" (APOSD), và Robert "Uncle Bob" Martin, tác giả "Clean Code", về những khác biệt trong quan điểm thiết kế phần mềm. Hai người cùng đồng ý rằng mục tiêu là giúp hệ thống dễ hiểu, dễ sửa đổi, nhưng bất đồng ở ba chủ đề. Về độ dài phương thức, Clean Code khuyên hàm chỉ nên dài vài dòng, còn Ousterhout cho rằng chia quá nhỏ sẽ tạo ra các giao diện "nông" và khiến các phương thức ràng buộc chặt với nhau, buộc người đọc phải nhảy qua lại nhiều nơi mới hiểu được logic.

Về chú thích, Clean Code hạn chế và muốn mã nguồn tự giải thích, trong khi APOSD coi chú thích là không thể thay thế để mô tả giao diện và ý định của người viết. Về phát triển hướng kiểm thử (TDD), Martin ủng hộ viết kiểm thử trước theo từng bước nhỏ, còn Ousterhout lo rằng cách làm này khiến lập trình viên tập trung vào kiểm thử hơn là thiết kế tổng thể. Cuộc tranh luận cho thấy hai tác giả chia sẻ nhiều giá trị chung nhưng khác nhau ở cách cân bằng giữa chúng — rất đáng đọc để tự hình thành quan điểm riêng.

## [The Software Engineer Spectrum: Speed vs. Accuracy](https://benhowdle.im/software-engineer-spectrum)

Dựa trên 15 năm làm việc từ vị trí kỹ sư đến CTO, tác giả nhận thấy mọi kỹ sư phần mềm đều nằm đâu đó trên một phổ giữa tốc độ và độ chính xác. Người thiên về tốc độ theo tinh thần "phát hành ngay, cải thiện sau", mạnh ở khả năng lặp nhanh và làm ra sản phẩm khả dụng tối thiểu, nhưng dễ tạo nợ kỹ thuật và bỏ sót trường hợp biên. Người thiên về độ chính xác muốn "đảm bảo đúng trước khi đưa lên", mạnh về tính ổn định và khả năng mở rộng, nhưng dễ chậm và thiết kế quá mức cần thiết. Không bên nào tốt hơn bên nào — điều quan trọng là sự phù hợp.

Mỗi giai đoạn công ty cần một kiểu người khác nhau: startup mới thành lập cần tốc độ để kiểm chứng ý tưởng, startup đang mở rộng cần cân bằng và bắt đầu chú trọng kiểm thử, kiến trúc, còn doanh nghiệp lớn hoặc ngành chịu quản lý chặt ưu tiên sự ổn định và tuân thủ. Tác giả gợi ý vài câu hỏi để tự đánh giá, chẳng hạn bạn có khó chịu khi quyết định bị chậm, hay khi phải phát hành thứ chưa hoàn hảo không. Với người lãnh đạo, đội tốt nhất là đội kết hợp cả hai kiểu kỹ sư và cho phép họ dịch chuyển trên phổ này theo thời gian.

## [LLM Ecosystem Predictions](https://www.moderndescartes.com/essays/llm_predictions/)

Trong bài viết ngày 14/02/2025, Brian Kihoon Lee đưa ra dự đoán cho hệ sinh thái LLM trong 5–10 năm tiếp theo. Dựa trên xu hướng chi phí ở cùng mức chất lượng mà ông quan sát, tác giả cho rằng cải tiến phần cứng, tối ưu kỹ thuật và tiến bộ nghiên cứu sẽ tập trung việc phục vụ mô hình nền tảng vào một số công ty lớn với biên lợi nhuận mỏng. Ông cũng dự đoán các tác tử đơn giản sẽ có lợi hơn bộ khung phức tạp, vì đội phát triển có thể thay mô hình nhanh và kiểm chứng bằng bộ đánh giá. Đây là lập luận chiến lược theo bối cảnh năm 2025, không phải quy luật bảo đảm chi phí luôn giảm hay chỉ đổi mô hình là chất lượng tự tăng.

Tác giả cũng dự đoán thị trường sẽ phân hóa giữa dịch vụ AI được quản lý và hướng tự làm, với một thứ giống "Excel cho LLM" giúp người ít am hiểu kỹ thuật tự xây dựng quy trình. Chi phí mỗi truy vấn sẽ trải rộng nhiều bậc độ lớn, từ mô hình 100 triệu đến 1.000 tỷ tham số, trong khi giá trị mang lại còn chênh lệch hơn: LLM có thể thay thế những công việc tốn kém như truyền đạt thông tin trong tổ chức, gia sư hay tổng đài, với khả năng phục vụ 24/7 và chất lượng đồng đều. Theo tác giả, thế giới năm 2030 sẽ thay đổi không kém gì bước ngoặt của điện thoại di động và Internet trước đây.

## [The Right Kind of Stubborn](https://www.paulgraham.com/persistence.html)

Paul Graham phân biệt hai kiểu bướng bỉnh: kiên trì và cố chấp. Cả hai đều khó ngăn cản, nhưng theo những cách khác nhau: người kiên trì giống con thuyền không thể giảm ga, còn người cố chấp giống con thuyền không thể bẻ lái. Người kiên trì gắn bó với mục tiêu và sẵn sàng thay đổi cách làm, thậm chí rất chú tâm lắng nghe khi bị phản biện; người cố chấp lại bám vào ý tưởng ban đầu về cách đạt mục tiêu — vốn là ý tưởng thiếu thông tin nhất — và gạt đi mọi góp ý. Sự cố chấp chỉ hiệu quả với vấn đề đơn giản, hoặc thành công nhờ may mắn.

Theo tác giả, sự kiên trì có cấu trúc bên trong phức tạp hơn nhiều, gồm năm phẩm chất: năng lượng để liên tục thử, trí tưởng tượng để nghĩ ra cách mới, khả năng phục hồi để không nản sau thất bại, phán đoán tốt dựa trên giá trị kỳ vọng, và một mục tiêu đủ cụ thể để định hướng nỗ lực. Lời khuyên cho người ít kinh nghiệm là bắt đầu với mục tiêu nhỏ rồi mở rộng dần khi đã có tiến triển. Vì cần hội đủ cả năm phẩm chất, kiểu bướng bỉnh đúng đắn hiếm hơn nhiều nhưng mang lại kết quả vượt trội.

## Bonus: Vài ảnh hay ho đến từ [ByteByteGo](https://bytebytego.com/)

![Data Consistency Strategies For Microservices](https://substack-post-media.s3.amazonaws.com/public/images/ae95d38c-41f8-4eb7-885e-f7fafa4ca45d_2250x2624.png)

---

*Bài viết đã được viết lại bởi Claude Code với Opus 5.5 vào ngày 27/09/2026; được review và chỉnh sửa bởi Codex với GPT 6.1 Sol vào ngày 09/11/2026.*
