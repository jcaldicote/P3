import { fetchWorks } from "./api.js";
import { createAppend } from "./dom.js";
import { deleteWorks } from "./api.js";
import { addWorks } from "./api.js";
import { renderWork } from "./galery.js";

const modalButtons = document.querySelector("[data-toggle = modal");
const modalModifyButton = document.querySelector(".isAdminModal");
const modalBody = document.querySelector(".modal-body");
const modalClose = modal.querySelector("[data-dismiss=dialog]");
const modalClosePic = document.querySelector(".modal-close-pic");
const confirmBtn = document.querySelector(".confirm-Btn");

///affichage de la galerie par défaut dans la modale non affiché

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

  ///Pour la suppression des travaux

  iconElm2.addEventListener("click", function () {
    deleteWorks(work.id);
    workElm.remove();
    document.querySelector(`.gallery>[data-id="${work.id}"]`).remove();
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

///affichage de la modale

modalButtons.addEventListener("click", function (e) {
  e.preventDefault();

  const target = this.dataset.target;

  displayModal(target, ".modal-galery");
  modalModifyButton.style.display = "block";

  ///pour fermer la modale

  modalClose.addEventListener("click", () => {
    // modal.classList.remove("show");
    hideModal(".modal");
    modalModifyButton.style.display = "none";
  });

  modal.addEventListener("click", function () {
    // this.classList.remove("show");
    // this.classList.add("hide");
    hideModal(".modal");

    modalModifyButton.style.display = "none";
  });
  [...modal.children].forEach((elm) => {
    elm.addEventListener("click", function (e) {
      e.stopPropagation();
    });
  });
});

/// Création de l'interface Ajout photo

document.querySelector(".addPic").addEventListener("click", function () {
  const target = this.dataset.target;
  displayModal(target, ".modal-addphoto");
  hideModal(".modal-galery");

  /// pour revenir sur la modale delete Works via fleche back

  document.querySelector(".backIcon").addEventListener("click", () => {
    displayModal(target, ".modal-galery");
    hideModal(".modal-addphoto");
  });
  modalClosePic.addEventListener("click", () => {
    hideModal(".modal");
  });
});

/////////// Mécanisme pour uploader une image

function uploadImg() {
  let uploaded_image = "";

  document
    .querySelector(".inputFormAddImg")
    .addEventListener("change", function () {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        uploaded_image = reader.result;
        const hideOnDisplayAddWorks = document.querySelectorAll(
          ".hideOnDisplayAddWorks"
        );
        for (let i of hideOnDisplayAddWorks) {
          i.classList.add("hide");
        }
        const importPicture = document.querySelector(".importPicture");
        const addNewWorkImg = createAppend("div", importPicture);
        addNewWorkImg.setAttribute("class", "addNewWorkImg");
        document.querySelector(
          ".addNewWorkImg"
        ).style.backgroundImage = `url(${uploaded_image})`;
      });
      reader.readAsDataURL(this.files[0]);
    });
}

///////  Mécanisme pour envoyer un nouveau projet

async function addNewWorks() {
  const form = document.querySelector(".formAddWorks");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const res = await addWorks(formData);
    if (res.id === undefined)
      alert("Merci de saisir tous les champs du formulaire !!!");
    else {
      /// pour Nettoyer l'interface d'ajout de travaux
      alert("Ajout du travail avec succés");
      const addNewWorkImg = document.querySelector(".addNewWorkImg");
      addNewWorkImg.remove();
      const hideOnDisplayAddWorks = document.querySelectorAll(
        ".hideOnDisplayAddWorks"
      );
      for (let i of hideOnDisplayAddWorks) {
        i.classList.remove("hide");
      }

      form.reset();

      /// Pour afficher la modale avec la galery photo
      // document.querySelector(".modal-galery").classList.remove("hide");
      // hideModal(".modal-addphoto");

      /// Pour afficher l'ajout de travaux dans la modale + celui de la galerie page accueil
      renderWorkModal(res);
      renderWork(res);
      hideModal(".modal");
    }
  });
}

renderWorksModalAll();
uploadImg();
addNewWorks();

/// function pour faire apparaitre /disparaitre les modales

function displayModal(modal, page) {
  const modalEl = document.querySelector(`${modal}`);
  modalEl.classList.remove("hide");

  const pages = document.querySelectorAll(`${modal}>*`);
  pages.forEach((e) => e.classList.add("hide"));

  const pageEl = document.querySelector(`${modal}>${page}`);
  pageEl.classList.remove("hide");
}

function hideModal(modal) {
  const modalEl = document.querySelector(`${modal}`);
  modalEl.classList.add("hide");
}
