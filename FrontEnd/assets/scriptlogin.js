import { fetchLogin } from "./api.js";
import { tokenSave } from "./auth.js";

////test login
const formEl = document.querySelector("#loginForm");
const loginReject = document.querySelector(".loginReject");
const hideLoginReject = document.querySelector(".hideoginReject");
formEl.addEventListener("submit", async (e) => {
  e.preventDefault();
  const body = {
    email: formEl.email.value,
    password: formEl.password.value,
  };
  const res = await fetchLogin(body);
  if (res.token == undefined) {
    loginReject.style.display = "block";
    loginReject.addEventListener("mouseover", function (event) {
      event.target.style.display = "none";
    });

    localStorage.clear();
  } else {
    tokenSave(res.token);
    location.pathname = "/";
  }

  // pas enregistrer si pas de token
  // tokenSave(res.token);

  // afficher les messages d'erreur si il y en a ( faire disparaitre avant le fetch)

  // si connecté , rediriger
});
