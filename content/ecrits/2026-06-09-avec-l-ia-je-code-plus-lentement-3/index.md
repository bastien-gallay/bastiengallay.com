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

NOTE figure (brainstorm Lot B, 2026-06-09) : la figure « User Story » (I2,
gabarit As a <who> / I want <what> / so that <why>) est codée pour le 2/3 §7
(`figures/i2-user-story.html`). Candidate à reprise ICI (3/3) avec le seed Patton
ci-dessus — DÉCISION NON PRISE, à trancher au brainstorm du 3/3.
-->

<!--
SQUELETTE §1 — opposition A vs B, QUALITATIVE (à finaliser en /redaction).
Nettoyage 2026-07-01 : tous les chiffres du « calcul » précédent (9 %, −50 %,
−19 %/+41 %, facteur 2, +30 %, −35 %) ont été RETIRÉS — aucune source (absents des
notes et de l'article 1 publié), et le dispositif chiffré tombait sous l'anti-pattern
A12 (« faux concret générique »). Décision : garder l'opposition en qualitatif, courte,
assumée comme modèle explicite (pas un faux témoignage). La preuve chiffrée est déportée
sur des sources (METR, DORA « amplifier », Spinellis). Cf. SUIVI §4.1.
-->

Prendre le temps de produire un code que le développeur maîtrise, c'est long. Posons deux façons de faire, deux entreprises A et B.

L'entreprise A mise sur l'accélération par l'IA : les développeurs optimisent en priorité la création de code. L'entreprise B mise sur la qualité avec l'IA : les développeurs collaborent pour produire un logiciel qu'ils maîtrisent.

Dans le cas A, les développeurs ont les meilleurs outils pour générer du code rapidement, le documenter, le pousser sur git et livrer en production. Ils optimisent aussi leur temps de réflexion. Mais un code produit vite est un code non maîtrisé : ils sont vite rattrapés par ce manque de compréhension, avec d'autant plus d'incertitude. Et tout logiciel tend à se complexifier — l'IA accélère ce phénomène.

Dans le cas B, les développeurs et les parties prenantes collaborent pour s'assurer que chaque ligne de code a du sens, répond au besoin, est testée de manière robuste et tourne sur une prod robuste. Bien sûr, passer moins de temps sur la génération automatique et relire attentivement réduit le gain brut. Mais côté réflexion, ils s'outillent en permanence, trouvent des manières toujours plus efficaces de passer le relai aux autres métiers et d'automatiser la qualité. Leur gain est plus modeste, mais net — et il reste stable avec le temps.
