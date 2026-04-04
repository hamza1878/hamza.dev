import { tok }        from "../../theme/tokens";
import { CERTS }      from "../../data";
import SectionHeader  from "../ui/SectionHeader";

export default function Certifications({ isDark }) {
  const t = tok(isDark);

  return (
    <section id="certifications" style={{ padding: "96px 24px", position: "relative", zIndex: 1 }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <SectionHeader eyebrow="Credentials" title="Certifications" isDark={isDark} />

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 16, marginTop: 48,
        }}>
          {CERTS.map((cert, i) => (
            <a
              key={i}
              href={cert.link}
              target="_blank"
              rel="noreferrer"
              style={{
                display: "block", textDecoration: "none",
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
