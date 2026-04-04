const BASE = {
  display: "inline-flex", alignItems: "center", gap: 8,
  padding: "12px 28px", borderRadius: 999,
  fontWeight: 700, fontSize: 14,
  color: "#fff", textDecoration: "none",
  background: "linear-gradient(135deg,#7c3aed,#9333ea)",
  boxShadow: "0 4px 20px rgba(124,58,237,.4)",
  transition: "all .25s", cursor: "pointer",
};

export default function BtnPrimary({ href, onClick, children }) {
  return (
    <a
      href={href}
      onClick={onClick}
      style={BASE}
      onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
      onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
    >
      {children}
    </a>
  );
}
