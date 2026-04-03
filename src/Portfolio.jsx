import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["About", "Skills", "Experience", "Data Science", "Projects", "Certifications", "Contact"];

const SKILLS = {
  "Programming Languages": { items: ["TypeScript", "JavaScript", "Python", "Java", "Dart", "HTML5", "CSS3", "PHP"], level: 80 },
  "Frameworks":            { items: ["Node.js", "React.js", "Angular", "Express.js", "Flask", "Flutter"], level: 85 },
  "Database":              { items: ["SQL", "NoSQL", "MongoDB", "Oracle SQL", "Firebase"], level: 75 },
  "Version Control":       { items: ["Git", "GitHub", "GitLab", "Bitbucket"], level: 60 },
  "Design":                { items: ["Figma", "Photoshop"], level: 70 },
};

const DS_SKILLS = [
  { name: "Data Cleaning & EDA",  icon: "🧹", desc: "Pandas, NumPy, Matplotlib, Seaborn", level: 82 },
  { name: "Machine Learning",     icon: "🤖", desc: "Scikit-learn, supervised & unsupervised models", level: 75 },
  { name: "Deep Learning",        icon: "🧠", desc: "TensorFlow, Keras — CNN, RNN, LSTM", level: 65 },
  { name: "NLP",                  icon: "💬", desc: "Text preprocessing, sentiment, transformers", level: 60 },
  { name: "Data Visualization",   icon: "📊", desc: "Plotly, Dash, Power BI dashboards", level: 78 },
  { name: "MLOps & Deployment",   icon: "🚀", desc: "Flask APIs, Docker basics, MLflow", level: 55 },
];

const PROJECTS = [
  { title: "E-Commerce Platform",     stack: ["React", "Node.js", "MongoDB"],          desc: "Full-stack shop with cart, auth, payments and admin panel.", tag: "Full Stack",        color: "#7c3aed", icon: "🛒" },
  { title: "ML Price Predictor",      stack: ["Python", "Scikit-learn", "Flask"],      desc: "Real-estate price prediction with EDA pipeline & REST API.", tag: "ML / Data Science", color: "#9333ea", icon: "🤖" },
  { title: "Telecom Churn Analysis",  stack: ["Python", "Pandas", "XGBoost"],          desc: "Customer churn prediction from raw CSV to production model.", tag: "Data Analytics",    color: "#6d28d9", icon: "📊" },
  { title: "Mobile App (Flutter)",    stack: ["Flutter", "Firebase", "Dart"],           desc: "Cross-platform app with real-time sync and Firebase auth.", tag: "Mobile",             color: "#4f46e5", icon: "📱" },
  { title: "NLP Sentiment Dashboard", stack: ["Python", "Transformers", "Plotly"],     desc: "BERT fine-tuned sentiment analysis with interactive charts.", tag: "NLP / AI",          color: "#7e22ce", icon: "💬" },
  { title: "Portfolio API",           stack: ["Express.js", "TypeScript", "PostgreSQL"], desc: "REST API with JWT auth, rate-limiting, GitHub Actions CI/CD.", tag: "Backend",          color: "#5b21b6", icon: "⚙️" },
];

const PROJECT_TAGS = ["All", "Full Stack", "ML / Data Science", "Data Analytics", "Mobile", "NLP / AI", "Backend"];

const CERTS = [
  { title: "Python Programmer Bootcamp", issuer: "365 Data Science", date: "Nov 2024", link: "https://learn.365datascience.com/certificates/CC-E31C050893/" },
  { title: "SQL Certificate",            issuer: "365 Data Science", date: "Nov 2024", link: "https://learn.365datascience.com/c/d447214f3f/" },
];

/* ─────────────── SMOOTH SCROLL HELPER ─────────────── */
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

/* ─────────────── GLOBAL STYLES ─────────────── */
const BASE_CSS = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: #7c3aed; border-radius: 2px; }

  @keyframes ping2  { 0% { transform:scale(1);opacity:1; } 75%,100% { transform:scale(2.2);opacity:0; } }
  @keyframes pulse2 { 0%,100% { opacity:1; } 50% { opacity:.4; } }
  @keyframes bounce2 {
    0%,100% { transform:translateY(-25%) translateX(-50%); animation-timing-function:cubic-bezier(.8,0,1,1); }
    50%     { transform:translateY(0)    translateX(-50%); animation-timing-function:cubic-bezier(0,0,.2,1); }
  }
  @keyframes cursor { 0%,100%{opacity:1;}50%{opacity:0;} }
  @keyframes fadeUp { from{opacity:0;transform:translateY(20px);}to{opacity:1;transform:translateY(0);} }

  .ping2   { animation: ping2 1.5s cubic-bezier(0,0,.2,1) infinite; }
  .pulse2  { animation: pulse2 2.5s ease-in-out infinite; }
  .bounce2 { animation: bounce2 1.2s infinite; }
  .cursor  { animation: cursor 1s step-end infinite; }
  .fade-up { animation: fadeUp .6s ease both; }

  .project-card-3d {
    transform-style: preserve-3d;
    transition: transform 0.15s ease-out, box-shadow 0.3s ease;
    cursor: pointer;
    will-change: transform;
  }
  .project-card-3d:hover {
    box-shadow: 0 30px 60px rgba(124,58,237,0.35), 0 0 40px rgba(124,58,237,0.15) !important;
  }
  .card-shine {
    position: absolute;
    inset: 0;
    border-radius: inherit;
    pointer-events: none;
    background: radial-gradient(circle at var(--shine-x,50%) var(--shine-y,50%), rgba(255,255,255,0.12) 0%, transparent 60%);
    transition: opacity 0.3s;
    opacity: 0;
  }
  .project-card-3d:hover .card-shine { opacity: 1; }
  .tag-pill {
    display: inline-block;
    padding: 3px 12px;
    border-radius: 999px;
    font-size: 11px;
    font-weight: 600;
  }
  .stack-badge {
    padding: 2px 10px;
    font-size: 11px;
    border-radius: 6px;
    font-family: monospace;
    font-weight: 500;
  }
  #particle-canvas {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 0;
  }
  .nav-link-btn {
    background: none;
    border: none;
    cursor: pointer;
    font-family: inherit;
    transition: color .2s;
  }
`;

/* ─────────────── THEME TOKENS ─────────────── */
function tok(d) {
  return {
    bg:       d ? "#080612"       : "#f5f3ff",
    bgNav:    d ? "rgba(13,8,20,.95)" : "rgba(255,255,255,.95)",
    bgCard:   d ? "rgba(255,255,255,.04)"  : "#ffffff",
    bgCardH:  d ? "rgba(255,255,255,.07)"  : "#f5f3ff",
    bgMuted:  d ? "rgba(139,92,246,.12)"   : "rgba(139,92,246,.08)",
    border:   d ? "rgba(109,40,217,.35)"   : "rgba(139,92,246,.25)",
    borderH:  d ? "rgba(124,58,237,.65)"   : "rgba(124,58,237,.5)",
    text:     d ? "#ffffff"      : "#1e1b4b",
    textMd:   d ? "#cbd5e1"      : "#4b5563",
    textSm:   d ? "#94a3b8"      : "#6b7280",
    textMute: d ? "#64748b"      : "#9ca3af",
    accent:   d ? "#a78bfa"      : "#7c3aed",
    accentBg: d ? "rgba(109,40,217,.2)"  : "rgba(237,233,254,1)",
    tagBg:    d ? "rgba(109,40,217,.35)" : "rgba(237,233,254,1)",
    tagText:  d ? "#c4b5fd"      : "#5b21b6",
    tagBorder:d ? "rgba(109,40,217,.4)"  : "rgba(167,139,250,.4)",
    pillBg:   d ? "rgba(46,16,101,.6)"   : "rgba(237,233,254,1)",
    pillBor:  d ? "rgba(109,40,217,.35)" : "rgba(196,181,253,.5)",
    pillText: d ? "#c4b5fd"      : "#5b21b6",
    stackBg:  d ? "rgba(0,0,0,.35)"      : "#f1f5f9",
    stackBor: d ? "rgba(71,85,105,.45)"  : "rgba(203,213,225,.8)",
    stackTxt: d ? "#cbd5e1"      : "#475569",
    navText:  d ? "#94a3b8"      : "#6b7280",
    eyebrow:  d ? "#8b5cf6"      : "#7c3aed",
    divider:  d ? "rgba(109,40,217,.25)" : "rgba(139,92,246,.2)",
    toggleBg: d ? "#7c3aed"      : "#e2e8f0",
  };
}

/* ─────────────── UPGRADED PARTICLE BACKGROUND ─────────────── */
function ParticleBackground({ isDark }) {
  const canvasRef = useRef(null);
  const stateRef = useRef({});

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // --- Particle class ---
    class Particle {
      constructor() { this.reset(true); }

      reset(init = false) {
        this.x = Math.random() * width;
        this.y = init ? Math.random() * height : height + 10;
        this.baseSize = Math.random() * 2.5 + 0.5;
        this.size = this.baseSize;
        this.hue = Math.random() * 80 + 240; // blue-purple range
        this.sat = 60 + Math.random() * 30;
        this.lit = 50 + Math.random() * 25;
        this.alpha = Math.random() * 0.5 + 0.1;
        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = -(Math.random() * 0.8 + 0.2);
        this.life = 0;
        this.maxLife = Math.random() * 400 + 200;
        this.pulse = Math.random() * Math.PI * 2;
        this.pulseSpeed = Math.random() * 0.03 + 0.01;
        this.connected = [];
      }

      update(t) {
        this.x += this.vx + Math.sin(t * 0.001 + this.pulse) * 0.15;
        this.y += this.vy;
        this.life++;
        this.pulse += this.pulseSpeed;
        this.size = this.baseSize + Math.sin(this.pulse) * 0.4;

        const lifeRatio = this.life / this.maxLife;
        if (lifeRatio < 0.1) this.alpha = (lifeRatio / 0.1) * (0.3 + Math.random() * 0.3);
        else if (lifeRatio > 0.7) this.alpha = ((1 - lifeRatio) / 0.3) * 0.4;

        if (this.life > this.maxLife || this.y < -20 || this.x < -20 || this.x > width + 20) {
          this.reset();
        }
      }

      draw() {
        const grd = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 3);
        grd.addColorStop(0, `hsla(${this.hue},${this.sat}%,${this.lit}%,${this.alpha})`);
        grd.addColorStop(1, `hsla(${this.hue},${this.sat}%,${this.lit}%,0)`);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        // bright core
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${this.hue},90%,90%,${this.alpha * 1.5})`;
        ctx.fill();
      }
    }

    // --- Orb: slow drifting glowing blob ---
    class Orb {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.r = Math.random() * 80 + 40;
        this.hue = Math.random() * 60 + 240;
        this.phase = Math.random() * Math.PI * 2;
        this.speed = 0.0003 + Math.random() * 0.0004;
        this.ox = this.x;
        this.oy = this.y;
        this.drift = 30 + Math.random() * 40;
      }
      draw(t) {
        this.x = this.ox + Math.sin(t * this.speed + this.phase) * this.drift;
        this.y = this.oy + Math.cos(t * this.speed * 0.7 + this.phase) * this.drift * 0.6;
        const grd = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r);
        grd.addColorStop(0, `hsla(${this.hue},70%,60%,0.07)`);
        grd.addColorStop(0.5, `hsla(${this.hue},70%,60%,0.04)`);
        grd.addColorStop(1, `hsla(${this.hue},70%,60%,0)`);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();
      }
    }

    // --- Neural web lines between nearby particles ---
    function drawConnections(particles) {
      const maxDist = 120;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.12;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(167,139,250,${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
    }

    // --- Shooting stars ---
    class ShootingStar {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height * 0.5;
        this.len = Math.random() * 120 + 60;
        this.speed = Math.random() * 8 + 4;
        this.angle = Math.PI / 4 + (Math.random() - 0.5) * 0.3;
        this.alpha = 0;
        this.alive = true;
        this.phase = "in";
        this.timer = 0;
      }
      update() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        this.timer++;
        if (this.phase === "in") { this.alpha = Math.min(1, this.timer / 10); if (this.timer > 10) this.phase = "out"; }
        else { this.alpha -= 0.04; if (this.alpha <= 0) this.alive = false; }
      }
      draw() {
        const ex = this.x - Math.cos(this.angle) * this.len;
        const ey = this.y - Math.sin(this.angle) * this.len;
        const grd = ctx.createLinearGradient(ex, ey, this.x, this.y);
        grd.addColorStop(0, `rgba(255,255,255,0)`);
        grd.addColorStop(1, `rgba(200,180,255,${this.alpha})`);
        ctx.beginPath();
        ctx.moveTo(ex, ey);
        ctx.lineTo(this.x, this.y);
        ctx.strokeStyle = grd;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
    }

    // Initialise
    const PARTICLE_COUNT = 90;
    const particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle());
    const orbs = Array.from({ length: 6 }, () => new Orb());
    let shootingStars = [];
    let ssTimer = 0;

    const onResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener("resize", onResize);

    let animId;
    let t = 0;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      t++;

      // Background fade
      ctx.fillStyle = isDark ? "rgba(8,6,18,0.18)" : "rgba(245,243,255,0.18)";
      ctx.fillRect(0, 0, width, height);

      // Orbs
      orbs.forEach(o => o.draw(t));

      // Connections
      drawConnections(particles);

      // Particles
      particles.forEach(p => { p.update(t); p.draw(); });

      // Shooting stars
      ssTimer++;
      if (ssTimer > 180 + Math.random() * 240) {
        shootingStars.push(new ShootingStar());
        ssTimer = 0;
      }
      shootingStars = shootingStars.filter(s => s.alive);
      shootingStars.forEach(s => { s.update(); s.draw(); });
    };

    animate();
    stateRef.current = { animId };

    return () => {
      cancelAnimationFrame(stateRef.current.animId);
      window.removeEventListener("resize", onResize);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      id="particle-canvas"
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
        opacity: isDark ? 1 : 0.6,
        transition: "opacity 0.5s",
      }}
    />
  );
}

/* ─────────────── 3D PROJECT CARD ─────────────── */
function ProjectCard3D({ proj, isDark, index }) {
  const t = tok(isDark);
  const cardRef = useRef(null);
  const [flipped, setFlipped] = useState(false);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    card.style.transform = `perspective(700px) rotateY(${dx * 14}deg) rotateX(${-dy * 10}deg) translateZ(18px) scale(1.03)`;
    const shineEl = card.querySelector(".card-shine");
    if (shineEl) {
      const sx = ((e.clientX - rect.left) / rect.width) * 100;
      const sy = ((e.clientY - rect.top) / rect.height) * 100;
      shineEl.style.setProperty("--shine-x", `${sx}%`);
      shineEl.style.setProperty("--shine-y", `${sy}%`);
    }
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "perspective(700px) rotateY(0deg) rotateX(0deg) translateZ(0px) scale(1)";
  };

  const frontStyle = {
    position: "absolute", inset: 0, backfaceVisibility: "hidden",
    background: isDark ? "linear-gradient(135deg,rgba(20,10,40,0.95),rgba(30,15,60,0.9))" : "linear-gradient(135deg,#ffffff,#f5f0ff)",
    border: `1px solid ${t.border}`, borderRadius: 18, padding: 24,
    display: "flex", flexDirection: "column", gap: 12,
    transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
    transition: "transform 0.6s cubic-bezier(0.4,0,0.2,1)", overflow: "hidden",
  };

  const backStyle = {
    ...frontStyle,
    transform: flipped ? "rotateY(0deg)" : "rotateY(-180deg)",
    background: isDark ? `linear-gradient(135deg,${proj.color}33,rgba(20,10,40,0.97))` : `linear-gradient(135deg,${proj.color}22,#faf5ff)`,
    justifyContent: "center", alignItems: "center", textAlign: "center",
  };

  return (
    <div style={{ position: "relative", height: 240, transformStyle: "preserve-3d", animationDelay: `${index * 0.15}s` }}>
      {[1,2,3,4].map(i => (
        <div key={i} style={{ position: "absolute", inset: 0, borderRadius: 18, background: proj.color, zIndex: -i, transform: `translateZ(${-i*4}px) translateX(${i}px) translateY(${i}px)`, opacity: 0.15 - i*0.03, transition: "transform 0.3s ease" }}/>
      ))}
      <div ref={cardRef} className="project-card-3d"
        onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} onClick={() => setFlipped(f => !f)}
        style={{ position: "absolute", inset: 0, transformStyle: "preserve-3d", transition: "transform 0.2s ease", borderRadius: 18,
          boxShadow: isDark ? "0 8px 32px rgba(0,0,0,0.4)" : "0 8px 32px rgba(124,58,237,0.12)" }}>
        <div style={frontStyle}>
          <div className="card-shine" />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <span style={{ fontSize: 28, lineHeight: 1 }}>{proj.icon}</span>
            <span className="tag-pill" style={{ background: `${proj.color}33`, color: proj.color, border: `1px solid ${proj.color}55` }}>{proj.tag}</span>
          </div>
          <h3 style={{ fontWeight: 800, fontSize: 16, color: t.text, lineHeight: 1.3 }}>{proj.title}</h3>
          <p style={{ fontSize: 12, color: t.textSm, lineHeight: 1.6, flex: 1 }}>{proj.desc}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
            {proj.stack.map(s => (
              <span key={s} className="stack-badge" style={{ background: t.stackBg, border: `1px solid ${t.stackBor}`, color: t.stackTxt }}>{s}</span>
            ))}
          </div>
          <div style={{ fontSize: 11, color: t.textMute, textAlign: "right", marginTop: 4 }}>Click to flip →</div>
        </div>
        <div style={backStyle}>
          <div className="card-shine" />
          <span style={{ fontSize: 48, marginBottom: 12 }}>{proj.icon}</span>
          <h3 style={{ fontWeight: 800, fontSize: 18, color: t.text, marginBottom: 8 }}>{proj.title}</h3>
          <p style={{ fontSize: 13, color: t.textMd, lineHeight: 1.7, maxWidth: 220 }}>{proj.desc}</p>
          <div style={{ marginTop: 20, padding: "8px 20px", borderRadius: 999, background: `linear-gradient(135deg,${proj.color},#9333ea)`, color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer", boxShadow: `0 4px 16px ${proj.color}55` }}>
            View Project ↗
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────── BUTTON PRIMITIVES ─────────────── */
function BtnPrimary({ href, onClick, children }) {
  return (
    <a href={href} onClick={onClick}
       style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 28px", borderRadius: 999, fontWeight: 700, fontSize: 14, color: "#fff", textDecoration: "none", background: "linear-gradient(135deg,#7c3aed,#9333ea)", boxShadow: "0 4px 20px rgba(124,58,237,.4)", transition: "all .25s", cursor: "pointer" }}
       onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
       onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
      {children}
    </a>
  );
}

function BtnOutline({ href, onClick, children, isDark, target }) {
  const t = tok(isDark);
  return (
    <a href={href} onClick={onClick} target={target} rel="noreferrer"
       style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 28px", borderRadius: 999, fontWeight: 700, fontSize: 14, textDecoration: "none", border: `1.5px solid ${t.borderH}`, color: t.accent, background: "transparent", transition: "all .25s", cursor: "pointer" }}
       onMouseEnter={e => { e.currentTarget.style.background = t.accentBg; e.currentTarget.style.transform = "scale(1.05)"; }}
       onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.transform = "scale(1)"; }}>
      {children}
    </a>
  );
}

/* ─────────────── TOGGLE ─────────────── */
function DarkToggle({ isDark, toggle }) {
  return (
    <button onClick={toggle} aria-label="Toggle dark/light mode"
      style={{ width: 44, height: 24, borderRadius: 12, position: "relative", background: isDark ? "#7c3aed" : "#e2e8f0", border: `1.5px solid ${isDark ? "#7c3aed" : "#cbd5e1"}`, cursor: "pointer", transition: "all .3s", flexShrink: 0 }}>
      <span style={{ position: "absolute", top: 2, left: isDark ? 22 : 2, width: 16, height: 16, borderRadius: 8, background: "#fff", boxShadow: "0 1px 4px rgba(0,0,0,.25)", transition: "left .3s", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9 }}>
        {isDark ? "🌙" : "☀️"}
      </span>
    </button>
  );
}

/* ─────────────── NAVBAR ─────────────── */
function Navbar({ active, setActive, isDark, toggleDark }) {
  const [scrolled, setScrolled] = useState(false);
  const t = tok(isDark);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const handleNav = (link) => {
    setActive(link);
    // Map nav label → section id
    const idMap = {
      "About": "about",
      "Skills": "skills",
      "Experience": "experience",
      "Data Science": "data-science",
      "Projects": "projects",
      "Certifications": "certifications",
      "Contact": "contact",
    };
    scrollToSection(idMap[link] || link.toLowerCase());
  };

  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, padding: scrolled ? "12px 0" : "20px 0", background: scrolled ? t.bgNav : "transparent", backdropFilter: scrolled ? "blur(20px)" : "none", borderBottom: scrolled ? `1px solid ${t.divider}` : "none", transition: "all .4s" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <button className="nav-link-btn" onClick={() => handleNav("About")}
          style={{ fontWeight: 900, fontSize: 20, color: t.text, padding: 0 }}>
          <span style={{ color: t.accent }}>H</span>amza<span style={{ color: t.accent }}>.</span>
        </button>
        <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
          {NAV_LINKS.map(link => (
            <button key={link}
              className="nav-link-btn"
              onClick={() => handleNav(link)}
              style={{
                fontSize: 13, fontWeight: 500,
                color: active === link ? t.accent : t.navText,
                padding: 0,
              }}
              onMouseEnter={e => { if (active !== link) e.currentTarget.style.color = t.accent; }}
              onMouseLeave={e => { if (active !== link) e.currentTarget.style.color = t.navText; }}>
              {link}
            </button>
          ))}
          <DarkToggle isDark={isDark} toggle={toggleDark}/>
        </div>
      </div>
    </nav>
  );
}

/* ─────────────── SECTION HEADER ─────────────── */
function SectionHeader({ eyebrow, title, desc, isDark }) {
  const t = tok(isDark);
  return (
    <div style={{ textAlign: "center", marginBottom: 16 }}>
      <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", color: t.eyebrow }}>{eyebrow}</span>
      <h2 style={{ fontSize: "clamp(28px,5vw,40px)", fontWeight: 900, color: t.text, margin: "8px 0 12px" }}>{title}</h2>
      {desc && <p style={{ color: t.textSm, fontSize: 14, lineHeight: 1.7, maxWidth: 520, margin: "0 auto" }}>{desc}</p>}
    </div>
  );
}

/* ─────────────── HERO ─────────────── */
function Hero({ isDark }) {
  const t = tok(isDark);
  const [typed, setTyped] = useState("");
  const roles = ["Full-Stack Developer", "Data Scientist", "ML Engineer", "Flutter Developer"];
  const [ri, setRi] = useState(0);

  useEffect(() => {
    let i = 0, del = false, paused = false;
    const cur = () => roles[ri];
    const tick = setInterval(() => {
      if (paused) return;
      if (!del) {
        i++; setTyped(cur().slice(0, i));
        if (i === cur().length) { del = true; paused = true; setTimeout(() => { paused = false; }, 1500); }
      } else {
        i--; setTyped(cur().slice(0, i));
        if (i === 0) { del = false; setRi(r => (r + 1) % roles.length); }
      }
    }, del ? 55 : 95);
    return () => clearInterval(tick);
  }, [ri]);

  return (
    <section id="about" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", padding: "96px 24px 40px", zIndex: 1 }}>
      <div className="fade-up" style={{ maxWidth: 820, width: "100%", textAlign: "center", position: "relative", zIndex: 1 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 10, borderRadius: 999, padding: "6px 18px", marginBottom: 32, fontSize: 13, fontWeight: 500, background: t.accentBg, border: `1px solid ${t.border}`, color: t.accent }}>
          <span style={{ position: "relative", display: "inline-flex" }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#4ade80", display: "block" }}/>
            <span className="ping2" style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#4ade80" }}/>
          </span>
          Available for opportunities
        </div>

        <h1 style={{ fontSize: "clamp(44px,9vw,80px)", fontWeight: 900, lineHeight: 1, marginBottom: 16, color: t.text, letterSpacing: "-1px" }}>
          Hamza<br/>
          <span style={{ background: "linear-gradient(135deg,#8b5cf6,#a855f7,#d946ef)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Bensassi</span>
        </h1>

        <div style={{ height: 52, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24 }}>
          <span style={{ fontSize: "clamp(18px,3vw,24px)", fontWeight: 300, color: t.textMd }}>
            {typed}<span className="cursor" style={{ color: t.accent }}>|</span>
          </span>
        </div>

        <p style={{ fontSize: "clamp(15px,2vw,18px)", color: t.textMd, maxWidth: 620, margin: "0 auto 40px", lineHeight: 1.75 }}>
          Passionate developer from{" "}
          <strong style={{ color: t.accent, fontWeight: 600 }}>Hammamet, Tunisia</strong>
          {" "}— building high-performance web, mobile & ML applications with focus on{" "}
          <strong style={{ color: t.accent, fontWeight: 600 }}>UX</strong> and{" "}
          <strong style={{ color: t.accent, fontWeight: 600 }}>code quality</strong>.
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", marginBottom: 40 }}>
          {["Node.js","React","Python","Flutter","ML / AI","TypeScript"].map(tag => (
            <span key={tag} style={{ padding: "6px 18px", borderRadius: 999, fontSize: 13, fontWeight: 500, background: t.accentBg, border: `1px solid ${t.border}`, color: t.accent }}>{tag}</span>
          ))}
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
          <BtnPrimary onClick={(e) => { e.preventDefault(); scrollToSection("contact"); }}>✉ Get in Touch</BtnPrimary>
          <BtnOutline onClick={(e) => { e.preventDefault(); scrollToSection("projects"); }} isDark={isDark}>↓ View Projects</BtnOutline>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center", marginTop: 40, fontSize: 12, color: t.textMute }}>
          {[
            { label: "bensassihamza19@gmail.com", href: "mailto:bensassihamza19@gmail.com" },
            { label: "+216 92 969 805" },
            { label: "LinkedIn ↗", href: "https://linkedin.com/in/hamza-bensassi", target: "_blank" },
          ].map((item, i) => (
            <span key={i} style={{ display: "flex", alignItems: "center", gap: 16 }}>
              {i > 0 && <span style={{ color: t.border }}>·</span>}
              {item.href
                ? <a href={item.href} target={item.target} rel="noreferrer" style={{ color: t.textMute, textDecoration: "none" }}
                     onMouseEnter={e => e.currentTarget.style.color = t.accent}
                     onMouseLeave={e => e.currentTarget.style.color = t.textMute}>{item.label}</a>
                : <span>{item.label}</span>
              }
            </span>
          ))}
        </div>
      </div>

      <div className="bounce2" style={{ position: "absolute", bottom: 32, left: "50%" }}>
        <div style={{ width: 20, height: 36, borderRadius: 10, border: `1.5px solid ${isDark ? "#475569" : "#cbd5e1"}`, display: "flex", alignItems: "flex-start", justifyContent: "center", padding: 4 }}>
          <div className="pulse2" style={{ width: 4, height: 8, borderRadius: 2, background: t.accent }}/>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── SKILL BAR ─────────────── */
function SkillBar({ name, level, items, isDark }) {
  const t = tok(isDark);
  const [vis, setVis] = useState(false);
  const ref = useRef();
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref}
         style={{ background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 16, padding: 20, transition: "all .3s" }}
         onMouseEnter={e => { e.currentTarget.style.background = t.bgCardH; e.currentTarget.style.borderColor = t.borderH; }}
         onMouseLeave={e => { e.currentTarget.style.background = t.bgCard; e.currentTarget.style.borderColor = t.border; }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
        <span style={{ fontWeight: 600, fontSize: 14, color: t.text }}>{name}</span>
        <span style={{ fontSize: 12, fontFamily: "monospace", fontWeight: 700, color: t.accent }}>{level}%</span>
      </div>
      <div style={{ height: 6, borderRadius: 3, background: isDark ? "#1e293b" : "#ede9fe", marginBottom: 12, overflow: "hidden" }}>
        <div style={{ height: "100%", borderRadius: 3, width: vis ? `${level}%` : "0%", background: "linear-gradient(90deg,#7c3aed,#d946ef)", transition: "width 1s cubic-bezier(.4,0,.2,1)" }}/>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {items.map(item => (
          <span key={item} style={{ padding: "2px 10px", fontSize: 11, borderRadius: 6, fontWeight: 500, background: t.pillBg, border: `1px solid ${t.pillBor}`, color: t.pillText }}>{item}</span>
        ))}
      </div>
    </div>
  );
}

function Skills({ isDark }) {
  return (
    <section id="skills" style={{ padding: "96px 24px", position: "relative", zIndex: 1 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <SectionHeader eyebrow="Expertise" title="Technical Skills" isDark={isDark}/>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 16, marginTop: 48 }}>
          {Object.entries(SKILLS).map(([name, data]) => (
            <SkillBar key={name} name={name} level={data.level} items={data.items} isDark={isDark}/>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────── EXPERIENCE ─────────────── */
function Experience({ isDark }) {
  const t = tok(isDark);
  const items = [
    { label:"2024", tag:"Internship", org:"Tunisie Télécom", role:"Network Intern", points:["Assisted with network maintenance and optimization","Troubleshooting and telecom systems analysis"] },
    { label:"2023–2026", tag:"University", org:"ISETN — Nabeul", role:"Multimedia & Web Development", link:"https://isetn.rnu.tn/", points:["Advanced Web Dev, Database Management & Interactive Multimedia","Projects: HTML, CSS, JS, PHP, MySQL, Photoshop, After Effects"] },
    { label:"2019–2023", tag:"High School", org:"Atef Chaieb Hammamet", role:"Computer Science Diploma", points:["Algorithms, data structures, database management","Advanced mathematics and applied physics"] },
  ];

  return (
    <section id="experience" style={{ padding: "96px 24px", position: "relative", zIndex: 1 }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <SectionHeader eyebrow="Career" title="Experience & Education" isDark={isDark}/>
        <div style={{ marginTop: 56, position: "relative" }}>
          <div style={{ position: "absolute", left: 16, top: 0, bottom: 0, width: 1, background: `linear-gradient(to bottom,${t.accent},transparent)` }}/>
          {items.map((item, i) => (
            <div key={i} style={{ position: "relative", display: "flex", gap: 32, marginBottom: 48, paddingLeft: 48 }}>
              <div style={{ position: "absolute", left: 10, top: 8, width: 12, height: 12, borderRadius: "50%", background: t.accent, border: `2px solid ${isDark ? "#c4b5fd" : "#7c3aed"}`, zIndex: 1, boxShadow: `0 0 12px ${t.accent}60` }}/>
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", color: t.eyebrow }}>{item.label}</span>
                <div style={{ background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 16, padding: 20, marginTop: 8, transition: "all .3s" }}
                  onMouseEnter={e => { e.currentTarget.style.background = t.bgCardH; e.currentTarget.style.borderColor = t.borderH; }}
                  onMouseLeave={e => { e.currentTarget.style.background = t.bgCard; e.currentTarget.style.borderColor = t.border; }}>
                  <span style={{ fontSize: 11, padding: "3px 12px", borderRadius: 999, fontWeight: 600, background: t.tagBg, color: t.tagText, border: `1px solid ${t.tagBorder}`, display: "inline-block", marginBottom: 8 }}>{item.tag}</span>
                  <h3 style={{ fontWeight: 900, fontSize: 18, color: t.text }}>{item.org}</h3>
                  <p style={{ fontWeight: 600, fontSize: 13, color: t.accent, marginBottom: 10 }}>{item.role}</p>
                  {item.link && <a href={item.link} target="_blank" rel="noreferrer" style={{ fontSize: 11, color: t.textMute, textDecoration: "none", display: "block", marginBottom: 8 }}>{item.link}</a>}
                  {item.points.map((p, j) => (
                    <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 4 }}>
                      <span style={{ color: t.accent, marginTop: 2, fontSize: 10 }}>▸</span>
                      <span style={{ fontSize: 13, color: t.textMd, lineHeight: 1.6 }}>{p}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────── DATA SCIENCE ─────────────── */
function DataScience({ isDark }) {
  const t = tok(isDark);
  return (
    <section id="data-science" style={{ padding: "96px 24px", position: "relative", zIndex: 1 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <SectionHeader eyebrow="AI / Data" title="Data Science & ML" isDark={isDark} desc="From raw data ingestion to deployed models — full pipeline expertise."/>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 16, marginTop: 48 }}>
          {DS_SKILLS.map((skill, i) => (
            <div key={i} style={{ background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 16, padding: 24, transition: "all .3s" }}
              onMouseEnter={e => { e.currentTarget.style.background = t.bgCardH; e.currentTarget.style.borderColor = t.borderH; }}
              onMouseLeave={e => { e.currentTarget.style.background = t.bgCard; e.currentTarget.style.borderColor = t.border; }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>{skill.icon}</div>
              <h3 style={{ fontWeight: 700, fontSize: 15, color: t.text, marginBottom: 4 }}>{skill.name}</h3>
              <p style={{ fontSize: 12, color: t.textSm, lineHeight: 1.6, marginBottom: 14 }}>{skill.desc}</p>
              <div style={{ height: 6, borderRadius: 3, background: isDark ? "#1e293b" : "#ede9fe", overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${skill.level}%`, borderRadius: 3, background: "linear-gradient(90deg,#7c3aed,#d946ef)" }}/>
              </div>
              <span style={{ fontSize: 11, fontFamily: "monospace", color: t.textMute, marginTop: 4, display: "block" }}>{skill.level}% proficiency</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────── PROJECTS ─────────────── */
function Projects({ isDark }) {
  const t = tok(isDark);
  const [filter, setFilter] = useState("All");
  const shown = filter === "All" ? PROJECTS : PROJECTS.filter(p => p.tag === filter);

  return (
    <section id="projects" style={{ padding: "96px 24px", position: "relative", zIndex: 1 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <SectionHeader eyebrow="Portfolio" title="Featured Projects" isDark={isDark} desc="Hover for 3D effect — click to flip the card and see details."/>
        <div style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "center", margin: "16px 0 24px", fontSize: 12, color: t.textMute }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#4ade80", display: "inline-block" }}/>
          Interactive 3D — perspective & flip animation
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", margin: "0 0 48px" }}>
          {PROJECT_TAGS.map(tag => {
            const active = filter === tag;
            return (
              <button key={tag} onClick={() => setFilter(tag)} style={{ padding: "7px 16px", borderRadius: 999, fontSize: 12, fontWeight: 600, border: active ? "1.5px solid #7c3aed" : `1.5px solid ${t.border}`, background: active ? "#7c3aed" : t.bgCard, color: active ? "#fff" : t.textSm, cursor: "pointer", transition: "all .2s", boxShadow: active ? "0 4px 16px rgba(124,58,237,.35)" : "none" }}>
                {tag}
              </button>
            );
          })}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 32, perspective: "1200px", perspectiveOrigin: "50% 50%" }}>
          {shown.map((proj, i) => <ProjectCard3D key={proj.title} proj={proj} isDark={isDark} index={i}/>)}
        </div>
      </div>
    </section>
  );
}

/* ─────────────── CERTIFICATIONS ─────────────── */
function Certifications({ isDark }) {
  const t = tok(isDark);
  return (
    <section id="certifications" style={{ padding: "96px 24px", position: "relative", zIndex: 1 }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <SectionHeader eyebrow="Credentials" title="Certifications" isDark={isDark}/>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 16, marginTop: 48 }}>
          {CERTS.map((cert, i) => (
            <a key={i} href={cert.link} target="_blank" rel="noreferrer"
               style={{ display: "block", textDecoration: "none", background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 16, padding: 24, transition: "all .3s" }}
               onMouseEnter={e => { e.currentTarget.style.background = t.bgCardH; e.currentTarget.style.borderColor = t.borderH; }}
               onMouseLeave={e => { e.currentTarget.style.background = t.bgCard; e.currentTarget.style.borderColor = t.border; }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div style={{ fontSize: 28, marginBottom: 12 }}>🏆</div>
                  <h3 style={{ fontWeight: 700, fontSize: 15, color: t.text, marginBottom: 4 }}>{cert.title}</h3>
                  <p style={{ fontSize: 13, fontWeight: 600, color: t.accent, marginBottom: 4 }}>{cert.issuer}</p>
                  <p style={{ fontSize: 12, color: t.textMute }}>{cert.date}</p>
                </div>
                <span style={{ color: t.textMute, fontSize: 18 }}>↗</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────── CONTACT ─────────────── */
function Contact({ isDark }) {
  const t = tok(isDark);
  return (
    <section id="contact" style={{ padding: "96px 24px", position: "relative", zIndex: 1 }}>
      <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
        <SectionHeader eyebrow="Contact" title="Let's Work Together" isDark={isDark} desc="Open to internships, full-time roles, freelance projects, and data science collaborations."/>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center", marginTop: 40 }}>
          <BtnPrimary href="mailto:bensassihamza19@gmail.com">✉ Email Me</BtnPrimary>
          <BtnOutline href="https://linkedin.com/in/hamza-bensassi" target="_blank" isDark={isDark}>💼 LinkedIn</BtnOutline>
          <BtnOutline href="tel:+21692969805" isDark={isDark}>📞 Call</BtnOutline>
        </div>
        <div style={{ background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 16, padding: 24, marginTop: 40 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, textAlign: "center" }}>
            {[["3+","Years Coding"],["10+","Technologies"],["6+","Projects"]].map(([num, lbl]) => (
              <div key={lbl}>
                <div style={{ fontSize: 28, fontWeight: 900, color: t.accent }}>{num}</div>
                <div style={{ fontSize: 11, color: t.textMute, marginTop: 2 }}>{lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── ROOT ─────────────── */
export default function Portfolio() {
  const [isDark, setIsDark] = useState(true);
  const [active, setActive] = useState("About");
  const t = tok(isDark);

  // Update active nav on scroll
  useEffect(() => {
    const ids = ["about","skills","experience","data-science","projects","certifications","contact"];
    const labels = ["About","Skills","Experience","Data Science","Projects","Certifications","Contact"];
    const handler = () => {
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && el.getBoundingClientRect().top <= 100) {
          setActive(labels[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: t.bg, color: t.text, fontFamily: "'Segoe UI',system-ui,sans-serif", transition: "background .4s,color .4s", position: "relative" }}>
      <style>{BASE_CSS}</style>

      {/* ✨ Upgraded Particle Background */}
      <ParticleBackground isDark={isDark}/>

      <div style={{ position: "relative", zIndex: 1 }}>
        <Navbar active={active} setActive={setActive} isDark={isDark} toggleDark={() => setIsDark(d => !d)}/>
        <Hero isDark={isDark}/>
        <Skills isDark={isDark}/>
        <Experience isDark={isDark}/>
        <DataScience isDark={isDark}/>
        <Projects isDark={isDark}/>
        <Certifications isDark={isDark}/>
        <Contact isDark={isDark}/>
        <footer style={{ padding: "24px", textAlign: "center", borderTop: `1px solid ${t.divider}`, fontSize: 12, color: t.textMute }}>
          © 2025 Hamza Bensassi · Built with React & Canvas 2D
        </footer>
      </div>
    </div>
  );
}
