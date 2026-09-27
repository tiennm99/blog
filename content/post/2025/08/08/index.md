---
title: "Newsletter #49"
date: 2025-08-08
tags: ["AI-Assisted", "PostgreSQL", "Developer-Survey", "Productivity", "Technology-Selection"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #49.*

## [PostgreSQL at Scale: Database Schema Changes Without Downtime](https://medium.com/paypal-tech/postgresql-at-scale-database-schema-changes-without-downtime-20d3749ed680)

Bài viết của James Coleman trên blog kỹ thuật PayPal (xuất phát từ đội ngũ Braintree Payments) tổng hợp kinh nghiệm thay đổi lược đồ PostgreSQL khi hệ thống thanh toán không được phép có thời gian ngừng hoạt động theo lịch. Nguyên tắc nền tảng là mã nguồn và lược đồ phải vừa tương thích tiến vừa tương thích lùi, để có thể triển khai dần và quay lui mã ứng dụng an toàn; mọi khóa độc quyền trên bảng hoặc chỉ mục chỉ được giữ tối đa khoảng 2 giây. Nhóm không gộp nhiều câu lệnh DDL vào một giao dịch để tránh deadlock, và cũng không định nghĩa thao tác hoàn tác cho lược đồ: xóa cột vừa thêm có thể mất dữ liệu, thêm lại ràng buộc có thể thất bại, nên khi cần sửa sai họ viết một thay đổi mới và "tiến lên" thay vì lùi lại.

Phần lớn bài viết đi qua từng loại thao tác. Thay vì để PostgreSQL tự lấy khóa, họ chủ động lấy khóa với `lock_timeout`, kiểm tra `pg_locks` trước để né các truy vấn chạy lâu, và tạm nghỉ giữa các lần thử để hàng đợi truy vấn kịp giải phóng. Chỉ mục được tạo và xóa bằng `CREATE INDEX CONCURRENTLY` và `DROP INDEX CONCURRENTLY`; khóa ngoại, ràng buộc CHECK hay NOT NULL được thêm với `NOT VALID` rồi chạy `VALIDATE CONSTRAINT` riêng để không phải quét cả bảng dưới khóa nặng; còn thêm cột kèm giá trị mặc định cần tách thành nhiều bước với các phiên bản trước PostgreSQL 11. Cuối bài, nhóm giới thiệu gem mã nguồn mở `pg_ha_migrations` cho Ruby on Rails đóng gói các quy tắc này.

## [The Big LLM Architecture Comparison: From DeepSeek-V3 to Kimi K2](https://magazine.sebastianraschka.com/p/the-big-llm-architecture-comparison)

Nhà nghiên cứu Sebastian Raschka đặt các mô hình ngôn ngữ lớn mở nổi bật cạnh nhau để trả lời câu hỏi: nhiều năm sau GPT gốc, kiến trúc thực sự đã thay đổi bao nhiêu? Câu trả lời là khung Transformer gần như giữ nguyên, khác biệt nằm ở các tinh chỉnh. DeepSeek V3/R1 dùng Multi-Head Latent Attention (MLA) để nén KV cache và Mixture-of-Experts (MoE) với 256 chuyên gia, mỗi token chỉ kích hoạt 9 chuyên gia (gồm một chuyên gia dùng chung), nên trong 671 tỷ tham số chỉ khoảng 37 tỷ hoạt động khi suy luận. OLMo 2 đặt RMSNorm theo kiểu Post-Norm và thêm QK-Norm để huấn luyện ổn định hơn; Gemma 3 dùng sliding window attention để giảm bộ nhớ KV cache; Mistral Small 3.1 tối ưu cho tốc độ suy luận; Llama 4 xen kẽ khối MoE với khối dense; Qwen3 có cả biến thể dense lẫn MoE; SmolLM3 thử bỏ hẳn mã hóa vị trí (NoPE); còn Kimi K2 với khoảng 1 nghìn tỷ tham số dựa trên kiến trúc DeepSeek V3, tăng số chuyên gia và giảm số đầu attention trong MLA.

Xu hướng chung là MoE ngày càng phổ biến để tăng sức chứa mà vẫn giữ chi phí suy luận thấp, các biến thể attention hiệu quả hơn như Grouped-Query Attention, MLA hay sliding window dần thay thế Multi-Head Attention truyền thống, và các nhóm ưu tiên tối ưu hiệu năng hơn là phát minh kiến trúc hoàn toàn mới. Đây là tài liệu tốt để lập trình viên nắm các thuật ngữ đang xuất hiện trong mọi báo cáo mô hình mới, và hiểu vì sao hai mô hình có cùng số tham số lại có thể chênh lệch lớn về chi phí vận hành.

## [From Async/Await to Virtual Threads](https://lucumr.pocoo.org/2025/7/26/virtual-threads/)

Armin Ronacher, tác giả Flask và Jinja, cho rằng mô hình async/await của Python đang đẩy quá nhiều độ phức tạp nội bộ sang người dùng. Vấn đề dễ thấy nhất là "hàm có màu" (colored functions): hàm async và hàm đồng bộ không gọi lẫn nhau trực tiếp được, khiến hệ sinh thái thư viện bị chia đôi. Việc hủy tác vụ cũng khó làm đúng, chẳng hạn `aiofiles` không hỗ trợ hủy đúng cách nên có thể gây treo khi dùng structured concurrency. Khi Python bắt đầu hỗ trợ free-threading, lập trình viên còn phải lo cùng lúc cả vấn đề của async lẫn của đa luồng truyền thống.

Đề xuất của ông là virtual threads: luồng nhẹ do runtime quản lý thay vì hệ điều hành, giúp các thao tác chặn trở nên không chặn một cách trong suốt và bỏ được từ khóa `async`/`await`. Các luồng được tổ chức thành thread group theo tinh thần structured concurrency: luồng con không sống lâu hơn luồng cha, context variable được kế thừa tự động từ cha sang con, khi một luồng con lỗi thì các luồng còn lại bị hủy, và nhóm chỉ kết thúc khi mọi luồng con hoàn tất. Tác giả nhấn mạnh đây chỉ là gợi ý để mở đầu thảo luận, còn nhiều câu hỏi về cú pháp và phạm vi biến trong Python chưa có lời giải; ví dụ dưới đây minh họa việc tải nhiều URL với tối đa 8 luồng đồng thời.

```python
def download_all(urls):
    results = {}
    with ThreadGroup(max_concurrency=8) as g:
        for url in urls:
            g.spawn(partial(download_and_store, results, url))
    return results
```

## ~~[Six Principles for Production AI Agents](https://www.app.build/blog/six-principles-production-ai-agents)~~

~~Với sự phát triển mạnh mẽ của các AI Agent trong thực tế, việc đưa chúng vào sản xuất đòi hỏi những nguyên tắc thiết kế chắc chắn. Bài viết này trình bày 6 nguyên tắc cốt lõi để xây dựng AI Agent hoạt động ổn định trong môi trường sản xuất:~~

~~**1. Đầu tư vào System Prompt**: Tập trung vào hướng dẫn rõ ràng, trực tiếp. Các mô hình hiện đại chỉ cần ngữ cảnh chi tiết và không mâu thuẫn, không cần các thủ thuật phức tạp.~~

~~**2. Tách biệt Ngữ cảnh**: Cung cấp kiến thức ban đầu tối thiểu, cho phép các công cụ lấy thêm ngữ cảnh khi cần. Sử dụng "nén ngữ cảnh" để quản lý độ phức tạp.~~

~~**3. Thiết kế Công cụ Cẩn thận**: Tạo các công cụ tập trung, được kiểm thử kỹ lưỡng. Giới hạn số lượng công cụ với tham số rõ ràng và đảm bảo tính idempotency.~~

~~**4. Thiết kế Vòng phản hồi**: Sử dụng phương pháp actor-critic, cho phép tạo ra sáng tạo nhưng có kiểm chứng nghiêm ngặt. Bao gồm kiểm chứng chuyên biệt cho từng lĩnh vực.~~

~~**5. Phân tích Lỗi bằng LLM**: Sử dụng nhiều agent để phân tích log và quỹ đạo hoạt động, dùng LLM để xác định các khu vực cần cải thiện.~~

~~**6. Nhận diện Hành vi gây bực xúc như Lỗi hệ thống**: Hiểu rằng agent có thể "hack" các hướng dẫn. Debug thiết kế hệ thống trước khi đổ lỗi cho mô hình.~~

~~Kết luận quan trọng: "Xây dựng AI Agent hiệu quả không phải là tìm giải pháp vạn năng... mà là thiết kế hệ thống và kỹ thuật phần mềm đúng đắn."~~

## [Working Effectively with AI Coding Tools like Claude Code](https://sajalsharma.com/posts/effective-ai-coding/)

Sajal Sharma tổng hợp các thực hành để làm việc hiệu quả với công cụ lập trình AI như Claude Code, xuất phát từ một quan điểm: AI rất giỏi hiện thực hóa, còn con người phải nắm phần kiến trúc, phán đoán và chiến lược. Trọng tâm công việc vì thế chuyển từ viết mã sang viết đặc tả: chốt các câu hỏi kiến trúc trước, lưu đặc tả chi tiết trong hệ thống quản lý phiên bản, rồi mới để AI triển khai. Hãy coi AI như một lập trình viên cặp tài năng nhưng thiếu bối cảnh nghiệp vụ, đọc lại từng dòng mã nó tạo ra và cảnh giác với các lối tắt như lạm dụng kiểu `any` trong TypeScript hay sửa triệu chứng thay vì nguyên nhân, vì AI sinh mã nhanh hơn tốc độ con người xem xét.

Về phối hợp, tác giả khuyên viết prompt thật cụ thể, luôn hỏi AI vì sao chọn giải pháp đó, và dùng thêm mô hình khác để kiểm tra chéo các quyết định phức tạp. Nên để AI lập kế hoạch trước, xem xét kỹ rồi lưu thành tệp markdown theo dõi tiến độ, và mở cuộc trò chuyện mới cho từng tính năng vì hội thoại dài làm AI kém nhất quán. Với Claude Code, tệp `CLAUDE.md` đóng vai trò bản đồ dẫn tới tài liệu kiến trúc, đặc tả API và kế hoạch hiện tại; lệnh slash dùng chung trong `.claude/commands/` giúp cả nhóm chuẩn hóa quy trình; các agent chuyên biệt cho lập kế hoạch, triển khai, xem xét và nghiên cứu giúp mỗi agent giữ ngữ cảnh gọn. Năng suất tăng mạnh là có thật, nhưng chỉ khi chất lượng được giữ bằng sự cảnh giác liên tục.

## [When Software Engineers Think They Need More Focus Time](https://jola.dev/posts/enough-focus-time)

Bài viết của Jola thách thức niềm tin phổ biến rằng kỹ sư phần mềm luôn cần thêm thời gian tập trung không bị gián đoạn để viết mã. Theo tác giả, công việc của lập trình viên là tạo ra tác động, giải quyết vấn đề và mang lại giá trị thực sự, và phần giá trị cao nhất thường diễn ra bên ngoài trình soạn thảo: phát hiện một giả định sai trong buổi họp sản phẩm trước khi cả dự án đi chệch hướng, đặt một câu hỏi làm rõ giúp nhóm tiết kiệm nhiều tuần công sức, lập trình cặp với một đồng nghiệp junior đang bế tắc, hay xem xét tài liệu thiết kế trước khi bắt tay vào triển khai. Người luôn khóa kín lịch để viết mã một mình dễ bỏ lỡ chính những cơ hội hợp tác như vậy.

Tác giả không phủ nhận vai trò của thời gian tập trung mà khuyên dùng nó có chủ đích: đo năng suất bằng giá trị mang lại thay vì số giờ viết mã, thông báo rõ lịch làm việc (ví dụ buổi sáng làm việc sâu, buổi chiều sẵn sàng hỗ trợ), liên tục tự hỏi mình có đang giải đúng bài toán hay không, và nhớ rằng tác động của một kỹ sư không chỉ nằm ở mã nguồn. Tinh thần cốt lõi của bài có thể tóm lại trong một câu: mục tiêu không phải là viết mã, mục tiêu là giải quyết vấn đề.

## [Making Postgres 42,000x slower because I am unemployed](https://byteofdev.com/posts/making-postgres-slow/)

Một thí nghiệm vừa hài hước vừa bổ ích: tác giả tự đặt luật chỉ được sửa tệp `postgresql.conf`, cơ sở dữ liệu vẫn phải xử lý được ít nhất một giao dịch trong thời gian hợp lý, rồi tìm cách làm PostgreSQL chậm nhất có thể. Bài kiểm thử là TPC-C với 128 kho hàng chạy qua Benchbase, 100 kết nối, trên máy Ryzen 7950x với 32GB RAM. Từ mức ban đầu khoảng 7.082 giao dịch/giây, việc thu nhỏ `shared_buffers` xuống vài MB buộc gần như mọi lần đọc phải xuống đĩa và kéo hiệu năng xuống vài trăm giao dịch/giây; cấu hình autovacuum chạy liên tục với ngưỡng cực thấp đẩy xuống khoảng 293; ép checkpoint WAL thật dày và đồng bộ đầy đủ còn khoảng 98.

Hai bước cuối là mạnh tay nhất: chỉnh các tham số chi phí như `random_page_cost` để bộ lập kế hoạch truy vấn gần như không dùng chỉ mục, khiến hiệu năng rơi xuống dưới 1 giao dịch/giây; rồi dùng `io_method` và `io_workers = 1` trong bản phát triển mới của PostgreSQL để dồn toàn bộ I/O qua một worker duy nhất, kết quả chỉ còn 0,016 giao dịch/giây, chậm hơn khoảng 42.000 lần. Đọc ngược lại, bài viết là bài học thiết thực về ý nghĩa của từng tham số: bộ đệm, autovacuum, WAL, chi phí truy vấn và I/O song song đều ảnh hưởng lớn đến hiệu năng, nên cần được điều chỉnh theo đặc điểm tải thực tế thay vì sửa tùy tiện.

## [Stack Overflow Developer Survey 2025](https://survey.stackoverflow.co/2025/)

Khảo sát lập trình viên thường niên lần thứ 15 của Stack Overflow thu về hơn 49.000 phản hồi từ 177 quốc gia, với 62 câu hỏi về 314 công nghệ. Điểm nổi bật nhất là khoảng cách giữa mức độ sử dụng và niềm tin vào AI: 84% lập trình viên đang dùng hoặc dự định dùng công cụ AI, 47% dùng hằng ngày, nhưng chỉ khoảng một phần ba tin vào độ chính xác của chúng, trong khi 46% chủ động hoài nghi. Nỗi bực bội lớn nhất (66%) là các lời giải "gần đúng nhưng chưa hẳn", tiếp theo là khó gỡ lỗi mã do AI tạo ra; phần lớn lập trình viên cũng chưa dùng AI agent.

Về công nghệ, Python tăng 7 điểm phần trăm lên 57,9% nhờ làn sóng AI và khoa học dữ liệu, JavaScript vẫn dẫn đầu, Visual Studio Code tiếp tục là môi trường phát triển phổ biến nhất; các mô hình GPT của OpenAI được dùng nhiều nhất còn Claude Sonnet được ngưỡng mộ nhất, và Cargo của Rust là công cụ hạ tầng được yêu thích nhất. Ở khía cạnh công việc, chỉ khoảng 24% lập trình viên thấy hài lòng với công việc (tăng so với năm trước), khoảng một phần ba làm việc từ xa hoàn toàn, và vai trò kiến trúc sư lần đầu lọt vào nhóm bốn vai trò phổ biến nhất. Với lập trình viên trẻ, đây là bức tranh hữu ích để định hướng kỹ năng: AI đã thành công cụ hằng ngày, nhưng khả năng kiểm chứng kết quả của nó mới là thứ tạo ra khác biệt.

## [Choose Boring Technology, Revisited](https://www.brethorsting.com/blog/2025/07/choose-boring-technology,-revisited/)

Aaron Brethorst nhìn lại nguyên tắc "Choose Boring Technology" mà Dan McKinley đưa ra năm 2015 và cho rằng nó còn quan trọng hơn trong thời đại AI. Ý tưởng gốc là mỗi tổ chức chỉ có một số ít "innovation token" nên cần tiêu chúng có chủ đích: khi giải quyết vấn đề thì dùng công cụ quen thuộc, khi học thì chỉ chấp nhận một ẩn số mới mỗi lần. Công nghệ "nhàm chán" có ưu điểm là các kiểu lỗi đã được biết rõ, khả năng đã được hiểu kỹ và độ tin cậy vận hành đã được chứng minh.

Vấn đề mới là trợ lý AI có thể sinh mã trông rất chuyên nghiệp cho bất kỳ ngăn xếp công nghệ nào, tạo ra cảm giác tự tin giả. Khi ghép nhiều công nghệ lạ với mã do AI viết, bạn gần như không thể kiểm chứng: không biết lựa chọn framework có phù hợp hay không, cũng không biết cần canh chừng những kiểu lỗi nào. Vì vậy, trước khi đưa một công nghệ mới vào dự án, hãy tự hỏi liệu mình có đủ khả năng xem xét mã AI viết cho công nghệ đó không; dành thời gian hiểu sâu công cụ mới đủ để kiểm tra lại gợi ý của AI; và đừng lấy AI làm lý do để học nhiều công nghệ lạ cùng lúc. Theo tác giả, AI nên là bộ khuếch đại cho những công nghệ bạn đã hiểu, chứ không phải chiếc nạng cho những công nghệ bạn chưa hiểu.

## [Agentic Coding Things That Didn't Work](https://lucumr.pocoo.org/2025/7/30/things-that-didnt-work/)

Khác với các bài chia sẻ thành công, Armin Ronacher kể về những cách tự động hóa khi lập trình với AI agent mà ông đã thử rồi bỏ. Loạt lệnh slash tự viết đều không trụ lại: `/fix-bug` không tốt hơn việc dán đường dẫn issue trên GitHub kèm suy nghĩ của mình, `/commit` sinh thông điệp không bao giờ đúng văn phong của ông, `/add-tests` và `/fix-nits` kém hơn hoặc thừa so với chỉ dẫn thông thường, còn `/next-todo` gần như không được dùng. Hook khó điều khiển và chạy formatter sau mỗi lần sửa thay vì cuối phiên, nên ông chuyển sang chặn lệnh qua PATH cho đơn giản; print mode (90% mã xác định, 10% suy luận) rất hứa hẹn nhưng còn chậm và khó gỡ lỗi; sub-agent giúp song song hóa nhưng gây rối khi vừa đọc vừa ghi, nên ông thường mở phiên mới hoặc chia sẻ suy nghĩ qua tệp markdown.

Những gì thực sự hiệu quả lại rất đơn giản: nói chuyện với máy bằng speech-to-text để truyền đạt được nhiều ý hơn, tự sao chép và dán ngữ cảnh chọn lọc, và để agent đọc `git status` để tự suy ra tệp cần sửa. Cảnh báo quan trọng nhất của bài là tự động hóa qua LLM dễ khiến người dùng ngừng suy nghĩ như một kỹ sư, và khi đó chất lượng giảm, thời gian bị lãng phí, còn bản thân không hiểu và không học được gì. Nguyên tắc rút ra: chỉ tự động hóa việc làm thường xuyên, xóa ngay những tự động hóa không dùng tới, và đánh giá kỹ kết quả trước khi tin tưởng.

## [Vibe Code is Legacy Code](https://blog.val.town/vibe-code)

Steve Krouse của Val Town nhắc lại rằng Andrej Karpathy đặt ra thuật ngữ "vibe coding" để chỉ kiểu lập trình với AI mà bạn "quên rằng mã nguồn còn tồn tại". Mà mã nguồn không ai hiểu thì đã có tên gọi: mã kế thừa (legacy code). Lập trình về bản chất là xây dựng lý thuyết về hệ thống chứ không phải sản xuất dòng mã, nên khi vibe code, bạn tích lũy nợ kỹ thuật nhanh đúng bằng tốc độ LLM sinh mã. Điều đó khiến vibe coding rất hợp với nguyên mẫu và dự án dùng một lần, như các ứng dụng nhỏ tác giả tự làm để tính tốc độ tăng trưởng hay để cầu hôn, vì mã chỉ thành gánh nặng khi phải bảo trì. Vibe coding cũng là một phổ: càng hiểu mã, bạn càng ít "vibe".

Tình huống tệ nhất là người không biết lập trình vibe code một dự án lớn định duy trì lâu dài, giống như đưa thẻ tín dụng cho trẻ con mà chưa giải thích khái niệm nợ: ban đầu hào hứng, một tháng sau nhận hóa đơn, và nhờ AI sửa lỗi lúc đó chẳng khác gì lấy thẻ này trả nợ thẻ kia. Với dự án nghiêm túc, tác giả đồng tình với Karpathy: giữ AI trong vòng kiểm soát chặt như một thực tập sinh nhiệt tình quá mức, làm chậm, cẩn trọng và tận dụng mỗi cơ hội để học. Val Town dùng trợ lý Townie theo cả hai cách, lúc để vibe code, lúc để sửa đổi chính xác trong dự án quan trọng, và tác giả tin rằng xây dựng lý thuyết sẽ vẫn là trung tâm của việc phát triển phần mềm phức tạp.

---

*Bài viết đã được viết lại bởi Claude Code với Opus 5.5 vào ngày 27/09/2026.*
