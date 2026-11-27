---
title: "Sửa lỗi 'Pairing Required' khi kết nối OpenClaw qua Docker"
date: 2026-04-05
tags: ["AI-Assisted", "OpenClaw", "Docker", "Self-hosted"]
categories: ["Sharing"]
---

Nếu bạn đang self-host [OpenClaw](https://github.com/open-claw/open-claw) bằng Docker và gặp lỗi **"disconnected (1008): pairing required"** khi truy cập từ trình duyệt, bài viết này sẽ giúp bạn khắc phục nhanh chóng.

## Vấn đề

Khi setup OpenClaw với Docker trên Ubuntu, trình duyệt hiển thị lỗi:

```
disconnected (1008): pairing required
```

Thử dùng CLI để approve device thì lại gặp lỗi **"gateway token mismatch"** — CLI trong Docker container không resolve đúng authentication token từ file config.

## Nguyên nhân

Token xác thực giữa host và Docker container bị lệch. CLI bên trong container không đọc đúng token từ file `openclaw.json`, dẫn đến việc không thể list hay approve device.

## Cách sửa

### Bước 1: Lấy Gateway Token từ host

```bash
cat ~/.openclaw/openclaw.json | grep -A5 '"auth"'
```

Copy giá trị token dưới mục `gateway.auth`.

### Bước 2: Kiểm tra token trong container

```bash
docker ps  # Lấy CONTAINER_ID của openclaw-gateway
docker exec -it <CONTAINER_ID> cat /home/node/.openclaw/openclaw.json | grep -A5 '"auth"'
```

Xác nhận token giữa host và container có khớp không.

### Bước 3: List devices với token override

Inject token trực tiếp qua biến môi trường `-e` khi chạy lệnh trong container:

```bash
docker exec -e OPENCLAW_GATEWAY_TOKEN=<YOUR_TOKEN> -it <CONTAINER_ID> \
  openclaw devices list
```

Lệnh này sẽ hiển thị danh sách các device đang chờ approve kèm **Request ID**.

### Bước 4: Approve device

```bash
docker compose exec openclaw-gateway \
  openclaw devices approve <REQUEST_ID>
```

### Bước 5: Kiểm tra kết quả

Truy cập lại `http://localhost:18789` trên trình duyệt — lỗi pairing sẽ biến mất.

## Lưu ý

Mấu chốt của cách sửa này là inject token qua biến môi trường (`-e OPENCLAW_GATEWAY_TOKEN=...`) thay vì truyền qua command-line flag, vì CLI trong Docker không xử lý đúng flag token.

## Tham khảo

- [Fixing OpenClaw Docker's "Pairing Required" Dead End on Ubuntu - Rik Banerjee](https://www.linkedin.com/pulse/fixing-openclaw-dockers-pairing-required-dead-end-ubuntu-rik-banerjee-j09de/)
