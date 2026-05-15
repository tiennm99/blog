---
title: "Newsletter #45"
date: 2025-08-04
tags: [ "AI-Assisted", "Productivity", "Career", "Paul Graham", "Essay" ]
categories: [ "Newsletter" ]
---

*~~Bài post được thực hiện bởi Cline + Kimi K2.~~ Mời bạn thưởng thức Newsletter #45.*

## [The Best](https://www.paulgraham.com/best.html)

Trong bài viết "The Best", Paul Graham chia sẻ quan điểm sâu sắc về cách nhận diện và làm việc với những người giỏi nhất trong lĩnh vực của họ. Ông cho rằng việc xác định ai là "người giỏi nhất" không chỉ đơn thuần dựa trên kỹ năng kỹ thuật, mà còn phụ thuộc vào cách họ tiếp cận vấn đề và động lực bên trong.

Graham nhấn mạnh rằng những người giỏi nhất thường có đặc điểm chung là sự tò mò sâu sắc và khả năng tự học. Họ không chỉ giỏi vì biết nhiều, mà vì luôn muốn hiểu sâu hơn nữa. Điều này khiến họ không ngừng cải thiện và thích nghi với những thách thức mới.

Một điểm quan trọng khác là cách những người giỏi nhất xử lý thất bại. Thay vì xem thất bại là điểm dừng, họ coi đó là cơ hội để học hỏi và phát triển. Điều này tạo ra một vòng lặp tích cực giúp họ tiến bộ nhanh chóng hơn những người khác.

### Những điểm chính cần ghi nhớ:

- **Tò mò là động lực cốt lõi**: Người giỏi nhất không bao giờ ngừng học hỏi
- **Tự học là kỹ năng quan trọng**: Họ chủ động tìm kiếm kiến thức thay vì chờ đợi
- **Thất bại là bước đệm**: Quan điểm tích cực về thất bại giúp họ phát triển nhanh
- **Chất lượng hơn số lượng**: Tập trung vào việc làm tốt một vài việc thay vì làm nhiều việc ở mức trung bình

Bài học rút ra cho các lập trình viên: Hãy nuôi dưỡng sự tò mò, chủ động học hỏi, và đừng sợ thất bại. Đây là con đường để trở thành người giỏi nhất trong lĩnh vực của mình.

## [AI Tools Make Developers 19% Slower, Not Faster](https://threadreaderapp.com/thread/1943360399220388093.html)

Một nghiên cứu được thực hiện bởi METR (Machine Intelligence Research Institute) đã cho kết quả gây bất ngờ: các công cụ AI lập trình thực tế khiến lập trình viên chậm hơn 19% thay vì nhanh hơn như nhiều người tin. Đây là kết quả từ một thử nghiệm kiểm soát ngẫu nhiên với các lập trình viên open-source có kinh nghiệm.

Nghiên cứu này thách thức giả định phổ biến rằng AI luôn giúp tăng năng suất. Trong khi các lập trình viên cảm thấy họ nhanh hơn 20% khi sử dụng AI, dữ liệu thực tế cho thấy họ hoàn thành công việc chậm hơn đáng kể. Điều này cho thấy có sự khác biệt lớn giữa cảm nhận chủ quan và hiệu quả thực tế.

### Những yếu tố có thể ảnh hưởng:

- **Thời gian review code AI**: Cần thời gian để kiểm tra và sửa lỗi trong code do AI tạo ra
- **Context switching**: Việc chuyển đổi giữa viết code và hướng dẫn AI có thể làm gián đoạn flow
- **Over-reliance**: Phụ thuộc quá mức vào AI có thể làm giảm khả năng tư duy phản biện
- **Quality vs speed trade-off**: Code AI có thể nhanh nhưng cần nhiều thời gian để tinh chỉnh

### Bài học thực tế:

- **Đừng tin hoàn toàn vào cảm nhận**: Cần đo lường hiệu quả thực tế thay vì dựa vào cảm giác
- **AI là công cụ, không phải phép màu**: Sử dụng AI đúng cách và đúng ngữ cảnh
- **Cân nhắc trade-offs**: Đánh giá kỹ lợi ích và chi phí khi áp dụng AI
- **Tiếp tục phát triển kỹ năng**: AI hỗ trợ nhưng không thay thế hoàn toàn kỹ năng lập trình

Bài học cho các lập trình viên: AI là công cụ mạnh mẽ nhưng cần được sử dụng một cách chiến lược. Hãy đo lường hiệu quả thực tế và điều chỉnh cách sử dụng AI để đạt được lợi ích tối đa mà không làm giảm chất lượng công việc.

## [Evolution of Uber's Search Platform](https://www.uber.com/en-IN/blog/evolution-of-ubers-search-platform/)

Bài viết này chia sẻ hành trình phát triển nền tảng tìm kiếm của Uber trong suốt 10 năm qua, từ một hệ thống đơn giản ban đầu đến một kiến trúc phức tạp phục vụ hàng triệu yêu cầu mỗi ngày. Đây là ví dụ điển hình cho việc thiết kế hệ thống có khả năng mở rộng theo thời gian.

Uber bắt đầu với Elasticsearch đơn giản cho nhu cầu tìm kiếm cơ bản, nhưng khi lượng người dùng tăng lên, họ phải đối mặt với nhiều thách thức về hiệu suất và khả năng mở rộng. Giải pháp của họ là chuyển sang kiến trúc microservices với nhiều thành phần chuyên biệt, mỗi thành phần xử lý một khía cạnh cụ thể của việc tìm kiếm.

Một điểm quan trọng trong quá trình phát triển là việc Uber áp dụng chiến lược "strangler fig" - dần dần thay thế các thành phần cũ bằng các thành phần mới mà không làm gián đoạn dịch vụ. Điều này cho phép họ cải thiện hệ thống trong khi vẫn duy trì hoạt động kinh doanh.

### Những bài học quan trọng:

- **Bắt đầu đơn giản**: Đừng over-engineer từ đầu, hãy phát triển theo nhu cầu thực tế
- **Chiến lược strangler fig**: Thay thế dần dần thay vì đập đi xây lại toàn bộ
- **Microservices architecture**: Chia nhỏ hệ thống để dễ quản lý và mở rộng
- **Monitoring và observability**: Theo dõi hiệu suất để đưa ra quyết định dựa trên dữ liệu
- **Incremental migration**: Di chuyển dữ liệu và traffic từng phần để giảm rủi ro

Bài học cho các kỹ sư: Việc xây dựng hệ thống lớn là một quá trình liên tục cải tiến. Hãy bắt đầu đơn giản, đo lường hiệu suất, và phát triển theo nhu cầu thực tế của người dùng.

## [Vercel](https://leerob.com/vercel)

Bài viết này chia sẻ trải nghiệm của Lee Robinson khi làm việc tại Vercel - công ty đứng sau Next.js và nền tảng triển khai ứng dụng web hiện đại. Đây là cái nhìn sâu sắc về văn hóa và quy trình phát triển sản phẩm tại một công ty công nghệ hàng đầu.

Lee mô tả Vercel như một nơi tập trung vào việc xây dựng công cụ cho nhà phát triển, với văn hóa ưu tiên trải nghiệm người dùng và hiệu suất. Điều đặc biệt là cách họ phát triển sản phẩm bằng cách "ăn thịt chính mình" - sử dụng chính các công cụ mà họ xây dựng để phát triển sản phẩm của mình.

Một điểm nổi bật là cách Vercel tiếp cận việc ra mắt tính năng mới. Họ không chỉ tập trung vào việc xây dựng tính năng, mà còn đầu tư vào việc giáo dục cộng đồng và tạo tài liệu chất lượng cao. Điều này giúp người dùng có thể áp dụng công nghệ mới một cách hiệu quả.

### Những điểm đáng học hỏi:

- **Developer-first mindset**: Luôn đặt trải nghiệm của nhà phát triển lên hàng đầu
- **Dogfooding**: Sử dụng chính sản phẩm mình xây dựng để cải thiện liên tục
- **Documentation as marketing**: Tài liệu tốt là cách marketing hiệu quả nhất
- **Community building**: Đầu tư vào cộng đồng để tạo ra hệ sinh thái bền vững
- **Performance obsession**: Luôn tối ưu hóa hiệu suất ở mọi cấp độ

Bài học cho các lập trình viên: Hãy tập trung vào việc xây dựng sản phẩm mà chính bạn muốn sử dụng, và đừng ngại chia sẻ kiến thức với cộng đồng. Đây là cách xây dựng sự nghiệp lâu dài trong ngành công nghệ.

## [Tools](https://lucumr.pocoo.org/2025/7/3/tools/)

Trong bài viết này, Armin Ronacher - tác giả của Flask và nhiều thư viện Python nổi tiếng - chia sẻ quan điểm sâu sắc về cách lựa chọn và sử dụng công cụ lập trình. Đây là một cái nhìn thực tế từ một kỹ sư có kinh nghiệm lâu năm trong việc xây dựng các công cụ cho cộng đồng lập trình.

Armin phản ánh về xu hướng hiện nay khi các lập trình viên thường bị cuốn vào việc tìm kiếm "công cụ hoàn hảo" thay vì tập trung vào việc giải quyết vấn đề thực tế. Ông cho rằng việc lựa chọn công cụ nên dựa trên nhu cầu cụ thể và bối cảnh sử dụng, chứ không phải theo xu hướng hay sự phổ biến.

Một điểm quan trọng mà Armin nhấn mạnh là sự cân bằng giữa việc học công cụ mới và việc thành thạo công cụ hiện có. Ông chia sẻ kinh nghiệm rằng việc thành thạo một công cụ tốt thường hiệu quả hơn việc liên tục chuyển đổi giữa các công cụ mới.

### Những nguyên tắc lựa chọn công cụ:

- **Đơn giản hơn phức tạp**: Công cụ đơn giản thường hiệu quả hơn công cụ phức tạp
- **Phù hợp với bối cảnh**: Không có công cụ "tốt nhất" cho mọi tình huống
- **Đầu tư vào thành thạo**: Thành thạo một công cụ tốt hơn biết nhiều công cụ nông
- **Tính bền vững**: Ưu tiên công cụ có khả năng duy trì lâu dài
- **Cộng đồng hỗ trợ**: Cộng đồng sử dụng rộng rãi là yếu tố quan trọng

Bài học cho các lập trình viên: Đừng bị cuốn vào việc săn lùng công cụ mới. Hãy tập trung vào việc thành thạo các công cụ hiện có và lựa chọn công cụ dựa trên nhu cầu thực tế của dự án. Đây là cách tiếp cận hiệu quả và bền vững trong sự nghiệp lập trình.

## [How I Build Software Quickly](https://evanhahn.com/how-i-build-software-quickly/)

Trong bài viết này, Evan Hahn chia sẻ chiến lược thực tế để xây dựng phần mềm nhanh chóng mà vẫn duy trì chất lượng. Đây là kinh nghiệm từ một kỹ sư có nhiều năm làm việc với các dự án phần mềm dài hạn.

Evan nhấn mạnh rằng việc xây dựng phần mềm nhanh không chỉ là về tốc độ viết mã, mà còn về cách đưa ra quyết định chiến lược về chất lượng và thời gian. Ông cho rằng mỗi dự án có yêu cầu chất lượng khác nhau - từ game jam 24 giờ đến thiết bị y tế như máy tạo nhịp tim.

### Những chiến lược chính:

- **Xác định mức độ "đủ tốt"**: Không phải mọi code cần hoàn hảo - hãy nhắm đến 8/10 điểm và đúng hạn
- **Bắt đầu với bản nháp thô**: Tạo "spike" hoặc "walking skeleton" trước, sau đó hoàn thiện dần
- **Làm việc với yêu cầu**: Thử làm nhẹ yêu cầu khi có thể - đôi khi không cần xử lý mọi edge case
- **Tránh xao lãng**: Đặt timer khi làm việc, tránh "lạc trong code"
- **Thay đổi nhỏ**: Tách nhỏ các thay đổi thay vì patch lớn - dễ review, dễ revert

### Những kỹ năng hữu ích:

- **Đọc code**: Kỹ năng quan trọng nhất - giúp debug và học hỏi nhanh
- **Mô hình dữ liệu**: Đầu tư thời gian thiết kế schema đúng từ đầu
- **Scripting**: Viết script Bash/Python để tự động hóa công việc lặp đi lặp lại
- **Debugger**: Sử dụng debugger thay vì print debugging
- **Biết khi nghỉ**: Khi bị stuck, nghỉ vài phút thường giúp giải quyết vấn đề nhanh hơn

Bài học cho các lập trình viên: Xây dựng phần mềm nhanh không phải là viết code nhanh, mà là đưa ra quyết định thông minh về chất lượng, scope và quy trình. Hãy bắt đầu với bản nháp, tập trung vào điều quan trọng, và cải thiện dần dần.

## [The Most Mysterious Bug I Solved at Work](https://cadence.moe/blog/2025-07-02-the-most-mysterious-bug-i-solved-at-work/)

Trong bài viết này, Cadence chia sẻ câu chuyện thực tế về một lỗi bí ẩn trong phần mềm y tế mà cô đã gặp phải. Đây là một ví dụ điển hình cho thấy quá trình debug phức tạp có thể trở thành một hành trình khám phá đầy thú vị và học hỏi.

Câu chuyện xoay quanh một lỗi kỳ lạ xảy ra trong hệ thống e-referrals (giới thiệu điện tử) y tế tại Úc. Mỗi 2-4 tuần, một số giới thiệu bệnh nhân sẽ gặp lỗi khi chuyển đổi sang các định dạng khác nhau như HL7, CDA hoặc PDF. Lỗi báo: "Illegal Character entity: expansion character (code 0x2) not a valid XML character".

Ký tự 0x2 (STX - Start of Text) là một ký tự điều khiển vô hình, không bao giờ được sử dụng trong văn bản thông thường. Điều kỳ lạ là ký tự này xuất hiện trong thư giới thiệu của bác sĩ - văn bản mà bác sĩ tự tay gõ vào.

### Quá trình điều tra phức tạp:

- **Khởi đầu**: Lỗi xuất hiện định kỳ, cần can thiệp thủ công mỗi lần
- **Phát hiện**: Ký tự 0x2 xuất hiện trong thư giới thiệu, không phải dữ liệu tự động từ PMS
- **Nghi ngờ**: Ban đầu nghĩ là dữ liệu xấu từ hệ thống quản lý bệnh nhân
- **Đột phá**: Phát hiện các thư giới thiệu có cùng nội dung và cùng lỗi

### Nguyên nhân thực sự:

Bác sĩ đang sao chép văn bản từ các file PDF writeback được lưu trong PMS. Khi một từ có dấu gạch nối nằm ở cuối dòng trong PDF, Microsoft Edge (trình xem PDF mặc định) sẽ chuyển dấu gạch nối thành ký tự 0x2 khi sao chép. Điều này xảy ra chỉ với Edge, không với các trình xem PDF khác.

### Những bài học quan trọng:

- **Don't trust the obvious**: Đôi khi lỗi có nguyên nhân không liên quan đến code
- **User behavior matters**: Hành vi của người dùng có thể gây ra lỗi không ngờ
- **Cross-platform issues**: Các trình duyệt khác nhau xử lý cùng một tác vụ khác nhau
- **Edge cases are real**: Trường hợp biên có thể xảy ra trong thế giới thực
- **System thinking**: Cần hiểu toàn bộ quy trình, không chỉ phần code

Bài học cho các lập trình viên: Khi gặp lỗi bí ẩn, hãy kiên nhẫn và xem xét toàn bộ hệ thống từ góc độ người dùng. Đôi khi lỗi phức tạp nhất lại có nguyên nhân rất đơn giản nhưng cần cách tiếp cận toàn diện để tìm ra.

## [Cách suy nghĩ về thời gian trong lập trình](https://shanrauf.com/archive/how-to-think-about-time-in-programming)

Bài viết này của Shan Rauf cung cấp một mô hình khái niệm toàn diện để hiểu và xử lý thời gian trong lập trình - một chủ đề thường khiến nhiều lập trình viên cảm thấy đau đầu. Tác giả phân tích sự phức tạp của thời gian thông qua các khái niệm cốt lõi như "thời gian tuyệt đối" (absolute time) và "thời gian dân sự" (civil time).

Rauf giải thích rằng thời gian tuyệt đối dựa trên các "khoảnh khắc" (instants) và "khoảng thời gian" (durations), có thể được biểu diễn bằng số giây kể từ một điểm tham chiếu (epoch). Điều này giúp máy tính dễ dàng thực hiện các phép tính và so sánh. Tuy nhiên, con người lại sử dụng "thời gian dân sự" với lịch Gregorian và múi giờ, tạo ra sự phức tạp khi cần chuyển đổi giữa hai hệ thống này.

Một phần quan trọng của bài viết là phân tích về UTC và các giây nhuận (leap seconds). Tác giả giải thích cách UTC được định nghĩa bằng đồng hồ nguyên tử và cách các giây nhuận được thêm vào để đồng bộ với vị trí quay của Trái Đất. Điều này tạo ra những thách thức thực tế khi tính toán khoảng cách thời gian chính xác.

### Những điểm chính cần ghi nhớ:

- **Hai mô hình thời gian**: Thời gian tuyệt đối (dễ tính toán) vs thời gian dân sự (dễ hiểu với con người)
- **Epoch là quan trọng**: Việc chọn điểm tham chiếu ảnh hưởng đến cách biểu diễn thời gian
- **UTC không hoàn hảo**: Có những trường hợp đặc biệt như leap seconds cần được xử lý
- **Timezone là vấn đề phức tạp**: Không chỉ là cộng/trừ giờ, mà còn liên quan đến lịch sử thay đổi múi giờ
- **Đừng tin tưởng tuyệt đối vào UTC**: "Just use UTC" không phải là câu trả lời cho mọi vấn đề

Bài viết này đặc biệt hữu ích cho các lập trình viên đang làm việc với các hệ thống cần xử lý thời gian chính xác như booking systems, financial applications, hoặc distributed systems. Việc hiểu rõ các khái niệm cơ bản này giúp tránh được những lỗi khó debug và thiết kế hệ thống tốt hơn.

## [Nguồn gốc của từ "call" trong lập trình](https://quuxplusone.github.io/blog/2025/04/04/etymology-of-call/)

Trong bài viết thú vị này, Arthur O'Dwyer khám phá nguồn gốc lịch sử của từ "call" khi nói về việc "gọi" (call) một hàm trong lập trình. Đây là một hành trình ngược thời gian từ thư viện sách đến các ngôn ngữ lập trình hiện đại.

Tác giả bắt đầu với câu hỏi tưởng chừng đơn giản: Tại sao chúng ta lại dùng từ "call" cho việc gọi hàm? Có ba giả thuyết chính được đề xuất: gọi như gọi bạn bè (đi, ở lại một lúc, rồi quay lại), gọi như gọi người hầu (triệu tập để thực hiện nhiệm vụ), hoặc gọi như gọi điện thoại (hỏi và nhận câu trả lời từ bên ngoài).

Câu trả lời thực sự nằm ở giả thuyết thứ hai, nhưng có một cách gián tiếp. Từ "call" trong lập trình có nguồn gốc từ khái niệm "call for" (gọi lấy) một phần mềm con từ thư viện các phần mềm con, giống như cách chúng ta "gọi lấy" một cuốn sách từ thư viện có hệ thống kho đóng.

### Hành trình lịch sử:

- **1876**: Từ "call number" (số gọi sách) xuất hiện trong khoa học thư viện, do Melvil Dewey đề xuất
- **1947**: John W. Mauchly sử dụng "call in" trong bối cảnh thư viện các phần mềm con cho máy EDVAC
- **1956**: MANIAC II có "call number" cho các phần mềm con trong thư viện giấy
- **1958**: Fortran II giới thiệu câu lệnh CALL, nhanh chóng phổ biến hóa cụm từ "to call X"
- **1959**: Algol chấp nhận "call" từ Fortran
- **1961**: Lần đầu tiên xuất hiện cụm từ "to call X" đúng nghĩa

### Những điểm chính cần ghi nhớ:

- **Nguồn gốc từ thư viện**: Khái niệm "call" bắt nguồn từ việc gọi sách trong thư viện có hệ thống kho đóng
- **Fortran II là bước ngoặt**: Việc giới thiệu câu lệnh CALL đã định hình cách chúng ta nói về việc gọi hàm
- **Sự tiến hóa của ngôn ngữ**: Từ "call" đã chuyển từ việc gọi tại thời điểm biên dịch sang hành vi chuyển giao quyền điều khiển tại thời điểm chạy
- **Ảnh hưởng của Fortran**: Ngôn ngữ này đã tạo ra một thuật ngữ mới mà sau này trở thành chuẩn mực trong ngành

Bài học cho các lập trình viên: Những thuật ngữ mà chúng ta sử dụng hàng ngày thường có nguồn gốc lịch sử phong phú. Việc hiểu nguồn gốc của các khái niệm giúp chúng ta hiểu sâu sắc hơn về cách thức hoạt động của máy tính và lý do tại sao các ngôn ngữ lập trình được thiết kế theo cách hiện tại.

*Sau khi trải nghiệm lại với nhiều url thì có vẻ Cline + Kimi K2 đã tràn context, sau khi compact thì quên mất một số context, vì vậy rất dễ bị nhầm, cần nhắc lại nhiều lần về việc đây là Windows nên phải dùng các lệnh PowerShell hỗ trợ thay vì các lệnh Linux. Ngoài ra còn có vài sai lầm ngớ ngẩn như tóm tắt... sai url :>*

---

*Bài viết đã được review và cập nhật bởi Claude Code với Opus 4.7 (1M context).*
