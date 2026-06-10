import { useState } from 'react'
import { useTrip } from '../context/TripContext'

const RISKS = [
  {
    level: 'critical',
    label: 'Critical',
    dot: 'bg-red-500',
    items: [
      { title: 'Vienna → Rome flight not purchased', detail: 'evt-02 is still pending — no booking ref or time. July peak prices rising daily. Book this week.' },
      { title: 'No hotel bookings in any city', detail: 'Zero accommodation for all 8 cities. Prague, Vienna, Rome, Florence fill up in July. Book now, starting with Rome and Prague.' },
      { title: 'SIN→FRA seats not selected (SQ 326)', detail: '12h+ flight with seats unassigned — risk of being separated. Select on singaporeair.com using ref ESHMZK.' },
    ],
  },
  {
    level: 'high',
    label: 'High',
    dot: 'bg-orange-500',
    items: [
      { title: 'Tuscany → Würzburg is a 7–9h travel day (17 Jul)', detail: 'Day before the wedding. Any delay means arriving stressed or late. Leave Tuscany early morning; consider booking Würzburg for night of 16 Jul as buffer.' },
      { title: 'Würzburg → Frankfurt tight on departure day (19 Jul)', detail: '1h train, flight departs 12:15 — DB punctuality ~70%. Take earliest train; aim to be at FRA by 09:30.' },
      { title: 'Rome itinerary overloaded for 2 days', detail: 'Colosseum, Vatican, Trevi, Piazza Navona, Borghese — normally a 4–5 day city. Vatican and Borghese require advance timed-entry booking. Pre-book now and cut 1–2 attractions.' },
    ],
  },
  {
    level: 'medium',
    label: 'Medium',
    dot: 'bg-yellow-500',
    items: [
      { title: 'Uffizi Gallery tickets (Florence, 15 Jul)', detail: 'One of the most-visited museums in the world. Walk-up tickets often sold out in July. Book online in advance.' },
      { title: 'Prague Castle crowds (9 Jul)', detail: 'Arriving mid-day from Plauen and going straight to the Castle is ambitious in peak summer heat. Consider Charles Bridge at dusk and Castle on Day 7 morning instead.' },
      { title: 'No travel insurance noted', detail: 'Two-person trip on a shared booking ref — if one can\'t travel, both tickets are affected. Purchase insurance covering trip cancellation and medical.' },
      { title: 'Extreme July heat in Rome and Tuscany', detail: 'Rome averages 32–36°C in July. Schedule outdoor sites (Colosseum, Vatican) before 10am or after 5pm.' },
    ],
  },
  {
    level: 'low',
    label: 'Low',
    dot: 'bg-emerald-500',
    items: [
      { title: 'Düsseldorf is only 1 day', detail: 'Visiting a friend is the main goal — tourism is secondary. Low risk.' },
      { title: 'Plauen has limited tourist infrastructure', detail: 'Book hotel early as options are limited in a small city.' },
      { title: 'Prague uses CZK, not Euro', detail: 'Easy to forget when the rest of the trip is Eurozone. Get some CZK at Frankfurt airport or a Prague ATM on arrival.' },
    ],
  },
]

const LEVEL_STYLES = {
  critical: 'border-red-800/50 bg-red-950/20',
  high: 'border-orange-800/50 bg-orange-950/20',
  medium: 'border-yellow-800/50 bg-yellow-950/20',
  low: 'border-emerald-800/50 bg-emerald-950/20',
}

const LABEL_STYLES = {
  critical: 'text-red-400',
  high: 'text-orange-400',
  medium: 'text-yellow-400',
  low: 'text-emerald-400',
}

function RiskGroup({ group }) {
  const [open, setOpen] = useState(group.level === 'critical')
  return (
    <div className={`rounded-xl border overflow-hidden ${LEVEL_STYLES[group.level]}`}>
      <button
        className="w-full flex items-center justify-between px-4 py-3 text-left"
        onClick={() => setOpen(o => !o)}
      >
        <div className="flex items-center gap-2.5">
          <span className={`w-2 h-2 rounded-full shrink-0 ${group.dot}`} />
          <span className={`text-sm font-semibold ${LABEL_STYLES[group.level]}`}>{group.label}</span>
          <span className="text-xs text-slate-500">{group.items.length} items</span>
        </div>
        <svg
          className={`w-4 h-4 text-slate-500 transition-transform shrink-0 ${open ? 'rotate-180' : ''}`}
          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <ul className="px-4 pb-3 space-y-3 border-t border-white/5 pt-3">
          {group.items.map((item, i) => (
            <li key={i} className="flex gap-2.5">
              <span className="text-slate-600 text-xs font-mono pt-0.5 shrink-0">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <p className="text-sm text-slate-200 font-medium leading-snug">{item.title}</p>
                <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{item.detail}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function RiskSection() {
  const [open, setOpen] = useState(true)
  const totalCritical = RISKS.find(r => r.level === 'critical')?.items.length ?? 0

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900 overflow-hidden">
      <button
        className="w-full flex items-center justify-between px-4 py-3.5 text-left"
        onClick={() => setOpen(o => !o)}
      >
        <div className="flex items-center gap-2.5">
          <span className="text-base">⚠️</span>
          <div>
            <span className="text-sm font-semibold text-slate-100">Trip Risk Assessment</span>
            {totalCritical > 0 && (
              <span className="ml-2 text-xs bg-red-900/60 text-red-400 border border-red-800/50 rounded-full px-2 py-0.5">
                {totalCritical} critical
              </span>
            )}
          </div>
        </div>
        <svg
          className={`w-4 h-4 text-slate-500 transition-transform shrink-0 ${open ? 'rotate-180' : ''}`}
          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div className="px-4 pb-4 border-t border-slate-800 pt-3 space-y-2">
          <p className="text-xs text-slate-500 mb-3">24 days to departure — items to resolve before 4 Jul 2026.</p>
          {RISKS.map(group => (
            <RiskGroup key={group.level} group={group} />
          ))}
        </div>
      )}
    </div>
  )
}

const PENDING_PLAN = {
  summary: 'Germany leg (5–9 Jul) is flexible — waiting on confirmation from friends and uncle before locking in the plan.',
  lastUpdated: '2026-06-10',
  contacts: [
    {
      name: 'Friend — Düsseldorf',
      status: 'pending',
      question: 'Can you host / meet on 6 Jul? Would you like to join us for the Germany leg 5–9 Jul?',
      ifYes: 'Stay in Düsseldorf 6 Jul. Explore Altstadt together. Possibly travel with us toward Plauen on 7 Jul.',
      ifNo: 'Pass through Düsseldorf briefly or skip — travel directly Frankfurt → Plauen on 6 Jul.',
      worldCup: 'If Germany play on 6 Jul, watch match together at Altstadt bars.',
    },
    {
      name: 'Uncle — Plauen',
      status: 'pending',
      question: 'Are you available to receive us 7–8 Jul at Pestalozzistraße 50?',
      ifYes: 'Arrive Plauen 7 Jul. Spend 8 Jul visiting uncle. Depart toward Prague / Vienna on 9 Jul.',
      ifNo: 'Skip Plauen. Restructure 7–9 Jul as extra days in Düsseldorf, Prague, or travel buffer.',
      worldCup: 'If Germany play on 7–8 Jul, watch with uncle at a local bar in Plauen.',
    },
  ],
  flexibleDays: [
    { date: '2026-07-05', city: 'Frankfurt', note: 'Fixed — sightseeing day after arrival recovery.' },
    { date: '2026-07-06', city: 'Düsseldorf', note: 'Pending friend confirmation.' },
    { date: '2026-07-07', city: 'Plauen', note: 'Pending uncle confirmation. Travel day if Düsseldorf → Plauen.' },
    { date: '2026-07-08', city: 'Plauen', note: 'Pending uncle confirmation. Could become Prague Day 1 if uncle unavailable.' },
    { date: '2026-07-09', city: 'Prague / Vienna', note: 'Fixed endpoint — must reach Vienna by evening for morning flight to Rome on 10 Jul.' },
  ],
}

const STATUS_STYLE = {
  pending:   { dot: 'bg-amber-400', label: 'Pending', text: 'text-amber-400', border: 'border-amber-800/40 bg-amber-950/20' },
  confirmed: { dot: 'bg-emerald-400', label: 'Confirmed', text: 'text-emerald-400', border: 'border-emerald-800/40 bg-emerald-950/20' },
  declined:  { dot: 'bg-red-400', label: 'Declined', text: 'text-red-400', border: 'border-red-800/40 bg-red-950/20' },
}

function PendingPlanSection() {
  const [open, setOpen] = useState(true)
  const pendingCount = PENDING_PLAN.contacts.filter(c => c.status === 'pending').length

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900 overflow-hidden">
      <button
        className="w-full flex items-center justify-between px-4 py-3.5 text-left"
        onClick={() => setOpen(o => !o)}
      >
        <div className="flex items-center gap-2.5">
          <span className="text-base">🗓️</span>
          <div>
            <span className="text-sm font-semibold text-slate-100">Germany Leg — Pending Plan</span>
            {pendingCount > 0 && (
              <span className="ml-2 text-xs bg-amber-900/60 text-amber-400 border border-amber-800/50 rounded-full px-2 py-0.5">
                {pendingCount} awaiting reply
              </span>
            )}
          </div>
        </div>
        <svg
          className={`w-4 h-4 text-slate-500 transition-transform shrink-0 ${open ? 'rotate-180' : ''}`}
          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div className="px-4 pb-4 border-t border-slate-800 pt-3 space-y-4">
          <p className="text-xs text-slate-500 leading-relaxed">{PENDING_PLAN.summary}</p>

          {/* Contacts */}
          <div className="space-y-3">
            {PENDING_PLAN.contacts.map((c, i) => {
              const s = STATUS_STYLE[c.status] ?? STATUS_STYLE.pending
              return (
                <div key={i} className={`rounded-xl border p-3.5 space-y-2.5 ${s.border}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full shrink-0 ${s.dot}`} />
                      <span className="text-sm font-semibold text-slate-100">{c.name}</span>
                    </div>
                    <span className={`text-xs font-medium ${s.text}`}>{s.label}</span>
                  </div>

                  <div className="text-xs text-slate-400 leading-relaxed">
                    <span className="text-slate-500">Ask: </span>{c.question}
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-emerald-950/30 border border-emerald-900/30 rounded-lg p-2">
                      <p className="text-[10px] font-semibold text-emerald-500 mb-1">If confirmed</p>
                      <p className="text-xs text-slate-400 leading-relaxed">{c.ifYes}</p>
                    </div>
                    <div className="bg-red-950/30 border border-red-900/30 rounded-lg p-2">
                      <p className="text-[10px] font-semibold text-red-500 mb-1">If declined</p>
                      <p className="text-xs text-slate-400 leading-relaxed">{c.ifNo}</p>
                    </div>
                  </div>

                  {c.worldCup && (
                    <div className="flex items-start gap-1.5 bg-slate-800/60 rounded-lg px-2.5 py-2">
                      <span className="text-sm shrink-0">⚽</span>
                      <p className="text-xs text-slate-400 leading-relaxed">{c.worldCup}</p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Day-by-day flex view */}
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Day-by-day status</p>
            <div className="space-y-1.5">
              {PENDING_PLAN.flexibleDays.map((d, i) => {
                const isPending = d.note.toLowerCase().includes('pending')
                const isFixed = d.note.toLowerCase().includes('fixed')
                return (
                  <div key={i} className="flex items-start gap-2.5">
                    <span className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${isFixed ? 'bg-slate-500' : isPending ? 'bg-amber-400' : 'bg-sky-400'}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-slate-500">
                          {new Date(d.date + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                        </span>
                        <span className="text-xs font-medium text-slate-300">{d.city}</span>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed">{d.note}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <p className="text-[10px] text-slate-600">Last updated: {PENDING_PLAN.lastUpdated}</p>
        </div>
      )}
    </div>
  )
}

const TAG_META = [
  { tag: 'historical',   label: 'Historical',   icon: '🏛️', color: 'bg-amber-500',   track: 'bg-amber-950/60' },
  { tag: 'culture',      label: 'Culture',      icon: '🎨', color: 'bg-purple-500',  track: 'bg-purple-950/60' },
  { tag: 'scenic',       label: 'Scenic',       icon: '🌅', color: 'bg-sky-500',     track: 'bg-sky-950/60' },
  { tag: 'photography',  label: 'Photography',  icon: '📷', color: 'bg-slate-400',   track: 'bg-slate-800/60' },
  { tag: 'food',         label: 'Food',         icon: '🍽️', color: 'bg-orange-500',  track: 'bg-orange-950/60' },
  { tag: 'outdoor',      label: 'Outdoor',      icon: '🥾', color: 'bg-lime-500',    track: 'bg-lime-950/60' },
  { tag: 'local',        label: 'Local',        icon: '🧭', color: 'bg-yellow-500',  track: 'bg-yellow-950/60' },
  { tag: 'romantic',     label: 'Romantic',     icon: '💑', color: 'bg-rose-500',    track: 'bg-rose-950/60' },
  { tag: 'relaxation',   label: 'Relaxation',   icon: '😌', color: 'bg-teal-500',    track: 'bg-teal-950/60' },
  { tag: 'nature',       label: 'Nature',       icon: '🌿', color: 'bg-emerald-500', track: 'bg-emerald-950/60' },
  { tag: 'nightlife',    label: 'Nightlife',    icon: '🌙', color: 'bg-violet-500',  track: 'bg-violet-950/60' },
  { tag: 'shopping',     label: 'Shopping',     icon: '🛍️', color: 'bg-fuchsia-500', track: 'bg-fuchsia-950/60' },
  { tag: 'entertainment',label: 'Entertainment',icon: '🎭', color: 'bg-pink-500',    track: 'bg-pink-950/60' },
  { tag: 'wellness',     label: 'Wellness',     icon: '🧘', color: 'bg-cyan-500',    track: 'bg-cyan-950/60' },
]

function AttributeBalanceSection() {
  const { state } = useTrip()
  const [open, setOpen] = useState(true)

  // Count tag occurrences across all activities
  const counts = {}
  for (const day of state.itinerary) {
    for (const act of day.activities ?? []) {
      for (const tag of act.tags ?? []) {
        counts[tag] = (counts[tag] || 0) + 1
      }
    }
  }

  const max = Math.max(...Object.values(counts), 1)
  const total = Object.values(counts).reduce((s, v) => s + v, 0)

  function levelLabel(count) {
    if (count === 0)       return { text: 'None',      style: 'text-slate-600' }
    if (count <= 3)        return { text: 'Low',       style: 'text-red-400' }
    if (count <= 8)        return { text: 'Medium',    style: 'text-yellow-400' }
    if (count <= 15)       return { text: 'Good',      style: 'text-emerald-400' }
    return                        { text: 'High',      style: 'text-sky-400' }
  }

  const sorted = [...TAG_META].sort((a, b) => (counts[b.tag] || 0) - (counts[a.tag] || 0))

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900 overflow-hidden">
      <button
        className="w-full flex items-center justify-between px-4 py-3.5 text-left"
        onClick={() => setOpen(o => !o)}
      >
        <div className="flex items-center gap-2.5">
          <span className="text-base">📊</span>
          <div>
            <span className="text-sm font-semibold text-slate-100">Activity Balance</span>
            <span className="ml-2 text-xs text-slate-500">{total} tag instances · {TAG_META.length} attributes</span>
          </div>
        </div>
        <svg
          className={`w-4 h-4 text-slate-500 transition-transform shrink-0 ${open ? 'rotate-180' : ''}`}
          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div className="px-4 pb-4 border-t border-slate-800 pt-3 space-y-2.5">
          <p className="text-xs text-slate-500 mb-3">Counted live from all planned activities. Add more activities to fill the gaps.</p>
          {sorted.map(({ tag, label, icon, color, track }) => {
            const count = counts[tag] || 0
            const pct = Math.round((count / max) * 100)
            const { text, style } = levelLabel(count)
            return (
              <div key={tag}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm w-5 text-center">{icon}</span>
                    <span className="text-xs font-medium text-slate-300">{label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-semibold ${style}`}>{text}</span>
                    <span className="text-[10px] text-slate-600 font-mono w-5 text-right">{count}</span>
                  </div>
                </div>
                <div className={`w-full h-1.5 rounded-full ${track}`}>
                  <div
                    className={`h-1.5 rounded-full transition-all ${color}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default function JournalPage() {
  return (
    <div className="flex flex-col flex-1">
      <div className="px-4 pt-10 pb-4 bg-slate-950 sticky top-0 z-10 border-b border-slate-800/60">
        <div className="flex items-center gap-2">
          <span className="text-2xl">📓</span>
          <div>
            <h1 className="text-lg font-bold text-slate-100">Journal</h1>
            <p className="text-xs text-slate-400">Travel notes & memories</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        <RiskSection />
        <AttributeBalanceSection />
        <PendingPlanSection />

        <div className="flex flex-col items-center justify-center px-4 text-center py-12 text-slate-600">
          <div className="text-4xl mb-3">📓</div>
          <p className="text-sm font-medium text-slate-400">Journal coming in Milestone 2</p>
          <p className="text-xs mt-1.5 leading-relaxed">Write posts during the trip, tagged by city and date.</p>
        </div>
      </div>
    </div>
  )
}
