// Notes pulldown-cmark : libellés nommés + liens-retour.
//
// 1) Libellés — pulldown-cmark rend l'appel et la définition avec un CHIFFRE.
//    On remplace ce chiffre par un libellé lisible (nom / œuvre / concept),
//    dérivé de la clé de la note (l' id de la définition = le fragment de
//    l'ancre, ex. #beck-tidy). La clé reste la source de vérité ; ce script
//    n'est qu'une couche d'affichage (dégradation propre : sans JS, on garde
//    les chiffres et les définitions restent lisibles, nom en tête de chaque
//    entrée).
//
// 2) Liens-retour — pour chaque définition, ajoute une flèche " ↩ " qui
//    ramène à l'appel dans le corps.
(function () {
  "use strict";

  // Clé de note → libellé affiché (appel en exposant + repère de la liste).
  // Garder concis : le libellé sert de poignée, le texte de la note porte la
  // citation complète. Tenir à jour quand on ajoute/retire une note.
  var LABELS = {
    "1090": "Hallam · Martin",
    "metr-prod": "METR 2025",
    "metr-refonte": "METR 2026",
    "beck-tidy": "Tidy First",
    "beck-90": "Beck, 90 %",
    "speckit": "Spec Kit",
    "openspec": "OpenSpec",
    "bmad": "BMAD",
    "feathers": "Feathers",
    "storey-cog": "Storey, Cognit.",
    "storey-intent": "Storey, Intent",
    "triple-loop": "triple-loop",
    "gerlich": "Gerlich 2025",
  };

  function applyLabels() {
    // Appels dans le corps : <sup class="footnote-reference"><a href="#clé">N</a>
    document.querySelectorAll(".footnote-reference a[href^='#']").forEach(function (a) {
      var key = decodeURIComponent(a.getAttribute("href").slice(1));
      var label = LABELS[key];
      if (label) a.textContent = label;
    });

    // Repère de la liste : <… class="footnote-definition-label"> dans
    // <div class="footnote-definition" id="clé">.
    document.querySelectorAll(".footnote-definition[id]").forEach(function (def) {
      var label = LABELS[def.id];
      if (!label) return;
      var marker = def.querySelector(".footnote-definition-label");
      if (marker) marker.textContent = label;
    });
  }

  function attachBacklinks() {
    var defs = document.querySelectorAll(".footnote-definition");
    defs.forEach(function (def) {
      var id = def.id;
      if (!id) return;

      // Cherche le premier appel dans le corps. Donne-lui un id stable.
      var ref = document.querySelector('a[href="#' + CSS.escape(id) + '"]');
      if (ref && !ref.id) ref.id = "ref-" + id;

      // Ne pas dupliquer le back-link en cas de re-exécution.
      if (def.querySelector(".footnote-backref")) return;

      var lastP = def.querySelector("p:last-of-type") || def;
      var back = document.createElement("a");
      back.href = ref ? "#ref-" + id : "#";
      back.className = "footnote-backref";
      back.setAttribute("aria-label", "Retour à l'appel de note " + id);
      back.textContent = " ↩";
      lastP.appendChild(back);
    });
  }

  function run() {
    applyLabels();
    attachBacklinks();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run);
  } else {
    run();
  }
})();
