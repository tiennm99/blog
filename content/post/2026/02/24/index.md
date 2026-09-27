---
title: "Newsletter #83"
date: 2026-02-24
tags: ["AI-Assisted", "Newsletter", "Data Engineering", "PostgreSQL", "AI Agents", "Prompt Engineering", "Software Engineering"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #83.*

## [How Uber Scaled Data Replication to Move Petabytes Every Day](https://www.uber.com/en-IN/blog/scaled-data-replication/)

Uber chia sẻ cách đội ngũ kỹ sư mở rộng HiveSync, dịch vụ sao chép dữ liệu giữa các vùng dựa trên Apache Hadoop Distcp, để theo kịp một kho dữ liệu (data lake) vượt quá 350 PB. Chỉ trong quý 3 năm 2022, lượng dữ liệu cần sao chép mỗi ngày tăng từ 250 TB lên 1 PB, số bộ dữ liệu do HiveSync quản lý tăng từ 30.000 lên 144.000 và số tác vụ sao chép hằng ngày vọt từ 10.000 lên 374.000. Nguyên nhân đến từ kiến trúc chủ động - bị động dồn khoảng 90% lượng ghi vào vùng chính, việc đưa toàn bộ dữ liệu Hive vào HiveSync và kế hoạch chuyển lên đám mây. Với tải như vậy, các mục tiêu độ trễ sao chép (P100 dưới 4 giờ, P99.9 dưới 20 phút) không còn đạt được.

Để giải quyết, Uber thực hiện bốn cải tiến trên Distcp. Thứ nhất, chuyển hai bước tốn tài nguyên là Copy Listing và Input Splitting từ máy chủ HiveSync sang Application Master, giảm 90% độ trễ gửi tác vụ. Thứ hai, xử lý song song Copy Listing bằng nhiều luồng gọi namenode, giảm 60% độ trễ p99 và 75% độ trễ tối đa. Thứ ba, ghép tệp song song trong Copy Committer, cắt 97,29% thời gian ghép. Cuối cùng, tính năng "Uber jobs" chạy trực tiếp các tác vụ chỉ có một mapper (chiếm 52% khối lượng) ngay trong JVM của Application Master, loại bỏ khoảng 268.000 lần khởi chạy container mỗi ngày trên YARN. Kết quả là năng lực sao chép dữ liệu gia tăng tăng gấp 5 lần trong một năm và hơn 306 PB dữ liệu đã được chuyển thành công lên đám mây.

## [How to write a good spec for AI agents](https://addyosmani.com/blog/good-spec/)

Addy Osmani đưa ra một khung làm việc để viết đặc tả (spec) cho các tác nhân lập trình AI, giải quyết bài toán quen thuộc: đặc tả phải đủ chi tiết để dẫn hướng AI nhưng không quá dài đến mức làm quá tải cửa sổ ngữ cảnh. Nguyên tắc đầu tiên là bắt đầu từ tầm nhìn cấp cao, nêu mục tiêu ngắn gọn rồi để tác nhân tự mở rộng thành kế hoạch chi tiết. Nguyên tắc thứ hai là cấu trúc đặc tả như một tài liệu yêu cầu sản phẩm (PRD) bao phủ sáu vùng: lệnh chạy, kiểm thử, cấu trúc dự án, phong cách mã nguồn, quy trình Git và các giới hạn. GitHub phân tích hơn 2.500 tệp cấu hình tác nhân và nhận thấy lỗi phổ biến nhất là viết quá mơ hồ.

Nguyên tắc thứ ba là chia nhiệm vụ thành các lời nhắc nhỏ theo mô-đun thay vì một lời nhắc khổng lồ, vì hiện tượng "lời nguyền của chỉ dẫn" khiến chất lượng giảm rõ rệt khi mô hình phải tuân theo quá nhiều yêu cầu cùng lúc. Nguyên tắc thứ tư là tích hợp kiểm soát chất lượng: ranh giới ba tầng "Luôn làm", "Hỏi trước" và "Không bao giờ làm", cùng các bước tự kiểm tra. Cuối cùng, coi đặc tả là tài liệu sống, kiểm thử thường xuyên và cập nhật khi yêu cầu thay đổi. Bài viết cũng cảnh báo các bẫy như yêu cầu mơ hồ kiểu "làm gì đó thật hay", nhồi ngữ cảnh mà không tóm tắt, bỏ qua bước con người xem xét mã nguồn, và làm nhanh hơn khả năng kiểm chứng của chính mình.

## [Unconventional PostgreSQL Optimizations](https://hakibenita.com/postgresql-unconventional-optimizations)

Haki Benita giới thiệu ba kỹ thuật tối ưu PostgreSQL ít người nghĩ tới. Kỹ thuật đầu tiên là bật `constraint_exclusion` để cơ sở dữ liệu dùng ràng buộc kiểm tra (check constraint) loại bỏ cả một lượt quét bảng. Khi người dùng lỡ viết điều kiện mâu thuẫn với ràng buộc, ví dụ `plan = 'Pro'` thay vì `'pro'`, PostgreSQL mặc định vẫn quét toàn bộ bảng (khoảng 627 ms trong ví dụ), còn khi bật tùy chọn này thì truy vấn trả về gần như tức thì. Tùy chọn mặc định chỉ áp dụng cho bảng phân vùng vì tốn thêm chi phí lập kế hoạch, nên phù hợp nhất với môi trường báo cáo nơi người dùng tự viết truy vấn.

Kỹ thuật thứ hai là lập chỉ mục trên biểu thức có ít giá trị khác nhau hơn: thay vì chỉ mục B-Tree trên toàn bộ cột timestamp (214 MB), chỉ mục trên phần ngày qua `date_trunc` chỉ còn 66 MB, nhỏ hơn 3 lần và truy vấn cũng nhanh hơn. Điểm yếu là mọi người phải viết đúng biểu thức mới dùng được chỉ mục, nên tác giả đề xuất kết hợp với cột sinh ảo (virtual generated column) của PostgreSQL 18. Kỹ thuật thứ ba là đảm bảo tính duy nhất cho giá trị lớn như URL bằng chỉ mục băm: PostgreSQL không cho tạo chỉ mục băm duy nhất, nhưng có thể dùng ràng buộc loại trừ (exclusion constraint) trên chỉ mục băm, giúp giảm kích thước từ 154 MB (B-Tree) xuống 32 MB, nhỏ hơn 5 lần. Đổi lại, ràng buộc này không thể được khóa ngoại tham chiếu và không hỗ trợ `ON CONFLICT DO UPDATE`.

## [Software engineering when machine writes the code](https://www.shayon.dev/post/2026/19/software-engineering-when-the-machine-writes-code/)

Shayon Mukherjee suy ngẫm về nghề kỹ thuật phần mềm khi máy móc viết phần lớn mã nguồn. Ông không phản đối công cụ AI, nhưng lo rằng khi chạy theo năng suất, chúng ta đánh đổi sự hiểu biết sâu về hệ thống. Theo nghịch lý Jevons, khi một tài nguyên được dùng hiệu quả hơn thì tổng lượng tiêu thụ lại tăng; tương tự, AI sẽ không khiến ta viết ít mã hơn mà giúp xây dựng những hệ thống ngày càng phức tạp, nhanh hơn tốc độ con người kịp hiểu chúng. Tác giả phân biệt việc tự viết mã, nơi ta hình thành mô hình tư duy qua hàng loạt quyết định nhỏ, với việc xem xét mã do AI sinh ra, nơi ta chỉ tái dựng lại hiểu biết sau khi mọi thứ đã xong. Chấp nhận mã chạy được mà không thật sự hiểu sẽ tạo ra điểm mù khi gỡ lỗi và bảo trì.

Ông đặc biệt lo cho kỹ sư mới vào nghề: nếu bỏ qua giai đoạn vật lộn tự triển khai, mắc lỗi và gỡ lỗi hàng giờ, họ khó hình thành khả năng nhận diện mẫu và trực giác vốn chỉ có được qua trải nghiệm. Giải pháp được đề xuất là dùng AI như một người thầy theo phương pháp Socrates để giải thích khái niệm và các đánh đổi rồi tự tay triển khai. Ông cũng đưa ra mô hình phân vùng: logic nghiệp vụ cốt lõi cần được hiểu thật kỹ và hạn chế dùng AI, mã tiêu chuẩn có thể nhờ AI nhiều hơn, còn mã khuôn mẫu (boilerplate) có thể giao gần như hoàn toàn cho AI.
## [A Guide to Effective Prompt Engineering](https://blog.bytebytego.com/p/a-guide-to-effective-prompt-engineering)

ByteByteGo trình bày hướng dẫn về kỹ thuật viết prompt (prompt engineering), tức cách soạn chỉ dẫn để mô hình ngôn ngữ trả về kết quả mong muốn. Ai cũng viết được prompt, nhưng viết prompt cho kết quả tốt ổn định là kỹ năng khác. Một prompt thường gồm bốn phần: mô tả nhiệm vụ, ngữ cảnh nền, ví dụ minh họa và yêu cầu cụ thể. Các API hiện đại còn tách thành system prompt (hướng dẫn hành vi) và user prompt (nhiệm vụ thực tế). Sự rõ ràng là yếu tố quan trọng nhất: nói chính xác điều mình muốn, định nghĩa định dạng đầu ra và không mặc định rằng mô hình đã biết; cung cấp đủ ngữ cảnh cũng giúp giảm ảo giác. Bài viết nhắc đến khả năng học trong ngữ cảnh từ ví dụ ngay trong prompt, và lưu ý mô hình thường tiếp thu chỉ dẫn ở đầu và cuối prompt tốt hơn phần giữa.

Năm kỹ thuật chính được giới thiệu gồm: zero-shot, đưa chỉ dẫn không kèm ví dụ, phù hợp với tác vụ đơn giản; few-shot, cung cấp từ hai đến năm ví dụ để minh họa hành vi và định dạng mong muốn; chain-of-thought, yêu cầu mô hình suy luận từng bước để tăng độ chính xác với bài toán phức tạp; role prompting, gán vai trò để định hướng góc nhìn và văn phong; và prompt chaining, chia nhiệm vụ lớn thành chuỗi prompt nhỏ dễ bảo trì hơn. Về thực hành, nên lặp lại thử nghiệm, quản lý phiên bản prompt và kiểm thử với nhiều loại đầu vào kể cả trường hợp biên; tránh chỉ dẫn mơ hồ, prompt quá rườm rà hoặc bỏ quên cấu trúc đầu ra.

---

*Bài viết đã được viết lại bởi Claude Code với Opus 5.5 vào ngày 27/09/2026.*
