# Roadmap

Ideas not yet scheduled. Move an item into a plan once it is decided.

## Cloudflare Browser Run as a fetch tier for `mt-fetch-url`

Cloudflare's Browser Run (formerly Browser Rendering) `/markdown` quick action renders a URL in Cloudflare's headless browser and returns Markdown:

```bash
curl -X POST "https://api.cloudflare.com/client/v4/accounts/$CF_ACCOUNT_ID/browser-run/markdown" \
  -H "Authorization: Bearer $CF_BROWSER_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"url":"https://example.com","gotoOptions":{"waitUntil":"networkidle2"}}'
# -> {"success": true, "result": "<markdown>"}
```

- **Why:** it fetches from a different exit IP than this machine, which local agent-browser cannot.
- **Limits:** requests are signed as a bot (Web Bot Auth), so it is not expected to pass bot challenges. The free plan allows 10 browser-minutes a day and 6 REST requests a minute.
- **Blocked on:** a Cloudflare account ID and an API token with only the Browser Run – Edit permission, kept in environment variables and never committed.
- **Done when:** the token is configured, testing shows it recovers pages the current chain (WebFetch → defuddle → defuddle.md → reader proxy → agent-browser) misses, and it is added to `.claude/skills/mt-fetch-url/SKILL.md` as the last tier.
- **Docs:** [Browser Run /markdown](https://developers.cloudflare.com/browser-run/quick-actions/markdown-endpoint/), [limits](https://developers.cloudflare.com/browser-rendering/limits/).
