---
title: "Newsletter #104"
date: 2026-05-24
tags: ["AI-Assisted", "Newsletter", "AI Agents", "Software Design", "Go", "GitHub", "Engineering Productivity"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #104.*

## [Designing the AI-native engineering organization](https://newsletter.getdx.com/p/designing-the-ai-native-engineering)

Trong một phiên thảo luận tại hội nghị DX Annual, lãnh đạo kỹ thuật của Microsoft, 1Password và Atlassian chia sẻ cách AI đang định hình lại chu trình phát triển phần mềm (SDLC). Trước đây khoảng 80% thời gian kỹ thuật dành cho vận hành, nhưng ở những đội hiệu quả nhất tỷ lệ này đang đảo ngược: khi AI rút ngắn khâu tạo mã và vận hành, lập kế hoạch và kiểm chứng chiếm phần lớn thời gian, vì đây là nơi phán đoán của con người quan trọng nhất. Các diễn giả khuyên chưa nên giao việc kiểm chứng hay bảo mật cho AI.

Đáng chú ý là không công ty nào vẽ lại sơ đồ tổ chức; thứ thay đổi là cách làm việc bên trong. Atlassian lập các nhóm 3-4 người cho dự án từ con số không, Microsoft dùng các v-team nhỏ chạy theo chu kỳ tám tuần để học nhanh, còn 1Password rút chân trời lập kế hoạch từ 12-18 tháng xuống còn một quý. Cả ba đều không bắt buộc dùng AI mà đầu tư vào đào tạo, nhân rộng các "champion" nội bộ và kể lại những câu chuyện thành công cụ thể. Chi phí token được quản lý chặt chẽ như chi phí hạ tầng đám mây; 1Password xây dựng công cụ nội bộ ánh xạ chi tiêu theo repo và dự án. Hình mẫu kỹ sư trong tương lai là người có tư duy "maker", hiểu biết rộng kèm trực giác sản phẩm và dám tự ra quyết định. Người ngoài ngành kỹ thuật như designer hay đội trải nghiệm khách hàng giờ cũng gửi pull request, nhưng chỉ an toàn khi đội ngũ đã có bộ kiểm thử và quy trình kiểm tra triển khai vững chắc.

## [10 Lessons for Agentic Coding](https://www.dbreunig.com/2026/05/04/10-lessons-for-agentic-coding.html)

Drew Breunig tổng hợp mười bài học cho lập trình viên khi làm việc với các AI agent như Claude Code, Codex hay Pi, với câu hỏi trung tâm: nên làm gì khi mã nguồn trở nên rẻ? Theo tác giả, việc viết mã giúp lộ ra những quyết định mà đặc tả chưa lường trước, nên hãy triển khai để học và dám làm lại nhiều lần để thử các ý tưởng táo bạo. Đi kèm là kiểm thử end-to-end đo lường hành vi của sản phẩm thay vì chi tiết triển khai, nhờ đó ta tự do viết lại mã. Kiểm thử và mã nguồn đều không ghi lại lý do, nên cần lưu ý định cùng mã nguồn và cập nhật đặc tả song song với quá trình phát triển thay vì đóng băng nó từ đầu.

Khi phần việc dễ đã được AI xử lý nhanh, giá trị thực nằm ở phần khó: thiết kế trực quan, hiệu năng, bảo mật, khả năng chống chịu lỗi và kiến trúc hệ thống. Tác giả khuyên tự động hóa mọi việc dễ để có thêm thời gian cho việc khó, đồng thời rèn luyện "gu" của bản thân, vì khi mã được sinh ra nhanh hơn tốc độ nhận phản hồi, hiểu biết về lĩnh vực và người dùng chính là nguồn phản hồi duy nhất theo kịp. AI agent cũng khuếch đại kinh nghiệm: người nắm vững công nghệ biết dùng đúng thuật ngữ, đúng cách đặt vấn đề và mức độ cụ thể phù hợp, nhờ đó tiết kiệm rất nhiều vòng lặp. Bài học cuối cùng là một lời nhắc: mã nguồn thì rẻ, nhưng bảo trì, hỗ trợ và bảo mật thì không.

## [Just Fucking Use Go](https://blainsmith.com/articles/just-fucking-use-go/)

Blain Smith, bằng giọng văn cố tình gay gắt, cho rằng Go đã chờ sẵn hơn một thập kỷ để lập trình viên ngừng làm phức tạp hóa backend. Sự nhàm chán của Go là có chủ đích: không decorator, không macro, không metaclass, chỉ có struct, function, interface, goroutine và channel. Nhờ vậy lập trình viên junior vừa vào có thể đọc được mã do người đi trước viết từ hai năm trước, và chỉ có một cách định dạng mã do `gofmt` đảm nhận, không còn tranh cãi về phong cách. Thư viện chuẩn chính là framework: `net/http`, `database/sql`, `encoding/json`, `html/template` kết hợp `embed` đủ để dựng một ứng dụng web hoàn chỉnh có cơ sở dữ liệu mà không cần thư viện ngoài; `io.Reader`/`io.Writer` và `context.Context` giúp mọi thành phần khớp với nhau và hủy yêu cầu xuyên suốt. Goroutine chỉ tốn khoảng 2KB khi khởi tạo, còn channel lo phần đồng bộ.

Lợi thế lớn nhất nằm ở vận hành: `go build` tạo ra một binary tĩnh duy nhất, chỉ cần sao chép lên máy chủ và khởi động lại bằng systemd, không cần Dockerfile, Kubernetes hay service mesh. Quản lý phụ thuộc gói gọn trong `go.mod` và `go.sum`, còn công cụ kiểm thử, phát hiện race condition, benchmark và profiling đều có sẵn cùng trình biên dịch. Tác giả chê Rails, Django, Express và Next.js vì nghi thức triển khai rườm rà và quy ước thay đổi liên tục, đồng thời khuyên viết một ứng dụng monolith gồm một binary Go và một PostgreSQL thay vì chạy theo microservices. Kể cả cách xử lý lỗi `if err != nil` cũng được xem là tính năng, vì nó buộc ta quyết định cách xử lý ở mọi nơi có thể xảy ra lỗi.

## [Symptoms of Bad Software Design](https://newsletter.optimistengineer.com/p/symptoms-of-bad-software-design)

Marcos F. Lobo chỉ ra bốn tín hiệu của thiết kế phần mềm kém, kèm cách khắc phục. **Rigidity** (cứng nhắc) là khi một thay đổi nhỏ ở một module kéo theo hàng loạt thay đổi ở các module phụ thuộc, khiến việc ước tính hai ngày kéo dài thành hai tuần; nguyên nhân thường là coupling quá chặt. Ví dụ một lớp xử lý đơn hàng chứa câu lệnh switch khổng lồ tính phí vận chuyển cho từng hãng — dùng Strategy Pattern (nguyên lý Open/Closed) để mỗi hãng có lớp riêng, thêm hãng mới không phải sửa mã cũ. **Fragility** (dễ vỡ) là khi sửa ở một nơi lại hỏng ở nơi không liên quan, chẳng hạn đổi định dạng ngày trong một Singleton cấu hình toàn cục làm module tính lương ngừng chạy; cách chữa là đóng gói và phân tách interface để mỗi module chỉ thấy phần cấu hình nó cần.

**Immobility** (khó tái sử dụng) xuất hiện khi logic nghiệp vụ dính chặt với giao diện, cơ sở dữ liệu và framework, đến mức tách ra còn tốn công hơn viết lại. Giải pháp là kiến trúc phân lớp (Clean Architecture): tách thuật toán thành một thành phần thuần, nhận cơ sở dữ liệu qua interface theo nguyên lý Dependency Inversion. **Viscosity** (nhớt) là khi làm đúng khó hơn làm tắt, do chính thiết kế phần mềm hoặc do môi trường phát triển chậm chạp, khiến lập trình viên chọn các bản vá tạm bợ. Cách khắc phục là tự động hóa và cải thiện hạ tầng, dùng công cụ giảm mã lặp lại, để con đường đúng cũng nhanh gần bằng con đường sai. Nhận diện được bốn tín hiệu này là bước đầu tiên để tái cấu trúc dần dần.

## [Claude Code is Not Making Your Product Better](https://ethanding.substack.com/p/claude-code-is-not-making-your-product)

Ethan Ding phản biện ý kiến cho rằng AI coding agent đang làm sản phẩm tốt hơn, dù lượng mã sinh ra đã tăng. Dữ liệu cho thấy năng suất tách theo hình chữ K: kỹ sư senior có sản lượng tăng rõ rệt từ năm 2023, còn kỹ sư junior gần như đứng yên hoặc đi xuống. Những người như dax (opencode), Karri Saarinen (Linear) và David Cramer (Sentry) đều khó thấy tốc độ cải thiện sản phẩm tăng lên nhờ agent. Tác giả lập luận: nếu Claude Code thực sự tạo lợi thế cộng dồn, Anthropic đã phải bỏ xa đối thủ sau nhiều tháng độc quyền, nhưng Codex ra đời muộn hơn vẫn cạnh tranh ngang ngửa — nghĩa là nút thắt của chất lượng sản phẩm chưa bao giờ là việc viết mã.

Các văn hóa kỹ thuật tốt nhất coi dòng mã là chi phí chứ không phải thành phẩm, vì mỗi dòng là một bề mặt cho lỗi và độ phức tạp tăng theo cấp số nhân; tinychat thậm chí đặt cảnh báo khi codebase vượt quá một kích thước nhất định và ăn mừng việc xóa mã. Linear đạt chất lượng cao hơn Jira với khối lượng kỹ thuật nhỏ hơn rất nhiều, bởi sự khác biệt đến từ tầm nhìn sáng tạo và sự kiềm chế, tức quyết định xây ít hơn, chứ không phải từ tốc độ sinh token. Theo tác giả, coding agent giúp sản phẩm từ con số không đạt mức chất lượng khá nhanh hơn và sẽ khiến phần mềm phổ thông rẻ đi nhiều, nhưng không giúp các đội ở tuyến đầu làm ra sản phẩm xuất sắc hơn — đổi lại là nợ kỹ thuật chồng chất mà ai đó sẽ phải dọn dẹp.

## [The Pulse: AI load breaks GitHub – why not other vendors?](https://blog.pragmaticengineer.com/the-pulse-ai-load-breaks-github/)

Gergely Orosz phân tích chuỗi sự cố nghiêm trọng của GitHub gần đây. Ngày 23/04, một lỗi khiến các pull request được gộp qua merge queue theo kiểu squash merge tạo ra commit sai khi merge group chứa nhiều hơn một PR, làm "mất" commit ở 2.092 pull request — phá vỡ cam kết quan trọng nhất về toàn vẹn dữ liệu, và khách hàng phải tự khôi phục thủ công. Sau đó là hàng loạt sự cố khác: cluster Elasticsearch quá tải khiến pull request và issue biến mất khỏi giao diện suốt 6 giờ, GitHub Actions gặp lỗi, và Wiz công bố một lỗ hổng RCE nghiêm trọng. Theo bên thứ ba, uptime chỉ khoảng 86%, tức "không số 9". Mitchell Hashimoto, người tạo ra Ghostty, tuyên bố rời GitHub sau 18 năm vì các sự cố gần như ngày nào cũng chặn công việc của ông.

CTO của GitHub đổ lỗi cho tải từ AI agent vượt dự đoán: tải tăng khoảng 3,5 lần trong hai năm, phần lớn dồn vào những tháng gần đây. GitHub chỉ bắt đầu kế hoạch mở rộng năng lực lên 10x vào tháng 10/2025, muộn hơn Google nhiều tháng, và đến tháng 2/2026 phải điều chỉnh mục tiêu lên 30x. Cùng lúc đó, công ty đang chuyển từ trung tâm dữ liệu riêng sang Azure, khiến mọi lỗi dễ lộ ra thành sự cố hơn. Vậy vì sao Vercel, Linear, GitLab hay Bitbucket vẫn trụ vững trước làn sóng tải tương tự. Tác giả cho rằng phần lớn là do GitHub tự gây ra: hệ thống lưu nhiều trạng thái nên khó mở rộng theo chiều ngang, 18 năm nợ kỹ thuật, khoảng 4.000 nhân viên cần phối hợp, và không thể phá vỡ quy trình của khách hàng.

## [You Need AI That Reduces Maintenance Costs](https://www.jamesshore.com/v2/blog/2026/you-need-ai-that-reduces-your-maintenance-costs)

James Shore đi thẳng vào vấn đề: coding agent phải giúp giảm chi phí bảo trì, và giảm tương xứng với mức tăng tốc độ viết mã. Mỗi dòng mã đều kéo theo công việc bảo trì kéo dài mãi mãi, như sửa lỗi, dọn dẹp và nâng cấp phụ thuộc. Dựa trên ước lượng kiểu "trí tuệ đám đông", ông giả định rằng mỗi tháng viết mã sẽ tốn khoảng 10 ngày bảo trì trong năm đầu và 5 ngày cho mỗi năm tiếp theo. Mô hình hóa bằng bảng tính cho thấy sau khoảng hai năm rưỡi, đội ngũ đã dành hơn một nửa thời gian cho bảo trì, và sau mười năm gần như không làm được gì khác. Điều này khớp với những gì ông thấy ở các startup giai đoạn muộn khi làm tư vấn.

Áp dụng vào AI: nếu agent nhân đôi sản lượng mã nhưng mã khó bảo trì gấp đôi, lợi ích bị xóa sạch chỉ sau khoảng năm tháng và năng suất về lâu dài còn thấp hơn khi không dùng AI. Ngay cả khi mã do AI sinh ra dễ bảo trì như mã người viết, lợi ích cũng chỉ kéo dài khoảng 19 tháng. Tệ hơn, nếu sau này ngừng dùng agent vì chi phí đắt đỏ, phần lợi ích mất đi còn chi phí bảo trì của lượng mã đã sinh ra thì vẫn ở lại — một kiểu "lao dịch vĩnh viễn". Kết luận của tác giả: chi phí bảo trì phải giảm theo tỷ lệ nghịch với sản lượng, nhân đôi sản lượng thì phải giảm một nửa chi phí bảo trì. Vì vậy hãy dành công sức cải thiện chi phí bảo trì ngang với công sức theo đuổi tốc độ viết mã.

## [Cognitive Surrender](https://addyosmani.com/blog/cognitive-surrender/)

Addy Osmani giới thiệu khái niệm "cognitive surrender" từ nghiên cứu của Steven Shaw và Gideon Nave (Wharton). Cần phân biệt nó với "cognitive offloading": offloading là giao cho AI phần "làm thế nào" nhưng vẫn tự phán đoán kết quả, còn surrender là khi ta ngừng tự xây dựng câu trả lời, đầu ra của AI trở thành đầu ra của mình. Qua ba thí nghiệm với 1.372 người, khi AI trả lời sai, người tham gia chấp nhận câu trả lời sai trong 73% trường hợp, và sự tự tin của họ còn tăng lên dù một nửa đáp án bị cố tình làm sai. Với lập trình viên, điều này xảy ra khi duyệt PR 600 dòng chỉ vì kiểm thử đã xanh, để agent sửa lỗi mà không hiểu lỗi gốc, hay để agent quyết định thiết kế.

Kỹ sư phần mềm đặc biệt dễ tổn thương vì mã sinh ra biên dịch được và qua linter nên trông đúng ở bề mặt, các chỉ số năng suất chỉ đếm PR đã gộp, và mô hình luôn nói bằng giọng khẳng định. Mỗi lần đầu hàng là một khoản vay nhỏ, cộng dồn thành "comprehension debt" — khoảng cách giữa lượng mã tồn tại và lượng mã con người thực sự hiểu. Để chống lại, tác giả đề xuất tự hình thành kỳ vọng trước khi xem kết quả, đọc diff như thể do một junior viết, yêu cầu mô hình tự phản biện, để ý khi mệt mỏi, giữ PR nhỏ và coi bằng chứng kiểm chứng là điều kiện bắt buộc để kết thúc tác vụ. Nếu mã vẫn được ship mà hiểu biết về hệ thống co lại, bạn đang tích nợ nhận thức.

### Bonus

**Images:**
![Claude Code vs. OpenClaw: 5 Design Dimensions](https://substackcdn.com/image/fetch/$s_!oEvb!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F49df56c9-1f92-4f88-bd16-8cd59dab407c_2484x3002.jpeg)
![Why Does Git Revert Cause Conflicts?](https://substackcdn.com/image/fetch/$s_!6UGD!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F265133fd-d0f8-48c0-b170-73f6e6a49fec_1280x1605.jpeg)

---

*Bài viết đã được viết lại bởi Claude Code với Opus 5.5 vào ngày 27/09/2026.*
