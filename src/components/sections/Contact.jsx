import { tok }        from "../../theme/tokens";
import { STATS }      from "../../data";
import SectionHeader  from "../ui/SectionHeader";
import BtnPrimary     from "../ui/BtnPrimary";
import BtnOutline     from "../ui/BtnOutline";

export default function Contact({ isDark }) {
  const t = tok(isDark);

  return (
    <section id="contact" style={{ padding: "96px 24px", position: "relative", zIndex: 1 }}>
      <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
        <SectionHeader
          eyebrow="Contact"
          title="Let's Work Together"
          desc="Open to internships, full-time roles, freelance projects, and data science collaborations."
          isDark={isDark}
        />

        {/* CTA buttons */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center", marginTop: 40 }}>
          <BtnPrimary href="mailto:bensassihamza19@gmail.com">✉ Email Me</BtnPrimary>
          <BtnOutline href="https://linkedin.com/in/hamza-bensassi" target="_blank" isDark={isDark}>💼 LinkedIn</BtnOutline>
          <BtnOutline href="tel:+21692969805" isDark={isDark}>📞 Call</BtnOutline>
        </div>

        {/* Stats card */}
        <div style={{
          background: t.bgCard,
          border: `1px solid ${t.border}`,
          borderRadius: 16, padding: 24, marginTop: 40,
        }}>
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16, textAlign: "center",
          }}>
            {STATS.map(([num, label]) => (
              <div key={label}>
                <div style={{ fontSize: 28, fontWeight: 900, color: t.accent }}>{num}</div>
                <div style={{ fontSize: 11, color: t.textMute, marginTop: 2 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
