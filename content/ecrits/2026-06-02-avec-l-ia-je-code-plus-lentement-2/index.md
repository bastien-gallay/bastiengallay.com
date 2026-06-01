+++
title = "Avec l'IA, je code plus lentement — 2"
date = 2026-06-02
draft = true

[extra]
numero = "01.21"
series = "coder-avec-l-ia"
series_title = "Coder avec l'IA"
series_index = 2
series_total = 3
series_part_subtitle = "ce que l'IA m'apporte vraiment"

# Signature de série, 3 couches (cf .personal/research/2026-05-26-signatures-serie-coder-avec-l-ia.md).
# Base 2/3 figée + anecdote B (préférence Bastien) — à confirmer à la rédaction.
signature_bio = "Je ralentis toujours plus pour coder encore mieux. Je mesure ce que je déploie. J'ai mis vingt minutes à comprendre l'intention de mon propre code écrit l'an dernier."

# Active le rail Value Stream Map (cf. macros/vsm.html + static/vsm.js).
# Les sections portent leur ancre via le shortcode {{/* stage(id="…") */}}.
vsm = true
+++

{{ stage(id="full") }}

Depuis le premier article de cette série, un retour m'a poussé à revoir ma copie. Johan Massin m'a signalé une nouvelle étude METR de février 2026 faisant suite aux -19&nbsp;% de perte de productivité avec l'IA. Alors, finalement, est-ce que cette augmentation de productivité attendue a du sens ?

Ce qui rend cette suite intéressante à mes yeux, c'est l'aveu de ses auteurs concernant les difficultés méthodologiques rencontrées. Les conditions changent. Les tâches changent de nature. Les développeurs travaillent sur autre chose pendant que l'agent tourne. Cela me rappelle cette proportion des 10/90[^1090] et la charge cognitive. Cet article METR s'arrête sur un problème nouveau : non seulement on ne mesure pas la bonne chose dans la vitesse de développement, mais on n'est plus capable de la mesurer de la bonne manière.

Les problèmes de méthode ont été surmontés pour fournir de nouveaux chiffres. De -19&nbsp;% de productivité constaté dans le premier article, cette nouvelle expérience distingue -18&nbsp;% pour les développeurs initiaux et -4&nbsp;% pour les nouveaux développeurs du panel. Autres points intéressants&nbsp;: de moins en moins de développeurs acceptent de participer sans IA et on constate une augmentation de projets greenfield participant à l'étude.

Dans la discussion sur le Slack Okiwi, suite au rappel de Johan, Jean-Baptiste Dusseaut nous questionne : « C'est quoi la productivité ? Quand je déclare fini ? Quand c'est en prod ? En prod sans défaut ? En prod sans défaut et que des gens s'en servent ? »

Pour répondre à ces questions, j'ai besoin de vous expliquer comment je travaille désormais avec l'IA.

<!--
=== NOTE ÉDITORIALE (Claude) — §1 : reste hygiène finale ===
(Notes d'édition. §1 considérée bouclée sur le fond.)
  • Confirmer en BASE ARRIÈRE les chiffres METR (−18 initiaux / −4 nouveaux) avant publication.
  • IC à mettre en note [^N] : −18 (−38 à +9) ; −4 (−15 à +9). Sans IC, −4 = « moins négatif », pas « meilleur ».
  • Cohérence typo % et signe moins (- vs −) sur tout l'article, à aligner sur 1/3.
  • Vérifier le rendu de la note [^1090] (brouillon Claude à valider) sous zola serve --drafts.
=== fin note éditoriale ===
-->

{{ stage(id="full2") }}

## Mon travail, en sept étapes

Ce qui suit est ma manière de travailler avec l'IA dans mes développements personnels, open source pour la plupart. Elle trouve ses origines dans mon expérience d'artisan logiciel, les concepts de product management et mes échanges avec d'autres praticiens.

Influencé par Lean et Agile, j'ai choisi une représentation inspirée de Value Stream Mapping. Elle est marquée par 7 étapes principales regroupées ainsi :

- **Avant le code** : je prends le temps de définir le domaine, d'ajuster le périmètre visé et enfin de concevoir la forme globale. À l'issue de ces 3 étapes, j'ai un cadre précis de ce que je compte coder.
- **Le code et sa boucle** : La responsabilité des 3 étapes suivantes est la mise en production d'un code de qualité. La génération du code est suivie par les vérifications de sa qualité. Ensuite, différentes revues et intégrations prennent le relais. Ces trois étapes sont orchestrées par une boucle de rétroaction continue centrée sur la compréhension humaine et l'adaptation.
- **Après le code** : La dernière étape, le suivi de la livraison et sa maintenance, démarrent immédiatement après chaque livraison réussie. Cette étape comprend des activités comme le dogfood, la communication et le suivi statistique.

Cette séquence est adaptable, jamais figée. Elle reste très classique et je la connaissais de manière empirique uniquement. Pour les besoins de l'article, j'ai reconstitué avec l'IA et mes commits sur lucid-lint les patterns et checkpoints les plus évidents, puis comparé avec l'idée abstraite que je m'en faisais. La dernière étape est très généraliste — presque fourre-tout. La raison : je garde lucid-lint comme exemple le plus récent et représentatif, et j'en suis pour l'instant le seul utilisateur quotidien.

Parlons à nouveau des études METR. La courbe METR vit dans l'enchainement d'étapes semblables aux miennes. Le temps que je prends vit entre les boucles que ces étapes jalonnent. C'est le ralentissement volontaire pour les vérifications, celui des transitions entre deux actions finies, pour garantir à la deuxième qu'elle reprendra sur des bases saines.

{{ stage(id="A") }}

## Le harnais qui libère

Un logiciel personnel est souvent issu d'une expérimentation, ou d'un prototype de recherche. La qualité initiale se contente de quelques tests et documents de réflexion. Avant de coder plus, je génère les tests manquants, j'installe les linters, je construis la chaîne de livraison initiale. J'ajoute aussi les documents d'intention comme README, CODING_STANDARDS ou LICENSE et CONTRIBUTING pour l'open source. Ce sont les conditions pour implémenter sereinement les règles métier. Une fois ces conditions atteintes, j'ai une hygiène personnelle : le N+1. Lorsque je sécurise la qualité connue avec N garde-fous, j'en ajoute un pour ce qui est inconnu. Cela peut être du shift-left depuis la CI vers une règle pre-commit, du mutation testing, l'analyse statique ou une génération de documentation. Je choisis en fonction de la nature du projet ce qui me semble moins maitrisable.

Ensuite, tout cela doit grandir avec les principes de développement classiques : test first, DDD, CUPID, etc. Ces principes sont issus du Lean, des méthodes agiles — en particulier eXtreme Programming — et du craft. Tidy First de Kent Beck m'inspire à chaque itération de code : la base saine du début doit le rester. Pour la faire évoluer, il faut la challenger avant chaque nouvelle fonctionnalité.

Certains principes ont en revanche changé avec l'IA. Parfois, parce que ses capacités permettent de plus vite construire une qualité que j'aurais trouvée hors de portée ou overkill dans le passé. CodeQL et OpenSSF permettent des standards de qualité simples. Mais atteindre le minimum requis pour qu'ils ne lèvent pas d'alerte est long et rébarbatif. Avec une assistance IA, cela devient aisé. J'ai même trouvé cela ludique, sur lucid-lint, de chercher à atteindre ce badge BestPractices. Et le N+1 m'a mené à me poser la question de la revue par un autre contributeur. Je ne l'avais pas.

Je suis seul contributeur sur plusieurs projets open source, et un autre point de vue me semble important. J'utilise Claude Code au quotidien. J'ai automatisé la revue avec Gemini Code Assist. Là où mon assistant habituel et moi laissions régulièrement passer des imperfections, ce nouvel outil dans la chaîne pouvait les repérer.

Lorsque je demande à l'IA de rendre visuel un aspect complexe de l'architecture ou du parcours utilisateur, je fais attention à critiquer et modifier pour mieux m'impliquer. Aussi, j'ai découvert qu'il était plus efficace de générer un script pour représenter un graphique à partir des données brutes, par exemple, que de générer le graphique directement. Le résultat de ces pratiques, ce sont des documents utiles pour moi et des inputs fiables dans mon contexte Claude Code. J'écris pour l'humain. J'écris pour l'IA. Je n'écris qu'une fois.

Ce n'est pas parfait, mais ça me convient. Je me rappelle de mon premier commit sur `lucid-lint`, lorsque j'avais appliqué ce harnais en même temps que j'expérimentais la faisabilité sur quelques règles. La CI m'a crié dessus. Très fort. "It works on my machine" est aussi vrai pour la qualité. J'ai dû dédier 5 commits à corriger GitHub Actions, puis encore une vingtaine pour réaligner mes tests.

{{ stage(id="courage") }}

## Le courage

<!--   1. Rebond + valeur Courage     reprends ta note L83 : la CI qui crie ne m'a pas
                                 découragé — au contraire. Le filet rend l'annulation
                                 peu coûteuse → j'ose. (valeur Courage d'XP, allusif)

  2. Beck — UNE citation          « 90 % de mes compétences valent 0, le levier sur
                                 les 10 % restants ×1000. » (tweet 22 avr. 2023)
                                 → c'est ici que « le moins compressible = le plus
                                 de valeur » cashe : les 10 %, c'est le jugement.

  3. Trois actes (Git lucid-lint) · path A jeté à J+4 alors qu'il était VERT
                                 (golden snapshots + property tests), pour ~5,6 %
                                 · 3 variantes Category mortes en 24 h (fd56c3b)
                                 · 81 features de roadmap renommées en 2 jours

  4. Bijou + bascule             « Le filet de sécurité n'est pas un gage de qualité.
                                 C'est ce qui m'autorise à être courageux. »
                                 → « Et ce que ce courage libère, ce n'est pas du
                                    temps — c'est du jugement. »   (ouvre §5) -->

J'aurais pu être découragé par un tel travail et simplement arrêter le projet, sans l'IA. Au contraire, j'ai eu en tête l'image de Senku, de Dr Stone, s'exclamant *« Voilà qui est follement excitant !! »* J'ai retroussé mes manches et celles de Claude Code, et ensemble, en deux heures, nous avons ajusté la base de code. Le courage de refuser le compromis. Un rêve que je n'atteignais que rarement auparavant. Ou alors en quelques jours plutôt qu'en quelques heures.

Beaucoup penseraient que je parle d'accélération immédiate. Et c'est le cas. La différence c'est que cette accélération locale sert à oser booster la pérennité. Cela me rappelle le tweet de Kent Beck « 90 % de mes compétences viennent de perdre leur valeur, le levier sur les 10 % restants vient d'être multiplié par 1000. » Supprimer, réviser et refactorer sont des actes fondamentaux de ces 10&nbsp;%.

Je reviens à mon fil rouge `lucid-lint`. Alors qu'il fonctionnait et donnait des résultats, j'ai pris quelques décisions folles. Au bout d'une journée d'existence de l'outil en production, <!-- note: revoir le délai exact --> j'ai jeté et refondu des fondamentaux : 3 catégories mortes en 24h. Plus tard, pour mieux m'y retrouver, j'ai renommé 84 features de la roadmap et créé un système de gestion pour celles-ci. Plus clivant encore : pour gagner 5,6 % de perf, j'ai réécrit le parseur Markdown alors que tous les tests, golden snapshots et property tests, étaient verts.

Le point commun ? Le filet de sécurité n'est pas un gage de qualité. C'est ce qui m'autorise à être courageux. <!-- Gardé pour réflexion: La crainte du changement et de ses conséquences avait perdu son emprise sur ma décision. --> Et ce que ce courage libère, ce n'est pas du temps — c'est du jugement.

{{ stage(id="B") }}

## L'IA, casseur de complaisance

<!-- 
  1. Thèse           l'IA ne décide pas → réduit la charge POUR mieux juger,
                     et casse ma complaisance (passe outre MON biais).
  2. Durée vs admin   étapes 1 & 3 : pas de raccourci du temps humain (comprendre,
                     décider), mais le poids ADMINISTRATIF tombe ; effet qualitatif.
  3. Le casseur,      UNE feature torturée et abandonnée · death match vs design
     incarné         fixation (Wadinambiarachchi CHI 2024 + transposition honnête) ·
                     revue adverse cross-IA (ta phrase parquée L114).
  4. Anecdote-cœur    ← ICI : tes propres articles. (voir intégration ci-dessous)
  5. Bijou            « casser ma complaisance avant que je la confonde avec de
                     la cohérence. »
  6. Contre-exemple   lucid-lint 18→21→25 (sur-délégation, slop, raffiné tard).
     (obligatoire)    Court, net, pas une lamentation.
-->

Ce jugement, je le garde pour moi. Et pour l'enrichir, je le nourris des analyses de l'IA, d'un côté, et de ses critiques, de l'autre. Pour le premier enrichissement, j'ai pour seul objectif de réduire le poids administratif de collecte et de synthèse. Le temps gagné est ainsi réinvesti dans la qualification des options avant un choix, par exemple pour un death match entre 2 expérimentations prêtes à devenir de vrais projets.

Pour l'enrichissement critique, c'est le plus cruel pour moi. Je demande explicitement à l'IA d'être dure avec ce que nous produisons. J'ai même un skill, `/feature-torture`, dédié à faire un stress test d'une évolution prévue dans la roadmap. Une sorte de Dewey, de la série Malcolm « Toi tu vis. Toi tu vis. Toi tu crèves ! » Et aussi toi tu changes, toi tu te scindes. Une sortie riche de ce skill me permet de garder la tête froide et de prendre la décision finale. L'IA n'a pas d'égo, pas d'attachement émotionnel. J'utilise ces qualités pour mieux juger.

Je suis encore plus dur avec moi-même sur la rédaction de mes articles. Celui-ci ne fait pas exception. Claude Code revoit chaque mot, phrase, paragraphe et relit la cohérence globale. Je ne le laisse pas me dire que c'est bien si c'est juste passable. C'est dur. C'est exténuant. Et le pire&nbsp;? Là où je croyais m'améliorer, les statistiques me montrent que je régresse sur l'utilisation abusive des hedge (parfois, souvent, plutôt, peut-être), alors que les conventions que J'AI choisies les proscrivent. Chaque paragraphe est repassé à la moulinette environ 4 fois — oui, nous avons compté — avant qu'il soit bon.

Est-ce abusif de compter tout cela&nbsp;? Pas si je veux être tranquille. Je ne veux pas laisser passer des phrases qui seraient mal comprises. Tout comme je m'interdis de laisser un bug ou une mauvaise conception s'échapper dans la nature. Pour éviter leur accumulation, je demande à l'IA de casser ma complaisance avant que je la confonde avec de la cohérence.

Il arrive parfois, malgré tout, qu'une simple règle de lisibilité dans `lucid-lint` passe la torture, les revues locales et les tests, puis au premier essai en conditions réelles : le linter explose en vol ! Il s'agissait d'une règle, expérimentale, repérant les nombres sans ancrage proche — sans unité, par exemple. Mais lâchée dans le monde réel, elle délimitait mal les nombres, confondait les numéros de version avec de grandes valeurs numériques et finissait par crasher l'exécution. Bilan : quelques heures et 3 commits.

<!-- > *reprise depuis section "harnais"* - non replacé. Gardé comme stock si besoin : La revue IA est aussi régulièrement lancée en mode adverse sur un aspect particulier. À chaque fois, une amélioration émerge de cet exercice. -->

{{ stage(id="C") }}

## De la rigueur du cadre à la rigueur de la boucle

<!-- Mouvement (6 temps) :

  1. Fausse promesse   « avec l'IA, plus besoin de rigueur/tests » → démentie :
                       lucid-lint = 814 tests, snapshots, proptest. MAIS beaucoup
                       de tests ≠ TDD canonique non plus → la rigueur a bougé.
  2. Face 1 — TDD+Reflect  le 4e temps que TU as ajouté : Red→Green→Refactor→Reflect.
                       <1 min, met à jour le PLAN pas le code, force : apply now /
                       today / roadmap / forget it.
  3. Face 2 — SDD       marché (BMAD, Speckit) → maison → abandon du maison.
                       Leçon NOMMÉE : même un cadre sur-mesure fige une décision
                       qui doit rester vivante. L'abandon = résultat de Reflect.
  4. Face 3 — preuve Git  le vocabulaire tient (6 types jour 1 intacts), la mécanique
                       craque (Category : 3 variantes sur 6 mortes en 24 h).
  5. Reflect macro      l'IA génère les tests manuels → TU les exécutes → TU inscris.
     (exécuter-inscrire)  → reprise de contrôle. Bijou : « le code généré par IA est,
                       pour mon cerveau, du legacy de quelques heures. »
  6. Clôture            « La rigueur ne s'est pas effacée. Elle s'est déplacée du
                       cadre figé vers la boucle réflexive. » + 1 ligne Storey
                       (create/review mode) qui ouvre §7. -->

Cela veut-il dire que les tests étaient superflu ? Non, mille fois non. Ou plutôt 814 fois non, si on se réfère au nombre de tests unitaires sur `lucid-lint`. Et la rigueur est là, elle aussi, dans leur diversité — certains tests s'assurent que chaque règle est documentée dans les deux langues — et dans le contrôle des tests eux-même — mutation testing et relectures humaines + IA pour s'assurer de leur pertinence. Est-ce que je fais toujours du TDD avec l'IA ? Oui et non. Pour plusieurs raisons.

Un petit saut dans le temps. Dans mes premières utilisations de GitHub Copilot, j'avais tenté de lui faire faire du TDD. Deux constatations décevantes :

1. Les tests passaient souvent en test after malgré les directives
2. En test first, Copilot générait une cohorte de tests avant de commencer à implémenter

Le premier se corrigeait avec le temps. Le deuxième a demandé une astuce qui s'est révélée fondamentale: ajouter une étape à TDD. Red → Green → Refactor → **Reflect**.

Cette 4 étape demande à l'IA de revoir l'exécution précédente des trois premières étapes, d'en tirer des apprentissages, et de changer le plan pour la suite quand nécessaire. Honnètement ? Peu de changements de plan dans l'ensemble. En revanche, une conception émergente qui revient car tous les assistants que j'ai utilisés se concentrent sur moins de tests et les exécutent plus souvent en premier. Le Red redevient respecté. Les tests inutiles ou en doublon sont à nouveau tués dans l'œuf. Et un bonus: une verbosité maîtrisée qui me donne des informations utiles en relecture de code.

{{ stage(id="vigilance") }}

## Note de vigilance

<p class="vsm-placeholder">À écrire — §7 : triple debt (technique / cognitive / intent — Storey + Fowler) ; comment les patterns remboursent ; ce qu'ils ne suffisent pas à régler (ré-apprentissage, veille, multitasking) ; chiffres Gerlich, Shen &amp; Tamkin. Bijou : « Storey a nommé ce qui me hantait sans que je le sache. » — supprimer à la rédaction.</p>

{{ stage(id="cliff") }}

## Vers l'article 3

<p class="vsm-placeholder">À écrire — §8 Cliffhanger : tous les patterns s'arrêtent à la frontière du clavier, mais ils produisent déjà du collectif ; question ouverte pour 3/3 (ce que l'organisation doit changer). Conclusion qui appelle, pas qui nuance. — supprimer à la rédaction.</p>

## Notes et références

[^1090]: Voir [le premier article de la série](@/ecrits/2026-05-28-avec-l-ia-je-code-plus-lentement/index.md). Avant l'IA, j'écrivais le code dans environ 10&nbsp;% de mon temps&nbsp;; les 90&nbsp;% restants allaient à le concevoir, le relire, l'organiser, le documenter et le maintenir. <!-- brouillon Claude — à ajuster à ta voix -->

*Cadre source (placeholder draft — à convertir en notes `[^N]` au fil des citations ; URLs ⚠️ à confirmer en base arrière). Limites à signaler dans le texte : DeputyDev (auteurs-industrie), Storey/Starr (cadre conceptuel), Shen et Tamkin (vendor, associatif), Gerlich (pas software-specific), Wadinambiarachchi (design ≠ code).*

1. **METR Time Horizon** — Kwa, West et al., *Measuring AI Ability to Complete Long Tasks*, mars 2025. <https://arxiv.org/abs/2503.14499>
2. **METR Time Horizon 1.1** — *Measuring the time horizon*, 29 janvier 2026 (slug ⚠️ à confirmer). <https://metr.org/blog/2026-01-29-measuring-time-horizon/>
3. **METR « Changing Experiment Design »** — *We Are Changing our Developer Productivity Experiment Design*, 24 février 2026. <https://metr.org/blog/2026-02-24-uplift-update/>
4. **Beck, *Tidy First?*** — O'Reilly, 2023 (ISBN 978-1-098-15124-9).
5. **Beck, « 90% of My Skills »** — tweet du 22 avril 2023 + essai. <https://x.com/KentBeck/status/1649817957235843072>
6. **Beck, podcast Pragmatic Engineer** — juin 2025 (relayé par simonwillison.net).
7. **Wadinambiarachchi et al., design fixation** — CHI 2024 (N=60 ; DOI ⚠️ à confirmer). <https://doi.org/10.1145/3613904.3642919>
8. **HAI-CDP** — *Frontiers in Computer Science*, 2025 (URL ⚠️ à retrouver).
9. **Kumar et al., DeputyDev (1mg)** — 2025 : −31,8&nbsp;% de cycle de revue, +28&nbsp;% de volume. <https://arxiv.org/abs/2509.19708>
10. **Storey, *Cognitive debt*** — 15 février 2026 (cadre conceptuel).
11. **Starr et Storey, triple debt** — 23 mars 2026. <https://arxiv.org/abs/2603.22106>
12. **Fowler, *Fragments*** — 2 avril 2026. <https://martinfowler.com/fragments/2026-04-02.html>
13. **Naur, *Programming as Theory Building*** — 1985.
14. **Gerlich, cognitive offloading** — *Societies* (MDPI), 2025 (N=666 ; DOI ⚠️ à confirmer).
15. **Shen et Tamkin, RCT Anthropic** — *How AI Impacts Skill Formation*, 28 janvier 2026 (N=52). <https://arxiv.org/abs/2601.20245>
16. **Feathers, *Working Effectively with Legacy Code*** — 2004 (ISBN 978-0-13-117705-5).
