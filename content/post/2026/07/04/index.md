---
title: "Newsletter #116"
date: 2026-07-04
tags: ["AI-Assisted", "Newsletter", "AI Engineering", "DevOps", "Performance", "Go", "Security"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #116.*

## [8 myths on software engineering and AI](https://newsletter.getdx.com/p/8-myths-on-software-engineering-and)

Brian Houck tóm tắt một bài nghiên cứu về tám hiểu lầm phổ biến quanh GenAI trong kỹ thuật phần mềm. Điểm xuyên suốt là tác động của AI không chỉ phụ thuộc vào khả năng sinh mã, mà phụ thuộc mạnh vào hệ thống công việc xung quanh lập trình viên: thiết kế, rà soát mã, phối hợp, độ tin cậy của công cụ, chỉ số đo lường và cách tổ chức triển khai. Nếu lập trình viên chỉ dành một phần nhỏ thời gian để viết mã, thì việc tối ưu riêng bước sinh mã dễ chuyển nút thắt sang rà soát mã, chất lượng hoặc phối hợp.

Bài viết cũng cảnh báo cách đo sai. Lines of code, kể cả dòng do AI sinh ra, dễ khuyến khích số lượng thay vì giá trị thật. PR throughput tốt hơn nhưng vẫn cần đặt trong một bộ chỉ số cân bằng. Nghiên cứu về công cụ AI hiện cho kết quả rất khác nhau: có nhiệm vụ tăng tốc rõ, có nhiệm vụ trung tính, thậm chí có nghiên cứu cho thấy lập trình viên kinh nghiệm làm chậm hơn khi dùng AI trong mã nguồn thật. Vì vậy việc áp dụng AI nên được xem là bài toán hệ thống: xây niềm tin, guardrail, hỗ trợ tổ chức và chỉ số phù hợp, thay vì chỉ mua giấy phép công cụ rồi kỳ vọng năng suất tự tăng.

**Điểm chính:**
- Lập trình viên không dành phần lớn ngày làm việc để gõ mã, nên công cụ sinh mã bằng AI chỉ là một đòn bẩy trong hệ thống lớn hơn.
- Lines of code là chỉ số kém cho năng suất; nó có thể làm tăng gánh nặng rà soát mã và chất lượng.
- Hiệu quả của AI thay đổi theo nhiệm vụ, kinh nghiệm, ngữ cảnh mã nguồn và cả cách đặt prompt.
- Tổ chức muốn có ROI thật cần xử lý niềm tin, workflow, rà soát mã, guardrail và cách đo tác động ở cấp hệ thống.

## [You Don't Love systemd Timers Enough](https://blog.tjll.net/you-dont-love-systemd-timers-enough/)

Tác giả lập luận rằng nhiều tác vụ vẫn được gọi chung là "cron job", nhưng trong năm 2026 không nhất thiết nên dùng `cron` thật cho mọi lịch chạy định kỳ. systemd timer tách phần lịch chạy khỏi phần thực thi bằng cặp `.timer` và `.service`, nhờ đó dễ quan sát, dễ bật cùng lúc khởi động, có log trong journal và tránh nhiều vấn đề quen thuộc của `cron` như `$PATH` mơ hồ, stdout/stderr biến mất, lịch khó đọc hoặc lịch sử chạy khó truy vấn. Bài viết cũng nhắc chi tiết quan trọng: `ExecStart=` không chạy như shell command mặc định, nên cần viết unit file rõ ràng thay vì giả định giống script shell.

Phần hữu ích nhất nằm ở các tính năng vượt qua cron truyền thống. `systemd-analyze calendar` giúp kiểm tra và giải thích biểu thức thời gian trước khi dùng. Ngoài lịch theo đồng hồ bằng `OnCalendar=`, timer còn hỗ trợ lịch tương đối như `OnBootSec=` và `OnUnitActiveSec=`, phù hợp với việc chạy sau khi máy khởi động hoặc sau lần chạy trước. Các tùy chọn như `WakeSystem=`, `Persistent=`, `RandomizedDelaySec=`, `FixedRandomDelay=` và `RandomizedOffsetSec=` giúp xử lý máy ngủ, lần chạy bị bỏ lỡ và thundering herd tốt hơn. Nói ngắn gọn, systemd timer không chỉ là cron viết kiểu mới; nó là primitive vận hành có nhiều ngữ nghĩa hơn.

**Điểm chính:**
- systemd timer ghép lịch chạy với service unit, giúp tách rõ "khi nào chạy" và "chạy cái gì".
- Journal, `systemctl status` và `systemctl list-timers` làm lịch sử chạy và lần chạy kế tiếp dễ quan sát hơn `cron`.
- `OnBootSec=` và `OnUnitActiveSec=` biểu diễn lịch tương đối, thường khớp ý định vận hành hơn lịch theo phút/giờ cố định.
- `Persistent=` và các tùy chọn random delay giúp tránh bỏ lỡ tác vụ sau downtime và giảm tải đồng loạt trên nhiều máy.

## [Life is too short for a slow terminal](https://mijndertstuij.nl/posts/life-is-too-short-for-a-slow-terminal/)

Mijndert Stuij viết về việc giữ terminal thật nhanh vì đây là công cụ được dùng gần như cả ngày. Shell của tác giả khởi động khoảng 30ms, không nhờ một dự án tối ưu lớn mà nhờ thói quen giữ cấu hình tối giản: không dùng framework như oh-my-zsh, không dùng plugin manager ở lúc khởi động, chỉ source trực tiếp vài plugin thật sự cần. Với zsh, tác giả xem `compinit` là một điểm nóng phổ biến và dùng cache `.zcompdump` để chỉ chạy kiểm tra đầy đủ khoảng một lần mỗi ngày, còn các lần mở shell khác dùng đường nhanh hơn.

Bài viết cũng nhấn mạnh lazy-loading cho những công cụ đắt như `nvm` hoặc completion của `kubectl`: đừng chạy `eval "$(tool init zsh)"` trong `.zshrc` nếu chỉ thỉnh thoảng mới dùng công cụ đó. Prompt cũng cần tránh làm việc đồng bộ, đặc biệt là `git status` trong repository lớn; prompt bất đồng bộ như `pure` giúp hiển thị trước rồi bổ sung trạng thái Git sau. Cuối cùng, tác giả khuyên đo thay vì đoán: dùng `time zsh -i -c exit`, `hyperfine`, `zprof`, hoặc trace startup để tìm dòng chậm nhất rồi sửa từng điểm một.

**Điểm chính:**
- Terminal chậm tạo chi phí nhỏ nhưng lặp lại hàng trăm lần mỗi ngày, nên độ trễ thấp đáng được tối ưu.
- Bỏ framework và plugin manager khỏi startup path thường là thắng lợi lớn nhất nếu bạn chỉ dùng một phần nhỏ tính năng.
- Cache `compinit` và lazy-load công cụ nặng giúp shell mở nhanh mà vẫn giữ tiện ích khi cần.
- Hãy đo startup time, prompt lag và input latency bằng công cụ cụ thể trước khi tối ưu cấu hình.

## [OpenCodeReview](https://github.com/alibaba/open-code-review)

OpenCodeReview là công cụ CLI mã nguồn mở của Alibaba cho rà soát mã bằng AI. Dự án xuất phát từ trợ lý review nội bộ đã được dùng ở quy mô lớn, sau đó được mở cho cộng đồng. Thay vì chỉ gửi một đoạn diff cho mô hình rồi nhận nhận xét chung chung, công cụ đọc Git diff, gom các file liên quan, cho agent truy cập ngữ cảnh cần thiết trong codebase và tạo comment có vị trí theo từng dòng. Ngoài review theo diff, lệnh `ocr scan` còn có thể rà soát toàn bộ file hoặc thư mục khi cần audit codebase chưa quen.

Điểm thiết kế đáng chú ý là kiến trúc lai giữa logic xác định và agent. Những phần cần độ chính xác cao như chọn file, lọc thay đổi, gom nhóm file, match rule và định vị comment được xử lý bằng pipeline kỹ thuật có ràng buộc rõ. Agent tập trung vào phần cần suy luận động: đọc ngữ cảnh, gọi công cụ, áp dụng prompt và rule chuyên biệt cho review. Alibaba cũng công bố benchmark từ nhiều pull request thật, cho thấy công cụ ưu tiên precision và chi phí token thấp hơn so với agent tổng quát, nhưng chấp nhận recall thấp hơn để giảm nhiễu.

**Điểm chính:**
- OpenCodeReview là CLI review mã bằng AI, hỗ trợ model endpoint tương thích OpenAI và Anthropic.
- Kiến trúc lai giúp pipeline giữ các ràng buộc cứng, còn agent xử lý phần cần hiểu ngữ cảnh.
- Công cụ có rule fine-tuned cho lỗi như NPE, thread-safety, XSS và SQL injection.
- Trade-off chính là ưu tiên ít false alarm và tiết kiệm token hơn, thay vì cố bắt mọi vấn đề như agent tổng quát.

## [Golang code review notes II](https://www.elttam.com/blog/golang-code-review-notes-ii)

Zoltan Madarassy và Alex Brown tiếp tục loạt ghi chú rà soát mã Go từ góc nhìn bảo mật. Luận điểm chính là công cụ tự động và AI đã bắt được nhiều lỗi hiển nhiên hơn, nhưng phần nguy hiểm còn lại nằm ở những góc cạnh ngôn ngữ và thư viện chuẩn mà người rà soát phải chủ động biết để tìm. Bài viết điểm qua vài cải thiện tích cực như `os.Root` giúp chặn lỗi đi xuyên thư mục tốt hơn, hay các thay đổi quanh `math/rand` và `crypto/rand` làm giảm khả năng dùng nhầm nguồn ngẫu nhiên yếu trong luồng sinh khóa.

Phần trọng tâm là các bẫy mới hoặc vẫn dễ bị bỏ sót: tràn số âm thầm khi ép độ dài sang kiểu hẹp hơn, `httputil.ReverseProxy.Director` có thể bị ảnh hưởng bởi hop-by-hop header và nên chuyển sang `Rewrite`, sao chép nhầm con trỏ `net/url` dẫn tới biến đổi trạng thái dùng chung và điều kiện tranh chấp, byte null qua biên CGO/C library có thể tạo lỗi vượt kiểm tra xác thực, `encoding/json` có thể bỏ qua custom marshaller nếu method set dùng pointer receiver nhưng struct lại được encode theo value, và JSON API vẫn có thể dính CSRF nếu không kiểm tra `Content-Type`, cookie `SameSite` và nguồn request. Tác giả cũng phát hành thêm Semgrep rule để bắt một số mẫu rủi ro này.

**Điểm chính:**
- Rà soát bảo mật Go không thể chỉ dựa vào công cụ; cần biết các cạnh sắc của thư viện chuẩn và runtime.
- Tràn số nguyên, biến đổi `url.URL` dùng chung, byte null qua CGO và pointer receiver trong JSON đều có thể tạo lỗi rất khó thấy.
- Với reverse proxy, `Rewrite` an toàn hơn `Director` vì chạy sau bước loại bỏ hop-by-hop header.
- JSON API không tự miễn nhiễm CSRF; vẫn cần kiểm tra origin, `Content-Type`, cookie và hành vi parser.

## [Thoughts on starting new projects with LLM agents](https://eli.thegreenplace.net/2026/thoughts-on-starting-new-projects-with-llm-agents/)

Eli Bendersky chia sẻ kinh nghiệm dùng agent để xây một dự án mới từ đầu, khác với trường hợp trước đó là dùng agent để tái cấu trúc dự án Python có sẵn. Với dự án `watgo`, tác giả bắt đầu bằng cách cùng agent lặp lại thiết kế và API, rồi lưu lại trong một file Markdown được commit vào kho mã. Sau đó ông yêu cầu agent tạo các changelist nhỏ theo thứ tự hợp lý, tự rà soát bằng diff view trong VSCode, chỉnh tay khi cần, rồi mới commit. Khi agent tạo một thay đổi quá lớn, cách thực tế là commit ở điểm có thể chấp nhận, sau đó tiếp tục yêu cầu tái cấu trúc bằng các thay đổi riêng.

Thông điệp chính là phải giữ con người trong vòng kiểm soát nếu dự án cần bảo trì lâu dài. Vibe coding có thể hợp với nguyên mẫu hoặc mã dùng một lần, nhưng với dự án quan trọng, người viết vẫn phải hiểu, rà soát và dẫn hướng mọi quyết định thiết kế. Tác giả nhấn mạnh CL nhỏ, chiến lược kiểm thử vững, tránh để agent tự sinh cả kiểm thử lẫn phần triển khai rồi tự củng cố lỗi sai. Go cũng được xem là ngôn ngữ rất hợp cho agent vì dễ đọc, ít cách làm trùng lặp, thư viện chuẩn mạnh, format thống nhất và lỗi được xử lý rõ ràng. Khi phần lớn thời gian của con người chuyển từ viết sang đọc mã, khả năng đọc hiểu trở thành lợi thế rất lớn.

**Điểm chính:**
- Với dự án mới, nên bắt đầu bằng thiết kế viết rõ và lưu trong kho mã để cả người và agent cùng bám theo.
- Agent có thể tạo nhiều mã rất nhanh, nhưng thay đổi vẫn phải nhỏ, rà soát được và có thể revert.
- Bộ kiểm thử là điều kiện quan trọng; không nên mù quáng tin agent khi nó viết cả kiểm thử lẫn mã được kiểm thử.
- Go hợp với agent-assisted development vì tối ưu cho tính dễ đọc, giúp con người rà soát mã sinh ra dễ hơn.

## [The History of Pets vs Cattle and How to Use the Analogy Properly](https://cloudscaling.com/blog/cloud-computing/the-history-of-pets-vs-cattle/)

Randy Bias kể lại nguồn gốc và ý nghĩa đúng của ẩn dụ "pets vs cattle" trong hạ tầng đám mây. Điểm cốt lõi không chỉ là scale-up so với scale-out, mà là cách ta nhìn một máy chủ: nếu nó là hệ thống độc nhất, không thể mất, thường được dựng tay và cần chăm sóc đặc biệt thì đó là "pet"; nếu nó là một phần của đàn, có thể hỏng, bị thay thế tự động và hệ thống vẫn tiếp tục chạy thì đó là "cattle". Ẩn dụ này thành công vì giúp giải thích nhanh sự chuyển dịch từ hạ tầng truyền thống sang kiến trúc cloud-native.

Bài viết cũng cảnh báo việc dùng sai ẩn dụ làm mất giá trị ban đầu. Ví dụ, nếu gọi mọi hệ thống có trạng thái là "pet" thì dễ nhầm lẫn, vì nhiều datastore như Cassandra, Kafka hay MongoDB được thiết kế để chịu lỗi theo kiểu scale-out và có nhiều đặc tính "cattle". Điều quan trọng là khả năng thay thế, tự phục hồi và chịu lỗi ở cấp hệ thống, không phải chỉ việc workload có trạng thái hay không. Với hạ tầng hiện đại, thông điệp thực dụng là thiết kế sao cho từng node có thể chết mà không kéo cả hệ thống xuống.

**Điểm chính:**
- "Pets" là hệ thống độc nhất, khó thay thế, thường cần can thiệp thủ công khi lỗi.
- "Cattle" là nhóm node được dựng bằng tự động hóa, có thể mất từng node mà hệ thống vẫn hoạt động.
- Trọng tâm của ẩn dụ là tính thay thế và thiết kế chịu lỗi, không phải chỉ scale-out hay có trạng thái/không trạng thái.
- Dùng sai ẩn dụ có thể làm mờ khác biệt giữa hạ tầng truyền thống và kiến trúc cloud-native.

## [Every byte matters](https://fzakaria.com/2026/06/01/every-byte-matters)

Farid Zakaria nhắc rằng hiệu năng không chỉ nằm ở độ phức tạp Big-O. Ngay cả trong một vòng lặp tuyến tính, kích thước dữ liệu và cách bố trí bộ nhớ có thể tạo khác biệt rất lớn vì CPU đọc dữ liệu theo cache line, thường là 64 byte. Nếu một struct lớn nhưng ta chỉ cần một trường nhỏ như `is_alive`, mô hình array of structs sẽ kéo theo nhiều byte không dùng tới vào cache. Ngược lại, struct of arrays gom cùng một trường vào vùng nhớ liên tục, giúp một lần nạp cache phục vụ được nhiều phần tử hơn.

Bài viết cũng giải thích vì sao kích thước working set quan trọng với truy cập ngẫu nhiên. Với truy cập tuần tự, CPU prefetcher thường đoán được bước kế tiếp và che bớt độ trễ. Nhưng với hash map, cây, đồ thị hoặc cấu trúc nhiều con trỏ, địa chỉ kế tiếp khó đoán, nên dữ liệu phải vừa trong cache nếu muốn tránh chờ bộ nhớ. Chỉ cần tăng kích thước struct từ 64B lên 128B cũng có thể đẩy cùng số lượng phần tử sang tầng cache chậm hơn, làm độ trễ tăng rõ. Bài học thực dụng: biết kích thước struct, cache line và working set giúp tối ưu những đường nóng tốt hơn nhiều so với chỉ nhìn Big-O.

**Điểm chính:**
- Mỗi byte trong struct đều có chi phí khi dữ liệu nằm trên đường nóng.
- Array of structs dễ lãng phí cache nếu chỉ đọc một vài trường; struct of arrays có thể cải thiện locality.
- Truy cập ngẫu nhiên làm CPU prefetcher kém hiệu quả, nên kích thước working set quyết định tầng cache và độ trễ.
- Tối ưu hiệu năng cần đo cách bố trí dữ liệu, cache line và kích thước working set, không chỉ phân tích thuật toán.
