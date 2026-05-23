// Barre d'outils des listings ({% listing %}) : copier, taille, zoom.
// Injectée en JS (découplée du markup Tera), placée dans le header coloré
// du listing — hors du <pre>, donc immobile au scroll horizontal et sans
// recouvrir le code. Repli en overlay si le listing n'a pas de header.
// Vanilla, aucune dépendance. Voir PRODUCT.md § Pattern aside.
//
// NB : les fenced markdown bruts (```) ne sont pas ciblés ici — ils ne
// servent qu'en home pour l'instant ; leur version « aside » s'écrit en
// {% listing %} et reçoit donc cette barre.

(function () {
  "use strict";

  const SVG_NS = "http://www.w3.org/2000/svg";
  // Icônes monochromes (stroke = currentColor), partagées par les boutons.
  const ICONS = {
    copy: "M9 9h9a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1Z M6 15H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v1",
    check: "M5 12.5l4 4 10-10",
    zoom: "M9 4H4v5 M15 4h5v5 M20 15v5h-5 M4 15v5h5",
    close: "M6 6l12 12 M18 6L6 18",
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

  function makeBtn(modifier, label) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "box__btn box__btn--" + modifier;
    btn.setAttribute("aria-label", label);
    return btn;
  }

  // Région live escamotée, partagée par tous les boutons d'un listing :
  // annonce les changements (copie, taille) aux lecteurs d'écran.
  function makeLive() {
    const live = document.createElement("span");
    live.className = "sr-only";
    live.setAttribute("aria-live", "polite");
    return live;
  }

  // ── Dialog de zoom : un seul pour toute la page, réutilisé. ──────────
  let zoomDialog = null;
  function getZoomDialog() {
    if (zoomDialog) return zoomDialog;
    zoomDialog = document.createElement("dialog");
    zoomDialog.className = "box__zoom";

    const close = document.createElement("button");
    close.type = "button";
    close.className = "box__zoom-close";
    close.setAttribute("aria-label", "Fermer le plein écran");
    close.append(makeIcon("close"), document.createTextNode("Fermer"));
    close.addEventListener("click", () => zoomDialog.close());

    const body = document.createElement("div");
    body.className = "box__zoom-body";

    zoomDialog.append(close, body);
    // Clic sur le backdrop (hors contenu) ferme aussi.
    zoomDialog.addEventListener("click", (e) => {
      if (e.target === zoomDialog) zoomDialog.close();
    });
    document.body.appendChild(zoomDialog);
    return zoomDialog;
  }

  function openZoom(listing) {
    const dialog = getZoomDialog();
    const clone = listing.cloneNode(true);
    // Nettoie les outils du clone et force la pleine taille.
    clone.querySelectorAll(".box__btn, .box__tools").forEach((n) => n.remove());
    clone.classList.remove("listing--side", "listing--right", "listing--left");
    clone.removeAttribute("tabindex");
    clone.querySelectorAll("[tabindex]").forEach((n) =>
      n.removeAttribute("tabindex")
    );
    const caption = listing.querySelector(".listing__caption");
    dialog.setAttribute(
      "aria-label",
      caption ? caption.textContent.trim() : "Bloc de code en plein écran"
    );
    dialog.querySelector(".box__zoom-body").replaceChildren(clone);
    dialog.showModal(); // l'UA piège le focus et restaure au close.
  }

  // ── Injection par listing ────────────────────────────────────────────
  const SIZES = [
    { step: 1, name: "normale" },
    { step: 1.2, name: "agrandie" },
    { step: 1.45, name: "maximale" },
  ];

  document.querySelectorAll(".listing").forEach((listing) => {
    const body = listing.querySelector(".listing__body");
    if (!body) return;
    const code = body.querySelector("code") || body;
    const live = makeLive();

    // — Copier —
    let copyBtn = null;
    if (navigator.clipboard) {
      copyBtn = makeBtn("copy", "Copier le code");
      copyBtn.appendChild(makeIcon("copy"));
      let resetTimer = null;
      copyBtn.addEventListener("click", async () => {
        let ok = true;
        try {
          await navigator.clipboard.writeText(code.innerText);
        } catch (_) {
          ok = false;
        }
        copyBtn.replaceChild(makeIcon(ok ? "check" : "copy"), copyBtn.firstChild);
        copyBtn.classList.toggle("box__btn--done", ok);
        copyBtn.setAttribute("aria-label", ok ? "Code copié" : "Copier le code");
        live.textContent = ok ? "Copié" : "Échec de la copie";
        window.clearTimeout(resetTimer);
        resetTimer = window.setTimeout(() => {
          copyBtn.replaceChild(makeIcon("copy"), copyBtn.firstChild);
          copyBtn.classList.remove("box__btn--done");
          copyBtn.setAttribute("aria-label", "Copier le code");
          live.textContent = "";
        }, 2000);
      });
    }

    // — Taille (cycle S → M → L) —
    const sizeBtn = makeBtn("size", "Changer la taille du texte");
    const lg = document.createElement("span");
    lg.className = "box__size-lg";
    lg.textContent = "A";
    const sm = document.createElement("span");
    sm.className = "box__size-sm";
    sm.textContent = "A";
    sm.setAttribute("aria-hidden", "true");
    lg.setAttribute("aria-hidden", "true");
    sizeBtn.append(lg, sm);
    let sizeIdx = 0;
    sizeBtn.addEventListener("click", () => {
      sizeIdx = (sizeIdx + 1) % SIZES.length;
      const { step, name } = SIZES[sizeIdx];
      body.style.setProperty("--box-size-step", String(step));
      live.textContent = "Taille " + name;
    });

    // — Zoom plein écran —
    let zoomBtn = null;
    if (typeof HTMLDialogElement !== "undefined") {
      zoomBtn = makeBtn("zoom", "Afficher en plein écran");
      zoomBtn.appendChild(makeIcon("zoom"));
      zoomBtn.addEventListener("click", () => openZoom(listing));
    }

    // — Montage de la barre —
    const buttons = [copyBtn, sizeBtn, zoomBtn].filter(Boolean);
    const header = listing.querySelector(".listing__header");
    if (header) {
      buttons.forEach((b) => header.appendChild(b));
      header.appendChild(live);
    } else {
      const tools = document.createElement("div");
      tools.className = "box__tools";
      buttons.forEach((b) => tools.appendChild(b));
      tools.appendChild(live);
      listing.classList.add("box--has-tools");
      listing.appendChild(tools);
    }

    // Overflow horizontal atteignable au clavier (WCAG 2.1.1).
    if (!body.hasAttribute("tabindex")) {
      body.setAttribute("tabindex", "0");
    }
  });
})();
