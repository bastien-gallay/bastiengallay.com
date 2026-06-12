#!/usr/bin/env python3
"""Demi-axe perf — poids des pages depuis public/ (après zola build).

Usage : evidence_perf.py [--build]
--build lance `zola build` avant la mesure. Sortie : JSON sur stdout.
"""

import json
import re
import subprocess
import sys
from collections import defaultdict
from pathlib import Path

BASE_URLS = ("https://bastiengallay.com", "http://127.0.0.1:1111")
TYPES = {
    ".css": "css", ".js": "js", ".woff2": "fonts", ".woff": "fonts",
    ".png": "images", ".webp": "images", ".jpg": "images", ".jpeg": "images",
    ".svg": "images", ".ico": "images", ".html": "html", ".xml": "xml",
}


def racine() -> Path:
    out = subprocess.run(
        ["git", "rev-parse", "--show-toplevel"], capture_output=True, text=True, check=True
    )
    return Path(out.stdout.strip())


def page_de(html: Path, public: Path) -> str:
    if html.name != "index.html":
        return "/" + str(html.relative_to(public))
    parent = html.relative_to(public).parent
    return "/" if str(parent) == "." else "/" + str(parent)


def asset_local(url: str) -> str | None:
    for base in BASE_URLS:
        if url.startswith(base):
            url = url[len(base):]
    if url.startswith(("http://", "https://", "mailto:", "data:", "#", "//")):
        return None
    return url.split("#")[0].split("?")[0]


def main() -> int:
    root = racine()
    if "--build" in sys.argv:
        build = subprocess.run(["zola", "build"], capture_output=True, text=True, cwd=root)
        if build.returncode != 0:
            print(json.dumps({"erreur": "zola build a échoué", "stderr": build.stderr[-800:]}))
            return 1
    public = root / "public"
    if not public.exists():
        print(json.dumps({"erreur": "public/ absent — lancer avec --build"}))
        return 1

    poids_pages = []
    compteur_assets: dict[str, int] = {}
    for html in sorted(public.rglob("*.html")):
        contenu = html.read_text(encoding="utf-8", errors="replace")
        refs = set()
        for url in re.findall(r'(?:href|src)="([^"]+)"', contenu):
            chemin = asset_local(url)
            if not chemin:
                continue
            fichier = public / chemin.lstrip("/")
            if fichier.is_file() and fichier.suffix != ".html":
                refs.add(fichier)
        html_ko = html.stat().st_size / 1024
        assets_ko = sum(f.stat().st_size for f in refs) / 1024
        for f in refs:
            compteur_assets[str(f.relative_to(public))] = f.stat().st_size
        poids_pages.append({
            "page": page_de(html, public),
            "html_ko": round(html_ko, 1),
            "assets_ko": round(assets_ko, 1),
            "total_ko": round(html_ko + assets_ko, 1),
            "requetes": len(refs) + 1,
        })

    par_type: dict[str, float] = defaultdict(float)
    for fichier in public.rglob("*"):
        if fichier.is_file():
            par_type[TYPES.get(fichier.suffix, "autres")] += fichier.stat().st_size / 1024

    poids_pages.sort(key=lambda p: -p["total_ko"])
    lourds = sorted(compteur_assets.items(), key=lambda kv: -kv[1])[:10]
    print(json.dumps({
        "script": "evidence_perf",
        "pages_les_plus_lourdes": poids_pages[:10],
        "totaux_par_type_ko": {k: round(v, 1) for k, v in sorted(par_type.items())},
        "assets_les_plus_lourds": [
            {"asset": a, "ko": round(o / 1024, 1)} for a, o in lourds
        ],
        "taille_totale_public_ko": round(sum(par_type.values()), 1),
        "note": "Poids non compressés (gzip/brotli de GitHub Pages réduit le transfert réel).",
    }, ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    sys.exit(main())
