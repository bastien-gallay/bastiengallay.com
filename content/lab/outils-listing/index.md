+++
title = "Atelier d'essais : barre d'outils des listings"
date = 2026-05-23
description = "Comparaison des placements de la barre copier / étendre sur un listing aside. Non listée."
template = "lab-page.html"
+++

Page de comparaison interne. Chaque bloc est le **même listing** flotté à
droite, avec un placement de barre différent (`data-tools`). Deux actions :
**copier** et **étendre** (icône ↔, déplie le bloc sur toute la largeur de la
colonne sans changer la taille du texte). Survole un bouton pour son hint.

## 1 — Footer, fondu au survol

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Le texte de prose
enveloppe l'aside flotté pour reproduire les conditions réelles d'un article.
Le bandeau reste toujours là ; séparateur et icônes apparaissent en fondu au
survol (ou focus clavier). Sed do eiusmod tempor incididunt ut labore et dolore.

{% listing(side="right", tools="footer-hover", caption="LISTING · LUCID-LINT", tag="v0.2.0", tag_color="var(--c-warning)") %}
$ lucid-lint check examples/sample.md
~~~~~ ⟨ • ⟩ ─────  lucid-lint  v0.2.0
                    cognitive accessibility linter · prose · EN / FR
                    ────────────────────────────────────────────────
warning  sample.md:3:1   Sentence is 29 words long (maximum 22).
warning  sample.md:46:1  Sentence has 4 commas (maximum 3).
info     sample.md:1:1   Kandel-Moles ease score 72.9 (target ≤ 9.0).

summary: 7 warnings, 1 info.
score: 50/100
exit: 1
{% end %}

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt
in culpa qui officia deserunt mollit anim id est laborum. Curabitur pretium
tincidunt lacus, nec gravida arcu. Nam aliquet, libero quis aliquam congue.

## 1bis — Footer, chip aligné sur le tag

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Le texte de prose
enveloppe l'aside flotté pour reproduire les conditions réelles d'un article.
Seul un chip coloré (ton du tag) porte les icônes, sa largeur calée sur le tag
du header. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

{% listing(side="right", tools="footer-tag", caption="LISTING · LUCID-LINT", tag="v0.2.0", tag_color="var(--c-warning)") %}
$ lucid-lint check examples/sample.md
~~~~~ ⟨ • ⟩ ─────  lucid-lint  v0.2.0
                    cognitive accessibility linter · prose · EN / FR
                    ────────────────────────────────────────────────
warning  sample.md:3:1   Sentence is 29 words long (maximum 22).
warning  sample.md:46:1  Sentence has 4 commas (maximum 3).
info     sample.md:1:1   Kandel-Moles ease score 72.9 (target ≤ 9.0).

summary: 7 warnings, 1 info.
score: 50/100
exit: 1
{% end %}

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt
in culpa qui officia deserunt mollit anim id est laborum. Curabitur pretium
tincidunt lacus, nec gravida arcu. Nam aliquet, libero quis aliquam congue.

## 2 — Header, 2e ligne (toujours visible)

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Le texte de prose
enveloppe l'aside flotté pour reproduire les conditions réelles d'un article.
Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.

{% listing(side="right", tools="header-row", caption="LISTING · LUCID-LINT", tag="v0.2.0", tag_color="var(--c-warning)") %}
$ lucid-lint check examples/sample.md
~~~~~ ⟨ • ⟩ ─────  lucid-lint  v0.2.0
                    cognitive accessibility linter · prose · EN / FR
                    ────────────────────────────────────────────────
warning  sample.md:3:1   Sentence is 29 words long (maximum 22).
warning  sample.md:46:1  Sentence has 4 commas (maximum 3).
info     sample.md:1:1   Kandel-Moles ease score 72.9 (target ≤ 9.0).

summary: 7 warnings, 1 info.
score: 50/100
exit: 1
{% end %}

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt
in culpa qui officia deserunt mollit anim id est laborum. Curabitur pretium
tincidunt lacus, nec gravida arcu. Nam aliquet, libero quis aliquam congue.

## 2bis — Header, 2e ligne, icônes au survol

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Le texte de prose
enveloppe l'aside flotté pour reproduire les conditions réelles d'un article.
Le séparateur de la 2e ligne reste toujours présent ; seules les icônes
apparaissent en fondu au survol (ou tabulation dans le bloc). Sed do eiusmod.

{% listing(side="right", tools="header-row-hover", caption="LISTING · LUCID-LINT", tag="v0.2.0", tag_color="var(--c-warning)") %}
$ lucid-lint check examples/sample.md
~~~~~ ⟨ • ⟩ ─────  lucid-lint  v0.2.0
                    cognitive accessibility linter · prose · EN / FR
                    ────────────────────────────────────────────────
warning  sample.md:3:1   Sentence is 29 words long (maximum 22).
warning  sample.md:46:1  Sentence has 4 commas (maximum 3).
info     sample.md:1:1   Kandel-Moles ease score 72.9 (target ≤ 9.0).

summary: 7 warnings, 1 info.
score: 50/100
exit: 1
{% end %}

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt
in culpa qui officia deserunt mollit anim id est laborum. Curabitur pretium
tincidunt lacus, nec gravida arcu. Nam aliquet, libero quis aliquam congue.

## 3 — Marge (piste parquée)

> **Note** — piste conservée pour mémoire mais **non retenue** : les icônes
> restent invisibles sous Firefox (rendu du SVG en colonne flex). Ne pas
> reporter en production.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Le texte de prose
enveloppe l'aside flotté pour reproduire les conditions réelles d'un article.
Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.

{% listing(side="right", tools="margin", caption="LISTING · LUCID-LINT", tag="v0.2.0", tag_color="var(--c-warning)") %}
$ lucid-lint check examples/sample.md
~~~~~ ⟨ • ⟩ ─────  lucid-lint  v0.2.0
                    cognitive accessibility linter · prose · EN / FR
                    ────────────────────────────────────────────────
warning  sample.md:3:1   Sentence is 29 words long (maximum 22).
warning  sample.md:46:1  Sentence has 4 commas (maximum 3).
info     sample.md:1:1   Kandel-Moles ease score 72.9 (target ≤ 9.0).

summary: 7 warnings, 1 info.
score: 50/100
exit: 1
{% end %}

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt
in culpa qui officia deserunt mollit anim id est laborum. Curabitur pretium
tincidunt lacus, nec gravida arcu. Nam aliquet, libero quis aliquam congue.

## 3bis — Marge au survol (piste parquée)

Même piste, icônes révélées au survol. Lorem ipsum dolor sit amet, consectetur
adipiscing elit. Le texte de prose enveloppe l'aside flotté pour reproduire les
conditions réelles d'un article. Sed do eiusmod tempor incididunt ut labore et
dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.

{% listing(side="right", tools="margin-hover", caption="LISTING · LUCID-LINT", tag="v0.2.0", tag_color="var(--c-warning)") %}
$ lucid-lint check examples/sample.md
~~~~~ ⟨ • ⟩ ─────  lucid-lint  v0.2.0
                    cognitive accessibility linter · prose · EN / FR
                    ────────────────────────────────────────────────
warning  sample.md:3:1   Sentence is 29 words long (maximum 22).
warning  sample.md:46:1  Sentence has 4 commas (maximum 3).
info     sample.md:1:1   Kandel-Moles ease score 72.9 (target ≤ 9.0).

summary: 7 warnings, 1 info.
score: 50/100
exit: 1
{% end %}

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt
in culpa qui officia deserunt mollit anim id est laborum. Curabitur pretium
tincidunt lacus, nec gravida arcu. Nam aliquet, libero quis aliquam congue.
</content>
