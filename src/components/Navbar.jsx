import { Logo } from "./UI";
import { NAV_LINKS } from "../data/Constants";

export default function Navbar({ scrollY, menuOpen, setMenuOpen, scrollTo }) {
  const navBg = scrollY > 60;

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 999,
        padding: "0 clamp(1rem,4vw,3rem)",
        height: 68,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: navBg ? "rgba(6,6,6,0.96)" : "transparent",
        backdropFilter: navBg ? "blur(14px)" : "none",
        borderBottom: navBg ? "1px solid rgba(245,197,24,0.12)" : "none",
        transition: "background .4s ease, border .4s ease",
      }}>
        {/* Brand */}
        <a href="#" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <Logo size={38} />
          <div>
            <div className="font-display" style={{ fontSize: "1.3rem", letterSpacing: ".12em", color: "#fff", lineHeight: 1 }}>ACARVA</div>
            <div className="font-head" style={{ fontSize: ".58rem", letterSpacing: ".38em", color: "#F5C518", fontWeight: 700, marginTop: 1 }}>DESIGN</div>
          </div>
        </a>

        {/* Desktop nav links */}
        <div style={{ display: "flex", alignItems: "center", gap: "2rem" }} className="nav-links-desktop">
          {NAV_LINKS.map(l => (
            <button key={l.label} onClick={() => scrollTo(l.href)}
              className="nav-link font-head"
              style={{ fontSize: ".78rem", letterSpacing: ".15em", textTransform: "uppercase", color: "#9a9a88", fontWeight: 600, background: "none", border: "none", cursor: "pointer", transition: "color .25s", padding: 0 }}>
              {l.label}
            </button>
          ))}
        </div>

        {/* Desktop CTA buttons */}
        <div style={{ display: "flex", gap: 10, alignItems: "center" }} className="nav-links-desktop">
          <button onClick={() => scrollTo("#contact")}
            className="btn-outline font-head"
            style={{ padding: "8px 18px", fontSize: ".75rem", letterSpacing: ".12em", textTransform: "uppercase", fontWeight: 700, border: "1.5px solid #F5C518", color: "#F5C518", borderRadius: 2, background: "transparent", cursor: "pointer" }}>
            Contact
          </button>
          <button onClick={() => scrollTo("#pricing")}
            className="btn-primary font-head gold-bg"
            style={{ padding: "9px 20px", fontSize: ".75rem", letterSpacing: ".12em", textTransform: "uppercase", fontWeight: 700, color: "#000", borderRadius: 2, border: "none", cursor: "pointer" }}>
            Get Started
          </button>
        </div>

        {/* Hamburger */}
        <button className="mobile-only font-display" onClick={() => setMenuOpen(p => !p)}
          style={{ fontSize: "1.5rem", color: "#F5C518", background: "none", border: "none", cursor: "pointer", lineHeight: 1, padding: "4px 8px" }}>
          {menuOpen ? "✕" : "≡"}
        </button>
      </nav>

      {/* Mobile menu */}
      <div className={`mobile-only mobile-menu ${menuOpen ? "open" : "closed"}`}
        style={{ position: "fixed", top: 68, left: 0, right: 0, zIndex: 998, background: "rgba(6,6,6,.98)", borderBottom: "1px solid rgba(245,197,24,.15)", padding: menuOpen ? "1.2rem 1.4rem 1.6rem" : "0 1.4rem" }}>
        {NAV_LINKS.map((l, i) => (
          <button key={l.label} onClick={() => scrollTo(l.href)}
            className="font-head"
            style={{ display: "block", width: "100%", textAlign: "left", padding: "13px 0", fontSize: ".95rem", letterSpacing: ".15em", textTransform: "uppercase", fontWeight: 700, color: "#9a9a88", background: "none", border: "none", borderBottom: i < NAV_LINKS.length - 1 ? "1px solid rgba(255,255,255,.05)" : "none", cursor: "pointer" }}>
            {l.label}
          </button>
        ))}
        <div style={{ display: "flex", gap: 10, marginTop: "1.2rem" }}>
          <button onClick={() => scrollTo("#contact")}
            className="btn-outline font-head"
            style={{ flex: 1, padding: "12px", fontSize: ".82rem", letterSpacing: ".12em", textTransform: "uppercase", fontWeight: 700, border: "1.5px solid #F5C518", color: "#F5C518", borderRadius: 2, background: "transparent", cursor: "pointer" }}>
            Contact
          </button>
          <button onClick={() => scrollTo("#pricing")}
            className="btn-primary font-head gold-bg"
            style={{ flex: 1, padding: "12px", fontSize: ".82rem", letterSpacing: ".12em", textTransform: "uppercase", fontWeight: 700, color: "#000", borderRadius: 2, border: "none", cursor: "pointer" }}>
            Get Started
          </button>
        </div>
      </div>
    </>
  );
}