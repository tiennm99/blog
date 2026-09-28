---
title: "Newsletter #94"
date: 2026-04-02
tags: ["AI-Assisted", "AI", "Java", "Go", "Performance", "Shell", "Developer Productivity"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #94.*

## [Bên trong mã nguồn Claude Code](https://gist.github.com/Haseeb-Qureshi/d0dc36844c19d26303ce09b42e7188c1)

Sau khi mã nguồn Claude Code CLI bị rò rỉ lên GitHub, Haseeb Qureshi đã đọc qua các mô-đun chính và so sánh kiến trúc của nó với Codex của OpenAI. Điều bất ngờ đầu tiên là giao diện terminal thực chất là một ứng dụng React được hiển thị bằng thư viện Ink, cùng mô hình tư duy với ứng dụng web, trong khi Codex viết giao diện hoàn toàn bằng Rust. Toàn bộ vòng đời một yêu cầu chạy trên async generator: mọi sự kiện đi qua một luồng duy nhất, để CLI, SDK và IDE bridge cùng tiêu thụ và chỉ khác nhau ở cách hiển thị. Để xử lý các phiên làm việc dài, Claude Code dùng bốn chiến lược nén ngữ cảnh xếp tầng (proactive, reactive, snip và context collapse), trong khi Codex chỉ có hai.

Prompt hệ thống được ghép từ khoảng 15 hàm và chia đôi bằng một điểm đánh dấu ranh giới: nửa tĩnh (khoảng 3.000 token hướng dẫn) được lưu bộ nhớ đệm dùng chung cho mọi người dùng, nửa động chứa ngữ cảnh riêng của từng phiên như `CLAUDE.md` hay chỉ dẫn MCP. Kỹ sư nội bộ Anthropic còn nhận prompt khác người dùng bên ngoài, chẳng hạn giới hạn 25 từ giữa các lần gọi công cụ hay một tác tử xác minh đối kháng. Cờ tính năng lúc biên dịch của Bun giúp loại bỏ mã chết và để lộ những tính năng chưa phát hành như `VOICE_MODE` và `KAIROS`. Kết luận của tác giả: trong khoảng 500 nghìn dòng TypeScript, lời gọi API chỉ chiếm vài trăm dòng; mô hình là phần dễ thay thế nhất, còn "harness" (khung vận hành bao quanh) mới là nơi tích lũy nhiều năm kinh nghiệm thực chiến.

## ~~[AI sẽ đẩy nhanh nợ kỹ thuật của bạn](https://securosis.com/ai/ai-will-accelerate-your-tech-debt/)~~

Chris Farris cho rằng nhiều tổ chức đang giống những gia đình sống nhờ đồng lương tháng: sau nhiều năm ưu tiên ra tính năng hơn xây kiến trúc bền vững, họ chỉ cách phá sản một sự cố lớn, và mỗi sự cố nhỏ lại ngốn thời gian lẽ ra dùng để trả nợ kỹ thuật. Tác giả ví đầu tư AI lúc này như chính sách giảm thuế: dễ chịu và có thể tăng năng suất trước mắt, nhưng làm vấn đề cấu trúc tệ hơn. Khi chi phí viết mã nguồn gần bằng không, rào cản kinh tế tự nhiên ngăn các tính năng thiếu cân nhắc biến mất, kéo theo nhiều mã hơn, bề mặt tấn công rộng hơn và hệ thống phức tạp hơn cho cùng một đội ngũ vốn đã quá tải.

Về bảo mật, dựa trên kịch bản "Core Collapse" của Rich Mogull, tác giả cảnh báo kẻ tấn công dùng AI sẽ tìm và khai thác lỗ hổng nhanh hơn tốc độ vá lỗi của bên phòng thủ, và tổ chức không hiểu nổi môi trường của chính mình thì không thể dùng AI để tự vệ. Khác với Mogull, ông cho rằng không thể thuê ngoài việc giảm nợ kỹ thuật. Giải pháp ông đề xuất là "Technology Troika": ba nhóm Tài chính/FinOps, Bảo mật và Nền tảng phối hợp xây dựng nền móng vững chắc trước khi mở toang cánh cửa AI. Việc cần làm gồm đầu tư vào phần nền tảng kém hào nhoáng như quản lý danh tính, phân loại dữ liệu và lập bản đồ phụ thuộc, đồng thời chấp nhận loại bỏ hẳn một số hệ thống thay vì tái cấu trúc. Mua thêm công cụ AI không cứu được một nền móng đã mục.

## [Cách Slack xây dựng lại hệ thống thông báo](https://slack.engineering/how-slack-rebuilt-notifications/)

Đội ngũ kỹ sư Slack kể lại cách họ xây dựng lại hệ thống thông báo từ đầu để giảm cảm giác bị làm phiền. Thông báo nằm trong ba nguyên nhân hàng đầu khiến người dùng gửi yêu cầu hỗ trợ, và vấn đề không chỉ nằm ở số lượng mà ở chính kiến trúc: máy tính và điện thoại có bốn mô hình cài đặt mâu thuẫn nhau, "nhận thông báo về cái gì" bị gắn chặt với "nhận bằng cách nào", cài đặt không đồng bộ giữa các thiết bị, còn tùy chọn nâng cao thì nằm rải rác khắp nơi.

Giải pháp là gom về một mô hình thống nhất: mỗi kênh chỉ còn ba lựa chọn "Tất cả bài viết mới", "Chỉ đề cập" hoặc "Tắt tiếng", còn thông báo đẩy được bật tắt riêng cho máy tính và điện thoại. Cái khó nằm ở khâu di chuyển hàng triệu người dùng. Để giữ tương thích ngược và có thể quay lui an toàn, đội ngũ không đổi dữ liệu ở tầng cơ sở dữ liệu mà diễn giải lại cài đặt cũ ngay lúc đọc, chẳng hạn "Tắt" trước đây được hiểu thành "Chỉ đề cập" kèm tắt thông báo đẩy. Họ cũng bỏ nút "Lưu" để thay đổi có hiệu lực ngay, dùng chung các thành phần React giữa các nền tảng và viết lại một số màn hình iOS lâu đời nhất. Kết quả là mức tương tác với phần cài đặt tăng gấp 5 lần và vẫn duy trì nhiều tuần sau khi ra mắt.

## [Nhanh hơn, tốt hơn, và còn nhiều hơn nữa](https://randsinrepose.com/archives/better-faster-and-even-more/)

Rands chia sẻ những công cụ và thói quen anh tích lũy trong 90 ngày làm việc cùng Claude Code, khi chi phí đi từ "ý tưởng ngẫu nhiên" đến "thứ chạy được" chưa bao giờ thấp như bây giờ. Mọi thứ nằm trong `~/Projects/`, mỗi dự án là một kho Git riêng, cùng ba kho đặc biệt: `dotfiles` chứa cấu hình máy được liên kết tượng trưng về đúng vị trí, `credentials` là kho riêng tư cho khóa API, và `scripts` gồm các công cụ dòng lệnh tự viết. Mỗi dự án có hai tệp: `CLAUDE.md` là hướng dẫn tĩnh về cách xây dựng và triển khai, còn `WORKLOG.md` là nhật ký ghi lại những gì đã điều tra, thay đổi và quyết định trong từng phiên, giúp phiên sau nắm lại ngữ cảnh.

Những thủ thuật nhỏ khác giúp giảm ma sát hằng ngày: để Claude đẩy kết quả thẳng vào clipboard qua `pbcopy`, chụp một vùng màn hình vào clipboard rồi dán cho Claude thay vì mô tả lỗi bằng lời, và một script kiểm tra hơn 30 mục cấu hình khi chuyển giữa ba máy. Tác giả còn phân biệt rõ memories, skills và hooks của Claude Code, cấu hình thanh trạng thái hiển thị giới hạn sử dụng, và đặt tiêu đề tab terminal theo tên dự án. Theo anh, tốc độ tăng lên chỉ khiến anh muốn đi nhanh hơn nữa, và mỗi lần bớt được một điểm ma sát lại tạo thêm động lực.

## [Java rất nhanh — mã nguồn của bạn có thể không](https://jvogel.me/posts/2026/java-is-fast-your-code-might-not-be/)

Jonathan Vogel xây dựng một ứng dụng xử lý đơn hàng bằng Java cho buổi nói chuyện tại DevNexus. Ứng dụng chạy đúng, kiểm thử đều qua, nhưng khi sửa tám anti-pattern phổ biến mà không đổi kiến trúc hay JDK, thời gian xử lý giảm từ 1.198ms xuống 239ms, thông lượng tăng từ 85.000 lên 419.000 đơn hàng mỗi giây, bộ nhớ heap giảm từ hơn 1GB xuống 139MB. Điểm chung của các lỗi này là biên dịch bình thường, dễ lọt qua review mã nguồn và chỉ lộ ra khi có dữ liệu profiling.

Tám anti-pattern gồm: nối chuỗi bằng `+` trong vòng lặp gây sao chép O(n²), nên dùng `StringBuilder`; gọi Stream duyệt toàn bộ danh sách bên trong vòng lặp, điểm nóng lớn nhất chiếm gần 71% mẫu CPU, có thể thay bằng một lượt tích lũy với `merge()`; dùng `String.format()` trên đường chạy nóng; autoboxing với `Long` thay vì `long`, tạo khoảng 16MB rác heap cho mỗi triệu phần tử; dùng ngoại lệ để điều khiển luồng; đồng bộ hóa phạm vi quá rộng, nên chuyển sang `ConcurrentHashMap` và `LongAdder`; tạo lại các đối tượng có thể tái sử dụng như `ObjectMapper`; và ghim luồng ảo trên JDK 21–23 khi dùng `synchronized` cùng I/O chặn, có thể xử lý bằng `ReentrantLock`. Đây là phần đầu của loạt bài, phần sau sẽ đi vào dữ liệu profiling cụ thể.

## [Quy ước đặt tên trong Go: Hướng dẫn thực hành](https://www.alexedwards.net/blog/go-naming-conventions)

Alex Edwards tổng hợp có hệ thống cách đặt tên trong Go, từ ba quy tắc bắt buộc cho định danh (chỉ gồm chữ cái unicode, chữ số và gạch dưới; không bắt đầu bằng chữ số; không trùng từ khóa) đến các quy ước mà cộng đồng tuân theo. Go dùng `camelCase` cho định danh không xuất và `PascalCase` cho định danh xuất, vì chữ cái đầu quyết định định danh có truy cập được từ gói khác hay không; `snake_case` gần như không xuất hiện. Từ viết tắt phải viết hoa hoặc thường nhất quán: `apiKey` và `APIKey` đều đúng, còn `ApiKey` thì sai; tương tự, dùng `userID` chứ không phải `userId`.

Về độ dài, nguyên tắc là phạm vi sử dụng càng xa nơi khai báo thì tên càng cần mô tả rõ: biến trong vòng lặp ngắn có thể chỉ một chữ cái, còn biến dùng rộng rãi cần tên đầy đủ ý nghĩa. Tác giả khuyên tránh đưa kiểu dữ liệu vào tên, tránh trùng tên hàm dựng sẵn và tên gói trong thư viện chuẩn như `json` hay `log`, đồng thời mặc định viết định danh không xuất và chỉ xuất khi thật sự cần, dẫn lời The Pragmatic Programmer rằng xuất càng ít thì càng dễ tái cấu trúc bên trong gói. Tên gói nên ngắn, viết thường, không dùng dấu phân cách (`ordermanager` chứ không phải `order_manager`) và tránh các tên mang nghĩa đặc biệt như `vendor`, `testdata` hay `internal`.

## [Bộ kỹ năng tác tử AI cho dự án Go](https://github.com/samber/cc-skills-golang)

Đây là bộ sưu tập kỹ năng (skills) chuyên cho Go, dùng được với nhiều trợ lý lập trình AI như Claude Code, Codex, Cursor, Copilot, Gemini CLI và Antigravity. Mỗi kỹ năng là một bộ hướng dẫn tái sử dụng được, chỉ nạp khi cần nên không làm phình ngữ cảnh của tác tử. Dự án được khởi tạo bằng Claude Code từ chính các commit Go của tác giả, sau đó được con người chỉnh sửa, kiểm thử và làm lại; tác giả nói thẳng rằng kỹ năng do AI tự tạo ra là vô dụng.

Bộ kỹ năng bao phủ nhiều mảng: phong cách mã nguồn, đặt tên, cấu trúc dữ liệu, cơ sở dữ liệu, mẫu thiết kế, tài liệu, xử lý lỗi, khả năng quan sát, hiệu năng, đo hiệu năng, bảo mật và kiểm thử. Các kỹ năng được chia thành những đơn vị nhỏ có tham chiếu chéo, ví dụ quy tắc ghi log liên quan đến lỗi nằm trong `golang-error-handling` chứ không nằm trong `golang-observability`. Mỗi kỹ năng đều đi kèm số liệu đo mức giảm lỗi so với khi không dùng, chẳng hạn khoảng 40% với phong cách mã nguồn và 53% với tài liệu. Có thể cài qua CLI `skills`, qua marketplace plugin của Claude Code, hoặc sao chép thủ công vào thư mục khám phá kỹ năng của từng công cụ.

## [Những thủ thuật lập trình nhỏ rất quan trọng](https://will-keleher.com/posts/small-programming-tricks-matter/)

Will Keleher cho rằng một phần đáng kể năng suất kỹ sư đến từ việc tích lũy những "mẩu kiến thức nhỏ": các thủ thuật không đòi hỏi nền tảng sâu nhưng giúp công việc hằng ngày nhanh hơn ngay lập tức. Ví dụ gồm tìm kiếm mờ lịch sử lệnh bằng `fzf` với Ctrl+R (hoặc `atuin` nếu muốn mạnh hơn), chạy `SELECT` không cần `FROM` để thử nhanh một hàm trong cơ sở dữ liệu, dùng `EXPLAIN ANALYZE` để tối ưu truy vấn, ranh giới từ `\b` trong biểu thức chính quy, và "git pickaxe" `git log -S` để tìm các commit đã thêm hoặc xóa một chuỗi, cùng `git checkout -` để quay về HEAD trước đó.

Tác giả cũng nhắc đến các tính năng JavaScript hiện đại như `Array.flatMap`, `Object.entries`, `Promise.withResolvers`, khuyên dùng `ripgrep` thay cho `grep` và dùng glob như `**/*.md` thay cho nhiều lệnh `find`. Trong công ty, những mẩu kiến thức kiểu "muốn gỡ lỗi vấn đề này thì xem nguồn dữ liệu kia" hay "ai là người rành mảng này" còn giá trị hơn. Ở công ty cũ, tác giả chia sẻ mỗi ngày một thủ thuật trên Slack; nhịp một thủ thuật mỗi ngày đủ hữu ích mà không làm mọi người quá tải, và ông gợi ý các kỹ sư có kinh nghiệm nên thử làm tương tự.

## [Thủ thuật shell thực sự hữu ích](https://blog.hofstede.it/shell-tricks-that-actually-make-life-easier-and-save-your-sanity/)

Christian Hofstede-Kuhn tổng hợp những phím tắt và thủ thuật terminal mà nhiều lập trình viên bỏ lỡ sau khi đã quen `ls`, `cd` và `grep`. Phần đầu gồm các thủ thuật chạy được trên hầu hết shell POSIX: Ctrl+W xóa một từ, Ctrl+U và Ctrl+K cắt phần đầu hoặc cuối dòng, Ctrl+Y dán lại, Ctrl+A và Ctrl+E nhảy về đầu hoặc cuối dòng; `cd -` để chuyển qua lại giữa hai thư mục, `pushd`/`popd` để quản lý ngăn xếp thư mục; và hai dòng an toàn nên có trong mọi script là `set -e` (thoát khi có lỗi) và `set -u` (báo lỗi khi dùng biến chưa gán).

Phần thứ hai dành cho Bash và Zsh: tìm kiếm lịch sử bằng Ctrl+R, nhấn Ctrl+X rồi Ctrl+E để mở trình soạn thảo khi cần viết lệnh dài, mở rộng dấu ngoặc nhọn như `cp file{,.bak}` để sao lưu nhanh hay `mkdir -p project/{src,tests,docs}` để tạo nhiều thư mục cùng lúc, thay thế tiến trình kiểu `diff <(sort file1) <(sort file2)`, và `disown` để tách tiến trình khỏi shell. Lời khuyên của tác giả: không cần học thuộc tất cả, chỉ cần chọn một thủ thuật, ép mình dùng nó trong một tuần, rồi chuyển sang thủ thuật tiếp theo.

---

*Bài viết đã được viết lại bởi Claude Code với Opus 5.5 vào ngày 27/09/2026.*
