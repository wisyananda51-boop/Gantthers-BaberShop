// === Navbar scroll effect ===
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  navbar.classList.toggle("scrolled", window.scrollY > 50);
});

// === Smooth scroll navigation ===
document.querySelectorAll('.nav-links a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    // Close mobile menu when link clicked
    document.querySelector(".nav-links").classList.remove("active");
  });
});

// === Active section highlight ===
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (scrollY >= sectionTop) current = section.getAttribute("id");
  });
  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});

// === Reveal animation on scroll ===
const revealElements = document.querySelectorAll(
  ".about-left, .about-right, .service-item, .gallery-card, .hero-contentc"
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add("show");
        }, index * 150); // staggered delay
      }
    });
  },
  { threshold: 0.2 }
);

revealElements.forEach(el => observer.observe(el));

// ---------------------------
// Safe IntersectionObserver + Parallax (only when visible)
// ---------------------------

document.addEventListener("DOMContentLoaded", () => {
  // Single observer for reveal animations (keamanan: no duplicate vars)
  const revealSelector = ".about-left, .about-right, .service-item, .gallery-card, .hero-contentc, .team";
  const revealEls = document.querySelectorAll(revealSelector);
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // stagger small delay for nicer effect
        setTimeout(() => entry.target.classList.add("show"), index * 80);
      }
    });
  }, { threshold: 0.18 });

  revealEls.forEach(el => revealObserver.observe(el));

  // Parallax only for team when visible
  const teamEl = document.getElementById("team");
  let teamVisible = false;
  if (teamEl) {
    const teamObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        teamVisible = entry.isIntersecting;
        // when it first becomes visible, ensure it has show class
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    }, { threshold: 0.15 });

    teamObserver.observe(teamEl);
  }

  // Throttled scroll handler for parallax (lightweight)
  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        if (teamEl && teamVisible) {
          // compute parallax offset relative to section top
          const rect = teamEl.getBoundingClientRect();
          // rect.top is distance from viewport top; we want small movement
          const offset = Math.round((window.innerHeight - rect.top) * 0.12); // tweak multiplier 0.12
          teamEl.style.backgroundPosition = `center ${offset}px`;
        }
        ticking = false;
      });
      ticking = true;
    }
  });
});

// SHOW ABOUT WHEN SCROLL
const aboutSection = document.querySelector(".about-section");

function showAbout() {
  const pos = aboutSection.getBoundingClientRect().top;
  if (pos < window.innerHeight - 150) {
    aboutSection.classList.add("show");
  }
}

window.addEventListener("scroll", showAbout);
window.addEventListener("load", showAbout);

// === Counter Animation saat Scroll ===
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".stat-number");
  const speed = 100; // Semakin kecil semakin cepat

  const animateCounters = () => {
    counters.forEach(counter => {
      const updateCount = () => {
        const target = +counter.getAttribute("data-target");
        const count = +counter.innerText;
        const increment = target / speed;

        if (count < target) {
          counter.innerText = Math.ceil(count + increment);
          setTimeout(updateCount, 20);
        } else {
          counter.innerText =
            target >= 1000000
              ? (target / 1000000).toFixed(1) + "M+"
              : target + "+";
        }
      };
      updateCount();
    });
  };

  // Jalankan animasi hanya saat section terlihat
  const section = document.querySelector(".customer-section");
  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      animateCounters();
      observer.unobserve(section);
    }
  }, { threshold: 0.5 });

  observer.observe(section);
});

const teamSection = document.querySelector(".team-section");

const teamObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, { threshold: 0.2 });

teamObserver.observe(teamSection);

document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll('.fade-section');

  function checkSections() {
    const trigger = window.innerHeight - 100;
    sections.forEach(sec => {
      const top = sec.getBoundingClientRect().top;
      if (top < trigger) {
        sec.classList.add('show');
      }
    });
  }

  window.addEventListener('scroll', checkSections);
  checkSections();
});
