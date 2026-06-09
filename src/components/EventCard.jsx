const TYPE_ICONS = {
  flight: '✈️',
  hotel: '🏨',
  attraction: '🎯',
  transport: '🚂',
  other: '📌',
}

const STATUS_STYLES = {
  booked: 'bg-emerald-900/50 text-emerald-400',
  confirmed: 'bg-sky-900/50 text-sky-400',
  pending: 'bg-amber-900/50 text-amber-400',
}

function formatDate(dateStr, time) {
  const d = new Date(dateStr + 'T00:00:00')
  const date = d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
  return time ? `${date} · ${time}` : date
}

export default function EventCard({ event }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-3.5 space-y-2">
      <div className="flex items-start gap-3">
        <span className="text-xl mt-0.5 shrink-0">{TYPE_ICONS[event.type] ?? '📌'}</span>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-slate-100 leading-snug">{event.title}</div>
          <div className="text-xs text-slate-400 mt-0.5">{formatDate(event.date, event.time)}</div>
        </div>
        <span className={`text-xs px-2 py-0.5 rounded-full font-medium shrink-0 ${STATUS_STYLES[event.status] ?? STATUS_STYLES.pending}`}>
          {event.status}
        </span>
      </div>

      {(event.location || event.bookingRef || event.notes) && (
        <div className="ml-8 space-y-1">
          {event.location && (
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <svg className="w-3 h-3 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" strokeLinecap="round" />
                <circle cx="12" cy="9" r="2.5" />
              </svg>
              {event.location}
            </div>
          )}
          {event.bookingRef && (
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <svg className="w-3 h-3 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <rect x="4" y="4" width="16" height="16" rx="2" />
                <path d="M8 9h8M8 13h5" strokeLinecap="round" />
              </svg>
              Ref: <span className="font-mono text-slate-300">{event.bookingRef}</span>
            </div>
          )}
          {event.notes && (
            <div className="text-xs text-amber-400/80 italic">{event.notes}</div>
          )}
        </div>
      )}
    </div>
  )
}
