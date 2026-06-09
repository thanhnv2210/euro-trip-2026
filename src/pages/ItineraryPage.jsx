import { useTrip } from '../context/TripContext'
import DayCard from '../components/DayCard'

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
      <div className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
        {days.map((day, i) => (
          <DayCard key={day.id} day={day} index={i} />
        ))}
      </div>
    </div>
  )
}
