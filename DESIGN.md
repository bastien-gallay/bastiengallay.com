---
name: bastiengallay.com
description: Pochette d'une revue d'atelier auto-publiée — sobriété éditoriale, accent rouge De Stijl, polychromie sémantique héritée de lucid-lint.
colors:
  surface: "oklch(0.985 0.006 70)"
  surface-sub: "oklch(0.965 0.008 65)"
  surface-ink: "oklch(0.18 0.014 30)"
  ink-soft: "oklch(0.40 0.020 30)"
  ink-mute: "oklch(0.55 0.018 35)"
  rule: "oklch(0.88 0.012 40)"
  rule-strong: "oklch(0.75 0.018 35)"
  accent: "oklch(0.52 0.205 25)"
  accent-deep: "oklch(0.44 0.215 25)"
  accent-soft: "oklch(0.92 0.045 30)"
  c-warning: "oklch(0.55 0.16 80)"
  c-info: "oklch(0.42 0.18 250)"
  c-problem: "oklch(0.52 0.22 5)"
  c-success: "oklch(0.48 0.16 155)"
  c-chrome: "oklch(0.50 0.10 220)"
  selection-bg: "oklch(0.85 0.090 28)"
typography:
  display:
    fontFamily: "Redaction, Iowan Old Style, Georgia, serif"
    fontSize: "clamp(3.5rem, 2.20rem + 6.5vw, 7.5rem)"
    fontWeight: 400
    lineHeight: 1.08
    letterSpacing: "-0.022em"
  headline:
    fontFamily: "Redaction, Iowan Old Style, Georgia, serif"
    fontSize: "clamp(2.75rem, 1.90rem + 4.4vw, 4.75rem)"
    fontWeight: 400
    lineHeight: 1.08
    letterSpacing: "-0.022em"
  title:
    fontFamily: "Redaction, Iowan Old Style, Georgia, serif"
    fontSize: "clamp(1.5rem, 1.30rem + 1.0vw, 2.0rem)"
    fontWeight: 400
    lineHeight: 1.22
    letterSpacing: "-0.022em"
  lead:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 1.30rem + 1.0vw, 2.0rem)"
    fontWeight: 400
    lineHeight: 1.22
    letterSpacing: "-0.005em"
  body:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "normal"
  label:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.78rem"
    fontWeight: 500
    lineHeight: 1.22
    letterSpacing: "0.14em"
  mono:
    fontFamily: "Geist Mono, ui-monospace, SF Mono, Menlo, monospace"
    fontSize: "0.92rem"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "normal"
rounded:
  sharp: "0"
  inline-code: "2px"
spacing:
  "3xs": "0.25rem"
  "2xs": "0.5rem"
  xs: "0.75rem"
  sm: "1rem"
  md: "1.5rem"
  lg: "2rem"
  xl: "3rem"
  "2xl": "4rem"
  "3xl": "6rem"
  "4xl": "clamp(6rem, 4rem + 6vw, 10rem)"
components:
  rail-sticky:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.surface-ink}"
    padding: "1rem 0"
    height: "auto"
  hero-cadre:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.surface-ink}"
    padding: "2rem"
    rounded: "{rounded.sharp}"
  issue-bar:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink-mute}"
    typography: "{typography.label}"
    padding: "0.55rem 0"
  issue-bar-pill:
    backgroundColor: "{colors.c-problem}"
    textColor: "{colors.surface}"
    typography: "{typography.label}"
    padding: "0.18em 0.6em"
    rounded: "{rounded.sharp}"
  button-toggle:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.surface-ink}"
    typography: "{typography.label}"
    padding: "0.5rem 0.75rem"
    rounded: "{rounded.sharp}"
  button-toggle-hover:
    textColor: "{colors.accent-deep}"
  link-prose:
    textColor: "{colors.surface-ink}"
  link-prose-hover:
    textColor: "{colors.accent-deep}"
  link-rail-num:
    textColor: "{colors.ink-mute}"
    typography: "{typography.mono}"
  link-rail-num-active:
    textColor: "{colors.c-info}"
  callout:
    backgroundColor: "{colors.surface-sub}"
    textColor: "{colors.surface-ink}"
    padding: "1.5rem 2rem"
    rounded: "{rounded.sharp}"
  listing-radical:
    backgroundColor: "{colors.surface-ink}"
    textColor: "{colors.surface}"
    typography: "{typography.mono}"
    padding: "2rem 1.5rem"
    rounded: "{rounded.sharp}"
  toc-list-item:
    textColor: "{colors.surface-ink}"
    typography: "{typography.title}"
    padding: "0.35rem 0"
---

# Design System: bastiengallay.com

## 1. Overview

**Creative North Star: "La Revue d'Atelier"**

Le site est tenu comme un numéro de revue auto-publiée. Une couverture (`§01`), un sommaire, des sections numérotées en `§NN`, une masthead sticky, un OURS en pied. Le code est l'argument visuel : un listing radical de `lucid-lint v0.2.0` tient lieu de héros pour le projet phare, parce que la sortie réelle EST le pitch. Les autres pôles (Teragone Factory, daily-ops, écrits) s'insèrent comme rubriques d'un même numéro, jamais comme cards d'un dashboard.

L'esthétique vient d'un croisement assumé : sobriété typographique des sites perso devs (rauno.me, paco.me) et composition magazine atypique (ai-2027.com, *Tilt* hors-série 1987). Le hero porte un `§01` géant en bicolore — rouge De Stijl ombré bleu info — comme un numéro d'édition imprimée. Le rail latéral nin.com a fusionné dans une bande sticky haute façon header de journal (gauche/centre/droite). Une polychromie sémantique inspirée de la sortie `lucid-lint` (warning jaune, info bleu, problem rose, success vert, chrome cyan) est réservée aux signaux qui *codent une information réelle* : numéro de section, pill de pochette, tag de listing. Jamais décorative.

Ce que le système rejette explicitement : palette AI typique (cyan-sur-dark, gradients violet→bleu, néon), stack de cards-avec-icône-arrondi répétées, glassmorphism, gradient text, side-stripe coloré, hero-metric SaaS, modal-as-first-thought, em-dash en copy.

**Key Characteristics:**
- Atelier ouvert, traces de fabrication assumées (numéros bicolores, marques `▌` `▍`, ornement `§ § §`, OURS en pied)
- Cadres francs, géométrie sans border-radius (sauf inline-code 2px)
- Light par défaut (lecture diurne), dark calibré AA, toggle persistant
- Polychromie sémantique 1:1 — chaque couleur encode un état ou une rubrique
- Mobile : adaptation, pas amputation. Le rail bascule en bande scroll horizontale, jamais en hamburger

## 2. Colors

Palette **Full palette sémantique** : une signature mono-accent rouge porte l'identité (poids visuel ≤10 %), cinq sémantiques héritées de `lucid-lint` codent les sections, deux neutres tintés vers le hue accent portent surface et texte.

### Primary
- **Rouge De Stijl** (`oklch(0.52 0.205 25)`): l'accent unique, signature. Point carré du brand, marque typographique terminale (`.` de `Bastien Gallay.`), filets et soulignés au hover, pill `▌` du listing. Profond, saturé sans cri.
- **Rouge De Stijl Profond** (`oklch(0.44 0.215 25)`): variante hover/active de l'accent. Texte de lien au survol, état pressed des CTA.
- **Rouge De Stijl Lavé** (`oklch(0.92 0.045 30)`): wash très léger pour fonds rares (callout, surfaces accentuées discrètes).

### Secondary
- **Bleu Information** (`oklch(0.42 0.18 250)`): compagnon bicolore de l'accent dans la doctrine §NN ; numéros actifs/hover montrent le bleu en couleur, le rouge en ombre. Aussi : marque `▍` des captions de listing, tag `TREE` des asides.

### Tertiary (palette sémantique lucid-lint)
- **Jaune Poster** (`#ffd900` fixe + `oklch(0.55 0.16 80)` token): mark unifié de la prose et des titres (`<mark class="mark">`), warning, valeurs intermédiaires.
- **Rose Problème** (`oklch(0.52 0.22 5)`): score insuffisant ; double-sens contextuel comme couleur d'ouverture / `§01` / `▌ EN COUVERTURE`. La même teinte signale faute et bienvenue selon le contexte, assumé.
- **Vert Succès** (`oklch(0.48 0.16 155)`): état OK, score atteint, barres `lucid-lint --ok`.
- **Cyan Chrome** (`oklch(0.50 0.10 220)`): header `lucid-lint` du listing, section `§05 / Maintenant`.

### Neutral
- **Crème Atelier** (`oklch(0.985 0.006 70)`): page background light. Blanc cassé chaud tiré vers le sable, jamais `#fff`. Tinté hue 70 (~jaune doux) à très faible chroma.
- **Crème Sous** (`oklch(0.965 0.008 65)`): léger relief, fond des `.callout`, `.surface-sub`.
- **Encre Chaude** (`oklch(0.18 0.014 30)`): texte principal. Noir tinté rouge hue 30, jamais `#000`.
- **Encre Soft** (`oklch(0.40 0.020 30)`): texte secondaire, body de l'article.
- **Encre Muette** (`oklch(0.55 0.018 35)`): meta, dates, labels caps, §NN au repos.
- **Filet** (`oklch(0.88 0.012 40)`): séparateurs fins 1px par défaut.
- **Filet Fort** (`oklch(0.75 0.018 35)`): cadre hero, bordures de blocs `.ours`, soulignement des liens projets.

Le dark mode remonte la luminance de `--accent` à `0.66 0.190 26` (contraste AA sur `oklch(0.155 0.010 28)` ≈ accent rouge sur noir tinté rouge), et calibre la palette sémantique à des valeurs ≥5:1 sur fond sombre.

### Named Rules

**La Règle Un Accent.** L'accent rouge porte ≤10 % du poids visuel d'un écran. Sa rareté est le point. Pas de second accent : la signature De Stijl tient seule.

**La Règle Polychromie Sémantique.** Toute couleur ajoutée code une information réelle (warning / info / problem / success / chrome). Aucun usage décoratif. Si tu cherches une couleur "pour rythmer", la réponse est : un cran d'espace ou de typographie, pas une couleur.

**La Règle Bicolore §NN.** Les numéros de section partent toujours en `--ink-mute` au repos. La paire bicolore (`text-shadow 1.5px 1.5px 0 var(--link-shadow)` + `color: var(--link-color)`) s'allume *uniquement* au hover/focus ou sur l'item actif. Hors hero monumental (signature poster), un §NN coloré au repos est un bug.

## 3. Typography

**Display Font:** Redaction Regular (Pangram Pangram, OFL — fork inclusif de Marie Godefroy), self-hosted.
**Body Font:** Geist (Vercel), via Google Fonts.
**Label/Mono Font:** Geist Mono.

**Character:** Redaction est un didone géométrique avec un caractère sec, pas glamour pour autant : ses pleins/déliés sont francs, ses italiques (synthétisés navigateur — l'italique de Redaction n'est pas livré) servent de modulation contrôlée. Geist apporte un sans-serif technique très lisible, son grain neutre laisse Redaction porter la signature. Le pairing évite **Fraunces, Instrument Serif, Syne, Plex, Inter, DM Sans, Plus Jakarta** — fontes saturées de l'AI-SaaS 2024-2026.

### Hierarchy

- **Display / Hero** (400, `clamp(3.5rem, 2.20rem + 6.5vw, 7.5rem)`, line-height 1.08, tracking -0.022em): nom du site, titre d'article. Une fois par page.
- **Headline / H2** (400, `clamp(2.75rem, 1.90rem + 4.4vw, 4.75rem)`, line-height 1.08): titre de section (`Deux familles, une démarche`, `Notes & articles`).
- **Title / H3** (400, `clamp(1.5rem, 1.30rem + 1.0vw, 2.0rem)`, line-height 1.22): sous-titre, titre d'item dans le sommaire.
- **Lead** (400, ≈ Title size, line-height 1.22, color `--ink-soft`): chapeau du hero, baseline du focus. Max-width `--measure-narrow` (48ch).
- **Body** (400, 1.0625rem ≈ 17px, line-height 1.55, color `--ink-soft`): prose. Max-width `--measure-base` (68ch).
- **Label / Caps** (500, 0.78rem, letter-spacing 0.14em, uppercase, color `--ink-mute`): meta de l'issue-bar, badges `§NN · EN COUVERTURE`, labels colophon.
- **Mono** (400, 0.92rem, line-height 1.55): listings, inline-code (`<code>`), numérotation tabulaire `§NN`.

### Named Rules

**La Règle 68ch.** Le body de prose s'arrête à 68ch (`--measure-base`). Le lead descend à 48ch (`--measure-narrow`). Aucun paragraphe ne dépasse — y compris dans les `<p>` libres, qui héritent de `max-width: var(--measure-base)`.

**La Règle du Point Terminal.** Les titres affichent un `.` final coloré accent (`<i class="hero__title-mark">.</i>`). C'est la signature De Stijl, le point rouge. Ne jamais l'omettre sur un titre h1/h2 principal.

**La Règle de l'Italique Synthétisé.** Redaction Italic n'est pas livré ; le navigateur synthétise. Le `font-synthesis: style` est rétabli explicitement sur `*` pour contourner la directive Google Fonts. Toute fonte ajoutée doit prévoir son italique réel, ou accepter la synthèse.

## 4. Elevation

**Système plat par doctrine.** Aucune ombre portée décorative. La profondeur vient du contraste typographique (poids/taille), du rythme d'espaces, et de bordures explicites 1px sur les blocs qui en ont besoin. Le seul `box-shadow` actif est `text-shadow 1.5px 1.5px 0 <couleur>` qui sert l'effet bicolore poster sur les numéros §NN — c'est de la composition typographique, pas de l'élévation.

Une exception fonctionnelle : la sticky `.rail` utilise `backdrop-filter: saturate(140%) blur(8px)` sur un fond `color-mix(in oklch, var(--surface) 92%, transparent)` pour rester lisible au-dessus du contenu qui scroll dessous. C'est utilitaire (lecture), pas décoratif (glassmorphism interdit ailleurs).

### Named Rules

**La Règle Plat-Par-Défaut.** Aucune surface n'a d'ombre au repos. Les blocs (callout, OURS, listing) sont posés à plat, séparés par 1px de filet ou par leur fond plein. Si tu te surprends à écrire `box-shadow: 0 4px 12px ...`, tu as choisi le mauvais signal — change de fond, ajoute un filet, ou supprime le bloc.

**La Règle Backdrop Utilitaire.** Le `backdrop-filter` est réservé à un usage : la sticky header, pour préserver la lisibilité quand le contenu défile sous elle. Pas de glass-card, pas de modal-glass, pas de aurora-blur.

## 5. Components

### Header Sticky (.rail)

Bande horizontale sticky en haut. Grille 3-col : brand (carré rouge + nom caché tant que le hero est visible) | sommaire `§NN` centré | toggle thème à droite. Hauteur compacte (`var(--space-sm)` vertical). Backdrop-filter pour lisibilité au scroll. Le texte du brand apparaît au sortir du hero via `IntersectionObserver` qui ajoute `.rail--scrolled` (transition opacity + translateX, durée `--dur-mid`).

Mobile (< 48rem) : la grille reste 3-col, le sommaire devient une bande scroll horizontale (`overflow-x: auto; scrollbar-width: none`), le label "Sombre/Clair" du toggle est masqué (le carré suffit).

### Issue-bar

Bandeau immédiatement sous le sticky header, en haut de chaque page. Grille `1fr auto 1fr` (gauche / centre / droite) — gauche : pill inversée `NUMÉRO §NN` + label section ; centre : date ; droite : méta tirage. Filets top + bottom 1px. Typographie label mono caps. Mobile (< 36rem) : grille s'aplatit en pile à gauche.

La pill inversée a fond `--c-problem` (rose poster) et texte `--surface` (qui flippe selon le thème : crème en light, encre sombre en dark). Contraste AA stable dans les deux modes.

### Hero Cadre

Cadre `border: 1px solid var(--rule-strong)` autour du titre + sommaire. Numéro §01 géant en bicolore (`color: --section-color; text-shadow: 4px 4px 0 --section-shadow`) en marge gauche, titre Redaction display à droite, ligne lead italique sous. Sommaire interne `Sommaire du numéro` en bas, table de §02 à §06.

### Sommaire (toc-list)

Lignes : `[§NN] [——— filet ———] [Titre] [↓ ou ↗]`. Au repos, §NN en `--ink-mute` (doctrine bicolore §NN). Au hover/focus, §NN passe en `--link-color` + `text-shadow --link-shadow` (variables inline par item, donc chaque section a sa propre paire). Le titre passe en `--accent-deep`, la flèche `↓` se traduit de 0.15em vers le bas en `ease-out-expo`. `↗` pour les liens externes / routes.

### Listing Radical

Bloc code sombre (cream en dark) plein cadre, bordure `--rule-strong`. Header inversé optionnel avec caption `▍ LISTING N · NOM` (cyan) + type-tag (jaune ou couleur explicite) à droite. Body en mono, font-size 0.92rem ou 0.78rem en floating. Couleurs sémantiques `lucid-lint` (warning yellow, info blue, problem pink, etc.) appliquées via classes `.lt-*` au sein du `<pre><code>`. Variantes flottées `.listing--right` / `.listing--left` avec marges resserrées (`0.5em 0 0.8em 1em`).

### Callout & OURS

Deux variantes éditoriales :
- **Callout** : fond `--surface-sub`, bordure haute 3px `--accent`. Label mono caps `▌ APPEL À RÉPONSE` en `--ink-mute`. Signature italique en pied (`-- Bastien Gallay`).
- **OURS** : cadre 1px `--rule-strong`, fond transparent. Label `▍ OURS` en `--section-color`. Bloc d'identification éditoriale en bas de la section Contact.

### Toggle Thème

Bouton inline `border: 1px solid var(--rule)` avec carré `--surface-ink` 0.55rem + label dynamique "Passer en sombre" / "Passer en clair". Hover : bordure passe en `--rule-strong`, texte en `--accent-deep`. Persistance via `localStorage`. Pré-bootstrap inline dans `<head>` pour éviter le FOUC.

### Mark (.mark / .mark--soft)

Emphase yellow `#ffd900` fixe (theme-independent) :
- `.mark` : fond plein, signature forte pour titres et passages-clés.
- `.mark--soft` : `text-decoration: underline #ffd900` 3px, discrète, pour prose courante.

### Asides Flottées (.listing--right / .listing--left)

Variante flottée du listing radical. Largeur max `min(45%, 32rem)`, marges asymétriques tassées (côté flush = 0, côté prose = `0.8em`/`1em`). Dé-flotte en pleine mesure < 60rem.

### Liens

- **Prose** (`.prose a` ou `.ecrit-page__content a`) : `text-decoration: underline var(--rule-strong) 1px`, offset 0.2em. Hover : underline color → `--accent`.
- **CTA** (`.focus__cta-link`, `.ecrits-teaser__cta-link`) : `border-bottom: 1px solid var(--rule-strong)`. Hover : passe en 2px `--accent`. Flèche `↗` (externe) ou `→` (interne) animée légèrement.
- **Liens projets** (`.famille__projects a`) : même règle que CTA, plus marqué d'emblée.

## 6. Do's and Don'ts

### Do:

- **Do** poser toutes les couleurs en OKLCH (`oklch(L C H)`). Tinte les neutres vers le hue accent (~25-70) à chroma 0.005-0.020. **Jamais** `#fff` ni `#000` purs.
- **Do** utiliser la marque `▌` (pleine, indication d'item édito) et `▍` (intermédiaire, marque d'aside/caption) pour ouvrir les labels caps. Les autres marques rares (`‖`, `¼`, etc.) sont interdites.
- **Do** suffixer les titres principaux d'un `.` accent rouge (`<i class="hero__title-mark">.</i>`). C'est la signature.
- **Do** numéroter chaque section en `§NN`, sous-section en `§NN.NN` avec leading zero (`§04.01`, pas `§4.1`).
- **Do** garder le `§NN` en `--ink-mute` au repos partout (rail, sommaire, badges) sauf hero monumental.
- **Do** capper la prose à 68ch (`--measure-base`) et le lead à 48ch (`--measure-narrow`).
- **Do** activer un type-tag de listing seulement si la couleur encode l'info (langage : jaune ; technologie : couleur dédiée).
- **Do** tester chaque interaction sous `prefers-reduced-motion: reduce` : aucune translation, aucun fade au-delà de 140ms.
- **Do** servir Redaction self-hosted via `<link rel="preload">` + `font-display: swap`.

### Don't:

- **Don't** utiliser `border-left` ou `border-right` > 1px comme accent coloré. Pattern admin/dashboard, banni par le skill. Utilise une bordure pleine 1px, un fond teinté, ou un préfixe `▌` `▍`.
- **Don't** appliquer `background-clip: text` avec un gradient. Aucune gradient text. Emphase par poids ou taille.
- **Don't** poser une ombre décorative (`box-shadow: 0 4px 12px ...`). Doctrine plate. La seule ombre acceptée est l'ombre typographique bicolore des §NN.
- **Don't** utiliser de glassmorphism décoratif (cards floues, hero blur). Seul le backdrop-filter de `.rail` sticky est autorisé, pour préserver la lisibilité au scroll.
- **Don't** empiler des cards icône + titre + corps répétées en grille. Le pattern est interdit (cliché SaaS). Si tu as deux items similaires, utilise une table éditoriale ou un sommaire `§NN`.
- **Don't** poser une template "hero-metric" (big number + small label + supporting stats). Cliché SaaS. Le hero est typographique.
- **Don't** ouvrir un modal pour résoudre un problème de scope. Privilégier inline / progressive disclosure / nouvelle route.
- **Don't** écrire d'em-dashes (`—`, `--`) dans la copy. Virgule, deux-points, point-virgule, point ou parenthèses.
- **Don't** importer de fonte Fraunces, Instrument Serif, Syne, Plex, Inter, DM Sans, Plus Jakarta. La signature passe par Redaction + Geist exclusivement.
- **Don't** utiliser une couleur sémantique pour décorer. Si la couleur n'encode pas un état (warning, info, problem, success, chrome) ou une section, retire-la.
- **Don't** ajouter une couleur "secondaire de soutien" en plus de l'accent rouge. La règle Un Accent tient.
- **Don't** sortir le rail latéral nin.com de sa forme actuelle (bande sticky haute) ni le remplacer par un hamburger en mobile. Adaptation, pas amputation.
