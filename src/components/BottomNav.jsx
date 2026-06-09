import { NavLink } from 'react-router-dom'

const tabs = [
  {
    to: '/itinerary',
    label: 'Itinerary',
    icon: (active) => (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth={active ? 2.5 : 1.8}>
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M3 9h18M8 2v4M16 2v4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    to: '/events',
    label: 'Bookings',
    icon: (active) => (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth={active ? 2.5 : 1.8}>
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" strokeLinecap="round" />
        <rect x="9" y="3" width="6" height="4" rx="1" />
        <path d="M9 12h6M9 16h4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    to: '/journal',
    label: 'Journal',
    icon: (active) => (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth={active ? 2.5 : 1.8}>
        <path d="M4 19.5A2.5 2.5 0 016.5 17H20" strokeLinecap="round" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" strokeLinecap="round" />
        <path d="M9 7h6M9 11h6M9 15h4" strokeLinecap="round" />
      </svg>
    ),
  },
]

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-800 bg-slate-900/95 backdrop-blur-sm"
      style={{ maxWidth: 480, margin: '0 auto', left: '50%', transform: 'translateX(-50%)', width: '100%' }}>
      <div className="flex">
        {tabs.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center flex-1 py-2 gap-0.5 text-xs font-medium transition-colors
              ${isActive ? 'text-sky-400' : 'text-slate-500 hover:text-slate-300'}`
            }
          >
            {({ isActive }) => (
              <>
                {icon(isActive)}
                <span>{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
