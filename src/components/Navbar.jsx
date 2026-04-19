import { useState, useRef } from "react";
import { Logo } from "./UI";
import {
  Palette, Monitor, Presentation,
  FileText, Video, BookOpen, Mail
} from "lucide-react";

const SERVICES_MENU = {
  heading: "Built for early-stage growth",
  items: [
    { title: "1. Startup Branding",          subtitle: "Build your identity from scratch",  icon: <Palette size={22} />,      href: "#services" },
    { title: "2. MVP Website Design",         subtitle: "Launch fast, look premium",         icon: <Monitor size={22} />,      href: "#services" },
    { title: "3. Pitch Deck & Business Plan", subtitle: "Impress investors & raise capital", icon: <Presentation size={22} />, href: "#services" },
  ],
};

const RESOURCES_MENU = {
  heading: "Learn & Grow",
  items: [
    { label: "Blogs",      desc: "Technical articles & deep dives.",  icon: <FileText size={22} />, tab: "blog"    },
    { label: "Webinars",   desc: "Live masterclasses & workshops.",    icon: <Video size={22} />,    tab: "webinar" },
    { label: "Guides",     desc: "Step-by-step brand playbooks.",      icon: <BookOpen size={22} />, tab: "guide"   },
    { label: "Newsletter", desc: "Get weekly insights in your inbox.", icon: <Mail size={22} />,     tab: "newsletter" },
  ],
};

const SIMPLE_LINKS = [
  { label: "Case Studies", href: "#work"  },
  { label: "About",        href: "#about" },
];

export default function Navbar({ menuOpen, setMenuOpen, scrollTo, onGoHome, onGoResources }) {
  const [activeMenu, setActiveMenu]           = useState(null);
  const [mobileMenuState, setMobileMenuState] = useState({ services: false, resources: false });
  const leaveTimer                            = useRef(null);
  // Track whether a dropdown item was just clicked so we suppress the
  // parent-button's onClick that fires right after onMouseDown.
  const dropdownClickedRef                    = useRef(false);

  const clearLeave = () => clearTimeout(leaveTimer.current);

  const toggleMobileMenu = (menu) =>
    setMobileMenuState((prev) => ({ ...prev, [menu]: !prev[menu] }));

  // Navigate to resources page with a specific tab, or scroll to newsletter
  const handleResourceNav = (tab) => {
    setActiveMenu(null);
    setMenuOpen(false);
    if (tab === "newsletter") {
      scrollTo("#newsletter");
    } else {
      if (onGoResources) onGoResources(tab);
    }
  };

  // Dropdown item clicks — use onMouseDown so they fire before the panel
  // closes, then mark the flag so the parent button's onClick is skipped.
  const handleServiceItemMouseDown = (href) => {
    dropdownClickedRef.current = true;
    setActiveMenu(null);
    setMenuOpen(false);
    scrollTo(href);
  };

  const handleResourceItemMouseDown = (item) => {
    dropdownClickedRef.current = true;
    setActiveMenu(null);
    setMenuOpen(false);
    if (item.tab === "newsletter") {
      scrollTo("#newsletter");
    } else if (item.tab) {
      if (onGoResources) onGoResources(item.tab);
    }
  };

  // Parent nav-button clicks — only act if no dropdown item was just clicked
  const handleServicesButtonClick = () => {
    if (dropdownClickedRef.current) { dropdownClickedRef.current = false; return; }
    setActiveMenu(null);
    scrollTo("#services");
  };

  const handleResourcesButtonClick = () => {
    if (dropdownClickedRef.current) { dropdownClickedRef.current = false; return; }
    setActiveMenu(null);
    if (onGoResources) onGoResources("all");
  };

  // Debounced hover — 150 ms grace so dropdown stays open on cursor transit
  const onEnter = (menu) => {
    clearLeave();
    setActiveMenu(menu);
  };

  const onLeave = () => {
    leaveTimer.current = setTimeout(() => setActiveMenu(null), 150);
  };

  return (
    <>
      <style>{`
        .nav-btn {
          display: flex; align-items: center; gap: 5px;
          height: 100%; padding: 0;
          font-size: .76rem; letter-spacing: .14em; text-transform: uppercase;
          font-weight: 600; font-family: inherit;
          background: none; border: none; cursor: pointer;
          color: #9a9a88; position: relative;
          transition: color .2s ease;
        }
        .nav-btn::after {
          content: ''; position: absolute; bottom: 0; left: 0;
          width: 0; height: 2px; background: #F5C518;
          transition: width .25s ease;
        }
        .nav-btn:hover, .nav-btn.active { color: #F5C518; }
        .nav-btn:hover::after, .nav-btn.active::after { width: 100%; }

        .dd-link {
          display: flex; align-items: flex-start; gap: 1rem;
          text-decoration: none; padding: .85rem 1rem; border-radius: 6px;
          transition: background .18s ease;
          cursor: pointer; background: none; border: none; text-align: left; width: 100%;
        }
        .dd-link:hover { background: rgba(245,197,24,.06); }
        .dd-link:hover .dd-title { color: #F5C518 !important; }

        .dd-icon {
          display: flex; align-items: center; justify-content: center;
          width: 44px; height: 44px; border-radius: 6px;
          background: rgba(245,197,24,.1); color: #F5C518; flex-shrink: 0;
          transition: background .18s;
        }
        .dd-link:hover .dd-icon { background: rgba(245,197,24,.18); }

        .cta-outline {
          padding: 9px 20px; font-size: .74rem; letter-spacing: .12em;
          text-transform: uppercase; font-weight: 700; font-family: inherit;
          border: 1.5px solid #F5C518; color: #F5C518;
          border-radius: 2px; background: transparent; cursor: pointer;
          transition: background .2s;
        }
        .cta-outline:hover { background: rgba(245,197,24,.09); }

        .cta-filled {
          padding: 9px 20px; font-size: .74rem; letter-spacing: .12em;
          text-transform: uppercase; font-weight: 700; font-family: inherit;
          color: #000; border-radius: 2px; border: none;
          background: #F5C518; cursor: pointer;
          transition: opacity .2s;
        }
        .cta-filled:hover { opacity: .82; }

        .mob-row-btn {
          flex: 1; text-align: left; padding: 16px 0;
          font-size: .9rem; letter-spacing: .14em; text-transform: uppercase;
          font-weight: 700; font-family: inherit;
          background: none; border: none; cursor: pointer;
          transition: color .2s;
        }
        .mob-chevron-btn {
          padding: 16px 0 16px 14px;
          background: none; border: none; cursor: pointer;
          transition: color .2s;
        }
        .mob-acc-body {
          overflow: hidden;
          transition: max-height .35s cubic-bezier(0.4,0,0.2,1), opacity .25s ease;
        }

        @media (max-width: 768px) { .desk { display: none !important; } }
        @media (min-width: 769px) { .mob  { display: none !important; } }
      `}</style>

      {/* ── Fixed navbar ── */}
      <div
        onMouseLeave={onLeave}
        onMouseEnter={clearLeave}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, width: "100%",
          zIndex: 1000,
          background: "rgba(6,6,6,0.98)",
          backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(245,197,24,0.13)",
        }}
      >
        <nav style={{
          maxWidth: 1240, margin: "0 auto",
          padding: "0 clamp(1rem,3vw,2.5rem)",
          height: 72,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          position: "relative",
        }}>

          {/* Brand */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); onGoHome ? onGoHome() : window.scrollTo({ top: 0, behavior: "smooth" }); }}
            style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", zIndex: 10, flexShrink: 0 }}
          >
            <Logo size={36} />
            <div>
              <div className="font-display" style={{ fontSize: "1.25rem", letterSpacing: ".12em", color: "#fff", lineHeight: 1 }}>ACARVA</div>
              <div className="font-head" style={{ fontSize: ".56rem", letterSpacing: ".38em", color: "#F5C518", fontWeight: 700, marginTop: 2 }}>DESIGN</div>
            </div>
          </a>

          {/* ── Desktop links ── */}
          <div className="desk" style={{ display: "flex", alignItems: "center", gap: "2rem", height: "100%" }}>

            {/* Services */}
            <button
              className={`nav-btn font-head${activeMenu === "services" ? " active" : ""}`}
              onMouseEnter={() => onEnter("services")}
              onClick={handleServicesButtonClick}
            >
              Services
              <span style={{
                fontSize: ".58rem", display: "inline-block", marginTop: 1,
                transform: activeMenu === "services" ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform .28s cubic-bezier(0.4,0,0.2,1)",
              }}>▼</span>
            </button>

            {/* Resources */}
            <button
              className={`nav-btn font-head${activeMenu === "resources" ? " active" : ""}`}
              onMouseEnter={() => onEnter("resources")}
              onClick={handleResourcesButtonClick}
            >
              Resources
              <span style={{
                fontSize: ".58rem", display: "inline-block", marginTop: 1,
                transform: activeMenu === "resources" ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform .28s cubic-bezier(0.4,0,0.2,1)",
              }}>▼</span>
            </button>

            {SIMPLE_LINKS.map((l) => (
              <button
                key={l.label}
                className="nav-btn font-head"
                onMouseEnter={() => onEnter(null)}
                onClick={() => scrollTo(l.href)}
              >
                {l.label}
              </button>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="desk" style={{ display: "flex", gap: 10, alignItems: "center", zIndex: 10, flexShrink: 0 }}>
            <button onClick={() => scrollTo("#contact")} className="cta-outline font-head">Let's Talk →</button>
            <button onClick={() => scrollTo("#contact")} className="cta-filled font-head">Schedule a Call</button>
          </div>

          {/* Hamburger */}
          <button
            className="mob font-display"
            onClick={() => setMenuOpen((p) => !p)}
            style={{ fontSize: "1.5rem", color: "#F5C518", background: "none", border: "none", cursor: "pointer", lineHeight: 1, padding: "4px 8px" }}
          >
            {menuOpen ? "✕" : "≡"}
          </button>

          {/* ── Mega dropdown panel ── */}
          <div
            onMouseEnter={clearLeave}
            style={{
              position: "absolute", top: "calc(100% + 1px)", left: 0, width: "100%",
              background: "rgba(8,8,8,0.99)",
              borderBottom: "1px solid rgba(245,197,24,0.13)",
              maxHeight: activeMenu ? "360px" : "0px",
              opacity: activeMenu ? 1 : 0,
              transform: activeMenu ? "translateY(0)" : "translateY(-6px)",
              overflow: "hidden",
              transition: "max-height .38s cubic-bezier(0.4,0,0.2,1), opacity .28s ease, transform .28s ease",
              boxShadow: activeMenu ? "0 28px 52px rgba(0,0,0,.75)" : "none",
              pointerEvents: activeMenu ? "auto" : "none",
              zIndex: 997,
            }}
          >
            <div style={{ maxWidth: 1240, margin: "0 auto", padding: "2rem clamp(1rem,3vw,2.5rem)" }}>

              {/* Services content */}
              <div style={{
                position: "absolute",
                opacity: activeMenu === "services" ? 1 : 0,
                transform: activeMenu === "services" ? "translateY(0)" : "translateY(6px)",
                transition: "opacity .22s ease .08s, transform .22s ease .08s",
                pointerEvents: activeMenu === "services" ? "auto" : "none",
                visibility: activeMenu === "services" ? "visible" : "hidden",
                width: "calc(100% - clamp(2rem,6vw,5rem))",
              }}>
                <p className="font-head" style={{ color: "#F5C518", fontSize: ".75rem", letterSpacing: ".24em", textTransform: "uppercase", marginBottom: "1.4rem" }}>
                  {SERVICES_MENU.heading}
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.5rem" }}>
                  {SERVICES_MENU.items.map((item, idx) => (
                    <button
                      key={idx}
                      className="dd-link"
                      onMouseDown={() => handleServiceItemMouseDown(item.href)}
                    >
                      <div className="dd-icon">{item.icon}</div>
                      <div>
                        <h4 className="dd-title font-head" style={{ margin: "0 0 4px", fontSize: ".88rem", color: "#fff", textTransform: "uppercase", letterSpacing: ".04em", transition: "color .18s" }}>{item.title}</h4>
                        <p style={{ margin: 0, fontSize: ".8rem", color: "#6a6a5a", lineHeight: 1.55 }}>{item.subtitle}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Resources content */}
              <div style={{
                position: "absolute",
                opacity: activeMenu === "resources" ? 1 : 0,
                transform: activeMenu === "resources" ? "translateY(0)" : "translateY(6px)",
                transition: "opacity .22s ease .08s, transform .22s ease .08s",
                pointerEvents: activeMenu === "resources" ? "auto" : "none",
                visibility: activeMenu === "resources" ? "visible" : "hidden",
                width: "calc(100% - clamp(2rem,6vw,5rem))",
              }}>
                <p className="font-head" style={{ color: "#F5C518", fontSize: ".75rem", letterSpacing: ".24em", textTransform: "uppercase", marginBottom: "1.4rem" }}>
                  {RESOURCES_MENU.heading}
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1rem" }}>
                  {RESOURCES_MENU.items.map((item, idx) => (
                    <button
                      key={idx}
                      className="dd-link"
                      onMouseDown={() => handleResourceItemMouseDown(item)}
                    >
                      <div className="dd-icon">{item.icon}</div>
                      <div>
                        <h4 className="dd-title font-head" style={{ margin: "0 0 4px", fontSize: ".83rem", letterSpacing: ".06em", color: "#fff", textTransform: "uppercase", transition: "color .18s" }}>{item.label}</h4>
                        <p style={{ margin: 0, fontSize: ".78rem", color: "#6a6a5a", lineHeight: 1.5 }}>{item.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Spacer so panel has height while content is absolute-positioned */}
              <div style={{ height: activeMenu === "services" ? "140px" : "160px", transition: "height .28s ease" }} />
            </div>
          </div>
        </nav>
      </div>

      {/* ── Mobile menu ── */}
      <div
        className="mob"
        style={{
          position: "fixed", top: 72, left: 0, width: "100%",
          zIndex: 999,
          background: "rgba(8,8,8,0.99)",
          borderBottom: menuOpen ? "1px solid rgba(245,197,24,.13)" : "none",
          padding: menuOpen ? "1.5rem 1.5rem 2rem" : "0 1.5rem",
          maxHeight: menuOpen ? "calc(100vh - 72px)" : 0,
          overflowY: "auto", overflowX: "hidden",
          opacity: menuOpen ? 1 : 0,
          visibility: menuOpen ? "visible" : "hidden",
          transition: "max-height .4s cubic-bezier(0.4,0,0.2,1), opacity .3s ease, padding .4s cubic-bezier(0.4,0,0.2,1), visibility .3s",
        }}
      >
        {/* Mobile: Services */}
        <div style={{ borderBottom: "1px solid rgba(255,255,255,.06)" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <button
              className="mob-row-btn font-head"
              style={{ color: mobileMenuState.services ? "#F5C518" : "#9a9a88" }}
              onClick={() => { scrollTo("#services"); setMenuOpen(false); }}
            >
              Services
            </button>
            <button
              className="mob-chevron-btn"
              style={{ color: mobileMenuState.services ? "#F5C518" : "#5a5a52" }}
              onClick={() => toggleMobileMenu("services")}
            >
              <span style={{
                fontSize: ".58rem", display: "inline-block",
                transform: mobileMenuState.services ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform .3s cubic-bezier(0.4,0,0.2,1)",
              }}>▼</span>
            </button>
          </div>
          <div
            className="mob-acc-body"
            style={{ maxHeight: mobileMenuState.services ? 600 : 0, opacity: mobileMenuState.services ? 1 : 0 }}
          >
            <div style={{ paddingBottom: 10 }}>
              {SERVICES_MENU.items.map((item) => (
                <button
                  key={item.title}
                  className="dd-link"
                  onClick={() => { scrollTo(item.href); setMenuOpen(false); }}
                  style={{ padding: "11px 0" }}
                >
                  <div style={{ width: 38, height: 38, borderRadius: 6, background: "rgba(245,197,24,.09)", color: "#F5C518", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {item.icon}
                  </div>
                  <div>
                    <span className="font-head" style={{ display: "block", fontSize: ".82rem", letterSpacing: ".1em", textTransform: "uppercase", color: "#ddd" }}>{item.title}</span>
                    <span style={{ fontSize: ".75rem", color: "#5a5a52" }}>{item.subtitle}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile: Resources */}
        <div style={{ borderBottom: "1px solid rgba(255,255,255,.06)" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <button
              className="mob-row-btn font-head"
              style={{ color: mobileMenuState.resources ? "#F5C518" : "#9a9a88" }}
              onClick={() => { if (onGoResources) onGoResources("all"); setMenuOpen(false); }}
            >
              Resources
            </button>
            <button
              className="mob-chevron-btn"
              style={{ color: mobileMenuState.resources ? "#F5C518" : "#5a5a52" }}
              onClick={() => toggleMobileMenu("resources")}
            >
              <span style={{
                fontSize: ".58rem", display: "inline-block",
                transform: mobileMenuState.resources ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform .3s cubic-bezier(0.4,0,0.2,1)",
              }}>▼</span>
            </button>
          </div>
          <div
            className="mob-acc-body"
            style={{ maxHeight: mobileMenuState.resources ? 500 : 0, opacity: mobileMenuState.resources ? 1 : 0 }}
          >
            <div style={{ paddingBottom: 10 }}>
              {RESOURCES_MENU.items.map((item) => (
                <button
                  key={item.label}
                  className="dd-link"
                  onClick={() => {
                    if (item.tab === "newsletter") {
                      scrollTo("#newsletter");
                    } else if (item.tab && onGoResources) {
                      onGoResources(item.tab);
                    }
                    setMenuOpen(false);
                  }}
                  style={{ padding: "11px 0" }}
                >
                  <div style={{ width: 38, height: 38, borderRadius: 6, background: "rgba(245,197,24,.09)", color: "#F5C518", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {item.icon}
                  </div>
                  <div>
                    <span className="font-head" style={{ display: "block", fontSize: ".82rem", letterSpacing: ".1em", textTransform: "uppercase", color: "#ddd" }}>{item.label}</span>
                    <span style={{ fontSize: ".75rem", color: "#5a5a52" }}>{item.desc}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Simple links */}
        {SIMPLE_LINKS.map((l) => (
          <button
            key={l.label}
            onClick={() => { scrollTo(l.href); setMenuOpen(false); }}
            className="font-head"
            style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", textAlign: "left", padding: "16px 0", fontSize: ".9rem", letterSpacing: ".14em", textTransform: "uppercase", fontWeight: 700, color: "#9a9a88", background: "none", border: "none", borderBottom: "1px solid rgba(255,255,255,.06)", cursor: "pointer", fontFamily: "inherit", transition: "color .2s" }}
            onMouseEnter={e => e.currentTarget.style.color = "#F5C518"}
            onMouseLeave={e => e.currentTarget.style.color = "#9a9a88"}
          >
            {l.label}
            <span style={{ fontSize: ".65rem", color: "#3a3a33" }}>→</span>
          </button>
        ))}

        {/* Mobile CTAs */}
        <div style={{ display: "flex", gap: 10, marginTop: "2rem" }}>
          <button
            onClick={() => { scrollTo("#contact"); setMenuOpen(false); }}
            style={{ flex: 1, padding: "13px", fontSize: ".78rem", letterSpacing: ".12em", textTransform: "uppercase", fontWeight: 700, fontFamily: "inherit", border: "1.5px solid #F5C518", color: "#F5C518", borderRadius: 2, background: "transparent", cursor: "pointer" }}
          >
            Let's Talk
          </button>
          <button
            onClick={() => { scrollTo("#contact"); setMenuOpen(false); }}
            style={{ flex: 1, padding: "13px", fontSize: ".78rem", letterSpacing: ".12em", textTransform: "uppercase", fontWeight: 700, fontFamily: "inherit", color: "#000", borderRadius: 2, border: "none", background: "#F5C518", cursor: "pointer" }}
          >
            Schedule a Call
          </button>
        </div>
      </div>
    </>
  );
}