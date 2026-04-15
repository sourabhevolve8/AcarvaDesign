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
    @keyframes newsletterPulse { 0%,100%{ transform:scale(1); opacity:.06; } 50%{ transform:scale(1.08); opacity:.12; } }

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

    .blog-card { transition: transform .35s ease, border-color .35s ease, box-shadow .35s ease; }
    .blog-card:hover { transform: translateY(-6px); border-color: rgba(245,197,24,.4) !important; box-shadow: 0 20px 50px rgba(0,0,0,.4); }
    .blog-card:hover .blog-img { transform: scale(1.06); }
    .blog-img { transition: transform .6s ease; }

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
    .mobile-menu.open { max-height: 520px; opacity: 1; }
    .mobile-menu.closed { max-height: 0; opacity: 0; }

    .progress-bar { transition: width 1.2s cubic-bezier(.4,0,.2,1); }

    .scroll-indicator {
      position: absolute; bottom: 36px; left: 50%;
      animation: scrollBounce 1.8s ease-in-out infinite;
      display: flex; flex-direction: column; align-items: center; gap: 6px;
    }

    /* Newsletter input */
    .nl-input:focus { border-color: rgba(245,197,24,.6) !important; outline: none; }
    .nl-input::placeholder { color: #4a4a42; }

    /* ── MOBILE OVERRIDES ── */
    @media (max-width: 768px) {
      .nav-links-desktop { display: none !important; }
      .hide-mobile { display: none !important; }

      .hero-headline { font-size: clamp(3.2rem,18vw,5rem) !important; }
      .hero-sub { font-size: .9rem !important; max-width: 100% !important; }
      .hero-ctas { flex-direction: column !important; }
      .hero-ctas button { width: 100% !important; }
      .hero-stats { gap: 1.2rem !important; }
      .hero-stat-num { font-size: 1.8rem !important; }

      .section-pad { padding: 3.5rem 1.2rem !important; }
      .services-grid { grid-template-columns: 1fr !important; gap: 12px !important; }
      .work-grid { grid-template-columns: 1fr !important; gap: 12px !important; }
      .work-card-height { height: 220px !important; }
      .about-image-col { height: 280px !important; }
      .team-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 10px !important; }
      .team-img-height { height: 200px !important; }
      .process-grid { grid-template-columns: 1fr 1fr !important; gap: 1.5rem !important; }
      .pricing-grid { grid-template-columns: 1fr !important; }
      .pricing-popular { transform: scale(1) !important; }
      .cta-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
      .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 2rem !important; }
      .footer-brand { grid-column: 1 / -1 !important; }
      .footer-bottom { flex-direction: column !important; gap: .6rem !important; text-align: center !important; }
      .footer-links { flex-wrap: wrap !important; justify-content: center !important; gap: .8rem !important; }
      .testi-min-height { min-height: 320px !important; }
      .section-h2 { font-size: clamp(2.2rem,10vw,3.5rem) !important; }
      .cta-form-inner { padding: 1.5rem !important; }
      .marquee-mt { margin-top: 2rem !important; }
      .blog-grid { grid-template-columns: 1fr !important; }
      .nl-inner { grid-template-columns: 1fr !important; gap: 1.5rem !important; }
      .nl-form-row { flex-direction: column !important; }
      .nl-form-row input, .nl-form-row button { width: 100% !important; }
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

export default GlobalStyles;