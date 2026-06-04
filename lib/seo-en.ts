export type SeoCopyEn = {
  title: string;
  description: string;
  heading: string;
  body: string;
};

export const seoCopyEn: Record<string, SeoCopyEn> = {
  "cheap-flights-from-israel": {
    title: "Cheap Flights from Israel | Voltescape",
    description:
      "Live, hand-checked cheap flights from Tel Aviv to Europe. Compare the cheapest dates to top destinations, updated all day.",
    heading: "Cheap flights from Israel",
    body: "We scan live prices from Tel Aviv to the most popular European destinations and surface the cheapest dates, refreshed throughout the day. Pick a deal and book in one click.",
  },
  "cheap-flights-to-athens": {
    title: "Cheap Flights from Tel Aviv to Athens | Voltescape",
    description:
      "Find cheap flights from Tel Aviv to Athens. Live prices, the cheapest travel dates, plus eSIM and transfers for your trip to Greece.",
    heading: "Cheap flights to Athens",
    body: "Athens is one of the fastest and cheapest escapes from Tel Aviv. We track live fares and show you the best dates to fly, so a few days in Greece costs less than you think.",
  },
  "cheap-flights-to-berlin": {
    title: "Cheap Flights from Tel Aviv to Berlin | Voltescape",
    description:
      "Cheap flights from Tel Aviv to Berlin with live prices and the cheapest dates. Plan a city break to Germany with eSIM and transfers ready.",
    heading: "Cheap flights to Berlin",
    body: "Berlin packs history, nightlife and great food into one affordable city break. We surface the cheapest live fares from Tel Aviv so you can grab the best date and go.",
  },
  "cheap-flights-to-rome": {
    title: "Cheap Flights from Tel Aviv to Rome | Voltescape",
    description:
      "Cheap flights from Tel Aviv to Rome. Live prices, cheapest travel dates, and everything you need for a trip to Italy in one place.",
    heading: "Cheap flights to Rome",
    body: "Rome is the perfect long-weekend in Italy — and it doesn't have to be expensive. We check live prices and highlight the cheapest dates to fly from Tel Aviv.",
  },
  "weekend-flights-from-tel-aviv": {
    title: "Weekend Flights from Tel Aviv | Voltescape",
    description:
      "Quick weekend getaways from Tel Aviv. Live deals to nearby European cities with the cheapest weekend dates, updated all day.",
    heading: "Weekend getaways from Tel Aviv",
    body: "Short on time? These nearby cities make a perfect weekend escape from Tel Aviv. We find the cheapest weekend dates so you can fly out Friday and be back for the week.",
  },
  "europe-flight-deals": {
    title: "Europe Flight Deals from Tel Aviv | Voltescape",
    description:
      "The best live flight deals from Tel Aviv to Europe, hand-checked and refreshed all day. Compare destinations and grab the cheapest dates.",
    heading: "Europe flight deals",
    body: "From Athens to Paris, we track live prices across Europe and surface only the genuinely cheap fares. Compare destinations side by side and book the best one.",
  },
  "luxury-travel-deals": {
    title: "Luxury Travel Deals from Tel Aviv | Voltescape",
    description:
      "Premium European destinations at smart prices. Live flight deals from Tel Aviv to Paris, Milan, Rome and Athens, refreshed all day.",
    heading: "Luxury escapes from Tel Aviv",
    body: "A touch of luxury doesn't mean overpaying for the flight. We track live fares to Europe's most stylish cities so you can spend more on the trip and less on getting there.",
  },
  "cheap-flights-to-larnaca": {
    title: "Cheap Flights from Tel Aviv to Larnaca | Voltescape",
    description:
      "Cheap flights from Tel Aviv to Larnaca, Cyprus. The shortest, cheapest escape from Israel — live prices and the best travel dates.",
    heading: "Cheap flights to Larnaca",
    body: "Larnaca is the closest beach escape from Tel Aviv — often under an hour in the air. We track live fares to Cyprus so a spontaneous getaway costs next to nothing.",
  },
  "cheap-flights-to-greece": {
    title: "Cheap Flights from Tel Aviv to Greece | Voltescape",
    description:
      "Cheap flights from Tel Aviv to Greece — Athens, Thessaloniki and more. Live prices and the cheapest dates, updated all day.",
    heading: "Cheap flights to Greece",
    body: "Greece is a favourite escape from Tel Aviv for good reason: close, sunny and affordable. We surface the cheapest live fares to Athens, Thessaloniki and beyond.",
  },
  "cheap-flights-to-prague": {
    title: "Cheap Flights from Tel Aviv to Prague | Voltescape",
    description:
      "Cheap flights from Tel Aviv to Prague. Live prices, the cheapest dates, and a ready-to-go city break in the Czech Republic.",
    heading: "Cheap flights to Prague",
    body: "Fairytale architecture, great beer and low prices make Prague a brilliant city break. We track live fares from Tel Aviv and show you the cheapest dates to fly.",
  },
  "cheap-flights-to-budapest": {
    title: "Cheap Flights from Tel Aviv to Budapest | Voltescape",
    description:
      "Cheap flights from Tel Aviv to Budapest. Live prices and the cheapest travel dates for a city break in Hungary.",
    heading: "Cheap flights to Budapest",
    body: "Thermal baths, riverside views and famously low prices — Budapest is one of Europe's best-value breaks. We find the cheapest live fares from Tel Aviv for you.",
  },
  "cheap-flights-to-barcelona": {
    title: "Cheap Flights from Tel Aviv to Barcelona | Voltescape",
    description:
      "Cheap flights from Tel Aviv to Barcelona. Live prices, the cheapest dates, and everything for a Spanish city break in one place.",
    heading: "Cheap flights to Barcelona",
    body: "Beaches, Gaudí and tapas — Barcelona has it all. We track live fares from Tel Aviv to Spain and highlight the cheapest dates so you can book with confidence.",
  },
  "cheap-flights-to-istanbul": {
    title: "Cheap Flights from Tel Aviv to Istanbul | Voltescape",
    description:
      "Cheap flights from Tel Aviv to Istanbul. Live prices and the cheapest dates for a short, affordable city break in Turkey.",
    heading: "Cheap flights to Istanbul",
    body: "Where Europe meets Asia, Istanbul is a close and endlessly rewarding escape from Tel Aviv. We surface the cheapest live fares and the best dates to fly.",
  },
  "summer-flights-from-tel-aviv": {
    title: "Summer Flights from Tel Aviv | Voltescape",
    description:
      "Summer flight deals from Tel Aviv to the Mediterranean and beyond. Live prices and the cheapest summer dates, refreshed all day.",
    heading: "Summer escapes from Tel Aviv",
    body: "Beach towns and sunny cities are calling. We track live summer fares from Tel Aviv to the Mediterranean's best spots and show you the cheapest dates to fly.",
  },
};

export function getSeoCopyEn(slug: string): SeoCopyEn | undefined {
  return seoCopyEn[slug];
}
