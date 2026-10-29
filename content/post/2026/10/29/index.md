---
title: "Khi AI crawler đi dạo khắp Gitea tự host của mình"
date: 2026-10-29
tags: ["AI-Assisted", "Cloudflare", "Self-hosted", "Gitea", "AI Crawler", "Security"]
categories: ["Sharing"]
---

Mình tự host một Gitea trên con server OCI Always Free, chủ yếu để làm bản backup mirror cho các repo trên GitHub. Mình cứ nghĩ nó là góc nhỏ chẳng ai để ý. Hóa ra có ba "vị khách" ghé thăm rất chăm chỉ: ClaudeBot, GPTBot và Reflectionbot. Bài này ghi lại chuyện mình phát hiện ra, đoán nguyên nhân thế nào, xử lý ra sao và đang theo dõi tiếp như thế nào.

## Phát hiện

Sáng 29/10/2026, mình để ý server bên Nhật (chạy Gitea) bận bất thường. Mở access log của Traefik ra xem thì thấy log xoay vòng rất nhanh: phần còn giữ lại chỉ phủ khoảng 4,5 tiếng (từ 17:55 đến 22:22 UTC ngày 28/10), nhưng trong khoảng đó đã có **86.765 request**.

| User agent | Số request |
| --- | --- |
| ClaudeBot (Anthropic) | 39.860 |
| GPTBot (OpenAI) | 26.901 |
| Reflectionbot (Reflection AI) | 16.412 |
| Bun (chính gitea-mirror của mình đang sync) | 3.587 |
| Còn lại (DuckDuckBot, OAI-SearchBot) | 5 |

Khoảng 95% response 200 là các trang `src`, `commit`, `raw` của 86 repo mirror. Nói cách khác, các crawler đang đi qua **từng commit của từng repo**, mỗi commit là vài trang, nên con số mới lớn như vậy.

Nhìn rộng ra cả tháng thì mọi thứ còn rõ hơn. Traffic gần như bằng 0 cho đến ngày 10/10, rồi từ 11/10 vọt lên và giữ ở mức cao suốt từ đó:

![Số request theo ngày, từ 30/9 đến 28/10](requests-by-day.png)

Tổng cộng gần **13,9 triệu request** và **1,48 TB** băng thông, cho một con Gitea chỉ có mình mình dùng:

![Tổng quan traffic: request, unique visitor, băng thông, error rate, P95 latency](traffic-overview.png)

Gần như toàn bộ là bot, và gần như toàn bộ đến từ Mỹ:

![Tỉ lệ loại client: gần như toàn bộ là Bot](client-types.png)

![Traffic theo quốc gia: United States chiếm 13,51 triệu request](traffic-by-country.png)

Riêng ClaudeBot đã chiếm 10,82 triệu request và 1,4 TB, GPTBot thêm 2,52 triệu request:

![Bảng AI agents & bots: ClaudeBot và GPTBot](ai-bots.png)

## Đoán nguyên nhân

Câu hỏi đầu tiên là: có ai lấy được tài khoản của mình không? Mình kiểm tra lại log:

- Toàn bộ request đều ẩn danh, không có request nào đăng nhập.
- Không có client bên ngoài nào gửi POST, PATCH, push hay gọi API. Tất cả lệnh ghi đều đến từ chính server, tức là gitea-mirror đang sync.
- Ba crawler đều là hàng thật: IP của GPTBot nằm trong danh sách OpenAI công bố, ClaudeBot nằm trong dải IP của Anthropic, còn Reflectionbot có reverse DNS trỏ về `reflection.ai`.

![Kiểm chứng ba crawler: Reflectionbot, GPTBot và ClaudeBot đều là bot thật](crawler-verification.png)

Vậy tài khoản không lộ. Đây là crawl bình thường, đúng nghĩa đen: mỗi bot đều hỏi `/robots.txt` trước, nhận về 404 (tức là "cứ crawl thoải mái"), rồi Gitea phục vụ các trang public cho người dùng ẩn danh với HTTP 200. Không có gì để report abuse cả, lỗi nằm ở phía mình.

Nhưng có một chuyện tệ hơn: **một repo private đã bị lộ**. Một repo private trên GitHub lại có bản mirror **public** trên Gitea, và Reflectionbot đã lấy 48 trang của nó. Lần theo thì ra là gitea-mirror dùng lại một bản ghi cũ:

1. Lúc đầu, tên repo đó thuộc về một repo public. gitea-mirror import nó và ghi lại cờ `is_private = 0`.
2. Repo public đó sau này chuyển sang namespace khác.
3. Mình tạo một repo **private** mới trùng tên cũ. Bản ghi cũ vẫn trỏ vào URL đó với cờ public, và gitea-mirror coi hai repo là một nên không đọc lại visibility.
4. Gitea pull mirror theo URL bằng GitHub token, nên từ đó repo public trên Gitea chứa nội dung của repo private mới.

Setting `visibility: "private"` trong config của gitea-mirror cũng không cứu được, vì nó chỉ áp dụng cho các org mà gitea-mirror tạo ra, còn repo vẫn lấy cờ private của GitHub tại thời điểm import.

Mình kiểm tra lại toàn bộ: chỉ 105 repo đọc được khi không đăng nhập, tất cả thuộc user cá nhân trên Gitea. Mọi org khác đều private. Trong 105 repo đó, chỉ duy nhất repo kia có nguồn private trên GitHub.

Gốc rễ của chuyện bot thì đơn giản hơn: mọi record DNS của các app đều là `A` record **DNS only** (mây xám), nên bot đi thẳng vào origin, Cloudflare không hề thấy HTTP request nào để mà chặn.

## Xử lý

**Cầm máu trước.** Mình dừng Gitea và gitea-mirror, chuyển repo bị lộ về private.

Phương án ban đầu là đưa toàn bộ app ra sau Cloudflare Tunnel và Cloudflare Access. Nghĩ kỹ thì hơi nặng: phải đổi domain trên Coolify sang `http://`, cấu hình lại từng app, xử lý webhook... Vì vậy mình tạm cất kế hoạch đó vào backlog và chọn cách nhẹ hơn: **chỉ cần bật proxy (mây cam)** cho các record. Record vẫn trỏ về IP cũ, Traefik và Coolify giữ nguyên, nhưng giờ Cloudflare đứng giữa và có thể chặn bot.

Thứ tự triển khai chiều 29/10:

1. **SSL/TLS chuyển từ Full sang Full (strict).** Traefik vẫn giữ cert Let's Encrypt, HTTP-01 renew vẫn đi qua proxy được. Không để Flexible, vì Traefik redirect HTTP sang HTTPS sẽ gây vòng lặp vô tận.
2. **Thử trước trên một app ít rủi ro** (một web terminal): kiểm tra header `server: cloudflare`, trang load được và WebSocket vẫn chạy.
3. **Cấu hình chặn bot**, tất cả đều có trên gói Free:
   - **AI bot policies**: Training, Agent và Search đều Block. App của mình không cần xuất hiện trong kết quả AI search.
   - **Bot Preference Sync** (managed `robots.txt`): Cloudflare tự chèn các dòng `Disallow` cho AI bot vào `robots.txt`, hoặc tự phục vụ file này nếu app không có.
   - **Một WAF custom rule** để bắt những gì policy bỏ sót:

     ```text
     (cf.verified_bot_category in {"AI Crawler" "AI Assistant" "AI Search"})
     or (http.user_agent contains "Reflectionbot")
     ```

4. **Proxy record wildcard** `*.miti99.dev`. Một toggle là chuyển hết gần 20 app, app mới tạo sau này cũng được proxy mặc định. Rollback cũng chỉ là một toggle.
5. **Proxy Coolify sau cùng**, rồi kiểm tra lại GitHub webhook push deploy, metric của Sentinel từ server thứ hai, MCP và WebSocket realtime.
6. **Cho Traefik tin dải IP của Cloudflare** (`forwardedHeaders.trustedIPs`) để app thấy IP thật của người dùng, thay vì IP của Cloudflare.

Một quyết định quan trọng: **không bật Bot Fight Mode**. Trên gói Free, nó challenge mọi client không phải trình duyệt và không có cách nào exempt bằng WAF rule. Bật lên là hỏng webhook của GitHub, Sentinel, MCP, sync của Nextcloud và cả git client.

Kết quả thử bằng `curl`: user agent trình duyệt nhận 200, còn user agent GPTBot, ClaudeBot hay Reflectionbot nhận 403 ngay ở edge. Sau đó mình bật lại Gitea phía sau proxy.

Có vài giới hạn cần biết khi proxy qua Cloudflare:

- Request body trên 100 MB sẽ fail. Nextcloud upload theo chunk nên không sao.
- Response chậm hơn khoảng 100 giây sẽ trả về 524. Các call LLM dài mà không stream có thể dính.
- **Origin IP vẫn mở.** Bot nào đã biết IP vẫn có thể gọi thẳng vào Traefik. Đây là lớp chặn crawler, không phải access control.

## Theo dõi

Điểm cuối ở trên được kiểm chứng ngay trong log. Gitea được proxy lúc 09:14 UTC (16:14 giờ Việt Nam). Grep access log ở origin:

```bash
for ua in GPTBot ClaudeBot Reflectionbot; do
  echo "$ua $(grep -c "$ua" access.log)"
done
```

- **ClaudeBot** dừng hẳn lúc 09:14:20, gần như ngay khi đổi record.
- **Reflectionbot** còn lai rai thêm khoảng 6 phút, chắc do DNS cache.
- **GPTBot** thì vẫn gọi thẳng vào IP origin (`ClientAddr` là IP của OpenAI, không phải của Cloudflare) thêm **7.056 request trong một tiếng**, đến 10:14 mới dừng. Nhiều khả năng nó cache DNS lâu hơn TTL.
- Từ đó đến lúc viết bài (khoảng 4 tiếng), origin ghi nhận **0 request** từ cả ba bot.

Những việc mình sẽ theo dõi tiếp:

- **Security → Events** trên Cloudflare: xem AI bot có bị block đều đặn không, và có user agent lạ nào cần thêm vào WAF rule không.
- **Access log của Traefik ở origin**: grep như trên. Nếu crawler lại xuất hiện với `ClientAddr` không thuộc dải Cloudflare, tức là nó đã biết IP origin, lúc đó phải tính đến firewall chỉ cho Cloudflare vào, hoặc quay lại phương án tunnel.
- **`robots.txt`** của từng host: `curl https://<app>.example.com/robots.txt` phải có các dòng AI `Disallow` của Cloudflare.
- **App mới**: Coolify tạo record DNS ở chế độ DNS only, nên host nào có record riêng phải tự bật proxy, không thì lại thành cửa sau.
- **Dải IP của Cloudflare** ít khi đổi, nhưng nếu đổi thì phải cập nhật lại `trustedIPs` của Traefik.

Còn tồn đọng: bật `REQUIRE_SIGNIN_VIEW` để mọi trang Gitea đều phải đăng nhập (đây mới là cách sửa thật cho chuyện lộ repo, proxy chỉ là lớp phụ), dọn bỏ toàn bộ mirror, rotate GitHub token của gitea-mirror, và cân nhắc gửi yêu cầu xóa dữ liệu đã thu thập tới Reflection AI, OpenAI và Anthropic.

## Bài học

- **Cái gì public sẽ bị crawl, và crawl rất kỹ.** Bot AI không chỉ đọc trang chủ mà đi qua từng commit.
- **Đừng tin cờ visibility được sao chép từ hệ thống khác.** Một bản ghi cũ trùng tên là đủ biến repo private thành public.
- **DNS only nghĩa là Cloudflare không giúp được gì.** Muốn chặn bot ở edge thì phải bật proxy, và với self-host nhỏ thì như vậy là đủ, chưa cần tunnel.
- **Đừng bật Bot Fight Mode theo phản xạ** nếu server còn nhận webhook hay client không phải trình duyệt.
