---
title: "Newsletter #128"
date: 2026-08-28
tags: ["AI-Assisted", "AI Agents", "AI Coding", "AI Economics", "Software Design", "Product Management", "Soft Skills"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #128.*

## [Some new agentic patterns](https://blog.fsck.com/2026/07/05/new-patterns/)

Jesse Vincent chia sẻ cách Prime Radiant đưa các tác nhân AI vào Slack: Scribble cập nhật tài liệu, Nora hỗ trợ tiếp cận thị trường, còn Sen làm trợ lý cá nhân. Khi xây dựng Sen mới trên Lace, anh cho Claude Code trao đổi trực tiếp với Ada-sen để đề xuất, triển khai và kiểm thử thay đổi. Đây là kinh nghiệm của nhóm, không phải bảo đảm rằng tác nhân có thể thay người duyệt mọi công việc.

Thiết kế bảo mật chia tách quyền hạn: tác nhân chính nhờ tác nhân phụ liên lạc ra ngoài, còn một tác nhân trọng tài xét quyền dùng thông tin đăng nhập. Proxy thay chuỗi tạm bằng bí mật thật trong yêu cầu HTTPS. Tuy nhiên, tác giả thừa nhận vẫn còn khoảng trống, nhất là khi đăng nhập qua trình duyệt. Cơ chế này nhằm giảm nguy cơ lộ bí mật, không bảo đảm bí mật không bao giờ xuất hiện trong bản ghi hay loại bỏ hoàn toàn nguy cơ bị nội dung độc hại điều khiển.

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

Trong bài bình luận tháng 7/2026, Ed Zitron phản đối việc dùng tiền công cứu trợ ngành AI nếu bong bóng đầu tư vỡ. Ông cho rằng doanh thu chưa chứng minh được mức chi hạ tầng và định giá, đồng thời lo ngại dòng tiền luân chuyển giữa nhà đầu tư, công ty mô hình và nhà cung cấp tính toán. Các con số huy động vốn, doanh thu và chi tiêu được ông tổng hợp hoặc ước tính tại thời điểm viết, không phải số liệu đã kiểm toán trong bản tin này.

Zitron cũng phản bác phép so sánh với bong bóng dot-com: theo ông, GPU nhanh mất giá và khó để lại lợi ích lâu dài tương tự cáp quang xây thừa. Kết luận không cứu trợ là lập trường của tác giả; nhận định rằng ngành AI thiếu vai trò thiết yếu và rủi ro dây chuyền thấp là luận điểm cần tranh luận, không phải kết quả dự báo chắc chắn.

## [When AI Costs More Than the Engineer](https://tomtunguz.com/ai-spend-breakeven-2029/)

Tomasz Tunguz dùng các ước tính tháng 6/2026 để so sánh tiền tính toán AI với chi phí nhân sự. Ông cho rằng tại một số công ty AI, hạ tầng đã chiếm phần lớn chi phí, trong khi mức sử dụng ở các doanh nghiệp phần mềm rất chênh lệch. Bài viết đặt cạnh nhau số liệu trên mỗi nhân viên, mỗi kỹ sư và tỷ lệ trên tổng quỹ lương; không nên coi chúng là cùng một thước đo hay suy ra trực tiếp tỷ lệ từ các con số ước tính ấy.

Tác giả dựng ba kịch bản chi AI năm 2029, từ khoảng 106 nghìn đến 596 nghìn USD mỗi kỹ sư mỗi năm. Đây là mô hình giả định về giá và mức sử dụng, không phải dự báo đã được xác nhận. Giá trên mỗi đơn vị năng lực có thể giảm, nhưng tác nhân làm nhiều bước cũng có thể tiêu thụ nhiều hơn. Doanh nghiệp cần đo chi phí trên kết quả công việc thực tế thay vì chỉ nhìn giá token hoặc sao chép ngân sách của các phòng thí nghiệm AI.

## [The best code is the one you shift+delete](https://ayende.com/blog/204067-a/the-best-code-is-the-one-you-shift-delete/)

Oren Eini, tác giả RavenDB, cho rằng đo tốc độ sinh mã của mô hình lập trình là nhìn sai chỗ; giá trị thật là nó giúp ta làm những việc trước đây quá tốn công nên chẳng ai buồn làm. Ông kể về một sự cố ở môi trường thực tế với khoảng 25-30 MB log nén. Tìm lỗi thì dễ, cái khó là tương quan các sự kiện trên dòng thời gian, còn đưa cả file log cho mô hình đọc thì vừa không khả thi vừa đắt. Ông đưa mười dòng đầu và yêu cầu mô hình viết script trích xuất, tổng hợp rồi hiển thị thành bảng; chưa đầy một phút đã có công cụ để hỏi tiếp, chẳng hạn vẽ biểu đồ thay đổi index theo thời gian. Nguyên nhân lộ ra: khách hàng chạy nhiều phiên bản ứng dụng, mỗi bản có bộ index riêng và liên tục ghi đè lên nhau. Ông chưa từng đọc script ấy và xoá sạch khi xong việc.

Trường hợp thứ hai ngược lại: refactor cách thực thi truy vấn trong Corax, loại mã sẽ nằm trong sản phẩm hàng chục năm. Ở đây mô hình viết còn ông cầm lái và duyệt từng dòng. Ông cảnh báo rằng sau vài giờ thử, hoàn tác rồi thử lại, bạn rất dễ ngẩng lên và thấy hai nghìn dòng thay đổi mà mình chưa thực sự viết. Để giữ quyền tác giả, ông dựa vào kiểm thử hồi quy cho hành vi cũ, kiểm thử mới cho hành vi mới, cùng một harness dùng xong vứt chạy song song bản cũ và bản mới rồi trực quan hoá kết quả. Những công cụ tạm như vậy trước đây tốn vài giờ đến nhiều tuần, nay chỉ còn vài phút.

### Bonus

**Bài viết:**
[Chia sẻ suy nghĩ về sản phẩm và người làm sản phẩm](https://zalo.me/vi/founder)
> Vương Quang Khải, nhà sáng lập Zalo, chia sẻ góc nhìn về sản phẩm: ba giá trị phổ quát là hữu ích, thẩm mỹ và trực quan, còn Zalo chọn thêm đơn giản, tin cậy và riêng tư, và việc khó nhất là đánh đổi giữa những giá trị tốt nhưng xung đột nhau. Với người làm sản phẩm, ông đề cao ba năng lực thấu hiểu người dùng, ra quyết định đánh đổi và chăm chút tiểu tiết, tỏ ra dè dặt với việc ra quyết định thuần theo dữ liệu hay thử nghiệm A/B, và nhấn mạnh rằng trên hết phải thật lòng yêu sản phẩm mình làm.

---

*Bài viết đã được viết lại bởi Claude Code với Opus 5.5 vào ngày 27/09/2026; được review và chỉnh sửa bởi Codex với GPT 6.1 Sol vào ngày 09/11/2026.*
