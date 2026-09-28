---
title: "Newsletter #92"
date: 2026-03-20
tags: ["AI-Assisted", "Newsletter", "AI Infrastructure", "Machine Learning", "Redis", "Compression", "AI Agents"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #92.*

## ~~[Tôi đã trở nên giỏi xử lý sự cố như thế nào](https://tomasztomczyk.com/blog/2026/how-i-became-good-at-leading-incidents/)~~

~~Tomasz Tomczyk chia sẻ những bài học từ hơn 100 sự cố mà anh đã dẫn dắt trong suốt sự nghiệp, nhấn mạnh rằng quản lý sự cố không chỉ là kỹ năng kỹ thuật mà còn là tư duy phân tích và khả năng lãnh đạo dưới áp lực. Anh cho rằng mỗi sự cố là cơ hội để hiểu sâu hơn về hệ thống và xây dựng văn hóa học hỏi từ thất bại.~~

~~Để xử lý sự cố hiệu quả, bạn cần nắm vững quy trình triển khai và toàn bộ ngăn xếp công nghệ từ DNS đến tầng ứng dụng, đồng thời thiết lập hệ thống giám sát toàn diện. Khi xảy ra sự cố, hãy phân công điều tra theo từng chủ đề cụ thể, đưa ra quyết định dứt khoát khi cần vô hiệu hóa tính năng, và cung cấp thông tin cập nhật kịp thời cho các bên liên quan. Việc lập tài liệu các mẫu lỗi phổ biến vào runbook và thực hành qua các bài tập chaos engineering cũng giúp đội nhóm chuẩn bị tốt hơn cho các tình huống thực tế.~~

~~**Điểm chính:**~~
~~- Nắm vững quy trình triển khai và toàn bộ ngăn xếp công nghệ để nhanh chóng xác định nguyên nhân sự cố~~
~~- Đọc hiểu stack trace và sử dụng công cụ theo dõi lỗi như Sentry để điều tra sâu hơn~~
~~- Xây dựng văn hóa tâm lý an toàn để thất bại trở thành cơ hội học hỏi~~
~~- Phân công điều tra chiến lược và đưa ra quyết định dứt khoát trong thời điểm căng thẳng~~
~~- Lập tài liệu runbook và thực hành game day để chuẩn bị cho các sự cố thực tế~~

## [Decision Trees: Sức mạnh bất ngờ của các quy tắc quyết định lồng nhau](https://mlu-explain.github.io/decision-tree/)

Bài viết thuộc loạt MLU-Explain của Jared Wilber và Lucía Santamaría giới thiệu decision tree (cây quyết định) bằng hình ảnh trực quan. Ví dụ được chọn rất gần gũi: một người nông dân cần phân biệt cây táo, anh đào và sồi chỉ dựa vào đường kính và chiều cao thân cây. Ở mỗi bước, thuật toán tìm điều kiện phân chia tốt nhất, chẳng hạn gần như mọi cây có đường kính từ 0,45 trở lên đều là sồi nên điều kiện này trở thành nút gốc; phần dữ liệu còn lại tiếp tục được chia theo chiều cao hoặc đường kính cho đến khi mỗi vùng chủ yếu chỉ còn một loại cây. Kết quả là một tập quy tắc lồng nhau mà mọi điểm dữ liệu mới đều có thể đi qua để được phân loại.

Để chọn điểm phân chia, thuật toán ID3 ưu tiên phép chia mang lại information gain lớn nhất, tức là làm giảm entropy của dữ liệu nhiều nhất. Tuy nhiên, chia quá sâu sẽ khiến cây học cả nhiễu trong dữ liệu huấn luyện thay vì những quy tắc có thể tổng quát hóa, một biểu hiện của sự đánh đổi giữa bias và variance dẫn đến overfitting. Cây quyết định dễ diễn giải, huấn luyện nhanh, ít cần tiền xử lý và chịu tốt giá trị ngoại lệ, nhưng lại kém ổn định: chỉ một thay đổi nhỏ trong dữ liệu cũng có thể làm cấu trúc cây thay đổi hoàn toàn. Các kỹ thuật cắt tỉa (pruning) như giới hạn độ sâu tối đa hay đặt số mẫu tối thiểu ở mỗi lá giúp kiểm soát vấn đề này.

## ~~[Container không phải là ranh giới bảo mật](https://www.lucavall.in/blog/containers-are-not-a-security-boundary)~~

Dựa trên cuốn Container Security của Liz Rice và quá trình tự tìm hiểu các thành phần Linux bên dưới, Luca Cavallin nhắc lại rằng container không tự động an toàn. Về bản chất, container chỉ là một tiến trình Linux được bao quanh bởi vài lớp cô lập: namespace giới hạn những gì tiến trình nhìn thấy, cgroups giới hạn tài nguyên nó được dùng, nhưng mọi container trên cùng máy chủ vẫn dùng chung một kernel. Vì vậy lỗi kernel, mount cấu hình sai, capabilities quá rộng như CAP_SYS_ADMIN hay tệp setuid bị bỏ quên đều có thể trở thành đường leo thang đặc quyền; chỉ "không chạy bằng root" là chưa đủ. Những nguyên tắc cũ như đặc quyền tối thiểu, phòng thủ nhiều lớp, giảm bề mặt tấn công và giới hạn phạm vi ảnh hưởng vẫn nguyên giá trị.

Để gia cố, tác giả đề xuất lọc syscall bằng seccomp, bổ sung kiểm soát truy cập bắt buộc với AppArmor hoặc SELinux, và dùng user namespace để ánh xạ root trong container thành người dùng không có đặc quyền trên máy chủ. Khi cần cô lập mạnh hơn có thể dùng gVisor, Kata Containers, Firecracker, hoặc chuyển hẳn sang máy ảo, nơi mỗi máy khách có kernel riêng, cho mã nguồn không đáng tin cậy và môi trường nhiều khách hàng. Bài viết cũng nhấn mạnh bảo mật chuỗi cung ứng: coi Dockerfile như một chính sách thực thi, dùng base image tối giản, ghim digest thay vì tag, tách giai đoạn xây dựng và giai đoạn chạy, ký image bằng cosign và để admission control từ chối image sai nguồn hoặc chưa ký trước khi được triển khai.

## [Bài ca ngợi bzip](https://purplesyringa.moe/blog/an-ode-to-bzip/)

Purplesyringa cần nén mã nguồn Lua cho mod ComputerCraft trong Minecraft, nơi dung lượng đĩa bị giới hạn và chính bộ giải nén cũng phải thật nhỏ. Khi thử nén một tệp mã Lua 327 KB, bzip2 đạt 63.727 byte và bzip3 đạt 61.067 byte, vượt xa zopfli (gzip), zstd, xz, brotli và cả lzip. Lý do nằm ở thuật toán: hầu hết công cụ nén phổ biến đều dựa trên LZ77, tức thay đoạn lặp lại bằng tham chiếu đến lần xuất hiện trước đó, còn bzip dùng BWT (Burrows-Wheeler Transform) để sắp xếp lại ký tự theo ngữ cảnh. Nhờ vậy các ký tự giống nhau dồn thành chuỗi dài, dễ nén bằng run-length encoding, rất hợp với dữ liệu dạng văn bản như mã nguồn.

BWT còn hoàn toàn xác định, không cần heuristic hay các mức nén như LZ77, nên ngay cả một bộ mã hóa tự viết đơn giản cũng đạt tỉ lệ nén tốt. Khi bỏ tương thích với định dạng chuẩn và chỉ dùng một bảng Huffman, bộ giải nén kiểu bzip của tác giả chỉ khoảng 1,5 KB. bzip thường bị chê là chậm, nhưng khi nén để vượt qua một giới hạn cứng thì khác biệt là giữa khởi động được hay không, và trong ngôn ngữ bậc cao như Lua, nơi mọi thao tác đều chậm, bất lợi này giảm đi đáng kể. Tác giả kết luận bzip có thể không tối ưu cho mục đích chung nhưng rất tốt cho văn bản và mã nguồn.

## [Tại sao các kiến trúc sư hệ thống mặc định chọn Arm cho trung tâm dữ liệu AI](https://newsroom.arm.com/blog/why-system-architects-default-to-arm-in-ai-data-centers)

Bài viết trên Arm Newsroom lập luận rằng AI đang làm lộ rõ giới hạn của mô hình máy chủ đa năng truyền thống về cấp điện, tản nhiệt, băng thông bộ nhớ và hiệu năng toàn hệ thống. Vì thế, trung tâm dữ liệu đang chuyển sang hệ thống cấp rack được thiết kế riêng cho AI, nơi câu hỏi quan trọng không còn là có bao nhiêu sức tính toán thô mà là bộ tăng tốc, CPU, bộ nhớ, mạng và phần mềm phối hợp hiệu quả đến đâu. AI tác nhân khiến điều này càng rõ: tác nhân lập kế hoạch, gọi công cụ, truy xuất dữ liệu và lặp lại liên tục, tạo ra mẫu suy luận chạy suốt ngày đêm. Khi đó CPU đóng vai trò nút điều phối, lo lập lịch, định tuyến, I/O, mạng, lưu trữ và bảo mật để bộ tăng tốc luôn có việc.

Theo Arm, hiệu năng trên mỗi watt trở thành thước đo then chốt vì điện năng và ngân sách là những giới hạn cứng. Bài viết dẫn số liệu cho thấy gần một nửa năng lực tính toán giao cho các hyperscaler hàng đầu cuối năm 2025 dự kiến dựa trên Arm, cùng kết quả kiểm thử cho thấy Graviton4 (Neoverse) có hiệu năng và tỉ lệ giá trên hiệu năng tốt hơn các lựa chọn AMD và Intel tương đương. Các hệ thống cấp rack mới như NVIDIA Vera Rubin NVL72, với 72 GPU Rubin và 36 CPU Vera trên nền Arm, hay AWS Trainium3 UltraServer kết hợp Graviton đều đi theo mô hình này. Arm cũng nhấn mạnh khả năng di chuyển khối lượng công việc giữa các thế hệ phần cứng mà không phải viết lại phần mềm.

## [Redis xây dựng Agent Skill để AI viết mã Redis như chuyên gia](https://redis.io/blog/we-built-an-agent-skill-so-ai-writes-redis-code/)

Redis giới thiệu Agent Skill, một tệp markdown chứa kiến thức chuyên sâu về Redis mà các tác nhân lập trình AI như Claude Code, Cursor, Codex hay Copilot có thể nạp vào ngữ cảnh khi gặp tác vụ liên quan, chỉ với một lệnh cài đặt. Nhóm tác giả nhận thấy mã do tác nhân sinh ra thường mắc ba vấn đề. Thứ nhất, mô hình được huấn luyện trên dữ liệu cũ nên viết như thể Redis vẫn dừng ở phiên bản 6, bỏ qua vector sets, JSON, query engine hay LangCache. Thứ hai, tác nhân tự ứng biến kiến trúc thay vì dùng giải pháp đã được kiểm chứng, chẳng hạn rate limiter không dùng sliding window với sorted set, thiếu bảo vệ trước cache stampede, không tận dụng pipelining. Thứ ba, nó không cảnh báo những gì nó không biết, như dùng lệnh chặn `KEYS *` trên hệ thống có hàng triệu key hay lưu JSON lớn vào chuỗi thay vì hash.

Skill cung cấp các mẫu đúng và cập nhật cho caching, rate limiting, quản lý phiên, vector search, semantic caching, bộ nhớ cho tác nhân, pub/sub và streams; hướng dẫn khi nào nên chọn hash, JSON, sorted set hay vector set; các rào chắn chống anti-pattern như `KEYS` trong vòng lặp hay key tăng trưởng không giới hạn; cùng các thiết lập mặc định sẵn sàng cho môi trường thực tế như connection pooling, pipelining và tương thích cluster. Như nhóm Anthropic tóm gọn, MCP cung cấp công cụ, còn Skill dạy cách dùng chúng. Skill theo một tiêu chuẩn mở, chỉ được tải khi cần để giữ cửa sổ ngữ cảnh gọn, có thể quản lý phiên bản bằng git, chia sẻ trong nhóm và kết hợp với các skill khác.

## [Bên trong Archive: Công nghệ đằng sau Spotify Wrapped 2025](https://engineering.atspotify.com/2026/3/inside-the-archive-2025-wrapped)

Đội ngũ kỹ thuật Spotify chia sẻ cách xây dựng Wrapped Archive trong Wrapped 2025: với mỗi người dùng đủ điều kiện, hệ thống chọn tối đa năm "ngày đáng nhớ" trong năm và dùng LLM viết một báo cáo mang tính kể chuyện, dựa hoàn toàn trên dữ liệu nghe nhạc thực. Các ngày được chọn bằng một tập heuristic xếp theo thứ tự ưu tiên như ngày nghe nhiều nhất, ngày khám phá nhiều nghệ sĩ mới nhất hay ngày nghe khác thường nhất. Để tạo khoảng 1,4 tỷ báo cáo cho 350 triệu người dùng với chi phí hợp lý, họ chưng cất (distillation) mô hình frontier thành một mô hình nhỏ hơn bằng bộ dữ liệu "vàng" được tuyển chọn kỹ, rồi tinh chỉnh thêm bằng DPO từ đánh giá của con người. Hệ thống chạy liên tục bốn ngày với hàng nghìn yêu cầu mỗi giây.

Về lưu trữ, mỗi ngày đáng nhớ được ghi vào một cột riêng trong cơ sở dữ liệu key-value hướng cột, nên các lượt ghi đồng thời cho cùng một người dùng không đụng nhau, không cần khóa hay chu trình đọc-sửa-ghi. Vì Wrapped ra mắt toàn cầu cùng lúc, họ mở rộng hạ tầng và chạy kiểm thử tải ở mọi vùng trước hàng giờ. Chất lượng được kiểm soát bằng cách dùng LLM làm giám khảo chấm khoảng 165.000 báo cáo mẫu theo độ chính xác, an toàn, giọng văn và định dạng; nhờ đó họ phát hiện một lỗi múi giờ trong pipeline khiến một số báo cáo sai ngày, rồi sửa và tạo lại hàng loạt. Bài học lớn nhất: ở quy mô này, gọi LLM là phần dễ, còn lập kế hoạch năng lực và vòng lặp an toàn mới là phần khó.

## [Quản lý nhiều tác nhân AI](https://fffej.substack.com/p/managing-multiple-agents)

Jeff thử áp dụng các phong cách quản lý con người vào việc điều phối nhiều tác nhân AI qua một mô phỏng vui: bốn "minion" cùng lắp một chiếc tủ sách Ikea, trong đó Kevin đọc hướng dẫn, Stuart lấy linh kiện, Bob lắp ráp và Dave kiểm tra chất lượng, tất cả chạy trên mô hình trọng số mở gpt-oss:20b. Với Command and Control, mọi hành động đều phải xin phép người điều phối nên tốn rất nhiều tin nhắn và kém hiệu quả. Taylorism chia việc thành các bước nhỏ được chuẩn hóa, hiệu quả hơn hẳn nhưng không để lại chút tự chủ nào cho tác nhân.

Quản lý theo kết quả, tức chỉ nêu mục tiêu kèm giới hạn số việc đang làm dở (WIP), cho kết quả tốt nhất: nhanh gấp năm lần Command and Control và gấp ba lần Taylorism. Điều thú vị nhất là Stuart tự nhận ra khâu lắp ráp đang là nút thắt cổ chai và nhảy vào giúp dù không ai yêu cầu. Ngược lại, tự trị hoàn toàn vẫn lắp xong tủ nhưng rất hỗn loạn, các tác nhân làm trùng việc của nhau, đúng như câu nói của Kent Beck: "Tự trị không có ràng buộc là hỗn loạn." Tác giả kết luận cách điều phối tác nhân phản chiếu cách quản lý con người: tác nhân còn non thì phải quản chặt, còn tác nhân có năng lực thì chỉ cần đặt mục tiêu rồi để chúng tự xoay xở.

---

*Bài viết đã được viết lại bởi Claude Code với Opus 5.5 vào ngày 27/09/2026.*
