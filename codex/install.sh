#!/usr/bin/env bash
# Copy this repo's Codex prompt sources into the Codex prompts dir so they
# surface as /prompts:mt-* commands. Idempotent — re-run after editing prompts
# (Codex loads prompts from the home dir, not the repo, so edits need a re-sync).
set -euo pipefail

# Source dir = this script's own directory + /prompts
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SRC="$SCRIPT_DIR/prompts"

# Target = $CODEX_HOME/prompts (default ~/.codex/prompts)
CODEX_HOME="${CODEX_HOME:-$HOME/.codex}"
DEST="$CODEX_HOME/prompts"

mkdir -p "$DEST"

count=0
for f in "$SRC"/*.md; do
  [ -e "$f" ] || continue
  cp -f "$f" "$DEST/"
  echo "  copied $(basename "$f") -> $DEST/"
  count=$((count + 1))
done

echo "Done. Synced $count prompt(s) to $DEST"
echo "Use them in a Codex session as /prompts:mt-add-url <url> (etc.)."
