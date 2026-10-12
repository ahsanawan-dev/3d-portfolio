
"use strict";

/* ======================================
   MUHAMMAD AHSAN AWAN
   PORTFOLIO JAVASCRIPT
====================================== */

document.documentElement.classList.add("js");

// ELEMENTS
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const scene = document.getElementById("scene");
const cubeTilt = document.getElementById("cubeTilt");
const typingText = document.getElementById("typingText");
const progressBar = document.getElementById("scrollProgress");
const yearElement = document.getElementById("year");

// ACCESSIBILITY SETTINGS
const reducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
);

const finePointer = window.matchMedia(
  "(hover: hover) and (pointer: fine)"
);

/* ======================================
   MOBILE NAVIGATION
====================================== */

function closeMenu() {
  navLinks.classList.remove("is-open");

  menuToggle.setAttribute(
    "aria-expanded",
    "false"
  );

  menuToggle.setAttribute(
    "aria-label",
    "Open navigation"
  );
}

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("is-open");

  menuToggle.setAttribute(
    "aria-expanded",
    String(isOpen)
  );

  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation" : "Open navigation"
  );
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
  }
});

document.addEventListener("click", (event) => {
  if (
    !navLinks.contains(event.target) &&
    !menuToggle.contains(event.target)
  ) {
    closeMenu();
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 760) {
    closeMenu();
  }
});

/* ======================================
   TYPING ANIMATION
====================================== */

const words = [
  "Full-Stack Developer",
  "Creative Web Developer",
  "Frontend Enthusiast",
  "Future Software Engineer"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;
let typingTimeout;

function typeWriter() {
  if (!typingText) return;

  const currentWord = words[wordIndex];

  if (deleting) {
    charIndex--;
  } else {
    charIndex++;
  }

  typingText.textContent = currentWord.substring(
    0,
    charIndex
  );

  let delay = deleting ? 55 : 95;

  if (!deleting && charIndex === currentWord.length) {
    delay = 1800;
    deleting = true;
  } else if (deleting && charIndex === 0) {
    deleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    delay = 450;
  }

  typingTimeout = setTimeout(typeWriter, delay);
}

if (typingText && !reducedMotion.matches) {
  typingText.textContent = "";
  typeWriter();
} else if (typingText) {
  typingText.textContent = words[0];
}

/* ======================================
   INTERACTIVE 3D CUBE
====================================== */

if (
  scene &&
  cubeTilt &&
  finePointer.matches &&
  !reducedMotion.matches
) {

  scene.addEventListener("pointermove", (event) => {

    const bounds = scene.getBoundingClientRect();

    const x = (
      event.clientX - bounds.left
    ) / bounds.width;

    const y = (
      event.clientY - bounds.top
    ) / bounds.height;

    const rotateY = (x - 0.5) * 35;
    const rotateX = -(y - 0.5) * 35;

    cubeTilt.style.setProperty(
      "--tilt-x",
      `${rotateX}deg`
    );

    cubeTilt.style.setProperty(
      "--tilt-y",
      `${rotateY}deg`
    );

  });

  scene.addEventListener("pointerleave", () => {

    cubeTilt.style.removeProperty("--tilt-x");
    cubeTilt.style.removeProperty("--tilt-y");

  });

}

/* ======================================
   SCROLL REVEAL ANIMATIONS
====================================== */

const revealElements = document.querySelectorAll(".reveal");

if (
  "IntersectionObserver" in window &&
  !reducedMotion.matches
) {

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }

      });

    },
    {
      threshold: 0.08,
      rootMargin: "0px 0px -25px 0px"
    }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });

} else {

  revealElements.forEach((element) => {
    element.classList.add("visible");
  });

}

/* ======================================
   SCROLL PROGRESS BAR
====================================== */

function updateScrollProgress() {

  if (!progressBar) return;

  const scrollTop = window.scrollY;

  const scrollHeight =
    document.documentElement.scrollHeight -
    window.innerHeight;

  const percentage = scrollHeight > 0
    ? Math.min(100, Math.max(0, (scrollTop / scrollHeight) * 100))
    : 0;

  progressBar.style.width = `${percentage}%`;

}

window.addEventListener(
  "scroll",
  updateScrollProgress,
  { passive: true }
);

window.addEventListener(
  "resize",
  updateScrollProgress
);

updateScrollProgress();

/* ======================================
   DYNAMIC COPYRIGHT YEAR
====================================== */

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

/* ======================================
   CONSOLE STATUS
====================================== */

console.log(
  "Muhammad Ahsan Awan Portfolio Loaded Successfully!"
);

/* ==========================================
   AHSAN PORTFOLIO V2.0
   ADVANCED INTERACTIVE EFFECTS
========================================== */

(() => {
  "use strict";

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const hasFinePointer = window.matchMedia(
    "(hover: hover) and (pointer: fine)"
  ).matches;

  /* BACK TO TOP */

  const topButton = document.createElement("button");

  topButton.id = "backToTop";
  topButton.type = "button";
  topButton.textContent = "↑";
  topButton.setAttribute(
    "aria-label",
    "Scroll back to top"
  );
  topButton.setAttribute("title", "Back to top");

  document.body.appendChild(topButton);

  function updateTopButton() {
    topButton.classList.toggle(
      "show",
      window.scrollY > 450
    );
  }

  topButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: reduceMotion ? "auto" : "smooth"
    });
  });

  window.addEventListener(
    "scroll",
    updateTopButton,
    { passive: true }
  );

  updateTopButton();

  /* 3D PROJECT CARD TILT */

  if (hasFinePointer && !reduceMotion) {
    const cards = document.querySelectorAll(
      ".project-card"
    );

    cards.forEach((card) => {

      card.addEventListener("pointerenter", () => {
        card.classList.add("is-tilting");
      });

      card.addEventListener("pointermove", (event) => {
        const rect = card.getBoundingClientRect();

        const x =
          (event.clientX - rect.left) / rect.width;

        const y =
          (event.clientY - rect.top) / rect.height;

        const rotateY = (x - 0.5) * 12;
        const rotateX = (0.5 - y) * 12;

        card.style.transform =
          `perspective(900px) rotateX(${rotateX}deg) ` +
          `rotateY(${rotateY}deg) translateY(-6px)`;
      });

      card.addEventListener("pointerleave", () => {
        card.classList.remove("is-tilting");
        card.style.removeProperty("transform");
      });

    });
  }

  /* CURSOR GLOW */

  if (hasFinePointer && !reduceMotion) {

    const aura = document.createElement("div");
    aura.className = "cursor-aura";
    aura.setAttribute("aria-hidden", "true");

    document.body.appendChild(aura);

    document.addEventListener(
      "pointermove",
      (event) => {
        if (event.pointerType !== "mouse") return;

        aura.style.left = `${event.clientX}px`;
        aura.style.top = `${event.clientY}px`;
        aura.style.opacity = "1";
      },
      { passive: true }
    );

    document.addEventListener("pointerout", (event) => {
      if (!event.relatedTarget) {
        aura.style.opacity = "0";
      }
    });

  }

  /* ANIMATED CONSTELLATION BACKGROUND */

  const canvas = document.createElement("canvas");

  canvas.className = "portfolio-stars";
  canvas.setAttribute("aria-hidden", "true");

  document.body.prepend(canvas);

  const ctx = canvas.getContext("2d");

  if (!ctx) return;

  let width = 0;
  let height = 0;
  let stars = [];
  let frameId = null;

  function resizeCanvas() {

    width = window.innerWidth;
    height = window.innerHeight;

    const ratio = Math.min(
      window.devicePixelRatio || 1,
      2
    );

    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);

    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

    const count = Math.min(
      65,
      Math.max(
        12,
        Math.floor((width * height) / 24000)
      )
    );

    stars = Array.from(
      { length: count },
      () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.2 + 0.5,
        speed: Math.random() * 0.25 + 0.08
      })
    );

  }

  function drawStars(animate) {

    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < stars.length; i++) {

      const star = stars[i];

      if (animate) {
        star.y -= star.speed;

        if (star.y < -5) {
          star.y = height + 5;
          star.x = Math.random() * width;
        }
      }

      // Star points
      ctx.beginPath();
      ctx.arc(
        star.x,
        star.y,
        star.radius,
        0,
        Math.PI * 2
      );

      ctx.fillStyle = "rgba(160, 194, 255, 0.65)";
      ctx.fill();

      // Nearby constellation lines
      for (let j = i + 1; j < stars.length; j++) {

        const next = stars[j];

        const dx = star.x - next.x;
        const dy = star.y - next.y;

        const distanceSquared = dx * dx + dy * dy;

        if (distanceSquared < 110 * 110) {

          const distance = Math.sqrt(
            distanceSquared
          );

          const alpha =
            (1 - distance / 110) * 0.13;

          ctx.beginPath();
          ctx.moveTo(star.x, star.y);
          ctx.lineTo(next.x, next.y);

          ctx.strokeStyle =
            `rgba(117, 162, 255, ${alpha})`;

          ctx.lineWidth = 0.6;
          ctx.stroke();

        }

      }
    }

  }

  function animationLoop() {

    if (document.hidden) {
      frameId = null;
      return;
    }

    drawStars(true);
    frameId = requestAnimationFrame(animationLoop);

  }

  function startAnimation() {

    if (frameId === null && !reduceMotion) {
      frameId = requestAnimationFrame(animationLoop);
    }

  }

  resizeCanvas();

  if (reduceMotion) {
    drawStars(false);
  } else {
    startAnimation();
  }

  window.addEventListener("resize", () => {

    resizeCanvas();

    if (reduceMotion) {
      drawStars(false);
    }

  });

  document.addEventListener(
    "visibilitychange",
    () => {
      if (!document.hidden) {
        startAnimation();
      }
    }
  );

  console.log("AHSAN Portfolio V2.0 effects ready!");

})();
