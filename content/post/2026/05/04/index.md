---
title: "Newsletter #101"
date: 2026-05-04
tags: ["AI-Assisted", "Newsletter", "LLM", "AI Agent", "Git", "Algorithms", "Developer Productivity"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #101.*

## [AI-Assisted Engineering: Q1 2026 Impact Report](https://newsletter.getdx.com/p/ai-assisted-engineering-q1-2026-impact)

Báo cáo quý 1 năm 2026 từ DX phân tích cách hơn 400 công ty đang tích hợp AI vào quy trình kỹ thuật phần mềm. Kết quả cho thấy mức độ ứng dụng AI đã đạt tới 93% trong các tổ chức được khảo sát — một con số phản ánh sự thâm nhập sâu rộng của AI vào ngành công nghệ.

Điểm nổi bật là các Engineering Manager sử dụng AI hàng ngày đang ship code nhiều hơn **4 lần** so với sáu tháng trước, tăng gấp đôi so với mức 2x ghi nhận trong Q4 2025. Xu hướng này phản ánh sự xuất hiện của mô hình "player-coach" — các manager vừa lãnh đạo vừa trực tiếp đóng góp mã nguồn nhờ AI giảm thiểu chi phí chuyển đổi ngữ cảnh. Đặc biệt, lập trình viên cấp Junior hiện tiết kiệm được **4,9 giờ mỗi tuần** khi dùng AI hàng ngày, vượt qua cả kỹ sư cấp Staff+ với 4,8 giờ — cho thấy AI đang dân chủ hóa năng suất làm việc cho mọi cấp độ kinh nghiệm.

Tuy nhiên, báo cáo cũng cảnh báo về các rủi ro đáng chú ý: tỷ lệ thất bại khi triển khai tăng tới 50% ở một số tổ chức, cùng với hiện tượng "Shadow AI" khi lập trình viên bỏ qua các chính sách bảo mật của doanh nghiệp để dùng công cụ AI ngoài luồng. Ngoài ra, các công ty có dưới 200 lập trình viên đang tận dụng AI hiệu quả hơn so với các tổ chức lớn hơn.

**Điểm chính:**
- Mức độ ứng dụng AI trong kỹ thuật phần mềm đạt 93% tại các tổ chức được khảo sát
- Engineering Manager dùng AI hàng ngày ship code nhiều gấp 4 lần so với 6 tháng trước
- Lập trình viên Junior tiết kiệm 4,9 giờ/tuần với AI, vượt cả kỹ sư cấp Staff+
- Tỷ lệ thất bại khi triển khai tăng tới 50% ở một số tổ chức — cần đo lường chất lượng song song
- Công ty nhỏ (<200 lập trình viên) đang vượt trội hơn công ty lớn về hiệu quả sử dụng AI

## [My AI Workflow (Without Losing My Skills)](https://marcgg.com/blog/2026/04/15/my-current-ai-workflow/)

Marc G chia sẻ cách ông cân bằng giữa việc sử dụng AI và duy trì kỹ năng lập trình cốt lõi. Nỗi lo trung tâm là "nghịch lý tự động hóa" — khi tự động hóa giúp ta làm việc nhanh hơn nhưng đồng thời làm xói mòn kỹ năng, dẫn đến phụ thuộc ngày càng nhiều hơn vào AI.

Phương pháp của ông được chia theo từng giai đoạn: khi **lên kế hoạch**, ông luôn tự suy nghĩ trước khi hỏi Claude để đảm bảo tư duy không bị thụ động. Với **công cụ và prototype nhanh**, ông "vibe code" hoàn toàn để tiết kiệm thời gian. Còn với **code production**, khoảng 50% được viết thủ công, và toàn bộ code AI tạo ra đều được review 100%. Đối với các phần code phức tạp và cô lập ("Omega Messes" theo định nghĩa của Sandi Metz), ông giao hẳn cho Claude Code xử lý kèm kiểm thử kỹ lưỡng. Thời gian tiết kiệm được từ việc code nhanh hơn được dành để suy nghĩ sâu hơn về tính năng, thay vì vội vàng xây dựng.

Ông minh họa quy trình này qua việc cập nhật ứng dụng boxing của mình — tích hợp API ElevenLabs và hệ thống phát MP3, hoàn thành dự án nhiều tuần chỉ trong vài ngày, với uptime đạt 98,84%.

**Điểm chính:**
- Tự lên kế hoạch trước khi dùng AI để tránh thụ động hóa tư duy
- Viết thủ công ~50% code production để duy trì kỹ năng
- Review 100% mã nguồn do AI tạo ra, không bỏ qua bất kỳ dòng nào
- Giao các phần code phức tạp, cô lập cho AI xử lý kèm kiểm thử đầy đủ
- Thời gian tiết kiệm được nên dùng để suy nghĩ sâu hơn, không phải để ship nhiều hơn

## [Managing Context in Long-Run Agentic Applications](https://slack.engineering/managing-context-in-long-run-agentic-applications/)

Bài viết từ Slack Engineering chia sẻ cách đội ngũ kỹ thuật giải quyết thách thức cốt lõi trong các hệ thống multi-agent: duy trì khả năng suy luận liên tục qua hàng trăm lượt gọi AI và hàng megabyte dữ liệu đầu ra mà không bị tràn cửa sổ ngữ cảnh.

Giải pháp của Slack xoay quanh ba kênh ngữ cảnh bổ sung cho nhau. **Director's Journal** là bộ nhớ làm việc có cấu trúc, ghi lại sáu loại thông tin: quyết định, quan sát, phát hiện, câu hỏi, hành động và giả thuyết — đóng vai trò "mạch tường thuật chung" giúp các agent phụ luôn đi đúng hướng. **Critic's Review** đánh giá các phát hiện từ Expert agents bằng thang điểm tin cậy 5 mức, từ "Đáng tin cậy" (0,9–1,0) đến "Sai lệch" (0,0–0,29) — dữ liệu cho thấy khoảng 27% phát hiện không qua được ngưỡng kiểm chứng. **Critic's Timeline** tổng hợp toàn bộ thành một mạch tường thuật thời gian, bắt buộc các phát hiện mới phải nhất quán với bằng chứng đã có, từ đó lọc hiệu quả các ảo giác (hallucination) thiếu cơ sở.

Điểm thiết kế quan trọng nhất: **không truyền lịch sử tin nhắn giữa các lần gọi agent** — chỉ ba kênh trên được chuyển tiếp, tránh tình trạng ngữ cảnh tích lũy phình to theo thời gian.

**Điểm chính:**
- Hệ thống multi-agent dài hạn cần chiến lược quản lý ngữ cảnh chủ động, không thể dựa vào lịch sử hội thoại
- Director's Journal giữ mạch điều tra liên tục qua nhiều vòng suy luận
- Critic's Review với thang điểm tin cậy giúp lọc ~27% phát hiện không đáng tin
- Critic's Timeline đảm bảo nhất quán tường thuật, ngăn hallucination lan rộng
- Nguyên tắc: mỗi agent chỉ nhận đúng phần ngữ cảnh cần thiết, không hơn

## [How The Heck Does Shazam Work?](https://perthirtysix.com/how-the-heck-does-shazam-work)

Bài viết giải thích một cách trực quan cách Shazam nhận diện bài hát chỉ trong vài giây, dù thu âm trong môi trường ồn ào. Toàn bộ quy trình dựa trên một nguyên tắc thú vị: **bỏ đi càng nhiều dữ liệu càng tốt**, chỉ giữ lại những gì thực sự quan trọng.

Khi micro thu âm, tín hiệu được số hóa thành dạng sóng. Tuy nhiên dạng sóng thô không dùng được để so khớp vì cùng một bài hát phát to hay nhỏ sẽ tạo ra dạng sóng hoàn toàn khác nhau. Vì vậy Shazam áp dụng **Fast Fourier Transform (FFT)** để phân tách âm thanh thành các thành phần tần số, tạo ra một spectrogram — bản đồ ba chiều thể hiện thời gian, tần số và biên độ. Từ spectrogram này, hệ thống chỉ giữ lại các đỉnh âm lượng nổi bật nhất, tạo thành một "bản đồ chòm sao" thưa thớt. Tiếng ồn nền hiếm khi tạo ra các đỉnh nổi bật, nên phương pháp này rất bền vững với nhiễu môi trường.

Để tạo dấu vân tay, hệ thống ghép cặp các đỉnh gần nhau và tạo ra các hash dựa trên ba giá trị: hai tần số và khoảng thời gian giữa chúng. Cuối cùng, một **inverted index** cho phép tra cứu trực tiếp đến địa chỉ của từng hash thay vì quét tuần tự qua hàng triệu bài hát — đây là lý do Shazam trả kết quả gần như tức thì.

**Điểm chính:**
- Shazam dùng FFT để chuyển đổi âm thanh thành spectrogram tần số, không dùng dạng sóng thô
- Chỉ giữ lại các đỉnh âm lượng nổi bật — bỏ hầu hết dữ liệu để tăng khả năng chống nhiễu
- Các cặp đỉnh tạo ra hash duy nhất đủ đặc trưng để phân biệt hàng triệu bài hát
- Inverted index cho phép tra cứu tức thì thay vì quét tuần tự
- Bí quyết thành công: "bỏ qua có chủ đích" — loại bỏ chi tiết dễ bị nhiễu, giữ lại mốc âm thanh quan trọng

## [Agents with Taste](https://emilkowal.ski/ui/agents-with-taste)

Emil Kowalski chia sẻ cách ông "truyền" gu thẩm mỹ thiết kế vào các AI agent bằng cách đóng gói các nguyên tắc thiết kế thành các file skill có cấu trúc. Thay vì kỳ vọng agent tự hiểu được cái đẹp, ông viết rõ ràng các quy tắc phản ánh triết lý thiết kế của mình để agent có thể tuân theo một cách nhất quán.

Lập luận cốt lõi: gu thẩm mỹ không phải ma thuật — mọi quyết định thiết kế đều có lý do hợp lý đằng sau. Khi bạn có thể giải thích *tại sao* một animation trông đẹp hơn, bạn có thể viết nó thành quy tắc. Ông xây dựng các file skill bao gồm hướng dẫn cụ thể về animation (ví dụ: "bắt đầu từ `scale(0.95)`, không phải `scale(0)`"), typography, easing và thời lượng chuyển động. Các agent được trang bị skill này tạo ra kết quả thiết kế tốt hơn đáng kể so với khi chỉ nhận hướng dẫn mơ hồ. Nguyên tắc mở rộng: skill càng được đóng gói kỹ càng, đòn bẩy từ agent càng lớn.

**Điểm chính:**
- Gu thẩm mỹ có thể truyền đạt được khi được diễn đạt thành các nguyên tắc rõ ràng
- Tạo file skill chứa quy tắc thiết kế cụ thể thay vì hướng dẫn mơ hồ cho agent
- Áp dụng được cho animation, typography, màu sắc, bố cục — mọi khía cạnh thiết kế
- Agent với skill thiết kế tốt tạo ra kết quả vượt trội so với agent không có hướng dẫn
- Đóng gói triết lý thiết kế vào skill giúp nhân rộng chất lượng mà không cần giám sát liên tục

## [Floating Point from Scratch: Hard Mode](https://essenceia.github.io/projects/floating_dragon/)

Julia Desmazes ghi lại hành trình triển khai dấu phẩy động (floating-point) trên phần cứng từ đầu — một thử thách mà bà đã thất bại và "sợ" trong nửa thập kỷ trước khi quyết tâm chinh phục lại. Bài viết dài 9.355 chữ là một tài liệu kỹ thuật cực kỳ chi tiết về chuẩn IEEE 754-2019.

Thay vì cài đặt float32 thông thường, tác giả chọn **bfloat16** (1 bit dấu, 8 bit số mũ, 7 bit phần định trị) vì mantissa nhỏ giúp giảm chi phí phần cứng cho phép nhân, được ngành công nghiệp sử dụng rộng rãi, và chưa có đặc tả cố định — tạo không gian để tối ưu tùy ý. Kiến trúc bộ cộng sử dụng **dual-path adder**: đường "close path" xử lý hiệu số mũ nhỏ hơn 2, đường "far path" xử lý các trường hợp còn lại. Để kiểm thử, tác giả chạy toàn bộ 2^32 tổ hợp đầu vào bằng Verilator kết hợp thư viện bfloat16_t của C++23 làm mô hình tham chiếu.

Kết quả ấn tượng: bộ cộng được tapeout trên tiến trình IHP 130nm đạt 100 MHz với diện tích 126.685 µm²; bộ nhân "vô dụng vì quá nhanh" ở lần tapeout thứ hai đạt tới **454 MHz** nhờ pipeline Booth radix-4 tùy chỉnh.

**Điểm chính:**
- Triển khai bfloat16 trên phần cứng thực từ đầu, dựa trên đặc tả IEEE 754-2019
- Kiến trúc dual-path adder tách biệt hai trường hợp cộng/trừ để tối ưu hiệu năng
- Kiểm thử toàn diện với 2^32 tổ hợp đầu vào — không bỏ sót trường hợp nào
- Bộ nhân pipeline đạt 454 MHz trên tiến trình 130nm — minh chứng cho sức mạnh của thiết kế tùy chỉnh
- Bài học: để công cụ tổng hợp (Yosys) tự tối ưu đôi khi tốt hơn thiết kế thủ công

## [The Peril of Laziness Lost](https://bcantrill.dtrace.org/2026/04/12/the-peril-of-laziness-lost/)

Bryan Cantrill lập luận rằng LLM đang xóa bỏ một đức tính quan trọng nhất của lập trình viên giỏi: **sự lười biếng**. Không phải lười theo nghĩa tiêu cực, mà là sự lười biếng theo định nghĩa của Larry Wall — động lực thúc đẩy ta tạo ra các abstraction mạnh mẽ để giảm công việc lặp lại về sau. Đây là dạng lười biếng đòi hỏi tư duy sâu và nỗ lực thực sự.

Vấn đề cốt lõi: giới hạn thời gian và năng lực nhận thức của con người vốn là một *bộ lọc tự nhiên* buộc các kỹ sư phải đơn giản hóa hệ thống, tạo ra abstraction rõ ràng và loại bỏ sự phức tạp không cần thiết. LLM phá vỡ bộ lọc này — chúng cho phép tạo ra lượng mã nguồn khổng lồ mà không có áp lực phải đơn giản hóa. Tác giả dẫn chứng tuyên bố của Garry Tan về việc viết 37.000 dòng code mỗi ngày, so với toàn bộ DTrace chỉ khoảng 60.000 dòng — một hệ thống đã thay đổi ngành công nghiệp. Phân tích một trang web đơn giản cho thấy nó chứa test harness thừa, template Hello World, trình soạn thảo văn bản không được phép và tám phiên bản logo khác nhau.

Kết luận: LLM nên là công cụ hỗ trợ phán đoán kỹ thuật của con người, không thay thế nó. Khi được triển khai đúng, chúng xử lý các tác vụ tẻ nhạt không cần tư duy, trong khi con người vẫn chịu trách nhiệm về tính thanh lịch kiến trúc.

**Điểm chính:**
- "Lười biếng" theo nghĩa tốt là đức tính cốt lõi của kỹ sư giỏi — tạo abstraction để giảm công việc tương lai
- LLM xóa bỏ giới hạn nhận thức vốn là bộ lọc tự nhiên buộc ta đơn giản hóa hệ thống
- Khi không có áp lực đơn giản hóa, mã nguồn phình to mà không tăng giá trị thực
- 37.000 dòng/ngày nghe hay, nhưng 60.000 dòng DTrace đã thay đổi ngành công nghiệp
- LLM hiệu quả nhất khi xử lý phần tẻ nhạt, không phải khi thay thế tư duy kiến trúc

## [Cleaning Up Merged Git Branches: A One-Liner from the CIA's Leaked Dev Docs](https://spencer.wtf/2026/02/20/cleaning-up-merged-git-branches-a-one-liner-from-the-cias-leaked-dev-docs.html)

Bài viết giới thiệu một lệnh git một dòng được tìm thấy trong tài liệu nội bộ của CIA (bộ Vault7 bị WikiLeaks công bố năm 2017), giúp dọn dẹp các nhánh đã được merge nhưng vẫn còn tồn tại ở local.

Vấn đề quen thuộc: sau khi làm việc lâu dài, repository local tích lũy hàng chục nhánh cũ không còn cần thiết. Lệnh giải quyết gọn:

```bash
git branch --merged origin/main | grep -vE "^\s*(\*|main|develop)" | xargs -n 1 git branch -d
```

Cách hoạt động: `git branch --merged origin/main` liệt kê tất cả nhánh đã được merge vào `main`; `grep -vE` lọc bỏ nhánh hiện tại, `main` và `develop`; `xargs` xóa từng nhánh còn lại bằng flag `-d` — an toàn vì `-d` (chữ thường) từ chối xóa nhánh chưa được merge. Tác giả khuyên nên tạo shell alias để dùng thường xuyên, đặc biệt sau mỗi lần triển khai.

**Điểm chính:**
- Một lệnh dọn sạch toàn bộ nhánh đã merge, tiết kiệm vài phút mỗi tuần
- Flag `-d` (chữ thường) đảm bảo an toàn — không xóa nhánh chưa được merge
- Nên tạo shell alias để chạy định kỳ sau mỗi lần triển khai
- Lệnh gốc dùng `master`, phiên bản cập nhật dùng `origin/main` cho dự án hiện đại
- Nguồn gốc thú vị: lệnh này xuất hiện trong tài liệu kỹ thuật nội bộ của CIA

## [Agent Harness Engineering](https://addyosmani.com/blog/agent-harness-engineering/)

Addy Osmani đề xuất một cách nhìn mới về coding agent: mô hình AI chỉ là một nửa — nửa còn lại là **harness** (khung vận hành) bao quanh nó. Luận điểm trung tâm: "Một mô hình tạm được với harness tốt sẽ thắng mô hình tốt với harness tệ." Harness bao gồm system prompt, file cấu hình (`AGENTS.md`, skill files), công cụ tích hợp, sandbox thực thi, hook vòng đời, hệ thống quan sát và quản lý subagent.

Hai nguyên tắc nổi bật nhất: **"Skill Issue" Reframe** — khi agent mắc lỗi, đừng đổ lỗi cho mô hình, hãy coi đó là vấn đề cấu hình và thêm ràng buộc, cập nhật hướng dẫn hoặc tạo hook ngăn chặn tái diễn. **Ratchet Principle** — mỗi dòng trong `AGENTS.md` phải truy ngược được về một sự cố thực tế đã xảy ra, không phải suy đoán. Tác giả cũng khuyên giữ file hướng dẫn ngắn gọn: HumanLayer duy trì `AGENTS.md` dưới 60 dòng — như danh sách kiểm tra của phi công, không phải cẩm nang phong cách. Quan trọng là tách biệt "nói" với agent khỏi "thực thi" bằng hook, và dùng agent riêng biệt cho việc lập kế hoạch và thực thi.

**Điểm chính:**
- Harness quan trọng ngang mô hình — cấu hình tốt bù đắp được hạn chế của mô hình
- Lỗi của agent là vấn đề cấu hình, không phải giới hạn mô hình — hãy thêm ràng buộc
- Mỗi quy tắc trong `AGENTS.md` phải xuất phát từ sự cố thực tế, không phải phòng ngừa suy đoán
- Giữ file hướng dẫn dưới 60 dòng — như checklist phi công, không phải tài liệu toàn diện
- Tách agent lập kế hoạch khỏi agent thực thi để tránh tự đánh giá thiên lệch

---

*Bài viết đã được review và cập nhật bởi Claude Code với Opus 4.7 (1M context).*
