import { Reveal, SectionLabel } from "./UI";
import { TESTIMONIALS } from "../data/Constants";

export default function Testimonials({ tIdx, setTIdx }) {
  return (
    <section className="section-pad" style={{ padding: "clamp(4rem,8vw,7rem) clamp(1.2rem,5vw,4rem)", background: "#070707", borderTop: "1px solid rgba(245,197,24,.08)" }}>
      <div style={{ maxWidth: 1240, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: "clamp(2.5rem,5vw,4rem)" }}>
            <SectionLabel>Social Proof</SectionLabel>
            <h2 className="font-display section-h2" style={{ fontSize: "clamp(2.6rem,6vw,5rem)", letterSpacing: ".02em", lineHeight: .95 }}>
              WHAT CLIENTS <span style={{ color: "#F5C518" }}>SAY</span>
            </h2>
          </div>
        </Reveal>

        <div style={{ position: "relative", maxWidth: 740, margin: "0 auto" }}>
          <div className="testi-min-height" style={{ textAlign: "center", minHeight: "clamp(280px,32vw,260px)", position: "relative" }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={t.name} style={{
                position: "absolute", inset: 0,
                opacity: i === tIdx ? 1 : 0,
                transform: i === tIdx ? "translateY(0)" : "translateY(16px)",
                transition: "opacity .6s ease, transform .6s ease",
                pointerEvents: i === tIdx ? "auto" : "none",
              }}>
                <div className="font-display" style={{ fontSize: "4.5rem", color: "#F5C518", lineHeight: .8, marginBottom: "1rem", opacity: .6 }}>"</div>
                <p className="font-body" style={{ fontSize: "clamp(.92rem,1.8vw,1.1rem)", color: "#ccc5b0", lineHeight: 1.8, marginBottom: "1.8rem", fontWeight: 300, fontStyle: "italic" }}>
                  {t.quote}
                </p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
                  <div style={{ width: 46, height: 46, borderRadius: "50%", overflow: "hidden", border: "2px solid rgba(245,197,24,.35)", flexShrink: 0 }}>
                    <img src={t.avatar} alt={t.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div style={{ textAlign: "left" }}>
                    <div className="font-head" style={{ fontWeight: 700, fontSize: ".9rem" }}>{t.name}</div>
                    <div className="font-body" style={{ color: "#F5C518", fontSize: ".72rem", letterSpacing: ".12em" }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dot indicators */}
          <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: "clamp(1.8rem,4vw,3rem)" }}>
            {TESTIMONIALS.map((_, i) => (
              <button key={i} onClick={() => setTIdx(i)}
                style={{ width: i === tIdx ? 26 : 7, height: 4, borderRadius: 2, background: i === tIdx ? "#F5C518" : "#2a2a22", border: "none", cursor: "pointer", transition: "all .35s ease" }} />
            ))}
          </div>

          {/* Arrow controls */}
          <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: "1rem" }}>
            {["←", "→"].map((arrow, i) => (
              <button key={arrow}
                onClick={() => setTIdx(p => i === 0 ? (p - 1 + TESTIMONIALS.length) % TESTIMONIALS.length : (p + 1) % TESTIMONIALS.length)}
                style={{ width: 38, height: 38, border: "1px solid rgba(245,197,24,.25)", background: "transparent", color: "#F5C518", cursor: "pointer", fontSize: ".95rem", transition: "all .25s" }}
                onMouseEnter={e => { e.currentTarget.style.background = "#F5C518"; e.currentTarget.style.color = "#000"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#F5C518"; }}>
                {arrow}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}