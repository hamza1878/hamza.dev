import { useState } from "react";

// Theme
import { tok }               from "./theme/tokens";
import { GLOBAL_CSS }        from "./theme/globalCss";

// Hooks
import { useActiveSection }  from "./hooks/useActiveSection";

// Layout
import Navbar                from "./components/layout/Navbar";
import Footer                from "./components/layout/Footer";

// Background
import ParticleBackground    from "./components/ui/ParticleBackground";

// Sections
import {
  Hero,
  Skills,
  Experience,
  DataScience,
  Projects,
  Certifications,
  Contact,
} from "./components/sections";

/* ─────────────────────────────────────────────────────────────────────────── */

export default function App() {
  const [isDark, setIsDark] = useState(true);
  const [active, setActive] = useActiveSection();
  const t                   = tok(isDark);

  return (
    <div style={{
      minHeight:  "100vh",
      background: t.bg,
      color:      t.text,
      fontFamily: "'Segoe UI', system-ui, sans-serif",
      transition: "background .4s, color .4s",
      position:   "relative",
    }}>
      {/* ── Global styles ── */}
      <style>{GLOBAL_CSS}</style>

      {/* ── Animated particle canvas (fixed, behind everything) ── */}
      <ParticleBackground isDark={isDark} />

      {/* ── Page content ── */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <Navbar
          active={active}
          setActive={setActive}
          isDark={isDark}
          toggleDark={() => setIsDark(d => !d)}
        />

        <Hero           isDark={isDark} />
        <Skills         isDark={isDark} />
        <Experience     isDark={isDark} />
        <DataScience    isDark={isDark} />
        <Projects       isDark={isDark} />
        <Certifications isDark={isDark} />
        <Contact        isDark={isDark} />

        <Footer isDark={isDark} />
      </div>
    </div>
  );
}