---
title: "Newsletter #113"
date: 2026-06-24
tags: ["AI-Assisted", "Newsletter", "Rust", "AI Engineering", "Infrastructure", "Performance", "Database"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #113.*

## [Di chuyển từ Go sang Rust: chọn đúng lý do và đúng phạm vi](https://corrode.dev/learn/migration-guides/go-to-rust/)

Matthias Endler viết một hướng dẫn dài cho các nhóm backend đang cân nhắc chuyển dịch vụ từ Go sang Rust. Điểm chính không phải là Rust luôn nhanh hơn Go, mà là Rust đưa nhiều rủi ro vào hệ thống kiểu: `nil`, xử lý lỗi, data race, lifetime tài nguyên và ownership. Go tối ưu cho tốc độ triển khai, compile nhanh, standard library mạnh và mô hình goroutine dễ dùng; Rust đổi lại bằng compiler nghiêm ngặt hơn, không có GC, `Result`, `Option`, trait và kiểm tra `Send`/`Sync` để bắt nhiều lỗi trước production.

Phần thực tế nhất là chiến lược migration: không rewrite toàn bộ. Hãy bắt đầu từ hot path, worker, service có boundary rõ, hoặc route từng endpoint qua gateway theo kiểu strangler pattern. `cgo` có thể dùng nhưng thường làm backend phức tạp hơn so với tách Rust thành service riêng. Tác giả cũng nhắc các chi phí thật: borrow checker khiến tháng đầu khó hơn, compile chậm hơn, async coloring và một số niche ecosystem nhỏ hơn. Vì vậy Go vẫn hợp cho Kubernetes tooling, CLI, glue service và hệ thống cần tốc độ team; Rust đáng giá hơn với foundational service nơi reliability, P99 latency và các lỗi như nil/data race tạo chi phí vận hành lớn.

**Điểm chính:**
- Rust migration đáng giá khi compile-time guarantees giảm incident nhiều hơn chi phí học, build và vận hành.
- Các pattern quen thuộc trong Go cần được map lại: `if err != nil` thành `Result`/`?`, `nil` thành `Option`, interface thành trait, goroutine thành task khi thật sự cần.
- Nên bắt đầu từ service độc lập, hot path hoặc worker có contract rõ; giữ nguyên API để chuyển traffic từng phần.
- Không cần bỏ Go hoàn toàn; dùng Go cho phần "boring" và Rust cho phần cần độ tin cậy hoặc hiệu năng cao hơn.

## [AI Engineering cho lập trình viên đã biết ship phần mềm](https://www.lucavallin.com/blog/ai-engineering-for-developers)

Luca Cavallin viết một bài hướng dẫn rất dài về AI engineering cho developer đã quen backend, HTTP, queue, Kubernetes và production. Luận điểm chính là khi đưa LLM vào sản phẩm, mô hình không còn là toàn bộ sản phẩm; sản phẩm thật là hệ thống bao quanh mô hình: prompt, RAG, eval, agent, inference, observability, bảo mật và chi phí. Khác với API truyền thống, output của AI không nhị phân đúng/sai và có thể thay đổi theo model, prompt, dữ liệu hoặc ngữ cảnh người dùng, nên cần eval dataset, regression check và monitoring ngay từ đầu.

Bài viết đi từ nền tảng model tới các phần thực dụng hơn: chọn model theo task/cost/latency, dùng prompt engineering trước khi RAG, dùng RAG như một bài toán search có hybrid retrieval và reranking, finetune chỉ khi prompt/RAG đã hết tác dụng, tối ưu inference bằng caching/batching/model routing, rồi thiết kế agent như một vòng lặp có tool call, quyền hạn và trace rõ ràng. Phần production nhấn mạnh context enhancement, guardrails, CI/CD riêng cho prompt và model change, cost attribution theo feature, cùng nguyên tắc xem mỗi agent như một service có identity, quyền tối thiểu và audit log.

**Điểm chính:**
- AI engineering gần với backend engineering hơn ML training: nhiệm vụ chính là orchestration, grounding, eval, observability và vận hành.
- Không nên ship AI feature chỉ bằng demo; cần eval dataset, quality checkpoint, canary và theo dõi regression theo mỗi lần đổi prompt hoặc model.
- RAG chủ yếu là bài toán retrieval; hybrid search, reranker, chunking tốt và trích dẫn nguồn quan trọng hơn việc "nhét thêm context".
- Agent cần quyền hạn hẹp, tool schema rõ, tracing xuyên biên giới và approval gate cho hành động nguy hiểm.

## [Kỹ thuật vô hình phía sau mạng của AWS Lambda](https://www.allthingsdistributed.com/2026/04/the-invisible-engineering-behind-lambdas-network.html)

Bài viết trên All Things Distributed kể lại gần một thập kỷ tối ưu hạ tầng mạng phía sau AWS Lambda. Vấn đề ban đầu là cold start của Lambda khi kết nối vào VPC: ngoài việc tạo microVM Firecracker, tải mã và khởi động runtime, hệ thống còn phải dựng đường mạng riêng để đi vào VPC của khách hàng. Một phần độ trễ đến từ Geneve tunnel và DHCP; riêng việc tạo tunnel từng nằm trên hot path và có thể tạo thêm hàng trăm mili giây. Đội Lambda chọn eBPF thay vì vá kernel riêng: tạo tunnel trước với VNI giả, rồi dùng eBPF rewrite header khi VNI thật xuất hiện. Độ trễ tunnel giảm từ khoảng 150ms xuống 200 micro giây.

Phần hay hơn là cách họ xử lý vấn đề ở quy mô 4.000 network trên mỗi worker. Thay vì tạo tap, veth, namespace và rule khi function được gọi, họ pre-create toàn bộ khi worker khởi động, biến chi phí biến thiên thành chi phí cố định. Họ thay stateful NAT bằng eBPF stateless packet mangling, giảm NAT setup latency 100 lần; chuyển hơn 125.000 iptables rule ở root namespace thành 144 rule tĩnh bằng cách đưa rule theo slot vào namespace riêng; rồi giảm nghẽn RTNL lock bằng cách đổi thứ tự tạo network và batch attach eBPF. Kết quả là một topology thống nhất cho workload truyền thống và SnapStart, tăng capacity snapshot network 20 lần và còn được đóng gói lại để Aurora DSQL dùng chung.

**Điểm chính:**
- Tối ưu hạ tầng lớn thường là công việc "vô hình": khách hàng chỉ thấy Lambda khởi động nhanh hơn và ổn định hơn.
- eBPF giúp Lambda đưa tunnel setup khỏi hot path mà không cần duy trì kernel patch riêng.
- Pre-create network khi worker boot là ví dụ rõ của constant work: trả chi phí một lần thay vì trả liên tục theo tải.
- Ở quy mô lớn, iptables rule, conntrack và RTNL lock đều có thể trở thành bottleneck hệ thống.

## [Chạy test chọn lọc ở Stripe: CI nhanh cho monorepo Ruby 50 triệu dòng](https://stripe.dev/blog/selective-test-execution-at-stripe-fast-ci-for-a-50m-line-ruby-monorepo)

Aditya Anchuri mô tả cách Stripe giữ CI đủ nhanh cho một monorepo Ruby khoảng 50 triệu dòng, với gần 100.000 test file và 1,2 triệu test unit. Nếu chạy tuần tự toàn bộ suite, một build sẽ mất khoảng bốn tháng, trong khi Stripe chạy khoảng 50.000 build mỗi tuần. Hệ thống Selective Test Execution (STE) giải quyết bằng cách chỉ chạy trung bình khoảng 5% test suite cho mỗi build, median còn dưới 0,5%, và dùng dưới 10% compute so với chiến lược luôn chạy tất cả.

Điểm hay là Stripe không cố làm static dependency analysis hoàn hảo cho Ruby, vì metaprogramming, dynamic dispatch, config, fixture và artifact sinh ra khiến phân tích tĩnh dễ thiếu hoặc quá bảo thủ. Thay vào đó, họ quan sát runtime: một thư viện C++ nội bộ được nạp bằng `LD_PRELOAD` intercept các lần mở file, gắn file được đọc với scope của test đang chạy, rồi truyền tracing sang child process. Log thô được gom thành selection index dạng roaring bitmap, map từ file đã thay đổi sang danh sách test cần chạy. Việc phát hiện thay đổi dùng `hashdeep` để bao phủ cả file sinh ra, không chỉ file trong git. Stripe cũng thêm guardrail thực tế: luôn chạy lại test đang fail, luôn chạy một số test dùng glob/file discovery, xử lý linter theo danh sách file đổi, và lưu metadata baseline trong MongoDB với Monotonic Revision ID để chọn dữ liệu nền nhanh và tái lập được.

**Điểm chính:**
- Với ngôn ngữ động như Ruby, quan sát file access lúc chạy có thể đáng tin hơn việc suy luận dependency bằng phân tích tĩnh.
- Instrumentation phải rẻ: trong đường `open` chỉ ghi log tối thiểu, còn aggregation và indexing nằm ngoài hot path.
- Roaring bitmap giúp lưu khoảng ba tỷ điểm dữ liệu mà vẫn truy vấn nhanh khi union các test bị ảnh hưởng.
- STE không chỉ là thuật toán chọn test; nó cần baseline rõ ràng, dữ liệu tái lập được và guardrail cho các edge case của CI thật.

## [Oncall đã dạy tôi mọi thứ](https://yaoyue.org/blog/2026-oncall/)

Yao Yue nhìn lại 7,5 năm trực oncall cho hệ thống distributed caching ở Twitter, một trong những dịch vụ có throughput cao nhất và cũng nhiều sự cố nghiêm trọng nhất. Bài viết không tô hồng oncall, nhưng lập luận rằng chính việc sống cùng production đã tạo nên tư duy kỹ sư hạ tầng của tác giả. Oncall dạy rằng hệ thống lớn không chỉ cần nhanh ở median; điều quan trọng hơn là tính dự đoán được, tail latency, kiến trúc đủ rõ để xử lý khủng hoảng, observability tốt, cấu hình nhất quán, automation sẵn sàng và default hợp lý ngay từ thiết kế.

Phần đáng nhớ hơn là bài học về con người. Việc restart Memcached để tránh meltdown đôi khi lại tự gây sự cố cho toàn site, nên tác giả học cách chọn thời điểm ít rủi ro, thông báo trước và quan trọng nhất là nhận trách nhiệm khi mắc lỗi. Nhiều incident chỉ được giải quyết nhờ sự kiên trì thu hẹp khả năng lỗi và nhờ đồng nghiệp từ nhiều mảng hạ tầng cùng giúp: ops, kernel, service upstream, manager và teammate cùng trực chiến. Kết luận của bài viết rất thẳng: kỹ sư không thật sự hiểu phần mềm cho tới khi nhìn nó chạy và hỏng trong production; người viết phần mềm không nên nghĩ mình đứng ngoài việc triển khai, giám sát và debug chính thứ mình tạo ra.

**Điểm chính:**
- Oncall biến các khái niệm như tail latency, dependency, observability và rollback thành thực tế có hậu quả.
- Operational excellence phải được thiết kế từ đầu, không phải vá vội trước launch.
- Nhận trách nhiệm khi gây sự cố là cách xây lại niềm tin nhanh hơn việc né tránh lỗi.
- Production là nơi kỹ sư học sâu nhất về cả hệ thống lẫn cách phối hợp với con người.

## [Claude như cộng sự phân tích hiệu năng](https://developers.redhat.com/articles/2026/05/29/claude-your-performance-analysis-partner)

Archana Ravindar thử dùng Claude để hỗ trợ phân tích hiệu năng Go qua CPU profile và trace, tập trung vào Green Tea garbage collector trên POWER10 với bộ benchmark `sweet`. Điểm mạnh của Claude không phải là tự động tạo bản vá đúng ngay, mà là giúp đọc nhanh những file rất lớn và khó nhìn: `pprof`, assembly dump và trace timeline. Ví dụ, Claude chỉ ra hot path trong `runtime.tryDeferToSpanScan`, phát hiện mẫu atomic `Load8` rồi `Or8`, đề xuất gộp thành `Or32`, sau đó cũng giúp giải thích vì sao thử nghiệm này lại regression do false sharing và contention giữa các worker GC.

Bài viết cũng cho thấy Claude hữu ích khi phân tích mức thấp: đối chiếu assembly để thấy compiler không cache lại `q.class.sizeclass`, ưu tiên TODO trong GC theo độ nóng của profile, gợi ý pattern cần nhìn trong trace như idle processor khi GC, mark assist gap, GC quá thường xuyên, hoặc `gcMarkDone` dài. Khi so sánh nhiều trace/profile, Claude có thể tóm tắt benchmark nào hưởng lợi từ Green Tea GC và benchmark nào bị bottleneck bởi phần khác. Nhưng tác giả nhấn mạnh mọi gợi ý phải được validate: tối ưu phụ thuộc kiến trúc, cache line, ISA hoặc register pressure rất dễ sai nếu thiếu ngữ cảnh.

**Điểm chính:**
- Claude hữu ích như công cụ exploratory analysis cho `pprof`, trace và assembly, đặc biệt khi dữ liệu quá lớn để đọc thủ công.
- Gợi ý tối ưu cấp thấp phải đo lại; ví dụ giảm số atomic instruction vẫn có thể chậm hơn vì false sharing.
- Profile cho biết chi phí nằm ở đâu; trace giúp hiểu vì sao hệ thống bị nghẽn, đặc biệt với GC và scheduling.
- Dùng Claude tốt nhất là để thu hẹp vùng nghi vấn, so sánh regression và tạo checklist điều tra, không phải thay thế benchmark.

## [Những điều có thể bạn chưa biết về index](https://jon.chrt.dev/2026/04/15/things-you-didnt-know-about-indexes.html)

Jon Charter giải thích index trong Postgres bằng ví dụ rất dễ hiểu: index giống mục lục sách, giúp database tìm dữ liệu bằng cấu trúc đã sắp xếp thay vì scan toàn bảng. Nhưng bài viết nhấn mạnh trade-off quan trọng: đọc nhanh hơn, ghi chậm hơn. Mỗi `INSERT`, `UPDATE`, `DELETE` phải cập nhật thêm index; index cũng tốn dung lượng, cache và làm query planner có nhiều phương án hơn để cân nhắc. Vì vậy "index tất cả mọi thứ" thường không phải chiến lược tốt.

Phần hữu ích nhất là các lỗi phổ biến khiến index không được dùng. Composite index phụ thuộc thứ tự cột: `(type_1, type_2)` giúp query theo `type_1` hoặc cả hai cột, nhưng không giúp nhiều nếu chỉ lọc `type_2`. Hàm trên cột như `lower(name)` cũng làm index thường trên `name` vô dụng, vì database cần cấu trúc đã sắp xếp theo chính biểu thức `lower(name)`; implicit conversion cũng có thể gây hiệu ứng tương tự. Cách kiểm tra đúng là dùng `EXPLAIN` hoặc `EXPLAIN ANALYZE`, không đoán. Bài viết cũng giới thiệu functional index, partial index cho những lát dữ liệu nhỏ như soft-delete hoặc `is_legendary = true`, và covering index/`INCLUDE` để một số query có thể chạy bằng `Index Only Scan`.

**Điểm chính:**
- Index tăng tốc đọc nhưng làm ghi, cache và planning phức tạp hơn.
- Thứ tự cột trong composite index phải đi theo pattern query thật.
- Function, expression và implicit conversion có thể khiến index hiện có bị bỏ qua.
- Dùng `EXPLAIN ANALYZE` để xác nhận planner thật sự chọn index nào trước khi tối ưu tiếp.
