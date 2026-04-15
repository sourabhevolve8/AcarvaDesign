import { Reveal, SectionLabel } from "./UI";
import { WORK } from "../data/Constants";

export default function Work({ scrollTo }) {
  return (
    <section id="work" className="section-pad" style={{ padding: "clamp(4rem,8vw,7rem) clamp(1.2rem,5vw,4rem)" }}>
      <div style={{ maxWidth: 1240, margin: "0 auto" }}>
        <Reveal>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "1.2rem", marginBottom: "clamp(2.5rem,5vw,4rem)" }}>
            <div>
              <SectionLabel>Portfolio</SectionLabel>
              <h2 className="font-display section-h2" style={{ fontSize: "clamp(2.6rem,6vw,5rem)", lineHeight: .95, letterSpacing: ".02em" }}>
                FEATURED <span style={{ color: "#F5C518" }}>WORK</span>
              </h2>
            </div>
            <button onClick={() => scrollTo("#contact")}
              className="btn-outline font-head"
              style={{ padding: "10px 22px", fontSize: ".78rem", letterSpacing: ".14em", textTransform: "uppercase", fontWeight: 700, border: "1.5px solid rgba(245,197,24,.35)", color: "#F5C518", background: "transparent", borderRadius: 2, cursor: "pointer" }}>
              View All Projects
            </button>
          </div>
        </Reveal>

        <div className="work-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 340px), 1fr))", gap: 12 }}>
          {WORK.map((w, i) => (
            <Reveal key={w.title} delay={i * 0.08}>
              <div className="work-card work-card-height" style={{ position: "relative", height: "clamp(200px,26vw,300px)", border: "1px solid rgba(245,197,24,.1)", overflow: "hidden", cursor: "pointer" }}>
                <img className="work-img" src={w.img} alt={w.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(6,6,6,.9) 0%, rgba(6,6,6,.3) 55%, transparent 100%)" }} />
                <div className="work-overlay" style={{ position: "absolute", inset: 0, background: "rgba(245,197,24,.06)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ width: 50, height: 50, border: "2px solid #F5C518", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#F5C518", fontSize: "1.2rem" }}>→</div>
                </div>
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "1.2rem 1.4rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                    <span style={{ width: 16, height: 1.5, background: w.accent, display: "inline-block" }} />
                    <span className="font-head" style={{ fontSize: ".62rem", letterSpacing: ".2em", textTransform: "uppercase", fontWeight: 600, color: w.accent }}>{w.tag}</span>
                  </div>
                  <h3 className="font-head" style={{ fontSize: "1rem", fontWeight: 700, marginBottom: 3, color: "#fff" }}>{w.title}</h3>
                  <p className="font-body" style={{ fontSize: ".78rem", color: "#9a9a88", fontWeight: 300 }}>{w.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}