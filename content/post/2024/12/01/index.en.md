---
title: "How to Expand a Disk Volume in Oracle Cloud Infrastructure (OCI)"
date: 2024-12-01
tags: [ "Linux", "OCI" ]
---

When running an instance on Oracle Cloud, have you ever chosen a 200GB Boot Volume during setup only to find the OS recognizing just 50GB?

This happens because the OS hasn't claimed the full volume capacity yet—you need to expand the filesystem to use the full disk space you allocated.

## How to Do It

Run the following command:

```bash
sudo /usr/libexec/oci-growfs -y
```

References:
- [https://docs.oracle.com/en-us/iaas/Content/Block/Tasks/resizingavolume.htm](https://docs.oracle.com/en-us/iaas/Content/Block/Tasks/resizingavolume.htm)
- [https://docs.oracle.com/en-us/iaas/oracle-linux/oci-utils/index.htm#oci-growfs](https://docs.oracle.com/en-us/iaas/oracle-linux/oci-utils/index.htm#oci-growfs)
