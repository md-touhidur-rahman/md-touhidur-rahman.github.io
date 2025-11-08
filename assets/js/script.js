// Simple fade-in animation for sections
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section");
  sections.forEach((section, i) => {
    setTimeout(() => section.classList.add("visible"), i * 200);
  });
});

// === Auto-load Latest Blog Preview on Home ===
document.addEventListener("DOMContentLoaded", function () {
  // run only on pages that actually have the teaser box
  const teaser = document.getElementById("latest-blog-content");
  if (!teaser) return;

  // fetch the blogs page
  fetch("blogs.html")
    .then((res) => res.text())
    .then((html) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");

      // grab the FIRST blog item on the page
      const firstBlog = doc.querySelector(".blog-list .blog-item");
      if (!firstBlog) {
        teaser.innerHTML = "<p>No blog posts found.</p>";
        return;
      }

      // get pieces from your actual structure
      const title =
        firstBlog.querySelector(".blog-title")?.innerText.trim() || "Untitled";

      const meta =
        firstBlog.querySelector(".blog-meta")?.innerText.trim() || "";

      // first paragraph inside the collapsed body
      const abstract =
        firstBlog.querySelector(".blog-body p")?.innerText.trim() ||
        "New post available.";

      // first link inside actions (PDF / app / whatever)
      const link =
        firstBlog.querySelector(".blog-actions a")?.getAttribute("href") ||
        "blogs.html";

      // detect if it's a PDF to change button text
      const isPDF = link.toLowerCase().endsWith(".pdf");

      teaser.innerHTML = `
        <div class="blog-card">
          <h3>${title}</h3>
          ${meta ? `<p class="date">${meta}</p>` : ""}
          <p class="abstract">${abstract}</p>
          <a href="${link}" class="btn primary" target="_blank">
            ${isPDF ? "Read Full PDF" : "Read Full Blog"}
          </a>
        </div>
      `;
    })
    .catch((err) => {
      console.error("Latest blog load error:", err);
      teaser.innerHTML = "<p>Couldn't load latest post.</p>";
    });
});

