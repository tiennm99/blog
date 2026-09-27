---
title: "Newsletter #128"
date: 2026-08-28
tags: ["AI-Assisted", "AI Agents", "AI Coding", "AI Economics", "Software Design", "Product Management", "Soft Skills"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #128.*

## [Some new agentic patterns](https://blog.fsck.com/2026/07/05/new-patterns/)

Jesse Vincent, người tạo ra bộ SDK agent mã nguồn mở Lace, chia sẻ những mô hình (pattern) mới mà công ty Prime Radiant của anh đang dùng để đưa agent AI vào công việc hằng ngày. Các agent ở đây không chờ được hỏi mới trả lời mà chủ động làm việc ngay trong Slack: Scribble theo dõi các vấn đề phát sinh và tự cập nhật tài liệu nội bộ, Nora hỗ trợ mảng go-to-market và tự đề xuất cơ hội như các hội thảo nên đăng ký diễn thuyết, còn Sen là nhóm agent trợ lý cá nhân lo phân loại email, lên lịch và tra cứu thông tin.
Mô hình đáng chú ý nhất được tác giả gọi là "agentic user in the loop": khi phát triển Sen 2.0, Claude Code làm việc trực tiếp với một agent khác tên Ada-sen mà không cần con người đứng giữa chuyển lời. Claude đề xuất thay đổi, Ada đọc đặc tả, nêu câu hỏi, kiểm thử thực tế rồi phản hồi, và hai bên cứ thế lặp lại, có khi xây xong cả tính năng qua đêm. Về bảo mật, tác giả dựa vào nguyên tắc chia tách quyền hạn: agent chính không được tự liên lạc ra ngoài, thông tin đăng nhập nằm trong 1Password và chỉ được chèn vào request qua một proxy trung gian, mọi subagent muốn dùng chúng đều phải xin phép một agent trọng tài, nhờ đó bí mật không bao giờ lọt vào transcript. Dù vậy, anh thừa nhận rủi ro "Lethal Trifecta" do Simon Willison đặt tên vẫn còn nguyên: một agent vừa đọc được dữ liệu riêng tư, vừa liên lạc được ra ngoài, vừa tiếp xúc nội dung không đáng tin thì luôn cần biện pháp giảm thiểu.

## [Why I Stopped Arguing With People](https://wangcong.org/2026-06-30-why-i-stopped-arguing-with-people.html)

Cong Wang, một kỹ sư phần mềm, kể lại hành trình từ chỗ thích tranh luận để chứng minh mình đúng về kỹ thuật đến lúc nhận ra phần lớn các cuộc tranh luận ấy chẳng đạt được mục đích. Anh mượn ý từ Đạo Đức Kinh của Lão Tử: "có" và "không" sinh ra nhau, nên hễ có người đúng thì phải có người sai rõ ràng đứng cạnh. Thắng một cuộc tranh luận nghĩa là tạo ra một kẻ thua, và chiến thắng đó rỗng tuếch. Theo anh, đa số tranh luận không bảo vệ ý tưởng mà bảo vệ cái tôi: khi đối phương thấy mình bị tấn công cá nhân, họ sẽ càng cố thủ, và lập luận càng sắc bén thì quan điểm của họ càng cứng lại.

Tác giả cũng chỉ ra rằng con người cảm nhận trước rồi mới tìm lý lẽ bào chữa cho cảm nhận đó, nên logic gần như bất lực trước một quan điểm xuất phát từ cảm xúc. Người ta hiếm khi học từ lời khuyên không được yêu cầu; họ học từ hậu quả, và việc sửa sai người khác thường chỉ để lại sự oán giận. Ngoại lệ duy nhất là khi ai đó chủ động nhờ giúp: lúc ấy hàng phòng thủ hạ xuống và việc học mới thật sự diễn ra. Thay vì cố thắng, anh khuyên xem sự bất đồng như một lợi thế cạnh tranh, vì cơ hội kinh doanh thường nằm đúng ở chỗ mọi người chưa đồng ý với nhau. Cuối cùng, người duy nhất ta thay đổi được là chính mình, bằng cách khiêm tốn xin góp ý và thật lòng tiếp thu nó.

## [Understanding is the new bottleneck](https://www.geoffreylitt.com/2026/07/02/understanding-is-the-new-bottleneck.html)

Trong bài nói tại hội nghị AI Engineer tháng 7/2026, Geoffrey Litt, kỹ sư thiết kế tại Notion, cho rằng khi agent AI sinh ra ngày càng nhiều mã nguồn, điểm nghẽn mới không còn là tốc độ viết mã mà là khả năng hiểu của con người. Theo anh, hiểu mã nguồn không chủ yếu để kiểm tra agent làm đúng hay sai, vì việc đó agent đã làm khá tốt, mà để con người đủ thông thạo hệ thống và tiếp tục góp ý tưởng qua rất nhiều vòng lặp làm việc với agent. Bỏ qua bước hiểu sẽ tích tụ thành "nợ nhận thức" và gây rắc rối về lâu dài.

Litt đưa ra ba kỹ thuật. Thứ nhất là tài liệu giải thích mã nguồn: skill `/explain-diff` do anh viết tạo ra bản giải thích có bối cảnh nền, phần trực giác đi trước chi tiết kỹ thuật, hình minh hoạ tương tác; kèm theo là các câu hỏi kiểm tra đóng vai trò "bộ điều tốc", buộc người đọc hiểu thật trước khi chia sẻ mã. Thứ hai là "micro-world", lấy cảm hứng từ ý tưởng "sống trong Mathland" của nhà giáo dục Seymour Papert: nhờ agent dựng những môi trường tương tác nhỏ như trình gỡ lỗi, bảng điều khiển hay mô phỏng để con người tự khám phá và hình thành trực giác về hệ thống. Thứ ba là không gian chung, nơi agent lên kế hoạch cùng con người trên các trang cộng tác để cả đội cùng suy nghĩ thay vì mỗi người một ngả. Anh kết lại bằng tầm nhìn của Alan Kay từ 50 năm trước: máy tính sinh ra để tăng cường khả năng con người chứ không chỉ để tự động hoá.

## [When to repeat yourself](https://newsletter.francofernando.com/p/when-to-repeat-yourself)

Franco Fernando đặt lại câu hỏi về nguyên tắc DRY (Don't Repeat Yourself): gộp mã nguồn trùng lặp luôn có chi phí ẩn mà nhiều lập trình viên bỏ qua. Lớn nhất là "thuế phối hợp": khi nhiều đội dùng chung một đoạn mã, mỗi thay đổi đều kéo theo họp thống nhất, duyệt thiết kế và thương lượng lúc gộp nhánh, trong khi một đội sửa bản riêng của mình thì rất nhanh. Vì vậy câu hỏi đúng là chi phí phối hợp một thành phần chung có đắt hơn chi phí để các bản sao dần lệch nhau hay không. Tác giả phân biệt trùng lặp ngẫu nhiên, tức những đoạn mã trông giống nhau nhưng thuộc hai nghiệp vụ khác nhau và sẽ tiến hoá theo hai hướng, với trùng lặp bản chất, tức cùng một quy tắc nghiệp vụ bị lặp ở nhiều nơi; chỉ loại sau mới đáng gộp.

Anh khuyên nên kiên nhẫn, vì chờ thêm để hiểu rõ vấn đề thì rẻ còn trừu tượng hoá quá sớm thì đắt. Mỗi cách chia sẻ mã đều có đánh đổi: thư viện dễ dựng nhưng tạo phụ thuộc và xung đột phiên bản gián tiếp; microservice có hợp đồng API rõ ràng nhưng thêm độ trễ mạng, gánh nặng vận hành và rủi ro về tính sẵn sàng; kế thừa sinh ra trừu tượng cứng nhắc, còn composition linh hoạt hơn nhưng phức tạp hơn. Kết luận là trong phạm vi một đội thì DRY thường thắng, nhưng khi vượt qua ranh giới tổ chức thì phải tính lại, và nên ưu tiên phương án dễ đảo ngược, bởi gộp các bản trùng lặp về sau dễ hơn nhiều so với tách một trừu tượng đã bị ràng buộc chặt.

## [Let AI Burn](https://www.wheresyoured.at/let-ai-burn/)

Ed Zitron lập luận rằng ngành AI là một bong bóng dựng trên sự thổi phồng và dòng tiền chạy vòng, nên nếu nó vỡ thì chính phủ không nên giải cứu. Theo tác giả, tình huống này khác hẳn khủng hoảng 2008: ngân hàng khi đó là hạ tầng sống còn của nền kinh tế, còn các công ty AI thì không, và ngoài SoftBank với hơn 40 tỷ USD cho OpenAI vay thì cũng không có rủi ro sụp đổ dây chuyền tương tự. Riêng năm 2026, OpenAI và Anthropic đã huy động hơn 300 tỷ USD nhưng vẫn lỗ nặng; hai công ty này chiếm tới 89% doanh thu của nhóm startup AI lớn nhất, còn phần còn lại của ngành chỉ tạo ra khoảng 20 tỷ USD mỗi năm.
Tác giả bác bỏ phép so sánh quen thuộc với bong bóng dot-com: cáp quang thời đó xây thừa vẫn dùng được nhiều năm, còn GPU hẹp mục đích và nhanh mất giá. Các hyperscaler dự kiến chi 765 tỷ USD vốn đầu tư trong 2026 và hơn 1.000 tỷ USD trong 2027, riêng OpenAI tiêu khoảng 50 tỷ USD cho hạ tầng tính toán trong năm nay. Zitron cũng bác đề xuất của Sam Altman trao cho chính phủ Mỹ 5% cổ phần trị giá 42 tỷ USD, vì con số ấy còn chưa bằng chi phí tính toán một năm và không giải quyết được việc thua lỗ. Kết luận của ông: hãy để thị trường tự đào thải, vì một gói cứu trợ sẽ phải bơm tiền mãi mà không có điểm dừng.

## [When AI Costs More Than the Engineer](https://tomtunguz.com/ai-spend-breakeven-2029/)

Tomasz Tunguz chỉ ra một sự đảo ngược trong bài toán chi phí của ngành phần mềm: ở các công ty AI hàng đầu, tiền chi cho năng lực tính toán đã vượt tiền lương. Anthropic tiêu khoảng 2 triệu USD tính toán cho mỗi nhân sự mỗi năm, gấp 2,3 lần chi phí nhân sự tính đủ (khoảng 500 nghìn USD mỗi người). Đổi lại, doanh thu trên mỗi nhân sự của Anthropic đạt 14 triệu USD và OpenAI đạt 6,5 triệu USD, cao nhất toàn cầu và vượt xa mức 250-600 nghìn USD thường thấy ở các công ty SaaS.

Phần còn lại của thị trường vẫn ở rất xa. Nhóm 1% công ty phần mềm dẫn đầu chi khoảng 89 nghìn USD cho AI mỗi kỹ sư mỗi năm, tương đương 40% mức lương 224 nghìn USD, trong khi công ty ở mức trung vị chỉ chi 137 USD. Tác giả dựng ba kịch bản cho năm 2029: kịch bản thấp là 106 nghìn USD mỗi kỹ sư (41% lương), kịch bản cơ sở 363 nghìn USD (140%) và kịch bản cao 596 nghìn USD (230%), tức ngang tỷ lệ của Anthropic hiện nay. Kết quả phụ thuộc vào hai lực kéo ngược chiều. Một bên là giá token đã giảm khoảng 10 lần mỗi năm suốt ba năm qua, các mô hình open-weight thu hẹp khoảng cách chất lượng với chi phí thấp hơn, và doanh nghiệp có thể giới hạn mức dùng theo vai trò. Bên kia là giá mô hình tiên tiến giữ nguyên, còn các quy trình agentic đốt token nhiều hơn hẳn, đến mức Goldman Sachs dự báo lượng token tiêu thụ tăng 24 lần vào năm 2030.

## [The best code is the one you shift+delete](https://ayende.com/blog/204067-a/the-best-code-is-the-one-you-shift-delete/)

Oren Eini, tác giả RavenDB, cho rằng đo tốc độ sinh mã của mô hình lập trình là nhìn sai chỗ; giá trị thật là nó giúp ta làm những việc trước đây quá tốn công nên chẳng ai buồn làm. Ông kể về một sự cố ở môi trường thực tế với khoảng 25-30 MB log nén. Tìm lỗi thì dễ, cái khó là tương quan các sự kiện trên dòng thời gian, còn đưa cả file log cho mô hình đọc thì vừa không khả thi vừa đắt. Ông đưa mười dòng đầu và yêu cầu mô hình viết script trích xuất, tổng hợp rồi hiển thị thành bảng; chưa đầy một phút đã có công cụ để hỏi tiếp, chẳng hạn vẽ biểu đồ thay đổi index theo thời gian. Nguyên nhân lộ ra: khách hàng chạy nhiều phiên bản ứng dụng, mỗi bản có bộ index riêng và liên tục ghi đè lên nhau. Ông chưa từng đọc script ấy và xoá sạch khi xong việc.

Trường hợp thứ hai ngược lại: refactor cách thực thi truy vấn trong Corax, loại mã sẽ nằm trong sản phẩm hàng chục năm. Ở đây mô hình viết còn ông cầm lái và duyệt từng dòng. Ông cảnh báo rằng sau vài giờ thử, hoàn tác rồi thử lại, bạn rất dễ ngẩng lên và thấy hai nghìn dòng thay đổi mà mình chưa thực sự viết. Để giữ quyền tác giả, ông dựa vào kiểm thử hồi quy cho hành vi cũ, kiểm thử mới cho hành vi mới, cùng một harness dùng xong vứt chạy song song bản cũ và bản mới rồi trực quan hoá kết quả. Những công cụ tạm như vậy trước đây tốn vài giờ đến nhiều tuần, nay chỉ còn vài phút.

### Bonus

**Bài viết:**
[Chia sẻ suy nghĩ về sản phẩm và người làm sản phẩm](https://zalo.me/vi/founder)
> Vương Quang Khải, nhà sáng lập Zalo, chia sẻ góc nhìn về sản phẩm: ba giá trị phổ quát là hữu ích, thẩm mỹ và trực quan, còn Zalo chọn thêm đơn giản, tin cậy và riêng tư, và việc khó nhất là đánh đổi giữa những giá trị tốt nhưng xung đột nhau. Với người làm sản phẩm, ông đề cao ba năng lực thấu hiểu người dùng, ra quyết định đánh đổi và chăm chút tiểu tiết, tỏ ra dè dặt với việc ra quyết định thuần theo dữ liệu hay thử nghiệm A/B, và nhấn mạnh rằng trên hết phải thật lòng yêu sản phẩm mình làm.

---

*Bài viết đã được viết lại bởi Claude Code với Opus 5.5 vào ngày 27/09/2026.*
