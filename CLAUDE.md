# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository status

**Pre-implementation.** No code, build system, or stack chosen yet. Decisions were frozen on 2026-05-13 (see `brainstorm/20260513-homepage-oss.md`); the static-site stack (Astro / Eleventy / Hugo / other) is still an open question. Do not assume a framework — ask before scaffolding one.

Contents so far:
- `README.md` — scope, target structure, open decisions
- `brainstorm/20260513-homepage-oss.md` — full reasoning behind the scoping decisions

## What this site is

Personal pro site for Bastien Gallay (`bastiengallay.com`, redirect from `bastiengallay.fr`). Single-page scroll identity site that **points to** OSS projects and the Teragone Factory brand rather than absorbing them.

Architecture intent (matters when implementing any section):

- **Umbrella model (modèle A)** — the site links *outward* to Teragone Factory and to individual OSS projects (lucid-lint, daily-ops, inflecv, skills). It is not a monorepo landing page for them. Keep that boundary: don't import or vendor those projects' content here.
- **Three "pôles"** structuring the projects section:
  1. Accessibilité cognitive & qualité du texte → lucid-lint (featured project, gets its own inline section above the pôles)
  2. Teragone Factory → outbound link only
  3. Productivité du travail intellectuel avec IA → daily-ops, skills, inflecv
  Plus a discreet "Réalisations clients" block (gallay-avocat.fr) — kept low-key on purpose.
- **`/now` route** — separate from the single-page scroll, fed by a weekly digest auto-generated from the `daily-ops` repo (`../daily-ops`, sibling). Wiring is TBD; likely a weekly commit of the digest into this repo at build time.
- **Blog** — Markdown in-repo → static build → push. Site-first; LinkedIn is a teaser + link only. No cadence promised on the site itself.

Sections deliberately **excluded** (don't add them back without asking): testimonials, newsletter signup, stack/colophon, tech pedagogy content.

## Working language

The README, brainstorm docs, and likely future content are in **French**. Keep prose, copy, and commit messages in French unless the user switches. Code identifiers stay English.

## Conventions inherited from user global config

- Lint Markdown files (markdownlint or equivalent) before committing changes to `.md`.
- No "Claude" signature in git commit messages.
- For any Python tooling that gets added, use `uv` / `uvx`.
- Before running `git commit` / `git push` / `git rebase` / `git reset --hard` with `dangerouslyDisableSandbox: true`, ask the user first (session-wide authorization, once granted, is respected).
- After each commit, run `daily-ops capture` (this repo is daily-ops-tracked).

## Working in a git worktree

**Toujours travailler dans un git worktree, jamais directement sur la copie principale.** Une fois ce repo initialisé (`git init` + premier commit), toute session de travail Claude doit se faire dans un worktree isolé créé avec `EnterWorktree` (ou `git worktree add` manuel si besoin). La copie principale ne sert que comme référence de lecture et comme cible de merge des changements validés.

Raison : isole les expérimentations du tronc, permet de jeter un essai raté sans `git reset`, et rend les diffs explicites avant intégration.

Application : au démarrage d'une tâche d'implémentation, créer le worktree d'abord ; travailler dedans ; à la validation, faire revue + merge/rebase vers la branche principale. Les tâches de pure exploration / lecture (grep, brainstorm, runbooks dans `.personal/`) peuvent rester sur la copie principale.
