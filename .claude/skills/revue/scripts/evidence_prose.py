#!/usr/bin/env python3
"""Axe prose — exécute lucid-lint sur les articles publiés (dogfood).

Usage : evidence_prose.py [--drafts]
Capture la sortie brute par article ; n'interprète pas. Si le binaire est
absent, le dit honnêtement (axe dégradé, jamais simulé).
"""

import json
import re
import shutil
import subprocess
import sys
import tomllib
from pathlib import Path


def racine() -> Path:
    out = subprocess.run(
        ["git", "rev-parse", "--show-toplevel"], capture_output=True, text=True, check=True
    )
    return Path(out.stdout.strip())


def est_draft(path: Path) -> bool:
    m = re.match(r"\+\+\+\n(.*?)\n\+\+\+", path.read_text(encoding="utf-8"), re.DOTALL)
    if not m:
        return False
    try:
        return tomllib.loads(m.group(1)).get("draft", False)
    except tomllib.TOMLDecodeError:
        return False


def main() -> int:
    binaire = shutil.which("lucid-lint")
    if not binaire:
        print(json.dumps({
            "script": "evidence_prose",
            "disponible": False,
            "message": "lucid-lint introuvable dans le PATH — axe prose non mesurable. "
                       "Installer depuis le dépôt sibling ; ne pas inventer de scores.",
        }, ensure_ascii=False, indent=2))
        return 0

    root = racine()
    inclure_drafts = "--drafts" in sys.argv
    resultats = []
    for article in sorted((root / "content/ecrits").glob("*/index.md")):
        if est_draft(article) and not inclure_drafts:
            continue
        try:
            run = subprocess.run(
                [binaire, "check", str(article)],
                capture_output=True, text=True, timeout=120,
            )
            sortie = (run.stdout + run.stderr).strip()
            resultats.append({
                "article": str(article.relative_to(root)),
                "code_retour": run.returncode,
                "sortie": sortie[:4000],
                "tronquee": len(sortie) > 4000,
            })
        except subprocess.TimeoutExpired:
            resultats.append({"article": str(article.relative_to(root)), "erreur": "timeout 120 s"})

    print(json.dumps({
        "script": "evidence_prose",
        "disponible": True,
        "binaire": binaire,
        "drafts_inclus": inclure_drafts,
        "articles": resultats,
    }, ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    sys.exit(main())
