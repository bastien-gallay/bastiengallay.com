// Back-links pour les footnotes pulldown-cmark.
// Pour chaque <div class="footnote-definition" id="N">, retrouve le premier
// <a href="#N"> dans le corps, lui attribue id="ref-N", puis ajoute une
// ancre retour " ↩ " à la fin du dernier <p> de la définition.
(function () {
  "use strict";

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

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", attachBacklinks);
  } else {
    attachBacklinks();
  }
})();
