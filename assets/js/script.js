// Simple fade-in animation for sections
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section");
  sections.forEach((section, i) => {
    setTimeout(() => section.classList.add("visible"), i * 200);
  });
});

// === Auto-load Latest Blog Preview on Home ===
document.addEventListener("DOMContentLoaded", function() {
  // Only run on the homepage
  if (!document.getElementById("latest-blog-content")) return;

  fetch("blogs.html")
    .then(response => response.text())
    .then(html => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      const firstBlog = doc.querySelector(".blog-item");
      const preview = document.getElementById("latest-blog-content");

      if (firstBlog && preview) {
        const title = firstBlog.querySelector("h3")?.innerText || "Untitled";
        const abstract = firstBlog.querySelector(".abstract")?.innerText || "";
        const link = firstBlog.querySelector("a")?.href || "blogs.html";
        const date = firstBlog.querySelector(".date")?.innerText || "";

        preview.innerHTML = `
          <div class="blog-card">
            <h3>${title}</h3>
            <p class="date">${date}</p>
            <p class="abstract">${abstract}</p>
            <a href="${link}" class="btn primary">Read Full Blog</a>
          </div>
        `;
      }
    })
    .catch(err => {
      const preview = document.getElementById("latest-blog-content");
      if (preview) preview.innerHTML = "<p>Couldn't load latest post.</p>";
      console.error("Error loading latest blog:", err);
    });
});
