#!/usr/bin/env python3
"""Relecture de la passe précédente d'un axe — la base de la reprise incrémentale.

Usage : relecture.py --axe <editoriale|visuelle|tech|prose> [--fichier chemin.json]
Triage des findings `ouvert` du dernier run : à revérifier (fichiers modifiés
depuis), inchangé (zone intacte), fichier disparu. Sortie : JSON sur stdout.
"""

import argparse
import json
import subprocess
import sys
from pathlib import Path


def racine() -> Path:
    out = subprocess.run(
        ["git", "rev-parse", "--show-toplevel"], capture_output=True, text=True, check=True
    )
    return Path(out.stdout.strip())


def dernier_run(findings_dir: Path, axe: str) -> Path | None:
    candidats = sorted(findings_dir.glob(f"*-{axe}.json"))
    return candidats[-1] if candidats else None


def commits_depuis(root: Path, date: str, fichier: str) -> list[str]:
    run = subprocess.run(
        ["git", "log", "--oneline", f"--since={date}", "--", fichier],
        capture_output=True, text=True, cwd=root,
    )
    return [l for l in run.stdout.strip().splitlines() if l]


def zones_modifiees(root: Path, date: str) -> list[str]:
    run = subprocess.run(
        ["git", "log", "--name-only", f"--since={date}", "--pretty=format:"],
        capture_output=True, text=True, cwd=root,
    )
    vus: dict[str, int] = {}
    for ligne in run.stdout.splitlines():
        if ligne.strip():
            vus[ligne.strip()] = vus.get(ligne.strip(), 0) + 1
    return [f for f, _ in sorted(vus.items(), key=lambda kv: -kv[1])][:40]


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--axe")
    ap.add_argument("--fichier")
    args = ap.parse_args()

    root = racine()
    findings_dir = (root / ".personal/revues/findings").resolve()

    if args.fichier:
        source = Path(args.fichier)
    elif args.axe:
        if not findings_dir.exists():
            print(json.dumps({"erreur": f"{findings_dir} absent — aucun run précédent (première passe : pas de relecture)."}))
            return 0
        source = dernier_run(findings_dir, args.axe)
        if source is None:
            print(json.dumps({"axe": args.axe, "run_precedent": None,
                              "message": "Aucun run précédent pour cet axe — passe inaugurale, pas de relecture."}))
            return 0
    else:
        ap.error("--axe ou --fichier requis")
        return 2

    data = json.loads(source.read_text(encoding="utf-8"))
    date = data.get("date", "1970-01-01")
    triage = {"a_reverifier": [], "inchange": [], "fichier_disparu": []}

    def a_un_historique(fi: str) -> bool:
        run = subprocess.run(
            ["git", "log", "--oneline", "-1", "--", fi],
            capture_output=True, text=True, cwd=root,
        )
        return bool(run.stdout.strip())

    for f in data.get("findings", []):
        if f.get("statut") != "ouvert":
            continue
        fichiers = f.get("fichiers", [])
        entree = {"id": f.get("id"), "titre": f.get("titre"), "fichiers": fichiers}
        if any(commits_depuis(root, date, fi) for fi in fichiers):
            # Du mouvement depuis le run (création, modif ou suppression) → re-juger.
            entree["commits"] = {fi: commits_depuis(root, date, fi)[:5] for fi in fichiers}
            triage["a_reverifier"].append(entree)
            continue
        disparus_avec_historique = [
            fi for fi in fichiers
            if not (root / fi).exists() and a_un_historique(fi)
        ]
        if disparus_avec_historique:
            # A existé puis a été retiré avant ce run : à requalifier (perime ?).
            entree["disparus"] = disparus_avec_historique
            triage["fichier_disparu"].append(entree)
        else:
            # Zone intacte — y compris un fichier toujours absent quand le
            # finding porte précisément sur son absence (ex. 404 manquante).
            triage["inchange"].append(entree)

    print(json.dumps({
        "axe": data.get("axe", args.axe),
        "run_precedent": str(source),
        "date_precedente": date,
        "triage": triage,
        "compte": {k: len(v) for k, v in triage.items()},
        "refutes_anti_reouverture": data.get("refutes", []),
        "zones_modifiees_depuis": zones_modifiees(root, date),
        "conseil": "Ne re-juger que `a_reverifier` et `fichier_disparu` ; "
                   "chasser du neuf dans `zones_modifiees_depuis` uniquement.",
    }, ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    sys.exit(main())
