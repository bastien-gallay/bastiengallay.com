+++
title = "Avec l'IA, je code plus lentement"
date = 2026-05-27
description = "Pourquoi le discours dominant sur la productivité IA mesure ce qui ne compte pas."
draft = true

[extra]
heading_html = "Avec l'IA, je code plus <mark class=\"mark\">lentement</mark>"
signature_bio = "fabrique des outils OSS pour penser, écrire et coder comme une seule discipline."
series = "coder-avec-l-ia"
series_title = "Coder avec l'IA"
series_index = 1
series_total = 3
series_part_subtitle = "ce que les chiffres ne mesurent pas"
+++

*Pourquoi le discours dominant sur la productivité IA mesure ce qui ne compte pas.*

> **Série en 3 articles — *Coder avec l'IA***
> Article 1/3 — *ce que les chiffres ne mesurent pas*.
> À suivre : *Ce que l'IA m'apporte vraiment* (art. 2) · *Quelle stratégie d'équipe ?* (art. 3).

---

## Une anecdote, pour commencer

Le 4 avril 2026, j'ai vibe-codé un outil en quelques heures pour gérer mes tâches quotidiennes. Il s'appelait `daily-ops`. Une glu en Python autour de mes `TODO.md`, capable de me faire passer d'un projet à l'autre sans friction. Ça marchait. J'étais content.

Le 25 avril, j'ai créé un vrai repo, ajouté trois fonctionnalités, et un peu de qualité — tests, structure, le minimum syndical. L'IA m'a proposé une abstraction élégante : séparer les items en *blocks* nommés alphabétiquement. *Block A*, *Block B*. Au premier coup d'œil, c'était propre.

Depuis quatre semaines, je corrige les bugs de cette élégance. Fusion accidentelle de blocks entre deux jours à cause du nommage alphabétique. Report de blocks dont tous les items étaient terminés, parce que l'état "fini" n'était pas explicite au niveau du bloc. Formatage concurrent entre deux projets qui partageaient les mêmes fichiers de configuration.

Bilan : quelques heures pour produire l'outil. Quatre semaines pour le rendre utilisable.

Pourtant, je suis depuis longtemps convaincu de deux choses : tout est logiciel — de la simple feuille Excel au script qui génère des PDF — et il faut très vite décider de le supprimer ou de le pérenniser avant qu'il ne se complexifie. Tout logiciel pérenne doit, au plus tôt, bénéficier d'un filet de sécurité pour ne pas baisser en qualité.

Avec l'IA, la complexité arrive plus vite. Et plus discrètement que le bon vieux Excel qui commençait à crouler sous ses six formules à références croisées.

C'est cette expérience, répétée sous plusieurs formes au cours des derniers mois, qui m'a fait basculer. **Depuis, je code plus lentement. Et je produis plus.**

---

## Le paradoxe

Le discours dominant en 2026 est sans ambiguïté. Selon GitHub, les utilisateurs de Copilot complètent 126&nbsp;% plus de projets par semaine que les codeurs manuels [^1]. Les enquêtes Stack Overflow confirment 84&nbsp;% d'adoption chez les développeurs, dont plus de la moitié quotidienne [^2]. Et 78&nbsp;% des développeurs déclarent que l'IA améliore leur productivité [^1].

Ces chiffres sont sincères. Ils ne sont simplement pas la mesure de ce qu'on croit mesurer.

---

## Ce que les chiffres ne mesurent pas

### La mesure perçue n'est pas la mesure réelle

En 2025, une équipe de chercheurs de METR a conduit une expérience contrôlée randomisée [^3]. Seize développeurs open source expérimentés, chacun avec en moyenne cinq ans de pratique sur les projets qu'ils maintenaient. 246 tâches réelles, pas synthétiques. Outils utilisés : Cursor Pro et Claude 3.5/3.7 Sonnet.

<!-- VISUEL-1 : Perception vs réalité (étude METR)
  Type      : barres horizontales (3 valeurs)
  Données   : prédit +24%, perçu +20%, mesuré -19%
  Légende   : "Un écart de 39 points entre ce que les développeurs croient et ce que la mesure révèle."
  Source    : METR Becker 2025 [^3]
  Placement : encart latéral (side frame) à droite du paragraphe
-->

Avant de commencer, les développeurs prédisaient un gain de temps de 24&nbsp;% grâce à l'IA. Après l'étude, ils estimaient ce gain à 20&nbsp;%. La mesure objective, elle, montrait une augmentation du temps de complétion de 19&nbsp;%.

L'écart entre la perception et la réalité dépassait les 39 points. Ces développeurs n'étaient ni naïfs ni hostiles à l'IA. Ils étaient simplement convaincus d'aller plus vite quand ils allaient en réalité plus lentement.

J'ai moi-même vécu cet écart. Il y a deux ans, avec des modèles bien moins performants, ce qui m'aurait pris une ou deux heures me prenait souvent une demi-journée. Encore aujourd'hui, il m'arrive par réflexe de demander à Claude Code l'édition d'un fichier qu'il fera en trente secondes, là où j'aurais pu terminer en dix.

Les études antérieures, qui annonçaient 56&nbsp;% ou 21&nbsp;% d'accélération [^3], reposaient sur des tâches synthétiques. Or les conditions synthétiques masquent ce qui rend les vrais projets coûteux : la cohérence avec l'existant, la dette technique, les conventions tacites, les contraintes invisibles.

### On mesure la rédaction, pas la livraison

Une étude conduite sur la télémétrie de 22 000 développeurs et deux ans d'historique a documenté une déconnexion entre productivité individuelle ressentie et performance de l'entreprise [^4]. Les développeurs disent travailler plus vite. Les entreprises ne voient pas d'amélioration mesurable de la vélocité de livraison ni des résultats business.

Le rapport explique pourquoi : les métriques de vendeurs traquent l'activité — commits, pull requests, lignes de code — qui gonflent mécaniquement avec l'usage IA. La vélocité de livraison, elle, dépend d'une chaîne complète : revue, tests, intégration, déploiement, opérations. Cette chaîne n'a pas accéléré au même rythme.

<!-- VISUEL-2 : Le gain individuel s'évanouit en file d'attente (Faros)
  Type      : 3 flèches ou barres horizontales (échelle commune)
  Données   : individus +21% tâches · revue +91% temps · équipes +98% PR
  Légende   : "Plus on accélère en amont, plus la file s'allonge en aval."
  Source    : Faros AI 2025 [^4]
  Placement : encart latéral (side frame)
-->

L'étude Faros sur le même sujet est encore plus précise : les développeurs individuels complètent 21&nbsp;% de tâches en plus, mais le temps de revue augmente de 91&nbsp;%, et les équipes génèrent 98&nbsp;% de pull requests supplémentaires [^4]. Les gains se transforment en files d'attente.

### La dette technique devient invisible

<!-- VISUEL-3 : L'inversion 2020-2024 (GitClear)
  Type      : 2 courbes croisées sur l'axe temps (2020 → 2024)
  Données   : copy-paste 8,3% → 12,3% (↗) · refactoring 24,1% → 9,5% (↘)
  Variante  : ajouter le churn (3,1% → 5,7%) en pointillé ou en tooltip
  Légende   : "Le code se duplique plus vite qu'il ne se range." — possibilité d'utiliser la citation Solar-Lezama (L.96) comme légende.
  Source    : GitClear AI Copilot Code Quality 2025 [^5]
  Placement : encart latéral OU figure pleine largeur en bas de la sous-section
-->

L'étude GitClear, qui a analysé 211 millions de lignes de code modifiées entre 2020 et 2024 chez Google, Microsoft, Meta et plusieurs entreprises cotées, mesure une transformation des pratiques [^5] :

- La part de copy-paste dans le code livré est passée de 8,3&nbsp;% à 12,3&nbsp;%.
- Le refactoring, lui, est passé de 24,1&nbsp;% à 9,5&nbsp;%.
- Le code "churned" — réécrit dans les deux semaines suivant son commit — a doublé : de 3,1&nbsp;% à 5,7&nbsp;%.
- En 2024, pour la première fois, les lignes copy-pastées ont dépassé les lignes "déplacées" (refactorisées).

Lorsque j'ouvre les projets en audit de code, je découvre de plus en plus souvent des fonctions de 800 lignes, empilées au fil des commits automatiques, et des tests unitaires identiques dans trois fichiers différents.

Le rapport DORA 2024 de Google, qui suit la performance de livraison logicielle depuis une décennie, confirme la tension : une augmentation de 25&nbsp;% de l'adoption IA accélère les revues de code mais diminue la stabilité de livraison de 7,2&nbsp;% [^6].

<!-- VISUEL-5 : Pull-quote Solar-Lezama
  Type      : citation isolée en grand caractère, façon "side quote" ou bloc pleine largeur
  Texte     : « L'IA est comme une carte de crédit toute neuve qui va nous permettre d'accumuler de la dette technique d'une manière qu'on n'avait jamais pu auparavant. »
  Attribution: Armando Solar-Lezama, MIT
  Source    : Wall Street Journal, cité dans DevOps.com 2025 [^7]
  Placement : pull-quote en marge OU bloc citation pleine largeur
  Note      : peut aussi servir de légende au VISUEL-3 si pull-quote séparée non retenue.
-->

Une citation d'Armando Solar-Lezama, professeur au MIT, résume mieux que je ne saurais le faire : *« L'IA est comme une carte de crédit toute neuve qui va nous permettre d'accumuler de la dette technique d'une manière qu'on n'avait jamais pu auparavant »* [^7].

### Le terrain change avant qu'on ait fini d'apprendre

Une dimension manque presque toujours dans les études : à quel stade d'apprentissage sont les développeurs mesurés ? Les outils évoluent à un rythme qui rend la stabilisation d'une pratique difficile. Entre Cursor début 2025, Cursor mi-2025, Claude Code à l'automne 2025, et les agents autonomes qu'on déploie en 2026, ce ne sont plus les mêmes objets.

J'ai commencé par l'autocomplétion intelligente, avec Tabnine en 2018, puis Copilot. Codium — devenu Qodo — a été mon premier reviewer IA. Au printemps 2024, je faisais mes premiers Code Katas en ping-pong avec une IA. L'été suivant, un collègue m'a dit qu'il avait codé un projet entier sans écrire la moindre ligne lui-même. J'ai voulu essayer et j'ai constaté très vite que c'était plus efficace que de mixer ma production et celle de l'IA. À chaque transition, j'ai dû réapprendre à faire du vélo.

### La success story est visible, l'incident l'est moins

Le dernier biais est statistique : on entend ceux qui réussissent avec l'IA. On entend moins ceux qui ont stabilisé pendant trois semaines un outil construit en trois jours.

<!-- VISUEL-4 : Incidents 2025-2026
  Type      : 2 cases compactes côte à côte (ou empilées) — façon "fiches incident"
  Cases     :
    1) CVE-2025-48757 / Lovable — schémas DB sans row-level security — > 170 apps en prod
    2) Moltbook — endpoints API sans contrôle d'autorisation — 1,5 M tokens leakés
  Légende   : "Deux incidents 2025-2026 emblématiques du trade-off."
  Source    : Vibe Coder Blog 2026 [^8] (à vérifier / consolider)
  Placement : encart latéral OU bandeau pleine largeur sous le paragraphe
-->

Et pourtant, les incidents s'accumulent. La CVE-2025-48757 a exposé une faille chez Lovable, plateforme de codage IA, qui générait des schémas de base de données sans politiques de sécurité au niveau ligne. Plus de 170 applications en production affectées [^8]. La faille Moltbook a leaké 1,5 million de tokens d'authentification, parce que les endpoints API générés ne vérifiaient pas les autorisations [^8].

Plus structurellement : selon Veracode, 45&nbsp;% du code généré par IA contient au moins une vulnérabilité OWASP [^9]. Une autre étude mesure que ce code contient 2,74 fois plus de vulnérabilités que le code écrit par des humains [^10].

Ces chiffres méritent d'être discutés. Les méthodologies varient. Mais le signal converge : il y a un trade-off entre vitesse de production et qualité de livraison, qui n'apparaît pas dans les métriques d'adoption.

<!-- VISUEL-6 : Tableau récap des 4 biais (synthèse de section)
  Type      : tableau 4 lignes × 3 colonnes
  Colonnes  : Ce que les métriques ratent | Chiffre-clé | Source
  Lignes    :
    1) Perception ≠ réalité            | -19% (vs +24% attendu)        | METR [^3]
    2) Rédaction ≠ livraison           | revue +91%, PR +98%           | Faros [^4]
    3) Dette technique invisible       | copy-paste 8,3% → 12,3%       | GitClear [^5] + DORA [^6]
    4) Success ≠ incident              | 45% du code IA = ≥ 1 CVE OWASP| Veracode [^9]
  Légende   : "Quatre angles morts du discours dominant."
  Placement : pleine largeur, en clôture de la section "Ce que les chiffres ne mesurent pas", juste avant la transition vers "La vitesse n'est pas la précipitation".
-->

---

## La vitesse n'est pas la précipitation

Lorsqu'on compare le temps de trajet en avion ou en voiture, on compare de porte à porte plutôt que le temps passé dans le véhicule. C'est la vitesse. Sauter dans le premier bus arrivé et se rendre compte que ce n'est pas la bonne direction, c'est de la précipitation. Automatiser une tâche de développement peut relever de l'un ou de l'autre. L'IA ne fait pas la différence entre les deux. C'est le développeur qui décide où et comment l'utiliser. Personne n'aime s'apercevoir que la mémoire de Claude Code a mélangé le nom d'un client avec un autre le jour de la démo. Cet arbitrage régulier prend du temps. Un temps incompressible mais indispensable qui se prend avant d'écrire. C'est le temps nécessaire à la qualité. Si je devais résumer en deux formules&nbsp;:

- précipitation = accélération - attention
- vitesse = accélération + réflexion + qualité

Avant l'IA, nous passions 10&nbsp;% de notre temps à écrire du code, et 90&nbsp;% à le relire, le concevoir, le réfléchir, le réorganiser et aller lire de la documentation. Si nous possédons un outil qui peut accélérer ces 10&nbsp;%, le gain est faible à long terme. Il ne peut être pérenne qu'à deux conditions&nbsp;: savoir accélérer une part des 90&nbsp;% et investir plus de temps sur ce qu'on n'accélère pas.

---

## Ce qui vient ensuite

Avec daily-ops, j'avais identifié le logiciel accidentel et ajouté la structure dès le 25 avril. Ce matin encore, quatre semaines plus tard, je corrigeais un bug né des premiers jours. La discipline ne suffit pas à effacer la précipitation initiale.

Si la vitesse mesurée n'est pas la productivité réelle, et si la discipline n'efface pas la précipitation, alors la question devient : qu'est-ce que l'IA m'apporte *vraiment* ? Ce sera l'objet du second article.

---

## Note méthodique — quatre objections

Une recherche honnête doit reconnaître ce qui pourrait l'invalider. Quatre objections que je trouve sérieuses :

**Le biais d'early-adopter.** Mon vécu, comme celui des seize développeurs de l'étude METR, est celui de praticiens expérimentés. Un développeur en début de carrière connaît peut-être un autre rapport à l'IA, plus directement accélérateur, parce qu'il n'a pas encore l'intuition de la dette à venir. Cela n'invalide pas la thèse : ça précise son public.

**Le biais temporel.** Les études citées portent sur la période 2024-début 2025. Les outils évoluent. Il est possible que les agents 2026 changent la donne. Mais le sens du changement n'est pas évident : les outils plus autonomes accentuent aussi la dimension *« il faut quelqu'un pour rattraper »*, comme le suggèrent les chiffres récents sur les incidents Claude Code et Copilot [^11].

**Le biais de sélection des incidents.** Je ne traite pas ici les incidents où l'IA n'est qu'un démultiplicateur d'une faute humaine évidente — supprimer la base de prod sans backup, exposer des credentials sans audit. Ces cas existent, et ils abondent, mais ils racontent moins l'IA que la pratique qui l'entoure.

**Mon propre biais.** J'écris en faveur d'une pratique que j'ai adoptée. Je suis donc à la fois témoin et avocat. Je fais confiance à mes lecteurs pour prendre le recul nécessaire.

---

## Notes et références

[^1]: Second Talent, [*AI Coding Assistant Statistics & Trends \[2026\]*](https://www.secondtalent.com/insights/ai-coding-assistant-statistics/), secondtalent.com, 2026.

[^2]: Stack Overflow, [*Developer Survey 2025*](https://survey.stackoverflow.co/2025/), stackoverflow.co.

[^3]: Becker, J. et al., [*Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity*](https://arxiv.org/abs/2507.09089), METR, arXiv:2507.09089, juillet 2025 ([résumé METR](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/)).

[^4]: Faros AI, [*The AI Productivity Paradox Research Report*](https://www.faros.ai/), faros.ai, 2025.

[^5]: GitClear, [*AI Copilot Code Quality 2025 Research Report*](https://www.gitclear.com/ai_assistant_code_quality_2025_research), gitclear.com, février 2025.

[^6]: Google, [*Accelerate State of DevOps Report 2024*](https://dora.dev/research/2024/dora-report/), dora.dev.

[^7]: Solar-Lezama, A., interview au [*Wall Street Journal*](https://www.wsj.com/), citée dans [DevOps.com](https://devops.com/), *AI in Software Development: Productivity at the Cost of Code Quality?*, 2025.

[^8]: Vibe Coder Blog, [*Security Researchers Sound the Alarm on AI Code Vulnerabilities*](https://blog.vibecoder.me/), blog.vibecoder.me, avril 2026 ; voir aussi [CVE-2025-48757](https://nvd.nist.gov/vuln/detail/CVE-2025-48757).

[^9]: Veracode, [*2025 GenAI Code Security Report*](https://www.veracode.com/resources/genai-code-security-report-2025/), veracode.com.

[^10]: SoftwareSeni, [analyse de Veracode 2025 et Apiiro](https://www.softwareseni.com/), softwareseni.com, février 2026.

[^11]: Futurity, [*AI-generated code is vulnerable*](https://www.futurity.org/), futurity.org, 2026.
