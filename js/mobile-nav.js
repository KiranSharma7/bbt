(function () {
  var toggle = document.querySelector(".menu-toggle");
  var menu = document.getElementById("mobile-menu");
  if (!toggle || !menu) return;

  function closeMenu() {
    menu.hidden = true;
    toggle.setAttribute("aria-expanded", "false");
  }

  function openMenu() {
    menu.hidden = false;
    toggle.setAttribute("aria-expanded", "true");
  }

  toggle.addEventListener("click", function () {
    if (menu.hidden) {
      openMenu();
    } else {
      closeMenu();
    }
  });

  menu.addEventListener("click", function (event) {
    if (event.target.closest("a")) {
      closeMenu();
    }
  });

  document.addEventListener("click", function (event) {
    if (!menu.hidden && !menu.contains(event.target) && !toggle.contains(event.target)) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && !menu.hidden) {
      closeMenu();
      toggle.focus();
    }
  });

  var desktopQuery = window.matchMedia("(min-width: 981px)");
  function handleDesktop(event) {
    if (event.matches) closeMenu();
  }
  if (desktopQuery.addEventListener) {
    desktopQuery.addEventListener("change", handleDesktop);
  } else {
    desktopQuery.addListener(handleDesktop);
  }
})();
