# OverpoweredLMS — Wabi

A self-contained learning management system built for **GATE DA (Data Science & AI) AIR 1 preparation**. No server, no build step — one HTML file and one JS file.

[![CI & Deploy](https://github.com/bgsourav/OverpoweredLMS/actions/workflows/ci.yml/badge.svg)](https://github.com/bgsourav/OverpoweredLMS/actions/workflows/ci.yml)

**Live:** https://bgsourav.github.io/OverpoweredLMS/

---

## Philosophy

GATE DA AIR 1 (2026) scored 90/100. Only 7 marks separate AIR 1 from AIR 100 — those 7 marks are insight questions, not recall. Wabi trains at **olympiad depth** so GATE questions feel easy:

- **Tier 1** — GATE floor: formula + standard application
- **Tier 2** — GATE ceiling: edge cases, why it works
- **Tier 3** — Beyond GATE: prove it, derive it, find the flaw

A student who masters Tier 3 finds Tier 1 automatic.

---

## Structure

**13 sectors · 69 lessons · 91 chapter-test questions**

| Layer | Sectors |
|---|---|
| Foundation Pillars | Conditioning · Eigenstructure · Gradient Geometry · Algorithm Design · Python Internals |
| Subject Sectors | Probability · Statistics · Linear Algebra · Optimization · DSA · Databases · Machine Learning · AI & Inference |

Foundation pillars gate the subject sectors — you build the deep substrate before the applied subjects unlock.

Each lesson contains:
- Conceptual hook + formal definition
- Key insight
- Tier 1 / Tier 2 / Tier 3 problems (expandable, with full solutions)
- Common traps
- Cross-topic connections

Each sector unlocks a **chapter test** (MCQ / MSQ / NAT) after all lessons are complete — scored using GATE DA marking: +2 correct, −0.67 wrong on MCQ, no negative on MSQ/NAT.

---

## Stack

- React 18 + Babel (CDN) — no build step
- Plain CSS, hash router, `localStorage` persistence
- XP + rank system (Initiate → Grandmaster)
- Single `index.html` + `tests.js` — runs from `file://` or any static host

---

## CI / CD

Every PR against `main` runs:
1. File existence check
2. HTML structure validation
3. `tests.js` sector coverage check
4. Docker image build (`nginx:alpine`)
5. Container smoke test (HTTP 200 + content checks)

Merge to `main` → auto-deploys to GitHub Pages via the `gh-pages` branch.

---

## Run locally

```bash
# Option 1 — just open it
open index.html

# Option 2 — local server (avoids any file:// quirks)
python3 -m http.server 8080
# then visit http://localhost:8080

# Option 3 — Docker
docker build -t wabi-lms .
docker run -p 8080:80 wabi-lms
# then visit http://localhost:8080
```
