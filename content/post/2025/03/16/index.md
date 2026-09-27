---
title: "Newsletter #7"
date: 2025-03-16
tags: ["AI-Assisted", "Newsletter", "LLMs", "AI Coding", "Cursor", "Security", "Engineering Culture"]
categories: [ "Newsletter" ]
---

*Mời bạn thưởng thức Newsletter \#7.*

## [The LLM Curve of Impact on Software Engineers](https://serce.me/posts/2025-02-07-the-llm-curve-of-impact-on-software-engineers)

Sergey Tselovalnikov đưa ra một giả thuyết về sự chia rẽ quanh giá trị của LLM: mức độ hữu ích của LLM với công việc hằng ngày phụ thuộc chủ yếu vào cấp bậc của kỹ sư và vẽ nên một đường cong khá thú vị. Với kỹ sư Junior, người còn đang dựng mô hình tư duy về mã nguồn, LLM là cứu cánh khi gặp lỗi, viết tính năng nhỏ hay nâng cấp thư viện. Đây cũng là vùng nguy hiểm: nếu chỉ sao chép mã qua lại mà không hiểu vì sao nó chạy, kỹ năng sẽ khó tiến bộ. Kỹ sư Mid-level vẫn viết mã và học framework mới nhanh hơn, nhưng bắt đầu gặp những việc LLM chưa làm được, như hiểu khách hàng thực sự muốn gì từ một yêu cầu, truy tìm race condition bằng trình gỡ lỗi hay xử lý sự cố lúc nửa đêm.

Kỹ sư Senior là nhóm hoài nghi nhất. Họ nắm rõ toàn bộ hệ thống, ít thời gian viết mã, còn những việc cốt lõi như lập lộ trình, gỡ các lỗi khó tái hiện hay viết tài liệu thiết kế lại cần nhiều ngữ cảnh mà LLM không có; lĩnh vực càng đặc thù, sự vỡ mộng càng lớn. Đến kỹ sư Staff+, đường cong đi lên trở lại: vai trò của họ là thử nghiệm để mở đường cho người khác, và LLM giúp dựng bản thử nghiệm khái niệm nhanh hơn nhiều, trong khi kiến thức chuyên môn sâu cho phép họ gỡ rối ngay khi LLM bế tắc. Theo tác giả, hiểu đường cong này giúp ta đồng cảm hơn: người hoài nghi hay hào hứng chỉ đơn giản là làm những công việc rất khác nhau.

## [You are using Cursor AI incorrectly...](https://ghuntley.com/stdlib/)

Geoffrey Huntley cho rằng nhiều kỹ sư, từ người mới vào nghề đến cấp principal, đang dùng Cursor sai cách: coi nó như công cụ tìm kiếm thay cho Google, viết yêu cầu quá sơ sài kiểu "hãy cài đặt XYZ", đối xử với nó như một trình soạn thảo thay vì một tác tử tự vận hành, và không biết rằng có thể "lập trình" kết quả đầu ra của LLM. Giải pháp ông đề xuất là xây dựng một "stdlib" (thư viện chuẩn) gồm hàng nghìn quy tắc đặt trong thư mục .cursor/rules/, mỗi quy tắc là một tệp .mdc có cấu trúc rõ ràng với bộ lọc và hành động, đặt tên theo quy ước nhất quán, rồi kết hợp chúng với nhau như các pipe trong Unix.

Nhờ các quy tắc này, ta có thể uốn nắn hành vi của Cursor: khi nó liên tục gợi ý Bazel trong khi tác giả chỉ muốn dùng Nix, ông viết quy tắc "no_bazel" để chặn hẳn các gợi ý đó. Quy tắc cũng giúp tự động hóa quy trình làm việc, chẳng hạn tự thêm phần tiêu đề bản quyền vào tệp mới hay tự tạo commit sau khi hoàn thành yêu cầu. Theo ước tính của tác giả, các mô hình LLM hiện chỉ chính xác khoảng 45% và cần được dẫn dắt thường xuyên, vì vậy liên tục bồi đắp và tinh chỉnh bộ quy tắc là chìa khóa để làm việc với Cursor hiệu quả hơn.

## [How Do You Spend Your Time?](https://brooker.co.za/blog/2024/02/06/time.html)

Marc Brooker viết cho những ai thấy mình bận rộn, làm được nhiều việc nhưng lại không phải những việc giá trị nhất cho dự án và đội. Cách của ông là đặt "ngân sách thời gian": chọn năm, sáu chủ đề công việc cùng tỷ lệ thời gian cho từng chủ đề, linh hoạt trong ngắn hạn nhưng kiên định trong dài hạn, và định kỳ thống nhất với quản lý. Bản thân việc lập ngân sách là phần giá trị nhất, vì nó buộc ta nghĩ nghiêm túc về thế nào là thành công. Các chủ đề của ông gồm công việc cá nhân (viết, đọc, đánh giá mã, gỡ lỗi, tài liệu thiết kế), hướng dẫn và giảng dạy, chiến lược dài hạn, nhịp vận hành hằng ngày, học tập (đọc bài báo khoa học, cài đặt thử thuật toán) và gặp gỡ khách hàng. Cách chia không quan trọng bằng việc làm bài tập này một cách có ý thức.

Giữ ngân sách đòi hỏi biết nói "không". Brooker cảnh báo vài cái bẫy: chạy theo sự nổi bật hay xu hướng, sa đà vào việc vặt khẩn cấp, và mất kiểm soát thời gian, như một kỹ sư cấp cao dự 20 giờ họp mỗi tuần dù không ai thấy anh đóng góp nhiều, chỉ vì ai cũng nghĩ người khác có lý do chính đáng. Ông còn áp dụng tư duy này cho cả tổ chức. Ông cũng mượn khái niệm "sở thích bộc lộ" (revealed preference) trong kinh tế học: hành vi thực tế mới cho thấy ta thật sự ưu tiên gì, giống như bạn nói mình thích salad nhưng lần nào cũng gọi burger.

## [We are destroying software](https://antirez.com/news/145)

Trong bài viết ngắn dưới dạng một chuỗi lời cảnh tỉnh, Salvatore Sanfilippo (antirez), cha đẻ của Redis, liệt kê những cách chúng ta đang "phá hủy" phần mềm: thêm tính năng hay tối ưu mà không cân nhắc độ phức tạp; dùng hệ thống xây dựng rườm rà; tạo chuỗi phụ thuộc vô lý khiến mọi thứ phình to và mong manh; khuyên lập trình viên mới "đừng phát minh lại bánh xe" trong khi tự làm lại bánh xe chính là cách hiểu mọi thứ vận hành ra sao và là bước đầu để tạo ra những chiếc bánh xe mới; không còn quan tâm đến tương thích ngược của API; thúc đẩy viết lại những thứ đang chạy tốt; và nhảy theo mọi ngôn ngữ, mô hình lập trình, framework mới.

Ông cũng phê phán thói quen đánh giá thấp độ khó khi làm việc với các thư viện phức tạp có sẵn so với tự xây dựng, luôn cho rằng tiêu chuẩn phổ biến tốt hơn giải pháp thiết kế riêng cho nhu cầu của mình, coi chú thích trong mã nguồn là vô dụng, và nhầm tưởng phần mềm là một ngành kỹ thuật thuần túy. Chúng ta còn tạo ra những hệ thống không thể "thu nhỏ", trong khi việc đơn giản lẽ ra phải làm được một cách đơn giản, và chạy theo tốc độ viết mã thay vì chất lượng thiết kế. Kết cục là thứ còn lại sẽ không còn mang đến niềm vui của việc "hacking".

## [Nontraditional Red Teams](https://zachholman.com/posts/red-teams)

Zach Holman, cựu kỹ sư GitHub, mở rộng khái niệm "red team" (nhóm đóng vai đối thủ để tìm lỗ hổng) ra ngoài phạm vi an ninh mạng, với ba vai trò mà mọi đội phát triển nên có. Thứ nhất là người chuyên soi xem thiết kế có vô tình gợi hình ảnh tục tĩu không: GitHub từng suýt đem in tấm biển quảng cáo đầu tiên trông giống một hình ảnh khiêu dâm khét tiếng, dù hàng chục người đã xem qua. Sau lần đó, quy trình ra mắt thiết kế lớn ở GitHub có thêm bước kiểm tra xem hình ảnh có thể bị hiểu sai, bị chế giễu hay dùng theo cách ngoài ý muốn không. Thứ hai là người dùng trình chặn quảng cáo, để lên tiếng mỗi khi trang web hỏng điều hướng chỉ vì một tệp hay đoạn HTML bị chặn, một trong những trải nghiệm gây ức chế nhất trên web hiện nay.

Thứ ba là người dùng trình quản lý mật khẩu. Holman phàn nàn rằng nhiều đội làm sai ngay cả biểu mẫu đăng nhập cơ bản nhất, với cách cài đặt tùy biến khiến 1Password và các công cụ tương tự không tự điền được thông tin. Theo ông, đây đều không phải lỗi nghiêm trọng vì người dùng vẫn tìm cách xoay xở, nhưng chúng rất dễ phòng tránh. Khi mải lo tính năng mới, đội phát triển dễ bỏ sót những chi tiết này, nên có một "red team" nhìn sản phẩm bằng con mắt mới mẻ và đối nghịch sẽ rất hữu ích.

## [AI or Die](https://www.rkg.blog/ai-or-die.php)

Rahul Gupta-Iwasaki (RKG) mở đầu bằng dự đoán của Dario Amodei, CEO Anthropic, rằng sớm nhất vào năm 2026 có thể xuất hiện mô hình AI thông minh hơn người đoạt giải Nobel trong hầu hết lĩnh vực, tự thực hiện nhiệm vụ kéo dài nhiều ngày, và chạy song song hàng triệu bản sao với tốc độ gấp 10 đến 100 lần con người, tức "một quốc gia thiên tài trong trung tâm dữ liệu". Tác giả hỏi: công ty của bạn đã sẵn sàng tận dụng, hoặc cạnh tranh với những công ty tận dụng, sức mạnh đó chưa? Ngay hôm nay AI đã làm được một phần đáng kể các nhiệm vụ có giá trị kinh tế, nhưng nhiều người chưa khai thác hết vì thiếu tham vọng, thiếu kiên nhẫn cung cấp ngữ cảnh, và thiếu tư duy, giao tiếp rõ ràng.

Để chuẩn bị, RKG khuyên dành hẳn một tuần tìm hiểu khả năng và hướng đi của AI; xây dựng phiên bản "AI-native" của sản phẩm với đội ngũ nhỏ hơn mười đến một trăm lần; chấp nhận rằng khách hàng sẽ đòi hỏi sản phẩm tốt hơn và rẻ hơn nhiều; trở thành công ty "AI-first" như cách Facebook dồn toàn lực cho di động; và xem xét từng vị trí để biết ai sẽ được AI hỗ trợ, vai trò nào sẽ bị thay thế. Theo ông, đây không phải điều chỉnh nhỏ mà là cuộc "tái lập" toàn diện công ty, càng lớn và thành công càng khó, nhưng là cách để đón một tương lai mà theo Sam Altman, "có lẽ mọi người trên trái đất sẽ làm được nhiều hơn người có tầm ảnh hưởng lớn nhất hiện nay".

---

*Bài viết đã được viết lại bởi Claude Code với Opus 5.5 vào ngày 27/09/2026.*
