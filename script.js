// ===== MOBILE MENU TOGGLE =====
document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const navDownload = document.querySelector(".nav-download");

  hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
    navDownload.classList.toggle("active");
  });

  // Close mobile menu when clicking on a link
  document.querySelectorAll(".nav-menu a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
      navDownload.classList.remove("active");
    });
  });
});

// ===== SMOOTH SCROLL FOR NAVIGATION LINKS =====
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// ===== SCROLL-BASED NAVIGATION STYLING =====
window.addEventListener("scroll", function () {
  const header = document.querySelector(".header");
  if (window.scrollY > 100) {
    header.style.background = "rgba(255, 255, 255, 0.98)";
    header.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
  } else {
    header.style.background = "rgba(255, 255, 255, 0.95)";
    header.style.boxShadow = "none";
  }
});

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe all cards for animation
document
  .querySelectorAll(".step-card, .feature-card, .audience-card")
  .forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(card);
  });

// ===== PHOTO BLUR REVEAL SIMULATOR =====
function createBlurSimulator() {
  const phoneScreen = document.querySelector(".phone-screen");
  if (!phoneScreen) return;

  // Create a blur overlay
  const blurOverlay = document.createElement("div");
  blurOverlay.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.9);
        backdrop-filter: blur(10px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10;
        transition: all 0.5s ease;
    `;

  blurOverlay.innerHTML = `
        <div style="text-align: center; color: #2D6A4F;">
            <div style="font-size: 2rem; margin-bottom: 1rem;">🕶️</div>
            <p style="font-size: 0.9rem; margin: 0;">Photo will reveal after 20-30 minutes of chatting</p>
        </div>
    `;

  phoneScreen.appendChild(blurOverlay);

  // Simulate gradual reveal on hover
  phoneScreen.addEventListener("mouseenter", () => {
    blurOverlay.style.backdropFilter = "blur(5px)";
    blurOverlay.style.background = "rgba(255, 255, 255, 0.5)";
  });

  phoneScreen.addEventListener("mouseleave", () => {
    blurOverlay.style.backdropFilter = "blur(10px)";
    blurOverlay.style.background = "rgba(255, 255, 255, 0.9)";
  });
}

// Initialize blur simulator
setTimeout(createBlurSimulator, 2000);

// ===== CTA BUTTON RIPPLE EFFECT =====
function createRippleEffect(event) {
  const button = event.currentTarget;
  const ripple = document.createElement("span");
  const rect = button.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;

  ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    `;

  button.appendChild(ripple);

  setTimeout(() => {
    ripple.remove();
  }, 600);
}

// Add ripple effect to all buttons
document
  .querySelectorAll(".app-store-btn, .google-play-btn, .download-btn")
  .forEach((button) => {
    button.style.position = "relative";
    button.style.overflow = "hidden";
    button.addEventListener("click", createRippleEffect);
  });

// ===== POPUP SIMULATION =====
function showContinuePopup() {
  const popup = document.createElement("div");
  popup.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 2rem;
        border-radius: 20px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        text-align: center;
        max-width: 400px;
        animation: popupSlideIn 0.3s ease;
    `;

  popup.innerHTML = `
        <div style="font-size: 3rem; margin-bottom: 1rem;">💬</div>
        <h3 style="color: #2D6A4F; margin-bottom: 1rem;">Continue this conversation?</h3>
        <p style="color: #6C757D; margin-bottom: 2rem;">You've been chatting for 25 minutes. Would you like to reveal your photos and continue?</p>
        <div style="display: flex; gap: 1rem; justify-content: center;">
            <button onclick="this.parentElement.parentElement.remove()" style="
                padding: 10px 20px;
                border: 2px solid #E9ECEF;
                background: white;
                border-radius: 8px;
                cursor: pointer;
                transition: all 0.3s ease;
            ">Not Yet</button>
            <button onclick="this.parentElement.parentElement.remove()" style="
                padding: 10px 20px;
                background: linear-gradient(135deg, #52B788, #2D6A4F);
                color: white;
                border: none;
                border-radius: 8px;
                cursor: pointer;
                transition: all 0.3s ease;
            ">Continue</button>
        </div>
    `;

  document.body.appendChild(popup);

  // Auto-remove after 5 seconds
  setTimeout(() => {
    if (popup.parentElement) {
      popup.remove();
    }
  }, 5000);
}

// Show popup after 10 seconds
setTimeout(showContinuePopup, 10000);

// ===== DOWNLOAD BUTTON FUNCTIONALITY =====
document
  .querySelectorAll(".app-store-btn, .google-play-btn")
  .forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();

      // Simulate download action
      const originalText = this.innerHTML;
      this.innerHTML = '<i class="fas fa-download"></i> Downloading...';
      this.style.opacity = "0.7";

      setTimeout(() => {
        this.innerHTML = originalText;
        this.style.opacity = "1";

        // Show success message
        const successMsg = document.createElement("div");
        successMsg.style.cssText = `
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: #28A745;
                color: white;
                padding: 1rem 2rem;
                border-radius: 10px;
                z-index: 10000;
                animation: slideInRight 0.3s ease;
            `;
        successMsg.textContent = "Download started!";
        document.body.appendChild(successMsg);

        setTimeout(() => {
          successMsg.remove();
        }, 3000);
      }, 2000);
    });
  });

// ===== ADDITIONAL CSS ANIMATIONS =====
const style = document.createElement("style");
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes popupSlideIn {
        from {
            opacity: 0;
            transform: translate(-50%, -60%);
        }
        to {
            opacity: 1;
            transform: translate(-50%, -50%);
        }
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }
    
    @media (max-width: 768px) {
        .nav-menu.active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background: white;
            padding: 2rem;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }
        
        .nav-download.active {
            display: block;
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background: white;
            padding: 1rem 2rem;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }
    }
`;
document.head.appendChild(style);

// ===== LAZY LOADING FOR BETTER PERFORMANCE =====
const lazyImages = document.querySelectorAll("img[data-src]");
const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.classList.remove("lazy");
      imageObserver.unobserve(img);
    }
  });
});

lazyImages.forEach((img) => imageObserver.observe(img));

// ===== SCROLL PROGRESS INDICATOR =====
function createScrollProgress() {
  const progressBar = document.createElement("div");
  progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #52B788, #2D6A4F);
        z-index: 10001;
        transition: width 0.1s ease;
    `;
  document.body.appendChild(progressBar);

  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + "%";
  });
}

createScrollProgress();
