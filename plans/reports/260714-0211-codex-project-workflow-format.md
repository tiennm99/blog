---
title: Research Report - Codex Project Workflow Format
date: 2026-07-14T02:11:00Z
status: complete
---

# Research Report: Codex Project Workflow Format

## Summary

Use `.agents/skills/<name>/SKILL.md` for checked-in Codex newsletter workflows. Do not restore `codex/prompts/` or its installers: OpenAI marks custom prompts deprecated, and those prompts are user-local rather than repository-shared. Use `.codex/config.toml` only when the repository needs Codex runtime settings such as model, sandbox, approvals, MCP, hooks, or rules.

## Navigation

- [Method](#method)
- [Findings](#findings)
- [Decision](#decision)
- [Implementation](#implementation)
- [References](#references)
- [Unresolved questions](#unresolved-questions)

## Method

- Researched: 2026-07-14 UTC
- Checked installed CLI: `codex-cli 0.144.3`
- Consulted current official Codex manual sections for skills, custom prompts, customization, and project config
- Compared official locations against the repository's deleted `codex/prompts/` installer design

## Findings

### `.agents/skills` is the official workflow location

Codex scans `.agents/skills` from the working directory through the repository root. Each skill is a directory containing `SKILL.md`, with optional scripts and references. Skills support explicit `$skill-name` invocation and implicit selection from their descriptions.

### Custom prompts are deprecated

The former `~/.codex/prompts` mechanism still exists for compatibility but is deprecated. It requires local installation, only supports explicit slash invocation, and does not travel with a repository. Restoring the old installer would preserve a legacy surface instead of fixing the underlying layout.

### `.codex` has a different purpose

Project `.codex/config.toml` is for trusted-repository runtime configuration. It is appropriate for model, approval, sandbox, MCP, hook, or rules overrides. This newsletter integration only needs reusable workflow instructions, so adding project config would be unnecessary.

## Comparative analysis

| Format | Official role | Repo-shared | Invocation | Decision |
|---|---|---:|---|---|
| `.agents/skills/<name>/SKILL.md` | Reusable workflow | Yes | Explicit or implicit | Use |
| `.codex/config.toml` | Codex runtime settings | Yes, trusted repos | Automatic config | Not needed |
| `~/.codex/prompts/*.md` | Deprecated custom prompts | No | Explicit slash command | Remove |
| `codex/prompts/` plus installer | Repository workaround | Indirect copy | Explicit slash command | Do not restore |

## Decision

Add thin Codex-native skills under `.agents/skills/`. They delegate to the existing canonical `.claude/skills/mt-*` workflow files, avoiding instruction drift while keeping the deterministic Node scripts in `scripts/newsletter/` shared by every tool.

## Implementation

```text
.agents/skills/mt-*/SKILL.md
        │
        └── reads canonical .claude/skills/mt-*/SKILL.md
                              │
                              └── runs scripts/newsletter/*.js
```

No installation or synchronization command is required. Launch Codex at the repository root and use `$mt-add-url`, or describe the newsletter task normally for implicit matching.

## Security and performance

- No new executable installer or home-directory writes.
- No project-level sandbox or approval override.
- Progressive disclosure loads skill instructions only after selection; runtime cost is limited to small skill metadata before invocation.

## References

- [OpenAI: Build skills](https://learn.chatgpt.com/docs/build-skills)
- [OpenAI: Custom prompts](https://learn.chatgpt.com/docs/custom-prompts)
- [OpenAI: Codex customization](https://learn.chatgpt.com/docs/customization/overview)
- [OpenAI: Config basics](https://learn.chatgpt.com/docs/config-file/config-basic)

## Next steps

1. Keep `.agents/skills` adapters and canonical `.claude/skills` workflows in sync only when a workflow name is added or removed.
2. Add `.codex/config.toml` later only if the project needs shared Codex runtime policy.

## Unresolved questions

None.
