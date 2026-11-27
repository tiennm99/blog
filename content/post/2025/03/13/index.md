---
title: "Fixing Nextcloud Client Login Issues When Deployed with Coolify"
date: 2025-03-13
tags: [ "Nextcloud", "Coolify", "Self-hosted"]
---

*I'll consider writing a dedicated post introducing Coolify in more detail later. Today, I'll just focus on solving a specific issue I ran into.*

## The Problem

After successfully setting up Nextcloud with Coolify, you can access and use the web interface via IP or domain as usual. However, when trying to log in from the Nextcloud desktop/mobile client, you run into the following error:

*The polling URL does not start with HTTPS despite the login URL started with HTTPS. Login will not be possible because this might be a security issue. Please contact your administrator.*

![](img/1.png)

## The Fix

1. Connect to the Nextcloud container terminal.
2. Run the following command to open the Nextcloud configuration file:

```bash
nano /config/www/nextcloud/config/config.php
```

3. Add or update the following settings:

```
'overwrite.cli.url' => 'https://yourdomain.com',
'overwriteprotocol' => 'https',
```

*Replace <code>yourdomain.com</code> with your actual domain.*

4. Save the file and restart Nextcloud.

5. Try logging in from the client again.

Thanks for reading, and good luck!
