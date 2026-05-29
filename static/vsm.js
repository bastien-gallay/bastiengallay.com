// VSM scrollspy — article 2/3 « Coder avec l'IA ».
// Pilote l'état du rail Value Stream Map (cf. macros/vsm.html + _vsm.scss)
// au fil du scroll. Déclenché par les ancres `.vsm-trigger` posées dans le
// markdown via le shortcode `{{ stage(id="…") }}`.
//
// No-op si la page ne contient pas de rail VSM (script global dans base.html).
(function () {
  "use strict";

  var rail = document.querySelector("[data-vsm]");
  var triggers = document.querySelectorAll(".vsm-trigger");
  if (!rail || !triggers.length) return;

  // Diagrammes injectés dans le zoom. Tracés en currentColor → suivent la
  // couleur accent posée par CSS (.vsm__zoom-x), donc s'adaptent au thème.
  var EXTRAS = {
    miniCommit:
      '<svg viewBox="0 0 220 46" role="img" aria-label="Commit jour 1 : CI, hooks, coverage avant la 1re règle">' +
      '<g font-family="monospace" font-size="7.5" fill="currentColor">' +
      '<text x="2" y="12" opacity="0.7">d153ad8 scaffold: CI, hooks…</text>' +
      '<text x="2" y="26" opacity="0.7">+ SECURITY.md + clippy + coverage</text>' +
      '<text x="2" y="40">— 1re règle métier : plus tard</text></g></svg>',
    loop:
      '<svg viewBox="0 0 220 88" role="img" aria-label="Boucle Red, Green, Refactor, Reflect">' +
      '<g fill="none" stroke="currentColor" stroke-width="1.4">' +
      '<circle cx="110" cy="44" r="30" stroke-dasharray="3 3"/>' +
      '<path d="M110 14 l-4 6 l8 0 z" fill="currentColor" stroke="none"/></g>' +
      '<g font-family="sans-serif" font-size="7.5" fill="currentColor" text-anchor="middle">' +
      '<text x="110" y="20" opacity="0.7">Red</text><text x="138" y="47" opacity="0.7">Green</text>' +
      '<text x="110" y="76" opacity="0.7">Refactor</text>' +
      '<text x="74" y="47" font-weight="700">Reflect</text></g></svg>',
    debt:
      '<svg viewBox="0 0 220 60" role="img" aria-label="Triple dette : technique, cognitive, intent">' +
      '<g font-family="sans-serif" font-size="7" fill="currentColor">' +
      '<rect x="6" y="8" width="64" height="18" rx="2" fill="currentColor" opacity="0.3"/>' +
      '<text x="38" y="20" text-anchor="middle">technical</text>' +
      '<rect x="78" y="8" width="64" height="18" rx="2" fill="currentColor" opacity="0.6"/>' +
      '<text x="110" y="20" text-anchor="middle">cognitive</text>' +
      '<rect x="150" y="8" width="64" height="18" rx="2" fill="currentColor"/>' +
      '<text x="182" y="20" text-anchor="middle" fill="#fff">intent</text>' +
      '<text x="110" y="44" text-anchor="middle" opacity="0.7">code · gens · artefacts</text></g></svg>',
    out:
      '<svg viewBox="0 0 220 46" role="img" aria-label="Sortie vers l\'article 3">' +
      '<g stroke="currentColor" stroke-width="1.6" fill="none"><path d="M20 32 L176 12"/>' +
      '<path d="M176 12 l-10 1 l5 6 z" fill="currentColor" stroke="none"/></g>' +
      '<text x="188" y="10" font-family="sans-serif" font-size="8" fill="currentColor" text-anchor="end">3/3</text></svg>',
    ae:
      '<div class="vsm__ae">' +
      '<div class="vsm__ae-row"><span class="vsm__ae-act">Générer N prototypes</span><span class="vsm__ae-arr">→</span><span class="vsm__ae-eff">échapper à la fixation</span></div>' +
      '<div class="vsm__ae-row"><span class="vsm__ae-act">Death match</span><span class="vsm__ae-arr">→</span><span class="vsm__ae-eff">choisir sur preuve</span></div>' +
      '<div class="vsm__ae-row"><span class="vsm__ae-act">Auto-critique IA croisée</span><span class="vsm__ae-arr">→</span><span class="vsm__ae-eff">casser la complaisance</span></div>' +
      "</div>",
    "": ""
  };

  // Un stage = quelles étapes sont actives / partielles / atténuées + le
  // contenu de la carte zoom. Aligné sur le PLAN (§ par § de l'article).
  var STAGES = {
    full:      { name: "vue complète",  active: [],  active2: [],      partial: [1],                       dim: [],                          zh: "Vue d'ensemble",        zt: "La carte entière de mon travail.",         zn: "8 étapes. La capacité brute vit en 4 ; mon temps, lui, se loge ailleurs.", x: "" },
    full2:     { name: "vue complète",  active: [4], active2: [],      partial: [1, 3],                    dim: [],                          zh: "Étape 4 — génération",  zt: "Là où la courbe METR vit.",                zn: "La plus accélérée, et déjà la moins coûteuse en temps avant l'IA.",        x: "" },
    A:         { name: "Pattern A",     active: [5], active2: [],      partial: [3, 6, 7],                 dim: [1, 2, 4, 8],                zh: "Étape 5 — harnais",     zt: "Le scaffold du jour 1.",                   zn: "CI, hooks, coverage, badges — avant la 1re règle. Rayonne sur 3, 6, 7.",   x: "miniCommit" },
    courage:   { name: "Pivot courage", active: [],  active2: [2, 4, 6], partial: [5],                     dim: [1, 3, 7, 8],                zh: "Ce que le filet autorise", zt: "Oser supprimer, refactorer.",           zn: "Path A jeté vert. Category −3/6 en 24 h. Possible parce que 5 protège.",   x: "" },
    B:         { name: "Pattern B",     active: [2], active2: [3],     partial: [1],                       dim: [4, 5, 6, 7, 8],             zh: "Étapes 2-3 — juger",    zt: "Casser la complaisance.",                  zn: "",                                                                          x: "ae" },
    C:         { name: "Pattern C'",    active: [6], active2: [],      partial: [],                        dim: [1, 2, 3, 4, 5, 7, 8],       zh: "Étape 6 — la boucle",   zt: "Red → Green → Refactor → Reflect.",        zn: "Reflect intercalé + Reflect macro : exécuter puis inscrire.",              x: "loop" },
    vigilance: { name: "Vigilance",     active: [],  active2: [],      partial: [1, 2, 3, 4, 5, 6, 7, 8],  dim: [],                          zh: "Risque diffus",         zt: "Cognitive & intent debt.",                 zn: "Pas de zone : elles diffusent sur toute la carte.",                        x: "debt" },
    cliff:     { name: "Vers 3/3",      active: [],  active2: [],      partial: [],                        dim: [1, 2, 3, 4, 5, 6, 7, 8],    zh: "Sortie de la carte",    zt: "L'individu produit déjà du collectif.",    zn: "La VSM individuelle s'efface. L'article 3 ouvre sur l'organisation.",      x: "out" }
  };

  var nodes = rail.querySelectorAll("[data-vsm-chain] .vsm__node");
  var elStage = rail.querySelector("[data-vsm-stage]");
  var elZh = rail.querySelector("[data-vsm-zh]");
  var elZt = rail.querySelector("[data-vsm-zt]");
  var elZn = rail.querySelector("[data-vsm-zn]");
  var elZx = rail.querySelector("[data-vsm-zx]");

  function has(arr, n) { return arr.indexOf(n) !== -1; }

  function apply(key) {
    var c = STAGES[key];
    if (!c) return;
    nodes.forEach(function (node) {
      var s = +node.dataset.step;
      node.classList.remove("is-active", "is-active-2", "is-partial", "is-dim");
      if (has(c.active, s)) node.classList.add("is-active");
      else if (has(c.active2, s)) node.classList.add("is-active-2");
      else if (has(c.partial, s)) node.classList.add("is-partial");
      else if (has(c.dim, s)) node.classList.add("is-dim");
    });
    if (elStage) elStage.textContent = c.name;
    if (elZh) elZh.textContent = c.zh;
    if (elZt) elZt.textContent = c.zt;
    if (elZn) elZn.textContent = c.zn;
    if (elZx) elZx.innerHTML = EXTRAS[c.x] || "";
  }

  // Bande de déclenchement au milieu du viewport : un trigger qui y entre
  // active son stage, qui persiste jusqu'au trigger suivant.
  var obs = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) apply(e.target.dataset.stage);
      });
    },
    { rootMargin: "-40% 0px -45% 0px", threshold: 0 }
  );
  triggers.forEach(function (t) { obs.observe(t); });

  // État initial : la clé du premier trigger, sinon vue complète.
  apply(triggers[0].dataset.stage || "full");
})();
