export type ProjectMedia = {
  cover: string;
  video?: string;
  gallery: string[];
};

export type Project = {
  id: string;
  name: string;
  tagline: string;
  summary: string;
  problem: string;
  approach: string[];
  hardest: string;
  honesty: string;
  tech: string[];
  github: string;
  attribution?: string;
  media: ProjectMedia;
  category: string;
};

export const projects: Project[] = [
  {
    id: "forensiq",
    name: "ForensiQ",
    tagline:
      "Digital evidence portal with RSA report sealing, SHA-256 intake ledgers, and tamper-evident audit trails.",
    summary:
      "Server-enforced chain of custody: integrity on intake, encrypted storage, sealed reports, hash-chained audits.",
    problem:
      "Upload demos aren’t enough. Investigators need proof of integrity and least-privilege access.",
    approach: [
      "Client + server SHA-256 verification",
      "AES-GCM + RSA-OAEP key wrapping",
      "Role ACL + hash-chained Postgres audit log",
    ],
    hardest:
      "Client crypto + server trust without storing private keys on the server.",
    honesty:
      "Lab/course project. Password hashing is bcrypt. Chat crypto uses lab-scale parameters.",
    tech: ["React", "Node.js", "PostgreSQL", "TypeScript", "Web Crypto API"],
    github: "#",
    media: {
      cover: "/projects/forensiq/cover.png",
      video: "/projects/forensiq/demo.mp4",
      gallery: [
        "/projects/forensiq/cover.png",
        "/projects/forensiq/shot-2.png",
        "/projects/forensiq/shot-3.png",
      ],
    },
    category: "Cybersecurity & Full-Stack",
  },
  {
    id: "courtms",
    name: "CourtMS",
    tagline:
      "End-to-end court case management enforcing a 5-role lifecycle state machine.",
    summary:
      "Citizen, lawyer, clerk, judge, admin. One lifecycle, JWT boundaries, account-linked cases. Built with Ummara.",
    problem:
      "Five roles sharing one case without leaking access or breaking the queue.",
    approach: [
      "JWT authenticate + authorize roles",
      "Handler-enforced status transitions",
      "Document downloads gated by case access",
    ],
    hardest:
      "Clerk registration with representation rules without orphaning counsel links.",
    honesty:
      "Lab scope. Privileged signup isn’t locked down. Pair project with Ummara.",
    tech: ["MongoDB", "Express", "React", "Node.js", "JWT"],
    github: "https://github.com/Faizamunir720/CourtMS",
    attribution: "With Ummara",
    media: {
      cover: "/projects/courtms/cover.png",
      video: "/projects/courtms/demo.mp4",
      gallery: [
        "/projects/courtms/cover.png",
        "/projects/courtms/shot-2.png",
        "/projects/courtms/shot-3.png",
      ],
    },
    category: "Multi-Role System",
  },
  {
    id: "lahore-avm",
    name: "Lahore AVM",
    tagline:
      "Real estate valuation with CatBoost, MAPIE conformal intervals, and SHAP explainability.",
    summary:
      "Price + 90% range + comps + plain-language why. A decision tool for Lahore listings.",
    problem:
      "Buyers need a fair-price sanity check, not a single brittle number.",
    approach: [
      "Scrape → feature pipeline → CatBoost",
      "MAPIE conformal intervals + SHAP",
      "Flask / FastAPI product UX",
    ],
    hardest:
      "Turning messy listings into trustworthy ranges and comps.",
    honesty:
      "Decision tool, not a formal appraisal. Re-verify metrics before quoting scores.",
    tech: ["Python", "Flask", "CatBoost", "SHAP", "FastAPI"],
    github: "#",
    media: {
      cover: "/projects/lahoreavm/cover.png",
      video: "/projects/lahoreavm/demo.mp4",
      gallery: [
        "/projects/lahoreavm/cover.png",
        "/projects/lahoreavm/shot-2.png",
        "/projects/lahoreavm/shot-3.png",
      ],
    },
    category: "Machine Learning",
  },
  {
    id: "finverse",
    name: "Finverse",
    tagline:
      "Java Swing paper-trading lab with real-time price ticks and educational options settlement.",
    summary:
      "Gated 12-unit Vault Trail on top of working brokerage-style engines: spreads, orders, market hours, options.",
    problem:
      "Broker apps are high-stakes; toy demos skip real market mechanics.",
    approach: [
      "Layered UI → service → DAO → H2",
      "Observer price engine + order fills",
      "Curriculum-gated product surfaces",
    ],
    hardest:
      "Keeping options settlement multipliers consistent so practice money can’t be gamed.",
    honesty:
      "Options are simplified. Yahoo quotes fall back to simulation. Local lab app.",
    tech: ["Java 17", "Swing", "H2 DB", "FlatLaf", "JFreeChart"],
    github: "#",
    media: {
      cover: "/projects/finverse/cover.png",
      video: "/projects/finverse/finverse.mp4",
      gallery: [
        "/projects/finverse/cover.png",
        "/projects/finverse/shot-2.png",
        "/projects/finverse/shot-3.png",
      ],
    },
    category: "Desktop Application",
  },
  {
    id: "careerlab",
    name: "CAREERLAB.AI",
    tagline:
      "Flask app combining Prolog rules, CSP scheduling, and genetic algorithms for multi-track career planning.",
    summary:
      "Constraint-aware career planning with skill gaps, feasibility, Ideal / Fast-Track / Core-Backup roadmaps, pivots and side hustles. Not a GPT wrapper.",
    problem:
      "Vague advice ignores prerequisites and time budgets. People need sequenced, explainable plans.",
    approach: [
      "Custom Prolog-style reasoning for pivots",
      "CSP quarter scheduling under capacity limits",
      "Genetic optimizer for intensity-aware tracks",
    ],
    hardest:
      "Building a small Prolog interpreter in pure Python for real symbolic matching.",
    honesty:
      "Chat is pattern routing over a KB, not an LLM. Market data is static.",
    tech: ["Python", "Flask", "Prolog", "CSP", "Genetic Algorithms"],
    github: "#",
    media: { cover: "", gallery: [] },
    category: "AI & Knowledge Systems",
  },
];

export const experience = [
  {
    org: "Masihai Pvt Ltd",
    role: "Software Developer",
    title: "Production Engineering",
    period: "2025 to Present",
    stack: ["Flutter", "Appwrite", "GetX", "Cubit/Bloc", "Firebase"],
    domains: [
      {
        label: "Healthcare",
        portals: ["Administrator", "Doctor", "Patient"],
      },
      {
        label: "Education",
        portals: ["Teacher", "Student"],
      },
    ],
    summary:
      "Contributing to production-scale healthcare and education platforms by implementing features, integrating backend services, and tightening architecture across multiple user portals. Day to day work spans modular Flutter surfaces, Appwrite and Firebase data paths, performance under real load, and keeping design systems consistent from administrator and doctor flows through teacher and student experiences.",
    contributions: [
      "Built and maintained production features across healthcare and education platforms, supporting administrator, doctor, patient, teacher, and student workflows.",
      "Integrated Flutter applications with Appwrite/Firebase for authentication, databases, storage, and real-time data.",
      "Improved application architecture through feature modularization, shared components, consistent navigation, and state management.",
      "Optimized performance by reducing unnecessary rebuilds, introducing caching, pagination, and efficient data loading strategies.",
      "Diagnosed and resolved production bugs involving routing, state synchronization, backend integration, and responsive UI behavior.",
      "Collaborated with designers and developers through feature branches, code reviews, and iterative product improvements.",
    ],
    technologies: [
      "Flutter",
      "Dart",
      "Appwrite",
      "Firebase",
      "GetX",
      "Cubit/Bloc",
      "REST APIs",
      "Git",
    ],
  },
];

export const education = {
  org: "COMSATS University Islamabad",
  role: "BS Software Engineering",
  period: "2023 to Present · 7th Semester",
  cgpa: "3.66",
  points: [
    "Building end-to-end systems across desktop, web, security, and ML.",
  ],
  awards: [
    {
      place: "1st Place",
      title: "COMSATS BSE Semester-II Project Competition",
      project: "Cart Saver",
    },
    {
      place: "2nd Place",
      title: "COMSATS BSE Semester-I Project Competition",
      project: "Finverse",
    },
  ],
};

export const engineeringLessons = [
  {
    title: "Learning is a skill.",
    body: "I started with almost no programming background. The biggest lesson wasn't coding - it was realizing that I could learn difficult things with enough curiosity and persistence.",
  },
  {
    title: "Problems come before solutions.",
    body: "The quality of a solution depends on how well the problem is understood. Whether I'm debugging, designing a feature, or working with AI tools, defining the problem is always the hardest part.",
  },
  {
    title: "AI is a tool, not the engineer.",
    body: "Modern development is no longer about writing every line by hand. It's about making good technical decisions, asking the right questions, and knowing how to evaluate the answers.",
  },
  {
    title: "Details shape the experience.",
    body: "I've learned to notice the small things - layout, interactions, consistency, and architecture - that make software feel reliable and well designed.",
  },
  {
    title: "Growth never stops.",
    body: "Software changes faster than almost any field I've seen. Instead of fearing that, I've learned to enjoy learning new technologies and exploring unfamiliar ideas.",
  },
];

export const contact = {
  location: "Rawalpindi / Islamabad, Pakistan",
  email: "faizamunir501@gmail.com",
  github: "https://github.com/Faizamunir720",
  linkedin: "https://linkedin.com/in/faizamunir99",
};
