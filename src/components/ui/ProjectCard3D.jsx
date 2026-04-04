import { useRef, useState } from "react";
import { tok }              from "../../theme/tokens";

export default function ProjectCard3D({ proj, isDark, index }) {
  const t       = tok(isDark);
  const cardRef = useRef(null);
  const [flipped, setFlipped] = useState(false);

  /* ── 3D tilt on mouse move ── */
  const handleMouseMove = e => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const dx   = (e.clientX - rect.left - rect.width  / 2) / (rect.width  / 2);
    const dy   = (e.clientY - rect.top  - rect.height / 2) / (rect.height / 2);

    card.style.transform = `perspective(700px) rotateY(${dx * 14}deg) rotateX(${-dy * 10}deg) translateZ(18px) scale(1.03)`;

    const shine = card.querySelector(".card-shine");
    if (shine) {
      const sx = ((e.clientX - rect.left) / rect.width)  * 100;
      const sy = ((e.clientY - rect.top)  / rect.height) * 100;
      shine.style.setProperty("--shine-x", `${sx}%`);
      shine.style.setProperty("--shine-y", `${sy}%`);
    }
  };

  const handleMouseLeave = () => {
    if (cardRef.current)
      cardRef.current.style.transform = "perspective(700px) rotateY(0deg) rotateX(0deg) translateZ(0px) scale(1)";
  };

  /* ── Shared face style factory ── */
  const faceStyle = (back = false) => ({
    position: "absolute", inset: 0,
    backfaceVisibility: "hidden",
    borderRadius: 18, padding: 24,
    display: "flex", flexDirection: "column", gap: 12,
    border: `1px solid ${t.border}`,
    overflow: "hidden",
    transform: back
      ? (flipped ? "rotateY(0deg)"    : "rotateY(-180deg)")
      : (flipped ? "rotateY(180deg)"  : "rotateY(0deg)"),
    transition: "transform 0.6s cubic-bezier(0.4,0,0.2,1)",
    background: back
      ? (isDark
          ? `linear-gradient(135deg,${proj.color}33,rgba(20,10,40,0.97))`
          : `linear-gradient(135deg,${proj.color}22,#faf5ff)`)
      : (isDark
          ? "linear-gradient(135deg,rgba(20,10,40,0.95),rgba(30,15,60,0.9))"
          : "linear-gradient(135deg,#ffffff,#f5f0ff)"),
    ...(back && { justifyContent: "center", alignItems: "center", textAlign: "center" }),
  });

  return (
    <div style={{
      position: "relative", height: 240,
      transformStyle: "preserve-3d",
      animationDelay: `${index * 0.15}s`,
    }}>
      {/* Depth shadow layers */}
      {[1, 2, 3, 4].map(i => (
        <div key={i} style={{
          position: "absolute", inset: 0, borderRadius: 18,
          background: proj.color, zIndex: -i,
          transform: `translateZ(${-i * 4}px) translateX(${i}px) translateY(${i}px)`,
          opacity: 0.15 - i * 0.03,
        }} />
      ))}

      {/* Card container */}
      <div
        ref={cardRef}
        className="project-card-3d"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => setFlipped(f => !f)}
        style={{
          position: "absolute", inset: 0,
          transformStyle: "preserve-3d",
          transition: "transform 0.2s ease",
          borderRadius: 18,
          boxShadow: isDark
            ? "0 8px 32px rgba(0,0,0,0.4)"
            : "0 8px 32px rgba(124,58,237,0.12)",
        }}
      >
        {/* ── Front ── */}
        <div style={faceStyle(false)}>
          <div className="card-shine" />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <span style={{ fontSize: 28, lineHeight: 1 }}>{proj.icon}</span>
            <span className="tag-pill" style={{
              background: `${proj.color}33`, color: proj.color,
              border: `1px solid ${proj.color}55`,
            }}>
              {proj.tag}
            </span>
          </div>
          <h3 style={{ fontWeight: 800, fontSize: 16, color: t.text, lineHeight: 1.3 }}>
            {proj.title}
          </h3>
          <p style={{ fontSize: 12, color: t.textSm, lineHeight: 1.6, flex: 1 }}>
            {proj.desc}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
            {proj.stack.map(s => (
              <span key={s} className="stack-badge" style={{
                background: t.stackBg,
                border: `1px solid ${t.stackBor}`,
                color: t.stackTxt,
              }}>
                {s}
              </span>
            ))}
          </div>
          <div style={{ fontSize: 11, color: t.textMute, textAlign: "right", marginTop: 4 }}>
            Click to flip →
          </div>
        </div>

        {/* ── Back ── */}
        <div style={faceStyle(true)}>
          <div className="card-shine" />
          <span style={{ fontSize: 48, marginBottom: 12 }}>{proj.icon}</span>
          <h3 style={{ fontWeight: 800, fontSize: 18, color: t.text, marginBottom: 8 }}>
            {proj.title}
          </h3>
          <p style={{ fontSize: 13, color: t.textMd, lineHeight: 1.7, maxWidth: 220 }}>
            {proj.desc}
          </p>
          <div style={{
            marginTop: 20, padding: "8px 20px", borderRadius: 999,
            background: `linear-gradient(135deg,${proj.color},#9333ea)`,
            color: "#fff", fontSize: 12, fontWeight: 700,
            cursor: "pointer", boxShadow: `0 4px 16px ${proj.color}55`,
          }}>
            View Project ↗
          </div>
        </div>
      </div>
    </div>
  );
}
