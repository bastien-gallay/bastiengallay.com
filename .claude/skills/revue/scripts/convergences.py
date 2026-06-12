#!/usr/bin/env python3
"""Convergences inter-axes — propose, le LLM dispose.

Charge le dernier findings JSON de chaque axe et groupe les findings `ouvert`
qui partagent des fichiers ou du vocabulaire. Une coïncidence de mots n'est
pas une convergence : la sortie est une liste de CANDIDATS à valider.
"""

import json
import re
import subprocess
import sys
import unicodedata
from collections import defaultdict
from pathlib import Path

STOPWORDS = {
    "dans", "avec", "pour", "site", "page", "pages", "sans", "entre", "tous",
    "toutes", "plus", "vers", "être", "etre", "fichier", "fichiers", "depuis",
}


def racine() -> Path:
    out = subprocess.run(
        ["git", "rev-parse", "--show-toplevel"], capture_output=True, text=True, check=True
    )
    return Path(out.stdout.strip())


def tokens(titre: str) -> set[str]:
    sans_accents = unicodedata.normalize("NFKD", titre.lower()).encode("ascii", "ignore").decode()
    return {t for t in re.findall(r"[a-z0-9-]{5,}", sans_accents) if t not in STOPWORDS}


def main() -> int:
    findings_dir = (racine() / ".personal/revues/findings").resolve()
    if not findings_dir.exists():
        print(json.dumps({"erreur": f"{findings_dir} absent."}))
        return 1

    derniers: dict[str, dict] = {}
    for f in sorted(findings_dir.glob("*.json")):
        data = json.loads(f.read_text(encoding="utf-8"))
        if "axe" in data:
            derniers[data["axe"]] = data  # le tri par nom garde le plus récent

    par_fichier: dict[str, list] = defaultdict(list)
    entrees = []
    for axe, data in derniers.items():
        for fd in data.get("findings", []):
            if fd.get("statut") != "ouvert":
                continue
            entree = {"axe": axe, "id": fd.get("id"), "titre": fd.get("titre", "")}
            entrees.append((entree, tokens(fd.get("titre", ""))))
            for fichier in fd.get("fichiers", []):
                par_fichier[fichier].append(entree)

    groupes = []
    for fichier, liste in par_fichier.items():
        axes = {e["axe"] for e in liste}
        if len(axes) >= 2:
            groupes.append({"type": "fichier_partage", "cle": fichier, "findings": liste})

    deja = [{f["id"] for f in g["findings"]} for g in groupes]
    for i, (e1, t1) in enumerate(entrees):
        for e2, t2 in entrees[i + 1:]:
            if e1["axe"] == e2["axe"] or any({e1["id"], e2["id"]} <= ids for ids in deja):
                continue
            communs = t1 & t2
            if len(communs) >= 2:
                groupes.append({
                    "type": "vocabulaire_commun", "cle": sorted(communs)[:4],
                    "findings": [e1, e2],
                })

    print(json.dumps({
        "script": "convergences",
        "axes_charges": sorted(derniers),
        "candidats": groupes[:25],
        "note": "Candidats à VALIDER par jugement — le partage d'un fichier ou de mots "
                "ne fait pas une convergence à lui seul.",
    }, ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    sys.exit(main())
