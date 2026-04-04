import { tok } from "../../theme/tokens";

export default function SectionHeader({ eyebrow, title, desc, isDark }) {
  const t = tok(isDark);
  return (
    <div style={{ textAlign: "center", marginBottom: 16 }}>
      <span style={{
        fontSize: 11, fontWeight: 700,
        letterSpacing: "0.3em", textTransform: "uppercase",
        color: t.eyebrow,
      }}>
        {eyebrow}
      </span>

      <h2 style={{
        fontSize: "clamp(28px,5vw,40px)",
        fontWeight: 900,
        color: t.text,
        margin: "8px 0 12px",
      }}>
        {title}
      </h2>

      {desc && (
        <p style={{
          color: t.textSm, fontSize: 14, lineHeight: 1.7,
          maxWidth: 520, margin: "0 auto",
        }}>
          {desc}
        </p>
      )}
    </div>
  );
}
