---
title: "Newsletter #122"
date: 2026-07-10
tags: ["AI-Assisted", "Newsletter", "PostgreSQL", "Database", "System Design", "High Availability", "Infrastructure"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #122.*

## [The worst take in tech: new grad hiring](https://www.scottkennedy.us/new-grads)

Scott Kennedy phản bác quan điểm đang lan rộng rằng doanh nghiệp nên ngừng tuyển sinh viên mới tốt nghiệp vì AI sẽ tự động hóa phần lớn công việc đầu vào. Theo lập luận đó, người mới vốn học nghề qua các nhiệm vụ đơn giản, nay những nhiệm vụ này do AI đảm nhận nên họ khó rèn được óc phán đoán, trong khi ngân sách còn phải chi cho token. Kennedy cho rằng đây là suy nghĩ sai lầm: năm qua, ông thấy nguồn ứng viên mới tốt nghiệp mạnh nhất trong hơn mười năm tuyển dụng, và Replit đã tăng gấp đôi chỉ tiêu tuyển kỹ sư mới ra trường để tận dụng cơ hội này. Những người đam mê, tò mò và có năng lực tốt có thể vượt qua cả người nhiều kinh nghiệm chỉ sau vài năm nếu được hướng dẫn tốt và giao bài toán khó; bỏ qua họ vì lo ngại AI là lựa chọn thiếu trách nhiệm.

Tác giả còn chỉ ra lợi thế của thế hệ "bản địa AI": lớn lên cùng công cụ mới, họ không có thói quen cũ cần thay đổi nên sử dụng các công cụ lập trình bằng AI rất thành thạo, điều ông thường thấy qua phỏng vấn. Dù vậy, công thức thành công cho người mới vẫn không đổi: tò mò để hiểu những gì diễn ra bên dưới và biết gỡ lỗi sâu, kiên trì học từ những lần thử thất bại, chủ động nhờ giúp đỡ khi bế tắc và tìm môi trường nhiều thử thách. AI thay đổi cách làm việc, nhưng không làm mất đi giá trị của khả năng học hỏi, nỗ lực và óc phán đoán.

## [Parsing Gigabytes of JSON per Second](https://arxiv.org/pdf/1902.08318)

Nghiên cứu giới thiệu `simdjson`, bộ phân tích cú pháp JSON đầu tiên vừa tuân thủ tiêu chuẩn vừa xử lý được hàng gigabyte dữ liệu mỗi giây trên một lõi của bộ xử lý phổ thông. Xuất phát điểm là thực tế JSON có mặt ở khắp nơi trên web, và khi hệ thống phải tiếp nhận khối lượng lớn tài liệu, bước phân tích cú pháp dễ trở thành nút thắt hiệu năng dù bài toán này đã được nghiên cứu từ lâu.

Điểm khác biệt của `simdjson` so với các bộ phân tích có kiểm tra tính hợp lệ khác là việc tận dụng triệt để lệnh SIMD, cho phép bộ xử lý thao tác trên nhiều phần dữ liệu trong cùng một lệnh. Nhờ vậy, nó chỉ cần khoảng một phần tư số lệnh hoặc ít hơn so với RapidJSON, một bộ phân tích hàng đầu, mà vẫn kiểm tra đầy đủ tính hợp lệ của JSON. Nhóm tác giả phát hành phần mềm dưới giấy phép nguồn mở dễ dãi, giúp kết quả dễ được kiểm chứng và cộng đồng dễ dàng áp dụng.

## [Six SQL patterns I use to catch transaction fraud](https://analytics.fixelsmith.com/posts/sql-fraud-patterns/)

Bài viết cho rằng phát hiện gian lận giao dịch phần lớn là bài toán SQL, thường mang lại giá trị sớm hơn một hệ thống phức tạp. Sáu mẫu áp dụng được cho thẻ tín dụng, thương mại điện tử và thanh toán y tế. Mẫu tần suất gom giao dịch theo cửa sổ thời gian để phát hiện chủ thẻ giao dịch dồn dập; dùng nhiều kích thước cửa sổ giúp bắt cả hành vi thử thẻ trong vài giây lẫn chuỗi giao dịch kéo dài hàng giờ. Mẫu di chuyển bất khả thi dùng hàm `LAG` cùng công thức khoảng cách địa lý để phát hiện một thẻ xuất hiện ở hai nơi cách xa trong thời gian phi thực tế. Mẫu số tiền đáng ngờ tìm các khoản tròn nhỏ đặc trưng của thử thẻ hoặc khoản ngay dưới ngưỡng kiểm soát, còn mẫu điểm bán đáng ngờ so hoạt động của từng điểm bán với mức nền của chính nó để phát hiện thiết bị thanh toán bị xâm nhập.

Mẫu hoạt động ngoài giờ so giao dịch với thói quen chi tiêu của chủ thẻ, nên chỉ đáng tin khi tài khoản có đủ lịch sử. Mẫu cuối dùng hàm cửa sổ tạo sẵn các cột dẫn xuất như thời gian từ giao dịch trước hay tổng tiền trong 24 giờ, để việc kết hợp tín hiệu chỉ còn là các điều kiện lọc đơn giản. Không mẫu nào đủ chính xác khi đứng riêng; giao dịch vi phạm ba hoặc bốn mẫu gần như chắc chắn là gian lận. Hệ thống vẫn cần xử lý đúng giá trị `NULL`, có người xem xét cảnh báo sai và lọc phạm vi thời gian trước khi chạy hàm cửa sổ để kiểm soát chi phí.

## [We replaced Redis with MySQL for inventory reservations—and it scaled (2026)](https://shopify.engineering/scaling-inventory-reservations)

Shopify chuyển hệ thống giữ chỗ tồn kho từ Redis sang MySQL để dữ liệu giữ chỗ và sổ cái nằm trong cùng một giao dịch ACID. Redis xử lý đồng thời tốt, nhưng việc cập nhật hai hệ thống không mang tính nguyên tử nên có thể gây bán vượt tồn kho hoặc giữ tồn kho sai. Thiết kế mới dùng một hàng cho mỗi đơn vị tồn kho thay vì một cột số lượng, giới hạn trong nhóm tối đa 1.000 hàng cho mỗi cặp sản phẩm và địa điểm để bảng không phình to mà truy vấn vẫn nhanh khi tồn kho lớn. Tính năng `SKIP LOCKED` của MySQL 8 cho phép giao dịch bỏ qua hàng đang bị khóa thay vì chờ, giảm mạnh tranh chấp khi nhiều người thanh toán cùng lúc. Khóa chính tổng hợp giúp giảm số khóa trên mỗi hàng, mức cô lập `READ COMMITTED` tránh khóa khoảng trống chặn giao dịch bổ sung hàng, còn thứ tự khóa nhất quán loại bỏ bế tắc.

Tuy vậy, nút thắt thực sự là cạn kết nối: CPU thấp nhưng yêu cầu vẫn xếp hàng. Gắn nhãn quy trình nghiệp vụ và đo tại tầng proxy giúp nhóm phát hiện các thao tác thanh toán khác giữ kết nối quá lâu. Sau khi dọn dẹp và điều chỉnh cấu hình, lượt đọc trên cơ sở dữ liệu chính giảm 50% và số giao dịch giảm 33%, CPU máy ghi dưới 50% ngay cả trong đợt giảm giá chớp nhoáng. Để chuyển đổi an toàn, Shopify ghi song song vào cả Redis và MySQL trong khi Redis vẫn là nguồn chính, so sánh kết quả trên lưu lượng thật rồi chuyển dần nguồn dữ liệu chính theo từng nhóm, luôn giữ khả năng quay lui.

## [Cell-Based Architecture for Resilient Payment Systems](https://americanexpress.io/cell-based-architecture-for-resilient-payment-systems/)

American Express tổ chức nền tảng thanh toán cốt lõi thành các ô độc lập, mỗi ô có dịch vụ, cơ sở dữ liệu và hạ tầng hỗ trợ riêng. Một ô được xác định bằng ranh giới sự cố chứ không phải một loại hạ tầng cụ thể: nó có thể hỏng, được bảo trì hoặc loại khỏi luồng xử lý mà không ảnh hưởng đến các ô khác. Dữ liệu tham chiếu ít thay đổi như tỷ giá được sao chép sẵn vào mọi ô để tránh tra cứu đồng bộ, còn dữ liệu thay đổi thường xuyên thì giao dịch được định tuyến xác định đến ô đang giữ trạng thái chính xác. Global Transaction Router kiểm soát mọi lưu lượng giữa các ô và ngăn dịch vụ ở ô này gọi trực tiếp sang ô khác; đôi khi phải nhân bản dịch vụ, nhưng đổi lại tính cô lập được giữ vững và độ trễ thấp hơn.

Khi sự cố xảy ra, giao dịch không tiếp tục dở dang ở ô khác mà được khởi động lại từ đầu tại một ô khỏe mạnh với dữ liệu ban đầu. Cách này an toàn nhờ mã giao dịch duy nhất bảo đảm tính lũy đẳng, giúp hệ thống phía sau nhận diện được bản trùng lặp. Lưu lượng được chuyển dần theo tỷ lệ phần trăm thay vì chuyển toàn bộ một lần. Nền tảng cũng giảm tối đa phụ thuộc phụ trợ bằng cách ghi nhật ký và tải cấu hình bất đồng bộ, chấp nhận suy giảm tính năng không quan trọng để luồng thanh toán không bị chặn. Khả năng chống chịu đến từ ranh giới sự cố rõ ràng và kỷ luật kiến trúc, không chỉ từ giám sát và thử lại.

## [When failover isn’t safe: Building high-availability PostgreSQL on Kubernetes](https://www.datadoghq.com/blog/engineering/postgresql-ha-kubernetes/)

Trong một buổi diễn tập mô phỏng sự cố vùng, Datadog phát hiện cụm PostgreSQL trên Kubernetes của họ không thể chuyển đổi dự phòng an toàn. Khi độ trễ mạng tăng vọt, máy chính vẫn ghi dữ liệu và sao chép bất đồng bộ, trong khi các máy dự phòng tụt lại ngày càng xa. Patroni từ chối nâng cấp chúng thành máy chính vì độ trễ vượt ngưỡng `maximum_lag_on_failover`; điều này tránh mất dữ liệu nhưng khiến cụm mắc kẹt, không thể tự khôi phục khả năng ghi. Bài học đầu tiên là tính sẵn sàng bề ngoài không có giá trị nếu không tồn tại ứng viên chuyển đổi dự phòng an toàn.

Datadog chuyển sang mô hình lai: các máy dự phòng trong nhóm ứng viên dùng sao chép đồng bộ, còn bản sao chỉ đọc vẫn bất đồng bộ để tránh chi phí không cần thiết. Patroni được cấu hình `synchronous_mode` cùng `synchronous_commit = remote_apply`, nghĩa là giao dịch chỉ được xác nhận sau khi dữ liệu đã được áp dụng ở máy dự phòng. Kiểm chuẩn với mức bền vững cao nhất ghi nhận độ trễ trung bình tăng 53% và thông lượng giảm 34%, nhưng khi triển khai dần qua các trung tâm dữ liệu kèm thời gian theo dõi, ảnh hưởng thực tế ở tầng ứng dụng vẫn chấp nhận được. Khi không còn máy dự phòng đồng bộ, hệ thống chặn ghi thay vì âm thầm mất dữ liệu, biến rủi ro thành lỗi rõ ràng để ứng dụng thử lại hoặc xếp hàng. Để cân bằng độ bền và hiệu năng, cần theo dõi thời gian chờ `SyncRep` và tình trạng của máy dự phòng đồng bộ.

## [From Christmas Outage to #1 App Store Ranking: An Aura Frames Postgres Scaling Retrospective](https://andyatkinson.com/postgresql-rds-scaling-aws-christmas-day-peak)

Đúng Giáng sinh 2024, cơ sở dữ liệu PostgreSQL của Aura Frames ngừng hoạt động ba giờ vì WAL tăng không giới hạn và lấp đầy ổ lưu nhật ký chuyên dụng. Nguyên nhân là RDS PostgreSQL 14.1 mặc định dùng khe sao chép cho bản sao: khe này buộc máy chính giữ lại WAL cho đến khi mọi bản sao nhận xong, nên khi bản sao chậm, WAL tích tụ đến mức hết dung lượng. Nhóm khắc phục bằng các tham số như `max_slot_wal_keep_size` và `wal_keep_size` để giới hạn lượng WAL, chấp nhận làm hỏng bản sao chậm thay vì để máy chính sập.

Để chuẩn bị cho cao điểm 2025, thay vì tiếp tục nâng cấp một máy chủ duy nhất, Aura phân phối nguyên bảng: mười bảng ghi nhiều nhất được chuyển sang bảy máy chính mới, tổng cộng tám cơ sở dữ liệu. Đây là cách làm thực dụng khi chưa cần chia nhỏ các hàng của bảng lớn nhất. Ứng dụng Ruby on Rails vẫn là một khối thống nhất, định tuyến truy vấn bằng Active Record Multiple Databases; sao chép vật lý giúp chuyển dữ liệu đáng tin cậy với 5-10 phút gián đoạn. Tổng tài nguyên CPU và bộ nhớ tăng khoảng 4,7 lần, và Giáng sinh 2025 hệ thống đạt đỉnh 226.000 giao dịch mỗi giây, duy trì hơn 100.000 trong mười giờ với thời gian truy vấn trung bình 25 micro giây. Kiểm thử liên tục, phát hành thử nghiệm và kiểm thử tải giúp giảm rủi ro khi sửa lớp truy cập dữ liệu; việc tạm cấp dư tài nguyên hợp lý cho cao điểm đoán trước được, và sau đó AWS Blue/Green giúp thu nhỏ hạ tầng để khôi phục hiệu quả chi phí.

## [.gitignore Isn’t the Only Way To Ignore Files in Git](https://nelson.cloud/.gitignore-isnt-the-only-way-to-ignore-files-in-git/)

Git hỗ trợ ba phạm vi quy tắc bỏ qua tệp, mỗi phạm vi phục vụ một mục đích riêng. `.gitignore` được đưa vào kho mã nguồn nên phù hợp với các quy tắc cả nhóm cần chia sẻ. `.git/info/exclude` nằm trong thư mục Git của kho và không được theo dõi, chỉ áp dụng cho bản sao kho trên máy hiện tại, rất hợp với ngoại lệ cá nhân như tệp ghi chú hay công cụ riêng không nên xuất hiện trong `.gitignore` chung. `~/.config/git/ignore` là tệp bỏ qua toàn cục áp dụng cho mọi kho trên máy, phù hợp với các tệp do hệ điều hành hoặc trình soạn thảo tạo ra lặp đi lặp lại, chẳng hạn `.DS_Store` trên macOS.

Có thể đổi vị trí tệp bỏ qua toàn cục bằng `git config --global core.excludesFile ~/.gitignore_global` và quay về mặc định bằng `git config --global --unset core.excludesFile`. Khi không rõ quy tắc nào đang khiến một tệp bị bỏ qua, `git check-ignore -v <tệp>` là cách nhanh nhất để truy nguyên: lệnh hiển thị tệp cấu hình, số dòng và mẫu đã khớp; nếu không in ra gì, tệp đó không bị quy tắc nào bỏ qua.

## [The only scalable delete in Postgres is DROP TABLE](https://planetscale.com/blog/the-only-scalable-delete)

Trong PostgreSQL, lệnh `DELETE` trên nhiều hàng không giải phóng tài nguyên ngay mà còn tạo thêm việc cho cơ sở dữ liệu. Cơ chế MVCC giữ lại các phiên bản hàng đã chết để những giao dịch đang chạy vẫn thấy dữ liệu phù hợp; autovacuum sau đó chỉ đánh dấu chỗ trống để tái sử dụng chứ không trả dung lượng cho hệ điều hành, còn chỉ mục và truy vấn vẫn phải kiểm tra các hàng chết. Thao tác xóa cũng sinh WAL và phải được sao chép, làm tăng độ trễ ghi, nợ dọn dẹp và độ trễ bản sao; xóa theo dây chuyền qua khóa ngoại còn có thể bất ngờ xóa hàng gigabyte dữ liệu. `VACUUM FULL` trả được dung lượng nhưng cần khóa bảng tốn kém.

Ngược lại, `DROP TABLE` và `TRUNCATE` cần khóa độc quyền `AccessExclusiveLock` nhưng chi phí gần như không phụ thuộc lượng dữ liệu: chúng xóa thẳng tệp vật lý, không tạo hàng chết hay nợ dọn dẹp. Vì vậy, nên thiết kế lược đồ để những lần xóa lớn trở thành thao tác bỏ bảng. Với chính sách lưu giữ dữ liệu dài hạn, phân vùng theo thời gian biến việc xóa thường xuyên thành thỉnh thoảng bỏ một phân vùng. Khi dọn dẹp một lần, có thể sao chép phần cần giữ sang bảng tạm, `TRUNCATE` bảng gốc rồi chèn lại, cách này chỉ ghi WAL cho các hàng được giữ; nếu không thể khóa lâu, hãy ghi song song sang bảng mới rồi đổi tên nguyên tử. Khi phần cần giữ lớn hơn nhiều so với phần cần xóa, xóa theo lô nhỏ vẫn là lựa chọn thực tế vì giữ giao dịch ngắn và cho autovacuum thời gian bắt kịp.

---

*Bài viết đã được viết lại bởi Claude Code với Opus 5.5 vào ngày 27/09/2026.*
