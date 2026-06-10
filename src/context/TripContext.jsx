import { createContext, useContext, useReducer, useEffect } from 'react'
import { loadState, saveState } from '../services/storageService'

const TripContext = createContext(null)

const SEED_ITINERARY = [
  // — Germany leg (5 Jul flexible: Düsseldorf, Plauen, Prague plan TBD) —
  { id: 'day-01', date: '2026-07-04', city: 'Frankfurt', notes: 'Depart 12:35 PM SIN (SQ 326). Arrive FRA 19:40.', travel: [], activities: [] },
  { id: 'day-02', date: '2026-07-05', city: 'Frankfurt', notes: '1 day exploring Frankfurt.', travel: [], activities: [
    { id: 'fra-1', time: '', title: 'Römerberg & Old Town', notes: 'Medieval town square — the historic heart of Frankfurt', tags: ['historical', 'culture', 'scenic', 'photography'] },
    { id: 'fra-2', time: '', title: 'Städel Art Museum', notes: 'One of Germany\'s finest art museums, 700 years of European art', tags: ['culture'] },
    { id: 'fra-3', time: '', title: 'Main Tower Observation Deck', notes: 'Best panoramic views of the Frankfurt skyline — only public skyscraper viewpoint', tags: ['scenic', 'photography', 'outdoor'] },
    { id: 'fra-4', time: '', title: 'Sachsenhausen & Apple Wine Trail', notes: 'Old quarter with traditional cider taverns (Äppelwoi) along the riverbank', tags: ['food', 'local', 'nightlife'] },
    { id: 'fra-5', time: '', title: 'Palmengarten Botanical Garden', notes: 'Lush tropical greenhouses and gardens — great morning stroll', tags: ['nature', 'relaxation', 'outdoor'] },
    { id: 'fra-6', time: '', title: 'Kleinmarkthalle — Indoor Market', notes: 'Frankfurt\'s beloved covered market — fresh produce, local cheeses, meats, flowers. Great for souvenir spices and edible gifts. Safe and family-friendly.', tags: ['shopping', 'food', 'local'] },
    { id: 'fra-7', time: '', title: 'Evening River Cruise on the Main', notes: 'Hour-long boat tour past the skyline and Römerberg at sunset — relaxing intro to Frankfurt. Departs near Eiserner Steg bridge.', tags: ['entertainment', 'scenic', 'romantic', 'relaxation'] },
    { id: 'fra-8', time: '', title: '⚽ FIFA World Cup — Germany Match (Public Viewing)', notes: 'World Cup 2026 runs Jun 11–Jul 19. Knockout rounds fall during your Germany leg (4–9 Jul). Frankfurt hosted 2006 WC games — expect massive Fanzone setups at Römerberg or Commerzbank Arena fan park if Germany is still in. Check schedule at fifa.com closer to departure. Watching with 10,000+ Germans is unforgettable. Safety: German football crowds are well-policed and family-friendly. Arrive early for a good spot.', tags: ['entertainment', 'local', 'nightlife', 'outdoor'] },
  ]},
  { id: 'day-03', date: '2026-07-06', city: 'Düsseldorf', notes: 'Travel from Frankfurt. Visit friend. (flexible — friends may join for Germany leg)', travel: [
    { mode: 'train', duration: '1h 30m', notes: 'ICE direct' },
    { mode: 'car', duration: '2h 30m', notes: 'via A3' },
  ], activities: [
    { id: 'dus-1', time: '', title: 'Altstadt & Rhine Promenade', notes: 'The "longest bar in the world" — packed with breweries and pubs along the Rhine', tags: ['food', 'nightlife', 'local', 'outdoor'] },
    { id: 'dus-2', time: '', title: 'Königsallee (Kö)', notes: 'Elegant tree-lined boulevard with high-end shops and a canal running through it', tags: ['shopping', 'scenic', 'relaxation'] },
    { id: 'dus-3', time: '', title: 'MedienHafen', notes: 'Converted harbour with striking Gehry buildings and great waterfront restaurants', tags: ['culture', 'food', 'photography', 'scenic'] },
    { id: 'dus-4', time: '', title: 'Kunstpalast Museum', notes: 'Fine arts museum spanning antiquity to contemporary, free on certain days', tags: ['culture'] },
    { id: 'dus-5', time: '', title: 'Carlsplatz Market', notes: 'Vibrant daily market for local produce, cheese, and street food', tags: ['food', 'local', 'shopping'] },
    { id: 'dus-6', time: '', title: 'Rheinwiesen (Rhine Meadows)', notes: 'Wide grassy riverbank south of the Altstadt — locals picnic, jog and swim here in summer. Very safe, open and public.', tags: ['nature', 'outdoor', 'relaxation', 'local'] },
    { id: 'dus-7', time: '', title: 'Altstadt Evening — Early Night Out with Friend', notes: 'Düsseldorf Altstadt is lively but manageable. Safety tip: great before midnight — stick to the main Bolkerstraße strip, avoid side alleys after midnight. Your local friend will know which bars are best.', tags: ['nightlife', 'food', 'local', 'entertainment'] },
    { id: 'dus-8', time: '', title: '⚽ FIFA World Cup — Germany Match at Altstadt Bars', notes: 'If a Germany match falls on 6 Jul, watch it with your local friend in the Altstadt — every bar will be showing it. The Rhine promenade turns into a street party when Germany score. Your friend will know the best spot to be. Quarter-finals are ~13–14 Jul (you\'ll be in Rome), semis ~16–17 Jul (Venice), final 19 Jul (departure day — might catch it at FRA airport!)', tags: ['entertainment', 'local', 'nightlife', 'outdoor'] },
  ]},
  { id: 'day-04', date: '2026-07-07', city: 'Plauen', notes: 'Travel Düsseldorf → Plauen. (flexible)', travel: [
    { mode: 'train', duration: '5h', notes: 'change at Frankfurt or Leipzig' },
    { mode: 'car', duration: '4h 30m', notes: 'via A9' },
  ], activities: [] },
  { id: 'day-05', date: '2026-07-08', city: 'Plauen', notes: 'Visit uncle at Pestalozzistraße 50, 08523 Plauen. (flexible)', travel: [], activities: [
    { id: 'plau-1', time: '', title: 'Altmarkt & Rathaus', notes: 'Historic market square with the impressive Neo-Renaissance town hall', tags: ['historical', 'culture', 'photography'] },
    { id: 'plau-2', time: '', title: 'Syrabach Valley (Syrabachtal)', notes: 'Scenic nature walk through the valley just outside the city centre', tags: ['nature', 'outdoor', 'scenic', 'relaxation'] },
    { id: 'plau-3', time: '', title: 'Vogtland Museum', notes: 'Regional history and culture of the Vogtland area', tags: ['historical', 'culture', 'local'] },
    { id: 'plau-4', time: '', title: 'St. Johanniskirche', notes: 'Gothic church dating to the 13th century, landmark of the city skyline', tags: ['historical', 'photography'] },
    { id: 'plau-5', time: '', title: 'Friedensbrücke (Peace Bridge)', notes: 'Striking viaduct bridge — a symbol of the city, great photo spot', tags: ['scenic', 'photography', 'outdoor'] },
  ]},
  { id: 'day-06', date: '2026-07-09', city: 'Prague', notes: 'Travel from Plauen → Prague (flexible). Travel to Vienna in the evening for morning flight to Rome.', travel: [
    { mode: 'car', duration: '1h 30m', notes: 'Plauen → Prague, fastest option' },
    { mode: 'train', duration: '2h 30m', notes: 'change at Cheb' },
    { mode: 'bus', duration: '2h', notes: 'FlixBus direct' },
  ], activities: [
    { id: 'prg-1', time: '', title: 'Prague Castle & St. Vitus Cathedral', notes: 'Largest ancient castle complex in the world — skyline icon, allow 2–3h', tags: ['historical', 'culture', 'scenic', 'photography'] },
    { id: 'prg-2', time: '', title: 'Charles Bridge', notes: 'Gothic stone bridge lined with 30 baroque statues, best at sunrise or dusk', tags: ['historical', 'scenic', 'photography', 'romantic'] },
    { id: 'prg-3', time: '', title: 'Old Town Square & Astronomical Clock', notes: 'Medieval clock performs on the hour — watch from the square', tags: ['historical', 'culture', 'local'] },
    { id: 'prg-4', time: '', title: 'Josefov — Jewish Quarter', notes: 'Six historic synagogues and the Old Jewish Cemetery, UNESCO-listed', tags: ['historical', 'culture'] },
    { id: 'prg-5', time: '', title: 'Petřín Hill & Observation Tower', notes: 'Mini Eiffel Tower with sweeping views — take the funicular up', tags: ['nature', 'outdoor', 'scenic', 'romantic'] },
    { id: 'prg-6', time: '', title: 'Czech Beer Spa (Beerland or Bernard Spa)', notes: 'Unique to Czech Republic — soak in warm beer bath with unlimited craft beer on tap. Completely private tub for two. Deeply relaxing. Book in advance.', tags: ['wellness', 'relaxation', 'romantic', 'local', 'entertainment'] },
    { id: 'prg-7', time: '', title: 'Havelské Tržiště — Old Town Market', notes: 'Open-air market in the Old Town selling Czech crafts, garnet jewellery, wooden toys and souvenirs. Great prices compared to tourist shops.', tags: ['shopping', 'local'] },
    { id: 'prg-8', time: '', title: 'Hemingway Bar or Jazz Dock — Evening Cocktails', notes: 'Two of Prague\'s best cocktail bars — elegant, well-lit, tourist-friendly. Safety tip: Old Town bars are very safe; avoid "hostess bar" signs and anyone inviting you off the main tourist streets. Pickpockets active in crowds — keep bags in front.', tags: ['nightlife', 'local', 'relaxation'] },
  ]},

  // — Italy leg —
  { id: 'day-07', date: '2026-07-10', city: 'Rome', notes: 'Fly Vienna → Rome morning. Arrive afternoon. (VIE→ROM ticket pending!)', travel: [
    { mode: 'flight', duration: '2h', notes: 'VIE → FCO/CIA — ticket pending! Book now' },
  ], activities: [
    { id: 'rom-arr-1', time: '', title: 'Trevi Fountain + Gelato', notes: 'Coin toss tradition — visit early evening to beat the crowds', tags: ['historical', 'food', 'romantic', 'photography'] },
    { id: 'rom-arr-2', time: '', title: 'Campo de\' Fiori', notes: 'Lively piazza — great for an evening aperitivo and people-watching', tags: ['food', 'local', 'nightlife'] },
  ]},
  { id: 'day-08', date: '2026-07-11', city: 'Rome', notes: 'Rome Day 2 — Ancient Rome.', travel: [], activities: [
    { id: 'rom-2-1', time: '', title: 'Colosseum + Palatine Hill + Roman Forum', notes: 'Book combined skip-the-line ticket in advance — allow a full morning', tags: ['historical', 'culture', 'outdoor', 'photography'] },
    { id: 'rom-2-2', time: '', title: 'Pantheon', notes: 'Best-preserved Roman temple — free entry, go early to avoid queues', tags: ['historical', 'culture', 'photography'] },
    { id: 'rom-2-3', time: '', title: 'Piazza Navona', notes: 'Baroque square with Bernini\'s Fountain of the Four Rivers — great for lunch nearby', tags: ['culture', 'food', 'local', 'scenic'] },
    { id: 'rom-2-4', time: '', title: 'Aperitivo at Sunset — Trastevere', notes: 'Trastevere is Rome\'s safest and most atmospheric evening neighbourhood — cobbled lanes, lit by warm lamps, busy with families and tourists until midnight. Safety tip: fine to walk freely here; keep bags zipped and avoid phone-in-hand on quiet streets.', tags: ['food', 'local', 'nightlife', 'romantic'] },
    { id: 'rom-2-5', time: '', title: 'Villa Borghese Gardens', notes: 'Rome\'s most beautiful park — rent a rowboat on the lake, stroll tree-lined paths. Perfect mid-day break from the heat between sights. Very safe and popular with locals.', tags: ['nature', 'outdoor', 'relaxation', 'romantic'] },
    { id: 'rom-2-7', time: '', title: '⚽ FIFA World Cup — Quarter-Final Watch Party (Rome)', notes: 'Quarter-finals fall ~13–14 Jul — you\'ll be in Rome. Piazza del Popolo and Trastevere bars host massive public viewing parties. If Germany vs Italy happens, the atmosphere will be electric. Italy fans are passionate but festive — completely safe at public viewings.', tags: ['entertainment', 'local', 'nightlife', 'outdoor'] },
    { id: 'rom-2-6', time: '', title: 'Via Condotti & Via del Corso — Shopping', notes: 'Via Condotti for luxury brands (Gucci, Valentino); Via del Corso for mid-range and high street. Both safe, wide pedestrian streets in central Rome.', tags: ['shopping', 'local'] },
  ]},
  { id: 'day-09', date: '2026-07-12', city: 'Rome', notes: 'Rome Day 3 — Vatican + leisure.', travel: [], activities: [
    { id: 'rom-3-1', time: '', title: 'Vatican Museums + Sistine Chapel', notes: 'Michelangelo\'s ceiling — book well in advance, allow 3–4h minimum', tags: ['historical', 'culture'] },
    { id: 'rom-3-2', time: '', title: 'St. Peter\'s Basilica + Dome', notes: 'Free entry to basilica — climb the dome for sweeping Rome views', tags: ['historical', 'culture', 'scenic', 'outdoor'] },
    { id: 'rom-3-3', time: '', title: 'Spanish Steps', notes: 'Iconic 18th-century staircase — popular at sunset, great for gelato nearby', tags: ['scenic', 'photography', 'romantic', 'relaxation'] },
    { id: 'rom-3-4', time: '', title: 'Spa Day', notes: 'Wind down after 3 days of sightseeing — several day spas near the city centre', tags: ['wellness', 'relaxation', 'romantic'] },
    { id: 'rom-3-5', time: '', title: 'Michelin Star Dinner', notes: 'Book a restaurant in advance — Rome has several starred options at various price points', tags: ['food', 'romantic'] },
  ]},

  { id: 'day-10', date: '2026-07-13', city: 'Tuscany', notes: 'Train Rome → Florence/Tuscany morning. Arrive afternoon.', travel: [
    { mode: 'train', duration: '1h 30m', notes: 'Trenitalia Frecciarossa to Florence SMN — fastest' },
    { mode: 'car', duration: '3h', notes: 'via A1 — more flexible for countryside stops' },
  ], activities: [
    { id: 'tus-arr-1', time: '', title: 'Florence — Ponte Vecchio', notes: 'Medieval bridge over the Arno — beautiful at dusk', tags: ['historical', 'scenic', 'photography', 'romantic'] },
    { id: 'tus-arr-2', time: '', title: 'Florence — Oltrarno neighbourhood', notes: 'Quiet side of the Arno — great trattorias and artisan shops', tags: ['food', 'local', 'shopping'] },
    { id: 'tus-arr-3', time: '', title: 'San Lorenzo Leather Market + Mercato Centrale', notes: 'Florence\'s famous open-air leather market — bags, belts, wallets at good prices. Tip: bargain firmly, start at 50% of asking price. Mercato Centrale upstairs has excellent food stalls.', tags: ['shopping', 'food', 'local'] },
  ]},
  { id: 'day-11', date: '2026-07-14', city: 'Tuscany', notes: 'Tuscany full day.', travel: [], activities: [
    { id: 'tus-2-1', time: '', title: 'Florence — Uffizi Gallery', notes: 'Botticelli\'s Birth of Venus — book tickets weeks ahead, allow 3h', tags: ['culture', 'historical'] },
    { id: 'tus-2-2', time: '', title: 'Florence — Duomo & Brunelleschi\'s Dome', notes: 'Climb the dome for panoramic views over terracotta rooftops — book timed entry', tags: ['historical', 'culture', 'scenic', 'outdoor'] },
    { id: 'tus-2-3', time: '', title: 'Siena — Piazza del Campo', notes: 'One of Europe\'s greatest medieval squares, ~1.5h from Florence by train', tags: ['historical', 'culture', 'photography'] },
    { id: 'tus-2-4', time: '', title: 'Chianti Wine Region drive', notes: 'Rolling vineyard scenery between Florence and Siena — great if you have a car', tags: ['nature', 'food', 'scenic', 'romantic', 'outdoor'] },
    { id: 'tus-2-5', time: '', title: 'San Gimignano', notes: 'Medieval hilltop town with towers — best gelato in Tuscany (Gelateria Dondoli)', tags: ['historical', 'food', 'local', 'photography'] },
    { id: 'tus-2-6', time: '', title: 'Tuscan Cooking Class', notes: 'Half-day class learning pasta, bruschetta and tiramisu — many options in Florence and the countryside. Fun, hands-on, and the best souvenir you can take home.', tags: ['entertainment', 'food', 'local', 'wellness'] },
    { id: 'tus-2-7', time: '', title: 'Terme di Saturnia (Hot Springs)', notes: '~2h drive from Florence — natural thermal waterfalls flowing into cascading pools. Free and open 24h. Unique wellness experience unlike anything in Singapore.', tags: ['wellness', 'nature', 'outdoor', 'relaxation', 'romantic'] },
  ]},

  { id: 'day-12', date: '2026-07-15', city: 'Venice', notes: 'Train Tuscany → Venice morning. Arrive afternoon.', travel: [
    { mode: 'train', duration: '2h', notes: 'Trenitalia direct Florence → Venezia Santa Lucia' },
    { mode: 'car', duration: '3h', notes: 'via A13 — park at Piazzale Roma on arrival' },
  ], activities: [
    { id: 'ven-arr-1', time: '', title: 'St. Mark\'s Square (Piazza San Marco)', notes: 'Heart of Venice — arrive in the afternoon when light is golden', tags: ['historical', 'culture', 'scenic', 'photography'] },
    { id: 'ven-arr-2', time: '', title: 'Rialto Bridge & Market', notes: 'Iconic bridge over the Grand Canal — evening stroll and dinner nearby', tags: ['historical', 'food', 'local', 'photography'] },
  ]},
  { id: 'day-13', date: '2026-07-16', city: 'Venice', notes: 'Venice full day.', travel: [], activities: [
    { id: 'ven-2-1', time: '', title: 'Grand Canal Gondola Ride', notes: 'Classic Venice experience — negotiate price before boarding, best at dusk', tags: ['romantic', 'scenic', 'local', 'entertainment'] },
    { id: 'ven-2-2', time: '', title: 'Doge\'s Palace', notes: 'Gothic palace and former seat of Venetian power — book ahead, allow 2h', tags: ['historical', 'culture'] },
    { id: 'ven-2-3', time: '', title: 'Murano Island — Glass Blowing', notes: 'Short vaporetto ride — watch artisan glass-blowing demonstrations', tags: ['culture', 'local', 'shopping', 'entertainment'] },
    { id: 'ven-2-4', time: '', title: 'Burano Island', notes: 'Colourful fishing village with lace-making tradition — photogenic and peaceful', tags: ['photography', 'scenic', 'local', 'relaxation', 'outdoor'] },
    { id: 'ven-2-5', time: '', title: 'Zattere Waterfront at Sunset', notes: 'Best sunset viewpoint in Venice — wide promenade facing the Giudecca Canal', tags: ['scenic', 'romantic', 'photography', 'relaxation'] },
    { id: 'ven-2-6', time: '', title: 'Lido Beach — Venice\'s Own Beach', notes: '15-min vaporetto from St. Mark\'s — a full sandy beach on the Adriatic. Great for a morning swim before sightseeing. Very safe, very local.', tags: ['nature', 'outdoor', 'relaxation', 'wellness'] },
    { id: 'ven-2-7', time: '', title: 'Cicchetti Bar Crawl — Cannaregio', notes: 'Venice\'s answer to tapas — small bites (cicchetti) with prosecco at €1–2 each. Cannaregio is the safest, most local neighbourhood. Safety tip: Venice is one of Europe\'s safest cities at night — no cars, well-lit canals, no rough areas in the tourist zone. Simply enjoy.', tags: ['nightlife', 'food', 'local', 'relaxation'] },
    { id: 'ven-2-8', time: '', title: 'Venetian Glass & Lace Shopping', notes: 'Murano glass jewellery (get it on the island, not tourist shops in San Marco — much cheaper and authentic). Burano lace tablecloths make beautiful gifts.', tags: ['shopping', 'local'] },
  ]},

  // — Return Germany leg —
  { id: 'day-14', date: '2026-07-17', city: 'Würzburg', notes: 'Fly Venice → Frankfurt morning. Train Frankfurt → Würzburg. Arrive afternoon. (VCE→FRA ticket pending!)', travel: [
    { mode: 'flight', duration: '2h', notes: 'VCE → FRA — ticket pending! + ~1h train to Würzburg (~3h total)' },
    { mode: 'car', duration: '6h', notes: 'via Brenner Pass + A9 — long but flexible' },
  ], activities: [] },
  { id: 'day-15', date: '2026-07-18', city: 'Würzburg', notes: "Friend's wedding — evening event.", travel: [], activities: [
    { id: 'wue-1', time: '', title: 'Würzburg Residence', notes: 'UNESCO palace with Tiepolo\'s largest ceiling fresco in the world — allow 2h', tags: ['historical', 'culture', 'photography'] },
    { id: 'wue-2', time: '', title: 'Marienberg Fortress', notes: 'Hilltop fortress with sweeping views over the city and Main River vineyards', tags: ['historical', 'scenic', 'outdoor', 'photography'] },
    { id: 'wue-3', time: '', title: 'Old Main Bridge (Alte Mainbrücke)', notes: 'Baroque statues + vineyard views — best spot for a glass of Franconian wine', tags: ['scenic', 'food', 'local', 'relaxation', 'romantic'] },
    { id: 'wue-4', time: '', title: 'Würzburg Cathedral (Kiliansdom)', notes: '11th-century Romanesque cathedral, one of the largest in Germany', tags: ['historical', 'culture'] },
    { id: 'wue-5', time: '', title: 'Hofgarten', notes: 'Baroque gardens behind the Residence — perfect morning walk before the wedding', tags: ['nature', 'relaxation', 'outdoor'] },
    { id: 'wue-6', time: '', title: 'Franconian Wine Tasting at a Weingut', notes: 'Würzburg sits in one of Germany\'s best wine regions — visit a local Weingut (winery estate) for a guided tasting of Silvaner and Müller-Thurgau whites. Many are walkable from the old town.', tags: ['entertainment', 'food', 'local', 'wellness'] },
    { id: 'wue-7', time: '', title: 'Wedding Evening — Night Out with Friends', notes: 'After the wedding reception, Würzburg has a small but safe bar scene around the old town and Main riverside. Very safe small German city — no concerns navigating after dark with wedding guests.', tags: ['nightlife', 'entertainment', 'local'] },
  ]},
  { id: 'day-16', date: '2026-07-19', city: 'Frankfurt', notes: 'Train Würzburg → Frankfurt. Depart 12:15 PM FRA (SQ 025). Take earliest train. ⚽ World Cup Final is today — FRA airport screens will be showing it!', travel: [
    { mode: 'train', duration: '1h', notes: 'ICE direct — take the earliest train, aim FRA by 09:30' },
    { mode: 'car', duration: '1h 30m', notes: 'via A3' },
  ], activities: [] },
]

const SEED_EVENTS = [
  { id: 'evt-01', title: 'Flight SIN → FRA (SQ 326)', type: 'flight', date: '2026-07-04', time: '12:35', location: 'Changi Airport T3', bookingRef: 'ESHMZK', url: '', notes: 'SQ 326 · A380-800 · Economy Lite · Arrives FRA 19:40 T1 · Seats: not selected · Baggage: 25kg each', status: 'booked' },
  { id: 'evt-02', title: 'Flight VIE → FCO (Vienna → Rome)', type: 'flight', date: '2026-07-10', time: '', location: 'Vienna Airport', bookingRef: '', url: '', notes: 'Not yet purchased! Arrive Rome afternoon.', status: 'pending' },
  { id: 'evt-03', title: 'Flight FRA → SIN (SQ 025)', type: 'flight', date: '2026-07-19', time: '12:15', location: 'Frankfurt Airport T1', bookingRef: 'ESHMZK', url: '', notes: 'SQ 025 · Boeing 777-300ER · Economy Flexi · Arrives SIN 06:50 20 Jul · Seats: 54G (Xuan), 54E (Thanh) · Baggage: 30kg each', status: 'booked' },
  { id: 'evt-06', title: 'Flight VCE → FRA (Venice → Frankfurt)', type: 'flight', date: '2026-07-17', time: '', location: 'Venice Marco Polo Airport', bookingRef: '', url: '', notes: 'Not yet purchased! Take morning flight — need to reach Würzburg by afternoon.', status: 'pending' },
  { id: 'evt-04', title: "Friend's Wedding — Würzburg", type: 'other', date: '2026-07-18', time: '18:00', location: 'Würzburg', bookingRef: '', url: '', notes: '', status: 'confirmed' },
  { id: 'evt-05', title: 'Uncle Visit — Plauen', type: 'other', date: '2026-07-08', time: '', location: 'Pestalozzistraße 50, 08523 Plauen', bookingRef: '', url: '', notes: '', status: 'confirmed' },
]

function reducer(state, action) {
  switch (action.type) {
    case 'SET_STATE': return action.payload
    case 'UPDATE_DAY':
      return { ...state, itinerary: state.itinerary.map(d => d.id === action.day.id ? action.day : d) }
    case 'TOGGLE_ACTIVITY':
      return {
        ...state,
        itinerary: state.itinerary.map(d =>
          d.id !== action.dayId ? d : {
            ...d,
            activities: d.activities.map(a =>
              a.id !== action.actId ? a : { ...a, selected: !(a.selected ?? true) }
            )
          }
        )
      }
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
