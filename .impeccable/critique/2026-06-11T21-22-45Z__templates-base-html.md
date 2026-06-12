---
target: site complet (shell + 5 pages)
total_score: 31
p0_count: 1
p1_count: 2
timestamp: 2026-06-11T21-22-45Z
slug: templates-base-html
---
# Critique — site complet (shell base.html + 5 pages), 2026-06-11

Cible réelle : site entier en local (/, /ecrits/, article 2/3, /now/, /abonnement/), light+dark, 1440×900 + 390×844, état primo-visiteur. Slug rattaché au shell `templates/base.html` (les findings récurrents y vivent).

## Design Health Score — 31/40 (Good)

| # | Heuristique | Score | Problème clé |
|---|---|---|---|
| 1 | Visibilité état système | 4 | scrollspy, label VSM, toggle dynamique — solide |
| 2 | Correspondance monde réel | 3 | grammaire §NN + jargon lean/dev opaque pour non-dev |
| 3 | Contrôle et liberté | 3 | pas de repli du bandeau VSM mobile |
| 4 | Cohérence | 3 | kicker « 04 ÉCRITS » sans § ; §NN colorés vs Règle Bicolore ; em-dashes vs don't |
| 5 | Prévention erreurs | 4 | form email required+label ; rien de destructif |
| 6 | Reconnaissance vs rappel | 3 | mobile : chips 01–07 labels 8px → mémorisation forcée |
| 7 | Flexibilité | 3 | ancres, Atom, liens rail↔prose ; pas de recherche (acceptable) |
| 8 | Esthétique/minimalisme | 3 | desktop excellent ; rail VSM dense, mobile au-delà |
| 9 | Récupération erreurs | 2 | **pas de templates/404.html** — 404 générique |
| 10 | Aide/documentation | 3 | légende VSM, OURS, encart série |

## Anti-patterns

- LLM : slop test **passé** — système éditorial tenu (issue-bar, §NN, OURS, bulletin ✂, héro Mondrian). Zones génériques : 404 absente, bandeau VSM mobile, /now sans moment signé, cellule vide grille À la une.
- Détecteur : exit 2, **1 advisory** `numbered-section-markers` sur base.html — **faux positif** (§01–§04 délibérés + dates en commentaires Tera agrégées).
- Lighthouse : `/` a11y 88, article 93 ; BP/SEO 100 partout. Échecs récurrents du shell : `rail__group-label` (contraste), `rail__brand` (link-name), `theme-toggle` (label-content-name-mismatch), `colophon__link` ×4 (target-size).

## Priority issues

- **[P0] Héro home tronqué ≤390px** — `.hero__title` 60.55px + `Bastien&nbsp;Gallay` insécable = 366px dans 288px, déborde le viewport de 27px (light et dark). Le nom du propriétaire est coupé sur l'écran le plus partagé. Fix : borne basse du clamp + retirer le nbsp sous 26rem. → /impeccable adapt
- **[P1] Bandeau VSM mobile : ~54 % du viewport confisqué** — aside.vsm sticky 375px pendant 21 min de lecture ; recouvre l'encart série en entrée d'article ; chip 05 vide en stage intro. Fix : panneau replié par défaut (~100px), expansion au tap ; réserver l'espace de l'encart ; état « → courbe ci-dessous » pour le slot 05. → /impeccable adapt + distill
- **[P1] templates/404.html absent** — 404 GitHub générique en prod, rupture de registre totale. Fix : 404 éditorialisée (maquette « page arrachée » dispo dans revue-site §53). → /impeccable harden
- **[P2] Contrastes sous AA** — listing home (light et dark, fond oklch(0.155)) : lt-rule 3.25:1, lt-chrome 3.43:1, lt-warning 3.97:1 ; note de figure METR 4.16:1 @11.2px ; rail__group-label (Lighthouse). Ironie exploitable : c'est la vitrine d'un linter d'accessibilité cognitive. Fix : monter d'un cran les tonal ramps. → /impeccable polish
- **[P2] Cibles tactiles** — toggle thème 35×27px, colophon__link ×4 serrés, chips VSM étroits ; typo agate 8–9px (badges fx, labels chips). Fix : hit areas 44×44 sous le breakpoint mobile. → /impeccable adapt

## Personas — red flags

- Jordan : héro mobile cassé ; 404 nue ; /now daté 21/05 vs article du 11/06 (signal de fraîcheur inversé).
- Casey : bandeau VSM 54 % ; chip 05 vide ; toggle 35×27 ; labels 8px.
- Sam : socle remarquable (skip-link réel, h1 sr-only sous héro SVG, descriptions sr-only des figures, focus visible) ; restent l'agate 8–9px et les ratios ci-dessus.
- Pair OSS : bookmark sur desktop (preuves : listing réel, DOI, OURS transparent) ; première impression mobile = les deux P0/P1.

## Mineures

kicker « 04 ÉCRITS » incohérent ; .ed-badge__num colorés vs Règle Bicolore design.json (doctrine à re-synchroniser ou amender) ; em-dashes dans titres/encarts malgré le don't ; cellule vide grille À la une (3 cartes/4 slots) ; /now périmé ; date du draft 3/3 (09/06) antérieure au 2/3 (11/06) — vérifier avant publication sinon série affichée dans le désordre ; console 0 erreur, 0 requête ≥400, ~250–310 Ko/page en prod estimé, 0 img (SVG inline, pas de CLS).

## Questions

1. Le rail VSM doit-il être montré en continu sur mobile, ou la version honnête est-elle un sommaire repliable ?
2. La Règle Bicolore décrit-elle encore le site, ou design.json doit-il être amendé (qui fait foi ?) ?
3. Le site passerait-il son propre `lucid-lint check` (4 196 mots, 21 min, carte 7 nœuds en marge) ?
