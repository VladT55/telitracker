export let dom = {
  open_modal: function () {
    let button_create = document.querySelector(".nav-item-button");
    button_create.addEventListener("click", () => {
      let modal = document.querySelector(".modal-overlay");
      modal.style.display = "flex";
    });
  },
  close_modal: function () {
    let button_close_top = document.querySelector(".modal-close-button");
    let button_close_cancel = document.querySelector(".close-modal");

    button_close_top.addEventListener("click", () => {
      let modal = document.querySelector(".modal-overlay");
      modal.style.display = "none";
    });

    button_close_cancel.addEventListener("click", () => {
      let modal = document.querySelector(".modal-overlay");
      modal.style.display = "none";
    });
  },
};
