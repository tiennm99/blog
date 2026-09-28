---
title: "Newsletter #98"
date: 2026-04-18
tags: ["AI-Assisted", "Newsletter", "AI Coding Agents", "Go", "Git", "Software Engineering", "Design Systems"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #98.*

## [Impeccable: Design fluency for AI harnesses](https://impeccable.style/)

Impeccable là bộ công cụ giúp các trợ lý lập trình AI như Claude Code, Cursor, Gemini CLI, Codex CLI hay GitHub Copilot tạo ra giao diện có chất lượng thiết kế tốt hơn. Vấn đề nó nhắm tới rất thực tế: phần lớn lập trình viên không có đủ vốn từ vựng thiết kế để mô tả chính xác điều họ muốn, còn các mô hình AI lại được huấn luyện trên cùng một kho mẫu, nên thường cho ra những giao diện na ná nhau với các "dấu hiệu AI" quen thuộc như gradient tím, font Inter ở khắp nơi hay thẻ card lồng trong thẻ card. Impeccable đóng vai trò lấp khoảng trống đó bằng cách mang kiến thức thiết kế vào ngay trong quá trình AI viết mã nguồn.

Cốt lõi của bộ công cụ là skill `impeccable`, dạy AI nền tảng thiết kế trên 7 khía cạnh và được nạp vào mỗi lần AI làm việc với giao diện. Đi kèm là 18 câu lệnh chuyên biệt như `/polish`, `/audit`, `/typeset` hay `/overdrive`, tạo thành một ngôn ngữ chung để bạn điều khiển kết quả chính xác hơn, cùng một thư viện anti-pattern được đặt tên rõ ràng để AI nhận diện và tránh lặp lại lỗi cũ. Chế độ Visual Mode, chạy qua tiện ích mở rộng Chrome hoặc lệnh `npx impeccable live`, thực hiện 25 phép kiểm tra tất định (không cần LLM) để phát hiện lỗi thiết kế ngay trên trang web đang chạy. Công cụ tương thích với nhiều nền tảng, từ Cursor, Claude Code, Gemini CLI, Codex CLI, VS Code Copilot đến Antigravity, Kiro và OpenCode, nên rất đáng thử nếu bạn thường nhờ AI dựng giao diện.

## [getdesign.md — DESIGN.md collection for AI coding agents](https://getdesign.md/)

getdesign.md là thư viện mở do VoltAgent duy trì, tập hợp các tệp DESIGN.md phân tích hệ thống thiết kế của nhiều trang web nổi tiếng như SpaceX, IBM, Lamborghini và nhiều thương hiệu khác. Cách dùng rất đơn giản: chọn một tệp DESIGN.md, đặt vào dự án, rồi để các AI coding agent như Claude Code, Cursor hay Copilot dựa vào đó mà xây dựng giao diện theo đúng phong cách ấy. Nhờ vậy, mọi trang mới đều theo cùng một ngôn ngữ hình ảnh thay vì bố cục chung chung mà AI hay tạo ra.

Tại thời điểm bài viết được đưa vào newsletter, bộ sưu tập có 68 tệp và vẫn được bổ sung liên tục. Mỗi tệp mô tả bảng màu, kiểu chữ, khoảng cách, các thành phần đặc trưng và cả lý do đằng sau những lựa chọn đó, giúp AI có đủ ngữ cảnh để sinh mã nguồn giao diện nhất quán và có tính thẩm mỹ mà bạn không cần am hiểu thiết kế. Mã nguồn được công khai trong repo VoltAgent/awesome-design-md trên GitHub, và cộng đồng có thể đề xuất thêm thương hiệu mới qua trang Request. Đây là lựa chọn hữu ích khi bạn cần dựng nhanh nguyên mẫu với phong cách rõ ràng mà không phải tự xây dựng design system từ đầu.

## [Which Java Construct Should You Use? Let Change Drivers Decide](https://dev.to/yannick555/which-java-construct-should-you-use-let-change-drivers-decide-3159)

Yannick Loth đề xuất một cách chọn cấu trúc Java dựa trên phân tích thay vì thói quen: xem xét các "change driver", tức những thứ mà khi thay đổi sẽ buộc một phần tử trong hệ thống phải thay đổi theo. Qua lăng kính này (tác giả gọi là IVP lens), ta tách được coupling thiết yếu (essential coupling, sinh ra từ bản chất của vấn đề) với coupling phát sinh (accidental coupling, do chính cấu trúc ngôn ngữ áp đặt thêm). Câu hỏi cần đặt ra luôn là: cấu trúc này có ép ta ghép nối nhiều hơn mức tình huống thực sự đòi hỏi hay không?

Inner class không static mang tham chiếu ngầm tới đối tượng bên ngoài, nên chỉ đáng dùng khi thật sự cần trạng thái của nó; static nested class phù hợp khi cần trạng thái hoặc nhiều phương thức nhưng không cần đối tượng bên ngoài; còn lambda và method reference chỉ capture đúng những gì thân hàm tham chiếu tới. Record thay thế các lớp chứa dữ liệu có thể thay đổi, vốn biến mọi chỗ ghi thành change driver cho mọi chỗ đọc. Sealed interface kết hợp pattern matching đầy đủ giúp khoanh vùng rõ không gian biến thể khi tập biến thể là đóng. `Optional` và kiểu `Result` biến những change driver vô hình như `null` hay checked exception (thứ buộc mọi caller trung gian phải khai báo dù không xử lý) thành kiểu dữ liệu tường minh. Theo tác giả, mọi bổ sung lớn của Java từ phiên bản 8 đến 25 đều đi cùng một hướng: thu hẹp khoảng cách giữa những gì ngôn ngữ bắt ta ghép nối và những gì tình huống thực sự cần.

## [The Git Commands I Run Before Reading Any Code](https://piechowski.io/post/git-commands-before-reading-code/)

Khi tiếp nhận một codebase mới, Ally Piechowski không mở mã nguồn ngay mà mở terminal và chạy vài lệnh Git. Lịch sử commit đưa ra một bức tranh chẩn đoán về dự án: ai đã xây dựng nó, lỗi tập trung ở đâu, và đội ngũ đang triển khai một cách tự tin hay đang dè dặt quanh những "bãi mìn". Bài viết giới thiệu 5 nhóm lệnh giúp nắm được sức khỏe dự án chỉ trong vài phút, trước khi đọc bất kỳ dòng mã nào.

Nhóm đầu tiên liệt kê 20 file thay đổi nhiều nhất trong năm qua; churn cao ở một file mà không ai muốn nhận trách nhiệm là tín hiệu rắc rối rõ ràng nhất. Nhóm thứ hai xếp hạng người đóng góp theo số commit: nếu một người chiếm từ 60% trở lên thì đó chính là bus factor của dự án, và càng đáng lo nếu người đó đã rời đi. Nhóm thứ ba lọc các commit có từ khóa liên quan đến lỗi; file nào vừa churn cao vừa xuất hiện nhiều trong commit sửa lỗi là phần mã nguồn rủi ro nhất. Nhóm thứ tư đếm commit theo tháng để quan sát hình dáng của đường biểu đồ, vốn phản ánh sức khỏe đội ngũ chứ không chỉ sức khỏe mã nguồn. Cuối cùng, tần suất revert và hotfix cho biết đội ngũ có tin vào quy trình triển khai hay không. Tác giả cũng lưu ý hai giới hạn: quy trình squash-merge làm sai lệch thống kê tác giả, và kết quả tìm lỗi phụ thuộc nhiều vào chất lượng commit message.

## [Chess in Pure SQL](https://www.dbpro.app/blog/chess-in-pure-sql)

Bài viết cho thấy SQL biểu đạt được nhiều hơn ta vẫn nghĩ qua một thử nghiệm vui: dựng bàn cờ vua chơi được chỉ bằng SELECT, UPDATE, DELETE và INSERT, không JavaScript, không framework. Bàn cờ 8x8 được mô hình hóa bằng một bảng đơn giản gồm 3 cột rank, file và piece, ban đầu chứa 32 dòng ứng với 32 quân cờ ở vị trí xuất phát.

Mẹo then chốt là kỹ thuật pivot (conditional aggregation) để biến các dòng dữ liệu thành lưới: GROUP BY theo rank, rồi dùng CASE bên trong MAX() để lấy ra quân cờ ở từng file, kết hợp CTE sinh đủ 64 ô và COALESCE để hiển thị ô trống. Di chuyển quân chỉ cần cập nhật bảng, còn bắt quân thì xóa quân bị bắt trước. Tác giả còn tái hiện ván "Opera Game" nổi tiếng của Paul Morphy năm 1858 bằng một chuỗi câu lệnh SQL, kết thúc bằng nước chiếu bí đẹp mắt. Kỹ thuật pivot này áp dụng được cho mọi dạng trực quan hóa dạng lưới như lịch, sơ đồ chỗ ngồi hay heatmap, là một bài tập thú vị để hiểu sâu hơn về truy vấn tổng hợp.

## [Git’s Magic Files](https://nesbitt.io/2026/02/05/git-magic-files.html)

Andrew Nesbitt tổng hợp các tệp cấu hình đặc biệt mà Git và hệ sinh thái quanh nó tự động nhận diện khi được đặt trong repository. Mỗi tệp là một quy ước giúp Git và các công cụ liên quan thay đổi hành vi theo từng repo mà không cần cấu hình toàn cục, nên việc hiểu rõ chúng đặc biệt quan trọng nếu bạn xây dựng công cụ làm việc với Git repository.

Danh sách gồm `.gitignore` (các pattern bỏ qua, hỗ trợ wildcard và có chuỗi fallback qua nhiều vị trí), `.gitattributes` (filter clean/smudge, chuẩn hóa ký tự xuống dòng, diff/merge driver tùy biến, và ghi đè nhận diện ngôn ngữ cho GitHub Linguist), `.lfsconfig` (cấu hình Git LFS đi kèm repo) và `.gitmodules` (lưu cấu hình submodule, dù submodule quản lý phiên bản không tốt). Tiếp theo là `.mailmap` giúp gộp commit từ nhiều email hoặc cách viết tên khác nhau của cùng một người cho `git shortlog` và `git blame`, `.git-blame-ignore-revs` giúp `git blame` bỏ qua các commit định dạng lại mã nguồn hàng loạt, và `.gitmessage` làm mẫu commit message, kích hoạt qua `git config commit.template`. Bài viết cũng điểm qua các thư mục riêng của từng nền tảng như GitHub, GitLab, Bitbucket, Forgejo, Gitea hay SourceHut cho CI/CD và template, cùng các quy ước rộng hơn như `.editorconfig` hay `.ruby-version`, tất cả theo chung một mô hình: đặt một dotfile vào repo, công cụ sẽ tự phát hiện và điều chỉnh hành vi.

## [Adding Correctness Conditions to Code Changes](https://jessitron.com/2026/04/06/adding-correctness-conditions-to-code-changes/)

Jessitron kể một tình huống quen thuộc thời coding agent: PR đầu tiên của dự án thêm một script chạy mới nhưng README không hề nhắc tới. Thay vì bình luận trên PR đó, tác giả muốn giải quyết vấn đề cho mọi PR về sau bằng tự động hóa, với một điều kiện đúng đắn rõ ràng: mọi PR phải cập nhật đầy đủ các tệp tài liệu liên quan. Có hai cách để đạt được điều này là sửa chỉ dẫn trong AGENTS.md cho agent, hoặc thêm một agent review để kiểm tra, và câu hỏi là nên làm cách nào trước.

Theo tác giả, chỉ sửa chỉ dẫn thì dễ và có vẻ hiệu quả ngay, nhưng không có gì bảo đảm: đến lúc agent quên cập nhật tài liệu, nhiều khả năng ta cũng không phát hiện ra. Ngược lại, nếu thêm bước xác thực trước, mọi PR đều được kiểm tra và PR thiếu sẽ bị từ chối, buộc agent phải sửa; khi đó việc sửa chỉ dẫn chỉ còn là một bước tối ưu để giảm số vòng phản hồi. Cách làm này giống test-first nhưng ở cấp hệ thống, và gần với property testing hơn unit testing vì ta phát biểu một thuộc tính, rằng tài liệu phải luôn cập nhật sau mỗi thay đổi tính năng. Từ đó, review PR cũng trở thành review cả hệ thống: cần thay đổi ngữ cảnh và phản hồi của agent thế nào để lần sau kết quả khác đi. Tác giả gọi đây là Boy Scout Rule mới: không chỉ để lại codebase sạch hơn, mà làm cho cả hệ thống phát triển mạnh hơn trước.

## [The impact of AI on software engineers in 2026: key trends. Part 1](https://newsletter.pragmaticengineer.com/p/the-impact-of-ai-on-software-engineers-2026)

Gergely Orosz (Pragmatic Engineer) tổng hợp hơn 900 câu trả lời khảo sát từ kỹ sư phần mềm và lãnh đạo kỹ thuật về tác động của công cụ AI trong năm 2026. Thay vì so sánh từng công cụ, báo cáo tập trung vào ảnh hưởng chung, với ba chủ đề nổi bật: chi phí AI ngày càng tăng, nhiều kỹ sư chạm ngưỡng giới hạn sử dụng, và tác động không đồng đều giữa các nhóm kỹ sư.

Về chi phí, khoảng 15% người trả lời bày tỏ lo ngại. Nhiều công ty trả gói "max" của Claude Code, Cursor hay Codex ở mức 100-200 USD mỗi tháng cho mỗi kỹ sư, trong khi một số nơi chỉ có ngân sách khoảng 20 USD, ngang GitHub Copilot. Doanh nghiệp vẫn đang thử nghiệm và nhiều người tin mức chi hiện tại khó bền vững; công ty châu Âu đòi hỏi chứng minh giá trị rõ ràng, còn công ty Mỹ sẵn sàng đầu tư trước rồi đo lường sau. Một mẹo tiết kiệm là lập kế hoạch với Opus rồi thực thi bằng Sonnet hoặc Composer. Khi chạm giới hạn, lập trình viên thường chuyển công cụ, dùng API key khác hoặc nâng gói. Báo cáo chia người dùng thành ba nhóm: builder (chú trọng chất lượng và kiến trúc) dùng AI hiệu quả cho những việc tẻ nhạt nhưng đòi hỏi kinh nghiệm như refactor, di chuyển hệ thống hay tăng độ bao phủ kiểm thử; shipper (tập trung vào kết quả sản phẩm) là nhóm hào hứng nhất vì đưa tính năng ra nhanh hơn hẳn; và coaster, làm đủ việc được giao nhưng ít quan tâm chất lượng. Kết luận chung là AI khuếch đại những xu hướng và thói quen vốn đã có.

## [Flat Error Codes Are Not Enough](https://home.expurple.me/posts/flat-error-codes-are-not-enough/)

Dmitrii Aleksandrov phản biện quan điểm rằng mỗi thư viện chỉ cần một kiểu lỗi duy nhất gồm hai phần: thông điệp dành cho người dùng và một enum ErrorCode phẳng để máy xử lý. Tác giả đồng ý cách này ổn trong mã ứng dụng, nơi hiếm khi cần phục hồi lỗi phức tạp, nhưng cho rằng nó không đủ với các thư viện cấp cao thiên về I/O, nơi caller cần đủ chi tiết để phục hồi có chủ đích.

Ví dụ lấy từ codebase thực tế bằng Rust: ORM `sea_orm` được xây dựng trên driver `sqlx`. `sea_orm::DbErr` lồng bên trong một `sqlx::Error`, tiếp đó là `sqlx::DatabaseError` chứa thông tin thô từ hệ quản trị cơ sở dữ liệu như loại vi phạm ràng buộc (unique, foreign key, check) và tên ràng buộc. Ứng dụng dựa vào dữ liệu có cấu trúc này để tạo thông điệp dễ hiểu khi dữ liệu không hợp lệ. Nếu `sea_orm` không lồng và công khai lỗi của `sqlx`, nó sẽ phải sao chép toàn bộ chức năng đó hoặc bỏ đi, cả hai đều đáng tiếc. Hơn nữa, ngay cả khi có đủ mã lỗi, biết rằng "có vi phạm CHECK constraint" vẫn chưa đủ mà cần cả tên ràng buộc; nếu không, ứng dụng phải phân tích ngược từ chuỗi thông điệp, một cách làm kém tin cậy. Vì vậy với thư viện I/O phức tạp, lỗi lồng nhau kèm dữ liệu có cấu trúc là cần thiết.

## [Who will be the senior engineers of 2035?](https://theengineeringmanager.substack.com/p/who-will-be-the-senior-engineers)

James Stanier đặt ra câu hỏi đáng suy ngẫm: senior engineer của năm 2035 sẽ đến từ đâu? Con đường truyền thống dựa vào những task ít rủi ro, pair programming, người hướng dẫn và việc học từ sai lầm. Nhưng các đợt sa thải hậu Covid, tuyển dụng chậm lại, cộng với việc AI đang đảm nhận những task nhỏ và sửa lỗi vốn là bài tập rèn luyện lý tưởng cho junior, khiến đường ống tạo ra senior bị nghẽn ở nhiều khâu cùng lúc. Kinh nghiệm thực chiến, thứ "sẹo" tích lũy từ những lần sai rồi sửa, không thể thay thế bằng việc hỏi đáp AI.

Tác giả phác họa ba kịch bản. Thứ nhất là khủng hoảng nhân lực: sự thiếu hụt không lộ ra ngay mà bùng lên vào năm 2035, khi hệ thống quan trọng sập lúc 3 giờ sáng và không còn ai đủ hiểu để xử lý. Thứ hai là sự phân cực: một bên là những người điều phối AI để ra tính năng nhanh nhưng nền tảng nông, bên kia là số ít kỹ sư hiểu sâu và ngày càng đắt đỏ, còn tầng giữa biến mất. Thứ ba lạc quan hơn, dựa trên lịch sử: mỗi tầng trừu tượng mới như BASIC, JavaScript hay điện toán đám mây đều từng bị coi là dấu chấm hết cho lập trình viên mới vào nghề, nhưng thực tế lại tạo ra những điểm vào khác. Kết cục nào xảy ra phụ thuộc vào quyết định hôm nay về việc tuyển ai, hướng dẫn ai và cho ai cơ hội được thất bại an toàn.

## [Repository pattern in Go service](https://pawelgrzybek.com/repository-pattern-in-go-service/)

Pawel Grzybek hướng dẫn áp dụng Repository pattern, một mẫu thiết kế thuộc Domain-Driven Design, vào service viết bằng Go. Tình huống mở đầu rất quen thuộc: dự án khởi đầu với một file `main.go`, rồi dần phình to thành mớ phụ thuộc chéo, trách nhiệm không còn tách bạch và rất khó kiểm thử. Repository pattern giúp tránh điều đó ngay từ đầu bằng cách đặt phần lưu trữ dữ liệu sau các interface được định nghĩa trong domain, còn các adapter cụ thể cho Postgres, SQLite hay DynamoDB nằm ở nơi khác, tạo ra quan hệ phụ thuộc một chiều.

Ví dụ thực tế tổ chức dự án theo domain thay vì nhóm theo loại file như `models/` hay `services/`, phù hợp hơn với triết lý package của Go. Mỗi domain gồm model (định nghĩa struct, kiểm tra hợp lệ và các lỗi đặc thù), service (chứa logic nghiệp vụ và chỉ biết repository qua interface, không quan tâm bên dưới là cơ sở dữ liệu nào), repository (hiện thực interface và làm việc trực tiếp với cơ sở dữ liệu), và tầng giao tiếp HTTP, gRPC hay WebSocket có thể thay đổi mà không phải sửa logic nghiệp vụ. Lợi ích lớn nhất là service có thể được kiểm thử độc lập nhờ dependency injection, và việc đổi cơ sở dữ liệu chỉ cần thay repository.

## [Go Bitwise Flags and Bitmasks: Configuration Pattern Guide](https://iampavel.dev/blog/go-bitwise-flags-config)

Asaduzzaman Pavel chia sẻ một khoảnh khắc rất thực tế: khi đang thêm biến boolean thứ tám vào struct cấu hình, anh nhận ra đã đến lúc chuyển sang bitmask. Mỗi cờ là một lũy thừa của 2, chiếm đúng một bit, có thể kết hợp bằng OR, kiểm tra bằng AND, xóa bằng AND NOT và đảo bằng XOR, và mỗi phép kiểm tra chỉ tốn một lệnh CPU, không rẽ nhánh, không cấp phát bộ nhớ.

Tuy vậy, tác giả nói rõ không nên dùng bitmask cho cấu hình đơn giản hay CRUD API, vì struct gồm các biến boolean vẫn dễ đọc hơn. Bitmask phát huy tác dụng khi mô hình hóa quyền truy cập tệp (đọc, ghi, thực thi), tập tùy chọn của middleware gRPC hoặc HTTP được kiểm tra ở mỗi request, cờ của query builder như distinct hay for_update, hoặc khi bọc thư viện C và syscall vốn dùng quy ước này. Bài viết hướng dẫn khai báo cờ gọn gàng bằng `iota` kết hợp dịch bit (`1 << iota`), đồng thời cảnh báo rằng hệ thống kiểu của Go không bảo vệ bạn khỏi việc gán giá trị rác hay trộn lẫn các loại cờ, nên hãy bọc thao tác trong các phương thức như `Has()` hoặc trong một struct. Cuối cùng là cách tự viết JSON marshal và unmarshal để lưu trữ gọn nhưng cấu hình vẫn dễ đọc.

## [The Best Library Might Do Less](https://martiansoftware.com/articles/the-best-library-might-do-less)

Tác giả đưa ra quan điểm đi ngược số đông: khi viết thư viện, ta rất dễ mắc "generalization bug", tức cố giải quyết mọi tình huống có thể, khiến thư viện phình to, phức tạp và kém giá trị hơn. Dấu hiệu nhận biết là khi bạn liên tục hỏi "nếu developer muốn..." và bắt đầu thêm những lớp nghi thức kiểu Manager, Service, nhiều dependency ngoài, API với vô số kiểu dữ liệu, yêu cầu gọi hàm theo trình tự cụ thể, hay thậm chí cần quá nhiều tài liệu.

Ngược lại, thư viện đơn giản dễ hiểu, dễ tin, dễ mô tả, dễ bảo trì và đặc biệt là dễ thay thế, một giá trị lớn hơn ta thường nghĩ. Có những thư viện thực sự phải xử lý mọi trường hợp, và khi đó lời khuyên này không áp dụng. Còn lại, tác giả gợi ý tự hỏi: nhu cầu tối thiểu và phổ biến nhất của người dùng là gì, trình tự sử dụng thường gặp nhất ra sao, những lỗi khó và quan trọng nào cần xử lý đúng; đáp ứng khoảng 80% cho mỗi mục có thể là điểm xuất phát hợp lý. Bài viết khép lại bằng câu hỏi của một đồng nghiệp đã giúp tác giả, một lập trình viên bốn mươi năm kinh nghiệm, tránh cả núi rắc rối: "hay là chúng ta... không làm cái đó thì sao?" Đó không phải lười biếng mà là hiểu rõ vấn đề; thư viện tốt nhất đôi khi là thư viện biết lùi ra khỏi đường đi của người dùng.

---

*Bài viết đã được viết lại bởi Claude Code với Opus 5.5 vào ngày 27/09/2026.*
