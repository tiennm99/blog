---
title: "Newsletter #109"
date: 2026-06-06
tags: ["AI-Assisted", "AI", "DevOps", "Distributed Systems", "Developer Experience", "Database", "Software Engineering"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #109.*

## [A History of IDEs at Google](https://laurent.le-brun.eu/blog/a-history-of-ides-at-google)

Laurent Le Brun, người gắn bó 12 năm với mảng công cụ lập trình ở Google, kể lại chặng đường biến một hệ sinh thái trình soạn thảo phân mảnh thành một IDE gần như chung cho cả công ty. Năm 2011, khi có người hỏi liệu nên thống nhất một IDE hay không, câu trả lời gần như đồng thuận là "không" — Jeff Dean cho rằng ép cả nhóm dùng chung một trình soạn thảo là công thức dẫn tới bất hạnh. Cái giá của tự do là mỗi tích hợp hữu ích như Bazel, tìm kiếm mã nguồn hay công cụ định dạng đều phải làm lại cho từng IDE. Khoảng năm 2013, Cider ra đời như một trình soạn thảo chạy trên web, ban đầu chỉ để sửa nhanh tài liệu, nhưng nhờ phần backend có khả năng lập chỉ mục cả monorepo khổng lồ, nó dần thu hút lập trình viên Go rồi Java.

Năm 2020, nhóm quyết định thay phần giao diện của Cider bằng lõi VSCode mà vẫn giữ backend riêng của Google; bản Cider V mở thử nghiệm cho 5.000 kỹ sư năm 2021, và đến 2023 đã chiếm khoảng 80% hoạt động phát triển trên kho mã chính. Khi phần lớn kỹ sư dùng chung một nền tảng, các nhóm có động lực tự viết tiện ích mở rộng — khoảng 100 tiện ích nội bộ chỉ sau hai năm — và các tính năng AI như gợi ý mã nguồn hay tự xử lý nhận xét khi review được đưa tới mọi người nhanh hơn nhiều. Bài học tác giả rút ra: chuẩn hóa công cụ tạo ra đòn bẩy lớn, dù chi phí ban đầu cao và không phải công ty nào cũng theo đuổi được.

## [Finding zombies in our systems: A real-world story of CPU bottlenecks](https://medium.com/pinterest-engineering/finding-zombies-in-our-systems-a-real-world-story-of-cpu-bottlenecks-ea4722e552eb)

Đầu năm 2025, các job huấn luyện ML chạy trên Ray của Pinterest liên tục bị sập do mất kết nối mạng chập chờn, và nhóm nền tảng Kubernetes mất hơn ba tháng để tìm ra thủ phạm. Manh mối đầu tiên là driver mạng ENA trên EC2 tự reset mỗi khi hàng đợi gửi bị treo quá 5 giây, dấu hiệu của tình trạng CPU bị chiếm dụng; lạ hơn, lỗi chỉ xảy ra ở một availability zone dù cấu hình các cụm trông giống hệt nhau, và khởi động lại máy chỉ giúp được khoảng một tuần. Trên máy GPU 96 vCPU, `perf` tổng quan không cho thấy gì bất thường; phải dùng `mpstat` theo từng lõi, từng giây mới phát hiện có một lõi đơn lẻ chạy 100% CPU hệ thống trong nhiều giây, trùng thời điểm reset. Nhóm sau đó cho `perf record` chạy tự động theo chu kỳ 2 phút rồi dùng Flamescope của Netflix để "tua" tới đúng khoảnh khắc lỗi.

Kết quả: ngay trước mỗi lần reset, kubelet vọt lên khoảng 6,5% tổng CPU (bình thường dưới 1%), phần lớn nằm trong lời gọi hệ thống `mem_cgroup_nr_lru_pages`. Kernel đang theo dõi gần 70.000 memory cgroup trong khi chỉ 240 cái thực sự được dùng — hiện tượng "zombie memcg"; duyệt qua danh sách này chiếm trọn một lõi, bỏ đói luồng mạng chạy trên đó. Nguồn gốc là base image AWS Deep Learning AMI (Ubuntu 20.04) bật sẵn agent của Amazon ECS; agent không thể tham gia cụm ECS nên liên tục sập, mỗi lần để lại một cgroup rò rỉ. Cách sửa rất đơn giản: tắt systemd unit của agent và khởi động lại toàn bộ máy. Còn zone "khỏe mạnh" hóa ra nhờ một lỗi khác khiến agent không bao giờ được chạy.

## [Programming Still Sucks.](https://www.stvn.sh/writing/programming-still-sucks-fqffhyp)

Steven Langbroek viết bài tiểu luận này để trả lời câu hỏi quen thuộc "AI có cướp việc của lập trình viên không", và câu trả lời của anh là không: thủ phạm là lòng tham, chỉ khoác thêm chiếc áo mới tên "tự động hóa". Mở đầu từ một câu hỏi vu vơ ở bữa tiệc sinh nhật, tác giả dựng lên hình ảnh công việc lập trình như một con tàu đang cháy: không bản đồ, không thủy thủ đoàn, buồm lắp ngược, hệ thống dẫn đường vô dụng, và người tiền nhiệm đã bỏ tàu sau khi để lại những "sáng kiến" dang dở. Theo anh, các đợt cắt giảm nhân sự được ký bởi những người biết rõ hậu quả nhưng chịu áp lực từ bảng tính và chỉ tiêu quý, luôn tự nhủ sẽ "quay lại sửa sau" — một cái "sau" không bao giờ đến.

Điểm nhức nhối nhất là câu hỏi các lập trình viên junior đi đâu. Giá trị của họ không nằm ở mã nguồn họ viết hôm nay mà ở chỗ một ngày họ sẽ thành senior hiểu mọi ngóc ngách hệ thống; bỏ chế độ học việc để tối ưu đầu ra, vài năm sau ta sẽ không còn ai kế cận. Trung tâm cảm xúc của bài là Sara, một chuyên gia hạ tầng lớn tuổi thừa hưởng tri thức từ Ben và giữ cho công ty vận hành nhờ một cron job bí ẩn mà không ai khác hiểu. Khi Sara nghỉ, công ty sẽ cần người thay thế nhưng không còn cơ chế nào để đào tạo ra người đó. Thảm họa, theo tác giả, không nằm ở công nghệ mà ở việc tổ chức tự phá hoại chính mình.

## [How Container Filesystem Works: Building a Docker-like Container From Scratch](https://labs.iximiuz.com/tutorials/container-filesystem-from-scratch)

Bài hướng dẫn của Ivan Velichko trên iximiuz Labs tự tay dựng một container chỉ bằng các công cụ Linux thuần như `unshare`, `mount` và `pivot_root`, không nhằm thay thế Docker mà để giúp người đọc có mô hình tư duy rõ ràng về những gì diễn ra bên dưới lệnh `docker run`. Nền tảng là mount namespace: nó cô lập bảng mount — danh sách hệ thống file được gắn mà tiến trình nhìn thấy — chứ không phải bản thân hệ thống file vật lý, điều có thể kiểm chứng bằng `findmnt` ở hai namespace khác nhau. Tác giả nhấn mạnh cơ chế lan truyền sự kiện mount với ba kiểu private, shared và slave: nếu bỏ qua, mount tạo trong container có thể "rò" ra máy chủ, và `pivot_root` — lựa chọn an toàn hơn `chroot` — đòi hỏi mount cha không ở chế độ shared.

Phần thực hành bám sát cách `runc` làm thật: chuẩn bị thư mục rootfs từ image Alpine; tạo các namespace mount, pid, cgroup, uts và net; gắn các hệ thống file giả `/proc`, `/dev`, `/sys` với ràng buộc phù hợp; bind mount các file `/etc/hosts`, `/etc/hostname`, `/etc/resolv.conf` riêng cho container; chuyển root bằng `pivot_root`; rồi gia cố bằng cách đặt một số đường dẫn trong `/proc` ở chế độ chỉ đọc và che các đường dẫn nhạy cảm bằng tmpfs hoặc `/dev/null`. Về bảo mật, rootfs không đáng tin có thể chứa symlink trỏ ra ngoài, nên runtime thật dùng `openat2()` với cờ `RESOLVE_NO_SYMLINKS` và thao tác qua file descriptor để tránh lỗ hổng TOCTTOU. Cuối cùng, bind mount cũng chính là cơ chế đứng sau cờ `-v` khi chia sẻ volume từ máy chủ vào container.

## [Using AI to write better code more slowly](https://nolanlawson.com/2026/05/25/using-ai-to-write-better-code-more-slowly/)

Giữa cơn sốt "vibe coding", Nolan Lawson đặt câu hỏi ngược: nếu nhiều người dùng LLM để sinh ra mã nguồn kém chất lượng thật nhanh, liệu có thể dùng chính công cụ đó để viết mã tốt hơn nhưng chậm hơn? Câu trả lời của ông là có. Quy trình của ông xoay quanh việc review bằng nhiều model: cho Claude, Codex và Cursor Bugbot cùng xem xét một pull request một cách độc lập, xếp lỗi theo mức critical, high, medium, low, rồi tự mình tổng hợp và kiểm chứng để loại bỏ cảnh báo sai. Dùng nhiều model khác nhau, xóa ngữ cảnh giữa các lượt, giúp giảm khả năng tất cả cùng "ảo giác" ra một lỗi không có thật. Sau đó ông để agent sửa các lỗi critical và high, lặp lại tới khi hết, cân nhắc xem lỗi còn lại có đáng công sửa không, và bỏ hẳn pull request nếu lộ ra sai lầm ở tầng kiến trúc.

Điều thú vị là tốc độ làm việc của tác giả không hề tăng: quá trình review thường lôi ra những lỗi có sẵn từ trước, biến mỗi tính năng mới thành một "nhiệm vụ phụ" viết kiểm thử và dọn dẹp mã cũ. Với những ai đang để agent mở pull request hàng trăm dòng mà không hiểu hết, ông khuyên hãy chậm lại: hỏi agent mã hoạt động ra sao và có thể hỏng ở đâu, yêu cầu viết tài liệu kèm sơ đồ Mermaid, hoặc dùng skill `/grill-me` của Matt Pocock cho tới khi hiểu trọn vẹn. Cách làm này tốn nhiều token hơn, nhưng đổi lại là hiểu rõ các tình huống thất bại và một codebase khỏe hơn.

## [How CockroachDB Built Vector Indexing at Scale](https://blog.bytebytego.com/p/how-cockroachdb-built-vector-indexing)

ByteByteGo phân tích C-SPANN, thuật toán lập chỉ mục vector mà CockroachDB tự thiết kế vì không giải pháp phổ biến nào hợp với một cơ sở dữ liệu phân tán có giao dịch. Vector không có thứ tự tự nhiên nên B-tree bất lực; mọi chỉ mục vector đều chấp nhận tìm láng giềng gần đúng (ANN) để đổi lấy tốc độ. CockroachDB đặt ra sáu ràng buộc: không có nút điều phối trung tâm, không phụ thuộc cấu trúc lớn trong bộ nhớ, ít bước mạng, phân mảnh được, không tạo điểm nóng và hỗ trợ cập nhật tăng dần theo thời gian thực. Chúng loại bỏ HNSW và IVF truyền thống. C-SPANN dùng cây K-means phân cấp rộng và nông: với hệ số phân nhánh khoảng 100, một triệu vector chỉ cần ba tầng, mười tỷ vector cần năm tầng.

Quyết định then chốt là lưu mỗi partition thành các dòng key-value bình thường trong CockroachDB, nên chỉ mục kế thừa sẵn cơ chế tách range, cân bằng tải, nhân bản và đa vùng mà không cần hạ tầng riêng. Để tiết kiệm dung lượng, RaBitQ nén vector 1.536 chiều từ khoảng 3 KB xuống 200 byte (giảm 94%), sau đó dùng vector gốc để xếp hạng lại tập ứng viên nhỏ. Với nhiều người thuê, cột tiền tố như `(user_id, embedding)` tạo cây riêng cho từng người dùng, kết hợp `REGIONAL BY ROW` để đáp ứng yêu cầu lưu trữ dữ liệu theo vùng. Đánh đổi được nói thẳng: C-SPANN thua các cơ sở dữ liệu vector chuyên dụng về độ trễ thuần túy và hiện chỉ hỗ trợ khoảng cách Euclidean, nhưng rất hợp với khối lượng công việc cần vector sống chung với dữ liệu giao dịch.

---

*Bài viết đã được viết lại bởi Claude Code với Opus 5.5 vào ngày 27/09/2026.*
