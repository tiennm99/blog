---
title: "Newsletter #75"
date: 2025-12-28
tags: ["AI-Assisted"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #75.*

## [Front-End vs. Back-End vs. System Design – What's the Difference in Interviews?](https://designgurus.substack.com/p/front-end-vs-back-end-vs-system-design)

Ba loại hình phỏng vấn kỹ thuật này test những skill sets hoàn toàn khác nhau và đòi hỏi chiến lược chuẩn bị riêng. Front-end interviews tập trung vào UI rendering, styling quirks và JavaScript behavior trong browser - ít emphasise vào complex algorithms hơn, mà nhiều vào domain knowledge như responsive design, CSS specificity, browser rendering pipeline. Back-end interviews thì traditional hơn với data structures, algorithms (LeetCode-style), APIs, databases - double down vào algorithmic thinking và efficiency. System design interviews thì zoom out, test khả năng architect scalable, real-world systems from scratch.

Nếu so sánh với việc xây nhà: front-end như interior design (rooms look & feel), back-end như structure foundation (house stand & function), system design như architect của cả neighborhood (planning houses, roads, utilities cho best community design).

**Điểm chính:**
- Front-end: UI/UX focus, less algorithms, more domain knowledge
- Back-end: DSA, APIs, databases, traditional coding challenges
- System design: big picture architecture, scalability, reliability
- Mỗi loại cần prep strategy khác nhau

## [Why Starting with Microservices Can Be Your Biggest Architectural Mistake](https://designgurus.substack.com/p/why-starting-with-microservices-can)

Microservices thường được coi là "best practice" nhưng starting với microservices cho early-stage projects là một sai lầm đau đớn. Bài học cốt lõi: "Monolith First". Monolith có siêu năng lực là Simplicity - tất cả code ở một nơi, debug dễ, deploy một file, function calls instantaneous. Microservices introduce 3 nightmares: (1) Network reliability - retries, timeouts, distributed systems problems thay vì simple function calls. (2) Data complexity - không thể join tables across different databases, phải manual join trong code. (3) Operational overhead - 10 services = 10 build pipelines, 10 servers, 10 log places.

Refactoring monolith dễ (move files), refactoring microservices khó (change API contracts, migrate databases, coordinate deployments). Solution: Modular Monolith - organize code beautifully với modules như `/src/users`, `/src/orders` nhưng keep trong same runtime. Gives mental clarity của microservices mà không có operational headache. Chuyển sang microservices khi: team quá lớn (100+ devs), different scaling needs, technology diversity requirements. Đừng optimize prematurely - wait cho pain trở thành real problem.

**Điểm chính:**
- Monolith First: simplicity là superpower
- Microservices: network, data, operational overhead
- Refactoring monolith dễ, microservices khó
- Modular Monolith: best của cả hai worlds
- Chuyển microservices khi team lớn/scale khác biệt/tech diversity
- Don't optimize premature scaling problems

## [The Linux kernel is just a program](https://serversfor.dev/linux-inside-out/the-linux-kernel-is-just-a-program/)

Bài viết này giúp demystify Linux kernel - vốn thường được xem như một "black box" bí ẩn - bằng cách thực hành các experiments thực tế. Kernel Linux thực ra chỉ là một binary file vài MB nằm trong thư mục `/boot`, hoàn toàn có thể build và chạy như một chương trình bình thường. Tác giả giải thích kernel là gì: một runtime cho máy tính, cung cấp unified interface để tương tác với hardware (CPU, memory, devices), quản lý tài nguyên, cung cấp APIs, user management, permissions, isolation.

Bài viết hướng dẫn experiment chạy kernel với QEMU, tạo init program bằng Golang, build initramfs filesystem đơn giản, và boot một Linux distribution "mini" chỉ với 2 files. Qua đó, ta học được các concepts quan trọng: Linux distro thực ra chỉ là kernel + programs + configs; process là program đang chạy; PID là process ID; init process (PID 1) là process đầu tiên được kernel start; và sự khác biệt giữa kernel space (trước khi init chạy) và user space (sau khi init chạy). Cách tiếp cận hands-on này giúp xây dựng mental model về cách Linux hoạt động thay vì chỉ học theory.

**Điểm chính:**
- Linux kernel là một binary file, không phải black box
- Kernel là runtime cho máy tính, unified interface với hardware
- Experiment với QEMU + init program để hiểu boot process
- Linux distro = kernel + programs + configs
- Concepts: process, PID, init process, kernel space vs user space

## [Why Your Load Balancer is the Bottleneck (and How to Fix It)](https://designgurus.substack.com/p/dont-let-your-load-balancer-crash)

Có một sự irony trong hệ thống phân tán: bạn thêm load balancer để xử lý traffic scale, nhưng chính nó lại trở thành bottleneck. Application servers chạy ngon, database rảnh rỗi, nhưng load balancer lại quá tải - đây là vấn đề phân biệt junior developers và senior architects. Bài viết này giải thích lý do load balancer trở thành nút thắt và giới thiệu 5 chiến lược scaling mà các tech giants sử dụng.

Các chiến lược bao gồm: DNS Round Robin để phân phối traffic ở tầng DNS, Layer 4 vs Layer 7 routing để giảm xử lý, và Direct Server Return (DSR) cho phép server responses gửi trực tiếp đến clients mà không cần qua load balancer. Mỗi phương pháp có trade-offs riêng - DNS round robin đơn giản nhưng slow propagation, Layer 4 nhanh hơn Layer 7 nhưng ít tính năng, DSR tối ưu bandwidth nhưng yêu cầu network configuration phức tạp. Hiểu và áp dụng đúng strategies này giúp load balancer scale ngang hàng với application servers thay vì là điểm nghẽn duy nhất.

**Điểm chính:**
- Load balancer có thể trở thành bottleneck thay vì giải pháp
- 5 strategies: DNS Round Robin, Layer 4/7 routing, DSR
- Junior vs senior: biết thêm load balancer vs biết scale khi nó là problem
- Trade-offs giữa complexity và performance
- Tech giants solutions cho load balancer scaling

## [The High Availability Blueprint: Designing Systems That Never Sleep](https://designgurus.substack.com/p/the-high-availability-blueprint-designing)

High Availability (HA) là kỷ thuật xây dựng hệ thống "không bao giờ ngủ" - dù hardware có chắc chắn sẽ thất bại. Bài viết này giới thiệu các fundamental techniques mà engineers sử dụng để giữ cho hệ thống luôn hoạt động. Core philosophy của HA: "Assume everything will break, and plan for it." Kẻ thù lớn nhất là Single Points of Failure (SPOF) - bất kỳ component nào nếu fails thì toàn bộ hệ thống停止.

Các kỹ thuật cốt lõi bao gồm: Redundancy (nhân bản critical components - two is one, one is none), Load Balancers với Health Checks (tự động remove broken servers khỏi rotation), Database Replication (Leader-Follower architecture để backup data real-time), Failover patterns (Active-Passive đơn giản nhưng lãng phí, Active-Active tối ưu nhưng phức tạp), và Rate Limiting để prevent cascading failures khi traffic spike. Cho Five Nines (99.999% uptime = chỉ 5 phút downtime/năm), cần Geographic Distribution - deploy servers across multiple regions để survive local disasters. Key takeaway: "Two is one, and one is none" - luôn luôn có backup.

**Điểm chính:**
- HA: mask failures thay vì prevent, user never knows
- "The Nines": 99% → 99.999%, mỗi nine thêm exponentially expensive
- SPOF là enemy, redundancy là solution
- Load balancer health checks tự động detect & route around failures
- Database replication: Leader-Follower để protect data
- Failover: Active-Passive (simple) vs Active-Active (efficient)
- Rate limiting prevent cascading failures
- Geographic distribution cho five nines availability

## Bonus

### Images

![Common Network Protocols Every Engineer Should Know](https://substackcdn.com/image/fetch/$s_!ETm5!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F2112a03d-cc48-4db5-9740-94adc1a7efbf_2360x2920.png)
![8 Popular Network Protocols](https://substackcdn.com/image/fetch/$s_!5bFA!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F722913d5-a10f-44c2-98ed-edc27a92a137_1444x1882.jpeg)
![9 best practices for developing microservices](https://substackcdn.com/image/fetch/$s_!pen8!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F22fdf2d2-5ce5-4c2b-90f9-3bcfcecb5fc1_1370x1536.jpeg)
