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