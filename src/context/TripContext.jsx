import { createContext, useContext, useReducer, useEffect } from 'react'
import { loadState, saveState } from '../services/storageService'

const TripContext = createContext(null)

const SEED_ITINERARY = [
  // — Germany / Benelux leg —
  { id: 'day-01', date: '2026-07-04', city: 'Frankfurt', notes: 'Depart 12:35 PM SIN (SQ 326). Arrive FRA 19:40. Take train to Cologne (~1h ICE) — staying at brother\'s house.', travel: [], activities: [] },

  { id: 'day-02', date: '2026-07-05', city: 'Cologne', notes: 'Morning in Cologne with brother. After lunch travel to Bruges, Belgium.', travel: [
    { mode: 'train', duration: '2h 30m', notes: 'Cologne Hbf → Brussels Midi, change to Bruges (~30min). Total ~3h.' },
    { mode: 'car', duration: '2h 30m', notes: 'via A4/E40 through Belgium' },
  ], activities: [
    { id: 'cgn-1', time: '', title: 'Cologne Cathedral (Kölner Dom)', notes: 'UNESCO Gothic masterpiece — twin spires dominate the skyline. Free entry to cathedral; tower climb for views.', tags: ['historical', 'culture', 'scenic', 'photography'], priority: 5, priorityNote: 'UNESCO icon, unmissable even for 30 min — free entry' },
    { id: 'cgn-2', time: '', title: 'Old Town & Hohenzollern Bridge', notes: 'Walk the Rhine promenade, see the famous love-lock bridge. Relaxed morning stroll with brother.', tags: ['scenic', 'outdoor', 'local', 'romantic'], priority: 4, priorityNote: 'Lovely morning stroll along the Rhine, great with brother' },
    { id: 'cgn-3', time: '', title: '⚽ FIFA World Cup — Germany Match (Cologne Fan Zone)', notes: 'Cologne has a large fan zone near the Rhine. Watch with brother and locals if Germany play on 5 Jul.', tags: ['entertainment', 'local', 'nightlife', 'outdoor'], priority: 3, priorityNote: 'Worth it only if Germany play on 5 Jul — check fixtures first' },
  ]},

  { id: 'day-03', date: '2026-07-06', city: 'Bruges', notes: 'Full day in Bruges, Belgium 🇧🇪', travel: [], activities: [
    { id: 'bru-1', time: '', title: 'Markt Square & Belfry Tower', notes: 'Heart of Bruges — climb the 366-step Belfry for panoramic views over the medieval rooftops.', tags: ['historical', 'culture', 'scenic', 'photography', 'outdoor'], priority: 5, priorityNote: 'The defining Bruges image — climb the tower for rooftop views' },
    { id: 'bru-2', time: '', title: 'Canal Boat Tour', notes: '30-min boat tour through the medieval canals — the most romantic way to see Bruges. Very popular, queues form quickly.', tags: ['scenic', 'romantic', 'entertainment', 'local'], priority: 5, priorityNote: '30 min, very romantic — the single best way to experience Bruges' },
    { id: 'bru-3', time: '', title: 'Bruges Chocolate & Beer Trail', notes: 'Belgium has the world\'s finest chocolate and beer. Visit a chocolate maker workshop and try local Bruges Zot beer at a traditional café.', tags: ['food', 'local', 'entertainment'], priority: 4, priorityNote: 'Belgium\'s best — don\'t leave without trying Bruges Zot beer' },
    { id: 'bru-4', time: '', title: 'Groeningemuseum', notes: 'Home to the Flemish Primitives — Jan van Eyck\'s masterpieces. Small but world-class museum.', tags: ['culture', 'historical'], priority: 3, priorityNote: 'World-class Flemish art — skip if museums aren\'t your priority' },
    { id: 'bru-5', time: '', title: 'Bruges Lace & Souvenir Shopping', notes: 'Bruges is famous for handmade bobbin lace — pick up a piece as a keepsake. Best shops around Markt Square.', tags: ['shopping', 'local', 'culture'], priority: 3, priorityNote: 'Nice keepsake stop — do after boat tour if time allows' },
  ]},

  { id: 'day-04', date: '2026-07-07', city: 'Maastricht', notes: 'Bruges → Maastricht (Netherlands) 🇳🇱. Evening: drive to Düsseldorf for dinner at friend\'s house, then return to Cologne.', travel: [
    { mode: 'train', duration: '2h 30m', notes: 'Bruges → Maastricht via Liège (~2h30m, 1 change)' },
    { mode: 'car', duration: '2h', notes: 'via E40/A2' },
  ], activities: [
    { id: 'maa-1', time: '', title: 'Vrijthof Square', notes: 'Maastricht\'s grand main square — lively café terraces, St. Servaas Basilica, and the famous carillon bells.', tags: ['historical', 'culture', 'local', 'food'], priority: 4, priorityNote: 'Beautiful main square — great coffee stop and orientation point' },
    { id: 'maa-2', time: '', title: 'Bookstore Dominicanen', notes: 'World\'s most beautiful bookshop inside a 13th-century Dominican church — unmissable even if you don\'t buy anything.', tags: ['culture', 'historical', 'local'], priority: 5, priorityNote: 'One of the world\'s most beautiful bookshops — 20 min, unmissable' },
    { id: 'maa-3', time: '', title: 'Maas River Walk & Wyck neighbourhood', notes: 'Charming boutique district east of the river — great for lunch, independent shops and galleries.', tags: ['outdoor', 'food', 'shopping', 'local', 'relaxation'], priority: 3, priorityNote: 'Pleasant but not essential — cut if pressed for time' },
    { id: 'maa-4', time: '', title: 'Evening: Dinner with Friend — Düsseldorf', notes: 'Drive ~1h to Düsseldorf for dinner at friend\'s house, then return to Cologne (~45min). Great chance to catch up and discuss if they want to join the road trip leg.', tags: ['food', 'local', 'nightlife'], priority: 5, priorityNote: 'Confirmed social visit — the main highlight of this evening' },
  ]},

  { id: 'day-05', date: '2026-07-08', city: 'Leipzig', notes: 'Cologne → Leipzig/Erfurt by train (PENDING: choose stopover city). Pick up rental car. Drive to Plauen (~1h15m). Arrive afternoon — visit uncle.', travel: [
    { mode: 'train', duration: '3h', notes: 'Cologne Hbf → Leipzig Hbf ICE direct (recommended) OR → Erfurt Hbf ICE direct. PENDING decision.' },
  ], activities: [
    { id: 'lpz-1', time: '', title: '🚆 Stopover: Leipzig — Nikolaikirche & Market Square', notes: 'PENDING: Leipzig option. Historic church where the 1989 peaceful revolution began. Beautiful old market square with coffee-house culture.', tags: ['historical', 'culture', 'local'], priority: 4, priorityNote: 'Leipzig pick — beautiful church + market square, great 2h stopover' },
    { id: 'lpz-2', time: '', title: '🚆 Stopover: Leipzig — Mädler Passage & Coffee House', notes: 'PENDING: Leipzig option. Stunning art nouveau arcade with Auerbachs Keller — one of Germany\'s oldest restaurants, mentioned in Faust.', tags: ['historical', 'food', 'local', 'culture'], priority: 3, priorityNote: 'Leipzig pick — nice 20-min detour if time after Nikolaikirche' },
    { id: 'erf-1', time: '', title: '🚆 Stopover: Erfurt — Cathedral Square & Krämerbrücke', notes: 'PENDING: Erfurt option. Cathedral Hill with twin Gothic spires + the Krämerbrücke, a medieval bridge lined with inhabited timber-framed houses — unique in Germany.', tags: ['historical', 'culture', 'scenic', 'photography'], priority: 5, priorityNote: 'Erfurt pick — one of Germany\'s best cathedral squares, very scenic' },
    { id: 'erf-2', time: '', title: '🚆 Stopover: Erfurt — Old Town Walk', notes: 'PENDING: Erfurt option. One of Germany\'s best-preserved medieval old towns — compact and walkable in 2–3h.', tags: ['historical', 'outdoor', 'local', 'scenic'], priority: 4, priorityNote: 'Erfurt pick — pairs well with Cathedral Square, very walkable' },
    { id: 'plau-1', time: '', title: 'Plauen — Visit Uncle at Pestalozzistraße 50', notes: 'Arrive afternoon after picking up rental car. Main purpose of Plauen stop.', tags: ['local'], priority: 5, priorityNote: 'Main reason for the Plauen stop — family priority' },
    { id: 'plau-2', time: '', title: 'Plauen — Altmarkt & Rathaus', notes: 'Historic market square with the impressive Neo-Renaissance town hall', tags: ['historical', 'culture', 'photography'], priority: 2, priorityNote: '30-min stroll if time allows after uncle visit' },
    { id: 'plau-3', time: '', title: 'Plauen — Syrabach Valley', notes: 'Scenic nature walk through the valley just outside the city centre', tags: ['nature', 'outdoor', 'scenic', 'relaxation'], priority: 2, priorityNote: 'Nice walk, only if afternoon is free after uncle visit' },
  ]},

  { id: 'day-06', date: '2026-07-09', city: 'Prague', notes: 'Drive Plauen → Prague by rental car (~2.5h via D7/E55). Drop car at Prague airport or city centre. Full day in Prague.', travel: [
    { mode: 'car', duration: '2h 30m', notes: 'Plauen → Prague via D7/E55 — return rental car on arrival' },
  ], activities: [
    { id: 'prg-1', time: '', title: 'Prague Castle & St. Vitus Cathedral', notes: 'Largest ancient castle complex in the world — skyline icon, allow 2–3h', tags: ['historical', 'culture', 'scenic', 'photography'], priority: 5, priorityNote: 'Largest ancient castle complex in the world — half-day minimum' },
    { id: 'prg-2', time: '', title: 'Charles Bridge', notes: 'Gothic stone bridge lined with 30 baroque statues, best at sunrise or dusk', tags: ['historical', 'scenic', 'photography', 'romantic'], priority: 5, priorityNote: 'Iconic and magical at dusk — the single most memorable Prague image' },
    { id: 'prg-3', time: '', title: 'Old Town Square & Astronomical Clock', notes: 'Medieval clock performs on the hour — watch from the square', tags: ['historical', 'culture', 'local'], priority: 4, priorityNote: 'Central and lively — 30-min stop on the way between sights' },
    { id: 'prg-4', time: '', title: 'Josefov — Jewish Quarter', notes: 'Six historic synagogues and the Old Jewish Cemetery, UNESCO-listed', tags: ['historical', 'culture'], priority: 3, priorityNote: 'Deeply historical — good if you have 2h extra, skip if pressed' },
    { id: 'prg-5', time: '', title: 'Petřín Hill & Observation Tower', notes: 'Mini Eiffel Tower with sweeping views — take the funicular up', tags: ['nature', 'outdoor', 'scenic', 'romantic'], priority: 3, priorityNote: 'Great views but time-consuming — deprioritise on a single day' },
    { id: 'prg-6', time: '', title: 'Czech Beer Spa (Beerland or Bernard Spa)', notes: 'Unique to Czech Republic — soak in warm beer bath with unlimited craft beer on tap. Completely private tub for two. Deeply relaxing. Book in advance.', tags: ['wellness', 'relaxation', 'romantic', 'local', 'entertainment'], priority: 4, priorityNote: 'Genuinely unique to CZ, very romantic — book ahead, 90-min slot' },
    { id: 'prg-7', time: '', title: 'Havelské Tržiště — Old Town Market', notes: 'Open-air market in the Old Town selling Czech crafts, garnet jewellery, wooden toys and souvenirs. Great prices compared to tourist shops.', tags: ['shopping', 'local'], priority: 2, priorityNote: 'Easy browse if passing by — not worth a dedicated detour' },
    { id: 'prg-8', time: '', title: 'Hemingway Bar or Jazz Dock — Evening Cocktails', notes: 'Two of Prague\'s best cocktail bars — elegant, well-lit, tourist-friendly. Safety tip: Old Town bars are very safe; avoid "hostess bar" signs and anyone inviting you off the main tourist streets. Pickpockets active in crowds — keep bags in front.', tags: ['nightlife', 'local', 'relaxation'], priority: 3, priorityNote: 'Best cocktail bar in Prague — good evening wind-down option' },
  ]},

  // — Italy leg —
  { id: 'day-07', date: '2026-07-10', city: 'Rome', notes: 'Fly Prague → Rome morning. Arrive afternoon. (PRG→FCO ticket pending!)', travel: [
    { mode: 'flight', duration: '2h', notes: 'PRG → FCO/CIA — ticket pending! Book now' },
  ], activities: [
    { id: 'rom-arr-1', time: '', title: 'Trevi Fountain + Gelato', notes: 'Coin toss tradition — visit early evening to beat the crowds', tags: ['historical', 'food', 'romantic', 'photography'], priority: 5, priorityNote: 'Perfect first Rome evening — iconic, emotional, visit at dusk' },
    { id: 'rom-arr-2', time: '', title: 'Campo de\' Fiori', notes: 'Lively piazza — great for an evening aperitivo and people-watching', tags: ['food', 'local', 'nightlife'], priority: 4, priorityNote: 'Lively piazza nearby — great aperitivo stop after Trevi' },
  ]},

  { id: 'day-08', date: '2026-07-11', city: 'Rome', notes: 'Rome Day 2 — Ancient Rome.', travel: [], activities: [
    { id: 'rom-2-1', time: '', title: 'Colosseum + Palatine Hill + Roman Forum', notes: 'Book combined skip-the-line ticket in advance — allow a full morning', tags: ['historical', 'culture', 'outdoor', 'photography'], priority: 5, priorityNote: 'Top Rome priority — book skip-the-line tickets well in advance' },
    { id: 'rom-2-2', time: '', title: 'Pantheon', notes: 'Best-preserved Roman temple — free entry, go early to avoid queues', tags: ['historical', 'culture', 'photography'], priority: 5, priorityNote: '2,000 years old, flawlessly preserved, free entry — unmissable' },
    { id: 'rom-2-3', time: '', title: 'Piazza Navona', notes: 'Baroque square with Bernini\'s Fountain of the Four Rivers — great for lunch nearby', tags: ['culture', 'food', 'local', 'scenic'], priority: 4, priorityNote: 'Baroque masterpiece — pairs well with the Pantheon as a lunch stop' },
    { id: 'rom-2-4', time: '', title: 'Aperitivo at Sunset — Trastevere', notes: 'Trastevere is Rome\'s safest and most atmospheric evening neighbourhood — cobbled lanes, lit by warm lamps, busy with families and tourists until midnight. Safety tip: fine to walk freely here; keep bags zipped and avoid phone-in-hand on quiet streets.', tags: ['food', 'local', 'nightlife', 'romantic'], priority: 5, priorityNote: 'Best neighbourhood in Rome for an evening — very safe, very romantic' },
    { id: 'rom-2-5', time: '', title: 'Villa Borghese Gardens', notes: 'Rome\'s most beautiful park — rent a rowboat on the lake, stroll tree-lined paths. Perfect mid-day break from the heat between sights. Very safe and popular with locals.', tags: ['nature', 'outdoor', 'relaxation', 'romantic'], priority: 3, priorityNote: 'Lovely park break — skip if you need more time at the ancient sights' },
    { id: 'rom-2-7', time: '', title: '⚽ FIFA World Cup — Quarter-Final Watch Party (Rome)', notes: 'Quarter-finals fall ~13–14 Jul — you\'ll be in Rome. Piazza del Popolo and Trastevere bars host massive public viewing parties. If Germany vs Italy happens, the atmosphere will be electric. Italy fans are passionate but festive — completely safe at public viewings.', tags: ['entertainment', 'local', 'nightlife', 'outdoor'], priority: 3, priorityNote: 'If a match falls this day, Rome viewing parties are unforgettable' },
    { id: 'rom-2-6', time: '', title: 'Via Condotti & Via del Corso — Shopping', notes: 'Via Condotti for luxury brands (Gucci, Valentino); Via del Corso for mid-range and high street. Both safe, wide pedestrian streets in central Rome.', tags: ['shopping', 'local'], priority: 2, priorityNote: 'Only if you want to shop — save time for ancient sights otherwise' },
  ]},

  { id: 'day-09', date: '2026-07-12', city: 'Rome', notes: 'Rome Day 3 — Vatican + leisure.', travel: [], activities: [
    { id: 'rom-3-1', time: '', title: 'Vatican Museums + Sistine Chapel', notes: 'Michelangelo\'s ceiling — book well in advance, allow 3–4h minimum', tags: ['historical', 'culture'], priority: 5, priorityNote: 'Sistine Chapel is a once-in-a-lifetime sight — book weeks ahead' },
    { id: 'rom-3-2', time: '', title: 'St. Peter\'s Basilica + Dome', notes: 'Free entry to basilica — climb the dome for sweeping Rome views', tags: ['historical', 'culture', 'scenic', 'outdoor'], priority: 5, priorityNote: 'Free entry, iconic dome — book dome climb separately, unmissable' },
    { id: 'rom-3-3', time: '', title: 'Spanish Steps', notes: 'Iconic 18th-century staircase — popular at sunset, great for gelato nearby', tags: ['scenic', 'photography', 'romantic', 'relaxation'], priority: 3, priorityNote: 'Pretty but crowded — 20-min visit max, not a priority' },
    { id: 'rom-3-4', time: '', title: 'Spa Day', notes: 'Wind down after 3 days of sightseeing — several day spas near the city centre', tags: ['wellness', 'relaxation', 'romantic'], priority: 3, priorityNote: 'Good recovery option after Vatican — decide based on energy levels' },
    { id: 'rom-3-5', time: '', title: 'Michelin Star Dinner', notes: 'Book a restaurant in advance — Rome has several starred options at various price points', tags: ['food', 'romantic'], priority: 4, priorityNote: 'Special Rome memory — book in advance, worth the splurge' },
  ]},

  { id: 'day-10', date: '2026-07-13', city: 'Tuscany', notes: 'Train Rome → Florence/Tuscany morning. Arrive afternoon.', travel: [
    { mode: 'train', duration: '1h 30m', notes: 'Trenitalia Frecciarossa to Florence SMN — fastest' },
    { mode: 'car', duration: '3h', notes: 'via A1 — more flexible for countryside stops' },
  ], activities: [
    { id: 'tus-arr-1', time: '', title: 'Florence — Ponte Vecchio', notes: 'Medieval bridge over the Arno — beautiful at dusk', tags: ['historical', 'scenic', 'photography', 'romantic'], priority: 5, priorityNote: 'Florence\'s most iconic bridge — visit at golden hour, unmissable' },
    { id: 'tus-arr-2', time: '', title: 'Florence — Oltrarno neighbourhood', notes: 'Quiet side of the Arno — great trattorias and artisan shops', tags: ['food', 'local', 'shopping'], priority: 4, priorityNote: 'Best neighbourhood feel in Florence — great for a first dinner' },
    { id: 'tus-arr-3', time: '', title: 'San Lorenzo Leather Market + Mercato Centrale', notes: 'Florence\'s famous open-air leather market — bags, belts, wallets at good prices. Tip: bargain firmly, start at 50% of asking price. Mercato Centrale upstairs has excellent food stalls.', tags: ['shopping', 'food', 'local'], priority: 3, priorityNote: 'Good for leather goods and street food — skip if not shopping' },
  ]},

  { id: 'day-11', date: '2026-07-14', city: 'Tuscany', notes: 'Tuscany full day.', travel: [], activities: [
    { id: 'tus-2-1', time: '', title: 'Florence — Uffizi Gallery', notes: 'Botticelli\'s Birth of Venus — book tickets weeks ahead, allow 3h', tags: ['culture', 'historical'], priority: 5, priorityNote: 'One of the world\'s great museums — Botticelli\'s Birth of Venus awaits' },
    { id: 'tus-2-2', time: '', title: 'Florence — Duomo & Brunelleschi\'s Dome', notes: 'Climb the dome for panoramic views over terracotta rooftops — book timed entry', tags: ['historical', 'culture', 'scenic', 'outdoor'], priority: 5, priorityNote: 'Florence\'s defining landmark — book timed dome entry in advance' },
    { id: 'tus-2-3', time: '', title: 'Siena — Piazza del Campo', notes: 'One of Europe\'s greatest medieval squares, ~1.5h from Florence by train', tags: ['historical', 'culture', 'photography'], priority: 4, priorityNote: 'Spectacular medieval city — great day trip if you can spare the time' },
    { id: 'tus-2-4', time: '', title: 'Chianti Wine Region drive', notes: 'Rolling vineyard scenery between Florence and Siena — great if you have a car', tags: ['nature', 'food', 'scenic', 'romantic', 'outdoor'], priority: 4, priorityNote: 'Stunning scenery — only feasible if you hire a car in Tuscany' },
    { id: 'tus-2-5', time: '', title: 'San Gimignano', notes: 'Medieval hilltop town with towers — best gelato in Tuscany (Gelateria Dondoli)', tags: ['historical', 'food', 'local', 'photography'], priority: 3, priorityNote: 'Very pretty medieval town — good if road-tripping, skip if on train' },
    { id: 'tus-2-6', time: '', title: 'Tuscan Cooking Class', notes: 'Half-day class learning pasta, bruschetta and tiramisu — many options in Florence and the countryside. Fun, hands-on, and the best souvenir you can take home.', tags: ['entertainment', 'food', 'local', 'wellness'], priority: 4, priorityNote: 'Memorable and fun — the best skill souvenir you can take home' },
    { id: 'tus-2-7', time: '', title: 'Terme di Saturnia (Hot Springs)', notes: '~2h drive from Florence — natural thermal waterfalls flowing into cascading pools. Free and open 24h. Unique wellness experience unlike anything in Singapore.', tags: ['wellness', 'nature', 'outdoor', 'relaxation', 'romantic'], priority: 3, priorityNote: 'Unique free hot springs — only worth it with a car and spare half-day' },
  ]},

  { id: 'day-12', date: '2026-07-15', city: 'Venice', notes: 'Train Tuscany → Venice morning. Arrive afternoon.', travel: [
    { mode: 'train', duration: '2h', notes: 'Trenitalia direct Florence → Venezia Santa Lucia' },
    { mode: 'car', duration: '3h', notes: 'via A13 — park at Piazzale Roma on arrival' },
  ], activities: [
    { id: 'ven-arr-1', time: '', title: 'St. Mark\'s Square (Piazza San Marco)', notes: 'Heart of Venice — arrive in the afternoon when light is golden', tags: ['historical', 'culture', 'scenic', 'photography'], priority: 5, priorityNote: 'Heart of Venice — arrive in golden afternoon light, unmissable' },
    { id: 'ven-arr-2', time: '', title: 'Rialto Bridge & Market', notes: 'Iconic bridge over the Grand Canal — evening stroll and dinner nearby', tags: ['historical', 'food', 'local', 'photography'], priority: 4, priorityNote: 'Iconic Grand Canal crossing — lovely for an evening stroll' },
  ]},

  { id: 'day-13', date: '2026-07-16', city: 'Venice', notes: 'Venice full day.', travel: [], activities: [
    { id: 'ven-2-1', time: '', title: 'Grand Canal Gondola Ride', notes: 'Classic Venice experience — negotiate price before boarding, best at dusk', tags: ['romantic', 'scenic', 'local', 'entertainment'], priority: 5, priorityNote: 'THE Venice experience — negotiate price, go at dusk for magic' },
    { id: 'ven-2-2', time: '', title: 'Doge\'s Palace', notes: 'Gothic palace and former seat of Venetian power — book ahead, allow 2h', tags: ['historical', 'culture'], priority: 4, priorityNote: 'Stunning Gothic palace — book ahead, pairs well with St. Mark\'s' },
    { id: 'ven-2-3', time: '', title: 'Murano Island — Glass Blowing', notes: 'Short vaporetto ride — watch artisan glass-blowing demonstrations', tags: ['culture', 'local', 'shopping', 'entertainment'], priority: 4, priorityNote: 'Genuinely impressive craft — glass here is much cheaper than tourist shops' },
    { id: 'ven-2-4', time: '', title: 'Burano Island', notes: 'Colourful fishing village with lace-making tradition — photogenic and peaceful', tags: ['photography', 'scenic', 'local', 'relaxation', 'outdoor'], priority: 4, priorityNote: 'Most photogenic place in the region — vivid colours, very peaceful' },
    { id: 'ven-2-5', time: '', title: 'Zattere Waterfront at Sunset', notes: 'Best sunset viewpoint in Venice — wide promenade facing the Giudecca Canal', tags: ['scenic', 'romantic', 'photography', 'relaxation'], priority: 5, priorityNote: 'Best sunset in Venice — don\'t miss this, very romantic' },
    { id: 'ven-2-6', time: '', title: 'Lido Beach — Venice\'s Own Beach', notes: '15-min vaporetto from St. Mark\'s — a full sandy beach on the Adriatic. Great for a morning swim before sightseeing. Very safe, very local.', tags: ['nature', 'outdoor', 'relaxation', 'wellness'], priority: 2, priorityNote: 'Nice beach but 30 min each way — skip if you want more Venice time' },
    { id: 'ven-2-7', time: '', title: 'Cicchetti Bar Crawl — Cannaregio', notes: 'Venice\'s answer to tapas — small bites (cicchetti) with prosecco at €1–2 each. Cannaregio is the safest, most local neighbourhood. Safety tip: Venice is one of Europe\'s safest cities at night — no cars, well-lit canals, no rough areas in the tourist zone. Simply enjoy.', tags: ['nightlife', 'food', 'local', 'relaxation'], priority: 4, priorityNote: 'Best local food experience in Venice — cheap, social, very safe' },
    { id: 'ven-2-8', time: '', title: 'Venetian Glass & Lace Shopping', notes: 'Murano glass jewellery (get it on the island, not tourist shops in San Marco — much cheaper and authentic). Burano lace tablecloths make beautiful gifts.', tags: ['shopping', 'local'], priority: 3, priorityNote: 'Buy on Murano island (cheaper) — skip tourist shops in San Marco' },
  ]},

  // — Return Germany leg —
  { id: 'day-14', date: '2026-07-17', city: 'Würzburg', notes: 'Fly Venice → Frankfurt morning. Train Frankfurt → Würzburg. Arrive afternoon. (VCE→FRA ticket pending!)', travel: [
    { mode: 'flight', duration: '2h', notes: 'VCE → FRA — ticket pending! + ~1h train to Würzburg (~3h total)' },
    { mode: 'car', duration: '6h', notes: 'via Brenner Pass + A9 — long but flexible' },
  ], activities: [] },

  { id: 'day-15', date: '2026-07-18', city: 'Würzburg', notes: "Friend's wedding — evening event.", travel: [], activities: [
    { id: 'wue-1', time: '', title: 'Würzburg Residence', notes: 'UNESCO palace with Tiepolo\'s largest ceiling fresco in the world — allow 2h', tags: ['historical', 'culture', 'photography'], priority: 5, priorityNote: 'UNESCO palace, world\'s largest ceiling fresco — allow 2h' },
    { id: 'wue-2', time: '', title: 'Marienberg Fortress', notes: 'Hilltop fortress with sweeping views over the city and Main River vineyards', tags: ['historical', 'scenic', 'outdoor', 'photography'], priority: 4, priorityNote: 'Great views over city and vineyards — good morning activity' },
    { id: 'wue-3', time: '', title: 'Old Main Bridge (Alte Mainbrücke)', notes: 'Baroque statues + vineyard views — best spot for a glass of Franconian wine', tags: ['scenic', 'food', 'local', 'relaxation', 'romantic'], priority: 5, priorityNote: 'Most romantic spot in Würzburg — wine + vineyard views, unmissable' },
    { id: 'wue-4', time: '', title: 'Würzburg Cathedral (Kiliansdom)', notes: '11th-century Romanesque cathedral, one of the largest in Germany', tags: ['historical', 'culture'], priority: 3, priorityNote: 'Impressive but not a priority — 20-min visit if you pass by' },
    { id: 'wue-5', time: '', title: 'Hofgarten', notes: 'Baroque gardens behind the Residence — perfect morning walk before the wedding', tags: ['nature', 'relaxation', 'outdoor'], priority: 3, priorityNote: 'Beautiful gardens for a relaxed morning walk before the wedding' },
    { id: 'wue-6', time: '', title: 'Franconian Wine Tasting at a Weingut', notes: 'Würzburg sits in one of Germany\'s best wine regions — visit a local Weingut (winery estate) for a guided tasting of Silvaner and Müller-Thurgau whites. Many are walkable from the old town.', tags: ['entertainment', 'food', 'local', 'wellness'], priority: 4, priorityNote: 'Würzburg is wine country — a Weingut tasting is a special local treat' },
    { id: 'wue-7', time: '', title: 'Wedding Evening — Night Out with Friends', notes: 'After the wedding reception, Würzburg has a small but safe bar scene around the old town and Main riverside. Very safe small German city — no concerns navigating after dark with wedding guests.', tags: ['nightlife', 'entertainment', 'local'], priority: 5, priorityNote: 'You\'re here for the wedding — enjoy the whole evening with friends' },
  ]},

  { id: 'day-16', date: '2026-07-19', city: 'Frankfurt', notes: 'Train Würzburg → Frankfurt. Depart 12:15 PM FRA (SQ 025). Take earliest train. ⚽ World Cup Final is today — FRA airport screens will be showing it!', travel: [
    { mode: 'train', duration: '1h', notes: 'ICE direct — take the earliest train, aim FRA by 09:30' },
    { mode: 'car', duration: '1h 30m', notes: 'via A3' },
  ], activities: [] },
]

const SEED_EVENTS = [
  { id: 'evt-01', title: 'Flight SIN → FRA (SQ 326)', type: 'flight', date: '2026-07-04', time: '12:35', location: 'Changi Airport T3', bookingRef: 'ESHMZK', url: '', notes: 'SQ 326 · A380-800 · Economy Lite · Arrives FRA 19:40 T1 · Seats: not selected · Baggage: 25kg each', status: 'booked' },
  { id: 'evt-02', title: 'Flight PRG → FCO (Prague → Rome)', type: 'flight', date: '2026-07-10', time: '', location: 'Prague Václav Havel Airport (PRG)', bookingRef: '', url: '', notes: 'Not yet purchased! Morning flight — arrive Rome afternoon. Replaces original VIE→FCO route.', status: 'pending' },
  { id: 'evt-07', title: 'Rental Car — Leipzig/Erfurt → Plauen → Prague', type: 'transport', date: '2026-07-08', time: '', location: 'Leipzig or Erfurt (PENDING stopover decision)', bookingRef: '', url: '', notes: 'Pick up at Leipzig/Erfurt train station. Drive to Plauen (~1h15m), then Prague (~2h30m). Drop off at Prague airport or city centre on 9 Jul.', status: 'pending' },
  { id: 'evt-03', title: 'Flight FRA → SIN (SQ 025)', type: 'flight', date: '2026-07-19', time: '12:15', location: 'Frankfurt Airport T1', bookingRef: 'ESHMZK', url: '', notes: 'SQ 025 · Boeing 777-300ER · Economy Flexi · Arrives SIN 06:50 20 Jul · Seats: 54G (Xuan), 54E (Thanh) · Baggage: 30kg each', status: 'booked' },
  { id: 'evt-06', title: 'Flight VCE → FRA (Venice → Frankfurt)', type: 'flight', date: '2026-07-17', time: '', location: 'Venice Marco Polo Airport', bookingRef: '', url: '', notes: 'Not yet purchased! Take morning flight — need to reach Würzburg by afternoon.', status: 'pending' },
  { id: 'evt-04', title: "Friend's Wedding — Würzburg", type: 'other', date: '2026-07-18', time: '18:00', location: 'Würzburg', bookingRef: '', url: '', notes: '', status: 'confirmed' },
  { id: 'evt-05', title: 'Uncle Visit — Plauen', type: 'other', date: '2026-07-08', time: '', location: 'Pestalozzistraße 50, 08523 Plauen', bookingRef: '', url: '', notes: '', status: 'confirmed' },
  // — Hotel placeholders —
  { id: 'evt-08', title: 'Hotel — Bruges', type: 'hotel', date: '2026-07-05', time: '15:00', location: 'Bruges, Belgium', bookingRef: '', url: '', notes: 'Check-in: 5 Jul · Check-out: 7 Jul · 2 nights', status: 'pending' },
  { id: 'evt-09', title: 'Hotel — Plauen', type: 'hotel', date: '2026-07-08', time: '', location: 'Plauen, Germany', bookingRef: '', url: '', notes: 'Check-in: 8 Jul · Check-out: 9 Jul · 1 night. TBC — may stay with uncle at Pestalozzistraße 50.', status: 'pending' },
  { id: 'evt-10', title: 'Hotel — Prague', type: 'hotel', date: '2026-07-09', time: '14:00', location: 'Prague, Czech Republic', bookingRef: '', url: '', notes: 'Check-in: 9 Jul · Check-out: 10 Jul · 1 night', status: 'pending' },
  { id: 'evt-11', title: 'Hotel — Rome', type: 'hotel', date: '2026-07-10', time: '14:00', location: 'Rome, Italy', bookingRef: '', url: '', notes: 'Check-in: 10 Jul · Check-out: 13 Jul · 3 nights', status: 'pending' },
  { id: 'evt-12', title: 'Hotel — Florence / Tuscany', type: 'hotel', date: '2026-07-13', time: '14:00', location: 'Florence or Tuscany countryside, Italy', bookingRef: '', url: '', notes: 'Check-in: 13 Jul · Check-out: 15 Jul · 2 nights. City hotel in Florence vs agriturismo in countryside — both within budget range.', status: 'pending' },
  { id: 'evt-13', title: 'Hotel — Venice', type: 'hotel', date: '2026-07-15', time: '14:00', location: 'Venice, Italy', bookingRef: '', url: '', notes: 'Check-in: 15 Jul · Check-out: 17 Jul · 2 nights. Tip: hotels on the island are expensive — Mestre (mainland, 10min train) is significantly cheaper.', status: 'pending' },
  { id: 'evt-14', title: 'Hotel — Würzburg', type: 'hotel', date: '2026-07-17', time: '14:00', location: 'Würzburg, Germany', bookingRef: '', url: '', notes: 'Check-in: 17 Jul · Check-out: 19 Jul · 2 nights. Book near the old town — walkable to wedding venue.', status: 'pending' },
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
