---
title: "Newsletter #76"
date: 2026-01-05
tags: ["AI-Assisted", "Newsletter", "Networking", "gRPC", "Software Engineering", "AI", "Career"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #76.*

## [TCP vs. UDP vs. gRPC: Choosing the Right Protocol for Your Architecture](https://designgurus.substack.com/p/an-engineers-guide-to-basic-networking)

TCP và UDP là giao thức tầng vận chuyển. TCP cung cấp luồng byte có thứ tự và cơ chế truyền lại, nhưng kết nối vẫn có thể thất bại; nó không bảo đảm ứng dụng xử lý thành công mọi dữ liệu. UDP gửi các datagram mà không tự bảo đảm giao nhận hay thứ tự. Ứng dụng có thể bổ sung độ tin cậy phía trên UDP, như QUIC. Chọn giao thức cần cân nhắc yêu cầu và điều kiện mạng, thay vì đồng nhất UDP với nhanh và TCP với chậm.

Bài còn giới thiệu HTTP/2 ghép nhiều luồng trên một kết nối TCP, HTTP/3 chạy trên QUIC, và WebSocket cho giao tiếp hai chiều liên tục. HTTP/3 có thể giảm ảnh hưởng mất gói giữa các luồng, không bảo đảm mọi trang đều nhanh hơn. WebSocket vẫn có phần đầu khung dữ liệu; nó giảm việc lặp lại thông tin HTTP, không loại bỏ mọi chi phí giao thức.

## [Software Engineering in 2026](https://benjamincongdon.me/blog/2025/12/29/Software-Engineering-in-2026/)

Trong bài viết cuối năm 2025, Ben Congdon dự đoán LLM làm giảm chi phí tạo mã nguồn và chuyển nút thắt sang vận hành, kiểm chứng và rà soát. Đây là nhận định của tác giả, không phải kết quả đo năng suất cho mọi đội. Ông đề xuất hạ tầng tự phục vụ cho cả người lẫn tác nhân, với giao diện dòng lệnh hoặc API dễ sử dụng.

Khi lượng mã tăng, CI cần nhanh và đáng tin; ranh giới mô-đun cùng hợp đồng rõ ràng giúp hạn chế nợ kỹ thuật. Người rà soát nên tập trung vào thay đổi giao diện, lưu trữ dữ liệu và hiệu năng, giao vấn đề phong cách cho công cụ tự động. Ông cũng dự đoán một số ứng dụng CRUD sẽ đáng tự xây hơn, trong khi chi phí vận hành và tuân thủ vẫn có thể khiến việc mua dịch vụ hợp lý.

## [Reflections on 2025](https://samuelalbanie.substack.com/p/reflections-on-2025)

Samuel Albanie nhìn lại năm 2025 qua sức mạnh tính toán, đánh giá AI và khả năng ra quyết định tại Anh. Từ trải nghiệm nghiên cứu thị giác máy tính, ông ủng hộ việc mở rộng tính toán và huấn luyện thay cho quá nhiều thiết kế thủ công. Đây là góc nhìn của tác giả về xu hướng, không phải bảo đảm rằng thêm phần cứng giải quyết được mọi bài toán.

Về đánh giá, ông dẫn METR: mốc thời lượng tác vụ ở mức thành công 50% tăng từ khoảng năm phút đầu 2024 lên bốn giờ 49 phút cuối 2025, với khoảng tin cậy rộng. Thời lượng được quy đổi theo người có kỹ năng trên tập tác vụ phần mềm, không phải số giờ mô hình luôn làm việc độc lập thành công. Phần cuối bàn về trì trệ kinh tế và hạ tầng Anh, cùng hy vọng AI giúp dự báo và quyết định tốt hơn, kết hợp táo bạo với thận trọng.

## [8 Predictions for 2026. What comes next in AI?](https://www.philschmid.de/2026-predictions)

Cuối năm 2025, Philipp Schmid đưa ra tám dự đoán cho năm 2026: giao diện sinh theo nhu cầu, tác nhân cá nhân chạy trên thiết bị, nhà thông minh hiểu ngữ cảnh, và cạnh tranh giữa các môi trường điều phối tác nhân. Ông cho rằng kỹ sư sẽ dành nhiều thời gian hơn để định hướng, đánh giá và rà soát. Con số 99% là dự đoán của ông, không phải số liệu nghề nghiệp.

Ba dự đoán về mạng xã hội gồm nội dung con người trở nên có giá hơn, chữ ký xác thực nguồn gốc và đăng nhập chứng minh người thật bằng sinh trắc học. “Human-Signed” được nêu như viễn cảnh tương lai, không phải chuẩn đã được mọi nền tảng áp dụng. Tác giả vẫn khuyến khích học lập trình, tìm hiểu sâu cách hệ thống hoạt động và tự xây sản phẩm để phát triển trực giác kỹ thuật.

---

*Bài viết đã được viết lại bởi Claude Code với Opus 5.5 vào ngày 27/09/2026; được review và chỉnh sửa bởi Codex với GPT 6.1 Sol vào ngày 09/11/2026.*
