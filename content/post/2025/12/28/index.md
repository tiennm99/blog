---
title: "Newsletter #75"
date: 2025-12-28
tags: ["AI-Assisted", "Newsletter", "System Design", "Microservices", "Linux", "Load Balancing", "High Availability"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #75.*

## [Front-End vs. Back-End vs. System Design – What's the Difference in Interviews?](https://designgurus.substack.com/p/front-end-vs-back-end-vs-system-design)

Ba vòng phỏng vấn front-end, back-end và system design đánh giá những bộ kỹ năng rất khác nhau, vì vậy mỗi vòng cần một chiến lược chuẩn bị riêng. Phỏng vấn front-end xoay quanh phía client: HTML, CSS, JavaScript và thường là một framework như React. Vòng này ít đặt nặng thuật toán phức tạp mà nghiêng về kiến thức chuyên môn như thiết kế responsive, độ ưu tiên của CSS, cách trình duyệt hiển thị trang, JavaScript bất đồng bộ hay tối ưu thời gian tải. Phỏng vấn back-end mang tính truyền thống hơn: cấu trúc dữ liệu, thuật toán kiểu LeetCode kèm phân tích độ phức tạp, cộng thêm kiến thức về API, cơ sở dữ liệu (SQL và NoSQL, chỉ mục, thiết kế schema), bộ nhớ đệm và hàng đợi thông điệp. Phỏng vấn system design thì nhìn toàn cảnh, kiểm tra khả năng thiết kế một hệ thống thực tế từ đầu sao cho mở rộng được, tin cậy và dễ bảo trì.

Tác giả dùng phép so sánh với việc xây nhà: front-end giống thiết kế nội thất (các phòng trông và tạo cảm giác ra sao), back-end giống kết cấu và móng (ngôi nhà có đứng vững và vận hành tốt không), còn system design giống vai trò kiến trúc sư của cả khu dân cư, quyết định vị trí nhà cửa, đường sá và tiện ích. Để chuẩn bị cho front-end, nên tự làm vài dự án nhỏ, ôn lại kiến thức nền về trình duyệt và HTTP. Với back-end, việc luyện thuật toán và nắm vững cơ sở dữ liệu vẫn là trọng tâm.

## [Why Starting with Microservices Can Be Your Biggest Architectural Mistake](https://designgurus.substack.com/p/why-starting-with-microservices-can)

Tác giả khuyên dự án nhỏ bắt đầu bằng monolith để giảm chi phí vận hành. Tách dịch vụ sớm khiến lời gọi nội bộ thành giao tiếp qua mạng, cần xử lý lỗi, thử lại và thời gian chờ. Khi dữ liệu thuộc các dịch vụ riêng, việc kết hợp dữ liệu cũng phức tạp hơn. Không nên hiểu đây là lệnh cấm mọi phép JOIN hay yêu cầu mỗi dịch vụ phải có một máy chủ riêng.

Một lựa chọn là monolith chia mô-đun, với ranh giới và giao diện rõ ràng trong cùng ứng dụng. Chỉ cân nhắc tách khi có nhu cầu thực tế về tổ chức đội ngũ, mở rộng riêng hoặc công nghệ. Con số 100 kỹ sư là ví dụ của tác giả, không phải ngưỡng kiến trúc bắt buộc. Tái cấu trúc vẫn cần thiết kế và kiểm thử, dù ứng dụng chưa phân tán.

## [The Linux kernel is just a program](https://serversfor.dev/linux-inside-out/the-linux-kernel-is-just-a-program/)

Bài viết giải mã Linux kernel, thứ vốn bị xem như một "hộp đen" bí ẩn, thông qua các thí nghiệm thực tế. Kernel về bản chất cung cấp một lớp trừu tượng để dùng phần cứng một cách thuận tiện và an toàn: API thống nhất để tương tác với phần cứng, quản lý cách chương trình dùng CPU, bộ nhớ và tài nguyên, kiểm soát quyền truy cập. Phép so sánh gần nhất là kernel chính là một "runtime" cho máy tính. Trên hầu hết bản phân phối, kernel chỉ là một tệp nén vài MB như `vmlinuz-…` nằm trong thư mục `/boot`.

Tác giả sao chép tệp đó ra và chạy bằng QEMU; kernel khởi động trong khoảng 2 giây rồi panic vì không tìm thấy root filesystem để giao quyền cho chương trình init, và đây là hành vi đúng. Tiếp theo, tác giả viết một chương trình init đơn giản bằng Go, đóng gói nó vào một initramfs tối giản rồi khởi động lại. Lần này kernel chạy chương trình Go với PID 1. Từ thí nghiệm, người đọc rút ra nhiều khái niệm quan trọng: bản phân phối Linux chỉ là kernel cộng các chương trình và tệp cấu hình; process là chương trình đang thực thi; PID là mã định danh của process; init là process đầu tiên, có nhiệm vụ khởi động các chương trình khác; và init là chương trình chạy ở không gian người dùng đầu tiên trong thí nghiệm. Ranh giới với không gian kernel vẫn tồn tại khi chương trình gọi hệ thống. Cách tiếp cận thực hành này giúp xây dựng mô hình tư duy về cách Linux vận hành.

## [Why Your Load Balancer is the Bottleneck (and How to Fix It)](https://designgurus.substack.com/p/dont-let-your-load-balancer-crash)

Hệ thống phân tán có một nghịch lý: bạn thêm load balancer để phân phối lưu lượng đều cho các máy chủ ứng dụng, nhưng khi sản phẩm tăng trưởng mạnh, chính nó lại trở thành nút thắt. Máy chủ ứng dụng vẫn chạy ổn, cơ sở dữ liệu còn nhàn rỗi, vậy mà người dùng vẫn than trang chậm hoặc không truy cập được. Theo tác giả, đây là điểm phân biệt lập trình viên junior với kiến trúc sư senior: nhiều người biết cách thêm load balancer, nhưng rất ít người biết phải làm gì khi chính nó là vấn đề. Bài viết giải thích vì sao điều này xảy ra và giới thiệu năm chiến lược mở rộng mà các công ty công nghệ lớn áp dụng.

Một số chiến lược được nêu gồm: DNS Round Robin để chia lưu lượng ngay từ tầng DNS, lựa chọn giữa định tuyến Layer 4 và Layer 7 để giảm khối lượng xử lý, và Direct Server Return (DSR) cho phép phản hồi từ máy chủ đi thẳng tới client mà không quay lại load balancer. Mỗi cách đều có đánh đổi: DNS Round Robin đơn giản nhưng thay đổi lan truyền chậm, Layer 4 thường xử lý ít thông tin hơn Layer 7, còn hiệu năng phụ thuộc triển khai và tải, còn DSR tiết kiệm băng thông nhưng đòi hỏi cấu hình mạng phức tạp. Nắm vững các chiến lược này giúp tầng load balancer mở rộng theo chiều ngang cùng các máy chủ ứng dụng thay vì trở thành điểm nghẽn duy nhất.

## [The High Availability Blueprint: Designing Systems That Never Sleep](https://designgurus.substack.com/p/the-high-availability-blueprint-designing)

High Availability (HA) là cách xây dựng hệ thống "không bao giờ ngủ" trên nền phần cứng chắc chắn sẽ hỏng. HA không chỉ là ngăn sự cố mà còn là che giấu nó để người dùng không hề hay biết. Độ sẵn sàng được đo bằng "số số 9": 99% tương đương khoảng 3,65 ngày ngừng hoạt động mỗi năm, 99,9% khoảng 8,76 giờ, còn 99,999% chỉ khoảng 5 phút; mỗi số 9 thêm vào đòi hỏi kiểm soát sự cố chặt chẽ hơn, thường làm tăng chi phí. Triết lý cốt lõi là "giả định mọi thứ sẽ hỏng và lên kế hoạch cho điều đó". Kẻ thù lớn nhất là Single Point of Failure (SPOF), tức bất kỳ thành phần nào mà khi hỏng sẽ kéo cả hệ thống ngừng theo, và lời giải là dự phòng (redundancy): nhân đôi các thành phần quan trọng.

Các kỹ thuật chính gồm: load balancer kèm health check để tự động loại máy chủ hỏng khỏi vòng phân phối; sao chép cơ sở dữ liệu theo mô hình Leader-Follower, Follower được nâng lên làm Leader khi có sự cố; và chiến lược failover với hai dạng. Active-Passive đơn giản nhưng lãng phí vì máy dự phòng gần như luôn nhàn rỗi. Active-Active tận dụng hết phần cứng nhưng phức tạp hơn, và trong ví dụ hai máy, mỗi máy cần đủ sức nhận tải khi máy kia hỏng. Bên cạnh đó, rate limiting (trả về HTTP 429 khi vượt ngưỡng) giúp ngăn lỗi dây chuyền khi lưu lượng tăng đột biến. Phân tán địa lý giúp chịu thảm họa cục bộ, nhưng riêng việc đặt máy ở nhiều vùng không bảo đảm năm số 9. Thông điệp: luôn cần phương án dự phòng.

## Bonus

### Images

![Common Network Protocols Every Engineer Should Know](https://substackcdn.com/image/fetch/$s_!ETm5!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F2112a03d-cc48-4db5-9740-94adc1a7efbf_2360x2920.png)
![8 Popular Network Protocols](https://substackcdn.com/image/fetch/$s_!5bFA!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F722913d5-a10f-44c2-98ed-edc27a92a137_1444x1882.jpeg)
![9 best practices for developing microservices](https://substackcdn.com/image/fetch/$s_!pen8!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F22fdf2d2-5ce5-4c2b-90f9-3bcfcecb5fc1_1370x1536.jpeg)

---

*Bài viết đã được viết lại bởi Claude Code với Opus 5.5 vào ngày 27/09/2026; được review và chỉnh sửa bởi Codex với GPT 6.1 Sol vào ngày 09/11/2026.*
