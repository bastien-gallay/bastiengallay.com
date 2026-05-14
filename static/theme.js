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

  // Scrollspy — marque le lien de la section visible.
  const links = Array.from(document.querySelectorAll(".rail__link[href^=\"#\"]"));
  if (links.length && "IntersectionObserver" in window) {
    const byId = new Map();
    links.forEach((a) => {
      const id = a.getAttribute("href").slice(1);
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
