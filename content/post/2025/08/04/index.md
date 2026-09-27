---
title: "Newsletter #45"
date: 2025-08-04
tags: [ "AI-Assisted", "Productivity", "Career", "Paul Graham", "Essay" ]
categories: [ "Newsletter" ]
---

*~~Bài post được thực hiện bởi Cline + Kimi K2.~~ Mời bạn thưởng thức Newsletter #45.*

## [The Best](https://www.paulgraham.com/best.html)

Trong bài luận "The Best Essay", Paul Graham tự hỏi: bài luận hay nhất có thể viết được sẽ trông như thế nào? Câu trả lời đầu tiên là nó phải bàn về chủ đề quan trọng nhất mà ta còn có thể nói ra điều gì đó bất ngờ, nhưng hướng này dẫn tới những phát kiến khoa học lớn, vốn gắn chặt với thời điểm ra đời chứ không vượt thời gian. Vì vậy ông chuyển câu hỏi thành một câu hỏi thực tế hơn: làm sao để viết luận thật tốt? Theo Graham, mọi thứ bắt đầu từ một câu hỏi ban đầu đủ hấp dẫn, nơi người viết có một góc nhìn mới hoặc một cách tiếp cận riêng.

Quá trình viết là biến những ý tưởng còn mơ hồ thành câu chữ cụ thể, rồi đọc lại và sửa không khoan nhượng cho tới khi lộ ra khoảng cách giữa câu trả lời và sự thật, đôi khi mở ra cả một hướng nhìn hoàn toàn mới. Bài luận vận hành như một cuộc khám phá đệ quy: mỗi câu trả lời lại sinh ra câu hỏi mới, và người viết nên theo nhánh có sự kết hợp tốt nhất giữa tính tổng quát và tính mới mẻ, sẵn sàng bỏ đi cả những đoạn đã viết nếu chúng không phục vụ hướng chính. Dù câu hỏi ban đầu giới hạn chất lượng tối đa của bài, Graham khuyên đừng quá thận trọng khi chọn đề tài mà hãy viết thật nhiều, vì phần lớn câu hỏi đều cho ra bài luận tốt. Khả năng đặt câu hỏi hay đến từ vốn hiểu biết rộng và trải nghiệm sâu ở nhiều lĩnh vực.

## [AI Tools Make Developers 19% Slower, Not Faster](https://threadreaderapp.com/thread/1943360399220388093.html)

Tổ chức nghiên cứu METR đã thực hiện một thử nghiệm đối chứng ngẫu nhiên với 16 lập trình viên mã nguồn mở giàu kinh nghiệm, cùng 246 nhiệm vụ thật trên chính các kho mã của họ, vốn trung bình có hơn 22.000 sao và hơn một triệu dòng mã. Mỗi nhiệm vụ được chỉ định ngẫu nhiên là được phép hoặc không được phép dùng AI (chủ yếu là Cursor Pro với Claude 3.5/3.7). Kết quả gây bất ngờ: trước thử nghiệm, các lập trình viên dự đoán AI giúp họ nhanh hơn 24%; sau khi làm xong, họ vẫn cảm thấy mình nhanh hơn 20%; nhưng số liệu thực tế cho thấy họ chậm hơn 19% khi có AI hỗ trợ.

Nhóm nghiên cứu nhấn mạnh rằng kết quả chỉ đúng trong bối cảnh cụ thể này và không đại diện cho toàn bộ ngành phần mềm; các mô hình tương lai hoặc cách dùng hiệu quả hơn có thể cho kết quả khác. Sự chậm lại xuất hiện nhất quán trên nhiều thước đo và đến từ nhiều yếu tố cùng lúc: khi được dùng AI, lập trình viên dành thời gian viết câu lệnh cho AI, chờ đợi, xem xét đầu ra của AI và cả thời gian ngồi không, thay vì trực tiếp viết mã hay tra cứu thông tin. Bài học rút ra là khoảng cách giữa cảm nhận chủ quan và hiệu quả thực tế có thể rất lớn, nên hãy đo lường thay vì chỉ tin vào cảm giác khi đánh giá một công cụ mới.

## [Evolution of Uber's Search Platform](https://www.uber.com/in/en/blog/evolution-of-ubers-search-platform/)

Bài viết kể lại hành trình phát triển nền tảng tìm kiếm của Uber qua ba giai đoạn. Ban đầu, Uber dùng Elasticsearch (dựa trên Apache Lucene) gần như một "hộp đen", đội ngũ kỹ sư chủ yếu lo vận hành ổn định. Hạn chế lớn là cơ chế gần thời gian thực của Lucene: dữ liệu mới chỉ tìm được sau khi được đẩy xuống chỉ mục, gây độ trễ cho các tình huống gấp như ghép hành khách với tài xế. Từ năm 2019, Uber tự xây dựng Sia, mở rộng Lucene với chỉ mục trực tiếp trong bộ nhớ để tìm kiếm thời gian thực, chuyển sang giao tiếp gRPC/Protobuf gọn nhẹ hơn, nạp dữ liệu kiểu kéo qua Kafka và triển khai chủ động ở nhiều vùng. Tuy vậy, kiến trúc phức tạp khiến việc đón nhận tính năng mới của Lucene như tìm kiếm vector rất khó, trong khi phần lớn tình huống thực ra không cần độ tươi thời gian thực.

Năm 2024, với dự án Sunrise, Uber nhận ra việc tự duy trì hệ thống riêng không còn bền vững và chuyển sang OpenSearch, đồng thời trở thành thành viên sáng lập của OpenSearch Software Foundation. Kiến trúc hiện tại tách biệt luồng ghi và luồng đọc: dữ liệu từ Kafka được gộp thành một phân đoạn tối ưu rồi lưu lên kho từ xa, còn bộ tìm kiếm chỉ việc tải về để phục vụ truy vấn, giữ mọi chi phí nạp dữ liệu ngoài đường truy vấn. Uber cũng đóng góp ngược lại cho OpenSearch 3.0 như nạp dữ liệu kiểu kéo và API gRPC. Bài học rút ra: giải pháp tự xây rất tốn kém khi hệ sinh thái thay đổi nhanh, và chỉ nên chấp nhận độ phức tạp ở chỗ thật sự cần.

## [Vercel](https://leerob.com/vercel)

Lee Robinson nhìn lại năm năm làm việc tại Vercel, nơi anh đi từ vị trí kỹ sư lên tới phó chủ tịch, chứng kiến công ty tăng từ 30 người với doanh thu định kỳ 1 triệu USD lên 650 người với hơn 200 triệu USD. Bài học đầu tiên là cân bằng công việc và cuộc sống: anh từng trả lời việc công ty ngay cả trong tuần trăng mật, và chỉ thoát ra được khi xây dựng quy trình cùng những người đủ giỏi để tự vận hành. Thứ hai, tốc độ là lợi thế cạnh tranh: câu hỏi "cần gì để ra mắt vào tuần sau?" buộc đội ngũ tìm cách sáng tạo, và kể cả khi trễ hạn thì vẫn nhanh hơn so với không đặt hạn.

Thứ ba, muốn mở rộng thì phải tuyển người thay vì tự làm mọi thứ, luôn tuyển dụng và giữ tiêu chuẩn cao, chỉ nhận ứng viên khiến mình thật sự hào hứng. Thứ tư, tránh quyết định đơn phương: anh từng nhảy vào một đợt ra mắt sản phẩm vào phút chót và đòi thay đổi khi thiếu bối cảnh, một điều anh hối tiếc; người lãnh đạo nên tham gia từ đầu và tạo đồng thuận trước khi ra quyết định. Cuối cùng là linh hoạt và dám nhận sai: việc tự duyệt mọi bài đăng mạng xã hội của công ty tạo ra điểm nghẽn, và khi giao quyền kèm hướng dẫn chất lượng, kết quả lại tốt hơn. Đây là những bài học hữu ích cho bất kỳ lập trình viên nào đang hướng tới vai trò dẫn dắt nhóm.

## [Tools](https://lucumr.pocoo.org/2025/7/3/tools/)

Armin Ronacher, tác giả của Flask, đưa ra quan điểm rằng khi làm việc với các tác tử AI, "mã nguồn là tất cả những gì bạn cần". Ông phê phán giao thức MCP, vốn cho phép mô hình ngôn ngữ gọi các công cụ và dịch vụ bên ngoài: cách này khó kết hợp các bước với nhau vì mỗi bước đều phụ thuộc vào suy luận của mô hình, tiêu tốn nhiều ngữ cảnh cho mỗi lần gọi công cụ, và mở rộng kém khi cần tự động hóa những việc lặp đi lặp lại. Theo ông, khi không có AI, một kỹ sư phần mềm giải quyết vấn đề bằng cách viết mã, vậy thì AI cũng nên làm như thế.

Mã do mô hình sinh ra có logic rõ ràng mà con người có thể kiểm tra, chạy lặp lại với chi phí thấp sau khi đã viết xong, và dễ gỡ lỗi hơn. Ví dụ minh họa là việc Armin chuyển toàn bộ blog của mình từ reStructuredText sang Markdown: mô hình viết mã chuyển đổi dựa trên cây cú pháp, viết thêm kịch bản so sánh HTML cũ và mới để xác minh, rồi lặp lại vòng phản hồi đó gần như không cần con người can thiệp. Ở đây, mô hình đóng vai người đánh giá chất lượng mã thay vì trực tiếp thực thi từng bước. Ông kết luận MCP có vẻ là ngõ cụt cho tự động hóa quy mô lớn, và hướng đi hứa hẹn hơn là kết hợp sinh mã với việc để mô hình đánh giá kết quả sau khi chạy.

## [How I Build Software Quickly](https://evanhahn.com/how-i-build-software-quickly/)

Evan Hahn chia sẻ cách anh xây dựng phần mềm nhanh mà vẫn giữ chất lượng chấp nhận được. Điểm mấu chốt là cân bằng giữa tốc độ và chất lượng: hãy nhắm tới "8 trên 10 điểm, giao đúng hạn" thay vì theo đuổi sự hoàn hảo. Mức "đủ tốt" phụ thuộc vào bối cảnh, một cuộc thi làm game trong 24 giờ chấp nhận mã cẩu thả, còn máy tạo nhịp tim thì đòi hỏi sự xuất sắc, nên cần hiểu nhóm mình coi thế nào là đủ tốt. Anh khuyên nên làm bản nháp thô trước, đầy ghi chú cần làm, dữ liệu viết cứng và lỗi chưa xử lý, để sớm phát hiện vấn đề chưa lường trước, tránh tốn công vào đoạn mã rồi sẽ bị xóa và tránh trừu tượng hóa quá sớm.

Làm ít hơn cũng là làm nhanh hơn: hãy đặt câu hỏi về phạm vi, gộp màn hình, bỏ qua các trường hợp biên không cần thiết hoặc giảm số tham số của API. Để tránh xao nhãng, anh đặt hẹn giờ cho từng việc và lập trình theo cặp. Những thay đổi nhỏ dễ viết, dễ xem xét, dễ hoàn tác và ít lỗi hơn, ví dụ sửa lỗi, nâng cấp thư viện rồi mới thêm tính năng trong các lần thay đổi riêng. Các kỹ năng giúp anh tăng tốc gồm đọc mã (quan trọng nhất), mô hình hóa dữ liệu, viết kịch bản tự động, dùng trình gỡ lỗi, biết nghỉ ngơi, viết hàm thuần và tận dụng công cụ LLM.

## [The Most Mysterious Bug I Solved at Work](https://cadence.moe/blog/2025-07-02-the-most-mysterious-bug-i-solved-at-work/)

Cadence kể về lỗi bí ẩn nhất cô từng xử lý trong một ứng dụng giới thiệu bệnh nhân điện tử tại Úc, hệ thống chuyển dữ liệu giới thiệu sang các định dạng HL7, CDA hoặc PDF để gửi cho cơ sở y tế. Thỉnh thoảng hệ thống báo lỗi "Illegal Character entity: expansion character (code 0x2) not a valid XML character". Ký tự 0x2 (bắt đầu văn bản) là một ký tự điều khiển lỗi thời từ thời sơ khai của máy tính, gần như không có công dụng ngày nay, vậy mà nó lại nằm trong phần thư giới thiệu do bác sĩ tự nhập.

Quá trình điều tra dần hé lộ manh mối: các thư bị lỗi đều bị ngắt dòng cứng khác thường, và cùng một bác sĩ gửi những bức thư giống hệt nhau nhiều lần. Hóa ra bác sĩ đã sao chép văn bản từ bản PDF của các lần giới thiệu trước lưu trong phần mềm quản lý phòng khám, và ký tự 0x2 xuất hiện đúng tại vị trí dấu gạch nối ở cuối dòng trong PDF. Thủ phạm là trình xem PDF của Microsoft Edge, mặc định trên Windows, đã chuyển nhầm dấu gạch nối ở chỗ ngắt dòng thành ký tự 0x2 khi sao chép. Nhóm phát triển khắc phục bằng cách tự động thay 0x2 thành dấu gạch nối thay vì xóa đi, giữ nguyên ý của văn bản. Câu chuyện nhắc lập trình viên rằng nguyên nhân lỗi đôi khi nằm ngoài mã nguồn, trong thói quen của người dùng và công cụ họ sử dụng.

## [Cách suy nghĩ về thời gian trong lập trình](https://shanrauf.com/archive/how-to-think-about-time-in-programming)

Shan Rauf xây dựng một mô hình tư duy rõ ràng để xử lý thời gian trong lập trình. Nền tảng là thời gian tuyệt đối gồm "khoảnh khắc" và "khoảng thời gian", được biểu diễn bằng số giây tính từ một mốc gọi là epoch, như Unix lấy ngày 1/1/1970, giúp so sánh và tính toán chỉ bằng phép toán số học. Con người lại dùng thời gian dân sự theo lịch Gregorian, với các tháng dài ngắn khác nhau. UTC định nghĩa giây theo đồng hồ nguyên tử và thỉnh thoảng chèn giây nhuận để khớp với chuyển động quay của Trái Đất, nên một ngày có thể dài 86401 hoặc 86399 giây; Date của JavaScript bỏ qua giây nhuận. Múi giờ không phải thực thể cố định mà là tập quy tắc có thể thay đổi: khi chuyển giờ mùa hè, có những giờ dân sự bị bỏ qua hoặc lặp lại hai lần, và cơ sở dữ liệu múi giờ IANA (như America/New_York) lưu toàn bộ lịch sử các quy tắc đó.

Về thực hành, tin nhắn trò chuyện nên lưu theo UTC rồi hiển thị theo múi giờ người xem. Với sự kiện, cần xét ý định: buổi học ở một địa điểm cụ thể nên lưu giờ địa phương kèm mã múi giờ, còn sự kiện tuyệt đối như nhật thực thì lưu theo UTC. Tác giả khuyên đóng gói sẵn cơ sở dữ liệu IANA và cập nhật định kỳ, dùng dữ liệu Unicode CLDR để hiển thị tên múi giờ thân thiện, và đừng bao giờ coi độ lệch UTC là bất biến. Lời khuyên "cứ dùng UTC" chưa đủ, vì chuyển sang UTC quá sớm sẽ làm mất thông tin về ý định ban đầu của người dùng.

## [Nguồn gốc của từ "call" trong lập trình](https://quuxplusone.github.io/blog/2025/04/04/etymology-of-call/)

Arthur O'Dwyer đi tìm lý do vì sao ta nói "gọi" (call) một hàm. Có ba giả thuyết trực quan: gọi như ghé thăm bạn bè (đến, ở lại một lúc rồi về), gọi như triệu người hầu tới làm việc, hoặc gọi như gọi điện thoại để hỏi và nhận câu trả lời. Đáp án gần với giả thuyết thứ hai nhưng theo đường vòng, bắt nguồn từ ngành thư viện: ở các thư viện kho đóng, bạn đọc "gọi" sách theo ký hiệu xếp giá, thuật ngữ "call number" do Melvil Dewey đưa ra năm 1876. Những nhà khoa học máy tính đầu tiên mượn hình ảnh này cho thư viện chương trình con, nơi lập trình viên "gọi" đoạn mã viết sẵn giống như thủ thư lấy sách theo ký hiệu.

Dòng thời gian cho thấy rõ sự tiến hóa: năm 1947, John Mauchly viết về việc chương trình con được "gọi vào" từ thư viện trên băng từ; năm 1956, chương trình hợp ngữ của MANIAC II dùng "call number" để định danh chương trình con; năm 1958, Fortran II giới thiệu câu lệnh CALL, biến "gọi" thành hành động lúc chạy chương trình; khoảng 1959–1960, Algol và các ngôn ngữ khác tiếp nhận thuật ngữ này; năm 1961, cụm động từ "gọi một chương trình con" lần đầu được ghi nhận trong tài liệu của Burroughs, và đến năm 1963 cách dùng hiện đại đã ổn định trong giáo trình của MIT. Tác giả kết luận chính từ khóa CALL của Fortran II đã đẩy nhanh việc "gọi" trở thành động từ chuẩn khi nói về việc thực thi hàm.

*Sau khi trải nghiệm lại với nhiều url thì có vẻ Cline + Kimi K2 đã tràn context, sau khi compact thì quên mất một số context, vì vậy rất dễ bị nhầm, cần nhắc lại nhiều lần về việc đây là Windows nên phải dùng các lệnh PowerShell hỗ trợ thay vì các lệnh Linux. Ngoài ra còn có vài sai lầm ngớ ngẩn như tóm tắt... sai url :>*

---

*Bài viết đã được viết lại bởi Claude Code với Opus 5.5 vào ngày 27/09/2026.*
