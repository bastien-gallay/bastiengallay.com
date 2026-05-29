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

# Active le rail Value Stream Map (cf. macros/vsm.html + static/vsm.js).
# Les sections portent leur ancre via le shortcode {{/* stage(id="…") */}}.
vsm = true
+++

{{ stage(id="full") }}

Depuis le premier article de cette série, un retour m'a poussé à revoir ma copie. Johan Massin m'a signalé une nouvelle étude METR de février 2026 faisant suite aux -19&nbsp;% de perte de productivité avec l'IA. Alors, finalement, est-ce que cette augmentation de productivité attendue a du sens ?

Ce qui rend cette suite intéressante à mes yeux, c'est l'aveu de ses auteurs concernant les difficultés méthodologiques rencontrées. Les conditions changent. Les tâches changent de nature. Les développeurs travaillent sur autre chose pendant que l'agent tourne. Cela me rappelle cette proportion des 10/90[^1090] et la charge cognitive. Cet article METR s'arrête sur un problème nouveau : non seulement on ne mesure pas la bonne chose dans la vitesse de développement, mais on n'est plus capable de la mesurer de la bonne manière.

Les problèmes de méthode ont été surmontés pour fournir de nouveaux chiffres. De -19&nbsp;% de productivité constaté dans le premier article, cette nouvelle expérience distingue -18&nbsp;% pour les développeurs initiaux et -4&nbsp;% pour les nouveaux développeurs de l'expérience. Autres points intéressants&nbsp;: de moins en moins de développeurs acceptent de participer sans IA et on constate une augmentation de projets greenfield participant à l'étude.

Dans la discussion sur le Slack Okiwi, suite au rappel de Johan, Jean-Baptiste Dusseaut nous questionne : « C'est quoi la productivité ? Quand je déclare fini ? Quand c'est en prod ? En prod sans défaut ? En prod sans défaut et que des gens s'en servent ? »

Pour répondre à ces questions, j'ai besoin de vous expliquer comment je travaille désormais avec l'IA.

[^1090]: Voir le premier article de la série. Avant l'IA, j'écrivais le code dans environ 10&nbsp;% de mon temps&nbsp;; les 90&nbsp;% restants allaient à le concevoir, le relire, l'organiser, le documenter et le maintenir. <!-- brouillon Claude — à ajuster à ta voix -->

<!--
=== NOTE ÉDITORIALE (Claude) — §1 : reste hygiène finale ===
(Notes d'édition. §1 considérée bouclée sur le fond.)
  • Confirmer en BASE ARRIÈRE les chiffres METR (−18 initiaux / −4 nouveaux) avant publication.
  • IC à mettre en note [^N] : −18 (−38 à +9) ; −4 (−15 à +9). Sans IC, −4 = « moins négatif », pas « meilleur ».
  • Cohérence typo % et signe moins (- vs −) sur tout l'article, à aligner sur 1/3.
  • Vérifier le rendu de la note [^1090] (brouillon Claude à valider) sous zola serve --drafts.
=== fin note éditoriale ===
-->

<!-- Déplacé depuis article 1 de la série — matériau logos à replacer (§2 ou plus loin) -->

 Une 3e condition permet de passer d'une simple accélération à une vitesse continue: profiter du temps gagné initialement pour améliorer la qualité.

<!-- Fin déplacé -->

<!--
Idée à reprendre: Frederick Brooks - The Mythical Man-Month
il fait référence à un menu d'un restaurant français (en VO) et explique le parallèle avec le génie logiciel. J'ai encore l'image en tête et j'envisageais de l'y mettre. Mais les 2 autres arguments sont très justes.
A reprendre tel quel ou à adapter (image restaurant)
 -->