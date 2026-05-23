// Spotlight figure ↔ paragraphe ancré.
//
// Au mouseenter d'une figure `[data-anchor="fig-N"]` (ou d'une marque
// `.mark--soft[data-fig="N"]`), pose `.is-active` sur la figure + toutes
// les marques de même clé, ET bascule `.is-anchoring` sur le wrapper
// `.ecrit-page__content`. Au mouseleave, on retire tout.
//
// Le CSS dans _editorial.scss (sous `@media (hover: hover)…`) fait le
// reste : transition d'opacité sur les inactifs, soulignement renforcé
// sur la marque active.
//
// Activé uniquement sur desktop avec hover réel ET viewport ≥ 60rem
// (cohérent avec le breakpoint de la marge sticky des figures).
//
// CUPID :
//   - Composable : ne touche que les data-attrs + 2 classes CSS,
//     n'inflige rien aux autres scripts.
//   - Predictable : pas de timer, pas d'observer scroll, pas d'état
//     global persistant — chaque entrée/sortie est explicite.
(function () {
  "use strict";

  function init() {
    var mq = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (min-width: 60rem)"
    );
    if (!mq.matches) return;

    var content = document.querySelector(".ecrit-page__content");
    if (!content) return;

    var figures = content.querySelectorAll(".visuel[data-anchor]");
    var marks = content.querySelectorAll(".mark--soft[data-fig]");
    if (figures.length === 0 && marks.length === 0) return;

    // Map clé fig-N → { figure, marks: [] }. Une clé peut n'avoir qu'un
    // des deux côtés (figure sans pivot prose, ou marque orpheline) ;
    // le spotlight reste fonctionnel dans les deux cas.
    var pairs = new Map();

    function ensurePair(key) {
      if (!pairs.has(key)) {
        pairs.set(key, { figure: null, marks: [] });
      }
      return pairs.get(key);
    }

    figures.forEach(function (fig) {
      ensurePair(fig.dataset.anchor).figure = fig;
    });
    marks.forEach(function (m) {
      ensurePair("fig-" + m.dataset.fig).marks.push(m);
    });

    function setActive(key, active) {
      var pair = pairs.get(key);
      if (!pair) return;
      if (active) {
        content.classList.add("is-anchoring");
        if (pair.figure) pair.figure.classList.add("is-active");
        pair.marks.forEach(function (m) { m.classList.add("is-active"); });
      } else {
        content.classList.remove("is-anchoring");
        if (pair.figure) pair.figure.classList.remove("is-active");
        pair.marks.forEach(function (m) { m.classList.remove("is-active"); });
      }
    }

    pairs.forEach(function (pair, key) {
      var enter = function () { setActive(key, true); };
      var leave = function () { setActive(key, false); };
      if (pair.figure) {
        pair.figure.addEventListener("mouseenter", enter);
        pair.figure.addEventListener("mouseleave", leave);
      }
      pair.marks.forEach(function (m) {
        m.addEventListener("mouseenter", enter);
        m.addEventListener("mouseleave", leave);
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
