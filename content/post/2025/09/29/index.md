---
title: "Newsletter #56"
date: 2025-09-29
tags: ["AI-Assisted", "Technology", "UUID", "Database", "Java", "Java25", "JDK", "Testing", "Automation", "Playwright", "AI-Development", "Spec-Driven", "Software-Engineering", "Programming-Motivation", "Rust", "Sorting-Algorithms", "ClickHouse", "Query-Optimization", "AI-Coding"]
categories: ["Newsletter"]
---

*~~Hôm nay mình lại thử nghiệm tiếp [OpenCode](https://opencode.ai/). Kết quả là khi mình gửi 1 url thì nó... stuck luôn :v. Vì vậy mình chuyển qua thử GitHub Copilot, với OpenRouter. Kết quả ban đầu cho thấy GitHub Copilot không detect được Newsletter số trước, nó đánh lại từ #1. Và tags cũng ghi chữ thường, không đúng format mình expect. Mình không ưng ý nên xoá đi, thử lại với OpenAI Codex, kết quả thì để đọc được trang web nó đã hỏi mình n thứ, vả lại còn đòi chạy mấy lệnh python để đọc web, xong cài package bằng pip trực tiếp nữa. Mình thấy không oke với chuyện này nên chuyển qua xài thử [Claude Code Router](https://github.com/musistudio/claude-code-router), chạy Claude Code nhưng với API từ OpenRouter, với model `xAI: Grok 4 Fast`. Bài đầu tiên thấy tóm tắt khá dài.~~ Thôi thì mời bạn thưởng thức Newsletter #56 nhé.*

## [I love UUID, I hate UUID](https://blog.epsiolabs.com/i-love-uuid-i-hate-uuid)

Bài viết từ blog Epsio Labs khám phá những mặt tích cực và tiêu cực của UUID khi sử dụng làm khóa chính trong cơ sở dữ liệu quan hệ, đặc biệt trong hệ thống streaming SQL của họ. Đối với các lập trình viên junior, UUID (Universally Unique Identifier) là một công cụ hữu ích để tạo ID duy nhất mà không cần phụ thuộc vào database server, giúp đơn giản hóa việc phát triển ứng dụng phân tán.

UUID được yêu thích vì có thể sinh ra từ client-side, cho phép cập nhật giao diện người dùng một cách optimistic – nghĩa là UI có thể phản hồi ngay lập tức mà không chờ server xác nhận, cải thiện trải nghiệm người dùng. Chúng đảm bảo tính duy nhất toàn cầu với xác suất va chạm cực thấp (khoảng 1 trong hàng tỷ tỷ), và tương thích tốt với các hoạt động bulk insert như lệnh COPY trong PostgreSQL, tránh tình trạng phải đồng bộ hóa với server như khi dùng auto-increment integers.

Tuy nhiên, UUIDv4 – phiên bản phổ biến nhất – bị chỉ trích vì tính ngẫu nhiên cao dẫn đến phân tán dữ liệu trong B-Tree index của database. Điều này làm tăng kích thước index đáng kể và giảm tốc độ insert. Trong benchmark với 10 triệu rows, index UUIDv4 chiếm 389MB và mất 54.62 giây, so với UUIDv7 chỉ 301MB và 37.53 giây – cải thiện 22% kích thước và 31% thời gian.

UUIDv7 là giải pháp mới, nhúng 48-bit timestamp Unix vào đầu UUID để tạo thứ tự thời gian, giúp index hiệu quả hơn mà vẫn giữ tính duy nhất. Trade-off duy nhất là có thể lộ thời gian tạo nếu UUID bị expose ra ngoài, và giảm nhẹ độ ngẫu nhiên, nhưng rủi ro va chạm vẫn rất thấp (khoảng 0.0000000003% cho 1 triệu UUID trong 1ms).

**Điểm chính:**
- UUID lý tưởng cho optimistic UI updates và bulk operations nhờ client-generated và global uniqueness.
- UUIDv4 kém hiệu suất do randomness gây phân tán index, tăng size và thời gian query.
- UUIDv7 cải thiện bằng timestamp prefix, tăng throughput 31% và giảm index size 22%.
- Khuyến nghị sử dụng UUIDv7 cho database hiện đại để balance uniqueness và performance.

## [What's new in Java 25](https://pvs-studio.com/en/blog/posts/java/1284/)

Bài viết từ PVS-Studio blog tóm tắt các cập nhật mới trong Java 25, phát hành ngày 10/09/2025. Đối với lập trình viên junior, Java 25 mang đến nhiều cải tiến giúp code đơn giản hơn, hiệu suất cao hơn và an toàn hơn, mà không phá vỡ compatibility với code cũ.

Trong phần New API, JEP 506 giới thiệu Scoped Values – thay thế cho ThreadLocal với lifetime scoped, giúp quản lý dữ liệu trong các block code ngắn hạn mà không leak memory. JEP 510 thêm Key Derivation Function API để xử lý unified các thuật toán KDF cho cryptography. JEP 511 cho phép import toàn bộ module bằng Module Import Declarations, giảm boilerplate. JEP 512 với Compact Source Files và Instance Main Methods giúp viết app đơn giản mà không cần class đầy đủ. JEP 513 cho phép flexible constructor bodies, di chuyển code trước super() call.

Về Platform Changes, JEP 503 loại bỏ 32-bit x86 port vì ít sử dụng, tập trung vào 64-bit. JEP 519 Compact Object Headers giảm header từ 12 bytes xuống 8 bytes, tiết kiệm memory. JEP 521 thêm Generational Shenandoah GC cho throughput cao hơn. Trong AOT, JEP 514 và 515 cải thiện command-line ergonomics và method profiling để JIT nhanh hơn. JFR enhancements như JEP 518 Cooperative Sampling và JEP 520 Method Timing giúp monitoring chính xác hơn.

Các preview features bao gồm Structured Concurrency (preview thứ 5) cho concurrent tasks an toàn. Tổng thể, Java 25 tập trung vào developer productivity, performance và security. Junior devs nên thử nghiệm các JEPs mới để viết code hiện đại hơn.

**Điểm chính:**
- Scoped Values và KDF API: Cải tiến API cho scoped data và cryptography.
- Module imports và compact source: Giảm boilerplate cho learning và simple apps.
- Compact headers và Generational GC: Tối ưu memory và performance.
- JFR và AOT enhancements: Monitoring và compilation tốt hơn cho production.

## [Some Best Practices for Writing Readable Automation Tests](https://blog.scottlogic.com/2025/09/04/some-best-practices-for-writing-readable-automation-tests.html)

Bài viết từ Scott Logic Blog hướng dẫn các best practices để viết automation tests dễ đọc, sử dụng Playwright với TypeScript. Đối với lập trình viên junior, automation testing giúp kiểm tra ứng dụng tự động, nhưng code test khó maintain nếu không readable, dẫn đến bugs ẩn hoặc team khó collaborate.

Về assertions, sử dụng expect() flexible như expect(response.status()).toBeOK() để handle codes thành công khác nhau (200, 201) mà không fail sớm, tập trung vào validations quan trọng. Với locators, ưu tiên .getByRole cho accessibility, dễ inspect qua DevTools bằng tab navigation, thay vì .getByTestID có thể confuse screen readers. Luôn advocate cho HTML roles đúng nếu thiếu.

Naming conventions: Sử dụng backticks cho test names động, ví dụ test(`should return a 400 when User Information is '${variable}'`), cho phép interpolation variables. Structure: Tag tests với {tag: 'THW-000'} để filter runs theo tickets, hoặc annotations cho links chi tiết theo Playwright docs, tăng traceability và longevity.

Những practices này giúp tests maintainable, accessible và team-friendly. Junior devs nên áp dụng để viết tests rõ ràng, giảm debugging time và cải thiện QA process.

**Điểm chính:**
- Assertions flexible: Sử dụng toBeOK() cho HTTP success codes đa dạng.
- Locators accessible: Ưu tiên .getByRole qua DevTools inspection.
- Dynamic naming: Backticks cho variable interpolation trong test titles.
- Tagging annotations: Lưu traceability với tickets cho better collaboration.

## [Tech Debt: Understanding its Business Impact - Optimism](https://www.optimism.io/blog/tech-debt-understanding-its-business-impact)

Nợ kỹ thuật (technical debt) đề cập đến chi phí ngầm phát sinh từ việc chọn giải pháp nhanh chóng thay vì tối ưu trong phát triển phần mềm, tương tự như nợ tài chính tích lũy lãi suất. Bài viết mô tả nó là sản phẩm phổ biến trong môi trường công nghệ nhanh chóng, nơi các đội ngũ chọn fix nhanh để đáp ứng deadline, dẫn đến codebase dễ vỡ và khó mở rộng.

Nguyên nhân chính bao gồm áp lực giao hàng nhanh chóng, thiếu kiểm thử đầy đủ, hoặc yêu cầu thay đổi vượt quá tốc độ cải thiện code. Sự tích tụ nợ kỹ thuật gây ra tác động kinh doanh nghiêm trọng: chi phí bảo trì tăng cao do sửa lỗi liên tục, trì hoãn phát hành tính năng làm mất lợi thế cạnh tranh, và rủi ro mất doanh thu từ sự cố hệ thống. Ví dụ, nợ không được xử lý có thể làm tăng chi phí phát triển lên đến 20-30% hàng năm, gây căng thẳng cho ngân sách và động lực đội ngũ.

Để đo lường, các công ty sử dụng công cụ phân tích độ phức tạp code, tỷ lệ mã trùng lặp, và chỉ số khả năng bảo trì, thường định lượng nợ như một phần trăm giá trị codebase. Hậu quả không chỉ giới hạn ở khía cạnh kỹ thuật mà còn ảnh hưởng đến sự hài lòng của khách hàng qua sản phẩm không đáng tin cậy, đồng thời cản trở khả năng đổi mới. Các chiến lược quản lý nhấn mạnh cách tiếp cận chủ động: dành thời gian riêng cho việc refactor code, tích hợp kiểm thử tự động vào pipeline CI/CD, và xây dựng văn hóa phát triển coi trọng chất lượng bền vững. Bằng cách coi nợ kỹ thuật như một tài sản chiến lược thay vì khuyết điểm không thể tránh khỏi, doanh nghiệp có thể giảm thiểu rủi ro, nâng cao sự linh hoạt, và thúc đẩy tăng trưởng lâu dài.

**Điểm chính:**
- Nợ kỹ thuật phát sinh từ các shortcut trong coding ưu tiên tốc độ, dẫn đến nhu cầu rework trong tương lai.
- Nguyên nhân chính: áp lực deadline và lựa chọn thiết kế kém ban đầu.
- Tác động kinh doanh: chi phí cao hơn, đổi mới chậm hơn, và vấn đề scalability.
- Phương pháp đo lường: metrics code như điểm phức tạp và tỷ lệ nợ.
- Chiến lược: phân bổ sprint refactor, tích hợp CI/CD testing, và văn hóa coding bền vững.

## [Spec-Driven Development with AI: A New Approach and a Journey into the Past](https://foojay.io/today/spec-driven-development-with-ai-a-new-approach-and-a-journey-into-the-past)

Bài viết phê phán bản chất tập trung vào code trong phát triển phần mềm truyền thống, nơi yêu cầu thường trở nên lỗi thời, dẫn đến vấn đề bảo trì, đặc biệt khi AI tăng tốc coding mà không giải quyết nguyên nhân gốc rễ. Lấy cảm hứng từ Rational Unified Process (RUP) những năm 2000, tác giả Simon Martinelli đề xuất AI Unified Process (AIUP), một phương pháp dẫn dắt bởi yêu cầu, đặt nhu cầu kinh doanh làm nguồn sự thật duy nhất.

Trong cách tiếp cận này, phát triển bắt đầu bằng catalog yêu cầu kinh doanh thủ công, sau đó sử dụng AI tạo ra các artifact: sơ đồ use case, mô hình entity, thông số hệ thống, và cuối cùng là code ứng dụng. Các bên liên quan xem xét từng bước để đảm bảo phù hợp, tránh lỗi miền. Tất cả output được mã hóa dưới dạng Markdown và PlantUML, versioned trong Git để diff trực quan và theo dõi audit. AI đóng vai trò "consistency engine", tự động cập nhật các yếu tố downstream khi yêu cầu thay đổi, loại bỏ đồng bộ thủ công.

Bối cảnh lịch sử nhấn mạnh trọng tâm lặp lại modeling của RUP, nay được nâng cao bởi AI hiện đại để hiệu quả hơn. Lợi ích bao gồm hợp tác mạnh mẽ hơn giữa kinh doanh và developer, hệ thống dễ bảo trì với traceability đầy đủ, chu kỳ nhanh hơn bằng cách tự động hóa công việc nhàm chán, và chất lượng tích hợp qua test dựa trên spec. Thách thức ngầm bao gồm đầu tư ban đầu vào yêu cầu chính xác và sự tham gia của bên liên quan, dù phương pháp giảm thiểu các lỗi truyền thống như documentation thiếu sót. Phương pháp này phù hợp cho ứng dụng kinh doanh nhờ pattern công nghệ dự đoán được, nhấn mạnh hợp tác con người-AI cho logic miền.

**Điểm chính:**
- Chuyển trọng tâm từ code sang yêu cầu làm nguồn sự thật, sử dụng AI tạo artifact tự động.
- Workflow: Yêu cầu kinh doanh → AI-generated diagrams/models/specs/code, tất cả versioned trong Git.
- Lợi ích: Hợp tác tốt hơn, traceability, chu kỳ phát triển nhanh, chất lượng qua spec-based tests.
- Thách thức: Đầu tư ban đầu vào yêu cầu chính xác và stakeholder review.
- Phù hợp cho business apps với pattern predictable, tận dụng AI cho consistency.

## [On Good Software Engineers](https://candost.blog/on-good-software-engineers/)

Việc đặt kỳ vọng cho kỹ sư phần mềm là thách thức đối với quản lý do nhu cầu, cấu trúc và văn hóa công ty khác nhau. Bài viết bác bỏ khái niệm "10x engineers" như gây hại cho tinh thần đội ngũ và chất lượng code, đồng thời phê phán framework phát triển sự nghiệp vì thiếu sót trong định nghĩa năng lực. Thay vào đó, tiêu chuẩn đơn giản: "Một kỹ sư tốt là người mà tôi, với tư cách quản lý hoặc đồng nghiệp, có thể tin tưởng để tiến hành dự án, biết rằng họ sẽ cung cấp giải pháp bằng cách làm việc với đội ngũ và sản xuất chất lượng tốt, lặp lại liên tục." Điều này áp dụng cho mọi cấp độ, từ junior xử lý nhiệm vụ nhỏ đến staff dẫn dắt sáng kiến phức tạp.

Đặc trưng bao gồm độ tin cậy, khả năng thích ứng và nhất quán. Kỹ năng nhấn mạnh giao tiếp rõ ràng (viết và nói), lắng nghe đồng cảm, trao đổi phản hồi, và nắm vững quy trình (code review, RFC, methodology như Scrum). Kỹ sư phải học các chi tiết tổ chức – văn hóa, chuẩn mực, hệ thống phân cấp – để ảnh hưởng hiệu quả và chủ động nhúng chất lượng, như qua test-driven development hoặc refactor code cũ. Họ ưu tiên phù hợp với stakeholder, giảm độ phức tạp qua thiết kế modular và chiến lược test, và duy trì chất lượng bền vững giữa thay đổi.

Tư duy hướng tăng trưởng: chấp nhận khó chịu, thừa nhận lỗi, ngăn chặn tái phát, và hành động vào vấn đề mà không phàn nàn. Kỹ sư tốt chơi như thành viên đội ngũ, đề xuất giải pháp thay vì đẩy vấn đề. Đối với lập trình viên junior, bài viết khuyến khích tập trung vào độ tin cậy và hợp tác để trở thành kỹ sư đáng tin cậy, vượt qua kỹ năng kỹ thuật thuần túy.

**Điểm chính:**
- Kỹ sư tốt: Tin cậy tiến hành dự án qua hợp tác đội ngũ và chất lượng nhất quán.
- Kỹ năng cốt lõi: Giao tiếp, nắm quy trình tổ chức, chủ động chất lượng.
- Tư duy: Tăng trưởng, trách nhiệm, giải quyết vấn đề chủ động.
- Phù hợp mọi cấp độ, nhấn mạnh hợp tác hơn tốc độ cá nhân.
- Khác biệt với great: Ảnh hưởng rộng hơn, nhưng good tập trung cơ bản.

## [Why I do programming](https://esafev.com/notes/why-i-do-programming/)

Tác giả kể lại niềm đam mê lập trình suốt đời bắt nguồn từ sự tò mò thời thơ ấu. Là một đứa trẻ ba tuổi trầm tĩnh, họ thích tháo rời máy cassette để khám phá cơ chế bên trong, nuôi dưỡng bản năng hiểu máy móc. Điều này phát triển ở trường qua MS-DOS, Logo, BASIC, sau đó là HTML, CSS và JavaScript, nơi xây dựng chương trình đơn giản và website mang lại cảm giác kỳ diệu. Đến 10 tuổi, internet khơi dậy thử nghiệm web, bao gồm kiếm tiền từ giúp bài tập.

Tuổi thiếu niên sâu sắc hóa qua mod game như MTA và SAMP sử dụng scripting PAWN, nhằm tạo thế giới multiplayer immersive giống "proto-metaverse". Khám phá Second Life mở rộng thành scripting LSL cho kinh tế ảo, tạo thu nhập thực từ sáng tạo digital. Tuy nhiên, sự chuyển dịch hướng tác động đời thực nảy sinh khoảng 16 tuổi, dẫn đến các venture bán hàng online nhỏ để tài trợ công nghệ cá nhân, dù rủi ro trường học.

Đại học Kỹ thuật Sáng tạo kết hợp kỹ năng kỹ thuật như CAD và bảo mật với triết học, nhấn mạnh đặt câu hỏi suy tư. Sau tốt nghiệp, bất định giải quyết qua startup MipoTheBot, nơi thiết kế và coding khơi dậy động lực chuyên nghiệp, dù đóng cửa dạy bài học kinh doanh. Kinh nghiệm qua các ngành nhấn mạnh sức mạnh đội ngũ hợp tác.

Burnout đánh úp hai lần, một liên quan công việc và một cá nhân, nhưng chuyến du lịch châu Âu phục hồi khẳng định niềm vui lập trình. Tác giả đánh giá cao biên giới vô tận – từ backend đến AI – như phản ứng chống phân tâm, thể hiện sáng tạo hơn chỉ nghề nghiệp. Cuối cùng, lập trình bền vững như cách cốt lõi để tinker, khám phá và tương tác thực tế, không thay đổi từ xung động tuổi trẻ.

**Điểm chính:**
- Lái bằng tò mò tuổi thơ tháo rời máy móc và khám phá cơ chế.
- Tìm magic trong tạo chương trình chức năng, từ game đơn giản đến thế giới ảo.
- Tìm xây dựng tác động ý nghĩa đời thực ngoài không gian ảo.
- Xem lập trình như khám phá vô tận qua lĩnh vực web, hệ thống và AI, thỏa mãn impulse tinker.
- Thấy lập trình như triết lý sáng tạo tương tác thế giới, bền vững qua burnout.

## [The unreasonable effectiveness of modern sort algorithms](https://github.com/Voultapher/sort-research-rs/blob/main/writeup/unreasonable/text.md)

Nghiên cứu khám phá hiệu suất đáng ngạc nhiên của thuật toán sắp xếp generic hiện đại trong kịch bản hạn chế: sắp xếp mảng u64 với chỉ bốn giá trị phân biệt, mô phỏng dữ liệu low-cardinality. Sử dụng suite benchmark sort-research-rs dựa trên Rust trên AMD Ryzen 9 5900X, tác giả test bucket sort tối ưu domain chống hybrid general-purpose, đo throughput theo elements per second qua kích thước input từ 10 đến 10^8.

Phương pháp liên quan benchmark cold với pattern random_d4, flush cache hướng dẫn để mô phỏng gọi one-off. Approach domain-specific bao gồm BTreeMap (đếm sorted, ~150M elem/s tại 10^6), HashMap (nhanh hơn nhưng cần sort thêm, ~300M elem/s), dựa trên match (nặng branch, giới hạn ~200M elem/s bởi mispredictions), branchless (tránh penalty, ~220M elem/s), và perfect hash function (PHF - nhanh nhất cho known domain, ~400M elem/s nhưng panic nếu dữ liệu thay đổi).

Generic như std lib ipnsort (unstable) và driftsort (stable) vượt trội, đạt ~350M elem/s cho unstable và ~280M cho stable nhờ partial deduplication tự động, xử lý O(N * log(K)) với K=4 mà không kiến thức trước. So sánh với pdqsort, crumsort, radsort cho thấy generic robust hơn, thích ứng mà không fail. Tác giả nhấn mạnh std lib Rust (co-author) cho robustness qua partial deduplication, hiệu quả trong pattern low-cardinality phổ biến, làm generic "unreasonably effective" mà không cần specialize.

Trade-off: Specialized excel ideal nhưng fail (panic/output sai) nếu dữ liệu thay đổi; generic adapt, phù hợp production. Đối với junior Rust devs, nghiên cứu khuyến khích tin tưởng std lib cho sorting, tập trung domain knowledge thay vì micro-optimize unknown cases.

**Điểm chính:**
- Tập trung benchmark Rust trên low-cardinality u64 (4 giá trị phân biệt) trên Ryzen 9 5900X.
- So sánh bucket sort domain-specific (BTree, Hash, match, branchless, PHF) vs generic hybrids (ipnsort, driftsort, pdqsort).
- Generic std lib vượt trội nhờ partial deduplication, đạt O(N log K) tự động ~350M elem/s stable/unstable.
- Specialized nhanh nhưng fragile (panic nếu domain thay đổi); generic robust cho production.
- Kết luận: Std lib "unreasonably effective" cho pattern phổ biến, ưu tiên robustness hơn specialize.

## [How we made ClickHouse log queries 99.5% faster with resource fingerprinting](https://signoz.io/blog/query-performance-improvement)

Các kỹ sư SigNoz giải quyết truy vấn log chậm trong ClickHouse bằng cách xử lý lưu trữ dữ liệu không hiệu quả. Truyền thống, log từ các pod, service, môi trường đa dạng trộn lẫn qua các block lưu trữ, buộc database quét gần như toàn bộ dữ liệu cho filter mục tiêu, như theo namespace. Ví dụ, truy vấn namespace production trước đây kiểm tra 99.5% block, dẫn đến I/O cao và latency.

ClickHouse, database phân tích columnar, tổ chức dữ liệu vào granule khoảng 8,192 rows, sử dụng primary-key index sparse để skip block không liên quan trong truy vấn. Trong khi secondary index như bloom filter cung cấp skip nào đó, chúng kém hơn so với primary key tối ưu, quyết định sắp xếp physical row qua ORDER BY clause.

Kỹ thuật cốt lõi giới thiệu resource fingerprinting phân cấp: hash từ attribute chính (e.g., "cluster=c1;namespace=n1;pod=p1") xác định unique nguồn log. Bằng cách incorporate fingerprint sớm trong ORDER BY sequence – sau bucketing thời gian nhưng trước severity và timestamp – log từ resource tương tự cluster cùng contiguous block. Điều này tận dụng indexing sparse của ClickHouse để skip granule không match chính xác.

Benchmark chứng minh cải thiện đáng kể: filter namespace nay đọc chỉ 0.85% block (222/26,135), giảm I/O hơn 99%. Giải pháp extensible đến Kubernetes, AWS, Docker; duy trì compatibility schema. Đối với lập trình viên junior, kỹ thuật nhấn mạnh optimize storage qua sorting thông minh, tận dụng index để cải thiện query performance trong analytical database như ClickHouse.

**Điểm chính:**
- Vấn đề: Log trộn lẫn dẫn đến quét 99.5% block cho filter như namespace.
- Giải pháp: Hierarchical resource fingerprinting hash attribute, ORDER BY (time, fingerprint) để cluster log.
- Kết quả: Giảm quét từ 41,498/41,676 xuống 222/26,135 block, tiết kiệm I/O >99%.
- Triển khai: Extensible cho K8s/AWS, giữ schema compatibility.
- Bài học: Sắp xếp physical data theo query pattern phổ biến để leverage sparse index hiệu quả.

## [AI Coding](https://geohot.github.io/blog/jekyll/update/2025/09/12/ai-coding.html)

Bài viết của một nhân vật công nghệ có kinh nghiệm phản ánh về tuổi tác và sự thất vọng với ngành công nghệ bị hype chi phối, phê phán vai trò over-hyped của AI trong coding. Lấy từ thất bại quá khứ như venture xe tự lái, tác giả lập luận rằng sự nhiệt tình về AI thường ưu tiên lợi nhuận tài chính hơn tiến bộ thực tế. Trung tâm là ẩn dụ AI như compiler: người dùng input prompt tiếng Anh như "code", nhận output compiled, giống phát triển truyền thống nhưng với tweak tương tác hiếm khi vượt trội. Mô hình này highlight giới hạn của AI – tiếng Anh thiếu precision cho task mới, non-deterministic kết quả mà không spec nghiêm ngặt, và global effect của prompt – làm nó viable chủ yếu cho workflow routine do ecosystem lập trình hiện tại kém.

Tác giả bác bỏ ý tưởng AI "coding" độc lập, quy utility của nó cho enhanced search, optimization, và pattern reuse thay vì trí tuệ innate. Họ lập luận rằng phụ thuộc model ngôn ngữ lớn tiết lộ flaw trong codebase, hiring, và tool, dự đoán AI sẽ automate lập trình giống compiler và spreadsheet transform lĩnh vực trước. Nghiên cứu trích dẫn nhấn mạnh disconnect: AI boost perceived productivity 20% nhưng giảm actual speed 19%, fuel hàng tỷ investment misguided.

Kết luận với call to action, bài viết kêu gọi focus trên ngôn ngữ robust, compiler, library hơn sensationalism. Update làm rõ hỗ trợ AI như tool thực tế khi giới hạn được thừa nhận, trong khi decrying hype và ponder style blog cho reach rộng hơn engagement metric. Tổng thể, nó advocate skepticism, ưu tiên công việc thực tế hơn hype.

**Điểm chính:**
- AI như compiler: Prompt tiếng Anh yield code, nhưng thiếu precision, determinism, locality so với ngôn ngữ lập trình.
- Productivity illusion: Cảm giác nhanh hơn nhưng chậm thực tế 19%, từ tool kém hiện tại.
- Giới hạn: Tiếng Anh kém cho novel task; AI optimize pattern, không magic.
- Tương lai: AI automate như compiler thay manual coding, evolve tool ecosystem.
- Phê phán hype: Ưu tiên language/compiler cải thiện hơn billion investment misguided.

*Đánh giá sơ bộ thì combo này ổn áp, chạy ổn định, không hỏi prompt linh tinh để xử lý việc đọc WebFetch, kết quả thì hơi dài dòng, nhiều lỗi vặt, mình sẽ thử thêm một số model khác trong các bài viết sắp tới để tìm được 1 combo vừa free lại chất lượng :D*

---

*Bài viết đã được review và cập nhật bởi Claude Code với Opus 4.7 (1M context).*
