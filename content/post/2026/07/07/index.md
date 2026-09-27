---
title: "Newsletter #119"
date: 2026-07-07
tags: ["AI-Assisted", "Newsletter", "AI Agents", "AI Engineering", "Code Quality", "Testing", "Go"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #119.*

## [Special Cases in Go](https://www.dolthub.com/blog/2026-05-22-special-cases-in-go/)

Go thường được quảng bá là ngôn ngữ "đơn giản", cố tình tránh những trường hợp đặc biệt. Nick Tobey chỉ ra rằng thực tế Go vẫn có những ngoại lệ như vậy, ở những chỗ khá bất ngờ. Hàm `init` là ví dụ rõ nhất: nó được gọi tự động khi package được import, không nhận tham số, không trả về giá trị, được khai báo nhiều lần trong cùng một package, nhưng lại không thể gọi thủ công. Nếu cố gọi, trình biên dịch báo lỗi `undefined: init` mà không giải thích gì thêm. Tương tự, thư mục `internal` tạo ra mức hiển thị hẹp hơn công khai/riêng tư, nhưng quy tắc này không có trong đặc tả ngôn ngữ mà do bộ công cụ Go áp đặt.

Lý do nằm ở việc đặc tả cố ý để cách diễn giải đường dẫn import phụ thuộc vào cài đặt. Nhờ vậy, các hệ thống build như Bazel có thể dùng quy tắc riêng, còn bộ công cụ Go có thể tiến hóa mà không phải sửa đặc tả, đồng thời thêm các ngoại lệ như `internal` hay package kiểm thử có hậu tố `_test` sống chung thư mục với package chính. Tác giả cũng lưu ý tên package không bắt buộc trùng tên thư mục, nên IDE phải phân tích mọi package được import mới xác định được một định danh đến từ đâu; với dự án mới, nên đặt tên import tường minh. Bài học rút ra: phần lớn các ngoại lệ này hiếm khi gây phiền trong công việc hằng ngày, nhưng chúng cho thấy sự đơn giản của một ngôn ngữ thường chỉ là độ phức tạp được chuyển sang chỗ khác.

## [Writing Code vs. Shipping Code: Productivity Effects Across Generations of AI Coding Tools](https://muratbuffalo.blogspot.com/2026/06/writing-code-vs-shipping-code.html)

Murat Demirbas phân tích một nghiên cứu của MIT và Wharton, kết hợp dữ liệu đo lường nội bộ của Microsoft với dấu vết công khai của hơn 100.000 lập trình viên trên GitHub, để đo tác động thật của công cụ AI lên năng suất. Nghiên cứu chia công cụ thành ba thế hệ: gợi ý tự động, agent đồng bộ như Claude Code hay Cursor, và agent bất đồng bộ. Mức tăng ở tầng dòng mã rất ấn tượng, nhưng hao hụt dần qua các tầng file, commit, pull request, repository cho tới bản phát hành: với gợi ý tự động, số dòng mã tăng hơn 228% nhưng số bản phát hành chỉ tăng khoảng 10%; với agent đồng bộ, con số tương ứng là 741% và 20%.

Tác giả hoài nghi mô hình sản xuất tuyến tính mà các nhà kinh tế áp lên phát triển phần mềm, nhưng vẫn thấy nó hữu ích vì làm lộ rõ chi phí phối hợp và kiểm duyệt của con người. Chuyển kết quả sang định luật Amdahl, ông tính ra phần công việc có thể tăng tốc chỉ quanh mức 35% ở cả ba thế hệ công cụ, khớp với tỷ lệ thời gian lập trình viên thật sự viết mã. Agent tạo ra nhiều bản phát hành hơn không phải vì mở rộng phần đó, mà vì tăng tốc mạnh hơn ở chính phần có thể tăng tốc và can thiệp gần đích hơn. Phần còn lại, gồm hiểu bài toán, lên kế hoạch, thống nhất trong nhóm và review, vẫn là nút thắt tuần tự. Muốn phát hành nhanh hơn thật sự, tổ chức phải cải thiện cả những khâu đó chứ không chỉ khâu viết mã.

## [When Was the Last Time You Did Just One Thing?](https://alifeengineered.substack.com/p/when-was-the-last-time-you-did-just)

Steve Huynh kể lại lúc chuẩn bị cho một chuyến đi dài: ông tải hàng chục video YouTube, xếp sẵn một loạt podcast, thêm một trò chơi, hai cuốn sách giấy, chiếc Kindle và cả laptop để phòng khi muốn làm việc. Rồi ông chợt nhận ra "kho vũ khí" chống lại mọi khoảnh khắc trống rỗng ấy sẽ khiến ông bỏ lỡ chính chuyến đi, và nghịch lý là càng cố không lãng phí giây phút nào thì mọi giây phút lại càng trống rỗng. Bản xem trước công khai dừng ở đây, nhưng thông điệp từ tiêu đề và phụ đề đã rõ: làm một việc tại một thời điểm không còn là trạng thái mặc định, mà đã thành một kỹ năng cần rèn luyện.

Với người làm công nghệ, đây là lời nhắc thực tế về quản lý sự chú ý. Không phải khoảng trống nào cũng cần lấp bằng việc học, nghe podcast hay làm thêm. Khi mọi khe hở đều bị nhồi kích thích mới, ta dần mất khả năng quan sát, nghỉ ngơi đúng nghĩa, suy nghĩ sâu và thật sự hiện diện với việc đang làm. Trông có vẻ hiệu quả chưa chắc đã là sống có chủ đích; để lại khoảng trống cũng là một phần của năng suất, nhất là trong những ngày làm việc vốn đã phải chuyển ngữ cảnh liên tục.

## [Predicting AI job exposure](https://www.ben-evans.com/benedictevans/2026/5/24/ai-job-exposure)

Benedict Evans phản biện các nỗ lực chấm điểm nghề nghiệp, công ty hay ngành nào chịu ảnh hưởng nhiều nhất từ AI. Theo ông, đây là việc dự đoán điều không thể dự đoán, và cách đơn giản nhất để thấy vấn đề là kiểm tra ngược với các làn sóng công nghệ trước. Suốt một thế kỷ, ta tự động hóa kế toán bằng máy tính, cơ sở dữ liệu, bảng tính, ERP, vậy mà số kế toán viên vẫn tăng. Khi phân tích trở nên rẻ và nhanh, người ta làm nhiều phân tích hơn và theo kiểu khác, trong khi quy định mới cũng tạo thêm nhu cầu tuyển dụng.

Vấn đề thứ hai là công việc có thể không đổi nhưng mô hình kinh doanh bên dưới lại sụp: internet không thay đổi kỹ năng của nhà báo, nhưng phá nguồn thu từ quảng cáo rao vặt vốn nuôi tòa soạn. Thứ ba là những cú sốc khó thấy trước, như dữ liệu vị trí trên điện thoại dẫn tới Uber và thay đổi hẳn nghề taxi. Sâu hơn nữa, các bộ mô tả nghề như O*NET không thể mô tả đầy đủ một công việc thật, giống như thất bại của hệ chuyên gia ngày trước. Evans cho rằng những khung tư duy vẫn hữu ích, nhưng mọi dự báo cụ thể cho từng nghề ở giai đoạn sớm này chỉ đúng nhờ may mắn, vì ta không biết các ngoại lệ có lớn hơn quy luật hay không.

## [Choosing Values for Robust Tests](https://testing.googleblog.com/2026/06/choosing-values-for-robust-tests.html)

Radion Khait chỉ ra một lỗi kiểm thử rất dễ bỏ sót: bài kiểm thử vẫn đạt không phải vì mã đúng, mà vì giá trị được chọn tình cờ trùng với giá trị mặc định. Ví dụ trong bài là hàm `insert` của một lớp map bỏ quên tham số `value`, chỉ khởi tạo phần tử với giá trị mặc định. Bài kiểm thử chèn giá trị `0` rồi kiểm tra lại vẫn đạt, vì `0` đúng bằng giá trị mặc định của kiểu số nguyên. Kết quả là cảm giác an toàn giả: hàm được gọi, nhưng không có gì chứng minh dữ liệu đầu vào thật sự được lưu.

Từ đó, tác giả đưa ra vài nguyên tắc chọn dữ liệu kiểm thử. Thứ nhất, dùng giá trị khác mặc định: số khác không, chuỗi không rỗng, giá trị enum không nằm ở vị trí đầu; chỉ cần đổi sang `5`, bài kiểm thử trên sẽ lộ lỗi ngay. Thứ hai, khi hợp lý, hãy kiểm thử nhiều đầu vào đại diện cho các tình huống khác nhau như rỗng, thiếu, `null`, giá trị biên và các trường hợp kích hoạt logic phức tạp, có thể dùng fuzzing để phủ rộng miền đầu vào. Thứ ba, dùng giá trị khác nhau cho từng tham số để phát hiện mã vô tình dùng lại một tham số hoặc đảo thứ tự; kiểm thử tham số hóa giúp thử nhiều đầu vào mà không phải lặp mã.

## [AI demands more engineering discipline. Not less](https://charity.wtf/p/ai-demands-more-engineering-discipline)

Charity Majors phản bác một suy nghĩ đang lan rộng: nếu AI sinh mã nhanh và đủ tốt thì có nên nới lỏng review, kiểm chứng và quy trình kỹ thuật không? Câu trả lời của bà là ngược lại. Khi chi phí tạo mã giảm mạnh, dòng mã không còn là tài sản quý mà chỉ là một cách hiện thực tạm thời của hiểu biết hiện tại. Sản phẩm thật của một nhóm phần mềm là hiểu biết chung, và thứ có giá trị là những gì giúp ta biết hệ thống đúng hay sai: yêu cầu, bất biến, các kiểu lỗi, kiểm thử, khả năng quan sát và khả năng tái hiện.

Bà so sánh làn sóng AI với bước chuyển từ những máy chủ được chăm sóc thủ công như thú cưng sang hạ tầng bất biến. Khi hạ tầng có thể xóa đi và dựng lại, kỷ luật kỹ thuật dời sang cấu hình, quy trình khởi tạo, kiểm chứng và vận hành lặp lại được. Phần mềm đang đi theo hướng tương tự: nếu mã có thể tái sinh với giá rẻ, từng dòng mã không còn là thứ lý tưởng để review, trọng tâm dịch sang những tài liệu mô tả hành vi, kiến trúc, đánh đổi và kết quả trong môi trường thật. Não người vốn không giỏi kiểm chứng, còn hệ thống phi tất định lại càng cần truy vết, kiểm thử ngay trên môi trường thật, ghi và phát lại, cùng vòng phản hồi ngắn. AI vì thế không làm phần mềm bớt tính kỹ thuật mà đòi hỏi nhiều kỷ luật hơn.

## [Nine Questions I Now Ask in Interviews That I Wish I'd Asked Five Years Ago](https://louisedeason.substack.com/p/nine-questions-i-now-ask-in-interviews)

Louise Deason cho rằng phỏng vấn là cuộc đánh giá hai chiều, dù hầu hết ứng viên vẫn coi nó như một bài thi, đúng với cách có lợi cho công ty. Phần "bạn có câu hỏi gì cho chúng tôi không?" là phần bị đánh giá thấp nhất, trong khi đó là lúc công ty bớt đề phòng và vô tình để lộ nhiều điều. Bà đưa ra chín câu hỏi buộc phía tuyển dụng phải trả lời cụ thể: lần gần nhất ai đó trong nhóm được thăng chức diễn ra thế nào, người gắn bó lâu nhất với vị trí này hiện làm gì, nhóm thật sự kém ở điểm nào, nhóm xử lý bất đồng với quyết định của lãnh đạo ra sao, kế hoạch nhân sự năm tới, có được gặp người sẽ làm việc cùng không, thành công và thất bại sau sáu tháng trông như thế nào, lần tái cơ cấu gần nhất, và vì sao vị trí này đang mở.

Giá trị nằm ở tín hiệu đi kèm câu trả lời: có cụ thể không, có né tránh không, có ngập ngừng không. Một câu trả lời rõ ràng về lộ trình thăng tiến hay điểm yếu thật của nhóm cho thấy sự thẳng thắn; ngược lại, những câu như "nhóm luôn đồng thuận", sự chậm trễ khi sắp xếp cho gặp đồng nghiệp tương lai hay khoảng lặng trước câu hỏi về lý do mở vị trí đều đáng lưu tâm. Thông điệp cuối: bạn đang chọn giữa những lựa chọn không hoàn hảo theo những cách khác nhau, và công ty khó chịu khi bị hỏi kỹ là công ty chưa xứng đáng với thời gian của bạn.

## [Agentic Testing: Where Agents Fit in the E2E Testing Stack](https://slack.engineering/agentic-testing-where-agents-fit-in-the-e2e-testing-stack/)

Sergii Gorbachov từ Slack chia sẻ kết quả hơn 200 lần chạy kiểm thử đầu cuối bằng agent, nhằm xác định agent nên nằm ở đâu trong hệ thống kiểm thử. Kiểm thử đầu cuối truyền thống ép một hành trình cố định qua giao diện, còn kiểm thử bằng agent bắt đầu từ mục tiêu: agent quan sát trạng thái, tự chọn bước tiếp theo rồi xác minh kết quả. Nhóm so sánh ba cách: agent dùng Playwright MCP, agent dùng Playwright CLI, và bài kiểm thử Playwright do AI sinh ra, trên không gian làm việc thử nghiệm với dữ liệu không phải thật, qua hai luồng: trả lời thread và khám phá tìm kiếm.

Bài kiểm thử được sinh ra chạy nhanh nhất, khoảng 3 phút, nhưng tỷ lệ lỗi tăng vọt lên khoảng 48% ở luồng phức tạp. Agent qua MCP đáng tin nhất, tỷ lệ lỗi từ 0 đến 12%, trong khi CLI ở mức 12 đến 20%, chủ yếu do lỗi đăng nhập và điều hướng ở tầng thực thi. MCP cũng tốn ít lượt tương tác hơn vì gộp thao tác và trả trạng thái trong một vòng. Tuy vậy, mỗi lần chạy bằng agent tốn 15 đến 30 đô la và hơn 5 phút, phần lớn chi phí đến từ việc gửi lại ngữ cảnh cũ. Kết luận: kiểm thử tất định vẫn là nền tảng hồi quy nhanh trong CI, còn kiểm thử bằng agent là lớp bổ sung trên đỉnh kim tự tháp kiểm thử, hợp với việc khám phá hành vi phức tạp, gỡ lỗi luồng chập chờn và tái hiện lỗi từ môi trường thật.

## [Making Agents Easy: 13 Lessons from Forter's Agentic AI Sprint](https://blog.forter.dev/making-agents-easy-13-lessons-from-forters-agentic-ai-sprint/)

Ben Maraney kể lại cách Forter tổ chức một đợt chạy nước rút hai tuần để toàn bộ khối R&D tự xây agent. Ý chính không phải agent tự nhiên dễ, mà tổ chức có thể chủ động giảm ma sát ở ba lớp: công cụ, nền tảng chạy agent và các rào cản tổ chức. Với công cụ, Forter dựng một MCP server nội bộ tên Toolchain: người dùng vào giao diện, chọn và cấu hình công cụ rồi nhận ngay API key; muốn thêm công cụ mới chỉ cần một file YAML mô tả và một lớp bọc mỏng. Nhờ vậy, khi đợt chạy kết thúc, Toolchain đã có hơn 90 công cụ nội bộ. Thay vì dựng RAG phức tạp, họ đưa công cụ tìm kiếm doanh nghiệp sẵn có thành công cụ MCP.

Bài viết còn nhiều bài học vận hành. Người xây agent cần thấy rõ từng yêu cầu và phản hồi của công cụ; một agent xử lý sự cố của Forter từng "giải quyết" lỗi chỉ bằng cách đọc bản phân tích sau sự cố có sẵn. Với hệ thống nội bộ có người duyệt kết quả, có thể chưa cần evals ngay, hãy ưu tiên truy vết và theo dõi trước. Bộ phận pháp lý và bảo mật nên được kéo vào sớm, quyền truy cập đặt trong mã tất định, chi phí token cần bảng theo dõi. Khi đào tạo, hãy hình dung LLM như một thực tập sinh thông minh mới ra trường: kiến thức rộng, ít kinh nghiệm thực tế, nên trách nhiệm đưa hướng dẫn rõ ràng thuộc về người xây agent.

## [Agentic Code Review](https://addyosmani.com/blog/agentic-code-review/)

Addy Osmani lập luận rằng khi agent viết mã ngày càng nhanh, nút thắt của kỹ thuật phần mềm chuyển từ viết mã sang xác minh và tin tưởng mã đó. AI có thể tạo ra rất nhiều mã đúng cú pháp, có kiểm thử và trông hợp lý, nhưng tốc độ đọc hiểu của con người không tăng theo. Vì vậy review trở thành kỹ năng có đòn bẩy lớn nhất: không chỉ để bắt lỗi, mà còn để hiểu lại ý định, đánh giá phạm vi ảnh hưởng, lan tỏa hiểu biết trong nhóm và quyết định thay đổi có đáng làm hay không. Dữ liệu năm 2026 mà bài viết tổng hợp cho thấy sản lượng tăng mạnh, nhưng mã phải sửa lại, lỗi, sự cố và thời gian review cũng tăng theo.

Không có một chính sách review đúng cho mọi nơi. Dự án cá nhân chưa có người dùng có thể dựa nhiều hơn vào kiểm thử, AI review và tự động hóa; hệ thống lâu năm có người dùng, tiền hoặc dữ liệu nhạy cảm thì cần review phân tầng theo rủi ro. Addy khuyên giữ pull request nhỏ, nêu rõ ý định, yêu cầu bằng chứng như kết quả kiểm thử thật trước khi review, đọc phần thay đổi kiểm thử kỹ hơn phần mã, coi CI tất định là rào chắn không thương lượng và coi AI review là cảm biến chứ không phải phán quyết. Con người có thể không đọc từng dòng nữa, nhưng vẫn phải quyết định việc merge, chịu trách nhiệm với môi trường thật và dồn sức vào những thay đổi đắt giá nếu sai như xác thực, thanh toán, bảo mật hay dữ liệu cá nhân.

## [I Thought Redis Was Just a HashMap](https://mukul0x9.pages.dev/blog/memdb/)

Mukul Makwana bắt đầu từ một câu hỏi tưởng đơn giản: Redis hay Memcached có khác gì một bảng băm toàn cục với ba thao tác `set`, `get`, `del`? Để tìm câu trả lời, tác giả tự xây một cơ sở dữ liệu trong bộ nhớ tối giản bằng Go. Bản đầu tiên dùng `map` có sẵn, nhận yêu cầu qua TCP và tạo một goroutine cho mỗi kết nối. Vấn đề lộ ra ngay khi nhiều goroutine cùng đọc ghi một map: phải thêm khóa, và một mutex toàn cục khiến mọi thao tác đều phải chờ nhau.

Tác giả chuyển sang cấu trúc hai mảng: `bucket_array` lưu vị trí dữ liệu, còn `data_array` chứa metadata, key, value và vị trí phần tử kế tiếp khi xảy ra va chạm. Để giảm tranh chấp khóa, bảng được chia thành nhiều shard, mỗi shard có mảng riêng và `RWMutex` riêng; khi shard đầy, một goroutine nền lo việc mở rộng. Vì dữ liệu chỉ ghi nối thêm, thao tác xóa chỉ đánh dấu bia mộ, rồi một bước nén dựng lại shard khi bộ nhớ vượt ngưỡng, đổi lại shard bị khóa trong lúc đó. Đo hiệu năng chỉ với thao tác SET cho thấy map có sẵn vẫn thắng về thông lượng và thời gian dừng toàn cục, nhưng bảng băm tự viết giảm thời gian đánh dấu đồng thời của GC từ khoảng 113 ms xuống 7,8 ms nhờ ít con trỏ hơn. Bản này vẫn thiếu lưu trữ bền vững, chính sách loại bỏ, khôi phục sau sự cố và sao chép, những thứ khiến Redis thật phức tạp hơn nhiều.

---

*Bài viết đã được viết lại bởi Claude Code với Opus 5.5 vào ngày 27/09/2026.*
