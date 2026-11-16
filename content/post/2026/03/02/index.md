---
title: "Newsletter #87"
date: 2026-03-02
tags: ["AI-Assisted", "Newsletter", "AI", "Engineering Culture", "Rate Limiting", "AI Agents", "Software Engineering"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #87.*

## [On cognitive debt](https://www.natemeyvis.com/on-cognitive-debt/)

Gần đây nhiều người bàn về "nợ nhận thức" (cognitive debt): tình trạng mã nguồn do AI sinh ra phình to đến mức không còn ai hiểu nó hoạt động thế nào, khiến việc mở rộng, quan sát và gỡ lỗi trở nên khó khăn. Nate Meyvis thừa nhận hiện tượng này có thật, nhưng cho rằng nỗi lo đang bị thổi phồng. Nếu so trên cùng quy mô dự án, nợ nhận thức trong mã nguồn trước thời AI thường còn tệ hơn; chỉ là AI giúp ta đi nhanh gấp nhiều lần nên chạm tới mức phức tạp đó sớm hơn. Điều này bị che khuất vì nhiều việc được xem là "kỹ thuật bình thường", như vài kỹ sư kỳ cựu nắm hết các ràng buộc ngầm, thực chất là đang trả giá cho nợ nhận thức. Khi một thay đổi cục bộ phá hỏng một phần xa xôi của hệ thống mà kiểm thử không phát hiện, đó thường là dấu hiệu việc đóng gói (encapsulation) đã thất bại từ trước.

Theo tác giả, người dùng AI giỏi đã biết hạn chế nợ nhận thức và sẽ còn làm tốt hơn. Ông chia sẻ vài kỹ thuật: nhấn mạnh tính đóng gói trong chỉ dẫn khởi tạo dự án cho AI, mô tả rõ các hệ thống con, giao diện giữa chúng và cấu trúc dữ liệu, mạnh dạn tái cấu trúc quy mô lớn với AI (giờ nhẹ nhàng hơn nhiều), và bổ sung kiểm thử ở nơi nợ nhận thức bắt đầu xuất hiện. Thông điệp chính: nợ nhận thức có thật, nhưng ta khắc phục nó bằng cách dùng AI tốt hơn chứ không phải đổ lỗi cho AI về sai lầm của chính mình.

## [Why I'm not worried about AI job loss](https://davidoks.blog/p/why-im-not-worried-about-ai-job-loss)

David Oks phản hồi bài luận lan truyền "Something Big Is Happening" của Matt Shumer, vốn so sánh hiện tại với tháng 2/2020 ngay trước khi COVID bùng phát và cảnh báo làn sóng mất việc hàng loạt. Oks tin AI sẽ quan trọng ngang điện hay động cơ hơi nước, nhưng tác động thực tế sẽ chậm và không đồng đều hơn nhiều. Thứ nhất, thay thế lao động dựa trên lợi thế so sánh chứ không phải lợi thế tuyệt đối: kể cả khi AI giỏi hơn con người ở mọi tác vụ, kết hợp người với AI vẫn đáng giá nếu tổng sản lượng cao hơn, và điều đó đang đúng ngay trong kỹ thuật phần mềm. Thứ hai, thế giới đầy "nút thắt cổ chai" do con người tạo ra: luật pháp, văn hóa doanh nghiệp, chính trị, thói quen, và trên hết là sự kháng cự thay đổi. Đó là lý do dù mô hình đã mạnh từ lâu, ngay cả ngành chăm sóc khách hàng thuê ngoài cũng chưa bị thay thế hàng loạt.

Thứ ba, nhu cầu với nhiều sản phẩm co giãn hơn ta tưởng, nên hiệu quả tăng lên thường bị hấp thụ bởi nhu cầu tăng theo, đúng như nghịch lý Jevons; mỗi bước tiến giúp lập trình hiệu quả hơn trước đây đều làm tăng nhu cầu tuyển kỹ sư. Về lâu dài, con người vẫn sẽ tạo ra những công việc mới nằm giữa lao động và giải trí. Tác giả kết luận người bình thường sẽ ổn; mối nguy thật sự là làn sóng phản đối dân túy do gieo rắc hoảng loạn, có thể dẫn tới cấm xây trung tâm dữ liệu và bóp nghẹt lợi ích mà AI mang lại.

## [Why I don't think AI is a bubble](https://honnibal.dev/blog/ai-bubble)

Matthew Honnibal, tác giả thư viện xử lý ngôn ngữ tự nhiên spaCy, gác lại phần tài chính của cuộc tranh luận "bong bóng AI" để trả lời câu hỏi kỹ thuật: hiệu năng AI có sắp chững lại không? Lập luận phổ biến cho rằng tiến bộ đến từ việc đổ tiền mở rộng quy mô, lợi ích giảm dần và sẽ sớm chạm trần. Ông thừa nhận từng nghĩ vậy thời GPT-1, GPT-2, nhưng đã đánh giá thấp học tăng cường (reinforcement learning). Các mô hình suy luận như Claude Opus hay GPT-5 kết hợp AI tạo sinh huấn luyện trước trên lượng lớn dữ liệu với học tăng cường kiểu AlphaZero: mô hình tự đặt ra các bước trung gian, và chuỗi bước nào dẫn tới đáp án đúng sẽ được củng cố. "Logic là công việc": ngay trong hệ thống ký hiệu thuần túy, suy diễn cũng tốn tính toán, nên sinh bước trung gian là cần thiết chứ không phải mánh khóe.

Lập luận chạm trần chỉ áp dụng cho phần mô hình dự đoán văn bản. Phần suy luận mở ra hai đòn bẩy mới: cho mô hình chạy lâu hơn để suy luận nhiều hơn, và tăng thêm học tăng cường; kết hợp khả năng quay lui khi gặp ngõ cụt, mô hình có thể khám phá không gian lời giải như tìm nước đi trong cờ vua. Học tăng cường cũng không vướng giới hạn dữ liệu rõ ràng, vì nhận ra một chuỗi suy luận thành công dễ hơn nhiều so với tạo ra nó. Ông không tin tưởng OpenAI, nhưng cho rằng chưa có lý do nào để nghĩ tiến bộ sẽ dừng, và các trung tâm dữ liệu sẽ được dùng hiệu quả.

## [I guess I kinda get why people hate AI](https://anthony.noided.media/blog/ai/programming/2026/02/14/i-guess-i-kinda-get-why-people-hate-ai.html)

Viết từ ban công khách sạn ở Hawaii, chín ngày trước khi nhận việc mới, tác giả tự hỏi liệu đây có phải công việc cuối cùng. Trước đây câu hỏi đó nghĩa là có còn *cần* đi làm nữa không; giờ nó nghĩa là liệu AI có khiến anh không tìm được việc nữa. Anh không ghét AI nhưng hiểu vì sao nhiều người ghét. Lý do rõ nhất: chính lãnh đạo ngành AI quảng bá sản phẩm bằng cách tuyên bố nó sẽ xóa sổ việc làm, điều chưa từng thấy với công nghệ nào. Nếu họ thật lòng tin vậy, anh đề xuất họ vận động ngay các đạo luật có điều kiện kích hoạt, chẳng hạn tự động tăng thuế để tài trợ đào tạo lại hay thu nhập cơ bản khi thất nghiệp tăng trong lúc GDP vẫn tăng. Việc không ai đề xuất cho thấy họ hoặc không tự tin như lời nói, hoặc không quan tâm hậu quả.

Bên cạnh đó, trải nghiệm hằng ngày của người bình thường với AI khá tiêu cực: sinh viên dán bài tập vào ChatGPT, video giả mạo về Elon Musk lừa được cả bố anh, video rác trên TikTok, cURL phải dừng chương trình săn lỗi vì quá nhiều báo cáo lỗi bịa đặt, giá RAM tăng vọt. AI đôi khi giúp làm việc chất lượng cao, nhưng *luôn* giúp tạo nội dung rác gần như miễn phí. Anh đề xuất: gắn watermark cho nội dung AI tạo ra, YouTube mạnh tay hơn với thông tin sai lệch do AI tạo, và cho phép dự án mã nguồn mở lớn yêu cầu không bị AI dò lỗ hổng. Điều anh lo nhất là các phòng thí nghiệm AI dường như chẳng buồn thử.

## [Uber's Rate Limiting System](https://www.uber.com/en-IN/blog/ubers-rate-limiting-system/)

Uber xử lý hàng trăm triệu lời gọi RPC mỗi giây qua hàng nghìn dịch vụ. Trước đây mỗi đội tự làm giới hạn tốc độ (rate limiting) theo cách riêng, thường dựa trên bộ đếm Redis, gây cấu hình không nhất quán, thêm độ trễ và khó vận hành. Bộ đếm tập trung không thể mở rộng tới hàng trăm nghìn máy trên nhiều vùng, nên Uber xây GRL (Global Rate Limiter) tích hợp thẳng vào service mesh, cho phép cấu hình giới hạn theo bên gọi hoặc thủ tục mà không sửa mã nguồn. GRL có ba tầng: client trong mesh quyết định cục bộ cho từng yêu cầu, bộ tổng hợp cấp zone gom số liệu, và bộ điều khiển cấp vùng tính mức sử dụng toàn cục rồi đẩy chỉ thị xuống. Thuật toán token bucket ban đầu chia không công bằng giữa các bên gọi, nên nhóm chuyển hẳn sang loại bỏ theo xác suất: khi tải tổng vượt giới hạn, mọi client bỏ một tỉ lệ yêu cầu bằng (thực tế − giới hạn) / thực tế, cập nhật mỗi giây. Đánh đổi là phản ứng trễ 2–3 giây.

Bỏ Redis giúp độ trễ trung vị giảm khoảng 1ms, P90 giảm hàng chục ms, P99.5 cải thiện tới 90%; hệ thống chịu được đợt tăng tải gấp 15 lần và chặn được DDoS. GRL hiện xử lý khoảng 80 triệu yêu cầu mỗi giây trên hơn 1.100 dịch vụ. Để cấu hình không lỗi thời, Uber xây thêm RLC (Rate Limit Configurator): định kỳ phân tích lưu lượng vài tuần gần nhất, tính giới hạn an toàn từ đỉnh lịch sử cộng biên dự phòng rồi tự đẩy cấu hình mới, kèm chế độ chạy thử trước khi áp dụng thật.

## [Agents (Feb 2026)](https://calv.info/agents-feb-2026)

Calvin French-Owen, người từng tham gia ra mắt Codex bản web, chia sẻ cách anh dùng coding agent vào tháng 2/2026. Giờ đây thời gian của anh là yếu tố quyết định: anh chọn công cụ theo thời gian mình có và mức tự chủ muốn giao cho agent. Nguyên tắc cốt lõi là hiểu ngữ cảnh: agent chỉ dự đoán token tiếp theo và mọi thứ phải nằm gọn trong cửa sổ ngữ cảnh. Từ đó, công việc cần chia nhỏ, nén ngữ cảnh luôn làm mất thông tin, nên ghi ngữ cảnh ra hệ thống tệp (như tài liệu kế hoạch có các bước đánh dấu), và nên ở trong "nửa thông minh" của cửa sổ ngữ cảnh. Opus trong Claude Code làm việc qua nhiều cửa sổ ngữ cảnh rất hiệu quả, hay chạy song song nhiều sub-agent, dùng công cụ tốt và giải thích dễ hiểu. Codex (GPT-5.3) viết mã nguồn ít lỗi hơn hẳn nhưng chậm vì chưa biết phân việc qua nhiều cửa sổ ngữ cảnh. Vì vậy anh lên kế hoạch với Claude Code rồi dùng Codex viết mã.

Quy trình của anh gồm thư mục `plans/` chứa kế hoạch đánh số, worktree chạy song song, bản triển khai xem trước cho mỗi nhánh, vòng lặp lập kế hoạch – triển khai – review, và công cụ review tự động để bắt lỗi. Skill giúp nối chuỗi, tự động hóa quy trình mà tốn rất ít token; anh chỉ tạo skill khi một việc đã lặp lại vài lần, dần xây nên `/commit`, `/worktree`, `/implement`, `/address-bugs` và `/pr-pass`. Rào cản để agent chạy liên tục là quản lý ngữ cảnh và chống prompt injection; ngày càng nhiều, ý tưởng, kiến trúc, thứ tự triển khai dự án mới là yếu tố giới hạn.

## [The Software Industrial Revolution](https://cannoneyed.com/essays/software-industrial-revolution)

Theo tác giả, cuối năm 2025 coding agent AI thực sự "vào guồng", mở ra "Cách mạng Công nghiệp Phần mềm". Giống Spinning Jenny năm 1764 biến việc kéo sợi thủ công "đơn luồng" thành song song và khiến giá vải bông giảm hơn 90% trong nửa thế kỷ, AI đang tự động hóa việc sản xuất phần mềm, vốn là nghề thủ công cực kỳ tốn công. Phần mềm đã "nuốt chửng" thế giới: khối công nghệ chiếm khoảng 35% S&P 500, gần 50% nếu tính cả nhóm truyền thông. Nhưng vì làm phần mềm quá đắt, các mô hình kinh doanh bị đẩy về lối tăng trưởng bằng mọi giá của quỹ đầu tư mạo hiểm để chiếm thị trường rồi khai thác độc quyền, dẫn tới "enshittification" mà Cory Doctorow mô tả. Ví dụ điển hình là Epic, nắm 42% thị trường bệnh viện điều trị cấp tính ở Mỹ với biên lợi nhuận trên 30%, nơi chi phí xây phần mềm phức tạp cao đến mức bóp nghẹt cạnh tranh.

Khi phần mềm rẻ đi nhiều bậc, sẽ có nhiều phần mềm hơn hẳn, nhu cầu kỹ sư có thể còn tăng, kỷ nguyên đầu tư mạo hiểm kiểu cũ khép lại và mô hình kinh doanh bền vững hơn xuất hiện. Bất kỳ ai, từ nhà nghiên cứu ung thư đến chủ doanh nghiệp nhỏ, cũng có thể nhờ AI xây công cụ mình cần, tạo nên sự bùng nổ phần mềm "may đo" trong mọi ngành. Dù việc tự tay viết mã đang mất dần giá trị, kỹ năng cốt lõi của kỹ sư như mô hình hóa nghiệp vụ, quản lý độ phức tạp và hiểu tương tác giữa phần mềm với thế giới thực sẽ càng quan trọng hơn.

---

*Bài viết đã được viết lại bởi Claude Code với Opus 5.5 vào ngày 27/09/2026.*
