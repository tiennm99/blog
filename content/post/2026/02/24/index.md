---
title: "Newsletter #83"
date: 2026-02-24
tags: ["AI-Assisted"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #83.*

## [How Uber Scaled Data Replication to Move Petabytes Every Day](https://www.uber.com/en-IN/blog/scaled-data-replication/)

Uber đã chia sẻ về hành trình tối ưu hóa khả năng sao chép dữ liệu ở quy mô khổng lồ. Với hệ thống dữ liệu (data lake) vượt quá 350 PB phân bổ trên nhiều vùng địa lý, đội ngũ kỹ sư tại Uber đã đối mặt với thách thức lớn khi khối lượng dữ liệu cần sao chép hàng ngày tăng từ 250 TB lên 1 PB chỉ trong một quý.

Vấn đề cốt lõi nằm ở Apache Hadoop Distcp (Sao chép phân tán) - công cụ được dùng trong Hive Sync service để nhân bản dữ liệu giữa các môi trường on-premise và cloud. Khi số lượng bộ dữ liệu tăng từ 30,000 lên 144,000 và số lượng tác vụ nhân bản hàng ngày tăng vọt từ 10,000 lên 374,000, Distcp bắt đầu lộ rõ những hạn chế về hiệu năng.

Để giải quyết vấn đề, đội ngũ Uber đã áp dụng nhiều cải tiến quan trọng. Thứ nhất, họ chuyển các tác vụ tốn tài nguyên như Copy Listing và Input Splitting từ client sang Application Master, giúp giảm 90% độ trễ khi gửi tác vụ. Thứ hai, họ xử lý song song Copy Listing task bằng cách dùng nhiều luồng để xử lý song song nhiều tệp, giảm 60% p99 độ trễ. Thứ ba, việc xử lý song song Copy Committer task giúp giảm 97.29% thời gian ghép tệp. Cuối cùng, việc sử dụng "Uber jobs" cho các lần chuyển nhỏ (dưới 512 MB) đã giúp loại bỏ việc khởi chạy 268,000 containers mỗi ngày, tối ưu hóa việc sử dụng tài nguyên YARN đáng kể.

Nhờ những cải tiến này, Uber đã tăng 5 lần khả năng nhân bản dữ liệu gia tăng trong vòng một năm, và di chuyển thành công hơn 306 PB dữ liệu từ on-premises sang cloud. Bài viết cũng đề cập đến các kế hoạch tương lai như xử lý song song cài đặt quyền tệp, chia đầu vào, và triển khai bộ điều tiết băng thông động để tiếp tục cải thiện hiệu quả.

**Điểm chính:**
- Chuyển Copy Listing và Input Splitting sang Application Master giúp giảm 90% độ trễ khi gửi tác vụ
- Xử lý song song Copy Listing và Copy Committer tasks giảm đáng kể thời gian xử lý
- Uber jobs cho các lần chuyển nhỏ loại bỏ 268,000 lần khởi chạy container hàng ngày
- Tăng 5 lần khả năng nhân bản dữ liệu gia tăng
- Di chuyển thành công 306 PB dữ liệu từ on-premises sang cloud

## [How to write a good spec for AI agents](https://addyosmani.com/blog/good-spec/)

Addy Osmani đã chia sẻ một khung toàn diện để viết đặc tả hiệu quả cho các tác nhân lập trình AI. Bài viết giải quyết vấn đề nan giải mà nhiều nhà phát triển gặp phải: làm sao để viết đặc tả vừa đủ chi tiết để hướng dẫn AI, vừa không quá dài khiến mô hình bị quá tải bởi giới hạn ngữ cảnh.

Bài viết đưa ra năm nguyên tắc cốt lõi cho đặc tả tác nhân AI. Đầu tiên, bắt đầu với tầm nhìn cấp cao và để AI soạn thảo chi tiết - thay vì thiết kế quá mức ngay từ đầu, hãy bắt đầu với tuyên bố mục tiêu ngắn gọn và các yêu cầu cốt lõi, rồi để tác nhân mở rộng thành kế hoạch chi tiết. Thứ hai, cấu trúc đặc tả như một tài liệu yêu cầu sản phẩm chuyên nghiệp với sáu vùng cốt lõi: Lệnh, Kiểm thử, Cấu trúc dự án, Phong cách mã, Quy trình Git, và Giới hạn. Phân tích của GitHub từ hơn 2,500 tệp tác nhân cho thấy những đặc tả hiệu quả nhất luôn bao phủ đầy đủ các vùng này.

Thứ ba, chia nhỏ nhiệm vụ thành các lời nhắc mô đun thay vì dùng một lời nhắc lớn duy nhất - "lời nguyền của các chỉ dẫn" khiến hiệu suất AI giảm khi phải theo quá nhiều chỉ thị cùng lúc. Giải pháp là chia để trị: giải quyết từng phần một lúc và chỉ kéo ngữ cảnh liên quan khi cần. Thứ tư, tích hợp các kiểm tra tự tính và ba tầng giới hạn (Luôn làm, Hỏi trước, Không bao giờ làm) - cách tiếp cận này tinh tế hơn danh sách quy tắc phẳng và giúp tác nhân biết khi tiến hành, khi tạm dừng, khi dừng lại. Cuối cùng, coi đặc tả như vòng lặp lặp lại - kiểm tra sớm, thu thập phản hồi, tinh chỉnh đặc tả, và tận dụng công cụ để tự động hóa kiểm tra.

Bài viết cũng thảo luận về các bẫy cần tránh như lời nhắc mơ hồ ("Xây dựng cho tôi thứ gì đó thật tuyệt"), ngữ cảnh quá dài không có tóm tắt, bỏ qua đánh giá của con người, và "mã nhà bài" - mã được tạo bởi AI trông chắc chắn nhưng sụp đổ dưới các trường hợp biên. Addy nhấn mạnh sự khác biệt giữa "lập trình theo cảm hứng" cho tạo mẫu nhanh và "kỹ thuật có sự hỗ trợ của AI" cho sản xuất, sau này cần kỷ luật và đặc tả nghiêm ngặt.

**Điểm chính:**
- Bắt đầu với tầm nhìn cấp cao, để AI mở rộng thành kế hoạch chi tiết
- Cấu trúc đặc tả như PRD với 6 vùng cốt lõi: Lệnh, Kiểm thử, Cấu trúc, Phong cách, Git, Giới hạn
- Chia nhỏ nhiệm vụ thành lời nhắc mô đun để tránh "lời nguyền của các chỉ dẫn"
- Sử dụng ba tầng giới hạn: Luôn làm, Hỏi trước, Không bao giờ làm
- Coi đặc tả như vòng lặp lặp lại với kiểm tra và tinh chỉnh liên tục

## [Challenging projects every programmer should try](https://austinhenley.com/blog/challengingprojects.html)

Austin Z. Henley, Giáo sư Đảng ngữ tại Đại học Carnegie Mellon, đã chia sẻ danh sách các dự án thử thách mà mọi lập trình viên nên thử. Bài viết xuất phát từ thực tế rằng nhiều sinh viên và nhà phát triển chuyên nghiệp muốn bắt đầu dự án phụ nhưng không biết nên xây dựng gì. Austin đưa ra những dự án đã dạy cho ông rất nhiều kiến thức, và có thể xây dựng nhiều lần với mỗi lần học được những điều mới.

Bài viết liệt kê sáu dự án chính: Trình soạn thảo văn bản, Trò chơi 2D (Space Invaders), Trình biên dịch (Tiny BASIC), Hệ điều hành thu nhỏ, Bảng tính, và Trình mô phỏng máy chơi game console. Mỗi dự án đều có những thử thách riêng giúp nhà phát triển làm chủ các kỹ năng quan trọng. Ví dụ, Trình soạn thảo văn bản dạy về cấu trúc dữ liệu như dây thừng, bộ đệm khoảng, bảng mảnh để lưu trữ văn bản hiệu quả, cùng với các mẫu thiết kế như Memento và Command cho hoàn tác/làm lại. Space Invaders giúp hiểu vòng lặp trò chơi, xử lý đầu vào người dùng, và mẫu nhà máy để quản lý đối tượng trò chơi.

Dự án trình biên dịch được Austin mô tả là "mở mắt nhất" - dạy về phân tích từ vựng, phân tích cú pháp, phân tích đệ quy giảm dần, cây cú pháp trừu tượng, phân tích ngữ nghĩa, và tạo mã. Hệ điều hành thu nhỏ giúp hiểu biên dịch chéo, nạp khởi động, quản lý bộ nhớ, lập lịch, và hệ thống tệp. Hai dự án nâng cao hơn là Bảng tính (kết hợp thử thách từ trình soạn thảo văn bản và trình biên dịch) và Trình mô phỏng máy chơi game console (kết hợp trình biên dịch, hệ điều hành, và engine trò chơi).

Bài viết cũng bao gồm danh sách các gợi ý dự án từ cộng đồng như cơ sở dữ liệu từ đầu, trình dò tia, bản sao MS Paint, trình đồ họa vector, bộ giải mã hình ảnh, ứng dụng web phòng chat, và tiện ích dòng lệnh. Mỗi dự án đều có phần "Đọc thêm" với các tài nguyên để học sâu hơn.

**Điểm chính:**
- 6 dự án thử thách: Trình soạn thảo văn bản, Trò chơi 2D, Trình biên dịch, Hệ điều hành thu nhỏ, Bảng tính, Trình mô phỏng
- Trình soạn thảo văn bản dạy cấu trúc dữ liệu (dây thừng, bộ đệm khoảng, bảng mảnh) và mẫu hoàn tác/làm lại
- Space Invaders bao gồm vòng lặp trò chơi, xử lý đầu vào, mẫu nhà máy, máy trạng thái
- Dự án trình biên dịch khám phá phân tích từ vựng, phân tích cú pháp, cây cú pháp, phân tích ngữ nghĩa, tạo mã
- Hệ điều hành thu nhỏ giúp hiểu biên dịch chéo, nạp khởi động, quản lý bộ nhớ, lập lịch

## [Unconventional PostgreSQL Optimizations](https://hakibenita.com/postgresql-unconventional-optimizations)

Haki Benita đã chia sẻ các kỹ thuật tối ưu hóa PostgreSQL phi truyền thống mà các nhà phát triển thường không nghĩ đến. Bài viết bắt đầu với thực tế rằng khi tối ưu hóa cơ sở dữ liệu, developers thường dùng những công cụ cũ kỹ: viết lại truy vấn, thêm chỉ mục, phi chuẩn hóa, phân tích, dọn dẹp, lặp lại. Các kỹ thuật truyền thống hiệu quả, nhưng đôi khi sáng tạo có thể mang lại kết quả tốt hơn.

Bài viết bao gồm ba kỹ thuật chính. Đầu tiên, loại bỏ quét toàn bộ bảng dựa trên ràng buộc kiểm tra bằng cách bật `constraint_exclusion`. Khi một nhà phân tích vô tình viết truy vấn với giá trị không tồn tại (ví dụ: `plan = 'Pro'` thay vì `'pro'`), PostgreSQL sẽ quét toàn bộ bảng. Tuy nhiên, với ràng buộc kiểm tra, cơ sở dữ liệu biết rằng không có hàng nào có giá trị này và có thể bỏ qua quét hoàn toàn. Tùy chọn này tắt theo default vì nó thêm overhead cho kế hoạch truy vấn, nhưng rất hữu ích cho các môi trường báo cáo nơi người dùng có thể viết truy vấn thủ công.

Thứ hai, tối ưu hóa cho tính đơn giản ít hơn bằng cách sử dụng chỉ mục dựa trên hàm. Thay vì lập chỉ mục toàn bộ timestamp (214 MB cho 10 triệu hàng), chúng ta có thể lập chỉ mục chỉ phần ngày (66 MB) bằng cách dùng `date_trunc`. Điều này giảm kích thước chỉ mục xuống hơn 3 lần và giúp truy vấn nhanh hơn. Để đảm bảo mọi người dùng cùng biểu thức đúng, bài viết đề xuất sử dụng cột được tạo ảo (virtual generated columns) - tính năng mới trong PostgreSQL 18.

Thứ ba, thực thi tính duy nhất với chỉ mục băm. Khi lưu trữ các URL lớn (kích thước chỉ mục B-Tree là 154 MB), việc sử dụng chỉ mục băm (32 MB) có thể tiết kiệm đáng kể không gian lưu trữ. Mặc dù PostgreSQL không hỗ trợ các chỉ mục băm duy nhất trực tiếp, chúng ta có thể sử dụng ràng buộc loại trừ với chỉ mục băm để thực thi tính duy nhất. Tuy nhiên, cách tiếp cận này có một số hạn chế như không thể tham chiếu bởi khóa ngoại và hạn chế với mệnh đề `ON CONFLICT`.

**Điểm chính:**
- Bật `constraint_exclusion` để loại bỏ quét bảng cho các giá trị vi phạm ràng buộc kiểm tra
- Sử dụng chỉ mục dựa trên hàm và cột được tạo ảo để giảm kích thước chỉ mục
- Chỉ mục ngày (66 MB) nhỏ hơn 3 lần so với chỉ mục timestamp đầy đủ (214 MB)
- Thực thi tính duy nhất với ràng buộc loại trừ và chỉ mục băm cho các giá trị lớn
- Chỉ mục băm (32 MB) nhỏ hơn 5 lần so với chỉ mục B-Tree (154 MB) cho URL
- Hạn chế: không thể tham chiếu bởi khóa ngoại và không hỗ trợ `ON CONFLICT DO UPDATE`

## [Software engineering when machine writes the code](https://www.shayon.dev/post/2026/19/software-engineering-when-the-machine-writes-code)

Shayon Majumdar đã chia sẻ suy nghĩ sâu sắc về tương lai của kỹ thuật phần mềm khi máy móc có thể viết mã. Bài viết bắt đầu bằng việc nhắc lại cuộc khủng hoảng phần mềm năm 1968, khi các nhà khoa học máy tính nhận ra rằng máy tính đã trở nên quá mạnh đối với các phương pháp lập trình hiện có. Ngày nay, chúng ta đối mặt với sự gián đoạn tương tự nhưng theo hướng ngược lại: máy móc có thể viết mã tốt hơn và nhanh hơn con người.

Tác giả không phê phán các công cụ lập trình có sự hỗ trợ của AI. Ông thừa nhận rằng chúng giúp ông vận chuyển tính năng nhanh hơn bao giờ hết - những gì mất một tuần giờ chỉ mất ít hơn một ngày. Tuy nhiên, ông lo ngại rằng trong sự vội vã nắm bắt lợi suất, chúng ta có thể đang đánh đổi một thứ gì đó quan trọng: sự hiểu biết sâu sắc về cách hoạt động của hệ thống.

Bài viết đưa ra nghịch lý Jevons - khi việc sử dụng tài nguyên trở nên hiệu quả hơn, tổng tiêu thụ tài nguyên thực sự tăng lên chứ không giảm. Tương tự, nếu AI giúp viết mã hiệu quả hơn gấp 10 lần, chúng ta sẽ không viết ít mã hơn mà sẽ viết nhiều mã hơn bao giờ hết, tạo ra các hệ thống có độ phức tạp chưa từng có. Điều này đặt ra câu hỏi quan trọng: hiểu biết về mã mà bạn không tự viết có ý nghĩa gì?

Shayon phân biệt rõ giữa mã bạn viết và mã bạn xem xét. Khi viết mã, bạn xây dựng mô hình tinh thần thông qua quá trình sáng tạo, đưa ra hàng chục quyết định nhỏ, suy nghĩ về các trường hợp biên. Khi xem xét mã người khác, bạn chỉ đang tái tạo lại mô hình tinh thần. Với mã được tạo bởi AI, khoảng cách này còn lớn hơn vì AI có thể đưa ra các quyết định vi mô khác với bạn.

Bài viết cũng lo ngại về kỹ sư mới bắt đầu. Nếu bạn chưa bao giờ viết một máy trạng thái thủ công, liệu bạn có phát triển được trực giác về cách máy trạng thái có thể bị lỗi? Con đường truyền thống để trở thành kỹ sư lành nghề liên quan đến nhiều việc lãng phí thời gian - viết mã sau này vứt đi, triển khai thứ gì đó từ đầu mà thư viện có thể làm cho bạn, dành hàng giờ để gỡ lỗi. Quá trình này kém hiệu quả nhưng xây dựng điều quan trọng: nhận diện mẫu và trực giác.

Tác giả đề xuất cách sử dụng AI giúp gìn giữ và thậm chí tăng cường học tập thay vì thay thế nó. Một cách tiếp cận là sử dụng AI như "người hướng dẫn Socrates" - thay vì yêu cầu AI viết mã, hãy yêu cầu nó giải thích khái niệm, mô tả các sự đánh đổi. Một kỹ thuật khác là sử dụng AI để xem xét mã của bạn, cung cấp lợi ích của "cặp mắt thứ hai" mà không mất đi việc học từ việc tự viết mã.

Cuối cùng, Shayon đề xuất mô hình vùng để sử dụng AI: mã logic cốt lõi của bạn (như thuật toán đồng thuận) nên được thực hiện thủ công hoặc ít nhất là được hiểu rất kỹ; mã quan trọng nhưng tiêu chuẩn (như endpoint API) có thể sử dụng AI nhiều hơn; và mã thực sự là boilerplate (như scaffold kiểm tra) nên để AI dẫn đầu gần như hoàn toàn.

**Điểm chính:**
- Nghịch lý Jevons: AI làm việc hiệu quả hơn gấp 10 lần nhưng chúng ta sẽ viết nhiều mã hơn bao giờ hết
- Sự khác biệt quan trọng giữa mã bạn viết và mã bạn xem xét
- Lo ngại về kỹ sư mới bỏ qua giai đoạn "đấu tranh" cần thiết để xây dựng trực giác
- Sử dụng AI như người hướng dẫn Socrates để giải thích thay vì viết mã trực tiếp
- Mô hình vùng: logic cốt lõi (thủ công), mã tiêu chuẩn (AI hỗ trợ), boilerplate (AI dẫn đầu)
- Các kỹ sư thịnh vượng sẽ là người có thể làm việc hiệu quả với AI trong khi duy trì sự hiểu biết sâu sắc

## [A Guide to Effective Prompt Engineering](https://blog.bytebytego.com/p/a-guide-to-effective-prompt-engineering)

ByteByteGo đã chia sẻ hướng dẫn toàn diện về kỹ thuật prompt engineering - quá trình tạo ra các hướng dẫn giúp mô hình ngôn ngữ AI tạo ra kết quả mong muốn. Bài viết nhấn mạnh rằng mặc dù bất kỳ ai cũng có thể viết prompt, nhưng không phải ai cũng có thể viết prompt liên tục tạo ra kết quả chất lượng cao. Sự khác biệt giống như giữa có thể giao tiếp và có thể giao tiếp hiệu quả.

Bài viết giải thích cấu trúc của một prompt thường bao gồm bốn thành phần: mô tả tác vụ (giải thích chúng ta muốn mô hình làm gì), ngữ cảnh (cung cấp thông tin nền), ví dụ (minh họa hành vi mong muốn), và tác vụ cụ thể (câu hỏi hoặc hành động cần thực hiện). Các API mô hình hiện đại cho phép chia prompt thành system prompt (chứa mô tả tác vụ và hướng dẫn vai trò) và user prompt (chứa tác vụ thực tế).

Tính rõ ràng là yếu tố quan trọng nhất. Chúng ta nên giải thích chính xác những gì chúng ta muốn, định nghĩa bất kỳ hệ thống điểm nào hoặc định dạng mong đợi, và loại bỏ các giả định về những gì mô hình có thể đã biết. Ngữ cảnh cũng quan trọng như vậy - cung cấp thông tin liên quan giúp mô hình hoạt động tốt hơn và giảm ảo giác.

Bài viết giới thiệu học tập trong ngữ cảnh - khả năng của mô hình học hành vi mới từ các ví dụ được cung cấp trong chính prompt. Các mô hình thường hiểu hướng dẫn tốt hơn ở đầu và cuối của prompt so với giữa, một hiện tượng đôi khi được gọi là vấn đề "kim trong đống rơm".

Năm kỹ thuật prompt chính được thảo luận. Đầu tiên, zero-shot prompting - đưa ra hướng dẫn mà không cung cấp ví dụ, hoạt động tốt nhất cho các tác vụ đơn giản. Thứ hai, few-shot prompting - cung cấp từ hai đến năm ví dụ để minh họa hành vi mong muốn, đặc biệt hữu ích khi cần định dạng cụ thể. Thứ ba, chain-of-thought prompting - yêu cầu mô hình suy nghĩ từng bước trước khi trả lời, cải thiện đáng kể hiệu suất cho các tác vụ suy luận phức tạp. Thứ tư, role prompting - gán một nhân cách cụ thể cho mô hình để ảnh hưởng đến góc nhìn và phong cách phản hồi. Thứ năm, prompt chaining - chia các tác vụ phức tạp thành các tác vụ con nhỏ hơn, mỗi tác vụ có prompt riêng.

Các phương pháp tốt bao gồm: rõ ràng và cụ thể, cung cấp ngữ cảnh đủ, chỉ định định dạng đầu ra, sử dụng ví dụ một cách chiến lược, lặp lại và thử nghiệm, và phiên bản hóa prompt. Các bẫy thường cần tránh: quá mơ hồ, quá phức tạp, bỏ qua định dạng đầu ra, và không kiểm tra đủ.

**Điểm chính:**
- Prompt engineering = khác biệt giữa giao tiếp và giao tiếp hiệu quả
- Cấu trúc prompt: mô tả tác vụ, ngữ cảnh, ví dụ, tác vụ cụ thể
- System prompt (hướng dẫn vai trò) vs user prompt (tác vụ thực tế)
- Vấn đề "kim trong đống rơm": mô hình hiểu tốt hơn ở đầu/cuối prompt
- 5 kỹ thuật chính: zero-shot, few-shot, chain-of-thought, role prompting, prompt chaining
- Nguyên tắc: rõ ràng, ngữ cảnh đủ, định dạng đầu ra, dùng ví dụ chiến lược, lặp lại
