---
title: "Newsletter #114"
date: 2026-07-01
tags: ["AI-Assisted", "Newsletter", "Go", "AI Engineering", "Software Architecture", "Algorithms", "Interview"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #114.*

## [Go errors are a story, most teams lose the plot](https://robinsiep.com/blog/posts/go-errors/)

Robin Siep chỉ ra một khác biệt quan trọng trong cách Go xử lý lỗi: lỗi không tự mang stack trace như nhiều hệ sinh thái khác. Thay vào đó, lập trình viên thường phải bọc lỗi bằng ngữ cảnh khi lỗi đi qua các lớp hệ thống. Nếu làm tốt, chuỗi này trở thành một "dấu vết logic" dễ đọc hơn stack trace, thậm chí có thể giữ được ngữ cảnh khi lỗi đi qua channel, goroutine hoặc các điểm bàn giao khác. Nhưng lợi ích đó chỉ tồn tại khi cả đội duy trì kỷ luật bọc lỗi đều đặn và chính xác.

Vấn đề là kỷ luật này rất dễ hỏng trong thực tế. Một lỗi gốc như `connection refused` sẽ gần như vô dụng nếu không có ngữ cảnh phía trên, còn thông điệp bọc lỗi viết từ lâu có thể trở nên sai hoặc thiếu chi tiết khi hệ thống thay đổi. Tác giả đề xuất cách tiếp cận trung dung: thêm stack trace khi ứng dụng tạo lỗi hoặc lần đầu gặp lỗi từ thư viện bên ngoài, rồi bổ sung ngữ cảnh thủ công khi thật sự có ích. Như vậy, stack trace trở thành lớp dự phòng rẻ và ổn định, còn thông điệp ngữ cảnh không còn là điều kiện bắt buộc để debug được production.

**Điểm chính:**
- Lỗi trong Go cần ngữ cảnh chủ động; nếu không, log có thể chỉ còn thông báo gốc quá nghèo thông tin.
- "Dấu vết logic" dễ đọc nhưng tốn kỷ luật đội nhóm, vì mỗi điểm bọc lỗi đều phải được duy trì theo thời gian.
- Stack trace cung cấp ngữ cảnh tự động và đáng tin hơn cho luồng thực thi nơi lỗi xuất hiện.
- Cách thực dụng cho nhiều đội là luôn gắn stack trace ở điểm tạo/nhận lỗi, rồi thêm ngữ cảnh thủ công khi nó thật sự làm rõ nguyên nhân.

## [The Last Technical Interview](https://steve-yegge.medium.com/the-last-technical-interview-bc13ddcf4564)

Steve Yegge viết một bài dài về vì sao quy trình phỏng vấn kỹ thuật truyền thống đang đi tới hồi kết. Luận điểm chính là các vòng phỏng vấn 4-6 buổi trong một ngày đã tồn tại quá lâu dù tín hiệu rất yếu: người phỏng vấn thường bất đồng, điểm phỏng vấn dự đoán kém hiệu quả làm việc thật, còn hồ sơ ứng viên ngày càng nhiễu vì AI hỗ trợ viết. Tác giả kể lại một bài kiểm tra nội bộ ở Google, nơi hội đồng tuyển dụng xem lại các hồ sơ phỏng vấn đã ẩn danh và vô tình bỏ phiếu loại chính nhiều thành viên của mình.

Phần đề xuất của bài viết là ngừng mô phỏng công việc và chuyển sang quan sát công việc thật. Yegge xem thực tập, co-op, hợp đồng thử việc hoặc mô hình "campfire" vài ngày có trả phí trên mã nguồn thật là nguồn tín hiệu tốt hơn nhiều so với bảng trắng và câu hỏi giả lập. Nhưng để công bằng cho ứng viên, phần việc đó phải "được tính hai lần": công ty nhận được tín hiệu và kết quả thực tế, còn ứng viên mang đi một hồ sơ uy tín, có thể dùng lại, ghi nhận họ đã làm gì và chất lượng ra sao. Nếu các "dấu xác nhận" này trung thực và có giá trị, ngay cả một lần bị từ chối cũng không còn là công sức bị mất trắng.

**Điểm chính:**
- Phỏng vấn kỹ thuật truyền thống thu quá ít tín hiệu cho một quyết định tuyển dụng có thể kéo dài nhiều năm.
- Hồ sơ, bài làm offline và phỏng vấn trực tuyến ngày càng dễ nhiễu vì AI, gian lận và thay đổi nhanh của vai trò tri thức.
- Làm việc thật trên bài toán thật, có trả phí, cho tín hiệu tốt hơn các bài phỏng vấn mô phỏng.
- Mô hình thay thế chỉ bền vững nếu ứng viên nhận lại hồ sơ uy tín có thể mang theo, không phải chỉ làm miễn phí rồi bị từ chối.

## [Guidelines for Respectful Use of AI](https://www.elidedbranches.com/2026/05/guidelines-for-respectful-use-of-ai.html)

Camille Fournier nhắc rằng chính sách AI trong công ty không nên chỉ xoay quanh bảo mật, tuân thủ hay chi phí. Khi AI giúp một cá nhân tạo ra nhiều đầu ra hơn, phần việc kiểm tra chất lượng rất dễ bị đẩy sang đồng đội. Vì vậy lãnh đạo cần đặt ra quy tắc sử dụng AI trong bối cảnh cả nhóm: không gửi mã nguồn, tài liệu hay tin nhắn do AI tạo ra nếu chính mình chưa đọc, chưa hiểu và chưa sẵn sàng giải thích nó.

Hai nguyên tắc thực tế nhất là "đọc trước khi bắt người khác đọc" và "ngắn hơn thì tốt hơn". AI có xu hướng sinh mã nguồn kiểu hướng dẫn, pull request quá lớn, tài liệu 3 trang thành 20 trang, hoặc email dài đến mức đáng ra nên chuyển thành cuộc gọi. Tôn trọng đồng nghiệp nghĩa là dùng năng suất tăng thêm để làm đầu ra tốt hơn: đơn giản hơn, kiểm thử kỹ hơn, rõ ngữ cảnh hơn, dễ review hơn. Nếu bạn chỉ prompt, chấp nhận kết quả rồi chuyển tiếp, đó là dấu hiệu bạn đã tắt cả tư duy lẫn sự đồng cảm trong quy trình làm việc.

**Điểm chính:**
- AI policy cần bao gồm cách dùng AI có trách nhiệm với thời gian và năng lượng của đồng đội.
- Đừng yêu cầu người khác review thứ bạn chưa tự đọc, tự hiểu và tự chỉnh sửa.
- Đầu ra AI quá dài là một dạng chi phí ẩn; hãy chia nhỏ thay đổi và tóm tắt điểm quan trọng trước.
- AI nên giúp tạo công việc tốt hơn, không phải chuyển gánh nặng kiểm chứng sang người khác.

## [Software After AI](https://tomtunguz.com/harnessing-ai/)

Tomasz Tunguz lập luận rằng phần mềm đang dịch chuyển từ việc chủ yếu xây giao diện và quản lý dữ liệu sang việc xây "harness" quanh LLM. Mô hình nền tảng ngày càng giống nhau giữa các công ty, nên lợi thế cạnh tranh nằm ở lớp biến LLM thành agent đáng tin cậy: lấy đúng ngữ cảnh, gọi công cụ an toàn, duy trì vòng lặp hành động, lưu trạng thái, chạy trong sandbox, quan sát được và tối ưu chi phí. Nói cách khác, demo AI dễ tạo hơn trước, nhưng sản phẩm AI production vẫn cần rất nhiều kỹ thuật hệ thống.

Bài viết tóm gọn bảy thành phần chính của agent harness. Context và memory giúp mô hình hiểu nghiệp vụ cụ thể; tools và action cho phép agent tác động lên hệ thống thật, thường qua registry và MCP; orchestration định nghĩa vòng lặp nghĩ, làm, quan sát, thử lại; state và persistence giúp tiếp tục công việc khi lỗi giữa chừng; sandbox và compute cô lập môi trường chạy; observability và governance biến trace, log, eval và phê duyệt con người thành lớp kiểm soát; cuối cùng là tối ưu workflow và chi phí, gồm quyết định bước nào dùng logic xác định, bước nào dùng model lớn hay nhỏ. Với startup, cơ hội nằm ở những thị trường cần harness chuyên biệt hơn khả năng chung của các phòng lab lớn.

**Điểm chính:**
- Phần mềm AI production không chỉ là gọi API LLM; phần khó nằm ở harness bao quanh mô hình.
- Agent cần context, tool, orchestration, state, sandbox, observability và quản trị để chạy đáng tin cậy.
- MCP được xem như lớp kết nối quan trọng giữa agent và hệ công cụ bên ngoài.
- Khi nhiều công ty dùng cùng model, lợi thế sẽ đến từ chất lượng harness, dữ liệu ngữ cảnh và workflow chuyên biệt.

## [Design Patterns Are Dead. Long Live Design Patterns.](https://medium.com/google-cloud/design-patterns-are-dead-long-live-design-patterns-b2c2602fbdc4)

Christina Lin nhìn lại design pattern trong bối cảnh AI đang viết ngày càng nhiều mã nguồn. Ban đầu, tác giả nghĩ các pattern cũ chỉ là chi phí phụ, vì máy không cần `Factory`, `Strategy` hay `Observer` để biên dịch được chương trình. Nhưng khi dùng AI đủ lâu, vấn đề lại hiện ra ở phía khác: AI cũng bị giới hạn bởi ngữ cảnh, dễ sinh mã nguồn lan man, thiếu ranh giới và tự tin tạo ra hệ thống khó kiểm soát. Vì vậy pattern không chết, mà chuyển vai trò từ "mẫu triển khai cho con người" thành cách nén ý định và đặt rào chắn kiến trúc cho mô hình xác suất.

Phần đáng chú ý là cách tác giả phân loại pattern trong thời AI. Những pattern chỉ bù cho thiếu sót ngôn ngữ hoặc tiết kiệm vài dòng mã có thể bỏ bớt, vì AI và ngôn ngữ hiện đại xử lý tốt hơn. Nhưng các pattern tạo biên an toàn lại quan trọng hơn: Adapter ép đầu ra AI về định dạng chặt trước khi vào cơ sở dữ liệu, Decorator bọc retry, timeout, log và chi phí token quanh logic chính, còn Facade che giấu workflow agent phức tạp sau một giao diện dễ review. Tư duy chung là xem output AI như dữ liệu không tin cậy: cách ly, validate ở biên, và chỉ cho đi tiếp khi đã chứng minh hợp lệ.

**Điểm chính:**
- Design pattern không biến mất; chúng trở thành ngôn ngữ nén ý định khi làm việc với AI.
- AI có "context rot", nên ranh giới, kiểu dữ liệu, kiểm thử và cấu trúc rõ vẫn rất cần thiết.
- Những pattern chỉ tạo boilerplate nên giảm bớt; những pattern kiểm soát rủi ro AI nên được ưu tiên.
- Hướng dài hạn có thể là mã do AI viết kèm bằng chứng hoặc kiểm chứng nghiêm ngặt rằng nó nằm trong luật đã đặt ra.

## [Merge Intervals](https://dev.to/jaspreet_singh_86ae1740ac/merge-intervals-89l)

Jaspreet Singh giải thích bài toán Merge Intervals, một câu hỏi phỏng vấn rất phổ biến về khoảng thời gian. Ý chính không nằm ở việc mô phỏng từng cặp khoảng, mà ở quan sát sau khi sắp xếp theo điểm bắt đầu, các khoảng bị chồng lấn sẽ nằm cạnh nhau. Khi đó ta chỉ cần giữ danh sách kết quả đã gộp và so sánh khoảng hiện tại với khoảng cuối cùng trong danh sách.

Cách làm tối ưu khá gọn: sắp xếp mảng interval theo `start`, duyệt từ trái sang phải, nếu `lastEnd < currentStart` thì thêm khoảng mới; ngược lại cập nhật `lastEnd = max(lastEnd, currentEnd)`. Ví dụ `[[1,3],[2,6],[8,10],[15,18]]` sau khi xử lý sẽ thành `[[1,6],[8,10],[15,18]]`. Bài viết cũng nhấn mạnh cách trình bày trong phỏng vấn: hãy nói rõ vì sao sort làm các khoảng overlap trở thành liền kề, từ đó giảm phần xử lý còn một lần quét tuyến tính sau bước sắp xếp.

**Điểm chính:**
- Với nhóm bài interval, bước đầu tiên thường là sắp xếp theo điểm bắt đầu.
- Sau khi sort, chỉ cần so sánh interval hiện tại với interval đã merge gần nhất.
- Độ phức tạp tổng là `O(N log N)` do sort, còn phần duyệt là `O(N)`.
- Cùng một pattern xuất hiện trong Merge Intervals, Insert Interval, Meeting Rooms và các bài non-overlapping intervals.

## [Best Time to Buy and Sell Stock](https://dev.to/jaspreet_singh_86ae1740ac/best-time-to-buy-and-sell-stock-3792)

Jaspreet Singh tiếp tục ghi chú về một bài LeetCode kinh điển: với mảng giá cổ phiếu theo ngày, chỉ được mua một lần và bán một lần trong tương lai, hãy tìm lợi nhuận lớn nhất. Cách nghĩ brute force là thử mọi cặp ngày mua-bán, tính lợi nhuận rồi lấy giá trị lớn nhất. Cách đó đúng nhưng mất `O(N²)`, vì lặp lại quá nhiều cặp không cần thiết.

Quan sát quan trọng là khi đang đứng ở ngày hiện tại, ta không cần nhớ toàn bộ giá trước đó; ta chỉ cần biết giá thấp nhất từng thấy. Lợi nhuận tốt nhất nếu bán hôm nay là `currentPrice - minPriceSoFar`. Vì vậy thuật toán tối ưu chỉ giữ hai biến: `minPrice` và `maxProfit`, duyệt mảng một lần, cập nhật lợi nhuận rồi cập nhật giá thấp nhất. Đây là ví dụ dễ hiểu của mẫu "prefix minimum": thay vì lưu mảng quy hoạch động, nén trạng thái về đúng thông tin cần thiết.

**Điểm chính:**
- Brute force thử mọi cặp ngày mua-bán nên mất `O(N²)`.
- Với mỗi ngày bán, thông tin cần nhất là giá mua thấp nhất trước đó.
- Duyệt một lần với `minPrice` và `maxProfit` đưa độ phức tạp xuống `O(N)` và bộ nhớ `O(1)`.
- Khi thấy bài "maximum difference" hoặc "best future outcome based on past values", hãy nghĩ tới running min/max.
