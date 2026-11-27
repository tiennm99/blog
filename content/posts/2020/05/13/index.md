---
title: "Unable to Access the Router Login Page (e.g., Inet Center)"
date: 2020-05-13
tags: ["Issue", "Docker", "Networking"]
---

I'm currently staying at Dormitory Area A of VNU-HCM and using the Inet Center network. After moving back to the dorm, I bought an internet card, but I couldn't access the login page anymore, so I couldn't get online. It kept throwing `ERR_CONNECTION_REFUSED`. Here's how I solved it in my case.

For me, the issue happened because Docker hijacked the router page's IP address. To fix it, run the following commands:

```shell
sudo ip link set dev docker0 down
sudo systemctl disable docker
```

Then reboot your machine and it should work.

In general, you shouldn't leave the Docker service enabled at boot—just start it whenever you actually need to use Docker. That's also a good way to keep unnecessary background services from hogging your system resources (like on Windows :v).
