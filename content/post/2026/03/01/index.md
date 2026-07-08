---
title: "Newsletter #86"
date: 2026-03-01
tags: ["AI-Assisted", "Newsletter", "Software Architecture", "Code Review", "Performance", "AI Adoption", "Game Development"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #86.*

## [Do Not Surrender to the Tech Tree](https://www.macroscience.org/p/do-not-surrender-to-the-tech-tree)

Bài viết khám phá khái niệm xác định công nghệ (technological determinism) - quan điểm cho rằng sự phát triển công nghệ tuân theo logic nội tại và cấu trúc riêng, được quyết định bởi hình dạng của "cây công nghệ" chứ không phải bởi lựa chọn của con người. Tác giả trình bày bằng chứng thuyết phục: việc phát hiện đồng thời và độc lập các công nghệ là phổ biến trong lịch sử (như quy trình Hall-Héroult để nấu nhôm, động cơ phản lực, vi tích phân, thuyết tiến hóa), và các xã hội bị cô lập luôn hội tụ về cùng các công nghệ cơ bản (bánh xe, nông nghiệp intensify, luyện kim, chữ viết).

Tuy nhiên, tác giả phản đối quan điểm "Technocalvinism" - ý kiến cho rằng con người hoàn toàn không thể kiểm soát sự phát triển công nghệ. Thay vào đó, bài viết bảo vệ cái gọi là "xác định công nghệ mạnh" nhưng với một quan điểm quan trọng: trên khoảng thời gian ngắn, con người có khả năng định hình đáng kể sự phát triển công nghệ, đặc biệt là trong các "cửa sổ cơ hội" quan trọng. Các ví dụ lịch sử minh họa điều này: sự thành công trong việc hạn chế phổ biến vũ khí hạt nhân (chỉ 9 quốc gia sở hữu thay vì hàng chục như dự đoán), phát triển Permissive Action Links (PALs) để ngăn chặn kích hoạt trái phép, và việc tạo ra vaccine COVID-19 trong 10 tháng thay vì 10-15 năm như quy trình thông thường.

Bài viết đặc biệt chú trọng đến bối cảnh phát triển AI hiện nay. Tác giả lập luận rằng AI là công nghệ lưỡng dụng theo định nghĩa - quan trọng cho cả phòng thủ và tấn công mạng, cho phát hiện vaccine và nghiên cứu mầm bệnh, cho xe tự hành và drone quân sự. Thay vì chấp nhận "cây công nghệ mặc định", chúng ta cần chủ động phát triển các công nghệ giảm thiểu rủi ro song song với việc phát triển AI. Tác giả giới thiệu "The Launch Sequence" - 16 dự án cụ thể để tăng tốc lợi ích của AI đồng thời xây dựng các biện pháp bảo vệ, bao gồm Operation Patchlight và The Great Refactor (cứng hóa cơ sở hạ tầng mạng trước khi các cuộc tấn công mạng powered bởi AI tấn công quy mô lớn), Hardware-Based Verification (cho phép AI lan truyền nhanh hơn trong khi ngăn chặn sử dụng sai mục đích), và Preventing AI Sleeper Agents (red-test các hệ thống AI Mỹ trước sự can thiệp trái phép).

Bài viết kết luận bằng một thông điệp mạnh mẽ: cây công nghệ có những ràng buộc cứng nhắc thực sự, nhưng ngoài những ràng buộc đó, hầu hết sự phát triển công nghệ diễn ra theo cách phân tán, phi cá nhân. Tuy nhiên, có những cửa sổ cơ hội nhỏ để thực hiện quyền chủ động, trong đó nỗ lực thay đổi kết quả mặc định có thể mang lại kết quả lâu dài. Chúng ta đang ở một trong những khoảnh khắc đó trong phát triển AI, và cơ hội đang trôi qua nhanh chóng.

**Điểm chính:**
- Xác định công nghệ mạnh: công nghệ tuân theo logic nội tại, nhưng con người vẫn có khả năng định hình trong các cửa sổ cơ hội
- Bằng chứng lịch sử: phát hiện đồng thời phổ biến, xã hội cô lập hội tụ về cùng công nghệ
- Cửa sổ cơ hội: hạn chế phổ biến vũ khí hạt nhân, PALs, vaccine COVID-19 nhanh chóng
- AI là lưỡng dụng: quan trọng cho cả phòng thủ và tấn công, cần phát triển bảo vệ song song
- The Launch Sequence: 16 dự án cụ thể để chuẩn bị cho AI tiên tiến

## [How to Make Architecture Decisions: RFCs, ADRs, and Getting Everyone Aligned](https://lukasniessen.medium.com/how-to-make-architecture-decisions-rfcs-adrs-and-getting-everyone-aligned-ab82e5384d2f)

Bài viết chia sẻ quy trình hiệu quả để đưa ra các quyết định kiến trúc trong phát triển phần mềm, tránh được những vấn đề thường gặp như quyết định đưa ra trong cuộc đối thoại ngõ dẫn đến hàng tháng sửa đổi, hoặc tài liệu đẹp nhưng không ai đọc dẫn đến kết quả tương tự. Quy trình cốt lõi gồm bốn bước: viết RFC trong 1-2 ngày, xem xét bất đồng bộ trong 2-3 ngày, họp quyết định trong 30-60 phút, và viết ADR vào cùng ngày.

RFC là tài liệu giải thích vấn đề, đề xuất giải pháp và mời phản hồi. Bài viết nhấn mạnh tầm quan trọng của việc xác định ưu tiên rõ ràng thay vì chỉ liệt kê ưu/nhược điểm. Khi các ưu tiên được xếp hạng và rõ ràng, quyết định thường trở nên hiển nhiên. Cấu trúc RFC nên bao gồm: tóm tắt, bối cảnh, ưu tiên và yêu cầu (được xếp hạng), các giải pháp đề xuất (bao gồm cả "không làm gì"), stakeholder, câu hỏi mở, và mốc thời gian.

Giai đoạn xem xét bất đồng bộ là nơi phép màu xảy ra - cho phép mọi người suy nghĩ trước khi phản hồi, có thể nghiên cứu, "ngủ một đêm" trước khi đưa ra phản hồi tốt hơn nhiều so với việc bị ép trả lời ngay trong cuộc họp. Cuộc họp quyết định không phải là cuộc họp trình bày - mọi người nên đã đọc RFC và các bình luận, với định dạng làm việc thay vì trình bày: bối cảnh nhanh (2 phút), giải quyết câu hỏi chưa trả lời (10-15 phút), thảo luận (15-30 phút), và quyết định (5-10 phút).

ADR là hồ sơ vĩnh viễn về những gì đã được quyết định và tại sao. Nó khác với RFC - RFC khám phá các tùy chọn, còn ADR ghi lại quyết định. Bài viết cũng đề cập đến tầm quan trọng của kế hoạch triển khai, vai trò của LLM trong chuẩn bị RFC (không phải viết toàn bộ mà là đối tác tư duy tức thời), và các lỗi thường cần tránh như tê liệt phân tích, quá nhiều stakeholder, không theo dõi, và bỏ qua những người ít nói.

**Điểm chính:**
- Quy trình bốn bước: RFC → Async Review → Decision Meeting → ADR
- Ưu tiên rõ ràng: xếp hạng các yêu cầu giúp quyết định trở nên hiển nhiên
- Async review: cho phép suy nghĩ và nghiên cứu trước khi phản hồi
- Decision meeting: 30-60 phút, không phải presentation meeting
- ADR: ghi vĩnh viễn quyết định và lý do, viết trong cùng ngày quyết định

## [The cost of a function call](https://lemire.me/blog/2026/02/08/the-cost-of-a-function-call/)

Bài viết khám phá chi phí của lời gọi hàm trong lập trình và lợi ích của việc inline - tối ưu hóa quan trọng mà compiler thay thế lời gọi hàm bằng mã trực tiếp tại vị trí gọi. Một lời gọi hàm khá rẻ nhưng không miễn phí: có thể cần lưu và khôi phục tham số trên stack, nhảy vào và ra khỏi hàm, cùng các câu lệnh thêm ở đầu và cuối hàm.

Tác giả thực hiện benchmark trên MacBook với chip M4 để so sánh hiệu năng. Với hàm cộng đơn giản, phiên bản inline nhanh hơn 20 lần so với phiên bản regular (0.03 ns/int so với 0.7 ns/int). Lý do: compiler biến đổi phép cộng thành các SIMD instructions xử lý block 16 số nguyên bằng 8 câu lệnh, giảm xuống một nửa câu lệnh mỗi số nguyên (từ 6 câu lệnh). Ngay cả khi ngăn compiler sử dụng SIMD, inline vẫn nhanh hơn 10 lần.

Tuy nhiên, với hàm phức tạp hơn như đếm khoảng trắng trong chuỗi, kết quả khác. Với chuỗi dài 1000 ký tự, inline phiên bản thậm chí chậm hơn một chút (115 ns so với 111 ns). Nhưng với chuỗi ngắn (0-6 ký tự), inline nhanh hơn đáng kể (1.0 ns so với 1.6 ns). Bài học: các hàm ngắn và đơn giản nên được inline khi hiệu năng là mối quan tâm, lợi ích có thể ấn tượng. Với các hàm có thể nhanh hoặc chậm tùy input, quyết định inline phụ thuộc vào dữ liệu đầu vào.

**Điểm chính:**
- Lời gọi hàm không miễn phí: overhead lưu khôi phục tham số, nhảy jump, setup/teardown
- Inline hàm đơn giản: nhanh hơn 20x nhờ SIMD, 10x ngay cả khi không SIMD
- Compiler tối ưu: biến vòng lặp thành SIMD block processing, giảm câu lệnh
- Context quan trọng: hàm phức tạp trên dữ liệu lớn có thể không lợi từ inline
- Quy tắc: hàm ngắn đơn giản nên inline khi hiệu năng quan trọng

## [The PERFECT Code Review: How to Reduce Cognitive Load While Improving Quality](https://bastrich.tech/perfect-code-review/)

Bài viết giới thiệu khung PERFECT - bộ nguyên tắc code review có cấu trúc giúp giảm tải nhận thức trong khi cải thiện chất lượng. Code review thường mang lại cảm giác kháng cự: quá nhiều con đường để theo dõi, quá nhiều sự mơ hồ, quá nhiều ý kiến chủ quan. Sự không chắc chắn này sinh ra trì hoãn và bikeshedding, hoặc ở thái cực opposite, các phê duyệt nhanh chóng không đáng kể.

PERFECT là viết tắt của bảy nguyên tắc theo thứ tự quan trọng: Purpose (mã giải quyết nhiệm vụ), Edge Cases (xử lý các trường hợp ngoại lệ), Reliability (không có vấn đề hiệu năng và bảo mật), Form (tuân thủ nguyên tắc thiết kế), Evidence (tests và CI pipelines pass), Clarity (mã truyền đạt rõ ràng ý định), và Taste (sở thích cá nhân được ghi chú nhưng không chặn thay đổi).

Tác giả nhấn mạnh rằng code review không phải là collection các practices yes-or-no nghiêm ngặt, mà là spectrum các kỹ thuật có thể áp dụng độc lập với nhau. Ngay cả lightweight nhưng structured review thường có chi phí thấp và mang lại giá trị đáng kể. Để làm cho nó thực sự hoạt động, các team nên thiết lập các quy ước review bằng văn bản, giữ chúng cập nhật và có thể hành động, yêu cầu self-review trước peer review, tích hợp code review vào quy trình phát triển, tự động hóa mọi thứ có thể, ngừng phê duyệt với "LGTM", và thực hành code review bất cứ khi nào có thể.

**Điểm chính:**
- PERFECT framework: 7 nguyên tắc theo thứ tự quan trọng cho code review hiệu quả
- Purpose là #1: mã phải giải quyết nhiệm vụ, nếu không thì không có giá trị
- Edge Cases: nhiều production bugs đến từ việc bỏ qua corner cases
- Taste không chặn: sở thích cá nhân được ghi chú nhưng author có thể chọn không giải quyết
- Self-review trước: mọi người nên tự review bằng cùng quy ước trước khi gửi cho người khác
- Quy ước văn bản: chuyển pattern lặp lại thành quy ước để tiết kiệm thời gian

## [Semantic Search Without Embeddings](https://softwaredoug.com/blog/2026/01/08/semantic-search-without-embeddings.html)

Bài viết thách thức quan điểm phổ biến rằng semantic search đồng nghĩa với vector search, và giới thiệu các phương pháp khác để modeling similarity và filter kết quả search. Semantic search thực sự cần ba thành phần: shared representation (không gian chung cho query và content), similarity function (cách đo khoảng cách), và match criteria (hệ thống để nói item có "match" hay không). Embeddings giỏi hai thành phần đầu nhưng kém thành phần thứ ba - không có cách tốt để include/exclude kết quả.

Tác giả giới thiệu managed vocabularies hoặc taxonomies - hệ thống map queries và content vào hierarchy của concepts, sử dụng ngôn ngữ của domain. Ví dụ Wayfair WANDS dataset với category tree như "Baby & Kids / Toddler & Kids Playroom / Indoor Play / Rocking Horses / Novelty Rocking Horses". Taxonomy cung cấp representation (category tree), similarity function (direct matches rank cao hơn parents/siblings), và match criteria (include shared parent categories, exclude beyond cousins/grandparents).

Điều thú vị là semantic similarity không cần vector index - có thể thực hiện với BM25 index thông qua hierarchical tokenization. Tokenizer tạo ra full path của mọi parent directory, và BM25 rewards rare match over common match. Root nodes có document frequency cao (common) nên score thấp, trong khi child nodes có document frequency thấp (rare) nên score cao. Điều này tạo ra scoring hierarchy: direct matches > parent > grandparent.

Tác giả cũng đề cập đến việc xây dựng taxonomy có thể bắt đầu đơn giản và evolve theo thời gian, và LLMs đã làm cho việc classifying into taxonomies dễ dàng hơn bao giờ hết. Embeddings có thể hữu ích để xây dựng better classifiers (không phải direct ranking), và sweet spot của embeddings trong search có thể là building better classifiers thay vì direct ranking và retrieval.

**Điểm chính:**
- Semantic search cần 3 thành phần: representation, similarity, và match criteria
- Embeddings giỏi ranking nhưng kém include/exclude kết quả
- Taxonomy: hierarchy concepts cung cấp tất cả 3 thành phần
- Hierarchical tokenization trong BM25: tự động score direct > parent > grandparent
- Root nodes common (score thấp), child nodes rare (score cao)
- LLMs supercharge taxonomies: dễ classify queries và products
- Embeddings sweet spot: building classifiers, không phải direct retrieval

## [My AI Adoption Journey](https://mitchellh.com/writing/my-ai-adoption-journey)

Bài viết chia sẻ hành trình cá nhân của Mitchell Hashimoto - người tạo ra Vagrant, Terraform, và Ghostty - về việc tìm ra giá trị trong AI tooling. Tác giả chia trải nghiệm adopting tool thành ba giai đoạn: inefficiency, adequacy, và workflow/life-altering discovery. Hầu hết mọi người phải ép buộc bản thân vượt qua giai đoạn inefficiency vì đã có workflow thoải mái, và adopting AI cảm giác như công việc.

Sáu bước trong hành trình: (1) Bỏ chatbot - ngay lập tức ngừng cố gắng thực hiện công việc có ý nghĩa qua chatbot, phải dùng agent với khả năng đọc file, thực thi chương trình, và HTTP request. (2) Reproduce work của mình - ép buộc reproduce tất cả manual commits với agentic ones, làm công việc hai lần để khám phá ra các pattern hữu ích như break down thành tasks rõ ràng, split planning vs execution cho requests mơ hồ, và give agent cách verify work. (3) End-of-day agents - block 30 phút cuối mỗi ngày để kick off agents, làm thêm trong thời gian không thể làm anyways với deep research sessions, parallel agents cho ý tưởng mơ hồ, và issue/PR triage.

(4) Outsource slam dunks - cho agents làm tất cả công việc mà AI chắc chắn làm tốt trong khi mình làm task khác. Quan trọng: tắt thông báo desktop của agent để tránh context switching, và human kiểm soát khi interrupt. (5) Engineer the harness - bất cứ khi nào agent làm sai, engineer giải pháp để agent không bao giờ lặp lại lỗi đó nữa, qua better implicit prompting (AGENTS.md) và programmed tools. (6) Always have agent running - mục tiêu có agent chạy mọi lúc, kết hợp với slower thoughtful models như Amp's deep mode, nhưng chỉ chạy khi có task thực sự hữu ích.

Tác giả hiện tại không chạy multiple agents, tìm thấy một agent là balance tốt giữa deep manual work và babysitting robot friend. Mục tiêu "have agent running at all times" vẫn chỉ là mục tiêu, hiện tại hiệu quả khoảng 10-20% ngày làm việc bình thường. Tác giả nhấn mạnh không muốn chạy agents vì sake of running agents, chỉ khi có task thực sự helpful.

**Điểm chính:**
- 3 giai đoạn: inefficiency → adequacy → discovery
- Drop chatbot: agent cần read files, execute programs, HTTP requests
- Reproduce work: làm twice để học patterns, break down tasks rõ ràng
- End-of-day agents: làm thêm trong thời gian không thể làm, research/triage
- Outsource slam dunks: agents làm task chắc chắn đúng, tắt notifications
- Engineer harness: AGENTS.md + programmed tools để prevent repeated mistakes
- Always running: có agent chạy mọi lúc, nhưng chỉ cho task thực sự helpful

## [Software Engineering is back](https://blog.alaindichiappari.dev/p/software-engineering-is-back)

Bài viết chia sẻ quan điểm rằng automated programming - cái tên mà Antirez ưa chuộng hơn "vibe coding" - đã mang lại software engineering thực sự quay trở lại. Tác giả đã xây dựng sản phẩm từ đầu đến cuối với frontier models và coding agents hàng giờ mỗi ngày, và kể từ tháng 12/2025, mọi thứ đã thay đổi đáng kể. Tác giả có thể là kiến trúc sư mà không cần làm việc vất vả của việc đặt từng viên gạch và trét vữa, nhưng vẫn làm được với kinh nghiệm 20 năm đặt gạch, trét vũ.

Tác giả lập luận rằng frameworks thực sự giải quyết ba vấn đề: "Simplification" - nhưng đây thực sự là intellectual surrender thay vì simplification; Automation - xử lý boilerplate; và Labour cost - vấn đề quiet mà không ai tuyên bố, cho phép công ty thuê React Developer thay vì Software Engineer. Với automated programming, automation và boilerplating chưa bao giờ rẻ để overcome, tác giả không bao giờ viết cùng một dòng code hai lần, build purpose-built tools xung quanh problem at hand. Bash (sinh năm 1989) là universal adapter và công cụ oldest đã trở nên most future-proof.

Bài viết kêu gọi mọi người ngừng accept trade-off này và ngừng wrapping broken legs in silk. Các tools và models đã ở đây, revolution đã xảy ra nhưng hầu hết mọi người vẫn đang decorate old house. Hãy bắt đầu xây dựng những thứ thuộc về mình thay vì để Google, Meta, và Vercel là kiến trúc sư, designer, thinker của bạn.

**Điểm chính:**
- Automated programming: software engineering thực sự quay trở lại
- 3 vấn đề frameworks giải quyết: simplification (thực ra surrender), automation, labour cost
- Simplification giả: mua thinking off-shelf thay vì sharpen mental models
- Labour cost thật: thuê React Developer thay vì Software Engineer
- Agents giỏi basic tools: Bash (1989) là universal adapter
- Revolution đã xảy ra: stop decorating old house, build yours
- Broken leg in silk: frameworks wrap problems không nên tồn tại

## [Art of Roads in Games](https://sandboxspirit.com/blog/art-of-roads-in-games/)

Bài viết khám phá nghệ thuật và toán học đằng sau việc mô phỏng đường trong game city builder. Tác giả chia sẻ sự say mê với đường từ khi còn nhỏ chơi SimCity 2000, và nhận ra rằng đường là nền tảng mà các thành phố được xây dựng. Mặc dù mỗi game mang lại cải thiện hơn game trước, nhưng luôn có gì đó không đúng - highway ramps unrealistically sharp hoặc wobbly, lanes supposed high-speed bent quá sharply, corner radii của intersections trông strange.

Vấn đề cơ bản nằm ở Bezier Spline - công cụ mà game developers dùng để tạo đường. Bezier curves elegant, intuitive và powerful, nhưng chúng không preserve shape và curvature khi offset. Trong thực tế, roads có shape từ underlying fact: wheel axles của vehicle giữ constant distance, tạo ra parallel paths với consistent curved shape. Bezier curves không maintain parallelism, đặc biệt với tight bends, geometry often fails với "pinching" hoặc self-intersecting.

Giải pháp? Circle Arcs - cái mà mọi người đã học trong kindergarten. Circle có magical property: không matter offset bao nhiêu, result vẫn là circular arc perfectly parallel với initial. Stitching together circular arcs với different radii có thể create any shape trong khi adhering to proper engineering principles. Circle arcs cũng mang lại bonus performance: curve-curve intersection là O(1) formula thay vì complex iterative methods như Bezier.

Nhưng circles có vấn đề: constant curvature. Khi entering circular curve từ straight line, lateral force jumps từ 0 đến fixed constant value - cảm giác terrible ở high speed. Civil engineers sử dụng transition curves, most famously the clothoid - gradually increases curvature over distance, steering wheel rotates smoothly, forces ramp up naturally. Clothoids maintain parallel offsets và continuous curvature changes, nhưng là math nightmare với differential geometry và integrals.

Tác giả quyết định build road system của riêng mình vì curiosity và vì established titles có thể không accurately render roads nhưng vẫn light-years ahead so với indie solutions. Tutorials và assets online sad, và tác giả muốn build better solution để share với anyone muốn build city builder.

**Điểm chính:**
- Roads fascination: fabric mà cities được xây dựng trong city builders
- Bezier problem: không preserve parallelism, geometry fails tại tight bends
- Circle arcs solution: maintain parallelism, O(1) intersection
- Circle limitation: constant curvature gây uncomfortable jumps ở high speed
- Clothoid transition: gradually increases curvature, math nightmare
- Indie gap: big titles accurate nhưng indie solutions sad
- Curiosity driven: muốn explore và share better solution

### Bonus

**Hình ảnh:**
![12 Architectural Concepts Developers Should Know](https://substackcdn.com/image/fetch/w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F7712ce10-d199-49ef-94f9-e983e47a92d9_2360x2852.png)

---

*Bài viết đã được review và cập nhật bởi Claude Code với Opus 4.7 (1M context).*
