---
target: home + article (branche redaction-p1-p2-amorce)
total_score: 23
p0_count: 0
p1_count: 3
timestamp: 2026-05-21T17-19-10Z
slug: templates-index-html
---
# Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Rail sommaire visible mais aucun état actif sur la home (pas de scrollspy). Sur /ecrits/ le `04` rail est gris au lieu de signaler "tu es ici". |
| 2 | Match System / Real World | 3 | Vocabulaire sobre et juste (atelier, sommaire, écrits). Pas de pastiche superflu. |
| 3 | User Control and Freedom | 3 | Toggle thème OK, ancres OK. Aucun raccourci clavier, aucun back-to-top. |
| 4 | Consistency and Standards | 2 | **Largeurs incohérentes home/article** (`--measure-narrow` vs `--measure-base`/`--measure-wide`). Numérotation `01` rail vs `02 FOCUS ACTUEL` § vs hero `02` (3 traitements visuels différents pour le même objet). |
| 5 | Error Prevention | n/a | Site informationnel. |
| 6 | Recognition Rather Than Recall | 2 | **Doublon "Bastien Gallay" rail + hero** force le lecteur à se demander pourquoi le nom est répété. Le rail entier reste flottant pendant tout le scroll sans valeur ajoutée. |
| 7 | Flexibility and Efficiency | 2 | Pas de raccourcis, pas de skip-link visible (existe mais sr-only), pas d'état actif rail. |
| 8 | Aesthetic and Minimalist Design | 3 | Typographie soignée, dark/light propres. Mais asides quasi-invisibles en clair, liens fantômes, rythme vertical mou. |
| 9 | Error Recovery | 3 | Pages stub `/ecrits/` ("Rien à lire pour l'instant") plutôt qu'un cul-de-sac. 404 standard. |
| 10 | Help and Documentation | 2 | Aucun signal de contexte (pas de "qui est l'auteur" succinct au-delà du hero). |
| **Total** | | **23/40** | À renforcer — l'amorce manque de tension visuelle, plusieurs incohérences de hiérarchie. |

# Anti-Patterns Verdict

**LLM assessment** : PASS. Pas AI-generated. Redaction display, palette mono-accent rouge, mise en page sobre nin.com-like. Aucun side-stripe, aucun gradient text, aucune card-grid. Sobre, parfois trop : la sobriété actuelle laisse plusieurs blocs sans affordance (asides, liens).

**Deterministic scan** : unavailable (`detect.mjs` bundled detector not found — fallback signal: manual review only).

**Visual overlays** : non tentés (dépendance detector indisponible).

# Overall Impression

L'état actuel est un **squelette propre mais sous-tendu**. La typographie tient, le mono-accent rouge fonctionne, mais le site ne sait pas encore où placer son énergie : le rail répète le hero, les sections n'ont pas de "tu es ici", les asides de code s'effacent au lieu de tenir leur rang. C'est lisible, mais ça ne *parle pas* — et c'est exactement le décalage que tu signales. Le gain à venir n'est pas d'ajouter, c'est de **trancher** : fusionner header+rail+issue-bar en une bande haute sticky, casser le doublon, donner une présence aux asides, et faire du code-couleur §NN une vraie convention pas un détail.

# What's Working

1. **Le point rouge De Stijl**, son hero `.`, le `04` rouge des index — la signature tient et reste discrète, jamais kitsch.
2. **Le hero typographique** (Redaction display + italique tagline) porte la promesse sans aucun bruit visuel.
3. **L'article en flot continu avec asides flottées** (concept) — bonne idée éditoriale magazine. C'est l'exécution qui pèche, pas le parti pris.

# Priority Issues

Les points ci-dessous reprennent ta liste et la traduisent en findings actionnables.

**[P1] Asides illisibles en mode clair, fantômes en mode sombre**
- *Light* : `background: var(--surface-soft, rgba(0,0,0,0.04))` + `color: var(--ink-soft)` → la combinaison donne un rectangle à peine perceptible avec un texte plus pâle que la prose autour. L'aside « experiments/ » et le terminal lucid-lint perdent leur statut de bloc dédié.
- *Dark* : même token `--surface-soft` donne un tint quasi nul → l'aside ne se distingue plus du fond, le texte se confond avec la prose.
- *Fix* : sortir `--surface-soft` de `rgba(0,0,0,0.04)` et le poser comme **token thème** : light = `oklch(0.96 0.008 60)`, dark = `oklch(0.20 0.012 28)` (calibrer pour AA). Texte aside : `var(--surface-ink)` (pas `--ink-soft`). Ajouter un filet 1px `var(--rule)` sur les 4 côtés pour matérialiser le cadre — c'est compatible avec le ban "no side-stripe".
- *Suggested command*: `/impeccable colorize` (cible : `.ecrit-page__content pre` et `.ecrit-page__aside`).

**[P1] Doublon "Bastien Gallay" rail + hero**
- Le titre `Bastien Gallay.` du hero est immédiatement précédé, à gauche, du logo rail `Bastien Gallay / Atelier`. Le lecteur lit deux fois le même mot en moins d'une seconde.
- *Fix recommandé* : transformer le rail en **bande sticky haute (header bar)** qui contient {logo `Bastien Gallay` mini + sommaire horizontal §NN + toggle thème}. Sur le hero, le logo rail est **caché tant que le hero est en viewport** (IntersectionObserver) ; il apparaît au scroll. Tu résous d'un coup : le doublon, le rail qui flotte sans valeur, et ton souhait "issue-bar + header + logo fusionnés sticky".
- Alternative plus douce : garder le rail latéral mais **masquer le `rail__brand`** quand le hero est visible (apparition au scroll, fade ≤200ms). Coût implémentation moindre.
- *Suggested command*: `/impeccable shape` (décider header sticky vs rail conditionnel), puis `/impeccable craft`.

**[P1] Largeurs page incohérentes home/article**
- Home : la plupart des blocs utilisent `--measure-narrow` (~52ch) → le contenu est concentré.
- Article : `.ecrit-page` est en `--measure-wide` (78ch) et `.ecrit-page__content` en `--measure-base` (68ch) → l'œil retombe sur des paragraphes plus larges que sur la home.
- *Fix* : choisir UNE colonne de référence pour la prose long-form sur tout le site. Recommandation : `--measure-base` (68ch) pour la prose home **ET** article. Le hero peut garder sa largeur propre (`balance`), mais à partir des sections, même mesure partout.
- *Suggested command*: `/impeccable layout`.

**[P2] Liens peu marqués visuellement**
- Les CTA d'ancrage hero (`02 Focus : lucid-lint`, etc.) sont sans soulignement, sans accent, sans flèche pleine — au repos ils ressemblent à du texte décoratif. Le `↗`/`↓` est petit et grisé.
- Les `daily-ops ↗ · skills ↗ · inflecv ↗` en pied de famille 03.02 sont des liens texte sans aucune affordance.
- *Fix* : adopter une convention de lien unique tout au long du site, par exemple : underline `1px solid var(--rule)` au repos qui passe `2px var(--accent)` au hover, + flèche `↗` rendue plus visible (1.1em). Documente la règle dans le DESIGN.md.
- *Suggested command*: `/impeccable clarify` ou `/impeccable typeset`.

**[P2] Numérotation §NN — 3 traitements, aucun cohérent**
- Rail : `01` gris muted, sauf l'item actif en rouge (très saturé).
- Hero ancres : `02 03 04 05 06` tous en gris muted sans état.
- Sections : `02 FOCUS ACTUEL` en rouge plein.
- Aucune lecture transversale possible : impossible de comprendre quand un numéro est "actif", "passif", "destination".
- *Fix* : poser **une doctrine §NN** dans `_typography.scss`. Proposition :
  - **Inactif** (repos, n'importe où) : `color: var(--ink-mute)`.
  - **Actif / "tu es ici"** : bicolore — chiffre en `var(--c-info)` avec `text-shadow: 1.5px 1.5px 0 var(--accent)` (le bleu+rouge que tu as cité). Une seule paire de couleurs valide pour "actif" — réutilisée dans rail, sommaire, sections.
  - **Hover / focus** : passage à l'état actif (preview).
- *Suggested command*: `/impeccable extract` (tokeniser la convention) puis `/impeccable craft`.

**[P2] Rythme vertical et séparations**
- Espacements entre sections home `clamp(var(--space-xl), 6vw, var(--space-3xl))` donnent un grand vide identique partout. Pas de respiration différenciée.
- Les `<hr>` du markdown article sont rendus `* * *` joli, mais les filets `border-top` des sous-blocs `.famille` et `.ecrit` sont eux des traits 1px nus — deux dispositifs concurrents.
- *Fix* : trois pas d'espacement (entre paragraphes / entre sous-sections / entre sections majeures), unifier les filets (tous en `1px var(--rule)`, pas de `--rule-strong` ailleurs sauf décision motivée).
- *Suggested command*: `/impeccable layout`.

# Persona Red Flags

**Alex (dev OSS, cible primaire)** : trouve lucid-lint, scanne le terminal output, OK. Mais les liens projets `daily-ops ↗ · skills ↗ · inflecv ↗` au format texte plat lui demandent un effort de scan inattendu sur un site qui se présente comme propre. Aucun raccourci clavier (g+f pour focus, g+e pour écrits) — friction pro.

**Jordan (recruteur / first-timer)** : lit le hero, comprend la promesse. Mais le doublon "Bastien Gallay" rail+hero crée une micro-confusion. Le rail flottant à gauche reste sans clear-call ; il ne sait pas s'il doit cliquer ou scroller. L'article en draft `/ecrits/` qui dit "Rien à lire" alors qu'on l'a invité depuis la home → impression "site pas fini".

**Maria (prospect Teragone Factory)** : trouve le bloc "Réalisations clients" trop discret pour ce qu'il pourrait porter (gallay-avocat.fr est un signal fort, traité comme un footnote).

# Minor Observations

- **Issue-bar** désalignement (point que tu signales) : sur la version fusion-poster que tu as en tête, la pill `NUMÉRO §01` semblait décrocher du haut. **Sur cette branche elle n'existe pas encore** — c'est l'opportunité de la réintroduire bien : `display: grid; grid-template-columns: 1fr auto 1fr` avec gauche (numéro), centre (date), droite (label) façon header de journal — exactement comme tu le décris.
- **Issue-bar + header + logo sticky** : compatible avec la fusion rail→header bar proposée plus haut. Le header sticky devient la couche permanente, l'issue-bar vit *dans* le header pour la home et l'article.
- **Hero meta `bastiengallay.com — 2026`** : info quasi-nulle, à transformer en vraie issue-bar éditoriale ou à supprimer.
- **Toggle thème** dit "SOMBRE" / "CLAIR" → préciser l'action ("Passer en sombre") évite l'ambiguïté ; tu as déjà reçu cette remarque dans le précédent run.
- **Article `draft = true`** : la home liste "Pourquoi ce site" en `04.01` du teaser **alors que la page renvoie 404** en serve normal. Soit publier (`draft = false`), soit retirer du teaser jusqu'à la pub.

# Questions to Consider

1. **Header sticky ou rail conditionnel ?** Le passage en bande sticky haute change la signature du site (moins nin.com, plus revue). C'est le choix structurel le plus impactant à arbitrer avant tout reste.
2. **Une doctrine §NN unique** ou plusieurs (rail-marquepage vs sommaire-hero vs section-header) ? Le coût de la cohérence est l'aplatissement des nuances.
3. **Asides flottées** : tu veux qu'elles restent flottées (magazine, prose entrelacée) ou que la flottaison devienne l'exception et le bloc plein-mesure la règle ? Le choix change la calibration du bg/contraste.
4. **Le site est-il en passe d'absorber le vocabulaire pastiche** (POCHETTE / OURS / TIRAGE) que tu avais déployé sur l'autre branche, ou tu reviens à un registre plus sobre ? Ce critère change tout le reste.

# Trend
