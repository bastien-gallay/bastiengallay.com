# Brainstorm : Page d'accueil OSS — site perso pro

| Field | Value |
| --- | --- |
| **Date** | 2026-05-13 |
| **Duration** | ~25 min |
| **Participants** | Bastien + AI Facilitator |
| **Problem shape** | Multi-axes (4 sous-décisions : grouping, sections, blog, naming) |

## Session Plan

| # | Phase | Technique | Statut |
|---|---|---|---|
| 0 | Intake | Exploration `./personal/` + `./work/` + extension | Done |
| 1 | Grouping projets | Affinity (3 axes proposés) | Done |
| 2 | Sections du site | Liste canonique filtrée | Done |
| 3 | Blog | PCI binaire | Done |
| 4 | Naming | Constraint Mapping → Free Association → PCI top 3 | Done |

---

## Inventaire des projets

| Projet | Localisation | Statut | Rôle dans le site |
|---|---|---|---|
| **lucid-lint** | `./personal/lucid-lint` | v0.2.3, mature, Crates.io, OpenSSF | **Projet vedette** — bandeau home |
| **inflecv** | `./personal/inflecv` | v0.1.0 early | Pôle IA-productivity |
| **daily-ops** | `./personal/daily-ops` | actif | Pôle IA-productivity + *engine* de la Now page + cadence blog |
| **skills** | `./personal/skills` (bfw, feature-torture, glance, etc.) | actifs | Pôle IA-productivity |
| **Teragone Factory** | `./work/teragone-oss/*` (~11 outils) + `teragone-vscode-theme` | constellation pré-release | **Pôle Teragone — lien sortant (modèle A)** |
| **gallay-avocat.fr** | `./personal/gallay-avocat.fr` | en migration prod | Réalisations clients — section discrète |
| video-creator-program | `./work/video-creator-program` | actif | **Écarté** du site (pédagogie tech non affichée) |
| cv | `./personal/cv` | utilitaire | **Écarté** (juste build du CV PDF lié dans À propos) |
| `./experiments/` | (ai, autopreneur, lang-tools, media, misc) | exploratoires | **Réservoir de matière blog** |

---

## Décisions

### 1. Grouping — Axe B (thématique), modèle A (umbrella)

Le site perso pointe **vers** Teragone Factory comme pôle, sans l'absorber.

Pôles :
- 🧠 **Accessibilité cognitive & qualité du texte** — lucid-lint
- 🏭 **Teragone Factory** — lien sortant, brand consulting autonome
- 🤖 **Productivité du travail intellectuel avec IA** — daily-ops, skills, inflecv
- *(discret)* **Réalisations clients** — gallay-avocat.fr

### 2. Sections — single-page scroll

```text
Hero (qui + quoi en 1 phrase)
  ↓
Projet vedette inline (lucid-lint — démo GIF, "what is it")
  ↓
Pôles (3 cartes : Lucid · Teragone Factory ↗ · IA-productivity)
  ↓
Écrits récents (3 derniers)
  ↓
À propos (court) + lien CV PDF
  ↓
Réalisations clients (1-2 lignes, discret)
  ↓
Contact (footer)
```

Plus une route séparée : **`/now`** alimentée par daily-ops (digest hebdo automatique).

Sections **skippées** : témoignages clients (pas de matière + conflit discrétion gallay-avocat), newsletter (pas d'engagement à tenir), stack/colophon (pas le message), pédagogie tech (écartée).

### 3. Blog — Site-first

- **Workflow** : Markdown dans repo → build statique → push
- **Relai LinkedIn** : teaser 3-4 lignes + lien + 1 visuel. Pas plus.
- **Cadence** : *souple* ("le vendredi quand il y a matière"), **pas dure** — pas de promesse publique de fréquence
- **Engine de cadence** : bilan `daily-ops` chaque vendredi → méta-analyse ou focus
- **Pipeline d'articles déjà en tête** :
  1. **"Comment j'ai codé la première version de lucid-lint en 1 semaine"** — *opener recommandé* (tangible, mène au projet vedette)
  2. "Coder plus lentement avec l'IA : un paradoxe productif" (série en cours)
  3. Extractions de `./experiments/` (explorations techniques)

### 4. Naming

- **Primary** : `bastiengallay.com` (à acheter — dispo confirmée)
- **Secondary (redirect)** : `bastiengallay.fr` (ancrage FR, dispo)
- **Drop** : `.dev` (cher + signal restrictif), `.tech` (redondant si .com + .fr)
- **Easter egg séparé** (optionnel, perso) : `oods.tech` ou `oods.co` — sandbox/blog perso, **pas** l'identité pro

**Concept words écartés** (facetbench, oods en principal, etc.) — raison : ajouterait un 4ᵉ nom qui concurrencerait Lucid + Teragone et diluerait l'autorité. Un site perso doit s'appeler comme la personne.

---

## Action Items

- [ ] **Vérifier whois** `bastiengallay.com` et `bastiengallay.fr` au moment de l'achat (probe externe manuelle)
- [ ] **Acheter** `bastiengallay.com` + `bastiengallay.fr` (~20 €/an total)
- [ ] **Décider** si `oods.tech` ou `oods.co` à prendre comme easter egg séparé
- [ ] **Choisir stack site statique** (Astro, Eleventy, Hugo, ...) — à brainstormer séparément
- [ ] **Câbler `/now`** sur le digest daily-ops (peut-être commit hebdo automatique du digest dans le repo du site)
- [ ] **Rédiger l'article opener** : "lucid-lint en 1 semaine" *avant* ou *pendant* la construction du site (éviter le piège "plateforme sans contenu")
- [ ] **Voir avec admin `gallay.org`** plus tard si redirection souhaitable depuis un subdomain
- [ ] **Décider du modèle Teragone Factory** : URL dédiée (`teragone-factory.fr` ?) ou page sur GitHub org — à brainstormer séparément

---

## Session Meta-Analysis

- **Duration** : ~25 min
- **Techniques used** : Exploration FS (intake étendu), Affinity (grouping), Liste filtrée (sections), PCI binaire (blog), Constraint Mapping + Free Association + PCI top 3 (naming)
- **Techniques skipped** : SCAMPER (pas pertinent pour naming d'identité ni pour structure de site), Six Hats (opt-in only)
- **Adaptations made** :
  - Extension d'intake **mi-session** après que l'utilisateur a signalé `./work/teragone-oss/` — découverte de la constellation Teragone, qui a *changé* la donne (modèle umbrella A introduit)
  - Question de positionnement Teragone (A/B/C) insérée avant les sections, parce que la réponse changeait la structure
- **Problem shape** : Multi-axes confirmé. L'enchaînement grouping → sections → blog → naming a fonctionné car chaque décision contraignait la suivante (modèle A → naming sober ; site-first → besoin section Écrits)
- **Convergence point** : Étape 1 (Affinity, axe B) — fil rouge thématique posé, le reste s'est aligné
- **What worked well** : grounding FS en intake (a évité de proposer du naming abstrait avant de connaître Teragone Factory comme marque préexistante). PCI binaire sur blog a tranché net.
- **What could improve** : J'aurais dû lever le drapeau Teragone Factory dès l'intake initial — j'ai exploré `./personal/` mais pas `./work/`, l'utilisateur a dû me le signaler. Pour un site "réalisations pro", explorer tout le périmètre professionnel dès l'intake aurait été plus rigoureux.
- **Session energy** : haute et tranchée — l'utilisateur a pris des décisions rapides et sans hésitation à chaque étape
- **Recommendation for similar sessions** : pour une session "site perso pro / portfolio", explorer **tous** les dossiers de travail (personal/, work/, clients/, experiments/) en intake, pas juste celui mentionné. Le périmètre pro déborde toujours du dossier nommé.
