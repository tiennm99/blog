---
title: "Newsletter #68"
date: 2025-12-11
tags: ["AI-Assisted", "debugging", "open-source", "programming-languages", "system-performance", "networking", "javascript", "protocols", "algorithms", "system-design"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #68. Bài viết này được thực hiện bởi [Claude Code](https://github.com/anthropics/claude-code), [Claude Code Router](https://github.com/musistudio/claude-code-router), [iFlow Open Platform](https://platform.iflow.cn) & GLM-4.6 (Bài này mình config CCR dùng nhiều models trên iFlow Platform)*

## [Conscious Debugging: 10 Chiến lược Hiệu quả Thực sự Hoạt động 🐛](https://thetshaped.dev/p/conscious-debugging-10-effective-debugging-strategies-debug-like-pro)

Bài viết cung cấp cho developer mới vào nghề một bộ công cụ có hệ thống để tiếp cận việc gỡ lỗi (debugging) một cách hiệu quả và bớt căng thẳng. Tác giả nhấn mạnh rằng debugging là kỹ năng có thể rèn luyện, không chỉ dựa vào may mắn hay kinh nghiệm thuần túy. Quá trình này bắt đầu từ việc tái tạo lỗi một cách nhất quán và nhanh chóng, sau đó thu thập đầy đủ ngữ cảnh (context) liên quan đến sự cố. Khi đã có nền tảng, developer nên chủ động thu hẹp phạm vi vấn đề bằng các kỹ thuật như chia đôi (binary search) hoặc sử dụng debugger tích hợp sẵn trong IDE. Bài viết cũng khuyến khích tư duy khoa học khi đưa ra và kiểm chứng giả thuyết, đồng thời không xem nhẹ vai trò của việc nghỉ ngơi hợp lý hay giải thích vấn đề cho người khác (rubber duck debugging).

> "Mastering debugging can save you time, energy, frustrations, and money"

**Điểm chính:**
- **Tái tạo lỗi một cách nhất quán và nhanh chóng** để làm nền tảng cho mọi thao tác tiếp theo.
- **Thu thập đầy đủ context** từ logs, session recordings, hoặc phản hồi người dùng trước khi đi sâu vào code.
- **Cô lập vấn đề** bằng cách áp dụng phương pháp chia đôi để nhanh chóng khoanh vùng nguyên nhân.
- **Sử dụng debugger và rubber duck debugging** như những công cụ hỗ trợ tư duy chủ động.
- **Nghỉ giải lao chiến lược** và **tận dụng AI một cách thông minh**, cung cấp đủ thông tin để nhận được hỗ trợ hiệu quả.

## [The fate of "small" open source](https://nolanlawson.com/2025/11/16/the-fate-of-small-open-source/)

Bài viết của Nolan Lawson bàn về tương lai mờ nhạt của các thư viện open source nhỏ (như `blob-util`) trong kỷ nguyên LLM. Trước đây, những gói này không chỉ giải quyết vấn đề kỹ thuật mà còn mang tính giáo dục—giúp developer hiểu sâu cách hoạt động của nền tảng. Tuy nhiên, khi LLM có thể sinh code theo yêu cầu ngay lập tức, nhiều người chọn tự tạo hàm thay vì dùng dependency, dẫn đến nguy cơ mai một các dự án nhỏ dù chúng đã được kiểm chứng qua thời gian. Tác giả lo ngại xu hướng này làm giảm cơ hội học hỏi và chia sẻ kiến thức trong cộng đồng.

Dù vậy, Lawson vẫn lạc quan rằng open source vẫn còn đất sống ở những lĩnh vực LLM chưa chạm tới: dự án lớn, sáng tạo, hoặc chuyên sâu như phát hiện memory leak (`fuite`). Giá trị mới nằm ở sự đổi mới và nghiên cứu—điều mà AI hiện tại khó thay thế.

**Điểm chính:**
- Các utility library nhỏ (vd: `blob-util`) đang dần bị thay thế bởi code do LLM sinh ra.
- Thư viện open source truyền thống thường đi kèm tư duy "dạy học", điều mà LLM thiếu.
- Dùng LLM để sinh code có thể làm tăng technical debt và giảm khả năng maintain.
- Cơ hội open source hiện nay nằm ở các dự án đòi hỏi research, creativity hoặc niche knowledge.
- "Era of small, low-value libraries... is over"—LLMs là "the final nail in the coffin."

## [Ngôn ngữ lập trình trong kỷ nguyên AI Agent](https://alexn.org/blog/2025/11/16/programming-languages-in-the-age-of-ai-agents/)

Trong bối cảnh AI Agent ngày càng phổ biến trong viết mã, nhiều người lo ngại rằng sự đa dạng ngôn ngữ lập trình sẽ thu hẹp lại chỉ còn top 5 ngôn ngữ được huấn luyện nhiều nhất. Tuy nhiên, bài viết lập luận rằng lựa chọn ngôn ngữ vẫn quan trọng—đặc biệt với các developer trẻ. Một hệ thống type tĩnh mạnh mẽ (như trong Scala, Rust hay Haskell) giúp AI nhanh chóng sửa lỗi nhờ phản hồi từ compiler, giảm "hallucination" và tăng độ tin cậy. Ngoài ra, khả năng **review và hiểu code do AI sinh ra** là thiết yếu để tránh "comprehension debt"—tình trạng mất tri thức khi không ai còn hiểu sâu về hệ thống.

Dù AI có thể tạo ra code chạy được, nguồn gốc sự thật vẫn là **source code**, và việc duy trì kiến trúc rõ ràng, biểu đạt ý định thiết kế (intent) qua code chất lượng cao—đặc biệt theo phong cách functional programming—vẫn cực kỳ giá trị. Lập luận suy diễn (deductive reasoning) và equational reasoning giúp con người kiểm chứng logic mà AI không thể đảm bảo.

**Điểm chính:**
- Ngôn ngữ có **static type system mạnh** giúp AI hội tụ nhanh hơn và giảm lỗi.
- Luôn **review kỹ code do AI sinh ra**—đừng chỉ tin vào output.
- Tránh "**comprehension debt**": đảm bảo team hiểu sâu hệ thống, không lệ thuộc hoàn toàn vào AI.
- **Functional programming** và equational reasoning vẫn rất hữu ích để lý luận về code.
- Source code luôn là **source of truth**—viết code rõ ràng, biểu đạt design intent.

## ["Numbers Everyone Should Know" – Hiểu Biết Cốt Lõi Về Hiệu Năng Hệ Thống](https://brenocon.com/dean_perf.html)

Bài thuyết trình nổi tiếng của Jeff Dean cung cấp các mốc thời gian tham chiếu thiết yếu giúp developer hiểu rõ độ trễ (latency) và hiệu suất trong hệ thống máy tính. Dành cho lập trình viên mới, những con số này là nền tảng để đưa ra quyết định tối ưu hóa hợp lý—ví dụ, truy cập bộ nhớ chính (main memory) chậm hơn hàng trăm lần so với cache mức L1. Việc nắm được thứ tự độ lớn (order of magnitude) giữa các thao tác như disk seek, network round-trip hay nén dữ liệu giúp tránh các "bẫy hiệu năng" phổ biến khi thiết kế ứng dụng phân tán hoặc xử lý dữ liệu lớn.

Dưới đây là một vài điểm then chốt từ tài liệu:

**Điểm chính:**
- Truy cập L1 cache chỉ mất ~0.5 ns, trong khi main memory reference mất ~100 ns
- Disk seek tốn ~10 ms—chậm hơn L2 cache (~7 ns) tới hàng triệu lần
- Gửi 1KB qua mạng 1 Gbps mất ~10,000 ns (0.01 ms), nhưng round-trip trong datacenter đã lên tới 0.5 ms
- Đọc tuần tự 1 MB từ SSD/disk mất ~30 ms, trong khi từ RAM chỉ mất ~0.25 ms
- Mutex lock/unlock có chi phí ~100 ns—tương đương truy cập bộ nhớ chính

Những con số này nhấn mạnh tầm quan trọng của việc tận dụng cache, giảm thiểu I/O không cần thiết và hiểu rõ đặc tính latency của hạ tầng—kiến thức nền không thể thiếu cho mọi kỹ sư phần mềm.

## [The Internet is Cool. Thank you, TCP](https://cefboud.com/posts/tcp-deep-dive-internals/)

Bài viết giải thích vai trò then chốt của TCP – giao thức vận chuyển đáng tin cậy làm nền tảng cho hầu hết ứng dụng mạng như HTTP, SMTP hay SSH. Dù mạng Internet vốn không ổn định (gói tin có thể bị mất, lỗi, trùng lặp hoặc đến sai thứ tự), TCP đảm bảo dữ liệu được truyền chính xác, đúng trình tự và không bị hư hỏng nhờ cơ chế kiểm soát lỗi và khôi phục ở hai đầu kết nối (end-to-end). Điều này giúp lập trình viên không phải tự xử lý các vấn đề phức tạp về độ tin cậy mạng.

TCP còn tích hợp **flow control** (qua trường Window) để tránh làm quá tải bộ đệm nhận, và **congestion control** để ngăn nghẽn mạng – bài học rút ra từ sự cố "congestion collapse" năm 1986 khi băng thông Internet giảm xuống chỉ còn 40 bps. Bài viết minh họa bằng mã C đơn giản tạo server TCP và HTTP "giả", đồng thời phân tích cấu trúc segment TCP, handshake 3 bước (SYN/SYN-ACK/ACK), và cách sequence/acknowledgment number duy trì tính toàn vẹn dữ liệu.

**Điểm chính:**
- TCP cung cấp truyền dữ liệu **đáng tin cậy, tuần tự và không trùng lặp** trên nền mạng IP vốn không đáng tin cậy.
- Sử dụng **flow control** (Window) và **congestion control** để điều tiết lưu lượng gửi và tránh nghẽn mạng.
- Thiết lập kết nối qua **3-way handshake** (SYN → SYN-ACK → ACK); đóng kết nối bằng FIN/RST flags.
- Mỗi kết nối TCP được xác định bởi **5-tuple**: (giao thức, IP nguồn, port nguồn, IP đích, port đích).
- Lập trình socket TCP (socket, bind, listen, accept, send, recv) cho phép xây dựng ứng dụng mạng dễ dàng.

## [Những hiểu lầm phổ biến của lập trình viên về CPU Caches](https://software.rajivprab.com/2018/04/29/myths-programmers-believe-about-cpu-caches/)

Bài viết vạch trần một số quan niệm sai lầm mà nhiều lập trình viên có về cách hoạt động của CPU cache, đặc biệt trong bối cảnh lập trình đa luồng. Một hiểu lầm phổ biến là cho rằng "các core khác nhau có thể lưu giá trị khác nhau trong cache riêng", dẫn đến suy nghĩ rằng từ khóa `volatile` (trong Java) buộc dữ liệu phải được đọc/ghi trực tiếp vào main memory. Thực tế, các CPU x86 hiện đại sử dụng giao thức như MESI để đảm bảo **cache coherency**—tức mọi cache luôn đồng bộ với nhau—nên không xảy ra tình trạng "dữ liệu lỗi thời" giữa các core. Việc dùng `volatile` chủ yếu liên quan đến việc ngăn compiler tối ưu hóa qua register và đảm bảo visibility qua hệ thống cache, chứ không phải truy cập main memory mỗi lần.

Hiểu đúng về cơ chế này giúp lập trình viên tránh thiết kế sai khi xử lý concurrency, ngay cả trên hệ thống đơn nhân. Hiệu năng của `volatile` cũng tốt hơn nhiều so với niềm tin phổ biến, vì thao tác vẫn diễn ra ở mức L1 cache—nhanh gấp ~200 lần so với truy cập RAM.

**Điểm chính:**
- CPU caches trên các core được giữ đồng bộ nhờ phần cứng (ví dụ: giao thức MESI).
- `Volatile` không bắt buộc truy cập main memory; nó đảm bảo visibility qua hệ thống cache.
- Lập trình concurrency vẫn cần `volatile`/atomics do compiler/CPU có thể reorder instructions hoặc dùng register.
- Hiểu biết về cache coherency giúp thiết kế hệ thống phân tán và database tốt hơn.
- Ngay cả hệ đơn nhân cũng có thể gặp race condition nếu không dùng đúng cơ chế đồng bộ.

## [Why NaN !== NaN in JavaScript (and the IEEE 754 story behind it)](https://pzarycki.com/en/posts/js-nan/)

Trong JavaScript, `NaN` (Not-a-Number) là một giá trị đặc biệt thuộc kiểu `"number"` theo chuẩn IEEE 754, được thiết kế để biểu diễn kết quả không hợp lệ của các phép toán số học như `0/0` hay `Math.sqrt(-1)`. Điều khiến nhiều lập trình viên mới bối rối là `NaN !== NaN` luôn trả về `true`. Đây không phải lỗi mà là hành vi có chủ đích: vì `NaN` đại diện cho "không phải giá trị", nên việc so sánh hai giá trị không xác định với nhau là vô nghĩa. Cách phát hiện `NaN` đáng tin cậy nhất là dùng `Number.isNaN()` hoặc kiểm tra `x !== x`.

Chuẩn IEEE 754 từ năm 1985 đã đưa `NaN` vào hệ thống số thực dấu phẩy động ở cấp phần cứng, giúp các phép tính tiếp tục chạy thay vì crash khi gặp lỗi—điều cực kỳ quan trọng trong hệ thống nhúng hay hàng không. Nhờ cơ chế "lan truyền" (`NaN` trong bất kỳ phép toán nào cũng cho ra `NaN`), lập trình viên có thể kiểm tra lỗi ở cuối chuỗi tính toán thay vì sau mỗi bước.

**Điểm chính:**
- `typeof NaN === "number"` vì `NaN` là một giá trị đặc biệt trong hệ thống số IEEE 754.
- `NaN !== NaN` là thiết kế có chủ đích để hỗ trợ phát hiện lỗi qua phép so sánh `x !== x`.
- `NaN` được xử lý ở cấp CPU (qua lệnh `ucomisd` trên x86), không phải do JavaScript tự định nghĩa.
- Mọi phép toán có `NaN` đều trả về `NaN`, giúp lỗi "lan truyền" đến điểm kiểm tra cuối cùng.
- Trước IEEE 754, các nền tảng xử lý lỗi số học khác nhau, gây mất ổn định và khả năng di chuyển mã.

## [Hướng tới lưu lượng QUIC liên hành tinh](https://ochagavia.nl/blog/towards-interplanetary-quic-traffic/)

Bài viết chia sẻ kinh nghiệm của tác giả khi tham gia một dự án nghiên cứu sử dụng giao thức **QUIC**—thường dùng cho kết nối internet đáng tin cậy trên Trái Đất—trong môi trường liên hành tinh. Thử thách chính là độ trễ cực lớn (3–23 phút một chiều đến Sao Hỏa) và tính gián đoạn kết nối do giới hạn đường truyền qua vệ tinh. Mặc định, QUIC không hoạt động được trong điều kiện này, nhưng nhờ khả năng cấu hình cao, nhóm đã điều chỉnh các tham số như thời gian timeout và cơ chế kiểm soát tắc nghẽn để phù hợp với không gian sâu.

Để tăng tốc thử nghiệm, họ xây dựng một môi trường mô phỏng trong cùng một tiến trình (in-process), kết hợp với đồng hồ ảo từ **Tokio runtime**, giúp "bỏ qua" thời gian chờ thực tế. Nhờ đó, các thử nghiệm diễn ra gần như tức thì, đồng thời đảm bảo tính **deterministic** và hỗ trợ gỡ lỗi qua file `.pcap` để phân tích bằng Wireshark.

**Điểm chính:**
- QUIC có thể được cấu hình để hoạt động trong mạng liên hành tinh, khác với TCP vốn không phù hợp.
- Độ trễ cao và kết nối gián đoạn đòi hỏi điều chỉnh sâu các tham số giao thức.
- Môi trường mô phỏng in-process giúp thử nghiệm nhanh, lặp lại được và dễ debug.
- Dự án sử dụng thư viện **Quinn** (Rust) nhờ thiết kế modular và hỗ trợ tùy biến cao.
- Mục tiêu dài hạn: thay thế giao thức CFDP hiện tại bằng QUIC/IP trong truyền dữ liệu không gian.

## [Bloom filters: the niche trick behind a 16× faster API](https://incident.io/blog/bloom-filters)

Bài viết chia sẻ cách đội ngũ incident.io cải thiện độ trễ P95 của một endpoint từ 5 giây xuống còn 0.3 giây bằng cách áp dụng **Bloom filter**—một cấu trúc dữ liệu xác suất cho phép kiểm tra nhanh xem một phần tử có *có thể* thuộc tập hợp hay không. Vấn đề ban đầu xuất phát từ việc lọc hàng triệu alert trong cơ sở dữ liệu, khi nhiều điều kiện (như "team" hay "feature") được lưu dưới dạng JSONB và phải xử lý trong bộ nhớ sau khi truy vấn. Giải pháp Bloom filter giúp đẩy phần lớn logic lọc vào PostgreSQL thông qua phép toán bitwise trên cột `bit(512)`, giảm đáng kể lượng dữ liệu cần deserialize.

Kết hợp với giới hạn thời gian bắt buộc (mặc định 30 ngày), hiệu năng được cải thiện ổn định ngay cả với tổ chức lớn. Dù GIN index cũng là lựa chọn khả thi, nhóm đã chọn Bloom filter vì lo ngại về kích thước và chi phí ghi của GIN trong dài hạn.

**Điểm chính:**
- Bloom filter cho phép **loại bỏ nhanh** các bản ghi không khớp, dù có tỷ lệ false positive (~1%).
- Mỗi alert được mã hóa thành một **bitmap 512-bit** dựa trên giá trị thuộc tính.
- Truy vấn sử dụng phép **bitwise AND**: `bitmap & bitmask == bitmask`.
- Kết hợp với **phân vùng theo thời gian** (dựa trên ULID) để giới hạn phạm vi quét dữ liệu.
- Hiệu quả rõ rệt với **workload đọc nhiều**, đặc biệt khi kết quả lọc chiếm tỷ lệ lớn.

## [Thiết Kế Là Làm Rõ Bản Chất: Tư Duy Hệ Thống Cho Lập Trình Viên](https://threadreaderapp.com/thread/1990057444253241545.html)

Bài viết nhấn mạnh rằng thiết kế (design) không chỉ là thẩm mỹ mà là quá trình tháo gỡ cấu trúc nền tảng của một hệ thống, hiểu rõ các thành phần cơ bản và tái tổ hợp chúng để tạo ra giải pháp mới. Tác giả lấy ví dụ từ Notion—thay vì xây dựng sản phẩm đơn năng như Asana hay Evernote, Notion cung cấp các "nguyên tử" như blocks, databases và relations để người dùng tự do sáng tạo. Tương tự, công cụ AI như Cursor đang biến ý định con người thành code bằng cách hiểu cấu trúc logic đằng sau yêu cầu, giảm rào cản giữa ý tưởng và hiện thực hóa phần mềm.

Triết lý này phản ánh nguyên tắc phổ quát: thế giới vận hành dựa trên các mô-đun đơn giản có thể kết hợp vô hạn—từ DNA đến ngôn ngữ. Với lập trình viên trẻ, điều cốt lõi là học cách nhận diện "primitives" (nguyên tố cơ bản) trong hệ thống, từ đó xây dựng tư duy phân rã (decomposition) và tái cấu trúc (recomposition). AI không chỉ là tính năng mà là một primitive mới, mở ra cách làm việc trực tiếp với khái niệm thay vì cú pháp.

**Điểm chính:**
- Thiết kế thật sự là tháo gỡ và tái tổ hợp cấu trúc nền tảng, không chỉ làm đẹp giao diện.
- Tập trung vào **systems**, không chỉ **products**: cung cấp primitives (blocks, databases) thay vì giải pháp cố định.
- "All single-purpose apps are rigid assemblies of the same underlying concepts."
- AI như Cursor cho phép làm việc trực tiếp với **intent** thay vì cú pháp code.
- Hiểu và sử dụng các **primitives** mới (CLI, GUI, web, AI) là chìa khóa tạo ra hệ sinh thái đổi mới.

## [Những Dấu Hiệu Của Việc Thực Thi Tốt](https://yusufaytas.com/what-good-execution-looks-like/)

Thực thi tốt không ồn ào, mà yên tĩnh và hiệu quả. Khi hệ thống vận hành trơn tru, mọi người làm việc cùng nhau mà không cần quá nhiều quản lý hay can thiệp. Ngược lại, khi thực thi kém, sẽ có nhiều dấu hiệu như dự án bị đình trệ, quy trình trở nên rườm rà, và số lượng cuộc họp tăng vọt. Dấu hiệu rõ ràng nhất là sự "ồn ào" trong môi trường làm việc, khi mà mọi người mất niềm tin vào quá trình thực thi.

Các nền tảng cho việc thực thi hiệu quả bao gồm: sự rõ ràng về định hướng, bối cảnh ổn định, quyền sở hữu minh bạch, quy trình gọn nhẹ, sự tin tưởng, và một nhịp điệu làm việc nhất quán. Những yếu tố này tạo nền tảng cho các kỹ sư tự chủ, an toàn về mặt tâm lý, và có thể tự điều chỉnh khi gặp vấn đề.

**Điểm chính:**
- **Sự rõ ràng về định hướng:** Giúp các kỹ sư hiểu rõ mục tiêu, tránh lãng phí thời gian và công sức.
- **Quyền sở hữu minh bạch:** Người nào chịu trách nhiệm cho phần việc đó, giúp tránh tình trạng "không ai làm".
- **Giao tiếp yên tĩnh:** Không có quá nhiều cuộc họp hay cập nhật phòng thủ, thể hiện sự tin tưởng lẫn nhau.
- **Tự chủ và an toàn tâm lý:** Kỹ sư có thể đưa ra quyết định mà không sợ bị trừng phạt, từ đó tăng hiệu suất.
- **Nhịp điệu và phản hồi liên tục:** Giúp duy trì động lực và điều chỉnh kịp thời khi có sai lệch.

### Bonus

**Images:**
![How to Design Good APIs](https://substackcdn.com/image/fetch/$s_!tANe!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F7f80d730-11c4-4d55-81bf-fa4629cc2f0f_2360x2960.png)
![Types of Virtualization](https://substackcdn.com/image/fetch/$s_!gReB!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fc2e93eb2-84ab-427f-b587-e14b599e0fee_2360x2960.png)

**Videos:**
[Why is Kafka Popular?](https://www.youtube.com/watch?v=7_wkWQ9rB5I)
