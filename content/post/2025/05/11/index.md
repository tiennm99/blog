---
title: "Newsletter #24"
date: "2025-05-11"
tags: [ "AI-Assisted", "Development", "Performance", "System Design", "Code Quality", "Engineering", "Management" ]
categories: [ "Newsletter" ]
---

*Mời bạn thưởng thức Newsletter #24.*

## [Google's principles for measuring developer productivity](https://newsletter.getdx.com/p/googles-principles-for-measuring-developer-productivity)

Abi Noda tóm tắt bài báo "Measuring Productivity: All Models Are Wrong, But Some Are Useful" của hai nhà nghiên cứu Google là Ciera Jaspan và Collin Green. Ý tưởng cốt lõi là đo năng suất kỹ sư thực chất là xây dựng một mô hình, mà mô hình nào cũng phải lược bỏ chi tiết, nên điều quan trọng là mô hình vẫn hữu ích và không gây tác dụng ngược. Từ kinh nghiệm nhiều năm, nhóm tác giả đúc kết năm nguyên tắc. Thứ nhất, tránh mô hình chỉ dựa vào một chỉ số, vì nó không phản ánh được những đánh đổi vốn có của năng suất. Thứ hai, đo mọi kết quả cần quan tâm và dùng nhiều chỉ số cho mỗi kết quả; khi hai chỉ số cùng đo tốc độ lại đi ngược chiều nhau, đó chính là tín hiệu đáng điều tra. Thứ ba, cẩn trọng với động cơ mà việc đo lường tạo ra: khi một thước đo trở thành mục tiêu, nó không còn là thước đo tốt. Thứ tư, bao quát đủ ba khía cạnh tốc độ, sự thuận tiện và chất lượng thay vì chỉ chăm chăm vào một khía cạnh. Thứ năm, kết hợp dữ liệu từ hệ thống với dữ liệu khảo sát do kỹ sư tự báo cáo.

Bài viết khép lại bằng vài lời nhắc thực tế. Nhóm nhỏ, vừa đủ ngồi trong một phòng họp, thì không cần đo năng suất mà chỉ cần ngồi lại trao đổi. Nhóm lớn hơn nên bắt đầu bằng khảo sát, vì khảo sát giúp nắm được trải nghiệm chung của kỹ sư. Cuối cùng, luôn xác định rõ lý do đo lường trước khi chọn bất kỳ chỉ số nào.

## [In defense of ruthless managers](https://www.seangoedecke.com/ruthless-managers/)

Sean Goedecke chia người quản lý kỹ thuật thành hai kiểu: người giàu đồng cảm, gắn bó về mặt cảm xúc và sẵn sàng đấu tranh cho nhân viên, và người "lạnh lùng", coi nhiệm vụ chính là truyền đạt nhu cầu của công ty tới kỹ sư và ngược lại. Tác giả thừa nhận có một người sếp đồng cảm nhìn chung là điều tốt, nhưng cho rằng kiểu lạnh lùng đang bị đánh giá thấp vì năm lý do. Họ vẫn muốn kỹ sư hạnh phúc, bởi kỹ sư vui vẻ làm việc tốt hơn, dễ quản lý hơn và gắn bó lâu hơn. Họ thường tích lũy được nhiều vốn chính trị với cấp trên, trong khi người quản lý đồng cảm liên tục phản đối cấp trên nên dễ cạn vốn đúng lúc cần đề xuất thăng chức cho bạn. Họ ít bị dằn vặt bởi các quyết định khó, nên không buồn bã hay xao nhãng. Họ thường giao tiếp thẳng thắn, không làm nhẹ tin xấu hay chỉ nhắc lại quan điểm chính thức của công ty, dù đôi khi lại sẵn sàng nói dối hoặc giấu bớt sự thật để tự bảo vệ. Cuối cùng, họ dễ đoán vì luôn làm theo ưu tiên của cấp trên và công ty.

Tác giả nhấn mạnh các lập luận này chỉ đúng với người quản lý có năng lực trong một công ty tương đối lành mạnh. Một người vừa kém năng lực vừa lạnh lùng là công thức cho sự tàn phá, và nếu được chọn thì phần lớn chúng ta vẫn nên chọn người đồng cảm. Nhưng vì thường không được chọn sếp, hiểu ưu điểm của cả hai kiểu vẫn giúp ta làm việc hiệu quả hơn.

## [AI ambivalence](https://nolanlawson.com/2025/04/02/ai-ambivalence/)

Nolan Lawson có bằng thạc sĩ ngôn ngữ học tính toán, từng học cùng những người sau này viết bài báo nổi tiếng về "con vẹt ngẫu nhiên", nhưng rời lĩnh vực AI vì chán cách tiếp cận thuần thống kê và thích viết mã hơn. Suốt nhiều năm ông né tránh AI tạo sinh: vừa hoài nghi khả năng tiến gần AGI, vừa khó chịu vì các trợ lý gợi ý mã bắt ông liên tục đọc mã thay vì viết. Đến năm 2025, khi dường như cả ngành đã dùng AI, ông thử Claude và Claude Code và thừa nhận công cụ này mạnh hơn nhiều so với kỳ vọng: truy vấn một kho mã lớn, sinh kiểm thử đơn vị hay tái cấu trúc hàng loạt lời gọi hàm theo một mẫu mới đều nhanh đến kinh ngạc. Vấn đề là nó rút cạn niềm vui lập trình. Ông thấy bản thân như người trông trẻ, đọc hàng đống mã do máy sinh ra để tìm lỗi, và cám dỗ lớn nhất là bỏ luôn việc đọc để buông theo "vibe coding".

Tác giả không đưa ra kết luận, chỉ mô tả trạng thái lưỡng lự. Ông vẫn dùng AI cho những việc ít rủi ro như bản thử nghiệm và kiểm thử đơn vị, nhưng ghét cách chúng chiếm lĩnh ngành phần mềm và thông điệp "bạn chỉ là bản phái sinh" mà theo Ezra Klein, AI tạo sinh ngầm gửi đi. Ông cân nhắc giữa việc thích nghi và việc tiếp tục mài giũa kỹ năng lập trình để sau này gỡ lỗi những hệ thống "vibe coding" khi chúng sập trên môi trường thật, và thừa nhận không ai thật sự biết điều gì sẽ xảy ra.

## [Use Abstraction to Improve Function Readability](https://testing.googleblog.com/2023/09/use-abstraction-to-improve-function.html)

Bài viết thuộc loạt Code Health của Google Testing Blog, do Palak Bansal và Mark Manley thực hiện, so sánh hai phiên bản của hàm `createPizza` viết bằng Go. Phiên bản đầu dồn mọi thứ vào một hàm: chuẩn bị đế bánh và nhân, dùng vòng lặp chờ lò đạt nhiệt độ, nướng bánh, rồi đóng hộp và cắt bánh. Phiên bản sau chỉ gồm ba lời gọi `prepare`, `bake` và `box`; mỗi hàm này lại ủy thác cho các hàm cấp thấp hơn như `addToppings` hay `heatOven`, cho đến khi gặp hàm chỉ xử lý chi tiết triển khai mà không cần gọi hàm nào khác. Phiên bản thứ hai dễ hiểu hơn vì phiên bản đầu trộn lẫn nhiều mức trừu tượng: chi tiết cấp thấp như cách làm nóng lò, bước trung gian như nướng bánh, và ý đồ cấp cao là chuẩn bị, nướng rồi đóng hộp.

Lời khuyên rút ra là đừng trộn nhiều mức trừu tượng trong cùng một hàm, mà hãy lồng các hàm có cùng mức trừu tượng để mã nguồn kể một câu chuyện từ trên xuống, với tên hàm trực quan. Phong cách tự mô tả này giúp mã dễ theo dõi, dễ gỡ lỗi và dễ tái sử dụng hơn; các tác giả gợi ý đọc thêm cuốn Clean Code của Robert C. Martin để tìm hiểu sâu hơn.

## [How Apple Pay Handles 41 Million Transactions a Day Securely](https://newsletter.systemdesign.one/p/how-does-apple-pay-work)

Neo Kim giải thích kiến trúc Apple Pay qua câu chuyện một du khách dùng iPhone chạm để qua cổng tàu điện ngầm ở London, kèm lưu ý rằng bài viết dựa trên tìm hiểu cá nhân và có thể khác với cách triển khai thực tế. Khi người dùng thêm thẻ vào Apple Wallet, Apple không lưu thông tin thẻ trên iPhone hay máy chủ của Apple mà gửi dữ liệu thẻ cùng siêu dữ liệu thiết bị, dưới dạng mã hóa, đến mạng thanh toán như Visa hoặc MasterCard. Mạng thanh toán xác minh thẻ rồi tạo số tài khoản thiết bị (DAN), một số ngẫu nhiên không thể đảo ngược, gắn riêng với từng cặp thẻ và iPhone, được cất trong secure element, một con chip chuyên biệt không ai truy cập được. Khi thanh toán, đầu đọc gửi thông tin giao dịch sang iPhone qua NFC; người dùng xác thực bằng Touch ID hoặc Face ID, và dữ liệu sinh trắc học chỉ nằm trong secure enclave, một bộ xử lý tách biệt, nên không bao giờ rời khỏi máy.

Tiếp đó, secure element kết hợp DAN với chi tiết giao dịch để tạo một cryptogram, giống như mật khẩu dùng một lần theo thời gian, rồi gửi yêu cầu cấp phép đi mà không kèm DAN. Mạng thanh toán tự tạo lại cryptogram từ bản sao DAN để đối chiếu, sau đó trả về mã phản hồi cùng một cryptogram phản hồi để phía thiết bị kiểm tra ngược lại. Nhờ dựa trên đặc tả thanh toán không tiếp xúc EMV, Apple Pay vẫn hoạt động khi điện thoại không có kết nối mạng và an toàn hơn thẻ vật lý vì không để lộ số thẻ cho bất kỳ ai.

## [Four Kinds of Optimisation](https://tratt.net/laurie/blog/2023/four_kinds_of_optimisation.html)

Laurence Tratt mở đầu bằng hai nhận xét: con người thường lạc quan quá mức khi tin rằng có thể dễ dàng biết chương trình tốn thời gian ở đâu, và biết cách tăng tốc phần chạy chậm. Lời giải cho vế đầu là đo đạc hiệu năng kỹ lưỡng; vế sau có bốn hướng, mỗi hướng kèm những đánh đổi riêng. Dùng thuật toán tốt hơn đòi hỏi hiểu ngữ cảnh: sắp xếp chọn nhanh gấp ba sắp xếp nổi bọt trên dữ liệu ngẫu nhiên nhưng chậm hơn hẳn trên dữ liệu đã sắp xếp, còn thuật toán nhanh tự cài đặt thường có lỗi. Dùng cấu trúc dữ liệu tốt hơn, chẳng hạn danh sách đã sắp xếp kết hợp tìm kiếm nhị phân cho dữ liệu không đổi, hoặc thu gọn kích thước struct khi chương trình cấp phát chúng với số lượng lớn. Dùng hệ thống cấp thấp hơn: viết lại bằng Rust nhanh gấp 60 lần, nhưng chỉ cần chạy bằng PyPy thay cho CPython đã nhanh gấp 4 lần mà gần như không tốn công. Cuối cùng là chấp nhận lời giải kém chính xác hơn, gồm lời giải có thể chưa tối ưu như tìm kiếm cục bộ, và lời giải có thể sai như Bloom filter, nén JPEG hay học máy.

Tác giả ít ưa việc viết lại bằng ngôn ngữ cấp thấp nhất vì tỷ lệ lợi ích trên chi phí thường kém, và ông luôn thử mẹo đơn giản trước. Ông rút ra ba bài học xuyên suốt: chọn cách tối ưu ít phức tạp nhất đủ đạt hiệu năng cần thiết vì ít sinh lỗi nhất; thời gian của con người rất đáng giá; và hiểu biết rộng về tối ưu hóa quan trọng hơn hiểu biết sâu.

## [The Fifth Kind of Optimisation](https://tratt.net/laurie/blog/2025/the_fifth_kind_of_optimisation.html)

Trong bài tiếp nối, Laurence Tratt thừa nhận đã bỏ sót một kỹ thuật mà chính ông dùng thường xuyên: song song hóa. Khi chuyển trình dựng website viết bằng Rust sang xử lý các trang song song bằng đa luồng, thời gian dựng ở chế độ "quick" giảm từ khoảng 0,6 giây xuống dưới 0,3 giây, còn chế độ "deploy" nhanh hơn hơn 3 lần. Bộ công cụ kiểm thử lang_tester do ông viết chạy các bài kiểm thử song song, giúp một bộ kiểm thử trên máy chủ 72 lõi chỉ mất 2,5 giây thay vì 37 giây. Theo tác giả, hiệu năng tốt hơn ở đây còn làm tăng hiệu quả làm việc của lập trình viên.

Ông lý giải vì sao từng quên kỹ thuật này. Một là phần cứng: CPU đa lõi phổ thông chỉ xuất hiện khoảng năm 2005 và phải nhiều năm sau mới lập trình được một cách đáng tin cậy, khi mô hình bộ nhớ của x86 và Arm được làm rõ. Hai là ngôn ngữ: Java chỉ có mô hình bộ nhớ đủ tốt từ JSR 133 năm 2004, C phải đến năm 2011, và lập trình đa luồng rất dễ gặp lỗi như mất lượt ghi hay trình biên dịch loại bỏ lệnh ghi không được đồng bộ. Các ngôn ngữ chỉ dùng dữ liệu bất biến hoặc mô hình actor tránh được phần lớn rắc rối nhưng thường chậm. Rust thay đổi điều đó nhờ hai trait `Send`, `Sync` và quy tắc sở hữu: tác giả chưa gặp lỗi tranh chấp dữ liệu nào, dù vẫn còn vài điểm vướng như phải dùng `clone` hay deadlock khó hiểu với mutex. Giờ đây ông nghĩ đến cách song song hóa ngay từ đầu.

## Bonus: Vài ảnh hay ho đến từ [ByteByteGo](https://bytebytego.com/)

![REST API Design Best Practices](https://substack-post-media.s3.amazonaws.com/public/images/4036e9a7-f2b6-476c-ad5d-48916db3b610_1309x1536.gif)
![How to Learn Backend Development?](https://substack-post-media.s3.amazonaws.com/public/images/2a933717-1d59-46a6-ba51-76e24ae048fc_1280x1502.gif)
![The Simplified Git Workflow](https://substack-post-media.s3.amazonaws.com/public/images/b9397d70-0232-4a8b-8b3e-edd4c15eb9bb_800x939.gif)
![Virtualization vs Containerization](https://substack-post-media.s3.amazonaws.com/public/images/1bc9340f-de4f-4767-b2f8-f4c6529e9eea_1309x1536.gif)
![How Netflix Built a Distributed Counter?](https://substack-post-media.s3.amazonaws.com/public/images/1e7afaab-de4b-4604-a557-22974fb2e3ea_1280x1532.gif)

## Bonus 2: Vài video hay ho đến từ [ByteByteGo](https://bytebytego.com/)

[Why Everyone's Talking About MCP?](https://www.youtube.com/watch?v=_d0duu3dED4)

---

*Bài viết đã được viết lại bởi Claude Code với Opus 5.5 vào ngày 27/09/2026.*
