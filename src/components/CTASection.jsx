import { useState } from "react";
import { Reveal, SectionLabel } from "./UI";
import { SERVICES } from "../data/Constants";

const url = import.meta.env.VITE_FORMSUBMIT_URL;

export default function CTASection({ scrollTo }) {
  const [status, setStatus] = useState("IDLE");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("SENDING");

    const formData = new FormData(e.target);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });

      const data = await response.json();

      if (data.success === "true" || data.success === true) {
        setStatus("SUCCESS");
        e.target.reset();
      } else {
        setStatus("ERROR");
      }
    } catch {
      setStatus("ERROR");
    }
  };

  const goContact = () => {
    if (scrollTo) scrollTo("#contact");
  };

  return (
    <section
      id="contact"
      className="section-pad"
      style={{
        padding: "clamp(4rem,8vw,7rem) clamp(1.2rem,5vw,4rem)",
        background: "#060606",
        position: "relative",
        overflow: "hidden",
        borderTop: "1px solid rgba(245,197,24,.08)",
      }}
    >
      <div className="grid-pattern" style={{ position: "absolute", inset: 0 }} />

      <div
        className="cta-grid"
        style={{
          maxWidth: 1240,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%,400px), 1fr))",
          gap: "clamp(2rem,5vw,4rem)",
          alignItems: "center",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* Left copy */}
        <Reveal anim="fadeLeft">
          <SectionLabel>👉 Built for early-stage founders</SectionLabel>
          <h2
            className="font-display section-h2"
            style={{ fontSize: "clamp(2.6rem,7vw,5.5rem)", lineHeight: .92, letterSpacing: ".02em", marginBottom: "1.4rem" }}
          >
            LET'S BUILD<br />
            <span className="shimmer-text">SOMETHING</span><br />
            EXTRAORDINARY.
          </h2>
          <p
            className="font-body"
            style={{ fontSize: ".92rem", color: "#6b6b60", fontWeight: 300, lineHeight: 1.8, maxWidth: 400 }}
          >
            We work closely with startups at the idea and early growth stage — helping them build strong foundations for scaling.
          </p>
        </Reveal>

        {/* Right form */}
        <Reveal anim="fadeRight" delay={0.15}>
          <form
            onSubmit={handleSubmit}
            className="cta-form-inner"
            style={{
              background: "#0d0d0d",
              border: "1px solid rgba(245,197,24,.18)",
              padding: "clamp(1.6rem,3.5vw,2.5rem)",
            }}
          >
            <input type="hidden" name="_subject" value="New Consultation Request — Acarva" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_template" value="table" />

            <h3 className="font-head" style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: "1.6rem" }}>
              {status === "SUCCESS" ? "✨ We'll talk soon!" : "Get a Free Consultation"}
            </h3>

            {status !== "SUCCESS" && (
              <>
                <div style={rowStyle}>
                  <input name="name" type="text" placeholder="Full Name" required style={inputStyle} />
                  <input name="email" type="email" placeholder="Email Address" required style={inputStyle} />
                </div>

                <div style={rowStyle}>
                  <input name="phone" type="tel" placeholder="Phone Number" required style={inputStyle} />
                  <input name="country" type="text" placeholder="Country" style={inputStyle} />
                </div>

                <div style={rowStyle}>
                  <input name="city" type="text" placeholder="City" style={inputStyle} />
                  <input name="business" type="text" placeholder="Business Name" style={inputStyle} />
                </div>

                <input name="brief" type="text" placeholder="Brief About Your Business" style={{ ...inputStyle, marginBottom: 12 }} />

                <div style={{ position: "relative", marginBottom: 20 }}>
                  <select
                    name="service"
                    required
                    style={{
                      ...inputStyle,
                      marginBottom: 0,
                      appearance: "none",
                      WebkitAppearance: "none",
                      paddingRight: 36,
                      cursor: "pointer",
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23F5C518' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 12px center",
                    }}
                  >
                    <option value="">Service Interested In</option>
                    {SERVICES.map((s) => (
                      <option key={s.title} value={s.title}>{s.title}</option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={status === "SENDING"}
                  className="btn-primary font-head gold-bg"
                  style={{
                    width: "100%",
                    padding: "14px",
                    fontSize: ".84rem",
                    letterSpacing: ".14em",
                    textTransform: "uppercase",
                    fontWeight: 700,
                    color: "#000",
                    border: "none",
                    borderRadius: 2,
                    cursor: status === "SENDING" ? "not-allowed" : "pointer",
                    transition: "opacity .3s",
                    opacity: status === "SENDING" ? 0.6 : 1,
                  }}
                >
                  {status === "SENDING" ? "Sending…" : "Book Free Call →"}
                </button>

                {status === "ERROR" && (
                  <p style={{ color: "#ff4d4d", fontSize: ".78rem", marginTop: 10, textAlign: "center" }}>
                    Something went wrong. Please try again.
                  </p>
                )}

                <p className="font-body" style={{ fontSize: ".7rem", color: "#3a3a33", textAlign: "center", marginTop: ".9rem", fontWeight: 300 }}>
                  No spam. 100% free. We'll get back within 24 hours.
                </p>
              </>
            )}

            {status === "SUCCESS" && (
              <p className="font-body" style={{ fontSize: ".92rem", color: "#7a7a6a", lineHeight: 1.8, fontWeight: 300 }}>
                Thanks for reaching out! We've received your details and will get back to you within 24 hours.
              </p>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}

const inputStyle = {
  display: "block",
  width: "100%",
  background: "#111",
  border: "1px solid rgba(245,197,24,.15)",
  padding: "11px 14px",
  color: "#ede8de",
  fontSize: ".86rem",
  fontWeight: 300,
  outline: "none",
  fontFamily: "'DM Sans', sans-serif",
  borderRadius: 0,
  transition: "border-color .2s",
};

const rowStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 10,
  marginBottom: 12,
};