import { useState }     from "react";
import { tok }          from "../../theme/tokens";
import { PROJECTS, PROJECT_TAGS } from "../../data";
import SectionHeader    from "../ui/SectionHeader";
import ProjectCard3D    from "../ui/ProjectCard3D";

export default function Projects({ isDark }) {
  const t                   = tok(isDark);
  const [filter, setFilter] = useState("All");

  const shown = filter === "All"
    ? PROJECTS
    : PROJECTS.filter(p => p.tag === filter);

  return (
    <section id="projects" style={{ padding: "96px 24px", position: "relative", zIndex: 1 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <SectionHeader
          eyebrow="Portfolio"
          title="Featured Projects"
          desc="Hover for 3D effect — click to flip the card and see details."
          isDark={isDark}
        />

        {/* 3D indicator */}
        <div style={{
          display: "flex", alignItems: "center", gap: 8,
          justifyContent: "center", margin: "16px 0 24px",
          fontSize: 12, color: t.textMute,
        }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#4ade80", display: "inline-block" }} />
          Interactive 3D — perspective &amp; flip animation
        </div>

        {/* Filter buttons */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", margin: "0 0 48px" }}>
          {PROJECT_TAGS.map(tag => {
            const active = filter === tag;
            return (
              <button
                key={tag}
                onClick={() => setFilter(tag)}
                style={{
                  padding: "7px 16px", borderRadius: 999,
                  fontSize: 12, fontWeight: 600, cursor: "pointer",
                  transition: "all .2s",
                  border:      active ? "1.5px solid #7c3aed" : `1.5px solid ${t.border}`,
                  background:  active ? "#7c3aed"             : t.bgCard,
                  color:       active ? "#fff"                : t.textSm,
                  boxShadow:   active ? "0 4px 16px rgba(124,58,237,.35)" : "none",
                }}
              >
                {tag}
              </button>
            );
          })}
        </div>

        {/* Cards grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: 32,
          perspective: "1200px",
          perspectiveOrigin: "50% 50%",
        }}>
          {shown.map((proj, i) => (
            <ProjectCard3D key={proj.title} proj={proj} isDark={isDark} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
