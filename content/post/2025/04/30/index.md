---
title: "Newsletter #14"
date: 2025-04-30
tags: ["AI-Assisted", "Newsletter", "Algorithms", "Data Structures", "Performance", "AI Inference", "Git"]
categories: [ "Newsletter" ]
---

*Mời bạn thưởng thức Newsletter \#14.*

## [Bloom Filter: A Deep Dive](https://www.kirupa.com/data_structures_algorithms/bloom_filter.htm)

Kirupa Chinnathambi giải thích Bloom filter qua một ví dụ quen thuộc: kiểm tra tên người dùng đã tồn tại hay chưa khi đăng ký tài khoản trên một mạng xã hội có hàng triệu thành viên. Quét toàn bộ cơ sở dữ liệu thì quá chậm, còn dùng bảng băm thì tốn quá nhiều bộ nhớ. Bloom filter đứng giữa yêu cầu và cơ sở dữ liệu như một lớp tối ưu: nó không lưu dữ liệu gốc mà chỉ lưu "dấu vân tay" dưới dạng các bit trong một mảng bit. Mỗi phần tử được đưa qua k hàm băm, mỗi hàm trả về một vị trí trong mảng và bit tại đó được bật lên 1. Khi tra cứu, chỉ cần một bit bằng 0 là có thể khẳng định chắc chắn phần tử không tồn tại; nếu tất cả đều bằng 1 thì phần tử "có thể" tồn tại và cần hỏi lại cơ sở dữ liệu, vì các phần tử khác có thể đã tình cờ bật đúng những bit đó (dương tính giả).

Phần sau của bài trình bày công thức tính kích thước mảng bit m và số hàm băm k tối ưu dựa trên số phần tử n và tỷ lệ dương tính giả p mong muốn. Với 10 triệu tên người dùng và p = 1%, mảng bit cần khoảng 95,85 triệu bit (khoảng 12MB) cùng 7 hàm băm, trong khi bảng băm tương đương tốn từ 160MB đến 240MB, tức gấp 13 đến 20 lần. Đổi lại, Bloom filter chấp nhận một tỷ lệ sai nhỏ thay vì trả lời chính xác tuyệt đối. Đây là bài đọc dễ hiểu cho lập trình viên muốn nắm vững cấu trúc dữ liệu xác suất này.

## [Rethinking LLM inference: Why developer AI needs a different approach](https://www.augmentcode.com/blog/rethinking-llm-inference-why-developer-ai-needs-a-different-approach)

Augment Code cho rằng AI hỗ trợ lập trình cần ngữ cảnh của cả kho mã nguồn, và chất lượng gợi ý vẫn tiếp tục tăng khi ngữ cảnh vượt xa 10.000 token. Khác với ứng dụng trò chuyện (khoảng 100 token đầu vào, hàng trăm token đầu ra), bài toán lập trình thường có hàng nghìn token ngữ cảnh nhưng chỉ vài chục token đầu ra, trong khi vLLM hay TensorRT-LLM lại được tối ưu cho trường hợp ngược lại. Vì vậy, nhóm ưu tiên tuyệt đối tốc độ xử lý ngữ cảnh. Bài viết phân tích vì sao bước giải mã từng token khiến GPU chỉ dùng chưa tới 1% năng lực tính toán, rồi giới thiệu cách gom lô ở mức token: các bước giải mã được "đi nhờ" vào lô xử lý ngữ cảnh của yêu cầu khác (giới học thuật gọi là chunked prefill), với kích thước lô chọn gần điểm chuyển giữa giới hạn băng thông bộ nhớ và giới hạn FLOPS.

Bài cũng đề cập các yêu cầu của hệ thống thực tế như hủy yêu cầu đáng tin cậy khi người dùng gõ phím liên tục, cùng các tối ưu cụ thể: CUDA Graphs để GPU không phải chờ CPU, lượng tử hóa FP8, FlashAttention-3 và gộp kernel bằng CUDA kernel tự viết. Kết quả là thời gian ra token đầu tiên dưới 300ms cho 10.000 token đầu vào với Llama3 70B, nhanh gấp 3 lần, và gần 10 yêu cầu mỗi giây trên 8 GPU H100. Đây là bài đọc tốt để hiểu vì sao tối ưu suy luận LLM phải bám sát đặc thù của từng loại ứng dụng.

## [Floyd’s Cycle Algorithm: Fraud Detection in Java Systems](https://dzone.com/articles/floyds-cycle-algorithm-fraud-detection-java-systems)

Bài viết minh họa cách dùng thuật toán phát hiện chu trình của Floyd (còn gọi là "rùa và thỏ") để phát hiện gian lận trong hệ thống ngân hàng. Các tài khoản được mô hình hóa thành đỉnh, các lệnh chuyển tiền thành cạnh có hướng của một đồ thị. Một chuỗi như A → B → C → D → B tạo thành vòng lặp, là dấu hiệu điển hình của hành vi rửa tiền nhằm che giấu nguồn gốc dòng tiền. Thuật toán dùng hai con trỏ: con trỏ chậm đi một bước, con trỏ nhanh đi hai bước; nếu hai con trỏ gặp nhau thì đồ thị có chu trình. Phần cài đặt bằng Java gồm lớp lưu đồ thị chuyển tiền bằng danh sách kề trên HashMap, lớp phát hiện chu trình và một lớp kiểm thử với dữ liệu mẫu.

Ưu điểm của cách tiếp cận này là đơn giản, nhanh và gần như không tốn thêm bộ nhớ, phù hợp để giám sát giao dịch theo thời gian thực. Hạn chế là mỗi điểm xuất phát chỉ phát hiện được một chu trình; với đồ thị phức tạp có nhiều cạnh và nhiều chu trình đan xen, tìm kiếm theo chiều sâu (DFS) sẽ phù hợp hơn. Bài viết cũng điểm qua các lĩnh vực khác có thể áp dụng như phát hiện vòng lặp định tuyến trong mạng, phân tích mẫu DNA, AI/ML và blockchain, là một ví dụ dễ hiểu về việc đưa thuật toán kinh điển vào bài toán thực tế.

## [Succinct data structures](https://blog.startifact.com/posts/succinct/)

Martijn Faassen giới thiệu cấu trúc dữ liệu súc tích (succinct data structures), một nhóm cấu trúc dữ liệu mà ông bất ngờ khi mới biết đến. Giống như nén dữ liệu, chúng lưu thông tin ở dạng rất nhỏ gọn; nhưng khác ở chỗ không cần giải nén trước khi dùng mà vẫn truy vấn trực tiếp được trên dạng nhỏ gọn đó. Nền tảng là vector bit hỗ trợ hai thao tác rank (đếm số bit 1 trước một vị trí) và select (tìm vị trí của bit 1 thứ n) trong thời gian hằng số với chi phí bộ nhớ phụ rất thấp. Wavelet matrix mở rộng rank/select cho bảng chữ cái lớn hơn hai ký hiệu, như chuỗi DNA hay văn bản 256 byte. FM-index cho phép lưu văn bản gọn nhẹ mà vẫn đếm và định vị mẫu con hiệu quả, rất hữu ích trong tin sinh học. Còn cấu trúc dấu ngoặc cân bằng biểu diễn một cây chỉ với 2 bit mỗi nút thay vì dùng nhiều con trỏ, nhưng vẫn di chuyển được tới nút cha, nút con và nút anh em.

Tác giả minh họa bằng bài toán xử lý XML: kết hợp cây dấu ngoặc cân bằng với vector bit thưa để nhảy thẳng tới các nút có thẻ cụ thể, đồng thời hình dung ứng dụng cho việc lưu AST trong trình biên dịch. Bài viết giới thiệu các thư viện Rust như `vers` (hiệu năng cao, chi phí phụ rất thấp), `sucds` (có các cài đặt thưa) và `fm-index`. Theo tác giả, các cấu trúc này còn ít phổ biến nhưng tiềm năng rất lớn, vì tiết kiệm bộ nhớ thường đồng nghĩa với hiệu năng tốt hơn.

## [The art of engineering team focus: less is more](https://github.com/resources/insights/engineering-team-focus)

Bài viết trên GitHub Resources đưa ra một quan điểm ngược trực giác: muốn đội ngũ kỹ thuật giao được nhiều hơn thì phải làm ít việc hơn cùng một lúc. Theo tác giả, mọi thứ chỉ có giá trị khi đã được phát hành và có người dùng, nhưng các nhà quản lý thường khó nói "không", nên chia người ra làm song song nhiều việc và ảo tưởng rằng việc nào cũng đang tiến triển. Giải pháp là minh bạch toàn bộ công việc của đội để thấy rõ năng lực thật và chủ động dừng bớt; chia nhỏ công việc thành các chu kỳ một đến hai tuần để duy trì động lực, dễ đánh giá mã nguồn, giảm rủi ro triển khai và dễ đổi hướng; đồng thời giới hạn số việc đang làm dở, vì mỗi lần chuyển ngữ cảnh có thể mất tới 23 phút mới lấy lại được sự tập trung, kéo theo nhiều lỗi hơn và tinh thần đi xuống.

Tác giả còn khuyên "dồn lực đến mức tối đa": đưa càng nhiều lập trình viên vào việc ưu tiên số một càng tốt, cho tới khi họ bắt đầu vướng chân nhau, rồi mới chuyển sang việc tiếp theo. Cuối cùng, hãy chừa khoảng 20% năng lực làm vùng đệm cho những việc phát sinh, giống như một con đường chạy hết công suất thì chỉ còn là bãi đỗ xe. Những đội có vùng đệm thường sáng tạo, bền bỉ và năng suất hơn. Bài viết hữu ích cho cả lập trình viên lẫn trưởng nhóm muốn hiểu vì sao tập trung mới là chìa khóa của năng suất.

## [Performance optimization, and how to do it wrong](https://genna.win/blog/convolution-simd/)

Tác giả, một người đóng góp cho thư viện học máy burn viết bằng Rust, kể lại hành trình tối ưu phép tích chập trực tiếp trên CPU bằng lệnh SIMD. Dù đã áp dụng thứ tự vòng lặp tối ưu và kỹ thuật chia khối thanh ghi theo một bài báo khoa học, phiên bản mới lại chậm hơn hơn hai lần. Các công cụ phân tích hiệu năng như cargo-flamegraph, samply hay AMD μProf đều không chỉ ra được nguyên nhân, nên tác giả phải rút gọn dần mã nguồn để khoanh vùng. Thủ phạm là sự kết hợp giữa tràn thanh ghi (CPU hiện đại chỉ có 16 thanh ghi SIMD) và quá nhiều lệnh rẽ nhánh bên trong vòng lặp nóng. Cách khắc phục là tách thành hai vòng lặp: một vòng không rẽ nhánh cho phần lớn điểm ảnh và một vòng riêng cho các điểm ảnh ở biên, đồng thời dùng đơn hình hóa lúc biên dịch để loại bỏ các trường hợp phổ biến như không đệm hoặc bước nhảy bằng một.

Bất ngờ lớn nhất đến từ trình biên dịch: khi thêm nhánh, hàm ngoài cùng vượt quá giới hạn kích thước inline của Rust, khiến các lệnh SIMD không còn được inline và hiệu năng lại sụt giảm. Giải pháp đơn giản là đánh dấu cả hàm cấp cao nhất bằng `#[inline(always)]`. Bài viết là bài học thực tế đáng giá: tối ưu hiệu năng đòi hỏi đo đạc cẩn thận, hiểu phần cứng và đôi khi phải "cãi nhau" với trình biên dịch.

## [Supercharging Discord Mobile: Our Journey to a Faster App](https://discord.com/blog/supercharging-discord-mobile-our-journey-to-a-faster-app)

Discord chia sẻ loạt cải tiến hiệu năng cho ứng dụng di động xây dựng bằng React Native, đặc biệt nhắm tới những người dùng tham gia rất nhiều máy chủ. Danh sách máy chủ được viết lại theo kiểu ảo hóa, chỉ giữ trong bộ nhớ những mục đang hiển thị, giúp người dùng có hơn 100 máy chủ giảm 14% bộ nhớ lúc khởi động và 10% thời gian khởi động. Danh sách tin nhắn (vốn đã là thành phần gốc) được tối ưu bằng cơ chế tái sử dụng thành phần, nạp trễ các phần ít dùng và đổ sẵn các phần tử thường gặp vào vùng tái sử dụng, giảm tới 60% khung hình chậm và khoảng 12% bộ nhớ. Trên Android, bộ chọn emoji được viết lại hoàn toàn bằng mã gốc để loại bỏ hiện tượng khung hình trống khi cuộn trên máy cấu hình thấp, còn emoji động chuyển từ GIF sang WebP để đạt 60 khung hình mỗi giây.

Với danh sách kênh, nhóm quay lại dùng FastList tự phát triển thay cho FlashList của Shopify vì FlashList hay bị trống nội dung trên máy Android giá rẻ; họ còn tạo thêm FastestList dựa trên RecyclerView gốc của Android. Trên iOS, bộ chọn ảnh dùng ảnh thu nhỏ chất lượng thấp trong lúc chờ ảnh đẹp hơn và đổi kích thước xem trước sang 256x256 để tận dụng bộ nhớ đệm của PhotoKit, loại bỏ 4,5 giây chờ. Năm 2025, Discord dự định bật New Architecture của React Native, thử nghiệm static Hermes và chuyển logic cốt lõi sang Rust.

## [Git without a forge](https://www.chiark.greenend.org.uk/~sgtatham/quasiblog/git-no-forge/)

Simon Tatham, tác giả PuTTY, giải thích vì sao ông lưu các dự án trong kho Git trần trên máy chủ riêng thay vì dùng forge như GitHub hay GitLab. Ông tin tưởng những máy chủ do người quen vận hành hơn là các tập đoàn có thể đổi ban lãnh đạo; không muốn tốn công vận hành phần mềm forge; không thích việc forge áp đặt sẵn quy trình theo dõi lỗi và pull request; ngại việc người đóng góp phải tạo thêm tài khoản; và lo bị khóa chặt vào nền tảng, khó chuyển đi mà không mất lịch sử thảo luận. Ông cũng thẳng thắn thừa nhận một phần lý do đơn giản là thói quen.

Bài viết xếp hạng các cách gửi bản vá từ tốt nhất đến tệ nhất: gửi URL kho mã nguồn kèm tên nhánh (gần giống pull request mà không cần forge), gửi git bundle chỉ chứa các commit mới, gửi các tệp tạo bởi `git format-patch`, gửi diff trần thiếu thông tin commit, và cuối cùng là `git send-email` khiến người bảo trì phải tự gom từng email. Tác giả ghi nhận forge có lợi ích thật, chẳng hạn lịch sử đóng góp công khai giúp người mới đánh giá văn hóa dự án, nhưng chưa đủ để ông chuyển đổi. Ông để ngỏ khả năng dùng giải pháp phi tập trung, gọn nhẹ, tách biệt rõ lớp thảo luận khỏi kho Git.

## [40 Thoughts On Turning 40](https://newsletter.pathlesspath.com/p/40-thoughts-on-turning-40-287)

Paul Millerd, tác giả cuốn The Pathless Path, ghi lại 40 suy nghĩ khi vừa bước sang tuổi 40, xoay quanh sự thay đổi, công việc, tiền bạc, các mối quan hệ, việc làm cha và hạnh phúc. Ông coi quyết định rời bỏ một sự nghiệp thành công để theo con đường nhiều bất định là lựa chọn quan trọng nhất của tuổi 30, và nhấn mạnh rằng thay đổi thật sự diễn ra chậm và rối rắm chứ không đến từ một "khoảnh khắc" quyết định. Về công việc, ông cho rằng mong muốn thoát khỏi công việc để tự do tài chính là một sai lầm: ta không thể trốn công việc mà chỉ có thể vượt lên nó bằng cách tìm ra "công việc tốt", thứ mang lại sự hài lòng cả lúc đang làm lẫn khi nhìn lại. Ông cũng khuyên mọi người thử tự kinh doanh hoặc làm tự do ít nhất một năm, và nhận ra rằng thu nhập giảm mạnh sau khi nghỉ việc giúp ông thấy rõ mình thật sự coi trọng điều gì.

Ở phần đời sống, ông chia sẻ may mắn khi gặp được người bạn đời và khuyên những ai còn tìm kiếm đừng bỏ cuộc, đồng thời thừa nhận làm cha là trải nghiệm khiêm nhường nhất đời mình. Những ý cuối gợi nhắc rằng theo dõi thời sự không làm ai hạnh phúc hơn, nghỉ ngơi sâu là một kỹ năng cần rèn luyện, "làm ít đi" là cách tháo gỡ bế tắc bị đánh giá thấp, và viết lách là một trong những hành động mạnh mẽ nhất, dù nó có thể phơi bày những khát vọng thật sự của bạn.

## Bonus: Vài ảnh hay ho đến từ [ByteByteGo](https://bytebytego.com/)

![A Cheatsheet on Comparing Key-Value Stores](https://substack-post-media.s3.amazonaws.com/public/images/f7fc4f19-ebd8-45a0-9398-469805bb4a26_1280x1532.gif)
![A Handy Cheatsheet for the Most Popular Cloud Services](https://substack-post-media.s3.amazonaws.com/public/images/16fe4308-ed47-451f-a852-c476ecfb4167_1280x1977.jpeg)
![Which Database Should I Use on AWS?](https://substack-post-media.s3.amazonaws.com/public/images/89a09e07-6548-4c12-87c6-0486c6177ea7_1308x1536.jpeg)

## Bonus 2: Vài video hay ho đến từ [ByteByteGo](https://bytebytego.com/)

[What Is the Most Popular Open-Source AI Stack?](https://www.youtube.com/watch?v=hFURlsMwU7c)

---

*Bài viết đã được viết lại bởi Claude Code với Opus 5.5 vào ngày 27/09/2026.*
