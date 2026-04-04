import { tok }        from "../../theme/tokens";
import { DS_SKILLS }  from "../../data";
import SectionHeader  from "../ui/SectionHeader";

export default function DataScience({ isDark }) {
  const t = tok(isDark);

  return (
    <section id="data-science" style={{ padding: "96px 24px", position: "relative", zIndex: 1 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <SectionHeader
          eyebrow="AI / Data"
          title="Data Science & ML"
          desc="From raw data ingestion to deployed models — full pipeline expertise."
          isDark={isDark}
        />

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 16, marginTop: 48,
        }}>
          {DS_SKILLS.map((skill, i) => (
            <div
              key={i}
              style={{
                background: t.bgCard,
                border: `1px solid ${t.border}`,
                borderRadius: 16, padding: 24,
                transition: "all .3s",
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
              <div style={{ fontSize: 28, marginBottom: 12 }}>{skill.icon}</div>
              <h3 style={{ fontWeight: 700, fontSize: 15, color: t.text, marginBottom: 4 }}>{skill.name}</h3>
              <p style={{ fontSize: 12, color: t.textSm, lineHeight: 1.6, marginBottom: 14 }}>{skill.desc}</p>

              {/* Progress bar */}
              <div style={{ height: 6, borderRadius: 3, background: t.progressBg, overflow: "hidden" }}>
                <div style={{
                  height: "100%", width: `${skill.level}%`, borderRadius: 3,
                  background: "linear-gradient(90deg,#7c3aed,#d946ef)",
                }} />
              </div>

              <span style={{ fontSize: 11, fontFamily: "monospace", color: t.textMute, marginTop: 4, display: "block" }}>
                {skill.level}% proficiency
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
