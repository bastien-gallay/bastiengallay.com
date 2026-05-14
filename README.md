# bastiengallay.com

Site personnel pro de Bastien Gallay. Single-page identitaire qui pointe vers les projets OSS (lucid-lint, inflecv, daily-ops, skills) et la marque Teragone Factory, avec une section écrits et une `/now` page alimentée par `daily-ops`.

**Statut** : implémentation en cours. Stack [Zola](https://www.getzola.org/)
(static site generator Rust). Hébergé sur GitHub Pages avec custom domain,
déploiement automatisé via GitHub Actions à chaque push sur `main`.

## Domaines

- **Primary** : `bastiengallay.com`
- **Redirect** : `bastiengallay.fr`

## Structure cible (single-page scroll)

```text
Hero (qui + quoi en 1 phrase)
  ↓
Projet vedette (lucid-lint — démo GIF)
  ↓
Pôles (Lucid · Teragone Factory ↗ · IA-productivity)
  ↓
Écrits récents
  ↓
À propos + lien CV PDF
  ↓
Réalisations clients (discret)
  ↓
Contact
```

Route séparée : **`/now`** — digest hebdo auto-généré depuis [`daily-ops`](../daily-ops).

## Blog

Site-first, relai LinkedIn (teaser + lien). Cadence souple — pas de promesse de fréquence affichée. Workflow : Markdown dans le repo → build statique → push. Bilan vendredi via `daily-ops` quand il y a matière.

Premiers articles en pipeline :

1. *"Comment j'ai codé la première version de lucid-lint en 1 semaine"* (opener)
2. *"Coder plus lentement avec l'IA : un paradoxe productif"* (série)
3. Extractions depuis [`../../experiments/`](../../experiments)

## Décisions de cadrage

Voir [`brainstorm/20260513-homepage-oss.md`](brainstorm/20260513-homepage-oss.md) pour le détail (grouping, modèle umbrella, choix de TLD, naming écartés, action items).

## Stack & déploiement

- **Static site generator** : Zola 0.22.1
- **Templates** : Tera (`templates/`)
- **Styles** : Sass compilé par Zola (`sass/main.scss`)
- **Hébergement** : GitHub Pages depuis `bastien-gallay/bastiengallay.com`
- **CI/CD** : `.github/workflows/deploy.yml` (actions/configure-pages,
  upload-pages-artifact, deploy-pages — déploiement à chaque push sur `main`)
- **Custom domain** : `bastiengallay.com` (CNAME dans `static/CNAME`)

## Dev local

```bash
zola serve
```

Sert le site sur `http://127.0.0.1:1111` avec live-reload.

## Prochaines décisions à prendre

- URL canonique pour Teragone Factory (`teragone-factory.fr` ? page org GitHub ?)
- Script de digest hebdo `daily-ops → /now`
- Redirect `bastiengallay.fr → bastiengallay.com` côté DNS/registrar
