// Reveal au scroll des figures éditoriales (.visuel[data-anchor]).
//
// Pose `.is-revealed` une seule fois quand la figure entre dans le viewport.
// Toute la chorégraphie vit en CSS (_editorial.scss) :
//   - entrée commune : fondu + léger rise sur chaque figure ;
//   - signature Figure 2 : barres qui poussent depuis l'axe 0 % en cascade
//     (prédit → perçu → mesuré, le mesuré partant à gauche = la bascule),
//     puis valeurs et pill d'écart en fondu.
//
// État initial caché gardé par `:root.js` (classe posée en <head> avant la
// première peinture) : sans JS, aucune figure n'est masquée, pas de flash.
// prefers-reduced-motion est neutralisé côté CSS (état final forcé), donc
// rien de spécial à faire ici.
//
// CUPID :
//   - Predictable : un observer, un seuil, un seul passage ; pas d'état
//     global, pas de retrait de classe, pas de timer.
//   - Composable : ne touche qu'une classe, n'interfère ni avec
//     figures-spotlight.js (hover) ni avec le scrollspy du rail.
(function () {
  "use strict";

  function init() {
    var figures = document.querySelectorAll(
      ".ecrit-page__content .visuel[data-anchor]"
    );
    if (figures.length === 0) return;

    // Sans IntersectionObserver (navigateur très ancien) : on révèle tout
    // d'emblée plutôt que de laisser des figures invisibles.
    if (!("IntersectionObserver" in window)) {
      figures.forEach(function (fig) { fig.classList.add("is-revealed"); });
      return;
    }

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-revealed");
          io.unobserve(entry.target);
        });
      },
      // Déclenche quand ~25 % de la figure est visible, avec une marge basse
      // de 10 % pour amorcer l'anim juste avant qu'elle soit pleinement à
      // l'écran (la chorégraphie a le temps de se jouer en arrivant).
      { threshold: 0.25, rootMargin: "0px 0px -10% 0px" }
    );

    figures.forEach(function (fig) { io.observe(fig); });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
