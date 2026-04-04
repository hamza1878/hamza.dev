import { SKILLS }       from "../../data";
import SectionHeader    from "../ui/SectionHeader";
import SkillBar         from "../ui/SkillBar";

export default function Skills({ isDark }) {
  return (
    <section id="skills" style={{ padding: "96px 24px", position: "relative", zIndex: 1 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <SectionHeader eyebrow="Expertise" title="Technical Skills" isDark={isDark} />

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 16, marginTop: 48,
        }}>
          {Object.entries(SKILLS).map(([name, data]) => (
            <SkillBar key={name} name={name} level={data.level} items={data.items} isDark={isDark} />
          ))}
        </div>
      </div>
    </section>
  );
}
