
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn-subtema')) {
      var dropdowns = document.getElementsByClassName("dropdown-subtema-content");
      for (var i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.style.display === "block") {
          openDropdown.style.display = "none";
        }
      }
    }
  }




  