import { useState, useEffect, useCallback } from "react";
import GlobalStyles from "./styles/GlobalStyles";
import LoadingScreen from "./components/LoadingScreen";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import About from "./components/About";
import Work from "./components/Work";
import Process from "./components/Process";
import Team from "./components/Team";
import Testimonials from "./components/Testimonials";
import Pricing from "./components/Pricing";
import Blog from "./components/Blog";
import Newsletter from "./components/Newsletter";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";
import { CLIENTS } from "./data/Constants";

export default function AcarvaLanding() {
  const [loading, setLoading] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [tIdx, setTIdx] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.4 });

  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (loading) return;
    const t = setInterval(() => setTIdx(p => (p + 1) % 4), 5000);
    return () => clearInterval(t);
  }, [loading]);

  useEffect(() => {
    const onMove = (e) => setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const scrollTo = useCallback((href) => {
    const el = document.getElementById(href.replace("#", ""));
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  }, []);

  if (loading) {
    return (
      <div style={{ background: "#060606", minHeight: "100vh" }}>
        <GlobalStyles />
        <LoadingScreen onComplete={() => setLoading(false)} />
      </div>
    );
  }

  return (
    <div className="font-body" style={{ background: "#060606", color: "#ede8de", overflowX: "hidden" }}>
      <GlobalStyles />
      <Navbar scrollY={scrollY} menuOpen={menuOpen} setMenuOpen={setMenuOpen} scrollTo={scrollTo} />
      <Hero scrollTo={scrollTo} mousePos={mousePos} />

      {/* Client marquee */}
      <div className="marquee-mt" style={{ background: "rgba(245,197,24,.04)", borderTop: "1px solid rgba(245,197,24,.12)", borderBottom: "1px solid rgba(245,197,24,.12)", padding: "14px 0", overflow: "hidden", marginTop: "clamp(2rem,4vw,4rem)" }}>
        <div className="marquee-track">
          {CLIENTS.map((c, i) => (
            <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: "2rem", flexShrink: 0 }}>
              <span className="font-head" style={{ fontSize: ".72rem", letterSpacing: ".25em", textTransform: "uppercase", color: i % 2 === 0 ? "#F5C518" : "#4a4a42", fontWeight: 600 }}>{c}</span>
              <span style={{ color: "#F5C518", fontSize: ".6rem" }}>◆</span>
            </span>
          ))}
        </div>
      </div>

      <Services />
      <About />
      <Work scrollTo={scrollTo} />
      <Process />
      <Team />
      <Testimonials tIdx={tIdx} setTIdx={setTIdx} />
      <Pricing scrollTo={scrollTo} />
      <Blog scrollTo={scrollTo} />
      <Newsletter />
      <CTASection scrollTo={scrollTo} />
      <Footer />
    </div>
  );
}