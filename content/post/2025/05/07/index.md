---
title: "Newsletter #20"
date: 2025-05-07
tags: [ "AI-Assisted", "Java", "Development", "Algorithms", "Git" ]
categories: [ "Newsletter" ]
---

*Mời bạn thưởng thức Newsletter #20.*

## [Performance Improvements in JDK 24](https://inside.java/2025/03/19/performance-improvements-in-jdk24/)

Bài viết trên Inside.java tổng hợp những cải tiến hiệu năng đáng chú ý nhất của JDK 24 so với JDK 23, liệt kê theo từng mục trong hệ thống theo dõi lỗi của JDK. Ở nhóm thư viện lõi, các thao tác hàng loạt của Foreign Function & Memory API như `MemorySegment::fill`, `copy` và `mismatch` giờ được xử lý bằng mã Java thuần khi vùng nhớ đủ nhỏ, tránh chi phí chuyển sang mã native qua Unsafe. Việc nối chuỗi chuyển sang dùng các lớp ẩn (hidden class) có thể lưu đệm và tái sử dụng thay vì dựng nhiều `MethodHandle` trung gian; các thuật toán SHA3 nhanh hơn tới 27% nhờ giảm chuyển đổi giữa mảng byte và mảng long; còn quá trình chuyển sang ClassFile API được tối ưu để giảm ảnh hưởng tới thời gian khởi động.

Ở tầng runtime, JEP 491 cho phép virtual thread bị chặn trong khối `synchronized` nhả luồng mang (carrier thread) thay vì bị ghim cố định, giúp mã dùng `synchronized` mở rộng tốt hơn. `String::indexOf` nhanh hơn khoảng 1,3 lần trên nền tảng x64 hỗ trợ AVX2. JEP 483 (Ahead-of-Time Class Loading & Linking), sản phẩm đầu tiên của Project Leyden, dùng bộ nhớ đệm AOT để cải thiện thời gian khởi động khoảng 42% trong ví dụ của bài. JEP 450 thử nghiệm header đối tượng chỉ 8 byte, giúp giảm 10–20% bộ nhớ với các khối lượng công việc thông thường. Ngoài ra, nền tảng RISC-V cũng nhận thêm nhiều hàm intrinsic như CRC32, Adler32 cùng các tối ưu cho so sánh chuỗi và đảo byte.

## [Clean your Memory: From Finalize to Cleaner](https://blog.frankel.ch/java-cleaner/)

Stefano Fago giải thích rằng bộ thu gom rác (GC) của Java chỉ quản lý bộ nhớ, không tự giải phóng các tài nguyên bên ngoài như socket hay file handle; nếu quản lý sai, ứng dụng có thể rò rỉ tài nguyên, chậm dần hoặc sập. Cách cũ là ghi đè `finalize()`, nhưng phương thức này đã bị đánh dấu lỗi thời vì thời điểm chạy không đoán trước được, đối tượng phải qua thêm một chu kỳ GC mới được thu hồi, có thể gây rò rỉ nếu đối tượng vô tình bị giữ lại, và luồng Finalizer riêng dễ gây tranh chấp. Giải pháp thay thế là Cleaner API, có từ Java 9: bên dưới nó dùng `PhantomReference` cùng một luồng daemon nền, nhưng che giấu sự phức tạp của các lớp Reference. Bạn đăng ký đối tượng kèm một hành động dọn dẹp, và khi đối tượng không còn truy cập được, hành động đó được đưa vào hàng đợi để chạy trên luồng nền.

Cleaner có thể kết hợp với `AutoCloseable`: phương thức `close()` gọi `clean()` để dọn dẹp ngay khi cần, còn Cleaner đóng vai trò lưới an toàn. Tuy vậy, tác giả nhấn mạnh chỉ nên dùng Cleaner khi không thể giải phóng tài nguyên bằng try-with-resources hoặc gọi `close()` tường minh, vì cơ chế này dọn dẹp bất đồng bộ và tốn chi phí hơn do cần luồng nền. Khi viết hành động dọn dẹp, nên tránh lambda vì dễ vô tình giữ tham chiếu tới chính đối tượng cần dọn, khiến nó không bao giờ được thu hồi; hành động cũng cần ngắn gọn và không chặn, vì nhiều hành động có thể chạy đồng thời trên cùng một Cleaner.

## [5 Hidden Git Tips for Java Developers](https://www.azul.com/blog/5-hidden-git-tips-for-java-developers/)

Trên blog của Azul, Luqman Saeed giới thiệu năm tính năng ít được chú ý của Git, vượt ra ngoài bộ ba quen thuộc commit, push và pull, kèm ví dụ gắn với dự án Java. Đầu tiên là `git bisect`: khi không rõ commit nào gây lỗi, bạn đánh dấu commit hiện tại là xấu (`git bisect bad`) và một commit cũ còn chạy đúng là tốt (`git bisect good <commit-hash>`), rồi Git tìm kiếm nhị phân bằng cách lần lượt checkout commit ở giữa để bạn kiểm thử cho đến khi tìm ra thủ phạm; kết thúc bằng `git bisect reset`. Tiếp theo, `git blame <tên-tệp>` cho biết ai sửa từng dòng lần cuối và vào lúc nào (thêm cờ `-L 50,60` để chỉ xem một đoạn), giúp bạn hiểu bối cảnh trước khi gỡ lỗi hay tái cấu trúc. Khi phải chuyển việc giữa chừng, `git stash` cất tạm các thay đổi chưa commit và `git stash pop` lấy chúng lại; `git stash list` cùng `git stash apply <stash-id>` giúp quản lý nhiều lần cất.

Với các tệp tạm do Maven hay Gradle sinh ra như `.class` hoặc thư mục `target/`, `git clean -n` cho xem trước, `-f` xóa tệp chưa theo dõi, `-fd` xóa cả thư mục, còn `-x` xóa luôn các tệp bị bỏ qua như `.idea/`. Cuối cùng, git hooks là các script tự chạy trước hoặc sau những sự kiện như commit, push hay merge; chẳng hạn một hook `pre-commit` đặt trong `.git/hooks` có thể chạy `mvn test` và hủy commit nếu kiểm thử thất bại. Mẹo bổ sung: `git checkout -` đưa bạn về nhánh vừa làm việc trước đó mà không cần gõ lại tên nhánh, vừa tiết kiệm thời gian vừa tránh gõ sai.

## [Simplify Your System by Challenging the Status-Quo and Learning from Other Ecosystems](https://www.infoq.com/podcasts/simplify-system-learning-ecosystems/)

Trong podcast của InfoQ, Max Rydahl Andersen, Distinguished Engineer tại Red Hat và tác giả của JBang, kể rằng sau một năm tạm rời Java, khi quay lại ông nhận ra cộng đồng đã tích tụ quá nhiều độ phức tạp, giống như "một nghìn vết cắt giấy" (thousand paper cuts): mỗi tính năng nhỏ đều hữu ích nhưng cộng lại thành gánh nặng. Quarkus, dự án ông tham gia, đảo ngược cách làm truyền thống bằng cách dời phần lớn xử lý sang thời điểm build thay vì runtime, nhờ đó ứng dụng khởi động rất nhanh. Tốc độ này còn mở ra trải nghiệm phát triển tốt hơn: tải lại nóng (hot reload), kiểm thử liên tục, Dev Services tự dựng các dịch vụ như PostgreSQL hay Kafka, và giao diện chat để thử dịch vụ AI qua LangChain4J ngay trong Dev UI.

Với JBang, ông lấy cảm hứng từ Python và Node.js để chạy Java chỉ từ một tệp duy nhất, thậm chí tự tải JDK nếu máy chưa cài; ông tuyên bố nếu tìm được môi trường phát triển nào dễ cài đặt hơn thì đó là lỗi của JBang. Max cũng cho rằng AI không thay thế được nền tảng kỹ thuật phần mềm và tư duy hệ thống, đồng thời cảnh báo AI sẽ giúp khai thác lỗ hổng (CVE) nhanh hơn, nên các hệ thống cũ cần được cập nhật thường xuyên hơn. Thông điệp chung của buổi trò chuyện: hãy thách thức hiện trạng và học hỏi từ các hệ sinh thái khác để giữ hệ thống đơn giản.

## [About "vibe coding"](https://tryingthings.wordpress.com/2025/03/24/about-vibe-coding/)

Sorin Costea viết ngắn gọn về trào lưu "vibe coding", tức để AI viết mã nguồn thay cho lập trình viên. Sau khi đọc bài "Vibe coding vs Reality", ông thấy không chỉ riêng ông hoài nghi, vì chính ông đã thử Cursor với một dự án Java Maven và công cụ này thậm chí không đổi tên nổi một lớp: lúc thì chỉ đổi tên lớp mà không đổi tên tệp, lúc được yêu cầu lại thì tạo ra một tệp rỗng mang tên mới, và chuyện đó lặp lại hai lần.

Khi chia sẻ trên Hacker News, ông chỉ nhận được những phản hồi kiểu "haha Java", khiến ông tự hỏi Cursor chỉ được huấn luyện cho các framework frontend thịnh hành hay những người ủng hộ nó không quan tâm đến ứng dụng thực tế. Kết quả là ông gỡ Cursor và càng hoài nghi các giải pháp AI "thần kỳ", dù vẫn để ngỏ khả năng thay đổi: "Nhưng năm sau? Năm sau sẽ biết."

## [Visual-Focused Algorithms Cheat Sheet](https://photonlines.substack.com/p/visual-focused-algorithms-cheat-sheet)

Nick M tổng hợp một bảng tra cứu (cheat sheet) thiên về hình ảnh cho các thuật toán quan trọng được dùng trong thực tế, nối tiếp bảng tra cứu cấu trúc dữ liệu trước đó của ông; mỗi thuật toán được giải thích bằng ví dụ đời thường và hình minh họa. Phần sắp xếp đi từ Selection Sort và Insertion Sort, đơn giản nhưng có độ phức tạp O(n²), đến Heap Sort, Quick Sort và Merge Sort với O(n log n), rồi Tim Sort, thuật toán lai giữa Insertion Sort và Merge Sort được dùng trong Python và Java. Phần tìm kiếm gồm Binary Search với O(log n) cùng DFS và BFS để duyệt đồ thị theo chiều sâu và chiều rộng. Phần đồ thị trình bày Prim và Kruskal để tìm cây khung nhỏ nhất, Dijkstra và Bellman-Ford để tìm đường đi ngắn nhất (Bellman-Ford xử lý được cả trọng số âm), A* dùng hàm ước lượng (heuristic), cùng Union-Find và Ford-Fulkerson.

Các phần tiếp theo bao quát tìm kiếm chuỗi, nén và mã hóa dữ liệu (Huffman, LZ, biến đổi Fourier, nén ảnh JPEG), tối ưu hóa (Simplex, Simulated Annealing), học máy và khoa học dữ liệu, cùng các thuật toán bảo mật và mật mã. Cuối bài là mục tài liệu luyện phỏng vấn như "14 Patterns to Ace Any Coding Interview" và "5 Simple Steps for Solving Dynamic Programming Problems", rất hữu ích cho các bạn mới vào nghề đang chuẩn bị phỏng vấn.

## Bonus: Vài ảnh hay ho đến từ [ByteByteGo](https://bytebytego.com/)

![3 Steps to Master Your Software](https://substack-post-media.s3.amazonaws.com/public/images/81074d22-5821-4aec-bb2d-0a099d06b6ac_1600x840.png)
![The Ultimate Software Architect Roadmap](https://substack-post-media.s3.amazonaws.com/public/images/67c39b9a-9a91-4e57-9e24-7714b4f806dd_1280x1349.gif)
![How Two-factor Authentication (2FA) Works?](https://substack-post-media.s3.amazonaws.com/public/images/fb1b1cd1-eac3-4b66-a391-9ec73f6c37f3_1280x1502.gif)
![How Amazon S3 Works?](https://substack-post-media.s3.amazonaws.com/public/images/3efae3ad-8c45-4fb2-a79f-6b3387b0751e_1280x1601.gif)

---

*Bài viết đã được viết lại bởi Claude Code với Opus 5.5 vào ngày 27/09/2026.*
