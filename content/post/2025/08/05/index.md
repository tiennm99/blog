---
title: "Newsletter #46"
date: 2025-08-05
tags: [ "AI-Assisted", "Survey", "Tech Stack", "AI Tools", "Developer Tools" ]
categories: [ "Newsletter" ]
---

*~~Bài viết này sẽ quay lại dùng Claude Code nha :D (chân ái là đây, chỉ khi nào ngại tốn token mới phải nhảy sang agent khác).~~ Mời bạn thưởng thức Newsletter #46.*

## [The Pragmatic Engineer 2025 Survey: What's in your tech stack?](https://newsletter.pragmaticengineer.com/p/the-pragmatic-engineer-2025-survey)

Gergely Orosz công bố phần đầu kết quả khảo sát công nghệ năm 2025 của The Pragmatic Engineer, dựa trên gần 3.000 phản hồi hợp lệ. "Người trả lời điển hình" là một kỹ sư phần mềm cấp senior với 6–10 năm kinh nghiệm, làm backend ở công ty đủ mọi quy mô. Có tới 85% người tham gia nhắc đến ít nhất một công cụ AI. GitHub Copilot vươn lên dẫn đầu, cứ hai người thì một người dùng; Cursor dù mới ra mắt năm 2023 và chưa chi đồng nào cho tiếp thị đã đứng thứ hai. Claude thu hẹp đáng kể khoảng cách với ChatGPT, còn Claude Code đã được nhắc khá nhiều dù lúc khảo sát đóng lại nó mới chính thức ra mắt được vài ngày.

Về ngôn ngữ, TypeScript, Python và Swift được dùng nhiều nhất, trong khi Ruby on Rails và Elixir được yêu thích hơn hẳn so với mức độ phổ biến, và không ngôn ngữ nào bị chê nhiều hơn được khen. JIRA là công cụ bị ghét nhất, vượt cả bốn cái tên kế tiếp cộng lại, chủ yếu vì chậm và rườm rà; Linear thường được nhắc tới như lựa chọn thay thế. Git gần như là mặc định cho quản lý phiên bản, nhưng GitLab và Bitbucket vẫn có lượng người dùng đáng kể, còn GitHub Actions dẫn đầu mảng CI/CD. Ở mảng hạ tầng, AWS đứng đầu, theo sau là Azure và Google Cloud, và Vercel là nhà cung cấp nổi bật nhất ngoài nhóm "Big 3". Bài học rút ra: lập trình viên không ngại thử công cụ mới ở những lĩnh vực đang thay đổi nhanh như AI.

## [Algorithms for making interesting organic simulations](https://bleuje.com/physarum-explanation/)

Bài viết giải thích các kỹ thuật tạo ra những mô phỏng mang dáng vẻ sinh học, thiên về mục đích nghệ thuật hơn là khoa học. Điểm xuất phát là thuật toán Physarum của Jeff Jones (2010): rất nhiều tác nhân (agent) di chuyển trên mặt phẳng 2D, mỗi tác nhân có vị trí và hướng đi. Ở mỗi vòng lặp, tác nhân "nhìn" ba điểm phía trước (thẳng, lệch trái, lệch phải), quay về phía có vết tích mạnh nhất, tiến lên một đoạn rồi để lại vết tích trên một ảnh gọi là trail map; sau đó ảnh này được làm mờ nhẹ và nhân với hệ số suy giảm để hệ thống ổn định. Chỉ với bốn tham số (khoảng cách cảm nhận, góc cảm nhận, góc quay, bước di chuyển) đã có thể tạo ra nhiều hành vi khác nhau.

Phần thú vị nhất đến từ tác phẩm *36 Points* của Sage Jenson: thay vì giữ tham số cố định, mỗi tham số được tính theo giá trị vết tích tại vị trí của tác nhân, cộng thêm các độ lệch khi lấy mẫu, nâng tổng số lên khoảng 14–20 tham số và cho ra những hành vi đa dạng đến bất ngờ. Tác giả chia sẻ bản cài đặt riêng (physarum-36p) dùng compute shader trên GPU qua openFrameworks, gồm bốn shader cho các bước đặt lại bộ đếm, di chuyển hạt, để lại vết tích và khuếch tán, chạy mượt với hàng triệu hạt. Đây là minh chứng đẹp cho việc vài quy tắc đơn giản có thể sinh ra hành vi phức tạp.

## [AI coding tools are shifting to a surprising place: The terminal](https://techcrunch.com/2025/07/15/ai-coding-tools-are-shifting-to-a-surprising-place-the-terminal/)

Theo TechCrunch, các công cụ lập trình bằng AI đang dịch chuyển từ trình soạn thảo mã nguồn sang terminal. Kể từ tháng 2, Anthropic, DeepMind và OpenAI lần lượt ra mắt công cụ dòng lệnh của mình (Claude Code, Gemini CLI và Codex CLI), và chúng nhanh chóng trở thành những sản phẩm được ưa chuộng nhất của các công ty này. Mike Merrill, đồng tác giả benchmark Terminal-Bench, đặt cược rằng trong tương lai 95% tương tác giữa LLM và máy tính sẽ diễn ra qua giao diện kiểu terminal. Trong khi đó, nhóm công cụ dựa trên trình soạn thảo lại có dấu hiệu chững lại: Windsurf bị chia cắt sau các thương vụ thâu tóm, còn một nghiên cứu của METR cho thấy lập trình viên dùng Cursor Pro tưởng mình nhanh hơn 20–30% nhưng thực tế lại chậm hơn gần 20%.

Khác biệt nằm ở phạm vi công việc. Thế hệ công cụ cũ, đo bằng SWE-Bench, tập trung sửa mã nguồn lỗi từ các issue trên GitHub; còn công cụ terminal nhìn vào toàn bộ môi trường chạy chương trình, bao gồm cả các tác vụ DevOps như cấu hình Git server, biên dịch Linux kernel hay tìm hiểu vì sao một script không chạy. Warp, đang dẫn đầu Terminal-Bench, cũng chỉ giải được hơn một nửa số bài, cho thấy còn nhiều việc phải làm. Dù vậy, nhà sáng lập Warp tin rằng những việc như khởi tạo dự án, xử lý phụ thuộc và làm cho nó chạy được giờ đã có thể giao gần như hoàn toàn cho AI.

## [Distributed Systems Reliability Glossary](https://antithesis.com/resources/reliability_glossary/)

Jepsen và Antithesis cùng biên soạn một bảng thuật ngữ về độ tin cậy của hệ thống phân tán, hướng tới lập trình viên ở mọi giai đoạn sự nghiệp. Theo nhóm tác giả, đây là nguồn đầu tiên gom về một chỗ những khái niệm vốn nằm rải rác ở nhiều lĩnh vực khác nhau. Tài liệu được chia thành các phần: khái niệm nền tảng, mô hình nhất quán (hệ thống được phép làm gì), mô hình khả dụng, các hiện tượng bất thường, các loại lỗi (từ mất dữ liệu, lệch đồng hồ đến lỗi Byzantine) và kỹ thuật kiểm thử, kèm một danh sách tài liệu đọc thêm. Mỗi mục có định nghĩa trực quan và đường dẫn tới nguồn học thuật chính thống khi cần đào sâu.

Điểm đáng quý là tinh thần thực tế: tác giả nhấn mạnh đây là tài liệu tra cứu chứ không phải bài bắt buộc phải đọc hết, và mỗi lần viết integration test là bạn đã kiểm thử một hệ thống phân tán rồi. Phần kiểm thử giải thích vì sao hệ thống phân tán khó: chúng vốn chạy đồng thời và thường xuyên gặp lỗi cục bộ. Từ đó tài liệu giới thiệu các kỹ thuật như kiểm thử đồng thời, chủ động gây lỗi (fault injection), kiểm thử mô phỏng tất định, kiểm thử dựa trên thuộc tính (property-based testing) và thu gọn đầu vào lỗi (shrinking). Một tài liệu nên lưu lại để tra cứu khi làm việc với cơ sở dữ liệu hay hệ thống nhiều node.

## [Test-Driven Development (TDD) with dbt](https://xebia.com/blog/test-driven-development-tdd-with-dbt/)

Dumky de Wilde (Xebia) bàn về việc áp dụng phát triển hướng kiểm thử (TDD) cho dbt, công cụ biến đổi dữ liệu phổ biến trong analytics engineering. Thay vì viết model rồi hy vọng số liệu đúng, bạn định nghĩa trước thế nào là "dữ liệu tốt", viết kiểm thử, nhìn nó thất bại, rồi mới viết SQL vừa đủ để vượt qua. Tác giả phân biệt các nhóm kiểm thử: kiểm tra từng dòng trên một hoặc nhiều cột (như `not_null`, `unique`), kiểm thử tổng hợp trên cả model, unit test cho model (có sẵn từ dbt 1.8, dùng dữ liệu giả lập thay vì dữ liệu thật), unit test cho macro và model contract. Contract đặc biệt hữu ích vì ràng buộc được áp ngay ở tầng cơ sở dữ liệu trong lúc xây dựng, model sai cấu trúc sẽ không build được.

Bài có ví dụ viết trước một kiểm thử giới hạn số dòng cho model chưa tồn tại, buộc bạn phải trả lời những câu hỏi nghiệp vụ như "vì sao lại từ 1 đến 99 dòng?" trước khi viết dòng SQL nào. Về thực hành, tác giả khuyên luôn chạy unit test và contract khi phát triển cục bộ và trong CI/CD, chỉ chạy data test có chọn lọc, và bỏ unit test ở môi trường production. Nên dùng tag để nhóm kiểm thử, tự tạo bộ dữ liệu mẫu (fixture) nhỏ cho các trường hợp biên và ghi lại lý do tồn tại của từng kiểm thử. Thông điệp chính là chuyển tư duy từ "xây trước, kiểm thử sau" sang "định nghĩa thành công trước, rồi mới xây".

## [Rethinking OOP](https://max.xz.ax/blog/rethinking-oop/)

Tác giả mở đầu bằng một ví dụ từ khóa AP Computer Science A: định nghĩa "class là bản thiết kế để tạo ra object, object là một thể hiện của class" gần như vô nghĩa với người mới học. Theo tác giả, dạy OOP quá sớm và không giải thích lý do khiến học sinh làm theo khuôn mẫu một cách máy móc thay vì suy nghĩ xem bài toán có thực sự cần đến nó hay không. Lấy cảm hứng từ "design recipe" của giáo sư Matthias Felleisen và cách dạy Java hiện đại của Ethan McCue, bài đề xuất bắt đầu từ thứ thật đơn giản, chỉ giới thiệu tính năng mới khi người học đã gặp giới hạn của bộ công cụ hiện có.

Cụ thể, người học có thể dùng tệp nguồn gọn nhẹ của JDK 25 (hoặc JShell) để viết ngay các câu lệnh tuần tự mà không cần đến `public static void main`. Khi phải chép lại cùng một đoạn kiểm tra số nguyên tố cho nhiều biến, họ tự thấy cần phương thức; khi quản lý quá nhiều biến rời rạc, họ mới hiểu giá trị của việc gom dữ liệu thành class. Tác giả thừa nhận cách này khiến học sinh viết mã nguồn "xấu" lúc đầu, nhưng chính việc sống chung với mã nguồn lặp lại, vụng về mới giúp các lựa chọn thiết kế trở nên có ý nghĩa. Kết luận của bài rất đáng suy ngẫm: các best practice không cần học thuộc từ sách, mà có thể trở nên trực quan qua việc tăng dần độ phức tạp của chương trình.

## ~~[How I Write Code That I Don't Hate Reading a Week Later](https://dev.to/resource_bunk_1077cab07da/how-i-write-code-that-i-dont-hate-reading-a-week-later-303b)~~

~~Một bài viết thực tế và hữu ích về cách viết mã dễ đọc - một kỹ năng quan trọng mà nhiều lập trình viên thường bỏ qua. Tác giả chia sẻ triết lý cốt lõi: "Viết mã như thể bạn sẽ phải debug nó lúc 2 giờ sáng, trong trạng thái buồn ngủ, với deadline cận kề."~~

~~Các nguyên tắc chính bao gồm: đặt tên biến và hàm mô tả rõ ràng (ví dụ `parsed_user_profile_data` thay vì chỉ `d`), viết comment giải thích "tại sao" thay vì "cái gì", ưu tiên tính dễ đọc hơn là "sự thông minh" của mã. Thay vì viết những dòng mã phức tạp để khoe kỹ thuật, hãy tách chúng thành nhiều dòng dễ hiểu hơn.~~

~~Điểm hay nhất là nguyên tắc viết hàm nhỏ và tập trung: mỗi hàm chỉ làm một việc cụ thể với tên mô tả rõ ràng như `handleLoginFormSubmission()`. Khi mã trở nên rối rắm, hãy dừng lại và tái cấu trúc thay vì cứ thêm độ phức tạp. Tác giả cũng giới thiệu các công cụ hỗ trợ như Prettier, Black cho Python, và thậm chí ChatGPT để giúp tái cấu trúc mã. Đây là những lời khuyên đơn giản nhưng cực kỳ thực tế cho bất kỳ lập trình viên nào muốn code của mình dễ bảo trì hơn.~~

## [7 Habits That Quietly Made Me A 10x Developer (No, Not ChatGPT)](https://dev.to/abubakersiddique771/7-habits-that-quietly-made-me-a-10x-developer-no-not-chatgpt-13c4)

Bài viết cho rằng trở thành "lập trình viên 10x" không nằm ở tài năng bẩm sinh hay làm việc 20 tiếng mỗi ngày, mà ở những thói quen nhỏ được duy trì đều đặn, không cần đến trợ lý AI. Thói quen đầu tiên là viết mã nguồn để sinh ra mã nguồn: dùng script, generator và công cụ scaffolding để tự động hóa phần khung, các endpoint CRUD, khung kiểm thử hay workflow GitHub Actions, để không phải giải cùng một bài toán hai lần. Thứ hai là thiết kế cho "bản thân trong tương lai" với commit message mô tả rõ, tên hàm dễ hiểu, cấu trúc thư mục hợp lý và viết README.md trước khi bắt tay xây dựng. Thứ ba là ghi một "nhật ký debug" ngắn gồm vấn đề, giả thuyết và kế hoạch trước khi sửa lỗi, vì viết ra buộc mình suy nghĩ rõ ràng.

Các thói quen còn lại gồm tự làm những công cụ nhỏ cho riêng mình (CLI đổi tên ảnh chụp màn hình, trình sinh snippet), dành các khối 90 phút tập trung sâu không Slack hay mạng xã hội, học cách người khác tổ chức quy trình làm việc chứ không chỉ sao chép mã nguồn, và tự nhìn lại mỗi thứ Sáu với ba câu hỏi: điều gì tốt, điều gì làm mình chậm lại, và sẽ tự động hóa hay cải thiện gì tiếp theo. Theo tác giả, hiệu quả "10x" là kết quả cộng dồn của nhiều cải tiến nhỏ theo thời gian.

*Claude Code thật sự là chân ái :D Xử lý nhanh, tóm tắt gọn, càng ngày càng tốt. Thật tuyệt vời!*

---

*Bài viết đã được viết lại bởi Claude Code với Opus 5.5 vào ngày 27/09/2026.*
