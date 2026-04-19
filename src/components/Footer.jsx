import { Reveal } from "./UI";
import { Logo } from "./UI";
import { SERVICES } from "../data/Constants";

export default function Footer() {
  return (
    <section
      id="contact"
      className="section-pad"
      style={{
        padding: "clamp(3.5rem,7vw,5.5rem) clamp(1.2rem,5vw,4rem)",
        background: "#080808",
        borderTop: "1px solid rgba(245,197,24,.08)",
      }}
    >
      <div style={{ maxWidth: 1240, margin: "0 auto" }}>
        <div
          className="footer-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%,200px), 1fr))",
            gap: "clamp(2rem,4vw,4rem)",
          }}
        >
          {/* Brand column */}
          <div style={{ maxWidth: 320 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1.5rem" }}>
              <Logo size={34} />
              <div>
                <div className="font-display" style={{ fontSize: "1.15rem", letterSpacing: ".14em", color: "#fff" }}>ACARVA</div>
                <div className="font-head" style={{ fontSize: ".54rem", letterSpacing: ".4em", color: "#F5C518", fontWeight: 700 }}>DESIGN</div>
              </div>
            </div>

            <p className="font-body" style={{ fontSize: ".85rem", color: "#6b6b60", lineHeight: 1.8, marginBottom: "1.5rem", fontWeight: 300 }}>
              Built For Founders Starting From Zero
            </p>

            {/* Contact info */}
            {[
              { icon: "◎", label: "acarvadesigns@gmail.com" },
              { icon: "◈", label: "1609, The Bay Gate — Business Bay, Dubai" },
              { icon: "◉", label: "Acarva Designs FZ LLC" },
            ].map((c) => (
              <div key={c.label} style={{ display: "flex", alignItems: "flex-start", gap: 11, marginBottom: ".9rem" }}>
                <span style={{ color: "#F5C518", fontSize: ".9rem", flexShrink: 0, marginTop: 2 }}>{c.icon}</span>
                <span className="font-body" style={{ fontSize: ".82rem", color: "#7a7a6a", fontWeight: 300, lineHeight: 1.6 }}>{c.label}</span>
              </div>
            ))}

            {/* Social icons */}
            <div style={{ display: "flex", gap: 10, marginTop: "1.5rem", flexWrap: "wrap" }}>
              {["LI", "TW", "IG", "YT"].map((s) => (
                <div
                  key={s}
                  style={{
                    width: 36,
                    height: 36,
                    border: "1px solid rgba(245,197,24,.18)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    transition: "all .25s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#F5C518";
                    e.currentTarget.style.borderColor = "#F5C518";
                    e.currentTarget.querySelector("span").style.color = "#000";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.borderColor = "rgba(245,197,24,.18)";
                    e.currentTarget.querySelector("span").style.color = "#6b6b60";
                  }}
                >
                  <span className="font-head" style={{ fontSize: ".6rem", fontWeight: 700, color: "#6b6b60", transition: "color .25s" }}>{s}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Nav columns
          {[
            { head: "Services", items: SERVICES.map((s) => s.title) },
          ].map((col) => (
            <Reveal key={col.head} delay={0.1}>
              <h4 className="font-head" style={{ fontSize: ".66rem", letterSpacing: ".28em", textTransform: "uppercase", fontWeight: 700, color: "#F5C518", marginBottom: "1.2rem" }}>
                {col.head}
              </h4>
              {col.items.map((item) => (
                <div key={item} style={{ marginBottom: ".7rem" }}>
                  <a
                    href="#"
                    className="font-body"
                    style={{ fontSize: ".83rem", color: "#5a5a52", fontWeight: 300, transition: "color .25s", textDecoration: "none" }}
                    onMouseEnter={(e) => { e.target.style.color = "#ede8de"; }}
                    onMouseLeave={(e) => { e.target.style.color = "#5a5a52"; }}
                  >
                    {item}
                  </a>
                </div>
              ))}
            </Reveal>
          ))} */}
        </div>

        {/* Bottom bar */}
        <div
          className="footer-bottom"
          style={{
            borderTop: "1px solid rgba(245,197,24,.08)",
            marginTop: "2.5rem",
            paddingTop: "1.6rem",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: ".8rem",
            alignItems: "center",
          }}
        >
          <span className="font-body" style={{ fontSize: ".73rem", color: "#3a3a33", fontWeight: 300 }}>
            © {new Date().getFullYear()} Acarva Design. All rights reserved.
          </span>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1.4rem" }}>
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((l) => (
              <a
                key={l}
                href="#"
                className="font-body"
                style={{ fontSize: ".73rem", color: "#3a3a33", fontWeight: 300, transition: "color .25s", textDecoration: "none" }}
                onMouseEnter={(e) => { e.target.style.color = "#F5C518"; }}
                onMouseLeave={(e) => { e.target.style.color = "#3a3a33"; }}
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}