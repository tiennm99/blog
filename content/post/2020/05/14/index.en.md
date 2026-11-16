---
title: "Connecting to HCMUT's HCMUT01 Wi-Fi on Linux"
date: 2020-05-14
tags: [ "Linux", "Wifi" ]
---

On Windows, when you connect, it immediately gives you a prompt to enter your username and password. Here, I'll show you how to set it up on Linux.

Select the following options:

```shell
Security: WPA & WPA Enterprise
Authentication: Tunneled TLS
Anonymous identity: (your username, the same one you use to log in to myBK)
Domain: hcmut.edu.vn
CA cerificate: (None)
CA certificate password: (Leave blank)
Show passwords: (uncheck)
No CA certificate is required: (check)
Inner authentication: PAP
Username: (your username, same as the identity above)
Password: password
```

And that's it—now just hit connect. Good luck!
