---
title: "Newsletter #18"
date: 2025-05-05
tags: [ "AI-Assisted", "Development", "Git", "UI", "AI", "DevOps" ]
categories: [ "Newsletter" ]
---

*Mời bạn thưởng thức Newsletter #18.*

## [No Longer My Favorite Git Commit](https://mtlynch.io/no-longer-my-favorite-git-commit/)

Michael Lynch nhìn lại commit từng được David Thompson ca ngợi trong bài "My favourite Git commit": một thông điệp commit dài sáu đoạn văn kèm năm đoạn mã, kể tỉ mỉ quá trình gỡ lỗi chỉ để mô tả việc thay một ký tự khoảng trắng. Tác giả thừa nhận thông điệp này có giá trị vì dễ tìm kiếm và cho thấy cách người viết điều tra lỗi, nhưng chỉ ra ba điểm yếu: thông tin quan trọng nhất bị đẩy xuống cuối, nguyên nhân gốc chưa bao giờ được giải thích rõ, và các tham chiếu tới mã nguồn bên ngoài không kèm liên kết hay mã băm commit nên người đọc không thể tái hiện. Khi tự đào sâu, ông phát hiện thủ phạm là một ký tự khoảng trắng không ngắt dạng UTF-8 vô tình lọt vào tệp mẫu `routes.conf.erb`, trong khi Ruby 1.9.3 mặc định đọc tệp theo bảng mã US-ASCII, khiến bộ kiểm thử thất bại.

Từ đó, tác giả viết lại thông điệp theo lối "kim tự tháp ngược" của nghề báo: mở đầu bằng tóm tắt thay đổi, tiếp theo là nguyên nhân và cách khắc phục, rồi mới đến phần "Cách tôi phát hiện ra điều này" chứa phần lớn nội dung gốc, kèm liên kết tới commit đã đưa ký tự lạ vào. Bài học cho lập trình viên trẻ: chi tiết kỹ thuật vẫn đáng giữ, nhưng hãy sắp xếp sao cho người lướt qua lịch sử commit hiểu ngay thay đổi đó làm gì và vì sao cần thiết.

## [Our interfaces have lost their senses](https://wattenberger.com/thoughts/our-interfaces-have-lost-their-senses)

Amelia Wattenberger cho rằng giao diện số ngày càng "phẳng" và nghèo giác quan. Máy tính thời đầu là trải nghiệm toàn thân với thẻ đục lỗ, dây cắm và công tắc; rồi đến dòng lệnh, giao diện đồ họa với nút bấm mô phỏng vật thật, và màn hình cảm ứng nơi mọi thứ nằm sau lớp kính. Với làn sóng chatbot AI, ta còn mất thêm kết cấu, màu sắc và hình dạng: muốn sửa ảnh, chỉnh cài đặt hay học điều gì đó cũng chỉ còn một ô nhập văn bản. Tác giả lưu ý rằng xóa bỏ mọi ma sát cũng lấy đi ý nghĩa: lướt mạng xã hội thì dễ, nhưng nhào bột, chơi nhạc cụ hay phác họa mới đem lại sự thỏa mãn. Theo bà, ta đã biến vẽ tranh thành gõ phím, trong khi lẽ ra nên khiến gõ phím có cảm giác như vẽ tranh.

Hướng đi được đề xuất là thiết kế giao diện vừa vặn với cơ thể con người: máy tính có thể phản hồi bằng văn bản, hình ảnh trực quan, âm thanh và rung; con người có thể nhập liệu bằng bàn phím, kéo thả, chạm vuốt, cử chỉ và giọng nói. Sức mạnh thật sự nằm ở việc kết hợp nhiều phương thức cùng lúc, chẳng hạn vừa nói vừa nhấp chuột. Tác giả mong giao diện tương lai cho phép cộng tác trên những sản phẩm hữu hình thay vì chỉ lịch sử trò chuyện, hỗ trợ đồng thời nhiều phương thức và biết phản hồi theo ngữ cảnh xung quanh, minh họa bằng một công cụ thử nghiệm tự sắp xếp suy nghĩ của người dùng thành các thẻ khi họ nói hoặc gõ.

## [Labeled Breaks in Java: Useful Tool or Code Smell?](https://www.baeldung.com/java-labeled-break)

Bài viết của Leo Helfferich trên Baeldung xem xét câu lệnh `break` và `continue` có nhãn trong Java, tính năng có từ Java 1.0 và gần như không thay đổi từ đó. Khác với `break` thông thường chỉ thoát khỏi vòng lặp trong cùng, phiên bản có nhãn cho phép thoát thẳng khỏi một vòng lặp bên ngoài đã được đặt tên, ví dụ `break outer;` trong đoạn mã bên dưới sẽ kết thúc cả hai vòng lặp lồng nhau. Ưu điểm là hiệu quả: khi tìm kiếm trong danh sách lồng nhau, ta dừng ngay khi thấy kết quả mà không cần biến cờ hay điều kiện phụ, đồng thời kiểm soát chính xác vòng lặp nào sẽ kết thúc trong cấu trúc lồng sâu.

```java
outer: // <-- label
for (int i = 0; i < 5; i++) {
    for (int j = 0; j < 5; j++) {
        println(i + ", " + j);
        if (j == 2) {
            break outer; // thoát khỏi vòng lặp ngoài
        }
    }
}
```

Đổi lại, nhãn dễ khiến mã nguồn trông như lệnh GOTO và gây khó hiểu cho người bảo trì, nhất là khi đặt tên tùy tiện như `x:`; sửa một vòng lặp có nhãn cũng dễ làm hỏng các phần phụ thuộc trong dự án lớn. Tác giả gợi ý các phương án rõ ràng hơn như tách logic ra phương thức riêng hoặc dùng Stream API với `flatMap` và `anyMatch`. Bài cũng so sánh với Kotlin (cú pháp `outer@` và `break@outer`) và JavaScript (gần như giống hệt Java), rồi kết luận rằng nhãn chỉ nên là công cụ dành cho những tình huống hiếm và phức tạp, khi nó không làm giảm độ dễ đọc.

## [Distributed Locking: A Practical Guide](https://www.architecture-weekly.com/p/distributed-locking-a-practical-guide)

Oskar Dudycz giải thích khóa phân tán, cơ chế đảm bảo chỉ một tiến trình được thao tác trên một tài nguyên dùng chung tại một thời điểm khi ứng dụng chạy trên nhiều máy hoặc nhiều microservice. Nó cần thiết khi nhiều tiến trình cùng ghi một bản ghi, khi thông điệp được giao nhiều lần, hay khi tác vụ định kỳ chạy trên nhiều nút. Quy trình cơ bản: nút gửi yêu cầu tới bộ quản lý khóa, nếu chưa ai giữ thì tạo khóa, thực hiện thao tác quan trọng rồi giải phóng; nếu nút gặp sự cố, cơ chế TTL hoặc nút tạm thời (ephemeral) sẽ tự xóa khóa để tránh khóa "zombie". Tác giả so sánh bốn lựa chọn: Redis với lệnh `SET ... NX EX` đơn giản, nhanh nhưng có rủi ro khi mạng bị phân vùng; ZooKeeper/etcd nhất quán mạnh nhờ cơ chế đồng thuận đa số nhưng vận hành nặng hơn; khóa cơ sở dữ liệu như `SELECT ... FOR UPDATE` hay advisory lock của PostgreSQL, tiện khi chỉ có một cơ sở dữ liệu nhưng khó mở rộng; và chạy duy nhất một bản sao trên Kubernetes, không cần khóa nhưng mất khả năng mở rộng, tính sẵn sàng cao, và đôi khi vẫn có thể tạm thời xuất hiện hai pod.

Bài viết cũng bàn về các rủi ro như deadlock, tranh chấp khóa, điểm lỗi đơn, lệch đồng hồ và phân vùng mạng. Lời khuyên cuối cùng: hãy tránh khóa phân tán nếu có thể, dùng khóa có chừng mực vì khóa quá nhiều làm giảm tính song song, chọn công cụ phù hợp với hạ tầng sẵn có, và luôn lên kế hoạch cho sự cố bằng khóa có thời hạn.

## [If it is worth keeping, save it in Markdown](https://p.migdal.pl/blog/2025/02/markdown-saves)

Piotr Migdał mở đầu bằng một thực tế: nội dung đăng lên mạng sớm hay muộn cũng biến mất. Liên kết thay đổi khi trang web tái cấu trúc, nền tảng đóng cửa hoặc khóa nội dung sau lớp đăng nhập và phí thuê bao, thậm chí trang tự lưu trữ cũng có thể mất vì quên gia hạn hay cơ sở dữ liệu hỏng sau khi nâng cấp. Giải pháp bền vững nhất theo tác giả là văn bản thuần mã hóa UTF-8 với định dạng Markdown: mọi máy tính đều đọc được mà không cần phần mềm chuyên dụng, còn việc Markdown cố tình không kiểm soát chi tiết hiển thị lại là ưu điểm theo nguyên tắc "sức mạnh tối thiểu". Ông dùng Obsidian để ghi chép và trình tạo trang tĩnh để viết blog, cả hai đều lưu tệp Markdown nên việc chia sẻ hay chuyển nền tảng rất thuận tiện.

Cách làm của ông khá thực dụng: gặp nội dung đáng giữ thì chép vào tệp Markdown, thêm frontmatter ghi ngày xuất bản, nguồn và thẻ; khi thấy bản thân phải tìm lại nội dung cũ thì lưu ngay, vì nội dung đáng tìm một lần là nội dung đáng giữ mãi mãi. Các công cụ hỗ trợ gồm pandoc để chuyển đổi định dạng, công cụ chuyên biệt cho Medium hay Reddit, AI để trích xuất nội dung từ PDF, và Git để quản lý phiên bản, sao lưu. Ngoài ra, ông định kỳ tải dữ liệu từ các dịch vụ đang dùng, dù chưa kịp chuyển chúng sang Markdown.

## [The Software Engineering Identity Crisis](https://annievella.com/posts/the-software-engineering-identity-crisis/)

Annie Vella phân tích cuộc khủng hoảng bản sắc của kỹ sư phần mềm thời AI. Nhiều người chọn nghề vì niềm vui tự tay xây dựng, như truy ra một lỗi khó hay tối ưu một thuật toán chậm, nhưng trợ lý lập trình AI đang biến họ từ người sáng tạo thành người điều phối, từ người xây dựng thành người giám sát. Sự thay đổi đã diễn ra: Google cho biết AI tạo ra hơn một phần tư mã nguồn mới, còn CEO Y Combinator nói khoảng một phần tư startup của họ có 95% mã do AI viết. Khái niệm "vibe coding" của Andrej Karpathy, tập trung vào "cái gì" thay vì "làm thế nào", đặt ra câu hỏi: ta còn là kỹ sư nếu quên hẳn mã nguồn? Tác giả liên hệ với lần miễn cưỡng chuyển sang làm quản lý của chính bà, đồng thời dẫn nghiên cứu của GitClear về lượng mã sao chép và mã bị sửa lại tăng mạnh, cùng nghiên cứu cho thấy niềm tin vào AI thường cao lúc đầu rồi giảm nhanh.

Dù vậy, bài viết không bi quan. Giống thợ thủ công thời Cách mạng Công nghiệp, kỹ sư có thể thích nghi, và các kỹ năng bền vững như giao tiếp, tư duy tổng thể, xử lý sự mơ hồ càng trở nên quan trọng. Tác giả đề xuất hình ảnh con lắc: luân phiên giữa viết mã trực tiếp, điều phối AI và kết hợp cả hai. Theo bà, AI không lấy mất công việc mà cho kỹ sư cơ hội giành lại những phần vai trò từng giao cho các chuyên gia khác, từ hiểu nhu cầu người dùng, tác động kinh doanh đến thiết kế hệ thống và vận hành.

## [Revenge of the junior developer](https://sourcegraph.com/blog/revenge-of-the-junior-developer)

Steve Yegge của Sourcegraph cho rằng lập trình đang trải qua sáu làn sóng chồng lấn: lập trình truyền thống (2022), dựa trên gợi ý hoàn thành mã (2023), dựa trên trò chuyện (2024), agent lập trình (nửa đầu 2025), cụm agent (nửa cuối 2025) và đội agent (2026). Theo ông, "vibe coding" là để LLM viết mã, đưa kết quả lại và yêu cầu tiếp trong một vòng lặp liên tục, và cách làm này sẽ tồn tại xuyên suốt các làn sóng. Agent lập trình như Claude Code hay Aider có thể tự đọc phiếu công việc, tìm lỗi, đề xuất bản sửa và viết kiểm thử, nhưng vẫn cần được chia nhỏ nhiệm vụ và giám sát kỹ. Ông ước tính mỗi agent tốn khoảng 10–12 USD mỗi giờ, và doanh nghiệp nên dự trù ngân sách LLM lớn hơn nhiều cho mỗi lập trình viên khi họ chạy nhiều agent song song.

Phần "báo thù" nằm ở cuối: trái với dự đoán trong bài "The Death of the Junior Developer" trước đó, lập trình viên mới lại tiếp nhận AI nhanh hơn hẳn lập trình viên lâu năm, trong khi nhiều người kỳ cựu chống đối vì đã đầu tư quá nhiều vào hiện trạng và coi việc học lại từ đầu như đánh mất vị thế. Thông điệp của ông: không phải AI phải chứng minh nó giỏi hơn bạn, mà bạn phải giỏi hơn nhờ AI. Theo tác giả, đến cuối năm, công việc kỹ sư phần mềm sẽ ít viết mã trực tiếp và chủ yếu là giám sát agent, nên thích nghi càng sớm càng tốt; nếu chưa biết bắt đầu từ đâu, hãy hỏi một lập trình viên mới.

## Bonus: Vài ảnh hay ho đến từ [ByteByteGo](https://bytebytego.com/)

![How does SSO Work?](https://substack-post-media.s3.amazonaws.com/public/images/111cec1b-a195-4ff5-963c-714ceecd01ab_1280x1664.gif)
![How Java Virtual Threads Work?](https://substack-post-media.s3.amazonaws.com/public/images/b415d54d-0dbd-428d-a09c-3de0332c0f71_1280x1502.gif)
![Memcached vs Redis](https://substack-post-media.s3.amazonaws.com/public/images/8ef255cc-ebbb-4710-9faf-f366274a2bef_1280x1373.gif)
![The Shopify Tech Stack](https://substack-post-media.s3.amazonaws.com/public/images/2370fff4-b515-484e-a081-4ce73b2c62c2_1280x1566.gif)

## Bonus 2: Vài video hay ho đến từ [ByteByteGo](https://bytebytego.com/)

[What Are AI Agents Really About?](https://www.youtube.com/watch?v=eHEHE2fpnWQ)

---

*Bài viết đã được viết lại bởi Claude Code với Opus 5.5 vào ngày 27/09/2026.*
