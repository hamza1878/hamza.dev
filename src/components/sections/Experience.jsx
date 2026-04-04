import { tok }        from "../../theme/tokens";
import { EXPERIENCE } from "../../data";
import SectionHeader  from "../ui/SectionHeader";

export default function Experience({ isDark }) {
  const t = tok(isDark);

  return (
    <section id="experience" style={{ padding: "96px 24px", position: "relative", zIndex: 1 }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <SectionHeader eyebrow="Career" title="Experience & Education" isDark={isDark} />

        <div style={{ marginTop: 56, position: "relative" }}>
          {/* Vertical timeline line */}
          <div style={{
            position: "absolute", left: 16, top: 0, bottom: 0, width: 1,
            background: `linear-gradient(to bottom, ${t.accent}, transparent)`,
          }} />

          {EXPERIENCE.map((item, i) => (
            <div key={i} style={{
              position: "relative",
              display: "flex", gap: 32,
              marginBottom: 48, paddingLeft: 48,
            }}>
              {/* Timeline dot */}
              <div style={{
                position: "absolute", left: 10, top: 8,
                width: 12, height: 12, borderRadius: "50%",
                background: t.accent,
                border: `2px solid ${isDark ? "#c4b5fd" : "#7c3aed"}`,
                zIndex: 1,
                boxShadow: `0 0 12px ${t.accent}60`,
              }} />

              <div style={{ flex: 1 }}>
                {/* Year label */}
                <span style={{
                  fontSize: 11, fontWeight: 700,
                  letterSpacing: ".2em", textTransform: "uppercase",
                  color: t.eyebrow,
                }}>
                  {item.label}
                </span>

                {/* Card */}
                <div
                  style={{
                    background: t.bgCard,
                    border: `1px solid ${t.border}`,
                    borderRadius: 16, padding: 20,
                    marginTop: 8, transition: "all .3s",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background  = t.bgCardH;
                    e.currentTarget.style.borderColor = t.borderH;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background  = t.bgCard;
                    e.currentTarget.style.borderColor = t.border;
                  }}
                >
                  {/* Tag badge */}
                  <span style={{
                    fontSize: 11, padding: "3px 12px", borderRadius: 999,
                    fontWeight: 600, display: "inline-block", marginBottom: 8,
                    background: t.tagBg, color: t.tagText,
                    border: `1px solid ${t.tagBorder}`,
                  }}>
                    {item.tag}
                  </span>

                  <h3 style={{ fontWeight: 900, fontSize: 18, color: t.text }}>{item.org}</h3>
                  <p style={{ fontWeight: 600, fontSize: 13, color: t.accent, marginBottom: 10 }}>{item.role}</p>

                  {item.link && (
                    <a href={item.link} target="_blank" rel="noreferrer" style={{
                      fontSize: 11, color: t.textMute,
                      textDecoration: "none", display: "block", marginBottom: 8,
                    }}>
                      {item.link}
                    </a>
                  )}

                  {item.points.map((point, j) => (
                    <div key={j} style={{
                      display: "flex", alignItems: "flex-start",
                      gap: 8, marginBottom: 4,
                    }}>
                      <span style={{ color: t.accent, marginTop: 2, fontSize: 10 }}>▸</span>
                      <span style={{ fontSize: 13, color: t.textMd, lineHeight: 1.6 }}>{point}</span>
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
