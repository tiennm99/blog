---
title: "Newsletter #124"
date: 2026-07-12
tags: ["AI-Assisted", "Newsletter", "Go", "Java", "Software Architecture", "System Design", "Career Development"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #124.*

## [Riding Technology Waves](https://staysaasy.com/strategy/2026/06/22/riding-technology-waves.html)

Các làn sóng công nghệ như Internet, điện toán đám mây, thiết bị di động và AI có thể tạo ra doanh nghiệp khổng lồ, đồng thời xóa sổ những mô hình cũ. Để đánh giá một công nghệ mới mà không bị cuốn theo sự cường điệu, tác giả đề xuất lần lượt trả lời bốn câu hỏi: công nghệ đó có thực sự quan trọng không, nó vận hành như thế nào, nó tạo ra những khả năng mới nào, và những khả năng ấy có ảnh hưởng đến sản phẩm, chi phí hoặc khách hàng của doanh nghiệp hay không.

Hai sai lầm phổ biến nằm ở hai thái cực: lười thay đổi nên phớt lờ tín hiệu thật, hoặc sợ bị xem là lạc hậu nên chạy theo đám đông khi chưa hiểu vấn đề. Nếu đã bỏ lỡ một làn sóng quan trọng, lãnh đạo cần thừa nhận sai lầm, chịu trách nhiệm, điều chuyển nguồn lực phù hợp, giao nhiệm vụ cho những người giỏi nhất và trực tiếp theo sát quá trình bắt kịp.

**Điểm chính:**
- Kiểm chứng nhu cầu và hành vi thực tế trước khi tin vào lời quảng bá.
- Hiểu nguyên lý hoạt động ở mức có thể giải thích đơn giản.
- Xác định khả năng mới bằng các sự thật cụ thể, tránh ngôn ngữ phóng đại.
- Chỉ điều chỉnh chiến lược khi đã làm rõ tác động đến doanh nghiệp và khách hàng.
- Khi đánh giá sai, nhanh chóng nhận trách nhiệm và tập trung nguồn lực để sửa chữa.

## [Find a new role](https://larahogan.me/blog/identify-new-role/)

Khi cân nhắc một vai trò mới, Lara Hogan đề xuất lập bốn danh sách: những điều bắt buộc không thể thương lượng, những điều nên có nhưng có thể đánh đổi, những yếu tố không quan trọng ở thời điểm hiện tại, và một câu ngắn xác định điều quan trọng nhất mà bạn muốn tối ưu. Cách làm này giúp biến một quyết định nghề nghiệp mơ hồ thành các tiêu chí cụ thể để tìm kiếm, phỏng vấn và so sánh cơ hội.

Tác giả khuyên không nên bắt đầu từ chức danh vì cùng một chức danh có thể mang ý nghĩa rất khác giữa các tổ chức. Danh sách bắt buộc cần thật ngắn, còn danh sách mong muốn phải chấp nhận đánh đổi. Các tiêu chí nên phản ánh nhu cầu hiện tại thay vì phiên bản của bạn trong quá khứ hoặc một tương lai xa; chúng có thể được làm lại khi hoàn cảnh và ưu tiên thay đổi.

**Điểm chính:**
- Phân biệt rõ điều bắt buộc với điều chỉ nên có.
- Xác định những yếu tố không ảnh hưởng đến quyết định hiện tại.
- Viết một câu nêu ưu tiên quan trọng nhất để làm tiêu chuẩn so sánh.
- Đánh giá nội dung thực tế của vai trò thay vì dựa vào chức danh.
- Cập nhật tiêu chí khi nhu cầu, sức khỏe hoặc giai đoạn nghề nghiệp thay đổi.

## [I Stored a Website in a Favicon](https://www.timwehrle.de/blog/i-stored-a-website-in-a-favicon)

Tim Wehrle thử lưu nội dung HTML vào một favicon bằng cách chuyển văn bản thành các byte UTF-8 rồi ghi lần lượt vào ba kênh màu đỏ, xanh lá và xanh dương của từng điểm ảnh. Bốn byte đầu tiên lưu độ dài dữ liệu để bộ giải mã biết chính xác vị trí kết thúc. Với 208 byte nội dung và phần đầu bốn byte, toàn bộ dữ liệu chỉ cần 71 điểm ảnh và vừa trong một ảnh PNG kích thước 9×9.

Để đọc dữ liệu, JavaScript tải favicon, vẽ ảnh lên canvas, lấy các giá trị RGB, khôi phục mảng byte rồi giải mã lại thành HTML. Favicon chỉ chứa nội dung trang; một đoạn mã khởi động nhỏ vẫn cần thiết để tái tạo và hiển thị nó. Thử nghiệm không có nhiều giá trị thực tế, nhưng minh họa rõ cách dữ liệu có thể được biểu diễn trong điểm ảnh và cách định dạng tệp có thể được sử dụng ngoài mục đích quen thuộc.

**Điểm chính:**
- Mỗi điểm ảnh RGB có thể lưu ba byte dữ liệu.
- Phần đầu chứa độ dài giúp loại bỏ các byte chưa sử dụng ở cuối ảnh.
- Canvas cho phép trình duyệt đọc và khôi phục dữ liệu từ từng điểm ảnh.
- Favicon chứa nội dung HTML nhưng không thể tự thực thi nếu thiếu mã giải mã.
- SVG, vùng chú thích của PNG và định dạng ICO là những hướng tiếp cận khác.

## [AntiPatterns Never Left, We Just Stopped Calling Them by Name](https://dev.to/leonpennings/antipatterns-never-left-we-just-stopped-calling-them-by-name-969)

Bài viết nhìn lại danh mục AntiPatterns năm 1998 và cho rằng các kiểu thất bại cũ chưa biến mất mà chỉ khoác tên gọi hiện đại. Chúng khó nhận biết vì hệ thống vẫn biên dịch, chạy và vượt qua kiểm thử; thành công trước mắt khiến đội ngũ xem lựa chọn kiến trúc là đúng, trong khi không ai xây dựng phương án đơn giản hơn để so sánh. Vì vậy, sự phổ biến hoặc khả năng vận hành không đủ chứng minh một giải pháp phù hợp với hoàn cảnh cụ thể.

Các ví dụ hiện đại gồm phân mảnh khái niệm nghiệp vụ theo tầng kỹ thuật, mô hình miền thiếu hành vi, kết nối sự kiện đã chết, phụ thuộc sâu vào khung phần mềm, sử dụng Kubernetes hoặc Kafka như công cụ vạn năng, và biến mã nguồn rối thành mạng lưới dịch vụ rối. Một số giải pháp tổ chức cũng có thể tái tạo chính vấn đề chúng muốn chữa: đội nền tảng trở thành bức tường vận hành mới, hoặc Product Owner ngăn cách lập trình viên với người dùng. Tác giả không phủ nhận khung phần mềm, vi dịch vụ hay Scrum; thông điệp là phải đánh giá bối cảnh, chi phí dài hạn và người thực sự chịu hậu quả của quyết định.

**Điểm chính:**
- Đặt tên cho kiểu thất bại giúp đội ngũ nhận ra vấn đề đang bị che khuất.
- Cấu trúc theo nghiệp vụ thường bảo vệ ngữ cảnh tốt hơn cấu trúc thuần kỹ thuật.
- Tách hệ thống có thể chuyển độ phức tạp sang ranh giới mạng thay vì loại bỏ nó.
- Công nghệ phổ biến vẫn cần được đánh giá theo nhu cầu và giới hạn thực tế.
- Một phần mã nguồn nhỏ, tự quản lý đôi khi rẻ hơn phụ thuộc lớn trong dài hạn.

## [5 More Advanced Java Tips That Senior Engineers Actually Use](https://dev.to/cyclopt_dimitrisk/5-more-advanced-java-tips-that-senior-engineers-actually-use-bbp)

Bài viết giới thiệu năm khả năng của Java hiện đại dành cho hệ thống thực tế. Structured Concurrency gom các tác vụ đồng thời vào cùng một vòng đời để lỗi, thời hạn và việc hủy được truyền đến toàn bộ tác vụ con, tránh công việc bị bỏ quên như khi quản lý nhiều `CompletableFuture` độc lập. Record Patterns hỗ trợ tách dữ liệu lồng nhau ngay trong biểu thức `switch`, kết hợp với kiểu niêm phong để trình biên dịch kiểm tra đầy đủ các trường hợp.

Sequenced Collections thống nhất cách lấy phần tử đầu, cuối và khung nhìn đảo ngược trên danh sách, tập hợp hoặc ánh xạ có thứ tự. Foreign Function and Memory API cung cấp quyền truy cập bộ nhớ ngoài vùng quản lý và hàm gốc an toàn hơn `Unsafe` hoặc JNI, với vòng đời tài nguyên rõ ràng. Gatherers bổ sung phép biến đổi trung gian tùy chỉnh cho luồng dữ liệu, phù hợp với chia lô, cửa sổ trượt, loại bỏ phần tử trùng liên tiếp hoặc tính trung bình động.

**Điểm chính:**
- Quản lý các tác vụ đồng thời như một đơn vị có chung vòng đời.
- Dùng mẫu bản ghi để xử lý cấu trúc dữ liệu lồng nhau ngắn gọn và đầy đủ.
- Truy cập dữ liệu có thứ tự qua một giao diện nhất quán, không cần sao chép khi đảo chiều.
- Thay thế cách truy cập bộ nhớ gốc thiếu an toàn bằng API có kiểm tra và quản lý tài nguyên.
- Xây dựng phép biến đổi luồng có trạng thái mà vẫn giữ được chuỗi xử lý dễ đọc.

## [Go's Type System — Structs, Interfaces, and Life Without Inheritance](https://dev.to/mihirmohapatra/gos-type-system-structs-interfaces-and-life-without-inheritance-2lb7)

Go không có kế thừa lớp, hàm dựng hay từ khóa `implements`. Struct chủ yếu chứa dữ liệu; hàm khởi tạo chỉ là một quy ước, còn phương thức được khai báo riêng với bộ nhận theo giá trị hoặc con trỏ. Bộ nhận theo giá trị làm việc trên bản sao, trong khi bộ nhận con trỏ có thể thay đổi đối tượng gốc. Khi cần tái sử dụng trường và phương thức, Go sử dụng nhúng struct: thành phần bên trong được đưa lên bề mặt của struct ngoài, nhưng quan hệ này vẫn là kết hợp chứ không tạo ra kiểu con.

Giao diện trong Go được thỏa mãn ngầm khi một kiểu có đủ các phương thức cần thiết. Điều này khuyến khích giao diện nhỏ, thường do phía sử dụng định nghĩa theo đúng hành vi nó cần, thay vì buộc kiểu dữ liệu cam kết trước với một hợp đồng lớn. Cách thiết kế này giảm phụ thuộc và giúp các kiểu độc lập phối hợp với nhau. Đổi lại, việc tìm tất cả kiểu triển khai có thể khó hơn, nhúng không cung cấp đa hình như kế thừa, và giá trị mặc định của trường có thể che giấu dữ liệu chưa được khởi tạo.

**Điểm chính:**
- Dùng bộ nhận con trỏ khi phương thức cần thay đổi trạng thái gốc.
- Xem nhúng struct là kết hợp, không phải quan hệ “là một”.
- Định nghĩa giao diện nhỏ theo nhu cầu của phía sử dụng.
- Một kiểu tự động thỏa mãn giao diện nếu có đúng tập phương thức.
- Kiểm soát giá trị mặc định khi dữ liệu bắt buộc cần được xác thực.

## [Conduit: The Gateway I Built to Forget About](https://dev.to/adamthedeveloper/conduit-the-gateway-i-built-to-forget-about-2ann)

Tác giả ban đầu xây dựng một cổng API bằng Go cho ba dịch vụ với hai cơ chế xác thực, nhưng mỗi ngoại lệ định tuyến mới lại yêu cầu sửa mã nguồn và triển khai lại. Conduit tách phần ổn định khỏi phần thường xuyên thay đổi: Go phụ trách tiếp nhận HTTP, định tuyến, chuyển tiếp, CORS và bảo vệ SSRF; môi trường Deno cách ly chạy các mô-đun chính sách viết bằng TypeScript cho xác thực, ghi nhật ký và biến đổi yêu cầu.

Hai tiến trình trao đổi qua Unix socket bằng hợp đồng ảnh chụp và bản vá. Go chuyển một ảnh chụp yêu cầu có thể tuần tự hóa, mô-đun chỉ đề xuất phần thay đổi tối thiểu thay vì sở hữu hoặc sửa trực tiếp đối tượng yêu cầu; nội dung lớn vẫn ở Go và được tham chiếu bằng mã định danh. Thiết kế cũng phân biệt lỗi mô-đun, quá thời gian và việc toàn bộ môi trường Deno ngừng hoạt động, cho phép từng tuyến chọn đóng để trả về lỗi hoặc mở để bỏ qua mô-đun. Công cụ này hướng tới vài dịch vụ có chính sách biên thay đổi thường xuyên, không nhằm thay thế Envoy, Kong hay xử lý luồng dữ liệu rất lớn.

**Điểm chính:**
- Giữ đường truyền mạng trong Go và tách chính sách nghiệp vụ sang TypeScript.
- Sử dụng ảnh chụp bất biến cùng bản vá nhỏ để giảm phụ thuộc qua ranh giới tiến trình.
- Không chuyển nội dung lớn qua socket khi chỉ cần một tham chiếu.
- Xác định rõ hành vi khi mô-đun chậm, gặp lỗi hoặc môi trường chạy ngừng hoạt động.
- Đánh giá sự đơn giản bằng ranh giới trách nhiệm rõ ràng, không chỉ bằng số dòng mã nguồn.

## [The Reflect Package](https://internals-for-interns.com/posts/go-runtime-reflect)

Bài viết giải thích rằng khả năng phản chiếu của Go chủ yếu không tạo ra thông tin kiểu tại thời điểm chạy mà đọc siêu dữ liệu đã được trình biên dịch ghi vào tệp thực thi. Một giá trị `any` gồm hai con trỏ: một con trỏ đến dữ liệu và một con trỏ đến mô tả kiểu. Vì vậy, `reflect.TypeOf` về cơ bản chỉ lấy con trỏ mô tả đã có sẵn, thay vì tìm kiếm trong bảng đăng ký hoặc phân tích giá trị.

Trình biên dịch tuần tự hóa kích thước, căn chỉnh, loại, thông tin cho bộ thu gom rác và tên của mỗi kiểu vào vùng chỉ đọc. Dữ liệu riêng của từng loại được đặt ngay sau phần đầu chung; với struct, đó là danh sách trường, kiểu, độ lệch, tên và thẻ. `reflect.Value` kết hợp mô tả này với con trỏ dữ liệu, rồi dùng độ lệch đã lưu để tìm trường thật trong bộ nhớ. Việc đọc có thể thực hiện trên giá trị, nhưng muốn sửa đổi phải truyền con trỏ để dữ liệu có địa chỉ và thay đổi tác động đến đối tượng gốc.

**Điểm chính:**
- `any` mang sẵn con trỏ kiểu và con trỏ dữ liệu.
- Trình biên dịch tạo mô tả kiểu; trình liên kết đặt chúng vào vùng chỉ đọc.
- Thông tin riêng của từng loại nằm nối tiếp phần đầu mô tả chung.
- Tên và thẻ struct được lưu trong các vùng dữ liệu dùng chung để tiết kiệm bộ nhớ.
- Phản chiếu tìm trường bằng con trỏ và độ lệch, không phân tích lại mã nguồn.
