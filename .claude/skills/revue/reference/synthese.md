# Synthèse transverse — le document vivant

La synthèse est le seul artefact qui se met à jour ; les revues d'axe sont des
instantanés datés. Elle porte : convergences, file unique, slots
feature-torture, tableau de bord, règle du jeu.

## Protocole `/revue synthese`

1. **Charger l'état** : derniers findings de chaque axe
   (`findings/*-<axe>.json`, le plus récent par axe) + `baselines.py show`.
2. **Convergences machine** :
   `uv run .claude/skills/revue/scripts/convergences.py` — groupes de findings
   multi-axes partageant fichiers ou vocabulaire. Le script propose, le LLM
   valide (une coïncidence de mots n'est pas une convergence).
3. **Règle de priorité de la file unique**, dans l'ordre :
   1. P0 ouverts ;
   2. convergences multi-axes (2 axes < 3 axes) ;
   3. débloquants (un item qui simplifie un autre passe devant — ex. la nav
      de série avant la publication du 3/3) ;
   4. P1, puis fenêtre d'opportunité (avant un événement daté), puis taille
      croissante à valeur égale.
4. **Slots feature-torture** : lire `.personal/feature-torture/` (rapports) ;
   reporter chaque verdict (palette : ship · reshape · park · split · kill ·
   defer) avec sa date dans le §05 du deck ; appliquer les conséquences à la
   file (un kill libère, un reshape redimensionne, un split crée deux lignes).
5. **Vérification adversariale de la synthèse elle-même** : avant d'émettre,
   contester la file (« le rang 1 est-il vraiment débloquant ? une convergence
   a-t-elle disparu parce qu'un axe a corrigé son bout ? »). Une synthèse se
   trompe surtout par inertie : vérifier que les lignes barrées le sont.
6. **Mettre à jour le deck** `synthese-transverse.typ` (sections §02–§07 ;
   la date du pied de page change), recompiler, relire les pages modifiées.
7. **Baselines** : `baselines.py maj --axe synthese --cle derniere_maj …`.

## Protocole `/revue maj` (après un lot ou un verdict)

Version courte de `synthese` : mettre à jour les statuts dans le findings
JSON concerné (`ouvert` → `corrige` avec date), re-trier la file, reporter le
verdict s'il y en a un, recompiler le deck. Pas de re-calcul des convergences
si aucun finding n'a changé d'axe.

## Tableau de bord (§06 du deck)

- Lignes de base par axe (et leurs cibles) — alimentées par `baselines.json`.
- Déclencheurs écrits — la liste fondatrice : analytics (> 500 visites/sem ou
  EN), Buttondown payant (≥ 2 numéros/mois ou ≥ 80 abonnés), taxonomies
  (≥ 8–10 articles), EN (résonance 2/3–3/3), Argos CI (contributeur ou
  refontes fréquentes), webmentions (après EN). Un déclencheur ne se rouvre
  pas — il se déclenche ou il attend.

## Migration fondatrice

Au premier `synthese` via ce skill, dans le dépôt `.personal` :

- **Copier** (pas déplacer) `improvements/2026-06-11-revue-site/charte.typ`
  vers `revues/charte.typ` — les trois decks fondateurs importent
  `charte.typ` colocalisée : la déplacer casserait leur recompilation
  (ce sont des instantanés, ils doivent rester compilables tels quels).
- `git mv` de `…/synthese-transverse.typ` (et son PDF) vers `revues/` —
  lui seul est vivant, il importera la copie de `revues/`.
- Recompiler la synthèse ET un deck fondateur (preuve que rien n'est cassé),
  committer dans `.personal`.

Les deux `charte.typ` divergeront peut-être un jour : celle de `revues/`
fait foi pour les runs futurs ; celle du dossier fondateur est gelée avec
ses decks.
