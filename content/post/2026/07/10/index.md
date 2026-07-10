---
title: "Newsletter #122"
date: 2026-07-10
tags: ["AI-Assisted", "Newsletter", "PostgreSQL", "Database", "System Design", "High Availability", "Infrastructure"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #122.*

## [The worst take in tech: new grad hiring](https://www.scottkennedy.us/new-grads)

Bài viết phản bác quan điểm doanh nghiệp nên ngừng tuyển sinh viên mới tốt nghiệp vì AI sẽ tự động hóa công việc đầu vào. Scott Kennedy cho biết Replit đã tăng gấp đôi chỉ tiêu tuyển kỹ sư mới tốt nghiệp khi nhận thấy nguồn ứng viên vừa đông vừa chất lượng. Theo ông, những người có đam mê, tò mò và năng lực tốt có thể tiến bộ rất nhanh nếu được hướng dẫn và giao bài toán khó.

Nhóm này còn có lợi thế lớn lên cùng các công cụ AI nên ít bị ràng buộc bởi thói quen cũ và sử dụng công nghệ mới tự nhiên hơn. Để thành công, họ vẫn cần tò mò để hiểu sâu hệ thống, kiên trì khi thử nghiệm thất bại và chủ động chọn môi trường thử thách. AI thay đổi cách làm việc, nhưng không làm mất giá trị của năng lực học hỏi, nỗ lực và óc phán đoán.

**Điểm chính:**
- Lo ngại AI không phải lý do hợp lý để bỏ qua nguồn ứng viên mới tốt nghiệp có tiềm năng.
- Ứng viên trẻ xuất sắc có thể phát triển nhanh khi được hướng dẫn tốt và giải quyết bài toán khó.
- Lớn lên cùng AI giúp họ tiếp cận công cụ mới tự nhiên hơn, không bị thói quen cũ cản trở.
- Tò mò, kiên trì và chủ động vẫn là nền tảng phát triển nghề nghiệp.

## [Parsing Gigabytes of JSON per Second](https://arxiv.org/pdf/1902.08318)

Nghiên cứu trình bày `simdjson`, một bộ phân tích cú pháp JSON tuân thủ tiêu chuẩn và có thể xử lý hàng gigabyte dữ liệu mỗi giây trên một lõi của bộ xử lý phổ thông. Công trình xuất phát từ thực tế việc tiếp nhận lượng lớn tài liệu JSON dễ trở thành nút thắt hiệu năng, dù bài toán phân tích cú pháp đã được nghiên cứu từ lâu.

So với RapidJSON, `simdjson` chỉ cần khoảng một phần tư số lệnh hoặc ít hơn để xử lý cùng khối lượng dữ liệu. Thành quả này đến từ việc tận dụng mạnh các lệnh SIMD, cho phép bộ xử lý thao tác trên nhiều phần dữ liệu cùng lúc mà vẫn kiểm tra tính hợp lệ của JSON. Nhóm tác giả cũng phát hành phần mềm dưới giấy phép nguồn mở để kết quả có thể được kiểm chứng và tái sử dụng.

**Điểm chính:**
- Phân tích cú pháp JSON có thể trở thành nút thắt khi hệ thống tiếp nhận dữ liệu ở quy mô lớn.
- `simdjson` đạt tốc độ hàng gigabyte mỗi giây trên một lõi bộ xử lý phổ thông.
- Thiết kế SIMD giúp giảm mạnh số lệnh cần thực thi so với RapidJSON.
- Dự án tuân thủ tiêu chuẩn, kiểm tra tính hợp lệ và được phát hành dưới giấy phép nguồn mở.

## [Six SQL patterns I use to catch transaction fraud](https://analytics.fixelsmith.com/posts/sql-fraud-patterns/)

Bài viết xem phát hiện gian lận giao dịch chủ yếu là bài toán SQL: truy vấn đúng bảng, phép nối và mẫu dữ liệu thường đem lại giá trị sớm hơn hệ thống phức tạp. Sáu mẫu có thể áp dụng cho thẻ tín dụng, thương mại điện tử, yêu cầu thanh toán y tế và các hệ thống ghi nhận dòng tiền.

Các mẫu gồm tần suất giao dịch, di chuyển bất khả thi, số tiền đáng ngờ, mức tăng bất thường tại điểm bán, hoạt động ngoài giờ và hàm cửa sổ để kết hợp tín hiệu. Không quy tắc nào đủ chính xác khi đứng riêng; hệ thống cần chấm điểm nhiều tín hiệu, có người xem xét cảnh báo, bảo vệ dữ liệu cá nhân và giới hạn phạm vi thời gian trước khi chạy truy vấn tốn kém.

**Điểm chính:**
- Nhiều cửa sổ thời gian giúp nhận diện cả thử thẻ nhanh lẫn chuỗi giao dịch kéo dài.
- `LAG` và khoảng cách địa lý có thể phát hiện một thẻ xuất hiện ở hai nơi trong thời gian phi thực tế.
- Số tiền tròn, số tiền ngay dưới ngưỡng và mức tăng tại điểm bán cần được so với bối cảnh riêng.
- Hoạt động ngoài giờ chỉ đáng tin khi tài khoản có đủ lịch sử để xác định thói quen.
- Hàm cửa sổ giúp kết hợp giả thuyết nhanh bằng SQL, nhưng vẫn cần kiểm soát cảnh báo sai và chi phí.

## [We replaced Redis with MySQL for inventory reservations—and it scaled (2026)](https://shopify.engineering/scaling-inventory-reservations)

Shopify chuyển hệ thống giữ chỗ tồn kho từ Redis sang MySQL để đặt dữ liệu giữ chỗ và sổ cái trong cùng giao dịch ACID. Redis xử lý đồng thời tốt nhưng việc cập nhật hai hệ thống không nguyên tử, có thể gây bán vượt tồn kho hoặc giữ tồn kho sai. Thiết kế MySQL dùng một hàng cho mỗi đơn vị trong nhóm tối đa 1.000 hàng theo sản phẩm và địa điểm; `SKIP LOCKED` bỏ qua hàng đang bị khóa để giảm chờ đợi.

Nhóm tăng thông lượng bằng khóa chính tổng hợp, `READ COMMITTED`, thứ tự khóa nhất quán và `UNION ALL`. Nút thắt thực tế lại là các quy trình khác giữ kết nối MySQL quá lâu. Gắn nhãn câu lệnh và đo tại ProxySQL giúp xác định tác nhân, giảm 50% lượt đọc và 33% giao dịch trên cơ sở dữ liệu chính. Shopify chạy song song Redis và MySQL, so sánh trên lưu lượng thật rồi chuyển dần nguồn dữ liệu chính với công tắc quay lui.

**Điểm chính:**
- Đặt giữ chỗ và sổ cái trong cùng MySQL cải thiện tính nhất quán.
- Nhóm hàng có giới hạn giữ truy vấn `SKIP LOCKED` nhanh khi tồn kho lớn.
- Chỉ mục, mức cô lập và thứ tự khóa quyết định thông lượng và nguy cơ bế tắc.
- CPU thấp nhưng yêu cầu vẫn xếp hàng là dấu hiệu cần đo thời gian giữ kết nối.
- Chạy song song và chuyển đổi từng phần giúp kiểm chứng hiệu năng và khả năng quay lui.

## [Cell-Based Architecture for Resilient Payment Systems](https://americanexpress.io/cell-based-architecture-for-resilient-payment-systems/)

American Express tổ chức nền tảng thanh toán thành các ô độc lập, mỗi ô có dịch vụ và dữ liệu riêng trong một vùng. Mỗi ô là miền sự cố, có thể bảo trì hoặc loại khỏi luồng mà không ảnh hưởng ô khác. Không có phụ thuộc đồng bộ giữa các ô trên đường giao dịch, giúp cô lập lỗi, ổn định độ trễ và mở rộng bằng cách thêm ô.

Dữ liệu tham chiếu được sao chép trước vào từng ô, còn dữ liệu thay đổi theo giao dịch được định tuyến xác định đến nơi đang giữ trạng thái mới nhất. Global Transaction Router kiểm soát toàn bộ lưu lượng vào, ra và chuyển ô; sao chép cùng tổng hợp quan sát diễn ra bất đồng bộ ngoài đường quan trọng. Khi một ô lỗi trước điểm không thể quay lại, giao dịch được khởi động lại ở ô khỏe mạnh bằng dữ liệu ban đầu. Mã giao dịch duy nhất bảo đảm tính lũy đẳng, trong khi ghi nhật ký bất đồng bộ và cấu hình gần nhất giúp sự cố phụ trợ không chặn thanh toán.

**Điểm chính:**
- Ô được xác định bằng ranh giới sự cố, không phải một loại hạ tầng cụ thể.
- Dịch vụ và dữ liệu cục bộ loại bỏ bước mạng giữa các ô khỏi đường xử lý thanh toán.
- Bộ định tuyến toàn cục vừa chọn ô phù hợp vừa ngăn hình thành phụ thuộc chéo.
- Chuyển hướng an toàn cần điểm không thể quay lại rõ ràng và mã giao dịch lũy đẳng.
- Thà giảm khả năng quan sát còn hơn để nhật ký hoặc cấu hình làm gián đoạn giao dịch.

## [When failover isn’t safe: Building high-availability PostgreSQL on Kubernetes](https://www.datadoghq.com/blog/engineering/postgresql-ha-kubernetes/)

Một buổi diễn tập lỗi vùng cho thấy cụm PostgreSQL trên Kubernetes của Datadog không thể chuyển đổi dự phòng an toàn. Khi mạng chậm, máy chính vẫn ghi bất đồng bộ còn các máy dự phòng tụt quá xa. Patroni từ chối nâng cấp chúng vì vượt ngưỡng `maximum_lag_on_failover`, tránh mất dữ liệu nhưng khiến cụm không thể tự khôi phục ghi.

Datadog dùng mô hình lai: ứng viên chuyển đổi sao chép đồng bộ, còn bản sao chỉ đọc tiếp tục bất đồng bộ. Patroni và ZooKeeper điều phối bầu chọn; chế độ nghiêm ngặt với `synchronous_commit = remote_apply` chỉ xác nhận sau khi dữ liệu được áp dụng ở máy dự phòng. Kiểm chuẩn ghi nhận độ trễ tăng 53% và thông lượng giảm 34%, nhưng triển khai sản xuất theo từng giai đoạn không cho thấy ảnh hưởng đáng kể ở tầng ứng dụng. Khi không còn máy dự phòng đồng bộ, hệ thống chặn ghi thay vì âm thầm mất dữ liệu.

**Điểm chính:**
- Tính sẵn sàng bề ngoài không có giá trị nếu không tồn tại ứng viên chuyển đổi dự phòng an toàn.
- Chỉ máy dự phòng có dữ liệu đủ mới nên được Patroni cho phép trở thành máy chính.
- Sao chép đồng bộ nên áp dụng cho ứng viên chuyển đổi, không nhất thiết cho toàn bộ bản sao đọc.
- Chế độ nghiêm ngặt biến nguy cơ mất dữ liệu thành lỗi ghi rõ ràng để ứng dụng thử lại hoặc xếp hàng.
- Cần theo dõi thời gian chờ `SyncRep` và tình trạng máy dự phòng đồng bộ để cân bằng độ bền với hiệu năng.

## [From Christmas Outage to #1 App Store Ranking: An Aura Frames Postgres Scaling Retrospective](https://andyatkinson.com/postgresql-rds-scaling-aws-christmas-day-peak)

Giáng sinh 2024, PostgreSQL của Aura Frames ngừng ba giờ vì WAL tăng không giới hạn và lấp đầy ổ chuyên dụng. RDS PostgreSQL 14.1 dùng khe sao chép cho bản sao trong vùng; khi bản sao chậm, máy chính giữ lại WAL vô thời hạn. Nhóm khắc phục bằng cách giới hạn lượng WAL, ưu tiên làm hỏng bản sao thay vì để máy chính hết dung lượng.

Để chuẩn bị cho đỉnh tải 2025, Aura phân phối mười bảng ghi nhiều nhất sang bảy máy chính mới, tạo tám cơ sở dữ liệu tổng cộng. Ứng dụng Ruby on Rails vẫn là một khối thống nhất và định tuyến bằng Active Record Multiple Databases. Sao chép vật lý giúp chuyển dữ liệu đáng tin cậy với 5-10 phút gián đoạn; AWS Blue/Green được dùng sau cao điểm để thu nhỏ dung lượng. Tài nguyên CPU và bộ nhớ tăng khoảng 4,7 lần, giúp hệ thống đạt tổng đỉnh 226.000 giao dịch mỗi giây, duy trì hơn 100.000 trong mười giờ với thời gian truy vấn trung bình 25 micro giây.

**Điểm chính:**
- Khe sao chép phải có giới hạn WAL để bản sao chậm không làm sập máy chính.
- Phân phối nguyên bảng là phương án thực dụng khi chưa cần chia các hàng của bảng lớn nhất.
- Kiểm thử liên tục, phát hành thử nghiệm và kiểm thử tải giảm rủi ro khi sửa lớp truy cập dữ liệu.
- Tạm thời cấp dư CPU, bộ nhớ và IOPS có thể là lựa chọn hợp lý cho cao điểm dự đoán được.
- Sau cao điểm, triển khai Blue/Green giúp thu nhỏ hạ tầng và khôi phục hiệu quả chi phí.

## [.gitignore Isn’t the Only Way To Ignore Files in Git](https://nelson.cloud/.gitignore-isnt-the-only-way-to-ignore-files-in-git/)

Git hỗ trợ ba phạm vi quy tắc bỏ qua tệp. `.gitignore` được đưa vào kho mã nguồn nên phù hợp với tệp mà cả nhóm đều không muốn theo dõi. `.git/info/exclude` chỉ áp dụng cho một bản sao kho mã nguồn trên máy hiện tại, hữu ích với ghi chú hoặc công cụ riêng không nên xuất hiện trong `.gitignore` chung. `~/.config/git/ignore` áp dụng cho mọi kho trên máy, phù hợp với tệp do hệ điều hành hoặc trình soạn thảo tạo ra.

Có thể thay tệp bỏ qua toàn cục bằng `git config --global core.excludesFile ~/.gitignore_global` và quay lại mặc định bằng cách bỏ cấu hình này. Khi không rõ quy tắc nào đang có hiệu lực, `git check-ignore -v <tệp>` hiển thị đường dẫn tệp cấu hình, số dòng và mẫu đã khớp; nếu không có kết quả, tệp không bị bất kỳ quy tắc nào bỏ qua.

**Điểm chính:**
- Dùng `.gitignore` cho quy tắc cần chia sẻ và lưu cùng kho mã nguồn.
- Dùng `.git/info/exclude` cho ngoại lệ cá nhân chỉ thuộc một kho trên máy hiện tại.
- Dùng tệp bỏ qua toàn cục cho tệp phát sinh lặp lại trong mọi kho mã nguồn.
- `git check-ignore -v` là cách nhanh nhất để truy nguyên quy tắc đang bỏ qua một tệp.

## [The only scalable delete in Postgres is DROP TABLE](https://planetscale.com/blog/the-only-scalable-delete)

Trong PostgreSQL, xóa nhiều hàng không giải phóng dung lượng ngay mà tạo thêm công việc. MVCC giữ phiên bản chết để giao dịch đang chạy vẫn thấy dữ liệu phù hợp; autovacuum chỉ đánh dấu chỗ trống có thể tái sử dụng, còn chỉ mục và truy vấn vẫn phải xử lý hàng chết. Thao tác xóa cũng tạo WAL và phải sao chép, làm tăng độ trễ ghi, nợ dọn dẹp và độ trễ bản sao. `VACUUM FULL` trả dung lượng cho hệ điều hành nhưng cần khóa bảng tốn kém.

Ngược lại, `DROP TABLE` và `TRUNCATE` cần khóa `AccessExclusiveLock` nhưng chi phí gần như không phụ thuộc lượng dữ liệu. Chúng xóa tệp vật lý, không tạo hàng chết hoặc nợ dọn dẹp. Phân vùng theo thời gian biến nhiều lệnh `DELETE` thành thao tác bỏ cả phân vùng. Khi dọn dẹp một lần, có thể sao chép phần cần giữ sang bảng tạm, `TRUNCATE` rồi chèn lại; nếu không thể khóa lâu, hãy phản chiếu ghi sang bảng mới và đổi tên nguyên tử. Nếu phần cần giữ lớn hơn nhiều, xóa theo lô nhỏ vẫn thực tế.

**Điểm chính:**
- `DELETE` lớn tạo hàng chết, WAL và công việc bổ sung cho truy vấn, sao chép và autovacuum.
- `DROP TABLE` hoặc `TRUNCATE` giải phóng dung lượng ngay nhưng cần khóa độc quyền.
- Phân vùng theo thời gian là thiết kế phù hợp cho chính sách lưu giữ dữ liệu dài hạn.
- Sao chép phần cần giữ rồi xóa sạch bảng thường rẻ hơn xóa phần lớn từng hàng.
- Khi buộc phải dùng `DELETE`, các lô nhỏ giúp giao dịch ngắn và cho autovacuum thời gian bắt kịp.
