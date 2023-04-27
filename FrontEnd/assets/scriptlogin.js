import { fetchLogin } from "./api.js";
import { tokenSave } from "./auth.js";

////Mécanisme pour la phase de connexion

const formEl = document.querySelector("#loginForm");
const loginReject = document.querySelector(".loginReject");

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
});
