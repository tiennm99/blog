---
title: "Newsletter #47"
date: 2025-08-06
tags: [ "AI-Assisted", "LLM", "Git", "Code Review", "CLI" ]
categories: [ "Newsletter" ]
---

*Mời bạn thưởng thức Newsletter #47.*

## [Coding with LLMs in the summer of 2025 (an update)](https://antirez.com/news/154)

Antirez - tác giả của Redis - chia sẻ những trải nghiệm và chiến lược mới nhất khi sử dụng các mô hình ngôn ngữ lớn (LLM) để hỗ trợ lập trình trong năm 2025. Bài viết mang lại góc nhìn thực tế từ một lập trình viên giàu kinh nghiệm về cách tận dụng AI một cách hiệu quả.

Điểm quan trọng nhất mà tác giả nhấn mạnh là LLM hoạt động tốt như "bộ khuếch đại" (amplifier) chứ không phải là "ban nhạc một người" (one-man-band). Điều này có nghĩa là con người cần duy trì vai trò tích cực trong quá trình lập trình, sử dụng AI để tăng tốc và cải thiện chất lượng công việc thay vì giao phó hoàn toàn cho máy.

Về lựa chọn công cụ, antirez khuyến nghị sử dụng Gemini 2.5 PRO (ưu tiên hàng đầu nhờ khả năng hiểu ngữ nghĩa mạnh) và Claude Opus 4, đồng thời tránh các coding agents hoặc trình soạn thảo tích hợp AI. Anh cũng đề xuất chiến lược sử dụng nhiều LLM khác nhau cho các vấn đề phức tạp và chuyển mã thủ công giữa môi trường phát triển và LLM để duy trì quyền kiểm soát.

Kỹ thuật tương tác hiệu quả bao gồm: cung cấp ngữ cảnh chi tiết về dự án, truyền đạt rõ ràng mục tiêu và hướng giải quyết tiềm năng. Lợi ích mà AI mang lại không chỉ là loại bỏ lỗi nhanh hơn mà còn hỗ trợ tạo prototype nhanh chóng và khám phá các giải pháp nằm ngoài chuyên môn cá nhân. Đây là những lời khuyên quý giá cho các lập trình viên muốn tận dụng AI một cách thông minh và bền vững.

## [Artisanal Handcrafted Git Repositories](https://drew.silcock.dev/blog/artisanal-git/)

Drew Silcock mang đến một bài viết cực kỳ thú vị về cách tự tay tạo ra kho lưu trữ Git mà không cần sử dụng các lệnh Git truyền thống. Đây không chỉ là một bài tập học thuật mà còn là cách hiểu sâu về cơ chế hoạt động bên trong của hệ thống kiểm soát phiên bản phổ biến nhất hiện nay.

Cốt lõi của Git là hệ thống Content Addressable Storage (CAS), nơi các đối tượng được lưu trữ dựa trên mã băm SHA-1 của chúng. Git lưu trữ toàn bộ phiên bản tệp tin chứ không phải chỉ các thay đổi, thông qua ba loại đối tượng chính: blob (nội dung tệp thô), tree (metadata tệp và tham chiếu đến blob), và commit (thông tin về trạng thái kho lưu trữ).

Tác giả hướng dẫn chi tiết cách tạo thủ công cấu trúc thư mục `.git`, xây dựng các đối tượng theo chương trình, tạo tham chiếu thủ công và sử dụng nén zlib để tối ưu lưu trữ. Bài viết cũng đi sâu vào các khái niệm nâng cao như kỹ thuật nén packfile, cơ chế thu gom rác, và tối ưu hóa lưu trữ đối tượng.

Điểm quan trọng nhất mà tác giả nhấn mạnh là "Sức mạnh của Git không đến từ sự phức tạp, mà từ tính đơn giản và thanh lịch trong thiết kế." Việc hiểu rõ kiến trúc bên trong này giúp các lập trình viên sử dụng Git hiệu quả hơn và giải quyết các vấn đề phức tạp một cách tự tin.

## [Why I'm Betting Against AI Agents in 2025 (Despite Building Them)](https://utkarshkanwat.com/writing/betting-against-agents/)

Utkarsh Kanwat, một lập trình viên đang xây dựng các tác nhân AI, đưa ra góc nhìn khá táo bạo khi "đặt cược chống lại" xu hướng AI agents trong năm 2025. Bài viết này không phải là lời phê phán mù quáng mà là phân tích thực tế về những thách thức cốt lõi mà AI agents đang đối mặt.

Vấn đề lớn nhất là độ tin cậy giảm theo cấp số nhân: nếu mỗi bước có độ chính xác 95%, thì sau 20 bước, tỷ lệ thành công chỉ còn 36%. Trong khi đó, môi trường sản xuất yêu cầu độ tin cậy trên 99.9%. Thách thức kinh tế cũng không kém phần nghiêm trọng: chi phí token tăng theo cấp số nhân với độ dài cuộc hội thoại, một cuộc trò chuyện 100 lượt có thể tiêu tốn 50-100 USD chỉ riêng token.

Tác giả cũng chỉ ra rằng "bí mật bẩn thỉu" của các hệ thống tác nhân AI trong sản xuất là AI chỉ thực hiện khoảng 30% công việc, phần còn lại thuộc về kỹ thuật hệ thống truyền thống. Các hệ thống doanh nghiệp phức tạp và không dự đoán được, đòi hỏi nhiều kỹ năng kỹ thuật hơn là khả năng AI.

Thay vì "tự động hóa mọi thứ", tác giả dự đoán tương lai sẽ thuộc về "trợ lý cực kỳ có khả năng với ranh giới rõ ràng". Các startup tập trung vào "tác nhân hoàn toàn tự động" sẽ gặp khó khăn, trong khi những công cụ có phạm vi hạn chế và giám sát con người rõ ràng sẽ thành công hơn. Đây là lời nhắc nhở quan trọng về việc cân bằng giữa tham vọng công nghệ và thực tế triển khai.

## [Rethinking CLI interfaces for AI](https://www.notcheckmark.com/2025/07/rethinking-cli-interfaces-for-ai/)

Một góc nhìn thú vị về việc tái thiết kế giao diện dòng lệnh (CLI) để phù hợp hơn với kỷ nguyên AI. Tác giả chỉ ra rằng các công cụ dòng lệnh hiện tại tạo ra nhiều thách thức cho các tác nhân AI, đặc biệt là vấn đề giới hạn cửa sổ ngữ cảnh và khả năng hiểu đầu ra của các lệnh.

Vấn đề cốt lõi là các LLM gặp khó khăn trong việc điều hướng, hiểu đầu ra và sử dụng hiệu quả các công cụ dòng lệnh truyền thống. Các công cụ này được thiết kế cho con người, không phải cho máy móc, dẫn đến việc AI thường "lúng túng" khi sử dụng chúng.

Tác giả đề xuất các nguyên tắc thiết kế mới: cung cấp hướng dẫn API rõ ràng thông qua docstring, thêm thông tin ngữ cảnh vào đầu ra lệnh, và tạo các công cụ wrapper giúp tác nhân AI hiểu được tổng kích thước đầu ra, ngữ cảnh thư mục hiện tại, và các lựa chọn lệnh thay thế.

Những gợi ý cụ thể bao gồm phát triển các công cụ CLI với "Kiến trúc Thông tin" tập trung vào khả năng sử dụng cho AI, tạo shell hooks cung cấp ngữ cảnh bổ sung khi lệnh thất bại, và thiết kế API với các lời gọi hàm phân cấp (ưu tiên các phương pháp được khuyến nghị trước).

Tác giả kết luận: "Chúng ta cần nâng cấp các công cụ dòng lệnh và thiết kế API để chúng có thể được các tác nhân LLM sử dụng tốt hơn." Đây là lời kêu gọi quan trọng để tái tư duy về thiết kế giao diện trong kỷ nguyên AI.

## [Asynchrony is not Concurrency](https://kristoff.it/blog/asynchrony-is-not-concurrency/)

Kristoff đưa ra một phân tích sâu sắc về sự khác biệt giữa hai khái niệm thường bị nhầm lẫn trong lập trình: asynchrony (bất đồng bộ) và concurrency (đồng thời). Đây là một chủ đề quan trọng mà nhiều lập trình viên, kể cả những người có kinh nghiệm, vẫn thường hiểu nhầm.

Tác giả định nghĩa rõ ràng: Asynchrony là khả năng các tác vụ có thể chạy không theo thứ tự và vẫn cho kết quả đúng, trong khi Concurrency là khả năng hệ thống tiến triển nhiều tác vụ cùng một lúc. Parallelism thì là việc thực thi vật lý nhiều tác vụ đồng thời. Điểm mấu chốt là asynchrony không nhất thiết cần đến concurrent execution.

Vấn đề lớn trong nhiều ngôn ngữ lập trình hiện tại là việc gộp chung asynchrony và concurrency, dẫn đến những hậu quả như nhân đôi thư viện, yêu cầu async code lan tỏa khắp nơi ("viral async"), và các mẫu lập trình không tối ưu. Ví dụ điển hình là việc lưu file - đây là một tác vụ bất đồng bộ nhưng không cần thiết phải chạy đồng thời.

Zig mang đến cách tiếp cận thú vị bằng cách tách biệt asynchrony khỏi concurrency, cho phép code đồng bộ và bất đồng bộ cùng tồn tại. Ngôn ngữ này giới thiệu `asyncConcurrent` để yêu cầu rõ ràng việc thực thi đồng thời khi thực sự cần thiết, đồng thời cho phép chạy các tác vụ async trong môi trường đơn luồng.

Đây là lời nhắc nhở quan trọng về việc hiểu rõ bản chất của các khái niệm lập trình thay vì chấp nhận mù quáng các mẫu thiết kế phổ biến.

## [How Does AI Disrupt Accountability in Code Reviews?](https://rdel.substack.com/p/rdel-102-how-does-ai-disrupt-accountability)

Một nghiên cứu thú vị từ RDEL về cách AI tác động đến trách nhiệm giải trình trong quá trình review code. Đây là chủ đề ít được thảo luận nhưng rất quan trọng trong việc duy trì chất lượng phần mềm và văn hóa làm việc nhóm.

Nghiên cứu xác định bốn động lực cốt lõi thúc đẩy trách nhiệm cá nhân trong review code: tiêu chuẩn cá nhân, tính chính trực nghề nghiệp, niềm tự hào về chất lượng mã, và danh tiếng chuyên môn. Tất cả những động lực này đều dựa trên tương tác xã hội và sự đánh giá của đồng nghiệp.

Vấn đề xuất hiện khi AI thay thế reviewer con người: các cơ chế trách nhiệm giải trình quan trọng bị phá vỡ. Không còn tương tác xã hội qua lại, không có sự phán xét từ đồng nghiệp, và cảm giác chủ sở hữu tập thể cũng giảm sút. Một người tham gia nghiên cứu đã nói rất tóm tắt: "Bạn không thể buộc mô hình AI phải chịu trách nhiệm."

Thú vị là các kỹ sư vẫn coi AI như một "trợ lý lượt đầu" hữu ích để phát hiện các vấn đề cơ bản, nhưng không coi nó có thẩm quyền đưa ra phản hồi có ý nghĩa. Điều này cho thấy con người vẫn hiểu rõ giới hạn của công nghệ hiện tại.

Để duy trì trách nhiệm giải trình trong workflow có AI hỗ trợ, các nhà lãnh đạo được khuyên nên sử dụng AI như một lớp hỗ trợ, duy trì các điểm kiểm tra của con người, và củng cố động lực nội tại thông qua các chuẩn mực xã hội. Đây là bài học quan trọng về việc cân bằng giữa tự động hóa và duy trì yếu tố con người trong quy trình phát triển phần mềm.

## [Vibecoding a High Performance System](https://andrewkchan.dev/posts/systems.html)

Andrew Chan chia sẻ trải nghiệm thú vị về việc sử dụng AI để khám phá và tối ưu hóa thiết kế hệ thống hiệu suất cao. Từ "vibecoding" được tác giả sử dụng để mô tả cách tiếp cận linh hoạt, sử dụng AI để nhanh chóng thử nghiệm nhiều kiến trúc khác nhau.

Điểm nổi bật nhất là tốc độ khám phá không gian thiết kế: từ 20 trang/giây lên 10,800 trang/giây qua 8 phiên bản kiến trúc chính. Điều này cho thấy AI có thể giúp kỹ sư nhanh chóng prototype và đánh giá các phương pháp khác nhau dựa trên các chỉ số hiệu suất khách quan.

Tác giả nhận ra rằng thiết kế hệ thống hiện đại ngày càng bị giới hạn bởi thực nghiệm hơn là coding, phụ thuộc vào việc hiểu biết về sự chồng chéo giữa giao tiếp và tính toán, đòi hỏi đánh giá cẩn thận các trade-off giữa các công nghệ. Lỗi có thể có hậu quả nghiêm trọng ở quy mô lớn (như việc web crawling không lịch sự), do đó việc review thủ công và kiểm tra điểm vẫn rất quan trọng.

AI đóng vai trò như công cụ khám phá thiết kế: nhanh chóng tạo prototype các phương pháp kiến trúc khác nhau, cung cấp chuyên môn trong các lĩnh vực công nghệ xa lạ, tạo ra các công cụ đo hiệu suất, và đưa ra góc nhìn thiết kế thay thế. Tuy nhiên, tác giả nhấn mạnh rằng mặc dù AI tăng tốc thiết kế, các kỹ năng kỹ thuật cơ bản vẫn quan trọng: hiểu biết về ràng buộc hệ thống, duy trì độ sâu kỹ thuật và review nghiêm túc các giải pháp được tạo ra.

Tác giả kết luận một cách táo bạo: "Những đội nào hiểu được điều này sẽ áp đảo những đội không hiểu." Đây là lời nhắc nhở về tầm quan trọng của việc nắm vững cách sử dụng AI trong thiết kế hệ thống hiệu suất cao.

## [Two Simple Rules to Fix Code Reviews](https://serce.me/posts/2025-07-17-two-simple-rules-to-fix-code-reviews)

Serce đưa ra hai quy tắc đơn giản nhưng hiệu quả để cải thiện quy trình review code - một vấn đề mà nhiều đội phát triển phần mềm gặp phải khi review trở thành nút thắt cổ chai thay vì công cụ hợp tác hữu ích.

**Quy tắc 1: Giảm thiểu thời gian phản hồi** - Phản hồi nhanh chóng với các review code, ngay cả khi chưa thể approve ngay lập tức. Tác giả nhấn mạnh rằng sự chậm trễ tạo ra mất mát ngữ cảnh đáng kể cho người viết code. "Một giờ trong review, và bạn mất rất ít ngữ cảnh" - điều này cho thấy tầm quan trọng của việc ưu tiên review để duy trì động lực phát triển.

**Quy tắc 2: Bao gồm mệnh đề "vì" rõ ràng** - Mỗi bình luận review phải giải thích lý do đằng sau gợi ý. Thay vì nói "làm ơn làm X", hãy nói "làm ơn làm X vì Y". Nếu bạn không thể diễn đạt được "vì" rõ ràng, có thể bình luận đó không cần thiết.

Lời khuyên thực tế bao gồm: ưu tiên review kịp thời để duy trì động lực phát triển, hiểu rằng các kỹ sư senior định hình văn hóa review code, nhận ra rằng phản hồi nhanh không có nghĩa là chấp thuận mù quáng, và tập trung vào việc thêm giá trị thông qua phản hồi rõ ràng, có lý.

Tác giả nhấn mạnh rằng các quy tắc này phù hợp nhất với các đội có mục tiêu chung, và mục đích cuối cùng là biến review code thành công cụ cộng tác giúp tăng tốc thay vì cản trở quy trình phát triển. Đây là những nguyên tắc đơn giản nhưng có thể tạo ra sự khác biệt lớn trong hiệu quả làm việc của đội.

## [Reading QR codes without a computer!](https://qr.blinry.org/)

Trang qr.blinry.org là một nguồn tài liệu giáo dục tuyệt vời giải thích cách thức hoạt động của mã QR một cách dễ hiểu. Website hướng dẫn cách đọc và giải mã QR code bằng tay mà không cần máy tính hay điện thoại, giúp người dùng hiểu sâu về cấu trúc bên trong của mã QR.

Trang web trình bày các thành phần cơ bản của QR code như finder pattern (mẫu tìm kiếm), separator (đường phân cách), alignment pattern (mẫu căn chỉnh), và quiet zone (vùng trống). Ngoài ra, nó còn giải thích chi tiết về mask pattern (mẫu mặt nạ), encoding (mã hóa), và các phương pháp sửa lỗi. Đây là tài liệu hữu ích cho những ai muốn tìm hiểu về công nghệ QR code từ góc độ kỹ thuật.

---

*Bài viết đã được review và cập nhật bởi Claude Code với Opus 4.7 (1M context).*
