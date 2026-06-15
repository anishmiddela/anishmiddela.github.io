# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # start Vite dev server (localhost:5173)
npm run build     # production build → dist/
npm run preview   # serve the dist/ build locally
```

No test suite or linter is configured.

## Architecture

Single-page React app (Vite + Tailwind) deployed to GitHub Pages as a personal website.

**Tab system** — `App.jsx` is the root. It controls a four-tab SPA: `overview`, `personal`, `professional`, and `stats`. Only the active tab is rendered (no routing library). `personal`, `professional`, and `stats` are locked behind a 3-digit PIN (`369`). The `stats` tab is a secret — it does not appear in the nav and is only reachable by triple-clicking the logo within 1.2 s.

**Navigation** — a fixed pill-shaped nav bar renders `Home / Personal / Professional`. Clicking a locked tab opens `PinDialog`. Once unlocked in a session the tab stays unlocked (resets on page refresh).

**Analytics** — GoatCounter is the primary analytics provider. Page views are tracked by calling `window.goatcounter?.count()` when a tab is navigated to. The `Stats` page fetches data from the GoatCounter API using a token injected at runtime as `window.__GC_TOKEN__`. If the token is absent it falls back to the public per-path counter endpoint. Microsoft Clarity is also linked from the Stats page (session recordings / heatmaps).

**Animations** — `Reveal.jsx` provides a scroll-triggered fade-in via `IntersectionObserver`. Add `<Reveal delay={N}>` to stagger elements. CSS classes `.reveal` / `.reveal-in` and `.page-fade` live in `index.css`. Both animations are disabled when the user prefers reduced motion.

**Content editing** — editable copy lives directly in the component files as top-level `const` arrays, not in a CMS or separate data file:
- `Overview.jsx` — `personalFacts`, `professionalFacts`, `socialLinks`
- `Personal.jsx` — `interests`, `values`
- `Professional.jsx` — `experience`, `projects`

**Shared primitives** (`Reveal.jsx`) — `Reveal` (scroll animation wrapper), `SectionLabel` (all-caps muted heading), `Divider` (thin `<hr>`).

**Color palette** — the site uses a fixed set of hex values: `#16181d` (near-black), `#00345b` (dark blue), `#0070f3` (brand blue), `#ff5a36` (orange-red accent), `#87211C` (deep red), `#7a838f` / `#b3bac2` (muted grays). Tailwind utilities are used for spacing/layout; colors are inline hex via `style` or Tailwind arbitrary values `text-[#...]`.
