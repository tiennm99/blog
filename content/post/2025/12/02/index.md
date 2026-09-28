---
title: "Newsletter #62"
date: 2025-12-02
tags: ["AI-Assisted", "Claude Skills", "Environment Variables", "Documentation", "Multi-Core", "Performance", "AI-Coding"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #62. ~~Bài viết này được thực hiện bởi VSCode Chat + OpenRouter + xAI: Grok 4.1 Fast (free)~~*

## [Claude Skills are awesome, maybe a bigger deal than MCP](https://simonwillison.net/2025/Oct/16/claude-skills/)

Anthropic vừa giới thiệu **Claude Skills**, một cách đơn giản để bổ sung năng lực mới cho mô hình: mỗi skill là một thư mục chứa tệp Markdown hướng dẫn mô hình cách làm một việc, kèm tài liệu phụ và các script viết sẵn nếu cần. Điểm khiến nó thành một tính năng thực thụ là khi bắt đầu phiên làm việc, Claude chỉ đọc phần mô tả ngắn trong YAML frontmatter của từng skill (vài chục token mỗi skill) và chỉ nạp toàn bộ nội dung khi yêu cầu của người dùng thực sự liên quan. Simon Willison thử skill **slack-gif-creator** để tạo ảnh GIF so sánh Skills với MCP: Claude viết script Python dùng thư viện PIL dựng ảnh động, rồi gọi hàm kiểm tra có sẵn trong skill để bảo đảm tệp không vượt giới hạn 2MB của Slack. Ảnh đầu tiên khá tệ, nhưng skill rất dễ chỉnh sửa.

Skills phụ thuộc hoàn toàn vào môi trường thực thi mã nguồn có hệ thống tệp và khả năng chạy lệnh, như Claude Code, Codex CLI hay Gemini CLI; đây là khác biệt lớn nhất so với MCP hay ChatGPT Plugins. Theo tác giả, Claude Code thực chất là một agent đa năng: chỉ cần một thư mục Markdown mô tả cách lấy dữ liệu điều tra dân số, nạp vào SQLite hay DuckDB, xuất bản dưới dạng Parquet và trực quan hóa bằng D3 là đã có một agent phục vụ báo chí dữ liệu. So với MCP vốn tiêu tốn hàng chục nghìn token chỉ để mô tả công cụ và có đặc tả giao thức phức tạp, Skills chỉ là Markdown cùng chút metadata, dễ chia sẻ và dùng được với cả mô hình khác. Chính sự đơn giản là điểm mạnh của nó.

## [Environment variables are a legacy mess: Let's dive deep into them](https://allvpv.org/haotic-journey-through-envvars/)

Biến môi trường là một giao diện cũ từ thời Unix nhưng đến nay vẫn là cách phổ biến để truyền tham số lúc chạy cho ứng dụng: một từ điển chuỗi phẳng, toàn cục, không có không gian tên hay kiểu dữ liệu. Chúng được truyền từ tiến trình cha sang tiến trình con qua lời gọi hệ thống `execve` với ba tham số `filename`, `argv` và `envp`; mặc định hầu hết công cụ đều chuyển tiếp toàn bộ môi trường, trừ vài trường hợp như `login` tạo môi trường mới. Sau khi khởi chạy, kernel đặt các biến lên stack dưới dạng chuỗi kết thúc bằng ký tự null, và mỗi chương trình phải tự sao chép chúng vào cấu trúc dữ liệu riêng: Bash dùng một chồng hashmap (nên có thể `export` cả biến `local`), glibc dùng mảng động khiến `getenv` và `putenv` có độ phức tạp tuyến tính, còn `os.environ` của Python chỉ đồng bộ một chiều xuống hàm `putenv` của thư viện C.

Kernel rất dễ dãi về định dạng: chấp nhận tên trùng lặp, chuỗi không có dấu `=`, thậm chí cả emoji, chỉ giới hạn mỗi biến khoảng 128 KiB và tổng cộng khoảng 2 MiB dùng chung với tham số dòng lệnh. Bash sẽ loại bỏ mục trùng và mục vô nghĩa, còn tên chứa khoảng trắng (Nushell và Python xử lý được) được Bash giữ trong bảng `invalid_env` và vẫn truyền cho tiến trình con. Trái với quan niệm phổ biến, POSIX chỉ bắt buộc tên không chứa `=` và còn khuyến khích dùng chữ thường để tránh trùng với các tiện ích chuẩn, dù quy ước thực tế vẫn là viết hoa. Khuyến nghị của tác giả: đặt tên theo mẫu `^[A-Z_][A-Z0-9_]*$` và dùng UTF-8 cho giá trị.

## [Examples are the best documentation](https://rakhim.exotext.com/examples-are-the-best-documentation)

Tác giả cho rằng ví dụ là dạng tài liệu hữu ích nhất: 95% số lần tra cứu, chỉ một ví dụ đơn giản là đủ, nhưng tài liệu chính thức hiếm khi có. Tài liệu kỹ thuật thường được viết cho người đã am hiểu hệ sinh thái, trong khi lập trình viên phải chuyển qua lại giữa nhiều dự án, ngôn ngữ và framework, lần nào cũng tốn công khôi phục ngữ cảnh. Chẳng hạn, chữ ký `max(iterable, /, *, key=None)` trong tài liệu Python đòi hỏi phải hiểu `*`, `/`, tham số chỉ theo vị trí, iterable và tham số chỉ theo từ khóa, trong khi vài dòng ví dụ dưới đây trả lời ngay câu hỏi thường gặp nhất:

```
max(4, 6) # → 6
max([1, 2, 3]) # → 3
max(['x', 'y', 'abc'], key=len) # → 'abc'
max([]) # ValueError
max([], default=5) # → 5
```

Dự án cộng đồng clojuredocs.org của Clojure là một hình mẫu: người dùng đóng góp ví dụ cho từng hàm có sẵn, thường kèm cả các hàm liên quan (như `into`, `spit`, `map`), giúp ví dụ sát với thực tế hơn. Vì hiếm dự án nào có đủ bốn loại tài liệu, tác giả thường ngại bấm vào liên kết "Documentation" do lo gặp một bản tham chiếu API tự động sinh, khô khan và khó đọc; thay vào đó, ông tìm bài hướng dẫn, không phải để được dẫn dắt từng bước mà để có ví dụ.

## [Hazardous States and Accidents](https://entropicthoughts.com/hazardous-states-and-accidents)

Bài viết giới thiệu một khái niệm nền tảng trong các hệ thống an toàn trọng yếu: phân biệt **tai nạn** (thiệt hại thực sự) với **trạng thái nguy hiểm**. Tai nạn chỉ xảy ra khi hệ thống ở trạng thái nguy hiểm và gặp điều kiện môi trường bất lợi (H ∧ E ⇔ A); vì ta chỉ kiểm soát được hệ thống chứ không kiểm soát được môi trường, cách đạt được an toàn là tránh các trạng thái nguy hiểm. Ví dụ, máy bay thương mại hạ cánh khi chỉ còn nhiên liệu cho dưới 30 phút bay là đã rơi vào trạng thái nguy hiểm dù chuyến bay vẫn an toàn, bởi chỉ cần thời tiết xấu là có thể dẫn đến tai nạn; tương tự, một đứa trẻ không thể hứa "không bị ngã", nhưng có thể hứa không đứng sát mép đá khi không ai đỡ bên dưới.

Duy trì các ràng buộc an toàn là một bài toán điều khiển động: nhiều bộ điều khiển quan sát phản hồi về trạng thái hiện tại, dùng mô hình tư duy để dự đoán tương lai rồi đưa ra hành động điều chỉnh; hệ thống rơi vào trạng thái nguy hiểm khi một trong ba yếu tố này không đủ, kể cả khi hành động quá yếu hoặc quá mạnh. Bộ điều khiển tồn tại ở mọi cấp, từ FADEC trong động cơ, phi công đến kiểm soát không lưu và cơ quan quản lý. Dự đoán trạng thái nguy hiểm dễ hơn nhiều so với dự đoán tai nạn. Vì vậy cần phân tích cả những lần suýt xảy ra sự cố thay vì chờ tai nạn, điều ngành hàng không làm rất tốt nhưng ngành phần mềm thường bỏ qua.

## [Multi-Core By Default](https://www.dgtlgrove.com/p/multi-core-by-default)

Ryan Fleury lập luận rằng lập trình đa lõi nên là mặc định chứ không phải một kỹ thuật đặc biệt chèn vào mã đơn luồng, vì CPU hiện đại có tới 8, 16, 32 hay 64 lõi và bỏ qua chúng là lãng phí rất nhiều hiệu năng. Các cách làm quen thuộc như "parallel for" hay job system đều có cái giá: phải tạo luồng qua kernel hoặc gửi việc cho nhóm luồng, tự chia nhỏ công việc, luồng điều khiển bị phân tán qua nhiều lõi và thời điểm nên khó gỡ lỗi, còn vòng đời tài nguyên trở nên phức tạp. Lấy cảm hứng từ shader GPU, tác giả đảo ngược cách tiếp cận: khởi động sẵn nhiều luồng ("lane") cùng chạy một hàm `EntryPoint`, dùng `LaneIdx()`, `LaneCount()` và `LaneSync()` để chia việc đồng đều và đồng bộ qua barrier.

Với bài toán tính tổng một mảng, mỗi lane dùng `LaneRange` để nhận một đoạn dữ liệu, tính tổng riêng rồi cộng dồn bằng phép toán nguyên tử. Những phần buộc phải chạy tuần tự như đọc tệp hay in kết quả được thu hẹp về một lane bằng `if (LaneIdx() == 0)`, sau đó chia sẻ kết quả (chẳng hạn con trỏ bộ đệm) cho các lane khác bằng `LaneSyncU64`. Công việc không đồng đều có thể dùng bộ đếm nguyên tử để các lane tự nhận việc, hoặc đổi sang thuật toán đồng đều hơn, như radix sort thay cho sắp xếp dựa trên so sánh. Cách viết này cần ít cơ chế hơn, dễ gỡ lỗi vì mọi lane có cùng ngăn xếp lời gọi đầy đủ, và vẫn chạy được trên một lõi chỉ bằng cách đặt số luồng bằng 1. Tác giả áp dụng nó khi phát triển trình gỡ lỗi.

## [Vibing a Non-Trivial Ghostty Feature](https://mitchellh.com/writing/non-trivial-vibing)

Mitchell Hashimoto chia sẻ toàn bộ quá trình dùng agentic coding (với công cụ Amp) để phát triển tính năng thông báo cập nhật kín đáo trên macOS cho Ghostty. Ông tự lên kế hoạch trước khi dùng AI: tùy biến giao diện của framework cập nhật Sparkle và đặt một nút nhỏ trên thanh tiêu đề. Phiên đầu tiên chỉ yêu cầu agent lập kế hoạch rồi dựng thử giao diện SwiftUI; kết quả đúng hướng nhưng có lỗi xung đột với thanh tab mà cả agent lẫn ông đều không sửa được, nên ông chuyển sang hiển thị lớp phủ ở góc dưới bên phải cửa sổ, vốn cũng cần cho chế độ ẩn thanh tiêu đề. Ở phần backend, ông tự viết khung hàm kèm chú thích TODO để agent điền vào, nhưng phải bỏ đi vì sai hướng; chỉ sau khi tự tái cấu trúc view model sang dạng tagged union, các phiên tiếp theo mới cho kết quả tốt.

Quy trình của ông gồm: lập kế hoạch cùng "oracle", chia việc thành phần nhỏ, dành các phiên riêng để dọn dẹp, viết tài liệu và tái cấu trúc mã nguồn, tạo kịch bản mô phỏng để kiểm thử các luồng cập nhật, nối backend với frontend, và cuối cùng luôn hỏi agent còn gì cần cải thiện. Ông nhấn mạnh phần viết tay và việc tự rà soát kỹ trước khi hợp nhất là bắt buộc, không bao giờ phát hành mã nguồn mình không hiểu. Tổng cộng có 16 phiên, chi phí token 15,98 USD và khoảng 8 giờ làm việc; tác giả cho rằng cách này nhanh hơn tự làm, nhất là khi tinh chỉnh giao diện SwiftUI, và AI có thể làm việc trong lúc ông bận việc khác.

## Bonus: Vài ảnh hay ho đến từ [ByteByteGo](https://bytebytego.com/)

![A Guide to Microservices Architecture for Building Scalable Systems](https://substackcdn.com/image/fetch/$s_!lKZF!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fde422306-ef24-4d81-ac91-cb24ff284706_2250x2624.heic)

*Kết quả của combo này mình đánh giá khoảng 4-6đ, cấu trúc ổn, chốt được nội dung cốt lõi tuy nhiên còn dùng nhiều từ tiếng Anh. Ưu điểm là sẵn có trong VSCode, tận dụng được built-in feature của VSCode, không phải chạy thêm Terminal*

---

*Bài viết đã được viết lại bởi Claude Code với Opus 5.5 vào ngày 27/09/2026.*
