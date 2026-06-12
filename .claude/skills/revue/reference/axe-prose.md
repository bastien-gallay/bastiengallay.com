# Axe prose — le site passe-t-il son propre linter ?

Dogfood : lucid-lint (le projet vitrine du site) appliqué aux écrits publiés.
Axe unique — personne d'autre ne peut faire cette revue-là — et argument de
positionnement : « l'honnêteté artisanale » se prouve en se mesurant soi-même.

## Protocole

1. **Relecture** (contrat d'axe) — scores précédents par article.
2. **Évidence machine** : `uv run .claude/skills/revue/scripts/evidence_prose.py`
   — exécute `lucid-lint` sur chaque `content/ecrits/*/index.md` publié
   (drafts exclus par défaut ; `--drafts` pour les inclure en pré-publication).
   Le script capture sortie brute + code retour par article ; il n'interprète pas.
3. **Si le binaire est absent** : l'axe est **dégradé, pas simulé**. Le dire
   tel quel (« axe prose non mesurable : lucid-lint introuvable dans le PATH »),
   proposer l'installation (le dépôt sibling), ne JAMAIS inventer un score.
4. **Interprétation LLM** :
   - Scores par article, pires règles déclenchées, tendance vs run précédent.
   - **Tribunal des faux positifs** : un linter de prose se trompe ; chaque
     règle déclenchée en masse est jugée éditorialement (la règle a-t-elle
     raison contre le texte, ou le texte contre la règle ?). Les deux verdicts
     sont intéressants : l'un donne un finding d'écriture, l'autre un finding
     *pour lucid-lint lui-même* (à reporter au dépôt sibling, pas ici).
   - Charge cognitive de lecture : longueur, densité de figures, temps estimé
     — recouper avec la question fondatrice (« 4 196 mots, 21 min, carte à
     7 nœuds en marge »).
5. **Sorties** : findings ids `P*` ; scores dans `baselines.py maj --axe prose`.

## Cadrage

- L'axe juge *les textes publiés*, pas le style de l'auteur — pas de
  réécriture proposée (c'est le travail de `/redaction`, en session dédiée).
- Un article qui choisit d'enfreindre une règle en connaissance de cause est
  un `exempte`, pas un `ouvert` perpétuel.
