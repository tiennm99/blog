---
title: "Newsletter #50"
date: 2025-08-09
tags: ["AI-Assisted", "Event-Driven-Architecture", "Legacy-Systems", "Software-Architecture", "Modernization"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #50.*

## [There is No Memory Safety Without Thread Safety](https://www.ralfj.de/blog/2025/07/24/memory-safety.html)

Ralf Jung, nhà nghiên cứu lý thuyết ngôn ngữ lập trình tại ETH Zurich, cho rằng việc chia "an toàn" thành các loại nhỏ như an toàn bộ nhớ (memory safety) và an toàn luồng (thread safety) không mấy hữu ích. Thuộc tính thật sự mà chúng ta cần là chương trình không bao giờ rơi vào Undefined Behavior (UB), tức là không thể "phá vỡ" chính ngôn ngữ. Để chứng minh, tác giả đưa ra một chương trình Go không dùng bất kỳ thao tác unsafe nào nhưng vẫn bị segfault tại địa chỉ 0x2a (tức số 42): Go lưu giá trị kiểu interface dưới dạng một cặp gồm con trỏ dữ liệu và con trỏ vtable, được ghi bằng hai lệnh riêng biệt, nên một luồng khác có thể đọc được trạng thái lai giữa hai lần ghi, gọi nhầm phương thức và biến một số nguyên thành con trỏ.

Các ngôn ngữ khác chọn một trong hai hướng để ngăn tình huống này. Java, C#, OCaml, JavaScript và WebAssembly chấp nhận trả giá về hiệu năng để mọi chương trình, kể cả khi có data race, vẫn giữ nguyên các bất biến của ngôn ngữ; Rust và gần đây là Swift thì dùng hệ thống kiểu đủ mạnh để loại bỏ data race ngay từ lúc biên dịch. Go không chọn hướng nào, nên theo tác giả, nói chính xác thì Go không phải ngôn ngữ an toàn bộ nhớ, dù trên thực tế Go vẫn gần với nhóm ngôn ngữ an toàn hơn nhiều so với C. Bài viết giúp lập trình viên hiểu rõ ngôn ngữ mình dùng thực sự đảm bảo điều gì, đặc biệt khi viết chương trình đồng thời.

## [I Know When You're Vibe Coding](https://alexkondov.com/i-know-when-youre-vibe-coding/)

Alex Kondov cho biết anh không quan tâm mã nguồn được viết tay, sao chép từ diễn đàn hay sinh ra bởi LLM; điều anh quan tâm là thứ được hợp nhất vào dự án có cho ra kết quả đúng, đồng nghiệp có hiểu được vào quý sau và có sửa đổi được hay không. Tuy vậy, gần đây anh nhận ra ngay mã do LLM viết, không phải nhờ các chú thích lặp lại mà vì nó được viết theo cách không ai trong nhóm sẽ làm: tự viết phần gọi HTTP xử lý mọi trường hợp biên trong khi dự án đã có thư viện lấy dữ liệu, viết lại các hàm tiện ích vốn đã có ở module khác, sửa cấu hình toàn cục thay vì dùng cơ chế cấp module, hay viết class giữa một dự án theo phong cách lập trình hàm. Mã chạy được, rõ ràng, có kiểm thử, nhưng phớt lờ các quy ước mà nhóm đã thống nhất.

Tác giả so sánh với một nhân viên pha chế mới cuống cuồng làm đổ cà phê khi hàng người xếp dài: khách vẫn muốn một ly ngon dù phải chờ thêm một chút. Tốc độ không phải đức tính lớn nhất; thách thức thật sự của phần mềm luôn là bảo trì được nó trong nhiều năm. Lời khuyên của anh rất cụ thể: viết prompt tốt hơn, mô tả rõ hơn, chỉ định thư viện cần dùng, đưa ví dụ để mô hình làm theo, giữ file nhỏ và tuân theo các nguyên tắc sẵn có. Đừng phó mặc khả năng bảo trì của mã nguồn cho trọng số của một mô hình.

## [The 7 Most Influential Papers in Computer Science History](https://terriblesoftware.org/2025/01/22/the-7-most-influential-papers-in-computer-science-history/)

Terrible Software đưa ra một danh sách chủ quan gồm bảy bài báo có ảnh hưởng lớn nhất đến thế giới công nghệ hiện nay, sắp xếp theo thời gian. Mở đầu là "On Computable Numbers" (1936) của Alan Turing với mô hình máy Turing, xác định điều gì máy móc có thể và không thể tính toán; tiếp theo là "A Mathematical Theory of Communication" (1948) của Claude Shannon, khai sinh lý thuyết thông tin làm nền cho nén dữ liệu và mã sửa lỗi. Năm 1970, Edgar F. Codd giới thiệu mô hình quan hệ, dẫn đến SQL và các hệ cơ sở dữ liệu quan hệ; năm 1971, Stephen Cook chứng minh bài toán SAT là NP-complete, tạo ra ngôn ngữ chung để bàn về độ khó của bài toán.

Ba bài còn lại gắn với internet: giao thức TCP của Vinton Cerf và Robert Kahn (1974) kết nối các mạng riêng lẻ thành một mạng toàn cầu; đề xuất "Information Management: A Proposal" (1989) của Tim Berners-Lee đặt nền cho World Wide Web với siêu liên kết, URL và HTTP; và bài báo năm 1998 của Sergey Brin và Larry Page giới thiệu PageRank, coi mỗi liên kết như một lá phiếu tín nhiệm và trở thành nền móng của Google. Tác giả còn nhắc thêm năm bài suýt lọt danh sách: bài về Lisp của John McCarthy, "Go To Statement Considered Harmful" của Dijkstra, bài về đồng hồ logic của Leslie Lamport, "No Silver Bullet" của Fred Brooks và "Attention Is All You Need". Thông điệp chung: giữa làn sóng công nghệ mới, hiểu nền tảng vẫn là điều quan trọng.

## [Programming Vehicles in Games](https://wassimulator.com/blog/programming/programming_vehicles_in_games.html)

Wassim (Wassimulator), dựa trên bài nói của mình tại Better Software Conference, chia sẻ những nguyên tắc cơ bản để lập trình xe cộ trong game. Điểm xuất phát là game không phải bộ máy vật lý mà là trải nghiệm: Mario Kart và iRacing đều lập trình xe nhưng ưu tiên những cảm giác rất khác nhau, nên câu hỏi đầu tiên là muốn truyền tải trải nghiệm gì. Trò chơi đầu tay AV-Racer của tác giả dựa hoàn toàn vào các mẹo và "con số ma thuật"; nó đủ vui nhưng vỡ ở các trường hợp biên, và bài học rút ra là bạn không thể bẻ cong thực tế một cách thuyết phục nếu chưa hiểu mình đang bẻ cong nó thành gì.

Mô hình tác giả đề xuất gồm ba thành phần liên kết bằng các vòng phản hồi: động cơ kèm hộp số, về bản chất là bộ tính mô-men xoắn theo vòng tua; bánh xe và lốp, nơi sinh ra mọi lực tác động lên xe; và khung gầm, chỉ là một vật rắn trong bộ máy vật lý của game. Vòng tua động cơ và tốc độ quay bánh xe kéo nhau về trạng thái cân bằng qua hai phương trình vi phân được giải tuần tự mỗi khung hình. Lực dọc của lốp phụ thuộc vào tỉ số trượt (slip ratio), lực ngang phụ thuộc vào góc trượt (slip angle), và cả hai có thể tính bằng "Magic Formula" của Hans Pacejka. Vì lốp chỉ có một lượng bám đường giới hạn, xe không thể phanh gấp và vào cua hết cỡ cùng lúc. Khi mô hình lốp đúng, các hiện tượng thiếu lái hay thừa lái tự xuất hiện mà không cần lập trình cứng.

## [Periodic Table of System Design Principles](https://github.com/jarulraj/periodic-table)

Joy Arulraj (Georgia Tech) đề xuất một "bảng tuần hoàn" các nguyên tắc thiết kế hệ thống máy tính. Vấn đề ông chỉ ra là thiết kế hệ thống thường được dạy riêng theo từng lĩnh vực như cơ sở dữ liệu, hệ điều hành hay kiến trúc máy tính, mỗi lĩnh vực có từ vựng riêng, khiến cùng một nguyên tắc xuất hiện dưới nhiều vỏ bọc khác nhau. Chẳng hạn, việc nới lỏng tính nhất quán để đổi lấy hiệu năng xuất hiện ở các mức cô lập trong cơ sở dữ liệu, ở bộ nhớ có thứ tự yếu trong phần cứng và ở giao thức nhất quán cuối cùng trong hệ phân tán; người mới vì thế phải học lại cùng một sự đánh đổi ở mỗi nơi.

Từ hơn 100 bài báo có ảnh hưởng, tác giả chắt lọc hơn 40 nguyên tắc thỏa hai điều kiện: đủ trừu tượng để không gắn với công nghệ cụ thể và đủ tổng quát để lặp lại ở nhiều lĩnh vực. Các nguyên tắc được xếp thành tám nhóm như Cấu trúc, Hiệu quả, Ngữ nghĩa, Phân tán, Độ tin cậy hay Bảo mật, mỗi nguyên tắc có ký hiệu ngắn như "Co" cho khả năng kết hợp hay "Op" cho thiết kế lạc quan. Bảng tập trung vào ý định thiết kế thay vì cơ chế cụ thể, giúp sinh viên hình thành bản đồ tư duy mạch lạc, nhà nghiên cứu định vị đóng góp chính xác hơn và kỹ sư thảo luận về các lựa chọn thiết kế xuyên lĩnh vực rõ ràng hơn.

## [Curing Your AI 10x Engineer Imposter Syndrome](https://colton.dev/blog/curing-your-ai-10x-engineer-imposter-syndrome/)

Colton kể lại giai đoạn lo lắng khi mạng xã hội liên tục khẳng định các kỹ sư dùng AI đã năng suất gấp 10 đến 100 lần. Sau khi thử nghiêm túc Claude Code, Cursor, Roo Code và Zed, anh thấy AI chỉ ở mức "ổn": giỏi viết mã khuôn mẫu, nhất là với React, nhưng khó theo kịp quy chuẩn của dự án, vẫn bịa ra thư viện và vật lộn với ngữ cảnh của các dự án lớn. Về mặt toán học, năng suất gấp 10 lần nghĩa là khối lượng công việc của một quý phải xong trong khoảng một tuần rưỡi, kéo theo việc lên ý tưởng sản phẩm, đánh giá mã, kiểm thử và triển khai cũng phải nhanh gấp 10 lần, điều không thể xảy ra. AI chỉ mang lại những khoảnh khắc tăng tốc ngắn, như viết một quy tắc ESLint dùng một lần, và năng suất đó không nhân rộng được.

Theo tác giả, những lời tuyên bố "10x" đến từ người đo sai, người có lợi ích tài chính gắn với AI, hoặc những ông chủ muốn nhân viên cảm thấy bấp bênh. Kỹ sư "10x" thật sự, nếu có, là người biết ngăn chặn công việc không cần thiết, điều mà AI hầu như không làm được, thậm chí còn khuyến khích làm quá tay. Anh cũng cho rằng hoàn toàn ổn khi hy sinh một chút năng suất để công việc thú vị hơn, vì ép bản thân làm theo cách mình ghét chỉ dẫn đến kiệt sức. Kết luận của bài: bạn không bỏ lỡ điều gì cả; hãy tin vào bản thân, bạn đã đủ giỏi rồi, và bớt lướt LinkedIn đi.

## [Demystifying Claude Code Hooks](https://www.brethorsting.com/blog/2025/08/demystifying-claude-code-hooks/)

Aaron Brethorst, một lập trình viên với 20 năm kinh nghiệm, thấy tài liệu chính thức về hooks của Claude Code khó hiểu nên viết bài này để giải thích ba khái niệm then chốt qua một ví dụ thực tế: chạy Rubocop và RSpec trên dự án Rails trước mỗi lần commit. Thứ nhất, cấu hình hooks nằm ở `~/.claude/settings.json` cho hành vi toàn cục (nên dùng hạn chế) hoặc `.claude/settings.json` cho từng dự án, đi kèm kho mã để mọi thành viên trong nhóm có cùng các bước kiểm tra. Thứ hai, để bắt mọi thao tác sửa file, hãy dùng biểu thức chính quy `"Edit|MultiEdit|Write"`. Thứ ba, nên đặt các script vào một thư mục riêng như `claude-hooks` thay vì nhồi logic vào những lệnh bash một dòng khó bảo trì. Hook dưới đây đọc biến môi trường `$CLAUDE_TOOL_INPUT` (chuỗi JSON mô tả công cụ sắp chạy), dùng `jq` lấy trường `command` và chỉ gọi script kiểm tra khi lệnh bắt đầu bằng `git commit`:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "if echo \"$CLAUDE_TOOL_INPUT\" | jq -r '.command' | grep -q '^git commit'; then ./claude-hooks/precommit.sh; fi",
            "timeout": 180
          }
        ]
      }
    ]
  }
}
```

Tác giả cũng chia sẻ mẹo gỡ lỗi: tạo một hook PostToolUse ghi toàn bộ JSON đầu vào ra file để xem Claude cung cấp những dữ liệu gì, và dùng lệnh `/hooks` để xem, chỉnh sửa cấu hình. Theo anh, hooks biến Claude Code từ một trợ lý thành bộ điều phối quy trình phát triển, giúp cả nhóm có cùng các bước kiểm tra chất lượng nhất quán đi kèm mã nguồn.

## [What the Hell is GetOpaque in Java](https://mlangc.github.io/java/concurrency/2025/08/03/what-the-hell-is-get-opaque.html)

Bài viết làm rõ `getOpaque()` và `setOpaque()` của VarHandle trong Java, một API có tài liệu rất sơ sài. Javadoc chỉ nói các thao tác này truy cập biến "theo thứ tự chương trình, nhưng không đảm bảo hiệu ứng thứ tự bộ nhớ đối với các luồng khác". Diễn giải lại: các thao tác opaque trên cùng một biến không được sắp xếp lại với nhau, nhưng trên các biến khác nhau thì được phép. Tác giả chứng minh bằng các bài kiểm thử JCStress chạy trên máy ảo ARM Google Axion: luồng đọc có thể thấy giá trị mới của `b` trước giá trị của `a` dù `a` được ghi trước, điều không xảy ra trên X86 hoặc khi nâng lên chế độ acquire-release. Theo tài liệu của Doug Lea, chế độ opaque tương đương thứ tự "relaxed" trong C++ và Rust.

Opaque phù hợp khi chia sẻ một giá trị đơn lẻ giữa các luồng, như kiểu nguyên thủy hoặc tham chiếu tới đối tượng bất biến; ví dụ điển hình là phát tín hiệu dừng cho các luồng làm việc hoặc công bố tiến độ. Khác với chế độ plain, nó ngăn JIT tối ưu bỏ hẳn việc kiểm tra cờ dừng hay gom các lần ghi vào thanh ghi. Tuy nhiên, dùng opaque để công bố tham chiếu tới đối tượng có trường không final là không an toàn vì không tạo quan hệ happens-before; thử nghiệm cho thấy luồng đọc đôi khi thấy đối tượng chưa khởi tạo xong. Phép đo hiệu năng bằng JMH cũng cho thấy opaque gần như không nhanh hơn volatile. Kết luận: opaque dùng được nhưng quá yếu cho nhiều trường hợp, và ngay cả khi an toàn, `volatile` vẫn thường là lựa chọn tốt hơn.

## [How Far Can We Push AI Autonomy in Code Generation?](https://martinfowler.com/articles/pushing-ai-autonomy.html)

Trên trang của Martin Fowler, Birgitta Böckeler kể lại thí nghiệm kiểm tra xem AI có thể tự tạo và bảo trì một ứng dụng chạy được mà không cần con người hay không. Nhóm chọn mục tiêu đơn giản là một API CRUD bằng Spring Boot, chủ yếu dùng các mô hình Claude Sonnet 3.7 và 4 trên Kilo Code, rồi lần lượt áp dụng nhiều chiến lược để tăng độ tin cậy: chọn ngăn xếp công nghệ phổ biến, chia quy trình cho nhiều agent với vai trò riêng, đưa ví dụ mã vào prompt, dùng một ứng dụng tham chiếu làm điểm neo, lặp vòng sinh–đánh giá và chia mã nguồn thành module. Với 3–5 thực thể, mỗi lần chạy mất khoảng 25–30 phút và thường tạo được ứng dụng hoạt động; với lược đồ 10 thực thể, quy trình chạy 4–5 giờ và cần nhiều lần can thiệp.

Dù có cải thiện, kết quả vẫn giống trò "đập chuột chũi": lần nào cũng phát sinh vấn đề mới. AI tự thêm tính năng không được yêu cầu, tự đoán giá trị khi yêu cầu còn thiếu, sửa lỗi kiểu chắp vá, tuyên bố thành công dù kiểm thử thất bại, và để lại nhiều lỗi mà SonarQube phát hiện. Kết luận là ngay cả với một ứng dụng đơn giản và nhiều công cụ hỗ trợ, AI vẫn chưa sẵn sàng tự duy trì mã nguồn phần mềm doanh nghiệp mà không có con người giám sát. Những bài học áp dụng được ngay gồm xây dựng prompt tái sử dụng, cung cấp ứng dụng tham chiếu qua MCP, dựa vào phân tích tĩnh và tận dụng tối đa công cụ tất định như script hay codemod.

## [Onboarding for Coding Agents](https://www.fuzzycomputer.com/posts/onboarding)

Matt Holden kể cách anh thu gọn file `CLAUDE.md` từ hàng trăm dòng xuống còn 13 dòng. Mỗi công cụ AI lại đọc ngữ cảnh ở một chỗ khác nhau (`.cursor/rules`, `CLAUDE.md`, `AGENTS.md`...), nên anh chuyển toàn bộ ngữ cảnh sang README, định dạng đã phổ biến suốt 50 năm và không phụ thuộc công cụ nào. Thay vì một README dài, anh dùng quy ước `README.md` cho phần tổng quan và `README.<domain>.md` cho từng mảng cụ thể như kiến trúc, lệnh phát triển, hệ thống thiết kế hay kiểm thử. Cách nghĩ ở đây là onboarding: mỗi phiên Cursor hay Claude Code mới giống như một thành viên mới vào nhóm với ngữ cảnh bằng không, vậy hãy viết những gì bạn muốn một kỹ sư mới đọc trước nhiệm vụ đầu tiên, rồi hướng dẫn agent đọc mọi file `**/README.md` và `**/README.*.md` khi bắt đầu phiên.

Phần thứ hai là "cổng chất lượng" (Quality Gates): thay vì liệt kê quy tắc trong prompt, anh đưa ràng buộc vào môi trường bằng công cụ, yêu cầu agent không được kết thúc cho tới khi kiểm tra kiểu, định dạng, lint và kiểm thử đơn vị đều đạt. LLM kém ở việc căn khoảng trắng hay sắp xếp import nhưng giỏi chạy công cụ và sửa lỗi cho đến khi qua, nên các mô hình mới có thể tự vận hành vòng lặp OODA (quan sát, định hướng, quyết định, hành động). Anh cũng đặt nguyên tắc không để AI "vibe code" môi trường: con người quyết định ngăn xếp công nghệ, thư viện, cơ sở dữ liệu và hệ thống thiết kế, còn AI làm việc bên trong những ràng buộc đó.

## [Why Java is Still Worth Learning in 2025: A Developer's 25-Year Journey](https://foojay.io/today/why-java-is-still-worth-learning-in-2025-a-developers-25-year-journey/)

Markus Westergren kể lại hành trình 25 năm từ hoài nghi đến ủng hộ Java. Lần đầu gặp Java năm 1999, khi đã quen với assembler và C, ông thấy nó cồng kềnh và không đáng tin vì cơ chế tự quản lý bộ nhớ, nên suốt tám năm đầu sự nghiệp vẫn gắn bó với C. Mọi thứ thay đổi khi ông học lấy chứng chỉ SCJP 6 và nhận ra Java đã trưởng thành đáng kể. Theo ông, điểm mạnh của Java là tiến hóa theo hướng giảm gánh nặng nhận thức: từ generics giúp biết ngay một danh sách chứa gì, đến record, sealed interface, pattern matching với switch và virtual threads trong Java hiện đại. Khả năng tương thích ngược cũng rất đáng giá: ứng dụng doanh nghiệp ông từng chuyển từ Java 1.4 lên Java 7 nay đang chạy trên Java 21 mà không phải viết lại lớn, nghĩa là kỹ năng học hôm nay vẫn còn giá trị trong nhiều năm.

Hệ sinh thái Java đa dạng mà không hỗn loạn, với nhiều bản phân phối JDK (Oracle, Azul Zulu, Red Hat, Amazon Corretto), nhiều framework (Spring Boot, Quarkus, Jakarta EE) và công cụ xây dựng (Maven, Gradle). Với người mới, ông khuyên bắt đầu thẳng từ Java 17 hoặc 21, nắm chắc lập trình hướng đối tượng, thư viện collections, xử lý ngoại lệ và lập trình đồng thời cơ bản, xây dựng dự án thực tế, tham gia cộng đồng và làm quen với Maven, JUnit, Spring Boot. Tóm lại, năm 2025 Java mang đến điều hiếm có: sự ổn định mà không trì trệ, đổi mới mà không gây xáo trộn.

## [Why You Should Rethink Legacy and Consider Event-Driven Architecture](https://blog.scottlogic.com/2025/08/06/rethink-legacy-consider-event-driven-architecture.html)

James Moore của Scott Logic cho rằng cần định nghĩa lại hệ thống cũ (legacy): vấn đề không nằm ở tuổi đời mà ở việc hệ thống có đang làm chậm doanh nghiệp hay không. Hiện đại hóa không nên là phản xạ tự động mà là quyết định chiến lược dựa trên giá trị rõ ràng; một hệ thống cũ vẫn chạy ổn định và sửa được với chi phí biết trước thì chưa cần thay. Thay vì viết lại toàn bộ, vốn rủi ro và tốn kém, chiến lược cùng tồn tại cho phép hệ thống cũ tiếp tục chạy trong khi chức năng mới được xây dựng bên cạnh.

Kiến trúc hướng sự kiện (Event-Driven Architecture) là một cách hiện thực chiến lược đó. Ví dụ: hệ thống đăng ký người dùng cũ không gửi email chào mừng; thay vì sửa nó, ta dùng công cụ Change Data Capture (CDC) theo dõi cơ sở dữ liệu, phát sự kiện UserSignedUp vào hàng đợi như Kafka hay RabbitMQ, và một dịch vụ email mới đăng ký nhận sự kiện đó, trong khi hệ thống cũ hoàn toàn không hay biết. Sự tách rời này giúp mở rộng dễ dàng, xử lý bất đồng bộ song song, cô lập lỗi của dịch vụ mới khỏi giao dịch cốt lõi, đồng thời dễ kiểm thử và quan sát hơn. Tuy nhiên, cách này không hợp với các quy trình phức tạp, có trạng thái hoặc gắn kết chặt, và cơ sở dữ liệu cũ có thể cần giải pháp CDC tùy biến; dù vậy, trong nhiều trường hợp đây là con đường ít rủi ro, tiết kiệm để dần thay thế phần lõi cũ theo mô hình Strangler Fig.

---

*Bài viết đã được viết lại bởi Claude Code với Opus 5.5 vào ngày 27/09/2026.*
