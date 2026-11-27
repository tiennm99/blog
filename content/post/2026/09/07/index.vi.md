---
title: "Newsletter #129"
date: 2026-09-07
tags: ["AI-Assisted", "Performance", "Distributed Systems", "Web Development", "Go", "Java", "Developer Culture"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #129.*

## [Hacking the Method Name](https://maxxedev.github.io/2026/08/05/hacking-the-method-name.html)

Trong Java, khi cần tên thuộc tính dưới dạng chuỗi để đọc CSV, lấy kết quả truy vấn hay gọi REST API, ta thường viết cứng `"title"` hoặc `"author"` vào mã nguồn — cách này dễ sai chính tả và trình biên dịch không hề kiểm tra. Bài viết giới thiệu kỹ thuật lấy tên phương thức trực tiếp từ method reference, ví dụ `nameOf(Book::title)`, để tên luôn đồng bộ với mã nguồn. Mấu chốt là lớp `SerializedLambda` có từ Java 8: tác giả khai báo functional interface `Getter<T, R>` mở rộng cả `Function` lẫn `Serializable`, nên khi tuần tự hóa một method reference kiểu này, JVM sẽ thay nó bằng một đối tượng `SerializedLambda` chứa thông tin mô tả phương thức. Một `ObjectOutputStream` tùy biến bật `enableReplaceObject(true)`, ghi ra một luồng rỗng và ghi đè `replaceObject()` để chặn lấy đối tượng đó, rồi đọc tên qua `getImplMethodName()`. Từ `nameOf()` có thể dễ dàng viết thêm `beanNameOf()` để bỏ tiền tố `get`.

Hạn chế là kỹ thuật chỉ gọn với getter không tham số. Muốn áp dụng cho phương thức nhiều tham số như `save(title, author)`, bạn phải tự khai báo từng interface có thể tuần tự hóa như `Function2`, `Function3` kèm các bản nạp chồng `nameOf()` tương ứng, rất lặp lại. Vì vậy tác giả giới thiệu thư viện `safety-mirror`, vốn đã làm sẵn phần việc nhàm chán này và còn trả về hẳn đối tượng `java.lang.reflect.Method` thay vì chỉ tên phương thức.

## [Control the ideas, not the code](https://antirez.com/news/169)

antirez, tác giả Redis, cho rằng trong thời đại LLM, lập trình viên nên kiểm soát ý tưởng và thiết kế của phần mềm thay vì đọc từng dòng mã do AI sinh ra — nhưng không phải chỉ ra lệnh "làm sản phẩm cho tôi" rồi phó mặc. Ông đưa ra ba lý do: lượng mã sinh ra mỗi ngày quá lớn để duyệt (ai duyệt nổi 5.000 dòng mỗi ngày?); LLM giỏi viết mã tối ưu cục bộ nhưng yếu hơn ở ý tưởng lớn, nên hỏi mô hình về thiết kế rồi đánh giá nó sẽ nhanh hơn soi từng hàm; và ngày làm việc chỉ có tám tiếng, đọc mã lấy đi thời gian cho việc quan trọng nhất là định hướng phần mềm, nghĩ tính năng, mẹo tối ưu và kiểm thử. Dự án DwarfStar của ông, được viết hoàn toàn tự động, cho thấy bạn vẫn phải hiểu sâu cách mọi thứ vận hành và biết chọn thiết kế tốt nhất.

Với Redis, ông vẫn duyệt mã AI sinh ra vì tôn trọng người sẽ sửa tay, nhưng thừa nhận việc đó gần như vô ích; nếu được tự do, ông sẽ dành thời gian ấy để kiểm thử và nhờ LLM viết tệp `DESIGN.md` mô tả bằng ngôn ngữ tự nhiên ý tưởng và thiết kế của từng cấu trúc dữ liệu. Riêng với lập trình viên trẻ chưa đủ kinh nghiệm xây dựng mô hình tư duy, ông khuyên họ tự học viết chương trình, như cài đặt một trình thông dịch, một cơ sở dữ liệu nhỏ hay một bảng băm.

## [Good Tools Are Invisible](https://www.gingerbill.org/article/2026/07/10/good-tools-are-invisible/)

gingerBill, tác giả ngôn ngữ Odin, lập luận rằng công cụ tốt phải "vô hình": khi đã thành thạo, nó lùi vào hậu cảnh để bạn chỉ nghĩ về công việc. Ông phản đối thói quen biến khuyết điểm của công cụ thành "trò giải đố vui" rồi quảng bá như bằng chứng công cụ ấy tuyệt vời. Ví dụ là vim: có người hào hứng kể việc dựng macro cho một lần sửa văn bản, trong khi ông làm xong trong một phút bằng nhiều con trỏ của Sublime. Gốc rễ của sự bao biện là khi công cụ trở thành bản sắc cá nhân: thừa nhận nó có lỗi giống như thừa nhận điều gì đó về bản thân. Ông cũng phân biệt *cảm thấy* hiệu quả với hiệu quả thật — thước đo trung thực là thời gian thực tế bỏ ra và số lỗi mắc phải, không phải cảm giác thông minh.

Ông mở rộng sang vài tranh luận quen thuộc. GUI khó điều hướng bằng bàn phím là do người làm công cụ chưa chịu cài đặt, không phải giới hạn cố hữu; sai lầm chung là coi hạn chế hiện tại của một loại công cụ là bản chất của nó. Văn hóa cấu hình tới tận cùng góp phần khiến Linux mãi chưa phổ biến trên máy tính để bàn: thiết lập mặc định tốt là trách nhiệm của người làm công cụ và là cách tôn trọng thời gian người dùng. Đường cong học tập dốc là chi phí chứ không phải ưu điểm. Kết luận: dùng công cụ nào cũng được, miễn là nó biến mất khỏi nhận thức.

## [Mysteries of Telegram DC](https://dev.moe/en/3025)

Coxxs điều tra năm trung tâm dữ liệu (DC1–DC5) của Telegram: DC1 và DC3 đặt tại Miami, DC2 và DC4 tại Amsterdam, DC5 tại Singapore. Mỗi tài khoản gắn với một DC ngay lúc đăng ký, không đổi theo số điện thoại hay vị trí và không được tự chọn. Một bot thống kê từng cho thấy DC2 và DC3 không có ai, dẫn tới suy đoán rằng chúng chỉ là DC phụ. Tác giả thử cả ba cách xác định DC phổ biến trên một tài khoản DC2 mới: gọi `auth.sendCode` qua giao thức MTProto và đọc lỗi `PHONE_MIGRATE_2`, đọc trường `dc_id` trong siêu dữ liệu ảnh đại diện, và phân tích tên miền Web CDN. Cách thứ ba cho kết quả sai, vì DC2 và DC3 "mượn" tên miền của DC4 và DC1 cùng địa điểm để phục vụ Web CDN, nên người dùng DC2 đều bị nhận nhầm thành DC4 — chính là lỗi của con bot kia.

Kết luận là DC1, DC2, DC4 và DC5 được phân bổ theo mã quốc gia của số điện thoại lúc đăng ký (chẳng hạn +49 của Đức vào DC2) và đều có rất nhiều người dùng. Ngược lại, DC3 dù vẫn hoạt động nhưng gần như không còn ai: tác giả chỉ tìm được hai tài khoản DC3, và ảnh cũ nằm trên DC3 còn ảnh mới nằm trên DC1 cho thấy chúng đã được chuyển sang DC1 khoảng năm 2020. Kiểm tra hơn 10.000 số điện thoại khắp thế giới bằng phương pháp đăng nhập cũng xác nhận DC3 không nhận người dùng mới. Bài viết kèm bảng tra DC theo mã quốc gia, và tác giả lưu ý nhiều kết luận chỉ là suy đoán vì máy chủ Telegram không mã nguồn mở.

## [How I use HTMX with Go](https://www.alexedwards.net/blog/how-i-use-htmx-with-go)

Alex Edwards chia sẻ cách ông dùng HTMX cùng Go để thêm tương tác mượt như ứng dụng mà viết rất ít JavaScript, trong khi vẫn giữ được sự nhất quán và an toàn của việc kết xuất HTML phía máy chủ bằng `html/template`, thông qua một ứng dụng nhỏ lọc danh sách người dùng theo thời gian thực. Thư mục mẫu được chia thành `base.tmpl` cho bố cục chung, `pages/` cho nội dung từng trang và `partials/` cho các khối HTML dùng lại, tất cả cùng tài nguyên tĩnh được nhúng vào tệp thực thi bằng `//go:embed`. Trọng tâm là kiểu `htmlRenderer`: nó phân tích sẵn tập mẫu chung (base và mọi partial) lúc khởi động, rồi phương thức `render()` nhân bản tập đó, bổ sung mẫu của trang cụ thể và thực thi mẫu được gọi tên. Nhờ vậy, chỉ cần tách các hàng của bảng thành mẫu `users:rows` riêng, cùng một tệp mẫu có thể trả về cả trang HTML hoặc chỉ mảnh HTML để HTMX thay vào.

Server phân biệt yêu cầu từ HTMX qua tiêu đề `HX-Request: true` và luôn đặt `Vary: HX-Request` để bộ đệm trung gian không trả nhầm nội dung. Khi người dùng bấm nút quay lại, cần đặt `historyRestoreAsHxRequest` thành `false`, nếu không trình duyệt sẽ nhận về mảnh HTML thay vì cả trang. Chuyển hướng không dùng được phản hồi `3xx` thông thường vì trình duyệt tự đi theo trước khi HTMX kịp xử lý; thay vào đó hãy trả phản hồi `2xx` kèm tiêu đề `HX-Redirect`, vẫn giữ `3xx` cho yêu cầu không đến từ HTMX. Cuối cùng, thiết lập `responseHandling` cho phép hiển thị lỗi `4xx`/`5xx` ra toàn trang, riêng lỗi `422` vẫn được thay vào đúng vị trí đích.

## [Quadrupling code performance with a "useless" if](https://purplesyringa.moe/blog/quadrupling-code-performance-with-a-useless-if/)

purplesyringa kể lại lúc tối ưu một bộ nén chuỗi chuyên dụng, nơi vòng lặp dò đường mã hóa tối ưu chỉ có một phép gán `j = next_j[i][j]`, biên dịch ra đúng một chỉ thị `mov` và trông như không thể tối ưu thêm. Vấn đề là bộ xử lý hiện đại có song song mức chỉ thị, chạy được nhiều chỉ thị cùng lúc kể cả giữa các vòng lặp, nhưng không thể chạy đồng thời các chỉ thị phụ thuộc nhau. Ở đây mỗi vòng phải chờ giá trị `j` của vòng trước, nên tốc độ bị giới hạn bởi độ trễ truy cập bộ nhớ chứ không phải thông lượng. Vì các khối dữ liệu ít, `next_j[i][j]` thường bằng chính `j`, nên tác giả tận dụng dự đoán nhánh: bọc phép gán trong điều kiện `if (j != next_j[i][j])`. Khi CPU dự đoán nhánh này hiếm khi xảy ra, nó không thấy sự phụ thuộc giữa các vòng và thực thi phỏng đoán trước; khi điều kiện thật sự đúng, cơ chế xử lý dự đoán sai sẽ hủy kết quả sai và chạy lại với `j` đúng.

Khó khăn là với trình biên dịch, câu `if` này hoàn toàn vô dụng và sẽ bị loại bỏ ngay. Tác giả phải ép kiểu qua con trỏ `volatile` để khiến điều kiện và phép gán trông như độc lập; về sau độc giả phát hiện chú thích `[[unlikely]]` hoặc `__builtin_expect` cũng có tác dụng tương tự với LLVM, nhưng `volatile` sinh mã tốt hơn và chạy được cả với GCC. Kết quả trên phép đo tổng hợp là nhanh gấp bốn lần (từ 320 xuống 80 micro giây), còn trong thử nghiệm thực tế khoảng gấp đôi, có lẽ do LLVM sinh mã chưa tối ưu.

## [Reverse Engineering ChatGPT Web: How OpenAI Built for a Billion Users](https://performance.dev/chatgpt)

Dennis Brotzky phân tích từ bên ngoài kiến trúc web của ChatGPT, trang phục vụ khoảng một tỉ người. Điểm nổi bật đầu tiên là sự "bình thường": React 19 với React Router 7, TanStack Query, Tailwind CSS và Radix UI, gần như không có khung tự chế. Ứng dụng ra mắt tháng 11/2022 trên Next.js, chuyển sang Remix năm 2024 rồi theo Remix hợp nhất vào React Router 7. Để phục vụ mọi người trên mọi thiết bị, trang dùng kết xuất phía máy chủ theo luồng với các ranh giới Suspense: tài liệu khi chưa đăng nhập chỉ nặng 84 KB sau nén, thời gian trả byte đầu tiên 50–65 mili giây, và 556 cổng tính năng, 144 cấu hình cùng 192 thử nghiệm được tính sẵn phía máy chủ rồi nhúng vào tài liệu. Họ không dùng phông chữ web mà dựa vào phông hệ thống, tách CSS theo tính năng, và toàn bộ quá trình khởi động gồm 160 phần mã có băm nội dung được sắp xếp quanh một câu hỏi duy nhất: người dùng gõ được vào khung soạn tin chưa — có hẳn cờ `deferStartupImportsUntilComposerTTFI` cho việc này.

Kỹ thuật thật sự được dồn vào phần câu trả lời: khung soạn tin là trình soạn thảo ProseMirror, khối mã là CodeMirror, công thức toán dùng KaTeX kèm cây MathML ẩn cho trình đọc màn hình. Ngay lúc tải trang, thử thách proof-of-work của Cloudflare và hệ thống chống lạm dụng Sentinel đã chạy ngầm, còn khách chưa đăng nhập vẫn được cấp định danh ẩn danh thật để giới hạn tần suất mà không cần rào đăng nhập. Họ đo thời điểm sẵn sàng tương tác cho mọi người dùng: không đo được thì không cải thiện được.

## [Broker-Visible vs Client-Local Parallelism](https://jack-vanlightly.com/blog/2026/6/3/broker-visible-vs-client-local-parallelism)

Trong một nhánh rẽ của loạt bài về Kafka Share Groups, Jack Vanlightly nhắc rằng share group sinh ra để cung cấp ngữ nghĩa hàng đợi trên log, chứ không chủ yếu để song song hóa việc tiêu thụ. Câu hỏi quan trọng hơn là đơn vị song song nằm ở đâu. Nếu đơn vị song song là chính consumer, mỗi đơn vị đều hiện ra với broker dưới dạng tương tác giao thức, trạng thái cần quản lý và một hoặc nhiều kết nối TCP. Nếu song song nằm ngay trong ứng dụng khách, dưới dạng luồng ảo, tác vụ bất đồng bộ hay luồng hệ điều hành, broker không hề thấy chúng, nên cần ít consumer, ít kết nối và ít trạng thái hơn nhiều. Sự phân chia này có ở mọi hệ thống nhắn tin, không riêng Kafka.

Để biết cần bao nhiêu song song, tác giả dùng công thức đơn giản: mức song song tổng cộng bằng tốc độ tin nhắn nhân thời gian xử lý trung bình. Với 60.000 tin nhắn mỗi giây và mỗi tin mất một giây, cần 60.000 tin được xử lý cùng lúc; nếu mỗi đơn vị là một consumer tuần tự thì phải có 60.000 consumer, còn nếu thời gian xử lý là mười giây thì con số lên tới 600.000 consumer với hơn một triệu kết nối TCP. Nếu công việc chủ yếu là I/O và mỗi ứng dụng khách xử lý song song được 1.000 tin, chỉ cần 60 consumer. Quản lý luồng ảo rẻ hơn nhiều so với quản lý kết nối TCP và siêu dữ liệu cho từng đơn vị song song; cái giá là ứng dụng khách phức tạp hơn, nhưng đã có thư viện hỗ trợ.

## [Work Loudly](https://ben.balter.com/2026/07/14/work-loudly/)

Ben Balter chỉ ra rằng ở văn phòng, một phần khả năng hiện diện của bạn đến miễn phí: người khác thấy bạn đứng trước bảng trắng hay gỡ rối cho đồng nghiệp ở khu bếp. Làm từ xa thì tín hiệu đó về không; công việc không kém giá trị đi mà chỉ kém hiển thị đi, đến mức người quản lý dù ủng hộ bạn cũng không nói được bạn đã làm gì lúc đánh giá. Tổng kết sau khi xong cũng không cứu được, vì phần đáng giá — cách lập luận, những ngõ cụt — đã qua mất. Giải pháp là "làm việc thật to": làm cho công việc hiển thị ngay trong lúc làm, như mở issue trước khi bắt tay vào việc, viết mô tả pull request giải thích cách tiếp cận, chia sẻ bản nháp khi mới xong 40%, và hỏi ở kênh chung thay vì tin nhắn riêng; nếu nó chỉ nằm trong đầu bạn hoặc trong tin nhắn riêng thì chưa đủ "to".

Tác giả ví việc này như chiếc chuông đeo khi đi rừng có gấu: rung chuông không phải để khoe mà để không ai bị bất ngờ, vì người liên quan phát hiện quyết định của bạn sau khi nó đã phát hành sẽ phản ứng phòng thủ. Công việc hiển thị sớm còn thu hút người khác phát hiện lỗi hộ, chỉ ra giải pháp đã có sẵn và kéo người giỏi tham gia; với người quản lý, đó là cách đánh giá theo kết quả thay vì theo ai trông có vẻ đang trực tuyến. Phép thử cuối cùng: người quản lý có viết được bản đánh giá cho bạn chỉ từ dấu vết bạn để lại không?

## [Building Service Topology at Scale: Architecture, Challenges, and Lessons Learned](https://netflixtechblog.com/building-service-topology-at-scale-architecture-challenges-and-lessons-learned-f4b792f3f0d8)

Đội kỹ thuật Netflix chia sẻ quá trình xây dựng Service Topology, bản đồ phụ thuộc giữa các dịch vụ theo thời gian gần thực, giúp gỡ lỗi nhanh hơn và xác định phạm vi ảnh hưởng khi có sự cố. Họ chọn xử lý theo luồng thay vì theo lô, vì bản đồ cũ một giờ lúc ba giờ sáng chỉ là "khảo cổ", và dùng cơ chế đối áp của reactive streams để khi tầng sau quá tải, tín hiệu chậm lại truyền ngược lên tận consumer Kafka và dữ liệu chờ trong Kafka thay vì bị mất. Nhật ký luồng mạng chỉ thấy từng chặng rời rạc như App A → bộ cân bằng tải → App B, nên đường ống có ba tầng: tầng một lọc và gom theo cửa sổ năm phút, tầng hai phân phối lại để các chặng qua cùng thành phần trung gian gặp nhau và ghép thành quan hệ App A → App B, tầng ba làm giàu siêu dữ liệu và ghi vào cơ sở dữ liệu đồ thị. Các tầng giao tiếp bằng Server-Sent Events thay cho gRPC vốn tốn CPU, và dùng băm nhất quán để tự cân bằng tải khi số máy thay đổi.

Phần đáng học nhất là khó khăn trên môi trường thật: consumer Kafka tụt lại hàng giờ, nút nóng nhận lưu lượng gấp trăm lần máy khác, và thu gom rác tốn CPU hơn cả logic nghiệp vụ, buộc đội dùng cấu trúc dữ liệu có thể thay đổi trên đường xử lý nóng, trái với thông lệ Scala. Bài học của họ: quy mô thay đổi mọi thứ, sửa xong một nút nghẽn sẽ lộ ra nút nghẽn tiếp theo, và "thông lệ tốt nhất" chỉ là điểm khởi đầu.

### Bonus

**Images:**
![MCP vs A2A vs ACP: How AI Agents Actually Talk to Each Other](https://substackcdn.com/image/fetch/$s_!lpxK!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff9fb99a2-ec71-476d-a9cb-6c1a43339d90_2484x3002.png)
![LLM vs RAG vs Agent evals](https://substackcdn.com/image/fetch/$s_!LZtJ!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F6456348c-5d92-4524-8dd6-d75b4dc7feaf_1280x1547.png)
![How Distributed Tracing Works at the High Level?](https://substackcdn.com/image/fetch/$s_!ULeT!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fe81b4572-820e-4790-8861-8efe14f38700_2252x2752.png)
![The Life of a Redis Query](https://substackcdn.com/image/fetch/$s_!6UyI!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F9f8ea7bf-2170-4466-92f3-edd7eab11de4_3000x3900.png)

---

*Bài viết đã được viết lại bởi Claude Code với Opus 5.5 vào ngày 27/09/2026.*
