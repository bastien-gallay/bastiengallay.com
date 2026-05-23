# .impeccable.md — design context pour `bastiengallay.com`

Source de vérité pour toute future invocation de `/impeccable craft`.
Mise à jour le 2026-05-14 via `/impeccable teach`.

## Design Context

### Users

**Cible primaire : pairs OSS / devs curieux.** Quelqu'un qui est tombé
sur lucid-lint, daily-ops ou un thread Bastien et veut comprendre en
30 secondes :

1. Qui c'est, en une phrase honnête (pas un pitch LinkedIn).
2. Sur quoi il travaille en ce moment (vedette : lucid-lint).
3. Quels autres projets sont liés (umbrella vers Teragone Factory +
   pôles).
4. Comment lire ses écrits ou le contacter.

Contexte de lecture : diurne, écran de dev, scan rapide → décision
"je bookmark / je clique sur un projet / je me casse". Jugement
implicite sur la crédibilité technique fondé sur la qualité visuelle
elle-même : un dev OSS qui soigne sa typo et son layout signale qu'il
soigne aussi son code.

**Cible secondaire :** prospects clients / contacts pro arrivés via
Teragone Factory ou bouche-à-oreille. Ne pas les exclure, mais ne pas
optimiser pour eux — le site umbrella suffit à pivoter vers la page de
la factory si besoin pro.

### Brand Personality

Trois mots : **bricoleur · curieux · ludique**.

Plus précisément :

- **Bricoleur** au sens noble : atelier visible, traces de fabrication
  assumées, on voit que c'est *fait*. Pas le bricoleur amateur — le
  bricoleur qui sait choisir ses outils.
- **Curieux** : ouvre des sujets variés (accessibilité cognitive,
  productivité IA, droit via gallay-avocat.fr) sans s'enfermer dans une
  niche. Le site doit refléter cette amplitude sans paraître dispersé.
- **Ludique** : autorise une petite touche d'inattendu, un easter egg,
  une transition qui sourit. Pas grave, pas pompeux. Mais **geek sans
  kitsch** — pas de pixel art, pas d'emoji 8-bit, pas de glitch effect
  gratuit.

Émotions à évoquer : *je veux savoir ce qu'il fait d'autre*, *ce mec
a du goût*, *je peux lui faire confiance sur la qualité*.

### Aesthetic Direction

**Direction retenue : éditorial sobre avec parti pris graphique
fort.** Hybride entre la sobriété typographique des sites perso devs
(rauno.me, paco.me) et la composition assumée de l'éditorial atypique
(ai-2027.com).

Références positives (citées par Bastien) :

- **rauno.me / paco.me / leerob.io** — mono-page sobres, beaucoup
  d'air, micro-interactions discrètes, dark/light propres.
- **Stripe / Linear / Astro docs** — typo impeccable, hiérarchie nette,
  presque pas de couleur sauf accents fonctionnels.
- **ai-2027.com** — "fausse simplicité" + clarté éditoriale. Donne le
  ton sur la mise en page longue/scrollée.
- **whitestripes.com (style album *De Stijl*)** — géométrie radicale,
  palette à trois couleurs (rouge / noir / blanc), composition
  Mondrian-esque. Source d'inspiration pour la palette et les blocs.
- **nin.com** — simplicité d'organisation, typo minimaliste, **menu
  latéral gauche "à l'ancienne"** comme idée structurelle.

Anti-références (implicites — "geek sans kitsch / peu de couleurs") :

- Pas de palette AI typique (cyan-sur-dark, gradients violet→bleu,
  néon).
- Pas de stack de cards-avec-icône-arrondi répétées.
- Pas de glassmorphism, pas d'aurora-blur en hero.
- Pas de gradient text, jamais.
- Pas de border-left coloré sur les blocs (pattern admin/dashboard).
- Pas de "developer mono-everywhere" — la mono peut intervenir, mais
  pas comme béquille.

**Thème :** light par défaut, dark accessible via toggle. Le toggle
existe parce que la cible primaire (devs) passe sa journée en dark et
peut vouloir l'option ; mais le default light cadre mieux avec la
lecture diurne d'un prospect non-dev et avec le parti pris éditorial
*De Stijl* (qui est blanc-cassé, pas noir).

**Palette directrice (à raffiner en `craft`) :**

- Neutre dominant : blanc-cassé chaud tendant légèrement vers le sable
  (jamais `#fff` pur). Tinté très subtilement vers le hue accent.
- Texte : noir tinté chaud (jamais `#000` pur).
- Un accent unique, saturé, utilisé avec parcimonie (≤10 % de poids
  visuel). Candidat fort : un rouge éditorial profond (clin d'œil
  *De Stijl*), à confirmer en craft. **Pas** de bleu primaire — trop
  attendu.
- Éviter toute deuxième couleur d'accent ; la rareté de la première
  fait son impact.

**Typographie (à raffiner en `craft`) :**

- Display : une fonte avec **caractère** — soit grotesque inattendue,
  soit serif géométrique, soit display un peu mécanique. **Pas** dans
  la liste `reflex_fonts_to_reject` du skill (donc pas Fraunces, pas
  Instrument Serif, pas Syne, pas Plex, etc.). Sources candidates :
  Pangram Pangram, ABC Dinamo, Klim Type Foundry, Velvetyne.
- Body : sans-serif neutre très lisible, mais avec un grain (pas Inter,
  pas DM Sans, pas Plus Jakarta). Pistes à explorer côté open : la
  famille Velvetyne (Cirruscumulus, Le Murmure), ou des grotesques
  moins vus comme Authentic Sans, Mier, Public Sans, Geist Sans.
- Le pairing exact se décide en `craft` après essai sur la hero — pas
  en `teach`.

### Design Principles

Cinq principes opérables, dérivés de la conversation. Toute décision
design future doit pouvoir s'y rattacher.

1. **L'air est un parti pris.** Beaucoup d'espace blanc, hiérarchie
   portée par le contraste typographique et le rythme spatial, pas par
   les cards ou les borders. Si un bloc a besoin d'une boîte pour
   exister, le bloc est mal écrit.

2. **Une couleur, deux neutres, point.** Palette restreinte assumée.
   L'accent est rare — c'est ce qui le rend mémorable. Pas de "palette
   secondaire de soutien".

3. **Trace de l'atelier visible.** Le site doit donner envie de cliquer
   sur "view source". Petits détails artisanaux : ancres
   typographiques, micro-easter-eggs, choix de fonte qui sort du
   sentier. Mais **rien de kitsch** — la trace est dans le choix, pas
   dans le décor.

4. **Umbrella, pas monorepo visuel.** Chaque projet OSS lié garde son
   identité ailleurs ; ici on les *présente*. Donc pas de logos
   importés en chaîne, pas de captures uniformisées de force — chaque
   pôle peut avoir un petit traitement qui lui est propre tant que
   l'ensemble reste cohérent.

5. **Mobile = adaptation, pas amputation.** Le menu latéral gauche
   style nin.com devient une nav top sticky ou un drawer en mobile —
   il ne disparaît pas. Le contenu se réorganise, jamais ne s'abrège.

---

## Notes de portée (non normatives)

- Accessibilité : viser WCAG AA par défaut, sans en faire un objectif
  de communication. Le skill `lucid-lint` est mentionné sur le site →
  le site lui-même doit être irréprochable côté contraste et structure
  sémantique sous peine d'incohérence narrative.
- Reduced motion respecté pour toute animation au-delà de la
  micro-interaction.
- Pas de cookie banner (site statique, pas de tracking).
- Stack : Zola + Tera templates, Sass activé, pas de JS framework.
  Toute interaction passe par du JS vanilla ou aucune.

---

## Pattern aside — figures & code en marge

Spec validée le 2026-05-23. Régit les trois familles de « boîtes
éditoriales » des articles : listings (`{% listing %}`), visuels
(`{% visuel_* %}`) et fenced code markdown (` ``` `). Objectif :
**un seul modèle de marge, un jeu de contrôles commun, une a11y
homogène.**

### Position — une seule piste, à droite

- Toute boîte « aside » porte le modificateur `--side` et migre dans la
  piste `--side-track` (22 rem, **hors mesure**, déjà posée dans
  `_routes.scss`) via `float: right` + marge négative — pattern ai-2027.
  La prose conserve sa pleine largeur ; la figure se loge dans la marge.
- **Pas de variante gauche.** `listing--left` est obsolète (la fusion
  rail→header sticky a libéré les deux marges, mais on ne garde qu'un
  axe éditorial à droite). Migrer le `side="left"` restant de
  `content/ecrits/2026-05-22-pourquoi-ce-site` vers `side="right"`.
- **Pas de float-dans-mesure.** L'ancien `listing--right` (width 40 %
  dans la colonne de texte, qui étrangle la prose) est remplacé par le
  même `--side` que les visuels. Un seul mécanisme.
- **Fenced code brut ne va jamais en marge** : Zola ne pose pas de
  classe sur les ` ``` `, donc la « version aside » d'un bloc de code
  s'écrit explicitement en `{% listing(side="right") %}`. Les fenced
  bruts restent pleine `--measure-base`.
- **Breakpoint < 60 rem** : dé-flottement → pleine largeur, taille body
  restaurée, barre de contrôles repliée sous le header.
- Pas de sticky (CSS-only ; l'ancre = position dans le markdown). Le
  suivi-scroll JS reste un follow-up.

### Contrôles — barre `.box__tools`, 3 boutons icônes

Ancrée en haut-droite du body (près du tag `data-lang`). JS vanilla.

- **Copier** (presse-papier) — `navigator.clipboard.writeText` puis
  label « Copié ✓ » pendant 2 s.
- **Taille** (lisibilité in-place) — cycle S → M → L sur
  `--listing-body-size`.
- **Zoom complet** (sortir de la marge) — promeut le bloc en `<dialog>`
  plein écran, taille L.

Rationale taille/zoom : en piste 22 rem le mono tombe à ~0.78 rem.
« Taille » donne un cran de confort sans casser la mise en page ;
« Zoom complet » est l'échappatoire quand le bloc déborde la marge.

### États

- **Boutons** : repos (opacity 0.55) → hover (opacity 1, fond
  `--surface-sub` translucide) → focus-visible (outline accent 2 px,
  offset) → active (translateY 1 px).
- **Copié** : swap glyphe + texte, annonce `aria-live="polite"`, retour
  auto au repos.
- **Zoom** : `<dialog>` natif (`role="dialog"`, `aria-modal`), focus
  piégé, **Esc** ferme, focus rendu au déclencheur, `::backdrop`
  assombri.
- **Scroll horizontal** : le `<pre>` reçoit `tabindex="0"` +
  `aria-label` (atteignable/scrollable au clavier — WCAG 2.1.1).

### Labels a11y

- Boutons : `aria-label` français explicites — « Copier le code »,
  « Changer la taille du texte », « Afficher en plein écran ». Icône
  `aria-hidden`, texte en `.visually-hidden`.
- `prefers-reduced-motion` : coupe les transitions copié/zoom.
- `<dialog>` zoom : `aria-label` reprend le caption/tag du bloc.
