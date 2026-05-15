---
title: "Newsletter #31"
date: 2025-05-18
tags: ["AI-Assisted", "Technology", "Software Development", "Career Growth", "AI", "Hiring", "Engineering", "DevOps"]
categories: ["Newsletter"]
draft: false
---

*Chào mừng bạn đến với Newsletter #31.*

## [Optimizing Our E2E Pipeline](https://slack.engineering/speedup-e2e-testing/)

Bài viết từ đội ngũ kỹ sư Slack chia sẻ cách họ tối ưu hóa quy trình kiểm thử end-to-end (E2E) bằng cách giảm thiểu việc build frontend không cần thiết. Giải pháp thông minh này đã giúp tiết kiệm đáng kể thời gian và tài nguyên.

**Điểm chính:**
- Slack phát hiện ra rằng 50% các lần build frontend là không cần thiết vì không có thay đổi gì về mã nguồn frontend
- Họ đã xây dựng cơ chế tự động phát hiện thay đổi frontend sử dụng `git diff` để quyết định có cần build lại hay không
- Khi không cần build mới, hệ thống sẽ sử dụng bản build sẵn có từ AWS S3 thông qua CDN nội bộ
- Kết quả ấn tượng: giảm 60% số lần build không cần thiết, tiết kiệm hàng trăm giờ mỗi tháng và giảm thiểu lưu trữ dư thừa
- Tổng thời gian build trung bình giảm từ 10 phút xuống còn 2 phút nhờ dự án này và các cải tiến trước đó

---

## [DoorDash's Fast Travel Estimates](https://careersatdoordash.com/blog/doordash-fast-travel-estimates/)

Bài viết từ DoorDash Careers Blog chia sẻ về cách công ty cải thiện độ chính xác của ước tính thời gian giao hàng thông qua việc áp dụng các kỹ thuật học máy tiên tiến. DoorDash đã phát triển một hệ thống mới để dự đoán thời gian di chuyển chính xác hơn, giúp cải thiện trải nghiệm của cả người giao hàng và khách hàng.

**Điểm chính:**
- DoorDash đã phát triển một mô hình học máy mới để dự đoán thời gian di chuyển chính xác hơn
- Hệ thống mới xem xét nhiều yếu tố như điều kiện giao thông, thời tiết, và các sự kiện đặc biệt
- Việc cải thiện độ chính xác của ước tính thời gian giúp tăng sự hài lòng của người giao hàng
- Khách hàng cũng được hưởng lợi từ việc nhận được thông tin thời gian giao hàng chính xác hơn
- Công nghệ này là một phần trong nỗ lực liên tục của DoorDash để cải thiện trải nghiệm giao hàng

---

## [Tech Hiring: Is This an Inflection Point?](https://blog.pragmaticengineer.com/tech-hiring-is-this-an-inflection-point/)

Bài viết từ The Pragmatic Engineer phân tích những thay đổi đáng chú ý trong quy trình tuyển dụng công nghệ hiện nay. Mặc dù có vẻ như việc tuyển dụng kỹ sư đang trở nên dễ dàng hơn do ít doanh nghiệp đăng tuyển và nhiều ứng viên cạnh tranh, thực tế lại cho thấy điều ngược lại.

**Điểm chính:**
- Các phương pháp tuyển dụng từ xa truyền thống không còn hiệu quả như trước đây
- Sự gia tăng của các ứng viên "giả mạo" và việc sử dụng công cụ AI trong quá trình phỏng vấn
- Nhiều công ty đang xem xét quay lại phỏng vấn trực tiếp để đảm bảo chất lượng tuyển dụng
- Các công ty đang tăng cường dựa vào giới thiệu từ nhân viên hiện tại
- Chi phí tuyển dụng qua LinkedIn đang tăng cao (5-20K USD/tháng/recruiter)
- Một số công ty đang thử nghiệm phương pháp "tuần thử việc" có trả lương
- Cần phải tái cấu trúc quy trình tuyển dụng từ xa trong thời đại AI

---

## [Underusing Snapshot Testing](https://matklad.github.io/2025/04/15/underusing-snapshot-testing.html)

Bài viết từ blog của Aleksey Kladov (tác giả của Rust Analyzer) thảo luận về việc sử dụng snapshot testing một cách hiệu quả. Tác giả đề xuất một cách tiếp cận đơn giản nhưng mạnh mẽ để kiểm thử bằng cách so sánh kết quả đầu ra với giá trị đã biết trước được lưu trữ trong mã nguồn.

**Điểm chính:**
- Snapshot testing giúp phát triển phần mềm linh hoạt hơn bằng cách dễ dàng cập nhật các kiểm thử khi yêu cầu thay đổi
- Công cụ này đặc biệt hữu ích khi làm việc với các cấu trúc dữ liệu phức tạp
- Tác giả minh họa cách sử dụng snapshot testing để kiểm thử một hàm mã hóa hoán vị (permutation encoding)
- Phương pháp này giúp tiết kiệm thời gian debug bằng cách hiển thị kết quả trực tiếp trong mã nguồn
- Bài viết còn bao gồm một bài kiểm tra toàn diện để xác nhận tính chính xác của hàm mã hóa hoán vị

---

## [Principles for coding securely with LLMs](https://www.seangoedecke.com/ai-security/)

Bài viết từ blog của Sean Goedecke đưa ra những nguyên tắc quan trọng để phát triển phần mềm an toàn khi làm việc với các mô hình ngôn ngữ lớn (LLMs). Tác giả chỉ ra rằng việc mã hóa an toàn với LLMs đòi hỏi một cách tiếp cận khác biệt so với lập trình truyền thống.

**Điểm chính:**
- Prompt injection là một rủi ro không thể tránh khỏi khi sử dụng LLMs, đòi hỏi việc xử lý đầu ra như dữ liệu không đáng tin cậy
- Các công cụ LLM cần được kiểm soát quyền truy cập như một API tiếp xúc với người dùng
- Máy chủ MCP (Model Context Protocol) có thể tiềm ẩn rủi ro về chuỗi cung ứng giống như các thư viện bên thứ ba
- Ngay cả khi được sử dụng đơn lẻ, LLMs vẫn có thể thực hiện những hành động không mong muốn hoặc nguy hiểm
- Các mô hình không được cân chỉnh tốt có thể chứa thông tin nhạy cảm hoặc hành động độc hại
- Các ứng dụng LLM dễ bị tấn công từ chối dễ dễch vụ (DoS) do tính chất tốn nhiều tài nguyên của chúng

---

## [How I don't use LLMs](https://www.gleech.org/llms)

Bài viết từ gleech.org chia sẻ góc nhìn cá nhân về cách tác giả sử dụng (và không sử dụng) các mô hình ngôn ngữ lớn (LLMs) trong công việc và cuộc sống. Tác giả trình bày lý do tại sao họ hạn chế sử dụng LLM và trong những trường hợp cụ thể nào chúng thực sự hữu ích.

**Điểm chính:**
- Tác giả thường xuyên thất vọng với những lỗi cơ bản mà LLMs mắc phải, dẫn đến việc hạn chế sử dụng chúng
- Một số lý do chính khiến tác giả ít dùng LLM: đã có kiến thức nền vững, cần độ chính xác cao, không thích văn phong được tạo ra bởi AI
- Các trường hợp hữu ích khi sử dụng LLM: tìm kiếm thông tin, gợi ý từ khóa tìm kiếm, giải thích từ viết tắt, định dạng dữ liệu
- Tác giả đặc biệt đánh giá cao khả năng hỗ trợ lập trình, đặc biệt với các thư viện ít quen thuộc
- Bài viết phản ánh một góc nhìn cân bằng về việc sử dụng LLM: công nhận tiềm năng nhưng cũng chỉ ra những hạn chế rõ ràng

---

## [How Senior Software Engineers Can Learn from Junior Engineers](https://www.infoq.com/news/2025/04/software-engineers-learning/)

Bài viết từ InfoQ thảo luận về cách các kỹ sư phần mềm kỳ cựu có thể học hỏi từ những đồng nghiệp trẻ tuổi hơn. Theo Beth Anderson, một môi trường làm việc với sự phân cấp quá cứng nhắc có thể kìm hãm sự đổi mới và hạn chế sự hợp tác hiệu quả.

**Điểm chính:**
- Các kỹ sư kỳ cựu nên tạo môi trường an toàn về tâm lý để đồng nghiệp trẻ có thể thoải mái đóng góp ý kiến
- Nhân viên trẻ thường có góc nhìn mới mẻ và kỹ năng cập nhật, đóng góp giá trị cho đội nhóm
- Việc lắng nghe tích cực và đánh giá cao ý kiến đóng góp của mọi người giúp xây dựng văn hóa làm việc tích cực
- Các kỹ sư kỳ cựu nên khuyến khích phản hồi ngược lại từ nhân viên trẻ để cải thiện cách giao tiếp
- Mỗi cá nhân dù ở cấp độ nào cũng có những hiểu biết độc đáo để chia sẻ

---

## [As an engineer, I'd rather be called stupid than stay silent](https://shiftmag.dev/asking-questions-engineering-career-advice-4895/)

Bài viết trên ShiftMag chia sẻ góc nhìn chân thực về hành trình vượt qua hội chứng kẻ mạo danh (imposter syndrome) trong ngành công nghệ. Tác giả kể lại trải nghiệm cá nhân khi phải đối mặt với những tình huống không hiểu vấn đề nhưng ngại đặt câu hỏi vì sợ bị đánh giá là "ngu ngốc".

**Điểm chính:**
- Sợ bị coi là ngốc nghếch khiến nhiều kỹ sư ngại đặt câu hỏi, dẫn đến hiểu lầm và hiệu suất công việc kém
- Việc dũng cảm đặt câu hỏi "ngu ngốc" thực chất là chìa khóa để học hỏi và phát triển nghề nghiệp
- Môi trường làm việc lý tưởng là nơi mọi người được khuyến khích đặt câu hỏi mà không sợ bị phán xét
- Tác giả đã chuyển đổi từ vai trò Kỹ sư Hỗ trợ Khách hàng lên Kỹ sư Vận hành Đáng tin cậy nhờ dám đặt câu hỏi
- Văn hóa không đổ lỗi (blameless culture) giúp nhân viên cảm thấy an toàn khi đặt câu hỏi và thừa nhận điểm yếu

---

*Bài viết đã được review và cập nhật bởi Claude Code với Opus 4.7 (1M context).*
