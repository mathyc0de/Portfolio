import {
  defaultLanguage,
  getPortfolioContent,
  supportedLanguages,
} from "./assets/content.js";

const THEME_STORAGE_KEY = "portfolio-theme";
const LANGUAGE_STORAGE_KEY = "portfolio-language";

let currentLanguage = defaultLanguage;
let currentUi = {};
let revealObserver = null;

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
  toggle.textContent = isDark ? currentUi.themeLight : currentUi.themeDark;
  toggle.setAttribute(
    "aria-label",
    isDark ? currentUi.themeLightAria : currentUi.themeDarkAria
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
  applyImageFocus(image, config);
  if (container) {
    container.hidden = false;
  }
}

function hasText(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function clampPercent(value, fallback = 50) {
  const number = Number(value);
  if (Number.isNaN(number)) {
    return fallback;
  }

  return Math.min(100, Math.max(0, number));
}

function applyImageFocus(image, config) {
  if (!image || !config) {
    return;
  }

  if (hasText(config.objectPosition)) {
    image.style.objectPosition = config.objectPosition.trim();
    return;
  }

  if (config.focus && typeof config.focus === "object") {
    const x = clampPercent(config.focus.x);
    const y = clampPercent(config.focus.y);
    image.style.objectPosition = `${x}% ${y}%`;
    return;
  }

  if (hasText(config.focus)) {
    image.style.objectPosition = config.focus.trim();
    return;
  }

  image.style.removeProperty("object-position");
}

function normalizeImageConfig(image) {
  if (!image) {
    return null;
  }

  if (typeof image === "string" && hasText(image)) {
    return { src: image.trim() };
  }

  if (typeof image === "object" && hasText(image.src)) {
    return image;
  }

  return null;
}

function createPreviewImageTrigger(config, { fallbackAlt, wrapClass, imageClass }) {
  const imageConfig = normalizeImageConfig(config);
  if (!imageConfig) {
    return null;
  }

  const alt = imageConfig.alt || fallbackAlt;
  const imageWrap = document.createElement("button");
  imageWrap.className = `${wrapClass} image-preview-trigger`;
  imageWrap.type = "button";

  const image = document.createElement("img");
  image.className = imageClass;
  image.src = imageConfig.src;
  image.alt = alt;
  image.loading = "lazy";
  image.decoding = "async";
  applyImageFocus(image, imageConfig);

  imageWrap.setAttribute("aria-label", `${currentUi.openImage}: ${alt}`);
  imageWrap.addEventListener("click", () => openImageDialog(image.src, alt));
  imageWrap.appendChild(image);

  return imageWrap;
}

function openImageDialog(src, alt) {
  const dialog = byId("image-dialog");
  const image = byId("image-dialog-image");
  if (!dialog || !image) {
    return;
  }

  image.src = src;
  image.alt = alt;
  dialog.showModal();
}

function setupImageDialog() {
  const dialog = byId("image-dialog");
  const closeButton = byId("image-dialog-close");
  const image = byId("image-dialog-image");
  if (!dialog || !closeButton || !image) {
    return;
  }

  closeButton.addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
      dialog.close();
    }
  });
  dialog.addEventListener("close", () => {
    image.removeAttribute("src");
    image.alt = "";
  });
}

function getStoredLanguage() {
  try {
    const value = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return supportedLanguages.some(({ code }) => code === value) ? value : null;
  } catch {
    return null;
  }
}

function getBrowserLanguage() {
  const browserLanguage = navigator.language?.slice(0, 2).toLowerCase();
  return supportedLanguages.some(({ code }) => code === browserLanguage)
    ? browserLanguage
    : defaultLanguage;
}

function renderUi(ui, meta, hero) {
  currentUi = ui;
  document.documentElement.lang = currentLanguage;

  setText("skip-link", ui.skipLink);
  setText("nav-about", ui.navAbout);
  setText("nav-experiences", ui.navExperiences);
  setText("nav-projects", ui.navProjects);
  setText("nav-skills", ui.navSkills);
  setText("nav-contact", ui.navContact);
  setText("about-title", ui.sectionAbout);
  setText("experiences-title", ui.sectionExperiences);
  setText("projects-title", ui.sectionProjects);
  setText("skills-title", ui.sectionSkills);
  setText("contact-title", ui.sectionContact);
  setText("footer-rights", ui.footerRights);
  setText("noscript-note", ui.noscript);

  const dialog = byId("image-dialog");
  const closeButton = byId("image-dialog-close");
  if (dialog) {
    dialog.setAttribute("aria-label", ui.imageDialogLabel);
  }
  if (closeButton) {
    closeButton.setAttribute("aria-label", ui.imageDialogClose);
  }

  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute("content", meta.description);
  }

  document.title = `${meta.title} | ${hero.name}`;

  const currentTheme =
    document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
  updateThemeToggleText(currentTheme);
  updateLanguageSwitcher();
}

function updateLanguageSwitcher() {
  const switcher = byId("language-switcher");
  if (!switcher) {
    return;
  }

  switcher.setAttribute("aria-label", currentUi.languageLabel);
  switcher.innerHTML = "";

  supportedLanguages.forEach(({ code, label, name }) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "language-switcher-button";
    button.dataset.lang = code;
    button.textContent = label;
    button.setAttribute("aria-label", name);
    button.setAttribute("aria-pressed", String(code === currentLanguage));

    if (code === currentLanguage) {
      button.classList.add("is-active");
    }

    button.addEventListener("click", () => setLanguage(code));
    switcher.appendChild(button);
  });
}

function setLanguage(language) {
  if (language === currentLanguage) {
    return;
  }

  currentLanguage = language;
  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  } catch {}

  renderPortfolio(getPortfolioContent(language));
}

function setupLanguageSwitcher() {
  currentLanguage = getStoredLanguage() || getBrowserLanguage();
  renderPortfolio(getPortfolioContent(currentLanguage));
}

function renderHero(hero, meta) {
  setText("brand-name", hero.name);
  setText("footer-name", hero.name);
  setText("hero-role", hero.role);
  setText("hero-title", hero.name);
  setText("hero-intro", hero.intro);
  setLink("hero-primary", hero.primaryAction);
  setLink("hero-secondary", hero.secondaryAction);
  setImage("hero-image", "hero-media", hero.image, `${hero.name} profile image`);
  document.title = `${meta.title} | ${hero.name}`;
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

function renderExperiences(experiences) {
  const grid = byId("experiences-grid");
  if (!grid) {
    return;
  }

  grid.innerHTML = "";

  experiences.forEach((experience) => {
    if (!experience) {
      return;
    }

    const card = document.createElement("article");
    card.className = "experience-card reveal";

    const imageConfig = normalizeImageConfig(experience.image);
    if (imageConfig) {
      const imageWrap = createPreviewImageTrigger(imageConfig, {
        fallbackAlt: `${experience.company || experience.role} preview`,
        wrapClass: "experience-image-wrap",
        imageClass: "experience-image",
      });

      if (imageWrap) {
        card.appendChild(imageWrap);
      }
    }

    const header = document.createElement("div");
    header.className = "experience-header";

    if (hasText(experience.role)) {
      const title = document.createElement("h3");
      title.textContent = experience.role;
      header.appendChild(title);
    }

    if (hasText(experience.period)) {
      const period = document.createElement("p");
      period.className = "experience-period";
      period.textContent = experience.period;
      header.appendChild(period);
    }

    if (header.childElementCount > 0) {
      card.appendChild(header);
    }

    if (hasText(experience.company)) {
      const company = document.createElement("p");
      company.className = "experience-company";
      company.textContent = experience.company;
      card.appendChild(company);
    }

    if (hasText(experience.summary)) {
      const summary = document.createElement("p");
      summary.className = "experience-summary";
      summary.textContent = experience.summary;
      card.appendChild(summary);
    }

    if (Array.isArray(experience.highlights) && experience.highlights.length > 0) {
      const highlights = document.createElement("ul");
      highlights.className = "experience-highlights";

      experience.highlights.forEach((item) => {
        if (!hasText(item)) {
          return;
        }

        const point = document.createElement("li");
        point.textContent = item;
        highlights.appendChild(point);
      });

      if (highlights.childElementCount > 0) {
        card.appendChild(highlights);
      }
    }

    if (card.childElementCount > 0) {
      grid.appendChild(card);
    }
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
      const imageWrap = createPreviewImageTrigger(project.image, {
        fallbackAlt: `${project.name} preview`,
        wrapClass: "project-image-wrap",
        imageClass: "project-image",
      });

      if (imageWrap) {
        card.appendChild(imageWrap);
      }
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
  if (revealObserver) {
    revealObserver.disconnect();
  }

  const items = Array.from(document.querySelectorAll(".reveal"));
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reducedMotion || !("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  items.forEach((item) => revealObserver.observe(item));
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

function renderPortfolio(content) {
  renderUi(content.ui, content.meta, content.hero);
  renderHero(content.hero, content.meta);
  renderAbout(content.about);
  renderExperiences(content.experiences);
  renderProjects(content.projects);
  renderSkills(content.skills);
  renderContact(content.contact);
  setText("current-year", String(new Date().getFullYear()));
  setupRevealAnimations();
}

function bootstrapPortfolio() {
  setupThemeToggle();
  setupImageDialog();
  setupLanguageSwitcher();
  setupCurrentSectionHighlight();
}

document.addEventListener("DOMContentLoaded", bootstrapPortfolio);
