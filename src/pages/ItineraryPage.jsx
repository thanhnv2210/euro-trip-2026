import { useTrip } from '../context/TripContext'
import DayCard from '../components/DayCard'

const MODE_ICON = { flight: '✈️', train: '🚆', car: '🚗', bus: '🚌' }

function TravelConnector({ from, to, options }) {
  if (!options || options.length === 0) return null

  return (
    <div className="flex items-start gap-3 px-4 py-2">
      <div className="flex flex-col items-center shrink-0 mt-1">
        <div className="w-px h-2 bg-slate-700" />
        <div className="w-2 h-2 rounded-full bg-slate-600" />
        <div className="w-px h-2 bg-slate-700" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-slate-500 mb-1.5">{from} → {to}</p>
        <div className="flex flex-wrap gap-2">
          {options.map((opt, i) => (
            <div
              key={i}
              className="flex items-center gap-1.5 bg-slate-800/60 border border-slate-700/50 rounded-lg px-2.5 py-1.5"
            >
              <span className="text-sm">{MODE_ICON[opt.mode] ?? '🚐'}</span>
              <span className="text-xs font-medium text-slate-200">{opt.duration}</span>
              {opt.notes && (
                <span className="text-xs text-slate-500 truncate max-w-[120px]">{opt.notes}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function ItineraryPage() {
  const { state } = useTrip()
  const days = [...state.itinerary].sort((a, b) => a.date.localeCompare(b.date))

  return (
    <div className="flex flex-col flex-1">
      {/* Header */}
      <div className="px-4 pt-10 pb-4 bg-slate-950 sticky top-0 z-10 border-b border-slate-800/60">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🗺️</span>
          <div>
            <h1 className="text-lg font-bold text-slate-100">Itinerary</h1>
            <p className="text-xs text-slate-400">4 – 19 Jul 2026 · {days.length} days</p>
          </div>
        </div>
      </div>

      {/* Day list */}
      <div className="flex-1 px-4 py-4 overflow-y-auto">
        {days.map((day, i) => {
          const prev = days[i - 1]
          const cityChanged = prev && prev.city !== day.city
          return (
            <div key={day.id} className="space-y-0">
              {cityChanged && (
                <TravelConnector
                  from={prev.city}
                  to={day.city}
                  options={day.travel}
                />
              )}
              <div className="mb-2">
                <DayCard day={day} index={i} />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
