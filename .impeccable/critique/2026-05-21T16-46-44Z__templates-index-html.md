---
target: templates/index.html (fusion design home)
total_score: 28
p0_count: 0
p1_count: 3
timestamp: 2026-05-21T16-46-44Z
slug: templates-index-html
---
# Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Scrollspy + section-color rail solides. Pas de progress indicator. |
| 2 | Match System / Real World | 2 | Vocabulaire pastiche demande littératie magazine FR. |
| 3 | User Control and Freedom | 3 | Theme toggle, sommaire jumps. Aucun keyboard nav. |
| 4 | Consistency and Standards | 4 | Sections-color 1:1 §NN, numérotation §XX.YY, pill cohérent. |
| 5 | Error Prevention | n/a | Site informationnel. |
| 6 | Recognition Rather Than Recall | 3 | Sommaire + rail toujours visibles. |
| 7 | Flexibility and Efficiency | 2 | No keyboard shortcuts. |
| 8 | Aesthetic and Minimalist Design | 3 | Esthétique forte mais densité élevée. |
| 9 | Error Recovery | 3 | 404 par défaut. |
| 10 | Help and Documentation | 2 | OURS sert de doc auto-référentielle. |
| Total | | 28/40 | Good, clear improvement directions |

# Anti-Patterns Verdict

LLM assessment: PASS. Pas AI-generated. Vocabulaire pastiche, Redaction display, détails idiosyncratiques.
Deterministic scan: unavailable (detect.mjs bundled detector not found).
Visual overlays: non tentés (dépendance detector).

# Overall Impression

Vraie identité visuelle, rare pour portfolio dev OSS 2026. Le pari fanzine-éditorial tient grâce à la doctrine (couleurs sémantiques héritées lucid-lint, mark unifié). Risque principal : excès de signaux pastiche, cible primaire peut surcharger.

# What's Working

1. Doctrine éditoriale tenue de bout en bout.
2. Hero §01 géant + cadre + pill inversée, composition tendue.
3. Listing radical lucid-lint avec type-tag v0.2.0 : la sortie réelle EST l'argument.

# Priority Issues

[P1] Densité lexicale du pastiche
- POCHETTE / NUMÉRO / OURS / TIRAGE LIMITÉ / EN COUVERTURE / DANS CE NUMÉRO / IMPRIMÉ À LA DEMANDE saturent.
- Fix : alléger la pill TIRAGE colophon ou le TIRAGE LIMITÉ. Garder un seul rappel pochette.

[P1] Polychromie 5 couleurs § risque de noyer la hiérarchie
- §01 pink, §02 blue, §03 yellow, §04 mint, §05 cyan, §06 rouge.
- Fix : test « tout en rouge accent ». Si perte nulle, simplifier.

[P1] Aucune imagerie sur la home
- Skill brand register : zero imagery est dans les bans.
- Fix : screenshot lucid-lint en complément du listing terminal, capture daily-ops, ou objet.

[P2] /now/ pointe vers du vide
- §05 sommaire mène à une page non craftée.
- Fix : crafter min vital ou retirer du sommaire.

[P2] Mobile non vérifié en profondeur
- Pas testé 320/375/768.
- Fix : test 3 viewports, ajuster clamp() et min-width.

# Persona Red Flags

Alex (dev OSS) : OK, content trouvé <30s. Friction : pas de keyboard shortcut.
Jordan (recruteur first-time) : ~20% friction décodage POCHETTE. Peut bouncer.
Maria (prospect client Teragone) : convaincue si persévère. Pas de page clients dédiée.

# Minor Observations

- Bouton thème dit « CLAIR » dark / « SOMBRE » light. Préciser action « PASSER EN... ».
- Date issue-bar est now() : devrait être date dernière maj.
- Marque ▍ OURS en --c-info bleu, alors que §06 est rouge. Double-message.
- heading_html convention à documenter.

# Questions to Consider

1. Et si TIRAGE LIMITÉ disparaissait du colophon (déjà signalé en haut) ?
2. Le code-couleur §NN est navigationnel ou décoratif ? Test : retire sur §03 §04.
3. Le focus lucid-lint montre un output technique. Attirant ou décourageant pour un non-initié ?
4. « Coordination IA : Claude (Anthropic) » assumé : signal à double tranchant. Voulu ?
5. « Tirage limité » sur site statique : collector ou atelier ?
