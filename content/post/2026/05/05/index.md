---
title: "Newsletter #102"
date: 2026-05-05
tags: ["AI-Assisted", "AI Agents", "GitHub Actions", "Software Engineering", "Database", "System Design", "Productivity"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #102.*

## [A GitHub agentic workflow](https://blog.frankel.ch/agentic-github-workflows/)

Bài viết của Nicolas Fränkel giới thiệu về GitHub agentic workflow, một tính năng tương đối mới cho phép tự động hóa các tác vụ phức tạp, bán cấu trúc thông qua AI agent thay vì các workflow xác định truyền thống. Đây là giải pháp lý tưởng cho việc xử lý dữ liệu phi cấu trúc hoặc bán cấu trúc, vốn khó xử lý bằng các phương pháp tự động hóa thông thường.

Tác giả chia sẻ trường hợp thực tế khi nhóm của ông duy trì một sản phẩm dài hạn với nhiều phiên bản, và phải tổng hợp thủ công thông tin về các tính năng bị deprecate qua các bản phát hành. Quá trình này tốn nhiều công sức và dễ phát sinh lỗi vì phải xem xét cẩn thận release notes, code annotation và tài liệu plugin. Agentic workflow giúp giải quyết bài toán này một cách hiệu quả nhờ khả năng phân tích nội dung do con người viết.

**Điểm chính:**
- Triển khai gồm ba giai đoạn: khởi tạo bằng `gh aw init`, phát triển workflow dưới dạng Markdown, và biên dịch sang YAML bằng `gh aw compile`
- Cần `GITHUB_COPILOT_TOKEN` với quyền fine-grained, cụ thể là quyền truy cập "Copilot requests"
- Một số trở ngại thường gặp: quên biên dịch Markdown sang YAML trước khi push, xung đột quyền khi tự động hóa quá trình biên dịch, khác biệt nền tảng (Windows vs Ubuntu)
- Hạn chế: không thể sử dụng các action từ GitHub Marketplace bên trong agentic workflow
- Agentic workflow không thay thế tự động hóa xác định hiện có, mà mở ra khả năng mới cho việc xử lý nội dung mơ hồ do con người tạo ra

## [The 20 Software Engineering Laws](https://newsletter.techworld-with-milan.com/p/the-20-software-engineering-laws)

Bài viết của Dr Milan Milanović trình bày 20 nguyên lý nền tảng giúp giải thích vì sao các dự án phần mềm thất bại, vì sao đội ngũ mất đà và hệ thống xuống cấp theo thời gian. Tác giả nhấn mạnh rằng các định luật này, nhiều cái đã có từ hàng chục năm trước, mô tả các mô hình về cách con người cộng tác trong các ràng buộc, chứ không phải là những quy tắc bắt buộc.

Các định luật được nhóm theo nhiều khía cạnh: thiết kế hệ thống (Gall's Law, KISS, Conway's Law, Hyrum's Law, CAP Theorem), động lực đội ngũ (Brooks's Law, Ringelmann Effect, Price's Law), lập kế hoạch và ước lượng (Hofstadter's Law, Dunning-Kruger, Parkinson's Law), đo lường (Goodhart's Law, Gilb's Law), hiệu năng và độ tin cậy (Knuth's Optimization Principle, Amdahl's Law, Murphy's Law), và triết lý thiết kế (Postel's Law, Sturgeon's Law, Cunningham's Law). Tác giả minh họa bằng các tình huống thực tế như Instagram thành công nhờ tinh giản từ Burbn (Gall's Law), Google Wave thất bại do làm quá nhiều thứ cùng lúc, sân bay Berlin Brandenburg ước lượng 18 tháng nhưng kéo dài 7 năm và tiêu tốn 7 tỷ euro (Hofstadter's Law), hay sự cố CrowdStrike năm 2024 khiến 8.5 triệu máy Windows bị crash (Murphy's Law).

**Điểm chính:**
- Các định luật này tồn tại lâu dài vì chúng liên quan đến bản chất con người, không phải công nghệ cụ thể
- Đôi khi các định luật mâu thuẫn nhau, cần phán đoán để biết áp dụng cái nào trong từng tình huống
- Hiểu các định luật trước khi vấn đề xảy ra giúp tiết kiệm tài nguyên và tránh lặp lại sai lầm
- Thành công đòi hỏi nhận biết khi nào mỗi định luật được áp dụng và đưa ra quyết định có chủ đích
- Khuyến khích phát triển danh sách cá nhân các mô hình đã quan sát được thay vì chỉ dựa vào nguyên lý có sẵn

## [Databases Were Not Designed For This](https://arpitbhayani.me/blogs/defensive-databases/)

Arpit Bhayani lập luận rằng kiến trúc database truyền thống dựa trên những giả định ngầm bị các hệ thống AI agent vi phạm hoàn toàn. Hợp đồng truyền thống giả định "bên gọi là một ứng dụng do con người viết, chạy mã xác định" với các thao tác ghi có chủ đích và kết nối ngắn. AI agent phá vỡ mô hình này ở mọi tầng.

Bài viết chỉ ra năm giả định bị phá vỡ: bên gọi xác định (agent tạo truy vấn không thể đoán trước dựa trên suy luận), ghi có chủ đích (agent ghi tự động không qua review), kết nối ngắn (tác vụ suy luận nhiều bước giữ kết nối mở qua các lần LLM tạm dừng), thất bại rõ ràng (agent có thể âm thầm tiếp tục với dữ liệu không đầy đủ), và schema như hợp đồng (schema database trở thành hợp đồng với LLM). Để giải quyết, tác giả đề xuất các kỹ thuật phòng vệ: statement timeout cấp role (5 giây), connection pool riêng cho agent, PgBouncer transaction pooling, soft delete với `deleted_by` truy vết danh tính agent, bảng event log append-only, idempotency key bắt buộc, query comment nhúng ID agent và task, view giám sát hiệu năng theo agent, kiến trúc role-per-agent-type với quyền tối thiểu cần thiết.

**Điểm chính:**
- Database truyền thống không được thiết kế cho bên gọi không xác định và tự động như AI agent
- Sử dụng connection pool tách biệt cho agent với fast-fail timeout để khuyến khích backoff
- Soft delete và append-only log giúp khôi phục khi agent suy luận sai và ghi nhầm
- Idempotency key là bắt buộc để tránh ghi trùng khi agent retry
- Query comment chứa thông tin agent giúp truy vết và giám sát các thao tác
- Áp dụng nguyên tắc least-privilege ở cấp database thay vì dựa vào suy luận của tầng ứng dụng
- Các pattern này không phải công cụ mới, mà là chuyển từ "best practice" sang "hạ tầng tải trọng" khi làm việc với agent

## [Finishing Things](https://ratfactor.com/finishing-things)

Bài viết là một bài luận cá nhân sâu sắc về hành trình của tác giả trong việc hoàn thành các dự án cá nhân và duy trì thói quen làm việc hiệu quả bất chấp những bất ổn của cuộc sống. Đây không phải là một hướng dẫn theo công thức, mà là sự xem xét trung thực về những gì hiệu quả và không hiệu quả khi muốn hoàn thành công việc.

Tác giả từ bỏ các tuyên bố theo năm như "Năm của Microcontroller" hay "Năm của Thử Cái Mới" sau khi nhận ra rằng các thử thách lớn trong cuộc sống và những gián đoạn từ bên ngoài khiến việc lập kế hoạch cứng nhắc trở nên vô ích. Thay vào đó, tác giả dùng một "project stack" bằng giấy Post-It trong khung trưng bày nhỏ, dự án mới đặt lên đầu stack và chỉ làm việc trên dự án trên cùng. Hệ thống LIFO này giúp tránh tê liệt vì quá nhiều lựa chọn và tự nhiên cho phép các "side quest" phát sinh. Tác giả cũng đề cập đến cảm giác hư vô khi chứng kiến các hệ thống AI được đào tạo dựa trên sáng tạo của con người, và cách phản ứng của ông là cố tình bỏ qua mối đe dọa này và tiếp tục sáng tạo.

**Điểm chính:**
- Hoàn thành công việc đòi hỏi chấp nhận rằng kế hoạch hoàn hảo là bất khả thi
- Làm việc tăng dần (incremental) hiệu quả hơn là chờ cảm hứng bùng nổ
- Duy trì kết nối tâm lý với dự án trong giai đoạn khô hạn bằng cách tương tác nhỏ như đọc file dự án, chỉnh sửa tài liệu
- Khái niệm "sphere of control" - phạm vi kiểm soát mở rộng và co lại theo hoàn cảnh sống hiện tại
- Một số trở ngại không phải là khó khăn mà là sự khó chịu (sợ gọi điện thoại, không chắc về kết quả)
- "Năm của Tiến Bộ Chậm và Liên Tục" thay vì mục tiêu thành tựu cụ thể

### Bonus

**Images:**
![Data Warehouse vs Data Lake vs Data Mesh](https://substackcdn.com/image/fetch/$s_!9kS2!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F71595c9b-f94f-4ae8-851e-ea4f07342c29_2484x3002.png)
![API Concepts Every Software Engineer Should Know](https://substackcdn.com/image/fetch/$s_!U4gw!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8e8297aa-f856-4b2b-af5d-986023db89e7_2508x3000.png)
![Polling vs Long Polling vs Webhooks vs SSE](https://substackcdn.com/image/fetch/$s_!SAsk!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F7616a6b1-8eb6-4dc3-9456-b0e57bc9b0ee_2484x3002.png)
![SLA vs SLO vs SLI](https://substackcdn.com/image/fetch/$s_!SJN6!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F47ce48f1-06e7-4663-b822-96cc7d1307d0_2484x3002.png)

---

*Bài viết đã được review và cập nhật bởi Claude Code với Opus 4.7 (1M context).*
