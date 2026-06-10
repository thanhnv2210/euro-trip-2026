import { useState } from 'react'

const TAG_COLORS = {
  historical:   'bg-amber-900/50 text-amber-400 border-amber-800/50',
  culture:      'bg-purple-900/50 text-purple-400 border-purple-800/50',
  food:         'bg-orange-900/50 text-orange-400 border-orange-800/50',
  relaxation:   'bg-teal-900/50 text-teal-400 border-teal-800/50',
  nature:       'bg-emerald-900/50 text-emerald-400 border-emerald-800/50',
  entertainment:'bg-pink-900/50 text-pink-400 border-pink-800/50',
  wellness:     'bg-cyan-900/50 text-cyan-400 border-cyan-800/50',
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
  const [open, setOpen] = useState(false)
  const flag = CITY_FLAGS[day.city] ?? '📍'
  const isTransit = day.notes?.includes('→')

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
            <ul className="space-y-2">
              {day.activities.map(act => (
                <li key={act.id} className="flex gap-3 text-sm">
                  <span className="text-slate-500 font-mono text-xs w-10 shrink-0 pt-0.5">{act.time}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-slate-200">{act.title}</div>
                    {act.notes && <div className="text-xs text-slate-500 mt-0.5">{act.notes}</div>}
                    {act.tags?.length > 0 && (
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
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}
