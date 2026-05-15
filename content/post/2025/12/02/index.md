---
title: "Newsletter #62"
date: 2025-12-02
tags: ["AI-Assisted", "Technology", "Multi-Core", "Performance", "Programming", "Systems", "AI-Coding"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #62. ~~Bài viết này được thực hiện bởi VSCode Chat + OpenRouter + xAI: Grok 4.1 Fast (free)~~*

## [Claude Skills are awesome, maybe a bigger deal than MCP](https://simonwillison.net/2025/Oct/16/claude-skills/)

Anthropic vừa công bố **Claude Skills**, một tính năng mới giúp Claude thực hiện các nhiệm vụ chuyên biệt hiệu quả hơn. Skills là các thư mục chứa file Markdown với hướng dẫn chi tiết, kèm theo script và tài nguyên cần thiết. Claude chỉ tải Skills khi nhận thấy nó liên quan đến yêu cầu của người dùng, giúp tiết kiệm token và tăng độ chính xác.

Ví dụ điển hình là **slack-gif-creator**, một skill tạo GIF động tối ưu cho Slack từ mô tả đơn giản như "tạo GIF về Skills so với MCP". Claude sử dụng Python với PIL để xây dựng animation, kiểm tra kích thước file (dưới 2MB) trước khi xuất. Tác giả Simon Willison đã thử nghiệm và nhận được kết quả ấn tượng, dù GIF đầu tiên hơi "gây động kinh" nhưng dễ dàng cải tiến qua iteration.

Skills phụ thuộc vào môi trường code execution (như Claude Code), khác biệt lớn so với MCP (Model Context Protocol). MCP tốn nhiều token để mô tả tool, trong khi Skills đơn giản chỉ cần Markdown + YAML metadata, dễ chia sẻ qua GitHub. Tác giả dự đoán Skills sẽ tạo "bùng nổ" agent, từ data journalism (phân tích census data, publish Parquet) đến tự động hóa chung. Đơn giản chính là sức mạnh: không cần protocol phức tạp, LLM tự xử lý.

**Điểm chính:**

- Skills: folder hướng dẫn + script, load on-demand, token-efficient.
- Ưu việt MCP: Ít token hơn, dễ implement/share, tận dụng coding env.
- Ứng dụng: Tạo agent chuyên biệt (GIF Slack, PDF/Excel, data viz).
- Tương lai: Explosion skills cho mọi model, không chỉ Claude.

## [Environment variables are a legacy mess: Let's dive deep into them](https://allvpv.org/haotic-journey-through-envvars/)

Biến môi trường (environment variables) là một phần "di sản lộn xộn" từ thời Unix, vẫn được dùng rộng rãi để truyền tham số runtime cho ứng dụng mà không cần file config phức tạp. Chúng là dictionary string phẳng, global, không namespace hay type, được truyền từ parent sang child process qua syscall `execve` (filename, argv, envp). Kernel dump chúng lên stack dưới dạng null-terminated strings, với hạn chế: mỗi var ≤128KiB, tổng ≤2MiB chia sẻ với args.

Mỗi ngôn ngữ lưu trữ khác nhau: Bash dùng stack hashmaps (export local vars vẫn pass to child), glibc dùng dynamic array (getenv/putenv O(n)), Python dùng `os.environ` proxy đến putenv (one-way sync). Format liberal: kernel chấp nhận bất kỳ string nào, kể cả duplicate names, no '=', emoji, spaces in name (Bash lưu invalid_env). POSIX yêu cầu name không chứa '=', value portable charset; khuyến khích lowercase cho app tránh conflict uppercase utilities, nhưng convention là UPPERCASE_WITH_UNDERSCORES.

Bài viết khám phá sâu quirks: Nushell/Python handle space names ok, Bash dedup và drop nonsense. Khuyến nghị thực tế: regex `^[A-Z_][A-Z0-9_]*$` cho name, UTF-8 value để tương thích Linux tốt.

**Điểm chính:**

- Env vars kế thừa parent-child via execve, dump stack.
- Lưu trữ: Bash stack hashmap, glibc array, Python proxy putenv.
- Liberal: duplicates/no= ok kernel, apps sanitize.
- POSIX: no= in name; UPPERCASE convention, lowercase reserved apps.
- Rec: UPPER_UNDERSCORE names, UTF-8 values.

## [Examples are the best documentation](https://rakhim.exotext.com/examples-are-the-best-documentation)

Tác giả cho rằng **examples là documentation tốt nhất**, vì 95% thời gian dev chỉ cần một ví dụ đơn giản để hiểu cách dùng API, thay vì docs dài dòng dành cho người đã quen ecosystem. Khi juggle nhiều projects/languages, restore context tốn mental energy; formal docs thường yêu cầu kiến thức nền (như Python `max(iterable, /, *, key=None)`: hiểu `*`, `/`, positional-only, iterable, keyword args).

Ví dụ minh họa `max()` rõ ràng hơn docs:

```
max(4, 6) # → 6
max([1, 2, 3]) # → 3
max(['x', 'y', 'abc'], key=len) # → 'abc'
max([]) # ValueError
max([], default=5) # → 5
```

Community như clojuredocs.org (Clojure) xuất sắc với examples thực tế, kèm related functions (into, spit, map). Docs chính thức thường terse API ref; dev hay tìm tutorial để lấy examples, dù không cần walkthrough đầy đủ. 4 loại docs lý tưởng hiếm gặp.

**Điểm chính:**

- Examples nhanh, trực quan > formal docs cho quick lookup.
- Python max(): signature phức tạp, examples đơn giản minh họa.
- clojuredocs.org: community examples + related funcs hữu ích.
- Thường hesitate "Documentation" link, prefer tutorial cho examples.

## [Hazardous States and Accidents](https://entropicthoughts.com/hazardous-states-and-accidents)

Bài viết giới thiệu khái niệm **hazardous states** (trạng thái nguy hiểm) vs **accidents** (tai nạn) trong systems theory cho safety-critical systems. Accident xảy ra khi H (hazardous state) ∧ E (bad environment) → A. Không kiểm soát được E, nên focus tránh H bằng constraints. Ví dụ aviation: hạ cánh với fuel <30 phút là H (dễ crash nếu thời tiết xấu); trẻ em chơi gần vách đá: đứng sát mép mà không ai đỡ là H.

Maintaining constraints là dynamic control problem: controllers (low-level auto/hardware/software, high-level social/legal) dùng feedback (hiện tại), mental models (dự đoán tương lai), control actions (điều chỉnh). Failure khi thiếu 1/3: feedback kém, model sai, action yếu/mạnh quá. Controllers đa tầng: aviation có FADEC, FMS, pilots, ATC; car có stability, driver, lane assist.

Predict H dễ hơn A (A cần multiple failures + bad E, trông như freak accident). Analyze H ngay cả near-miss, không chờ A (aviation report fuel low dù safe land). Từ Nancy Leveson (Engineering a Safer World), khuyến khích deeper analysis: reduce consequence, improve feedback/models, human error là starting point không phải end.

**Điểm chính:**

- H ∧ E ⇔ A: Tránh H để safety, ignore E luck.
- Dynamic control: feedback + models + actions đa controllers.
- Predict/analyze H > A: easier, proactive.
- Aviation/child/car examples minh họa constraints.
- Systems theory: Leveson books, future topics RCA flaws.

## [Multi-Core By Default](https://www.dgtlgrove.com/p/multi-core-by-default)

Tác giả Ryan Fleury lập luận **multi-core nên là default** thay vì special-case trong single-core code, tận dụng core counts cao (8-64) hiện đại. Parallel for/job systems tốn overhead (kernel threads, subdivision, sync, debug khó, lifetime mgmt), scatter control flow. Thay vào đó, bootstrap threads chạy chung EntryPoint (như GPU shaders), dùng LaneIdx()/LaneCount()/LaneSync() phân bổ work uniform (LaneRange), barrier sync, atomic cho reduce (sum), narrow (if LaneIdx()==0) cho serial (I/O, printf).

Ví dụ sum array: mỗi lane tính subset uniform, atomic add hoặc table+barrier. File read: lane 0 alloc, broadcast ptr, lanes read ranges. Dynamic tasks: atomic counter grab. Non-uniform: redesign algo (radix sort uniform > comparison sort). Single-core chỉ param thread_count=1. Codebase primitives: LaneRange(count), LaneSyncU64(ptr, src_lane), đơn giản debug (full stack, homogeneous).

Ưu: Ít machinery, uniform work dist, dễ narrow/wide, superset single-core, profiler rõ. Áp dụng debugger lớn data, game engines.

**Điểm chính:**

- Multi-core default: Bootstrap lanes chung code, primitives Lane*().
- Critique job/parallel_for: Overhead, debug hard, scatter context.
- Uniform dist: LaneRange upfront, atomic counter dynamic, redesign algo.
- Narrow serial: if(LaneIdx()==0), broadcast shared data.
- Benefits: Simpler, scalable perf, full stack debug.

## [Vibing a Non-Trivial Ghostty Feature](https://mitchellh.com/writing/non-trivial-vibing)

Mitchell Hashimoto chia sẻ quy trình **agentic coding** xây dựng tính năng update notification unobtrusive cho Ghostty (terminal macOS), dùng AI (Amp) ship real feature. Bắt đầu pre-AI plan: Sparkle custom UI + titlebar accessory/overlay. Sessions: prototype SwiftUI (titlebar pill), hit bug (tabs overlap) → pivot overlay bottom-right; backend UpdateDriver scaffold → cleanup viewmodel (tagged union); simulation scenarios; last mile controller/hook.

Quy trình: Plan/oracle → small chunks (UI/backend) → cleanup/docs/refactor → fix bugs manual+AI → sim/tests → "anything else?". Manual polish critical, AI inspiration/prototype/cleanup. 16 sessions, $15.98 tokens, ~8h wall-clock (AI works while cooking). Faster than manual (SwiftUI tedious), esp iteration.

**Điểm chính:**

- Agentic: Plan → prototype chunks → cleanup/docs → sim/fix → review ship.
- Pivot bugs: Tabs conflict → overlay fallback (titlebar hidden too).
- Cleanup key: Viewmodel restructure → better AI/backend/UI.
- Cost/time: $16/8h, AI parallel human tasks.
- Tips: Scaffold TODO, docs, "fix build", "anything else?".

## Bonus: Vài ảnh hay ho đến từ [ByteByteGo](https://bytebytego.com/)

![A Guide to Microservices Architecture for Building Scalable Systems](https://substackcdn.com/image/fetch/$s_!lKZF!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fde422306-ef24-4d81-ac91-cb24ff284706_2250x2624.heic)

*Kết quả của combo này mình đánh giá khoảng 4-6đ, cấu trúc ổn, chốt được nội dung cốt lõi tuy nhiên còn dùng nhiều từ tiếng Anh. Ưu điểm là sẵn có trong VSCode, tận dụng được built-in feature của VSCode, không phải chạy thêm Terminal*

---

*Bài viết đã được review và cập nhật bởi Claude Code với Opus 4.7 (1M context).*
