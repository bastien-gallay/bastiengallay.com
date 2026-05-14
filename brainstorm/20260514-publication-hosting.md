# Brainstorm : choix du système de publication et du hosting

| Champ | Valeur |
| --- | --- |
| **Date** | 2026-05-14 |
| **Durée** | 13 min (11:43 – 11:56) |
| **Participants** | Bastien + IA facilitatrice |
| **Problem shape** | Decision under constraints (2 axes couplés : SSG × hosting) |

## Plan de session

| # | Phase | Technique | Durée | Statut |
| --- | --- | --- | --- | --- |
| 0 | Intake | Grounding + 2 questions de cadrage | 3 min | Done |
| 1 | Diverger | Atom Inventory (SSG × hosting) | 2 min | Done |
| 2 | Cadrer | Constraint Mapping | 2 min | Done |
| 3 | Décider | Impact / Effort sur combos réalistes | 3 min | Done |
| 4 | Adversarial | Mini Devil's Advocate sur GH Pages | 1 min | Done |
| 5 | Communiquer | MoSCoW final | 1 min | Done |
| 6 | Crystalliser | Selected ideas + action items | 1 min | Done |

## Contexte ancré (avant divergence)

- `README.md` ligne 48 : "Stack site statique (Astro · Eleventf · Hugo · autre ?)" listé comme décision ouverte.
- `brainstorm/20260513-homepage-oss.md` n'aborde pas le hosting (grep `hosting|deploy|Pages|Netlify|Cloudflare|DNS` → vide).
- Pas de coupled-carryover : aucun fichier `*publication*` / `*hosting*` antérieur.

## Contraintes verrouillées au cadrage

| # | Contrainte | Source |
| --- | --- | --- |
| C1 | En ligne ce week-end (friction zéro prime) | priorité utilisateur |
| C2 | 100 % statique, build local, aucun secret en CI | réponse digest `/now` |
| C3 | Redirect `bastiengallay.fr → .com` | README |
| C4 | Blog Markdown + frontmatter, build standard | README |
| C5 | Coût ≈ 0 € | global |
| C6 | DNS déjà chez Cloudflare (registrar ou DNS seul) | réponse utilisateur |
| C7 | Site umbrella : pointe vers projets OSS sans les absorber | CLAUDE.md |
| C8 | Cohérence "Rust jamstack" avec écosystème OSS perso | préférence utilisateur |

## Step 1 — Atom Inventory (11:46 – 11:48)

Deux axes indépendants :

| Axe | Options listées |
| --- | --- |
| SSG | Astro · Eleventy (11ty) · Hugo · **Zola** · vanilla HTML+script |
| Hosting | **GitHub Pages** · Cloudflare Pages · Netlify · Vercel · VPS |

## Step 2 — Constraint Mapping (11:48 – 11:50)

Filtrage immédiat par contraintes :

| Option | Verdict | Raison |
| --- | --- | --- |
| VPS | ❌ | contredit C1 (setup long) et C5 (coût) |
| Vercel | ❌ | lock-in marketing fort, aucun avantage net pour site statique umbrella |
| Netlify | ⚠️ écarté | fonctionnalités utiles plus tard (forms, fn) mais non-couvert par les besoins actuels → écosystème non aligné avec C8 |
| Zola | ✅ retenu | binaire Rust unique, Tera (Jinja-like), Markdown natif, aligné C8 |
| Hugo | ✅ candidat | binaire unique, ultra-mature ; templates Go = friction cognitive |
| Astro / 11ty | ✅ candidats | écosystème JS, aucun avantage net face à Zola sous C8 |
| GitHub Pages | ✅ retenu | gratuit, workflow Actions trivial, convention "je vis dans GitHub" |
| Cloudflare Pages | ✅ candidat sérieux | DNS déjà chez CF → intégration maximale ; preview deploys + edge fn pour l'avenir |

## Step 3 — Impact / Effort sur combos finalistes (11:50 – 11:53)

| Combo | Effort setup | Capacité future | Maintenance | Note |
| --- | --- | --- | --- | --- |
| **Zola + GH Pages** | S (workflow `zola-deploy-action` ~10 lignes) | ★ statique pur (suffit pour C2) | XS (1 binaire) | **Choisi — alignement C8 + convention GitHub** |
| Zola + CF Pages | S (build natif sur push, DNS au même endroit) | ★★ Workers possibles plus tard | XS | Reste l'évolution naturelle si besoin |
| Hugo + GH Pages | S | ★ | XS | Écarté (Tera > templates Go pour la lisibilité) |
| Astro + Netlify | S (auto-detect, adapters edge) | ★★★ | M (deps npm à mettre à jour) | Sur-dimensionné vs besoins |

## Step 4 — Devil's Advocate sur GH Pages (11:53 – 11:54)

> *"DNS déjà chez Cloudflare → CF Pages serait techniquement strictement supérieur (CDN + DNS + redirect au même endroit, preview deploys natifs). Pourquoi GH Pages alors ?"*

Réponse utilisateur (verbatim) :

> "Sauf si c'est 0 efforts, ou que le switch GH → CFP serait ardu, nous pouvons commencer sur GH pages pour avoir un résultat très rapide."

**Validation du switch futur** : Zola produit le même `public/` quel que soit le hosting. Migration GH Pages → CF Pages = pointer CF Pages sur le repo + basculer le CNAME dans CF DNS + supprimer le workflow Actions. ~15 min, zéro réécriture. Le risque de lock-in est nul.

## Step 5 — MoSCoW final (11:54 – 11:55)

| Bucket | Choix |
| --- | --- |
| **Must** | SSG = **Zola** · Hosting = **GitHub Pages** · DNS = Cloudflare (en place) · Redirect `.fr → .com` via Cloudflare Bulk Redirects |
| **Should** | Workflow officiel `shalzz/zola-deploy-action` ou équivalent · Custom domain apex `bastiengallay.com` + CNAME `www` · markdownlint en pre-commit (CLAUDE.md global) |
| **Could** | Migrer vers Cloudflare Pages quand un besoin concret apparaît (preview deploys, edge fn, image CDN) |
| **Won't** | Astro, Eleventy, Hugo · Netlify, Vercel · VPS · build CI du digest `daily-ops → /now` (reste local et committé hebdo) |

---

## Outcome

### Décisions retenues

1. **SSG = Zola** — binaire Rust unique, Tera templates lisibles, Markdown + frontmatter natif, aligné cohérence "Rust jamstack" avec l'écosystème OSS perso.
2. **Hosting = GitHub Pages** — convention "je vis dans GitHub", workflow Actions trivial (~10 lignes), suffisant pour 100 % statique. Pas de lock-in (artefact `public/` portable).
3. **DNS = Cloudflare (statu quo)** — registrar/DNS déjà en place ; ajout d'une règle Bulk Redirects pour `bastiengallay.fr → bastiengallay.com`.
4. **Migration CF Pages = option ouverte, non engagée** — décidable plus tard sur besoin réel (preview deploys, edge), coût de switch estimé ~15 min.

### Action items

- [ ] Initialiser le projet Zola (`zola init` à la racine — vérifier compat avec la convention `content/`, `templates/`, `static/`, `sass/`)
- [ ] Choisir / créer un thème minimaliste (probablement custom via skill `impeccable: teach + craft` — déjà en carry-over du jour)
- [ ] Écrire `.github/workflows/deploy.yml` avec `zola-deploy-action` → branche `gh-pages` ou GitHub Pages source = artifact
- [ ] Configurer GitHub Pages : Settings → Pages → custom domain `bastiengallay.com` + Enforce HTTPS
- [ ] Cloudflare DNS : `A`/`AAAA` apex vers les IPs GitHub Pages + `CNAME www` → `bastiengallay.github.io`
- [ ] Cloudflare Bulk Redirects : `bastiengallay.fr/*` → `https://bastiengallay.com/$1` (301)
- [ ] Ajouter `markdownlint` config + hook pre-commit (cohérence avec instruction globale)
- [ ] Documenter dans `README.md` : remplacer "Stack site statique (Astro · Eleventy · Hugo · autre ?)" par la décision actée + lien vers ce doc

---

## Session Meta-Analysis

- **Durée** : 13 min (objectif ~15)
- **Techniques utilisées** : Grounding, Atom Inventory, Constraint Mapping, Impact/Effort, Devil's Advocate (mini, ciblé sur le défaut "GH Pages"), MoSCoW
- **Techniques skippées** : aucune par rapport au plan annoncé
- **Adaptations** : ajout d'un Devil's Advocate non-prévu après que le choix Zola+GH se soit cristallisé tôt (anti-anchoring sur "GH Pages par défaut") — l'utilisateur a explicitement validé en pesant le coût de switch
- **Problem shape** : Decision under constraints → confirmé (ne s'est pas transformé)
- **Convergence point:** Step 3 (Impact/Effort) — la cohérence Rust jamstack (C8) a tranché immédiatement après que le filtrage par contraintes a réduit à 4 combos. Le DA Step 4 a validé sans inverser.
- **Ce qui a bien marché** : 2 questions de cadrage en INTAKE ont produit C1 (friction zéro) + C6 (DNS Cloudflare) qui ont structuré tout le filtrage. La 3e question (familiarité techno) a directement révélé la préférence Zola, court-circuitant une matrice plus longue.
- **Ce qui pourrait s'améliorer** : j'avais initialement filtré Zola en "petite communauté → friction supplémentaire" sans vérifier ; l'utilisateur l'a réintroduit. Leçon : ne pas pré-filtrer une option niche sur un argument de communauté quand le site est identitaire (design custom de toute façon).
- **Énergie de la session** : haute, décisive, peu de débat — l'utilisateur avait déjà une intuition forte (Rust jamstack) que les questions ont révélée plutôt que construite.
- **Recommandation pour sessions similaires** : quand un utilisateur OSS-natif choisit un stack perso, demander la familiarité techno **avant** l'Impact/Effort — ça remplace une matrice 4×4 par une matrice 1×3.
