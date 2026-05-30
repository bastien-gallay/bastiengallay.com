// VSM scrollspy — article 2/3 « Coder avec l'IA ».
// Pilote l'état du rail Value Stream Map (cf. macros/vsm.html + _vsm.scss)
// au fil du scroll, façon maquette A1-v2 : l'étape (ou les étapes) du pattern
// courant grandit sur place et déploie son détail. Déclenché par les ancres
// `.vsm-trigger` posées dans le markdown via `{{ stage(id="…") }}`.
//
// Sur mobile (chaîne en bandeau, détail in-situ masqué), le détail du nœud
// actif est recopié dans `.vsm__panel`.
//
// No-op si la page ne contient pas de rail VSM (script global dans base.html).
(function () {
  "use strict";

  var rail = document.querySelector("[data-vsm]");
  var triggers = document.querySelectorAll(".vsm-trigger");
  if (!rail || !triggers.length) return;

  // Un stage = quelles étapes sont actives / actives-2 / partielles /
  // atténuées, + le libellé. Le détail vit dans les nœuds (macro), pas ici.
  // Aligné sur le PLAN, section par section.
  var STAGES = {
    full:      { name: "vue complète",  active: [],  active2: [],        partial: [1],                      dim: [] },
    full2:     { name: "cartographie",  active: [4], active2: [],        partial: [1, 3],                   dim: [] },
    A:         { name: "Pattern A",     active: [5], active2: [],        partial: [3, 6, 7],                dim: [1, 2, 4, 8] },
    courage:   { name: "Pivot courage", active: [],  active2: [2, 4, 6], partial: [5],                      dim: [1, 3, 7, 8] },
    B:         { name: "Pattern B",     active: [2], active2: [3],       partial: [1],                      dim: [4, 5, 6, 7, 8] },
    C:         { name: "Pattern C'",    active: [6], active2: [],        partial: [],                       dim: [1, 2, 3, 4, 5, 7, 8] },
    vigilance: { name: "Vigilance",     active: [],  active2: [],        partial: [1, 2, 3, 4, 5, 6, 7, 8], dim: [] },
    cliff:     { name: "Vers 3/3",      active: [],  active2: [],        partial: [],                       dim: [1, 2, 3, 4, 5, 6, 7, 8] }
  };

  var nodes = rail.querySelectorAll("[data-vsm-chain] .vsm__node");
  var elStage = rail.querySelector("[data-vsm-stage]");
  var panel = rail.querySelector("[data-vsm-panel]");
  var mobile = window.matchMedia("(max-width: calc(60rem - 1px))");
  var currentKey = null;

  function has(arr, n) { return arr.indexOf(n) !== -1; }

  // Sur mobile, recopie le détail des nœuds actifs (ordre d'étape) dans le
  // panneau ; vide le panneau s'il n'y a pas de nœud focalisé.
  function syncPanel() {
    if (!panel) return;
    if (!mobile.matches) { panel.innerHTML = ""; return; }
    var html = "";
    nodes.forEach(function (node) {
      if (node.classList.contains("is-active") || node.classList.contains("is-active-2")) {
        var d = node.querySelector(".vsm__detail");
        if (d) html += d.innerHTML;
      }
    });
    panel.innerHTML = html;
  }

  function apply(key) {
    var c = STAGES[key];
    if (!c) return;
    currentKey = key;
    nodes.forEach(function (node) {
      var s = +node.dataset.step;
      node.classList.remove("is-active", "is-active-2", "is-partial", "is-dim");
      if (has(c.active, s)) node.classList.add("is-active");
      else if (has(c.active2, s)) node.classList.add("is-active-2");
      else if (has(c.partial, s)) node.classList.add("is-partial");
      else if (has(c.dim, s)) node.classList.add("is-dim");
    });
    if (elStage) elStage.textContent = c.name;
    syncPanel();
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

  // Re-synchronise le panneau au franchissement du breakpoint.
  var onChange = function () { if (currentKey) syncPanel(); };
  if (mobile.addEventListener) mobile.addEventListener("change", onChange);
  else if (mobile.addListener) mobile.addListener(onChange);

  // État initial : la clé du premier trigger, sinon vue complète.
  apply(triggers[0].dataset.stage || "full");
})();
