---
title: "Cách tắt tường lửa (firewall) trên Ubuntu trong Oracle Cloud Infrastructure (OCI)"
date: 2024-09-25
tags: [ "Linux", "OCI" ]
---

Khi dùng Ubuntu trên Oracle Cloud, đôi khi bạn chạy một service nhưng nó không available ra internet được, đó là do cấu hình firewall mặc định đã block một số kết nối. Hướng dẫn sau sẽ giúp bạn tắt tường lửa trên Ubuntu trong OCI.

**Lưu ý:** Hướng dẫn sau đây sẽ tắt tường lửa, có thể dẫn đến các vấn đề bảo mật nghiêm trọng. Bạn nên cân nhắc cấu hình tường lửa phù hợp thay vì tắt nó đi hoàn toàn.

## Cách tắt tường lửa

Tường lửa trên Ubuntu trong OCI sử dụng `iptables`. Để tắt đi, bạn sử dụng các lệnh sau:

1. **Xóa tất cả các rules tường lửa:**

   ```bash
   sudo iptables -F
   ```

   **Giải thích**: Lệnh `iptables -F` xóa toàn bộ các rules hiện tại, cho phép tất cả phương thức kết nối.

2. **Lưu lại:**

   ```bash
   sudo netfilter-persistent save
   ```

   **Giải thích**: Lệnh này lưu lại bộ rules hiện tại (rỗng), để đảm bảo rằng sau khi khởi động lại, tường lửa sẽ không tự động áp dụng lại các rules cũ.

## Kết luận

Việc tắt tường lửa trên Ubuntu cần đi kèm với cấu hình bảo mật tốt tại Oracle Cloud. Hãy đảm bảo `Security Lists` trong `VCN` được cấu hình đúng.
