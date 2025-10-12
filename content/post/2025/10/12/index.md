---
title: "Newsletter #60"
date: 2025-10-12
tags: ["AI-Assisted", "Technology", "Go", "Diff Algorithm", "Algorithms", "Performance"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #60.*

## [Diff Algorithms](https://flo.znkr.io/diff)

Thư viện diff mới được phát triển bằng Go mà tác giả giới thiệu trong bài viết hỗ trợ xử lý chuỗi tùy ý và định dạng đầu ra kiểu unified. Thư viện này thực hiện thuật toán Myers với tiền xử lý, các giải thuật heuristic và hậu xử lý nhằm cân bằng giữa hiệu suất và tính dễ đọc. Các tính năng chính bao gồm hỗ trợ các loại dữ liệu có thể so sánh và không thể so sánh, kết quả có cấu trúc và hành vi có thể tùy chỉnh thông qua các tùy chọn hàm số.

Tác giả nhấn mạnh rằng "các cách cài đặt khác nhau cho cùng một thuật toán có thể tạo ra kết quả rất khác biệt" và tính dễ đọc của kết quả diff phụ thuộc rất nhiều vào các bước hậu xử lý như heuristics thụt lề của Michael Haggerty.

**Điểm chính:**
- Thư viện diff mới cho phép xử lý chuỗi tùy ý với đầu ra định dạng unified
- Sử dụng thuật toán Myers với các bước tối ưu hóa để cân bằng hiệu suất và khả năng đọc
- Hỗ trợ cả kiểu dữ liệu có thể và không thể so sánh, cho phép tùy chỉnh thông qua các tùy chọn hàm số
- Tính dễ đọc của diff phụ thuộc lớn vào các kỹ thuật hậu xử lý như các thuật toán heuristic


## Bonus: Vài ảnh thú vị đến từ [ByteByteGo](https://bytebytego.com/)
*Nay mình đã gặp phải một số vấn đề đau đầu vì đã lưu quá nhiều ảnh sưu tầm trong bài viết. Cụ thể là mình mất hơn 17p để build site này khi dùng một máy tính khác:*
```
...
                   | VI
-------------------+------
  Pages            | 587
  Paginator pages  | 130
  Non-page files   | 195
  Static files     |   2
  Processed images | 361
  Aliases          | 236
  Cleaned          |   0

Built in 1043990 ms
...
```
*Nên mình quyết định đổi sang sử dụng url gốc thay vì thêm hình vào repo. Và sẽ cố gắng update lại các ảnh trong các post trước đây luôn (vào một ngày nào đó đẹp trời và mình siêng năng :3*

![TCP vs UDP](https://substackcdn.com/image/fetch/$s_!KwvJ!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8ac50da4-feb8-4781-8bb2-e74244aa889f_2250x2814.png)
