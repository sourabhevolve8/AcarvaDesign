import { useState, useEffect } from "react";
import { LoaderLogo } from "./UI";

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);
  const [displayNum, setDisplayNum] = useState(0);
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 200);
    }, 1800);

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
        pointerEvents: "none", zIndex: 2,
      }} />

      {/* Ring pulses */}
      {[0, 1, 2].map(i => (
        <div key={i} style={{
          position: "absolute",
          width: "min(320px, 60vw)", height: "min(320px, 60vw)",
          border: "1px solid rgba(245,197,24,.18)",
          borderRadius: "50%",
          animation: `ringExpand 3.6s ease-out ${i * 1.2}s infinite`,
          pointerEvents: "none",
        }} />
      ))}

      <div className="grid-pattern" style={{ position: "absolute", inset: 0, opacity: 1, pointerEvents: "none" }} />

      <div style={{ position: "relative", zIndex: 3, textAlign: "center", padding: "0 2rem", width: "100%", maxWidth: 560 }}>
        {/* Logo */}
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

        {/* Tagline */}
        <div style={{ animation: "taglineSlide 1.2s ease 0.3s both", opacity: 0 }}>
          <div className="font-head" style={{
            fontSize: "clamp(.55rem,2vw,.72rem)",
            letterSpacing: ".38em",
            color: "#F5C518",
            textTransform: "uppercase",
            fontWeight: 700,
            marginBottom: "clamp(1.5rem,4vw,2.5rem)",
          }}>DESIGN</div>
        </div>

        {/* Audio bars */}
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

        {/* Percentage counter */}
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: 4, marginBottom: "clamp(.8rem,2vw,1.2rem)" }}>
          <span className="font-display" style={{
            fontSize: "clamp(3rem,10vw,4.5rem)",
            color: "#F5C518", lineHeight: 1,
            animation: "counterTick .15s ease both",
          }}>{displayNum}</span>
          <span className="font-display" style={{ fontSize: "clamp(1.5rem,5vw,2.2rem)", color: "rgba(245,197,24,.5)" }}>%</span>
        </div>

        {/* Progress bar */}
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

        {/* Loading dots */}
        {phase === 0 && (
          <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: "clamp(.8rem,2vw,1.2rem)" }}>
            {[0, 1, 2].map(i => (
              <div key={i} style={{
                width: 5, height: 5, borderRadius: "50%", background: "#F5C518",
                animation: `dotPulse 1.2s ease-in-out ${i * .22}s infinite`,
              }} />
            ))}
          </div>
        )}
      </div>

      {/* Corner brackets */}
      <div style={{ position: "absolute", top: 20, left: 20, width: 40, height: 40, borderTop: "1px solid rgba(245,197,24,.3)", borderLeft: "1px solid rgba(245,197,24,.3)" }} />
      <div style={{ position: "absolute", top: 20, right: 20, width: 40, height: 40, borderTop: "1px solid rgba(245,197,24,.3)", borderRight: "1px solid rgba(245,197,24,.3)" }} />
      <div style={{ position: "absolute", bottom: 20, left: 20, width: 40, height: 40, borderBottom: "1px solid rgba(245,197,24,.3)", borderLeft: "1px solid rgba(245,197,24,.3)" }} />
      <div style={{ position: "absolute", bottom: 20, right: 20, width: 40, height: 40, borderBottom: "1px solid rgba(245,197,24,.3)", borderRight: "1px solid rgba(245,197,24,.3)" }} />

      <div className="font-head" style={{
        position: "absolute", bottom: "clamp(16px,3vw,28px)", right: "clamp(16px,3vw,28px)",
        fontSize: ".6rem", letterSpacing: ".2em", color: "#2a2a22",
      }}>© ACARVA</div>
    </div>
  );
}