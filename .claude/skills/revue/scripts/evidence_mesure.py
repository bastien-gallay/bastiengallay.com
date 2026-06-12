#!/usr/bin/env python3
"""Axe mesure / pilotage — PROTOTYPE INACTIF par défaut.

Sans .personal/revues/mesure.toml : répond {"actif": false} et explique
comment activer. Avec config + --collecter : collecte ce qui est collectable
(stars GitHub via gh ; le reste est saisie manuelle ou hors allowlist réseau).
L'activation est une décision de l'utilisateur, jamais du skill.
"""

import json
import os
import subprocess
import sys
import tomllib
from pathlib import Path


def racine() -> Path:
    out = subprocess.run(
        ["git", "rev-parse", "--show-toplevel"], capture_output=True, text=True, check=True
    )
    return Path(out.stdout.strip())


def stars(repo: str) -> int | str:
    try:
        run = subprocess.run(
            ["gh", "api", f"repos/{repo}", "--jq", ".stargazers_count"],
            capture_output=True, text=True, timeout=30,
        )
        return int(run.stdout.strip()) if run.returncode == 0 else f"erreur gh : {run.stderr.strip()[:120]}"
    except (FileNotFoundError, ValueError, subprocess.TimeoutExpired) as e:
        return f"indisponible ({e.__class__.__name__})"


def main() -> int:
    config_path = (racine() / ".personal/revues/mesure.toml").resolve()
    if not config_path.exists():
        print(json.dumps({
            "script": "evidence_mesure",
            "actif": False,
            "raison": "Pas de .personal/revues/mesure.toml — l'axe mesure est prototypé mais inactif.",
            "comment_activer": [
                "Décision utilisateur explicite requise (jamais d'auto-activation).",
                "Déclencheurs écrits : > 500 visites/sem au beacon, OU lancement EN, OU ≥ 80 abonnés.",
                "Créer mesure.toml d'après le modèle de reference/axe-mesure.md.",
            ],
        }, ensure_ascii=False, indent=2))
        return 0

    config = tomllib.loads(config_path.read_text(encoding="utf-8"))
    if "--collecter" not in sys.argv:
        print(json.dumps({"script": "evidence_mesure", "actif": True,
                          "config": str(config_path),
                          "note": "Config présente. Lancer avec --collecter pour mesurer."},
                         ensure_ascii=False, indent=2))
        return 0

    collecte: dict = {"github_stars": {}}
    for repo in config.get("depots", {}).get("github", []):
        collecte["github_stars"][repo] = stars(repo)
    if config.get("buttondown", {}).get("actif"):
        collecte["buttondown"] = (
            "non collecté : api.buttondown.com hors allowlist réseau du sandbox — "
            "demander l'autorisation ou saisir manuellement."
            if not os.environ.get("BUTTONDOWN_API_KEY")
            else "clé présente — collecte à faire hors sandbox ou avec autorisation réseau."
        )
    collecte["saisie_manuelle"] = config.get("saisie_manuelle", {})

    print(json.dumps({"script": "evidence_mesure", "actif": True, "collecte": collecte},
                     ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    sys.exit(main())
