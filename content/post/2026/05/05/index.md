---
title: "Newsletter #102"
date: 2026-05-05
tags: ["AI-Assisted", "AI Agents", "GitHub Actions", "Software Engineering", "Database", "System Design", "Productivity"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #102.*

## [A GitHub agentic workflow](https://blog.frankel.ch/agentic-github-workflows/)

Nicolas Fränkel chia sẻ trải nghiệm thực tế với GitHub agentic workflow, loại workflow có điểm đặc biệt là chạy một AI agent bên trong. Tác giả làm việc trên một sản phẩm lâu năm với nhiều phiên bản, kèm công cụ phân tích giúp khách hàng biết trước các vấn đề khi nâng cấp. Tệp cấu hình của công cụ này vốn được một đồng nghiệp tổng hợp thủ công từ release notes. Một phần thông tin deprecate có trong mã nguồn qua annotation như `@Deprecated`, nhưng việc deprecate plugin chỉ nằm trong release notes, loại văn bản không có cấu trúc cố định mà tự động hóa xác định truyền thống không xử lý được. Đây chính là chỗ agent phát huy thế mạnh.

Quy trình gồm bốn bước: khởi tạo bằng `gh aw init` hoặc qua giao diện GitHub; viết workflow bằng Markdown (tác giả dùng Copilot CLI hỗ trợ); "biên dịch" sang YAML bằng `gh aw compile`; rồi chạy như workflow thường với fine-grained token `GITHUB_COPILOT_TOKEN` có quyền "Copilot requests". Các lỗi tác giả gặp gồm: quên biên dịch nên chỉ đẩy tệp Markdown lên; thử tạo workflow tự động biên dịch nhưng vướng quyền hạn và nhận ra đó là ý tưởng rủi ro về bảo mật; cuối cùng chọn workflow biên dịch lại để kiểm tra, báo lỗi nếu khác tệp YAML hiện có, kèm `.gitattributes` để xử lý khác biệt xuống dòng giữa Windows và Ubuntu. Agentic workflow cũng không cho dùng action từ GitHub Marketplace. Theo tác giả, nó không thay thế các workflow xác định, nhưng mở ra trường hợp sử dụng mới như phân tích release notes, việc mà regex khó làm được.

## [The 20 Software Engineering Laws](https://newsletter.techworld-with-milan.com/p/the-20-software-engineering-laws)

Dr Milan Milanović tổng hợp 20 định luật kỹ thuật phần mềm ông hay nhắc đến nhất, giúp lý giải vì sao dự án thất bại, hệ thống xuống cấp và đội ngũ chậm lại. Nhiều định luật có tuổi đời hàng chục năm nhưng vẫn đúng, vì chúng nói về con người cùng xây dựng sản phẩm dưới áp lực thời gian chứ không phải về công nghệ cụ thể. Chúng không phải quy tắc bắt buộc: chúng mô tả điều đang xảy ra, còn quyết định vẫn thuộc về người kỹ sư.

Các định luật chia thành nhiều nhóm: cách hệ thống được xây dựng (Gall's Law, KISS, Conway's Law, Hyrum's Law, CAP Theorem, Zawinski's Law), động lực đội ngũ (Brooks's Law, Ringelmann Effect, Price's Law), lập kế hoạch và ước lượng (Dunning-Kruger Effect, Hofstadter's Law, Parkinson's Law), đo lường (Goodhart's Law, Gilb's Law), hiệu năng và độ tin cậy (Knuth's Optimization Principle, Amdahl's Law, Murphy's Law) và triết lý thiết kế (Postel's Law, Sturgeon's Law, Cunningham's Law). Ví dụ minh họa gồm Instagram thành công sau khi cắt gọt Burbn chỉ còn chia sẻ ảnh, còn Google Wave ôm quá nhiều tính năng và biến mất sau 15 tháng; sân bay Berlin Brandenburg dự kiến 18 tháng nhưng kéo dài 7 năm (Hofstadter's Law); hay sự cố CrowdStrike năm 2024 làm 8,5 triệu máy Windows gặp lỗi (Murphy's Law). Hiểu các định luật trước khi vấn đề xảy ra giúp tránh sai lầm tốn kém; vì đôi khi chúng mâu thuẫn nhau, cần phán đoán để chọn định luật phù hợp và tự xây dựng danh sách mô hình đã quan sát được.

## [Databases Were Not Designed For This](https://arpitbhayani.me/blogs/defensive-databases/)

Arpit Bhayani chỉ ra rằng mọi thiết kế database đều dựa trên một "hợp đồng ngầm": bên gọi là ứng dụng do con người viết, chạy mã nguồn xác định, truy vấn được review trước khi triển khai, thao tác ghi có chủ đích và kết nối ngắn. Hợp đồng này đứng vững bốn mươi năm, nhưng AI agent phá vỡ nó ở mọi tầng. Agent tự suy luận ra truy vấn chưa từng xuất hiện, ghi dữ liệu tự động, ghi lặp khi thử lại, giữ kết nối trong lúc chờ LLM suy luận và tách ra nhiều sub-agent chạy song song. Một sự cố điển hình: API trả về HTTP 200 với kết quả rỗng do connection pool phía sau cạn kiệt, agent hiểu "không có dữ liệu" là "không có vấn đề" và duyệt tiếp 500 giao dịch mà không cảnh báo nào được kích hoạt.

Giải pháp là thiết kế database theo hướng phòng thủ: đặt statement timeout ở cấp role (ví dụ 5 giây); dùng soft delete với cột `deleted_by` để truy vết agent nào đã xóa gì; dùng bảng event log chỉ ghi thêm (append-only) cho dữ liệu nhạy cảm; bắt buộc idempotency key sinh từ mã tác vụ, loại thao tác và đối tượng đích để thử lại không tạo bản ghi trùng; tách connection pool riêng cho agent với thời gian chờ ngắn để thất bại nhanh. Bài viết còn đề cập PgBouncer transaction pooling, gắn comment chứa ID agent và tác vụ vào truy vấn để giám sát, và mỗi loại agent một role với quyền tối thiểu. Thông điệp chính: đây không phải công cụ mới, mà là best practice nay trở thành hạ tầng bắt buộc khi agent gọi database.

## [Finishing Things](https://ratfactor.com/finishing-things)

Đây là bài luận cá nhân của tác giả blog ratfactor về chuyện hoàn thành dự án cá nhân giữa những biến động của cuộc sống. Tác giả từng đặt kế hoạch lớn theo năm như "The Year of the Microcontroller" (2023) hay "The Year of Try It" (2024), nhưng khó khăn riêng và yếu tố bên ngoài khiến chúng đổ vỡ, nên quyết định thôi lập kế hoạch lớn. Thứ hiệu quả là một "project stack": mỗi ý tưởng được ghi lên một mẩu Post-It nhỏ và đặt vào khung trưng bày, thường gần đỉnh, và tác giả chỉ làm mục trên cùng. Cách xếp chồng này biến mê cung "side quest" phát sinh thành một đường thẳng dễ theo dõi thay vì danh sách việc cần làm rối rắm.

Tác giả ví việc duy trì thói quen và dự án như màn xoay đĩa: khi biến cố ập đến, nhiều đĩa rơi cùng lúc. Lời khuyên là giữ ít nhất một đĩa còn quay vì duy trì dễ hơn bắt đầu lại; kỹ năng cũng cần luyện đều để không mai một. Bài viết đưa ra khái niệm "sphere of control", phạm vi kiểm soát co giãn theo hoàn cảnh: làm tốt mọi việc trong phạm vi đó thì không cần tự trách, và có những trở ngại chỉ là sự khó chịu, như ngại gọi điện đặt lịch hẹn. Tác giả cũng nói về cảm giác hư vô khi các công ty AI thu gom sáng tạo của con người, và chọn phớt lờ để tiếp tục sáng tạo. Kết luận: tiến bộ chậm mà đều đặn mới giúp hoàn thành công việc, nên tác giả chỉ đặt ra một "năm của tiến bộ chậm và bền bỉ" thay vì mục tiêu cụ thể.

### Bonus

**Images:**
![Data Warehouse vs Data Lake vs Data Mesh](https://substackcdn.com/image/fetch/$s_!9kS2!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F71595c9b-f94f-4ae8-851e-ea4f07342c29_2484x3002.png)
![API Concepts Every Software Engineer Should Know](https://substackcdn.com/image/fetch/$s_!U4gw!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8e8297aa-f856-4b2b-af5d-986023db89e7_2508x3000.png)
![Polling vs Long Polling vs Webhooks vs SSE](https://substackcdn.com/image/fetch/$s_!SAsk!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F7616a6b1-8eb6-4dc3-9456-b0e57bc9b0ee_2484x3002.png)
![SLA vs SLO vs SLI](https://substackcdn.com/image/fetch/$s_!SJN6!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F47ce48f1-06e7-4663-b822-96cc7d1307d0_2484x3002.png)

---

*Bài viết đã được viết lại bởi Claude Code với Opus 5.5 vào ngày 27/09/2026.*
