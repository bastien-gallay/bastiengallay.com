#!/usr/bin/env python3
"""Évidence machine de l'axe éditorial — mesure, ne juge pas.

Checks : fraîcheur /now, ordre des séries, contrat front-matter, doublons de
numéros, signatures vs liste figée, TODO dans content/, liens commentés,
liens publiés → drafts. Sortie : JSON sur stdout.
"""

import datetime as dt
import json
import re
import subprocess
import sys
import tomllib
from pathlib import Path

FROZEN_SIGNATURES = ".personal/research/2026-05-26-signatures-serie-coder-avec-l-ia.md"


def racine() -> Path:
    out = subprocess.run(
        ["git", "rev-parse", "--show-toplevel"], capture_output=True, text=True, check=True
    )
    return Path(out.stdout.strip())


def front_matter(path: Path) -> tuple[dict, str, int]:
    """Retourne (front-matter, corps, décalage de lignes du corps dans le fichier)."""
    text = path.read_text(encoding="utf-8")
    m = re.match(r"\+\+\+\n(.*?)\n\+\+\+\n?(.*)", text, re.DOTALL)
    if not m:
        return {}, text, 0
    decalage = text[: m.start(2)].count("\n")
    try:
        return tomllib.loads(m.group(1)), m.group(2), decalage
    except tomllib.TOMLDecodeError as e:
        return {"_erreur_toml": str(e)}, m.group(2), decalage


def pages(root: Path):
    for path in sorted((root / "content").rglob("*.md")):
        fm, body, decalage = front_matter(path)
        yield path.relative_to(root), fm, body, decalage


def normalise(texte: str) -> str:
    return re.sub(r"\s+", " ", texte).strip()


def est_publiee(fm: dict) -> bool:
    return not fm.get("draft", False)


def check_now(root: Path) -> dict:
    details = []
    now_file = root / "content/now/_index.md"
    if not now_file.exists():
        return {"id": "now-fraicheur", "statut": "alerte", "details": ["content/now/_index.md introuvable"]}
    fm, _, _ = front_matter(now_file)
    last_update = fm.get("extra", {}).get("last_update", "")
    aujourd_hui = dt.date.today()
    try:
        d, m, y = (int(x) for x in last_update.split("/"))
        age = (aujourd_hui - dt.date(y, m, d)).days
        if age > 14:
            details.append(f"extra.last_update = {last_update} → {age} jours d'écart (seuil : 14)")
    except (ValueError, AttributeError):
        details.append(f"extra.last_update illisible : {last_update!r} (attendu JJ/MM/AAAA)")
    git = subprocess.run(
        ["git", "log", "-1", "--format=%cs", "--", "content/now"],
        capture_output=True, text=True, cwd=root,
    )
    dernier_commit = git.stdout.strip()
    if dernier_commit:
        details.append(f"dernier commit touchant content/now : {dernier_commit}")
    return {"id": "now-fraicheur", "statut": "alerte" if any("écart" in d or "illisible" in d for d in details) else "ok", "details": details}


def check_series(toutes: list) -> dict:
    series: dict[str, list] = {}
    for rel, fm, _, _ in toutes:
        extra = fm.get("extra", {})
        if "series" in extra:
            series.setdefault(extra["series"], []).append(
                (extra.get("series_index", 0), fm.get("date"), str(rel), est_publiee(fm))
            )
    details = []
    for nom, items in series.items():
        items.sort()
        dates = [(i, d) for i, d, _, _ in items if d is not None]
        for (i1, d1), (i2, d2) in zip(dates, dates[1:]):
            if d2 < d1:
                details.append(
                    f"série « {nom} » : l'épisode {i2} ({d2}) est daté AVANT l'épisode {i1} ({d1}) — ordre d'affichage cassé"
                )
    return {"id": "serie-ordre", "statut": "alerte" if details else "ok", "details": details}


def check_contrat(toutes: list) -> dict:
    details = []
    for rel, fm, _, _ in toutes:
        if not str(rel).startswith("content/ecrits/") or str(rel).endswith("_index.md"):
            continue
        if not est_publiee(fm):
            continue
        extra = fm.get("extra", {})
        manques = [
            champ for champ, present in [
                ("description", bool(fm.get("description"))),
                ("extra.numero", bool(extra.get("numero"))),
                ("extra.signature_bio", bool(extra.get("signature_bio"))),
            ] if not present
        ]
        if manques:
            details.append(f"{rel} (publié) : manque {', '.join(manques)}")
    return {"id": "contrat-frontmatter", "statut": "alerte" if details else "ok", "details": details}


def check_numeros(toutes: list) -> dict:
    vus: dict[str, str] = {}
    details = []
    for rel, fm, _, _ in toutes:
        if not est_publiee(fm):
            continue
        numero = fm.get("extra", {}).get("numero")
        if numero:
            if numero in vus:
                details.append(f"numero {numero} en double : {vus[numero]} et {rel}")
            vus[numero] = str(rel)
    return {"id": "numero-doublons", "statut": "alerte" if details else "ok", "details": details}


def check_signatures(root: Path, toutes: list) -> dict:
    figees = root / FROZEN_SIGNATURES
    if not figees.exists():
        return {"id": "signatures-figees", "statut": "alerte",
                "details": [f"liste figée introuvable : {FROZEN_SIGNATURES}"]}
    reference = normalise(figees.read_text(encoding="utf-8"))
    details = []
    for rel, fm, _, _ in toutes:
        extra = fm.get("extra", {})
        sig = extra.get("signature_bio")
        # La liste figée ne couvre que les articles de série ; elle fige le
        # DÉBUT des signatures (slot d'anecdote variable) → match par préfixe.
        if sig and extra.get("series") and est_publiee(fm):
            if normalise(sig)[:40] not in reference:
                details.append(f"{rel} : signature_bio hors liste figée — « {normalise(sig)[:60]}… »")
    return {"id": "signatures-figees", "statut": "alerte" if details else "ok", "details": details}


def check_todos(toutes: list) -> dict:
    details = []
    for rel, fm, body, decalage in toutes:
        for i, ligne in enumerate(body.splitlines(), 1):
            for m in re.finditer(r"\b(TODO(?!\.md)|FIXME|XXX)\b", ligne):
                extrait = ligne[max(0, m.start() - 40):m.end() + 50].strip()
                details.append(f"{rel}:{i + decalage} : …{extrait}…")
    return {"id": "todo-contenu", "statut": "alerte" if details else "ok", "details": details[:20]}


def check_liens_commentes(toutes: list) -> dict:
    details = []
    for rel, fm, body, decalage in toutes:
        en_commentaire = False
        for i, ligne in enumerate(body.splitlines(), 1):
            if "<!--" in ligne:
                en_commentaire = True
            if en_commentaire and ("](@/" in ligne or "href=" in ligne):
                details.append(f"{rel}:{i + decalage} : lien dans un commentaire HTML (maintenance manuelle)")
            if "-->" in ligne:
                en_commentaire = False
    return {"id": "liens-commentes", "statut": "alerte" if details else "ok", "details": details[:20]}


def check_liens_vers_drafts(root: Path, toutes: list) -> dict:
    drafts = {str(rel) for rel, fm, _, _ in toutes if not est_publiee(fm)}
    details = []
    for rel, fm, body, _ in toutes:
        if not est_publiee(fm):
            continue
        for cible in re.findall(r"\(@/([^)\s#]+)", body):
            if f"content/{cible}" in drafts:
                details.append(f"{rel} → @/{cible} : cible en draft (lien mort en prod)")
    return {"id": "liens-vers-drafts", "statut": "alerte" if details else "ok", "details": details}


def main() -> int:
    root = racine()
    toutes = list(pages(root))
    checks = [
        check_now(root),
        check_series(toutes),
        check_contrat(toutes),
        check_numeros(toutes),
        check_signatures(root, toutes),
        check_todos(toutes),
        check_liens_commentes(toutes),
        check_liens_vers_drafts(root, toutes),
    ]
    alertes = sum(1 for c in checks if c["statut"] == "alerte")
    print(json.dumps({
        "script": "evidence_editorial",
        "date": dt.date.today().isoformat(),
        "racine": str(root),
        "pages_examinees": len(toutes),
        "checks": checks,
        "resume": {"alertes": alertes, "ok": len(checks) - alertes},
    }, ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    sys.exit(main())
