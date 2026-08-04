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

export const techNodes = [
  { name: "Flutter", color: "#54C5F8", glow: "cyan" },
  { name: "React", color: "#61DAFB", glow: "cyan" },
  { name: "TypeScript", color: "#3178C6", glow: "blue" },
  { name: "Python", color: "#3776AB", glow: "blue" },
  { name: "Flask", color: "#EEEEEE", glow: "purple" },
  { name: "Node.js", color: "#339933", glow: "cyan" },
  { name: "PostgreSQL", color: "#4169E1", glow: "blue" },
  { name: "Firebase", color: "#FFCA28", glow: "orange" },
  { name: "Java", color: "#F89820", glow: "orange" },
  { name: "C++", color: "#00599C", glow: "blue" },
  { name: "Git", color: "#F05032", glow: "orange" },
] as const;

export const experience = [
  {
    org: "Masihai Pvt Ltd",
    role: "Software Developer",
    period: "2025 to Present",
    points: [
      "Developing Flutter apps with Firebase for backend integration and feature delivery.",
      "Refactored legacy Flutter codebases into structured MVC architecture.",
      "Day-to-day GUI enhancements, bug fixes, and Firebase integrations.",
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

export const contact = {
  location: "Rawalpindi / Islamabad, Pakistan",
  email: "faizamunir501@gmail.com",
  github: "https://github.com/Faizamunir720",
  linkedin: "https://linkedin.com/in/faizamunir99",
};

export const marqueeItems = [
  "PYTHON",
  "FLUTTER",
  "FIREBASE",
  "FULL STACK WEB",
  "SYSTEM ARCHITECTURE",
  "APPLIED CRYPTO",
  "JAVA",
];
