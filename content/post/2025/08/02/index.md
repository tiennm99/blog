---
title: "Newsletter #43"
date: 2025-08-02
tags: [ "AI-Assisted", "AI Coding", "Coding Agents", "LLM", "Database", "Caching", "Testing" ]
categories: [ "Newsletter" ]
---

*~~Bài này mình thay đổi tool sử dụng thành Qwen Code và model sử dụng là Qwen 3 Coder, dùng qua api của OpenRouter. Thử nghiệm một tí xem thế nào.~~ Mời bạn thưởng thức Newsletter #43.*

## [Augmented Coding: Beyond the Vibes](https://tidyfirst.substack.com/p/augmented-coding-beyond-the-vibes)

Kent Beck phân biệt “vibe coding”, chỉ chú trọng hành vi chạy được, với “augmented coding”, vẫn coi trọng chất lượng mã, độ phức tạp và kiểm thử dù người lập trình gõ ít hơn. Để minh họa, ông xây dựng thư viện B+ Tree tên BPlusTree3 bằng Rust và Python, mất khoảng bốn tuần với ba lần làm lại vì hai phiên bản đầu tích tụ quá nhiều độ phức tạp khiến AI bế tắc. Ông áp dụng TDD cùng một prompt hệ thống nghiêm ngặt: tách riêng thay đổi cấu trúc khỏi thay đổi hành vi, mỗi lần chỉ làm một kiểm thử chưa đánh dấu trong plan.md rồi viết vừa đủ mã để kiểm thử đó vượt qua. Khi mô hình bộ nhớ của Rust làm độ phức tạp tăng vọt, ông chuyển sang viết bằng Python rồi nhờ agent chuyển ngữ ngược lại sang Rust.

Beck chỉ ra ba dấu hiệu AI đang đi chệch hướng: lặp vòng, tự thêm chức năng không được yêu cầu, và "gian lận" bằng cách vô hiệu hóa hoặc xóa kiểm thử. Kết quả là bản Rust và Python có hiệu năng cạnh tranh, chậm hơn thư viện chuẩn ở vài thao tác nhưng nhanh hơn khi quét theo khoảng; AI còn viết được một extension C cho Python với hiệu năng tốt, dù chất lượng mã nguồn vẫn chưa đạt chuẩn của ông. Theo Beck, lập trình cùng AI vẫn thú vị: phần lớn việc vặt thiết lập biến mất và lập trình viên đưa ra nhiều quyết định quan trọng hơn trong mỗi giờ làm việc.

*Với combo trên sau khi viết được 1 bài đầu thì đang bị nó bị loop, gửi request 3-4 lần gì đến OpenRouter sau đó stuck luôn. Và bài đầu thì cũng rất mất thời gian. Tiếp theo mình thử Qwen Code với Kimi K2*

*Update, có vẻ Qwen Code không dùng với Kimi K2 được, mình gặp lỗi `API Error: Internal Server Error` :v Sau đây mình thử Cline với Qwen 3 Coder nhé*

## [Coding agents have crossed a chasm](https://blog.singleton.io/posts/2025-06-14-coding-agents-cross-a-chasm/)

Trong bài tháng 6/2025, David Singleton kể bước chuyển từ dùng AI gợi ý mã sang giao trọn nhiệm vụ nhỏ cho agent, mà ông ví như thực tập sinh tận tụy. Ông dùng Claude Code để viết các công cụ nhỏ cho cá nhân mà gần như không đọc mã nguồn, chỉ chạy thử và chỉnh dần; một script sắp xếp lại ảnh chỉ tốn 0,31 USD tiền token. Trong công việc, ông giao các lỗi đơn giản cho Codex xử lý trọn vẹn, và dùng Claude Code tích hợp GitHub để review mã nguồn, phát hiện những vấn đề con người bỏ sót. Ví dụ ấn tượng nhất là một lỗi race condition trong luồng tích hợp OAuth: sau 45 phút gỡ lỗi thủ công không có kết quả, ông nhờ Claude vẽ sơ đồ tuần tự dạng ASCII cho toàn bộ luồng và tìm ra nguyên nhân trong 10 phút.

Tác giả cũng cảnh báo "hiệu ứng tấm gương": công cụ khuếch đại cả điểm mạnh lẫn điểm yếu của người dùng. Có lần mô hình liên tục đề xuất giải pháp ngày càng phức tạp, còn ông cứ làm theo, trong khi cách sửa thật sự đơn giản đến mức đáng xấu hổ. AI cũng dễ vá tạm các vấn đề kiến trúc thay vì thúc đẩy tái cấu trúc, và người thiếu nền tảng vững có thể bị dẫn dắt bởi những gợi ý nghe hợp lý nhưng sai. Dù vậy, ông tin ranh giới giữa "AI hỗ trợ" và "AI tự động" sẽ ngày càng mờ đi: con người giữ quyền thiết kế và các quyết định then chốt, còn AI đảm nhận phần triển khai để lập trình viên tập trung vào kiến trúc, trải nghiệm người dùng và logic nghiệp vụ.

## [How Databases Store Your Tables on Disk](https://www.deepintodev.com/blog/how-databases-store-your-tables-on-disk)

Kaan Pekşen giải thích dữ liệu và chỉ mục được tổ chức thành các trang, thường là 8 KB ở PostgreSQL và 16 KB ở InnoDB theo cấu hình mặc định. Nhưng không phải mọi cơ sở dữ liệu đều lưu bảng thành heap không theo khóa: PostgreSQL dùng heap, còn InnoDB tổ chức dữ liệu theo clustered index. Chỉ mục giúp tìm dữ liệu mà không phải quét toàn bảng trong những truy vấn phù hợp, đổi lại cần thêm lưu trữ và công cập nhật.

InnoDB ưu tiên khóa chính làm clustered index; nếu thiếu, nó chọn unique index có mọi cột `NOT NULL`, rồi mới dùng khóa hàng ẩn khi không có lựa chọn phù hợp. Chỉ mục phụ chứa khóa clustered để tra hàng. Trong PostgreSQL, vị trí vật lý của một phiên bản hàng có thể thay đổi khi cập nhật, nên `ctid` không phải định danh nghiệp vụ ổn định. Lựa chọn khóa cũng cần xét kích thước và tính cục bộ khi chèn: vấn đề thường gắn với khóa phân bố ngẫu nhiên, không phải mọi loại UUID đều có cùng hành vi.

## [Software engineering with LLMs in 2025: reality check](https://newsletter.pragmaticengineer.com/p/software-engineering-with-llms-in-2025)

Trong bài ngày 1/7/2025, Gergely Orosz tổng hợp keynote LDX3 và trao đổi với các công ty, kỹ sư để đánh giá việc dùng LLM. Ông đặt các tuyên bố mạnh về AI cạnh những ví dụ agent vẫn sai hoặc không xử lý tốt kho mã có sẵn. Ông dẫn các tỷ lệ mã AI hỗ trợ rất cao từ Claude Code, Windsurf và Cursor; đó là số liệu do các bên mô tả, không phải tỷ lệ công việc AI tự hoàn thành độc lập. Google xây dựng công cụ nội bộ tích hợp AI và chuẩn bị cho lượng mã nguồn tăng gấp mười, còn Amazon đang trở thành công ty "ưu tiên MCP" dựa trên hàng nghìn API nội bộ. Ở nhóm startup, incident.io dùng Claude Code rất nhiều, nhưng một startup công nghệ sinh học lại thấy công cụ AI ít hữu ích hơn các công cụ truyền thống như ruff hay uv.

Nhiều kỹ sư kỳ cựu như Armin Ronacher, Simon Willison, Kent Beck hay Martin Fowler đều hào hứng với các công cụ agent. Tuy vậy vẫn còn những câu hỏi mở: vì sao lãnh đạo nhiệt tình hơn lập trình viên, vì sao chỉ khoảng một nửa lập trình viên dùng công cụ AI hằng tuần, và vì sao mức tiết kiệm trung vị chỉ khoảng 4 giờ mỗi tuần, xa so với lời hứa tăng năng suất gấp mười. Kết luận của bài là công cụ agent có thể là bước chuyển lớn tương tự từ hợp ngữ sang ngôn ngữ bậc cao, nhưng viết mã nhanh hơn không tự động đồng nghĩa với giao phần mềm nhanh hơn nếu hạ tầng và quy trình xung quanh không thay đổi theo.

*Nhìn chung thì combo Cline với Qwen 3 Coder chạy được, nhưng hơi lâu, output thì hơi loằng quằng, bảo tóm tắt nhưng viết rất dài (cái này có thể do mình chưa tối ưu prompt, vì mình bảo nó đọc file CLAUDE.MD thôi). Tiếp theo mình thử Cline với Kimi K2 nhé*

## [Continuous AI](https://www.seangoedecke.com/continuous-ai/)

Sean Goedecke định nghĩa "Continuous AI" là mọi cách tích hợp công cụ AI một cách tự động vào quy trình phát triển sẵn có, tương tự cách kiểm thử hay kiểm tra kiểu dữ liệu chạy liên tục mà lập trình viên không cần chủ động kích hoạt. Thay vì chỉ dùng AI khi mở chat, AI trở thành một lớp hỗ trợ luôn hiện diện: review pull request tự động, gắn nhãn cho issue và pull request, tổng hợp tóm tắt định kỳ để phối hợp nhóm, hay tự động hoàn thành mã nguồn kiểu Copilot. Quan điểm của tác giả thay đổi sau khi trải nghiệm tính năng review pull request của Copilot: phần lớn nhận xét không có nhiều giá trị, nhưng cứ khoảng năm đến mười lần thì có một lần nó bắt được điều ông bỏ sót, và vì lướt qua các nhận xét tốn rất ít công sức nên vẫn đáng dùng.

Để thử nghiệm, tác giả gợi ý GitHub Models cùng GitHub Actions dựa trên mức sử dụng miễn phí khi viết bài tháng 7/2025; chi phí thực tế còn phụ thuộc hạn mức và cách triển khai. Theo ông, thay vì theo đuổi các "kỹ sư AI" hoàn toàn tự động, tương lai gần thực tế hơn là nhiều lớp hệ thống AI đảm nhận các bước kiểm tra tự động, việc tổ chức và những phần khác của quy trình kỹ thuật phần mềm, làm việc song song với lập trình viên.

## [Caching is an abstraction, not an optimization](https://buttondown.com/jaffray/archive/caching-is-an-abstraction-not-an-optimization/)

Justin Jaffray cho rằng caching nên được hiểu trước hết là một abstraction (sự trừu tượng hóa) giúp phần mềm đơn giản hơn, chứ không chỉ là một kỹ thuật tối ưu hiệu năng để tránh truy cập tầng lưu trữ chậm. Cách nhìn này tạo ra một ranh giới rõ ràng giữa các tầng lưu trữ: phần còn lại của hệ thống chỉ việc đọc và ghi dữ liệu mà không cần biết dữ liệu đang nằm ở tầng nhanh hay tầng chậm. Tác giả lấy buffer pool của cơ sở dữ liệu và page cache của hệ điều hành làm ví dụ: chúng tự động đưa dữ liệu hay được truy cập lên tầng lưu trữ nhanh hơn mà lập trình viên không phải can thiệp, tức là việc quản lý các tầng lưu trữ đã được che giấu hoàn toàn.

Từ đó, tác giả rút ra hai nhận định. Thứ nhất, mẫu truy cập dữ liệu trong khối lượng công việc thực tế quá khó đoán, nên việc dựa vào các heuristic và thuật toán cache là không tránh khỏi; tự thiết kế giải pháp riêng cho từng trường hợp không phải lựa chọn thực tế. Thứ hai, caching là một abstraction tốt đến mức xứng đáng được nghiên cứu kỹ lưỡng để vận hành tốt hơn trong thực tế: chính vì nó thành công nên tầm quan trọng của nó thường vô hình cho đến khi có sự cố.

## [You should delete tests](https://andre.arko.net/2025/06/30/you-should-delete-tests/)

André Arko phản bác quan niệm phổ biến trong ngành rằng không bao giờ nên xóa kiểm thử. Theo ông, kiểm thử chỉ có một mục đích duy nhất: giúp con người tự tin khi thay đổi mã nguồn mà không làm hỏng chức năng sẵn có. Kiểm thử nào không còn phục vụ mục đích đó thì nên bị xóa, thay vì được giữ lại vì nguyên tắc.

Ông nêu một số trường hợp cụ thể. Kiểm thử chập chờn (flaky) gây hại nhiều nhất vì nó thất bại ngẫu nhiên, khiến kỹ sư mất niềm tin vào cả những lần thất bại thật; câu "nó lỗi do cái kiểm thử chập chờn thôi, thật ra ổn mà" được lặp lại ngay cả khi mã nguồn thực sự hỏng, và nhiều ngày gỡ lỗi kiểm thử đó thường tốn hơn chi phí của một lỗi trong tương lai. Kiểm thử đặc tả quá chi tiết, khi sửa một dòng mã nguồn phải cập nhật 150 kiểm thử, cũng mang lại sự tự tin giả; ba phép kiểm tra có ý nghĩa còn giá trị hơn 150 cái như vậy. Bộ kiểm thử quá chậm đến mức không ai chạy giữa các lần merge thì chẳng khác gì một kết quả "vượt qua" giả. Còn kiểm thử cho yêu cầu nghiệp vụ cũ sau khi sản phẩm đổi hướng nên được thay bằng kiểm thử cho hành vi mới, chứ không phải sửa cho qua. Tác giả không phản đối việc viết kiểm thử; ông chỉ muốn bộ kiểm thử thật sự làm đúng nhiệm vụ tạo sự tự tin.

*Mình thấy Cline+Kimi K2 cũng gen dài (có thể do prompt như đã nói ở trên), nhưng được cái là response khá nhanh, vì vậy ít ra không phải đợi lâu. Phần prompt mình sẽ thử cải thiện trong tương lai "xa". Còn mai mình sẽ thử Roo Code + Qwen 3 Coder/Kimi K2 trước. Hẹn gặp lại các bạn ở post ngày mai nhé*

---

*Bài viết đã được viết lại bởi Claude Code với Opus 5.5 vào ngày 27/09/2026; được review và chỉnh sửa bởi Codex với GPT 6.1 Sol vào ngày 09/11/2026.*
