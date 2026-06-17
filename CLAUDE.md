# CLAUDE.md — euro-trip-2026

## Project Overview

A personal travel app for a 2-person Euro trip (4–19 July 2026, Singapore → Germany → Czech Republic → Austria → Italy → Germany → Singapore). Stores itinerary, bookings/events, and a travel journal. Static-only, mobile-first, offline-capable PWA.

## Tech Stack

- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`)
- **Routing**: React Router v6
- **State**: React Context + useReducer
- **Persistence**: localStorage via `storageService`
- **Offline**: `vite-plugin-pwa` (service worker + manifest)
- **Package manager**: pnpm
- **Port**: 3018
- **Hosting**: Vercel

No backend. No database. No auth.

## Visual Identity

- **Favicon**: Passport with map pin — open booklet + location dot
- **Accent color**: Sky blue `#0ea5e9`
- **Icon path**: `public/favicon.svg`

## Project Structure

```
src/
├── main.jsx
├── App.jsx                  # Router root
├── context/
│   └── TripContext.jsx       # Global state: itinerary, events, journal
├── pages/
│   ├── ItineraryPage.jsx     # Day list with expandable day cards
│   ├── EventsPage.jsx        # Booking list, sorted by date
│   └── JournalPage.jsx       # Posts list + editor (Milestone 2)
├── components/
│   ├── DayCard.jsx
│   ├── EventCard.jsx
│   ├── PostCard.jsx
│   └── BottomNav.jsx         # Mobile nav bar (3 tabs)
└── services/
    ├── storageService.js     # localStorage read/write helpers
    └── exportService.js      # Markdown/PDF export (Milestone 2)
```

## Data Model

```js
// Itinerary day
{
  id: "day-01",
  date: "2026-07-04",
  city: "Frankfurt",
  notes: "",
  activities: [
    { id: "act-1", time: "10:00", title: "Check in", notes: "" }
  ]
}

// Event (booking)
{
  id: "evt-01",
  title: "Flight SIN → FRA",
  type: "flight",           // flight | hotel | attraction | transport | other
  date: "2026-07-04",
  time: "12:00",
  location: "Changi Airport T3",
  bookingRef: "",
  url: "",
  notes: "",
  status: "booked"          // booked | pending | confirmed
}

// Journal post (Milestone 2)
{
  id: "post-1",
  date: "2026-07-04",
  city: "Frankfurt",
  title: "",
  body: "",
  photo: null
}
```

## Milestones

- **M1** (before departure, must-have): Itinerary + Events + PWA offline + mobile UI
- **M2** (during trip, nice-to-have): Journal + Export to Markdown

## Key Constraints

- Mobile-first — one-handed usable on a phone
- Must work fully offline (tested on airplane mode before departure)
- No additions beyond the component list in `PROPOSAL.md` without reviewing it first
- localStorage is the only persistence layer — add a JSON export/import as backup

## Seed Data

The real trip itinerary and events are documented in `PROPOSAL.md` → Section 13.
Pre-populate the app with this data on the final polish day.

**Key event to flag**: Vienna → Rome flight (13 Jul) — status `pending`, not yet purchased.

## Workspace Registration (do after scaffold)

- [x] Add port `3018` row to `AI_WS/architecture-practice/public/docs/workspace/workspace-app-registry.md`
- [ ] Add entry to `AI_WS/portfolio/data/workspace.ts`
- [ ] Add zshrc functions: `euro-trip-start`, `euro-trip-stop`, `euro-trip-logs`, `euro-trip-status`
- [ ] Register overview doc in `AI_WS/architecture-practice/public/docs/index.json`

## Decision Records

Stored in `docs/decisions/`:
- `ADR-001` — stack choice (Vite + React 19 + Tailwind v4 + PWA, no backend)
- `PDR-001` — MVP scope (Events + Itinerary only for M1)

## Do Not

- Add backend, database, or auth
- Add features beyond M1 scope before departure
- Use npm — always use pnpm
- Auto-save or auto-publish journal posts
