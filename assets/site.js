(() => {
  const content = window.PORTFOLIO_CONTENT;
  const page = document.body.dataset.page || "";
  const depth = location.pathname.includes("/portfolio/") || location.pathname.includes("/blog/") || location.pathname.includes("/about/") || location.pathname.includes("/resume/") || location.pathname.includes("/contact/") ? "../" : "";
  const path = (value) => `${depth}${value}`;

  const navItems = [
    ["Home", "index.html", "home"], ["Portfolio", "portfolio/index.html", "portfolio"], ["Blog", "blog/index.html", "blog"],
    ["About", "about/index.html", "about"], ["Resume", "resume/index.html", "resume"], ["Contact", "contact/index.html", "contact"]
  ];
  const header = document.querySelector("#site-header");
  const footer = document.querySelector("#site-footer");
  if (header) header.innerHTML = `<header class="site-header"><div class="page-shell nav-wrap"><a class="brand" href="${path("index.html")}" aria-label="${content.site.name}, home"><span class="brand-mark" aria-hidden="true">GP</span><span>${content.site.name}</span></a><nav aria-label="Primary"><ul>${navItems.map(([label, url, id]) => `<li><a href="${path(url)}" ${page === id ? 'aria-current="page"' : ""}>${label}</a></li>`).join("")}</ul></nav></div></header>`;
  if (footer) footer.innerHTML = `<footer class="site-footer"><div class="page-shell footer-wrap"><p>© ${new Date().getFullYear()} ${content.site.name}. All rights reserved.</p><a href="${path("contact/index.html")}">Contact</a></div></footer>`;

  const projectUrl = (project) => path(`portfolio/${project.id}.html`);
  const postUrl = (post) => path(`blog/${post.id}.html`);
  const projectCard = (project) => `<a class="content-card content-card--${project.accent}" href="${projectUrl(project)}"${project.image ? ` style="--project-image:url('${project.image}')"` : ""}><span class="content-card__number">${String(content.projects.indexOf(project) + 1).padStart(2, "0")}</span><div><p class="eyebrow">${project.tags.slice(0, 2).join(" · ")}</p><h3>${project.title}</h3><p class="content-card__role">${project.role}</p></div><span class="content-card__arrow" aria-hidden="true">↗</span></a>`;
  const postCard = (post) => `<a class="content-card content-card--${post.accent}" href="${postUrl(post)}"><span class="content-card__number">${post.type}</span><div><p class="eyebrow">${post.date}</p><h3>${post.title}</h3><p class="content-card__role">${post.summary}</p></div><span class="content-card__arrow" aria-hidden="true">↗</span></a>`;

  document.querySelectorAll('[data-render="featured-projects"]').forEach((element) => { element.innerHTML = content.projects.slice(0, 3).map(projectCard).join(""); });
  document.querySelectorAll('[data-render="projects"]').forEach((element) => { element.innerHTML = content.projects.map(projectCard).join(""); });
  document.querySelectorAll('[data-render="posts"]').forEach((element) => { element.innerHTML = content.posts.map(postCard).join(""); });

  const latest = content.posts[0];
  document.querySelectorAll("[data-latest-title]").forEach((element) => { element.textContent = latest.title; });
  document.querySelectorAll("[data-latest-summary]").forEach((element) => { element.textContent = latest.summary; });
  document.querySelectorAll("[data-latest-link]").forEach((element) => { element.href = postUrl(latest); });
  document.querySelectorAll("[data-contact-email]").forEach((element) => { element.href = `mailto:${content.site.email}`; });

  const projectId = document.body.dataset.project;
  if (projectId) {
    const project = content.projects.find((item) => item.id === projectId);
    if (project) {
      document.title = `${project.title} — ${content.site.name}`;
      document.querySelector("[data-detail-title]").textContent = project.title;
      document.querySelector("[data-detail-role]").textContent = project.role;
      document.querySelector("[data-detail-tags]").textContent = project.tags.join(" · ");
      document.querySelector("[data-detail-summary]").textContent = project.summary;
      document.querySelector("[data-detail-body]").textContent = project.detail;
    }
  }
  const postId = document.body.dataset.post;
  if (postId) {
    const post = content.posts.find((item) => item.id === postId);
    if (post) {
      document.title = `${post.title} — ${content.site.name}`;
      document.querySelector("[data-detail-title]").textContent = post.title;
      document.querySelector("[data-detail-role]").textContent = `${post.type} · ${post.date}`;
      document.querySelector("[data-detail-summary]").textContent = post.summary;
      document.querySelector("[data-detail-body]").textContent = post.body;
    }
  }
})();
