# Euro Trip 2026 — App Proposal

**Author:** Van Thanh Nguyen
**Date:** 2026-06-09
**Trip departure:** ~2026-06-23 (2 weeks from now)
**Port:** `3018`
**Template:** A — Simple SPA (Vite + React)

---

## 1. Problem Statement

Planning a multi-city Euro trip generates scattered information across notes apps, email, browser tabs, and chat messages. There is no single place to:
- See the day-by-day plan at a glance
- Track bookings and tickets with reference numbers
- Write travel journal posts while on the move
- Review everything offline when roaming data is limited

This app solves that for one person, for one trip.

---

## 2. Goals

- **Primary**: A working itinerary + events tracker ready before departure
- **Secondary**: A lightweight journal to write posts during the trip
- **Non-goal**: Social sharing, multi-user, cloud sync, or analytics

---

## 3. Core Features

### Milestone 1 — Before departure (must-have)

| Feature | Description |
|---------|-------------|
| Itinerary | Day-by-day view. Each day has a city, notes, and a list of activities. |
| Events | List of bookings — flights, hotels, attractions. Each has: title, date/time, location, booking reference, optional URL. |
| Offline support | App works without internet (PWA). Data persists in localStorage. |
| Mobile-first UI | One-handed usable on a phone. Large tap targets, minimal chrome. |

### Milestone 2 — During the trip (nice-to-have)

| Feature | Description |
|---------|-------------|
| Journal | Write posts tagged by date and city. Text + optional photo (local file). |
| Export | Export itinerary or journal to Markdown or PDF for sharing/archiving. |

---

## 4. Tech Stack

| Concern | Choice | Reason |
|---------|--------|--------|
| Framework | React 19 + Vite | Workspace standard; fast setup, component model suits 3-view layout |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite`) | Workspace standard; rapid mobile-first UI |
| Routing | React Router v6 | Simple 3-route structure |
| State | React Context + useReducer | Lightweight; no need for Redux at this scale |
| Persistence | localStorage | No backend needed; data stays on device |
| Offline | `vite-plugin-pwa` | Service worker + manifest with minimal config |
| Package manager | pnpm | Workspace standard |
| Hosting | Vercel | Workspace standard for SPA deploys |

No backend. No database. No authentication.

---

## 5. App Structure

```
src/
├── main.jsx
├── App.jsx                  # Router root
├── context/
│   └── TripContext.jsx       # Global state: itinerary, events, journal
├── pages/
│   ├── ItineraryPage.jsx     # Day list with expandable day cards
│   ├── EventsPage.jsx        # Booking list, sortable by date
│   └── JournalPage.jsx       # Posts list + editor (M2)
├── components/
│   ├── DayCard.jsx
│   ├── EventCard.jsx
│   ├── PostCard.jsx
│   └── BottomNav.jsx         # Mobile nav bar (3 tabs)
└── services/
    ├── storageService.js     # localStorage read/write helpers
    └── exportService.js      # Markdown/PDF export (M2)
```

---

## 6. Visual Identity

| Field | Value |
|-------|-------|
| Favicon concept | Passport with map pin — open booklet + location dot |
| Accent color | Sky blue `#0ea5e9` |
| Icon path | `public/favicon.svg` (Vite convention) |

---

## 7. Data Model

```js
// Itinerary day
{
  id: "day-1",
  date: "2026-06-23",
  city: "London",
  notes: "",
  activities: [
    { id: "act-1", time: "10:00", title: "Check in at hotel", notes: "" }
  ]
}

// Event (booking)
{
  id: "evt-1",
  title: "Flight SQ322 SIN→LHR",
  type: "flight",           // flight | hotel | attraction | transport | other
  date: "2026-06-23",
  time: "01:15",
  location: "Changi Airport T3",
  bookingRef: "ABC123",
  url: "",
  notes: ""
}

// Journal post (M2)
{
  id: "post-1",
  date: "2026-06-23",
  city: "London",
  title: "First day in London",
  body: "",
  photo: null               // base64 or null
}
```

---

## 8. Build Plan

### Week 1 (before departure)

| Day | Work |
|-----|------|
| Day 1 | Pre-code: write `CLAUDE.md`, create `ADR-001` (stack choice), `PDR-001` (MVP scope), register in workspace registry + zshrc |
| Day 2–3 | Scaffold: `pnpm create vite . --template react-ts`, Tailwind v4, PWA, React Router. Deploy shell to Vercel on port 3018. |
| Day 4–5 | Events page: add/edit/delete bookings. Storage service. |
| Day 6–7 | Itinerary page: day list, activity management, day notes. |
| Day 7 | Polish: offline test on iPhone, mobile UX pass, populate real trip data. |

### Week 2 (if time permits before departure or during trip)

| Task | Work |
|------|------|
| Journal page | Post editor with date/city tag |
| Export | Markdown export of itinerary |
| Photo support | Attach local photo to journal post |

---

## 9. Risks & Mitigations

| Risk | Mitigation |
|------|-----------|
| Run out of time before departure | M1 scope is independently shippable — stop at any point after Events + Itinerary |
| localStorage data lost (browser clear) | Add a manual JSON export/import as backup on Day 7 |
| Offline doesn't work on iOS Safari | Test PWA install on iPhone before departure; fallback is just using the browser tab |
| Over-engineering during build | Stick to the component list in Section 5 — no additions without reviewing this proposal first |

---

## 10. Out of Scope

- Multi-trip support
- User accounts or cloud sync
- Collaborative editing
- Map integration
- Currency converter
- AI features

These can be added after the trip if the app proves useful.

---

## 11. Workspace Registration Checklist

Before writing any code (Day 1):

- [ ] Write `CLAUDE.md` at project root
- [ ] Write `ADR-001` — stack choice (Vite + React 19 + Tailwind v4 + PWA)
- [ ] Write `PDR-001` — MVP scope (Events + Itinerary only, no backend)
- [ ] Add port `3018` row to `workspace-app-registry.md`
- [ ] Add `euro-trip-2026` to `AI_WS/portfolio/data/workspace.ts`
- [ ] Add zshrc functions (`euro-trip-start`, `euro-trip-stop`, `euro-trip-logs`, `euro-trip-status`)
- [ ] Run `source ~/.zshrc`
- [ ] Register an overview doc in `public/docs/index.json` (architecture-practice viewer)

---

## 12. Success Criteria

- App is installed as PWA on my phone before departure
- All flights, hotels, and major bookings are entered in Events
- Itinerary has every day of the trip populated
- App works fully offline (tested on airplane mode)

---

---

## 13. Actual Trip — Seed Data

This section maps the real trip into the app's data model. Use this to pre-populate the app on Day 7.

### Itinerary (day-by-day)

| id | Date | City | Notes |
|----|------|------|-------|
| day-01 | 2026-07-04 | Singapore → Frankfurt | Depart 12:00 PM SIN. Arrive Frankfurt evening. |
| day-02 | 2026-07-05 | Frankfurt | 1 day exploring Frankfurt. |
| day-03 | 2026-07-06 | Düsseldorf | Travel from Frankfurt. Visit friend. |
| day-04 | 2026-07-07 | Plauen | Travel Düsseldorf → Plauen (~5–6h). |
| day-05 | 2026-07-08 | Plauen | Visit uncle at Pestalozzistraße 50, 08523 Plauen. |
| day-06 | 2026-07-09 | Prague | Travel Plauen → Prague (~1.5h). 1–2 days. |
| day-07 | 2026-07-10 | Prague | Day 2 in Prague (if 2-day stay). |
| day-08 | 2026-07-11 | Vienna | Travel Prague → Vienna (~4h by train). |
| day-09 | 2026-07-12 | Vienna | Day 2 in Vienna. |
| day-10 | 2026-07-13 | Vienna → Rome | Fly Vienna → Rome. (ticket pending — see Events) |
| day-11 | 2026-07-14 | Rome | Day 2 in Rome. |
| day-12 | 2026-07-15 | Tuscany | Travel Rome → Tuscany (~3h). |
| day-13 | 2026-07-16 | Tuscany | Day 2 in Tuscany. |
| day-14 | 2026-07-17 | Würzburg | Travel Tuscany → Würzburg (TBD — long day, plan needed). Arrive early. |
| day-15 | 2026-07-18 | Würzburg | Friend's wedding — evening event. |
| day-16 | 2026-07-19 | Frankfurt → Singapore | Travel Würzburg → Frankfurt (~1.5h). Depart 12:00 PM FRA. |

### Events (bookings)

| id | Title | Date | Status | Booking ref |
|----|-------|------|--------|-------------|
| evt-01 | Flight SIN → FRA | 2026-07-04 12:00 | Booked | (add ref) |
| evt-02 | Flight VIE → FCO (Vienna → Rome) | 2026-07-13 | **PENDING — not yet purchased** | — |
| evt-03 | Flight FRA → SIN | 2026-07-19 12:00 | Booked | (add ref) |
| evt-04 | Friend's wedding — Würzburg | 2026-07-18 (evening) | Confirmed | — |
| evt-05 | Uncle visit — Plauen | 2026-07-08 | Confirmed | Pestalozzistraße 50, 08523 Plauen |

### Open items (before departure)

- [ ] Book Vienna → Rome flight (13 Jul) — review itinerary timing first
- [ ] Plan Tuscany → Würzburg travel on 17 Jul (train via Florence → Munich → Würzburg ~9–10h, or fly)
- [ ] Book all hotels along the route
- [ ] Add booking refs to evt-01 and evt-03 once confirmed

---

*Review this proposal before starting. Any scope changes should be reflected here first.*
*Runbook reference: `public/docs/general/new-app-runbook.md`*
*Registry reference: `public/docs/workspace/workspace-app-registry.md`*
