import { useState, useEffect } from 'react'
import { useTrip } from '../context/TripContext'

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
  const { dispatch } = useTrip()
  const [open, setOpen] = useState(false)
  const [notes, setNotes] = useState(event.notes || '')

  useEffect(() => {
    setNotes(event.notes || '')
  }, [event.notes])

  function handleNotesSave() {
    if (notes !== event.notes) {
      dispatch({ type: 'UPDATE_EVENT', event: { ...event, notes } })
    }
  }

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 overflow-hidden">
      {/* Header — tappable */}
      <button
        className="w-full flex items-start gap-3 px-4 py-3.5 text-left active:bg-slate-800 transition-colors"
        onClick={() => setOpen(o => !o)}
      >
        <span className="text-xl mt-0.5 shrink-0">{TYPE_ICONS[event.type] ?? '📌'}</span>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-slate-100 leading-snug">{event.title}</div>
          <div className="text-xs text-slate-400 mt-0.5">{formatDate(event.date, event.time)}</div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_STYLES[event.status] ?? STATUS_STYLES.pending}`}>
            {event.status}
          </span>
          <svg
            className={`w-4 h-4 text-slate-500 transition-transform ${open ? 'rotate-180' : ''}`}
            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </button>

      {/* Expanded detail */}
      {open && (
        <div className="px-4 pb-4 border-t border-slate-800 pt-3 space-y-2.5">
          <div className="ml-8 space-y-1.5">
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
            {event.url && (
              <a
                href={event.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-xs text-sky-400 underline truncate"
                onClick={e => e.stopPropagation()}
              >
                <svg className="w-3 h-3 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {event.url}
              </a>
            )}
          </div>

          {/* Editable notes / options */}
          <div className="ml-8">
            <div className="text-xs text-slate-500 mb-1.5">Notes & options</div>
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              onBlur={handleNotesSave}
              placeholder="Paste hotel options, links, prices…"
              rows={notes.length > 80 ? 5 : 3}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-300 placeholder-slate-600 resize-none focus:outline-none focus:border-sky-600 transition-colors"
            />
            <p className="text-[10px] text-slate-600 mt-1">Saved automatically when you leave the field</p>
          </div>
        </div>
      )}
    </div>
  )
}
