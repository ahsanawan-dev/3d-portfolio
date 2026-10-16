"use strict";

/* =========================================================
   MUHAMMAD AHSAN AWAN — PORTFOLIO V2
   Interactive Portfolio JavaScript
========================================================= */

document.documentElement.classList.add("js");

/* =========================================================
   ELEMENTS
========================================================= */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const scene = document.getElementById("scene");
const cubeTilt = document.getElementById("cubeTilt");
const typingText = document.getElementById("typingText");
const progressBar = document.getElementById("scrollProgress");
const yearElement = document.getElementById("year");

const backToTop =
  document.getElementById("backToTop") ||
  document.querySelector(".back-to-top");

const navAnchors = document.querySelectorAll(
  '.nav-links a[href^="#"], a[data-scroll]'
);

const sections = document.querySelectorAll("section[id]");

const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

/* =========================================================
   CURRENT YEAR
========================================================= */

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

/* =========================================================
   MOBILE NAVIGATION
========================================================= */

if (menuToggle && navLinks) {
  const closeMenu = () => {
    navLinks.classList.remove("active");
    menuToggle.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  };

  const openMenu = () => {
    navLinks.classList.add("active");
    menuToggle.classList.add("active");
    menuToggle.setAttribute("aria-expanded", "true");
    document.body.classList.add("menu-open");
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.contains("active");

    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("click", (event) => {
    const clickedInsideMenu =
      navLinks.contains(event.target) ||
      menuToggle.contains(event.target);

    if (!clickedInsideMenu) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
      closeMenu();
    }
  });
}

/* =========================================================
   SMOOTH SECTION SCROLLING
========================================================= */

navAnchors.forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");

    if (!targetId || !targetId.startsWith("#")) return;

    const target = document.querySelector(targetId);

    if (!target) return;

    event.preventDefault();

    target.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
  });
});

/* =========================================================
   SCROLL PROGRESS BAR
========================================================= */

const updateScrollProgress = () => {
  if (!progressBar) return;

  const scrollTop =
    window.pageYOffset || document.documentElement.scrollTop;

  const scrollHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

  const progress =
    scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

  progressBar.style.width = `${Math.min(progress, 100)}%`;
};

window.addEventListener("scroll", updateScrollProgress, {
  passive: true,
});

window.addEventListener("resize", updateScrollProgress);

updateScrollProgress();

/* =========================================================
   ACTIVE NAVIGATION LINK
========================================================= */

const updateActiveNavigation = () => {
  if (!sections.length) return;

  const scrollPosition = window.scrollY + 180;

  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      currentSection = section.id;
    }
  });

  document.querySelectorAll('.nav-links a[href^="#"]').forEach((link) => {
    const target = link.getAttribute("href");

    link.classList.toggle(
      "active",
      target === `#${currentSection}`
    );
  });
};

window.addEventListener("scroll", updateActiveNavigation, {
  passive: true,
});

updateActiveNavigation();

/* =========================================================
   HERO TYPING EFFECT
========================================================= */

const typingWords = [
  "Full-Stack Web Developer",
  "Frontend Developer",
  "Creative Web Developer",
  "JavaScript Developer",
  "UI / UX Enthusiast",
];

if (typingText) {
  if (reduceMotion) {
    typingText.textContent = typingWords[0];
  } else {
    let wordIndex = 0;
    let characterIndex = 0;
    let deleting = false;

    const type = () => {
      const currentWord = typingWords[wordIndex];

      if (!deleting) {
        characterIndex += 1;
        typingText.textContent = currentWord.slice(
          0,
          characterIndex
        );

        if (characterIndex === currentWord.length) {
          deleting = true;
          setTimeout(type, 1600);
          return;
        }
      } else {
        characterIndex -= 1;
        typingText.textContent = currentWord.slice(
          0,
          characterIndex
        );

        if (characterIndex === 0) {
          deleting = false;
          wordIndex = (wordIndex + 1) % typingWords.length;
        }
      }

      const delay = deleting ? 45 : 85;

      setTimeout(type, delay);
    };

    type();
  }
}

/* =========================================================
   3D HERO TILT
========================================================= */

if (scene && cubeTilt && !reduceMotion) {
  const resetTilt = () => {
    cubeTilt.style.transform =
      "rotateX(0deg) rotateY(0deg)";
  };

  scene.addEventListener("mousemove", (event) => {
    const rect = scene.getBoundingClientRect();

    const x =
      (event.clientX - rect.left) / rect.width - 0.5;

    const y =
      (event.clientY - rect.top) / rect.height - 0.5;

    const rotateY = x * 18;
    const rotateX = y * -18;

    cubeTilt.style.transform = `
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
    `;
  });

  scene.addEventListener("mouseleave", resetTilt);
}

/* =========================================================
   REVEAL ON SCROLL
========================================================= */

const revealElements = document.querySelectorAll(
  ".reveal, [data-reveal]"
);

if (revealElements.length) {
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealElements.forEach((element) => {
      element.classList.add("visible");
    });
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -60px 0px",
      }
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  }
}

/* =========================================================
   PROJECT CARD TILT
========================================================= */

const tiltCards = document.querySelectorAll(
  ".project-card, .skill-card, [data-tilt]"
);

if (!reduceMotion) {
  tiltCards.forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();

      const x =
        (event.clientX - rect.left) / rect.width - 0.5;

      const y =
        (event.clientY - rect.top) / rect.height - 0.5;

      card.style.transform = `
        perspective(900px)
        rotateX(${y * -5}deg)
        rotateY(${x * 5}deg)
        translateY(-4px)
      `;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}

/* =========================================================
   CURSOR AURA
========================================================= */

const cursorAura = document.querySelector(".cursor-aura");

if (
  cursorAura &&
  !reduceMotion &&
  window.matchMedia("(pointer: fine)").matches
) {
  let mouseX = 0;
  let mouseY = 0;
  let auraX = 0;
  let auraY = 0;

  document.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
  });

  const animateAura = () => {
    auraX += (mouseX - auraX) * 0.14;
    auraY += (mouseY - auraY) * 0.14;

    cursorAura.style.transform =
      `translate3d(${auraX}px, ${auraY}px, 0)`;

    requestAnimationFrame(animateAura);
  };

  animateAura();
}

/* =========================================================
   BACK TO TOP
========================================================= */

if (backToTop) {
  const updateBackToTop = () => {
    backToTop.classList.toggle(
      "visible",
      window.scrollY > 500
    );
  };

  window.addEventListener("scroll", updateBackToTop, {
    passive: true,
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  });

  updateBackToTop();
}

/* =========================================================
   EXTERNAL LINKS
========================================================= */

document
  .querySelectorAll('a[target="_blank"]')
  .forEach((link) => {
    const rel = link.getAttribute("rel") || "";
    const values = new Set(rel.split(/\s+/).filter(Boolean));

    values.add("noopener");
    values.add("noreferrer");

    link.setAttribute(
      "rel",
      Array.from(values).join(" ")
    );
  });

/* =========================================================
   KEYBOARD ACCESSIBILITY
========================================================= */

document.addEventListener("keydown", (event) => {
  if (event.key === "Tab") {
    document.body.classList.add("keyboard-user");
  }
});

document.addEventListener("mousedown", () => {
  document.body.classList.remove("keyboard-user");
});

/* =========================================================
   PAGE READY
========================================================= */

window.addEventListener("load", () => {
  document.body.classList.add("page-loaded");

  updateScrollProgress();
  updateActiveNavigation();
});
