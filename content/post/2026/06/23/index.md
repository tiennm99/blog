---
title: "Newsletter #112"
date: 2026-06-23
tags: ["AI-Assisted", "Newsletter", "Typography", "Design", "Software Engineering", "Code Quality", "Engineering Culture", "Productivity", "Java", "Programming", "Go", "Rust", "Kubernetes", "Infrastructure", "PostgreSQL", "Redis", "Database", "Game Development", "AI Coding", "Product Management", "Package Management", "Supply Chain", "Claude Code", "AI Agents", "MCP", "Performance", "Frontend", "Web Development"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #112.*

## [Một vài pixel font hiện đại thú vị](https://unsung.aresluna.org/a-few-interesting-modern-pixel-fonts/)

Marcin Wichary giới thiệu một số pixel font hiện đại đáng chú ý, nhưng điểm hay không chỉ nằm ở vẻ hoài cổ. Analog Mono sửa một vấn đề quen thuộc của VCR OSD Mono: đường nền quá thấp khiến các chữ có phần đuôi bị kéo lên. Coral Pixels biến hiệu ứng viền màu từng là "lỗi" của hiển thị subpixel thành một đặc điểm thẩm mỹ có chủ ý. Two Slice thì đẩy ý tưởng tối giản tới cực hạn với chiều cao chỉ 2 pixel nhưng vẫn còn đọc được.

Phần đáng suy nghĩ nhất là Geist Pixel của Vercel. Tác giả dùng nó để nhắc rằng một font dùng được trong sản phẩm không chỉ cần hình dạng chữ đẹp. Những phần ít thấy như kerning, metadata, bộ ký tự bổ sung và vertical metrics mới quyết định font có hoạt động ổn khi đưa vào hệ thống giao diện thật hay không. Nói cách khác, pixel font hiện đại có thể giữ được chất hình ảnh cũ, nhưng vẫn cần kỷ luật kỹ thuật của typography trong môi trường sản phẩm.

**Điểm chính:**
- Pixel font hiện đại thường là font vector mô phỏng cảm giác pixel để dùng được trên hệ điều hành và trình duyệt hiện nay.
- Giá trị của một font sản phẩm nằm nhiều ở những phần "vô hình" như metrics, kerning, metadata và hỗ trợ ký tự.
- Hoài cổ có thể là điểm khởi đầu, nhưng tính ổn định khi tích hợp vào giao diện mới là yếu tố quyết định.

## [Những kỹ sư giỏi nhất viết ít mã nguồn hơn](https://shvetsm.github.io/posts/the-best-engineers-write-less-code/)

Bài viết lập luận rằng mã nguồn luôn có chi phí, dù được viết bởi con người hay sinh ra bởi LLM. Phần mềm tệ vẫn gây ra độ trễ, độ phức tạp, chi phí bảo trì, lỗi vận hành và gánh nặng nhận thức. Vì vậy, năng lực quan trọng của một kỹ sư trưởng thành không chỉ là "làm được", mà là biết hỏi vì sao cần xây dựng thứ đó trước khi bắt tay vào làm.

Tác giả nhấn mạnh rằng mỗi tính năng đều kéo theo chi phí dài hạn: sửa lỗi, hạ tầng, hỗ trợ người dùng, di chuyển hệ thống và bảo trì. Kỹ sư tốt giúp stakeholder bằng cách tránh xây những thứ không cần thiết, xác nhận mục tiêu kinh doanh, điều chỉnh phạm vi để tạo giá trị nhanh hơn, rồi lặp lại với phản hồi ngắn. Điểm đo lường không phải số dòng mã tạo ra, mà là giá trị đem lại so với độ phức tạp để lại trong hệ thống.

**Điểm chính:**
- Mã nguồn là trách nhiệm dài hạn; sinh mã nhanh bằng AI không làm biến mất chi phí vận hành và bảo trì.
- Câu hỏi "vì sao chúng ta xây thứ này?" quan trọng không kém năng lực triển khai kỹ thuật.
- Vòng phản hồi ngắn với stakeholder giúp giảm rủi ro xây sai thứ và lãng phí thời gian.
- Kỹ sư giỏi tạo nhiều giá trị với ít độ phức tạp hơn, kể cả bằng cách xóa bớt mã nguồn.

## [Nhanh tốt hơn chậm](https://dubroy.com/blog/fast-is-better-than-slow/)

Patrick Dubroy cho rằng nhiều lập trình viên giỏi nhất mà ông từng làm việc cùng có một điểm chung: họ di chuyển rất nhanh. Không phải theo nghĩa làm việc nhiều giờ hơn, mà là bắt đầu sớm, tạo bản vá hoặc nguyên mẫu nhanh, lấy dữ liệu sớm hơn và học nhanh hơn. Tốc độ tạo ra vòng phản hồi ngắn, giúp ra quyết định tốt hơn và thử được nhiều hướng giải quyết trước khi chọn cách phù hợp.

Bài viết đưa ra vài thói quen thực tế để tăng tốc trong công việc phần mềm: đừng trì hoãn chỉ vì chưa biết bắt đầu từ đâu; tận dụng các khoảng thời gian nhỏ thay vì chờ một khối thời gian hoàn hảo; gửi công việc sớm dù chưa hoàn hảo để nhận phản hồi; hỏi đồng nghiệp thay vì tự xoay sở quá lâu; và chọn đúng trận cần tranh luận trong đánh giá mã nguồn. Tác giả cũng nhấn mạnh việc chỉ làm phần thật sự cần thiết, vì làm "hơn yêu cầu" thường là đoán mò về nhu cầu tương lai và dễ tạo thêm lãng phí.

**Điểm chính:**
- Tốc độ giúp rút ngắn vòng phản hồi, học nhanh hơn và quyết định sớm hơn.
- Làm nhanh không đồng nghĩa với làm quá giờ; nhiều cải thiện đến từ cách bắt đầu, chia nhỏ việc và cộng tác.
- Gửi PR sớm, chấp nhận phản hồi và hỏi đồng nghiệp thường hiệu quả hơn việc tự đánh bóng quá lâu.
- Đừng mở rộng phạm vi khi chưa cần; làm đúng phần bắt buộc giúp tiết kiệm thời gian và giảm rủi ro.

## [Java Cheat Sheet](https://tms-outsource.com/cs/java-cheat-sheet/)

Đây là một tài liệu tra cứu nhanh cho Java, tập trung vào cú pháp, mẫu thường dùng và các idiom có thể áp dụng ngay. Nội dung được tổ chức theo nhóm như kiểu dữ liệu, toán tử, control flow, mảng, chuỗi, OOP, collections, streams và lambda, exceptions, concurrency, I/O, utilities và các tính năng Java hiện đại. Điểm hữu ích là tài liệu không chỉ liệt kê cú pháp, mà còn nhắc các lỗi quen thuộc như so sánh `String` bằng `==`, nhầm `.length` của mảng với `.length()` của chuỗi, hoặc dùng `StringBuilder` khi nối chuỗi trong vòng lặp.

Với lập trình viên junior, cheat sheet kiểu này phù hợp để ôn nhanh khi chuyển từ ngôn ngữ khác sang Java hoặc khi cần nhớ lại một API chuẩn mà không muốn đọc tài liệu quá dài. Tuy vậy, nên xem nó như bản đồ tra cứu ban đầu, không thay thế tài liệu chính thức của Java hay việc hiểu sâu về JVM, OOP, collections và concurrency khi viết mã production.

**Điểm chính:**
- Bao phủ các phần Java cốt lõi từ cú pháp cơ bản tới collections, streams, exceptions, concurrency và I/O.
- Hữu ích cho việc tra cứu nhanh các mẫu cú pháp thường quên trong công việc hằng ngày.
- Nhắc nhiều lỗi thực tế của người mới như null, so sánh chuỗi, ép kiểu, array bounds và nối chuỗi trong vòng lặp.
- Phù hợp làm tài liệu phụ trợ khi học hoặc ôn Java, nhưng không thay thế tài liệu chính thức và thực hành dự án.

## [Thay Go bằng Rust: ingress Kubernetes rẻ hơn 10 lần](https://dev.to/syedahmershah/swapping-go-for-rust-10x-cheaper-k8s-ingress-2b4p)

Syed Ahmer Shah kể lại một ca tối ưu chi phí hạ tầng khi lớp ingress Kubernetes dùng Traefik bắt đầu tạo hóa đơn AWS lớn hơn dự kiến. Hệ thống ban đầu chạy 3 pod Traefik, mỗi pod có thể lên khoảng 400MB RSS dưới tải, kèm các đợt tăng CPU do garbage collector của Go. Với workload kiểu proxy, nơi mỗi request liên tục tạo header, buffer và trạng thái kết nối, chi phí cấp phát và thu gom bộ nhớ có thể trở thành "thuế hạ tầng" rõ rệt.

Nhóm không viết lại Traefik, mà chuyển phần proxy chính sang Envoy và tách logic định tuyến tùy chỉnh sang một service nhỏ bằng Rust. Quá trình migration không mượt vì mô hình cấu hình của Envoy khác Traefik và đòi hỏi khai báo tường minh hơn. Nhưng sau vài tuần, theo tác giả, lớp ingress giảm từ 3 pod Traefik khoảng 380MB RSS mỗi pod xuống 2 pod Envoy kèm lớp Rust khoảng 40MB RSS mỗi pod; node cost giảm từ khoảng 340 USD/tháng xuống 30 USD/tháng, còn tổng chi phí ingress từ khoảng 4.200 USD xuống 390 USD.

**Điểm chính:**
- Go vẫn rất mạnh cho control plane, CLI, API và microservice thông thường; bài học không phải là "Rust thay thế Go".
- Với data plane hiệu năng cao như proxy, ingress hoặc network dataplane, bộ nhớ xác định của Rust có thể giảm chi phí và độ trễ đáng kể.
- Migration hạ tầng có chi phí vận hành thật: cần học mô hình cấu hình, debug outage và cân nhắc ROI trước khi làm.
- Chọn ngôn ngữ nên dựa trên workload: Go cho tốc độ phát triển và hệ sinh thái cloud-native; Rust cho lớp nền cần kiểm soát bộ nhớ chặt.

## [Giữ trạng thái multiplayer bền vững mà không hỗn loạn](https://packagemain.tech/p/persistent-multiplayer-state-without)

Julien Singler chia sẻ cách thiết kế trạng thái cho game multiplayer trực tiếp: PostgreSQL giữ dữ liệu authoritative, còn Redis chỉ giữ dữ liệu nóng hoặc có thể tái tạo. Lý do là state trong game nhiều người chơi phức tạp hơn rất nhiều so với single-player: nhiều người có thể cùng tác động lên một mục tiêu, job nền phải hoàn tất đúng thời điểm, và người chơi quay lại sau vài ngày vẫn kỳ vọng tiến trình của mình chính xác. Nếu để dữ liệu quan trọng nằm trong bộ nhớ hoặc flush lười biếng khi logout, hệ thống rất dễ mất tiến trình hoặc tạo lỗi kinh tế trong game.

Kiến trúc của tác giả dùng backend Go với các lớp handler, service và repository. Mọi mutation quan trọng đi qua transaction PostgreSQL; dữ liệu đọc nhiều thì đọc Redis trước, miss mới về PostgreSQL, rồi cache được invalidated khi ghi. Redis cũng được dùng cho distributed lock ngắn hạn bằng `SetNX` để đảm bảo job định kỳ chỉ chạy một lần khi backend scale nhiều instance. Với mutation theo từng người chơi, tác giả dùng `SELECT ... FOR UPDATE` trong transaction thay vì tự viết lock manager.

**Điểm chính:**
- Chọn một source of truth duy nhất; PostgreSQL là mặc định tốt cho state quan trọng.
- Redis phù hợp cho cache, presence, lock và dữ liệu có thể xây lại, không phù hợp cho dữ liệu authoritative.
- Job định kỳ nên dựa trên cột `finishes_at` có index thay vì scan toàn bộ người chơi mỗi phút.
- Cache invalidation nên xảy ra trước khi trả success để tránh người chơi thấy dữ liệu cũ sau thao tác ghi.

## [Chúng ta đang bước vào thời đại over-engineering](https://plc.vc/cdx)

Peter Clark viết về một thay đổi thú vị trong cách ông nhìn việc xây phần mềm. Trước đây, ông tự hào vì biết scope dự án để tốn ít công sức kỹ thuật nhất nhưng vẫn đủ linh hoạt. Đó là tư duy rất hợp lý trong công ty phần mềm truyền thống, nơi thời gian kỹ sư là tài nguyên đắt đỏ. Nhưng khi dùng Claude và Codex cho side project, ông nhận ra chi phí thử nghiệm, đánh bóng và xây các tính năng nhỏ đã giảm mạnh.

Luận điểm chính là AI coding làm mờ ranh giới giữa "over-engineering" và "hoàn thiện sản phẩm". Những ý tưởng trước đây bị bỏ vào backlog vì không đủ ưu tiên, hoặc thậm chí không được ghi lại vì quá nhỏ, giờ có thể được thử rất nhanh. Điều này không chỉ tạo ra vibe coding hay ứng dụng cá nhân, mà còn có thể thay đổi kỳ vọng của người dùng: khi việc polish phần mềm rẻ hơn, các sản phẩm cồng kềnh và thiếu chăm chút sẽ khó được chấp nhận hơn.

**Điểm chính:**
- AI coding làm giảm chi phí thử nghiệm các chi tiết nhỏ, tính năng phụ và lớp polish sản phẩm.
- Tư duy "đừng over-engineer" cần được cân nhắc lại khi chi phí kỹ thuật của side project thấp hơn nhiều.
- MVP trống trải có thể ít hấp dẫn hơn khi công cụ mới cho phép tạo trải nghiệm đầy đủ sớm hơn.
- Câu hỏi quan trọng chuyển từ "có đủ nguồn lực không?" sang "thật sự muốn xây thứ gì?".

## [Những package manager đóng gói package manager khác](https://nesbitt.io/2026/05/28/package-managers-that-package-package-managers.html)

Andrew Nesbitt xây một ma trận thú vị về việc package manager nào có thể cài package manager nào khác. Ý tưởng bắt đầu từ một vòng lặp kỳ lạ: PyPI có gói chứa Node binary, còn npm có gói chứa CPython portable, nên `pip install` và `npm install` có thể "chuyền bóng" qua lại. Tác giả mở rộng thành ma trận 42 package manager, dùng dữ liệu từ ecosyste.ms cho language registry và Repology cho distro, để xem các công cụ này đóng gói lẫn nhau ra sao.

Kết quả cho thấy các system package manager như AUR, nixpkgs, Homebrew, DNF và Debian là những hàng dày đặc nhất, vì nhiệm vụ của chúng vốn là đóng gói binary tùy ý. Ngược lại, chúng gần như trống khi làm cột vì ít ai cần phân phối lại `apt` hay `DNF` nếu chúng đã đi cùng hệ điều hành. Bài viết cũng nêu các chi tiết supply chain đáng chú ý: nhiều package manager tự phát hành chính mình trên registry của mình; cùng một lỗi trong `pip` có thể xuất hiện dưới nhiều package URL khác nhau; và tìm package theo tên rất dễ sai vì các tên ngắn thường đã bị chiếm bởi dự án không liên quan.

**Điểm chính:**
- Hệ sinh thái package manager có nhiều vòng phụ thuộc và đường cài đặt chéo hơn tưởng tượng.
- System package manager đóng gói rất nhiều công cụ khác, nhưng bản thân chúng hiếm khi được phân phối qua registry ngôn ngữ.
- Việc map advisory bảo mật về đúng upstream khó hơn vì cùng một phần mềm có thể được redistributor đóng gói dưới nhiều định danh.
- Tên package không đủ tin cậy để nhận diện dự án; liên kết tới repository nguồn thường cho kết quả sạch hơn.

## [Beyond the Prompt: Claude Code](https://arps18.github.io/posts/claude-code-mastery/)

Arpan Patel viết một hướng dẫn dài về cách dùng Claude Code như một agent có quy trình thay vì chỉ là chatbot nhận prompt. Trọng tâm là tạo vòng phản hồi để Claude tự kiểm chứng công việc: để Claude đọc mã, lập kế hoạch, chạy kiểm thử, sửa lỗi, rồi cập nhật lại quy tắc khi mắc sai lầm. Bài viết nhấn mạnh các thói quen như explore trước khi code, dùng plan mode cho thay đổi nhiều file, tham chiếu trực tiếp file/log thay vì mô tả mơ hồ, và giao việc như giao cho một kỹ sư thay vì điều khiển từng bước nhỏ.

Phần đáng chú ý là cách tổ chức hệ sinh thái `.claude`: `CLAUDE.md` cho quy tắc chung của dự án, `CLAUDE.local.md` cho ghi chú cá nhân, `settings`, MCP, skills, commands, rules và subagents. Tác giả khuyên giữ `CLAUDE.md` ngắn, chỉ chứa những rule thật sự giúp tránh lỗi, còn workflow lặp lại nên chuyển thành skill hoặc subagent. Với team lớn hơn, plugin, MCP và subagent giúp tách ngữ cảnh, review độc lập, chạy nhiều luồng song song và biến kinh nghiệm vận hành thành cấu hình có thể tái sử dụng.

**Điểm chính:**
- Claude Code hiệu quả hơn khi có vòng lặp kiểm chứng rõ ràng: đọc, plan, sửa, test, review.
- `CLAUDE.md` nên là guardrail ngắn gọn, không phải tài liệu tổng hợp toàn bộ codebase.
- Skills, commands và subagents biến workflow lặp lại thành công cụ dùng lại được trong repo.
- MCP và plugin hữu ích nhất khi chúng trở thành một phần của onboarding và quy trình team, không chỉ là tiện ích cá nhân.

## [Linear nhanh như thế nào? Phân tích kỹ thuật](https://performance.dev/how-is-linear-so-fast-a-technical-breakdown)

Dennis Brotzky phân tích vì sao Linear tạo cảm giác rất nhanh dù vẫn là một ứng dụng web client-side. Ý chính là Linear không chờ mạng cho các thao tác phổ biến. Dữ liệu mà UI đọc nằm trong trình duyệt, chủ yếu qua IndexedDB và object pool trong bộ nhớ; mutation được áp dụng local trước, ghi vào hàng đợi giao dịch bền vững, rồi sync lên server sau. Server trở thành nơi xác nhận và đồng bộ delta, không phải thứ mà UI phải chờ trước khi phản hồi người dùng.

Bài viết cũng đi sâu vào first load: giảm JavaScript/CSS, chỉ hỗ trợ trình duyệt hiện đại, code splitting mạnh, preload module để tránh waterfall, cache qua service worker, preload font đúng `crossorigin`, inline app shell và render dữ liệu local trước khi xác thực nền hoàn tất. Ở runtime, MobX giúp update rất hạt mịn: một delta chỉ render lại đúng field/component liên quan thay vì cả danh sách. Tốc độ còn đến từ thiết kế sản phẩm: shortcut ở mọi nơi, command palette chạy trên dữ liệu local, animation ngắn và chỉ dùng các thuộc tính rẻ như `transform` và `opacity`.

**Điểm chính:**
- Cách nhanh nhất để UI phản hồi là không đặt network latency trên đường tương tác chính.
- Local-first storage, optimistic mutation và sync delta là nền tảng khiến Linear có cảm giác native.
- First load nhanh đến từ nhiều chi tiết nhỏ: ít bundle hơn, split tốt hơn, preload đúng, service worker và app shell inline.
- Hiệu năng không chỉ là kỹ thuật; shortcut, command palette và animation ngắn cũng làm app nhanh hơn trong cảm nhận người dùng.
