  import { useState } from "react";
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  // ─── Interest Tags ────────────────────────────────────────────────────────────
  function InterestTag({ label, selected, onToggle }) {
    return (
      <button
        type="button"
        onClick={onToggle}
        style={{
          padding: "4px 12px",
          fontSize: ".65rem",
          letterSpacing: ".15em",
          textTransform: "uppercase",
          fontWeight: 600,
          border: `1px solid ${selected ? "rgba(245,197,24,.6)" : "rgba(245,197,24,.15)"}`,
          background: selected ? "rgba(245,197,24,.08)" : "transparent",
          color: selected ? "#F5C518" : "#4a4a42",
          cursor: "pointer",
          transition: "all .2s",
          borderRadius: 0,
        }}
      >
        {selected ? "✓ " : ""}{label}
      </button>
    );
  }

  // ─── Main Component ───────────────────────────────────────────────────────────
  const INTEREST_OPTIONS = ["Brand Strategy", "Growth Marketing", "Web Design", "Business Building"];

  const PERKS = [
    { icon: "◈", title: "Weekly Strategy Drops", desc: "Actionable brand and marketing insights every Tuesday — no fluff, just frameworks." },
    { icon: "◉", title: "Exclusive Case Studies", desc: "Behind-the-scenes breakdowns of our best campaigns. Numbers included." },
    { icon: "◎", title: "Early Access & Offers", desc: "Subscribers get first access to new services, workshops, and limited agency spots." },
  ];

  export default function Newsletter() {
    const [firstName, setFirstName] = useState("");
    const [email, setEmail]         = useState("");
    const [interests, setInterests] = useState([]);
    const [focused, setFocused]     = useState(null);

    // ui states: "idle" | "loading" | "success" | "duplicate" | "error"
    const [uiState, setUiState]     = useState("idle");
    const [errorMsg, setErrorMsg]   = useState("");

    // ── client-side validation ──────────────────────────────────────────────────
    const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

    const toggleInterest = (label) =>
      setInterests((prev) =>
        prev.includes(label) ? prev.filter((i) => i !== label) : [...prev, label]
      );

    // ── submit ──────────────────────────────────────────────────────────────────
    const handleSubmit = async () => {
      if (!email.trim()) {
        setErrorMsg("Please enter your email address.");
        setUiState("error");
        return;
      }
      if (!isValidEmail(email.trim())) {
        setErrorMsg("That doesn't look like a valid email.");
        setUiState("error");
        return;
      }

      setUiState("loading");
      setErrorMsg("");

      try {
        const res = await fetch(`${BASE_URL}/api/newsletter/subscribe`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName: firstName.trim(),
            email: email.trim().toLowerCase(),
            interests,
          }),
        });

        const data = await res.json();

        if (res.status === 201) {
          setUiState("success");
        } else if (res.status === 409) {
          setUiState("duplicate");
        } else {
          setErrorMsg(data.error || "Something went wrong. Please try again.");
          setUiState("error");
        }
      } catch {
        setErrorMsg("Network error — please check your connection and try again.");
        setUiState("error");
      }
    };

    // ── derived ─────────────────────────────────────────────────────────────────
    const isLoading   = uiState === "loading";
    const isSuccess   = uiState === "success";
    const isDuplicate = uiState === "duplicate";

    // ── render ──────────────────────────────────────────────────────────────────
    return (
      <section
        id="newsletter"
        style={{
          padding: "clamp(4rem,8vw,7rem) clamp(1.2rem,5vw,4rem)",
          background: "#060606",
          position: "relative",
          overflow: "hidden",
          borderTop: "1px solid rgba(245,197,24,.08)",
        }}
      >
        {/* Background decoration */}
        <div
          style={{
            position: "absolute",
            top: "50%", left: "50%",
            transform: "translate(-50%,-50%)",
            width: "min(600px,80vw)", height: "min(600px,80vw)",
            border: "1px solid rgba(245,197,24,.04)",
            borderRadius: "50%",
            pointerEvents: "none",
          }}
        />

        {/* Corner accents */}
        {[
          { top: 24, left: 24, borderTop: "1px solid rgba(245,197,24,.2)", borderLeft: "1px solid rgba(245,197,24,.2)" },
          { top: 24, right: 24, borderTop: "1px solid rgba(245,197,24,.2)", borderRight: "1px solid rgba(245,197,24,.2)" },
          { bottom: 24, left: 24, borderBottom: "1px solid rgba(245,197,24,.2)", borderLeft: "1px solid rgba(245,197,24,.2)" },
          { bottom: 24, right: 24, borderBottom: "1px solid rgba(245,197,24,.2)", borderRight: "1px solid rgba(245,197,24,.2)" },
        ].map((s, i) => (
          <div key={i} style={{ position: "absolute", width: 36, height: 36, ...s }} />
        ))}

        <div style={{ maxWidth: 1240, margin: "0 auto", position: "relative", zIndex: 2 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
              gap: "clamp(3rem,6vw,6rem)",
              alignItems: "center",
            }}
          >
            {/* ── LEFT: Copy + Perks ─────────────────────────────────────────── */}
            <div>
              <div style={{ fontSize: ".7rem", letterSpacing: ".2em", textTransform: "uppercase", color: "#F5C518", marginBottom: "1rem", fontWeight: 600 }}>
                Stay in the Loop
              </div>
              <h2
                style={{
                  fontSize: "clamp(2.4rem,5.5vw,4.5rem)",
                  lineHeight: .92,
                  letterSpacing: ".02em",
                  marginBottom: "1rem",
                  fontWeight: 700,
                  color: "#ede8de",
                }}
              >
                GROW SMARTER.<br />
                <span style={{ color: "#F5C518" }}>EVERY WEEK.</span>
              </h2>
              <p style={{ fontSize: ".93rem", color: "#7a7a6a", lineHeight: 1.8, marginBottom: "2.2rem", fontWeight: 300, maxWidth: 420 }}>
                Join 12,000+ founders, CMOs, and growth operators who get our weekly newsletter. Strategy you can actually use — straight to your inbox.
              </p>

              {/* Perks */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
                {PERKS.map((perk) => (
                  <div key={perk.title} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                    <div
                      style={{
                        width: 40, height: 40,
                        background: "rgba(245,197,24,.08)",
                        border: "1px solid rgba(245,197,24,.18)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        flexShrink: 0, fontSize: "1.1rem", color: "#F5C518",
                      }}
                    >
                      {perk.icon}
                    </div>
                    <div>
                      <div style={{ fontSize: ".85rem", fontWeight: 700, marginBottom: ".25rem", letterSpacing: ".02em", color: "#ede8de" }}>{perk.title}</div>
                      <p style={{ fontSize: ".82rem", color: "#6b6b60", fontWeight: 300, lineHeight: 1.6 }}>{perk.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social proof */}
              <div
                style={{
                  display: "inline-flex", alignItems: "center", gap: 10,
                  marginTop: "2rem",
                  border: "1px solid rgba(245,197,24,.18)",
                  padding: "8px 16px",
                }}
              >
                <div style={{ display: "flex" }}>
                  {["photo-1438761681033-6461ffad8d80", "photo-1506794778202-cad84cf45f1d", "photo-1472099645785-5658abf4ff4e"].map((p, i) => (
                    <div
                      key={p}
                      style={{
                        width: 26, height: 26, borderRadius: "50%", overflow: "hidden",
                        border: "2px solid #060606", marginLeft: i > 0 ? -8 : 0, flexShrink: 0,
                      }}
                    >
                      <img src={`https://images.unsplash.com/${p}?w=60&q=80`} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                  ))}
                </div>
                <span style={{ fontSize: ".78rem", color: "#9a9a88", fontWeight: 300 }}>
                  <span style={{ color: "#F5C518", fontWeight: 500 }}>12,000+</span> subscribers already
                </span>
              </div>
            </div>

            {/* ── RIGHT: Form ────────────────────────────────────────────────── */}
            <div
              style={{
                background: "#0d0d0d",
                border: "1px solid rgba(245,197,24,.18)",
                padding: "clamp(1.8rem,3.5vw,2.8rem)",
                position: "relative",
              }}
            >
              {/* Gold accent bar */}
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(to right, #F5C518, transparent)" }} />

              {/* ── SUCCESS ──────────────────────────────────────────────────── */}
              {isSuccess && (
                <div style={{ textAlign: "center", padding: "2rem 0" }}>
                  <div
                    style={{
                      width: 64, height: 64,
                      background: "rgba(245,197,24,.1)",
                      border: "2px solid #F5C518",
                      borderRadius: "50%",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      margin: "0 auto 1.4rem", fontSize: "1.8rem", color: "#F5C518",
                    }}
                  >✓</div>
                  <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: ".6rem", color: "#ede8de" }}>
                    You're in. Welcome aboard.
                  </h3>
                  <p style={{ fontSize: ".87rem", color: "#6b6b60", lineHeight: 1.7, fontWeight: 300 }}>
                    Check your inbox for a verification link — then your first issue lands next Tuesday.
                  </p>
                  <div style={{ marginTop: "1.4rem", color: "#F5C518", fontSize: ".72rem", letterSpacing: ".2em", textTransform: "uppercase", fontWeight: 600 }}>
                    ✦ See you inside
                  </div>
                </div>
              )}

              {/* ── DUPLICATE ────────────────────────────────────────────────── */}
              {isDuplicate && (
                <div style={{ textAlign: "center", padding: "2rem 0" }}>
                  <div style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>◉</div>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: ".5rem", color: "#ede8de" }}>Already subscribed!</h3>
                  <p style={{ fontSize: ".87rem", color: "#6b6b60", lineHeight: 1.7, fontWeight: 300 }}>
                    This email is already on the list. Check your inbox — or your spam folder.
                  </p>
                </div>
              )}

              {/* ── FORM ─────────────────────────────────────────────────────── */}
              {!isSuccess && !isDuplicate && (
                <>
                  <div style={{ marginBottom: "1.6rem" }}>
                    <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: ".4rem", color: "#ede8de" }}>
                      Get the Weekly Edge
                    </h3>
                    <p style={{ fontSize: ".82rem", color: "#6b6b60", fontWeight: 300 }}>
                      Free. No spam. Unsubscribe instantly.
                    </p>
                  </div>

                  {/* First name */}
                  <div style={{ marginBottom: 10 }}>
                    <input
                      type="text"
                      placeholder="First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      disabled={isLoading}
                      style={{
                        display: "block", width: "100%",
                        background: "#111",
                        border: `1px solid ${focused === "name" ? "rgba(245,197,24,.6)" : "rgba(245,197,24,.15)"}`,
                        padding: "12px 14px", color: "#ede8de", fontSize: ".88rem", fontWeight: 300,
                        outline: "none", fontFamily: "inherit", transition: "border-color .25s",
                        boxSizing: "border-box", opacity: isLoading ? 0.6 : 1,
                      }}
                      onFocus={() => setFocused("name")}
                      onBlur={() => setFocused(null)}
                    />
                  </div>

                  {/* Email + button */}
                  <div style={{ display: "flex", gap: 8, marginBottom: "1rem" }}>
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); if (uiState === "error") setUiState("idle"); }}
                      onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                      disabled={isLoading}
                      style={{
                        flex: 1, minWidth: 0,
                        background: "#111",
                        border: `1px solid ${
                          uiState === "error" ? "rgba(220,60,60,.6)"
                          : focused === "email" ? "rgba(245,197,24,.6)"
                          : "rgba(245,197,24,.15)"
                        }`,
                        padding: "12px 14px", color: "#ede8de", fontSize: ".88rem", fontWeight: 300,
                        outline: "none", fontFamily: "inherit", transition: "border-color .25s",
                        opacity: isLoading ? 0.6 : 1,
                      }}
                      onFocus={() => setFocused("email")}
                      onBlur={() => setFocused(null)}
                    />
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={isLoading}
                      style={{
                        padding: "12px 20px", fontSize: ".8rem", letterSpacing: ".12em",
                        textTransform: "uppercase", fontWeight: 700,
                        background: isLoading ? "rgba(245,197,24,.5)" : "#F5C518",
                        color: "#000", border: "none", borderRadius: 0,
                        cursor: isLoading ? "not-allowed" : "pointer",
                        whiteSpace: "nowrap", flexShrink: 0,
                        transition: "background .2s",
                      }}
                    >
                      {isLoading ? "…" : "Join →"}
                    </button>
                  </div>

                  {/* Error message */}
                  {uiState === "error" && errorMsg && (
                    <div style={{ fontSize: ".78rem", color: "#e05555", marginBottom: ".8rem", fontWeight: 400 }}>
                      ⚠ {errorMsg}
                    </div>
                  )}

                  {/* Interest tags */}
                  <div style={{ marginBottom: "1.4rem" }}>
                    <div style={{ fontSize: ".65rem", letterSpacing: ".2em", textTransform: "uppercase", color: "#3a3a33", marginBottom: ".6rem", fontWeight: 600 }}>
                      I'm most interested in:
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {INTEREST_OPTIONS.map((tag) => (
                        <InterestTag
                          key={tag}
                          label={tag}
                          selected={interests.includes(tag)}
                          onToggle={() => toggleInterest(tag)}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Trust line */}
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ color: "#F5C518", fontSize: ".7rem" }}>◆</span>
                    <span style={{ fontSize: ".72rem", color: "#3a3a33", fontWeight: 300 }}>
                      No spam, ever. Unsubscribe in one click.
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }