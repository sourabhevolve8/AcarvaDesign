import { useState, useEffect, useMemo } from "react";
import { Reveal, SectionLabel } from "./UI";
import { DUMMY_BLOGS, DUMMY_GUIDES, DUMMY_WEBINARS } from "../data/Constants";
import ResourceCard from "./ResourceCard";

const TABS = [
  { key: "all",     label: "All Resources" },
  { key: "blog",    label: "Blogs"         },
  { key: "guide",   label: "Guides"        },
  { key: "webinar", label: "Webinars"      },
];

export default function Resources({ onOpenResource, initialTab = "all" }) {
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const allItems = useMemo(() => {
    const combined = [
      ...DUMMY_BLOGS.map(b => ({ ...b, _type: "blog" })),
      ...DUMMY_GUIDES.map(g => ({ ...g, _type: "guide" })),
      ...DUMMY_WEBINARS.map(w => ({ ...w, _type: "webinar" })),
    ];
    for (let i = combined.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [combined[i], combined[j]] = [combined[j], combined[i]];
    }
    return combined;
  }, []);

  const filtered = activeTab === "all"
    ? allItems
    : allItems.filter(i => i._type === activeTab);

  const count = filtered.length;

  return (
    <div style={{ background: "#060606", minHeight: "100vh" }}>
      <style>{`
        /* Mobile tab bar: scrollable, no wrap */
        .resources-subnav-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          flex-wrap: wrap;
          height: 52px;
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 clamp(1.2rem, 5vw, 4rem);
        }
        .resources-tabs {
          display: flex;
          gap: 4px;
          align-items: center;
        }
        .resources-count {
          font-size: .75rem;
          color: #4a4a42;
          font-weight: 300;
          white-space: nowrap;
          flex-shrink: 0;
        }

        @media (max-width: 600px) {
          .resources-subnav-inner {
            height: auto;
            padding: 10px clamp(.8rem, 4vw, 1.2rem);
            flex-wrap: nowrap;
            gap: .6rem;
          }
          .resources-tabs {
            flex: 1;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
            gap: 3px;
          }
          .resources-tabs::-webkit-scrollbar { display: none; }
          .resources-tab-btn {
            flex-shrink: 0 !important;
            padding: 5px 10px !important;
            font-size: .65rem !important;
          }
        }
      `}</style>

      {/* ── Resources sub-nav ── */}
      <div style={{
        position: "sticky",
        top: 52,
        zIndex: 90,
        background: "rgba(6,6,6,0.97)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        borderBottom: "1px solid rgba(245,197,24,.1)",
      }}>
        <div className="resources-subnav-inner">
          <div className="resources-tabs">
            {TABS.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className="font-head resources-tab-btn"
                style={{
                  padding: "6px 14px",
                  fontSize: ".72rem",
                  letterSpacing: ".14em",
                  textTransform: "uppercase",
                  fontWeight: 700,
                  background: activeTab === tab.key ? "#F5C518" : "transparent",
                  color: activeTab === tab.key ? "#000" : "#6a6a5a",
                  border: activeTab === tab.key ? "none" : "1px solid rgba(245,197,24,.15)",
                  borderRadius: 2,
                  cursor: "pointer",
                  transition: "all .2s ease",
                  whiteSpace: "nowrap",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <span className="font-body resources-count">
            {count} resource{count !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* ── Page header ── */}
      <div style={{
        padding: "clamp(2rem,5vw,5rem) clamp(1rem,5vw,4rem) clamp(1.5rem,3vw,3rem)",
        maxWidth: 1240,
        margin: "0 auto",
      }}>
        <Reveal>
          <SectionLabel>Knowledge & Insights</SectionLabel>
          <h1 className="font-display" style={{
            fontSize: "clamp(2rem,7vw,6rem)",
            lineHeight: .92, letterSpacing: ".02em",
            marginBottom: "1rem",
          }}>
            RESOURCES<br />
            <span style={{ color: "#F5C518" }}>& LEARNING</span>
          </h1>
          <p className="font-body" style={{
            fontSize: "clamp(.82rem,.95rem,1rem)",
            color: "#6b6b60", fontWeight: 300, lineHeight: 1.8, maxWidth: 520,
          }}>
            Blogs, step-by-step guides, and live webinars — everything you need to build and scale your startup brand.
          </p>
        </Reveal>
      </div>

      {/* ── Grid ── */}
      <div style={{
        padding: "0 clamp(1rem,5vw,4rem) clamp(4rem,8vw,7rem)",
        maxWidth: 1240,
        margin: "0 auto",
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))",
          gap: 12,
        }}>
          {filtered.length === 0 ? (
            <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "5rem 0" }}>
              <p className="font-display" style={{ fontSize: "3rem", color: "rgba(245,197,24,.1)", marginBottom: "1rem" }}>—</p>
              <p className="font-body" style={{ color: "#4a4a42", fontWeight: 300 }}>No {activeTab === "all" ? "resources" : activeTab + "s"} yet.</p>
            </div>
          ) : (
            filtered.map(item => (
              <Reveal key={`${item._type}-${item._id}`} delay={0.04}>
                <ResourceCard
                  item={item}
                  type={item._type}
                  onClick={onOpenResource}
                />
              </Reveal>
            ))
          )}
        </div>
      </div>
    </div>
  );
}