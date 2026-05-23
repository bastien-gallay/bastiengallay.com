// Barre d'outils des listings ({% listing %}) : copier + étendre.
// Injectée en JS (découplée du markup Tera). « Étendre » déplie le bloc à la
// pleine largeur de la colonne (toggle in-place), sans changer la taille du
// texte. Pas de contrôle de taille de police : on laisse le zoom navigateur.
// Icônes seules ; le hint vient du title (sighted) + aria-label (lecteurs
// d'écran).
//
// Placement pilotable par data-tools sur la figure :
//   footer-hover      — bande sous le corps ; séparateur + icônes en fondu
//                       (DÉFAUT prod, retenu après comparaison en /lab/)
//   header            — boutons dans le header coloré, en ligne
//   footer-tag        — bande sous le corps ; chip coloré (ton du tag) sous
//                       les icônes, aligné sur la largeur du tag
//   header-row        — boutons sur une 2e ligne du header (toujours visible)
//   header-row-hover  — idem, séparateur permanent, icônes en fondu au survol
// Vanilla, aucune dépendance. Voir PRODUCT.md § Pattern aside.

(function () {
  "use strict";

  const SVG_NS = "http://www.w3.org/2000/svg";
  const ICONS = {
    copy: "M9 9h9a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1Z M6 15H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v1",
    check: "M5 12.5l4 4 10-10",
    expand: "M3 12h18 M8 7l-5 5 5 5 M16 7l5 5-5 5",
    collapse: "M3 12h18 M4 7l5 5-5 5 M20 7l-5 5 5 5",
  };

  function makeIcon(name) {
    const svg = document.createElementNS(SVG_NS, "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    // Dimensions intrinsèques explicites : sans elles, Firefox ne donne pas de
    // taille au SVG en contexte flex (rendu à 0). Le CSS ajuste l'affichage.
    svg.setAttribute("width", "24");
    svg.setAttribute("height", "24");
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

  function makeBtn(modifier, label, iconName) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "box__btn box__btn--" + modifier;
    btn.setAttribute("aria-label", label);
    btn.title = label;
    btn.appendChild(makeIcon(iconName));
    return btn;
  }

  function setState(btn, iconName, label) {
    btn.replaceChild(makeIcon(iconName), btn.firstChild);
    btn.setAttribute("aria-label", label);
    btn.title = label;
  }

  function makeLive() {
    const live = document.createElement("span");
    live.className = "sr-only";
    live.setAttribute("aria-live", "polite");
    return live;
  }

  document.querySelectorAll(".listing").forEach((listing) => {
    const body = listing.querySelector(".listing__body");
    if (!body) return;
    const code = body.querySelector("code") || body;
    const live = makeLive();

    // — Copier —
    let copyBtn = null;
    if (navigator.clipboard) {
      copyBtn = makeBtn("copy", "Copier le code", "copy");
      let resetTimer = null;
      copyBtn.addEventListener("click", async () => {
        let ok = true;
        try {
          await navigator.clipboard.writeText(code.innerText);
        } catch (_) {
          ok = false;
        }
        copyBtn.classList.toggle("box__btn--done", ok);
        setState(copyBtn, ok ? "check" : "copy", ok ? "Code copié" : "Copier le code");
        live.textContent = ok ? "Copié" : "Échec de la copie";
        window.clearTimeout(resetTimer);
        resetTimer = window.setTimeout(() => {
          copyBtn.classList.remove("box__btn--done");
          setState(copyBtn, "copy", "Copier le code");
          live.textContent = "";
        }, 2000);
      });
    }

    // — Étendre / réduire : toggle pleine largeur (sans changer la police) —
    const expandBtn = makeBtn("expand", "Étendre à pleine largeur", "expand");
    expandBtn.setAttribute("aria-pressed", "false");
    expandBtn.addEventListener("click", () => {
      const on = listing.classList.toggle("listing--expanded");
      expandBtn.setAttribute("aria-pressed", String(on));
      setState(
        expandBtn,
        on ? "collapse" : "expand",
        on ? "Réduire le bloc" : "Étendre à pleine largeur"
      );
      live.textContent = on ? "Bloc étendu" : "Bloc réduit";
    });

    // — Montage selon data-tools —
    const buttons = [copyBtn, expandBtn].filter(Boolean);
    const mode = listing.dataset.tools || "footer-hover";
    const header = listing.querySelector(".listing__header");

    function bar(extraClass) {
      const el = document.createElement("div");
      el.className = "box__toolbar" + (extraClass ? " " + extraClass : "");
      buttons.forEach((b) => el.appendChild(b));
      el.appendChild(live);
      return el;
    }

    if (mode === "footer-hover") {
      // footer-reveal : bandeau permanent ; séparateur + icônes en fondu.
      listing.appendChild(bar("box__toolbar--footer box__toolbar--footer-reveal"));
    } else if (mode === "footer-tag") {
      // Chip coloré (ton réel du tag de CE listing) sous les icônes, largeur
      // alignée sur celle du tag du header.
      const el = document.createElement("div");
      el.className = "box__toolbar box__toolbar--footer box__toolbar--footer-tag";
      const chip = document.createElement("div");
      chip.className = "box__chip";
      buttons.forEach((b) => chip.appendChild(b));
      const tag = listing.querySelector(".listing__tag");
      if (tag) {
        const cs = getComputedStyle(tag);
        chip.style.background = cs.backgroundColor;
        chip.style.color = cs.color;
        chip.style.width = Math.round(tag.getBoundingClientRect().width) + "px";
      }
      el.append(chip, live);
      listing.appendChild(el);
    } else if (mode === "header-row" || mode === "header-row-hover") {
      if (header) {
        header.classList.add("listing__header--stacked");
        // header-row-hover : la 2e ligne (et son séparateur) reste, seules les
        // icônes apparaissent au survol.
        const reveal = mode === "header-row-hover" ? " box__toolbar--btn-reveal" : "";
        header.appendChild(bar("box__toolbar--header-row" + reveal));
      }
    } else if (mode === "margin" || mode === "margin-hover") {
      // Piste PARQUÉE (icônes invisibles sous Firefox en marge) — conservée
      // dans le lab pour mémoire, non retenue pour la prod.
      listing.classList.add("box--has-margin-tools");
      const reveal = mode === "margin-hover" ? " box__toolbar--btn-reveal" : "";
      listing.appendChild(bar("box__toolbar--margin" + reveal));
    } else if (header) {
      buttons.forEach((b) => header.appendChild(b));
      header.appendChild(live);
    } else {
      listing.classList.add("box--has-tools");
      listing.appendChild(bar("box__tools"));
    }

    // Overflow horizontal atteignable au clavier (WCAG 2.1.1).
    if (!body.hasAttribute("tabindex")) {
      body.setAttribute("tabindex", "0");
    }
  });
})();
