import { Reveal, SectionLabel, SkillBar } from "./UI";

export default function About() {
  return (
    <section id="about" className="section-pad" style={{ padding: "clamp(4rem,8vw,7rem) clamp(1.2rem,5vw,4rem)", background: "#0a0a0a", borderTop: "1px solid rgba(245,197,24,.08)" }}>
      <div style={{ maxWidth: 1240, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%,460px),1fr))", gap: "clamp(2.5rem,5vw,5rem)", alignItems: "center" }}>
        
        {/* Image collage */}
        <Reveal anim="fadeLeft">
          <div className="about-image-col" style={{ position: "relative", height: "clamp(300px,45vw,520px)" }}>
            <div style={{ position: "absolute", left: 0, top: 0, width: "68%", height: "75%", overflow: "hidden", border: "1px solid rgba(245,197,24,.15)" }}>
              <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=700&q=80" alt="Team" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div style={{ position: "absolute", right: 0, bottom: 0, width: "56%", height: "60%", overflow: "hidden", border: "1px solid rgba(245,197,24,.2)" }}>
              <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&q=80" alt="Strategy" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div className="gold-bg" style={{ position: "absolute", left: "62%", top: "18%", width: 52, height: 52, zIndex: 2 }} />
            <div style={{
              position: "absolute", left: 20, bottom: 24, zIndex: 3,
              background: "rgba(6,6,6,.92)", border: "1px solid rgba(245,197,24,.3)",
              padding: "12px 16px", backdropFilter: "blur(12px)",
            }}>
              <div className="font-display" style={{ fontSize: "1.8rem", color: "#F5C518", lineHeight: 1 }}>12M+</div>
              <div className="font-head" style={{ fontSize: ".6rem", letterSpacing: ".2em", color: "#6b6b60", textTransform: "uppercase" }}>Revenue Generated</div>
            </div>
          </div>
        </Reveal>

        {/* Text content */}
        <Reveal anim="fadeRight" delay={0.1}>
          <SectionLabel>Our Story</SectionLabel>
          <h2 className="font-display section-h2" style={{ fontSize: "clamp(2.4rem,5vw,4rem)", lineHeight: .95, marginBottom: "1.6rem", letterSpacing: ".02em" }}>
            BUILT BY <span style={{ color: "#F5C518" }}>BUILDERS,</span><br />FOR BUILDERS.
          </h2>
          <p className="font-body" style={{ fontSize: ".93rem", color: "#7a7a6a", lineHeight: 1.8, marginBottom: "1.2rem", fontWeight: 300 }}>
            Acarva Design was founded on a simple belief: great businesses deserve great brands. We're not just a design shop — we're growth partners who roll up our sleeves and do whatever it takes to win.
          </p>
          <p className="font-body" style={{ fontSize: ".93rem", color: "#7a7a6a", lineHeight: 1.8, marginBottom: "2rem", fontWeight: 300 }}>
            From scrappy startups to multinational corporations, we've spent 8 years helping ambitious founders and CMOs build brands that generate real, measurable business results.
          </p>
          {[
            { skill: "Brand Strategy",    pct: 98 },
            { skill: "Digital Marketing", pct: 95 },
            { skill: "Creative Design",   pct: 97 },
            { skill: "Business Growth",   pct: 92 },
          ].map((sk, i) => (
            <SkillBar key={sk.skill} skill={sk.skill} pct={sk.pct} delay={i * 0.12} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}