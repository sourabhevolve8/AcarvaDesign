import { useState, useEffect, useRef, useCallback } from "react";

/* ─── Inline style injector ─── */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');
    :root {
      --gold: #F5C518;
      --gold-glow: rgba(245,197,24,0.22);
      --gold-border: rgba(245,197,24,0.18);
    }
    html { scroll-behavior: smooth; }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { overflow-x: hidden; }
    ::-webkit-scrollbar { width: 3px; }
    ::-webkit-scrollbar-thumb { background: #F5C518; border-radius: 2px; }
    ::-webkit-scrollbar-track { background: #0a0a0a; }

    .font-display { font-family: 'Bebas Neue', sans-serif; }
    .font-head    { font-family: 'Syne', sans-serif; }
    .font-body    { font-family: 'DM Sans', sans-serif; }

    /* ── LOADER ANIMATIONS ── */
    @keyframes loaderFadeIn  { from { opacity:0; } to { opacity:1; } }
    @keyframes loaderFadeOut { from { opacity:1; transform:scale(1); } to { opacity:0; transform:scale(1.04); } }
    @keyframes scanLine      { 0%{ top:-100%; } 100%{ top:200%; } }
    @keyframes glitchH       { 0%,94%,100%{ transform:translateX(0) scaleX(1); clip-path:none; }
                               95%{ transform:translateX(-8px) scaleX(.98); clip-path:polygon(0 20%,100% 20%,100% 45%,0 45%); }
                               97%{ transform:translateX(6px) scaleX(1.01); clip-path:polygon(0 55%,100% 55%,100% 80%,0 80%); } }
    @keyframes counterTick   { from{ opacity:0; transform:translateY(8px); } to{ opacity:1; transform:translateY(0); } }
    @keyframes progressFill  { from{ width:0%; } to{ width:100%; } }
    @keyframes logoReveal    { 0%{ clip-path:inset(0 100% 0 0); } 100%{ clip-path:inset(0 0% 0 0); } }
    @keyframes logoGlow      { 0%,100%{ filter:drop-shadow(0 0 0px #F5C518); } 50%{ filter:drop-shadow(0 0 18px #F5C518); } }
    @keyframes barsBuild     { from{ transform:scaleY(0); } to{ transform:scaleY(1); } }
    @keyframes dotPulse      { 0%,100%{ transform:scale(1); opacity:.4; } 50%{ transform:scale(1.6); opacity:1; } }
    @keyframes taglineSlide  { from{ opacity:0; letter-spacing:.6em; } to{ opacity:1; letter-spacing:.38em; } }
    @keyframes ringExpand    { 0%{ transform:scale(0); opacity:.8; } 100%{ transform:scale(3.5); opacity:0; } }
    @keyframes noiseFlicker  { 0%,100%{ opacity:.03; } 50%{ opacity:.06; } }

    /* ── PAGE ANIMATIONS ── */
    @keyframes fadeUp   { from { opacity:0; transform:translateY(36px); } to { opacity:1; transform:translateY(0); } }
    @keyframes fadeLeft { from { opacity:0; transform:translateX(-30px); } to { opacity:1; transform:translateX(0); } }
    @keyframes fadeRight{ from { opacity:0; transform:translateX(30px); } to { opacity:1; transform:translateX(0); } }
    @keyframes scaleIn  { from { opacity:0; transform:scale(.92); } to { opacity:1; transform:scale(1); } }
    @keyframes spin1    { to { transform:rotate(360deg); } }
    @keyframes spin2    { to { transform:rotate(-360deg); } }
    @keyframes pulseGold{ 0%,100%{ box-shadow:0 0 0 0 rgba(245,197,24,.5); } 50%{ box-shadow:0 0 0 16px rgba(245,197,24,0); } }
    @keyframes marqueeX { 0%{ transform:translateX(0); } 100%{ transform:translateX(-50%); } }
    @keyframes floatUp  { 0%,100%{ transform:translateY(0); } 50%{ transform:translateY(-14px); } }
    @keyframes shimmer  { 0%{ background-position:-200% center; } 100%{ background-position:200% center; } }
    @keyframes lineGrow { from{ width:0; opacity:0; } to{ width:3rem; opacity:1; } }
    @keyframes scrollBounce { 0%,100%{ transform:translateX(-50%) translateY(0); } 50%{ transform:translateX(-50%) translateY(8px); } }

    .anim-fadeUp   { animation: fadeUp .75s ease both; }
    .anim-fadeLeft { animation: fadeLeft .75s ease both; }
    .anim-fadeRight{ animation: fadeRight .75s ease both; }
    .anim-scaleIn  { animation: scaleIn .75s ease both; }
    .spin1 { animation: spin1 28s linear infinite; }
    .spin2 { animation: spin2 18s linear infinite; }
    .float { animation: floatUp 4s ease-in-out infinite; }
    .pulse-gold { animation: pulseGold 2.2s ease-in-out infinite; }
    .marquee-track { animation: marqueeX 22s linear infinite; white-space: nowrap; display: flex; gap: 2.5rem; }
    .line-grow { animation: lineGrow .6s ease both; }
    .shimmer-text {
      background: linear-gradient(90deg, #F5C518 0%, #fff9d6 40%, #F5C518 60%, #e6a800 100%);
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: shimmer 3.5s linear infinite;
    }

    /* Hover effects */
    .service-card { transition: transform .35s ease, border-color .35s ease, box-shadow .35s ease; }
    .service-card:hover { transform: translateY(-8px); border-color: rgba(245,197,24,.55) !important; box-shadow: 0 24px 60px rgba(245,197,24,.08); }
    .service-card:hover .service-icon { color: #F5C518; transform: scale(1.2) rotate(-5deg); }
    .service-icon { transition: transform .35s ease, color .35s ease; }

    .work-card { transition: transform .4s ease; overflow: hidden; }
    .work-card:hover { transform: scale(1.025); }
    .work-card:hover .work-overlay { opacity: 1 !important; }
    .work-card:hover .work-img { transform: scale(1.08); }
    .work-img { transition: transform .6s ease; }
    .work-overlay { opacity: 0; transition: opacity .4s ease; }

    .team-card:hover .team-img { transform: scale(1.06); }
    .team-img { transition: transform .5s ease; }

    .nav-link { position: relative; }
    .nav-link::after { content:''; position:absolute; bottom:-4px; left:0; width:0; height:2px; background:#F5C518; transition: width .3s ease; }
    .nav-link:hover::after { width:100%; }
    .nav-link:hover { color: #F5C518; }

    .btn-primary { transition: all .25s ease; }
    .btn-primary:hover { background: #fff; color: #000; transform: translateY(-2px); box-shadow: 0 8px 28px rgba(245,197,24,.3); }
    .btn-outline { transition: all .25s ease; }
    .btn-outline:hover { background: #F5C518; color: #000; transform: translateY(-2px); }

    .stat-card { transition: transform .3s ease, border-color .3s ease; }
    .stat-card:hover { transform: translateY(-4px); border-color: rgba(245,197,24,.4) !important; }

    .grid-pattern {
      background-image: linear-gradient(rgba(245,197,24,.04) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(245,197,24,.04) 1px, transparent 1px);
      background-size: 64px 64px;
    }

    .gold-text { color: #F5C518; }
    .gold-bg { background-color: #F5C518; }

    .mobile-menu { transition: max-height .35s ease, opacity .35s ease; overflow: hidden; }
    .mobile-menu.open { max-height: 480px; opacity: 1; }
    .mobile-menu.closed { max-height: 0; opacity: 0; }

    .progress-bar { transition: width 1.2s cubic-bezier(.4,0,.2,1); }

    .scroll-indicator {
      position: absolute; bottom: 36px; left: 50%;
      animation: scrollBounce 1.8s ease-in-out infinite;
      display: flex; flex-direction: column; align-items: center; gap: 6px;
    }

    /* ── MOBILE OVERRIDES ── */
    @media (max-width: 768px) {
      .nav-links-desktop { display: none !important; }
      .hide-mobile { display: none !important; }

      /* Hero mobile */
      .hero-headline { font-size: clamp(3.2rem,18vw,5rem) !important; }
      .hero-sub { font-size: .9rem !important; max-width: 100% !important; }
      .hero-ctas { flex-direction: column !important; }
      .hero-ctas button { width: 100% !important; }
      .hero-stats { gap: 1.2rem !important; }
      .hero-stat-num { font-size: 1.8rem !important; }

      /* Section padding */
      .section-pad { padding: 3.5rem 1.2rem !important; }

      /* Services grid */
      .services-grid { grid-template-columns: 1fr !important; gap: 12px !important; }

      /* Work grid */
      .work-grid { grid-template-columns: 1fr !important; gap: 12px !important; }
      .work-card-height { height: 220px !important; }

      /* About */
      .about-image-col { height: 280px !important; }

      /* Team */
      .team-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 10px !important; }
      .team-img-height { height: 200px !important; }

      /* Process */
      .process-grid { grid-template-columns: 1fr 1fr !important; gap: 1.5rem !important; }

      /* Pricing */
      .pricing-grid { grid-template-columns: 1fr !important; }
      .pricing-popular { transform: scale(1) !important; }

      /* CTA banner */
      .cta-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }

      /* Footer */
      .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 2rem !important; }
      .footer-brand { grid-column: 1 / -1 !important; }
      .footer-bottom { flex-direction: column !important; gap: .6rem !important; text-align: center !important; }
      .footer-links { flex-wrap: wrap !important; justify-content: center !important; gap: .8rem !important; }

      /* Testimonials */
      .testi-min-height { min-height: 320px !important; }

      /* Section headings */
      .section-h2 { font-size: clamp(2.2rem,10vw,3.5rem) !important; }

      /* CTA form */
      .cta-form-inner { padding: 1.5rem !important; }

      /* Marquee */
      .marquee-mt { margin-top: 2rem !important; }
    }

    @media (min-width: 769px) {
      .mobile-only { display: none !important; }
    }

    /* Loader overlay */
    .loader-overlay {
      position: fixed; inset: 0; z-index: 9999;
      background: #060606;
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      animation: loaderFadeIn .3s ease;
    }
    .loader-overlay.exit {
      animation: loaderFadeOut .9s ease forwards;
      pointer-events: none;
    }
  `}</style>
);

/* ─── LOADING SCREEN ─── */
function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0); // 0=building, 1=done, 2=exit
  const [displayNum, setDisplayNum] = useState(0);
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    // Scroll to top immediately
    window.scrollTo(0, 0);

    // Occasional glitch
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 200);
    }, 1800);

    // Progress ticker
    const phases = [
      { target: 30, speed: 18 },
      { target: 65, speed: 28 },
      { target: 88, speed: 40 },
      { target: 100, speed: 22 },
    ];
    let current = 0;
    let phaseIdx = 0;

    const tick = () => {
      const { target, speed } = phases[phaseIdx];
      if (current < target) {
        current += 1;
        setProgress(current);
        setDisplayNum(current);
        setTimeout(tick, speed);
      } else if (phaseIdx < phases.length - 1) {
        phaseIdx++;
        setTimeout(tick, phaseIdx === 2 ? 350 : 80);
      } else {
        // Done
        setPhase(1);
        setTimeout(() => {
          setPhase(2);
          setTimeout(onComplete, 900);
        }, 700);
      }
    };
    setTimeout(tick, 400);

    return () => clearInterval(glitchInterval);
  }, []);

  const bars = Array.from({ length: 28 });
  const ringCount = 3;

  return (
    <div className={`loader-overlay${phase === 2 ? " exit" : ""}`}>

      {/* Noise texture */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
        opacity: .04,
        animation: "noiseFlicker 2s steps(2) infinite",
      }} />

      {/* Scan line */}
      <div style={{
        position: "absolute", left: 0, right: 0, height: "1px",
        background: "linear-gradient(to right, transparent, rgba(245,197,24,.4), transparent)",
        animation: "scanLine 3s linear infinite",
        pointerEvents: "none",
        zIndex: 2,
      }} />

      {/* Expanding rings */}
      {[0,1,2].map(i => (
        <div key={i} style={{
          position: "absolute",
          width: "min(320px, 60vw)", height: "min(320px, 60vw)",
          border: "1px solid rgba(245,197,24,.18)",
          borderRadius: "50%",
          animation: `ringExpand 3.6s ease-out ${i * 1.2}s infinite`,
          pointerEvents: "none",
        }} />
      ))}

      {/* Grid lines */}
      <div className="grid-pattern" style={{ position: "absolute", inset: 0, opacity: 1, pointerEvents: "none" }} />

      {/* Main content */}
      <div style={{ position: "relative", zIndex: 3, textAlign: "center", padding: "0 2rem", width: "100%", maxWidth: 560 }}>

        {/* Logo with glow */}
        <div style={{
          marginBottom: "clamp(1.5rem,4vw,2.5rem)",
          animation: "logoGlow 2.5s ease-in-out infinite",
          display: "inline-block",
        }}>
          <LoaderLogo size={72} />
        </div>

        {/* Brand name with glitch */}
        <div style={{
          animation: glitchActive ? "glitchH .2s steps(2) both" : "none",
          marginBottom: "clamp(.5rem,2vw,1rem)",
        }}>
          <div className="font-display" style={{
            fontSize: "clamp(3.5rem,14vw,6.5rem)",
            letterSpacing: ".14em",
            color: "#fff",
            lineHeight: .9,
            textShadow: glitchActive
              ? "3px 0 rgba(245,197,24,.7), -3px 0 rgba(255,50,50,.5)"
              : "none",
          }}>ACARVA</div>
        </div>

        <div style={{
          animation: "taglineSlide 1.2s ease 0.3s both",
          opacity: 0,
        }}>
          <div className="font-head" style={{
            fontSize: "clamp(.55rem,2vw,.72rem)",
            letterSpacing: ".38em",
            color: "#F5C518",
            textTransform: "uppercase",
            fontWeight: 700,
            marginBottom: "clamp(1.5rem,4vw,2.5rem)",
          }}>DESIGN AGENCY</div>
        </div>

        {/* Animated bar equalizer */}
        <div style={{
          display: "flex", gap: "clamp(3px,1vw,5px)", justifyContent: "center", alignItems: "flex-end",
          height: "clamp(32px,6vw,48px)",
          marginBottom: "clamp(1.5rem,4vw,2.5rem)",
        }}>
          {bars.map((_, i) => {
            const h = 20 + Math.sin(i * 0.7) * 30 + Math.cos(i * 1.3) * 20;
            const loaded = (i / bars.length) * 100 <= progress;
            return (
              <div key={i} style={{
                width: "clamp(2px,.6vw,4px)",
                height: `${Math.max(4, h * (loaded ? 1 : 0.08))}%`,
                background: loaded ? "#F5C518" : "rgba(245,197,24,.12)",
                transformOrigin: "bottom",
                animation: loaded ? `barsBuild .3s ease ${i * 0.02}s both` : "none",
                transition: "background .3s ease, height .4s ease",
              }} />
            );
          })}
        </div>

        {/* Progress number */}
        <div style={{
          display: "flex", alignItems: "baseline", justifyContent: "center", gap: 4,
          marginBottom: "clamp(.8rem,2vw,1.2rem)",
        }}>
          <span className="font-display" style={{
            fontSize: "clamp(3rem,10vw,4.5rem)",
            color: "#F5C518",
            lineHeight: 1,
            animation: "counterTick .15s ease both",
            key: displayNum,
          }}>{displayNum}</span>
          <span className="font-display" style={{ fontSize: "clamp(1.5rem,5vw,2.2rem)", color: "rgba(245,197,24,.5)" }}>%</span>
        </div>

        {/* Progress bar track */}
        <div style={{
          width: "100%", height: "2px",
          background: "rgba(245,197,24,.1)",
          position: "relative",
          marginBottom: "clamp(1rem,3vw,1.5rem)",
          overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", top: 0, left: 0, height: "100%",
            width: `${progress}%`,
            background: "linear-gradient(to right, #F5C518, #fff4a0)",
            transition: "width .08s linear",
            boxShadow: "0 0 12px rgba(245,197,24,.6)",
          }} />
          {/* Shimmer on bar */}
          <div style={{
            position: "absolute", top: 0, left: 0, height: "100%", width: "40px",
            background: "linear-gradient(to right, transparent, rgba(255,255,255,.5), transparent)",
            transform: `translateX(${progress * 4}px)`,
            transition: "transform .08s linear",
          }} />
        </div>

        {/* Status text */}
        <div className="font-head" style={{
          fontSize: "clamp(.6rem,2vw,.72rem)",
          letterSpacing: ".28em",
          textTransform: "uppercase",
          color: phase >= 1 ? "#F5C518" : "#3a3a33",
          transition: "color .4s ease",
        }}>
          {phase === 0
            ? progress < 30 ? "Initializing brand systems..."
            : progress < 65 ? "Loading creative assets..."
            : progress < 88 ? "Calibrating design engine..."
            : "Finalizing experience..."
            : "✦ Ready to Build"}
        </div>

        {/* Three dots */}
        {phase === 0 && (
          <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: "clamp(.8rem,2vw,1.2rem)" }}>
            {[0,1,2].map(i => (
              <div key={i} style={{
                width: 5, height: 5, borderRadius: "50%", background: "#F5C518",
                animation: `dotPulse 1.2s ease-in-out ${i * .22}s infinite`,
              }} />
            ))}
          </div>
        )}
      </div>

      {/* Corner decorations */}
      <div style={{ position: "absolute", top: 20, left: 20, width: 40, height: 40, borderTop: "1px solid rgba(245,197,24,.3)", borderLeft: "1px solid rgba(245,197,24,.3)" }} />
      <div style={{ position: "absolute", top: 20, right: 20, width: 40, height: 40, borderTop: "1px solid rgba(245,197,24,.3)", borderRight: "1px solid rgba(245,197,24,.3)" }} />
      <div style={{ position: "absolute", bottom: 20, left: 20, width: 40, height: 40, borderBottom: "1px solid rgba(245,197,24,.3)", borderLeft: "1px solid rgba(245,197,24,.3)" }} />
      <div style={{ position: "absolute", bottom: 20, right: 20, width: 40, height: 40, borderBottom: "1px solid rgba(245,197,24,.3)", borderRight: "1px solid rgba(245,197,24,.3)" }} />

      {/* Version tag */}
      <div className="font-head" style={{
        position: "absolute", bottom: "clamp(16px,3vw,28px)", right: "clamp(16px,3vw,28px)",
        fontSize: ".6rem", letterSpacing: ".2em", color: "#2a2a22",
      }}>v2.0 © ACARVA</div>
    </div>
  );
}

/* ─── Loader Logo ─── */
const LoaderLogo = ({ size = 72 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <polygon points="50,4 97,92 3,92" fill="white" />
    <polygon points="50,32 74,82 26,82" fill="#0d0d0d" />
    <polygon points="50,54 67,82 43,82" fill="#F5C518" />
    <line x1="50" y1="54" x2="26" y2="82" stroke="#F5C518" strokeWidth="3.5" strokeLinecap="round" />
  </svg>
);

/* ─── Intersection Observer hook ─── */
function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

/* ─── Animated section wrapper ─── */
function Reveal({ children, delay = 0, anim = "fadeUp", className = "" }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView
          ? "none"
          : anim === "fadeLeft" ? "translateX(-30px)"
          : anim === "fadeRight" ? "translateX(30px)"
          : anim === "scaleIn" ? "scale(.93)"
          : "translateY(36px)",
        transition: `opacity .75s ease ${delay}s, transform .75s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ─── Animated number counter ─── */
function Counter({ target, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView(0.3);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const isDecimal = String(target).includes(".");
    const end = parseFloat(target);
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(isDecimal ? +start.toFixed(1) : Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView]);
  return <span ref={ref}>{count}{suffix}</span>;
}

/* ─── Logo SVG ─── */
const Logo = ({ size = 42 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <polygon points="50,4 97,92 3,92" fill="white" />
    <polygon points="50,32 74,82 26,82" fill="#0d0d0d" />
    <polygon points="50,54 67,82 43,82" fill="#F5C518" />
    <line x1="50" y1="54" x2="26" y2="82" stroke="#F5C518" strokeWidth="3.5" strokeLinecap="round" />
  </svg>
);

/* ─── Section label ─── */
const SectionLabel = ({ children }) => (
  <div className="flex items-center gap-3 mb-4" style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
    <div className="h-px w-8 line-grow" style={{ background: "#F5C518", height: 1, width: 32 }} />
    <span className="font-head" style={{ fontSize: ".7rem", letterSpacing: ".28em", textTransform: "uppercase", color: "#F5C518", fontWeight: 700 }}>
      {children}
    </span>
  </div>
);

/* ─── DATA ─── */
const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Work",     href: "#work"     },
  { label: "About",    href: "#about"    },
  { label: "Team",     href: "#team"     },
  { label: "Pricing",  href: "#pricing"  },
  { label: "Contact",  href: "#contact"  },
];

const SERVICES = [
  { icon: "◈", title: "Brand Strategy",      desc: "We craft unforgettable brand identities — from naming and positioning to full visual systems — that dominate markets and command attention.", tag: "Branding"  },
  { icon: "◉", title: "Digital Marketing",   desc: "ROI-obsessed campaigns across SEO, Google Ads, Meta, and email that grow your audience and fill your pipeline with qualified leads.",        tag: "Growth"    },
  { icon: "◎", title: "Web Design & Dev",    desc: "Blazing-fast, conversion-optimized websites and web apps. We blend stunning UI/UX with clean code to turn visitors into customers.",       tag: "Digital"   },
  { icon: "◆", title: "Content Creation",    desc: "From brand films to social reels and editorial photography — we tell your story with cinematic quality that stops thumbs and drives action.", tag: "Content" },
  { icon: "◑", title: "Business Consulting", desc: "Strategic roadmaps, competitive analysis, and growth planning from seasoned operators who've scaled businesses across multiple industries.", tag: "Strategy"  },
  { icon: "◐", title: "Social Media Mgmt",   desc: "End-to-end social presence management: strategy, content calendar, community building, and monthly analytics reporting.",                   tag: "Social"    },
];

const STATS = [
  { value: "250", suffix: "+",  label: "Brands Built"        },
  { value: "12",  suffix: "M+", label: "Revenue Generated"   },
  { value: "98",  suffix: "%",  label: "Client Retention"    },
  { value: "8",   suffix: "+",  label: "Years of Excellence" },
];

const WORK = [
  { tag: "Brand Identity",  title: "LuxeNoir Fashion",  desc: "Complete rebrand that tripled store footfall",      img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80", accent: "#F5C518" },
  { tag: "Web Platform",    title: "Vertice SaaS",      desc: "B2B dashboard with 340% sign-up growth",            img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80", accent: "#ffffff" },
  { tag: "Digital Campaign",title: "Apex Fitness Launch",desc: "1.2M reach across Instagram & TikTok",             img: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&q=80", accent: "#F5C518" },
  { tag: "Brand + Strategy",title: "Harlow Capital",    desc: "Premium finance brand that raised $40M",            img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80", accent: "#ffffff" },
  { tag: "Content + Social",title: "Orion Hospitality", desc: "Luxury hotel social strategy — 4× engagement",     img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80", accent: "#F5C518" },
  { tag: "E-commerce",      title: "Terroir Wine Co.",  desc: "Shopify store with $2.8M year-1 revenue",           img: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&q=80", accent: "#ffffff" },
];

const TESTIMONIALS = [
  { name: "Priya Mehta",  role: "CEO, Vertice",          quote: "Acarva didn't just build our brand — they built our future. Revenue tripled within 18 months of launch. Genuinely the best investment we've ever made.", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=120&q=80" },
  { name: "James Okafor", role: "Founder, Apex Fitness", quote: "The most strategic and creative team I've ever hired. They understood our vision immediately and delivered beyond every expectation. Results speak for themselves.", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&q=80" },
  { name: "Sofia Larsen", role: "CMO, LuxeNoir",         quote: "Flawless execution, stunning design, and a team that genuinely obsesses over your success. Acarva elevated our brand from local boutique to global icon.", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&q=80" },
  { name: "Marcus Webb",  role: "MD, Harlow Capital",    quote: "Our $40M raise wouldn't have happened without the credibility Acarva's branding gave us. Investors commented on our brand before anything else.", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&q=80" },
];

const TEAM = [
  { name: "Rayan Acarva",  role: "Founder & CEO",      img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&q=80" },
  { name: "Isabelle Chen", role: "Creative Director",  img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&q=80" },
  { name: "Darius Osei",   role: "Head of Strategy",   img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80" },
  { name: "Nadia Vasquez", role: "Lead Web Developer", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&q=80" },
];

const PROCESS = [
  { num: "01", title: "Discovery", desc: "Deep-dive audit of your brand, market position, competitors, and growth opportunities." },
  { num: "02", title: "Strategy",  desc: "Custom growth roadmap built around your goals — with clear KPIs and milestones." },
  { num: "03", title: "Execution", desc: "World-class creative and marketing delivery with obsessive attention to every detail." },
  { num: "04", title: "Scale",     desc: "Continuous optimization loops and monthly reporting to compound your results." },
];

const PRICING = [
  {
    name: "Starter", price: "2,499", period: "/month",
    desc: "Perfect for emerging brands ready to grow",
    features: ["Brand Strategy Session","Social Media Management (2 platforms)","Monthly Content Creation (12 posts)","SEO Audit & Setup","Monthly Analytics Report"],
    cta: "Get Started", popular: false,
  },
  {
    name: "Growth", price: "5,999", period: "/month",
    desc: "For scaling businesses demanding results",
    features: ["Full Brand Identity System","Social Media (4 platforms)","30 Content Pieces / month","Paid Ad Campaign Management","Website Design & Dev","Bi-weekly Strategy Calls","Dedicated Account Manager"],
    cta: "Most Popular", popular: true,
  },
  {
    name: "Enterprise", price: "Custom", period: "",
    desc: "Full-service agency partnership",
    features: ["Everything in Growth","Executive Brand Consulting","PR & Media Outreach","Video Production","Custom Web Applications","24/7 Priority Support","Quarterly Business Reviews"],
    cta: "Book a Call", popular: false,
  },
];

const CLIENTS = [
  "LuxeNoir","Vertice","Apex","Harlow Capital","Orion","Terroir","NordPath","Lumis Co",
  "LuxeNoir","Vertice","Apex","Harlow Capital","Orion","Terroir","NordPath","Lumis Co",
];

/* ═══════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════ */
export default function AcarvaLanding() {
  const [loading, setLoading]           = useState(true);
  const [scrollY, setScrollY]           = useState(0);
  const [menuOpen, setMenuOpen]         = useState(false);
  const [tIdx, setTIdx]                 = useState(0);
  const [mousePos, setMousePos]         = useState({ x: 0.5, y: 0.4 });
  const [activeService, setActiveService] = useState(null);

  // Scroll to top on mount/refresh
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
    const t = setInterval(() => setTIdx(p => (p + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(t);
  }, [loading]);

  useEffect(() => {
    const onMove = (e) => setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const scrollTo = useCallback((href) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  }, []);

  const navBg = scrollY > 60;

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

      {/* ══════ NAVBAR ══════ */}
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
        <a href="#" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <Logo size={38} />
          <div>
            <div className="font-display" style={{ fontSize: "1.3rem", letterSpacing: ".12em", color: "#fff", lineHeight: 1 }}>ACARVA</div>
            <div className="font-head" style={{ fontSize: ".58rem", letterSpacing: ".38em", color: "#F5C518", fontWeight: 700, marginTop: 1 }}>DESIGN</div>
          </div>
        </a>

        <div style={{ display: "flex", alignItems: "center", gap: "2rem" }} className="nav-links-desktop">
          {NAV_LINKS.map(l => (
            <button key={l.label} onClick={() => scrollTo(l.href)}
              className="nav-link font-head"
              style={{ fontSize: ".78rem", letterSpacing: ".15em", textTransform: "uppercase", color: "#9a9a88", fontWeight: 600, background: "none", border: "none", cursor: "pointer", transition: "color .25s", padding: 0 }}>
              {l.label}
            </button>
          ))}
        </div>

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

        <button className="mobile-only font-display" onClick={() => setMenuOpen(p => !p)}
          style={{ fontSize: "1.5rem", color: "#F5C518", background: "none", border: "none", cursor: "pointer", lineHeight: 1, padding: "4px 8px" }}>
          {menuOpen ? "✕" : "≡"}
        </button>
      </nav>

      {/* Mobile Menu */}
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

      {/* ══════ HERO ══════ */}
      <section id="home" style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", paddingTop: 80, overflow: "hidden" }}>
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: `radial-gradient(ellipse 70% 60% at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(245,197,24,.07) 0%, transparent 65%)`,
          transition: "background .6s ease",
        }} />
        <div className="grid-pattern" style={{ position: "absolute", inset: 0 }} />
        <div className="spin1" style={{ position: "absolute", top: "8%", right: "4%", width: "min(380px,40vw)", height: "min(380px,40vw)", border: "1px solid rgba(245,197,24,.09)", borderRadius: "50%" }} />
        <div className="spin2" style={{ position: "absolute", top: "14%", right: "8%", width: "min(240px,26vw)", height: "min(240px,26vw)", border: "1px solid rgba(245,197,24,.06)", borderRadius: "50%" }} />
        <div className="spin1" style={{ position: "absolute", bottom: "6%", left: "2%", width: "min(260px,28vw)", height: "min(260px,28vw)", border: "1px solid rgba(245,197,24,.07)", borderRadius: "50%" }} />

        {/* Floating hero image — desktop only */}
        <div className="hide-mobile" style={{
          position: "absolute", right: "clamp(2rem,6vw,8rem)", top: "50%",
          transform: "translateY(-50%)",
          width: "min(420px, 34vw)", height: "min(500px, 42vw)",
          borderRadius: 4, overflow: "hidden",
          border: "1px solid rgba(245,197,24,.2)",
          boxShadow: "0 40px 100px rgba(0,0,0,.7), 0 0 60px rgba(245,197,24,.08)",
          animation: "fadeRight .9s ease .6s both, floatUp 5s ease-in-out 2s infinite",
        }}>
          <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80"
            alt="Creative team" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(6,6,6,.3) 0%, transparent 60%)" }} />
          <div style={{
            position: "absolute", bottom: 24, left: 24,
            background: "rgba(6,6,6,.9)", border: "1px solid rgba(245,197,24,.3)",
            padding: "12px 18px", backdropFilter: "blur(10px)",
          }}>
            <div className="font-display" style={{ fontSize: "1.6rem", color: "#F5C518", lineHeight: 1 }}>250+</div>
            <div className="font-head" style={{ fontSize: ".62rem", letterSpacing: ".2em", color: "#9a9a88", textTransform: "uppercase" }}>Brands Built</div>
          </div>
        </div>

        {/* Hero text */}
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 clamp(1.2rem,5vw,4rem)", position: "relative", zIndex: 2, width: "100%" }}>
          <div style={{ animation: "fadeUp .7s ease .15s both" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, border: "1px solid rgba(245,197,24,.25)", padding: "7px 16px", marginBottom: "1.6rem" }}>
              <span className="pulse-gold" style={{ width: 7, height: 7, background: "#F5C518", borderRadius: "50%", display: "inline-block", flexShrink: 0 }} />
              <span className="font-head" style={{ fontSize: "clamp(.62rem,.9vw,.72rem)", letterSpacing: ".28em", color: "#9a9a88", textTransform: "uppercase" }}>
                Marketing & Business Building Agency
              </span>
            </div>
          </div>

          <h1 className="font-display hero-headline" style={{ fontSize: "clamp(3.8rem,11vw,9rem)", lineHeight: .9, letterSpacing: ".02em", marginBottom: "1.6rem", maxWidth: "min(680px, 100%)" }}>
            <div style={{ animation: "fadeUp .8s ease .25s both" }}>WE BUILD</div>
            <div className="shimmer-text" style={{ animation: "fadeUp .8s ease .42s both" }}>BRANDS</div>
            <div style={{ animation: "fadeUp .8s ease .58s both" }}>THAT WIN.</div>
          </h1>

          <p className="font-body hero-sub" style={{
            fontSize: "clamp(.9rem,1.6vw,1.05rem)", color: "#7a7a6a", lineHeight: 1.8,
            maxWidth: "min(460px, 100%)", marginBottom: "2.4rem", fontWeight: 300,
            animation: "fadeUp .8s ease .72s both",
          }}>
            Acarva Design is a full-service agency crafting powerful brand identities, digital strategies, and growth systems for ambitious businesses worldwide.
          </p>

          <div className="hero-ctas" style={{ display: "flex", flexWrap: "wrap", gap: 12, animation: "fadeUp .8s ease .88s both" }}>
            <button onClick={() => scrollTo("#contact")}
              className="btn-primary font-head gold-bg"
              style={{ padding: "14px clamp(22px,4vw,34px)", fontSize: ".88rem", letterSpacing: ".12em", textTransform: "uppercase", fontWeight: 700, color: "#000", border: "none", borderRadius: 2, cursor: "pointer" }}>
              Start Your Project →
            </button>
            <button onClick={() => scrollTo("#work")}
              className="btn-outline font-head"
              style={{ padding: "14px clamp(22px,4vw,34px)", fontSize: ".88rem", letterSpacing: ".12em", textTransform: "uppercase", fontWeight: 700, border: "1.5px solid rgba(245,197,24,.45)", color: "#F5C518", background: "transparent", borderRadius: 2, cursor: "pointer" }}>
              View Our Work
            </button>
          </div>

          {/* Stats row */}
          <div className="hero-stats" style={{ display: "flex", flexWrap: "wrap", gap: "clamp(1.2rem,4vw,3rem)", marginTop: "clamp(2rem,4vw,3.5rem)", animation: "fadeUp .8s ease 1.05s both" }}>
            {STATS.map(s => (
              <div key={s.label} style={{ minWidth: 0 }}>
                <div className="font-display hero-stat-num" style={{ fontSize: "clamp(1.8rem,4vw,2.5rem)", color: "#F5C518", lineHeight: 1 }}>
                  <Counter target={parseInt(s.value)} suffix={s.suffix} />
                </div>
                <div className="font-head" style={{ fontSize: ".62rem", color: "#5a5a52", letterSpacing: ".22em", textTransform: "uppercase", marginTop: 4 }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="scroll-indicator hide-mobile" style={{ position: "absolute", bottom: 36, left: "50%", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, transform: "translateX(-50%)" }}>
          <div className="font-head" style={{ fontSize: ".6rem", letterSpacing: ".3em", color: "#3a3a33", textTransform: "uppercase" }}>Scroll</div>
          <div style={{ width: 1, height: 44, background: "linear-gradient(to bottom, #F5C518, transparent)" }} />
        </div>
      </section>

      {/* ══════ MARQUEE ══════ */}
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

      {/* ══════ SERVICES ══════ */}
      <section id="services" className="section-pad" style={{ padding: "clamp(4rem,8vw,7rem) clamp(1.2rem,5vw,4rem)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <Reveal>
            <SectionLabel>What We Do</SectionLabel>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "1.2rem", marginBottom: "clamp(2.5rem,5vw,4rem)" }}>
              <h2 className="font-display section-h2" style={{ fontSize: "clamp(2.6rem,6vw,5rem)", lineHeight: .95, letterSpacing: ".02em" }}>
                OUR <span style={{ color: "#F5C518" }}>SERVICES</span>
              </h2>
              <p className="font-body" style={{ fontSize: ".92rem", color: "#6b6b60", maxWidth: 340, fontWeight: 300, lineHeight: 1.7 }}>
                Six disciplines, one mission: building systems that grow your business and make your brand impossible to ignore.
              </p>
            </div>
          </Reveal>

          <div className="services-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 320px), 1fr))", gap: 14 }}>
            {SERVICES.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.07}>
                <div
                  className="service-card"
                  onMouseEnter={() => setActiveService(i)}
                  onMouseLeave={() => setActiveService(null)}
                  style={{
                    background: activeService === i ? "rgba(245,197,24,.04)" : "#0d0d0d",
                    border: "1px solid rgba(245,197,24,.14)",
                    padding: "clamp(1.4rem,2.5vw,2rem)",
                    cursor: "pointer",
                    height: "100%",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.2rem" }}>
                    <span className="service-icon" style={{ fontSize: "2.2rem", color: "#3a3a32", display: "inline-block" }}>{s.icon}</span>
                    <span className="font-head" style={{ fontSize: ".62rem", letterSpacing: ".2em", textTransform: "uppercase", color: "#F5C518", fontWeight: 600, border: "1px solid rgba(245,197,24,.2)", padding: "3px 9px" }}>{s.tag}</span>
                  </div>
                  <h3 className="font-head" style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: ".7rem", letterSpacing: ".03em" }}>{s.title}</h3>
                  <p className="font-body" style={{ fontSize: ".86rem", color: "#6b6b60", lineHeight: 1.75, fontWeight: 300 }}>{s.desc}</p>
                  <div style={{ marginTop: "1.2rem", display: "flex", alignItems: "center", gap: 8, color: "#F5C518", fontSize: ".72rem", fontWeight: 600, letterSpacing: ".2em", textTransform: "uppercase", opacity: activeService === i ? 1 : 0, transition: "opacity .3s" }}>
                    <span className="font-head">Explore</span>
                    <span>→</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ ABOUT ══════ */}
      <section id="about" className="section-pad" style={{ padding: "clamp(4rem,8vw,7rem) clamp(1.2rem,5vw,4rem)", background: "#0a0a0a", borderTop: "1px solid rgba(245,197,24,.08)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%,460px),1fr))", gap: "clamp(2.5rem,5vw,5rem)", alignItems: "center" }}>
          <Reveal anim="fadeLeft">
            <div className="about-image-col" style={{ position: "relative", height: "clamp(300px,45vw,520px)" }}>
              <div style={{ position: "absolute", left: 0, top: 0, width: "68%", height: "75%", overflow: "hidden", border: "1px solid rgba(245,197,24,.15)" }}>
                <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=700&q=80" alt="Team" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={{ position: "absolute", right: 0, bottom: 0, width: "56%", height: "60%", overflow: "hidden", border: "1px solid rgba(245,197,24,.2)" }}>
                <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&q=80" alt="Strategy" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div className="gold-bg" style={{ position: "absolute", left: "62%", top: "18%", width: 52, height: 52, zIndex: 2 }} />
              <div style={{
                position: "absolute", left: 20, bottom: 24, zIndex: 3,
                background: "rgba(6,6,6,.92)", border: "1px solid rgba(245,197,24,.3)",
                padding: "12px 16px", backdropFilter: "blur(12px)",
              }}>
                <div className="font-display" style={{ fontSize: "1.8rem", color: "#F5C518", lineHeight: 1 }}>12M+</div>
                <div className="font-head" style={{ fontSize: ".6rem", letterSpacing: ".2em", color: "#6b6b60", textTransform: "uppercase" }}>Revenue Generated</div>
              </div>
            </div>
          </Reveal>

          <Reveal anim="fadeRight" delay={0.1}>
            <SectionLabel>Our Story</SectionLabel>
            <h2 className="font-display section-h2" style={{ fontSize: "clamp(2.4rem,5vw,4rem)", lineHeight: .95, marginBottom: "1.6rem", letterSpacing: ".02em" }}>
              BUILT BY <span style={{ color: "#F5C518" }}>BUILDERS,</span><br />FOR BUILDERS.
            </h2>
            <p className="font-body" style={{ fontSize: ".93rem", color: "#7a7a6a", lineHeight: 1.8, marginBottom: "1.2rem", fontWeight: 300 }}>
              Acarva Design was founded on a simple belief: great businesses deserve great brands. We're not just a design shop — we're growth partners who roll up our sleeves and do whatever it takes to win.
            </p>
            <p className="font-body" style={{ fontSize: ".93rem", color: "#7a7a6a", lineHeight: 1.8, marginBottom: "2rem", fontWeight: 300 }}>
              From scrappy startups to multinational corporations, we've spent 8 years helping ambitious founders and CMOs build brands that generate real, measurable business results.
            </p>
            {[
              { skill: "Brand Strategy",    pct: 98 },
              { skill: "Digital Marketing", pct: 95 },
              { skill: "Creative Design",   pct: 97 },
              { skill: "Business Growth",   pct: 92 },
            ].map((sk, i) => (
              <SkillBar key={sk.skill} skill={sk.skill} pct={sk.pct} delay={i * 0.12} />
            ))}
          </Reveal>
        </div>
      </section>

      {/* ══════ WORK ══════ */}
      <section id="work" className="section-pad" style={{ padding: "clamp(4rem,8vw,7rem) clamp(1.2rem,5vw,4rem)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <Reveal>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "1.2rem", marginBottom: "clamp(2.5rem,5vw,4rem)" }}>
              <div>
                <SectionLabel>Portfolio</SectionLabel>
                <h2 className="font-display section-h2" style={{ fontSize: "clamp(2.6rem,6vw,5rem)", lineHeight: .95, letterSpacing: ".02em" }}>
                  FEATURED <span style={{ color: "#F5C518" }}>WORK</span>
                </h2>
              </div>
              <button onClick={() => scrollTo("#contact")}
                className="btn-outline font-head"
                style={{ padding: "10px 22px", fontSize: ".78rem", letterSpacing: ".14em", textTransform: "uppercase", fontWeight: 700, border: "1.5px solid rgba(245,197,24,.35)", color: "#F5C518", background: "transparent", borderRadius: 2, cursor: "pointer" }}>
                View All Projects
              </button>
            </div>
          </Reveal>

          <div className="work-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 340px), 1fr))", gap: 12 }}>
            {WORK.map((w, i) => (
              <Reveal key={w.title} delay={i * 0.08}>
                <div className="work-card work-card-height" style={{ position: "relative", height: "clamp(200px,26vw,300px)", border: "1px solid rgba(245,197,24,.1)", overflow: "hidden", cursor: "pointer" }}>
                  <img className="work-img" src={w.img} alt={w.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(6,6,6,.9) 0%, rgba(6,6,6,.3) 55%, transparent 100%)" }} />
                  <div className="work-overlay" style={{ position: "absolute", inset: 0, background: "rgba(245,197,24,.06)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ width: 50, height: 50, border: "2px solid #F5C518", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#F5C518", fontSize: "1.2rem" }}>→</div>
                  </div>
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "1.2rem 1.4rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                      <span style={{ width: 16, height: 1.5, background: w.accent, display: "inline-block" }} />
                      <span className="font-head" style={{ fontSize: ".62rem", letterSpacing: ".2em", textTransform: "uppercase", fontWeight: 600, color: w.accent }}>{w.tag}</span>
                    </div>
                    <h3 className="font-head" style={{ fontSize: "1rem", fontWeight: 700, marginBottom: 3, color: "#fff" }}>{w.title}</h3>
                    <p className="font-body" style={{ fontSize: ".78rem", color: "#9a9a88", fontWeight: 300 }}>{w.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ PROCESS ══════ */}
      <section className="section-pad" style={{ padding: "clamp(4rem,8vw,7rem) clamp(1.2rem,5vw,4rem)", background: "#080808", borderTop: "1px solid rgba(245,197,24,.08)", borderBottom: "1px solid rgba(245,197,24,.08)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "clamp(2.5rem,5vw,4rem)" }}>
              <SectionLabel>How It Works</SectionLabel>
              <h2 className="font-display section-h2" style={{ fontSize: "clamp(2.6rem,6vw,5rem)", letterSpacing: ".02em", lineHeight: .95 }}>
                OUR <span style={{ color: "#F5C518" }}>PROCESS</span>
              </h2>
            </div>
          </Reveal>
          <div className="process-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%,200px),1fr))", gap: "clamp(2rem,4vw,3rem)", position: "relative" }}>
            <div className="hide-mobile" style={{ position: "absolute", top: "3rem", left: "calc(12.5% + 1rem)", right: "calc(12.5% + 1rem)", height: 1, background: "linear-gradient(to right, transparent, rgba(245,197,24,.25) 20%, rgba(245,197,24,.25) 80%, transparent)" }} />
            {PROCESS.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.1}>
                <div style={{ textAlign: "center", padding: "0 .5rem" }}>
                  <div style={{
                    width: 58, height: 58, background: "#F5C518", display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 1.4rem", color: "#000", fontWeight: 900, fontSize: "1.1rem",
                    fontFamily: "'Syne', sans-serif",
                    boxShadow: "0 0 30px rgba(245,197,24,.3)",
                    position: "relative", zIndex: 1,
                  }}>{p.num}</div>
                  <h3 className="font-head" style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: ".6rem" }}>{p.title}</h3>
                  <p className="font-body" style={{ fontSize: ".84rem", color: "#6b6b60", lineHeight: 1.75, fontWeight: 300 }}>{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ TEAM ══════ */}
      <section id="team" className="section-pad" style={{ padding: "clamp(4rem,8vw,7rem) clamp(1.2rem,5vw,4rem)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "clamp(2.5rem,5vw,4rem)" }}>
              <SectionLabel>The People</SectionLabel>
              <h2 className="font-display section-h2" style={{ fontSize: "clamp(2.6rem,6vw,5rem)", letterSpacing: ".02em", lineHeight: .95 }}>
                MEET THE <span style={{ color: "#F5C518" }}>TEAM</span>
              </h2>
            </div>
          </Reveal>
          <div className="team-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 240px), 1fr))", gap: 14 }}>
            {TEAM.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.09}>
                <div className="team-card" style={{ border: "1px solid rgba(245,197,24,.12)", overflow: "hidden", cursor: "pointer", transition: "border-color .3s" }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(245,197,24,.45)"}
                  onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(245,197,24,.12)"}>
                  <div className="team-img-height" style={{ height: "clamp(200px,28vw,340px)", overflow: "hidden" }}>
                    <img className="team-img" src={t.img} alt={t.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
                  </div>
                  <div style={{ padding: "1.2rem 1.4rem", background: "#0d0d0d" }}>
                    <h3 className="font-head" style={{ fontSize: ".95rem", fontWeight: 700, marginBottom: 4 }}>{t.name}</h3>
                    <div className="font-head" style={{ fontSize: ".66rem", color: "#F5C518", letterSpacing: ".18em", textTransform: "uppercase", fontWeight: 600 }}>{t.role}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ TESTIMONIALS ══════ */}
      <section className="section-pad" style={{ padding: "clamp(4rem,8vw,7rem) clamp(1.2rem,5vw,4rem)", background: "#070707", borderTop: "1px solid rgba(245,197,24,.08)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "clamp(2.5rem,5vw,4rem)" }}>
              <SectionLabel>Social Proof</SectionLabel>
              <h2 className="font-display section-h2" style={{ fontSize: "clamp(2.6rem,6vw,5rem)", letterSpacing: ".02em", lineHeight: .95 }}>
                WHAT CLIENTS <span style={{ color: "#F5C518" }}>SAY</span>
              </h2>
            </div>
          </Reveal>

          <div style={{ position: "relative", maxWidth: 740, margin: "0 auto" }}>
            <div className="testi-min-height" style={{ textAlign: "center", minHeight: "clamp(280px,32vw,260px)", position: "relative" }}>
              {TESTIMONIALS.map((t, i) => (
                <div key={t.name} style={{
                  position: "absolute", inset: 0,
                  opacity: i === tIdx ? 1 : 0,
                  transform: i === tIdx ? "translateY(0)" : "translateY(16px)",
                  transition: "opacity .6s ease, transform .6s ease",
                  pointerEvents: i === tIdx ? "auto" : "none",
                }}>
                  <div className="font-display" style={{ fontSize: "4.5rem", color: "#F5C518", lineHeight: .8, marginBottom: "1rem", opacity: .6 }}>"</div>
                  <p className="font-body" style={{ fontSize: "clamp(.92rem,1.8vw,1.1rem)", color: "#ccc5b0", lineHeight: 1.8, marginBottom: "1.8rem", fontWeight: 300, fontStyle: "italic" }}>
                    {t.quote}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
                    <div style={{ width: 46, height: 46, borderRadius: "50%", overflow: "hidden", border: "2px solid rgba(245,197,24,.35)", flexShrink: 0 }}>
                      <img src={t.avatar} alt={t.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                    <div style={{ textAlign: "left" }}>
                      <div className="font-head" style={{ fontWeight: 700, fontSize: ".9rem" }}>{t.name}</div>
                      <div className="font-body" style={{ color: "#F5C518", fontSize: ".72rem", letterSpacing: ".12em" }}>{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: "clamp(1.8rem,4vw,3rem)" }}>
              {TESTIMONIALS.map((_, i) => (
                <button key={i} onClick={() => setTIdx(i)}
                  style={{ width: i === tIdx ? 26 : 7, height: 4, borderRadius: 2, background: i === tIdx ? "#F5C518" : "#2a2a22", border: "none", cursor: "pointer", transition: "all .35s ease" }} />
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: "1rem" }}>
              {["←","→"].map((arrow, i) => (
                <button key={arrow} onClick={() => setTIdx(p => i === 0 ? (p - 1 + TESTIMONIALS.length) % TESTIMONIALS.length : (p + 1) % TESTIMONIALS.length)}
                  style={{ width: 38, height: 38, border: "1px solid rgba(245,197,24,.25)", background: "transparent", color: "#F5C518", cursor: "pointer", fontSize: ".95rem", transition: "all .25s" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "#F5C518"; e.currentTarget.style.color = "#000"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#F5C518"; }}>{arrow}</button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════ PRICING ══════ */}
      <section id="pricing" className="section-pad" style={{ padding: "clamp(4rem,8vw,7rem) clamp(1.2rem,5vw,4rem)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "clamp(2.5rem,5vw,4rem)" }}>
              <SectionLabel>Transparent Pricing</SectionLabel>
              <h2 className="font-display section-h2" style={{ fontSize: "clamp(2.6rem,6vw,5rem)", letterSpacing: ".02em", lineHeight: .95 }}>
                CHOOSE YOUR <span style={{ color: "#F5C518" }}>PLAN</span>
              </h2>
              <p className="font-body" style={{ fontSize: ".92rem", color: "#6b6b60", marginTop: ".8rem", fontWeight: 300 }}>
                No contracts. No hidden fees. Cancel or upgrade anytime.
              </p>
            </div>
          </Reveal>

          <div className="pricing-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%,280px),1fr))", gap: 14, alignItems: "start" }}>
            {PRICING.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.1}>
                <div className={p.popular ? "pricing-popular" : ""} style={{
                  border: p.popular ? "2px solid #F5C518" : "1px solid rgba(245,197,24,.14)",
                  background: p.popular ? "rgba(245,197,24,.04)" : "#0d0d0d",
                  padding: "clamp(1.6rem,3vw,2.2rem)",
                  position: "relative",
                  transform: p.popular ? "scale(1.03)" : "scale(1)",
                  boxShadow: p.popular ? "0 0 60px rgba(245,197,24,.12)" : "none",
                }}>
                  {p.popular && (
                    <div className="font-head gold-bg" style={{ position: "absolute", top: -13, left: "50%", transform: "translateX(-50%)", padding: "4px 18px", fontSize: ".65rem", letterSpacing: ".2em", textTransform: "uppercase", fontWeight: 700, color: "#000", whiteSpace: "nowrap" }}>
                      Most Popular
                    </div>
                  )}
                  <div className="font-head" style={{ fontSize: ".72rem", letterSpacing: ".25em", textTransform: "uppercase", color: "#F5C518", fontWeight: 600, marginBottom: ".8rem" }}>{p.name}</div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: ".7rem" }}>
                    <span className="font-display" style={{ fontSize: "clamp(2.2rem,5vw,2.8rem)", color: "#fff", lineHeight: 1 }}>
                      {p.price === "Custom" ? "Custom" : `$${p.price}`}
                    </span>
                    {p.period && <span className="font-body" style={{ fontSize: ".82rem", color: "#6b6b60" }}>{p.period}</span>}
                  </div>
                  <p className="font-body" style={{ fontSize: ".83rem", color: "#6b6b60", marginBottom: "1.5rem", fontWeight: 300, lineHeight: 1.6 }}>{p.desc}</p>
                  <div style={{ borderTop: "1px solid rgba(245,197,24,.1)", paddingTop: "1.3rem", marginBottom: "1.5rem" }}>
                    {p.features.map(f => (
                      <div key={f} style={{ display: "flex", alignItems: "flex-start", gap: 9, marginBottom: ".72rem" }}>
                        <span style={{ color: "#F5C518", fontSize: ".72rem", flexShrink: 0, marginTop: 3 }}>✓</span>
                        <span className="font-body" style={{ fontSize: ".83rem", color: "#9a9a88", fontWeight: 300 }}>{f}</span>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => scrollTo("#contact")}
                    className={p.popular ? "btn-primary font-head gold-bg" : "btn-outline font-head"}
                    style={{
                      width: "100%", padding: "12px", fontSize: ".8rem", letterSpacing: ".15em",
                      textTransform: "uppercase", fontWeight: 700,
                      border: p.popular ? "none" : "1.5px solid rgba(245,197,24,.4)",
                      color: p.popular ? "#000" : "#F5C518", borderRadius: 2, cursor: "pointer",
                    }}>
                    {p.cta}
                  </button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ CTA BANNER ══════ */}
      <section className="section-pad" style={{ padding: "clamp(4rem,8vw,7rem) clamp(1.2rem,5vw,4rem)", background: "#060606", position: "relative", overflow: "hidden", borderTop: "1px solid rgba(245,197,24,.08)" }}>
        <div className="grid-pattern" style={{ position: "absolute", inset: 0 }} />
        <div className="spin1" style={{ position: "absolute", top: "-10%", right: "-5%", width: "min(500px,50vw)", height: "min(500px,50vw)", border: "1px solid rgba(245,197,24,.07)", borderRadius: "50%" }} />
        <div className="spin2" style={{ position: "absolute", bottom: "-10%", left: "-5%", width: "min(380px,40vw)", height: "min(380px,40vw)", border: "1px solid rgba(245,197,24,.06)", borderRadius: "50%" }} />

        <div className="cta-grid" style={{ maxWidth: 1240, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,400px),1fr))", gap: "3rem", alignItems: "center", position: "relative", zIndex: 2 }}>
          <Reveal anim="fadeLeft">
            <SectionLabel>Ready to Grow?</SectionLabel>
            <h2 className="font-display section-h2" style={{ fontSize: "clamp(2.6rem,7vw,5.5rem)", lineHeight: .92, letterSpacing: ".02em", marginBottom: "1.4rem" }}>
              LET'S BUILD<br /><span className="shimmer-text">SOMETHING</span><br />EXTRAORDINARY.
            </h2>
            <p className="font-body" style={{ fontSize: ".92rem", color: "#6b6b60", fontWeight: 300, lineHeight: 1.8, maxWidth: 400 }}>
              Schedule a free 30-minute strategy call. We'll audit your brand, identify your biggest growth levers, and show you exactly how we'll accelerate your business.
            </p>
          </Reveal>
          <Reveal anim="fadeRight" delay={0.15}>
            <div className="cta-form-inner" style={{ background: "#0d0d0d", border: "1px solid rgba(245,197,24,.18)", padding: "clamp(1.6rem,3.5vw,2.5rem)" }}>
              <h3 className="font-head" style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1.6rem" }}>Get a Free Consultation</h3>
              {[
                { id: "cta-name",  placeholder: "Full Name",         type: "text"  },
                { id: "cta-email", placeholder: "Email Address",      type: "email" },
                { id: "cta-biz",   placeholder: "Business / Company", type: "text"  },
              ].map(f => (
                <input key={f.id} id={f.id} type={f.type} placeholder={f.placeholder}
                  className="font-body"
                  style={{
                    display: "block", width: "100%", marginBottom: 10,
                    background: "#111", border: "1px solid rgba(245,197,24,.15)",
                    padding: "12px 14px", color: "#ede8de", fontSize: ".88rem", fontWeight: 300,
                    outline: "none", fontFamily: "'DM Sans',sans-serif",
                  }}
                  onFocus={e => e.target.style.borderColor = "rgba(245,197,24,.6)"}
                  onBlur={e => e.target.style.borderColor = "rgba(245,197,24,.15)"}
                />
              ))}
              <select className="font-body"
                style={{ display: "block", width: "100%", marginBottom: 14, background: "#111", border: "1px solid rgba(245,197,24,.15)", padding: "12px 14px", color: "#6b6b60", fontSize: ".88rem", outline: "none", fontFamily: "'DM Sans',sans-serif", appearance: "none" }}>
                <option value="">Service Interested In</option>
                {SERVICES.map(s => <option key={s.title}>{s.title}</option>)}
              </select>
              <button className="btn-primary font-head gold-bg"
                style={{ width: "100%", padding: "14px", fontSize: ".85rem", letterSpacing: ".14em", textTransform: "uppercase", fontWeight: 700, color: "#000", border: "none", borderRadius: 2, cursor: "pointer" }}>
                Book Free Call →
              </button>
              <p className="font-body" style={{ fontSize: ".72rem", color: "#3a3a33", textAlign: "center", marginTop: ".9rem", fontWeight: 300 }}>
                No spam. 100% free. We'll get back within 24 hours.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════ FOOTER ══════ */}
      <section id="contact" className="section-pad" style={{ padding: "clamp(3.5rem,7vw,5.5rem) clamp(1.2rem,5vw,4rem)", background: "#080808", borderTop: "1px solid rgba(245,197,24,.08)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,220px),1fr))", gap: "2.5rem" }}>
            {/* Brand col */}
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
              <div style={{ display: "flex", gap: 8, marginTop: "1.5rem", flexWrap: "wrap" }}>
                {["LI","TW","IG","YT"].map(s => (
                  <div key={s}
                    style={{ width: 36, height: 36, border: "1px solid rgba(245,197,24,.18)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all .25s" }}
                    onMouseEnter={e => { e.currentTarget.style.background = "#F5C518"; e.currentTarget.style.borderColor = "#F5C518"; e.currentTarget.querySelector("span").style.color = "#000"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(245,197,24,.18)"; e.currentTarget.querySelector("span").style.color = "#6b6b60"; }}>
                    <span className="font-head" style={{ fontSize: ".62rem", fontWeight: 700, color: "#6b6b60", transition: "color .25s" }}>{s}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Nav cols */}
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
              {["Privacy Policy","Terms of Service","Cookie Policy"].map(l => (
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
    </div>
  );
}

/* ─── Skill bar ─── */
function SkillBar({ skill, pct, delay = 0 }) {
  const [ref, inView] = useInView(0.3);
  return (
    <div ref={ref} style={{ marginBottom: "1.1rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
        <span className="font-head" style={{ fontSize: ".75rem", letterSpacing: ".1em", textTransform: "uppercase", fontWeight: 600, color: "#9a9a88" }}>{skill}</span>
        <span className="font-head" style={{ fontSize: ".75rem", color: "#F5C518", fontWeight: 700 }}>{pct}%</span>
      </div>
      <div style={{ height: 2.5, background: "#1c1c1c", position: "relative", overflow: "hidden" }}>
        <div style={{
          height: "100%", background: "linear-gradient(to right, #F5C518, #fff4a0)",
          width: inView ? `${pct}%` : "0%",
          transition: `width 1.4s cubic-bezier(.4,0,.2,1) ${delay}s`,
        }} />
      </div>
    </div>
  );
}