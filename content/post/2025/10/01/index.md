---
title: "Newsletter #58"
date: 2025-10-01
tags: ["AI-Assisted", "Technology", "Productivity", "Decision Making", "Software Engineering", "Career Development", "Event-Driven", "Distributed Systems", "System Design", "Developer Culture", "Curiosity", "Innovation", "AI", "LLM", "Tool Calls", "Security", "Logging", "Data Protection", "Leadership", "Communication", "AI Coding", "Code Generation", "Claude Code", "Anthropic"]
categories: ["Newsletter"]
---

*~~Hôm nay mình có thử gắn [Claude Code Router](https://github.com/musistudio/claude-code-router) với model `openai/gpt-oss-120b` trên [NVIDIA NIM](https://build.nvidia.com/) nhưng bị lỗi gì đấy, sau cùng thì không được output gì. Vì vậy chúng ta lại quay lại với model `qwen3-coder` chạy trên [iFlow Platform](https://platform.iflow.cn/docs/api-mode) nhé.~~ Mời bạn thưởng thức Newsletter #58.*

## [How Software Engineers Make Productive Decisions (without slowing the team down)](https://strategizeyourcareer.com/p/how-software-engineers-make-productive-decisions)

Nhiều nhóm phát triển bị chậm lại chỉ vì đối xử với mọi quyết định như thể chúng không thể đảo ngược. Tác giả Fran Soto đề xuất phân biệt rõ hai loại: quyết định "cửa hai chiều" (có thể quay lại dễ dàng, như thêm một trường vào phản hồi API mà chưa ai dùng, bật tắt bằng feature flag hay thay một thư viện nội bộ) và quyết định "cửa một chiều" (khó hoặc không thể quay lại, như di chuyển dữ liệu, thay đổi schema, thay đổi về bảo mật hay những thay đổi khách hàng nhìn thấy có nguy cơ làm mất dữ liệu). Để phân loại nhanh, bài viết đưa ra ba câu hỏi: nếu sai thì hậu quả là không ai nhận ra, gây phiền toái hay là thảm họa; việc hoàn tác khó đến mức nào, chẳng hạn có quay lại được trong khoảng mười phút với hệ thống cảnh báo sẵn có hay không; và có thể thu hẹp phạm vi ảnh hưởng bằng canary, feature flag hay triển khai từng phần hay không.

Với quyết định có thể đảo ngược, tác giả khuyên giới hạn thời gian tìm hiểu trong khoảng 30–60 phút rồi hành động, kèm các lớp bảo vệ: feature flag mặc định tắt, pull request nhỏ, kiểm thử cả hai trạng thái, kiểm tra canary, cảnh báo đầy đủ và kịch bản hoàn tác trong mười phút. Sự thận trọng nên dành cho những quyết định thực sự khó quay đầu. Thông điệp chính: khi rủi ro nhỏ và thay đổi có thể đảo ngược, hãy phát hành cùng các lớp bảo vệ — đó là cách đi nhanh mà không cẩu thả.

## [Why are Event-Driven Systems Hard?](https://newsletter.scalablethread.com/p/why-event-driven-systems-are-hard)

Kiến trúc hướng sự kiện (event-driven) giúp các service tách rời nhau và dễ mở rộng, nhưng đi kèm năm thách thức lớn. Thứ nhất là quản lý định dạng sự kiện: khi một service thêm hoặc đổi trường dữ liệu mà không phối hợp, các service phía sau có thể không đọc được nữa; giải pháp là tuân thủ quy tắc tương thích ngược và tương thích xuôi, cùng với schema registry đóng vai trò "từ điển trung tâm" cho định dạng sự kiện. Thứ hai là khả năng quan sát: luồng xử lý bị chia nhỏ qua nhiều service độc lập nên rất khó nhìn thấy toàn cảnh khi gỡ lỗi; cách khắc phục là distributed tracing với correlation ID — một mã định danh gắn vào sự kiện đầu tiên và được sao chép qua mọi bước xử lý để dựng lại hành trình của một yêu cầu.

Thứ ba là xử lý lỗi: cơ chế giao message ít nhất một lần (at-least-once) giúp không mất message khi hạ tầng gặp sự cố, còn Dead-Letter Queue (DLQ) giữ lại những message liên tục thất bại sau số lần thử lại giới hạn, tránh vòng lặp lỗi vô tận và cho phép điều tra sau. Thứ tư, chính cơ chế at-least-once khiến một service có thể nhận cùng một message nhiều lần nếu nó bị sập trước khi xác nhận hoàn tất, nên service phải có tính idempotent: lưu ID sự kiện đã xử lý và bỏ qua bản trùng, tránh lỗi như trừ tiền hai lần. Cuối cùng là eventual consistency: dữ liệu được lan truyền bất đồng bộ giữa các service, nên giao diện và logic nghiệp vụ phải chấp nhận việc các hệ thống tạm thời chưa thống nhất.

## [Dev Culture Is Dying: The Curious Developer Is Gone](https://dayvster.com/blog/dev-culture-is-dying-the-curious-developer-is-gone/)

Tác giả cho rằng văn hóa lập trình đang thay đổi theo hướng đáng lo ngại. Những công cụ làm nên nền tảng ngày nay như VLC, Linux, Git hay Docker ra đời từ sự tò mò và mong muốn giải quyết vấn đề, chứ không phải vì lợi nhuận hay danh tiếng. Tác giả nhớ lại những năm 2000, khi lập trình viên thức trắng đêm mày mò công nghệ mới chỉ để học hỏi mà không mong đợi lợi ích thương mại hay sự công nhận. Ngày nay, sự chú ý chuyển sang các chỉ số như MRR, ARR, DAU, MAU, thứ hạng SEO hay tỷ lệ chuyển đổi, và nhiều người theo đuổi framework mới vì áp lực phải tỏ ra bắt kịp xu hướng hơn là vì thực sự hứng thú. Động lực nội tại dần nhường chỗ cho sự công nhận từ bên ngoài.

Bài viết cũng chỉ ra một cuộc khủng hoảng bản sắc: lập trình viên tự định danh bằng công cụ, trở thành "Next.js developer" hay "Rust developer", thay vì bằng những vấn đề họ giải quyết. Tác giả so sánh việc phần mềm tiêu dùng chuyển sang mô hình thuê bao với việc chính người sáng tạo đánh mất quyền làm chủ sản phẩm của mình vào tay doanh nghiệp hoặc các chỉ số tăng trưởng, và đặt câu hỏi liệu họ còn quan tâm đến phần mềm mình xây dựng hay chỉ quan tâm đến doanh thu. Lời kêu gọi cuối bài là hãy quay lại làm những dự án xuất phát từ sự tò mò — kể cả những thứ không thể bán được — xây dựng vì niềm vui, rồi chia sẻ chúng để truyền cảm hứng cho người khác.

## [Tool Calls Are Expensive And Finite](https://www.reillywood.com/blog/tool-calls-are-expensive-and-finite/)

Việc cho LLM quyền sử dụng công cụ (tool) tạo ra những agent mạnh mẽ, nhưng Reilly Wood nhắc rằng một lần gọi tool tốn kém hơn một lần gọi hàm thông thường trong mã nguồn nhiều bậc độ lớn, và số lần gọi có giới hạn thực tế. Về bản chất, tool call vẫn là sinh văn bản: mô hình tạo ra một đoạn văn bản có cấu trúc (dạng JSON) ghi tên tool và tham số, hệ thống phân tích đoạn đó, thực thi hàm thật, rồi chèn kết quả vào lịch sử hội thoại như một message mới trước khi mô hình suy luận tiếp. Như vậy mỗi lần gọi đều tiêu tốn token để sinh ra lời gọi và chiếm thêm chỗ trong context window vì kết quả nằm lại trong đó.

Tác giả minh họa bằng ví dụ xử lý 1.000 user ID qua tool `get_user_info()`: một lập trình viên chỉ cần viết một vòng lặp, còn agent sẽ phải thực hiện 1.000 lần gọi riêng lẻ và nhiều khả năng cạn context window trước khi làm xong. Bài viết gợi ý ba hướng: thiết kế agent cho những bài toán không đòi hỏi quá nhiều lần gọi tool, xây dựng những tool linh hoạt hơn để mỗi lần gọi làm được nhiều việc, hoặc cho phép agent tự viết và chạy mã nguồn — với điều kiện có biện pháp bảo mật phù hợp.

## [Keeping Secrets Out of Logs](https://allan.reyes.sh/posts/keeping-secrets-out-of-logs/)

Allan Reyes phân tích vì sao dữ liệu bí mật (secret) như mật khẩu hay token cứ lọt vào log, và nhấn mạnh rằng không có "viên đạn bạc" nào giải quyết triệt để, mà cần kết hợp nhiều "viên đạn chì" — những biện pháp không hoàn hảo nhưng bổ trợ nhau. Sáu nguyên nhân phổ biến là: quên xóa câu lệnh ghi log khi gỡ lỗi; ghi nguyên cả đối tượng lớn như cấu hình hay phản hồi HTTP; đổi mức log toàn cục làm lộ thông tin vốn bị ẩn; secret nhúng sẵn trong URL; công cụ giám sát lỗi thu thập cả biến cục bộ; và người dùng gõ nhầm mật khẩu vào ô tên đăng nhập.

Các biện pháp gồm: gom log về một đường ống duy nhất; tối giản, che, mã hóa hoặc băm dữ liệu nhạy cảm; domain primitive — bọc secret trong kiểu dữ liệu riêng để chặn việc vô tình ghi log; read-once object — khóa giá trị sau lần đọc đầu tiên; bộ định dạng log tự dò và che chuỗi nguy hiểm; kiểm thử đơn vị báo lỗi khi gặp dữ liệu nhạy cảm; công cụ quét secret sau khi ghi; bộ tiền xử lý log trước khi lưu trữ (như Vector); taint checking bằng phân tích tĩnh; và đào tạo con người. Chiến lược bốn bước là xây nền tảng (thống nhất thế nào là secret, dùng log có cấu trúc và tập trung), hiểu luồng dữ liệu, bảo vệ các điểm hội tụ của log, và phòng thủ nhiều lớp. Tác giả thừa nhận công việc này gần như không bao giờ kết thúc vì hệ thống mới luôn có thể vượt qua các biện pháp hiện có.

## [Things I Believe](https://leerob.com/beliefs)

Lee Robinson chia sẻ những niềm tin định hình cách ông làm việc. Trước hết, phát hành nhanh quan trọng hơn chiến lược hoàn hảo: tốc độ là một siêu năng lực, các nhóm nhỏ phát hành nhanh hơn, và việc sản phẩm được người dùng đón nhận quan trọng hơn chỉ đơn thuần đưa mã nguồn lên. Sự nghiệp không có giới hạn trần: sự kiên trì vượt qua tài năng bẩm sinh, cải thiện đều đặn mỗi ngày sẽ cộng dồn theo thời gian, hãy chủ động và sẵn lòng giúp đỡ. Ông đề cao việc tìm kiếm sự thật đến cùng — chấp nhận những sự thật khó chịu, giữ quan điểm mạnh nhưng sẵn sàng thay đổi, và lắng nghe nhiều góc nhìn khác nhau.

Theo ông, giao tiếp chính là công việc: viết rõ ràng phản ánh tư duy rõ ràng, ai cũng nên rèn kỹ năng viết, và người lãnh đạo cần làm rõ những điều mơ hồ để tránh kỳ vọng lệch nhau. Lãnh đạo không cần chức danh, vì sức ảnh hưởng quan trọng hơn vị trí; người lãnh đạo giỏi vừa trực tiếp làm việc vừa trao quyền cho người khác. Công việc cũng có thể là sở thích khi đam mê đi kèm ranh giới rõ ràng, thay vì theo đuổi thứ "cân bằng công việc – cuộc sống" mang tính huyền thoại. Tuyển dụng phải thật khắt khe, chỉ nhận những ứng viên khiến bạn muốn nói "chắc chắn có" và ưu tiên tiềm năng phát triển. Cuối cùng, hãy luôn giả định thiện ý, dẫn dắt bằng sự đồng cảm, tiếp nhận phê bình một cách khách quan, và nhớ rằng một bản demo chạy được thuyết phục hơn một bản ghi nhớ dài dòng.

## [How Claude Code is Built](https://newsletter.pragmaticengineer.com/p/how-claude-code-is-built)

Claude Code bắt đầu từ một nguyên mẫu Boris Cherny làm vào tháng 9/2024: dùng Claude điều khiển terminal qua AppleScript, ban đầu chỉ để cho biết bài nhạc đang phát. Khi nhận ra mô hình có thể tự khám phá hệ thống tệp, nhóm thấy tiềm năng sản phẩm lớn. Anthropic bắt đầu dùng nội bộ vào tháng 11/2024 và chỉ sau năm ngày đã có một nửa số kỹ sư sử dụng; dù từng cân nhắc giữ lại làm lợi thế cạnh tranh, công ty vẫn phát hành công khai để thúc đẩy nghiên cứu an toàn AI. Nhóm chọn TypeScript, React với framework Ink, hệ thống bố cục Yoga và Bun vì đây là những công nghệ "on distribution" — những thứ Claude vốn đã làm tốt — nhờ đó khoảng 90% mã nguồn của Claude Code được viết bởi chính Claude Code.

Về kiến trúc, Claude Code là một lớp vỏ mỏng quanh mô hình với rất ít logic nghiệp vụ, chạy trực tiếp trên máy người dùng mà không cần ảo hóa. Phần phức tạp nhất là hệ thống phân quyền: công cụ xin phép người dùng trước các thao tác không thể hoàn tác, cho phép cấp quyền một lần hoặc lâu dài, với cấu hình nhiều cấp theo dự án, người dùng và công ty. Tốc độ tạo nguyên mẫu cũng rất đáng chú ý: khi xây dựng tính năng danh sách việc cần làm, nhóm đã thử khoảng 20 nguyên mẫu khác nhau chỉ trong hai ngày. Khi quy mô nhóm kỹ sư tăng gấp đôi, số pull request được hoàn thành vẫn tăng 67% — một chỉ số thường giảm khi đội ngũ mở rộng nhanh.

## Bonus: Một vài ảnh hay ho đến từ [ByteByteGo](https://bytebytego.com/)

![How Java Works](https://substack-post-media.s3.amazonaws.com/public/images/1e27232c-d4f1-4f4b-94fa-7318d39f6f3e_2360x2960.png)
![How Gitflow Branching Works?](https://substack-post-media.s3.amazonaws.com/public/images/9bef6181-7eed-45a9-9c7e-abd6864cc62b_2360x2960.png)
![The Life of a Redis Query](https://substack-post-media.s3.amazonaws.com/public/images/9ffab5bc-5857-4544-8e25-2dbf795e6f85_3000x3900.png)
![Cookies vs Sessions](https://substack-post-media.s3.amazonaws.com/public/images/1c2bd03d-66f2-4eb9-8293-7a1d49b9b9b6_2360x2920.png)
![Access Control Clearly Explained](https://substack-post-media.s3.amazonaws.com/public/images/26b55058-17ae-453f-8463-4d4e717e489b_2360x2920.png)
![How Git Reset Works?](https://substack-post-media.s3.amazonaws.com/public/images/00912640-ad5f-4ec7-aefa-e5eecf67dab0_3000x3900.png)
![Apache Kafka Explained (At the high level)](https://substack-post-media.s3.amazonaws.com/public/images/43b73739-a975-42af-999d-8676b1605ed2_3000x3900.png)

---

*Bài viết đã được viết lại bởi Claude Code với Opus 5.5 vào ngày 27/09/2026.*
