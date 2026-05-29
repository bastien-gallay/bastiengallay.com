+++
title = "Avec l'IA, je code plus lentement"
date = 2026-05-28
description = "Pourquoi le discours dominant sur la productivité IA mesure ce qui ne compte pas."
draft = false

[extra]
numero = "01.20"
heading_html = "Avec l'IA, je code plus <mark class=\"mark\">lentement</mark>"
signature_bio = "Je ralentis pour mieux coder. Je déploie des contre-mesures. J'ai vibe-codé quelques heures et l'ai regretté quatre semaines."
series = "coder-avec-l-ia"
series_title = "Coder avec l'IA"
series_index = 1
series_total = 3
series_part_subtitle = "ce que les chiffres ne mesurent pas"

# Hero in-article (cf. lab/image-article-1-3 — variante B v3a validée).
# Le <h1> textuel passe en sr-only quand `hero` est défini.
hero = "b_v3a"
hero_kicker = "ARTICLE 1/3"
hero_soustitre = "ce que les chiffres ne mesurent pas"
hero_l1 = "AVEC L'IA,"
hero_l2 = "JE CODE PLUS"
hero_l3 = "LENTEMENT"

# Miniature liste /ecrits (template M4 — cercle jaune + bandeau bleu).
# `numero` ci-dessus est réutilisé pour le §XX.XX du bandeau.
cover_chiffre = "−19"
cover_unite = "%"
cover_source = "METR · 2025"
cover_titre_court = "CODER LENTEMENT"

# Objet narratif dans la carte « À la une » d'accueil. Spécifique à 1/3.
une_objet = "sablier"
+++

> **Série en 3 articles — *Coder avec l'IA***
> Article 1/3 — *ce que les chiffres ne mesurent pas*.
> À suivre&nbsp;: *Ce que l'IA m'apporte vraiment* (art. 2) · *Quelle stratégie d'équipe&nbsp;?* (art. 3).
<!-- Liens internes désactivés tant que 2/3 et 3/3 sont draft. À réactiver
     quand 2/3 est publié — cf. Bloc «&nbsp;article 2/3&nbsp;». -->

---

## Une anecdote, pour commencer

Le 4 avril 2026, j'ai vibe-codé un outil en quelques heures pour gérer mes tâches quotidiennes. Il s'appelait `daily-ops`. Une glu en Python autour de mes `TODO.md`, capable de me faire passer d'un projet à l'autre sans friction. Ça marchait. J'étais content.

Le 25 avril, j'ai créé un vrai repo, ajouté trois fonctionnalités, et un peu de qualité — tests, structure, le minimum syndical. L'IA m'a proposé une abstraction élégante&nbsp;: séparer les items en *blocks* nommés alphabétiquement. *Block A*, *Block B*. Au premier coup d'œil, c'était propre.

{{ figure(num="1", variant="incidents", tag="Cas zéro · 2026-04", title="4&#160;h pour produire, 4&#160;sem. pour stabiliser", title_id="v0-title", desc_id="v0-desc", body="fig1-daily-ops.html", pos="side") }}

Depuis quatre semaines, je corrige les bugs de cette élégance. Fusion accidentelle de blocks entre deux jours à cause du nommage alphabétique. Report de blocks dont tous les items étaient terminés, parce que l'état «&nbsp;fini&nbsp;» n'était pas explicite au niveau du bloc. Formatage concurrent entre deux projets qui partageaient les mêmes fichiers de configuration.

<span class="mark--soft" data-fig="1">Bilan&nbsp;: quelques heures pour produire l'outil. Quatre semaines pour le rendre utilisable.</span>

Pourtant, je suis depuis longtemps convaincu de deux choses&nbsp;: tout est logiciel — de la simple feuille Excel au script qui génère des PDF — et il faut très vite décider de le supprimer ou de le pérenniser avant qu'il ne se complexifie. Tout logiciel pérenne doit, au plus tôt, bénéficier d'un filet de sécurité pour ne pas baisser en qualité.

Avec l'IA, la complexité s'installe en silence. Plus vite, aussi, que le bon vieux Excel qui commençait à crouler sous ses six formules à références croisées.

C'est cette expérience, répétée sous plusieurs formes au cours des derniers mois, qui m'a fait basculer. **Depuis, je code plus lentement. Et je produis plus.**

---

## Le paradoxe

Le discours dominant en 2026 est sans ambiguïté.

<div class="paradoxe" role="group" aria-label="Trois chiffres clés du discours dominant sur la productivité IA en 2026">
  <p class="paradoxe__row">
    <span class="paradoxe__num">126&nbsp;%</span>
    <span class="paradoxe__claim">de projets complétés par semaine avec Copilot</span>
    <span class="paradoxe__src">GitHub<sup class="footnote-reference"><a href="#1">1</a></sup></span>
  </p>
  <p class="paradoxe__row">
    <span class="paradoxe__num">84&nbsp;%</span>
    <span class="paradoxe__claim">d'adoption chez les développeurs, plus de la moitié quotidienne</span>
    <span class="paradoxe__src">Stack Overflow<sup class="footnote-reference"><a href="#2">2</a></sup></span>
  </p>
  <p class="paradoxe__row">
    <span class="paradoxe__num">78&nbsp;%</span>
    <span class="paradoxe__claim">déclarent que l'IA améliore leur productivité</span>
    <span class="paradoxe__src">GitHub<sup class="footnote-reference"><a href="#1">1</a></sup></span>
  </p>
</div>

Ces chiffres sont sincères. Ils semblent mesurer la vitesse. <span class="mark">En réalité ils n'en mesurent qu'une composante.</span>

---

## Ce que les chiffres ne mesurent pas

### La mesure perçue n'est pas la mesure réelle

En 2025, une équipe de chercheurs de METR a conduit une expérience contrôlée randomisée<sup class="footnote-reference"><a href="#3">3</a></sup>. Seize développeurs open source expérimentés, chacun avec en moyenne cinq ans de pratique sur les projets qu'ils maintenaient. 246 tâches réelles, pas synthétiques. Outils utilisés&nbsp;: Cursor Pro et Claude 3.5/3.7 Sonnet.

Avant de commencer, les développeurs prédisaient un gain de temps. Après l'étude, ils en percevaient un. La mesure objective, elle, raconte l'inverse — Figure 2.

{{ figure(num="2", variant="chart-borne", tag="Étude METR · 2025", title='Perçu +20&#160;%, mesuré <span class="visuel__title-vs">−19&#160;%</span>', title_id="v1-title", desc_id="v1-desc", body="fig2-metr.html", pos="side", caption="16 développeurs OSS expérimentés, 246 tâches réelles, Cursor Pro + Claude 3.5/3.7 Sonnet. Expérience contrôlée randomisée.", source='Source : Becker et&#160;al., METR&#160;2025, arXiv:2507.09089, n.&#160;<sup class="footnote-reference"><a href="#3">3</a></sup>.') }}

L'écart entre la perception et la réalité dépassait les 39 points. Ces développeurs n'étaient ni naïfs ni hostiles à l'IA. Ils étaient simplement <span class="mark--soft" data-fig="2">convaincus d'aller plus vite quand ils allaient en réalité plus lentement</span>.

J'ai moi-même vécu cet écart. Il y a deux ans, avec des modèles bien moins performants, ce qui m'aurait pris une ou deux heures me prenait souvent une demi-journée. Encore aujourd'hui, il m'arrive par réflexe de demander à Claude Code l'édition d'un fichier qu'il fera en trente secondes, là où j'aurais pu terminer en dix.

Les études antérieures, qui annonçaient 56&nbsp;% ou 21&nbsp;% d'accélération<sup class="footnote-reference"><a href="#3">3</a></sup>, reposaient sur des tâches synthétiques. Or les conditions synthétiques masquent ce qui rend les vrais projets coûteux&nbsp;: la cohérence avec l'existant, la dette technique, les conventions tacites, les contraintes invisibles.

### On mesure la rédaction, pas la livraison

Une étude conduite sur la télémétrie de 22&nbsp;000 développeurs et deux ans d'historique a documenté une déconnexion entre productivité individuelle ressentie et performance de l'entreprise<sup class="footnote-reference"><a href="#4">4</a></sup>. Les développeurs disent travailler plus vite. Les entreprises ne voient pas d'amélioration mesurable de la vélocité de livraison ni des résultats business.

Le rapport explique pourquoi&nbsp;: les métriques de vendeurs traquent l'activité — commits, pull requests, lignes de code — qui gonflent mécaniquement avec l'usage IA. La vélocité de livraison, elle, dépend d'une chaîne complète&nbsp;: revue, tests, intégration, déploiement, opérations. Cette chaîne n'a pas accéléré au même rythme.

{{ figure(num="3", tag="Étude Faros · 2025", title="Le gain individuel disparaît en file d'attente", title_id="v2-title", desc_id="v2-desc", body="fig3-faros.html", pos="side", caption="22&#160;000 développeurs, 2 ans de télémétrie. Mesures par équipe sur la chaîne complète (revue, intégration, déploiement).", source='Source : Faros AI, <em>Engineering Productivity 2025</em>, n.&#160;<sup class="footnote-reference"><a href="#4">4</a></sup>.') }}

L'étude Faros sur le même sujet est encore plus précise (Figure 3)&nbsp;: <span class="mark--soft" data-fig="3">le gain individuel s'évanouit en file d'attente d'équipe</span><sup class="footnote-reference"><a href="#4">4</a></sup>. Les gains se transforment en files d'attente.

### La dette technique devient invisible

{{ figure(num="4", tag="GitClear · 2020 → 2024", title="Crossover 2023 : copy-paste passe devant refactoring", title_id="v3-title", desc_id="v3-desc", body="fig4-gitclear.html", pos="side", caption="211&#160;millions de lignes de code modifiées, analysées chez Google, Microsoft, Meta et plusieurs entreprises cotées.", source='Source : GitClear, <em>AI Copilot Code Quality 2025</em>, n.&#160;<sup class="footnote-reference"><a href="#5">5</a></sup>.') }}

L'étude GitClear, qui a analysé 211 millions de lignes de code modifiées entre 2020 et 2024 chez Google, Microsoft, Meta et plusieurs entreprises cotées, mesure une transformation des pratiques<sup class="footnote-reference"><a href="#5">5</a></sup>. La Figure 4 trace l'inversion&nbsp;: <span class="mark--soft" data-fig="4">la part de copy-paste monte, celle de refactoring chute, les deux courbes se croisent en 2023</span>. Au-delà de cette inversion, un autre signal&nbsp;: le code «&nbsp;churned&nbsp;» — réécrit dans les deux semaines suivant son commit — a doublé, de 3,1&nbsp;% à 5,7&nbsp;%.

Lorsque j'ouvre les projets en audit de code, je découvre de plus en plus souvent des fonctions de 800 lignes, empilées au fil des commits automatiques, et des tests unitaires identiques dans trois fichiers différents.

Le rapport DORA 2024 de Google, qui suit la performance de livraison logicielle depuis une décennie, confirme la tension&nbsp;: une augmentation de 25&nbsp;% de l'adoption IA accélère les revues de code mais diminue la stabilité de livraison de 7,2&nbsp;%<sup class="footnote-reference"><a href="#6">6</a></sup>.

{{ figure(num="5", variant="quote", tag="MIT · WSJ 2025", title="", title_id="v5-title", desc_id="v5-desc", body="fig5-mit.html", pos="side", caption="Une dette qui se contracte plus vite qu'elle ne se rembourse&#160;: la métaphore éclaire les chiffres GitClear et DORA réunis.", source='Source&#160;: Wall Street Journal, cité dans DevOps.com, 2025, n.&#160;<sup class="footnote-reference"><a href="#7">7</a></sup>.') }}

Une citation d'Armando Solar-Lezama, professeur au MIT, résume mieux que je ne saurais le faire&nbsp;: *«&nbsp;L'IA est comme une carte de crédit toute neuve qui va nous permettre d'accumuler de la dette technique d'une manière qu'on n'avait jamais pu auparavant&nbsp;»*<sup class="footnote-reference"><a href="#7">7</a></sup>.

### Le terrain change avant qu'on ait fini d'apprendre

Une dimension manque presque toujours dans les études&nbsp;: à quel stade d'apprentissage sont les développeurs mesurés&nbsp;? Les outils évoluent à un rythme qui rend la stabilisation d'une pratique difficile. Entre Cursor début 2025, Cursor mi-2025, Claude Code à l'automne 2025, et les agents autonomes qu'on déploie en 2026, ce ne sont plus les mêmes objets.

J'ai commencé par l'autocomplétion intelligente, avec Tabnine en 2018, puis Copilot. Codium — devenu Qodo — a été mon premier reviewer IA. Au printemps 2024, je faisais mes premiers Code Katas en ping-pong avec une IA. L'été suivant, un collègue m'a dit qu'il avait codé un projet entier sans écrire la moindre ligne lui-même. J'ai voulu essayer et j'ai constaté très vite que c'était plus efficace que de mixer ma production et celle de l'IA. À chaque transition, j'ai dû réapprendre à faire du vélo.

### La success story est visible, l'incident l'est moins

Le dernier biais est statistique&nbsp;: on entend ceux qui réussissent avec l'IA. On entend moins <span class="mark--soft" data-fig="6">ceux qui ont stabilisé pendant trois semaines un outil construit en trois jours</span>.

{{ figure(num="6", variant="incidents", tag="Incidents · 2025-2026", title="Deux fuites emblématiques", title_id="v4-title", desc_id="v4-desc", body="fig6-fuites.html", pos="side", caption="CVE référencée + leak documenté. Dans les deux cas, code généré par IA déployé sans contrôle de sécurité (row-level security, autorisations endpoints).", source='Source&#160;: Vibe Coder Blog, <em>Security Researchers Sound the Alarm on AI Code Vulnerabilities</em>, n.&#160;<sup class="footnote-reference"><a href="#8">8</a></sup>.') }}

Et pourtant, les incidents s'accumulent. La CVE-2025-48757 a exposé une faille chez Lovable, plateforme de codage IA, qui générait des schémas de base de données sans politiques de sécurité au niveau ligne. Plus de 170 applications en production affectées<sup class="footnote-reference"><a href="#8">8</a></sup>. La faille Moltbook a leaké 1,5 million de tokens d'authentification, parce que les endpoints API générés ne vérifiaient pas les autorisations<sup class="footnote-reference"><a href="#8">8</a></sup>.

Plus structurellement&nbsp;: selon Veracode, 45&nbsp;% du code généré par IA contient au moins une vulnérabilité OWASP<sup class="footnote-reference"><a href="#9">9</a></sup>. Une autre étude mesure que ce code contient 2,74 fois plus de vulnérabilités que le code écrit par des humains<sup class="footnote-reference"><a href="#10">10</a></sup><sup class="footnote-reference"><a href="#11">11</a></sup>.

Les méthodologies varient, les chiffres se discutent. Le signal, lui, converge&nbsp;: produire vite avec l'IA coûte en qualité de livraison, et les métriques d'adoption ne le voient pas.

{{ figure(num="7", variant="table", tag="Synthèse", title="Quatre angles morts du discours dominant", title_id="v6-title", desc_id="v6-desc", body="fig7-synthese.html", pos="inline", caption="Quatre lignes, quatre études indépendantes : METR (expérience contrôlée), Faros (télémétrie 22&#160;000 devs), GitClear + DORA (211&#160;M lignes + benchmark décennal), Veracode (audit GenAI 2025).") }}

---

## La vitesse n'est pas la précipitation

Lorsqu'on compare le temps de trajet en avion ou en voiture, on compare de porte à porte plutôt que le temps passé dans le véhicule. C'est la vitesse. Sauter dans le premier bus arrivé et se rendre compte que ce n'est pas la bonne direction, c'est de la précipitation. Automatiser une tâche de développement peut relever de l'un ou de l'autre. L'IA ne fait pas la différence entre les deux. C'est le développeur qui décide où et comment l'utiliser. Personne n'aime s'apercevoir que la mémoire de Claude Code a mélangé le nom d'un client avec un autre le jour de la démo. Cet arbitrage régulier prend du temps. Un temps incompressible mais indispensable qui se prend avant d'écrire. C'est le temps nécessaire à la qualité. Si je devais résumer en deux formules&nbsp;:

<div class="formules" role="group" aria-label="Deux formules clés">
  <p class="formules__row">
    <span class="formules__term">Précipitation</span>
    <span class="formules__eq" aria-hidden="true">=</span>
    <span class="formules__rhs">
      <span class="formules__factor">accélération</span>
      <span class="formules__op" aria-hidden="true">−</span>
      <span class="formules__factor">attention</span>
    </span>
  </p>
  <p class="formules__row">
    <span class="formules__term">Vitesse</span>
    <span class="formules__eq" aria-hidden="true">=</span>
    <span class="formules__rhs">
      <span class="formules__factor">accélération</span>
      <span class="formules__op" aria-hidden="true">+</span>
      <span class="formules__factor">réflexion</span>
      <span class="formules__op" aria-hidden="true">+</span>
      <span class="formules__factor">qualité</span>
    </span>
  </p>
</div>

Avant l'IA, nous passions 10&nbsp;% de notre temps à écrire du code, et 90&nbsp;% à le relire, le concevoir, y réfléchir, le réorganiser et aller lire de la documentation. Si nous possédons un outil qui peut accélérer ces 10&nbsp;%, le gain est faible à long terme. Il ne peut être pérenne qu'à deux conditions&nbsp;: savoir accélérer une part des 90&nbsp;% et investir plus de temps sur ce qu'on n'accélère pas.

---

## Ce qui vient ensuite

Avec daily-ops, j'avais identifié le logiciel accidentel et ajouté la structure dès le 25 avril. Ce matin encore, quatre semaines plus tard, je corrigeais un bug né des premiers jours. La discipline ne suffit pas à effacer la précipitation initiale.

Si la vitesse mesurée n'est pas la productivité réelle, et si la discipline n'efface pas la précipitation, alors la question devient&nbsp;: qu'est-ce que l'IA m'apporte *vraiment*&nbsp;? Ce sera l'objet du second article.

---

## Note méthodique — quatre biais

Article basé sur mes recherches personnelles, dont je partage les sources. J'attire l'attention sur quatre biais qui peuvent creuser un écart entre nos points de vue&nbsp;:

1. **Early-adopter**&nbsp;: la nature et le nombre d'années de mon expérience ont une influence. Nos domaines, niveau de responsabilité et organisation varient. J'essaie de me renseigner et de prendre en compte le panel le plus large possible, et suis conscient que ma vision a des angles morts.
2. **Temporalité**&nbsp;: certaines études citées ont plus d'un an en mai 2026. Le domaine de l'IA change assez vite pour que les données aient déjà perdu du sens. J'ai sélectionné les sources qui sont, à ma connaissance, toujours valables.
3. **Sélection des incidents**&nbsp;: je ne traite pas ici les incidents où l'IA n'est qu'un démultiplicateur d'une faute humaine évidente — supprimer la base de prod sans backup, exposer des credentials sans audit. Ces cas existent en abondance, mais ils racontent moins l'IA que la pratique qui l'entoure.
4. **Mes croyances et connaissances**&nbsp;: j'écris en faveur d'une pratique que j'ai adoptée. Y adhérer ou pas peut donner une compréhension différente de mes propos. Sur ce biais en particulier, à vous de faire la part des choses.

---

## Notes et références

<!-- Notes en HTML manuel (id == label == ancre). NE PAS repasser en
     footnotes markdown `[^N]` : Zola renumérote alors selon l'ordre des
     seuls appels markdown, or les notes 1/2 ne sont appelées que par des
     ancres HTML (encart paradoxe) et les figures portent des `#N` codés en
     dur — le compteur auto désynchronise tout. Cf. commit de cette correction. -->
<div class="footnote-definition" id="1"><sup class="footnote-definition-label">1</sup>
<p>Second Talent, <a rel="external" href="https://www.secondtalent.com/resources/ai-coding-assistant-statistics/"><em>AI Coding Assistant Statistics &amp; Trends [2025]</em></a>, secondtalent.com, 2025.</p>
</div>

<div class="footnote-definition" id="2"><sup class="footnote-definition-label">2</sup>
<p>Stack Overflow, <a rel="external" href="https://survey.stackoverflow.co/2025/"><em>Developer Survey 2025</em></a>, stackoverflow.co.</p>
</div>

<div class="footnote-definition" id="3"><sup class="footnote-definition-label">3</sup>
<p>Becker, J. et al., <a rel="external" href="https://arxiv.org/abs/2507.09089"><em>Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity</em></a>, METR, arXiv:2507.09089, juillet 2025 (<a rel="external" href="https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/">résumé METR</a>).</p>
</div>

<div class="footnote-definition" id="4"><sup class="footnote-definition-label">4</sup>
<p>Faros AI, <a rel="external" href="https://www.faros.ai/blog/ai-software-engineering"><em>The AI Productivity Paradox Research Report</em></a>, faros.ai, 2025.</p>
</div>

<div class="footnote-definition" id="5"><sup class="footnote-definition-label">5</sup>
<p>GitClear, <a rel="external" href="https://www.gitclear.com/ai_assistant_code_quality_2025_research"><em>AI Copilot Code Quality 2025 Research Report</em></a>, gitclear.com, février 2025.</p>
</div>

<div class="footnote-definition" id="6"><sup class="footnote-definition-label">6</sup>
<p>Google, <a rel="external" href="https://dora.dev/research/2024/dora-report/"><em>Accelerate State of DevOps Report 2024</em></a>, dora.dev.</p>
</div>

<div class="footnote-definition" id="7"><sup class="footnote-definition-label">7</sup>
<p>Solar-Lezama, A., interview au <a rel="external" href="https://www.wsj.com/"><em>Wall Street Journal</em></a>, citée dans <a rel="external" href="https://devops.com/ai-in-software-development-productivity-at-the-cost-of-code-quality/">DevOps.com</a>, <em>AI in Software Development: Productivity at the Cost of Code Quality?</em>, 2025.</p>
</div>

<div class="footnote-definition" id="8"><sup class="footnote-definition-label">8</sup>
<p>Vibe Coder Blog, <a rel="external" href="https://blog.vibecoder.me/security-researchers-ai-code-vulnerability-crisis"><em>Security Researchers Sound the Alarm on AI Code Vulnerabilities</em></a>, blog.vibecoder.me, avril 2026&nbsp;; voir aussi <a rel="external" href="https://nvd.nist.gov/vuln/detail/CVE-2025-48757">CVE-2025-48757</a>.</p>
</div>

<div class="footnote-definition" id="9"><sup class="footnote-definition-label">9</sup>
<p>Veracode, <a rel="external" href="https://www.veracode.com/resources/analyst-reports/2025-genai-code-security-report/"><em>2025 GenAI Code Security Report</em></a>, veracode.com.</p>
</div>

<div class="footnote-definition" id="10"><sup class="footnote-definition-label">10</sup>
<p>SoftwareSeni, <a rel="external" href="https://www.softwareseni.com/risk-management-and-security-framework-for-legacy-system-modernization/">analyse de Veracode 2025 et Apiiro</a>, softwareseni.com, février 2026.</p>
</div>

<div class="footnote-definition" id="11"><sup class="footnote-definition-label">11</sup>
<p>Futurity, <a rel="external" href="https://www.futurity.org/ai-generated-code-vulnerable-3330542/"><em>AI-generated code is vulnerable</em></a>, futurity.org, 2026.</p>
</div>
