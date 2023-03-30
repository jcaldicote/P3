import { fetchWorks } from "./api.js";
import { fetchFilterBar } from "./api.js";
import { check } from "./auth.js";
import { createAppend } from "./dom.js";

const gallery = document.querySelector(".gallery");
const filterBar = document.querySelector(".filterBar");
const isAdmin = document.querySelectorAll(".isAdmin");
const isAdminHide = document.querySelectorAll(".isAdminHide");

//Affichage de la galerie par défaut

function renderWork(work) {
  const workElm = createAppend("figure", gallery);
  const imgElm = createAppend("img", workElm);
  imgElm.src = work.imageUrl;

  const titreElm = createAppend("figcaption", workElm);
  titreElm.innerText = work.title;
}

function renderWorks(works) {
  for (const work of works) renderWork(work);
}

async function main() {
  const travaux = await fetchWorks();
  renderWorks(travaux);
}
main();

// Affichage du menu filtre des travaux

function renderItemAll() {
  const itemAll = createAppend("button", filterBar);
  itemAll.textContent = "Tous";
  itemAll.classList.add("btn0");
  itemAll.addEventListener("click", function () {
    document.querySelector(".gallery").innerHTML = "";
    renderWorks(resultFilter);
  });
}

function renderWorkBar(categorie) {
  const btnElm = createAppend("button", filterBar);
  btnElm.innerText = categorie.name;
  btnElm.classList.add(`btn${categorie.id}`);
  btnElm.addEventListener("click", function () {
    const objectsFilter = resultFilter.filter((object) => {
      return object.category.name == categorie.name;
    });
    document.querySelector(".gallery").innerHTML = "";
    renderWorks(objectsFilter);
  });
}

function renderWorksBar(workBars) {
  renderItemAll();
  for (const item of workBars) {
    renderWorkBar(item);
  }
}

async function filterBarMenu() {
  const items = await fetchFilterBar();
  renderWorksBar(items);
}

filterBarMenu();

const resultFilter = await fetchWorks();

// pour la partie edition de la page d'acceuil

if (check()) {
  for (let i of isAdmin) {
    i.style.display = "block";
  }
  for (let i of isAdminHide) i.style.display = "none";
}
