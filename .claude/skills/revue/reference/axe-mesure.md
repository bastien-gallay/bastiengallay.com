# Axe mesure / pilotage — PROTOTYPE INACTIF

Prototypé pour le jour où le trafic existera. **Inactif par défaut, et
l'activation est une décision de l'utilisateur — jamais du skill.**

## État

- `evidence_mesure.py` sans configuration → répond `{"actif": false}` avec
  les conditions d'activation. C'est le comportement attendu.
- Activation = créer `.personal/revues/mesure.toml` (voir modèle ci-dessous)
  **et** demande explicite de l'utilisateur.

## Conditions d'activation (déclencheurs écrits, synthèse §06)

- > 500 visites/semaine au beacon, **ou** lancement de la version EN, **ou**
  ≥ 80 abonnés Buttondown. Avant : les compteurs se notent à la main une fois
  par mois, ça suffit.

## Ce que l'axe collectera (une fois actif)

| Source | Moyen | Contrainte sandbox |
| --- | --- | --- |
| Stars GitHub (lucid-lint, daily-ops…) | `gh api repos/<owner>/<repo>` | OK (api.github.com autorisé) |
| Abonnés Buttondown | API + `BUTTONDOWN_API_KEY` | Réseau hors allowlist par défaut — prévenir, demander |
| Cloudflare Web Analytics | Pas d'API gratuite : export manuel mensuel | Saisie utilisateur |
| Impressions LinkedIn | Pas d'API personnelle : saisie manuelle | Saisie utilisateur |

## Modèle `mesure.toml`

```toml
[depots]
github = ["bastien-gallay/lucid-lint", "bastien-gallay/daily-ops"]

[buttondown]
# La clé vit dans l'environnement (BUTTONDOWN_API_KEY), jamais ici.
actif = false

[saisie_manuelle]
# Renseigné par l'utilisateur à chaque collecte.
```

## Doctrine (héritée de la revue fondatrice — ne pas rouvrir)

- Zéro cookie, zéro bannière. On ne contourne pas les adblockers.
- Mesurer le *recoupement* (abonnés, stars, serveur), pas la surveillance.
- Si l'axe s'active un jour, ses sorties vont dans `baselines.json`
  (`axes.mesure`) et un encart du deck de synthèse — pas un deck dédié tant
  que la matière tient sur une slide.
