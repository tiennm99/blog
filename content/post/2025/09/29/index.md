---
title: "Newsletter #56"
date: 2025-09-29
tags: ["AI-Assisted", "UUID", "Java", "Spec-Driven", "Sorting-Algorithms", "ClickHouse", "AI-Coding"]
categories: ["Newsletter"]
---

*~~Hôm nay mình lại thử nghiệm tiếp [OpenCode](https://opencode.ai/). Kết quả là khi mình gửi 1 url thì nó... stuck luôn :v. Vì vậy mình chuyển qua thử GitHub Copilot, với OpenRouter. Kết quả ban đầu cho thấy GitHub Copilot không detect được Newsletter số trước, nó đánh lại từ #1. Và tags cũng ghi chữ thường, không đúng format mình expect. Mình không ưng ý nên xoá đi, thử lại với OpenAI Codex, kết quả thì để đọc được trang web nó đã hỏi mình n thứ, vả lại còn đòi chạy mấy lệnh python để đọc web, xong cài package bằng pip trực tiếp nữa. Mình thấy không oke với chuyện này nên chuyển qua xài thử [Claude Code Router](https://github.com/musistudio/claude-code-router), chạy Claude Code nhưng với API từ OpenRouter, với model `xAI: Grok 4 Fast`. Bài đầu tiên thấy tóm tắt khá dài.~~ Thôi thì mời bạn thưởng thức Newsletter #56 nhé.*

## [I love UUID, I hate UUID](https://blog.epsiolabs.com/i-love-uuid-i-hate-uuid)

Epsio xây dựng một bộ máy SQL dạng streaming, liên tục thêm và xóa dòng trong cơ sở dữ liệu, nên việc chọn khóa chính ảnh hưởng trực tiếp đến hiệu năng. Họ chọn UUID vì ưu điểm lớn nhất của nó: phía client có thể tự sinh định danh mà không cần hỏi máy chủ. Nhờ vậy người dùng có thể thao tác ngay với một đối tượng vừa tạo trước khi máy chủ xác nhận (cập nhật "lạc quan"), và các lệnh nạp dữ liệu hàng loạt như `COPY` trong PostgreSQL vẫn dùng được, điều mà khóa tự tăng không làm được vì không lấy lại được giá trị vừa sinh.

Vấn đề nằm ở UUIDv4: giá trị hoàn toàn ngẫu nhiên trên không gian 122 bit, nên mỗi lần chèn lại rơi vào một nút lá khác nhau của chỉ mục B-Tree, gây trượt bộ nhớ đệm và tách nút liên tục, làm giảm mạnh tốc độ ghi. UUIDv7 khắc phục bằng cách đặt 48 bit dấu thời gian ở đầu, theo sau là 74 bit ngẫu nhiên, nên các giá trị sinh liên tiếp có thứ tự tăng dần. Thử nghiệm chèn 10 triệu dòng cho thấy chỉ mục UUIDv7 nhỏ hơn 22% (301MB so với 389MB) và thời gian giảm 31% (37,53 giây so với 54,62 giây). Đánh đổi là dấu thời gian có thể làm lộ thời điểm tạo bản ghi nếu định danh xuất hiện ở API công khai, và độ ngẫu nhiên trong cùng một mili giây giảm xuống 74 bit, dù xác suất trùng vẫn gần như bằng không. Bài học cho lập trình viên mới: UUIDv7 là lựa chọn mặc định hợp lý khi cần khóa chính phân tán.

## [What's new in Java 25](https://pvs-studio.com/en/blog/posts/java/1284/)

Bài viết của PVS-Studio điểm qua các JEP trong Java 25, bản phát hành hỗ trợ dài hạn ra mắt tháng 9/2025. Về API mới, Scoped Values (JEP 506) thay thế ThreadLocal bằng cơ chế có vòng đời giới hạn, hạn chế thay đổi giá trị và kế thừa hiệu quả giữa các luồng; Key Derivation Function API (JEP 510) thống nhất cách sinh khóa mật mã; Module Import Declarations (JEP 511) cho phép nhập cả một module bằng một câu lệnh; Compact Source Files và Instance Main Methods (JEP 512) giúp viết chương trình nhỏ mà không cần khai báo lớp rườm rà; còn Flexible Constructor Bodies (JEP 513) cho phép chạy mã nguồn trước lời gọi `super()` hoặc `this()`.

Ở tầng nền tảng, Java 25 bỏ hỗ trợ kiến trúc x86 32 bit (JEP 503), thu gọn phần đầu đối tượng từ 12 xuống 8 byte để tiết kiệm bộ nhớ (JEP 519), và bổ sung chế độ phân thế hệ cho bộ thu gom rác Shenandoah (JEP 521). Nhóm tính năng biên dịch trước (AOT) giúp tạo bộ nhớ đệm dễ hơn (JEP 514) và lưu hồ sơ thực thi phương thức để JIT tối ưu sớm hơn (JEP 515), trong khi JFR được cải thiện độ chính xác khi lấy mẫu (JEP 518) và thêm đo thời gian, truy vết phương thức (JEP 520). Nhìn chung, đây là bước tiến đều đặn tập trung vào hiệu năng, giảm mã nguồn thừa và bảo mật mà vẫn giữ tương thích ngược, rất đáng để lập trình viên Java thử nghiệm.

## ~~[Some Best Practices for Writing Readable Automation Tests](https://blog.scottlogic.com/2025/09/04/some-best-practices-for-writing-readable-automation-tests.html)~~

~~Bài viết từ Scott Logic Blog hướng dẫn các best practices để viết automation tests dễ đọc, sử dụng Playwright với TypeScript. Đối với lập trình viên junior, automation testing giúp kiểm tra ứng dụng tự động, nhưng code test khó maintain nếu không readable, dẫn đến bugs ẩn hoặc team khó collaborate.~~

~~Về assertions, sử dụng expect() flexible như expect(response.status()).toBeOK() để handle codes thành công khác nhau (200, 201) mà không fail sớm, tập trung vào validations quan trọng. Với locators, ưu tiên .getByRole cho accessibility, dễ inspect qua DevTools bằng tab navigation, thay vì .getByTestID có thể confuse screen readers. Luôn advocate cho HTML roles đúng nếu thiếu.~~

~~Naming conventions: Sử dụng backticks cho test names động, ví dụ test(`should return a 400 when User Information is '${variable}'`), cho phép interpolation variables. Structure: Tag tests với {tag: 'THW-000'} để filter runs theo tickets, hoặc annotations cho links chi tiết theo Playwright docs, tăng traceability và longevity.~~

~~Những practices này giúp tests maintainable, accessible và team-friendly. Junior devs nên áp dụng để viết tests rõ ràng, giảm debugging time và cải thiện QA process.~~

~~**Điểm chính:**~~
~~- Assertions flexible: Sử dụng toBeOK() cho HTTP success codes đa dạng.~~
~~- Locators accessible: Ưu tiên .getByRole qua DevTools inspection.~~
~~- Dynamic naming: Backticks cho variable interpolation trong test titles.~~
~~- Tagging annotations: Lưu traceability với tickets cho better collaboration.~~

## [Tech Debt: Understanding its Business Impact - Optimism](https://www.optimism.io/blog/tech-debt-understanding-its-business-impact)

Adrian Sutton (OP Labs) cho rằng thay vì than phiền chung chung về "nợ kỹ thuật", đội ngũ nên chỉ ra chi phí kinh doanh cụ thể của từng loại, vì không phải khoản nợ nào cũng đắt như nhau: có khoản là đánh đổi có chủ đích để phát hành nhanh hơn, có khoản âm thầm tiêu tốn nguồn lực mà không mang lại giá trị. Ông chia nợ kỹ thuật thành bảy nhóm: độ phức tạp không cần thiết (nên đơn giản hóa dần thay vì viết lại toàn bộ), bảo trì định kỳ bị trì hoãn như cập nhật thư viện phụ thuộc (giống việc bỏ bảo dưỡng xe, về sau hỏng nặng và tốn kém hơn), trải nghiệm sử dụng kém do cắt phạm vi để kịp hạn, lỗi và xử lý sự cố làm gián đoạn công việc, mã nguồn chết vẫn phải bảo trì, thiếu kiểm thử tự động, và vòng phản hồi chậm.

Theo tác giả, mã nguồn thiếu kiểm thử tự động là một trong những dạng nợ đắt nhất, nhất là với hệ thống đòi hỏi đồng thuận như blockchain, còn vòng phản hồi chậm (chờ biên dịch, kiểm thử, xác thực) gây hại năng suất lập trình viên nhiều nhất. Ví dụ thực tế tại OP Labs là việc chưa triển khai được chuỗi với cơ chế fault proof không cần cấp quyền được cấu hình đúng, khiến nhóm tốn nhiều thời gian. Các khuyến nghị gồm: định lượng tác động kinh doanh, theo dõi mẫu cảnh báo và dành năng lực cho độ tin cậy, có quy trình gỡ bỏ tính năng lỗi thời, mở rộng kiểm thử tự động để nhiều người có thể đóng góp an toàn, và ưu tiên rút ngắn vòng phản hồi.

## [Spec-Driven Development with AI: A New Approach and a Journey into the Past](https://foojay.io/today/spec-driven-development-with-ai-a-new-approach-and-a-journey-into-the-past/)

Simon Martinelli, Java Champion với hơn 30 năm làm kiến trúc phần mềm, chỉ ra rằng trong quy trình truyền thống, mã nguồn dần trở thành nguồn sự thật duy nhất, còn tài liệu yêu cầu bị bỏ quên và lỗi thời. AI giúp viết mã nhanh hơn nhưng không giải quyết gốc rễ đó. Lấy cảm hứng từ Rational Unified Process (RUP) những năm 2000, ông đề xuất đảo ngược thứ bậc: yêu cầu nghiệp vụ trở thành nền móng cho mọi hoạt động phía sau.

Quy trình gồm sáu bước: con người cùng các bên liên quan lập danh mục yêu cầu nghiệp vụ; AI sinh sơ đồ use case nghiệp vụ, mô hình thực thể, sơ đồ use case hệ thống, đặc tả use case hệ thống và cuối cùng là mã nguồn ứng dụng. Mỗi sản phẩm trung gian đều được bên nghiệp vụ hoặc lập trình viên xem xét trước khi sang bước tiếp theo. Toàn bộ được lưu dưới dạng Markdown và PlantUML trong Git để dễ so sánh thay đổi, còn công cụ như Claude Code đóng vai trò giữ tính nhất quán khi yêu cầu thay đổi; phần ứng dụng dùng Vaadin, Spring Boot và jOOQ, chia thành các epic độc lập để tránh phụ thuộc chéo. Thông điệp chính: "Viết mã là phần dễ; làm đúng yêu cầu mới là nơi tạo ra giá trị" — AI chỉ phát huy khi đặc tả đầu vào có chất lượng cao.

## [On Good Software Engineers](https://candost.blog/on-good-software-engineers/)

Đặt kỳ vọng cho kỹ sư phần mềm luôn khó vì mỗi công ty có nhu cầu và văn hóa khác nhau. Tác giả đưa ra một định nghĩa đơn giản: kỹ sư tốt là người mà quản lý hay đồng nghiệp có thể tin tưởng giao việc để thúc đẩy dự án, vì họ sẽ phối hợp tốt với đội ngũ và liên tục mang lại giải pháp chất lượng. Định nghĩa này áp dụng cho mọi cấp độ, từ junior xử lý nhiệm vụ nhỏ đến staff dẫn dắt các sáng kiến phức tạp, chỉ khác nhau ở quy mô.

Những phẩm chất cụ thể gồm: giao tiếp rõ ràng cả khi viết lẫn khi nói, biết cho và nhận phản hồi, lắng nghe đồng cảm; nắm vững quy trình như review mã nguồn, RFC, ADR hay Scrum và biết khi nào có thể linh hoạt; chịu khó tìm hiểu văn hóa, thứ bậc và chuẩn mực của tổ chức thay vì áp một cách làm cho mọi nơi; tự nhiên lồng chất lượng vào công việc qua TDD và tái cấu trúc mà không cần xin phép; cân bằng giữa sự hoàn hảo kỹ thuật và tiến độ mà các bên liên quan cần; giảm độ phức tạp qua thiết kế module và chiến lược kiểm thử hợp lý; giữ trách nhiệm, dám nhận vấn đề lạ và giải quyết cùng đội thay vì "ném vấn đề qua hàng rào". Kỹ sư xuất sắc là người làm tất cả những điều đó một cách chủ động, kể cả sửa quy trình hỏng mà không chờ ai cho phép. Theo tác giả, đây chỉ là chuẩn mực nghề nghiệp cơ bản chứ không phải đòi hỏi quá mức.

## [Why I do programming](https://esafev.com/notes/why-i-do-programming/)

Tác giả kể lại hành trình đến với lập trình bắt nguồn từ sự tò mò: lên ba tuổi đã cầm tua vít tháo tung máy móc để xem bên trong có gì. Đi học, họ làm quen với MS-DOS, Logo và Pascal; đến mười tuổi, có máy tính riêng và kết nối Internet, họ tự học HTML, CSS, JavaScript và thậm chí kiếm tiền bằng cách làm bài tập hộ bạn bè. Tuổi thiếu niên gắn với việc viết script PAWN cho các bản mod game SAMP và MTA với mong muốn xây dựng thế giới nhiều người chơi, rồi dùng LSL tạo quần áo, công trình và script trong Second Life, mang lại thu nhập thật. Muốn tạo tác động ngoài thế giới ảo, năm mười sáu tuổi họ mở một mảng kinh doanh bán lại hàng số để tự mua máy tính và thiết bị âm nhạc.

Ở đại học ngành Kỹ thuật Đổi mới, tác giả học CAD, an ninh mạng và cả triết học. Startup đầu tiên, MipoTheBot — một bot Slack dành cho freelancer — dạy họ nhiều về thiết kế, phát triển và tầm quan trọng của bán hàng, tiếp thị. Sau hai lần kiệt sức, một kỳ nghỉ kéo dài một tháng ở châu Âu giúp họ tìm lại niềm đam mê. Với tác giả, lập trình là cách để khám phá, mày mò và thỏa mãn trí tò mò, với những chân trời không bao giờ cạn như hệ thống, mạng phân tán hay công nghệ mới; thử thách lớn nhất là giữ được sự tập trung giữa vô vàn khả năng.

## [The unreasonable effectiveness of modern sort algorithms](https://github.com/Voultapher/sort-research-rs/blob/main/writeup/unreasonable/text.md)

Bài nghiên cứu đặt một câu hỏi thú vị: nếu biết trước dữ liệu chỉ có đúng bốn giá trị u64 khác nhau (mẫu `random_d4`), một thuật toán sắp xếp viết riêng cho miền dữ liệu đó sẽ nhanh hơn thuật toán tổng quát đến mức nào? Tác giả, người đồng phát triển các thuật toán sắp xếp trong thư viện chuẩn của Rust, đo trên AMD Ryzen 9 5900X bằng bộ benchmark `sort-research-rs` với nhiều kích thước đầu vào khác nhau.

Các cách tiếp cận chuyên biệt gồm: đếm bằng BTreeMap, đếm bằng HashMap rồi sắp xếp lại các khóa, dùng `match` cứng cho bốn giá trị (bị giới hạn bởi việc dự đoán rẽ nhánh sai), phiên bản không rẽ nhánh (branchless), và hàm băm hoàn hảo (perfect hash function) — cách nhanh nhất, đạt khoảng 1,7 tỷ phần tử mỗi giây. Phía tổng quát có `slice::sort_unstable` (ipnsort), driftsort cùng các cài đặt như pdqsort, crumsort. Điều đáng ngạc nhiên là thư viện chuẩn của Rust, dù không biết gì về dữ liệu, vẫn cạnh tranh sát với nhiều giải pháp chuyên biệt nhờ cơ chế xử lý dữ liệu ít giá trị phân biệt kế thừa từ pdqsort; trong khi các cài đặt C bị hạn chế vì không thể nội tuyến hàm so sánh do người dùng truyền vào. Kết luận: tối ưu theo miền dữ liệu có thể thắng lớn khi giả định đúng, nhưng sẽ panic hoặc cho kết quả sai khi dữ liệu thay đổi. Với lập trình viên, hãy tin tưởng thư viện chuẩn trước khi tự viết thuật toán riêng.

## [How we made ClickHouse log queries 99.5% faster with resource fingerprinting](https://signoz.io/blog/query-performance-improvement/)

Đội ngũ SigNoz gặp vấn đề truy vấn log chậm: chỉ một bộ lọc theo namespace cũng phải quét 41.498 trên 41.676 khối dữ liệu (99,5%). Nguyên nhân là log từ nhiều pod, dịch vụ và môi trường nằm lẫn lộn trong các khối lưu trữ, khiến cơ sở dữ liệu không thể bỏ qua khối nào. ClickHouse lưu dữ liệu theo cột, chia thành các granule khoảng 8.192 dòng, và dùng chỉ mục khóa chính dạng thưa (mỗi khối một mục chứ không phải mỗi dòng). Mệnh đề `ORDER BY` quyết định thứ tự lưu vật lý, nên nếu dữ liệu được sắp xếp phù hợp, ClickHouse có thể bỏ qua cả khối không liên quan; các chỉ mục phụ như bloom filter cũng giúp được phần nào nhưng kém hiệu quả hơn tối ưu khóa chính.

Giải pháp là tạo "dấu vân tay tài nguyên" (resource fingerprint) bằng cách băm chuỗi thuộc tính phân cấp của nguồn log, ví dụ `cluster;namespace;pod` với Kubernetes, `container.name;container.image` với Docker, hay thẻ môi trường và log stream với AWS CloudWatch. Dấu vân tay này được đặt ngay sau mốc thời gian trong khóa sắp xếp: `ORDER BY (ts_bucket_start, resource_fingerprint, severity_text, timestamp, id)`, giúp log của cùng một tài nguyên nằm liền nhau. Kết quả, truy vấn namespace giờ chỉ đọc 222 trên 26.135 khối (0,85%), vẫn giữ tương thích lược đồ. Bài học cho lập trình viên: hãy sắp xếp dữ liệu vật lý theo cách người dùng thường truy vấn để tận dụng chỉ mục thưa.

## [AI Coding](https://geohot.github.io/blog/jekyll/update/2025/09/12/ai-coding.html)

George Hotz (geohot) cho rằng khả năng "lập trình" của AI đang bị thổi phồng, và nên xem AI như một trình biên dịch hơn là một trí tuệ biết viết mã: bạn đưa vào đặc tả (prompt), nhận lại kết quả đã "biên dịch". Nếu bạn tin trình biên dịch biết lập trình thì cứ tin AI biết lập trình. Việc tinh chỉnh qua lại với AI thường không tốt hơn bao nhiêu so với chỉ sửa lại prompt, giống giới hạn của các IDE. Tiếng Anh là một "ngôn ngữ lập trình" tệ vì ba lý do: thiếu chính xác nên chỉ hiệu quả với những tác vụ phổ biến, không có đặc tả nên kết quả không tất định, và một thay đổi nhỏ trong prompt có thể ảnh hưởng khó lường đến toàn bộ đầu ra.

Tác giả dẫn một nghiên cứu cho thấy AI khiến lập trình viên cảm thấy nhanh hơn 20% nhưng thực tế lại chậm hơn 19%, và đặt câu hỏi về hàng tỷ đô la đầu tư dựa trên cảm giác đó. Ông dự đoán AI sẽ thay thế công việc lập trình giống cách trình biên dịch và bảng tính từng thay thế lực lượng lao động trước đây, không phải nhờ trí thông minh mà nhờ gom công cụ lại. Tiến bộ thực sự đến từ việc xây dựng ngôn ngữ, trình biên dịch và thư viện tốt hơn. Trong phần cập nhật, tác giả làm rõ mình phản đối sự thổi phồng chứ không phản đối AI, và ủng hộ việc nhìn nhận đúng điểm mạnh, điểm yếu của công cụ.

*Đánh giá sơ bộ thì combo này ổn áp, chạy ổn định, không hỏi prompt linh tinh để xử lý việc đọc WebFetch, kết quả thì hơi dài dòng, nhiều lỗi vặt, mình sẽ thử thêm một số model khác trong các bài viết sắp tới để tìm được 1 combo vừa free lại chất lượng :D*

---

*Bài viết đã được viết lại bởi Claude Code với Opus 5.5 vào ngày 27/09/2026.*
