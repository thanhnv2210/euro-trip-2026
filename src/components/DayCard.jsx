import { useState } from 'react'
import { useTrip } from '../context/TripContext'

const TAG_COLORS = {
  historical:   'bg-amber-900/50 text-amber-400 border-amber-800/50',
  culture:      'bg-purple-900/50 text-purple-400 border-purple-800/50',
  food:         'bg-orange-900/50 text-orange-400 border-orange-800/50',
  relaxation:   'bg-teal-900/50 text-teal-400 border-teal-800/50',
  nature:       'bg-emerald-900/50 text-emerald-400 border-emerald-800/50',
  outdoor:      'bg-lime-900/50 text-lime-400 border-lime-800/50',
  entertainment:'bg-pink-900/50 text-pink-400 border-pink-800/50',
  wellness:     'bg-cyan-900/50 text-cyan-400 border-cyan-800/50',
  scenic:       'bg-sky-900/50 text-sky-400 border-sky-800/50',
  romantic:     'bg-rose-900/50 text-rose-400 border-rose-800/50',
  local:        'bg-yellow-900/50 text-yellow-400 border-yellow-800/50',
  nightlife:    'bg-violet-900/50 text-violet-400 border-violet-800/50',
  shopping:     'bg-fuchsia-900/50 text-fuchsia-400 border-fuchsia-800/50',
  photography:  'bg-slate-700/50 text-slate-300 border-slate-600/50',
}

const CITY_FLAGS = {
  'Frankfurt': '🇩🇪',
  'Düsseldorf': '🇩🇪',
  'Plauen': '🇩🇪',
  'Würzburg': '🇩🇪',
  'Prague': '🇨🇿',
  'Vienna': '🇦🇹',
  'Rome': '🇮🇹',
  'Tuscany': '🇮🇹',
  'Venice': '🇮🇹',
}

function formatDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })
}

function dayNumber(index) {
  return String(index + 1).padStart(2, '0')
}

export default function DayCard({ day, index }) {
  const { dispatch } = useTrip()
  const [open, setOpen] = useState(false)
  const flag = CITY_FLAGS[day.city] ?? '📍'
  const isTransit = day.notes?.includes('→')

  const selectedCount = day.activities.filter(a => a.selected !== false).length

  function toggle(e, actId) {
    e.stopPropagation()
    dispatch({ type: 'TOGGLE_ACTIVITY', dayId: day.id, actId })
  }

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 overflow-hidden">
      <button
        className="w-full flex items-center gap-3 px-4 py-3.5 text-left active:bg-slate-800 transition-colors"
        onClick={() => setOpen(o => !o)}
      >
        <span className="text-xs font-mono text-slate-500 w-6 shrink-0">D{dayNumber(index)}</span>
        <span className="text-lg">{flag}</span>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-slate-100 truncate">{day.city}</div>
          <div className="text-xs text-slate-400">{formatDate(day.date)}</div>
        </div>
        {isTransit && (
          <span className="text-xs bg-sky-900/60 text-sky-400 px-2 py-0.5 rounded-full shrink-0">transit</span>
        )}
        {day.activities.length > 0 && (
          <span className="text-xs text-slate-500 shrink-0">{selectedCount}/{day.activities.length}</span>
        )}
        <svg
          className={`w-4 h-4 text-slate-500 transition-transform shrink-0 ${open ? 'rotate-180' : ''}`}
          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div className="px-4 pb-4 border-t border-slate-800 pt-3 space-y-3">
          {day.notes && (
            <p className="text-sm text-slate-300 leading-relaxed">{day.notes}</p>
          )}
          {day.activities.length === 0 ? (
            <p className="text-xs text-slate-600 italic">No activities yet</p>
          ) : (
            <ul className="space-y-1">
              {day.activities.map(act => {
                const selected = act.selected !== false
                return (
                  <li
                    key={act.id}
                    className={`flex gap-3 rounded-lg px-2 py-2 transition-colors ${selected ? '' : 'opacity-40'}`}
                  >
                    {/* Checkbox */}
                    <button
                      onClick={(e) => toggle(e, act.id)}
                      className="shrink-0 mt-0.5 w-4 h-4 rounded border flex items-center justify-center transition-colors"
                      style={{
                        backgroundColor: selected ? '#0ea5e9' : 'transparent',
                        borderColor: selected ? '#0ea5e9' : '#475569',
                      }}
                    >
                      {selected && (
                        <svg viewBox="0 0 12 12" fill="none" className="w-2.5 h-2.5" stroke="white" strokeWidth={2}>
                          <path d="M2 6l3 3 5-5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </button>

                    <div className="flex-1 min-w-0">
                      <div className={`text-sm ${selected ? 'text-slate-200' : 'text-slate-500 line-through'}`}>
                        {act.title}
                      </div>
                      {act.time && (
                        <div className="text-xs text-slate-500 font-mono mt-0.5">{act.time}</div>
                      )}
                      {selected && act.notes && (
                        <div className="text-xs text-slate-500 mt-0.5">{act.notes}</div>
                      )}
                      {selected && act.tags?.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1.5">
                          {act.tags.map(tag => (
                            <span key={tag} className={`text-[10px] font-medium px-1.5 py-0.5 rounded border capitalize ${TAG_COLORS[tag] ?? 'bg-slate-800 text-slate-400 border-slate-700'}`}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}
