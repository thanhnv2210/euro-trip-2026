import { useState } from 'react'
import { useTrip } from '../context/TripContext'

const RISKS = [
  {
    level: 'critical',
    label: 'Critical',
    dot: 'bg-red-500',
    items: [
      { title: 'Prague → Rome flight not purchased (10 Jul)', detail: 'evt-02 still pending, no booking ref or time. Morning flight required so you arrive Rome afternoon. This is the gateway to all 7 Italy days. July PRG→FCO routes fill fast — buy now.' },
      { title: 'No accommodation booked in most cities', detail: 'Würzburg booked (2 nights, booking 6637574880). Plauen covered — staying with uncle (no hotel needed). Cologne covered by brother. Remaining priority: Rome 3 nights (10–13 Jul) → Venice 2 nights (15–17 Jul) → Tuscany 2 nights (13–15 Jul) → Prague 1 night (9 Jul) → Bruges 1 night (5–6 Jul) → Maastricht 1 night (6–7 Jul).' },
      { title: 'SIN→FRA seats not selected (SQ 326)', detail: '12h+ flight with seats unassigned — risk of being separated. Select on singaporeair.com using booking ref ESHMZK.' },
    ],
  },
  {
    level: 'high',
    label: 'High',
    dot: 'bg-orange-500',
    items: [
      { title: 'D04 is a full transit day — confirm Nuremberg → Plauen train (7 Jul)', detail: 'Maastricht → Cologne (morning), then Cologne → Nuremberg 12:45–15:58 (ticket bought), then train Nuremberg → Plauen. Check DB timetable for the Nuremberg → Plauen leg before departure. Total travel ~6h. Arrive Plauen evening.' },
      { title: 'Venice → Frankfurt afternoon flight + train to Würzburg same day (17 Jul)', detail: 'Condor DE4234 departs VCE 16:45, arrives FRA 18:05. Then ~1h ICE to Würzburg — arrive hotel ~20:00, day before the wedding. Any flight delay = late check-in. Notify hotel of late arrival. Have FRA → Würzburg train booked (done).' },
      { title: 'Würzburg → Frankfurt tight on departure day (19 Jul)', detail: '1h ICE train, SQ 025 departs 12:15 — DB punctuality ~70%. Aim to be at FRA by 09:30. Take the earliest train (~06:30). Do not rely on a single connection.' },
      { title: 'Vatican Museums + Sistine Chapel — timed entry only (12 Jul)', detail: 'No walk-ins. Vatican sells out weeks ahead in July. Book now at museivaticani.va — allow 3–4h.' },
      { title: 'Uffizi Gallery tickets (14 Jul)', detail: 'Walk-up queues 2–3h in July. Book timed entry at uffizi.it well in advance.' },
    ],
  },
  {
    level: 'medium',
    label: 'Medium',
    dot: 'bg-yellow-500',
    items: [
      { title: 'Prague is a single full day (9 Jul) — flight next morning', detail: 'Arrive by train via Dresden (Plauen → Dresden → Prague). Flight to Rome next morning (PRG→FCO pending). Prioritise Prague Castle + Charles Bridge at dusk. Czech Beer Spa needs advance booking — book before the trip.' },
      { title: 'No travel insurance', detail: 'Two-person trip, two unbooked flights, shared ref ESHMZK. Purchase insurance covering cancellation, medical, and missed connections before buying the Italy flights.' },
      { title: 'Extreme July heat in Rome and Tuscany (10–14 Jul)', detail: 'Rome 32–36°C, Florence similar. Schedule Colosseum, Vatican, and outdoor sites before 10am or after 17:00. Carry water at all times.' },
      { title: 'Colosseum combined ticket — book in advance (11 Jul)', detail: 'Colosseum + Palatine Hill + Roman Forum sells out in peak July. Book at coopculture.it — timed entry required.' },
      { title: 'Bruges canal boats and Belfry get very crowded in July', detail: 'Belfry tower tickets sell out by mid-morning. Canal boat queues peak 11am–14:00. Arrive at the Belfry when it opens (09:30) and do the boat tour early or late afternoon.' },
    ],
  },
  {
    level: 'low',
    label: 'Low',
    dot: 'bg-emerald-500',
    items: [
      { title: 'Prague uses CZK, not Euro', detail: 'One day in Prague — get ~2,000 CZK (~€80) at a Prague ATM on arrival. Avoid airport exchange desks. Card payments widely accepted in tourist areas.' },
      { title: 'Venice is car-free — plan luggage carefully', detail: 'No taxis to the hotel door. Accommodation must be walkable or reachable by vaporetto from Santa Lucia station. Check hotel location before booking. Consider Mestre (mainland) for a significantly cheaper option.' },
      { title: 'Belgium and Netherlands use Euro — no currency change in Bruges or Maastricht', detail: 'Smooth transition. Card payments widely accepted in both cities.' },
      { title: 'World Cup knockout schedule not yet released', detail: 'Specific match dates for Germany TBD. Check fifa.com in late June. Fan zones confirmed in Cologne and Rome — both on your route.' },
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
  summary: 'Germany leg fully confirmed. Düsseldorf visit skipped — travelling via Cologne → Nuremberg (12:45–15:58, ticket bought) → Plauen on 7 Jul. Uncle confirmed in Plauen, staying overnight on 8 Jul (no hotel needed). Departing by train via Dresden to Prague on 9 Jul.',
  lastUpdated: '2026-06-28',
  contacts: [
    {
      name: 'Route — Cologne → Nuremberg → Plauen (7 Jul)',
      status: 'confirmed',
      question: 'New route: Maastricht → Cologne morning, then train Cologne → Nuremberg 12:45–15:58, then Nuremberg → Plauen?',
      ifYes: 'Cologne → Nuremberg ticket bought. Check DB timetable for Nuremberg → Plauen leg. Arrive Plauen evening of 7 Jul.',
      ifNo: 'N/A — route confirmed.',
      worldCup: null,
    },
    {
      name: 'Uncle — Plauen (8–9 Jul)',
      status: 'confirmed',
      question: 'Staying overnight with uncle at Pestalozzistraße 50 on 8 Jul?',
      ifYes: 'Arrive Plauen evening of 7 Jul. Full day with uncle on 8 Jul. No hotel needed — staying at uncle\'s. Depart morning of 9 Jul by train to Dresden, then Prague.',
      ifNo: 'N/A — confirmed, staying with uncle.',
      worldCup: 'If Germany play on 8 Jul, watch with uncle at a local bar in Plauen.',
    },
  ],
  flexibleDays: [
    { date: '2026-07-05', city: 'Cologne → Bruges', note: 'Fixed — morning with brother, after lunch travel to Bruges.' },
    { date: '2026-07-06', city: 'Bruges → Maastricht', note: 'Fixed — morning Bruges, afternoon travel to Maastricht.' },
    { date: '2026-07-07', city: 'Maastricht → Plauen', note: 'Fixed — Maastricht → Cologne (morning), train Cologne → Nuremberg 12:45–15:58 (booked), then Nuremberg → Plauen. Düsseldorf skipped.' },
    { date: '2026-07-08', city: 'Plauen', note: 'Fixed — full day with uncle at Pestalozzistraße 50. Staying overnight. No hotel needed.' },
    { date: '2026-07-09', city: 'Plauen → Prague', note: 'Fixed — train Plauen → Dresden, then Dresden → Prague. Full day Prague.' },
    { date: '2026-07-10', city: 'Prague → Rome', note: 'Fixed endpoint — morning flight PRG → FCO (ticket pending — buy now!).' },
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
            <span className="text-sm font-semibold text-slate-100">Germany Leg — Plan Status</span>
            {pendingCount > 0 ? (
              <span className="ml-2 text-xs bg-amber-900/60 text-amber-400 border border-amber-800/50 rounded-full px-2 py-0.5">
                {pendingCount} awaiting reply
              </span>
            ) : (
              <span className="ml-2 text-xs bg-emerald-900/60 text-emerald-400 border border-emerald-800/50 rounded-full px-2 py-0.5">
                all confirmed
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
                    <span className="text-slate-500">Q: </span>{c.question}
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

          {/* Day-by-day status */}
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

const PRIORITY_STYLE = {
  critical: 'text-red-400 bg-red-900/40 border-red-800/50',
  high:     'text-amber-400 bg-amber-900/40 border-amber-800/50',
  medium:   'text-sky-400 bg-sky-900/40 border-sky-800/50',
}

const ASSIGNEE_OPTIONS = ['Unassigned', 'Xuan', 'Thanh', 'Both']

const ASSIGNEE_STYLE = {
  Unassigned: 'bg-slate-800 text-slate-500 border-slate-600 border-dashed',
  Xuan:       'bg-sky-900/50 text-sky-300 border-sky-700/50',
  Thanh:      'bg-rose-900/50 text-rose-300 border-rose-700/50',
  Both:       'bg-purple-900/50 text-purple-300 border-purple-700/50',
}

function TaskSection() {
  const { state, dispatch } = useTrip()
  const [open, setOpen] = useState(true)
  const [filterAssignee, setFilterAssignee] = useState('All')
  const [showDone, setShowDone] = useState(false)

  const tasks = state.tasks ?? []
  const doneCount = tasks.filter(t => t.done).length
  const totalCount = tasks.length
  const unassignedCount = tasks.filter(t => !t.done && t.assignee === 'Unassigned').length

  // Group by category
  const categories = [...new Set(tasks.map(t => t.category))]

  const filtered = tasks.filter(t => {
    if (!showDone && t.done) return false
    if (filterAssignee !== 'All' && t.assignee !== filterAssignee) return false
    return true
  })

  const grouped = categories.map(cat => ({
    cat,
    items: filtered.filter(t => t.category === cat),
  })).filter(g => g.items.length > 0)

  function cycleAssignee(e, task) {
    e.stopPropagation()
    const next = ASSIGNEE_OPTIONS[(ASSIGNEE_OPTIONS.indexOf(task.assignee) + 1) % ASSIGNEE_OPTIONS.length]
    dispatch({ type: 'SET_TASK_ASSIGNEE', id: task.id, assignee: next })
  }

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900 overflow-hidden">
      <button
        className="w-full flex items-center justify-between px-4 py-3.5 text-left"
        onClick={() => setOpen(o => !o)}
      >
        <div className="flex items-center gap-2.5">
          <span className="text-base">✅</span>
          <div className="flex items-center flex-wrap gap-2">
            <span className="text-sm font-semibold text-slate-100">Pre-Trip Tasks</span>
            <span className="text-xs text-slate-500">{doneCount}/{totalCount} done</span>
            {unassignedCount > 0 && (
              <span className="text-xs bg-slate-700 text-slate-400 border border-slate-600 border-dashed rounded-full px-2 py-0.5">
                {unassignedCount} unassigned
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
        <div className="border-t border-slate-800 pt-3 pb-4">
          {/* Progress bar */}
          <div className="px-4 mb-3">
            <div className="w-full h-1.5 rounded-full bg-slate-800">
              <div
                className="h-1.5 rounded-full bg-emerald-500 transition-all"
                style={{ width: `${Math.round((doneCount / totalCount) * 100)}%` }}
              />
            </div>
            <p className="text-[10px] text-slate-600 mt-1">{Math.round((doneCount / totalCount) * 100)}% complete</p>
          </div>

          {/* Filters */}
          <div className="flex gap-2 px-4 mb-3 overflow-x-auto pb-1 -mx-0 scrollbar-none">
            {['All', ...ASSIGNEE_OPTIONS].map(a => (
              <button
                key={a}
                onClick={() => setFilterAssignee(a)}
                className={`shrink-0 text-xs px-3 py-1 rounded-full font-medium transition-colors border ${
                  filterAssignee === a
                    ? a === 'All' ? 'bg-slate-600 text-white border-slate-500'
                      : ASSIGNEE_STYLE[a]
                    : 'bg-slate-800 text-slate-500 border-slate-700'
                }`}
              >
                {a}
              </button>
            ))}
            <button
              onClick={() => setShowDone(s => !s)}
              className={`shrink-0 text-xs px-3 py-1 rounded-full font-medium transition-colors border ml-auto ${
                showDone ? 'bg-emerald-900/50 text-emerald-400 border-emerald-800/50' : 'bg-slate-800 text-slate-500 border-slate-700'
              }`}
            >
              {showDone ? 'Hide done' : 'Show done'}
            </button>
          </div>

          {/* Grouped task list */}
          <div className="space-y-4 px-4">
            {grouped.map(({ cat, items }) => (
              <div key={cat}>
                <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide mb-2">{cat}</p>
                <div className="space-y-1.5">
                  {items.map(task => (
                    <div
                      key={task.id}
                      className={`rounded-xl border px-3 py-2.5 flex gap-3 items-start transition-opacity ${
                        task.done ? 'opacity-40 border-slate-800 bg-slate-800/30' : 'border-slate-700 bg-slate-800/60'
                      }`}
                    >
                      {/* Checkbox */}
                      <button
                        onClick={() => dispatch({ type: 'TOGGLE_TASK', id: task.id })}
                        className="shrink-0 mt-0.5 w-4 h-4 rounded border flex items-center justify-center transition-colors"
                        style={{
                          backgroundColor: task.done ? '#10b981' : 'transparent',
                          borderColor: task.done ? '#10b981' : '#475569',
                        }}
                      >
                        {task.done && (
                          <svg viewBox="0 0 12 12" fill="none" className="w-2.5 h-2.5" stroke="white" strokeWidth={2}>
                            <path d="M2 6l3 3 5-5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </button>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start gap-2">
                          <p className={`text-xs font-medium flex-1 leading-snug ${task.done ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                            {task.title}
                          </p>
                          {task.priority && !task.done && (
                            <span className={`shrink-0 text-[9px] font-bold px-1.5 py-0.5 rounded border uppercase tracking-wide ${PRIORITY_STYLE[task.priority] ?? ''}`}>
                              {task.priority}
                            </span>
                          )}
                        </div>
                        {task.notes && !task.done && (
                          <p className="text-[10px] text-slate-500 mt-0.5 leading-relaxed">{task.notes}</p>
                        )}
                      </div>

                      {/* Assignee pill — tap to cycle */}
                      <button
                        onClick={(e) => cycleAssignee(e, task)}
                        className={`shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full border transition-colors ${ASSIGNEE_STYLE[task.assignee] ?? 'bg-slate-700 text-slate-400 border-slate-600'}`}
                      >
                        {task.assignee}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {grouped.length === 0 && (
              <p className="text-xs text-slate-600 text-center py-4">No tasks match current filter.</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

const TAG_META = [
  { tag: 'historical',    label: 'Historical',    icon: '🏛️', color: 'bg-amber-500',   track: 'bg-amber-950/60' },
  { tag: 'culture',       label: 'Culture',       icon: '🎨', color: 'bg-purple-500',  track: 'bg-purple-950/60' },
  { tag: 'scenic',        label: 'Scenic',        icon: '🌅', color: 'bg-sky-500',     track: 'bg-sky-950/60' },
  { tag: 'photography',   label: 'Photography',   icon: '📷', color: 'bg-slate-400',   track: 'bg-slate-800/60' },
  { tag: 'food',          label: 'Food',          icon: '🍽️', color: 'bg-orange-500',  track: 'bg-orange-950/60' },
  { tag: 'outdoor',       label: 'Outdoor',       icon: '🥾', color: 'bg-lime-500',    track: 'bg-lime-950/60' },
  { tag: 'local',         label: 'Local',         icon: '🧭', color: 'bg-yellow-500',  track: 'bg-yellow-950/60' },
  { tag: 'romantic',      label: 'Romantic',      icon: '💑', color: 'bg-rose-500',    track: 'bg-rose-950/60' },
  { tag: 'relaxation',    label: 'Relaxation',    icon: '😌', color: 'bg-teal-500',    track: 'bg-teal-950/60' },
  { tag: 'nature',        label: 'Nature',        icon: '🌿', color: 'bg-emerald-500', track: 'bg-emerald-950/60' },
  { tag: 'nightlife',     label: 'Nightlife',     icon: '🌙', color: 'bg-violet-500',  track: 'bg-violet-950/60' },
  { tag: 'shopping',      label: 'Shopping',      icon: '🛍️', color: 'bg-fuchsia-500', track: 'bg-fuchsia-950/60' },
  { tag: 'entertainment', label: 'Entertainment', icon: '🎭', color: 'bg-pink-500',    track: 'bg-pink-950/60' },
  { tag: 'wellness',      label: 'Wellness',      icon: '🧘', color: 'bg-cyan-500',    track: 'bg-cyan-950/60' },
]

function AttributeBalanceSection() {
  const { state } = useTrip()
  const [open, setOpen] = useState(true)
  const [expandedTag, setExpandedTag] = useState(null)

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
          <p className="text-xs text-slate-500 mb-3">Tap an attribute to see where it appears. Only selected activities count.</p>
          {sorted.map(({ tag, label, icon, color, track }) => {
            const count = counts[tag] || 0
            const pct = Math.round((count / max) * 100)
            const { text, style } = levelLabel(count)
            const isExpanded = expandedTag === tag
            const entries = tagIndex[tag] ?? []

            return (
              <div key={tag} className="rounded-lg overflow-hidden">
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
        <TaskSection />
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
