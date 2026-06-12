# Typst — charte, decks, pièges

## Charte partagée

`charte.typ` (dans `.personal/revues/` après migration ; avant :
`.personal/improvements/2026-06-11-revue-site/`). Usage :

```typst
#import "charte.typ": *
#set document(title: "…")
#show: charte.with(pied: "REVUE <AXE> · BASTIENGALLAY.COM — <DATE>")
```

Exporte : couleurs (`rouge`, `jaune`, `bleu`, `encre`, `creme`, `mute`),
fontes (`display` = Futura, `corps` = Helvetica Neue, `mono` = Menlo),
helpers `slide(num:, label:, title:)[…]`, `divider(roman, titre, sous)`,
`carte(...)`, `taille("S")`, `prio("P1")`, `etiquette("…")`,
`couverture(kicker:, titre1:, titre2:, date:, sous:, ours:)`.

Conventions : kickers `§NN` (10 = partie I, 20 = partie II…), couverture
De Stijl numérotée `X/4`, fin de deck « l'essentiel en trois lignes » +
bloc traçabilité en Menlo.

## Compiler et vérifier

```bash
typst compile <deck>.typ          # PDF à côté du .typ
```

Toujours : (1) vérifier le nombre de pages (`pdfinfo | grep Pages`),
(2) relire en images les pages à mise en page risquée (tables larges,
grilles de cartes, captures) via l'outil Read sur le PDF.

## Pièges (tous rencontrés au run fondateur)

| Piège | Symptôme | Parade |
| --- | --- | --- |
| `*/` dans du texte (`*/now*`) | « unexpected end of block comment » | Reformuler (« La page /now ») |
| `~` non échappé | Espace insécable : « ( 725 » au lieu de « (~725 » | `\~` ou reformuler |
| `+` ou `=` en début de cellule/contenu | Liste numérotée ou titre parasite (« 1. ») | Reformuler ou échapper |
| `__` dans du texte (`rail__group-label`) | Warning souligné vide | Entourer de backticks |
| `height: 100%` dans une grille non contrainte | Cartes qui explosent sur la page suivante | Hauteurs fixes (`40mm`, `96mm`) |
| Glyphes exotiques (`⌁`, emoji) | Tofu — Helvetica/Futura ne les ont pas | S'en tenir à `✓ → · – §` |
| Paquets Typst externes | Téléchargement bloqué par le sandbox | Zéro import externe : la charte suffit |
| `Date.now()`-pensée | — | Dater via l'argument, pas l'horloge |

## Captures dans un deck

```typst
#let capture(chemin, legende, hauteur: 70mm) = stack(
  rect(stroke: 1.5pt + encre, inset: 2pt, fill: white, image(chemin, height: hauteur)),
  v(2pt),
  text(font: mono, size: 7pt, fill: mute, legende),
)
```

Chemins relatifs au `.typ`. Les captures vivent dans `runs/<run>/captures/` ;
le deck du run les référence en `captures/<nom>.png`.
