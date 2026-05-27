# Tâches zola courantes pour bastiengallay.com.
#
# Convention figée d'après les sessions réelles :
#   - serve TOUJOURS en --drafts (mode de test local par défaut)
#   - --interface 127.0.0.1 par défaut (`serve`) ; exposition LAN seulement
#     via `serve-lan`, opt-in explicite
#   - port stable par worktree (voir scripts/zola-port.sh)
#
# `just` (sans argument) liste les recettes.

# Un seul domaine (zola) -> pas de préfixe sur les noms : ce serait du bruit.
# Si d'autres outils arrivent (assets, db…), regrouper avec l'attribut
# [group('zola')] plutôt que des préfixes `zola-*` manuels.

set shell := ["bash", "-uc"]

# Port stable de CE checkout (copie principale = 1111, worktree = 1112..1189)
port := `bash scripts/zola-port.sh`

# IP LAN de cette machine (interface Wi-Fi en0), pour `serve-lan`
lan_ip := `ipconfig getifaddr en0 2>/dev/null || echo 127.0.0.1`

# Liste les recettes disponibles
default:
    @just --list --unsorted

# Affiche le port résolu pour ce checkout
port:
    @echo {{port}}

# Sert le site en local avec drafts (tue d'abord un éventuel serveur sur ce port)
serve *ARGS: kill
    zola serve --drafts --interface 127.0.0.1 --port {{port}} {{ARGS}}

# Attention : écoute sur 0.0.0.0 et expose les DRAFTS à tout le LAN.
# --base-url = IP LAN, sinon le live-reload pointe vers 127.0.0.1 et casse.

# Sert sur le RÉSEAU LOCAL (téléphone, autre poste) — opt-in explicite
serve-lan *ARGS: kill
    @echo "→ http://{{lan_ip}}:{{port}} (drafts exposés sur le réseau local)"
    zola serve --drafts --interface 0.0.0.0 --port {{port}} --base-url {{lan_ip}} {{ARGS}}

# Vérifie que le serveur de CE port répond (à lancer après `just serve` en arrière-plan)
ping:
    @for i in 1 2 3 4 5; do \
       if curl -sfI http://127.0.0.1:{{port}}/ >/dev/null 2>&1; then \
         echo "✓ zola répond sur http://127.0.0.1:{{port}}"; exit 0; fi; \
       sleep 1; \
     done; \
     echo "✗ aucune réponse sur :{{port}} après 5s"; exit 1

# Build de production (sans drafts), erreurs en clair
build *ARGS:
    zola build {{ARGS}} 2>&1 | tail -20

# Build propre : repart de zéro
rebuild *ARGS:
    rm -rf public && zola build {{ARGS}} 2>&1 | tail -20

# Vérifie liens internes et contenu (drafts inclus, liens externes ignorés)
check:
    zola check --drafts --skip-external-links 2>&1 | tail -20

# Tue le serveur zola de CE port s'il tourne
kill:
    @pids=$(lsof -tiTCP:{{port}} -sTCP:LISTEN 2>/dev/null || true); \
     if [ -n "$pids" ]; then kill $pids 2>/dev/null && echo "zola :{{port}} arrêté"; fi; true

# Tue TOUS les serveurs zola de la machine (dépannage)
kill-all:
    @pkill -f 'zola serve' 2>/dev/null && echo "tous les zola serve arrêtés" || echo "aucun zola serve"

# Seul moteur fiable qui honore les @font-face embarqués (base64) :
# rsvg / inkscape / imagemagick / qlmanage retombent sur une police système ou
# rognent l'image. Taille lue depuis width/height du SVG (défaut 1200×630).
# Sortie : <svg sans ext>.png. Override du binaire via $CHROME.
# Usage : just svg-png content/.../social-cover.svg [scale]   (scale=2 → 2×)
# Rend un SVG en PNG fidèle via Chrome headless (polices embarquées honorées)
[group('assets')]
svg-png svg scale="1":
    #!/usr/bin/env bash
    set -euo pipefail
    chrome="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
    [ -x "$chrome" ] || { echo "✗ Chrome introuvable : $chrome (override via \$CHROME)"; exit 1; }
    svg="{{svg}}"; png="${svg%.svg}.png"
    dims=$(grep -oE 'width="[0-9]+" height="[0-9]+"' "$svg" | head -1 | grep -oE '[0-9]+' || true)
    w=$(printf '%s\n' "$dims" | sed -n 1p); h=$(printf '%s\n' "$dims" | sed -n 2p)
    "$chrome" --headless=new --disable-gpu --hide-scrollbars \
      --default-background-color=00000000 --force-device-scale-factor={{scale}} \
      --window-size="${w:-1200},${h:-630}" --screenshot="$png" "$svg"
    echo "→ $png (${w:-1200}×${h:-630} @ {{scale}}×)"
