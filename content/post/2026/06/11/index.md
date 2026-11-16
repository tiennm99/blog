---
title: "Newsletter #111"
date: 2026-06-11
tags: ["AI-Assisted", "Newsletter", "Rust", "PostgreSQL", "LLMs", "AI Agents", "Infrastructure"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #111.*

## [Learnings from 100K Lines of Rust with AI](https://zfhuang99.github.io/rust/claude%20code/codex/contracts/spec-driven%20development/2025/12/01/rust-with-ai.html)

Cheng Huang kể lại quá trình dùng các tác nhân AI như Claude Code, Codex CLI và Copilot để hiện đại hóa Replicated State Library (RSL) của Azure — một engine đồng thuận multi-Paxos — bằng Rust. Dự án cuối cùng đạt khoảng 130 nghìn dòng mã cùng hơn 1.300 bài kiểm thử. Để AI viết đúng một hệ thống phân tán phức tạp như vậy, tác giả dựa vào "hợp đồng mã" (code contracts): AI tự viết điều kiện tiên quyết, điều kiện hậu nghiệm và bất biến cho các hàm quan trọng, dùng chúng như `assert` khi kiểm thử và làm cơ sở sinh bài kiểm thử có mục tiêu lẫn kiểm thử dựa trên thuộc tính. Nhờ vậy, một lỗi vi phạm an toàn Paxos tinh vi đã bị phát hiện trước khi lên môi trường vận hành thật.

Kỹ thuật thứ hai là phát triển theo đặc tả ở dạng gọn nhẹ: thay vì duy trì bộ tài liệu yêu cầu và thiết kế cứng nhắc, tác giả dùng lệnh `/specify` của spec-kit để tạo user story kèm tiêu chí nghiệm thu, rồi dùng `/clarify` để AI tự phản biện; mỗi user story trở thành đơn vị công việc vừa tầm để giao cho tác nhân. Kỹ thuật thứ ba là tối ưu hiệu năng: trong khoảng ba tuần, AI gắn số đo độ trễ, chạy benchmark, phân tích điểm nghẽn và đề xuất cải tiến như giảm cấp phát bộ nhớ, zero-copy, bớt tranh chấp khóa, đưa thông lượng từ khoảng 23 nghìn lên 300 nghìn thao tác mỗi giây mà Rust vẫn giữ an toàn bộ nhớ. Tác giả kết thúc bằng mong muốn AI sớm tự chạy trọn một user story, tự động hóa quy trình hợp đồng và tự tối ưu hiệu năng trên mã nguồn lớn hơn, dù con người vẫn cần giám sát kiến trúc.

## [Always Be Blaming](https://matklad.github.io/2026/05/18/always-be-blaming.html)

matklad đề xuất cách đọc hiểu mã nguồn theo nhiều "chiều". Đọc 2D là tự hình dung lời giải trước rồi so với mã thực tế để tìm điểm bất thường; đọc 3D là lần theo quá trình mã thay đổi theo thời gian, bởi phần lớn mã thực tế mang tính Markov — hình dạng của nó hôm nay phụ thuộc cả vào hình dạng hôm qua chứ không chỉ vào bài toán. Chiều thứ tư, cũng là mục tiêu cao nhất, là tái hiện được lý do và dòng suy nghĩ của người viết ban đầu — tức áp dụng khái niệm "theory of mind" vào việc đọc mã.

Để làm được điều đó, tác giả coi lịch sử git là công cụ điều tra hạng nhất. Trên GitHub, nhấn `y` để neo đường dẫn về một commit cụ thể, bật chế độ blame rồi liên tục chọn "blame prior to change", mở các commit liên quan trong tab mới và duyệt các tệp xung quanh tại đúng thời điểm đó. Khi làm cục bộ, ông dùng bộ phím tắt riêng: `,b l` để checkout commit đã tạo ra dòng hiện tại, `,b p` để lùi về commit cha, `,b u` để quay lại điểm khảo sát trước và `,b w` để sao chép liên kết GitHub. Cách "blame tại chỗ" này giữ cho LSP, lệnh kiểm thử và công cụ tìm kiếm như `rg` hoạt động bình thường. Bài viết cũng lưu ý rằng nhận xét code review — nguồn thông tin rất giá trị — lại bị nhốt trong cơ sở dữ liệu của các dịch vụ bên ngoài chứ không thuộc về kho git.

## [Scaling PostgreSQL to power 800 million ChatGPT users](https://openai.com/index/scaling-postgresql/)

Bohan Zhang chia sẻ cách OpenAI mở rộng PostgreSQL để phục vụ ChatGPT và API cho khoảng 800 triệu người dùng. Chỉ trong một năm, tải PostgreSQL tăng hơn 10 lần, nhưng hệ thống vẫn dùng một primary duy nhất trên Azure để nhận mọi thao tác ghi, cùng gần 50 read replica trải khắp nhiều khu vực. Điểm yếu lớn nhất nằm ở khối lượng ghi: cơ chế MVCC của PostgreSQL sao chép cả dòng mỗi khi cập nhật, gây khuếch đại ghi lẫn đọc, làm phình bảng và chỉ mục. Vì vậy OpenAI giảm tải cho primary tối đa, chuyển các workload ghi nhiều và dễ phân mảnh sang Azure Cosmos DB, không cho thêm bảng mới vào cụm PostgreSQL hiện tại, và chưa vội shard vì việc đó đòi hỏi sửa hàng trăm endpoint.

Phần lớn sự cố quá tải đều theo cùng một kịch bản: một vấn đề phía trên như cache miss hàng loạt, truy vấn join tốn kém hay đợt ghi dồn dập khi ra mắt tính năng mới làm độ trễ tăng, yêu cầu bị hết thời gian chờ, rồi cơ chế thử lại khuếch đại tải thành vòng luẩn quẩn. Để chặn chuỗi này, OpenAI tối ưu truy vấn, dùng PgBouncer để gộp kết nối, áp dụng cache locking tránh bão cache miss, cô lập workload theo độ ưu tiên, giới hạn tốc độ ở nhiều tầng, chỉ cho phép thay đổi schema chạy tối đa 5 giây và backfill có kiểm soát. Họ cũng đang cùng Azure thử cascading replication để tăng số replica mà không bắt primary gánh thêm việc gửi WAL. Kết quả là PostgreSQL xử lý hàng triệu truy vấn mỗi giây, giữ độ trễ p99 phía client ở mức vài chục mili giây và độ sẵn sàng five-nines.

## [Scaling Managed Agents: Decoupling the brain from the hands](https://www.anthropic.com/engineering/managed-agents)

Anthropic giải thích kiến trúc phía sau Claude Managed Agents, dịch vụ chạy tác nhân AI dài hạn do Anthropic vận hành. Xuất phát điểm là harness thường chứa các giả định về những gì mô hình chưa làm được, và những giả định đó nhanh chóng lỗi thời khi mô hình mạnh lên. Vì vậy, thay vì gói mô hình, harness, sandbox và phiên làm việc chung trong một container, Anthropic tách chúng thành ba thành phần với giao diện ổn định, tương tự cách hệ điều hành ảo hóa phần cứng: session là nhật ký sự kiện chỉ ghi nối thêm, harness là vòng lặp điều phối Claude và các lời gọi công cụ, còn sandbox là môi trường thực thi mã. Các thành phần giao tiếp qua những hàm như `execute()`, `emitEvent()`, `getSession()` và `getEvents()`.

Cách tách này biến container từ "thú cưng" phải chăm sóc thủ công thành tài nguyên có thể thay thế: sandbox hỏng chỉ là một lời gọi công cụ thất bại và có thể dựng lại, còn harness không giữ trạng thái nên khởi động lại được và tiếp tục từ nhật ký sự kiện. Một harness có thể làm việc với nhiều sandbox, kể cả kết nối vào VPC của khách hàng mà không cần peering mạng. Về bảo mật, thông tin xác thực không bao giờ nằm trong sandbox nơi mã không tin cậy chạy: token được gắn sẵn vào tài nguyên khi khởi tạo hoặc giữ trong vault và đi qua proxy, nên prompt injection khó đánh cắp được. Độ trễ cũng cải thiện rõ rệt vì suy luận bắt đầu ngay mà không chờ dựng container: thời gian tới token đầu tiên giảm khoảng 60% ở p50 và hơn 90% ở p95.

### Bonus

**Images:**
![How does Claude Code keep long sessions from running out of context?](https://substackcdn.com/image/fetch/$s_!fap_!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fc111a2c6-71bd-45a7-8938-e8bb4f772cbc_1378x1390.png)
![How does a request actually travel through Claude Code?](https://substackcdn.com/image/fetch/$s_!VfjL!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F38f19060-e838-440a-971d-bdc1f2d3a167_1280x1546.jpeg)
![Forward Proxy, Reverse Proxy, and API Gateway Explained](https://substackcdn.com/image/fetch/$s_!cqW0!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F2e0de719-d0ac-497e-8f9c-b9c841422db8_2484x3002.png)
![RAGs vs Agents](https://substackcdn.com/image/fetch/$s_!eLEi!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F52ccd4c2-dc53-4b9a-95b9-d87d6c353f88_2484x3002.png)

---

*Bài viết đã được viết lại bởi Claude Code với Opus 5.5 vào ngày 27/09/2026.*
