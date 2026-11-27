---
title: "How to Disable the Firewall on Ubuntu in Oracle Cloud Infrastructure (OCI)"
date: 2024-09-25
tags: [ "Linux", "OCI" ]
---

When using Ubuntu on Oracle Cloud, you might occasionally run a service only to find it isn't accessible from the internet. This happens because the default firewall configuration blocks certain connections. The following guide will show you how to disable the firewall on Ubuntu in OCI.

**Note:** The instructions below will disable the firewall completely, which may lead to serious security risks. You should consider configuring appropriate firewall rules instead of turning it off entirely.

## How to Disable the Firewall

The firewall on Ubuntu in OCI uses `iptables`. To disable it, run the following commands:

1. **Flush all firewall rules:**

   ```bash
   sudo iptables -F
   ```

   **Explanation**: The `iptables -F` command clears all current rules, allowing all incoming and outgoing connections.

2. **Save the changes:**

   ```bash
   sudo netfilter-persistent save
   ```

   **Explanation**: This command saves the current (empty) rule set, ensuring that the old firewall rules are not automatically reapplied after a reboot.

## Conclusion

Disabling the firewall on Ubuntu should always be paired with proper network security settings in Oracle Cloud. Make sure your `Security Lists` in your `VCN` are configured properly.
