import { fetchWorks } from "./api.js";
import { fetchFilterBar } from "./api.js";
import { check } from "./auth.js";
import { renderWorks, renderWorksBar, categorieForAddWorks } from "./galery.js";

const isAdmin = document.querySelectorAll(".isAdmin");
const isAdminHide = document.querySelectorAll(".isAdminHide");

async function main() {
  const travaux = await fetchWorks();
  renderWorks(travaux);

  const items = await fetchFilterBar();
  renderWorksBar(items, travaux);
}
main();

// pour la partie mode edition de la page d'acceuil

if (check()) {
  for (let i of isAdmin) {
    i.style.display = "inline";
  }
  for (let i of isAdminHide) i.style.display = "none";
}

// pour la partie Logout

const logOut = document.querySelector(".logOut");

logOut.addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.clear();
  location.pathname = "/";
});

//pour le rendu des catégorie dans la section pour ajouter des travaux

async function categorieForAddWorksRender() {
  const category = await fetchFilterBar();
  categorieForAddWorks(category);
  console.log(category);
}

categorieForAddWorksRender();
