"use strict";

/* =========================================================
   MUHAMMAD AHSAN AWAN — PORTFOLIO V2
   Complete JavaScript
   ========================================================= */


/* =========================================================
   01. JS ENABLED CLASS
   ========================================================= */

document.documentElement.classList.add("js");


/* =========================================================
   02. ELEMENTS
   ========================================================= */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

const scrollProgress = document.getElementById("scrollProgress");

const typingText = document.getElementById("typingText");

const scene = document.getElementById("scene");
const cubeTilt = document.getElementById("cubeTilt");

const yearElement = document.getElementById("year");

const reducedMotionQuery = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
);


/* =========================================================
   03. MOBILE NAVIGATION
   ========================================================= */

function openMobileMenu() {
  if (!menuToggle || !navLinks) return;

  navLinks.classList.add("is-open");

  menuToggle.setAttribute("aria-expanded", "true");

  document.body.classList.add("menu-open");
}


function closeMobileMenu() {
  if (!menuToggle || !navLinks) return;

  navLinks.classList.remove("is-open");

  menuToggle.setAttribute("aria-expanded", "false");

  document.body.classList.remove("menu-open");
}


function toggleMobileMenu() {
  if (!menuToggle || !navLinks) return;

  const isOpen = navLinks.classList.contains("is-open");

  if (isOpen) {
    closeMobileMenu();
  } else {
    openMobileMenu();
  }
}


if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();

    toggleMobileMenu();
  });


  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      closeMobileMenu();
    });
  });


  document.addEventListener("click", (event) => {
    const clickedInsideMenu = navLinks.contains(event.target);
    const clickedToggle = menuToggle.contains(event.target);

    if (!clickedInsideMenu && !clickedToggle) {
      closeMobileMenu();
    }
  });


  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMobileMenu();
      menuToggle.focus();
    }
  });


  window.addEventListener("resize", () => {
    if (window.innerWidth > 820) {
      closeMobileMenu();
    }
  });
}


/* =========================================================
   04. SMOOTH INTERNAL LINKS
   ========================================================= */

const internalLinks = document.querySelectorAll('a[href^="#"]');

internalLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");

    if (!targetId || targetId === "#") {
      return;
    }

    const target = document.querySelector(targetId);

    if (!target) {
      return;
    }

    event.preventDefault();

    target.scrollIntoView({
      behavior: reducedMotionQuery.matches ? "auto" : "smooth",
      block: "start"
    });

    if (history.pushState) {
      history.pushState(null, "", targetId);
    }

    closeMobileMenu();
  });
});


/* =========================================================
   05. SCROLL PROGRESS BAR
   ========================================================= */

function updateScrollProgress() {
  if (!scrollProgress) return;

  const scrollTop =
    window.scrollY ||
    document.documentElement.scrollTop;

  const documentHeight =
    document.documentElement.scrollHeight -
    window.innerHeight;

  const progress =
    documentHeight > 0
      ? (scrollTop / documentHeight) * 100
      : 0;

  scrollProgress.style.width =
    `${Math.min(100, Math.max(0, progress))}%`;
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


/* =========================================================
   06. ACTIVE NAV LINK
   ========================================================= */

const navAnchors = Array.from(
  document.querySelectorAll(
    '.nav-links a[href^="#"]'
  )
);

const sections = navAnchors
  .map((link) => {
    const href = link.getAttribute("href");

    if (!href || href === "#") {
      return null;
    }

    return document.querySelector(href);
  })
  .filter(Boolean);


function updateActiveNavigation() {
  if (!sections.length) return;

  const offset = 160;

  let currentSection = sections[0];

  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();

    if (rect.top <= offset) {
      currentSection = section;
    }
  });


  navAnchors.forEach((link) => {
    const href = link.getAttribute("href");

    const isActive =
      href === `#${currentSection.id}`;

    link.classList.toggle(
      "active",
      isActive
    );

    if (isActive) {
      link.setAttribute(
        "aria-current",
        "page"
      );
    } else {
      link.removeAttribute(
        "aria-current"
      );
    }
  });
}


window.addEventListener(
  "scroll",
  updateActiveNavigation,
  { passive: true }
);

window.addEventListener(
  "resize",
  updateActiveNavigation
);

updateActiveNavigation();


/* =========================================================
   07. TYPING ANIMATION
   ========================================================= */

const typingPhrases = [
  "Aspiring Full-Stack Web Developer",
  "Frontend Web Developer",
  "UI / UX Enthusiast",
  "JavaScript Developer",
  "Creative Web Builder"
];

let typingPhraseIndex = 0;
let typingCharacterIndex = 0;
let typingDeleting = false;
let typingTimer = null;


function runTypingAnimation() {
  if (!typingText) return;


  if (reducedMotionQuery.matches) {
    typingText.textContent =
      typingPhrases[0];

    return;
  }


  const currentPhrase =
    typingPhrases[typingPhraseIndex];


  if (!typingDeleting) {
    typingCharacterIndex += 1;

    typingText.textContent =
      currentPhrase.slice(
        0,
        typingCharacterIndex
      );


    if (
      typingCharacterIndex >=
      currentPhrase.length
    ) {
      typingDeleting = true;

      typingTimer = window.setTimeout(
        runTypingAnimation,
        1600
      );

      return;
    }


    typingTimer = window.setTimeout(
      runTypingAnimation,
      65
    );
  } else {
    typingCharacterIndex -= 1;

    typingText.textContent =
      currentPhrase.slice(
        0,
        typingCharacterIndex
      );


    if (typingCharacterIndex <= 0) {
      typingDeleting = false;

      typingPhraseIndex =
        (
          typingPhraseIndex + 1
        ) %
        typingPhrases.length;

      typingTimer = window.setTimeout(
        runTypingAnimation,
        350
      );

      return;
    }


    typingTimer = window.setTimeout(
      runTypingAnimation,
      35
    );
  }
}


if (typingText) {
  typingText.textContent = "";

  runTypingAnimation();
}


/* =========================================================
   08. CURRENT YEAR
   ========================================================= */

if (yearElement) {
  yearElement.textContent =
    String(
      new Date().getFullYear()
    );
}


/* =========================================================
   09. SCROLL REVEAL
   ========================================================= */

const revealElements =
  document.querySelectorAll(
    ".reveal"
  );


if (
  revealElements.length &&
  "IntersectionObserver" in window &&
  !reducedMotionQuery.matches
) {
  const revealObserver =
    new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add(
            "is-visible"
          );

          observer.unobserve(
            entry.target
          );
        });
      },
      {
        threshold: 0.12,
        rootMargin:
          "0px 0px -40px 0px"
      }
    );


  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
} else {
  revealElements.forEach((element) => {
    element.classList.add(
      "is-visible"
    );
  });
}


/* =========================================================
   10. 3D CUBE POINTER TILT
   ========================================================= */

function resetCubeTilt() {
  if (!cubeTilt) return;

  cubeTilt.style.transform =
    "rotateX(0deg) rotateY(0deg)";
}


if (
  scene &&
  cubeTilt &&
  !reducedMotionQuery.matches
) {
  scene.addEventListener(
    "pointermove",
    (event) => {
      if (
        event.pointerType === "touch"
      ) {
        return;
      }


      const rect =
        scene.getBoundingClientRect();


      const x =
        (
          event.clientX -
          rect.left
        ) /
        rect.width;


      const y =
        (
          event.clientY -
          rect.top
        ) /
        rect.height;


      const rotateY =
        (x - 0.5) * 12;


      const rotateX =
        (0.5 - y) * 10;


      cubeTilt.style.transform =
        `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }
  );


  scene.addEventListener(
    "pointerleave",
    resetCubeTilt
  );
}


/* =========================================================
   11. PARTICLES
   ========================================================= */

function createParticles() {
  const particleContainer =
    document.querySelector(
      ".particles, .particle-layer"
    );


  if (
    !particleContainer ||
    reducedMotionQuery.matches
  ) {
    return;
  }


  if (
    particleContainer.dataset
      .particlesReady === "true"
  ) {
    return;
  }


  particleContainer.dataset
    .particlesReady = "true";


  const particleCount =
    window.innerWidth < 700
      ? 16
      : 30;


  const fragment =
    document.createDocumentFragment();


  for (
    let index = 0;
    index < particleCount;
    index += 1
  ) {
    const particle =
      document.createElement("span");


    particle.className =
      "particle";


    particle.style.left =
      `${Math.random() * 100}%`;


    particle.style.top =
      `${Math.random() * 100}%`;


    particle.style.opacity =
      String(
        0.18 +
        Math.random() * 0.65
      );


    const size =
      1 +
      Math.random() * 3;


    particle.style.width =
      `${size}px`;


    particle.style.height =
      `${size}px`;


    particle.style.animationDuration =
      `${7 + Math.random() * 8}s`;


    particle.style.animationDelay =
      `${Math.random() * -8}s`;


    fragment.appendChild(
      particle
    );
  }


  particleContainer.appendChild(
    fragment
  );
}


createParticles();


/* =========================================================
   12. PROJECT CARD POINTER EFFECT
   ========================================================= */

const projectCards =
  document.querySelectorAll(
    ".project-card"
  );


if (!reducedMotionQuery.matches) {
  projectCards.forEach((card) => {
    card.addEventListener(
      "pointermove",
      (event) => {
        if (
          event.pointerType === "touch"
        ) {
          return;
        }


        const rect =
          card.getBoundingClientRect();


        const x =
          (
            event.clientX -
            rect.left
          ) /
          rect.width;


        const y =
          (
            event.clientY -
            rect.top
          ) /
          rect.height;


        const rotateY =
          (x - 0.5) * 3;


        const rotateX =
          (0.5 - y) * 3;


        card.style.transform =
          `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
      }
    );


    card.addEventListener(
      "pointerleave",
      () => {
        card.style.transform = "";
      }
    );
  });
}


/* =========================================================
   13. KEYBOARD / HASH LOAD SUPPORT
   ========================================================= */

window.addEventListener(
  "load",
  () => {
    if (!window.location.hash) {
      return;
    }


    const target =
      document.querySelector(
        window.location.hash
      );


    if (!target) {
      return;
    }


    window.setTimeout(
      () => {
        target.scrollIntoView({
          behavior: "auto",
          block: "start"
        });
      },
      50
    );
  }
);


/* =========================================================
   14. REDUCED MOTION CHANGES
   ========================================================= */

function handleMotionPreferenceChange() {
  if (
    reducedMotionQuery.matches
  ) {
    if (typingTimer) {
      window.clearTimeout(
        typingTimer
      );
    }


    if (typingText) {
      typingText.textContent =
        typingPhrases[0];
    }


    resetCubeTilt();


    revealElements.forEach(
      (element) => {
        element.classList.add(
          "is-visible"
        );
      }
    );
  }
}


if (
  typeof reducedMotionQuery
    .addEventListener ===
  "function"
) {
  reducedMotionQuery.addEventListener(
    "change",
    handleMotionPreferenceChange
  );
} else if (
  typeof reducedMotionQuery
    .addListener ===
  "function"
) {
  reducedMotionQuery.addListener(
    handleMotionPreferenceChange
  );
}


/* =========================================================
   15. INITIAL STATE
   ========================================================= */

closeMobileMenu();

updateScrollProgress();

updateActiveNavigation();
