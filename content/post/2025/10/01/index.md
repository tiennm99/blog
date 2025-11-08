---
title: "Newsletter #58"
date: 2025-10-01
tags: ["AI-Assisted", "Technology", "Productivity", "Decision Making", "Software Engineering", "Career Development", "Event-Driven", "Distributed Systems", "System Design", "Developer Culture", "Curiosity", "Innovation", "AI", "LLM", "Tool Calls", "Security", "Logging", "Data Protection", "Leadership", "Communication", "AI Coding", "Code Generation", "Claude Code", "Anthropic"]
categories: ["Newsletter"]
---

*Hôm nay mình có thử gắn [Claude Code Router](https://github.com/musistudio/claude-code-router) với model `openai/gpt-oss-120b` trên [NVIDIA NIM](https://build.nvidia.com/) nhưng bị lỗi gì đấy, sau cùng thì không được output gì. Vì vậy chúng ta lại quay lại với model `qwen3-coder` chạy trên [iFlow Platform](https://platform.iflow.cn/docs/api-mode) nhé. Mời bạn thưởng thức Newsletter #58.*

## [How Software Engineers Make Productive Decisions (without slowing the team down)](https://strategizeyourcareer.com/p/how-software-engineers-make-productive-decisions)

Khi làm việc trong một team phát triển phần mềm, kỹ sư phần mềm thường đứng trước những quyết định hàng ngày mà có thể ảnh hưởng đến tiến độ và chất lượng của dự án. Tuy nhiên, quá trình ra quyết định đôi khi lại trở thành nỗi ám ảnh khi engineer dành quá nhiều thời gian để phân tích và cân nhắc, thay vì hành động.

Bài viết này giới thiệu một cách tiếp cận thực tế để cải thiện năng suất ra quyết định. Thay vì coi mọi quyết định đều quan trọng như nhau, chúng ta nên phân biệt giữa những quyết định dạng "cửa một chiều" (rủi ro, khó đảo ngược) và "cửa hai chiều" (an toàn, có thể quay đầu).

Để xác định loại quyết định nào đang đứng trước, bài viết đề xuất một framework 3 câu hỏi đơn giản:

1. **Tác động nếu sai là gì?** - Xác định hậu quả là nhỏ, vừa hoặc thảm họa
2. **Khó khăn khi quay lại là gì?** - Nếu dễ dàng đảo ngược, có thể tiến hành nhanh chóng
3. **Có thể giảm thiểu rủi ro với phạm vi nhỏ không?** - Sử dụng feature flags, canaries và cảnh báo

Với những quyết định dạng "cửa hai chiều", engineer có thể tự tin tiến hành nhanh chóng mà không cần sự phê duyệt từ nhiều người. Việc áp dụng các kỹ thuật như feature flags, small pull requests, và rollback nhanh giúp duy trì tốc độ mà không làm giảm chất lượng.

**Điểm chính:**
- Phân biệt giữa quyết định "cửa một chiều" và "cửa hai chiều" để tối ưu hóa thời gian ra quyết định
- Framework 3 câu hỏi giúp đánh giá mức độ rủi ro của quyết định một cách nhanh chóng
- Sử dụng các công cụ kỹ thuật để giảm thiểu rủi ro và tăng tốc độ thực thi
- Tập trung sự thận trọng vào những quyết định thực sự quan trọng như bảo mật và toàn vẹn dữ liệu

## [Why are Event-Driven Systems Hard?](https://newsletter.scalablethread.com/p/why-event-driven-systems-are-hard)

Kiến trúc event-driven đang ngày càng phổ biến trong các hệ thống phân tán hiện đại nhờ khả năng mở rộng và tính đàn hồi cao. Tuy nhiên, việc triển khai và duy trì các hệ thống này lại không hề đơn giản. Bài viết phân tích những thách thức chính mà các kỹ sư phần mềm phải đối mặt khi làm việc với event-driven systems.

Một trong những vấn đề cốt lõi là **quản lý phiên bản định dạng message**. Khi hệ thống phát triển, các service có thể gửi các event schema được cập nhật mà các service cũ không thể hiểu được, dẫn đến gián đoạn giao tiếp. Để giải quyết vấn đề này, cần áp dụng các chiến lược như tương thích ngược/tiến và sử dụng schema registries.

Khó khăn khác là **khả năng quan sát và gỡ lỗi**. Khác với các hệ thống tuyến tính, luồng yêu cầu trong kiến trúc event-driven bị phân tán khắp các service. Để gỡ lỗi hiệu quả, cần sử dụng **distributed tracing** với **correlation IDs** để theo dõi events xuyên suốt các service.

Vấn đề về **xử lý lỗi và mất message** cũng thường xuyên xảy ra do các sự cố hạ tầng. Hầu hết các hệ thống đảm bảo **giao message ít nhất một lần**, nhưng điều này có thể dẫn đến xử lý trùng lặp. **Dead-Letter Queues (DLQs)** giúp cách ly các message có vấn đề để tránh ảnh hưởng toàn hệ thống.

**Idempotency** là một yêu cầu quan trọng để xử lý message trùng lặp. Các service phải được thiết kế sao cho việc xử lý cùng một message nhiều lần không gây ra tác dụng phụ không mong muốn. Điều này thường được thực hiện bằng cách theo dõi các event ID đã xử lý.

Cuối cùng, **eventual consistency** là một đặc điểm của hệ thống event-driven, nơi dữ liệu được cập nhật bất đồng bộ, dẫn đến tình trạng không nhất quán tạm thời. Các ứng dụng phải được thiết kế để chịu được độ trễ này.

**Điểm chính:**
- Event-driven systems mang lại tính đàn hồi và linh hoạt nhưng đi kèm nhiều thách thức
- Quản lý phiên bản message và đảm bảo tương thích là vấn đề phức tạp
- Distributed tracing và correlation IDs là thiết yếu để gỡ lỗi
- Idempotency là yêu cầu bắt buộc để xử lý message trùng lặp
- Eventual consistency là đặc điểm cần được cân nhắc khi thiết kế hệ thống

## [Dev Culture Is Dying: The Curious Developer Is Gone](https://dayvster.com/blog/dev-culture-is-dying-the-curious-developer-is-gone/)

Văn hóa phát triển phần mềm đang trải qua một sự thay đổi đáng buồn theo quan điểm của bài viết. Trước đây, các lập trình viên xây dựng các công cụ như Linux và Git xuất phát từ niềm đam mê và sự tò mò cá nhân, chứ không phải vì lợi nhuận hay danh tiếng.

Ngày nay, nhiều developer theo đuổi các framework mới không phải vì sự hứng thú thực sự, mà là do áp lực phải thể hiện mình là người có liên quan. Sự thay đổi này có nguy cơ ngăn chặn đổi mới, vì động lực nội tại bị thay thế bằng sự công nhận từ bên ngoài.

> "Có điều gì đó cần được nói về việc học mà không có mục đích rõ ràng… bạn bắt đầu hành trình chỉ vì bạn tò mò."

Bài viết cảnh báo về việc các developer ngày nay xác định bản thân theo công cụ họ sử dụng hơn là các vấn đề họ giải quyết:

> "Bạn trở thành một Next.js developer, một React developer… Bạn bắt đầu xác định bản thân bằng các công cụ bạn sử dụng thay vì các vấn đề bạn giải quyết."

Tác giả kêu gọi sự trở lại của việc tò mò khám phá và các dự án cá nhân, khuyến khích các developer xây dựng vì chính họ trước, không cần lo lắng về quy mô hay khả năng kiếm tiền.

> "Hãy tạo ra điều gì đó tuyệt vời, điều gì đó độc đáo… xây dựng vì bạn muốn, vì nó làm bạn hạnh phúc."

Bài viết than thở về sự suy giảm của tinh thần chủ sở hữu—không chỉ cho người dùng, mà cả cho những người sáng tạo có thể bán đi hoặc mất quyền kiểm soát tầm nhìn ban đầu của họ.

> "Họ có quan tâm đến phần mềm họ xây dựng hay chỉ đơn giản quan tâm đến các chỉ số, doanh thu, tăng trưởng?"

Cuối cùng, bài viết thúc giục các developer lấy lại sự tò mò, sáng tạo và niềm vui khi xây dựng chỉ vì lý do xây dựng.

**Điểm chính:**
- Văn hóa phát triển phần mềm đã chuyển từ đam mê sang hướng đến chỉ số và doanh thu
- Các developer ngày nay thường xác định bản thân theo công cụ hơn là vấn đề họ giải quyết
- Sự tò mò và động lực nội tại đang bị thay thế bởi sự công nhận từ bên ngoài
- Cần trở lại với tinh thần khám phá và xây dựng dự án cá nhân
- Quan trọng là phải giữ được niềm vui khi lập trình vì bản thân nó

## [Tool Calls Are Expensive And Finite](https://www.reillywood.com/blog/tool-calls-are-expensive-and-finite/)

Tool calls trong các hệ thống AI cho phép các LLM vượt ra ngoài việc sinh text bằng cách tương tác với các hàm bên ngoài. Tuy nhiên, chúng đi kèm với chi phí đáng kể và những hạn chế.

Theo Reilly Wood giải thích, "việc gọi một tool tốn kém hơn rất nhiều so với việc gọi một hàm thông thường từ code." Điều này là bởi vì mỗi tool call đều liên quan đến việc tạo ra text có cấu trúc, chiếm dụng tokens và không gian trong context window.

Về mặt kỹ thuật, một tool call hoạt động như sau:
1. Model tạo ra một message chỉ định tên tool và các tham số.
2. Hệ thống phân tích message này và thực thi hàm thực tế.
3. Kết quả được đưa lại vào context của model như một message mới.

Quá trình này có nghĩa là "toàn bộ kết quả của mỗi tool call đều kết thúc trong context window," khiến cho việc gọi nhiều lần trở nên tốn kém. Ví dụ, một agent cố gắng xử lý 100 user IDs thông qua các tool call riêng lẻ có thể làm cạn kiệt context window trước khi hoàn thành nhiệm vụ.

Wood nhấn mạnh rằng "mọi người nên hiểu rằng... sẽ luôn có giới hạn về số lượng tool call mà một agent có thể thực hiện một cách hiệu quả."

Để giải quyết những hạn chế này, các developer nên thiết kế các tool linh hoạt hơn hoặc cân nhắc để các agent tạo và chạy code thay thế, đồng thời lưu ý đến các rủi ro bảo mật.

**Điểm chính:**
- Tool calls trong AI tốn kém hơn nhiều so với các hàm thông thường
- Mỗi tool call chiếm dụng không gian trong context window
- Việc gọi nhiều tool call có thể làm cạn kiệt context window
- Cần thiết kế các tool linh hoạt hơn để tối ưu hiệu suất
- Cần cân nhắc giữa hiệu suất và rủi ro bảo mật khi sử dụng tool calls

## [Keeping Secrets Out of Logs](https://allan.reyes.sh/posts/keeping-secrets-out-of-logs/)

Allan Reyes thảo luận về các chiến lược để ngăn chặn dữ liệu nhạy cảm bị ghi lại trong log của các hệ thống phần mềm. Ông nhấn mạnh rằng không có giải pháp duy nhất ("silver bullet") mà cần áp dụng nhiều cách tiếp cận lớp layers ("lead bullets").

Các nguyên nhân chính khiến secrets xuất hiện trong log bao gồm:
- Ghi trực tiếp dữ liệu nhạy cảm vào log
- Logging các đối tượng lớn ("kitchen sinks") chứa secrets
- Thay đổi cấu hình làm tăng mức độ chi tiết của log
- Secrets được nhúng trong URL hoặc các định dạng khác
- Các công cụ telemetry thu thập biến cục bộ
- Lỗi nhập liệu của người dùng (ví dụ: nhập mật khẩu vào ô tên người dùng)

Các giải pháp chính bao gồm:
- **Domain primitives:** Tạo các kiểu hoặc lớp riêng biệt cho secrets để có thể theo dõi và kiểm soát.
- **Read-once objects:** Bọc secrets để chỉ có thể truy cập một lần, ngăn ngừa việc sử dụng lại vô tình.
- **Taint checking:** Sử dụng phân tích tĩnh để theo dõi luồng dữ liệu nhạy cảm trong hệ thống.
- **Log formatters:** Làm sạch hoặc loại bỏ dữ liệu nhạy cảm trước khi xuất log.
- **Preventive testing:** Cấu hình test để thất bại khi phát hiện secrets trong log.
- **Log pre-processors:** Các công cụ quét và loại bỏ dữ liệu nhạy cảm khỏi log trước khi lưu trữ.

Cách tiếp cận chiến lược bao gồm:
1. Xây dựng nền tảng với văn hóa và công cụ phù hợp
2. Hiểu cách dữ liệu chảy qua hệ thống
3. Bảo vệ các "điểm nghẽn" chính nơi log được tạo ra hoặc xử lý
4. Áp dụng bảo vệ nhiều lớp với nhiều lớp bảo vệ
5. Lập kế hoạch cho ứng phó và phục hồi sự cố

Reyes kết luận rằng mặc dù vấn đề này tồn tại dai dẳng và phức tạp, nhưng cách tiếp cận có hệ thống sử dụng nhiều kỹ thuật có thể giảm đáng kể nguy cơ rò rỉ secrets trong log.

**Điểm chính:**
- Không có giải pháp đơn lẻ cho vấn đề secrets trong log
- Cần áp dụng nhiều lớp bảo vệ để đảm bảo an toàn
- Các nguyên nhân phổ biến bao gồm logging trực tiếp và cấu hình sai
- Giải pháp bao gồm domain primitives, read-once objects và taint checking
- Cần có chiến lược toàn diện từ phòng ngừa đến ứng phó sự cố

## [Things I Believe](https://leerob.com/beliefs)

Lee Robinson chia sẻ những niềm tin và nguyên tắc cốt lõi của ông:

- **Phát hành nhanh:** Tốc độ là một sức mạnh siêu nhiên; các team nhỏ, thân thiện với AI sẽ phát hành nhanh hơn. Sự áp dụng quan trọng hơn là việc ra mắt.
- **Phát triển sự nghiệp:** Sự kiên trì và cải thiện hàng ngày (1%) thắng hơn tài năng. Thời gian đầu tư sẽ được cộng dồn theo thời gian.
- **Tìm kiếm sự thật:** Hãy cởi mở để thay đổi suy nghĩ. Giờ tiếp xúc và hiểu biết thực tế quan trọng hơn dữ liệu trừu tượng.
- **Giao tiếp:** Viết rõ ràng phản ánh suy nghĩ rõ ràng. Các nhà lãnh đạo cung cấp sự rõ ràng và lường trước các phản đối trong giao tiếp.
- **Marketing dành cho developer:** Sự chân thật và giáo dục hiệu quả hơn marketing truyền thống. Việc hữu ích tạo ra giá trị dài hạn.
- **Lãnh đạo:** Ảnh hưởng và sở hữu công việc vượt qua chức danh định nghĩa lãnh đạo. Ủy quyền, nhưng cũng tự mình làm công việc.
- **Đam mê công việc:** Công việc có thể trở thành sở thích khi được thúc đẩy bởi sự tò mò và cân bằng với ranh giới, không phải là sự cân bằng huyền thoại giữa công việc và cuộc sống.
- **Thực thi:** Các bản demo và prototype có giá trị hơn memo dài dòng. Hãy phát hành những gì khiến bạn hào hứng.
- **Tuyển dụng:** Các nhà lãnh đạo giỏi tuyển dụng dựa trên tiềm năng phát triển và học hỏi, không chỉ kỹ năng hiện tại. Hãy hỏi ứng viên về công việc họ tự hào nhất.
- **Đồng cảm:** Giả định ý định tốt đẹp. Dẫn đầu bằng sự đồng cảm và lắng nghe phản biện một cách khách quan.

**Điểm chính:**
- Tốc độ là sức mạnh siêu nhiên trong phát triển phần mềm
- Sự kiên trì và cải tiến hàng ngày quan trọng hơn tài năng bẩm sinh
- Giao tiếp rõ ràng phản ánh suy nghĩ rõ ràng
- Lãnh đạo không chỉ là chức danh mà là ảnh hưởng và sở hữu công việc
- Cần có sự cân bằng giữa công việc và cuộc sống cá nhân

## [How Claude Code is Built](https://newsletter.pragmaticengineer.com/p/how-claude-code-is-built)

Claude Code, một công cụ phát triển được hỗ trợ bởi AI, được tạo ra bởi Boris Cherny tại Anthropic vào năm 2024. Ban đầu nó là một công cụ terminal sử dụng Claude để tương tác với hệ thống của người dùng, bắt đầu chỉ là xác định các bản nhạc. Tiềm năng của nó được mở rộng khi nó có quyền truy cập vào filesystem và các lệnh bash, cho phép khám phá code một cách tự động.

Các khía cạnh chính trong việc phát triển và kiến trúc của Claude Code bao gồm:

- **Công nghệ:** Được xây dựng với TypeScript, React, Ink, Yoga, và Bun. Bộ công nghệ này được chọn vì khả năng tương thích với Claude ("on distribution"), cho phép công cụ tự tạo khoảng 90% code của nó.

- **Kiến trúc:** Được thiết kế đơn giản, Claude Code hoạt động cục bộ mà không cần ảo hóa. Nó giảm thiểu logic nghiệp vụ, để mô hình AI xử lý hầu hết các tác vụ. Giao diện người dùng được giữ tối giản để tránh hạn chế tiềm năng của mô hình.

- **Hệ thống phân quyền:** Hệ thống nhiều cấp tìm kiếm sự chấp thuận của người dùng cho các hành động nhạy cảm, với tùy chọn duy trì quyền truy cập giữa các phiên. Nó sử dụng phân tích tĩnh để đánh giá các lệnh dựa trên cài đặt do người dùng xác định.

- **Tạo mẫu nhanh:** Đội ngũ xây dựng và thử nghiệm nhiều mẫu nhanh chóng, lặp lại dựa trên phản hồi. Ví dụ, Boris đã thử nghiệm hơn 20 biến thể của tính năng danh sách việc cần làm trong chỉ hai ngày bằng cách sử dụng các thành phần UI do AI tạo ra.

- **Đổi mới UX Terminal:** Claude Code nâng cao tương tác terminal với các tính năng như các phần tử UI tương tác, kiểu đầu ra (ví dụ: chế độ giải thích hoặc học tập) và chỉ báo tiến độ thời gian thực.

- **Subagents & Khả năng mở rộng:** Các tính năng như subagents và hỗ trợ cho Model Context Protocol (MCP) cho phép khả năng mô-đun và mở rộng. Hooks cho phép các lệnh shell tùy chỉnh.

- **Tính năng doanh nghiệp:** Bao gồm thiết lập IAM, phân tích và tùy chọn cấu hình toàn đội.

- **Kỹ thuật hướng AI:** Đội ngũ tận dụng AI cho đánh giá code, kiểm thử và phản hồi sự cố, góp phần vào chu kỳ phát triển nhanh hơn và tăng năng suất. Dữ liệu nội bộ cho thấy mức tăng 67% trong hiệu suất PR sau khi áp dụng Claude Code.

Claude Code đại diện cho sự thay đổi hướng tới kỹ thuật phần mềm hướng AI, nhấn mạnh lặp nhanh, scaffolding tối thiểu và tích hợp sâu với khả năng AI.

**Điểm chính:**
- Claude Code là công cụ phát triển AI được tạo ra bởi Anthropic vào năm 2024
- Được xây dựng với TypeScript, React, Ink, Yoga và Bun để tương thích với Claude
- Kiến trúc đơn giản hoạt động cục bộ mà không cần ảo hóa
- Hệ thống phân quyền nhiều cấp với tùy chọn duy trì quyền truy cập
- Tận dụng AI để tạo mẫu nhanh và giao diện người dùng
- Hỗ trợ subagents và Model Context Protocol (MCP) cho khả năng mở rộng
- Đội ngũ sử dụng AI cho đánh giá code, kiểm thử và phản hồi sự cố
- Đại diện cho sự thay đổi hướng tới kỹ thuật phần mềm hướng AI

## Bonus: Một vài ảnh hay ho đến từ [ByteByteGo](https://bytebytego.com/)

![How Java Works](https://substack-post-media.s3.amazonaws.com/public/images/1e27232c-d4f1-4f4b-94fa-7318d39f6f3e_2360x2960.png)
![How Gitflow Branching Works?](https://substack-post-media.s3.amazonaws.com/public/images/9bef6181-7eed-45a9-9c7e-abd6864cc62b_2360x2960.png)
![The Life of a Redis Query](https://substack-post-media.s3.amazonaws.com/public/images/9ffab5bc-5857-4544-8e25-2dbf795e6f85_3000x3900.png)
![Cookies vs Sessions](https://substack-post-media.s3.amazonaws.com/public/images/1c2bd03d-66f2-4eb9-8293-7a1d49b9b9b6_2360x2920.png)
![Access Control Clearly Explained](https://substack-post-media.s3.amazonaws.com/public/images/26b55058-17ae-453f-8463-4d4e717e489b_2360x2920.png)
![How Git Reset Works?](https://substack-post-media.s3.amazonaws.com/public/images/00912640-ad5f-4ec7-aefa-e5eecf67dab0_3000x3900.png)
![Apache Kafka Explained (At the high level)](https://substack-post-media.s3.amazonaws.com/public/images/43b73739-a975-42af-999d-8676b1605ed2_3000x3900.png)
