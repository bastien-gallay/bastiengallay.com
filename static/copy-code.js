// Bouton « copier » sur les listings ({% listing %}). Injecté en JS plutôt
// que dans le template pour rester découplé du markup Tera et préparer la
// barre d'outils partagée (taille / zoom à venir).
// Vanilla, aucune dépendance. Voir PRODUCT.md § Pattern aside.
//
// Placement : dans le header coloré du listing (à droite, après le tag).
// Le header ne défile pas → le bouton ne bouge plus au scroll horizontal et
// ne recouvre plus le code. Repli en overlay si le listing n'a pas de header.
//
// NB : les fenced markdown bruts (```) ne sont pas ciblés ici — ils ne
// servent qu'en home pour l'instant ; leur version « aside » s'écrit en
// {% listing %} et reçoit donc déjà le bouton.

(function () {
  "use strict";

  if (!navigator.clipboard) return; // pas de presse-papier : on n'injecte rien.

  // Icônes monochromes (stroke = currentColor), réutilisables par les
  // futurs boutons (taille / zoom).
  const SVG_NS = "http://www.w3.org/2000/svg";
  const ICONS = {
    copy: "M9 9h9a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1Z M6 15H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v1",
    check: "M5 12.5l4 4 10-10",
  };

  function makeIcon(name) {
    const svg = document.createElementNS(SVG_NS, "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("fill", "none");
    svg.setAttribute("stroke", "currentColor");
    svg.setAttribute("stroke-width", "1.6");
    svg.setAttribute("stroke-linecap", "round");
    svg.setAttribute("stroke-linejoin", "round");
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("focusable", "false");
    const path = document.createElementNS(SVG_NS, "path");
    path.setAttribute("d", ICONS[name]);
    svg.appendChild(path);
    return svg;
  }

  document.querySelectorAll(".listing").forEach((listing) => {
    const body = listing.querySelector(".listing__body");
    if (!body) return;
    const code = body.querySelector("code") || body;

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "box__btn box__btn--copy";
    btn.setAttribute("aria-label", "Copier le code");
    const icon = makeIcon("copy");
    // Région live escamotée : annonce le succès aux lecteurs d'écran sans
    // dépendre du changement d'icône (purement visuel).
    const live = document.createElement("span");
    live.className = "sr-only";
    live.setAttribute("aria-live", "polite");
    btn.append(icon, live);

    let resetTimer = null;

    btn.addEventListener("click", async () => {
      let ok = true;
      try {
        await navigator.clipboard.writeText(code.innerText);
      } catch (_) {
        ok = false;
      }
      btn.replaceChild(makeIcon(ok ? "check" : "copy"), btn.firstChild);
      btn.classList.toggle("box__btn--done", ok);
      btn.setAttribute("aria-label", ok ? "Code copié" : "Copier le code");
      live.textContent = ok ? "Copié" : "Échec de la copie";

      window.clearTimeout(resetTimer);
      resetTimer = window.setTimeout(() => {
        btn.replaceChild(makeIcon("copy"), btn.firstChild);
        btn.classList.remove("box__btn--done");
        btn.setAttribute("aria-label", "Copier le code");
        live.textContent = "";
      }, 2000);
    });

    const header = listing.querySelector(".listing__header");
    if (header) {
      header.appendChild(btn);
    } else {
      // Repli : pas de header → overlay en haut-droite de la figure.
      const tools = document.createElement("div");
      tools.className = "box__tools";
      tools.appendChild(btn);
      listing.classList.add("box--has-tools");
      listing.appendChild(tools);
    }

    // Overflow horizontal atteignable au clavier (WCAG 2.1.1).
    if (!body.hasAttribute("tabindex")) {
      body.setAttribute("tabindex", "0");
    }
  });
})();
