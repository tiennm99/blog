---
title: "Newsletter #37"
date: 2025-07-26
tags: [ "AI-Assisted", "DevOps", "WebSockets", "Developer Experience", "Git" ]
categories: [ "Newsletter" ]
---

*Mời bạn thưởng thức Newsletter #37.*

## [Đã đến lúc nên cho Nix một cơ hội](https://maych.in/blog/its-time-to-give-nix-a-chance/)

Nix là một trình quản lý gói hàm số (functional package manager) mang đến khả năng tái tạo môi trường phát triển hoàn toàn chính xác. Khác với các trình quản lý gói truyền thống, Nix lưu trữ các gói trong `/nix/store` với đường dẫn duy nhất được tạo ra từ mã băm mật mã học, đảm bảo tính bất biến và loại bỏ hoàn toàn xung đột phụ thuộc.

Điểm mạnh chính của Nix nằm ở khả năng cô lập gói hoàn toàn - nhiều phiên bản phần mềm có thể tồn tại song song mà không ảnh hưởng lẫn nhau. Mỗi gói đều chứa toàn bộ cây phụ thuộc của mình, giúp giải quyết vấn đề "hôm qua còn chạy được mà". Về bảo mật, kho lưu trữ bất biến ngăn chặn việc chỉnh sửa tệp nhị phân, sandbox trong quá trình xây dựng gói, và cấu trúc hệ thống tệp không chuẩn làm giảm các vector tấn công truyền thống.

Tuy nhiên, Nix cũng có những thách thức không nhỏ. Đường cong học tập khá dốc do cần hiểu các khái niệm lập trình hàm phức tạp, việc debug rất khó khăn, và đòi hỏi đầu tư thời gian ban đầu đáng kể. Tác giả khuyến nghị Nix đặc biệt phù hợp với các nhóm có môi trường phát triển phức tạp, phát triển đa nền tảng, dự án yêu cầu tuân thủ nghiêm ngặt, và nghiên cứu thử nghiệm.

**Điểm chính:**
- Môi trường tái tạo tuyệt đối với kho lưu trữ bất biến
- Cô lập gói hoàn toàn, nhiều phiên bản cùng tồn tại
- Bảo mật nâng cao nhờ sandbox và cấu trúc hệ thống tệp độc đáo
- Đường cong học tập dốc nhưng lợi ích dài hạn đáng kể

## [Bạn có thể chọn công cụ làm mình hạnh phúc](https://borretti.me/article/you-can-choose-tools-that-make-you-happy)

Lập trình viên thường ẩn giấu động lực thật sự đằng sau việc chọn công nghệ bằng cách tạo ra những lý do kỹ thuật có vẻ hợp lý. Thực tế, những quyết định này thường xuất phát từ cảm xúc và sở thích cá nhân hơn là từ những cân nhắc thuần túy về mặt kỹ thuật.

Lập trình viên chọn công nghệ dựa trên cảm giác thoải mái, sự quen thuộc, tính thẩm mỹ, hoặc thậm chí là những kết nối hoài niệm với lịch sử công nghệ. Có thể là do "vibe" của một công cụ khiến họ cảm thấy phù hợp với bản thân. Điều này hoàn toàn bình thường và có thể chấp nhận được.

Tác giả khuyến khích các lập trình viên nên thành thật với bản thân về động lực thực sự của mình. Thay vì tạo ra những lý do kỹ thuật giả tạo, hãy thừa nhận rằng việc chọn công cụ có thể đơn giản chỉ vì nó làm bạn hạnh phúc. Cuộc đời ngắn ngủi, hãy sử dụng những công cụ mang lại niềm vui và ý nghĩa trong công việc.

**Thông điệp chính:**
- Động lực cảm xúc trong việc chọn công nghệ là điều bình thường
- Hãy thành thật về lý do thực sự khiến bạn chọn một công cụ
- Được phép sử dụng công cụ "lạ" nếu nó làm bạn hạnh phúc
- Sự hài lòng cá nhân cũng quan trọng như tính thực tiễn

## [Ảo tưởng về Copilot](https://deplet.ing/the-copilot-delusion/)

Bài viết này đưa ra những phê phán sâu sắc về các trợ lý lập trình AI như GitHub Copilot và ảnh hưởng tiêu cực của chúng đến ngành phát triển phần mềm. Tác giả lập luận rằng các công cụ AI này tạo ra mã nguồn mà không có sự hiểu biết thực sự về kiến trúc hệ thống hay những phức tạp kỹ thuật sâu xa.

Vấn đề cốt lõi là việc phụ thuộc vào AI làm suy giảm kỹ năng tư duy phản biện và học hỏi của lập trình viên. Khi "gia công tư duy cho AI", chúng ta cũng đang "gia công việc học" cho chúng. Các công cụ này thiếu trực giác về hiệu năng phần cứng, quản lý bộ nhớ, và tối ưu hóa - những yếu tố then chốt trong phát triển phần mềm chất lượng cao.

Tác giả lo ngại về tác động văn hóa trong ngành kỹ thuật phần mềm, có thể tạo ra một thế hệ lập trình viên ưu tiên sản lượng nhanh hơn chất lượng, đe dọa "linh hồn hacker" và sự tò mò kỹ thuật sâu sắc. Nguy cơ là sẽ có nhiều người nghĩ mình giỏi chỉ vì bot của họ vượt qua được CI, nhưng thực tế thiếu hiểu biết căn bản.

**Mối lo ngại chính:**
- AI tạo mã mà không hiểu kiến trúc hệ thống
- Suy giảm kỹ năng tư duy phản biện của lập trình viên
- Thiếu hiểu biết về hiệu năng và tối ưu hóa
- Nguy cơ tạo ra thế hệ lập trình viên "giỏi trên giấy"

## [Tại sao Cline không lập chỉ mục mã nguồn (và đó là điều tốt)](https://cline.bot/blog/why-cline-doesnt-index-your-codebase-and-why-thats-a-good-thing)

Cline, một trợ lý lập trình AI, có cách tiếp cận khác biệt hoàn toàn so với các công cụ khác: không lập chỉ mục (indexing) mã nguồn. Bài viết giải thích lý do tại sao đây lại là một thiết kế thông minh và có lợi cho lập trình viên.

Vấn đề với việc lập chỉ mục truyền thống là nó "xé nát logic của mã nguồn". Tác giả ví việc này như cố gắng hiểu một bản giao hưởng thông qua những đoạn nhạc ngẫu nhiên 10 giây. Mã nguồn có tính kết nối cao, việc chia nhỏ theo ngữ nghĩa rất khó khăn và thường phá vỡ mối liên hệ quan trọng giữa các phần.

Hơn nữa, các chỉ mục nhanh chóng trở nên lỗi thời. Phát triển phần mềm di chuyển rất nhanh, và chỉ mục trở thành "ảnh chụp đóng băng trong thời gian", có thể không phản ánh đúng trạng thái hiện tại của mã nguồn. Điều này cũng tạo ra lỗ hổng bảo mật khi tạo ra "biểu diễn thứ cấp của tài sản trí tuệ có giá trị nhất".

Thay vào đó, Cline sử dụng phương pháp "khám phá, không truy xuất" - đọc mã "từng tệp, từng kết nối", theo cấu trúc tự nhiên của mã như một lập trình viên thực thụ. Cách này tận dụng khung ngữ cảnh rộng lớn của các mô hình ngôn ngữ hiện đại để tạo ra "ngữ cảnh chất lượng cao" thông qua việc khám phá thông minh.

**Ưu điểm của cách tiếp cận Cline:**
- Không có RAG, embeddings hay cơ sở dữ liệu vector
- Áp dụng trí tuệ trực tiếp lên mã nguồn
- Duy trì hiểu biết ngữ cảnh mà không cần lập chỉ mục bên ngoài
- Theo dõi cấu trúc mã tự nhiên như lập trình viên thực

## [Commit hoàn hảo](https://simonwillison.net/2022/Oct/29/the-perfect-commit/)

Simon Willison chia sẻ triết lý về việc tạo ra những commit Git lý tưởng, một kỹ năng quan trọng mà nhiều lập trình viên thường bỏ qua. Một commit hoàn hảo cần bao gồm bốn yếu tố chính: triển khai (implementation), kiểm thử (tests), tài liệu (documentation), và liên kết đến issue.

Về mặt triển khai, mỗi commit nên tập trung vào một thay đổi duy nhất, giữ lịch sử commit tuyến tính và đảm bảo tính nguyên tử - có thể dễ dàng review và triển khai. Kiểm thử phải được bao gồm để chứng minh rằng code hoạt động đúng, tăng năng suất và sự tự tin trong việc thay đổi mã nguồn.

Tài liệu cần được cập nhật trong cùng repository với mã nguồn, đảm bảo tính đáng tin cậy, có version, có thể review và kiểm tra được. Cuối cùng, mỗi commit nên có liên kết đến issue thread để cung cấp ngữ cảnh, bao gồm thông tin nền, quá trình ra quyết định, đoạn mã, ảnh chụp màn hình và prototype.

Willison khuyến nghị rằng thông điệp commit có thể ngắn gọn chỉ một dòng với liên kết issue, vì ngữ cảnh chi tiết tốt hơn nên đặt trong issue thread. Không phải commit nào cũng cần "hoàn hảo" - với công việc thử nghiệm, có thể sử dụng nhánh với "WIP" commits rồi squash-merge thành commit sạch và toàn diện.

**Nguyên tắc cốt lõi:**
- Một thay đổi tập trung, có kiểm thử và tài liệu
- Liên kết issue để cung cấp ngữ cảnh
- Commit nguyên tử, dễ review và triển khai
- Ưu tiên sự rõ ràng và ngắn gọn trong thông điệp

## [Khoảnh khắc Kanagawa của kỹ thuật phần mềm](https://pashabitz.substack.com/p/the-software-engineering-kawagara)

Tác giả sử dụng hình ảnh bức tranh "Sóng lớn ở Kanagawa" để miêu tả làn sóng biến đổi mạnh mẽ đang tác động đến ngành kỹ thuật phần mềm. AI và tự động hóa lập trình đang tạo ra một cuộc cách mạng không kém gì cuộc cách mạng cơ giới hóa nông nghiệp trong quá khứ.

Các trợ lý lập trình AI hiện tại đã có thể chuyển đổi mô tả tác vụ thành mã nguồn hoàn chỉnh kèm kiểm thử và tài liệu. Điều này đặc biệt ảnh hưởng đến vai trò lập trình viên junior, những người thường được giao nhiệm vụ triển khai các chức năng cụ thể theo yêu cầu chi tiết.

Thay vì chỉ tập trung vào việc viết mã, kỹ sư phần mềm cần chuyển hướng sang hiểu biết về bối cảnh sản phẩm và kinh doanh rộng hơn. Vai trò mới sẽ bao gồm: hiểu nhu cầu kinh doanh, thiết kế sản phẩm, kiến trúc hệ thống, và định nghĩa "đường ray" cùng ràng buộc cho dự án.

Tác giả khuyến nghị các kỹ sư nên học cách làm chủ công việc "đường ray": thiết lập môi trường, quản lý phụ thuộc, và hiểu cách các công cụ và nền tảng kết nối với nhau. Đây không phải là sự kết thúc của kỹ thuật phần mềm, mà là sự kết thúc của một phiên bản cụ thể của nó.

**Thông điệp chính:**
- Vai trò lập trình viên đang chuyển từ viết mã sang hiểu nghiệp vụ
- AI đang thay đổi cơ bản cách thức làm việc, không chỉ là công cụ hỗ trợ
- Cần tập trung vào kiến trúc, thiết kế sản phẩm và quản lý hệ thống
- Học cách thiết lập và quản lý "đường ray" cho dự án

## [WebSockets đảm bảo thứ tự - vậy tại sao tin nhắn của tôi lại bị xáo trộn?](https://www.sitongpeng.com/writing/websockets-guarantee-order-so-why-are-my-messages-scrambled)

Một vấn đề thú vị trong lập trình realtime: mặc dù WebSockets sử dụng TCP đảm bảo thứ tự tin nhắn, nhưng tại sao tin nhắn lại có thể xuất hiện không đúng thứ tự? Câu trả lời nằm ở việc xử lý bất đồng bộ trong JavaScript, không phải ở giao thức mạng.

Nguyên nhân chính là các thao tác bất đồng bộ như `await blob.arrayBuffer()` làm tạm dừng việc thực thi message handler. Khi các tin nhắn có thời gian xử lý khác nhau, JavaScript event loop cho phép chúng được xử lý không tuần tự. Điều này tạo ra tình huống tin nhắn đến đúng thứ tự nhưng kết quả xử lý lại bị đảo lộn.

Tác giả đề xuất hai giải pháp: Thứ nhất là sử dụng message queue với `Promise.all()` để xử lý song song nhưng vẫn giữ thứ tự kết quả. Thứ hai là dùng async generator để xử lý từng tin nhắn một cách tuần tự - chậm hơn nhưng đảm bảo thứ tự nghiêm ngặt.

Bài học quan trọng ở đây là "luôn đi sâu thêm một bước". Mặc dù TCP đảm bảo thứ tự, nhưng code ứng dụng vẫn có thể tự phá vỡ thứ tự đó. Đây là một ví dụ điển hình cho thấy hiểu biết sâu về cơ chế hoạt động của từng lớp trong hệ thống là vô cùng quan trọng.

**Điểm chính:**
- Vấn đề thứ tự không nằm ở WebSocket/TCP mà ở code xử lý bất đồng bộ
- Sử dụng message queue với Promise.all() để xử lý song song
- Dùng async generator cho xử lý tuần tự nghiêm ngặt
- Hiểu rõ từng lớp trong hệ thống để tránh giả định sai lầm

## [Tại sao các AI agent là những đối tác lập trình đôi tệ](https://justin.searls.co/posts/why-agents-are-bad-pair-programmers/)

Justin Searls đưa ra một góc nhìn thú vị về việc tại sao các AI agent lại không phù hợp cho pair programming. Vấn đề cốt lõi là các agent "viết mã nhanh hơn con người suy nghĩ", tạo ra sự mất cân bằng trong quá trình cộng tác. Tốc độ này ngăn cản việc cộng tác có ý nghĩa và có thể dẫn đến việc xây dựng "sản phẩm sai" mà không có sự giám sát của con người.

Pair programming hiệu quả đòi hỏi sự trao đổi, thảo luận và suy ngẫm chung. Khi AI agent hoạt động với tốc độ quá nhanh, nó phá vỡ bản chất cộng tác này, khiến lập trình viên trở thành người quan sát thụ động thay vì đối tác tích cực.

Tác giả đề xuất một số cách tiếp cận tốt hơn: sử dụng quy trình làm việc bất đồng bộ như GitHub's Coding Agent với review pull request, sử dụng chế độ "Edit" hoặc "Ask" thay vì chế độ "Agent" hoàn toàn tự động. Các cải tiến được đề xuất bao gồm cho phép người dùng kiểm soát tốc độ tạo mã, kích hoạt tạm dừng để làm rõ trong quá trình làm việc, và thiết kế agent với nhiều sự nghi ngờ và ý định cộng tác hơn.

Mục tiêu không phải là loại bỏ sự hỗ trợ của AI, mà là tạo ra những tương tác cân bằng và cộng tác hơn, tôn trọng quá trình nhận thức và ra quyết định của con người. Voice chat cũng được đề xuất như một cách tương tác tự nhiên hơn.

**Thông điệp cốt lõi:**
- AI agent viết mã nhanh hơn khả năng suy nghĩ của con người
- Tốc độ quá nhanh phá vỡ bản chất cộng tác của pair programming
- Cần thiết kế tương tác cân bằng, tôn trọng quá trình nhận thức con người
- Quy trình bất đồng bộ và chế độ turn-based hiệu quả hơn

---

*Bài viết đã được review và cập nhật bởi Claude Code với Opus 4.7 (1M context).*
