---
title: "Git LFS: Trường hợp sử dụng, hạn chế, cách gỡ bỏ và các giải pháp thay thế"
date: 2025-02-25
tags: [ "Git", "Git LFS" ]
---

Ngoài source code, đôi khi chúng ta cũng sẽ lưu trữ các assets như hình ảnh, âm thanh, video, file data, output lớn,... trong repository của mình. Các file này có thể rất nặng, và việc lưu trữ chúng trong Git repository sẽ làm tăng kích thước của repository, làm chậm quá trình clone, push, pull, fetch,... Để giải quyết vấn đề này, Git Large File Storage (Git LFS) ra đời. Trong bài viết này, mình sẽ giới thiệu về Git LFS, trường hợp sử dụng, hạn chế, cách gỡ bỏ và các giải pháp thay thế.

## 1. Git LFS là gì?

Git LFS là một extension của Git, giúp quản lý các file lớn (large files) trong repository. Thay vì lưu trữ toàn bộ nội dung của file trong repository, Git LFS sẽ lưu trữ file lớn trong một remote server (thường là server riêng của Git LFS) và chỉ lưu trữ metadata của file trong repository. Khi cần sử dụng file, Git LFS sẽ tải file từ remote server về máy local.

## 2. Trường hợp sử dụng Git LFS

Git LFS thích hợp cho các trường hợp sau:

1. **Quản lý file media và dữ liệu lớn:** Khi dự án cần lưu trữ các file hình ảnh, âm thanh, video, dataset hay file phân tích có kích thước lớn, Git LFS giúp quản lý chúng hiệu quả mà không làm tăng đáng kể kích thước repository.

2. **Lưu trữ file nhị phân và build artifacts:** Các file nhị phân, thư viện, file thực thi hoặc build output có thể được lưu trữ trong Git LFS để giảm tải cho repository chính.

3. **Dự án với file lớn ít thay đổi:** Đối với các file lớn nhưng ít khi được chỉnh sửa, Git LFS là giải pháp lý tưởng để duy trì khả năng truy cập đồng thời giảm tải cho hoạt động Git thông thường.

Lúc trước khi làm website cho [Ngăm](https://ngamtheprojec.github.io), mình đã sử dụng Git LFS để lưu trữ các video của nhóm. Do GitHub giới hạn kích thước file là 100MB, nên muốn lưu trữ video có kích thước lớn, mình đã sử dụng Git LFS. Đây là một sai lầm của mình.

## 3. Hạn chế của Git LFS

Mặc dù Git LFS giúp giảm tải cho repository, nhưng nó cũng có một số hạn chế:

1. **Giới hạn bandwidth và storage trên GitHub:** GitHub Free chỉ cung cấp 1GB storage và 1GB bandwidth/tháng cho Git LFS. Vượt quá giới hạn này sẽ phát sinh chi phí bổ sung.

2. **Vấn đề với GitHub Pages:** Khi triển khai GitHub Pages từ repository sử dụng LFS, các file LFS không được xử lý đúng cách, dẫn đến các liên kết bị hỏng và nội dung không hiển thị.

3. **Quá trình gỡ bỏ phức tạp:** Sau khi đã sử dụng Git LFS, việc loại bỏ nó khỏi repository là một quá trình khó khăn và tiềm ẩn nhiều rủi ro.

Vì bị hạn chế băng thông, nên mình nhớ rằng mình chỉ clone repository vài lần là đã hết băng thông rồi. Điều này khiến mình phải tìm cách gỡ bỏ Git LFS khỏi repository.

## 4. Cách gỡ bỏ Git LFS

Để gỡ bỏ Git LFS khỏi repository, bạn cần thực hiện các bước sau:

```shell
git lfs uninstall

git rm --cached "*.mp4"  # Thay thế bằng các tập tin bạn đã theo dõi với LFS

# Chỉnh sửa tập tin .gitattributes để loại bỏ các mục có liên quan đến LFS

git add .gitattributes
git commit -m "remove: Git LFS"

git push
```

**Lưu ý:** Quá trình này có thể phức tạp hơn nếu kho lưu trữ của bạn đã có lịch sử với Git LFS. Trong trường hợp đó, bạn có thể cần phải tạo một kho lưu trữ mới và chuyển lịch sử không LFS của bạn sang đó.

Ngoài ra có trường hợp bạn sẽ phải tạo request với GitHub support để xoá các file LFS đã lưu trữ trên Git LFS của repository.

## 5. Giải pháp thay thế

Thay vì sử dụng Git hoặc Git LFS cho các tập tin lớn, thì lời khuyên của mình là nên tách source code và các file lớn với nhau. VD: up video lên YouTube, up hình ảnh lên Imgur,... và chia sẻ link trong repository.

Khi làm website cho Ngăm, mình đã chạy tool optimize file size của các video xuống dưới ngưỡng 100MB để có thể lưu trữ trên GitHub. Điều này giúp mình không phải sử dụng Git LFS và không phải lo lắng về vấn đề băng thông.
