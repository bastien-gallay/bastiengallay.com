+++
title = "Atelier d'essais : image article IA-lentement 2/3"
date = 2026-06-09
description = "Hero in-article pour l'article 2/3 « Avec l'IA, je code plus lentement — ce que l'IA m'apporte vraiment ». Variante Mondrian b_v3b dérivée du 1/3 : mêmes grandes cases, couleurs inversées, rouge en accent."
template = "lab-page.html"
+++

<style>
#lab section { margin-block: var(--space-2xl); }
#lab section + section { border-top: 1px solid var(--rule); padding-top: var(--space-xl); }
#lab h2.test-h2 { font-family: var(--font-display); font-size: var(--text-2xl); letter-spacing: -0.02em; margin: 0 0 var(--space-2xs); color: var(--surface-ink); }
#lab .validation { font-family: var(--font-mono); font-size: var(--text-xs); text-transform: uppercase; letter-spacing: var(--tracking-caps); color: var(--c-success, #2a7a4a); background: color-mix(in oklch, var(--c-success, #2a7a4a) 14%, transparent); padding: 2px 8px; border-radius: 2px; }
#lab .essai-og { display: flex; flex-direction: column; gap: var(--space-xs); max-width: 56rem; }
#lab .essai-og__svg { width: 100%; aspect-ratio: 1200 / 630; background: #f5efe6; border: 1px solid var(--rule); box-shadow: 0 1px 0 var(--rule); }
#lab .essai-og__note { font-size: var(--text-sm); color: var(--ink-soft); margin: 0; max-width: 48rem; }
#lab .essais-compare { display: grid; grid-template-columns: 1fr; gap: var(--space-xl); }
#lab .essais-compare .essai-og--ref .essai-og__svg { opacity: 0.82; filter: saturate(0.9); }
#lab .rappel { background: var(--surface-sub); border-left: 4px solid #1f3d8c; padding: var(--space-md) var(--space-lg); max-width: 48rem; }
#lab .rappel h3 { font-family: var(--font-display); font-size: var(--text-xl); margin: 0 0 var(--space-sm); color: var(--surface-ink); }
#lab .rappel h3 mark { background: transparent; color: #b8252e; font-weight: inherit; }
#lab .rappel p { margin: 0 0 var(--space-2xs); color: var(--ink-soft); font-size: var(--text-sm); line-height: 1.6; }
</style>

<div id="lab">

Itération 1 — hero in-article 2/3, variante **b_v3b** (câblée dans `templates/macros/ecrit_hero.html` + `page.html`). Dérivée du `b_v3a` du 1/3 : on garde l'idée Mondrian et la taille des deux grandes cases, on inverse les couleurs des grandes cases et on rétrograde le rouge en accent. Couleurs hardcodées (#b8252e rouge, #ffd900 jaune, #1f3d8c bleu, #111 encre, #f5efe6 crème).

---

## Rappel du ton

<div class="rappel"><h3>Avec l'IA, je code plus <mark>lentement</mark> — 2</h3><p><em>Article 2/3 — « ce que l'IA m'apporte vraiment »</em></p><p>Suite au retour de Johan sur la nouvelle étude METR, je reprends ma copie : qu'est-ce que l'IA m'apporte vraiment ? Sept étapes, une boucle Reflect, du courage et de la complaisance cassée.</p><p><strong>Je n'ai pas accéléré le code. J'ai monté le niveau de qualité que je peux atteindre.</strong></p></div>

---

## Hero in-article (1200×630) <span class="validation">validée</span>

Sous-titre en **placeholder** tant que le vrai n'est pas tranché. Câblé via `extra.hero = "b_v3b"`.

<div class="essai-og">
<svg class="essai-og__svg" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Hero 2/3 b_v3b : Mondrian, grande case titre bleue, grande case LENTEMENT jaune, accents rouges"><rect x="0" y="0" width="1200" height="630" fill="#f5efe6"/><rect x="0" y="0" width="580" height="490" fill="#1f3d8c"/><rect x="580" y="310" width="620" height="320" fill="#ffd900"/><rect x="860" y="0" width="340" height="150" fill="#b8252e"/><rect x="260" y="490" width="160" height="140" fill="#b8252e"/><line x1="580" y1="0" x2="580" y2="630" stroke="#111" stroke-width="14"/><line x1="580" y1="310" x2="1200" y2="310" stroke="#111" stroke-width="14"/><line x1="860" y1="0" x2="860" y2="310" stroke="#111" stroke-width="14"/><line x1="860" y1="150" x2="1200" y2="150" stroke="#111" stroke-width="14"/><line x1="0" y1="490" x2="580" y2="490" stroke="#111" stroke-width="14"/><line x1="260" y1="490" x2="260" y2="630" stroke="#111" stroke-width="14"/><line x1="420" y1="490" x2="420" y2="630" stroke="#111" stroke-width="14"/><rect x="0" y="0" width="1200" height="630" fill="none" stroke="#111" stroke-width="14"/><text x="40" y="80" font-family="ui-monospace, monospace" font-size="22" letter-spacing="4" fill="#f5efe6" opacity="0.85">ARTICLE 2/3</text><text x="40" y="108" font-family="ui-monospace, monospace" font-size="14" letter-spacing="2" fill="#f5efe6" opacity="0.6">« placeholder sous-titre 2/3 »</text><text x="40" y="210" font-family="Redaction, Georgia, serif" font-weight="700" fill="#ffd900"><tspan baseline-shift="super" font-size="60">§</tspan><tspan dx="-5" font-size="80">01.21</tspan></text><text x="40" y="340" font-family="Redaction, Georgia, serif" font-size="76" font-weight="700" fill="#f5efe6">AVEC L'IA,</text><text x="40" y="440" font-family="Redaction, Georgia, serif" font-size="68" font-weight="700" fill="#f5efe6">JE CODE PLUS</text><text x="890" y="440" text-anchor="middle" font-family="Redaction, Georgia, serif" font-weight="700" fill="#111" font-size="86">LENTEMENT</text></svg>
<p class="essai-og__note">Tailles des 2 grandes cases conservées (titre 580×490, LENTEMENT 620×320). Couleurs inversées : titre crème→bleu (texte crème, § jaune), LENTEMENT rouge→jaune (texte noir). Rouge rétrogradé en accent. Petites cases re-subdivisées : bande basse en 3 cellules (vs 2), bloc accent haut-droite re-proportionné (340×150).</p>
</div>

---

## Comparaison avec le 1/3 (b_v3a, pour mémoire)

Inversion du poids visuel : le 1/3 est rouge-dominant, le 2/3 devient bleu-dominant. Même palette, même grammaire De Stijl.

<div class="essais-compare">
<div class="essai-og essai-og--ref">
<svg class="essai-og__svg" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Hero 1/3 b_v3a : Mondrian, grande case titre crème, grande case LENTEMENT rouge"><rect x="0" y="0" width="1200" height="630" fill="#f5efe6"/><rect x="580" y="310" width="620" height="320" fill="#b8252e"/><rect x="900" y="0" width="300" height="190" fill="#ffd900"/><rect x="0" y="490" width="240" height="140" fill="#1f3d8c"/><line x1="580" y1="0" x2="580" y2="630" stroke="#111" stroke-width="14"/><line x1="900" y1="0" x2="900" y2="310" stroke="#111" stroke-width="14"/><line x1="580" y1="310" x2="1200" y2="310" stroke="#111" stroke-width="14"/><line x1="900" y1="190" x2="1200" y2="190" stroke="#111" stroke-width="14"/><line x1="0" y1="490" x2="580" y2="490" stroke="#111" stroke-width="14"/><line x1="240" y1="490" x2="240" y2="630" stroke="#111" stroke-width="14"/><rect x="0" y="0" width="1200" height="630" fill="none" stroke="#111" stroke-width="14"/><text x="40" y="80" font-family="ui-monospace, monospace" font-size="22" letter-spacing="4" fill="#111" opacity="0.55">ARTICLE 1/3</text><text x="40" y="108" font-family="ui-monospace, monospace" font-size="14" letter-spacing="2" fill="#111" opacity="0.45">ce que les chiffres ne mesurent pas</text><text x="40" y="210" font-family="Redaction, Georgia, serif" font-weight="700" fill="#1f3d8c"><tspan baseline-shift="super" font-size="60">§</tspan><tspan dx="-5" font-size="80">01.20</tspan></text><text x="40" y="340" font-family="Redaction, Georgia, serif" font-size="76" font-weight="700" fill="#111">AVEC L'IA,</text><text x="40" y="440" font-family="Redaction, Georgia, serif" font-size="68" font-weight="700" fill="#111">JE CODE PLUS</text><text x="890" y="440" text-anchor="middle" font-family="Redaction, Georgia, serif" font-weight="700" fill="#f5efe6" font-size="86">LENTEMENT</text></svg>
<p class="essai-og__note">Référence existante (1/3). Non modifiée.</p>
</div>
</div>

</div>
