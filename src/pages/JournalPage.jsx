import { useState } from 'react'
import { useTrip } from '../context/TripContext'

const RISKS = [
  {
    level: 'critical',
    label: 'Critical',
    dot: 'bg-red-500',
    items: [
      { title: 'Prague → Rome flight not purchased (10 Jul)', detail: 'evt-02 updated to PRG→FCO — still pending, no booking ref or time. Morning flight required so you arrive Rome in the afternoon. This is the gateway to all 7 Italy days. Book now — July PRG→FCO routes are filling up.' },
      { title: 'Venice → Frankfurt flight not purchased (17 Jul)', detail: 'evt-06 still pending. Must be a morning departure to reach Würzburg by afternoon, the day before the wedding. If delayed, you risk missing the wedding. Book alongside the Prague→Rome flight.' },
      { title: 'No hotel bookings in any city', detail: 'Zero accommodation confirmed across all cities. Priority order: Rome (3 nights, 10–13 Jul) → Venice (2 nights, 15–17 Jul) → Tuscany (2 nights, 13–15 Jul) → Prague (1 night, 9 Jul) → Bruges (1 night, 6 Jul) → Maastricht (1 night, 7 Jul). Cologne is covered by brother.' },
      { title: 'SIN→FRA seats not selected (SQ 326)', detail: '12h+ flight with seats unassigned — risk of being seated separately. Select on singaporeair.com using booking ref ESHMZK.' },
      { title: 'Rental car not booked (8–9 Jul)', detail: 'evt-07 pending. Pick up at Leipzig or Erfurt (pending stopover decision), drive to Plauen (~1h15m) then Prague (~2.5h), return at Prague airport. Book in advance — July demand is high and one-way rentals need early reservation.' },
    ],
  },
  {
    level: 'high',
    label: 'High',
    dot: 'bg-orange-500',
    items: [
      { title: 'Stopover city not decided — Leipzig vs Erfurt (8 Jul)', detail: 'Rental car and hotel in Plauen cannot be booked until this is decided. Leipzig: 3h ICE, 1h15m drive to Plauen, vibrant city. Erfurt: 3h ICE, 1h30m drive, quieter medieval feel. Decide this week.' },
      { title: 'Venice → Frankfurt flight + train to Würzburg same day (17 Jul)', detail: 'Morning VCE→FRA flight + ~1h ICE to Würzburg = arrive afternoon, day before the wedding. Any flight delay = arriving exhausted or late. Book the earliest possible departure from VCE; research backup train via Munich.' },
      { title: 'Würzburg → Frankfurt tight on departure day (19 Jul)', detail: '1h ICE train, SQ 025 departs 12:15 — DB punctuality ~70%. Aim to be at FRA by 09:30. Take the earliest Würzburg train (~06:30). Do not rely on a single connection.' },
      { title: 'Vatican Museums + Borghese Gallery — timed entry only (11–12 Jul)', detail: 'No walk-ins. Vatican sells out weeks ahead in July. Borghese is capped at 360 people per 2h slot. Book now at museivaticani.va and galleriaborghese.it.' },
      { title: 'Uffizi Gallery tickets (14 Jul)', detail: 'Walk-up queues of 2–3h common in July. Book timed entry at uffizi.it well in advance.' },
    ],
  },
  {
    level: 'medium',
    label: 'Medium',
    dot: 'bg-yellow-500',
    items: [
      { title: 'Prague is a single full day (9 Jul) — flight next morning', detail: 'Drive from Plauen, arrive mid-morning. Flight to Rome next morning means an early start on 10 Jul. Prioritise Charles Bridge at dawn + Old Town Square. Leave Castle and Jewish Quarter for a future trip.' },
      { title: 'No travel insurance', detail: 'Two-person trip, three unbooked flights, shared booking ref ESHMZK. Purchase insurance covering cancellation, medical, and missed connections before booking the Italy flights.' },
      { title: 'Extreme July heat in Rome and Tuscany (10–14 Jul)', detail: 'Rome 32–36°C, Florence similar. Schedule Colosseum, Vatican, and outdoor sites before 10am or after 17:00. Carry water at all times.' },
      { title: 'Colosseum combined ticket — book in advance (11 Jul)', detail: 'Colosseum + Palatine Hill + Roman Forum sells out in peak July. Book at coopculture.it. Timed entry required.' },
      { title: 'D04 is a long day (Maastricht + Düsseldorf dinner + Cologne, 7 Jul)', detail: 'Maastricht sightseeing → 1h drive to Düsseldorf for dinner → 45min back to Cologne. 4th consecutive travel day. Keep Maastricht activities light in the afternoon to arrive Düsseldorf relaxed.' },
      { title: 'Bruges canal boats and Belfry get very crowded in July', detail: 'Belfry tower tickets sell out by mid-morning. Canal boat queues peak at 11am–14:00. Arrive at the Belfry when it opens (09:30) and do the boat tour early or late afternoon.' },
    ],
  },
  {
    level: 'low',
    label: 'Low',
    dot: 'bg-emerald-500',
    items: [
      { title: 'Prague uses CZK, not Euro', detail: 'One day in Prague — get ~2,000 CZK (~€80) at a Prague ATM on arrival. Avoid airport exchange desks. Card payments widely accepted in tourist areas.' },
      { title: 'Venice is car-free — plan luggage carefully', detail: 'No taxis to the hotel door. Accommodation must be walkable or accessible by vaporetto from Santa Lucia station. Check hotel location before booking.' },
      { title: 'Driving in Czech Republic (9 Jul)', detail: 'Czech Republic requires a highway vignette sticker for motorways — buy online at edalnice.cz before the trip or at the border. €15 for 10 days. Car rental companies sometimes include it — check when booking.' },
      { title: 'Belgium and Netherlands use Euro — Bruges and Maastricht no currency issue', detail: 'Smooth transition. Card payments widely accepted in both cities.' },
      { title: 'World Cup match schedule not yet released', detail: 'Specific knockout dates for Germany TBD. Check fifa.com in late June. Fan zones confirmed in Cologne, Bruges (likely), and Rome — all on your route.' },
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
          <p className="text-xs text-slate-500 mb-3">{Math.ceil((new Date('2026-07-04') - new Date()) / 86400000)} days to departure — items to resolve before 4 Jul 2026.</p>
          {RISKS.map(group => (
            <RiskGroup key={group.level} group={group} />
          ))}
        </div>
      )}
    </div>
  )
}

const PENDING_PLAN = {
  summary: 'Two decisions remain open for the Germany/Benelux leg before hotels and car rental can be booked.',
  lastUpdated: '2026-06-13',
  contacts: [
    {
      name: 'Stopover City — Leipzig vs Erfurt (8 Jul)',
      status: 'pending',
      question: 'Which train stopover city do you prefer between Cologne and Plauen?',
      ifYes: 'Leipzig — 3h ICE from Cologne, 1h15m drive to Plauen. Vibrant city: Nikolaikirche, Mädler Passage, great coffee-house culture.',
      ifNo: 'Erfurt — 3h ICE from Cologne, 1h30m drive to Plauen. Quieter medieval feel: Cathedral Square, Krämerbrücke, very walkable old town.',
      worldCup: 'Both cities have fan zones if Germany play on 8 Jul.',
    },
    {
      name: 'Friend — Düsseldorf (evening 7 Jul)',
      status: 'pending',
      question: 'Can you host dinner on the evening of 7 Jul? We\'ll drive from Maastricht (~1h) and return to Cologne after.',
      ifYes: 'Dinner at friend\'s house in Düsseldorf. Return to Cologne for the night. Ask if they want to join for the road trip 8–9 Jul.',
      ifNo: 'Skip Düsseldorf evening. Spend full evening in Maastricht or head back to Cologne early.',
      worldCup: 'If Germany play on 7 Jul, watch the match together at friend\'s place or a local bar.',
    },
    {
      name: 'Uncle — Plauen (8 Jul afternoon)',
      status: 'pending',
      question: 'Are you available to receive us on the afternoon of 8 Jul at Pestalozzistraße 50?',
      ifYes: 'Arrive Plauen afternoon after train + rental car pickup. Visit uncle, stay overnight. Depart Prague by car morning of 9 Jul.',
      ifNo: 'Skip Plauen overnight. Drive directly from Leipzig/Erfurt toward Prague (~4h). Gain extra time in Prague.',
      worldCup: 'If Germany play on 8 Jul, watch with uncle at a local bar in Plauen.',
    },
  ],
  flexibleDays: [
    { date: '2026-07-05', city: 'Cologne', note: 'Fixed — morning with brother, afternoon travel to Bruges.' },
    { date: '2026-07-06', city: 'Bruges', note: 'Fixed — full day Belgium.' },
    { date: '2026-07-07', city: 'Maastricht', note: 'Fixed — day in Maastricht. Evening dinner Düsseldorf (pending friend).' },
    { date: '2026-07-08', city: 'Leipzig / Erfurt → Plauen', note: 'Pending stopover city decision + uncle confirmation.' },
    { date: '2026-07-09', city: 'Prague', note: 'Fixed — drive Plauen → Prague by rental car. Full day Prague.' },
    { date: '2026-07-10', city: 'Rome', note: 'Fixed endpoint — morning flight PRG → FCO (ticket pending).' },
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
  const [expandedTag, setExpandedTag] = useState(null)

  // Build index: tag -> [{day, act}] — only selected activities count
  const tagIndex = {}
  for (const day of state.itinerary) {
    for (const act of day.activities ?? []) {
      if (act.selected === false) continue
      for (const tag of act.tags ?? []) {
        if (!tagIndex[tag]) tagIndex[tag] = []
        tagIndex[tag].push({ day, act })
      }
    }
  }

  const counts = Object.fromEntries(Object.entries(tagIndex).map(([t, arr]) => [t, arr.length]))
  const max = Math.max(...Object.values(counts), 1)
  const total = Object.values(counts).reduce((s, v) => s + v, 0)

  function levelLabel(count) {
    if (count === 0) return { text: 'None',   style: 'text-slate-600' }
    if (count <= 3)  return { text: 'Low',    style: 'text-red-400' }
    if (count <= 8)  return { text: 'Medium', style: 'text-yellow-400' }
    if (count <= 15) return { text: 'Good',   style: 'text-emerald-400' }
    return                  { text: 'High',   style: 'text-sky-400' }
  }

  function formatDate(dateStr) {
    return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
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
        <div className="px-4 pb-4 border-t border-slate-800 pt-3 space-y-1">
          <p className="text-xs text-slate-500 mb-3">Tap an attribute to see where it appears. Only selected activities are counted.</p>
          {sorted.map(({ tag, label, icon, color, track }) => {
            const count = counts[tag] || 0
            const pct = Math.round((count / max) * 100)
            const { text, style } = levelLabel(count)
            const isExpanded = expandedTag === tag
            const entries = tagIndex[tag] ?? []

            return (
              <div key={tag} className="rounded-lg overflow-hidden">
                {/* Row — tappable */}
                <button
                  className="w-full text-left active:bg-slate-800/60 transition-colors px-2 py-2 rounded-lg"
                  onClick={() => setExpandedTag(isExpanded ? null : tag)}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm w-5 text-center">{icon}</span>
                      <span className="text-xs font-medium text-slate-300">{label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-semibold ${style}`}>{text}</span>
                      <span className="text-[10px] text-slate-600 font-mono w-4 text-right">{count}</span>
                      <svg
                        className={`w-3 h-3 text-slate-600 transition-transform shrink-0 ${isExpanded ? 'rotate-180' : ''}`}
                        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                        <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                  <div className={`w-full h-1.5 rounded-full ${track}`}>
                    <div className={`h-1.5 rounded-full transition-all ${color}`} style={{ width: `${pct}%` }} />
                  </div>
                </button>

                {/* Expanded activity list */}
                {isExpanded && (
                  <div className="mx-2 mb-2 rounded-lg border border-slate-700/60 bg-slate-800/40 divide-y divide-slate-700/40">
                    {entries.length === 0 ? (
                      <p className="text-xs text-slate-600 px-3 py-2">No activities yet.</p>
                    ) : (
                      entries.map(({ day, act }, i) => (
                        <div key={i} className="flex items-start gap-3 px-3 py-2.5">
                          <div className="shrink-0 text-right min-w-[52px]">
                            <p className="text-[10px] font-mono text-slate-500">{formatDate(day.date)}</p>
                            {act.time && <p className="text-[10px] font-mono text-slate-600">{act.time}</p>}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-slate-200 leading-snug">{act.title}</p>
                            <p className="text-[10px] text-slate-500 mt-0.5">{day.city}</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
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
