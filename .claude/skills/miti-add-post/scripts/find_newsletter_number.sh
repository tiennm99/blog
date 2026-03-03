#!/bin/bash
# Find the most recent newsletter number and return the next one
# Usage: find_newsletter_number.sh
# Outputs: The next newsletter number

set -euo pipefail

# Get project root
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../../.." && pwd)"
CONTENT_DIR="$PROJECT_ROOT/content/post"

# Get current date in YYYY/MM/DD format
CURRENT_YEAR=$(date +%Y)
CURRENT_MONTH=$(date +%m)
CURRENT_DAY=$(date +%d)

# Function to find newsletter number in a file
extract_newsletter_number() {
    local file="$1"
    # Look for "Newsletter #N" in front matter title or content
    grep -oP 'Newsletter\s*#\K\d+' "$file" 2>/dev/null | head -1 || echo "0"
}

# Function to search for newsletters in date order
find_most_recent_newsletter() {
    local max_number=0

    # Current month, going backwards by day
    for day in {31..1}; do
        local day_dir=$(printf "%02d" "$day")
        local check_path="$CONTENT_DIR/$CURRENT_YEAR/$CURRENT_MONTH/$day_dir/index.md"
        if [[ -f "$check_path" ]]; then
            local num=$(extract_newsletter_number "$check_path")
            if ((num > max_number)); then
                max_number=$num
            fi
        fi
    done

    # Previous months in current year
    for month in {12..1}; do
        if [[ $month -ge $CURRENT_MONTH ]]; then
            continue
        fi
        local month_dir=$(printf "%02d" "$month")
        for day in {31..1}; do
            local day_dir=$(printf "%02d" "$day")
            local check_path="$CONTENT_DIR/$CURRENT_YEAR/$month_dir/$day_dir/index.md"
            if [[ -f "$check_path" ]]; then
                local num=$(extract_newsletter_number "$check_path")
                if ((num > max_number)); then
                    max_number=$num
                fi
            fi
        done
    done

    # Previous years (check last 5 years)
    for year in $(seq $((CURRENT_YEAR - 1)) -1 $((CURRENT_YEAR - 5))); do
        for month in {12..1}; do
            local month_dir=$(printf "%02d" "$month")
            for day in {31..1}; do
                local day_dir=$(printf "%02d" "$day")
                local check_path="$CONTENT_DIR/$year/$month_dir/$day_dir/index.md"
                if [[ -f "$check_path" ]]; then
                    local num=$(extract_newsletter_number "$check_path")
                    if ((num > max_number)); then
                        max_number=$num
                    fi
                fi
            done
        done
    done

    echo $max_number
}

# Find most recent and increment
MOST_RECENT=$(find_most_recent_newsletter)
NEXT_NUMBER=$((MOST_RECENT + 1))

echo "$NEXT_NUMBER"
