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

Les problèmes de méthode ont été surmontés pour fournir de nouveaux chiffres. De -19&nbsp;% de productivité constaté dans le premier article, cette nouvelle expérience distingue -18&nbsp;% pour les développeurs initiaux et -4&nbsp;% pour les nouveaux développeurs de l'expérience. Autres points intéressants&nbsp;: de moins en moins de développeurs acceptent de participer sans IA et on constate une augmentation de projets greenfield participant à l'étude.

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

<p class="vsm-placeholder">À écrire — §3 Pattern A : N+1 (N mesures + 1 pour l'inconnu), les trois faces du harnais (pratiques classiques / leur évolution / nouvelles pratiques), le scaffold jour 1 de lucid-lint. Bijou : « J'écris une fois, ça sert à l'humain et à l'IA. » — supprimer à la rédaction.</p>

{{ stage(id="courage") }}

## Le courage

<p class="vsm-placeholder">À écrire — §4 Pivot : la valeur Courage d'XP réactivée par Beck ; trois actes (suppression du path A vert, Category −3/6 en 24 h, renommage de 81 features) ; contrepoint Severity::Error. Bijou : « Le filet de sécurité… c'est ce qui m'autorise à être courageux. » → bascule « ce que ce courage libère, c'est du jugement ». — supprimer à la rédaction.</p>

{{ stage(id="B") }}

## L'IA, casseur de complaisance

<p class="vsm-placeholder">À écrire — §5 Pattern B : réducteur de charge cognitive ET casseur de complaisance ; durée vs administration (étapes 1, 3) ; feature-torture, death matchs (design fixation, CHI 2024), auto-critique IA croisée ; contre-exemple lucid-lint 18→21→25. Bijou : « casser ma complaisance avant que je la confonde avec de la cohérence. » — supprimer à la rédaction.</p>

{{ stage(id="C") }}

## De la rigueur du cadre à la rigueur de la boucle

<p class="vsm-placeholder">À écrire — §6 Pattern C' : TDD + Reflect (Reflect = ajout auteur, PAS Beck) ; trajectoire SDD marché → maison → abandon ; vocabulaire vs mécanique (Git lucid-lint) ; Reflect macro exécuter-et-inscrire. Bijoux : « le code généré par IA est, pour mon cerveau, du legacy de quelques heures. » + « la rigueur s'est déplacée du cadre figé vers la boucle réflexive. » — supprimer à la rédaction.</p>

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
