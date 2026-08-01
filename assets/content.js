export const supportedLanguages = [
  { code: "en", label: "EN", name: "English" },
  { code: "pt", label: "PT", name: "Português" },
];

export const defaultLanguage = "en";

export function l(en, pt) {
  return { __localized: true, en, pt };
}

function resolveLocalized(value, language) {
  if (value && typeof value === "object" && value.__localized) {
    return value[language] ?? value.en;
  }

  if (Array.isArray(value)) {
    return value.map((item) => resolveLocalized(item, language));
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, resolveLocalized(item, language)])
    );
  }

  return value;
}

export function getPortfolioContent(language = defaultLanguage) {
  const resolvedLanguage = supportedLanguages.some(({ code }) => code === language)
    ? language
    : defaultLanguage;

  return resolveLocalized(portfolioContent, resolvedLanguage);
}

const portfolioContent = {
  meta: {
    title: l("Portfolio", "Portfólio"),
    description: l(
      "Personal portfolio showcasing projects, skills, and contact details.",
      "Portfólio pessoal com projetos, habilidades e informações de contato."
    ),
  },
  ui: {
    skipLink: l("Skip to main content", "Ir para o conteúdo principal"),
    languageLabel: l("Language", "Idioma"),
    themeDark: l("Dark mode", "Modo escuro"),
    themeLight: l("Light mode", "Modo claro"),
    themeDarkAria: l("Switch to dark theme", "Alternar para tema escuro"),
    themeLightAria: l("Switch to light theme", "Alternar para tema claro"),
    navAbout: l("About", "Sobre"),
    navExperiences: l("Experiences", "Experiências"),
    navProjects: l("Projects", "Projetos"),
    navSkills: l("Skills", "Habilidades"),
    navContact: l("Contact", "Contato"),
    sectionAbout: l("About", "Sobre"),
    sectionExperiences: l("Experiences", "Experiências"),
    sectionProjects: l("Projects", "Projetos"),
    sectionSkills: l("Skills", "Habilidades"),
    sectionContact: l("Contact", "Contato"),
    footerRights: l("All rights reserved.", "Todos os direitos reservados."),
    imageDialogLabel: l("Image preview", "Visualização da imagem"),
    imageDialogClose: l("Close image preview", "Fechar visualização da imagem"),
    openImage: l("Open full-size image", "Abrir imagem em tamanho real"),
    noscript: l(
      "This page needs JavaScript to load content from assets/content.js.",
      "Esta página precisa de JavaScript para carregar o conteúdo de assets/content.js."
    ),
  },
  hero: {
    name: "Matheus Pimenta Silveira",
    role: l(
      "Fullstack Developer & Software Engineer",
      "Desenvolvedor Fullstack e Engenheiro de Software"
    ),
    intro: l(
      "Software Developer focused on AI-powered mobile applications, building performant and scalable apps with strong architectural practices. 3+ years of experience with Flutter, including a production app on the Google Play Store and a high-impact scientific application in computer vision.",
      "Desenvolvedor de software focado em aplicativos mobile com IA, criando apps performáticos e escaláveis com boas práticas de arquitetura. Mais de 3 anos de experiência com Flutter, incluindo um app em produção na Google Play Store e um aplicativo científico de alto impacto em visão computacional."
    ),
    image: {
      src: "assets/images/profile.jpeg",
      alt: l(
        "Matheus Pimenta Silveira profile photo",
        "Foto de perfil de Matheus Pimenta Silveira"
      ),
    },
    primaryAction: {
      label: l("View Projects", "Ver Projetos"),
      href: "#projects",
      openInNewTab: false,
    },
    secondaryAction: {
      label: l("Get in Touch", "Entrar em Contato"),
      href: "#contact",
      openInNewTab: false,
    },
  },
  about: {
    paragraphs: [
      l(
        "I am a Software Developer focused on AI-powered mobile applications, with 3+ years of experience in Flutter development. I work on performant, scalable apps with strong architectural practices, from production consumer apps to high-impact scientific software in computer vision.",
        "Sou um desenvolvedor de software com foco em aplicações mobile e IA. Possuo mais de 3 anos de experiência em Flutter. Trabalho em apps performáticos e escaláveis, com boas práticas de arquitetura, desde apps de consumo em produção até software científico de alto impacto em visão computacional."
      ),
      l(
        "I combine mobile development, cloud services, and AI/ML to deliver solutions that meet real client and research needs. I thrive in agile teams, translating requirements into maintainable code and applying Clean Code, design patterns, and modern tooling throughout the development lifecycle.",
        "Combino desenvolvimento mobile, serviços em nuvem e IA/ML para entregar soluções que atendem necessidades reais de clientes e pesquisa. Atuo bem em times ágeis, traduzindo requisitos em código sustentável e aplicando Clean Code, design patterns e ferramentas modernas ao longo do ciclo de desenvolvimento."
      ),
    ],
  },
  experiences: [
    {
      role: l(
        "Research Assistant — Fishery Video Monitoring",
        "Bolsista de Iniciação Científica — Videomonitoramento da Pesca"
      ),
      company: "FURG",
      period: l("May 2026 — Present", "Maio 2026 — Presente"),
      image: null,
      summary: l(
        "Research assistant studying computer vision applications for fishery video monitoring systems.",
        "Atuo, no momento, estudando aplicações de visão computacional para sistemas de videomonitoramento da pesca."
      ),
      highlights: [
        l(
          "Studying computer vision applications related to fishery video monitoring systems for future implementation.",
          "Estudo de aplicações de visão computacional relacionadas a sistemas de videomonitoramento da pesca para implementação futura."
        ),
      ],
    },
    {
      role: l("Research Assistant — SafEye", "Bolsista de Iniciação Científica — SafEye"),
      company: "iTec FURG",
      period: l("January 2023 — October 2025", "Janeiro 2023 — Outubro 2025"),
      image: {
        src: "assets/images/safeye.gif",
        alt: l("SafEye project preview", "Prévia do projeto SafEye"),
        focus: { x: 50, y: 50 },
      },
      summary: l(
        "Worked on the Software team of the TLR7 project called SafEye, developing a mobile app to detect anomalies in truck drivers' work-related condition through ocular analysis (Pupillary Light Reflex).",
        "Atuei na equipe de Software do projeto TLR7 chamado SafEye, desenvolvendo um app mobile para detectar anomalias na condição laboral de motoristas de caminhão por análise ocular (Pupilary Light Reflex)."
      ),
      highlights: [
        l(
          "Developed the app with Flutter and Dart best practices, accessing hardware resources via Platform Channels and Kotlin — including infrared camera control at the native Android API level.",
          "Desenvolvi o app com Flutter e boas práticas em Dart, acessando recursos de hardware via Platform Channels e Kotlin — incluindo controle de câmera infravermelha no nível da API nativa Android."
        ),
        l(
          "Built and integrated the REST API responsible for receiving data during the collection phase and for work-condition inference in the project's final stage.",
          "Construí e integrei a REST API responsável por receber dados durante a fase de coleta e pela inferência da condição laboral dos motoristas na etapa final do projeto."
        ),
        l(
          "Supported research and development of detection methods using traditional strategies and Deep Learning.",
          "Apoiei a pesquisa e o desenvolvimento de métodos de detecção usando estratégias tradicionais e Deep Learning."
        ),
      ],
    },
  ],
  projects: [
    {
      name: l("Granosi: Languages with AI", "Granosi: Idiomas com IA"),
      summary: l(
        "AI-assisted language practice app available on the Google Play Store. Built with Flutter and Google Cloud Platform, featuring advanced state management, multi-language support, and generative AI for practice correction and assisted conversation.",
        "App de prática de idiomas assistido por IA, disponível na Google Play Store. Desenvolvido com Flutter e Google Cloud Platform, com gerenciamento de estado avançado, suporte multilíngue e IA generativa para correção de práticas e conversação assistida."
      ),
      image: {
        src: "assets/images/widget.png",
        alt: l(
          "Granosi: Languages with AI app preview",
          "Prévia do app Granosi: Idiomas com IA"
        ),
        focus: { x: 50, y: 50 },
      },
      stack: [
        "Flutter",
        "Riverpod",
        "Google Cloud Platform",
        "Firebase Cloud Functions",
        "Prompt Engineering",
        "RAG & Embeddings",
        "l10n",
      ],
      link: {
        label: l("Find on Play Store", "Ver na Play Store"),
        href: "https://play.google.com/store/apps/details?id=com.mssoftware.translation_daybook",
        openInNewTab: true,
      },
    },
    {
      name: "Market Invoices",
      summary: l(
        "Non-fiscal invoice generation app tailored for produce and poultry retail, built with Flutter. Features local data persistence with SQLite and was developed to meet a specific client need for issuing invoices in a simplified way on mobile devices.",
        "App de emissão de notas não fiscais, por dispositivos móveis, voltado para varejo de hortifruti granjeiro, desenvolvido com Flutter. Possui persistência local com SQLite e foi criado para atender uma necessidade específica do cliente de emitir notas de forma simplificada em dispositivos móveis."
      ),
      image: {
        src: "assets/images/market.png",
        alt: l("Market Invoices app preview", "Prévia do app Market Invoices"),
        focus: { x: 50, y: 12 },
      },
      stack: ["Flutter", "SQLite"],
      link: {
        label: l("Repository", "Repositório"),
        href: "https://github.com/mathyc0de/market-invoices-app",
        openInNewTab: true,
      },
    },
  ],
  skills: [
    {
      category: l("Mobile Development", "Desenvolvimento Mobile"),
      items: [
        "Flutter",
        "Riverpod",
        l("State Management", "Gerenciamento de Estado"),
        "Platform Channels",
        l("REST API Integration", "Integração com REST API"),
        l("Internationalization (l10n)", "Internacionalização (l10n)"),
      ],
    },
    {
      category: l("Cloud & Backend", "Cloud & Backend"),
      items: [
        "Google Cloud Platform",
        "Firebase",
        "Firestore",
        "OAuth",
        "Vertex AI",
        "Node.js",
        "REST APIs",
      ],
    },
    {
      category: l("AI / ML", "IA / ML"),
      items: [
        "Prompt Engineering",
        l("RAG & Embeddings", "RAG & Embeddings"),
        "PyTorch",
        "TensorFlow",
        l("Computer Vision", "Visão Computacional"),
        "Deep Learning",
        "Classic ML Algorithms",
      ],
    },
    {
      category: l("Programming Languages", "Linguagens de Programação"),
      items: ["Dart", "Kotlin", "Python", "TypeScript", "C#", "C++"],
    },
    {
      category: l("Databases", "Bancos de Dados"),
      items: ["SQLite", "Firestore", "MongoDB", "MySQL"],
    },
    {
      category: l("Practices & Tooling", "Práticas & Ferramentas"),
      items: [
        "Scrum",
        l("Agile Teams", "Times Ágeis"),
        "Clean Code",
        l("Design Patterns", "Design Patterns"),
        "Git",
        "CI/CD",
        "Figma",
        l("AI-Assisted Development", "Desenvolvimento Assistido por IA"),
      ],
    },
    {
      category: l("Languages", "Idiomas"),
      items: [
        l("Portuguese (Native)", "Português (Nativo)"),
        l("English (advanced — course in progress)", "Inglês (avançado — curso em andamento)"),
      ],
    },
  ],
  contact: {
    intro: l(
      "I am currently open to new opportunities and collaboration. Feel free to reach out through any of the channels below.",
      "Estou aberto a novas oportunidades e colaborações. Entre em contato por qualquer um dos canais abaixo."
    ),
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
    kaggle: {
      label: "kaggle.com/matheuspsilveira",
      href: "https://www.kaggle.com/matheuspsilveira",
      openInNewTab: true,
    }
  },
};
