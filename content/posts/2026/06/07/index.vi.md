---
title: "Newsletter #110"
date: 2026-06-07
tags: ["AI-Assisted", "Newsletter", "LLMs", "Go", "System Design", "Infrastructure", "Engineering Culture"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #110.*

## [go podcast() | 086: Just use postgres, man](https://share.transistor.fm/s/5159e8a9)

Trong tập podcast này, Dominic St-Pierre và Morten Vistisen xoay quanh một câu hỏi quen thuộc: nên lưu dữ liệu đo lường (telemetry) bằng ClickHouse hay cứ dùng PostgreSQL? Morten muốn thử ClickHouse, còn Dominic chọn cách thực dụng: với dưới khoảng 10 triệu dòng, PostgreSQL cho hiệu năng không kém bao nhiêu, và việc mở rộng quy mô hiếm khi xảy ra chỉ sau một đêm, nên vẫn còn thời gian để chuyển đổi khi thật sự cần. Morten cũng kể việc phải viết lại một thành phần trong dự án DeployQuad vì mã nguồn do LLM sinh ra cho bản thử nghiệm ban đầu không chạy như mong đợi, từ đó nhấn mạnh tầm quan trọng của việc hiểu rõ mã nguồn mình tạo ra.

Dominic giới thiệu StaticBackend v1.7.0 với hỗ trợ nhiều tài khoản người dùng và mở rộng các hàm chạy phía máy chủ dựa trên Goja (một môi trường chạy JavaScript viết bằng Go), đồng thời than phiền rằng việc phát hành tốn công vì phải cập nhật nhiều gói NPM, trái ngược với cách chỉ cần gắn thẻ rồi đẩy lên của Go. Cuối tập, cả hai bày tỏ sự hoài nghi về việc phụ thuộc quá nhiều vào AI sinh mã: nó làm mất trạng thái tập trung sâu khi lập trình, khiến kỹ năng mai một, và lợi ích ròng chưa chắc đã có. Họ tin rằng kỹ năng lập trình vẫn giữ nguyên giá trị.

## [That one time I used Go panics for flow control](https://noncrab.net/posts/panic-as-flow-control/)

Tác giả kể về một sự cố quá tải ở một dịch vụ lưu trữ dữ liệu trong bộ nhớ viết bằng Go: khi lượng truy vấn vượt quá khả năng xử lý, những truy vấn vốn mất 1–2 giây kéo dài tới cả phút, và việc các dịch vụ phía trên tự động thử lại càng làm tải dồn thêm. Vấn đề nằm ở chỗ các hàm sắp xếp trong thư viện chuẩn của Go không nhận `context` và không trả về lỗi, nên hệ thống vẫn tiếp tục tiêu tốn CPU để sắp xếp kết quả cho những truy vấn mà phía gọi đã bỏ cuộc vì hết thời gian chờ. Thiết kế này vốn hợp lý, vì thông thường ta sắp xếp trong tác vụ xử lý theo lô hoặc với lượng dữ liệu đủ nhỏ để thời gian không đáng kể.

Thay vì viết lại toàn bộ cơ chế sắp xếp, nhóm dùng cặp `panic`/`recover` như một cách báo hiệu thoát ra khỏi luồng xử lý: hàm so sánh kiểm tra xem `context` đã bị hủy chưa, nếu có thì gọi `panic` với một giá trị đánh dấu riêng. Một hàm `defer` bọc quanh lệnh sắp xếp sẽ bắt `panic` đó và chuyển nó thành lỗi bình thường, còn các `panic` khác vẫn được ném tiếp để không che giấu lỗi thật. Nhờ vậy hệ thống bỏ được những lần sắp xếp vô ích. Chính tác giả thừa nhận đây là "giải pháp xấu xí cho một vấn đề xấu xí", chỉ nên dùng trong phạm vi hẹp và được kiểm soát chặt.

## [The last six months in LLMs in five minutes](https://simonwillison.net/2026/May/19/5-minute-llms/)

Bài viết là phiên bản kèm chú thích của bài nói chớp nhoáng (lightning talk) mà Simon Willison trình bày tại PyCon US 2026, điểm lại những diễn biến của các mô hình ngôn ngữ lớn (LLM) từ tháng 11/2025 đến tháng 5/2026. Xu hướng nổi bật nhất là các tác tử lập trình (coding agent) đã vượt qua ngưỡng chất lượng: nhờ OpenAI và Anthropic áp dụng kỹ thuật học tăng cường từ phần thưởng kiểm chứng được trong suốt năm 2025, chúng chuyển từ trạng thái "thường chạy được" sang "hầu như chạy được" và trở thành công cụ làm việc hằng ngày. Riêng tháng 11, danh hiệu "mô hình tốt nhất" đổi chủ tới năm lần giữa Anthropic, OpenAI và Google, còn tác giả vẫn dùng bài kiểm tra vui vẽ hình SVG con bồ nông đạp xe để so sánh.

Xu hướng thứ hai là các mô hình chạy cục bộ với trọng số mở vượt xa kỳ vọng, như dòng Gemma 4 của Google, GLM-5.1 của Trung Quốc, hay Qwen3.6-35B-A3B chỉ khoảng 21GB và chạy được trên máy tính xách tay thông thường. Bài viết cũng nhắc tới OpenClaw, một dự án trợ lý AI cá nhân gây sốt đến mức từ "Claws" trở thành tên gọi chung cho loại tác tử này và Mac Mini bị mua hết để chạy chúng tại nhà.

## [Prompts are technical debt too](https://www.seangoedecke.com/prompts-are-technical-debt-too/)

Sean Goedecke lập luận rằng các câu lệnh gợi ý (prompt), kể cả những tệp như `AGENTS.md` hay `CLAUDE.md`, cũng là một dạng nợ kỹ thuật, thậm chí tệ hơn mã nguồn. Mã nguồn không đổi thì hành vi cũng gần như không đổi, và khi hỏng thường báo lỗi rõ ràng; còn prompt thì âm thầm xuống cấp mỗi khi mô hình được nâng cấp. Một prompt được tinh chỉnh công phu cho mô hình cũ có thể trở nên vô dụng hoặc phản tác dụng với mô hình mới mà không ai nhận ra. Theo tác giả, một bộ khung tác tử được viết prompt tỉ mỉ quanh mô hình đời cũ gần như luôn thua một bộ khung tối giản dùng mô hình mới hơn.

Từ đó, tác giả đưa ra các khuyến nghị cụ thể: ưu tiên dùng các công cụ lập trình AI phổ biến như Claude Code, Cursor hay Copilot với cấu hình mặc định, vì đội ngũ phát triển của họ liên tục tối ưu prompt thay bạn; hạn chế cài thêm máy chủ MCP hay skill trừ khi thật sự cần; nếu phải viết `AGENTS.md` thì chỉ ghi những thông tin thực tế, cốt lõi về dự án chứ không cố điều khiển hành vi của mô hình, và không đưa vào nội dung do mô hình tự sinh mà chưa được xem lại. Cuối cùng, hãy thường xuyên xóa bớt prompt tùy chỉnh để giảm gánh nặng bảo trì.

## [We see something that works, and then we understand it](https://lemire.me/blog/2025/12/04/we-see-something-that-works-and-then-we-understand-it/)

Daniel Lemire phản bác "lý thuyết đổi mới tuyến tính", tức niềm tin rằng hiểu biết phải có trước rồi tiến bộ mới đến sau. Ông mượn khái niệm "thinkism" của Kevin Kelly để chỉ ảo tưởng rằng chỉ cần suy nghĩ đủ lâu là giải được mọi vấn đề. Lối tư duy này thống trị trường học và bộ máy hành chính, nơi quy tắc được định sẵn: học sinh học khái niệm trước rồi mới giải những bài toán chỉ cần đúng các khái niệm vừa học. Nhưng trong thực tế thì ngược lại, như đồng hồ quả lắc đã chạy được từ năm 1656, trước khi Newton và Hooke xây dựng lý thuyết về lực và chuyển động giải thích nó.

Theo tác giả, nghiên cứu và phát triển luôn diễn ra khi hiểu biết còn chưa đầy đủ; người đi làm thường học được nhiều hơn trong một năm so với cả quãng đại học, vì công việc kỹ thuật thực tế đòi hỏi phải thử nghiệm và quan sát liên tục. Bài viết rút ra hai bài học: muốn đột phá thì phải ưu tiên thử nghiệm hơn là suy nghĩ trừu tượng, và không nên kỳ vọng AI giải quyết được mọi bài toán phức tạp chỉ nhờ kiến thức, bởi thế giới thực phức tạp hơn mọi thứ ta đã biết.

## [How Vercel Cut Build Wait Times From 90 Seconds To 5](https://blog.bytebytego.com/p/how-vercel-cut-build-wait-times-from)

Bài viết phân tích cách Vercel rút thời gian chờ cấp phát môi trường xây dựng (build) từ 90 giây xuống 5 giây, tức nhanh gấp 18 lần, bằng nền tảng nội bộ mang tên Hive. Thách thức cốt lõi là Vercel phải chạy mã nguồn không đáng tin cậy của hàng nghìn khách hàng trên cùng phần cứng, nên phải coi mọi đoạn mã là có thể độc hại. Container thông thường không đủ an toàn vì chúng dùng chung nhân Linux, chỉ một lỗ hổng ở nhân là có thể ảnh hưởng tới khách hàng khác. Vì vậy, thay vì dùng Kubernetes, Vercel xây Hive trên Firecracker, công nghệ ảo hóa nhẹ của AWS: mỗi lần build chạy trong một "cell" là một máy ảo siêu nhỏ có nhân riêng, khởi động trong khoảng 125 mili giây. Hệ thống gồm các cụm theo khu vực, mỗi máy vật lý ("box") chạy nhiều cell, cùng một tầng điều khiển để điều phối.

Tốc độ đến từ ba lớp tối ưu cộng dồn: lưu đệm ảnh container và chụp nhanh ổ đĩa giúp khởi động nguội giảm từ khoảng 50 giây xuống 5 giây; một nhóm cell khởi động sẵn đang chờ việc giúp phần lớn lần build gần như không phải đợi; và thời gian khởi động tính bằng mili giây của Firecracker khiến việc duy trì nhóm cell chờ sẵn trở nên khả thi. Đổi lại, giữ cell chờ sẵn tốn tài nguyên và mỗi cell phải bị hủy sau một lần build vì lý do bảo mật, nhưng việc tự làm chủ hạ tầng giúp Vercel mở ra nhiều tính năng mới cho sản phẩm.


## [The Anatomy of an AI-Native Org](https://ajeygore.in/content/the-anatomy-of-an-ai-native-org)

Ajey Gore cho rằng AI đang định hình lại cấu trúc tổ chức bằng cách xóa bỏ "lớp phiên dịch". Suốt ba mươi năm, doanh nghiệp vận hành theo ba tầng: lãnh đạo quyết định "Tại sao", đội sản phẩm quyết định "Cái gì", còn kỹ sư chuyển các quyết định đó thành mã nguồn, tức "Như thế nào". Phần lớn công việc trong mô hình này là chuyển đổi giữa đầu vào và đầu ra đã được định nghĩa rõ. Theo tác giả, AI không nhắm vào một chức danh cụ thể mà nhắm vào chính loại công việc chuyển đổi ấy, như biến yêu cầu thành mã nguồn hay đặc tả thành thành phần giao diện, khiến chúng rẻ đi nhiều bậc, trong khi phần việc chiến lược ở hai đầu vẫn khó như cũ.

Hình hài mới của một tổ chức "AI-Native" vì thế thay đổi: tầng "Tại sao" vẫn nhỏ gọn; tầng "Cái gì" phình to vì óc phán đoán và gu thẩm mỹ trở nên quan trọng hơn khi phải định hướng cho AI; tầng "Như thế nào" thu hẹp mạnh nhưng khó hơn, tập trung vào kiến trúc, bảo mật và các cơ chế đảm bảo có thể tin cậy vào kết quả của AI; còn các tác tử AI đảm nhận việc chuyển đổi thường ngày dưới sự giám sát của con người. Quản lý không thể chỉ điều phối mà phải trực tiếp đóng góp, còn kỹ sư nên chuyển sang công việc định nghĩa vấn đề thay vì cạnh tranh với AI ở khâu viết mã nguồn.

## [How to Stay Resilient in a Difficult Job](https://andiroberts.com/executive-coaching/how-to-stay-resilient-in-a-difficult-job)

Bài viết đưa ra 7 chiến lược thực tế, dựa trên cơ sở khoa học, để giữ vững sức bền tinh thần khi phải làm một công việc khó khăn, chẳng hạn gặp quản lý kém, làm theo ca bất thường hay căng thẳng kéo dài. Tác giả nhấn mạnh rằng kiên cường ở đây không phải là cố ép mình phải tích cực, cũng không phải tự lừa rằng công việc thú vị, mà là bảo toàn năng lượng, giữ góc nhìn khách quan và duy trì cảm giác mình vẫn kiểm soát được phần nào tình hình, để làm việc tốt, bảo vệ sức khỏe và giữ sự chủ động cho những lựa chọn sau này.

Các chiến lược bao gồm: chuẩn bị tâm lý vững vàng từ đầu ngày và ổn định thể trạng bằng ánh sáng, nước và vận động trước giờ làm; tập trung vào những gì mình kiểm soát được và giữ tiêu chuẩn làm việc của bản thân dù hệ thống xung quanh có lỏng lẻo; đặt ranh giới cảm xúc để không mang áp lực về nhà; tìm ít nhất một đồng nghiệp đáng tin cậy để chia sẻ; và luôn hướng tới những bước tiến nhỏ để dần có được một công việc tốt hơn.

## [What's Easy Now? What's Hard Now?](https://brooker.co.za/blog/2026/05/18/whats-easy-whats-hard.html)

Marc Brooker đề xuất "giả thuyết vòng lặp phản hồi": về lâu dài, các tác tử lập trình AI sẽ thấy những tác vụ có cơ chế phản hồi rõ ràng, đo lường được là "dễ", còn những tác vụ thiếu phản hồi hiệu quả sẽ vẫn "khó", và đây sẽ là yếu tố chính quyết định năng lực của chúng. Mở đầu bằng ví dụ từ kỹ thuật điện, tác giả cho thấy phản hồi mạnh đến mức có thể biến những linh kiện đơn giản, thậm chí có khiếm khuyết, thành công cụ cho kết quả tuyệt vời.

Từ đó, ông đảo ngược quan niệm phổ biến rằng làm trang web thì dễ còn phần mềm hệ thống thì khó. Một bộ máy lưu trữ cho cơ sở dữ liệu như RocksDB có đặc tả khá đơn giản, gồm giao diện lập trình cùng các tính chất an toàn và tính sống, nên có thể được kiểm chứng tự động. Ngược lại, phát triển trang web lại thiếu phản hồi tự động tương tự và phụ thuộc vào đánh giá chậm, thiếu nhất quán của con người. Thực tế hiện nay cũng cho thấy tác tử làm tốt việc tối ưu hiệu năng khi có sẵn bộ đo chuẩn tốt, nhưng gặp khó với quyết định kiến trúc vốn mang tính chủ quan, còn những ngôn ngữ như Rust dẫn dắt chúng tới mã nguồn đúng nhờ thông báo lỗi rõ ràng. Vì vậy, ngôn ngữ đặc tả, công cụ kiểm tra lúc biên dịch và khung kiểm thử sẽ ngày càng quan trọng.

## [Making User-Sequence Data More Cost-Efficient, Faster, and Easier to Use](https://medium.com/pinterest-engineering/making-user-sequence-data-more-cost-efficient-faster-and-easier-to-use-2a56a928cae1)

Nhóm kỹ sư Pinterest chia sẻ cách họ thiết kế lại nền tảng dữ liệu chuỗi hành vi người dùng (user sequence), tức danh sách có thứ tự các sự kiện gần đây của một người dùng kèm theo các tín hiệu bổ sung như vector nhúng, ngữ cảnh thiết bị hay quốc gia. Loại dữ liệu này là nền móng cho các mô hình học máy xếp hạng, truy xuất và đề xuất trên Home feed, Related Pins hay kết quả tìm kiếm, được dùng cho cả dữ liệu huấn luyện, phân tích ngoại tuyến lẫn suy luận thời gian thực. Nó vừa phải luôn mới, vừa phải đầy đủ, nhất quán giữa huấn luyện và phục vụ, lại có lược đồ ổn định, nên thường là một trong những phần tốn kém và dễ vỡ nhất của hạ tầng dữ liệu.

Nguyên tắc cốt lõi của thiết kế mới là "Một định nghĩa, nhiều môi trường chạy": mỗi loại tín hiệu được định nghĩa một lần, rồi dùng chung cho việc lập chỉ mục thời gian thực, xử lý theo lô để bù dữ liệu lịch sử và phục vụ trực tuyến, nhờ một bộ máy thực thi dùng chung cho cả luồng liên tục lẫn luồng theo lô. Cách làm này tránh được tình trạng dữ liệu huấn luyện và dữ liệu phục vụ dần lệch nhau. Kết hợp với kiến trúc Lambda để cân bằng giữa độ mới và độ đầy đủ, cùng việc lưu trữ theo cột và phân vùng theo thời gian, Pinterest giảm đáng kể chi phí lưu trữ và băng thông mạng, đồng thời việc thêm một loại sự kiện hay tín hiệu mới giờ chủ yếu chỉ cần thay đổi cấu hình.

---

*Bài viết đã được viết lại bởi Claude Code với Opus 5.5 vào ngày 27/09/2026.*
