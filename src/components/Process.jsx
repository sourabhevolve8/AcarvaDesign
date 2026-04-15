import { Reveal, SectionLabel } from "./UI";
import { PROCESS } from "../data/Constants";

export default function Process() {
  return (
    <section className="section-pad" style={{ padding: "clamp(4rem,8vw,7rem) clamp(1.2rem,5vw,4rem)", background: "#080808", borderTop: "1px solid rgba(245,197,24,.08)", borderBottom: "1px solid rgba(245,197,24,.08)" }}>
      <div style={{ maxWidth: 1240, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: "clamp(2.5rem,5vw,4rem)" }}>
            <SectionLabel>How It Works</SectionLabel>
            <h2 className="font-display section-h2" style={{ fontSize: "clamp(2.6rem,6vw,5rem)", letterSpacing: ".02em", lineHeight: .95 }}>
              OUR <span style={{ color: "#F5C518" }}>PROCESS</span>
            </h2>
          </div>
        </Reveal>

        <div className="process-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%,200px),1fr))", gap: "clamp(2rem,4vw,3rem)", position: "relative" }}>
          {/* Connector line (desktop only) */}
          <div className="hide-mobile" style={{ position: "absolute", top: "3rem", left: "calc(12.5% + 1rem)", right: "calc(12.5% + 1rem)", height: 1, background: "linear-gradient(to right, transparent, rgba(245,197,24,.25) 20%, rgba(245,197,24,.25) 80%, transparent)" }} />

          {PROCESS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.1}>
              <div style={{ textAlign: "center", padding: "0 .5rem" }}>
                <div style={{
                  width: 58, height: 58, background: "#F5C518",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 1.4rem", color: "#000", fontWeight: 900, fontSize: "1.1rem",
                  fontFamily: "'Syne', sans-serif",
                  boxShadow: "0 0 30px rgba(245,197,24,.3)",
                  position: "relative", zIndex: 1,
                }}>{p.num}</div>
                <h3 className="font-head" style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: ".6rem" }}>{p.title}</h3>
                <p className="font-body" style={{ fontSize: ".84rem", color: "#6b6b60", lineHeight: 1.75, fontWeight: 300 }}>{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}