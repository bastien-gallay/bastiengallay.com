+++
title = "Atelier d'essais : motifs radicaux"
date = 2026-05-21
description = "Page d'essai pour itérer les motifs radicaux du poster ai-swe avant intégration au site live. Pas listée dans le sommaire."
template = "lab-page.html"
+++

<style>
/* ── Styles isolés à la page de test, scope #lab ──────────── */

#lab section { margin-block: var(--space-2xl); }
#lab section + section { border-top: 1px solid var(--rule); padding-top: var(--space-xl); }

#lab h2.test-h2 {
  font-family: var(--font-display);
  font-size: var(--text-2xl);
  letter-spacing: -0.02em;
  margin: 0 0 var(--space-2xs);
  color: var(--surface-ink);
}

#lab h3.test-h3 {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-caps);
  text-transform: uppercase;
  color: var(--ink-mute);
  margin: 0 0 var(--space-md);
  font-weight: 500;
}

#lab .test-note {
  font-style: italic;
  color: var(--ink-mute);
  margin: var(--space-md) 0 0;
  font-size: var(--text-sm);
  max-width: var(--measure-base);
}

#lab .test-note strong {
  font-style: normal;
  color: var(--surface-ink);
  font-weight: 500;
}

/* ── A. Variants de cards par section ─────────────────────── */

#lab .test-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  gap: var(--space-md);
  margin-block: var(--space-lg);
}

#lab .test-card { display: grid; gap: var(--space-2xs); }

#lab .test-card--frame {
  border: 1px solid var(--rule-strong);
  padding: var(--space-md);
}

#lab .test-card--lframe {
  border-top: 6px solid var(--card-color);
  border-left: 6px solid var(--card-color);
  padding: var(--space-md);
  background: var(--surface-sub);
}

#lab .test-card--stripe {
  border-top: 8px solid var(--card-color);
  padding: var(--space-md) 0;
}

#lab .test-card__num {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 6vw, 4rem);
  line-height: 0.9;
  color: var(--card-color);
  font-variant-numeric: tabular-nums lining-nums;
}

#lab .test-card__label {
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  letter-spacing: var(--tracking-caps);
  text-transform: uppercase;
  font-weight: 500;
  color: var(--surface-ink);
  margin: var(--space-2xs) 0 var(--space-xs);
}

#lab .test-card__body {
  font-size: var(--text-sm);
  color: var(--ink-soft);
  margin: 0;
  line-height: var(--leading-snug);
  max-width: none;
}

/* ── B. Listing radical ───────────────────────────────────── */

/* Stratégie contraste cohérente entre light et dark : listing-bg
   sombre en light (max contraste sur cream) ; en dark, un cran
   au-dessus de la surface pour ressortir sans pure inversion. */
#lab .listing-radical {
  --listing-bg: oklch(0.155 0.010 28);
  --listing-fg: oklch(0.93 0.008 65);
  margin-block: var(--space-md);
  font-family: var(--font-mono);
  font-size: 0.92rem;
  line-height: 1.65;
  max-width: 100%;
  overflow: hidden;
}

:root[data-theme="dark"] #lab .listing-radical {
  --listing-bg: oklch(0.22 0.012 28);
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) #lab .listing-radical {
    --listing-bg: oklch(0.22 0.012 28);
  }
}

#lab .listing-radical__header {
  display: flex;
  align-items: stretch;
  background: var(--listing-bg);
  color: var(--listing-fg);
  border: 1px solid var(--rule-strong);
  border-bottom: 0;
}

#lab .listing-radical__caption {
  flex: 1;
  padding: 0.6rem var(--space-md);
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-caps);
  text-transform: uppercase;
  color: oklch(0.75 0.014 50);
  align-self: center;
}

#lab .listing-radical__caption::before {
  content: "▍ ";
  color: var(--c-info);
}

#lab .listing-radical__tag {
  background: var(--tag-color, var(--c-warning));
  color: oklch(0.155 0.010 28);
  padding: 0.6rem var(--space-md);
  font-size: var(--text-xs);
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-weight: 600;
  display: flex;
  align-items: center;
}

#lab .listing-radical pre {
  margin: 0;
  padding: var(--space-lg) var(--space-md);
  background: var(--listing-bg);
  color: var(--listing-fg);
  border: 1px solid var(--rule-strong);
  border-top: 0;
  overflow-x: auto;
  white-space: pre;
  scrollbar-color: var(--rule-strong) transparent;
  scrollbar-width: thin;
}

/* Strike : fond pink seulement, plus de wavy line. */
#lab .strike {
  background: var(--c-problem);
  color: oklch(0.155 0.010 28);
  padding: 0.05em 0.3em;
  border-radius: 1px;
  font-weight: 500;
}

#lab .listing-radical .lt-mute    { color: oklch(0.62 0.010 50); }
#lab .listing-radical .lt-info    { color: var(--c-info); }
#lab .listing-radical .lt-warning { color: var(--c-warning); }
#lab .listing-radical .lt-success { color: var(--c-success); }
#lab .listing-radical .lt-problem { color: var(--c-problem); }
#lab .listing-radical .lt-chrome  { color: var(--c-chrome); font-weight: 500; }

/* ── C. Titres polychromes ────────────────────────────────── */

#lab .poly-title {
  font-family: var(--font-display);
  font-weight: 400;
  font-size: clamp(2.5rem, 7vw, 5rem);
  line-height: 0.95;
  letter-spacing: -0.025em;
  margin: var(--space-md) 0 0;
  text-wrap: balance;
  color: var(--surface-ink);
}

/* Yellow marker en valeur fixe (poster #ffd900) pour rester punchy
   dans les deux thèmes. Le --c-warning du site (calibré pour AA)
   tombait trop éteint en light mode. */
#lab .highlight-marker {
  background: #ffd900;
  color: oklch(0.155 0.010 28);
  padding: 0.05em 0.3em;
  font-weight: inherit;
  box-decoration-break: clone;
}
</style>

<section id="lab">

<section>

<h2 class="test-h2">A. Cards par section, trois variants.</h2>
<h3 class="test-h3">Item #5 du poster &middot; trois traitements possibles, à comparer côte-à-côte.</h3>

<div class="test-cards">
  <article class="test-card test-card--frame" style="--card-color: var(--c-problem);">
    <span class="test-card__num">01</span>
    <p class="test-card__label">Cadre plein</p>
    <p class="test-card__body">
      Border 1px sur les 4 côtés, numéro et label en couleur de section.
      Respecte les bans de la skill (pas de side-stripe). Sobre,
      cohérent avec le cadre hero du site live.
    </p>
  </article>

  <article class="test-card test-card--lframe" style="--card-color: var(--c-info);">
    <span class="test-card__num">02</span>
    <p class="test-card__label">L-frame</p>
    <p class="test-card__body">
      Border top + left 6px en couleur. Reproduit fidèlement le motif
      du poster. Entorse documentée à la règle anti-side-stripe : à
      n'envisager que si l'effet visuel le justifie.
    </p>
  </article>

  <article class="test-card test-card--stripe" style="--card-color: var(--c-warning);">
    <span class="test-card__num">03</span>
    <p class="test-card__label">Top-stripe</p>
    <p class="test-card__body">
      Border-top 8px coloré, reste neutre. Compromis : visuel marqué
      sans violer le ban skill (le ban porte sur left ou right, pas
      sur top). Le plus économique en bordures.
    </p>
  </article>
</div>

<p class="test-note">
  <strong>Verdict (21/05) :</strong> 01 et 03 retenus, mais parqués pour
  un futur usage « article riche » (illustrations, encarts, contenu
  scrollé long). Pas d'intégration au sommaire principal pour l'instant.
  02 (L-frame) écarté : s'éloigne trop du registre presse-revue.
</p>

</section>

<section>

<h2 class="test-h2">B. Listing radical avec type-tag.</h2>
<h3 class="test-h3">Item #6 du poster &middot; header inversé avec tag de langage, strikethrough wavy sur erreurs.</h3>

<div class="listing-radical">
  <div class="listing-radical__header">
    <span class="listing-radical__caption">LISTING 1 &middot; SUM_FIRST_N.LEAN &middot; MODEL OUTPUT</span>
    <span class="listing-radical__tag" style="--tag-color: var(--c-warning);">LEAN 4</span>
  </div>
<pre><code><span class="lt-mute">/-- The sum of the first n positive integers is n * (n + 1) / 2. --/</span>
<span class="lt-info">theorem</span> sum_first_n (n : ℕ) : (range (n + 1)).sum id = n * (n + 1) / 2 :=
  <span class="strike">begin</span>                                  <span class="lt-mute">-- Lean 3 syntax in a Lean 4 file</span>
  induction n with n ih,
  { simp [range] },
  { rw [range_succ],
    rw [sum_insert (not_mem_range_self (n + 1))],
    rw [ih],
    ring }
  <span class="strike">end</span>                                    <span class="lt-mute">-- ▲ should be Lean 4's "by ... " block</span>
</code></pre>
</div>

<p class="test-note">
  <strong>Notes :</strong> type-tag pill yellow en haut à droite, dans le
  header inversé. Strikethrough wavy rouge sur les keywords obsolètes
  (begin/end Lean 3). Caption à gauche avec marque <code>▍</code> bleue.
  Lisible, dense, signe le contenu technique sans le banaliser.
</p>

<div class="listing-radical">
  <div class="listing-radical__header">
    <span class="listing-radical__caption">LISTING 2 &middot; PARSE.RS &middot; ÉCHANTILLON</span>
    <span class="listing-radical__tag" style="--tag-color: var(--c-info);">RUST</span>
  </div>
<pre><code><span class="lt-info">use</span> std::num::ParseIntError;

<span class="lt-mute">/// Parse a positive integer from a string slice.</span>
<span class="lt-info">pub fn</span> <span class="lt-warning">parse_positive</span>(s: &amp;<span class="lt-info">str</span>) -&gt; <span class="lt-info">Result</span>&lt;<span class="lt-info">u32</span>, ParseIntError&gt; {
    <span class="lt-info">let</span> n = s.trim().parse::&lt;<span class="lt-info">u32</span>&gt;()?;
    <span class="lt-success">Ok</span>(n)
}
</code></pre>
</div>

<p class="test-note">
  <strong>Variante :</strong> même structure, tag <code>RUST</code> en bleu
  (pas yellow). Le type-tag prend la couleur la plus liée au langage / au
  rôle ; ici bleu pour rappeler la doc info. La distribution des couleurs
  reste sémantique (mute pour commentaires, info pour keywords, warning
  pour identifiants de fonction, success pour <code>Ok</code>).
</p>

</section>

<section>

<h2 class="test-h2">C. Titres polychromes.</h2>
<h3 class="test-h3">Items #8 et #9 du poster &middot; variations chromatiques dans les gros titres.</h3>

<p class="poly-title">
<span style="color: var(--c-problem);">CHAL</span><span style="color: var(--c-warning);">LEN</span><span style="color: var(--c-info);">GES</span>
<span>&amp; PATHS</span>
</p>

<p class="test-note">
  <strong>Variante #8 (écartée) :</strong> syllabes en couleurs différentes.
  Effet poster A0 immédiat, mais trop chargé. Réservé à un titre
  événementiel unique, pas à un titre récurrent.
</p>

<p class="poly-title">
The <span class="highlight-marker">whole point</span>, in one breath.
</p>

<p class="test-note">
  <strong>Variante #9 (retenue) :</strong> un seul groupe de mots en yellow
  highlight (marker). Plus contrôlable, plus poster « édito » que poster
  graphic-design. Le même mécanique sert à mettre en valeur un mot dans
  un titre <em>ou</em> un passage dans la prose. Une seule mécanique
  d'emphase, deux usages.
</p>

<p class="poly-title">
Pourquoi ce site, et pourquoi <span class="highlight-marker">maintenant</span>.
</p>

<p class="test-note">
  <strong>#9 appliquée au titre article :</strong> exemple direct. Le mot
  <em>maintenant</em> reçoit le marker yellow ; le reste du titre garde sa
  rigueur. Plus signal-fort que la variante mixte (colorisation partielle)
  qu'on avait essayée précédemment.
</p>

<p class="poly-title">
Pourquoi ce <span style="color: var(--c-problem);">site</span>, et pourquoi <span style="color: var(--c-success);">maintenant</span>.
</p>

<p class="test-note">
  <strong>Variante mixte (écartée) :</strong> conservée ici à titre de
  comparaison. Mots-clés en couleur de section ; trop dispersé et concurrent
  avec le système de couleurs section qui existe déjà au niveau des
  overlines.
</p>

</section>

<section>

<h2 class="test-h2">D. Application : extraits du site.</h2>
<h3 class="test-h3">Les motifs retenus appliqués à du contenu réel du site live.</h3>

<p class="test-note" style="margin-top: 0;">
  Trois extraits pour valider l'intégration à l'identique : un listing
  lucid-lint reformaté en radical avec type-tag ; le titre de l'article
  « Pourquoi ce site » avec polychrome mesurée ; et une phrase-clé de
  l'article avec marker yellow.
</p>

<div class="listing-radical">
  <div class="listing-radical__header">
    <span class="listing-radical__caption">SORTIE LUCID-LINT &middot; README.MD</span>
    <span class="listing-radical__tag" style="--tag-color: var(--c-warning);">v0.2.0</span>
  </div>
<pre><code><span class="lt-mute">$</span> lucid-lint check README.md
<span class="lt-mute">~~~~~ ⟨ • ⟩ ─────</span>  <span class="lt-chrome">lucid-lint</span>  v0.2.0
                    <span class="lt-mute">cognitive accessibility linter · prose · EN / FR</span>

<span class="lt-warning">warning</span> <span class="lt-mute">README.md:3:1</span>   Sentence is 29 words long (maximum 22). <span class="lt-problem">[structure.sentence-too-long]</span>
<span class="lt-info">info</span>    <span class="lt-mute">README.md:1:1</span>   Kandel-Moles ease score 72.9. <span class="lt-problem">[readability.score]</span>

<span class="lt-mute">summary:</span> <span class="lt-warning">7 warnings</span>, <span class="lt-info">1 info</span>.

score: <span class="lt-problem">50/100</span>
        <span class="lt-mute">structure</span>   <span class="lt-problem">▓▓▓░░░░░░░░░░░░░░░░░</span>   5/20
        <span class="lt-mute">rhythm</span>      <span class="lt-success">▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓</span>  20/20
        <span class="lt-mute">lexicon</span>     <span class="lt-problem">▓▓▓▓▓▓░░░░░░░░░░░░░░</span>  10/20
exit: <span class="lt-problem">1</span>
</code></pre>
</div>

<p class="test-note">
  <strong>Listing lucid-lint en radical :</strong> par rapport au listing
  actuel du Focus, on gagne le type-tag <code>v0.2.0</code> en pill yellow
  et le header inversé qui isole la caption du body. Contraste plus
  cohérent entre les deux thèmes.
</p>

<p class="poly-title">
Pourquoi ce site, et pourquoi <span class="highlight-marker">maintenant</span>.
</p>

<p class="test-note">
  <strong>Titre article avec marker #9 :</strong> identique au titre actuel
  mais avec <em>maintenant</em> en yellow highlight. Le « pourquoi
  maintenant » devient la question signal de l'article, pas juste un titre
  monochrome. À comparer avec la version actuelle pour décider.
</p>

<p style="font-family: var(--font-display); font-size: var(--text-lg); line-height: var(--leading-snug); margin: var(--space-md) 0 0; max-width: var(--measure-base);">
  Cette discipline est l'<span class="highlight-marker">alignement de la pensée avec l'écrit</span>. J'en ai appris l'exigence par le code, mais elle dépasse le code.
</p>

<p class="test-note">
  <strong>Phrase article avec marker #9 :</strong> extrait du premier acte
  de l'article. Même mécanique que pour le titre ci-dessus : un yellow
  highlight isole la phrase-clé sans la coloriser ni la grossir. Une seule
  doctrine d'emphase, titres et prose confondus.
</p>

</section>

</section>
