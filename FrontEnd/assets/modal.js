import { fetchWorks } from "./api.js";
import { createAppend } from "./dom.js";
import { deleteWorks } from "./api.js";
import { addWorks } from "./api.js";

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

  //Pour la suppressin des travaux

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
renderWorksModalAll();

//affichage de la modale

modalButtons.addEventListener("click", function (e) {
  e.preventDefault();

  const target = this.dataset.target;

  const modal = document.querySelector(target);

  modal.classList.add("show");
  modalModifyButton.style.display = "block";

  const formAddWorks = document.querySelector(".formAddWorks");
  formAddWorks.classList.add("hide");

  const addPhoto = document.querySelector(".addPhoto");
  addPhoto.classList.add("hide");

  //pour fermer la modale

  modalClose.addEventListener("click", () => {
    modal.classList.remove("show");
    modalModifyButton.style.display = "none";
  });

  modal.addEventListener("click", function () {
    this.classList.remove("show");
    modalModifyButton.style.display = "none";
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
  const appearArrowBack = document.querySelector(".backIcon");
  appearArrowBack.classList.add("display");
  const formAddWorks = document.querySelector(".formAddWorks");
  formAddWorks.classList.remove("hide");
  const addPhoto = document.querySelector(".addPhoto");
  addPhoto.classList.remove("hide");

  // pour revenir sur la modale delete Works via fleche back

  let picadd = document.querySelector(".addNewWorkImg");
  appearArrowBack.addEventListener("click", () => {
    for (let i of hideOnAddPicMode) {
      i.classList.remove("hide");
    }
    appearArrowBack.classList.remove("display");
    formAddWorks.classList.add("hide");
    addPhoto.classList.add("hide");
    document.getElementById("addWork").reset();
  });
});

uploadImg();

/////////// Mécanisme pour uploader une image

function uploadImg() {
  const image_input = document.querySelector(".inputFormAddImg");
  let uploaded_image = "";

  image_input.addEventListener("change", function () {
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
    console.log(res);
    if (res.status === 201) showSuccess("Ajout du travaux avec succes");

    /// pour Nettoyer l'interface d'ajout de travaux
    const addNewWorkImg = document.querySelector(".addNewWorkImg");
    addNewWorkImg.remove();
    const hideOnDisplayAddWorks = document.querySelectorAll(
      ".hideOnDisplayAddWorks"
    );
    for (let i of hideOnDisplayAddWorks) {
      i.classList.remove("hide");
    }

    form.reset();
  });
}

addNewWorks();

function showSuccess(message) {
  alert(message);
}
