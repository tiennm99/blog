---
title: "Newsletter #37"
date: 2025-07-26
tags: [ "AI-Assisted", "DevOps", "WebSockets", "Developer Experience", "Git" ]
categories: [ "Newsletter" ]
---

*Mời bạn thưởng thức Newsletter #37.*

## [Đã đến lúc nên cho Nix một cơ hội](https://maych.in/blog/its-time-to-give-nix-a-chance/)

Chinmay D. Pai cho rằng Nix xứng đáng được cân nhắc rộng rãi hơn. Khác với các trình quản lý gói truyền thống cài mọi thứ vào những thư mục dùng chung của hệ thống, Nix lưu từng gói trong kho bất biến `/nix/store` với đường dẫn duy nhất sinh ra từ mã băm SHA-256 của toàn bộ đầu vào khi xây dựng. Nhờ đó, nhiều phiên bản của cùng một phần mềm có thể cùng tồn tại mà không xung đột, mỗi gói mang theo đầy đủ cây phụ thuộc riêng. Tính năng flakes ghim chặt các phụ thuộc, bảo đảm lần xây dựng nào, ở máy nào cũng cho ra cùng một kết quả. Bạn còn có thể chạy thử công cụ mà không cần cài đặt qua `nix shell` hay `nix run`, trong khi kho bất biến và cấu trúc hệ thống tệp khác chuẩn giúp chặn nhiều hướng tấn công quen thuộc trên Linux.

Tác giả cũng thẳng thắn nêu nhược điểm: phải học một ngôn ngữ lập trình hàm mới, thông báo lỗi khó hiểu, việc gỡ lỗi đòi hỏi nắm rõ mô hình thực thi của Nix, phần mềm vốn giả định đường dẫn Linux chuẩn dễ gặp trục trặc, tốn dung lượng lưu trữ và tài liệu còn rời rạc. Để bắt đầu, tác giả gợi ý cài bằng Determinate Systems Installer, thử công cụ với `nix shell` rồi dựng một môi trường phát triển đơn giản. Nix phát huy giá trị nhất với các nhóm hay gặp cảnh môi trường mỗi máy một kiểu, quy trình làm quen dự án rườm rà, phát triển đa nền tảng hoặc có yêu cầu tuân thủ; còn với dự án nhỏ, phụ thuộc ổn định thì có thể chưa cần đến.

## [Bạn có thể chọn công cụ làm mình hạnh phúc](https://borretti.me/article/you-can-choose-tools-that-make-you-happy)

Bài viết lập luận rằng lựa chọn công nghệ của lập trình viên phần lớn đến từ cảm xúc chứ không thuần lý trí như họ vẫn nói. Người ta chọn công cụ theo thẩm mỹ và hình ảnh bản thân muốn hướng tới: dùng Emacs vì thấy mình thuộc giới tinh hoa trí tuệ, dùng NetBSD vì hợp với hình tượng nhân vật cyberpunk. Sau đó họ dựng lên những lý lẽ kỹ thuật để che đi động cơ thật, bằng các chiêu quen thuộc như xem nhẹ nhược điểm lớn của công cụ ít người dùng ("ừ thì phải tự viết một máy chủ HTTP"), bịa ra những ưu điểm đáng ngờ, hoặc chê bai mơ hồ các lựa chọn phổ biến kiểu "Docker quá phức tạp" hay "C++ rèn luyện bản lĩnh, còn Rust khiến bạn yếu đi".

Tác giả không phản đối việc chọn công cụ theo cảm xúc, miễn là đừng tự lừa mình và lừa người khác. Nếu chọn một thứ vì thẩm mỹ hay bản sắc, hãy theo đuổi nó trọn vẹn và có chủ đích; điều không nên là khẳng định SNOBOL có tương lai thực tế, hay nói với sếp rằng quyết định đó hoàn toàn dựa trên tính toán hợp lý. Thông điệp cốt lõi: bạn được phép chọn công cụ khiến mình hạnh phúc, chỉ cần thành thật về lý do. Tác giả cũng nhắc rằng đam mê cần đi kèm sự tỉnh táo, bởi những lựa chọn cực đoan tách rời lý trí có thể khiến bạn mất nhiều năm cho những hướng đi bế tắc.

## ~~[Ảo tưởng về Copilot](https://deplet.ing/the-copilot-delusion/)~~

~~Bài viết này đưa ra những phê phán sâu sắc về các trợ lý lập trình AI như GitHub Copilot và ảnh hưởng tiêu cực của chúng đến ngành phát triển phần mềm. Tác giả lập luận rằng các công cụ AI này tạo ra mã nguồn mà không có sự hiểu biết thực sự về kiến trúc hệ thống hay những phức tạp kỹ thuật sâu xa.~~

~~Vấn đề cốt lõi là việc phụ thuộc vào AI làm suy giảm kỹ năng tư duy phản biện và học hỏi của lập trình viên. Khi "gia công tư duy cho AI", chúng ta cũng đang "gia công việc học" cho chúng. Các công cụ này thiếu trực giác về hiệu năng phần cứng, quản lý bộ nhớ, và tối ưu hóa - những yếu tố then chốt trong phát triển phần mềm chất lượng cao.~~

~~Tác giả lo ngại về tác động văn hóa trong ngành kỹ thuật phần mềm, có thể tạo ra một thế hệ lập trình viên ưu tiên sản lượng nhanh hơn chất lượng, đe dọa "linh hồn hacker" và sự tò mò kỹ thuật sâu sắc. Nguy cơ là sẽ có nhiều người nghĩ mình giỏi chỉ vì bot của họ vượt qua được CI, nhưng thực tế thiếu hiểu biết căn bản.~~

~~**Mối lo ngại chính:**~~
~~- AI tạo mã mà không hiểu kiến trúc hệ thống~~
~~- Suy giảm kỹ năng tư duy phản biện của lập trình viên~~
~~- Thiếu hiểu biết về hiệu năng và tối ưu hóa~~
~~- Nguy cơ tạo ra thế hệ lập trình viên "giỏi trên giấy"~~

## [Tại sao Cline không lập chỉ mục mã nguồn (và đó là điều tốt)](https://cline.bot/blog/why-cline-doesnt-index-your-codebase-and-why-thats-a-good-thing)

Cline, một trợ lý lập trình AI, chủ động không dùng RAG hay lập chỉ mục mã nguồn, và bài viết giải thích vì sao đây là lựa chọn cho kết quả tốt hơn. Vấn đề đầu tiên là mã nguồn không vận hành theo từng mảnh: cắt nó thành các đoạn nhỏ sẽ phá vỡ mạch logic liên kết, giống như cố hiểu một bản giao hưởng qua vài đoạn nhạc ngẫu nhiên dài mười giây, trong khi mã nguồn lại không có ranh giới ngữ nghĩa rõ ràng như văn bản thông thường. Thứ hai, chỉ mục nhanh chóng lỗi thời vì mã nguồn liên tục được tái cấu trúc và cập nhật; một bản chụp cũ có thể khiến AI gợi ý những hàm không còn tồn tại hoặc bỏ sót thay đổi kiến trúc gần đây. Thứ ba, việc tạo vector embedding sinh ra một bản sao thứ cấp của tài sản trí tuệ, kéo theo nhu cầu lưu trữ và bảo mật bổ sung.

Thay vào đó, Cline làm việc như một lập trình viên giàu kinh nghiệm: khám phá mã nguồn một cách có hệ thống bằng cách lần theo các lệnh import và mối liên kết. Chẳng hạn khi sửa một hàm xử lý thanh toán, Cline lần theo import để tìm tiện ích xử lý lỗi tự viết, xem các hàm tương tự để nắm quy ước và kiểm tra nơi gọi hàm, qua đó xây dựng hiểu biết ngữ cảnh thay vì chỉ so khớp mẫu. Cách làm này khả thi nhờ khung ngữ cảnh rất lớn của các mô hình ngôn ngữ hiện đại, khiến bài toán chuyển từ lượng thông tin sang chất lượng thông tin: ưu tiên thấu hiểu hơn truy xuất.

## [Commit hoàn hảo](https://simonwillison.net/2022/Oct/29/the-perfect-commit/)

Simon Willison chia sẻ cách anh tổ chức công việc quanh khái niệm "commit hoàn hảo", xem mỗi commit là một đơn vị công việc được chuẩn bị kỹ chứ không chỉ là một điểm lưu tạm. Một commit như vậy gồm bốn phần: phần triển khai tập trung vào đúng một thay đổi, kiểm thử chứng minh nó hoạt động, tài liệu được cập nhật tương ứng và liên kết tới issue chứa ngữ cảnh. Theo anh, kiểm thử giúp tăng năng suất lâu dài vì cho phép thay đổi mã nguồn một cách tự tin và tránh lỗi hồi quy, nên mọi dự án nên bắt đầu với ít nhất một bài kiểm thử chạy thành công. Tài liệu, dù cho mô-đun Python, dịch vụ web hay công cụ dòng lệnh, cần nằm ngay trong kho mã để luôn đồng bộ với mã nguồn, có phiên bản rõ ràng và được xem xét cùng lúc với mã.

Thay vì viết thông điệp commit dài, Willison đưa ngữ cảnh vào issue trên GitHub, nơi dễ tìm kiếm, hỗ trợ hình ảnh và dễ bổ sung về sau. Anh thừa nhận cách này đi ngược triết lý truyền thống của Git nhưng giúp anh làm việc hiệu quả hơn. Không phải commit nào cũng cần đủ bốn phần: sửa lỗi nhỏ hay lỗi chính tả trong tài liệu có thể bỏ qua một vài yếu tố. Với công việc thử nghiệm, hãy dùng nhánh riêng với các commit nháp rồi squash-merge thành một commit gọn gàng vào nhánh chính. Để duy trì thói quen này, anh dùng mẫu cookiecutter khởi tạo sẵn khung kiểm thử và GitHub Actions ngay từ đầu, minh họa qua các dự án mã nguồn mở như Datasette và sqlite-utils.

## [Khoảnh khắc Kanagawa của kỹ thuật phần mềm](https://pashabitz.substack.com/p/the-software-engineering-kawagara)

Pasha dùng bức tranh khắc gỗ "Sóng lớn ngoài khơi Kanagawa" của Hokusai làm ẩn dụ cho làn sóng tự động hóa bằng AI đang định hình lại ngành kỹ thuật phần mềm. Theo tác giả, lập trình đặc biệt dễ bị tự động hóa vì có kho dữ liệu huấn luyện dồi dào, kết quả kiểm chứng được một cách khách quan và không vướng rào cản pháp lý như nhiều nghề khác. Các tác tử lập trình giờ đã vượt xa việc gợi ý hoàn thành mã, có thể biến một yêu cầu công việc thành pull request hoàn chỉnh. Tuyển dụng lập trình viên junior đã chững lại rõ rệt. Những việc rõ ràng, khép kín như tái cấu trúc hay viết kiểm thử đang được tự động hóa trước tiên.

Phần việc còn lại cho con người là hiểu nhu cầu kinh doanh, thiết kế sản phẩm, dựng khung kỹ thuật và định ra quy ước viết mã, dù tác giả thừa nhận ranh giới này khá mong manh vì mô hình ngôn ngữ lớn rồi cũng có thể làm được. Lời khuyên cho mọi kỹ sư là chủ động dùng tác tử lập trình, rà soát quy trình để tìm chỗ tự động hóa và trau dồi hiểu biết về sản phẩm lẫn kinh doanh; riêng lập trình viên junior nên tập xây dựng sản phẩm từ đầu đến cuối, học hạ tầng triển khai và tìm hiểu cách sản phẩm thực tế được làm ra thay vì chỉ theo hướng dẫn. Kết luận khá thẳng thắn: làn sóng này không thể ngăn lại, và giống như cơ giới hóa nông nghiệp từng đẩy người lao động sang ngành khác, nó có thể xóa bỏ hàng triệu vị trí việc làm.

## [WebSockets đảm bảo thứ tự - vậy tại sao tin nhắn của tôi lại bị xáo trộn?](https://www.sitongpeng.com/writing/websockets-guarantee-order-so-why-are-my-messages-scrambled)

Bài viết kể lại một tình huống gỡ lỗi thú vị: tác giả thấy các tin nhắn WebSocket được ghi nhật ký sai thứ tự, dù WebSocket chạy trên TCP vốn bảo đảm thứ tự và việc chuyển phát tin nhắn. Thủ phạm không nằm ở giao thức mà ở tầng ứng dụng. Trình xử lý tin nhắn gọi `await blob.arrayBuffer()`, khiến việc thực thi tạm dừng trong lúc xử lý từng tin; vì mỗi tin mất thời gian khác nhau (từ 1 đến 5 giây), tin đến sau nhưng xử lý nhanh có thể hoàn tất trước tin đến trước nhưng xử lý chậm. Nói cách khác, TCP vẫn giao tin đúng thứ tự, chính mã xử lý bất đồng bộ đã xáo trộn chúng.

Tác giả đưa ra hai giải pháp. Cách thứ nhất gom tin nhắn vào một hàng đợi rồi xử lý theo lô năm tin bằng `Promise.all`, cho phép xử lý song song trong mỗi lô mà vẫn giữ đúng thứ tự kết quả. Cách thứ hai dùng async generator để xử lý tuần tự từng tin một, chậm hơn vì không song song nhưng bảo đảm thứ tự tuyệt đối khi logic ứng dụng đòi hỏi. Bài học rút ra là gỡ lỗi hệ thống nhiều tầng trừu tượng rất khó: ngay cả khi tầng giao thức đã bảo đảm độ tin cậy và thứ tự, cách xử lý đồng thời sai ở tầng ứng dụng vẫn có thể phá vỡ nó, nên cần phân biệt rõ hành vi ở từng tầng.

## [Tại sao các AI agent là những đối tác lập trình đôi tệ](https://justin.searls.co/posts/why-agents-are-bad-pair-programmers/)

Justin Searls cho rằng các tác tử AI là những bạn lập trình đôi tệ vì chúng "viết mã nhanh hơn con người suy nghĩ". Tốc độ ấy làm sự cộng tác đổ vỡ: lập trình viên không theo kịp, dần mất tập trung và không còn hiểu những gì đang diễn ra. Cảm giác giống như ghép cặp với một người giành bàn phím rồi im lặng gõ liên tục. Khi tác tử gặp trở ngại, con người lại không đủ nắm bắt các quyết định trước đó để hỗ trợ; tệ hơn, tác tử có thể giải sai bài toán, để lại một đống phức tạp thừa mà lập trình viên phải dọn dẹp về sau.

Searls đề xuất hai hướng. Một là chuyển sang quy trình bất đồng bộ: giao cho tác tử những nhiệm vụ độc lập rồi xem xét kết quả qua pull request, như tính năng Coding Agent mới của GitHub. Hai là giảm tốc khi làm việc đồng bộ, dùng chế độ "Edit" hoặc "Ask" thay vì chế độ "Agent" tự động hoàn toàn; kiểu ghép cặp luân phiên với chế độ Edit, nơi bạn phải duyệt từng thay đổi, là cân bằng nhất. Ông cũng gợi ý các nhà phát triển công cụ bổ sung tùy chỉnh tốc độ sinh mã, cho phép tạm dừng để hỏi lại, giao diện phản ánh đúng công việc như tích hợp GitHub và danh sách việc cần làm, khiến tác tử bớt tự tin và trao đổi xác nhận thường xuyên hơn, cùng tính năng trò chuyện bằng giọng nói. Những thay đổi này sẽ biến tác tử thành đối tác cộng tác thực thụ thay vì một người chạy nước rút đơn độc.

---

*Bài viết đã được viết lại bởi Claude Code với Opus 5.5 vào ngày 27/09/2026.*
