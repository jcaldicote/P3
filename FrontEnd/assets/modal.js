import { fetchWorks } from "./api.js";
import { createAppend } from "./dom.js";

const modalButtons = document.querySelector("[data-toggle = modal");
const modalModifyButton = document.querySelector(".isAdminModal");
const modalBody = document.querySelector(".modal-body");

//affichage de la modale

modalButtons.addEventListener("click", function (e) {
  e.preventDefault();

  let target = this.dataset.target;

  let modal = document.querySelector(target);

  modal.classList.add("show");
  modalModifyButton.style.display = "block";

  //affichage de la modale avec la galerie par défaut

  function renderWorkModal(work) {
    const workElm = createAppend("figure", modalBody);
    const imgElm = createAppend("img", workElm);
    const imgElm2 = createAppend("i", workElm);
    imgElm.src = work.imageUrl;
    imgElm2.classList.add("fa-regular");
    imgElm2.classList.add("fa-trash-can");

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

  //pour fermer la modale

  const modalClose = modal.querySelector("[data-dismiss=dialog]");

  modalClose.addEventListener("click", () => {
    modal.classList.remove("show");
    modalModifyButton.style.display = "none";
    modalBody.innerHTML = "";
  });

  modal.addEventListener("click", function () {
    this.classList.remove("show");
    modalModifyButton.style.display = "none";
    modalBody.innerHTML = "";
  });
  modal.children[0].addEventListener("click", function (e) {
    e.stopPropagation();
  });
});
