---
title: "Newsletter #65"
date: 2025-12-08
tags: ["AI-Assisted", "Technology", "Engineering", "Leadership", "Scaling", "Infrastructure", "Linux", "Developer Tools"]
categories: ["Newsletter"]
---

*~~Dạo gần đây mấy model free trên OpenRouter đang không ổn định lắm, lúc dùng được lúc thì không. Sẵn còn vài $ credit trên đấy nên nay tranh thủ bào nốt rồi chuyển qua iFlow dùng hẳn (cho đến khi iFlow hết free :v).~~ Mời bạn thưởng thức Newsletter #65. ~~Bài viết này được thực hiện bởi [Claude Code](https://github.com/anthropics/claude-code), [Claude Code Router](https://github.com/musistudio/claude-code-router), [OpenRouter](https://openrouter.ai) & [Anthropic: Claude Sonnet 4.5](https://openrouter.ai/anthropic/claude-sonnet-4.5) (model 'xịn' nhe hehe)~~*

## [Scaling Engineering Teams: Lessons from Google, Facebook, and Netflix](https://greenido.dev/2025/09/25/scaling-engineering-teams-lessons-from-google-facebook-and-netflix/)

Bài viết chia sẻ kinh nghiệm quý báu từ tác giả với hơn 10 năm lãnh đạo kỹ thuật tại Google, Facebook và Netflix về cách mở rộng quy mô đội ngũ kỹ thuật từ 10 lên 1000+ engineers. Tác giả tập trung vào ba yếu tố then chốt: đặt mục tiêu với OKRs, xây dựng nền tảng chất lượng code, và nuôi dưỡng văn hóa làm việc.

Về OKRs, Google khuyến khích đặt mục tiêu đầy tham vọng - đạt 60-70% là tốt, còn đạt 100% nghĩa là mục tiêu chưa đủ cao. Netflix lại theo triết lý "Context Over Control" - cho team một North Star metric duy nhất để tập trung. Đối với chất lượng code, Facebook yêu cầu mọi dòng code đều phải được review, có code owner rõ ràng, và đạt ít nhất 80% test coverage. Netflix nổi tiếng với Chaos Engineering - cố ý "giết" instances ngẫu nhiên để kiểm tra độ bền hệ thống.

Về văn hóa, Google có "Innovation Fridays" hàng tháng để thử nghiệm, Facebook có chương trình Bootcamp 6 tuần cho engineers mới fix bugs khắp nơi trước khi chọn team, còn Netflix tin tưởng vào việc thuê người tài năng với lương cao và kỳ vọng họ hành xử như người trưởng thành. Điểm chung của các công ty này là đều tránh hero culture và tribal knowledge - thay vào đó là hệ thống, documentation, automation và ownership rõ ràng.

**Điểm chính:**
- Đặt mục tiêu OKRs đầy tham vọng (60-70% completion là tốt) với 3-5 objectives và 2-4 key results mỗi team
- Bắt buộc code review cho mọi thay đổi, có code owner rõ ràng, và duy trì ≥80% test coverage
- Thực hành Chaos Engineering để test độ bền hệ thống và sử dụng canary deployment
- Nuôi dưỡng văn hóa đổi mới qua innovation time, bootcamp cho nhân viên mới, và 360 feedback
- Theo dõi DORA metrics: lead time, deployment frequency, time to restore, change failure rate
- Tránh hero culture và manual processes - ưu tiên systems, documentation, automation

## [The Trap of Excessive AI Use](https://dpereira.substack.com/p/the-trap-of-excessive-ai-use)

David Pereira, tác giả của "Untrapping Product Teams", cảnh báo về cái bẫy của việc lạm dụng AI - nó có thể khiến con người trở nên trung bình thay vì giỏi hơn. Tuy không phản đối AI, ông lo ngại xu hướng "tự động hóa mọi thứ một cách mù quáng" đang thịnh hành trong giới chuyên môn. Vấn đề cốt lõi là: AI có thể tăng tốc độ nhưng không thể thay thế tư duy phản biện, sự thấu hiểu hay phán đoán của con người.

Pereira nhận thấy nhiều pattern sử dụng AI đáng lo ngại: giao quyết định ưu tiên cho AI thay vì phân tích kỹ lưỡng, dùng AI viết product requirement documents thay vì suy ngẫm về điều gì thực sự quan trọng, tóm tắt quá mức thay vì học sâu, hoặc thay thế nghiên cứu thực sự bằng insights do AI tạo ra. Ông nhấn mạnh: "càng nhiều người vội vã outsource mọi thứ cho AI, thì việc là người không làm như vậy càng trở nên có giá trị."

Về phía cá nhân, Pereira vẫn giữ những thói quen "old-fashioned": đọc từng tin nhắn trực tiếp, viết email thủ công để khuyến khích suy ngẫm, review từng application riêng lẻ, đọc sách hoàn chỉnh thay vì tóm tắt, và single-tasking để đảm bảo chất lượng hơn số lượng. Tuy nhiên, ông cũng thừa nhận AI hữu ích trong việc tăng tốc (draft meeting notes, automate research), khám phá (tạo góc nhìn thay thế, stress-test assumptions), và học hỏi (tạo experiment options). Nguyên tắc của ông rất rõ ràng: "AI có thể draft, nhưng tôi quyết định" - phân biệt giữa leverage và abdication trách nhiệm.

**Điểm chính:**
- AI tăng tốc độ nhưng không thay thế critical thinking, wisdom và human judgment
- Tránh ủy thác quyết định quan trọng cho AI: prioritization, requirement docs, research insights
- Critical thinking, hiểu human behavior, challenge assumptions nên là domain của con người
- Sử dụng AI để acceleration (draft notes, automate research), exploration (alternative perspectives), và learning
- Nguyên tắc "AI can draft, but I decide" - phân biệt leverage vs abdication
- Càng nhiều người dựa vào AI, người không lạm dụng AI càng có giá trị

## [How Google, Amazon, and CrowdStrike Broke Millions of Systems](https://newsletter.techworld-with-milan.com/p/how-google-amazon-and-crowdstrike)

Bài viết phân tích ba sự cố infrastructure lớn năm 2025 đã làm gián đoạn hàng triệu hệ thống, tiết lộ những bài học quan trọng về tính mong manh của distributed systems. AWS gặp sự cố kéo dài 15 giờ ảnh hưởng 113 services do race condition trong DynamoDB DNS automation - DNS Enactor #1 đã ghi đè Route 53 với dữ liệu cũ khi thời gian xử lý vượt quá timeout. Google Cloud sập 7 giờ do null pointer exception trong Service Control, bug nằm im 14 ngày sau khi deploy code mới thiếu null validation cho đến khi corrupted policy xuất hiện và Spanner replicate toàn cầu "với tốc độ ánh sáng".

CrowdStrike gây ra thảm họa với 8.5 triệu máy Windows bị boot loop do Channel File 291 trigger null pointer trong kernel mode. Máy bay không cất cánh được, bệnh viện hủy phẫu thuật, và recovery đòi hỏi can thiệp thủ công trên từng máy bằng cách boot Safe Mode và xóa file .sys. Sự việc diễn ra nhanh chóng - chỉ 78 phút từ lúc global deployment đến khi phát hiện vấn đề, nhưng damage đã lan rộng. Kernel-mode drivers crash toàn bộ hệ thống khi gặp lỗi, và việc bypass Windows certification để update nhanh đã phản tác dụng.

Ba sự cố này có điểm chung: đều ưu tiên speed hơn safety trong deployment, đều có single points of failure tạo catastrophic blast radius, và recovery automation trở thành failure modes trong stress. Bài học rút ra: cần staged rollouts với canary testing, validation gates trước global replication, circuit breakers cho recovery automation, và test recovery scenarios ở production-scale load. Như tác giả kết luận: "Độ phức tạp của hyperscale tạo ra emergent failure modes gần như không thể dự đoán hay test hoàn toàn."

**Điểm chính:**
- AWS sập 15h do race condition: processing time vượt timeout, DNS Enactor ghi đè Route 53 với dữ liệu cũ
- Google Cloud sập 7h do null pointer exception, bug nằm im 14 ngày, không có feature flag để disable
- CrowdStrike: 8.5M máy Windows boot loop, Channel File 291 trigger kernel crash, phải manual fix từng máy
- Common themes: speed vs safety, single points of failure, automated recovery thành failure modes
- Recommendations: staged rollouts, validation gates, circuit breakers, test recovery ở production-scale
- "Hyperscale complexity tạo emergent failure modes không thể dự đoán hoàn toàn"

## [The Linux Boot Process: From Power Button to Kernel](https://www.0xkato.xyz/linux-boot/)

Bài viết này cung cấp một walkthrough kỹ thuật chi tiết về cách Linux khởi động, từ lúc bấm nút nguồn cho đến khi kernel initialization hoàn tất. Quá trình bắt đầu với CPU reset về "real mode" (16-bit 8086 mode) và jump đến reset vector tại `0xFFFFFFF0`. Firmware layer (BIOS hoặc UEFI) thực hiện hardware checks - BIOS tìm bootable devices với magic bytes `0x55` `0xAA` trong 512-byte đầu, trong khi UEFI hiểu filesystems trực tiếp và load được boot programs lớn hơn. GRUB bootloader sau đó load Linux kernel vào memory, fill setup header với boot parameters, và jump đến setup program.

Setup program tạo môi trường dự đoán được bằng cách align segment registers, tạo stack, clear BSS (global variables area), query available RAM qua e820 calls. Tiếp theo là mode transitions: từ 16-bit sang 32-bit protected mode (disable interrupts, mở A20 line, load minimal GDT/IDT, set PE bit trong CR0), rồi sang 64-bit long mode (enable PAE trong CR4, build minimal page tables với identity mapping, write page table address vào CR3, set LME bit trong EFER). Cuối cùng, 64-bit stub decompresses kernel bằng gzip/xz/zstd, đọc ELF headers để xác định nơi đặt code và data.

Một feature bảo mật quan trọng là kASLR (Kernel Address Space Layout Randomization) - random chọn physical và virtual base addresses từ available memory slots, tránh reserved regions. Điều này làm attacks khó hơn bằng cách randomize kernel location. Nếu kernel load ở địa chỉ khác với expected, decompressor apply relocations để fix pointers và addresses. Sau khi decompression và relocation xong, code jump đến `start_kernel`, đánh dấu bắt đầu full kernel initialization.

**Điểm chính:**
- Boot flow: Power on → CPU reset (real mode) → Firmware (BIOS/UEFI) → Bootloader (GRUB) → Setup program
- Mode transitions: Real mode (16-bit) → Protected mode (32-bit) → Long mode (64-bit)
- Setup program: align segments, create stack, clear BSS, query RAM via e820, enable serial output
- Protected mode: disable interrupts, A20 line, load GDT/IDT, set PE bit trong CR0
- Long mode: enable PAE (CR4), build page tables with identity mapping, CR3 = page table, set LME (EFER)
- Decompression: 64-bit stub decompress kernel (gzip/xz/zstd), read ELF headers, apply relocations nếu cần
- kASLR: randomize kernel location để tăng security, fall back về defaults nếu không có suitable space

## [Build System Tradeoffs](https://jyn.dev/build-system-tradeoffs)

Bài viết từ jyn.dev phân tích các tradeoffs trong thiết kế build systems cho complex projects. Tác giả chỉ ra rằng build systems phải giải quyết nhiều concerns phức tạp: running generated binaries (integration tests gọi recursive builds), dependency tracking (nhiều hand-written builds có broken dependencies), cross-compilation (cần compiler cho target, standard library và linker), và tension giữa dynamic vs static linking - platform maintainers thích dynamic linking cho security updates, developers thích static linking cho reliability.

Về dependency tracking, có nhiều approaches khác nhau: manual specification (unreliable), compiler support (tốt hơn nhưng incomplete), ephemeral state (always correct nhưng expensive), hermetic builds (sandboxed, forces explicit dependencies), và tracing (instruments syscalls để discover dependencies tự động). Hermetic builds như Bazel, Buck2, Nix guarantee correctness bằng cách chỉ allow declared inputs, enable remote caching và precise test selection. Tracing builds như Tup, Ekam tự động discover dependencies qua syscall monitoring - benefits mà không cần manual specification, nhưng Linux-specific và problematic ở scale lớn.

Một điểm quan trọng tác giả nhấn mạnh là "making a build 'declarative' is a lie" - build systems vốn dĩ là procedural, nên tốt hơn hết là cho developers một ngôn ngữ thực sự thay vì custom DSL hạn chế. Về toolchains, hầu hết build systems "sidestep it by not worrying about it" và break khi compilers update mà không clean rebuild. Reproducible builds là must-have cho sound caching - cùng compiler invocation phải produce identical output. Tác giả kết luận kết hợp tracing với hermetic approaches "seems like the best of both worlds."

**Điểm chính:**
- Build concerns: recursive invocations, dependency tracking, cross-compilation, dynamic vs static linking, toolchains
- Dependency tracking: manual (unreliable), compiler support (incomplete), ephemeral (expensive), hermetic (correct), tracing (automatic)
- Hermetic builds (Bazel, Buck2, Nix): sandbox với declared inputs only, enable remote caching
- Tracing builds (Tup, Ekam): syscall monitoring tự động discover dependencies, Linux-specific
- "Making builds declarative is a lie" - nên dùng real programming language thay vì custom DSL
- Reproducible builds: same compiler invocation → identical output, critical cho sound caching
- Best approach: kết hợp tracing với hermetic builds

## [How I Use Every Claude Code Feature](https://blog.sshh.io/p/how-i-use-every-claude-code-feature)

Shrivu Shankar chia sẻ kinh nghiệm sử dụng Claude Code trong production, với nhiều insights thực tế về cách tối ưu AI coding agent. CLAUDE.md là foundation quan trọng nhất - file 13KB của tác giả được maintain nghiêm ngặt như "constitution" của agent, chỉ document tools được 30%+ engineers sử dụng. Nguyên tắc chính: start với guardrails chứ không phải comprehensive manual, tránh @-mention docs trực tiếp (bloats context), luôn provide alternatives thay vì chỉ negative constraints.

Về context management với 200k token window, baseline monorepo tốn ~20k tokens (10%). Tác giả tránh `/compact` vì opaque và error-prone, thay vào đó dùng `/clear` + custom `/catchup` command cho simple reboots, hoặc "Document & Clear" method cho complex tasks (dump progress ra .md, clear, tiếp tục). Về custom features, tác giả theo minimalist approach - chỉ 2 slash commands (`/catchup`, `/pr`), không dùng custom subagents vì "gatekeep context" và "force human workflows", thay vào đó prefer "Master-Clone" architecture dùng built-in `Task(...)` để spawn clones với full `CLAUDE.md` context.

Hooks critical cho enterprise repos: block-at-submit hooks (block commits until tests pass) và hint hooks (non-blocking feedback), nhưng tránh block-at-write hooks vì confuse agent mid-plan. Planning mode luôn được dùng cho large features. Về Skills vs MCP, tác giả đồng ý với Simon Willison rằng "Skills are (maybe) a bigger deal than MCP" - Skills formalize scripting layer trong agent autonomy evolution: single prompt → tool calling → scripting. MCP chỉ dùng như secure gateway cho stateful environments (Playwright), không phải bloated API mirrors. Claude Code SDK được dùng cho massive parallel scripting, building internal chat tools, và rapid agent prototyping. GitHub Action là "most slept on feature" - provides customizable containers với strong sandboxing.

**Điểm chính:**
- CLAUDE.md là foundation: guardrails > manual, document tools dùng bởi 30%+ engineers, avoid @-mention docs
- Context: baseline 20k tokens (10% of 200k), dùng /clear + /catchup thay vì /compact
- Minimalist approach: 2 slash commands only, no custom subagents, prefer "Master-Clone" architecture với Task(...)
- Hooks: block-at-submit + hint hooks cho enterprise, avoid block-at-write (confuses agent)
- Skills > MCP: Skills formalize scripting layer, MCP chỉ cho stateful environments
- GitHub Action underrated: customizable containers với strong sandboxing
- Agent autonomy evolution: single prompt → tool calling → scripting (Skills formalize này)

## [If you don't tinker, you don't have taste](https://seated.ro/blog/tinkering-a-lost-art)

Seatedro viết về tầm quan trọng của tinkering - việc sửa chữa và cải thiện nhỏ thứ gì đó, nhưng mở rộng định nghĩa này thành exploratory learning qua hands-on experimentation. Tác giả hối tiếc không bắt đầu tinker sớm hơn trong đời - dù thử nhiều hoạt động khác (guitar, art, martial arts), họ không explore programming qua hands-on experimentation cho đến muộn, điều đã trở thành fundamental trong sự phát triển của họ. Examples của tinkering bao gồm: adjust game settings như mouse sensitivity, install và customize Linux distributions với window managers, modify mechanical keyboards.

Tác giả phân biệt hai loại người: goal-oriented và những người explore "just because," khuyến khích balance cả hai. Citing @ludwigABAP, tinkering và discard work nên được xem như ephemeral, exploratory practice diễn ra frequently. Về minimum standards, tác giả cho rằng dùng command-line tools (Git CLI vs GitHub Desktop), hiểu vim bindings, move beyond basic IDE terminals nên là baseline skills chứ không exceptional. Trong một tuần gần đây, tác giả explore: GLSL shaders, Rust macros, template C++, Swift development, Windows development challenges, và Helix editor - tất cả đều unnecessary cho immediate goals nhưng valuable cho learning.

Core message là taste emerges từ việc try multiple approaches, discard what doesn't work, keep what does. Điều này tạo individual preferences thay vì follow defaults. Tác giả định nghĩa taste là khả năng distinguish mediocrity from excellence. Continuous experimentation, question defaults, và break things repeatedly builds cả skill lẫn discernment, đặc biệt quan trọng trong technological landscape hiện tại.

**Điểm chính:**
- Tinkering = exploratory learning qua hands-on experimentation, không chỉ là sửa chữa nhỏ
- Examples: adjust game settings, customize Linux/window managers, modify mechanical keyboards
- Balance goal-oriented work với exploring "just because"
- Minimum standards: Git CLI, vim bindings, beyond basic IDE terminals nên là baseline
- Tinkering builds taste: try nhiều approaches, discard bad, keep good → individual preferences
- Taste = distinguish mediocrity from excellence
- Trong 1 tuần: GLSL shaders, Rust macros, template C++, Swift, Windows dev, Helix - all valuable learning

## Bonus: Vài ảnh hay ho đến từ [ByteByteGo](https://bytebytego.com/)

![10 Key Data Structures We Use Every Day](https://substackcdn.com/image/fetch/$s_!Fxka!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F60f07f90-6f22-4b1f-ab2e-d98e8ccc755a_3000x3900.png)
![IP Address Cheat Sheet Every Engineer Should Know](https://substackcdn.com/image/fetch/$s_!Nizo!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fffa24eaf-4fc7-4278-a0df-faddb41c765f_2048x2662.png)
![Which Protocols Run on TCP and UDP](https://substackcdn.com/image/fetch/$s_!ZdF6!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fef416976-ae0f-48f5-86e1-0189c0b9be88_2360x2664.png)

**Đánh giá:** *Uầy, đang process url cuối thì hit limit mất rồi. Ban đầu còn 2$ (cỡ 52k) mà process được có 7 urls, tính ra là ~7.5k vnđ/bài. Khá là chát đó chứ :v Mà kết quả thì cũng chưa ưng ý lắm, vẫn còn lạm dụng tiếng Anh. Nhìn vào bài cuối là thấy rõ. Cũng có thể là vấn đề ở file AGENTS.md của mình, để mình optimize lại sau vậy. Dù gì thì mình cũng đã đạt được mục đích là tranh thủ bào để quay lại xài đồ free rồi :v Hẹn gặp lại các bạn trong các bài viết tiếp theo :D.*

---

*Bài viết đã được review và cập nhật bởi Claude Code với Opus 4.7 (1M context).*
