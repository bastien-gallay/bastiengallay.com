# Axe technique — code-review cadré dépôt

## Protocole

1. **Relecture** (contrat d'axe) — `relecture.py --axe tech` : statuts F1–F15
   du run précédent ; ne re-vérifier que ce que git a touché.
2. **Moteur** : invoquer le skill **`/code-review`** (outil Skill).
   - Arbre sale ou branche divergente → laisser le moteur sur son diff.
   - Arbre propre sur main → cadrer « audit du dépôt entier » : templates
     Tera, `sass/`, `static/*.js`, `scripts/`, hooks pre-commit, `justfile`,
     `.github/workflows/`, `zola.toml`.
   - Effort : `high` par défaut, `xhigh` si l'utilisateur veut l'exhaustivité
     (budget : 9 finders + 1 vérification par candidat + sweep).
   - **En `--rapide` : ne PAS invoquer le moteur** (incompatible avec le
     budget « zéro ou un sous-agent »). Le run rapide = relecture + triage
     git seulement ; au mieux, un seul vérificateur sur les `a_reverifier`.
3. **Adaptation des angles au dépôt entier** (quand pas de diff) : scan
   ligne à ligne templates et JS ; auditeur d'invariants des garde-fous
   (hooks, CI, zola check) ; traceur de contrats croisés templates↔JS↔Sass↔
   front-matter ; pièges Tera/Sass/Actions (dont la règle double-gating
   dark de CLAUDE.md) ; chaîne build/déploiement ; réutilisation ;
   simplification ; efficience ; altitude.
4. **Réfutés** : consignés dans le JSON (`refutes[]`). La liste fondatrice
   (RFC 4287, observers statiques, hero keyframes, dark print documenté…)
   est dans `findings/2026-06-12-tech.json` — la fournir au vérificateur pour
   éviter les re-procès.
5. **Sorties** : findings ids `F*` (stables), lots `T*`, `baselines.py maj`.

## Cibles (baseline fondatrice du 2026-06-12)

15 findings, 0 P0 → cible après T1–T3 : ≤ 8 findings résiduels, tous P3.

## Notes de cadrage

- Les findings « le code devrait être généralisé » (altitude) ne deviennent
  prioritaires qu'au moment du prochain ajout concerné — les dater, pas les
  pousser.
- Pas de sujet sécurité théâtral : site statique, surface minime. Les vrais
  sujets sont supply chain CI (pinning) et fuite de drafts.
