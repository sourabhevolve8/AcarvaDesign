import { Reveal, SectionLabel } from "./UI";
import { BLOG_POSTS } from "../data/Constants";

export default function Blog({ scrollTo }) {
  return (
    <section id="blog" className="section-pad" style={{ padding: "clamp(4rem,8vw,7rem) clamp(1.2rem,5vw,4rem)", background: "#080808", borderTop: "1px solid rgba(245,197,24,.08)" }}>
      <div style={{ maxWidth: 1240, margin: "0 auto" }}>
        <Reveal>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "1.2rem", marginBottom: "clamp(2.5rem,5vw,4rem)" }}>
            <div>
              <SectionLabel>Insights & Ideas</SectionLabel>
              <h2 className="font-display section-h2" style={{ fontSize: "clamp(2.6rem,6vw,5rem)", lineHeight: .95, letterSpacing: ".02em" }}>
                FROM THE <span style={{ color: "#F5C518" }}>BLOG</span>
              </h2>
            </div>
            <button
              className="btn-outline font-head"
              style={{ padding: "10px 22px", fontSize: ".78rem", letterSpacing: ".14em", textTransform: "uppercase", fontWeight: 700, border: "1.5px solid rgba(245,197,24,.35)", color: "#F5C518", background: "transparent", borderRadius: 2, cursor: "pointer" }}>
              All Articles →
            </button>
          </div>
        </Reveal>

        <div className="blog-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 340px), 1fr))", gap: 14 }}>
          {BLOG_POSTS.map((post, i) => (
            <Reveal key={post.title} delay={i * 0.1}>
              <article
                className="blog-card"
                style={{
                  background: "#0d0d0d",
                  border: "1px solid rgba(245,197,24,.12)",
                  overflow: "hidden",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Image */}
                <div style={{ height: "clamp(180px,22vw,240px)", overflow: "hidden", flexShrink: 0 }}>
                  <img
                    className="blog-img"
                    src={post.img}
                    alt={post.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>

                {/* Content */}
                <div style={{ padding: "clamp(1.2rem,2vw,1.8rem)", display: "flex", flexDirection: "column", flex: 1 }}>
                  {/* Tag + meta row */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem", flexWrap: "wrap", gap: 8 }}>
                    <span className="font-head" style={{
                      fontSize: ".62rem", letterSpacing: ".2em", textTransform: "uppercase",
                      color: "#F5C518", fontWeight: 600,
                      border: "1px solid rgba(245,197,24,.2)", padding: "3px 10px",
                    }}>
                      {post.tag}
                    </span>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span className="font-body" style={{ fontSize: ".72rem", color: "#3a3a33", fontWeight: 300 }}>{post.date}</span>
                      <span style={{ width: 3, height: 3, background: "#3a3a33", borderRadius: "50%", display: "inline-block" }} />
                      <span className="font-body" style={{ fontSize: ".72rem", color: "#3a3a33", fontWeight: 300 }}>{post.readTime}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-head" style={{
                    fontSize: "clamp(.95rem,1.4vw,1.1rem)", fontWeight: 700,
                    lineHeight: 1.35, marginBottom: ".8rem",
                    color: "#ede8de",
                    letterSpacing: ".01em",
                  }}>
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="font-body" style={{
                    fontSize: ".85rem", color: "#6b6b60", lineHeight: 1.7,
                    fontWeight: 300, marginBottom: "1.4rem", flex: 1,
                  }}>
                    {post.excerpt}
                  </p>

                  {/* Author + CTA */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid rgba(245,197,24,.07)", paddingTop: "1rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 32, height: 32, borderRadius: "50%", overflow: "hidden", border: "1.5px solid rgba(245,197,24,.25)", flexShrink: 0 }}>
                        <img src={post.author.avatar} alt={post.author.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      </div>
                      <span className="font-head" style={{ fontSize: ".72rem", color: "#9a9a88", fontWeight: 600 }}>{post.author.name}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#F5C518", fontSize: ".72rem", fontWeight: 600, letterSpacing: ".15em", textTransform: "uppercase" }}>
                      <span className="font-head">Read</span>
                      <span style={{ fontSize: ".9rem" }}>→</span>
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Bottom CTA */}
        <Reveal delay={0.3}>
          <div style={{
            marginTop: "clamp(2.5rem,4vw,3.5rem)",
            padding: "clamp(1.5rem,3vw,2.2rem) clamp(1.5rem,4vw,3rem)",
            border: "1px solid rgba(245,197,24,.12)",
            background: "rgba(245,197,24,.02)",
            display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1.2rem",
          }}>
            <div>
              <div className="font-head" style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: ".3rem" }}>
                Want expert insights in your inbox?
              </div>
              <p className="font-body" style={{ fontSize: ".85rem", color: "#6b6b60", fontWeight: 300 }}>
                Subscribe to the newsletter — strategy, branding, and growth delivered weekly.
              </p>
            </div>
            <button
              onClick={() => {
                const el = document.getElementById("newsletter");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="btn-primary font-head gold-bg"
              style={{ padding: "12px 28px", fontSize: ".8rem", letterSpacing: ".14em", textTransform: "uppercase", fontWeight: 700, color: "#000", border: "none", borderRadius: 2, cursor: "pointer", whiteSpace: "nowrap" }}>
              Subscribe Free →
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}