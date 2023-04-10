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
  let appearArrowBack = document.querySelector(".backIcon");
  appearArrowBack.classList.add("display");

  const divAddPicTxt = document.querySelector(".modal-header");
  const divAddPicTxtElt = createAppend("p", divAddPicTxt);
  divAddPicTxtElt.innerText = "Ajout Photo";

  const formElt = createAppend("form", divAddPicTxt);
  formElt.setAttribute("name", "addWork");
  formElt.setAttribute("id", "addWork");
  formElt.setAttribute("method", "post");
  formElt.setAttribute("enctype", "multipart/form-data");

  const importPicture = createAppend("div", formElt);
  importPicture.setAttribute("class", "importPicture");
  const importPicturImg = createAppend("img", importPicture);
  importPicturImg.setAttribute("src", "./assets/images/imageload.svg");

  const formAddImg = createAppend("div", importPicture);
  formAddImg.setAttribute("class", "formAddImg");

  const labelAddWork = createAppend("label", formAddImg);
  labelAddWork.setAttribute("class", "labelAddWork");
  labelAddWork.setAttribute("for", "file");
  labelAddWork.textContent = " + Ajouter photo";

  const inputImg = createAppend("input", formAddImg);
  inputImg.setAttribute("type", "file");
  inputImg.setAttribute("name", "image");
  inputImg.setAttribute("id", "file");
  inputImg.setAttribute("accept", ".png, .jpeg, .jpg");
  inputImg.setAttribute("size", "4000000");
  inputImg.setAttribute("class", "inputFormAddImg");
  inputImg.setAttribute("required", "");
  inputImg.setAttribute("hidden", "");

  const spanAddPicture = createAppend("span", importPicture);
  spanAddPicture.textContent = "jpg, png : 4mo max";

  const formLabel = createAppend("label", formElt);
  formLabel.setAttribute("class", "formLabel");
  formLabel.setAttribute("for", "title");
  formLabel.textContent = "Titre";

  const formInput = createAppend("input", formElt);
  formInput.setAttribute("class", "formInput");
  formInput.setAttribute("type", "text");
  formInput.setAttribute("name", "title");
  formInput.setAttribute("id", "title");
  formInput.setAttribute("required", "");

  const formLabelCat = createAppend("label", formElt);
  formLabelCat.setAttribute("class", "formLabel");
  formLabelCat.setAttribute("for", "categoryselect");
  formLabelCat.textContent = "Catégorie";

  const formInputSelect = createAppend("select", formElt);
  formInputSelect.setAttribute("class", "formInput");
  formInputSelect.setAttribute("name", "category");
  formInputSelect.setAttribute("id", "category");
  formInputSelect.setAttribute("required", "");

  const optionSelect = createAppend("option", formInputSelect);
  optionSelect.setAttribute("value", "blank-value");
  optionSelect.textContent = "";
  const optionSelect1 = createAppend("option", formInputSelect);
  optionSelect1.setAttribute("value", "1");
  optionSelect1.textContent = "Objets";
  const optionSelect2 = createAppend("option", formInputSelect);
  optionSelect2.setAttribute("value", "2");
  optionSelect2.textContent = "Appartements";
  const optionSelect3 = createAppend("option", formInputSelect);
  optionSelect3.setAttribute("value", "3");
  optionSelect3.textContent = "Hotels & restaurants";

  const hr = createAppend("hr", formElt);
  const confirmBtn = createAppend("button", formElt);
  confirmBtn.setAttribute("class", "confirm-Btn");
  confirmBtn.textContent = "Valider";
  uploadImg();
  addWork();
});

/////////// Mécanisme pour uploader une image non fonctionnel
function uploadImg() {
  const image_input = document.querySelector(".inputFormAddImg");
  let uploaded_image = "";

  image_input.addEventListener("change", function () {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      uploaded_image = reader.result;
      document.querySelector(
        ".importPicture"
      ).style.backgroundImage = `url(${uploaded_image})`;
    });
    reader.readAsDataURL(this.files[0]);
  });
}

///////  Mécanisme pour envoyer un nouveau projet -test code

async function addWork() {
  const submitBtn = document.querySelector(".confirm-Btn");

  submitBtn.addEventListener("submit", async (e) => {
    e.preventDefault();
    const apiUrl = "http://localhost:5678/api/works";

    const formData = new FormData();

    const titleInput = document.querySelector('input[name="title"]');
    const title = titleInput.value;

    const fileInput = document.querySelector('input[name="image"]');
    const file = fileInput.files[0];

    const categorySelect = document.querySelector('select[id="category"]');
    const category = categorySelect.value;

    formData.append("title", title);
    formData.append("image", file);
    formData.append("category", category);

    console.log(formData);

    const token = JSON.parse(`${localStorage.getItem("token")}`);
    await fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
  });
}
