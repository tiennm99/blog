---
title: "Newsletter #79"
date: 2026-02-02
tags: ["AI-Assisted", "Newsletter", "Developer Tools", "Containers", "Claude Code", "LLMs", "Web Browsers"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #79.*

## [ASCII characters are not pixels: a deep dive into ASCII rendering](https://alexharri.com/blog/ascii-rendering)

Alex Harri chia sẻ cách xây dựng bộ chuyển đổi hình ảnh sang ASCII với đường viền sắc nét. Cách phổ biến là chia ảnh thành lưới, tính độ sáng của mỗi ô rồi chọn ký tự theo mật độ; kể cả khi lấy nhiều mẫu trong một ô (supersampling) để khử răng cưa, kết quả vẫn mờ vì mỗi ký tự bị đối xử như một điểm ảnh và hình dạng của nó bị bỏ qua. Giải pháp của tác giả là "shape vector": đặt các vòng tròn lấy mẫu trong mỗi ô, đo mức độ mỗi ký tự phủ lên từng vòng và dùng các con số đó làm vectơ mô tả hình dạng ký tự. Với sáu vòng tròn xếp so le, vectơ 6 chiều phân biệt được `p` với `q`, hay `^`, `-` và `_`; khi dựng ảnh, hệ thống lấy mẫu từng ô theo cùng cách rồi chọn ký tự có vectơ gần nhất theo khoảng cách Euclid, sau khi đã chuẩn hóa các vectơ.

Để ranh giới giữa các vùng có độ sáng khác nhau rõ hơn, tác giả thêm hai lớp tăng cường độ tương phản: toàn cục (chuẩn hóa vectơ mẫu rồi nâng lũy thừa để "ép" các thành phần tối xuống) và theo hướng (dùng các vòng tròn lấy mẫu nằm ngoài ô), nhờ đó khử được hiệu ứng bậc thang ở đường biên. Phần phụ lục bàn về hiệu năng: cây k-d để tăng tốc tìm láng giềng gần nhất, bộ nhớ đệm với khóa được lượng tử hóa, và chuyển việc lấy mẫu sang GPU để chạy mượt trên điện thoại. Theo tác giả, ý tưởng dùng vectơ nhiều chiều để biểu diễn hình dạng có thể áp dụng cho nhiều bài toán khác, tương tự word embedding.

## [From Bare Metal to Containers: A Developer's Guide to Execution Environments](https://buildsoftwaresystems.com/post/guide-to-execution-environments/)

Bài viết giải thích vì sao lỗi "chạy được trên máy tôi" thường bắt nguồn từ khác biệt về môi trường thực thi, rồi lần lượt đi từ tầng nặng nhất đến nhẹ nhất. Máy vật lý (bare metal) cho hiệu năng và quyền kiểm soát tối đa nhưng đắt và kém linh hoạt. Máy ảo dùng hypervisor chia một máy thành nhiều máy độc lập, mỗi máy có hệ điều hành riêng nên cách ly mạnh nhưng tốn tài nguyên. Container đóng gói ứng dụng cùng các phụ thuộc và dùng chung kernel của máy chủ nhờ namespaces và cgroups, nên khởi động nhanh nhưng cách ly yếu hơn. Process sandbox (chroot, Linux capabilities, seccomp, bubblewrap) giới hạn những gì một tiến trình được phép làm để thu hẹp phạm vi thiệt hại. Cuối cùng, môi trường ảo như `venv` chỉ cô lập phụ thuộc của ngôn ngữ lập trình, với xu hướng chuyển sang các bộ công cụ hợp nhất như uv, Conda hay Rustup cùng Cargo.

Thông điệp chính là mỗi công cụ có một ranh giới cách ly riêng, và mọi tầng bên dưới ranh giới đó phải tương thích sẵn: container không sửa được việc kernel không khớp, môi trường ảo không bù được thư viện hệ thống bị thiếu. Trên thực tế các lớp này thường được xếp chồng, chẳng hạn máy ảo trên đám mây chạy Docker, bên trong container lại dùng môi trường ảo. Tác giả cũng nhắc tới serverless và WebAssembly như những ranh giới cách ly mới, và gợi ý một câu hỏi để chọn đúng công cụ: tầng thấp nhất nào cần giống hệt nhau để mã nguồn chạy đúng?

## [Run Your Project in a Dev Container, in Zed](https://zed.dev/blog/dev-containers)

Từ phiên bản v0.218, Zed hỗ trợ làm việc bên trong Dev Containers, một đặc tả mở để thiết lập môi trường phát triển dựa trên Docker. Thay vì truyền miệng hay dựa vào README dễ lỗi thời về phiên bản công cụ, cơ sở dữ liệu hay biến môi trường, nhóm phát triển mô tả môi trường trong tệp `.devcontainer/devcontainer.json` theo hướng hạ tầng dưới dạng mã. Khi mở một dự án có tệp này, Zed hiện thông báo gợi ý mở trong Dev Container; người dùng cũng có thể dùng lệnh `project: open remote`, và Zed tự kết nối lại vào container gần nhất khi mở lại ứng dụng.

Về kỹ thuật, Zed tái sử dụng kiến trúc phát triển từ xa vốn dành cho SSH: một Zed Remote Server chạy trong container lo lưu tệp, làm việc với language server và phân tích cú pháp, còn Zed trên máy cục bộ lo giao diện; hai bên giao tiếp qua đầu vào/đầu ra chuẩn, nên chỉ cần viết thêm một lớp truyền tải dùng `docker exec`. Việc tạo container được giao cho CLI `devcontainer` chính thức (lệnh `devcontainer up`), giúp tính năng ra mắt nhanh nhưng chưa hỗ trợ `forwardPorts` và chưa khai báo được extension của Zed. Kế hoạch sắp tới gồm hỗ trợ soạn đặc tả ngay trong Zed, khai báo extension trong `devcontainer.json`, và hỗ trợ `forwardPorts` sau khi chuyển sang cách triển khai nội bộ.

## [I was a top 0.01% Cursor user. Here's why I switched to Claude Code 2.0](https://blog.silennai.com/claude-code)

Tác giả, người dùng AI để lập trình từ năm 2021, từng tham gia xây dựng AutoGPT và được Cursor xếp vào nhóm 0,01% người dùng hàng đầu, giải thích vì sao chuyển sang Claude Code: theo anh, Opus 4.5 đã đưa việc lập trình lên một tầng trừu tượng mới, nơi ta kiểm thử hành vi thay vì đọc từng dòng mã. Claude Code hợp với lối làm việc bất đồng bộ trên terminal, được tinh chỉnh riêng cho mô hình Claude, tiết kiệm chi phí và dễ tùy biến; Cursor vẫn hữu ích khi cần giao diện chuẩn đến từng điểm ảnh, khi tự học, hoặc cho những thay đổi nhỏ.

Nội dung chính xoay quanh năm trụ cột: quản lý ngữ cảnh (tạo subagent cho việc song song, dùng `/compact`, mở phiên mới khi chất lượng giảm, mỗi phiên một nhiệm vụ); lập kế hoạch (plan mode, danh sách việc kiểu sprint, hoặc chạy thử rồi hoàn tác để tinh chỉnh kế hoạch); khép vòng lặp bằng cách tự động hóa mọi việc lặp lại; khả năng kiểm chứng qua kiểm thử giao diện; và gỡ lỗi có hệ thống với "quy tắc ba lần": giải thích ba lần mà Claude vẫn không hiểu thì nên đổi cách tiếp cận. Tác giả đóng gói kinh nghiệm vào hai lệnh `/setup-claude-code` (chạy một lần mỗi máy) và `/setup-repo` (một lần mỗi dự án), đồng thời chia sẻ cách chạy 12 terminal song song và dùng hooks, skills, MCP cùng chế độ headless.

## [LLM predictions for 2026, shared with Oxide and Friends](https://simonwillison.net/2026/Jan/8/llm-predictions-for-2026/)

Simon Willison tổng hợp các dự đoán về ngành công nghệ trong 1, 3 và 6 năm mà ông chia sẻ trên podcast Oxide and Friends. Trong năm nay: chất lượng mã do LLM viết sẽ không thể phủ nhận, khi từ lúc Claude Opus 4.5 và GPT-5.2 ra mắt, phần mã ông tự gõ tay chỉ còn dưới 10%; bài toán sandbox sẽ được giải, với container và WebAssembly là hai hướng triển vọng nhất; sẽ xảy ra một "thảm họa Challenger" về bảo mật coding agent vì nhiều người đã quen chạy agent gần như với quyền root, chẳng hạn một con sâu prompt injection lây qua các gói Python hay npm; và, để làm nhẹ không khí, loài vẹt Kākāpō ở New Zealand sẽ có mùa sinh sản bội thu.

Trong ba năm, nghịch lý Jevons với coding agent sẽ ngã ngũ: kỹ năng kỹ sư phần mềm hoặc mất giá, hoặc trở nên quý hơn vì nhu cầu phần mềm tăng gấp nhiều lần; việc ai đó xây dựng một trình duyệt web chủ yếu bằng AI cũng sẽ chẳng còn gây bất ngờ, nhờ các bộ kiểm thử tuân thủ sẵn có. Trong sáu năm, việc gõ mã bằng tay sẽ đi theo con đường của thẻ đục lỗ, nhưng kỹ sư phần mềm vẫn là một nghề lớn, bởi xây dựng phần mềm vẫn đòi hỏi kỹ năng, kinh nghiệm và hiểu biết sâu.

## [How we made Notion available offline](https://www.notion.com/blog/how-we-made-notion-available-offline)

Notion kể lại cách họ xây dựng Offline Mode, tính năng được người dùng yêu cầu nhiều nhất trong nhiều năm. Trước đây ứng dụng đã dùng SQLite để lưu tạm bản ghi theo kiểu "cố gắng hết mức", không có bảo đảm nào; chế độ ngoại tuyến đòi hỏi một trang phải dùng được trọn vẹn khi mất mạng, nên bộ nhớ đệm được nâng thành lớp lưu trữ bền vững, theo dõi trang nào có sẵn ngoại tuyến, lưu mọi dữ liệu cần để hiển thị và ghi lại lý do. Cách dùng một tập hợp trang đơn giản thất bại khi có tự động tải về và "kế thừa ngoại tuyến" từ trang cha: một trang có thể có nhiều lý do độc lập để được giữ lại, và chỉ được gỡ khi lý do cuối cùng biến mất. Notion giải quyết bằng một rừng cây trang ngoại tuyến với hai bảng `offline_page` và `offline_action`, trong đó mỗi dòng của bảng sau là một lý do giữ trang.

Để giữ trang luôn mới, thay vì hỏi máy chủ định kỳ vốn không mở rộng được, máy chủ phát thông báo trên kênh của trang mỗi khi có thay đổi, còn máy khách đăng ký kênh cho các trang ngoại tuyến rồi tải phần thay đổi. Khi kết nối lại, máy khách so `lastDownloadedTimestamp` với `lastUpdatedTime` để chỉ tải những trang có phiên bản mới hơn. Khi trang bị di chuyển hay cơ sở dữ liệu thêm bớt dòng, hệ thống đối chiếu ảnh chụp mới với bảng `offline_action` và áp dụng tập chỉnh sửa tối thiểu, giữ rừng cây nhất quán dần với không gian làm việc mà không phải dựng lại từ đầu.

## [How Browsers Work](https://howbrowserswork.com/)

How Browsers Work là một hướng dẫn tương tác, mã nguồn mở, dành cho kỹ sư và những ai dùng web hằng ngày nhưng chưa có mô hình tư duy về cách trình duyệt hoạt động; tác giả dùng nhiều ví dụ nhỏ có thể tương tác và cố ý lược bớt các chi tiết như phiên bản HTTP hay TLS. Hành trình bắt đầu từ thanh địa chỉ: một chuỗi bất kỳ như "pizza" được chuyển thành URL tìm kiếm, còn "example.com" được chuẩn hóa thành https://example.com. URL sau đó trở thành một yêu cầu HTTP với các header như `Host`; trình duyệt hỏi DNS để phân giải tên miền thành địa chỉ IP, rồi thiết lập kết nối TCP qua bắt tay ba bước SYN, SYN-ACK, ACK, trong đó số thứ tự giúp dữ liệu đến đúng thứ tự và được gửi lại khi thất lạc.

Khi nhận phản hồi, trình duyệt tách header khỏi phần thân và đưa HTML vào bộ phân tích, vốn chạy theo luồng và chịu được lỗi, để dựng cây DOM: mô hình tài liệu trong bộ nhớ, là giao ước chung giữa bộ phân tích HTML, bộ chọn CSS và JavaScript. Cuối cùng là quy trình hiển thị gồm Layout tính kích thước và vị trí, Paint tô điểm ảnh, Composite ghép các lớp trên GPU. Không phải thay đổi nào cũng chạy lại mọi bước: đổi màu thường chỉ cần vẽ lại, còn đổi kích thước buộc tính lại bố cục, đó là lý do các trang nặng về bố cục có cảm giác chậm hơn.

**Đánh giá**: *Không biết vì sao nhưng mình cảm thấy bài viết này khá tốt^^ Chắc do hôm qua update lại file Agents.md, để cố gắng phát huy :)))*

---

*Bài viết đã được viết lại bởi Claude Code với Opus 5.5 vào ngày 27/09/2026.*
