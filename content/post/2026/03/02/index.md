---
title: "Newsletter #87"
date: 2026-03-02
tags: ["AI-Assisted"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #87.*

## [On cognitive debt](https://www.natemeyvis.com/on-cognitive-debt/)

Bài viết thảo luận về khái niệm "cognitive debt" (nợ nhận thức) trong bối cảnh phát triển phần mềm được hỗ trợ bởi AI. Tác giả lập luận rằng mặc dù AI-generated codebases có thể tạo ra cognitive debt, nhưng thực tế tình trạng này thường tồn tại ở mức độ cao hơn trong các codebase truyền thống. Người ta thường không nhận ra điều này vì nhiều hoạt động kỹ thuật tiêu chuẩn thực chất là quản lý cognitive debt hoặc tránh né nó với chi phí khổng lồ.

Tác giả chỉ ra ba luận điểm chính: một là, khi kiểm soát theo quy mô dự án, cognitive debt trong codebase AI thường không tồi hơn so với các phương pháp truyền thống; hai là, nhiều công việc kỹ thuật được "bình thường hóa" thực chất là quản lý cognitive debt không cần thiết; và ba là, những người sử dụng AI tốt nhất đã khá giỏi trong việc tránh cognitive debt, và chúng ta sẽ ngày càng cải thiện.

Bài viết cũng đề xuất một số kỹ thuật để giảm thiểu cognitive debt khi làm việc với AI: nhấn mạnh tính đóng gói (encapsulation), mô tả kỹ lưỡng các subsystem và interface, thực hiện các refactoring quy mô lớn với sự hỗ trợ của AI, và cải thiện bộ test ở những nơi cognitive debt đang xuất hiện.

**Điểm chính:**
- AI không làm gia tăng cognitive debt khi so sánh với các phương pháp phát triển truyền thống ở cùng quy mô
- Nhiều công việc kỹ thuật hàng ngày thực chất là hệ quả của việc đã đưa ra sự phức tạp không cần thiết
- Sử dụng AI một cách khéo léo có thể giúp giảm thiểu cognitive debt thông qua các kỹ thuật như encapsulation và refactoring

## [Why I'm not worried about AI job loss](https://davidoks.blog/p/why-im-not-worried-about-ai-job-loss)

Bài viết phản biện lại nỗi lo ngại phổ biến về việc AI sẽ gây ra mất việc làm hàng loạt. Tác giả lập luận rằng chúng ta không đang ở trong một khoảnh khắc giống như tháng 2 năm 2020 trước khi COVID bùng phát, và rằng những dự báo về sự sụp đổ của thị trường lao động là không có cơ sở. Bài viết phân tích tại sao sự thay thế lao động bằng AI sẽ diễn ra chậm hơn và ít gây tổn hại hơn nhiều người nghĩ.

Tác giả giải thích ba luận điểm chính. Thứ nhất, thay thế lao động dựa trên lợi thế so sánh chứ không phải lợi thế tuyệt đối — ngay cả khi AI có thể thực hiện mọi tốt hơn con người, sự kết hợp giữa người và AI vẫn có thể tạo ra kết quả tốt hơn. Thứ hai, thế giới đầy rẫy các "nút thắt" do con người tạo ra — luật pháp, văn hóa doanh nghiệp, chính trị, và sự kháng cự thay đổi — những thứ này sẽ đảm bảo rằng con người vẫn cần thiết trong thời gian dài. Thứ ba, nhu cầu đối với hầu hết các sản phẩm mà con người tạo ra có tính đàn hồi cao hơn chúng ta nhận thức, và hiệu quả năng suất thường bị nuốt chửng bởi tăng trưởng nhu cầu (nghịch lý Jevons).

Tác giả kết luận rằng người bình thường sẽ không có gì phải lo lắng về AI. Sự chuyển đổi kinh tế sẽ diễn ra từ từ và nhẹ nhàng hơn nhiều người nghĩ. Mặc dù một số người sẽ phải điều chỉnh, nhưng phần lớn mọi người sẽ ổn. Mối nguy hiểm thực sự không phải là tác động kinh tế của AI, mà là sự phản ứng chính trị và xã hội từ việc gây hoang mang cho công chúng một cách không cần thiết.

**Điểm chính:**
- AI sẽ không thay thế lao động con người ngay lập tức vì thế giới vẫn phụ thuộc vào các nút thắt do con người tạo ra
- Sự kết hợp giữa người và AI thường hiệu quả hơn AI hoạt động độc lập
- Nhu cầu đối với sản phẩm con người tạo ra có tính đàn hồi cao, dẫn đến nghịch lý Jevons
- Nguy cơ thực sự là sự phản ứng chính trị chống AI từ việc gây hoang mang công chúng

## [Why I don't think AI is a bubble](https://honnibal.dev/blog/ai-bubble)

Bài viết phản biện lại quan điểm cho rằng AI đang trong một "bong bóng" sắp vỡ. Tác giả Matthew Honnibal — người tạo ra thư viện spaCy NLP — lập luận rằng hiệu suất của AI có thể sẽ không đạt đến đỉnh cao, ít nhất là những lập luận phổ biến về việc tại sao nó sẽ đạt đỉnh là không thuyết phục. Ông giải thích sự phát triển của các mô hình "reasoning" và cách chúng hoạt động khác biệt so với các mô hình completion đơn thuần.

Tác giả phân tích lịch sử phát triển từ GPT-1 đến các mô hình reasoning hiện đại như Claude Opus và GPT-5. Sự thay đổi chính là kết hợp giữa generative AI và deep reinforcement learning — cho phép mô hình tự tạo ra các bước trung gian để giải quyết vấn đề thay vì chỉ dự đoán từ tiếp theo. Logic là công việc, ngay cả trong hệ thống thuần túy, và suy luận không bao giờ miễn phí. Các mô hình reasoning sử dụng reinforcement learning để học các chiến lược chung cho việc giải quyết vấn đề.

Tác giả chỉ ra hai đòn bẩy mới để cải thiện LLMs: cho phép mô hình chạy lâu hơn (làm nhiều reasoning hơn) và thêm nhiều reinforcement learning hơn. Không có giới hạn dữ liệu rõ ràng cho reinforcement learning vì suy luận là một hàm một chiều — dễ dàng nhận diện một con dẫn đến kết luận đúng hơn là tạo ra nó. Mặc dù tác giả không tin tưởng vào OpenAI cụ thể, ông tin rằng các trung tâm dữ liệu sẽ được sử dụng hiệu quả.

**Điểm chính:**
- Hiệu suất AI có thể sẽ không đạt đỉnh vì các mô hình reasoning có hai đòn bẩy mới: thời gian chạy và reinforcement learning
- Các mô hình reasoning kết hợp generative AI với reinforcement learning để học các chiến lược giải quyết vấn đề chung
- Logic và suy luận đòi hỏi công việc tính toán, không bao giờ miễn phí ngay cả trong hệ thống thuần túy
- Không có giới hạn dữ liệu cho reinforcement learning vì mô hình có thể tự cải thiện thông qua việc nhận diện các con suy luận thành công

## [I guess I kinda get why people hate AI](https://anthony.noided.media/blog/ai/programming/2026/02/14/i-guess-i-kinda-get-why-people-hate-ai.html)

Tác giả, một lập trình viên đang làm việc tại Hawaii, chia sẻ suy nghĩ về lý do tại sao mọi người bắt đầu ghét AI mặc dù bản thân ông vẫn sử dụng và đánh giá cao công nghệ này. Bài viết bắt đầu với nỗi lo ngại của tác giả về việc liệu công việc mới của ông có phải là công việc cuối cùng hay không, một sự thay đổi trong tư duy so với trước đây khi ông chỉ lo lắng về việc liệu mình có _cần_ làm việc hay không.

Tác giả chỉ ra nhiều lý do khiến "vibe" của AI hiện tại rất tồi tệ. Thứ nhất, những người đứng đầu các công ty AI liên tục marketing sản phẩm của họ bằng cách đe dọa rằng AI sẽ lấy đi việc làm của mọi người, điều mà tác giả mô tả là "hoàn toàn điên rồ". Thứ hai, AI hiện nay rất hữu ích cho việc tạo ra nội dung rác — sinh viên dùng để gian lận, video giả về Elon Musk, và các video kỳ lạ trên TikTok. Thứ ba, AI gây ra các vấn đề thực tế như giá RAM tăng cao và các chương trình bug bounty bị ngừng lại vì quá nhiều báo cáo sai từ AI.

Mặc dù tác giả vẫn tin rằng AI sẽ rất hữu ích trong tương lai và ông vẫn tiếp tục sử dụng nó, ông lo ngại rằng các công ty AI dường như không quan tâm đến việc giảm thiểu các tác động tiêu cực của sản phẩm họ. Tác giả đề xuất một số giải pháp như watermarking nội dung AI, chặn misinformation hơn nữa trên YouTube, và cho phép các dự án open-source yêu cầu không bị AI quét lỗ hổng.

**Điểm chính:**
- Các CEO AI đang marketing bằng cách đe dọa người dùng thay vì giới thiệu lợi ích, một chiến lược "hoàn toàn điên rồ"
- AI làm giảm rào cản cho nội dung rác nhưng chưa đủ tốt để thay thế hoàn toàn công việc có ý nghĩa
- Các công ty AI dường như không quan tâm đến việc giải quyết các tác động tiêu cực như misinformation, gian lận trong giáo dục, và tăng giá phần cứng
- Tác giả đề xuất các giải pháp như watermarking, chặn misinformation, và bảo vệ các dự án open-source khỏi AI quét lỗ hổng

## [Uber's Rate Limiting System](https://www.uber.com/en-IN/blog/ubers-rate-limiting-system/)

Bài viết chi tiết về cách Uber xây dựng hệ thống rate limiting phân tán quy mô lớn có khả năng xử lý hàng trăm triệu yêu cầu mỗi giây qua hàng nghìn dịch vụ microservices. Trước khi có GRL (Global Rate Limiter), các team tại Uber triển khai rate limiting theo cách riêng lẻ, dẫn đến cấu hình không nhất quán, độ trễ cao từ Redis, và khó khăn trong vận hành. Uber đã giải quyết vấn đề bằng cách tích hợp rate limiting trực tiếp vào service mesh.

Hệ thống GRL sử dụng kiến trúc ba tầng với các client trong service mesh data plane, các aggregator cấp zone, và các controller cấp vùng. Thay vì sử dụng bộ đếm tập trung, GRL áp dụng mô hình probabilistic dropping được điều khiển bởi control plane — các client quyết định địa phương có nên drop request hay không dựa trên các chỉ thị drop ratio từ control plane. Thiết kế này cho phép decisions cực nhanh với độ trễ thấp trong khi vẫn duy trì coordination toàn cầu trong vài giây.

Uber cũng xây dựng RLC (Rate Limit Configurator) để tự động hóa việc cấu hình rate limit. RLC phân tích định kỳ metrics traffic trực tiếp và cập nhật cấu hình rate limit dựa trên nhu cầu quan sát được, đảm bảo limits luôn mới và chính xác. Kết quả là giảm độ trễ median khoảng 1ms, giảm độ trễ P90 hàng chục ms, và cải thiện độ trễ đuôi (P99.5) lên đến 90%. GRL hiện xử lý khoảng 80 triệu yêu cầu mỗi giây trên hơn 1,100 dịch vụ.

**Điểm chính:**
- GRL sử dụng kiến trúc phân tán ba tầng với probabilistic dropping để đạt độ trễ thấp và coordination toàn cầu
- Hệ thống loại bỏ dependency Redis, giảm độ trễ median 1ms và cải thiện độ trễ đuôi lên đến 90%
- RLC tự động hóa cấu hình rate limit bằng cách phân tích traffic trực tiếp và cập nhật limits dựa trên nhu cầu thực tế
- GRL xử lý 80 triệu RPS trên hơn 1,100 dịch vụ và đã ngăn chặn thành công các sự cố quá tải và tấn công DDoS

## [Agents (Feb 2026)](https://calv.info/agents-feb-2026)

Bài viết chia sẻ kinh nghiệm thực tế của tác giả về việc sử dụng các coding agent khác nhau bao gồm Claude Code (Opus) và Codex (GPT-5.3). Tác giả, người từng tham gia phát triển Codex web product, đã đi đến kết luận rằng cả hai mô hình đều có điểm mạnh và điểm yếu riêng liên quan đến cách đào tạo của chúng. Sự thay đổi lớn nhất trong workflow của ông là thời gian của ông giờ đây trở thành yếu tố quan trọng nhất — ông chọn coding agent dựa trên thời gian có sẵn và mức độ tự chủ mong muốn.

Tác giả giải thích các nguyên tắc hướng dẫn khi sử dụng coding agents. Điều quan trọng nhất là phải hiểu context — các agent thực sự đang làm next token prediction và mỗi token phải nằm trong context window. Điều này dẫn đến nhiều hệ quả: công việc cần được chia nhỏ, compaction là kỹ thuật có loss, nên externalize context vào filesystem, và nên ở trong "nửa thông minh" của context window. Hiệu năng của mô hình bị chi phối bởi cả hiệu năng thuần túy của mô hình và khả năng quản lý nhiều context window cũng như ủy quyền cho sub-agents.

Opus xuất sắc trong việc làm việc across context windows một cách hiệu quả, sử dụng tools tốt hơn, và có tính cách "người" hơn. Opus thường xuyên spin up nhiều sub-agents song song, sử dụng tool Explore rất nhanh với Haiku, và được đào tạo tốt để sử dụng các tools trên laptop. Trong khi đó, Codex tỏa sáng ở độ chính xác của code — code của Codex có ít bugs hơn đáng kể so với Opus, mặc dù Codex chậm hơn vì không delegate tasks across context windows tốt như Opus.

Tác giả chia sẻ nhiều kỹ thuật và workflows hữu ích bao gồm: sử dụng thư mục `plans/` cho các kế hoạch được đánh số, leverage Cloudflare Durable Objects cho APIs, sử dụng worktrees song song, và quy trình Plan-Implement-Review. Ông cũng xây dựng nhiều skills để tự động hóa workflows như `/commit`, `/worktree`, `/implement`, `/address-bugs`, và `/pr-pass`. Tương lai theo hướng có laptop hoặc cloud sandbox constantly churning on ideas trong background, và ngày càng nhiều, ideas, architecture, và project sequencing sẽ trở thành các yếu tố giới hạn.

**Điểm chính:**
- Opus xuất sắc ở context management, tool use, và tính cách con người trong khi Codex có độ chính xác code cao hơn
- Hiểu context window là quan trọng — công việc cần được chia nhỏ và externalize context vào filesystem
- Skills cho phép tự động hóa workflows và split context windows hiệu quả
- Tương lai hướng tới việc agents chạy 24/7 với ideas, architecture, và project sequencing trở thành yếu tố giới hạn

## [The Software Industrial Revolution](https://cannoneyed.com/essays/software-industrial-revolution)

Bài viết so sánh sự thay đổi hiện tại trong phát triển phần mềm với Cách mạng Công nghiệp lần đầu tiên. Tác giả lập luận rằng chúng ta đang ở bước ngoặt của "Cách mạng Công nghiệp Phần mềm" — nơi AI coding agents vừa "click" và bắt đầu hoạt động hiệu quả. Giống như Spinning Jenny năm 1764 đã song song hóa quy trình dệt, giảm giá cotton cloth 90%, AI coding agents đang tự động hóa sản xuất phần mềm và giảm chi phí sản xuất hàng cấp độ.

Tác giả giải thích rằng phần mềm đã "ăn" thế giới — ngành công nghệ chiếm khoảng 35% của S&P 500 và gần 50% nếu bao gồm cả communications. Nhưng chi phí sản xuất phần mềm cực kỳ cao đòi hỏi các mô hình kinh doanh problem như VC-funded growth-at-all-costs và "enshittification" của Cory Doctorow. Sự dồi dào của phần mềm thông qua tự động hóa sẽ mở rộng không gian mô hình kinh doanh phần mềm sang nhiều dạng bền vững hơn.

Tác giả sử dụng ví dụ về Epic — công ty nắm 42% thị trường bệnh viện acute care Mỹ với biên lợi nhuận 30% — để minh họa cách chi phí phần mềm cao tạo ra độc quyền và kìm hãm cạnh tranh. Khi phần mềm trở nên rẻ hơn thông qua tự động hóa, chúng ta sẽ thấy sự bùng nổ của phần mềm bespoke mới trên mọi ngành và ngách. Tác giả kết luận rằng mặc dù việc sản xuất code sẽ thay đổi căn bản, các kỹ năng cốt lõi của software engineering — modeling domains, quản lý complexity, và sự tương tác giữa phần mềm và thế giới thực — sẽ chỉ trở nên quan trọng hơn.

**Điểm chính:**
- Cách mạng Công nghiệp Phần mềm đang giảm chi phí sản xuất phần mềm hàng cấp độ, giống như Cách mạng Công nghiệp giảm chi phí vải
- Chi phí phần mềm cao tạo ra độc quyền và các mô hình kinh doanh problem như enshittification
- Sự dồi dào của phần mềm sẽ cho phép bất kỳ ai cũng có thể tạo ra công cụ kỹ thuật số mà họ cần
- Các kỹ năng cốt lõi của software engineering sẽ trở nên quan trọng hơn ngay cả khi viết code bằng tay trở nên ít liên quan hơn
