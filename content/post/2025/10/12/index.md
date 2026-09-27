---
title: "Newsletter #60"
date: 2025-10-12
tags: ["AI-Assisted", "Technology", "Go", "Diff Algorithm", "Algorithms", "Performance"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #60.*

## [Diff Algorithms](https://flo.znkr.io/diff/)

Florian Zenker giới thiệu znkr.io/diff, một thư viện so sánh khác biệt (diff) viết bằng Go mà anh tự xây dựng vì các thư viện sẵn có chưa đáp ứng được nhu cầu. Thư viện làm việc được với slice bất kỳ lẫn văn bản, trả về cả kết quả có cấu trúc lẫn định dạng unified quen thuộc. Thuật toán lõi là Myers với độ phức tạp O(ND), được chọn vì chạy được cả với những kiểu dữ liệu không so sánh được bằng toán tử, không cần đến bảng băm. API gồm `Edits()`/`Hunks()` cho kiểu so sánh được, `EditsFunc()`/`HunksFunc()` cho kiểu tùy ý kèm hàm so sánh riêng, và gói `textdiff` cho định dạng unified.

Phần đáng đọc nhất là cách tác giả tối ưu. Bước tiền xử lý cắt bỏ phần đầu và phần cuối chung, loại các phần tử chỉ xuất hiện ở một phía, giúp giảm thời gian chạy tới 99% trong trường hợp xấu nhất. Kỹ thuật neo lấy cảm hứng từ patience diff tìm các phần tử chỉ xuất hiện đúng một lần để chia đầu vào thành những đoạn nhỏ, giảm thêm tới 95%. Bước hậu xử lý dùng heuristic thụt lề của Michael Haggerty để kết quả dễ đọc hơn. Thư viện có ba chế độ: mặc định (cân bằng), nhanh (hy sinh độ tối giản) và tối giản (kết quả ngắn nhất bất kể chi phí). Bài học tác giả rút ra là "các cách cài đặt khác nhau cho cùng một thuật toán có thể tạo ra kết quả rất khác biệt": chất lượng một bản diff phụ thuộc nhiều vào chi tiết cài đặt và hậu xử lý chứ không chỉ vào việc chọn thuật toán nào.

## [Building a Resilient Data Platform with Write-Ahead Log at Netflix](https://netflixtechblog.com/building-a-resilient-data-platform-with-write-ahead-log-at-netflix-127b6712359a)

Đội nền tảng dữ liệu của Netflix kể lại vì sao họ xây dựng một lớp trừu tượng Write-Ahead Log (WAL) dùng chung. Ở quy mô của Netflix, những sự cố như mất hoặc hỏng dữ liệu, dữ liệu lệch nhau giữa các kho lưu trữ (ví dụ ghi đồng thời vào Cassandra và Elasticsearch), cập nhật trên nhiều phân vùng, sao chép dữ liệu giữa các vùng hay thử lại thông điệp lỗi trong đường ống dữ liệu thời gian thực đều từng gây sự cố hoặc buộc các nhóm tự viết giải pháp riêng. WAL ra đời để mọi ứng dụng quan trọng đều có được mức bảo vệ đó: nó ghi nhận thay đổi dữ liệu, đảm bảo độ bền và chuyển các thay đổi đến hệ thống phía sau một cách tin cậy.

API được giữ rất đơn giản với một điểm cuối duy nhất là `WriteToLog`. Mỗi namespace quy định dữ liệu được lưu ở đâu (Kafka, SQS hoặc kết hợp) cùng các thiết lập như số lần thử lại, và tùy cấu hình mà WAL đóng các vai trò khác nhau: hàng đợi trì hoãn dựa trên SQS để thử lại thông điệp lỗi mà không làm giảm thông lượng, sao chép EVCache sang nhiều vùng dựa trên Kafka, và xử lý các thao tác ghi trải trên nhiều phân vùng của lớp Key-Value theo cơ chế cam kết hai pha. Bên trong, phần sinh thông điệp và phần tiêu thụ được tách riêng để có thể thay thế linh hoạt, mỗi namespace có sẵn một hàng đợi thư chết (DLQ) để xử lý lỗi, và WAL đảm bảo ngữ nghĩa giao ít nhất một lần. Nhóm dùng lớp Key-Value chỉ cần bật một cờ là có toàn bộ các khả năng này.

## [Vercel vs Cloudflare: Two Philosophies of Building for Developers](https://bharath.sh/writing/vercel-vs-cloudflare)

Bài viết so sánh Vercel và Cloudflare như hai triết lý khác nhau trong việc phục vụ lập trình viên, bắt nguồn từ xuất thân và mô hình kinh doanh của mỗi bên. Vercel đi lên từ văn hóa phát triển frontend nên đặt trải nghiệm và năng suất lên hàng đầu: hạ tầng gần như vô hình, việc triển khai mang cảm giác "kỳ diệu" và bảng điều khiển được làm tối giản để bớt vướng víu. Cloudflare xuất phát từ hạ tầng mạng nên coi trọng sự kiểm soát và minh bạch, với bảng điều khiển phơi bày đầy đủ các chỉ số kỹ thuật. Tác giả tóm gọn rằng Vercel tối ưu cho sự tự tin của người dùng, còn Cloudflare bán những cam kết.

Sự khác biệt này khớp với cách hai công ty kiếm tiền. Vercel thu lợi từ tốc độ phát triển: khuyến khích lập trình viên làm nhanh rồi nâng dần lên các gói trả phí. Cloudflare thì kiếm tiền từ chính quy mô, tức lượng sử dụng, băng thông và tài nguyên tính toán duy trì lâu dài. Mỗi bên nhìn đối thủ theo góc tiêu cực: Cloudflare cho rằng Vercel che giấu chi phí thật, còn Vercel thấy Cloudflare phức tạp không cần thiết, nhưng cả hai cách tiếp cận đều hợp lý trong phạm vi của mình. Khi điện toán biên và các khối lượng công việc AI phát triển, hai nền tảng đang dần hội tụ, cùng cố gắng mang lại trải nghiệm phát triển tốt đi kèm hạ tầng mạnh mẽ.

## [Distracting Software Engineers Is Way More Harmful Than Most Managers Think](https://workweave.dev/blog/distracting-software-engineers-is-more-harmful-than-managers-think-even-in-the-ai-times)

Bài viết lập luận rằng việc làm gián đoạn kỹ sư phần mềm gây hại nhiều hơn hẳn so với suy nghĩ của phần lớn nhà quản lý, và tình trạng này càng tệ hơn khi làm việc từ xa trở nên phổ biến sau COVID. Tác giả dẫn nhiều số liệu: số cuộc họp trên mỗi nhân viên tăng 13,5% kể từ năm 2020, họp trực tuyến tăng 60%, 92% người làm việc khác trong lúc họp, và một nghiên cứu tại Meta cho thấy kỹ sư chỉ có khoảng hai phiên tập trung dài một giờ mỗi tuần. Để vào được trạng thái tập trung cao độ (flow) cần khoảng 45 phút, và mỗi lần bị cắt ngang là bộ đếm đó quay về số không. Những việc như rà soát mã nguồn hay sửa lỗi lẽ ra cần tập trung sâu nhưng lại thường bị làm vội giữa các cuộc họp. Theo tác giả, ngay cả khi đã có công cụ lập trình bằng AI, sự tập trung vẫn giúp mắc ít lỗi hơn và kỹ năng tiến bộ nhanh hơn.

Các giải pháp được đề xuất gồm: gom cuộc họp vào những khung giờ cố định, luôn có chương trình họp rõ ràng và chỉ mời người thật sự cần thiết; bỏ bớt các cuộc họp định kỳ, như nhóm kỹ sư của Pylon giữ lịch trống và chỉ phối hợp khi có việc; cân nhắc lại quy định bắt buộc rà soát chéo, tin tưởng để kỹ sư giỏi đưa thay đổi trực tiếp; và nhà quản lý phải tự làm gương trong việc bảo vệ thời gian tập trung. Tác giả cho rằng kỹ sư cần 4–5 giờ không bị làm phiền mỗi ngày để làm ra sản phẩm chất lượng.

## [Common Problems Managing Senior Engineers](https://emdiary.substack.com/p/common-problems-managing-senior-engineers)

Bài viết mô tả bốn kiểu kỹ sư cấp cao thường khiến người quản lý đau đầu và cách huấn luyện từng kiểu. Người Over-Engineer thích những giải pháp phức tạp quá mức cần thiết; quản lý nên kéo họ về với giá trị thực tế bằng câu hỏi "cách đơn giản nhất có thể chạy được là gì?", yêu cầu viết hồ sơ quyết định ghi rõ các phương án và đánh đổi và đặt giới hạn về thời gian hay ngân sách. Người Builder-First lao vào viết mã ngay mà không thiết kế trước; cần cho họ thấy bản thiết kế chưa hoàn chỉnh vẫn được chấp nhận, rằng thiết kế giúp đánh giá tính khả thi, ước lượng thời gian và phối hợp với nhóm, và có thể tận dụng các mẫu quen thuộc từ dự án cũ. Người Ambiguity-Freezer bị "đóng băng" khi yêu cầu còn mơ hồ; hãy hướng dẫn họ đặt câu hỏi làm rõ về các bên liên quan, chỉ số và tiêu chí thành công, rồi áp dụng tư duy đảo ngược: xác định điều gì khiến dự án thất bại rồi làm ngược lại. Người Soloist ngại giao việc vì nghĩ tự làm thì nhanh hơn; cần dạy họ lập kế hoạch theo các luồng công việc song song, cho thấy giao việc giúp họ dành thời gian cho những việc có tác động lớn hơn, và tạo cơ hội lập trình cặp để xây dựng niềm tin với đồng đội.

Thông điệp chung là vấn đề của những kỹ sư này nằm ở thói quen và điểm mù chứ không phải năng lực. Như tác giả nói, "Họ không cần kiểm soát chi tiết, họ cần huấn luyện."

## [Career Advice, or Something Like It](https://brooker.co.za/blog/2025/06/20/career.html)

Marc Brooker khuyên nên tránh xa những "buồng vang tiêu cực", nơi than phiền trở thành bản sắc chung của cả nhóm. Những cộng đồng như vậy tạo cảm giác gắn kết nhưng về lâu dài gây hại cho cả sự nghiệp lẫn sức khỏe tinh thần; bản thân tác giả tự đặt giới hạn và rời đi khi khoảng 20% nội dung mang tính tiêu cực. Ông cho rằng mỗi người nên chủ động chọn một trong hai hướng: hoặc tập trung phát triển sự nghiệp bằng cách nhìn vào điều tích cực và những gì có thể cải thiện, hoặc giữ nguyên vị trí hiện tại và dồn năng lượng cho các phần khác của cuộc sống, thay vì mắc kẹt trong sự bi quan.

Thay cho những nơi chỉ toàn lời than vãn, hãy dành thời gian cho các không gian theo tinh thần "đồng ý, và thêm nữa", cùng những người đang làm công việc đáng ngưỡng mộ và sống cuộc sống mà bạn mong muốn. Cộng đồng có thể xuống cấp khi sự tiêu cực chiếm ưu thế, nên việc bảo vệ nó đòi hỏi phải làm gương, chia sẻ góc nhìn mang tính xây dựng và đôi khi phải điều tiết thảo luận; tác giả thừa nhận "làm điều này thật khó về mặt xã hội. Ít nhất thì nó đòi hỏi phải trực tiếp thể hiện hình mẫu của điều tốt đẹp". Theo ông, nỗi buồn và sự tức giận hiếm khi tạo ra thay đổi thực sự, chỉ hành động cụ thể mới làm được điều đó.

## ~~[My Productivity Rules](https://www.16elt.com/2025/10/08/studying-while-busy/)~~

~~Bài viết trình bày các mẹo thực tế để nâng cao hiệu suất học tập, nhấn mạnh vào việc lập kế hoạch, quản lý năng lượng, trung thực về nỗ lực, xem xét hàng ngày và giảm thiểu sự phân tâm. Bài viết cung cấp các quy tắc như chuẩn bị ngày mới vào buổi tối trước, nghỉ ngơi khi năng lượng thấp, trung thực về mức độ nỗ lực thực sự, phản chiếu lại tiến độ hàng ngày và loại bỏ các yếu tố gây xao nhãng như điện thoại hay các ứng dụng hấp dẫn.~~

~~**Điểm chính:**~~
~~- Lập kế hoạch ngày mới vào buổi tối trước để tránh tình trạng trì hoãn buổi sáng~~
~~- Phối hợp cường độ học tập với mức năng lượng trong ngày~~
~~- Trung thực về mức độ nỗ lực thực sự mà bạn bỏ ra~~
~~- Phản chiếu lại tiến độ hàng ngày để cải thiện kế hoạch trong tương lai~~
~~- Loại bỏ các yếu tố gây xao nhãng bằng cách giữ các ứng dụng hấp dẫn ngoài tầm nhìn~~

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

---

*Bài viết đã được viết lại bởi Claude Code với Opus 5.5 vào ngày 27/09/2026.*
