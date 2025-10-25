#!/usr/bin/env bash
set -euo pipefail

SUBMODULE="audiodepot"

echo "➡️  Cleaning stray submodule: $SUBMODULE"

# Ensure we're inside a git repo
git rev-parse --is-inside-work-tree >/dev/null 2>&1 || {
  echo "❌ Not inside a git repository. cd into your project first."; exit 1;
}

# Optional: warn if there are uncommitted changes
if ! git diff --quiet || ! git diff --cached --quiet; then
  echo "⚠️  You have uncommitted changes. The script will still proceed."
fi

# Deinit (ignore error if not present)
echo "• Deinitializing submodule (if present)…"
git submodule deinit -f -- "$SUBMODULE" 2>/dev/null || true

# Remove submodule path from index (ignore if not tracked)
echo "• Removing submodule path from index (if tracked)…"
git rm -f "$SUBMODULE" 2>/dev/null || true

# Kill leftover metadata
echo "• Removing leftover metadata at .git/modules/$SUBMODULE (if exists)…"
rm -rf ".git/modules/$SUBMODULE" 2>/dev/null || true

# Remove .gitmodules if present (or scrub the entry)
if [[ -f ".gitmodules" ]]; then
  echo "• Found .gitmodules — removing it (Netlify will skip submodules)…"
  git rm -f .gitmodules || true
  # Just in case it was already unstaged:
  rm -f .gitmodules 2>/dev/null || true
fi

# Also remove submodule section from local .git/config if present
echo "• Scrubbing submodule section from .git/config (if present)…"
git config -f .git/config --remove-section "submodule.$SUBMODULE" 2>/dev/null || true

# Stage everything and commit
echo "• Staging changes…"
git add -A

if git diff --cached --quiet; then
  echo "✅ Nothing to commit (already clean)."
else
  echo "• Committing…"
  git commit -m "ci: remove stray submodule configuration ($SUBMODULE)"
  echo "• Pushing…"
  CURRENT_BRANCH="$(git rev-parse --abbrev-ref HEAD)"
  git push origin "$CURRENT_BRANCH"
fi

echo "✅ Done. Re-run your Netlify build."