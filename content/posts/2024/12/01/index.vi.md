---
title: "Cách mở rộng ổ đĩa trong Oracle Cloud Infrastructure (OCI)"
date: 2024-12-01
tags: [ "Linux", "OCI" ]
---

Khi dùng Oracle trên Oracle Cloud, dù lúc setup bạn chọn Boot Volume 200GB nhưng Oracle chỉ nhận 50GB?

Đây là do Oracle Cloud chưa nhận hết dung lượng, bạn cần phải mở rộng ổ đĩa để sử dụng hết dung lượng đã chọn.

## Cách làm

Bạn sử dụng lệnh sau:

```bash
sudo /usr/libexec/oci-growfs -y
```

Tham khảo:
- [https://docs.oracle.com/en-us/iaas/Content/Block/Tasks/resizingavolume.htm](https://docs.oracle.com/en-us/iaas/Content/Block/Tasks/resizingavolume.htm)
- [https://docs.oracle.com/en-us/iaas/oracle-linux/oci-utils/index.htm#oci-growfs](https://docs.oracle.com/en-us/iaas/oracle-linux/oci-utils/index.htm#oci-growfs)
