---
title: "Newsletter #86"
date: 2026-03-01
tags: ["AI-Assisted", "Newsletter", "Software Architecture", "Code Review", "Performance", "AI Adoption", "Game Development"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #86.*

## [Do Not Surrender to the Tech Tree](https://www.macroscience.org/p/do-not-surrender-to-the-tech-tree)

Tác giả Tao Burga bảo vệ "thuyết quyết định công nghệ mạnh": công nghệ phát triển theo logic nội tại của "cây công nghệ", do các phụ thuộc, động lực thị trường và hiệu quả chi phối hơn là do thiên tài cá nhân. Bằng chứng là phát minh độc lập, gần như đồng thời rất phổ biến (luyện nhôm Hall–Héroult, động cơ phản lực, vi tích phân), còn các xã hội cô lập vẫn hội tụ về bánh xe, nông nghiệp thâm canh, luyện kim và chữ viết. Nhưng tác giả bác bỏ "Technocalvinism", niềm tin rằng con người bất lực trước tiến trình ấy. Trong ngắn hạn, lựa chọn chủ động, nhất là thay đổi thứ tự xuất hiện của công nghệ, có thể để lại hệ quả lâu dài: nỗ lực chống phổ biến hạt nhân giữ số quốc gia có bom ở mức chín, cơ chế khóa PAL ngăn kích hoạt trái phép, vaccine COVID-19 ra đời sau 10 tháng thay vì 10–15 năm.

Với AI, tác giả nhấn mạnh đây là công nghệ lưỡng dụng: phục vụ cả phòng thủ lẫn tấn công mạng, cả tìm vaccine lẫn nghiên cứu mầm bệnh nguy hiểm. Thay vì chấp nhận nhánh cây mặc định, cần phát triển song song các công nghệ giảm rủi ro, như phát minh dây an toàn ngay khi có ô tô. Bài giới thiệu "The Launch Sequence" gồm 16 dự án cụ thể, chẳng hạn Operation Patchlight và The Great Refactor (dùng AI gia cố hạ tầng mạng trước các cuộc tấn công bằng AI), xác minh dựa trên phần cứng, hay ngăn "tác tử nằm vùng" cài trong mô hình. Theo tác giả, AI đang ở đúng một cửa sổ cơ hội như vậy, và nó đang khép lại rất nhanh.

## [How to Make Architecture Decisions: RFCs, ADRs, and Getting Everyone Aligned](https://lukasniessen.medium.com/how-to-make-architecture-decisions-rfcs-adrs-and-getting-everyone-aligned-ab82e5384d2f)

Lukas Niessen chia sẻ quy trình ra quyết định kiến trúc giúp tránh hai kịch bản quen thuộc: quyết định chốt vội trong một cuộc trò chuyện hành lang, hoặc tài liệu đẹp nhưng không ai đọc, cả hai đều dẫn tới hàng tháng làm lại. Quy trình có bốn bước: viết RFC (1–2 ngày), góp ý bất đồng bộ (2–3 ngày), họp quyết định (30–60 phút) và viết ADR ngay trong ngày. RFC trình bày bối cảnh, các phương án (kể cả "không làm gì"), người liên quan và câu hỏi mở; điểm mấu chốt là xếp hạng rõ ràng các ưu tiên thay vì liệt kê ưu nhược điểm, vì khi ưu tiên đã rõ thì quyết định thường hiển nhiên. Giai đoạn góp ý bất đồng bộ cho mọi người thời gian suy nghĩ, tìm hiểu, và là nơi những thành viên ít nói có tiếng nói.

Cuộc họp quyết định không phải buổi thuyết trình: mọi người đã đọc RFC, nhóm chỉ 5–8 người, dành thời gian giải quyết câu hỏi còn mở, thảo luận rồi chốt, theo đồng thuận, không ai phản đối, hoặc một người chịu trách nhiệm cuối cùng. ADR là hồ sơ ngắn gọn, lâu dài ghi lại đã quyết định gì và vì sao; RFC khám phá phương án, còn ADR lưu kết quả. Tác giả khuyên đưa kế hoạch triển khai từng bước vào RFC, dùng mô hình ngôn ngữ lớn như người cùng suy nghĩ chứ không để nó viết hộ, và tránh các lỗi phổ biến: phân tích mãi không quyết, quá nhiều người tham gia, không viết ADR, bỏ qua người ít nói.

## [The cost of a function call](https://lemire.me/blog/2026/02/08/the-cost-of-a-function-call/)

Daniel Lemire đo chi phí của lời gọi hàm và lợi ích của nội tuyến hóa (inlining), kỹ thuật tối ưu trong đó trình biên dịch chép thân hàm vào ngay vị trí gọi. Lời gọi hàm khá rẻ nhưng không miễn phí: có thể phải lưu và khôi phục tham số trên ngăn xếp, nhảy vào rồi nhảy ra khỏi hàm, cùng vài lệnh phụ ở đầu và cuối hàm. Trên MacBook chip M4 với LLVM, vòng lặp cộng dồn một mảng số nguyên qua hàm `add` tốn 0,7 ns mỗi phần tử khi gọi hàm thông thường, nhưng chỉ 0,03 ns khi được nội tuyến, tức nhanh hơn 20 lần. Lý do: sau khi nội tuyến, trình biên dịch chuyển vòng lặp sang lệnh SIMD, xử lý 16 số nguyên bằng 8 lệnh, tức nửa lệnh mỗi số thay vì 6 lệnh. Ngay cả khi tắt SIMD, bản nội tuyến vẫn nhanh khoảng 10 lần.

Với hàm phức tạp hơn như đếm khoảng trắng trong chuỗi, kết quả phụ thuộc dữ liệu đầu vào. Với chuỗi 1000 ký tự, chi phí gọi hàm gần như không đáng kể và bản nội tuyến thậm chí chậm hơn một chút (115 ns so với 111 ns); với chuỗi ngắn 0–6 ký tự, nội tuyến nhanh hơn rõ rệt (1,0 ns so với 1,6 ns). Bài học: hàm ngắn và đơn giản nên được nội tuyến khi hiệu năng là ưu tiên, còn với hàm có thời gian chạy biến động, quyết định nội tuyến nên dựa trên kích thước dữ liệu thực tế.

## [The PERFECT Code Review: How to Reduce Cognitive Load While Improving Quality](https://bastrich.tech/perfect-code-review/)

Daniil Bastrich giới thiệu PERFECT, bộ nguyên tắc giúp việc review mã nguồn bớt nặng nề về nhận thức. Thiếu cấu trúc, review dễ mơ hồ và nhiều ý kiến chủ quan, dẫn tới trì hoãn, tranh cãi chuyện vụn vặt hoặc phê duyệt qua loa. PERFECT gồm bảy nguyên tắc xếp theo mức độ quan trọng: Purpose (mã giải quyết đúng nhiệm vụ, điều kiện tiên quyết), Edge Cases (xử lý trường hợp biên, kể cả những trường hợp tưởng như "không thể xảy ra"), Reliability (không có vấn đề hiệu năng và bảo mật), Form (tuân thủ nguyên tắc thiết kế, cốt lõi là gắn kết cao và phụ thuộc thấp), Evidence (kiểm thử và CI đều qua), Clarity (mã thể hiện rõ ý đồ) và Taste (sở thích cá nhân được ghi nhận nhưng không chặn thay đổi).

Tác giả nhấn mạnh review không phải tập hợp quy tắc có-hoặc-không mà là một dải kỹ thuật có thể áp dụng độc lập; ngay cả review nhẹ nhưng có cấu trúc cũng tốn ít công mà mang lại giá trị lớn. Để áp dụng hiệu quả, nhóm nên có quy ước review bằng văn bản và liên tục cập nhật (biến mỗi mẫu góp ý lặp lại thành quy ước), yêu cầu tự review trước khi nhờ người khác, đưa review vào quy trình với quy tắc rõ ràng về người duyệt và thời hạn, tự động hóa mọi thứ có thể, ngừng phê duyệt kiểu "LGTM" cho qua, và luyện tập review thường xuyên. Khi góp ý, người review cần nêu rõ vấn đề, lý do và đề xuất phương án thay thế.

## [Semantic Search Without Embeddings](https://softwaredoug.com/blog/2026/01/08/semantic-search-without-embeddings.html)

Doug Turnbull cho rằng tìm kiếm ngữ nghĩa không đồng nghĩa với tìm kiếm vector. Tìm kiếm ngữ nghĩa cần ba thành phần: biểu diễn chung cho truy vấn và nội dung, hàm đo độ tương đồng, và tiêu chí khớp để quyết định một kết quả có thuộc phạm vi người dùng muốn hay không. Embedding làm tốt hai thành phần đầu nhưng yếu ở thành phần thứ ba: không có ngưỡng tương đồng chung cho mọi truy vấn, nên tìm "trái cây mọc trên cây" vẫn có thể ra quả bóng chày. Tác giả đề xuất dùng bộ từ vựng có kiểm soát hay hệ phân loại (taxonomy), tức cây khái niệm theo ngôn ngữ của lĩnh vực, như cây danh mục trong tập dữ liệu Wayfair WANDS. Hệ phân loại cung cấp đủ cả ba: cây danh mục là biểu diễn, khớp trực tiếp xếp trên danh mục cha và anh em, và có thể loại bỏ những gì xa hơn một mức nhất định.

Điểm thú vị là không cần chỉ mục vector: chỉ cần tách token theo phân cấp (sinh ra đường dẫn đầy đủ của mọi danh mục tổ tiên) trong chỉ mục BM25 thông thường. Vì BM25 ưu ái khớp hiếm, các nút gốc xuất hiện nhiều nên điểm thấp, còn nút con hiếm nên điểm cao, tự nhiên tạo thứ tự khớp trực tiếp > cha > ông. Hệ phân loại nên bắt đầu đơn giản rồi tách dần khi danh mục phình to, và mô hình ngôn ngữ lớn giúp phân loại sản phẩm lẫn truy vấn dễ và rẻ hơn bao giờ hết. Theo tác giả, embedding có lẽ hữu ích nhất khi dùng để xây dựng bộ phân loại, thay vì xếp hạng và truy xuất trực tiếp.

## [My AI Adoption Journey](https://mitchellh.com/writing/my-ai-adoption-journey)

Mitchell Hashimoto, người tạo ra Vagrant, Terraform và Ghostty, kể lại hành trình tìm ra giá trị của công cụ AI một cách thận trọng. Theo ông, việc làm quen với bất kỳ công cụ nào cũng qua ba giai đoạn: kém hiệu quả, tạm đủ dùng, rồi khám phá thay đổi cách làm việc. Các bước đầu gồm: bỏ chatbot để chuyển sang tác tử (agent) có thể đọc tệp, chạy chương trình và gửi yêu cầu HTTP; tự làm lại mọi commit thủ công bằng tác tử để rút ra nguyên tắc như chia nhỏ nhiệm vụ, tách phiên lập kế hoạch khỏi phiên thực thi, cho tác tử cách tự kiểm chứng; dành 30 phút cuối ngày khởi chạy tác tử cho nghiên cứu sâu, thử ý tưởng còn mơ hồ và phân loại issue/PR; rồi giao cho tác tử những việc chắc chắn làm tốt trong khi mình tập trung việc khác, đồng thời tắt thông báo để tránh chuyển ngữ cảnh.

Bước thứ năm là "kỹ thuật hóa bộ khung" (harness engineering): mỗi khi tác tử mắc lỗi, bổ sung chỉ dẫn vào AGENTS.md hoặc viết công cụ riêng để lỗi đó không lặp lại. Bước cuối là luôn có một tác tử chạy nền, kết hợp với các mô hình chậm nhưng kỹ lưỡng. Hiện ông chỉ chạy một tác tử, vừa đủ cân bằng giữa công việc thủ công sâu mà ông yêu thích và việc trông chừng máy, và mới đạt mục tiêu này khoảng 10–20% ngày làm việc. Ông nhấn mạnh không chạy tác tử chỉ để chạy, mà chỉ khi có việc thực sự hữu ích, và lưu ý rằng việc đã giao cho tác tử thì mình không còn rèn được kỹ năng ở đó.

## [Software Engineering is back](https://blog.alaindichiappari.dev/p/software-engineering-is-back)

Alain Di Chiappari cho rằng "lập trình tự động", cách gọi của Antirez thay cho nhãn "vibe coding" hời hợt, đang đưa kỹ nghệ phần mềm đích thực trở lại. Tác giả xây dựng sản phẩm từ cấu hình mạng tới định giá bằng các mô hình tiên tiến và tác tử lập trình mỗi ngày, và nhận thấy từ tháng 12/2025 mọi thứ đã thay đổi rõ rệt. Phần tư duy về kiến trúc, đánh đổi và trường hợp biên vẫn thuộc về con người; thứ biến mất là lao động gõ từng dòng mã. Tác giả được làm kiến trúc sư mà không phải tự tay xếp từng viên gạch, nhưng vẫn dựa trên hai mươi năm kinh nghiệm xếp gạch để hiểu và sửa khi cần.

Theo tác giả, framework giải quyết ba vấn đề. "Đơn giản hóa" thực chất là đầu hàng trí tuệ: mua sẵn tư duy của người khác thay vì mài sắc mô hình tư duy của mình, như bọc chân gãy trong lụa. Tự động hóa mã lặp là lý do duy nhất hợp lý, nhưng giờ tác tử khiến việc này rẻ chưa từng có: tác giả tự tạo công cụ nhỏ đúng với bài toán, và một Makefile đơn giản là đủ cho hầu hết nhu cầu. Vấn đề thứ ba, ít ai nói ra, là chi phí nhân sự: doanh nghiệp tuyển "React Developer" dễ thay thế thay vì kỹ sư phần mềm. Tác tử lại rất giỏi các công cụ lâu đời như Bash (ra đời năm 1989), thứ đang trở thành bộ chuyển đổi vạn năng. Bài viết kêu gọi ngừng để Google, Meta hay Vercel làm kiến trúc sư thay mình và bắt đầu xây dựng những thứ thực sự thuộc về mình.

## [Art of Roads in Games](https://sandboxspirit.com/blog/art-of-roads-in-games/)

Tác giả, người mê đường sá từ khi chơi SimCity 2000, phân tích vì sao đường trong game xây dựng thành phố, dù ngày càng tiến bộ, vẫn có gì đó sai: đường nối cao tốc gấp khúc hoặc uốn lượn thiếu thực tế, làn tốc độ cao bị bẻ cong quá gắt, bán kính góc giao lộ trông kỳ lạ. Gốc rễ nằm ở đường cong Bézier, công cụ quen thuộc của lập trình viên game: thanh lịch và linh hoạt nhưng không giữ được hình dạng và độ cong khi dịch song song. Ngoài đời, hai bánh xe trên cùng trục luôn cách nhau một khoảng cố định, tạo ra hai vệt song song; còn đường song song với một đường Bézier không còn là Bézier, nên ở khúc cua gắt, lưới đường bị bóp méo hoặc tự cắt nhau.

Giải pháp là cung tròn: dịch song song bao nhiêu thì kết quả vẫn là cung tròn song song với ban đầu, và ghép các cung có bán kính khác nhau có thể tạo mọi hình dạng theo đúng nguyên tắc kỹ thuật. Cung tròn còn cho phép tính giao điểm bằng công thức O(1) thay vì phương pháp lặp phức tạp như Bézier. Hạn chế của cung tròn là độ cong không đổi, khiến lực ngang tăng đột ngột khi vào cua ở tốc độ cao; kỹ sư cầu đường dùng đường cong chuyển tiếp như clothoid, có độ cong tăng dần nhưng toán học rất phức tạp. Với đường đô thị tốc độ thấp, cung tròn đã đủ tốt. Tác giả tự xây dựng hệ thống đường vì tò mò và vì tài nguyên dành cho nhà phát triển độc lập còn quá sơ sài, và muốn chia sẻ giải pháp tốt hơn cho cộng đồng.

### Bonus

**Hình ảnh:**
![12 Architectural Concepts Developers Should Know](https://substackcdn.com/image/fetch/w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F7712ce10-d199-49ef-94f9-e983e47a92d9_2360x2852.png)

---

*Bài viết đã được viết lại bởi Claude Code với Opus 5.5 vào ngày 27/09/2026.*
