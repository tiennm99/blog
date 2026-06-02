# Copy this repo's Codex prompt sources into the Codex prompts dir so they
# surface as /prompts:mt-* commands. Idempotent — re-run after editing prompts
# (Codex loads prompts from the home dir, not the repo, so edits need a re-sync).
$ErrorActionPreference = "Stop"

# Source dir = this script's own directory + \prompts
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$Src = Join-Path $ScriptDir "prompts"

# Target = $env:CODEX_HOME\prompts (default %USERPROFILE%\.codex\prompts)
$CodexHome = if ($env:CODEX_HOME) { $env:CODEX_HOME } else { Join-Path $env:USERPROFILE ".codex" }
$Dest = Join-Path $CodexHome "prompts"

New-Item -ItemType Directory -Force -Path $Dest | Out-Null

$count = 0
Get-ChildItem -Path (Join-Path $Src "*.md") | ForEach-Object {
    Copy-Item -Path $_.FullName -Destination $Dest -Force
    Write-Host "  copied $($_.Name) -> $Dest\"
    $count++
}

Write-Host "Done. Synced $count prompt(s) to $Dest"
Write-Host "Use them in a Codex session as /prompts:mt-add-url <url> (etc.)."
