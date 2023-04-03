const modalButtons = document.querySelectorAll("[data-toggle = modal");
const modalModifyButton = document.querySelector(".isAdminModal");

for (let button of modalButtons) {
  button.addEventListener("click", function (e) {
    e.preventDefault();

    let target = this.dataset.target;

    let modal = document.querySelector(target);

    modal.classList.add("show");
    modalModifyButton.style.display = "block";

    //pour fermer la modale

    const modalClose = modal.querySelectorAll("[data-dismiss=dialog]");
    for (let close of modalClose) {
      close.addEventListener("click", () => {
        modal.classList.remove("show");
        modalModifyButton.style.display = "none";
      });
    }
    modal.addEventListener("click", function () {
      this.classList.remove("show");
      modalModifyButton.style.display = "none";
    });
    modal.children[0].addEventListener("click", function (e) {
      e.stopPropagation();
    });
  });
}
