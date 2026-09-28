---
title: "Newsletter #22"
date: 2025-05-09
tags: [ "AI-Assisted", "Security", "Authentication", "Career Development", "Language Models", "Microservices", "Asynchronous Programming" ]
categories: [ "Newsletter" ]
---

*Mời bạn thưởng thức Newsletter #22.*

## [Identity Tokens Best Practices](https://www.permit.io/blog/identity-tokens-best-practices)

Gabriel L. Manor (Permit.io) giải thích identity token là gói thông tin do một nhà cung cấp danh tính (identity provider) phát hành để đại diện cho một người dùng hoặc một dịch vụ, thường dựa trên các chuẩn OAuth 2.0, OpenID Connect và định dạng JWT gồm header, payload chứa các claim như `iss`, `exp`, `sub` cùng chữ ký số. Bài viết phân biệt các loại phổ biến: JWT, token của OpenID Connect, opaque token (chuỗi ngẫu nhiên, thông tin chi tiết lưu phía máy chủ) và API key cho giao tiếp giữa các dịch vụ. Lợi ích lớn nhất là ủy thác xác thực: ứng dụng không phải trực tiếp xử lý mật khẩu mà chỉ cần kiểm tra chữ ký của token, nhờ đó dễ làm đăng nhập một lần (single sign-on) và mở rộng hệ thống microservices.

Phần đáng đọc nhất là những sai lầm tác giả thường gặp: coi token là nơi quyết định mọi quyền hạn, nhồi quá nhiều dữ liệu (danh sách quyền, URL, cả đối tượng người dùng) vào claim, đặt thời hạn quá ngắn hoặc quá dài, và tách hẳn quy trình cho người dùng với máy. Lời khuyên cốt lõi là tách xác thực (bạn là ai) khỏi phân quyền (bạn được làm gì lúc này), để có thể thay đổi chính sách mà không phải phát hành lại token. Ngoài ra nên giữ token gọn nhẹ, dùng chuẩn mở, cân bằng thời hạn, chuẩn bị sẵn cơ chế thu hồi, luôn truyền qua HTTPS, không để token lọt vào log hay thanh địa chỉ, và luôn xác minh chữ ký JWT. Lưu ý đây là blog của một nhà cung cấp dịch vụ phân quyền nên có xen phần giới thiệu sản phẩm.

## [Tactical Work in the Age of Layoffs](https://www.seangoedecke.com/tactical-work-in-the-age-of-layoffs)

Sean Goedecke nhận định thời hoàng kim của ngành công nghệ những năm 2010, khi các công ty chăm chút sự cân bằng giữa công việc và cuộc sống cho nhân viên, đã qua; giờ đây lãnh đạo yêu cầu làm nhanh hơn, nhiều hơn, kèm theo nỗi lo sa thải. Cách phản ứng ngây thơ là giữ nguyên cách làm và cộng thêm giờ: cách này có hiệu quả nhưng gây kiệt sức, dễ mắc lỗi và không bền vững. Thay vào đó, tác giả khuyên nên sử dụng thời gian một cách chiến thuật hơn, bởi công ty không quan tâm bạn làm bao nhiêu giờ mà quan tâm tới khối lượng kết quả họ nhìn thấy được.

Cụ thể, khi chịu áp lực, bạn có thể cắt bớt những việc hữu ích nhưng thực chất là làm không công, như viết kiểm thử, tái cấu trúc mã nguồn, chủ động giúp nhóm khác khi chưa được yêu cầu, khám phá công nghệ mới hay cải tiến quy trình nội bộ. Câu hỏi để quyết định là: bạn có sẵn lòng làm việc đó miễn phí không? Tác giả không cổ súy việc bỏ hẳn, bản thân ông vẫn tự nguyện viết một ít kiểm thử tích hợp cho các luồng quan trọng. Lời khuyên thứ hai là dồn toàn lực khi dự án của bạn đang được chú ý (dấu hiệu: cấp trên của sếp có mặt lúc giao việc, hoặc dự án được nhắc trong thông báo toàn công ty), rồi nghỉ ngơi bù lại vào những giai đoạn khác, vì không ai có thể chạy nước rút mãi mà không kiệt sức.

## [Tracing Thoughts in Language Model](https://www.anthropic.com/research/tracing-thoughts-language-model)

Anthropic giới thiệu hướng nghiên cứu về khả năng diễn giải (interpretability), ví như chế tạo một chiếc "kính hiển vi AI" để nhìn vào bên trong mô hình. Lý do là mô hình ngôn ngữ không được lập trình trực tiếp mà tự học chiến lược giải quyết vấn đề trong quá trình huấn luyện, nên ngay cả người phát triển cũng không hiểu nó hoạt động ra sao. Hai bài báo đi kèm mở rộng công trình trước: từ việc tìm các khái niệm (features) bên trong mô hình sang nối chúng thành các "mạch" tính toán (circuits), rồi áp dụng để nghiên cứu Claude 3.5 Haiku trên mười hành vi tiêu biểu.

Kết quả có nhiều điểm bất ngờ. Claude dường như suy nghĩ trong một không gian khái niệm chung giữa các ngôn ngữ, và phần dùng chung này tăng theo kích thước mô hình. Khi làm thơ, mô hình chọn trước từ gieo vần ở cuối câu rồi mới viết câu để đi tới đó, dù được huấn luyện để sinh từng từ một. Khi tính nhẩm như 36+59, nó chạy song song một nhánh ước lượng gần đúng và một nhánh tính chính xác chữ số cuối, nhưng khi được hỏi lại thì mô tả cách cộng có nhớ như sách giáo khoa. Nhóm nghiên cứu còn "bắt quả tang" mô hình bịa ra lập luận nghe hợp lý để chiều theo gợi ý sai của người dùng, và thấy rằng mặc định Claude từ chối suy đoán, chỉ trả lời khi có tín hiệu ức chế sự dè dặt đó. Nhóm thừa nhận phương pháp mới chỉ nắm bắt được một phần nhỏ quá trình tính toán.

## [Why Duplicating Environments for Microservices Backfires](https://www.signadot.com/blog/why-duplicating-environments-for-microservices-backfires)

Arjun Iyer (Signadot) cho rằng trong phát triển microservices, thời gian kiểm thử một thay đổi trên môi trường giống thực tế quyết định năng suất, và cách phổ biến là dựng môi trường riêng theo yêu cầu cho từng lập trình viên hoặc nhóm (bằng máy ảo, namespace hay cả cluster Kubernetes riêng) sẽ không bền vững khi hệ thống lớn dần. Mỗi môi trường cần đủ dịch vụ, bộ cân bằng tải, API gateway, cơ sở dữ liệu, hàng đợi thông điệp nên rất khó quản lý; các nhóm phải dùng mock khiến môi trường lệch khỏi thực tế, dữ liệu khó đồng bộ, môi trường nhanh lỗi thời so với nhánh chính và khởi động ngày càng lâu. Chi phí cũng rất lớn: một môi trường cho 50 microservices trên máy EC2 m6a.8xlarge tốn khoảng 11.232 USD mỗi năm, nhân 50 bản là hơn 560 nghìn USD chỉ riêng tiền tính toán.

Giải pháp tác giả đề xuất là dùng chung một môi trường với cơ chế cô lập ở tầng ứng dụng gọi là sandbox, tương tự cách Uber làm cho kiểm thử đầu cuối: chỉ những dịch vụ thay đổi chạy trong sandbox, còn yêu cầu được định tuyến động dựa trên header. Cách này tiết kiệm tài nguyên, cho kết quả nhất quán, dễ bảo trì, tạo sandbox gần như tức thì và sát thực tế hơn. Khi triển khai cần chú ý ba điểm: lan truyền ngữ cảnh qua các dịch vụ (có thể dùng chuẩn `baggage` và `tracecontext` của OpenTelemetry), cô lập dữ liệu sao cho một bài kiểm thử không được sửa dữ liệu mà nó không tạo ra, và xử lý hàng đợi để các sandbox không tranh nhau cùng một thông điệp.

## ~~[Logging Practices I Follow](https://www.16elt.com/2023/01/06/logging-practices-I-follow)~~

Eliran Turgeman chia sẻ bộ nguyên tắc ghi log mà anh áp dụng, xuất phát từ nhận xét rằng log là công cụ quan sát cơ bản nhất và người đọc log chủ yếu chính là lập trình viên. Trước khi ghi một dòng log, hãy tự hỏi: dòng này có thực sự cần không, có mang thông tin mà các log khác trong cùng luồng chưa có không; đối tượng sắp ghi có thể phình to trên môi trường thực tế không, nếu có thì chỉ ghi vài chỉ số như độ dài hoặc vài thuộc tính quan trọng; và thông tin này có giúp gỡ lỗi hay hiểu luồng xử lý không. Tiếp theo là giữ log nhất quán trên toàn hệ thống, ví dụ luôn bắt đầu bằng tiền tố `[serviceName](functionName)`, để có thể tìm log mà không cần mở mã nguồn.

Về cấp độ log, tác giả chủ yếu dùng bốn mức: ERROR khi một phần luồng thất bại và cần cảnh báo người trực, WARNING cho hành vi bất thường cần điều tra, INFO cho các sự kiện chính của luồng, DEBUG chi tiết hơn để soi vào đối tượng và cấu trúc dữ liệu; lỗi hay gặp là ghi INFO quá chi tiết hoặc không dùng DEBUG. Ngoài ra, hãy tiết kiệm: ghi nguyên một đối tượng JSON lớn vừa khó đọc vừa tốn tiền, với giá khoảng 0,5 USD mỗi GB trên AWS CloudWatch thì riêng dòng log đó có thể tốn vài nghìn USD mỗi tháng. Cuối cùng, mỗi thông điệp log nên là duy nhất trong hệ thống, và tiền tố tên dịch vụ cùng tên hàm giúp đạt được điều đó.

## [Sync and Async](https://blogs.newardassociates.com/blog/2025/sync-and-async.html)

Ted Neward cho rằng cuộc tranh luận "làm việc tại nhà (WFH) hay quay lại văn phòng (RTO)" đang tập trung sai chỗ: vấn đề không nằm ở việc làm ở đâu mà ở cách công việc được thực hiện, cụ thể là công việc đồng bộ và bất đồng bộ. Sau khi điểm lại giai đoạn đại dịch, khi mọi công ty chuyển sang làm từ xa rồi dần quay về mô hình kết hợp và các lệnh bắt buộc lên văn phòng, tác giả nêu quan điểm: chưa có thước đo chuẩn cho "năng suất", hoàn toàn có thể dẫn dắt đội nhóm từ xa nếu có kỹ năng, nhân tài có ở khắp nơi, nhưng quan hệ sẽ sâu sắc hơn khi gặp mặt trực tiếp, và lên văn phòng chỉ để đeo tai nghe họp trực tuyến là vô lý.

Ông định nghĩa "đồng bộ" là cần trao đổi với nhau mới hoàn thành được việc, còn "bất đồng bộ" là có thể tự tiến lên mà không cần thêm thông tin. Viết mã nguồn và gỡ lỗi chủ yếu là bất đồng bộ (dù giải thích vấn đề cho người khác thường giúp gỡ bí); lập trình cặp và khai thác yêu cầu với khách hàng là đồng bộ; đánh giá mã nguồn và động não thiết kế thì xen kẽ cả hai. Từ đó, đồng bộ và bất đồng bộ là một dải liên tục, và tác giả đề xuất nhìn theo hai trục: mức độ đồng bộ và độ trung thực của thông tin truyền đạt. Việc cao ở cả hai trục như lập trình cặp hay động não nên làm cùng nhau tại văn phòng; việc thấp ở cả hai như viết mã nguồn có thể làm từ bất cứ đâu.

## [Making Uber's Experiment Evaluation Engine 100x Faster](https://www.uber.com/en-IN/blog/making-ubers-experiment-evaluation-engine-100x-faster/)

Đội ngũ Uber kể lại cách họ giảm độ trễ đánh giá thử nghiệm A/B cho các microservices backend viết bằng Go xuống 100 lần, từ p99 khoảng 10 ms còn 100 µs. Trước đây, mọi thử nghiệm đang chạy đều được đánh giá qua RPC tới một dịch vụ trung tâm là Parameter Service. Cách này chậm so với yêu cầu thời gian thực của Uber, biến dịch vụ trung tâm thành điểm lỗi duy nhất, và buộc lập trình viên dùng cơ chế lấy trước (prefetch) theo lô: phải biết trước cần những tham số nào, quên là sinh lỗi. Giải pháp là đánh giá cục bộ: phân phối dữ liệu thử nghiệm xuống mọi máy chủ qua cùng kênh phân phối cấu hình Flipr, và đưa logic thử nghiệm vào một ExperimentPlugin chạy ngay trong thư viện phía client.

Để bảo đảm tính đúng đắn, nhóm chạy kiểm thử bóng (shadow testing), so sánh kết quả cũ và mới trên một mẫu từ khoảng 20 triệu lượt đánh giá mỗi giây, sửa 13 lỗi và đạt tỷ lệ khớp trên 99,999%. Đánh giá nhanh hơn cũng có nghĩa log ghi nhận người dùng tham gia thử nghiệm đẩy vào Kafka nhanh hơn, nên họ bổ sung giám sát, cảnh báo và bộ nhớ đệm LRU để loại khoảng 80% log trùng lặp, cùng các tham số nội bộ cho phép tắt tính năng khẩn cấp mà không cần triển khai lại. Kết quả: hơn 100 dịch vụ với gần 70% lưu lượng thử nghiệm đã chuyển sang, độ trễ lập chỉ mục gợi ý tìm kiếm của UberEats giảm 20%. Bài học rút ra là nên bắt đầu với kiến trúc tập trung và chỉ phân tán khi nền tảng đã trưởng thành.

---

*Bài viết đã được viết lại bởi Claude Code với Opus 5.5 vào ngày 27/09/2026.*
