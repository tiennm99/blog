---
title: "Newsletter #77"
date: 2026-01-24
tags: ["AI-Assisted"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #77.*

## [Đừng Chuyển Tiếp Lỗi, Hãy Thiết Kế Chúng](https://fast.github.io/blog/stop-forwarding-errors-start-designing-them/)

Bài viết này phân tích sâu về các vấn đề trong xử lý lỗi hiện nay, đặc biệt là trong hệ sinh thái Rust. Tác giả chỉ ra rằng chúng ta thường "chuyển tiếp" lỗi hơn là thực sự "thiết kế" chúng - bắt lỗi, bọc (đôi khi), và ném lên stack nhanh nhất có thể. Điều này dẫn đến việc lỗi vẫn giữ nguyên thông điệp gốc nhưng mất đi toàn bộ ngữ cảnh quan trọng.

Bài viết phê phán các cách tiếp cận phổ biến như `thiserror` (phân loại theo nguồn gốc chứ không phải hành động), `anyhow` (quá tiện lợi khiến lập trình viên quên thêm ngữ cảnh), stack traces (tốn kém và chỉ hiện điểm xuất phát chứ không phải đường đi logic), và API Provide/Request (quá phức tạp với hành vi khó dự đoán). Thay vào đó, tác giả đề xuất xử lý lỗi nên được thiết kế với hai đối tượng: máy móc (cần cấu trúc phẳng, các loại rõ ràng, mã có thể dự đoán cho việc tự động phục hồi) và con người (cần ngữ cảnh phong phú, đường đi luồng, thông tin cấp độ kinh doanh để gỡ lỗi).

**Điểm chính:**
- Xử lý lỗi nên được thiết kế dựa trên ý định: "người gọi có thể làm gì với lỗi này?" thay vì "lỗi này đến từ đâu?"
- Cho máy móc: sử dụng các loại lỗi phẳng dựa trên phân loại với trạng thái rõ ràng (Tạm thời/Liên tục/ persists) thay vì chuỗi lỗi lồng nhau
- Cho con người:捕获 ngữ cảnh tự động và thuận tiện, bắt buộc tại ranh giới module để không thể lười biếng
- Mô hình thực tế: kết hợp cấu trúc lỗi phân loại với cơ chế theo dõi ngữ cảnh (như thư viện `exn`)
- Sử dụng `#[track_caller]` để捕获 vị trí với chi phí bằng không thay vì stack traces đắt đỏ

## [Đồng Bộ Hóa Thời Gian Là Cơn Ác Mộng](https://arpitbhayani.me/blogs/clock-sync-nightmare/)

Đồng hồ là một thứ tưởng đơn giản nhưng lại là cơn ác mộng của các kỹ sư phần mềm làm việc với hệ thống phân tán. Bài viết này giải thích tại sao không có "đồng hồ toàn cục" và cách hàng ngàn máy tính rải rác across nhiều data centers bị trôi drift apart theo thời gian. Mỗi máy tính có đồng hồ nội tại dựa trên crystal thạch anh với tần số 32768 Hz, nhưng những crystal này không hoàn hảo - sự chênh lệch nhiệt độ chỉ khoảng 10°C có thể gây ra trôi drift khoảng 110 giây mỗi năm. Kết quả là hai máy tính khởi động cùng thời gian sẽ bị lệch nhau hàng trăm mili-giây chỉ sau một ngày.

Sự lệch đồng hồ gây ra nhiều vấn đề nghiêm trọng. Ví dụ với hệ thống make phân tán, nếu đồng hồ máy client bị chậm và đồng hồ máy server chạy nhanh, file object đã biên dịch sẽ trông mới hơn file source bạn vừa edit, khiến lệnh make không biên dịch lại và những thay đổi của bạn bị bỏ qua. Hệ thống cơ sở dữ liệu còn nghiêm trọng hơn - trong hệ thống ngân hàng, nếu giao dịch rút tiền có timestamp sớm hơn giao dịch nộp tiền do đồng hồ không đồng bộ, snapshot read có thể hiển thị giao dịch rút nhưng không hiển thị giao dịch nộp, khiến khách hàng trông như đã rút tiền họ không có. Tác giả cũng thảo luận các giải pháp: Thuật toán Cristian (ước lượng độ trễ một chiều bằng một nửa vòng đi vòng về), Thuật toán Berkeley (đồng thuận giữa các máy, tính trung bình và gửi các điều chỉnh tương đối thay vì thời gian tuyệt đối), NTP với hệ thống phân tầng phân cấp (Stratum 0 là đồng hồ nguyên tử/GPS, Stratum 1-15 là các lớp phía dưới), và PTP (Giao thức Thời Gián Chính Xác) với đánh dấu thời gian bằng phần cứng đạt độ chính xác dưới micro-giây.

**Điểm chính:**
- Clock skew = sự khác biệt giữa hai đồng hồ tại một thời điểm, Clock drift = tốc độ các đồng hồ phân kỳ theo thời gian
- NTP đạt độ chính xác 10-100ms trên internet công cộng, 100-500µs trên mạng LAN, nhưng bị giới hạn bởi sự bất đối xứng mạng
- PTP sử dụng đánh dấu thời gian bằng phần cứng tại tầng NIC để đạt độ chính xác nano-giây, nhưng cần các switch hỗ trợ PTP
- Đồng hồ logic (Lamport Timestamps, Vector Clocks)捕获 quan hệ nhân quả thay vì thời gian vật lý
- Google Spanner's TrueTime sử dụng GPS + đồng hồ nguyên tử, trả về khoảng [sớm nhất, muộn nhất] thay vì timestamp đơn
- Đồng hồ logic lai (CockroachDB, YugabyteDB) kết hợp thời gian vật lý với thành phần logic
- Giây nhuận sẽ bị loại bỏ vào năm 2035, nhưng hiện tại Google/AWS dùng "kéo dài giây nhuận" để trải đều qua nhiều giờ

## [Roadmap Học Java](https://nemorize.com/roadmaps/java)

Đây là một lộ trình học Java toàn diện từ cơ bản đến nâng cao. Roadmap được chia thành năm phần chính: Nền tảng (Linux, Git, IDE), Lập trình hướng đối tượng (classes, objects, inheritance, polymorphism, encapsulation, abstraction), Java cốt lõi (Collections Framework, Exception Handling, Streams), Các khái niệm nâng cao (Concurrency & Multithreading, JVM internals, Design Patterns, Dependency Injection), và Phát triển chuyên nghiệp (Testing, Build Tools như Maven & Gradle, Databases), đặc biệt là Spring Boot Framework với REST APIs, Clean Code và SOLID principles.

**Điểm chính:**
- Bắt đầu với nền tảng: Linux basics, Git version control, và chọn IDE phù hợp (IntelliJ, Eclipse, VSCode)
- Nắm vững OOP fundamentals: classes, objects, inheritance, polymorphism, encapsulation, abstraction
- Thành thạo Collections Framework: Lists, Sets, Maps, Queues, Optionals, Streams
- Hiểu sâu về Exception Handling: checked vs unchecked exceptions, custom exceptions
- Học Concurrency & Multithreading: thread basics, concurrent collections, ExecutorService, thread pools
- Tìm hiểu JVM internals và Design patterns phổ biến
- Làm việc với build tools (Maven, Gradle) và databases (JDBC, schema migration)
- Phát triển Enterprise Java với Spring Boot: Spring Core, Spring Data, JPA, REST APIs
- Áp dụng Clean Code, SOLID principles, và best practices về API design, logging, monitoring

## [Hướng Dẫn Toàn Diện Triển Khai Kotlin Trong Môi Trường Java](https://blog.jetbrains.com/kotlin/2025/12/the-ultimate-guide-to-successfully-adopting-kotlin-in-a-java-dominated-environment/)

Đây là hướng dẫn hoàn chỉnh để triển khai Kotlin từng bước, từ những bài kiểm tra ban đầu đến triển khai quy mô lớn. Adopting Kotlin trong công ty thiên về Java không phải là flipping a switch hay viết lại mọi thứ, mà là về con người, thời điểm, rủi ro và sự tin tưởng. Guide bao gồm năm phần: Bắt đầu với Kotlin cho Java developers (viết tests bằng Kotlin, dùng Kotest và MockK), Đánh giá Kotlin trong projects thực tế (start new service in Kotlin, add Kotlin modules, tránh "Java in Kotlin syntax" trap), Phát triển việc adoption Kotlin trong công ty (share examples, starter repository, pairing sessions, build community), Giúp decision-makers nói yes với Kotlin (less code, fewer defects, no rewriting, developer happiness, predictable costs), và Scaling adoption across organization (treat systems differently based on lifecycle, dùng right tools như IDE conversion, null-safety annotations, AI-assisted refactoring).

**Điểm chính:**
- Bắt đầu nhỏ: introduce Kotlin thông qua test suite để không ảnh hưởng production
- Tránh "Java in Kotlin syntax" trap: dùng extension functions thay vì static helpers, nullable types thay vì Optional, data classes thay vì boilerplate
- Xây dựng community trong nội bộ: share starter repository, tổ chức clinics và pairing sessions
- Thuyết phục managers: less code để maintain, fewer defects nhờ null safety, no rewriting required nhờ full Java interop
- Scaling strategy: leave end-of-life apps, default new builds to Kotlin, migrate active systems step-by-step không phải big-bang rewrites
- Sử dụng tools phù hợp: IDE conversion, JSpecify null-safety annotations, AI-assisted refactoring, rule-based automation

## [So Sánh Rust và Go Năm 2026](https://bitfieldconsulting.com/posts/rust-vs-go)

Bài viết này so sánh hai ngôn ngữ lập trình phổ biến Rust và Go across nhiều khía cạnh: performance, simplicity, safety, features, scale, concurrency. Tóm tắt ngắn gọn: "Rust for high stakes, Go for low costs" - Rust cho mission-critical software cần safety và reliability, Go cho việc move fast và keep costs down. Cả hai đều là compiled languages với fast, compact executables, đều có pragmatic programming style và excellent tooling cho development at scale (gofmt, rustfmt, standard build tools). Tuy nhiên, Rust prioritizes safety, correctness, efficiency với borrow checker preventing memory errors, trong khi Go prioritizes simplicity và speed of development với garbage collector và minimal syntax. Go có goroutines và channels làm concurrency cực kỳ easy, Rust có match syntax và powerful features nhưng learning curve steeper. Error handling: Go dùng explicit `if err != nil`, Rust dùng `Option`/`Result` types với `?` operator.

**Điểm chính:**
- Performance: Rust beat Go ở run-time benchmarks nhờ no garbage collection và closer to metal optimizations
- Simplicity: Go cực kỳ easy to learn (productive sau 2 days), Rust có nhiều features hơn và learning curve steeper
- Concurrency: Go nổi tiếng với goroutines và channels cho high-scale concurrent apps, Rust có rayon crate và memory safety cho concurrency
- Safety: Rust's borrow checker prevents memory safety bugs tại compile time, Go relies trên programmer discipline
- Scale: Go tốt cho big organisations với distributed teams nhờ uniform style và fast build times
- Garbage collection: Go has GC (simpler nhưng unpredictable pauses), Rust manual memory management (harder nhưng predictable)
- Error handling: Go explicit `if err != nil`, Rust powerful `Option`/`Result` với `?` operator
- Conclusion: "Should I learn Rust or Go?" → "Yes" - learn both, mỗi ngôn ngữ excels trong domain của nó

## [Dependency Phổ Biến Nhất Trong Go Là Gì?](https://blog.thibaut-rousseau.com/blog/the-most-popular-go-dependency-is/)

Bài viết này trả lời câu hỏi về dependency phổ biến nhất trong hệ sinh thái Go thông qua việc phân tích toàn bộ Go modules ecosystem. Tác giả đã download toàn bộ index từ proxy.golang.org (từ 2019), build một dependency graph với 40 triệu nodes và 400 triệu relationships trong Neo4j database, từ đó extract ra các thống kê thú vị. Top 10 dependencies được sử dụng nhiều nhất: testify (259,237 dependents), google/uuid (104,877), golang.org/x/crypto (100,633), grpc (97,228), cobra (93,062), pkg/errors (92,491), golang.org/x/net (76,722), protobuf (74,971), logrus (71,730), viper (64,174). Testify là library được sử dụng rộng rãi nhất, đặc biệt là cho testing. Tác giả cũng demo cách query Neo4j để find direct/transitive dependents, ví dụ như github.com/pkg/errors@v0.9.1 vẫn có 16,001 dependents trong năm 2025 dù đã bị deprecated từ lâu.

**Điểm chính:**
- Go modules có trung bình 10 direct dependencies
- Testify (github.com/stretchr/testify) là dependency phổ biến nhất với 259,237 dependents
- Top dependencies bao gồm testing frameworks (testify), utilities (uuid, crypto, net), CLI tools (cobra, viper), logging (logrus)
- Extended stdlib (golang.org/x/) giữ vị trí mạnh trong ecosystem
- Các deprecated libraries như pkg/errors vẫn được sử dụng rộng rãi (92,491 dependents)
- Neo4j graph database非常适合 analyzing dependency relationships với Cypher query language
- Tác giả chia sẻ Neo4j dump via BitTorrent để community có thể chạy own queries

## [go.sum Không Phải Lockfile](https://words.filippo.io/gosum/)

Bài viết này làm rõ sự hiểu lầm phổ biến về go.sum trong Go modules. Nhiều người nghĩ go.sum là lockfile (như package-lock.json của Node hay Cargo.lock của Rust), nhưng thực tế go.sum chỉ là bộ nhớ đệm cục bộ cho Go Checksum Database - một ánh xạ từ các phiên bản module đến các mã băm mật mã của chúng. Những phiên bản này có thể được sử dụng hoặc không, không ảnh hưởng đến việc phân giải gói. go.sum thậm chí không được bật theo mặc định trong thiết kế modules ban đầu vì không có tác động quan sát được trên quá trình xây dựng! Mục đích duy nhất của nó là tăng cường câu chuyện bảo mật: Checksum Database đảm bảo toàn bộ hệ sinh thái chia sẻ cùng một nội dung cho một phiên bản module, bất kể cách tải xuống, và go.sum làm cho lời đảm bảo đó trở nên cục bộ và tự chứa.

Thay vào đó, hãy nhìn vào go.mod - nó đóng vai trò既是 manifest又是 lockfile. Từ Go 1.17 (tháng 8 năm 2021), go.mod bao gồm tất cả các phụ thuộc chuyển tiếp cần thiết để xây dựng module chính và các bài kiểm tra của nó. Khác với các hệ sinh thái khác với manifest (các phạm vi phiên bản phức tạp) và lockfile (các phiên bản thực tế), Go đơn giản hơn với một tệp có thể đọc được bởi con người: go.mod liệt kê tất cả các phụ thuộc (trực tiếp và chuyển tiếp) và phiên bản chính xác của chúng. Không có xung đột phụ thuộc hình kim cương, không có cách nào vô tình sử dụng tính năng được giới thiệu trong phiên bản mà các phần phụ thuộc sẽ không có, và không có cập nhật tự động lên phiên bản mới nhất của các phụ thuộc khi thêm phụ thuộc mới.

**Điểm chính:**
- go.sum không phải lockfile, chỉ là bộ nhớ đệm cục bộ cho Go Checksum Database với các mã băm mật mã
- go.mod đóng vai trò既是 manifest又是 lockfile - liệt kê tất cả các phụ thuộc và phiên bản chính xác
- Từ Go 1.17, go.mod bao gồm tất cả các phụ thuộc chuyển tiếp cho module chính và bài kiểm tra
- Go modules đơn giản hơn nhiều so với các lựa chọn thay thế: không có phạm vi phiên bản, không có xung đột hình kim cương, không có vấn đề đồng bộ hóa lockfile
- Việc phân giải gói trong Go là tức thời nên không ai nhận thấy nó đang xảy ra
- Phân tích go.mod bằng golang.org/x/mod/modfile hoặc `go mod edit -json`, không bao giờ phân tích go.sum
- Để phân tích đồ thị phụ thuộc, dùng go.mod, không phải go.sum

## [Phát Triển Thông Báo Actions Cho Forgejo](https://chris-besch.com/articles/forgejo_actions_notification/)

Bài viết này chia sẻ kinh nghiệm đóng góp vào Forgejo - một mã nguồn tự chủ tương tự GitHub/GitLab. Tác giả cần tính năng gửi thông báo email và webhook khi CI workflow thất bại, nhưng Forgejo chưa có, nên ông ấy quyết định đóng góp. Bài viết giải thích chi tiết cấu trúc dự án Go, kiến trúc phân lớp của Forgejo, và mô hình publish-subscribe (pub-sub) được sử dụng để tránh các phụ thuộc vòng tròn. Tác giả chia quá trình thành nhiều pull requests: PR #7510 tái cấu trúc code từ layer thấp lên layer cao, PR #7491 thêm topic `ActionRunNowDone` vào pub-sub system, PR #7509 triển khai gửi email khi workflow thất bại/phục hồi, và PR #7508 triển khai gửi webhook. Bài viết cũng hướng dẫn chi tiết cách thiết lập môi trường phát triển: Forgejo instance, Forgejo runner, mail server (MailDev), webhook tester, và cách chạy tests với Delve debugger.

**Điểm chính:**
- Go projects sử dụng modules (với go.mod) và packages (nhóm code), với hệ thống phân tán không có central package index như NPM
- Forgejo dùng kiến trúc phân lớp 3 tầng: modules (tự chứa, có thể dùng như library), models (database abstraction), services (logic), routers (API/web UI) - code ở layer thấp không được import code ở layer cao
- Pub-sub pattern giải quyết cyclic dependencies: packages gửi messages đến topics (ví dụ `PullRequestReview`), và các packages khác subscribe vào topics đó
- Tác giả chia feature thành 4 PRs để dễ review: refactoring, thêm topic, triển khai email, triển khai webhook
- Development setup cần Forgejo instance, runner, mail server (MailDev), webhook tester node script
- Debug với Delve debugger, chạy unit tests và integration tests với make commands
- Viết tests rất quan trọng để maintainers có thể verify code vẫn hoạt động đúng

### Bonus

**Hình ảnh:**

![Message Brokers 101](https://substackcdn.com/image/fetch/w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F3ec94ed4-46b2-40bd-8d28-a25fdde639c8_2250x2624.png)
![Cloud Load Balancer Cheat Sheet](https://substackcdn.com/image/fetch/$s_!hXRV!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fe99863c7-7ab7-4f61-9961-af7e4c6ee64f.png)
![How CQRS Works?](https://substackcdn.com/image/fetch/$s_!XvtW!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F1ded3402-4eb5-4818-861f-7661f1cefe82.tif)
![How does Docker Work?](https://substackcdn.com/image/fetch/$s_!SUjA!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd91a5538-a69e-468c-bf83-058bb78753ca_2360x2770.png)
![Containerization Explained: From Build to Runtime](https://substackcdn.com/image/fetch/$s_!4qBZ!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff0945414-9cea-4e64-8dd4-3abcc404f73e_2360x2960.png)
![Must-Know Message Broker Patterns](https://substackcdn.com/image/fetch/$s_!n8BK!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa51a75cc-09a9-4fed-af8a-c32a64f8ab60_2250x2624.png)

---

*Bài viết đã được review và cập nhật bởi Claude Code với Opus 4.7 (1M context).*
