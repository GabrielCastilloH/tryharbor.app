// ===== MINIMAL FUNCTIONALITY =====
document.addEventListener("DOMContentLoaded", function () {
  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        // Get navbar height (fixed + margin)
        const navbar = document.querySelector(".navbar");
        let offset = 0;
        if (navbar) {
          offset = navbar.offsetHeight + 24; // 24px margin-top
        }
        const targetPosition =
          target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Mobile navigation functionality
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
