---
title: "Cách xử lý HTTP Timeout khi sử dụng Coolify"
date: 2025-08-21
tags: ["Coolify", "Traefik", "Issue", "Troubleshooting"]
---

*Đăng ảnh của [ByteByteGo](https://bytebytego.com/) được mấy hôm rồi nên nay đổi gió.*

Đôi khi deploy GitLab hay Gitea lên Coolify và sử dụng bạn sẽ gặp lỗi như sau:

```
git -c diff.mnemonicprefix=false -c core.quotepath=false --no-optional-locks push -v <remote của bạn> <nhánh trên local>:<nhánh trên remote>
POST git-receive-pack (chunked)
error: RPC failed; HTTP 504 curl 22 The requested URL returned error: 504
send-pack: unexpected disconnect while reading sideband packet
fatal: the remote end hung up unexpectedly
Pushing to <url git của bạn>
Everything up-to-date
Completed with errors, see above.
```

Có thể bạn đi search và tìm thấy solution là chỉnh git chunk buffer như này:

``` shell
git config --global http.postBuffer <một số gì đó khá là to>
```

## Tại sao git config http.postBuffer không hiệu quả?

**Git http.postBuffer là gì?**
- Đây là buffer size mà git sử dụng khi gửi dữ liệu qua HTTP POST
- Mặc định git gửi dữ liệu theo từng chunk nhỏ (thường 1MB)
- Tăng postBuffer có nghĩa là gửi từng chunk lớn hơn, giảm số lần request

**Vì sao trong trường hợp này nó không hiệu quả?**

Vấn đề không nằm ở việc git gửi dữ liệu như thế nào, mà nằm ở **HTTP timeout của proxy Coolify**:

1. **Git vẫn gửi được dữ liệu** lên Traefik proxy
2. **Traefik proxy chờ phản hồi** từ Git server (GitLab/Gitea)
3. **Git server cần thời gian xử lý** dữ liệu (compress, index, validate...)
4. **Traefik timeout trước** khi Git server kịp phản hồi → HTTP 504

Ngay cả khi git gửi chunk lớn hay nhỏ, thời gian xử lý ở Git server vẫn như vậy. Do đó tăng postBuffer không giải quyết được vấn đề timeout ở proxy layer.

## Kiến trúc và nguyên nhân lỗi

**Luồng hoạt động khi git push:**

```
Git Client → Traefik Proxy → Git Server (GitLab/Gitea)
     ↑                ↑              ↑
  postBuffer    readTimeout     Processing time
```

**Chi tiết từng bước:**

1. **Git client** gửi dữ liệu qua HTTP POST (có thể mất vài giây với repo lớn)
2. **Traefik proxy** nhận và forward request đến Git server
3. **Git server** bắt đầu xử lý:
   - Giải nén objects
   - Kiểm tra integrity
   - Cập nhật refs
   - Chạy git hooks (nếu có)
4. **Traefik chờ phản hồi** trong thời gian `readTimeout` (mặc định ~30s)
5. **Nếu Git server xử lý lâu hơn** → Traefik trả về HTTP 504

**Tại sao lỗi này xảy ra với Coolify?**
- Coolify sử dụng Traefik làm reverse proxy
- Traefik có `readTimeout` mặc định khá thấp
- Git operations với large files/repos thường cần > 30s để xử lý
- Lỗi này không chỉ ảnh hưởng git mà còn các HTTP service khác cần xử lý lâu

## Giải pháp

Vào phần `Server > (server của bạn, thường là localhost) > Proxy > Configuration`. Thêm các dòng sau vào `services.traefik.command`:

``` yaml
- '--entrypoints.http.transport.respondingTimeouts.readTimeout=600s'
- '--entrypoints.https.transport.respondingTimeouts.readTimeout=600s'
```

**Giải thích**:
- `readTimeout`: Thời gian tối đa Traefik chờ đọc phản hồi từ backend
- `600s` (10 phút): Thời gian phù hợp cho các tác vụ git push lớn
- Có thể điều chỉnh tùy theo kích thước repository và tốc độ mạng của bạn

Full config (mẫu, có thể thay đổi trong các phiên bản sau của Coolify, bạn chỉ nên tham khảo cách thêm mà thôi):

``` yaml
name: coolify-proxy
networks:
  coolify:
    external: true
services:
  traefik:
    container_name: coolify-proxy
    image: 'traefik:v3.1'
    restart: unless-stopped
    extra_hosts:
      - 'host.docker.internal:host-gateway'
    networks:
      - coolify
    ports:
      - '80:80'
      - '443:443'
      - '443:443/udp'
      - '8080:8080'
    healthcheck:
      test: 'wget -qO- http://localhost:80/ping || exit 1'
      interval: 4s
      timeout: 2s
      retries: 5
    volumes:
      - '/var/run/docker.sock:/var/run/docker.sock:ro'
      - '/data/coolify/proxy/:/traefik'
    command:
      - '--ping=true'
      - '--ping.entrypoint=http'
      - '--api.dashboard=true'
      - '--entrypoints.http.address=:80'
      - '--entrypoints.https.address=:443'
      - '--entrypoints.http.http.encodequerysemicolons=true'
      - '--entryPoints.http.http2.maxConcurrentStreams=250'
      - '--entrypoints.https.http.encodequerysemicolons=true'
      - '--entryPoints.https.http2.maxConcurrentStreams=250'
      - '--entrypoints.https.http3'
      - '--providers.file.directory=/traefik/dynamic/'
      - '--providers.file.watch=true'
      - '--certificatesresolvers.letsencrypt.acme.httpchallenge=true'
      - '--certificatesresolvers.letsencrypt.acme.httpchallenge.entrypoint=http'
      - '--certificatesresolvers.letsencrypt.acme.storage=/traefik/acme.json'
      - '--api.insecure=false'
      - '--providers.docker=true'
      - '--providers.docker.exposedbydefault=false'
      - '--entrypoints.http.transport.respondingTimeouts.readTimeout=600s'
      - '--entrypoints.https.transport.respondingTimeouts.readTimeout=600s'
    labels:
      - traefik.enable=true
      - traefik.http.routers.traefik.entrypoints=http
      - traefik.http.routers.traefik.service=api@internal
      - traefik.http.services.traefik.loadbalancer.server.port=8080
      - coolify.managed=true
      - coolify.proxy=true
```

## Áp dụng thay đổi

1. **Save**: Lưu cấu hình Traefik
2. **Restart Proxy**: Khởi động lại proxy để áp dụng timeout mới
3. **Kiểm tra**: Đợi proxy hoạt động trở lại (thường mất 30-60 giây)

## Lưu ý quan trọng

- **Không nên đặt timeout quá cao**: Có thể gây treo kết nối lâu khi có lỗi thực sự
- **Test với repository nhỏ trước**: Đảm bảo cấu hình hoạt động đúng
- **Theo dõi logs**: Kiểm tra logs của Coolify và Traefik để debug nếu cần

Chúc các bạn thành công và sớm push được code nhé!
