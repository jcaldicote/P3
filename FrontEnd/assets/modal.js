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
    if (window.confirm("Confirmer sur OK pour supprimer le projet")) {
      deleteWorks(work.id);
      workElm.remove();
      document.querySelector(`.gallery>[data-id="${work.id}"]`).remove();
    } else {
      return;
    }
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

/// Pour l'affichage de la modale

modalButtons.addEventListener("click", function (e) {
  e.preventDefault();
  const target = this.dataset.target;
  displayModal(target, ".modal-galery");
  modalModifyButton.style.display = "block";

  ///Pour fermer la modale

  modalClose.addEventListener("click", () => {
    hideModal(".modal");
    modalModifyButton.style.display = "none";
  });

  modal.addEventListener("click", function () {
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
    FormReset();
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
      document
        .querySelector(".backIconWithPicLoad")
        .addEventListener("click", () => {
          const addNewWorkImg = document.querySelector(".addNewWorkImg");
          if (addNewWorkImg === null) return;
          else {
            addNewWorkImg.remove();
            const hideOnDisplayAddWorks = document.querySelectorAll(
              ".hideOnDisplayAddWorks"
            );
            for (let i of hideOnDisplayAddWorks) {
              i.classList.remove("hide");
            }
            FormReset();
          }
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
    if (res.id === undefined) {
      showMessage("Merci de saisir tous les champs du formulaire !!!");
      document.querySelector(".showMessage").classList.add("showMessageNOK");
    } else {
      showMessage("Ajout du projet avec succès !!!");
      const addNewWorkImg = document.querySelector(".addNewWorkImg");
      document.querySelector(".showMessage").classList.add("showMessageOK");
      addNewWorkImg.remove();
      const hideOnDisplayAddWorks = document.querySelectorAll(
        ".hideOnDisplayAddWorks"
      );
      for (let i of hideOnDisplayAddWorks) {
        i.classList.remove("hide");
      }
      FormReset();

      /// Pour afficher l'ajout de travaux dans la modale + celui de la galerie page accueil

      renderWorkModal(res);
      renderWork(res);

      setTimeout(() => {
        hideModal(".modal");
      }, 2000);
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

/// Function pour reset du formulaire

function FormReset() {
  const forms = document.querySelector(".formAddWorks");
  forms.reset();
}

/// Function pour afficher un message lors de l'ajout de travaux

function showMessage(message) {
  const forms = document.querySelector(".formAddWorks");
  const confimBtn = document.querySelector(".confirm-Btn");
  const spanMessage = createAppend("span", forms);
  spanMessage.classList.add("showMessage");
  spanMessage.innerHTML = message;
  spanMessage.style.display = "inline-block";
  confimBtn.setAttribute("disabled", "true");
  setTimeout(() => {
    spanMessage.style.display = "none";
    spanMessage.innerHTML = "";
    spanMessage.remove();
    confimBtn.removeAttribute("disabled", "true");
  }, 2000);
}
