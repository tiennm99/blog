---
title: "Newsletter #54"
date: 2025-09-10
tags: ["AI-Assisted", "Technology", "DevOps", "Monorepo", "Software-Engineering", "Deployment", "Uber", "CI/CD"]
categories: ["Newsletter"]
---

*~~Do dạo này tình hình tài chính cá nhân không tốt lắm, nên mình quyết định huỷ Claude Subscription, và do đó không còn dùng Claude Code nữa. Hiện tại mình đang dùng Roo Code với model Z.AI: GLM 4.5 Air từ OpenRouter.~~ Hi vọng bài viết đủ chất lượng làm hài lòng các bạn. Mời bạn thưởng thức Newsletter #54.*

## [Controlling the Rollout of Large-Scale Monorepo Changes](https://www.uber.com/in/en/blog/controlling-the-rollout-of-large-scale-monorepo-changes/)

Bài viết từ Uber chia sẻ kinh nghiệm thực tế về việc kiểm soát việc triển khai các thay đổi lớn trong hệ thống monorepo quy mô lớn, một thách thức phức tạp mà nhiều công ty công nghệ đối mặt khi phát triển phần mềm.

**Bối cảnh thách thức tại Uber**: Uber vận hành một trong những monorepo lớn nhất thế giới với hàng triệu file và hàng chục ngàn thư mục. Việc triển khai các thay đổi toàn diện như nâng cấp framework, di chuyển cơ sở dữ liệu, hoặc thay đổi kiến trúc hệ thống đòi hỏi một quy trình kiểm soát chặt chẽ để đảm bảo tính ổn định và giảm thiểu rủi ro.

**Chiến lược kiểm soát rollout**: Uber triển khai hệ thống "rollout controls" với nhiều lớp bảo vệ. Hệ thống này bao gồm việc chia nhỏ các thay đổi thành các phần nhỏ hơn, triển khai theo từng giai đoạn, và có khả năng rollback nhanh chóng khi phát hiện vấn đề. Các công cụ như feature flags và canary deployments được sử dụng rộng rãi để kiểm soát luồng traffic.

**Kiểm tra tự động và giám sát**: Hệ thống tự động hóa các kiểm tra chất lượng code, chạy test suite trên các môi trường staging, và giám sát chặt chẽ các chỉ số hiệu suất sau khi triển khai. Các cảnh báo sớm được thiết lập để phát hiện bất thường trong behavior của hệ thống, cho phép đội ngũ phản ứng kịp thời.

**Học hỏi từ thực tế**: Uber chia sẻ nhiều bài học quý giá từ các lần triển khai thất bại thành công, bao gồm tầm quan trọng của việc có kế hoạch rollback chi tiết, tầm quan trọng của việc có các chỉ số đo lường rõ ràng, và sự cần thiết của việc giao tiếp liên tục giữa các team trong suốt quá trình rollout.

**Điểm chính:**
- Monorepo quy mô lớn đòi hỏi chiến lược rollout có kiểm soát chặt chẽ
- Việc chia nhỏ thay đổi và triển khai từng giai đoạn giảm thiểu rủi ro
- Feature flags và canary deployments là công cụ quan trọng để kiểm soát traffic
- Giám sát và cảnh báo sớm giúp phát hiện và xử lý vấn đề kịp thời
- Kế hoạch rollback chi tiết là yếu tố sống còn cho các thay đổi lớn

## [String Length](https://hsivonen.fi/string-length/)

Bài viết từ Henri Sivonen khám phá một chủ đề tưởng chừng đơn giản nhưng thực chất rất phức tạp: việc đo lường độ dài chuỗi ký tự trong các hệ thống máy tính, đặc biệt là trong ngữ cảnh web và Unicode.

**Vấn đề phức tạp đằng sau đơn giản**: Việc xác định "độ dài" của một chuỗi ký tự không đơn giản như đếm số ký tự hiển thị. Trong Unicode, một ký tự có thể được biểu diễn bằng nhiều code point (ví dụ: emoji với skin tone modifiers), và một code point có thể chiếm nhiều byte (ví dụ: ký tự tiếng Việt có dấu). Điều này tạo ra nhiều định nghĩa khác nhau về "độ dài".

**Các cách đo lường chuỗi**: Bài viết phân tích nhiều cách tiếp cận khác nhau: đếm số code point (code units), đếm số grapheme clusters (các ký tự hiển thị), đếm số byte, và đếm số column width (độ rộng khi hiển thị trên terminal). Mỗi cách có ứng dụng riêng: code units cho lập trình, grapheme clusters cho người dùng, column width cho giao diện dòng lệnh.

**Ứng dụng thực tế**: Trong phát triển web, việc hiểu rõ các cách đo lường này quan trọng cho việc validation form, truncation text, layout design, và performance optimization. Ví dụ: việc giới hạn tweet trong 280 ký tự thực chất là giới hạn theo số byte, không phải số ký tự hiển thị.

**Công cụ và best practices**: Henri đề xuất các thư viện và phương pháp xử lý chuỗi an toàn trong nhiều ngôn ngữ lập trình khác nhau, nhấn mạnh tầm quan trọng của việc sử dụng các API Unicode-aware thay vì các phương pháp xử lý chuỗi đơn giản.

**Điểm chính:**
- Độ dài chuỗi không có định nghĩa duy nhất mà phụ thuộc vào ngữ cảnh sử dụng
- Unicode làm cho việc đo lường độ dài trở nên phức tạp với nhiều code point cho một ký tự hiển thị
- Các hệ thống cần chọn cách đo lường phù hợp với mục đích sử dụng
- Việc hiểu Unicode là quan trọng để tránh bugs trong xử lý chuỗi
- Performance có thể bị ảnh hưởng bởi cách chọn thuật toán đo lường độ dài

## [An Illustrated Guide to OAuth](https://www.ducktyped.org/p/an-illustrated-guide-to-oauth/)

Bài viết cung cấp một hướng dẫn trực quan và dễ hiểu về OAuth - giao thức ủy quyền quan trọng trong bảo mật web hiện đại, giúp các ứng dụng truy cập tài nguyên người dùng mà không cần lưu trữ thông tin xác thực trực tiếp.

**Khái niệm cốt lõi của OAuth**: OAuth không phải là giao thức xác thực (authentication) mà là giao thức ủy quyền (authorization). Nó cho phép người dùng cho phép ứng dụng thứ ba truy cập vào tài nguyên của họ trên một dịch vụ khác mà không cần chia sẻ mật khẩu trực tiếp. Ví dụ: đăng nhập bằng Google vào ứng dụng web khác.

**Các thành phần chính trong OAuth**: Hệ thống OAuth bao gồm Resource Owner (người dùng), Client (ứng dụng muốn truy cập), Authorization Server (dịch vụ cấp token), và Resource Server (nơi lưu trữ dữ liệu). Mỗi thành phần có vai trò riêng trong quy trình ủy quyền, tạo thành một chuỗi an toàn để bảo vệ thông tin người dùng.

**Quy trình OAuth 2.0 tiêu chuẩn**: Bài viết minh họa từng bước trong quy trình: client redirect người dùng đến authorization server, người dùng đồng ý cấp quyền, authorization server trả về authorization code, client dùng code để exchange access token, và cuối cùng dùng token để truy cập resource server. Mỗi bước đều có cơ chế bảo mật riêng để ngăn chặn tấn công.

**Các loại grant flow khác nhau**: OAuth hỗ trợ nhiều loại flow tùy thuộc vào ngữ cảnh sử dụng: Authorization Code Flow cho ứng dụng web, Implicit Flow cho ứng dụng SPA, Client Credentials Flow cho ứng dụng backend, và Resource Owner Password Credentials Flow cho các ứng dụng đáng tin cậy. Mỗi flow có ưu điểm và nhược điểm riêng về bảo mật và trải nghiệm người dùng.

**Bảo mật và best practices**: Bài viết nhấn mạnh tầm quan trọng của việc sử dụng HTTPS, bảo vệ client secrets, thiết lập proper scope, và implement PKCE cho các ứng dụng public. Các lỗ hổng phổ biến như open redirect, CSRF, và token leakage cũng được phân tích kèm theo giải pháp phòng tránh.

**Điểm chính:**
- OAuth là giao thức ủy quyền, không phải xác thực, giúp bảo vệ thông tin người dùng
- Quy trình OAuth gồm nhiều thành phần phối hợp để tạo chuỗi an toàn
- Các loại grant flow khác nhau phù hợp với các loại ứng dụng khác nhau
- HTTPS và proper scope setting là yếu tố bảo mật bắt buộc
- PKCE nên được sử dụng cho các ứng dụng public để tăng cường bảo mật


## [Professional Development Is a Choice](https://alexchesser.medium.com/professional-development-is-a-choice-e90fb8719259)

Bài viết từ Alex Chesser khám phá một quan điểm quan trọng về phát triển nghề nghiệp: việc trở thành chuyên gia giỏi không phải là kết quả của may mắn hay hoàn cảnh, mà là một lựa thức ý thức và nỗ lực có chủ đích.

**Tư duy chủ động trong phát triển nghề nghiệp**: Alex lập luận rằng nhiều người có xu hướng chờ đờ cơ hội đến với mình thay vì chủ động tạo ra cơ hội. Sự khác biệt giữa những người thành công và những người không nằm ở khả năng bẩm sinh, mà ở thái độ chủ động trong việc tìm kiếm thử thách, học hỏi từ thất bại, và không ngừng cải thiện bản thân.

**Vai trò của sự kiên trì**: Bài viết nhấn mạnh tầm quan trọng của việc duy trì nỗ lực lâu dài. Thành công trong ngành công nghệ không đến từ một đêm, mà là kết quả của hàng ngàn giờ học tập, thực hành, và tinh thần không bỏ cuộc khi gặp khó khăn. Những người kiên trì thường đạt được kết quả vượt trội so với những người chỉ làm việc khi có động lực.

**Tìm kiếm thử thách có chủ đích**: Thay vì chỉ làm những công việc quen thuộc, Alex khuyên nên chủ động tìm kiếm những thử thách mới đòi hỏi kỹ năng cao hơn. Điều này có thể bao gồm việc nhận dự án phức tạp, học công nghệ mới, hoặc tham gia vào các hoạt động mở rộng tầm ảnh hưởng trong tổ chức.

**Học hỏi từ thất bại**: Bài viết khuyến khích việc xem thất bại như cơ hội học tập thay vì điều cần tránh. Mỗi lần thất bại đều mang lại bài học quý giá về kỹ năng, quy trình, và cách tiếp cận. Những người thành công thường có khả năng phân tích thất bại một cách khách quan và rút ra bài học để cải thiện.

**Xây dựng thói quen phát triển liên tục**: Alex đề xuất việc thiết lập các thói quen nhỏ nhưng nhất quán như đọc sách hàng ngày, tham gia cộng đồng kỹ thuật, viết blog, hoặc mentor người khác. Những thói quen này tạo ra hiệu ứng tích lũy lâu dài và giúp duy trì động lực phát triển.

**Điểm chính:**
- Phát triển nghề nghiệp thành công là kết quả của lựa thức chủ động, không phải may mắn
- Sự kiên trì lâu dài quan trọng hơn năng khiếu bẩm sinh
- Chủ động tìm kiếm thử thách giúp tăng tốc độ phát triển
- Thất bại là cơ hội học hỏi quý giá nếu biết phân tích
- Xây dựng thói quen nhỏ nhất quán tạo ra kết quả lớn lâu dài

## [Database Cache](https://avi.im/blag/2025/db-cache/)

Bài viết từ Avi khám phá các khái niệm và thực tiễn quan trọng về database caching - một kỹ thuật tối ưu hóa hiệu suất quan trọng trong các hệ thống ứng dụng hiện đại, giúp giảm tải cho database và cải thiện thời gian phản hồi.

**Khái niệm cơ bản về caching**: Database caching hoạt động bằng cách lưu trữ các kết quả truy vấn hoặc dữ liệu thường xuyên được truy cập vào bộ nhớ nhanh (RAM) thay vì truy cập trực tiếp vào database. Điều này giúp giảm thời gian đọc dữ liệu từ hàng trăm mili giây xuống chỉ vài mili giây, cải thiện đáng kể trải nghiệm người dùng và giảm tải cho hệ thống database.

**Các chiến lược cache phổ biến**: Bài viết phân tích nhiều chiến lược cache khác nhau: Read-Through Cache (tự động điền cache khi đọc), Write-Through Cache (cập nhật cả cache và database khi ghi), Write-Behind Cache (cập nhật cache trước, database sau), và Cache-Aside (ứng dụng tự quản lý cache). Mỗi chiến lược có ưu điểm và nhược điểm riêng tùy thuộc vào yêu cầu về tính nhất quán và hiệu suất.

**Xử lý cache invalidation**: Một trong những thách thức lớn nhất của caching là việc xác định khi nào dữ liệu trong cache đã lỗi thời. Bài viết thảo luận về các phương pháp invalidation khác nhau như time-based expiration, event-based invalidation, và write-through invalidation, cùng với các trade-off giữa tính nhất quán dữ liệu và hiệu suất.

**Cache hit ratio và performance monitoring**: Để đánh giá hiệu quả của hệ thống cache, cần theo dõi các chỉ số quan trọng như cache hit ratio (tỷ lệ truy cập thành công vào cache), latency (thời gian phản hồi), và memory usage. Các công cụ như Redis, Memcached, và các hệ thống cache phân tán được phân tích để giúp lựa chọn giải pháp phù hợp.

**Best practices và common pitfalls**: Bài viết chia sẻ nhiều bài học thực tế về cách thiết kế hệ thống cache hiệu quả, bao gồm việc chọn key naming convention phù hợp, thiết lập TTL hợp lý, tránh cache stampede (nhiều request cùng lúc khi cache miss), và xử lý các vấn đề về memory pressure trong môi trường production.

**Điểm chính:**
- Database caching giúp giảm thời gian truy cập dữ liệu từ hàng trăm mili giây xuống vài mili giây
- Các chiến lược cache khác nhau phù hợp với các yêu cầu về tính nhất quán và hiệu suất
- Cache invalidation là thách thức phức tạp đòi hỏi thiết kế cẩn thận
- Theo dõi cache hit ratio và các chỉ số performance là quan trọng để đánh giá hiệu quả
- Best practices bao gồm key naming convention hợp lý và thiết lập TTL phù hợp

## Bonus: Vài ảnh hay ho đến từ [ByteByteGo](https://bytebytego.com/)

![A Detailed Guide to Content Delivery Networks](https://substack-post-media.s3.amazonaws.com/public/images/f8993d4d-8879-4eeb-9635-3a5aa13816cc_2250x2624.png)
![CI/CD Pipeline Explained](https://substack-post-media.s3.amazonaws.com/public/images/607358c5-2e0b-41fc-9cdd-a350e1faf144_3780x4096.jpeg)
![What are some of the most popular versioning strategies?](https://substack-post-media.s3.amazonaws.com/public/images/8b1bd4d5-a708-4793-a9e6-aa96db182f54_3000x3900.png)
![The Testing Pyramid](https://substack-post-media.s3.amazonaws.com/public/images/c34a8b8b-feff-4473-9eb1-dd399f5a81eb_2360x2664.jpeg)

*Tổng kết thì mình thấy đợt thử nghiệm này cũng khá ổn. Có điều bài viết còn khá dài dòng và đôi chỗ còn sai sót từ ngữ tiếng Việt một chút. Với cái giá free thì quá được :))) Hẹn gặp lại các bạn trong các bài viết tới.*

---

*Bài viết đã được review và cập nhật bởi Claude Code với Opus 4.7 (1M context).*
