// ─── Navigation ───────────────────────────────────────────────────────────────


export const NAV_ID_MAP = {
  "About":          "about",
  "Skills":         "skills",
  "Experience":     "experience",
  "Data Science":   "data-science",
  "Projects":       "projects",
  "Certifications": "certifications",
  "Contact":        "contact",
};
// ─── Skills ───────────────────────────────────────────────────────────────────
export const SKILLS = {
  "Programming Languages": {
    items: ["TypeScript", "JavaScript", "Python", "Java", "Dart", "HTML5", "CSS3", "PHP"],
    level: 80,
  },
  Frameworks: {
    items: ["Node.js", "React.js", "Angular", "Express.js", "Flask", "Flutter"],
    level: 85,
  },
  Database: {
    items: ["SQL", "NoSQL", "MongoDB", "Oracle SQL", "Firebase"],
    level: 75,
  },
  "Version Control": {
    items: ["Git", "GitHub", "GitLab", "Bitbucket"],
    level: 60,
  },
  Design: {
    items: ["Figma", "Photoshop"],
    level: 70,
  },
};
export const NAV_LINKS = [
  "About",
  "Skills",
  "Experience",
  "Data Science",
  "Projects",
  "Certifications",
  "Contact",
];
// ─── Data Science ─────────────────────────────────────────────────────────────
export const DS_SKILLS = [
  { name: "Data Cleaning & EDA", icon: "🧹", desc: "Pandas, NumPy, Matplotlib, Seaborn",             level: 82 },
  { name: "NLP",                 icon: "💬", desc: "Text preprocessing, sentiment, transformers",      level: 60 },
  { name: "Data Visualization",  icon: "📊", desc: "Plotly, Dash, Power BI dashboards",               level: 78 },
];

// ─── Experience ───────────────────────────────────────────────────────────────
// ─── Experience ───────────────────────────────────────────────────────────────
export const EXPERIENCE = [
  {
    label: "2026–Present",
    tag: "Internship",
    org: "Booster BC",
    role: "Full-Stack Web & Mobile Developer",
    points: [
      "Developed full-stack web and mobile applications using React, Tailwind CSS, NestJS, Flutter, and PostgreSQL",
      "Hybrid work in Tunis, Nabeul",
    ],
  },
  {
    label: "2024–2025",
    tag: "Internship",
    org: "Yes Internet",
    role: "Full-stack Developer",
    points: [
      "Worked on web development projects remotely",
      "Implemented features across front-end and back-end stacks",
    ],
  },
  {
    label: "2024",
    tag: "Internship",
    org: "Tunisie Télécom",
    role: "Network Intern",
    points: [
      "Assisted with network maintenance and optimization",
      "Troubleshooting and telecom systems analysis",
    ],
  },
  {
    label: "2023–2026",
    tag: "University",
    org: "ISETN — Nabeul",
    role: "Multimedia & Web Development",
    link: "https://isetn.rnu.tn/",
    points: [
      "Advanced Web Dev, Database Management & Interactive Multimedia",
      "Projects: HTML, CSS, JS, PHP, MySQL, Photoshop, After Effects",
    ],
  },
  {
    label: "2019–2023",
    tag: "High School",
    org: "Atef Chaieb Hammamet",
    role: "Computer Science Diploma",
    points: [
      "Algorithms, data structures, database management",
      "Advanced mathematics and applied physics",
    ],
  },
];



export const PROJECT_TAGS = [
  "All",
  "Full Stack",
  "ML / Data Science",
  "Data Analytics",
  "Mobile",
  "NLP / AI",
  "Backend",
];

// ─── Certifications ───────────────────────────────────────────────────────────
export const CERTS = [

  {
    title: "SQL Certificate",
    issuer: "365 Data Science",
    date: "Nov 2024",
    link: "https://learn.365datascience.com/c/d447214f3f/",
  },
    {
    title: "Python Programmer Bootcamp",
    issuer: "365 Data Science",
    date: "Nov 2024",
    link: "https://learn.365datascience.com/certificates/CC-E31C050893/",
  },
];

// ─── Contact ──────────────────────────────────────────────────────────────────
export const CONTACT_LINKS = [
  { label: "bensassihamza19@gmail.com", href: "mailto:bensassihamza19@gmail.com" },
  { label: "+216 92 969 805" },
  { label: "LinkedIn ↗", href: "https://www.linkedin.com/in/hamza-bensassi-b225a2317/", target: "_blank" },
  { label: "GitHub ↗", href: "https://github.com/hamza1878", target: "_blank" },
];

export const STATS = [
  ["3+",  "Years Coding"],
  ["10+", "Technologies"],
  ["12+",  "Projects"],
];
// ─── Projects ─────────────────────────────────────────────────────────────────
export const PROJECTS = [
  {
    title: "E-Commerce Platform",
    stack: ["React", "Node.js", "MongoDB"],
    desc: "Full-stack shop with cart, auth, payments and admin panel.",
    tag: "Full Stack",
    color: "#7c3aed",
    icon: "🛒",
  },
   {
    title: "React-Native-Planning-App",
    stack: ["React Native", "Expo"],
    desc: "Smart employee planning and scheduling app built with React Native and Expo.",
    tag: "Mobile",
    color: "#4f46e5",
    icon: "📱",
  },
  {
    title: "WEB_Admin_Dashboard_PFE",
    stack: ["React", "TypeScript", "TailwindCSS", "Vite"],
    desc: "Modern Web Admin Dashboard for managing trips, bookings and users in the Transport platform.",
    tag: "Full Stack",
    color: "#7c3aed",
    icon: "🛠️",
  },
  {
    title: "ML-Given-travel-options",
    stack: ["Python", "Machine Learning"],
    desc: "Model recommends the best travel solution based on lowest price, shortest travel time, and user preferences.",
    tag: "ML / Data Science",
    color: "#9333ea",
    icon: "🤖",
  },
  {
    title: "Face-ID-verification-and-task-work-manager-frond",
    stack: ["React", "FaceID Authentication"],
    desc: "DevTaskManager is a personal task management web app secured using FaceID authentication.",
    tag: "Full Stack",
    color: "#7c3aed",
    icon: "📝",
  },
  {
    title: "SkyEarth",
    stack: ["React", "AI"],
    desc: "Découvrez Votre Prochaine Aventure: search among thousands of destinations and find best travel deals using AI.",
    tag: "Web / AI",
    color: "#6d28d9",
    icon: "🌍",
  },
  {
    title: "sport-team-manager",
    stack: ["React", "JavaScript"],
    desc: "Interactive web app to visualize football player performance, track matches, and analyze team stats.",
    tag: "Full Stack",
    color: "#4f46e5",
    icon: "⚽",
  },
  {
    title: "AutoPartsHub",
    stack: ["PHP", "MySQL"],
    desc: "Backend PHP native for AutoPartsHub platform.",
    tag: "Backend",
    color: "#5b21b6",
    icon: "⚙️",
  },
  {
    title: "Face-Finger-Detection-using-OpenCV-and-MediaPipe-_python",
    stack: ["Python", "OpenCV", "MediaPipe"],
    desc: "Detects faces and counts fingers using OpenCV and MediaPipe in real-time webcam video.",
    tag: "ML / Computer Vision",
    color: "#9333ea",
    icon: "🖐️",
  },
  {
    title: "SkillHub",
    stack: ["Angular", "TypeScript"],
    desc: "SkillHub Angular project for learning and skill management.",
    tag: "Frontend",
    color: "#22c55e",
    icon: "🛠️",
  },
  {
    title: "ML Price Predictor",
    stack: ["Python", "Scikit-learn", "Flask"],
    desc: "Real-estate price prediction with EDA pipeline & REST API.",
    tag: "ML / Data Science",
    color: "#9333ea",
    icon: "🤖",
  },
  {
    title: "Telecom Churn Analysis",
    stack: ["Python", "Pandas", "XGBoost"],
    desc: "Customer churn prediction from raw CSV to production model.",
    tag: "Data Analytics",
    color: "#6d28d9",
    icon: "📊",
  },
  {
    title: "Mobile App (Flutter)",
    stack: ["Flutter", "Firebase", "Dart"],
    desc: "Cross-platform app with real-time sync and Firebase auth.",
    tag: "Mobile",
    color: "#4f46e5",
    icon: "📱",
  },
  {
    title: "NLP Sentiment Dashboard",
    stack: ["Python", "Transformers", "Plotly"],
    desc: "BERT fine-tuned sentiment analysis with interactive charts.",
    tag: "NLP / AI",
    color: "#7e22ce",
    icon: "💬",
  },
  {
    title: "Portfolio API",
    stack: ["Express.js", "TypeScript", "PostgreSQL"],
    desc: "REST API with JWT auth, rate-limiting, GitHub Actions CI/CD.",
    tag: "Backend",
    color: "#5b21b6",
    icon: "⚙️",
  },
];