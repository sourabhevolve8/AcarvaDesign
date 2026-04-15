import { Reveal, SectionLabel } from "./UI";
import { PRICING } from "../data/Constants";

export default function Pricing({ scrollTo }) {
  return (
    <section id="pricing" className="section-pad" style={{ padding: "clamp(4rem,8vw,7rem) clamp(1.2rem,5vw,4rem)" }}>
      <div style={{ maxWidth: 1240, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: "clamp(2.5rem,5vw,4rem)" }}>
            <SectionLabel>Transparent Pricing</SectionLabel>
            <h2 className="font-display section-h2" style={{ fontSize: "clamp(2.6rem,6vw,5rem)", letterSpacing: ".02em", lineHeight: .95 }}>
              CHOOSE YOUR <span style={{ color: "#F5C518" }}>PLAN</span>
            </h2>
            <p className="font-body" style={{ fontSize: ".92rem", color: "#6b6b60", marginTop: ".8rem", fontWeight: 300 }}>
              No contracts. No hidden fees. Cancel or upgrade anytime.
            </p>
          </div>
        </Reveal>

        <div className="pricing-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%,280px),1fr))", gap: 14, alignItems: "start" }}>
          {PRICING.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.1}>
              <div className={p.popular ? "pricing-popular" : ""} style={{
                border: p.popular ? "2px solid #F5C518" : "1px solid rgba(245,197,24,.14)",
                background: p.popular ? "rgba(245,197,24,.04)" : "#0d0d0d",
                padding: "clamp(1.6rem,3vw,2.2rem)",
                position: "relative",
                transform: p.popular ? "scale(1.03)" : "scale(1)",
                boxShadow: p.popular ? "0 0 60px rgba(245,197,24,.12)" : "none",
              }}>
                {p.popular && (
                  <div className="font-head gold-bg" style={{ position: "absolute", top: -13, left: "50%", transform: "translateX(-50%)", padding: "4px 18px", fontSize: ".65rem", letterSpacing: ".2em", textTransform: "uppercase", fontWeight: 700, color: "#000", whiteSpace: "nowrap" }}>
                    Most Popular
                  </div>
                )}
                <div className="font-head" style={{ fontSize: ".72rem", letterSpacing: ".25em", textTransform: "uppercase", color: "#F5C518", fontWeight: 600, marginBottom: ".8rem" }}>{p.name}</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: ".7rem" }}>
                  <span className="font-display" style={{ fontSize: "clamp(2.2rem,5vw,2.8rem)", color: "#fff", lineHeight: 1 }}>
                    {p.price === "Custom" ? "Custom" : `$${p.price}`}
                  </span>
                  {p.period && <span className="font-body" style={{ fontSize: ".82rem", color: "#6b6b60" }}>{p.period}</span>}
                </div>
                <p className="font-body" style={{ fontSize: ".83rem", color: "#6b6b60", marginBottom: "1.5rem", fontWeight: 300, lineHeight: 1.6 }}>{p.desc}</p>
                <div style={{ borderTop: "1px solid rgba(245,197,24,.1)", paddingTop: "1.3rem", marginBottom: "1.5rem" }}>
                  {p.features.map(f => (
                    <div key={f} style={{ display: "flex", alignItems: "flex-start", gap: 9, marginBottom: ".72rem" }}>
                      <span style={{ color: "#F5C518", fontSize: ".72rem", flexShrink: 0, marginTop: 3 }}>✓</span>
                      <span className="font-body" style={{ fontSize: ".83rem", color: "#9a9a88", fontWeight: 300 }}>{f}</span>
                    </div>
                  ))}
                </div>
                <button onClick={() => scrollTo("#contact")}
                  className={p.popular ? "btn-primary font-head gold-bg" : "btn-outline font-head"}
                  style={{
                    width: "100%", padding: "12px", fontSize: ".8rem", letterSpacing: ".15em",
                    textTransform: "uppercase", fontWeight: 700,
                    border: p.popular ? "none" : "1.5px solid rgba(245,197,24,.4)",
                    color: p.popular ? "#000" : "#F5C518", borderRadius: 2, cursor: "pointer",
                  }}>
                  {p.cta}
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}