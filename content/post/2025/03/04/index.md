---
title: "Newsletter #5"
date: 2025-03-04
tags: ["AI-Assisted", "Newsletter", "Java", "Reliability", "Soft Skills", "Engineering Career", "AI Coding"]
categories: [ "Newsletter" ]
---

<i>
Chào các bạn, cuối tuần rồi MiTi hơi lười nên không lên bài. Mời các bạn thưởng thức Newsletter #5 nhé!
</i>

## [5 Advanced Java Reflection Techniques for Dynamic Programming](https://dev.to/nithinbharathwaj/5-advanced-java-reflection-techniques-for-dynamic-programming-4ph1)

Bài viết giới thiệu năm kỹ thuật xử lý động trong Java: truy cập thành phần riêng tư, tạo đối tượng từ tên lớp, đọc annotation, tạo đối tượng đại diện qua `Proxy` và thao tác bytecode bằng ByteBuddy. Reflection giúp kiểm tra kiểu, đọc hoặc ghi trường và gọi phương thức khi chương trình chạy; còn tạo hay sửa bytecode là khả năng của thư viện bổ sung, không phải chính Reflection API.

Các ví dụ gợi ý cách xây dựng phần mở rộng, xử lý siêu dữ liệu và bổ sung hành vi như ghi nhật ký. Tuy nhiên, `setAccessible(true)` vẫn chịu ràng buộc của hệ thống module, nên không bảo đảm truy cập được mọi thành phần riêng tư. Annotation cũng không tự chặn mọi lời gọi: ví dụ cần mã đọc annotation và chủ động gọi phương thức. `Proxy` của JDK hoạt động qua giao diện; ví dụ ByteBuddy tạo lớp con và chặn các phương thức có thể ghi đè. Những cơ chế này hữu ích khi cần tính linh hoạt, nhưng cần cân nhắc tính đóng gói, khả năng bảo trì và chi phí thực thi.

## [Mistakes You Apparently Just Have to Make Yourself](https://medium.com/@mcfunley/mistakes-you-apparently-just-have-to-make-yourself-cc2dd2bfc25c)

Dan McKinley tổng hợp những sai lầm mà ông gọi là "kiến thức không thể chuyển giao": dù được khuyên can bao nhiêu lần, người ta vẫn phải tự "chạm vào bếp nóng" mới tin là nó nóng. Danh sách gồm những niềm tin rất quen thuộc trong nghề: mã nguồn tệ quá nên phải viết lại từ đầu; phần mềm khó quản lý thì thêm độ phức tạp vận hành sẽ đỡ hơn; vấn đề chưa ai gặp nên phải dùng công nghệ mới nhất; thêm các bước gọi qua mạng bằng cách nào đó sẽ làm hệ thống nhanh hơn; vận hành một hệ thống và phát triển một dự án mã nguồn mở là như nhau; tự viết lớp bọc cho một công cụ dòng lệnh sẽ tạo thêm giá trị; phần lập trình chiếm phần lớn công sức; đặt trọn niềm tin vào kiểm thử chức năng; triển khai mã nguồn bằng chính công cụ quản lý phiên bản; muốn tách biệt về logic thì phải tách biệt về vật lý; quy trình hành chính giải quyết được mọi thứ, hoặc chẳng giải quyết được gì; và hai đội dùng chung một danh từ thì nên dùng chung mã nguồn.

Mục cuối cùng mang tính tự trào: ai cũng nghĩ mình là người đầu tiên mắc cả 13 lỗi trên và tác giả đang nói về chính họ. Bài viết khép lại bằng lời quảng cáo hài hước cho startup Skyliner của tác giả, ví nó như chiếc "áo trói" giúp bạn khỏi tự làm đau bản thân. Với lập trình viên mới, đây là danh sách đáng đọc lại mỗi khi sắp đưa ra một quyết định kiến trúc lớn.

## [Service Reliability Mathematics](https://addyosmani.com/blog/service-reliability/)

Addy Osmani giải thích vì sao phần trăm thời gian hoạt động chưa phản ánh đầy đủ độ tin cậy. Với 99,9%, tổng thời gian gián đoạn khoảng 8 giờ 46 phút mỗi năm, nhưng một sự cố kéo dài và nhiều sự cố ngắn có tác động khác nhau. Thời điểm xảy ra lỗi cũng quan trọng: vài phút gián đoạn giờ cao điểm có thể gây thiệt hại lớn hơn một khoảng dài lúc ít người dùng.

Tác giả bàn về chi phí tăng thêm khi theo đuổi nhiều số 9, từ dự phòng đến tự động chuyển đổi khi có lỗi. Các ví dụ kiến trúc trong bài là định hướng, không phải công thức bảo đảm một mức độ sẵn sàng. Cũng cần tính đến lỗi tương quan, suy giảm một phần và độ trễ: phản hồi 500 ms có thể không phù hợp với một số mục đích, dù kiểm tra trạng thái vẫn báo hoạt động. Thông điệp chính là chọn mục tiêu mức dịch vụ (SLO) và ngân sách lỗi theo trải nghiệm người dùng, nhu cầu kinh doanh và khả năng vận hành của đội.

## ~~[How to write a good design document](https://grantslatton.com/how-to-design-document)~~

~~Bài viết "How to Design Document" đưa ra lời khuyên hữu ích về cách viết tài liệu thiết kế hiệu quả. Tài liệu thiết kế, theo tác giả, là một báo cáo kỹ thuật phác thảo chiến lược triển khai của một hệ thống trong bối cảnh trade-offs và constraints. Mục tiêu chính là thuyết phục người đọc (và quan trọng nhất là chính tác giả) rằng thiết kế này là tối ưu trong tình hình hiện tại.~~

~~Tác giả so sánh việc viết tài liệu thiết kế với việc viết một chứng minh toán học. Để đạt được hiệu quả cao nhất, cần tuân thủ tổ chức tốt, tương tự như tổ chức code. Người viết nên tránh tạo ra "spaghetti design docs" bằng cách đảm bảo mọi câu văn đều liên kết và dễ hiểu. Mục tiêu là không gây bất ngờ cho người đọc, giúp họ cảm thấy giải pháp rõ ràng ngay cả khi nó đòi hỏi nhiều suy nghĩ phức tạp.~~

~~Bài viết cũng nhấn mạnh tầm quan trọng của việc nắm bắt được tâm lý của người đọc và dự đoán những phản đối có thể xảy ra. Hơn nữa, cần chỉnh sửa để loại bỏ mọi từ ngữ thừa thãi, vì sự chú ý của người đọc là một nguồn tài nguyên hạn chế. Tác giả khuyến khích việc thực hành bằng cách đánh giá các tài liệu khác và chắt lọc ý tưởng thành các tweet ngắn gọn.~~

~~Cuối cùng, bài viết gợi ý tổ chức tài liệu thành các bullet point có thể tóm tắt trong một câu duy nhất và sử dụng footnote cho các chi tiết phức tạp để không làm gián đoạn mạch chính của tài liệu.~~

## [Picking your battles when you are hyper-rational](https://newsletter.weskao.com/p/picking-your-battles-hyper-rational)

Wes Kao chia sẻ một thói quen phổ biến ở những người có tư duy logic cao (hyper-rational): mải chứng minh mình "đúng về mặt kỹ thuật" mà đánh mất hiệu quả thực tế, thắng một trận nhỏ nhưng thua cả cuộc chiến. Chị minh họa bằng hai email suýt gửi đi. Ở ví dụ đầu, một nhà tuyển dụng hẹn gọi "sáng nay" trong khi giờ bên Wes đã gần 13 giờ; thay vì liệt kê mọi cách hiểu về múi giờ, chị xác nhận múi giờ và đưa ra vài khung giờ trống để chốt lịch thật nhanh. Ở ví dụ thứ hai, bộ phận tài chính của khách hàng cho biết chị không cần điền thông tin trên hệ thống thanh toán, dù chính hệ thống đó đã gửi email yêu cầu; chị suýt viết một đoạn dài giải thích vì sao bị nhầm, nhưng cuối cùng chỉ gửi đúng một câu cảm ơn vì đã làm rõ.

Bài học là đừng cố cho thấy bạn nhận ra mọi sắc thái của tình huống hay bắt lỗi cách diễn đạt của người khác, vì làm vậy vừa tốn thời gian vừa dễ khiến chính bạn trông như người gây rối. Trước khi gửi một lời giải thích, hãy tự hỏi: nó có đưa mọi người tiến gần mục tiêu hơn không, nó giúp ích cho người đọc hay chỉ chứng minh bạn đúng ở một điểm chẳng quan trọng, và bạn đang phục vụ cuộc trò chuyện hay phục vụ cái tôi. Dĩ nhiên có lúc cần làm rõ hiểu lầm, nhưng với những chuyện nhỏ, tốt hơn hết là bỏ qua và tập trung vào mục tiêu chính.

## [Measuring Programmer Influence, Kinda Sorta](https://tidyfirst.substack.com/p/measuring-programmer-influence-kinda)

Kent Beck đặt câu hỏi: liệu dữ liệu có cho biết ai đóng góp nhiều nhất trong một đội lớn? Câu trả lời thẳng thắn là không, nếu bạn cần một kết luận chắc chắn; dữ liệu chỉ gợi ý những vùng tác động nhất định. Ông cảnh báo ngay từ đầu rằng lần đầu tiên bạn thưởng, thăng chức hay sa thải dựa trên các số liệu này cũng là lần cuối chúng còn đáng tin. Phân tích lịch sử Git của dự án React, ông thấy cả số tệp mỗi người tạo ra lẫn số lần mỗi tệp bị sửa đều tuân theo phân phối Pareto: đa số chỉ tạo một tệp, trong khi một nhóm nhỏ tạo hàng trăm, hàng nghìn tệp. Ghép hai chiều lại, gồm số tệp một người tạo và số lần người khác sửa những tệp đó, biểu đồ cho thấy một đường xu hướng rõ ràng; những người ở góc trên bên phải, tức tạo ra thứ mà người khác tiếp tục xây dựng, là ứng viên có ảnh hưởng lớn.

Theo ông, cách dùng tốt là tự định vị so với đồng nghiệp, tìm người để học hỏi, phát hiện những người có tác động thực tế lớn hơn quyền hạn đang có. Cách dùng xấu là gắn số liệu với tiền thưởng, chỉ tiêu, thăng chức hay sa thải. Dữ liệu cũng có hạn chế: nhiều đóng góp quan trọng không đo được bằng con số, và người gắn bó lâu với dự án tự nhiên có điểm cao hơn. Kết luận của bài là luôn nhớ mục tiêu thực sự là tạo ra tác động, và luôn kiểm tra lại kết quả, vì lập trình với dữ liệu cũng là lập trình.

## [Building personal software with Claude](https://blog.nelhage.com/post/personal-software-with-claude/)

Nelson Elhage kể lại việc dùng Claude để chuyển một phần gói obsidian.el của Emacs sang Rust, giúp thời gian chạy giảm hơn 1000 lần (trong một trường hợp cụ thể, từ 90 giây xuống khoảng 15ms) mà gần như không phải tự viết dòng mã nguồn nào. Vấn đề nằm ở hàm `obsidian-update`, vốn quét lại toàn bộ kho ghi chú bằng elisp nên ngày càng chậm. Chỉ với một prompt, Claude đọc khoảng 1000 dòng Emacs Lisp, xác định khoảng 200 dòng liên quan rồi viết chương trình Rust xuất siêu dữ liệu dạng JSON; mã nguồn biên dịch và chạy đúng ngay lần đầu. Sau đó Claude viết tiếp phần elisp dùng cơ chế "advice" để vá obsidian.el, chỉ gặp một lỗi nhỏ và sửa rất nhanh. Toàn bộ dự án mất khoảng một buổi chiều. Dù làm việc tại Anthropic, tác giả vốn chỉ kỳ vọng Claude như một Stack Overflow tốt hơn.

Từ trải nghiệm này, tác giả rút ra vài suy ngẫm. Công cụ và giao diện xung quanh LLM đang tụt hậu so với năng lực thực của mô hình. Anh cũng nhận ra bản thân tự nhiên chia bài toán theo những ranh giới giao tiếp rõ ràng, dễ kiểm thử: con người lo phân rã hệ thống, còn Claude làm phần việc "ở giữa". Quan trọng nhất, mã nguồn giờ rẻ hơn bao giờ hết, nhưng sự thấu hiểu, kiến trúc và thiết kế tốt lại càng quý; có lẽ viết mã nguồn dễ xóa sẽ trở nên quan trọng để có thể nhờ LLM viết lại từ đầu khi cần. Anh cũng tìm lại niềm vui xây dựng phần mềm nhỏ cho bản thân, khi Claude gánh được những việc nhàm chán.

## Bonus: Vài ảnh hay ho đến từ [ByteByteGo](https://bytebytego.com/)

![Git vs GitHub](https://substack-post-media.s3.amazonaws.com/public/images/1112c07d-db40-484e-917b-0071ed7cf354_1280x1532.gif)
![A Cheatsheet on Database Performance](https://substack-post-media.s3.amazonaws.com/public/images/5fd8bdda-52dd-454f-be79-ad548f17810b_1280x1557.gif)
![18 Common Ports Worth Knowing](https://substack-post-media.s3.amazonaws.com/public/images/35ae3f82-afa0-47b9-a2a0-58b6c6d8cfb1_1280x1476.gif)

---

*Bài viết đã được viết lại bởi Claude Code với Opus 5.5 vào ngày 27/09/2026; được review và chỉnh sửa bởi Codex với GPT 6.1 Sol vào ngày 09/11/2026.*
