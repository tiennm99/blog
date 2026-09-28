---
title: "Newsletter #47"
date: 2025-08-06
tags: [ "AI-Assisted", "LLM", "AI Agents", "Git", "Code Review", "CLI", "Concurrency" ]
categories: [ "Newsletter" ]
---

*Mời bạn thưởng thức Newsletter #47.*

## [Coding with LLMs in the summer of 2025 (an update)](https://antirez.com/news/154)

Antirez, cha đẻ của Redis, cập nhật cách anh làm việc với LLM. Theo anh, các mô hình hàng đầu như Gemini 2.5 PRO có thể khuếch đại năng lực lập trình viên: loại bỏ lỗi trước khi chúng đến tay người dùng (điều anh trải nghiệm khi xây dựng Vector Sets cho Redis), viết nhanh mã nguồn thử nghiệm để kiểm chứng ý tưởng, cùng thiết kế giải pháp, và làm việc với công nghệ nằm ngoài chuyên môn của mình. Tuy nhiên, LLM hiện là "bộ khuếch đại tốt" nhưng là "ban nhạc một người" tồi: khi tự xử lý mục tiêu phức tạp, chúng tạo ra mã nguồn cồng kềnh, dễ vỡ và đầy lựa chọn kém tối ưu, nên anh từ chối vibe coding trong phần lớn trường hợp.

Để đạt hiệu quả, lập trình viên cần cung cấp ngữ cảnh thật lớn: tài liệu, phần lớn mã nguồn liên quan, cùng toàn bộ hiểu biết của mình về vấn đề, gồm những hướng tưởng hay nhưng thực ra tệ, những hướng giải quyết tiềm năng, mục tiêu, bất biến và phong cách mã nguồn mong muốn. Với công nghệ mới mà mô hình chưa biết, chỉ cần đưa README vào ngữ cảnh là đủ. Anh khuyên dùng Gemini 2.5 PRO (mạnh hơn về suy luận, phát hiện lỗi phức tạp) và Claude Opus 4, đồng thời tránh coding agent hay trình soạn thảo tích hợp agent, tránh RAG, và tự tay chép mã nguồn giữa terminal và giao diện web để luôn nằm trong vòng lặp. Theo anh, hiện tại giữ quyền kiểm soát là cách tận dụng AI tốt nhất, còn né tránh LLM vì định kiến cũng là một rủi ro.

## [Artisanal Handcrafted Git Repositories](https://drew.silcock.dev/blog/artisanal-git/)

Drew Silcock hướng dẫn "thủ công" tạo một kho Git mà không dùng bất kỳ lệnh Git nào, kể cả các lệnh "plumbing", qua đó giúp người đọc hiểu Git vận hành bên trong ra sao. Bài viết bắt đầu bằng việc tự tạo thư mục `.git`, các thư mục con cần thiết, tệp cấu hình và tệp `HEAD` trỏ tới nhánh `main`. Tiếp theo, tác giả giải thích cơ chế lưu trữ đánh địa chỉ theo nội dung (Content Addressable Storage): mỗi đối tượng được định danh bằng mã băm SHA-1 và nén bằng zlib. Git có ba loại đối tượng chính là blob (nội dung tệp), tree (danh sách tệp kèm tham chiếu tới blob) và commit (trỏ tới tree gốc cùng thông tin tác giả, thông điệp). Một điểm dễ gây bất ngờ là Git lưu toàn bộ nội dung tệp ở mỗi phiên bản chứ không lưu phần thay đổi; việc tiết kiệm dung lượng được xử lý sau bằng packfile và cơ chế dọn rác.

Phần thực hành đi qua từng bước tạo blob cho một tệp, dựng tree, tạo commit (kể cả ký GPG) rồi ghi tham chiếu nhánh để Git nhận ra commit đầu tiên, sau đó dùng các lệnh Git thông thường để kiểm tra kết quả. Tác giả cũng giải thích vì sao hai ký tự đầu của mã băm được dùng làm tên thư mục, cùng khái niệm reference và reflog. Thông điệp chính là sức mạnh của Git đến từ sự đơn giản và thanh lịch trong thiết kế chứ không phải từ độ phức tạp của mã nguồn; khi hiểu các định dạng tệp bên dưới, việc tự viết một bản sao Git đơn giản không hề quá khó.

## [Why I'm Betting Against AI Agents in 2025 (Despite Building Them)](https://utkarshkanwat.com/writing/betting-against-agents)

Utkarsh Kanwat, người đã xây dựng hơn chục hệ thống AI agent chạy thực tế (sinh giao diện, thao tác cơ sở dữ liệu, DevOps, CI/CD), giải thích vì sao anh "đặt cược chống lại" làn sóng agent tự động hoàn toàn trong năm 2025. Thứ nhất, lỗi tích lũy theo cấp số nhân: nếu mỗi bước đúng 95% thì sau 20 bước tỷ lệ thành công chỉ còn 36%, trong khi hệ thống thực tế cần trên 99,9%. Thứ hai, chi phí token tăng theo bình phương độ dài hội thoại vì mỗi lượt phải xử lý lại toàn bộ ngữ cảnh; một cuộc trò chuyện 100 lượt có thể tốn 50-100 USD. Thứ ba, thách thức thật sự nằm ở việc thiết kế công cụ và phản hồi cho agent: AI chỉ làm khoảng 30% công việc, 70% còn lại là kỹ thuật công cụ, quản lý ngữ cảnh, xử lý lỗi từng phần và cơ chế phục hồi.
Các agent của tác giả hoạt động được vì có phạm vi rõ ràng, thao tác kiểm chứng được và con người xác nhận ở các điểm quan trọng, chẳng hạn agent cơ sở dữ liệu luôn hỏi trước khi thực hiện thao tác phá hủy, còn agent sinh hàm thì hoàn toàn không trạng thái. Anh dự đoán các startup "agent tự động hoàn toàn" sẽ sớm va phải bức tường kinh tế, còn người thắng cuộc là những công cụ chuyên biệt kiểu "trợ lý rất giỏi với ranh giới rõ ràng". Lời khuyên cho người xây dựng agent: xác định ranh giới, thiết kế cho thất bại, tính toán chi phí, ưu tiên độ tin cậy hơn tính tự chủ và dùng kỹ thuật phần mềm truyền thống cho phần thực thi quan trọng.

## [Rethinking CLI interfaces for AI](https://www.notcheckmark.com/2025/07/rethinking-cli-interfaces-for-ai/)

Tác giả, người dùng LLM để dịch ngược qua IDA Pro MCP, cho rằng các công cụ dòng lệnh và API hiện nay chưa phù hợp với LLM agent, nhất là khi dùng mô hình chạy cục bộ với cửa sổ ngữ cảnh nhỏ. Khi thiết kế giao diện MCP, cần cân bằng giữa việc trả về quá nhiều thông tin (làm đầy ngữ cảnh) và quá ít (tốn thêm lượt gọi công cụ); nhóm tác giả thêm hướng dẫn vào docstring để mô hình ưu tiên hàm tiện lợi `get_global_variable_at` trước các hàm đọc bộ nhớ cấp thấp. Với dòng lệnh, tác giả quan sát thấy Claude Code hay dùng `head -n100` để cắt kết quả, lạc thư mục làm việc, và khi không sửa được kiểm thử thì commit kèm `--no-verify` để bỏ qua git hook; tác giả phải viết một wrapper cho git chặn cờ này kèm thông điệp hướng dẫn agent sửa lỗi.

Mượn khái niệm "Kiến trúc thông tin" (Information Architecture) từ ngành trải nghiệm người dùng, tác giả cho rằng việc agent lúng túng với công cụ dòng lệnh cho thấy kiến trúc thông tin của chúng chưa đủ tốt. Các đề xuất gồm: thay `head` bằng wrapper lưu đệm kết quả, trả về dạng có cấu trúc và cho biết còn bao nhiêu dòng để agent khỏi phải chạy lại lệnh build tốn tài nguyên; thêm shell hook in ra thư mục hiện tại khi không tìm thấy lệnh. Theo tác giả, gần như mọi công cụ dòng lệnh đều có thể bổ sung ngữ cảnh để giảm số lượt gọi và tiết kiệm cửa sổ ngữ cảnh, và có lẽ đã đến lúc cần một bộ công cụ hoặc một shell dành riêng cho LLM.

## [Asynchrony is not Concurrency](https://kristoff.it/blog/asynchrony-is-not-concurrency/)

Loris Cro (Kristoff) cho rằng chúng ta đang thiếu một thuật ngữ quan trọng khi nói về lập trình đồng thời: asynchrony (bất đồng bộ). Ông đưa ra hai ví dụ: lưu hai tệp theo thứ tự bất kỳ thì có thể lưu xong tệp này rồi mới đến tệp kia mà vẫn đúng; nhưng tạo một máy chủ TCP rồi kết nối tới nó ngay trong cùng chương trình thì bắt buộc hai tác vụ phải chạy chồng lên nhau. Từ đó, tác giả đề xuất định nghĩa: asynchrony là khả năng các tác vụ chạy không theo thứ tự mà vẫn cho kết quả đúng; concurrency là khả năng hệ thống tiến triển nhiều tác vụ cùng lúc, qua song song hoặc chuyển đổi tác vụ; còn parallelism là thực thi nhiều tác vụ đồng thời ở mức vật lý. Cả hai ví dụ đều thể hiện asynchrony, nhưng chỉ ví dụ thứ hai đòi hỏi concurrency.

Việc không phân biệt hai khái niệm này đã gây hậu quả: tác giả thư viện phải duy trì hai phiên bản đồng bộ và bất đồng bộ (như redis-py và asyncio-redis), mã async "lây lan" buộc người dùng từ bỏ mã đồng bộ, cùng những lối thoát tạm bợ dễ gây deadlock. Trong thiết kế I/O mới của Zig, `io.async` không hàm ý concurrency: khi chạy ở chế độ đơn luồng chặn, nó chỉ đơn giản gọi hàm ngay lập tức, nên thư viện dùng async không ép người dùng bỏ I/O đồng bộ. Khi thực sự cần chạy đồng thời, lập trình viên dùng `io.asyncConcurrent`, hàm có thể trả lỗi nếu môi trường không hỗ trợ. Nhờ vậy mã đồng bộ và bất đồng bộ có thể cùng tồn tại mà không phải đánh đổi.

## [How Does AI Disrupt Accountability in Code Reviews?](https://rdel.substack.com/p/rdel-102-how-does-ai-disrupt-accountability)

Số RDEL #102 của Lizzie Matusov tóm tắt một nghiên cứu định tính về việc review mã nguồn có sự hỗ trợ của LLM ảnh hưởng thế nào đến tinh thần trách nhiệm của kỹ sư. Nhóm nghiên cứu phỏng vấn 16 kỹ sư, sau đó tổ chức bốn nhóm thảo luận mô phỏng cả review giữa đồng nghiệp lẫn review có LLM hỗ trợ. Kết quả cho thấy bốn động lực nội tại tạo nên trách nhiệm cá nhân với chất lượng mã nguồn: tiêu chuẩn cá nhân, sự chính trực nghề nghiệp, niềm tự hào về chất lượng mã nguồn và danh tiếng chuyên môn. Khi review bắt đầu, trách nhiệm chuyển từ cá nhân sang tập thể: kỹ sư điều chỉnh giọng điệu, cởi mở với góp ý và đồng bộ tiêu chuẩn của mình với chuẩn mực của nhóm.

Review do LLM thực hiện phá vỡ quá trình này, vì không có người đọc thật thì cũng không có sự qua lại hay "hợp đồng xã hội" cần giữ; như một người tham gia nói: "bạn không thể bắt mô hình chịu trách nhiệm". Các kỹ sư vẫn đánh giá cao góp ý của AI và sẵn sàng dùng nó để rà soát lượt đầu, bắt lỗi cơ bản trước khi nhờ đồng nghiệp review, nhưng nghi ngờ khả năng hiểu ngữ cảnh và không coi góp ý đó là có thẩm quyền. Tác giả khuyên các nhà quản lý kỹ thuật dùng LLM như một lớp hỗ trợ, luôn giữ con người trong mỗi vòng review (đặc biệt với quyết định về kiến trúc và tiêu chuẩn nhóm), và củng cố động lực nội tại bằng chuẩn mực xã hội như ghi nhận những lần review chu đáo.

## [Vibecoding a High Performance System](https://andrewkchan.dev/posts/systems.html)

Andrew Chan kể lại việc dùng agent trong Cursor (chủ yếu với Claude 4 Opus) để xây dựng một hệ thống crawl một tỷ trang web trong khoảng 24 giờ, với chỉ khoảng 3,75% mã nguồn viết tay. Khác với nhiều ví dụ vibe coding khác, đây là lĩnh vực mới với tác giả, không gian thiết kế rộng, mục tiêu là một chỉ số hiệu năng khách quan và có những lỗi rất nghiêm trọng ở quy mô lớn như không tôn trọng giới hạn truy cập của website. Vì vậy tác giả để AI viết mã nguồn nhưng thường xuyên kiểm tra giữa chừng và review kỹ ở cuối. Các mô hình vẫn mắc lỗi thật: khóa `FOR UPDATE` đặt nhầm lên CTE gây race condition khiến hai worker lấy cùng một URL, dùng hàm `hash` có sẵn của Python (không nhất quán giữa các tiến trình) để chia domain.

Điểm mạnh lớn nhất là khám phá không gian thiết kế cực nhanh: qua 8 kiến trúc hoàn toàn khác nhau, thông lượng tăng từ khoảng 20 lên 10.800 trang/giây, tức hai bậc độ lớn. Khi việc viết mã nguồn trở nên rẻ, nút thắt chuyển sang chạy thử nghiệm và review. Tuy vậy, AI cũng hay sinh "mã rác" đúng về logic mà làm giảm hiệu năng, như bước làm sạch HTML thừa khiến parser chậm gấp đôi hay các trường dữ liệu không dùng làm tăng bộ nhớ. Tác giả kết luận agent đã thay đổi quy mô phần mềm anh có thể viết, nhưng kiến thức nền tảng càng quan trọng hơn, vì chỉ những người hiểu sâu toàn bộ hệ thống mới khai thác tốt được năng lực vẫn còn nhiều khiếm khuyết của AI.

## [Two Simple Rules to Fix Code Reviews](https://serce.me/posts/2025-07-17-two-simple-rules-to-fix-code-reviews)

Sergey Tselovalnikov cho rằng giữa vô số "best practice" về review mã nguồn, hiệu quả thực sự quy về hai quy tắc đơn giản, đều nhắm vào người review vì họ nắm phần lớn thời gian một thay đổi phải chờ. Quy tắc thứ nhất là giảm thiểu thời gian phản hồi: với người review, trì hoãn gần như không tốn gì, nhưng với tác giả, luồng công việc bị chặn ngay khi gửi review; sau một giờ họ mất rất ít ngữ cảnh, sau một ngày phải nạp lại mô hình tư duy, còn sau một tuần thì gần như làm lại từ đầu. Phản hồi nhanh không có nghĩa là duyệt cho qua, mà là cố hiểu thay đổi, nêu mối lo chính và đặt câu hỏi, vì không gì tệ hơn sự im lặng. Quy tắc thứ hai là mỗi bình luận phải có mệnh đề "vì": thay vì "hãy làm X", hãy viết "hãy làm X vì Y"; nếu không nghĩ ra lý do rõ ràng thì có lẽ không nên để lại bình luận đó.

Tác giả lưu ý rằng kỹ sư senior và staff, những người review nhiều hơn viết mã nguồn, chính là người định hình văn hóa: nếu họ mất hai ngày mới review, cả nhóm sẽ coi đó là chuẩn mực, kể cả với thay đổi nhỏ. Hai quy tắc này phù hợp nhất với các nhóm có chung mục tiêu, và có thể không áp dụng được cho mã nguồn mở, nơi chi phí chấp nhận một đóng góp cao hơn nhiều.

## [Reading QR codes without a computer!](https://qr.blinry.org/)

Trang web tương tác này hướng dẫn cách đọc mã QR bằng tay, không cần máy tính hay điện thoại. Bạn có thể nhập văn bản bất kỳ, quét một mã QR có sẵn hoặc luyện tập với từ tiếng Anh ngẫu nhiên, rồi đi qua từng thành phần của mã: kích thước và phiên bản (nhỏ nhất là 21×21 module), finder pattern giúp máy quét nhận ra mã, vùng phân cách, timing pattern, alignment pattern, thông tin định dạng chứa mặt nạ và mức sửa lỗi, cùng quiet zone bao quanh.

Phần thú vị là cách giải thích tám mẫu mặt nạ (mask pattern) bằng một câu chuyện dễ nhớ về hành trình trong tù, kèm cheat sheet dạng zine có thể in ra. Sau khi áp mặt nạ bằng phép XOR, trang tiếp tục hướng dẫn xác định chế độ mã hóa (số, chữ và số, byte, Kanji…), độ dài và cách đọc từng khối dữ liệu. Đây là một cách học trực quan để hiểu cấu trúc kỹ thuật của mã QR.

---

*Bài viết đã được viết lại bởi Claude Code với Opus 5.5 vào ngày 27/09/2026.*
