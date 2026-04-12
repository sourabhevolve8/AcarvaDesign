# Acarva Design — Agency Landing Page

A full-featured, cinematic agency landing page built entirely in React — no CSS frameworks, no UI libraries, zero external dependencies beyond React itself.

![React](https://img.shields.io/badge/React-18+-61DAFB?style=flat-square&logo=react&logoColor=black)
![License](https://img.shields.io/badge/License-MIT-F5C518?style=flat-square)
![Style](https://img.shields.io/badge/Styling-Inline%20CSS-white?style=flat-square)

---

## ✦ Loading Screen

A cinematic intro sequence plays on every page load before revealing the site.

- Animated progress counter (0–100%) with multi-phase pacing — fast start, intentional mid-pause, quick finish
- 28-bar audio equalizer that fills gold in sync with the progress value
- Glitch effect randomly distorts the wordmark with chromatic aberration (gold/red split)
- Three expanding pulse rings radiate outward from center
- Sweeping scan line passes across the full screen on loop
- Film grain noise overlay with subtle flicker
- Phase-aware status text updates as loading progresses
- Smooth scale-fade transition out into the main page

---

## ✦ Hero Section

- Giant display headline with a shimmer gradient animation on the key word
- Mouse-tracked radial gold glow that follows the cursor across the background
- Floating team photo with a slow vertical oscillation animation
- Live animated stat counters (250+ brands, 12M+ revenue, etc.) that count up on scroll
- Two CTA buttons with hover lift and color-fill transitions
- Rotating decorative rings and a subtle grid dot pattern in the background
- Scroll indicator with a bouncing animation

---

## ✦ Animations & Interactions

- Every section fades and slides into view using `IntersectionObserver` — no scroll libraries needed
- Staggered reveal delays on grids so cards animate in sequence rather than all at once
- Service cards lift on hover and reveal an "Explore →" label
- Work cards zoom the image and show a circular arrow overlay on hover
- Skill bars animate from 0% to their target width when scrolled into view
- Testimonial slider auto-cycles every 5 seconds with smooth opacity and Y-translate transitions
- Navbar transitions from transparent to frosted glass with a gold border as you scroll down

---

## ✦ Sections

| Section | What's inside |
|---|---|
| **Navbar** | Transparent → glass on scroll, mobile hamburger with animated open/close |
| **Marquee** | Infinite scrolling client ticker with alternating gold and muted labels |
| **Services** | 6-card grid with icon, tag badge, description, and hover reveal |
| **About** | Overlapping image collage, animated skill bars, and a revenue stat badge |
| **Work** | 6-card portfolio grid with image zoom and overlay on hover |
| **Process** | 4-step timeline with a connecting line between numbered gold squares |
| **Team** | 4-card grid with image zoom on hover |
| **Testimonials** | Auto-cycling slider with dot indicators and prev/next buttons |
| **Pricing** | 3-tier cards with a featured plan that scales up and glows |
| **CTA Banner** | Split layout with a lead capture form and animated background rings |
| **Footer** | Multi-column with contact info, nav links, and social icon buttons |

---

## ✦ Mobile

- All grids collapse to single column (services, work, pricing)
- Team renders as a 2×2 grid instead of a stack
- Hero CTAs go full-width and stack vertically
- Hamburger menu slides open with a smooth max-height transition
- All type sizes use `clamp()` so nothing feels too small or too large at any viewport
- Touch targets are generously sized throughout

---

```
SERVICES · STATS · WORK · TESTIMONIALS · TEAM · PROCESS · PRICING · CLIENTS
```

To retheme, find and replace `#F5C518` with your brand color. The CSS custom properties `--gold`, `--gold-glow`, and `--gold-border` at the top of `GlobalStyles` control the rest.

---

## Stack

React 18 &nbsp;·&nbsp; Inline CSS + keyframe injection &nbsp;·&nbsp; Google Fonts (Bebas Neue, Syne, DM Sans) &nbsp;·&nbsp; IntersectionObserver API &nbsp;·&nbsp; Zero UI libraries

---

MIT © 2025 Acarva Design
