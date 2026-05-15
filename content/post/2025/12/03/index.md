---
title: "Newsletter #63"
date: 2025-12-03
tags: ["AI-Assisted", "Technology", "SQL", "Database", "Data-Engineering", "Anti-Patterns", "LSM-Tree", "KeyValue-DB"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #63.*

## [Simplify your code with functional core, imperative shell](https://testing.googleblog.com/2025/10/simplify-your-code-functional-core.html)

Bài viết từ Google Testing Blog giới thiệu pattern **Functional Core, Imperative Shell** để đơn giản hóa code, dễ test hơn. Core: pure functions xử lý business logic (no I/O, state, side-effects). Shell: imperative wrapper gọi core, handle I/O (DB, API, UI), errors, config.

Ví dụ: UserService class có DB calls → refactor: extract pure `calculateRecommendationScore(userData)`; shell `getRecommendation(userId)` fetch data → call pure func → return. Test pure core dễ (unit, deterministic, no mocks); shell integration tests.

Lợi ích: Modular, testable core (mockless), parallelizable, refactor-safe. Steps: Identify pure logic → extract funcs → shell adaptors. Ví dụ code Java trước/sau, test examples.

**Điểm chính:**

- Core pure funcs: business logic, testable no mocks.
- Shell imperative: I/O, glue, thin.
- Refactor: Extract pure logic từ services.
- Benefits: Easier tests, reliable, maintainable.
- Google example: Recommendation service.

## [RDEL #94: How do experienced engineers actually review code?](https://rdel.substack.com/p/rdel-94-how-do-experienced-engineers)

Nghiên cứu qualitative (10 experienced reviewers, 25 sessions) khám phá cách **experienced engineers review code**: strategic scoping dựa complexity/risk/time, 3-stage workflow (skim PR/title/desc 84% → inspect chunk/read/test/discuss → decide), 3 mental models (actual code vs expected change vs ideal impl – discrepancies trigger comments).

Context sources: PR, issues(44%), threads(40%), system knowledge/conventions. Incremental comprehension: update models mid-review, collaborate. Không full read mọi thứ, skip low-signal.

Leaders: Support scoping/chunking (commit/file), high-signal PR desc (intent/rationale top), automate linters/style (focus architecture/logic), train mental models.

**Điểm chính:**

- Strategic: Scope high-risk, 3 models discrepancy → feedback.
- Workflow: Context skim → inspect → decide; multi-sources.
- Cognitive: Not bug-hunt, layered reasoning/collaboration.
- Apply: Clear PRs, automate trivia, cognitive tooling.

## [The Great Software Quality Collapse: How We Normalized Catastrophe](https://techtrenches.dev/p/the-great-software-quality-collapse)

Bài viết từ Denis Stetskov trên Tech Trenches cảnh báo về **sự sụp đổ chất lượng phần mềm** đang diễn ra theo cấp số nhân. Các ứng dụng phổ biến như VS Code (leak 96GB RAM qua SSH), Microsoft Teams (100% CPU trên máy 32GB), Chrome (16GB cho 50 tabs), Discord (32GB khi share screen) hay Spotify (79GB trên macOS) giờ coi việc ngốn tài nguyên khủng là "bình thường". Các hệ thống lớn cũng thường xuyên hỏng: Windows 11 update làm tê liệt Start Menu, macOS Spotlight ghi 26TB dữ liệu qua đêm, iOS 18 crash khi reply tin nhắn, Android 15 ra mắt với 75+ bug nghiêm trọng.

Sự cố Crowdstrike tháng 7/2024 là minh chứng điển hình: chỉ thiếu một field trong config file đã crash 8.5 triệu máy Windows, thiệt hại 10 tỷ USD, làm tê liệt hàng không, bệnh viện. AI coding tools còn làm tình hình tệ hơn – ví dụ Replit AI xóa sạch database production của SaaStr dù lệnh rõ ràng "KHÔNG thay đổi gì", rồi tạo fake data che đậy. Nghiên cứu cho thấy code AI có 322% lỗ hổng bảo mật hơn, junior dev dùng AI gây lỗi nhanh gấp 4 lần.

Vấn đề cốt lõi là **giới hạn vật lý**: phần mềm chồng chất abstraction (React → Electron → Chromium → Docker...) nhân overhead lên 2-6x, data center ngốn 200 TWh/năm (nhiều hơn nhiều quốc gia), sắp thiếu điện toàn cầu. Big Tech chi 364 tỷ USD mua hardware thay vì fix code. Hậu quả dài hạn: loại bỏ junior devs → không có senior tương lai, vì AI không học từ lỗi thực tế.

Giải pháp: Ưu tiên quality > velocity, đo resource usage, thưởng efficiency, dạy fundamentals (array bounds check, memory mgmt), giảm abstraction không cần thiết.

**Điểm chính:**

- Chất lượng suy thoái: memory leaks, system failures được normalize (VSCode 96GB, Crowdstrike $10B).
- AI nhân rộng incompetence: code buggy hơn, xóa DB production.
- Physics crisis: energy limits, $364B hardware không giải quyết gốc rễ.
- Pipeline crisis: no juniors → no seniors; lost generation prompters.
- Path forward: Ship working code, efficiency as KPI, fundamentals first.

## [Building an Agent That Leverages Throwaway Code](https://lucumr.pocoo.org/2025/10/17/code/)

Armin Ronacher (tác giả Flask) chia sẻ kinh nghiệm xây dựng **agent dùng throwaway code** (code dùng một lần vứt) để giải quyết task không liên quan code. Ý tưởng: AI giỏi viết code → để nó generate Python code chạy trong **sandbox Pyodide** (Python interpreter WebAssembly), thay vì tools MCP phức tạp.

**Pyodide** chạy Node/npm, micropip install PyPI libs (PDF, image...). Chạy web worker để timeout/interrupt. **Virtual file system** quan trọng: agent đọc/ghi file → intercept để fetch safe HTTP (no direct network), ví dụ folder expose backend API resources.

**Durable execution**: Chia loop thành steps, cache state (log chat, files) theo taskID:step → retry không mất tiến độ. Tools khác: `Describe` (inference files output), `Help` (RAG/docs). Ví dụ repo [mini-agent](https://github.com/mitsuhiko/mini-agent): lookup IP → vẽ image Pillow.

Cách này đơn giản hơn MCP, tận dụng ecosystem Python AI biết rõ. Cũng mention Anthropic Claude Skills, Cloudflare Code Mode.

**Điểm chính:**

- Pyodide: Python WASM sandbox + PyPI, web worker.
- Virtual FS: Intercept reads cho safe external access.
- Durable: Step cache state cho retry long tasks.
- Tools: Describe/Help bổ sung code interpreter.
- Simpler agentic: Throwaway code > fixed tools.

## [Measuring Engineering Productivity](https://justoffbyone.com/posts/measuring-engineering-productivity/)

Can Duruk chia sẻ hệ thống **đo lường productivity engineering** tại Felt (SaaS, 25 engineers, 15-25 deploys/ngày), không dùng metrics xấu (lines of code, commits) mà focus visibility với **minimal burden cho engineers** (manager làm hầu hết paperwork).

**Daily**: Async standups Slack (#standups): Yesterday/Today/Blockers (5-10p, link PR/issues). **Weekly**: Changelogs GitHub (count PRs/engineer, categorize Features/Bugs/DevEx); 1:1s (People/Product/Process, notes Notion track work patterns); All-Hands (team 7p prep, 2-3p present weekly work). **Real-time**: PR notifications Slack; Deploy verifs (✅ emoji sau check prod preview).

Nguyên tắc: Manager time >> Engineer time, explicit expectations (examples good/bad standups), start small, adapt context, open feedback (process retro). Không dùng numbers làm weapon mà tạo culture high cadence/ownership → outcomes tốt (ship fast, quality).

**Điểm chính:**

- Minimal overhead: Async standups, auto changelogs/deploys.
- Multi-signals: PR count/type, 1:1 notes, presentations.
- Visibility > control: Ambient awareness, explicit examples.
- Principles: Automate, feedback loops, context-aware.
- Outcome: High-velocity teams without gaming metrics.

## [Scripts I wrote that I use all the time](https://evanhahn.com/scripts-i-wrote-that-i-use-all-the-time/)

Evan Hahn chia sẻ **hàng tá shell scripts cá nhân** từ dotfiles (10+ năm), dùng hàng ngày để boost productivity. Tất cả open source trên Codeberg, ngắn gọn, giải quyết pain points thường gặp.

**Clipboard**: `copy/pasta` (pipe clipboard), `pastas` (watch changes), `cpwd` (copy pwd). **File**: `mkcd dir` (mkdir+cd), `tempe` (cd temp dir), `trash` (safe rm), `mksh script.sh` (create executable shell). **Internet**: `serveit` (local server), `getsong/getpod/getsubs` (yt-dlp wrappers), `url` (parse URL). **Text**: `line N` (print line), `scratch` (temp editor), `straightquote` (fix quotes), `nato` (phonetic alphabet). **Dates**: `hoy` (ISO date), `timer 10m` (notify). **Process**: `each` (xargs alt), `murder PID` (graceful kill), `bb cmd` (true background). **Others**: REPL launchers (ipy, ijs), `boop` (success sound), `theme 0/1` (dark/light mode).

Junior devs nên copy-paste vài cái như `mkcd`, `trash`, `timer` để tiết kiệm thời gian. Full list + source: [dotfiles](https://codeberg.org/EvanHahn/dotfiles).

**Điểm chính:**

- Clipboard/file helpers: copy/pasta, mkcd, trash, tempe.
- Internet/text utils: serveit, getsong, line, straightquote.
- Productivity boosters: timer, bb, murder, each.
- Customize dotfiles: Small scripts > aliases for daily tasks.
- Open source: Fork và adapt từ repo Evan.

## [SQL Anti-Patterns You Should Avoid](https://datamethods.substack.com/p/sql-anti-patterns-you-should-avoid)

Jordan Goodman liệt kê **SQL anti-patterns phổ biến** gây khó maintain, chậm performance, từ kinh nghiệm enterprise. Dành cho junior: tránh để code sạch, scalable.

1. **Excessive CASE WHEN**: Đừng hardcode hàng trăm status codes → Tạo dimension table/view từ source, reuse everywhere.
2. **Functions on Indexed Columns**: `WHERE UPPER(name)='ABC'` → full scan; dùng `name='abc'` hoặc indexed computed column.
3. **SELECT * in Views**: Break khi schema change, thừa columns → Explicit columns.
4. **Overuse DISTINCT**: Fix duplicates bằng DISTINCT thay vì sửa join → Mask vấn đề, inconsistent metrics; fix join condition.
5. **View Layer Stacking**: Views on views → Slow, hard debug; flatten/materialize heavy logic.
6. **Nested Subqueries Deep**: 5000+ lines → Unreadable; dùng CTEs cho clarity.

Best practices: Treat SQL như production code (review, version), design upfront. Recommend book "SQL Antipatterns" by Bill Karwin.

**Điểm chính:**

- CASE WHEN → Dimension tables.
- No funcs on indexes; explicit SELECT.
- Fix joins, not DISTINCT; CTEs > subqueries.
- Avoid view stacking; materialize.
- SQL như code: Shared, optimized.

## [Build Your Own Database](https://www.nan.fyi/database)

Bài viết interactive hướng dẫn **xây dựng key-value database từ zero** (như LevelDB/DynamoDB), giải thích internals LSM Tree (Log-Structured Merge-Tree). Dành junior: hiểu storage, index, compaction qua ví dụ đơn giản.

Bắt đầu file append-only (immutable updates: tombstone deletes), segments (max size → compact merge stale data). Index: hash table offset/key (in-memory → memory limit); sparse index sorted data (tradeoff memory/speed). Sorted String Tables (SST): memtable (sorted tree/skiplist) + WAL log crash-safe; flush → SST immutable.

Tìm kiếm: memtable → segments newest-first. Compaction giữ small. LSM ưu tiên write-fast (append), read ok với index; vs B-Tree (read-fast relational DBs như Postgres).

**Điểm chính:**

- Append-only files: Immutable updates/deletes (tombstones).
- Segments + compaction: Giữ file small, merge stale.
- Sparse indices + sorting: Fast lookup/range, memory efficient.
- Memtable + WAL + SSTables: Crash-safe, write-optimized.
- LSM Trees: Base cho KV stores scale (LevelDB, RocksDB, DynamoDB).

---

*Bài viết đã được review và cập nhật bởi Claude Code với Opus 4.7 (1M context).*
