import { fetchLogin } from "./api.js";
import { tokenSave } from "./auth.js";

////test login
const formEl = document.querySelector("#loginForm");
formEl.addEventListener("submit", async (e) => {
  e.preventDefault();
  const body = {
    email: formEl.email.value,
    password: formEl.password.value,
  };
  const res = await fetchLogin(body);
  // pas enregistrer si pas de token
  tokenSave(res.token);

  // afficher les messages d'erreur si il y en a ( faire disparaitre avant le fetch)

  // si connecté , rediriger
});
