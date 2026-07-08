---
title: "Newsletter #7"
date: 2025-03-16
tags: ["AI-Assisted", "Newsletter", "LLMs", "AI Coding", "Cursor", "Security", "Engineering Culture"]
categories: [ "Newsletter" ]
---

*Mời bạn thưởng thức Newsletter \#7.*

## [The LLM Curve of Impact on Software Engineers](https://serce.me/posts/2025-02-07-the-llm-curve-of-impact-on-software-engineers)

Bài viết phân tích tác động của các mô hình ngôn ngữ lớn (LLM) đối với kỹ sư phần mềm ở các cấp độ khác nhau:

Với kỹ sư Junior, LLM như một cứu cánh khi gặp lỗi hoặc cần viết các tính năng nhỏ. Tuy nhiên, việc phụ thuộc quá nhiều vào LLM mà không thực sự hiểu code có thể cản trở sự phát triển kỹ năng.

Đối với kỹ sư Mid-level, LLM giúp tăng tốc độ code và học framework mới. Tuy nhiên, họ bắt đầu nhận ra những hạn chế của LLM trong việc hiểu yêu cầu khách hàng hay xử lý các vấn đề phức tạp như race condition.

Kỹ sư Senior thường tỏ ra hoài nghi về LLM nhất. Với hiểu biết sâu rộng về codebase, họ nhận thấy LLM không thực sự hữu ích trong các công việc đòi hỏi nhiều context như lập roadmap, debug các lỗi phức tạp hay viết tài liệu thiết kế.

Đặc biệt, với kỹ sư Staff+, LLM lại trở nên hữu ích trong việc tạo các proof-of-concept nhanh chóng. Nhờ kiến thức domain sâu rộng, họ có thể nhanh chóng giúp LLM vượt qua các điểm bế tắc để tạo ra các giải pháp demo hoạt động được.

Tóm lại, tác động của LLM không đồng đều across các level, và hiệu quả của nó phụ thuộc vào việc sử dụng phù hợp với từng cấp độ kinh nghiệm.

## [You are using Cursor AI incorrectly...](https://ghuntley.com/stdlib/)

Bài viết "You are using Cursor AI incorrectly..." của Geoffrey Huntley trình bày cách tiếp cận mới và hiệu quả hơn khi sử dụng Cursor AI. Thay vì chỉ yêu cầu Cursor viết đoạn code cụ thể, tác giả đề xuất xây dựng một "stdlib" (thư viện chuẩn) gồm hàng nghìn quy tắc (rules) và kết hợp chúng lại như các pipe trong Unix.

Tác giả nhấn mạnh tầm quan trọng của việc tổ chức các quy tắc này trong thư mục .cursor/rules/ và tuân theo quy ước đặt tên nhất quán. Mỗi quy tắc được định nghĩa trong các file .mdc với cấu trúc rõ ràng, bao gồm các bộ lọc (filters) và hành động (actions).

Một điểm đáng chú ý là khả năng "điều chỉnh" phản hồi của Cursor thông qua các quy tắc. Ví dụ, khi Cursor liên tục đề xuất giải pháp Bazel trong khi tác giả chỉ muốn sử dụng Nix, ông đã tạo quy tắc "no_bazel" để ngăn chặn mọi đề xuất liên quan đến Bazel.

Bài viết cũng giới thiệu cách tự động hóa quy trình phát triển bằng cách kết hợp các quy tắc, như tự động thêm header bản quyền vào file mới hoặc tự động commit sau khi hoàn thành yêu cầu. Tác giả ước tính độ chính xác của các mô hình LLM hiện tại khoảng 45% và cần được điều hướng thường xuyên.

Tóm lại, bài viết khuyến khích một phương pháp tiếp cận có hệ thống hơn khi sử dụng Cursor AI, tập trung vào việc xây dựng và cải tiến liên tục các quy tắc để tăng hiệu quả và độ chính xác trong quá trình phát triển phần mềm.

## [How Do You Spend Your Time?](https://brooker.co.za/blog/2024/02/06/time.html)

Bài viết của Marc Brooker thảo luận về tầm quan trọng của việc quản lý thời gian một cách có ý thức, đặc biệt là trong môi trường công nghệ. Tác giả chỉ ra một "failure mode" phổ biến: khi các kỹ sư dành quá nhiều thời gian cho các cuộc họp không hiệu quả mà không ai nhận ra vấn đề vì mọi người đều cho rằng người khác đang làm điều đó vì lý do chính đáng.

Brooker chia sẻ cách ông phân loại thời gian của mình thành các nhóm: công việc cá nhân (viết code, review, debug...), mentoring và giảng dạy, công việc chiến lược (kế hoạch dài hạn), công việc thường nhật (business reviews, sprint planning...), học tập (đọc papers, sách...), và tương tác với khách hàng.

Tác giả nhấn mạnh rằng việc phân loại không quan trọng bằng việc thực hiện bài tập này một cách có ý thức và suy nghĩ kỹ về cách bạn sử dụng thời gian. Ông cũng khuyến khích áp dụng mô hình tư duy này cho cả tổ chức, đặc biệt là thảo luận về việc phân bổ thời gian cho công việc cá nhân của các kỹ sư ở mỗi cấp độ.

Cuối cùng, Brooker đề cập đến khái niệm "revealed preference" (sở thích bộc lộ) trong kinh tế học - lý thuyết cho rằng việc quan sát hành vi tiêu dùng thực tế có thể tiết lộ hàm hữu ích thực sự của người tiêu dùng, khác với những gì họ nói hoặc nghĩ. Ông áp dụng điều này vào cách chúng ta sử dụng thời gian: bạn có thể nói bạn yêu salad, nhưng luôn kết thúc bằng việc gọi burger.

## [We are destroying software](https://antirez.com/news/145)

Trong bài viết ngắn gọn nhưng sâu sắc này, Salvatore Sanfilippo (antirez) - người sáng tạo Redis - bày tỏ những lo ngại về cách chúng ta đang "phá hủy" phần mềm trong thời đại hiện nay. Ông liệt kê một loạt vấn đề đang làm suy yếu ngành công nghiệp phần mềm:

Chúng ta không còn quan tâm đến độ phức tạp khi thêm tính năng mới; sử dụng hệ thống build phức tạp; tạo ra chuỗi phụ thuộc vô lý khiến mọi thứ trở nên cồng kềnh và mong manh; khuyên các lập trình viên mới "đừng phát minh lại bánh xe" trong khi đó lại là cách họ học hỏi; không còn quan tâm đến tính tương thích ngược của API.

Ông cũng chỉ trích xu hướng viết lại những thứ đang hoạt động tốt; nhảy vào mọi ngôn ngữ, mô hình và framework mới; đánh giá thấp độ khó khi làm việc với thư viện phức tạp; luôn nghĩ tiêu chuẩn thực tế tốt hơn giải pháp tùy chỉnh; cho rằng comment trong code là vô dụng; nhầm lẫn phần mềm với một ngành kỹ thuật thuần túy.

Cuối cùng, antirez lo ngại rằng chúng ta đang tạo ra những hệ thống không còn khả năng "scale down" (những việc đơn giản nên được thực hiện đơn giản), tập trung vào tốc độ sản xuất code thay vì thiết kế tốt, và kết quả là chúng ta đang đánh mất niềm vui của việc "hacking".

## [Nontraditional Red Teams](https://zachholman.com/posts/red-teams)

Zach Holman, cựu nhân viên GitHub, giới thiệu khái niệm "red teams" phi truyền thống - những nhóm người đóng vai trò đối kháng để kiểm tra lỗ hổng trong hệ thống. Ngoài góc độ bảo mật thông thường, Holman đề xuất ba loại "red team" mà mọi đội phát triển nên có:

Đầu tiên là "Someone to look for dicks" - người kiểm tra các thiết kế để đảm bảo không vô tình tạo ra hình ảnh gợi dục hoặc không phù hợp. Holman kể về việc GitHub suýt đặt một biển quảng cáo trông giống hình ảnh khiêu dâm nổi tiếng, và từ đó công ty đã thêm bước "dick check" vào quy trình thiết kế. Điều này giúp tránh tình huống người dùng bỏ qua sản phẩm vì logo hoặc hình ảnh trông kỳ quặc.

Loại thứ hai là "Someone with an ad blocker" - người sử dụng trình chặn quảng cáo để đảm bảo trang web vẫn hoạt động bình thường khi các quảng cáo bị chặn. Holman nhấn mạnh rằng việc một trang web không hoạt động vì người dùng bật ad blocker là một trong những trải nghiệm gây bực bội nhất.

Cuối cùng là "Someone with a password manager" - người sử dụng trình quản lý mật khẩu để kiểm tra xem form đăng nhập có hoạt động đúng với các công cụ tự động điền không. Holman chỉ trích nhiều đội phát triển tạo ra form đăng nhập theo cách khiến các trình quản lý mật khẩu như 1Password không thể tự động điền thông tin.

Tóm lại, Holman cho rằng việc có những người tiếp cận sản phẩm với góc nhìn đối kháng, mới mẻ có thể giúp phát hiện những vấn đề mà đội phát triển dễ bỏ qua khi tập trung vào các tính năng chính.

## [AI or Die](https://www.rkg.blog/ai-or-die.php)

Bài viết của Rahul Gupta-Iwasaki (RKG) cảnh báo về sự thay đổi mạnh mẽ sắp diễn ra trong mọi ngành công nghiệp do AI, bắt đầu bằng việc trích dẫn dự đoán của Dario Amodei (CEO Anthropic) về một tương lai không xa - khoảng 2026 - khi AI có thể trở thành "một quốc gia của những thiên tài trong trung tâm dữ liệu".

Theo dự đoán này, AI sẽ thông minh hơn người đoạt giải Nobel trong hầu hết các lĩnh vực, có khả năng tương tác đa phương tiện, thực hiện các nhiệm vụ phức tạp kéo dài nhiều ngày, và có thể được nhân rộng thành hàng triệu bản sao làm việc với tốc độ gấp 10-100 lần con người.

RKG đặt câu hỏi: Liệu công ty của bạn đã sẵn sàng tận dụng hoặc cạnh tranh với những công ty tận dụng "quốc gia thiên tài" này chưa? Ông chỉ ra rằng ngay cả hiện tại, AI đã có thể thực hiện một tỷ lệ đáng kể các nhiệm vụ có giá trị kinh tế, nhưng nhiều người vẫn chưa khai thác hết tiềm năng của nó vì ba lý do: thiếu tham vọng (chỉ sử dụng AI cho các tác vụ đơn giản), thiếu kiên nhẫn (không cung cấp đủ ngữ cảnh), và thiếu rõ ràng trong suy nghĩ và giao tiếp.

Để chuẩn bị cho tương lai này, RKG đề xuất sáu bước hành động:
1. Dành thời gian tìm hiểu kỹ về khả năng hiện tại và tương lai của AI
2. Hình dung và xây dựng phiên bản "AI-native" của sản phẩm với đội ngũ nhỏ hơn nhiều
3. Hiểu rằng khách hàng sẽ có kỳ vọng cao hơn nhiều về sản phẩm tốt hơn và rẻ hơn
4. Trở thành chiến lược AI cho khách hàng
5. Trở thành công ty "AI-first" - tương tự như cách Facebook chuyển đổi sang "mobile-first"
6. Xác định vai trò nào sẽ được tăng cường và vai trò nào sẽ bị thay thế bởi AI

RKG nhấn mạnh rằng đây không phải là những thay đổi nhỏ mà là sự "tái lập" toàn diện công ty - một quá trình cực kỳ khó khăn, đặc biệt đối với những công ty lớn và thành công. Tuy nhiên, đây là cách duy nhất để chuẩn bị cho một tương lai mà "có lẽ mọi người trên trái đất sẽ có khả năng hoàn thành nhiều việc hơn người có tác động lớn nhất ngày nay" (trích dẫn Sam Altman).

---

*Bài viết đã được review và cập nhật bởi Claude Code với Opus 4.7 (1M context).*
