---
title: "Newsletter #25"
date: "2025-05-12"
tags: [ "AI-Assisted", "Software Engineering", "LLM Research", "Leadership", "Development" ]
categories: [ "Newsletter" ]
---

*Mời bạn thưởng thức Newsletter #25.*

## [The 13 software engineering laws](https://newsletter.manager.dev/p/the-13-software-engineering-laws)

Anton Zaides tổng hợp 13 "định luật" hữu ích cho cả kỹ sư lẫn quản lý kỹ thuật. Về thời gian và nhân lực: định luật Parkinson (công việc nở ra cho vừa thời gian được giao) được cân bằng bởi định luật Hofstadter (mọi thứ luôn lâu hơn dự kiến), nên ước lượng chỉ tốt lên nhờ luyện tập, giao tiếp và phạm vi linh hoạt. Định luật Brooks nhắc rằng thêm người vào dự án đang trễ thường làm nó trễ hơn. Định luật Conway cho thấy kiến trúc phản chiếu cấu trúc giao tiếp của tổ chức; Flo đã vận dụng ngược bằng cách ghép kỹ sư iOS, Android và backend vào cùng đội để phát hành 20–30 lần mỗi ngày. Định luật Cunningham gợi ý mẹo gỡ bí: tự mở pull request, dù chưa chắc đúng, để đội sở hữu nhanh chóng chỉ cách làm đúng.

Về sản phẩm và con người: định luật Sturgeon (90% mọi thứ đều dở) và Zawinski (chương trình nào cũng phình ra đến khi đọc được email) cảnh báo việc nhồi nhét tính năng, còn định luật Hyrum khiến mọi hành vi quan sát được đều có người phụ thuộc, nên gỡ tính năng rất khó. Định luật Price (một nửa công việc do căn bậc hai số người làm) và hiệu ứng Ringelmann (nhóm càng đông, mỗi người càng bớt nỗ lực) giải thích vì sao nên chia thành nhóm nhỏ có quyền sở hữu rõ ràng. Định luật Goodhart (chỉ số thành mục tiêu sẽ mất giá trị) được cân bằng bởi định luật Gilb (đo chưa hoàn hảo vẫn hơn không đo). Cuối cùng là định luật Murphy. Tác giả kết luận đây không phải định luật thật mà là những mô hình tư duy hữu ích.

---

## [The Curve is Bending: Predictions on near-term AI inference spending](https://grantslatton.com/the-curve-is-bending)

Grant Slatton, người phát triển bộ máy bảng tính Row Zero, cho rằng AI vừa vượt qua điểm uốn: giá trị tạo ra cho công việc lập trình thực tế đã lớn hơn chi phí. Chi tiêu AI của ông tăng từ 100 USD/năm (2023) lên khoảng 5.000 USD/năm (2025). Với ông, o1-pro là mô hình đầu tiên hữu ích ổn định, làm tốt ngang kỹ sư junior với tác vụ gói gọn trong một tệp, như tìm lỗi từ tệp Rust dài kèm diff và kết quả kiểm thử. Ông dùng thư viện prompt của Zed Editor để sinh các hàm bảng tính lặp lại (từ 20 phút xuống 2 phút), tự tạo nhiều công cụ dòng lệnh nhỏ dùng LLM, và dùng Claude Code viết lại toàn bộ backend trang web cá nhân, có lúc chạy ba phiên song song. Việc ước tính mất 100 giờ chỉ còn dưới 10 giờ, tốn vài trăm USD.

Ông ước tính công cụ AI hiện tăng năng suất khoảng 1,1 lần và có thể đạt 2–3 lần vào cuối 2026. Mô hình mạnh như o3-pro lúc đầu sẽ rất đắt, nhưng với kỹ sư thu nhập hơn 100 USD/giờ, ngân sách AI 10.000–50.000 USD mỗi năm là hợp lý; theo nghịch lý Jevons, giá rẻ đi chỉ làm tổng chi tiêu tăng. Ông nhận xét mô hình còn thiếu "gu" thiết kế của kỹ sư senior, dự đoán tác nhân viết mã sẽ ngang sinh viên mới tốt nghiệp vào cuối 2026, và khuyên các bạn junior sớm rèn luyện khả năng đánh giá của kỹ sư senior.

---

## [Open-Source is Just That: Understanding Boundaries in Open Source](https://vale.rocks/posts/open-source-entitlement)

Declan Chidlow lên tiếng về thái độ đòi hỏi như thể đó là quyền lợi của người dùng đối với các nhà phát triển mã nguồn mở tình nguyện. Theo tác giả, mã nguồn mở chỉ có nghĩa là mã nguồn được công khai và bạn được hưởng những quyền giấy phép cho phép; nó không mặc định là dự án nhận đóng góp, có hỗ trợ, phải đáp ứng yêu cầu tính năng hay nợ bạn thời gian, và bạn vẫn bị ràng buộc bởi giấy phép. Được dùng phần mềm đã là đặc ân chứ không phải quyền. Ông phê phán những người spam issue, đòi hỗ trợ hung hăng, những ai bênh vực họ, và nhất là các công ty kiếm lời từ mã nguồn mở mà không đóng góp lại, trong khi lẽ ra nên hỗ trợ tài chính cho người bảo trì.

Với dự án có hỗ trợ, cách xin giúp đỡ đúng mực là: tự tìm trong issue và tài liệu trước, cung cấp đủ thông tin ngay từ đầu, kiên nhẫn và lịch sự, dùng đúng kênh chính thức, và tự sửa lỗi nhỏ hoặc cải thiện tài liệu nếu có thể; kể cả khi đã trả tiền thì "tiền không thay được phép lịch sự". Ông khuyến khích cộng đồng bảo vệ người bảo trì một cách tôn trọng, người bảo trì thì nên đặt ranh giới rõ ràng, đồng thời cảnh báo việc gửi pull request hay issue do AI sinh ra thiếu suy nghĩ. Thông điệp chốt: được truy cập mã nguồn không đồng nghĩa với quyền đòi hỏi thời gian và sức lao động của người khác.

---

## [The Insanity of Being a Software Engineer](https://0x1.pt/2025/04/06/the-insanity-of-being-a-software-engineer/)

Vitor Sousa Pereira mô tả với giọng châm biếm khối lượng kiến thức ngày càng phình to mà một kỹ sư phần mềm phải gánh. Ban đầu bạn cần vài ngôn ngữ và công cụ, rồi framework riêng của công ty như Rails, Django hay Laravel, cộng thêm CSS, thứ học cả đời vẫn không hiểu vì sao bố cục bị vỡ. Khi React ra đời và các công ty không muốn thuê thêm người, vai trò full-stack xuất hiện, kéo theo TypeScript, Redux, việc cấu hình webpack, esbuild hay rollup cùng Prettier và ESLint. Rồi DevOps thay thế vị trí quản trị hệ thống, nên kỹ sư phải học thêm Docker, AWS và Terraform hoặc Pulumi. Được thăng chức lên quản lý lại là học một nghề hoàn toàn mới, như ước lượng thời hạn, giao việc, viết đặc tả, đánh giá hằng năm, và nếu công ty không lớn nhanh thì vẫn phải làm tất cả những việc cũ.

Tác giả kể một nhà tuyển dụng vừa liên hệ cho vị trí yêu cầu trình độ senior ở cả Rails, Hotwire lẫn lập trình di động native. Ông thừa nhận phần mềm phức tạp là có lý do, nhưng đặt câu hỏi sự chuyên môn hóa đã đi đâu: khi xây một ngôi nhà, có kiến trúc sư, kỹ sư xây dựng, thợ điện, thợ nước và rất nhiều nghề khác, không ai mong một người làm hết. Bài viết khép lại bằng nhận xét nửa đùa nửa thật rằng có lẽ một tương lai nơi ta dựng cả ứng dụng chỉ bằng vài câu lệnh cho AI cũng không đến nỗi tệ.

---

## [The day I taught AI to understand code like a Senior Developer](https://nmn.gl/blog/ai-understand-senior-developer)

Tác giả Namanyay cho rằng các LLM sinh mã hiện nay không thật sự hiểu codebase mà chỉ là công cụ tự động hoàn thành tinh vi: chúng quên vị trí tệp, tạo mã trùng lặp và không theo mẫu thiết kế sẵn có vì chỉ thấy cửa sổ ngữ cảnh nhỏ. Kỹ sư junior tập trung vào "cái gì" và "làm thế nào", còn senior tập trung vào "tại sao" và "nếu thì sao", nắm mô hình toàn hệ thống và lường trước tác động dây chuyền; LLM hiện hành xử giống junior hơn. Giải pháp của ông là xem codebase như đồ thị tri thức phân cấp với thuật toán Ranked Recursive Summarization (RRS): bắt đầu từ các tệp lá, xếp hạng mức độ quan trọng rồi tóm tắt dần lên thư mục cha. Vì RRS vẫn bỏ sót chi tiết, ông phát triển Prismatic RRS (PRRS), tóm tắt qua nhiều "lăng kính" như kiến trúc, luồng dữ liệu và bảo mật.

Nhờ vậy AI biết đặt tệp mới ở đâu, theo mẫu nào, mở rộng lớp trừu tượng sẵn có thay vì tạo mới, đồng thời làm lộ nợ kỹ thuật, lỗ hổng bảo mật và rút ngắn thời gian làm quen cho người mới. Ông đóng gói kỹ thuật này thành Giga AI, nhưng cũng gợi ý cách tự làm: viết tóm tắt cho thư mục và tệp quan trọng, nhờ AI cải thiện, tạo tài liệu theo từng lăng kính và đưa tệp liên quan vào ngữ cảnh. Ông tin AI nên khuếch đại sự sáng tạo của con người chứ không thay thế họ.

---

## [Why Companies Don't Fix Bugs](https://idiallo.com/blog/companies-dont-fix-bugs)

Ibrahim Diallo lấy ví dụ GTA Online: lập trình viên t0st tự tìm ra lỗi khiến chế độ trực tuyến tải tới 20 phút, sửa bằng 13 dòng mã giúp giảm 70% thời gian tải và được Rockstar thưởng 10.000 USD, sau khi lỗi tồn tại suốt 8 năm. Thay vì trách lập trình viên kém, tác giả phác họa vòng đời thường gặp của một lỗi ở công ty lớn: năm đầu có người đề xuất sửa cách phân tích JSON, quản lý sản phẩm hỏi "có trong yêu cầu không?" rồi xếp vào nợ kỹ thuật; năm thứ ba ưu tiên dồn cho bản mở rộng và vật phẩm trả phí; năm thứ sáu ticket bị lưu trữ vì codebase đã viết lại hai lần; năm thứ tám một lập trình viên mới lại phát hiện đúng vấn đề đó.

Ông chỉ ra bốn nguyên nhân: mọi thứ xoay quanh lộ trình nên bản sửa không gắn với yêu cầu nào bị đẩy xuống cuối backlog; nhân sự thay đổi liên tục làm mất dần hiểu biết về vấn đề; thay đổi nhỏ trong mã nguồn cũ thiếu kiểm thử và tài liệu vẫn tiềm ẩn rủi ro lớn hơn lợi ích; và cải thiện trải nghiệm không hiện lên trong báo cáo doanh thu như việc bán tiền ảo Shark Card. Bản vá của t0st là chiến thắng truyền thông nhưng không thay đổi gốc rễ. Thông điệp cuối: đừng đổ lỗi cho lập trình viên lười biếng mà hãy nhìn vào hệ thống coi trải nghiệm người dùng là thứ yếu.

---

## [3 Buckets of Work Time](https://corymiller.com/3-buckets-of-work-time/)

Cory Miller, Chief Evangelist làm việc từ Oklahoma với đội ngũ phần lớn ở châu Âu, xem lại lịch làm việc và nhận ra thời gian chia thành ba nhóm. Thứ nhất là trò chuyện, tức giao tiếp và cộng tác qua họp hành và Slack/Teams, chiếm nhiều thời gian hơn thường lệ vì ông vừa gia nhập đội ngũ mới. Thứ hai là làm việc, tức thực thi và bàn giao, với ông chủ yếu là sản xuất video cho nội bộ và khách hàng. Thứ ba là suy nghĩ về công việc, tức chiến lược và tầm nhìn, phần "mơ mộng" gắn với thế mạnh Wonder và Invention trong mô hình Working Genius, thường làm một mình trong yên tĩnh rồi mới mang ý tưởng ra cho đồng đội góp ý.

Ở tuổi cuối 40, từng kiệt sức và đang chăm lo vợ cùng hai con nhỏ, ông không muốn làm 60 giờ mỗi tuần mà cần làm việc thông minh và lành mạnh hơn. Ông thừa nhận nỗi sợ và sự bất định là động lực cốt lõi khiến ông dễ ôm đồm, nên đang tập buông bỏ những gì ngoài tầm kiểm soát. Ông cần chút nề nếp để thấy an toàn nhưng không muốn gò bó, thích nghĩ theo bộ ba cho đơn giản, và đang thử dậy lúc 6 giờ sáng để dành đầu ngày cho trao đổi, thứ Hai, thứ Tư cho cộng tác, thứ Ba, thứ Năm cho làm việc sâu và suy nghĩ. Ông mong cho bản thân nhiều khoảng lặng hơn và học cách tận hưởng cả những lúc "chưa biết".

---

## [Dangerous Advice for Software Engineers](https://www.seangoedecke.com/dangerous-advice/)

Sean Goedecke ví một số lời khuyên nghề nghiệp như "công cụ sắc bén" kiểu ssh, kubectl hay quyền ghi vào cơ sở dữ liệu production: dùng đúng thì rất hữu ích, dùng sai thì gây hại, và cần năng lực cùng óc phán đoán để dùng tốt. Ông thường đưa ra những lời khuyên "nguy hiểm" như vậy: tự quyết định nên làm việc gì, đôi khi cố ý phá vỡ quy định thành văn của công ty, giữ quan điểm mạnh dù chưa chắc chắn, chấp nhận mình có chút "láu cá", và tránh mọi hoạt động không phục vụ việc phát hành sản phẩm. Ông lo có người áp dụng sai, nhưng vẫn cho rằng cần có nơi viết những điều này ra.

Lý do thứ nhất là phần lớn lời khuyên nghề nghiệp là giả, được viết để né trách nhiệm hoặc gây ấn tượng, trong khi kỹ sư giỏi khao khát lời khuyên thật; biết mọi thứ không vận hành như quy định chính thức mà không ai để chia sẻ là cảm giác rất cô lập. Lý do thứ hai là quản lý gần như không bao giờ nói ra, vì nếu bạn làm sai và khai rằng sếp cho phép thì hậu quả với họ còn nặng hơn với bạn, dù nhiều quản lý thầm mong nhân viên làm việc khéo léo hơn bản mô tả công việc. Lời khuyên kiểu này rủi ro cao, lợi ích cao, có ích cho kỹ sư giỏi và có hại cho người yếu hơn; thấy không thoải mái thì đừng làm theo.

---

## [On the Biology of a Large Language Model](https://transformer-circuits.pub/2025/attribution-graphs/biology.html)

Nghiên cứu của Anthropic dùng phương pháp truy vết mạch (circuit tracing) để khám phá cơ chế bên trong Claude 3.5 Haiku, ví công việc này như nhà sinh học dùng kính hiển vi. Nhóm tác giả xây dựng mô hình thay thế dựa trên kiến trúc cross-layer transcoder với khoảng 30 triệu đặc trưng (feature), tức các "nơ-ron thay thế" thường biểu diễn khái niệm con người đọc hiểu được, rồi dựng đồ thị quy kết (attribution graph) cho từng câu lệnh để thấy các đặc trưng tác động lẫn nhau ra sao. Vì đồ thị chỉ là giả thuyết, họ kiểm chứng bằng thí nghiệm can thiệp như ức chế một nhóm đặc trưng trên mô hình gốc. Các trường hợp nghiên cứu gồm suy luận nhiều bước, làm thơ, đa ngôn ngữ, phép cộng, chẩn đoán y khoa, ảo giác, từ chối, jailbreak và độ trung thực của chuỗi suy luận.

Kết quả cho thấy mô hình thực hiện nhiều bước suy luận trung gian "trong đầu", như suy ra Texas rồi mới đến Austin khi được hỏi thủ phủ của bang chứa Dallas, song song với các lối tắt ghi nhớ. Nó có dấu hiệu lập kế hoạch trước, như chọn từ gieo vần trước khi viết câu thơ, có mạch "siêu nhận thức" sơ khai để biết giới hạn hiểu biết của mình, và dùng biểu diễn trừu tượng chung giữa nhiều ngôn ngữ. Nhóm tác giả thừa nhận công cụ chỉ cho kết quả thỏa đáng với khoảng một phần tư số câu lệnh, nhưng đây là bước tiến quan trọng cho khả năng diễn giải và an toàn AI.

---

*Bài viết đã được viết lại bởi Claude Code với Opus 5.5 vào ngày 27/09/2026.*
