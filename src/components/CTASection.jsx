import { useState } from "react";
import { Reveal, SectionLabel } from "./UI";
import { SERVICES } from "../data/Constants";

export default function CTASection() {
  const [status, setStatus] = useState("IDLE"); // IDLE, SENDING, SUCCESS, ERROR

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("SENDING");

    const formData = new FormData(e.target);
    // Add your Web3Forms Access Key here
    formData.append("access_key", "ce390111-82c4-448d-981f-15a0ede76997"); 

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setStatus("SUCCESS");
        e.target.reset(); // Clear form
      } else {
        setStatus("ERROR");
      }
    } catch (error) {
      setStatus("ERROR");
    }
  };

  return (
    <section className="section-pad" style={{ padding: "clamp(4rem,8vw,7rem) clamp(1.2rem,5vw,4rem)", background: "#060606", position: "relative", overflow: "hidden", borderTop: "1px solid rgba(245,197,24,.08)" }}>
      <div className="grid-pattern" style={{ position: "absolute", inset: 0 }} />
      
      <div className="cta-grid" style={{ maxWidth: 1240, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,400px),1fr))", gap: "3rem", alignItems: "center", position: "relative", zIndex: 2 }}>
        <Reveal anim="fadeLeft">
          <SectionLabel>Ready to Grow?</SectionLabel>
          <h2 className="font-display section-h2" style={{ fontSize: "clamp(2.6rem,7vw,5.5rem)", lineHeight: .92, letterSpacing: ".02em", marginBottom: "1.4rem" }}>
            LET'S BUILD<br /><span className="shimmer-text">SOMETHING</span><br />EXTRAORDINARY.
          </h2>
          <p className="font-body" style={{ fontSize: ".92rem", color: "#6b6b60", fontWeight: 300, lineHeight: 1.8, maxWidth: 400 }}>
            Schedule a free 30-minute strategy call. We'll audit your brand and identify your biggest growth levers.
          </p>
        </Reveal>

        <Reveal anim="fadeRight" delay={0.15}>
          <form onSubmit={handleSubmit} className="cta-form-inner" style={{ background: "#0d0d0d", border: "1px solid rgba(245,197,24,.18)", padding: "clamp(1.6rem,3.5vw,2.5rem)" }}>
            <h3 className="font-head" style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1.6rem" }}>
              {status === "SUCCESS" ? "✨ We'll talk soon!" : "Get a Free Consultation"}
            </h3>

            {/* Inputs */}
            <input name="name" type="text" placeholder="Full Name" required style={inputStyle} />
            <input name="email" type="email" placeholder="Email Address" required style={inputStyle} />
            <input name="phone" type="tel" placeholder="Phone Number" required style={inputStyle} />
            <input name="company" type="text" placeholder="Business / Company" style={inputStyle} />
            
            <select name="service" required style={{ ...inputStyle, appearance: "none" }}>
              <option value="">Service Interested In</option>
              {SERVICES.map(s => <option key={s.title} value={s.title}>{s.title}</option>)}
            </select>

            <button 
              type="submit" 
              disabled={status === "SENDING"}
              className="btn-primary font-head gold-bg"
              style={{ 
                width: "100%", padding: "14px", fontSize: ".85rem", letterSpacing: ".14em", 
                textTransform: "uppercase", fontWeight: 700, color: "#000", border: "none", 
                borderRadius: 2, cursor: "pointer", transition: "0.3s",
                opacity: status === "SENDING" ? 0.6 : 1
              }}>
              {status === "SENDING" ? "Sending..." : "Book Free Call →"}
            </button>

            {status === "ERROR" && (
              <p style={{ color: "#ff4d4d", fontSize: "0.8rem", marginTop: "10px", textAlign: "center" }}>
                Something went wrong. Please try again.
              </p>
            )}

            <p className="font-body" style={{ fontSize: ".72rem", color: "#3a3a33", textAlign: "center", marginTop: ".9rem", fontWeight: 300 }}>
              No spam. 100% free. We'll get back within 24 hours.
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

const inputStyle = { display: "block", width: "100%", marginBottom: 10, background: "#111", border: "1px solid rgba(245,197,24,.15)", padding: "12px 14px", color: "#ede8de", fontSize: ".88rem", fontWeight: 300, outline: "none", fontFamily: "'DM Sans',sans-serif" };