---
title: "Newsletter #30"
date: 2025-05-17
tags: ["AI-Assisted", "Education", "LLMs", "Caching", "JavaScript", "Software Development"]
categories: ["Newsletter"]
draft: false
---

*Chào mừng bạn đến với Newsletter #30 - Tổng hợp tin tức công nghệ hôm nay.*

## [What I'd do as a College Freshman in 2025](https://muratbuffalo.blogspot.com/2025/04/what-id-do-as-college-freshman.html)

Bài viết của Murat Demirbas đưa ra những lời khuyên quý giá cho sinh viên đại học năm nhất trong thời đại AI phát triển mạnh mẽ. Tác giả chia sẻ quan điểm rõ ràng về việc học Khoa học Máy tính và phát triển kỹ năng mềm trong bối cảnh công nghệ hiện đại.

**Điểm chính:**
- Học Khoa học Máy tính vẫn là lựa chọn đúng đắn, bất chấp sự phát triển của AI
- Kỹ năng mềm như giao tiếp và quản lý ngày càng quan trọng
- Mỹ vẫn là điểm đến tốt nhất để phát triển sự nghiệp công nghệ
- Nên phát triển tư duy khởi nghiệp và khả năng thích ứng
- Xây dựng sự nghiệp là một cuộc chạy đường dài, cần kiên nhẫn và chiến lược

---

## [LLMs Are Weird Computers](https://www.phillipcarter.dev/posts/llms-computers)

Trong bài viết này, Phillip Carter đưa ra một góc nhìn thú vị về mô hình ngôn ngữ lớn (LLMs) như một dạng "máy tính kỳ lạ" đảo ngược so với máy tính truyền thống. Ông gọi những chiếc máy tính chúng ta quen thuộc là "truyền thống" và LLMs là những cỗ máy "kỳ lạ" hoặc "đảo ngược".

**Điểm chính:**
- LLMs hoạt động như một hình thức đảo ngược của máy tính truyền thống
- Trong khi máy tính truyền thống xử lý chính xác nhưng gặp khó khăn với sự mơ hồ, LLMs lại giỏi xử lý sự mơ hồ nhưng gặp khó khăn với độ chính xác
- Bài viết gợi ý cách nhìn nhận LLMs như một dạng máy tính mới với những đặc tính riêng biệt
- Cách tiếp cận này giúp hiểu rõ hơn về điểm mạnh và hạn chế của LLMs

---

## [Every Caching Strategy Explained in 5 Minutes](https://www.swequiz.com/blog/every-caching-strategy-explained-in-5-minutes)

Bài viết từ SWE Quiz cung cấp cái nhìn tổng quan ngắn gọn về các chiến lược caching phổ biến trong phát triển phần mềm. Đây là kiến thức cơ bản nhưng vô cùng quan trọng để tối ưu hiệu năng ứng dụng.

**Các chiến lược chính:**
- **Cache-Aside (Lazy Loading)**: Ứng dụng tự quản lý cache, kiểm tra cache trước khi truy vấn database. Phù hợp cho tải đọc nhiều và chấp nhận dữ liệu có thể lỗi thời trong thời gian ngắn.
- **Read-Through**: Ứng dụng chỉ tương tác với cache, cache tự động tải dữ liệu từ database khi cần. Giúp đơn giản hóa code ứng dụng.
- **Write-Through**: Ghi dữ liệu đồng thời vào cả cache và database. Đảm bảo tính nhất quán nhưng có thể làm chậm tốc độ ghi.
- **Write-Behind (Write-Back)**: Chỉ ghi vào cache và đồng bộ bất đồng bộ với database sau. Tăng tốc độ ghi nhưng có nguy cơ mất dữ liệu nếu cache gặp sự cố.
- **Write-Around**: Bỏ qua cache khi ghi, chỉ sử dụng cache cho đọc. Phù hợp cho dữ liệu ít khi được đọc sau khi ghi.

Việc lựa chọn chiến lược phụ thuộc vào yêu cầu cụ thể của ứng dụng về hiệu năng, tính nhất quán và khả năng chịu lỗi.

## [Những tính năng JavaScript mà mọi lập trình viên nên biết năm 2025](https://waspdev.com/articles/2025-04-06/features-that-every-js-developer-must-know-in-2025)

Bài viết từ WaspDev điểm qua những tính năng JavaScript hiện đại mà mọi lập trình viên nên nắm vững trong năm 2025, giúp code hiệu quả và hiệu suất cao hơn.

**Các tính năng nổi bật:**
- **Iterator Helpers**: Các phương thức mới như `drop()`, `take()`, `filter()` cho phép xử lý dữ liệu lớn hiệu quả mà không cần tạo mảng trung gian
- **Array at()**: Truy cập phần tử mảng với chỉ số âm, ví dụ `arr.at(-1)` để lấy phần tử cuối cùng
- **Promise.withResolvers()**: Cách đơn giản hơn để tạo Promise với `resolve` và `reject` bên ngoài
- **Xử lý chuỗi mạnh mẽ**: Sử dụng callback với `replace()` và `replaceAll()` cho thay thế phức tạp
- **Hoán đổi biến dễ dàng**: Cú pháp `[a, b] = [b, a]` thay vì dùng biến tạm
- **Sao chép đối tượng an toàn**: `structuredClone()` thay thế cho `JSON.parse(JSON.stringify())`
- **Tagged templates**: Xử lý template literals linh hoạt hơn
- **WeakMap/WeakSet**: Lưu trữ dữ liệu tạm thời, tự động giải phóng bộ nhớ
- **Các phép toán Set mới**: `union()`, `intersection()`, `difference()` cho thao tác tập hợp

Những tính năng này giúp code ngắn gọn, dễ đọc và hiệu suất cao hơn, đặc biệt khi làm việc với dữ liệu lớn.

## [Điều gì tạo nên trải nghiệm nhà phát triển tuyệt vời?](https://www.codesimplicity.com/post/what-makes-a-great-developer-experience/)

Bài viết của Max Kanat-Alexander, người có hơn 20 năm kinh nghiệm trong lĩnh vực trải nghiệm nhà phát triển (DX), chia sẻ những nguyên tắc cốt lõi để xây dựng trải nghiệm phát triển phần mềm hiệu quả.

**Các yếu tố chính của DX tốt:**
- **Thời gian chu kỳ (Cycle Time)**: Tối ưu thời gian từ khi lập trình viên bắt đầu thực hiện ý định đến khi hoàn thành
- **Tập trung (Flow)**: Khả năng duy trì sự tập trung vào công việc mà không bị gián đoạn
- **Tải nhận thức (Cognitive Load)**: Giảm thiểu kiến thức và quyết định cần thiết để hoàn thành công việc

**Thách thức chính trong cải thiện DX:**
1. Hiểu đúng vấn đề cần giải quyết
2. Quản lý thay đổi hiệu quả
3. Cung cấp công cụ có đòn bẩy cao
4. Biết cách nói "không" với các yêu cầu gây hại
5. Đặt áp lực lên đúng người gây ra vấn đề

Bài viết nhấn mạnh rằng phần khó khăn nhất của DX thường liên quan đến yếu tố con người chứ không phải kỹ thuật, và đưa ra cái nhìn tổng quan về cách các công ty công nghệ lớn như Google và LinkedIn tiếp cận vấn đề này.

## [Khi Cuộc Đời Cho Bạn Java](https://oblac.rs/when-life-gives-you-java/)

Bài viết từ Oblac.rs chia sẻ những thực hành phát triển Java hiện đại, được áp dụng khi bạn không thể thoát khỏi Java nhưng vẫn muốn viết mã chất lượng.

**Các nguyên tắc chính:**
- **Đóng gói thông minh**: Sử dụng package-private là mặc định, chỉ public khi cần thiết
- **Bất biến là bạn**: Sử dụng `final` cho 95% biến, hạn chế `null` tối đa
- **Ưu tiên composition thay vì inheritance**: Tránh kế thừa trong code riêng
- **Tư duy hàm**: Mô hình hóa lớp như các hàm đơn lẻ
- **Sử dụng sealed interface và record**: Để định nghĩa các kiểu dữ liệu đại số (ADT)
- **Không dùng ngoại lệ cho logic nghiệp vụ**: Chỉ dành ngoại lệ cho các lỗi runtime

Tác giả thừa nhận rằng cách tiếp cận này sẽ tạo ra nhiều lớp nhỏ hơn, nhưng đó là sự đánh đổi đáng giá để có được mã nguồn mô-đun hóa tốt hơn và ít bất ngờ hơn.

## [Chỉ Cần Đổ Vào PostgreSQL](https://simonsafar.com/2025/throw_it_into_postgres/)

Bài viết từ Simon Safar thảo luận về cách sử dụng PostgreSQL như một công cụ linh hoạt để lưu trữ và truy vấn dữ liệu không cấu trúc, thay vì chỉ dùng cho dữ liệu có cấu trúc chặt chẽ.

**Quan điểm chính:**
- **Lựa chọn giữa cấu trúc và linh hoạt**: Thay vì ép dữ liệu vào schema cứng nhắc hoặc lưu dạng file thô, hãy tận dụng khả năng JSONB của PostgreSQL
- **Tốc độ và tiện lợi**: Sử dụng lệnh `COPY` để import hàng trăm ngàn bản ghi chỉ trong vài chục giây
- **Không cần quyết định trước**: Có thể thêm index và tối ưu sau khi đã có dữ liệu

**Ví dụ thực tế:**
1. **IDE Java**: Xây dựng công cụ tìm kiếm và điều hướng code nhanh bằng cách lưu trữ thông tin từ class files
2. **Ký tự Trung Quốc**: Lưu trữ và truy vấn hiệu quả hàng chục ngàn ký tự với dữ liệu SVG và từ điển
3. **Dữ liệu cảm biến**: Lưu trữ và phân tích dữ liệu IoT từ MQTT server với JSONB

Bài viết khuyến khích các nhà phát triển xem xét PostgreSQL như một giải pháp "đổ dữ liệu vào trước, tổ chức sau" thay vì cố gắng thiết kế schema hoàn hảo ngay từ đầu.

---

*Bài viết đã được review và cập nhật bởi Claude Code với Opus 4.7 (1M context).*
