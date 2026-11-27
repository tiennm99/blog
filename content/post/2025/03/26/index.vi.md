---
title: "Mirror repository từ GitLab sang GitHub"
date: 2025-03-26
tags: [ "GitLab", "GitHub" ]
categories: []
---

Chắc hẳn các bạn cũng biết khi tạo repository mới trên GitHub, GitHub sẽ cho phép [import repository](https://github.com/new/import) từ nguồn git khác

![](img/1.png)

Tuy nhiên trong một số tình hướng chúng ta vẫn muốn update code trên GitLab, nhưng vẫn muốn update GitHub repository theo code mới nhất, vậy thì phải làm sao? Hôm nay mình sẽ hướng dẫn các bạn làm điều đó.

Để thiết lập mirror từ GitLab sang GitHub, chúng ta cần thực hiện các bước sau:

1. Đầu tiên, tạo một GitHub Personal Access Token:

- Truy cập `GitHub Settings` > `Developer settings` > `Personal access tokens` > `Fine-grained tokens`: https://github.com/settings/personal-access-tokens
- Click `Generate new token`
- Đặt tên cho token và chọn các quyền cần thiết:
  - `Expiration`: Nên đặt thời hạn nhất định.
  - `Repository access`: Phần này tuỳ ý, tốt nhất nên chọn `Only select repositories` (chỉ cho phép access đến một số repository thực sự cần thiết). Nếu đang setup cho nhiều repository cùng resource owner và trong tương lai không muốn chỉnh sửa phức tạp thì có thể cân nhắc chọn `All repositories`.
  - `Permissions`: Mục `Contents`, chọn `Access: Read and write` để có quyền đọc và ghi repository.
- Copy token được tạo ra (lưu ý: token chỉ hiển thị một lần)

![](img/2.png)
![](img/3.png)

1.1. Với Organization sẽ cần chuẩn bị trước một chút Setting nữa:

- Truy cập `Settings` của organization. VD: https://github.com/organizations/ngamtheproject/settings/personal-access-tokens
- Vào mục `Personal access tokens`, tab `Fine-grained tokens`
- Mục `Fine-grained personal access tokens` chọn `Allow access via fine-grained personal access tokens`
- Mục `Require approval of fine-grained personal access tokens` chọn gì cũng được.
  - Nếu chọn `Require administrator approval` thì sao khi tạo PAT cần approve.
  - Nếu chọn `Do not require administrator approval` thì sẽ không cần.
- Chọn xong thì nhấn `Save` ở mỗi mục.

![](img/5.png)

- Sau đó mới quay lại tạo PAT ở bước 1.

2. Thiết lập mirror trên GitLab:
   - Vào project trên GitLab
   - Chọn `Settings` > `Repository`
   - Mở rộng phần `Mirroring repositories`. VD: https://gitlab.com/miti99/demo-gitlab-mirror/-/settings/repository#js-push-remote-settings
   - Bấm vào dấu `+`
   - Điền thông tin:
     - `Git repository URL`: `https://github.com/GROUP/PROJECT.git`
       (Thay GROUP và PROJECT bằng tên group và project trên GitHub. VD: https://github.com/tiennm99/demo-gitlab-mirror.git)
     - `Username`: username của GitHub account
     - `Password`: GitHub personal access token đã tạo ở bước 1
   - Click `Mirror repository`.

![](img/4.png)  

3. Kiểm tra trạng thái:

- Sau khi thiết lập, repository sẽ được liệt kê với URL dạng:

    ```
    https://*****:*****@github.com/<your_github_group>/<your_github_project>.git
    ```

- Để kiểm tra mirror có hoạt động không, bạn có thể:
  - Push một commit mới lên GitLab
  - Đợi khoảng 5 phút (hoặc 1 phút nếu bật "Only mirror protected branches")
  - Kiểm tra trên GitHub xem commit đã được sync chưa
- Nếu muốn sync ngay lập tức, click "Update now" (nút retry)

Lưu ý:

- Mirror sẽ tự động sync các commit mới từ GitLab sang GitHub
- Nếu branch được merge vào default branch và bị xóa ở source project, nó sẽ bị xóa ở mirror trong lần push tiếp theo
- Nếu branch có thay đổi chưa merge, nó sẽ được giữ lại
- Nếu branch bị diverge (phân kỳ), phần "Mirroring repositories" sẽ hiển thị lỗi

Tham khảo:

1. https://meesvandongen.nl/posts/mirror-gitlab-github
2. https://docs.gitlab.com/user/project/repository/mirror/push/#set-up-a-push-mirror-from-gitlab-to-github