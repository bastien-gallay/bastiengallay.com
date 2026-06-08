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
  // atténuées, + l'état de la boucle externe (4-6), + le libellé. Le détail
  // vit dans les nœuds (macro), pas ici. Aligné sur le PLAN, section par
  // section. NB : 7 étapes — l'ancien nœud 6 « test/refacto/Reflect » est
  // devenu la boucle externe ; l'ancien 7 → 6, l'ancien 8 → 7.
  var STAGES = {
    full:      { name: "vue complète",  active: [],  active2: [],     partial: [1],                   dim: [],                    loop: "" },
    full2:     { name: "cartographie",  active: [],  active2: [4],    partial: [1, 3],                dim: [],                    loop: "" },
    A:         { name: "Le harnais",   active: [5], active2: [],     partial: [3, 6],                dim: [1, 2, 4, 7],          loop: "partial" },
    courage:   { name: "Le courage",   active: [],  active2: [2],    partial: [5],                   dim: [1, 3, 4, 6, 7],       loop: "partial" },
    B:         { name: "Casser la complaisance", active: [2], active2: [3], partial: [1],            dim: [4, 5, 6],             loop: "dim" },
    C:             { name: "Rigueur du cadre", active: [4], active2: [],     partial: [5, 6],                dim: [1, 2, 3, 7],          loop: "dim",     rgb: true },
    "rigueur-rgb":   { name: "Boucle interne",   active: [4], active2: [],     partial: [5, 6],                dim: [1, 2, 3, 7],          loop: "dim",     rgb: true },
    "rigueur-macro": { name: "Boucle 4–6",       active: [4], active2: [],     partial: [5, 6],                dim: [1, 2, 3, 7],          loop: "active",  rgb: true },
    vigilance: { name: "Vigilance",     active: [7], active2: [],     partial: [1, 2, 3],             dim: [4, 5, 6],             loop: "dim" },
    cliff:     { name: "Le domaine",    active: [1], active2: [],     partial: [],                    dim: [2, 3, 4, 5, 6, 7],    loop: "dim" }
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
    // §1 (intro) : aucun nœud actif, mais la courbe « vit » dans le 04 → on la
    // montre sous le bandeau (le détail porte courbe + boucle ; le CSS choisit).
    if (rail.classList.contains("vsm--intro")) {
      var d4 = rail.querySelector('[data-step="4"] .vsm__detail');
      panel.innerHTML = d4 ? d4.innerHTML : "";
      markZoom();
      return;
    }
    var html = "";
    nodes.forEach(function (node) {
      if (node.classList.contains("is-active") || node.classList.contains("is-active-2")) {
        var d = node.querySelector(".vsm__detail");
        if (d) html += d.innerHTML;
      }
    });
    panel.innerHTML = html;
    markZoom();
  }

  // ── Zoom courbe METR (mobile) ───────────────────────────────────────
  // La courbe vit en petit dans le bandeau ; un tap (ou Entrée/Espace) ouvre
  // un dialog plein écran avec la courbe en grand + sa légende + sa note.
  function markZoom() {
    var m = panel.querySelector(".metr");
    if (!m) return;
    m.setAttribute("role", "button");
    m.setAttribute("tabindex", "0");
    m.setAttribute("aria-label", "Agrandir la courbe METR");
  }

  var zoomDlg = null;
  function openZoom() {
    var src = rail.querySelector('[data-step="4"] .vsm__04--metr .metr');
    if (!src || typeof HTMLDialogElement === "undefined") return;
    if (!zoomDlg) {
      zoomDlg = document.createElement("dialog");
      zoomDlg.className = "metr-zoom";
      zoomDlg.innerHTML =
        '<div class="metr-zoom__head"><button type="button" class="metr-zoom__close" aria-label="Fermer">Fermer ✕</button></div>' +
        '<div class="metr-zoom__body"></div>';
      document.body.appendChild(zoomDlg);
      zoomDlg.querySelector(".metr-zoom__close").addEventListener("click", function () { zoomDlg.close(); });
      zoomDlg.addEventListener("click", function (e) { if (e.target === zoomDlg) zoomDlg.close(); });
    }
    var body = zoomDlg.querySelector(".metr-zoom__body");
    var clone = src.cloneNode(true);
    ["role", "tabindex", "aria-label"].forEach(function (a) { clone.removeAttribute(a); });
    body.innerHTML = "";
    body.appendChild(clone);
    if (typeof zoomDlg.showModal === "function") zoomDlg.showModal();
  }

  if (panel) {
    panel.addEventListener("click", function (e) {
      if (e.target.closest(".metr")) openZoom();
    });
    panel.addEventListener("keydown", function (e) {
      if ((e.key === "Enter" || e.key === " ") && e.target.closest(".metr")) {
        e.preventDefault();
        openZoom();
      }
    });
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
    // État de la boucle externe (étapes 4-6) : classe portée par le rail.
    rail.classList.remove("vsm--loop-active", "vsm--loop-partial", "vsm--loop-dim");
    if (c.loop) rail.classList.add("vsm--loop-" + c.loop);
    // §1 (stage `full`) : la chaîne s'efface, seule la courbe METR reste.
    rail.classList.toggle("vsm--intro", key === "full");
    // La courbe METR ne vit QUE en §1 (intro) et §2 (cartographie) ; dès le
    // harnais elle disparaît (le 04 n'affiche plus rien jusqu'à la boucle).
    rail.classList.toggle("vsm--metr", key === "full" || key === "full2");
    // Dès §rigueur, la boucle interne (TDD+Reflect) occupe le nœud 04.
    rail.classList.toggle("vsm--rgb", !!c.rgb);
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
