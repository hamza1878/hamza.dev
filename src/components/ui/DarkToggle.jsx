export default function DarkToggle({ isDark, toggle }) {
  return (
    <button
      onClick={toggle}
      aria-label="Toggle dark/light mode"
      style={{
        width: 44, height: 24, borderRadius: 12,
        position: "relative", flexShrink: 0,
        background: isDark ? "#7c3aed" : "#e2e8f0",
        border: `1.5px solid ${isDark ? "#7c3aed" : "#cbd5e1"}`,
        cursor: "pointer", transition: "all .3s",
      }}
    >
      <span style={{
        position: "absolute", top: 2,
        left: isDark ? 22 : 2,
        width: 16, height: 16, borderRadius: 8,
        background: "#fff",
        boxShadow: "0 1px 4px rgba(0,0,0,.25)",
        transition: "left .3s",
        display: "flex", alignItems: "center",
        justifyContent: "center", fontSize: 9,
      }}>
        {isDark ? "🌙" : "☀️"}
      </span>
    </button>
  );
}
