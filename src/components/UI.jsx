import { useState, useEffect } from "react";
import { useInView } from "../hooks/useInView";

/* ── Logo SVG ── */
export const Logo = ({ size = 42 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <polygon points="50,4 97,92 3,92" fill="white" />
    <polygon points="50,32 74,82 26,82" fill="#0d0d0d" />
    <polygon points="50,54 67,82 43,82" fill="#F5C518" />
    <line x1="50" y1="54" x2="26" y2="82" stroke="#F5C518" strokeWidth="3.5" strokeLinecap="round" />
  </svg>
);

/* ── Loader Logo (slightly different bg fill) ── */
export const LoaderLogo = ({ size = 72 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <polygon points="50,4 97,92 3,92" fill="white" />
    <polygon points="50,32 74,82 26,82" fill="#0d0d0d" />
    <polygon points="50,54 67,82 43,82" fill="#F5C518" />
    <line x1="50" y1="54" x2="26" y2="82" stroke="#F5C518" strokeWidth="3.5" strokeLinecap="round" />
  </svg>
);

/* ── Section label with animated line ── */
export const SectionLabel = ({ children }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
    <div className="line-grow" style={{ background: "#F5C518", height: 1, width: 32 }} />
    <span className="font-head" style={{ fontSize: ".7rem", letterSpacing: ".28em", textTransform: "uppercase", color: "#F5C518", fontWeight: 700 }}>
      {children}
    </span>
  </div>
);

/* ── Scroll-triggered reveal wrapper ── */
export function Reveal({ children, delay = 0, anim = "fadeUp", className = "" }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView
          ? "none"
          : anim === "fadeLeft"  ? "translateX(-30px)"
          : anim === "fadeRight" ? "translateX(30px)"
          : anim === "scaleIn"   ? "scale(.93)"
          : "translateY(36px)",
        transition: `opacity .75s ease ${delay}s, transform .75s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ── Animated counter ── */
export function Counter({ target, suffix = "", duration = 2000 }) {
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

/* ── Skill progress bar ── */
export function SkillBar({ skill, pct, delay = 0 }) {
  const [ref, inView] = useInView(0.3);
  return (
    <div ref={ref} style={{ marginBottom: "1.1rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
        <span className="font-head" style={{ fontSize: ".75rem", letterSpacing: ".1em", textTransform: "uppercase", fontWeight: 600, color: "#9a9a88" }}>{skill}</span>
        <span className="font-head" style={{ fontSize: ".75rem", color: "#F5C518", fontWeight: 700 }}>{pct}%</span>
      </div>
      <div style={{ height: 2.5, background: "#1c1c1c", position: "relative", overflow: "hidden" }}>
        <div style={{
          height: "100%",
          background: "linear-gradient(to right, #F5C518, #fff4a0)",
          width: inView ? `${pct}%` : "0%",
          transition: `width 1.4s cubic-bezier(.4,0,.2,1) ${delay}s`,
        }} />
      </div>
    </div>
  );
}