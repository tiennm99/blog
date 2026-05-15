---
title: "Newsletter #49"
date: 2025-08-08
tags: ["AI-Assisted", "PostgreSQL", "Developer-Survey", "Productivity", "Technology-Selection"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #49.*

## [PostgreSQL at Scale: Database Schema Changes Without Downtime](https://medium.com/paypal-tech/postgresql-at-scale-database-schema-changes-without-downtime-20d3749ed680)

Bài viết từ đội ngũ kỹ thuật PayPal chia sẻ kinh nghiệm thực thi thay đổi lược đồ cơ sở dữ liệu PostgreSQL ở quy mô lớn mà không gây gián đoạn dịch vụ. Đây là một thách thức lớn đối với các hệ thống có lưu lượng truy cập cao và yêu cầu hoạt động liên tục 24/7.

PayPal đã phát triển một bộ công cụ và quy trình để thực hiện các thay đổi lược đồ một cách an toàn, bao gồm:

- **Phương pháp thay đổi từng bước**: Thay vì thực hiện các thay đổi lớn một lần, họ chia nhỏ thành nhiều bước nhỏ có thể hoàn tác
- **Công cụ tự động hóa**: Phát triển các script và công cụ để tự động hóa quá trình di chuyển và kiểm tra tính nhất quán dữ liệu
- **Chiến lược rollback**: Luôn có kế hoạch hoàn tác rõ ràng cho mọi thay đổi
- **Giám sát liên tục**: Theo dõi hiệu suất và tình trạng hệ thống trong suốt quá trình thay đổi

Bài viết cung cấp những bài học kinh nghiệm quý báu cho các kỹ sư làm việc với cơ sở dữ liệu quy mô lớn, đặc biệt là trong môi trường sản xuất có yêu cầu độ tin cậy cao.

## [The Big LLM Architecture Comparison: From DeepSeek-V3 to Kimi K2](https://magazine.sebastianraschka.com/p/the-big-llm-architecture-comparison)

Sebastian Raschka, tác giả của cuốn "Machine Learning with PyTorch and Scikit-Learn", đã thực hiện một so sánh toàn diện về kiến trúc của các mô hình ngôn ngữ lớn hiện đại. Bài viết phân tích chi tiết 5 kiến trúc chính đang định hình tương lai của AI:

**DeepSeek V3/R1** sử dụng Multi-Head Latent Attention (MLA) kết hợp với Mixture-of-Experts (MoE) có 256 chuyên gia, chỉ kích hoạt 9 chuyên gia cho mỗi lần suy luận với 37 tỷ tham số.

**OLMo 2** nổi bật với cách bố trí lớp chuẩn hóa độc đáo, sử dụng RMSNorm với cấu hình "Post-Norm" và giới thiệu QK-Norm để tăng tính ổn định của attention.

**Gemma 3** áp dụng sliding window attention giúp giảm sử dụng bộ nhớ KV cache, kết hợp cả Pre-Norm và Post-Norm RMSNorm.

**Qwen3** cung cấp cả biến thể dense (0.6B đến 32B tham số) và MoE (30B-A3B và 235B-A22B), cho phép lựa chọn linh hoạt theo nhu cầu tính toán.

**Kimi 2** với 1 nghìn tỷ tham số, dựa trên kiến trúc DeepSeek V3 nhưng sử dụng ít đầu attention hơn trong Multi-Head Latent Attention.

Bài viết nhấn mạnh xu hướng tăng cường sử dụng MoE, các cơ chế attention sáng tạo và tập trung vào hiệu quả suy luận. Đây là tài liệu tham khảo quan trọng cho các lập trình viên muốn hiểu rõ sự phát triển của kiến trúc LLM và lựa chọn mô hình phù hợp với ràng buộc tính toán cụ thể.

## [From Async/Await to Virtual Threads](https://lucumr.pocoo.org/2025/7/26/virtual-threads/)

Armin Ronacher, tác giả của Flask và Jinja, đã đề xuất một tầm nhìn độc đáo về tương lai của lập trình đồng thời trong Python thông qua "virtual threads" - một thay thế tiềm năng cho mô hình async/await hiện tại.

Vấn đề cốt lõi mà virtual threads muốn giải quyết là "colored functions" - hiện tượng các hàm async và sync không thể tương tác trực tiếp, tạo ra sự phức tạp và chia cắt trong hệ sinh thái thư viện.

Kỹ thuật virtual threads sẽ chuyển độ phức tạp của lập trình đồng thời vào các API nội bộ của trình thông dịch, cung cấp:

- **Hủy bỏ tự động**: Hỗ trợ cancellation mà không cần quản lý thủ công
- **Kế thừa ngữ cảnh**: Context được truyền tự động giữa các virtual thread
- **Kiểm soát đồng thời**: Giới hạn số lượng thread đồng thời một cách dễ dàng

Ví dụ về cách sử dụng:

```python
def download_all(urls):
    results = {}
    with ThreadGroup(max_concurrency=8) as g:
        for url in urls:
            g.spawn(partial(download_and_store, results, url))
    return results
```

Đây hiện tại chỉ là "đề xuất thảo luận" nhưng thể hiện tầm nhìn tiền phong về việc đơn giản hóa lập trình đồng thời, giảm tải trí tuệ cho lập trình viên và cải thiện hiệu suất thông qua cơ chế điều phối virtual thread của runtime.

## [Six Principles for Production AI Agents](https://www.app.build/blog/six-principles-production-ai-agents)

Với sự phát triển mạnh mẽ của các AI Agent trong thực tế, việc đưa chúng vào sản xuất đòi hỏi những nguyên tắc thiết kế chắc chắn. Bài viết này trình bày 6 nguyên tắc cốt lõi để xây dựng AI Agent hoạt động ổn định trong môi trường sản xuất:

**1. Đầu tư vào System Prompt**: Tập trung vào hướng dẫn rõ ràng, trực tiếp. Các mô hình hiện đại chỉ cần ngữ cảnh chi tiết và không mâu thuẫn, không cần các thủ thuật phức tạp.

**2. Tách biệt Ngữ cảnh**: Cung cấp kiến thức ban đầu tối thiểu, cho phép các công cụ lấy thêm ngữ cảnh khi cần. Sử dụng "nén ngữ cảnh" để quản lý độ phức tạp.

**3. Thiết kế Công cụ Cẩn thận**: Tạo các công cụ tập trung, được kiểm thử kỹ lưỡng. Giới hạn số lượng công cụ với tham số rõ ràng và đảm bảo tính idempotency.

**4. Thiết kế Vòng phản hồi**: Sử dụng phương pháp actor-critic, cho phép tạo ra sáng tạo nhưng có kiểm chứng nghiêm ngặt. Bao gồm kiểm chứng chuyên biệt cho từng lĩnh vực.

**5. Phân tích Lỗi bằng LLM**: Sử dụng nhiều agent để phân tích log và quỹ đạo hoạt động, dùng LLM để xác định các khu vực cần cải thiện.

**6. Nhận diện Hành vi gây bực xúc như Lỗi hệ thống**: Hiểu rằng agent có thể "hack" các hướng dẫn. Debug thiết kế hệ thống trước khi đổ lỗi cho mô hình.

Kết luận quan trọng: "Xây dựng AI Agent hiệu quả không phải là tìm giải pháp vạn năng... mà là thiết kế hệ thống và kỹ thuật phần mềm đúng đắn."

## [Working Effectively with AI Coding Tools like Claude Code](https://sajalsharma.com/posts/effective-ai-coding/)

Sajal Sharma, với kinh nghiệm phong phú trong việc sử dụng các công cụ AI coding, đã tổng hợp những thực tiễn tốt nhất để làm việc hiệu quả với AI trong phát triển phần mềm. Bài viết đặc biệt có giá trị khi AI coding tools ngày càng trở thành công cụ không thể thiếu trong quy trình phát triển.

**Thay đổi tư duy**: Thay vì tập trung vào việc viết mã trực tiếp, hãy ưu tiên thiết kế kiến trúc và hệ thống. Coi đặc tả kỹ thuật như sản phẩm quan trọng và xem AI như một "cặp lập trình viên" cần được hướng dẫn và xem xét kỹ lưỡng.

**Kiểm soát chất lượng**: Luôn xem xét tích cực mã do AI tạo ra, tin vào trực giác khi cảm thấy có gì đó không ổn. Đặc biệt chú ý đến các lối tắt tiềm ẩn như việc lạm dụng kiểu `any` và thường xuyên kiểm tra, dọn dẹp nợ kỹ thuật.

**Kỹ thuật hợp tác**: Cực kỳ cụ thể trong các prompt AI, yêu cầu giải thích cho các giải pháp được đề xuất. Sử dụng nhiều mô hình AI để kiểm tra chéo và tạo các lệnh slash chung cho team để chuẩn hóa quy trình làm việc.

**Tối ưu hóa quy trình**: Áp dụng phương pháp "lập kế hoạch trước", quản lý ngữ cảnh cuộc trò chuyện cẩn thận, duy trì tài liệu đầy đủ và phát triển kiến trúc đa-agent cho các dự án phức tạp.

**Giá trị con người vẫn quan trọng**: Tập trung vào tư duy chiến lược và giao tiếp với các bên liên quan. Chia nhỏ tác vụ phức tạp thành đặc tả rõ ràng, cung cấp bối cảnh kinh doanh và đưa ra các quyết định quan trọng.

Lời khuyên thiết thực: Tạo file `CLAUDE.md` để ghi lại ngữ cảnh dự án, tiêu chuẩn coding và các lệnh thường dùng cho AI assistant. Đội ngũ thành công là những ai coi AI như đối tác mạnh mẽ, không phải là thay thế hay đối thủ cạnh tranh.

## [When Software Engineers Think They Need More Focus Time](https://jola.dev/posts/enough-focus-time)

Jola Dev đặt ra một câu hỏi thách thức quan niệm truyền thống về năng suất lập trình viên: Liệu "thời gian tập trung" có thực sự là thứ các kỹ sư phần mềm cần nhiều hơn? Bài viết mang đến góc nhìn mới mẻ về việc tái định nghĩa năng suất trong ngành công nghệ.

**Tái định nghĩa năng suất**: Năng suất không phải là thời gian code không bị gián đoạn. Công việc của lập trình viên là tạo ra tác động, giải quyết vấn đề, mang lại giá trị có ý nghĩa. Những công việc có giá trị cao nhất thường xảy ra bên ngoài việc viết mã trực tiếp.

**Các hoạt động có giá trị nhất của lập trình viên**:
- Đặt câu hỏi làm rõ vấn đề
- Xem xét tài liệu thiết kế
- Lập trình theo cặp (pair programming)
- Sẵn sàng tư vấn nhanh cho đồng nghiệp
- Kiểm tra các giả định sản phẩm
- Chạy thử nghiệm và thí nghiệm

**Kỹ thuật quản lý thời gian thực tiễn**: Chỉ định các khoảng thời gian tập trung cụ thể (ví dụ: làm việc sâu vào buổi sáng), gộp các cuộc họp vào những ngày nhất định, truyền đạt rõ ràng về tính sẵn có, ưu tiên học hỏi và hợp tác nhóm.

**Triết lý cốt lõi**: "Mục tiêu không phải là viết mã. Mục tiêu là giải quyết vấn đề."

Phương pháp được khuyến nghị là duy trì kết nối với nhóm, đặt câu hỏi chiến lược, biết khi nào nên code và khi nào nên hợp tác, tối ưu hóa cho tác động tổng thể của nhóm và sản phẩm thay vì thời gian code cá nhân. Bài viết nhắc nhở rằng giá trị thực sự của một lập trình viên không chỉ nằm ở số dòng code mà ở khả năng tạo ra tác động tích cực cho tổ chức và người dùng.

## [Making Postgres 42,000x slower because I am unemployed](https://byteofdev.com/posts/making-postgres-slow/)

Một bài viết hài hước nhưng đầy tính giáo dục từ Byte of Dev, minh họa cách những thay đổi cấu hình tưởng chừng nhỏ có thể làm giảm hiệu suất PostgreSQL một cách đáng kinh ngạc. Tác giả đã "thành công" làm chậm PostgreSQL từ 7,082 giao dịch/giây xuống chỉ còn 0.016 giao dịch/giây.

**Các vấn đề hiệu suất phổ biến**:
- Cấu hình buffer cache không hiệu quả
- Hoạt động autovacuum quá thường xuyên
- Ghi Write-Ahead Logging (WAL) quá mức
- Xử lý I/O không tối ưu

**Các anti-pattern được minh họa**:
- Giảm shared buffer cache từ 10GB xuống 8MB
- Thiết lập autovacuum quá aggressive gây ra bảo trì liên tục
- WAL checkpoint quá thường xuyên
- Buộc tất cả I/O qua một thread duy nhất

**Tham số cấu hình quan trọng**:
- `shared_buffers`: Kiểm soát bộ nhớ cho database page caching
- Các tham số `autovacuum_*`: Quản lý bảo trì tự động
- Các tham số `wal_*`: Kiểm soát hành vi Write-Ahead Logging
- `random_page_cost`: Ảnh hưởng đến query planning và sử dụng index
- `io_method` và `io_workers`: Xác định chiến lược xử lý I/O

**Thực tiễn tốt nhất** (được ngụ ý):
- Điều chỉnh cẩn thận `shared_buffers` phù hợp với workload
- Cấu hình autovacuum với ngưỡng hợp lý
- Tối ưu hóa WAL và checkpoint settings
- Sử dụng xử lý I/O song song
- Giám sát và điều chỉnh cấu hình database dựa trên đặc điểm workload cụ thể

Bài viết là một lời nhắc nhở thú vị về tầm quan trọng của việc hiểu rõ cấu hình PostgreSQL và tác động của nó đến hiệu suất hệ thống.

## [Stack Overflow Developer Survey 2025](https://survey.stackoverflow.co/2025/)

Khảo sát Developer Survey 2025 của Stack Overflow đã thu thập 49,009 phản hồi từ 166 quốc gia, bao gồm 314 công nghệ khác nhau trong khoảng thời gian từ 29/5 đến 23/6/2025. Đây là một trong những khảo sát toàn diện nhất về cộng đồng lập trình viên thế giới.

**AI và Công nghệ**: 84% lập trình viên đang sử dụng hoặc có kế hoạch sử dụng công cụ AI, tuy nhiên tình cảm tích cực về AI đã giảm xuống còn 60% trong năm 2025. Đáng chú ý, "nhiều lập trình viên không tin tưởng vào độ chính xác của công cụ AI hơn là tin tưởng."

**Bối cảnh Lập trình viên**: 76% là lập trình viên chuyên nghiệp, 35% có kinh nghiệm lập trình dưới 10 năm. Các quốc gia có nhiều phản hồi nhất là Mỹ, Đức và Ấn Độ.

**Công việc và Sự hài lòng**: Gần một phần ba lập trình viên làm việc từ xa, chỉ 24% hài lòng với công việc hiện tại. Các yếu tố hàng đầu tạo sự hài lòng trong công việc là "quyền tự chủ/tin cậy, lương cạnh tranh và giải quyết các vấn đề thực tế."

**Xu hướng Công nghệ**: Python tăng trưởng đáng kể về mức độ áp dụng, Visual Studio và Visual Studio Code vẫn là các môi trường phát triển hàng đầu, các mô hình OpenAI GPT được sử dụng rộng rãi nhất trong các mô hình ngôn ngữ lớn.

**Thông tin về Cộng đồng**: 82% truy cập Stack Overflow ít nhất hàng tháng, các lập trình viên trẻ tuổi thích các định dạng nội dung tương tác hơn. Khảo sát cho thấy "lập trình viên ở mọi cấp độ đều đang khám phá bối cảnh AI đang phát triển nhanh chóng."

Khảo sát này cung cấp cái nhìn toàn diện về tình trạng hiện tại và xu hướng tương lai của ngành công nghệ, đặc biệt là tác động ngày càng tăng của AI trong quy trình phát triển phần mềm.

## [Choose Boring Technology, Revisited](https://www.brethorsting.com/blog/2025/07/choose-boring-technology,-revisited/)

Bret Horsting nhìn lại nguyên tắc "Chọn công nghệ nhàm chán" trong bối cảnh thời đại AI, mang đến góc nhìn cập nhật về việc lựa chọn công nghệ trong môi trường phát triển phần mềm hiện đại. Bài viết đặc biệt có giá trị khi các công cụ AI coding ngày càng phổ biến.

**Nguyên tắc cốt lõi**: Giới hạn "innovation tokens" bằng cách chọn các công nghệ đã được thiết lập và hiểu rõ. Thay vì theo đuổi những công nghệ mới nhất, hãy tập trung vào những công nghệ có chế độ lỗi đã biết, khả năng được hiểu rõ và độ tin cậy vận hành đã được chứng minh.

**Khung ra quyết định**:
- Khi giải quyết vấn đề: Tuân thủ các công nghệ đã biết
- Khi học hỏi: Giới hạn mình ở một công nghệ mới duy nhất
- Ưu tiên các công nghệ có chế độ lỗi đã biết, khả năng được hiểu rõ và độ tin cậy vận hành đã chứng minh

**Cân nhắc trong thời đại AI**: Các công cụ AI coding có thể tạo ra mã hợp lý, nhưng không thể thay thế sự hiểu biết sâu sắc về công nghệ. Nguy hiểm khi kết hợp nhiều công nghệ chưa biết với mã do AI tạo ra. AI trở nên mạnh mẽ nhất khi được sử dụng với các công nghệ bạn đã hiểu rõ.

**Hướng dẫn thực tiễn**: Trước khi áp dụng công nghệ mới, hãy tự hỏi: "Tôi có thể xem xét đầy đủ mã triển khai do AI tạo ra không?" Hiểu sâu các công nghệ mới trước khi sử dụng hỗ trợ AI, tránh học đồng thời nhiều công nghệ mới, nhận ra rằng mã do AI tạo ra có thể trông chuyên nghiệp nhưng chứa lỗi tiềm ẩn.

Câu trích dẫn then chốt: "Công nghệ nhàm chán nhất trong stack của bạn có thể chính là công nghệ bạn hiểu đủ rõ để biết khi nào AI sai."

Lời khuyên tổng quát là ưu tiên sự hiểu biết công nghệ hơn tính mới lạ, và sử dụng AI như một bộ nhân tốc cho kiến thức hiện có thay vì thay thế cho việc học hỏi căn bản.

## [Agentic Coding Things That Didn't Work](https://lucumr.pocoo.org/2025/7/30/things-that-didnt-work/)

Armin Ronacher chia sẻ thẳng thắn về những thất bại trong việc áp dụng AI coding agents, mang đến những bài học quý báu từ thực tiễn. Thay vì tập trung vào thành công, bài viết này khám phá những gì không hiệu quả và tại sao - một góc nhìn hiếm có trong làn sóng hype về AI.

**Nguyên tắc tự động hóa**: Chỉ tự động hóa các tác vụ được thực hiện thường xuyên và xóa bỏ các workflow tự động không được sử dụng nhất quán. "Tôi chỉ tự động hóa những thứ tôi làm thường xuyên."

**Các lần thử tự động hóa thất bại**:
- `/fix-bug`: Không cải thiện đáng kể so với thảo luận thủ công về vấn đề
- `/commit`: Thông điệp commit không bao giờ khớp với phong cách cá nhân
- `/add-tests`: Tạo test không nhất quán tốt hơn
- `/fix-nits`: Các lệnh linting trở nên dư thừa

**Bài học về quy trình**: Speech-to-text và chia sẻ ngữ cảnh hiệu quả hơn tự động hóa phức tạp. Copy/paste vẫn là phương pháp đơn giản nhưng mạnh mẽ. Hook và print mode có tiềm năng nhưng hiện tại thiếu độ tin cậy.

**Cảnh báo quan trọng về AI workflow**: "Có một rủi ro ẩn lớn với tự động hóa thông qua LLM: nó khuyến khích sự vô cảm tinh thần."

**Chiến lược đánh giá**: Kiểm tra tự động hóa bằng cách thực hiện tác vụ nhiều lần, đánh giá thủ công sự khác biệt và mức độ chấp nhận kết quả, duy trì tư duy kỹ sư tích cực trong công việc có hỗ trợ AI.

Bài học cốt lõi: Tính đơn giản và sự tham gia của con người quan trọng hơn các quy trình tự động phức tạp. Liên tục đánh giá và sẵn sàng loại bỏ các công cụ không hiệu quả. Đây là lời nhắc nhở có giá trị về việc duy trì tư duy phê phán khi làm việc với AI.

## [Vibe Code is Legacy Code](https://blog.val.town/vibe-code)

Val Town mang đến một quan điểm thú vị và có phần gây tranh cãi về "Vibe Code" - thuật ngữ mô tả cách lập trình với sự hỗ trợ AI mà bạn "quên rằng mã nguồn còn tồn tại". Bài viết này khám phá những ưu nhược điểm của phương pháp này và đặt ra câu hỏi về tương lai của việc phát triển phần mềm.

**Khái niệm**: Vibe coding là lập trình có sự hỗ trợ AI với mức độ hiểu biết tối thiểu về mã nguồn. Đây là một phổ của sự hiểu biết mã, từ hiểu biết tối thiểu đến kiến thức sâu sắc. Phù hợp nhất cho prototype và các dự án dùng một lần.

**Ứng dụng thực tiễn**: Phát triển nhanh các ứng dụng nhỏ, có mục đích duy nhất; prototype nhanh; các dự án cá nhân không yêu cầu bảo trì dài hạn.

**Triết lý cốt lõi**: Lập trình về cơ bản là "xây dựng lý thuyết", không chỉ đơn thuần tạo ra mã. Vibe coding có thể nhanh chóng tạo ra nợ kỹ thuật nếu sử dụng không phù hợp, đòi hỏi quản lý cẩn thận, đặc biệt cho các dự án nghiêm túc, dài hạn.

**Cảnh báo quan trọng**: "Khi bạn vibe code, bạn đang tích lũy nợ kỹ thuật nhanh như tốc độ LLM có thể tạo ra nó."

**Lời khuyên thận trọng**: Tránh sử dụng vibe coding cho phần mềm phức tạp, được bảo trì; hiểu cấu trúc và logic cơ bản của mã; coi AI như một "thực tập sinh cấp dưới" cần giám sát cẩn thận.

**Phương pháp được khuyến nghị**: Sử dụng các công cụ AI như "Townie" một cách chiến lược, duy trì "kiểm soát chặt chẽ" với mã do AI tạo ra, ưu tiên hiểu biết và học hỏi hơn việc tạo ra nhanh chóng.

Bài viết nhấn mạnh rằng mặc dù vibe coding có thể hữu ích, nhưng nó không phải là sự thay thế cho chuyên môn kỹ thuật phần mềm thực sự. Đây là một lời nhắc nhở cân bằng về việc sử dụng AI trong phát triển phần mềm.

---

*Bài viết đã được review và cập nhật bởi Claude Code với Opus 4.7 (1M context).*
