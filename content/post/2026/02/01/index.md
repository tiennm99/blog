---
title: "Newsletter #78"
date: 2026-02-01
tags: ["AI-Assisted"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #78.*

## [Hai Năm Tới Của Kỹ Thuật Phần Mềm](https://addyosmani.com/blog/next-two-years/)

Ngành công nghệ đang đứng trước một điểm ngoặt quan trọng. AI coding đã phát triển từ autocomplete đơn thuần thành các agent có thể tự thực hiện nhiệm vụ phát triển. Sự bùng nổ kinh tế từng thúc đẩy làn sóng tuyển dụng đã nhường chỗ cho yêu cầu hiệu quả: công ty giờ ưu tiên lợi nhuận hơn tăng trưởng, nhân viên giàu kinh nghiệm hơn người mới tốt nghiệp, và team nhỏ hơn nhưng được trang bị công cụ tốt hơn.

Bài viết khám phá năm câu hỏi then chốt sẽ định hình kỹ thuật phần mềm đến năm 2026, với hai kịch bản đối lập cho mỗi câu hỏi. Đây không phải dự báo, mà là những lăng kính để chuẩn bị: (1) Vấn đề junior developer - tuyển dụng có thể sụt giảm khi AI tự động hóa nhiệm vụ cấp nhập môn, hoặc hồi phục khi phần mềm lan rộng mọi ngành; (2) Vấn đề kỹ năng - kỹ năng lập trình cốt lõi có thể teo đi khi AI viết phần lớn code, hoặc trở nên quan trọng hơn khi developer tập trung vào giám sát; (3) Vấn đề vai trò - vai trò developer có thể thu hẹp thành kiểm toán code AI, hoặc mở rộng thành kiến trúc sư điều phối hệ thống; (4) Chuyên gia hay đa năng - chuyên gia hẹp có nguy cơ bị thay thế, T-shaped engineer (biết rộng một chút, sâu một vài lĩnh vực) sẽ được ưu tiên; (5) Vấn đề giáo dục - bằng CS có còn là tiêu chuẩn vàng hay bị các lộ trình học nhanh hơn (bootcamp, online platform, training nội bộ) vượt mặt.

**Điểm chính:**
- 84% developer dùng AI support thường xuyên, chuyển từ "viết code từ đầu" sang "soạn prompt và ghép các mảnh AI-generated"
- Harvard study: khi công ty adopt generative AI, tuyển dụng junior giảm 9-10% trong 6 quý, trong khi senior hầu như không thay đổi
- Big tech tuyển dụng 50% ít hơn fresh graduates trong ba năm qua
- Kỹ năng quan trọng: không phải đánh máy boilerplate mà review code AI để tìm lỗi logic, lỗ hổng bảo mật, mismatch với yêu cầu
- T-shaped developer: chuyên sâu một hai lĩnh vực (vertical stroke), hiểu rộng nhiều domain khác (horizontal stroke)
- 45% company planned eliminate bachelor's degree requirements cho một số vị trí kỹ thuật vào năm 2024
- "Lập trình viên giỏi nhất sẽ không phải là người code nhanh nhất, mà người biết khi nào không tin AI"
- Điều kiện sống sót: cập nhật kỹ năng liên tục, đa năng hóa, tập trung vào yếu tố con người (sáng tạo, tư duy phản biện, cộng tác)

## [Cơ Sở Dữ Liệu Năm 2025: Một Năm Đánh Giá](https://www.cs.cmu.edu/~pavlo/blog/2026/01/2025-databases-retrospective.html)

Bài viết tổng hợp chi tiết các xu hướng và sự kiện quan trọng trong thế giới cơ sở dữ liệu năm 2025. PostgreSQL tiếp tục thống trị với phiên bản 18 ra mắt tháng 11, bổ sung hệ thống nhập xuất bất đồng bộ và hỗ trợ skip scans. Tuy nhiên, tin nóng nhất là làn sóng mua bán các công ty PostgreSQL: Databricks thâu tóm Neon với 1 tỷ USD, Snowflake mua CrunchyData với 250 triệu USD, và Microsoft ra mắt HorizonDB. Cuộc đua PostgreSQL phân tán cũng nóng lên với ba dự án cạnh tranh: Multigres (do Supabase phát triển), Neki (PlanetScale), và PgDog.

Một xu hướng lớn khác là MCP (Model Context Protocol) - chuẩn giao tiếp giữa mô hình ngôn ngữ và cơ sở dữ liệu. Sau khi OpenAI hỗ trợ MCP vào tháng 3, mọi nhà cung cấp cơ sở dữ liệu đều tung ra MCP server riêng. Tuy nhiên, tác giả cảnh báo về rủi ro bảo mật khi cấp quyền truy cập không giới hạn cho các tác nhân trí tuệ nhân tạo. Thế giới định dạng tệp cũng sôi động với năm định dạng mới ra mắt nhằm cạnh tranh Parquet: FastLanes, F3, Vortex, AnyBlox, và Amudai.

Năm 2025 chứng kiến nhiều thương vụ mua bán: IBM mua DataStax (3 tỷ USD), Salesforce mua Informatica (8 tỷ USD), và IBM mua Confluent. Hai thương vụ sáp nhập đáng chú ý là Fivetran hợp nhất với dbt Labs để tạo nên "gã khổng lồ ETL". Về tài chính, Databricks gây quỹ thành công với hai vòng gọi vốn 4 tỷ và 1 tỷ USD, trong khi nhiều startup cơ sở dữ liệu phải đóng cửa. Năm nay cũng ghi nhận Larry Ellison trở thành người giàu nhất thế giới với tài sản 393 tỷ USD, vượt qua kỷ lục lịch sử của John D. Rockefeller.

**Điểm chính:**
- PostgreSQL thống trị với phiên bản 18, bổ sung hệ thống nhập xuất bất đồng bộ và skip scans
- Làn sóng mua bán: Databricks mua Neon (1 tỷ USD), Snowflake mua CrunchyData (250 triệu USD), Microsoft ra mắt HorizonDB
- Cuộc đua PostgreSQL phân tán: ba dự án cạnh tranh (Multigres, Neki, PgDog)
- MCP trở thành chuẩn giao tiếp giữa mô hình ngôn ngữ và cơ sở dữ liệu, mọi nhà cung cấp đều tung ra MCP server
- Cảnh báo bảo mật: cần cấp quyền tối thiểu cho tác nhân AI để tránh rủi ro khi chúng "hoành hành"
- Định dạng tệp: năm định dạng mới cạnh tranh Parquet (FastLanes, F3, Vortex, AnyBlox, Amudai)
- Thương vụ mua bán: IBM-DataStax (3 tỷ USD), Salesforce-Informatica (8 tỷ USD), IBM-Confluent
- Sáp nhập: Fivetran + dbt Labs tạo nên "gã khổng lồ ETL"
- Nhiều startup đóng cửa: Fauna, PostgresML, Hydra, MyScaleDB, Voltron Data
- Larry Ellison trở thành người giàu nhất lịch sử (393 tỷ USD), vượt kỷ lục của John D. Rockefeller (340 tỷ USD)

## [12 Dự Báo Cho Năm 2026](https://tomtunguz.com/2026-predictions/)

Tác giả đưa ra 12 dự báo cho năm 2026, tập trung vào sự trỗi dậy của các hệ thống tác nhân AI sẽ thay đổi kiến trúc cơ sở dữ liệu và chuyển đổi web sang thiết kế ưu tiên tác nhân. Dự báo nổi bật nhất: doanh nghiệp chi trả nhiều cho AI agents hơn cho con người lần đầu tiên, với Waymo rides đã đắt hơn Uber 31% nhưng nhu cầu vẫn tăng do ưu tiên an toàn và độ tin cậy. Năm 2026 dự kiến trở thành năm kỷ lục về thanh khoản với các đợt IPO lớn từ SpaceX, OpenAI, Anthropic, Stripe và Databricks, trong đó SpaceX và OpenAI sẽ nằm trong 10 đợt IPO lớn nhất lịch sử.

Vector databases sẽ hồi sinh và trở thành hạ tầng thiết yếu trong stack AI khi các mô hình đa phương thức và mô hình không gian trạng thái đòi hỏi kiến trúc dữ liệu mới. Theo METR, thời gian thực hiện nhiệm vụ của AI tăng gấp đôi mỗi 7 tháng, và đến cuối 2026, các tác nhân AI sẽ tự chủ thực hiện luồng công việc 8+ giờ, thay đổi căn bản cách công ty phân bổ nhân sự. Ngân sách AI sẽ bị giám sát kỹ lưỡng lần đầu tiên, thúc đẩy sự phổ biến của các ngôn ngữ models nhỏ và mã nguồn mở với chi phí thấp hơn 10 lần.

Google sẽ tạo khoảng cách với đối thủ thông qua sự đa dạng trong AI: frontier models, suy luận trên thiết bị, tạo video, mã nguồn mở và tích hợp tìm kiếm. Stablecoin sẽ chiếm 30% thanh toán quốc tế vào tháng 12, thay thế các đường ray SWIFT truyền thống. Các mô hình truy cập dữ liệu của tác nhân sẽ gây áp lực và làm vỡ cơ sở dữ liệu hiện tại với số lượng truy vấn tăng ít nhất một cấp độ. Xây dựng trung tâm dữ liệu sẽ đạt 3,5% GDP Mỹ, quy mô tương tự mở rộng đường sắt lịch sử. Web sẽ chuyển sang thiết kế ưu tiên tác nhân vì nhiều quyết định mua hàng hiện được thực hiện thông qua nghiên cứu của tác nhân. Cloudflare sẽ trở thành cổng cho thanh toán của tác nhân thông qua giao thức x402.

**Điểm chính:**
- Doanh nghiệp chi trả nhiều cho AI agents hơn con người lần đầu, Waymo rides đắt hơn Uber 31% nhưng nhu cầu vẫn tăng
- 2026: năm kỷ lục về thanh khoản với IPO từ SpaceX, OpenAI, Anthropic, Stripe, Databricks
- Vector databases hồi sinh và trở thành hạ tầng thiết yếu trong stack AI
- AI agents tự chủ thực hiện luồng công việc 8+ giờ vào cuối 2026 (theo METR: thời gian tăng gấp đôi mỗi 7 tháng)
- Ngân sách AI bị giám sát, ngôn ngữ models nhỏ và mã nguồn mở phổ biến với chi phí thấp hơn 10 lần
- Google tạo khoảng cách thông qua sự đa dạng AI: frontier models, on-device inference, video generation, open-source, search integration
- Agent observability trở thành lớp cạnh tranh nhất trong inference stack
- Stablecoin chiếm 30% thanh toán quốc tế, thay thế SWIFT cho B2B
- Tác nhân gây áp lực cực lớn cho cơ sở dữ liệu với truy vấn tăng ít nhất một cấp độ
- Trung tâm dữ liệu đạt 3,5% GDP Mỹ, quy mô tương tự mở rộng đường sắt
- Web chuyển sang thiết kế ưu tiên tác nhân cho tài liệu và website
- Cloudflare trở thành cổng thanh toán cho tác nhân thông qua giao thức x402

## [Sổ Tay Garbage Collection](https://gchandbook.org/index.html)

Đây là ấn bản thứ hai của cuốn sách kinh điển về quản lý bộ nhớ tự động. Cuốn sách đầu tiên "Garbage Collection" của Richard Jones (Wiley, 1996) là một cột mốc quan trọng trong lĩnh vực quản lý bộ nhớ tự động. Phiên bản kế tiếp "The Garbage Collection Handbook: The Art of Automatic Memory Management" đã ghi nhận trạng thái của lĩnh vực này vào năm 2012. Tuy nhiên, sự phát triển công nghệ đã làm cho quản lý bộ nhớ trở nên thách thức, thú vị và quan trọng hơn bao giờ hết. Ấn bản thứ hai này cập nhật handbook, tổng hợp kiến thức từ các nhà nghiên cứu và phát triển quản lý bộ nhớ tự động trong sáu mươi năm qua.

Cuốn sách đề cập đến các thách thức mới cho garbage collection do những tiến bộ gần đây trong phần cứng và phần mềm, cũng như môi trường thực thi chương trình. Nó khám phá hậu quả của những thay đổi này đối với người thiết kế và thực thi các bộ thu gom rác hiệu suất cao. Cùng với các thuật toán đơn giản và truyền thống, cuốn sách bao gồm các kỹ thuật tiên tiến nhất: song song, tăng dần, đồng thời và thu gom rác thời gian thực. Các thuật toán và khái niệm thường được mô tả bằng mã giả và hình ảnh minh họa.

Sự chấp nhận gần như phổ biến garbage collection bởi các ngôn ngữ lập trình hiện đại làm cho việc hiểu kỹ lưỡng chủ đề này trở nên thiết yếu đối với bất kỳ lập trình viên nào. Handbook uy tín này đưa ra cái nhìn chuyên sâu về cách thức hoạt động của các bộ thu gom khác nhau cũng như các vấn đề hiện đang đối mặt với garbage collectors. Với kiến thức này, lập trình viên có thể tự tin chọn và cấu hình trong nhiều lựa chọn garbage collectors.

**Điểm chính:**
- Ấn bản thứ hai cập nhật cuốn sách kinh điển về quản lý bộ nhớ tự động (1996, 2012)
- Tổng hợp kiến thức từ 60 năm nghiên cứu và phát triển garbage collection
- Bao gồm thuật toán song song, tăng dần, đồng thời và thời gian thực
- Phân tích chi tiết các bộ thu gom thương mại hiệu suất cao hiện đại
- Giải thích các khía cạnh khó của garbage collection, bao gồm giao diện với hệ thống runtime
- Thêm hơn 90 trang, bao gồm các chương mới về lưu trữ và garbage collection nhận thức năng lượng
- E-book với hơn 37.000 liên kết đến các chương, mục, thuật toán, hình ảnh, nghiên cứu gốc
- Cơ sở dữ liệu trực tuyến với gần 3.400 ấn phẩm liên quan đến garbage collection
- Đã có bản dịch tiếng Trung và tiếng Nhật xuất bản năm 2016

## [Vibe-Coded Là "Made in China" Mới](https://gabriel-afonso.com/blog/vibe-coded-is-the-new-made-in-china/)

Bài viết phân tích khái niệm "vibe coding" được Andrej Karpathy đưa ra vào đầu năm 2025: một cách lập trình nơi bạn "hoàn toàn đầu hàng cho vibes, chấp nhận số mũ, và quên rằng code tồn tại" - để LLM xử lý triển khai trong khi bạn tập trung vào những gì muốn xây dựng, không phải cách xây dựng. Tác giả so sánh sự kỳ thị đối với "vibe-coded" hiện nay với nhãn "Made in China" trong quá khứ - từng là viết tắt của hàng giá rẻ, vứt đi, dù thực tế đã thay đổi.

Trước khi lập trình hỗ trợ bởi AI tồn tại, các nhà phát triển mã nguồn mở phải đầu tư lượng thời gian khổng lồ chỉ để đạt được điểm xuất bản. Khó khăn của việc xây dựng phần mềm là một bộ lọc - bạn phải thực sự đứng đằng sau một ý tưởng để đưa nó đến mức đó. Bây giờ rào cản đã biến mất. Mọi người có thể tạo dựng một ứng dụng trong vài giờ mà trước đây mất vài tháng. Quan trọng hơn, mọi người có thể lập trình ở trên trình độ của họ. Bạn không cần hiểu sâu lĩnh vực. Bạn không cần biết tại sao kiến trúc của mình hoạt động. Bạn chỉ cần tầm nhìn và đủ kỹ năng prompting để tạo ra thứ gì đó hoạt động.

Điều này tạo ra kịch bản nơi tác giả dự án có thể không hiểu code họ phát hành. Họ không thể sửa các trường hợp đặc biệt vì không biết hệ thống thực sự hoạt động thế nào. Họ không thể mở rộng tính năng vì không thiết kế nền tảng. Họ không thể bảo trì dự án dài hạn vì không có "sự gắn kết cảm xúc" với thứ mất một buổi chiều để xây dựng. Cộng đồng cảm nhận điều này. Sự thiếu tin tưởng không chỉ về chất lượng code, mà còn về tuổi thọ dự kiến.

Tuy nhiên, một số nhà phát triển tận tâm nhất đã tìm cách sử dụng AI mà không kích hoạt báo động. DHH (tạo ra Ruby on Rails): "Bạn không thể để sự lộn xộn và ngại ngùng phủ nhận sự kỳ diệu của AI." Tanner Linsley (tạo TanStack): "Ở tỷ lệ nhỏ và có trách nhiệm, có." Boris Cherny (tạo Claude Code): "Trong ba mươi ngày qua, 100% đóng góp của tôi cho Claude Code được viết bởi Claude Code." Mô hình: các nhà phát triển quan tâm sâu sắc về chất lượng không từ chối AI. Họ tích hợp nó một cách cẩn thận, vẫn là tác giả trong khi để AI xử lý công việc nặng nhọc.

**Điểm chính:**
- "Vibe coding" = để LLM xử lý triển khai, tập trung vào những gì muốn xây dựng không phải cách xây dựng
- Trước AI: khó khăn xây dựng phần mềm là bộ lọc, phải đầu tư thời gian/khổ luyện để xuất bản
- Hiện tại: rào cản biến mất, mọi người có thể code ở trên trình độ của họ
- Vấn đề: tác giả có thể không hiểu code họ phát hành, không thể sửa/mở rộng/bảo trì
- "Vibe-coded" trở thành nhãn giống "Made in China" cũ = viết tắt của hàng giá rẻ, vứt đi
- AI output có tính aesthetic nhận biết: giọng văn phong, UI gradient tím, tài liệu sound helpful nhưng hollow
- Sự hoài nghi không vô lý: hệ sinh thái đang cố gắng bảo vệ mình trong khi quy tắc được viết lại
- Các nhà phát triển tận tâm vẫn dùng AI có trách nhiệm: DHH, Tanner Linsley, Boris Cherny
- Thời gian vẫn là bộ lọc: dự án bảo trì 2 năm với người dùng thực sự chứng cam kết không thể giả mạo
- Chúng ta trong giai đoạn chuyển tiếp khó xử, cần tìm bằng chứng mới về cam kết thay vì độ khó tạo ra

## [Lỗi Production Khiến Tôi Quan Tâm Đến Undefined Behavior](https://gaultier.github.io/blog/the_production_bug_that_made_me_care_about_undefined_behavior.html)

Tác giả chia sẻ câu chuyện về một lỗi production trong hệ thống C++ xử lý hàng tỷ euro thanh toán mỗi năm. Lỗi bug report cho thấy endpoint HTTP trả về response không thể: cả hai trường `error` và `succeeded` đều là `true`, dù code logic rõ ràng chỉ set một trong hai. Sau khi điều tra, tác giả phát hiện vấn đề liên quan đến undefined behavior trong C++.

Vấn đề nằm ở việc khởi tạo struct. Trong C, `Response response;` rõ ràng là undefined behavior vì struct không được khởi tạo. Nhưng trong C++, quy tắc phức tạp hơn: nếu struct là non-POD (Plain Old Data) có thành viên non-POD như `std::string`, default constructor được gọi. Tuy nhiên, default constructor được compiler tự động tạo ra chỉ khởi tạo các thành viên non-POD, còn các thành viên primitive (`bool`, `int`, v.v.) thì không. Kết quả: `std::string data` được khởi tạo đúng, nhưng `error` và `succeeded` chứa giá trị rác.

Giải pháp đơn giản: dùng `Response response{};` để force zero initialization tất cả các trường. Hoặc implement default constructor rõ ràng, hoặc định nghĩa default values cho các trường trong struct definition. Bài viết cũng đề cập đến các công cụ phát hiện: clang-tidy, Address Sanitizer (ASan), và tự viết libclang plugin để quét codebase. Tác giả kết luận rằng C++ có quá nhiều cách khởi tạo biến và hầu hết đều sai, trong khi nhiều ngôn ngữ khác (C, Go, Rust) tiếp cận đơn giản hơn: struct là plain data, hoặc compiler force set mỗi trường, hoặc zero-initialize tất cả.

**Điểm chính:**
- Lỗi production trong C++ system xử lý hàng tỷ euro thanh toán mỗi năm
- Bug report: cả `error` và `succeeded` đều true, dù logic code chỉ set một trong hai
- Nguyên nhân: `Response response;` - struct non-POD với `std::string` thành viên
- C++ rule phức tạp: default constructor tự động chỉ init non-POD members, primitives thì không
- Giải pháp: `Response response{};` force zero initialization, hoặc implement default constructor, hoặc default field values
- C++ có quá nhiều cách khởi tạo biến và hầu hết đều sai
- Tools phát hiện: clang-tidy, Address Sanitizer (ASan), Valgrind, libclang plugin
- ASan báo: "load of value 8, which is not a valid value for type 'bool'"
- Một số types không trigger undefined behavior: `std::byte`, `unsigned char`, `unsigned char`
- Tác giả thích approach của C/Go/Rust: struct là plain data, force set hoặc zero-init
- Undefined behavior nguy hiểm vì code không còn là source of truth, impossible values xuất hiện

## [Đừng Sa Vào Anti-AI Hype](https://antirez.com/news/158)

Tác giả (người tạo Redis) chia sẻ quan điểm về AI và lập trình. Mặc dù yêu thích viết code từng dòng và theo đuổi phần mềm tối giản với "chất lượng con người", ông thừa nhận AI sẽ thay đổi lập trình mãi mãi. Năm 2020 ông nghỉ việc để viết tiểu thuyết về AI và universal basic income. Cuối 2024 ông mở kênh YouTube về AI. Ông từng nghĩ chúng ta có nhiều năm trước khi lập trình được định hình lại hoàn toàn, nhưng không còn tin vậy nữa.

Gần đây, LLMs hiện tại có thể hoàn thành các subtasks lớn hoặc dự án quy mô trung bình một mình, hầu như không cần hỗ trợ, chỉ cần gợi ý tốt về kết quả cuối cùng. Độ thành công phụ thuộc vào loại lập trình (càng cô lập và càng dễ diễn đạt bằng văn bản thì càng tốt: system programming đặc biệt phù hợp) và khả năng tạo representation tinh thần của vấn đề để giao tiếp với LLM. Nhưng nói chung, hiện rõ ràng rằng với hầu hết dự án, tự viết code không còn hợp lý, trừ khi để giải trí.

Trong một tuần, chỉ prompting và kiểm tra code để hướng dẫn thỉnh thoảng, trong vài giờ ông hoàn thành bốn tác phẩm: (1) Sửa đổi linenoise library để hỗ trợ UTF-8 và tạo framework cho line editing testing với emulated terminal; (2) Sửa transient failures trong Redis test - vấn đề timing, TCP deadlock; Claude Code iterated, inspected process state và fixed bugs; (3) Pure C library để inference BERT embedding models - Claude Code tạo trong 5 phút, 700 dòng code, cùng output và tốc độ với PyTorch (chậm 15%); (4) Thay đổi Redis Streams internals - Claude Code reproduced work trong 20 phút hoặc ít hơn từ design document.

Tác giả cảm thấy vinh dự khi code của ông được LLMs ingest, coi đó là sự tiếp nối những gì ông cố gắng cả đời: democratizing code, systems, knowledge. LLMs sẽ giúp chúng ta viết phần mềm tốt hơn, nhanh hơn, và cho phép small teams cạnh tranh với bigger companies - giống như open source software đã làm trong thập niên 90. Tuy nhiên, ông lo ngại về sự tập trung hóa - công nghệ này quá quan trọng để nằm trong tay vài công ty. Ông tin neural networks, ở quy mô, đơn giản là có thể làm những điều incredible, và không có đủ "magic" trong AI frontier hiện tại để các labs khác không bắt kịp.

**Điểm chính:**
- Tác giả Redis: yêu thích viết code từng dòng, nhưng thừa nhận AI thay đổi lập trình mãi mãi
- LLMs hiện tại có thể hoàn thành subtasks lớn/dự án trung bình một mình, hầu như không cần hỗ trợ
- Trong một tuần: 4 tác phẩm hoàn thành trong vài giờ thay vì tuần nhờ AI
- (1) UTF-8 support cho linenoise library với testing framework
- (2) Sửa transient failures trong Redis test (timing, TCP deadlock)
- (3) Pure C library cho BERT embedding inference - 5 phút, 700 dòng, speed = PyTorch
- (4) Redis Streams internals changes - reproduced trong 20 phút từ design doc
- Tự viết code không còn hợp lý cho hầu hết dự án, trừ giải trí
- Vinh dự code được ingest: democratizing code/systems/knowledge như open source trong 90s
- LLMs giúp viết phần mềm tốt hơn, nhanh hơn, small teams cạnh tranh big companies
- Lo ngại tập trung hóa: công nghệ quá quan trọng để nằm trong tay vài công ty
- Neural networks không có đủ "magic" để các labs khác không bắt kịp
- Khuyên: đừng từ chối AI, test tools mới với tuần công việc, không phải test 5 phút
- Động lực lập trình: building - giờ có thể build nhiều hơn và tốt hơn với AI

## [Performance Hints Của Abseil](https://abseil.io/fast/hints.html)

Abseil là tập hợp thư viện C++ do Google phát triển, đi kèm với hướng dẫn tối ưu hóa hiệu năng dựa trên kinh nghiệm thực tế của họ. Performance Hints cung cấp các kỹ thuật tối ưu hóa thực tế thay vì micro-optimizations lý thuyết. Dự án bao gồm "Performance Tips of the Week" - được mô tả như một loại "Effective analysis" cho tối ưu hóa hiệu năng.

Các tips quan trọng bao gồm: Tip #70 về việc định nghĩa và đo lường thành công tối ưu hóa, Tip #72 về tối ưu hóa chính quá trình tối ưu hóa, Tip #74 về việc tránh "sweeping streetlights" - các cạm bẫy tối ưu hóa. Tip #90 thảo luận về cách đưa ra và sử dụng ước lượng trong vòng đời tối ưu hóa. Tip #64 nhấn mạnh tầm quan trọng của API tốt và trừu tượng hóa đúng để tìm kiếm cơ hội tối ưu hóa.

Abseil tập trung vào các chiến lược tối ưu hóa thực tế cho code C++ hiện đại, bao gồm: hiểu rõ chi phí thực sự của các operations, sử dụng profiler để tìm bottleneck, tránh premature optimization, thiết kế API tốt cho phép tối ưu hóa mà không breaking interface, và hiểu cách compiler optimizations hoạt động. Các tips dựa trên kinh nghiệm thực tế từ việc tối ưu hóa các hệ thống lớn quy mô của Google.

**Điểm chính:**
- Abseil: thư viện C++ từ Google với hướng dẫn tối ưu hóa hiệu năng thực tế
- "Performance Tips of the Week" - các tips tối ưu hóa dựa trên kinh nghiệm thực tế
- Tip #70: định nghĩa và đo lường thành công tối ưu hóa
- Tip #72: tối ưu hóa chính quá trình tối ưu hóa
- Tip #74: tránh "sweeping streetlights" - cạm bẫy tối ưu hóa
- Tip #90: ước lượng trong vòng đời tối ưu hóa
- Tip #64: API tốt và trừu tượng hóa đúng để tìm cơ hội tối ưu hóa
- Tập trung chiến lược thực tế: profiler tìm bottleneck, tránh premature optimization
- Thiết kế API cho phép tối ưu hóa mà không breaking interface
- Hiểu cách compiler optimizations hoạt động
- Kinh nghiệm từ tối ưu hóa các hệ thống lớn quy mô của Google

## [Triển Vọng Thị Trường Việc Làm Kỹ Thuật Phần Mềm 2026](https://www.finalroundai.com/blog/software-engineering-job-market-2026)

Bài viết phân tích triển vọng thị trường việc làm kỹ thuật phần mềm năm 2026. Kỹ thuật phần mềm từng được coi là nghề nghiệp an toàn nhất, giờ là công việc công nghệ dễ bị tổn thương nhất với layoffs gần như mỗi tuần. Companies đổ lỗi cho AI, nhưng thực tế phức tạp hơn. Dữ liệu Indeed qua FRED cho thấy hiring surge khổng lồ peak giữa 2022, rồi giảm mạnh đến 2024, và thị trường không bao hồi.

Nguyên nhân thực sự: hiring boom lịch sử 2021-2022 được thúc đẩy bởi digitization. Từ Big Tech đến Startup, ai cũng overhiring. Khi thế giới chuyển online gần như overnight, companies không còn lựa chọn nào ngoài việc speed up digital efforts. FOMO tạo ra rush. Startup thấy cơ hội hiếm: users online nhiều hơn, investors đổ tiền, muốn làm products nhanh hơn. Engineers được thuê trước khi có clear work. Low interest rates cũng đóng vai trò. Sau đó họ nhận ra demand không tăng cùng pace với hiring, extra people thành gánh nặng.

AI trở thành scapegoat. AI tools rẻ hơn, viết basic code trong vài phút, không đòi salary cả năm. Companies nghĩ: thay 3 engineers bằng 1 engineer với AI tools. Stock market đi lên, cách boost stock price: cut jobs và giải thích có thể làm same work với AI bots rẻ hơn. Nhưng họ vẫn cần engineers, chỉ là có euphoria rồi correction dẫn đến crisis. Giờ back to normal khi tiến đến 2026.

Lý do lớn khác: large companies thoải mái với remote hiring. Tại sao hire engineer USA với salary rất cao khi có thể hire người từ Asia với fraction of cost? Senior engineer USA có thể $100k/năm, Argentina $60k, India $40k. Math đơn giản cho companies watching bottom line. AI thành PR-friendly excuse: "we are replacing jobs with AI" nghe forward-thinking hơn là "we are shipping jobs overseas".

AI không phải culprit, nhưng không có nghĩa là không quan trọng. METR study tìm thấy experienced software engineers thực tế 19% less productive khi dùng AI tools cho real-world tasks. AI là tool, không phải replacement. Software engineering jobs sẽ không biến mất, nhưng demand cho basic coding jobs sẽ giảm. Magnus Grimeland (Antler VC) cho rằng AI sẽ tăng demand cho software engineers vì AI systems sẽ mắc lỗi, human engineers vẫn cần để fix errors. More code means more errors.

US Bureau of Labor Statistics vẫn expect software developer jobs grow ~15%, chậm hơn prediction trước là 22% nhưng growth vẫn là growth. SignalFire báo Meta, Netflix, Uber, Google hire engineers faster hơn people leaving. Hiring ratios sit well above 100 - dấu mạnh engineering work đang tăng, không giảm. What's changing là skill bar. Jobs require actual engineering thinking, designing systems, optimizing performance, ensuring security vẫn rất được demand.

**Điểm chính:**
- Software engineering: từ career an toàn nhất thành dễ bị tổn thương nhất với layoffs mỗi tuần
- Hiring boom 2021-2022: digitization rush, FOMO, overhiring, low interest rates
- Correction 2022-2024: demand không tăng cùng pace, AI thành scapegoat
- Remote hiring: hire Asia fraction of cost so với USA, AI thành PR-friendly excuse
- METR study: experienced engineers 19% less productive với AI tools cho real-world tasks
- AI là tool, không phải replacement - more code means more errors cần fix
- US Bureau of Labor: software developer jobs vẫn grow 15% (chậm hơn 22% prediction)
- SignalFire: Meta, Netflix, Uber, Google hire faster than people leaving
- What's changing: skill bar - need engineering thinking, system design, performance, security
- Top languages 2026: Python (AI/ML), JavaScript/TypeScript (frontend/full-stack), Go (backend/infrastructure), Java (enterprise), Swift (iOS)
- New opportunities: AI engineering, AI infrastructure, data engineering, AI safety
- AI/ML jobs share tăng từ 10% đến 50% (2023-2025)
- Entry-level jobs giảm 40% so với pre-2022, CS graduates và bootcamp grads tăng
- Gartner: 80% engineering workforce cần upskill để keep pace với generative AI by 2027
- Median salary software engineer US 2026: $130,000
- Market maturing: harder to break in nhưng financial case vẫn strong

### Bonus

**Hình ảnh:**

![12 Architectural Concepts Developers Should Know](https://substackcdn.com/image/fetch/$s_!0P7Z!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F7546f89c-8b6f-4ced-8d40-4e0137ab5941_2360x2852.png)
![Top Developer Tools You Can Use in 2026](https://substackcdn.com/image/fetch/$s_!Co3P!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fb7f3c175-c0d6-4d02-992d-114ac588b45c_2252x2752.png)
![5 Rate Limiting Strategies To Protect the System](https://substackcdn.com/image/fetch/$s_!Ty5s!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fecc68f5e-6353-4487-a779-92bb11440bc5_2360x2960.png)
![How Live Streaming Works?](https://substackcdn.com/image/fetch/$s_!dPjo!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fc2543392-5e04-4dd6-b39a-72fdfe3a3048_2360x2770.png)
![5 Leader Election Algorithms Powering Modern Databases](https://substackcdn.com/image/fetch/$s_!MJUT!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F06243bf8-f149-4075-bc81-99af15be3579_6001x7802.png)
![A Guide to Database Sharding](https://substackcdn.com/image/fetch/$s_!Xrbz!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8c99d0d5-8e5b-4e82-bb28-9fbd470e3bc6_2250x2624.png)
![Modern Storage Systems](https://substackcdn.com/image/fetch/$s_!NCWv!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F0adc9c84-37f2-4a96-96a6-f7f26bbd1b7e_2360x2960.jpeg)
