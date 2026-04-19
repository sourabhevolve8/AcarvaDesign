import { useState } from "react";
import { Reveal, SectionLabel } from "./UI";
import { SERVICES } from "../data/Constants";

export default function Services() {
  const [activeService, setActiveService] = useState(null);

  return (
    <section id="services" className="section-pad" style={{ padding: "clamp(4rem,8vw,7rem) clamp(1.2rem,5vw,4rem)" }}>
      <div style={{ maxWidth: 1240, margin: "0 auto" }}>
        <Reveal>
          <SectionLabel>What We Do</SectionLabel>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "1.2rem", marginBottom: "clamp(2.5rem,5vw,4rem)" }}>
            <h2 className="font-display section-h2" style={{ fontSize: "clamp(2.6rem,6vw,5rem)", lineHeight: .95, letterSpacing: ".02em" }}>
              OUR <span style={{ color: "#F5C518" }}>SERVICES</span>
            </h2>
          </div>
        </Reveal>

        <div className="services-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 320px), 1fr))", gap: 14 }}>
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.07}>
              <div
                className="service-card"
                onMouseEnter={() => setActiveService(i)}
                onMouseLeave={() => setActiveService(null)}
                style={{
                  background: activeService === i ? "rgba(245,197,24,.04)" : "#0d0d0d",
                  border: "1px solid rgba(245,197,24,.14)",
                  padding: "clamp(1.4rem,2.5vw,2rem)",
                  cursor: "pointer",
                  height: "100%",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.2rem" }}>
                  <span className="service-icon" style={{ fontSize: "2.2rem", color: "#3a3a32", display: "inline-block" }}>{s.icon}</span>
                  <span className="font-head" style={{ fontSize: ".62rem", letterSpacing: ".2em", textTransform: "uppercase", color: "#F5C518", fontWeight: 600, border: "1px solid rgba(245,197,24,.2)", padding: "3px 9px" }}>{s.tag}</span>
                </div>
                <h3 className="font-head" style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: ".7rem", letterSpacing: ".03em" }}>{s.title}</h3>
                <p className="font-body" style={{ fontSize: ".86rem", color: "#6b6b60", lineHeight: 1.75, fontWeight: 300 }}>{s.desc}</p>
                <div style={{ marginTop: "1.2rem", display: "flex", alignItems: "center", gap: 8, color: "#F5C518", fontSize: ".72rem", fontWeight: 600, letterSpacing: ".2em", textTransform: "uppercase", opacity: activeService === i ? 1 : 0, transition: "opacity .3s" }}>
                  <span className="font-head">Explore</span>
                  <span>→</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}