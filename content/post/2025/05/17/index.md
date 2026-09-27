---
title: "Newsletter #30"
date: 2025-05-17
tags: ["AI-Assisted", "Education", "LLMs", "Caching", "JavaScript", "Software Development"]
categories: ["Newsletter"]
draft: false
---

*Chào mừng bạn đến với Newsletter #30 - Tổng hợp tin tức công nghệ hôm nay.*

## [What I'd do as a College Freshman in 2025](https://muratbuffalo.blogspot.com/2025/04/what-id-do-as-college-freshman.html)

Murat Demirbas, giáo sư khoa học máy tính, tự hỏi nếu được làm lại sinh viên năm nhất vào năm 2025 thì ông sẽ làm gì, và câu trả lời đầu tiên vẫn là học Khoa học Máy tính. Trái với ý kiến cho rằng "không ai cần học lập trình nữa", ông cho rằng công cụ AI không thể thay thế sự thành thạo thật sự: kỹ năng gỡ lỗi, tư duy trừu tượng và khả năng thích nghi nhanh phải tự mình rèn luyện. Ông khuyên xây nền tảng vững ở cả khoa học máy tính lẫn AI, rồi kết hợp AI với một lĩnh vực chuyên sâu như hệ thống, cơ sở dữ liệu hay ngôn ngữ lập trình, hướng tới hình mẫu con người "hình chữ π": sâu ở hai mảng và hiểu rộng ở nhiều mảng khác.

Bên cạnh chuyên môn, kỹ năng mềm là thứ không thể bỏ qua: giao tiếp rõ ràng giúp làm việc từ xa, chia sẻ công khai và cả làm việc với LLM, còn kỹ năng quản lý bắt đầu từ việc quản lý chính mình. Tác giả vẫn xem Mỹ là bệ phóng tốt nhất cho sự nghiệp công nghệ và đại học là nơi tốt nhất để gặp gỡ người giỏi và cùng nhau làm dự án. Ông mượn hình ảnh của một người bạn: hãy là chiếc Jeep đi được mọi địa hình với tư duy khởi nghiệp, hoặc chiếc Ferrari chuyên sâu và nhanh khi có đường sẵn, nhưng đừng là chiếc Corolla dễ bị thay thế, vì trong thời đại AI đó chính là thứ bị tự động hóa. Cuối cùng, hãy chơi đường dài, tích lũy kỹ năng và các mối quan hệ theo kiểu lãi kép thay vì chạy theo trào lưu.

---

## [LLMs Are Weird Computers](https://www.phillipcarter.dev/posts/llms-computers)

Phillip Carter đề xuất một cách nhìn thú vị về các mô hình ngôn ngữ lớn (LLM): xem chúng như một loại máy tính "kỳ lạ", hay "đảo ngược", đặt cạnh những chiếc máy tính "truyền thống" mà chúng ta vẫn quen dùng. Máy tính truyền thống xử lý cực kỳ chính xác nhưng lúng túng trước những yêu cầu mơ hồ, còn LLM thì ngược lại: rất giỏi xử lý sự mơ hồ nhưng lại gặp khó khăn khi cần độ chính xác tuyệt đối.

Coi LLM là một dạng máy tính mới với những đặc tính riêng giúp lập trình viên hiểu rõ hơn điểm mạnh và giới hạn của chúng, từ đó biết nên giao cho LLM những việc gì và khi nào vẫn cần đến cách tính toán truyền thống.

---

## [Every Caching Strategy Explained in 5 Minutes](https://www.swequiz.com/blog/every-caching-strategy-explained-in-5-minutes)

Bài viết của SWE Quiz điểm nhanh các chiến lược bộ nhớ đệm (cache) phổ biến, một kiến thức nền tảng để tối ưu hiệu năng ứng dụng. Với Cache-Aside (còn gọi là tải lười), ứng dụng tự quản lý bộ nhớ đệm: kiểm tra cache trước, chỉ truy vấn cơ sở dữ liệu khi không tìm thấy, phù hợp với hệ thống đọc nhiều và chấp nhận dữ liệu cũ trong thời gian ngắn. Read-Through thì để ứng dụng chỉ làm việc với cache, còn cache tự tải dữ liệu từ cơ sở dữ liệu khi cần, nhờ đó mã nguồn ứng dụng gọn hơn.

Ở phía ghi, Write-Through ghi đồng thời vào cả cache lẫn cơ sở dữ liệu, bảo đảm tính nhất quán nhưng làm chậm thao tác ghi. Write-Behind (Write-Back) chỉ ghi vào cache rồi đồng bộ bất đồng bộ xuống cơ sở dữ liệu sau, giúp ghi nhanh hơn nhưng có nguy cơ mất dữ liệu nếu cache gặp sự cố. Write-Around bỏ qua cache khi ghi và chỉ dùng cache cho việc đọc, thích hợp với dữ liệu hiếm khi được đọc lại ngay sau khi ghi. Việc chọn chiến lược nào tùy thuộc vào yêu cầu cụ thể của ứng dụng về hiệu năng, tính nhất quán và khả năng chịu lỗi.

## [Những tính năng JavaScript mà mọi lập trình viên nên biết năm 2025](https://waspdev.com/articles/2025-04-06/features-that-every-js-developer-must-know-in-2025)

Bài viết trên WaspDev tổng hợp những tính năng JavaScript hiện đại mà lập trình viên nên nắm vững, giúp mã nguồn gọn và hiệu quả hơn. Nổi bật là các phương thức hỗ trợ iterator như `drop()`, `take()`, `filter()`, cho phép xử lý tuần tự từng phần tử của tập dữ liệu lớn mà không phải tạo các mảng trung gian tốn bộ nhớ. Phương thức `at()` cho phép truy cập mảng bằng chỉ số âm, chẳng hạn `arr.at(-1)` để lấy phần tử cuối, còn `Promise.withResolvers()` giúp tạo Promise mà vẫn lấy được `resolve` và `reject` ra bên ngoài một cách gọn gàng.

Bài viết cũng nhắc tới những kỹ thuật ít người tận dụng: truyền hàm gọi lại vào `replace()` và `replaceAll()` để thay thế chuỗi phức tạp, hoán đổi hai biến bằng cú pháp `[a, b] = [b, a]` thay vì dùng biến tạm, và sao chép sâu đối tượng bằng `structuredClone()` thay cho `JSON.parse(JSON.stringify())`. Ngoài ra còn có tagged template để xử lý chuỗi mẫu linh hoạt hơn, `WeakMap`/`WeakSet` để gắn dữ liệu phụ vào đối tượng mà không cản trở việc thu hồi bộ nhớ, cùng các phép toán tập hợp mới trên `Set` như `union()`, `intersection()`, `difference()`.

## [Điều gì tạo nên trải nghiệm nhà phát triển tuyệt vời?](https://www.codesimplicity.com/post/what-makes-a-great-developer-experience/)

Max Kanat-Alexander, người đã hơn 20 năm làm về trải nghiệm nhà phát triển (DX) và từng tham gia thiết kế những phần quan trọng của DX tại Google và LinkedIn, tóm lược các nguyên tắc nền tảng của lĩnh vực này. Theo ông, một trải nghiệm tốt cần tối ưu ba thứ: thời gian vòng lặp, tức khoảng thời gian từ lúc lập trình viên có ý định đến lúc ý định đó hoàn thành; khả năng tập trung, tức được làm việc liền mạch mà không bị gián đoạn; và tải nhận thức, tức lượng kiến thức phải biết cùng số quyết định phải đưa ra để làm xong một việc.

Phần lớn bài viết dành cho những thách thức khi cải thiện DX: hiểu đúng vấn đề thông qua dữ liệu và phản hồi từ lập trình viên, quản lý thay đổi bằng cách triển khai dần và thúc đẩy người dùng chấp nhận, cung cấp công cụ có đòn bẩy cao nhằm tiết kiệm thời gian của con người thay vì chỉ tiết kiệm tài nguyên máy, biết nói "không" hoặc "chưa phải lúc" một cách tử tế với những yêu cầu không phù hợp, và đặt gánh nặng lên đúng người gây ra vấn đề. Qua đó có thể thấy phần khó nhất của DX thường nằm ở yếu tố con người chứ không phải kỹ thuật.

## [Khi Cuộc Đời Cho Bạn Java](https://oblac.rs/when-life-gives-you-java/)

Igor Spasić chia sẻ cách ông viết Java khi buộc phải dùng ngôn ngữ này nhưng vẫn muốn mã nguồn tốt, bằng những bài học mượn từ các ngôn ngữ hàm giàu tính biểu đạt hơn. Ông mặc định để mọi lớp ở phạm vi package-private và chỉ công khai khi thật cần, coi mỗi package như một mô-đun. Khoảng 95% tham chiếu được khai báo `final` để tận dụng tính bất biến, nhờ đó `null` gần như biến mất và chỉ còn xuất hiện trong phạm vi rất hẹp. Ông không còn dùng kế thừa trong mã của mình mà ưu tiên kết hợp đối tượng (composition), dù vẫn phải chấp nhận kế thừa khi tích hợp với thư viện bên ngoài.

Tác giả tư duy theo kiểu hàm "đầu vào, xử lý, đầu ra": vì Java không có hàm hạng nhất, mỗi lớp thường chỉ gói một hàm hoặc vài hàm liên quan chặt chẽ. Các kiểu dữ liệu đại số (ADT) được mô hình hóa bằng `record` triển khai `sealed interface`, và lỗi nghiệp vụ được trả về như một phần kết quả thông qua ADT riêng cho từng loại, còn ngoại lệ chỉ dành cho lỗi thời gian chạy thật sự như lỗi bộ nhớ, I/O hay mất kết nối cơ sở dữ liệu. Hệ quả là số lượng lớp nhỏ tăng lên, nhưng đó là đánh đổi đáng giá để có mã nguồn mô-đun hơn và ít bất ngờ hơn.

## [Chỉ Cần Đổ Vào PostgreSQL](https://simonsafar.com/2025/throw_it_into_postgres/)

Simon Safar cho rằng giữa hai thái cực, một bên là ép mọi dữ liệu vào lược đồ quan hệ chuẩn hóa chặt chẽ, một bên là cất dữ liệu thô vào vô số tệp trong cây thư mục, vẫn có một lựa chọn ở giữa: cứ đổ thẳng dữ liệu vào PostgreSQL mà chưa cần nghĩ nhiều về cách tổ chức. Nhờ kiểu JSONB, PostgreSQL có thể truy vấn trực tiếp từng trường bên trong tài liệu JSON, còn chỉ mục và các cột quan trọng có thể bổ sung sau khi đã có dữ liệu.

Tác giả minh họa bằng ba ví dụ. Thứ nhất, ông tự xây dựng công cụ điều hướng mã Java cho Emacs: phân tích các tệp class đã biên dịch để ghi lại quan hệ như "hàm A gọi hàm B", rồi nạp hàng trăm nghìn bản ghi vào PostgreSQL bằng lệnh `COPY` chỉ trong vài chục giây, đủ nhanh để gọi `psql` nhiều lần mỗi giây cho tính năng tự động hoàn thành. Thứ hai, dự án Make Me a Hanzi với hàng chục nghìn hình SVG của chữ Hán được đưa vào một bảng có cột JSONB, kết hợp với bảng từ điển để tra cứu nhanh. Thứ ba, dữ liệu từ cảm biến nhiệt độ gửi qua máy chủ MQTT được lưu lại để vẽ biểu đồ bằng Grafana. Thông điệp chung là cứ lưu dữ liệu vào trước và tổ chức sau, thay vì cố thiết kế lược đồ hoàn hảo ngay từ đầu.

---

*Bài viết đã được viết lại bởi Claude Code với Opus 5.5 vào ngày 27/09/2026.*
