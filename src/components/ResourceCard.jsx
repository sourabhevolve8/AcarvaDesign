import { useState } from "react";

export const TYPE_COLORS = {
  blog:    "#F5C518",
  guide:   "#4ecdc4",
  webinar: "#ff6b6b",
};

export const TYPE_LABELS = {
  blog:    "Blog",
  guide:   "Guide",
  webinar: "Webinar",
};

export function formatDate(dateStr) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric",
  });
}

export default function ResourceCard({ item, type, onClick }) {
  const [hovered, setHovered] = useState(false);
  const accent = TYPE_COLORS[type];
  const author = item.author || item.host || {};

  return (
    <div
      onClick={() => onClick(item, type)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        border: `1px solid ${hovered ? "rgba(245,197,24,.3)" : "rgba(245,197,24,.1)"}`,
        background: hovered ? "#0d0d0d" : "#0a0a0a",
        cursor: "pointer",
        transition: "border-color .25s, background .25s, transform .25s",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        WebkitTapHighlightColor: "transparent",
      }}
    >
      {/* Cover image */}
      <div style={{ position: "relative", height: "clamp(160px,20vw,220px)", overflow: "hidden", flexShrink: 0 }}>
        <img
          src={item.image}
          alt={item.title}
          style={{
            width: "100%", height: "100%", objectFit: "cover",
            transition: "transform .4s ease",
            transform: hovered ? "scale(1.04)" : "scale(1)",
          }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(6,6,6,.85) 0%, rgba(6,6,6,.1) 60%, transparent 100%)" }} />

        {/* Type badge */}
        <div style={{
          position: "absolute", top: 12, left: 12,
          display: "flex", alignItems: "center", gap: 6,
          background: "rgba(6,6,6,.85)", backdropFilter: "blur(8px)",
          border: `1px solid ${accent}40`, padding: "4px 10px",
        }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: accent, display: "inline-block", flexShrink: 0 }} />
          <span className="font-head" style={{ fontSize: ".6rem", letterSpacing: ".2em", textTransform: "uppercase", color: accent, fontWeight: 700 }}>
            {TYPE_LABELS[type]}
          </span>
        </div>

        {/* Webinar status badge */}
        {type === "webinar" && item.status && (
          <div style={{
            position: "absolute", top: 12, right: 12,
            background: item.status === "Live" ? "#ff6b6b" : item.status === "Completed" ? "#444" : "rgba(6,6,6,.85)",
            border: item.status === "Live" ? "none" : "1px solid rgba(255,255,255,.1)",
            padding: "4px 10px",
          }}>
            <span className="font-head" style={{ fontSize: ".58rem", letterSpacing: ".18em", textTransform: "uppercase", color: "#fff", fontWeight: 700 }}>
              {item.status === "Live" ? "● LIVE" : item.status}
            </span>
          </div>
        )}

        {/* Guide difficulty badge */}
        {type === "guide" && item.difficulty && (
          <div style={{
            position: "absolute", top: 12, right: 12,
            background: "rgba(6,6,6,.85)", border: "1px solid rgba(78,205,196,.3)",
            padding: "4px 10px",
          }}>
            <span className="font-head" style={{ fontSize: ".58rem", letterSpacing: ".18em", textTransform: "uppercase", color: "#4ecdc4", fontWeight: 700 }}>
              {item.difficulty}
            </span>
          </div>
        )}
      </div>

      {/* Card body */}
      <div style={{ padding: "1.1rem 1.2rem 1.3rem", display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
        {item.category && (
          <span className="font-head" style={{ fontSize: ".6rem", letterSpacing: ".2em", textTransform: "uppercase", color: accent, fontWeight: 600 }}>
            {item.category}
          </span>
        )}

        <h3 className="font-head" style={{
          fontSize: "clamp(.9rem,1.4vw,1rem)", color: "#ede8de", fontWeight: 700,
          lineHeight: 1.35, letterSpacing: ".02em",
          display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
        }}>
          {item.title}
        </h3>

        <p className="font-body" style={{
          fontSize: ".82rem", color: "#6b6b60", lineHeight: 1.6, fontWeight: 300,
          display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
          margin: 0,
        }}>
          {item.headline}
        </p>

        {type === "webinar" && item.scheduledAt && (
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ color: "#ff6b6b", fontSize: ".75rem" }}>📅</span>
            <span className="font-body" style={{ fontSize: ".75rem", color: "#7a7a6a", fontWeight: 300 }}>
              {formatDate(item.scheduledAt)}{item.duration ? ` · ${item.duration}` : ""}
            </span>
          </div>
        )}

        {type === "guide" && item.readTime && (
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ color: "#4ecdc4", fontSize: ".75rem" }}>⏱</span>
            <span className="font-body" style={{ fontSize: ".75rem", color: "#7a7a6a", fontWeight: 300 }}>{item.readTime}</span>
          </div>
        )}

        <div style={{ height: 1, background: "rgba(245,197,24,.08)", margin: "4px 0" }} />

        {/* Author + date */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {author.avatar ? (
              <img src={author.avatar} alt={author.name} style={{ width: 26, height: 26, borderRadius: "50%", objectFit: "cover", border: `1px solid ${accent}40` }} />
            ) : (
              <div style={{ width: 26, height: 26, borderRadius: "50%", background: `${accent}20`, border: `1px solid ${accent}40`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span className="font-head" style={{ fontSize: ".55rem", color: accent, fontWeight: 700 }}>
                  {(author.name || "A").charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            <span className="font-body" style={{ fontSize: ".75rem", color: "#7a7a6a", fontWeight: 300 }}>{author.name}</span>
          </div>
          <span className="font-body" style={{ fontSize: ".7rem", color: "#4a4a44", fontWeight: 300 }}>
            {formatDate(type === "webinar" ? item.scheduledAt : item.createdAt)}
          </span>
        </div>
      </div>

      {/* Bottom accent line on hover */}
      <div style={{
        position: "absolute", bottom: 0, left: 0,
        width: hovered ? "100%" : "0%",
        height: 2, background: accent,
        transition: "width .3s ease",
      }} />
    </div>
  );
}