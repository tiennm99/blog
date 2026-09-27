---
title: "Newsletter #101"
date: 2026-05-04
tags: ["AI-Assisted", "Newsletter", "LLM", "AI Agent", "Git", "Algorithms", "Developer Productivity"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #101.*

## [AI-Assisted Engineering: Q1 2026 Impact Report](https://newsletter.getdx.com/p/ai-assisted-engineering-q1-2026-impact)

Báo cáo quý 1 năm 2026 của DX tổng hợp dữ liệu từ hơn 400 công ty (tập dữ liệu mở rộng thêm hơn 40% so với quý trước) để đo tác động của AI lên hoạt động kỹ thuật phần mềm. Mức độ ứng dụng AI trong ngành đã chạm 93%. Đáng chú ý nhất là các Engineering Manager dùng AI hằng ngày hiện đưa vào sản phẩm lượng mã nguồn gấp **4 lần** so với sáu tháng trước, gấp đôi mức 2 lần ghi nhận ở quý trước — dấu hiệu cho thấy mô hình "player-coach", nơi người quản lý vừa dẫn dắt đội vừa trực tiếp viết mã, đang trở nên phổ biến. Về thời gian tiết kiệm, lập trình viên Junior dùng AI hằng ngày tiết kiệm **4,9 giờ mỗi tuần**, lần đầu vượt nhóm kỹ sư Staff+ (4,8 giờ), vốn trước đây luôn dẫn đầu.

Mặt trái cũng rõ ràng: ở một số tổ chức, tỷ lệ thay đổi gây lỗi khi triển khai có thể tăng tới 50% (tương đương dao động khoảng 2 điểm phần trăm), nên báo cáo nhấn mạnh kiểm thử tự động "không còn là tùy chọn". Hiện tượng "Shadow AI" — lập trình viên lách các cơ chế bảo vệ của doanh nghiệp để dùng công cụ AI không được phép — đòi hỏi chính sách sử dụng rõ ràng. Các công ty dưới 200 lập trình viên đang thu được hiệu quả nhanh hơn doanh nghiệp lớn. Cuối cùng, DX lưu ý các con số chỉ là mức trung bình ngành: tác động của AI rất không đồng đều giữa các tổ chức, nên mỗi đội cần tự đo lường cả tốc độ lẫn chất lượng thay vì chỉ so với chuẩn chung.

## [My AI Workflow (Without Losing My Skills)](https://marcgg.com/blog/2026/04/15/my-current-ai-workflow/)

Marc G chia sẻ cách anh tận dụng AI mà không đánh mất kỹ năng lập trình. Nỗi lo xuất phát từ "nghịch lý tự động hóa" (anh dẫn một tập podcast 99% Invisible về các sự cố hàng không do phi công quá phụ thuộc vào chế độ lái tự động): tự động hóa giúp làm nhanh hơn nhưng bào mòn kỹ năng, khiến ta càng phụ thuộc hơn. Vì vậy anh chia công việc theo từng loại. Khi lên kế hoạch, anh tự phác thảo trước rồi mới hỏi Claude để buộc bản thân suy nghĩ kỹ. Với công cụ cá nhân, anh "vibe code" thoải mái mà không bận tâm chất lượng. Với mã nguồn production, anh tự viết khoảng 50%, đọc lại mọi dòng do AI tạo ra, và chỉ giao cho Claude Code những phần phức tạp nhưng cô lập, có kiểm thử đầy đủ ("Omega Mess" theo cách gọi của Sandi Metz).

Ví dụ cụ thể là lần nâng cấp tính năng giọng nói cho ứng dụng tập boxing của anh: anh tự sửa các đoạn mã cũ để hiểu hệ thống, dựng công cụ tạo file MP3 bằng ElevenLabs, để Claude hoàn thành phần tái cấu trúc lớn sau khi đã có mẫu, còn giao diện thì tự viết vì nhanh gần bằng việc soạn prompt. Kết quả là tính năng lẽ ra mất nhiều tuần được hoàn thành trong vài ngày, hệ thống vẫn giữ uptime 98,84%. Thông điệp chính: thời gian AI tiết kiệm được nên dành để suy nghĩ sâu hơn về giá trị của tính năng, thay vì chạy theo số lượng.

## [Managing Context in Long-Run Agentic Applications](https://slack.engineering/managing-context-in-long-run-agentic-applications/)

Slack Engineering chia sẻ cách họ quản lý ngữ cảnh cho nền tảng điều tra bảo mật dùng nhiều agent, nơi một cuộc điều tra có thể kéo dài hàng trăm lượt gọi mô hình và sinh ra hàng megabyte dữ liệu. Nguyên tắc thiết kế cốt lõi là **không mang lịch sử hội thoại sang lần gọi agent tiếp theo**; thay vào đó, ngữ cảnh chỉ được truyền qua ba kênh tóm tắt liên tục. Cách làm này tránh tràn cửa sổ ngữ cảnh, giảm chi phí và độ trễ, đồng thời giúp agent phản ứng tốt hơn với thông tin mới vì không bị ngữ cảnh cũ tích tụ đè nặng.

Kênh thứ nhất là **Director's Journal**, bộ nhớ làm việc có cấu trúc ghi theo thời gian các quyết định, quan sát, phát hiện, câu hỏi, hành động và giả thuyết, kèm siêu dữ liệu (giai đoạn, vòng, thời điểm) và trích dẫn bằng chứng, giúp mọi agent bám cùng một mạch điều tra. Kênh thứ hai là **Critic's Review**, chấm độ tin cậy cho phát hiện của các agent chuyên gia theo năm mức, từ Trustworthy (0,9–1,0) đến Misguided (0,0–0,29). Trên 170.000 phát hiện được đánh giá, 37,7% đạt mức đáng tin cậy nhất, còn khoảng 26% rơi vào hai mức thấp nhất (suy đoán hoặc sai lệch). Kênh thứ ba là **Critic's Timeline**, dựng dòng thời gian hợp lý nhất từ bản đánh giá mới nhất, dòng thời gian trước đó và nhật ký của Director, chỉ giữ bằng chứng đáng tin và chỉ ra các khoảng trống — nhờ đó lọc được các ảo giác (hallucination) không có cơ sở.

## [How The Heck Does Shazam Work?](https://perthirtysix.com/how-the-heck-does-shazam-work)

Bài viết giải thích trực quan cách Shazam nhận ra một bài hát chỉ sau vài giây, kể cả trong môi trường ồn ào, dựa trên một ý tưởng nghe có vẻ ngược đời: **vứt bỏ gần như toàn bộ dữ liệu**, chỉ giữ lại những gì thật sự đặc trưng. Micro chuyển âm thanh thành tín hiệu số dạng sóng, nhưng dạng sóng thô không thích hợp để so khớp vì cùng một bài hát phát to hay nhỏ sẽ cho dạng sóng khác hẳn. Vì vậy ứng dụng áp dụng **Fast Fourier Transform (FFT)** lên từng lát âm thanh ngắn để tách ra các tần số, rồi xếp các lát lại thành spectrogram — biểu đồ thể hiện thời gian, tần số và độ lớn. Từ đó chỉ các đỉnh to nhất được giữ lại, tạo thành một "bản đồ chòm sao" thưa thớt; tiếng ồn nền hiếm khi tạo ra đỉnh nổi bật nên cách này chống nhiễu rất tốt.

Để tạo dấu vân tay, hệ thống ghép cặp các đỉnh gần nhau, mỗi cặp sinh ra một giá trị băm gọn nhẹ từ ba thông số: hai tần số và khoảng cách thời gian giữa chúng. Việc tra cứu dùng **inverted index** — với mỗi giá trị băm, hỏi xem bài hát nào chứa nó — thay vì duyệt tuần tự qua hàng triệu bài, nên kết quả trả về gần như tức thì. Bước cuối cùng là xác nhận: khi đủ nhiều giá trị băm khớp và có khoảng cách thời gian nhất quán, bài hát được xác định.

## [Agents with Taste](https://emilkowal.ski/ui/agents-with-taste)

Emil Kowalski nhận thấy các coding agent xử lý logic rất tốt nhưng lúng túng với quyết định thiết kế giao diện, và đề xuất cách khắc phục: đóng gói gu thẩm mỹ thành các file skill giải thích rõ *vì sao* một lựa chọn thiết kế hiệu quả, rồi đưa chúng cho agent. Lập luận của anh là gu thẩm mỹ không phải phép màu — "gần như mọi quyết định về gu đều có lý do hợp lý nếu nhìn đủ kỹ", và khi đã giải thích được lý do thì có thể viết thành quy tắc để agent tuân theo nhất quán.

Các ví dụ rất cụ thể: animation nên bắt đầu từ `scale(0.95)` thay vì `scale(0)` vì trông giống thế giới thực hơn, như một quả bóng bay xẹp một phần; hàm easing được chọn theo sơ đồ quyết định, chẳng hạn phần tử đi vào khung nhìn dùng `ease-out`, còn thay đổi khi di chuột dùng `ease`. Về thời lượng, tương tác nhỏ mất 100–150ms, phần tử giao diện thông thường 150–250ms, modal 200–300ms, và animation giao diện nói chung nên dưới 300ms. Về typography, giới hạn dòng văn bản khoảng 65 ký tự, dùng chữ số dạng bảng cho cột giá tiền và chỉ gạch chân cho liên kết. Khi logic đằng sau thiết kế được ghi lại, lập trình viên nhận được đòn bẩy lớn hơn từ agent mà vẫn giữ được chất lượng.

## [Floating Point from Scratch: Hard Mode](https://essenceia.github.io/projects/floating_dragon/)

Julia Desmazes ghi lại hành trình tự hiện thực số dấu phẩy động (floating-point) trên phần cứng từ đầu — thử thách từng khiến cô "sợ" suốt nhiều năm — cho một bộ tăng tốc nhân ma trận dạng systolic array. Cô chọn định dạng **bfloat16** (1 bit dấu, 8 bit số mũ, 7 bit phần định trị) vì cần ít transistor hơn float16, có dải giá trị đủ rộng cho các tác vụ AI vốn không nhạy với sai số, và dễ chuyển đổi sang float32. Để giảm độ phức tạp, thiết kế chỉ hỗ trợ chế độ làm tròn về 0, bỏ qua số dưới chuẩn (subnormal), NaN và vô cực. Bộ cộng dùng kiến trúc **dual-path**: nhánh "close path" xử lý phép trừ khi hiệu số mũ nhỏ hơn 2, nhánh "far path" xử lý các trường hợp còn lại, tránh đường tới hạn dài của thiết kế một nhánh; bộ nhân dùng mã hóa Booth radix-4. Cả hai phép tính hoàn tất trong một chu kỳ.

Việc kiểm thử được làm vét cạn toàn bộ 2^32 tổ hợp đầu vào bằng Verilator, so với mô hình tham chiếu viết bằng C++ qua giao diện DPI-C; cô phát hiện kiểu bfloat16 của thư viện chuẩn C++ tính nội bộ bằng float32 nên có thể lệch tối đa 1 ULP, buộc phải đặt tiêu chí chấp nhận cẩn thận. Hai thiết kế đã được tapeout trên tiến trình IHP 130nm: toàn bộ systolic array với diện tích 126.685 µm², và một bộ nhân độc lập đạt **454 MHz**. Một bài học thú vị là bộ đếm số 0 đứng đầu viết đơn giản bằng `casez` lại cho kết quả tốt hơn thiết kế dạng cây truyền thống, cho thấy công cụ tổng hợp tối ưu rất hiệu quả.

## [The Peril of Laziness Lost](https://bcantrill.dtrace.org/2026/04/12/the-peril-of-laziness-lost/)

Bryan Cantrill lập luận rằng LLM đang làm mất đi một đức tính quan trọng của lập trình viên giỏi: **sự lười biếng** theo định nghĩa của Larry Wall — động lực khiến ta xây dựng các abstraction mạnh mẽ để giảm công sức về sau. Đây là kiểu lười đòi hỏi nỗ lực trí tuệ thật sự, cần thời gian ngẫm nghĩ để tìm ra giải pháp tốt hơn. Giới hạn về thời gian và sức lực của con người vốn là *bộ lọc tự nhiên* buộc kỹ sư phải đơn giản hóa hệ thống; LLM thì không có giới hạn đó, có thể sinh mã nguồn vô tận mà không chịu áp lực tối giản, dẫn tới những hệ thống cồng kềnh thay vì thanh lịch.

Ví dụ tiêu biểu là việc Garry Tan khoe viết được 37.000 dòng mã mỗi ngày nhờ LLM, trong khi toàn bộ DTrace — hệ thống từng thay đổi cả ngành — chỉ khoảng 60.000 dòng. Khi xem xét kỹ, sản phẩm đó chứa bộ kiểm thử thừa, một ứng dụng Rails "Hello World", một trình soạn thảo văn bản "đi lậu" và tám phiên bản logo, trong đó có một file rỗng. Tác giả gọi đó là sự chăm chỉ giả tạo, được thổi phồng bởi LLM và văn hóa "cày cuốc", chỉ tạo ra khối lượng mà không nghĩ tới hậu quả cho người bảo trì sau này. Kết luận: nên dùng LLM để phục vụ sự lười biếng đúng nghĩa — xử lý nợ kỹ thuật, nâng cao tính chặt chẽ trong kỹ thuật — chứ không thay thế tư duy thiết kế của con người.

## [Cleaning Up Merged Git Branches: A One-Liner from the CIA's Leaked Dev Docs](https://spencer.wtf/2026/02/20/cleaning-up-merged-git-branches-a-one-liner-from-the-cias-leaked-dev-docs.html)

Spencer Dixon giới thiệu một lệnh git một dòng anh tìm thấy trong bộ tài liệu Vault7 do WikiLeaks công bố năm 2017, vốn chứa cả tài liệu hướng dẫn nội bộ dành cho lập trình viên của CIA bên cạnh các công cụ tấn công. Lệnh này giải quyết một vấn đề quen thuộc: sau một thời gian làm việc, repository ở máy local tích tụ hàng chục nhánh đã merge nhưng không còn dùng. Bản gốc lọc theo `master`; phiên bản cập nhật cho các dự án hiện nay so sánh với `origin/main` và loại trừ cả `main` lẫn `develop`:

```bash
git branch --merged origin/main | grep -vE "^\s*(\*|main|develop)" | xargs -n 1 git branch -d
```

Lệnh nối ba bước: `git branch --merged origin/main` liệt kê các nhánh đã merge, `grep -vE` loại bỏ nhánh hiện tại cùng các nhánh chính để tránh xóa nhầm, còn `xargs` xóa từng nhánh còn lại bằng cờ `-d` chữ thường — cờ này từ chối xóa nhánh chưa merge nên rất an toàn. Tác giả khuyên tạo alias git (anh đặt tên `ciaclean`) để khỏi phải nhớ cú pháp và chạy nó sau mỗi lần triển khai, giúp danh sách nhánh gọn lại chỉ còn vài nhánh đang hoạt động và tiết kiệm vài phút mỗi tuần.

## [Agent Harness Engineering](https://addyosmani.com/blog/agent-harness-engineering/)

Addy Osmani cho rằng chất lượng của coding agent phụ thuộc vào **harness** — lớp khung vận hành bao quanh mô hình — nhiều hơn chính mô hình: "một mô hình tạm được với harness tốt sẽ thắng mô hình tốt với harness tệ". Khoảng cách giữa những gì mô hình hiện nay có thể làm và những gì chúng thực sự làm được phần lớn là vấn đề của harness. Harness bao gồm system prompt và tài liệu hướng dẫn (`AGENTS.md`, file skill), hệ thống file và quản lý phiên bản để lưu trạng thái bền vững, môi trường thực thi sandbox, hệ thống bộ nhớ qua nhiều phiên, cơ chế quản lý ngữ cảnh như nén hội thoại, điều phối tác vụ dài hạn bằng lập kế hoạch và vòng kiểm chứng, cùng các hook bắt buộc thực thi quy tắc một cách tất định.

Các nguyên tắc nổi bật gồm cách nhìn "skill issue": phần lớn lỗi của agent đến từ cấu hình kém chứ không phải năng lực mô hình, nên vấn đề trở nên xử lý được. **Ratchet Principle** coi mỗi lỗi là tín hiệu lâu dài — mỗi sai sót được biến thành một quy tắc cấu hình để agent không lặp lại, và mỗi quy tắc phải truy ngược được về một sự cố cụ thể. File hướng dẫn nên ngắn gọn; HumanLayer giữ `AGENTS.md` dưới 60 dòng, giống danh sách kiểm tra của phi công. Tác giả cũng khuyên thiết kế ngược từ hành vi mong muốn, mỗi thành phần phải lấp một khoảng trống năng lực cụ thể, và lưu ý rằng khi mô hình mạnh lên, harness không biến mất mà chuyển sang giải quyết những bài toán khó hơn.

---

*Bài viết đã được viết lại bởi Claude Code với Opus 5.5 vào ngày 27/09/2026.*
