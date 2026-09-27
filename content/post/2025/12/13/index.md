---
title: "Newsletter #70"
date: 2025-12-13
tags: ["AI-Assisted", "Newsletter", "Developer Productivity", "Engineering Career", "Testing", "Code Quality", "AI Coding"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #70.*

## [The developer productivity paradox: Why faster coding doesn't mean faster software delivery](https://gradle.com/blog/developer-productivity-paradox-faster-coding-slower-delivery/)

Bài viết của Trisha Gee (Gradle) tổng kết một chủ đề nổi bật tại DPE Summit 2025: nghịch lý năng suất nhà phát triển. Gần như mọi lập trình viên đã dùng AI (khoảng 90%) và hơn 80% tin rằng mình làm việc hiệu quả hơn, nhưng các chỉ số tổ chức gần như không nhúc nhích. Báo cáo DORA 2025 cho thấy AI không phải vấn đề cũng không phải lời giải, mà là tấm gương phản chiếu và bộ khuếch đại những điểm mạnh, điểm yếu sẵn có. Vì mô hình AI luôn có một tỷ lệ dự đoán sai nhất định, lượng mã nguồn sinh ra càng nhiều thì hệ thống càng kém ổn định nếu quy trình phân phối phần mềm không đủ vững. Chi phí chuyển đổi ngữ cảnh cũng nuốt mất phần thời gian tiết kiệm được: mỗi lần bị ngắt quãng tốn 15–20 phút để lấy lại tập trung, và chính AI tạo thêm những lần ngắt mới như kiểm tra kết quả, chỉnh câu lệnh hay chuyển công cụ để tìm lỗi.

Để vượt qua nghịch lý, tác giả đề xuất coi việc áp dụng AI là một cuộc chuyển đổi toàn tổ chức theo hướng Kỹ thuật Năng suất Nhà phát triển (DPE): đầu tư vào kỹ thuật nền tảng và tiêu chuẩn chung, củng cố cơ chế hoàn tác, rút ngắn vòng phản hồi CI/CD; giảm kích thước mỗi lô thay đổi, loại bỏ việc vặt và áp dụng quản lý chuỗi giá trị; đồng thời đo luồng công việc và kết quả thay vì số dòng mã hay số yêu cầu hợp nhất và đào tạo đội ngũ biết thẩm định mã do AI viết thay vì chỉ bấm "Chấp nhận".

## [What Actually Makes You Senior](https://terriblesoftware.org/2025/11/25/what-actually-makes-you-senior/)

Theo tác giả, kỹ năng cốt lõi tách biệt kỹ sư cấp cao với phần còn lại không nằm ở công nghệ mà ở khả năng **giảm sự mơ hồ**. Một kỹ sư cấp trung có thể xử lý rất tốt bài toán đã được định nghĩa rõ, nhưng trước yêu cầu mơ hồ như "cần cải thiện hiệu năng" hay "người dùng phàn nàn về luồng đăng ký", kỹ sư cấp cao sẽ đào sâu: đặt những câu hỏi chưa ai nghĩ tới, tách điều quan trọng khỏi nhiễu, xác định việc nào làm ngay và việc nào gác lại. Họ hỏi vấn đề thực sự cần giải quyết là gì, người dùng là ai và điều gì làm họ khó chịu, kế hoạch đang dựa trên giả định nào có thể sai, và hậu quả ra sao nếu vẫn phát hành khi đã sai. Nhờ vậy họ **giảm rủi ro cho dự án**, biến "chẳng biết đây là gì" thành "hai dự án nhỏ và một việc nên bỏ". Khi làm tốt, công việc này gần như vô hình: dự án cứ thế trôi chảy, ít bất ngờ và ít sự cố.

Tác giả phê phán cách tuyển dụng hiện nay chỉ chú trọng danh sách công nghệ, số năm kinh nghiệm và bài tập LeetCode, dẫn đến những kỹ sư "cấp cao" đảo được cây nhị phân trên bảng trắng nhưng lúng túng trước một đặc tả còn dang dở. Tin tốt là đây không phải tài năng bẩm sinh mà là kỹ năng rèn được qua thực hành: hãy bắt đầu từ chiếc ticket mơ hồ tiếp theo, dành thời gian làm rõ nó trước thay vì chờ người khác giải thích hoặc lao vào viết mã ngay.

## [Becoming unblockable](https://www.seangoedecke.com/unblockable/)

Sean Goedecke đưa ra những lời khuyên cụ thể để trở nên "không thể bị chặn", tức luôn có cách tiến lên dù gặp trở ngại. Trước hết, hãy làm song song nhiều hơn một việc, giống một luồng CPU chuyển sang việc khác khi việc này bị chặn; nhưng tránh ôm hai việc khẩn cấp cùng lúc, và nên chọn các việc phụ như tái cấu trúc, tối ưu hiệu năng hay đào tạo bắt buộc thay vì nhặt bừa thêm ticket. Tiếp theo, sắp xếp thứ tự công việc sao cho phần dễ bị tắc (chẳng hạn việc chuyển đổi cơ sở dữ liệu phải chờ đội khác) hoặc phần dễ gây tranh cãi được làm sớm nhất. Hãy quyết liệt với công cụ: dùng môi trường phát triển càng phổ biến càng tốt, sửa môi trường hỏng nhanh như xử lý sự cố trên hệ thống thật, và khi thật sự bế tắc thì tìm đường vòng như chạy kiểm thử trên CI hay triển khai lên môi trường thử nghiệm.

Khi gặp lỗi từ dịch vụ của đội khác, đừng vội kết luận mình bị chặn mà hãy tự đọc mã nguồn và nhật ký của họ; giờ đây có thể nhờ các tác tử AI như Codex hay Claude Code phân tích, và theo tác giả chúng trả lời đúng khoảng một phần ba số lần. Ngoài ra, hãy xây dựng quan hệ với kỹ sư các đội khác bằng cách hữu ích với họ để có kênh hợp tác không chính thức nhanh hơn, và tận dụng "hỗ trợ từ trên cao" của giám đốc hay phó chủ tịch bằng cách chọn dự án phù hợp với ưu tiên của công ty.

## [Treat test code like production code](https://blog.ploeh.dk/2025/12/01/treat-test-code-like-production-code/)

Mark Seemann cho rằng mã kiểm thử cần được đối xử như mã chạy trên môi trường thật: áp dụng cùng tiêu chuẩn viết mã, dễ đọc, được tổ chức tốt và cũng phải qua duyệt mã. Thực tế mã kiểm thử thường bị xem nhẹ: thụt lề đúng chuẩn nhưng đầy trùng lặp do sao chép, nhiều "mã zombie" bị vô hiệu hóa bằng chú thích, dùng thời gian chờ tùy ý thay cho đồng bộ luồng đúng cách. Tiêu chuẩn viết mã và nguyên tắc thiết kế tồn tại không phải để chiều máy tính mà để con người, thường là chính mình trong tương lai, có thể hiểu và bảo trì. Khi độ bao phủ kiểm thử tốt, lượng mã kiểm thử rất lớn nên càng cần giữ nó theo nguyên tắc DRY; nếu không, một thay đổi nhỏ sẽ gây ra "Shotgun Surgery", làm hàng loạt bài kiểm thử hỏng và phải sửa từng cái.

Với các vấn đề riêng của kiểm thử như cấu trúc, tổ chức, đặt tên hay tính tất định, tác giả giới thiệu cuốn *xUnit Test Patterns* là tài liệu đầy đủ nhất. Ông cũng phản bác quan niệm kiểm thử nên "DAMP thay vì DRY", vì những cụm từ mô tả có ý nghĩa là phẩm chất đáng có bất kể có lặp lại hay không. Dù vậy vẫn có ngoại lệ, chủ yếu về bảo mật khi mã kiểm thử không bao giờ được triển khai: có thể mã hóa cứng mật khẩu chỉ dùng cho kiểm thử và bỏ qua bước kiểm tra đầu vào. Một số ngoại lệ theo nền tảng cũng hợp lý, như bỏ quy tắc bắt buộc gọi `ConfigureAwait` trong .NET hay chấp nhận orphan instance trong Haskell.

## [How good engineers write bad code at big companies](https://www.seangoedecke.com/bad-code-at-big-companies/)

Sean Goedecke giải thích vì sao các công ty công nghệ lớn tuyển nhiều kỹ sư giỏi mà vẫn tạo ra mã nguồn kém chất lượng. Lý do chính là các công ty này **đầy kỹ sư làm việc ngoài chuyên môn của mình**. Nhân viên trung bình chỉ ở lại một đến hai năm, lại thêm tái cơ cấu nội bộ liên tục, trong khi nhiều dịch vụ đã tồn tại cả chục năm. Vì thế phần lớn thay đổi mã được thực hiện bởi "người mới", những người mới làm quen với công ty, cơ sở mã hay ngôn ngữ lập trình trong vòng sáu tháng. Những "lão làng" am hiểu hệ thống có thể duyệt mã kỹ, nhưng vai trò này hoàn toàn không chính thức và họ luôn quá tải vì còn phải lo việc riêng.

Kỹ sư điển hình vì vậy có năng lực nhưng phải chạy theo hạn chót trên hệ thống xa lạ, tức là "cố gắng hết sức trong một môi trường không được thiết lập để tạo ra mã chất lượng". Theo tác giả, đây là đánh đổi có chủ đích: công ty ưu tiên khả năng điều chuyển kỹ sư linh hoạt hơn chuyên môn sâu và chất lượng phần mềm, còn cá nhân kỹ sư gần như không thể thay đổi điều đó. Tác giả phân biệt "kỹ thuật thuần túy" (dự án khép kín như ngôn ngữ lập trình, nơi mã xấu thường do thiếu năng lực) với "kỹ thuật không thuần túy" (giống thợ điện, thợ nước làm theo hạn chót, nơi mã xấu là khó tránh). Nguyên nhân gốc rễ là hầu hết kỹ sư ở công ty lớn buộc phải làm phần lớn công việc trong những cơ sở mã không quen thuộc.

## [The Success Trap](https://mikefisher.substack.com/p/the-success-trap)

Mike Fisher phân tích cách thành công có thể âm thầm thu hẹp tự do và lựa chọn. Ông so sánh người phục vụ ở một quán ăn nhỏ, với kỹ năng dễ mang theo và có thể đổi nghề bất cứ lúc nào, với người phục vụ ở nhà hàng Michelin, tinh thông hơn nhưng ít lựa chọn hơn. "Bẫy thành công" là khái niệm trong lý thuyết tổ chức, mô tả trạng thái quá giỏi khai thác thế mạnh hiện tại đến mức ngừng khám phá cơ hội mới; nó gần với *Thế lưỡng nan của nhà đổi mới* của Clayton Christensen, nhưng bẫy thành công là sự mục ruỗng từ bên trong, còn thế lưỡng nan là bị người khác phá vỡ từ bên ngoài.

Bài viết đưa ra ba ví dụ: một kỹ sư được thăng tiến lên quản lý đến mức không còn tự xây dựng gì, cuối cùng chấp nhận giảm lương để quay lại viết mã ở một công ty khởi nghiệp; Kodak phát minh ra máy ảnh kỹ thuật số năm 1975 nhưng xếp xó vì phim là nguồn sống của họ; và Radiohead chủ động làm mới mình bằng *Kid A* sau thành công của *OK Computer*. Để thoát bẫy, tổ chức cần thể chế hóa sự tò mò bằng thời gian dành riêng cho thử nghiệm, còn cá nhân nên thường xuyên đặt mình vào vị trí người mới học, coi trọng tốc độ học hỏi hơn sự ổn định. Với người lãnh đạo, đó là tinh thần "quản gia": nắm giữ thành công nhẹ nhàng và tối ưu cho sự đổi mới chứ không chỉ kết quả, bởi theo tác giả, tự do chứ không phải thành tựu mới là thước đo thật sự của thành công.

## [Writing a good CLAUDE.md](https://www.humanlayer.dev/blog/writing-a-good-claude-md)

Bài viết của HumanLayer giải thích rằng LLM không có trạng thái: ở đầu mỗi phiên, tác tử lập trình không biết gì về dự án, và `CLAUDE.md` (hoặc `AGENTS.md`) là tệp duy nhất mặc định được đưa vào mọi cuộc hội thoại. Vì vậy tệp này dùng để giúp Claude làm quen với cơ sở mã, trả lời ba câu hỏi: **CÁI GÌ** (công nghệ, cấu trúc dự án), **TẠI SAO** (mục đích của từng phần) và **LÀM THẾ NÀO** (cách làm việc, chạy kiểm thử, kiểm tra kiểu, biên dịch). Tác giả lưu ý Claude thường bỏ qua `CLAUDE.md` vì Claude Code chèn kèm lời nhắc hệ thống rằng nội dung này chỉ nên dùng khi "rất liên quan đến nhiệm vụ", nên tệp càng chứa nhiều hướng dẫn không áp dụng chung thì càng dễ bị phớt lờ.

Các khuyến nghị chính: ít hướng dẫn hơn là tốt hơn, vì các LLM suy luận hàng đầu chỉ tuân theo ổn định khoảng 150–200 chỉ dẫn, và riêng lời nhắc hệ thống của Claude Code đã chiếm khoảng 50; giữ tệp dưới 300 dòng, càng ngắn càng tốt (tệp gốc của HumanLayer chưa tới 60 dòng) và chỉ chứa nội dung áp dụng cho mọi nhiệm vụ. Hãy dùng cách tiết lộ dần: đặt hướng dẫn riêng cho từng loại việc trong các tệp markdown riêng, chỉ liệt kê chúng trong `CLAUDE.md` và ưu tiên trỏ tới vị trí `file:line` thay vì sao chép mã. Đừng biến Claude thành công cụ lint đắt đỏ; hãy dùng các công cụ lint và định dạng tất định, kết hợp hook hoặc lệnh slash. Cuối cùng, đừng dùng `/init` để tự động sinh tệp, vì đây là điểm đòn bẩy cao nhất của bộ khung tác tử.

## [We should all be using dependency cooldowns](https://blog.yossarian.net/2025/11/21/We-should-all-be-using-dependency-cooldowns)

Tác giả lập luận rằng thời gian chờ phụ thuộc (dependency cooldown) là cách miễn phí, dễ làm và cực kỳ hiệu quả để tránh phần lớn các cuộc tấn công chuỗi cung ứng mã nguồn mở. Hầu hết các vụ tấn công có chung kịch bản: kẻ tấn công chiếm quyền một dự án phổ biến (thường qua thông tin xác thực bị lộ hoặc lỗ hổng CI/CD), phát hành phiên bản độc hại lên PyPI, npm hay GitHub, người dùng tự động cập nhật, các công ty bảo mật phát hiện và báo lên, rồi kho gói gỡ bỏ phiên bản đó. Giai đoạn chuẩn bị có thể kéo dài hàng tuần, nhưng từ lúc phát hành gói độc hại đến lúc bị gỡ thường chỉ vài giờ đến vài ngày. Trong mười vụ được phân tích, tám vụ có cửa sổ tấn công dưới một tuần; ngoại lệ đáng kể là xz-utils với khoảng năm tuần.

Thời gian chờ đơn giản là khoảng cách giữa lúc một phiên bản được công bố và lúc nó được coi là đủ tin cậy để sử dụng, giúp các công ty bảo mật kịp phát hiện vấn đề trước. Cấu hình rất gọn, chẳng hạn `cooldown: default-days: 7` trong Dependabot, hoặc tính năng tương tự trong Renovate và một số trình quản lý gói. Chờ 7 ngày sẽ chặn được phần lớn các vụ trong danh sách, còn 14 ngày chặn được tất cả trừ xz-utils. Dù không phải thuốc chữa bách bệnh, vì an ninh chuỗi cung ứng về bản chất là vấn đề niềm tin xã hội, việc giảm 80–90% rủi ro với chi phí gần như bằng không là rất khó bỏ qua.

---

*Bài viết đã được viết lại bởi Claude Code với Opus 5.5 vào ngày 27/09/2026.*
