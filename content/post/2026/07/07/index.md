---
title: "Newsletter #119"
date: 2026-07-07
tags: ["AI-Assisted", "Newsletter", "AI Agents", "AI Engineering", "Code Quality", "Testing", "Go"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #119.*

## [Special Cases in Go](https://www.dolthub.com/blog/2026-05-22-special-cases-in-go/)

Nick Tobey nhìn lại hình ảnh "đơn giản" của Go qua những ngoại lệ mà ngôn ngữ hoặc bộ công cụ phải thêm vào để xử lý nhu cầu thực tế. `init` là ví dụ rõ nhất: nó trông như một hàm bình thường nhưng được gọi tự động khi package được import, có thể khai báo nhiều lần, không được gọi thủ công và còn tạo lỗi biên dịch dễ gây bối rối nếu người đọc không biết quy tắc đặc biệt này. Bài viết cũng giải thích `internal` import path: đây không phải chi tiết trong đặc tả ngôn ngữ, mà là quy tắc do Go toolchain áp dụng để giới hạn package nào được phép import một package nội bộ.

Phần sâu hơn nằm ở cách Go cố ý để hành vi import phụ thuộc vào implementation. Điều này cho phép các hệ thống build khác như Bazel có quy tắc riêng, đồng thời giúp Go toolchain thêm các ngoại lệ như `internal` package hoặc test package có hậu tố `_test`. Tác giả cũng chỉ ra một điểm ít được để ý: tên package không bắt buộc trùng với thư mục import path, nên IDE và công cụ phân tích phải đọc thật sự package được import thay vì chỉ suy luận từ đường dẫn. Kết luận thực dụng là phần lớn ngoại lệ này không phá vỡ Go trong công việc hằng ngày, nhưng chúng cho thấy sự đơn giản thường chỉ là quyết định dời độ phức tạp sang nơi khác.

**Điểm chính:**
- `init` là một special case trong Go: được gọi tự động, có thể xuất hiện nhiều lần và không thể gọi trực tiếp như hàm thường.
- `internal` package tạo vùng visibility hẹp hơn public/private, nhưng quy tắc này do Go toolchain thực thi chứ không nằm trực tiếp trong language spec.
- Hành vi import được để phụ thuộc implementation, giúp toolchain và build system khác có không gian phát triển riêng.
- Test package `_test` và việc package name không cần trùng import path là những ngoại lệ làm công cụ phân tích mã phải cẩn thận hơn.

## [Writing Code vs. Shipping Code: Productivity Effects Across Generations of AI Coding Tools](https://muratbuffalo.blogspot.com/2026/06/writing-code-vs-shipping-code.html)

Murat Demirbas bàn về một nghiên cứu của MIT và Wharton nhằm đo tác động thật của công cụ AI coding lên năng suất phần mềm. Điểm đáng chú ý là mức tăng rất lớn ở tầng viết mã không chuyển nguyên vẹn thành phần mềm được phát hành. Autocomplete, sync agent như Claude Code hoặc Cursor, và async agent đều làm tăng hoạt động ở các tầng thấp như dòng mã, file, commit hoặc pull request, nhưng khi đi lên các tầng cần review, phối hợp, quyết định sản phẩm và release, lợi ích bị hao hụt mạnh. Tác giả nghi ngờ mô hình tuyến tính của bài nghiên cứu, nhưng vẫn xem nó hữu ích vì nó làm rõ chi phí điều phối và gatekeeping của con người trong pipeline phát triển.

Phần thú vị nhất là cách tác giả dịch mô hình kinh tế sang Amdahl's Law. Nếu chỉ khoảng 35% công việc có thể được tăng tốc bằng AI, thì việc làm khâu viết mã nhanh hơn nhiều vẫn sớm đụng trần lợi ích tổng thể. Sync và async agent tốt hơn autocomplete vì chúng đưa tự động hóa tới gần hơn các tầng file, commit và pull request, nhưng phần còn lại như hiểu bài toán, thống nhất hướng đi, review và chịu trách nhiệm vẫn là nút thắt tuần tự. Kết luận thực dụng: AI giúp tăng tốc sandbox viết mã, nhưng để rút ngắn shipping thật sự, tổ chức phải cải thiện cả phần định nghĩa việc, review, phối hợp và ra quyết định.

**Điểm chính:**
- Tăng tốc viết mã không đồng nghĩa tăng tốc release, vì lợi ích bị hao hụt ở các tầng review, pull request, repository và phát hành.
- Sync agent và async agent có tác động tốt hơn autocomplete vì chúng làm việc ở tầng gần sản phẩm hơn, không chỉ gợi ý dòng mã.
- Theo góc nhìn Amdahl's Law, nếu phần có thể song song hóa chỉ khoảng 35%, trần tăng tốc tổng thể sẽ bị giới hạn dù AI viết mã rất nhanh.
- Nút thắt lớn vẫn là hiểu vấn đề, phối hợp nhóm, thống nhất sản phẩm, review và trách nhiệm của con người trước khi ship.

## [When Was the Last Time You Did Just One Thing?](https://alifeengineered.substack.com/p/when-was-the-last-time-you-did-just)

Steve Huynh mở bài bằng một tình huống rất đời thường: chuẩn bị cho một chuyến đi dài và vô thức tải sẵn hàng loạt thứ để lấp mọi khoảng trống, từ video YouTube, podcast, game, sách giấy, Kindle cho tới laptop. Bản preview công khai dừng ở khoảnh khắc tác giả nhận ra "kho vũ khí" chống lại sự trống rỗng đó có thể làm ông bỏ lỡ chính chuyến đi. Thông điệp chính từ tiêu đề, phụ đề và phần mở đầu là single-tasking không còn là trạng thái mặc định; trong môi trường lúc nào cũng có nội dung để tiêu thụ, nó đã trở thành một kỹ năng cần luyện tập có chủ ý.

Với người làm công nghệ, đây là một nhắc nhở thực dụng về quản lý sự chú ý. Không phải mọi khoảng trống đều cần được tối ưu thành thời gian học, nghe podcast hoặc làm thêm việc. Nếu ta lấp mọi khe hở bằng kích thích mới, ta có thể mất khả năng quan sát, suy nghĩ sâu, nghỉ đúng nghĩa và thật sự hiện diện với việc đang làm. Single-tasking vì vậy không chỉ là mẹo năng suất, mà là cách bảo vệ chất lượng trải nghiệm và chất lượng suy nghĩ trong một ngày làm việc vốn đã quá nhiều context switch.

**Điểm chính:**
- Single-tasking đang trở thành kỹ năng cần luyện tập vì mặc định của môi trường số là phân tán chú ý.
- Lấp mọi khoảng trống bằng nội dung hoặc công việc dự phòng có thể làm trải nghiệm thật trở nên nông hơn.
- "Có vẻ hiệu quả" không phải lúc nào cũng đồng nghĩa với sống hoặc làm việc có chủ ý hơn.
- Với knowledge worker, để lại khoảng trống cũng là một phần của năng suất: nó tạo chỗ cho nghỉ ngơi, quan sát và suy nghĩ sâu.

## [Predicting AI job exposure](https://www.ben-evans.com/benedictevans/2026/5/24/ai-job-exposure)

Benedict Evans phản biện các mô hình cố gắng chấm điểm nghề nghiệp, công ty hoặc ngành nào sẽ bị AI ảnh hưởng nhiều nhất. Lập luận chính là bài toán này có vẻ định lượng được, nhưng thực tế rất khó dự đoán vì công nghệ không chỉ thay thế một tác vụ hiện tại. Nó còn làm tác vụ đó rẻ hơn, mở ra nhu cầu mới, đổi cách tổ chức công việc, đổi mô hình kinh doanh xung quanh công việc, và đôi khi tạo ra loại việc hoàn toàn khác. Ví dụ kế toán tưởng như phải bị tự động hóa mạnh sau máy tính, bảng tính và ERP, nhưng số lượng kế toán vẫn tăng vì nhu cầu phân tích, quy định và hình dạng công việc cũng thay đổi.

Bài viết cũng dùng báo chí, âm nhạc và Uber để nhắc rằng "mức độ tiếp xúc" của một nghề không nhất thiết nằm trong mô tả công việc. Internet không làm kỹ năng viết báo hay tìm nghệ sĩ biến mất ngay, nhưng phá mô hình phân phối và quảng cáo nuôi các ngành đó. Tương tự, điện thoại thông minh và dữ liệu vị trí làm thay đổi taxi theo cách khó thấy nếu chỉ phân tích mô tả nghề. Với AI, Evans cho rằng các bảng như O*NET có thể hữu ích để tạo mental model, nhưng không đủ để dự báo chi tiết theo từng nghề: chúng không mô tả hết công việc thật, không thấy phụ thuộc kinh doanh bên dưới, và không biết ngoại lệ có lớn hơn quy luật hay không.

**Điểm chính:**
- Chấm điểm "AI exposure" theo nghề dễ tạo cảm giác chính xác giả vì công việc thật phức tạp hơn mô tả tác vụ.
- Tự động hóa có thể làm số lượng việc tăng lên nếu chi phí giảm mở ra nhu cầu mới, giống trường hợp phân tích tài chính và kế toán.
- Rủi ro có thể nằm ở mô hình kinh doanh bao quanh nghề, không nằm trực tiếp trong kỹ năng của người làm nghề.
- Mọi mô hình dự báo nên tự kiểm tra bằng các ca như newspaper, Uber và CPA: nếu không giải thích được quá khứ, nó khó đáng tin cho tương lai.

## [Choosing Values for Robust Tests](https://testing.googleblog.com/2026/06/choosing-values-for-robust-tests.html)

Radion Khait nhắc lại một lỗi kiểm thử rất dễ bỏ sót: test có thể pass không phải vì mã đúng, mà vì giá trị test vô tình trùng với giá trị mặc định. Ví dụ trong bài là một hàm `insert` của map không dùng tham số `value`, nhưng test vẫn pass vì nó chèn giá trị `0`, đúng bằng giá trị mặc định của kiểu số nguyên. Kết quả là test tạo cảm giác an toàn giả: nó kiểm tra được đường gọi hàm, nhưng không chứng minh rằng implementation thật sự sử dụng input được truyền vào.

Bài viết đưa ra vài quy tắc nhỏ nhưng có tác động lớn khi chọn dữ liệu test. Hãy dùng giá trị khác mặc định, như số khác `0`, chuỗi không rỗng, hoặc enum không nằm ở vị trí đầu. Khi hợp lý, nên kiểm tra nhiều input đại diện cho các nhánh logic khác nhau: rỗng, thiếu, `null`, biên số học và trường hợp đặc biệt. Với hàm có nhiều tham số, dùng các giá trị khác nhau cho từng tham số để phát hiện lỗi dùng nhầm, đảo thứ tự hoặc tái sử dụng cùng một biến. Parameterized testing và fuzzing có thể giúp mở rộng vùng input mà không làm test lặp lại quá nhiều.

**Điểm chính:**
- Tránh dùng giá trị mặc định trong test nếu mục tiêu là chứng minh mã thật sự sử dụng input.
- Giá trị `0`, chuỗi rỗng, `null` hoặc enum đầu tiên dễ che bug vì chúng thường trùng với trạng thái mặc định.
- Dùng giá trị khác nhau cho từng tham số giúp phát hiện lỗi truyền nhầm, đảo tham số hoặc bỏ qua tham số.
- Nên kết hợp test nhiều kịch bản, parameterized testing và fuzzing khi cần bao phủ input domain rộng hơn.

## [AI demands more engineering discipline. Not less](https://charity.wtf/p/ai-demands-more-engineering-discipline)

Charity Majors phản hồi một hiểu nhầm phổ biến quanh AI coding: nếu AI có thể sinh mã nhanh và đủ tốt, có phải ta nên nới lỏng review, validation và quy trình kỹ thuật không? Câu trả lời của bà là ngược lại. Khi chi phí tạo mã giảm mạnh, dòng mã không còn là tài sản quý hiếm như trước mà giống một bản hiện thực tạm thời của hiểu biết hiện tại. Thứ thật sự có giá trị là những gì cho phép ta biết hệ thống đúng hay sai: requirement, invariant, failure mode, test, observability, khả năng replay và hiểu biết chung của team.

Bài viết nối làn sóng AI với bài học cũ từ immutable infrastructure. Khi server còn được sửa tay như "pet", drift làm hệ thống khó hiểu và khó tái tạo; khi hạ tầng chuyển sang có thể xoá và dựng lại, kỷ luật kỹ thuật phải nằm ở cấu hình, bootstrap, kiểm chứng và vận hành lặp lại. Charity cho rằng phần mềm đang đi theo hướng tương tự: nếu mã có thể được tái sinh rẻ hơn, trọng tâm review sẽ dần dịch khỏi từng dòng mã sang artifact mô tả hành vi, kiến trúc, đánh đổi và kết quả trong production. AI vì thế không làm phần mềm bớt là kỹ thuật; nó buộc team phải mã hóa hiểu biết rõ hơn, kiểm chứng tốt hơn và chạy feedback loop ngắn hơn.

**Điểm chính:**
- AI làm chi phí sinh mã giảm, nhưng không làm biến mất nhu cầu hiểu hệ thống, kiểm chứng hành vi và chịu trách nhiệm với production.
- Code có thể trở thành artifact dễ tái tạo hơn; kiến thức quan trọng phải được đưa vào spec, test, eval, observability và invariant.
- Bài học từ immutable infrastructure là không sửa tay artifact sống; hãy thiết kế để có thể thay thế và tái tạo một cách đáng tin.
- Nondeterministic systems cần nhiều kỷ luật hơn: trace, kiểm thử trong production, capture/replay và feedback loop ngắn.

## [Nine Questions I Now Ask in Interviews That I Wish I'd Asked Five Years Ago](https://louisedeason.substack.com/p/nine-questions-i-now-ask-in-interviews)

Louise Deason nhìn phỏng vấn như một cuộc đánh giá hai chiều, không phải bài thi một chiều dành cho ứng viên. Phần "bạn có câu hỏi gì cho chúng tôi không?" thường bị đánh giá thấp, nhưng đó lại là lúc công ty bớt phòng thủ nhất và có thể để lộ nhiều tín hiệu không xuất hiện trên career page, Glassdoor hay LinkedIn. Các câu hỏi tốt không chỉ hỏi về tech stack hoặc giờ làm, mà buộc công ty mô tả những thứ cụ thể: lần gần nhất ai đó được promote, người ở role này lâu nhất đang làm gì, team thật sự yếu ở đâu, leadership disagreement được xử lý thế nào, headcount năm tới ra sao, và vì sao role này đang mở.

Giá trị của những câu hỏi này nằm ở dữ liệu phụ: câu trả lời có cụ thể không, có né tránh không, có ngập ngừng không, và người phỏng vấn có khó chịu khi bị hỏi ngược không. Một câu trả lời rõ về promotion path, failure mode, reorg hoặc lý do mở role cho thấy team hiểu chính nó và sẵn sàng minh bạch. Ngược lại, các câu trả lời chung chung như "chúng tôi luôn aligned", "process đang được làm lại", hoặc sự chậm trễ khi cho bạn gặp người sẽ làm việc trực tiếp đều là tín hiệu cần chú ý. Thông điệp thực dụng: ứng viên senior nên dùng phỏng vấn để tìm xem mỗi lựa chọn không hoàn hảo theo cách nào, thay vì chỉ cố chứng minh mình đủ tốt.

**Điểm chính:**
- Phỏng vấn là hai chiều; ứng viên cũng đang đánh giá công ty, team, manager và risk của role.
- Câu hỏi tốt yêu cầu ví dụ cụ thể về promotion, tenure, headcount, reorg, success/failure và lý do role đang mở.
- Sự ngập ngừng, deflect hoặc câu trả lời quá chung chung thường là dữ liệu quan trọng hơn nội dung được nói ra.
- Nếu công ty khó chịu khi bị hỏi kỹ, đó là tín hiệu rẻ và sớm rằng họ chưa thật sự xứng đáng với thời gian của bạn.

## [Agentic Testing: Where Agents Fit in the E2E Testing Stack](https://slack.engineering/agentic-testing-where-agents-fit-in-the-e2e-testing-stack/)

Sergii Gorbachov từ Slack chia sẻ kết quả hơn 200 lần chạy agentic E2E workflow để tìm xem agent nên nằm ở đâu trong test stack. Khác với E2E test truyền thống vốn ép một hành trình cố định qua UI, agentic test bắt đầu từ mục tiêu: agent quan sát trạng thái, tự chọn bước tiếp theo và xác minh kết quả. Trong thử nghiệm của Slack, Playwright MCP, Playwright CLI và test Playwright do agent sinh ra được chạy trên workspace test với dữ liệu không phải production, qua hai flow có độ phức tạp khác nhau: trả lời thread và khám phá search.

Kết quả cho thấy agentic testing không nên thay thế test deterministic trong CI. Generated Playwright test nhanh nhất và rẻ hơn khi chạy lặp lại, nhưng dễ vỡ ở flow phức tạp. Agent qua Playwright MCP đáng tin hơn CLI, đặc biệt khi workflow dài hơn, vì MCP giữ trạng thái trình duyệt ổn định và giảm số lượt tương tác cần thiết. Đổi lại, agentic run vẫn đắt và chậm hơn nhiều, thường phù hợp hơn cho exploratory testing, debug workflow flaky hoặc tái hiện bug production. Kết luận thực dụng: test deterministic vẫn là nền tảng hồi quy nhanh, còn agentic testing là lớp bổ sung ở đỉnh testing pyramid để kiểm tra mục tiêu và hành vi phức tạp.

**Điểm chính:**
- E2E test truyền thống kiểm tra một hành trình cụ thể; agentic testing kiểm tra liệu mục tiêu có đạt được qua UI hay không.
- Playwright MCP ổn định hơn Playwright CLI trong thử nghiệm của Slack vì tích hợp tốt hơn với vòng lặp tool-calling và trạng thái trình duyệt.
- Agentic run hiện còn chậm và tốn token, nên chưa phù hợp để thay thế high-frequency CI.
- Vị trí hợp lý là lớp bổ sung cho exploratory testing, debug flaky workflow và tái hiện bug phức tạp.

## [Making Agents Easy: 13 Lessons from Forter's Agentic AI Sprint](https://blog.forter.dev/making-agents-easy-13-lessons-from-forters-agentic-ai-sprint/)

Ben Maraney kể lại cách Forter chuẩn bị một chương trình hai tuần để toàn bộ R&D có trải nghiệm tự xây agent. Điểm chính không phải là agent dễ theo nghĩa vấn đề biến mất, mà là tổ chức có thể cố ý giảm ma sát: cung cấp tool dễ tìm, dễ hiểu và dễ thêm; cung cấp vài nền tảng chạy agent phù hợp với các kiểu tương tác khác nhau; rồi xử lý trước các rào cản pháp lý, bảo mật, chi phí và đào tạo. Nhờ một MCP server nội bộ tên Toolchain, người dùng có thể chọn tool, cấu hình và lấy API key nhanh; nếu thiếu tool, họ chỉ cần thêm YAML mô tả và một thin client. Đến cuối sprint, Forter có hơn 90 internal tools.

Bài viết cũng nhấn mạnh nhiều bài học vận hành thực tế. Nếu công ty đã có enterprise search tốt, hãy cân nhắc expose nó thành MCP tools trước khi xây RAG phức tạp. Agent builder cần nhìn rõ từng tool request và response, vì một agent incident response của Forter từng "giải" lỗi bằng cách đọc postmortem có sẵn. Evals hữu ích nhưng khó làm đúng, nên với hệ thống nội bộ có human-in-the-loop, trace và observability có thể quan trọng hơn ở giai đoạn đầu. Ngoài ra, legal và security cần được kéo vào sớm, quyền truy cập phải nằm trong deterministic code, chi phí token cần dashboard, và training nên đặt kỳ vọng đúng: LLM giống một thực tập sinh thông minh nhưng mỗi request là một thực tập sinh mới.

**Điểm chính:**
- Muốn democratize agent, hãy giảm ma sát ở ba lớp: tool, nền tảng chạy agent và rào cản tổ chức.
- In-house MCP server giúp tool dễ discover, dễ cấp quyền, dễ quản trị và dễ đóng góp thêm capability.
- Nếu đã có search nội bộ tốt, expose nó cho agent có thể thực dụng hơn xây RAG từ đầu.
- Trace tool usage, kiểm soát quyền trong code xác định, dashboard chi phí và training kỳ vọng là các nền tảng quan trọng hơn evals sớm.

## [Agentic Code Review](https://addyosmani.com/blog/agentic-code-review/)

Addy Osmani lập luận rằng khi coding agent làm việc ngày càng nhanh, nút thắt của kỹ thuật phần mềm dịch từ viết mã sang xác minh và tin được mã đó. AI có thể tạo rất nhiều mã đúng cú pháp, có test và trông hợp lý, nhưng tốc độ đọc hiểu của con người không tăng theo. Vì vậy review trở thành kỹ năng có đòn bẩy lớn nhất: không chỉ bắt lỗi, mà còn tái tạo ý định, đánh giá blast radius, chia sẻ hiểu biết và quyết định liệu đây có phải thay đổi nên làm hay không. Dữ liệu năm 2026 mà bài viết tổng hợp cũng chỉ ra cùng hướng: output tăng mạnh, nhưng churn, defect, incident và thời gian review cũng tăng.

Điểm thực dụng nhất là không có một chính sách review đúng cho mọi nơi. Solo project chưa có người dùng có thể dựa nhiều hơn vào test, AI reviewer và automation; hệ thống lâu năm có người dùng, tiền hoặc dữ liệu nhạy cảm thì cần review phân tầng theo rủi ro. Addy khuyến nghị giữ PR nhỏ, yêu cầu bằng chứng trước khi review, đọc phần test change kỹ hơn phần mã, dùng deterministic CI như tường chắn không thương lượng, và coi AI reviewer là sensor chứ không phải verdict. Human không nhất thiết đọc từng dòng nữa, nhưng vẫn phải sở hữu merge, accountable với production và tập trung vào những đường thay đổi có chi phí sai cao.

**Điểm chính:**
- AI làm viết mã rẻ hơn, nhưng hiểu hệ thống và chứng minh thay đổi đúng vẫn đắt như trước.
- Review effort nên theo blast radius, tuổi thọ mã và số người cần hiểu thay đổi, không theo cảm giác tội lỗi hay hype.
- AI reviewer hữu ích nhất khi dùng như lớp triage và cảm biến bổ sung; quyết định merge vẫn phải thuộc về người chịu trách nhiệm.
- Các guardrail quan trọng gồm PR nhỏ, intent rõ, test output thật, đọc kỹ test diff, CI nghiêm và review nặng cho đường auth, payment, security hoặc PII.

## [I Thought Redis Was Just a HashMap](https://mukul0x9.pages.dev/blog/memdb/)

Mukul Makwana bắt đầu từ một câu hỏi tưởng đơn giản: Redis hoặc Memcached có khác gì một bảng băm toàn cục với `set`, `get`, `del` hay không? Để trả lời, tác giả thử xây một phiên bản in-memory DB tối giản bằng Go. Bản đầu tiên dùng `map` có sẵn, phục vụ request qua TCP và tạo goroutine cho từng kết nối. Vấn đề xuất hiện ngay khi có nhiều goroutine đọc ghi cùng một map: cần khóa. Một mutex toàn cục giúp chương trình đúng hơn, nhưng mọi thao tác đều phải chờ cùng một khóa, biến concurrency thành bottleneck chính.

Tác giả sau đó thử một cấu trúc dùng `bucket_array` trỏ tới offset trong `data_array`, nơi lưu metadata, key, value và liên kết tới phần tử kế tiếp khi có collision. Để giảm tranh chấp khóa, bảng được chia thành nhiều shard, mỗi shard có bucket, data array và `RWMutex` riêng; khi shard đầy, background worker xử lý mở rộng. Delete không xóa ngay mà đánh dấu tombstone, sau đó compaction xây lại shard khi bộ nhớ vượt ngưỡng. Benchmark cho thấy native map vẫn thắng về throughput và stop-the-world pause, nhưng custom hash table giảm mạnh concurrent mark time vì ít con trỏ hơn cho GC phải quét. Bài học chính: tự xây một Redis nhỏ giúp thấy rõ chi phí thật nằm ở concurrency, memory layout, GC và vận hành, không chỉ ở thuật toán tra cứu O(1).

**Điểm chính:**
- Một in-memory DB không chỉ là `map`; nó còn cần xử lý concurrency, locking, memory layout, resize, delete, compaction và recovery.
- Mutex toàn cục là bottleneck lớn nhất trong thử nghiệm; sharding giảm contention hiệu quả hơn tối ưu hash function.
- Thiết kế append-only với tombstone đơn giản hóa delete nhưng tạo áp lực compaction và tạm dừng shard khi rebuild.
- Native Go map vẫn nhanh hơn trong benchmark SET-only, nhưng cấu trúc ít pointer hơn có thể giảm thời gian GC concurrent mark.
