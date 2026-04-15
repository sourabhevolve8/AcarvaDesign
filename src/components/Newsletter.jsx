import { useState } from "react";
import { Reveal, SectionLabel } from "./UI";

const PERKS = [
  { icon: "◈", title: "Weekly Strategy Drops", desc: "Actionable brand and marketing insights every Tuesday — no fluff, just frameworks." },
  { icon: "◉", title: "Exclusive Case Studies", desc: "Behind-the-scenes breakdowns of our best campaigns. Numbers included." },
  { icon: "◎", title: "Early Access & Offers", desc: "Subscribers get first access to new services, workshops, and limited agency spots." },
];

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState(null);

  const handleSubmit = () => {
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <section id="newsletter" className="section-pad" style={{
      padding: "clamp(4rem,8vw,7rem) clamp(1.2rem,5vw,4rem)",
      background: "#060606",
      position: "relative",
      overflow: "hidden",
      borderTop: "1px solid rgba(245,197,24,.08)",
    }}>
      {/* Background decoration */}
      <div className="grid-pattern" style={{ position: "absolute", inset: 0 }} />
      <div style={{
        position: "absolute",
        top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: "min(600px, 80vw)", height: "min(600px, 80vw)",
        border: "1px solid rgba(245,197,24,.04)",
        borderRadius: "50%",
        animation: "newsletterPulse 6s ease-in-out infinite",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute",
        top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: "min(400px, 60vw)", height: "min(400px, 60vw)",
        border: "1px solid rgba(245,197,24,.06)",
        borderRadius: "50%",
        animation: "newsletterPulse 6s ease-in-out 2s infinite",
        pointerEvents: "none",
      }} />

      {/* Corner accents */}
      <div style={{ position: "absolute", top: 24, left: 24, width: 36, height: 36, borderTop: "1px solid rgba(245,197,24,.2)", borderLeft: "1px solid rgba(245,197,24,.2)" }} />
      <div style={{ position: "absolute", top: 24, right: 24, width: 36, height: 36, borderTop: "1px solid rgba(245,197,24,.2)", borderRight: "1px solid rgba(245,197,24,.2)" }} />
      <div style={{ position: "absolute", bottom: 24, left: 24, width: 36, height: 36, borderBottom: "1px solid rgba(245,197,24,.2)", borderLeft: "1px solid rgba(245,197,24,.2)" }} />
      <div style={{ position: "absolute", bottom: 24, right: 24, width: 36, height: 36, borderBottom: "1px solid rgba(245,197,24,.2)", borderRight: "1px solid rgba(245,197,24,.2)" }} />

      <div style={{ maxWidth: 1240, margin: "0 auto", position: "relative", zIndex: 2 }}>
        <div className="nl-inner" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(3rem,6vw,6rem)", alignItems: "center" }}>

          {/* Left: Copy + Perks */}
          <Reveal anim="fadeLeft">
            <SectionLabel>Stay in the Loop</SectionLabel>
            <h2 className="font-display section-h2" style={{ fontSize: "clamp(2.4rem,5.5vw,4.5rem)", lineHeight: .92, letterSpacing: ".02em", marginBottom: "1rem" }}>
              GROW SMARTER.<br /><span style={{ color: "#F5C518" }}>EVERY WEEK.</span>
            </h2>
            <p className="font-body" style={{ fontSize: ".93rem", color: "#7a7a6a", lineHeight: 1.8, marginBottom: "2.2rem", fontWeight: 300, maxWidth: 420 }}>
              Join 12,000+ founders, CMOs, and growth operators who get our weekly newsletter. Strategy you can actually use — straight to your inbox.
            </p>

            {/* Perks */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
              {PERKS.map((perk, i) => (
                <Reveal key={perk.title} delay={i * 0.1}>
                  <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                    <div style={{
                      width: 40, height: 40, background: "rgba(245,197,24,.08)",
                      border: "1px solid rgba(245,197,24,.18)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0, fontSize: "1.1rem", color: "#F5C518",
                    }}>
                      {perk.icon}
                    </div>
                    <div>
                      <div className="font-head" style={{ fontSize: ".85rem", fontWeight: 700, marginBottom: ".25rem", letterSpacing: ".02em" }}>{perk.title}</div>
                      <p className="font-body" style={{ fontSize: ".82rem", color: "#6b6b60", fontWeight: 300, lineHeight: 1.6 }}>{perk.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Social proof pill */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginTop: "2rem", border: "1px solid rgba(245,197,24,.18)", padding: "8px 16px" }}>
              <div style={{ display: "flex" }}>
                {["photo-1438761681033-6461ffad8d80","photo-1506794778202-cad84cf45f1d","photo-1472099645785-5658abf4ff4e"].map((p, i) => (
                  <div key={p} style={{ width: 26, height: 26, borderRadius: "50%", overflow: "hidden", border: "2px solid #060606", marginLeft: i > 0 ? -8 : 0, flexShrink: 0 }}>
                    <img src={`https://images.unsplash.com/${p}?w=60&q=80`} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                ))}
              </div>
              <span className="font-body" style={{ fontSize: ".78rem", color: "#9a9a88", fontWeight: 300 }}>
                <span style={{ color: "#F5C518", fontWeight: 500 }}>12,000+</span> subscribers already
              </span>
            </div>
          </Reveal>

          {/* Right: Form */}
          <Reveal anim="fadeRight" delay={0.15}>
            <div style={{
              background: "#0d0d0d",
              border: "1px solid rgba(245,197,24,.18)",
              padding: "clamp(1.8rem,3.5vw,2.8rem)",
              position: "relative",
            }}>
              {/* Gold accent bar at top */}
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(to right, #F5C518, transparent)" }} />

              {submitted ? (
                /* Success state */
                <div style={{ textAlign: "center", padding: "2rem 0" }}>
                  <div style={{
                    width: 64, height: 64, background: "rgba(245,197,24,.1)",
                    border: "2px solid #F5C518", borderRadius: "50%",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 1.4rem", fontSize: "1.8rem", color: "#F5C518",
                  }}>✓</div>
                  <h3 className="font-head" style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: ".6rem" }}>
                    You're in. Welcome aboard.
                  </h3>
                  <p className="font-body" style={{ fontSize: ".87rem", color: "#6b6b60", lineHeight: 1.7, fontWeight: 300 }}>
                    Your first issue lands next Tuesday. Check your inbox — and spam just in case.
                  </p>
                  <div style={{ marginTop: "1.4rem", display: "inline-flex", alignItems: "center", gap: 8, color: "#F5C518", fontSize: ".72rem", letterSpacing: ".2em", textTransform: "uppercase", fontWeight: 600 }}>
                    <span className="font-head">✦ See you inside</span>
                  </div>
                </div>
              ) : (
                /* Form */
                <>
                  <div style={{ marginBottom: "1.6rem" }}>
                    <h3 className="font-head" style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: ".4rem" }}>
                      Get the Weekly Edge
                    </h3>
                    <p className="font-body" style={{ fontSize: ".82rem", color: "#6b6b60", fontWeight: 300 }}>
                      Free. No spam. Unsubscribe instantly.
                    </p>
                  </div>

                  {/* First name */}
                  <div style={{ marginBottom: 10 }}>
                    <input
                      type="text"
                      placeholder="First Name"
                      value={firstName}
                      onChange={e => setFirstName(e.target.value)}
                      className="font-body nl-input"
                      style={{
                        display: "block", width: "100%",
                        background: "#111", border: `1px solid ${focused === "name" ? "rgba(245,197,24,.6)" : "rgba(245,197,24,.15)"}`,
                        padding: "12px 14px", color: "#ede8de", fontSize: ".88rem", fontWeight: 300,
                        outline: "none", fontFamily: "'DM Sans',sans-serif",
                        transition: "border-color .25s",
                      }}
                      onFocus={() => setFocused("name")}
                      onBlur={() => setFocused(null)}
                    />
                  </div>

                  {/* Email + button row */}
                  <div className="nl-form-row" style={{ display: "flex", gap: 8, marginBottom: "1rem" }}>
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      onKeyDown={e => e.key === "Enter" && handleSubmit()}
                      className="font-body nl-input"
                      style={{
                        flex: 1, minWidth: 0,
                        background: "#111", border: `1px solid ${focused === "email" ? "rgba(245,197,24,.6)" : "rgba(245,197,24,.15)"}`,
                        padding: "12px 14px", color: "#ede8de", fontSize: ".88rem", fontWeight: 300,
                        outline: "none", fontFamily: "'DM Sans',sans-serif",
                        transition: "border-color .25s",
                      }}
                      onFocus={() => setFocused("email")}
                      onBlur={() => setFocused(null)}
                    />
                    <button
                      onClick={handleSubmit}
                      className="btn-primary font-head gold-bg"
                      style={{ padding: "12px 20px", fontSize: ".8rem", letterSpacing: ".12em", textTransform: "uppercase", fontWeight: 700, color: "#000", border: "none", borderRadius: 0, cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0 }}>
                      Join →
                    </button>
                  </div>

                  {/* Interest tags */}
                  <div style={{ marginBottom: "1.4rem" }}>
                    <div className="font-head" style={{ fontSize: ".65rem", letterSpacing: ".2em", textTransform: "uppercase", color: "#3a3a33", marginBottom: ".6rem" }}>
                      I'm most interested in:
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {["Brand Strategy", "Growth Marketing", "Web Design", "Business Building"].map(tag => (
                        <InterestTag key={tag} label={tag} />
                      ))}
                    </div>
                  </div>

                  {/* Trust line */}
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ color: "#F5C518", fontSize: ".7rem" }}>◆</span>
                    <span className="font-body" style={{ fontSize: ".72rem", color: "#3a3a33", fontWeight: 300 }}>
                      No spam, ever. Unsubscribe in one click.
                    </span>
                  </div>
                </>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* Interest tag toggle */
function InterestTag({ label }) {
  const [active, setActive] = useState(false);
  return (
    <button
      onClick={() => setActive(p => !p)}
      className="font-head"
      style={{
        padding: "4px 12px", fontSize: ".65rem", letterSpacing: ".15em", textTransform: "uppercase", fontWeight: 600,
        border: `1px solid ${active ? "rgba(245,197,24,.6)" : "rgba(245,197,24,.15)"}`,
        background: active ? "rgba(245,197,24,.08)" : "transparent",
        color: active ? "#F5C518" : "#4a4a42",
        cursor: "pointer", transition: "all .2s",
      }}
    >
      {active ? "✓ " : ""}{label}
    </button>
  );
}