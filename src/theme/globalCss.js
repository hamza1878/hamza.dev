export const GLOBAL_CSS = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }

  /* ── Scrollbar ── */
  ::-webkit-scrollbar       { width: 4px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: #7c3aed; border-radius: 2px; }

  /* ── Keyframes ── */
  @keyframes ping2 {
    0%        { transform: scale(1);   opacity: 1; }
    75%, 100% { transform: scale(2.2); opacity: 0; }
  }
  @keyframes pulse2 {
    0%, 100% { opacity: 1;  }
    50%      { opacity: .4; }
  }
  @keyframes bounce2 {
    0%, 100% {
      transform: translateY(-25%) translateX(-50%);
      animation-timing-function: cubic-bezier(.8, 0, 1, 1);
    }
    50% {
      transform: translateY(0) translateX(-50%);
      animation-timing-function: cubic-bezier(0, 0, .2, 1);
    }
  }
  @keyframes cursor  { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
  @keyframes fadeUp  { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

  /* ── Animation utility classes ── */
  .ping2    { animation: ping2   1.5s cubic-bezier(0,0,.2,1) infinite; }
  .pulse2   { animation: pulse2  2.5s ease-in-out infinite; }
  .bounce2  { animation: bounce2 1.2s infinite; }
  .cursor   { animation: cursor  1s   step-end  infinite; }
  .fade-up  { animation: fadeUp  .6s  ease       both; }

  /* ── Navbar button reset ── */
  .nav-link-btn {
    background: none;
    border: none;
    cursor: pointer;
    font-family: inherit;
    transition: color .2s;
  }

  /* ── Project card 3D ── */
  .project-card-3d {
    transform-style: preserve-3d;
    transition: transform 0.15s ease-out, box-shadow 0.3s ease;
    cursor: pointer;
    will-change: transform;
  }
  .project-card-3d:hover {
    box-shadow: 0 30px 60px rgba(124,58,237,.35), 0 0 40px rgba(124,58,237,.15) !important;
  }

  /* ── Card shine overlay ── */
  .card-shine {
    position: absolute;
    inset: 0;
    border-radius: inherit;
    pointer-events: none;
    background: radial-gradient(
      circle at var(--shine-x, 50%) var(--shine-y, 50%),
      rgba(255,255,255,.12) 0%,
      transparent 60%
    );
    transition: opacity 0.3s;
    opacity: 0;
  }
  .project-card-3d:hover .card-shine { opacity: 1; }

  /* ── Tag pill ── */
  .tag-pill {
    display: inline-block;
    padding: 3px 12px;
    border-radius: 999px;
    font-size: 11px;
    font-weight: 600;
  }

  /* ── Stack badge ── */
  .stack-badge {
    padding: 2px 10px;
    font-size: 11px;
    border-radius: 6px;
    font-family: monospace;
    font-weight: 500;
  }

  /* ── Particle canvas ── */
  #particle-canvas {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 0;
  }
`;
