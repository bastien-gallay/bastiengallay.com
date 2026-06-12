#!/usr/bin/env python3
"""Lignes de base des revues — lecture, mise à jour, tendance.

Usage :
  baselines.py show
  baselines.py maj --axe <axe> --cle <cle> --valeur <valeur> [--date AAAA-MM-JJ]
  baselines.py trend [--axe <axe>]

Fichier : .personal/revues/baselines.json (via le symlink .personal du checkout —
qui pointe physiquement sur la copie principale).
"""

import argparse
import datetime as dt
import json
import subprocess
import sys
from pathlib import Path


def chemin_baselines() -> Path:
    out = subprocess.run(
        ["git", "rev-parse", "--show-toplevel"], capture_output=True, text=True, check=True
    )
    return (Path(out.stdout.strip()) / ".personal/revues/baselines.json").resolve()


def charger(p: Path) -> dict:
    if p.exists():
        return json.loads(p.read_text(encoding="utf-8"))
    return {"axes": {}, "historique": []}


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("commande", choices=["show", "maj", "trend"])
    ap.add_argument("--axe")
    ap.add_argument("--cle")
    ap.add_argument("--valeur")
    ap.add_argument("--date", default=dt.date.today().isoformat())
    args = ap.parse_args()

    p = chemin_baselines()
    data = charger(p)

    if args.commande == "show":
        if not p.exists():
            print(json.dumps({"message": f"{p} absent — état non initialisé "
                              "(run fondateur : .personal/improvements/2026-06-11-revue-site/)."}))
            return 0
        print(json.dumps(data, ensure_ascii=False, indent=2))
        return 0

    if args.commande == "maj":
        if not (args.axe and args.cle and args.valeur is not None):
            ap.error("maj exige --axe, --cle, --valeur")
        try:
            valeur = json.loads(args.valeur)
        except json.JSONDecodeError:
            valeur = args.valeur
        data["axes"].setdefault(args.axe, {})[args.cle] = valeur
        data["axes"][args.axe]["date"] = args.date
        data["historique"].append(
            {"date": args.date, "axe": args.axe, "cle": args.cle, "valeur": valeur}
        )
        p.parent.mkdir(parents=True, exist_ok=True)
        p.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        print(json.dumps({"ecrit": str(p), "axe": args.axe, "cle": args.cle, "valeur": valeur}))
        return 0

    # trend
    historique = data.get("historique", [])
    if args.axe:
        historique = [h for h in historique if h["axe"] == args.axe]
    print(json.dumps(historique[-20:], ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    sys.exit(main())
