---
title: "Newsletter #128"
date: 2026-08-28
tags: ["AI-Assisted", "AI Agents", "AI Coding", "AI Economics", "Software Design", "Product Management", "Soft Skills"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #128.*

## [Some new agentic patterns](https://blog.fsck.com/2026/07/05/new-patterns/)

Jesse Vincent chia sẻ những mô hình (pattern) mới mà đội ngũ của anh đang dùng để đưa các agent AI vào chạy thật trong công việc hàng ngày. Thay vì để agent chỉ trả lời khi được hỏi, họ xây dựng các agent chủ động: Scribble theo dõi các issue và tự cập nhật tài liệu nội bộ, Nora hỗ trợ công việc go-to-market và tự tìm ra cơ hội để đề xuất, còn Sen là nhóm agent trợ lý điều hành lo việc lên lịch, phân loại email và tra cứu thông tin.

Điểm thú vị nhất là cách họ phát triển phần mềm: Claude Code làm việc trực tiếp với một agent khác tên Ada-sen, không cần con người làm trung gian truyền đạt phản hồi. Claude đề xuất thay đổi, Ada đọc bản đặc tả rồi nêu câu hỏi và lo ngại, hai bên trao đổi qua lại cho đến khi thống nhất. Về bảo mật, tác giả nhấn mạnh nguyên tắc chia tách quyền hạn: agent chính không được tự liên lạc ra ngoài, thông tin đăng nhập được giữ trong 1Password và chèn vào request qua một proxy trung gian, mỗi subagent muốn dùng thông tin đăng nhập phải xin phép một agent trọng tài. Nhờ vậy thông tin bí mật không bao giờ lọt vào transcript của agent. Dù vậy, tác giả thừa nhận rủi ro "Lethal Trifecta" mà Simon Willison đặt tên vẫn còn đó: một agent vừa đọc được dữ liệu riêng tư, vừa liên lạc ra ngoài, vừa tiếp xúc nội dung không đáng tin thì luôn tiềm ẩn nguy hiểm và cần biện pháp giảm thiểu.

**Điểm chính:**
- Agent chủ động (proactive) hữu ích hơn agent chỉ chờ lệnh: tự cập nhật tài liệu, tự đề xuất cơ hội.
- Hai agent có thể tự trao đổi đặc tả và phản hồi cho nhau mà không cần con người làm trung gian.
- Bảo mật dựa trên chia tách quyền: agent chính không liên lạc ra ngoài, thông tin đăng nhập nằm ngoài transcript.
- Mọi truy cập thông tin đăng nhập đều phải qua một agent trọng tài cấp phép.
- "Lethal Trifecta" (dữ liệu riêng tư + liên lạc ra ngoài + nội dung không đáng tin) vẫn là rủi ro cần cảnh giác.

## [Why I Stopped Arguing With People](https://wangcong.org/2026-06-30-why-i-stopped-arguing-with-people.html)

Cong Wang, một kỹ sư phần mềm, kể lại quá trình anh từ chỗ thích tranh luận kỹ thuật đến lúc nhận ra phần lớn các cuộc tranh luận đó vô ích. Anh mượn ý từ triết học Lão Tử: "có" và "không" sinh ra nhau, nên cái đúng chỉ tồn tại khi có cái sai đứng cạnh. Thắng một cuộc tranh luận nghĩa là tạo ra một người thua, và điều đó không mang lại giá trị thật. Theo anh, phần lớn tranh luận phục vụ cái tôi chứ không phục vụ ý tưởng: khi nói chuyện với người thật sự cầu thị thì đó là thảo luận, còn khi đối phương bị cái tôi chi phối, việc chứng minh họ sai bị họ cảm nhận như một đòn tấn công cá nhân, và họ sẽ càng phòng vệ thay vì tiếp thu.

Tác giả cũng chỉ ra rằng con người cảm nhận trước rồi mới đi tìm lý lẽ để bào chữa cho cảm nhận đó, nên lập luận logic gần như bất lực trước một quan điểm mang tính cảm xúc. Anh viết: hầu hết mọi người không học từ lời khuyên, họ học từ hậu quả. Việc góp ý khi không được yêu cầu thường chỉ sinh ra oán giận. Ngoại lệ duy nhất là khi người khác chủ động nhờ giúp — lúc đó nhân và quả đảo chiều, và cuộc đối thoại mới thật sự mở. Cuối cùng, anh đề nghị xem sự khác biệt quan điểm như một lợi thế: cơ hội kinh doanh thường nằm đúng ở chỗ mọi người còn chưa đồng ý với nhau. Người duy nhất ta có thể thay đổi là chính mình, nên năng lượng dành để thuyết phục người khác là năng lượng bị lãng phí.

**Điểm chính:**
- Thắng tranh luận đồng nghĩa tạo ra người thua, không tạo ra giá trị.
- Tranh luận thường bảo vệ cái tôi, không bảo vệ ý tưởng.
- Con người cảm nhận trước, lý lẽ đến sau — nên logic khó thắng cảm xúc.
- Người ta học từ hậu quả nhiều hơn từ lời khuyên không được yêu cầu.
- Chỉ khi được nhờ giúp, cuộc đối thoại mới thật sự có tác dụng.
- Khác biệt quan điểm có thể là lợi thế cạnh tranh, không phải vấn đề cần dẹp.

## [Understanding is the new bottleneck](https://www.geoffreylitt.com/2026/07/02/understanding-is-the-new-bottleneck.html)

Geoffrey Litt cho rằng khi các agent AI viết ra ngày càng nhiều mã nguồn, thứ trở thành điểm nghẽn không phải là tốc độ viết mã mà là khả năng hiểu của con người. Anh phản đối cách làm việc chỉ dừng ở việc kiểm tra xem agent làm đúng hay sai; thay vào đó lập trình viên nên giữ được sự thông thạo với hệ thống mình đang xây, để thật sự tham gia vào quá trình sáng tạo chứ không đứng ngoài phê duyệt.

Tác giả đưa ra ba cách để xây dựng sự hiểu một cách hiệu quả. Thứ nhất là tài liệu giải thích mã nguồn: có bối cảnh nền, giải thích trực quan trước khi vào chi tiết kỹ thuật, rồi mới đến phần diff. Anh tự viết một skill `/explain-diff` để sinh ra loại tài liệu này, kèm câu hỏi kiểm tra để chắc rằng mình hiểu thật chứ không đọc cho qua. Thứ hai là "micro-world" — lấy cảm hứng từ ý tưởng "sống trong Mathland" của nhà giáo dục Seymour Papert — tức là dựng những môi trường tương tác nhỏ để sự hiểu tự nảy sinh, ví dụ một công cụ gỡ lỗi cho trình thông dịch Prolog hay một bảng điều khiển cho việc chuyển đổi framework. Thứ ba là không gian chung: các đội nhóm hình thành mô hình tư duy chung qua những nơi cộng tác như Notion, thay vì mỗi người làm việc tách biệt. Litt kết lại bằng tầm nhìn của Alan Kay: mục đích sâu xa của máy tính là tạo ra những mô phỏng động giúp con người hiểu sâu hơn, chứ không phải loại con người ra khỏi vòng lặp.

**Điểm chính:**
- Điểm nghẽn mới không phải tốc độ sinh mã nguồn mà là khả năng hiểu của con người.
- Đừng chỉ kiểm tra kết quả của agent — hãy giữ sự thông thạo với hệ thống.
- Tài liệu giải thích mã nguồn nên đi từ bối cảnh và trực giác, sau đó mới tới diff.
- Câu hỏi kiểm tra giúp phân biệt hiểu thật với đọc cho qua.
- Micro-world: dựng môi trường tương tác nhỏ để sự hiểu tự hình thành.
- Không gian cộng tác chung giúp cả đội có mô hình tư duy thống nhất.

## [When to repeat yourself](https://newsletter.francofernando.com/p/when-to-repeat-yourself)

Franco Fernando đặt lại câu hỏi về nguyên tắc DRY (Don't Repeat Yourself): việc gộp mã nguồn trùng lặp luôn có chi phí ẩn mà nhiều lập trình viên bỏ qua. Chi phí lớn nhất là "thuế phối hợp": khi hai đội dùng chung một đoạn mã nguồn, mỗi thay đổi kéo theo họp thống nhất, duyệt thiết kế và thương lượng khi gộp nhánh. Một đội sửa lỗi trong bản riêng của mình thì rất nhanh, nhưng nhiều đội dùng chung thì phải đồng bộ với nhau. Câu hỏi cần đặt ra là: chi phí phối hợp một thành phần chung có đắt hơn chi phí để các bản trùng lặp dần lệch nhau không?

Tác giả phân biệt hai loại trùng lặp: trùng ngẫu nhiên (trông giống nhau nhưng thuộc hai nghiệp vụ khác nhau, sẽ tiến hoá theo hai hướng) và trùng bản chất (cùng một quy tắc nghiệp vụ nằm ở nhiều nơi). Chỉ loại thứ hai mới đáng gộp. Anh khuyên nên kiên nhẫn: chờ thêm thì chi phí nhỏ, còn trừu tượng hoá quá sớm thì rất đắt. Về cách chia sẻ mã nguồn, mỗi lựa chọn có đánh đổi riêng: thư viện dễ dựng nhưng gây phụ thuộc và xung đột phiên bản gián tiếp; microservice có hợp đồng API rõ ràng nhưng thêm độ trễ mạng, gánh nặng vận hành và rủi ro sẵn sàng; kế thừa tạo ra trừu tượng cứng nhắc, còn composition linh hoạt hơn nhưng phức tạp hơn. Kết luận: trong một đội thì DRY thường thắng, còn khi vượt qua ranh giới tổ chức thì bài toán đổi khác — và hãy nhớ rằng gộp mã trùng lặp về sau dễ hơn nhiều so với tách một trừu tượng đã bị ràng buộc chặt.

**Điểm chính:**
- Gộp mã trùng lặp không miễn phí: chi phí phối hợp giữa các đội là chi phí thật.
- Phân biệt trùng ngẫu nhiên (khác nghiệp vụ) với trùng bản chất (cùng quy tắc nghiệp vụ).
- Trừu tượng hoá quá sớm đắt hơn việc chờ thêm để hiểu rõ vấn đề.
- Thư viện, microservice, kế thừa và composition đều có đánh đổi riêng.
- Trong một đội: DRY thường đúng. Vượt ranh giới tổ chức: cần tính lại.
- Ưu tiên phương án dễ đảo ngược — gộp lại dễ hơn tách ra.

## [Let AI Burn](https://www.wheresyoured.at/let-ai-burn/)

Ed Zitron lập luận rằng ngành AI không xứng đáng được chính phủ giải cứu nếu bong bóng vỡ. Theo tác giả, đây là tình huống khác hẳn khủng hoảng tài chính 2008: các ngân hàng khi đó nắm vai trò hạ tầng sống còn của nền kinh tế, còn các công ty AI thì không. Chỉ riêng năm 2026, OpenAI và Anthropic đã huy động hơn 300 tỷ USD nhưng vẫn lỗ nặng, và khoảng 70% doanh thu của cả ngành đến từ chính chi tiêu mua năng lực tính toán của hai công ty này — một vòng tiền chạy lòng vòng chứ không phải nhu cầu thật từ thị trường.

Tác giả cũng bác bỏ phép so sánh quen thuộc với bong bóng dot-com. Cáp quang thời đó dù xây thừa vẫn còn dùng được nhiều năm sau, trong khi GPU về cơ bản chỉ phục vụ một mục đích và xuống cấp nhanh. Zitron chỉ ra năm bong bóng chồng lên nhau: thị trường chứng khoán, trung tâm dữ liệu, định giá startup AI, tín dụng tư nhân rót vào hạ tầng, và chuỗi cung ứng bán dẫn. Con số minh hoạ: các hyperscaler dự kiến chi 765 tỷ USD vốn đầu tư trong 2026 và hơn 1.000 tỷ USD trong 2027, riêng OpenAI tiêu khoảng 50 tỷ USD cho hạ tầng tính toán. Nếu loại trừ OpenAI và Anthropic — vốn chiếm 89% doanh thu nhóm công ty AI lớn nhất — phần còn lại của ngành chỉ tạo ra chừng 20 tỷ USD mỗi năm. Kết luận của tác giả: hãy để thị trường tự điều chỉnh, vì một gói cứu trợ sẽ phải bơm tiền vô thời hạn mà không có điểm dừng.

**Điểm chính:**
- Doanh thu ngành AI phần lớn là tiền của chính các hãng AI chi cho nhau, không phải nhu cầu đa dạng từ thị trường.
- So sánh với dot-com khập khiễng: cáp quang còn dùng lâu dài, GPU thì hẹp mục đích và mất giá nhanh.
- Năm bong bóng chồng lấn: chứng khoán, trung tâm dữ liệu, định giá startup, tín dụng tư nhân, bán dẫn.
- Bỏ OpenAI và Anthropic ra, cả ngành chỉ còn khoảng 20 tỷ USD doanh thu mỗi năm.
- Không thể giải cứu như 2008 vì các công ty AI không giữ vai trò hạ tầng thiết yếu.

## [When AI Costs More Than the Engineer](https://tomtunguz.com/ai-spend-breakeven-2029/)

Tomasz Tunguz chỉ ra một sự đảo ngược trong bài toán chi phí của ngành phần mềm: ở các công ty AI hàng đầu, tiền chi cho năng lực tính toán đã vượt tiền trả lương. Anthropic tiêu khoảng 2 triệu USD tính toán mỗi nhân sự mỗi năm, gấp 2,3 lần quỹ lương (khoảng 500 nghìn USD cho mỗi nhân sự nếu tính đủ chi phí). Đổi lại, hiệu suất doanh thu cũng rất cao: Anthropic đạt 14 triệu USD doanh thu trên mỗi nhân sự, OpenAI 6,5 triệu USD — mức cao nhất trong danh sách Forbes Global 2000.

Phần còn lại của ngành vẫn ở rất xa mốc đó. Nhóm 1% công ty phần mềm dẫn đầu chi 89 nghìn USD cho AI mỗi kỹ sư mỗi năm (khoảng 40% lương), trong khi mức trung vị chỉ là 137 USD. Tác giả dựng ba kịch bản cho năm 2029, dựa trên giả định lương kỹ sư cao cấp tăng khoảng 5% mỗi năm từ mốc 224 nghìn USD: kịch bản thấp là 106 nghìn USD chi phí AI mỗi kỹ sư (41% lương), kịch bản cơ sở 363 nghìn USD (140%), kịch bản cao 596 nghìn USD (230%). Kết quả phụ thuộc vào hai lực đối nghịch: giá token liên tục giảm (đầu vào của GPT-4 rẻ đi khoảng 10 lần mỗi năm từ 2023 đến 2026, cộng thêm sức ép từ các mô hình open-weight), nhưng quy trình agentic có thể làm lượng token tiêu thụ tăng 24 lần vào năm 2030.

**Điểm chính:**
- Anthropic chi cho tính toán gấp 2,3 lần quỹ lương — chi phí hạ tầng vượt chi phí con người.
- Doanh thu mỗi nhân sự ở Anthropic (14 triệu USD) và OpenAI (6,5 triệu USD) cao nhất thị trường.
- Khoảng cách rất lớn giữa nhóm dẫn đầu (89 nghìn USD/kỹ sư/năm) và mức trung vị (137 USD).
- Đến 2029, chi phí AI mỗi kỹ sư có thể chiếm từ 41% đến 230% lương tuỳ kịch bản.
- Giá token giảm mạnh nhưng workflow agentic có thể đẩy mức tiêu thụ tăng 24 lần vào 2030.

## [The best code is the one you shift+delete](https://ayende.com/blog/204067-a/the-best-code-is-the-one-you-shift-delete/)

Oren Eini (tác giả RavenDB) cho rằng mọi người đang nhìn sai chỗ khi đánh giá các mô hình lập trình: câu hỏi không phải là mô hình viết mã nhanh đến đâu, mà là nó cho phép ta làm những việc trước đây quá tốn công nên chẳng ai buồn làm. Ông kể lại một sự cố ở môi trường thực tế với 25-30 MB log nén. Vấn đề không phải tìm lỗi — tìm lỗi thì dễ — mà là tương quan các sự kiện theo dòng thời gian. Nhét cả file log cho mô hình đọc thì vừa không khả thi vừa đắt, nên ông đổi hướng: đưa mười dòng đầu và yêu cầu mô hình viết một script trích xuất, tổng hợp rồi hiển thị thành bảng. Chưa đầy một phút ông đã có công cụ để tự khám phá dữ liệu, hỏi tiếp "có bao nhiêu index thuộc cùng một cơ sở dữ liệu", "vẽ biểu đồ thay đổi index theo thời gian". Nguyên nhân lộ ra: khách hàng chạy nhiều phiên bản ứng dụng, mỗi phiên bản có bộ index riêng và chúng ghi đè lẫn nhau. Điểm mấu chốt là ông chưa từng đọc dòng mã nào của script đó — xong việc là xoá sạch.

Trường hợp thứ hai ngược lại hoàn toàn: refactor cách thực thi truy vấn trong Corax, loại mã sẽ nằm trong sản phẩm hàng chục năm. Ở đây mô hình viết còn ông cầm lái, duyệt từng dòng một. Tác giả cảnh báo rủi ro rất thật: sau vài giờ thử-hoàn tác-thử lại, bạn có thể ngẩng lên và thấy hai nghìn dòng thay đổi mà mình chưa hề thực sự viết — mã đã thôi là thứ bạn tạo ra và trở thành thứ tự nhiên xuất hiện. Cách ông giữ quyền tác giả: kiểm thử hồi quy cho hành vi cũ, kiểm thử mới cho hành vi mới, cộng thêm một harness (cũng dùng xong vứt) chạy song song bản cũ và bản mới rồi trực quan hoá kết quả.

**Điểm chính:**
- Giá trị lớn nhất của mô hình không phải viết nhanh mã bạn vẫn viết, mà mở khoá những việc trước đây quá tốn công.
- Mã dựng tạm (scaffolding) là mã dùng xong vứt: không cần quan tâm chất lượng, thậm chí không cần đọc.
- Rẻ đi đáng kể: harness so sánh vốn tốn nhiều tuần, script phân tích log tốn 2-3 giờ nay chỉ còn vài phút.
- Với mã sản phẩm sống lâu, phải duyệt từng dòng — nếu không, mã không còn là của bạn.
- Kiểm thử hồi quy cộng công cụ trực quan hoá là cách giữ quyền kiểm soát khi mô hình sinh mã hàng loạt.

### Bonus

**Bài viết:**
[Chia sẻ suy nghĩ về sản phẩm và người làm sản phẩm](https://zalo.me/vi/founder)
> Vương Quang Khải, nhà sáng lập Zalo, viết bài này cho các thành viên Hội đồng Sản phẩm của Zalo. Phần đầu bàn về sản phẩm: ba giá trị phổ quát là hữu ích, thẩm mỹ và trực quan; sản phẩm phải giải quyết nhu cầu thật của người dùng thay vì chạy theo xu hướng công nghệ. Riêng Zalo chọn ba giá trị cốt lõi là đơn giản, tin cậy và riêng tư. Phần sau bàn về người làm sản phẩm: công việc nằm giữa kỹ thuật và nghệ thuật, xoay quanh việc định hình tầm nhìn, dựng lộ trình và sắp thứ tự ưu tiên, đòi hỏi ba năng lực là thấu hiểu người dùng, tư duy đánh đổi và chú ý tiểu tiết. Tác giả tỏ ra dè dặt với việc ra quyết định thuần theo dữ liệu, nhấn mạnh rằng quyết định không làm gì cũng quan trọng ngang quyết định làm gì — và trên tất cả là thật lòng yêu sản phẩm mình làm.
