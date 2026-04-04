import { useState }             from "react";

// Theme
import { tok }                  from "./src/theme/tokens";
import { GLOBAL_CSS }           from "./src/theme/globalCss";

// Hooks
import { useActiveSection }     from "./src/hooks/useActiveSection";

// Layout
import Navbar                   from "./src/components/layout/Navbar";
import Footer                   from "./src/components/layout/Footer";

// Background
import ParticleBackground       from "./src/components/ui/ParticleBackground";

// Sections
import {
  Hero,
  Skills,
  Experience,
  DataScience,
  Projects,
  Certifications,
  Contact,
} from "./src/components/sections";

/* ─────────────────────────────────────────────────────────────────────────── */

export default function Portfolio() {
  const [isDark, setIsDark]     = useState(true);
  const [active, setActive]     = useActiveSection();
  const t                       = tok(isDark);

  return (
    <div style={{
      minHeight: "100vh",
      background: t.bg,
      color: t.text,
      fontFamily: "'Segoe UI', system-ui, sans-serif",
      transition: "background .4s, color .4s",
      position: "relative",
    }}>
      {/* ── Global styles ── */}
      <style>{GLOBAL_CSS}</style>

      {/* ── Animated particle canvas (fixed, behind everything) ── */}
      <ParticleBackground isDark={isDark} />

      {/* ── All page content (above canvas) ── */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <Navbar
          active={active}
          setActive={setActive}
          isDark={isDark}
          toggleDark={() => setIsDark(d => !d)}
        />

        <Hero            isDark={isDark} />
        <Skills          isDark={isDark} />
        <Experience      isDark={isDark} />
        <DataScience     isDark={isDark} />
        <Projects        isDark={isDark} />
        <Certifications  isDark={isDark} />
        <Contact         isDark={isDark} />

        <Footer isDark={isDark} />
      </div>
    </div>
  );
}
