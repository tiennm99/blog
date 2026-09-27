---
title: "Newsletter #31"
date: 2025-05-18
tags: ["AI-Assisted", "Technology", "Software Development", "Career Growth", "AI", "Hiring", "Engineering", "DevOps"]
categories: ["Newsletter"]
draft: false
---

*Chào mừng bạn đến với Newsletter #31.*

## [Optimizing Our E2E Pipeline](https://slack.engineering/speedup-e2e-testing/)

Đội ngũ DevXP của Slack chia sẻ cách họ tối ưu quy trình kiểm thử đầu-cuối (E2E) cho kho mã nguồn monorepo lớn nhất của công ty. Trước đây, mỗi lần chạy mất khoảng 10 phút, trong đó gần một nửa dành cho việc đóng gói (build) frontend, kể cả khi thay đổi không hề đụng tới mã nguồn frontend. Với hàng trăm pull request được hợp nhất mỗi ngày, điều này tạo ra hàng nghìn bản build mỗi tuần, mỗi bản chiếm gần 1 GB trên AWS S3, dẫn tới hàng terabyte dữ liệu trùng lặp.

Giải pháp tận dụng những công cụ sẵn có: dùng `git diff` với cú pháp ba dấu chấm để so sánh nhánh hiện tại với commit chung gần nhất của `main`; nếu không có thay đổi frontend thì bỏ qua bước build và dùng lại một bản build gần đây đang chạy trên môi trường production, được phục vụ qua CDN nội bộ. Dù kho mã có hơn 100.000 tệp, việc phát hiện thay đổi và tìm bản build phù hợp chỉ mất chưa đầy 3 giây. Kết quả là số lần build giảm 60%, tiết kiệm hàng trăm giờ mỗi tháng cùng vài terabyte lưu trữ, thời gian build trung bình giảm từ khoảng 5 phút xuống 2 phút (cộng với đợt nâng cấp Webpack trước đó, tổng cộng giảm từ 10 phút xuống 2 phút). Một kết quả bất ngờ là các bài kiểm thử cũng ổn định hơn, ít lỗi chập chờn hơn. Bài học rút ra: hãy thường xuyên tự hỏi bước nào trong quy trình thực sự cần thiết, kể cả với những hệ thống chưa từng gặp sự cố.

---

## [DoorDash's Fast Travel Estimates](https://careersatdoordash.com/blog/doordash-fast-travel-estimates/)

Các kỹ sư DoorDash giới thiệu cách họ ước tính quãng đường và thời gian di chuyển ở mức mili giây — yếu tố cốt lõi để tìm cửa hàng gần khách, dự đoán thời gian giao hàng (ETA), tính phí và chọn tài xế phù hợp. Gọi trực tiếp một công cụ định tuyến như OSRM thường mất hơn 100 ms, quá chậm cho các tác vụ nhạy cảm với độ trễ như làm mới trang chủ hay xếp hạng tìm kiếm; còn công thức tính khoảng cách đường chim bay tuy nhanh nhưng kém chính xác vì bỏ qua các tuyến đường thực tế.

Giải pháp của họ là Geo-Grid-Cache: chia toàn bộ khu vực phục vụ thành các ô lục giác theo hệ thống chỉ mục không gian H3, rồi tính trước thời gian di chuyển giữa tâm các ô bằng OSRM với mức giao thông trung bình. Mỗi điểm được lưu ở ba mức phân giải — chi tiết cho quãng đường dưới một dặm, trung bình, và thô cho quãng đường tới 100 dặm — để cân bằng giữa tỉ lệ trúng bộ nhớ đệm, chi phí và độ chính xác. Khi có yêu cầu, hệ thống tra cứu kết quả trong cụm Redis và chọn tầng có độ phân giải cao nhất hiện có. Phần khó nhất là sinh dữ liệu ngoại tuyến cho khoảng 6 tỷ cặp ô; nhóm dùng Spark trên Databricks và cài OSRM trực tiếp lên cụm máy để thay lời gọi mạng bằng lời gọi HTTP cục bộ, giúp tăng tốc tới 10 lần. Kết quả là độ trễ cực thấp, độ chính xác gần bằng công cụ định tuyến nội bộ và tiết kiệm đáng kể chi phí tính toán.

---

## [Tech Hiring: Is This an Inflection Point?](https://blog.pragmaticengineer.com/tech-hiring-is-this-an-inflection-point/)

Gergely Orosz (The Pragmatic Engineer) chỉ ra một nghịch lý: dù ít công ty tuyển hơn và nhiều ứng viên cạnh tranh hơn, nhiều quản lý kỹ thuật lại thấy năm 2025 là thời điểm tuyển dụng khó nhất. Ví dụ điển hình là maestro.dev, một công ty khởi nghiệp làm việc từ xa hoàn toàn: mỗi vị trí đăng trên LinkedIn nhận hàng trăm hồ sơ phần lớn không phù hợp, thư xin việc gần như đều do AI viết, còn nhiều ứng viên đọc câu trả lời từ công cụ AI ngay trong buổi phỏng vấn lập trình. Khi chuyển sang bài tập về nhà, trưởng nhóm kỹ thuật cài một chỉ dẫn ẩn dành cho trợ lý AI trong đề bài — cả bốn bài nộp đều làm theo chỉ dẫn đó, dù ba người khẳng định không dùng AI. Tín hiệu đáng tin nhất lại đến từ những ứng viên chủ động nhắn tin, giải thích vì sao họ muốn gia nhập.

Một công ty khác, cũng làm việc từ xa, phải sa thải một kỹ sư dữ liệu cấp cao chỉ sau hai tuần khi phát hiện người này khai man kinh nghiệm và dùng cùng lúc nhiều công cụ AI để vượt qua phỏng vấn. Công ty đang cân nhắc thêm vòng phỏng vấn trực tiếp cuối cùng dù tốn 1.500–2.000 USD cho mỗi ứng viên, đồng thời tăng cường tuyển qua giới thiệu nội bộ, vì 4/5 người được tuyển gần đây đều có người giới thiệu. Bài viết còn đề cập chi phí LinkedIn lên tới 5–20 nghìn USD mỗi tháng cho mỗi nhà tuyển dụng, xu hướng "tuần thử việc" có trả lương, và nhu cầu thiết kế lại quy trình tuyển dụng từ xa trong thời đại AI.

---

## [Underusing Snapshot Testing](https://matklad.github.io/2025/04/15/underusing-snapshot-testing.html)

Aleksey Kladov (matklad), tác giả của rust-analyzer, chia sẻ lý do anh cho rằng bản thân vẫn chưa tận dụng hết snapshot testing. Ý tưởng khá đơn giản: chuyển kết quả của bài kiểm thử thành dạng văn bản, so sánh với giá trị mong đợi được viết ngay trong mã nguồn dưới dạng chuỗi, và dùng công cụ để tự động cập nhật chuỗi đó theo kết quả thực tế. Lợi ích quen thuộc là giúp phần mềm dễ thay đổi: khi yêu cầu hoặc cấu trúc dữ liệu thay đổi, chỉ cần chạy lại kiểm thử ở chế độ cập nhật.

Điều mới mà tác giả nhận ra đến từ ví dụ viết hàm mã hóa hoán vị (permutation encoding) bằng Zig — một bài toán mà yêu cầu gần như không bao giờ thay đổi. Với kiểm thử dựa trên assert, chương trình dừng ngay ở lỗi đầu tiên và kết quả phải tìm trong cửa sổ terminal, xa nơi đang viết mã. Khi chuyển sang snapshot, mọi kết quả sai đều hiện ngay trong mã nguồn, giúp nhìn được toàn cảnh và nhanh chóng phát hiện hai lỗi lệch một đơn vị (off-by-one). Theo tác giả, snapshot test giữ dữ liệu gần với lập trình viên, rút ngắn vòng phản hồi và hoạt động như một REPL có thể lặp lại, nên vẫn tăng tốc phát triển ngay cả khi yêu cầu không đổi. Phần cuối bài còn giải thích vì sao vài ví dụ cụ thể vẫn hữu ích bên cạnh kiểm thử vét cạn toàn bộ các hoán vị.

---

## [Principles for coding securely with LLMs](https://www.seangoedecke.com/ai-security/)

Sean Goedecke cho rằng bảo mật khi làm việc với LLM không nên được xem là một danh sách dài các mối đe dọa rời rạc, mà xuất phát từ một nguyên tắc duy nhất: LLM đôi khi hành xử độc hại, vì vậy hãy đối xử với đầu ra của nó như dữ liệu do người dùng nhập vào. Prompt injection là không thể tránh khỏi — chỉ cần đưa nội dung do người khác tạo (trang web, tài liệu, tệp quy tắc của Cursor) vào ngữ cảnh là đã trao cho họ quyền điều khiển mô hình, và không mô hình nào miễn nhiễm với kỹ thuật jailbreak.

Từ đó, mọi công cụ mà LLM được phép gọi phải được phân quyền như một API công khai cho người dùng: ví dụ dùng `fetch_messages()` thay vì `fetch_messages(user_id)` để mô hình không thể đọc tin nhắn của người khác; các hành động ảnh hưởng tới nhiều người như gửi tin hay chuyển tiền cần người dùng xác nhận thủ công. Máy chủ MCP về bản chất là thư viện từ xa, nên bạn đang tin tưởng chủ sở hữu máy chủ chứ không chỉ giao diện của nó. Ngay cả khi không bị tấn công, LLM vẫn có thể ảo giác hoặc làm điều liều lĩnh, vì thế bước phê duyệt của con người cần được cài trong mã nguồn của công cụ chứ không phải trong prompt. Tác giả cũng lưu ý rủi ro từ mô hình tự huấn luyện (lệch mục tiêu hoặc làm lộ dữ liệu nhạy cảm) và tấn công từ chối dịch vụ (DoS), do LLM phản hồi chậm và tốn tài nguyên GPU; hãy giới hạn số phiên đồng thời, độ dài token và quyền truy cập công cụ.

---

## [How I don't use LLMs](https://www.gleech.org/llms)

Gavin Leech, một tiến sĩ về AI, thẳng thắn chia sẻ vì sao anh gần như không dùng LLM cho công việc trí tuệ, dù hiểu rõ chúng thông minh đến đâu. Mỗi khi có mô hình mới, anh lại thử, và lần nào nó cũng tự tin mắc một lỗi nghiêm trọng chỉ trong vài phút đầu. Các lý do anh đưa ra gồm: yêu thích viết lách đến mức sửa văn bản kém còn tốn công hơn tự viết, đã nắm vững kiến thức nền của nhiều lĩnh vực, cần độ chính xác và độ tin cậy cao khi học, khó chịu với văn phong và thói "nói cho có" của mô hình, lo ngại bị mai một kỹ năng, và vào thời điểm đó không phải viết nhiều mã nguồn.

Dù vậy, anh vẫn dùng LLM trong một số tình huống: thay thế công cụ tìm kiếm (chỉ khi có nguồn dẫn), gợi nhớ thuật ngữ, tìm từ khóa khi bước vào lĩnh vực mới, tìm kiếm ngữ nghĩa trong kho tài liệu, kiểm tra và chuyển đổi JSON sang CSV, vượt qua nỗi sợ trang giấy trắng, và đặc biệt là lập trình với Matplotlib hay xử lý các rắc rối về Docker, WSL, Cloudflare. Để tránh thói nịnh bợ của mô hình, anh trình bày ý tưởng của bản thân như thể của người khác. Bài viết mang góc nhìn cân bằng và tự phê bình: tác giả thừa nhận một phần nguyên nhân có thể nằm ở sự thiếu kiên nhẫn của chính anh, nhưng vẫn cảnh báo rằng LLM có thể lặng lẽ cài vài thông tin sai vào đầu người dùng mỗi ngày.

---

## [How Senior Software Engineers Can Learn from Junior Engineers](https://www.infoq.com/news/2025/04/software-engineers-learning/)

Bài viết của InfoQ tổng hợp bài nói của Beth Anderson tại QCon London về việc kỹ sư cấp cao có thể học hỏi từ kỹ sư mới vào nghề. Theo cô, khoảng cách quyền lực quá lớn trong đội ngũ khiến kỹ sư trẻ ngại lên tiếng, kể cả khi họ nhìn thấy một vấn đề có thể gây hậu quả lớn, từ đó kìm hãm đổi mới và cản trở hợp tác. Thay vì chỉ truyền đạt kiến thức một chiều, kỹ sư cấp cao nên nhận ra rằng đồng nghiệp trẻ thường rất nhiệt huyết, có góc nhìn mới mẻ và bộ kỹ năng cập nhật.

Để xây dựng văn hóa hòa nhập, Anderson đề xuất lắng nghe tích cực, khuếch đại tiếng nói và ghi nhận đóng góp của mọi người, đồng thời tạo môi trường an toàn tâm lý để kỹ sư trẻ thoải mái đặt câu hỏi. Một cách làm cụ thể là "phản hồi ngược": để kỹ sư trẻ nhận xét cách kỹ sư cấp cao giao tiếp với họ, hỏi họ muốn học theo cách nào, và mời họ đánh giá mã nguồn hay pull request của người đi trước như một cách học. Cô cũng khuyên kỹ sư trẻ sau này đừng lặp lại những hành vi từng khiến họ khó chịu, bởi thâm niên không phải là quyền lực mà là cơ hội tạo ra thay đổi tích cực. Mỗi người, dù ở cấp độ nào, đều có góc nhìn riêng đáng để học hỏi nếu ta sẵn sàng lắng nghe.

---

## [As an engineer, I'd rather be called stupid than stay silent](https://shiftmag.dev/asking-questions-engineering-career-advice-4895/)

Marko Antanaskovic kể lại hành trình vượt qua hội chứng kẻ mạo danh (imposter syndrome) khi làm Kỹ sư Hỗ trợ Khách hàng tại Infobip. Mở đầu bằng một tình huống sự cố giả tưởng đầy thuật ngữ khó hiểu, anh mô tả cảm giác quen thuộc: không hiểu các lập trình viên đang nói gì nhưng ngại hỏi vì sợ bị coi là ngốc, trong khi khách hàng vẫn chờ được thông báo. Nhận ra không thể biết hết mọi thứ trên một nền tảng lớn như vậy, và cũng không có giáo trình nào phù hợp, anh quyết định khai thác nguồn tri thức sẵn có là chính các đồng nghiệp bằng cách mạnh dạn đặt những câu hỏi "ngớ ngẩn" như "Điều này thực sự nghĩa là gì?".

Tác giả chỉ ra cái giá của việc im lặng: sự cố kéo dài vì không ai kết nối được vấn đề với tác động tới khách hàng, công việc kém chất lượng vì hiểu sai yêu cầu, và các cuộc họp rơi vào im lặng khó xử. Để xây dựng văn hóa đặt câu hỏi, anh gợi ý hãy là người hỏi trước, chuyển từ đổ lỗi sang giáo dục theo tinh thần văn hóa không đổ lỗi (blameless culture), và tin tưởng những người xung quanh. Chính tư duy dám "ngốc" này đã giúp anh tích lũy đủ kiến thức để chuyển sang vai trò Kỹ sư Vận hành Độ tin cậy (Reliability Operations Engineer). Thông điệp cuối cùng: không có câu hỏi nào ngớ ngẩn nếu nó chân thành, và thà bị coi là ngốc còn hơn im lặng rồi mắc sai lầm.

---

*Bài viết đã được viết lại bởi Claude Code với Opus 5.5 vào ngày 27/09/2026.*
