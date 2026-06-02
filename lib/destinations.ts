export type Destination = {
  name: string;
  slug: string;
  iata: string;
  airportHint: string;
  targetRange: [number, number];
  score: number;
  direct: boolean;
  flightTime: string;
  mood: string;
  description: string;
  tags: string[];
  tips: string[];
  faq: Array<{ question: string; answer: string }>;
};

export const ORIGIN = "TLV";
export const DEFAULT_CURRENCY = "EUR";

export const destinations: Destination[] = [
  {
    name: "Athens",
    slug: "athens",
    iata: "ATH",
    airportHint: "Athens International",
    targetRange: [59, 119],
    score: 96,
    direct: true,
    flightTime: "2h 10m",
    mood: "Ancient edge, rooftop dinners and island-hop energy.",
    description:
      "Athens is the cleanest first escape from Tel Aviv: short flight, strong food culture, boutique hotels and a real weekend rhythm.",
    tags: ["Fast escape", "Food", "Weekend"],
    tips: ["Book Acropolis early slots.", "Stay near Plaka or Koukaki.", "Use Piraeus if islands are next."],
    faq: [
      {
        question: "Is Athens good for a short weekend from Tel Aviv?",
        answer: "Yes. The route is short, usually simple, and works well for a two or three night city break.",
      },
      {
        question: "When should I click through to check Athens prices?",
        answer: "Click when the live card shows a fare or when the target range matches your budget; Aviasales verifies the current result.",
      },
    ],
  },
  {
    name: "Berlin",
    slug: "berlin",
    iata: "BER",
    airportHint: "Berlin Brandenburg",
    targetRange: [91, 169],
    score: 85,
    direct: true,
    flightTime: "4h 20m",
    mood: "Creative sprawl, serious nightlife, galleries and records.",
    description:
      "Berlin is a bigger urban reset: design hotels, vintage shopping, late cafes and a favorite for culture-driven travelers.",
    tags: ["Nightlife", "Art", "Direct"],
    tips: ["Pick neighborhood first, hotel second.", "Reserve clubs and restaurants smartly.", "Use airport rail into Mitte."],
    faq: [
      {
        question: "Is Berlin usually direct from Tel Aviv?",
        answer: "Direct flights are common, but availability changes by season and airline. Always verify after clicking the live deal.",
      },
      {
        question: "Who should choose Berlin?",
        answer: "Travelers who want music, design, nightlife, museums and a city that rewards repeat visits.",
      },
    ],
  },
  {
    name: "Budapest",
    slug: "budapest",
    iata: "BUD",
    airportHint: "Budapest Ferenc Liszt",
    targetRange: [64, 139],
    score: 94,
    direct: true,
    flightTime: "3h 25m",
    mood: "Thermal baths, grand cafes and sharp nightlife value.",
    description:
      "Budapest often feels like one of Europe’s best value plays: cinematic streets, good hotels and strong food-to-price ratio.",
    tags: ["Value", "Spa", "Nightlife"],
    tips: ["Pack swimwear for thermal baths.", "Use trams for the Danube route.", "Reserve popular ruin bars."],
    faq: [
      {
        question: "Why does Budapest score highly?",
        answer: "It combines lower trip costs, strong weekend appeal and a route that often shows attractive fares.",
      },
      {
        question: "Is Budapest good for couples?",
        answer: "Yes. Thermal baths, river views and boutique hotels make it one of the strongest couple routes from TLV.",
      },
    ],
  },
  {
    name: "Bucharest",
    slug: "bucharest",
    iata: "OTP",
    airportHint: "Henri Coanda",
    targetRange: [58, 128],
    score: 91,
    direct: true,
    flightTime: "2h 45m",
    mood: "Palace-scale city breaks with cocktail-bar momentum.",
    description:
      "Bucharest is a practical value route with a polished nightlife layer, spa add-ons and affordable premium hotel options.",
    tags: ["Design", "Food", "Value"],
    tips: ["Stay around Old Town or Universitate.", "Book Therme outside peak hours.", "Use ride apps for transfers."],
    faq: [
      {
        question: "Is Bucharest a value destination?",
        answer: "Yes. Hotels, food and rides often price lower than major Western European capitals.",
      },
      {
        question: "What makes Bucharest worth it?",
        answer: "Short flight time, low trip cost and great spa and nightlife make it an easy yes.",
      },
    ],
  },
  {
    name: "Warsaw",
    slug: "warsaw",
    iata: "WAW",
    airportHint: "Warsaw Chopin",
    targetRange: [71, 149],
    score: 89,
    direct: true,
    flightTime: "3h 45m",
    mood: "Clean, modern, cultural and excellent for hotel value.",
    description:
      "Warsaw is built for travelers who want a clean, organized city with museums, food, premium hotels and reasonable prices.",
    tags: ["Culture", "Hotels", "Museums"],
    tips: ["Split time between Centrum and Old Town.", "Reserve fine dining ahead.", "Use airport rail when possible."],
    faq: [
      {
        question: "Is Warsaw underrated for a city break?",
        answer: "Yes. It is less obvious than Prague or Berlin, which can make its hotel value stronger.",
      },
      {
        question: "What is the best trip length for Warsaw?",
        answer: "Three nights is a clean starting point for museums, restaurants and Old Town without rushing.",
      },
    ],
  },
  {
    name: "Prague",
    slug: "prague",
    iata: "PRG",
    airportHint: "Vaclav Havel",
    targetRange: [76, 154],
    score: 86,
    direct: false,
    flightTime: "4h+",
    mood: "Cinematic streets, crisp beer and polished old-world stays.",
    description:
      "Prague is an easy yes: romantic views, compact walking routes and great hotels.",
    tags: ["Romantic", "Beer", "Walkable"],
    tips: ["Cross Charles Bridge before 8 AM.", "Stay Mala Strana for calm.", "Book castle entries online."],
    faq: [
      {
        question: "Is Prague best for couples?",
        answer: "It is one of the strongest couple-friendly routes thanks to walkability, views and boutique hotels.",
      },
      {
        question: "Should I prefer direct flights to Prague?",
        answer: "Direct options can vary. If timing matters, use the direct-flight preference in search and verify live availability.",
      },
    ],
  },
  {
    name: "Sofia",
    slug: "sofia",
    iata: "SOF",
    airportHint: "Sofia Airport",
    targetRange: [52, 112],
    score: 92,
    direct: true,
    flightTime: "2h 45m",
    mood: "Underrated city base with mountain air and low spend.",
    description:
      "Sofia is the low-cost play: short route, mountain access, local food and a strong chance to keep the whole trip inexpensive.",
    tags: ["Cheapest", "Mountain", "Local"],
    tips: ["Add Vitosha for a half-day reset.", "Use taxis through apps.", "Carry cash for small venues."],
    faq: [
      {
        question: "Why is Sofia in the cheapest flights section?",
        answer: "It often has one of the lowest target ranges from Tel Aviv and keeps ground costs low after arrival.",
      },
      {
        question: "Is Sofia worth it for a nicer trip?",
        answer: "Yes. Boutique stays, mountain access and low spend make it a smart value escape.",
      },
    ],
  },
  {
    name: "Milan",
    slug: "milan",
    iata: "MIL",
    airportHint: "Milan airports",
    targetRange: [79, 169],
    score: 87,
    direct: true,
    flightTime: "3h 55m",
    mood: "Fashion, aperitivo, design hotels and Lake Como exits.",
    description:
      "Milan is all about style: espresso, galleries, design shopping, premium hotels and optional Lake Como trips.",
    tags: ["Fashion", "Design", "Como"],
    tips: ["Track airport: MXP, LIN or BGY.", "Book Last Supper far ahead.", "Use train links for Como."],
    faq: [
      {
        question: "Which Milan airport should I choose?",
        answer: "Use city code MIL for broad searches, then compare MXP, LIN and BGY inside the partner results.",
      },
      {
        question: "Is Milan a luxury route?",
        answer: "Yes. It is one of the strongest brand-fit destinations for fashion, design and premium hotel intent.",
      },
    ],
  },
  {
    name: "Paris",
    slug: "paris",
    iata: "PAR",
    airportHint: "Paris airports",
    targetRange: [112, 229],
    score: 82,
    direct: true,
    flightTime: "4h 50m",
    mood: "Luxury benchmark city with endless micro-neighborhoods.",
    description:
      "Paris is the premium benchmark: not always the cheapest, but perfect for fashion, food and a memorable hotel stay.",
    tags: ["Luxury", "Museums", "Fashion"],
    tips: ["Choose arrondissement by trip style.", "Reserve restaurants earlier than feels normal.", "Use carry-on for short stays."],
    faq: [
      {
        question: "Why include Paris if it is not always cheap?",
        answer: "It is always in demand and easy to build a full trip around: flights, hotels, activities, transfers and eSIM.",
      },
      {
        question: "What price is attractive for Paris from Tel Aviv?",
        answer: "Anything near the lower target range is worth checking quickly because premium routes can move fast.",
      },
    ],
  },
  {
    name: "Rome",
    slug: "rome",
    iata: "ROM",
    airportHint: "Rome airports",
    targetRange: [84, 174],
    score: 88,
    direct: true,
    flightTime: "3h 40m",
    mood: "Big-ticket romance with neighborhood-level discovery.",
    description:
      "Rome is the classic city break: food, romance, history, boutique hotels and endless things to do.",
    tags: ["Classic", "Food", "Luxury"],
    tips: ["Book Vatican and Colosseum windows early.", "Base in Monti or Trastevere.", "Avoid airport taxi surprises."],
    faq: [
      {
        question: "Is Rome better for the flight or the things to do?",
        answer: "Both. The flight is a great deal, and Rome has loads of activities and easy transfers.",
      },
      {
        question: "How many days should I plan for Rome?",
        answer: "Three to four nights is a strong starting point for a first trip without overloading the itinerary.",
      },
    ],
  },
  {
    name: "Larnaca",
    slug: "larnaca",
    iata: "LCA",
    airportHint: "Larnaca International",
    targetRange: [39, 89],
    score: 97,
    direct: true,
    flightTime: "1h 05m",
    mood: "Fastest beach reset with almost no planning friction.",
    description:
      "Larnaca is the ultra-short escape from Tel Aviv: low fares, beach energy, easy transfers and a simple weekend getaway.",
    tags: ["Beach", "Cheapest", "Fast"],
    tips: ["Use carry-on only.", "Compare Larnaca with Paphos if dates are flexible.", "Book a sea-view stay early on weekends."],
    faq: [
      {
        question: "Why is Larnaca such a good deal?",
        answer: "The route is short, often direct, and can price low enough to create fast click intent.",
      },
      {
        question: "Is Larnaca good for a same-week escape?",
        answer: "Yes. It is one of the easiest short-notice beach trips from Tel Aviv.",
      },
    ],
  },
  {
    name: "Vienna",
    slug: "vienna",
    iata: "VIE",
    airportHint: "Vienna International",
    targetRange: [79, 159],
    score: 90,
    direct: true,
    flightTime: "3h 45m",
    mood: "Polished culture, cafes, museums and premium hotel value.",
    description:
      "Vienna brings a refined city break: elegant hotels, museums, clean transit and a premium feel without Paris-level spend.",
    tags: ["Culture", "Cafes", "Premium"],
    tips: ["Use airport rail into the center.", "Book opera or museum slots ahead.", "Stay near Innere Stadt for first visits."],
    faq: [
      {
        question: "Is Vienna a premium-value destination?",
        answer: "Yes. It has a luxury feel, strong culture and often more controlled trip costs than bigger Western capitals.",
      },
      {
        question: "Does Vienna work for weekends?",
        answer: "Three nights is ideal, but a focused two-night trip can work with direct flights.",
      },
    ],
  },
  {
    name: "Krakow",
    slug: "krakow",
    iata: "KRK",
    airportHint: "Krakow John Paul II",
    targetRange: [69, 139],
    score: 91,
    direct: true,
    flightTime: "3h 35m",
    mood: "Old town value, food, history and compact walking routes.",
    description:
      "Krakow is a strong low-spend city break with boutique hotels, walkable streets and prices that can drop to sharp deals.",
    tags: ["Value", "Old town", "Food"],
    tips: ["Stay close to the Old Town or Kazimierz.", "Reserve popular cellar restaurants.", "Use the train from the airport."],
    faq: [
      {
        question: "Why pick Krakow?",
        answer: "It combines low costs on the ground, strong city-break appeal and good prices from Tel Aviv.",
      },
      {
        question: "Is Krakow good for first-time Poland travel?",
        answer: "Yes. It is compact, atmospheric and easier to scan than larger cities.",
      },
    ],
  },
  {
    name: "Thessaloniki",
    slug: "thessaloniki",
    iata: "SKG",
    airportHint: "Thessaloniki Airport",
    targetRange: [49, 109],
    score: 95,
    direct: true,
    flightTime: "2h 15m",
    mood: "Greek food, waterfront nights and low-friction weekend energy.",
    description:
      "Thessaloniki is a smart Greece deal: short, social, food-led and often cheaper than the more obvious islands.",
    tags: ["Food", "Weekend", "Value"],
    tips: ["Stay near the waterfront.", "Use the city as a base for northern Greece.", "Book Friday departures early."],
    faq: [
      {
        question: "Is Thessaloniki better than Athens for value?",
        answer: "It can be, especially for food, nightlife and short breaks with lower total trip cost.",
      },
      {
        question: "Can Thessaloniki feel like a special trip?",
        answer: "Yes. Smart Mediterranean value with boutique stays and excellent food.",
      },
    ],
  },
  {
    name: "Belgrade",
    slug: "belgrade",
    iata: "BEG",
    airportHint: "Belgrade Nikola Tesla",
    targetRange: [69, 139],
    score: 92,
    direct: true,
    flightTime: "3h 00m",
    mood: "Nightlife, riverside energy and underrated hotel value.",
    description:
      "Belgrade is a great-value pick for travelers who want nightlife, food, design bars and a less obvious Europe escape.",
    tags: ["Nightlife", "Value", "Direct"],
    tips: ["Stay around Dorcol or Savamala.", "Reserve river venues in summer.", "Use ride apps from the airport."],
    faq: [
      {
        question: "Why is Belgrade a great deal?",
        answer: "It is direct-friendly, affordable on the ground and has strong weekend appeal.",
      },
      {
        question: "Who should choose Belgrade?",
        answer: "Travelers who want nightlife, food and a sharper alternative to standard capitals.",
      },
    ],
  },
  {
    name: "Tirana",
    slug: "tirana",
    iata: "TIA",
    airportHint: "Tirana International",
    targetRange: [59, 129],
    score: 90,
    direct: true,
    flightTime: "3h 00m",
    mood: "New Europe energy, low spend and Albania add-on potential.",
    description:
      "Tirana is an emerging value pick with low ground costs, colorful city energy and easy extensions toward the Albanian coast.",
    tags: ["Emerging", "Value", "Coast"],
    tips: ["Use Tirana as a base or coastal gateway.", "Book boutique hotels near Blloku.", "Check baggage rules carefully."],
    faq: [
      {
        question: "Is Tirana a good deal destination?",
        answer: "Yes. It can deliver low total trip cost and a fresh alternative to classic city breaks.",
      },
      {
        question: "Is Tirana suitable for premium travelers?",
        answer: "It works for smart luxury-value travelers who prefer boutique stays and emerging destinations.",
      },
    ],
  },
  {
    name: "Naples",
    slug: "naples",
    iata: "NAP",
    airportHint: "Naples International",
    targetRange: [69, 149],
    score: 89,
    direct: true,
    flightTime: "3h 20m",
    mood: "Pizza, Amalfi access and raw Italian city drama.",
    description:
      "Naples is full-on Italy: food, coast access, great activities and easy Amalfi add-ons.",
    tags: ["Italy", "Food", "Coast"],
    tips: ["Use Naples for Amalfi or Capri add-ons.", "Book transfers if arriving late.", "Stay central for first trips."],
    faq: [
      {
        question: "Why pick Naples?",
        answer: "It can unlock Italy at lower prices, with easy transfers, activities and hotels.",
      },
      {
        question: "Is Naples a weekend route?",
        answer: "Yes for the city itself. Add more nights for Amalfi, Capri or Pompeii.",
      },
    ],
  },
  {
    name: "Barcelona",
    slug: "barcelona",
    iata: "BCN",
    airportHint: "Barcelona El Prat",
    targetRange: [109, 219],
    score: 86,
    direct: true,
    flightTime: "4h 40m",
    mood: "Beach-city blend, design hotels and high activity intent.",
    description:
      "Barcelona has it all: easy flights, hotels, food, architecture, beaches and plenty to do.",
    tags: ["Beach city", "Design", "Activities"],
    tips: ["Book Sagrada Familia ahead.", "Choose neighborhood by trip style.", "Avoid overpacking the itinerary."],
    faq: [
      {
        question: "Is Barcelona usually cheap from TLV?",
        answer: "Not always, but when it moves near target range it is a strong high-intent deal.",
      },
      {
        question: "Why is Barcelona so popular?",
        answer: "It is in demand across flights, hotels, activities and transfers, and people keep coming back.",
      },
    ],
  },
  {
    name: "Madrid",
    slug: "madrid",
    iata: "MAD",
    airportHint: "Adolfo Suarez Madrid-Barajas",
    targetRange: [99, 209],
    score: 84,
    direct: true,
    flightTime: "5h 00m",
    mood: "Late dinners, museums, rooftops and polished hotel value.",
    description:
      "Madrid is a larger premium city play with strong food, museums, nightlife and hotel value when fares drop into range.",
    tags: ["Museums", "Food", "Rooftops"],
    tips: ["Stay near Salamanca, Chueca or Las Letras.", "Book Prado windows.", "Use Madrid as a Spain hub."],
    faq: [
      {
        question: "When is Madrid a strong deal?",
        answer: "When flights come close to the lower target range because the destination has strong premium intent.",
      },
      {
        question: "Is Madrid better than Barcelona for hotels?",
        answer: "Madrid can offer excellent premium hotel value, especially outside major event dates.",
      },
    ],
  },
  {
    name: "Istanbul",
    slug: "istanbul",
    iata: "IST",
    airportHint: "Istanbul Airport",
    targetRange: [79, 159],
    score: 88,
    direct: true,
    flightTime: "2h 15m",
    mood: "Grand bazaar energy, design hotels and fast premium contrast.",
    description:
      "Istanbul is a short, high-sensory trip with great hotels, food, shopping and easy transfers.",
    tags: ["Short haul", "Hotels", "Food"],
    tips: ["Track airport and airline carefully.", "Book a central transfer.", "Choose hotel location around trip style."],
    faq: [
      {
        question: "Why pick Istanbul?",
        answer: "It is close, always popular and easy to plan across flights, hotels and transfers.",
      },
      {
        question: "Is Istanbul premium enough?",
        answer: "Yes. The city has strong luxury hotel inventory and premium food and shopping appeal.",
      },
    ],
  },
  {
    name: "Tbilisi",
    slug: "tbilisi",
    iata: "TBS",
    airportHint: "Tbilisi International",
    targetRange: [69, 149],
    score: 93,
    direct: true,
    flightTime: "2h 35m",
    mood: "Wine, design stays, mountains and excellent trip value.",
    description:
      "Tbilisi is a strong near-Europe deal route with low ground costs, wine, boutique stays and mountain add-on energy.",
    tags: ["Wine", "Value", "Mountains"],
    tips: ["Add Kazbegi if you have more nights.", "Book sulfur baths ahead.", "Use transfers for mountain days."],
    faq: [
      {
        question: "Why is Tbilisi a strong deal route?",
        answer: "It combines low total trip cost, short flight time and high destination character.",
      },
      {
        question: "Does Tbilisi work for luxury-value travel?",
        answer: "Yes. Boutique stays, wine and private day trips can feel premium without high spend.",
      },
    ],
  },
  {
    name: "Yerevan",
    slug: "yerevan",
    iata: "EVN",
    airportHint: "Zvartnots International",
    targetRange: [69, 149],
    score: 90,
    direct: true,
    flightTime: "2h 40m",
    mood: "Warm city break, food, culture and low-cost discovery.",
    description:
      "Yerevan is a compact value escape with food, culture, easy planning and prices that can drop to attractive deals.",
    tags: ["Culture", "Value", "Food"],
    tips: ["Book central stays near Republic Square.", "Add Garni and Geghard.", "Use private transfers for day trips."],
    faq: [
      {
        question: "Is Yerevan a good short escape?",
        answer: "Yes. It is compact, friendly and works well for a two or three night reset.",
      },
      {
        question: "Why pick Yerevan?",
        answer: "It offers strong value and a clear reason to go from Tel Aviv.",
      },
    ],
  },
  {
    name: "Batumi",
    slug: "batumi",
    iata: "BUS",
    airportHint: "Batumi International",
    targetRange: [79, 169],
    score: 88,
    direct: true,
    flightTime: "2h 30m",
    mood: "Black Sea, casinos, coast and fast summer energy.",
    description:
      "Batumi is a seasonal coast trip with short flight time, beach-city energy and great weekend or summer appeal.",
    tags: ["Coast", "Summer", "Fast"],
    tips: ["Check seasonality before booking.", "Compare hotels along the boulevard.", "Use private transfer for late arrivals."],
    faq: [
      {
        question: "When is Batumi strongest?",
        answer: "It performs best as a summer or warm-weather deal when direct options and hotel demand line up.",
      },
      {
        question: "Is Batumi a cheap flight candidate?",
        answer: "It can be, especially when direct summer fares drop near the lower target range.",
      },
    ],
  },
];

export function getDestination(slugOrIata: string) {
  const key = slugOrIata.toLowerCase();
  return destinations.find((destination) => destination.slug === key || destination.iata.toLowerCase() === key);
}
