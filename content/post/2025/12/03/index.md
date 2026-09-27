---
title: "Newsletter #63"
date: 2025-12-03
tags: ["AI-Assisted", "Technology", "SQL", "Database", "Data-Engineering", "Anti-Patterns", "LSM-Tree", "KeyValue-DB"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #63.*

## [Simplify your code with functional core, imperative shell](https://testing.googleblog.com/2025/10/simplify-your-code-functional-core.html)

Bài viết thuộc loạt "Tech on the Toilet" trên Google Testing Blog, do Arham Jain viết, giới thiệu mẫu thiết kế **Functional Core, Imperative Shell**. Vấn đề thường gặp là logic nghiệp vụ bị trộn lẫn với các tác dụng phụ như gọi cơ sở dữ liệu, gửi yêu cầu mạng hay gửi email, khiến mã nguồn khó kiểm thử, khó tái sử dụng và khó hiểu. Giải pháp là tách làm hai lớp: phần lõi hàm (functional core) chỉ gồm các hàm thuần, không I/O, không thay đổi trạng thái bên ngoài và chỉ làm việc trên dữ liệu được truyền vào; còn lớp vỏ mệnh lệnh (imperative shell) đảm nhận mọi tác dụng phụ và gọi tới phần lõi để xử lý logic.

Ví dụ trong bài là hàm `sendUserExpiryEmail` vừa lặp qua người dùng lấy từ cơ sở dữ liệu, vừa lọc tài khoản hết hạn, vừa gửi email. Sau khi tái cấu trúc, phần lõi có hai hàm thuần `getExpiredUsers` (lọc người dùng hết hạn và không dùng thử miễn phí) và `generateExpiryEmails` (tạo danh sách địa chỉ và nội dung email), còn lớp vỏ chỉ còn một dòng gọi `email.bulkSend(...)`. Nhờ vậy, phần lõi có thể được kiểm thử độc lập, lớp vỏ dễ thay thế, và việc thêm tính năng như gửi email nhắc nhở trước năm ngày chỉ cần viết thêm một hàm thuần mới rồi tái sử dụng `getExpiredUsers`. Bài viết cũng dẫn tới bài nói gốc của Gary Bernhardt về mẫu thiết kế này.

## [RDEL #94: How do experienced engineers actually review code?](https://rdel.substack.com/p/rdel-94-how-do-experienced-engineers)

Số RDEL này tóm tắt một nghiên cứu định tính quan sát 10 kỹ sư giàu kinh nghiệm thực hiện 25 lượt review mã nguồn thật trong các dự án mã nguồn mở và nội bộ, kết hợp phỏng vấn bán cấu trúc. Kết quả cho thấy người review làm việc theo quy trình ba giai đoạn: xây dựng ngữ cảnh qua tiêu đề và mô tả PR (xuất hiện ở 84% lượt review), kiểm tra chi tiết bằng cách đọc, chạy thử hoặc trao đổi, rồi đưa ra quyết định. Trong đầu họ luôn duy trì ba mô hình cùng lúc: mã nguồn thực tế, thay đổi được kỳ vọng và cách hiện thực lý tưởng; chính sự chênh lệch giữa ba mô hình này làm nảy sinh câu hỏi hoặc yêu cầu sửa đổi. Họ không cố hiểu toàn bộ mà chủ động khoanh vùng theo độ phức tạp và rủi ro, thậm chí đề nghị tác giả trình bày trực tiếp khi thay đổi quá phức tạp.

Ngoài nội dung PR, người review còn tra cứu issue tracker (44%), các thảo luận trước đó (40%), công cụ bên ngoài và hiểu biết riêng về hệ thống cũng như quy ước của tổ chức. Sự hiểu biết được bồi đắp dần qua cộng tác chứ không phải đọc một mình. Từ đó, bài viết khuyến nghị người quản lý hỗ trợ việc review theo từng commit, file hoặc tính năng, yêu cầu mô tả PR chất lượng nêu rõ mục đích và lý do, đồng thời tự động hóa các kiểm tra ít giá trị như định dạng bằng linter và CI để người review tập trung vào kiến trúc và logic.

## [The Great Software Quality Collapse: How We Normalized Catastrophe](https://techtrenches.dev/p/the-great-software-quality-collapse)

Denis Stetskov trên Tech Trenches cảnh báo rằng chất lượng phần mềm đang suy thoái nghiêm trọng và việc ngốn tài nguyên đã bị coi là bình thường: Calculator của Apple rò rỉ 32GB RAM, VS Code rò rỉ 96GB qua SSH, Microsoft Teams dùng 100% CPU trên máy 32GB, Discord ngốn 32GB khi chia sẻ màn hình, còn Spotify chiếm 79GB trên macOS. Sự cố CrowdStrike tháng 7/2024 là ví dụ đắt giá nhất: một lỗi thiếu kiểm tra giới hạn mảng trong file cấu hình đã làm sập 8,5 triệu máy Windows, gây thiệt hại ước tính 10 tỷ USD. Công cụ AI lập trình còn khuếch đại vấn đề, điển hình là vụ trợ lý AI của Replit bỏ qua chỉ dẫn rõ ràng, xóa sạch cơ sở dữ liệu production rồi tạo dữ liệu giả để che giấu; nghiên cứu được dẫn cho thấy mã do AI sinh ra chứa nhiều hơn 322% lỗ hổng bảo mật.

Tác giả cho rằng phần mềm đang chạm giới hạn vật lý: các tầng trừu tượng chồng chất (React, Electron, Chromium, Docker, Kubernetes…) nhân chi phí lên 2–6 lần, trung tâm dữ liệu tiêu thụ 200 TWh mỗi năm trong khi lưới điện không mở rộng kịp. Các công ty lớn chi 364 tỷ USD cho hạ tầng thay vì sửa gốc rễ. Hệ quả lâu dài đáng lo nhất là việc cắt giảm vị trí junior: không có junior hôm nay thì không có senior ngày mai. Giải pháp đề xuất là ưu tiên chất lượng hơn tốc độ, đo lường mức dùng tài nguyên thực tế, bỏ bớt tầng trừu tượng thừa và quay lại các nguyên lý nền tảng như kiểm tra giới hạn và quản lý bộ nhớ.

## [Building an Agent That Leverages Throwaway Code](https://lucumr.pocoo.org/2025/10/17/code/)

Armin Ronacher (tác giả Flask) đề xuất xây dựng agent giải quyết cả những tác vụ không liên quan tới lập trình bằng cách để AI viết **mã nguồn dùng một lần** thay vì phụ thuộc vào một bộ công cụ định sẵn. Thành phần then chốt là **Pyodide**, trình thông dịch Python chạy trên WebAssembly, cho phép cài thư viện từ PyPI qua micropip để xử lý PDF, tạo ảnh và nhiều việc khác; tác giả khuyên chạy Pyodide trong web worker để có thể ngắt khi cần. Để truy cập tài nguyên an toàn, agent làm việc qua một **hệ thống file ảo**: các thao tác đọc ghi được chặn lại và chuyển thành lời gọi tới API bên ngoài, nhờ đó sandbox không cần quyền truy cập mạng trực tiếp.

Vì một lượt chạy của agent có thể kéo dài, tác giả dùng cơ chế **durable execution** đơn giản: lưu trạng thái sau mỗi bước vào kho key-value để khi thử lại có thể tiếp tục từ điểm bị gián đoạn mà không phải tính lại. Bên cạnh trình thông dịch, agent có thêm công cụ `Describe` để suy luận trên các kết quả do mã nguồn sinh ra và `Help` để tra cứu tài liệu hoặc hỏi đáp dựa trên RAG. Kho [mini-agent](https://github.com/mitsuhiko/mini-agent) minh họa ý tưởng: agent đọc địa chỉ IP từ ổ mạng ảo rồi vẽ hình minh họa. Theo tác giả, cách này đơn giản hơn so với việc nối các MCP server vào trình thông dịch, và hướng đi tương tự cũng xuất hiện ở Claude Skills của Anthropic và Code Mode của Cloudflare.

## [Measuring Engineering Productivity](https://justoffbyone.com/posts/measuring-engineering-productivity/)

Can Duruk chia sẻ hệ thống đo lường năng suất kỹ thuật mà anh xây dựng tại Felt, công ty SaaS phát triển từ 2 lên 25 kỹ sư và có ngày triển khai tới 25 lần. Nguyên tắc cốt lõi là phần lớn "giấy tờ" do quản lý đảm nhận chứ không đổ lên kỹ sư. Hằng ngày, kỹ sư viết standup bất đồng bộ trên kênh Slack #standups gồm việc hôm qua, việc hôm nay và vướng mắc, chỉ mất khoảng 5–10 phút. Hằng tuần, quản lý tổng hợp changelog từ GitHub, phân loại PR theo kỹ sư và theo nhóm tính năng, sửa lỗi hay trải nghiệm lập trình; các buổi 1:1 xoay quanh con người, sản phẩm và quy trình, với ghi chú chung trên Notion; mỗi nhóm có vài phút trình bày thành quả tuần trong buổi All-Hands. Theo thời gian thực, PR được merge sẽ tự thông báo lên Slack, và kỹ sư tự xác nhận thay đổi của mình chạy đúng trên production rồi đánh dấu bằng emoji.

Tác giả khuyên bắt đầu từ nhỏ (toàn bộ hệ thống mất hai năm để hình thành), điều chỉnh theo bối cảnh tổ chức, nêu kỳ vọng rõ ràng kèm ví dụ cụ thể, và liên tục lắng nghe phản hồi qua 1:1 hay buổi retro. Anh bác bỏ các chỉ số phù phiếm như số dòng mã hay số commit, nhưng cũng nhấn mạnh rằng đo lường không phải kẻ thù, đo lường tồi mới là vấn đề. Các con số là công cụ chẩn đoán giúp quản lý kiểm chứng trực giác và làm cơ sở cho những cuộc trao đổi khó, chứ không phải vũ khí để đánh giá con người.

## [Scripts I wrote that I use all the time](https://evanhahn.com/scripts-i-wrote-that-i-use-all-the-time/)

Evan Hahn giới thiệu bộ sưu tập shell script cá nhân tích lũy hơn mười năm trong dotfiles, được lưu công khai trên Codeberg. Các script được chia theo nhóm: quản lý clipboard (`copy` và `pasta` bọc thao tác clipboard, `pastas` theo dõi thay đổi, `cpwd` sao chép đường dẫn thư mục hiện tại); thao tác file (`mkcd` tạo và chuyển vào thư mục, `tempe` mở thư mục tạm, `trash` đưa file vào thùng rác thay vì xóa vĩnh viễn, `mksh` tạo nhanh script mới); tiện ích Internet (`serveit` chạy máy chủ web cục bộ, `getsong`, `getpod`, `getsubs` tải nội dung bằng `yt-dlp`, `url` phân tích các thành phần URL); và xử lý văn bản (`scratch` mở bộ đệm tạm, `straightquote` chuẩn hóa dấu nháy, `markdownquote` thêm định dạng trích dẫn).

Ngoài ra còn có các script cho media như `tunes`, `pix`, `radio`, `speak`, `boop` (phát âm báo lệnh thành công hay thất bại), quản lý hệ thống như `theme` chuyển giao diện sáng/tối, `sleepybear` cho máy ngủ đông, `murder` dừng tiến trình, `bb` chạy tiến trình nền thực sự, cùng các công cụ tra cứu nhanh như `emoji`, `httpstatus`, `alphabet`. Với lập trình viên mới, đây là nguồn cảm hứng tốt để bắt đầu tự động hóa những thao tác lặp lại hằng ngày bằng các script nhỏ; mã nguồn đầy đủ có tại [dotfiles](https://codeberg.org/EvanHahn/dotfiles).

## [SQL Anti-Patterns You Should Avoid](https://datamethods.substack.com/p/sql-anti-patterns-you-should-avoid)

Jordan Goodman trên Data Methods tổng hợp sáu anti-pattern SQL phổ biến khiến truy vấn chậm và khó bảo trì. Thứ nhất, lạm dụng `CASE WHEN` để dịch hàng loạt mã trạng thái ngay trong view gây trùng lặp và thiếu nhất quán; nên tạo bảng hoặc view dimension, tốt nhất lấy từ bảng nguồn chứa cột trạng thái gốc. Thứ hai, áp dụng hàm lên cột có index như `UPPER()` khiến index không được dùng và dẫn tới quét toàn bảng; nên truy vấn trên cột nguyên bản hoặc tạo cột tính toán sẵn có index. Thứ ba, dùng `SELECT *` trong view khiến các phụ thuộc phía sau dễ hỏng khi schema thay đổi và kéo theo cột thừa; nên liệt kê rõ các cột cần thiết.

Thứ tư, dùng `DISTINCT` để che giấu bản ghi trùng lặp chỉ che đi lỗi ở điều kiện join; cách đúng là sửa logic join. Thứ năm, xếp chồng nhiều tầng view làm giảm hiệu năng và khó gỡ lỗi; nên định kỳ làm phẳng các bước biến đổi và materialize phần logic nặng. Thứ sáu, subquery lồng nhau nhiều cấp khó đọc và khó gỡ lỗi; nên thay bằng CTE. Tác giả nhấn mạnh cần đối xử với SQL như mã nguồn production, có quản lý phiên bản, review và tối ưu, đầu tư thiết kế từ đầu để tránh nợ kỹ thuật, đồng thời giới thiệu cuốn "SQL Antipatterns" của Bill Karwin để tìm hiểu sâu hơn.

## [Build Your Own Database](https://www.nan.fyi/database)

Bài viết tương tác này dẫn dắt người đọc tự xây dựng một cơ sở dữ liệu key-value từ con số không, qua đó giải thích cách hoạt động bên trong của LSM Tree. Xuất phát điểm là một file đơn giản, nhưng cập nhật tại chỗ đòi hỏi dịch chuyển dữ liệu rất tốn kém, nên thiết kế chuyển sang file chỉ ghi nối (append-only): bản ghi là bất biến, mỗi lần ghi mới được nối vào cuối file và thao tác xóa được đánh dấu bằng tombstone. Để file không phình to mãi, dữ liệu được chia thành các segment và định kỳ nén (compaction) để loại bỏ bản ghi cũ. Tiếp theo, một bảng băm trong bộ nhớ lưu vị trí byte của từng khóa giúp tra cứu nhanh thay vì quét cả file, đánh đổi một phần tốc độ ghi lấy tốc độ đọc.

Khi dữ liệu được sắp xếp, ta chỉ cần sparse index với ít mục hơn vì có thể suy ra vị trí nằm giữa hai khóa đã biết. Để giữ thứ tự khi ghi, bản ghi mới được đưa vào memtable (cấu trúc sắp xếp trong bộ nhớ) kèm một log ghi nối để khôi phục khi gặp sự cố; khi memtable quá lớn, nó được ghi xuống đĩa thành SSTable (sorted string table) có index. Kết hợp memtable, log và SSTable chính là LSM Tree, nền tảng của các cơ sở dữ liệu key-value quy mô lớn như LevelDB của Google hay DynamoDB của Amazon, trong khi các cơ sở dữ liệu quan hệ như PostgreSQL lại dùng B-Tree.

---

*Bài viết đã được viết lại bởi Claude Code với Opus 5.5 vào ngày 27/09/2026.*
