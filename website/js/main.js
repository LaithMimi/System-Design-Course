// Saasmo — shared interactions

// Mobile nav toggle
const navbar = document.querySelector(".navbar");
const navToggle = document.querySelector(".nav-toggle");
if (navToggle) {
  navToggle.addEventListener("click", () => navbar.classList.toggle("open"));
}

// FAQ accordion
document.querySelectorAll(".faq-item").forEach((item) => {
  const btn = item.querySelector(".faq-q");
  const answer = item.querySelector(".faq-a");
  btn.addEventListener("click", () => {
    const isOpen = item.classList.contains("open");
    item.closest(".faq-list")
      .querySelectorAll(".faq-item.open")
      .forEach((other) => {
        other.classList.remove("open");
        other.querySelector(".faq-a").style.maxHeight = null;
      });
    if (!isOpen) {
      item.classList.add("open");
      answer.style.maxHeight = answer.scrollHeight + "px";
    }
  });
});

// Tabs
document.querySelectorAll("[data-tabs]").forEach((root) => {
  const buttons = root.querySelectorAll(".tab-btn");
  const panels = root.querySelectorAll(".tab-panel");
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("active"));
      panels.forEach((p) => p.classList.remove("active"));
      btn.classList.add("active");
      root.querySelector(`#${btn.dataset.target}`).classList.add("active");
    });
  });
});

// Scroll reveal
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// Newsletter (demo only)
document.querySelectorAll(".newsletter").forEach((form) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = form.querySelector("input");
    form.innerHTML = `<p style="color:var(--lime);font-weight:700;font-size:0.9rem;">Thanks — ${input.value} is on the list!</p>`;
  });
});
