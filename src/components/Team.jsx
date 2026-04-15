import { Reveal, SectionLabel } from "./UI";
import { TEAM } from "../data/Constants";

export default function Team() {
  return (
    <section id="team" className="section-pad" style={{ padding: "clamp(4rem,8vw,7rem) clamp(1.2rem,5vw,4rem)" }}>
      <div style={{ maxWidth: 1240, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: "clamp(2.5rem,5vw,4rem)" }}>
            <SectionLabel>The People</SectionLabel>
            <h2 className="font-display section-h2" style={{ fontSize: "clamp(2.6rem,6vw,5rem)", letterSpacing: ".02em", lineHeight: .95 }}>
              MEET THE <span style={{ color: "#F5C518" }}>TEAM</span>
            </h2>
          </div>
        </Reveal>

        <div className="team-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 240px), 1fr))", gap: 14 }}>
          {TEAM.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.09}>
              <div
                className="team-card"
                style={{ border: "1px solid rgba(245,197,24,.12)", overflow: "hidden", cursor: "pointer", transition: "border-color .3s" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(245,197,24,.45)"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(245,197,24,.12)"}
              >
                <div className="team-img-height" style={{ height: "clamp(200px,28vw,340px)", overflow: "hidden" }}>
                  <img className="team-img" src={t.img} alt={t.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
                </div>
                <div style={{ padding: "1.2rem 1.4rem", background: "#0d0d0d" }}>
                  <h3 className="font-head" style={{ fontSize: ".95rem", fontWeight: 700, marginBottom: 4 }}>{t.name}</h3>
                  <div className="font-head" style={{ fontSize: ".66rem", color: "#F5C518", letterSpacing: ".18em", textTransform: "uppercase", fontWeight: 600 }}>{t.role}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}