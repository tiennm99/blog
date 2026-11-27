---
title: "Newsletter #88"
date: 2026-03-13
tags: ["AI-Assisted", "Newsletter", "Debugging", "Web Performance", "Frontend", "Code Quality", "Browser Rendering"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #88.*

## [A Broken Heart](https://allenpike.com/2026/a-broken-heart/)

Allen Pike kể lại một lần gỡ lỗi đáng nhớ: bảng điều khiển của ứng dụng web đang phát triển bỗng tải mất mười giây thay vì một giây như trước. Anh nghi ngay cho React và nhờ Claude rà soát, nhưng sửa các lần render thừa hay thiếu memo gần như không cải thiện gì. Khi điều tra kỹ hơn, anh thấy lỗi chỉ xảy ra trên Safari, và công cụ đo hiệu năng cho thấy trình duyệt dành tới 94% CPU cho bước Layout, mỗi lượt mất hơn 1600ms, tức chậm khoảng 100 lần so với bình thường. Anh dùng kỹ thuật tìm kiếm nhị phân cùng coding agent, lần lượt gỡ bớt từng phần giao diện để thu hẹp phạm vi. Chỉ sau khoảng mười phút, thủ phạm lộ diện là một emoji trái tim ❤️ trong nút "Send Feedback". Bỏ emoji đi thì Layout chỉ còn 2ms.

Nhờ coding agent, anh nhanh chóng dựng được một ví dụ tái hiện tối giản để gửi báo lỗi, và nguyên nhân thật sự là font Noto Color Emoji của Google, vốn được thêm vào để emoji hiển thị đồng nhất trên Linux. Font này dựa trên chuẩn COLRv1 và trả về SVG cho các trình duyệt không hỗ trợ, trong đó có Safari; đội WebKit đã xác nhận phần chậm nằm trong CoreSVG của Apple. Lỗi còn phụ thuộc từng ký tự: ❤️ và 🤯 mất 1600ms, trong khi 🧺 và 🫠 chỉ mất 0,2ms. Cách khắc phục tạm thời là đặt "Apple Color Emoji" trước Noto Color Emoji trong khai báo font-family. Điều trớ trêu là chính Claude đã gợi ý dùng font này từ đầu, khiến tác giả ví coding agent như một chiếc cưa máy: cực kỳ hữu ích nhưng cũng nguy hiểm tương xứng.

## [Wrapping Code Comments](https://matklad.github.io/2026/02/21/wrapping-code-comments.html)

Trong bài viết ngắn này, matklad đưa ra hai nhận xét về cách ngắt dòng: mã nguồn và chú thích nên được ngắt ở những độ rộng khác nhau, và độ rộng của chú thích nên tính tương đối từ vị trí bắt đầu chú thích. Giới hạn khoảng 100 cột cho mã nguồn là hợp lý vì đó là độ rộng vẫn đặt vừa hai cửa sổ soạn thảo cạnh nhau, trong khi văn xuôi dễ đọc nhất ở khoảng 60–70 cột. Mâu thuẫn này được giải thích bởi việc thụt lề đã chiếm bớt không gian và mã nguồn vốn thưa chữ hơn văn bản. Vì vậy, tác giả muốn dòng mã ngắt ở 100 cột, còn phần nội dung chú thích ngắt ở khoảng 70 cột; chú thích lồng sâu trong khối lệnh sẽ bị đẩy sang phải nhưng vẫn giữ cùng độ rộng nội dung, miễn tổng chiều dài dòng không vượt quá 100.

Ý tưởng nghe hiển nhiên nhưng các công cụ phổ biến lại chưa hỗ trợ tốt: tiện ích Rewrap cho VS Code cho phép đặt độ rộng riêng cho chú thích nhưng tính tuyệt đối, nên chú thích càng thụt sâu càng hẹp, còn lệnh `M-q` của Emacs cũng không ngắt dòng tương đối theo mặc định. Tác giả cũng giải thích vì sao không thể trông cậy vào việc trình soạn thảo tự ngắt dòng hiển thị: muốn ngắt đúng thì phải hiểu ý nghĩa văn bản, chẳng hạn một mục danh sách Markdown dài khi xuống dòng cần được thụt lề theo mục đó, điều chỉ làm được khi phân tích nội dung dưới dạng Markdown.

### Bonus

**Images:**
![RabbitMQ vs Kafka vs Pulsar](https://substackcdn.com/image/fetch/$s_!h2M_!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F1d6d88ea-4355-4f29-96fa-9770907beebb_2360x2960.png)
![REST vs GraphQL](https://substackcdn.com/image/fetch/$s_!8P-v!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F6039d506-e02f-4313-ab97-2c04f8c94d90_2360x2960.png)
![Eventual Consistency in Modern Databases](https://substackcdn.com/image/fetch/$s_!yela!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5ac3310f-e380-48c2-93ff-051f7606b533_2250x2624.png)
![Strong Consistency In Databases](https://substackcdn.com/image/fetch/$s_!vB9v!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fbc02c74f-e91f-438a-8ad8-d5ba6831e7f0_2250x2624.png)
![PostgreSQL versus MySQL](https://substackcdn.com/image/fetch/$s_!h8d0!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fc5f67fe5-0efa-4fc6-98da-d176b60b1a92_2508x3000.jpeg)
![Network Protocols Explained](https://substackcdn.com/image/fetch/$s_!_roW!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fdbdb9cae-3bda-4a62-9077-3f9d1e13fede_2360x2960.jpeg)

**Videos:**
[Video: What Is Redis Really About? - ByteByteGo](https://www.youtube.com/watch?v=z_NbVtbgBJw)

---

*Bài viết đã được viết lại bởi Claude Code với Opus 5.5 vào ngày 27/09/2026.*
