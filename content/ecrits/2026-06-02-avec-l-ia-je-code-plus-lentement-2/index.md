+++
title = "Avec l'IA, je code plus lentement — 2"
date = 2026-06-02
draft = true
description = "Ce que l'IA m'apporte vraiment : pas de la vitesse, mais des standards de qualité tenus sans payer leur coût habituel."

[extra]
numero = "01.21"
heading_html = "Avec l'IA, je code plus <mark class=\"mark\">lentement</mark> — 2"

# Miniature M4 pour la liste /ecrits : roue TDD + Reflect, « Reflect »
# seul au centre (pas de chiffre — −18 ne se compare pas au −19 du 1/3).
cover_reflect = true
cover_source = "ARTICLE 2/3"
cover_titre_court = "QUALITÉ, PAS VITESSE"

# Hero in-article Mondrian b_v3b (cf. macros/ecrit_hero.html + page lab /lab/image-article-2-3).
hero = "b_v3b"
hero_kicker = "ARTICLE 2/3"
hero_soustitre = "la qualité, pas la vitesse"
hero_l1 = "AVEC L'IA,"
hero_l2 = "JE CODE PLUS"
hero_l3 = "LENTEMENT"

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

Depuis le [premier article de cette série](@/ecrits/2026-05-28-avec-l-ia-je-code-plus-lentement/index.md), un retour m'a poussé à revoir ma copie. [Johan Massin](https://www.linkedin.com/in/bob6664569/) m'a signalé une nouvelle étude METR de février 2026 faisant suite aux −19&nbsp;% de perte de productivité[^metr-prod] avec l'IA. Alors, finalement, est-ce que cette augmentation de productivité attendue a du sens ?

Ce qui rend cette suite intéressante à mes yeux, c'est l'aveu de ses auteurs concernant les difficultés méthodologiques rencontrées. Les conditions changent. Les tâches changent de nature. Les développeurs travaillent sur autre chose pendant que l'agent tourne. Cela me rappelle cette proportion des 10/90[^1090] et la charge cognitive. Cet article METR s'arrête sur un problème nouveau : non seulement on ne mesure pas la bonne chose dans la vitesse de développement, mais on n'est plus capable de la mesurer de la bonne manière.

Les difficultés de méthode, elles, n'ont pas été levées — METR juge même son suivi peu fiable. Et les nouveaux chiffres ne prolongent pas le premier : sur le même axe, la variation du temps quand l'IA est autorisée, le +19&nbsp;% de temps de 2025 — plus lent — devient −18&nbsp;% pour les développeurs initiaux et −4&nbsp;% pour les nouveaux — plus vite[^metr-refonte]. Le signe s'inverse. En cause : de moins en moins de développeurs acceptent de participer sans IA, et les projets greenfield affluent dans le panel.

Dans la discussion sur le Slack Okiwi, suite au rappel de Johan, [Jean-Baptiste Dusseaut](https://www.linkedin.com/in/jbdusseaut/) nous questionne&nbsp;:

> « C'est quoi, la productivité&nbsp;? Quand je déclare fini&nbsp;? Quand c'est en prod&nbsp;? En prod sans défaut&nbsp;? En prod sans défaut et que des gens s'en servent&nbsp;? »

Pour répondre à ces questions, j'ai besoin de vous expliquer comment je travaille désormais avec l'IA.

---

{{ stage(id="full2") }}

## Mon travail, en sept étapes

Ce qui suit est ma manière de travailler avec l'IA dans mes développements personnels, open source pour la plupart. Elle trouve ses origines dans mon expérience d'artisan logiciel, les concepts de product management et mes échanges avec d'autres praticiens.

Influencé par Lean et Agile, j'ai choisi une représentation inspirée de Value Stream Mapping. Elle est marquée par 7 étapes principales regroupées ainsi :

- <strong class="vsm-hot" data-vsm-group="1 2 3">Avant le code <span class="vsm-hot__n">· étapes 01–03</span></strong> : je prends le temps de définir le domaine, d'ajuster le périmètre visé et enfin de concevoir la forme globale. À l'issue de ces 3 étapes, j'ai un cadre précis de ce que je compte coder.
- <strong class="vsm-hot" data-vsm-group="4 5 6">Le code et sa boucle <span class="vsm-hot__n">· étapes 04–06</span></strong> : La responsabilité des 3 étapes suivantes est la mise en production d'un code de qualité. La génération du code est suivie par les vérifications de sa qualité. Ensuite, différentes revues et intégrations prennent le relais. Ces trois étapes sont orchestrées par une boucle de rétroaction continue centrée sur la compréhension humaine et l'adaptation.
- <strong class="vsm-hot" data-vsm-group="7">Après le code <span class="vsm-hot__n">· étape 07</span></strong> : La dernière étape, le suivi de la livraison et sa maintenance, démarrent immédiatement après chaque livraison réussie. Cette étape comprend des activités comme le dogfood, la communication et le suivi statistique.

Cette séquence est adaptable, jamais figée. Elle reste très classique et je la connaissais de manière empirique uniquement. Pour les besoins de l'article, j'ai reconstitué avec l'IA et mes commits sur lucid-lint les patterns et checkpoints les plus évidents, puis comparé avec l'idée abstraite que je m'en faisais. La dernière étape est très généraliste — presque fourre-tout. La raison : je garde lucid-lint comme exemple le plus récent et représentatif, et j'en suis pour l'instant le seul utilisateur quotidien.

Parlons à nouveau des études METR. La courbe METR vit dans l'enchainement d'étapes semblables aux miennes. Le temps que je prends vit entre les boucles que ces étapes jalonnent. C'est le ralentissement volontaire pour les vérifications, celui des transitions entre deux actions finies pour garantir à la deuxième qu'elle reprendra sur des bases saines. Voici comment toutes ces étapes s'articulent.

---

{{ stage(id="A", anchor="harnais") }}

## Le harnais qui libère

Un logiciel personnel est souvent issu d'une expérimentation, ou d'un prototype de recherche. La qualité initiale se contente de quelques tests et documents de réflexion. Avant de coder plus, <span class="mark--soft">je génère les tests manquants, j'installe les linters, je construis la chaîne de livraison initiale</span>. J'ajoute aussi les documents d'intention comme README, CODING_STANDARDS ou LICENSE et CONTRIBUTING pour l'open source. Ce sont les conditions pour implémenter sereinement les règles métier. Une fois ces conditions atteintes, j'ai une hygiène personnelle : le N+1. Lorsque je sécurise la qualité connue avec N garde-fous, j'en ajoute un pour ce qui est inconnu. Cela peut être du shift-left depuis la CI vers une règle pre-commit, du mutation testing, l'analyse statique ou une génération de documentation. Je choisis en fonction de la nature du projet ce qui me semble moins maitrisable.

Ensuite, tout cela doit grandir avec les principes de développement classiques : test first, DDD, CUPID, etc. Ces principes sont issus du Lean, des méthodes agiles — en particulier eXtreme Programming — et du craft. Tidy First de Kent Beck[^beck-tidy] m'inspire à chaque itération de code : la base saine du début doit le rester. Pour la faire évoluer, il faut la challenger avant chaque nouvelle fonctionnalité.

Certains principes ont en revanche changé avec l'IA. Parfois, parce que ses capacités permettent de plus vite construire une qualité que j'aurais trouvée hors de portée ou overkill dans le passé. CodeQL et OpenSSF permettent des standards de qualité simples. Mais atteindre le minimum requis pour qu'ils ne lèvent pas d'alerte est long et rébarbatif. Avec une assistance IA, cela devient aisé. J'ai même trouvé cela ludique, sur lucid-lint, de chercher à atteindre ce badge BestPractices. Et le N+1 m'a mené à me poser la question de la revue par un autre contributeur. Je ne l'avais pas.

Je suis seul contributeur sur plusieurs projets open source, et un autre point de vue me semble important. J'utilise Claude Code au quotidien. J'ai automatisé la revue avec Gemini Code Assist. Là où mon assistant habituel et moi laissions régulièrement passer des imperfections, ce nouvel outil dans la chaîne pouvait les repérer.

Lorsque je demande à l'IA de rendre visuel un aspect complexe de l'architecture ou du parcours utilisateur, je fais attention à critiquer et modifier pour mieux m'impliquer. Aussi, j'ai découvert qu'il était plus efficace de générer un script pour représenter un graphique à partir des données brutes, par exemple, que de générer le graphique directement. Le résultat de ces pratiques, ce sont des documents utiles pour moi et des inputs fiables dans mon contexte Claude Code. J'écris pour l'humain. J'écris pour l'IA. <span class="mark--soft">Je n'écris qu'une fois.</span>

Ce n'est pas parfait, mais ça me convient. Je me rappelle de mon premier commit sur `lucid-lint`, lorsque j'avais appliqué ce harnais en même temps que j'expérimentais la faisabilité sur quelques règles. La CI m'a crié dessus. Très fort. "It works on my machine" est aussi vrai pour la qualité. J'ai dû dédier 5 commits à corriger GitHub Actions, puis encore une vingtaine pour réaligner mes tests.

---

{{ stage(id="courage") }}

## Catalyser le courage

Sans l'IA, j'aurais pu être découragé par un tel travail et simplement arrêter le projet. Au contraire, j'ai eu en tête l'image de Senku, de Dr Stone, s'exclamant *« Voilà qui est follement excitant !! »* J'ai retroussé mes manches et celles de Claude Code, et ensemble, en deux heures, nous avons ajusté la base de code. Le courage de refuser le compromis. Un rêve que je n'atteignais que rarement auparavant. Ou alors en quelques jours plutôt qu'en quelques heures.

Beaucoup penseraient que je parle d'accélération immédiate. Et c'est le cas. La différence c'est que cette accélération locale sert à oser booster la pérennité. Cela me rappelle le tweet de Kent Beck&nbsp;:

> « 90 % de mes compétences viennent de perdre leur valeur, le levier sur les 10 % restants vient d'être multiplié par 1000. »[^beck-90]

Supprimer, réviser et refactorer sont des actes fondamentaux de ces 10&nbsp;%.

Je reviens à mon fil rouge `lucid-lint`. Alors qu'il fonctionnait et donnait des résultats, j'ai pris quelques décisions folles. Au bout d'une journée d'existence de l'outil en production, j'ai jeté et refondu des fondamentaux : quatre catégories mortes en 24 h. Plus tard, pour mieux m'y retrouver, j'ai renommé 81 features de la roadmap et créé un système de gestion pour celles-ci. Plus clivant encore : au lieu de gagner 5,6 % de perf sur les textes anglais longs, j'ai réécrit le parseur Markdown pour équilibrer un gain moindre, mais pour tous les textes. Et ce, alors que tous les tests, golden snapshots et property tests, étaient verts.

Le point commun ? Le filet de sécurité n'est pas un gage de qualité. C'est ce qui m'autorise à être courageux. Et ce que ce courage libère, ce n'est pas du temps — <span class="mark">c'est du jugement.</span>

---

{{ stage(id="B", anchor="complaisance") }}

## L'IA, casseur de complaisance

Ce jugement, je le garde pour moi. Et pour l'enrichir, je le nourris des analyses de l'IA, d'un côté, et de ses critiques, de l'autre. Pour le premier enrichissement, j'ai pour seul objectif de réduire le poids administratif de collecte et de synthèse. Le temps gagné est ainsi réinvesti dans la qualification des options avant un choix, par exemple pour un death match entre 2 expérimentations prêtes à devenir de vrais projets.

Pour l'enrichissement critique, c'est le plus cruel pour moi. Je demande explicitement à l'IA d'être dure avec ce que nous produisons. J'ai même un skill, `/feature-torture`, dédié à faire un stress test d'une évolution prévue dans la roadmap. Une sorte de Dewey, de la série Malcolm&nbsp;: *« Toi tu vis. Toi tu vis. Toi tu crèves ! »* Et aussi toi tu changes, toi tu te scindes. Une sortie riche de ce skill me permet de garder la tête froide et de prendre la décision finale. L'IA n'a pas d'égo, pas d'attachement émotionnel. J'utilise ces qualités pour mieux juger.

Je suis encore plus dur avec moi-même sur la rédaction de mes articles. Celui-ci ne fait pas exception. Claude Code revoit chaque mot, phrase, paragraphe et relit la cohérence globale. Je ne le laisse pas me dire que c'est bien si c'est juste passable. C'est dur. C'est exténuant. Et le pire&nbsp;? Là où je croyais m'améliorer, les statistiques me montrent que je régresse sur l'utilisation abusive des hedge ("parfois", "souvent", "plutôt", "peut-être"), alors que les conventions que J'AI choisies les proscrivent. Chaque paragraphe est repassé à la moulinette environ 4 fois — oui, nous avons compté — avant qu'il soit bon.

Est-ce abusif de compter tout cela&nbsp;? Pas si je veux être tranquille. Je ne veux pas laisser passer des phrases qui seraient mal comprises. Tout comme je m'interdis de laisser un bug ou une mauvaise conception s'échapper dans la nature. Pour éviter leur accumulation, je demande à l'IA de <span class="mark--soft">casser ma complaisance avant que je la confonde avec de la cohérence</span>.

Il arrive, malgré tout, qu'une simple règle de lisibilité dans `lucid-lint` passe la torture, les revues locales et les tests, puis au premier essai en conditions réelles : le linter explose en vol ! Il s'agissait d'une règle, expérimentale, repérant les nombres sans ancrage proche — sans unité, par exemple. Mais lâchée dans le monde réel, elle délimitait mal les nombres, confondait les numéros de version avec de grandes valeurs numériques et finissait par crasher l'exécution. Bilan : quelques heures et trois commits.

---

{{ stage(id="C", anchor="rigueur") }}

## De la rigueur du cadre à la rigueur de la boucle

Cela veut-il dire que les tests étaient superflus ? Non, mille fois non. Ou plutôt 841 fois non — le nombre de tests unitaires sur `lucid-lint`. Et la rigueur est là, elle aussi, dans leur diversité — certains tests s'assurent que la documentation reste cohérente entre les deux langues — et dans le contrôle des tests eux-mêmes — mutation testing et relectures humaines + IA pour s'assurer de leur pertinence. Est-ce que je fais toujours du TDD avec l'IA ?

Un petit saut dans le temps. Dans mes premières utilisations de GitHub Copilot, j'avais tenté de lui faire faire du TDD. Deux constatations décevantes&nbsp;:

1. Les tests passaient souvent en test after malgré les directives
2. En test first, Copilot générait une cohorte de tests avant de commencer à implémenter

{{ stage(id="rigueur-rgb") }}

Le premier se corrigeait avec le temps. Le deuxième a demandé une astuce qui s'est révélée fondamentale&nbsp;: ajouter une étape à TDD. Red → Green → Refactor → **Reflect**.

Cette 4e étape demande à l'IA de revoir l'exécution précédente des trois premières étapes, d'en tirer des apprentissages, et de changer le plan pour la suite quand nécessaire. Honnêtement ? Peu de changements de plan. Livrés à eux-mêmes en test first, les assistants génèrent une cohorte de tests d'un bloc, en amont. Reflect casse ce réflexe — le Red redevient respecté. Les tests inutiles ou en doublon sont à nouveau tués dans l'œuf. Et un bonus&nbsp;: une verbosité maîtrisée qui me donne des informations utiles en relecture de code.

{{ diagram(body="h2-tdd-reflect.html", label="Le cycle TDD agentique sans puis avec l'étape Reflect : à gauche la cohorte de tests court-circuite le Red, à droite Reflect occupe le coin vide et referme la boucle.") }}

Dans mes explorations, j'ai travaillé en *Spec Driven Development* (SDD) avec l'IA. Avec des frameworks — SpecKit[^speckit], OpenSpec[^openspec] et BMAD. Même si les implémentations sont bonnes, je les trouvais lourdes et inflexibles. J'ai tenté une implémentation maison de micro framework SDD, dans le but de reprendre la main grâce à des micro-étapes plus granulaires. Le problème était similaire, le cadre restait figé par l'enchainement des étapes. Dans certains cas, comme des mises à jour de doc ou des améliorations esthétiques simples, il était inutile. Dans d'autres cas, comme pour les refactos évoqués plus tôt, trop léger. Mais une perle s'est glissée dans mon cadre&nbsp;: une étape **Reflect** entre deux boucles de feature. C'est cette étape qui m'a mené à abandonner le SDD au sens strict pour un cadre plus fluide et rigoureux à la fois.

{{ stage(id="rigueur-macro", anchor="boucle-macro") }}

Une idée, venue au visionnage d'un tuto BMAD[^bmad], m'a mise sur cette piste : transférer la connaissance accumulée d'une session vers des documents de contexte, et redémarrer une session pour assurer ce transfert efficace. Les étapes 4-5-6 prennent ainsi la forme d'un double diamant compact : d'abord un *brainstorm adversarial* — l'IA est très dure avec mes idées, je suis très dur avec ses propositions — puis *session neuve* et enfin génération de *code+explication*. Ces deux diamants interviennent au sein de chaque bloc pour une implémentation substantielle, ou au travers des trois étapes quand cela est plus trivial.

{{ diagram(body="h3-double-diamant.html", label="Les étapes 4-5-6 prises comme un double diamant : on diverge puis on converge, deux fois, de part et d'autre d'une session neuve.", caption="On diverge, on converge, deux fois — autour d'une session neuve qui repart d'un contexte transféré.") }}

Ce Reflect macro, il apparait une fois par boucle code → harnais → revue → *Reflect*. Entre les cycles, l'IA génère un fichier de tests manuels à destination de l'humain. Je l'utilise comme une démo plus qu'une vérification. Il y a rarement des erreurs, mais souvent des remarques. Cette étape rétablit la conception émergente qui est atténuée en TDD agentique.

Les idées de nouvelles features, des décisions de refacto et des ajustements pour l'expérience utilisateur sont issus de cette phase. Cela m'évite aussi de revenir du déjeuner incapable de dire à quoi sert le commit de 11 h, ni pourquoi sa conception est déjà à revoir. Je trouve cela important d'étudier et comprendre ce qui est produit, car <span class="mark--soft">le code généré par IA est, pour mon cerveau, du legacy de quelques heures.</span>[^feathers]

La rigueur ne s'est pas effacée. <span class="mark--soft">Elle s'est déplacée du cadre figé vers la boucle réflexive.</span> Le rythme de mon travail alterne entre des phases de création, où l'IA dégrossit avec une influence humaine, et des phases de revues, où l'humain reprend la main activement sur les bases de l'agent IA.

---

{{ stage(id="vigilance", anchor="vigilance") }}

## Note de vigilance

Avec l'évolution des modèles et des agents de code, associés à des bonnes pratiques, la dette technique peut être maîtrisée. Sur le long terme, quand la complexité augmente, deux autres dettes interviennent : la dette cognitive et la dette d'intention. Cette triple dette, c'est le cercle vicieux où chacune nourrit l'autre.

Par exemple, la semaine dernière, je modifiais une dizaine de repos d'un même système. Dès le troisième, je me rends compte que je n'ai ni relu, ni testé manuellement. J'avais pourtant appliqué ma méthode. C'est ce que Margaret-Anne Storey nomme la dette cognitive[^storey-cog] :

> « la dette cognitive reste invisible jusqu'à ce qu'il soit trop tard : l'équipe croit comprendre le système mieux qu'elle ne le comprend vraiment » — Storey, février 2026.

Storey a nommé ce qui me hantait sans que je le sache. Dans mon cas, je l'ai repérée à temps. Mais c'est un rappel : le danger est de passer trop vite sans regarder ce qui est généré. Sans contribution active de ma part, ma compréhension du logiciel devient illusoire. Pour réduire ce risque de perte de compréhension, je me concentre sur le "comment".

Fin 2025, je développais un jeu vidéo en dilettante. Je perfectionnais le système des dialogues à n'en plus finir. Ce faisant je me sentais de plus en plus perdu. Lors d'une revue, le problème m'a sauté aux yeux : j'avais perdu de vue le "Pourquoi". Pourquoi ce système de dialogue et pourquoi développer ce jeu. Parce que je voulais raconter et expérimenter. C'est la troisième dette, appelée par Storey "dette d'intention"[^storey-intent].

L'apprentissage était fort : prendre le temps de se redemander "pourquoi" dans un troisième niveau de Reflect. Les trois niveaux de Reflect — quoi, comment et pourquoi — rappellent[^triple-loop] la définition des User stories :

<pre class="gherkin">As a    <span class="lt-mute">&lt;who&gt;</span>
I want  <span class="lt-info lt-strong">&lt;what&gt;</span>
so that <span class="lt-problem lt-strong">&lt;why&gt;</span></pre>

Le <code class="lt-warning">&lt;how&gt;</code> se retrouve dans le Acceptance Criteria. Sur des projets personnels, seul, avec un rythme irrégulier, je perds souvent le fil et omets l'un de ces niveaux.

{{ diagram(body="reflect-loops.html", label="Les trois niveaux de Reflect en boucles concentriques", caption="Trois anneaux emboîtés, une relecture chacun. Plus la boucle est externe, plus elle est rare — et plus son oubli coûte cher.") }}

Le piège à éviter est de ne pas participer activement aux prises de notes et modélisations. C'est ce que Michael Gerlich a étudié[^gerlich], sur 666 personnes via des questionnaires et des entretiens. Il conclut à une corrélation négative forte entre l'usage fréquent d'outils IA et la capacité de pensée critique. Les plus jeunes, plus dépendants de l'IA, sont plus touchés tandis que le niveau d'éducation est corrélé à de meilleurs résultats. Mais le plus important : la décharge cognitive (*Cognitive offloading*, délégation à l'IA) est en cause. Ce que j'en tire, c'est que déléguer la recherche et la synthèse de connaissance peut aider, tandis que déléguer le raisonnement réduit la pensée critique.

Cette étude montre le piège dans lequel je retombe souvent — par fatigue, paresse ou impatience : dépasser le seuil de la décharge cognitive vers une décharge de raisonnement. C'est-à-dire passer de l'aide vertueuse de l'IA pour mieux raisonner et se rappeler, au remplacement par l'IA qui effrite le sens critique. Le sens critique est justement ce qui déclenche les Reflect et les nourrit.

---

{{ stage(id="cliff", anchor="domaine") }}

## Vers l'article 3

Tous les patterns dont je parle s'arrêtent à la frontière du clavier. Ce sont les miens. S'ils peuvent inspirer, je n'ai aucune garantie qu'ils soient généralisables.

Les artefacts qui me servent sont déjà transmis à d'autres. Des collègues, des clients pour lesquels je travaille et mon futur moi. De ce fait, c'est une transmission d'humain à humain. <span class="mark--soft">Et la compréhension ne s'accélère pas.</span> L'IA, quant à elle, joue un rôle de médiateur et d'archiviste.

Je reste sur la même idée. Je n'ai pas accéléré ma création de code. En revanche, je suis conscient d'avoir produit plus. D'avoir terminé plus de projets. Des projets plus aboutis. <span class="mark--soft">Mon accélération n'est pas dans l'immédiateté de génération du code, mais dans la qualité que je suis capable d'atteindre désormais.</span>

J'utilise un processus similaire pour l'écriture et pour le code. Et cet article m'a fait réfléchir à ma propre méthode, par des recherches, par l'effort de synthèse et par une introspection plus profonde que d'habitude. Comme un Reflect au-delà de mes 3 premières boucles, la boucle narrative. Celle de l'introspection personnelle.

Le niveau supérieur que je souhaite partager, il est en lien avec mon quotidien professionnel. Je l'observe et le vis dans des projets en équipe, des projets d'entreprise. C'est le Reflect collectif au niveau de l'organisation. Ce sera l'objet du troisième et dernier article de cette série.

---

## Notes et références

[^1090]: Voir [le premier article de la série](@/ecrits/2026-05-28-avec-l-ia-je-code-plus-lentement/index.md). Avant l'IA, j'écrivais le code dans environ 10&nbsp;% de mon temps&nbsp;; les 90&nbsp;% restants allaient à le concevoir, le relire, l'organiser, le documenter et le maintenir. Ne me rappelant plus d'où me venaient les chiffres que je prenais pour acquis, j'ai recherché. Voici ce que j'ai trouvé&nbsp;: Abelson et Sussman posent le principe dès 1985 (« *Programs must be written for people to read, and only incidentally for machines to execute* », *SICP*), Peter Hallam le chiffre (2 à 5&nbsp;% d'écriture pure ; *What Do Programmers Really Do Anyway?*, 2006), et Robert C. Martin le fixe en formule mémorable — « lecture/écriture bien au-delà de 10:1 » (*Clean Code*, 2008).
[^metr-prod]: METR — *Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity*, juillet 2025 (16 développeurs, 246 tâches ; +19&nbsp;% de temps, soit −19&nbsp;% de productivité). <https://arxiv.org/abs/2507.09089>
[^metr-refonte]: METR — *We Are Changing our Developer Productivity Experiment Design*, 24 février 2026. Sur l'axe « Change in time when AI allowed » (négatif = plus rapide), l'estimation revue donne −18&nbsp;% de temps (≈ 18&nbsp;% plus vite) pour les développeurs initiaux (IC −38&nbsp;% à +9&nbsp;%) et −4&nbsp;% pour les nouveaux (IC −15&nbsp;% à +9&nbsp;%) — un quasi-renversement du +19&nbsp;% de temps (plus lent) mesuré en 2025, que METR juge peu fiable du fait d'effets de sélection (de plus en plus de développeurs refusant de travailler sans IA). <https://metr.org/blog/2026-02-24-uplift-update/>
[^beck-tidy]: Kent Beck — *Tidy First?*, O'Reilly, 2023 (ISBN 978-1-098-15124-9).
[^beck-90]: Kent Beck — « The value of 90% of my skills just dropped to \$0. The leverage for the remaining 10% went up 1000x », tweet du 18 avril 2023 <https://x.com/KentBeck/status/1648413998025707520> ; développé dans l'essai *90% of my skills are now worth \$0* (tidyfirst.substack.com).
[^speckit]: GitHub — *Spec Kit*. <https://github.com/github/spec-kit>
[^openspec]: *OpenSpec*. <https://github.com/Fission-AI/OpenSpec>
[^bmad]: *BMAD-METHOD* (bmad-code-org), tutoriel *Getting Started*&nbsp;: « *Always start a fresh chat for each workflow.* » <https://github.com/bmad-code-org/BMAD-METHOD/blob/main/docs/tutorials/getting-started.md>
[^feathers]: Michael Feathers — *Working Effectively with Legacy Code*, 2004 (ISBN 978-0-13-117705-5).
[^storey-cog]: Margaret-Anne Storey — *How Generative and Agentic AI Shift Concern from Technical Debt to Cognitive Debt*, 9 février 2026 (cadre conceptuel). <https://margaretstorey.com/blog/2026/02/09/cognitive-debt/> — Martin Fowler reprend et discute ce cadre dans *Fragments* (2 avril 2026, <https://martinfowler.com/fragments/2026-04-02.html>).
[^storey-intent]: Margaret-Anne Storey — *From Technical Debt to Cognitive and Intent Debt: Rethinking Software Health in the Age of AI*, mars 2026. <https://arxiv.org/abs/2603.22106>
[^triple-loop]: Encore une recherche qui m'a donné quelques surprises. Le *triple-loop learning* est souvent attribué à tort à Argyris et Schön. En réalité, ils n'en décrivent que deux (simple et double boucle)&nbsp;; l'ancêtre du troisième niveau est le « Learning III » de Bateson (*Steps to an Ecology of Mind*, 1972), et Tosey, Visser et Saunders (*Management Learning*, 2012, DOI 10.1177/1350507611426239) montrent que cette généalogie est en partie reconstruite a posteriori.
[^gerlich]: Michael Gerlich — *AI Tools in Society: Impacts on Cognitive Offloading and the Future of Critical Thinking*, *Societies* 15(1):6, 2025 (N=666 ; étude non spécifique au logiciel). DOI&nbsp;: 10.3390/soc15010006.
