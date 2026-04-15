import { SectionLabel, Counter } from "./UI";
import { STATS } from "../data/Constants";

export default function Hero({ scrollTo, mousePos }) {
  return (
    <section id="home" style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", paddingTop: 80, overflow: "hidden" }}>
      {/* Mouse-tracking glow */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: `radial-gradient(ellipse 70% 60% at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(245,197,24,.07) 0%, transparent 65%)`,
        transition: "background .6s ease",
      }} />
      <div className="grid-pattern" style={{ position: "absolute", inset: 0 }} />

      {/* Decorative rings */}
      <div className="spin1" style={{ position: "absolute", top: "8%", right: "4%", width: "min(380px,40vw)", height: "min(380px,40vw)", border: "1px solid rgba(245,197,24,.09)", borderRadius: "50%" }} />
      <div className="spin2" style={{ position: "absolute", top: "14%", right: "8%", width: "min(240px,26vw)", height: "min(240px,26vw)", border: "1px solid rgba(245,197,24,.06)", borderRadius: "50%" }} />
      <div className="spin1" style={{ position: "absolute", bottom: "6%", left: "2%", width: "min(260px,28vw)", height: "min(260px,28vw)", border: "1px solid rgba(245,197,24,.07)", borderRadius: "50%" }} />

      {/* Floating image (desktop) */}
      <div className="hide-mobile" style={{
        position: "absolute", right: "clamp(2rem,6vw,8rem)", top: "50%",
        transform: "translateY(-50%)",
        width: "min(420px, 34vw)", height: "min(500px, 42vw)",
        borderRadius: 4, overflow: "hidden",
        border: "1px solid rgba(245,197,24,.2)",
        boxShadow: "0 40px 100px rgba(0,0,0,.7), 0 0 60px rgba(245,197,24,.08)",
        animation: "fadeRight .9s ease .6s both, floatUp 5s ease-in-out 2s infinite",
      }}>
        <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80"
          alt="Creative team" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(6,6,6,.3) 0%, transparent 60%)" }} />
        <div style={{
          position: "absolute", bottom: 24, left: 24,
          background: "rgba(6,6,6,.9)", border: "1px solid rgba(245,197,24,.3)",
          padding: "12px 18px", backdropFilter: "blur(10px)",
        }}>
          <div className="font-display" style={{ fontSize: "1.6rem", color: "#F5C518", lineHeight: 1 }}>250+</div>
          <div className="font-head" style={{ fontSize: ".62rem", letterSpacing: ".2em", color: "#9a9a88", textTransform: "uppercase" }}>Brands Built</div>
        </div>
      </div>

      {/* Main content */}
      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 clamp(1.2rem,5vw,4rem)", position: "relative", zIndex: 2, width: "100%" }}>
        <div style={{ animation: "fadeUp .7s ease .15s both" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, border: "1px solid rgba(245,197,24,.25)", padding: "7px 16px", marginBottom: "1.6rem" }}>
            <span className="pulse-gold" style={{ width: 7, height: 7, background: "#F5C518", borderRadius: "50%", display: "inline-block", flexShrink: 0 }} />
            <span className="font-head" style={{ fontSize: "clamp(.62rem,.9vw,.72rem)", letterSpacing: ".28em", color: "#9a9a88", textTransform: "uppercase" }}>
              Marketing & Business Building
            </span>
          </div>
        </div>

        <h1 className="font-display hero-headline" style={{ fontSize: "clamp(3.8rem,11vw,9rem)", lineHeight: .9, letterSpacing: ".02em", marginBottom: "1.6rem", maxWidth: "min(680px, 100%)" }}>
          <div style={{ animation: "fadeUp .8s ease .25s both" }}>WE BUILD</div>
          <div className="shimmer-text" style={{ animation: "fadeUp .8s ease .42s both" }}>BRANDS</div>
          <div style={{ animation: "fadeUp .8s ease .58s both" }}>THAT WIN.</div>
        </h1>

        <p className="font-body hero-sub" style={{
          fontSize: "clamp(.9rem,1.6vw,1.05rem)", color: "#7a7a6a", lineHeight: 1.8,
          maxWidth: "min(460px, 100%)", marginBottom: "2.4rem", fontWeight: 300,
          animation: "fadeUp .8s ease .72s both",
        }}>
          Acarva Design is a full-service agency crafting powerful brand identities, digital strategies, and growth systems for ambitious businesses worldwide.
        </p>

        <div className="hero-ctas" style={{ display: "flex", flexWrap: "wrap", gap: 12, animation: "fadeUp .8s ease .88s both" }}>
          <button onClick={() => scrollTo("#contact")}
            className="btn-primary font-head gold-bg"
            style={{ padding: "14px clamp(22px,4vw,34px)", fontSize: ".88rem", letterSpacing: ".12em", textTransform: "uppercase", fontWeight: 700, color: "#000", border: "none", borderRadius: 2, cursor: "pointer" }}>
            Start Your Project →
          </button>
          <button onClick={() => scrollTo("#work")}
            className="btn-outline font-head"
            style={{ padding: "14px clamp(22px,4vw,34px)", fontSize: ".88rem", letterSpacing: ".12em", textTransform: "uppercase", fontWeight: 700, border: "1.5px solid rgba(245,197,24,.45)", color: "#F5C518", background: "transparent", borderRadius: 2, cursor: "pointer" }}>
            View Our Work
          </button>
        </div>

        {/* Stats row */}
        <div className="hero-stats" style={{ display: "flex", flexWrap: "wrap", gap: "clamp(1.2rem,4vw,3rem)", marginTop: "clamp(2rem,4vw,3.5rem)", animation: "fadeUp .8s ease 1.05s both" }}>
          {STATS.map(s => (
            <div key={s.label} style={{ minWidth: 0 }}>
              <div className="font-display hero-stat-num" style={{ fontSize: "clamp(1.8rem,4vw,2.5rem)", color: "#F5C518", lineHeight: 1 }}>
                <Counter target={parseInt(s.value)} suffix={s.suffix} />
              </div>
              <div className="font-head" style={{ fontSize: ".62rem", color: "#5a5a52", letterSpacing: ".22em", textTransform: "uppercase", marginTop: 4 }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator hide-mobile" style={{ position: "absolute", bottom: 36, left: "50%", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, transform: "translateX(-50%)" }}>
        <div className="font-head" style={{ fontSize: ".6rem", letterSpacing: ".3em", color: "#3a3a33", textTransform: "uppercase" }}>Scroll</div>
        <div style={{ width: 1, height: 44, background: "linear-gradient(to bottom, #F5C518, transparent)" }} />
      </div>
    </section>
  );
}