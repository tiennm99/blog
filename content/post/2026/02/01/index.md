---
title: "Newsletter #78"
date: 2026-02-01
tags: ["AI-Assisted", "Newsletter", "Software Engineering", "Databases", "Garbage Collection", "Performance", "AI Coding"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #78.*

## [The Next Two Years of Software Engineering](https://addyosmani.com/blog/next-two-years/)

Addy Osmani nhận định ngành phần mềm đang ở một điểm ngoặt: công cụ AI lập trình đã tiến từ gợi ý hoàn thành mã lên thành các tác tử (agent) tự thực hiện nhiệm vụ, còn làn sóng tuyển dụng ồ ạt nhường chỗ cho yêu cầu hiệu quả, doanh nghiệp chuộng người có kinh nghiệm và đội nhỏ được trang bị công cụ tốt. Thay vì dự đoán, tác giả đặt ra năm câu hỏi đến năm 2026, mỗi câu kèm hai kịch bản đối lập. Tuyển dụng junior có thể sụp đổ (theo một nghiên cứu của Harvard, việc làm junior giảm khoảng 9–10% sau khi công ty áp dụng AI tạo sinh) hoặc phục hồi khi phần mềm lan sang mọi ngành. Kỹ năng nền tảng có thể mai một hoặc quý hơn bao giờ hết. Vai trò lập trình viên có thể thu hẹp thành người kiểm duyệt mã AI hoặc mở rộng thành người điều phối cả hệ thống. Chuyên gia hẹp dễ bị thay thế, còn kỹ sư hình chữ T (sâu một hai mảng, hiểu rộng nhiều mảng) được ưa chuộng. Bằng khoa học máy tính có thể bị bootcamp, khóa học trực tuyến hay đào tạo nội bộ vượt mặt.

Khi 84% lập trình viên đã dùng AI thường xuyên, giá trị nằm ở khả năng rà soát đầu ra của AI để tìm lỗi logic, lỗ hổng bảo mật và chỗ lệch yêu cầu; người giỏi nhất không phải người viết mã nhanh nhất mà là người biết khi nào không nên tin AI. Junior nên dùng AI để học chứ không phải làm cái nạng; senior nên giữ vai trò bảo đảm chất lượng, cố vấn và thiết kế kiến trúc. Điều cốt lõi là liên tục học hỏi.

## [Databases in 2025: A Year in Review](https://www.cs.cmu.edu/~pavlo/blog/2026/01/2025-databases-retrospective.html)

Andy Pavlo (Đại học Carnegie Mellon) điểm lại năm 2025 của thế giới cơ sở dữ liệu, mở đầu bằng sự thống trị của PostgreSQL. Phiên bản 18 bổ sung hệ thống nhập xuất bất đồng bộ và skip scan. Sôi động hơn là chuyện kinh doanh: Databricks chi 1 tỷ USD mua Neon, Snowflake trả 250 triệu USD cho CrunchyData, Microsoft ra mắt HorizonDB, và ba dự án PostgreSQL mở rộng theo chiều ngang cạnh tranh nhau là Multigres (Supabase), Neki (PlanetScale) và PgDog. Năm 2025 cũng là năm mọi hệ quản trị cơ sở dữ liệu đều có máy chủ MCP (Model Context Protocol), bùng nổ sau khi OpenAI ủng hộ chuẩn này vào tháng 3. Tác giả cảnh báo các máy chủ này chủ yếu chỉ chuyển tiếp truy vấn, nên cần giữ nguyên tắc quyền tối thiểu. Mảng định dạng tệp cũng nóng lên với năm định dạng mới thách thức Parquet: FastLanes, F3, Vortex, AnyBlox và Amudai.

Phần chuyện bên lề liệt kê hàng loạt thương vụ: IBM mua DataStax (ước tính 3 tỷ USD) và Confluent, Salesforce mua Informatica (8 tỷ USD), cùng vụ sáp nhập bất ngờ giữa Fivetran và dbt Labs. Databricks gọi vốn hai vòng 4 tỷ và 1 tỷ USD, trong khi nhiều startup phải đóng cửa như Fauna, PostgresML, Hydra, MyScaleDB và Voltron Data. Khép lại bài là việc Larry Ellison, nhà sáng lập Oracle, trở thành người giàu nhất thế giới với tài sản ước tính 393 tỷ USD, theo tác giả là giàu nhất lịch sử, vượt cả John D. Rockefeller khi đã điều chỉnh lạm phát.

## [12 Predictions for 2026](https://tomtunguz.com/2026-predictions/)

Tomasz Tunguz đưa ra 12 dự báo cho năm 2026 xoay quanh việc các tác tử AI (agent) đi vào vận hành thực tế. Lần đầu tiên doanh nghiệp sẽ trả cho agent nhiều hơn cho con người, giống như người dùng chấp nhận trả cao hơn khoảng 31% để đi Waymo thay vì Uber. Năm 2026 được kỳ vọng lập kỷ lục thanh khoản với các đợt IPO của SpaceX, OpenAI, Anthropic, Stripe và Databricks. Cơ sở dữ liệu vector hồi sinh thành hạ tầng thiết yếu. Theo METR, độ dài nhiệm vụ AI hoàn thành được tăng gấp đôi mỗi 7 tháng, nên cuối năm agent có thể tự chạy luồng việc dài hơn 8 giờ. Ngân sách AI lần đầu bị soi kỹ, đẩy mô hình nhỏ và mã nguồn mở lên nhờ chi phí thấp hơn tới 10 lần, còn Google tạo khoảng cách nhờ mạnh trên nhiều mặt trận từ mô hình tiên phong đến tạo video và tìm kiếm.

Khả năng quan sát (observability) dành cho agent trở thành lớp cạnh tranh gay gắt nhất. Stablecoin được dự báo chiếm 30% thanh toán quốc tế, lấn sang phần việc của SWIFT. Agent gửi số truy vấn lớn hơn con người ít nhất một bậc, buộc cơ sở dữ liệu phải thiết kế lại. Đầu tư trung tâm dữ liệu đạt 3,5% GDP Mỹ, tương đương thời kỳ mở rộng đường sắt. Web chuyển sang thiết kế ưu tiên agent vì nhiều quyết định mua hàng bắt đầu từ nghiên cứu do agent thực hiện, và Cloudflare trở thành người gác cổng cho thanh toán của agent qua giao thức x402, vốn hồi sinh mã trạng thái HTTP 402.

## [The Garbage Collection Handbook](https://gchandbook.org/index.html)

Đây là trang giới thiệu ấn bản thứ hai của "The Garbage Collection Handbook", cuốn sách kinh điển về quản lý bộ nhớ tự động. Tiền thân là cuốn "Garbage Collection" của Richard Jones (Wiley, 1996), sau đó ấn bản năm 2012 ghi lại hiện trạng lĩnh vực tại thời điểm ấy. Vì phần cứng, phần mềm và môi trường thực thi đã thay đổi nhiều, ấn bản mới cập nhật toàn bộ nội dung, đi từ các thuật toán đơn giản, truyền thống đến những kỹ thuật hiện đại như thu gom rác song song, tăng dần, đồng thời và thời gian thực, thường được minh họa bằng mã giả và hình vẽ. Sách phân tích chi tiết các bộ thu gom thương mại hiệu năng cao, giải thích những khía cạnh khó như giao tiếp với hệ thống runtime, và bổ sung hơn 90 trang với các chương mới về lưu trữ bền vững (persistence) và thu gom rác tiết kiệm năng lượng.

Vì hầu hết ngôn ngữ lập trình hiện đại đều dùng cơ chế thu gom rác, hiểu cách các bộ thu gom hoạt động giúp lập trình viên tự tin lựa chọn và cấu hình chúng cho ứng dụng của mình. Bản sách điện tử có hơn 37.000 liên kết nội bộ tới chương, mục, thuật toán, hình ảnh và các bài nghiên cứu gốc, kèm theo cơ sở dữ liệu trực tuyến gồm gần 3.400 ấn phẩm liên quan đến thu gom rác. Ấn bản đầu tiên của cuốn Handbook đã có bản dịch tiếng Trung và tiếng Nhật, xuất bản năm 2016.

## [Vibe-Coded Is the New "Made in China"](https://gabriel-afonso.com/blog/vibe-coded-is-the-new-made-in-china/)

Gabriel Afonso nhận thấy trên r/selfhosted, dự án mới hễ bị gắn nhãn "vibe-coded" là lập tức bị hoài nghi. Vibe coding là khái niệm Andrej Karpathy đưa ra đầu năm 2025: buông mình theo cảm hứng, để mô hình ngôn ngữ lớn lo phần hiện thực còn người viết chỉ quan tâm muốn xây dựng cái gì. Theo tác giả, vấn đề thường không nằm ở chất lượng mã mà ở điều nhãn này báo hiệu. Trước đây, độ khó của việc làm phần mềm chính là bộ lọc: ai phát hành được dự án mã nguồn mở hẳn đã bỏ nhiều công sức nên sẽ gắn bó lâu dài. Nay ai cũng có thể dựng ứng dụng trong vài giờ và lập trình vượt trình độ của mình, nên tác giả dự án có thể không hiểu mã mình phát hành. Vì thế "vibe-coded" đang giống nhãn "Made in China" ngày trước, đồng nghĩa với đồ rẻ tiền, dùng rồi bỏ.

Tác giả so sánh với cờ vua: sau khi Deep Blue thắng Kasparov năm 1997, môn cờ còn phổ biến hơn vì con người học cách làm việc cùng máy. Những nhà phát triển được kính trọng như DHH, Tanner Linsley và Boris Cherny (người tạo Claude Code, cho biết toàn bộ đóng góp của mình trong 30 ngày qua đều do Claude Code viết) vẫn dùng AI mà không gây phản cảm vì họ vẫn là tác giả thực sự. Thời gian vẫn là bộ lọc đáng tin: dự án được bảo trì hai năm với người dùng thật chứng minh cam kết không thể làm giả. Sự hoài nghi hiện nay là cách hệ sinh thái tự bảo vệ trong lúc luật chơi được viết lại.

## [The production bug that made me care about undefined behavior](https://gaultier.github.io/blog/the_production_bug_that_made_me_care_about_undefined_behavior.html)

Tác giả kể lại một lỗi production trong hệ thống C++ xử lý thanh toán hàng tỷ euro mỗi năm. Một endpoint HTTP lẽ ra chỉ trả về một trong hai trường `error` hoặc `succeeded` bằng `true`, nhưng khách hàng lại nhận cả hai cùng `true`, dù mỗi trường chỉ được gán một lần và loại trừ nhau. Thủ phạm là dòng `Response response;`. Trong C, đọc trường của struct chưa khởi tạo rõ ràng là hành vi không xác định (undefined behavior), còn C++ phức tạp hơn: vì `Response` chứa `std::string` nên không phải kiểu POD, trình biên dịch tự sinh và gọi hàm khởi tạo mặc định, nhưng hàm này chỉ khởi tạo `std::string` còn hai trường `bool` mang giá trị rác.

Cách sửa là dùng `Response response{};` để mọi trường về 0, hoặc tự viết hàm khởi tạo mặc định cho từng trường. Trình biên dịch không cảnh báo dù bật mọi cờ; `clang-tidy` phát hiện được, còn Address Sanitizer kèm UndefinedBehaviorSanitizer (hoặc Valgrind) bắt lỗi khi chạy, nhưng đòi hỏi độ phủ kiểm thử cao và không phải lúc nào cũng báo. Tác giả đã viết một plugin libclang để quét toàn bộ mã nguồn. Bài còn nêu ngoại lệ oái oăm: đọc giá trị chưa khởi tạo của `std::byte` hay `unsigned char` không phải hành vi không xác định, còn `bool` thì có. Kết luận của tác giả là C++ có quá nhiều cách khởi tạo biến, cú pháp giống C nhưng đôi khi hoạt động khác hẳn, và quy tắc thay đổi theo từng phiên bản chuẩn.

## [Don't fall into the anti-AI hype](https://antirez.com/news/158)

Salvatore Sanfilippo (antirez), người tạo ra Redis, vốn yêu thích viết phần mềm từng dòng một, nhưng thừa nhận AI sẽ thay đổi lập trình mãi mãi. Ông từng nghĩ còn vài năm nữa, nay không còn tin vậy vì các mô hình ngôn ngữ lớn đã tự hoàn thành được phần việc lớn hoặc dự án cỡ vừa gần như không cần trợ giúp. Chỉ trong một tuần, bằng cách viết prompt và thỉnh thoảng xem mã để định hướng, ông làm xong trong vài giờ bốn việc lẽ ra mất nhiều tuần: thêm UTF-8 cho thư viện linenoise cùng khung kiểm thử dùng terminal giả lập; sửa lỗi kiểm thử chập chờn của Redis do vấn đề thời gian và deadlock TCP; để Claude Code viết trong 5 phút thư viện C thuần 700 dòng chạy suy luận mô hình embedding kiểu BERT, chỉ chậm hơn PyTorch 15%; và để Claude Code tái hiện trong khoảng 20 phút các thay đổi bên trong Redis Streams từ tài liệu thiết kế.

Theo ông, với phần lớn dự án, tự tay viết mã không còn cần thiết. Ông vui khi mã mình được dùng để huấn luyện mô hình, coi đó là sự tiếp nối nỗ lực dân chủ hóa mã nguồn và tri thức; AI sẽ giúp đội nhỏ cạnh tranh với công ty lớn như mã nguồn mở từng làm những năm 90. Dù vậy, ông lo công nghệ này bị tập trung vào tay vài công ty. Lời khuyên của ông: đừng từ chối AI, hãy thử công cụ mới nghiêm túc trong nhiều tuần chứ không phải năm phút, vì niềm vui của lập trình là xây dựng, và giờ ta có thể xây nhiều hơn, tốt hơn.

## [Performance Hints](https://abseil.io/fast/hints.html)

Đây là tài liệu "Performance Hints" do Jeff Dean và Sanjay Ghemawat viết, đăng trên trang Abseil của Google, tổng hợp nguyên tắc và kỹ thuật họ dùng khi tối ưu hiệu năng. Tác giả dẫn đầy đủ câu của Knuth: nên bỏ qua tối ưu nhỏ khoảng 97% thời gian, nhưng đừng bỏ lỡ 3% quan trọng. Cách "cứ viết đơn giản rồi tính hiệu năng sau" thường sai, vì hệ thống lớn bỏ qua hiệu năng từ đầu sẽ có hồ sơ đo phẳng, thất thoát khắp nơi mà không có điểm nóng; vì thế hãy chọn phương án nhanh hơn nếu nó không làm mã khó đọc đáng kể. Tài liệu hướng dẫn ước lượng nhanh dựa trên độ trễ các thao tác cơ bản (bộ đệm L1 khoảng 0,5 ns, dự đoán nhánh sai 5 ns, bộ nhớ chính 50 ns), đo bằng profiler, và cách xử lý khi hồ sơ CPU phẳng như cộng dồn nhiều cải tiến 1% hoặc thay đổi cấu trúc ở tầng cao hơn.

Phần còn lại là danh mục kỹ thuật kèm ví dụ mã: thiết kế API để tối ưu được bên trong ranh giới đóng gói; cải tiến thuật toán; biểu diễn bộ nhớ gọn để chạm ít dòng cache hơn (chỉ số thay con trỏ, arena, mảng thay map); giảm cấp phát bằng cách đặt trước dung lượng container và tránh sao chép; tránh việc thừa nhờ đường đi nhanh, tính trước, bộ nhớ đệm và không ghi log trên đường nóng; kiểm soát kích thước mã; và song song hóa với vùng găng ngắn, chia nhỏ để giảm tranh chấp, SIMD, tránh chia sẻ giả (false sharing). Cuối tài liệu là lời khuyên cho Protocol Buffers và các cấu trúc như `absl::flat_hash_map`.

## [Software Engineering Job Market 2026: Data, Trends and Outlook](https://www.finalroundai.com/blog/software-engineering-job-market-2026)

Bài viết phân tích vì sao kỹ sư phần mềm, từng là nghề an toàn nhất, nay lại dễ tổn thương nhất khi tin sa thải xuất hiện gần như hằng tuần. Dữ liệu Indeed qua FRED cho thấy tin tuyển dụng đạt đỉnh giữa năm 2022, giảm mạnh đến 2024 và chưa hồi phục. Nguyên nhân chính không phải AI mà là làn sóng số hóa 2021–2022: tâm lý sợ bị bỏ lại và lãi suất thấp khiến từ Big Tech đến startup đều tuyển thừa. Khi nhu cầu không tăng kịp, AI trở thành vật tế thần tiện lợi để cắt giảm nhân sự. Một lý do khác là tuyển dụng từ xa: kỹ sư cấp cao ở Mỹ có thể tốn 100.000 USD mỗi năm, ở Ấn Độ chỉ 40.000 USD, và câu "thay việc làm bằng AI" nghe tiến bộ hơn "chuyển việc ra nước ngoài". Nghiên cứu của METR còn cho thấy kỹ sư giàu kinh nghiệm chậm hơn 19% khi dùng AI.

Dù vậy, nghề này không biến mất, chỉ nhu cầu viết mã cơ bản giảm đi. Cục Thống kê Lao động Mỹ vẫn dự báo việc làm lập trình viên tăng khoảng 15%, SignalFire ghi nhận Meta, Netflix, Uber và Google tuyển nhanh hơn tốc độ nghỉ việc, và Magnus Grimeland (Antler) cho rằng càng nhiều mã càng nhiều lỗi cần kỹ sư sửa. Điều thay đổi là mặt bằng kỹ năng: thiết kế hệ thống, hiệu năng, bảo mật và dùng AI hiệu quả. Người mới gặp khó hơn khi tin tuyển junior giảm khoảng 40% so với trước 2022. Bài gợi ý các ngôn ngữ đáng học năm 2026: Python cho AI/ML, JavaScript/TypeScript cho frontend, Go cho backend và hạ tầng, Java cho doanh nghiệp, Swift cho iOS.

### Bonus

**Hình ảnh:**

![12 Architectural Concepts Developers Should Know](https://substackcdn.com/image/fetch/$s_!0P7Z!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F7546f89c-8b6f-4ced-8d40-4e0137ab5941_2360x2852.png)
![Top Developer Tools You Can Use in 2026](https://substackcdn.com/image/fetch/$s_!Co3P!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fb7f3c175-c0d6-4d02-992d-114ac588b45c_2252x2752.png)
![5 Rate Limiting Strategies To Protect the System](https://substackcdn.com/image/fetch/$s_!Ty5s!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fecc68f5e-6353-4487-a779-92bb11440bc5_2360x2960.png)
![How Live Streaming Works?](https://substackcdn.com/image/fetch/$s_!dPjo!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fc2543392-5e04-4dd6-b39a-72fdfe3a3048_2360x2770.png)
![5 Leader Election Algorithms Powering Modern Databases](https://substackcdn.com/image/fetch/$s_!MJUT!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F06243bf8-f149-4075-bc81-99af15be3579_6001x7802.png)
![A Guide to Database Sharding](https://substackcdn.com/image/fetch/$s_!Xrbz!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8c99d0d5-8e5b-4e82-bb28-9fbd470e3bc6_2250x2624.png)
![Modern Storage Systems](https://substackcdn.com/image/fetch/$s_!NCWv!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F0adc9c84-37f2-4a96-96a6-f7f26bbd1b7e_2360x2960.jpeg)

---

*Bài viết đã được viết lại bởi Claude Code với Opus 5.5 vào ngày 27/09/2026.*
