---
title: "Newsletter #61"
date: 2025-11-25
tags: ["AI-Assisted", "Technology", "Machine-Learning", "Software-Engineering", "Compilers", "Performance", "PostgreSQL"]
categories: ["Newsletter"]
---

*'Lặn' đã đâu, nay mới ngoi lên lại. Mời bạn thưởng thức Newsletter #61.*

## [Beyond Indexes: How Open Table Formats Optimize Query Performance](https://jack-vanlightly.com/blog/2025/10/8/beyond-indexes-how-open-table-formats-optimize-query-performance/)

Tác giả Jack Vanlightly, chuyên gia hiệu suất SQL Server, khám phá cách các open table formats (OTF) như Apache Iceberg tối ưu hóa query performance mà không cần secondary indexes truyền thống như trong RDBMS. Trong RDBMS (OLTP), clustered index (B-tree theo primary key) và non-clustered indexes giúp seek nhanh cho single row queries. Tuy nhiên, analytical workloads (OLAP) của OTF tập trung vào scan lớn dữ liệu columnar (Parquet/ORC), partitioning, sorting để giảm IO.

OTF sử dụng auxiliary metadata files: manifest lists (file groups với stats min/max, column stats), partition metadata, và sort orders thay vì B-trees. Những cấu trúc này cho phép query engine skip files không liên quan hiệu quả (predicate pushdown, partition pruning), giảm IO đáng kể cho scans lớn. Ví dụ, Iceberg manifest lists giúp engine chọn subset files phù hợp predicates mà không scan toàn bộ table metadata.

Khác biệt cốt lõi: RDBMS ưu tiên point lookups (O(log n)), OTF ưu tiên columnar scans với metadata filtering. Thêm secondary indexes vào OTF không hiệu quả vì workload khác: analytical queries đọc nhiều rows theo filters aggregate, không phải single row. Thay vào đó, OTF leverage data lake storage (S3) với cheap metadata reads.

**Điểm chính:**
- OTF dùng partitioning, sorting, columnar formats và auxiliary metadata (manifests, stats) để optimize scans, khác RDBMS indexes cho seeks.
- Giảm IO qua file skipping dựa stats min/max, partition pruning.
- Phù hợp analytical workloads lớn, không cần traditional secondary indexes.

## [What's The Deal With GitHub Spec Kit](https://den.dev/blog/github-spec-kit)

Den Delimarsky giới thiệu GitHub Spec Kit, công cụ thực nghiệm cho Phát triển Dựa trên Đặc tả (SDD) sử dụng LLM để làm phần mềm ổn định hơn. Thay vì lập trình theo cảm hứng ngẫu nhiên, đặc tả (specs) định nghĩa rõ "cái gì" và "tại sao" (không chi tiết kỹ thuật), giúp LLM sinh code nhất quán, dễ lặp lại/ so sánh các triển khai (ví dụ Swift so Objective-C).

Spec Kit dùng lệnh slash: /constitution (nguyên tắc cốt lõi), /specify (tạo đặc tả), /clarify (hỏi rõ ràng), /plan (kế hoạch kỹ thuật), /tasks (phân tích nhiệm vụ), /analyze (phân tích trước triển khai). Đặc tả như tài liệu thực thi, code là "đặc tả đã biên dịch" – dễ xem xét/sửa, tái tạo nhanh nếu yêu cầu rõ ràng.

SDD giải quyết sự biến thiên của LLM: prompt khác cho kết quả khác, đặc tả rõ ràng như hướng dẫn kỹ sư junior. Tách đặc tả khỏi tech stack mở khóa kiểm tra nhiều triển khai. Thí nghiệm mã nguồn mở tại github/spec-kit, lấy cảm hứng từ nghiên cứu John Lam.

**Điểm chính:**
- Đặc tả tập trung "cái gì/tại sao", cho phép code LLM ổn định, so sánh nhiều triển khai.
- Lệnh slash hướng dẫn SDD: nguyên tắc → đặc tả → kế hoạch → nhiệm vụ → triển khai.
- Lập trình cảm hứng → SDD cho kết quả tốt hơn, năng suất cao với LLM.


## [Just Talk To It - the no-bs Way of Agentic Engineering](https://steipete.me/posts/just-talk-to-it)

Peter Steinberger chia sẻ kinh nghiệm sử dụng agentic engineering trong dự án mới, nơi AI agent viết gần 100% code. Thay vì các setup phức tạp, ông khuyên "just talk to it" – trò chuyện trực tiếp với AI một cách tự nhiên để giải quyết vấn đề. Bài viết lấy cảm hứng từ buổi Claude Code Anonymous ở London và năm AI đầy ấn tượng.

Agentic engineering đang phát triển mạnh, nhưng nhiều người mắc lỗi tạo ra các "charades" phức tạp thay vì tập trung làm việc hiệu quả. Steinberger nhấn mạnh: AI như Claude Code đã đủ tốt để xử lý hầu hết coding tasks qua conversation đơn giản, không cần framework rườm rà. Ông đang im lặng trên blog vì bận rộn với dự án, chứng tỏ productivity cao từ approach này.

Cách tiếp cận "no-bs" giúp developer junior nhanh chóng áp dụng AI: mô tả vấn đề rõ ràng, iterate qua chat, và để AI generate code. Điều này phù hợp xu hướng AI year, nơi agents như Claude thay đổi cách engineer làm việc.

**Điểm chính:**
- Sử dụng agentic engineering bằng cách trò chuyện trực tiếp với AI, không cần setup phức tạp.
- AI viết 100% code cho dự án thực tế, tăng productivity đáng kể.
- Tránh overengineering; focus vào getting sh*t done qua natural conversation.

## [JIT: so you want to be faster than an interpreter on modern CPUs](https://www.pinaraf.info/2025/10/jit-so-you-want-to-be-faster-than-an-interpreter-on-modern-cpus)

Pinaraf giải thích tại sao JIT compiler khó vượt interpreter trên CPU hiện đại (Zen 2+), nhờ OoO execution, superscalar và branch prediction. Ví dụ pseudo-code cho thấy CPU reorder instructions, speculate branches để tránh idle. Interpreter truyền thống dùng switch gây branch misprediction; optimized dùng computed gotos (như Python +15-20% speed, PostgreSQL) để linearize code, dễ predict hơn.

PostgreSQL query "SELECT a FROM table WHERE a=42" sinh opcodes: SCAN_FETCHSOME, SCAN_VAR, FUNCEXPR_STRICT_2 (null checks + int4eq), QUAL, DONE_RETURN. Unrolled C code lộ bottleneck: pointless null check constant (branch predictable nhưng tốn ALU). Benchmark: bỏ strict check 1 arg giảm perf counter, nhưng CPU optimize tốt.

Kế hoạch optimize: pre-check constants, inline functions, reduce branches. JIT stitch opcodes thành function để loại dispatch loops. Trên ARM64 port, cần cân bằng interpreter/JIT cho real beat.

**Điểm chính:**
- Modern CPU OoO/superscalar làm interpreter nhanh; cần computed gotos tránh switch branches.
- PostgreSQL interpreter: null checks constants lãng phí, nhưng predictable nên ít hại.
- JIT thắng bằng inline/precompute constants, loại dispatch cho linear code.

*Bài viết này mình dùng CCR với model `x-ai/grok-4.1-fast:free`. Có vẻ chưa tốt lắm, nhiều phần còn tiếng Anh thô. Mình sẽ cố gắng cải thiện hơn*

---

*Bài viết đã được review và cập nhật bởi Claude Code với Opus 4.7 (1M context).*
