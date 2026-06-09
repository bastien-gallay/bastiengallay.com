+++
title = "Avec l'IA, je code plus lentement — 3"
date = 2026-06-09
draft = true

[extra]
numero = "01.22"
series = "coder-avec-l-ia"
series_title = "Coder avec l'IA"
series_index = 3
series_total = 3
series_part_subtitle = "quelle stratégie d'équipe ?"
+++

<!--
SEED — citation d'ouverture candidate (routée depuis l'article 2/3, §8 → ici, 2026-06-09).
Jeff Patton, « User Story Mapping » (O'Reilly) : « Shared documents aren't shared understanding »
Pourquoi en ouverture du 3/3 :
- ferme la boucle ouverte en 2/3 §7 (user story « As a <who> I want <what> so that <why> »)
  et rime avec la clôture du 2/3 (« Et la compréhension ne s'accélère pas. ») + le nœud 01 VSM ;
- User Story Mapping traite de la compréhension partagée à l'échelle équipe/orga = cœur du 3/3.
À faire avant publication : sourcer page/chapitre exact ; traduction FR (comme la citation Storey).
-->

<!-- déplacé depuis le premier article de la série -->

Prendre le temps de produire un code maîtrisé par le développeur, c'est long. Mais faisons le calcul rapidement. Étudions le cas de deux entreprises A et B:

L'entreprise A se concentre sur l'accélération par l'IA: les développeurs optimisent la création de code - les 10% - en priorité.
L'entreprise B se concentre sur la qualité avec l'IA: les développeurs  pour créer un logiciel de haute qualité.

Dans le cas A,  les développeurs ont les meilleurs outils pour générer du code rapidement, le documenter, le pousser sur git et livrer en production. Ils décuplent la productivité brute. Ce sera ainsi 9% de gain. Ils optimisent aussi leur temps de réflexion. Mais un code produit vite, c'est un code non maîtrisé. Ils sont vite rattrapés par ce manque de compréhension. Mon estimation: il gagneront encore 10% dans des projets simples et perdront jusqu'à 50% du temps dans les projets complexes <!-- il est certainement possible de sourcer ces chiffre, je crois les avoir vus quelque part. DORA corrobore cela en partie. -->. Résultat en temps de livraison du logiciel: entre -19% et +41% <!-- ça pourrait être bien d'arrondir? -->. Avec plus d'incertitude due au manque de maîtrise. Petit bonus<!--ironie: est-elle assez marquée? -->: tout logiciel tant à se complexifier, et l'IA accélère ce phénomène.

Dans le cas B, les développeurs et les parties prenantes collaborent pour s'assurer que chaque ligne de code produite a du sens, répond au besoin, est testée de manière robuste et tourne sur une prod robuste. Bien sûr, passer moins de temps sur la génération automatique et prendre le temps de relire attentivement réduit les gains. Ils atteignent difficilement un facteur 2. 10% --> 5%. Côté réflexion, par contre, ils s'outillent en permanence et trouvent des manières toujours plus efficaces de passer le relai aux autres métiers et d'automatiser la qualité. Ils gagnent environ 30%, selon moi. Mais c'est net. Bonus: ce gain reste stable avec le temps. Total de l'addition: -35% de temps pour livrer le même logiciel.

<!-- Fin déplacement -->