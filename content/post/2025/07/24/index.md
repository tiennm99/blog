---
title: "Newsletter #35"
date: 2025-07-24
tags: [ "AI-Assisted", "WebAssembly", "WASM", "Cross-platform", "Performance" ]
categories: [ "Newsletter" ]
---

*Mời bạn thưởng thức Newsletter #35.*

## [The magic of software; or, what makes a good engineer also makes a good engineering organization](https://moxie.org/2024/09/23/a-good-engineer.html)

Moxie Marlinspike cho rằng phát triển phần mềm là sự giao thoa giữa khoa học và kỹ thuật, trong đó tầm nhìn và hiểu biết công nghệ tác động qua lại lẫn nhau chứ không đi theo một chiều từ ý tưởng đến triển khai. Ví dụ tiêu biểu là hiệu ứng hoạt hình "xoay vòng màu" (color cycling) trong các trò chơi thập niên 1980: nó không xuất phát từ một ý tưởng định sẵn, mà ra đời vì các lập trình viên hiểu cơ chế bảng màu chỉ mục (indexed color) đủ sâu để dùng nó theo cách không ai ngờ tới. Theo tác giả, một kỹ sư giỏi là người tò mò, không coi các lớp trừu tượng là hộp đen, và để chính sự hiểu biết đó gợi mở những khả năng mới cho sản phẩm.

Nguyên tắc này cũng đúng với cả một tổ chức kỹ thuật. Khi các nhóm làm việc tách biệt và coi nhau như những hộp đen, tổ chức mất đi khả năng nhìn xuyên suốt cần thiết cho những thay đổi lớn — tác giả lấy ví dụ Skype gặp khó khăn khi chuyển sang nền tảng di động. Ông cũng cảnh báo việc sao chép máy móc cách tổ chức của các công ty công nghệ lớn, vì nhiều nơi thành công bất chấp cấu trúc hiện tại chứ không phải nhờ nó. Thông điệp cuối cùng: cả kỹ sư lẫn tổ chức đều cần nuôi dưỡng sự tò mò và khuyến khích hiểu biết vượt qua ranh giới giữa các nhóm, thay vì chia nhỏ kiến thức thành từng ngăn riêng.

## [Redis Is Open Source Again. But Is It Too Late?](https://blog.abhimanyu-saharan.com/posts/redis-is-open-source-again-but-is-it-too-late)

Tháng 3/2024, Redis bỏ giấy phép BSD để chuyển sang mô hình giấy phép kép RSALv2/SSPLv1 nhằm ngăn các nhà cung cấp đám mây kinh doanh dịch vụ Redis mà không đóng góp lại. Quyết định này vấp phải phản ứng dữ dội: Amazon và Google đứng sau Valkey, một bản fork dựa trên Redis 7.2.4 do Linux Foundation bảo trợ, và nhiều bản phân phối như Arch Linux đã chuyển hẳn sang Valkey. Với Redis 8, công ty quay đầu và bổ sung giấy phép AGPLv3 — một giấy phép mã nguồn mở thực thụ có tính copyleft — một phần nhờ sự trở lại của người sáng lập Salvatore Sanfilippo. Phiên bản mới cũng tích hợp sẵn nhiều tính năng trước đây nằm ở mô-đun riêng, như vector sets cho ứng dụng AI, JSON, chuỗi thời gian và các kiểu dữ liệu xác suất.

Dù vậy, tác giả cho rằng niềm tin đã bị tổn hại khó mà lấy lại: "Lòng tin được xây dựng qua nhiều năm nhưng có thể mất chỉ trong một khoảnh khắc." Nhiều nhóm đã chuyển hạ tầng sang Valkey, dự án này tiếp tục có đà nhờ sự hậu thuẫn của doanh nghiệp, còn việc Redis vẫn giữ RSALv2 và SSPLv1 trong mô hình ba giấy phép khiến cộng đồng nghi ngờ cam kết lâu dài của Redis Ltd. Kết luận thực tế: ai đang dùng Valkey thì ít có lý do để quay lại, còn với dự án mới, Redis 8 vẫn là một lựa chọn đáng cân nhắc.

## [Write the most clever code you possibly can](https://buttondown.com/hillelwayne/archive/write-the-most-clever-code-you-possibly-can)

Hillel Wayne đưa ra một lời khuyên nghe có vẻ ngược đời: hãy viết mã nguồn "thông minh" nhất có thể — nhưng như một bài luyện tập có chủ đích, không phải để đưa vào sản phẩm. "Thông minh" ở đây nghĩa là dùng những tính năng ngôn ngữ hoặc khái niệm chuyên ngành mà bạn chưa quen. Cách luyện tập này mang lại bốn lợi ích: kết hợp nhiều tính năng mạnh giúp hiểu cách chúng phối hợp với nhau; làm chủ khái niệm lạ giúp hiểu ngôn ngữ sâu hơn; bạn được chuẩn bị cho những lúc thật sự cần giải pháp tinh vi vì giới hạn về hiệu năng hoặc công cụ; và chia sẻ những đoạn mã "khôn lỏi" không dùng cho sản phẩm cũng là cách gắn kết với đồng nghiệp.

Điều kiện tiên quyết là không bao giờ đưa mã "thông minh" vào hệ thống chạy thật. Tác giả gợi ý ba cách làm có trách nhiệm: giải bài toán theo cả hai cách rồi chỉ giữ lại phiên bản đơn giản, thỏa sức sáng tạo trong các công cụ cá nhân, hoặc nếu giải pháp phức tạp thực sự tốt hơn thì phải viết tài liệu thật kỹ. Các ví dụ trong bài trải từ pattern matching trong Python, kết hợp hàm trong JavaScript đến biến đổi dữ liệu với pandas; ông cũng chỉ ra rằng nhiều kỹ thuật bị coi là "quá thông minh", như list comprehension, thực chất chỉ là tính năng chuẩn của ngôn ngữ được dùng hiệu quả.

## [Semantic Unit Testing](https://www.alexmolas.com/2025/04/09/semantic-unit-testing.html)

Semantic unit testing là ý tưởng dùng mô hình ngôn ngữ lớn (LLM) để kiểm tra xem phần cài đặt của một hàm có khớp với hành vi được mô tả trong tài liệu (docstring) hay không, thay vì viết các cặp đầu vào/đầu ra như kiểm thử truyền thống. Giả thuyết của tác giả là một mô hình đủ mạnh, với đủ ngữ cảnh, có thể phát hiện lỗi mà không cần chạy mã. Thư viện `suite` của ông dùng mô-đun `inspect` của Python để lấy mã nguồn và docstring của hàm, lần theo các hàm phụ thuộc bên trong đến một độ sâu nhất định, gom tất cả vào một prompt chi tiết rồi gửi cho LLM và nhận về kết quả có cấu trúc gồm lý do cùng trạng thái đạt/không đạt. Ví dụ bên dưới là một hàm `multiply` thực chất lại làm phép cộng — mô hình sẽ chỉ ra sự lệch nhau giữa docstring và phần cài đặt.

Cách làm này giúp phát hiện sai lệch về ngữ nghĩa từ sớm, bao quát hơn các ca kiểm thử cụ thể, tích hợp dễ dàng với pytest, chạy bất đồng bộ được và hỗ trợ mô hình cục bộ để bảo đảm riêng tư. Tuy vậy, tác giả thẳng thắn thừa nhận các hạn chế: LLM có thể "ảo giác" nên không thể tin tuyệt đối, chi phí có thể rất cao (riêng một phương thức của pandas đã tốn khoảng 112 nghìn token), và các phương pháp kiểm thử truyền thống vẫn đáng tin cậy hơn. Vì vậy, semantic unit testing chỉ nên là công cụ bổ trợ, không bao giờ thay thế unit test thông thường.

```python
def multiply(x: int, y: int) -> int:
    """Nhân x với y"""
    return x + y  # Triển khai cố ý sai

tester = suite(model_name="openai/o3-mini")
result = tester(multiply)
# LLM phát hiện triển khai không khớp với docstring
```

## [SOLID Principles in Java (With Real life Examples)](https://dev.to/chhavirana/understanding-solid-principles-in-java-with-real-life-examples-1ked)

SOLID là năm nguyên tắc thiết kế hướng đối tượng giúp mã nguồn dễ hiểu, linh hoạt và dễ bảo trì; bài viết giải thích từng nguyên tắc qua bối cảnh một hệ thống đặt đồ ăn viết bằng Java. Với Single Responsibility, thay vì một `OrderService` ôm cả đặt hàng, xuất hóa đơn và gửi thông báo, ta tách thành `OrderService`, `InvoiceService` và `NotificationService`, mỗi lớp một nhiệm vụ rõ ràng. Với Open/Closed, thay vì một `PaymentService` đầy câu lệnh điều kiện theo loại thanh toán, ta định nghĩa interface `PaymentMethod` với các cài đặt như `CardPayment`, `UpiPayment`, nhờ đó thêm phương thức thanh toán mới mà không phải sửa mã cũ. Với Liskov Substitution, lớp trừu tượng `DeliveryMode` có các lớp con `BikeDelivery` và `ScooterDelivery`; lớp nào cũng tuân thủ đúng hợp đồng của lớp cha nên có thể thay thế cho nhau mà không gây lỗi.

Với Interface Segregation, thay vì một interface `RestaurantPartner` bắt mọi nhà hàng phải xử lý đơn hàng, thông tin dinh dưỡng lẫn phản hồi, bài viết chia thành `OrderAcceptance`, `FeedbackHandler` và `NutritionInfoProvider`, để quán nhỏ chỉ cần cài đặt những gì thực sự liên quan. Cuối cùng, Dependency Inversion được minh họa bằng `OrderNotifier` phụ thuộc vào interface trừu tượng `Notifier` thay vì lớp cụ thể `EmailService`, nên có thể đổi sang `SmsService` hay kênh khác một cách dễ dàng. Thông điệp chung: SOLID không chỉ là lý thuyết mà là công cụ thực tế để viết mã sạch, dễ mở rộng và thích nghi với yêu cầu mới.

## [A year on, Valkey charts path to v9 after break from Redis](https://www.theregister.com/software/2025/05/15/a-year-on-valkey-charts-path-to-v9-after-break-from-redis/852499)

Một năm sau khi tách khỏi Redis vì thay đổi giấy phép gây tranh cãi, Valkey đang cho thấy sức sống rõ rệt. Madelyn Olson, kỹ sư chính tại AWS và đồng bảo trì Valkey — người dẫn đầu làn sóng rời bỏ Redis — cho biết dự án vừa phát hành bản 8.1. Trước đó, bản 8.0 đã bổ sung thống kê theo slot để tăng khả năng quan sát hệ thống, một tính năng từng bị ban lãnh đạo Redis gạt đi. Thay vì ra bản 8.2, nhóm đang chuẩn bị thẳng phiên bản 9 để đưa vào những thay đổi "can thiệp sâu hơn". Về chính sách hỗ trợ, mọi phiên bản đều được hỗ trợ tối thiểu ba năm, còn bản phụ cuối cùng của mỗi phiên bản chính sẽ được hỗ trợ năm năm, đáp ứng nhu cầu ổn định lâu dài của doanh nghiệp.

Olson nhấn mạnh mục tiêu để Valkey "không phải dự án của một nhà cung cấp duy nhất", bằng cách mở rộng đội ngũ người bảo trì và Ủy ban Chỉ đạo Kỹ thuật; những người như Ricardo Dias từ Percona hiện đóng góp toàn thời gian. Bà thừa nhận từng kiệt sức trong sáu tháng đầu và tin rằng việc phân chia trách nhiệm sẽ giúp tránh lặp lại điều đó. Valkey cũng không thu thập dữ liệu telemetry mà dựa vào phản hồi trực tiếp từ người dùng và các nhà cung cấp dịch vụ được quản lý. Câu chuyện của Valkey cho thấy một dự án mã nguồn mở có thể phát triển bền vững khi có cách quản trị cởi mở và cộng đồng đứng sau.

## [Stack Overflow is almost dead](https://blog.pragmaticengineer.com/stack-overflow-is-almost-dead)

Stack Overflow, nơi từng là điểm đến quen thuộc của hàng triệu lập trình viên, đang suy giảm nghiêm trọng: theo dữ liệu từ công cụ truy vấn của chính trang này, số câu hỏi mỗi tháng đã rơi về mức ngang thời điểm ra mắt năm 2009. Sự đi xuống diễn ra qua nhiều giai đoạn. Từ năm 2014, khi người kiểm duyệt có công cụ hiệu quả hơn, câu hỏi bị đóng nhanh hơn và bài "chất lượng thấp" bị xóa hàng loạt, khiến nhiều người, nhất là người mới, cảm thấy không được chào đón. Đại dịch năm 2020 tạm thời đẩy lưu lượng tăng lên khi lập trình viên làm việc từ xa và thay việc hỏi đồng nghiệp bằng tìm kiếm trên mạng, nhưng xu hướng giảm quay lại ngay sau đó — tức là từ hai năm trước khi ChatGPT xuất hiện, cho thấy vấn đề mang tính cấu trúc. Năm 2021, hai nhà sáng lập Jeff Atwood và Joel Spolsky bán trang cho Prosus.

Đòn quyết định đến khi ChatGPT ra mắt vào tháng 11/2022: số câu hỏi lao dốc vì các mô hình ngôn ngữ lớn trả lời nhanh hơn, lịch sự hơn và chất lượng tương đương — trớ trêu thay, nhờ được huấn luyện trên chính dữ liệu của Stack Overflow. Tác giả cho rằng câu hỏi không còn là trang này có tiếp tục suy giảm hay không, mà là khi nào nó đóng cửa hoặc được bán lại với giá thấp hơn nhiều. Dù vậy, nhu cầu lập trình viên giúp đỡ lẫn nhau vẫn sẽ tồn tại qua các máy chủ Discord, nhóm nhắn tin hay những nền tảng mới.

## [Why I use WebAssembly](https://nasso.dev/blog/why-i-use-wasm)

Tác giả chia sẻ lý do chọn WebAssembly (WASM), và lý do thuyết phục nhất là nó đơn giản hóa việc quản lý trạng thái ứng dụng. Khi xử lý diễn ra ngay trên máy người dùng, ứng dụng không cần liên tục gọi lên máy chủ để theo dõi tiến trình, nhờ đó tránh được các cơ chế polling hay streaming phức tạp. WASM còn giúp tận dụng mã native sẵn có: Figma biên dịch bộ dựng đồ họa vector viết bằng C++ sang WASM và giảm thời gian tải ba lần, còn FFmpeg chạy trong trình duyệt cho phép chuyển đổi tệp hoàn toàn ngoại tuyến mà không phải tải lên máy chủ nào.

Quan trọng hơn, tác giả coi WASM như một "định dạng nhị phân phổ quát" để chia sẻ logic lõi giữa các nền tảng — web chỉ đơn giản là thêm một nền tảng cần hỗ trợ. Dự án của ông, Nema Studio, một phần mềm sản xuất âm nhạc (Digital Audio Workstation), dùng chung phần lõi cho bản native và bản web. Chiến lược sản phẩm gồm hai tầng: người dùng phổ thông thử bản web với khoảng 80–90% tính năng, còn người dùng nghiêm túc tải bản native đầy đủ. Vì "không ai bắt đầu với tư cách người dùng thường xuyên", bản web xóa bỏ rào cản cài đặt và trở thành cửa ngõ dẫn người dùng tới bản native. Tác giả cũng nhắc tới Tauri như một lựa chọn nhẹ hơn Electron nhờ dùng webview của hệ thống thay vì đóng gói kèm Chromium.

---

*Bài viết đã được viết lại bởi Claude Code với Opus 5.5 vào ngày 27/09/2026.*
