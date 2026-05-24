---
title: "Newsletter #104"
date: 2026-05-24
tags: ["AI-Assisted", "Newsletter", "AI Agents", "Software Design", "Go", "GitHub", "Engineering Productivity"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #104.*

## [Designing the AI-native engineering organization](https://newsletter.getdx.com/p/designing-the-ai-native-engineering)

Các lãnh đạo từ Microsoft, 1Password và Atlassian chia sẻ cách AI đang định hình lại chu trình phát triển phần mềm (SDLC). Trước đây, 80% công sức kỹ thuật dành cho vận hành, nhưng tỷ lệ này đang đảo ngược. Khi giai đoạn tạo mã nguồn và vận hành được rút ngắn nhờ AI hỗ trợ, các đội ngũ giờ dành nhiều thời gian hơn cho lập kế hoạch và kiểm chứng — những công việc đòi hỏi phán đoán và chuyên môn của con người.

Điều thú vị là không công ty nào trong số này tái cấu trúc sơ đồ tổ chức. Thay vào đó, họ thay đổi cách công việc diễn ra bên trong: 1Password rút ngắn chu kỳ lập kế hoạch từ 18 tháng xuống 90 ngày, Atlassian lập các đội nhỏ 3-4 kỹ sư cho dự án khởi tạo từ con số không, còn Microsoft áp dụng các v-team tập trung vào nhiệm vụ trong tám tuần để học hỏi nhanh. Cả ba công ty đều không bắt buộc sử dụng AI mà theo dõi mức độ áp dụng một cách tự nhiên, đầu tư vào việc đào tạo và khuếch đại các câu chuyện thành công.

**Điểm chính:**
- Đừng vội giao việc kiểm chứng (validate) cho AI; vẫn cần con người giám sát các quyết định liên quan đến bảo mật
- Chi phí token cần được theo dõi tinh vi như chi phí hạ tầng đám mây — 1Password đã xây dựng công cụ nội bộ ánh xạ chi tiêu theo dự án
- Hồ sơ kỹ sư tương lai nghiêng về tư duy "maker", tính tổng quát kết hợp trực giác sản phẩm, và khả năng tự ra quyết định mà không cần chờ phê duyệt
- Người không phải kỹ sư (thiết kế, đội ngũ trải nghiệm khách hàng) giờ cũng có thể đóng góp mã nguồn, nhưng cần kiểm thử và kiểm tra triển khai vững chắc để tránh suy giảm chất lượng
- Các "champion" và guild nội bộ hiệu quả hơn các chỉ thị từ trên xuống trong việc thúc đẩy áp dụng AI

## [10 Lessons for Agentic Coding](https://www.dbreunig.com/2026/05/04/10-lessons-for-agentic-coding.html)

Tác giả đúc kết 10 bài học thực tiễn cho lập trình viên khi làm việc với các AI agent như Claude Code, Codex và Pi. Luận điểm trung tâm là khi mã nguồn do AI tạo ra ngày càng rẻ, lập trình viên cần thay đổi căn bản cách tiếp cận phát triển phần mềm — chú trọng học hỏi, kiểm thử, ghi lại ý định, và tập trung chiến lược vào những vấn đề thực sự khó.

Điểm cốt lõi là kinh tế học của phát triển phần mềm đã dịch chuyển: khi việc tạo mã trở nên rẻ, lập trình viên nên dành năng lượng cho tư duy chiến lược, đảm bảo chất lượng, và các thách thức kiến trúc phức tạp — nơi giá trị sản phẩm thực sự được quyết định. Đồng thời cần nhớ rằng việc bảo trì, hỗ trợ và bảo mật vẫn tốn kém như trước, dù chi phí sinh mã đã giảm.

**Điểm chính:**
- Triển khai để học: viết mã giúp phát hiện những quyết định chưa nhìn thấy trước và tinh chỉnh đặc tả
- Đầu tư vào kiểm thử end-to-end đo lường hành vi thay vì chi tiết triển khai, để có tự do tái cấu trúc
- Ghi lại ý định cùng mã nguồn và kiểm thử để giữ vững định hướng trong suốt quá trình phát triển
- Tìm việc khó và tự động hóa việc dễ — giá trị thực nằm ở các thách thức không tầm thường
- AI agent khuếch đại kinh nghiệm: chuyên môn kỹ thuật trực tiếp nâng cao hiệu quả prompt qua thuật ngữ, khung tư duy và độ cụ thể

## [Just Fucking Use Go](https://blainsmith.com/articles/just-fucking-use-go/)

Tác giả lập luận rằng sự đơn giản của Go là có chủ đích và đáng giá. Thay vì cung cấp các tính năng cao cấp, Go chỉ có "struct, function, interface, goroutine và channel" — đủ để các lập trình viên junior có thể đọc hiểu mã nguồn của người đi trước. Chỉ có một cách định dạng mã và `gofmt` đã làm điều đó, giúp loại bỏ các tranh luận về phong cách và giữ tính nhất quán cho mã nguồn.

Bài viết nhấn mạnh lợi thế thực tế của Go trong vận hành: biên dịch tạo ra một binary tĩnh duy nhất, không cần runtime, không cần Docker phức tạp hay hạ tầng triển khai cồng kềnh. Điều này trái ngược hẳn với Node, Rails hay Django vốn cần nhiều lớp cấu hình. Tác giả phê phán việc kỹ thuật hóa quá mức như kiến trúc microservices, quản lý phụ thuộc rườm rà, và chạy theo framework — và đề xuất quay về các ứng dụng monolithic tập trung, thực sự giải quyết được vấn đề một cách hiệu quả.

**Điểm chính:**
- Thư viện chuẩn của Go đủ dùng cho hầu hết nhu cầu: HTTP server, kết nối cơ sở dữ liệu, encode JSON, kiểm thử
- Một ứng dụng web hoàn chỉnh với cơ sở dữ liệu và templating có thể triển khai mà không cần thư viện ngoài
- Goroutine cho phép lập trình đồng thời nhẹ nhàng mà cách tiếp cận thread truyền thống không thể sánh bằng
- Binary tĩnh duy nhất giúp việc triển khai sản xuất trở nên đơn giản, không phụ thuộc runtime
- Sự đơn giản có chủ đích giúp người mới đọc được mã nguồn của người có kinh nghiệm

## [Symptoms of Bad Software Design](https://newsletter.optimistengineer.com/p/symptoms-of-bad-software-design)

Tác giả Marcos F. Lobo nhận diện bốn "mùi" quan trọng cho thấy một hệ thống phần mềm được thiết kế kém. **Rigidity** (cứng nhắc) xảy ra khi một thay đổi nhỏ ở một module kéo theo hàng loạt thay đổi ở các module phụ thuộc — giải pháp là áp dụng Strategy Pattern để tách logic khỏi quá trình thực thi. **Fragility** (dễ vỡ) là khi hệ thống đột ngột hỏng ở nơi không liên quan đến chỗ ta vừa sửa; vấn đề nằm ở các phụ thuộc ẩn, và cách chữa là đóng gói (encapsulation) cùng phân tách interface để mỗi module chỉ truy cập thông tin cần thiết.

Hai triệu chứng còn lại là **Immobility** (không di chuyển được) — khi không thể tách và tái sử dụng thành phần qua các dự án vì logic nghiệp vụ dính chặt với framework, cần kiến trúc phân lớp để cô lập logic thuần khỏi UI và cơ sở dữ liệu — và **Viscosity** (nhớt) — khi việc làm đúng khó hơn việc làm tắt, cần tự động hóa và cải thiện hạ tầng để con đường đúng trở nên dễ đi nhất.

**Điểm chính:**
- Rigidity: một thay đổi tạo ra phản ứng dây chuyền — dùng Strategy Pattern để giảm phụ thuộc
- Fragility: hỏng bất ngờ vì phụ thuộc ẩn — đóng gói và phân tách interface để hạn chế bề mặt rủi ro
- Immobility: không thể tái sử dụng vì dính framework — dùng kiến trúc phân lớp
- Viscosity: việc đúng khó hơn việc tắt — tự động hóa để con đường đúng trở thành dễ nhất
- Nhận diện được các tín hiệu này giúp tái cấu trúc theo hướng bền vững thay vì chấp nhận nợ kỹ thuật

## [Claude Code is Not Making Your Product Better](https://ethanding.substack.com/p/claude-code-is-not-making-your-product)

Bài viết phản biện luận điểm rằng các AI coding agent đang cải thiện căn bản chất lượng sản phẩm, dù số lượng mã được sinh ra rõ ràng đã tăng. Tác giả chỉ ra "đường cong hình chữ K" về năng suất: kỹ sư senior thu lợi rõ rệt từ coding agent, còn kỹ sư junior thì gần như đứng yên hoặc giảm. Nếu Claude Code thực sự mang lại lợi thế cạnh tranh, Anthropic đã phải bỏ xa các đối thủ như Codex; nhưng thị trường vẫn cạnh tranh sít sao, cho thấy có một nút thắt khác đang chi phối chất lượng sản phẩm.

Tác giả nhấn mạnh các văn hóa kỹ thuật xuất sắc coi số dòng mã là chi phí chứ không phải thành tích — "mỗi dòng mã là một bề mặt cho lỗi" — và dẫn ví dụ Linear ăn mừng việc xóa mã thay vì viết thêm. Nút thắt thực sự của các đột phá sản phẩm là tầm nhìn sáng tạo và sự kiềm chế thẩm mỹ, không phải tốc độ sinh token. Các công ty tiên phong bị giới hạn bởi tư duy có tầm nhìn, còn startup giai đoạn đầu hưởng lợi từ việc tạo nguyên mẫu nhanh, trong khi các thị trường cạnh tranh sẽ chứng kiến phần mềm cơ bản trở thành hàng hóa phổ thông.

**Điểm chính:**
- Đường cong hình chữ K: senior tăng năng suất, junior gần như đứng yên hoặc giảm
- Số dòng mã là nợ chứ không phải tài sản — mỗi dòng là một bề mặt cho lỗi
- Đột phá sản phẩm đến từ phán đoán thẩm mỹ và kiềm chế, không phải tốc độ sinh mã
- Công ty tiên phong bị giới hạn bởi tầm nhìn, không phải tốc độ lập trình
- Phần mềm cơ bản sẽ bị thương phẩm hóa khi rào cản sản xuất giảm xuống

## [The Pulse: AI load breaks GitHub – why not other vendors?](https://blog.pragmaticengineer.com/the-pulse-ai-load-breaks-github/)

Bài phân tích từ Pragmatic Engineer mổ xẻ chuỗi sự cố nghiêm trọng của GitHub do tải từ AI agent vượt quá khả năng đáp ứng. Ngày 23/04, một lỗi đã làm 2.092 pull request mất commit khi dùng squash merge cùng merge group — vi phạm cam kết cốt lõi về tính toàn vẹn dữ liệu. Trong những ngày tiếp theo, GitHub liên tiếp gặp các sự cố lan tỏa: cluster Elasticsearch ngừng hoạt động 6 giờ, pull request và issue biến mất, GitHub Actions hỏng, và một lỗ hổng RCE nghiêm trọng. Theo giám sát của bên thứ ba, độ tin cậy chỉ đạt 86% uptime — gần như "không số 9".

CTO của GitHub thừa nhận tải từ AI agent đã vượt dự đoán: chỉ trong hai năm, tải tăng 3,5 lần và còn tăng tốc dữ dội. GitHub mới bắt đầu lập kế hoạch mở rộng 10x vào tháng 10/2025 — quá muộn — và đến tháng 2/2026 nhận ra cần tới 30x. Trong khi đó GitHub đồng thời di chuyển từ trung tâm dữ liệu của mình sang Azure, làm rủi ro hạ tầng càng cao. Câu hỏi lớn là tại sao GitLab, Bitbucket, Vercel hay Linear vẫn ổn — câu trả lời nằm ở 18 năm nợ kỹ thuật, hệ thống có trạng thái khó mở rộng theo chiều ngang, và chi phí phối hợp giữa 4.000 nhân viên.

**Điểm chính:**
- 2.092 pull request bị mất commit do lỗi với squash merge và merge group — vi phạm cam kết toàn vẹn dữ liệu cốt lõi
- Tải từ AI agent tăng 3,5x trong hai năm; GitHub lên kế hoạch mở rộng quá trễ và phải điều chỉnh từ 10x lên 30x
- Việc di chuyển từ trung tâm dữ liệu sang Azure diễn ra cùng lúc với cú nổ tải, làm rủi ro tăng vọt
- Nợ kỹ thuật 18 năm và hệ thống có trạng thái khiến GitHub khó mở rộng theo chiều ngang
- Mitchell Hashimoto rời GitHub sau 18 năm vì "không thể code với GitHub được nữa" do các sự cố liên miên

## [You Need AI That Reduces Maintenance Costs](https://www.jamesshore.com/v2/blog/2026/you-need-ai-that-reduces-your-maintenance-costs)

James Shore lập luận rằng mỗi dòng mã đều tạo ra nghĩa vụ bảo trì vĩnh viễn. Dựa trên các ước lượng từ cộng đồng, ông mô hình hóa rằng lập trình viên dành khoảng 10 ngày bảo trì mã trong năm đầu, rồi 5 ngày mỗi năm sau đó. Gánh nặng bảo trì này dần dần ăn mòn ngày càng nhiều thời gian phát triển.

Đây chính là "cái bẫy năng suất AI": nếu coding agent nhân đôi sản lượng mã trong khi chi phí bảo trì giữ nguyên, lợi thế ngắn hạn sẽ biến mất chỉ sau vài tháng — "khoảng năm tháng sau khi bắt đầu dùng AI, năng suất của bạn quay lại điểm xuất phát". Và một khi đã viết ra, mã do agent tạo ra vẫn tốn chi phí hỗ trợ — kể cả khi đội ngũ ngừng dùng AI — tạo ra một dạng "lao dịch vĩnh viễn". Kết luận: để hưởng lợi bền vững từ AI, chi phí bảo trì phải giảm tỷ lệ nghịch với sản lượng. Nhân đôi sản lượng đòi hỏi giảm một nửa chi phí bảo trì.

**Điểm chính:**
- Mỗi dòng mã tạo ra nghĩa vụ bảo trì lâu dài — khoảng 10 ngày năm đầu, 5 ngày mỗi năm sau đó
- Nhân đôi sản lượng mà không giảm chi phí bảo trì sẽ khiến năng suất quay về điểm cũ sau khoảng 5 tháng
- Mã do AI tạo ra không thể "xả" được — nghĩa vụ bảo trì còn lại ngay cả khi bỏ dùng AI
- Để bền vững, chi phí bảo trì phải giảm tỷ lệ nghịch với mức tăng sản lượng
- Nếu không cân bằng được, tổ chức sẽ rơi vào bẫy năng suất và nợ kỹ thuật ngày càng phình to

## [Cognitive Surrender](https://addyosmani.com/blog/cognitive-surrender/)

Addy Osmani phân biệt giữa hai khái niệm dễ bị nhầm: "cognitive offloading" — uỷ thác cho AI nhưng vẫn giữ phán đoán độc lập — và "cognitive surrender" — chấp nhận đầu ra của AI mà không tự hình thành quan điểm. Nghiên cứu của Shaw và Nave cho thấy khi có AI hỗ trợ, người ta từ bỏ việc đánh giá phản biện: "73% trường hợp tham gia chấp nhận câu trả lời sai", và sự tự tin của họ thậm chí còn tăng lên dù câu trả lời đã được cố tình làm sai.

Kỹ sư phần mềm đặc biệt dễ rơi vào cái bẫy này: mã do AI sinh ra "biên dịch được" và "qua linter", tạo cảm giác đúng đắn ở bề mặt; các chỉ số năng suất thưởng cho việc ship mã bất kể có hiểu hay không; và mô hình nói với một uy quyền mà nó chưa thực sự xứng đáng có. Một khi đã đầu hàng lần đầu, những lần sau dễ hơn nhiều. Để chống lại, hãy hình thành kỳ vọng trước khi xem kết quả, đọc mã do AI tạo như xem mã của junior, yêu cầu mô hình tự phản biện kết luận của nó, và để ý các kiểu chấp nhận do mệt mỏi.

**Điểm chính:**
- 73% người chấp nhận câu trả lời sai khi có AI; sự tự tin tăng dù đáp án sai
- Mã "biên dịch được" và "qua linter" tạo cảm giác đúng đắn ở bề mặt — không thay thế được việc hiểu
- Các điểm dễ đầu hàng: duyệt PR lớn, chấp nhận bug fix, quyết định kiến trúc, học công cụ mới qua sinh mã
- Hình thành kỳ vọng trước khi xem kết quả; yêu cầu mô hình tự phản biện kết luận của nó
- "Nếu mã ship ra mà hiểu biết co lại — bạn đang tích nợ nhận thức. Nếu hiểu biết lớn lên cùng việc ship — bạn thực sự đang tăng tốc"

### Bonus

**Images:**
![Claude Code vs. OpenClaw: 5 Design Dimensions](https://substackcdn.com/image/fetch/$s_!oEvb!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F49df56c9-1f92-4f88-bd16-8cd59dab407c_2484x3002.jpeg)
![Why Does Git Revert Cause Conflicts?](https://substackcdn.com/image/fetch/$s_!6UGD!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F265133fd-d0f8-48c0-b170-73f6e6a49fec_1280x1605.jpeg)
