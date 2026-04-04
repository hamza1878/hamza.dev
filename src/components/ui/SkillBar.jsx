import { tok }            from "../../theme/tokens";
import { useIntersection } from "../../hooks/useIntersection";

export default function SkillBar({ name, level, items, isDark }) {
  const t              = tok(isDark);
  const [ref, visible] = useIntersection();

  return (
    <div
      ref={ref}
      style={{
        background: t.bgCard,
        border: `1px solid ${t.border}`,
        borderRadius: 16, padding: 20,
        transition: "all .3s",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background   = t.bgCardH;
        e.currentTarget.style.borderColor  = t.borderH;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background   = t.bgCard;
        e.currentTarget.style.borderColor  = t.border;
      }}
    >
      {/* Header row */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
        <span style={{ fontWeight: 600, fontSize: 14, color: t.text }}>{name}</span>
        <span style={{ fontSize: 12, fontFamily: "monospace", fontWeight: 700, color: t.accent }}>
          {level}%
        </span>
      </div>

      {/* Progress bar */}
      <div style={{
        height: 6, borderRadius: 3,
        background: t.progressBg,
        marginBottom: 12, overflow: "hidden",
      }}>
        <div style={{
          height: "100%", borderRadius: 3,
          width: visible ? `${level}%` : "0%",
          background: "linear-gradient(90deg,#7c3aed,#d946ef)",
          transition: "width 1s cubic-bezier(.4,0,.2,1)",
        }} />
      </div>

      {/* Pill tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {items.map(item => (
          <span key={item} style={{
            padding: "2px 10px", fontSize: 11, borderRadius: 6, fontWeight: 500,
            background: t.pillBg,
            border: `1px solid ${t.pillBor}`,
            color: t.pillText,
          }}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
