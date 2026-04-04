import { tok } from "../../theme/tokens";

export default function Footer({ isDark }) {
  const t = tok(isDark);
  return (
    <footer style={{
      padding: "24px",
      textAlign: "center",
      borderTop: `1px solid ${t.divider}`,
      fontSize: 12,
      color: t.textMute,
    }}>
      © 2025 Hamza Bensassi · Built with React &amp; Canvas 2D
    </footer>
  );
}
