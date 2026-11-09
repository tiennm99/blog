---
title: "Newsletter #134"
date: 2026-10-02
tags: ["AI-Assisted", "PostgreSQL", "Database", "Performance", "Security", "Linux", "AI Agents"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #134.*

## [The startup's Postgres survival guide](https://hatchet.run/blog/postgres-survival-guide)

Alexander Belanger tổng hợp kinh nghiệm vận hành Postgres tại Hatchet thành cẩm nang về lược đồ, truy vấn, kết nối, bảo trì và chuyển dữ liệu. Những lời khuyên đáng chú ý là giữ giao dịch ngắn, tránh gọi dịch vụ ngoài khi đang giữ khóa, dùng bộ gộp kết nối và xem kế hoạch thực thi trước khi tối ưu. Thiết kế chỉ mục phải theo điều kiện lọc, thứ tự sắp xếp và dữ liệu thực tế, không có quy tắc mọi phép nối đều cần thêm chỉ mục hay luôn đặt một loại cột ở cuối.

Bài viết còn giới thiệu ghi theo lô, theo dõi autovacuum, xử lý dữ liệu phình và hàng đợi dùng `SKIP LOCKED`. Khi sao chép bảng lớn, nhóm dùng trigger đồng bộ thay đổi mới và chia phần dữ liệu cũ thành các lô, tránh một giao dịch bao trùm toàn bộ quá trình; từng lệnh ghi vẫn có giao dịch. Các mức tăng thông lượng và lựa chọn công cụ bảo trì là kinh nghiệm theo tải của Hatchet, cần đo lại và kiểm tra yêu cầu khóa, dung lượng trước khi áp dụng.

## [What is Orasort? understanding Oracle’s Sorting Aglorithm In Simple Terms](https://deepsystemstuff.com/how-oracles-secret-column-sorting-technique-became-public-after-its-patent-expired-making-sorting-5x-faster/)

Nadeem Shaikh giới thiệu Orasort, kỹ thuật sắp xếp do Oracle đăng ký bằng sáng chế (đứng tên Mark Callaghan). Theo bài viết, bằng sáng chế này đã hết hạn 20 năm vào 2024 nên kỹ thuật giờ thuộc public domain, và có thể giúp database sort nhanh hơn tới 5 lần. Cách so sánh chuỗi truyền thống đi từng ký tự một, nên các giá trị dài có chung tiền tố, như email cùng domain, tốn rất nhiều phép so sánh. Orasort thì lấy 8 byte của mỗi giá trị, chuyển thành một số nguyên 64-bit vừa khít thanh ghi CPU rồi so sánh một lần. Nếu 8 byte đó đã phân định được thứ tự thì dừng, còn nếu bằng nhau thì mới xét tiếp 8 byte kế.

Quy trình sort còn kèm vài kỹ thuật khác. Database chỉ nạp key và record ID vào buffer trên RAM thay vì cả dòng dữ liệu. Khi dữ liệu quá lớn so với RAM, ví dụ hàng triệu dòng, nó được chia thành nhiều phần lưu trên đĩa và lần lượt nạp vào để xử lý. Kết quả đã sắp xếp được ghi xuống đĩa bất đồng bộ trong lúc việc sort vẫn tiếp tục, rồi cuối cùng mới merge các phần trên đĩa. Tác giả cho rằng các database mã nguồn mở như MySQL, PostgreSQL đã tích hợp hoặc đang thử nghiệm ý tưởng này, và cloud provider có thể giảm chi phí vận hành nhờ tiết kiệm CPU cycle. Tuy vậy, bài viết không dẫn nguồn cho con số 5 lần hay các thông tin về bằng sáng chế và mức độ áp dụng, nên bạn nên xem đây là phần giải thích trực quan về ý tưởng hơn là tài liệu tham khảo chính xác.

## [Fornax's Guide To Ridiculously Fast Ethernet](https://docs.pixeldrain.com/posts/2024-03-07_network_optimizations/)

Fornax kể quá trình đưa máy phục vụ tệp của pixeldrain từ chỗ gặp sự cố ở khoảng 20 Gbit/s tới mức 100 Gbit/s. Công việc gồm đọc tài liệu card mạng, đo hiệu năng, điều chỉnh bộ đệm TCP, hàng đợi, ngắt, bố trí CPU và đường xử lý HTTP. Những thông số trong bài phản ánh phần cứng, nhân Linux và tải truyền tệp của tác giả.

Một thay đổi nổi bật là cấu hình IOMMU giúp xử lý vấn đề trên máy của anh; điều đó không chứng minh mọi hệ thống cần tắt IOMMU. Tương tự, tăng bộ đệm, tắt SMT, bỏ proxy hay chọn HTTP/2 thay HTTP/3 đều có đánh đổi và phụ thuộc phép đo. `SO_REUSEPORT` cho phép nhiều tiến trình cùng nghe một cổng, nhưng việc nâng cấp êm còn cần xử lý vòng đời kết nối. Giá trị của bài nằm ở cách truy tìm nút thắt xuyên nhiều tầng, thay vì một bộ thông số tối ưu dùng chung.

## [Parity before cutover](https://alexocallaghan.com/parity-before-cutover)

Alex O'Callaghan kể về một service mà nhiều team khác phụ thuộc vào, tồn tại cùng lúc hai phiên bản: bản production chạy Python 2 trên server on-prem và bản Python 3 hiện đại hóa nằm trên một branch riêng, chờ migrate lên cloud để thay thế. Cách nâng cấp kiểu big-bang này, tức viết lại hoặc giữ branch dài hạn rồi cutover một lần ở cuối, gom hết rủi ro và đẩy phản hồi về muộn. Công việc bị nhân đôi vì mọi bản sửa gấp phải làm trên bản cũ rồi port sang bản mới, nếu không sẽ bị quên. Những khác biệt về hành vi giữa hai bản chỉ lộ ra sau cutover, khi rất khó truy nguyên.

Thay vì nhắm thẳng tới đích là bản mới trên cloud, tác giả đề xuất "lùi một bước để tiến": chạy bản hiện đại trên hạ tầng cũ trước. Vì OS trên server cũ chỉ hỗ trợ tối đa Python 3.6, team hạ phiên bản service từ 3.7 xuống 3.6 thay vì dùng workaround, rồi chọn cấu hình theo môi trường lúc runtime để một codebase deploy được cả lên server cũ lẫn Kubernetes. Từ đó, mỗi lần release đều đi vào cả hai môi trường, khác biệt lộ ra ngay theo từng bước nhỏ trong khi hạ tầng cũ vẫn là phương án dự phòng. Khi code đã giống hệt nhau, cutover lên cloud chỉ còn là thay đổi hạ tầng, mỗi lần thay đổi một biến. Bài học rút ra: nếu một thay đổi đã mở nhiều tháng hoặc đang chờ team khác, có lẽ nó đang ôm quá nhiều việc cùng lúc, nên hãy tìm một trạng thái trung gian release được ngay, dù trông giống như đi lùi.

## [The new Go JSON API: twice as fast, or 1.5x slower?](https://lemire.me/blog/2026/08/29/the-new-go-json-api-twice-as-fast-or-1-5x-slower/)

Từ Go 1.27, package `encoding/json/v2` có sẵn mặc định trong thư viện chuẩn. Hàm `Marshal` và `Unmarshal` của nó trông gần như giống hệt API cũ, nhưng không thể thay thế trực tiếp vì khác nhau ở cách kiểm tra Unicode, phân biệt hoa thường và một số hành vi khác. API cũ cũng đã được viết lại trên engine mới, nên Daniel Lemire so sánh ba cấu hình: bản `encoding/json` gốc (build với `GOEXPERIMENT=nojsonv2`), API cũ chạy trên backend mới của Go 1.27 và `json/v2` dùng trực tiếp. Dữ liệu benchmark gồm ba file của simdjson là `twitter.json`, `canada.json` và `citm_catalog.json`, parse vào kiểu `any`, chạy đơn nhân trên Apple M4 Max và Intel Xeon Emerald Rapids.

Chỉ cần nâng lên Go 1.27 mà không sửa code, API cũ đã marshal nhanh hơn tới khoảng 2 lần, ví dụ `twitter.json` tăng từ 198 lên 374 MB/s. Unmarshal cũng nhanh hơn trên hai file, nhưng lại chậm hơn trên `canada.json` (từ 128 xuống 106 MB/s). So với bản gốc, `json/v2` unmarshal nhanh hơn 1,5 đến 2,3 lần và marshal nhanh hơn 1,2 đến 3 lần. Tuy nhiên, với bài test round trip 10.000 struct nhỏ có schema cố định, `json/v2` vẫn unmarshal nhanh hơn nhưng marshal lại chậm hơn khoảng 1,5 lần so với bản gốc, trái với release note của Go 1.27 vốn nói hiệu năng marshal tương đương. Trong các trường hợp tác giả đo, `json/v2` unmarshal nhanh hơn bản gốc, còn marshal phụ thuộc kiểu dữ liệu, nên hãy benchmark đúng workload của bạn trước khi chuyển sang `json/v2`, nhất là khi marshal struct.

## [A deep dive into DeepSec](https://flaviocopes.com/deepsec/)

Flavio Copes tìm hiểu DeepSec, công cụ quét bảo mật bằng AI mã nguồn mở (Apache 2.0) của Vercel. Khác với các công cụ chỉ review thay đổi trong pull request, DeepSec rà soát toàn bộ repository, kể cả code cũ chưa từng được review. Quy trình gồm bước quét pattern cục bộ, nhanh và miễn phí, bằng các matcher kết hợp đường dẫn file với regex. Sau đó Codex hoặc Claude Code đọc các file bị đánh dấu, lần theo luồng dữ liệu, tìm cơ chế phòng thủ sẵn có và ghi lại finding kèm mức độ, độ tin cậy và cách sửa. Một lượt agent thứ hai xác minh lại từng finding, bước triage rẻ hơn gán mức ưu tiên P0 đến P2, còn mọi trạng thái nằm trong thư mục `.deepsec/` để chạy tiếp được.

Khi chạy trên flaviocopes.com bằng Codex qua gói ChatGPT, DeepSec kiểm tra 729 file và trả về 504 finding, trong đó có 1 critical và 16 high. Tuy vậy, 462 finding nằm trong các công cụ chạy trên trình duyệt của site. Tác giả nhờ Codex gom finding theo nguyên nhân gốc và tách rủi ro production thực sự khỏi script hay ví dụ, nhờ đó thu hẹp về luồng thanh toán, khôi phục khóa học và form công khai. DeepSec không chứng minh được repository an toàn, vẫn có false positive và gửi code cho nhà cung cấp model. Bài học rút ra: con số finding thô dễ gây hiểu nhầm, nên hãy bắt đầu từ nơi input không tin cậy chạm tới xác thực, dữ liệu riêng tư, tiền bạc hay hạ tầng.

## [imthenachoman/How-To-Secure-A-Linux-Server: An evolving how-to guide for securing a Linux server.](https://github.com/imthenachoman/How-To-Secure-A-Linux-Server)

Đây là một hướng dẫn mã nguồn mở (giấy phép CC BY-SA 4.0, hơn 31 nghìn star) tổng hợp các bước bảo mật một Linux server, ra đời từ những ghi chép của tác giả khi tự dựng một máy Debian. Theo tác giả, kiến thức về chủ đề này nằm rải rác qua vô số bài viết khác nhau, còn phần lớn chúng ta không cài Linux mỗi ngày nên rất dễ quên những bước cơ bản. Ngay khi một server xuất hiện trên internet, nó đã trở thành mục tiêu, và kẻ xấu có thể lặng lẽ sao chép dữ liệu hoặc biến máy thành một node trong các cuộc tấn công DDoS mà bạn không hay biết. Tác giả khuyên đọc hướng dẫn này trước rồi mới đến CIS Benchmarks để các khuyến nghị của CIS được ưu tiên.

Phần SSH hướng dẫn dùng public/private key, giới hạn người đăng nhập qua `AllowGroups`, siết cấu hình `sshd_config`, loại bỏ khóa Diffie-Hellman ngắn và bật 2FA. Phần cơ bản gồm giới hạn người được dùng `sudo` và `su`, chạy ứng dụng trong sandbox với FireJail, bảo vệ `/proc`, bắt buộc mật khẩu mạnh và tự động cập nhật bản vá bảo mật. Về mạng, hướng dẫn dùng UFW làm firewall (kèm cách xử lý việc Docker bỏ qua UFW), PSAD để phát hiện tấn công từ log iptables, Fail2Ban và CrowdSec để chặn truy cập bất thường vào ứng dụng. Phần kiểm tra giới thiệu AIDE, ClamAV, Rkhunter, logwatch, Lynis và OSSEC. Cuối cùng là "vùng nguy hiểm" với những thay đổi cần cân nhắc kỹ như hardening sysctl của kernel, đặt mật khẩu cho GRUB hay tắt đăng nhập root. Có cả Ansible playbook do cộng đồng viết để tự động hóa các bước trên.

## [Postgres 19: How Our Advice Has Changed Since We Wrote It](https://www.crunchydata.com/blog/postgres-19-how-our-advice-has-changed-since-we-wrote-it)

Christopher Winslett của Crunchy Data xem lại loạt bài cũ về nạp dữ liệu, lưu trữ, index và partitioning, phần lớn viết cho Postgres 10 hay 11, để xem lời khuyên nào còn đúng với Postgres 19 (dựa trên bản beta). Async I/O từ bản 18 giúp tăng tốc sequential scan, bitmap heap scan và vacuum; bản 19 thêm tự động co giãn I/O worker, `EXPLAIN (ANALYZE, IO)` và autovacuum song song, đồng thời tắt JIT theo mặc định. Lệnh `COPY` ngày càng mạnh: parse CSV bằng SIMD, `ON_ERROR set_null`, bỏ qua nhiều dòng header, xuất JSON trực tiếp và chạy `COPY TO` trên bảng partitioned. LZ4 trở thành thuật toán nén TOAST mặc định, dù dữ liệu cũ vẫn giữ kiểu nén ban đầu, còn lệnh `REPACK` có sẵn (kèm `CONCURRENTLY`) thay cho `VACUUM FULL` và `CLUSTER`.

Với index, BRIN có thêm opclass `minmax_multi` cho dữ liệu không được sắp xếp hoàn hảo và bloom cho truy vấn so sánh bằng trên UUID. Skip scan của B-tree từ bản 18 cho phép index nhiều cột phục vụ cả truy vấn lọc theo cột sau khi cột đầu có ít giá trị khác nhau, nên có thể bỏ bớt index đơn cột dư thừa. Partitioning có thêm `MERGE PARTITIONS` và `SPLIT PARTITION`, nhưng cả hai giữ lock `ACCESS EXCLUSIVE` nên chỉ nên chạy trong cửa sổ bảo trì. Kết luận: các lời khuyên cốt lõi không đảo ngược, như dùng `COPY` để nạp hàng loạt, lưu JSON bằng `jsonb`, partition trước hết để quản lý vòng đời dữ liệu. Postgres 19 chủ yếu giúp làm theo chúng dễ hơn, nên hãy giữ nguyên tư duy, cập nhật lệnh và cấu hình, rồi kiểm tra lại bằng `EXPLAIN (ANALYZE, BUFFERS, IO)` sau khi nâng cấp.

## [How we saved 100 terabytes of memory by optimizing 1.1.1.1’s DNS cache](https://blog.cloudflare.com/dns-cache-memory-optimization-1111/)

Big Pineapple, nền tảng viết bằng Rust đứng sau 1.1.1.1 và nhiều dịch vụ DNS khác của Cloudflare, lưu hơn 250 tỷ entry trong cache. Ở quy mô này, chỉ một byte lãng phí mỗi entry đã tốn hơn 250 GB trên toàn hệ thống. Entry một khi đã lưu thì không bao giờ bị sửa, nhưng các field vẫn dùng `Vec` và `String`, vốn mang theo field capacity và cấp phát dư. Thêm vào đó, mỗi record lại có kích thước bằng loại record DNS lớn nhất, nên A và AAAA bị độn rất nhiều. Đội ngũ đo đạc bằng benchmark mô phỏng traffic thật, kèm một allocator tùy biến theo dõi bộ nhớ từng entry, đồng thời đo throughput và latency để tránh làm chậm hệ thống.

Họ thực hiện năm thay đổi: thay `Vec`/`String` bằng `Box<[T]>`/`Box<str>`, gộp ba danh sách record thành một và đánh dấu các phần bằng offset `u16`, bỏ owner name khi nó trùng với tên truy vấn, đưa các biến thể enum lớn như TXT hay NAPTR ra sau `Box`, và cuối cùng lưu toàn bộ record dưới dạng byte wire format đóng gói trong một allocation duy nhất. Với cách này, các record như A, AAAA hay TXT được chép thẳng vào response mà không cần parse. Kết quả benchmark: bộ nhớ mỗi entry giảm 56% (từ 953 xuống 420 byte), throughput insert tăng 43% và latency lookup giảm 19%. Trên production, bộ nhớ resident ở p99 giảm từ 9,3 GB xuống 5,3 GB, tổng cộng tiết kiệm khoảng 100 TB, tương đương RAM của khoảng 130 server. Cloudflare dự định dùng phần bộ nhớ này để mở rộng cache, qua đó tăng hit rate và giảm truy vấn lên upstream.

## [Agentic Code Quality](https://addyo.substack.com/p/agentic-code-quality)

Addy Osmani cho rằng code review truyền thống không theo kịp khối lượng code do agent tạo ra, nên việc kiểm soát chất lượng phải chuyển vào harness, môi trường và hệ thống xung quanh agent. Luận điểm trung tâm: chất lượng phần mềm giờ phụ thuộc vào các ràng buộc bạn đặt quanh agent. Các ràng buộc này gồm unit test, property test, acceptance test, mutation testing để kiểm tra test có bắt được lỗi cố ý cài vào hay không, cùng các chỉ số như độ phức tạp cyclomatic. Mức độ rủi ro quyết định bạn có thể bỏ qua việc đọc code đến đâu: prototype hay code dùng một lần thì có thể, còn code quan trọng cần người đọc hoặc ràng buộc thật chặt. Mục tiêu là một môi trường cho agent phản hồi đáng tin cậy và để nó thất bại mà ít gây thiệt hại.

Ràng buộc nên áp dụng ở ba thời điểm: trước khi bắt đầu, trong lúc làm việc dưới dạng phản hồi, và tại ranh giới production. Mỗi lớp kiểm tra nên có trách nhiệm riêng, từ type safety, hiệu năng đến quét bảo mật. Compiler, test thất bại, chính sách bảo mật và CI đều tạo "back-pressure" sớm thay vì dồn vào một lần review cuối. Khi lượng thay đổi vượt quá khả năng kiểm chứng, team có thể mở rộng hệ thống kiểm chứng, giảm tốc độ sinh code hoặc hạ chuẩn chất lượng, lựa chọn mà tác giả ít mong muốn nhất. Sự chú ý của con người là tài nguyên khan hiếm, nên hãy dành nó cho những quyết định tinh tế về ý đồ, gu và kiến trúc, và chỉ kéo người vào khi các hàng rào tự động thất bại.

### Bonus

**Videos:**
[JVM thực sự hoạt động như thế nào](https://www.youtube.com/watch?v=bF28LFPjFsI)
> Video của ByteByteGo giải thích cách Java Virtual Machine vận hành bên trong, từ lúc mã Java được biên dịch thành bytecode cho tới khi được thực thi trên máy.

**Images:**
![MCP vs RAG vs AI Agents](https://substackcdn.com/image/fetch/$s_!tsAw!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fb0fa724e-feb3-4ec6-9c53-50437d9cf884_2484x3002.png)
![9 Distributed Systems Patterns You Should Know](https://substackcdn.com/image/fetch/$s_!aJjm!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F79e409f6-979a-4756-9366-de84824ab9d8_2484x3002.png)

---

*Bài viết đã được review và cập nhật bởi Codex với GPT 6.1 Sol vào ngày 09/11/2026.*
