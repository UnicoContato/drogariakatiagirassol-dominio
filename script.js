const header = document.getElementById("siteHeader");
const menuButton = document.getElementById("menuButton");
const mobileMenu = document.getElementById("mobileMenu");
const privacyOpen = document.getElementById("privacyOpen");
const privacyClose = document.getElementById("privacyClose");
const privacyModal = document.getElementById("privacyModal");
const year = document.getElementById("year");
let lastScroll = 0;

year.textContent = new Date().getFullYear();

window.addEventListener("scroll", () => {
  const currentScroll = window.scrollY;
  if (currentScroll > lastScroll && currentScroll > 120) {
    header.classList.add("header-hidden");
  } else {
    header.classList.remove("header-hidden");
  }
  lastScroll = currentScroll;
});

menuButton.addEventListener("click", () => {
  const isOpen = mobileMenu.classList.toggle("hidden") === false;
  menuButton.classList.toggle("menu-open", isOpen);
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll("#mobileMenu a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.add("hidden");
    menuButton.classList.remove("menu-open");
    menuButton.setAttribute("aria-expanded", "false");
  });
});

privacyOpen.addEventListener("click", () => {
  privacyModal.classList.remove("hidden");
  privacyModal.classList.add("flex");
  document.body.style.overflow = "hidden";
});

const closePrivacy = () => {
  privacyModal.classList.add("hidden");
  privacyModal.classList.remove("flex");
  document.body.style.overflow = "";
};

privacyClose.addEventListener("click", closePrivacy);

privacyModal.addEventListener("click", (event) => {
  if (event.target === privacyModal) {
    closePrivacy();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !privacyModal.classList.contains("hidden")) {
    closePrivacy();
  }
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.14
});

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
