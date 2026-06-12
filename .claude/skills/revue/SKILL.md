---
name: revue
description: >
  Mise à jour totale ou partielle de la revue multi-axes du site (éditorial,
  visuel, tech, prose — plus perf en demi-axe et mesure/pilotage prototypé
  inactif), avec synthèse transverse vivante, vérification adversariale,
  reprise incrémentale et relecture des passes précédentes. Trigger : l'utilisateur
  tape `/revue`, demande à « rejouer la revue », « mettre à jour la synthèse »,
  « relancer l'axe visuel/tech/éditorial/prose », ou « où en est la revue ? ».
---

# /revue — revue multi-axes du site, incrémentale et adversariale

Orchestrateur. Ce skill ne ré-implémente pas les moteurs d'axe : il **compose**
`/impeccable critique` (visuel) et `/code-review` (tech), fournit ses propres
protocoles pour l'éditorial et la prose, et porte ce qui n'existe nulle part
ailleurs : l'état persistant, la relecture des passes, la synthèse transverse.

## Invariants (non négociables)

1. **Lecture seule sur le site.** Une revue ne modifie jamais `content/`,
   `templates/`, `sass/`, `static/`. Les artefacts vont dans `.personal/revues/`.
2. **Instantanés vs vivant.** Chaque passe d'axe est un instantané daté qu'on
   ne réédite pas. Seule la synthèse (`synthese-transverse.typ`) se met à jour.
3. **Adversarial partout.** Tout finding non trivial passe au tribunal :
   CONFIRMÉ / PLAUSIBLE / RÉFUTÉ, citation `fichier:ligne` obligatoire. Les
   réfutés sont consignés dans le JSON du run (anti-réouverture).
4. **Évidence machine d'abord.** Chaque axe a son script déterministe
   (`scripts/`). Le LLM juge ; il ne re-dérive jamais ce qu'un script mesure.
5. **`.personal/` s'écrit en chemin absolu vers la copie principale**
   (`/Users/bastiengallay/Dev/personal/bastiengallay.com/.personal/…`).
   Le symlink d'un worktree pointe au bon endroit, mais en cas de doute :
   chemin absolu. Un fichier écrit dans un `.personal/` local de worktree
   disparaît avec lui.
6. **Pas d'activation silencieuse.** L'axe mesure reste inactif tant que
   l'utilisateur ne l'active pas explicitement (voir `reference/axe-mesure.md`).

## Setup (à chaque invocation)

1. `pwd && git branch --show-current` — détecter le drift de cwd. La revue
   peut tourner depuis la copie principale (lecture seule) ; si une session
   d'édition est en cours dans un worktree, rester où l'on est.
2. Lire l'état : `uv run .claude/skills/revue/scripts/baselines.py show`.
   S'il n'existe pas, le run fondateur est
   `.personal/improvements/2026-06-11-revue-site/` — voir « Migration » plus bas.
3. Si la commande vise un axe : lire `reference/axe-<axe>.md` (non optionnel)
   et `reference/relecture.md`. Pour la synthèse : `reference/synthese.md`.
   Pour produire un deck : `reference/typst.md`.

## Commandes

| Commande | Effet |
| --- | --- |
| `/revue` | État des lieux : baselines + delta git depuis chaque dernier run → recommande quels axes rejouer (et lesquels laisser dormir). Ne lance rien sans confirmation. |
| `/revue totale [--rapide]` | Les 4 axes puis la synthèse. En `--rapide` : scripts + relecture seulement. |
| `/revue editoriale [--rapide] [--fraiche]` | Axe éditorial (contenu, diffusion, positionnement, gestion, mesure-section). |
| `/revue visuelle [--rapide] [--fraiche]` | Axe visuel via `/impeccable critique` + section perf obligatoire. |
| `/revue tech [--rapide] [--fraiche]` | Axe technique via `/code-review` (cadré dépôt entier si l'arbre est propre). |
| `/revue prose [--rapide] [--fraiche]` | Axe prose : lucid-lint sur les articles publiés (dogfood). |
| `/revue perf` | Le demi-axe seul : poids des pages, fonts, budget — sans relancer le visuel. |
| `/revue mesure` | Prototype **inactif** : explique l'état et les conditions d'activation. Jamais d'auto-activation. |
| `/revue synthese` | Recalcule convergences + file unique, met à jour le deck vivant et les slots feature-torture. |
| `/revue maj` | Après un lot terminé ou un verdict `/feature-torture` : met à jour statuts, baselines, synthèse. |

Routage en langage naturel : « rejoue la revue tech » → `tech` ; « où en est la
revue » → sans argument ; « la passe visuelle était fondée sur un mauvais build,
refais-la de zéro » → `visuelle --fraiche`.

## Le contrat d'axe (protocole commun)

Chaque axe suit la même séquence — les références d'axe précisent le contenu,
jamais l'ordre :

1. **Relecture de la passe précédente** *(défaut — voir `reference/relecture.md`)* :
   `uv run .claude/skills/revue/scripts/relecture.py --axe <axe>` produit le
   triage (corrigé probable / à revérifier / zone inchangée). Le LLM ne
   revérifie que les « à revérifier » et met à jour les statuts.
   `--fraiche` saute cette étape **uniquement** si la passe précédente était
   fondée sur des erreurs ou un mauvais contenu ; exiger la raison et la
   consigner dans le JSON du nouveau run (`"fraiche_raison": "…"`).
2. **Évidence machine** : le script de l'axe (voir table ci-dessous).
3. **Jugement LLM** : sous-agents selon le mode (voir « Modes & budget »).
4. **Vérification adversariale** : verdicts 3 états, citations, réfutés consignés.
5. **Sorties** : findings JSON (schéma ci-dessous) dans
   `.personal/revues/findings/AAAA-MM-JJ-<axe>.json` ; deck Typst dans
   `.personal/revues/runs/AAAA-MM-JJ-<axe>/` (mode complet seulement) ;
   `baselines.py maj` ; relecture visuelle du PDF produit (pages clés).

**Reprise incrémentale** : la relecture EST la reprise. On ne re-juge que
(a) les findings dont les fichiers ont bougé depuis le run précédent,
(b) les zones nouvelles (`git log --name-only --since=<date du run>`).
Un run incrémental qui ne trouve rien de neuf met à jour les statuts et la
date — il ne fabrique pas de deck pour rien.

| Axe | Script d'évidence | Moteur LLM |
| --- | --- | --- |
| éditoriale | `scripts/evidence_editorial.py` | exploration ciblée + grille /40 (`reference/axe-editorial.md`) |
| visuelle | `scripts/evidence_perf.py` (section perf) | skill `/impeccable critique` (`reference/axe-visuel.md`) |
| tech | — (le moteur a ses 9 angles) | skill `/code-review` (`reference/axe-tech.md`) |
| prose | `scripts/evidence_prose.py` | interprétation éditoriale (`reference/axe-prose.md`) |
| mesure | `scripts/evidence_mesure.py` | inactif (`reference/axe-mesure.md`) |
| synthèse | `scripts/convergences.py` | fusion + file unique (`reference/synthese.md`) |

## Modes & budget

- **`--rapide`** : scripts + relecture + delta git. Zéro ou un sous-agent.
  Pas de deck — mise à jour des JSON et une note courte en console.
- **Complet** (défaut) : deck Typst + sous-agents. Budget indicatif :
  éditorial 2–3 agents, visuel 2 (évaluations A/B isolées), tech 9 finders +
  vérifications + sweep, prose 0–1. Annoncer le budget avant de lancer
  `totale` en mode complet — c'est une session coûteuse.

## Schéma findings JSON

```json
{
  "axe": "tech",
  "date": "2026-06-12",
  "mode": "complete",
  "fraiche_raison": null,
  "scores": { "findings": 15, "p0": 0 },
  "findings": [
    {
      "id": "F1",
      "titre": "vsm.js : étapes codées en dur, deux sources de vérité",
      "severite": "P1",
      "taille": "M",
      "fichiers": ["static/vsm.js", "templates/macros/vsm.html"],
      "lot": "T1",
      "statut": "ouvert",
      "verdict": "CONFIRMED",
      "note": "La dérive 8→7 nœuds a déjà eu lieu (SUIVI 2026-06-11)."
    }
  ],
  "refutes": [
    { "titre": "Feed Atom double-encodé", "raison": "Conforme RFC 4287 ; validé W3C + NetNewsWire." }
  ]
}
```

Cycle des statuts : `ouvert` → `corrige` | `perime` | `refute-aposteriori`
| `reporte` | `exempte` (décision utilisateur). Les ids restent stables d'un
run à l'autre quand le finding persiste.

## État persistant — `.personal/revues/`

```text
.personal/revues/
  baselines.json            ← scores et dates par axe (trend)
  findings/                 ← un JSON par run d'axe
  runs/AAAA-MM-JJ-<axe>/    ← deck + captures du run
  charte.typ                ← charte Typst partagée (après migration)
  synthese-transverse.typ   ← le document vivant (après migration)
  mesure.toml               ← config axe mesure (absent = inactif)
```

**Migration (premier `synthese` ou `maj`)** : le run fondateur vit dans
`.personal/improvements/2026-06-11-revue-site/` (4 decks + captures + charte).
Au premier run de synthèse : `git mv` (dans le dépôt `.personal`) de
`charte.typ` et `synthese-transverse.typ` vers `.personal/revues/`, en
laissant les trois decks fondateurs où ils sont (instantanés). Les findings
fondateurs sont déjà seedés dans `findings/`.

## Interop

- **`/feature-torture`** : `synthese` et `maj` lisent les rapports dans
  `.personal/feature-torture/` et reportent les verdicts dans le §05 du deck
  vivant, puis ré-ordonnent la file unique.
- **`/impeccable`** : l'axe visuel passe par `critique` (snapshots et trend
  dans `.impeccable/critique/` — ne pas dupliquer ce mécanisme).
- **`/code-review`** : moteur de l'axe tech ; ses réfutés alimentent la liste
  anti-réouverture.

## Frontières

- **Hors périmètre : la méthode de travail.** Le livre blanc
  (`.personal/research/2026-06-11-livre-blanc-methode/`) et sa contre-expertise
  ont leur propre skill : `/contre-expertise`. La revue audite *le site* ;
  `/contre-expertise` crible *la méthode*. Les findings de revue peuvent
  nourrir le livre blanc, jamais l'inverse.
- `/lab/` est auditée comme sandbox (jamais comme contenu public) ;
  `.personal/` n'est jamais audité.
- Pas de bannière cookies, pas de contournement d'adblock : la doctrine
  « mesure honnête » de la revue fondatrice s'applique à toute proposition.

## Pièges connus (appris lors du run fondateur)

- `zola serve` local : utiliser `just port` / `just serve` / `just ping` /
  `just kill` ; état primo-visiteur = `localStorage.clear()` + 127.0.0.1.
- Le serveur de critique se lance pour la passe et **s'arrête après**.
- Les slugs Zola perdent le préfixe de date : `/ecrits/avec-l-ia-…/`, pas
  `/ecrits/2026-06-11-avec-l-ia-…/`.
- En local `--drafts`, les brouillons sont visibles : toute mesure « contenu
  publié » doit filtrer `draft = true`.
- Typst : pièges listés dans `reference/typst.md` (les revues fondatrices ont
  toutes trébuché dessus).
