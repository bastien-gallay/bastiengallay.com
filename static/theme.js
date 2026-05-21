// Toggle thème light/dark + scrollspy léger pour la nav latérale.
// Vanilla, ~50 lignes, aucune dépendance.

(function () {
  "use strict";

  const root = document.documentElement;
  const STORAGE_KEY = "theme";

  function currentTheme() {
    const set = root.getAttribute("data-theme");
    if (set === "light" || set === "dark") return set;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark" : "light";
  }

  function applyTheme(next) {
    root.setAttribute("data-theme", next);
    try { localStorage.setItem(STORAGE_KEY, next); } catch (_) { /* ignore */ }
    updateToggleLabel(next);
  }

  function updateToggleLabel(theme) {
    const label = document.querySelector("[data-theme-label]");
    if (!label) return;
    label.textContent = theme === "dark" ? "Clair" : "Sombre";
  }

  document.querySelectorAll("[data-theme-toggle]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const next = currentTheme() === "dark" ? "light" : "dark";
      applyTheme(next);
    });
  });

  updateToggleLabel(currentTheme());

  // Rail brand fade — le bloc texte du brand n'apparaît qu'après scroll
  // hors du hero. Évite le doublon "Bastien Gallay" rail + hero quand le
  // hero est à l'écran. Cible #intro si présent, sinon le premier .hero.
  const rail = document.querySelector("[data-rail]");
  const heroEl = document.getElementById("intro") || document.querySelector(".hero");
  if (rail && heroEl && "IntersectionObserver" in window) {
    const railIo = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        rail.classList.toggle("rail--scrolled", !e.isIntersecting);
      });
    }, { rootMargin: "-20% 0px 0px 0px", threshold: 0 });
    railIo.observe(heroEl);
  } else if (rail) {
    // Pas de hero : afficher le brand tout de suite.
    rail.classList.add("rail--scrolled");
  }

  // Scrollspy — marque le lien de la section visible. Le rail utilise des
  // URLs absolues pour fonctionner depuis n'importe quelle route ; on ne
  // garde donc que les liens qui pointent vers la page courante avec un hash.
  const here = location.pathname.replace(/\/+$/, "") || "/";
  const links = Array.from(document.querySelectorAll(".rail__link")).filter((a) => {
    const u = new URL(a.href, location.href);
    const path = u.pathname.replace(/\/+$/, "") || "/";
    return u.hash && path === here;
  });
  if (links.length && "IntersectionObserver" in window) {
    const byId = new Map();
    links.forEach((a) => {
      const id = new URL(a.href, location.href).hash.slice(1);
      const target = document.getElementById(id);
      if (target) byId.set(target, a);
    });

    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        const link = byId.get(e.target);
        if (!link) return;
        if (e.isIntersecting) {
          links.forEach((l) => l.removeAttribute("aria-current"));
          link.setAttribute("aria-current", "true");
        }
      });
    }, { rootMargin: "-30% 0px -60% 0px", threshold: 0 });

    byId.forEach((_, target) => io.observe(target));
  }
})();
