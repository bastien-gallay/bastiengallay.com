# Axe éditorial — contenu, diffusion, positionnement, gestion, mesure

Le seul axe sans moteur externe : ce fichier EST le moteur. Renforcé après le
run fondateur (qui n'avait ni grille ni évidence machine).

## Périmètre

Contenu publié et drafts, boucle de diffusion (feed, abonnement, LinkedIn,
cross-post), positionnement marché, gestion de contenu (process, hooks
éditoriaux), et la *section* mesure (compteurs, CNIL, déclencheurs) tant que
l'axe mesure n'est pas activé.

## Protocole

1. **Relecture** (contrat d'axe, défaut) — statuts des lots/stories du run
   précédent.
2. **Évidence machine** : `uv run .claude/skills/revue/scripts/evidence_editorial.py`
   — fraîcheur /now, ordre des séries, contrat front-matter, doublons de
   numéros, signatures vs liste figée, TODO dans content/, liens commentés,
   liens publiés → drafts. Chaque alerte du script est un candidat finding ;
   le script ne juge pas, il mesure.
3. **Exploration LLM** (mode complet) : 2–3 sous-agents Explore — contenu
   publié (thèses, structure, uniformité), plans `.personal/` (roadmap, SUIVI,
   pistes — repérer promesses et décisions), implémentation des mécanismes
   éditoriaux (feed, abonnement, nav). Réutiliser les acquis : ne pas
   re-cartographier ce que le run précédent a établi et que git n'a pas bougé.
4. **Recherche web** : seulement si une question *neuve* se pose (nouvel
   outil, nouveau canal, évolution réglementaire). Les débats fermés par le
   run fondateur (llms.txt, Buttondown payant, CNIL 2026) ne se rouvrent que
   sur signal extérieur daté.
5. **Vérification adversariale** : chaque constat éditorial non trivial est
   contesté (« cette promesse est-elle vraiment publique ? cette page
   est-elle vraiment périmée ou volontairement stable ? »).
6. **Notation** : la grille /40 ci-dessous, scores honnêtes (un 4 = excellent ;
   la plupart des sites tiennent entre 20 et 32).

## Grille éditoriale (10 critères, 0–4 chacun)

| # | Critère | Ce qu'on regarde |
| --- | --- | --- |
| 1 | Promesses publiques tenues | Séries annoncées et finies, « à paraître » honorés, mentions datées exactes |
| 2 | Fraîcheur des pages vivantes | /now, dates affichées, encarts « mise à jour » |
| 3 | Contrat front-matter | description, numero, signature_bio, covers — complets et conformes |
| 4 | Navigabilité du corpus | liens internes, fil de lecture, navigation de série, page de dossier |
| 5 | Socle SEO / découvrabilité | canonical, JSON-LD, og complets, 404, sitemap, feed lié |
| 6 | Boucle de diffusion | feed testé, abonnement fonctionnel, cadence LinkedIn, cross-post canonical |
| 7 | Mesure honnête | zéro cookie, auto-évaluation CNIL archivée, compteurs suivis, déclencheurs écrits |
| 8 | Pipeline éditorial | pistes scorées, drafts propres (pas de notes mêlées au texte), seeds rangés |
| 9 | Positionnement | kairos vivant, différenciation tenue, paysage surveillé sans obsession |
| 10 | Discipline d'anti-backlog | idées écartées avec raison datée, décisions figées non rouvertes |

Baseline fondatrice : non notée (la grille est née après). Première notation =
premier run de cet axe via le skill ; elle devient la référence du trend.

## Sorties spécifiques

- Findings = lots/stories (A1, B2…) avec tailles XS–L, comme le run fondateur.
- Le deck suit le plan fondateur (constats → état de l'art si neuf →
  priorisation) mais en *delta* : ce qui a changé depuis la dernière passe
  d'abord, le réaffirmé ensuite, bref.
