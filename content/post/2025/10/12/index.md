---
title: "Newsletter #60"
date: 2025-10-12
tags: ["AI-Assisted", "Technology", "Go", "Diff Algorithm", "Algorithms", "Performance"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #60.*

## [Diff Algorithms](https://flo.znkr.io/diff)

Thư viện diff mới được phát triển bằng Go mà tác giả giới thiệu trong bài viết hỗ trợ xử lý chuỗi tùy ý và định dạng đầu ra kiểu unified. Thư viện này thực hiện thuật toán Myers với tiền xử lý, các giải thuật heuristic và hậu xử lý nhằm cân bằng giữa hiệu suất và tính dễ đọc. Các tính năng chính bao gồm hỗ trợ các loại dữ liệu có thể so sánh và không thể so sánh, kết quả có cấu trúc và hành vi có thể tùy chỉnh thông qua các tùy chọn hàm số.

Tác giả nhấn mạnh rằng "các cách cài đặt khác nhau cho cùng một thuật toán có thể tạo ra kết quả rất khác biệt" và tính dễ đọc của kết quả diff phụ thuộc rất nhiều vào các bước hậu xử lý như heuristics thụt lề của Michael Haggerty.

**Điểm chính:**
- Thư viện diff mới cho phép xử lý chuỗi tùy ý với đầu ra định dạng unified
- Sử dụng thuật toán Myers với các bước tối ưu hóa để cân bằng hiệu suất và khả năng đọc
- Hỗ trợ cả kiểu dữ liệu có thể và không thể so sánh, cho phép tùy chỉnh thông qua các tùy chọn hàm số
- Tính dễ đọc của diff phụ thuộc lớn vào các kỹ thuật hậu xử lý như các thuật toán heuristic

## [Periodic Table of System Design Principles](https://github.com/jarulraj/periodic-table)

Repository GitHub này trình bày một "bảng tuần hoàn" các nguyên tắc thiết kế hệ thống định kỳ. Mục tiêu là cung cấp một từ vựng ngắn gọn, chia sẻ để hiểu và thảo luận về các lựa chọn thiết kế trong các lĩnh vực khác nhau của hệ thống máy tính. Repository chứa một bộ sưu tập gồm hơn 40 nguyên tắc thiết kế mục đích chung được tổ chức thành các nhóm theo chủ đề như Cấu trúc, Hiệu quả, Ngữ nghĩa, v.v. Mỗi nguyên tắc có một ký hiệu ngắn để tham khảo nhanh chóng và tập trung vào "ý định thiết kế" thay vì các cơ chế cụ thể.

**Điểm chính:**
- Bộ sưu tập gồm hơn 40 nguyên tắc thiết kế hệ thống mục đích chung
- Các nguyên tắc được tổ chức thành các nhóm theo chủ đề (Cấu trúc, Hiệu quả, Ngữ nghĩa, v.v.)
- Mỗi nguyên tắc có ký hiệu ngắn để tham khảo nhanh
- Tập trung vào "ý định thiết kế" thay vì các cơ chế cụ thể
- Ví dụ được lấy từ các bài báo có ảnh hưởng trong các lĩnh vực hệ thống

## [Building a Resilient Data Platform with Write-Ahead Log at Netflix](https://netflixtechblog.com/building-a-resilient-data-platform-with-write-ahead-log-at-netflix-127b6712359a)

Bài viết từ Netflix Tech Blog về việc xây dựng một nền tảng dữ liệu có độ bền cao bằng cách sử dụng kỹ thuật Write-Ahead Log (WAL). Netflix chia sẻ cách họ thiết kế và triển khai hệ thống WAL để đảm bảo tính toàn vẹn và độ tin cậy của dữ liệu trong môi trường phân tán quy mô lớn.

**Điểm chính:**
- Sử dụng Write-Ahead Log để đảm bảo tính nhất quán và độ bền của dữ liệu
- Thiết kế hệ thống chịu lỗi cao để xử lý các trường hợp lỗi phần cứng và mạng
- Tối ưu hóa hiệu suất cho các tác vụ đọc/ghi dữ liệu quy mô lớn
- Giải pháp mở rộng theo chiều ngang để đáp ứng nhu cầu tăng trưởng dữ liệu

## [Vercel vs Cloudflare: Two Philosophies of Building for Developers](https://www.bharath.sh/writing/vercel-vs-cloudflare)

Bài viết so sánh hai nền tảng phát triển web hàng đầu - Vercel và Cloudflare, với hai triết lý khác nhau trong việc phục vụ các nhà phát triển. Vercel, xuất phát từ nền tảng frontend và thiết kế, tập trung vào trải nghiệm phát triển liền mạch và tối ưu hóa tốc độ. Trong khi đó, Cloudflare với nền tảng hạ tầng của mình, nhấn mạnh vào tính minh bạch, kiểm soát và độ tin cậy.

**Điểm chính:**
- Vercel tập trung vào "tốc độ sáng tạo" và trải nghiệm liền mạch, trừu tượng hóa sự phức tạp
- Cloudflare cung cấp khả năng kiểm soát chi tiết và hiệu quả về chi phí, phù hợp với các nhà phát triển quan tâm đến hạ tầng
- Mỗi nền tảng có cách tiếp cận phù hợp với mô hình kinh doanh của họ
- Cả hai nền tảng đang hội tụ khi đối mặt với các yêu cầu mới về điện toán biên và AI
- Cả hai đều đang cạnh tranh để giành được sự quan tâm của cộng đồng nhà phát triển

## [90%](https://lucumr.pocoo.org/2025/9/29/90-percent/)

Armin Ronacher chia sẻ rằng khoảng 90% mã code cho một dự án hạ tầng gần đây tại công ty mới của ông được tạo ra bởi AI. Ông nhấn mạnh rằng mặc dù AI đóng vai trò lớn, ông vẫn giữ trách nhiệm về kiến trúc, độ tin cậy và chất lượng mã code cuối cùng. Bài viết đề cập đến việc sử dụng các công cụ như Claude và Codex để tạo code, ưa thích SQL thô hơn là ORMs và sử dụng thiết kế OpenAPI-first. AI giúp tăng tốc nghiên cứu, tái cấu trúc và thiết lập hạ tầng. Tuy nhiên, bất chấp tính hữu ích của nó, AI có thể tạo ra mã code kém chất lượng nếu không được hướng dẫn cẩn thận; sự giám sát của con người là điều cần thiết. Cách tiếp cận này cho phép thử nghiệm nhanh hơn và hệ thống tốt hơn được tổ chức.

**Điểm chính:**
- AI được sử dụng rộng rãi để tạo code, đặc biệt với các công cụ như Claude và Codex
- Ưa thích SQL thô hơn là ORMs và sử dụng thiết kế OpenAPI-first
- AI giúp tăng tốc nghiên cứu, tái cấu trúc và thiết lập hạ tầng
- Mặc dù hữu ích, AI có thể tạo ra code kém nếu không có hướng dẫn cẩn thận; cần giám sát của con người
- Cách tiếp cận này cho phép thử nghiệm nhanh hơn và hệ thống tốt hơn được tổ chức
- Code được tạo bởi AI đã trở thành hiện thực cho nhiều lập trình viên, nhưng cần phán đoán lành nghề để vẫn hiệu quả và an toàn

## [Distracting Software Engineers Is Way More Harmful Than Most Managers Think](https://workweave.dev/blog/distracting-software-engineers-is-more-harmful-than-managers-think-even-in-the-ai-times)

Bài viết nhấn mạnh rằng việc làm gián đoạn các kỹ sư phần mềm gây ra tác hại lớn hơn nhiều so với những gì hầu hết các nhà quản lý nghĩ. Các kỹ sư phần mềm cần sự tập trung sâu sắc để giải quyết các vấn đề phức tạp, và những lần gián đoạn có thể dẫn đến sai sót, giảm sản lượng và kéo dài thời gian thực hiện dự án. Bài viết lập luận rằng nhiều nhà quản lý đánh giá thấp tác động của việc gián đoạn liên tục, chẳng hạn như các cuộc họp và tin nhắn, đối với hiệu quả của nhóm. Bài viết đề xuất thực hiện các khoảng thời gian làm việc tập trung và giảm thiểu những sự phân tâm không cần thiết để cải thiện cả chất lượng mã và hiệu suất của nhóm.

**Điểm chính:**
- Kỹ sư phần mềm cần sự tập trung sâu để giải quyết các vấn đề phức tạp
- Gián đoạn có thể dẫn đến sai sót, giảm sản lượng và kéo dài thời gian thực hiện dự án
- Nhiều nhà quản lý đánh giá thấp tác động của việc gián đoạn liên tục đến hiệu quả nhóm
- Cần triển khai các khoảng thời gian làm việc tập trung và giảm thiểu sự phân tâm
- Cải thiện chất lượng mã và hiệu suất nhóm bằng cách giảm gián đoạn

## [Common Problems Managing Senior Engineers](https://emdiary.substack.com/p/common-problems-managing-senior-engineers)

Bài viết xác định bốn kiểu kỹ sư cấp cao đầy thử thách và cách huấn luyện họ:

1. **Người Over-Engineer**: Xây dựng các giải pháp quá phức tạp. Quản lý nên đưa họ quay lại giá trị khách hàng và yêu cầu hồ sơ quyết định.

2. **Người Builder-First**: Nhảy vào thực hiện mà không thiết kế. Quản lý nên khuyến khích thiết kế trước và so khớp mẫu.

3. **Người Ambiguity-Freezer**: Vật lộn với các vấn đề mơ hồ. Quản lý nên huấn luyện họ xác định rõ ràng và đảo ngược vấn đề.

4. **Người Soloist**: Tránh giao việc. Quản lý nên giúp họ nghĩ theo luồng công việc song song và xây dựng niềm tin với đồng đội.

Thông điệp chính là các kỹ sư cấp cao cần huấn luyện, không phải kiểm soát chi tiết, để vượt qua điểm mù và phát triển. Như tác giả nói, "Họ không cần kiểm soát chi tiết, họ cần huấn luyện."

**Điểm chính:**
- Xác định bốn kiểu kỹ sư cấp cao đầy thử thách và cách tiếp cận phù hợp cho từng kiểu
- Các kỹ sư cấp cao thường cần huấn luyện để vượt qua điểm mù thay vì bị kiểm soát chi tiết
- Mỗi kiểu cần cách tiếp cận quản lý khác nhau để phát huy tối đa tiềm năng
- Vấn đề không phải ở năng lực mà ở cách tiếp cận và thói quen làm việc
- Huấn luyện hiệu quả giúp các kỹ sư cấp cao phát triển và đóng góp tốt hơn

## [Career Advice, or Something Like It](https://brooker.co.za/blog/2025/06/20/career.html)

Bài viết khuyên tránh các "buồng vang tiêu cực" nơi việc than vãn trở thành bản sắc chung. Mặc dù thừa nhận rằng một số thái độ tiêu cực là bình thường, tác giả cảnh báo rằng sự bi quan thái quá gây hại cả cho sự phát triển sự nghiệp và sức khỏe tinh thần. Thay vào đó, hãy tập trung vào các cộng đồng tích cực và những người truyền cảm hứng cho bạn. Hãy tham gia vào công việc có ý nghĩa, dành thời gian với người thân yêu và bảo vệ cộng đồng của bạn bằng cách thể hiện hành vi mang tính xây dựng. Sự thay đổi thực sự đến không phải từ việc xả giận mà từ hành động trực tiếp và hợp tác.

**Điểm chính:**
- Tránh những nơi mà việc phàn nàn là hoạt động chính
- Duy trì sự tích cực mà không trở nên ngây thơ
- Bảo vệ sức khỏe tinh thần và sự nghiệp bằng cách lựa chọn cộng đồng một cách thông minh
- "Làm điều này thật khó về mặt xã hội. Ít nhất thì nó đòi hỏi phải trực tiếp thể hiện hình mẫu của điều tốt đẹp"
- Dành năng lượng cho việc cải thiện hoặc rút lui, chứ không phải sự bi quan

## [My Productivity Rules](https://www.16elt.com/2025/10/08/studying-while-busy/)

Bài viết trình bày các mẹo thực tế để nâng cao hiệu suất học tập, nhấn mạnh vào việc lập kế hoạch, quản lý năng lượng, trung thực về nỗ lực, xem xét hàng ngày và giảm thiểu sự phân tâm. Bài viết cung cấp các quy tắc như chuẩn bị ngày mới vào buổi tối trước, nghỉ ngơi khi năng lượng thấp, trung thực về mức độ nỗ lực thực sự, phản chiếu lại tiến độ hàng ngày và loại bỏ các yếu tố gây xao nhãng như điện thoại hay các ứng dụng hấp dẫn.

**Điểm chính:**
- Lập kế hoạch ngày mới vào buổi tối trước để tránh tình trạng trì hoãn buổi sáng
- Phối hợp cường độ học tập với mức năng lượng trong ngày
- Trung thực về mức độ nỗ lực thực sự mà bạn bỏ ra
- Phản chiếu lại tiến độ hàng ngày để cải thiện kế hoạch trong tương lai
- Loại bỏ các yếu tố gây xao nhãng bằng cách giữ các ứng dụng hấp dẫn ngoài tầm nhìn

## Bonus: Vài ảnh thú vị đến từ [ByteByteGo](https://bytebytego.com/)
*Nay mình đã gặp phải một số vấn đề khá phiền vì đã lưu quá nhiều ảnh sưu tầm trong bài viết. Cụ thể là mình mất hơn 17p để build site này khi dùng một máy tính khác :v*
```
...
                   | VI
-------------------+------
  Pages            | 587
  Paginator pages  | 130
  Non-page files   | 195
  Static files     |   2
  Processed images | 361
  Aliases          | 236
  Cleaned          |   0

Built in 1043990 ms
...
```
*Nên mình quyết định đổi sang sử dụng url gốc thay vì thêm hình vào repo. Điểm yếu là có thể ảnh sẽ bị gỡ, và không được xử lý để giảm kích thước, làm tăng thời gian load lên. Mình sẽ cố gắng update lại các ảnh trong các post trước đây luôn (vào một ngày nào đó đẹp trời và mình siêng năng :3)*

![TCP vs UDP](https://substackcdn.com/image/fetch/$s_!KwvJ!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8ac50da4-feb8-4781-8bb2-e74244aa889f_2250x2814.png)
