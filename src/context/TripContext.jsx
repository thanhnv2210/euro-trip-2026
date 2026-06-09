import { createContext, useContext, useReducer, useEffect } from 'react'
import { loadState, saveState } from '../services/storageService'

const TripContext = createContext(null)

const SEED_ITINERARY = [
  { id: 'day-01', date: '2026-07-04', city: 'Frankfurt', notes: 'Depart 12:35 PM SIN (SQ 326). Arrive FRA 19:40.', travel: [], activities: [] },
  { id: 'day-02', date: '2026-07-05', city: 'Frankfurt', notes: '1 day exploring Frankfurt.', travel: [], activities: [
    { id: 'fra-1', time: '', title: 'Römerberg & Old Town', notes: 'Medieval town square — the historic heart of Frankfurt' },
    { id: 'fra-2', time: '', title: 'Städel Art Museum', notes: 'One of Germany\'s finest art museums, 700 years of European art' },
    { id: 'fra-3', time: '', title: 'Main Tower Observation Deck', notes: 'Best panoramic views of the Frankfurt skyline — only public skyscraper viewpoint' },
    { id: 'fra-4', time: '', title: 'Sachsenhausen & Apple Wine Trail', notes: 'Old quarter with traditional cider taverns (Äppelwoi) along the riverbank' },
    { id: 'fra-5', time: '', title: 'Palmengarten Botanical Garden', notes: 'Lush tropical greenhouses and gardens — great morning stroll' },
  ]},
  { id: 'day-03', date: '2026-07-06', city: 'Düsseldorf', notes: 'Travel from Frankfurt. Visit friend.', travel: [
    { mode: 'train', duration: '1h 30m', notes: 'ICE direct' },
    { mode: 'car', duration: '2h 30m', notes: 'via A3' },
  ], activities: [
    { id: 'dus-1', time: '', title: 'Altstadt & Rhine Promenade', notes: 'The "longest bar in the world" — packed with breweries and pubs along the Rhine' },
    { id: 'dus-2', time: '', title: 'Königsallee (Kö)', notes: 'Elegant tree-lined boulevard with high-end shops and a canal running through it' },
    { id: 'dus-3', time: '', title: 'MedienHafen', notes: 'Converted harbour with striking Gehry buildings and great waterfront restaurants' },
    { id: 'dus-4', time: '', title: 'Kunstpalast Museum', notes: 'Fine arts museum spanning antiquity to contemporary, free on certain days' },
    { id: 'dus-5', time: '', title: 'Carlsplatz Market', notes: 'Vibrant daily market for local produce, cheese, and street food' },
  ]},
  { id: 'day-04', date: '2026-07-07', city: 'Plauen', notes: 'Travel Düsseldorf → Plauen.', travel: [
    { mode: 'train', duration: '5h', notes: 'change at Frankfurt or Leipzig' },
    { mode: 'car', duration: '4h 30m', notes: 'via A9' },
  ], activities: [] },
  { id: 'day-05', date: '2026-07-08', city: 'Plauen', notes: 'Visit uncle at Pestalozzistraße 50, 08523 Plauen.', travel: [], activities: [
    { id: 'plau-1', time: '', title: 'Altmarkt & Rathaus', notes: 'Historic market square with the impressive Neo-Renaissance town hall' },
    { id: 'plau-2', time: '', title: 'Syrabach Valley (Syrabachtal)', notes: 'Scenic nature walk through the valley just outside the city centre' },
    { id: 'plau-3', time: '', title: 'Vogtland Museum', notes: 'Regional history and culture of the Vogtland area' },
    { id: 'plau-4', time: '', title: 'St. Johanniskirche', notes: 'Gothic church dating to the 13th century, landmark of the city skyline' },
    { id: 'plau-5', time: '', title: 'Friedensbrücke (Peace Bridge)', notes: 'Striking viaduct bridge — a symbol of the city, great photo spot' },
  ]},
  { id: 'day-06', date: '2026-07-09', city: 'Prague', notes: 'Travel Plauen → Prague. Day 1.', travel: [
    { mode: 'car', duration: '1h 30m', notes: 'fastest option' },
    { mode: 'train', duration: '2h 30m', notes: 'change at Cheb' },
    { mode: 'bus', duration: '2h', notes: 'FlixBus direct' },
  ], activities: [
    { id: 'prg-1', time: '', title: 'Prague Castle & St. Vitus Cathedral', notes: 'Largest ancient castle complex in the world — skyline icon, allow 2–3h' },
    { id: 'prg-2', time: '', title: 'Charles Bridge', notes: 'Gothic stone bridge lined with 30 baroque statues, best at sunrise or dusk' },
    { id: 'prg-3', time: '', title: 'Old Town Square & Astronomical Clock', notes: 'Medieval clock performs on the hour — watch from the square' },
  ]},
  { id: 'day-07', date: '2026-07-10', city: 'Prague', notes: 'Day 2 in Prague.', travel: [], activities: [
    { id: 'prg-4', time: '', title: 'Josefov — Jewish Quarter', notes: 'Six historic synagogues and the Old Jewish Cemetery, UNESCO-listed' },
    { id: 'prg-5', time: '', title: 'Petřín Hill & Observation Tower', notes: 'Mini Eiffel Tower with sweeping views — take the funicular up' },
  ]},
  { id: 'day-08', date: '2026-07-11', city: 'Vienna', notes: 'Travel Prague → Vienna.', travel: [
    { mode: 'train', duration: '4h', notes: 'Railjet direct' },
    { mode: 'car', duration: '4h', notes: 'via D1/A5' },
    { mode: 'bus', duration: '4h 30m', notes: 'FlixBus direct' },
  ], activities: [
    { id: 'vie-1', time: '', title: 'Schönbrunn Palace & Gardens', notes: 'Habsburg summer residence — UNESCO, allow a half-day for palace + gardens' },
    { id: 'vie-2', time: '', title: 'St. Stephen\'s Cathedral (Stephansdom)', notes: 'Gothic cathedral at the heart of Vienna — climb the south tower for views' },
    { id: 'vie-3', time: '', title: 'Naschmarkt', notes: 'Vienna\'s most famous open-air market — 80+ stalls of food, spices, and antiques' },
  ]},
  { id: 'day-09', date: '2026-07-12', city: 'Vienna', notes: 'Day 2 in Vienna.', travel: [], activities: [
    { id: 'vie-4', time: '', title: 'Belvedere Palace & Klimt\'s "The Kiss"', notes: 'Baroque palace housing Klimt\'s most famous painting — unmissable' },
    { id: 'vie-5', time: '', title: 'Prater & Wiener Riesenrad', notes: 'City park with the iconic 1897 Giant Ferris Wheel and chestnut tree avenues' },
  ]},
  { id: 'day-10', date: '2026-07-13', city: 'Rome', notes: 'Fly Vienna → Rome. (ticket pending)', travel: [
    { mode: 'flight', duration: '2h', notes: 'VIE → FCO/CIA — ticket pending!' },
    { mode: 'train', duration: '12h+', notes: 'overnight, multiple changes' },
  ], activities: [
    { id: 'rom-1', time: '', title: 'Colosseum & Roman Forum', notes: 'Iconic amphitheatre + ancient ruins — book skip-the-line tickets in advance!' },
    { id: 'rom-2', time: '', title: 'Trevi Fountain', notes: 'Baroque masterpiece — coin toss tradition, best visited early morning to avoid crowds' },
  ]},
  { id: 'day-11', date: '2026-07-14', city: 'Rome', notes: 'Day 2 in Rome.', travel: [], activities: [
    { id: 'rom-3', time: '', title: 'Vatican Museums & Sistine Chapel', notes: 'Michelangelo\'s ceiling — book well in advance, allow 3–4h minimum' },
    { id: 'rom-4', time: '', title: 'Piazza Navona', notes: 'Elegant baroque square with Bernini\'s Fountain of the Four Rivers' },
    { id: 'rom-5', time: '', title: 'Borghese Gallery', notes: 'World-class sculpture and painting in a villa — strictly timed entry, book ahead' },
  ]},
  { id: 'day-12', date: '2026-07-15', city: 'Tuscany', notes: 'Travel Rome → Tuscany.', travel: [
    { mode: 'train', duration: '2h', notes: 'Trenitalia to Florence/Pisa' },
    { mode: 'car', duration: '3h', notes: 'via A1 — more flexible for Tuscany countryside' },
  ], activities: [
    { id: 'tus-1', time: '', title: 'Florence — Uffizi Gallery', notes: 'Botticelli\'s Birth of Venus + Raphael, Michelangelo — book tickets weeks ahead' },
    { id: 'tus-2', time: '', title: 'Florence — Duomo & Brunelleschi\'s Dome', notes: 'Climb the dome for panoramic views over Florence\'s terracotta rooftops' },
    { id: 'tus-3', time: '', title: 'Florence — Ponte Vecchio', notes: 'Medieval bridge lined with jewellery shops over the Arno River' },
  ]},
  { id: 'day-13', date: '2026-07-16', city: 'Tuscany', notes: 'Day 2 in Tuscany.', travel: [], activities: [
    { id: 'tus-4', time: '', title: 'Siena — Piazza del Campo', notes: 'One of Europe\'s greatest medieval squares — fan-shaped and car-free' },
    { id: 'tus-5', time: '', title: 'San Gimignano & Chianti Wine Region', notes: 'Medieval hilltop town with towers + rolling vineyard scenery — great for a drive' },
  ]},
  { id: 'day-14', date: '2026-07-17', city: 'Würzburg', notes: 'Travel Tuscany → Würzburg. Long day.', travel: [
    { mode: 'flight', duration: '3h', notes: 'FLR/PSA → FRA/NUE + transfer (~6h total)' },
    { mode: 'car', duration: '7h', notes: 'via Brenner Pass + A9' },
    { mode: 'train', duration: '9h+', notes: 'multiple changes, overnight option available' },
  ], activities: [] },
  { id: 'day-15', date: '2026-07-18', city: 'Würzburg', notes: "Friend's wedding — evening event.", travel: [], activities: [
    { id: 'wue-1', time: '', title: 'Würzburg Residence', notes: 'UNESCO palace with Tiepolo\'s largest ceiling fresco in the world — allow 2h' },
    { id: 'wue-2', time: '', title: 'Marienberg Fortress', notes: 'Hilltop fortress with sweeping views over the city and Main River vineyards' },
    { id: 'wue-3', time: '', title: 'Old Main Bridge (Alte Mainbrücke)', notes: 'Baroque statues + vineyard views — best spot for a glass of Franconian wine' },
    { id: 'wue-4', time: '', title: 'Würzburg Cathedral (Kiliansdom)', notes: '11th-century Romanesque cathedral, one of the largest in Germany' },
    { id: 'wue-5', time: '', title: 'Hofgarten', notes: 'Baroque gardens behind the Residence — perfect morning walk before the wedding' },
  ]},
  { id: 'day-16', date: '2026-07-19', city: 'Frankfurt', notes: 'Travel Würzburg → Frankfurt. Depart 12:15 PM FRA (SQ 025).', travel: [
    { mode: 'train', duration: '1h', notes: 'ICE direct — recommended (arrive early for flight)' },
    { mode: 'car', duration: '1h 30m', notes: 'via A3' },
  ], activities: [] },
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
