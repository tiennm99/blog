---
title: "Newsletter #84"
date: 2026-02-26
tags: ["AI-Assisted", "Newsletter", "AI Coding", "Performance", "Go", "Clean Architecture", "Software Engineering"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #84.*

## [Automatic programming](https://antirez.com/news/159)

Antirez - tác giả của Redis - chia sẻ góc nhìn thú vị về "lập trình tự động" (automatic programming), thuật ngữ ông dùng để mô tả quá trình viết phần mềm có sự hỗ trợ của AI. Ông phân biệt rõ giữa "vibe coding" (mô tả chung chung và để AI tự quyết định) với lập trình tự động thực sự, nơi người lập trình vẫn đóng vai trò chủ đạo trong việc định hướng, thiết kế và kiểm soát chất lượng.

Antirez nhấn mạnh rằng khi sử dụng AI để viết phần mềm một cách có ý thức, mã nguồn tạo ra vẫn là của bạn và bạn có quyền tự hào về nó. Ông lấy ví dụ về Redis - không phải vì kỹ thuật phức tạp mà vì tầm nhìn và ý tưởng phía sau. Ngày nay, lập trình có thể tự động hóa, nhưng tầm nhìn thì chưa (và có thể chưa bao giờ).

**Điểm chính:**
- "Vibe coding" khác với lập trình tự động có chủ đích
- AI là công cụ hỗ trợ, nhưng người lập trình vẫn nắm tầm nhìn và kiểm soát
- Lập trình hiện nay đã tự động hóa được, nhưng tầm nhìn và ý tưởng vẫn là yếu tố then chốt

## [Software Performance Engineering: The Ideas I Keep Coming Back To](https://ricomariani.medium.com/software-performance-engineering-the-ideas-i-keep-coming-back-to-6f421b6a9505)

Rico Mariani chia sẻ 8 nguyên lý cốt lõi về hiệu năng phần mềm mà ông thường xuyên quay lại trong suốt sự nghiệp. Bài viết nhấn mạnh rằng hiệu năng không phải về các thủ thuật hay mã nguồn thông minh, mà về tư duy hệ thống. Tác giả giải thích cách các vấn đề hiệu năng thực sự thường xuất phát từ hiệu ứng kiến trúc: quá nhiều cấp phát bộ nhớ, tính địa phương cache kém, đồng bộ hóa ngầm, hoặc tăng trưởng không kiểm soát - không phải từ một hàm chậm đơn lẻ. Ông cũng bàn về việc các abstraction giấu chi phí, tầm quan trọng của cost model so với API, và tại sao bộ nhớ mới là nút thắt thực sự. Bài viết kết luận bằng cách cảnh báo về sự suy giảm hiệu năng dần dần qua thời gian thông qua tích tụ các thay đổi nhỏ.

**Điểm chính:**
- Hiệu năng là vấn đề hệ thống, không phải vấn đề dòng code
- Abstraction không miễn phí - chúng chỉ giấu chi phí đi
- Cost model quan trọng hơn API, bộ nhớ là nút thắt thực sự
- Hiệu năng suy giảm dần dần qua hàng nghìn thay đổi nhỏ

## [Go's synctest is amazing](https://oblique.security/blog/go-synctest/)

Bài viết giới thiệu gói `testing/synctest` mới trong Go 1.25 - một công cụ mạnh mẽ giúp kiểm thử các tác vụ bất đồng bộ và background loops một cách xác định. Tính năng nổi bật là khả năng "thao túng thời gian" - các test chạy trong một môi trường với đồng hồ ảo, giúp `time.Sleep` thực thi gần như tức thì. Nhưng giá trị thực sự của synctest nằm ở khả năng suy luận xác định về thứ tự sự kiện trong test. Tác giả minh họa cách synctest hoạt động bằng cách theo dõi khi nào tất cả goroutines bị "block" trên các thao tác như channel, wait group, hoặc time methods, từ đó advance thời gian chính xác để unblock chúng. Điều này không chỉ giúp test chạy nhanh hơn mà còn cho phép sử dụng thời gian để đồng bộ hóa một cách đáng tin cậy.

**Điểm chính:**
- synctest cho phép test code có time.Sleep và background loops nhanh và đáng tin cậy
- Time được advance khi tất cả goroutines bị block, cho phép kiểm soát xác định thứ tự sự kiện
- Giải quyết vấn đề kiểm thử các vòng lặp background phức tạp như leader election

## [Why Clean Architecture Confuses Everyone (And How I Learned to Stop Worrying)](https://dev.to/rpereira15/why-clean-architecture-confuses-everyone-and-how-i-learned-to-stop-worrying-1i5k)

Bài viết giải thích tại sao Clean Architecture khiến nhiều người nhầm lẫn và cách tiếp cận thực tế hơn. Tác giả chỉ ra rằng vấn đề không nằm ở cấu trúc thư mục mà ở việc business logic bị phụ thuộc vào framework. Spring Boot và các framework khác khiến việc vi phạm nguyên tắc trở nên quá dễ dàng thông qua các annotation. Bài viết đề xuất tổ chức theo feature thay vì theo layer, và nhấn mạnh rằng business logic nên "nhàm chán" - không quan tâm đến cách lưu trữ dữ liệu hay framework nào được sử dụng. Tác giả chia sẻ bài học thực tế: đừng tạo interface chỉ vì "clean architecture cần ports và adapters", hãy tạo khi thực sự cần. Kiểm tra kiến trúc tốt qua khả năng thay đổi: bạn có thể switch database hoặc framework mà không chạm vào business logic không?

**Điểm chính:**
- Clean architecture không phải về folder, mà về tách biệt business logic khỏi framework
- Tổ chức theo feature thay vì layer để tư duy về business capabilities
- Business logic nên không phụ thuộc database, framework hay cách request đến
- Kiểm tra kiến trúc qua khả năng thay đổi dễ dàng khi yêu cầu thay đổi

## [The third golden age of software engineering – thanks to AI](https://newsletter.pragmaticengineer.com/p/the-third-golden-age-of-software)

Grady Booch - người đồng sáng tạo UML và Chief Scientist cho Software Engineering tại IBM - chia sẻ góc nhìn về ba "thời kỳ hoàng kim" của kỹ thuật phần mềm. Thời kỳ đầu tiên về thuật toán (1940s-1970s), thời kỳ thứ hai về abstraction hướng đối tượng (1970s-2000s), và thời kỳ thứ ba hiện nay về hệ thống - bắt đầu với sự trỗi dậy của abstraction từ components sang toàn bộ libraries, platforms, và packages. Ông khẳng định các công cụ AI coding chỉ là sự gia tăng mức abstraction khác, không phải là sự kết thúc của kỹ thuật phần mềm. AI hiện tại chủ yếu được huấn luyện trên các pattern đã biết, đặc biệt tốt với các hệ thống CRUD web, nhưng biên giới của computing rộng lớn hơn nhiều. Grady nhấn mạnh rằng foundational knowledge trở nên quan trọng hơn khi lĩnh vực này phát triển với tốc độ khó hiểu.

**Điểm chính:**
- Chúng ta đang ở giữa thời kỳ hoàng kim thứ ba của kỹ thuật phần mềm - về hệ thống, không phải AI
- AI coding tools là sự gia tăng abstraction, giống như compilers trước đó, không thay thế kỹ sư
- Deep foundational knowledge trở nên quan trọng hơn khi ngành phát triển nhanh
- Cơ hội để bay lên, không phải sợ hãi vực thẳm

## [AI coding workflow](https://newsletter.systemdesign.one/p/ai-coding-workflow)

Bài viết chia sẻ một quy trình thực tế để sử dụng AI coding hiệu quả, không phải như một "máy bán hàng tự động" mà paste vấn đề và nhận giải pháp. Tác giả nhấn mạnh rằng AI hoạt động tốt nhất trong một vòng lặp lặp lại, không phải yêu cầu một lần. Workflow cốt lõi gồm 6 bước: Context (chia sẻ project background và constraints), Plan (hỏi chiến lược trước khi viết code), Code (generate hoặc edit code từng bước), Review (kiểm tra kỹ output), Test (chạy tests và generate tests mới), và Iterate (debug và refine). Bài viết cũng chia sẻ các pattern prompt hữu ích và cách tránh các lỗi phổ biến như context quá dài hoặc để AI hallucinate APIs không tồn tại.

**Điểm chính:**
- AI hoạt động tốt nhất trong vòng lặp lặp lại, không phải yêu cầu một lần
- Context và Plan trước khi Code là quan trọng nhất để tránh AI đoán
- Tách biệt roles (Planner, Implementer, Tester, Explainer) giúp output tốt hơn
- Tests và reviews là safety net bắt bugs và halllucinations của AI

### Bonus

**Images:**
![Git pull vs. git fetch](https://substack-post-media.s3.amazonaws.com/public/images/625a6789-c32d-4a27-a5f5-c174fb920637_2360x2960.png)
![Top Authentication Techniques](https://substackcdn.com/image/fetch/$s_!-Lov!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fcf928dd3-de16-4605-a702-762df269c9f2_2250x2862.png)

---

*Bài viết đã được review và cập nhật bởi Claude Code với Opus 4.7 (1M context).*
