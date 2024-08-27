// ;;;;;;;;;;;;;;;;;;;;;;;;;
// ;;  BOTONES ACTIVIDAD  ;;
//;;;;;;;;;;;;;;;;;;;;;;;;;;

document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".toggle-button-subtabs");
  const buttonsB = document.querySelectorAll(".toggle-button-subtabs-baul");
  const contents = document.querySelectorAll(".content-subtabs");
  const contentsBaul = document.querySelectorAll(".content-subtabs-baul");

  function handleButtonClick(buttons, contents, activeButtonClass, activeContentClass) {
    buttons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const clickedButton = event.target;
        const contentIndex = Array.prototype.indexOf.call(buttons, clickedButton);
        const content = contents[contentIndex];

        if (clickedButton.classList.contains(activeButtonClass)) {
          // Button is already active, toggle off
          clickedButton.classList.remove(activeButtonClass);
          content.classList.remove(activeContentClass);
        } else {
          // Button is not active, toggle on
          buttons.forEach((btn) => {
            btn.classList.remove(activeButtonClass);
          });
          clickedButton.classList.add(activeButtonClass);

          contents.forEach((content) => {
            content.classList.remove(activeContentClass);
          });
          content.classList.add(activeContentClass);
        }
      });
    });
  }

  handleButtonClick(buttons, contents, "active-button-subtabs", "active-content-subtabs");
  handleButtonClick(buttonsB, contentsBaul, "active-button-subtabs-baul", "active-content-subtabs-baul");
});





