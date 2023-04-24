import { createAppend } from "./dom.js";

export const gallery = document.querySelector(".gallery");
export const filterBar = document.querySelector(".filterBar");
const categorieElts = document.querySelector("#category");

/// Affichage de la galerie par défaut
export function renderWork(work) {
  const workElm = createAppend("figure", gallery);
  workElm.dataset.id = work.id;
  const imgElm = createAppend("img", workElm);
  imgElm.src = work.imageUrl;

  const titreElm = createAppend("figcaption", workElm);
  titreElm.innerText = work.title;
}

export function renderWorks(works) {
  for (const work of works) renderWork(work);
}

///  Affichage dans le menu Filtre de l'option "Tous" + affichage de la recherche
export function renderItemAll(works) {
  const itemAll = createAppend("button", filterBar);
  itemAll.textContent = "Tous";
  itemAll.classList.add("btn0");
  itemAll.addEventListener("click", function () {
    document.querySelector(".gallery").innerHTML = "";
    renderWorks(works);
  });
}

///  Affichage dans le menu Filtre de l'option "Objets","Appartements","Hotels & restaurants"
/// + affichage du le recherche
export function renderWorkBar(categorie, works) {
  const btnElm = createAppend("button", filterBar);
  btnElm.innerText = categorie.name;
  btnElm.classList.add(`btn${categorie.id}`);
  btnElm.addEventListener("click", function () {
    const objectsFilter = works.filter((object) => {
      return object.category.name == categorie.name;
    });
    document.querySelector(".gallery").innerHTML = "";
    renderWorks(objectsFilter);
  });
}

export function renderWorksBar(workBars, works) {
  renderItemAll(works);
  for (const item of workBars) {
    renderWorkBar(item, works);
  }
}

/// pour le rendu des catégorie dans la section pour ajouter des travaux

export function categorieForAddWork(category) {
  const categoryElm = createAppend("option", categorieElts);
  categoryElm.setAttribute("value", `${category.id}`);
  categoryElm.textContent = `${category.name}`;
}

export function categorieForAddWorks(categorys) {
  for (const work of categorys) categorieForAddWork(work);
}
