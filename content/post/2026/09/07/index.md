---
title: "Newsletter #129"
date: 2026-09-07
tags: ["AI-Assisted", "Performance", "Distributed Systems", "Web Development", "Go", "Java", "Developer Culture"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #129.*

## [Hacking the Method Name](https://maxxedev.github.io/2026/08/05/hacking-the-method-name.html)

Trong Java, chúng ta thường cần lấy tên của một thuộc tính dưới dạng chuỗi để dùng cho việc phân tích CSV, tạo câu truy vấn cơ sở dữ liệu hay gọi REST API. Cách làm phổ biến là viết thẳng chuỗi `"firstName"` vào mã nguồn, nhưng cách này rất dễ sai và không được trình biên dịch kiểm tra. Bài viết giới thiệu một kỹ thuật thú vị: lấy tên phương thức trực tiếp từ method reference như `Person::getFirstName`, nhờ đó tên thuộc tính luôn đồng bộ với mã nguồn và được kiểm tra ngay khi biên dịch.

Ý tưởng dựa trên lớp `SerializedLambda` có từ Java 8. Tác giả định nghĩa một functional interface `Getter<T, R>` mở rộng `Function` và có thêm `Serializable`. Khi một method reference dạng này được tuần tự hóa, JVM sẽ sinh ra một đối tượng `SerializedLambda` chứa toàn bộ thông tin mô tả phương thức. Bằng cách mở rộng `ObjectOutputStream` và ghi đè phương thức `replaceObject()`, ta chặn được đối tượng đó và đọc tên phương thức qua `getImplMethodName()`. Hàm tiện ích `nameOf()` gói gọn toàn bộ quá trình này lại.

Hạn chế của cách làm là nó chỉ gọn gàng với các getter không tham số. Nếu muốn hỗ trợ phương thức có nhiều tham số, bạn phải khai báo thủ công từng interface tương ứng như `Function2`, `Function3`, khá lặp lại và mất công. Vì vậy tác giả khuyên nên dùng thư viện `safety-mirror`, vốn đã cung cấp sẵn cơ chế phản chiếu phương thức an toàn về kiểu mà không cần viết lại đống interface đó.

**Điểm chính:**
- Method reference giúp thay thế chuỗi cứng bằng tham chiếu được trình biên dịch kiểm tra.
- `SerializedLambda` chứa thông tin mô tả phương thức, lấy được qua `getImplMethodName()`.
- Mấu chốt kỹ thuật là ghi đè `replaceObject()` trong một `ObjectOutputStream` tùy biến.
- Cách này gọn với getter không tham số, nhưng cần nhiều interface phụ khi có tham số.
- Thư viện `safety-mirror` là lựa chọn thực dụng hơn cho nhu cầu này.

## [Control the ideas, not the code](https://antirez.com/news/169)

antirez cho rằng trong thời đại LLM, lập trình viên nên tập trung kiểm soát ý tưởng và thiết kế phần mềm thay vì đọc từng dòng mã do AI sinh ra. Lý do rất thực tế: một ngày làm việc với LLM có thể tạo ra hàng nghìn dòng mã, và việc duyệt hết chúng là bất khả thi. Theo ông, đây không phải sự buông lỏng hay phụ thuộc vào AI, mà là một chuyển dịch tự nhiên của nghề.

Lập luận chính dựa trên điểm mạnh và điểm yếu của LLM: chúng rất giỏi tối ưu cục bộ nhưng yếu ở các quyết định kiến trúc. Vì vậy giá trị của con người nằm ở việc xác nhận thiết kế, chứ không phải soi từng câu lệnh. Với quỹ thời gian tám tiếng mỗi ngày, thời gian dành cho việc đọc mã sẽ lấy đi năng lượng cho những việc đáng giá hơn: định hình hướng đi của sản phẩm, thiết kế tính năng, nghiên cứu tối ưu hiệu năng và kiểm thử chất lượng. Ông cũng nhắc lại rằng những tri thức cũ như *The Mythical Man Month* từ thập niên 1970 lại phù hợp với vấn đề hôm nay hơn nhiều so với các trào lưu của thập kỷ vừa qua.

Dự án DwarfStar của ông là ví dụ cho thấy dù có AI hỗ trợ, việc hiểu sâu bài toán và tư duy thiết kế nghiêm túc vẫn là điều kiện bắt buộc — chỉ đưa ra vài câu lệnh gợi ý thì không thể có phần mềm chạy được. Hướng đi ông đề xuất là thay các buổi duyệt mã bằng một tài liệu `DESIGN.md` đầy đủ, giúp mọi người nắm được ý tưởng nền tảng thay vì chi tiết cài đặt. Riêng với lập trình viên mới, ông thừa nhận mình chưa có câu trả lời chắc chắn, và khuyên họ vẫn nên tự học vững nền tảng lập trình.

**Điểm chính:**
- Khối lượng mã do LLM sinh ra quá lớn để duyệt theo cách truyền thống.
- LLM mạnh ở tối ưu cục bộ, yếu ở quyết định kiến trúc — nên con người giữ phần thiết kế.
- Thời gian đọc mã đánh đổi bằng thời gian cho thiết kế, tối ưu và kiểm thử.
- Đề xuất thay duyệt mã bằng tài liệu `DESIGN.md` mô tả rõ ý tưởng.
- Lập trình viên mới vẫn cần tự học nền tảng, đây là điểm tác giả để mở.

## [Good Tools Are Invisible](https://www.gingerbill.org/article/2026/07/10/good-tools-are-invisible/)

gingerBill lập luận rằng một công cụ tốt phải "vô hình": nó lùi hẳn vào hậu cảnh để bạn chỉ còn nghĩ về công việc, thay vì liên tục nghĩ về chính công cụ. Vấn đề lớn mà tác giả chỉ ra là thói quen bao biện — biến những hạn chế thật sự của công cụ thành "câu đố thú vị" đáng để giải, thay vì thừa nhận đó là khuyết điểm cần sửa.

Ví dụ điển hình là vim: nhiều người xem việc tự dựng macro hay tìm cách đi đường vòng là niềm vui, trong khi thực chất đó là ma sát. Tác giả so sánh với các trình soạn thảo như Sublime, nơi những tính năng như nhiều con trỏ xử lý các thao tác hàng loạt gọn hơn nhiều. Gốc rễ của sự bao biện là khi người ta gắn bản sắc cá nhân vào công cụ mình chọn: lúc đó mọi hạn chế đều bị bảo vệ theo phản xạ, và việc đánh giá trung thực trở nên bất khả. Tác giả cũng phân biệt rõ giữa *cảm giác* hiệu quả và hiệu quả thật — cái cảm giác thông minh khi giải xong một vấn đề rắc rối có thể che mất sự kém hiệu quả; thước đo đúng phải là thời gian thực tế bỏ ra và tỉ lệ sai sót.

Từ đó ông mở rộng sang vài tranh luận quen thuộc. Chuyện GUI khó điều hướng bằng bàn phím là lỗi thiết kế, không phải giới hạn cố hữu của GUI. Văn hóa cấu hình tới tận cùng trên Linux đã góp phần kìm hãm việc phổ cập desktop: thiết lập mặc định tốt chính là cách tôn trọng thời gian người dùng, còn khả năng tùy biến chỉ nên bổ sung chứ không thay thế cho mặc định hợp lý. Cuối cùng, việc lấy đường cong học tập dốc ra làm bằng chứng cho sự ưu việt thường chỉ là lối lập luận chi phí đã bỏ ra.

**Điểm chính:**
- Công cụ tốt biến mất khỏi nhận thức, để bạn tập trung vào mục tiêu thật.
- Đừng biến hạn chế của công cụ thành "câu đố vui" để bao biện.
- Gắn bản sắc vào công cụ khiến ta mất khả năng đánh giá trung thực.
- Đo bằng thời gian thực tế và tỉ lệ sai sót, không đo bằng cảm giác thông minh.
- Mặc định hợp lý quan trọng hơn khả năng tùy biến vô hạn.

## [Mysteries of Telegram DC](https://dev.moe/en/3025)

Coxxs đã điều tra hệ thống năm trung tâm dữ liệu (DC1–DC5) của Telegram và phát hiện nhiều điều bất ngờ về cách chúng thực sự được dùng. Telegram phân bổ trung tâm dữ liệu dựa trên mã quốc gia của số điện thoại lúc đăng ký: DC1 và DC3 đặt tại Miami, DC2 và DC4 tại Amsterdam, DC5 tại Singapore. Người dùng không được tự chọn, và trung tâm này giữ nguyên kể cả khi họ chuyển sang nước khác.

Tác giả trình bày ba cách xác định trung tâm dữ liệu thật của một tài khoản: dựa vào thông báo lỗi khi đăng nhập sai DC, đọc siêu dữ liệu của ảnh đại diện, hoặc phân tích tên miền Web CDN. Điểm đáng lưu ý là cách thứ ba cho kết quả sai, vì DC2 và DC3 lần lượt dùng tên miền của DC4 và DC1 cho dịch vụ Web CDN — khiến người dùng DC2 bị nhận diện thành DC4. Đây chính là lý do nhiều thống kê trước đây tưởng rằng DC2 gần như không có ai.

Kết quả kiểm tra trên hơn 10.000 số điện thoại bằng giao thức MTProto cho thấy DC2 thực tế có lượng người dùng đáng kể nhưng "vô hình" với các phương pháp phát hiện thông thường. Ngược lại, DC3 đã ngừng nhận đăng ký mới và toàn bộ người dùng cũ được chuyển sang DC1 vào khoảng năm 2020; tác giả chỉ tìm được hai tài khoản DC3, mà phân tích cũng cho thấy chúng đã bị dời sang DC1. Bài viết kèm bảng tra quy tắc phân bổ DC theo mã quốc gia, hữu ích cho ai muốn hiểu hạ tầng của Telegram.

**Điểm chính:**
- DC được gán theo mã quốc gia số điện thoại lúc đăng ký và không thể tự đổi.
- Ba cách xác định DC: lỗi đăng nhập, siêu dữ liệu ảnh đại diện, tên miền Web CDN.
- Cách dựa vào Web CDN cho kết quả sai vì DC2/DC3 dùng tên miền của DC4/DC1.
- DC2 có nhiều người dùng nhưng bị các phương pháp thông thường nhận diện sai.
- DC3 đã ngừng hoạt động, người dùng được chuyển sang DC1 từ khoảng năm 2020.

## [How I use HTMX with Go](https://www.alexedwards.net/blog/how-i-use-htmx-with-go)

Alex Edwards chia sẻ cách ông kết hợp HTMX với Go để thêm tương tác cho ứng dụng web mà không phải viết nhiều JavaScript, đồng thời vẫn giữ được sự an toàn và nhất quán của việc kết xuất HTML phía máy chủ bằng gói `html/template`. Bài viết đi qua toàn bộ quá trình xây dựng một ứng dụng nhỏ có chức năng tìm kiếm và lọc danh sách người dùng theo thời gian thực.

Về cấu trúc, ông chia thư mục mẫu thành ba phần: `base.tmpl` chứa bố cục chung, `pages/` chứa nội dung riêng của từng trang, và `partials/` chứa các khối HTML dùng lại được. Toàn bộ tệp mẫu và tài nguyên tĩnh được nhúng vào tệp thực thi Go bằng `//go:embed`. Điểm cốt lõi là kiểu `htmlRenderer`: nó phân tích sẵn tập mẫu chung lúc khởi động, rồi phương thức `render()` sẽ nhân bản tập đó, bổ sung mẫu của trang cụ thể và thực thi mẫu được gọi tên. Nhờ vậy cùng một hàm có thể trả về trang HTML đầy đủ hoặc chỉ một mảnh HTML cho HTMX.

Vấn đề quan trọng là phân biệt yêu cầu đến từ HTMX hay từ người dùng truy cập trực tiếp. HTMX luôn gửi tiêu đề `HX-Request: true`, nên tác giả viết hàm `isHTMXRequest()` để chọn mẫu phù hợp, và luôn đặt `Vary: HX-Request` trong `render()` để bộ đệm không trả sai nội dung. Với nút quay lại của trình duyệt, cần đặt `historyRestoreAsHxRequest` thành `false`, nếu không HTMX sẽ nhận về mảnh HTML thay vì cả trang. Về chuyển hướng, không thể dùng phản hồi `3xx` thông thường vì trình duyệt tự đi theo trước khi HTMX kịp thấy; giải pháp là trả `204` kèm tiêu đề `HX-Redirect`, và vẫn dự phòng `3xx` cho trường hợp không có HTMX. Cuối cùng, thiết lập `responseHandling` giúp hiển thị lỗi `4xx`/`5xx` ra toàn trang, riêng `422` vẫn được thay vào đúng vị trí đích.

**Điểm chính:**
- Chia mẫu thành base / pages / partials và nhúng vào tệp thực thi bằng `//go:embed`.
- Kiểu `htmlRenderer` nhân bản tập mẫu chung để trả về cả trang hoặc chỉ một mảnh HTML.
- Dùng tiêu đề `HX-Request` để chọn mẫu, và luôn đặt `Vary: HX-Request`.
- Chuyển hướng phải qua `HX-Redirect`, không dùng được phản hồi `3xx` thông thường.
- Đặt `historyRestoreAsHxRequest: false`, `historyCacheSize: 0` và `disableInheritance: true` để tránh lỗi khó lường.

## [Quadrupling code performance with a "useless" if](https://purplesyringa.moe/blog/quadrupling-code-performance-with-a-useless-if/)

purplesyringa kể lại quá trình tối ưu một bộ nén chuỗi chuyên dụng, nơi điểm nghẽn nằm ở một vòng lặp trông không thể gọn hơn được nữa. Phép toán cốt lõi `j = next_j[i][j]` biên dịch ra đúng một chỉ thị máy, nên thoạt nhìn nó đã tối ưu hoàn toàn. Nhưng thực tế lại khác hẳn.

Nguyên nhân thật sự là chuỗi phụ thuộc do độ trễ. Các bộ xử lý hiện đại có khả năng thực thi song song nhiều chỉ thị, nhưng chúng không thể chạy đồng thời những chỉ thị phụ thuộc nhau. Ở đây mỗi lần lặp cần kết quả của lần lặp trước thông qua biến `j`, nên hiệu năng bị giới hạn bởi độ trễ truy cập bộ nhớ chứ không phải thông lượng — CPU chỉ đứng chờ. Giải pháp của tác giả là tận dụng cơ chế dự đoán nhánh: bọc phép gán trong một điều kiện `if (j != next_j[i][j])`. Nhờ vậy CPU có thể phỏng đoán và thực thi trước các lần lặp tiếp theo mà không phải chờ bộ nhớ trả về; khi điều kiện thật sự đúng thì cơ chế phục hồi dự đoán sai sẽ sửa lại.

Khó khăn nằm ở chỗ điều kiện này vô nghĩa về mặt ngữ nghĩa, nên trình biên dịch sẽ lập tức loại bỏ nó. Tác giả phải dùng ép kiểu `volatile` để thuyết phục trình biên dịch rằng điều kiện và phép gán là hai thao tác độc lập. Kết quả trên phép đo tổng hợp là nhanh hơn khoảng bốn lần (từ 320 xuống 80 micro giây); còn trong tình huống thực tế mức cải thiện khoảng hai lần, có lẽ do LLVM sinh mã chưa tối ưu.

**Điểm chính:**
- Một chỉ thị duy nhất không có nghĩa là đã tối ưu — chuỗi phụ thuộc mới là điểm nghẽn.
- Vòng lặp phụ thuộc kết quả trước bị giới hạn bởi độ trễ bộ nhớ, không phải thông lượng.
- Thêm điều kiện "vô ích" cho phép CPU dự đoán nhánh và thực thi phỏng đoán trước.
- Cần ép kiểu `volatile` để trình biên dịch không loại bỏ điều kiện đó.
- Nhanh hơn khoảng bốn lần khi đo tổng hợp, khoảng hai lần trong thực tế.

## [Reverse Engineering ChatGPT Web: How OpenAI Built for a Billion Users](https://performance.dev/chatgpt)

Dennis Brotzky mổ xẻ kiến trúc web của ChatGPT để xem OpenAI đã tối ưu ứng dụng ra sao cho quy mô hàng tỉ người dùng. Điều đáng chú ý đầu tiên là họ không tự xây giải pháp riêng: nền tảng chỉ gồm những công nghệ phổ thông như React 19 với React Router 7, TypeScript, TanStack Query, Tailwind CSS v4 và Radix UI. Ứng dụng từng chạy Next.js từ tháng 11 năm 2022, chuyển sang Remix năm 2024, rồi về React Router 7 khi hai dự án hợp nhất.

Về hiệu năng, phần vỏ trang được kết xuất phía máy chủ, nặng khoảng 84 KB sau khi nén, với thời gian trả byte đầu tiên chỉ 50–65 mili giây. Họ dùng kết xuất máy chủ theo luồng kèm các ranh giới Suspense, chia mã thành 160 phần có băm nội dung, tách CSS theo tuyến đường và hoàn toàn không tải phông chữ web — chỉ dựa vào phông có sẵn của hệ thống. Toàn bộ cờ tính năng (556 cổng, 144 cấu hình, 192 thử nghiệm) được đánh giá phía máy chủ rồi nhúng thẳng vào mã khởi động. Mọi thứ trong chuỗi khởi động đều xoay quanh một mục tiêu duy nhất: cho người dùng gõ được vào khung soạn tin sớm nhất có thể, những phần không thiết yếu mới tải sau. Khối mã dùng CodeMirror 6, công thức toán dùng KaTeX kèm cây MathML ẩn cho trình đọc màn hình.

Phần người dùng không thấy cũng đáng học: hệ thống chống lạm dụng nội bộ tên "Sentinel" cùng thử thách proof-of-work của Cloudflare được thực hiện ngầm ngay khi tải trang, nên lúc gửi tin nhắn không còn độ trễ nào. Người dùng chưa đăng nhập vẫn được cấp mã người dùng thật, nhờ đó vẫn giới hạn được tần suất và chạy thử nghiệm mà không dựng rào đăng nhập. Tác giả kết luận rằng chiến lược kinh doanh thấm vào từng quyết định kỹ thuật, và việc ghi nhận thời điểm sẵn sàng tương tác cho mọi người dùng chứng minh nguyên tắc: không đo được thì không cải thiện được.

**Điểm chính:**
- Công nghệ hoàn toàn phổ thông: React 19, React Router 7, TanStack Query, Tailwind v4.
- Vỏ trang 84 KB nén, thời gian trả byte đầu tiên 50–65 mili giây.
- Mọi thứ ưu tiên cho khung soạn tin sẵn sàng nhận chữ trước tiên.
- Không dùng phông chữ web, tách CSS theo tuyến đường, chia mã thành 160 phần.
- Chống lạm dụng và cấp mã người dùng ẩn danh được xử lý ngầm lúc tải trang.

## [Broker-Visible vs Client-Local Parallelism](https://jack-vanlightly.com/blog/2026/6/3/broker-visible-vs-client-local-parallelism)

Jack Vanlightly phân tích hai cách tổ chức xử lý song song trong các hệ thống nhắn tin phân tán như Kafka, và chỉ ra rằng việc đặt đơn vị song song ở đâu ảnh hưởng rất lớn đến tài nguyên hệ thống. Cách thứ nhất là song song ở phía broker: mỗi đơn vị công việc song song là một consumer riêng, nên broker phải quản lý kết nối TCP, trạng thái giao thức và siêu dữ liệu cho từng consumer đó. Ở quy mô lớn, chi phí này trở nên không thể chấp nhận được.

Cách thứ hai là song song ngay trong ứng dụng khách, bằng luồng ảo, tác vụ bất đồng bộ hay luồng của hệ điều hành. Broker không hề biết đến những đơn vị công việc này, nên số consumer cần dùng ít đi rất nhiều và tải quản lý trên broker giảm hẳn. Tác giả đưa ra một phép tính đơn giản để thấy rõ khác biệt: mức song song tổng cộng bằng tốc độ tin nhắn nhân với thời gian xử lý trung bình. Với 60.000 tin nhắn mỗi giây và mỗi tin mất một giây để xử lý, ta cần 60.000 tác vụ chạy đồng thời. Nếu mô hình hóa bằng consumer thì broker phải quản 60.000 consumer; còn nếu song song phía khách bằng luồng ảo, chỉ cần khoảng 60 consumer, mỗi consumer chạy 1.000 tác vụ.

Trước đây tác giả có loạt bài về Kafka Share Groups, nhưng ở bài này ông làm rõ rằng chuyện tối ưu song song không riêng gì Kafka mà đúng với mọi hệ thống nhắn tin. Điều quan trọng là lập trình viên phải chủ động quyết định đơn vị song song của mình nằm ở phía broker hay phía khách, dựa trên đặc điểm khối lượng công việc và giới hạn tài nguyên thực tế.

**Điểm chính:**
- Song song phía broker buộc broker quản kết nối và trạng thái cho từng consumer.
- Song song phía khách (luồng ảo, tác vụ bất đồng bộ) thì broker không thấy, nên nhẹ hơn nhiều.
- Mức song song cần thiết = tốc độ tin nhắn × thời gian xử lý trung bình.
- Ví dụ 60.000 tác vụ đồng thời: 60.000 consumer so với chỉ 60 consumer.
- Vấn đề này áp dụng cho mọi hệ thống nhắn tin, không chỉ Kafka.

## [Work Loudly](https://ben.balter.com/2026/07/14/work-loudly/)

Ben Balter cho rằng làm việc từ xa đã lấy đi thứ mà môi trường văn phòng vốn có sẵn: khả năng nhìn thấy nhau làm việc một cách tự nhiên. Ở văn phòng, công việc của bạn được thấy qua những tình huống ngẫu nhiên — một buổi bàn luận trước bảng trắng, một cuộc trò chuyện ở khu bếp. Làm từ xa thì thứ "khả kiến miễn phí" đó mất hẳn, và ngay cả công việc có giá trị cũng trở nên vô hình khi đến lúc xét thăng tiến hay phân công dự án.

Vấn đề thứ hai là thời điểm. Việc tổng kết sau khi hoàn thành sẽ bỏ mất phần hay nhất của câu chuyện: cách bạn lập luận, những hướng đã thử và thất bại, cái khoảnh khắc nhận ra vấn đề thật sự. Những điều đó chỉ tồn tại trong lúc làm, không phải lúc kết thúc. Vì vậy tác giả khuyên nên "làm việc thật to": tạo issue trước khi bắt tay vào việc, viết mô tả pull request thật kỹ, chia sẻ bản nháp khi mới xong khoảng 40%, và dùng kênh chung thay vì tin nhắn riêng — nói chung là để các quyết định và tiến độ hiện diện trong không gian chia sẻ và lưu lại được.

Ông cũng phản biện lo ngại rằng làm vậy là khoe khoang: bản chất ở đây là chia sẻ hiện vật công việc (issue, pull request, tài liệu), không phải phát thanh về sự vất vả hay diễn cảnh bận rộn. Lợi ích rất thực tế — công việc hiện ra sớm sẽ thu hút phản hồi giúp bạn không làm dư, phát hiện ra giải pháp đã có sẵn, và kéo được người có chuyên môn tới giúp. Với người quản lý, họ có thể đánh giá đóng góp dựa trên bằng chứng thay vì dựa vào ai trông có vẻ bận nhất. Tiêu chí cuối cùng tác giả gọi là "phép thử dấu vết": người quản lý của bạn có hiểu được bạn đã đóng góp gì chỉ bằng những gì để lại không?

**Điểm chính:**
- Làm từ xa mất đi khả năng người khác thấy công việc của bạn một cách tự nhiên.
- Tổng kết sau khi xong sẽ bỏ mất phần lập luận và những hướng đã thử.
- Nên tạo issue trước khi làm, viết mô tả pull request kỹ, chia sẻ nháp sớm.
- Dùng kênh chung thay vì tin nhắn riêng để công việc lưu lại được.
- Phép thử dấu vết: người quản lý hiểu đóng góp của bạn chỉ qua tài liệu để lại?

## [Building Service Topology at Scale: Architecture, Challenges, and Lessons Learned](https://netflixtechblog.com/building-service-topology-at-scale-architecture-challenges-and-lessons-learned-f4b792f3f0d8)

Đội kỹ thuật Netflix chia sẻ cách họ xây dựng hệ thống Service Topology để nhìn thấy toàn bộ quan hệ phụ thuộc giữa các dịch vụ theo thời gian gần thực. Mục tiêu là gỡ lỗi nhanh hơn, xác định được phạm vi ảnh hưởng khi xảy ra sự cố, và giúp mọi người định hướng trong một kiến trúc rất phức tạp. Họ chọn hướng xử lý theo luồng thay vì theo lô, vì với ảnh chụp mỗi giờ hay mỗi ngày thì "đến lúc bạn xem được dữ liệu thì nó đã cũ rồi". Hệ thống gồm ba lớp tách biệt: lớp mạng dùng nhật ký luồng từ eBPF, lớp IPC lấy số đo từ chính các dịch vụ, và lớp truy vết phân tán lưu ở dạng cột Parquet.

Đường ống xử lý nhật ký luồng mạng được chia làm ba tầng. Tầng một lọc và gom dữ liệu thô theo cửa sổ năm phút để giảm áp lực bộ nhớ. Tầng hai giải quyết vấn đề cốt lõi: lưu lượng trên hạ tầng đám mây luôn đi qua các thành phần trung gian như bộ cân bằng tải hay cổng NAT, nên nhật ký chỉ thấy App A → bộ cân bằng tải → App B thành các chặng rời rạc; tầng này xáo lại dữ liệu để dựng thành quan hệ phụ thuộc logic thật. Tầng ba tổng hợp lần cuối, làm giàu thêm siêu dữ liệu rồi ghi vào cơ sở dữ liệu đồ thị. Họ dùng cơ chế đối áp của reactive streams để hệ thống chậm lại một cách có kiểm soát khi quá tải thay vì mất dữ liệu, thay gRPC bằng Server-Sent Events cho giao tiếp giữa các tầng, và dùng băm nhất quán để tự cân bằng tải khi số máy thay đổi.

Phần bài học đáng giá nhất là các khó khăn thực tế: consumer Kafka bị tụt lại, các nút nóng khiến một số máy nhận lưu lượng gấp trăm lần máy khác, và áp lực bộ nhớ cùng những lần dừng thu gom rác. Đội đã phải chấp nhận dùng bộ tổng hợp có thể thay đổi trạng thái trên đường xử lý nóng — trái với quy ước của Scala nhưng được biện minh bằng số đo. Kết luận của họ: quy mô làm thay đổi mọi thứ, và "thông lệ tốt nhất" chỉ là điểm khởi đầu chứ không phải luật.

**Điểm chính:**
- Xử lý theo luồng thay vì theo lô, vì ảnh chụp định kỳ luôn cho dữ liệu đã cũ.
- Ba lớp topology: mạng (eBPF), IPC (số đo dịch vụ) và truy vết phân tán.
- Đường ống ba tầng để dựng quan hệ phụ thuộc logic từ các chặng mạng thô.
- Đối áp giúp chậm lại có kiểm soát khi quá tải thay vì mất dữ liệu.
- Nút nóng và áp lực bộ nhớ là hai vấn đề khó nhất; sửa xong nút nghẽn này sẽ lộ ra nút nghẽn khác.

### Bonus

**Images:**
![MCP vs A2A vs ACP: How AI Agents Actually Talk to Each Other](https://substackcdn.com/image/fetch/$s_!lpxK!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff9fb99a2-ec71-476d-a9cb-6c1a43339d90_2484x3002.png)
![LLM vs RAG vs Agent evals](https://substackcdn.com/image/fetch/$s_!LZtJ!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F6456348c-5d92-4524-8dd6-d75b4dc7feaf_1280x1547.png)
![How Distributed Tracing Works at the High Level?](https://substackcdn.com/image/fetch/$s_!ULeT!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fe81b4572-820e-4790-8861-8efe14f38700_2252x2752.png)
![The Life of a Redis Query](https://substackcdn.com/image/fetch/$s_!6UyI!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F9f8ea7bf-2170-4466-92f3-edd7eab11de4_3000x3900.png)
