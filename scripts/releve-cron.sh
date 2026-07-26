#!/bin/bash
#
# releve-cron.sh — Relève automatique quotidienne, lancée par launchd.
#
# Le pendant machine de `just releve` : même mesure, plus le commit et le push.
# Voir scripts/constellation.py pour ce qui est mesuré et pourquoi la mesure
# vit dans un fichier séparé de ce que j'affirme.
#
# Trois principes de conception, dans l'ordre d'importance :
#
#   1. Le job ne touche QUE `data/activity.json`. Toute autre modification dans
#      l'arbre le fait abandonner — il n'a pas à deviner ce qu'elle est.
#   2. Il ne répare rien. Divergence avec origin, dépôt sale, relevé en échec :
#      il s'arrête et l'écrit dans le log. Un job qui rebase tout seul à 7h du
#      matin est un job qu'on découvre trop tard.
#   3. Il ne signe pas. Le commit atteste d'une mesure faite par une machine,
#      pas d'une intention ; et une signature qui dépend de gpg-agent réveillé
#      rendrait le job aléatoire. Voir `git -c commit.gpgsign=false` plus bas.
#
# Le fichier change tous les jours même si aucun dépôt n'a bougé : la fenêtre de
# 30 jours glisse. Le `git diff --quiet` ne sert donc pas à espacer les commits,
# mais à rendre le job idempotent s'il tourne deux fois le même jour.
#
# Installation / désinstallation : `just cron-install` / `just cron-uninstall`.
# Log : `just cron-log`.

set -uo pipefail

# launchd ne fournit pas le PATH d'un shell de connexion.
export PATH="/opt/homebrew/bin:$HOME/.local/bin:/usr/bin:/bin:/usr/sbin:/sbin"

REPO="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

say() { printf '%s  %s\n' "$(date '+%Y-%m-%d %H:%M:%S')" "$*"; }
abort() { say "✗ $*"; exit 1; }

cd "$REPO" || abort "checkout introuvable : $REPO"

branch="$(git rev-parse --abbrev-ref HEAD 2>/dev/null)" || abort "pas un dépôt git"
[ "$branch" = "main" ] || abort "branche « $branch » — le job ne tourne que sur main"

dirty="$(git status --porcelain -- ':(exclude)data/activity.json')"
[ -z "$dirty" ] || abort "arbre sale hors du relevé — rien touché :"$'\n'"$dirty"

git fetch --quiet origin main || abort "fetch impossible (réseau ? identifiants ?)"

behind="$(git rev-list --count HEAD..origin/main)"
[ "$behind" = "0" ] || abort "main a $behind commit(s) de retard sur origin — à rebaser à la main"

# Des commits locaux non poussés partiraient dans le push qui suit. Ils sont
# peut-être prêts, peut-être pas : ce n'est pas au job d'en décider.
ahead="$(git rev-list --count origin/main..HEAD)"
[ "$ahead" = "0" ] || abort "main a $ahead commit(s) non poussé(s) — à pousser à la main d'abord"

uv run scripts/constellation.py || abort "constellation.py a échoué"

if git diff --quiet -- data/activity.json; then
    say "= relevé inchangé, rien à commiter"
    exit 0
fi

git -c commit.gpgsign=false commit --quiet -- data/activity.json \
    -m "chore(now): relevé du $(date '+%Y-%m-%d')" \
    || abort "commit refusé"

git push --quiet origin main || abort "push refusé — le commit reste local"

say "✓ relevé poussé ($(git rev-parse --short HEAD)) — GitHub Pages rebuild"
