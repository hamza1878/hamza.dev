import { useState, useEffect } from "react";
import { tok }                  from "../../theme/tokens";
import { NAV_LINKS }            from "../../data";
import { scrollToNav }          from "../../utils/scroll";
import DarkToggle               from "../ui/DarkToggle";

export default function Navbar({ active, setActive, isDark, toggleDark }) {
  const t                     = tok(isDark);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = label => {
    setActive(label);
    scrollToNav(label);
  };

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
      padding: scrolled ? "12px 0" : "20px 0",
      background: scrolled ? t.bgNav : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? `1px solid ${t.divider}` : "none",
      transition: "all .4s",
    }}>
      <div style={{
        maxWidth: 1100, margin: "0 auto",
        padding: "0 24px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        {/* Logo */}
        <button
          className="nav-link-btn"
          onClick={() => handleClick("About")}
          style={{ fontWeight: 900, fontSize: 20, color: t.text, padding: 0 }}
        >
          <span style={{ color: t.accent }}>H</span>amza
          <span style={{ color: t.accent }}>.</span>
        </button>

        {/* Links + toggle */}
        <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
          {NAV_LINKS.map(link => (
            <button
              key={link}
              className="nav-link-btn"
              onClick={() => handleClick(link)}
              style={{
                fontSize: 13, fontWeight: 500, padding: 0,
                color: active === link ? t.accent : t.navText,
              }}
              onMouseEnter={e => { if (active !== link) e.currentTarget.style.color = t.accent; }}
              onMouseLeave={e => { if (active !== link) e.currentTarget.style.color = t.navText; }}
            >
              {link}
            </button>
          ))}
          <DarkToggle isDark={isDark} toggle={toggleDark} />
        </div>
      </div>
    </nav>
  );
}
