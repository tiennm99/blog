---
title: "Newsletter #74"
date: 2025-12-27
tags: ["AI-Assisted"]
categories: ["Newsletter"]
---

*~~Lâu rồi chưa pay 1 cái gì liên quan đến AI (từ thời Claude subscription để thử nghiệm Claude Code). Nay mới mua thử gói [GLM Coding Plan](https://z.ai/subscribe) của [Z.ai](https://z.ai) để trải nghiệm. Gói này hiện cho phép dùng model mới nhất của Z.ai là GLM-4.7. Từ nay mình sẽ tranh thủ dùng [Claude Code](https://claude.com/product/claude-code) với [Z.ai API](https://z.ai/model-api) để 'bào' cho xứng đáng số tiền bỏ ra^^.~~ Mời bạn thưởng thức Newsletter #74.*

## [Goodbye Microservices: From 100s of problem children to 1 superstar](https://www.twilio.com/en-us/blog/developers/best-practices/goodbye-microservices)

Twilio Segment chia sẻ hành trình từ hơn 100 microservices quay lại monolith. Ban đầu dùng microservices để giải quyết head-of-line blocking - tạo riêng service và queue cho từng đích đến. Nhưng khi scale lên (trung bình 3 đích/tháng), các vấn đề nảy sinh: shared libraries phân kỳ giữa codebase, mỗi service có pattern tải khác nhau khiến scale khó khăn.

Họ gộp 140+ services thành một service, chuyển về monorepo, xây dựng Traffic Recorder để test nhanh hơn. Kết quả: developer velocity tăng, operational overhead giảm. Trade-off: khó cô lập lỗi hơn, caching kém hiệu quả, nhưng với test suite vững chắc thì đáng đổi.

**Điểm chính:**
- Microservices giải quyết blocking nhưng tạo overhead lớn
- Shared libraries phân kỳ làm mất lợi ích thống nhất
- Monolith tăng velocity, giảm burden
- Traffic Recorder test nhanh hơn
- Cần test suite vững khi chuyển về monolith

## [5 engineering dogmas it's time to retire](https://newsletter.manager.dev/p/5-engineering-dogmas-its-time-to)

5 quan điểm cần xem xét lại: (1) "Đừng reinvent the wheel" - lạm dụng dependencies có rủi ro bảo mật, ví dụ left-pad (11 dòng) từng break build của Facebook/Netflix. (2) "Mọi PR phải review" - review có giá trị nhưng quy trình bắt buộc làm chậm, một số công ty để engineer tự merge và chỉ review khi cần. (3) "Sprints 2-4 tuần" - Shape Up với 6-week cycles + cool-down time là giải pháp thay thế. (4) "Feature flag cho mọi change" - lạm dụng làm codebase phức tạp, tạo cảm giác an toàn giả. (5) "Comment = code phức tạp" - cân bằng, đôi khi comment tiết kiệm nhiều thời gian.

**Điểm chính:**
- Dependencies cần cân nhắc, có rủi ro bảo mật
- Review có giá trị nhưng quy trình bắt buộc chậm
- Shape Up: 6-week cycles + cool-down
- Feature flag lạm dụng phức tạp, an toàn giả
- Comment đôi khi tiết kiệm thời gian
- Cần cân bằng dogmas với thực tế

## [What Does a Database for SSDs Look Like?](https://brooker.co.za/blog/2025/12/15/database-for-ssd.html)

Database được thiết kế riêng cho SSDs trông như thế nào? Postgres/MySQL thiết kế cho spinning disks, nhưng SSD hiện tốt hơn ~1000x. Cloud networks cũng tốt hơn 1000x. Tác giả tiếp cận qua 5 góc độ:

1. Five Minute Rule update 2025: cache giữ pages ~30 seconds cho optimal cost
2. Optimal transfer size cho SSD ~32kB
3. Durability qua distributed log, không chỉ local disk
4. Chỉ incur cross-AZ latency tại commit time
5. Use high-quality clocks cho coordination

Tóm lại, giữ relational model/SQL nhưng move durability/scale/HA thành distributed concerns, toss local durability optimizations.

**Điểm chính:**
- Cache giữ pages ~30 seconds (thay vì 5 phút năm 1986)
- Transfer size ~32kB optimal cho SSD
- Durability qua distributed log multi-AZ
- Cross-AZ latency chỉ tại commit
- Relational model giữ, distributed concerns thêm

## [The Economics of System Design: FinOps, Auto-Scaling, and Spot Instances](https://designgurus.substack.com/p/cloud-cost-optimization-101-5-strategies)

Cost optimization trong system design thường bị bỏ qua. Khoảng 30% cloud spend là waste. Inefficiencies nhỏ scale lên thành expenses lớn. 5 strategies:

1. Cost-conscious architecture: microservices trade-offs, simplicity
2. Right-sizing + auto-scaling: không over-provision, use serverless
3. Caching + query optimization: giảm database load
4. Hunt idle resources: shutdown forgotten instances
5. Monitoring + FinOps: treat cost như performance metric

Well-designed system không chỉ scalable/performant mà còn cost-efficient.

**Điểm chính:**
- 30% cloud spend là waste
- Design cost-conscious với simplicity
- Right-sizing + auto-scaling + serverless
- Caching giảm database load
- Shutdown idle resources
- Treat cost như performance metric

## [The Big-O Complexity of Vibe Coders](https://www.shiveesh.com/thoughts-and-ideas/the-big-o-complexity-of-vibe-coders)

Vibe coding (dùng LLMs để code) hiện được đánh giá bằng tốc độ, nhưng khi scale thì cost quan trọng hơn. Teams không dùng vibe coding chậm hơn, teams lạm dụng tốn nhiều tokens. Iterations không free - mỗi prompt consumes tokens = cost.

Workflow nhiều fast iterations có thể O(n²) complexity. Vague prompts expand solution space, precise prompts converge faster. Best vibe coders = lowest Big-O tokens per shipped outcome. Token-efficient vibe coding scales teams.

Exploratory/creative work inherently inefficient, không nên optimize all.

**Điểm chính:**
- Vibe coding đánh giá bằng tốc độ, cost quan trọng hơn khi scale
- Iterations consumes tokens = cost
- Workflow nhiều iterations có thể O(n²)
- Precise prompts converge nhanh hơn vague
- Best vibe coders = lowest tokens/outcome
- Exploratory work inherently inefficient

## [Design is more than code](https://linear.app/now/design-is-more-than-code)

Design không chỉ về code. Recent discourse tập trung designers có nên code không, nhưng điều này reductive. Câu hỏi lớn hơn: designers sẽ contributing như thế nào với AI và new tools?

Design process có 2 stages: designing the problem và designing the solution. Designing the problem: question the problem, không assume - most failures do unclear problem. Designing the solution: conceptual stage (tìm form) và execution stage (build nó). Code/material essential cho execution, nhưng không cho tất cả.

Tác giả worry về decline trong consideration, không phải tools. Design về finding right problem/intent/vision.

**Điểm chính:**
- Debate designers coding reductive
- Design comes in many flavors
- Process: design problem → design solution
- Question problem, không assume
- Conceptual → execution stages
- Code essential cho execution, không all
- Worry decline consideration, không tools

## [How we saved 70% CPU and 60% memory in Refinery]((https://www.honeycomb.io/blog/how-we-saved-70-cpu-60-memory-refinery)

Honeycomb optimize Refinery telemetry pipeline: giảm 70% CPU và 60% memory. Root cause là dynamic attributes calculation - parse attributes nhiều lần, create intermediate allocations inefficiencies.

Refactor: (1) Parse attributes chỉ một lần early, (2) Reuse parsed data, (3) Eliminate intermediate allocations, (4) Use efficient data structures.

Profiling trước khi optimize critical - find bottlenecks first. Trade-off: code phức tạp hơn, harder maintain, nhưng performance gains justify trong case này.

**Điểm chính:**
- High resource usage do attributes calculation
- Parse multiple times, intermediate allocations inefficient
- Refactor: parse once, reuse, eliminate allocations
- Result: 70% CPU, 60% memory reduction
- Profiling trước khi optimize
- Trade-off: phức tạp hơn nhưng worth it

## [From Junior to Senior: 7 API Design Patterns That Scale]((https://designgurus.substack.com/p/from-junior-to-senior-7-api-design)

7 architectural decisions cho scalable APIs - khác biệt junior/senior. Junior focus logic, senior focus system communication. API là critical component của distributed systems.

1. Resource-Oriented Design (RESTful) thay vì Action-Based (RPC): think resources (nouns), không actions (verbs). Predictability là valuable trait.
2. Proper HTTP Status Codes: 2xx/4xx/5xx categories matter cho debugging
3. Pagination: Offset (beginner) vs Cursor (scalable, O(1))
4. Idempotency Keys prevent duplicate charges
5. Rate Limiting protects từ overload
6. API Versioning prevents breaking clients
7. Documentation critical với OpenAPI/Swagger

Good API design = stable foundation, poor design = bottleneck.

**Điểm chính:**
- Junior focus logic, senior focus communication
- RESTful (resources) thay vì RPC (actions)
- HTTP status codes categories matter
- Cursor pagination scalable hơn offset
- Idempotency keys prevent duplicates
- Rate limiting protects overload
- Versioning prevents breaking clients
- Documentation critical

## Bonus

### Images

![Evolution of HTTP](https://substackcdn.com/image/fetch/$s_!3GQA!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F82f1e76a-8fbf-4e8f-b030-e20037c66f70_3000x3900.png)
![System Performance Metrics Every Engineer Should Know](https://substackcdn.com/image/fetch/$s_!Zyn0!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F063ae714-8714-4695-8b0e-16a765c5c1a8_2360x2960.png)
![Why Is Nginx So Popular?](https://substackcdn.com/image/fetch/$s_!ta7a!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fe42382d5-9be5-443a-9f75-56ecfa22569c_2360x2960.png)
![Network Debugging Commands Every Engineer Should Know](https://substackcdn.com/image/fetch/$s_!sXIK!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa25e1401-cc6f-49f1-9ed1-6f093a01ac6c_2360x2664.png)
![Hub, Switch, & Router Explained](https://substackcdn.com/image/fetch/$s_!BXWB!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F09a8b52f-2b80-4762-92cd-c5d18d5a7a3c_2360x2960.png)

**Đánh giá**: *Z.ai xử lý 1 url tương đối nhanh, ban đầu mình cũng thấy khá ok, tuy nhiên thêm càng nhiều thì có vẻ càng bị dài & lạm dụng tiếng Anh. Mình đã phải yêu cầu tóm gọn lại một xíu. Hi vọng sẽ cải thiện được sau (vì lỡ mua rùi và non-refundable hiuhiu)*

---

*Bài viết đã được review và cập nhật bởi Claude Code với Opus 4.7 (1M context).*
