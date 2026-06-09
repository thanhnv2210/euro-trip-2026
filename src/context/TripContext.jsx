import { createContext, useContext, useReducer, useEffect } from 'react'
import { loadState, saveState } from '../services/storageService'

const TripContext = createContext(null)

const SEED_ITINERARY = [
  { id: 'day-01', date: '2026-07-04', city: 'Frankfurt', notes: 'Depart 12:35 PM SIN (SQ 326). Arrive FRA 19:40.', activities: [] },
  { id: 'day-02', date: '2026-07-05', city: 'Frankfurt', notes: '1 day exploring Frankfurt.', activities: [] },
  { id: 'day-03', date: '2026-07-06', city: 'Düsseldorf', notes: 'Travel from Frankfurt. Visit friend.', activities: [] },
  { id: 'day-04', date: '2026-07-07', city: 'Plauen', notes: 'Travel Düsseldorf → Plauen (~5–6h).', activities: [] },
  { id: 'day-05', date: '2026-07-08', city: 'Plauen', notes: 'Visit uncle at Pestalozzistraße 50, 08523 Plauen.', activities: [] },
  { id: 'day-06', date: '2026-07-09', city: 'Prague', notes: 'Travel Plauen → Prague (~1.5h). Day 1.', activities: [] },
  { id: 'day-07', date: '2026-07-10', city: 'Prague', notes: 'Day 2 in Prague.', activities: [] },
  { id: 'day-08', date: '2026-07-11', city: 'Vienna', notes: 'Travel Prague → Vienna (~4h by train).', activities: [] },
  { id: 'day-09', date: '2026-07-12', city: 'Vienna', notes: 'Day 2 in Vienna.', activities: [] },
  { id: 'day-10', date: '2026-07-13', city: 'Rome', notes: 'Fly Vienna → Rome. (ticket pending)', activities: [] },
  { id: 'day-11', date: '2026-07-14', city: 'Rome', notes: 'Day 2 in Rome.', activities: [] },
  { id: 'day-12', date: '2026-07-15', city: 'Tuscany', notes: 'Travel Rome → Tuscany (~3h).', activities: [] },
  { id: 'day-13', date: '2026-07-16', city: 'Tuscany', notes: 'Day 2 in Tuscany.', activities: [] },
  { id: 'day-14', date: '2026-07-17', city: 'Würzburg', notes: 'Travel Tuscany → Würzburg (plan TBD). Long day.', activities: [] },
  { id: 'day-15', date: '2026-07-18', city: 'Würzburg', notes: "Friend's wedding — evening event.", activities: [] },
  { id: 'day-16', date: '2026-07-19', city: 'Frankfurt', notes: 'Travel Würzburg → Frankfurt (~1.5h). Depart 12:15 PM FRA (SQ 025).', activities: [] },
]

const SEED_EVENTS = [
  { id: 'evt-01', title: 'Flight SIN → FRA (SQ 326)', type: 'flight', date: '2026-07-04', time: '12:35', location: 'Changi Airport T3', bookingRef: 'ESHMZK', url: '', notes: 'SQ 326 · A380-800 · Economy Lite · Arrives FRA 19:40 T1 · Seats: not selected · Baggage: 25kg each', status: 'booked' },
  { id: 'evt-02', title: 'Flight VIE → FCO (Vienna → Rome)', type: 'flight', date: '2026-07-13', time: '', location: 'Vienna Airport', bookingRef: '', url: '', notes: 'Not yet purchased!', status: 'pending' },
  { id: 'evt-03', title: 'Flight FRA → SIN (SQ 025)', type: 'flight', date: '2026-07-19', time: '12:15', location: 'Frankfurt Airport T1', bookingRef: 'ESHMZK', url: '', notes: 'SQ 025 · Boeing 777-300ER · Economy Flexi · Arrives SIN 06:50 20 Jul · Seats: 54G (Xuan), 54E (Thanh) · Baggage: 30kg each', status: 'booked' },
  { id: 'evt-04', title: "Friend's Wedding — Würzburg", type: 'other', date: '2026-07-18', time: '18:00', location: 'Würzburg', bookingRef: '', url: '', notes: '', status: 'confirmed' },
  { id: 'evt-05', title: 'Uncle Visit — Plauen', type: 'other', date: '2026-07-08', time: '', location: 'Pestalozzistraße 50, 08523 Plauen', bookingRef: '', url: '', notes: '', status: 'confirmed' },
]

function reducer(state, action) {
  switch (action.type) {
    case 'SET_STATE': return action.payload
    case 'UPDATE_DAY':
      return { ...state, itinerary: state.itinerary.map(d => d.id === action.day.id ? action.day : d) }
    case 'ADD_EVENT':
      return { ...state, events: [...state.events, action.event] }
    case 'UPDATE_EVENT':
      return { ...state, events: state.events.map(e => e.id === action.event.id ? action.event : e) }
    case 'DELETE_EVENT':
      return { ...state, events: state.events.filter(e => e.id !== action.id) }
    case 'ADD_POST':
      return { ...state, journal: [...state.journal, action.post] }
    case 'UPDATE_POST':
      return { ...state, journal: state.journal.map(p => p.id === action.post.id ? action.post : p) }
    case 'DELETE_POST':
      return { ...state, journal: state.journal.filter(p => p.id !== action.id) }
    default: return state
  }
}

const INITIAL_STATE = {
  itinerary: SEED_ITINERARY,
  events: SEED_EVENTS,
  journal: [],
}

export function TripProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, null, () => {
    const saved = loadState()
    return saved ?? INITIAL_STATE
  })

  useEffect(() => {
    saveState(state)
  }, [state])

  return (
    <TripContext.Provider value={{ state, dispatch }}>
      {children}
    </TripContext.Provider>
  )
}

export function useTrip() {
  return useContext(TripContext)
}
