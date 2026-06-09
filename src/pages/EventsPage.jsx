import { useTrip } from '../context/TripContext'
import EventCard from '../components/EventCard'

const TYPE_FILTERS = ['all', 'flight', 'hotel', 'transport', 'attraction', 'other']

import { useState } from 'react'

export default function EventsPage() {
  const { state } = useTrip()
  const [filter, setFilter] = useState('all')

  const events = [...state.events]
    .filter(e => filter === 'all' || e.type === filter)
    .sort((a, b) => a.date.localeCompare(b.date))

  const pendingCount = state.events.filter(e => e.status === 'pending').length

  return (
    <div className="flex flex-col flex-1">
      {/* Header */}
      <div className="px-4 pt-10 pb-3 bg-slate-950 sticky top-0 z-10 border-b border-slate-800/60">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎫</span>
            <div>
              <h1 className="text-lg font-bold text-slate-100">Bookings</h1>
              <p className="text-xs text-slate-400">{state.events.length} events</p>
            </div>
          </div>
          {pendingCount > 0 && (
            <div className="flex items-center gap-1.5 bg-amber-900/40 border border-amber-700/40 rounded-lg px-3 py-1.5">
              <span className="text-amber-400 text-xs font-medium">⚠ {pendingCount} pending</span>
            </div>
          )}
        </div>

        {/* Type filter pills */}
        <div className="flex gap-2 mt-3 overflow-x-auto pb-1 -mx-4 px-4 scrollbar-none">
          {TYPE_FILTERS.map(t => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`shrink-0 text-xs px-3 py-1.5 rounded-full font-medium transition-colors capitalize
                ${filter === t
                  ? 'bg-sky-500 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Events list */}
      <div className="flex-1 px-4 py-4 space-y-3 overflow-y-auto">
        {events.length === 0 ? (
          <div className="text-center py-16 text-slate-600">
            <div className="text-4xl mb-3">🎫</div>
            <p className="text-sm">No bookings yet</p>
          </div>
        ) : (
          events.map(event => (
            <EventCard key={event.id} event={event} />
          ))
        )}
      </div>
    </div>
  )
}
