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
      "Berlin is a bigger urban reset: design hotels, vintage shopping, late cafes and a high-intent route for culture-driven travelers.",
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
        answer: "It combines lower trip costs, strong weekend appeal and a route that often produces attractive fare signals.",
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
        question: "What makes Bucharest convert well?",
        answer: "Short flight time, low trip cost and spa/nightlife intent make the route easy to act on.",
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
      "Prague is highly scannable and conversion-friendly: romantic visuals, compact walking routes and a strong hotel story.",
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
        question: "Is Sofia premium enough for Voltescape?",
        answer: "Yes when framed correctly: boutique stays, mountain access and low spend make it a smart luxury-value escape.",
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
      "Milan gives Voltescape its fashion signal: espresso, galleries, design retail, premium hotels and optional Lake Como extensions.",
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
      "Paris is the premium benchmark: not always the cheapest, but high-intent and perfect for fashion, food and hotel conversion.",
    tags: ["Luxury", "Museums", "Fashion"],
    tips: ["Choose arrondissement by trip style.", "Reserve restaurants earlier than feels normal.", "Use carry-on for short stays."],
    faq: [
      {
        question: "Why include Paris if it is not always cheap?",
        answer: "It is high-intent and monetizes well across flights, hotels, activities, transfers and eSIMs.",
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
      "Rome is the classic conversion city: food, romance, history, boutique hotels and endless reasons to add activities.",
    tags: ["Classic", "Food", "Luxury"],
    tips: ["Book Vatican and Colosseum windows early.", "Base in Monti or Trastevere.", "Avoid airport taxi surprises."],
    faq: [
      {
        question: "Is Rome better for flights or activities monetization?",
        answer: "Both. The flight click is high-intent, and Rome has unusually strong activities and transfer potential.",
      },
      {
        question: "How many days should I plan for Rome?",
        answer: "Three to four nights is a strong starting point for a first trip without overloading the itinerary.",
      },
    ],
  },
];

export function getDestination(slugOrIata: string) {
  const key = slugOrIata.toLowerCase();
  return destinations.find((destination) => destination.slug === key || destination.iata.toLowerCase() === key);
}
