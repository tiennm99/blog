---
title: "Fixing 'Pairing Required' When Connecting to OpenClaw via Docker"
date: 2026-04-05
tags: ["AI-Assisted", "OpenClaw", "Docker", "Self-hosted"]
categories: ["Sharing"]
---

If you're self-hosting [OpenClaw](https://github.com/open-claw/open-claw) with Docker and run into the **"disconnected (1008): pairing required"** error when accessing it from your browser, this post will help you fix it quickly.

## Problem

After setting up OpenClaw with Docker on Ubuntu, the browser shows:

```
disconnected (1008): pairing required
```

Trying to use the CLI to approve the device then fails with **"gateway token mismatch"** — the CLI inside the Docker container doesn't properly resolve the authentication token from the config file.

## Cause

There is an authentication token mismatch between the host and the Docker container. The CLI inside the container fails to read the right token from `openclaw.json`, which prevents it from listing or approving devices.

## How to Fix

### Step 1: Get the Gateway Token from the Host

```bash
cat ~/.openclaw/openclaw.json | grep -A5 '"auth"'
```

Copy the token value under `gateway.auth`.

### Step 2: Check the Token Inside the Container

```bash
docker ps  # Get the CONTAINER_ID of openclaw-gateway
docker exec -it <CONTAINER_ID> cat /home/node/.openclaw/openclaw.json | grep -A5 '"auth"'
```

Verify whether the token on the host matches the one inside the container.

### Step 3: List Devices with a Token Override

Inject the token directly via the `-e` environment variable flag when running the command in the container:

```bash
docker exec -e OPENCLAW_GATEWAY_TOKEN=<YOUR_TOKEN> -it <CONTAINER_ID> \
  openclaw devices list
```

This command will display the list of devices waiting for approval along with their **Request ID**.

### Step 4: Approve the Device

```bash
docker compose exec openclaw-gateway \
  openclaw devices approve <REQUEST_ID>
```

### Step 5: Verify the Result

Reload `http://localhost:18789` in your browser — the pairing error will be gone.

## Note

The key to this fix is injecting the token via an environment variable (`-e OPENCLAW_GATEWAY_TOKEN=...`) rather than passing it as a command-line flag, because the CLI inside Docker doesn't handle the token flag properly.

## References

- [Fixing OpenClaw Docker's "Pairing Required" Dead End on Ubuntu - Rik Banerjee](https://www.linkedin.com/pulse/fixing-openclaw-dockers-pairing-required-dead-end-ubuntu-rik-banerjee-j09de/)
