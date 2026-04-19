import { useState, useEffect, useCallback, useRef } from "react";
import GlobalStyles from "./styles/GlobalStyles";
import LoadingScreen from "./components/LoadingScreen";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Problems from "./components/Problems";
import Services from "./components/Services";
import About from "./components/About";
import Work from "./components/Work";
import Process from "./components/Process";
import Testimonials from "./components/Testimonials";
import Newsletter from "./components/Newsletter";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";
import Resources from "./components/Resources";
import ResourceDetail from "./components/ResourceDetail";
import { CLIENTS } from "./data/Constants";

function scrollToEl(href) {
  const el = document.getElementById(href.replace("#", ""));
  if (el) {
    el.style.scrollMarginTop = "72px";
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export default function AcarvaLanding() {
  const [loading, setLoading]               = useState(true);
  const [scrollY, setScrollY]               = useState(0);
  const [menuOpen, setMenuOpen]             = useState(false);
  const [tIdx, setTIdx]                     = useState(0);
  const [mousePos, setMousePos]             = useState({ x: 0.5, y: 0.4 });
  const [view, setView]                     = useState("home");
  const [activeResource, setActiveResource] = useState(null);
  const [resourcesTab, setResourcesTab]     = useState("all");

  const viewRef = useRef(view);
  useEffect(() => { viewRef.current = view; }, [view]);

  const pendingScrollRef = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    if (pendingScrollRef.current) {
      const target = pendingScrollRef.current;
      pendingScrollRef.current = null;
      requestAnimationFrame(() => {
        setTimeout(() => scrollToEl(target), 80);
      });
    }
  }, [view]);

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
    const t = setInterval(() => setTIdx((p) => (p + 1) % 4), 5000);
    return () => clearInterval(t);
  }, [loading]);

  useEffect(() => {
    const onMove = (e) =>
      setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const scrollTo = useCallback((href) => {
    setMenuOpen(false);
    if (viewRef.current === "home") {
      scrollToEl(href);
    } else {
      pendingScrollRef.current = href;
      setView("home");
    }
  }, []);

  const goToResources = useCallback((tab = "all") => {
    setResourcesTab(tab);
    setActiveResource(null);
    setMenuOpen(false);
    setView("resources");
  }, []);

  const openResource = useCallback((item, type) => {
    setActiveResource({ item, type });
    setView("resource-detail");
  }, []);

  const backToResources = useCallback(() => {
    setActiveResource(null);
    setView("resources");
  }, []);

  const goHome = useCallback(() => {
    setActiveResource(null);
    setView("home");
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
    <div className="font-body" style={{ background: "#060606", color: "#ede8de", overflowX: "hidden", paddingTop: 42 }}>
      <GlobalStyles />

      <Navbar
        scrollY={scrollY}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        scrollTo={scrollTo}
        onGoHome={goHome}
        onGoResources={goToResources}
      />

      {view === "home" && (
        <>
          <Hero scrollTo={scrollTo} mousePos={mousePos} />
          <div className="marquee-mt" style={{ background: "rgba(245,197,24,.04)", borderTop: "1px solid rgba(245,197,24,.12)", borderBottom: "1px solid rgba(245,197,24,.12)", padding: "14px 0", overflow: "hidden" }}>
            <div className="marquee-track">
              {CLIENTS.map((c, i) => (
                <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: "2rem", flexShrink: 0 }}>
                  <span className="font-head" style={{ fontSize: ".72rem", letterSpacing: ".25em", textTransform: "uppercase", color: i % 2 === 0 ? "#F5C518" : "#4a4a42", fontWeight: 600 }}>{c}</span>
                  <span style={{ color: "#F5C518", fontSize: ".6rem" }}>◆</span>
                </span>
              ))}
            </div>
          </div>
          <Problems />
          <About />
          <Services />
          <Work scrollTo={scrollTo} />
          <Process />
          <Testimonials tIdx={tIdx} setTIdx={setTIdx} />
          <Newsletter />
          <CTASection scrollTo={scrollTo} />
          <Footer />
        </>
      )}

      {view === "resources" && (
        <>
          <Resources
            scrollTo={scrollTo}
            onOpenResource={openResource}
            initialTab={resourcesTab}
          />
          <CTASection scrollTo={scrollTo} />
          <Footer />
        </>
      )}

      {view === "resource-detail" && activeResource && (
        <>
          <ResourceDetail
            item={activeResource.item}
            type={activeResource.type}
            onBack={backToResources}
          />
          <CTASection scrollTo={scrollTo} />
          <Footer />
        </>
      )}
    </div>
  );
}