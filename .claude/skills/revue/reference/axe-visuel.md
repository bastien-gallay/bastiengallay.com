# Axe visuel — critique impeccable + demi-axe perf

## Protocole

1. **Relecture** (contrat d'axe) — statuts V1, V2… du run précédent ;
   `relecture.py --axe visuelle`.
2. **Moteur** : invoquer le skill **`/impeccable critique`** (outil Skill,
   jamais une réimplémentation) avec le cadrage : état primo-visiteur
   (127.0.0.1, `localStorage.clear()`), light + dark, 1440×900 + 390×844,
   pages : home, /ecrits, l'article le plus riche, /now, /abonnement.
   Le serveur local passe par `just serve` / `just kill` (port stable par
   checkout via `just port`).
3. **Captures** : enregistrer les PNG dans
   `.personal/revues/runs/AAAA-MM-JJ-visuelle/captures/` (chemin absolu main).
   Les canoniques : home light/dark desktop, home mobile, article+rail,
   article mobile, /now, /abonnement.
4. **Demi-axe perf (obligatoire, même en `--rapide`)** :
   `uv run .claude/skills/revue/scripts/evidence_perf.py --build`
   — poids par page, totaux par type, assets lourds, delta vs baseline.
   En mode complet, compléter par une trace navigateur (MCP chrome-devtools
   `performance_start_trace`) sur la home et l'article. **Attention** : l'outil
   `lighthouse_audit` du MCP exclut la catégorie performance — ne pas
   prétendre l'avoir mesurée via Lighthouse.
5. **Synthèse d'axe** : tisser critique + perf ; mettre à jour le findings
   JSON (ids `V*`) et `baselines.py maj`.

## Cibles (baseline fondatrice du 2026-06-11)

- Nielsen : 31/40 → cible > 34 après V1–V4.
- P0 : 1 (héro mobile) → cible 0.
- Lighthouse accessibilité : 88 (home) / 93 (article) → cible ≥ 95.
- Le trend vit dans `.impeccable/critique/` (slug `templates-base-html`) —
  ne pas dupliquer ce mécanisme, le citer.

## Garde-fous

- Toute conclusion CSS exige l'état primo-visiteur (règle CLAUDE.md : pas de
  `data-theme` posé, fallback `prefers-color-scheme` vérifié dans les deux sens).
- Arrêter le serveur après la passe.
- Le rail VSM se teste en scrollant, pas en téléportant `scrollTop`
  (les triggers de bande médiane ratent sinon — faux bug connu).
