import { tok } from "../../theme/tokens";

export default function BtnOutline({ href, onClick, children, isDark, target }) {
  const t = tok(isDark);

  const base = {
    display: "inline-flex", alignItems: "center", gap: 8,
    padding: "12px 28px", borderRadius: 999,
    fontWeight: 700, fontSize: 14, textDecoration: "none",
    border: `1.5px solid ${t.borderH}`,
    color: t.accent, background: "transparent",
    transition: "all .25s", cursor: "pointer",
  };

  return (
    <a
      href={href}
      onClick={onClick}
      target={target}
      rel="noreferrer"
      style={base}
      onMouseEnter={e => {
        e.currentTarget.style.background  = t.accentBg;
        e.currentTarget.style.transform   = "scale(1.05)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background  = "transparent";
        e.currentTarget.style.transform   = "scale(1)";
      }}
    >
      {children}
    </a>
  );
}
