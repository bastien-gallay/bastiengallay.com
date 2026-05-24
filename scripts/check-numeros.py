#!/usr/bin/env python3
# /// script
# requires-python = ">=3.11"
# dependencies = []
# ///
"""
check-numeros.py — Valide la présence et le format de `[extra] numero`
sur tout article non-draft.

Convention §XX.YY (cf. mémoire `project_numerotation_articles.md` et
`.personal/brainstorm/20260524-numerotation-articles-XXYY.md`) :

  - XX = entier 2 chiffres (numéro de magazine, incrémenté manuellement)
  - YY = entier 2 chiffres style BASIC line numbers
          (décades 10, 20, 30, …, 90, max .X3 par décade)
  - Format string : "XX.YY" → regex `^[0-9]{2}\\.[0-9]{2}$`

Politique :

  - `draft = true` ou pas de `draft` → champ `numero` toléré absent.
  - `draft = false` (publié) → `numero` obligatoire ET au bon format.

Sortie : exit 0 si tout valide, exit 1 sinon (avec liste des erreurs).
Lancé par pre-commit (hook local) et par CI (`.github/workflows/deploy.yml`).

Usage :
  uv run scripts/check-numeros.py             # scan content/ecrits/ entier
  uv run scripts/check-numeros.py FILE [...]  # scan fichiers précis (pre-commit)
"""
from __future__ import annotations

import re
import sys
from pathlib import Path

NUMERO_RE = re.compile(r"^[0-9]{2}\.[0-9]{2}$")
REPO_ROOT = Path(__file__).resolve().parent.parent
DEFAULT_DIR = REPO_ROOT / "content" / "ecrits"


def parse_frontmatter(text: str) -> dict[str, str] | None:
    """Extrait le bloc +++ … +++ et retourne un dict naïf clef → valeur (string).

    On ne lit pas tout TOML pour rester sans dépendance. Suffisant pour
    capter `draft = true/false` et `numero = "..."` au niveau racine ou
    sous `[extra]`.
    """
    if not text.startswith("+++"):
        return None
    end = text.find("\n+++", 3)
    if end < 0:
        return None
    block = text[3:end]
    out: dict[str, str] = {}
    section = ""
    for raw in block.splitlines():
        line = raw.strip()
        if not line or line.startswith("#"):
            continue
        if line.startswith("[") and line.endswith("]"):
            section = line[1:-1] + "."
            continue
        if "=" not in line:
            continue
        key, _, val = line.partition("=")
        key = key.strip()
        val = val.strip().strip('"').strip("'")
        out[section + key] = val
    return out


def is_draft(fm: dict[str, str]) -> bool:
    """Vrai si `draft = true` au top-level. Convention Zola : absence = false."""
    return fm.get("draft", "false").lower() == "true"


def iter_articles(paths: list[Path]) -> list[Path]:
    """Étend chaque chemin : .md direct, sinon glob récursif."""
    out: list[Path] = []
    for p in paths:
        if p.is_file() and p.suffix == ".md":
            out.append(p)
        elif p.is_dir():
            out.extend(sorted(p.rglob("*.md")))
    # Exclut les _index.md de Zola (sections, pas articles)
    return [p for p in out if p.name != "_index.md"]


def check(paths: list[Path]) -> list[tuple[Path, str]]:
    """Retourne la liste des erreurs (chemin, message)."""
    errors: list[tuple[Path, str]] = []
    for path in iter_articles(paths):
        try:
            text = path.read_text(encoding="utf-8")
        except OSError as exc:
            errors.append((path, f"unreadable: {exc}"))
            continue
        fm = parse_frontmatter(text)
        if fm is None:
            # Pas de frontmatter → on laisse passer (peut être un fragment).
            continue
        if is_draft(fm):
            continue
        numero = fm.get("extra.numero")
        if not numero:
            errors.append((path, "publié sans [extra] numero"))
            continue
        if not NUMERO_RE.match(numero):
            errors.append(
                (path, f"numero={numero!r} ne matche pas ^[0-9]{{2}}\\.[0-9]{{2}}$")
            )
    return errors


def main(argv: list[str]) -> int:
    args = [Path(a).resolve() for a in argv[1:]] or [DEFAULT_DIR]
    errors = check(args)
    if not errors:
        print(f"[check-numeros] OK ({len(iter_articles(args))} articles scannés)")
        return 0
    print(f"[check-numeros] {len(errors)} erreur(s) :", file=sys.stderr)
    for path, msg in errors:
        try:
            rel = path.relative_to(REPO_ROOT)
        except ValueError:
            rel = path
        print(f"  {rel}: {msg}", file=sys.stderr)
    return 1


if __name__ == "__main__":
    sys.exit(main(sys.argv))
