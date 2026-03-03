#!/bin/bash
# URL preparation script for miti-add-post skill
# Usage: prepare_url.sh "<url>"
# Outputs: JSON with status, clean_url, type, accessible, duplicate

set -euo pipefail

URL="$1"

# Remove tracking parameters
clean_url() {
    local url="$1"
    # Remove common tracking parameters
    url=$(echo "$url" | sed -E 's/[?&](utm_[^&]*|fbclid|gclid|msclkid|mc_eid)[^&]*//g')
    # Clean up trailing ? or &
    url=$(echo "$url" | sed -E 's/[?&]$//')
    echo "$url"
}

# Check if URL is accessible (returns HTTP status code)
check_accessibility() {
    local url="$1"
    # Use curl to get HTTP status only
    curl -s -o /dev/null -w "%{http_code}" -L --max-time 10 "$url" 2>/dev/null || echo "000"
}

# Check if URL is duplicate in project
check_duplicate() {
    local url="$1"
    local project_root="$2"
    if grep -rF "$url" "$project_root/content" 2>/dev/null; then
        echo "true"
    else
        echo "false"
    fi
}

# Classify URL type
classify_url() {
    local url="$1"
    local lower_url=$(echo "$url" | tr '[:upper:]' '[:lower:]')

    # Check for direct assets
    if echo "$lower_url" | grep -qE '\.(png|jpg|jpeg|gif|webp|svg)(\?.*)?$'; then
        echo "image"
    elif echo "$lower_url" | grep -qE '\.(mp4|webm|mov|avi)(\?.*)?$'; then
        echo "video"
    elif echo "$lower_url" | grep -qE '\.(pdf|doc|docx|xls|xlsx)(\?.*)?$'; then
        echo "document"
    else
        echo "article"
    fi
}

# Main execution
CLEAN_URL=$(clean_url "$URL")
HTTP_STATUS=$(check_accessibility "$CLEAN_URL")
IS_ACCESSIBLE="false"
if [ "$HTTP_STATUS" = "200" ]; then
    IS_ACCESSIBLE="true"
fi

# Get project root (assumes we're in .claude/skills/miti-add-post/scripts)
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../../.." && pwd)"
IS_DUPLICATE=$(check_duplicate "$CLEAN_URL" "$PROJECT_ROOT")
URL_TYPE=$(classify_url "$CLEAN_URL")

# Output JSON
cat <<EOF
{
  "original_url": "$URL",
  "clean_url": "$CLEAN_URL",
  "http_status": "$HTTP_STATUS",
  "accessible": $IS_ACCESSIBLE,
  "duplicate": $IS_DUPLICATE,
  "type": "$URL_TYPE"
}
EOF
