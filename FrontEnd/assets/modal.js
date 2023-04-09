import { fetchWorks } from "./api.js";
import { createAppend } from "./dom.js";
import { deleteWorks } from "./api.js";

const modalButtons = document.querySelector("[data-toggle = modal");
const modalModifyButton = document.querySelector(".isAdminModal");
const modalBody = document.querySelector(".modal-body");
const modalClose = modal.querySelector("[data-dismiss=dialog]");

//affichage de la galerie par défaut dans la modale non affiché

function renderWorkModal(work) {
  const workElm = createAppend("figure", modalBody);

  const divIconElmGlobal = createAppend("div", workElm);
  divIconElmGlobal.classList.add("divIconElmGlobal");

  const divIconElm1 = createAppend("div", divIconElmGlobal);
  divIconElm1.classList.add("divIconElm1");

  const divIconElm2 = createAppend("div", divIconElmGlobal);
  divIconElm2.classList.add("divIconElm2");

  const iconElm1 = createAppend("img", divIconElm1);
  iconElm1.src = "./assets/images/arrow_.svg";

  const iconElm2 = createAppend("i", divIconElm2);
  iconElm2.classList.add("fa-regular");
  iconElm2.classList.add("fa-trash-can");
  //Test pour la suppression des travaux
  iconElm2.addEventListener("click", function () {
    deleteWorks(work.id);
    modalBody.innerHTML = "";
    renderWorksModalAll();
  });

  const imgElm = createAppend("img", workElm);
  imgElm.src = work.imageUrl;

  const titreElm = createAppend("figcaption", workElm);
  titreElm.innerText = "éditer";
}

function renderWorksModal(works) {
  for (const work of works) renderWorkModal(work);
}

async function renderWorksModalAll() {
  const travaux = await fetchWorks();

  renderWorksModal(travaux);
}
renderWorksModalAll();

//affichage de la modale

modalButtons.addEventListener("click", function (e) {
  e.preventDefault();

  let target = this.dataset.target;

  let modal = document.querySelector(target);

  modal.classList.add("show");
  modalModifyButton.style.display = "block";

  //pour fermer la modale

  modalClose.addEventListener("click", () => {
    modal.classList.remove("show");
    modalModifyButton.style.display = "none";
    // modalBody.innerHTML = "";
  });

  modal.addEventListener("click", function () {
    this.classList.remove("show");
    modalModifyButton.style.display = "none";
    // modalBody.innerHTML = "";
  });
  modal.children[0].addEventListener("click", function (e) {
    e.stopPropagation();
  });
});

// Création de l'interface Ajout photo

const addPic = document.querySelector(".addPic");
addPic.addEventListener("click", () => {
  const hideOnAddPicMode = document.querySelectorAll(".hideOnAddPicMode");
  for (let i of hideOnAddPicMode) {
    i.classList.add("hide");
  }
  const divAddPicTxt = document.querySelector(".modal-header");
  const divAddPicTxtElt = createAppend("p", divAddPicTxt);
  divAddPicTxtElt.innerText = "Ajout Photo";
});
