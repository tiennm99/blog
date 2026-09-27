---
title: "Newsletter #29"
date: 2025-05-16
tags: ["AI-Assisted", "Technology", "Process Optimization", "AI", "Cloud Computing", "Career Development", "Productivity", "Software Development"]
categories: ["Newsletter"]
draft: false
---

*Chào mừng bạn đến với Newsletter #29 - Tổng hợp tin tức công nghệ hôm nay.*

## [A Clean Approach to Process Optimization](https://queue.acm.org/detail.cfm?id=3722546)

Thomas A. Limoncelli bắt đầu bài viết bằng một ví dụ rất đời thường: cách ông sắp xếp lại việc rửa bát ở nhà. Thay vì đợi đến lúc bắt đầu chu kỳ rửa mới cho bột giặt vào máy, ông làm việc đó ngay sau khi lấy bát đĩa sạch ra. Chỉ bằng cách đổi thứ tự các bước, công việc trở nên trơn tru hơn mà không cần thêm công sức. Tác giả sau đó áp dụng đúng tư duy này vào quy trình tiếp nhận khách hàng mới tại công ty, rút thời gian chờ từ vài ngày xuống chỉ còn vài phút.

Ý tưởng cốt lõi là chia quy trình thành hai giai đoạn. Giai đoạn chậm gồm những tác vụ chung, có thể làm sẵn trước khi có đơn hàng; giai đoạn nhanh chỉ xử lý phần tùy chỉnh cụ thể sau khi đơn hàng đến. Song song với đó, hãy rà soát lại các tác vụ tùy chọn, vì nhiều khi chúng không thực sự cần thiết hoặc có thể làm theo cách hiệu quả hơn. Với lập trình viên trẻ, đây là một bài học hữu ích: cách tiếp cận này áp dụng được cho quy trình triển khai phần mềm, cấp phát hạ tầng lẫn nhiều lĩnh vực khác, giúp cải thiện cả hiệu năng lẫn chất lượng dịch vụ.

---

## [Microsoft's Original Source Code Released for 50th Anniversary](https://www.gatesnotes.com/microsoft-original-source-code)

Nhân dịp Microsoft tròn 50 tuổi, Bill Gates công bố mã nguồn gốc của Altair BASIC, sản phẩm đầu tiên của công ty, và gọi đó là đoạn mã "thú vị nhất" ông từng viết. Câu chuyện bắt đầu từ trang bìa tạp chí Popular Electronics tháng 1/1975 giới thiệu máy tính Altair 8800 của hãng MITS. Gates và Paul Allen liên hệ với nhà sáng lập Ed Roberts, nói rằng họ đã có sẵn một phiên bản BASIC cho con chip của Altair, dù thực tế chưa hề viết dòng nào. Hai người chọn xây dựng một trình thông dịch (interpreter) thay vì trình biên dịch, vì cách chạy từng dòng giúp người mới học nhận phản hồi ngay và sửa lỗi dễ hơn.

Do không có chip Intel 8080, Allen viết chương trình giả lập nó trên máy PDP-10 của Harvard, Gates viết phần lõi, còn Monte Davidoff đảm nhận gói xử lý toán học. Sau khoảng hai tháng làm việc ngày đêm, họ phải nén toàn bộ trình thông dịch vào chỉ 4 KB bộ nhớ bằng các cấu trúc dữ liệu gọn và thuật toán hiệu quả, vì bộ nhớ khi ấy còn đắt hơn cả chiếc máy. Buổi trình diễn thành công, MITS mua bản quyền, và Micro-Soft ra đời. Với lập trình viên hôm nay, đây là minh chứng sinh động cho việc tối ưu khi tài nguyên phần cứng cực kỳ hạn chế; chi tiết hơn được kể trong cuốn hồi ký "Source Code" của Gates.

---

## [No code is dead. Long live vibe coding](https://kenneth.io/post/no-code-is-dead-long-live-vibe-coding)

Kenneth Auchenberg đưa ra một nhận định thẳng thắn: năm 2025, no-code đã chết. Suốt một thập kỷ, các nền tảng no-code và low-code hứa hẹn sẽ dân chủ hóa việc tạo ra phần mềm, nhưng không nền tảng nào thực sự bứt phá hay thay thế được lập trình truyền thống. Thay vào đó, một thế hệ công cụ mới dựa trên AI và mô hình ngôn ngữ lớn đang nổi lên, gọi là "vibe coding". Những cái tên như Bolt, Lovable hay v0 cho thấy việc viết mã nguồn thực thụ, đủ chất lượng cho môi trường production, từ mô tả bằng ngôn ngữ tự nhiên không chỉ khả thi mà còn tốt hơn các trình soạn thảo kéo-thả WYSIWYG.

Theo tác giả, người dùng hóa ra không muốn "ít mã nguồn hơn", mà muốn một cách tốt hơn để viết mã nguồn. Họ không muốn bị khóa vào môi trường chạy độc quyền; họ muốn có mã nguồn thật, toàn quyền kiểm soát, tự do chỉnh sửa và triển khai ở bất cứ đâu. Thế hệ trước như Webflow hay Retool gói trọn trình soạn thảo, hosting, môi trường chạy và thành phần giao diện trong một hệ thống đóng. Giờ đây, mô hình ngôn ngữ lớn có thể sinh mã React gọn gàng, tuân theo tiêu chuẩn mở và thực hành tốt của ngành, rồi triển khai lên hạ tầng mở. Tác giả gọi đây là sự "tháo gỡ" (unbundling) của no-code.

---

## [Simple, scalable, and global: Containers are coming to Cloudflare Workers in June 2025](https://blog.cloudflare.com/cloudflare-containers-coming-2025/)

Cloudflare công bố sẽ mở bản beta công khai của Containers vào cuối tháng 6/2025. Workers vốn là cách đơn giản nhất để đưa phần mềm ra toàn cầu, nhưng có những việc chúng không đảm đương được: chạy mã do người dùng tạo ra bằng bất kỳ ngôn ngữ nào, chạy công cụ dòng lệnh cần môi trường Linux đầy đủ, dùng nhiều GB bộ nhớ hay nhiều nhân CPU, hoặc chuyển ứng dụng từ AWS, GCP, Azure sang mà không phải viết lại. Containers ra đời để lấp khoảng trống đó. Chỉ với vài dòng cấu hình Wrangler và lệnh `wrangler deploy`, container được khởi động theo yêu cầu tại vị trí gần người dùng nhất, tự ngủ sau thời gian chờ có thể cấu hình, và hỗ trợ tự động mở rộng theo mức sử dụng CPU.

Điểm khác biệt nằm ở kiến trúc: mỗi container được quản lý bởi một Durable Object đóng vai trò "sidecar" lập trình được, cho phép khởi động, dừng, chạy lệnh và theo dõi trạng thái container ngay trong mã nguồn. Nhờ vậy, Workers có thể làm API Gateway, Service Mesh hoặc bộ điều phối cho các container mà không cần viết Kubernetes operator hay cấu hình control plane phức tạp. Về chi phí, người dùng chỉ trả tiền cho thời gian container thực sự chạy, với mức giá tính theo vCPU, bộ nhớ và ổ đĩa mà Cloudflare so sánh là cạnh tranh với Google Cloud Run. Bài học rút ra: hãy xử lý phần lớn yêu cầu bằng Workers nhẹ và rẻ, chỉ dùng container cho những tác vụ nặng thực sự cần đến.

---

## [The types of companies you can work for and what they do for your career](https://www.elenaverna.com/p/the-types-of-companies-you-can-work)

Elena Verna khuyên nên chọn nơi làm việc có chủ đích thay vì chạy theo chức danh hay mức lương. Bà chia công ty thành sáu kiểu. "Kỳ lân" (Unicorns) là các công ty tăng trưởng khoảng 100% mỗi năm như Miro hay Figma thời đầu: tốc độ chóng mặt, dễ kiệt sức, nhưng kinh nghiệm ở đây mở ra rất nhiều cánh cửa. "Tàu chở dầu" (Tankers) như Google, Apple, Microsoft vận hành bài bản, lương cao, nhiều tài nguyên đào tạo, rất hợp để bắt đầu sự nghiệp, dù vai trò chuyên biệt hóa cao và tiến độ chậm. "Người khổng lồ suy thoái" (Declining Giants) liên tục tái cơ cấu; áp lực kết quả lớn nhưng cơ hội thăng tiến nhanh. "Chế độ sinh tồn" (Survival Mode) là các startup chưa tìm ra sản phẩm phù hợp thị trường: tự chủ cao, kỹ năng rộng, nhưng rủi ro lớn và tác giả không khuyên người mới vào nghề chọn.

Hai kiểu còn lại là "Công ty lối sống" (Lifestyle Boats), thường tự chủ tài chính, có lãi và tăng trưởng bền vững như Basecamp, rất tốt cho người mới nhờ môi trường có hỗ trợ; và "Hướng tới xã hội" (Social Good Seekers), nơi tác động xã hội được đặt trên doanh thu, lương có thể thấp hơn nhưng sự hài lòng cao. Để nhận diện một công ty, hãy hỏi về số nhân sự, tốc độ tăng trưởng doanh thu ba năm gần nhất và công ty còn bao lâu trước khi phải gọi vốn tiếp. Đồng thời, hãy tự hỏi mình chịu được bao nhiêu thay đổi và áp lực, có cần vai trò rõ ràng không, và ưu tiên tài chính hiện tại là gì.

---

## [How to Create a Chain Reaction of Good Habits](https://jamesclear.com/domino-effect)

James Clear, tác giả cuốn "Atomic Habits", giải thích Hiệu ứng Domino: khi bạn thay đổi một hành vi, nó sẽ kích hoạt chuỗi phản ứng làm thay đổi cả những hành vi liên quan. Ông kể câu chuyện của Jennifer Dukes Lee, người suốt hơn hai mươi năm không dọn giường; sau bốn ngày liên tiếp làm việc đó, bà tiện tay gấp quần áo, rửa bát rồi sắp xếp lại tủ bếp. Một nghiên cứu năm 2012 của Đại học Northwestern cũng cho thấy khi mọi người giảm thời gian ngồi một chỗ, họ tự nhiên ăn ít chất béo hơn dù không ai yêu cầu. Hiệu ứng này đúng cả với thói quen xấu, chẳng hạn kiểm tra điện thoại dẫn đến lướt mạng xã hội rồi trì hoãn thêm hai mươi phút.

Theo tác giả, hiệu ứng xảy ra vì các thói quen hằng ngày liên kết chặt chẽ với nhau, và vì nguyên tắc cam kết và nhất quán: khi đã cam kết dù rất nhỏ, ta có xu hướng giữ lời vì thấy điều đó khớp với hình ảnh bản thân. Để chủ động tạo ra chuỗi domino tốt, hãy bắt đầu bằng việc nhỏ mà bạn có động lực nhất và làm đều đặn, tận dụng đà hoàn thành một việc để chuyển ngay sang việc tiếp theo, và khi gặp khó thì chia nhỏ mọi thứ, tập trung vào tiến trình thay vì kết quả. Điều thú vị là hiệu ứng này không chỉ tạo ra hành vi mới mà còn thay đổi niềm tin: mỗi quân domino đổ xuống giúp bạn tin vào một phiên bản mới của bản thân và xây dựng thói quen dựa trên bản sắc.

---

## [The Post-Developer Era](https://www.joshwcomeau.com/blog/the-post-developer-era/)

Hai năm sau bài "The End of Front-End Development" viết lúc GPT-4 ra mắt, Josh W. Comeau nhìn lại xem liệu chúng ta đã bước vào kỷ nguyên "hậu lập trình viên" chưa. Câu trả lời là chưa. Con số "AI viết hơn 25% mã nguồn tại Google" dễ gây hiểu lầm, vì AI không làm việc độc lập mà luôn có lập trình viên giỏi cầm lái, định hướng và chỉnh sửa. Còn Devin, công cụ tự nhận có thể thay thế lập trình viên, chỉ hoàn thành 3 trên 20 nhiệm vụ khi một nhóm thử nghiệm thực tế. Tác giả dùng Cursor với Claude Sonnet và thấy nó rất ấn tượng, nhưng ví nó như chế độ ga tự động: nếu buông tay lái, xe sẽ dần trôi khỏi làn. Người không biết lập trình sẽ không nhận ra những lỗi tinh vi và cuối cùng bị kẹt với một mớ mã nguồn khó bảo trì.

Thị trường việc làm vẫn khó khăn, nhưng theo tác giả nguyên nhân chủ yếu là lãi suất cao, làn sóng sa thải ở các công ty lớn và niềm tin sai rằng AI sắp khiến lập trình viên trở nên thừa thãi, chứ không phải AI đã thực sự thay thế con người. Ông cũng lo ngại thế hệ mới dễ sa vào "vibe coding", liên tục bấm chấp nhận thay đổi mà không hiểu mã nguồn. Ngược lại, nếu dùng AI chủ động như một gia sư riêng, đây là thời điểm tốt nhất để học lập trình, và một "thời kỳ phục hưng" cho lập trình viên sẽ đến khi các công ty nhận ra AI là công cụ tăng sức mạnh chứ không phải thay thế.

---

## [Everything Wrong With Model Context Protocol (MCP)](https://blog.sshh.io/p/everything-wrong-with-mcp)

Shrivu Shankar phân tích những lỗ hổng và hạn chế của Model Context Protocol, tiêu chuẩn để kết nối công cụ và dữ liệu bên thứ ba với các trợ lý AI như Claude, ChatGPT hay Cursor. Về bảo mật giao thức, phiên bản đầu không định nghĩa cơ chế xác thực và bản đặc tả sau đó lại bị chê phức tạp; máy chủ MCP chạy cục bộ qua stdio tạo đường tắt để người dùng ít kinh nghiệm tải và chạy mã độc; nhiều máy chủ còn tin tưởng đầu vào và thực thi luôn. Về trải nghiệm, MCP không phân biệt mức độ rủi ro giữa công cụ đọc nhật ký và công cụ xóa tệp, không kiểm soát chi phí token, và chỉ trả về dữ liệu không có cấu trúc.

Nghiêm trọng hơn là bảo mật của chính mô hình ngôn ngữ. Mô tả công cụ thường được đưa vào system prompt nên có quyền lớn để chi phối agent; máy chủ có thể âm thầm đổi tên và mô tả công cụ sau khi người dùng đã chấp thuận, và dữ liệu kéo về từ bên thứ tư, như một dòng trong cơ sở dữ liệu, có thể chứa prompt injection. Việc tổng hợp dữ liệu dễ dàng còn giúp nhân viên suy ra thông tin nhạy cảm từ những gì vốn được phép xem. Cuối cùng, độ tin cậy của mô hình giảm khi có quá nhiều công cụ, và bộ công cụ đơn giản kiểu liệt kê hay đọc tệp không đủ cho những truy vấn mà người dùng kỳ vọng. Tác giả kết luận rằng cần cùng lúc một giao thức an toàn mặc định, ứng dụng biết bảo vệ người dùng và người dùng hiểu rõ lựa chọn của mình.

---

*Bài viết đã được viết lại bởi Claude Code với Opus 5.5 vào ngày 27/09/2026.*
