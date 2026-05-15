---
title: "Newsletter #35"
date: 2025-07-24
tags: [ "AI-Assisted", "WebAssembly", "WASM", "Cross-platform", "Performance" ]
categories: [ "Newsletter" ]
---

*Mời bạn thưởng thức Newsletter #35.*

## [The magic of software; or, what makes a good engineer also makes a good engineering organization](https://moxie.org/2024/09/23/a-good-engineer.html)

"Phép màu của phần mềm" không nằm ở việc coi các công nghệ như những hộp đen bí ẩn, mà ở sự hiểu biết sâu sắc về cách chúng hoạt động. Một kỹ sư giỏi không chỉ sử dụng các công cụ và công nghệ một cách bề ngoài, mà còn tìm hiểu về cơ chế bên trong, khám phá những khả năng không ngờ tới, và từ đó tạo ra những giải pháp sáng tạo.

Tác giả chỉ ra rằng quá trình phát triển phần mềm không phải là một chiều từ ý tưởng đến triển khai. Thay vào đó, việc hiểu sâu về công nghệ có thể định hình lại tầm nhìn ban đầu, tạo ra những cơ hội mới mà trước đó không ai nghĩ tới. Điều này đòi hỏi kỹ sư phải có tính tò mò, sẵn sàng khám phá và không ngại đi sâu vào các lớp trừu tượng.

Nguyên tắc này cũng áp dụng cho việc xây dựng tổ chức kỹ thuật hiệu quả. Thay vì tạo ra các team hoạt động như những "hộp đen" độc lập, các tổ chức cần khuyến khích sự kết nối, học hỏi lẫn nhau và chia sẻ hiểu biết sâu về công nghệ. Chỉ khi chúng ta thực sự hiểu những gì mình đang làm việc cùng, chúng ta mới có thể tạo ra được những điều kỳ diệu trong phần mềm.

**Điểm mấu chốt**: Sự sáng tạo thực sự đến từ việc hiểu biết sáng sủa, không phải từ việc áp dụng máy móc các "thực hành tốt nhất" mà không hiểu bản chất.

## [Redis Is Open Source Again. But Is It Too Late?](https://blog.abhimanyu-saharan.com/posts/redis-is-open-source-again-but-is-it-too-late)

Sau một năm gây tranh cãi, Redis đã quay trở lại với mô hình mã nguồn mở hoàn toàn vào tháng 5/2025 với giấy phép AGPLv3. Câu chuyện bắt đầu từ tháng 3/2024 khi Redis chuyển sang mô hình giấy phép kép (RSALv2 và SSPLv1) nhằm ngăn các nhà cung cấp đám mây kiếm tiền từ phần mềm mà không đóng góp lại cho cộng đồng.

Quyết định này đã tạo ra làn sóng phản ứng mạnh mẽ từ cộng đồng. Trong khi Microsoft đã ký thỏa thuận thương mại, Amazon và Google lại không làm vậy. Thay vào đó, họ đã ủng hộ một dự án fork mang tên Valkey, được lưu trữ dưới sự bảo trợ của Linux Foundation. Thậm chí một số hệ điều hành như Arch Linux đã thay thế Redis bằng Valkey hoàn toàn.

Redis 8 ra mắt với nhiều tính năng ấn tượng: hỗ trợ vector sets cho các ứng dụng AI, tích hợp sẵn JSON, chuỗi thời gian và kiểu dữ liệu xác suất. Đặc biệt, người sáng tạo ban đầu Salvatore Sanfilippo đã quay trở lại dự án.

Tuy nhiên, câu hỏi "đã quá muộn?" vẫn còn nguyên giá trị. Nhiều lập trình viên đã di chuyển sang Valkey, lòng tin của cộng đồng đã bị tổn hại nghiêm trọng, và sự hoài nghi về ý định dài hạn của Redis Ltd. vẫn tồn tại. Như tác giả nhận xét: "Lòng tin được xây dựng qua nhiều năm nhưng có thể mất chỉ trong một khoảnh khắc."

**Khuyến nghị thực tế**: Với các team đang sử dụng Valkey, ít có lý do để chuyển lại. Với các dự án mới, Redis 8 vẫn là một lựa chọn mã nguồn mở đáng cân nhắc.

## [Write the most clever code you possibly can](https://buttondown.com/hillelwayne/archive/write-the-most-clever-code-you-possibly-can)

Hillel Wayne đưa ra một quan điểm có vẻ trái ngược với lời khuyên thông thường: hãy viết mã "thông minh" nhất có thể. Tuy nhiên, ông không khuyến khích việc áp dụng mã phức tạp trong sản xuất, mà coi đây là một phương pháp luyện tập có mục đích để nâng cao kỹ năng lập trình.

**Lợi ích của việc viết "clever code"**:
- Giúp lập trình viên nắm vững các tính năng phức tạp của ngôn ngữ
- Hiểu sâu hơn về cách các khái niệm lập trình kết hợp với nhau
- Chuẩn bị cho việc giải quyết vấn đề phức tạp với công cụ hạn chế
- Xây dựng mối quan hệ kỹ thuật với đồng nghiệp thông qua thảo luận

**Nguyên tắc quan trọng cần nhớ**:
- **Không bao giờ** commit mã "thông minh" vào production
- Sử dụng như một bài tập học tập, không phải chiến lược sản xuất
- Đảm bảo đồng nghiệp hiểu rõ đây chỉ là thực hành, không phải đề xuất triển khai
- Nếu buộc phải sử dụng giải pháp phức tạp, hãy tài liệu hóa chi tiết

**Cách tiếp cận được khuyến nghị**:
- Giải quyết cùng một vấn đề bằng cả cách đơn giản và phức tạp
- Viết script cá nhân sử dụng kỹ thuật nâng cao
- Thực hành trong môi trường kiểm soát, không phải production

Ví dụ về "clever code" bao gồm list comprehension phức tạp, kết hợp nhiều tính năng ngôn ngữ trong một hàm, hoặc sử dụng các cấu trúc ngôn ngữ theo cách không thông thường.

**Triết lý cốt lõi**: Mã "thông minh" là công cụ xây dựng kỹ năng giúp lập trình viên mở rộng hiểu biết kỹ thuật và khả năng giải quyết vấn đề, chứ không phải chiến lược cho môi trường sản xuất.

## [Semantic Unit Testing](https://www.alexmolas.com/2025/04/09/semantic-unit-testing.html)

Semantic Unit Testing là một phương pháp kiểm thử đột phá sử dụng các mô hình ngôn ngữ lớn (LLM) để đánh giá xem việc triển khai một hàm có khớp với hành vi được mô tả trong tài liệu hay không, mà không cần thực thi mã thực tế.

**Cách thức hoạt động**:
1. Thu thập thông tin hàm (docstring, mã nguồn, dependencies)
2. Xây dựng prompt chi tiết cho LLM
3. Phân tích tính đúng đắn về mặt ngữ nghĩa của hàm
4. Tạo ra kết quả có cấu trúc với lý do và trạng thái pass/fail

**Ví dụ thực tế**:
```python
def multiply(x: int, y: int) -> int:
    """Nhân x với y"""
    return x + y  # Triển khai cố ý sai

tester = suite(model_name="openai/o3-mini")
result = tester(multiply)
# LLM phát hiện triển khai không khớp với docstring
```

**Lợi ích đáng kể**:
- Độ bao phủ kiểm thử toàn diện
- Tích hợp dễ dàng với pytest
- Phát hiện lỗi tiềm ẩn sớm
- Bổ sung cho kiểm thử truyền thống
- Có thể sử dụng mô hình AI cục bộ

**Hạn chế cần lưu ý**:
- Không thay thế hoàn toàn kiểm thử truyền thống
- LLM có thể "ảo giác" hoặc mắc lỗi
- Chi phí cao với codebase lớn

Tác giả khuyến nghị sử dụng semantic unit testing như một công cụ bổ trợ, không phải phương pháp kiểm thử chính, nhấn mạnh tiềm năng của nó nhưng vẫn giữ góc nhìn thực tế về các hạn chế.

## [SOLID Principles in Java (With Real life Examples)](https://dev.to/chhavirana/understanding-solid-principles-in-java-with-real-life-examples-1ked)

Nguyên tắc SOLID là năm nguyên tắc thiết kế hướng đối tượng quan trọng giúp mã nguồn trở nên dễ hiểu, linh hoạt và bảo trì. Bài viết này sử dụng hệ thống đặt đồ ăn như bối cảnh thực tế để giải thích từng nguyên tắc một cách sinh động.

**1. Single Responsibility Principle (SRP)**:
Mỗi lớp chỉ nên có một trách nhiệm duy nhất. Thay vì một lớp xử lý đồng thời việc đặt hàng, tạo hóa đơn và gửi email, nên tách thành các lớp riêng biệt: OrderProcessor, InvoiceGenerator, và EmailNotifier.

**2. Open/Closed Principle (OCP)**:
Các thành phần phần mềm nên mở cho việc mở rộng nhưng đóng cho việc sửa đổi. Sử dụng đa hình và interface để thêm phương thức thanh toán mới mà không cần thay đổi mã hiện có.

**3. Liskov Substitution Principle (LSP)**:
Các lớp con phải có thể thay thế hoàn toàn lớp cha mà không gây lỗi. Ví dụ về việc thiết kế lại các chế độ giao hàng để có hành vi nhất quán và dự đoán được.

**4. Interface Segregation Principle (ISP)**:
Interface nên tập trung và phù hợp với yêu cầu cụ thể của từng client. Thay vì một interface lớn cho đối tác nhà hàng, nên chia thành các interface nhỏ hơn như OrderAcceptance và FeedbackHandler.

**5. Dependency Inversion Principle (DIP)**:
Các module cấp cao nên phụ thuộc vào abstraction, không phải concrete implementation. Tạo interface Notifier cho phép chuyển đổi dễ dàng giữa email, SMS và các phương thức thông báo khác thông qua dependency injection.

**Kết luận thực tế**: Các nguyên tắc SOLID không chỉ là lý thuyết mà là công cụ thực tế giúp viết mã sạch, có thể mở rộng và bảo trì. Việc áp dụng đúng các nguyên tắc này giúp hệ thống phần mềm linh hoạt hơn trước những thay đổi và yêu cầu mới.

## [A year on, Valkey charts path to v9 after break from Redis](https://www.theregister.com/2025/05/15/a_year_of_valkey)

Sau một năm tách khỏi Redis, Valkey đã chứng tỏ sức sống mạnh mẽ và đang vạch ra lộ trình phát triển bền vững. Dự án này được sinh ra từ sự phản đối với việc Redis Labs thay đổi giấy phép gây tranh cãi, dẫn đến làn sóng các contributor rời bỏ Redis, bao gồm Madelyn Olson - hiện là đồng maintainer của Valkey.

**Thành tựu đáng kể trong năm đầu**:
- Phát hành phiên bản 8.0 và 8.1 với nhiều cải tiến
- Bổ sung tính năng quan sát (observability) như thống kê slot, trước đây bị Redis chặn
- Cải thiện hiệu suất để bù đắp chi phí tính toán tối thiểu
- Lên kế hoạch phát hành phiên bản 9 với những thay đổi đáng kể hơn

**Xây dựng cộng đồng đa dạng**:
Olson nhấn mạnh: "Tôi thực sự không muốn đây là dự án của một nhà cung cấp duy nhất." Valkey đã mở rộng đội ngũ maintainer và Ủy ban Chỉ đạo Kỹ thuật, thu hút những contributor như Ricardo Dias từ Percona. Dự án cam kết tránh tình trạng kiệt sức bằng cách phân phối trách nhiệm.

**Chiến lược ổn định và hỗ trợ**:
- Cam kết hỗ trợ ít nhất 3 năm cho mỗi phiên bản
- Chỉ định phiên bản minor cuối cùng của mỗi major release để hỗ trợ 5 năm
- Tiếp cận thận trọng với các thay đổi để giảm thiểu gián đoạn
- Không thu thập telemetry, dựa vào phản hồi từ người dùng và nhà cung cấp

**Tầm nhìn tương lai**: Valkey đang tạo dựng động lực với trọng tâm là tính ổn định, hiệu suất và phát triển dựa trên cộng đồng. Đây là minh chứng cho thấy một dự án mã nguồn mở có thể phát triển mạnh mẽ khi có sự dẫn dắt đúng đắn và cộng đồng ủng hộ.

## [Stack Overflow is almost dead](https://blog.pragmaticengineer.com/stack-overflow-is-almost-dead)

Stack Overflow - nền tảng hỏi đáp lập trình từng là điểm đến thiết yếu của hàng triệu lập trình viên - đang trải qua sự suy giảm nghiêm trọng. Số lượng câu hỏi mỗi tháng đã giảm xuống mức tương đương thời điểm trang web mới ra mắt năm 2009, đánh dấu sự kết thúc của một kỷ nguyên.

**Quá trình suy giảm qua các giai đoạn**:
- **2014**: Bắt đầu suy giảm với chính sách kiểm duyệt nghiêm ngặt hơn
- **Tháng 3/2020**: Đại dịch tạm thời tăng lưu lượng truy cập
- **Tháng 6/2021**: Trang web được bán cho Prosus với giá 1.8 tỷ USD
- **Tháng 11/2022**: ChatGPT ra mắt, đẩy nhanh sự suy giảm

**Nguyên nhân chính dẫn đến sự suy giảm**:

1. **Chính sách kiểm duyệt nghiêm ngặt (từ 2014)**:
   - Câu hỏi bị đóng nhanh hơn
   - Loại bỏ bài viết "chất lượng thấp" hiệu quả hơn
   - Tạo cảm giác không thân thiện với người dùng mới

2. **Tác động của công cụ AI**:
   - ChatGPT cung cấp câu trả lời nhanh hơn và lịch sự hơn
   - Được huấn luyện trên dữ liệu Stack Overflow, chất lượng tương đương
   - Loại bỏ nhu cầu sử dụng nền tảng Q&A có kiểm duyệt con người

**Triển vọng tương lai**: Tác giả dự đoán Stack Overflow có thể sẽ đóng cửa hoặc được bán. Tuy nhiên, ông vẫn lạc quan rằng cộng đồng lập trình viên sẽ tiếp tục tồn tại thông qua các nền tảng thay thế như Discord, WhatsApp, hay Telegram.

**Suy ngẫm**: Đây là kết thúc của một kỷ nguyên quan trọng trong lịch sử phát triển phần mềm, khi một nền tảng từng giúp đỡ hàng triệu lập trình viên giờ đây đối mặt với sự thay thế bởi AI. Điều này đặt ra câu hỏi về tương lai của việc chia sẻ kiến thức trong cộng đồng lập trình.

## [Why I use WebAssembly](https://nasso.dev/blog/why-i-use-wasm)

WebAssembly (WASM) đang chứng tỏ là một công nghệ đột phá cho phép các lập trình viên phát triển ứng dụng cross-platform một cách hiệu quả. Tác giả chia sẻ những lý do thực tế khiến ông lựa chọn WASM cho các dự án của mình.

**Quản lý trạng thái ứng dụng hiệu quả**:
WASM cho phép xử lý phía client, loại bỏ các round trip tới server không cần thiết. Điều này giúp theo dõi tiến trình thời gian thực cho các thao tác phức tạp và giảm đáng kể độ phức tạp của hạ tầng cũng như chi phí hosting.

**Phát triển đa nền tảng thông minh**:
WASM hoạt động như "định dạng binary toàn cầu" để chia sẻ logic ứng dụng cốt lõi giữa các nền tảng. Thay vì phát triển riêng biệt cho web và native, lập trình viên có thể coi web như một nền tảng khác cần hỗ trợ với công sức tối thiểu.

**Lợi ích hiệu suất đo được được**:
Figma đã giảm thời gian tải 3 lần nhờ WASM. Công nghệ này cho phép port mã native hiện có lên web và hỗ trợ các ứng dụng phức tạp như file converter chạy hoàn toàn trong trình duyệt.

**Chiến lược sản phẩm thực tế**:
Tác giả áp dụng phương pháp "80-90% tính năng hoạt động phổ quát" - cung cấp đủ tính năng cốt lõi để người dùng trải nghiệm, tạo ra con đường dẫn tới phiên bản native đầy đủ.

**Ví dụ thực tế**: Tác giả đang phát triển Nema Studio, một Digital Audio Workstation cross-platform, nhắm tới các nhạc sĩ muốn thử nghiệm nhanh các tính năng cốt lõi mà không cần hỗ trợ plugin phức tạp.

**Tầm nhìn công nghệ**: "WebAssembly là cách để chia sẻ mã giữa các nền tảng... web chỉ đơn giản trở thành một nền tảng khác cần hỗ trợ!" Điều này mở ra khả năng sử dụng các công cụ như FFmpeg trong trình duyệt và tương thích với framework như Tauri.

---

*Bài viết đã được review và cập nhật bởi Claude Code với Opus 4.7 (1M context).*
