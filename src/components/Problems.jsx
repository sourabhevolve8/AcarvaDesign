import { Reveal, SectionLabel } from "./UI";

const PROBLEMS = [
  {
    icon: "💡",
    title: "You have a great idea, but it doesn't feel real yet",
    desc: "Without a visual identity, your startup lacks the credibility to make a strong first impression on users or investors.",
  },
  {
    icon: "🤝",
    title: "Your brand doesn't build trust with users or investors",
    desc: "People make decisions in seconds. A weak brand signals risk — and both users and investors walk away.",
  },
  {
    icon: "📦",
    title: "Your product exists, but no one remembers it",
    desc: "In a crowded market, forgettable brands lose to memorable ones — every time, regardless of the product quality.",
  },
];

export default function Problems() {
  return (
    <section
      id="problems"
      className="section-pad"
      style={{
        padding: "clamp(4rem,8vw,7rem) clamp(1.2rem,5vw,4rem)",
        background: "#070707",
        borderTop: "1px solid rgba(245,197,24,.08)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle background glow */}
      <div style={{
        position: "absolute",
        top: "40%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        width: "60vw",
        height: "40vw",
        background: "radial-gradient(ellipse, rgba(245,197,24,.03) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1240, margin: "0 auto", position: "relative", zIndex: 2 }}>
        {/* Header */}
        <Reveal>
          <SectionLabel>The Real Problem</SectionLabel>
          <h2
            className="font-display section-h2"
            style={{
              fontSize: "clamp(2.2rem,5.5vw,4.2rem)",
              lineHeight: .95,
              letterSpacing: ".02em",
              marginBottom: "clamp(2.5rem,5vw,4rem)",
              maxWidth: 720,
            }}
          >
            Most startups fail to stand out —{" "}
            <span style={{ color: "#F5C518" }}>not because of the idea,</span>{" "}
            but the brand.
          </h2>
        </Reveal>

        {/* Problem cards grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%,300px), 1fr))",
          gap: "clamp(1rem,2.5vw,1.6rem)",
          marginBottom: "clamp(2.5rem,5vw,4rem)",
        }}>
          {PROBLEMS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.1}>
              <div
                style={{
                  background: "#0d0d0d",
                  border: "1px solid rgba(245,197,24,.1)",
                  padding: "clamp(1.4rem,3vw,2rem)",
                  height: "100%",
                  transition: "border-color .3s, transform .3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(245,197,24,.3)";
                  e.currentTarget.style.transform = "translateY(-3px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(245,197,24,.1)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {/* Icon square */}
                <div style={{
                  width: 52,
                  height: 52,
                  background: "rgba(245,197,24,.08)",
                  border: "1px solid rgba(245,197,24,.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.5rem",
                  marginBottom: "1.2rem",
                  borderRadius: 2,
                  flexShrink: 0,
                }}>
                  {p.icon}
                </div>

                <h3
                  className="font-head"
                  style={{
                    fontSize: "clamp(.88rem,1.4vw,.96rem)",
                    color: "#ede8de",
                    letterSpacing: ".04em",
                    lineHeight: 1.45,
                    marginBottom: ".75rem",
                    fontWeight: 700,
                  }}
                >
                  {p.title}
                </h3>

                <p
                  className="font-body"
                  style={{
                    fontSize: ".86rem",
                    color: "#6b6b60",
                    lineHeight: 1.75,
                    fontWeight: 300,
                    margin: 0,
                  }}
                >
                  {p.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Closing line */}
        <Reveal delay={0.3}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "clamp(1rem,3vw,2rem)",
            padding: "clamp(1.4rem,3vw,2rem) clamp(1.6rem,4vw,2.8rem)",
            background: "rgba(245,197,24,.04)",
            border: "1px solid rgba(245,197,24,.2)",
            borderLeft: "4px solid #F5C518",
          }}>
            <div>
              <span
                className="font-display"
                style={{
                  fontSize: "clamp(1.3rem,3.5vw,2.2rem)",
                  color: "#ede8de",
                  letterSpacing: ".02em",
                  display: "block",
                  lineHeight: 1.1,
                }}
              >
                That's where{" "}
                <span className="shimmer-text">Acarva</span>
                {" "}comes in.
              </span>
              <p
                className="font-body"
                style={{
                  fontSize: ".88rem",
                  color: "#6b6b60",
                  fontWeight: 300,
                  marginTop: ".5rem",
                  margin: ".5rem 0 0",
                }}
              >
                We turn raw ideas into brands that look real, feel premium, and attract the right people.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}