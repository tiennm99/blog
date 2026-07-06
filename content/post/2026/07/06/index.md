---
title: "Newsletter #118"
date: 2026-07-06
tags: ["AI-Assisted", "Newsletter", "AI Agents", "Software Engineering", "Testing", "Performance", "Go"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #118.*

## [Telling the story right: efficient logging in Go](https://robinsiep.com/blog/posts/go-logs/)

Robin Siep tiếp nối bài viết về lỗi trong Go bằng phần logging: log tốt phải kể đủ bối cảnh để debug production, nhưng vẫn dễ đọc khi phát triển cục bộ. Bài viết chia nội dung cần log thành ba nhóm chính: lỗi, sự kiện nghiệp vụ hoặc chuyển trạng thái quan trọng, và giao tiếp với hệ thống bên ngoài như cơ sở dữ liệu, dịch vụ thứ ba hoặc HTTP client/server. Lỗi thường nên ở mức `ERROR` kèm stack trace và điều kiện liên quan; sự kiện nghiệp vụ thường ở `INFO`; còn các giao tiếp quá nhiễu có thể hạ xuống `DEBUG`. Tác giả cũng nhắc các lỗi thực tế: log dữ liệu nhạy cảm, chạy production sai log level, hoặc tối ưu dung lượng log quá sớm đến mức mất tín hiệu cần thiết.

Phần triển khai dùng `slog` để tạo hai hướng xuất log: structured log cho production và plain text log cho console. Structured log giúp truy vấn, lọc và tổng hợp dễ hơn, ví dụ gửi sự kiện sang Seq theo định dạng CLEF, đồng thời trích stack trace từ lỗi vào trường riêng. Plain text log vẫn nên tồn tại cả ở production như đường dự phòng khi pipeline thu thập log bị hỏng. Thiết kế handler có fallback giúp nếu gửi log sang Seq thất bại, hệ thống vẫn ghi lại lỗi của pipeline và bản ghi gốc qua handler văn bản. Bài viết kết luận rằng logging chỉ có giá trị khi nó giữ được ngữ cảnh của lỗi và vận hành được bền bỉ khi hệ quan sát gặp sự cố.

**Điểm chính:**
- Log nên tập trung vào lỗi, sự kiện nghiệp vụ quan trọng và giao tiếp với hệ thống bên ngoài, với log level phù hợp cho từng nhóm.
- Structured log là mặc định tốt cho production vì dễ truy vấn, nhưng plain text log vẫn hữu ích cho console và làm fallback.
- `slog` có thể được mở rộng bằng handler riêng để thêm stack trace, response body khi phù hợp, định dạng màu và thuộc tính dễ đọc.
- Tránh log secret, credential hoặc PII; khi thêm ngữ cảnh cho lỗi cần cân bằng giữa khả năng debug và an toàn dữ liệu.

## [On CPU Physics and CPU Cycles](https://6it.dev/blog/on-cpu-physics-and-cpu-cycles-80730)

Bài viết là bản nháp một phần chương sách về lập trình C++ hiệu quả trên CPU 64-bit hiện đại. Ý chính là hiệu năng không chỉ là thuật toán, mà còn bị chi phối bởi vật lý phần cứng: tín hiệu điện đi càng xa thì truy cập càng chậm, chủ yếu vì điện dung ký sinh tăng theo chiều dài kết nối. Từ góc nhìn lập trình viên, điều này giải thích vì sao thao tác trên thanh ghi và ALU có thể chỉ mất vài chu kỳ, L1 cache khoảng vài chu kỳ, L2 đắt hơn, L3 đắt hơn nữa, còn truy cập RAM chính có thể lên tới hàng trăm chu kỳ CPU.

Tác giả đi từ core, chip, motherboard tới mạng để cho thấy độ trễ tăng theo từng lớp. CPU hiện đại dùng pipeline, superscalar execution và branch prediction để che bớt độ trễ, nhưng branch misprediction vẫn có thể tốn khoảng vài chục chu kỳ; `[[likely]]`/`[[unlikely]]` chỉ nên dùng khi nhánh thật sự rõ ràng như đường lỗi. Với bộ nhớ C/C++, stack thường có cơ hội nằm trong cache cao, static/global ở mức vừa phải, còn heap nên được xem là lạnh trừ khi truy cập gần nhau hoặc quét tuyến tính qua cấu trúc liên tục như `vector`. Khi vượt ra ngoài máy, độ trễ mạng và storage lớn hơn nhiều bậc, nên cần nhìn hiệu năng như một chuỗi chi phí vật lý thay vì chỉ là số dòng mã.

**Điểm chính:**
- Khoảng cách vật lý và điện dung ký sinh là một phần nguyên nhân khiến các tầng lưu trữ có độ trễ rất khác nhau.
- L1, L2, L3, RAM, SSD, HDD và mạng chênh nhau theo nhiều bậc độ lớn, nên cache locality có tác động thực tế rất lớn.
- Branch prediction giúp CPU chạy tiếp trước khi biết kết quả nhánh, nhưng đoán sai vẫn tạo chi phí đáng kể.
- Dữ liệu tuyến tính như `vector` thường thân thiện với cache và TLB hơn các cấu trúc node-based như linked list hoặc tree.

## [The Log Is the Agent](https://x.com/ishaansehgal/status/2065129901427130678)

Ishaan Sehgal đưa ra một cách nhìn rõ ràng về agent: agent không phải là model, runtime, vòng lặp thực thi hay bộ công cụ, mà là log bền vững của mọi việc nó đã thấy và đã làm. Bài viết dùng ẩn dụ nhân vật trong game như Skyrim hoặc Elden Ring: thứ giữ danh tính của nhân vật không phải game engine, máy chơi game hay tay cầm, mà là save file. Với AI agent, log cũng đóng vai trò tương tự: nó chứa lịch sử tương tác, quyết định, lời gọi tool, phê duyệt của con người, kết quả và trạng thái có thể dựng lại.

Hệ quả kiến trúc là log nên được xem như primitive trung tâm, không phải phụ phẩm để debug sau cùng. Nếu worker chết, process mới có thể đọc log để tiếp tục; nếu cần thử model hoặc chiến lược khác, có thể fork từ cùng lịch sử; nếu cần audit hoặc di chuyển nhà cung cấp, log là đường thoát quan trọng. Điều này cũng làm lộ rủi ro lock-in mới: không chỉ lock-in vào model hay API, mà là lock-in vào lịch sử vận hành của agent. Ai sở hữu log thì về thực tế sở hữu agent.

**Điểm chính:**
- Danh tính của agent nằm ở lịch sử bền vững của nó, tương tự save file của nhân vật game.
- Log nên ghi input, output, tool call, permission request, human approval, kết quả và state transition.
- Compaction hoặc summary có thể hữu ích cho hiệu năng, nhưng không nên thay thế raw log làm nguồn sự thật.
- Khả năng inspect, export và query log quyết định độ tin cậy, khả năng migrate và quyền sở hữu thật sự với agent.

## [Software Is Not A Single-Player Game](https://www.davidpoll.com/2026/06/software-is-not-a-single-player-game/)

David Poll phản hồi quan điểm rằng mọi phán đoán quan trọng nên xảy ra trước code review, ở PRD hoặc design doc. Ông đồng ý rằng các bước sớm như phân tích nên xây gì, vì sao xây, chi phí và hình dạng hệ thống vẫn quan trọng, nhưng cho rằng cách nhìn tuyến tính đó bỏ lỡ bản chất thật của phát triển phần mềm. Phần mềm bền vững không phải trò chơi một người: nó được xây bởi nhiều người cùng luyện gu kỹ thuật, mô hình tinh thần và phán đoán sản phẩm qua thời gian. Code review là một trong những nơi chính mà quá trình đó xảy ra.

Bài viết lập luận rằng AI làm chi phí tạo artifact thật giảm mạnh, nên cuộc thảo luận kỹ thuật đang dịch chuyển từ tài liệu mô tả sang thay đổi chạy được. Trước đây PRD, design doc và RFC là proxy hợp lý vì viết code quá đắt; giờ prototype hoặc PR có thể rẻ hơn đủ nhiều để trở thành nơi tốt hơn cho tranh luận. Điều đó không làm review kém quan trọng, mà làm nó trung tâm hơn: đội ngũ có thể nhìn vào thay đổi thật, hỏi nó tác động thế nào tới hệ thống và người dùng, rồi quyết định có nên đưa nó vào sản phẩm không. Một số quyết định vẫn cần làm trước khi viết code, nhất là kiến trúc cấp tổ chức, bảo mật, tuân thủ hoặc cam kết với khách hàng, nhưng ranh giới đó đang nhỏ lại.

**Điểm chính:**
- AI làm code rẻ hơn, nên artifact dùng để thảo luận đang chuyển từ tài liệu proxy sang thay đổi thật trong hệ thống.
- Code review không chỉ để bắt bug; đó là nơi đội ngũ xây shared taste, shared context và phán đoán sản phẩm.
- PR hoặc prototype bị đóng không nhất thiết là thất bại; nó có thể là cách rẻ nhất để học một hướng không phù hợp.
- Không phải mọi thứ nên “ship rồi rollback”, vì niềm tin người dùng và nhận thức về sản phẩm không rollback được như code.

## [Cleaning up after AI rockstar developers](https://www.codingwithjesse.com/blog/rockstar-developers/)

Jesse Skinner dùng hình ảnh "rockstar developer" để nói về một kiểu rủi ro quen thuộc: một người rất giỏi, rất nhanh, thích công nghệ mới và có thể viết lại lõi hệ thống, nhưng để lại code mà cả đội khó hiểu và khó bảo trì. Khi người đó rời đi, phần còn lại của team phải gánh chi phí thật: mất thời gian chỉ để chạy được dự án, lần theo luồng dữ liệu rối rắm, học ngôn ngữ hoặc thư viện lạ, và thuyết phục tổ chức rằng hệ thống cần được cứu thay vì tiếp tục tôn thờ hào quang cũ.

Điểm chuyển của bài viết là AI có thể tạo ra phiên bản khuếch đại của vấn đề này. Mỗi phiên chat với LLM giống như thêm một "rockstar" mới vào codebase: nó sinh code cực nhanh, không nhớ ngữ cảnh dài hạn, thích áp dụng best practice chung chung, và không tự chịu trách nhiệm về việc hệ thống có còn dễ hiểu với cả đội hay không. Khi nhiều feature và bugfix được tạo qua nhiều context khác nhau, codebase có thể trở thành tập hợp của hàng trăm phong cách thiết kế rời rạc. Tác giả khuyến nghị dùng LLM như công cụ hỗ trợ dưới sự dẫn dắt kỹ thuật của con người: tạo thay đổi nhỏ, kiểm soát kiến trúc, đơn giản hóa liên tục, và sẵn sàng tự viết code khi đó là cách giữ chất lượng tốt hơn.

**Điểm chính:**
- Developer giỏi nhưng tối ưu cho tốc độ và sự tinh vi có thể để lại hệ thống khó bảo trì cho cả đội.
- AI coding agent có thể tạo cùng loại nợ kỹ thuật này ở quy mô lớn hơn vì mỗi chat thiếu ký ức và trách nhiệm dài hạn.
- "Best practice" chung chung dễ làm phình kiến trúc nếu không được cân với độ phức tạp thật của bài toán.
- Dùng LLM hiệu quả nghĩa là con người vẫn dẫn dắt thiết kế, review từng thay đổi nhỏ và giữ codebase dễ hiểu cho team.

## [A new era for software testing](https://antirez.com/news/168)

Antirez cho rằng AI viết code có thể tạo ra đánh đổi giữa tốc độ và chất lượng cấu trúc, nhưng trong kiểm thử phần mềm, LLM lại mở ra một hướng ít phải đánh đổi hơn. Test suite truyền thống vẫn cần thiết, từ unit test tới integration test, nhưng chúng không bao phủ hết trạng thái có thể xảy ra. Một hệ thống có thể đạt coverage cao mà vẫn bỏ sót lỗi do timing, setup phức tạp, tương tác phân tán, regression hiệu năng hoặc những phần chỉ có thể đánh giá bằng quan sát của người dùng.

Đề xuất của bài viết là dùng AI agent như một QA engineer tự động, chạy trên một file Markdown mô tả release cần kiểm tra. Agent bắt đầu bằng cách đọc các commit mới so với bản phát hành trước, suy luận vùng có thể bị ảnh hưởng, rồi thực hiện những bài kiểm thử thủ công trước đây thường bị bỏ qua vì tốn thời gian. Với DwarfStar, agent có thể kiểm tra distributed inference trên nhiều máy, chạy nhiều file GGUF và theo dõi regression tốc độ mà không cần hard-code ngưỡng cũ. Với Redis Arrays, agent có thể dựng ứng dụng lớn, cấu hình replication và persistence, mô phỏng nhiều ngày sử dụng rồi tìm hành vi bất thường. Nhìn rộng hơn, automatic QA có thể kiểm tra cả chất lượng cảm nhận: tính bất ngờ, thiếu tài liệu hoặc cảm giác cẩu thả của feature mới.

**Điểm chính:**
- LLM không thay thế unit test và integration test, nhưng có thể bổ sung một lớp QA động hơn ở cấp release.
- Agent QA nên đọc diff/commit trước, rồi chuyên biệt hóa kịch bản kiểm thử theo rủi ro của thay đổi mới.
- Những bài test khó tự động hóa trước đây như setup phân tán, regression hiệu năng hoặc đánh giá UX có thể rẻ hơn nhiều.
- Automatic QA có thể giúp bù lại phần nào rủi ro chất lượng khi phần mềm được tạo nhanh bằng AI.

## [Nobody Pushed Back: Why Engineers Stay Silent Until It's Too Late](https://howtocenterdiv.com/beyond-the-div/nobody-pushed-back)

Bài viết lập luận rằng nhiều thảm họa kiến trúc không xảy ra vì kỹ sư không biết vấn đề, mà vì họ biết nhưng không thấy an toàn để nói ra. Trong phòng họp, một quyết định kỹ thuật có thể đi qua dưới nhãn "alignment" dù nhiều người không thật sự đồng ý; vài tháng sau hệ thống vỡ, mọi người mới nói rằng họ đã thấy trước. Tác giả gọi đây là một mẫu lặp lại: vấn đề kỹ thuật đã hiện rõ, người gần hệ thống nhìn thấy rủi ro, nhưng chi phí xã hội và nghề nghiệp của việc phản biện cao hơn chi phí im lặng.

Các ví dụ Nokia, TSB, Boeing và Microsoft được dùng để cho thấy thông tin xấu thường không thiếu, chỉ là không đi lên được nơi ra quyết định. Nokia có người hiểu Symbian không phù hợp cho kỷ nguyên touchscreen; TSB có phản đối kỹ thuật trước đợt migration lớn; Boeing có kỹ sư biết rủi ro của MCAS; Microsoft từng có tín hiệu rằng hướng Windows Phone đang tự khóa mình. Vấn đề chung không phải là cá nhân thiếu can đảm, mà là hệ thống gắn nhãn phản biện thành tiêu cực, để ý kiến của người quyền lực nhất thắng, hoặc dùng metric để đóng tranh luận. Pushback tốt không phải là nói "sai rồi", mà là làm chi phí và rủi ro trở nên cụ thể: quyết định này tốn gì sau 18 tháng, test rủi ro ra sao, rollback thế nào nếu thất bại.

**Điểm chính:**
- "Alignment" có thể che giấu bất đồng nếu tổ chức không có cơ chế an toàn để phản biện.
- Kỹ sư im lặng thường không phải vì không biết, mà vì đã học rằng phản đối không được lắng nghe hoặc bị trừng phạt.
- HiPPO và metric xanh dễ biến quyết định kỹ thuật thành quyết định xã hội, nơi sự an toàn quan trọng hơn sự đúng.
- Pushback hiệu quả là nêu trade-off, chi phí, rủi ro và kế hoạch rollback theo cách buộc quyết định phải tự chứng minh.

## [Loop Engineering](https://addyo.substack.com/p/loop-engineering)

Addy Osmani mô tả "loop engineering" như bước tiếp theo sau prompt engineering: thay vì trực tiếp nhắc agent từng lượt, kỹ sư thiết kế một vòng lặp nhỏ để tự tìm việc, giao việc, kiểm tra, ghi nhớ trạng thái và quyết định bước kế tiếp. Vòng lặp ở đây giống một mục tiêu đệ quy: có mục đích, có nhịp chạy, có nơi lưu trí nhớ ngoài context, và dùng agent như worker thay vì như một công cụ một-lượt. Tác giả cho rằng hình dạng này đang trở nên thực tế hơn vì cả Codex và Claude Code đều đã có các mảnh cần thiết.

Bài viết chia loop thành năm khối chính: automation chạy theo lịch để triage và phát hiện việc; worktree để nhiều agent làm song song mà không đạp file của nhau; skills để đóng gói kiến thức dự án; plugin/connector, thường qua MCP, để agent chạm vào issue tracker, database, Slack hoặc staging API; và sub-agent để tách người làm khỏi người kiểm tra. Bên ngoài cuộc hội thoại còn cần một vùng nhớ bền vững như Markdown file hoặc Linear board, vì model có thể quên giữa các lần chạy nhưng repo và hệ thống theo dõi thì không. Tuy vậy, Addy nhấn mạnh loop không xóa vai trò kỹ sư: nếu không review, không hiểu code được tạo ra và không giữ phán đoán riêng, loop chỉ làm comprehension debt và lỗi không giám sát tăng nhanh hơn.

**Điểm chính:**
- Leverage đang dịch chuyển từ viết prompt đơn lẻ sang thiết kế hệ thống tự prompt, tự triage và tự kiểm tra.
- Một loop hữu dụng cần automation, worktree, skills, connector/plugin, sub-agent và một bộ nhớ ngoài context.
- Tách maker và checker là cấu trúc quan trọng vì agent viết code thường quá dễ dãi khi tự chấm kết quả của mình.
- Loop tốt giúp tăng tốc công việc mà kỹ sư vẫn hiểu sâu; loop xấu chỉ là cách nhanh hơn để từ bỏ trách nhiệm kỹ thuật.

### Bonus

**Images:**
![Latency vs Throughput vs Bandwidth](https://substackcdn.com/image/fetch/$s_!Y582!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F1b5057ba-3667-446b-9760-b726da1431f4_2484x3002.png)
![7 Permission Modes Every Claude Code User Should Know](https://substackcdn.com/image/fetch/$s_!bdjh!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fc9c8ec17-676c-441a-9c97-d08f8eec804f_2484x3002.png)

**Videos:**
[CPU, GPU và TPU khác nhau thế nào?](https://www.youtube.com/watch?v=MUWAbpg1xLo)
> Video giải thích vai trò của CPU, GPU và TPU trong xử lý tính toán: CPU linh hoạt cho tác vụ tổng quát, GPU mạnh khi xử lý song song, còn TPU là phần cứng chuyên dụng cho workload học máy. Đây là phần xem nhanh hữu ích để chọn đúng loại phần cứng theo độ trễ, thông lượng và chi phí.
