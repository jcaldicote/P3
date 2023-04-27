import { fetchWorks } from "./api.js";
import { check } from "./auth.js";
import { renderWorks, renderWorksBar, categorieForAddWorks } from "./galery.js";

const isAdmin = document.querySelectorAll(".isAdmin");
const isAdminHide = document.querySelectorAll(".isAdminHide");

///Function creer la liste des categories à partir de la liste des travaux

function getFiltersFromWorks(works) {
  const filters = new Set();
  for (let work of works) filters.add(JSON.stringify(work.category));
  return [...filters].map((f) => JSON.parse(f));
}

/// Function Global pour récupérer l'ensemble des travaux via requete fetch +  pour leur affichage : menu filtre et catégorie

async function main() {
  const travaux = await fetchWorks();
  renderWorks(travaux);

  const items = getFiltersFromWorks(travaux);
  renderWorksBar(items, travaux);
  categorieForAddWorks(items);
}
main();

// Pour baculer  mode edition de la page d'acceuil

if (check()) {
  for (let i of isAdmin) {
    i.style.display = "inline";
  }
  for (let i of isAdminHide) i.style.display = "none";
}

// Pour la partie Logout

const logOut = document.querySelector(".logOut");

logOut.addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.clear();
  window.location.href = "/";
});
