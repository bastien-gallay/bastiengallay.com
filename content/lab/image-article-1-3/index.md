+++
title = "Atelier d'essais : image article IA-lentement 1/3"
date = 2026-05-26
description = "Cover sociale, hero in-article, miniature de liste et carte « À la une » pour l'article 1/3 « Avec l'IA, je code plus lentement ». Style cible : pop, traits marqués, aplats tranchants, sans personnage."
template = "lab-page.html"
+++

<style>
#lab section { margin-block: var(--space-2xl); }
#lab section + section { border-top: 1px solid var(--rule); padding-top: var(--space-xl); }
#lab h2.test-h2 { font-family: var(--font-display); font-size: var(--text-2xl); letter-spacing: -0.02em; margin: 0 0 var(--space-2xs); color: var(--surface-ink); }
#lab h3.test-h3 { font-family: var(--font-mono); font-size: var(--text-xs); letter-spacing: var(--tracking-caps); text-transform: uppercase; color: var(--ink-mute); margin: var(--space-md) 0 var(--space-sm); font-weight: 500; }
#lab .test-note { font-style: italic; color: var(--ink-mute); margin: var(--space-md) 0 0; font-size: var(--text-sm); max-width: 48rem; }
#lab .validation { font-family: var(--font-mono); font-size: var(--text-xs); text-transform: uppercase; letter-spacing: var(--tracking-caps); color: var(--c-success, #2a7a4a); background: color-mix(in oklch, var(--c-success, #2a7a4a) 14%, transparent); padding: 2px 8px; border-radius: 2px; }
#lab .essai-og { display: flex; flex-direction: column; gap: var(--space-xs); max-width: 56rem; }
#lab .essai-og__svg { width: 100%; aspect-ratio: 1200 / 630; background: #f5efe6; border: 1px solid var(--rule); box-shadow: 0 1px 0 var(--rule); }
#lab .essai-og__legend { font-family: var(--font-mono); font-size: var(--text-xs); text-transform: uppercase; letter-spacing: var(--tracking-caps); color: var(--ink-mute); display: flex; justify-content: space-between; gap: var(--space-sm); }
#lab .essai-og__legend strong { color: var(--surface-ink); font-weight: 500; }
#lab .essai-og__note { font-size: var(--text-sm); color: var(--ink-soft); margin: 0; }
#lab .essais-hero { display: grid; grid-template-columns: 1fr; gap: var(--space-xl); }
#lab .essai-mini { display: grid; grid-template-columns: 180px 1fr; gap: var(--space-md); align-items: start; padding: var(--space-md) 0; border-bottom: 1px solid var(--rule); max-width: 42rem; }
#lab .essai-mini__cover { width: 180px; height: 120px; background: #f5efe6; display: block; }
#lab .essai-mini__body { font-size: var(--text-sm); }
#lab .essai-mini__body p { margin: 0 0 var(--space-3xs); }
#lab .essai-mini__date { font-family: var(--font-mono); font-size: var(--text-xs); text-transform: uppercase; color: var(--ink-mute); }
#lab .essai-mini__title { font-family: var(--font-display); font-size: var(--text-lg); letter-spacing: -0.01em; color: var(--surface-ink); }
#lab .essai-mini__legend { font-family: var(--font-mono); font-size: var(--text-xs); text-transform: uppercase; color: var(--ink-mute); }
#lab .essai-une { border: 1px solid var(--rule); background: var(--surface-sub); padding: var(--space-md); display: grid; grid-template-columns: 80px 1fr; gap: var(--space-md); align-items: start; max-width: 30rem; }
#lab .essai-une__cover { width: 80px; height: 80px; background: #f5efe6; }
#lab .essai-une__kicker { font-family: var(--font-mono); font-size: var(--text-2xs); text-transform: uppercase; color: var(--ink-mute); letter-spacing: var(--tracking-caps); margin: 0 0 var(--space-3xs); }
#lab .essai-une__title { font-family: var(--font-display); font-size: var(--text-base); color: var(--surface-ink); margin: 0 0 var(--space-3xs); }
#lab .essai-une__meta { font-family: var(--font-mono); font-size: var(--text-2xs); color: var(--ink-mute); }
#lab .rappel { background: var(--surface-sub); border-left: 4px solid #b8252e; padding: var(--space-md) var(--space-lg); max-width: 48rem; }
#lab .rappel h3 { font-family: var(--font-display); font-size: var(--text-xl); margin: 0 0 var(--space-sm); color: var(--surface-ink); }
#lab .rappel h3 mark { background: transparent; color: #b8252e; font-weight: inherit; }
#lab .rappel p { margin: 0 0 var(--space-2xs); color: var(--ink-soft); font-size: var(--text-sm); line-height: 1.6; }
#lab .meta-note { background: color-mix(in oklch, var(--c-warning, #d4a017) 8%, transparent); border-left: 3px solid var(--c-warning, #d4a017); padding: var(--space-sm) var(--space-md); margin: var(--space-md) 0; max-width: 48rem; font-size: var(--text-sm); }
#lab .meta-note strong { font-family: var(--font-mono); font-size: var(--text-xs); text-transform: uppercase; letter-spacing: var(--tracking-caps); display: block; margin-bottom: var(--space-3xs); }
#lab .rejection { font-family: var(--font-mono); font-size: var(--text-xs); text-transform: uppercase; letter-spacing: var(--tracking-caps); color: var(--ink-mute); background: color-mix(in oklch, var(--ink-mute) 14%, transparent); padding: 2px 8px; border-radius: 2px; }
#lab .essais-rejected { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: var(--space-lg); margin: var(--space-md) 0; max-width: 56rem; }
@media (max-width: 60rem) { #lab .essais-rejected { grid-template-columns: 1fr; } }
#lab .essais-rejected .essai-og__svg, #lab .essais-rejected .essai-mini__cover, #lab .essais-rejected .essai-une__cover { opacity: 0.68; filter: saturate(0.78); }
#lab .essais-rejected .essai-mini, #lab .essais-rejected .essai-une { opacity: 0.85; }
#lab h3.test-h3--rejected { color: var(--ink-mute); margin-top: var(--space-xl); border-top: 1px dashed var(--rule); padding-top: var(--space-md); }
</style>

Itération 3 — version validée. Cover sociale **A**, miniature **M2**, carte À la une **sablier**. Hero in-article : deux candidats en compétition (B vs C). Couleurs hardcodées (#b8252e rouge, #ffd900 jaune, #1f3d8c bleu, #111 encre, #f5efe6 crème).

---

## Rappel du ton

<div class="rappel"><h3>Avec l'IA, je code plus <mark>lentement</mark></h3><p><em>Article 1/3 — « ce que les chiffres ne mesurent pas »</em></p><p>Le 4 avril 2026, j'ai vibe-codé un outil en quelques heures pour gérer mes tâches quotidiennes. […] Quatre semaines plus tard, je corrige toujours les bugs de cette élégance.</p><p><strong>Depuis, je code plus lentement. Et je produis plus.</strong></p></div>

---

## Cover sociale (1200×630) <span class="validation">validée</span>

Format universel LinkedIn / Twitter / OG. Triptyque chiffres comic : prédit / perçu / mesuré. Le <code>−19 %</code> rouge oversize sur le panneau crème arrête le scroll.

<div class="essai-og">
<svg class="essai-og__svg" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Cover A : triptyque chiffres comic — +126, +84, −19 %"><rect x="0" y="0" width="1200" height="630" fill="#f5efe6"/><rect x="0" y="50" width="360" height="500" fill="#1f3d8c"/><rect x="360" y="50" width="360" height="500" fill="#ffd900"/><rect x="720" y="50" width="480" height="500" fill="#f5efe6"/><line x1="0" y1="50" x2="1200" y2="50" stroke="#111" stroke-width="6"/><line x1="0" y1="550" x2="1200" y2="550" stroke="#111" stroke-width="6"/><line x1="360" y1="50" x2="360" y2="550" stroke="#111" stroke-width="6"/><line x1="720" y1="50" x2="720" y2="550" stroke="#111" stroke-width="6"/><text x="60" y="34" font-family="ui-monospace, monospace" font-size="20" font-weight="500" letter-spacing="3" fill="#111">AVEC L'IA, JE CODE PLUS LENTEMENT</text><text x="60" y="595" font-family="ui-monospace, monospace" font-size="16" letter-spacing="2" fill="#111">BG · §01.20 · 2026-05-27</text><text x="1140" y="595" text-anchor="end" font-family="ui-monospace, monospace" font-size="16" letter-spacing="2" fill="#111">BASTIENGALLAY.COM</text><text x="60" y="100" font-family="ui-monospace, monospace" font-size="18" letter-spacing="3" fill="#f5efe6">PRÉDIT</text><text x="60" y="120" font-family="ui-monospace, monospace" font-size="13" letter-spacing="2" fill="#f5efe6" opacity="0.7">discours dominant</text><text x="180" y="380" text-anchor="middle" fill="#f5efe6" font-family="Redaction, Georgia, serif"><tspan font-size="150" font-weight="700">+126</tspan><tspan font-size="50" font-weight="500" dx="6">%</tspan></text><text x="380" y="100" font-family="ui-monospace, monospace" font-size="18" letter-spacing="3" fill="#111">PERÇU</text><text x="380" y="120" font-family="ui-monospace, monospace" font-size="13" letter-spacing="2" fill="#111" opacity="0.7">par les devs</text><text x="540" y="380" text-anchor="middle" fill="#111" font-family="Redaction, Georgia, serif"><tspan font-size="170" font-weight="700">+84</tspan><tspan font-size="55" font-weight="500" dx="8">%</tspan></text><text x="740" y="100" font-family="ui-monospace, monospace" font-size="18" letter-spacing="3" fill="#111">MESURÉ</text><text x="740" y="120" font-family="ui-monospace, monospace" font-size="13" letter-spacing="2" fill="#111" opacity="0.7">étude METR</text><text x="960" y="420" text-anchor="middle" fill="#b8252e" font-family="Redaction, Georgia, serif"><tspan font-size="220" font-weight="700">−19</tspan><tspan font-size="80" font-weight="500" dx="10">%</tspan></text></svg>
<p class="essai-og__legend"><strong>A · Triptyque chiffres</strong><span>cover sociale · 1200×630</span></p>
<p class="essai-og__note">Tradeoff assumé : la cover focalise sur l'étude METR (−19 %), c'est un léger spoiler de la première section. Acceptable car la thèse — paradoxe entre perçu et mesuré — est portée par les 3 chiffres ensemble, pas par la valeur seule.</p>
</div>

<h3 class="test-h3 test-h3--rejected">Covers sociales rejetées <span class="rejection">archive</span></h3>

<div class="essais-rejected">
<div class="essai-og">
<svg class="essai-og__svg" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Cover B v1 (rejetée social) : titre + Mondrian"><rect x="0" y="0" width="1200" height="630" fill="#f5efe6"/><rect x="700" y="320" width="500" height="310" fill="#b8252e"/><rect x="980" y="0" width="220" height="320" fill="#ffd900"/><rect x="0" y="490" width="280" height="140" fill="#1f3d8c"/><line x1="700" y1="0" x2="700" y2="630" stroke="#111" stroke-width="14"/><line x1="980" y1="0" x2="980" y2="320" stroke="#111" stroke-width="14"/><line x1="700" y1="320" x2="1200" y2="320" stroke="#111" stroke-width="14"/><line x1="0" y1="490" x2="700" y2="490" stroke="#111" stroke-width="14"/><line x1="280" y1="490" x2="280" y2="630" stroke="#111" stroke-width="14"/><rect x="0" y="0" width="1200" height="630" fill="none" stroke="#111" stroke-width="14"/><text x="40" y="130" font-family="Redaction, Georgia, serif" font-size="82" font-weight="700" fill="#111">AVEC L'IA,</text><text x="40" y="230" font-family="Redaction, Georgia, serif" font-size="82" font-weight="700" fill="#111">JE CODE PLUS</text><text x="950" y="510" text-anchor="middle" font-family="Redaction, Georgia, serif" font-size="78" font-weight="700" fill="#f5efe6">LENTEMENT</text><text x="40" y="555" font-family="ui-monospace, monospace" font-size="16" letter-spacing="2" fill="#f5efe6">BG · §01.20</text><text x="40" y="595" font-family="ui-monospace, monospace" font-size="13" letter-spacing="2" fill="#f5efe6" opacity="0.7">bastiengallay.com</text></svg>
<p class="essai-og__legend"><strong>B v1 · titre + Mondrian</strong><span>rejetée social · redirigée hero</span></p>
<p class="essai-og__note">Première proposition cover sociale. Manque d'impact face au triptyque A (typo seule, pas de chiffre choc). Le concept survit en candidat hero in-article (cf. section Hero, variantes B v3/v3a/v3b).</p>
</div>
<div class="essai-og">
<svg class="essai-og__svg" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Cover C v1 (rejetée social) : sablier + bandeau noir"><rect x="0" y="0" width="1200" height="630" fill="#f5efe6"/><circle cx="780" cy="330" r="240" fill="#ffd900"/><g stroke="#111" stroke-width="10" stroke-linejoin="round" fill="#f5efe6"><path d="M 660 200 L 900 200 L 820 320 L 740 320 Z"/><path d="M 740 360 L 820 360 L 900 480 L 660 480 Z"/></g><path d="M 687 240 L 873 240 L 820 320 L 740 320 Z" fill="#b8252e"/><path d="M 687 440 L 873 440 L 900 480 L 660 480 Z" fill="#b8252e"/><line x1="640" y1="200" x2="920" y2="200" stroke="#111" stroke-width="14" stroke-linecap="round"/><line x1="640" y1="480" x2="920" y2="480" stroke="#111" stroke-width="14" stroke-linecap="round"/><g transform="translate(40, 220) rotate(-6)"><text x="0" y="0" font-family="Redaction, Georgia, serif" font-size="140" font-weight="800" font-style="italic" fill="#b8252e" stroke="#111" stroke-width="3" paint-order="stroke">SLOWWW…</text></g><rect x="0" y="555" width="1200" height="75" fill="#111"/><text x="60" y="600" font-family="Redaction, Georgia, serif" font-size="36" font-weight="700" fill="#f5efe6">Avec l'IA, je code plus lentement</text><text x="1140" y="600" text-anchor="end" font-family="ui-monospace, monospace" font-size="16" letter-spacing="2" fill="#f5efe6" opacity="0.7">§01.20 · BG</text></svg>
<p class="essai-og__legend"><strong>C v1 · sablier + bandeau noir</strong><span>rejetée social · redirigée hero</span></p>
<p class="essai-og__note">Sablier écrasé (ratio H/W 1.0), sable mord les bords noirs (z-order non corrigé), bandeau noir écrasant l'humeur joyeuse. Le concept survit en hero v2 retravaillé (sablier élancé, sable derrière stroke, bandeau bleu).</p>
</div>
<div class="essai-og">
<svg class="essai-og__svg" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Cover D (rejetée) : mix typo + objet"><rect x="0" y="0" width="1200" height="630" fill="#f5efe6"/><rect x="600" y="0" width="600" height="630" fill="#ffd900"/><line x1="600" y1="0" x2="600" y2="630" stroke="#111" stroke-width="10"/><rect x="0" y="0" width="1200" height="630" fill="none" stroke="#111" stroke-width="10"/><text x="50" y="130" font-family="Redaction, Georgia, serif" font-size="70" font-weight="700" fill="#111">AVEC L'IA,</text><text x="50" y="220" font-family="Redaction, Georgia, serif" font-size="70" font-weight="700" fill="#111">JE CODE</text><text x="50" y="310" font-family="Redaction, Georgia, serif" font-size="70" font-weight="700" fill="#111">PLUS</text><rect x="40" y="335" width="510" height="100" fill="#b8252e"/><text x="50" y="408" font-family="Redaction, Georgia, serif" font-size="70" font-weight="700" fill="#f5efe6">LENTEMENT</text><text x="50" y="495" font-family="ui-monospace, monospace" font-size="18" letter-spacing="3" fill="#111">ARTICLE 1/3 · §01.20</text><text x="50" y="525" font-family="ui-monospace, monospace" font-size="14" letter-spacing="2" fill="#111" opacity="0.7">ce que les chiffres ne mesurent pas</text><text x="50" y="590" font-family="ui-monospace, monospace" font-size="14" letter-spacing="2" fill="#111" opacity="0.7">bastiengallay.com</text><text x="650" y="120" font-family="ui-monospace, monospace" font-size="22" letter-spacing="3" fill="#111">MESURÉ · METR 2025</text><text x="900" y="400" text-anchor="middle" font-family="Redaction, Georgia, serif"><tspan font-size="230" font-weight="700" fill="#111">−19</tspan><tspan font-size="80" font-weight="500" fill="#b8252e" dx="10">%</tspan></text><text x="650" y="570" font-family="ui-monospace, monospace" font-size="16" letter-spacing="2" fill="#111" opacity="0.7">vs +24 % prédit · écart 39 pts</text></svg>
<p class="essai-og__legend"><strong>D · mix typo + objet</strong><span>rejetée · concept abandonné</span></p>
<p class="essai-og__note">Mix typo gauche + chiffre droite. Pas faux mais trop chargé : deux fois le titre (verbal + numéro), composition lourde, le message dilué. A fait mieux sur le même registre.</p>
</div>
</div>

---

## Hero in-article (1200×630) <span class="validation">validée · B v3a</span>

<div class="meta-note"><strong>conséquence sémantique</strong>Le hero porte visuellement le titre de l'article. Le <code>&lt;h1&gt;</code> HTML reste obligatoire (SEO, lecteur d'écran, fil d'Ariane) mais doit passer en <code>sr-only</code> pour ne pas doublonner visuellement. Détails dans la section <em>Décisions restantes</em> en bas de page.</div>

<div class="essais-hero">
<div class="essai-og">
<svg class="essai-og__svg" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Hero B v3a : titre + kicker numéro magazine, version validée"><rect x="0" y="0" width="1200" height="630" fill="#f5efe6"/><rect x="580" y="310" width="620" height="320" fill="#b8252e"/><rect x="900" y="0" width="300" height="190" fill="#ffd900"/><rect x="0" y="490" width="240" height="140" fill="#1f3d8c"/><line x1="580" y1="0" x2="580" y2="630" stroke="#111" stroke-width="14"/><line x1="900" y1="0" x2="900" y2="310" stroke="#111" stroke-width="14"/><line x1="580" y1="310" x2="1200" y2="310" stroke="#111" stroke-width="14"/><line x1="900" y1="190" x2="1200" y2="190" stroke="#111" stroke-width="14"/><line x1="0" y1="490" x2="580" y2="490" stroke="#111" stroke-width="14"/><line x1="240" y1="490" x2="240" y2="630" stroke="#111" stroke-width="14"/><rect x="0" y="0" width="1200" height="630" fill="none" stroke="#111" stroke-width="14"/><text x="40" y="80" font-family="ui-monospace, monospace" font-size="22" letter-spacing="4" fill="#111" opacity="0.55">ARTICLE 1/3</text><text x="40" y="108" font-family="ui-monospace, monospace" font-size="14" letter-spacing="2" fill="#111" opacity="0.45">ce que les chiffres ne mesurent pas</text><text x="40" y="210" font-family="Redaction, Georgia, serif" font-weight="700" fill="#1f3d8c"><tspan baseline-shift="super" font-size="60">§</tspan><tspan dx="-5" font-size="80">01.20</tspan></text><text x="40" y="340" font-family="Redaction, Georgia, serif" font-size="76" font-weight="700" fill="#111">AVEC L'IA,</text><text x="40" y="440" font-family="Redaction, Georgia, serif" font-size="68" font-weight="700" fill="#111">JE CODE PLUS</text><text x="890" y="440" text-anchor="middle" font-family="Redaction, Georgia, serif" font-weight="700" fill="#f5efe6" font-size="86">LENTEMENT</text></svg>
<p class="essai-og__legend"><strong>B v3a · validée</strong><span>kicker discret + bloc credits</span></p>
<p class="essai-og__note">Composition Mondrian asymétrique. Trois éléments variables par article : kicker (« ARTICLE n/3 » + sous-titre), numéro magazine <code>§01.20</code> en bleu De Stijl, titre principal en deux lignes Redaction display. « LENTEMENT » se loge dans le bloc rouge, baseline alignée avec « JE CODE PLUS ». Le bloc bleu en bas-gauche peut accueillir une signature ou rester vide.</p>
</div>
</div>

<h3 class="test-h3 test-h3--rejected">Hero rejetés <span class="rejection">archive</span></h3>

<div class="essais-rejected">
<div class="essai-og">
<svg class="essai-og__svg" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Hero B v3 (rejeté) : version baseline sans kicker"><rect x="0" y="0" width="1200" height="630" fill="#f5efe6"/><rect x="580" y="310" width="620" height="320" fill="#b8252e"/><rect x="900" y="0" width="300" height="190" fill="#ffd900"/><rect x="0" y="490" width="240" height="140" fill="#1f3d8c"/><line x1="580" y1="0" x2="580" y2="630" stroke="#111" stroke-width="14"/><line x1="900" y1="0" x2="900" y2="310" stroke="#111" stroke-width="14"/><line x1="580" y1="310" x2="1200" y2="310" stroke="#111" stroke-width="14"/><line x1="900" y1="190" x2="1200" y2="190" stroke="#111" stroke-width="14"/><line x1="0" y1="490" x2="580" y2="490" stroke="#111" stroke-width="14"/><line x1="240" y1="490" x2="240" y2="630" stroke="#111" stroke-width="14"/><rect x="0" y="0" width="1200" height="630" fill="none" stroke="#111" stroke-width="14"/><text x="40" y="340" font-family="Redaction, Georgia, serif" font-size="76" font-weight="700" fill="#111">AVEC L'IA,</text><text x="40" y="440" font-family="Redaction, Georgia, serif" font-size="68" font-weight="700" fill="#111">JE CODE PLUS</text><text x="890" y="440" text-anchor="middle" font-family="Redaction, Georgia, serif" font-size="86" font-weight="700" fill="#f5efe6">LENTEMENT</text></svg>
<p class="essai-og__legend"><strong>B v3 · baseline sans kicker</strong><span>zone haut-gauche vide</span></p>
<p class="essai-og__note">Version intermédiaire — alignement baseline JE CODE PLUS / LENTEMENT acquis, mais zone haut-gauche reste vide. Surmontée par v3a.</p>
</div>
<div class="essai-og">
<svg class="essai-og__svg" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Hero B v3b (rejeté) : mini-bloc jaune en haut-gauche"><rect x="0" y="0" width="1200" height="630" fill="#f5efe6"/><rect x="0" y="0" width="240" height="100" fill="#ffd900"/><rect x="580" y="310" width="620" height="320" fill="#b8252e"/><rect x="900" y="0" width="300" height="190" fill="#ffd900"/><rect x="0" y="490" width="240" height="140" fill="#1f3d8c"/><line x1="0" y1="100" x2="247" y2="100" stroke="#111" stroke-width="14"/><line x1="240" y1="0" x2="240" y2="100" stroke="#111" stroke-width="14"/><line x1="580" y1="0" x2="580" y2="630" stroke="#111" stroke-width="14"/><line x1="900" y1="0" x2="900" y2="310" stroke="#111" stroke-width="14"/><line x1="580" y1="310" x2="1200" y2="310" stroke="#111" stroke-width="14"/><line x1="900" y1="190" x2="1200" y2="190" stroke="#111" stroke-width="14"/><line x1="0" y1="490" x2="580" y2="490" stroke="#111" stroke-width="14"/><line x1="240" y1="490" x2="240" y2="630" stroke="#111" stroke-width="14"/><rect x="0" y="0" width="1200" height="630" fill="none" stroke="#111" stroke-width="14"/><text x="120" y="65" text-anchor="middle" font-family="ui-monospace, monospace" font-size="20" letter-spacing="4" fill="#111" font-weight="700">§01.20</text><text x="40" y="340" font-family="Redaction, Georgia, serif" font-size="76" font-weight="700" fill="#111">AVEC L'IA,</text><text x="40" y="440" font-family="Redaction, Georgia, serif" font-size="68" font-weight="700" fill="#111">JE CODE PLUS</text><text x="890" y="440" text-anchor="middle" font-family="Redaction, Georgia, serif" font-size="86" font-weight="700" fill="#f5efe6">LENTEMENT</text></svg>
<p class="essai-og__legend"><strong>B v3b · bloc jaune Mondrian</strong><span>plus chargé que v3a</span></p>
<p class="essai-og__note">Mini-bloc jaune (240×100) miroir du bloc bleu en bas-gauche. Composition Mondrian plus structurelle, mais alourdit le rendu — quatre blocs colorés au lieu de trois. La typo kicker (v3a) habite la zone vide de façon plus aérée.</p>
</div>
<div class="essai-og">
<svg class="essai-og__svg" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Hero C v2 (rejeté) : sablier élancé + onomatopée SLOWWW"><rect x="0" y="0" width="1200" height="630" fill="#f5efe6"/><circle cx="780" cy="305" r="240" fill="#ffd900"/><g fill="#f5efe6"><path d="M 680 200 L 880 200 L 820 320 L 740 320 Z"/><path d="M 740 360 L 820 360 L 880 480 L 680 480 Z"/></g><path d="M 700 240 L 860 240 L 820 320 L 740 320 Z" fill="#b8252e"/><path d="M 700 440 L 860 440 L 880 480 L 680 480 Z" fill="#b8252e"/><g stroke="#111" stroke-width="10" stroke-linejoin="round" fill="none"><path d="M 680 200 L 880 200 L 820 320 L 740 320 Z"/><path d="M 740 360 L 820 360 L 880 480 L 680 480 Z"/></g><line x1="660" y1="200" x2="900" y2="200" stroke="#111" stroke-width="14" stroke-linecap="round"/><line x1="660" y1="480" x2="900" y2="480" stroke="#111" stroke-width="14" stroke-linecap="round"/><g transform="translate(40, 220) rotate(-6)"><text x="0" y="0" font-family="Redaction, Georgia, serif" font-size="140" font-weight="800" font-style="italic" fill="#b8252e" stroke="#111" stroke-width="3" paint-order="stroke">SLOWWW…</text></g><rect x="0" y="555" width="1200" height="75" fill="#1f3d8c"/><line x1="0" y1="555" x2="1200" y2="555" stroke="#111" stroke-width="6"/></svg>
<p class="essai-og__legend"><strong>C v2 · sablier joyeux</strong><span>objet narratif spécifique 1/3</span></p>
<p class="essai-og__note">Très bon candidat. Rejeté car le sablier est un objet narratif <em>spécifique à 1/3</em> — non reproductible sur 2/3 et 3/3. Le sablier garde sa place comme objet de la carte « À la une » (où le slot accueille un objet par article).</p>
</div>
</div>

---

## Miniature liste /ecrits (180×120) <span class="validation">validée · M4</span>

**Template reproductible** par article. Structure constante (cercle jaune central + bandeau bleu bas + cadre noir) reprise du hero C ; trois slots variables remplis article par article :

| Slot | Constant ? | Exemple article 1/3 |
| --- | --- | --- |
| Numéro magazine (gros, gauche, Redaction bleu De Stijl) | variable | `§01.20` |
| Élément hero (centré sur le cercle, Redaction display rouge) | variable | `−19 %` |
| Tag source (bandeau bleu, gauche, mono caps crème) | variable | `METR · 2025` |
| Titre court (bandeau bleu, droite, mono caps crème) | variable | `CODER LENTEMENT` |
| Cercle jaune, bandeau bleu, cadre noir, filet noir séparateur | **constant** | (idem pour tous les articles) |

<div class="essai-mini"><svg class="essai-mini__cover" viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Miniature template M4 v2 : numéro grand à gauche + cercle jaune décalé droite + chiffre rouge"><rect x="0" y="0" width="360" height="240" fill="#f5efe6"/><text x="22" y="115" font-family="Redaction, Georgia, serif" font-weight="700" fill="#1f3d8c" letter-spacing="-0.02em"><tspan baseline-shift="super" font-size="28">§</tspan><tspan font-size="54" dx="-2">01.20</tspan></text><circle cx="263" cy="95" r="72" fill="#ffd900"/><text x="263" y="115" text-anchor="middle" fill="#b8252e" font-family="Redaction, Georgia, serif"><tspan font-size="56" font-weight="700">−19</tspan><tspan font-size="20" font-weight="500" dx="2">%</tspan></text><rect x="0" y="200" width="360" height="40" fill="#1f3d8c"/><line x1="0" y1="200" x2="360" y2="200" stroke="#111" stroke-width="3"/><text x="18" y="225" font-family="ui-monospace, monospace" font-size="11" letter-spacing="2" fill="#f5efe6" font-weight="700">METR · 2025</text><text x="342" y="225" text-anchor="end" font-family="ui-monospace, monospace" font-size="11" letter-spacing="2" fill="#f5efe6">CODER LENTEMENT</text><rect x="0" y="0" width="360" height="240" fill="none" stroke="#111" stroke-width="3"/></svg><div class="essai-mini__body"><p class="essai-mini__date">27 mai 2026</p><p class="essai-mini__title">Avec l'IA, je code plus lentement</p><p class="essai-mini__legend">M4 v2 · numéro magazine grand à gauche, cercle décalé à droite. Le tag source rejoint le bandeau bleu (mono caps).</p></div></div>

<p class="test-note">Étape suivante (hors lab) : factoriser en shortcode Zola <code>&#123;&#123; ecrit_cover(numero="01.20", chiffre="−19", unite="%", source="METR · 2025", titre_court="CODER LENTEMENT") &#125;&#125;</code> appelé depuis chaque article. La géométrie reste identique d'un écrit à l'autre.</p>

<h3 class="test-h3 test-h3--rejected">Miniatures rejetées <span class="rejection">archive</span></h3>

<div class="essais-rejected">

<div class="essai-mini"><svg class="essai-mini__cover" viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Miniature M2 (rejetée) : -19 % seul"><rect x="0" y="0" width="360" height="240" fill="#f5efe6"/><rect x="0" y="0" width="360" height="240" fill="none" stroke="#111" stroke-width="3"/><text x="30" y="40" font-family="ui-monospace, monospace" font-size="14" letter-spacing="2" fill="#111">METR · 2025</text><text x="180" y="170" text-anchor="middle" fill="#b8252e" font-family="Redaction, Georgia, serif"><tspan font-size="110" font-weight="700">−19</tspan><tspan font-size="40" font-weight="500" dx="4">%</tspan></text><line x1="30" y1="215" x2="330" y2="215" stroke="#111" stroke-width="2"/><text x="30" y="232" font-family="ui-monospace, monospace" font-size="11" letter-spacing="2" fill="#111" opacity="0.7">§01.20</text><text x="330" y="232" text-anchor="end" font-family="ui-monospace, monospace" font-size="11" letter-spacing="2" fill="#111" opacity="0.7">CODER LENTEMENT</text></svg><div class="essai-mini__body"><p class="essai-mini__date">M2 · chiffre seul sur crème</p><p class="essai-mini__title">Sans signature visuelle stable</p><p class="essai-mini__legend">Rejetée car pas reproductible identité-fortes : un article sans chiffre choc (ou même un article 2/3 avec un autre chiffre) perdrait toute cohérence visuelle. M4 résout en posant un fond stable (cercle jaune + bandeau bleu).</p></div></div>

<div class="essai-mini"><p class="essai-mini__cover" style="display:grid;place-items:center;background:color-mix(in oklch, #b8252e 12%, #f5efe6 88%);border:1px solid var(--rule);font-family:ui-monospace,monospace;font-size:32px;color:#111a;line-height:1;letter-spacing:0;font-variant-numeric:tabular-nums;"><span><span style="color:#b8252e;font-size:0.55em;vertical-align:super;margin-right:0.2em;">§</span>01.20</span></p><div class="essai-mini__body"><p class="essai-mini__date">M1 · placeholder typo</p><p class="essai-mini__title">Numéro magazine en mono</p><p class="essai-mini__legend">Rejetée pour cet article. Reste le fallback par défaut pour les articles sans cover déclarée (template).</p></div></div>

<div class="essai-mini"><svg class="essai-mini__cover" viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Miniature : sablier comic"><rect x="0" y="0" width="360" height="240" fill="#ffd900"/><rect x="0" y="0" width="360" height="240" fill="none" stroke="#111" stroke-width="3"/><g fill="#f5efe6"><path d="M 145 60 L 215 60 L 195 120 L 165 120 Z"/><path d="M 165 130 L 195 130 L 215 190 L 145 190 Z"/></g><path d="M 152 80 L 208 80 L 195 120 L 165 120 Z" fill="#b8252e"/><path d="M 152 170 L 208 170 L 215 190 L 145 190 Z" fill="#b8252e"/><g stroke="#111" stroke-width="6" stroke-linejoin="round" fill="none"><path d="M 145 60 L 215 60 L 195 120 L 165 120 Z"/><path d="M 165 130 L 195 130 L 215 190 L 145 190 Z"/></g><line x1="135" y1="60" x2="225" y2="60" stroke="#111" stroke-width="8" stroke-linecap="round"/><line x1="135" y1="190" x2="225" y2="190" stroke="#111" stroke-width="8" stroke-linecap="round"/><text x="30" y="35" font-family="ui-monospace, monospace" font-size="14" letter-spacing="2" fill="#111">SLOWWW…</text><text x="180" y="225" text-anchor="middle" font-family="ui-monospace, monospace" font-size="11" letter-spacing="2" fill="#111" opacity="0.7">§01.20 · CODER LENTEMENT</text></svg><div class="essai-mini__body"><p class="essai-mini__date">M3 · sablier comic mini</p><p class="essai-mini__title">Variante humeur joyeuse</p><p class="essai-mini__legend">Rejetée. À 180×120 le sablier devient un picto un peu décoratif sans la force du chiffre. M2 lit mieux la thèse en un coup d'œil.</p></div></div>

</div>

---

## Carte « À la une » accueil <span class="validation">validée</span>

<div class="essai-une"><svg class="essai-une__cover" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Mini sablier"><rect x="0" y="0" width="80" height="80" fill="#ffd900"/><g fill="#f5efe6"><path d="M 28 22 L 52 22 L 45 40 L 35 40 Z"/><path d="M 35 42 L 45 42 L 52 60 L 28 60 Z"/></g><path d="M 31 30 L 49 30 L 45 40 L 35 40 Z" fill="#b8252e"/><path d="M 30 55 L 50 55 L 52 60 L 28 60 Z" fill="#b8252e"/><g stroke="#111" stroke-width="3" stroke-linejoin="round" fill="none"><path d="M 28 22 L 52 22 L 45 40 L 35 40 Z"/><path d="M 35 42 L 45 42 L 52 60 L 28 60 Z"/></g><line x1="25" y1="22" x2="55" y2="22" stroke="#111" stroke-width="3" stroke-linecap="round"/><line x1="25" y1="60" x2="55" y2="60" stroke="#111" stroke-width="3" stroke-linecap="round"/><rect x="0" y="0" width="80" height="80" fill="none" stroke="#111" stroke-width="2"/></svg><div><p class="essai-une__kicker">Dernier écrit</p><p class="essai-une__title">Avec l'IA, je code plus lentement</p><p class="essai-une__meta">27/05/2026 · 8 MIN · §01.20</p></div></div>

<p class="test-note">Sable derrière le stroke noir (pattern fill-puis-sable-puis-stroke) — plus de morsure des bords. Sablier identique au hero C v2 pour rappel visuel à travers les surfaces.</p>

<h3 class="test-h3 test-h3--rejected">Carte « À la une » rejetée <span class="rejection">archive</span></h3>

<div class="essais-rejected">
<div class="essai-une"><svg class="essai-une__cover" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Mini -19 % (rejetée)"><rect x="0" y="0" width="80" height="80" fill="#f5efe6" stroke="#111" stroke-width="2"/><text x="40" y="50" text-anchor="middle" fill="#b8252e" font-family="Redaction, Georgia, serif"><tspan font-size="26" font-weight="700">−19</tspan><tspan font-size="11" font-weight="500" dx="2">%</tspan></text><text x="40" y="68" text-anchor="middle" font-family="ui-monospace, monospace" font-size="9" letter-spacing="1" fill="#111">METR</text></svg><div><p class="essai-une__kicker">Variante chiffre · rejetée</p><p class="essai-une__title">−19 % METR</p><p class="essai-une__meta">Redondance avec M2 ; sablier porte mieux l'identité.</p></div></div>
</div>

---

## Décisions restantes

1. **Génération PNG** : workflow Zola pour exporter la cover sociale A en `.png` 1200×630 (OG + Twitter cards). À voir avec `resize_image` ou pipeline externe (svgo + rsvg-convert / sharp).
2. **Frontmatter article — miniature M4** : prévoir un macro `ecrit_cover` (cousin du `ecrit_hero` ci-dessous) appelé depuis le template `ecrits.html` listing, alimenté par `extra.cover_chiffre`, `extra.cover_unite`, `extra.cover_source`, `extra.cover_titre_court`. Permet d'afficher M4 sur la liste `/ecrits` et la carte « À la une » d'accueil sans fichier image statique.
3. **Frontmatter article — hero B v3a** : pose à ajouter dans le frontmatter de chaque article qui veut un hero. Macro `templates/macros/ecrit_hero.html` créée, template `page.html` détecte la présence et passe le `<h1>` en sr-only via la classe `.ecrit-page--has-hero`.

### Frontmatter type pour le hero B v3a

À ajouter dans le frontmatter de l'article (entre les `+++`) :

```toml
[extra]
numero = "01.20"
# … champs existants …
hero = "b_v3a"
hero_kicker = "ARTICLE 1/3"
hero_soustitre = "ce que les chiffres ne mesurent pas"
hero_l1 = "AVEC L'IA,"
hero_l2 = "JE CODE PLUS"
hero_l3 = "LENTEMENT"
```

Le champ `numero` est réutilisé pour le `§01.20` du kicker — pas besoin de le redupliquer.

### Sémantique HTML résultante

```html
<article class="ecrit-page ecrit-page--has-hero">
  <p class="issue-bar">…</p>

  <figure class="ecrit-page__hero" aria-hidden="true">
    <svg viewBox="0 0 1200 630" role="presentation">…</svg>
  </figure>

  <header class="ecrit-page__header">
    <h1 class="ecrit-page__title sr-only">Avec l'IA, je code plus lentement.</h1>
    <p class="ecrit-page__subtitle">Pourquoi le discours…</p>
  </header>

  <div class="ecrit-page__content">…</div>
</article>
```

- `<h1>` reste dans le DOM (SEO, lecteur d'écran, fil d'Ariane), mais invisible grâce à `.ecrit-page--has-hero .ecrit-page__title` qui applique `sr-only`.
- `<figure aria-hidden="true">` : l'assistive tech saute le SVG (évite que les `<text>` soient lus glyph par glyph en plus du h1).
- Le subtitle reste visible : il complète l'image avec une description courte indexable.

### Si on veut une variante hero pour 2/3 ou 3/3

Ajouter un nouveau macro dans `templates/macros/ecrit_hero.html` (ex. `b_v3a_alt`, `c_v2`), puis dans `page.html` ajouter une branche `{% elif page.extra.hero == "..." %}`. Garder un macro par variante (pas de macro géant paramétré) — plus simple à maintenir.
