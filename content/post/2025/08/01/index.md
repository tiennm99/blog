---
title: "Newsletter #42"
date: 2025-08-01
tags: [ "AI-Assisted", "Thuật toán", "Thiết kế hệ thống", "Go" ]
categories: [ "Newsletter" ]
---

*Mời bạn thưởng thức Newsletter #42.*

## [Challenging algorithms and data structures every programmer should try](https://austinhenley.com/blog/challengingalgorithms.html)

Bài viết giới thiệu 6 thuật toán và cấu trúc dữ liệu thú vị mà mọi lập trình viên nên thử nghiệm để mở rộng kiến thức và kỹ năng giải quyết vấn đề:

**Sắp xếp topo (Topological sort)** - Thuật toán giúp xác định thứ tự phụ thuộc giữa các nhiệm vụ. Đặc biệt hữu ích trong việc lập lịch công việc, xây dựng hệ thống build, hoặc xử lý các mối quan hệ có hướng không có chu trình.

**Phân tích cú pháp đệ quy xuống (Recursive descent parsing)** - Kỹ thuật phân tích cú pháp mạnh mẽ để xây dựng trình biên dịch, xử lý ngôn ngữ tự nhiên hoặc phân tích dữ liệu có cấu trúc phức tạp. Phương pháp này giúp hiểu sâu hơn về cách máy tính "đọc" và xử lý ngôn ngữ.

**Thuật toán so sánh chuỗi Myers** - Thuật toán tìm sự khác biệt giữa hai chuỗi văn bản một cách hiệu quả. Đây chính là nền tảng của các công cụ như Git diff, giúp hiển thị chính xác những thay đổi giữa các phiên bản mã nguồn.

**Bộ lọc Bloom** - Cấu trúc dữ liệu xác suất thông minh để kiểm tra sự tồn tại của phần tử với tốc độ nhanh và tiết kiệm bộ nhớ. Ứng dụng rộng rãi trong cơ sở dữ liệu, cache và hệ thống phân tán.

**Bảng mảnh (Piece table)** - Kỹ thuật quản lý và chỉnh sửa văn bản hiệu quả, được sử dụng trong nhiều trình soạn thảo hiện đại. Cho phép thực hiện các thao tác undo/redo nhanh chóng mà không cần lưu trữ toàn bộ lịch sử thay đổi.

**Cây Splay** - Cấu trúc cây nhị phân tự tối ưu hóa thông minh, tự động di chuyển các phần tử được truy cập gần đây lên gần gốc để tăng tốc độ truy xuất tiếp theo.

Tác giả khuyến khích các lập trình viên, đặc biệt là những người mới bắt đầu, nên dành thời gian nghiên cứu và triển khai những thuật toán này. Việc thực hành sẽ giúp mở rộng tư duy giải quyết vấn đề và cung cấp những công cụ mạnh mẽ cho sự nghiệp lập trình.

## [Everything I know about good system design](https://www.seangoedecke.com/good-system-design/)

Bài viết chia sẻ những nguyên tắc thiết kế hệ thống dựa trên kinh nghiệm thực tế, nhấn mạnh rằng thiết kế tốt thường đơn giản và không nổi bật. Tác giả tổng kết: "Thiết kế hệ thống tốt không phải về những thủ thuật thông minh, mà là biết cách sử dụng những thành phần đã được kiểm chứng ở đúng vị trí."

**Quản lý trạng thái (State Management)** - Giảm thiểu số lượng thành phần có trạng thái, ưu tiên một dịch vụ duy nhất quản lý ghi dữ liệu. Các dịch vụ không trạng thái dễ bảo trì và mở rộng hơn nhiều.

**Cơ sở dữ liệu** - Thiết kế lược đồ linh hoạt nhưng dễ đọc, sử dụng chỉ mục phù hợp và tối ưu hóa truy vấn. Tận dụng read replica để phân tải và cải thiện hiệu suất đọc dữ liệu.

**Xử lý nền (Background Processing)** - Sử dụng background job cho các thao tác chậm, tách biệt công việc tức thì và hoãn lại. Triển khai hệ thống hàng đợi một cách chiến lược để tránh blocking người dùng.

**Bộ nhớ đệm (Caching)** - Sử dụng cache một cách thông minh, ưu tiên cải thiện hiệu suất hệ thống trước khi nghĩ đến cache. Áp dụng các chiến lược cache đa dạng từ in-memory đến external store.

**Độ tin cậy hệ thống** - Triển khai logging cho các đường dẫn lỗi, tạo metrics và khả năng quan sát. Thiết kế kill switch và cơ chế retry, lập kế hoạch cho việc hệ thống fail một cách graceful.

Triết lý cốt lõi là tập trung vào các phương pháp thực dụng, đơn giản trong kiến trúc hệ thống, ưu tiên tính đơn giản và độ tin cậy thay vì sự phức tạp không cần thiết.

## [AI Coding Agents are Already Commoditized](https://www.seangoedecke.com/ai-agents-are-commoditized/)

Bài viết phân tích hiện trạng thị trường AI agent lập trình, cho rằng các agent này đã trở thành hàng hóa thông thường và không còn đòi hỏi công nghệ phức tạp để phát triển. Tác giả khẳng định: "AI agent lập trình không có bí kíp gì... Tất cả những gì bạn cần là một mô hình cơ sở thông minh hơn một chút."

**Thị trường bão hòa** - Các công ty công nghệ lớn như Claude, OpenAI, và GitHub đều đã ra mắt các AI agent tự động lập trình. Bất kỳ ai cũng có thể tạo ra một AI agent với ít mã nguồn, thường là miễn phí.

**Rào cản thấp** - Sự đột phá chính chỉ đơn giản là sử dụng các mô hình ngôn ngữ tiên tiến hơn. Không cần kiến thức chuyên sâu hay thuật toán phức tạp để xây dựng một agent hoạt động tốt.

**Thiếu lợi thế cạnh tranh** - Do sự xuất hiện của các giải pháp mã nguồn mở và chi phí inference có thể thay thế lẫn nhau, việc tạo ra sự khác biệt trong thị trường AI agent trở nên khó khăn.

**Chiến lược tiềm năng** - Tác giả đề xuất một số hướng cạnh tranh có thể như phân phối tốt hơn (ví dụ như sự tích hợp của GitHub) hoặc quyền truy cập độc quyền vào các mô hình AI.

Bài viết cảnh báo rằng thị trường AI agent lập trình đã trở nên commoditized (hàng hóa hóa), với rào cản gia nhập thấp và ít sự khác biệt giữa các nhà cung cấp, đòi hỏi các công ty phải tìm kiếm những lợi thế cạnh tranh mới.

## [Java, What's Old? Part I: Collections](https://foojay.io/today/java-whats-old-part-i-collections/)

Bài viết khám phá những tính năng "cũ" nhưng hữu ích trong Java Collections Framework mà nhiều lập trình viên có thể đã bỏ lỡ hoặc quên mất. Đây là những công cụ mạnh mẽ đã tồn tại từ lâu nhưng vẫn rất thực dụng trong các dự án hiện đại.

**Optional cho kiểu nguyên thủy** - Java cung cấp `OptionalInt`, `OptionalLong`, và `OptionalDouble` dành riêng cho các kiểu dữ liệu nguyên thủy, giúp tránh boxing/unboxing không cần thiết và cải thiện hiệu suất.

**Lớp thống kê tóm tắt** - `IntSummaryStatistics` và `DoubleSummaryStatistics` là những công cụ mạnh mẽ để tính toán các chỉ số thống kê như min, max, trung bình, tổng và số lượng phần tử trong một lần duyệt.

**LinkedHashMap với thứ tự truy cập** - Hỗ trợ sắp xếp theo thứ tự truy cập thông qua constructor parameter `accessOrder`, cho phép triển khai bộ nhớ đệm LRU (Least Recently Used) đơn giản và hiệu quả.

**WeakHashMap** - Sử dụng tham chiếu yếu (weak reference) cho các khóa, cho phép bộ thu gom rác tự động xóa các entry khi không còn tham chiếu cứng nào trỏ đến khóa, rất hữu ích cho cache và metadata mapping.

**BitSet** - Cấu trúc dữ liệu tiết kiệm bộ nhớ để lưu trữ các giá trị boolean, chỉ sử dụng 1 bit cho mỗi giá trị thay vì 8 bit như `boolean[]`, đặc biệt hữu ích khi xử lý tập dữ liệu lớn.

Bài viết nhấn mạnh rằng những tính năng "cũ" này vẫn rất có giá trị và thường được bỏ qua vì các lập trình viên tập trung vào những tính năng mới hơn, trong khi những công cụ này đã được kiểm chứng qua thời gian.

## [Challenging projects every programmer should try](https://austinhenley.com/blog/challengingprojects.html)

Bài viết của Austin Z. Henley đề xuất 6 dự án thách thức giúp lập trình viên phát triển kỹ năng sâu sắc qua việc xây dựng các ứng dụng phức tạp từ đầu. Đây là những dự án đòi hỏi hiểu biết đa lĩnh vực và cung cấp trải nghiệm học tập toàn diện.

**Trình soạn thảo văn bản** - Học cách quản lý cấu trúc dữ liệu phức tạp để lưu trữ văn bản, hiểu hành vi con trỏ và thao tác văn bản. Triển khai các tính năng nâng cao như undo/redo giúp nắm vững quản lý trạng thái ứng dụng.

**Game 2D (Space Invaders)** - Nắm vững kỹ thuật render đồ họa, hiểu về game loop và xử lý đầu vào người dùng. Thực hành quản lý đối tượng và logic game, từ đó học cách tối ưu hóa hiệu suất real-time.

**Trình biên dịch (Tiny BASIC)** - Học phân tích từ vựng và cú pháp, tạo cây cú pháp trừu tượng (AST). Thực hành sinh mã và tối ưu hóa, hiểu sâu về cách máy tính "hiểu" và thực thi mã nguồn.

**Hệ điều hành mini** - Hiểu tương tác phần cứng mức thấp, học về quy trình khởi động và quản lý bộ nhớ. Thực hành kỹ thuật lập lịch hệ thống và quản lý tài nguyên máy tính.

**Bảng tính (Thách thức nâng cao)** - Kết hợp kiến thức từ trình soạn thảo và trình biên dịch, học lập trình phản ứng (reactive programming). Triển khai thông dịch nội dung ô tính và quản lý phụ thuộc giữa các ô.

**Trình giả lập console game (Thách thức nâng cao)** - Mô phỏng các thành phần phần cứng, giả lập CPU và hành vi hệ thống. Bắt đầu với console đơn giản như CHIP-8 rồi tiến tới các hệ thống phức tạp hơn.

Tác giả nhấn mạnh rằng những dự án này cung cấp cơ hội học tập sâu sắc qua nhiều lĩnh vực lập trình khác nhau, giúp lập trình viên hiểu rõ các nguyên tắc thiết kế phần mềm phức tạp và phát triển tư duy giải quyết vấn đề một cách toàn diện.

## [Autonomous coding agents: A Codex example](https://martinfowler.com/articles/exploring-gen-ai/autonomous-agents-codex-example.html)

Bài viết của Birgitta Böckeler trên blog Martin Fowler khám phá việc sử dụng AI agent lập trình tự động, cụ thể là OpenAI Codex, để giải quyết một nhiệm vụ nhỏ trong ứng dụng Haiven. Đây là một nghiên cứu thực tế về khả năng và hạn chế của AI agent trong môi trường phát triển thực.

**Phân loại AI agent lập trình** - Tác giả phân biệt hai loại: AI agent hướng dẫn (tương tác trực tiếp với lập trình viên như GitHub Copilot) và AI agent nền tự động (hoạt động độc lập trong môi trường riêng để tạo mã).

**Nhiệm vụ thử nghiệm** - Cải thiện nhãn hiển thị từ "client-research" thành "Client Research" - một nhiệm vụ tưởng chừng đơn giản nhưng đòi hỏi hiểu biết về cấu trúc dự án và ngữ cảnh mã nguồn.

**Phương pháp hoạt động** - AI agent sử dụng tìm kiếm văn bản đơn giản để định vị mã cần thay đổi, sau đó áp dụng các chỉnh sửa phù hợp. Môi trường phát triển từ xa đóng vai trò then chốt cho hoạt động của agent.

**Kết quả quan sát** - Chất lượng giải pháp khác nhau đáng kể giữa các lần chạy, cho thấy tính không ổn định trong hiệu suất của AI agent. Một số lần chạy tạo ra giải pháp chính xác, trong khi những lần khác lại tạo ra mã có vấn đề.

**Thách thức chính** - Thiết lập môi trường phù hợp và quyết định khi nào nên tiếp tục hoặc loại bỏ mã do agent tạo ra. Việc giám sát và đánh giá chất lượng đầu ra vẫn đòi hỏi sự can thiệp của con người.

Bài viết cung cấp góc nhìn thực tế về tiềm năng và giới hạn của AI agent tự động trong phát triển phần mềm, nhấn mạnh rằng công nghệ này vẫn cần sự giám sát và hướng dẫn từ lập trình viên con người.

## [Implementing an Undo/Redo System in a Complex Visual Application](https://mlacast.com/projects/undo-redo)

Bài viết thảo luận về việc triển khai hệ thống undo/redo nhận biết ngữ cảnh cho Alkemion Studio, một công cụ brainstorming trực quan. Thách thức chính là thiết kế một hệ thống hoạt động qua nhiều ngữ cảnh ứng dụng mà không gây nhầm lẫn cho người dùng.

**Nguyên tắc thiết kế cốt lõi** - Tạo hệ thống theo dõi hành động theo ngữ cảnh cụ thể, ngăn người dùng hoàn tác những hành động mà họ không thể nhìn thấy trực quan. Sử dụng kiến trúc lớp "Action" linh hoạt để quản lý các thao tác phức tạp.

**Thành phần kỹ thuật chính** - Action Classes (lớp cơ sở với phương thức undo/redo), Action Volumes (lưu trữ có tổ chức cho các hành động), Containers (môi trường hành động biệt lập), và Context Management (xác định hành động nào có thể được hoàn tác).

**Phương pháp tiếp cận độc đáo** - Kiến trúc đa stack thay vì single stack truyền thống, quản lý chỉ mục cẩn thận để theo dõi hành động theo thứ tự thời gian, khả năng xử lý tương tác đa ngữ cảnh phức tạp.

**Thử thách triển khai** - Xử lý việc một hành động có thể ảnh hưởng đến nhiều ngữ cảnh khác nhau, đảm bảo tính nhất quán khi người dùng chuyển đổi giữa các môi trường làm việc trong ứng dụng.

**Cải tiến tương lai** - Kế hoạch triển khai đồ thị phụ thuộc (dependency graph) để quản lý các điều kiện tiên quyết của hành động và xử lý các tình huống undo/redo phức tạp hơn, bao gồm cả việc xử lý hành động có dependencies.

Bài viết cung cấp cái nhìn kỹ thuật sâu sắc về việc xây dựng hệ thống undo/redo mạnh mẽ vượt xa các triển khai tuyến tính truyền thống, đặc biệt hữu ích cho các ứng dụng có giao diện phức tạp và nhiều ngữ cảnh làm việc.

## [The software engineering 'squeeze'](https://newsletter.manager.dev/p/the-software-engineering-squeeze)

Bài viết của Anton Zaides phân tích sự thay đổi mạnh mẽ trong nghề kỹ sư phần mềm, cho rằng "thời hoàng kim" dễ dàng trong ngành này đã kết thúc. Tác giả nhận định rằng nghề này đã trở nên quá dễ dàng trong 10-15 năm qua, với nhiều kỹ sư "trung bình" được tuyển dụng một cách dễ dàng.

**Hiện thực mới** - Nghề kỹ sư phần mềm không còn là con đường dễ dàng để có thu nhập cao như trước. AI və các công nghệ mới đang tạo ra những thay đổi cơ bản trong cách thức làm việc và yêu cầu kỹ năng.

**Thách thức cạnh tranh** - Không còn chỗ cho những người chỉ "làm theo ticket" mà không hiểu sâu về sản phẩm và công nghệ. Thị trường hiện tại đòi hỏi những kỹ sư có khả năng sáng tạo và giải quyết vấn đề thực tế.

**Lời khuyên cho kỹ sư** - Học hỏi và làm chủ các công cụ AI mới thay vì chống lại chúng, phát triển kỹ năng toàn diện hơn chỉ viết mã, hiểu rõ về sản phẩm và nhu cầu người dùng thay vì chỉ tập trung vào kỹ thuật.

**Định hướng nghề nghiệp** - Các kỹ sư cần chuyển từ tư duy "nhân viên kỹ thuật" sang "người giải quyết vấn đề", từ việc thực hiện yêu cầu thành tìm hiểu và đề xuất giải pháp tối ưu.

**Thông điệp cốt lõi** - Nghề kỹ sư phần mềm giờ đây chỉ dành cho những người thực sự đam mê công nghệ và sẵn sàng học hỏi không ngừng. Thời kỳ "ăn theo" công nghệ để có công việc ổn định đã qua, thay vào đó là yêu cầu về chuyên môn thực sự và khả năng thích ứng liên tục.

Bài viết nhấn mạnh rằng sự thay đổi này không nhất thiết là tiêu cực, mà là cơ hội để ngành công nghiệp phần mềm trở nên chuyên nghiệp và chất lượng hơn.

## [Go is 80/20 language](https://blog.kowalczyk.info/article/d-2025-06-26/go-is-8020-language.html)

Bài viết thảo luận về triết lý thiết kế của Go, một ngôn ngữ được xây dựng theo nguyên tắc 80/20: cung cấp 80% tiện ích với chỉ 20% độ phức tạp. Tác giả lập luận rằng đây chính là sức mạnh cốt lõi của Go trong việc cân bằng giữa tính năng và sự đơn giản.

**Triết lý hạn chế tính năng** - Go cố tình giới hạn các tính năng ngôn ngữ để duy trì sự đơn giản. Tác giả nhấn mạnh: "Không ai phủ nhận rằng 87% cung cấp nhiều tiện ích hơn 80%. Vấn đề là 7% tiện ích bổ sung đó đòi hỏi thêm 36% công việc."

**Ví dụ thiết kế 80/20 trong Go** - Struct tags tối giản nhưng đủ dùng, thư viện testing tiêu chuẩn đơn giản nhưng hiệu quả, concurrency với goroutines dễ hiểu và sử dụng, các kiểu generic tích hợp sẵn trước khi có user-defined generics.

**Ưu tiên thực dụng** - Go ưu tiên dễ học, đơn giản triển khai và tiện ích thực tế hơn là tính hoàn chỉnh về mặt lý thuyết. Ngôn ngữ tập trung vào việc giải quyết 80% các vấn đề phổ biến một cách hiệu quả.

**Tránh bẫy phức tạp hóa** - Tác giả chỉ ra rằng các ngôn ngữ như Swift, C# và Rust thường rơi vào bẫy liên tục thêm tính năng, tăng độ phức tạp mà không mang lại lợi ích tương xứng.

**Lợi ích của phương pháp này** - Codebase Go dễ đọc và bảo trì, thời gian học ngôn ngữ ngắn, ít tranh cãi về style coding, hiệu suất biên dịch nhanh và deployment đơn giản.

**Thông điệp cốt lõi** - Thay vì cố gắng làm mọi thứ hoàn hảo, Go tập trung vào việc làm tốt những gì quan trọng nhất. Điều này tạo ra một ngôn ngữ thực dụng, dễ tiếp cận và hiệu quả cho phần lớn các use case trong phát triển phần mềm hiện đại.

Bài viết khẳng định rằng sự "thiếu hụt" về tính năng của Go thực chất là một lợi thế, giúp các lập trình viên tập trung vào giải quyết vấn đề thay vì vật lộn với độ phức tạp của ngôn ngữ.

---

*Bài viết đã được review và cập nhật bởi Claude Code với Opus 4.7 (1M context).*
