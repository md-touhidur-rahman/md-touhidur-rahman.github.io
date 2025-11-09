// Simple fade-in animation for sections
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section");
  sections.forEach((section, i) => {
    setTimeout(() => section.classList.add("visible"), i * 200);
  });
});

// === Auto-load Latest Blog Preview on Home (collapsible) ===
document.addEventListener("DOMContentLoaded", function () {
  const teaser = document.getElementById("latest-blog-content");
  if (!teaser) return;

  fetch("blogs.html")
    .then((res) => res.text())
    .then((html) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      const firstBlog = doc.querySelector(".blog-list .blog-item");

      if (!firstBlog) {
        teaser.innerHTML = "<p>No blog posts found.</p>";
        return;
      }

      const title =
        firstBlog.querySelector(".blog-title")?.innerText.trim() || "Untitled";
      const meta =
        firstBlog.querySelector(".blog-meta")?.innerText.trim() || "";
      const fullAbstract =
        firstBlog.querySelector(".blog-body p")?.innerText.trim() ||
        "New post available.";
      const link =
        firstBlog.querySelector(".blog-actions a")?.getAttribute("href") ||
        "blogs.html";
      const isPDF = link.toLowerCase().endsWith(".pdf");

      // short version for collapsed state
      const shortAbstract =
        fullAbstract.length > 200
          ? fullAbstract.substring(0, 200).trim() + "…"
          : fullAbstract;

      teaser.innerHTML = `
        <div class="blog-card home">
          <h3>${title}</h3>
          ${meta ? `<p class="date">${meta}</p>` : ""}
          <p class="abstract short">${shortAbstract}</p>
          <p class="abstract full" style="display:none;">${fullAbstract}</p>
          <button class="blog-toggle-home" type="button">Show more ▾</button>
          <a href="${link}" class="btn primary read-full" target="_blank" style="display:none;">
            ${isPDF ? "Read Full PDF" : "Read Full Blog"}
          </a>
        </div>
      `;

      // hook up toggle
      const toggleBtn = teaser.querySelector(".blog-toggle-home");
      const shortP = teaser.querySelector(".abstract.short");
      const fullP = teaser.querySelector(".abstract.full");
      const readBtn = teaser.querySelector(".read-full");

      toggleBtn.addEventListener("click", () => {
        const expanded = fullP.style.display === "block";
        if (expanded) {
          fullP.style.display = "none";
          readBtn.style.display = "none";
          shortP.style.display = "block";
          toggleBtn.textContent = "Show more ▾";
        } else {
          fullP.style.display = "block";
          readBtn.style.display = "inline-block";
          shortP.style.display = "none";
          toggleBtn.textContent = "Show less ▴";
        }
      });
    })
    .catch((err) => {
      console.error("Latest blog load error:", err);
      teaser.innerHTML = "<p>Couldn't load latest post.</p>";
    });
});
