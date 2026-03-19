import { portfolioContent } from "./assets/content.js";

const THEME_STORAGE_KEY = "portfolio-theme";

function byId(id) {
  return document.getElementById(id);
}

function setText(id, value) {
  const node = byId(id);
  if (node) {
    node.textContent = value;
  }
}

function setLink(id, config) {
  const node = byId(id);
  if (!node || !config) {
    return;
  }

  node.textContent = config.label;
  node.setAttribute("href", config.href);

  if (config.openInNewTab) {
    node.setAttribute("target", "_blank");
    node.setAttribute("rel", "noreferrer noopener");
  } else {
    node.removeAttribute("target");
    node.removeAttribute("rel");
  }
}

function getStoredTheme() {
  try {
    const value = localStorage.getItem(THEME_STORAGE_KEY);
    return value === "light" || value === "dark" ? value : null;
  } catch {
    return null;
  }
}

function getSystemTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  document.documentElement.style.colorScheme = theme;
}

function updateThemeToggleText(theme) {
  const toggle = byId("theme-toggle");
  if (!toggle) {
    return;
  }

  const isDark = theme === "dark";
  toggle.textContent = isDark ? "Light mode" : "Dark mode";
  toggle.setAttribute(
    "aria-label",
    isDark ? "Switch to light theme" : "Switch to dark theme"
  );
  toggle.setAttribute("aria-pressed", String(isDark));
}

function setupThemeToggle() {
  const toggle = byId("theme-toggle");
  if (!toggle) {
    return;
  }

  const storedTheme = getStoredTheme();
  let hasUserPreference = Boolean(storedTheme);
  const initialTheme = storedTheme || getSystemTheme();
  setTheme(initialTheme);
  updateThemeToggleText(initialTheme);

  toggle.addEventListener("click", () => {
    const currentTheme =
      document.documentElement.getAttribute("data-theme") === "dark"
        ? "dark"
        : "light";
    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    updateThemeToggleText(nextTheme);
    hasUserPreference = true;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    } catch {}
  });

  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const syncWithSystem = (event) => {
    if (hasUserPreference) {
      return;
    }
    const theme = event.matches ? "dark" : "light";
    setTheme(theme);
    updateThemeToggleText(theme);
  };

  if (mediaQuery.addEventListener) {
    mediaQuery.addEventListener("change", syncWithSystem);
  } else {
    mediaQuery.addListener(syncWithSystem);
  }
}

function setImage(imageId, containerId, config, fallbackAlt = "") {
  const image = byId(imageId);
  const container = byId(containerId);
  if (!image) {
    return;
  }

  if (!config || !config.src) {
    image.removeAttribute("src");
    image.alt = "";
    if (container) {
      container.hidden = true;
    }
    return;
  }

  image.src = config.src;
  image.alt = config.alt || fallbackAlt;
  if (container) {
    container.hidden = false;
  }
}

function hasText(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function renderHero(hero) {
  setText("brand-name", hero.name);
  setText("footer-name", hero.name);
  setText("hero-role", hero.role);
  setText("hero-title", hero.name);
  setText("hero-intro", hero.intro);
  setLink("hero-primary", hero.primaryAction);
  setLink("hero-secondary", hero.secondaryAction);
  setImage("hero-image", "hero-media", hero.image, `${hero.name} profile image`);
  document.title = `Portfolio | ${hero.name}`;
}

function renderAbout(about) {
  const container = byId("about-content");
  if (!container) {
    return;
  }

  container.innerHTML = "";
  about.paragraphs.forEach((paragraph) => {
    const p = document.createElement("p");
    p.textContent = paragraph;
    container.appendChild(p);
  });
}

function renderProjects(projects) {
  const grid = byId("projects-grid");
  if (!grid) {
    return;
  }

  grid.innerHTML = "";

  projects.forEach((project) => {
    const card = document.createElement("article");
    card.className = "project-card reveal";

    if (project.image && project.image.src) {
      const imageWrap = document.createElement("div");
      imageWrap.className = "project-image-wrap";

      const image = document.createElement("img");
      image.className = "project-image";
      image.src = project.image.src;
      image.alt = project.image.alt || `${project.name} preview`;
      image.loading = "lazy";
      image.decoding = "async";

      imageWrap.appendChild(image);
      card.appendChild(imageWrap);
    }

    if (hasText(project.name)) {
      const title = document.createElement("h3");
      title.textContent = project.name;
      card.appendChild(title);
    }

    if (hasText(project.summary)) {
      const summary = document.createElement("p");
      summary.textContent = project.summary;
      card.appendChild(summary);
    }

    if (Array.isArray(project.stack) && project.stack.length > 0) {
      const stack = document.createElement("ul");
      stack.className = "stack-list";

      project.stack.forEach((item) => {
        if (!hasText(item)) {
          return;
        }
        const skill = document.createElement("li");
        skill.textContent = item;
        stack.appendChild(skill);
      });

      if (stack.childElementCount > 0) {
        card.appendChild(stack);
      }
    }

    if (project.link && hasText(project.link.label) && hasText(project.link.href)) {
      const link = document.createElement("a");
      link.className = "project-link";
      link.textContent = project.link.label;
      link.href = project.link.href;
      if (project.link.openInNewTab) {
        link.target = "_blank";
        link.rel = "noreferrer noopener";
      }
      card.appendChild(link);
    }

    grid.appendChild(card);
  });
}

function renderSkills(skillGroups) {
  const grid = byId("skills-grid");
  if (!grid) {
    return;
  }

  grid.innerHTML = "";

  skillGroups.forEach((group) => {
    if (!group) {
      return;
    }

    const card = document.createElement("article");
    card.className = "skill-group reveal";

    if (hasText(group.category)) {
      const title = document.createElement("h3");
      title.textContent = group.category;
      card.appendChild(title);
    }

    if (Array.isArray(group.items) && group.items.length > 0) {
      const list = document.createElement("ul");
      list.className = "skill-items";

      group.items.forEach((item) => {
        if (!hasText(item)) {
          return;
        }
        const element = document.createElement("li");
        element.textContent = item;
        list.appendChild(element);
      });

      if (list.childElementCount > 0) {
        card.appendChild(list);
      }
    }

    if (card.childElementCount > 0) {
      grid.appendChild(card);
    }
  });
}

function renderContact(contact) {
  setText("contact-text", contact.intro);
  setLink("contact-email", contact.email);
  setLink("contact-linkedin", contact.linkedin);
  setLink("contact-github", contact.github);
}

function setupRevealAnimations() {
  const items = Array.from(document.querySelectorAll(".reveal"));
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reducedMotion || !("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  items.forEach((item) => observer.observe(item));
}

function setupCurrentSectionHighlight() {
  const sections = Array.from(document.querySelectorAll("main section[id]"));
  const navLinks = Array.from(document.querySelectorAll(".nav-list a"));

  if (!("IntersectionObserver" in window)) {
    return;
  }

  const linkMap = new Map(
    navLinks.map((link) => [link.getAttribute("href")?.slice(1), link])
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        navLinks.forEach((link) => link.removeAttribute("aria-current"));
        const targetLink = linkMap.get(entry.target.id);
        if (targetLink) {
          targetLink.setAttribute("aria-current", "true");
        }
      });
    },
    {
      rootMargin: "-35% 0px -55% 0px",
      threshold: 0.1,
    }
  );

  sections.forEach((section) => observer.observe(section));
}

function bootstrapPortfolio() {
  setupThemeToggle();
  renderHero(portfolioContent.hero);
  renderAbout(portfolioContent.about);
  renderProjects(portfolioContent.projects);
  renderSkills(portfolioContent.skills);
  renderContact(portfolioContent.contact);
  setText("current-year", String(new Date().getFullYear()));
  setupRevealAnimations();
  setupCurrentSectionHighlight();
}

document.addEventListener("DOMContentLoaded", bootstrapPortfolio);
