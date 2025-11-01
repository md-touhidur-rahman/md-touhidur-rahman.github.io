// Simple fade-in animation for sections
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section");
  sections.forEach((section, i) => {
    setTimeout(() => section.classList.add("visible"), i * 200);
  });
});
