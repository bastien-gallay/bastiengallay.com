#!/usr/bin/env python3
# /// script
# requires-python = ">=3.11"
# dependencies = []
# ///
"""
constellation.py — Relève l'activité git des astres et écrit `data/activity.json`.

Deux fichiers, deux natures, volontairement séparés :

  - `data/constellation.toml` — ce que j'AFFIRME (identité, famille, rôle),
    tenu à la main, jamais calculé ;
  - `data/activity.json` — ce qui est MESURÉ (commits, dernière date),
    généré par ce script, jamais édité à la main.

L'écart entre les deux est le contenu de `/now`. C'est pour ça qu'ils ne
fusionnent pas : un `/now` qui ne peut pas se contredire ne sert à rien.

Le script est LOCAL-ONLY (il lit les dépôts sur ma machine). Son produit est
commité, donc le build CI n'a jamais besoin de lui. Un dépôt absent du disque
n'est pas une erreur : il ressort `missing`, et le manque se voit sur la page.

Usage :
  uv run scripts/constellation.py            # écrit data/activity.json
  uv run scripts/constellation.py --check    # ne réécrit rien, sort 1 si périmé
"""
from __future__ import annotations

import json
import subprocess
import sys
import tomllib
from collections import Counter
from datetime import date, timedelta
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
SOURCE = REPO_ROOT / "data" / "constellation.toml"
TARGET = REPO_ROOT / "data" / "activity.json"

# Fenêtres de relevé, en jours. La courte dit le focus, la longue dit le poids.
WINDOWS = (7, 30)

# La fenêtre affichée sur la page ; l'autre sert d'appoint (infobulle).
MAIN_WINDOW = 30


def git(repo: Path, *args: str) -> str | None:
    """Sort du git dans `repo`, ou None si le dépôt est inutilisable."""
    try:
        done = subprocess.run(
            ("git", "-C", str(repo), *args),
            capture_output=True,
            text=True,
            timeout=20,
        )
    except (OSError, subprocess.TimeoutExpired):
        return None
    return done.stdout.strip() if done.returncode == 0 else None


def survey(
    repo: Path, calendar: list[str], active_within: int, dormant_after: int
) -> dict[str, object]:
    """Relève un dépôt : commits par fenêtre, série quotidienne, état."""
    last = git(repo, "log", "-1", "--format=%ad", "--date=short")
    if last is None:
        return {"status": "missing"}

    counts = {}
    for days in WINDOWS:
        out = git(repo, "rev-list", "--count", "HEAD", f"--since={days} days ago")
        counts[f"d{days}"] = int(out) if out and out.isdigit() else 0

    # Série quotidienne : un seul `git log` puis comptage, plutôt que 30 appels.
    # Indexée sur le calendrier commun pour que les colonnes de tous les dépôts
    # tombent sur les mêmes jours — sinon les rangées ne se comparent plus.
    log = git(repo, "log", f"--since={MAIN_WINDOW} days ago", "--format=%ad", "--date=short")
    per_day = Counter((log or "").split())
    series = [per_day.get(day, 0) for day in calendar]

    last_date = date.fromisoformat(last)
    days_since = (date.today() - last_date).days
    if days_since <= active_within:
        state = "actif"
    elif days_since <= dormant_after:
        state = "ralenti"
    else:
        state = "dormant"

    return {
        "status": "ok",
        "last_commit": last,
        "days_since": days_since,
        "state": state,
        "series": series,
        **counts,
    }


def config() -> dict[str, object]:
    return tomllib.loads(SOURCE.read_text(encoding="utf-8"))


def build() -> dict[str, object]:
    conf = config()
    root = Path(conf["root"]).expanduser()
    active_within = conf["thresholds"]["active_days"]
    dormant_after = conf["thresholds"]["dormant_days"]

    # Calendrier commun, du plus ancien au plus récent, aujourd'hui inclus.
    today = date.today()
    calendar = [
        (today - timedelta(days=n)).isoformat()
        for n in range(MAIN_WINDOW - 1, -1, -1)
    ]

    repos = {}
    for astre in conf["astres"]:
        repos[astre["name"]] = survey(
            root / astre["path"], calendar, active_within, dormant_after
        )

    alive = [r for r in repos.values() if r["status"] == "ok"]

    # Échelle des barres : le plus actif vaut la largeur pleine. Calculée ici et
    # non dans le template — Tera n'a pas de max sur les valeurs d'une table, et
    # une échelle implicite est une échelle qu'on ne peut pas contester.
    scale_max = max((r[f"d{MAIN_WINDOW}"] for r in alive), default=0)

    # Death match : l'astre le plus longtemps silencieux, s'il a franchi le
    # seuil de dormance. Le template en fait une question, pas un verdict.
    dormant = [r for r in alive if r["days_since"] > dormant_after]
    challenger = max(dormant, key=lambda r: r["days_since"], default=None)
    challenger_name = next(
        (name for name, r in repos.items() if r is challenger), None
    )

    # Échelle du graphique quotidien : commune à toutes les rangées, sinon un
    # dépôt calme paraîtrait aussi actif que le plus actif.
    series_max = max((max(r["series"]) for r in alive if r["series"]), default=0)

    return {
        "_comment": "Généré par scripts/constellation.py — ne pas éditer à la main.",
        "surveyed_on": date.today().isoformat(),
        "windows": list(WINDOWS),
        "main_window": MAIN_WINDOW,
        "calendar": calendar,
        "scale_max": scale_max,
        "series_max": series_max,
        "challenger": {"name": challenger_name, "days_since": challenger["days_since"]}
        if challenger
        else None,
        "repos": repos,
    }


def check() -> int:
    """Sort 1 si `activity.json` manque ou a dépassé le seuil de fraîcheur."""
    if not TARGET.exists():
        print(f"✗ {TARGET.relative_to(REPO_ROOT)} absent — lancer `just releve`")
        return 1

    limit = config()["thresholds"]["survey_stale_days"]
    surveyed = date.fromisoformat(json.loads(TARGET.read_text())["surveyed_on"])
    age = (date.today() - surveyed).days
    if age > limit:
        print(f"✗ relevé du {surveyed} — {age} jours, seuil {limit}")
        return 1

    print(f"✓ relevé du {surveyed} — {age} jour(s)")
    return 0


def main(argv: list[str]) -> int:
    if "--check" in argv:
        return check()

    data = build()
    TARGET.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

    if data["challenger"]:
        c = data["challenger"]
        print(f"  ⚔️  death match : {c['name']} ({c['days_since']} j de silence)")
    for name, r in data["repos"].items():
        if r["status"] != "ok":
            print(f"  ⚠️  {name:<14} dépôt introuvable sur ce disque")
        else:
            print(
                f"  {name:<14} 7j:{r['d7']:>4}  30j:{r['d30']:>4}"
                f"  dernier: {r['last_commit']} (il y a {r['days_since']} j)"
            )
    print(f"→ {TARGET.relative_to(REPO_ROOT)}")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
