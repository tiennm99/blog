---
title: "Newsletter #89"
date: 2026-03-14
tags: ["AI-Assisted", "Newsletter", "AI Agents", "Go", "Rate Limiting", "Error Handling", "Java"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #89.*

## [Hybrid Quota-Linear Rate Limiter](https://dotat.at/@/2026-01-12-hqlr.html)

Tony Finch phân tích một vấn đề phổ biến với các thuật toán giới hạn tốc độ (rate limiter) tuyến tính như leaky bucket và GCRA: chúng có xu hướng "hào phóng" hơn mức cần thiết trong giai đoạn khởi động, cho phép client gửi khoảng `q*a/(a-1)` yêu cầu trước khi bị giới hạn khi hoạt động ở tốc độ gấp `a` lần cho phép.

Để giải quyết vấn đề này, tác giả đề xuất một thuật toán lai hoạt động ở hai chế độ: **chế độ bursty** dành cho các client có lưu lượng thấp, cho phép gửi theo đợt nhưng giới hạn tối đa một quota token mỗi cửa sổ thời gian; và **chế độ smooth** dành cho client có lưu lượng cao, buộc phân phối yêu cầu đều đặn hơn. Thuật toán tự chuyển đổi giữa hai chế độ khi client tiêu hết quota hoặc khi bucket phục hồi hoàn toàn. Cách tiếp cận này sử dụng ít bộ nhớ hơn so với phương pháp quota-reset, đồng thời kiểm soát quota chặt chẽ hơn so với rate limiter tuyến tính thuần túy.

Tuy nhiên, điểm thú vị là tác giả cuối cùng khuyên **không nên** dùng thuật toán phức tạp này. Thay vào đó, hãy cân nhắc lại bài toán để có thể sử dụng một rate limiter tuyến tính đơn giản như GCRA — vì việc đo tốc độ trung bình theo thời gian dài tự nhiên khuyến khích client hoạt động mượt mà hơn.

**Điểm chính:**
- Rate limiter tuyến tính (GCRA, leaky bucket) có thể cho phép nhiều yêu cầu hơn dự kiến trong giai đoạn khởi động
- Thuật toán lai kết hợp chế độ bursty và smooth để kiểm soát chặt chẽ hơn
- Đơn giản hóa vẫn là ưu tiên hàng đầu: GCRA đủ tốt cho hầu hết các trường hợp thực tế

## [Go is the Best Language for AI Agents](https://getbruin.com/blog/go-is-the-best-language-for-agents/)

Burak Karakan — CEO của Bruin, người có 8 năm kinh nghiệm lập trình Go — lập luận rằng Go là ngôn ngữ lý tưởng để phát triển phần mềm bằng AI agent. Lý do cốt lõi xuất phát từ bản chất của ngôn ngữ biên dịch: khi agent tạo ra mã nguồn Go bị lỗi, trình biên dịch sẽ trả về thông báo lỗi rõ ràng ngay lập tức, tạo vòng phản hồi nhanh và chính xác để agent tự sửa lỗi. Điều này khác hoàn toàn so với Python hay JavaScript — vốn chỉ báo lỗi khi chạy thực tế.

Hệ thống kiểu tĩnh của Go cũng là một lợi thế lớn: agent có thể xác minh tính đúng đắn của mã trước khi chạy, thay vì phải phụ thuộc vào các bài kiểm thử thủ công. So với Rust — ngôn ngữ biên dịch khác — Go vẫn chiếm ưu thế nhờ cú pháp đơn giản hơn, tốc độ biên dịch nhanh hơn, và lượng mã Go trong dữ liệu huấn luyện của các mô hình AI lớn hơn đáng kể. Ngoài ra, bộ kiểm thử của Go chạy cực nhanh và hoạt động nhất quán trên mọi hệ điều hành, giúp các background agent có thể xác nhận kết quả công việc mà không phụ thuộc vào môi trường chạy cụ thể.

**Điểm chính:**
- Go biên dịch nhanh và báo lỗi rõ ràng giúp AI agent có vòng phản hồi ngắn để tự sửa lỗi
- Kiểu tĩnh và cú pháp đơn giản giảm thiểu sai sót trong mã do agent tạo ra
- Go chạy nhất quán trên mọi nền tảng — lợi thế lớn cho background agent và môi trường sandbox

## [Your Agent Needs a Harness, Not a Framework](https://x.com/djfarrelly/status/2028556984396452250)

Dan Farrelly từ Inngest.com đưa ra một góc nhìn sắc bén về kiến trúc AI agent: thay vì dùng framework, agent cần một "harness" — lớp kết nối, bảo vệ và điều phối các thành phần mà không làm thay công việc của chúng. Trong mọi ngành kỹ thuật, harness đều có vai trò như vậy: dây điện nối các cảm biến, test harness cung cấp giàn giáo kiểm thử, dây an toàn giữ bạn khi ngã. Agent runtime cũng cần điều tương tự.

Vấn đề hiện tại là mỗi framework agent lại tự xây dựng lại từ đầu: retry logic, lưu trạng thái, job queue, định tuyến sự kiện. Thay vào đó, hãy dùng hạ tầng event-driven bền vững đã sẵn có — mỗi lần gọi LLM hay công cụ trở thành một "step" có thể thử lại độc lập. Nếu tiến trình chết ở vòng lặp thứ năm, bốn vòng trước đã được lưu lại. Nhóm tác giả đã xây dựng **Utah** (Universally Triggered Agent Harness) để minh chứng: một agent hội thoại qua Telegram/Slack với công cụ, bộ nhớ, ủy quyền sub-agent và khả năng chịu lỗi — chỉ dùng Inngest, không framework. Bài học quan trọng rút ra: quản lý ngữ cảnh (context management) mới là thử thách thực sự, không phải việc gọi LLM.

**Điểm chính:**
- Agent cần "harness" để xử lý retry, trạng thái, concurrency — không phải thêm framework
- Mỗi lần gọi LLM/công cụ là một step độc lập, có thể thử lại mà không mất kết quả trước
- Quản lý ngữ cảnh (cắt bớt, nén lịch sử, cảnh báo ngân sách) là thách thức lớn nhất khi xây agent thực tế

## [An Interactive Intro to Quadtrees](https://growingswe.com/blog/quadtrees)

Bài viết tương tác giải thích quadtree — cấu trúc dữ liệu dùng để tìm kiếm không gian 2D hiệu quả. Vấn đề đặt ra: khi xây dựng ứng dụng bản đồ với hàng triệu địa điểm, cách đơn giản nhất là tính khoảng cách từ vị trí người dùng đến từng điểm rồi lọc ra những điểm đủ gần — nhưng với hàng triệu điểm, cách này quá chậm.

Quadtree giải quyết bài toán bằng cách chia không gian thành 4 ô con khi một ô chứa quá nhiều điểm (vượt ngưỡng capacity), tạo thành cây phân cấp. Khi truy vấn, chỉ cần đệ quy vào các ô giao với vùng tìm kiếm — bỏ qua hoàn toàn phần còn lại. Tham số capacity điều chỉnh sự cân bằng: capacity thấp tạo cây sâu, bỏ qua nhiều vùng hơn nhưng tốn bộ nhớ; capacity cao tạo cây nông, tiết kiệm bộ nhớ nhưng mỗi ô cần duyệt tuyến tính nhiều điểm hơn. Ngoài tìm kiếm địa lý (Uber dùng để tìm tài xế gần nhất), quadtree còn ứng dụng trong phát hiện va chạm game (broad-phase collision detection) và nén ảnh theo vùng.

**Điểm chính:**
- Quadtree chia không gian 2D thành 4 ô con đệ quy, giúp bỏ qua vùng không liên quan khi truy vấn
- Tham số capacity (thường từ 4–16) ảnh hưởng trực tiếp đến độ sâu cây và hiệu năng truy vấn
- Ứng dụng thực tế: tìm kiếm địa lý, phát hiện va chạm trong game, nén ảnh theo vùng

## [Agentic Engineering Patterns](https://simonwillison.net/guides/agentic-engineering-patterns/)

Simon Willison — tác giả blog kỹ thuật nổi tiếng — ra mắt một hướng dẫn toàn diện về các mẫu thiết kế (pattern) khi làm việc với AI agent trong lập trình. Điều đáng chú ý là hướng dẫn phân biệt rõ ràng giữa "agentic engineering" và "vibe coding": vibe coding là để LLM viết mã mà không cần giám sát, còn agentic engineering là kỹ sư chuyên nghiệp dùng agent để khuếch đại chuyên môn sẵn có của mình — không phải thay thế nó.

Một số pattern nổi bật: **"Viết mã giờ rất rẻ"** — chi phí sinh mã gần như bằng không, buộc phải định nghĩa lại "mã tốt" là mã có kiểm thử, tài liệu, xử lý lỗi đúng chuẩn; **"Tích lũy những gì bạn đã biết làm"** — duy trì kho ví dụ hoạt động được (blog, repo, POC) để dùng làm đầu vào cho agent, vì biết rằng điều gì đó khả thi khác với đã tự mình làm được; **"Red/green TDD"** — viết kiểm thử trước, xác nhận kiểm thử thất bại, rồi mới triển khai, đảm bảo agent tạo ra mã đúng chức năng và tối giản. Hướng dẫn được cập nhật liên tục mỗi tuần với 1–2 chương mới.

**Điểm chính:**
- Agentic engineering là khuếch đại chuyên môn kỹ sư, không phải để LLM viết mã không kiểm soát
- Tích lũy ví dụ hoạt động được là tài sản nghề nghiệp quan trọng khi làm việc với agent
- Red/green TDD giúp agent tạo mã tối giản, đúng chức năng và có lưới an toàn kiểm thử

## [Things I Miss About Spring Boot After Switching to Go](https://sushantdhiman.dev/things-i-miss-about-spring-boot-after-switching-to-go/)

Sushant Dhiman chia sẻ góc nhìn thực tế sau khi chuyển từ Spring Boot sang Go. Dù Go có nhiều ưu điểm, tác giả thừa nhận có những thứ trong Spring Boot mà Go chưa thể thay thế dễ dàng. Trước hết là triết lý "batteries included" của Spring Boot — hầu hết tính năng cần thiết cho môi trường production đều có sẵn và tích hợp chặt chẽ với nhau.

Cụ thể, tác giả nhớ nhất: **Dependency Injection** tự động qua annotation (`@Service`, `@Autowired`) thay vì phải tự nối dây thủ công qua constructor trong Go; **validation khai báo** với `@NotNull`, `@Email` thay vì viết điều kiện kiểm tra thủ công; và hệ sinh thái trưởng thành gồm Spring Security (xác thực JWT, OAuth), Spring Data (tự sinh câu truy vấn từ tên phương thức), Spring Boot Actuator (giám sát sức khỏe tích hợp sẵn), Spring Cloud (hỗ trợ microservices). Go có các thư viện tương đương nhưng thiếu sự gắn kết thống nhất trong một framework duy nhất.

**Điểm chính:**
- Spring Boot tích hợp sẵn dependency injection, validation khai báo và hệ sinh thái production-ready
- Go theo triết lý tối giản — linh hoạt hơn nhưng đòi hỏi tự lắp ráp nhiều thành phần hơn
- Cả hai có đánh đổi rõ ràng: Spring Boot tiện lợi hơn, Go đơn giản và hiệu năng cao hơn

## [Design-First Collaboration with AI](https://martinfowler.com/articles/reduce-friction-ai/design-first-collaboration.html)

Bài viết từ martinfowler.com giới thiệu phương pháp cộng tác "design-first" với AI để tránh "Implementation Trap" — bẫy mà AI sinh mã quá nhanh khiến các quyết định thiết kế quan trọng bị chôn vùi trong mã nguồn, và lập trình viên chỉ phát hiện ra bất đồng khi đọc lại mã — lúc đó đã quá tốn kém để sửa.

Giải pháp là khung năm cấp độ, không được viết mã cho đến khi cấp độ 5 được phê duyệt: **(1) Capabilities** — yêu cầu cốt lõi; **(2) Components** — các khối xây dựng và trừu tượng; **(3) Interactions** — luồng dữ liệu và giao tiếp; **(4) Contracts** — chữ ký hàm và interface; **(5) Implementation** — viết mã. Mỗi cấp độ chỉ kiểm tra một loại quyết định, giảm tải nhận thức đáng kể so với việc xem xét tất cả cùng lúc. Mức độ phức tạp quyết định điểm bắt đầu — tiện ích đơn giản có thể bắt đầu từ cấp 4, tính năng phức tạp bắt đầu từ cấp 1.

**Điểm chính:**
- Đừng để AI viết mã trước khi thống nhất thiết kế — phát hiện bất đồng sớm rẻ hơn rất nhiều
- Khung 5 cấp độ tách biệt từng loại quyết định thiết kế, giảm tải nhận thức khi xem xét
- Phương pháp này tạo điều kiện tự nhiên cho TDD và ngăn chặn "technical debt injection"

## [The Two Kinds of Error](https://evanhahn.com/the-two-kinds-of-error/)

Evan Hahn đề xuất một cách phân loại lỗi đơn giản nhưng hữu ích: lỗi **expected** (có thể xảy ra trong vận hành bình thường, không phải lỗi của lập trình viên) và lỗi **unexpected** (chỉ xảy ra khi có bug). Lỗi expected bao gồm: đầu vào của người dùng không hợp lệ, mất kết nối mạng, thiếu quyền truy cập — đây là lỗi có thể phục hồi, nên trả về kết quả lỗi và ghi log ở mức `WARN` hoặc `INFO`. Lỗi unexpected bao gồm: vi phạm assertion, logic sai, dependency chưa khởi tạo — đây là dấu hiệu của bug thực sự, nên log ở mức `ERROR` hoặc `FATAL`, thậm chí nên để chương trình crash hoàn toàn.

Ranh giới giữa hai loại phụ thuộc vào ngữ cảnh: ứng dụng thử nghiệm có thể coi mọi lỗi là unexpected, hệ thống quan trọng (tàu vũ trụ) phải coi gần mọi thứ đều có thể xảy ra. Điều quan trọng là lập trình viên phải **có ý thức** phân loại từng lỗi thay vì xử lý tất cả theo cùng một cách.

**Điểm chính:**
- Lỗi expected (mạng, đầu vào người dùng) nên được phục hồi và log WARN/INFO
- Lỗi unexpected (bug, logic sai) nên log ERROR/FATAL và có thể crash chương trình
- Phân loại có ý thức giúp thiết kế xử lý lỗi rõ ràng và đúng mức độ nghiêm trọng

## [Secure Go Error Handling Best Practices](https://blog.jetbrains.com/go/2026/03/02/secure-go-error-handling-best-practices/)

Blog JetBrains GoLand tập trung vào một khía cạnh thường bị bỏ qua: xử lý lỗi an toàn bảo mật trong Go. Nguyên tắc cốt lõi là **tách biệt thông tin nội bộ và thông tin công khai** — tạo kiểu lỗi tùy chỉnh chứa cả thông báo nội bộ (chi tiết kỹ thuật cho lập trình viên) và thông báo công khai (thông báo an toàn cho người dùng), tránh việc lỗi nội bộ bị serialized ra HTTP response.

Các thực hành quan trọng: dùng **builder pattern** để kiểm soát trường metadata nào được ghi log, tránh ghi toàn bộ đối tượng request có thể chứa mật khẩu hay token; dùng **opaque wrapping** thay vì `fmt.Errorf` khi không muốn lộ chi tiết triển khai cho phía gọi; và khi truyền lỗi qua ranh giới dịch vụ, chuyển đổi sang lỗi chuẩn hóa (gRPC codes, JSON format), không bao giờ để lỗi do AI sinh ra tiếp cận API công khai. Logging nên dùng `log/slog` với structured logging và implement interface redaction cho các trường nhạy cảm.

**Điểm chính:**
- Tách lỗi thành thông báo nội bộ (kỹ thuật) và công khai (an toàn) để tránh rò rỉ thông tin
- Kiểm soát chặt metadata được ghi log, không ghi toàn bộ request object
- API công khai chỉ trả về thông báo tĩnh, định nghĩa sẵn — không bao giờ lỗi được sinh động

## [AI Coding Tools, Java & Compounding Engineering](https://www.the-main-thread.com/p/ai-coding-tools-java-compounding-engineering)

Bài viết tổng hợp từ buổi nói chuyện tại NDC Manchester 2025, với luận điểm cốt lõi: "Nếu AI tạo ra mã tệ cho bạn, đó thường là vấn đề workflow, không phải vấn đề mô hình." Phương pháp được đề xuất là **Compounding Engineering** — huấn luyện AI như người cộng tác theo thời gian, tương tự onboard lập trình viên junior.

Các yếu tố chính: xóa chat thường xuyên và lưu quyết định kiến trúc vào file markdown (như `CLAUDE.md`) thay vì cố duy trì ngữ cảnh trong một cuộc trò chuyện dài; cập nhật "living rule files" mỗi khi sửa bug để lỗi không tái diễn; lên kế hoạch trước khi viết mã để phát hiện giả định sai ngay từ đầu; chia tính năng thành các tác vụ nhỏ, tập trung một trách nhiệm. Kỹ sư senior đóng góp giá trị qua **taste** — khả năng đánh giá kiến trúc và đánh đổi, điều mà AI giỏi sinh mã nhưng yếu phán xét chất lượng. Kết quả tích lũy theo thời gian; không đầu tư vào workflow thì chỉ có "mediocrity nhanh hơn".

**Điểm chính:**
- Mã AI kém chất lượng thường do workflow kém, không phải do mô hình
- Lưu quyết định kiến trúc vào file markdown, cập nhật khi sửa bug để kiến thức tích lũy
- Giá trị của kỹ sư senior nằm ở khả năng phán xét kiến trúc — thứ AI chưa làm tốt

## [YAML? That's Norway Problem](https://lab174.com/blog/202601-yaml-norway/)

Bài viết khám phá một lỗi phân tích cú pháp thú vị trong YAML: mã quốc gia `NO` (Na Uy) bị các trình phân tích cú pháp phổ biến chuyển thành giá trị boolean `false` thay vì chuỗi ký tự. Nguyên nhân là YAML xử lý một số từ tiếng Anh như `yes/no`, `true/false`, `on/off` dưới dạng giá trị boolean — tính năng này được giới thiệu từ YAML v1.0 (2004) nhằm làm cho tệp cấu hình dễ đọc hơn.

Dù YAML v1.2 (2009) đã loại bỏ hành vi này để tương thích với JSON, hầu hết các thư viện phổ biến như PyYAML và LibYAML vẫn triển khai theo đặc tả v1.1 — tạo ra khoảng cách lớn giữa tiêu chuẩn và thực tế sau hơn 15 năm. Người dùng có thể tránh vấn đề này bằng cách đặt chuỗi trong dấu ngoặc kép (`"NO"`), dùng thẻ kiểu tường minh (`!!str`), hoặc chuyển sang thư viện tương thích v1.2 như `ruamel.yaml` hay `yq`.

**Điểm chính:**
- `NO` trong YAML bị hiểu là `false` do quy tắc boolean từ đặc tả v1.1
- YAML v1.2 đã sửa lỗi này từ năm 2009 nhưng hầu hết thư viện chưa cập nhật
- Giải pháp: dùng dấu ngoặc kép, thẻ `!!str`, hoặc thư viện tương thích v1.2

---

*Bài viết đã được review và cập nhật bởi Claude Code với Opus 4.7 (1M context).*
