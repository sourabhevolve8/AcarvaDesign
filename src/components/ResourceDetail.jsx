import { useEffect } from "react";

const TYPE_COLORS = {
  blog:    "#F5C518",
  guide:   "#4ecdc4",
  webinar: "#ff6b6b",
};

const TYPE_LABELS = {
  blog:    "Blog",
  guide:   "Guide",
  webinar: "Webinar",
};

function formatDate(dateStr) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long", day: "numeric", year: "numeric",
  });
}

export default function ResourceDetail({ item, type, onBack }) {
  const accent = TYPE_COLORS[type] || "#F5C518";
  const author = item?.author || item?.host || {};

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [item?._id]);

  if (!item) return null;

  return (
    <div style={{ background: "#060606", minHeight: "100vh" }}>
      <style>{`
        .resource-content p { margin-bottom: 1.4rem; }
        .resource-content h1, .resource-content h2, .resource-content h3 {
          font-family: inherit; color: #ede8de;
          margin: 2rem 0 .8rem; line-height: 1.2;
        }
        .resource-content h2 { font-size: clamp(1.1rem,2.5vw,1.8rem); }
        .resource-content h3 { font-size: clamp(1rem,2vw,1.4rem); color: ${accent}; }
        .resource-content ul, .resource-content ol { padding-left: 1.4rem; margin-bottom: 1.4rem; }
        .resource-content li { margin-bottom: .5rem; color: #7a7a6a; line-height: 1.8; }
        .resource-content a { color: #F5C518; text-decoration: underline; }
        .resource-content blockquote {
          border-left: 3px solid ${accent}; margin: 1.6rem 0;
          padding: .8rem 1.2rem; background: rgba(245,197,24,.04);
          color: #9a9a88; font-style: italic;
        }
        .resource-content strong { color: #ede8de; }
        .resource-content code {
          background: rgba(245,197,24,.08); padding: 2px 6px;
          font-family: monospace; font-size: .88em; color: #F5C518;
        }
        .resource-content pre {
          background: #0d0d0d; border: 1px solid rgba(245,197,24,.1);
          padding: 1.2rem; overflow-x: auto; margin-bottom: 1.4rem;
        }
        .resource-content pre code { background: none; padding: 0; color: #ede8de; }
        .resource-content img { max-width: 100%; margin: 1.6rem 0; }
        .back-btn:hover { color: #F5C518 !important; }

        /* ── Mobile overrides ── */
        @media (max-width: 600px) {
          .rd-hero { height: 220px !important; }
          .rd-back-btn {
            top: calc(72px + 12px) !important;
            left: 1rem !important;
            padding: 6px 10px !important;
            font-size: .62rem !important;
          }
          .rd-badges {
            bottom: 14px !important;
            left: 1rem !important;
            gap: 6px !important;
          }
          .rd-content-area {
            padding: 1.4rem 1rem 3rem !important;
          }
          .rd-title {
            font-size: clamp(1.6rem, 6vw, 2.4rem) !important;
            margin-bottom: .8rem !important;
          }
          .rd-headline {
            font-size: .88rem !important;
            margin-bottom: 1.4rem !important;
          }
          .rd-meta-row {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: .8rem !important;
            margin-bottom: 1.6rem !important;
            padding-bottom: 1.4rem !important;
          }
          .rd-divider { display: none !important; }
          .rd-webinar-cta {
            flex-direction: column !important;
            align-items: flex-start !important;
            padding: 1rem !important;
            margin-bottom: 1.6rem !important;
          }
          .rd-webinar-cta-btn {
            width: 100% !important;
            text-align: center !important;
          }
        }
      `}</style>

      {/* ── Hero banner ── */}
      <div className="rd-hero" style={{ position: "relative", height: "clamp(220px,40vw,480px)", overflow: "hidden" }}>
        <img
          src={item.image}
          alt={item.title}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #060606 0%, rgba(6,6,6,.6) 50%, rgba(6,6,6,.2) 100%)" }} />

        {/* Back button */}
        <button
          onClick={onBack}
          className="back-btn rd-back-btn font-head"
          style={{
            position: "absolute", top: "calc(72px + 16px)", left: "clamp(1rem,5vw,4rem)",
            display: "flex", alignItems: "center", gap: 8,
            background: "rgba(6,6,6,.75)", backdropFilter: "blur(10px)",
            border: "1px solid rgba(245,197,24,.2)",
            color: "#9a9a88", padding: "8px 16px",
            fontSize: ".72rem", letterSpacing: ".16em", textTransform: "uppercase",
            fontWeight: 700, cursor: "pointer", transition: "color .2s",
            whiteSpace: "nowrap",
          }}
        >
          ← Back
        </button>

        {/* Type + category + status badges */}
        <div className="rd-badges" style={{
          position: "absolute", bottom: 28, left: "clamp(1rem,5vw,4rem)",
          display: "flex", gap: 8, flexWrap: "wrap",
        }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            background: "rgba(6,6,6,.85)", backdropFilter: "blur(8px)",
            border: `1px solid ${accent}50`, padding: "5px 12px",
          }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: accent, flexShrink: 0 }} />
            <span className="font-head" style={{ fontSize: ".62rem", letterSpacing: ".2em", textTransform: "uppercase", color: accent, fontWeight: 700 }}>
              {TYPE_LABELS[type]}
            </span>
          </div>

          {item.category && (
            <div style={{
              background: "rgba(6,6,6,.75)", backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,.1)", padding: "5px 12px",
            }}>
              <span className="font-head" style={{ fontSize: ".62rem", letterSpacing: ".2em", textTransform: "uppercase", color: "#9a9a88", fontWeight: 700 }}>
                {item.category}
              </span>
            </div>
          )}

          {type === "webinar" && item.status && (
            <div style={{
              background: item.status === "Live" ? "#ff6b6b" : "rgba(6,6,6,.75)",
              border: item.status === "Live" ? "none" : "1px solid rgba(255,255,255,.1)",
              padding: "5px 12px",
            }}>
              <span className="font-head" style={{ fontSize: ".62rem", letterSpacing: ".18em", textTransform: "uppercase", color: "#fff", fontWeight: 700 }}>
                {item.status === "Live" ? "● LIVE NOW" : item.status}
              </span>
            </div>
          )}

          {type === "guide" && item.difficulty && (
            <div style={{ background: "rgba(6,6,6,.75)", border: "1px solid rgba(78,205,196,.3)", padding: "5px 12px" }}>
              <span className="font-head" style={{ fontSize: ".62rem", letterSpacing: ".18em", textTransform: "uppercase", color: "#4ecdc4", fontWeight: 700 }}>
                {item.difficulty}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* ── Content area ── */}
      <div
        className="rd-content-area"
        style={{
          maxWidth: 800, margin: "0 auto",
          padding: "clamp(1.6rem,5vw,4rem) clamp(1rem,5vw,4rem) clamp(4rem,8vw,7rem)",
        }}
      >

        {/* Title */}
        <h1 className="font-display rd-title" style={{
          fontSize: "clamp(1.8rem,5vw,3.8rem)",
          lineHeight: .95, letterSpacing: ".02em",
          marginBottom: "1.2rem", color: "#ede8de",
        }}>
          {item.title}
        </h1>

        {/* Headline */}
        <p className="font-body rd-headline" style={{
          fontSize: "clamp(.88rem,1.8vw,1.15rem)",
          color: "#7a7a6a", lineHeight: 1.7, fontWeight: 300,
          marginBottom: "2rem",
          borderLeft: `3px solid ${accent}`,
          paddingLeft: "1.2rem",
        }}>
          {item.headline}
        </p>

        {/* Meta row */}
        <div
          className="rd-meta-row"
          style={{
            display: "flex", flexWrap: "wrap", alignItems: "center",
            gap: "1.2rem", marginBottom: "2.5rem",
            paddingBottom: "2rem",
            borderBottom: "1px solid rgba(245,197,24,.1)",
          }}
        >
          {/* Author */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {author.avatar ? (
              <img src={author.avatar} alt={author.name} style={{ width: 38, height: 38, borderRadius: "50%", objectFit: "cover", border: `2px solid ${accent}40`, flexShrink: 0 }} />
            ) : (
              <div style={{ width: 38, height: 38, borderRadius: "50%", background: `${accent}15`, border: `2px solid ${accent}30`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span className="font-head" style={{ fontSize: ".8rem", color: accent, fontWeight: 700 }}>
                  {(author.name || "A").charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            <div>
              <div className="font-head" style={{ fontSize: ".78rem", color: "#ede8de", fontWeight: 700, letterSpacing: ".06em" }}>{author.name}</div>
              {author.bio && <div className="font-body" style={{ fontSize: ".7rem", color: "#5a5a52", fontWeight: 300 }}>{author.bio}</div>}
            </div>
          </div>

          {/* Date */}
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span className="rd-divider" style={{ width: 1, height: 20, background: "rgba(255,255,255,.08)", display: "inline-block" }} />
            <span className="font-body" style={{ fontSize: ".78rem", color: "#5a5a52", fontWeight: 300 }}>
              {formatDate(type === "webinar" ? item.scheduledAt : item.createdAt)}
            </span>
          </div>

          {/* Guide readTime */}
          {type === "guide" && item.readTime && (
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span className="rd-divider" style={{ width: 1, height: 20, background: "rgba(255,255,255,.08)", display: "inline-block" }} />
              <span className="font-body" style={{ fontSize: ".78rem", color: "#4ecdc4", fontWeight: 300 }}>⏱ {item.readTime}</span>
            </div>
          )}

          {/* Webinar duration */}
          {type === "webinar" && item.duration && (
            <span className="font-body" style={{ fontSize: ".78rem", color: "#ff6b6b", fontWeight: 300 }}>⏱ {item.duration}</span>
          )}
        </div>

        {/* Webinar meet link CTA */}
        {type === "webinar" && item.meetLink && (
          <div
            className="rd-webinar-cta"
            style={{
              marginBottom: "2.5rem",
              padding: "1.4rem 1.6rem",
              background: "rgba(255,107,107,.06)",
              border: "1px solid rgba(255,107,107,.2)",
              display: "flex", flexWrap: "wrap", alignItems: "center",
              justifyContent: "space-between", gap: "1rem",
            }}
          >
            <div>
              <div className="font-head" style={{ fontSize: ".78rem", letterSpacing: ".14em", textTransform: "uppercase", color: "#ff6b6b", fontWeight: 700, marginBottom: 4 }}>
                {item.status === "Live" ? "● Happening Now" : item.status === "Upcoming" ? "Join the Session" : "Watch Recording"}
              </div>
              <div className="font-body" style={{ fontSize: ".84rem", color: "#7a7a6a", fontWeight: 300 }}>
                {item.status === "Completed"
                  ? "This webinar has ended. Recording may be available."
                  : `Scheduled for ${formatDate(item.scheduledAt)}`}
              </div>
            </div>
            {item.status !== "Completed" && (
              <a
                href={item.meetLink}
                target="_blank"
                rel="noopener noreferrer"
                className="font-head rd-webinar-cta-btn"
                style={{
                  padding: "10px 22px", background: "#ff6b6b", color: "#fff",
                  border: "none", borderRadius: 2, cursor: "pointer",
                  fontSize: ".78rem", letterSpacing: ".14em", textTransform: "uppercase",
                  fontWeight: 700, textDecoration: "none", display: "inline-block",
                  transition: "opacity .2s",
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = ".85"}
                onMouseLeave={e => e.currentTarget.style.opacity = "1"}
              >
                {item.status === "Live" ? "Join Now →" : "Join Session →"}
              </a>
            )}
          </div>
        )}

        {/* Main content */}
        <div
          className="resource-content font-body"
          style={{ fontSize: "clamp(.88rem,1.5vw,1rem)", color: "#7a7a6a", lineHeight: 1.85, fontWeight: 300 }}
          dangerouslySetInnerHTML={{ __html: item.content }}
        />
      </div>
    </div>
  );
}