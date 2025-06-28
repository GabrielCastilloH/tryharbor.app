document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.getElementById("navbarHamburger");
  const overlay = document.getElementById("navbarOverlay");
  const closeBtn = document.getElementById("navbarClose");

  hamburger.addEventListener("click", function () {
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
  });

  closeBtn.addEventListener("click", function () {
    overlay.classList.remove("active");
    document.body.style.overflow = "";
  });

  // Optional: Close overlay when clicking outside or pressing ESC
  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) {
      overlay.classList.remove("active");
      document.body.style.overflow = "";
    }
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      overlay.classList.remove("active");
      document.body.style.overflow = "";
    }
  });
});
