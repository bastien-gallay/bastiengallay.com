# Relecture des passes précédentes — défaut de tout run d'axe

Avant de chercher du neuf, solder l'ancien. C'est ce qui rend la revue
incrémentale : un run ne repart jamais de zéro sans raison.

## Protocole

1. `uv run .claude/skills/revue/scripts/relecture.py --axe <axe>` — pour
   chaque finding `ouvert` du dernier run : ses fichiers ont-ils bougé depuis
   (git log), ont-ils disparu ? Triage en trois paquets :
   - **`a_reverifier`** : fichiers modifiés depuis le run → le LLM rejuge
     (corrigé ? toujours là ? muté ?) en relisant le code actuel, pas le
     souvenir.
   - **`inchange`** : zone intacte → le finding reste `ouvert` tel quel,
     zéro re-jugement (c'est l'économie principale).
   - **`fichier_disparu`** : candidat `perime` — vérifier que la disparition
     règle le fond (un fichier renommé déplace le finding, il ne le clôt pas).
2. **Mise à jour des statuts** dans un NOUVEAU findings JSON daté (l'ancien
   devient immuable) : `corrige` (avec commit si identifiable), `perime`,
   `refute-aposteriori` (le run précédent s'était trompé — le dire), ou
   maintien `ouvert`. **Règle de report** : le nouveau JSON reprend TOUS les
   findings du précédent, y compris `corrige`/`exempte`/`reporte` (ids
   stables) — un finding ne disparaît jamais silencieusement. Les `exempte`
   sont reportés tels quels, jamais rejugés sans demande utilisateur.
   Les findings « hors dépôt » (`fichiers: []`, triés `hors_depot` par le
   script) sont re-jugés par le LLM à chaque run : git ne peut rien en dire.
3. **Chasse au neuf ciblée** : `git log --name-only --since=<date du dernier
   run>` donne les zones à examiner en priorité. En `--rapide`, c'est la
   seule chasse au neuf.
4. **Réfutés du run précédent** : transmis au vérificateur du nouveau run
   (liste anti-réouverture). Un réfuté ne se rejuge que si le code concerné a
   changé.

## `--fraiche` — l'échappatoire, pas un raccourci

Sauter la relecture est légitime dans UN cas : la passe précédente était
fondée sur des erreurs ou un mauvais contenu (mauvais build, mauvais
checkout, contexte faux, outil cassé). Alors :

- Exiger la raison, la consigner : `"fraiche_raison": "…"` dans le JSON.
- L'ancien fichier reste sur disque, **intouché** ; c'est dans le NOUVEAU
  JSON que ses findings `ouvert` sont reportés en `refute-aposteriori`
  en bloc, avec la même raison.
- Le nouveau run repart sans liste anti-réouverture (elle était suspecte
  aussi).

Jamais `--fraiche` pour gagner du temps : c'est `--rapide` qui sert à ça.
