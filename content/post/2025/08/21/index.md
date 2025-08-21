---
title: "Cách xử lý HTTP Timeout khi sử dụng Coolify"
date: 2025-08-21
tags: ["Coolify", "Self-hosted", "Issue", "Troubleshooting"]
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

Và... vẫn gặp lại lỗi trên. Solution kia cũng không có gì sai nhưng mà đây không phải vấn đề của git, mà do http timeout ở proxy của Coolify đã timeout quá sớm, chưa kịp để git đẩy hết data lên server. Lỗi này cũng có thể gặp ở các service http khác chứ không riêng gì git.

Cách giải quyết như sau:

Vào phần `Server > (sever của bạn, thường là localhost) > Proxy > Configuration`. Thêm các dòng sau vào `services.traefik.command`:

``` yaml
- '--entrypoints.http.transport.respondingTimeouts.readTimeout=600s'
- '--entrypoints.https.transport.respondingTimeouts.readTimeout=600s'
```
Ở đây mình để tạm là `600s` (10 phút), nhưng tuỳ trường hợp của bạn, có thể tăng thêm. Nên chọn số vừa phải vì để quá cao cũng không tốt.

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
      - '--entrypoints.http.transport.respondingTimeouts.readTimeout=3600s'
      - '--entrypoints.https.transport.respondingTimeouts.readTimeout=3600s'
    labels:
      - traefik.enable=true
      - traefik.http.routers.traefik.entrypoints=http
      - traefik.http.routers.traefik.service=api@internal
      - traefik.http.services.traefik.loadbalancer.server.port=8080
      - coolify.managed=true
      - coolify.proxy=true
```

Sau đó `Save` và `Restart Proxy`, chờ một tí cho proxy hoạt động trở lại, vậy là xong.

Chúc các bạn thành công và sớm push được code nhé hehe!!
