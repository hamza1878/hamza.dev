import { tok }           from "../../theme/tokens";
import { useTypewriter } from "../../hooks/useTypewriter";
import { scrollToSection } from "../../utils/scroll";
import BtnPrimary        from "../ui/BtnPrimary";
import BtnOutline        from "../ui/BtnOutline";
import { CONTACT_LINKS } from "../../data";
import me from "../../assets/hamza.png";
const ROLES = ["Full-Stack Developer", "Data Scientist", "ML Engineer", "Flutter Developer"];
const TAGS  = ["Node.js", "React", "Python", "Flutter", "ML / AI", "TypeScript"];

export default function Hero({ isDark }) {
  const t     = tok(isDark);
  const typed = useTypewriter(ROLES);

  return (
    <section
      id="about"
      style={{
        minHeight: "100vh",
        display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative", overflow: "hidden",
        padding: "96px 24px 40px", zIndex: 1,
      }}
    >
      <div className="fade-up" style={{
        maxWidth: 820, width: "100%",
        textAlign: "center", position: "relative", zIndex: 1,
      }}>
        {/* Available badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 10,
          borderRadius: 999, padding: "6px 18px", marginBottom: 32,
          fontSize: 13, fontWeight: 500,
          background: t.accentBg, border: `1px solid ${t.border}`, color: t.accent,
        }}>
          <span style={{ position: "relative", display: "inline-flex" }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#4ade80", display: "block" }} />
            <span className="ping2" style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#4ade80" }} />
          </span>
          Available for opportunities
        </div>
<div style={{
  display: "flex",
  justifyContent: "center",
  marginBottom: 24
}}>
  <div style={{
    position: "relative",
    width: 140,
    height: 140,
    borderRadius: "50%",
    padding: 3,
    background: "linear-gradient(135deg,#8b5cf6,#a855f7,#d946ef)"
  }}>
    <img
      src={me}
      alt="Hamza Bensassi"
      style={{
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        objectFit: "cover",
        border: `3px solid ${t.bg}`,
        boxShadow: isDark
          ? "0 0 30px rgba(168,85,247,0.6)"
          : "0 0 20px rgba(168,85,247,0.3)"
      }}
    />
  </div>
</div>
        {/* Name */}
        <h1 style={{
          fontSize: "clamp(44px,9vw,80px)", fontWeight: 900,
          lineHeight: 1, marginBottom: 16, color: t.text, letterSpacing: "-1px",
        }}>
          Hamza<br />
          <span style={{
            background: "linear-gradient(135deg,#8b5cf6,#a855f7,#d946ef)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>
            Bensassi
          </span>
        </h1>

        {/* Typewriter */}
        <div style={{ height: 52, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24 }}>
          <span style={{ fontSize: "clamp(18px,3vw,24px)", fontWeight: 300, color: t.textMd }}>
            {typed}<span className="cursor" style={{ color: t.accent }}>|</span>
          </span>
        </div>

        {/* Bio */}
        <p style={{
          fontSize: "clamp(15px,2vw,18px)", color: t.textMd,
          maxWidth: 620, margin: "0 auto 40px", lineHeight: 1.75,
        }}>
          Passionate developer from{" "}
          <strong style={{ color: t.accent, fontWeight: 600 }}>Hammamet, Tunisia</strong>
          {" "}— building high-performance web, mobile & ML applications with focus on{" "}
          <strong style={{ color: t.accent, fontWeight: 600 }}>UX</strong> and{" "}
          <strong style={{ color: t.accent, fontWeight: 600 }}>code quality</strong>.
        </p>

        {/* Tag pills */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", marginBottom: 40 }}>
          {TAGS.map(tag => (
            <span key={tag} style={{
              padding: "6px 18px", borderRadius: 999, fontSize: 13, fontWeight: 500,
              background: t.accentBg, border: `1px solid ${t.border}`, color: t.accent,
            }}>
              {tag}
            </span>
          ))}
        </div>

        {/* CTA buttons */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
          <BtnPrimary onClick={e => { e.preventDefault(); scrollToSection("contact"); }}>
            ✉ Get in Touch
          </BtnPrimary>
          <BtnOutline isDark={isDark} onClick={e => { e.preventDefault(); scrollToSection("projects"); }}>
            ↓ View Projects
          </BtnOutline>
        </div>

        {/* Contact row */}
        <div style={{
          display: "flex", flexWrap: "wrap", gap: 16,
          justifyContent: "center", marginTop: 40,
          fontSize: 12, color: t.textMute,
        }}>
          {CONTACT_LINKS.map((item, i) => (
            <span key={i} style={{ display: "flex", alignItems: "center", gap: 16 }}>
              {i > 0 && <span style={{ color: t.border }}>·</span>}
              {item.href ? (
                <a href={item.href} target={item.target} rel="noreferrer"
                  style={{ color: t.textMute, textDecoration: "none" }}
                  onMouseEnter={e => (e.currentTarget.style.color = t.accent)}
                  onMouseLeave={e => (e.currentTarget.style.color = t.textMute)}
                >
                  {item.label}
                </a>
              ) : (
                <span>{item.label}</span>
              )}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="bounce2" style={{ position: "absolute", bottom: 32, left: "50%" }}>
        <div style={{
          width: 20, height: 36, borderRadius: 10,
          border: `1.5px solid ${isDark ? "#475569" : "#cbd5e1"}`,
          display: "flex", alignItems: "flex-start",
          justifyContent: "center", padding: 4,
        }}>
          <div className="pulse2" style={{ width: 4, height: 8, borderRadius: 2, background: t.accent }} />
        </div>
      </div>
    </section>
  );
}
