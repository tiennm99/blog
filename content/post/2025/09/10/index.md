---
title: "Newsletter #54"
date: 2025-09-10
tags: ["AI-Assisted", "Technology", "DevOps", "Monorepo", "Software-Engineering", "Deployment", "Uber", "CI/CD"]
categories: ["Newsletter"]
---

*~~Do dạo này tình hình tài chính cá nhân không tốt lắm, nên mình quyết định huỷ Claude Subscription, và do đó không còn dùng Claude Code nữa. Hiện tại mình đang dùng Roo Code với model Z.AI: GLM 4.5 Air từ OpenRouter.~~ Hi vọng bài viết đủ chất lượng làm hài lòng các bạn. Mời bạn thưởng thức Newsletter #54.*

## [Controlling the Rollout of Large-Scale Monorepo Changes](https://www.uber.com/in/en/blog/controlling-the-rollout-of-large-scale-monorepo-changes/)

Tại Uber, mã nguồn được tổ chức thành vài monorepo lớn, mỗi ngôn ngữ chính một repo, và hầu hết microservice được triển khai lên production hoàn toàn tự động qua hệ thống continuous deployment. Điều này đặt ra một bài toán: khi một commit duy nhất có thể thay đổi hàng nghìn service, chẳng hạn nâng cấp thư viện RPC mà gần như mọi service Go đều dùng, làm sao thu hẹp phạm vi ảnh hưởng (blast radius) nếu thay đổi đó có lỗi? Phân tích 500.000 commit trong monorepo Go cho thấy 1,4% commit ảnh hưởng tới hơn 100 service và 0,3% ảnh hưởng tới hơn 1.000 service, tức tuần nào cũng có vài thay đổi chạm tới một phần lớn hệ thống. Dù từng service tự phát hiện lỗi và rollback, lỗi vẫn có thể lọt vào production ở những service không bắt được nó.

Giải pháp của Uber là điều phối triển khai xuyên service. Nhóm thêm một điều kiện chặn (gate) mới vào quy trình đưa commit qua từng giai đoạn: một tiến trình bất đồng bộ duy trì máy trạng thái cho mỗi commit quy mô lớn: service được chia thành các nhóm theo mức độ quan trọng từ tier 5 đến tier 0, và nhóm quan trọng hơn chỉ được mở khóa khi đủ tỷ lệ service ở nhóm trước triển khai thành công. Nếu tỷ lệ lỗi quá cao, commit bị gắn cờ sự cố, tác giả thay đổi được báo ngay và commit bị chặn cho tới khi có bản sửa. Tham số ban đầu quá thận trọng khiến service tier 1 có thể bị chặn tới 40 giờ, nên nhóm xây dựng bộ mô phỏng dựa trên dữ liệu triển khai lịch sử để tinh chỉnh, đạt mục tiêu mở khóa mọi nhóm trong vòng 24 giờ, và kết quả thực tế khớp với dự đoán. Cơ chế này còn được dùng để triển khai dần hàng trăm service phục vụ mô hình học máy chỉ khác nhau ở cấu hình.

## [String Length](https://hsivonen.fi/string-length/)

Henri Sivonen phản bác trào lưu chế giễu JavaScript vì `"🤦🏼‍♂️".length` trả về 7. Emoji này thực chất gồm năm Unicode scalar value (ký tự gốc, bộ chỉnh màu da, zero width joiner, ký hiệu giới tính nam và variation selector), nên cùng một chuỗi có ít nhất bốn "độ dài": 17 code unit UTF-8 (Rust), 7 code unit UTF-16 (JavaScript, Java), 5 scalar value (Python 3) và 1 extended grapheme cluster (Swift). Ba con số đầu cố định với mọi chuỗi hợp lệ và tính được mà không cần tra cứu gì, còn số grapheme cluster phụ thuộc vào phiên bản cơ sở dữ liệu Unicode mà chương trình đang dùng, nên hai chương trình có thể đếm ra kết quả khác nhau.

Tác giả lập luận rằng việc ghi nhớ độ dài theo đơn vị mã hóa gốc của chuỗi là hoàn toàn hợp lý, vì đó là con số bắt buộc phải biết khi cấp phát bộ nhớ và giúp việc nối chuỗi nhanh hơn, còn các độ dài khác chỉ nên tính khi cần. Theo ông, UTF-8 là lựa chọn lưu trữ tốt nhất, truy cập ngẫu nhiên theo scalar value hiếm khi thực sự cần, cách tiếp cận của Swift chưa chắc phù hợp với mọi ngôn ngữ, còn cách của Python 3 là tệ nhất. Phần cuối bàn về lý do ta cần đo độ dài: ước lượng không gian hiển thị (terminal dựa vào East Asian Width, ký tự CJK chiếm hai ô) và đặt giới hạn độ dài công bằng giữa các ngôn ngữ, được minh họa bằng số liệu từ các bản dịch Tuyên ngôn Quốc tế Nhân quyền và cách Twitter tính mỗi ký tự CJK hay emoji thành hai đơn vị.

## [An Illustrated Guide to OAuth](https://www.ducktyped.org/p/an-illustrated-guide-to-oauth/)

Aditya Bhargava giải thích OAuth bằng hình minh họa, bắt đầu từ nguồn gốc: năm 2007, Twitter cần cho ứng dụng bên thứ ba đăng tweet thay người dùng mà người dùng không phải đưa mật khẩu cho họ. Mấu chốt của OAuth là access token, giống một API key gắn với từng người dùng. Qua ví dụ ứng dụng quản lý tài chính YNAB kết nối với ngân hàng Chase, bài viết mô tả hai phần của luồng: người dùng đăng nhập tại Chase và chọn quyền cấp (scope), rồi Chase chuyển hướng về YNAB kèm một authorization code chứ không phải access token, vì URL có thể lộ ra trong lịch sử trình duyệt hay log máy chủ. YNAB sau đó đổi code lấy access token bằng một yêu cầu POST qua HTTPS từ phía backend, kèm theo client secret.

Bài viết giới thiệu thuật ngữ chuẩn (resource owner, OAuth client, authorization server, resource server, scope) và góc nhìn của lập trình viên: đăng ký ứng dụng để nhận client ID và client secret, khai báo redirect URI để máy chủ ủy quyền từ chối các yêu cầu chuyển hướng người dùng về trang độc hại. Tác giả phân biệt front-channel (tham số nằm trên URL, ai cũng thấy) với back-channel (dữ liệu nằm trong thân yêu cầu POST), và giải thích vì sao ứng dụng chạy thuần frontend hay ứng dụng di động không được nhúng client secret mà nên dùng PKCE. Cuối bài điểm qua implicit flow, luồng làm mới token và OpenID Connect, lớp nằm trên OAuth dùng cho tính năng đăng nhập bằng Google. Theo tác giả, OAuth phức tạp vì mỗi bước đều được thiết kế để chặn một kiểu khai thác.


## [Professional Development Is a Choice](https://alexchesser.medium.com/professional-development-is-a-choice-e90fb8719259)

Alex Chesser, lập trình viên với hơn 20 năm kinh nghiệm, cho rằng phát triển chuyên môn khác với sự trưởng thành tự nhiên qua công việc hằng ngày: nó đòi hỏi một lựa chọn có chủ đích. Kể lại hành trình của bản thân, từ công việc duy trì script Perl tại Nortel, bị sa thải sau cú sụp đổ dot-com, năm năm dạy học rồi quay lại nghề lập trình, tác giả thừa nhận phần lớn sự nghiệp chỉ học một cách bị động để giải quyết việc trước mắt. Ông cũng chỉ ra rằng các chương trình phát triển nghề nghiệp áp đặt từ trên xuống ở công ty thường thất bại, vì sự chênh lệch quyền lực giữa quản lý và nhân viên khiến không ai nói thật điều mình muốn.

Kế hoạch tác giả đề xuất gồm bốn bước. Trước hết, đặt lịch một buổi "tự nhìn lại nghề nghiệp" dài một giờ, lặp lại hằng tuần. Tiếp theo, trả lời các câu hỏi như bản thân giỏi gì, thích gì, được trả tiền cho việc gì, cần cải thiện điều gì và mục tiêu trong 1–3, 3–5, 5–10 năm tới, rồi đặt mục tiêu theo tiêu chí SMART, không quên sức khỏe, gia đình và đam mê ngoài công việc để tránh kiệt sức. Sau đó, dành thời gian tập trung theo phương pháp deep work hoặc Pomodoro, và cuối cùng lặp lại vòng này mỗi tuần để điều chỉnh mục tiêu. Tác giả nhấn mạnh rằng không đầu tư cho phát triển chuyên môn cũng là một lựa chọn hợp lệ, miễn là bạn quyết định điều đó một cách có ý thức.

## [Database Cache](https://avi.im/blag/2025/db-cache/)

Avi đặt câu hỏi: liệu database có thể thay thế hoàn toàn dịch vụ cache? Cache giải quyết một vấn đề quan trọng là cung cấp dữ liệu tính sẵn với độ trễ cực thấp, thường theo mô hình cache-aside, trong đó ứng dụng làm việc với cả cache lẫn database và tự giữ cho chúng đồng bộ. Để hệ thống đơn giản hơn, ta có thể dùng read replica như một cache: database vốn đã giữ một phần dữ liệu trong bộ nhớ (buffer pool), cả cache lẫn replica đều không yêu cầu nhất quán mạnh, ta dùng lại được chính các câu SQL và không còn phải lo chuyện vô hiệu hóa cache. Với database nhúng như SQLite kết hợp công cụ nhân bản như Litestream, độ trễ mạng thậm chí bằng không.

Tuy vậy, cache vẫn vượt trội ở nhiều điểm: dựng lên và hủy đi đều rẻ, lập trình viên chủ động chọn tập dữ liệu cần lưu, lưu được kết quả tính sẵn như một phép join phức tạp, hỗ trợ TTL và chính sách loại bỏ dữ liệu, không cần cả một replica hàng terabyte chỉ để truy cập vài gigabyte dữ liệu nóng, và chịu được hàng trăm nghìn kết nối đồng thời trong khi kết nối database rất tốn kém. Để thu hẹp khoảng cách, tác giả cho rằng database cần hỗ trợ read replica chỉ chứa một phần dữ liệu, chịu được số lượng replica rất lớn, và tích hợp IVM (Incremental View Maintenance) để tính sẵn kết quả truy vấn như Noria (nay là ReadySet) đã làm. Kết luận của bài là hiện tại chúng ta vẫn chưa tới được điểm đó.

## Bonus: Vài ảnh hay ho đến từ [ByteByteGo](https://bytebytego.com/)

![A Detailed Guide to Content Delivery Networks](https://substack-post-media.s3.amazonaws.com/public/images/f8993d4d-8879-4eeb-9635-3a5aa13816cc_2250x2624.png)
![CI/CD Pipeline Explained](https://substack-post-media.s3.amazonaws.com/public/images/607358c5-2e0b-41fc-9cdd-a350e1faf144_3780x4096.jpeg)
![What are some of the most popular versioning strategies?](https://substack-post-media.s3.amazonaws.com/public/images/8b1bd4d5-a708-4793-a9e6-aa96db182f54_3000x3900.png)
![The Testing Pyramid](https://substack-post-media.s3.amazonaws.com/public/images/c34a8b8b-feff-4473-9eb1-dd399f5a81eb_2360x2664.jpeg)

*Tổng kết thì mình thấy đợt thử nghiệm này cũng khá ổn. Có điều bài viết còn khá dài dòng và đôi chỗ còn sai sót từ ngữ tiếng Việt một chút. Với cái giá free thì quá được :))) Hẹn gặp lại các bạn trong các bài viết tới.*

---

*Bài viết đã được viết lại bởi Claude Code với Opus 5.5 vào ngày 27/09/2026.*
