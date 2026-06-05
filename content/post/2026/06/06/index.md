---
title: "Newsletter #109"
date: 2026-06-06
tags: ["AI-Assisted", "AI", "DevOps", "Distributed Systems", "Developer Experience", "Database", "Software Engineering"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #109.*

## [Lịch sử IDE tại Google](https://laurent.le-brun.eu/blog/a-history-of-ides-at-google)

Bài viết kể lại hành trình gần 15 năm của Google trong việc xây dựng môi trường phát triển thống nhất (IDE) cho hàng chục nghìn kỹ sư làm việc trong cùng một monorepo khổng lồ. Tác giả Laurent Le Brun, người đã làm việc ở Google từ 2011 đến 2024, chia sẻ góc nhìn nội bộ về lý do tại sao công ty này dần chuyển từ một hệ sinh thái IDE phân mảnh sang một công cụ chung duy nhất.

Trong nhiều năm, Google để các kỹ sư tự chọn trình soạn thảo yêu thích — từ Vim, Emacs cho tới IntelliJ. Năm 2011, khi được hỏi liệu có nên thống nhất một IDE cho tất cả, Jeff Dean đã trả lời rằng "cố gắng bắt cả nhóm thống nhất một trình soạn thảo là công thức dẫn đến bất hạnh". Hệ quả là mỗi tích hợp hữu ích (Bazel, Starlark, code search, formatter) đều phải được cài lại cho từng IDE, gây lãng phí lớn.

Khoảng 2013, một nhóm kỹ sư bí mật xây dựng Cider — một trình soạn thảo dạng web (viết tắt của "Cloud IDE"). Ban đầu nó chỉ phục vụ nhóm technical writers sửa lỗi chính tả trong file markdown, nhưng khi được tích hợp thêm hỗ trợ code completion thông qua Language Server Protocol, Cider bắt đầu được các lập trình viên Go và sau đó là cả Java ưa chuộng nhờ khả năng tra cứu chéo trên hàng tỷ file mã nguồn.

Năm 2020, tác giả gia nhập team Cider với vai trò tech lead. Quyết định lớn nhất là chuyển phần frontend sang dùng lõi của VSCode, trong khi giữ nguyên backend mạnh mẽ có khả năng index cả monorepo. Sản phẩm mới mang tên Cider V, mất khoảng hai năm để hoàn thiện vì người dùng cũ rất trung thành với workflow cũ, chỉ một thay đổi nhỏ cũng có thể trở thành rào cản chuyển đổi. Đến 2023, khoảng 80% lượng phát triển ở monorepo chính diễn ra trên Cider V và con số vẫn tiếp tục tăng.

Lợi ích lớn nhất không phải là "mọi người dùng cùng một công cụ", mà là hiệu ứng cộng hưởng: các team trong công ty tự viết extension cho workflow riêng, sau hai năm đã có khoảng 100 extension nội bộ. Năm 2023, khi Google đẩy mạnh tích hợp AI, việc có một nền tảng duy nhất giúp triển khai nhanh các tính năng như tự động xử lý comment trong code review, smart paste, và AI code completion. Tác giả kết luận: tiêu chuẩn hóa công cụ tạo ra đòn bẩy, dù chi phí ban đầu rất lớn và chỉ vài công ty mới có thể theo đuổi.

**Điểm chính:**
- Hệ sinh thái IDE phân mảnh từng khiến Google lãng phí nguồn lực vì phải tái tích hợp cùng một công cụ cho nhiều IDE khác nhau.
- Cider ban đầu là editor web cho technical writers, sau đó trở thành IDE chính nhờ backend có khả năng index toàn bộ monorepo.
- Cider V (frontend VSCode + backend Google) cho thấy chiến lược "tái sử dụng lõi mã nguồn mở" giúp tiết kiệm hàng năm phát triển.
- Khi 80% kỹ sư dùng chung một IDE, các team khác có động lực viết extension, tạo hiệu ứng mạng trong nội bộ.
- AI features (code completion, smart paste, ML code review) được tích hợp nhanh hơn rất nhiều nhờ có một nền tảng thống nhất.

## [Truy tìm zombie trong hệ thống: câu chuyện thực tế về nghẽn CPU tại Pinterest](https://medium.com/pinterest-engineering/finding-zombies-in-our-systems-a-real-world-story-of-cpu-bottlenecks-ea4722e552eb)

Bài viết kể lại cuộc điều tra kéo dài hơn ba tháng của team nền tảng Kubernetes tại Pinterest khi các job huấn luyện ML chạy trên Ray liên tục bị crash vì mất kết nối mạng. Nguyên nhân cuối cùng không đến từ Ray hay Kubernetes, mà từ một tác nhân ít ai ngờ tới: agent ECS của AWS vô tình bị cài đặt trong base image của node.

Triệu chứng đầu tiên là log của driver mạng ENA trên EC2 liên tục báo reset: luồng TX bị tạm dừng quá 5 giây, dẫn đến self-healing reset thiết bị và làm rớt packet. Triệu chứng thứ hai là một số máy có system CPU utilization rất cao — phù hợp với giả thuyết "CPU starvation" trong tài liệu ENA. Triệu chứng thứ hai thậm chí còn kỳ lạ hơn: reset chỉ xảy ra ở một availability zone duy nhất (us-east-1a), dù cấu hình Kubernetes trông giống hệt các zone khác.

Team bắt đầu profiling bằng `perf` và `mpstat`. Trên các máy GPU có 96 vCPU, cái nhìn tổng quan của `perf` cho thấy page fault và tính toán ML chiếm phần lớn CPU, nhưng không giải thích được starvation. Phải dùng `mpstat` ở mức per-core per-second mới phát hiện: có một core CPU đơn lẻ (ví dụ core 39) chạy 100% system CPU trong nhiều giây, và chính khoảnh khắc đó trùng với thời điểm network reset xảy ra.

Vấn đề là reset xảy ra không thể dự đoán, nên các lần chạy `perf` thủ công đều không trúng thời điểm reset. Team phải thiết lập một môi trường reproducible: tách riêng vài máy bằng Kubernetes taint, chạy hàng loạt training job song song, đồng thời cho một script tự động chạy `perf record` theo chu kỳ 2 phút suốt 12 giờ để thu thập dữ liệu. Khi reset xảy ra, họ dùng Flamescope của Netflix để "tua thời gian" zoom vào đúng khoảnh khắc đó.

Kết quả cho thấy: ngay trước khi reset, tiến trình kubelet đột ngột chiếm ~6.5% tổng CPU (bình thường chỉ dưới 1%). Khi drill sâu hơn, kubelet dành phần lớn thời gian ở system call `mem_cgroup_nr_lru_pages`. Một bài blog của Oracle từng cảnh báo về hiện tượng "zombie memory cgroups" — và Pinterest xác nhận đúng: kernel đang theo dõi gần 70.000 memory cgroup nhưng thực tế chỉ có 240 cgroup đang dùng. Việc lặp qua danh sách khổng lồ này làm một core CPU bị chiếm dụng, và nếu network thread xui xẻo được schedule lên đúng core đó, nó sẽ bị starve hơn 5 giây.

Nguyên nhân sâu xa: base image AWS Deep Learning AMI (Ubuntu 20.04) mà Pinterest dùng cho máy GPU có bật sẵn systemd unit của Amazon ECS Agent. Vì các node Kubernetes không có quyền join ECS cluster, agent này liên tục crash và mỗi lần crash đều để lại một memory cgroup rò rỉ. Sau nhiều ngày, danh sách cgroup phình lên tới hàng chục nghìn mục. Reboot máy có tác dụng tạm thời vì nó reset bộ đếm memcg. Cách fix cuối cùng rất giản dị: tắt ECS agent systemd unit trong base image và reboot toàn bộ fleet để dọn sạch zombie.

Câu chuyện còn twist thú vị ở phần availability zone "không bị lỗi": thực ra zone đó có một bug khác khiến bootstrap script bị fail, nên ECS agent không bao giờ được khởi chạy — vô tình tạo ra môi trường sạch. Khi team Kubernetes fix bug đó, lỗi network reset sẽ xuất hiện ở zone còn lại.

**Điểm chính:**
- Driver mạng ENA của AWS tự reset khi các thread của nó bị CPU starvation quá 5 giây, khiến job huấn luyện ML bị crash vì mất gói tin.
- Trên máy nhiều vCPU, các profiler tổng quan như `perf` không đủ nhạy; cần `mpstat` per-core per-second mới phát hiện được một core bị chiếm 100% system CPU.
- Temporal profiling (Flamescope, gProfiler) rất cần thiết cho các bug xuất hiện không thể dự đoán — ghi profile liên tục rồi "tua" lại đúng thời điểm sự cố.
- "Zombie memory cgroups" là hiện tượng kernel vẫn track cgroup đã chết, khiến mỗi lần quét tốn thời gian hơn và có thể gây starvation.
- Base image do cloud provider cung cấp có thể chứa các service không cần thiết cho môi trường của bạn — phải kiểm tra kỹ systemd unit trước khi rollout.

## [Lập trình vẫn khổ vl](https://www.stvn.sh/writing/programming-still-sucks-fqffhyp)

Bài tiểu luận sắc sảo của Steven Langbroek — người tự nhận mình là "thuyền trưởng đang hoảng loạn" trên một con tàu đang cháy — lật ngược câu hỏi quen thuộc "AI có cướp việc của lập trình viên không". Theo tác giả, AI không phải thủ phạm: thủ phạm là lòng tham, khoác lên mình chiếc áo mới gọi là "tự động hóa".

Tác giả mở đầu bằng cảnh ở một bữa tiệc, nơi "Guy with a Real Job" hỏi anh rằng AI có đang lấy đi việc của dân lập trình hay không. Thay vì trả lời lịch sự, anh kể lại công việc thực sự của mình: nhảy lên một con tàu không có bản đồ, không có thủy thủ đoàn, động cơ nửa lắp, buồm úp xuống; dưới boong có một con búp bê điều hướng chỉ biết nói "onward and upward" trước khi tự bốc cháy. Đó là trạng thái của nhiều team kỹ thuật ngày nay.

Phần mạnh nhất của bài viết là khi tác giả phân tích cơ chế sa thải hàng loạt 2024. Các CEO đi họp offsite, xem demo AI viết cả một feature trong 14 phút, rồi về nói với hội đồng quản trị rằng có thể cắt 30% engineering trong Q2. Họ không "tỉnh ra một sáng rồi hủy diệt code review" — họ đã biết điều đó sẽ làm hại người khác, nhưng vẫn ký. Vì phương án còn lại là mất việc, mất thị thực, mất khả năng trả học phí cho con. Họ tự nhủ sẽ "quay lại sửa sau" — nhưng "sau" không bao giờ đến.

Bài viết đặt câu hỏi đau nhất: các junior đi đâu? Họ không có giá trị vì sản phẩm họ viết, mà vì một ngày họ sẽ trở thành senior biết mọi ngóc ngách của hệ thống. Khi ta tối ưu theo "output" và bãi bỏ chế độ "học việc", vài năm sau ta sẽ thắc mắc các senior biến đi đâu. Câu trả lời: "chúng ta đã tự tay bắn họ. Sẽ chẳng ai nhớ."

Tác giả kết bằng hình ảnh Sara — một nhân viên 55 tuổi thừa hưởng cron job từ Ben, người đã mất từ vài năm trước. Cô ấy giữ một chiếc USB chứa module mà không AI nào chạm tới, mỗi sáng đi bộ xuống cabin dưới boong để chạm vào đường dây vận hành lương cho 30.000 nhân viên. Cô ấy chính là hình mẫu của tri thức tổ chức mà "cuộc chuyển đổi số" vừa xóa sổ. Khi cô qua đời, cron job sẽ chết, lương ngừng trả, công ty sẽ phải tìm người kế thừa — và sẽ không tìm được, vì máy tạo ra cô ấy đã bị phá.

**Điểm chính:**
- Lập trình "khổ vl" không phải vì AI giỏi quá, mà vì lòng tham đã tìm ra cớ mới để cắt giảm nhân sự và phá vỡ chế độ học việc.
- Junior không có giá trị ở sản phẩm họ viết hôm nay, mà ở việc họ sẽ trở thành senior hiểu hệ thống trong 5-10 năm tới.
- "Tri thức tổ chức" thường tồn tại dưới dạng những cá nhân thầm lặng (cron job, USB stick, comment `# DO NOT CHANGE!!!`) — không có trong bất kỳ dashboard AI nào.
- Quyết định sa thải hàng loạt của 2024 được ký bởi những người "biết rõ hậu quả" nhưng sợ mất việc, mất thị thực, mất khả năng sửa chữa về sau.
- Tác giả kết luận: "AI không lấy việc của chúng ta. Lòng tham lấy. Nó chỉ đeo mặt nạ mới."

## [Cách hệ thống file container hoạt động: tự xây container từ đầu](https://labs.iximiuz.com/tutorials/container-filesystem-from-scratch)

Bài hướng dẫn chi tiết của Ivan Velichko trên iximiuz Labs "mổ xẻ" Docker bằng cách dựng lại một container chỉ với các công cụ Linux thuần: `unshare`, `mount`, `pivot_root`. Mục tiêu không phải để thay thế Docker, mà để người đọc xây được mô hình tinh thần vững chắc về những gì xảy ra bên dưới mỗi câu lệnh `docker run`.

Điểm khởi đầu là **mount namespace** — loại namespace đầu tiên xuất hiện trong Linux (khoảng năm 2002, từ 2.4). Thí nghiệm đơn giản: chạy `unshare --mount bash` trong một terminal, tạo file ở terminal khác, rồi `mount --bind /tmp /mnt` — terminal mới sẽ thấy file trong `/mnt` trong khi host thì không. Điều này chứng minh mount namespace cô lập *bảng mount* chứ không phải hệ thống file vật lý. Tác giả chỉ ra cách `findmnt` cho thấy hai danh sách mount point khác nhau giữa hai namespace.

Một bài học quan trọng thường bị bỏ qua: **mount event propagation** (kiểu lan truyền). Khi tạo mount namespace, kernel không hoàn toàn cô lập mà mặc định kế thừa cơ chế "shared subtrees". Nếu dùng trực tiếp `unshare(CLONE_NEWNS)` từ C, mọi mount mới sẽ bị "rò rỉ" ra host. Đó là lý do `unshare` CLI chạy thêm `mount("none", "/", NULL, MS_REC|MS_PRIVATE, NULL)` ngay sau syscall, biến propagation thành `rprivate`. Tác giả demo ba kiểu: `private`, `shared`, `slave` — và giải thích vì sao `pivot_root` (công cụ thay thế `chroot` an toàn hơn) yêu cầu mount point không được ở trạng thái `shared`.

Phần thực hành gồm 10 bước để tạo container hoàn chỉnh, bám sát những gì `runc` (OCI runtime) thực sự làm: chuẩn bị thư mục rootfs từ image Alpine 3; tạo năm namespace (mount, pid, cgroup, uts, net); mount các pseudo filesystem (`/proc`, `/dev` dưới dạng tmpfs, `/sys` read-only, cgroup2); bind mount các file `/etc/hosts`, `/etc/hostname`, `/etc/resolv.conf` riêng cho container; dùng `pivot_root` để chuyển root; cuối cùng "hardening" bằng cách remount một số path `/proc` dưới dạng read-only (ví dụ `/proc/sys`, `/proc/irq`) và "mask" các path nhạy cảm bằng tmpfs hoặc bind từ `/dev/null` (ví dụ `/proc/kcore`, `/proc/keys`).

Điểm đáng lưu ý về bảo mật: trong rootfs không tin cậy, đường dẫn có thể là symlink trỏ ra ngoài; runtime thật sử dụng `openat2()` với cờ `RESOLVE_NO_SYMLINKS` để tránh lỗ hổng TOCTTOU. Phần cuối giải thích cơ chế `bind mount` để chia sẻ volume từ host vào container (chính là cách flag `-v ./data:/data` của Docker hoạt động bên trong).

**Điểm chính:**
- Mount namespace cô lập *bảng mount*, không phải filesystem vật lý — đây là nền tảng của mọi cô lập filesystem trong container.
- Mount propagation (private/shared/slave) quyết định mount event có lan sang namespace khác hay không; bỏ qua cấu hình này dễ dẫn đến "rò rỉ" mount.
- `pivot_root` an toàn hơn `chroot` vì nó hoạt động ở cấp mount point và yêu cầu propagation phù hợp, tránh thoát ra ngoài qua symlink quên dọn.
- Container cần tối thiểu 5 namespace (mount, pid, cgroup, uts, net) và ba pseudo filesystem (`/proc`, `/dev`, `/sys`) để có môi trường khép kín.
- Bảo mật pseudo filesystem dựa trên remount read-only và "mask" bằng tmpfs/dev-null cho các path nhạy cảm như `/proc/kcore`, `/proc/keys`, `/sys/firmware`.

## [Dùng AI để viết mã tốt hơn — theo kiểu chậm hơn](https://nolanlawson.com/2026/05/25/using-ai-to-write-better-code-more-slowly/)

Nolan Lawson đặt câu hỏi ngược lại với cơn sốt "vibe coding" hiện nay: nếu phần lớn người ta dùng LLM để phun ra code tệ một cách nhanh nhất có thể, thì liệu có thể dùng cùng công cụ đó để viết code chất lượng cao — nhưng *chậm* hơn? Ông khẳng định: hoàn toàn có thể, và đó mới là cách khai thác sức mạnh thật sự của AI.

Bài viết lấy cảm hứng từ Mythos — bài benchmark cho thấy agent rất giỏi tìm bug khi được ném vào codebase. Tác giả cũng thấy điều tương tự với các model thương mại: Claude, GPT-5, Codex đều phát hiện được lỗi ở những góc mà con người bỏ sót. Vấn đề không nằm ở chỗ *tìm* bug, mà ở chỗ *ưu tiên* và *xác minh* chúng. Ông thiết kế một Claude skill đơn giản: chạy song song ba reviewer (Claude sub-agent, Codex, Cursor Bugbot), xếp hạng lỗi theo critical/high/medium/low, sau đó bản thân tác giả tự kiểm chứng lại để loại bỏ false positive. Cách làm này lấy cảm hứng từ một bài blog về AI code review với nhiều model — ý tưởng cốt lõi là càng nhiều model khác nhau cùng review, khả năng tất cả cùng "hallucinate" cùng một lỗi ảo càng thấp.

Quy trình thường ngày: yêu cầu agent sửa hết mức critical và high (dưới sự hướng dẫn của con người) rồi lặp cho đến khi cạn; bỏ qua một số medium nếu "không đáng công sửa"; bỏ cả PR nếu critical xuất hiện quá nhiều — dấu hiệu cho thấy cả hướng tiếp cận đã sai ngay từ đầu. Điểm thú vị nhất: vận tốc (velocity) của tác giả *không* tăng. Quá trình review thường lôi ra những bug *có sẵn từ trước* trong codebase, khiến tác giả sa vào viết unit test và sửa lỗi cũ — tức là "side quest" chứ không phải feature mới. Đây là điều hoàn toàn ngược lại với hình dung "năng suất gấp 10 lần" mà nhiều người gán cho vibe coding.

Tác giả mời những ai đang dùng agent mở PR hàng trăm dòng mà bản thân không hiểu hết, hãy thử chậm lại: hỏi agent PR hoạt động ra sao và có thể thất bại ở đâu; yêu cầu viết tài liệu Markdown kèm sơ đồ Mermaid; dùng skill `/grill-me` của Matt Pocock cho tới khi hiểu trọn vẹn PR. Có thể bạn sẽ không "productive" hơn theo số dòng code, có thể tốn rất nhiều token chỉ để rồi nhận ra cả kế hoạch sai bét, nhưng kiểu lập trình này là phiên bản "siêu năng lực" của chính cách tác giả đã cố làm trước thời LLM: cẩn thận, có phương pháp, ám ảnh chất lượng, và luôn nghĩ đến người lập trình viên tiếp theo sẽ đọc đoạn code này.

**Điểm chính:**
- LLM không chỉ là "slop cannon" — khi dùng đúng cách, chúng là công cụ tuyệt vời để *đánh giá* code thay vì chỉ *sinh* code.
- Chạy song song nhiều model (Claude, Codex, Cursor Bugbot) trong khâu review giúp giảm đáng kể tỉ lệ false positive, vì xác suất cả ba cùng "ảo giác" một bug là rất thấp.
- Velocity không tăng là chuyện bình thường: quá trình review tốt sẽ lộ ra *bug cũ* trong codebase, biến mỗi feature mới thành một cuộc "dọn dẹp" ngầm.
- Dùng skill chuyên (như `/grill-me` của Matt Pocock) để ép bản thân thật sự hiểu PR trước khi merge là cách giữ kỷ luật.
- Triết lý cốt lõi: "Output của LLM chỉ là bản nháp đầu tiên. Công việc thật sự bắt đầu từ khâu code review."

## [Cách CockroachDB xây dựng vector indexing ở quy mô lớn](https://blog.bytebytego.com/p/how-cockroachdb-built-vector-indexing)

ByteByteGo phân tích kiến trúc C-SPANN — thuật toán vector index "may đo" cho CockroachDB, ra đời từ việc nhận ra rằng không thuật toán vector search nào phổ biến đáp ứng được đầy đủ yêu cầu của một cơ sở dữ liệu phân tán có giao dịch.

Vector (hay embedding) là dãy số thực mô tả ngữ nghĩa của ảnh, văn bản, âm thanh; các thứ giống nhau sẽ nằm gần nhau trong không gian nhiều chiều. Khác với số và chuỗi, vector không có thứ tự tự nhiên, nên B-tree truyền thống bó tay. Brute-force so sánh từng cặp hoạt động với vài nghìn vector, "vỡ trận" ở vài chục nghìn, và bất khả thi từ triệu trở lên. Mọi vector index đều chấp nhận trả lại *xấp xỉ* nearest neighbor (ANN) để đổi lấy tốc độ.

CockroachDB đặt ra sáu ràng buộc kiến trúc: (1) không có node nào đóng vai trò điều phối trung tâm; (2) không phụ thuộc vào cache lớn trong RAM; (3) số network hop tối thiểu; (4) dữ liệu index phải sharding được; (5) tránh hot spot; (6) hỗ trợ cập nhật tăng dần. HNSW (graph-based, được dùng trong pgvector, Weaviate) đạt độ chính xác tốt nhưng dựng đồ thị trong RAM và khó shard; IVF giả định single-node; các vector database chuyên dụng như Pinecone giải quyết bằng cách tách hẳn ra hệ thống riêng — không phù hợp với ngữ cảnh cần vector chung sống với dữ liệu giao dịch.

C-SPANN kết hợp ba nguồn ý tưởng: cấu trúc cây phân vùng từ bài báo SPANN của Microsoft, kỹ thuật cập nhật tăng dần từ SPFresh, và ý tưởng lượng tử hóa từ ScaNN của Google. Cốt lõi là một cây K-means phân cấp rộng và nông: vector được nhóm vào các partition, mỗi partition có một centroid đại diện; các centroid lại được nhóm tiếp thành partition cấp cao hơn cho tới khi còn một root duy nhất. Với fanout khoảng 100, một triệu vector chỉ cần ba tầng, mười tỷ vector chỉ cần năm tầng. Truy vấn bắt đầu từ root, so centroid ở mỗi tầng rồi đi xuống partition gần nhất, có thể xử lý song song; ở lá, hệ thống quét vài trăm vector ứng viên bằng lệnh SIMD.

Điểm mấu chốt: mỗi partition được lưu thành một tập row key-value bình thường trong CockroachDB. Index không phải là một cấu trúc song song gắn ngoài, mà *là dữ liệu bảng* có thêm ngữ nghĩa. Quyết định này tận dụng ngay cơ chế đã có: CockroachDB tự biết cách split range khi quá lớn, rebalance khi tải thay đổi, cache block, replicate đa vùng — tất cả áp dụng cho vector index mà không cần viết thêm một dòng infrastructure nào. Khi node mới gia nhập cluster, các range chứa partition vector được phân phối y như dữ liệu bảng thường; khi node khởi động lại, index sẵn sàng phục vụ ngay vì nằm trên đĩa.

Vận hành index cũng được chăm sóc: partition quá lớn thì split bằng biến thể cân bằng của K-means; quá nhỏ thì merge với partition lân cận. Ý tưởng "nearest partition assignment" từ SPFresh đảm bảo vector luôn được gán lại vào partition có centroid gần nhất sau mỗi lần split, nên index tự cân bằng mà không cần rebuild. Để tiết kiệm dung lượng, C-SPANN dùng RaBitQ — biến mỗi chiều thành 1 bit, nén từ 3 KB/vector xuống còn ~200 byte (giảm 94%). Do nén là lossy, hệ thống rerank bằng cách quét vector nén để lấy candidate set, sau đó tải lại vector gốc để tính khoảng cách chính xác trên tập nhỏ đó.

Về multi-tenancy: CockroachDB dùng *prefix column* trên vector index — ví dụ `(user_id, embedding)`. Sau lớp cú pháp pgvector-compatible, hệ thống duy trì một cây K-means riêng cho từng giá trị `user_id`; hiệu năng truy vấn tỉ lệ theo số vector của user đó, không phải tổng index. Kết hợp với `REGIONAL BY ROW`, có thể đồng thời phân vùng theo geography, đáp ứng yêu cầu data domiciling.

C-SPANN chấp nhận một số đánh đổi thẳng thắn: phiên bản 25.2 mới là preview; chỉ hỗ trợ khoảng cách Euclidean; filtering trên non-prefix column còn giới hạn; trên benchmark thuần vector search, nó thua các hệ thống chuyên dụng về latency. Thiết kế phù hợp với workload cần vector và dữ liệu giao dịch chung sống, multi-tenant, đa vùng — không phải workload thuần vector đòi hỏi từng microsecond. Bài học lớn nhất: hãy xem index như dữ liệu bảng thường, để kế thừa toàn bộ cơ chế phân tán đã hoạt động ổn định.

**Điểm chính:**
- Vector index cần thuật toán ANN vì B-tree không thể tổ chức dữ liệu không có thứ tự tự nhiên — đổi độ chính xác lấy tốc độ.
- C-SPANN chọn cây K-means phân cấp nông thay cho HNSW/IVF, vì nó sharding được, cập nhật tăng dần, và không cần bộ nhớ lớn.
- Quyết định "index là dữ liệu bảng" cho phép C-SPANN kế thừa miễn phí cơ chế split, rebalance, cache, replicate, multi-region của CockroachDB.
- RaBitQ nén 94% kích thước vector; rerank candidate set bằng vector gốc là mẫu thiết kế "approximate filter + precise refine" phổ biến ở nhiều hệ thống.
- Multi-tenant giải quyết gọn ghẽ bằng prefix column: mỗi giá trị tenant có một cây K-means riêng, kết hợp `REGIONAL BY ROW` cho phân vùng địa lý.
