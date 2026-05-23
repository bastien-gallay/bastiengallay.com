#!/usr/bin/env bash
# Port zola serve stable par worktree.
#
#   copie principale  -> 1111
#   worktree          -> 1112..1189 (dérivé du chemin, donc stable et sans collision)
#
# Pourquoi : les sessions passées passaient leur temps à chercher un port libre
# (1111 -> 1112 -> 1113 -> 1114 -> 4321). Un port déterministe par worktree
# laisse la copie principale et chaque worktree tourner en parallèle sans juggling.
set -euo pipefail

git_dir="$(git rev-parse --git-dir 2>/dev/null || echo)"

if [[ "$git_dir" != *"/worktrees/"* ]]; then
  echo 1111
else
  top="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"
  hash="$(printf '%s' "$top" | cksum | cut -d' ' -f1)"
  echo $(( 1112 + hash % 78 ))
fi
