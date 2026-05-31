export const portfolioContent = {
  hero: {
    name: "Matheus Silveira",
    role: "Software Engineer",
    intro:
      "A Mobile Developer and AI enthusiast. Always eager to learn and grow, I'm ready to contribute my skills and passion to create impactful digital experiences.",
    image: {
      src: "assets/images/profile.jpeg",
      alt: "assets/images/profile-placeholder.svg",
    },
    primaryAction: {
      label: "View Projects",
      href: "#projects",
      openInNewTab: false,
    },
    secondaryAction: {
      label: "Get in Touch",
      href: "#contact",
      openInNewTab: false,
    },
  },
  about: {
    paragraphs: [
      "I started my development journey along with my undergraduate studies in Computer Engineering " + 
      "3 years ago. Since this, I've been learning day by day, building projects, and exploring the "  + 
      "ever-evolving tech landscape.",

      "As a Mobile Engineer, Backend developer or Data Scientist, I strongly care about Software Architecture, " + 
      "applying best practices and design patterns to create scalable and maintainable solutions."
    ],
  },
  projects: [
    {
      name: "Granosi",
      summary:
        "Granosi is a mobile language-learning app focused on real writing practice. Users journal about their day in a language they already speak, translate it into the language they are learning, and get instant AI feedback with a 0–10 score, corrections, and improvement tips. The app also includes target-language grammar mode, free chat with AI assistants, a practice daybook with history and stats, optional cloud backup, and a Granosi Plus subscription — all with a multilingual interface in 12 languages.",
      image: {
        src: "assets/images/widget.png",
        alt: "assets/images/project-placeholder.svg",
      },
      stack: [
        "Flutter",
        "Riverpod",
        "Firebase",
        "Python",
        "Cloud Functions",
        "SQLite",
        "AI/LLM",
        "Internationalization",
      ],
      link: {
        label: "Coming Soon",
        href: "https://play.google.com/store/apps/details?id=com.mssoftware.translation_daybook",
        openInNewTab: true,
      },
    },
    {
      name: "Market Invoices",
      summary:
        "Market Invoices is a simple invoice management app for a local market. It allows their users to create, " + 
        "track and print invoices through a user-friendly interface.",
      image: {
        src: "assets/images/market.png",
        alt: "assets/images/project-placeholder.svg",
      },
      stack: ["Flutter", "SQLite"],
      link: {
        label: "Repository",
        href: "https://github.com/mathyc0de/market-invoices-app",
        openInNewTab: true,
      },
    },
  ],
  skills: [
    {
      category: "AI/ML",
      items: ["Transformer Models", "NLP", "RAG Systems", "Crew AI", "Computer Vision"],
    },
    {
      category: "Mobile Development",
      items: ["Flutter", "Riverpod", "Firebase", "SQLite", "Internationalization"],
    },
    {
      category: "Backend",
      items: ["Asp.Net Core", "FastAPI", "Python", "Cloud Functions", "REST APIs"],
    },
    {
      category: "Tooling",
      items: ["Git", "GitHub Actions", "CI/CD"],
    },
    {
      category: "Practices",
      items: ["Unit Testing", "Integration Testing", "SOLID Principles", "Clean Code", "Design Patterns"],
    },
    {
      category: "Soft Skills",
      items: ["Communication", "Ownership", "Teamwork", "Mentoring"],
    },
    {
      category: "Languages",
      items: ["Portuguese (Native)", "English (Advanced)"],
    }
  ],
  contact: {
    intro:
      "I am currently open to new opportunities and collaboration. Feel free to reach out through any of the channels below.",
    email: {
      label: "matheuspsilveira0@gmail.com",
      href: "mailto:matheuspsilveira0@gmail.com",
      openInNewTab: false,
    },
    linkedin: {
      label: "linkedin.com/in/matheuspsilveira",
      href: "https://linkedin.com/in/matheuspsilveira/",
      openInNewTab: true,
    },
    github: {
      label: "github.com/mathyc0de",
      href: "https://github.com/mathyc0de",
      openInNewTab: true,
    },
  },
};
