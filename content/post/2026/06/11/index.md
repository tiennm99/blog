---
title: "Newsletter #111"
date: 2026-06-11
tags: ["AI-Assisted", "Newsletter", "Rust", "PostgreSQL", "LLMs", "AI Agents", "Infrastructure"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #111.*

## [Bài học từ 100K dòng Rust viết cùng AI](https://zfhuang99.github.io/rust/claude%20code/codex/contracts/spec-driven%20development/2025/12/01/rust-with-ai.html)

Cheng Huang chia sẻ hành trình dùng các tác nhân AI (Claude Code, Codex CLI, Copilot...) để xây dựng một engine multi-Paxos bằng Rust trong khoảng 6 tuần, đạt 130K dòng mã và 1.300+ bài kiểm thử. Bài viết tập trung vào ba kỹ thuật cốt lõi giúp AI viết mã hệ thống phân tán phức tạp một cách đúng đắn: **code contracts**, **spec-driven development gọn nhẹ** và **tối ưu hiệu năng tự động**.

**Code contracts — do AI viết, cho AI dùng:** tác giả yêu cầu AI (đặc biệt là GPT-5 High) viết các điều kiện tiên quyết, điều kiện hậu quả và bất biến cho các hàm quan trọng. Những hợp đồng này vừa chạy như `assert` lúc kiểm thử, vừa được AI dùng để sinh test mục tiêu và test dựa trên thuộc tính. Chính nhờ vậy, một lỗi an toàn Paxos tinh vi đã được phát hiện sớm — trước khi vào production.

**Spec-driven development gọn nhẹ:** thay vì lúc nào cũng duy trì bộ tài liệu yêu cầu/thiết kế/nhiệm vụ cứng nhắc, tác giả dùng lệnh `/specify` từ spec-kit để tạo user story cho từng tính năng, sau đó dùng `/clarify` để AI tự phản biện. Mỗi user story trở thành đơn vị công việc "vừa đủ" để giao cho agent, giúp cân bằng giữa kiểm soát kiến trúc và tốc độ.

**Tối ưu hiệu năng tự động:** trong 3 tuần, thông lượng tăng từ ~23K lên ~300K ops/sec. Vòng lặp là: AI gắn metric độ trễ → chạy benchmark → phân tích bottleneck bằng script Python → đề xuất và áp dụng tối ưu (giảm cấp phát, zero-copy, bỏ lock, bỏ async thừa). Bài viết cũng nêu "wish list": cho AI chạy user story end-to-end, tự động hóa quy trình contract, và tự thực hiện tối ưu hiệu năng giống dự án AlphaEvolve.

**Điểm chính:**
- Code contracts do AI viết kết hợp property-based test là lớp phòng thủ mạnh cho hệ thống phân tán.
- User story ngắn gọn (kèm `/clarify`) là đơn vị công việc "vừa đủ" cho các tác nhân AI hiện nay.
- Tối ưu hiệu năng có thể tự động hóa phần lớn qua vòng lặp đo lường → phân tích → chỉnh sửa.
- Rust giúp tự tin tối ưu tới cấp bộ nhớ mà vẫn an toàn nhờ hệ thống ownership.
- Vẫn cần con người giám sát kiến trúc, review hợp đồng và xử lý các vấn đề đúng đắn sâu.

## [Luôn "đổ lỗi" — kỹ năng đọc hiểu mã 4D](https://matklad.github.io/2026/05/18/always-be-blaming.html)

matklad đề xuất một khung đọc hiểu mã nguồn gồm 4 chiều: 2D là đọc mã ở một thời điểm cố định, 3D là truy vết mã thay đổi theo thời gian, và chiều thứ tư là hiểu *tại sao* tác giả gốc lại viết như vậy. Ông nhấn mạnh mục tiêu thật sự khi đọc code không phải là "phát hiện bug" mà là tái hiện được dòng suy nghĩ của người đã viết ra nó — đây chính là áp dụng khái niệm "theory of mind" trong kỹ thuật phần mềm.

Bài viết cũng chỉ ra giới hạn của `git blame` truyền thống: nó trả lời câu hỏi không gian "mỗi dòng xuất hiện ở đâu" thay vì câu hỏi thời gian "đoạn mã này đã tiến hóa thế nào". matklad mô tả hai cách làm hiệu quả hơn: dùng giao diện blame trên web của GitHub với phím tắt `y` để neo mọi tệp về cùng một commit, hoặc chuyển "in-place" sang commit lịch sử trong một worktree khảo cổ — nhờ vậy LSP, lệnh build/test, `rg` đều hoạt động bình thường. Tác giả chia sẻ bộ phím tắt cá nhân (`,b l` để blame dòng hiện tại, `,b p` để về commit cha, `,b u` để undo) và cảnh báo rằng nhận xét code review — thông tin cực kỳ giá trị — lại bị nhốt trong cơ sở dữ liệu riêng của các dịch vụ, không thuộc về repository git.

**Điểm chính:**
- Đọc mã 4D: hiểu cả *cái gì* (2D), *tiến hóa thế nào* (3D) và *vì sao* (chiều tư) của đoạn mã.
- "Theory of mind" giúp tái hiện dòng suy nghĩ của tác giả gốc — vượt xa việc chỉ soi bug.
- `git blame` cổ điển trả lời câu hỏi không gian; cần chuyển sang neo theo thời gian để khảo cổ mã hiệu quả.
- Dùng worktree khảo cổ riêng + phím tắt in-place giữ cho LSP và công cụ build vẫn chạy mượt.
- Nhận xét code review cần được đưa trở lại repository git thay vì bị nhốt trong dịch vụ bên thứ ba.

## [OpenAI scale PostgreSQL để phục vụ 800 triệu người dùng ChatGPT](https://openai.com/index/scaling-postgresql/)

Bohan Zhang chia sẻ cách OpenAI mở rộng PostgreSQL cho các workload đọc rất lớn của ChatGPT và API. Trong một năm, tải PostgreSQL tăng hơn 10 lần, nhưng hệ thống vẫn giữ kiến trúc một primary duy nhất cho ghi, kết hợp gần 50 read replica trên nhiều khu vực. Thay vì vội shard PostgreSQL hiện hữu, OpenAI giảm áp lực lên primary, chuyển các workload ghi nhiều và dễ shard sang Azure Cosmos DB, tối ưu truy vấn, dùng PgBouncer để pooling kết nối, và triển khai cache locking để tránh bão cache miss làm sập cơ sở dữ liệu.

Bài viết cũng nhấn mạnh các giới hạn thực tế của PostgreSQL ở quy mô này: MVCC gây write/read amplification khi ghi nhiều, replica càng nhiều thì primary càng tốn tài nguyên gửi WAL, và schema change nhỏ cũng có thể nguy hiểm nếu đụng bảng lớn. Vì vậy OpenAI áp dụng rate limit ở nhiều tầng, cô lập workload theo độ ưu tiên, giới hạn schema migration trong 5 giây, backfill có kiểm soát, và đang hợp tác với Azure để thử cascading replication. Kết quả là PostgreSQL xử lý hàng triệu QPS cho workload đọc nhiều, duy trì p99 client-side latency ở mức vài chục mili giây và five-nines availability.

**Điểm chính:**
- PostgreSQL vẫn có thể phục vụ workload đọc cực lớn nếu primary được bảo vệ tốt và read replica được khai thác đúng cách.
- Các rủi ro lớn đến từ write spike, query đắt, cache miss storm, retry storm, connection storm và schema migration thiếu kiểm soát.
- PgBouncer, cache locking, workload isolation và rate limiting là các lớp bảo vệ quan trọng trước khi nghĩ tới sharding.
- Sharding hệ thống PostgreSQL hiện hữu có chi phí rất cao; OpenAI chọn chuyển dần workload ghi nhiều sang hệ thống shardable trước.
- Cascading replication là hướng tiếp theo để mở rộng số lượng read replica mà không làm primary quá tải.

## [Managed Agents: tách bộ não khỏi đôi tay](https://www.anthropic.com/engineering/managed-agents)

Anthropic giải thích kiến trúc phía sau Claude Managed Agents, dịch vụ chạy các tác nhân AI dài hạn theo kiểu hosted. Luận điểm chính là các harness thường chứa nhiều giả định về việc mô hình chưa làm được gì, nhưng các giả định đó nhanh chóng lỗi thời khi model mạnh hơn. Vì vậy, thay vì gắn chặt model, harness, sandbox và session trong một container duy nhất, Anthropic thiết kế Managed Agents quanh các interface ổn định: session là log sự kiện bền vững, harness là vòng lặp điều phối Claude và tool call, còn sandbox là môi trường thực thi nơi Claude chạy mã hoặc sửa file.

Cách tách này giải quyết nhiều vấn đề vận hành. Container sandbox không còn là một máy chủ "pet" phải chăm sóc thủ công; nếu hỏng, harness chỉ xem đó là lỗi tool call và có thể provision sandbox mới. Harness cũng stateless hơn vì session log nằm bên ngoài, nên có thể khởi động lại và resume từ event log. Về bảo mật, credential không nằm trong sandbox nơi mã không tin cậy chạy; token được gắn với resource hoặc giữ trong vault, còn MCP tool đi qua proxy chuyên trách. Kiến trúc này cũng cải thiện latency: vì brain không cần chờ container được dựng sẵn, Anthropic cho biết p50 time-to-first-token giảm khoảng 60% và p95 giảm hơn 90%.

**Điểm chính:**
- Harness cho agent dễ lỗi thời vì nó mã hóa giới hạn của model tại một thời điểm cụ thể.
- Managed Agents tách session, harness và sandbox thành các interface độc lập để có thể thay thế từng phần.
- Session log bền vững giúp khôi phục harness sau crash và cho phép truy vấn lại ngữ cảnh ngoài context window.
- Credential không được đặt trong sandbox; tool và MCP dùng proxy/vault để giảm rủi ro prompt injection.
- Tách "brain" khỏi "hands" giúp giảm thời gian phản hồi đầu tiên và mở đường cho nhiều brain làm việc với nhiều môi trường thực thi.

### Bonus

**Images:**
![How does Claude Code keep long sessions from running out of context?](https://substackcdn.com/image/fetch/$s_!fap_!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fc111a2c6-71bd-45a7-8938-e8bb4f772cbc_1378x1390.png)
![How does a request actually travel through Claude Code?](https://substackcdn.com/image/fetch/$s_!VfjL!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F38f19060-e838-440a-971d-bdc1f2d3a167_1280x1546.jpeg)
![Forward Proxy, Reverse Proxy, and API Gateway Explained](https://substackcdn.com/image/fetch/$s_!cqW0!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F2e0de719-d0ac-497e-8f9c-b9c841422db8_2484x3002.png)
![RAGs vs Agents](https://substackcdn.com/image/fetch/$s_!eLEi!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F52ccd4c2-dc53-4b9a-95b9-d87d6c353f88_2484x3002.png)
