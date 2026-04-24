## EcoBridge — Award-grade hackathon site

A cinematic, dark-meets-cream product site for EcoBridge with a working AI demo (user-pasted Gemini key) and a separate `/team` route. Built to feel like a $10M-funded startup.

### Pages & routes
- `/` — Home (all marketing sections + interactive demo)
- `/team` — Vision + team grid

### Sections on `/`
1. **Sticky nav** — transparent → solid charcoal on scroll, mobile drawer, "Try Demo" orange CTA
2. **Hero** — full-viewport charcoal, animated particle/gradient mesh, word-by-word headline, dual CTAs, pulsing scroll cue, split-screen reveal on scroll (supply-chain SVG ↔ skill radar bloom)
3. **The Problem** — cream bg, two stat cards sliding in opposite directions, centered punchline
4. **One platform, three engines** — tabbed/horizontal interactive layout for ScopeMap, CareerShift, Connector Layer (each with its own animated mockup)
5. **The Flywheel** — dark, SVG circle drawn on scroll, glowing arrows, three micro-stats, centered quote
6. **How it works — User stories** — split layout (Rahul dark / Priya light) with AI-generated cinematic imagery
7. **Live Demo** — browser-frame mockup with two tabs:
   - **Business** — 3-step wizard (basics, suppliers table w/ sample data, workforce) → premium loading overlay → results: emissions bar chart, CSRD circular score, talent grid (6 cards), summary card
   - **Worker** — LinkedIn mock OAuth → quick form → loading overlay → top-3 career match cards w/ radar, salary projections, 90-day roadmap timeline
   - **AI Chat** — third tab; API key input, example prompt chips, typing indicator, conversation history, clear button, calls Gemini `gemini-1.5-flash` directly per spec
   - *Wizards are functional with mock results; trimmed per your choice (no CSV upload, single results view each)*
8. **Features grid** — 6 cards w/ green hover glow
9. **Stats** — 4 animated counters
10. **How It Works** — 3-step process strip
11. **System Architecture** — animated SVG flow (Input → AI → Modules → Infra) with floating data-source chips
12. **Scaling Roadmap** — dark timeline, scroll-revealed phases
13. **Pricing** — 3 tiers, Pro highlighted with emerald border + "Most Popular"
14. **Testimonials** — 3 polished cards
15. **CTA banner** — bold orange-tinted closer
16. **Footer** — logo, columns, "Built by Team Mindmesh · EDGEIQ 2026"

### `/team`
- Full-bleed orange vision statement → cream mission paragraph → 2×2 team grid (Piyush, Himanshu, Mahi, Nandini) with gradient avatar circles, hover fun-facts, staggered entrance

### Design system
- Palette: `#0D0D0D` charcoal, `#F5F0E8` cream, `#FF4D00` orange, `#5C7A5C` sage, white
- Type: Inter (single family, weight contrast for hierarchy) — keeps under 2-font rule
- Motion: Framer Motion throughout — fade-up on scroll, word-stagger headlines, drawn SVGs, glassmorphic cards, 300–600ms transitions
- Charts: Recharts (radar, bar, circular progress)
- Custom AI-generated imagery for hero ambient texture, Rahul (industrial textile mill), Priya (wind-turbine field), and one team-page hero texture

### Demo AI integration
- Direct browser → `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent` with user-pasted key (per spec)
- API key input persisted to `localStorage`
- System prompt: EcoBridge green-jobs/sustainability advisor
- Multi-turn history sent each call, typing indicator, clear-chat
- Pre-loaded prompt chips

### Technical notes
- TanStack Start (project's stack) — `react-router-dom` not needed; use TanStack Router `Link`. `/` and `/team` as separate route files with their own `head()` SEO meta.
- Tailwind v4 theme tokens extended with the EcoBridge palette in `styles.css`
- Framer Motion + Recharts added via `bun add`
- All shadcn primitives already present
- Each route gets its own og:title/description; hero/story/team images wired into og:image where relevant
- Fully mobile responsive, semantic markup, accessible focus states

### Out of scope (v1)
- CSV supplier upload
- PDF report download (button shown, no generator)
- Real LinkedIn OAuth (mocked)
- Backend persistence of demo results

After approval I'll generate the imagery first, then build the site section by section.