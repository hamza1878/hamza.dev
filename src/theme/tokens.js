/**
 * Returns the full set of design tokens for dark or light mode.
 * @param {boolean} dark
 */
export function tok(dark) {
  const d = dark;
  return {
    // Backgrounds
    bg:       d ? "#080612"                    : "#f5f3ff",
    bgNav:    d ? "rgba(13,8,20,.95)"          : "rgba(255,255,255,.95)",
    bgCard:   d ? "rgba(255,255,255,.04)"      : "#ffffff",
    bgCardH:  d ? "rgba(255,255,255,.07)"      : "#f5f3ff",

    // Borders
    border:   d ? "rgba(109,40,217,.35)"       : "rgba(139,92,246,.25)",
    borderH:  d ? "rgba(124,58,237,.65)"       : "rgba(124,58,237,.5)",
    divider:  d ? "rgba(109,40,217,.25)"       : "rgba(139,92,246,.2)",

    // Text
    text:     d ? "#ffffff"                    : "#1e1b4b",
    textMd:   d ? "#cbd5e1"                    : "#4b5563",
    textSm:   d ? "#94a3b8"                    : "#6b7280",
    textMute: d ? "#64748b"                    : "#9ca3af",
    navText:  d ? "#94a3b8"                    : "#6b7280",
    eyebrow:  d ? "#8b5cf6"                    : "#7c3aed",

    // Accent
    accent:   d ? "#a78bfa"                    : "#7c3aed",
    accentBg: d ? "rgba(109,40,217,.2)"        : "rgba(237,233,254,1)",

    // Tags
    tagBg:    d ? "rgba(109,40,217,.35)"       : "rgba(237,233,254,1)",
    tagText:  d ? "#c4b5fd"                    : "#5b21b6",
    tagBorder:d ? "rgba(109,40,217,.4)"        : "rgba(167,139,250,.4)",

    // Pills
    pillBg:   d ? "rgba(46,16,101,.6)"         : "rgba(237,233,254,1)",
    pillBor:  d ? "rgba(109,40,217,.35)"       : "rgba(196,181,253,.5)",
    pillText: d ? "#c4b5fd"                    : "#5b21b6",

    // Stack badges
    stackBg:  d ? "rgba(0,0,0,.35)"            : "#f1f5f9",
    stackBor: d ? "rgba(71,85,105,.45)"        : "rgba(203,213,225,.8)",
    stackTxt: d ? "#cbd5e1"                    : "#475569",

    // Misc
    progressBg: d ? "#1e293b"                  : "#ede9fe",
  };
}
