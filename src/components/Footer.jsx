import { Reveal } from "./UI";
import { Logo } from "./UI";
import { SERVICES } from "../data/Constants";

export default function Footer() {
  return (
    <section id="contact" className="section-pad" style={{ padding: "clamp(3.5rem,7vw,5.5rem) clamp(1.2rem,5vw,4rem)", background: "#080808", borderTop: "1px solid rgba(245,197,24,.08)" }}>
      <div style={{ maxWidth: 1240, margin: "0 auto" }}>
        <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,220px),1fr))", gap: "2.5rem" }}>
          
          {/* Brand column */}
          <div className="footer-brand" style={{ gridColumn: "span 1" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1.6rem" }}>
              <Logo size={36} />
              <div>
                <div className="font-display" style={{ fontSize: "1.2rem", letterSpacing: ".14em", color: "#fff" }}>ACARVA</div>
                <div className="font-head" style={{ fontSize: ".56rem", letterSpacing: ".4em", color: "#F5C518", fontWeight: 700 }}>DESIGN</div>
              </div>
            </div>
            <p className="font-body" style={{ fontSize: ".86rem", color: "#6b6b60", lineHeight: 1.8, maxWidth: 280, marginBottom: "1.6rem", fontWeight: 300 }}>
              A full-service marketing and business building company. We craft brands, drive growth, and build lasting legacies.
            </p>

            {/* Contact info */}
            {[
              { icon: "◎", label: "hello@acarvadesign.com" },
              { icon: "◉", label: "+1 (888) 422-7826"      },
              { icon: "◈", label: "New York · London · Dubai" },
            ].map(c => (
              <div key={c.label} style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: ".85rem" }}>
                <span style={{ color: "#F5C518", fontSize: ".95rem", flexShrink: 0 }}>{c.icon}</span>
                <span className="font-body" style={{ fontSize: ".84rem", color: "#7a7a6a", fontWeight: 300 }}>{c.label}</span>
              </div>
            ))}

            {/* Social icons */}
            <div style={{ display: "flex", gap: 8, marginTop: "1.5rem", flexWrap: "wrap" }}>
              {["LI", "TW", "IG", "YT"].map(s => (
                <div key={s}
                  style={{ width: 36, height: 36, border: "1px solid rgba(245,197,24,.18)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all .25s" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "#F5C518"; e.currentTarget.style.borderColor = "#F5C518"; e.currentTarget.querySelector("span").style.color = "#000"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(245,197,24,.18)"; e.currentTarget.querySelector("span").style.color = "#6b6b60"; }}>
                  <span className="font-head" style={{ fontSize: ".62rem", fontWeight: 700, color: "#6b6b60", transition: "color .25s" }}>{s}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {[
            { head: "Services",  items: SERVICES.map(s => s.title) },
            { head: "Company",   items: ["About Us","Our Work","Blog","Careers","Press"] },
            { head: "Resources", items: ["Case Studies","Brand Guides","Blog","FAQ","Privacy Policy"] },
          ].map(col => (
            <Reveal key={col.head} delay={0.1}>
              <h4 className="font-head" style={{ fontSize: ".68rem", letterSpacing: ".28em", textTransform: "uppercase", fontWeight: 700, color: "#F5C518", marginBottom: "1.2rem" }}>{col.head}</h4>
              {col.items.map(item => (
                <div key={item} style={{ marginBottom: ".65rem" }}>
                  <a href="#" className="font-body"
                    style={{ fontSize: ".84rem", color: "#5a5a52", fontWeight: 300, transition: "color .25s", textDecoration: "none" }}
                    onMouseEnter={e => e.target.style.color = "#ede8de"}
                    onMouseLeave={e => e.target.style.color = "#5a5a52"}>
                    {item}
                  </a>
                </div>
              ))}
            </Reveal>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom" style={{ borderTop: "1px solid rgba(245,197,24,.08)", marginTop: "2.5rem", paddingTop: "1.6rem", display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: ".8rem", alignItems: "center" }}>
          <span className="font-body" style={{ fontSize: ".75rem", color: "#3a3a33", fontWeight: 300 }}>
            © {new Date().getFullYear()} Acarva Design. All rights reserved.
          </span>
          <div className="footer-links" style={{ display: "flex", gap: "1.4rem" }}>
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(l => (
              <a key={l} href="#" className="font-body"
                style={{ fontSize: ".75rem", color: "#3a3a33", fontWeight: 300, transition: "color .25s", textDecoration: "none" }}
                onMouseEnter={e => e.target.style.color = "#F5C518"}
                onMouseLeave={e => e.target.style.color = "#3a3a33"}>
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}