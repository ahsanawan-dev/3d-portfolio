"use strict";

/* =========================================================
   MUHAMMAD AHSAN AWAN — PORTFOLIO V2
   Interactive JavaScript
========================================================= */


/* =========================================================
   ENABLE JS MODE
========================================================= */

document.documentElement.classList.add("js");


/* =========================================================
   ELEMENTS
========================================================= */

const menuToggle =
  document.getElementById("menuToggle");

const navLinks =
  document.getElementById("navLinks");

const navItems =
  document.querySelectorAll(".nav-link");

const header =
  document.getElementById("header");

const progressBar =
  document.getElementById("scrollProgress");

const backToTop =
  document.getElementById("backToTop");

const typingText =
  document.getElementById("typingText");

const yearElement =
  document.getElementById("year");

const particlesContainer =
  document.getElementById("particles");

const scene =
  document.getElementById("scene");

const cubeTilt =
  document.getElementById("cubeTilt");

const revealElements =
  document.querySelectorAll(".reveal");

const sections =
  document.querySelectorAll(
    "main section[id]"
  );

const reducedMotion =
  window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

const desktopBreakpoint = 860;


/* =========================================================
   CURRENT YEAR
========================================================= */

if (yearElement) {
  yearElement.textContent =
    new Date().getFullYear();
}


/* =========================================================
   MOBILE MENU
========================================================= */

function openMenu() {
  if (!menuToggle || !navLinks) {
    return;
  }

  menuToggle.setAttribute(
    "aria-expanded",
    "true"
  );

  menuToggle.setAttribute(
    "aria-label",
    "Close navigation menu"
  );

  navLinks.classList.add(
    "is-open"
  );

  document.body.classList.add(
    "menu-open"
  );
}


function closeMenu() {
  if (!menuToggle || !navLinks) {
    return;
  }

  menuToggle.setAttribute(
    "aria-expanded",
    "false"
  );

  menuToggle.setAttribute(
    "aria-label",
    "Open navigation menu"
  );

  navLinks.classList.remove(
    "is-open"
  );

  document.body.classList.remove(
    "menu-open"
  );
}


function toggleMenu() {
  if (!menuToggle) {
    return;
  }

  const expanded =
    menuToggle.getAttribute(
      "aria-expanded"
    ) === "true";

  if (expanded) {
    closeMenu();
  } else {
    openMenu();
  }
}


if (menuToggle && navLinks) {

  menuToggle.addEventListener(
    "click",
    function (event) {
      event.stopPropagation();
      toggleMenu();
    }
  );


  navLinks.addEventListener(
    "click",
    function (event) {
      event.stopPropagation();
    }
  );


  document.addEventListener(
    "click",
    function () {

      if (
        window.innerWidth <=
        desktopBreakpoint
      ) {
        closeMenu();
      }

    }
  );


  document.addEventListener(
    "keydown",
    function (event) {

      if (event.key === "Escape") {
        closeMenu();

        menuToggle.focus();
      }

    }
  );


  navLinks
    .querySelectorAll("a")
    .forEach(function (link) {

      link.addEventListener(
        "click",
        function () {

          if (
            window.innerWidth <=
            desktopBreakpoint
          ) {
            closeMenu();
          }

        }
      );

    });


  window.addEventListener(
    "resize",
    function () {

      if (
        window.innerWidth >
        desktopBreakpoint
      ) {
        closeMenu();
      }

    }
  );

}


/* =========================================================
   SCROLL PROGRESS
========================================================= */

function updateScrollProgress() {

  if (!progressBar) {
    return;
  }

  const documentHeight =
    document.documentElement
      .scrollHeight -
    window.innerHeight;

  if (documentHeight <= 0) {
    progressBar.style.width =
      "0%";

    return;
  }

  const progress =
    (window.scrollY /
      documentHeight) *
    100;

  progressBar.style.width =
    `${Math.min(
      Math.max(progress, 0),
      100
    )}%`;

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
   BACK TO TOP
========================================================= */

function updateBackToTop() {

  if (!backToTop) {
    return;
  }

  if (window.scrollY > 700) {
    backToTop.classList.add(
      "visible"
    );
  } else {
    backToTop.classList.remove(
      "visible"
    );
  }

}


if (backToTop) {

  backToTop.addEventListener(
    "click",
    function () {

      window.scrollTo({
        top: 0,
        behavior:
          reducedMotion.matches
            ? "auto"
            : "smooth"
      });

    }
  );

}


window.addEventListener(
  "scroll",
  updateBackToTop,
  { passive: true }
);

updateBackToTop();


/* =========================================================
   REVEAL ON SCROLL
========================================================= */

function initializeReveal() {

  if (!revealElements.length) {
    return;
  }

  if (
    reducedMotion.matches ||
    !("IntersectionObserver" in window)
  ) {

    revealElements.forEach(
      function (element) {
        element.classList.add(
          "is-visible"
        );
      }
    );

    return;
  }

  const observer =
    new IntersectionObserver(
      function (entries, revealObserver) {

        entries.forEach(
          function (entry) {

            if (entry.isIntersecting) {

              entry.target.classList.add(
                "is-visible"
              );

              revealObserver.unobserve(
                entry.target
              );

            }

          }
        );

      },
      {
        threshold: 0.12,
        rootMargin:
          "0px 0px -40px 0px"
      }
    );


  revealElements.forEach(
    function (element) {
      observer.observe(element);
    }
  );

}

initializeReveal();


/* =========================================================
   ACTIVE NAVIGATION SECTION
========================================================= */

function initializeActiveNavigation() {

  if (
    !sections.length ||
    !navItems.length ||
    !("IntersectionObserver" in window)
  ) {
    return;
  }

  const observer =
    new IntersectionObserver(
      function (entries) {

        entries.forEach(
          function (entry) {

            if (!entry.isIntersecting) {
              return;
            }

            const sectionId =
              entry.target.id;

            navItems.forEach(
              function (link) {

                const isCurrent =
                  link.getAttribute(
                    "href"
                  ) ===
                  `#${sectionId}`;

                link.classList.toggle(
                  "active",
                  isCurrent
                );

              }
            );

          }
        );

      },
      {
        threshold: 0.25,
        rootMargin:
          "-25% 0px -55% 0px"
      }
    );


  sections.forEach(
    function (section) {
      observer.observe(section);
    }
  );

}

initializeActiveNavigation();


/* =========================================================
   SMOOTH INTERNAL LINKS
========================================================= */

document
  .querySelectorAll('a[href^="#"]')
  .forEach(function (link) {

    link.addEventListener(
      "click",
      function (event) {

        const href =
          link.getAttribute("href");

        if (
          !href ||
          href === "#"
        ) {
          return;
        }

        const target =
          document.querySelector(href);

        if (!target) {
          return;
        }

        event.preventDefault();

        target.scrollIntoView({
          behavior:
            reducedMotion.matches
              ? "auto"
              : "smooth",
          block: "start"
        });

      }
    );

  });


/* =========================================================
   TYPING EFFECT
========================================================= */

const typingPhrases = [
  "Aspiring Frontend Developer",
  "UI / UX Enthusiast",
  "JavaScript Learner",
  "Future Full-Stack Developer"
];


let phraseIndex = 0;
let characterIndex = 0;
let deleting = false;
let typingTimer = null;


function runTypingEffect() {

  if (!typingText) {
    return;
  }

  if (reducedMotion.matches) {
    typingText.textContent =
      typingPhrases[0];

    return;
  }

  const currentPhrase =
    typingPhrases[phraseIndex];


  if (!deleting) {

    characterIndex += 1;

    typingText.textContent =
      currentPhrase.slice(
        0,
        characterIndex
      );


    if (
      characterIndex ===
      currentPhrase.length
    ) {

      deleting = true;

      typingTimer =
        window.setTimeout(
          runTypingEffect,
          1500
        );

      return;
    }

  } else {

    characterIndex -= 1;

    typingText.textContent =
      currentPhrase.slice(
        0,
        characterIndex
      );


    if (characterIndex === 0) {

      deleting = false;

      phraseIndex =
        (phraseIndex + 1) %
        typingPhrases.length;

    }

  }


  const speed =
    deleting ? 42 : 75;


  typingTimer =
    window.setTimeout(
      runTypingEffect,
      speed
    );

}


if (typingText) {

  typingText.textContent = "";

  runTypingEffect();

}


/* =========================================================
   PARTICLE BACKGROUND
========================================================= */

function createParticles() {

  if (
    !particlesContainer ||
    reducedMotion.matches
  ) {
    return;
  }

  const fragment =
    document.createDocumentFragment();

  const particleCount =
    window.innerWidth < 640
      ? 14
      : 28;


  for (
    let index = 0;
    index < particleCount;
    index += 1
  ) {

    const particle =
      document.createElement(
        "span"
      );

    particle.className =
      "particle";


    const size =
      Math.random() * 2.8 + 1;

    const duration =
      Math.random() * 10 + 9;

    const delay =
      -Math.random() * duration;

    const opacity =
      Math.random() * 0.45 + 0.18;


    particle.style.left =
      `${Math.random() * 100}%`;

    particle.style.top =
      `${Math.random() * 100}%`;

    particle.style.setProperty(
      "--size",
      `${size}px`
    );

    particle.style.setProperty(
      "--duration",
      `${duration}s`
    );

    particle.style.setProperty(
      "--delay",
      `${delay}s`
    );

    particle.style.setProperty(
      "--opacity",
      opacity.toFixed(2)
    );


    fragment.appendChild(
      particle
    );

  }


  particlesContainer.appendChild(
    fragment
  );

}

createParticles();


/* =========================================================
   3D CUBE POINTER TILT
========================================================= */

function initializeCubeTilt() {

  if (
    !scene ||
    !cubeTilt ||
    reducedMotion.matches
  ) {
    return;
  }


  const pointerSupported =
    window.matchMedia(
      "(pointer: fine)"
    ).matches;


  if (!pointerSupported) {
    return;
  }


  let frameId = null;


  scene.addEventListener(
    "pointermove",
    function (event) {

      const bounds =
        scene.getBoundingClientRect();

      const x =
        event.clientX -
        bounds.left;

      const y =
        event.clientY -
        bounds.top;


      const horizontal =
        (x / bounds.width) -
        0.5;

      const vertical =
        (y / bounds.height) -
        0.5;


      const rotateY =
        horizontal * 11;

      const rotateX =
        vertical * -9;


      if (frameId) {
        cancelAnimationFrame(
          frameId
        );
      }


      frameId =
        requestAnimationFrame(
          function () {

            cubeTilt.style.transform =
              `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

          }
        );

    }
  );


  scene.addEventListener(
    "pointerleave",
    function () {

      cubeTilt.style.transform =
        "rotateX(0deg) rotateY(0deg)";

    }
  );

}

initializeCubeTilt();


/* =========================================================
   HEADER SHADOW ON SCROLL
========================================================= */

function updateHeader() {

  if (!header) {
    return;
  }

  if (window.scrollY > 30) {

    header.style.boxShadow =
      "0 14px 38px rgba(0, 0, 0, 0.22)";

  } else {

    header.style.boxShadow =
      "none";

  }

}


window.addEventListener(
  "scroll",
  updateHeader,
  { passive: true }
);

updateHeader();


/* =========================================================
   HANDLE REDUCED MOTION CHANGES
========================================================= */

function handleMotionPreferenceChange() {

  if (reducedMotion.matches) {

    if (typingTimer) {
      clearTimeout(
        typingTimer
      );
    }

    if (typingText) {
      typingText.textContent =
        typingPhrases[0];
    }

    document
      .querySelectorAll(".particle")
      .forEach(function (particle) {
        particle.remove();
      });

    revealElements.forEach(
      function (element) {
        element.classList.add(
          "is-visible"
        );
      }
    );

  }

}


if (
  typeof reducedMotion.addEventListener ===
  "function"
) {

  reducedMotion.addEventListener(
    "change",
    handleMotionPreferenceChange
  );

}
