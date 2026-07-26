# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository status

**Implémentation en cours.** Stack figée le 2026-05-14 : **Zola 0.22.1** (SSG Rust),
templates Tera, Sass compilé par Zola. Déploiement GitHub Pages depuis
`bastien-gallay/bastiengallay.com` via `.github/workflows/deploy.yml` (actions
officielles `configure-pages` / `upload-pages-artifact` / `deploy-pages`).
Custom domain `bastiengallay.com` actif avec HTTPS.

Layout posé :

- `.impeccable.md` — design context (palette De Stijl mono-accent rouge,
  fontes Redaction display + Geist body, 5 design principles).
- `sass/_tokens.scss` — tokens OKLCH, type scale fluide, spacing 4pt.
- `templates/base.html` — shell grid avec rail latéral gauche style nin.com,
  toggle light/dark (script pré-bootstrap pour éviter le FOUC).
- `templates/index.html` — hero + 4 sections placeholder.
- `static/theme.js` — toggle thème persisté + scrollspy IntersectionObserver.

Sections à crafter ensuite : vedette lucid-lint, pôles, écrits, contact, `/now`.
Voir `brainstorm/20260513-homepage-oss.md` pour le cadrage initial.

## What this site is

Personal pro site for Bastien Gallay (`bastiengallay.com`, redirect from `bastiengallay.fr`). Single-page scroll identity site that **points to** OSS projects and the Teragone Factory brand rather than absorbing them.

Architecture intent (matters when implementing any section):

- **Umbrella model (modèle A)** — the site links *outward* to Teragone Factory and to individual OSS projects (lucid-lint, daily-ops, inflecv, skills). It is not a monorepo landing page for them. Keep that boundary: don't import or vendor those projects' content here.
- **Three "pôles"** structuring the projects section:
  1. Accessibilité cognitive & qualité du texte → lucid-lint (featured project, gets its own inline section above the pôles)
  2. Teragone Factory → outbound link only
  3. Productivité du travail intellectuel avec IA → daily-ops, skills, inflecv
  Plus a discreet "Réalisations clients" block (gallay-avocat.fr) — kept low-key on purpose.
- **`/now` route** — separate from the single-page scroll. Wired on 2026-07-26 (the earlier daily-ops digest idea was dropped: daily-ops records intent, not outcome, and covers client repos). See "La relève de `/now`" below.
- **Blog** — Markdown in-repo → static build → push. Site-first; LinkedIn is a teaser + link only. No cadence promised on the site itself.

Sections deliberately **excluded** (don't add them back without asking): testimonials, newsletter signup, stack/colophon, tech pedagogy content.

## Working language

The README, brainstorm docs, and likely future content are in **French**. Keep prose, copy, and commit messages in French unless the user switches. Code identifiers stay English.

## Conventions inherited from user global config

- Lint Markdown files (markdownlint or equivalent) before committing changes to `.md`.
- No "Claude" signature in git commit messages.
- For any Python tooling that gets added, use `uv` / `uvx`.
- Before running `git commit` / `git push` / `git rebase` / `git reset --hard` with `dangerouslyDisableSandbox: true`, ask the user first (session-wide authorization, once granted, is respected).
- After each commit, capture with `daily-ops add --topic <sujet> "<texte>"` (this repo is daily-ops-tracked). The old `daily-ops capture` / `item capture` commands were removed in v0 (2026-07-01), and the post-commit hook that called them is disabled — the capture is manual.

## Working in a git worktree

**Toujours travailler dans un git worktree, jamais directement sur la copie principale.** Toute session de travail Claude se fait dans un worktree isolé créé avec `EnterWorktree` (ou `git worktree add` manuel si besoin). La copie principale ne sert que comme référence de lecture et comme cible de merge des changements validés.

Raison : isole les expérimentations du tronc, permet de jeter un essai raté sans `git reset`, et rend les diffs explicites avant intégration.

Application : au démarrage d'une tâche d'implémentation, créer le worktree d'abord ; travailler dedans ; à la validation, faire revue + merge/rebase vers la branche principale. Les tâches de pure exploration / lecture (grep, brainstorm, runbooks dans `.personal/`) peuvent rester sur la copie principale.

### Garde-fou de session : `just guard` en premier

**Au démarrage de toute session de rédaction/édition dans un worktree, lancer `just guard` AVANT toute autre chose.** La recette :

1. **Vérifie l'ancrage** — affiche le checkout + la branche, et **avertit si on est sur la copie principale** (où l'édition est interdite).
2. **Soigne le symlink `.personal/`** — le crée s'il manque, vers `.personal/` de main (idempotent).

Pourquoi c'est nécessaire — **le piège `.personal/`** : `.personal/` est gitignoré et n'existe **physiquement que sur la copie principale**. Un worktree fraîchement créé n'en a pas. Sans le symlink, deux pannes silencieuses :

- les chemins `.personal/…` ne résolvent pas depuis le worktree (SUIVI, `ia-lentement-2/`, exports de sessions introuvables) — `/redaction .personal/…` échoue ;
- un fichier écrit dans le `.personal/` *local* d'un worktree **disparaît avec lui**. Toute écriture `.personal/` doit atterrir sur main (le symlink l'assure).

**Ne jamais lancer une session de rédaction depuis la copie principale** pour contourner ce piège : ça brise l'isolation worktree et **égare les sessions** (elles s'enregistrent sous le projet « dépôt principal », invisibles depuis le worktree, parfois non rechargeables si volumineuses). La bonne séquence reste : `cd` dans le worktree dédié → `just guard` → travailler.

## QA visuel avant de déclarer une modif CSS finie

Toute modification CSS qui peut affecter le rendu doit être vérifiée **en navigation privée ou sur une origin neuve** (`127.0.0.1` plutôt que le domaine de prod), pour reproduire l'état primo-visiteur : pas de `data-theme` ni d'autre clé dans `localStorage`, OS en clair par défaut.

Raison : `theme.js` ne pose `data-theme` sur `<html>` que si une valeur est sauvegardée. Tout sélecteur qui suppose un attribut posé (`:not([data-theme="light"])` & similaires) doit aussi avoir un fallback `@media (prefers-color-scheme: …)` — sinon il s'applique aussi à l'état initial sans attribut. Cf. régression couleur figure 4 (commit `809b643`, 2026-05-28). Pour le dark mode, passer **systématiquement** par la mixin `@include theme-dark` (`sass/_tokens.scss`), pas par un sélecteur écrit à la main.

## La relève de `/now`

`/now` repose sur **deux fichiers de natures opposées, qui ne doivent jamais fusionner** :

- `data/constellation.toml` — ce qui est **affirmé** (identité des astres, famille, question, seuils). Tenu à la main, jamais calculé.
- `data/activity.json` — ce qui est **mesuré** (commits par fenêtre, dernier commit, série quotidienne). Généré par `scripts/constellation.py`, jamais édité à la main.

L'écart entre les deux *est* le contenu de la page. Un `/now` qui ne peut pas se contredire ne sert à rien.

Le script est **local-only** : il lit les dépôts du disque sous `root` (`~/Dev`). Son produit étant commité, le build CI n'a jamais besoin de lui. Un dépôt absent ressort `missing` et le manque se voit sur la page.

### Relève automatique (launchd, quotidienne)

Depuis le 2026-07-26, `scripts/releve-cron.sh` tourne tous les jours à 7h10 via un LaunchAgent (`local.bastiengallay.releve`, installé par `just cron-install`), sur la **copie principale**. Il mesure, commite `data/activity.json` **sans signature GPG** (le commit atteste d'une mesure machine, pas d'une intention) et pousse ; GitHub Pages rebuild seul.

Conséquences à connaître avant toute session :

- Des commits `chore(now): relevé du …` apparaissent sur `main` sans intervention. Ce n'est pas une anomalie.
- Le job **abandonne sans rien réparer** si `main` est sale hors `data/activity.json`, en retard sur `origin`, ou porteur de commits non poussés. Laisser `main` propre et synchronisée, c'est ce qui le garde vivant.
- Diagnostic : `just cron-status`, `just cron-log`, `just cron-run` (déclenche tout de suite).

Le plist n'est pas versionné — il contient des chemins absolus et doit viser la copie principale, pas un worktree. `just cron-install` le régénère et le recharge ; c'est idempotent.
